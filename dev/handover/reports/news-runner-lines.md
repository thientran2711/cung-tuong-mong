# E90 news-runner-lines — SẴN SÀNG KIỂM 2608109d (branch review/news-runner-lines, from main 5e013076)
PRIORITY #1 CHECK ('nghe ngóng'): OD 7 | ledger 3 | claims 8 | main jptime.js:158 ptReg("listen") + jerr.js errPanel (the composers) | review/* none | no existing composer → one added.

## Cause
ptLand composed `rep.t` («<who> <verb> trở về») + ` · thành` + `. ` + every log line. Runners also logged «<who> … trở về: <body>» where the body already starts with «<who> …». jerr errPanel (the one «tin» panel) printed head + lines the same way. Result: head, tag, then the same sentence again.

## Fix (whole group, ONE composer)
`ptRepFacts(rep,nm)` / `PTIME.repFacts` / `PTIME.repText` in jptime.js → {h, L, k}:
- head dropped when the first body line already starts with the same person; doubled «trở về» collapsed; «<who> … trở về: <who> …» collapses to its second half; lines de-duplicated, each a full sentence;
- the result is its OWN last sentence «Việc thành.» / «Việc hỏng.» (never «· thành.» glued).
Used by all three composers: ptLand notice text, ptPanel (fallback tin panel), jerr errPanel (via PTIME.repFacts, old fallback if absent). Runner `listen` no longer prefixes its log with «<who> nghe ngóng trở về: ». Every ptReg kind (spy, listen, scout, invite, harm, plant, gift, buy, clothes, taste, ask, vlbuy, mktspy, bribe, thy*, errpic…) goes through the same composer, so no per-kind edit was needed.

## Before / after (real strings)
| case | before | after |
|---|---|---|
| listen ok | Tịch Nguyệt nghe ngóng trở về · thành. Tịch Nguyệt nghe ngóng trở về: Tịch Nguyệt nghe ngóng được về Hoàn Y (hay gây chuyện): nàng ta mới nhận lễ. | Tịch Nguyệt nghe ngóng được về Hoàn Y (hay gây chuyện): nàng ta mới nhận lễ. Việc thành. |
| listen fail | …nghe ngóng trở về · hỏng. …nghe ngóng trở về: Tịch Nguyệt đi nghe ngóng một vòng, chưa nghe được chuyện gì đáng bẩm. | Tịch Nguyệt đi nghe ngóng một vòng, chưa nghe được chuyện gì đáng bẩm. Việc hỏng. |
| scout ok | Tịch Nguyệt dò nơi ở Hoàn Y trở về · thành. Tịch Nguyệt báo: Hoàn Y đang ở Càn Ninh cung. | Tịch Nguyệt báo: Hoàn Y đang ở Càn Ninh cung. Việc thành. |
| scout fail | …dò nơi ở Hoàn Y trở về · hỏng. Tịch Nguyệt không dò ra Hoàn Y ở đâu. | Tịch Nguyệt không dò ra Hoàn Y ở đâu. Việc hỏng. |
| invite ok | Tịch Nguyệt mời Hoàn Y trở về · thành. Hoàn Y nhận lời, sang cung ngươi. | Tịch Nguyệt mời Hoàn Y trở về. Hoàn Y nhận lời, sang cung ngươi. Việc thành. |
| invite fail | …mời Hoàn Y trở về · hỏng. Hoàn Y từ chối lời mời. | Tịch Nguyệt mời Hoàn Y trở về. Hoàn Y từ chối lời mời. Việc hỏng. |
| target gone | đi dò la Hoàn Y. Tịch Nguyệt trở về: người cần dò la không còn trong cung. | Tịch Nguyệt trở về: người cần dò la không còn trong cung. |

## Tests
- `node dev/test/news-runner-lines.js` (new): drives listen ok×2, scout ok/fail/gone, invite ok/fail/gone, spy ok/gone in the real build + composer over 7 head templates × ok/fail/none × 4 bodies; asserts no «· thành/· hỏng», no doubled «trở về», no sentence repeated, no same name+verb twice in one sentence, result on its own, the owner's sentence reads once. All ok, no page errors.
- `ptime.test.js` / `ptime2.test.js`: FLAKY on base 5e013076 too (1–4 FAIL on random starts, e.g. 9 harm, 15–19), same failure set with and without my change → not caused by it.
- Not run: full quickcheck, old-save load beyond ptime tests (change is pure string composition; no state shape touched).

## NOT DONE — shots
Fold 755x1000 / iPad 1180x820 shots of the news line: NOT obtained. The fresh-game intro chain (chest «Rương đồ khuê các» + item modals) covers the stage in my headless script and I could not reach the «Tin báo» panel cleanly (looked at 4 frames; they show the chest/item modals, not the news). Foreman E: assign a reviewer to shoot the panel (kitNoticeOpen after the intro) or tell me the intro bypass flag.
Tier: SMALL (text only, no rule touched). Scan table: the 7 rows above + the 7-head composer matrix in the test.
