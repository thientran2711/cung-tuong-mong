PASS 5f7101613adaa6b0ca7567acbc5a7ebead07b2b3
# review/title-sys2-r1 — reviewer (Foreman C, opus) — TITLE SYSTEM phase 2
Branch review/title-sys2-r1 @ 5f710161 = review/title-sys2 21b9df01 (incl. phase 1 jdh.js, not yet on main) merged onto origin/main 2e9615fb (ancestor checked after a fresh fetch). Only conflicts: generated index.html / sw.js → rebuilt with dev/site/build_site.sh.

## Reviewer fix (on review/title-sys2-r1, b7322fea)
1. BUG: atonement road B "Lập công" (Danh +12 over the Danh at opening) could never finish when Danh at opening was >= 89, because Danh is clamped at 100 (ap/apply). This was the worker's intermittent "NPC lập công did not restore" (it reproduced here at 1366x1024 when the random NPC had high Danh). Fix: jdh2 `congNeed(d0)` = min(cong, top − d0), used by the state, the progress row and the opening notice; new constant BAL.dh.conf.top:100 (one core). Regression check added to dev/test/title-sys2.js (an NPC near the ceiling must be restored). Passed 3/3 at 1366x1024, plus 755x1000.

## Tests (built site, UTF-8 server, 0 page errors everywhere)
| Test | Result |
|---|---|
| title-sys2.js | PASS 755x1000@2, 1180x820@2, 1366x1024@2 (after the fix, 3 runs), 1000x755@2, 844x390@2, 412x1058@2; overflow false |
| title-sys.js (phase 1) | PASS 755x1000 (also after the main merge) |
| lost-items.js | PASS 755x1000, 1180x820 |
| coop-e2e.js | 59/59 |
| palace-oldsave.js (main de239eca save → this build, same origin) | loads, no errors |
| own old-save check (main save with her hiệu "Thục" + an NPC "Hiền") | loads as "Thục phi"; after a week each has exactly 1 Sắc phong + 1 Ngọc ấn; JSON round-trip OK |
| dh2bot 4 lives (531 weeks) | NPC grants 10 (month 7, contest 3); confiscations 49 (cấm túc 32, giáng 14, lãnh cung 3; hiệu 4, titles 46); restores 10; losses 10; conservation faults 0 |
| dh2bot `me` 3 lives | her grants 2 (month 1 / 3), her confiscations 2, her loss 1; conservation faults 0 |
| dh2bot 2 lives after the fix | grants 8, restores 13, faults 0 |

## Checks
- ONE CORE: every number from BAL.dh.hieu/.conf/.it (texts print the constants: Danh +danhG, −conf.danh/−conf.sung, wait, kinh, cong, lostDanh). bestow 30 % roll removed; jexam full seat uses the same dhHieuGrant. OK.
- VANPHONG: no %, cổ trang wording, odds labels from the kit act cards. OK.
- KIT: kitPanel reward/notice, kit rows, kitItemTag §64 (.kiev-own/.kiev-txt are existing jitev/jlost kit classes), PEND dialogs with act cards. No private CSS. "Hiệu ban" equip slot correctly NOT built (KIT REQUEST stands).
- Co-op: hieu/titleWorn/dh in LOOK; S.dhConf, her pieces personal; NPC rules host-only (npcOK). coop-e2e 59/59.
- Whole family: jinv "Sủng không dưới 15" now ngocboi-only; giftVal / NPC monthly gift tolerant of items without tg. OK.
- Gain-and-loss: grant Danh +5 vs confiscation Danh −5 / Sủng −3, loss −8, both atonement roads reachable (after the fix). Sane.

## Worker's questions — reviewer judgement
1. Full seat still gives a hiệu without thresholds (owner-approved seat compensation), now with book/seal: OK.
2. Her "laydo" cannot target Sắc phong / Ngọc ấn: OK for now (theft of these pieces already exists through the monthly jlost case with a rival cause).
3. Seal from Phi up vs every rank. History: Qing — Hoàng quý phi / Quý phi received gold book + gold 宝 seal, Phi gold book + gold 印 seal, Tần (嫔) the gold book ONLY; Quý nhân and below had no investiture book. Ming — book + seal for Phi and above. So history = Tần: Sắc phong only; Ngọc ấn from Phi up (given on promotion to Phi if she holds a hiệu, taken back on demotion below Phi). Built version follows the owner's 13:00Z words (book + seal with every hiệu), so it is NOT a FAIL. Recommendation for Foreman C: adopt the history rule (it also gives a visible reward step at Phi); it touches giveItems, the census expectation and the promotion/demotion hook — a small follow-up task.

## Non-blocking notes for Foreman C
- Art (already in the worker's ART LIST): Sắc phong / Ngọc ấn show empty item frames and grade "THƯỜNG" (grade comes from the art manifest); when drawing them give them the top grade. The confiscation notice shows an empty picture frame (no placeholder label like the grant panel) — panel picture still on the KIT REQUEST list.
- Pre-existing ONE CORE violation (not this branch): ngocboi Sủng floor 15 is typed in j8:225 and in its text strings (jinv, j8 d text) — should become a BAL constant (family follow-up).
- TITLES has only 10 hiệu names and dead consorts keep theirs reserved forever (rivals are never removed); bots did not hit "hết hiệu để ban", but very long lives could. Consider freeing a dead consort's hiệu after some years, or more names.
