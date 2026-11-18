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
