"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  signalTimeline,
  biasMarkers,
  flashpoints,
  participants,
  meetings,
} from "@/data/mock-data";
import type { BiasSeverity } from "@/lib/types";

const PARTICIPANT_COLORS: Record<string, string> = {
  "PAR-1001": "var(--chart-1)",
  "PAR-1002": "var(--chart-2)",
  "PAR-1003": "var(--chart-3)",
  "PAR-1004": "var(--chart-4)",
  "PAR-1005": "var(--chart-5)",
};

type SignalKey = "arousal" | "valence" | "tension";

const SIGNAL_LABELS: Record<SignalKey, string> = {
  arousal: "Arousal",
  valence: "Valence",
  tension: "Tension",
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-2.5 shadow-[0_4px_12px_0_rgb(0_0_0/0.08)] text-xs min-w-[140px]">
      <p className="font-mono font-medium mb-1.5 text-muted-foreground">
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">{p.name}</span>
          <span className="font-mono font-medium tabular-nums">
            {p.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

function SeverityDot({ severity }: { severity: BiasSeverity }) {
  const colors: Record<BiasSeverity, string> = {
    low: "bg-[color:var(--success)]",
    medium: "bg-[color:var(--warning)]",
    high: "bg-destructive",
    critical: "bg-destructive",
  };
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full shrink-0",
        colors[severity]
      )}
    />
  );
}

// Aggregate signal data by time offset, averaging across selected participants
function buildChartData(
  participantIds: string[],
  signal: SignalKey
) {
  // Group by elapsedSeconds
  const byTime: Record<number, number[]> = {};
  for (const dp of signalTimeline) {
    if (!participantIds.includes(dp.participantId)) continue;
    if (!byTime[dp.elapsedSeconds]) byTime[dp.elapsedSeconds] = [];
    byTime[dp.elapsedSeconds].push(dp[signal]);
  }
  return Object.entries(byTime)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([elapsed, vals]) => ({
      elapsed: Number(elapsed),
      label: formatElapsed(Number(elapsed)),
      value: vals.reduce((s, v) => s + v, 0) / vals.length,
    }));
}

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Build multi-series data for all three signals combined
function buildMultiSeriesData(participantIds: string[]) {
  const byTime: Record<
    number,
    { arousal: number[]; valence: number[]; tension: number[] }
  > = {};

  for (const dp of signalTimeline) {
    if (!participantIds.includes(dp.participantId)) continue;
    if (!byTime[dp.elapsedSeconds])
      byTime[dp.elapsedSeconds] = { arousal: [], valence: [], tension: [] };
    byTime[dp.elapsedSeconds].arousal.push(dp.arousal);
    byTime[dp.elapsedSeconds].valence.push(dp.valence);
    byTime[dp.elapsedSeconds].tension.push(dp.tension);
  }

  return Object.entries(byTime)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([elapsed, vals]) => ({
      elapsed: Number(elapsed),
      label: formatElapsed(Number(elapsed)),
      arousal:
        vals.arousal.reduce((s, v) => s + v, 0) / vals.arousal.length,
      valence:
        vals.valence.reduce((s, v) => s + v, 0) / vals.valence.length,
      tension:
        vals.tension.reduce((s, v) => s + v, 0) / vals.tension.length,
    }));
}

// Get meeting participants for the featured meeting (MTG-4821)
const MEETING_ID = "MTG-4821";
const featuredMeeting = meetings.find((m) => m.id === MEETING_ID);
const meetingParticipants = participants.filter((p) =>
  featuredMeeting?.participantIds.includes(p.id)
);

export default function TimelinePage() {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    meetingParticipants.map((p) => p.id)
  );
  const [meetingSelector, setMeetingSelector] = useState(MEETING_ID);

  function toggleParticipant(id: string) {
    setSelectedParticipants((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((p) => p !== id)
          : prev
        : [...prev, id]
    );
  }

  const chartData = useMemo(
    () => buildMultiSeriesData(selectedParticipants),
    [selectedParticipants]
  );

  const flashpointSeconds = useMemo(
    () => flashpoints.filter((f) => f.meetingId === meetingSelector),
    [meetingSelector]
  );

  const markerSeconds = biasMarkers.map((m) => m.elapsedSeconds);

  // Clamp valence to ≥ 0 for area fill (offset for area chart display)
  const displayData = chartData.map((d) => ({
    ...d,
    valenceDisplay: d.valence + 1, // shift -1..1 to 0..2 for area rendering
  }));

  return (
    <div className="space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Signal Timeline</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prosody signals over meeting time — arousal, valence &amp; tension
          </p>
        </div>
        <Select value={meetingSelector} onValueChange={setMeetingSelector}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select meeting" />
          </SelectTrigger>
          <SelectContent>
            {meetings
              .filter((m) => m.status !== "in-progress")
              .concat(meetings.filter((m) => m.status === "in-progress"))
              .map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Participant toggles */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Participants:
        </span>
        {meetingParticipants.map((p) => {
          const active = selectedParticipants.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggleParticipant(p.id)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150",
                active
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-muted text-muted-foreground border-border/60 hover:border-border"
              )}
            >
              {p.initials}
              <span className="hidden sm:inline">{p.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main chart */}
      <Card className="linear-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-sm font-semibold">
              Prosody Signal Overlay — {featuredMeeting?.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[color:var(--chart-1)] inline-block rounded" />
                Arousal
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[color:var(--chart-2)] inline-block rounded" />
                Valence
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[color:var(--chart-3)] inline-block rounded" />
                Tension
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="arousalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                  <linearGradient id="valenceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-2)"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                  <linearGradient id="tensionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.5 0 0 / 0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={2}
                />
                <YAxis
                  domain={[-0.9, 1.0]}
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Flashpoint reference bands — compute elapsed from meeting start */}
                {flashpointSeconds.map((fp) => {
                  const meetingStart = new Date("2026-02-22T09:00:00Z").getTime();
                  const fpTime = new Date(fp.timestamp).getTime();
                  const elapsedSec = Math.round((fpTime - meetingStart) / 1000);
                  return (
                    <ReferenceLine
                      key={fp.id}
                      x={formatElapsed(Math.max(0, elapsedSec))}
                      stroke="var(--destructive)"
                      strokeWidth={2}
                      strokeDasharray="4 2"
                      label={{
                        value: "⚡",
                        position: "top",
                        fontSize: 12,
                      }}
                    />
                  );
                })}

                {/* Bias event markers */}
                {markerSeconds.map((sec) => (
                  <ReferenceLine
                    key={`bias-${sec}`}
                    x={formatElapsed(sec)}
                    stroke="var(--chart-4)"
                    strokeWidth={1}
                    strokeDasharray="2 3"
                    strokeOpacity={0.5}
                  />
                ))}

                <Area
                  type="monotone"
                  dataKey="arousal"
                  name="Arousal"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#arousalGrad)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="valence"
                  name="Valence"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fill="url(#valenceGrad)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="tension"
                  name="Tension"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  fill="url(#tensionGrad)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lower panels: Bias Markers + Flashpoints side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bias event markers */}
        <Card className="linear-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Bias Event Markers
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Detected events plotted on timeline
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {biasMarkers.map((marker, i) => (
              <div
                key={marker.biasEventId}
                className="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                  {formatElapsed(marker.elapsedSeconds)}
                </span>
                <SeverityDot severity={marker.severity} />
                <span className="text-xs font-medium truncate">
                  {marker.biasType}
                </span>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {
                    participants.find((p) => p.id === marker.participantId)
                      ?.initials
                  }
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Flashpoints */}
        <Card className="linear-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Flashpoint Zones
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              High-tension moments — all meetings
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {flashpoints.slice(0, 5).map((fp, i) => (
              <div
                key={fp.id}
                className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {fp.durationSeconds}s
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-destructive">
                    <span>T {fp.tensionPeak.toFixed(2)}</span>
                    <span className="text-muted-foreground">·</span>
                    <span>A {fp.arousalPeak.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {fp.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Signal legend */}
      <div className="flex items-start gap-4 flex-wrap text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 border-b-2 border-dashed border-destructive inline-block" />
          <span>Flashpoint (⚡)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 border-b border-dashed border-[color:var(--chart-4)] inline-block opacity-50" />
          <span>Bias event marker</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono">Valence range: −1.0 (distress) → +1.0 (enthusiasm)</span>
        </div>
      </div>
    </div>
  );
}
