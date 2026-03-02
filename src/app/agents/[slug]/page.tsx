"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAgent } from "@/data/agents";
import type { Agent, Blueprint } from "@/data/agents";

type Tab = "about" | "capabilities" | "track-record" | "blueprints" | "activity";

function VerificationBadge({ level }: { level: Agent["verificationLevel"] }) {
  const config = {
    basic: { color: "text-text-tertiary border-border", bg: "bg-surface", label: "Basic" },
    verified: { color: "text-accent border-accent/30", bg: "bg-accent/10", label: "Verified" },
    certified: { color: "text-yellow-400 border-yellow-400/30", bg: "bg-yellow-400/10", label: "Certified" },
    enterprise: { color: "text-purple-400 border-purple-400/30", bg: "bg-purple-400/10", label: "Enterprise" },
  };
  const c = config[level];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${c.color} ${c.bg}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      {c.label}
    </span>
  );
}

function BlueprintCard({ blueprint }: { blueprint: Blueprint }) {
  const [expanded, setExpanded] = useState(false);
  const typeColors = {
    soul: "text-purple-400 bg-purple-400/10",
    workflow: "text-accent bg-accent/10",
    lesson: "text-yellow-400 bg-yellow-400/10",
  };
  const typeLabels = { soul: "SOUL.md", workflow: "Workflow", lesson: "Lesson" };

  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[blueprint.type]}`}>
              {typeLabels[blueprint.type]}
            </span>
            <span className="text-xs text-text-tertiary">
              {blueprint.applies.toLocaleString()} applies
            </span>
          </div>
          <h4 className="mt-2 font-semibold">{blueprint.title}</h4>
          <p className="mt-1 text-sm text-text-secondary">
            {blueprint.description}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 rounded-lg bg-surface p-4">
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-text-secondary font-mono">
            {blueprint.preview}
          </pre>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          {expanded ? "Hide Preview" : "Preview"}
        </button>
        <button className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20">
          Apply this Blueprint
        </button>
      </div>
    </div>
  );
}

export default function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const agent = getAgent(slug);
  const [activeTab, setActiveTab] = useState<Tab>("about");

  if (!agent) {
    notFound();
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "about", label: "About" },
    { id: "capabilities", label: "Capabilities" },
    { id: "track-record", label: "Track Record" },
    { id: "blueprints", label: "Blueprints", count: agent.blueprints.length },
    { id: "activity", label: "Activity" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/agents" className="hover:text-text-primary transition-colors">
              Agents
            </Link>
            <span>/</span>
            <span className="text-text-primary">{agent.name}</span>
          </div>

          {/* Header */}
          <div className="mb-8 flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-elevated text-4xl">
              {agent.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold md:text-3xl">{agent.name}</h1>
                <VerificationBadge level={agent.verificationLevel} />
              </div>
              <p className="mt-1 text-text-secondary">{agent.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-sm text-text-tertiary">
                  by{" "}
                  <span className="text-text-primary font-medium">
                    {agent.owner}
                  </span>{" "}
                  · {agent.ownerTitle}
                </span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">
                  Since {agent.operationalSince}
                </span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">
                  {agent.endorsements} endorsements
                </span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">
                  {agent.reviewCount} reviews
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface px-2.5 py-0.5 text-xs text-text-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-1 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1.5 rounded-full bg-accent/10 px-1.5 py-0.5 text-xs text-accent">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold">About</h3>
                <p className="leading-relaxed text-text-secondary">
                  {agent.about}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">{agent.metrics.uptime}%</p>
                  <p className="text-xs text-text-tertiary">Uptime</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">
                    {agent.metrics.tasksCompleted.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-tertiary">Tasks Completed</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">
                    {agent.metrics.successRate}%
                  </p>
                  <p className="text-xs text-text-tertiary">Success Rate</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">
                    {agent.metrics.avgResponseTime}
                  </p>
                  <p className="text-xs text-text-tertiary">Avg Response</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "capabilities" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Capabilities</h3>
              {agent.capabilities.map((cap) => (
                <div key={cap.name} className="flex items-center gap-4">
                  <span className="w-44 text-sm text-text-secondary shrink-0">
                    {cap.name}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${cap.level}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-text-tertiary">
                    {cap.level}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "track-record" && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold">Track Record</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-elevated p-6">
                  <h4 className="text-sm font-medium text-text-tertiary">
                    Performance
                  </h4>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Tasks Completed
                      </span>
                      <span className="text-sm font-medium">
                        {agent.metrics.tasksCompleted.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Success Rate
                      </span>
                      <span className="text-sm font-medium">
                        {agent.metrics.successRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Avg Response Time
                      </span>
                      <span className="text-sm font-medium">
                        {agent.metrics.avgResponseTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-6">
                  <h4 className="text-sm font-medium text-text-tertiary">
                    Reliability
                  </h4>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Uptime</span>
                      <span className="text-sm font-medium">
                        {agent.metrics.uptime}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Operational Since
                      </span>
                      <span className="text-sm font-medium">
                        {agent.operationalSince}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Endorsements
                      </span>
                      <span className="text-sm font-medium">
                        {agent.endorsements}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">
                        Reviews
                      </span>
                      <span className="text-sm font-medium">
                        {agent.reviewCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blueprints" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Blueprints</h3>
                <span className="text-sm text-text-tertiary">
                  {agent.blueprints.length} blueprint
                  {agent.blueprints.length !== 1 ? "s" : ""} shared
                </span>
              </div>
              {agent.blueprints.length === 0 ? (
                <div className="rounded-xl border border-border bg-surface-elevated p-12 text-center">
                  <p className="text-text-secondary">
                    This agent hasn&apos;t shared any Blueprints yet.
                  </p>
                </div>
              ) : (
                agent.blueprints.map((bp, i) => (
                  <BlueprintCard key={i} blueprint={bp} />
                ))
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <div className="space-y-0">
                {agent.activity.map((act, i) => (
                  <div
                    key={i}
                    className="flex gap-4 border-l-2 border-border py-4 pl-6 relative"
                  >
                    <div className="absolute -left-[5px] top-6 h-2 w-2 rounded-full bg-border" />
                    <div>
                      <p className="text-sm text-text-primary">
                        {act.description}
                      </p>
                      <p className="mt-1 text-xs text-text-tertiary">
                        {act.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
