# review-one-core-arcs-r1 — reviewer verdict on review/one-core-arcs @ c682afe6 (Foreman B)

PRIORITY #1 CHECK ('one-core-arcs|BAL.arc|jbalarc'): OD 0 | ledger 0 | claims B one-core-arcs session_01N1tNP5MRPzxmbFfWjw6LuT | main 0 | review/* one-core-arcs (this), one-core-dup (base, under review r1)
Reviewer session_01N1tNP4ZHFJ1oKb2cNK3zov (opus, BIG tier). START_CTX ≈ 5 % of 1M; finished well under rollover.
Review branch: review/one-core-arcs-r1 @ f6b07eb3 (= c682afe6 + 1 reviewer commit: stronger proof script). origin/main 6c4f21c3 is an ancestor.

## VERDICT: FAIL (1 blocking item; everything else checked is fine)

### Blocking
1. **Typed go amounts of the same family left in place (LUẬT SỬA CẢ NHÓM / OD:L1267).** The brief (one-core-dup.md §2b + BRIEF worker 3) moves "the typed amounts of its go: closure" incl. e67dad / bien / kho into `g`. The single-argument calls were not moved:
   | file | typed `e67dad|bien|kho|heir|ally|pun|foe|drop(N)` left (count at 648461b5 → now) |
   |---|---|
   | j67.js | 53 → 53 (e.g. `e67dad(10)`, `e67dad(-8)` ×4, `e67dad(-10)` ×4, `e67heir(6)` ×4, `e67bien(12)`, `e67bien(8)` ×2 …) |
   | j97.js | 13 → 13 |
   Cause: the guard `amt` regex needs a `(` or `,` BEFORE the number, so a one-argument call `e67dad(10)` never matches — although the guard's own comment gives `e67dad(10)` as its example; `e67heir` is not in the list at all. So "j67 amt → 0" is a guard blind spot, not a clean file.
   Fix (worker): move these into the option / ending `g` lists (closure reads `G[i]`; e67heir's text already prints its parameter) — same mover, same proof. Fix (lead worker session_01N1tNP65Hp1rVzsB41r5fFh, guard owner): make `amt` match one-argument calls and add `e67heir`; this will also surface the same family in the road files (worker 2) — baseline recount is the guard owner's call.

### For Foreman B to decide (not blocking this branch; same ONE CORE spirit, outside the frozen guard kinds)
- `evA(S,v,N)` / `evStory(q,N,…)` evidence amounts with typed texts ("chứng cứ +1", "Chứng cứ về Hoàng hậu … +2"): j67 4, j96 2, jroute 3 (jroute's threat one was moved to BAL.route.threatEv; the others not).
- j96 `adj96({h:…,t:…,sus:…})` tư tình heat amounts: 77 typed objects; maid loyalty `+8 / −12`, kid `tal +5` / `hp +15` texts typed (j67 st_con, j96).
- jroute rtCard `k:` khắc costs (~31 cards) — as the worker reported.

### Non-blocking note
- `arcOpt` assigns the BAL objects by reference (`o.c = x.c`), and j67's halving pass (j67.js ~1577) then halves `suc`/`hh` IN PLACE — so at runtime BAL.arc.fx holds the halved numbers while jbalarc.js shows the raw ones. Values in play are unchanged (proof), but the rulebook is mutated at load. Suggest: copy in arcOpt (`{...x[k]}`) or write the halved numbers into BAL and drop the pass (owner's measured halving kept as a BAL rule). Old-story td1 route passes `BAL.arc.alt[...].c` by reference as `fx` too (nothing mutates it today).

## Checks
1. **No value changed.** `node dev/measure/arc-onecore-same.js` vs 16d4925f and vs 648461b5: SAME.
   Proof audit found a hole: the seeded life had no `rivals`, no `S.kids`, no `S.tm96` → **81 go closures (ke14, st_con, st_dong, td_an_*, td_ke_*, tm96*) and 13 odds fns (tm96*) threw on EVERY run** and were compared only as equal error strings; also go runs compared only the stubbed call log, not direct `S`/`A` changes.
   Reviewer fix (commit f6b07eb3, dev/measure/arc-onecore-same.js): life gets rivals / kids / S.tm96 and every go run also compares JSON of S and A after the call; prints a coverage line. Result now: 8217 options/endings/arcs deep-equal · 3365 odds fns × 60 = 201900 trials, **0 errors** · 1908 go closures × 6 = 11448 runs, **0 errors**, logs + S + A identical · 231 rare entries — **SAME vs 16d4925f and vs 648461b5.** Stubs record every argument (numbers/strings verbatim, objects by id).
   Not covered by the proof → hand-checked old vs new source: ≥ 60 values — j67 endings tt_co (10), tt_tranh (8), dtq_bien (9), tt_mat (14), tt_oan lose g[10]; e67 heirNo/demote/away, MS67 nhap/hau/ke, ign −3, card Sức −5 (+ cardCost = 2 khắc as the old text), questCut [2,−1], finTier = BAL.road.finTier {3,1,−1} = old `e===0?3:e===1?1:-1`; j96 tm96Month fade 35/20/30/1, amb 30/8/2, note 72/50/4, cool 25/1, c_wed tinh 15 + th 4; jroute heatW 15/35/60/80, seen 45/5, oan 40/25/30/40/50, threatEv 2; jstory td_an.c1 [0]/[1] (c, odds terms, l) and the old-story td1 witness route (same odds expression, Sức −6, Danh −3). All equal.
   The 3 "duplicates fixed" (finTier, td_an.c1 [0], Sủng −3 «away») were equal copies — confirmed.
2. **Texts print the constant**: e67heir / e67demote / away / item / ign / card / AR(a).bar / BAL.route texts read the constant; no `%` in new player text; wording unchanged (VANPHONG).
3. **Guard**: 0 fails (inlineNow 9087); baseline diff vs 648461b5 only removes / lowers counts (no --allow-grow); guard code untouched.
4. **Tests** (assemble.py first, utf-8 server):
   - coop-e2e 60/60 passed · coop-one-world PASS · road-rare ALL PASS · story-deadline: every check equal to main 6c4f21c3 · chapter-detail ok, 0 page errors.
   - chap-label (CHECK=1): 1 FAIL «arc head has Chương · Hồi» — **identical on origin/main 6c4f21c3** (pre-existing).
   - chap-label-oldsave (main → this build): FAIL on the v3 `.obj67` head (empty) — **identical main → main** (pre-existing); old v1/v2/v3 saves load and show the right Chương/Hồi.
   - story14-frame (this, main): no failed check, then page.evaluate TypeError `p.startsWith` in chAdvance67 at the «cung nữ» (cnv) r1-item-2 block — **same crash on main → main** (pre-existing; for Foreman B).
   - road-end 51/51 pass · road-saves 5/7 · road-full partial (see Road tests).
5. **jroad.js rdOdds** (dz / mz / a terms, one line): pure additions before the `k` branch, no existing term changed. Trial merge with origin/review/one-core-roads 75bc9f05: code merges cleanly (jroad.js, jbalroad.js auto-merged; both rdOdds edits kept); conflicts only in generated index.html / sw.js / assets.json and dev/test/one-core-baseline.json (take roads' then --update shrinks). On the merged tree: guard 0 fails (inlineNow 4916), arc-onecore-same (strong version) **SAME vs 648461b5** — roads + arcs together change no ARC67 value. Worker 2 should call arcOpt instead of a third filler (worker 3's note) — not done yet on roads, fine for now.
6. **Merge on latest origin/main**: 6c4f21c3 is already an ancestor of c682afe6 / f6b07eb3.

## Road tests (run one at a time: in parallel Chromium was OOM-killed — 'Target crashed' — not a game fault)
- road-end: 51/51 pass.
- road-saves: 5/7. The 2 FAILs are stale test premises, not this branch: «main build (dtq): no road state» and «phase-1 frame (td: road not full on this branch)» — main 6c4f21c3 now HAS the full dtq / td roads (its plan0 shows st:dtq_huynh_5 … / st:td_tha_5 …), so the test's "main has no road" assumption no longer holds. Every save loads, keeps its plan ("same":true) and plays on; 0 page errors. → test needs updating (Foreman B).
- road-full: stopped by me after 4 lives (tt_co, tt_oan …; ~5 min per life, 62 lives total) with 0 FAIL lines; every life reached chapter 14 in order. Not needed for this verdict (FAIL on item 1); rerun for the re-review.
- road-rare: ALL PASS.

## For the re-review
Worker: move item 1 (66 calls) → rerun dev/measure/arc-onecore-same.js (the r1 version; base your fix on review/one-core-arcs-r1 f6b07eb3) vs 16d4925f and 648461b5 → SAME with 0 ERR; guard 0 fails. Shots: none taken (no UI change in this branch; scratch only).
