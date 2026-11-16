# PROGRESS kit-fit (kit keeper, opus, for MAIN s21)
Task: owner bugs 16/11 s21 (2) full figure touches the frame top → equal gaps above chip / below feet in every frame with a full-body figure;
(3) option cards: tall picture + short text leaves empty space → card switches to the small square picture automatically. Kit first.
- [x] KIT §32.2b in kitDpFit (jk4) + kitPersonDlgFit (jpdlg); KIT_DP_GAP; kitFrameLines / kitFrameGaps
- [x] KIT §6.2b kitOptFit / kitOptFitAll / KIT_OPT_SQ (jk4) for every compact act card; hooks kaNorm + showModal + ResizeObserver
- [x] KIT.md §6.2 (canon overwrite), §6.2b, §32.2b; kit sample page §6.2b (jopic)
- [x] dev/test/kit-fit.js: 30 cases × Fold 755x1000 + iPad 1180x820 → 0 violations, 0 page errors (main: 185 violations)
- [x] kit-conform: MIXED 0 / CUSTOM 0 (MISSING 16 = stale place-tap cases, same as main); ts-oldsave: OK, 0 errors
- [x] before/after shots dev/handover/reports/kit-fit/*.jpg; report dev/handover/reports/kit-fit.md
Resume: server = `python3 -m http.server <port>` in the worktree after `bash dev/site/build_site.sh` (restore index.html / sw.js / assets.json before committing:
`git checkout index.html sw.js assets.json`). Test: `node dev/test/kit-fit.js http://127.0.0.1:<port>/index.html <out> <tag> 755x1000,1180x820 [shots]` (ONLY=a,b env limits cases).
Open: week book person page + identity card not changed (no header/frame-bottom pair) — ask MAIN if the owner wants the rule there.
HANDOVER: none needed (finished in one session; START_CTX ≈ 5 %, end ≈ 25 %).
