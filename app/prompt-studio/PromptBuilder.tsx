"use client";

import { useEffect, useState } from "react";
import { generatePrompt } from "./lib/prompt-builder";
import type { PromptConfig, TargetModel } from "./lib/types";

const STORAGE_KEY = "prompt-studio-config-v1";
const MAX_TASK_LENGTH = 5000;

const MODELS: { value: TargetModel; label: string }[] = [
  { value: "universal", label: "Universal" },
  { value: "claude", label: "Claude" },
  { value: "gpt", label: "GPT" },
  { value: "gemini", label: "Gemini" },
];

const TONES: { value: PromptConfig["tone"]; label: string }[] = [
  { value: "professional", label: "Professionell" },
  { value: "casual", label: "Locker" },
  { value: "technical", label: "Technisch" },
  { value: "creative", label: "Kreativ" },
  { value: "educational", label: "Lehrreich" },
];

const TEMPLATES: { label: string; config: Partial<PromptConfig> }[] = [
  {
    label: "Code erklären",
    config: {
      task: "Erkläre mir den folgenden Code Zeile für Zeile. Gehe auf die wichtigsten Konzepte, Funktionen und potenzielle Fallstricke ein.",
      role: "erfahrener Software-Entwickler und Lehrer",
      outputFormat: "Nummerierte Liste mit kurzen Code-Beispielen",
      tone: "educational",
    },
  },
  {
    label: "Blog-Artikel",
    config: {
      task: "Schreibe einen strukturierten Blog-Artikel zu dem folgenden Thema. Der Artikel soll für Einsteiger verständlich sein, aber auch Profis einen Mehrwert bieten.",
      role: "erfahrener Technical-Writer",
      outputFormat: "Überschrift, Einleitung, 3-4 Absätze mit Zwischenüberschriften, Fazit",
      tone: "professional",
    },
  },
  {
    label: "E-Mail verfassen",
    config: {
      task: "Verfasse eine professionelle E-Mail zu dem folgenden Anliegen. Die E-Mail soll höflich, klar und zielgerichtet sein.",
      role: "erfahrener Kommunikationsprofi",
      outputFormat: "Betreff, Anrede, Fließtext, Grußformel",
      tone: "professional",
    },
  },
];

const EMPTY_CONFIG: PromptConfig = {
  task: "",
  role: "",
  context: "",
  outputFormat: "",
  tone: "professional",
  constraints: [],
  exampleInput: "",
  exampleOutput: "",
  targetModel: "universal",
  temperature: 0.7,
};

function loadConfig(): PromptConfig {
  if (typeof window === "undefined") return EMPTY_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CONFIG;
    const parsed = JSON.parse(raw) as Partial<PromptConfig>;
    return { ...EMPTY_CONFIG, ...parsed };
  } catch {
    return EMPTY_CONFIG;
  }
}

function saveConfig(config: PromptConfig) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore storage errors
  }
}

export default function PromptBuilder() {
  const [config, setConfig] = useState<PromptConfig>(EMPTY_CONFIG);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [constraintInput, setConstraintInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConfig(loadConfig());
  }, []);

  useEffect(() => {
    if (mounted) saveConfig(config);
  }, [config, mounted]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const update = <K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const addConstraint = () => {
    const trimmed = constraintInput.trim();
    if (!trimmed) return;
    update("constraints", [...config.constraints, trimmed]);
    setConstraintInput("");
  };

  const removeConstraint = (index: number) => {
    update(
      "constraints",
      config.constraints.filter((_, i) => i !== index)
    );
  };

  const applyTemplate = (template: (typeof TEMPLATES)[number]) => {
    setConfig((prev) => ({
      ...prev,
      ...template.config,
      constraints: template.config.constraints ?? prev.constraints,
    }));
    showToast(`Vorlage "${template.label}" geladen`);
  };

  const handleGenerate = () => {
    if (!config.task.trim()) return;
    setOutput(generatePrompt(config));
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast("Prompt kopiert!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Kopieren fehlgeschlagen");
    }
  };

  const handleReset = () => {
    setConfig(EMPTY_CONFIG);
    setOutput("");
    setConstraintInput("");
    setShowAdvanced(false);
    showToast("Formular zurückgesetzt");
  };

  const taskChars = config.task.length;
  const taskWarning = taskChars > MAX_TASK_LENGTH * 0.9;

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[fade-in_0.2s_ease-out]">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-3 rounded-lg shadow-xl text-sm font-bold flex items-center gap-2">
            <span>✓</span>
            {toast}
          </div>
        </div>
      )}

      {/* Templates */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((template) => (
          <button
            key={template.label}
            onClick={() => applyTemplate(template)}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] border border-[var(--border)] rounded-lg text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 hover:-translate-y-0.5 bg-[var(--card)]"
          >
            {template.label}
          </button>
        ))}
      </div>

      {/* Task + Model */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-glass dark:shadow-glass-dark">
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
          Aufgabe <span className="text-[var(--primary)]">*</span>
        </label>
        <textarea
          value={config.task}
          onChange={(e) => update("task", e.target.value.slice(0, MAX_TASK_LENGTH))}
          placeholder="Was soll die KI tun? z.B. 'Schreibe eine Produktbeschreibung für eine Smart-Trinkflasche'"
          rows={5}
          className="w-full border-2 border-[var(--border)] rounded-lg p-4 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y"
        />
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[11px] font-medium ${taskWarning ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}>
            {taskChars.toLocaleString()} / {MAX_TASK_LENGTH.toLocaleString()}
          </span>
          {taskWarning && (
            <span className="text-[11px] text-[var(--primary)]">Fast am Limit</span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              Ziel-Modell
            </label>
            <select
              value={config.targetModel}
              onChange={(e) => update("targetModel", e.target.value as TargetModel)}
              className="w-full border-2 border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none transition-colors bg-[var(--background)] text-[var(--foreground)]"
            >
              {MODELS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              Kreativität / Temperatur: {config.temperature.toFixed(1)}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={config.temperature}
              onChange={(e) => update("temperature", parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] mt-1">
              <span>Präzise</span>
              <span>Kreativ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <details
        open={showAdvanced}
        onToggle={(e) => setShowAdvanced(e.currentTarget.open)}
        className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-glass dark:shadow-glass-dark"
      >
        <summary className="flex cursor-pointer items-center justify-between p-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors select-none">
          <span>Erweiterte Optionen</span>
          <span className="text-[var(--muted-foreground)] group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="space-y-5 border-t border-[var(--border)] p-5 sm:p-6">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Rolle
            </label>
            <input
              type="text"
              value={config.role}
              onChange={(e) => update("role", e.target.value)}
              placeholder="z.B. 'ein erfahrener Senior Backend-Entwickler'"
              className="w-full border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Kontext
            </label>
            <textarea
              value={config.context}
              onChange={(e) => update("context", e.target.value)}
              placeholder="Hintergrundinformationen, die die KI kennen muss"
              rows={2}
              className="w-full border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Ausgabeformat
            </label>
            <input
              type="text"
              value={config.outputFormat}
              onChange={(e) => update("outputFormat", e.target.value)}
              placeholder="z.B. 'JSON mit Titel, Beschreibung und Bullet Points'"
              className="w-full border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Tonalität
            </label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => update("tone", t.value)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] border-2 rounded-lg transition-colors ${
                    config.tone === t.value
                      ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Einschränkungen
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={constraintInput}
                onChange={(e) => setConstraintInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addConstraint()}
                placeholder="Einschränkung eingeben und Enter drücken"
                className="flex-1 border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
              <button
                onClick={addConstraint}
                className="border-2 border-[var(--border)] rounded-lg px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                +
              </button>
            </div>
            {config.constraints.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {config.constraints.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 border-2 border-[var(--border)] rounded-lg px-3 py-1 text-sm text-[var(--foreground)] bg-[var(--background)]"
                  >
                    {c}
                    <button
                      onClick={() => removeConstraint(i)}
                      className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                Beispiel-Input
              </label>
              <textarea
                value={config.exampleInput}
                onChange={(e) => update("exampleInput", e.target.value)}
                placeholder="Was würde der Nutzer sagen?"
                rows={2}
                className="w-full border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                Erwartete Ausgabe
              </label>
              <textarea
                value={config.exampleOutput}
                onChange={(e) => update("exampleOutput", e.target.value)}
                placeholder="Was soll die KI antworten?"
                rows={2}
                className="w-full border-2 border-[var(--border)] rounded-lg p-3 text-sm bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none transition-colors resize-y"
              />
            </div>
          </div>
        </div>
      </details>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGenerate}
          disabled={!config.task.trim()}
          className="flex-1 bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prompt generieren
        </button>
        {output && (
          <button
            onClick={handleReset}
            className="border-2 border-[var(--border)] rounded-lg px-6 py-4 text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            title="Zurücksetzen"
          >
            &#x21BA;
          </button>
        )}
      </div>

      {/* Output */}
      {output && (
        <div className="rounded-2xl border border-[var(--border)] bg-[#151b23] shadow-2xl shadow-black/20 overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
              Generierter Prompt
            </h3>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-200 flex items-center gap-2 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
              }`}
            >
              {copied ? (
                <>
                  <span>✓</span> Kopiert
                </>
              ) : (
                "Kopieren"
              )}
            </button>
          </div>
          <pre className="p-5 sm:p-6 text-sm leading-relaxed font-mono text-white/85 whitespace-pre-wrap overflow-x-auto max-h-[600px] overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
