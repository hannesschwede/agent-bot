import type { Metadata } from "next";
import CheatSheetForm from "./components/CheatSheetForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet | Agent Bot",
  description: "9 Seiten, 14 Sektionen, null Fluff. Terminal-Befehle für Node/TS, React, Vite, Docker, Git, Playwright und LM Studio. Kostenlos als PDF.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de",
    title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
    description: "Terminal-Cheat-Sheet für macOS-Entwickler. Docker, Git, Node, Playwright, LM Studio. Kostenlos als PDF.",
    images: [{ url: "https://agent-bot.de/og.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://agent-bot.de",
  },
};

const SECTIONS = [
  "Navigation & Datei-Operationen",
  "Dateien lesen, suchen & bearbeiten",
  "macOS Spezifika & System",
  "Prozesse, Netzwerk & Ports",
  "Git — Basics",
  "Git — Fortgeschritten",
  "Homebrew & Package Management",
  "Node.js, pnpm & Vite",
  "Playwright",
  "Docker — Images & Container",
  "Docker Compose — Orchestrierung",
  "CI/CD — GitHub Actions",
  "Local AI & LLM (LM Studio)",
  "Power-User — Pipes, Aliases & .zshrc",
];

const HIGHLIGHTS = [
  { label: "Sektionen", value: "14" },
  { label: "Seiten", value: "9" },
  { label: "Duplikate", value: "0" },
  { label: "Preis", value: "€0" },
];

export default function CheatSheetPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar cta={{ href: "#download", label: "Zum Download" }} />
      <header className="bg-[#182332] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF4F15] mb-6">Kostenloses PDF — 9 Seiten</p>
          <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-[-0.03em] mb-6">MACOS DEV,<br />DOCKER & AI<br /><span className="text-[#FF4F15]">CHEAT SHEET.</span></h1>
          <p className="max-w-lg text-lg text-white/60 leading-relaxed">14 Sektionen. Jeder Befehl mit deutschem Kommentar. Fertige Aliases und Shell-Funktionen für die .zshrc. Copy-Paste-ready, kein Tutorial-Gelaber.</p>
        </div>
      </header>
      <div className="border-b border-black/10 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl flex flex-wrap">
          {HIGHLIGHTS.map((s) => (
            <div key={s.label} className="flex-1 min-w-[120px] border-r last:border-r-0 border-black/10 px-6 py-5 text-center">
              <span className="block text-2xl font-black text-[#FF4F15]">{s.value}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-black/40 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Was drin ist.</h2>
          <p className="text-black/50 mb-12 max-w-lg">Alles, was du täglich im Terminal brauchst — von Basics bis Production-Grade Docker-Workflows und lokale LLMs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SECTIONS.map((section, i) => (
              <div key={section} className="flex items-start gap-3 border border-black/10 p-4 hover:border-[#FF4F15] transition-colors">
                <span className="text-[11px] font-bold text-[#FF4F15] mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold">{section}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#182332] text-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12">Kein 08/15-<span className="text-[#FF4F15]">Cheat Sheet.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Dark-Theme Code-Blöcke", desc: "Syntax-Highlighting mit grünen Kommentaren auf dunklem Hintergrund — wie in deinem Editor." },
              { title: "Fertige .zshrc-Config", desc: "Aliases, Exports und Shell-Funktionen zum direkten Copy-Pasten. Inkl. killport(), project() und dsh()." },
              { title: "Docker Production-Stack", desc: "Multi-Stage Builds, Compose-Orchestrierung, CI/CD-Pipeline und Environment-Strategie — alles auf einer Seite." },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 hover:border-[#FF4F15] transition-colors">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20 md:py-28 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">Vorgeschmack.</h2>
          <div className="bg-[#1B2838] rounded-sm p-6 md:p-8 font-mono text-sm overflow-x-auto border-l-4 border-[#FF4F15]">
            <div className="text-[#6A9955] mb-1"># -- Aliases (in ~/.zshrc) --</div>
            <div className="text-[#D4D4D4]">alias ll=&quot;ls -lah&quot;</div>
            <div className="text-[#D4D4D4]">alias gs=&quot;git status&quot;</div>
            <div className="text-[#D4D4D4]">alias dev=&quot;pnpm run dev&quot;</div>
            <div className="text-[#D4D4D4]">alias dc=&quot;docker compose&quot;</div>
            <div className="text-[#D4D4D4]">alias ports=&quot;lsof -i -P -n | grep LISTEN&quot;</div>
            <div className="text-[#D4D4D4] mt-3"> </div>
            <div className="text-[#6A9955]"># -- Funktionen (in ~/.zshrc) --</div>
            <div className="text-[#D4D4D4]">function killport() {"{"} kill -9 $(lsof -ti :$1); {"}"}</div>
            <div className="text-[#6A9955]"># Port freigeben</div>
            <div className="text-[#D4D4D4]">function project() {"{"} cd ~/Projects/$1 && code .; {"}"}</div>
            <div className="text-[#6A9955]"># Projekt öffnen + VS Code starten</div>
          </div>
          <p className="mt-4 text-sm text-black/40">Auszug aus Sektion 14 — Power-User: Pipes, Aliases & .zshrc</p>
        </div>
      </section>
      <section id="download" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="border-2 border-black p-8 md:p-12 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-2">Hol dir das <span className="text-[#FF4F15]">PDF.</span></h2>
            <p className="text-black/50 mb-8">9 Seiten, 14 Sektionen, Dark-Theme, Agent-Bot-Branding. Kostenlos. Direkt in dein Postfach.</p>
            <CheatSheetForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
