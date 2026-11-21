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
- (3) kitRelRows → SSK sent (§2 below).
- (4) MAIN 94 order: Fold option titles wrap one word per line beside the odds meter — whole group fix, next.
(Coordinator is now MAIN CHÍNH 94 session_01Rc5AsLniSu9Gw8QDFt52Ph.)

## 2. kit-relrows-ms — SẴN SÀNG KIỂM `review/kit-relrows-ms` @ d80b9d2b (from LIVE 0046a920)
PRIORITY #1 CHECK: KIT_REQUESTS 20/11 rel-men-servants row (OPEN) | main jkrel.js kitRelRows loyal branch | review/rel-men-servants 494ea79b (F1 waiting KIT §52; not landed) | claims: none other.
Change (jkrel.js only): a man / servant / maid / court official (`relMS(p)` and man or in `relMSAll()`) reads j9 aff/oan: «→ ta» Thiện cảm aff(p,S) + Oán oan(p,S); man: «Ta → hắn» Thiện cảm aff(S,p), no Tin cậy; HER own servants (S.maid / ownerOf(p)===S): + «Lòng» = p.loyal (KR2_W /lòng/) + «Ta tin cậy» tinOf(p); other servants/officials: Thiện cảm + Oán; not met (relMSMet false) → one «chưa rõ» row. Week snapshot s.ms[relKey] for the deltas. Guarded on relMS/relMSAll → no-op on LIVE (test prints SKIP there; quickcheck PASS). Lands with/after review/rel-men-servants (that branch's F1 = this); merge is jkrel.js-only, no conflict expected.
Test `node dev/test/kit-relrows-ms.js <url> <out>`: scan of every man + relMSAll person, two passes (as-is, and everyone met), + person card left key render. Run on rel-men-servants 494ea79b + this patch: Fold PASS (47 people: 9 men, 2 own, 36 servants/officials), iPad PASS.
Before / after (same scan, rel-men-servants 494ea79b without / with the patch):
| case | before | after |
|---|---|---|
| man «→ ta: Thiện cảm» | p.loyal (e.g. 78 vs aff 8) | aff(p,S) |
| man Oán / «Ta → hắn» | missing | oan(p,S) / aff(S,p) |
| man «Tin cậy» | shown | gone |
| her maid card | «Thiện cảm 37» (= loyal) + Tin cậy | «Thiện cảm 8 · Oán 4 · Lòng 68» + «Tin cậy 48» |
| not-met people | numbers shown (8 non-strangers only) | «chưa rõ» |
Shots CDN img/_review/kit-relrows-ms/: before-755-maid, after-755-maid, after-1180-maid (looked at). quickcheck PASS (d80b9d2b). coop-e2e not run (no layout change: row data only).

# HANDOVER — KIT KEEPER #3 (session_01Rc5AsKoUpGuLNJz1quYU61) → KIT KEEPER #4 (written 21/11 ~13:40Z, worker rollover rule)
Coordinator: MAIN CHÍNH 94 session_01Rc5AsLniSu9Gw8QDFt52Ph (opens the successor). Kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq.
Role/rules: unchanged (reports/kit-keeper-1.md HANDOVER + kit-keeper-2.md HANDOVER).
Practical: worktrees /home/user/wt/ho (handover, detached), /home/user/wt/k3ef (kit-ef-unit-r2), /home/user/wt/k3kr (kit-relrows-ms), /home/user/wt/k3rel (rel-men-servants 494ea79b + my jkrel patch applied UNCOMMITTED, test bed only — never push it). Test server: python3 -m http.server 8778 in /tmp/pcs/www (index.html, live.html, rel.html, relbefore.html, kr.html). coop-e2e usage is `node dev/test/coop-e2e.js <outdir>` (NO url arg). A `git fetch --depth=60` of a review branch hung >5 min once: use --depth=3 with a timeout.

## My branches
| topic | branch @ sha | state |
|---|---|---|
| kit-ef-unit r2 | review/kit-ef-unit-r2 bb00fc02 | SSK sent (QC PASS, coop 94/94), waiting rv |
| kit-relrows-ms | review/kit-relrows-ms d80b9d2b | SSK sent (QC PASS), waiting rv; lands with/after review/rel-men-servants (MAIN 94 asked to tell its worker) |
Still waiting from keeper #2: kit-focus r5 da873b4b, kit-win-pay 0e6fe923, kit-mark-fix-r3 99f1e576, kit-g4-plate 03181881 (rv verdicts).

## Queue for #4
1. Any rv FAIL on the topics above.
2. MAIN 94 ORDER (21/11 12:47Z): LIVE group fault — on Fold the option card title wraps one word per line («Nhờ / người / quen / nói / giúp / một / lời») beside the odds meter (`.kat .kodds` on the title row, KIT §6.2b, jopic kitOptFinal / KIT_OPT.stackW 430 → `kodstk` stacks bar-over-word only under 430 px card width). Seen in img/_review/kit-ef-unit/after-755-opt.jpg (Fold card ≈ 300 px wide: picture 66 + title column ≈ 90 px + meter ≈ 110 px). Fix the whole group (every option/act card with a meter: .kopt + .kart), scan script + before/after table, Fold + iPad shots → rv MSxp, report to MAIN 94. Likely the stack threshold must compare the TITLE room (card width − picture − meter) instead of the card width, or the meter must stack/go under the title when the title would get < ~8 em. Harness: dev/test/kit-ef-unit.js part (A) already opens a real option dialog with a long title.
3. After LIVE lands: CLAIMS LANDED + `python3 dev/site/cdn_sync.py --wipe-review <topic>` (kit-ef-unit, kit-relrows-ms).
FOR MAIN 94: keeper #3 stops here (rollover); please open KIT KEEPER #4 with this HANDOVER.
