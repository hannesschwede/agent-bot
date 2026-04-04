import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://agent-bot.de"),
  title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet | Agent Bot",
  description:
    "9 Seiten, 14 Sektionen, null Fluff. Terminal-Befehle für Node/TS, React, Vite, Docker, Git, Playwright und LM Studio. Kostenlos als PDF.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de",
    title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
    description:
      "Terminal-Cheat-Sheet für macOS-Entwickler. Docker, Git, Node, Playwright, LM Studio. Kostenlos als PDF.",
    images: [
      {
        url: "https://agent-bot.de/og.jpg",
        width: 1200,
        height: 630,
        alt: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
    description:
      "Terminal-Cheat-Sheet für macOS-Entwickler. Docker, Git, Node, Playwright, LM Studio. Kostenlos als PDF.",
    images: ["https://agent-bot.de/og.jpg"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://api.x.ai" />
        <link rel="dns-prefetch" href="https://api.beehiiv.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Agent Bot",
              url: "https://agent-bot.de",
              logo: "https://agent-bot.de/favicon.ico",
              founder: {
                "@type": "Person",
                name: "Hannes Schwede",
              },
              sameAs: [
                "https://github.com/agent-botde",
                "https://www.linkedin.com/in/schwedehannes/",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
