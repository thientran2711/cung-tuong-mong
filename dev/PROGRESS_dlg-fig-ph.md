# PROGRESS review/dlg-fig-ph (D50, worker, 16/11)
Bug: a person with no full-body figure art shows an empty frame in the dialog person column.

## Cause
kitFigOf (j90) returned "" when figFor had no identity for the record (story NPC {kind:"npc"}, name-only records, __cap/__role stage entries, children without a ref).
kitStageFig then returned "" so kitEventStage fell back to the small portrait frame / nothing. A figure file that 404s also hid its column (kesno).

## Fix (kit level, KIT 32.2 kitStageFig / kitFigOf; no new style)
- j90 `kitSilFig(p)`: the kit silhouette unknown-fig-f|m|k by personRoleRank / sex / age; kitFigOf falls back to it when figFor returns "".
- jk4 kitStageFig: `data-sil` = the silhouette; `kitStageFigErr` swaps a failing figure to it once; only a failing silhouette hides the figure.
- Same chain as the week book (j87) and the stranger rule (L1187 "silhouette for strangers"). No kit request needed.

## Scan: dev/test/dlg-fig-scan.js (every group: player, emperor, Thai hau, queen, consorts, children, maids, staff, eunuchs, court, men, ad-hoc NPC records)
Per person: kitFigOf state (figure / silhouette / EMPTY) + a live kitEventStage dialog (figure column must hold a loaded picture).
| group | n | BEFORE empty/portrait-frame | AFTER |
|---|---|---|---|
| npc records (no ref, name only, __cap) | 6 | 6 EMPTY | 0 (silhouette) |
| child without ref | 1 | 1 EMPTY | 0 (silhouette) |
| all others (consorts, queen, kids, maids, staff, eunuchs, court, men, emperor, Thai hau, player) | 57 | 0 | 0 |
Total EMPTY 7/64 -> 0/64 (BAD 0). (Slow-CDN "still loading" cases are reported as ok(slow CDN) after a HEAD check; no 404.)

## ART NEEDED
No person lacks art in the current identity pools: every strangers/men/consort/child resolves to a silhouette until met, then a real figure. NPC records without a ref (Phế phi họ Lý, Quản sự Tân Giả khố, Thầy dạy Thượng thư phòng, generic servants) show the grey silhouette; if the owner wants real faces, they need an identity (ART NEEDED: story NPCs "Phế phi họ Lý", "Quản sự Tân Giả khố", "Thầy dạy Thượng thư phòng" — 4 age bands each).

## Tests
- dlg-fig-scan: BAD 0 of 64. panel-size.js (1180x820, 755x1000, 844x390): 37 cases, one width 560, no nofit/xOut/btnOut, errs 0. stage-fig-size.js: face true, sq true, over 0 everywhere; one slow-CDN sample (visit @844x390 figH 0 = image still loading).
- Screenshots 755x1000@2, 1180x820@2, 1366x1024@2, 844x390 checked (silhouette column, no empty frame).
