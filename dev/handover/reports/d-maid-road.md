# D-MAID-ROAD (review/d-maid-road) — report
depth 1 · START_CTX ~4 % · session_01964izG1y9L64obRQV1kf9o · Foreman D ROOT session_01964izEUYzmixcs6Yg5ZXsE
PRIORITY #1 CHECK: OD rank pace / PROMO-HIST 24/11 + law 5 | main 5ad52416: j42 srvMonth → jexam exSrvGate/exSrvOpen (maid exam), srvLaundry/srvFromLaundry (Tân Giả khố), tests promote-servants, srv-rank | review/rank-pace-rv2 bbe3d757 (exAsk card for both openers) ⊂ review/lr-rules caa95310 (already ⊃ LIVE 5ad52416, so build = lr-rules as is) | claims D-MAID-ROAD (D ROOT). Seat log: review/flight2-s21 846411f2 dev/handover/robot/flight2-s21e.* (read).

## VERDICT: GAP (fixed on review/d-maid-road 1990977f; one BAL proposal for MAIN)
The bottom maid has a road up on the build only partly. Three causes, two of them game faults:
1. **GAP, game, in the build (would ship with rank-pace-rv2): double exam door → maid rung NaN.** Sitting the Nội vụ phủ exam from the Hành sự card left the queued «Thi ngay» card (exAsk) in Q; tapping it later ran exSrvStart with S.srv.ex = {} → exSrvRise(undefined) → `S.srv.rk = NaN` (robot maid-lazy seed 0, month 7; stack card go → exSrvStart → exSrvDone → exSrvRise). After that the maid road is dead (NaN < cap is false, the title reads plain «Cung nữ»). The consort door has the same fault: a stale «Thi ngay» / «Để sau» sat a 2nd exam or re-added the card after the window closed. LIVE 5ad52416 does not have exAsk yet, so this is not a LIVE bug.
   FIX (whole family = every door into an exam): jexam `exLive(ex)` is the ONE check (window open, target set, not mid-board) used by exAsk «Thi ngay» + «Để sau», exCard / exSrvCard go (→ `exGo`), exAdd / exSrvAdd. Sitting by any door removes the other door's queued card (`exUnask`). A stale door closes with one log line «Kỳ khảo hạch ấy đã qua.» OLD SAVE: deser mend, a maid rung NaN/null → rk0 (else BAL.srvRk.tam), ex cleared.
2. **GAP, game, LIVE and build: Tân Giả khố trap (this is the s21e pattern).** The s21e moments show her at maid rank 0 (Tân Giả khố) at turns 6–79, most of 8 years. In Tân Giả khố the card «Nghỉ tay một lát» (j42 srvCards, +8 Sức, repeatable) fails at 1 − BAL.odb.j42.odO (70) = 30 %, and each fail adds a week (`S.srv.lau++`). Its text was `x:""`, so the loss was hidden (law 3 / 6a). A maid who needs Sức rests several times a week, the term grows faster than the one week that passes, and the term never ends. Robot maid-even: 72 of 74 months in Tân Giả khố (build s3), 69 of 72 (LIVE s1), 23 of 25 (LIVE s0). The only other way out, «Giặt đồ» ×6 = −1 week, costs 60 Sức.
   FIX (text only, no number changed): the card prints «hỏng thì thêm một tuần phạt · còn N tuần». **BAL PROPOSAL for MAIN (owner-facing, not built):** cap the weeks a term can grow, e.g. BAL.ag.why.srv.lau.addMax = 2 extra weeks per term (after that a failed rest costs Sức only). Needs the D go → MAIN → sếp.
3. **Covered by rank-pace-rv2 (in lr-rules): the missed exam window.** On LIVE the maid never sees an exam card: noexam stays at tam đẳng in 4/4 lives (0 sat, windows lapse). On the build the exAsk card puts it in front of her: nhị đẳng in 4/4 lives (3–8 exams sat).
Higher rungs: the master's rank caps her (srvMax), the srv-rank road «Xin chủ cho đi hầu cung khác» is open (srv-rank 16/16), law 5 holds (maid-even s2 sits at nhất đẳng/Chưởng sự cap 57 months under a low master).

## ROBOT (dev/measure/rank-pace.js + MAID profiles maid-lazy / maid-noexam / maid-even; 4 lives × 72 months; LIVE = main 5ad52416, build = review/d-maid-road f00bf80e)
Gates per month before srvMonth: merit (Công lao < srvMpNeed), cap (rung ≥ srvMax), tin (Chủ tin < BAL.srvx.tinUp), examOpen / examCd / examLapseCd, lau (Tân Giả khố), noMaster. A life stops when she rises out of the maid road (the robot counts it as a life end), so «risen m» = the month she left upward.
| profile | LIVE: max rung per life · risen | LIVE top sole gates | build: max rung per life · risen | build top sole gates |
|---|---|---|---|---|
| maid-noexam | 1,1,1,1 · 0 exams sat | lau 25/24/9/3, tin, examOpen + examLapseCd 1–6 | 2,2,2,2 · 3–8 exams sat, all passed | lau 22/18/12/18, tin, merit |
| maid-lazy | 3,3,2,2 (by seed 0–3) | lau 26/19/7, tin 20, merit | 4,1,2,2 | lau 18/15/8, tin, merit |
| maid-even | 1,1,4,4 | **lau 69/72, 23/25**, cap 69 | 4,2,4,1 | **lau 72/74, 21/29**, cap 57 |
Months per rung (build maid-lazy s0, a whole life): r0 18 · r1 10 · r2 15 · r3 23 · r4 8; she rises slower as she climbs (law 5). NaN rung in the 24 lives: 0 (the trigger needs the card and the dialog in the same buổi; the test reproduces it on purpose).

## TESTS / GATES
- dev/test/rank-pace.js on the build: **ALL PASS** (old 0–12 + new 13 every rung step 1→2→3→4→5 is a road, 14 maid double door: 1 exam and the rung stays a number, 15 consort double door, 16 old save with a NaN rung mends, 17 the rest card prints its loss). On LIVE: FAIL 13 (exAsk not in LIVE yet; expected).
- srv-rank.js: build 16/16 PASS (LIVE 14/14). promote-servants.js: build 19/23, LIVE 18/22. The same 4 baseline FAILs on both («nobtn», Bạc road, gain+loss, NPC favour road); none new.
- quickcheck.sh: **blocked by this environment**: build_site.sh → assets.py / curl cannot reach the picture CDN host (agent proxy 403 «no rule allows this host»). Part 2 run by hand on the branch build (node dev/tools/quickcheck.js <wt> <LIVE index.html>): **QUICKCHECK PASS** · open 2412 ms · old save from LIVE ok · perf median of 3 new/live: render 371/396 ms, tab 655/721, buổi 1882/3050, tasks>200 66/66. Root index.html / sw.js NOT rebuilt on the branch; the lander (or a seat with CDN access) runs build_site.sh.
- coop-e2e: not run (soft).

## HANDOVER
Done: fix + tests pushed. Open: BAL proposal (2) → D/MAIN; root site rebuild by the lander; quickcheck full on a box with CDN access.

SẴN SÀNG KIỂM review/d-maid-road 1990977f (base review/lr-rules caa95310 ⊃ LIVE 5ad52416). Worker ctx ~29 % at the end: no successor needed (only push + report remained).
