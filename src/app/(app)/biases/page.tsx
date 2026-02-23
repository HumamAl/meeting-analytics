"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  biasEvents,
  participants,
  ACTION_LABELS,
  SEVERITY_COLORS,
} from "@/data/mock-data";
import type { BiasEvent, BiasSeverity, BiasAction } from "@/lib/types";

type SortKey = keyof Pick<
  BiasEvent,
  "biasType" | "confidenceScore" | "severity" | "timestamp" | "action"
>;

function StageBadge({ event }: { event: BiasEvent }) {
  const isStage2 = event.stage2Score !== null && !event.stage2TimedOut;
  const timedOut = event.stage2TimedOut;
  if (timedOut) {
    return (
      <Badge
        variant="outline"
        className="text-xs border-0 rounded-full bg-destructive/10 text-destructive"
      >
        Stage 2 Timeout
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-0 rounded-full",
        isStage2
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      )}
    >
      {isStage2 ? "Stage 2" : "Stage 1"}
    </Badge>
  );
}

function SeverityBadge({ severity }: { severity: BiasSeverity }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-0 rounded-full",
        SEVERITY_COLORS[severity]
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}

function ActionBadge({ action }: { action: BiasAction }) {
  const config: Record<BiasAction, string> = {
    "nudge-sent":
      "bg-[color:var(--success)]/10 text-[color:var(--success)]",
    "logged-for-report":
      "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
    suppressed: "bg-muted text-muted-foreground",
    unresolved: "bg-destructive/10 text-destructive",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-xs border-0 rounded-full", config[action])}
    >
      {ACTION_LABELS[action]}
    </Badge>
  );
}

export default function BiasesPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
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
      biasEvents.map((ev) => ({
        ...ev,
        participant: participants.find((p) => p.id === ev.participantId),
      })),
    []
  );

  const filtered = useMemo(() => {
    return enriched
      .filter((ev) => {
        const term = search.toLowerCase();
        const matchesSearch =
          term === "" ||
          (ev.participant?.name ?? "").toLowerCase().includes(term) ||
          ev.biasType.toLowerCase().includes(term);
        const matchesSeverity =
          severityFilter === "all" || ev.severity === severityFilter;
        const matchesAction =
          actionFilter === "all" || ev.action === actionFilter;
        return matchesSearch && matchesSeverity && matchesAction;
      })
      .sort((a, b) => {
        let aVal: string | number = a[sortKey] ?? "";
        let bVal: string | number = b[sortKey] ?? "";
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        return sortDir === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
  }, [enriched, search, severityFilter, actionFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <div className="space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bias Feed</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All detected bias events — Stage 1 screened &amp; Stage 2
            adjudicated
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full text-xs font-mono border-border/60"
          >
            {biasEvents.length} total events
          </Badge>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by participant or bias type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="nudge-sent">Nudge Sent</SelectItem>
            <SelectItem value="logged-for-report">Logged for Report</SelectItem>
            <SelectItem value="suppressed">Suppressed</SelectItem>
            <SelectItem value="unresolved">Unresolved</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="linear-card p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 w-48">
                Participant
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("biasType")}
              >
                <div className="flex items-center gap-1">
                  Bias Type
                  <SortIcon col="biasType" />
                </div>
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none text-right"
                onClick={() => handleSort("confidenceScore")}
              >
                <div className="flex items-center gap-1 justify-end">
                  Confidence
                  <SortIcon col="confidenceScore" />
                </div>
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("severity")}
              >
                <div className="flex items-center gap-1">
                  Severity
                  <SortIcon col="severity" />
                </div>
              </TableHead>
              <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3">
                Stage
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("action")}
              >
                <div className="flex items-center gap-1">
                  Action
                  <SortIcon col="action" />
                </div>
              </TableHead>
              <TableHead
                className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide py-2 px-3 cursor-pointer select-none"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center gap-1">
                  Time
                  <SortIcon col="timestamp" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-muted-foreground/50" />
                    No bias events match the current filters.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((ev) => (
                <TableRow key={ev.id} className="table-row-hover">
                  <TableCell className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {ev.participant?.initials ?? "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium leading-tight">
                          {ev.participant?.name ?? ev.participantId}
                        </div>
                        <div className="text-xs text-muted-foreground leading-tight">
                          {ev.participant?.title ?? ""}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <span className="text-sm font-medium">{ev.biasType}</span>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">
                      &ldquo;{ev.transcriptExcerpt}&rdquo;
                    </p>
                  </TableCell>
                  <TableCell className="py-2 px-3 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-mono text-sm tabular-nums font-medium">
                        {ev.confidenceScore.toFixed(2)}
                      </span>
                      {ev.stage2Score !== null && (
                        <span className="text-xs text-muted-foreground font-mono">
                          S1: {ev.stage1Score.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <SeverityBadge severity={ev.severity} />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <StageBadge event={ev} />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <ActionBadge action={ev.action} />
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatTime(ev.timestamp)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
