import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromptBuilder from "./PromptBuilder";

export const metadata: Metadata = {
  title: "PromptForge — KI-Prompt-Generator | Agent Bot",
  description:
    "Erstelle model-optimierte KI-Prompts für Claude, GPT, Gemini. Kostenlos, ohne Anmeldung.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de/promptforge",
    title: "PromptForge — KI-Prompt-Generator | Agent Bot",
    description:
      "Erstelle model-optimierte KI-Prompts für Claude, GPT, Gemini. Kostenlos.",
  },
  alternates: {
    canonical: "https://agent-bot.de/promptforge",
  },
};

export default function PromptForgePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <header className="bg-dark text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Kostenloses Tool
          </p>
          <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-[-0.03em] mb-6">
            PROMPT
            <br />
            <span className="text-accent">FORGE.</span>
          </h1>
          <p className="max-w-lg text-lg text-white/60 leading-relaxed">
            Baue model-optimierte Prompts für Claude, GPT und Gemini.
            Definiere Aufgabe, Rolle und Kontext — der Rest passiert automatisch.
          </p>
        </div>
      </header>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <PromptBuilder />
        </div>
      </section>

      <section className="bg-black/[0.02] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
            Best Practices.
          </h2>
          <p className="text-black/50 mb-12 max-w-lg">
            Effektive Prompts folgen einem klaren Muster. Hier die wichtigsten
            Regeln.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="border-2 border-black/10 p-6 hover:border-accent transition-colors"
              >
                <h3 className="font-black uppercase mb-2">{item.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">
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
