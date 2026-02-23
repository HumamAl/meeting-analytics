import { ArrowDown, Zap, FileText, Trash2 } from "lucide-react";

export function VizThresholdRouting() {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Input event */}
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2">
        <span className="text-xs font-medium">Bias Event Detected</span>
        <span className="font-mono text-[10px] text-muted-foreground">Stage 2 score ready</span>
      </div>

      <ArrowDown className="h-4 w-4 text-muted-foreground" />

      {/* Decision gate */}
      <div className="flex items-center justify-center w-28 h-12 bg-primary/10 border border-primary/30 rotate-45 rounded-md">
        <span className="text-[10px] font-medium text-primary -rotate-45 text-center leading-tight">
          Confidence<br />Score?
        </span>
      </div>

      <ArrowDown className="h-4 w-4 text-muted-foreground" />

      {/* Three output lanes */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* Live nudge */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono font-medium text-[color:var(--success)]">≥ 0.70</span>
          <div
            className="w-full rounded-lg px-2 py-2.5 flex flex-col items-center gap-1"
            style={{
              backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Zap className="h-4 w-4 text-[color:var(--success)]" />
            <p className="text-[10px] font-medium text-[color:var(--success)] text-center">Live Nudge</p>
            <p className="text-[9px] text-muted-foreground text-center">delivered &lt; 500ms</p>
          </div>
        </div>

        {/* Report only */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono font-medium text-[color:var(--warning)]">0.55 – 0.69</span>
          <div
            className="w-full rounded-lg px-2 py-2.5 flex flex-col items-center gap-1"
            style={{
              backgroundColor: "color-mix(in oklch, var(--warning) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--warning) 20%, transparent)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <FileText className="h-4 w-4 text-[color:var(--warning)]" />
            <p className="text-[10px] font-medium text-[color:var(--warning)] text-center">Report Only</p>
            <p className="text-[9px] text-muted-foreground text-center">post-meeting log</p>
          </div>
        </div>

        {/* Discard */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono font-medium text-muted-foreground">&lt; 0.55</span>
          <div className="w-full rounded-lg border border-border/60 bg-muted/40 px-2 py-2.5 flex flex-col items-center gap-1">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-[10px] font-medium text-muted-foreground text-center">Discard</p>
            <p className="text-[9px] text-muted-foreground text-center">below threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
