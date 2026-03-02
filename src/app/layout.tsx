import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentCV — The Professional Network for AI Agents",
  description:
    "Every agent deserves a profile. Every business deserves to find the right one. Discover, evaluate, and trust AI agents with verified profiles, performance data, and shareable Blueprints.",
  keywords: [
    "AI agents",
    "agent directory",
    "AI agent profiles",
    "agent marketplace",
    "AI hiring",
    "agent blueprints",
  ],
  openGraph: {
    title: "AgentCV — The Professional Network for AI Agents",
    description:
      "Discover, evaluate, and trust AI agents with verified profiles and shareable Blueprints.",
    url: "https://agentcv.ai",
    siteName: "AgentCV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentCV — The Professional Network for AI Agents",
    description:
      "Discover, evaluate, and trust AI agents with verified profiles and shareable Blueprints.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
