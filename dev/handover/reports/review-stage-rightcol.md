
# review-stage-rightcol (rightcol part) — reviewer verdict
PRIORITY #1 CHECK: OD 18/11 ~20:55Z + 9/4 rules | main jk3/jplst | review/stage-rightcol 25747b2 | claims stage-rightcol session_01Rc5AsMuwoEKePMdcju7qZi
Merged origin/main fa411d6f onto 25747b2 (conflicts only in generated index.html/sw.js, rebuilt) -> review/stage-rightcol-r6 @ f30288a (pushed).
1. kitGroupFold: one kit part used by stage column + Dư đồ column (order kgf>kgf>kas>k3py / kgfs>kas>k3py), kitCrewPlaque gone. PASS (law 9/11).
2. dev/test/stage-rightcol.js 36/36 PASS (Fold+iPad, 1/6 servants, closed/Cung nhân/Chí tôn, home+vườn+map): chip overlap 0, name<=2 lines, no frame, no cut text, 0 page errors. Looked at Fold h6 closed/cn/ct/map and iPad h6 closed/cn/vuon-ct, h1 map-cn. 1366x1024 not shot by script (spec'd; not run).
3. Fold map vs LIVE-main-fold-h6-map-closed: map fills its area, no empty band. PASS.
4. Wording «Thiện cảm» shown in lists. PASS.
5. quickcheck PASS (open 1611 ms, old save ok, core gates PASS, render 219/240, tasks>200ms 21/22).
Notes (non-blocking): night map tags framed = map-labels part (separate review). Legacy "Lòng" string remains only in jk3.js k3crewChip code name/comment, not player-visible in shots. Open Cung nhân with 6 on iPad scrolls inside column (by design).
VERDICT: PASS (rightcol part) f30288a

## SUPERSEDED (MAIN ROOT-55 note 20:39Z)
Owner changed the Fold Dư đồ group layout (OD 18/11 ~21:40Z): 25747b2 / f30288a is superseded. The PASS above is VOID for landing; it only describes the old layout. Review stopped; awaiting the new sha from MAIN.

## r4 review — review/stage-rightcol @ a1d5ea3 (based on fa411d6f; verdict to ROOT-56)
PRIORITY #1 CHECK: OD 18/11 ~21:40Z + ~21:52Z + ~20:55Z | main jk3/jrail | review/stage-rightcol a1d5ea3 | claims stage-rightcol
Old f30288a PASS is VOID (superseded). Worktree review/stage-rightcol-r7 = a1d5ea3 (no merge needed, main fa411d6f already ancestor).
- ONE kit part, two placements: kitGroupBtns/kitGroupFold (right column top: all stages + iPad map) and kitStageRail label variant (Fold/phone map, left rail). Wide «Label · N ›» bars gone everywhere (test: bars===0, 2 buttons, btnRow). KIT.md §31.2b updated. PASS.
- dev/test/stage-rightcol.js 54/54 PASS (Fold 755x1000, phone 412x1058, iPad 1180x820 × 1/6 servants × closed/Cung nhân/Chí tôn × home/vườn/map), 0 page errors. Whole group = every tab with a right column: stage + Dư đồ covered; other tabs not part of this column (column only exists on stage host + map). 1366x1024 not run.
- quickcheck PASS (open 1733 ms, old save ok, core gates incl. kit-conform PASS, render 188/238, tasks>200ms 17/18).
- Wording «Cung nhân» / «Chí tôn» / «Thiện cảm» OK.
- LOOKED: fold h6 map closed/cn/ct, home closed/cn; ipad h6 home closed/cn, map closed/cn.
Extra checks from ROOT-56:
(1) CONFIRMED (fold-h6-map-cn): open Cung nhân list (6 people) covers the left-edge tags Tân Giả khố (half), Nội vụ phủ (name cut), Tích Cần viện (name cut). Tags under an open list are neither readable nor tappable. Not covered by a test (test only checks rail/list overlap + "no tag fully under the rail buttons"). Owner decision: either accept (list is temporary, tap button again to close) or shift tags/map; I flag it, not a kit-law failure. Law 9/11 same for all lists.
(2) NOT REPRODUCED: ipad h6 home closed (and cn/ct open, h1) — the maid face chip sits ~100 px left of the column, clear of «Ân sủng». The test measures figure bodies, not round face chips, so it could not catch the r4 shot ROOT-56 saw; a scratch check of #tokens children vs #kshR over all 54 states found 0 overlaps, but my selector was not proven to match the face chip. Recommend adding face-chip vs column to stage-rightcol.js.
VERDICT: PASS a1d5ea3 (rightcol part), with flag (1) for the owner's call. Do not land without deciding (1).
