# HANDOVER → main session 9 (from session 8, 16/11)
Role: main coordinator + kit keeper. Owner rule 16/11: the MAIN chat fixes the bugs/UI she meets while playing (urgent); everything else goes to Foremen B/C/D. Read CLAUDE.md, every 16/11 entry in dev/OWNER_DECISIONS.md, FOREMAN_B/C/D.md (rollover + hourly-wake rules), dev/kit/KIT_NUMBERS.md (next free §81), and SESSION8_QUEUE.md.
Context rollover: budget = your start + 25%; then hand over with create_session yourself.
Create your hourly self-wake (watch: pull docs, fast-forward PASSes, spawn reviewers for SẴN SÀNG KIỂM, relay foreman questions).
MAIN = eba64ead4 (+ train 3, kpanel-compact, evidence-truth, palace-start, tutorial, elder-staff).
Session 8 stays alive ONLY to relay its still-running agents' final reports into dev/handover/reports/<branch>.md (pushed here). Read that folder each wake, and act on the reports: spawn reviewers / fast-forward PASS. Session 8 archives itself when its agents are done.
## Branches in flight (pushed; check origin + reports/)
LIVE-BUG (main chat):
- coop-night-sync (opus): friend jumps to the next day; the friend is stuck after a rejoin; the shared timer freezes; buổi acts/khắc reset on rejoin; stats roll back 23→10 on rejoin (CRITICAL).
- modal-scroll c0ee5cca1 → reviewer running (modal-scroll-r1).
- an-tinh-fix b30a76525 + log-sync da08b9af2 → reviewer running (an-tinh-fix-r1 / log-sync-r2).
- pcard-actrow 83a9f37a4 → reviewer running (pcard-actrow-r1).
- goal-strip-fix-r1 (kitStageRail §77): FAIL → kit-sweep worker fixing (4 items).
- kit-sweep batch 1 1b3388297 (on goal-strip-fix), batch 2 running; then review both together.
- facefx-all-r1 b826cfb17 → reviewer running (facefx-all-r2).
- book-fig ae62a2732 → reviewer running (book-fig-r1).
- cardflip-smooth ff8f5949d → reviewer running (cardflip-smooth-r1).
- weather-fx-one (2 layers: weather in the stage, season full screen; ONE painted petal effect when both are petals; no code art) → worker running.
- act-dedupe c4679c83e (wave 1) → reviewer running (opus); KIT §78.
- postmerge-fix-1 (regression + remove the buổi tint) → worker running.
- servant-system (opus): fix A (eunuchs on the room stage page 2) + audit → running.
- reign-road c0e6f7d25 → reviewer running (opus); then Foreman D owns follow-ups.
- mortality (opus) → running (hidden bell lifespan mean 45 sd 15, careMax 3, no floor, pregnancy additions, giữ mẹ/giữ con = Emperor's choice).
- outside-r2-r2 reviewer (opus) → running.
Moved to Foreman D: slap-mg (§79), coop-chat (§80), act waves 2–3, HD upscale, balance audit, servant phase 2, D54 buổi paintings, D56 icons + Nội vụ phủ art.
## Waiting on the owner
- Pregnancy rate: ANSWERED option 4 (1+3) → Foreman D D57 preg-rate.
- Servant caps (wait for the servant-system audit).
## Known follow-ups
- The #kload first-run panel is wider than 560 (kpanel-compact note).
- The disk on this box is tight; git prune + old worktrees removed (owner allowed cleanup).
- (16/11 05:12Z) Main session 9 created (session_01UV1SziGvry1bKMUgXYLvuE). Session 8 = relay only (writes reports/), its hourly watch cron removed; it archives itself when its agents are done.

- (16/11) OWNER RULE (angry; credits): workers and reviewers are opened as SEPARATE cloud sessions (create_session, same environment, prompt = the task brief), NOT as in-session subagents. Each worker writes its result to the repo (branch + PROGRESS + a short report file under dev/handover/reports/<branch>.md on the handover branch). The coordinator reads the repo on each hourly wake, so the main chat context stays small and any new main session can take over without losing workers. Applies to the main chat and every foreman.
- (16/11 s9) 12 PASSes not on main (routes-port, chapter-detail, difficulty-port, tuduc-mg, result-sfx, placeholder-pics3, small-art-wire, collect-ms, act-text, ua-test, cycle-r3, tuduc-sub) → review/merge-train-4 as a SEPARATE session (owner rule). Hourly self-wake: owner allowed → trig_01TB5oP2dRRJ6rDRMZvp9Z85 (:20 every hour, into session 9).

- (16/11) OWNER RULE (claim before work): a foreman (or the main chat) CLAIMS an item BEFORE opening the worker session: write "<item> | <branch> | <session id> | RUNNING | <UTC>" in its STATUS and in the shared dev/handover/CLAIMS.md, then pull --rebase and push at once. If the item is already claimed in CLAIMS.md by anyone, do not take it. The main chat checks CLAIMS.md against every foreman slice on each hourly wake; it fixes duplicates, re-opens stale claims (no push for 3 h) and reports conflicts to the foreman.
- (16/11 s9 05:30Z) main = a363cc14a (goal-strip-fix-r1 fast-forwarded). merge-train-4 told to merge it. TODO next wake: weather-fx-one finishing worker session (reports/weather-fx-one.md); kit-keeper sign-off for scheme-games-port-r1 (jopic.js grid-auto-rows); tuduc-pic reviewer is Foreman B's.

## S9 STATE 16/11 05:41Z
main = 0a311183f (goal-strip-fix-r1 a363cc14a, then reign-road-r1). Hourly self-wake trig_01TB5oP2dRRJ6rDRMZvp9Z85 (:20).
Main-s9 sessions running (all told to merge newest main before final push; each writes reports/<name>.md):
- merge-train-4 session_01UV1SzkP9E6Y2WTYPMnL4C9 (12 PASSes)
- merge-hot-1 session_01UV1Szkb26qWiEe1bacAQvL (modal-scroll-r1 LIVE BUG Học Cầm swipe, log-sync-r2 LIVE BUG Ân tình 0→N, book-fig-r1) → ff FIRST when ready
- coop-night-sync-r1 reviewer session_01UV1SzhQrqEEYDtLXNUvhdo (opus, URGENT) → on PASS ff + push-notify owner (co-op fixes live)
- kit-sweep-r1 reviewer session_01UV1SziYTkPQjJKnWcb8GoX
Still to do: weather-fx-one finishing worker (reports/weather-fx-one.md); kit-keeper sign-off scheme-games-port-r1 (jopic.js grid-auto-rows); pcard-actrow-r1 verdict pending from s8.
Owner answers this session (all in OWNER_DECISIONS): pregnancy 1+3 → Foreman D D57; D art → Foreman C; Thái hậu archetypes keep; thiếu lễ keep −2.8; robbed-clothes re-issue random 1–3 wk; foreign princess (nc Nam Chiếu, bd Bắc Địch): own home-costume sets by rank below Quý phi, court robes from Quý phi; home maids home dress at low rank, palace uniform at high rank; SAMPLES FIRST (Foreman C → reports/foreign-princess-samples/) → send to owner.
Open owner question: none on the maid count (owner: the close maid already comes from home; Foreman C to confirm in code).
- merge-hot-2 session_01UV1SzjMYTh2Gz2tanxwTrD (facefx-all-r2 + kitPortrait fix).
- (05:46Z) Pending owner answers: (1) faction win for Hoàng thượng side: keep "exam at once, conditions waived" (proposed) / free rank / easier exam; (2) close-maid-by-origin table (proposed in chat: home maid for Tể tướng / Đại tướng quân / buôn muối / hòa thân; Thái hậu's plant for cháu gái Thái hậu; old roommate for cung nữ được sủng hạnh; none for thầy đồ / tội thần (may meet an old family servant) / cung nữ tuyển; random loyalty + talent + secret per game). Do not build until she approves.
- Owner rule: rollover = context budget (start + 25%), the session opens the next one itself (create_session). Session 9 hit its budget at 05:50Z → opened session 10.
- (05:45Z) NEW from s8: review/servant-system b897bcf2cd (reports/servant-system.md): (A) LIVE BUG fix (eunuchs + household on her room stage with person cards) → open a reviewer session; (C) active maid line → hand to Foreman D; (B) audit H1–H9 → ask the owner one numbered question at a time, plus whether her own servant road uses the same Emperor-eye table.
- (05:48Z) pcard-actrow-r1 db77f3f3ba PASS → folded into the kit-sweep-r1 reviewer session (ship together). Close-maid table v2 (with gain/loss per origin) proposed in chat, waiting for owner approval.
