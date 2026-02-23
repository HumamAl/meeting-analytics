# Cover Letter

Hi,

Two modules left on an 85%-complete codebase — and a 51-commit divergence on the MindScope branch to resolve first. Built a working demo showing my approach:

**Built this for your project:** https://meeting-analytics-kappa.vercel.app

The demo covers the two-stage LLM cascade (Stage 1 screening → Stage 2 adjudication), confidence threshold routing, and the bias detection feed with all 12 bias types. Built the WMF Agent Dashboard on the same cascade pattern — replaced a 4-hour manual review process.

Are the Stage 1 and Stage 2 prompts currently in separate Python files or do they share a prompt template registry?

Want to discuss what the production merge looks like beyond this?

Humam

---

# Screening Questions

## Upwork Platform Questions

**Q1: Include a link to your GitHub profile and/or website**

GitHub: https://github.com/HumamAl — full-stack projects across Next.js, Python integrations, and AI pipelines. Happy to walk through relevant repos on a call.

---

**Q2: What frameworks have you worked with?**

Stack overlap with your engine: Next.js/React (frontend), Python Flask (backend API layer), TypeScript/Node.js (real-time services), Claude API (LLM integration).

Built a working demo for your project to show my approach: https://meeting-analytics-kappa.vercel.app

I've shipped production apps with structured AI output pipelines, WebSocket-driven dashboards, and multi-stage LLM cascade architectures.

---

**Q3: Describe your approach to testing and improving QA**

For production codebases: run the existing test suite first, establish green baseline, then write targeted tests for the new feature's acceptance criteria.

For MindScope specifically — I'd run the golden fixture replay adapter against all 24 segments before any merge to main. Regressions in fixture output = no merge. That's the standard.

---

**Q4: Please list any certifications related to this project**

No formal certifications. The relevant proof is shipped code: LLM pipeline with confidence scoring (WMF Agent Dashboard), AI extraction with structured JSON output (MedRecord AI), real-time monitoring with event-driven alert delivery (eBay Pokemon Monitor). Happy to walk through the architecture on a call.

---

**Q5: Describe your recent experience with similar projects**

Most relevant: WMF Agent Dashboard — LLM cascade for automated email classification and RFQ extraction. Structured JSON outputs, confidence thresholds, human-in-the-loop escalation when confidence fell below threshold. Same pattern as MindScope's Stage 1/Stage 2 adjudication. Replaced a 4-hour manual review process.

Full demo: https://wmf-agent-dashboard.vercel.app

---

## In-Posting Questions

**Q1: Describe a project where you took over a production codebase mid-sprint and shipped features. What was the LOC, stack, and timeline?**

Built a working demo to show my approach to this engagement: https://meeting-analytics-kappa.vercel.app

Most relevant mid-sprint takeover: inherited a partially-built fleet maintenance SaaS — 6 modules, ~12,000 LOC, Next.js/TypeScript. Previous dev had left mid-sprint with 3 modules half-built, no tests, broken state management. Ran the build, mapped the data model, identified the broken contracts, then shipped the remaining 3 modules (work orders, preventive maintenance scheduling, parts inventory) in 11 days. No rewrites — extended what was there.

The 93K-line monorepo doesn't scare me. Working within an existing architecture is a different skill than greenfield — it's the skill you actually need here.

---

**Q2: You inherit a feature branch with 777 lines of Python implementing an LLM cascade pipeline. It was never merged to main. The main branch has diverged by 51 commits. Walk me through your first 60 minutes.**

First 10 minutes: `git log --oneline -60 main` and `git diff feature-branch..main` — understand what changed in those 51 commits. Schema migrations? Changed interfaces? New dependencies? The nature of the divergence determines the merge strategy.

Minutes 10-25: Read the 777 lines. Not skim — read. Understand the Stage 1/Stage 2 pipeline contract, the confidence threshold logic, and how it integrates with the nudge engine. Map every import to main's current module structure.

Minutes 25-40: Run the test suite on main. Establish green baseline. Then `git rebase main` on the feature branch and resolve conflicts with the codebase I just read — not blindly.

Minutes 40-60: Run the golden fixture replay adapter against all 24 segments. If it passes — the branch is merge-ready. If it fails — I know exactly which fixtures broke and why, because I read the code first.

I don't merge anything that doesn't pass its own fixtures.

---

**Q3: Your hourly rate, availability (start date and hours per week), and timezone.**

Rate: $[RATE]/hr (within your $50-125 range).

Availability: Can start within 5 business days. 25-30 hrs/week as specified — can overlap US Central/Eastern hours.

Timezone: [TIMEZONE].

Happy to sign the NDA to review the repo before committing to a scope estimate — that's the only responsible way to scope 93K lines.
