# kit-fit-r1 — SMALL-tier KIT review of review/kit-fit @ 7865ed13a (reviewer, 11/16/2026)

VERDICT: PASS 59812a6355d89feac783577984ab977b805577f3 (branch review/kit-fit-r1; ancestor = current origin/main 95282e69; quickcheck PASS)

Round 3 items (Luân hồi origin cards, face picker) NOT touched.

## What I did
- Merged origin/main 95282e69 into 7865ed13 (conflicts: index.html, sw.js, dev/kit/KIT.md = keep main's added block); rebuilt (build_site.sh) and committed the build files (r2b's committed index.html was a stale/conflict build).
- Fix 1 (policy): r2 had committed 30 shot JPGs in dev/handover/reports/kit-fit/ (shots never in git, OD 16/11 18:50Z). Removed from the tree on review/kit-fit-r1 (blobs stay in r2's history only). Worker: keep shots in scratch/CDN.
- No code changes to game files.

## Results
- `bash dev/tools/quickcheck.sh <sha>`: PASS (open ok, old save loads + plays a buổi, perf render 276/272 ms new/live, tasks>200ms 15/13).
- dev/test/kit-fit.js (Fold 755x1000 + iPad 1180x820, all 31 cases): violations 0, page errors 0.
- dev/test/kit-fit2.js at 755x1000, 1180x820, 1366x1024, 412x1058: violations 0, errors 0.
  - Chọn sổ scroll overflow: 0 px on Fold 755x1000, iPad 1180x820 and 1366x1024, BOTH tabs (Một mình, Cùng hảo hữu). Cover 412x1058: 42 px / 46 px scroll (allowed: Fold-class may scroll; not the PRIMARY devices).
  - Week book equal gaps top/bottom: 49/47 · 40/41 · 48/48 · 38/39 (all ≤2 px, ≥14).
  - Identity card equal gaps: 755 15/14 (one page, kv1) · 1180 66/65 · 1366 82/82 · 412 17/16. (main before: 1180 121/10, 755 812/-696 → fixed.)
  - Card flip (me / other): overlapping name tags 0 at all four sizes.
- kit-conform.js (755x1000, 30 pending): CONFORMS 81, MISSING 15 (items not on screen), floats none.
- Old-save load: quickcheck old save from the live build loads, plays a buổi, 0 errors.
- Shots I LOOKED at (scratch, not git, /home/user/wt/kfr1-shots/): slots, slotsco, book, id, flipme, flipother at 755x1000 and 1180x820; id/slots/book/flip at 1366x1024 and 412x1058 (measurement-only for the last two except id 412); Sổ mây pages (mini card, linked card, "Ám hiệu sổ mây" code page) at 1180x820 and 755x1000.

## Whole-game consistency scan (KIT FIRST, OD:L1093-1095)
- `.kslot` + `.kslot-a` users: j74 (3 sổ, Nhập ám hiệu, kit-page sample), jslots (co-op rooms), jcloud (Sổ mây mini + Thiết lập card, code, link, pick, versions). One CSS rule in j74; no per-place override (jinv `kslot-css` is the unrelated inventory `.dlg.kitslot`). Mini card with 3 buttons, 1 button, 2 buttons and the sample page all render the same two-column row. OK.
- Equal-gap rule (§32.2b): kitFrameLines/KIT_DP_GAP shared by person dialogs (j79/jpdlg), week-book (jsl), identity card (j79 kpIdFig); same formula, tolerance ≤2 px, min 14 px. All 31 kit-fit cases + book + id measured. OK.
- Card flip: tag-hide now uses the final picked-card rect + result chip; `i.kcf-mine` selector scoped to the marker <i> (the overlay also carries .kcf-mine). Only jflip uses it. OK.

## Notes (not FAIL; for MAIN / next keeper)
1. Identity card ("Thân phận kiếp này", Luân hồi) — PRE-EXISTING on main, not caused by r2: at iPad 1180x820 the picture band is squashed to ~100 px and the name/age line ("Quý nhân …", "Con gái nhà buôn muối · 18 tuổi") is not visible; at Fold 755x1000 that line is half clipped under the picture. Same on origin/main. Candidate for round 3 item 1 (identity card layout) since it is the same screen.
2. "Ám hiệu sổ mây" page (iPad 1180x820): the evidence seal (kseal-ev placer) lands in the empty lower part of the left label column of the "Thôi nối trên máy này" row (bottom-left). It does not touch text (placer avoids text rects), but sits inside the label column rule. Cosmetic.
3. Chọn sổ panel height differs between tabs (solo 520 px vs co-op 558 px dlg) — panel edge moves when switching tabs; not scrolling.
4. r2/r2b history on review/kit-fit contains the 30 shot blobs (tree cleaned only in -r1). Fast-forward is fine; blobs are in history only.

CDN review folder: none used. Scratch shots remain in /home/user/wt/kfr1-shots/ (session-local, not git).
