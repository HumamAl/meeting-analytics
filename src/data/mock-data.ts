/**
 * Mock data for the Meeting Analytics Engine demo.
 * All entities, bias types, metric ranges, and terminology sourced from
 * the domain research brief. Relational IDs are consistent across datasets.
 *
 * Today's reference date: 2026-02-22
 */

import type {
  Participant,
  Meeting,
  BiasEvent,
  Nudge,
  Flashpoint,
  Report,
  SignalDataPoint,
  BiasMarker,
  DashboardStats,
  BiasFrequencyBar,
  MeetingActivityPoint,
  ConfidenceDistributionPoint,
} from "@/lib/types";

// ─── Date helpers ──────────────────────────────────────────────────────────────

const baseDate = new Date("2026-02-22T00:00:00Z");

/** Returns an ISO datetime string N days before the base date, with optional hour/minute offsets */
function daysAgo(days: number, hours = 10, minutes = 0): string {
  const d = new Date(baseDate);
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

/** Returns an ISO datetime string for a time offset within a meeting (today's live meeting) */
function meetingTime(hours: number, minutes: number, seconds = 0): string {
  const d = new Date("2026-02-22T09:00:00Z");
  d.setHours(d.getHours() + hours, d.getMinutes() + minutes, seconds, 0);
  return d.toISOString();
}

// ─── Participants ──────────────────────────────────────────────────────────────

export const participants: Participant[] = [
  {
    id: "PAR-1001",
    name: "Sarah Cho",
    role: "facilitator",
    title: "VP Product",
    initials: "SC",
    currentArousal: 0.61,
    currentValence: 0.38,
    currentTension: 0.29,
  },
  {
    id: "PAR-1002",
    name: "Marcus Delgado",
    role: "participant",
    title: "Head of Engineering",
    initials: "MD",
    currentArousal: 0.74,
    currentValence: -0.18,
    currentTension: 0.52,
  },
  {
    id: "PAR-1003",
    name: "Priya Nair",
    role: "participant",
    title: "Chief Revenue Officer",
    initials: "PN",
    currentArousal: 0.83,
    currentValence: 0.54,
    currentTension: 0.35,
  },
  {
    id: "PAR-1004",
    name: "Tom Whitfield",
    role: "participant",
    title: "Senior Analyst",
    initials: "TW",
    currentArousal: 0.42,
    currentValence: -0.05,
    currentTension: 0.44,
  },
  {
    id: "PAR-1005",
    name: "Rachel Kim",
    role: "participant",
    title: "Director of Strategy",
    initials: "RK",
    currentArousal: 0.57,
    currentValence: 0.21,
    currentTension: 0.31,
  },
  {
    id: "PAR-1006",
    name: "Daniel Osei",
    role: "participant",
    title: "Engineering Lead",
    initials: "DO",
    currentArousal: 0.66,
    currentValence: -0.34,
    currentTension: 0.67,
  },
  {
    id: "PAR-1007",
    name: "Leila Ahmadi",
    role: "participant",
    title: "Product Manager",
    initials: "LA",
    currentArousal: 0.48,
    currentValence: 0.12,
    currentTension: 0.28,
  },
  {
    id: "PAR-1008",
    name: "Connor Walsh",
    role: "observer",
    title: "Sales Director",
    initials: "CW",
    currentArousal: 0.35,
    currentValence: 0.07,
    currentTension: 0.19,
  },
];

// ─── Meetings / Sessions ───────────────────────────────────────────────────────

export const meetings: Meeting[] = [
  {
    id: "MTG-4821",
    title: "Q2 Roadmap Prioritization",
    type: "strategy-session",
    date: daysAgo(0, 9, 0),
    durationMinutes: 0, // live — still running
    participantIds: ["PAR-1001", "PAR-1002", "PAR-1003", "PAR-1005", "PAR-1007"],
    status: "in-progress",
    biasCount: 7,
    nudgesSent: 3,
    flashpointsDetected: 1,
  },
  {
    id: "MTG-4817",
    title: "Engineering Sprint Retrospective",
    type: "retrospective",
    date: daysAgo(2, 14, 0),
    durationMinutes: 48,
    participantIds: ["PAR-1002", "PAR-1006", "PAR-1007"],
    status: "report-ready",
    biasCount: 9,
    nudgesSent: 4,
    flashpointsDetected: 2,
  },
  {
    id: "MTG-4812",
    title: "Enterprise Deal Negotiation — Helix Analytics",
    type: "negotiation",
    date: daysAgo(4, 11, 30),
    durationMinutes: 63,
    participantIds: ["PAR-1003", "PAR-1008", "PAR-1005"],
    status: "report-ready",
    biasCount: 12,
    nudgesSent: 5,
    flashpointsDetected: 3,
  },
  {
    id: "MTG-4809",
    title: "Board Q1 Revenue Review",
    type: "board-review",
    date: daysAgo(7, 10, 0),
    durationMinutes: 87,
    participantIds: ["PAR-1001", "PAR-1003", "PAR-1004", "PAR-1005"],
    status: "report-ready",
    biasCount: 14,
    nudgesSent: 6,
    flashpointsDetected: 2,
  },
  {
    id: "MTG-4804",
    title: "MindScope Feature Alignment",
    type: "strategy-session",
    date: daysAgo(10, 9, 30),
    durationMinutes: 52,
    participantIds: ["PAR-1001", "PAR-1002", "PAR-1006", "PAR-1007"],
    status: "completed",
    biasCount: 6,
    nudgesSent: 2,
    flashpointsDetected: 0,
  },
  {
    id: "MTG-4798",
    title: "Sales Quarterly Kickoff",
    type: "sales-call",
    date: daysAgo(14, 13, 0),
    durationMinutes: 74,
    participantIds: ["PAR-1003", "PAR-1008", "PAR-1004"],
    status: "report-ready",
    biasCount: 8,
    nudgesSent: 3,
    flashpointsDetected: 1,
  },
  {
    id: "MTG-4791",
    title: "Architecture Decision: Cascade Latency",
    type: "retrospective",
    date: daysAgo(18, 15, 0),
    durationMinutes: 34,
    participantIds: ["PAR-1002", "PAR-1006"],
    status: "completed",
    biasCount: 3,
    nudgesSent: 1,
    flashpointsDetected: 0,
  },
  {
    id: "MTG-4784",
    title: "Weekly Engineering Standup",
    type: "team-standup",
    date: daysAgo(22, 9, 15),
    durationMinutes: 22,
    participantIds: ["PAR-1002", "PAR-1006", "PAR-1007", "PAR-1004"],
    status: "completed",
    biasCount: 4,
    nudgesSent: 1,
    flashpointsDetected: 0,
  },
  {
    id: "MTG-4776",
    title: "Investor Update Prep Session",
    type: "board-review",
    date: daysAgo(28, 10, 0),
    durationMinutes: 61,
    participantIds: ["PAR-1001", "PAR-1003", "PAR-1005", "PAR-1004"],
    status: "report-ready",
    biasCount: 11,
    nudgesSent: 4,
    flashpointsDetected: 2,
  },
  {
    id: "MTG-4769",
    title: "Customer Escalation Debrief — Nexora Systems",
    type: "strategy-session",
    date: daysAgo(35, 16, 30),
    durationMinutes: 41,
    participantIds: ["PAR-1003", "PAR-1008", "PAR-1005"],
    status: "report-ready",
    biasCount: 7,
    nudgesSent: 2,
    flashpointsDetected: 1,
  },
];

// ─── Bias Events ───────────────────────────────────────────────────────────────

export const biasEvents: BiasEvent[] = [
  // MTG-4821 (live meeting — in-progress)
  {
    id: "BEV-7041",
    meetingId: "MTG-4821",
    participantId: "PAR-1003",
    biasType: "Anchoring Bias",
    transcriptExcerpt:
      "We should anchor the budget at the $2M figure from last quarter and work backwards from there.",
    stage1Score: 0.78,
    stage2Score: 0.84,
    confidenceScore: 0.84,
    severity: "high",
    action: "nudge-sent",
    timestamp: meetingTime(0, 12),
    segmentDurationSeconds: 47,
  },
  {
    id: "BEV-7042",
    meetingId: "MTG-4821",
    participantId: "PAR-1002",
    biasType: "Confirmation Bias",
    transcriptExcerpt:
      "Every engineer I've talked to agrees the current stack is fine — I don't see why we'd change anything.",
    stage1Score: 0.71,
    stage2Score: 0.79,
    confidenceScore: 0.79,
    severity: "high",
    action: "nudge-sent",
    timestamp: meetingTime(0, 24),
    segmentDurationSeconds: 53,
  },
  {
    id: "BEV-7043",
    meetingId: "MTG-4821",
    participantId: "PAR-1005",
    biasType: "Groupthink",
    transcriptExcerpt:
      "I think we all feel the same way — no one has raised objections, so let's just lock it in.",
    stage1Score: 0.65,
    stage2Score: 0.72,
    confidenceScore: 0.72,
    severity: "medium",
    action: "logged-for-report",
    timestamp: meetingTime(0, 38),
    segmentDurationSeconds: 41,
  },
  {
    id: "BEV-7044",
    meetingId: "MTG-4821",
    participantId: "PAR-1001",
    biasType: "Authority Bias",
    transcriptExcerpt:
      "The CEO mentioned in an all-hands that velocity should be the north star metric, so that settles it.",
    stage1Score: 0.59,
    stage2Score: 0.68,
    confidenceScore: 0.68,
    severity: "medium",
    action: "logged-for-report",
    timestamp: meetingTime(0, 47),
    segmentDurationSeconds: 38,
  },
  {
    id: "BEV-7045",
    meetingId: "MTG-4821",
    participantId: "PAR-1003",
    biasType: "Overconfidence Bias",
    transcriptExcerpt:
      "We will definitely close Nexora within two weeks — I'm certain of it.",
    stage1Score: 0.82,
    stage2Score: null, // Stage 2 timed out
    confidenceScore: 0.82,
    severity: "high",
    action: "unresolved",
    timestamp: meetingTime(0, 54),
    segmentDurationSeconds: 29,
    stage2TimedOut: true,
  },
  {
    id: "BEV-7046",
    meetingId: "MTG-4821",
    participantId: "PAR-1007",
    biasType: "Planning Fallacy",
    transcriptExcerpt:
      "The migration will take two weeks max — we've done similar things before and it always lands on time.",
    stage1Score: 0.76,
    stage2Score: 0.81,
    confidenceScore: 0.81,
    severity: "high",
    action: "nudge-sent",
    timestamp: meetingTime(1, 3),
    segmentDurationSeconds: 55,
  },
  {
    id: "BEV-7047",
    meetingId: "MTG-4821",
    participantId: "PAR-1002",
    biasType: "Sunk Cost Fallacy",
    transcriptExcerpt:
      "We've already invested eight months in this approach — it makes no sense to change direction now.",
    stage1Score: 0.73,
    stage2Score: 0.77,
    confidenceScore: 0.77,
    severity: "medium",
    action: "suppressed", // nudge quota reached for PAR-1002
    timestamp: meetingTime(1, 14),
    segmentDurationSeconds: 62,
  },

  // MTG-4817 (Sprint Retrospective)
  {
    id: "BEV-7029",
    meetingId: "MTG-4817",
    participantId: "PAR-1002",
    biasType: "Recency Bias",
    transcriptExcerpt:
      "The last deployment went badly — that's all anyone is talking about. But we've shipped 14 clean releases before that.",
    stage1Score: 0.67,
    stage2Score: 0.73,
    confidenceScore: 0.73,
    severity: "medium",
    action: "logged-for-report",
    timestamp: daysAgo(2, 14, 18),
    segmentDurationSeconds: 58,
  },
  {
    id: "BEV-7030",
    meetingId: "MTG-4817",
    participantId: "PAR-1006",
    biasType: "Framing Effect",
    transcriptExcerpt:
      "If I say we failed on 3 out of 18 acceptance criteria, versus we passed 83% of them — it changes how everyone feels about the sprint.",
    stage1Score: 0.55,
    stage2Score: 0.61,
    confidenceScore: 0.61,
    severity: "low",
    action: "logged-for-report",
    timestamp: daysAgo(2, 14, 29),
    segmentDurationSeconds: 72,
  },
  {
    id: "BEV-7031",
    meetingId: "MTG-4817",
    participantId: "PAR-1002",
    biasType: "Status Quo Bias",
    transcriptExcerpt:
      "We've always done retrospectives this way — why would we change the format now?",
    stage1Score: 0.60,
    stage2Score: 0.66,
    confidenceScore: 0.66,
    severity: "medium",
    action: "nudge-sent",
    timestamp: daysAgo(2, 14, 41),
    segmentDurationSeconds: 33,
  },
  {
    id: "BEV-7032",
    meetingId: "MTG-4817",
    participantId: "PAR-1007",
    biasType: "Availability Heuristic",
    transcriptExcerpt:
      "The Nexora outage is the first thing that comes to mind, so I'm probably overestimating the risk of similar incidents.",
    stage1Score: 0.52,
    stage2Score: 0.59,
    confidenceScore: 0.59,
    severity: "low",
    action: "logged-for-report",
    timestamp: daysAgo(2, 14, 52),
    segmentDurationSeconds: 44,
  },

  // MTG-4812 (Negotiation — Helix Analytics)
  {
    id: "BEV-7018",
    meetingId: "MTG-4812",
    participantId: "PAR-1003",
    biasType: "Anchoring Bias",
    transcriptExcerpt:
      "Their opening number was $480K — even if we push back, that number will influence every counter we make.",
    stage1Score: 0.84,
    stage2Score: 0.91,
    confidenceScore: 0.91,
    severity: "critical",
    action: "nudge-sent",
    timestamp: daysAgo(4, 11, 48),
    segmentDurationSeconds: 50,
  },
  {
    id: "BEV-7019",
    meetingId: "MTG-4812",
    participantId: "PAR-1008",
    biasType: "Bandwagon Effect",
    transcriptExcerpt:
      "All our competitors are bundling analytics with services contracts now — we should do the same.",
    stage1Score: 0.63,
    stage2Score: 0.70,
    confidenceScore: 0.70,
    severity: "medium",
    action: "nudge-sent",
    timestamp: daysAgo(4, 12, 4),
    segmentDurationSeconds: 39,
  },
  {
    id: "BEV-7020",
    meetingId: "MTG-4812",
    participantId: "PAR-1003",
    biasType: "Overconfidence Bias",
    transcriptExcerpt:
      "I know we'll get them to sign before end-of-month. I've read this client completely.",
    stage1Score: 0.77,
    stage2Score: 0.88,
    confidenceScore: 0.88,
    severity: "high",
    action: "nudge-sent",
    timestamp: daysAgo(4, 12, 17),
    segmentDurationSeconds: 31,
  },
  {
    id: "BEV-7021",
    meetingId: "MTG-4812",
    participantId: "PAR-1005",
    biasType: "Sunk Cost Fallacy",
    transcriptExcerpt:
      "We've spent three months in this negotiation — we can't walk away now even if the terms don't work for us.",
    stage1Score: 0.80,
    stage2Score: 0.86,
    confidenceScore: 0.86,
    severity: "high",
    action: "nudge-sent",
    timestamp: daysAgo(4, 12, 33),
    segmentDurationSeconds: 68,
  },
  {
    id: "BEV-7022",
    meetingId: "MTG-4812",
    participantId: "PAR-1008",
    biasType: "Planning Fallacy",
    transcriptExcerpt:
      "Onboarding them will take two weeks — we always underestimate but this one will be smooth.",
    stage1Score: 0.69,
    stage2Score: 0.75,
    confidenceScore: 0.75,
    severity: "medium",
    action: "suppressed", // speaker was still mid-utterance
    timestamp: daysAgo(4, 12, 44),
    segmentDurationSeconds: 47,
  },

  // MTG-4809 (Board Review)
  {
    id: "BEV-7004",
    meetingId: "MTG-4809",
    participantId: "PAR-1004",
    biasType: "Availability Heuristic",
    transcriptExcerpt:
      "The most recent churn spike is the most vivid data point in my memory — I'm probably overweighting it.",
    stage1Score: 0.57,
    stage2Score: 0.63,
    confidenceScore: 0.63,
    severity: "low",
    action: "logged-for-report",
    timestamp: daysAgo(7, 10, 22),
    segmentDurationSeconds: 56,
  },
  {
    id: "BEV-7005",
    meetingId: "MTG-4809",
    participantId: "PAR-1001",
    biasType: "Framing Effect",
    transcriptExcerpt:
      "If we frame it as 'we missed target by 4%' versus 'we achieved 96% of plan', the board reaction will be completely different.",
    stage1Score: 0.72,
    stage2Score: 0.79,
    confidenceScore: 0.79,
    severity: "high",
    action: "nudge-sent",
    timestamp: daysAgo(7, 10, 41),
    segmentDurationSeconds: 63,
  },
  {
    id: "BEV-7006",
    meetingId: "MTG-4809",
    participantId: "PAR-1003",
    biasType: "Confirmation Bias",
    transcriptExcerpt:
      "I already knew Q1 would be our strongest quarter — all the data I've been tracking confirms this.",
    stage1Score: 0.74,
    stage2Score: 0.82,
    confidenceScore: 0.82,
    severity: "high",
    action: "nudge-sent",
    timestamp: daysAgo(7, 11, 3),
    segmentDurationSeconds: 49,
  },
];

// ─── Nudges ────────────────────────────────────────────────────────────────────

export const nudges: Nudge[] = [
  {
    id: "NDG-3201",
    meetingId: "MTG-4821",
    biasEventId: "BEV-7041",
    participantId: "PAR-1003",
    nudgeText:
      "Consider exploring other budget baselines before anchoring to the $2M figure. What does bottom-up estimation suggest?",
    deliveryLatencyMs: 312,
    status: "delivered",
    timestamp: meetingTime(0, 12),
  },
  {
    id: "NDG-3202",
    meetingId: "MTG-4821",
    biasEventId: "BEV-7042",
    participantId: "PAR-1002",
    nudgeText:
      "Consider inviting input from engineers who haven't been consulted yet — broader sampling reduces confirmation bias.",
    deliveryLatencyMs: 487,
    status: "delivered",
    timestamp: meetingTime(0, 24),
  },
  {
    id: "NDG-3203",
    meetingId: "MTG-4821",
    biasEventId: "BEV-7046",
    participantId: "PAR-1007",
    nudgeText:
      "Reference class forecasting: past similar migrations averaged 3.4x the initial estimate. Consider building buffer.",
    deliveryLatencyMs: 391,
    status: "delivered",
    timestamp: meetingTime(1, 3),
  },
  {
    id: "NDG-3204",
    meetingId: "MTG-4821",
    biasEventId: "BEV-7047",
    participantId: "PAR-1002",
    nudgeText:
      "Consider whether the decision would change if no time had been invested yet.",
    deliveryLatencyMs: 544,
    status: "suppressed",
    suppressionReason: "Nudge quota reached — max 2 nudges per participant per session",
    timestamp: meetingTime(1, 14),
  },
  {
    id: "NDG-3191",
    meetingId: "MTG-4817",
    biasEventId: "BEV-7031",
    participantId: "PAR-1002",
    nudgeText:
      "What specific outcomes would a different retrospective format improve? Evidence-based format changes often outperform habit-based ones.",
    deliveryLatencyMs: 628,
    status: "delivered",
    timestamp: daysAgo(2, 14, 41),
  },
  {
    id: "NDG-3181",
    meetingId: "MTG-4812",
    biasEventId: "BEV-7018",
    participantId: "PAR-1003",
    nudgeText:
      "Establish your own anchor before engaging. What is your walk-away number, independent of their opening offer?",
    deliveryLatencyMs: 274,
    status: "delivered",
    timestamp: daysAgo(4, 11, 48),
  },
  {
    id: "NDG-3182",
    meetingId: "MTG-4812",
    biasEventId: "BEV-7019",
    participantId: "PAR-1008",
    nudgeText:
      "Competitor moves can signal industry direction, but consider whether their strategy is actually generating ROI before following.",
    deliveryLatencyMs: 512,
    status: "delivered",
    timestamp: daysAgo(4, 12, 4),
  },
  {
    id: "NDG-3183",
    meetingId: "MTG-4812",
    biasEventId: "BEV-7020",
    participantId: "PAR-1003",
    nudgeText:
      "Consider what signals you might be discounting. What would change your assessment of this client?",
    deliveryLatencyMs: 356,
    status: "delivered",
    timestamp: daysAgo(4, 12, 17),
  },
  {
    id: "NDG-3184",
    meetingId: "MTG-4812",
    biasEventId: "BEV-7021",
    participantId: "PAR-1005",
    nudgeText:
      "What would you decide if you were evaluating this deal fresh today, with no prior investment?",
    deliveryLatencyMs: 441,
    status: "delivered",
    timestamp: daysAgo(4, 12, 33),
  },
  {
    id: "NDG-3185",
    meetingId: "MTG-4812",
    biasEventId: "BEV-7022",
    participantId: "PAR-1008",
    nudgeText:
      "Consider using past onboarding timelines as a baseline rather than optimistic estimates.",
    deliveryLatencyMs: 389,
    status: "suppressed",
    suppressionReason: "Active speaker turn — nudge delivery withheld to avoid disruption",
    timestamp: daysAgo(4, 12, 44),
  },
  {
    id: "NDG-3172",
    meetingId: "MTG-4809",
    biasEventId: "BEV-7005",
    participantId: "PAR-1001",
    nudgeText:
      "Both framings are accurate — consider presenting both to the board for a complete picture.",
    deliveryLatencyMs: 678,
    status: "delivered",
    timestamp: daysAgo(7, 10, 41),
  },
  {
    id: "NDG-3173",
    meetingId: "MTG-4809",
    biasEventId: "BEV-7006",
    participantId: "PAR-1003",
    nudgeText:
      "Identify one data point that challenges your Q1 thesis before presenting to the board.",
    deliveryLatencyMs: 293,
    status: "delivered",
    timestamp: daysAgo(7, 11, 3),
  },
];

// ─── Flashpoints ───────────────────────────────────────────────────────────────

export const flashpoints: Flashpoint[] = [
  {
    id: "FLP-0891",
    meetingId: "MTG-4821",
    timestamp: meetingTime(1, 7),
    participantIds: ["PAR-1002", "PAR-1006", "PAR-1001"],
    arousalPeak: 0.89,
    valenceDip: -0.61,
    tensionPeak: 0.82,
    description:
      "Sharp disagreement on whether the MindScope branch should merge before the Q2 feature freeze. PAR-1006 raised the 51-commit divergence risk; PAR-1002 pushed for immediate merge.",
    durationSeconds: 94,
  },
  {
    id: "FLP-0887",
    meetingId: "MTG-4817",
    timestamp: daysAgo(2, 14, 35),
    participantIds: ["PAR-1002", "PAR-1006"],
    arousalPeak: 0.78,
    valenceDip: -0.48,
    tensionPeak: 0.71,
    description:
      "Escalating disagreement over root cause of the failed deployment. Both participants spoke simultaneously (overlapping utterances) for 12 seconds.",
    durationSeconds: 67,
  },
  {
    id: "FLP-0888",
    meetingId: "MTG-4817",
    timestamp: daysAgo(2, 14, 58),
    participantIds: ["PAR-1002", "PAR-1007"],
    arousalPeak: 0.83,
    valenceDip: -0.55,
    tensionPeak: 0.76,
    description:
      "Disagreement on sprint scope accountability — PAR-1007 challenged capacity estimates provided by PAR-1002.",
    durationSeconds: 52,
  },
  {
    id: "FLP-0879",
    meetingId: "MTG-4812",
    timestamp: daysAgo(4, 12, 21),
    participantIds: ["PAR-1003", "PAR-1005", "PAR-1008"],
    arousalPeak: 0.91,
    valenceDip: -0.72,
    tensionPeak: 0.87,
    description:
      "Contract terms dispute reached peak tension — PAR-1003's overconfidence nudge had just been delivered. All three participants showed simultaneous arousal spike.",
    durationSeconds: 118,
  },
  {
    id: "FLP-0880",
    meetingId: "MTG-4812",
    timestamp: daysAgo(4, 12, 49),
    participantIds: ["PAR-1003", "PAR-1008"],
    arousalPeak: 0.85,
    valenceDip: -0.65,
    tensionPeak: 0.79,
    description:
      "Post-negotiation debrief tension spike — disagreement on whether to accept Helix's revised terms or continue negotiating.",
    durationSeconds: 83,
  },
  {
    id: "FLP-0881",
    meetingId: "MTG-4812",
    timestamp: daysAgo(4, 13, 8),
    participantIds: ["PAR-1003"],
    arousalPeak: 0.94,
    valenceDip: -0.78,
    tensionPeak: 0.88,
    description:
      "Maximum arousal event — PAR-1003 received word that Helix's legal team was requesting an NDA review before proceeding. Single-participant peak, classified as high-stress solo signal.",
    durationSeconds: 41,
  },
];

// ─── Post-Meeting Reports ──────────────────────────────────────────────────────

export const reports: Report[] = [
  {
    id: "RPT-6041",
    meetingId: "MTG-4817",
    status: "exported",
    format: "pdf",
    generatedAt: daysAgo(2, 15, 12),
    fileSizeKb: 284,
    biasCount: 9,
    nudgeCount: 4,
    flashpointCount: 2,
  },
  {
    id: "RPT-6042",
    meetingId: "MTG-4817",
    status: "ready",
    format: "csv",
    generatedAt: daysAgo(2, 15, 14),
    fileSizeKb: 47,
    biasCount: 9,
    nudgeCount: 4,
    flashpointCount: 2,
  },
  {
    id: "RPT-6038",
    meetingId: "MTG-4812",
    status: "exported",
    format: "pdf",
    generatedAt: daysAgo(4, 13, 42),
    fileSizeKb: 391,
    biasCount: 12,
    nudgeCount: 5,
    flashpointCount: 3,
  },
  {
    id: "RPT-6039",
    meetingId: "MTG-4812",
    status: "ready",
    format: "json",
    generatedAt: daysAgo(4, 13, 43),
    fileSizeKb: 28,
    biasCount: 12,
    nudgeCount: 5,
    flashpointCount: 3,
  },
  {
    id: "RPT-6027",
    meetingId: "MTG-4809",
    status: "exported",
    format: "pdf",
    generatedAt: daysAgo(7, 11, 52),
    fileSizeKb: 512,
    biasCount: 14,
    nudgeCount: 6,
    flashpointCount: 2,
  },
  {
    id: "RPT-6028",
    meetingId: "MTG-4809",
    status: "failed",
    format: "csv",
    generatedAt: null,
    fileSizeKb: null,
    biasCount: 14,
    nudgeCount: 6,
    flashpointCount: 2,
    errorMessage: "Export pipeline timeout — transcript segment index corrupted. Retry queued.",
  },
  {
    id: "RPT-6014",
    meetingId: "MTG-4798",
    status: "ready",
    format: "pdf",
    generatedAt: daysAgo(14, 14, 21),
    fileSizeKb: 347,
    biasCount: 8,
    nudgeCount: 3,
    flashpointCount: 1,
  },
  {
    id: "RPT-6002",
    meetingId: "MTG-4776",
    status: "exported",
    format: "pdf",
    generatedAt: daysAgo(28, 11, 8),
    fileSizeKb: 428,
    biasCount: 11,
    nudgeCount: 4,
    flashpointCount: 2,
  },
];

// ─── Signal Timeline data (featured meeting: MTG-4821 in-progress) ─────────────

export const signalTimeline: SignalDataPoint[] = [
  // 0:00 — meeting opens
  { timeOffset: "00:00", elapsedSeconds: 0,   participantId: "PAR-1001", arousal: 0.38, valence: 0.22,  tension: 0.14 },
  { timeOffset: "00:00", elapsedSeconds: 0,   participantId: "PAR-1002", arousal: 0.41, valence: 0.09,  tension: 0.18 },
  { timeOffset: "00:00", elapsedSeconds: 0,   participantId: "PAR-1003", arousal: 0.55, valence: 0.41,  tension: 0.21 },
  // 5:00
  { timeOffset: "05:00", elapsedSeconds: 300,  participantId: "PAR-1001", arousal: 0.45, valence: 0.31,  tension: 0.19 },
  { timeOffset: "05:00", elapsedSeconds: 300,  participantId: "PAR-1002", arousal: 0.52, valence: 0.04,  tension: 0.27 },
  { timeOffset: "05:00", elapsedSeconds: 300,  participantId: "PAR-1003", arousal: 0.68, valence: 0.49,  tension: 0.24 },
  // 10:00 — Anchoring Bias detected (BEV-7041)
  { timeOffset: "10:00", elapsedSeconds: 600,  participantId: "PAR-1001", arousal: 0.49, valence: 0.17,  tension: 0.25 },
  { timeOffset: "10:00", elapsedSeconds: 600,  participantId: "PAR-1002", arousal: 0.58, valence: -0.06, tension: 0.31 },
  { timeOffset: "10:00", elapsedSeconds: 600,  participantId: "PAR-1003", arousal: 0.77, valence: 0.54,  tension: 0.29 },
  // 15:00
  { timeOffset: "15:00", elapsedSeconds: 900,  participantId: "PAR-1001", arousal: 0.53, valence: 0.20,  tension: 0.28 },
  { timeOffset: "15:00", elapsedSeconds: 900,  participantId: "PAR-1002", arousal: 0.63, valence: -0.14, tension: 0.38 },
  { timeOffset: "15:00", elapsedSeconds: 900,  participantId: "PAR-1003", arousal: 0.72, valence: 0.46,  tension: 0.31 },
  // 20:00 — Confirmation Bias detected (BEV-7042)
  { timeOffset: "20:00", elapsedSeconds: 1200, participantId: "PAR-1001", arousal: 0.56, valence: 0.12,  tension: 0.33 },
  { timeOffset: "20:00", elapsedSeconds: 1200, participantId: "PAR-1002", arousal: 0.71, valence: -0.19, tension: 0.47 },
  { timeOffset: "20:00", elapsedSeconds: 1200, participantId: "PAR-1003", arousal: 0.69, valence: 0.38,  tension: 0.34 },
  // 25:00
  { timeOffset: "25:00", elapsedSeconds: 1500, participantId: "PAR-1001", arousal: 0.51, valence: 0.18,  tension: 0.29 },
  { timeOffset: "25:00", elapsedSeconds: 1500, participantId: "PAR-1002", arousal: 0.66, valence: -0.12, tension: 0.43 },
  { timeOffset: "25:00", elapsedSeconds: 1500, participantId: "PAR-1003", arousal: 0.64, valence: 0.42,  tension: 0.30 },
  // 35:00
  { timeOffset: "35:00", elapsedSeconds: 2100, participantId: "PAR-1001", arousal: 0.55, valence: 0.14,  tension: 0.32 },
  { timeOffset: "35:00", elapsedSeconds: 2100, participantId: "PAR-1002", arousal: 0.69, valence: -0.21, tension: 0.49 },
  { timeOffset: "35:00", elapsedSeconds: 2100, participantId: "PAR-1003", arousal: 0.75, valence: 0.51,  tension: 0.36 },
  // 45:00
  { timeOffset: "45:00", elapsedSeconds: 2700, participantId: "PAR-1001", arousal: 0.58, valence: 0.10,  tension: 0.36 },
  { timeOffset: "45:00", elapsedSeconds: 2700, participantId: "PAR-1002", arousal: 0.72, valence: -0.26, tension: 0.54 },
  { timeOffset: "45:00", elapsedSeconds: 2700, participantId: "PAR-1003", arousal: 0.81, valence: 0.47,  tension: 0.38 },
  // 60:00 — Sunk Cost Fallacy + Planning Fallacy detected; approaching flashpoint
  { timeOffset: "60:00", elapsedSeconds: 3600, participantId: "PAR-1001", arousal: 0.67, valence: -0.08, tension: 0.52 },
  { timeOffset: "60:00", elapsedSeconds: 3600, participantId: "PAR-1002", arousal: 0.84, valence: -0.44, tension: 0.74 },
  { timeOffset: "60:00", elapsedSeconds: 3600, participantId: "PAR-1003", arousal: 0.77, valence: 0.28,  tension: 0.46 },
  // 67:00 — Flashpoint FLP-0891 peak
  { timeOffset: "67:00", elapsedSeconds: 4020, participantId: "PAR-1001", arousal: 0.74, valence: -0.29, tension: 0.67 },
  { timeOffset: "67:00", elapsedSeconds: 4020, participantId: "PAR-1002", arousal: 0.89, valence: -0.61, tension: 0.82 },
  { timeOffset: "67:00", elapsedSeconds: 4020, participantId: "PAR-1003", arousal: 0.71, valence: 0.17,  tension: 0.53 },
  // 75:00 — post-flashpoint cool-down
  { timeOffset: "75:00", elapsedSeconds: 4500, participantId: "PAR-1001", arousal: 0.61, valence: 0.22,  tension: 0.42 },
  { timeOffset: "75:00", elapsedSeconds: 4500, participantId: "PAR-1002", arousal: 0.74, valence: -0.18, tension: 0.56 },
  { timeOffset: "75:00", elapsedSeconds: 4500, participantId: "PAR-1003", arousal: 0.68, valence: 0.33,  tension: 0.38 },
];

export const biasMarkers: BiasMarker[] = [
  { elapsedSeconds: 720,  biasEventId: "BEV-7041", biasType: "Anchoring Bias",     participantId: "PAR-1003", severity: "high" },
  { elapsedSeconds: 1440, biasEventId: "BEV-7042", biasType: "Confirmation Bias",  participantId: "PAR-1002", severity: "high" },
  { elapsedSeconds: 2280, biasEventId: "BEV-7043", biasType: "Groupthink",          participantId: "PAR-1005", severity: "medium" },
  { elapsedSeconds: 2820, biasEventId: "BEV-7044", biasType: "Authority Bias",      participantId: "PAR-1001", severity: "medium" },
  { elapsedSeconds: 3240, biasEventId: "BEV-7045", biasType: "Overconfidence Bias", participantId: "PAR-1003", severity: "high" },
  { elapsedSeconds: 3780, biasEventId: "BEV-7046", biasType: "Planning Fallacy",    participantId: "PAR-1007", severity: "high" },
  { elapsedSeconds: 4440, biasEventId: "BEV-7047", biasType: "Sunk Cost Fallacy",   participantId: "PAR-1002", severity: "medium" },
];

// ─── Dashboard Stats ───────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  activeBiasesFlagged: 7,
  biasesChange: 16.7,          // +16.7% vs previous session
  nudgesSent: 3,
  nudgesChange: -25.0,          // fewer nudges than last session (suppression working)
  avgConfidenceScore: 0.784,
  confidenceChange: 4.3,        // Stage 2 accuracy improving
  flashpointsDetected: 1,
  flashpointsChange: -50.0,     // down from 2 last session
  activeParticipants: 5,
};

// ─── Chart: Bias frequency by type (all meetings, last 30 days) ───────────────

export const biasFrequency: BiasFrequencyBar[] = [
  { biasType: "Anchoring Bias",     count: 8,  percentage: 17.4 },
  { biasType: "Confirmation Bias",  count: 7,  percentage: 15.2 },
  { biasType: "Overconfidence Bias",count: 6,  percentage: 13.0 },
  { biasType: "Planning Fallacy",   count: 6,  percentage: 13.0 },
  { biasType: "Sunk Cost Fallacy",  count: 5,  percentage: 10.9 },
  { biasType: "Groupthink",         count: 4,  percentage: 8.7  },
  { biasType: "Framing Effect",     count: 3,  percentage: 6.5  },
  { biasType: "Authority Bias",     count: 3,  percentage: 6.5  },
  { biasType: "Bandwagon Effect",   count: 2,  percentage: 4.3  },
  { biasType: "Status Quo Bias",    count: 1,  percentage: 2.2  },
  { biasType: "Recency Bias",       count: 1,  percentage: 2.2  },
  { biasType: "Availability Heuristic", count: 0, percentage: 0 },
];

// ─── Chart: Meeting activity over past 8 weeks ────────────────────────────────

export const meetingActivity: MeetingActivityPoint[] = [
  { week: "Dec 29",  meetings: 3, biasesDetected: 21, nudgesSent: 8  },
  { week: "Jan 5",   meetings: 4, biasesDetected: 34, nudgesSent: 11 },
  { week: "Jan 12",  meetings: 2, biasesDetected: 14, nudgesSent: 4  },
  { week: "Jan 19",  meetings: 5, biasesDetected: 47, nudgesSent: 18 },
  { week: "Jan 26",  meetings: 4, biasesDetected: 38, nudgesSent: 13 },
  { week: "Feb 2",   meetings: 6, biasesDetected: 52, nudgesSent: 19 },
  { week: "Feb 9",   meetings: 3, biasesDetected: 29, nudgesSent: 9  },
  { week: "Feb 16",  meetings: 4, biasesDetected: 41, nudgesSent: 15 },
];

// ─── Chart: Stage 2 confidence score distribution ────────────────────────────

export const confidenceDistribution: ConfidenceDistributionPoint[] = [
  { range: "0.55–0.60", count: 4  },
  { range: "0.60–0.65", count: 7  },
  { range: "0.65–0.70", count: 11 },
  { range: "0.70–0.75", count: 14 },
  { range: "0.75–0.80", count: 9  },
  { range: "0.80–0.85", count: 6  },
  { range: "0.85–0.90", count: 4  },
  { range: "0.90–0.95", count: 2  },
];

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export const getParticipantById = (id: string) =>
  participants.find((p) => p.id === id);

export const getMeetingById = (id: string) =>
  meetings.find((m) => m.id === id);

export const getBiasEventById = (id: string) =>
  biasEvents.find((e) => e.id === id);

export const getBiasEventsByMeeting = (meetingId: string) =>
  biasEvents.filter((e) => e.meetingId === meetingId);

export const getNudgesByMeeting = (meetingId: string) =>
  nudges.filter((n) => n.meetingId === meetingId);

export const getFlashpointsByMeeting = (meetingId: string) =>
  flashpoints.filter((f) => f.meetingId === meetingId);

export const getReportsByMeeting = (meetingId: string) =>
  reports.filter((r) => r.meetingId === meetingId);

export const getSignalsByParticipant = (participantId: string) =>
  signalTimeline.filter((s) => s.participantId === participantId);

// ─── Constants ─────────────────────────────────────────────────────────────────

export const ALL_BIAS_TYPES = [
  "Anchoring Bias",
  "Confirmation Bias",
  "Groupthink",
  "Availability Heuristic",
  "Sunk Cost Fallacy",
  "Authority Bias",
  "Recency Bias",
  "Bandwagon Effect",
  "Status Quo Bias",
  "Framing Effect",
  "Overconfidence Bias",
  "Planning Fallacy",
] as const;

export const SEVERITY_COLORS: Record<string, string> = {
  low:      "bg-[color:var(--success)]/15 text-[color:var(--success)]",
  medium:   "bg-[color:var(--warning)]/15 text-[color:var(--warning)]",
  high:     "bg-destructive/15 text-destructive",
  critical: "bg-destructive/20 text-destructive font-semibold",
};

export const ACTION_LABELS: Record<string, string> = {
  "nudge-sent":       "Nudge Sent",
  "logged-for-report":"Logged for Report",
  "suppressed":       "Suppressed",
  "unresolved":       "Unresolved",
};
