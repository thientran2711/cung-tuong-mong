# ge-map — GAP GE03 «Sơ đồ nhánh» page in Sổ luân hồi (worker, sonnet) — branch review/ge-map, sha 8e2efbea (from origin/main 90b7e797)

PRIORITY #1 CHECK ('Sơ đồ nhánh' / 'geMap' / 'mapOn'): OD:L1623 (1) + GRAND_ENDINGS §2.10 read; CLAIMS kit-ge landed; main: jge.js geMap() + j79.js kitBranchMap*; review/* none. Reused: geMap, kitBranchMap/Mount/Open, kitTabRowHTML, rows67 (kitRows). Nothing new drawn.

## What
- `BAL.ge.mapOn` true (jbalge.js).
- jge.js `geMapPageHTML()` hooked on `pastHTML` (title Sổ luân hồi `.kpt-mount` AND in-game book, same chain as the other books): h3 «Sơ đồ nhánh» · kit row «Cả sổ luân hồi» (Đại kết cục n/160 · Danh hiệu n/320 · Kỳ ngộ n/80) · identity tab row (10, kitTabRowHTML, count = grand endings earned/16) · road tab row (4, kitTabRowHTML, count n/4) · `kitBranchMap(geMap(branch))` (counts chip, spine, her chip, 4 ends, tap = kit card).
- Opens on the branch of the life being played (else the first); picking an identity opens that life's branch if it is hers, else road 1; the picked branch survives a node card closing (the book re-mounts).
- Only her own lives are read; unseen nodes stay «?». Scan: every branch with GE_DATA, every title earned → «Điều cần» has no digit/%, both ngã rẽ words present.
- Nothing is drawn privately; no new CSS in the page.

## KIT touches (flag for the kit keeper / reviewer — j79.js kitBranchMap CSS only, selectors/wrap, no look change)
1. `.kbm-n` → `.kbm .kbm-n`: inside the Sổ luân hồi mount `.kpmain li{padding:2px 0}` (0,1,1) beat the part's 22px padding (0,1,0), so the rail dot sat on the first letter of every spine node. Specificity fix.
2. `.kbm-f` wraps (`flex-wrap`, `small{flex:none}`): on iPad 4 columns «thua» broke one letter per line under a long fail name.
kit-ge.js still PASS.

## Tests
- NEW `node dev/test/ge-map.js [dev/index.html] [outdir]` — 755x1000, 1180x820, 412x1058, 390x844: page opens, 10×4 tabs, nodes drawn (13/2/4), counts, totals, only the earned end named, tap card (pair, Điều cần no digits, lives), tap «?» card, tab switching, no overflow, no page errors, live life opens on its branch, all-branch wording scan: GE-MAP PASS.
- kit-ge.js PASS. golive quickcheck 8e2efbea: PASS (core gates, time-spill, old save ok, perf render 234/268 ms, buổi 1518/1248 ms vs live; never --yes).
- Shots (Fold + iPad, LOOKED): CDN img/_review/ge-map/ge-map-{A,A2,A3,C}-{fold,ipad}.png (https://ctm-img.victoria-tntt.workers.dev/img/_review/ge-map/…). Delete after verdict.

## Notes for main (not done, not blocking)
- A branch that is NOT the life she plays shows each end as «Còn mở» (geMap gives st "o" when s is null) — true at the start (NPC parity) but it reads as "this life". Design wants states for THIS life only: suggest kit option `noState` (kit keeper) or geMap st:null → kit hides the word.
- 15 of 40 branches have no GE_DATA yet (bd_*, …): they show «?» and cannot be earned; their cards would lack «Điều cần» once data exists — the scan covers them as soon as data lands.
- her chip (`here`) in the live test is 0 because the fixture has no chapter id in S.st.M.a; kit-ge covers the chip with fixture data.

## Rollover
No handover needed (done at ~25% of window).
