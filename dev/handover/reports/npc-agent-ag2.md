PRIORITY #1 CHECK ('night-ledger|nightLedger|ledger10|empAgent|S\.emp\.met|night-final'): OD 6 | ledger 0 | claims 8 | main 7 | review/* 1 — AG1 = review/npc-agent-r1-fix2 PASS 2756d2d2 (reused as base); no Emperor agent / S.emp.met anywhere; 10-night ledger NOT built (CLAIMS: review/night-ledger queued after review/night-final, which is in review r1 by D) → AG2 does not build the ledger, it gives the per-night choice the ledger will call.

# npc-agent AG2 — the Emperor is an agent: his night is his own choice

Worker: Foreman C opus session_011xDdVRNkhkw9vZBGkZ1mDK. START_CTX ≈ 3 % (get_session reads 0; own estimate), end ≈ 20 %. No rollover.
Branch: review/npc-agent-ag2 @cc1649a4, from review/npc-agent-r1-fix2 @2756d2d2 (2756d2d2 not on origin/main at push → no rebase).
Rules read: START_CORE, START_WORKER, topic/people-life.md (OD:L1386, L1248, L35, HANDOVER:L46), OD 16/11 17:15Z / 18:10Z / 18:40Z / 19:00Z / 19:05Z verbatim, reports/npc-agent.md §3.2 / §4 / §5, two-way-acts-r1.md OPEN rows.

## What changed (design §5 row AG2: replaces §1 rows 1, 2, 4, 5, 25; + two-way OPEN row 24)
| § row | before (dice) | now (his choice) | where |
|---|---|---|---|
| 1 flip summon | roll 90, 65 with Chăm chính | `empSummon()`: BAL.ag.emp.summon [90, 65]; busy = ill, Chăm chính sự, or court crisis (j55 tdCrisis). **Owner's numbers kept (OD 18:10Z: "90 %, 65 % when busy with court / ill")**; illness now counts as busy, as her words say. nightWhy gives his reason ("Ngài chăm lo chính sự…", "Long thể bất an…", "Triều chính rối ren…", "Ngài muốn nghỉ một mình…") | j8 flip, jagemp |
| 4 court crisis | extra j55 roll 30 cancel on top (90×70 ≈ 63) | folded into the one busy rule above (65); the j55 roll runs only with the loop off | j55 |
| 2 who | plain weighted pick by nightCh, consorts | `empPick(C)`: mindPick (jmind slip, OD:L1248) over nightCh × his MEMORY `S.emp.met` of what each one did near him (deck act dance / zither / chess / small gift: ok = 1, failed = BAL miss .5, kept 2 tuần, cap 3, × .15 each). Same for her (runOpt wrapper), NPCs (j75 npcEffort) and the co-op friend (her own client's memory on her entry, `emet`). Shown weights (nightWhy rows) = the weights he picks by, + reason row "còn nhớ" | jagemp, j75, jcoopworld |
| 5 custom mùng 1 / rằm | roll 40 / 20 | `empCustom`: duty weight BAL.ag.emp.custom × his traits (Chăm chính / Hiếu thảo ×1.25, Đa tình / Mê sắc ×.75) vs (100 − x) × his wish for the turned card (√ nightCh ratio, [.5, 2]); mindPick. FAIRN.custom moved to BAL (ONE CORE). nightWhy says when he breaks it and why | j75, jagemp |
| 25 vacant Hoàng hậu seat | weekly roll 12 + plain weighted pick | `empSeat`: his duty grows with months vacant (b 6 + 3 / month after 3 months mourning, cap 40, × duty, × 1.2 while Thái hậu lives); whom = seatW with mindPick | j8, jagemp |
| two-way row 24 pillow slander | her option: od(30+an/2+s·3−DG10), hit −10; NPC: rel<−20 + roll 20, odA(30+an/2), hit −4 (two rules) | ONE deed BAL.tw.g.pillow for both (`pillowO` / `pillowDo`); the NPC on her night speaks or keeps quiet by her spite need (agSpite, road, mindW scheme; quiet = BAL.ag.routine, as AG1), target = whom she resents most (not always her); her option text prints the deed numbers | jtwoway, j8 night2, j75 rivalNight, jagemp |
Off switch: BAL.ag.on = 0 → every old dice path again (checked). Host only (agOn: a co-op guest never decides; jcoopworld's guest flip draws nothing).
10-night ledger fit: empSummon() + empPick(C) are per-night; nothing assumes one night per tuần. The by-day custom (OD 19:00Z: Empress off the tray, fixed day 1 / 15) and the by-day cycle belong to review/night-ledger (not built) — not done here.
No UI part added (nightWhy text goes through the existing jflip result / notice; night2 option = existing kit option row). Words: cổ trang, no %, odds as ladder words.

## Bot before / after (24 lives each, run_par sens, 2 pages, seed 1, inpage6 with the KIT §84 c.off skip-fix + inag + intrace + new innight.js; before = 2756d2d2 build, after = 26244828 behaviour; 0 page errors, 0 timeouts)
| measure | before | after |
|---|---|---|
| years played | 280.3 (11.7 / life) | 289.1 (12.0 / life) |
| flips / yr · nights with no one | 34.5 · 26 % | 34.5 · 26 % (rest by: Chăm chính 1426, court 755, calm 362, ill 32) |
| **her nights / yr · her share of all nights** | 2.88 · 11.3 % | **3.81 · 15.0 %** |
| Hoàng hậu (NPC) nights / yr · other NPC nights / yr | 1.62 · 20.92 | 1.36 · 20.27 |
| most nights of one NPC / life (median) | 21 | 22 |
| custom kept (lệ) · broken (AG2) · stolen | 217 · – · 1127 | 378 · 574 · 1216 |
| picks with a remembered deed | – | 1343 (≈ 22 % of nights) |
| harm acts on her (runAct) / yr | 54.0 (rumor 16.7, frame 7.2, spy 5.6) | 55.7 (rumor 16.8, frame 7.7, spy 5.9) |
| NPC deeds aimed at her / yr | 62.6 (thHH 29.7, provoke 13.8) | 90.8 (thHH 57.6, provoke 13.0) |
| her kids / life · NPC births / yr | 1.88 · 1.20 | 1.67 · 1.10 |
| she reached Hoàng hậu | 11 / 24 | 14 / 24 |
| agent slice p95 (median of lives) | 1.85 ms | 1.7 ms |
Reading: (1) her share rises because her deck acts (the bot plays them often) now make him remember her — the owner's own rule (OD 17:15Z: she must DO things so he notices her), and the same holds for NPCs who do the deed; knob BAL.ag.emp.met.w (.15) if Foreman B wants it smaller. (2) "NPC deeds aimed at her" rise only in thHH = consorts greeting her as Hoàng hậu (she was Empress in more lives); harm on her is flat (55.7 vs 54.0 / yr). (3) He keeps the lệ more often than the old 40 / 20 roll (the Empress usually has the higher night weight → his wish for the turned card is < 1) — closer to the owner's ledger custom (fixed days). (4) Births within noise at n = 24.

## Tests (branch cc1649a4)
agemp_check (new, 20 checks: summon odds per state + no j55 second roll + off switch; memory her / NPC / pick rate; shown weight = used weight; custom neutral ≈ 40 % and Đa tình lower; nightWhy rest / memory words; seat duty grows; pillow one deed both ways + NPC quiet with no spite + option text; co-op friend memory on the host; guest empOn false; old save without S.emp.met + 30 tuần) **ALL PASS ×2** · agent_check 16/16 · one-core-guard PASS (inline 6644 ≤ baseline 6691) · onecore-pick TOTAL 0 · night-steal-unit 0 FAIL · two-way-oldsave (origin/main 6c4f21c3 save → branch, 30 months) ok, 0 errors · coop-one-world PASS · **coop-e2e 62/62** (live Worker, Fold host + iPad guest) · **coop-night 105/105** · night-day: same result as the base 2756d2d2 (its "steal" case fails identically on both — pre-existing) · **QUICKCHECK PASS** (core gates PASS, old save ok, perf new/live render 250/228, tab 286/281, buổi 899/1132 ms, tasks>200ms 11/12).
Perf: AG2 adds one weighted pick per flip (≈ 12 options) — not measurable in the buổi numbers.
Shots: none (no layout change).

## Open (not in AG2)
- review/night-ledger: call empSummon + empPick per night; by-day custom / cycle (OD 19:00Z / 19:05Z); breaking the custom on its fixed day could then cost him with Thái hậu (npc-agent §6 owner question 2, still unanswered).
- AG3: maids enter the pool through S.emp.met (empMet takes anyone with key(); staff maids need a key).
- j95 empWk.busy (his busy week in the record, a j95 dice) is not tied to the summon busy rule — kept apart so the owner's 90 / 65 stays as she set it.

SẴN SÀNG KIỂM cc1649a4
