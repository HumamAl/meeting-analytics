import { ArrowRight, Cpu, Filter, Zap, CheckCircle, FileText } from "lucide-react";

export function VizLlmCascade() {
  return (
    <div className="space-y-3">
      {/* Main pipeline */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap">
        {/* Input */}
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 shrink-0">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs font-medium">Transcript Segment</p>
            <p className="text-[10px] text-muted-foreground font-mono">30–120 sec</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Stage 1 */}
        <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3 py-2 shrink-0">
          <Filter className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary">Stage 1 Fast Screen</p>
            <p className="text-[10px] text-muted-foreground font-mono">12 biases · ~0.8s</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Stage 2 */}
        <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3 py-2 shrink-0">
          <Cpu className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary">Stage 2 Adjudication</p>
            <p className="text-[10px] text-muted-foreground font-mono">top candidates · ~1.4s</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Threshold */}
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 shrink-0">
          <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs font-medium">Confidence Gate</p>
            <p className="text-[10px] text-muted-foreground font-mono">≥ 0.70 threshold</p>
          </div>
        </div>
      </div>

      {/* Output split */}
      <div className="grid grid-cols-2 gap-2 pl-0 sm:pl-2">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <Zap className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0" />
          <div>
            <p className="text-xs font-medium text-[color:var(--success)]">Live Nudge</p>
            <p className="text-[10px] text-muted-foreground font-mono">score ≥ 0.70</p>
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--warning) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--warning) 20%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <FileText className="h-3.5 w-3.5 text-[color:var(--warning)] shrink-0" />
          <div>
            <p className="text-xs font-medium text-[color:var(--warning)]">Report Log</p>
            <p className="text-[10px] text-muted-foreground font-mono">0.55 – 0.69</p>
          </div>
        </div>
      </div>
    </div>
  );
}
