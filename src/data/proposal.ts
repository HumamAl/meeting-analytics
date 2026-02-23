// src/data/proposal.ts
// Proposal page data — Meeting Analytics Engine

export interface PortfolioProject {
  name: string;
  description: string;
  outcome: string;
  tech: string[];
  url?: string; // omit if no live demo — ExternalLink icon is hidden when absent
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ProposalData {
  hero: {
    name: string;
    valueProp: string;
    badgeText?: string;
    stats: HeroStat[];
  };
  projects: PortfolioProject[];
  approachSteps: ApproachStep[];
  skillCategories: SkillCategory[];
  cta: {
    heading: string;
    subtext: string;
    availabilityNote: string;
    ctaLabel: string;
    ctaHref: string;
    authorName: string;
  };
}

export const proposalData: ProposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "I integrate LLM cascade pipelines and real-time analytics systems — the kind of work that closes the last 15% of an MVP.",
    badgeText: "Built this demo for your project",
    stats: [
      { value: "24+", label: "projects shipped" },
      { value: "< 48hr", label: "demo turnaround" },
      { value: "15+", label: "industries served" },
    ],
  },

  projects: [
    {
      name: "WMF Agent Dashboard",
      description:
        "LLM cascade pipeline for automated email classification and RFQ data extraction. Structured JSON outputs, confidence thresholds, and human-in-the-loop escalation when scores fall below threshold — same pattern as MindScope Stage 1/Stage 2.",
      outcome: "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
      tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph", "TypeScript"],
      url: "https://wmf-agent-dashboard.vercel.app",
    },
    {
      name: "MedRecord AI",
      description:
        "AI extraction pipeline that parses medical documents and outputs structured clinical data — diagnoses, medications, treatment timelines. Shows LLM-based analysis producing typed JSON, not just text summaries.",
      outcome: "Document processing pipeline extracting structured clinical data with a readable timeline summary",
      tech: ["Next.js", "TypeScript", "AI extraction pipeline", "shadcn/ui"],
      url: "https://medrecord-ai-delta.vercel.app",
    },
    {
      name: "Data Intelligence Platform",
      description:
        "Multi-source analytics dashboard with behavioral signal aggregation, interactive charts, and filterable insight views. Closest to the meeting analytics UI pattern — real-time data, participant-level breakdowns, and export-ready reports.",
      outcome: "Unified analytics dashboard pulling from multiple sources with interactive charts and filterable insights",
      tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
      url: "https://data-intelligence-platform-sandy.vercel.app",
    },
    {
      name: "eBay Pokemon Monitor",
      description:
        "Real-time listing monitor using eBay Browse API with event-driven alert delivery via Discord webhooks. Demonstrates WebSocket-style streaming familiarity and live signal feeds — relevant to the nudge delivery latency requirements.",
      outcome: "Real-time listing monitor with webhook-based Discord alerts and price trend tracking under 500ms",
      tech: ["Next.js", "TypeScript", "REST API", "Webhook delivery"],
      url: "https://ebay-pokemon-monitor.vercel.app",
    },
  ],

  approachSteps: [
    {
      step: "01",
      title: "Understand",
      description:
        "Read the 93K lines. Run the test suite. Map the data model and the confidence threshold routing logic before touching a single line. Establish green baseline on main.",
      timeline: "Day 1–2",
    },
    {
      step: "02",
      title: "Integrate",
      description:
        "Merge the feature branch. Resolve the 51-commit divergence with the codebase I just read — not blindly. Wire MindScope into existing pipelines with no regressions.",
      timeline: "Day 3–7",
    },
    {
      step: "03",
      title: "Test",
      description:
        "Run the golden fixture replay adapter against all 24 curated segments. Acceptance criteria verification end-to-end. Nothing merges that doesn't pass its own fixtures.",
      timeline: "Day 8–10",
    },
    {
      step: "04",
      title: "Ship",
      description:
        "PR review-ready code with documentation, migration notes, and a clean commit history. No dark periods — visible progress every two days.",
      timeline: "Day 11–12",
    },
  ],

  skillCategories: [
    {
      label: "Languages",
      skills: ["Python 3.11", "TypeScript", "SQL"],
    },
    {
      label: "Backend",
      skills: ["Flask", "SQLAlchemy", "pytest", "Redis"],
    },
    {
      label: "Frontend",
      skills: ["React 18", "Next.js", "WebSocket", "Recharts"],
    },
    {
      label: "AI / LLM",
      skills: ["Claude API", "Hume AI", "LLM Pipelines", "Confidence Scoring", "Structured JSON Output"],
    },
    {
      label: "Infrastructure",
      skills: ["Docker", "EC2", "PostgreSQL", "Vercel"],
    },
    {
      label: "Testing",
      skills: ["pytest", "Golden Fixture Replay", "CI/CD", "End-to-End QA"],
    },
  ],

  cta: {
    heading: "Let's close your MVP together",
    subtext:
      "I've built a working demo of the analytics engine for your review. The production version — MindScope merged, nudge routing live, fixture suite green — is a 12-day engagement.",
    availabilityNote: "Available to start within 5 business days",
    ctaLabel: "Start the Conversation",
    ctaHref: "https://www.upwork.com/freelancers/humam",
    authorName: "Humam",
  },
};
