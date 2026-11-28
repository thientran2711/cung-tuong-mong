# KK65 — review/kk65-ui5 (base review/lc34-ui5 c711f8e1) — RV-178 nits on the kk64 pair
PRIORITY #1 CHECK: OD n/a (RV-178 §4 nits, MAIN 184/185 queue) | main LIVE 18003079 | review/* lc34-ui5 c711f8e1 (holds kk64-ui4 + kk64-kri-ui4) | claims KK65
KIT CHECK: reuses kriLogSince / kriGiftOk / the kit result card note row (k:"note"), realtap rt.choose; no new UI part.

## (a) K-GIFT-NOTE — Ghi chú carried a foreign sentence (real, fixed)
Cause: j3 logChoice folds every log line of the tick into ONE «Title: choice — s1. s2. summary.» line, so the K-GIFT-OUT filter
(lines naming the piece) still let a world sentence through inside that line. Fix: kriNoteLines (jkring-item) keeps, per line naming the
piece, only the sentences that name the piece or the receiver; the stat summary is already the rows; the seal (kriGiftOk) still reads the
unfiltered lines. KIT.md line «K-GIFT-NOTE» under §104.4.
| kit-gift-out (case A asserts the note too) | before (ui4 trial, old code) | after (ui5 + fix) |
|---|---|---|
| Fold + iPad | 2 FAIL / 8 (note: «— Ở Đông cung, người của Lệ phi phát hiện chuyện cũ không thành. Ngươi tặng …») | 0 FAIL / 8 (note: «— Ngươi tặng Áo tang vải trắng cho Phùng Dung Âm: thiện cảm +9. Vì sao: …»; hand-back line kept) |
Looked at: kit-ring-item gift result card Fold 755x1000 + iPad 1180x820 (maid-sent gift: Được / Mất / Ghi chú with the maid line, «Xem món khác») — unchanged, fine.
Side note (not this unit, pre-existing look): on Fold the result card's «KẾT QUẢ» tag wraps onto two lines.

## (b) kit-pick-go Fold grid_bieuqua «22 tiles unreachable» + danhhieu «Để sau!» stays — both HARNESS GAPS, not game faults (fixed in the tests)
- No one-tap send: per-tap probe on Fold — after each tile tap the picker stays open (only the tile turns .on); the result card in the «dead»
  still is from the test's own final «Biếu» tap. No law-3 risk.
- grid tiles: the tile grid .kshg.kipg (377 px, scroll 2134) sits INSIDE the scrolling body #mb (530 px, scroll 1231); rt.tap scrolls only the
  grid, so rows under #mb's clipped foot read «unreachable». One real wheel on #mb (off the grid) brings the whole grid above the sticky
  «Biếu» (Fold grid 325–702 vs Biếu 741) → 34/34 tiles reachable Fold + iPad. A person does the same drag.
- danhhieu: «Để sau!» is a HAND card (§101); tapping its body only lifts it («Bấm ✓ để chọn lá này»). The case used rt.tap because the label
  matches the close regex; now every option card goes through rt.choose (lift → ✓), KIT §5116 robots-choose-like-a-person.
- Fix (whole family, law 11): kit-pick-go.js AND its source dlg-dead-scan.js (same two code paths).
| run | before | after |
|---|---|---|
| kit-pick-go 9 cases (5 grids + danhhieu + 3 tin báo) × Fold + iPad | 4 FAIL (Fold bieuqua 22 dead, danhhieu ×2, iPad bieuqua prompt-hidden flake) | 0 FAIL (ui4 trial); ui5: 0 FAIL except iPad bieuqua «prompt hidden» under 3 parallel browsers → alone ok (a klifewait layer, load flake) |
| kit-pick-go full suite (ui4 trial) | — | 42 cases, 0 FAIL (1 SKIP: Fold bieuqua opened under a world beat; targeted run ok) |
| dlg-dead-scan full (ui5) | — | run 1 (3 browsers in parallel): 1 FAIL Fold dongso — the old and the new test both pass it alone; run 2 (alone): 36 cases, 0 FAIL (1 SKIP Fold ring_tangqua «ring did not open», ok in run 1, ring path untouched) |
Remaining harness gap for Foreman F (owner of realtap.js): rt.tap scrolls only the nearest scroller; a target inside an inner scroller that is
clipped by an outer scroller (#mb) reads «unreachable». Left in realtap (shared by every gate); noted in FOREMAN_F_STATUS.
