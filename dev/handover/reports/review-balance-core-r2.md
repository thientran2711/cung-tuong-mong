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
<<<<<<< HEAD

## r2b — early-death gap re-measured → **PASS baff0824 STANDS (no longer conditional)**
Reviewer session_01UV1Szk2uZjmbYdXJKyXFCH (opus; START_CTX ≈ 5 %), coordinator s28 → s30. No game code changed.

**Setup.** Both builds assembled from their own tree (dev/build/assemble.py): branch review/balance-core-r2 **baff0824** vs origin/main **7abaf07a**. Runner = dev/measure/run_par.js (seeded Math.random per page, pictures/sound blocked) with inpage6.js sens bot + inty.js, HHSTOP on, 8-origin rotation from inpage6 (bd/cnv appear only via story routes), 3 pages per side, **same seeds** (seed0 1, page k → 1+101k). Each life is stopped at month 36 (record "SURV3") because only "ended before 3 years" is asked; this cut the run from ~17 h to ~2.5 h. First **150 lives per side** used. 0 page errors, 0 TIMEOUT / CRASH.

**Bot harness fault found (both sides, measure tool only).** Since main 42936b3f (KIT §84 greyed options, need[] → c.off) the sens bot in dev/measure/inpage6.js picks greyed options (e.g. "Tố giác X" in "Sau vụ mưu hại" without evidence); chooseM refuses them, so the life sticks → TIMEOUT. First try: 45 of 52 lives TIMEOUT. Fix used in my scratch copy (one filter term): `okIdx=…filter(([c])=>!c.off&&!(c.fx&&…))`. **Main/measure owner should apply this one-line fix to dev/measure/inpage6.js** — every bot run on current main is otherwise mostly TIMEOUTs (the worker's 41/42-life run §11.4 predates 42936b3f).

| ended before 3 years (150 lives each) | main 7abaf07a | branch baff0824 |
|---|---|---|
| all endings < 3 y | **27 (18 %)** | **20 (13 %)** — Fisher p **0.34** |
| her own death < 3 y (not the Emperor's) | 15 | 12 — Fisher p **0.69** |
| · poison (Trúng độc) | 2 | 5 — p 0.45 |
| · childbirth (khó sinh / băng huyết) | 7 | 3 |
| · illness (trọng bệnh, lao phổi, kiết lỵ) | 6 | 4 |
| Emperor dies (illness / poison / assassin / stroke) → her life ends (killed in succession, xuất gia, xuất cung) | 12 | 8 |
| reached Hoàng hậu | 0 | 0 |
| survivors at 36 months: avg Tâm cơ / Y points | 100 / 0.3 | 95 / 0.2 |

**Reading.** The r2 gap (2/42 vs 7/41) reversed with 150 lives: the branch ends early slightly LESS often, and no difference is near significance (p 0.34 / 0.69). The only cause higher on the branch is her poison death (5 vs 2, p 0.45, small counts). It is not driven by the new numbers the worker suspected: the bot takes no Y lessons on either side (Y ≈ 0, so BAL.art.gate.yCure / Y detection play no part), and Tâm cơ is near the cap on both by month 36 (95 vs 100). → No BAL lever to change. Watch item at go-live: poison deaths in the first 3 years (expected ≈ 1–3 %).

Tools/output: scratch only (runner + patched inpage6 copy + analysis script), deleted after the verdict; worktrees removed.
=======
>>>>>>> 5d649e20 (report: story-bot REPORT READY line)
