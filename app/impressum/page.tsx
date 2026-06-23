import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Impressum | Agent Bot" };

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-3xl font-black uppercase mb-8">Impressum</h1>
        <div className="space-y-6 text-sm leading-relaxed text-black/80">
          <section><h2 className="font-bold text-black mb-2">Angaben gemäß § 5 TMG</h2><p>Hannes Schwede<br />Sömmeringstraße 15<br />50823 Köln</p></section>
          <section><h2 className="font-bold text-black mb-2">Kontakt</h2><p>E-Mail: <a href="mailto:hannes@agent-bot.de" className="text-accent hover:underline">hannes@agent-bot.de</a></p></section>
          <section><h2 className="font-bold text-black mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2><p>Hannes Schwede<br />Sömmeringstraße 15<br />50823 Köln</p></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
