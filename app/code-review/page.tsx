import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Reviewer — AI-powered Static Analysis | Agent Bot",
  description: "Security, Performance & Code Quality in einem Tool. Automatische Analyse mit 13 Rule Sets für JavaScript, TypeScript, Python und Go.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de/code-review",
    title: "Code Reviewer — AI-powered Static Analysis | Agent Bot",
    description: "Automatische Code-Analyse: Security Vulnerabilities, Performance Bottlenecks, Quality Scoring.",
  },
};

const CHECKS = [
  { title: "Security", desc: "Hardcoded API Keys, fehlende Input-Validation, unsichere URL-Verarbeitung." },
  { title: "Performance", desc: "Fehlende Retry-Logic, Rate Limiting, Caching-Mechanismen." },
  { title: "Code Quality", desc: "Magic Numbers, fehlende Type Annotations, undokumentierte Funktionen." },
  { title: "Minimax-Specific", desc: "API Endpoint Validation, Token Usage, Temperature Settings, Model Specs." },
];

const FEATURES = [
  "Real-time Pattern-Matching gegen 13 Rule Sets",
  "Multi-Language: JavaScript, TypeScript, Python, Go",
  "Code-Optimierung mit Diff-Visualization",
  "Analysis History — bis zu 20 Reviews lokal",
  "Zero Config — läuft sofort im Browser",
];

export default function CodeReviewPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <div className="h-7 w-7 bg-[#FF4F15]" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase">Agent Bot</span>
          </a>
          <a href="https://github.com/agent-botde/minimax-code-reviewer" target="_blank" rel="noopener noreferrer" className="bg-[#FF4F15] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#182332] transition-colors">Auf GitHub ansehen</a>
        </div>
      </nav>
      <header className="bg-[#182332] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF4F15] mb-6">Open Source Tool</p>
          <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-[-0.03em] mb-6">CODE<br /><span className="text-[#FF4F15]">REVIEWER.</span></h1>
          <p className="max-w-lg text-lg text-white/60 leading-relaxed">AI-powered Static Code Analysis. Security, Performance und Code Quality — in 15 Minuten statt 3 Stunden.</p>
          <a href="https://github.com/agent-botde/minimax-code-reviewer" target="_blank" rel="noopener noreferrer" className="inline-block mt-10 bg-[#FF4F15] text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#182332] transition-colors">GitHub Repo öffnen</a>
        </div>
      </header>
      <div className="border-b border-black/10 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl flex flex-wrap">
          {[{label:"Preis",value:"€0"},{label:"Rule Sets",value:"13"},{label:"Sprachen",value:"4"},{label:"Setup",value:"npm i"}].map((s) => (
            <div key={s.label} className="flex-1 min-w-[120px] border-r last:border-r-0 border-black/10 px-6 py-5 text-center">
              <span className="block text-2xl font-black text-[#FF4F15]">{s.value}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-black/40 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Was gecheckt wird.</h2>
          <p className="text-black/50 mb-12 max-w-lg">Vier Analyse-Kategorien. Jede mit konkreten Patterns und Handlungsempfehlungen.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHECKS.map((c) => (
              <div key={c.title} className="border-2 border-black/10 p-6 hover:border-[#FF4F15] transition-colors">
                <h3 className="font-black uppercase mb-2">{c.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#182332] text-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12">Features.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <div key={f} className="flex items-start gap-3 border border-white/10 p-4 hover:border-[#FF4F15] transition-colors">
                <span className="text-[11px] font-bold text-[#FF4F15] mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20 md:py-28 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">Quick Start.</h2>
          <div className="bg-[#1B2838] rounded-sm p-6 md:p-8 font-mono text-sm overflow-x-auto border-l-4 border-[#FF4F15]">
            <div className="text-[#6A9955] mb-1"># -- Clone & Run --</div>
            <div className="text-[#D4D4D4]">git clone https://github.com/agent-botde/minimax-code-reviewer</div>
            <div className="text-[#D4D4D4]">cd minimax-code-reviewer</div>
            <div className="text-[#D4D4D4]">npm install</div>
            <div className="text-[#D4D4D4]">npm start</div>
            <div className="text-[#D4D4D4] mt-3"> </div>
            <div className="text-[#6A9955]"># Öffnet im Browser — Zero Config</div>
          </div>
          <p className="mt-6 text-sm text-black/40">Tech Stack: JavaScript · Playwright · Minimax AI · Static Site</p>
        </div>
      </section>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Code reviewen <span className="text-[#FF4F15]">lassen.</span></h2>
          <p className="text-black/50 mb-8">Open Source. MIT Lizenz. Lokal ausführbar.</p>
          <a href="https://github.com/agent-botde/minimax-code-reviewer" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#182332] text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#FF4F15] transition-colors">Repo auf GitHub</a>
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
