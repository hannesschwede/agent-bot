"use client";

import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Severity = "critical" | "high" | "medium" | "low";
type Language = "javascript" | "typescript" | "python" | "go";

interface Issue {
  id: string;
  severity: Severity;
  category: string;
  title: string;
  description: string;
  line: number | null;
  suggestion: string;
}

interface ReviewResult {
  score: number;
  summary: string;
  issues: Issue[];
  optimizedCode: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
];

const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; color: string; bg: string; border: string }
> = {
  critical: {
    label: "KRITISCH",
    color: "#FF2D2D",
    bg: "rgba(255,45,45,0.08)",
    border: "rgba(255,45,45,0.3)",
  },
  high: {
    label: "HOCH",
    color: "#FF8C00",
    bg: "rgba(255,140,0,0.08)",
    border: "rgba(255,140,0,0.3)",
  },
  medium: {
    label: "MITTEL",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.3)",
  },
  low: {
    label: "INFO",
    color: "#4FC3F7",
    bg: "rgba(79,195,247,0.08)",
    border: "rgba(79,195,247,0.3)",
  },
};

const SAMPLE_CODE = `// ❌ Problematischer Code — zum Testen
const API_KEY = "sk-1234567890abcdef";

async function fetchData(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const data = response.json();
  console.log("Data:", data);
  return data;
}

function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    fetchData(items[i]);
  }
}

async function saveUser(userData) {
  try {
    const result = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return result.json();
  } catch (e) {}
}`;

// ─── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 80 ? "#22C55E" : score >= 50 ? "#FFD700" : "#FF4F15";

  return (
    <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
      <svg width={96} height={96} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={48}
          cy={48}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={8}
        />
        <circle
          cx={48}
          cy={48}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color,
            lineHeight: 1,
            fontFamily: "monospace",
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          SCORE
        </span>
      </div>
    </div>
  );
}

// ─── Issue Card ───────────────────────────────────────────────────────────────
function IssueCard({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(false);
  const cfg = SEVERITY_CONFIG[issue.severity];

  return (
    <div
      style={{
        border: `1px solid ${open ? cfg.color : cfg.border}`,
        background: open ? cfg.bg : "transparent",
        transition: "all 0.2s ease",
        marginBottom: 8,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "12px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 900,
            color: cfg.color,
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            minWidth: 56,
          }}
        >
          {cfg.label}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            flex: 1,
          }}
        >
          {issue.title}
          {issue.line && (
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
                marginLeft: 8,
                fontFamily: "monospace",
              }}
            >
              Zeile {issue.line}
            </span>
          )}
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "0 16px 16px",
            borderTop: `1px solid ${cfg.border}`,
            paddingTop: 12,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 10,
              lineHeight: 1.5,
            }}
          >
            {issue.description}
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px 14px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#FF4F15",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              EMPFEHLUNG
            </p>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.5,
              }}
            >
              {issue.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
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
    result?.issues.filter(
      (i) => filter === "all" || i.severity === filter
    ) ?? [];

  const counts = result
    ? {
        critical: result.issues.filter((i) => i.severity === "critical").length,
        high: result.issues.filter((i) => i.severity === "high").length,
        medium: result.issues.filter((i) => i.severity === "medium").length,
        low: result.issues.filter((i) => i.severity === "low").length,
      }
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1117",
        color: "#fff",
        fontFamily:
          "'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      {/* Import font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea { resize: none; font-family: 'IBM Plex Mono', monospace; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,79,21,0.4); border-radius: 2px; }
        .analyze-btn:hover:not(:disabled) { background: #FF4F15 !important; transform: translateY(-1px); }
        .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .tab-btn:hover { color: #fff !important; }
        .filter-btn:hover { border-color: rgba(255,79,21,0.5) !important; }
        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .main-grid > div:first-child { min-height: 50vh; }
          .main-grid > div:last-child { min-height: 50vh; border-top: 1px solid rgba(255,255,255,0.06); }
        }
      `}</style>

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,17,23,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            opacity: 0.8,
          }}
        >
          <div style={{ width: 20, height: 20, background: "#FF4F15" }} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.2em",
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}
          >
            AGENT BOT
          </span>
        </a>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.15em",
          }}
        >
          CODE REVIEWER
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: loading ? "#FFD700" : result ? "#22C55E" : "#FF4F15",
              boxShadow: `0 0 6px ${loading ? "#FFD700" : result ? "#22C55E" : "#FF4F15"}`,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            {loading ? "ANALYSIERE" : result ? "FERTIG" : "BEREIT"}
          </span>
        </div>
      </nav>

      {/* Main Layout */}
      <div
        className="main-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "calc(100vh - 52px)",
        }}
      >
        {/* Left: Editor */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Editor Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* Language Select */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: 11,
                padding: "4px 10px",
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              {LANGUAGES.map((l) => (
                <option
                  key={l.value}
                  value={l.value}
                  style={{ background: "#1a1a2e" }}
                >
                  {l.label}
                </option>
              ))}
            </select>

            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
                marginLeft: "auto",
              }}
            >
              {lines} Zeilen · {chars.toLocaleString()} Zeichen
            </span>

            <button
              onClick={() => setCode(SAMPLE_CODE)}
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                padding: "4px 10px",
                cursor: "pointer",
                letterSpacing: "0.1em",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              BEISPIEL
            </button>

            <button
              onClick={() => {
                setCode("");
                setResult(null);
                setError(null);
              }}
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                padding: "4px 10px",
                cursor: "pointer",
                letterSpacing: "0.1em",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
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
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "rgba(255,255,255,0.85)",
              fontSize: 13,
              lineHeight: 1.7,
              padding: "20px 20px 20px 20px",
              letterSpacing: "0.01em",
              overflowY: "auto",
            }}
          />

          {/* Analyze Button */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              style={{
                width: "100%",
                background: "#182332",
                border: "1px solid rgba(255,79,21,0.4)",
                color: "#FF4F15",
                fontSize: 12,
                fontWeight: 700,
                padding: "12px",
                cursor: "pointer",
                letterSpacing: "0.2em",
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      border: "2px solid rgba(255,79,21,0.3)",
                      borderTopColor: "#FF4F15",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  ANALYSIERE...
                </>
              ) : (
                <>⟳ CODE ANALYSIEREN</>
              )}
            </button>
            <p
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                textAlign: "center",
                marginTop: 6,
                letterSpacing: "0.05em",
              }}
            >
              Powered by xAI · Grok 3 Mini Beta · 10 Analysen/Stunde
            </p>
          </div>
        </div>

        {/* Right: Results */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Empty State */}
          {!result && !error && !loading && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                color: "rgba(255,255,255,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  lineHeight: 1,
                }}
              >
                REVIEW.
              </div>
              <p style={{ fontSize: 12, letterSpacing: "0.1em" }}>
                Code einfügen und analysieren
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "3px solid rgba(255,79,21,0.2)",
                  borderTopColor: "#FF4F15",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.2em",
                }}
              >
                ANALYSIERE MIT GROK 3...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 32,
              }}
            >
              <div
                style={{
                  color: "#FF2D2D",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                }}
              >
                FEHLER
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {error}
              </p>
              <button
                onClick={handleAnalyze}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,79,21,0.4)",
                  color: "#FF4F15",
                  fontSize: 11,
                  padding: "8px 20px",
                  cursor: "pointer",
                  letterSpacing: "0.15em",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                ERNEUT VERSUCHEN
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <>
              {/* Result Header */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <ScoreRing score={result.score} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.5,
                      marginBottom: 10,
                    }}
                  >
                    {result.summary}
                  </p>
                  {/* Severity counts */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(
                      ["critical", "high", "medium", "low"] as Severity[]
                    ).map((s) => {
                      const c = counts![s];
                      if (!c) return null;
                      const cfg = SEVERITY_CONFIG[s];
                      return (
                        <span
                          key={s}
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: cfg.color,
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                            padding: "2px 8px",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {c} {cfg.label}
                        </span>
                      );
                    })}
                    {result.issues.length === 0 && (
                      <span
                        style={{
                          fontSize: 10,
                          color: "#22C55E",
                          letterSpacing: "0.1em",
                        }}
                      >
                        ✓ KEINE ISSUES
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {(["issues", "optimized"] as const).map((tab) => (
                  <button
                    key={tab}
                    className="tab-btn"
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      borderBottom:
                        activeTab === tab
                          ? "2px solid #FF4F15"
                          : "2px solid transparent",
                      color:
                        activeTab === tab
                          ? "#fff"
                          : "rgba(255,255,255,0.3)",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "10px",
                      cursor: "pointer",
                      letterSpacing: "0.15em",
                      fontFamily: "'IBM Plex Mono', monospace",
                      transition: "color 0.15s",
                    }}
                  >
                    {tab === "issues"
                      ? `ISSUES (${result.issues.length})`
                      : "OPTIMIERT"}
                  </button>
                ))}
              </div>

              {/* Issues Tab */}
              {activeTab === "issues" && (
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 16,
                  }}
                >
                  {/* Filter */}
                  {result.issues.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginBottom: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      {(
                        [
                          "all",
                          "critical",
                          "high",
                          "medium",
                          "low",
                        ] as const
                      ).map((f) => {
                        const active = filter === f;
                        const cfg =
                          f === "all" ? null : SEVERITY_CONFIG[f];
                        const count =
                          f === "all"
                            ? result.issues.length
                            : counts![f];
                        if (f !== "all" && !count) return null;
                        return (
                          <button
                            key={f}
                            className="filter-btn"
                            onClick={() => setFilter(f)}
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
                              fontSize: 10,
                              padding: "3px 10px",
                              cursor: "pointer",
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              transition: "all 0.15s",
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
                    <div
                      style={{
                        textAlign: "center",
                        padding: 40,
                        color: "rgba(255,255,255,0.2)",
                        fontSize: 12,
                        letterSpacing: "0.1em",
                      }}
                    >
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
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={handleCopy}
                      style={{
                        background: copied
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(255,79,21,0.1)",
                        border: `1px solid ${
                          copied
                            ? "rgba(34,197,94,0.4)"
                            : "rgba(255,79,21,0.4)"
                        }`,
                        color: copied ? "#22C55E" : "#FF4F15",
                        fontSize: 10,
                        padding: "5px 14px",
                        cursor: "pointer",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? "✓ KOPIERT" : "KOPIEREN"}
                    </button>
                  </div>
                  <pre
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      padding: 20,
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.8)",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
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
