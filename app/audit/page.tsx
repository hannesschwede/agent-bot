import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Lead-Performance Audit | Agent Bot",
  description: "Kostenloser Website-Grader für KMUs. Performance- und SEO-Check in Sekunden.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de/audit",
    title: "Lead-Performance Audit | Agent Bot",
    description: "Hör auf zu raten. Fang an zu konvertieren. Kostenloser Website-Check für KMUs.",
  },
  alternates: {
    canonical: "https://agent-bot.de/audit",
  },
};

const FEATURES = [
  { title: "Instant Audit", desc: "Performance- und SEO-Check in Sekunden. Keine Installation, kein Setup." },
  { title: "Bulk-Analysis", desc: "Scanne ganze Branchenlisten (CSV) auf einen Klick. Ideal für Agenturen." },
  { title: "Eddy-Logic", desc: "Identifiziert die schwächsten Konkurrenten für gezielten Outreach." },
];

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar cta={{ href: "https://stunning-engine-8fm2wcihxrjsnffkabftyj.streamlit.app/", label: "Audit starten" }} />
      <header className="bg-[#182332] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF4F15] mb-6">Kostenloses Tool</p>
          <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-[-0.03em] mb-6">LEAD-<br />PERFORMANCE<br /><span className="text-[#FF4F15]">AUDIT.</span></h1>
          <p className="max-w-lg text-lg text-white/60 leading-relaxed">Hör auf zu raten. Fang an zu konvertieren. Finde heraus, wo deine Website durch schlechte Technik Leads verliert — in Sekunden.</p>
          <a href="https://stunning-engine-8fm2wcihxrjsnffkabftyj.streamlit.app/" target="_blank" rel="noopener noreferrer" className="inline-block mt-10 bg-[#FF4F15] text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#182332] transition-colors">Jetzt kostenlos testen</a>
        </div>
      </header>
      <div className="border-b border-black/10 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl flex flex-wrap">
          {[{label:"Preis",value:"€0"},{label:"Setup",value:"0 min"},{label:"Ergebnis",value:"Sofort"},{label:"Daten",value:"Harte Fakten"}].map((s) => (
            <div key={s.label} className="flex-1 min-w-[120px] border-r last:border-r-0 border-black/10 px-6 py-5 text-center">
              <span className="block text-2xl font-black text-[#FF4F15]">{s.value}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-black/40 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Was das Tool kann.</h2>
          <p className="text-black/50 mb-12 max-w-lg">Keine AI-Fatigue, nur harte Daten. Ein radikal effizienter Website-Grader für KMUs.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-2 border-black/10 p-6 hover:border-[#FF4F15] transition-colors">
                <h3 className="font-black uppercase mb-2">{f.title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#182332] text-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12">So funktioniert&apos;s.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {step:"01",title:"URL eingeben",desc:"Gib eine einzelne URL ein oder lade eine CSV mit ganzen Branchenlisten hoch."},
              {step:"02",title:"Analyse läuft",desc:"Performance, SEO, Mobile-Optimierung und technische Schwachstellen werden geprüft."},
              {step:"03",title:"Ergebnis lesen",desc:"Du bekommst einen klaren Score mit konkreten Handlungsempfehlungen."},
            ].map((item) => (
              <div key={item.step} className="border border-white/10 p-6 hover:border-[#FF4F15] transition-colors">
                <span className="text-[#FF4F15] text-[11px] font-bold">SCHRITT {item.step}</span>
                <h3 className="font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20 md:py-28 bg-black/[0.02]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">Tech Stack.</h2>
          <div className="flex flex-wrap gap-3">
            {["Python","Streamlit","BeautifulSoup4","Streamlit Cloud"].map((tech) => (
              <span key={tech} className="border-2 border-black/10 px-4 py-2 text-sm font-semibold hover:border-[#FF4F15] transition-colors">{tech}</span>
            ))}
          </div>
          <p className="mt-6 text-sm text-black/40">Open Source auf <a href="https://github.com/agent-botde/Agent-Bot.de_Lead-Performance_Audit" target="_blank" rel="noopener noreferrer" className="text-[#FF4F15] underline hover:no-underline">GitHub</a></p>
        </div>
      </section>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">Bereit für den <span className="text-[#FF4F15]">Check?</span></h2>
          <p className="text-black/50 mb-8">Kostenlos. Keine Anmeldung. Sofort Ergebnisse.</p>
          <a href="https://stunning-engine-8fm2wcihxrjsnffkabftyj.streamlit.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#182332] text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#FF4F15] transition-colors">Audit starten</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
