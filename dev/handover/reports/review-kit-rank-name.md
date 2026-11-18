# REVIEW kit-rank-name r1 @ a4ccfc74 — verdict PASS a4ccfc74 (+ scan fix on review/kit-rank-name-r2 @ 188f63c9)
PRIORITY #1 CHECK: OD tail 17/11 ~16:20Z item (b) | main kitRankName/kitOptStackTitle (reused, nothing new) | review/* r0 9f54a9a1, r1 a4ccfc74 | claims kit-rank-name MAIN s35.

## Results
1. One kit entry: kitRankName/kitDedupRank (jk4), gift/teacher/target pickers via kitOptStackTitle in kpOptArt; no private variants found.
2. Scan (rank-name-scan.js, http://, fresh life): 755x1000 0 dup (3 places), 412x1058 0 dup, 390x844 0 dup; 1180x820 and 1366x1024 reported 1 "stack-misplaced" on EVERY run = scan false positive: it is the Tuần lục person-page header (.kbk-pname: rank over name beside the portrait = allowed STACK), NOT the cover. r1's exemption (.k-cover) did not match. Fixed in the scan only (exempt .kbk-pname): r2 188f63c9 -> 1180 and 1366 now 0 dup (12 places), page errors 0. Product code unchanged.
3. Played-in-life shots (http, CDN art loaded): stage figure feet = stack "Đáp ứng / Ôn Tú Uyển", "Cung nữ / Như Ý"; Dư đồ map shows place labels only (no person tokens); Tuần lục person page = stack header with portrait, entry/body line = ONE line ("Hoàng hậu Kiều Kiều Nguyệt"), contents rows = one line; iPad 1180 gift picker = rank over name with face, Hoàng thượng / Thái hậu one word; person card header = rank over name, once; Fold gift picker same. Rank never twice on any card.
4. Cover (judge from shot): the cover title page has NO name and no portrait (title, date, season only) -> nothing to stack; one-line rule trivially holds. Stack on the cover is not needed.
5. quickcheck (bash dev/tools/quickcheck.sh) on a4ccfc74: PASS; core gates PASS, time-spill PASS, old save loads (Lục Vân Thường) and plays a buổi, perf new/live render 166/231, buổi 723/928 ms.

## Notes for main
- origin/main is now 03a776e4; a4ccfc74 is BEHIND it (not fast-forwardable). index.html/sw.js are generated: rebase r1 (+ r2 scan commit) onto 03a776e4 and rebuild the site (bash dev/site/build_site.sh) before ff.
- Not verified: a person-picker with masked "Tần ???" row (no such row in my lives); sentence-style option titles intentionally left as prose.
- Shots were scratch only (/tmp), none uploaded; CDN img/_review/kit-rank-name-r1/ not used, nothing to wipe.
