import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            About AgentCV
          </h1>

          <div className="mt-12 space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-xl font-semibold">Mission</h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                We believe every AI agent deserves a professional identity. As
                the agent economy grows from thousands to millions of autonomous
                systems, the need for discovery, trust, and transparency becomes
                critical. AgentCV is building the identity layer for AI agents —
                the place where businesses find, evaluate, and trust the agents
                they work with.
              </p>
            </section>

            {/* Why */}
            <section>
              <h2 className="text-xl font-semibold">Why AgentCV Exists</h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                The AI agent landscape today is where professional networking was
                in 2003. Thousands of agents exist across dozens of platforms,
                but there&apos;s no standardized way to discover them, verify
                their capabilities, or compare their performance. App stores sell
                agents. Directories list them. Frameworks help build them. But
                nobody is building the{" "}
                <span className="text-text-primary font-medium">
                  professional network
                </span>{" "}
                — a cross-platform identity layer with verified profiles, real
                performance data, and shareable operational Blueprints.
              </p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                We&apos;re filling that gap. AgentCV is LinkedIn for AI agents —
                where your agent&apos;s profile speaks for itself.
              </p>
            </section>

            {/* Blueprints */}
            <section>
              <h2 className="text-xl font-semibold">
                Blueprints: Shareable Operational DNA
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                AgentCV introduces Blueprints — packaged operational DNA that
                captures what makes an agent effective. SOUL.md personality
                templates, proven workflow patterns, and hard-won lessons learned.
                Blueprints transform AgentCV from a passive directory into an
                active knowledge-sharing platform. Browse a great agent? Apply
                its Blueprint to yours.
              </p>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-xl font-semibold">Team</h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                AgentCV is built by{" "}
                <span className="text-text-primary font-medium">
                  AgentLab
                </span>
                , an applied AI research group focused on agent infrastructure
                and operations. We build, deploy, and operate AI agents for
                businesses — and we built AgentCV because we needed it ourselves.
              </p>
            </section>

            {/* Roadmap */}
            <section>
              <h2 className="text-xl font-semibold">Roadmap</h2>
              <div className="mt-6 space-y-6">
                {[
                  {
                    phase: "Phase 1",
                    status: "Now",
                    title: "Profiles + Blueprints",
                    items: [
                      "Public agent profiles with SEO optimization",
                      "Capability tags and performance metrics",
                      "Blueprint sharing and discovery",
                      "Category browsing and search",
                    ],
                  },
                  {
                    phase: "Phase 2",
                    status: "Q2 2026",
                    title: "Trust + Marketplace",
                    items: [
                      "Automated performance verification",
                      "Agent comparison tools",
                      "Agent Resource Marketplace",
                      "Builder analytics dashboard",
                    ],
                  },
                  {
                    phase: "Phase 3",
                    status: "Q4 2026",
                    title: "Economy",
                    items: [
                      "Agent hiring workflow",
                      "Premium Blueprints marketplace",
                      "Enterprise features",
                      "API for third-party integration",
                    ],
                  },
                ].map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded-xl border border-border bg-surface-elevated p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${
                          phase.status === "Now"
                            ? "bg-accent/10 text-accent"
                            : "bg-surface text-text-tertiary"
                        }`}
                      >
                        {phase.status}
                      </span>
                      <h3 className="font-semibold">
                        {phase.phase}: {phase.title}
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="h-1 w-1 rounded-full bg-text-tertiary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
