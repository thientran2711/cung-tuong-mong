# Review two-way-acts r1 (BIG: rules / costs / BAL) — PASS 7e2ed179b

Branch reviewed: review/two-way-acts @ b74af30c2 (SẴN SÀNG 63dc408a0). Result branch: review/two-way-acts-r1 @ 7e2ed179b (ancestor = origin/main 67cd00a2f). Reviewer START_CTX ≈ 4 %.

## Verdict: PASS 7e2ed179b

## Merge
- 3 merges of origin/main (main moved twice during the review). Conflicts: dev/build/assemble.py (took main's list + 'jtwoway.js' after 'j77.js'), index.html/sw.js/assets.json (generated; rebuilt with dev/site/build_site.sh).
- jk3.js one-line Fold fix (html body .game#game.k3ph.k3pop>#popw{grid-area:stage}): main did NOT have it yet at 67cd00a2 → the branch line is kept. If the fast-fix ships it first, the next merge keeps main's copy (identical selector).

## Two-way check (each FIXED row, player ↔ NPC and NPC ↔ NPC)
Rows 1–23, 25, 26, 31, 32 read in code: one deed TW[k] (jtwoway.js) or the same BAL constant on both sides; NPC pays the same bạc/Sức/Danh/Đức (twCanPay/twPay) and rolls odA(doer, same base). dev/test/two-way-acts.js: 49 checks ALL PASS, 0 page errors (each deed NPC→player, player→NPC, NPC→NPC).
Time (khắc): NPCs still pay 0 khắc — that is the agent loop (Foreman C AG1), not a FAIL here.

## Reviewer fixes (one core, OD:L1267) — commit a89dc674
The branch copied the player's typed numbers into new NPC code paths (two sources for one number). Now both sides read BAL.tw.g:
- accFail [8,25,20] — failed accusation: player j95:412, NPC j95:424, NPC jroute:121.
- vu [10,5,4], ky [2,1] — Kinh hồng vũ / Đánh cờ: player card j2:54-55 (text prints the constant) and NPC npcEffort j75.
- admon 5 + admonCd 6 — NPC monopoly() in j75 and her option in jtwoway (was typed −5 / 6 in j75).
- conf [20,15], reward [20,10,3] — Hoàng hậu tịch thu / ban thưởng: player empAct j8, NPC queen j8 (+ its log text), queen card text j15:33 now prints BAL.tw.confNo / BAL.tw.reward / g.conf / g.reward (was typed "Danh -3, Thái hậu -5", "Bạc -30", "cần 30 bạc", "Danh nàng +3", ±20). Probe: card text renders the same numbers.

## Tests on the result
- two-way-acts.js 49/49 PASS, 0 page errors.
- two-way-oldsave.js: save made on origin/main build, loaded here, 40 weeks: ok, 0 errors, new options build.
- coop-e2e.js (live worker, Fold host + iPad guest): 59/59 passed, no page errors (run twice).
- dev/tools/quickcheck.sh 7e2ed179b: QUICKCHECK PASS · open 1151 ms · old save ok · perf new/live render 299/313, tab 314/396, buổi 1055/1124, tasks>200ms 12/14.
- Shots (looked at each): Fold 755x1000@2 and iPad 1180x820@2 rival talk card — Thăm lúc ốm mệt, Hạ nhục, Thử lòng, Rỉ tai chuyện trong cung, Khoe quà ngự ban. Kit option rows (same as existing rows), odds as ladder words (Năm ăn năm thua), no %, VANPHONG costs/gains rows, no horizontal overflow, 0 page errors. Fold person card grid correct (popw 582 wide at left 4).

## Notes (not FAIL)
1. New options have no own card art: iPad shows a generic picture, Fold shot showed empty frames (lazy art not yet loaded at shot time). Art request for Foreman C (5–8 small act pictures: Thăm lúc ốm mệt, Hạ nhục, Thử lòng, Lạnh nhạt, Nương theo, Hòa giải, Rỉ tai, Khoe quà ngự ban).
2. The ✕ of the person card sits over the first option when the list is scrolled (pre-existing kit behaviour, both sizes).
3. Small leftovers, same owner law, cheap follow-ups: NPC "Khen" (SOC.feign) gives +4 flat while hers is 8 for Kiêu ngạo/Tham vọng targets (trait bonus missing on NPC side); NPC failed accusation always punish level 1 while hers is 2 when made to the Emperor; thresholds in TW req (Sủng 40, Sức 50, aff 30, oán 20, Tâm cơ 50) are typed once in jtwoway (single source now, could move to BAL.tw).
4. Pre-existing on main (not this branch): j15.js queen buttons source text still says "Chắc chắn" (VANPHONG bans it); the kit card renders without it in the probe, but the raw string should go in a wording sweep.

## OPEN rows (for Foreman C AG1→AG3, agent loop / night scene — not a FAIL)
24 pillow slander (night option for her) · 27 buying another palace's servant · 28 maid feuds / beat / frame a maid · 29 NPC affair steps + KSP book check · 30 monthly blackmail no roll, NPC escape free · 33 NPC dish conjured (poison cooking) · 34 conjured gift to her · 35 faction moves / ministers / master's orders free · 36 thathu/phonghoa NPC delayed with omen (BIG-act tell rule). Plus §1b list (player acts NPCs never use) and the khắc budget for NPCs (AG1).
