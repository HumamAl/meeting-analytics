import type { LucideIcon } from "lucide-react";

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Enumerations ─────────────────────────────────────────────────────────────

export type BiasType =
  | "Anchoring Bias"
  | "Confirmation Bias"
  | "Groupthink"
  | "Availability Heuristic"
  | "Sunk Cost Fallacy"
  | "Authority Bias"
  | "Recency Bias"
  | "Bandwagon Effect"
  | "Status Quo Bias"
  | "Framing Effect"
  | "Overconfidence Bias"
  | "Planning Fallacy";

export type BiasSeverity = "low" | "medium" | "high" | "critical";

export type BiasAction =
  | "nudge-sent"
  | "logged-for-report"
  | "suppressed"
  | "unresolved";

export type MeetingStatus = "in-progress" | "completed" | "report-ready";

export type MeetingType =
  | "strategy-session"
  | "retrospective"
  | "negotiation"
  | "board-review"
  | "sales-call"
  | "team-standup";

export type NudgeStatus = "delivered" | "suppressed" | "pending";

export type ReportStatus = "generating" | "ready" | "exported" | "failed";

export type ReportFormat = "pdf" | "csv" | "json";

export type BiasStage = "stage-1" | "stage-2";

// ─── Participants ─────────────────────────────────────────────────────────────

export interface Participant {
  id: string;
  name: string;
  role: "facilitator" | "participant" | "observer";
  title: string;
  initials: string;
  /** Current arousal score: 0 (calm) → 1 (high energy) */
  currentArousal: number;
  /** Current valence: -1 (distress) → +1 (enthusiasm) */
  currentValence: number;
  /** Current tension: 0 (relaxed) → 1 (high stress) */
  currentTension: number;
}

// ─── Meetings / Sessions ──────────────────────────────────────────────────────

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  date: string;
  /** Duration in minutes */
  durationMinutes: number;
  participantIds: string[];
  status: MeetingStatus;
  biasCount: number;
  nudgesSent: number;
  flashpointsDetected: number;
}

// ─── Bias Events ──────────────────────────────────────────────────────────────

export interface BiasEvent {
  id: string;
  meetingId: string;
  participantId: string;
  biasType: BiasType;
  /** Verbatim excerpt from transcript that triggered detection */
  transcriptExcerpt: string;
  /** Stage 1 fast-screen score: 0.40–0.85 */
  stage1Score: number;
  /** Stage 2 adjudicated score: 0.55–0.95. Null if Stage 2 timed out. */
  stage2Score: number | null;
  /** Final confidence used for routing decisions */
  confidenceScore: number;
  severity: BiasSeverity;
  action: BiasAction;
  /** ISO timestamp of detection */
  timestamp: string;
  /** Duration of the triggering transcript segment in seconds */
  segmentDurationSeconds: number;
  /**
   * Stage 2 timed out and event could not be fully adjudicated.
   * Action will be "unresolved" when true.
   */
  stage2TimedOut?: boolean;
}

// ─── Nudges ───────────────────────────────────────────────────────────────────

export interface Nudge {
  id: string;
  meetingId: string;
  /** References BiasEvent that triggered this nudge */
  biasEventId: string;
  /** Participant who receives the nudge */
  participantId: string;
  nudgeText: string;
  /** Delivery latency in milliseconds: 200–800ms */
  deliveryLatencyMs: number;
  status: NudgeStatus;
  timestamp: string;
  /** Reason why the nudge was suppressed, if applicable */
  suppressionReason?: string | null;
}

// ─── Flashpoints ──────────────────────────────────────────────────────────────

export interface Flashpoint {
  id: string;
  meetingId: string;
  /** ISO timestamp of peak tension moment */
  timestamp: string;
  /** All participant IDs present during flashpoint window */
  participantIds: string[];
  /** Peak arousal value across all participants at this moment */
  arousalPeak: number;
  /** Minimum valence dip across participants */
  valenceDip: number;
  /** Peak tension value */
  tensionPeak: number;
  description: string;
  /** Duration of the flashpoint window in seconds */
  durationSeconds: number;
}

// ─── Post-Meeting Reports ─────────────────────────────────────────────────────

export interface Report {
  id: string;
  meetingId: string;
  status: ReportStatus;
  format: ReportFormat;
  generatedAt: string | null;
  /** File size in kilobytes. Null if not yet generated. */
  fileSizeKb: number | null;
  biasCount: number;
  nudgeCount: number;
  flashpointCount: number;
  /** Error message if status is "failed" */
  errorMessage?: string | null;
}

// ─── Signal Timeline ──────────────────────────────────────────────────────────

export interface SignalDataPoint {
  /** ISO timestamp or elapsed seconds offset string (e.g., "00:04:30") */
  timeOffset: string;
  /** Seconds elapsed since meeting start */
  elapsedSeconds: number;
  participantId: string;
  arousal: number;
  valence: number;
  tension: number;
}

export interface BiasMarker {
  elapsedSeconds: number;
  biasEventId: string;
  biasType: BiasType;
  participantId: string;
  severity: BiasSeverity;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  /** Bias events flagged in the current active meeting */
  activeBiasesFlagged: number;
  /** Change vs. previous meeting */
  biasesChange: number;
  /** Nudges sent in the current active meeting */
  nudgesSent: number;
  nudgesChange: number;
  /** Average Stage 2 confidence score (0–1) across all events this session */
  avgConfidenceScore: number;
  confidenceChange: number;
  /** High-tension flashpoints detected this session */
  flashpointsDetected: number;
  flashpointsChange: number;
  /** Unique participants active right now */
  activeParticipants: number;
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  target?: number;
}

export interface BiasFrequencyBar {
  biasType: string;
  count: number;
  percentage: number;
}

export interface MeetingActivityPoint {
  week: string;
  meetings: number;
  biasesDetected: number;
  nudgesSent: number;
}

export interface ConfidenceDistributionPoint {
  range: string;
  count: number;
}

// ─── Challenge / Proposal (UI meta-types) ─────────────────────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}
