// app/api/review/route.ts
// Gemini Flash Code Reviewer — Serverless Route
// Env var required: GEMINI_API_KEY

import { NextRequest, NextResponse } from "next/server";

// ===============================================
// Rate Limiting (in-memory, per Vercel instance)
// For production: replace with Upstash Redis
// ===============================================
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 5;          // max requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

// ===============================================
// Gemini Flash API Call
// ===============================================
async function callGemini(code: string, language: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prompt = buildPrompt(code, language);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

// ===============================================
// Prompt Engineering
// ===============================================
function buildPrompt(code: string, language: string): string {
  return `You are a senior ${language} developer doing a thorough code review.

Analyze the following ${language} code and return a JSON object with this exact structure:

{
  "score": <number 0-100, overall code quality score>,
  "summary": "<one sentence summary of the code quality>",
  "issues": [
    {
      "id": "<e.g. SEC-001>",
      "category": "<security|performance|codeQuality|bestPractices>",
      "severity": "<critical|high|medium|low>",
      "title": "<short title in German>",
      "description": "<explanation in German, 1-2 sentences>",
      "lineHint": "<relevant code snippet, max 60 chars>",
      "suggestion": "<concrete fix recommendation in German>"
    }
  ],
  "optimizedCode": "<the full improved version of the code with all issues fixed, as a string>"
}

Rules:
- Return ONLY valid JSON, no markdown, no backticks, no preamble
- issues array must be sorted: critical first, then high, medium, low
- optimizedCode must be the actual fixed code, not a placeholder
- Be specific — reference actual variable names, line patterns from the code
- Max 10 issues total, only report real problems
- If code is clean, return empty issues array and high score
- All text fields (title, description, suggestion) must be in German

Code to review (${language}):
\`\`\`${language}
${code.slice(0, 6000)}
\`\`\``;
}

// ===============================================
// Route Handler
// ===============================================
export async function POST(req: NextRequest) {
  // Rate limiting
  const key = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(key);

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit erreicht. Bitte in einer Stunde erneut versuchen." },
      {
        status: 429,
        headers: { "X-RateLimit-Remaining": "0" },
      }
    );
  }

  // Parse body
  let body: { code: string; language: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Request Body" }, { status: 400 });
  }

  const { code, language } = body;

  if (!code || typeof code !== "string" || code.trim().length < 10) {
    return NextResponse.json({ error: "Kein Code übergeben" }, { status: 400 });
  }

  if (!["javascript", "typescript", "python", "go"].includes(language)) {
    return NextResponse.json({ error: "Sprache nicht unterstützt" }, { status: 400 });
  }

  // Code length guard (protect token usage)
  if (code.length > 8000) {
    return NextResponse.json(
      { error: "Code zu lang. Bitte max. 8.000 Zeichen einreichen." },
      { status: 413 }
    );
  }

  // Call Gemini
  try {
    const raw = await callGemini(code, language);
    const result = JSON.parse(raw);

    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json(
      { error: "Analyse fehlgeschlagen. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", model: "gemini-2.0-flash" });
}
