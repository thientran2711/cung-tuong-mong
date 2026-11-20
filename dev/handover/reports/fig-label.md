# fig-label — SẴN SÀNG KIỂM e9f34064 (review/fig-label, merged with origin/main 37e4a68f)
PRIORITY #1 CHECK: OD 20/11 ~06:30Z (owner screenshot) | main j3 pMaid, j59title, j15 pcard, j2 homePeople, j10 srow2 | review/* none | claims none. START_CTX ~8 % (depth not queried).
**Bug**: stage caption = «Cung nữ tam đẳng» (rank, j59title) + «Cung nữ thân tín Tiểu Hoa» (role, injected by the kitRankNamePaint from pMaid.rw).
**Fix (small)**: ONE helper `kitMaidTitle(m, lower)` (dev/build/j79.js): role + rank said once, rank from SRK.maid via srk() (never typed) → «Cung nữ thân tín tam đẳng»; a non-"Cung nữ" rung → «Chưởng sự cô cô thân tín». Name line = «Tiểu Hoa» alone.
Every place calls it. ONE shrink rule `kitFitTitle` (j59, kit): the stage title is one line (nowrap), font steps down until it fits the tag (floor 9 px) — no per-place rule; fixes the 3rd-line wrap seen before the shrink.
| place | before | after |
|---|---|---|
| stage figure tag (j59title) | Cung nữ tam đẳng / Cung nữ thân tín Tiểu Hoa | Cung nữ thân tín tam đẳng / Tiểu Hoa |
| pMaid.rw (pframe, dialogs, painter) | Cung nữ thân tín | kitMaidTitle() |
| person card rank (j15) + j70 hooks | Cung nữ thân tín | kitMaidTitle() |
| homePeople info (j2), mm:me info (j95), people-index label (j95s) | Cung nữ thân tín · … | kitMaidTitle() · … |
| staff srow2 (j10) + j70 patch | cung nữ thân tín · lòng | kitMaidTitle(null,1) · lòng |
Not changed: NPC maids «Cung nữ thân tín của X» (role only, no rank shown); servants/eunuchs/ma ma (rank only, no duplicate role).
**Tests**: `node dev/test/fig-label.js <out>` Fold + iPad PASS (every SRK.maid rung merges, old save without rk → tam đẳng, tag = 2 lines, title fits one line, scan of tags/cards/rows finds no repeated role word, 0 page errors). `sh dev/tools/quickcheck.sh` PASS (186 s, old save ok, core gates PASS).
**Shots LOOKED** (handover branch, no CDN upload): dev/handover/shots/fig-label/stage-fold-after.png, stage-ipad-after.png (home stage, Fold 755x1000@2 + iPad 1180x820@2), card-fold-after.png (person card). Servants list is covered by the staff-row assertion in the test (row text), not a separate shot.
