# rv-chapter-card-3 — r1 FAIL (1 item) → r2 PASS (see bottom) — reviewer sonnet, MAIN CHÍNH 89, 21/11
PRIORITY #1 CHECK: OD 6 | ledger 0 | claims 8 | main 0 | review/* 4 | archive 1 | review/chapter-card-3 4771570e (brief line reused)
Tested: rv branch review/chapter-card-3-rv = 4771570e + merge origin/main 8acb2bef (ee19ba25; index/sw rebuilt by assemble.py + build_site.sh, no markers).

## Gates
- quickcheck ee19ba25: PASS (core gates, time-spill, open 1818 ms, old save loads + plays a buổi, perf ≈ live).
- coop-e2e (COOP_A=tt COOP_B=nc): 92/92 PASS.
- chapter-detail.js: **FAIL** both 755x1000 and 1180x820 (see item 1). Earlier assertions pass; dies at line 30.
- Page errors on all shots: none (Fold + iPad Air).

## Shots (Fold 755x1000, iPad 1180x820; looked 3x; scratch only, not in git)
Chương này, Sắc phong, Đã qua (1 ch.), Đã qua (0 ch.), Triều cục, Tâm nguyện: each shows the SAME kitSlide full-width banner (kicker/title/sub on the picture, Mục lục bottom-right, arrows+n/N on Triều cục). No big empty panel where she complained, nothing cut, no «NaN» anywhere. Đã qua with 0 chapters = shared kitEmpty (same picture-left layout as Hoàng tự «Ta chưa có con», checked side by side) → OD 21/11 ~03:10Z OK.
Note: there is no separate "Phụ tuyến" sub-tab in the row (5 sub-tabs; Phụ tuyến is the Triều cục/Tâm nguyện content). My shot state «pt» just showed Chương này. Khuê các variant not separately shot (same kitSlide code path, jkc/jkc2 only 8+4 lines of diff).

## FAIL list for worker
1. Sắc phong picture no longer opens the Sắc phong detail panel (older behaviour, test line 30 `#panel .kskill .ksart` → `rank picture -> Sắc phong panel`; the rank slide has no `tap`, and the test selector was only updated for the 'card'/'picture' loop, not line 30). Fix: give the rank slide `tap:` for the Sắc phong panel (jchap.js:45 opener, e.g. wrap in a global fn like chapOpen) AND update chapter-detail.js:30 to `.kslide .ksart`; rerun chapter-detail.js at both viewports until exit 0. Then recheck the rest of the file's later asserts (they never ran).
Everything else PASS. Not landing: no PASS sha. After the fix, ping reviewer/MAIN; only item 1 needs re-test (+ quickcheck).

## r2 re-check — PASS
Worker fix 7bd1a790 (rank/Triều cục/Tâm nguyện/Phụ tuyến slides tap:chapOpen, chip selector, test line 30). Merged onto origin/main 1e826e29 → rv sha below (index/sw rebuilt).
chapter-detail.js 755x1000 + 1180x820 exit 0 (incl. «rank picture -> Sắc phong panel», no page errors); coop-e2e 92/92; QUICKCHECK PASS (old save loads, perf ≈ live). Delta is 5 source lines, no layout change since the r1 shots (all sub-tabs on one kitSlide banner).
