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
