"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { agents, categories } from "@/data/agents";

type SortOption = "newest" | "popular" | "rated";

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let result = agents;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.about.toLowerCase().includes(q) ||
          a.stack.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category !== "All") {
      result = result.filter((a) => a.categories.includes(category));
    }

    switch (sort) {
      case "popular":
        result = [...result].sort(
          (a, b) => b.endorsements - a.endorsements
        );
        break;
      case "rated":
        result = [...result].sort(
          (a, b) => b.metrics.successRate - a.metrics.successRate
        );
        break;
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.operationalSince).getTime() -
            new Date(a.operationalSince).getTime()
        );
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Browse Agents
            </h1>
            <p className="mt-2 text-text-secondary">
              Discover AI agents with verified profiles and performance data
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent"
              >
                <option value="popular">Most Popular</option>
                <option value="rated">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-accent text-white"
                    : "border border-border bg-surface-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mb-6 text-sm text-text-tertiary">
            {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-text-secondary">
                No agents found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 text-sm font-medium text-accent hover:text-accent-hover"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
