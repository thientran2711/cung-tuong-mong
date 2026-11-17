PRIORITY #1 CHECK: OD 1569/1575/1576 (right column, tab-bar info slot, no '!' on stat cells) | main 0 | review/* 0 besides morechip-fix-r1 (trial-merged) | claims 741/747.

# review kit-rcol-top-r1 — reviewer r1
Reviewed review/kit-rcol-top 44ac9cda. Result PASS on **8c84e6be** (review/kit-rcol-top-r1 = merge of worker + 1 small fix onto newest origin/main 6ca04148; source only, main rebuilds the site as the worker's note says).

## Fix made (1)
Giao tình (khuê nữ mode) Kinh thành tab still had an info band under the tabs (`<p class="kpnote">ⓘ Ra phố…`, jkc.js:620). Moved to the tab bar trailing slot (kitSubTabs info), same as the others. Not run in khuê mode (needs a kc save); 3-line change, same pattern as jtabs.

## KIT-FIRST scan
| family | result |
|---|---|
| right column #kshR, Fold/iPad Air/iPad Pro/iPhone landscape, views Hành sự · Dư đồ · Tài nghệ · Mệnh truyện · Việc nhờ | width 140 everywhere, left edge identical within a view, 4 person cards 140x55 identical, Ân sủng + Nguy hiểm chung boxes same width, 0 clipped, 0 h-scroll |
| tabbed screens (Tài nghệ, Mệnh truyện, Việc nhờ) | ⓘ in the tab-bar slot (right end, 0 px from edge); no band under tabs; Tứ đức header holds ⓘ Tứ đức + Đức chip + ⓘ luật Đức; only data chips (Danh sư, chapter chips, Xong/Hỏng) left as rows |
| top stat bar | 0 `.kstw` in every view/size; Đức goal text in tooltip + tap popup |
| tabs-kit-shots (Fold + iPad, all 12 sub-tabs) | bad 0, errs [] |
| small-bugs-2, small-bugs-4, header-danh | pass / no errors |
| trial-merge with review/morechip-fix-r1 3bed78e3 | source auto-merges clean; with both: Fold home "+4" chip sits below the column (not on it), column 140 wide |

## PERF (the worker's buổi 1100 vs 567)
quickcheck --runs 7 vs live main 65dcf52f: PASS 385 s · open 1463 ms · old save ok · core gates PASS · medians new/live render 245/242, tab 344/345, **buổi 1126/977**, tasks>200ms 14/13. Per-run buổi new 731–1109 vs live 838–1251 (overlap): noise, no regression (the change is CSS grid + dropped badge, nothing on the buổi path). Final merge (6ca04148 base) --runs 3: PASS · render 162/153, tab 279/306, buổi 974/840 (a single new run hit 1596 in the same build as 801: box noise).

## LOOK
Fold 755x1000 (home, Dư đồ, Tài nghệ Tứ đức, Việc nhờ), iPad 1180x820 (Dư đồ), 844x390 phone landscape (home, Tài nghệ), iPad Pro/Air all views scanned. 390x844 and 412x1058 portrait show the "Xoay ngang" prompt (expected). Dư đồ map picture is blank in this sandbox (CDN art not cached), column/cards fine. Worker CDN shots wiped (cdn_sync --wipe-review kit-rcol-top); mine are scratch only.

## Not done / notes
Kit sample page §33.40 added by worker is shown on the kit page only; not opened by me. Khuê nữ Giao tình Kinh thành not run in-mode (see above).
