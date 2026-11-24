# E82r review robot10-e-fix-4 e4022143 — PASS
PRIORITY #1 CHECK ('uiScan offscreen clip'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0.
Merged with origin/main: review/robot10-e-fix-4-m = c1e7d3d355774b4ebbfda3c6d3200cf4e0bbb44d (merge of e4022143 + main; pushed).
- Scope vs fix-2 r3 0673d1a1: dev/measure/robot10.js (uiScan seen()) + dev/test/r10e-offscreen-clip.js only. Diff vs main = dev/measure + dev/test only (no game file; index.html/sw.js not touched).
- LIVE R3-018.json, Fold 755x1000, court tab (screenshot looked at): the «Dạo này» row is the kit one-line row (KIT §6.3h), text cut with «…» inside the card, nothing pushed off screen. The R3 «text off screen span.kgl.kfx / span.r» rows are the clipped-by-design row.
- r10e-offscreen-clip.js: Fold 755x1000 and iPad 1180x820: NEW (e4022143 harness) ALL OK; OLD harness (0673d1a1 robot10.js via R10=) FAIL 1 (span.kgl.kfx x 324..1295 / 753..1724). No page error.
- Mutations (own script, uiScan of e4022143): real unclipped text pushed past right edge = caught (1); same text in an overflow:hidden box pushed past the edge = caught (1); screen-wide fixed hidden wrapper with text running past the edge = caught (1, screen-edge clip still counts); hidden box ending inside the screen = 0.
- Caveat (not a fail): a clip box ending inside the screen whose own box is pushed past the edge is still caught via its box; nothing found missed.
~100% xong / harness only, game untouched.
