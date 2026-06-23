import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-20 md:py-32 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6">
          Fehler 404
        </p>
        <h1 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-[-0.03em] mb-6">
          SEITE NICHT
          <br />
          <span className="text-accent">GEFUNDEN.</span>
        </h1>
        <p className="max-w-lg mx-auto text-lg text-black/50 leading-relaxed mb-10">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <a
          href="/"
          className="inline-block bg-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent transition-colors"
        >
          Zur Startseite
        </a>
      </main>
      <Footer />
    </div>
  );
}
