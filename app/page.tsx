import type { Metadata } from "next";
import CheatSheetForm from "./components/CheatSheetForm";

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
      <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <div className="h-7 w-7 bg-[#FF4F15]" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase">Agent Bot</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/audit" className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 hover:text-[#FF4F15] transition-colors">Audit</a>
            <a href="/code-review" className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 hover:text-[#FF4F15] transition-colors">Code Review</a>
            <a href="https://github.com/agent-botde" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 hover:text-[#FF4F15] transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/schwedehannes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 hover:text-[#FF4F15] transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="#download" className="bg-[#182332] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF4F15] transition-colors">Zum Download</a>
          </div>
        </div>
      </nav>
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
      <footer className="border-t border-black/10 px-6 py-8 text-center">
        <p className="text-[11px] text-black/30 mb-2">© 2026 Agent Bot · Hannes Schwede</p>
        <div className="flex justify-center gap-4 text-[11px] text-black/30">
          <a href="/impressum" className="hover:text-[#FF4F15] transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-[#FF4F15] transition-colors">Datenschutz</a>
          <a href="https://www.linkedin.com/in/schwedehannes/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4F15] transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
