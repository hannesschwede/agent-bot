// app/api/review/route.ts
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();

  // Cleanup expired entries periodically to prevent memory leak
  if (rateLimitMap.size > 100) {
    cleanupExpiredEntries();
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

const SYSTEM_PROMPT = `Du bist ein erfahrener Code-Reviewer. Analysiere den gegebenen Code und gib strukturiertes Feedback zurück.

Antworte NUR mit validem JSON — kein Markdown, keine Backticks, kein Text davor oder danach.

JSON-Format:
{
  "score": <0-100, Gesamtqualität>,
  "summary": "<kurze 1-2 Satz Zusammenfassung>",
  "issues": [
    {
      "id": "<KATEGORIE-NR z.B. SEC-001>",
      "severity": "<critical|high|medium|low>",
      "category": "<security|performance|codeQuality|general>",
      "title": "<kurzer Titel>",
      "description": "<Was ist das Problem?>",
      "line": <Zeilennummer oder null>,
      "suggestion": "<Konkrete Verbesserung>"
    }
  ],
  "optimizedCode": "<vollständiger optimierter Code als String, alle \\n escaped>"
}

Regeln:
- Maximal 10 Issues
- Priorisiere echte Probleme, keine False Positives
- optimizedCode soll den originalen Code mit allen Fixes angewendet enthalten
- Antworte auf Deutsch`;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, remaining } = getRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit erreicht. Bitte in einer Stunde erneut versuchen." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  let body: { code?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Request Body." }, { status: 400 });
  }

  const { code, language: rawLang = "javascript" } = body;

  const ALLOWED_LANGUAGES = ["javascript", "typescript", "python", "go"];
  const language = ALLOWED_LANGUAGES.includes(rawLang as string)
    ? rawLang
    : "javascript";

  if (!code || typeof code !== "string" || code.trim().length < 10) {
    return NextResponse.json({ error: "Kein oder zu kurzer Code übergeben." }, { status: 400 });
  }

  if (code.length > 50000) {
    return NextResponse.json({ error: "Code zu lang. Maximal 50.000 Zeichen." }, { status: 400 });
  }

  const XAI_API_KEY = process.env.XAI_API_KEY;

  if (!XAI_API_KEY) {
    return NextResponse.json({ error: "API nicht konfiguriert." }, { status: 500 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      "https://api.x.ai/v1/chat/completions",
      {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "grok-3-mini-beta",
          max_tokens: 4096,
          temperature: 0.2,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Sprache: ${language}\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\``,
            },
          ],
        }),
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const err = await response.text();
      console.error("xAI API error:", response.status, err);
      return NextResponse.json(
        { error: "AI-Analyse fehlgeschlagen. Bitte erneut versuchen." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content ?? "";

    const cleaned = rawContent
      .replace(/^```(?:json)?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse failed:", cleaned.substring(0, 300));
      return NextResponse.json(
        { error: "Antwort konnte nicht verarbeitet werden. Bitte erneut versuchen." },
        { status: 500 }
      );
    }

    // Validate expected response structure
    if (
      typeof parsed.score !== "number" ||
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.issues)
    ) {
      console.error("Invalid response structure:", JSON.stringify(parsed).substring(0, 300));
      return NextResponse.json(
        { error: "Ungültige AI-Antwort. Bitte erneut versuchen." },
        { status: 500 }
      );
    }

    const validated = {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      summary: parsed.summary,
      issues: parsed.issues.slice(0, 10),
      optimizedCode: typeof parsed.optimizedCode === "string" ? parsed.optimizedCode : "",
    };

    return NextResponse.json(validated, {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (error) {
    console.error("Review route error:", error);
    return NextResponse.json(
      { error: "Interner Fehler. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
