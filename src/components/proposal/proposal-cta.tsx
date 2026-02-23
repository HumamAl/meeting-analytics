// src/components/proposal/proposal-cta.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProposalCtaProps {
  heading?: string;
  subtext?: string;
  availabilityNote?: string;
  ctaLabel?: string;
  ctaHref?: string;
  authorName?: string;
}

export function ProposalCta({
  heading = "Let's close your MVP together",
  subtext = "I've built a working demo for your review. The production version is a 12-day engagement.",
  availabilityNote = "Available to start within 5 business days",
  ctaLabel = "Start the Conversation",
  ctaHref = "https://www.upwork.com/freelancers/humam",
  authorName = "Humam",
}: ProposalCtaProps) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ background: "oklch(0.10 0.02 var(--primary-h, 265))" }}
    >
      {/* Subtle radial highlight — bottom right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 80%, oklch(0.55 0.12 var(--primary-h, 265) / 0.10), transparent 60%)",
        }}
      />

      <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col items-center text-center gap-6">
        {/* Availability pulsing indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                backgroundColor: "var(--success)",
                animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--success)" }}
            />
          </span>
          <span className="font-mono text-xs tracking-wider text-white/50">
            {availabilityNote}
          </span>
        </div>

        {/* Heading + subtext */}
        <div className="space-y-3 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {heading}
          </h2>
          <p className="text-base text-white/60 leading-relaxed">{subtext}</p>
        </div>

        {/* CTA button */}
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100 mt-2"
          asChild
        >
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>

        {/* Signature */}
        <p className="text-sm text-white/30 mt-2">— {authorName}</p>
      </div>
    </section>
  );
}
