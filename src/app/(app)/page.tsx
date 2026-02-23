"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  Bell,
  Zap,
  Target,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  participants,
  biasEvents,
  dashboardStats,
  biasFrequency,
  meetingActivity,
  getParticipantById,
  SEVERITY_COLORS,
  ACTION_LABELS,
} from "@/data/mock-data";
import type { Participant } from "@/lib/types";

// ─── Live indicator ────────────────────────────────────────────────────────────

function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]" />
      </span>
      <span className="text-xs font-medium text-[var(--success)]">Live</span>
    </span>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: <span className="font-medium text-foreground">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Participant signal bar ────────────────────────────────────────────────────

function SignalBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const pct = Math.round(Math.abs(value) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums w-8 text-right text-muted-foreground">
        {value >= 0 ? value.toFixed(2) : value.toFixed(2)}
      </span>
    </div>
  );
}

// ─── Participant card ──────────────────────────────────────────────────────────

function ParticipantCard({ p }: { p: Participant }) {
  const tensionLevel =
    p.currentTension > 0.6
      ? "high"
      : p.currentTension > 0.35
      ? "medium"
      : "low";
  const tensionColor =
    tensionLevel === "high"
      ? "var(--destructive)"
      : tensionLevel === "medium"
      ? "var(--warning)"
      : "var(--success)";

  return (
    <div className="linear-card p-4 transition-all duration-150 hover:border-primary/30 hover:shadow-[0_2px_8px_0_rgb(0_0_0/0.05)]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {p.initials}
          </div>
          <div>
            <p className="text-sm font-medium leading-none">{p.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{p.title}</p>
          </div>
        </div>
        <Badge
          className="rounded-full text-xs capitalize shrink-0"
          style={{
            backgroundColor:
              p.role === "facilitator"
                ? "color-mix(in oklch, var(--primary) 15%, transparent)"
                : p.role === "observer"
                ? "color-mix(in oklch, var(--muted-foreground) 15%, transparent)"
                : "color-mix(in oklch, var(--success) 10%, transparent)",
            color:
              p.role === "facilitator"
                ? "var(--primary)"
                : p.role === "observer"
                ? "var(--muted-foreground)"
                : "var(--success)",
          }}
        >
          {p.role}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <SignalBar
          label="Arousal"
          value={p.currentArousal}
          color="var(--chart-1)"
        />
        <SignalBar
          label="Valence"
          value={p.currentValence}
          color={p.currentValence >= 0 ? "var(--success)" : "var(--destructive)"}
        />
        <SignalBar
          label="Tension"
          value={p.currentTension}
          color={tensionColor}
        />
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

type TabKey = "overview" | "participants" | "alerts";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Live meeting bias events (MTG-4821)
  const liveBiasEvents = biasEvents
    .filter((e) => e.meetingId === "MTG-4821")
    .slice(0, 9);

  // Bar chart data — top 8 bias types only (truncate labels for readability)
  const topBiasFreq = biasFrequency
    .filter((b) => b.count > 0)
    .slice(0, 8)
    .map((b) => ({
      ...b,
      shortType: b.biasType.replace(" Bias", "").replace(" Fallacy", " Fall.").replace("Availability Heuristic", "Availability"),
    }));

  const stats = [
    {
      title: "Active Biases Flagged",
      value: dashboardStats.activeBiasesFlagged.toString(),
      description: `${dashboardStats.biasesChange > 0 ? "+" : ""}${dashboardStats.biasesChange}% vs last session`,
      icon: AlertTriangle,
      trend: dashboardStats.biasesChange,
    },
    {
      title: "Nudges Sent",
      value: dashboardStats.nudgesSent.toString(),
      description: `${dashboardStats.nudgesChange > 0 ? "+" : ""}${dashboardStats.nudgesChange}% vs last session`,
      icon: Bell,
      trend: dashboardStats.nudgesChange,
    },
    {
      title: "Avg. Confidence Score",
      value: (dashboardStats.avgConfidenceScore * 100).toFixed(1) + "%",
      description: `${dashboardStats.confidenceChange > 0 ? "+" : ""}${dashboardStats.confidenceChange}pp Stage 2 accuracy`,
      icon: Target,
      trend: dashboardStats.confidenceChange,
    },
    {
      title: "Flashpoints Detected",
      value: dashboardStats.flashpointsDetected.toString(),
      description: `${dashboardStats.flashpointsChange > 0 ? "+" : ""}${dashboardStats.flashpointsChange}% vs last session`,
      icon: Zap,
      trend: dashboardStats.flashpointsChange,
    },
  ];

  const tabs: { key: TabKey; label: string; icon: typeof Activity }[] = [
    { key: "overview", label: "Overview", icon: Activity },
    { key: "participants", label: "Participants", icon: Users },
    { key: "alerts", label: "Recent Alerts", icon: AlertTriangle },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Live Meeting</h1>
            <LiveIndicator />
          </div>
          <p className="text-sm text-muted-foreground">
            Q2 Roadmap Prioritization &mdash; Session: 75 min &bull; 5 participants active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-mono tabular-nums text-muted-foreground bg-muted px-2.5 py-1.5 rounded-lg border border-border/60">
            MTG-4821
          </div>
          <Badge
            className="rounded-full text-xs"
            style={{
              backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)",
              color: "var(--success)",
            }}
          >
            In Progress
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg animate-fade-in transition-all duration-150 hover:border-primary/30 hover:shadow-[0_2px_8px_0_rgb(0_0_0/0.05)]"
            style={{ animationDelay: `${index * 80}ms`, animationDuration: "200ms" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary/70 shrink-0" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend > 0 ? (
                  <TrendingUp className="w-3 h-3 text-destructive" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-[var(--success)]" />
                )}
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 border-b border-border/60">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-100 -mb-px ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Bias Frequency Bar Chart */}
          <Card className="linear-card p-0 lg:col-span-3">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-base font-semibold">Bias Frequency — Last 30 Days</CardTitle>
              <p className="text-xs text-muted-foreground">Detected events by cognitive bias type across all meetings</p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={topBiasFreq} margin={{ left: 0, right: 16 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    strokeOpacity={0.5}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="shortType"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={48}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(from var(--primary) l c h / 0.04)" }} />
                  <Bar
                    dataKey="count"
                    name="Events"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Meeting Activity Line Chart */}
          <Card className="linear-card p-0 lg:col-span-2">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-base font-semibold">Weekly Activity</CardTitle>
              <p className="text-xs text-muted-foreground">Meetings, biases detected, nudges sent</p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={meetingActivity} margin={{ left: 0, right: 16 }}>
                  <defs>
                    <linearGradient id="fillBiases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    strokeOpacity={0.5}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                    iconType="circle"
                    iconSize={6}
                  />
                  <Line
                    type="monotone"
                    dataKey="biasesDetected"
                    name="Biases"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nudgesSent"
                    name="Nudges"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                    strokeDasharray="4 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="meetings"
                    name="Meetings"
                    stroke="var(--chart-5)"
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 3 }}
                    strokeDasharray="2 3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Participants Tab */}
      {activeTab === "participants" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Live prosody signals — arousal, valence, and tension for each participant
            </p>
            <Badge
              className="rounded-full text-xs"
              style={{
                backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
                color: "var(--primary)",
              }}
            >
              {participants.length} participants
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {participants.map((p) => (
              <ParticipantCard key={p.id} p={p} />
            ))}
          </div>

          {/* Signal legend */}
          <Card className="linear-card">
            <CardContent className="py-3 px-4">
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full inline-block" style={{ backgroundColor: "var(--chart-1)" }} />
                  Arousal: 0 (calm) → 1 (high energy)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full inline-block" style={{ backgroundColor: "var(--success)" }} />
                  Valence: −1 (distress) → +1 (enthusiasm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full inline-block" style={{ backgroundColor: "var(--warning)" }} />
                  Tension: 0 (relaxed) → 1 (high stress)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Alerts Tab */}
      {activeTab === "alerts" && (
        <Card className="linear-card">
          <CardHeader className="px-6 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Bias Alert Feed — MTG-4821</CardTitle>
              <Badge
                className="rounded-full text-xs"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)",
                  color: "var(--success)",
                }}
              >
                {liveBiasEvents.length} events
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Real-time bias detection log — Stage 1 screened + Stage 2 adjudicated
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground pl-6">
                    Participant
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Bias Type
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground hidden sm:table-cell">
                    Stage
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right">
                    Confidence
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Severity
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground hidden md:table-cell">
                    Action
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right pr-6 hidden lg:table-cell">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveBiasEvents.map((event) => {
                  const participant = getParticipantById(event.participantId);
                  const stageLabel = event.stage2TimedOut
                    ? "S1 (S2 timeout)"
                    : event.stage2Score !== null
                    ? "S1 + S2"
                    : "S1 only";
                  const timeLabel = new Date(event.timestamp).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit", hour12: false }
                  );

                  return (
                    <TableRow key={event.id} className="table-row-hover">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0"
                            style={{ backgroundColor: "var(--primary)" }}
                          >
                            {participant?.initials ?? "??"}
                          </div>
                          <div>
                            <p className="text-xs font-medium leading-none">
                              {participant?.name ?? event.participantId}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {participant?.title}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium">{event.biasType}</span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="text-xs font-mono text-muted-foreground">
                          {stageLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums font-medium">
                          {(event.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full text-xs capitalize ${SEVERITY_COLORS[event.severity]}`}
                        >
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          className="rounded-full text-xs"
                          style={{
                            backgroundColor:
                              event.action === "nudge-sent"
                                ? "color-mix(in oklch, var(--success) 15%, transparent)"
                                : event.action === "suppressed"
                                ? "color-mix(in oklch, var(--warning) 12%, transparent)"
                                : event.action === "unresolved"
                                ? "color-mix(in oklch, var(--destructive) 12%, transparent)"
                                : "color-mix(in oklch, var(--muted-foreground) 12%, transparent)",
                            color:
                              event.action === "nudge-sent"
                                ? "var(--success)"
                                : event.action === "suppressed"
                                ? "var(--warning)"
                                : event.action === "unresolved"
                                ? "var(--destructive)"
                                : "var(--muted-foreground)",
                          }}
                        >
                          {ACTION_LABELS[event.action]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs tabular-nums text-right text-muted-foreground pr-6 hidden lg:table-cell">
                        {timeLabel}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
