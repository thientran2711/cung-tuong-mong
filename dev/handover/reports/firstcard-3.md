# FIRSTCARD-3 — odds word only on options that roll; life-changing no-roll options get «Cẩn thận khi lựa chọn»

depth: lineage.depth not shown to this worker (unknown) · START_CTX ≈ 20 %
PRIORITY #1 CHECK ('Cẩn thận khi lựa chọn'): OD 2 | main 0 | review/* 0 — reused review/firstcard-2-rv de123ff3 (merged onto LIVE f573dc94, built files rebuilt) + its report.

## Rule built (owner OD 26/11 ~18:25Z, one place: jk2b)
1. Odds word only on an option that really rolls, always the TRUE word (`kitRiskOpt` declared p / own odds). The old sure «Nắm chắc / Rất vững» stamp (`kitOptOdds`) is DELETED — no toggle; `kitEndOdds` / `data-ksure` gone (jopic reads «no .kodds = no roll»).
2. No-roll option that changes her ending / life (`kitLifeOpt`: declared `end`/`life`, or KIT_END_RE on name/hint/line: xuất giá, xuất gia, tự vẫn, đi tu, chuyển kiếp, bị ban hoa, kiếp này dừng, mất mạng) → NO word; its choice gets ONE line «Cẩn thận khi lựa chọn» above the options (`kitChoiceWarn`, MutationObserver on #modal, idempotent, once per choice). Result rows stay visible.
3. KIT part: K-CHOICE-WARN filed; KIT READY §6.2k (review/kit-k44-parts f179256e) merged in; `kitChoiceWarn` sets `warn:1` on every Q card whose options hold a life-changing option → the kit draws the line (no stand-in left). OB-VERDICT-3 messaged.
4. Decision for MAIN (judgement call): the tú nữ selection card «Cúi đầu chờ xét» really rolls the contest (kept ≈ 1 in 4), so it keeps its TRUE word (Hiểm) + red Mất row AND the choice gets the line (declared `end`). If sếp wants it wordless, set `selxOddsP` off in `kc2SelRisk`.

## Scan (dev/test/odds-word-scan.py → firstcard-3-scan.md, 2708 option builders in j*.js)
BEFORE (LIVE): every dialog option without own odds printed the sure «Rất vững» (incl. xuất giá / tự vẫn / hidden rolls). AFTER: rolling options with word 356 · no-roll options 2349 → no word · of which life-changing 71 → warning line · 3 rows flagged «undeclared» are side rolls (kc3 win/lose line ×2, an act `o,` whose act card prints its word) — read by hand. Table per option in the scan file.

## Tests / looks
- dev/test/firstcard/odds-word-rule.js: 12/12 PASS (Fold 755x1000 + iPad 1180x820): rolling option shows its word («Khó lường»); the other two options have none; ONE line above; a safe choice has no line; no page errors. LOOKED both stills: only the rolling card has the meter, the line is small above the cards. (Frame M scrolls with 3 picture cards — existing «Kéo xuống», not changed.)
- quickcheck: see qc line below.

## Not done / for MAIN
- The old firstcard-scan.py was replaced by odds-word-scan.py (canon overwrite).
- firstcard-2's other fixes (princess never ban hoa, home-road declared odds, BAL.kc2.* numbers) ride along unchanged.

## Gates
- dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» FAILS ON LIVE f573dc94 too (pre-existing, not from this branch). npc-purpose-scan fixed (kcMeet done-text follows the declared roll). quickcheck: see line below.
- Shots LOOKED Fold + iPad: CDN img/_review/firstcard-3/after-fold-life.png, after-ipad-life.png (wipe after verdict).
