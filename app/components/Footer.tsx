export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          &copy; {new Date().getFullYear()} Hannes Schwede
        </p>
        <div className="flex items-center gap-6 text-xs font-medium text-[var(--muted-foreground)]">
          <a
            href="/impressum"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}
