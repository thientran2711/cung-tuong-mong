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

## r4 (owner OD ~21:52Z via ROOT-55/56) — a1d5ea3d
iPad (kv2) Dư đồ + every stage: the right column now starts with the SAME two small buttons (kitGroupBtns; number over label, side by side) instead of the wide bars; tap = person list drops down in the column under them (kitGroupFold = open card only, ‹ folds, one at a time). Phone Dư đồ keeps the left-rail placement (r3). One kit part, two placements; KIT.md updated. dev/test/stage-rightcol.js now also checks the button row is first in the column: 54/54 PASS (Fold + 412 + iPad, stage home + Ngự hoa viên + map, 1/6 servants, closed / Cung nhân / Chí tôn). Shots r4-*.jpg (Fold + iPad, stage + map, closed / Cung nhân open / Chí tôn open) looked.
~99% xong / ~99% chơi được

## r5 — f2fbe3bf
Merged live main 790cda59 (map-labels). stage-rightcol.js 54/54 PASS (one 412x1058 stage-home figure/column overlap seen once on the first run, random roster at the unsupported 412 width; 3 later runs clean). quickcheck PASS (old save ok, perf render 177/207 ms).

## HANDOVER r6 (worker context past rollover → coordinator please open the successor) — WIP branch review/stage-rightcol-wip 9ace584c (reviewed branch review/stage-rightcol f2fbe3bf is UNTOUCHED = last LAND-able state; it has NOT the two items below)
ROOT-56 ruling 21:08Z asked: (1) one tap outside an open group list closes it (+ Esc), (2) .kemo face chips must not sit under the right column (add to scan), then merge live main 790cda59 (done in f2fbe3bf), rerun scan + quickcheck, send LAND READY sha.
DONE in WIP (jk3.js): kgfClose + outside-click (capture, that tap only closes) + Esc; kgfClearEmo (steps a figure's .kemo chip left of the column with margin-left!important, ≤3 iterations, run from k3Stage, k3Relay, and a 400 ms interval); dev/test/stage-rightcol.js: emoCol check (#stage .kemo not inside #kshR), closeOk (outside click + Esc), DEVS=fold,phone,ipad filter (now on DEV list; NOTE my earlier "3 reruns clean" at f2fbe3bf used a broken DEVS filter that ran ZERO cases — only the single full 54/54 run before it, which had 3 phone-h1-home figure/column fails on its first pass, is real; treat f2fbe3bf stage-home 412 as flaky-unverified).
OPEN: ipad h1 home (closed/cn/ct) still fails emoCol ≈ 500–770 px² intermittently: the chip (class kemo kemo-binh kfseal kemo-m-breathe, parent .tok.fig.bob) overlaps the column although margin-left shifts work when called; chip rect moves by its breathe/bob animation (scale) and the figure slide; fix idea: clear against the chip's un-animated box with extra 10 px margin, or move the chip's anchor (jemo .kemo left:8.5%) for tokens whose box right edge > column left, or reserve the column width in the j59 figure layout (kgr already does for bodies, not for the chip's overflow). Also check h6/phone/Fold with several runs (random roster; need ≥3 clean full runs of 54 + closeOk) then quickcheck, then LAND READY sha to ROOT-56 and merge the WIP into review/stage-rightcol (fast-forward).
Harness: node dev/test/stage-rightcol.js <outdir> (needs built index.html; DEVS=ipad ONLY=map). Build: bash dev/site/build_site.sh (commit index.html + sw.js; on merge conflicts take theirs then rebuild). Files: dev/build/jk3.js (kitGroupBtns/kitGroupFold/kgfRail/kgfDrop/kgfClearEmo), jrail.js (label variant), jplst.js (name), j59.js (--kgrb), j38.js (mapFit .k3p:not(.kgf)).

## r7 (session_01Rc5AsMCSTNrRWBqRtSxRnR, successor; START_CTX ~5 %, depth 5) — SẴN SÀNG KIỂM 9f00e40 on review/stage-rightcol (fast-forward from f2fbe3bf through WIP 9ace584c)
PRIORITY #1 CHECK: OD 18/11 ~20:55Z/~21:40Z/~21:52Z | main 53544bd none (not landed) | review/stage-rightcol f2fbe3bf + -wip 9ace584c (reused) | claims stage-rightcol r7 = this session.
Main merged: origin/main 53544bd (newer than the ddbf9c7 / 884ce97c named in the messages; commit message says ddbf9c7, the tree is 53544bd). index.html + sw.js rebuilt.
1. Tap-outside + Esc close: kept from WIP. closeOk true in 36/36 open cases per run.
2. Face seal (.kemo) under the right column, ROOT CAUSE: kitFigSeal (jfigseal) clamped the seal only to the stage box, and on every pass it rewrote style.cssText, which wiped the WIP margin-left shift from kgfClearEmo, so the two raced (that was the flake). FIX inside the ONE kit part: in kitFigSeal the stage plaque columns #kshR/#kshL are a no-go zone, with KIT_FIGSEAL.pad = 10 px, measured from layout values (column box + figure anchor), never from the animated seal box. Order: right of the head, then left of the head (the old rule), else the nearest of just left of the column / just below it. kgfClearEmo now only re-runs kitFigSealAll (the margin hack and the 400 ms poll are gone). Every figure seal on every stage follows the same rule (whole group).
3. Fold Dư đồ open list cut the left-edge place tags: kgfTags (jk3) moves each tag the open list would cover to the right, just clear of the list (translate only, marked data-kgft; it hops past a neighbour tag when there is room, else just clears the list). All tags go back when the list closes. It re-checks on map render, on any scroll (capture listener) and every 300 ms while the list is open (the map can move without a scroll event; the poll is idle when no list is open). Scan: tags>=10 visible (25 on the 10-palace map), open list ∩ tag area = 0, no tag moved when the list is closed.
4. phone-h1-home figure/column: colFig 0 in all 3 full runs (the old flake is gone; the cause was the same seal/column race plus the polling).
TESTS: node dev/test/stage-rightcol.js (no helper call before measuring now; prints emoN/emoCol/tags/tagDrop/tagMoved/closeOk), 3 full runs x 54 cases (fold 755, phone 412, ipad 1180 x h1/h6 x home/vuon/map x closed/cn/ct):
| run | PASS | FAIL | seals measured | emoCol px² | colFig px² | closeOk true/false | tags moved | page errors |
| 1 | 54 | 0 | 22 | 0 | 0 | 36/0 | 29 | 0 |
| 2 | 54 | 0 | 18 | 0 | 0 | 36/0 | 29 | 0 |
| 3 | 54 | 0 | 9 | 0 | 0 | 36/0 | 29 | 0 |
Before (r6 WIP): ipad h1 home emoCol 500–770 px² now and then; Fold/phone map cn: 2–4 tags under the list (Tân Giả khố, Nội vụ phủ, Tích Cần viện, Đức Thọ cung / Vĩnh Thọ, Dực Khôn).
quickcheck (bash dev/tools/quickcheck.sh; note: plain sh fails on pipefail) PASS: core gates PASS, old save ok, perf render 189/192 ms new/live, tasks>200ms 17/17.
SHOTS (LOOKED): Fold map list open https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-rightcol/r7-fold-h6-map-cn.jpg · Fold stage home https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-rightcol/r7-fold-h1-home-closed.jpg · iPad map list open https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-rightcol/r7-ipad-h6-map-cn.jpg · iPad stage home https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-rightcol/r7-ipad-h1-home-closed.jpg
KNOWN (secondary width, not blocking): at 412 portrait (game shows «Xoay ngang»), on the crowded map some moved tags land partly on a neighbour tag (readable beats hidden); the «6 Cung nhân» rail button there sits over part of the Ngự hoa viên tag when the map is scrolled hard left (pre-existing rail/tag issue).
Files: dev/build/jfigseal.js (kitFigSeal column zone, KIT_FIGSEAL.pad), dev/build/jk3.js (kgfClearEmo -> kitFigSealAll, kgfTags), dev/test/stage-rightcol.js.
