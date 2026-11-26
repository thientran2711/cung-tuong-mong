# OB-KIEP report (owner bug 25/11 ~22:40Z, iPad «Thân phận kiếp này») — review/ob-kiep

PRIORITY #1 CHECK ('kaRowH|gain wall|klist'): OD 8 | ledger 1 | claims 8 | main 15 | review/* 0 | archive 22 — no earlier list rule; kaRowH (j63) is the one row writer.
PRIORITY #1 CHECK ('emotion seal.*(identity|selection|menu)|kesCan|lean.deny'): OD 1 | ledger 0 | claims 0 | main 4 | review/* 0 | archive 0 — no screen gate existed.

Base LIVE origin/main 5e013076 · branch review/ob-kiep · final code sha 8d0aa7b8 (d0a02876 lists+seal gate · 13f75d40 kef1 unit · comment one-core fix · 7b89815c no layout read in kesNonPlay, class write only on change · scan print).
Coordination: KK33 told (send_message) — I change j63 kaRowH/kaListCls/kaListFix + its CSS, j79 kitRows (one line), jopic kitOptFinal (one line), jemoseal kesCan/kesBlocked; I do not touch jkstage/jkhand/jksize/jseal.

## (1) Gain wall → KIT §6.6 GAIN LIST (law 9, in the kit)
- `kaListCls(k,L)` (j63): a Tốn/Được/Mất/Kèm/Thành/Bại row over 56 chars (or an item over 40) becomes `.klist` = one item per line (small dot, no «·»); ≥3 items all ≤22 chars → `.klist2` = 2–3 columns (CSS auto-fill, never measured). Short rows stay one line (OD 23/11 ~20:30Z: short pairs never split). Cần + Ghi chú untouched.
- Same rule in `kitRows` (info tables, labels Tốn/Được/…) and in `kitOptFinal` rows built from copies (`kaListFix`). CSS lifted by `:is(#kl1#kl2#kl3,.klist)` over the jopic `#modal#modal` / jk4 value-flow rules; `.kef1` stat units stay unbreakable (kit-ef-unit PASS).
- DATA (jkc kcPathHTML, jkc2 kcPathHTML; whole «Con đường» family = tiểu thư, tội thần, dân nữ, hòa thân): one plain sentence per item, no «,» inside an item (the kit splits there: «kế mẫu» / «thứ muội ngáng chân» were fragments). Tội thần «nhưng nhà ngươi sụp đổ … (hồi môn bị tịch thu)» moved from ĐƯỢC to MẤT; «Phúc duyên khi qua tuyển tú» → «qua mỗi vòng tuyển tú được thêm Phúc duyên»; «vào cung muộn hai năm · lúc hai mươi tuổi» → one item; conditional losses («tuyển kém thì…», «ra mắt kém thì…») → Kèm. jkc2's string-replace wrapper for the hành trang line removed (now an item in jkc).
- KIT.md §6.6 written; §38.4 lean.nonPlay written.

## (2) Emotion seal popping on the identity screen → KIT §38.4 lean.nonPlay
- Trigger: jemoseal lean-in (`kesCan` = any seal inside `#modal` may lean; the identity card is a #modal, its face picker cards are pcPort frames with her own seal) → the big chibi clone popped every 4–8 s over the faces.
- Fix: `kesNonPlay(el)` gates `kesCan` + `kesBlocked`: title home + sub-screens (co-op lobby, slots), Luân hồi roulette, identity card (NLP / nl queue item), any `.kpick` list. Still seals stay; play screens unchanged.

## Scans (law 11) — before (LIVE 5e013076) / after (13f75d40)
| scan | LIVE | fix |
|---|---|---|
| kit-gain-list-scan: option lines (dev/build + live «Con đường») | 792 | 792 |
| WALL rows (one «·» run over the limit) | 138 | 133 (5 removed by rewording) |
| WALL rows shown as a list | 0 | 133 (7 as 2–3 columns) |
| MISLABEL (loss/risk inside Được) | 1 (kcPathHTML[td]) | 0 |
| emoseal-nonplay-scan (prints the gate: PLAY nonPlay=false on both devices) iPad 1180x820, 20 s/screen: title / roulette / identity / identity+picker in view | 0/0/0/**3** leans | 0/0/0/0 |
| same, Fold 755x1000 | — | 0/0/0/0 |
| idshot probe iPad identity card 25 s | 4 leans | 0 |
(PLAY control lean count was 0 on both builds in the 20 s window — the opening dialog blocks stage leans; kesNonPlay is false there by construction.)

## Gates
- kit-ef-unit Fold+iPad PASS · kit-e-rows PASS 26 · kit-cost-rows-home PASS 15 · coop-e2e alone 143/143 PASS.
- quickcheck vs LIVE on d0a02876: build/core gates OK except G4 90-button-crawl («Ô lưu · Lui» close) and G4 92-look-dedupe (Fold mood-seal real tap «undefined»). BOTH PRE-EXISTING: button-crawl gives the same single FAIL on LIVE 5e013076; look-dedupe is flaky on LIVE too (LIVE iPad FAIL, fix PASS on rerun). FINAL quickcheck on 8d0aa7b8: all core gates PASS except the pre-existing G4 90-button-crawl («Ô lưu · Lui», same single FAIL on LIVE); look-dedupe PASS; old save ok; perf new/live render 213/217 ms, tab 643/593, buổi 1416/1471, tasks>200ms 28/27.
(Note: an earlier run on 13f75d40 showed buổi 2659/1644; kesNonPlay then read layout (getClientRects) on every seal — removed in 7b89815c; quickcheck.js --runs 5 then gave buổi 4202/4856, final full run 1416/1471 = no regression.)

## Shots (looked at, Fold 755x1000 + iPad 1180x820, same screen = tội thần, «Con đường»)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-kiep/obk-than-phan-before-fold-ipad.jpg (LIVE: wall + chibi seal popping over the faces on iPad)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-kiep/obk-than-phan-after-fold-ipad.jpg (fix: lists, Mất holds the fallen house, no seal pop)
singles: obk-than-phan-{before,after}-{755x1000,1180x820}.jpg in the same folder.
Note: Fold keeps the existing narrow figure-left panel, so each item wraps to 2–3 short lines there (layout untouched, not in scope).

## (3) Fold frame width (MAIN 148 order, law 12) — cb91d5c4
- Root: `kpIdLay` (j79) sized the Fold figure column by `BAL.figWideRef` .65 → the info frame was ≈307 px; gains wrapped 3–4 words a line, «Đổi thân phận» chip broke into 4 lines.
- Fix, KIT 56.11 rewritten in place (canon overwrite): the one-page figure-left card keeps the frame ≥ `KPID_PANEL` 66 % of the usable width (≤ 560; Fold ≈ 472 px); the ONE figure body is lowered to the column left, still whole beside the frame (56.7). iPad landscape and 412 cover (figure-above) unchanged. Family: `kpfig` = the identity / opening scene card is the only figure+frame selection layout (roulette = grid, menus = plain panels).
- LAW 16 FLAG for MAIN: 56.11 (owner 18/11) set the Fold figure = book size 641; on Fold it is now ≈ 430 so the frame has room (MAIN 148: «picture may sit behind/smaller»).
- Videos (full, looked at frame strips): img/_review/ob-kiep/obk2-than-phan-full-fold-755x1000.mp4 · obk2-than-phan-full-ipad-1180x820.mp4; stills obk2-than-phan-fold-wide-755x1000.jpg · obk2-than-phan-ipad-1180x820.jpg.
- Quickcheck on cb91d5c4: all core gates PASS except the pre-existing G4 90-button-crawl («Ô lưu · Lui», same on LIVE); old save ok; perf new/live render 240/248, tab 551/645, buổi 1636/2327, tasks>200ms 24/25.
