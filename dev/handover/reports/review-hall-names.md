# Review hall-names — review/hall-names @ c294e1d (small reviewer)
PRIORITY #1 CHECK ('tên điện'): OD 0 | ledger 0 | claims 0 | main jhall.js (E3, already landed) | review/* only this branch.
VERDICT: **PASS aed411f** (review/hall-names-r6 = c294e1d + final-merge of origin/main fd6118c, only index.html/sw.js conflicted, rebuilt by build_site.sh; scan, lines Fold+iPad, quickcheck re-run green on the merged head).

## Checks
- hall-names-scan: OK (10 palaces, 38 plaques unique, 0 leaks).
- hall-names-lines on Fold 755x1000@2 and iPad 1180x820@2: HALL-NAMES LINES OK, 0 page errors, no overflow; note "Cùng Cảnh Phúc cung với ngươi", list line "Chủ vị Phi X · Nhã Vận hiên: Y".
- quickcheck: PASS (open ~1.7 s, 0 errors; old-save step skipped, no live build given).
- Shots looked (own run, not CDN, wiped): title "Sùng Đức điện · Khải Tường cung" fits on both devices, no cut text.
- Diff read in full (10 files, +73/−19): display-only strings; houseName falls back to "thiên điện" when no hall known; no data/save change.
## Laws touched
7 wording OK (no %, no odds words). 9 kit: no new part/CSS. 4 no numbers. 6(b/c) names tie to real residenceOf halls. 11 whole group: all "Cùng ${houseName(" sites switched (j6, j15, j78, jhc) + scan guards leaks. 16: landed table untouched.
## Notes (not blocking)
- Open question stays with MAIN: side halls hiên/trai → điện (history expert) — law 16, owner/main call.
- Worker's CDN shots wipe: no review shots were uploaded by me.
