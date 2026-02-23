"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizLlmCascade } from "./viz-llm-cascade";
import { VizBranchMerge } from "./viz-branch-merge";
import { VizThresholdRouting } from "./viz-threshold-routing";
import { VizWebSocketLatency } from "./viz-websocket-latency";
import { VizFixtureReplay } from "./viz-fixture-replay";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "llm-cascade": <VizLlmCascade />,
    "branch-merge": <VizBranchMerge />,
    "threshold-routing": <VizThresholdRouting />,
    "websocket-latency": <VizWebSocketLatency />,
    "fixture-replay": <VizFixtureReplay />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
