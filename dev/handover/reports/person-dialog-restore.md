# person-dialog-restore (owner bug 18/11 06:10Z, OD:L1852) — worker report
PRIORITY #1 CHECK: OD L1000/1009/1543/1557/1560/1852 | main j15 popCard (single group), jk3:458 `.pcx+*`, j65 talk (nrTalk), jpcf pcfShown | review/* none | claims: this row.
Branch review/person-dialog-restore, sha e6bda27 (code = df7e922, later commit only extends the scan) (on main a95e8d4). Quickcheck PASS (core gates, time-spill, open, old save, perf new/live render 193/167 ms).

## What was wrong / what broke
- Empty band: jk3.js:458 `.pc>.pcr>.pcx+*{margin-top:42px}` (KIT 32.10: first act card clears the ✕). kitPcFix (jk2b) later prepends the sticky info block BEFORE the ✕, so the rule hit the act list (or the result note) under the sticky block -> 42px band on EVERY person card. Fix: `.pcx:first-child+*`.
- No tabs: popCard (j15) put every act in ONE unnamed group (22 cards in one column). Git history is too shallow here to name the commit; the 42px rule dates from KIT 32.10, the sticky block from kitPcFix.
- Notice in column: j65 talk wrapper suppressed the bottom result card whenever the dialog showed popMsg as a note (nrTalk "the card shows the result").
## Changes
1. j15 popCard: acts grouped by kitActCat -> KIT_CAT labels (same Hành sự categories), rendered by the existing pcard `.pctabs/.pct` row with "làm được/tổng"; one category = no tab row. Card note removed (popMsg stays as state).
2. j65 talk: the result is ALWAYS the standard bottom result card (#rtoast); acts that only log (greet) get it from log + snapshot ("Ta đã biết: đó là Quý phi …").
3. jstaff elder card: note removed, result card fired after the act. jpcf pcfShown kept (line shown in the card is not repeated as "Dạo này").
4. jk3 CSS fix above. Card size rule unchanged: kitOptFill = one size per group, tall rect picture fills the card (OD:L1557).
## Scan (dev/test/person-dialog-restore.js, Fold 755x1000@2, before = main a95e8d4)
| kind | tabs before→after | empty gap px before→after | column note after an act | bottom card after |
| stranger | 0→2-3 | 197→10 | – | yes |
| consort | 0→2-3 | 52→10 | Y→– | yes |
| queen | 0→2-3 | 52→10 | Y→– | yes |
| Emperor | 0→3 | 52→10 | Y→– | yes |
| Thái hậu | 0→3 | 52→10 | – | yes |
| maid / elder | 2 → 2 | 10→10 | – | yes |
Card heights equal inside each tab group (hMin=hMax). iPad 1180x820: stranger/queen/consort/Thái hậu tabs 3-4, gap 10, bottom card yes. Kid: no kid in the test life (skip); men dialogs use other cards, not touched.
## Open / not done
- Shots (Fold + iPad, LOOKed 3x) are local only in the session scratchpad (images may not go to git; cdn_sync not tried). Old refs owner-person-dialog-layout-1118.jpg etc. were NOT on the handover branch, so no side-by-side with them; compared against OD text only.
- After an act the dialog goes to its "already talked" state (Việc nhanh + Kỷ niệm) as before; unchanged.
- Per-card empty space under short text remains where one card in a group has a long text (one-size rule OD:L1557).
~85% xong / ~85% chơi được

## Group scan 2 (ROOT-47 order, Fold)
| kind | tabs | gap px | column note | bottom card |
| servant (serv) | 4 | 10 | – | yes |
| maid | 2 | 10 | – | yes |
| Thái y (ty) | 2 | 10 | – | yes |
| cold-palace consort (fallen) | 2 | 10 | – | – (dialog closes) |
| kid | 0 (no acts offered at all, so no tab row needed) | – | – | – |
Officials/men use other cards (not popCard) — untouched.
## Shots (CDN, delete after verdict via cdn_sync --wipe-review person-dialog-restore)
https://ctm-img.victoria-tntt.workers.dev/img/_review/person-dialog-restore/{fold-consort-before-1-2_after-1-2,ipad-consort-before-1-2_after-1-2,fold-kid-before_after,ipad-kid-before_after}.jpg
(before = main a95e8d4 | after = this branch; the two halves are different random lives, so the characters differ.)
