'use client';

import { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';

const CATEGORIES = [
  'Coding',
  'Research',
  'Customer Support',
  'Trading',
  'Automation',
  'Operations',
  'Design',
  'Sales',
  'Legal',
  'Data Engineering',
];

const STACKS = [
  'OpenClaw',
  'LangChain',
  'CrewAI',
  'Claude',
  'GPT-4',
  'Codex',
  'Custom',
  'Python',
  'Node.js',
  'Terraform',
];

type RegisterFormData = {
  name: string;
  tagline: string;
  category: string;
  ownerName: string;
  ownerEmail: string;
  stack: string[];
  about: string;
  capabilities: string;
  uptime: string;
  tasksCompleted: string;
  successRate: string;
  soulmd: string;
  workflows: string;
  lessons: string;
};

type ApiSuccess = { success: true; slug: string };
type ApiError = { error: string };
type ApiResponse = ApiSuccess | ApiError;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    tagline: '',
    category: '',
    ownerName: '',
    ownerEmail: '',
    stack: [],
    about: '',
    capabilities: '',
    uptime: '',
    tasksCompleted: '',
    successRate: '',
    soulmd: '',
    workflows: '',
    lessons: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);

  const updateField = <K extends keyof RegisterFormData>(field: K, value: RegisterFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStack = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.includes(s) ? prev.stack.filter((x) => x !== s) : [...prev.stack, s],
    }));
  };

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Capabilities' },
    { num: 3, label: 'Blueprints' },
    { num: 4, label: 'Preview' },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);

    if (step !== 4 || isSubmitting) {
      return;
    }

    const requiredFields: Array<
      keyof Pick<
        RegisterFormData,
        'name' | 'tagline' | 'category' | 'ownerName' | 'ownerEmail' | 'about'
      >
    > = ['name', 'tagline', 'category', 'ownerName', 'ownerEmail', 'about'];

    const missingField = requiredFields.find((field) => formData[field].trim().length === 0);

    if (missingField) {
      setSubmitMessage({ kind: 'error', text: `Missing required field: ${missingField}` });
      setStep(1);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/agents/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          tagline: formData.tagline,
          category: formData.category,
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          about: formData.about,
        }),
      });

      const data = (await response
        .json()
        .catch(() => ({ error: 'Invalid server response.' }))) as ApiResponse;

      if (!response.ok || 'error' in data) {
        setSubmitMessage({
          kind: 'error',
          text: 'error' in data ? data.error : 'Failed to register agent.',
        });
        return;
      }

      setSubmitMessage({
        kind: 'success',
        text: `Agent registered successfully. Slug: ${data.slug}`,
      });
    } catch {
      setSubmitMessage({ kind: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <form className="mx-auto max-w-2xl px-6" onSubmit={handleSubmit}>
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Register Your Agent</h1>
            <p className="mt-2 text-text-secondary">
              Create a professional profile for your AI agent
            </p>
          </div>

          <div className="mb-10 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    step >= s.num
                      ? 'bg-accent text-white'
                      : 'border border-border text-text-tertiary'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`hidden text-xs md:inline ${
                    step >= s.num ? 'text-text-primary' : 'text-text-tertiary'
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`mx-2 h-px flex-1 ${step > s.num ? 'bg-accent' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Agent Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., CodePilot"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="e.g., Full-stack development agent that ships clean code"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateField('category', cat)}
                      className={`rounded-lg px-4 py-2 text-sm transition-all ${
                        formData.category === cat
                          ? 'bg-accent text-white'
                          : 'border border-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Tech Stack</label>
                <div className="flex flex-wrap gap-2">
                  {STACKS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStack(s)}
                      className={`rounded-lg px-4 py-2 text-sm transition-all ${
                        formData.stack.includes(s)
                          ? 'bg-accent text-white'
                          : 'border border-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Owner Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => updateField('ownerName', e.target.value)}
                    placeholder="e.g., Alex Chen"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Owner Email</label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => updateField('ownerEmail', e.target.value)}
                    placeholder="e.g., alex@example.com"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">About</label>
                <textarea
                  value={formData.about}
                  onChange={(e) => updateField('about', e.target.value)}
                  placeholder="Describe what makes your agent unique..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Capabilities</label>
                <p className="mb-3 text-xs text-text-tertiary">
                  List your agent&apos;s key capabilities, one per line (e.g., &ldquo;Code
                  Generation: 95&rdquo;)
                </p>
                <textarea
                  value={formData.capabilities}
                  onChange={(e) => updateField('capabilities', e.target.value)}
                  placeholder={'Code Generation: 95\nCode Review: 90\nTesting: 85'}
                  rows={6}
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm font-mono outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Uptime %</label>
                  <input
                    type="text"
                    value={formData.uptime}
                    onChange={(e) => updateField('uptime', e.target.value)}
                    placeholder="99.9"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Tasks Completed</label>
                  <input
                    type="text"
                    value={formData.tasksCompleted}
                    onChange={(e) => updateField('tasksCompleted', e.target.value)}
                    placeholder="1000"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Success Rate %</label>
                  <input
                    type="text"
                    value={formData.successRate}
                    onChange={(e) => updateField('successRate', e.target.value)}
                    placeholder="95"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                <p className="text-sm text-accent">
                  💡 Blueprints are optional but powerful. Agents with Blueprints get 3x more
                  profile views.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">SOUL.md Template</label>
                <p className="mb-3 text-xs text-text-tertiary">
                  Share your agent&apos;s personality and decision-making framework
                </p>
                <textarea
                  value={formData.soulmd}
                  onChange={(e) => updateField('soulmd', e.target.value)}
                  placeholder="# SOUL.md - Who You Are&#10;&#10;## Core Truths&#10;..."
                  rows={8}
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm font-mono outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Workflow Patterns</label>
                <textarea
                  value={formData.workflows}
                  onChange={(e) => updateField('workflows', e.target.value)}
                  placeholder="Describe your agent's key workflow patterns..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Lessons Learned</label>
                <textarea
                  value={formData.lessons}
                  onChange={(e) => updateField('lessons', e.target.value)}
                  placeholder="Share mistakes and corrections that improved your agent..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors focus:border-accent placeholder:text-text-tertiary"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-elevated p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-3xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{formData.name || 'Your Agent'}</h3>
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
                    <span className="text-xs text-text-tertiary">Blueprint shared</span>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                <p className="text-sm text-text-secondary">
                  This is a preview. In production, your agent profile will be live at{' '}
                  <span className="font-mono text-accent">
                    agentcv.ai/agents/
                    {formData.name
                      ? formData.name.toLowerCase().replace(/\s+/g, '-')
                      : 'your-agent'}
                  </span>
                </p>
              </div>
            </div>
          )}

          {submitMessage && (
            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                submitMessage.kind === 'success'
                  ? 'border-green-500/40 bg-green-500/10 text-green-400'
                  : 'border-red-500/40 bg-red-500/10 text-red-300'
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
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
                type="button"
                onClick={() => setStep(step + 1)}
                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-accent px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Agent'}
              </button>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
