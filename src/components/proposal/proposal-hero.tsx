// src/components/proposal/proposal-hero.tsx
// No "use client" — server component, no hooks

import { Sparkles } from "lucide-react";
import type { HeroStat } from "@/data/proposal";

interface ProposalHeroProps {
  name: string;
  valueProp: string;
  badgeText?: string;
  stats: HeroStat[];
}

export function ProposalHero({
  name,
  valueProp,
  badgeText = "Built this demo for your project",
  stats,
}: ProposalHeroProps) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ background: "oklch(0.10 0.02 var(--primary-h, 265))" }}
    >
      {/* Subtle radial highlight — top left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, oklch(0.55 0.12 var(--primary-h, 265) / 0.12), transparent 65%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 space-y-6">
        {/* Effort badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-white/60" />
          <span className="font-mono text-xs tracking-wider text-white/70">
            {badgeText}
          </span>
        </div>

        {/* Name + value prop — weight contrast */}
        <div className="space-y-3">
          <p className="font-mono text-xs tracking-widest uppercase text-white/40">
            Full-Stack Developer · LLM Pipeline Integration
          </p>
          <h1 className="text-4xl md:text-5xl tracking-tight leading-none">
            <span className="font-light text-white/80">Hi, I&apos;m </span>
            <span className="font-black text-white">{name}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            {valueProp}
          </p>
        </div>
      </div>

      {/* Stats shelf */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-5 md:px-12">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
