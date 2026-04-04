"use client";

import { useState, useRef, useCallback } from "react";
import type { Language, Severity, ReviewResult } from "./types";
import { LANGUAGES, SEVERITY_CONFIG, SAMPLE_CODE } from "./constants";
import ScoreRing from "./components/ScoreRing";
import IssueCard from "./components/IssueCard";

export default function CodeReviewerTool() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"issues" | "optimized">("issues");
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split("\n").length;
  const chars = code.length;

  const handleAnalyze = useCallback(async () => {
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
        setError(data.error || "Analyse fehlgeschlagen.");
        return;
      }

      setResult(data);
      setActiveTab("issues");
      setFilter("all");
    } catch {
      setError("Netzwerkfehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }, [code, language]);

  const handleCopy = useCallback(() => {
    if (!result?.optimizedCode) return;
    navigator.clipboard.writeText(result.optimizedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const filteredIssues =
    result?.issues.filter((i) => filter === "all" || i.severity === filter) ??
    [];

  const counts = result
    ? {
        critical: result.issues.filter((i) => i.severity === "critical").length,
        high: result.issues.filter((i) => i.severity === "high").length,
        medium: result.issues.filter((i) => i.severity === "medium").length,
        low: result.issues.filter((i) => i.severity === "low").length,
      }
    : null;

  return (
    <div className="min-h-screen bg-surface text-white font-mono">
      {/* Global styles for this page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;700;900&display=swap');
        textarea { resize: none; font-family: 'IBM Plex Mono', monospace; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,79,21,0.4); border-radius: 2px; }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-white/[0.06] px-6 h-[52px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 no-underline opacity-80">
          <div className="w-5 h-5 bg-accent" />
          <span className="text-[11px] font-bold text-white tracking-[0.2em] font-sans">
            AGENT BOT
          </span>
        </a>
        <div className="text-[11px] text-white/30 tracking-[0.15em]">
          CODE REVIEWER
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: loading ? "#FFD700" : result ? "#22C55E" : "#FF4F15",
              boxShadow: `0 0 6px ${loading ? "#FFD700" : result ? "#22C55E" : "#FF4F15"}`,
            }}
          />
          <span className="text-[10px] text-white/40 tracking-[0.1em]">
            {loading ? "ANALYSIERE" : result ? "FERTIG" : "BEREIT"}
          </span>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-52px)]">
        {/* Left: Editor */}
        <div className="flex flex-col border-r border-white/[0.06] min-h-[50vh]">
          {/* Editor Header */}
          <div className="p-3 px-4 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/5 border border-white/10 text-white text-[11px] px-2.5 py-1 font-mono tracking-[0.05em] cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value} className="bg-[#1a1a2e]">
                  {l.label}
                </option>
              ))}
            </select>

            <span className="text-[10px] text-white/20 font-mono ml-auto">
              {lines} Zeilen &middot; {chars.toLocaleString()} Zeichen
            </span>

            <button
              onClick={() => setCode(SAMPLE_CODE)}
              className="bg-transparent border border-white/10 text-white/40 text-[10px] px-2.5 py-1 cursor-pointer tracking-[0.1em] font-mono hover:text-white/60 hover:border-white/20 transition-colors"
            >
              BEISPIEL
            </button>

            <button
              onClick={() => {
                setCode("");
                setResult(null);
                setError(null);
              }}
              className="bg-transparent border border-white/10 text-white/40 text-[10px] px-2.5 py-1 cursor-pointer tracking-[0.1em] font-mono hover:text-white/60 hover:border-white/20 transition-colors"
            >
              LEEREN
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Code hier einfügen...\n// Unterstützt: JavaScript, TypeScript, Python, Go\n// Cmd+Enter zum Analysieren`}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleAnalyze();
            }}
            className="flex-1 bg-transparent border-none outline-none text-white/85 text-[13px] leading-[1.7] p-5 tracking-[0.01em] overflow-y-auto"
          />

          {/* Analyze Button */}
          <div className="p-3 px-4 border-t border-white/[0.06] bg-white/[0.02]">
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className="w-full bg-dark border border-accent/40 text-accent text-xs font-bold py-3 cursor-pointer tracking-[0.2em] font-mono transition-all duration-200 flex items-center justify-center gap-2.5 hover:bg-accent hover:text-white hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dark disabled:hover:text-accent disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  ANALYSIERE...
                </>
              ) : (
                <>&#x27F3; CODE ANALYSIEREN</>
              )}
            </button>
            <p className="text-[10px] text-white/20 text-center mt-1.5 tracking-[0.05em]">
              Powered by xAI &middot; Grok 3 Mini Beta &middot; 10 Analysen/Stunde
            </p>
          </div>
        </div>

        {/* Right: Results */}
        <div className="flex flex-col overflow-hidden min-h-[50vh] md:border-t-0 border-t border-white/[0.06]">
          {/* Empty State */}
          {!result && !error && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/15">
              <div className="text-5xl font-black tracking-[-0.04em] font-sans leading-none">
                REVIEW.
              </div>
              <p className="text-xs tracking-[0.1em]">
                Code einfügen und analysieren
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5">
              <div className="w-12 h-12 border-[3px] border-accent/20 border-t-accent rounded-full animate-spin" />
              <p className="text-[11px] text-white/40 tracking-[0.2em]">
                ANALYSIERE MIT GROK 3...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
              <div className="text-[#FF2D2D] text-[11px] tracking-[0.15em] font-bold">
                FEHLER
              </div>
              <p className="text-white/50 text-[13px] text-center">{error}</p>
              <button
                onClick={handleAnalyze}
                className="bg-transparent border border-accent/40 text-accent text-[11px] py-2 px-5 cursor-pointer tracking-[0.15em] font-mono hover:bg-accent/10 transition-colors"
              >
                ERNEUT VERSUCHEN
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <>
              {/* Result Header */}
              <div className="p-4 px-5 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-4">
                <ScoreRing score={result.score} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/60 leading-relaxed mb-2.5">
                    {result.summary}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {(["critical", "high", "medium", "low"] as Severity[]).map(
                      (s) => {
                        const c = counts![s];
                        if (!c) return null;
                        const cfg = SEVERITY_CONFIG[s];
                        return (
                          <span
                            key={s}
                            className="text-[10px] font-bold tracking-[0.1em] px-2 py-0.5"
                            style={{
                              color: cfg.color,
                              background: cfg.bg,
                              border: `1px solid ${cfg.border}`,
                            }}
                          >
                            {c} {cfg.label}
                          </span>
                        );
                      }
                    )}
                    {result.issues.length === 0 && (
                      <span className="text-[10px] text-green-400 tracking-[0.1em]">
                        &#x2713; KEINE ISSUES
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/[0.06]">
                {(["issues", "optimized"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 bg-transparent border-none text-[11px] font-bold py-2.5 cursor-pointer tracking-[0.15em] font-mono transition-colors hover:text-white ${
                      activeTab === tab
                        ? "text-white border-b-2 border-b-accent"
                        : "text-white/30 border-b-2 border-b-transparent"
                    }`}
                  >
                    {tab === "issues"
                      ? `ISSUES (${result.issues.length})`
                      : "OPTIMIERT"}
                  </button>
                ))}
              </div>

              {/* Issues Tab */}
              {activeTab === "issues" && (
                <div className="flex-1 overflow-y-auto p-4">
                  {result.issues.length > 0 && (
                    <div className="flex gap-1.5 mb-3.5 flex-wrap">
                      {(
                        ["all", "critical", "high", "medium", "low"] as const
                      ).map((f) => {
                        const active = filter === f;
                        const cfg = f === "all" ? null : SEVERITY_CONFIG[f];
                        const count =
                          f === "all" ? result.issues.length : counts![f];
                        if (f !== "all" && !count) return null;
                        return (
                          <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="text-[10px] py-0.5 px-2.5 cursor-pointer font-mono font-bold tracking-[0.1em] transition-all duration-150 hover:border-accent/50"
                            style={{
                              background: active
                                ? cfg?.bg ?? "rgba(255,79,21,0.1)"
                                : "none",
                              border: `1px solid ${
                                active
                                  ? cfg?.color ?? "#FF4F15"
                                  : "rgba(255,255,255,0.1)"
                              }`,
                              color: active
                                ? cfg?.color ?? "#FF4F15"
                                : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {f === "all"
                              ? `ALLE (${count})`
                              : `${cfg!.label} (${count})`}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-10 text-white/20 text-xs tracking-[0.1em]">
                      {result.issues.length === 0
                        ? "✓ KEINE ISSUES GEFUNDEN"
                        : "KEINE ISSUES IN DIESER KATEGORIE"}
                    </div>
                  ) : (
                    filteredIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  )}
                </div>
              )}

              {/* Optimized Tab */}
              {activeTab === "optimized" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-2 px-4 border-b border-white/[0.06] flex justify-end gap-2">
                    <button
                      onClick={handleCopy}
                      className={`text-[10px] py-1 px-3.5 cursor-pointer font-mono font-bold tracking-[0.1em] transition-all duration-200 ${
                        copied
                          ? "bg-green-500/10 border border-green-500/40 text-green-400"
                          : "bg-accent/10 border border-accent/40 text-accent"
                      }`}
                    >
                      {copied ? "✓ KOPIERT" : "KOPIEREN"}
                    </button>
                  </div>
                  <pre className="flex-1 overflow-y-auto p-5 text-xs leading-[1.7] text-white/80 whitespace-pre-wrap break-words">
                    {result.optimizedCode}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
