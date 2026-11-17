# face-fit + blush-step sheet (toil-looks8 worker)
PRIORITY #1 CHECK: OD 17/11 ~21:15Z (blush steps), 17/11 toil-looks5 FACE-FIT note | main dev/art/mkfit (= CDN), dev/art/mkfit/mkfit.py+fixtoil.py (tools exist, reused) | review/* toil-looks5 6a3c1ef9 (repo fit d19dc9d4) | claims toil-looks8.

## TASK 1: blush-step sheet
https://ctm-img.victoria-tntt.workers.dev/img/_review/toil-looks/lod-blush-steps.png (9 numbered rows + 'ref today' row; cells Vung A | Vung B v18 | Doan trang | Kieu diem | Khuynh thanh). Her face PINNED to fig-consort-c11-tcold-a18 in every row (figFor wrapped), local fit injected. Script: dev/measure/toil-blush-steps.js on branch review/face-fit.
Measured on that face (mean R-G over both cheek centres minus bare face, 10 px discs, at the real stage size, LOD step 3): Doan 16.9 -> Kieu 25.2 (+49 %) -> Khuynh 29.0 (+15 %). v18 report on face c01: +29 % / +13 %.
Relation to the % applied: the applied % is the VISIBLE step (R-G delta), not the BAL.toil bl number. bl Doan .21 -> Kieu .31 (+48 % as a number) -> Khuynh .35 (+13 %); the visible step differs by face (skin, radius, LOD boost x alpha cap). The script solves bl per row from a measured curve (R-G vs bl) and re-measures: rows land within about +-1 point of the label (8-bit alpha limits finer): +1 % rows = bl dep .230 / tuyet .239; +3/+3 = .234 / .247. Every row therefore means Kieu/Khuynh blush DROPS to about Doan level (today bl .31/.35); rows look near-identical. Nothing in BAL changed; whichever row she picks = set BAL.toil dep/tuyet bl + re-sheet.

## TASK 2: FACE-FIT verdict (by pixels)
Sets: LIVE CDN (img/mk-fit/*.json + img/toil-fit2.json; mk-fit == main dev/art/mkfit) vs REPO copy on toil-looks branches (dev/art/mkfit, dev/art/toil-fit2.json, from commit d19dc9d4).
Method (dev/art/facefit/judge.py): for every entry that differs > 2 % in lip centre, measure the LIVE picture afresh (MediaPipe face mesh, whole portrait / top 40 % of figure, no fit row used) and score both sets (lip centre error in % of picture; 60-point RMS).
- mk-fit: 1322 entries off > 2 % (629 > 5 %, 691 2-5 %; 727 fig / 595 por; 36 files: consort-c01..c32 + player-look1-4; worst consort-c17 86, c18 80). CDN error median 4.8 %, p90 10.1 %, max 24.8 %; REPO error <= 0.01 % on ALL 1322. => repo set is right for every mk file.
- toil-fit2: 1169 rows off > 2 %: CDN median 5.3 %, max 24.3 %; repo better on 1167, tie on 2 (thaihau a36/a51, both ~2 %).
- 21 thaihau toil rows are > 2 % off in BOTH sets (repo 2.05-7.07 %): residual, need a re-fit (no mk-fit for them).
- Cause: CDN fit files are older than the pictures/refit (stale); repo has the refit. (Caveat: the repo points came from the same detector family, so 0.00 is partly by construction; the independent check is the lip centre of the live picture, shown in the shot.)
- c05-t4: por CDN 5.8 % off (repo 0.0), fig CDN 8.4 % (repo 0.0).
Corrected set (staged, not live): https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fit/ : mk-fit/*.json (99 files, 1741 entries changed vs CDN incl. small diffs), toil-fit2.json (1213 rows changed); = repo values for every differing key, CDN-only keys none. Before/after shot (red = live CDN lip row, green = corrected): .../face-fit/before-after.jpg
Table: before = median 4.8 % / max 24.8 % off (mk), after = max 0.01 %. Full per-file verdict: dev/art/facefit/judge-result.json (branch review/face-fit, [file, kind, cdn_err, repo_err]).
Go-live (after review PASS): copy staged mk-fit/*.json and toil-fit2.json over img/mk-fit and img/toil-fit2.json (cdn_sync pull right before; manifest guard), bump SW cache of the fit files; NOTE main dev/art/mkfit (== old CDN) must take the repo values too, else the next fixtoil/mkfit run restores the stale set. Pictures md5 in dev/art/mkfit/md5.json were not re-measured.
Tests: not a game change (data only); game-driven check on c05-t4 after go-live recommended (sheet script with live fit).

## HANDOVER
Done except review; context ~45 %. Branch review/face-fit 7068619d (tools + judge result only; images/fits on CDN staging).
