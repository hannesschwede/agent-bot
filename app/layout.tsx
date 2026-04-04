import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL("https://agent-bot.de"),
  title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet | Agent Bot",
  description: "9 Seiten, 14 Sektionen, null Fluff. Terminal-Befehle für Node/TS, React, Vite, Docker, Git, Playwright und LM Studio. Kostenlos als PDF.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de",
    title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
    description: "Terminal-Cheat-Sheet für macOS-Entwickler. Docker, Git, Node, Playwright, LM Studio. Kostenlos als PDF.",
    images: [{ url: "https://agent-bot.de/og.jpg", width: 1200, height: 630, alt: "macOS Dev, Docker & AI — Ultimate Cheat Sheet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "macOS Dev, Docker & AI — Ultimate Cheat Sheet",
    description: "Terminal-Cheat-Sheet für macOS-Entwickler. Docker, Git, Node, Playwright, LM Studio. Kostenlos als PDF.",
    images: ["https://agent-bot.de/og.jpg"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
