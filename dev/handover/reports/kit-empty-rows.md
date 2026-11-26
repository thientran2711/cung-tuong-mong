
## REVIEW (RV-KK39)

PRIORITY #1 CHECK: OD 26/11 ~06:50Z (E) «ĐƯỢC không / TỐN không → hide empty rows everywhere», 25/11 ~23:40Z K-ICO-HOME, D4 review 26/11 (fig spill) | main KIT §6.7, §56.4b, §103 | review/* review/kit-empty-rows, review/kit-stage-r2, review/firstcard | claims KK39.

Branch review/kit-empty-rows cda34e5e (on review/kit-stage-r2 22e318d5). Reviewed by RV-KK39 (SMALL reviewer), 26/11.

**RESULT: PASS**

Checks (Fold 755x1000 + iPad 1180x820):
- `node dev/test/empty-rows.js index.html`: TOTAL 0, PASS (44 frames per device). LIVE 3af7896e: 273 empty rows (LIVE brief said 261).
- `node dev/test/fig-spill.js index.html`: PASS (iPad 90 frames / 39 figure frames; worst spill 10 px, limit 40+2). LIVE: FAIL 17 (e.g. ipad ev:pmPick XL spill 81).
- Law 9/11: ONE predicate `kitRowNil` (j19) is asked by every row writer (kaRows/kaBody, kitRows, kitOptFinal, cardH grid via `kgPair`, kitOptEqual); the scan covers every `.kr` row, act-card grid pair, person pop-up and PEND frame (+ c2a). BẠI keeps «Tốn công, không được gì» (law 16); an info value «không» under a non gain/cost label is kept. Law 3: no option becomes cost-only.
- K-ICO-HOME: `place-home` is in assets.json; `plHomeMark()` = painted icon + «Nhà ta» on the Dư đồ label (seen on Fold and iPad) and in the §103 banner chip (`kmb-hm`).
- Old save made by LIVE loads: 0 page errors (0/0) on both devices.
- Merge onto LIVE 3af7896e: sources merge cleanly; only built files conflict (index.html, sw.js) = rebuild at the LAND slot. Branch carries the whole kit-stage-r2 stack (it must land with/after it).

MAIN LOOK answers:
1. «Vâng mệnh cô mẫu» (Mệnh truyện, j4.js:123) lost «Rất vững»: INTENDED, and NOT caused by kitRowNil. The meter is not a row; it is the `.kodds` chip of the title line, and it is gone because kit-stage-r2 (KK34, commit 979d5ed7, MAIN 148 order 25/11 ~23:45Z) sets `KIT_ODDS_SURE=false` in jk2b.js: a card with NO odds of its own (a certain outcome) shows no odds word. This branch does not touch jk2b.js (diff vs kit-stage-r2 is empty for that file); LIVE still has the old top-rung meter. A real roll still shows its meter. The «Tốn» row of that card was empty and is correctly gone.
   CLASH WARNING for FIRSTCARD (review/firstcard 9ba83cf0): merging firstcard with kit-stage-r2 (or with this branch) conflicts in `dev/build/jk2b.js` (kitOptOdds block, plus built files). Resolution for the merger: keep FIRSTCARD's `kitRiskOpt` / `kitEndOdds` / `KIT_END_RE` / `o.oddsP` (the true odds on life-ending options come through kaNorm → kaOdds, independent of kitOptOdds) AND keep kit-stage-r2's `KIT_ODDS_SURE=false` early return, so a sure card prints no «Rất vững» and a life-ending pick never does either. Note that with `KIT_ODDS_SURE=false` the `kitEndOdds` branch of FIRSTCARD's kitOptOdds is unreachable: a life-ending option with no declared `oddsP` shows NO word (not the chance-of-keeping-this-life word). FIRSTCARD's family scan (dev/test/firstcard-scan.py) must be re-run after the merge.
2. iPad 1180x820 Dư đồ: no large empty white area under the map in this build, and none in LIVE either (map fills the whole panel, sand background to the bottom bar, same as LIVE). Not new → no fault. (Fold: map + 2 info cards below, same as LIVE.)

Numbered notes (none blocks PASS):
1. The old-save screen of this branch still shows the 0–100 total «Tiến bộ 3/100» on the skill cards; that is the bug fixed by review/kit-bac-progress (PASS, separate branch). Land bac-progress too; the two merge with only built-file conflicts.
2. `dev/handover/reports/` had no report of this branch; this file was created for the review.
