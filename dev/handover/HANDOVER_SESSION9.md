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
- (05:48Z) pcard-actrow-r1 db77f3f3ba PASS → folded into the kit-sweep-r1 reviewer session (ship together). Close-maid table v2 (with gain/loss per origin) proposed in chat, waiting for owner approval. → APPROVED → Foreman D D58.
- (05:49Z) MAIN SESSION 10 = session_01UV1SzidGUesZF9JJwr93no (opened by s9). Session 9 stops; relay messages from s8 should go to session 10.
- (06:00Z) OWNER QUESTION for s10 (angry-ish): "Ủa tại sao chỉ có 3 chương mỗi thân phận? Tao nhớ là tao đã chốt là tới 14 chương hay là 12 tới 14 chương." s9 told her each origin road (j4.js) has n:3 (td n:5) — that n may be HỒI/steps, not chapters; the main road has its own chapters ("Chương 1 «Nhập cung, đứng vững»", "Chương 4 Hồi 2"). grep of OWNER_DECISIONS found no '12–14 chương' line. s10: find the real ruling (OWNER_LEDGER, older docs, chat refs, chapter-detail-r1/palace-start branches), count chapters per road on main + merge-train-4, and answer her plainly; if 12–14 was ruled and not built, open a worker (opus, structure).
## S10 (session_01UV1SzidGUesZF9JJwr93no) 16/11 06:00Z
- Hourly self-wake trig_01RTZd5kBXL9txgwZ14BG1ux (:51). s9 trigger trig_01TB5oP2dRRJ6rDRMZvp9Z85 DISABLED (delete refused by classifier).
- Kit keeper: scheme-games-port-r1 jopic.js grid-auto-rows auto→max-content = OK (rows size to content; card min-height kept). Not ff-able (base eba64ead) → told merge-train-4 to fold it in.
- Opened servant-system-r1 reviewer (A only) + weather-fx-one finisher. Servant C → Foreman D. Servant B (H1–H9) → owner, one question at a time, after the faction-win question.
- (06:05Z) Owner: each origin should have 4 story roads, chapters 12–14 — says earlier chats lost it. History-search worker session_01UV1SzjEdjQ8f47FqGmmgP3 → reports/owner-history-chapters.md, messages s10. s10: on its report, write the found rulings into OWNER_DECISIONS and plan the work.
- (06:06Z s10) Open owner questions queue: (1) faction-win reward → DECIDED by coordinator (OD 06:10Z); (2) story road for "Cung nữ tuyển vào cung"; (3) servant B H1–H9 one at a time. Chapters 12–14 / 4 roads: wait for reports/owner-history-chapters.md (session_01UV1SzjEdjQ8f47FqGmmgP3).
- (06:35Z s10) LIVE: main = 02a0d3f108 (act-dedupe-r1 wave 1, Hành sự / Dư đồ / Tài nghệ split). Follow-ups in reports/act-dedupe.md → Foreman D (act waves) except the night card-flip overlay bug on main → main bug list.
- (06:57Z s10) ART now run by main (owner rule). Running: foreign-princess samples session_01UV1SzhLiXwuRzRVVTE8AJr, place-glyphs session_01UV1SzmEsuu42GCFecC9HGf. Art queue after the samples: C3 art-complete p2, D51 fxkit sprites, D54 buổi paintings, fig-hd-upscale + face-sharp-hd2, full foreign-princess set (after owner approves samples).
- (07:10Z s10) LIVE: main = c4e89f89b5 (outside-r2-r2 pre-palace tiểu thư road; owner OK in chat). Main-side UI bugs from that review → flip-newlife worker (items 4–5). NOTE: push to main may need the owner OK in chat (classifier refused once).
- (07:40Z s10) ART paused. foreign-princess samples DONE (340 cr) → sent to owner, awaiting approval (notes: nc low-rank maid skirt pink; the two palace maid uniforms differ — must be one shared uniform). place-glyphs: 9 glyphs done+wired on review/place-glyphs (~1890 cr), sent to owner; NOT done: tests/shots, Nội vụ phủ scene (15 queued edits, ids in report). Resume both in the owner's morning after she reviews.
- (07:50Z s10) Model audit of main s10 opens (OD:L1059): OK = servant-system-r1 (sonnet), weather-fx-one (sonnet), promo-skip (opus, rules/numbers), flip-newlife (sonnet), art x2 (sonnet). WRONG = verbatim-rules on opus → stopped, reopened on sonnet; kit-keeper-1 on opus (kit/UI = sonnet) → left to finish (15 min in), next kit-keeper on sonnet.
## S10 → S11 HANDOVER (16/11 06:25Z) — context budget reached
READ IN FULL (do not rely on summaries): dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (being built by session_01UV1SzghGXF2QE55VX7SGi6), every OWNER_DECISIONS line from "(16/11 06:10Z, s10)" to the end, CLAIMS.md, this file from "## S10".
main = c4e89f89b5 (act-dedupe-r1 + outside-r2-r2 went live in s10). Push to main may need the owner's OK in chat (classifier refused once; she said "Cho phép").
Self-wake: s10 trigger trig_01RTZd5kBXL9txgwZ14BG1ux (:51) → s11: create your own hourly trigger, then DISABLE trig_01RTZd5kBXL9txgwZ14BG1ux (delete is refused). s9 trigger already disabled.
Running sessions (main): merge-train-4 session_01UV1SzkP9E6Y2WTYPMnL4C9 (+ scheme-games-port-r1 e25486e0 kit OK), merge-hot-1 session_01UV1Szkb26qWiEe1bacAQvL (LIVE bugs Học Cầm swipe, Ân tình 0→N → ff FIRST), merge-hot-2 session_01UV1SzjMYTh2Gz2tanxwTrD, coop-night-sync-r1 session_01UV1SzhQrqEEYDtLXNUvhdo (on PASS ff + tell owner co-op fixes live), kit-sweep-r1 session_01UV1SziYTkPQjJKnWcb8GoX (incl. pcard-actrow), servant-system-r1 (A only) session_01UV1SzgqoV1xrEjLJsbAr1p, weather-fx-one finisher session_01UV1SzjUEYLKCbbxAiZmT48, promo-skip (opus) session_01UV1SzhzQSFQc43nUVdpwAi (67670d9d, bot runs pending), flip-newlife session_01UV1SzhXJHY3uWDTJeQ1dYH (5 main UI bugs), kit-keeper-1 session_01UV1Szj1bf6YFPCryaDjdEi (fig-bg K1 + rank-port kit), verbatim-rules session_01UV1SzghGXF2QE55VX7SGi6.
ART: PAUSED until the owner's morning. Samples sent to her: foreign-princess (nc+bd, 340 cr; notes: nc low maid skirt pink, palace maid uniform must be ONE shared set) and 9 place glyphs (review/place-glyphs, ~1890 cr; tests + Nội vụ phủ scene not done). Rule: main = samples only; mass production → Foreman C after approval; tell her the credit estimate before each batch.
Owner questions OPEN: (1) story roads 14-chapter plan (my recommendation in chat 07:05Z: chapters 1–3 tutorial, 4–11 the road (j67 already has 4 premises per origin, castRv67), 12–14 endgame; roles cast from real NPCs; hồi fire only for real in-game reasons) — she must pick 1/2/3; (2) approve foreign-princess samples; (3) approve place glyphs. Ask one at a time, explain context fully (she was angry at terse questions).
Decided this session (all in OD): faction win → every side direct rank with its own loss; first prince direct rank, later sons/princess exam waived; full seat → large one-off compensation, no seat claim; every reward has a gain and a loss; related items to one foreman (D41 → C, D51 wiring → main art); C's non-art D-list → B; art samples main / mass C.
Model rule (OD:L1059): sonnet default (UI, kit, art, docs, reviewers, bugs); opus only rules/numbers/structure. Never haiku.
- (06:25Z) MAIN SESSION 11 = session_01UV1SziSAVAzqFNXUuCHUm7 (opened by s10). Session 10 stops; messages from workers should go to session 11.
## S11 (session_01UV1SziSAVAzqFNXUuCHUm7) 16/11 06:25Z
- Hourly self-wake trig_018KeLcdXKabaXpFYzAiCYxf (:25, human_request). s10 trigger trig_01RTZd5kBXL9txgwZ14BG1ux DISABLED.
- Read PRIORITY_RULES.md in full. OWNER_ART_RULES.md: read in full BEFORE the first art action (art paused until the owner's morning).
- ff check vs main c4e89f89: merge-hot-1 aa3a4863 / merge-hot-2 9fed4864 / coop-night-sync-r1 73b582f9 / kit-sweep-r1 3b9c6976 / merge-train-4 6678be46 — none descend from main. merge-hot-1 is re-merging c4e89f89 itself; the other four were messaged to merge origin/main, re-test, report the sha to s11.
- (06:35Z s11) Opened: merge-hot-3 (cardflip-smooth-r1 re-merge, sonnet) session_01UV1SzhTBy9XN8Ebp4ao4yp; canon-pairs (57 old→new pairs, opus) session_01UV1SzgjGLkdeoiUTB6qRdG; kc-lore (td home road vs origin, sonnet) session_01UV1SzifvyTS1XcBknF7tFA. Foremen inbox: Q24 answered; D5 → B; D13/D19/D14/D44 → C; GO act waves → D; C44 PASS waits for ff.
- KIT QUEUE for kit-keeper-2 (sonnet, open AFTER kit-keeper-1 reports): event-frame body #mb needs a scroll area (D-R1); C32b curl speed (B). 
- Owner morning questions, one at a time, full context: (1) 14-chapter plan (main already shows ~13 chapters = arcs+3; drop "skip tutorial keep reward"; tutorial quests must be DONE); (2) foreign-princess samples; (3) place glyphs; tell her: rule files ready (PRIORITY_RULES / OWNER_ART_RULES, overwrite-in-place), td fix running, NPC side quests not built → D5 opened at B, failing a chapter never closes the HH road.
- (06:40Z s11) LIVE: main = ba07c65e6 (merge-hot-2: facefx-all-r2 one face-mark rule + kitIsPortrait rename fixing the podium fallback; kit keeper sign-off). Owner rule OD:L1237 work sizing → canon-pairs adds it to PRIORITY_RULES; check foremen follow it on wakes.
- (06:35Z s11) Owner awake (reviewing via s10). Art resumed for samples: foreign-princess REDO (OD:L1238-1239, ~340 cr) + place-glyphs finish (approved; NVP 15 edits already paid → contact sheet only). flip-newlife-r1 reviewer opened. merge-hot-3 asked to re-merge ba07c65e.
- (06:37Z s11) LIVE: main = feba37e5 (merge-hot-3 = cardflip-smooth-r1: smoother, slower card flip). merge-hot-1 asked to re-merge.
- (06:40Z s11) foreign-princess v2 samples (260 cr; total 600) looked at by s11 and sent to the owner. Waiting for her verdict; after approval mass production → Foreman C.
