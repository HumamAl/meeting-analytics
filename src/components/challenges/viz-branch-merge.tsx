import { X, Check } from "lucide-react";

export function VizBranchMerge() {
  const beforeItems = [
    "MindScope branch stale — 51 commits behind main",
    "777 lines of Python, never tested against current main",
    "No rebase — merge conflicts unresolved",
    "Stage 1/Stage 2 interface contracts may have drifted",
    "91 test suites: unknown pass rate against branch code",
  ];

  const afterItems = [
    "Full git history preserved — clean rebase onto main",
    "All interface contracts reconciled against current module structure",
    "Conflict resolution guided by reading the code first",
    "91 test suites: green baseline established pre-merge",
    "24 golden fixture segments pass — merge approved",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        className="rounded-lg p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono font-medium text-[color:var(--destructive)] uppercase tracking-wide">
          Before — Stale Branch
        </p>
        <ul className="space-y-2">
          {beforeItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <X className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--destructive)]" />
              <span className="text-xs text-[color:var(--destructive)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-lg p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono font-medium text-[color:var(--success)] uppercase tracking-wide">
          After — Clean Merge
        </p>
        <ul className="space-y-2">
          {afterItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
              <span className="text-xs text-[color:var(--success)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
