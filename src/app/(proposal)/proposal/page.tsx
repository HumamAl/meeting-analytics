// src/app/(proposal)/proposal/page.tsx — Server Component

import { ProposalHero } from "@/components/proposal/proposal-hero";
import { ProofOfWork } from "@/components/proposal/proof-of-work";
import { HowIWork } from "@/components/proposal/how-i-work";
import { SkillsSection } from "@/components/proposal/skills-section";
import { ProposalCta } from "@/components/proposal/proposal-cta";
import { proposalData } from "@/data/proposal";

export const metadata = { title: "Proposal — Meeting Analytics Engine" };

export default function ProposalPage() {
  const { hero, projects, approachSteps, skillCategories, cta } = proposalData;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 space-y-10">
        {/* Section 1 — Hero (dark panel) */}
        <ProposalHero
          name={hero.name}
          valueProp={hero.valueProp}
          badgeText={hero.badgeText}
          stats={hero.stats}
        />

        {/* Section 2 — Proof of Work */}
        <ProofOfWork projects={projects} />

        {/* Section 3 — How I Work */}
        <HowIWork steps={approachSteps} />

        {/* Section 4 — Skills Grid */}
        <SkillsSection categories={skillCategories} />

        {/* Section 5 — CTA (dark panel) */}
        <ProposalCta
          heading={cta.heading}
          subtext={cta.subtext}
          availabilityNote={cta.availabilityNote}
          ctaLabel={cta.ctaLabel}
          ctaHref={cta.ctaHref}
          authorName={cta.authorName}
        />
      </div>
    </div>
  );
}
