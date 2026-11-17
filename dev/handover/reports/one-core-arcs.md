# one-core-arcs — ONE CORE F2 arcs (worker session_01N1tNP5MRPzxmbFfWjw6LuT, Foreman B)

PRIORITY #1 CHECK ('one-core|go:|sc:|BAL.road.fx|BAL.arc' at brief time): OD 6 | ledger 0 | claims 8 | main 15 | review/* one-core, one-core-land(-r1), one-core-dup 16d4925f (base); no one-core-arcs branch existed. At report ('one-core-arcs|BAL.arc|jbalarc'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 1 (this branch).
START_CTX ≈ 4 % of 1M (rollover ≈ 29 %, ceiling 60 %); finished inside the budget, no handover needed.
Branch review/one-core-arcs, tip c682afe6 (base 16d4925f; merged origin/review/one-core-dup 648461b5 + origin/main 6c4f21c3; generated site files = main's).
Owner rules: OD:L1267 (ONE CORE), OD line 1500 (17/11 ~03:00Z duplicate-rule hunt).

## What moved (values byte-identical; data files keep words, flags, story logic)
- NEW dev/build/jbalarc.js (assemble.py: right after jbal.js / jbaleff.js): BAL.arc
  - fx[<arc>] = {beat:[option {c,w,l,o,sc,g}|0], E:{end:{fx,sc,k,g}}} for 54 ARC67 arcs (47 j67 + 3 j96 tư tình + 4 jorigins); gb[<beat>] = the 10 shared GB67 complications.
  - g = typed amounts of go: closures (relAdd/oanAdd/e67ally/pun/foe/dad …): the closure reads G[i] (G = third parameter, passed by arcFx).
  - odds o: number or rdOdds term list (same left-to-right order → bit-identical); new rdOdds terms in jroad.js: dz (S[x]||0)/k, mz (S[x]||0)*k, a S.arts[x]*k.
  - rare[<arc>] = {p,np,sc,c,fx,bar,g} for the 47 j97 R97L rare endings; x conditions read AR(a).bar and their texts PRINT it (`Đức từ ${AR(a).bar}`).
  - tier {win,mid,lose}, r97.stay, ntItem (Ngự tứ hairpins), ms (milestone rewards), e67 (heirNo/demote/away), ign (ignored-arc penalty), questCut + quest (origin finale fx), item (j67 keepsakes), card (Mệnh truyện card cost; its khắc printed via cardCost), alt (jstory ALT67 routes), t96 (j96 tư tình month drift + c_wed).
- j67.js: arcFx / arcGb / arcOpt / arcBeats (fill at registration: ARC67.<id>=arcFx("<id>",{…}); Object.assign(GB67,{…});arcGb();). Texts that typed numbers now print the constants ("Sủng ${W.sung}", "Danh ${BAL.arc.ign.danh}", "Sức ${…}, ${cardCost(…)} khắc").
- jroute.js → BAL.route (jbal.js block, keys added at its end): heatW (rtHeatW word cut points), seen {aff,rel}, oan {report,threat,ngWin,demand,frame}, threatEv (text prints it).
- jstory.js: ALT67 option numbers → BAL.arc.alt; RDQ.maidLoy registered.

## DUPLICATE-RULE HUNT (found in my files)
| concept | before | after |
|---|---|---|
| origin-finale reward tier | j67 chFinale67 typed `e===0?3:e===1?1:-1` = second copy of BAL.road.finTier | reads BAL.road.finTier |
| witness route td_an.c1 [0] (kho củi) | jstory ALT67 AND the old-story route (j4 td1 hook) each typed suc −6, odds 40+maid/3+mat*4, Danh −3 | both read BAL.arc.alt["td_an.c1"][0] |
| "Sủng −3, Emperor stays away" | typed twice (j67 lose endings «Lộ chuyện cũ» + «Lật án bất thành») | BAL.arc.e67.away |
| Ngự tứ hairpin wear gain | j97 {sac:5,danh:3}… AND j92:82 (wardrobe) types the same three tables | j97 → BAL.arc.ntItem; **j92 NOT touched (F3 / lead worker's file): reported to session_01N1tNP65Hp1rVzsB41r5fFh** |
| rdFx (roads, jroad.js) vs arcOpt (arcs, j67.js) | two fillers of the same shape | NOTE for worker 2 (roads): when you add sc/g/k to rdFx, call arcOpt(x,o) (loads earlier) instead of a third copy |

## Guard (dev/test/one-core-guard.js, 0 fails, --update only shrank; no --allow-grow; guard code not changed)
| module | before (16d4925f baseline) | after |
|---|---|---|
| j67.js | 2091 (fx 1510 · sc 381 · k 120 · amt 66 · t.stat 12 · ladder 1 · t.unit 1) | 0 |
| j97.js | 275 (fx 182 · sc 47 · cmp 37 · amt 7 · k 1 · t.stat 1) | 2 |
| j96.js | 147 (fx 124 · k 11 · sc 5 · roll 4 · amt 3) | 0 |
| jorigins.js | 33 (k 12 · sc 21) | 0 |
| jroute.js | 9 (amt 6 · k 2 · ladder 1) | 2 |
| jstory.js | 8 (fx 5 · sc 2 · t.stat 1) | 0 |
| **F2 total** | **2563** | **4** |
Left (reason): j97 `nt:1` ×2 = the Ngự tứ ITEM FLAG (IT[k].nt), not the stat nt — guard false positive. jroute `k:1` ×2 = khắc cost of two rtCards (rtCard k = khắc, not an ending tier) — the whole family is ~31 route cards with typed khắc (k:0..4); not moved (needs one BAL.route.kh per card id) → Foreman B to decide (worker 2 / F3 / follow-up).
Also NOT moved (guard does not count, listed for completeness): j96 odds that use local state with clamps (cl(100-lộRisk(…)-sus/5,10,90), T96()/A96has terms: 18 options) stay inline; MS67 step months (6 / 8, texts "sáu/tám tháng").

## Proof (dev/measure/arc-onecore-same.js — OLD build at a ref vs NEW, both in Chromium, seeded lives, effect calls stubbed to record)
vs 16d4925f (before any move) and again vs 648461b5 after the merges: **SAME** — 8217 options/endings/arcs deep-equal (incl. every ARC67 road chapter), 3365 odds fns × 60 lives (201900 trials ===), 1908 go closures × 6 (11448 runs, call logs ===), 47 rare entries + x answers × 40 + go logs, QUEST67 / MS67 / items / e67 helpers, ALT67, rtHeatW 0..100. Harness self-test: a changed odds divisor and a changed go amount were both reported DIFFERENT.
Tools: dev/measure/arc-onecore-move.js (+ -lib, -emit, -rare-move).

## Gates
- one-core-guard: PASS 0 fails (inlineNow 9087).
- coop-e2e (assemble first): 60/60 passed (incl. single player + old save load). coop-one-world: PASS.
- story-deadline (td_an.c1 witness beat, the moved ALT routes): every check true, same checks as OLD 648461b5 (only random names/lengths differ). chapter-detail: ok, no page errors. chap-label (+ old v1 / phụ tuyến saves): titles right.
- KIT FIRST: no UI change (no chip/row/frame added). Shots (scratch only, not in git): Fold 755x1000 + iPad 1180x820 story dialog and Mệnh truyện tab looked at — unchanged layout, moved numbers show (e.g. kho củi route Sức −6).
- Not run: road-rare (needs worker 2's road args; roads untouched except 3 rdOdds terms).

## Notes for Foreman B
1. jroad.js rdOdds got 3 new terms (one line) — worker 2 (review/one-core-roads) edits the same file: trivial merge.
2. jbal.js: 4 BAL.route keys appended at the end of the route block.
3. BAL.arc option numbers are the values BEFORE j67's measured halving of story Sức / Hoàng hậu costs (the halving pass still runs after registration; noted in jbalarc.js header).
4. Feature freeze respected: nothing new built; ideas: none.
