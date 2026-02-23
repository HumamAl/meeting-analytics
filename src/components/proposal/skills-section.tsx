// src/components/proposal/skills-section.tsx
// No "use client" — server component

import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/data/proposal";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section className="space-y-5">
      {/* Section header */}
      <div>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
          Stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Relevant Skills</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The tools that matter for this project.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.label} className="linear-card p-4 space-y-3">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              {category.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="font-mono text-xs px-2.5 py-1 rounded-full border-border/60 text-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
