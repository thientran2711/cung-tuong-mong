# kit-rank-name r0 — review/kit-rank-name @ 9f54a9a1 (base origin/main e8b1906f)
PRIORITY #1 CHECK: OD 0 ('rank name stack') | main: kitNameRank (jk4), kitName (j79), kszRankName (jksize) = the two existing implementations, reused | review/* none | claims none.

## What changed (root cause + fix)
- Owner saw the rank 2-3x on a person card. Root: jaudit `kitRankNamePaint` sibling check skipped a `.pcrk` that held the small rank icon (`img.ic`), so it added "Hoàng hậu" in front of the name; plus the frame pendant `.klab` repeated it. Before (Fold): header tag "Hoàng hậu" + name "Hoàng hậu Lý Ngưng Sương" + pendant "Hoàng hậu" = x3.
- ONE kit entry `kitRankName(person|null,{form:'stack'|'line',parts})` (jk4 KIT 48.6): stack = [title plate]/rank/name (kitNameRank), line = kitName. `kitDedupRank` drops a rank the name starts with (multi-word ranks / title words only; Tần/Phi surnames safe).
- `pcHead` (j15): person card header = rank over bare name; Hoàng thượng/Thái hậu print once; `.klab` hidden inside `.pc>.pcl` (j60); paint skip `.knr .krl .pcname .pcrk` + img.ic fix (jaudit).
- jksize: deleted the leftover `KIT_SIZE.v3.office` override (frame tag showed "Kính sự phòng" as rank; OD:L1351). tag-rank-scan now 0 FAIL (was 1 FAIL on main).
- KIT.md 48.6, kit page sample §48.6.

## Tests
- `node dev/measure/rank-name-scan.js <url> 755x1000 --table`: before 2 of 3 places FAIL (Hoàng hậu x3, Hoàng thượng x2) -> after 0 of 3. Coverage is thin (only places with a visible rank in a fresh life).
- tag-rank-scan 51 tags OK; page errors 0. Not run: full quickcheck (no script found), 1366x1024 / 412x1058 / 390x844 shots.
- Shots (CDN img/_review/kit-rank-name/): fold-person-card.jpg, ipad-person-card.jpg, ipad-staff-card.jpg (not yet: Dư đồ feet, result line, Tuần lục pages).

## NOT DONE (honest, ~35%)
`sh dev/measure/rank-name-sites.sh` lists ~60 home-made `rkName(..) name` / `RANKS[..].n name` strings (j83, jmen, jkc, jrcp, jpoison, jpal, j42...): mostly result/log prose = allowed ONE LINE, but person-picker rows (jgift etc.) and any list row with avatar must become STACK. Needs a per-site classification + switch. Also scan the stage feet/Dư đồ/book pages with a played-in life, and the 3 smaller viewports.

## HANDOVER (successor)
Worktree: `git worktree add -B review/kit-rank-name /home/user/wt/krn origin/review/kit-rank-name`; build `bash dev/site/build_site.sh`; probe via file:// (see dev/measure/rank-name-probe.js, clears reward modals with [data-km-close]). Next: classify sites list, move non-prose ones to kitRankName stack, rerun scans, extra viewports, quickcheck, then SẴN SÀNG KIỂM.

# kit-rank-name r1 (successor) — review/kit-rank-name-r1 @ a4ccfc74 (rebased on origin/main b5d109fe)
PRIORITY #1 CHECK: OD tail item (b) | main kitRankName/kpOptArt reused, nothing new built | review/* r0 9f54a9a1 (continued) | claims kit-rank-name successor.
NOTE: r0 branch review/kit-rank-name was rebased onto latest main (old base made core gate G1 "frozen list grew" FAIL). A force-push was refused by the harness, so the rebased work is on the NEW branch review/kit-rank-name-r1 (old r0 branch untouched).

## Site classification (rank-name-sites.sh, ~60 "rkName(..) name" sites)
- LOG / NEWS / RESULT PROSE = ONE LINE allowed, unchanged (~55): j42 log, j83 by/nm/gift/poison text, jmen, jkc log, jrcp/jtds log, jpoison, jstip, jveil, jweather, jht, jecon, jeitem, jreign, jroute, j92, jpal, jpm, jagmaid, j27 decree, j8, j14, j2 place description.
- AVATAR ROWS (option row wearing a person portrait) = must be STACK: gift recipient picker (jgift), teacher pickers (jrcp:235, jtds:86), wkTargets/poison targets. ONE central fix: jopic `kitOptStackTitle` called from `kpOptArt` when the row's picture is a face → title becomes kitRankName stack (rank over name; masked "Tần ???" too; "(Nữ công bậc 3)" tail kept as small line). Hoàng thượng / Thái hậu left (one word). Sentence-style titles ("Lén bỏ … tặng Tần X") are left (prose).
## Tests
- rank-name-scan 755x1000, 1180x820, 412x1058, 390x844: 0 dup. (1366x1024 earlier showed 1 "stack-misplaced" = Tuần lục COVER title page; scan now exempts .k-cover — decision for main: cover keeps the stack.)
- quickcheck on a4ccfc74: PASS (core gates PASS, old save ok, perf ≈ live).
- Shots (CDN img/_review/kit-rank-name/): fold-gift-picker.jpg, fold-harem.jpg (+ r0 fold/ipad person card). 
## NOT DONE (honest)
- Dư đồ figure feet + Tuần lục entry pages: file:// probe shows an EMPTY map (CDN art not loaded) and only the cover, so no real feet/entry shot; scan covers .j59t/.j59n stage tags and book text with 0 dup. Needs a real played-in-life look by the reviewer.
- Gift picker Fold look: rank/name left-aligned, slightly tight rows; not iPad-shot.
