PRIORITY #1 CHECK ('world window|worldWin|jworld|BAL.world'): OD 0 | ledger 0 | claims 1 (world-events worker) | main 0 | review/* only review/world-events 34520347 (the branch under review) — nothing duplicated.

# REVIEW world-events r1 — BIG (opus) review — PASS abe056c3

Reviewer session_01UV1SzghsExH1c11ENnDH6Q, opened by Foreman C-AG. START_CTX ~4 % of the window.
Branch `review/world-events-r1` = review/world-events 34520347 + merge of origin/main 25bfd7cf (assemble.py: main list incl. jtone*/jmkt + jworld before jrbatch; generated files rebuilt) + reviewer fixes. Head **abe056c3** is a fast-forward of origin/main 25bfd7cf.

## Owner rules checked (OD L1587, L1593, 17/11 ~14:30Z, read verbatim)
| rule | result |
|---|---|
| real game events only; every window has a real cause | OK: deaths (thDead / queen / heir), calendar (KC.ty+3n, tế Giao, thu săn, milestone birthdays), j55 court roll results (cong, failed lut/han + low Kho, lost war + low Biên), real jtsb fire + storm lightning (real weather), famine→plague, first prince / lập hậu / victory / end of disaster. One exception to note: `sao` (thiên tượng) is a monthly roll (BAL.world.sao.p 1.2). The brief says "NO pure dice event", but the owner's verbatim rule 4 allows "lâu lâu … sự kiện bốc thăm" when it is a real game event that touches everyone; sao does (no feasts, mood, NPC act/place weights, the j7 comet card). Accepted; Foreman may tie it to a court roll later if wanted. |
| affects EVERYONE (player + every NPC group; NPC choice sites read the window) | OK: nightCh / visRoll / stipend (monthPay pays S + every rival → same cut) / festToday+festival / wdTang / mindW (all jmind choice sites) / placeWhere; worldPlanW = the one interface for AG-ALL (ack ca94ddd4). |
| CENTER kit pop-up at start + end, her options, Tuần lục line | OK (shots below); log() line at start and end; world_check asserts it. |
| NO world-event "!" on the Dư đồ | OK: no AD_HAP_FIX / AD_HAP_FIRE / ACC_ROLE hook in jworld (grep 0). |
| reuse, no rebuilt arc; j92 wdTang folded, not duplicated | OK: j92's own S.wdTang is cleared and its card dropped while the window is open; jtsb, j55, j13 catchIll, j14 restore, j7 cards, jpet hunt reused. |

## Tests (all on the merged head; re-run after the fixes)
- QUICKCHECK (abe056c3): PASS · open 1234 ms · old save ok · perf new/live render 140/132, tab 209/283, buổi 627/738, tasks>200ms 9/13 · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world).
- world_check 25/25 (8 runs; 1 run gave 24/25 while 3 bots + coop-e2e ran beside it — load-flaky, every solo run passes). agent_check 16/16.
- coop-e2e: 63/63 on this branch and 63/63 on origin/main, each run alone (a first run under heavy parallel load gave 56/63 — load, not the branch).
- one-core-guard: PASS, inlineNow 6623 < baseline 6691 (baseline file not updated).
- world_scan.py: 23 world-ish definitions listed, matches report §3.
- Bot re-run `worldbot.js dev/index.html 35 <seed>`, 3 × 35 years (seeds 2/5/7, 2–4 lives):

| k / yr | seed 2 | seed 5 | seed 7 | worker table (seed 4) |
|---|---|---|---|---|
| tang | 0.11 | 0.11 | 0.09 | 0.20 |
| away | 0.74 | 0.89 | 0.89 | 0.63 |
| tuyen | 0.26 | 0.20 | 0.20 | 0.14 |
| hoa | 0.14 | 0.06 | 0.11 | 0.11 |
| dis | 0.23 | 0.31 | 0.46 | 0.46 |
| dich | 0.11 | 0.17 | 0.17 | 0.26 |
| su | 0.57 | 0.54 | 0.43 | 0.74 |
| tho / sao / xa | .03/.09/.31 | .06/.17/.31 | .06/.14/.29 | .06/.17/.34 |
| 2 open / 3 open (tuần of 1260) | 25 / 0 | 19 / 0 | 31 / 0 | 22 / 0 |
| longest dis/dich/hoa run | 6 tuần | 6 | 6 | 6 |
| her nights blocked | 6.0 % of tuần | 6.9 % | 7.4 % | 6.6 % |
| errors / page errors / stuck | 0/0/0 | 0/0/0 | 0/0/0 | 0/0/0 |

No perpetual disaster, her nights are not blocked too often; numbers agree with the worker's table.

## Fixes made by the reviewer (small, on review/world-events-r1)
1. KIT line format: sure options of the start pop-ups had no leading word, so kitParse read the first segment unlabelled: "Làm như không biết" / "Cáo bệnh ở lại" showed the downside **green under ĐƯỢC** and "thành:" printed literally. Fixed in ONE place (jworld startCard): a sure option x now leads with "Chắc chắn · " (the kitParse 'word · tốn · thành' format, j0.js:47; "Chắc chắn" is never shown). Checked in the real modal: rows now TỐN / ĐƯỢC / KÈM correct.
2. "không được không mất" → "không được mất gì" (the kit hides a line that says nothing — before, a GHI CHÚ box with the word broken "khôn g" on iPad 3-across). Dịch "Vẫn đi lại" kèm now "có thể bị nhiễm bệnh" (read as a risk, red KÈM; "dễ nhiễm bệnh hơn" was classed green).
3. ONE CORE: inline rule numbers moved to BAL.world — tang dress obey odds [70,90] (was typed TWICE: jworld + j92 wdMonth; j92 now reads the same key), dich mood + poorW, dis NPC weights npcW, tuyển tú ghenDiv, thân chinh winClamp, pullMax.

## Shots (scratch, not in git; looked at)
fold-start / fold-end (755x1000) and ipad-start / ipad-end (1180x820): "Lũ lớn, mất mùa" start pop-up (VIỆC, Hoàng thượng figure, ev-lu-lut art, who gave silver, 3 kit option buttons) and end pop-up (BÁO, art, one line). Center kit modal, no overflow, no page errors. Extra: tuyển tú start (Tặng quà / Ra oai: ĐƯỢC + KÈM / Đứng xem), ngự giá BÁO card.

## Notes for the Foreman (not blocking)
- FAMILY (LUẬT SỬA CẢ NHÓM, kit keeper): 20 other places in dev/build print "không được không mất", which the kit (j63 kaRows) does not hide — either add that phrase to the kit's "says nothing" regex or reword them. Also some modules write a sure option x starting with "thành:" with no leading word (jeitem 4, jrcp 3, jpet 3, jpoison 1, j83 1) — likely the same literal "thành:" / wrong-row display; not verified here.
- one-core-baseline.json can be lowered with `--update` (6691 → 6623) by whoever lands.
- Co-op: start effects that touch her (tuyển tú Sủng, pay cut) run on the host copy (as the worker reported); guest gets cards via the render hook.

VERDICT: **PASS abe056c3** (review/world-events-r1, FF of origin/main 25bfd7cf).
