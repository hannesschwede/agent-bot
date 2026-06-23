import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { resumeData } from "../lib/resume-data";
import SimulatorSection from "./SimulatorSection";

export const metadata: Metadata = {
  title: "Neurocam — KI-CAM-Simulator",
  description:
    "KI-CAM-Simulator: CNC-Parameter vor dem ersten Span validieren. Feeds & Speeds prüfen, Kollisionen erkennen und G-Code sicher exportieren.",
  alternates: {
    canonical: "https://hannesschwede.com/neurocam",
  },
  openGraph: {
    type: "website",
    url: "https://hannesschwede.com/neurocam",
    title: "Neurocam — KI-CAM-Simulator",
    description:
      "KI-CAM-Simulator: CNC-Parameter vor dem ersten Span validieren. Feeds & Speeds prüfen, Kollisionen erkennen und G-Code sicher exportieren.",
    images: [
      {
        url: "https://hannesschwede.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "Neurocam — KI-CAM-Simulator",
      },
    ],
  },
};

const FEATURES = [
  {
    title: "KI-gestützte Validierung",
    description:
      "Neurocam prüft gewählte Feeds & Speeds gegen Material, Werkzeug und Maschine – bevor der G-Code an die Steuerung geht.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Echtzeit-Feedback",
    description:
      "Ein Safety Score zeigt sofort, ob die Parameter im sicheren Bereich liegen. Kritische Werte werden rot markiert und erklärt.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "CNC-spezifische Analyse",
    description:
      "Die Analyse berücksichtigt werkzeugspezifische Grenzwerte, Materialdaten und die ausgewählte Steuerung.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Simulation vor dem Schnitt",
    description:
      "Visualisierung des Werkzeugwegs und Kollisionserkennung helfen, teure Fehler auf dem Bildschirm statt an der Maschine zu machen.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const STACK = [
  { label: "Frontend", value: "Next.js, TypeScript, Tailwind CSS" },
  { label: "KI / Validierung", value: "Regelbasierte Engine + LLM-Integration für Parameter-Vorschläge" },
  { label: "3D-Simulation", value: "Browser-basierte Werkzeugweg-Visualisierung" },
  { label: "Export", value: "G-Code für Fanuc, Siemens, Heidenhain" },
];

const BENEFITS = [
  "Reduziert Ausschuss und Werkzeugbruch durch Validierung vor dem Maschinenlauf",
  "Verkürzt die Einrichtungszeit, weil Fehler früh erkannt werden",
  "Beschleunigt das Lernen von Feeds & Speeds durch sofortiges Feedback",
  "Eignet sich für Hobbyisten, Maker Spaces und Ausbildungsumgebungen",
  "Browser-basiert – keine Installation, kein Signup",
];

export default function NeurocamPage() {
  const { personal, social } = resumeData;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                  Proof of Concept
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
                  KI-CAM-Simulator – CNC-Parameter vor dem ersten Span validieren
                </h1>
                <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed text-balance max-w-xl">
                  Neurocam ist ein browser-basierter Prototyp, der CNC-Parameter mit KI-Unterstützung
                  prüft, Feeds & Speeds bewertet und den Werkzeugweg simuliert – bevor Material und
                  Werkzeug gefährdet werden.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#simulator"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
                  >
                    Demo starten
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </Link>
                  <Link
                    href="#kontakt"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                  >
                    Kontakt aufnehmen
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="glass rounded-2xl p-4 sm:p-6 shadow-glass dark:shadow-glass-dark">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
                    {/* Mock CAM Interface */}
                    <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--muted)] px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      </div>
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Neurocam · Parameter Check
                      </span>
                    </div>
                    <div className="grid grid-cols-3 min-h-[280px]">
                      <div className="col-span-2 relative border-r border-[var(--border)] bg-[var(--card)] p-4 flex items-center justify-center">
                        <svg className="w-full h-full max-h-[220px]" viewBox="0 0 200 160" fill="none">
                          <rect x="20" y="100" width="160" height="40" rx="4" fill="var(--muted)" />
                          <path
                            d="M40 100 L60 80 L80 90 L100 60 L120 70 L140 50 L160 60"
                            stroke="var(--primary)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <circle cx="160" cy="60" r="5" fill="var(--primary)" />
                          <rect x="30" y="115" width="140" height="20" rx="2" fill="var(--background)" />
                          <text x="100" y="129" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="var(--font-inter)">
                            Werkstück-Preview
                          </text>
                        </svg>
                      </div>
                      <div className="col-span-1 p-4 space-y-4 bg-[var(--card)]">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Feed Rate</p>
                          <p className="text-sm font-semibold">800 mm/min</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Spindle Speed</p>
                          <p className="text-sm font-semibold">12 000 U/min</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Depth of Cut</p>
                          <p className="text-sm font-semibold">2.0 mm</p>
                        </div>
                        <div className="pt-2 border-t border-[var(--border)]">
                          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">Safety Score</p>
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 rounded-full bg-[var(--muted)] overflow-hidden">
                              <div className="h-full w-[92%] rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">92</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="funktionen" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Funktionen</h2>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                Die Kernfunktionen aus dem Neurocam-Prototypen, übersetzt in ein klares,
                informationsorientiertes Layout.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark hover:border-[var(--primary)] transition-colors"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Simulator */}
        <SimulatorSection />

        {/* How it works */}
        <section className="py-20 lg:py-28 bg-[var(--card)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">So funktioniert Neurocam</h2>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                Vier Schritte vom CAD-Modell bis zum validierten G-Code.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Upload", text: "CAD-Datei (STEP/STL) hochladen oder Demo-Modell wählen." },
                { step: "02", title: "Konfigurieren", text: "Maschine, Material und Werkzeug auswählen." },
                { step: "03", title: "KI validiert", text: "Echtzeit-Parameter-Checks mit Safety Score." },
                { step: "04", title: "Exportieren", text: "Validierter G-Code für die eigene Steuerung." },
              ].map((item) => (
                <div key={item.step} className="relative pl-8">
                  <span className="absolute left-0 top-0 text-xs font-bold text-[var(--primary)]">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 lg:py-28 border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Technologie-Stack</h2>
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
                  Neurocam ist als leichtgewichtiger, browser-basierter Prototyp gebaut. Der Fokus liegt
                  auf schneller Validierung und klarem Nutzerfeedback statt auf einer vollwertigen
                  CAD/CAM-Suite.
                </p>
                <div className="space-y-4">
                  {STACK.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] w-36 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-[var(--foreground)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 shadow-glass dark:shadow-glass-dark">
                <h3 className="text-lg font-semibold mb-4">Architektur-Überblick</h3>
                <div className="space-y-3">
                  {[
                    "Frontend nimmt Parameter und CAD-Upload entgegen",
                    "Validierungs-Engine prüft Werte gegen Material- und Werkzeugdaten",
                    "KI-Vorschlag liefert Startwerte für Feeds & Speeds",
                    "Simulation rendert Werkzeugweg im Browser",
                    "Export generiert steuerungsspezifischen G-Code",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-28 border-y border-[var(--border)] bg-[var(--card)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Nutzen & Vorteile</h2>
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                  Der Prototyp richtet sich an CNC-Lerner, Hobbyisten und Maker Spaces, die teure
                  Fehler vermeiden und schneller verstehen wollen, was hinter Feeds & Speeds steckt.
                </p>
              </div>
              <ul className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-base leading-relaxed text-[var(--foreground)]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="kontakt" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-glass dark:shadow-glass-dark">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Interessiert an einer Demo?
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto mb-8">
                Neurocam ist aktuell ein Proof of Concept. Wenn du mehr über den technischen Aufbau,
                mögliche Use Cases oder eine Weiterentwicklung erfahren möchtest, melde dich gerne.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {personal.email}
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
              <p className="mt-6 text-xs text-[var(--muted-foreground)]">
                Kein Checkout, keine Preise – einfach Kontakt aufnehmen.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
