# review/stat-fx-2 (follow-up C26b to review/stat-fx-r1 + review/pcard-fill-r1)
Base: origin/main a523531da8 + merge of review/stat-fx-r1 (PASS 0eb3e4b4) + review/pcard-fill-r1 (PASS 6975696c); conflicts only in generated files + the assemble.py file list (jstatfx.js after jfxkit, jpcf.js last).
Specs: OWNER_DECISIONS 15/11 "Stat +/- animations" (~878), "stat glow green" (~888), "person card right side empty" (~951).

## 1. Diff-glow on re-rendered person card / status tiles (call site, no kit change)
Cause: the person card (pcard), the Lòng người tab and the status tiles (kitTiles) are redrawn with innerHTML, so `kitStatSet` (in-place update) never sees a number change.
Fix: `jpcf.js` watcher (MutationObserver on added elements; uses the existing `kitStatDelta` -> `kitStatGlow`, no new kit part). Cells watched: `.kst-tile`, `.kst-chip`, `.krt-v` (relation table "Hiện nay").
Key = card/sheet name (`.pcname` / `.kpidn`) + cell label; remembered 20 s; HUD cells keep their own path; Gọn = no glow (kitStatDelta). A drawn value different from the remembered one -> GREEN for a rise, RED for a fall; oán / ghen / hận / thù / ghét are inverted (a rise of grudge or jealousy is a loss for her: colour by meaning).
Test: `node dev/test/stat-fx-2.js <url> <out> [sizes]` bumps rival rel/oan/ghen, re-renders, expects glowing cells (4 cells at every size: oán red, ghen green when it fell, 2 relation numbers).

## 2. Loss number stays dark (HUD) - KIT REQUEST (not changed here)
Measured: while a HUD cell glows (`.ksf-g` / `.ksf-r`) its number is `rgb(42,26,18)` (ink) for BOTH gain and loss. Cause: `.kst:not(.kst-tile):not(.kst-chip)>.kstv{color:var(--ink)}` (jk4, specificity 0,4,0) beats `.ksf-g>.kstv` / `.ksf-r>.kstv` (0,2,0) in jstatfx.js. Verified in a live page: adding
`.kst.ksf-g:not(.kst-tile):not(.kst-chip)>.kstv{color:#1f6b2f}` and `.kst.ksf-r:not(.kst-tile):not(.kst-chip)>.kstv{color:#a3291c}` makes the top-bar number green / red (rgb 31,107,47 / 163,41,28).
KIT REQUEST: in kit part §57.1 (jstatfx.js) raise the specificity of the two number colours as above, and also colour the number of a relation-table cell (`.krt-v.ksf-g` / `.krt-v.ksf-r`, where the cell IS the number) so the table number turns green/red like the tile numbers. Call sites need nothing more.

## 3. pcard-fill nits (whole family)
- "Dạo này" stray word: `k61Know(list,how,...)` (j61) appends `how` to the log line as a bare fragment. Callers passed fragments ("Lễ tấn phong", "Được triệu riêng", "Thỉnh an"; the pcard-fill test passes "gặp"), so the line ended "...Hoàng hậu Tống Nhược Lan. Gặp" / "...Thỉnh an". Fix: new `k61How()` makes every `how` a closed sentence (capital + full stop if it has no end mark), and the 4 fragment call sites in jts.js are real sentences ("Nhân lễ tấn phong, ngươi được thấy người.", "Ngài triệu riêng, ngươi được diện kiến.", "Buổi thỉnh an, ngươi được thấy người."). All other `how` strings already end with "." or ")".
  Scan: 23 string `how` arguments of k61Meet/k61Know in dev/build/j*.js; 4 fragments before, 0 after; test scans every S.logs line (0 lines end without a closing mark).
- Phi tần tab mood tile: when the mood has no cause event (or the mood is "chưa rõ") the card shows the plain kit mood card (name + one line) with NO stand-in picture (`img:""`); with a cause event it keeps the event's picture. Test: unknown = no art, no cause = no art, cause = art.

## Tests (dev/test/stat-fx-2.js): 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 PASS (0 page errors, no horizontal overflow; one flaky glow-timing retry at 1366). HUD colour check excluded from pass/fail until the KIT REQUEST lands.
No new images (nothing for CDN).
