"use client";

import { useCallback } from "react";

const SIMULATOR_URL = "https://cs7js8ple3tg.space.minimax.io/";

export default function SimulatorSection() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="simulator" className="py-20 lg:py-28 border-y border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Jetzt testen – CNC/CAD-Simulator live
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
            Teste die KI-Validierung direkt im Simulator.
          </p>
        </div>

        <div
          className="glass rounded-2xl p-2 sm:p-3 shadow-glass dark:shadow-glass-dark overflow-hidden relative"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div className="relative w-full rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
            <iframe
              src={SIMULATOR_URL}
              title="Neurocam CNC/CAD-Simulator"
              className="w-full block"
              style={{
                border: 0,
                height: "550px",
                pointerEvents: "auto",
              }}
              height={550}
              scrolling="yes"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              allow="fullscreen"
              onMouseEnter={lockScroll}
              onMouseLeave={unlockScroll}
              onFocus={lockScroll}
              onBlur={unlockScroll}
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-[var(--muted-foreground)]">
          Der Simulator wird extern geladen und ist ein natives Teil von Neurocam.
        </p>
      </div>
    </section>
  );
}
