"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/hannesschwede",
    label: "GitHub",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/schwedehannes/",
    label: "LinkedIn",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.xing.com/profile/Hannes_Schwede/web_profiles?nwt_nav=profile",
    label: "XING",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.8 0C3.8 0 3.1 0.8 3.4 1.7L7.1 9.2 3.3 16.8C3 17.7 3.7 18.5 4.7 18.5H8.2C8.9 18.5 9.4 18.1 9.7 17.4L13.5 9.8 9.8 2.2C9.5 1.4 8.9 0 7.9 0H4.8ZM17.6 5.5C16.6 5.5 15.9 6.3 16.2 7.2L18.6 12.1 14.8 19.7C14.5 20.6 15.2 21.4 16.2 21.4H19.7C20.4 21.4 20.9 21 21.2 20.3L25 12.7 22.6 7.8C22.3 7 21.7 5.5 20.7 5.5H17.6Z" />
      </svg>
    ),
  },
];

const PROJECTS = [
  { href: "https://agent-bot.de", label: "agent-bot.de", external: true },
  { href: "https://neurocam.de", label: "neurocam.de", external: true },
  { href: "https://reststueck.de", label: "reststueck.de", external: true },
];

const NAV_LINKS = [
  { href: "/", label: "Lebenslauf" },
  { href: "/prompt-studio", label: "Prompt Studio" },
];

export default function Navbar() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] glass-strong">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="h-8 w-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-bold text-sm">
            HS
          </div>
          <span className="text-sm font-bold tracking-tight hidden sm:block">
            Hannes Schwede
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Projects Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProjectsOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
              aria-expanded={projectsOpen}
            >
              Projekte
              <span
                className={`text-[10px] transition-transform duration-200 ${
                  projectsOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {projectsOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-glass dark:shadow-glass-dark overflow-hidden animate-[fade-in_0.15s_ease-out]">
                {PROJECTS.map((project) =>
                  project.external ? (
                    <a
                      key={project.href}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                    >
                      {project.label}
                      <span className="text-[var(--muted-foreground)]">↗</span>
                    </a>
                  ) : (
                    <Link
                      key={project.href}
                      href={project.href}
                      onClick={() => setProjectsOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                    >
                      {project.label}
                      <span className="text-[var(--muted-foreground)]">→</span>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-[var(--border)]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center h-9 w-9 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            aria-label="Menü"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-4 space-y-1 animate-[fade-in_0.15s_ease-out]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-[14px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-1">
              Projekte
            </p>
            {PROJECTS.map((project) =>
              project.external ? (
                <a
                  key={project.href}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-[14px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                >
                  {project.label}
                  <span>↗</span>
                </a>
              ) : (
                <Link
                  key={project.href}
                  href={project.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-[14px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                >
                  {project.label}
                  <span>→</span>
                </Link>
              )
            )}
          </div>
          <div className="pt-2 flex items-center gap-1 px-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center h-9 w-9 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
