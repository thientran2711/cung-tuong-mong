# REVIEW receiver-choice — BIG (opus, session_01964izDgKu5f95bvTV3Ea7C)

START_CTX ≈ 6 % of 1M (get_session read 0 at start; own estimate). Rollover at ≈ 31 %, ceiling 60 %.

PRIORITY #1 CHECK ('receiver-choice'): OD L1876, L1913 (~20:35Z), L1915 (~21:15Z), L1918 (~21:30Z) read verbatim | main: BAL.road.hp (kw full/half/no/sab/lk, rdHpW), jagstf2 stf2Bribe/stf2Ord, j42 cnvOrdOpts/cnvBribeOpts; jrcv not on main | review/*: review/receiver-choice 88de83c5f (under review), review/parallel-time f4eb517a5 (BIG FAIL 7, ptOrdAdd / S.ordQ), review/role-parity d6c2dc17 (merged INTO this branch, not on main), review/choice-value-audit 55e5f652 (BAL.cv.decl.suc) | claims: D row (this job).

18 LAWS checked: 1 FAIL (Hoàng hậu as receiver forced; bribel / invite2 still forced) · 2 FAIL (slot-1 «qua loa» answers free and better than «Từ chối») · 3 FAIL (owner's own example: qua loa = weaker result + risk; one «cost» is text only) · 4 / 13 FAIL (rcvMaidBribe second copy of the stf2Bribe weights; BAL.rcv.kw copy of BAL.road.hp.kw; typed halves) · 6b ok · 7 ok (no %, words) · 9 ok (kit pushDil dialog, kit option rows) · 11 FAIL (scan blind to judge-receivers and own-servant orders) · 15 note (slot 3 «Mách lẻo» = BAL.road.hp.kw.lk, as the parallel-time reviewer accepted; L1876 says «phá ngầm-mách lẻo»).

## VERDICT: FAIL 6 @88de83c5f (merged onto origin/main 53544bd8 as review/receiver-choice-rv 1465d150d; no fixes made)

1. **Law 2 + 3: the slot-1 «qua loa» answer costs nothing and is better than «Từ chối».** OD ~21:15Z: "qua loa → weaker result + risk". rcvYesO gives slot 1 no Sức cost and no risk unless the act adds one. Her cards (test output, 88de83c5f):
   - Kết giao «Nhận lễ, giữ khoảng cách»: "được: lễ 30 lượng, … quý ngươi +3". No cost. «Từ chối»: returns the 30 lượng, both likings −3, Danh +1.
   - Lập phe cùng / Mời vào phe «Hẹn để sau»: "được: … quý ngươi +3". No cost.
   - Ghé chơi «Tiếp qua loa»: thiện cảm +2, quý +3. No cost.
   - Hòa giải «Nguôi một nửa»: oán −5, quý +3. No cost.
   - Xin vào phe «Nhận cho có»: the only cost is the text "nàng thấy mình chỉ được nhận cho có". Nothing is applied, so the cost is not real (law 3).

   Each one keeps the receiver out of the act, gains liking, and costs nothing, so it is clearly better than «Từ chối» (law 2). Fix in rcvYesO for every card: slot 1 needs a real BAL cost or risk (for example, a roll that the asker sees through it: liking − / oán +). Show it on the card and apply the same number for an NPC.
2. **Law 11 + law 1: bribel and invite2 are still forced, and parallel-time does not cover them.** f4eb517a5 has no bribel code; grep jptime shows only HA_VAR. The scan on the f4eb517a5 build still shows FORCED for act:bribel and ag:cx3:invite2. For invite2, parallel-time only makes it a sent servant: she gets a log line ("… mời ngươi sang cung nàng chơi"), not a card, and an NPC guest rolls agTry with a cost only on a hard fail. Neither side has the choice set. «Sai cung nữ thân tín lấy lòng» belongs to the same group as Mua chuộc (HA_VAR bribel→bribe) and should go through the same receiver pick that bribe now uses. invite2 should go through RCVK (accept / qua loa / từ chối / mách), with her card at landing. Neither belongs on the «theirs» open list.
3. **Law 1, missed by the scan: the Hoàng hậu as RECEIVER of a request.** Probe (S.rank 7, NPC a → ACT.xinhh.f / ACT.trinhhh.f): the result was "Hoàng hậu nghe lời …, tâu xin giáng … bị giáng xuống Quý nhân" and "trình chứng cứ lên Hoàng hậu: … bị xét tội", with NO card (Q empty). Her decision as queen is rolled for her. «Xin Hoàng hậu giáng» and «Trình Hoàng hậu» are requests: when she asks an NPC queen, the queen decides. Two-way means she decides when she is the queen, with the same answers, and an NPC queen picks through rcvPick. trinhth (Thái hậu) has the same shape with an NPC judge (no player side, so it is OK as it stands).
4. **Law 11: the scan is blind in two ways.** (a) The hand list KINDS sends every unlisted act to DONE/OK. xinhh, trinhhh and trinhth (requests to a judge) and laydo/laydol (orders to her own servant, the same shape as bribel, which is listed REQ) pass as OK. (b) The probe never puts her in the receiving seat when the receiver is not the target: the judge (queen) and the servant who is ordered. Fix: classify these, add a judge-receiver probe (S as Hoàng hậu) and an own-servant probe, and make a new act fail until it is classified. That last part is optional but recommended.
5. **Law 4 / 13 one core.**
   - (a) `rcvMaidBribe` (jrcv) is a second copy of `stf2Bribe`'s weight formula (jagstf2 L28) and drops its `stf2Tr` trait factor, so a bribed maid's nết no longer counts. Share one weight function.
   - (b) The NPC maid's take / tell answers keep j8's own numbers: steal ≤ typed 30, loyal + loyalF_2, evF_4. Her maid card (cnvBribeOpts) uses bạc pay, Chủ tin + BAL.coopBribe.tin, and ev.one. The ids match but the numbers do not (OD ~20:35Z: "same numbers on both sides").
   - (c) `BAL.rcv.kw` is a copy of the existing L1876 words `BAL.road.hp.kw` (full / half / no / lk). Read hp.kw.
   - (d) Typed numbers in the new code: `Math.round(g/2)` / `Math.round(m/2)` (Ghé chơi / Hòa giải halves; use BAL.rcv.help.half or a BAL key), and "bớt ghen 10" plus `ghen−10` (moved from j8 into RCVK.ally text). Also `oSee(t,true)+25` in rcvGiftIn (copied). Move them to BAL.
6. **Landing: this branch carries review/role-parity d6c2dc17, which is not on main and not reviewed here.** That includes jagmaid riseCore, j42 srvRise, j14, j83 and jact. An FF of this branch would land C-AG's role-parity code. Land role-parity first after its own review, or split it out. role-parity.test on HEAD: 1 FAIL (new P-ONLY gaps fert / staffUp / harm:*; random probe). The same test on d6c2dc17 alone: see Gates.

Also (not counted, fix with the above):
- Mách lẻo cost row lists "Danh <asker> −2" under the receiver's «mất». That is the asker's loss, not hers; move it to «được» or word it as the asker's.
- parallel-time BIG FAIL #1: the «tin» panel body is not drawn and would overwrite jerr's panel. Every rcvCard routed through ptOrdAdd sits in that panel, so re-check her rcvHelp / rcvAsk notice once parallel-time is fixed. #4 (sent-servant NPC deeds instant) and #5 (stale scan) do not touch jrcv.

## Accepted (not FAIL)
- Scan: live main 53544bd8 → rows 82 · ASYM 2 (cx:gift, emp:summon) · FORCED 12. Branch 88de83c5f → rows 80 · SAME 12 · FORCED 3 (bribel, staffUp, invite2).
- Planted forced receiver (TW call back to the old run): scan FORCED:tw:call; receiver-choice.test 2 FAIL. Broke jrcv (rcvPick = O[0]): receiver-choice.test 22 FAIL. Both tests have teeth.
- NPC weights: rcvW = jroad rdHpW on the receiver's profile (L1876 rates × nết × liking × tâm cơ) through mindPick. These are not new weights for the help / ask cards (only the bribe copy, #5a). Draws per 300 asks: ally full 113 / half 92 / no 59 / sab 36; blockf 113 / 97 / 59 / 31 (≈ 38 / 31 / 20 / 11 per 100; no runaway answer). Summons go 184 / ill 16 of 200 (k.emp).
- Ngự giá (emp:visit) NPC: Thắp đèn / Phô tài / Khuyên ngài use her card's numbers (j7 L55 Phô tài = Sức − show.suc, roll Sủng / Danh, no night; NPC the same).
- Tiến cử (staffUp): accepted. It is a request to an office, recommend() is one rule for her and NPCs, and the servant only gains (law 3). It should leave the FORCED list (class it GIFT / exempt), not stay «open».
- Shared key: the summoned NPC «Cáo bệnh» reads BAL.cv.decl.suc with the same sign as choice-value-audit's card (jts L297 there: apply suc:+BAL.cv.decl.suc). The guard is suc 0 until that lands. No copy.
- Her notice: rcvCard → ptOrdAdd when ptOn(), else ONE queued kit dialog (pushDil → pushModal Q), so there is never a double notice. Deadline: ptOrdTick finds the option named «Từ chối», and rcvNoO always uses that name, so it is applied with its cost. Without parallel-time, the queued dialog must be answered (no silent skip).
- Labels: «Giúp hết lòng / Giúp qua loa / Từ chối / Mách lẻo» on Nhờ giúp đỡ / Nhờ ơn = BAL.road.hp.kw words (see #5c for the copy). Request cards (Kết giao …) rename slots 0 / 1 for the act. This is left to D #4 / MAIN: whether her L1876 words must show verbatim there (law 15) or the act words stand.

## Gates (merge 1465d150d = 88de83c5f + origin/main 53544bd8; assemble.py conflict → main's list + jrcv.js; index.html / sw.js rebuilt)
- receiver-choice.test (88de83c5f): ALL PASS. Mutations: planted forced call → 2 FAIL; rcvPick = O[0] → 22 FAIL.
- receiver-choice-scan: live 53544bd8 vs branch (see Accepted). On parallel-time f4eb517a5: bribel and invite2 are still FORCED (#2).
- role-parity.test: branch HEAD = 1 FAIL (new-gap check, random probe). review/role-parity d6c2dc17 by itself = 3 FAIL (the same new-gap check, plus 2 promotion act-set checks). The FAILs exist without this branch's changes, so they are not caused by them. They belong to C-AG.
- quickcheck --runs 6 on 1465d150d: QUICKCHECK PASS · core gates PASS · open 1971 ms · old save ok · perf new/live render 214/246, tab 447/430, buổi 1111/1178.
- Shots (receiver-choice-shots.js on the merge, Fold 755x1000@2 + iPad 1180x820@2: help / ally / call), looked at: kit VIỆC dialog, Fold long rows, iPad 2 columns, no cut text. The Fold ally card shows #1: «Nhận lễ, giữ khoảng cách» has GỢI Ý "lễ ba mươi lượng, người ấy có thiện cảm hơn" and no TỐN row. Shots kept in scratch, not in git or on the CDN.
- Not run (FAIL already decided): coop-e2e (the worker ran it: 63/63) and the paired bot run (draw counts from the test are listed above).
- Branch review/receiver-choice-rv 1465d150d pushed (merge only, no fixes). The successor can start from it.

---
# RE-CHECK #2 — REVIEW receiver-choice #2 (BIG, opus, session_01964izDhYprGzHx3vd2qwk7) of SẴN SÀNG KIỂM 28ebffad8
START_CTX ≈ 3 % of 1M (get_session read 0; own estimate) → rollover ≈ 28 %, ceiling 60 %.
PRIORITY #1 CHECK ('receiver choice'): OD L1876 / ~20:35Z / ~21:15Z / ~21:30Z read verbatim | main 9a1d6922 (merged in 28ebffad8; live now 8113f42e) — jrcv not on main; j83 IROUTE/illBuy + jagacts4 cx4:ill* + jration lxAskHer (role-parity r2/r3, live) | review/*: review/receiver-choice 28ebffad8 (under review), review/parallel-time (re-check running, lands first), review/stage-here r4 (kitNotice, ONE NOTICE SYSTEM) | claims: D row (this job).

## W22 commits 132d878 / dec2593 / e8750d7 — ruling
They are Foreman C art-report commits (W22 «nam mẫu» v2/v3/v4, author w22@x) on the shared handover branch, flagged by a stop hook as Unverified. They are not on review/receiver-choice and touch no game code. Reviewer #1 was right not to rewrite them: rewriting pushed shared history is forbidden. Ruling: out of scope for this job and not a FAIL. If anyone wants them re-signed, that is C / MAIN's call.

## VERDICT: FAIL 6 @28ebffad8 (no fixes made; nothing pushed to review/receiver-choice-rv)

### The 6 old items, re-checked
- #1 qua loa: FIXED. Every slot 1 now has a weaker result, Sức − prop.suc×half, and the seen-through risk in words (chanceW, VANPHONG L67). It is applied for an NPC too (test: NPC qua loa pays Sức 102/102, seen 20).
- #2 bribel / invite2: FIXED. Both are SAME in the scan. The bribel maid picks through rcvMaidBribe; invite has the 4 answers both ways.
- #3 judge: FIXED. She as the Hoàng hậu gets the card for xinhh / trinhhh / rougeBeg, and it survives an old save. An NPC queen picks yes / no at the shown odds.
- #4 scan: PARTLY fixed. All 267 keys are classified (NEW = gap), and there are judge and own-servant probes. Still blind, see new #5.
- #5 one core: FIXED. stf2BribeW is shared (with stf2Tr). BAL.rcv.kw is gone. Halves / ghen / chkSee are in BAL. The maid take / tell use the cnvBribeOpts numbers.
- #6 role-parity: FIXED. `git diff origin/main HEAD` has no role-parity code, and role-parity.test is ALL PASS.

### FAIL list
1. **Gate not green: receiver-choice.test FAILS 2 of 3 runs on this box.** The failing check is «Mượn son phấn (cx4 rougeBorrow): the NPC lender answers…», with result {"?":80}; the one good run had yes 8 / no 1 / ? 71. The test seeds a lender `ln`, but the deed (AGRUN cx4:rougeBorrow) picks its own lender, so the rcvOddsPick branch is mostly never reached. Fix: drive the lender the deed really uses (for example, call lxBorrowCard(a,ln).run() with a seeded box), and prove 5 runs green.
2. **Law 11 + 1, in-group: «Sai cung nữ thân tín mua lén ngoài cung» (cx4:illMaid / j83 IROUTE.maid).** The trusted maid is ordered with no obey / refuse / tell answer. On a fail she just loses Lòng. This is the same shape as bribel / laydo / laydol, which this round put through j29 DIRTY + DIRTY_SENT → stf2Ord. Route illBuy "maid" through the same stf2Ord pick, for her maid and an NPC's maid alike.
3. **Law 11 + 1, in-group: «Xin đồng minh» (cx4:illAlly / j83 illBuy "ally").** Probe: the ally's item is spliced out (`v.inv.splice`) with no answer. Her own card says «có ngay» and the NPC ally never chooses; NPC↔NPC is the same. She is also never asked, because illAllies filters `v.alive` and S has no alive flag, so the act is one-way. This is a REQ, so it needs the 4 answers via RCVK / rcvAsk (give / give grudgingly / refuse / mách) and her card when an NPC asks her.
4. **Law 11 + 13, in-group: her lender card for «Mượn son phấn» (jration lxAskHer).** It is a private `Q.push`, not rcvCard / PEND, which causes three problems. (a) After parallel-time lands it interrupts her act instead of going to the notice path. (b) It is not saveable, so it is lost on reload. (c) It has only 2 answers, not the L1876 4 that a peer request needs (OD ~21:15Z: "khi mà tôi nhờ vả người khác thì người đó sẽ có những cái option này"). Make it an RCVK entry; the NPC lender then picks from the same list.
5. **Scan still blind (old #4).** A key classified REQ / PROP / ORDER / ORDER_SRV / JUDGE that the probe never reaches passes silently. That is why illAlly (REQ) and illMaid (ORDER_SRV) do not show, and the table says "gaps 0" while the worker's own report lists them as forced. Make an unreached key of those kinds a gap (or give each one a probe), so the test fails until it is either fixed or listed in role-parity-open.json with its owner.
6. **Law 2: Kết giao slot 0 is clearly better than «Từ chối».** The worker's own value table: «Nhận lời kết giao» = +30 lượng, thiện cảm +25, quý +8 for Sức −4. «Từ chối» = lễ returned, both likings −3, Danh +1. Accepting has no real cost to match, so it is not equal value. Give the yes a real BAL cost of equal weight, or the refusal a matching gain. Numbers from BAL, shown on the card, the same for an NPC.

Also, with the fix (not counted):
- **ONE NOTICE SYSTEM** (MAIN order 19/11 ~00:30Z, owner OD 18/11 ~22:10Z): rcvCard's fallback (no parallel-time) is a queued dialog. Send her receiver notices to window.kitNotice when it is present (guard with typeof; review/stage-here r4). Keep ptOrdAdd when parallel-time is on, with no double notice.
- **Shot staging:** receiver-choice-shots.js «judge» sets S.rank=7 while the NPC Hoàng hậu still exists, so both judge shots show her judging evidence against «Hoàng hậu …». Pick a t who is not the queen, or take the queen seat properly.
- Live main is now 8113f42e: final-merge it before SẴN SÀNG KIỂM.

### Ruling asked by D #4: the 3 cx4 gaps (illAlly, illMaid, lxAskHer)
They belong to THIS job's whole group (law 11), not to a separate C-AG item. Each is exactly a shape this round already fixed elsewhere:
- illMaid is an ordered own servant, like bribel / laydo / laydol.
- illAlly is a request to a third-person holder, like the rougeBorrow lender.
- lxAskHer is her answer card to a peer request, like rcvAsk.

The scan is this job's deliverable, and it currently hides two of them. They arrived on main through role-parity r2 (C-AG) after the brief, so C-AG should be told, but the fix goes on review/receiver-choice. Fixing them touches only j83 / jration wiring plus jrcv entries.

## Gates (28ebffad8; dev/index.html assembled; site build restored after)
- receiver-choice.test: 1 FAIL in 2 of 3 runs (#1); every other check ok.
- role-parity.test: ALL PASS.
- quickcheck --runs 6: QUICKCHECK PASS · open 1233 ms · old save ok · perf new/live render 156/176, tab 288/279, buổi 930/1045 ms · core gates PASS (one-core-guard, rules-one-source, kit-conform, co-op one-world probe).
- coop-e2e: 63/63 PASS.
- Probes: illAlly (S as holder, explicit `from`) loses the item with no card (Q empty); illAllies never lists S; DIRTY has no illMaid.
- Law 7: «khả năng vừa / thấp» follows VANPHONG L67 (chance of an attached thing); no %.
- Law 9: kit VIỆC dialog and kit option cards; «có rủi ro» chip uses the kit risk field.
- Shots (receiver-choice-shots.js, Fold 755x1000@2 + iPad 1180x820@2: help / ally / call / judge / invite), looked at 3×: kit dialog, Fold long rows, iPad 2 columns, no cut text, «có rủi ro» on qua loa, TỐN Sức shown. Judge staging issue noted above. Shots are kept in scratch outside git, not uploaded.
- Landing: parallel-time lands first. After it is on main, receiver-choice MUST re-merge, because it expects conflicts in assemble.py / j21 / j29 / jbal2 and the jptime ptReg("invite") → rcvInviteGo swap, then re-run all gates.
Context at verdict ≈ 15 %.

---
# RE-CHECK #3 — REVIEW receiver-choice #3 (BIG, opus, session_01964izDotKMFVE41pGQZvU2) of SẴN SÀNG KIỂM 6be968a2
START_CTX ≈ 3 % of 1M (get_session read 0; own estimate) · depth 6 → rollover ≈ 28 %, ceiling 60 %.
PRIORITY #1 CHECK ('receiver choice'): OD 0 | ledger 0 | claims 1 (this job) | main 0 (jrcv not on main) | review/*: review/receiver-choice 6be968a2 (under review), review/parallel-time 807a4913 (not live, lands first), review/stage-here (kitNotice, LIVE since 73790cb7) | archive 0.

## VERDICT: PASS review/receiver-choice-rv **ac3ef2652** — LAND AFTER parallel-time (re-merge + gates)
ac3ef2652 = 6be968a2 + reviewer fixes + final merge of LIVE main **89aa1bd9** (main is 1cf5e8bb since then, seal-lean, UI only). parallel-time is NOT live, so this branch must re-merge after it lands (assemble.py / j21 / j29 / jbal2 + jptime invite → rcvInviteGo) and re-run every gate.

### The 6 RE-CHECK #2 items: all fixed (whole group)
1. Deterministic test: receiver-choice.test ×5 ALL PASS on each of 6be968a2, 0fa1689c, c2f356c9, 70142bdc, 6e9b7a42 and bf0d0994. Mutations: illMaid route off → 2 FAIL · illAlly rcvAsk off → 4 · rougeBorrow rcvAsk off → 3 · kitNotice path off → 1 · Kết giao foe off → 1 · Kết giao Danh off → 2 · scan UNREACHED off → 1. Every mutation bites.
2. illMaid → stf2Ord (the j42 cnvOrdOpts pick) for her maid and an NPC's. My probe: she pays, then refuse / tell → bạc 1000 → 1000 (refunded), no Đức loss; obey → bạc −165, Đức −3. An NPC who is refused spends nothing.
3. illAlly: RCVK.illAlly has the 4 answers. She is now in illAllies, so an NPC asking her gets her saveable card. An NPC holder draws all 4 answers.
4. rougeBorrow replaces lxAskHer: PEND.rcvAsk, 4 answers, saveable. An NPC lender picks from the same list.
5. Scan: an unreached REQ / ORDER_SRV key is UNREACHED (a gap). 267/267 classified, gaps 0 (rows 111 · SAME 56 · OK 55 on bf0d0994).
6. Kết giao law 2: yes = +30 lượng, thiện cảm +25, quý +8 against Sức −4, Danh −3, the foe −25. No = Danh +3, the foe +13 against −3 / −3. That is a real trade and no answer is clearly better. The NPC receiver gets the same numbers (the test checks Danh and foe exactly).

### Rulings
- **cx2:doctor → GIFT: accepted.** The thái y is a flag on the court seat (S.doctor / v.doctor), not a person, so she can never sit in the receiver seat. The deed is the same sure deed for her (j2 o:100) and for NPCs. If he should answer, that needs a real thái y person (law 6b) = PARKING_LOT item (feature freeze, OD:L1402). Not a FAIL.
- **tw:visit «Thăm lúc ốm mệt» → GIFT: accepted.** It has the same shape as tw:help «Giúp đỡ nàng», which two earlier reviewers accepted as GIFT. It is gain-only for the sick one, symmetric both ways (law 1 holds), and the scan checks GIFT keys for symmetry. Note for the parking lot: the visit family (call / invite) lets the host say no; a «cáo bệnh, không tiếp» answer for a sick visit would be the same idea. Not a FAIL.
- **ONE NOTICE: OK, tested against the REAL jnotice kitNotice** (it went live in 73790cb7 during this review). One «rcv» notice, no dialog. «Trả lời» opens the 4-answer card, empties S.rcvPend and drops the notice. After a load (S replaced, then render) the 2 pending notices come back. With ptOrdAdd on there is only that notice (kitNotice 0, dialog 0), so no double notice.

### Reviewer fixes (on review/receiver-choice-rv)
- 0fa1689c **illAlly «Nhường lại, lấy chút bạc»**: her card (PEND.rcvAsk drops `lk`) promised "bạc +75" when the asking NPC had 0 bạc. She lost the item and got 0. Now the card shows and pays only the bạc the asker can really pay (min of price × half and the asker's bạc), and the NPC lock is gone, so both sides follow one rule.
- c2f356c9 **the gate went red once kitNotice was live on main.** Her cards now wait as notices, and the scan read them from Q only. On some runs every N→P card showed AUTO (14 ASYM); on others only the round-4 test checks failed. Fix: the scan's run() also collects new S.rcvPend items as her card, so it measures the real path. The test's card checks run the dialog path, and one new check tests the REAL kitNotice (not a stub). The test had also left stubs behind: `delete window.kitNotice` silently fails, so the stub stayed. Now restored.
- ac3ef265 **shots**: the script opens her card from the notice. The judge card is opened while she still holds the queen seat (before, the rank was restored first, so PEND.rcvJudge rightly refused).

### Laws
1 two-way ok · 2 ok (Kết giao; illAlly qua loa now pays what it shows) · 3 ok (every answer has a gain and a cost, test checks) · 4 / 13 ok (one-core-guard PASS; stf2BribeW shared; BAL.rcv) · 6b ok (thái y = parking lot) · 7 ok (no %, chanceW words) · 9 ok (kit VIỆC dialog, kit option cards in the new opt-card-short look, kit notice) · 11 ok (the cx4 group closed; scan has no silent pass).

## Gates (bf0d0994 = merge of LIVE 89aa1bd9; shots on ac3ef265)
- receiver-choice.test ×5: ALL PASS ×5. Scan: rows 111 · SAME 56 · OK 55 · gaps 0 · 267 keys, unclassified 0.
- **role-parity.test: FAIL, and it comes from main, not this branch.** The same FAIL appears on LIVE main 89aa1bd9 alone (separate worktree): N-ONLY cx2:chest ×7, cx2:doctor ×9, cx2:fert ×9. It first showed after b1c3631e (live-servants r2). On the 70142bdc merge (main 96188526) role-parity was ALL PASS. → FOR MAIN / C-AG.
- quickcheck --runs 6: QUICKCHECK PASS · CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world) · TIME-SPILL PASS · old save ok · open 1876 ms · perf new/live render 264/267, tab 550/519, buổi 1371/1442 ms.
- coop-e2e: 63/63 PASS. stage-here.js (after merging 73790cb7): faults 0, old save ok.
- Shots Fold 755x1000@2 + iPad 1180x820@2 (help / notice / ally / call / judge / invite / illally / lend), looked at 3×: the notice chip «! Lời nhờ» in the HUD, the kit VIỆC dialog with the new kit option cards, Fold long rows, iPad 2 columns, no cut text, «có rủi ro» on qua loa, TỐN / ĐƯỢC rows. Shots are kept in scratch outside git and were not uploaded.
- Not counted (wording note): the Kết giao GỢI Ý says "người ấy mất thiện cảm (nhiều)" for the foe and "người ấy" for the asker too, so it is unclear who means whom. Optional polish.
Context at verdict ≈ 20 %.

## RE-CHECK #3 — addendum: merge with parallel-time + HANDOVER (reviewer #3 rolled over at its context line, ≈ 28 %)
- d5821e869 = ac3ef2652 + review/parallel-time-rv 801b86b7 (LIVE edb2e724). Conflicts resolved:
  - assemble.py: parallel-time list + jrcv.js.
  - jbal2: both blocks (BAL.rcv + BAL.ptime / errand).
  - j6: a.xw + houseCung.
  - j29: parallel-time body (let oc / «half» / ordHalf) + DIRTY_SENT.
  - j21: the parallel-time inviteBtn (k khắc, runner, wait text) with the receiver-choice words (rcvWord, 4 answers).
  - **j83 illMaid**: stf2Ord now returns «half»; it used to be read as a refusal (refund). Now she goes at odds − BAL.road.hp.half. Probe: the bạc is spent, successes 115 vs 153 of 200.
- Harness: the scan and the card checks run on the instant path (BAL.ptime.on = 0; parallel time only delays the same deed / card). New test check (8b) with parallel time ON:
  - her card waits ONLY in S.ordQ (no rcv notice, no dialog), and opening it gives 4 answers;
  - unanswered past the deadline (ptOrdTick) = «Từ chối» with its cost (Danh + prop.danh, likings −3; checked in the page too).
- Gates on d5821e869: receiver-choice ×5 ALL PASS · ptime.test + ptime2.test ALL OK · scan 0 gaps, 267 / 267 · quickcheck --runs 6 PASS + core gates · coop-e2e 68 / 68 · shots without page errors.
  - role-parity FAILED there, but the same FAIL list was on edb2e724 alone and on 801b86b7 alone (not ours). MAIN says role-parity is ALL PASS on 1a4df595.
- **0247fadf9** (pushed, review/receiver-choice-rv) = d5821e869 + final merge of **LIVE 1a4df595** (parallel-time 801b86b7 is LIVE). Only the generated index.html conflicted (rebuilt by assemble.py + build_site.sh). **Its gates are NOT run yet.**

### HANDOVER → successor (the coordinator opens it; report to Foreman D #7 session_01964izGYFZgrWY14rTQMsUt)
1. Read START_CORE / START_WORKER / START_REVIEWER, then this whole report (all rounds) and dev/handover/briefs/D5-receiver-choice-recheck3.md.
2. Make a worktree of review/receiver-choice-rv @0247fadf9 (sparse; install hooks). If origin/main has moved past 1a4df595, merge it first; usually only generated files conflict: `git checkout --theirs index.html sw.js assets.json`, then assemble.py + build_site.sh.
3. Gates: `python3 dev/build/assemble.py`, then:
   - receiver-choice.test ×5
   - ptime.test + ptime2.test
   - role-parity.test (MAIN: ALL PASS on 1a4df595; report only rows that stay red AND are not red on main alone)
   - `node dev/tools/receiver-choice-scan.js dev/index.html` (gaps 0)
   - `bash dev/tools/quickcheck.sh --runs 6`
   - `node dev/test/coop-e2e.js <scratch>`
   - `node dev/test/receiver-choice-shots.js <scratch>`: Fold + iPad; look at them 3× (the cards open from the notice; the notice shot is fold/ipad-rcv-notice).
4. All green → STATUS line "LAND READY review/receiver-choice-rv <sha>" + send_message to D #7 + add a short «LAND READY» line here. Red → numbered list.
