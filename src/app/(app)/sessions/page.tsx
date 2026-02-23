"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Radio } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { meetings, participants } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { MeetingStatus, MeetingType, Meeting } from "@/lib/types";

type SortKey = "date" | "biasCount" | "durationMinutes" | "nudgesSent";

const MEETING_TYPE_CONFIG: Record<
  MeetingType,
  { label: string; className: string }
> = {
  "strategy-session": {
    label: "Strategy",
    className: "bg-primary/10 text-primary",
  },
  retrospective: {
    label: "Retro",
    className: "bg-[color:var(--chart-2)]/15 text-[color:var(--chart-2)]",
  },
  negotiation: {
    label: "Negotiation",
    className:
      "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  },
  "board-review": {
    label: "Board Review",
    className: "bg-destructive/10 text-destructive",
  },
  "sales-call": {
    label: "Sales Call",
    className:
      "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  },
  "team-standup": {
    label: "Standup",
    className: "bg-muted text-muted-foreground",
  },
};

function MeetingTypeBadge({ type }: { type: MeetingType }) {
  const c = MEETING_TYPE_CONFIG[type];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs border-0 rounded-full", c.className)}
    >
      {c.label}
    </Badge>
  );
}

function StatusBadge({ status, isLive }: { status: MeetingStatus; isLive?: boolean }) {
  if (isLive) {
    return (
      <Badge
        variant="outline"
        className="text-xs border-0 rounded-full bg-[color:var(--success)]/10 text-[color:var(--success)] flex items-center gap-1"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--success)]" />
        </span>
        Live
      </Badge>
    );
  }
  const config: Record<MeetingStatus, { label: string; className: string }> = {
    "in-progress": {
      label: "In Progress",
      className:
        "bg-[color:var(--success)]/10 text-[color:var(--success)]",
    },
    completed: {
      label: "Completed",
      className: "bg-muted text-muted-foreground",
    },
    "report-ready": {
      label: "Report Ready",
      className: "bg-primary/10 text-primary",
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs border-0 rounded-full", c.className)}
    >
      {c.label}
    </Badge>
  );
}

function formatDuration(minutes: number) {
  if (minutes === 0) return "Live";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function SessionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const enriched = useMemo(
    () =>
      meetings.map((m) => ({
        ...m,
        participantList: participants.filter((p) =>
          m.participantIds.includes(p.id)
        ),
      })),
    []
  );

  const filtered = useMemo(() => {
    return enriched
      .filter((m) => {
        const term = search.toLowerCase();
        const matchesSearch =
          term === "" || m.title.toLowerCase().includes(term);
        const matchesStatus =
          statusFilter === "all" || m.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortKey === "date") {
          aVal = a.date;
          bVal = b.date;
          return sortDir === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        aVal = a[sortKey] as number;
        bVal = b[sortKey] as number;
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      });
  }, [enriched, search, statusFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  // Summary stats
  const liveCount = meetings.filter((m) => m.status === "in-progress").length;
  const totalBiases = meetings.reduce((s, m) => s + m.biasCount, 0);
  const totalNudges = meetings.reduce((s, m) => s + m.nudgesSent, 0);

  return (
    <div className="space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sessions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Meeting session history — search, filter, and sort
          </p>
        </div>
        {liveCount > 0 && (
          <Badge
            variant="outline"
            className="rounded-full flex items-center gap-1.5 border-[color:var(--success)]/40 text-[color:var(--success)] bg-[color:var(--success)]/5 px-3 py-1"
          >
            <Radio className="w-3 h-3" />
            {liveCount} live session{liveCount !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Sessions", value: meetings.length, mono: true },
          { label: "Total Biases Detected", value: totalBiases, mono: true, color: "text-destructive" },
          { label: "Total Nudges Sent", value: totalNudges, mono: true, color: "text-[color:var(--success)]" },
          {
            label: "Report Ready",
            value: meetings.filter((m) => m.status === "report-ready").length,
            mono: true,
            color: "text-primary",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-3"
          >
            <div
              className={cn(
                "font-mono text-2xl font-bold tabular-nums",
                stat.color ?? "text-foreground"
              )}
            >
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by meeting title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="report-ready">Report Ready</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} session{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="linear-card p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3">
                Meeting
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3">
                Type
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  <SortIcon col="date" />
                </div>
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("durationMinutes")}
              >
                <div className="flex items-center gap-1">
                  Duration
                  <SortIcon col="durationMinutes" />
                </div>
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3">
                Participants
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none text-right"
                onClick={() => handleSort("biasCount")}
              >
                <div className="flex items-center gap-1 justify-end">
                  Biases
                  <SortIcon col="biasCount" />
                </div>
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none text-right"
                onClick={() => handleSort("nudgesSent")}
              >
                <div className="flex items-center gap-1 justify-end">
                  Nudges
                  <SortIcon col="nudgesSent" />
                </div>
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 text-right">
                Flashpoints
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No sessions match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((m) => {
                const isLive = m.status === "in-progress";
                return (
                  <TableRow key={m.id} className="table-row-hover">
                    <TableCell className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {isLive && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-medium leading-tight">
                            {m.title}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {m.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <MeetingTypeBadge type={m.type} />
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(m.date)}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <span className="font-mono text-sm tabular-nums">
                        {formatDuration(m.durationMinutes)}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        {m.participantList.slice(0, 3).map((p) => (
                          <span
                            key={p.id}
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            title={p.name}
                          >
                            {p.initials}
                          </span>
                        ))}
                        {m.participantList.length > 3 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            +{m.participantList.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right">
                      <span
                        className={cn(
                          "font-mono text-sm tabular-nums font-medium",
                          m.biasCount >= 10
                            ? "text-destructive"
                            : m.biasCount >= 6
                            ? "text-[color:var(--warning)]"
                            : "text-[color:var(--success)]"
                        )}
                      >
                        {m.biasCount}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right">
                      <span className="font-mono text-sm tabular-nums text-[color:var(--success)]">
                        {m.nudgesSent}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right">
                      <span
                        className={cn(
                          "font-mono text-sm tabular-nums",
                          m.flashpointsDetected > 0
                            ? "text-[color:var(--warning)]"
                            : "text-muted-foreground"
                        )}
                      >
                        {m.flashpointsDetected}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <StatusBadge status={m.status} isLive={isLive} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
