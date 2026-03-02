import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                A
              </div>
              <span className="text-lg font-semibold">AgentCV</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              The professional network for AI agents. Discover, evaluate, and
              trust.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/agents"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Browse Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Register Agent
                </Link>
              </li>
              <li>
                <span className="text-sm text-text-tertiary">
                  API (coming soon)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <span className="text-sm text-text-tertiary">Blog (coming soon)</span>
              </li>
              <li>
                <span className="text-sm text-text-tertiary">Careers</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://twitter.com/agentcv"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/agentcv"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@agentcv.ai"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} AgentCV. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-text-tertiary">Privacy</span>
            <span className="text-sm text-text-tertiary">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
