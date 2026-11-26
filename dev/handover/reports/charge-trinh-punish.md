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
