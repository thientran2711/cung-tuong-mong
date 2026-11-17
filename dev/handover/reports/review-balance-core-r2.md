# review-balance-core-r2 — verdict: **PASS baff0824** (review/balance-core 9abcfa72 merged onto origin/main 7abaf07a)

Reviewer session_01UV1SzhHhDwddRtuuW6hpL9 (opus), coordinator MAIN s28. r1 (FAIL @10fa43d4): reports/review-balance-core-r1.md.
Branch **review/balance-core-r2 @ baff0824** = 9abcfa72 + merge origin/main 0f61ff92 + merge origin/main 7abaf07a; origin/main is an ancestor → fast-forward.

## Reviewer merge work (in the r2 branch)
- Conflicts j2 / j7 / jbal2 / assemble.py / generated files. j2: main's ghenN(BAL.ghen.*) text + branch artO / artOE (Múa yến tiệc, the 4 Emperor art acts). j7 empnight: main's BAL.visit.minSung / BAL.visit.show.o + branch artOE(S,bestArt().k) (BAL.visit.show.w now unused). jbal2: both blocks kept. assemble.py: main's list (jvoice, jtq14, jvisit, jfe, jmapc, jksize, jseat) + jbalcore before jcoopone (my first resolution dropped main's 7 modules → caught by quickcheck G2 "kSay is not defined", fixed in a8175508).

## r1 items — checked
| # | r1 item | r2 check |
|---|---|---|
| 1 | BAL.orig clash | start table = BAL.start; one-core-land is in the branch and on main; guard: no second value |
| 2 | bestArt shadowed | stBestArt(p) used by stealArtB / stealArtN / npcStudy, own arts, Thêu/Nấu count; balance-core.js 42/42 in 5 runs (r1 flaky case gone) |
| 3 | night split | independent re-measure (own loop, seed 7300, NPC states, 245 person-weeks — small): Tranh / Chặn / Thôi = N8 52/37/11, N15 69/29/1, N25 78/22/0; with holder cost N8 26/18/56, N15 79/13/7. Chặn best 68 % when her best art is his favoured, 36 % neutral, 3 % disfavoured; EV gap < 1 Sủng in 38 % of states. Worker (966 NPC + 3900 her person-weeks): N8 34/60/7, N15 46/53/1. Chặn ngự giá is now a real option (r1 real: 18 %); Tranh sủng still leads as the stake grows (the safe choice for big nights is natural). Accepted. |
| 4 | guard syntax | one-core-guard PASS: 0 fails, inline 6636 vs baseline 6691 (−55) |
| 5 | bậc × N leftovers | j75 / jkc / j85 / j7 / j68e: no rule site left; contest scores j71/j82 and minigame speed kept with reasons — OK |
| 6 | HH rate + gates | gate table §11.3 sensible (Y cure → bậc 3; thơ truyền → bậc 3). Sens bot reaches HH 0/42 on main too → OD:L20 HH ~32 % not checkable with this bot; rank ladder equal (2.38 vs 2.33). Died < 3 y 2 → 7 of ~40 (noise-level) = watch item after go-live |
| 7 | thd day-1 beat | BAL.art.gate.thiFame 3 |
| 8 | "gấp đôi" | xWord(BAL.art.emp) → "gấp rưỡi" |
| 9 | old ladder words | Tông sư badges; kit generic chip hidden on art cards (bar:false at bậc 5). KIT REQUEST (tier names in kitSkillCard steps) = optional |
| 10 | one fact three numbers | kicker = tier, bar = points/100; "Bậc n/5" steps remain (open ⓘ) — acceptable |

## Tests (on baff0824 / a8175508)
balance-core.js 42/42 (×5, 0 page errors) · night-steal-unit PASS · one-core-guard PASS · coop-e2e (live Worker) 60/60 · quickcheck.sh PASS incl. core gates (open 1170 ms, old save ok, perf new/live render 343/315, buổi 948/921). coop-night not re-run (105/105 in r1; co-op guards unchanged).

## Notes for main / owner
- night-final must use BAL.steal.keep {base,sung,sac,art,rung,gain,oan,npcP}, BAL.start, and print word(stealShown(a,mode)) on the flip buttons (worker told night-final).
- §7 owner table (r2) corrected; still needs her yes before go-live (main's call).
- Watch after go-live: early deaths (< 3 years), 7 vs 2 of ~40 bot lives.

## OPEN — early-death gap NOT yet proven noise (s28 asked: bigger run or FAIL) → verdict above is CONDITIONAL
s28's r2 brief (queued 01:45Z) reached me only after the verdict. The sens-bot gap died < 3 y 2/42 (main) vs 7/41 (branch) has Fisher p ≈ 0.08 — not proven noise.
Until a bigger run settles it, treat **PASS baff0824 as conditional** (do not go live on it alone).

## HANDOVER (reviewer rolled over: START_CTX ≈ 9 % + 25 % ≈ 34 % reached; owner OD:L1217 / 16/11 08:22Z s14 — the COORDINATOR opens the successor)
Successor task (one item only): on review/balance-core-r2 @ baff0824 vs origin/main 7abaf07a, run the same sens-bot life run the worker used
(dev/measure/runb.js + inbc.js + inns.js, inpage6 sens bot, 9-origin rotation, HHSTOP; see reports/balance-core.md §11.4) with ≥ 120 lives per side
(parallel shards under the box's CPU budget; the kchh.js harness is ~10 min/life, too slow). Report died < 3 y per side + causes + Fisher p.
p ≥ 0.2 and the gap < ~8 points → PASS baff0824 stands; a real gap → FAIL with the cause (worker's guess: slower Tâm cơ / Y bậc for poison detection, BAL.art.gate.yCure).
Everything else in r2 is checked (table above). Worktrees removed; no scratch left.
