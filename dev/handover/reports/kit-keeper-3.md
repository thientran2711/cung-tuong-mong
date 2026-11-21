# KIT KEEPER #3 (session_01Rc5AsKoUpGuLNJz1quYU61) — report
Coordinator: MAIN CHÍNH 93 session_01Rc5AsKcbi9rTmDK4pY2SeT · kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq · predecessor keeper #2 (reports/kit-keeper-2.md HANDOVER).

## 1. kit-ef-unit r2 — SẴN SÀNG KIỂM `review/kit-ef-unit-r2` @ bb00fc02
PRIORITY #1 CHECK: OD/KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2 | main: kaRowH j63, kitCompactCSS jk4:1031, jk4:1121 .kpabox, jopic:329 | review/*: kit-ef-unit 9fd26c14 + kit-ef-unit-rv 0620a05d (FAIL) — reused, no rebuild | claims: keeper #2 → #3.
Base: review/kit-ef-unit-rv 0620a05d (= keeper #2 9fd26c14 + LIVE 0046a920).

Fault (rv-kit-ef-unit.md): `.kef1{white-space:nowrap}` lost to `${B} small.kb>.kr>.krv>*{white-space:normal!important}` (kitCompactCSS, used for `button.ka.kart` and the narrow-pane copy) and `.kpabox …krv>*{…normal!important}` → «Sủng / +2» split on the real option cards.
Fix (whole family, ONE kit rule):
- j63: `.kr>.krv>.ef.kef1:is(#kef1-unit,.kef1), .kr .krv .ef.kef1:is(#kef1-unit,.kef1){white-space:nowrap!important;overflow-wrap:normal!important;word-break:normal!important}` — `!important` + id-weighted `:is()` (specificity 1,x,x; matches the same elements) beats every `.krv>*` normal rule (jk4 kitCompactCSS ×2, jk4 .kpabox, j79 `.art …`, j87 …), so no card host can undo it.
- j63 `kaUnit`: also takes an unsigned stat («Sủng 26», «Ân tình 12»); new `kaEfTag(html)` tags a pre-built `<span class="ef …">` stat item.
- j79 `kitRows` (info rows): stat items get `.kef1` (built ones via kaUnit, pre-built via kaEfTag) — same unit rule on info rows, not only act/option cards.
- jopic `kitOptFinal` moves the kaRowH chips (classes kept) → covered. j82 `kg82Rows` is a fallback only when kitRows is missing (dead path) → untouched.
Test `node dev/test/kit-ef-unit.js <url> <out>` (rewritten): (A) REAL option dialog via Q+showModal («Mua chuộc người Nội vụ phủ», Bạc -94 · 2 khắc · Sức 80→98 (+18) · Sủng +2 · Danh +1 · Tâm cơ -3), option column auto/560/460/380/320/280 px; (B) Hành sự act tab, pop-maid person act rows, tab staff, tab rv (real `.kart`); (C) bare kaRowH 180..320 px. Every visible stat item: computed white-space = nowrap, ONE line (client rects with one bottom — an item holding an inline tap word «<span class=krel>Thiện cảm</span> của cung nữ +3» gives 2 fragments on the same line, not a break), inside its card; no stat text left without .kef1.

Before / after (same test, LIVE 0046a920 vs bb00fc02):
| scene | LIVE units bad | r2 units bad |
|---|---|---|
| Fold option dialog (6 widths) | 12/12 bad each width (ws normal; «Sủng +2» 2 lines at auto, 320, 280) | 12 / 0 |
| iPad option dialog (6 widths) | 12/12 bad («Sức 80→98 (+18)» splits at 280) | 12 / 0 |
| iPad act tab | 66/66 bad (normal) | 66 / 0 |
| iPad pop-maid | 71/71 bad | 71 / 0 |
| tab staff / tab rv (both devices) | all bad | 0 bad |
| bare rows 150 px (LIVE) / 180..320 (r2) | splits | 0 |
Results: kit-ef-unit.js Fold PASS + iPad PASS · quickcheck PASS (core gates PASS, old save ok, perf ≈ live) · coop-e2e 94/94.
Shots (looked at, CDN `img/_review/kit-ef-unit/`): before-755-opt.jpg («Sủng / +2» split), after-755-opt.jpg («Sủng +2» one unit), after-1180-opt.jpg, after-1180-act.jpg. (Fold act tab shows the stage, act list not visible at that width; Fold act rows measured in pop-maid / staff / rv.)
Note (not this topic, seen in the shot): Fold option titles wrap one word per line («Nhờ / người / quen …») beside the odds meter on a narrow card — pre-existing on LIVE; flag for kitOptFinal owner if not already known.

## Queue status
- (1) kit-ef-unit → r2 SSK sent.
- (2) kit-focus r5 da873b4b / kit-win-pay 0e6fe923: waiting on rv MSxp verdicts.
- (3) KIT_REQUESTS rel-men-servants kitRelRows row: next.
