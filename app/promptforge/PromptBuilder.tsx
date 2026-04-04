"use client";

import { useState, useCallback } from "react";
import { generatePrompt, MODEL_PROFILES } from "./lib/prompt-builder";
import type { PromptConfig, TargetModel } from "./lib/types";

const TONES = [
  { value: "professional", label: "Professionell" },
  { value: "casual", label: "Locker" },
  { value: "technical", label: "Technisch" },
  { value: "creative", label: "Kreativ" },
  { value: "educational", label: "Lehrreich" },
] as const;

const EMPTY_CONFIG: PromptConfig = {
  task: "",
  context: "",
  targetModel: "claude",
  role: "",
  tone: "professional",
  outputFormat: "",
  constraints: [],
  exampleInput: "",
  exampleOutput: "",
};

export default function PromptBuilder() {
  const [config, setConfig] = useState<PromptConfig>(EMPTY_CONFIG);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [constraintInput, setConstraintInput] = useState("");

  const update = useCallback(
    <K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

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

  const handleGenerate = () => {
    if (!config.task.trim()) return;
    setOutput(generatePrompt(config));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig(EMPTY_CONFIG);
    setOutput("");
    setConstraintInput("");
    setShowExamples(false);
  };

  const canGenerate = config.task.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Model Selector */}
      <div>
        <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Ziel-Modell
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            Object.entries(MODEL_PROFILES) as [
              TargetModel,
              (typeof MODEL_PROFILES)[TargetModel],
            ][]
          ).map(([key, profile]) => (
            <button
              key={key}
              onClick={() => update("targetModel", key)}
              className={`border-2 p-4 text-left transition-colors cursor-pointer ${
                config.targetModel === key
                  ? "border-accent bg-accent/5"
                  : "border-black/10 hover:border-accent/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{profile.icon}</span>
                <span className="text-sm font-bold">{profile.name}</span>
              </div>
              <p className="mt-1 text-[11px] text-black/40">
                {profile.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Task (required) */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Aufgabe <span className="text-accent">*</span>
        </label>
        <textarea
          value={config.task}
          onChange={(e) => update("task", e.target.value)}
          placeholder="Was soll die KI tun? z.B. 'Schreibe eine Produktbeschreibung für eine Smart-Trinkflasche'"
          rows={3}
          className="w-full border-2 border-black/10 p-4 text-sm focus:border-accent focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Rolle
        </label>
        <input
          type="text"
          value={config.role}
          onChange={(e) => update("role", e.target.value)}
          placeholder="z.B. 'ein erfahrener Senior Backend-Entwickler mit 10 Jahren Erfahrung'"
          className="w-full border-2 border-black/10 p-4 text-sm focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      {/* Context */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Kontext
        </label>
        <textarea
          value={config.context}
          onChange={(e) => update("context", e.target.value)}
          placeholder="Hintergrundinformationen, die die KI kennen muss"
          rows={2}
          className="w-full border-2 border-black/10 p-4 text-sm focus:border-accent focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Tonalität
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => update("tone", t.value)}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] border-2 transition-colors cursor-pointer ${
                config.tone === t.value
                  ? "border-accent bg-accent text-white"
                  : "border-black/10 text-black/50 hover:border-accent hover:text-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output Format */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Ausgabeformat
        </label>
        <input
          type="text"
          value={config.outputFormat}
          onChange={(e) => update("outputFormat", e.target.value)}
          placeholder="z.B. 'JSON mit Titel, Beschreibung und Bullet Points'"
          className="w-full border-2 border-black/10 p-4 text-sm focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      {/* Constraints */}
      <div>
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Einschränkungen
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={constraintInput}
            onChange={(e) => setConstraintInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addConstraint()}
            placeholder="Einschränkung eingeben und Enter drücken"
            className="flex-1 border-2 border-black/10 p-3 text-sm focus:border-accent focus:outline-none transition-colors"
          />
          <button
            onClick={addConstraint}
            className="border-2 border-black/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            Hinzufügen
          </button>
        </div>
        {config.constraints.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {config.constraints.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 border-2 border-black/10 px-3 py-1.5 text-sm"
              >
                {c}
                <button
                  onClick={() => removeConstraint(i)}
                  className="text-black/30 hover:text-accent transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Few-Shot Examples (collapsible) */}
      <div>
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-accent transition-colors cursor-pointer bg-transparent border-none"
        >
          <span
            className="transition-transform duration-200"
            style={{
              display: "inline-block",
              transform: showExamples ? "rotate(90deg)" : "none",
            }}
          >
            &#x25B6;
          </span>
          Few-Shot Beispiel (optional)
        </button>
        {showExamples && (
          <div className="mt-4 border-2 border-black/10 p-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                Beispiel-Input
              </label>
              <textarea
                value={config.exampleInput}
                onChange={(e) => update("exampleInput", e.target.value)}
                placeholder="Was würde der Nutzer sagen?"
                rows={2}
                className="w-full border-2 border-black/10 p-3 text-sm focus:border-accent focus:outline-none transition-colors resize-y"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">
                Erwartete Ausgabe
              </label>
              <textarea
                value={config.exampleOutput}
                onChange={(e) => update("exampleOutput", e.target.value)}
                placeholder="Was soll die KI antworten?"
                rows={2}
                className="w-full border-2 border-black/10 p-3 text-sm focus:border-accent focus:outline-none transition-colors resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* Generate + Reset Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="flex-1 bg-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-dark"
        >
          Prompt generieren
        </button>
        {output && (
          <button
            onClick={handleReset}
            className="border-2 border-black/10 px-4 py-4 text-black/40 hover:border-accent hover:text-accent transition-colors cursor-pointer"
            title="Zurücksetzen"
          >
            &#x21BA;
          </button>
        )}
      </div>

      {/* Output */}
      {output && (
        <div className="border-2 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {MODEL_PROFILES[config.targetModel].icon}
              </span>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
                {MODEL_PROFILES[config.targetModel].name}-optimierter Prompt
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer ${
                copied
                  ? "bg-green-500 text-white border-2 border-green-500"
                  : "bg-dark text-white border-2 border-dark hover:bg-accent hover:border-accent"
              }`}
            >
              {copied ? "Kopiert!" : "Kopieren"}
            </button>
          </div>
          <pre className="bg-dark text-white/80 p-5 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto max-h-[400px] overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
