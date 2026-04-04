"use client";

import { useState } from "react";
import type { Issue } from "../types";
import { SEVERITY_CONFIG } from "../constants";

export default function IssueCard({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(false);
  const cfg = SEVERITY_CONFIG[issue.severity];

  return (
    <div
      className="mb-2 transition-all duration-200"
      style={{
        border: `1px solid ${open ? cfg.color : cfg.border}`,
        background: open ? cfg.bg : "transparent",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-transparent border-none p-3 px-4 cursor-pointer flex items-center gap-3 text-left"
      >
        <span
          className="text-[9px] font-black tracking-[0.15em] font-mono whitespace-nowrap min-w-[56px]"
          style={{ color: cfg.color }}
        >
          {cfg.label}
        </span>
        <span className="text-[13px] font-bold text-white flex-1">
          {issue.title}
          {issue.line && (
            <span className="text-[10px] text-white/35 font-medium ml-2 font-mono">
              Zeile {issue.line}
            </span>
          )}
        </span>
        <span
          className="text-white/30 text-xs transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="px-4 pb-4 pt-3"
          style={{ borderTop: `1px solid ${cfg.border}` }}
        >
          <p className="text-[13px] text-white/60 mb-2.5 leading-relaxed">
            {issue.description}
          </p>
          <div className="bg-white/[0.04] border border-white/[0.08] p-2.5 px-3.5">
            <p className="text-[11px] font-bold text-accent tracking-[0.1em] mb-1">
              EMPFEHLUNG
            </p>
            <p className="text-[13px] text-white/70 leading-relaxed">
              {issue.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
