# review-rank-port-r1 — D36 leaderboard + Bảng vàng re-port

Branch reviewed: review/rank-port @ 71c6cb41643b1f0dfced3067c8855f5b48a68ff0
Reviewer branch: review/rank-port-r1 @ 0178141c428ba98582f7a177d6e51f622910862c (merged onto origin/main 9ddb3f6c; assemble.py order fixed: jnight, score.js, jrank, jtut; site rebuilt; contains main)

## Tests (my own build, local Worker stand-in, local http servers)
rank-e2e: ALL OK at 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2; old save (main's published build) loads and gets a guest id: OK. 390x844: rotate prompt "Xoay ngang điện thoại để chơi", no page errors, no horizontal overflow.
Test-only fixes on r1 (not product bugs):
- main's new card-flip overlay (.kcf "Lật thẻ bài", appears at night) covered the board and blocked the click on "Cách tính" in every viewport (ABORT, timeout) → test hides .kcf.
- end-card figure and podium figures are CDN pictures; the test measured before they loaded (fill -0.005, "figures loaded" FAIL at 755/1000/844, flaky) → test now waits for the images.
Observed on origin/main too (NOT from this branch, for the coordinator): on the "KIẾP" death card at 755x1000 the sticky category tab bar (Tất cả 0/27 …) paints OVER the dialog.
coop-e2e not re-run (worker: 58/60, same 2 FAILs on main's build, pre-existing).

## Kit check of jrank private .krk-* CSS (vs kit-keeper-1.md and KIT.md §8/§26.1/§32.7d/§51)
OK (kit parts): podium (kpodCol, §26.1), end card (kit person dialog 32.7d), kitRows, kitTiles, kitInput, kbtn, ksub tabs, kit-x, kph header, kitMeMark-free.
PRIVATE parts found in dev/build/jrank.js (all FAIL per HARD RULE / KIT FIRST):
1. Rules pop-up = own frame: `.krk-pop` (overlay) + `.krk-card` + `.krk-ch` + `.krk-cb` (own border, shadow, gradient header, scroll body). KIT §8: ONE kpanel frame for every pop-up (T1 PANEL), kit-conform.js rule.
2. Leaderboard list = own row part: `.krk-list` frame, `.krk-row` grid (rank number, face, who, 2 columns, score), `.krk-hd` header row, `.krk-mine` highlight, `.krk-rk/.krk-who/.krk-c/.krk-s/.krk-pe` and its own phone variant. No kit row for "rank · face · name · columns · score" exists → KIT REQUEST.
3. "Ta" chip beside the name: `.krk-you` (own pill: font, border, colour). The kit already has the podium "Ta" tag (kitPodiumTag, §26.1); the row must use a kit chip/tag.
4. Own frames for body blocks: `.krk-name`, `.krk-note`, `.krk-me` (own-life footer row with its own border/background), `.krk-end` block spacing, `.krk-ft` gradient footer, `.krk-btns/.krk-eb` own button sizing (min-height 42/40, own padding) — kit buttons only, no per-place sizes.
5. Own header sizing/own tab colour: `.krk .kpod-hd .kph.krk-h` (padding/title size) and `.krk-tabs .ksubb.on{background:linear-gradient(#c9952a,#a8781c)}` = private variant of kit sub-tabs.
KIT REQUESTS for the kit keeper: (a) ranked-list row + header (kitRankRow / kitRankList) with kit "Ta" mark and own-row highlight; (b) rules pop-up as T1 PANEL (no new part, just use kpanel); (c) footer "own life" strip, name-edit block and note as kit templates.

## Product notes (not FAIL)
- Recovery code ("shown once") interpretation: shown automatically once, re-readable by button — fine, owner to confirm (worker asked).
- Worker deploy (ctm-rank) is not part of this review; Worker unchanged by this branch, nothing to deploy for it.

FAIL
1. Rules pop-up (.krk-pop/.krk-card) must be the kit kpanel (T1 PANEL) — delete the private frame.
2. Leaderboard rows/header (.krk-list/.krk-row/.krk-hd/.krk-mine/.krk-you …) are a private row part → coordinator logs KIT REQUEST (rank list row), kit keeper builds it, worker switches jrank to it.
3. Own-life footer (.krk-me), name block (.krk-name), note (.krk-note), footer gradient, button size overrides, tab colour override (.krk-tabs .ksubb.on) → kit parts only, no private CSS.
4. After 1–3: re-run rank-e2e on all 6 viewports (my r1 test fixes in dev/test/rank-e2e.js can be reused: merge review/rank-port-r1 0178141c, which already contains current origin/main 9ddb3f6c).
