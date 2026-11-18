# stage-rightcol — branch review/stage-rightcol f36d01e (r1 after ROOT-55 notes) (depth 2)
PRIORITY #1 CHECK: OD Chí tôn 4 + Cung nhân 9 + place banner 18/11 ~02:50Z/~03:02Z + ~20:55Z | main jk3 k3court/k3maid, jplst #kpname, j59chips | review/* maid6-sample eb73871 (mock), stage-here (not touched) | claims maid6-sample -> this worker.

## Done
- KIT PART `kitGroupFold(key,label,n,items)` (jk3.js; KIT.md §31.2b + kit sample §31.2b; replaces kitCrewPlaque): closed row «Label · N ›» no faces; tap = person cards drop down in place, one open at a time (`window.__kgfOpen`, kept per session).
- Column order (stage host): «Cung nhân · N» (personal maid + S.staff maids/eunuchs, face+name+Lòng, tap = Cung nhân tab) → «Chí tôn · 3» → Ân sủng → Nguy hiểm chung. Dư đồ map grid (jmapc) left on the old chips (not in scope; follow-up if wanted).
- Place name: plain text on the picture, no frame/not fixed-width, 2 lines (hall / palace; 1 line when a place has one name), shadow token `--kts` (also used by figure name tags); column shifted down by --kpnh.
- "+N people" chip corner: j59chips sets `--kgrb`; column max-height subtracts it → overlap 0 px.
- Fixed while testing: personal-maid chip showed a garbled value (hud text) → now S.maid.loyal.
## Test
`node dev/test/stage-rightcol.js <out>` (needs built index.html): Fold 755x1000@2 + iPad 1180x820@2 × 1 / 6 servants (rank 6) × closed / Cung nhân open / Chí tôn open × places home + Ngự hoa viên = 24/24 PASS: chip overlap 0, name over column 0, name/column over figure body 0, closed column never scrolls, name ≤2 lines, no frame on name, no cut text, 0 page errors. Open Cung nhân with 6 on iPad scrolls inside the column (by design, capped above the chip). Also run (20:10Z): oldsave-r1 16/16 ok (Fold, iPad 1180, 1366); dev/tools/quickcheck.sh PASS (core gates, old save ok, perf new/live render 147/174 ms). Not run: phone sizes.
Shots: dev/handover/shots/stage-rightcol/ (8 jpg), each looked.
## Caveat
Open list shows "Thiện cảm" label (existing module rewrites "Lòng"). Entry-line chip at top (jplst) is untouched.
~95% xong / ~95% chơi được

## r1 (ROOT-55 notes 20:06Z)
(1) based on live main 13bb8c88 (no merge needed). (2) oldsave-r1 16/16. (3) quickcheck PASS. (4) Dư đồ map column now uses kitGroupFold too (kv1 portrait: two folds side by side in the top row, open list drops over the map; iPad kv2: same column as the stage); k3maid removed (one version); map added to dev/test/stage-rightcol.js: 36/36 PASS (stage home/Ngự hoa viên + map, Fold + iPad, 1/6 servants, closed/Cung nhân/Chí tôn). (5) label = «Thiện cảm» (VANPHONG L55: servant toward her = thiện cảm; the old "Lòng" was only a code name rewritten at runtime) now written directly. Shots +6 (map, open lists), all looked.
~97% xong / ~97% chơi được

## r2 (ROOT-55 note 20:26Z: Fold map broken)
Cause = mine: j38 mapFit measured the bottom margin from the top of every .k3p in #kshR; the new group folds are .k3p in the TOP row, so the map thought the whole column was a bottom row and shrank to the top half (empty band below). Fix: .k3p:not(.kgf). The frameless night tags were the separate owner bug (map-labels-missing): merged 718c249 + main 9366028. Same-save compare: LIVE-main-fold-h6-map-closed.jpg vs fold-h6-map-closed.jpg (map fills its area again, tags framed). map-labels-scan 755x1000 + 1180x820 day+night: all PASS; stage-rightcol 36/36 PASS (one earlier ipad h1 home fail was a mid-reveal figure ghost in the shot, passed on re-run). Branch 25747b2.
~98% xong / ~98% chơi được

## r3 (owner ruling ~21:40Z via ROOT-55: no wide bars on the phone map) — beccbba
Phone (portrait kv1) Dư đồ: the two bars are gone. kitStageRail got a label+count variant (jrail.js); «Cung nhân» / «Chí tôn» are two rail buttons under the book / scroll icons; tap = list drops down in the left strip of the map (#kgfdrop under the rail, above Ân sủng, one at a time, tap again closes). iPad map + stage unchanged (right-column kitGroupFold). Merged main fa411d6; KIT.md updated. Scan dev/test/stage-rightcol.js now Fold + 412x1058 + iPad: 54/54 PASS (rail buttons 2, no bars, list inside map, list/rail overlap 0, no tag fully under the rail buttons, closed + both open, 1 and 6 servants). 412 shows the game's own "Xoay ngang" overlay (unsupported width), layout still checked. Shots r3-*.jpg looked.
~99% xong / ~99% chơi được
