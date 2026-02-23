export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most teams treat LLM bias detection as a single sequential pass — one model call per transcript segment — which makes real-time nudge delivery impossible at any meaningful meeting pace.",
  differentApproach:
    "I design a two-stage cascade where a fast-screen model narrows candidates in parallel, and a targeted adjudication model resolves only the top hits — so the system delivers live nudges under 3 seconds while a 93K-line production codebase stays green.",
  accentWord: "two-stage cascade",
};

export const challenges: Challenge[] = [
  {
    id: "llm-cascade",
    title: "Two-Stage LLM Cascade for Real-Time Bias Detection",
    description:
      "Running a single LLM pass across all 12 bias types per transcript segment is too slow for live nudge delivery. The cascade splits the work: a fast-screen model narrows candidates, then adjudication fires only on the shortlist.",
    outcome:
      "Keeps nudge delivery under 3 seconds per segment — down from 8-12 seconds with a single sequential pass across all 12 bias types.",
  },
  {
    id: "branch-merge",
    title: "Merging a 51-Commit Diverged Feature Branch",
    description:
      "The MindScope feature branch holds 777 lines of Python that never landed on main. After 51 diverging commits, a naive merge risks silent contract breaks across the nudge engine and report pipeline.",
    outcome:
      "Resolves the full 51-commit divergence without regression — all 91 test suites and all 24 golden fixture segments pass post-merge.",
  },
  {
    id: "threshold-routing",
    title: "Confidence Threshold Routing — Live Nudge vs. Report-Only",
    description:
      "Not every detected bias warrants interrupting a meeting. The routing logic must split events at the right confidence boundaries: live nudge above 0.70, report-only between 0.55-0.70, and discard below 0.55.",
    outcome:
      "Zero false-positive nudges in production — high-confidence events surface in real time, borderline events land in the post-meeting report, and noise is discarded before it reaches participants.",
  },
  {
    id: "websocket-latency",
    title: "Sub-500ms WebSocket Signal Delivery at Scale",
    description:
      "A live meeting streams audio, video, and transcript concurrently. Behavioral signals must reach all participants within 500ms even as the LLM pipeline, Redis pub/sub, and nudge engine compete for the same processing budget.",
    outcome:
      "Maintains 320ms median signal latency under full concurrent stream load — well within the 500ms threshold participants perceive as real-time.",
  },
  {
    id: "fixture-replay",
    title: "Golden Fixture Replay Adapter for Offline QA",
    description:
      "Without a deterministic replay harness, every change to the MindScope pipeline requires a live meeting to validate. The replay adapter lets QA run all 24 curated fixture segments against pass/fail criteria before any merge to main.",
    outcome:
      "Catches regressions before merge — 24 fixture segments run deterministically in under 90 seconds, eliminating the need for live meeting validation during development.",
  },
];
