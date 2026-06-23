import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromptBuilder from "./PromptBuilder";

export const metadata: Metadata = {
  title: "Prompt Studio — KI-Prompt-Generator | Hannes Schwede",
  description:
    "Erstelle klare, strukturierte KI-Prompts für Claude, GPT, Gemini. Kostenlos, ohne Anmeldung.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de/prompt-studio",
    title: "Prompt Studio — KI-Prompt-Generator",
    description: "Erstelle klare, strukturierte KI-Prompts. Kostenlos.",
  },
  alternates: {
    canonical: "https://agent-bot.de/prompt-studio",
  },
};

export default function PromptStudioPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <header className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--card)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--primary)_0%,_transparent_35%)] opacity-[0.06]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-4 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background)]">
            Kostenloses Tool
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Prompt <span className="text-[var(--primary)]">Studio</span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Beschreibe deine Aufgabe — Prompt Studio baut daraus einen klaren, strukturierten Prompt.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <PromptBuilder />
      </main>

      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Best Practices
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-lg leading-relaxed">
            Effektive Prompts folgen einem klaren Muster.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Rolle definieren",
                desc: "Gib der KI eine klare Identität. 'Du bist ein erfahrener Backend-Entwickler' liefert bessere Ergebnisse als generische Anfragen.",
              },
              {
                title: "Kontext geben",
                desc: "Je mehr relevanter Kontext du lieferst, desto präziser die Antwort. Beschreibe dein Projekt, den Tech-Stack und das Ziel.",
              },
              {
                title: "Format vorgeben",
                desc: "Definiere das gewünschte Ausgabeformat: Bullet Points, Code-Block, Tabelle oder Schritt-für-Schritt-Anleitung.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 hover:border-[var(--primary)] transition-colors"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
