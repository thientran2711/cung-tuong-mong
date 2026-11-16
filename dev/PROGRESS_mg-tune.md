# PROGRESS — review/mg-tune (minigame time part; owner OD 16/11 07:25Z "mức vừa": Tuyệt phẩm 20–30 % for skilled play at the matching level, random ≈ 0)

Base: review/mg-train @7e52cb1c, + review/mg-train-r1 @8f476f6f merged. Full report (before/after table, tests, risks): dev/handover/reports/mg-tune.md on the docs branch.

## What changed
- ONE time part for every correctness game: `mgPace(env, kind, el, lim)` in jmgt.js. A round keeps its whole score while the time used is ≤ fast × limit,
  then falls linearly to `keep` at time out. Numbers: `BAL.mgTier.pace` (default) and `BAL.mgTier.lev[kind].fast / .keep` (by board ease, read through mgLev).
- Wired into: jnwp calli (tho) + doiline (doi), jnwq lay (le) / sort (tc) / seat (thq) / clue (xa), jlant lamp (doden), j82 go (co).
  co and doden had their OWN speed formulas (co: typed 0.4 drop after FAST ms; jlant: BAL.lantern.speed .3) — both now read mgPace (one core).
- jnwq / jlant pass the float raw (graded once by kg82 mgGrade), like the other engines.
- BAL.nwq.lim.xa 18/17/15 → 14/10/8 s (a case is solved in ~3 s; with 17 s the time part could not bite).
- Player text (existing how strings, VANPHONG wording): "Làm nhanh thì được trọn phần." added to tho, doi, doden, le, tc, xa, thq (co already said "Ăn nhanh thì được trọn phần.").
- dev/measure/mg-bots.js: (1) engines' peek may give `cands` = pictures a person must look through; the skilled bot then thinks
  BOT.seek[0] + BOT.seek[1] × cands × U(.3,1) ms (600 + 350 ms per picture; the oracle itself knows the answer at once — mg-train OPEN item);
  only the 8 engines above give cands, so every other kind is measured exactly as before. (2) logs u = el / lim of every round (pace calibration).
- dev/test/mg-balance-vp.js: waits for S after start() on the old build (cold cache made S undefined for a moment).

## Resume
Calibration helpers were scratch scripts (what-if: raw × mean pace_new(u) / mean pace_old(u), grid over fast / keep). Re-measure with
`node dev/measure/mg-bots.js <url> tho,doi,doden,le,tc,xa,thq,co hoc/0/2,hoc/4/2,hoc/6/1 skilled,random 30 4 out.json` (graded ≥ 9 uses BAL.mgTier.kG).
