# review-kit-size-10-r1 — reviewer (sonnet, SMALL)
Branch reviewed: review/kit-size-10 @ 8ab00ede (parent = live main 744b80e7, so it fast-forwards). START_CTX ~3 %.

## Verdict: PASS 8ab00ede

## Checks
| check | result |
|---|---|
| timed-choice-fit (12 cases: 4 sizes x sample / 2 options / no chip) | OK 12/12; chip y 574 (755x1000), 603 (412x1058), 484 (1180x820), 516 (390x844); chip above options in every case |
| Consistency scan: kitPopSample info/rule/event/result/news/long/timed at 755x1000, 412x1058, 1180x820, 390x844 | 28/28 open, 0 page errors, no horizontal overflow; question block (.kpmain) top is above .opts top in every dialog that has options (event, long, timed); dialogs without options unchanged |
| quickcheck.sh | PASS (core gates incl. kit-conform, time-spill, old save loads, perf render 253/240 ms, buoi 828/901 ms) |
| Kit: change is in jk4 only (KIT 32.5c), no private chip/row/frame; clock chip = existing kitCoopClock | PASS |
| VANPHONG / BAL: sample odds words from the ladder (Khá chắc / Năm ăn năm thua / Chắc), demo clock numbers from BAL.kitpage.clock | PASS |
| Shots (scratch, not committed): LOOKED at sample 755x1000, 1180x820, 390x844 | question, chip, then cards; figure column pinned |

## Noted limits, judged
1. Chip not pinned when the column scrolls: NOT blocking. It is visible at open at every size and sits above the first card; only scrolling down to the last card moves it off. FOLLOW-UP for main: owner OD:L191 says only the option list scrolls (text stays fixed); kdpall (older, not touched here) scrolls the whole right column. A pinned text block would fully meet L191.
2. 412 / 390 option titles squeeze to one letter per line (seen at 390 "Tranh sủng"; stage name "Phùng Trường A" also clipped on the left): NOT blocking. Portrait <= 420 shows the rotate prompt (OD:L339), my shots hid it to test; existed on main before. Fold cover 412x1058 is the same case; if the owner wants that size playable it needs its own request.
Branch pushed: none (no code changes by reviewer).
