"use client";

import { useState, useMemo, useCallback } from "react";

// ─── Template Types ──────────────────────────────────────────────────────────
interface Variable {
  key: string;
  label: string;
  placeholder: string;
}

interface Template {
  id: string;
  category: string;
  title: string;
  description: string;
  template: string;
  variables: Variable[];
}

// ─── Templates ───────────────────────────────────────────────────────────────
const CATEGORIES = ["Coding", "Marketing", "Analyse", "Kreativ"] as const;

const TEMPLATES: Template[] = [
  {
    id: "code-review",
    category: "Coding",
    title: "Code-Review",
    description: "Lass deinen Code professionell analysieren.",
    template: `Du bist ein erfahrener {SPRACHE}-Entwickler mit Fokus auf Clean Code und Best Practices.

Analysiere den folgenden Code und gib strukturiertes Feedback:

\`\`\`{SPRACHE}
{CODE}
\`\`\`

Prüfe auf:
1. Sicherheitslücken
2. Performance-Probleme
3. Code-Qualität und Lesbarkeit
4. Fehlende Error-Behandlung

Antworte auf Deutsch mit konkreten Verbesserungsvorschlägen.`,
    variables: [
      { key: "SPRACHE", label: "Programmiersprache", placeholder: "TypeScript" },
      { key: "CODE", label: "Code-Snippet", placeholder: "function example() { ... }" },
    ],
  },
  {
    id: "refactor",
    category: "Coding",
    title: "Refactoring",
    description: "Optimiere bestehenden Code systematisch.",
    template: `Du bist ein Senior {SPRACHE}-Architekt. Refactore den folgenden Code nach diesen Prinzipien:
- SOLID-Prinzipien
- DRY (Don't Repeat Yourself)
- Klare Namensgebung
- Minimale Komplexität

Kontext: {KONTEXT}

\`\`\`{SPRACHE}
{CODE}
\`\`\`

Liefere den vollständig refactorten Code mit Kommentaren, die erklären, was du geändert hast und warum.`,
    variables: [
      { key: "SPRACHE", label: "Programmiersprache", placeholder: "Python" },
      { key: "KONTEXT", label: "Projekt-Kontext", placeholder: "REST-API mit FastAPI" },
      { key: "CODE", label: "Code zum Refactoren", placeholder: "def process_data(data): ..." },
    ],
  },
  {
    id: "landing-page",
    category: "Marketing",
    title: "Landing-Page-Text",
    description: "Conversion-optimierte Texte für Landing Pages.",
    template: `Du bist ein erfahrener Conversion-Copywriter, spezialisiert auf SaaS und Tech-Produkte.

Schreibe einen überzeugenden Landing-Page-Text für:
- Produkt: {PRODUKT}
- Zielgruppe: {ZIELGRUPPE}
- USP (Alleinstellungsmerkmal): {USP}
- Tonalität: {TONALITAET}

Struktur:
1. Headline (max. 10 Wörter, klar und direkt)
2. Subheadline (1 Satz, Problem/Lösung)
3. 3 Feature-Blöcke (jeweils: Titel + 1-2 Sätze)
4. Call-to-Action-Text
5. Social-Proof-Vorschlag

Antworte auf Deutsch.`,
    variables: [
      { key: "PRODUKT", label: "Produktname", placeholder: "Agent Bot" },
      { key: "ZIELGRUPPE", label: "Zielgruppe", placeholder: "Freelance-Entwickler" },
      { key: "USP", label: "USP", placeholder: "KI-gestützte Code-Analyse in Sekunden" },
      { key: "TONALITAET", label: "Tonalität", placeholder: "Professionell, direkt, tech-affin" },
    ],
  },
  {
    id: "email-sequence",
    category: "Marketing",
    title: "E-Mail-Sequenz",
    description: "Automatisierte E-Mail-Strecke für Leads.",
    template: `Du bist ein E-Mail-Marketing-Experte mit Fokus auf Developer-Zielgruppen.

Erstelle eine {ANZAHL}-teilige E-Mail-Sequenz für:
- Produkt/Service: {PRODUKT}
- Trigger: {TRIGGER}
- Ziel: {ZIEL}

Für jede E-Mail liefere:
1. Betreff (max. 50 Zeichen, neugierig machend)
2. Preview-Text (max. 90 Zeichen)
3. Body (3-5 kurze Absätze)
4. CTA (ein klarer Call-to-Action)
5. Versandzeitpunkt (Tag X nach Trigger)

Ton: Direkt, werthaltig, kein Spam-Feeling. Auf Deutsch.`,
    variables: [
      { key: "ANZAHL", label: "Anzahl E-Mails", placeholder: "5" },
      { key: "PRODUKT", label: "Produkt/Service", placeholder: "macOS Dev Cheat Sheet" },
      { key: "TRIGGER", label: "Trigger-Event", placeholder: "PDF-Download" },
      { key: "ZIEL", label: "Sequenz-Ziel", placeholder: "Upsell zum Premium-Workshop" },
    ],
  },
  {
    id: "data-analysis",
    category: "Analyse",
    title: "Datenanalyse",
    description: "Strukturierte Analyse von Datensätzen.",
    template: `Du bist ein Data Analyst mit Expertise in {BEREICH}.

Analysiere den folgenden Datensatz / die folgenden Informationen:

{DATEN}

Beantworte diese Frage: {FRAGE}

Struktur deiner Analyse:
1. Zusammenfassung (2-3 Sätze)
2. Kernerkenntnisse (Bullet Points)
3. Trends und Muster
4. Handlungsempfehlungen
5. Einschränkungen der Analyse

Verwende konkrete Zahlen wo möglich. Auf Deutsch.`,
    variables: [
      { key: "BEREICH", label: "Fachbereich", placeholder: "Web-Performance" },
      { key: "DATEN", label: "Daten / Informationen", placeholder: "Lighthouse-Scores: Performance 62, SEO 78..." },
      { key: "FRAGE", label: "Kernfrage", placeholder: "Welche Optimierungen haben den grössten Impact?" },
    ],
  },
  {
    id: "competitor-analysis",
    category: "Analyse",
    title: "Wettbewerbsanalyse",
    description: "Systematischer Vergleich mit Wettbewerbern.",
    template: `Du bist ein Strategie-Berater mit Fokus auf {BRANCHE}.

Erstelle eine Wettbewerbsanalyse:
- Mein Produkt: {MEIN_PRODUKT}
- Wettbewerber: {WETTBEWERBER}
- Bewertungskriterien: {KRITERIEN}

Liefere:
1. Vergleichsmatrix (Tabelle)
2. Stärken/Schwächen je Anbieter
3. Differenzierungspotenziale
4. Strategische Empfehlungen

Auf Deutsch, faktenbasiert.`,
    variables: [
      { key: "BRANCHE", label: "Branche", placeholder: "Developer Tools" },
      { key: "MEIN_PRODUKT", label: "Dein Produkt", placeholder: "Agent Bot Code Reviewer" },
      { key: "WETTBEWERBER", label: "Wettbewerber", placeholder: "SonarQube, CodeClimate, DeepSource" },
      { key: "KRITERIEN", label: "Bewertungskriterien", placeholder: "Preis, Features, UX, Sprachsupport" },
    ],
  },
  {
    id: "blog-post",
    category: "Kreativ",
    title: "Blog-Artikel",
    description: "SEO-optimierte technische Blog-Posts.",
    template: `Du bist ein technischer Autor mit Erfahrung im Bereich {THEMENFELD}.

Schreibe einen Blog-Artikel:
- Titel: {TITEL}
- Zielgruppe: {ZIELGRUPPE}
- Länge: {LAENGE} Wörter
- SEO-Keyword: {KEYWORD}

Struktur:
1. Einleitung (Hook + Problem)
2. 3-5 Hauptabschnitte mit Zwischenüberschriften (H2)
3. Code-Beispiele wo passend
4. Fazit mit konkretem Takeaway
5. Meta-Description (max. 155 Zeichen)

Stil: Fachlich kompetent, aber zugänglich. Auf Deutsch.`,
    variables: [
      { key: "THEMENFELD", label: "Themenfeld", placeholder: "Web-Entwicklung" },
      { key: "TITEL", label: "Artikeltitel", placeholder: "Next.js 14: Server Components in der Praxis" },
      { key: "ZIELGRUPPE", label: "Zielgruppe", placeholder: "Frontend-Entwickler mit React-Erfahrung" },
      { key: "LAENGE", label: "Wortanzahl", placeholder: "1500" },
      { key: "KEYWORD", label: "SEO-Keyword", placeholder: "Next.js Server Components" },
    ],
  },
  {
    id: "social-media",
    category: "Kreativ",
    title: "Social-Media-Posts",
    description: "Plattform-optimierte Social-Media-Inhalte.",
    template: `Du bist ein Social-Media-Manager für Tech-Unternehmen.

Erstelle {ANZAHL} Posts für {PLATTFORM}:
- Thema: {THEMA}
- Ziel: {ZIEL}
- Tonalität: {TON}

Für jeden Post liefere:
1. Text (plattform-optimierte Länge)
2. Hashtag-Vorschläge (3-5)
3. Bester Veröffentlichungszeitpunkt

Auf Deutsch.`,
    variables: [
      { key: "ANZAHL", label: "Anzahl Posts", placeholder: "5" },
      { key: "PLATTFORM", label: "Plattform", placeholder: "LinkedIn" },
      { key: "THEMA", label: "Thema", placeholder: "Launch des neuen Code-Review-Tools" },
      { key: "ZIEL", label: "Ziel", placeholder: "Awareness und Traffic auf die Landing Page" },
      { key: "TON", label: "Tonalität", placeholder: "Professionell, aber nicht langweilig" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function PromptBuilder() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filteredTemplates = TEMPLATES.filter(
    (t) => t.category === activeCategory
  );

  const generatedPrompt = useMemo(() => {
    if (!selectedTemplate) return "";
    let prompt = selectedTemplate.template;
    for (const v of selectedTemplate.variables) {
      const value = values[v.key]?.trim() || `[${v.label}]`;
      prompt = prompt.replaceAll(`{${v.key}}`, value);
    }
    return prompt;
  }, [selectedTemplate, values]);

  const allFilled = selectedTemplate?.variables.every(
    (v) => values[v.key]?.trim()
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedPrompt]);

  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    setValues({});
    setCopied(false);
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedTemplate(null);
              setValues({});
            }}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] border-2 transition-colors cursor-pointer ${
              activeCategory === cat
                ? "border-accent bg-accent text-white"
                : "border-black/10 bg-white text-black/50 hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      {!selectedTemplate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t)}
              className="text-left border-2 border-black/10 p-6 hover:border-accent transition-colors cursor-pointer bg-white"
            >
              <h3 className="font-black uppercase mb-1">{t.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">
                {t.description}
              </p>
              <span className="inline-block mt-3 text-[10px] font-bold text-accent uppercase tracking-[0.15em]">
                {t.variables.length} Variablen &rarr;
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Template Builder */}
      {selectedTemplate && (
        <div>
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setValues({});
            }}
            className="text-[11px] font-bold text-black/40 uppercase tracking-[0.15em] mb-6 cursor-pointer bg-transparent border-none hover:text-accent transition-colors"
          >
            &larr; Zurück zu den Templates
          </button>

          <h3 className="text-2xl font-black uppercase mb-2">
            {selectedTemplate.title}
          </h3>
          <p className="text-black/50 mb-8">{selectedTemplate.description}</p>

          {/* Variable Inputs */}
          <div className="space-y-4 mb-8">
            {selectedTemplate.variables.map((v) => (
              <div key={v.key}>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-black/60 mb-1.5">
                  {v.label}
                </label>
                {v.placeholder.length > 50 || v.key === "CODE" || v.key === "DATEN" ? (
                  <textarea
                    value={values[v.key] || ""}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
                    }
                    placeholder={v.placeholder}
                    rows={4}
                    className="w-full border-2 border-black/10 p-3 text-sm font-mono focus:border-accent focus:outline-none transition-colors resize-y"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[v.key] || ""}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
                    }
                    placeholder={v.placeholder}
                    className="w-full border-2 border-black/10 p-3 text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Generated Prompt */}
          <div className="border-2 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">
                Generierter Prompt
              </h4>
              <button
                onClick={handleCopy}
                disabled={!allFilled}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  copied
                    ? "bg-green-500 text-white border-2 border-green-500"
                    : "bg-dark text-white border-2 border-dark hover:bg-accent hover:border-accent"
                }`}
              >
                {copied ? "Kopiert!" : "Prompt kopieren"}
              </button>
            </div>
            <pre className="bg-dark text-white/80 p-5 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto max-h-[400px] overflow-y-auto">
              {generatedPrompt}
            </pre>
            {!allFilled && (
              <p className="mt-3 text-[11px] text-accent font-bold tracking-[0.1em]">
                Bitte alle Variablen ausfüllen, um den Prompt zu kopieren.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
