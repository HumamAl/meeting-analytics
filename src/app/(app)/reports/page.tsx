"use client";

import { useState, useMemo } from "react";
import {
  Download,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle2,
  Share2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { reports, meetings } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { ReportStatus, ReportFormat } from "@/lib/types";

function StatusBadge({ status }: { status: ReportStatus }) {
  const config: Record<
    ReportStatus,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    generating: {
      label: "Generating",
      className:
        "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
      icon: <Clock className="w-3 h-3" />,
    },
    ready: {
      label: "Ready",
      className:
        "bg-[color:var(--success)]/10 text-[color:var(--success)]",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    exported: {
      label: "Exported",
      className: "bg-primary/10 text-primary",
      icon: <Share2 className="w-3 h-3" />,
    },
    failed: {
      label: "Failed",
      className: "bg-destructive/10 text-destructive",
      icon: <AlertCircle className="w-3 h-3" />,
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-0 rounded-full flex items-center gap-1",
        c.className
      )}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

function FormatBadge({ format }: { format: ReportFormat }) {
  const config: Record<ReportFormat, string> = {
    pdf: "bg-destructive/10 text-destructive",
    csv: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
    json: "bg-primary/10 text-primary",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-0 rounded-full font-mono uppercase",
        config[format]
      )}
    >
      {format}
    </Badge>
  );
}

function MetricPill({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number;
  variant?: "bias" | "nudge" | "flash" | "default";
}) {
  const colors = {
    bias: "text-destructive",
    nudge: "text-[color:var(--success)]",
    flash: "text-[color:var(--warning)]",
    default: "text-muted-foreground",
  };
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={cn("font-mono text-sm font-semibold tabular-nums", colors[variant])}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ReportsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  function handleDownload(id: string) {
    setDownloadedIds((prev) => new Set([...prev, id]));
  }

  const enriched = useMemo(
    () =>
      reports.map((r) => ({
        ...r,
        meeting: meetings.find((m) => m.id === r.meetingId),
      })),
    []
  );

  const filtered = useMemo(() => {
    return enriched.filter(
      (r) => statusFilter === "all" || r.status === statusFilter
    );
  }, [enriched, statusFilter]);

  const counts = useMemo(
    () => ({
      generating: reports.filter((r) => r.status === "generating").length,
      ready: reports.filter((r) => r.status === "ready").length,
      exported: reports.filter((r) => r.status === "exported").length,
      failed: reports.filter((r) => r.status === "failed").length,
    }),
    []
  );

  return (
    <div className="space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Post-meeting analysis reports — PDF, CSV, and JSON exports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            New Report
          </Button>
        </div>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Generating",
              count: counts.generating,
              cls: "border-[color:var(--warning)]/30 bg-[color:var(--warning)]/5",
              text: "text-[color:var(--warning)]",
            },
            {
              label: "Ready",
              count: counts.ready,
              cls: "border-[color:var(--success)]/30 bg-[color:var(--success)]/5",
              text: "text-[color:var(--success)]",
            },
            {
              label: "Exported",
              count: counts.exported,
              cls: "border-primary/30 bg-primary/5",
              text: "text-primary",
            },
            {
              label: "Failed",
              count: counts.failed,
              cls: "border-destructive/30 bg-destructive/5",
              text: "text-destructive",
            },
          ] as const
        ).map((item) => (
          <div
            key={item.label}
            className={cn(
              "rounded-lg border p-3 flex items-center justify-between cursor-pointer transition-all duration-150",
              item.cls,
              statusFilter === item.label.toLowerCase()
                ? "ring-1 ring-primary/30"
                : ""
            )}
            onClick={() =>
              setStatusFilter(
                statusFilter === item.label.toLowerCase()
                  ? "all"
                  : item.label.toLowerCase()
              )
            }
          >
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className={cn("font-mono text-lg font-bold", item.text)}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="generating">Generating</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="exported">Exported</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} report{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Report cards */}
      {filtered.length === 0 ? (
        <Card className="linear-card">
          <CardContent className="h-32 flex items-center justify-center text-sm text-muted-foreground">
            No reports match the current filter.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((r, i) => {
            const isDownloadable = r.status === "ready" || r.status === "exported";
            const downloaded = downloadedIds.has(r.id);

            return (
              <Card
                key={r.id}
                className="linear-card animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Format icon */}
                    <div className="w-10 h-10 rounded-lg bg-muted/60 border border-border/60 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-semibold leading-tight">
                            {r.meeting?.title ?? r.meetingId}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <StatusBadge status={r.status} />
                            <FormatBadge format={r.format} />
                            {r.fileSizeKb !== null && (
                              <span className="text-xs text-muted-foreground font-mono">
                                {r.fileSizeKb} KB
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {isDownloadable ? (
                            <Button
                              variant={downloaded ? "outline" : "default"}
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleDownload(r.id)}
                            >
                              {downloaded ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[color:var(--success)]" />
                                  Downloaded
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5 mr-1.5" />
                                  Download
                                </>
                              )}
                            </Button>
                          ) : r.status === "failed" ? (
                            <Badge
                              variant="outline"
                              className="text-xs rounded-full border-destructive/30 text-destructive"
                            >
                              Retry Queued
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-xs rounded-full border-[color:var(--warning)]/30 text-[color:var(--warning)]"
                            >
                              Processing...
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Error message */}
                      {r.status === "failed" && r.errorMessage && (
                        <div className="mt-2 flex items-start gap-2 rounded-md bg-destructive/5 border border-destructive/20 px-3 py-2">
                          <AlertCircle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                          <p className="text-xs text-destructive">{r.errorMessage}</p>
                        </div>
                      )}

                      {/* Metrics row */}
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-border/40">
                        <MetricPill label="Biases" value={r.biasCount} variant="bias" />
                        <MetricPill label="Nudges" value={r.nudgeCount} variant="nudge" />
                        <MetricPill label="Flashpoints" value={r.flashpointCount} variant="flash" />
                        <div className="ml-auto text-xs text-muted-foreground">
                          {r.generatedAt ? (
                            <>Generated {formatDate(r.generatedAt)}</>
                          ) : (
                            "Not yet generated"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
