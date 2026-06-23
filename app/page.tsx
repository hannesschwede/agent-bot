import type { Metadata } from "next";
import Link from "next/link";
import { resumeData } from "./lib/resume-data";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProfileImage from "./components/ProfileImage";

export const metadata: Metadata = {
  title: "Hannes Schwede — Operations & Process Management",
  description:
    "Lebenslauf von Hannes Schwede: Operations & Process Management, digitale Projekte, Automatisierung und Tool-Entwicklung.",
  alternates: {
    canonical: "https://agent-bot.de",
  },
};

function formatDate(dateStr: string): string {
  if (dateStr === "Heute") return "Heute";
  const [year, month] = dateStr.split("-");
  if (!month) return year;
  const months = [
    "Jan.", "Feb.", "März", "Apr.", "Mai", "Juni",
    "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez.",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function formatPeriod(start: string, end: string): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export default function ResumePage() {
  const { personal, experience, education, skills, languages, projects, social } = resumeData;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Profile Card */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="h-32 w-32 rounded-full bg-[var(--muted)] border-4 border-[var(--card)] overflow-hidden flex items-center justify-center shadow-lg">
                    <ProfileImage
                      src={personal.profileImage}
                      alt={personal.name}
                      initials={personal.name.split(" ").map((n) => n[0]).join("")}
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-[var(--card)]" title="Verfügbar" />
                </div>

                <h1 className="text-2xl font-bold tracking-tight">{personal.name}</h1>
                <p className="mt-1 text-sm font-medium text-[var(--muted-foreground)]">
                  {personal.title}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)] text-balance">
                  {personal.bio}
                </p>
              </div>

              {/* Cheat Sheet CTA */}
              <div className="mt-6">
                <a
                  href="/macOS-Dev-Docker-AI-Ultimate-CheatSheet.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Cheat Sheet PDF
                </a>
                <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  9 Seiten · Kostenlos
                </p>
              </div>
            </section>

            {/* Contact Card */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4">
                Kontakt
              </h2>
              <div className="space-y-3">
                {personal.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-3 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  >
                    <svg className="h-4 w-4 text-[var(--muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {personal.email}
                  </a>
                )}
                <div className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                  <svg className="h-4 w-4 text-[var(--muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {personal.location}
                </div>
                <a
                  href={personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  <svg className="h-4 w-4 text-[var(--muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {personal.website.replace("https://", "")}
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--border)] flex items-center gap-3">
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={social.xing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors"
                  aria-label="XING"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.8 0C3.8 0 3.1 0.8 3.4 1.7L7.1 9.2 3.3 16.8C3 17.7 3.7 18.5 4.7 18.5H8.2C8.9 18.5 9.4 18.1 9.7 17.4L13.5 9.8 9.8 2.2C9.5 1.4 8.9 0 7.9 0H4.8ZM17.6 5.5C16.6 5.5 15.9 6.3 16.2 7.2L18.6 12.1 14.8 19.7C14.5 20.6 15.2 21.4 16.2 21.4H19.7C20.4 21.4 20.9 21 21.2 20.3L25 12.7 22.6 7.8C22.3 7 21.7 5.5 20.7 5.5H17.6Z" />
                  </svg>
                </a>
              </div>
            </section>
          </aside>

          {/* Main Column */}
          <section className="lg:col-span-8 xl:col-span-6 space-y-6">
            <div className="glass rounded-2xl p-6 sm:p-8 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-6">
                Berufserfahrung
              </h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <article
                    key={index}
                    className="relative pl-6 border-l-2 border-[var(--border)] last:pb-0"
                  >
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[var(--primary)] ring-4 ring-[var(--background)]" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-semibold text-[var(--foreground)]">{job.position}</h3>
                        <p className="text-sm text-[var(--primary)] font-medium">{job.company}</p>
                      </div>
                      <time className="text-xs font-medium text-[var(--muted-foreground)] whitespace-nowrap">
                        {formatPeriod(job.startDate, job.endDate)}
                      </time>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {job.description.split("\n").map((line, i) => (
                        <li key={i} className="text-sm text-[var(--muted-foreground)] leading-relaxed flex gap-2">
                          <span className="text-[var(--primary)] mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                          <span>{line.replace("• ", "")}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-[var(--muted)] px-2 py-1 text-[10px] font-medium text-[var(--muted-foreground)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column */}
          <aside className="lg:col-span-12 xl:col-span-3 space-y-6">
            {/* Education */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4">
                Ausbildung
              </h2>
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-[var(--foreground)]">{edu.institution}</h3>
                  <p className="text-sm text-[var(--primary)]">
                    {edu.degree} · {edu.field}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {edu.startDate} – {edu.endDate}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4">
                Sprachen
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="glass rounded-2xl p-6 shadow-glass dark:shadow-glass-dark">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-4">
                Projekte
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-[var(--border)] p-3 hover:border-[var(--primary)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold group-hover:text-[var(--primary)] transition-colors">
                        {project.name}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">↗</span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
