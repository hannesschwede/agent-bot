"use client";

import { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────
interface ReviewIssue {
  type: string;
  severity: string;
  description: string;
  suggestion: string;
}

interface ReviewResult {
  summary: string;
  issues: ReviewIssue[];
  score: number;
  model: string;
}

// ─── Constants ──────────────────────────────────────────────────
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
] as const;

// ─── Helpers ────────────────────────────────────────────────────
function severityStyles(severity: string) {
  switch (severity.toLowerCase()) {
    case "hoch":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "mittel":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "niedrig":
      return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    default:
      return "bg-white/5 text-white/60 border-white/10";
  }
}

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

// ─── Component ──────────────────────────────────────────────────
export default function CodeReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState<{
    message: string;
    details?: string;
  } | null>(null);

  const handleReview = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || "Analyse fehlgeschlagen");
      }

      setResult(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten";
      setError({ message: "Analyse fehlgeschlagen", details: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#182332] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF4F15] font-mono text-sm font-black">
              {"</>"}
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Code Reviewer
              </h1>
              <p className="text-xs text-white/40">by agent-bot.de</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            Gemini 2.0 Flash
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── Left: Input ────────────────────────────────── */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Eingabe
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-[#FF4F15] focus:outline-none focus:ring-1 focus:ring-[#FF4F15]"
                >
                  {LANGUAGES.map((l) => (
                    <option
                      key={l.value}
                      value={l.value}
                      className="bg-[#182332] text-white"
                    >
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Füge hier deinen Code ein..."
                spellCheck={false}
                className="h-[460px] w-full resize-none bg-transparent p-5 font-mono text-sm leading-relaxed text-white/90 placeholder:text-white/20 focus:outline-none"
              />

              {/* Submit */}
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                <span className="text-xs text-white/30">
                  {code.split("\n").length} Zeilen
                </span>
                <button
                  onClick={handleReview}
                  disabled={loading || !code.trim()}
                  className="flex items-center gap-2 rounded-xl bg-[#FF4F15] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#ff6a3a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Analysiere…
                    </>
                  ) : (
                    <>Review starten →</>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* ── Right: Results ─────────────────────────────── */}
          <section className="space-y-6">
            {/* Empty State */}
            {!result && !error && !loading && (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 p-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF4F15]/10 font-mono text-2xl text-[#FF4F15]">
                  {"</>"}
                </div>
                <h3 className="mb-2 text-lg font-bold">Bereit</h3>
                <p className="max-w-xs text-sm text-white/40">
                  Code links einfügen und &quot;Review starten&quot; klicken.
                </p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex h-full flex-col items-center justify-center p-12">
                <div className="relative mb-8">
                  <div className="h-20 w-20 animate-spin rounded-full border-4 border-white/10 border-t-[#FF4F15]" />
                </div>
                <p className="animate-pulse text-sm font-medium text-white/50">
                  Gemini analysiert deinen Code…
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                <h3 className="mb-2 text-lg font-bold text-red-400">
                  {error.message}
                </h3>
                {error.details && (
                  <pre className="mb-4 max-h-48 overflow-auto rounded-lg bg-black/30 p-4 font-mono text-xs text-red-300">
                    {error.details}
                  </pre>
                )}
                <button
                  onClick={handleReview}
                  className="text-sm font-semibold text-red-400 hover:underline"
                >
                  Erneut versuchen →
                </button>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Summary + Score */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-bold">Zusammenfassung</h3>
                    <div className="text-right">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-white/30">
                        Score
                      </span>
                      <span
                        className={`text-3xl font-black ${scoreColor(result.score)}`}
                      >
                        {result.score}
                      </span>
                      <span className="text-lg text-white/30">/100</span>
                    </div>
                  </div>
                  <p className="leading-relaxed text-white/60">
                    {result.summary}
                  </p>
                </div>

                {/* Issues */}
                {result.issues.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="px-1 text-xs font-bold uppercase tracking-widest text-white/30">
                      Probleme ({result.issues.length})
                    </h4>
                    {result.issues.map((issue, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                      >
                        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${severityStyles(issue.severity)}`}
                          >
                            {issue.severity}
                          </span>
                          <span className="text-sm font-semibold text-white/70">
                            {issue.type}
                          </span>
                        </div>
                        <div className="space-y-3 p-5">
                          <div>
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/25">
                              Problem
                            </span>
                            <p className="text-sm leading-relaxed text-white/60">
                              {issue.description}
                            </p>
                          </div>
                          <div className="rounded-lg border border-[#FF4F15]/15 bg-[#FF4F15]/5 p-4">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#FF4F15]/50">
                              Vorschlag
                            </span>
                            <p className="text-sm font-medium leading-relaxed text-white/80">
                              {issue.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* All good */}
                {result.issues.length === 0 && (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                      ✓
                    </div>
                    <h3 className="text-lg font-bold text-emerald-400">
                      Hervorragend!
                    </h3>
                    <p className="text-sm text-emerald-400/60">
                      Keine Probleme gefunden.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
