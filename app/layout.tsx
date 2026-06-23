import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agent-bot.de"),
  title: "Hannes Schwede — Operations & Process Management",
  description:
    "Lebenslauf von Hannes Schwede: Operations & Process Management, digitale Projekte, Automatisierung und Tool-Entwicklung.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de",
    title: "Hannes Schwede — Operations & Process Management",
    description:
      "Lebenslauf von Hannes Schwede: Operations & Process Management, digitale Projekte, Automatisierung und Tool-Entwicklung.",
    images: [
      {
        url: "https://agent-bot.de/og.jpg",
        width: 1200,
        height: 630,
        alt: "Hannes Schwede — Operations & Process Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hannes Schwede — Operations & Process Management",
    description:
      "Lebenslauf von Hannes Schwede: Operations & Process Management, digitale Projekte, Automatisierung und Tool-Entwicklung.",
    images: ["https://agent-bot.de/og.jpg"],
  },
  icons: { icon: "/profile.jpeg", apple: "/profile.jpeg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hannes Schwede",
              jobTitle: "Operations & Process Management",
              url: "https://agent-bot.de",
              sameAs: [
                "https://github.com/hannesschwede",
                "https://www.linkedin.com/in/schwedehannes/",
                "https://www.xing.com/profile/Hannes_Schwede/web_profiles",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
