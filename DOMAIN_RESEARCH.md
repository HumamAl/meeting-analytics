# Domain Knowledge Brief — AI-Powered Meeting Analytics / Behavioral Intelligence

## Sub-Domain Classification

Real-time behavioral intelligence platform for enterprise video meetings — specifically, an AI layer that integrates with Zoom via RTMS (Real-Time Media Streams) to stream per-participant audio, video, and transcripts, runs multi-modal analysis (facial emotion, voice prosody, NLP), surfaces live behavioral nudges during the meeting, and generates post-meeting signal reports with bias detection, flashpoint timelines, and exportable artifacts. Target buyers: sales leadership, executive coaches, L&D teams, HR, and organizational psychologists in mid-to-large enterprises (200–5,000 employees).

---

## Entity Names (10+ Realistic Names)

### Companies / Organizations (Clients / Demo Accounts)
These are realistic enterprise names that would buy this tool:

- Meridian Capital Advisors
- Hightower Consulting Group
- Apex Revenue Partners
- NorthBridge Solutions
- Castleford Financial Services
- Silverline Talent Partners
- Vantage Growth Equity
- Keystone Strategy Group
- Harborview Executive Advisors
- Pinnacle Enterprise Coaching
- Redwood Leadership Institute
- Crestview Management Consulting

### Meeting Participants (Role-Appropriate Names)
These are names for meeting attendees that feel authentic across enterprise and sales contexts:

- Marcus Bellingham (VP of Sales)
- Priya Subramaniam (Head of L&D)
- Jason Collier (Account Executive)
- Diane Okonkwo (Chief People Officer)
- Tyler Ashworth (Sales Director)
- Natalie Ferreira (Senior Coach)
- Kevin Tran (RevOps Manager)
- Sophia Carmichael (HR Business Partner)
- Derek Voss (Enterprise Account Manager)
- Camille Rousseau (Executive Facilitator)
- Aditya Mehta (Customer Success Manager)
- Lena Westerberg (Organizational Psychologist)

### Meeting Types / Session Labels
- Discovery Call
- Executive Business Review (EBR)
- Negotiation Session
- Kickoff Meeting
- Performance Review
- Sales Demo
- Board Presentation
- Debrief Session
- Quarterly Business Review (QBR)
- Conflict Resolution Session
- Deal Closing Call
- Stakeholder Alignment Meeting

### Cognitive Bias Labels (Exact Strings Used in the System)
These are the 12 detection rules in the system:

- Anchoring Bias
- Confirmation Bias
- Groupthink
- Authority Bias
- Availability Heuristic
- Bandwagon Effect
- Sunk Cost Fallacy
- Framing Effect
- Dunning-Kruger Effect
- Status Quo Bias
- Recency Bias
- Halo Effect

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Meeting Duration (minutes) | 18 | 47 | 93 | Gong data: avg sales call ~42 min; exec reviews run longer |
| Talk Ratio — Host (%) | 28% | 43% | 72% | Gong: top performers speak ~43% on discovery; 60-70% on demos |
| Participant Engagement Score (0–100) | 34 | 67 | 91 | Composite of talk time, facial engagement, prosody variance |
| Sentiment Score (0–100, 50=neutral) | 31 | 58 | 84 | Hume AI-derived; 50 is neutral, below 40 = negative tone |
| Arousal Level (0–1) | 0.12 | 0.44 | 0.88 | Voice prosody metric; >0.75 = high activation/stress signal |
| Valence Score (0–1) | 0.18 | 0.56 | 0.93 | Positive emotion intensity; <0.30 = negative emotional state |
| Tension Index (0–100) | 8 | 29 | 78 | Composite of arousal, interruptions, pitch variance, silence |
| Bias Confidence Level (%) | 52% | 74% | 96% | LLM cascade confidence on detected bias; <60% = low confidence |
| Alerts Generated per Meeting | 0 | 4 | 17 | Median 3-5 alerts; negotiation sessions generate most |
| Flashpoints per Meeting | 0 | 1.8 | 7 | Moments where tension index spikes >65 within 60s window |
| Cognitive Overload Score (0–100) | 0 | 38 | 81 | Derived from speech rate drop, hesitation ratio, silence clusters |
| Silence Ratio (% of meeting time) | 2% | 11% | 34% | >25% may indicate disengagement or reflection; context-dependent |
| Interruption Count | 0 | 6 | 31 | Normalized per 30-min segment; >12/30min = high conflict signal |
| Nudge Acceptance Rate (%) | 12% | 41% | 73% | % of real-time nudges that result in measurable behavior change |
| Post-Meeting Report Generation (seconds) | 28 | 74 | 190 | LLM cascade processing time after meeting ends |

---

## Industry Terminology Glossary (15+ Terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| RTMS | Zoom Real-Time Media Streams — a WebSocket-based API that streams per-participant audio, video frames, and transcripts live during a meeting | Used when describing the data ingestion pipeline |
| Prosody | The rhythm, stress, and intonation of speech — includes pitch, tempo, loudness, and pauses | Core voice analysis dimension; "prosody features" are extracted per utterance |
| Valence | The positivity or negativity of an emotional state (0 = strongly negative, 1 = strongly positive) | Hume AI's speech prosody output; tracked per speaker turn |
| Arousal | The intensity or energy level of an emotional state (0 = calm/flat, 1 = highly activated) | High arousal + low valence = stress/frustration signal |
| Tension Index | A composite metric that combines arousal, pitch variance, speech rate, and interruption frequency to estimate interpersonal conflict potential | Flashpoint trigger: tension index > 65 for 60+ seconds |
| Flashpoint | A moment in a meeting where behavioral signals converge to suggest a significant emotional or conflict event — typically detected when tension index spikes sharply | Shown on signal timeline; exportable as a timestamped event |
| Nudge | A real-time on-screen prompt delivered to the meeting host during a live session, suggesting a behavioral adjustment (e.g., "Slow down — you've been speaking 68% of the last 3 minutes") | Delivered via overlay; tracked for acceptance rate |
| Cognitive Overload | A state where a participant's working memory is saturated, inferred from increased hesitations, slower speech rate, longer inter-utterance pauses, and decreased prosodic variation | Detected via NLP + prosody; triggers intervention nudge |
| Anchoring Bias | The tendency to rely disproportionately on the first piece of information presented (the "anchor") when making decisions | Common in negotiations; detected when first price/number dominates subsequent discussion |
| Confirmation Bias | The tendency to search for, interpret, and recall information in ways that confirm one's preexisting beliefs | Detected via NLP when speaker systematically dismisses counter-evidence |
| Groupthink | A psychological phenomenon where the desire for group harmony overrides realistic appraisal of alternatives | Detected when dissenting voices are absent and consensus emerges without documented objection |
| Authority Bias | The tendency to attribute greater weight to opinions of perceived authority figures | Detected when lower-status participants rapidly reverse positions after executive speaks |
| Halo Effect | The tendency to let one positive attribute of a person influence overall judgment | Detected when a participant's feedback becomes uniformly positive after initial praise |
| Dunning-Kruger Effect | When a person with limited knowledge in a domain overestimates their competence | Detected via overconfidence language patterns cross-referenced with factual accuracy |
| Signal Timeline | A chronological visualization of all behavioral signals (sentiment, arousal, bias events, flashpoints) plotted against meeting time | Core element of the post-meeting report; exported as PDF/CSV |
| Utterance | A continuous unit of speech by a single speaker before another speaker begins | The atomic unit of analysis; each utterance gets its own prosody and NLP scores |
| Talk Ratio | The percentage of total meeting airtime attributed to each speaker | Key engagement metric; optimal discovery call ratio is 43:57 (speaker:listener) |
| Sentiment Trajectory | The directional trend of composite sentiment score over meeting time (improving, declining, flat) | Shown in post-meeting report; "declining trajectory" is a risk flag |
| LLM Cascade | A two-stage large language model pipeline: Stage 1 classifies potential bias signals, Stage 2 validates and provides explanation with confidence score | System uses Anthropic Claude; cascade adds ~2-4 seconds latency |
| HITL | Human-in-the-Loop — review step where flagged low-confidence bias detections are queued for human reviewer to confirm or dismiss | Items with confidence < 60% go to HITL queue |

---

## Common Workflows

### Workflow 1: Live Meeting Analysis (Real-Time)
1. Host schedules or starts Zoom meeting — system auto-connects via RTMS WebSocket
2. Per-participant audio/video/transcript streams ingested in real time
3. Hume AI processes each audio utterance for prosody features (arousal, valence, 53 emotion dimensions)
4. Facial expression analysis runs on video frames (engagement, confusion, surprise, contempt)
5. NLP layer runs bias detection rules on rolling transcript window (12 rule types)
6. Tension Index computed every 15 seconds from composite signals
7. If tension index > 65 for 60s window: flashpoint flagged, host alerted
8. Nudge engine evaluates active coaching rule triggers; surfaced as overlay to host only
9. Real-time alert log updates — participants do NOT see alerts (privacy model)
10. Meeting ends — LLM cascade runs final bias analysis on full transcript

### Workflow 2: Post-Meeting Report Generation
1. Meeting recording + full transcript passed to LLM cascade (Stage 1)
2. Stage 1 (Claude): chunk-level classification of 12 bias types, produces candidate events with rough confidence
3. Stage 2 (Claude): validation pass — cross-references candidate events against full context, produces final confidence scores and explanations
4. Signal timeline assembled: all arousal/valence/sentiment samples plotted against meeting clock
5. Flashpoints annotated on timeline with 30s context windows (before/after)
6. Executive summary generated: top 3 behavioral findings, overall meeting health score
7. Report rendered as PDF; raw data exported as CSV/JSON
8. Report saved to meeting history; stakeholders notified via webhook/email

### Workflow 3: Coaching Review (Post-Meeting)
1. Manager/coach opens post-meeting report in dashboard
2. Reviews signal timeline — seeks flashpoint events and sustained high-tension segments
3. Drills into specific utterances — clicks timestamps to replay audio/video clip
4. Reviews bias detection events — each with confidence score, explanation, and transcript excerpt
5. Dismisses false positives (feeds back into model improvement)
6. Tags key moments for coaching follow-up
7. Shares annotated report with participant or adds to coaching program record

---

## Common Edge Cases

1. **Silent Participant**: One or more attendees in a multi-party meeting speak less than 5% of the time — system correctly identifies them as "observer" role, not "disengaged"; engagement score should not penalize strategic listeners
2. **Overlapping Biases**: The same 60-second segment triggers both Anchoring Bias and Confirmation Bias — system must handle concurrent detections without double-counting or contradiction
3. **False Positive Nudge**: High arousal + low valence detected as "tension," but participant is actually enthusiastic/excited — needs a "false positive" dismissal mechanism with feedback loop
4. **Cognitive Overload Cascade**: Multiple participants show simultaneous cognitive overload signals — may indicate dense information presentation rather than individual stress
5. **Low Confidence Detections (HITL Queue)**: LLM cascade produces confidence score < 60% — flagged items pile up in HITL queue during high-volume days; needs aging/priority sort
6. **Interrupted Recording**: RTMS WebSocket drops mid-meeting (network issue) — meeting shows partial analysis with a "Data Gap" annotation on signal timeline, not a failed record
7. **Very Short Meeting**: Meeting ends in < 5 minutes (accidental join, tech check) — system should produce a "Insufficient Data" report state, not empty dashboard
8. **High Interruption Rate**: 20+ interruptions in 30 minutes — interruption clustering algorithm must distinguish "collaborative overlapping speech" from "dominance interruptions"
9. **Unanimous Agreement (Groupthink Risk)**: Zero dissenting utterances in a 45-minute decision meeting — system flags as potential Groupthink with medium confidence; explainability note required
10. **Outlier High Flashpoint Count**: Meeting with 7+ flashpoints in 60 minutes — should auto-escalate to manager alert; appears in "Needs Review" queue

---

## What Would Impress a Domain Expert

1. **Exact Hume AI Emotion Categories**: Rather than generic "positive/negative/neutral," use Hume's actual 53-emotion output — Concentration, Confusion, Contemplation, Determination, Distress, Excitement, Interest, Relief, Surprise (Negative), Sympathy. Domain experts who have used Hume's API will recognize these immediately.

2. **Talk Ratio Data is Evidence-Based**: Gong's published research on 25,537+ sales conversations shows optimal discovery call talk ratio is 43:57 (rep:prospect). Showing "43% host talk time" as the target benchmark — not 50/50 — signals deep familiarity with conversation intelligence research.

3. **Two-Stage LLM Cascade Design**: Mentioning that a single LLM pass produces too many false positives for bias detection, requiring a validation stage (Stage 1: candidate generation; Stage 2: contextual validation) — this is a real architectural pattern that practitioners in AI-powered NLP pipelines recognize as production-grade design.

4. **Arousal vs. Valence Distinction**: Many demos conflate emotional intensity with emotional valence. Showing these as separate axes (a participant can have high arousal/high valence = enthusiasm, vs. high arousal/low valence = frustration) demonstrates understanding of the Russell Circumplex Model of affect, a foundational model in affective computing.

5. **RTMS WebSocket Architecture Details**: Knowing that Zoom RTMS delivers per-participant audio (not just mixed audio), meaning the system can isolate individual speaker streams for independent prosody analysis — this is architecturally different from post-meeting analysis and is what makes real-time per-speaker nudges possible.

6. **Bias Detection Requires NLP + Behavioral Signal Fusion**: Cognitive bias detection from transcript alone is insufficient — confirmation bias needs speech patterns (dismissive tone, rising pitch on objections) cross-referenced with NLP semantic analysis. Mentioning "multi-modal fusion" as a design requirement impresses ML practitioners.

7. **Nudge Privacy Model**: Real-time nudges are visible ONLY to the host (or a designated coach observer) — participants never see their own emotional scores during the meeting. This is both an ethical design choice and a practical UX requirement. Domain experts in organizational psychology will ask about this immediately.

---

## Common Systems & Tools Used in This Space

| Tool | Category | Notes |
|------|----------|-------|
| Zoom RTMS | Video conferencing / media stream | Per-participant WebSocket stream of audio, video, transcripts |
| Hume AI | Emotion AI / prosody | 53-emotion model; speech prosody + facial expression APIs |
| Anthropic Claude | LLM backbone | Two-stage cascade for bias detection and explanation generation |
| Gong | Conversation intelligence (competitor) | Revenue intelligence; talk ratio, deal signals, coaching |
| Chorus.ai (ZoomInfo) | Conversation intelligence (competitor) | 95% sentiment accuracy claim; integrated with ZoomInfo CRM data |
| Fireflies.ai | AI notetaker (adjacent) | Transcription + sentiment; lighter-weight alternative |
| tl;dv | AI meeting recorder (adjacent) | Transcript search, highlight reel; less behavioral depth |
| AssemblyAI | Speech-to-text | Real-time transcription API; integrates natively with Zoom RTMS |
| Recall.ai | Bot infrastructure | Meeting bot infrastructure for RTMS-based apps |
| Read.ai | Meeting analytics | Meeting metrics, engagement scoring; closest direct competitor |

---

## Geographic / Cultural Considerations

The primary market is North American enterprise (US/Canada). Key considerations:
- **Currency**: USD. License pricing typically $60-$120/user/month for enterprise conversation intelligence tools (Gong exceeds $1,200/user/year).
- **Compliance**: Enterprise buyers will ask about SOC 2 Type II compliance, GDPR for EU participants, and CCPA for California recordings. Biometric data laws (Illinois BIPA) apply to facial emotion analysis — require explicit participant consent.
- **Time zones**: Meeting timestamps should display in the meeting host's local timezone; multi-timezone meetings are common in enterprise deployments.
- **Recording consent**: Many US states require two-party consent for recorded conversations. Platform must surface consent acknowledgment at meeting start.

---

## Data Architect Notes

### Entity Names to Use
- **Company accounts**: Use names from the Companies list above. Assign 1-3 primary accounts to each meeting in mock data.
- **Meeting participants**: Use the 12 participant names above; mix roles across meetings (VP, AE, Coach, etc.)
- **Meeting types**: Distribute across Discovery Call (30%), Sales Demo (20%), EBR (15%), QBR (15%), Negotiation Session (10%), Other (10%)

### Metric Values to Use as Field Values
- `engagementScore`: integer 34–91 (avg ~67). Do NOT use round numbers — use 67, 71, 83, 58, etc.
- `sentimentScore`: integer 31–84 (neutral = 50). Distribution: ~30% below 50, ~70% above
- `talkRatio`: decimal 0.28–0.72 for host. Target benchmark label: "43%" for discovery calls
- `arousal`: float 0.12–0.88, two decimal places. Flag >0.75 as elevated
- `valence`: float 0.18–0.93, two decimal places. Flag <0.30 as negative
- `tensionIndex`: integer 0–100. Color thresholds: <30 = green, 30-60 = amber, >60 = red
- `biasConfidence`: float 0.52–0.96. Display as percentage. Flag <0.60 for HITL review
- `flashpointCount`: integer 0–7. Most meetings have 0-2; >4 should be rare outliers
- `alertCount`: integer 0–17. Most meetings: 3-6 alerts
- `meetingDuration`: integer minutes 18–93 (avg ~47)

### Status Labels to Use (Exact Strings)
- Meeting status: `"Live"`, `"Processing"`, `"Complete"`, `"Failed"`, `"Partial Data"`
- Alert severity: `"Critical"`, `"High"`, `"Medium"`, `"Low"`, `"Info"`
- Bias confidence tier: `"High Confidence"`, `"Medium Confidence"`, `"Low Confidence — Needs Review"`
- Nudge types: `"Talk Ratio Alert"`, `"High Tension Detected"`, `"Cognitive Overload Signal"`, `"Groupthink Risk"`, `"Anchoring Pattern"`, `"Silence Gap"`, `"Interruption Cluster"`
- Report status: `"Generated"`, `"Draft"`, `"Exported"`, `"Awaiting Review"`

### Edge Case Records to Include
- 1-2 meetings with `status: "Partial Data"` (simulating RTMS dropout)
- 1 meeting with `flashpointCount: 6` and high tension (the outlier)
- 1 meeting with `status: "Failed"` (completely unable to process)
- 2-3 meetings with `biasConfidence < 0.60` items in the HITL queue
- 1 meeting with `silenceRatio > 0.28` and low engagement (disengaged participant)
- At least 3 meetings with 0 flashpoints (normal, healthy meetings exist)
- 1 meeting with `duration: 6` minutes (short — "Insufficient Data" state)
- Include 1-2 bias detection events with `dismissed: true` (false positives that were corrected)

### Date Patterns to Follow
- Meetings should cluster on Tuesday-Thursday (weekdays), 9am-4pm local time (Gong data: Tue/Wed mornings have highest connect rates)
- Spread meetings over the last 45 days
- Processing timestamps should be 2-8 minutes after meeting end time (LLM cascade latency)
- Report export timestamps can be same-day or up to 5 days after meeting

### Chart Data Guidance
- **Signal timeline**: Use minute-by-minute arousal/valence/sentiment data for at least one featured meeting (30-60 data points)
- **Bias frequency bar chart**: Count of each of the 12 bias types detected across all meetings — Confirmation Bias and Anchoring Bias should be most common
- **Engagement trend area chart**: Average daily engagement score over last 30 days — slight upward trend with natural variance
- **Tension distribution**: Histogram of tension index values across all meetings — right-skewed (most are low, few are high)
