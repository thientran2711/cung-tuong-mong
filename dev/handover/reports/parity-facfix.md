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
