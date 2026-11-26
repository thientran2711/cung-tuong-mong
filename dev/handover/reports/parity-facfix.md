# parity-facfix — «Lập phe cùng» LIVE row + ag-par3 6 FAILs (law 1 TWO-WAY, law 11 WHOLE GROUP)

PRIORITY #1 CHECK ('facHTML Lập phe'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reused reports role-parity-drift-2.md, facfound-parity.md (receiver-choice method), ag-all-parity.md; main j10 facHTML/facAct, jagacts3 p3FacFr, jrcv RCVK, jptime PT_NPC.

Worker PARITY-FACFIX (session_01D3E3NaMkenmHxXe1UiMfjU), child of Foreman D. START_CTX ≈3 % (get_session reads 0; estimate).
Branch `review/parity-facfix` = FF from LIVE origin/main 3af7896e + 2 commits (476e91cf, 99ceb658). **SẴN SÀNG KIỂM 99ceb658.**

## 1. The drift2-play row «Hoàng hậu sees Lập phe cùng (facHTML)» — TEST SEED, not a regression
- 6b5d3d05 and 3af7896e, dev/index.html AND site index.html, ×2 each: **FAIL on all 8 runs** (same JSON). Not clock-dependent (Date frozen at 4 times: same draw). mghelp-dress (j79/j82/jk4/jtoil) touches no relation/faction data.
- Cause: the drawn consort (Độc Cô Tố Ngưng) starts at liking −5; the test adds +40 → 35 < netTh «thân» 38 → no button. The game gate is right.
- Fix: seed raises her liking to at least «thân» (`Math.max(40, netTh(t,"than")-aff(t,S))`). Same seed fault in dev/test/fac-parity-play.js rows 1 and 3 (FAIL on LIVE too) → fixed the same way.

## 2. Whole family (law 11) — one REAL law-1 gap found and fixed
| founder | roads before | roads after |
|---|---|---|
| NPC, j10 monthly loop | friend ≥ thân · same clan ≥ quen · shared enemy ≥ act | same (now via facFrOk) |
| NPC, jagacts3 p3FacFr (agent option cx3:facFound) | same 3 | same (via facFrOk) |
| HER, j10 facHTML «Lập phe cùng» | **friend only** | **all 3** (via facFrOk) |
- `j10 facFrOk(v,x)` = THE one founding rule for all three callers; thresholds from BAL.net (netTh), no new numbers. Her side keeps reading the liking the way her button always did (the other's liking of her).
- Player text (VANPHONG cổ trang): empty line «Cần một phi tần thân với ta, cùng dòng họ, hoặc chung một mối thù để lập phe.» and the info card bullet «Phi tần thân với ta, cùng dòng họ, hoặc chung một mối thù có thể lập phe cùng ta.» Buttons unchanged (same kit part).
- New test dev/test/fac-roads-play.js: each road alone, her button + NPC list, + 3 controls → ALL PASS on branch; on LIVE: facFrOk missing (FAIL).
- Other faction acts (Mời / Xin / Rời / Bán đứng / Ly gián) were already paired by facfound-parity; unchanged.

## 3. ag-par3 on LIVE: the 6 FAILs (+2 more found by seeding) — all PROBE/draw, no game fault
Seeds ×5 (Math.random fixed from page start) + unseeded runs:
| row | LIVE seeds 11/22/33/44/55 | cause | REAL / PROBE | test fix |
|---|---|---|---|---|
| household options (Tra xét) | 5/5 FAIL | test maid rk 3 < BAL.srvRk.cs 4 (maid-ladder-6); her searchMaids has the same gate | PROBE (stale) | rk = BAL.srvRk.cs |
| household deeds (searchMaids) | 5/5 FAIL | same | PROBE | same |
| phe phái (NPC founds) | 4/5 FAIL | founding is a request: friend answers 1 of 4 (jrcv); + a drawn friend in the founder's house | PROBE (draw) | read the answer, check faction ⇔ «full», play «Nhận lời»; friend outside the house |
| Mời đến cung ta | 5/5 FAIL | jptime defers cx3:invite2 (runner walks, lands at due khắc, p3InvLand at once); guest answers 1 of 4 (rcvInviteGo); guest drawn in HER house → no button | PROBE (stale + draw) | ptLand the runner; count invQ at landing; read answer (comes on 3 of 4), play «Nhận lời»; guest outside her house |
| Trò chuyện với cung nữ | 5/5 FAIL | NPC's maid still out on the invite errand → jptime maid lock (her own card is locked the same way: probed) | PROBE (law 6b correct) | land her open errands first |
| Sai đi dò la (spyRoll) | 5/5 FAIL | jptime defers cx2:maidSpy | PROBE (stale) | land the deferred deed |
| Phòng bị (extra) | 1/5 | host at BAL.seeMaxP 70 − fog 8 = 62 both reads; a traitor guard adds nothing (j70) | PROBE (draw) | read oSee with seeMaxP lifted; traitor tolerated |
| Nhờ giúp đỡ (extra) | 1/10 | drawn consort in HER house → «Cùng cung» list (j9:138) has no «Nhờ giúp đỡ» | PROBE for this row (one-function check) | row draws a non-housemate |
After: ag-par3 **10/10 ALL PASS** (seeds 11–55 + 5 unseeded).

## 4. OPEN QUESTION for Foreman D (not changed — law 16, may sit on an owner rule)
Law-1 candidate: an NPC may «Nhờ giúp đỡ» a HOUSEMATE (jagacts2 cx2:help target list T has no sameHouse filter), but her housemate menu (j9:138 «Cùng cung: không thể lấy lòng hay ra tay») has no such card. Either her housemate list gets «Nhờ giúp đỡ» or the NPC list drops housemates — needs a ruling on whether asking help counts as «lấy lòng».
Also seen: her talk-menu «Nhờ giúp đỡ» (jaudit wrapper) runs loan/tell code, not helpAsk, while topicOpts' card runs helpAsk — worth a look by whoever owns the help family.

## 5. Gates (branch 99ceb658 vs LIVE 3af7896e)
| gate | branch | LIVE |
|---|---|---|
| role-parity-drift2-play | ALL PASS ×2 | 1 FAIL (row above) |
| fac-parity-play | ALL PASS | 2 FAIL (seed) |
| fac-roads-play (new) | ALL PASS | FAIL (no facFrOk) |
| ag-par3 | 10/10 ALL PASS | 5–7 FAIL every seed |
| coop-e2e (co-op first, live Worker) | 143 ok, 0 FAIL (476e91cf build; 99ceb658 adds text only) | — |
| oldsave-r1 (LIVE save → branch, 3 sizes) | 16/16 | — |
| role-parity.test ×2 / quickcheck | see §6 (running at write time) | |
Shots (Fold 755x1000@2 + iPad 1180x820@2, roads + empty, looked at): CDN img/_review/parity-facfix/ (fac-roads-fold/ipad, fac-empty-fold/ipad). Verdict giver wipes it.

## 6. Late gates
Reviewer: opus BIG session_01D3E3NYiNpuvC4JKoyQchxo (opened 11:15Z). role-parity.test branch run 1: ALL PASS; run 2, LIVE run, quickcheck branch + LIVE: running, filled on finish.

### Late gates (11:50Z)
| gate | branch 99ceb658 | LIVE 3af7896e |
|---|---|---|
| role-parity.test | ALL PASS ×2 | ALL PASS |
| quickcheck play part (open · old save · perf) | PASS (render 194/219, buổi 1120/2166 ms new/live) | PASS |
| quickcheck core G4 80-dialog-fixed | 2 FAIL «(kit-dialog-2 a) no empty Tốn / Được cell» 755 + 1180 | **the same 2 FAIL** |
| quickcheck button crawl | 1 fault «Ô lưu · Lui · close did not close its layer» (Fold) | **the same fault** |
→ Both quickcheck faults are PRE-EXISTING on LIVE (identical rows), not from this branch (it touches only j10/jagacts3 faction code + tests). Flag for MAIN as a separate kit/save-slot item.

### Merged on new LIVE (12:40Z) — branch tip 53cc671e
LIVE moved 3af7896e → 1dcb373e (coop-freeze-kmrew-rv2: jinv.js + jksize.js). Merged origin/main 1dcb373e; only built files conflicted (taken from LIVE, site rebuilt). FF from LIVE checked, pushed.
| gate on 53cc671e | result |
|---|---|
| coop-e2e (co-op first) | 143 ok, 0 FAIL |
| fac-roads-play | ALL PASS (10) |
| fac-parity-play | ALL PASS (17) |
| role-parity-drift2-play | ALL PASS (11) |
| ag-par3 | ALL PASS (36) |
| role-parity.test | ALL PASS |
Waiting for reviewer session_01D3E3NYiNpuvC4JKoyQchxo (told to judge 53cc671e).

## 7. REVIEW (opus BIG, session_01D3E3NYiNpuvC4JKoyQchxo) — **PASS 53cc671e**
PRIORITY #1 CHECK ('facHTML Lập phe'): reused the worker's check (OD 0 | ledger 0 | claims 0 | main 0 | review/* 0); facFrOk is new and has one owner (j10). START_CTX ≈3 %.
53cc671e = 99ceb658 + merge of LIVE 1dcb373e. Its source diff vs 1dcb373e is byte-identical to 99ceb658 vs 3af7896e (j10, jagacts3, 4 tests). Rebuilt here: only the build-info line (CTM_BI) and the hashes that follow from it differ, so it holds its own build. FF from origin/main 1dcb373e.

**(1) drift2 «Lập phe cùng» LIVE FAIL = test seed fault: confirmed.** Reproduced on 3af7896e (×2, same draw): Độc Cô Tố Ngưng liking −5 → +40 = 35 < netTh «thân» 38 → no button. The game gate is right. The seed fix (at least «thân» from netTh) is honest; fac-parity rows 1/3 have the same fault and get the same fix.
**(2) Game change: OK on every law it touches.** facFrOk is the one founding rule for her button, the j10 NPC loop and p3FacFr. The NPC side is the same expression as before; her side gains the clan and shared-enemy roads (law 1 two-way, law 11 whole group). Numbers come only from netTh/BAL.net (law 4). clanOf(S) returns "" and never matches an NPC clan, so the clan road can't open by mistake. facAct «lap» → rcvAsk facFound is unchanged (4-answer receiver). Wording is cổ trang with no numbers or % (law 7); the pronoun layer shows «ta». Buttons and kitEmpty are the same kit parts (law 9).
**(3) ag-par3 test changes are honest.** I ran the BRANCH test against the LIVE html with seed 77: ALL PASS. The LIVE test on LIVE: 7 FAIL. So every row was a stale or drawn probe, not a hidden game fault. Checked each one: searchMaids gates on srk ≥ BAL.srvRk.cs (j14:79) → rk=cs is right. The facFound/invite rows now ASSERT the jrcv answer ⇔ outcome, which is stronger than before. ptLand of jptime-deferred deeds and landing maid errands are right. BAL.seeMaxP=0 really lifts the cap (jbal2:73 wrapper skips on falsy) and is restored. The traitor tolerance is effectively dead code (spyFor staff are filtered out first) but harmless. Picking a non-housemate in r10 is fine.
**(4) Housemate «Nhờ giúp đỡ» question correctly left for the foreman (law 16/17).** Verified: the jagacts2 cx2:help target list T has no sameHouse filter, and j9:138 locks her housemate menu. Also worth a look in the same ruling: the cx2:help list drops S (`t!==S`), so an NPC never asks HER for help.

| gate | result |
|---|---|
| role-parity-drift2-play | 99ceb658 ALL PASS · 53cc671e ALL PASS · LIVE 3af7896e 1 FAIL (seed) |
| fac-parity-play | 99ceb658 + 53cc671e ALL PASS · LIVE 2 FAIL (seed) |
| fac-roads-play | 99ceb658 + 53cc671e ALL PASS · LIVE FAIL (no facFrOk) |
| ag-par3 seeded | 99ceb658 seeds 77/88/99 ALL PASS · 53cc671e seed 12 ALL PASS · branch test on LIVE html seed 77 ALL PASS · LIVE test on LIVE 7 FAIL |
| ag-par3 unseeded | 99ceb658 ×2 ALL PASS · 53cc671e ×1 ALL PASS |
| role-parity.test | 99ceb658 ALL PASS ×2 (LIVE run stopped by the 30-min background limit; not needed) |
| coop-e2e (co-op first, live Worker) | 99ceb658 143/143 · 53cc671e 143/143 |
| old-save (oldsave-r1, LIVE 3af7896e save → branch, 3 sizes) | 16/16 |
| quickcheck 99ceb658 | play part PASS (open · old save ok · perf render 289/286, buổi 1847/1805 ms). Core G4 dialog-fixed 2 FAIL «no empty Tốn / Được cell» 755+1180 + crawl «Ô lưu · Lui» = the SAME on LIVE. One LOOK-DEDUPE FAIL («mood seal opens undefined»), then 3/3 PASS on the branch and 3/3 on LIVE when rerun alone = flake (branch doesn't touch the mood seal) |
| quickcheck 3af7896e (LIVE) | FAIL: the same G4 dialog-fixed 2 rows + the same crawl fault; play part PASS → PRE-EXISTING, for MAIN as a separate item |
| shots | fac-roads + fac-empty, Fold 755x1000@2 + iPad 1180x820@2, looked at: kit buttons, 3-road line, no overflow or cut text. CDN img/_review/parity-facfix/ wiped (4 objects) |
Nit (no action): §2 quotes «thân với ta» while the source says «ngươi»; the screen shows «ta» (pronoun layer).
**VERDICT: PASS 53cc671e** (FF on origin/main 1dcb373e). No reviewer fixes; no -r1 branch.
