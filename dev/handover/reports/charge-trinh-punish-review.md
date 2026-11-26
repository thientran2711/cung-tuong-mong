# BIG REVIEW — review/charge-trinh-punish c59bae19 (STEP 4) + -rv delta ad31b084→c3e1b8fd + LIVE merge 5fa873ec→ad31b084
Reviewer: ONE BIG REVIEWER (opus) session_01D3E3NXbek1mcjhNBkMvvT4, depth 4, START_CTX ~3 % (get_session reads 0; own estimate). Child of worker D1+D4 #5 session_01D3E3NbLPKdQmHXFEQ4xkHv, under FOREMAN D session_01D3E3NaVk7n7f8KTo2enJna.

PRIORITY #1 CHECK ('Trình Hoàng hậu|Mua chuộc|bị đuổi khỏi cung|trinhhh'): OD 2 | ledger 0 | claims 4 (D1+D4 row = worker #5) | main 15 | review/* 0 | archive 0 (worker's line, re-checked: OD rows 26/11 ~05:15Z–~05:55Z + ~07:50Z read verbatim; reuse of chPunish / chBought / chMcFire / j42 «Bị đuổi khỏi cung» / coopCold road confirmed in code — no second system).

## VERDICT: **FAIL** (3 items, all LAW 11 whole family of the O2 work; items 1 and 3 also LAW 1 / LAW 4). O1 and the O2 core roads are good and need no change.

## What was checked
| check | result |
|---|---|
| LIVE merge 5fa873ec + origin/main 3af7896e → ad31b084 | clean: `git merge-tree` of the two parents = ad31b084 for every source file (only index.html / sw.js differ = rebuilt); origin/main 3af7896e is an ancestor of c59bae19 |
| built files of c59bae19 | `dev/site/build_site.sh` rebuild = committed index.html except the CTM_BI build line (expected) |
| -rv delta ad31b084→c3e1b8fd | jbal2 BAL.charge.bandWord [2,5] read by chFind (LAW 4 OK, the typed `b<=2/b>=5` gone); j78:192 «Tố tội thật» card now prints `Chứng cứ −n (tội X)` + chPunTxt, and j30 tocao f really spends chHave(c) and punishes by chPunish (card = act) — PASS for that card; see F3 for the second card of the same act |
| charge-trinh-punish.js | ALL PASS, 0 page errors (O2 4 roads, jtsb NPC/her, other-charge-piece no telling, O1 stays/ends/rows, co-op toCanon + onWeek) |
| charge-followups.js | ALL PASS, 0 page errors |
| charge-smoke.js file://…/dev/index.html | 0 FAIL, 0 page errors |
| seize-ledger.js | ALL PASS |
| punish-reason.js 755x1000 / 1180x820 | ALL PASS / ALL PASS |
| charge-scan.py -v | all families 0 — but the scan is ONE-LINE only (see F1–F2) |
| coop-e2e.js (live Worker, room BZN7) | 143/143 passed, EXIT 0 (rebirth into the same world 1.6 s, 0 buổi timeouts) |
| videos fold-755x1000.webm / ipad-1180x820.webm + fold-endcard.png / ipad-endcard.png | looked at (contact sheets + both end cards): real start → servant life → end card «Bèo dạt mây trôi» / «BỊ ĐUỔI KHỎI CUNG» with kit rows Ai tố / Vì sao / Chứng cứ / Hình phạt / Người hầu bị mua → real tap «Chuyển kiếp» → Luân hồi. Nothing cut, no overflow, kit card, cổ trang words («Cung Chính ti tước tên … đuổi ra cửa Thần Vũ», «Ai xử: Cung Chính ti, theo cung quy»), no %. |

## O2 — Trình Hoàng hậu → chPunish of the proven charge: PASS (core roads)
Read jcharge T.f wrapper + punish wrapper (p.chTr) and confirmed at runtime: NPC→NPC, her→NPC, NPC→her with an NPC queen and her own card as Hoàng hậu all end in chPunish(t,"uh"), no generic punish. jtsb.js:100 (NPC bullied → «đem chứng cứ trình Hoàng hậu») now gates chOK(t,a,"uh"), spends those pieces and punishes by chPunish "uh" (cấm túc + bồi bạc) — good. CHBY fix: her notice keeps «Ai tố» + «Chứng cứ» on cấm túc / giáng charges (test notice text has Chứng cứ + ức hiếp + Bồi thường) — good.
proof_generic -v reasons judged one by one: all listed reasons are correct (false-accusation / failed roads; j8 accuse/judge fallbacks only run with no ready charge and every caller gates chOK — j8:533, jagacts:68, j8:490 checked; j30 expose = tt's own table-A road; j70 caught in the act; j10 sell-out; j8:447 leak; jlost hearing; jrcp gift illness; jagstaff/j42 servant-life maid secrets).

## O1 — she as the bought servant: PASS
chSrvMe (S.srv.spyFor === t.id, set by j42:376 «Nhận bạc, làm tai mắt» = v.id) → rank 2 inside BAL.charge.mcFire like any bought servant; not bought by the guilty one → stays (tested). Ending after the guilty one's punishment is written (finally block), over(…, alive) = the j42 servant-life ending; deathChain adds the five rows; k61 know of accuser + briber. Co-op: friend's seat entry (buildFriendSrv spyFor "me" / id) marked coopMcOut → toCanon fP.S.coopSrvOut (same road as coopCold) → onWeek → chSrvEnd → same ending, friend continues; both directions (her bought by the friend-consort: spyFor = the friend entry's id; the friend bought by her: "me"). LAW 1 / 4 / 6 / 7 / 9 OK.

## FINDINGS
| # | severity | law | where | finding | fix wanted |
|---|---|---|---|---|---|
| F1 | **BLOCKING** | 1 two-way, 11 | jtsb.js:144–145 (her «Báo lên Hoàng hậu / Thái hậu» against the bully) | The MIRROR of the site this branch fixed. The NPC road (jtsb:100) now needs the ức hiếp pieces and punishes by chPunish "uh"; HER road still gates on the TOTAL `evG(S,a)` (or a witness), odds `n*12` from the total (typed 12, LAW 4), and punishes by the generic `punish(a,"ức hiếp người dưới phẩm",1)` with no pieces spent. This branch therefore CREATED a two-way difference (an NPC victim needs 2 uh pieces, she needs any 1 piece of anything). Missed because charge-scan proof_generic only looks at one line (the evG is on :144, the punish on :145). | Same treatment as :100: need chOK(S,a,"uh") (the witness can stay as the gate only if the owner rule allows a witness in place of pieces — D4 table A says pieces; keep the witness as an odds factor), odds from chHave + BAL (no typed 12), spend the pieces, chPunish(a,"uh",…,S) with CHX. Test her road both ways. |
| F2 | **BLOCKING** | 11, D4 «never a total count» (OD 26/11 ~05:15Z row + 25/11 (3)) | j71.js:236–238 event «Lập công · Vạch mưu» (tomuu): «Trình chứng cứ lên Hoàng thượng» / «Trình lên Thái hậu»; j95.js:427–442 caught-in-the-act «Tố giác lên Hoàng hậu / Hoàng thượng», «Xử tội theo luật cung» | Both are won evidence presentations NOT routed to chPunish: j71 gates `v.ev>=1` (total), odds `ev*12`, punishes generic `punish(v,"mưu hại trong cung",1)` and wipes `v.ev=0`; j95 odds `pr*15` from total evG, `evA(S,v,BAL.evWipe)`, generic `punish(v,"chuẩn bị mưu hại",2)` (tryst → deathSentence instead of the tt road). Not in the -v list at all (multi-line sites), so the family claim «every other site listed with its reason» is not true yet. | Route each through the charge of what she holds (chReady / chOK, pieces spent, chPunish with CHX; tryst → the tt charge), or, if a site is truly «caught in the act» (j95), list it in PG_OK with that reason AND drop the total-evidence odds. Make charge-scan proof_generic look at the whole statement / option (e.g. a 1500-char window before the punish, as this reviewer did) and list every hit with a reason. Other window hits to judge and list (not proven-charge roads at first look, but the scan must say so): j10:168 jointScheme «hợp mưu tố tội», j7:187 «Tố lên Hoàng thượng» (maid tip, no pieces), j30:26 / jrcv:225 «Xin Hoàng hậu giáng», j3:119, j4:25, j7:177, j8:182, j8:308, j92:345/349, jagacts2:97, jreign:218, jroute:379/384. |
| F3 | **BLOCKING** | 4 one core / rules-one-source, 11, kit consistency (OD:L1095) | j78.js:173 actLineRaw spend table → the Hậu cung person card (j15 rvGroups / rvCard, also jaudit optLine and jsgame sgLine) | Same act, two cards, two different costs — the exact family c3e1b8fd fixed at j78:192 only. Runtime (her vs a rival with uh 2/2 + vp 1, total 3): rvGroups prints «Tố giác · Tốn Chứng cứ −3 · Thành nàng bị phế hoặc giáng» (act spends 2 uh pieces, punishes cấm túc + bồi bạc); «Tố tội thật · Tốn Chứng cứ −1 · Thành Không được gì thêm · Kèm nàng chịu phạt» (act spends 2); «Bóc chuyện tư tình · Chứng cứ −3» (act spends the tt pieces = 0). evidenceActs (j78:192) shows the right «Chứng cứ tội ức hiếp quấy phá −2». | actLineRaw (and the AOUT «thành» text) must read the same helper the acts use: for accuse / tocao / expose / trinhhh the pieces of chReady / chTocao / "tt" (chHave) and «Chứng cứ −n (tội X)» + chPunTxt; never evG total or BAL.eff.j30.evF / j78.evF_2. One shared helper for both cards. |
| N1 | nit | — | jcharge chSrvOut / chMcFire | If SHE (as the bought servant) is herself the accuser of her briber, she is dismissed with «Ai tố: ngươi». Consistent with law 1 (any bought servant goes), but give the act card a warning line («kẻ nhận bạc cũng bị đuổi») if such a road is offered to a servant. Not gating. |
| P1 | pre-existing | 6b | j42 end card / servant intro | A servant's end card shows «Đáp ứng» and a consort figure (also the «Nhập cung làm cung nữ» card in the video). Worker noted it; same on every j42 «Bị đuổi khỏi cung» road. Not gating this branch → Foreman D queue. |
| P2 | pre-existing | — | LIVE | quickcheck dialog-fixed «kit-dialog-2 empty Tốn/Được» + button-crawl «Ô lưu · Lui» — not gating (as briefed). |

## Laws touched
1 two-way: O1 / O2 core PASS; F1 FAIL. 4 one core: bandWord PASS; F1 (typed 12), F3 FAIL. 6 real evidence: O2 core PASS; F2 FAIL. 7 cổ trang: PASS (end card, notice rows; no %). 9 kit: PASS (end card kit rows, pcard). 11 whole family: F1–F3 FAIL.

## Not changed by the reviewer
No code pushed. Videos / shots looked at in scratch only; CDN folder img/_review/charge-trinh-punish/ left for the worker's fix round (the verdict giver wipes it at the final PASS).

## DELTA c59bae19 → a43aa413 (fix round): **PASS a43aa413** — coop-e2e on a43aa413 (live Worker, room EQEC) 143/143, 0 buổi timeouts
| item | fix | checked |
|---|---|---|
| F1 | jtsb her «Báo lên Hoàng hậu / Thái hậu» needs the ức hiếp pieces (need row «có n/need»), spends them, chPunish "uh"; one odds helper tsbRepO for her AND the NPC victim (BAL.odb.jtsb.orPer / orWit / orDanhD, the witness = odds factor); the NPC road now rolls the same odds | PASS (read + charge-trinh-punish.js) — two-way equal, LAW 4 |
| F2 | j71 tomuu: actor picked by chOK(S,v,"mh"), options only when the mưu hại charge is ready, odds by its pieces (BAL.odb.j71.evPer / evDanhD / evThD), spend + chPunish "mh"; j95 caught in the act: odds + spend = the pieces of the matching charge (j95c: tryst → tt, else mh, BAL.m95.accPer), kept as a caught-in-act punishment with reason; j8 Tố vượt phẩm → chPunish "vp"; charge-scan proof_generic uses a 1500-char statement window and lists every hit with a reason | PASS — -v list judged: every reason fits (false accusations, caught-in-act, story-event proof, gift / hearing / court roads) |
| F3 | one helper jcharge chUse / chUseTxt / chWinTxt read by the Hậu cung card (actLineRaw + AOUT accuse / tocao) and the evidence card | PASS — runtime the same rival (uh 2/2 + vp 1): person card Tố giác / Tố tội thật / Trình Hoàng hậu = «Chứng cứ −2», win = the uh punishment; the evidence card = «Chứng cứ −2 (tội ức hiếp quấy phá)» |
Tests on a43aa413: charge-trinh-punish ALL PASS · charge-followups ALL PASS · charge-smoke 0 FAIL · seize-ledger ALL PASS · punish-reason 755x1000 / 1180x820 ALL PASS · charge-scan all 0 · 0 page errors; built files = a fresh build_site.sh except the build stamps.
Nits (not gating): j95 NPC→her road gates chOK(v,S) (any charge) while its odds read the tt pieces (gate with chOK(v,S,"tt")); j71 tomuu picker weight still `v.ev+1` (total, used only for the pick weight); j71 typed w:{danh:4,sung:3} (pre-existing).

## DELTA a43aa413 → 4b693c7a: **FAIL** (one co-op item; everything else PASS)
Reviewer's own miss in the a43aa413 PASS: a43aa413 F2 defined `function j95c(s)` in j95.js, which replaced the buổi calendar `j95c(b)`. Fixed in 4b693c7a (renamed j95chg, 5 uses). The duplicate-function scan of every dev/build j*.js against LIVE 3af7896e finds 0 new duplicates at 4b693c7a (1 at a43aa413 = j95c). From now on this reviewer runs that scan on every delta.
| item | result |
|---|---|
| j95chg rename + nits (j95 NPC→her gate chOK(v,S,"tt"); j71 picker weight = mh pieces) | PASS |
| tests: charge-trinh-punish (incl. the new vpAccuse + guest-seat cases), charge-followups, charge-smoke, seize-ledger, punish-reason Fold/iPad, charge-scan all 0 | PASS, 0 page errors; built files = fresh build except stamps |
| coregates vs LIVE 3af7896e | G1 guard / bind / text / textrule PASS, G2 rules PASS, coop-one-world PASS, npc-purpose 419 PASS, dead-card / q-softlock / press-keep / look-dedupe PASS; FAIL only the pre-existing LIVE faults dialog-fixed «kit-dialog-2 empty Tốn/Được» + button-crawl «Ô lưu · Lui»; next-dead FIX-6 failed once inside the gate run, re-run alone PASS on the branch and on LIVE (flaky under load) |
| **coop-e2e on 4b693c7a (live Worker)** | **142/143: FAIL «after week 1: the same world on both seats» {"d":["R#9.dw A=2 B=1"]}** |
Cause (read): 5fe832c1 makes the guest skip deedSync for world people (good, host computes), but the HOST's writes still land AFTER its week snapshot: jtruth.js:56 wraps endTurn as `e0.apply(...)` THEN `evTruthSweep()`, so the sweep's deedOnce/deedAdd (dw, wrongs, dkeys) is written on seat A after the merged week was built, and seat B never gets it that week. Before 5fe832c1 the guest wrote the same deed itself, which hid the lag. Same «coop-host-lag» family as the hoadien case: a host lazy write after the snapshot.
Fix wanted: on the host, run the sweep (deedSync of every world person) BEFORE the week is sent (call evTruthSweep before e0 in the endTurn wrapper, or at the top of toCanon when host()), so the merged week carries the deeds. Check the jmgt mgHand host store the same way (a host read after the snapshot stores mgH that the guest only gets next week). Then coop-e2e ×3, all 143/143.

## DELTA r2 4b693c7a → f068313b: **PASS f068313b**
- The host runs jtruth deedSyncAll (deedSync of S plus every living or cold-palace world person) at the top of jcoopworld toCanon when host(), BEFORE the week is cut. The endTurn evTruthSweep stays (its deedSync is a no-op for that week).
- jmgt mgHand: in co-op a world person's hand is read (the same hash draw), never stored on a read, on both seats; an already stored current-band hand is read; single player still stores.
- Read OK; FF from LIVE 3af7896e; new-duplicate-function scan vs LIVE = 0; built files = fresh build except the build stamps.
- Tests: charge-trinh-punish (incl. guest / host / deedSyncAll / single-player store cases) ALL PASS · charge-followups ALL PASS · charge-smoke 0 FAIL · seize-ledger ALL PASS · 0 page errors.
- **coop-e2e on f068313b (live Worker) 143/143** (the R#9.dw seat diff is gone).
- G1 one-core-guard: the worker's run reports PASS; this reviewer's full coregates run on 4b693c7a (same gates) failed only on the known LIVE faults.
Land after the worker's coop-e2e ×3 are all 143/143 too. Wipe the CDN folder img/_review/charge-trinh-punish/ at landing.

## MERGE DELTA f068313b → ac73cd3c (origin/main 1dcb373e, coop-freeze-kmrew scroll-cue): **PASS ac73cd3c**
`git merge-tree` of f068313b + 1dcb373e = ac73cd3c for every source file (only index.html / sw.js / assets.json differ = rebuilt); FF from LIVE 1dcb373e; fresh build_site.sh = committed except stamps; no new duplicate functions vs LIVE; charge-trinh-punish + charge-followups ALL PASS, 0 page errors. coop-e2e ×3 + quickcheck = worker #6's run (land only if all 143/143 and quickcheck shows only the known LIVE faults).
