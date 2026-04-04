import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI Code Review | Agent Bot",
  description:
    "Kostenloser KI-gestützter Code-Reviewer für JavaScript, TypeScript, Python und Go. Powered by xAI Grok 3.",
  openGraph: {
    type: "website",
    url: "https://agent-bot.de/code-review",
    title: "KI Code Review | Agent Bot",
    description:
      "Kostenloser KI-gestützter Code-Reviewer. Sicherheit, Performance und Code-Qualität in Sekunden analysiert.",
  },
  alternates: {
    canonical: "https://agent-bot.de/code-review",
  },
};

export default function CodeReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
