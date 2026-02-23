interface MetricItem {
  label: string;
  value: number;
  max: number;
  displayValue: string;
  status: "success" | "warning" | "primary";
  target?: string;
}

const metrics: MetricItem[] = [
  {
    label: "Signal Delivery Latency",
    value: 320,
    max: 800,
    displayValue: "320ms",
    status: "success",
    target: "Target: < 500ms",
  },
  {
    label: "Concurrent Streams (audio + video + transcript)",
    value: 3,
    max: 3,
    displayValue: "3 streams",
    status: "primary",
    target: "Per active meeting",
  },
  {
    label: "Redis Pub/Sub Throughput",
    value: 92,
    max: 100,
    displayValue: "92%",
    status: "success",
    target: "Headroom: 8%",
  },
  {
    label: "Nudge Engine Queue Depth",
    value: 2,
    max: 10,
    displayValue: "2 pending",
    status: "success",
    target: "Max: 10 queued",
  },
  {
    label: "Stage 2 Timeout Rate",
    value: 3,
    max: 100,
    displayValue: "3%",
    status: "success",
    target: "Acceptable: < 5%",
  },
];

const statusColors: Record<string, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  primary: "var(--primary)",
};

export function VizWebSocketLatency() {
  return (
    <div className="space-y-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{metric.label}</span>
            <div className="flex items-center gap-2 shrink-0">
              {metric.target && (
                <span className="font-mono text-[10px] text-muted-foreground hidden sm:block">
                  {metric.target}
                </span>
              )}
              <span className="font-mono text-xs font-medium tabular-nums">
                {metric.displayValue}
              </span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-muted w-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${Math.min((metric.value / metric.max) * 100, 100)}%`,
                backgroundColor: `color-mix(in oklch, ${statusColors[metric.status]} 90%, transparent)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
