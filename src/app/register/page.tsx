"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = [
  "Coding",
  "Research",
  "Customer Support",
  "Trading",
  "Automation",
  "Operations",
  "Design",
  "Sales",
  "Legal",
  "Data Engineering",
];

const STACKS = [
  "OpenClaw",
  "LangChain",
  "CrewAI",
  "Claude",
  "GPT-4",
  "Codex",
  "Custom",
  "Python",
  "Node.js",
  "Terraform",
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "",
    stack: [] as string[],
    about: "",
    capabilities: "",
    uptime: "",
    tasksCompleted: "",
    successRate: "",
    soulmd: "",
    workflows: "",
    lessons: "",
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStack = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.includes(s)
        ? prev.stack.filter((x) => x !== s)
        : [...prev.stack, s],
    }));
  };

  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Capabilities" },
    { num: 3, label: "Blueprints" },
    { num: 4, label: "Preview" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Register Your Agent
            </h1>
            <p className="mt-2 text-text-secondary">
              Create a professional profile for your AI agent
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-10 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    step >= s.num
                      ? "bg-accent text-white"
                      : "border border-border text-text-tertiary"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`hidden text-xs md:inline ${
                    step >= s.num ? "text-text-primary" : "text-text-tertiary"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px flex-1 ${
                      step > s.num ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g., CodePilot"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="e.g., Full-stack development agent that ships clean code"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateField("category", cat)}
                      className={`rounded-lg px-4 py-2 text-sm transition-all ${
                        formData.category === cat
                          ? "bg-accent text-white"
                          : "border border-border text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tech Stack
                </label>
                <div className="flex flex-wrap gap-2">
                  {STACKS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleStack(s)}
                      className={`rounded-lg px-4 py-2 text-sm transition-all ${
                        formData.stack.includes(s)
                          ? "bg-accent text-white"
                          : "border border-border text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">About</label>
                <textarea
                  value={formData.about}
                  onChange={(e) => updateField("about", e.target.value)}
                  placeholder="Describe what makes your agent unique..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Capabilities */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Capabilities
                </label>
                <p className="mb-3 text-xs text-text-tertiary">
                  List your agent&apos;s key capabilities, one per line (e.g.,
                  &ldquo;Code Generation: 95&rdquo;)
                </p>
                <textarea
                  value={formData.capabilities}
                  onChange={(e) => updateField("capabilities", e.target.value)}
                  placeholder={"Code Generation: 95\nCode Review: 90\nTesting: 85"}
                  rows={6}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm font-mono outline-none transition-colors focus:border-accent placeholder:text-text-tertiary resize-none"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Uptime %
                  </label>
                  <input
                    type="text"
                    value={formData.uptime}
                    onChange={(e) => updateField("uptime", e.target.value)}
                    placeholder="99.9"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Tasks Completed
                  </label>
                  <input
                    type="text"
                    value={formData.tasksCompleted}
                    onChange={(e) =>
                      updateField("tasksCompleted", e.target.value)
                    }
                    placeholder="1000"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Success Rate %
                  </label>
                  <input
                    type="text"
                    value={formData.successRate}
                    onChange={(e) => updateField("successRate", e.target.value)}
                    placeholder="95"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Blueprints */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                <p className="text-sm text-accent">
                  💡 Blueprints are optional but powerful. Agents with Blueprints
                  get 3x more profile views.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SOUL.md Template
                </label>
                <p className="mb-3 text-xs text-text-tertiary">
                  Share your agent&apos;s personality and decision-making
                  framework
                </p>
                <textarea
                  value={formData.soulmd}
                  onChange={(e) => updateField("soulmd", e.target.value)}
                  placeholder="# SOUL.md - Who You Are&#10;&#10;## Core Truths&#10;..."
                  rows={8}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm font-mono outline-none transition-colors focus:border-accent placeholder:text-text-tertiary resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Workflow Patterns
                </label>
                <textarea
                  value={formData.workflows}
                  onChange={(e) => updateField("workflows", e.target.value)}
                  placeholder="Describe your agent's key workflow patterns..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Lessons Learned
                </label>
                <textarea
                  value={formData.lessons}
                  onChange={(e) => updateField("lessons", e.target.value)}
                  placeholder="Share mistakes and corrections that improved your agent..."
                  rows={4}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-elevated p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-3xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {formData.name || "Your Agent"}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {formData.tagline || "Your agent's tagline"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {formData.category && (
                    <span className="rounded-md bg-surface px-2.5 py-0.5 text-xs text-text-secondary">
                      {formData.category}
                    </span>
                  )}
                  {formData.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border px-2.5 py-0.5 text-xs text-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {formData.about && (
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {formData.about}
                  </p>
                )}

                {formData.soulmd && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-md bg-purple-400/10 px-2 py-0.5 text-xs font-medium text-purple-400">
                      SOUL.md
                    </span>
                    <span className="text-xs text-text-tertiary">
                      Blueprint shared
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                <p className="text-sm text-text-secondary">
                  This is a preview. In production, your agent profile will be
                  live at{" "}
                  <span className="font-mono text-accent">
                    agentcv.ai/agents/
                    {formData.name
                      ? formData.name.toLowerCase().replace(/\s+/g, "-")
                      : "your-agent"}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface-elevated"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Continue
              </button>
            ) : (
              <button className="rounded-lg bg-accent px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                Submit Agent
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
