import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

// POST /api/review — AI Code Review via Gemini
export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY nicht konfiguriert." },
      { status: 500 }
    );
  }

  let body: { code?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Ungültiger JSON-Body." },
      { status: 400 }
    );
  }

  const { code, language } = body;

  if (!code || !code.trim()) {
    return NextResponse.json(
      { error: "Code ist erforderlich." },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenAI({ apiKey });

    const prompt = `Analysiere den folgenden ${language || "Code"} und gib ein strukturiertes Review in deutscher Sprache zurück.

Fokussiere dich auf:
1. Best Practices
2. Sicherheit
3. Performance
4. Lesbarkeit

Code:
${code}`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Kurze Zusammenfassung des Reviews",
            },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description:
                      "Kategorie (z.B. Sicherheit, Performance, Best Practice, Lesbarkeit)",
                  },
                  severity: {
                    type: Type.STRING,
                    description: "Schweregrad: Niedrig, Mittel oder Hoch",
                  },
                  description: {
                    type: Type.STRING,
                    description: "Detaillierte Beschreibung des Problems",
                  },
                  suggestion: {
                    type: Type.STRING,
                    description: "Konkreter Verbesserungsvorschlag",
                  },
                },
                required: ["type", "severity", "description", "suggestion"],
              },
            },
            score: {
              type: Type.NUMBER,
              description: "Gesamtbewertung von 0 bis 100",
            },
          },
          required: ["summary", "issues", "score"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json(
        { error: "Leere Antwort von Gemini." },
        { status: 502 }
      );
    }

    const reviewData = JSON.parse(text);

    return NextResponse.json({
      ...reviewData,
      model: "gemini-2.0-flash",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";

    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        error: "Analyse fehlgeschlagen.",
        details: message,
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    model: "gemini-2.0-flash",
    endpoint: "/api/review",
  });
}
