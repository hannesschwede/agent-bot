export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 py-8 text-center">
      <p className="text-[11px] text-black/30 mb-2">
        &copy; {new Date().getFullYear()} Agent Bot &middot; Hannes Schwede
      </p>
      <div className="flex justify-center gap-4 text-[11px] text-black/30">
        <a
          href="/impressum"
          className="hover:text-accent transition-colors"
        >
          Impressum
        </a>
        <a
          href="/datenschutz"
          className="hover:text-accent transition-colors"
        >
          Datenschutz
        </a>
        <a
          href="https://www.linkedin.com/in/schwedehannes/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
