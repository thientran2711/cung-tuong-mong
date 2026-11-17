PRIORITY #1 CHECK: OD tail 17/11 02:47Z (Chọn sổ bug) | main j74.js/jksize.js kitFrameLive3 + jaudit/j61 masks (root found, no existing fix) | review/fig-feet-crop-2-r1 d431dc3db (kszRankName stage-tag mask: merged; it is the same global-mask family but a different spot; slot cards fixed here) | claims: CLAIMS row save-dlg-fix.

# save-dlg-fix report (owner bug 17/11 "Lỗi tùm lum", Chọn sổ)
Branch review/save-dlg-fix (from main 7abaf07a). Kit keeper fix, whole family. START_CTX ~8% of window; finished far below the rollover limit.

## Root causes (one kit part each)
1. Faults (1)(2)(5) small frame, empty left picture column, cut picture: `kitFrameLive3` (jksize.js) re-laid the Chọn sổ panel as a v3 EVENT frame (S size 380 px + `.k3mpic` picture column). Its guard `KSZ_LIVE_SKIP` inspects the body at showModal time, but j74 mounts the page parts (`.kpt-mount`: slots, Sổ mây, Phúc duyên) only AFTER showModal, so the body looked empty and the page was converted. Fix: `.kpt-mount` added to `KSZ_LIVE_SKIP`. Same root hit Thiết lập and Sổ luân hồi (all three were wrapped).
2. Fault (3) letter-by-letter buttons: the squeezed 60 px info column forced `.kslot-a` buttons (flex nowrap, min-width 0) to ~40-60 px. New kit rule (j79, every `.kbtn`): a word never breaks inside a button (no word-break/overflow-wrap/hyphens); `.kslot-a` now wraps to a new row (`min-width:min-content`).
3. Fault (4) "???": not missing data. j61 name mask (`k61Node`) and jaudit `kitRankNamePaint` mask names of palace people the LOADED life does not know yet, in any text on screen; a slot shows ANOTHER life, so a slot name equal to a palace person's name was printed "<title> ???". Fix: both skip `.kpt-mount` and `.kslot` (j61 const `K61SKIP`, jaudit `KRN_SKIP`). Covers every slot summary (sổ, co-op rooms, Sổ mây versions, Sổ luân hồi).
4. Regression question (batches 0032/0132): not them. Those only touched co-op and jkitpage samples; the live-frame wrapper (jksize v3) predates them and the late-mount hole was always there once Chọn sổ became a kit scene page.

## Scan (dev/test/save-dlg-scan.js: Chọn sổ Một mình + Cùng hảo hữu + Thiết lập + Sổ luân hồi at 755x1000@2, 412x1058@2, 1180x820@2, 1366x1024@2, 390x844@3)
counts of broken words + squeezed columns (<120 px info / <64 px button) + cut pictures + live picture column + "???" + off screen:
| | before | after |
|---|---|---|
| total over 10 screens x 5 sizes | 128 | 0 |
| frame width Chọn sổ (Fold / iPad) | 380 | 560 |
No page errors, no horizontal overflow, no scroll. dev/test/save-dlg-mask.js: trap name masked in control, kept in `.kslot` and `.kpt-mount` (before FAIL, after PASS).
Shots (looked at): Chọn sổ at 755x1000 and 1180x820 are clean (Sổ mây card, 3 sổ, Phúc duyên, all buttons whole words). Kept outside git (scratch).

## Tests
quickcheck PASS (open ok, old save loads + plays a buổi, core gates PASS, perf render 217/263 ms vs live). chonso-cloud.js 0 FAIL, cloud-save.js 0 FAIL, save-slots.js ALL OK (old sổ + old room load).

SẴN SÀNG KIỂM 668e4692 (review/save-dlg-fix)

## UPDATE 17/11 03:15Z: branch now 6d60cfd7 (d431dc3db merged, site rebuilt). Part 1 (Chọn sổ, 4 faults) = DONE.

## HANDOVER (worker rolled over at its context limit; COORDINATOR opens the successor, same branch review/save-dlg-fix, base 6d60cfd7)
Remaining, from main s28 messages 02:55Z-03:08Z (verbatim owner words are in OD tail; refs dev/handover/refs/owner-tuanluc-fig-wide-1117.jpg, owner-tuanluc-rel-1..3-1117.jpg; the successor must re-fetch the handover branch):
A. Tuần lục (kit book-page part, jsl.js:147 KIT 32.2a; KIT.md T3 'figure column <= 36 %'; ledger row 137): the figure column hugs the LEFT page edge, narrow (standard proportions, feet visible); the RIGHT text frame/column gets the freed width and is WIDER. Owner CORRECTION: text size does NOT change. Every Tuần lục page + every page/dialog with a figure column (whole family). Report before/after column widths at Fold 755x1000, iPad 1180x820, cover 412x1058, 390x844; shots of page 4 'Tổng lược' on Fold + iPad.
B. KIT 52 kitRelTable (dev/build/jkrel.js:57): an 'on paper' mode for every book page: no purple header band, no white card; the table sits straight on the paper (text colours readable). The Thái hậu table is cut at the right edge ('TUẦN NÀY' column): must fit the wider right column. Same branch.
C. Then one SẴN SÀNG KIỂM for the whole branch to main s29 (id in dev/handover/HANDOVER_SESSION9.md; s28 forwards meanwhile).
Tools already on the branch: dev/test/save-dlg-scan.js (Chọn sổ screens: harness pattern = dev/test/coop-serve.js + a life in each slot), save-dlg-mask.js. Build: python3 dev/build/assemble.py; node dev/test/*.js; final: bash dev/site/build_site.sh, commit, bash dev/tools/quickcheck.sh (run in background, ~270 s).
Tips: direct-mode harness serves dev/index.html with images aborted (sparse), so for figure shots route img/ to the live site as dev/test/slot-card.js does.
