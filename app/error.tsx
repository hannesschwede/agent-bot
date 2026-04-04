"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6">
        Fehler
      </p>
      <h1 className="text-[48px] md:text-[64px] font-black leading-[0.9] tracking-[-0.03em] mb-6 text-center">
        ETWAS IST
        <br />
        <span className="text-accent">SCHIEFGELAUFEN.</span>
      </h1>
      <p className="max-w-lg text-lg text-black/50 leading-relaxed mb-10 text-center">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
      </p>
      <button
        onClick={reset}
        className="bg-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent transition-colors cursor-pointer"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
