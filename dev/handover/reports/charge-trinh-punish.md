# charge-trinh-punish (STEP 4 after charge-followups) — worker D1+D4 #5 session_01D3E3NbLPKdQmHXFEQ4xkHv (depth 3, START_CTX ~3 %)

PRIORITY #1 CHECK ('Trình Hoàng hậu|Mua chuộc|bị đuổi khỏi cung|trinhhh'): OD 2 | ledger 0 | claims 4 (D1+D4 row = this worker) | main 15 | review/* 0 | archive 0.
Reuse: jcharge chPunish / chBought / chMcFire / CHX / punEvTxt, jrcv rcvJudge, j42 servant-life «Bị đuổi khỏi cung» ending (over + end card kitRows), jcoopworld coopCold write-back road (toCanon fP.S → onWeek). No second system.

## 0. LIVE moved (3af7896e) → review/charge-followups-rv re-merged
- ad31b084 = 5fa873ec (DELTA PASS) + merge origin/main 3af7896e (built files rebuilt; CHANGE line kept).
- quickcheck on ad31b084: perf/open/old-save PASS; core gates FAIL G1 one-core-guard (jcharge:50 typed ladder `b<=2 … b>=5`, from D4 7b8a0999) + rules-one-source (j78:192 Tố tội thật card printed `BAL.eff.j30.evF` + «bị giáng» — the act now spends the pieces of the charge and punishes by chPunish). Both are D4-era, fixed in c3e1b8fd (BAL.charge.bandWord [2,5]; the card prints `Chứng cứ −n (tội X)` + chPunTxt). Core gates on c3e1b8fd: one-core / bind / text / textrule / npc-purpose-scan (419 rows) / coop-one-world / dead-card / q-softlock … PASS; dialog-fixed «kit-dialog-2 empty Tốn/Được» + button-crawl «Ô lưu · Lui» FAIL = the pre-existing LIVE faults the predecessor recorded.
- charge-smoke 0 FAIL · charge-followups ALL PASS · seize-ledger ALL PASS · punish-reason 755x1000 / 1180x820 ALL PASS · charge-scan all 0 · coop-e2e: see STATUS.

## O2 — a won «Trình Hoàng hậu» → chPunish of the PROVEN charge
Runtime finding: already routed on 0b36b274 (jcharge T.f wrapper sets t.chTr; jcharge punish wrapper turns «bị Hoàng hậu xét tội theo chứng cứ» into chPunish(t, c, …, presenter)). The BIG reviewer's O2 note came from a static read of jrcv:242 / jaudit:255. Proven by dev/test/charge-trinh-punish.js (spy: a generic punish = one that did not end in chPunish for that person):
| road | chPunish of the proven charge | generic punish |
|---|---|---|
| NPC → NPC, NPC queen | uh | none |
| her → NPC, NPC queen | uh | none |
| NPC → her, NPC queen | uh | none |
| her as Hoàng hậu: the card first (no punishment before her answer), «Xét tội theo chứng cứ» | uh (cấm túc 2) | none |

Whole family (LAW 11) — new charge-scan family `proof_generic` = a punish / demote / fall of the accused on a line that uses evidence (evG / evA / chOK / «chứng cứ») without chPunish; every other site listed with its reason (`python3 dev/test/charge-scan.py -v`):
| ref | proof_generic |
|---|---|
| 0b36b274 | 1 (jtsb.js:100 «đem chứng cứ trình Hoàng hậu»: total gate evG ≥ 1, punish «ức hiếp người dưới phẩm») |
| this branch | 0 |
jtsb now needs the pieces of the ức hiếp charge (chOK t,a,"uh"), spends them, and punishes by chPunish "uh" (cấm túc + bồi bạc to the bullied one), her and an NPC; a piece of another charge only → no telling (tested).
Second family fault found by the test: on cấm túc / giáng charges (chPunish → generic punish / demote) HER notice lost «Ai tố» + «Chứng cứ» whenever the accuser was not the one acting (ACTX) — e.g. jtsb, a third person's Tố giác → «Ai xử: Hoàng thượng». Fixed once in jcharge (CHBY: chPunish's accuser reaches punNote) for every charge. Other sites listed as not a proven charge: false-accusation / failed roads (vu oan, vu khống, vu cáo, tố hụt, giá họa, lật tẩy), the tư thông expose road (its own table-A road), j8 Tố giác / judge fallbacks (only with no ready charge), servant-life maid accusing her mistress (her known secrets SRVA.accuse.sec, not charge pieces), j70 caught in the act, j10 faction sell-out, j8 bought maid leaks schemes, jlost hearing, jrcp gift-illness.

## O1 — SHE is the bought servant (OD 26/11 ~07:50Z)
- jcharge chMcFire: she (isSrv(), S.srv.spyFor = the guilty one's id) joins the bought list (rank 2 = named by her deed, inside BAL.charge.mcFire like any bought servant); the co-op friend's seat as a bought servant (buildFriendSrv entry, coop) too.
- Her end: after the guilty one's punishment is written, over("Bị đuổi khỏi cung", …, "Bị đuổi khỏi cung vì nhận bạc mua chuộc", alive) — the j42 servant-life ending (card «Bèo dạt mây trôi», art lanh-cung); its kit rows: Ai tố / Vì sao / Chứng cứ (the guilty one's charge + pieces) / Hình phạt «Đuổi khỏi cung» / Người hầu bị mua (same row as table A D). The edict names the accuser and the briber (k61 know).
- Co-op (host-computed, friend continues): the seat that proves the charge marks the friend's servant entry coopMcOut; toCanon writes it to the friend's blob (P.S.coopSrvOut, as coopCold); the friend's client applies it in onWeek → the same ending → normal rebirth into the same world (the co-op over wrapper). Two-way: her bought by the friend-consort (spyFor = friend id) or the friend bought by her (spyFor "me").
- Not bought by the guilty one → stays (tested).
| check (charge-trinh-punish.js) | result |
|---|---|
| bought by another: stays | PASS |
| bought by the guilty one: life ends «Bị đuổi khỏi cung vì nhận bạc mua chuộc» | PASS |
| end card rows Ai tố / Vì sao / Chứng cứ / Hình phạt / Người hầu bị mua, names accuser + guilty + charge | PASS |
| co-op: friend's seat marked, entry kept until the merge; toCanon P.b.S.coopSrvOut | PASS |
| co-op: her client's week in (onWeek) ends the life with the row | PASS |
| page errors | 0 |
Pre-existing (not this branch): a servant's end card shows «Đáp ứng» and her portrait as for a consort (same for the existing j42 «Bị đuổi khỏi cung» roads).

Videos (real game page, accusation by the game's Tố giác, wheel scroll + real tap «Chuyển kiếp»): https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-trinh-punish/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-trinh-punish/ipad-1180x820.webm (+ fold-endcard.png, ipad-endcard.png — looked at: kit rows, nothing cut, no overflow).

## Tests (review/charge-trinh-punish c59bae19 = c3e1b8fd + STEP 4)
| test | result |
|---|---|
| charge-trinh-punish.js (new) | ALL PASS, 0 page errors |
| charge-followups.js | ALL PASS |
| charge-smoke.js | 0 FAIL |
| seize-ledger.js | ALL PASS |
| punish-reason.js 755x1000 / 1180x820 | ALL PASS / ALL PASS |
| charge-scan.py | all families 0 (proof_generic 1 → 0) |
| punish-scan.py | npc_zero 0 |
| srv-mc-video.js Fold / iPad | PASS (rows present, no overflow, real tap) |

## STATUS (26/11 ~10:00Z)
- -rv c3e1b8fd pushed (FF from LIVE 3af7896e); coop-e2e on it running → then «LAND READY review/charge-followups-rv c3e1b8fd» to Foreman D.
- STEP 4 review/charge-trinh-punish c59bae19 pushed → coop-e2e + ONE BIG reviewer (opus child).

## BIG review 1 (session_01D3E3NXbek1mcjhNBkMvvT4): FAIL c59bae19 — F1–F3 (O1 + O2 core + -rv delta + LIVE merge PASS). Fix round → a43aa413
| # | fix (a43aa413) | test (charge-trinh-punish.js ALL PASS) |
|---|---|---|
| F1 | her jtsb «Báo lên Hoàng hậu / Thái hậu»: gate + spend = ức hiếp pieces (need row «chứng cứ tội ức hiếp quấy phá (có n/need)»), chPunish "uh" with CHX, card prints «Chứng cứ −n (tội …)» + chPunTxt; ONE odds helper tsbRepO(v,a) for her and the NPC road jtsb:100 (which now rolls the same odds, law 1); typed 12/12/6 → BAL.odb.jtsb.orPer/orWit/orDanhD; witness = odds factor | locked with 0 pieces; open + won → chPunish uh, pieces 2→0 |
| F2 | j71 tomuu: pieces of mưu hại gate the «Trình…» options (pp picks chOK(S,v,"mh")), win spends them → chPunish "mh"; ev*12, danh/5, th/3 → BAL.odb.j71.evPer/evDanhD/evThD. j95 caught in the act: listed as eyewitness road, odds + spend = pieces of the matching charge (tryst→tt, else mh; BAL.m95.accPer), NPC mirror j95:456 odds = her tư thông pieces. j8 Tố vượt phẩm → chPunish "vp" (one vượt phẩm punishment; AOUT vp prints chPunTxt). charge-scan proof_generic now statement-wide (1500-char window before each punish / demote / fall / deathSentence), 55 sites listed with a reason, 0 GENERIC | tomuu: no «Trình» at 1/3, offered at 3/3, win → chPunish mh, pieces 0; j95 a mh piece moves the odds, a vp piece does not; vpAccuse test SKIPPED (no over-rank piece on the sample consort) |
| F3 | one helper jcharge chUse / chUseTxt / chWinTxt (accuse / trinhhh / judge = chReady, tocao = chTocao, expose = tt) read by j78 actLineRaw (person card), AOUT accuse / tocao, and evidenceActs (accuse / tocao / expose / trinhhh / judge) | person card = evidence card «Chứng cứ −2 (tội ức hiếp quấy phá)»; Tố giác «thành» = cấm túc + bồi bạc (no «phế hoặc giáng») |
Regression on a43aa413: charge-followups ALL PASS · charge-smoke 0 FAIL · seize-ledger ALL PASS · punish-reason Fold/iPad ALL PASS · charge-scan all 0 · punish-scan npc_zero 0 · cold-faction 20/20. NOT RUN on a43aa413: coop-e2e, quickcheck/coregates, new videos (the O1 videos of c59bae19 still show the O1 road unchanged).

## coop-e2e record (live Worker)
| build | result |
|---|---|
| LIVE 3af7896e | 143/143 |
| -rv c3e1b8fd run 1 | 141/143 — «same world» R#*.mgH.hoadien / mgHv.hoadien on seat B only (jhd hdNpc → mgHand lazy write) |
| -rv c3e1b8fd run 2 | 137/143 — «Thái hậu keeps her face» ×4 + «same world» R#7.inv.19 / R#9.wrongs.0.k "xx" + dkeys "xx:mk:…" on seat B only |
| STEP 4 c59bae19 (reviewer's run) | 143/143 |
Different keys each run → looks flaky, but R#9.wrongs "xx" / dkeys "xx:mk" are jtruth deed writes (D4 area) on the guest only — the successor must check whether a deed written on the guest's world copy (deedAdd / deedOnce on an NPC) reaches the host or is a guest-local write (coop-host-lag family), before LAND READY -rv.

## HANDOVER (worker D1+D4 #5 session_01D3E3NbLPKdQmHXFEQ4xkHv, depth 3, START_CTX ~3 %, rolled at ~34 % on 26/11 ~11:05Z)
State:
- review/charge-followups-rv c3e1b8fd pushed (FF from LIVE 3af7896e). BIG reviewer: -rv delta ad31b084→c3e1b8fd + LIVE merge PASS. Core gates on c3e1b8fd PASS except the pre-existing dialog-fixed + button-crawl. LAND READY NOT sent: coop-e2e on c3e1b8fd 141/143 then 137/143 (table above).
- review/charge-trinh-punish a43aa413 pushed (= c3e1b8fd + STEP 4 + rv fixes F1–F3), unreviewed since the FAIL.
- Worktrees on this box (successor gets a fresh box): /home/user/wt/ctp (STEP 4), /home/user/wt/cfrv (-rv), /home/user/wt/live3af (LIVE), /home/user/wt/ctp-ho (handover).
TODO for the successor:
1. -rv c3e1b8fd: investigate the guest-only world writes in coop-e2e (wrongs "xx" / dkeys "xx:mk" on R#9; mgH.hoadien; Thái hậu face) — compare with a second LIVE run; if pre-existing/flaky on LIVE → coop-e2e green run + «LAND READY review/charge-followups-rv c3e1b8fd» to Foreman D (re-merge if LIVE moved).
2. STEP 4 a43aa413: coop-e2e + coregates (quickcheck) on it; vpAccuse runtime test (give a consort an over-rank piece); re-ask the BIG reviewer session_01D3E3NXbek1mcjhNBkMvvT4 (DELTA c59bae19→a43aa413); on PASS «LAND READY review/charge-trinh-punish <sha>» + video URLs (img/_review/charge-trinh-punish/ fold-755x1000.webm, ipad-1180x820.webm).
3. Foreman D routed to MAIN: servant end card shows «Đáp ứng» + consort portrait (pre-existing). Reviewer nit N1: a servant accusing her own briber is dismissed too («Ai tố: ngươi») — warning line if such a road is offered.

## Worker D1+D4 #6 (session_01D3E3NXG8jXAH8xJkgoQrNM, START_CTX ~4 %) — 26/11 ~11:40Z
PRIORITY #1 CHECK: OD 26/11 ~01:25Z–04:20Z D1/D4 rows | main LIVE 3af7896e | review/charge-followups-rv c3e1b8fd + review/charge-trinh-punish a43aa413 | claims D1+D4 (Foreman D).
Plan changed by Foreman D (10:55Z): land ONE sha on review/charge-trinh-punish (contains -rv).
| commit | what |
|---|---|
| 5fe832c1 | co-op law (host computes): jtruth deedSync (+ jkh khDeed wrapper) never writes a world person's ledger on a guest seat (the new xx deed wrote R#9.wrongs "xx" / dkeys "xx:mk" on B on a read); jmgt mgHand guest read-not-stored; rv nits j95 chOK(v,S,"tt"), j71 picker w = mh pieces |
| 0a69b83f | test: vpAccuse case always runs (over-rank piece given) → chPunish vp PASS; co-op lazy-write case |
| 4b693c7a | REAL BUG in a43aa413: F2 `function j95c(s)` REPLACED the buổi calendar `j95c(b)` (callers in j95 / jagday / jagacts / jagacts2 / jagent got "mh"/"tt"); G1 one-core-guard FAIL «defined twice» → renamed j95chg, G1 PASS |
| f068313b | rv FAIL 4b693c7a (R#9.dw A=2 B=1, host deeds written after the week cut): host deedSyncAll at the top of jcoopworld toCanon (before the cut); mgHand read-not-stored in co-op on both seats (stored hand still read; single player stores) |
coop-e2e (live Worker, same machine, sequential):
| build | runs |
|---|---|
| LIVE 3af7896e | 143 · 142 (1 FAIL «week after rebirth advances», flake on LIVE) · 143 |
| c3e1b8fd | 141 (mgH.hoadien / mgHv on seat B only = guest lazy write, real) |
| a43aa413 | 143 |
| 4b693c7a | 143 · 143 (reviewer's run 142: R#9.dw) |
| f068313b | running ×3 |
Tests on f068313b: charge-trinh-punish ALL PASS (incl. vpAccuse + co-op guest / host / single-player cases), one-core-guard PASS. Reviewer on 4b693c7a: coregates PASS except the known LIVE dialog-fixed / button-crawl.
