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
SẴN SÀNG KIỂM e383a4dd7 (round 1)
SẴN SÀNG KIỂM 6b9ca17da (round 2, see dev/handover/reports/kit-fit.md)

## ROUND 2 (kit keeper successor, for MAIN s22) — base review/kit-fit 28828f29 + merge origin/main 86229158
- [x] (1) §32.2b whole group: week-book person page (kitBookFigClamp, jsl: raise by half the difference between rule→head and feet→.kbk-in bottom)
      + identity card (kpIdLay, j79: centred between screen top/bottom on the spread, screen top/panel top on one page kv1; the old
      `W<600` phone test mismatched html.kv1, so Fold 755 showed a 176 px figure in a 98 px strip at the bottom-left)
- [x] (2) KIT SLOT ROW .kslot compact (j74): name column left, info pairs on top, buttons below (owner 16/11 rule kept); iPad Một mình 482/574 px
- [x] (3) §67 card flip: `.kcf-mine` CSS hit the overlay on her nights (scene shrank into a box) → `i.kcf-mine`; coverTags hides every other
      tag under the picked card's final rect or the result chip
- [x] KIT.md (§28.11a overwrite, §32.2b whole group, Chọn sổ KIT SLOT ROW, §67 labels) + kit page sample "§29 slot" (j74)
- [x] tests: dev/test/kit-fit2.js 0 violations (755x1000, 1180x820, + 412x1058, 1366x1024 for id/book); kit-fit.js 0 / 0 errors;
      kit-conform MIXED 0 CUSTOM 0 (CONFORMS 87/86, MISSING 15/16 stale place taps); ts-oldsave OK 0 errors
- Site rebuilt and committed (index.html, sw.js, assets.json) after the main merge.
