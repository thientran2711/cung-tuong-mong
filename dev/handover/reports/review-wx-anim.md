PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 4 | main 0 | review/* 1 (review/wx-anim, this job) | OD L1678 (h)(i) read verbatim
# review-wx-anim (SMALL reviewer, OD:L1370 UI/fx) — PASS 03f97e15
Branch review/wx-anim-r1 = review/wx-anim be36f27 + merge of origin/main 579e8976 (incl. kit-fx-register-r1; conflicts only in generated index.html/sw.js, rebuilt). Re-ran after main moved: wx-khac2 §1-§10 ALL OK at 755x1000 and 1180x820, one-icon probe OK, old save 16/16. origin/main is an ancestor of the head.

## Checks
- (h) every kind x nhẹ/vừa/nặng has its own jfx row: wx-khac2 §10 (all 11 kinds x 3 levels: 3 distinct row ids, cap x a0 non-decreasing nhẹ<=vừa<nặng) OK. Rows live only in jfx KF_WX + jwxk BAL.wx.day (fxLv/fxLvK/bolt/heatSe); diff has no CSS and no new sprite (painted atlas only) = KIT FIRST kept.
- (i) exactly ONE weather icon: DOM probe at 755x1000 and 1180x820, 11 kinds x nhẹ+nặng: .kmwx count 1 every time, none inside #stage, 0 page errors.
- wx-khac2 §1-§10 on the rebased build at 755x1000@2 and 1180x820@2: ALL OK, pageerrors 0 (§8 = weather never closes a place: OK).
- Old save: oldsave-r1.js (old build 03a776e4 save -> new build) 16/16 at 755x1000, 1180x820, 1366x1024; §5 old S.wx OK.
- Perf smoke (755x1000, same state on both builds, no throttle; CPU x4 run is unreliable here because the app's own quality guard drops ambient fx under throttle): rain/snow/heat/cloud/fog fps equal to main (60.3 vs 60.3; rain 58.5->53.3 vs main 56.5->51.8). No regression found.

## Not verifiable here (note for foreman)
Software GL under-draws sprites: nhẹ vs nặng of heat/cloud/fog/frost is not readable in my shots (rain/snow/storm streak counts are). Worker's ART REQUEST fx-fogbank (+fx-heatglare) stands; confirm fog/cloud/heat on a real Fold. My live particle-count probe was inconclusive (count stuck at the ambient layer), so I rely on test §10 caps and the worker's counts.

## Small faults fixed by me: none needed (merge + site rebuild only).
## Verdict: PASS 03f97e15 (review/wx-anim-r1)
