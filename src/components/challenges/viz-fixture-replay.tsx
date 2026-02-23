import { ArrowRight, Database, RefreshCcw, Cpu, CheckCircle, XCircle } from "lucide-react";

export function VizFixtureReplay() {
  return (
    <div className="space-y-3">
      {/* Main architecture row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap">
        {/* Fixture Store */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 shrink-0"
          style={{
            backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <Database className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary">Fixture Store</p>
            <p className="text-[10px] text-muted-foreground font-mono">24 segments</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Replay Adapter */}
        <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-3 py-2 shrink-0">
          <RefreshCcw className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary">Replay Adapter</p>
            <p className="text-[10px] text-muted-foreground font-mono">deterministic input</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* MindScope Pipeline */}
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 shrink-0">
          <Cpu className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs font-medium">MindScope Pipeline</p>
            <p className="text-[10px] text-muted-foreground font-mono">Stage 1 + Stage 2</p>
          </div>
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />

        {/* Result Comparator */}
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 shrink-0">
          <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-xs font-medium">Result Comparator</p>
            <p className="text-[10px] text-muted-foreground font-mono">vs golden output</p>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <CheckCircle className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0" />
          <div>
            <p className="text-xs font-medium text-[color:var(--success)]">Pass — Merge Ready</p>
            <p className="text-[10px] text-muted-foreground font-mono">all 24 fixtures match</p>
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
            borderColor: "color-mix(in oklch, var(--destructive) 20%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <XCircle className="h-3.5 w-3.5 text-[color:var(--destructive)] shrink-0" />
          <div>
            <p className="text-xs font-medium text-[color:var(--destructive)]">Fail — Regression</p>
            <p className="text-[10px] text-muted-foreground font-mono">blocked from main</p>
          </div>
        </div>
      </div>
    </div>
  );
}
