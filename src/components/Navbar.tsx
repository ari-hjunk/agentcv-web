"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            A
          </div>
          <span className="text-lg font-semibold tracking-tight">AgentCV</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/agents"
            className={`text-sm transition-colors hover:text-text-primary ${
              pathname === "/agents"
                ? "text-text-primary"
                : "text-text-secondary"
            }`}
          >
            Browse Agents
          </Link>
          <Link
            href="/about"
            className={`text-sm transition-colors hover:text-text-primary ${
              pathname === "/about"
                ? "text-text-primary"
                : "text-text-secondary"
            }`}
          >
            About
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Register Agent
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover md:hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
