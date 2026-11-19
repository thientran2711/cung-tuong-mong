# RECEIVER-CHOICE AUDIT — report (D #3 worker, opus, session_01964izESP2ym3HQX17qtSae)

START_CTX ≈ 4 % (of 1M; get_session read 0 at start, own estimate). Rollover at ≈ 29 %, ceiling 60 %.

PRIORITY #1 CHECK ('receiver choice'): OD L1876 + 18/11 ~20:35Z / ~21:15Z / ~21:30Z | main: jagstf2 stf2Ord/stf2Bribe/stf2Framed over j42 cnvOrdOpts/cnvBribeOpts/cnvFrameOpts (staff dilemmas, REUSED as the model); jroad rdHpW/rdHpWord/rdHpDraw + BAL.road.hp = L1876 4 answers (REUSED as the NPC weights); j8 PEND.giftin, jts tsSummonMe (her cards, REUSED as the NPC answer lists) | review/*: review/role-parity d6c2dc17 (ONE table, merged), review/parallel-time f672568a9 (send/order receiver frame — not touched) | claims: C-AG role-parity session_01Rc5AsNHRsgq6S4C9tpNLxA, D parallel-time #2 session_01964izFaHZziojdgTAvWWfY.

Branch: **review/receiver-choice** (from live main fa411d6f + merge review/role-parity d6c2dc17). SHA: see the last line.

## 1. Whole-game scan (law 11 whole group) — `dev/tools/receiver-choice-scan.js`
Every act one person does to / for another, run in the LIVE game through the ONE executor both sides share — twDo (TW deeds), ACT[k].f (act deeds), AGRUN[k] (every other ag deed) — in three directions: NPC → HER (does she get a dialog with ≥ 2 real options?), HER → NPC and NPC → NPC (does the receiver choose: mindPick / stf2Pick / stf2Bribe … with the receiver as chooser?). Self acts (they run with no target) are dropped.
Kinds: REQ (asked to do something) · PROP (proposed / invited) · ORDER (from above) · GIFT · DONE (done to her openly: harm, accuse, punish, talk — no answer at the moment on either side, counterplay after) · COVERT (she does not know at the moment: answer at discovery).
Verdict: SAME (every receiver chooses) · ASYM (one side chooses, the other is forced: law 1) · FORCED (REQ/PROP/ORDER and nobody can say no: OD 21:15Z) · OK (DONE / COVERT).

| | before | after |
|---|---|---|
| rows (inter-person acts reached) | 81 | 78–82 (probe draw) |
| SAME | 0 | 4 (Nhờ giúp đỡ, quà tặng, Hoàng thượng triệu, + 1 staff bribe side) |
| ASYM | 2 (quà tặng, Hoàng thượng triệu) | 0–1 (Mua chuộc: her OWN maid as receiver — open) |
| FORCED | 17 | 9–12 (open list below) |

Full before/after rows: **dev/tools/role-parity-table.md § RECEIVER CHOICE rows** (C-AG's ONE table, no second table). Open gaps: **dev/tools/role-parity-open.json role «receiver»** (12 entries, each with its owner).

## 2. Fixes (NOT send/order buttons) — kit parts only (existing pushDil dialog + kit option rows), ONE core
New module **dev/build/jrcv.js** (ONE receiver core, reusable by parallel-time): rcvP / rcvW (= jroad rdHpW on the receiver's profile: L1876 role row v/hh × nết × liking toward the asker × tâm cơ; nợ ân only toward her) · rcvPick(t,a,opts,kind) = the NPC receiver picks among the SAME option list her card shows, via jmind mindPick (slip, never argmax), × BAL.rcv.k[kind] · rcvWord = willingness word (rdHpWord).
Numbers: **BAL.rcv** (jbal2 end): kw (the 4 answer names), help {af, half, qAf, danh}, sumSuc, chk, k {help, gift, emp}.
1. **Nhờ giúp đỡ** (her j9 card + NPC cx2:help, one helpAsk now in jrcv): the receiver answers Giúp hết lòng / Làm qua loa / Từ chối / Mách lẻo (với Hoàng hậu), each with gain + cost (law 3): full = lends BAL.ag.cx2.help.bac (or tells a secret / receives warmly), asker's liking +8 · half = half the bạc, +3 · no = keeps bạc, both likings −fail · sab = keeps bạc, the queen's liking +5, Đức −sab.duc, the asker's oán +sab.oan and Danh −2. An NPC that asks HER now really asks (before: `t===S` returned nothing) → her saveable card «Lời nhờ» (PEND.rcvHelp). Her asking card shows the willingness word (Sẵn lòng / Miễn cưỡng / …) instead of the old liking threshold.
2. **A gift to an NPC** (j8 giveTo): the NPC answers with HER giftin answers — Nhận / Trả lại quà / Đem đến Thái y viện xét nghiệm — same numbers (go_2, go_3, evGo, BAL.rcv.chk, which her card now reads too). Weights × BAL.rcv.k.gift (sending back is less common). The old passive "her people notice a tainted gift" roll stays on Nhận (not removed: no NPC defence lost; note for review).
3. **Hoàng thượng triệu an NPC** (weights × BAL.rcv.k.emp: refusing the throne is rare, ≈ 1 in 4 in the test world) (jts tsSummonGo): the NPC answers with HER two answers — Vâng chỉ (Sức −BAL.rcv.sumSuc, needs that Sức, then her game) / Cáo bệnh (Sủng sungGo_2) — her card now reads the same BAL.rcv.sumSuc.

Timing: her «Lời nhờ» card is a queued dialog (Q / pushDil) shown when the current dialog / act is over — it never opens over her act. The «!» notice chip + deadline (unanswered = từ chối) is the parallel-time receiver frame: when it lands, PEND.rcvHelp plugs into it (asked parallel-time #2 for its API; no answer yet at this report).

## 3. Gates
- dev/test/receiver-choice.test.js: ALL PASS (13 checks: no new gap; 3 rows SAME; her card 4 answers in L1876 order with gain AND cost, no %; old-save pending card round trip; NPC draws all 4 answers; gift back/keep; summons go/ill with her numbers; no page errors).
- role-parity.test.js: receiver rows excluded from its open-list check (they live in receiver-choice.test.js).
- quickcheck: run 1 PASS except G1 one-core-bind (the NPC «found» gift line printed evGo away from its rule) → fixed b25ead7af; G2 rules / G3 kit (755x1000 103 conform, 3 missing = same as live) / G4 odds-cap, coop-one-world PASS, mk-layer, manifest PASS; open 1225 ms, OLD SAVE OK, perf new/live render 207/184, tab 336/352. Re-run on b25ead7af: QUICKCHECK PASS · core gates PASS · open 1317 ms · old save ok · perf new/live render 199/210, tab 396/380, buổi 1506/1070 (noisy box; run 1 was 1250/972, earlier 936/1050).
- Shots (Fold 755x1000@2 HOST + iPad 1180x820@2): her «Lời nhờ» card, 4 answers, kit dialog (Fold: long rows; iPad: 2 columns), each with GỢI Ý. Taken with dev/test/receiver-choice-shots.js; kept outside git at /home/user/wt/rc-shots (not uploaded to the CDN review folder — successor or reviewer: `node dev/test/receiver-choice-shots.js <dir>` then cdn_sync img/_review/receiver-choice).
- KIT/ART note: the 4 answer options have no option picture (empty kit picture frame) — the same as other new answer cards; art request for Foreman C if the owner wants pictures there.
- NOT run (rollover): coop-e2e.js full run (coop-one-world probe PASS inside quickcheck).

## 4. Open (handover to the successor / owner of each)
FORCED, still to give the 4 answers (or accept / refuse) on both sides through jrcv: tw:call Ghé chơi · ag:see:mediate · ag:cx:ally / act ally Kết giao · cx3:facFound Lập phe cùng · cx3:facJoin Xin vào phe · cx3:staffUp Tiến cử · act:blockf Nhờ ơn người quen · ag:emp:visit. Note: Kết giao / Lập phe show ODDS on her button today; with a receiver answer they should show the willingness word (rcvWord) like Nhờ giúp đỡ.
Parallel-time (send buttons): cx3:invite2 Mời đến cung ta (jptime §4), act:bribel Sai cung nữ thân tín lấy lòng.
Staff dilemma G10: act:bribe / cx2:bribeSrv — an NPC bribing HER OWN maid (S.maid is not an NPC staff object, so stf2Bribe never runs for her) → her maid should answer with cnvBribeOpts too.
Scan scope: consort phase only; maid-phase receiver cards (cnvOrd / cnvBribe / cnvFrame / cnvScold, jagstf2 G10) are in C-AG's role-parity table.

## 5. HANDOVER (worker rolled over at ≈ 31 % context; START_CTX ≈ 4 %; the COORDINATOR opens the successor)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

Successor: worktree from origin/review/receiver-choice (sparse; `python3 dev/build/assemble.py` builds dev/index.html; `bash dev/site/build_site.sh` builds root). Steps:
1. Run `node dev/test/coop-e2e.js` once (not run here).
2. Close the open FORCED rows with jrcv (one core, no new frame): for each act, build ONE option list `rcvXOpts(asker, receiver)` with the 4 answers (BAL.rcv.kw; PROP may name them Nhận lời / Nhận lời cho có / Từ chối / Mách lẻo — keep slot order), every answer with gain + cost from BAL; NPC receiver = `rcvPick(t,a,opts,kind)`; NPC → HER = a saveable PEND card (like PEND.rcvHelp); her asking button shows `rcvWord` instead of odds. Order: Kết giao (ACT.ally.f + cx:ally), Lập phe cùng (j10 found), Xin vào phe (j10 askJoin), Ghé chơi (TW.call), Hòa giải (see:mediate), Tiến cử (cx3:staffUp), Nhờ ơn người quen (ACT.blockf), Hoàng thượng ngự giá (emp:visit — her side is an ORDER: Tiếp giá / Cáo bệnh like the summons).
3. Her own maid as a bribe receiver (act:bribe / cx2:bribeSrv when the target is HER palace): run cnvBribeOpts through stf2Bribe-style pick for S.maid (G10 shape).
4. When parallel-time #3 (session_01964izGM3cyQq9y9byHFKnV) lands the S.ordQ notice + expiry = từ chối, route PEND.rcvHelp (and the new cards) through it (asked them for the push API, no answer yet).
5. After each fix: `node dev/tools/receiver-choice-scan.js dev/index.html --md …` → trim role-parity-open.json role «receiver», refresh the BEFORE → AFTER rows in role-parity-table.md, `node dev/test/receiver-choice.test.js` (and role-parity.test.js), quickcheck, shots, then «SẴN SÀNG KIỂM <sha>» to D #3.
Touched files: dev/build/jrcv.js (new), assemble.py (module list), jbal2.js (BAL.rcv), jagacts3.js (helpAsk moved), j9.js (her Nhờ card word), j8.js (giveTo NPC receiver, giftin chk), jts.js (summons NPC answer, sumSuc), dev/tools/receiver-choice-scan.js (new), dev/tools/role-parity-table.md + role-parity-open.json (receiver rows), dev/test/receiver-choice.test.js + receiver-choice-shots.js (new), dev/test/role-parity.test.js (receiver rows filtered), index.html + sw.js (site build).

SHA: **review/receiver-choice b25ead7af** (pushed).


---
# WORKER #2 (opus, session_01964izGVAWwV6DabthJTS1n) — SẴN SÀNG KIỂM **88de83c5f** (review/receiver-choice)
START_CTX ≈ 4 % of 1M (get_session read 0 at start; own estimate) → rollover ≈ 29 %; finished at ≈ 30 % (only report + push left).
PRIORITY #1 CHECK: OD L1876 / 18-11 ~21:15Z / ~21:30Z | main: jroad rdHpW (L1876 weights), j42 cnvBribeOpts / jagstf2 stf2Bribe (bribe weights), j7+jvisit PEND.empnight (her Ngự giá card) — all REUSED | review/*: review/parallel-time f4eb517a5 (ptOrdAdd notice, one path), review/choice-value-audit (BAL.cv.decl) | claims: parallel-time #3 session_01964izGM3cyQq9y9byHFKnV, choice-value-audit #3 session_01964izCHK28tcRj4VBLZSQH.
Merged origin/main (22 commits; assemble.py module list conflict → main's list + jrcv.js).

## Fixes (whole group, ONE core jrcv.js — no new frame, kit dialog only)
ONE shape for every request / proposal: rcvYesO (slot 0 full: the act + asker quý +af[0], cost Sức BAL.rcv.prop.suc; slot 1 qua loa: the act lighter, +af[1]) · rcvNoO (slot 2 «Từ chối» = BAL.rcv.kw[2] for every card — the parallel-time deadline answer; both likings −BAL.ag.cx2.help.fail; a named gain: bạc kept / Danh +BAL.rcv.prop.danh) · rcvSabO (slot 3 Mách lẻo: Hoàng hậu quý +qAf; Đức −, asker oán +, asker Danh −). Nhờ giúp đỡ now uses rcvNoO / rcvSabO too (same texts).
RCVK[k] + rcvAsk(k, asker, receiver, x): NPC receiver = rcvPick (L1876 weights × mindPick, never argmax); HER = one saveable card PEND.rcvAsk {k,a,x}.
- Kết giao (j8 ACT.ally + cx:ally): the lễ BAL.actBac.ally travels to the receiver (Nhận lời / Nhận lễ giữ khoảng cách / Từ chối = lễ returned / Mách lẻo); her button shows rcvWord (no odds): ACT.xw in j6 rvButtons.
- Lập phe cùng (her j10 «lap», cx3:facFound, facMonth), Xin vào phe (askJoin → the leader answers; facMonth NPC join too), Mời vào phe (facInvite + the facMonth «Lời mời vào phe» notice that had no answer → now her 4-answer card). Her buttons show rcvWord instead of inviteOdds.
- Ghé chơi (TW call, jshelf): Tiếp đón nồng hậu / Tiếp qua loa / Từ chối / Tiếp rồi đem chuyện đi kể.
- Hòa giải (TW mediate → see:mediate): Nghe lời bỏ qua / Nguôi một nửa / Từ chối / Mách lẻo.
- Nhờ ơn người quen (jecon ACT.blockf): the acquaintance answers; the plot rcvBlockGo stays in jecon (qua loa = odds − BAL.selfMinus).
- Ngự giá (emp:visit): an NPC consort answers with HER card's roads (Thắp đèn / Phô tài BAL.visit.show / Khuyên ngài BAL.visit.adviseDuc/adviseSung).
- Mua chuộc cung nữ (j8 ACT.bribe, G10): the target's maid — HER OWN maid too — chooses take / tell / quiet (cnvBribeOpts ids, stf2Bribe weights); «quiet» = no bạc, no evidence.
- Summoned NPC «Cáo bệnh» also Sức BAL.cv.decl.suc (choice-value-audit's key, guarded until it lands).
- Notice: rcvCard → parallel-time ptOrdAdd (S.ordQ + 信, answered when her act ends, expiry = «Từ chối» with its cost) when present, else a queued dialog. parallel-time #3 confirmed the API and changed its wording for non-order pids (f4eb517a5).
Numbers: BAL.rcv.prop {suc:4, danh:1}; BAL.rcv.kw[1] = «Giúp qua loa» (L1876 words, same as j42 cnvOrdOpts).

## Scan / table
receiver-choice-scan.js: servant receivers (bribe, bribeSrv, bribel: her side = her servant's pick) + third-party receiver probe (blockf: she as the acquaintance). AFTER: rows 82 · SAME 12 · OK 67 · FORCED 3. role-parity-table.md § RECEIVER CHOICE rows refreshed (BEFORE → AFTER). role-parity-open.json role «receiver»: 12 → 3: ag:cx3:invite2 + act:bribel (parallel-time send buttons, theirs) and ag:cx3:staffUp Tiến cử (written reason: request to Nội vụ phủ, an office; recommend() is the same for her and every NPC; the servant only gains — law 3).

## Gates (88de83c5f)
- receiver-choice.test.js ALL PASS (now 13 rows SAME; every RCVK card: 4 answers, «Từ chối» slot, gain on every answer + cost on yes / no / mách, no %; NPC draws all 4 for ally / facFound / facJoin / facInvite / call / mediate / blockf; old-save rcvAsk round trip; own maid take/tell/quiet; Ngự giá go/show/adv).
- coop-e2e.js 63/63 PASS (co-op first). quickcheck: QUICKCHECK PASS · core gates PASS (G1 guard + bind fixed on the way) · coop one-world probe PASS · open 1411 ms · old save ok · perf render 200/204, tab 413/421.
- role-parity.test.js: 2 FAIL — the SAME 2 FAIL on the merge base faff20e5e before my change (random probe gaps + talkGossip promotion) → C-AG's, not mine.
- Shots Fold 755x1000@2 + iPad 1180x820@2: fold/ipad-rcv-{help,ally,call}.png at /home/user/wt/rc-shots (not in git; `node dev/test/receiver-choice-shots.js <dir>`). Kit dialog; iPad two-column answers, Fold long rows.
Touched: dev/build/jrcv.js, jbal2.js, j8.js, j6.js, j10.js, j17.js, jagacts3.js, jagacts2.js, jshelf.js, jtwoway.js, jecon.js, jts.js, assemble.py; dev/tools/receiver-choice-scan.js, role-parity-table.md, role-parity-open.json; dev/test/receiver-choice.test.js, receiver-choice-shots.js; index.html, sw.js.
Note for review: L1876 «mách lẻo» is drawn often for NPC receivers (~25–30 %, the BAL.road.hp weights as already approved for Nhờ giúp đỡ) — tunable via BAL.rcv.k.

---
# ROUND 3 — RECEIVER-CHOICE #3 fixer (opus, session_01964izGEZSk3xNzS4zDqJdA) — review FAIL 6 @88de83c5f
START_CTX ≈ 4 % of 1M (get_session read 0 at start; own estimate) → rollover ≈ 29 %, ceiling 60 %.
PRIORITY #1 CHECK ('receiver choice'): OD L1876 / 18-11 ~20:35Z / ~21:15Z / ~21:30Z read verbatim | main: BAL.road.hp (kw, half), jagstf2 stf2Bribe / stf2Ord, j42 cnvBribeOpts / cnvOrdOpts, jaudit X.f / T.f (the LIVE xinhh / trinhhh executors), j29 DIRTY runAct order, jration lxBorrowCard / lxBegCard (role-parity r2, now live) — all REUSED | review/*: review/receiver-choice-rv 1465d150d (base), review/parallel-time f4eb517a5 (jptime not touched; #4 told) | claims: D row (this job), PARALLEL-TIME #4 session_01964izDt9nqzWNAsQTmUyp4.

Branch **review/receiver-choice** (from 1465d150d; final-merged origin/main 40d05b76 = role-parity r3 live).

## The 6 items
1. **Laws 2/3 — slot-1 «qua loa» is never free** (whole group, every card through rcvYesO + Nhờ giúp đỡ): weaker result (× BAL.rcv.help.half) + a sure cost Sức − prop.suc × help.half + the risk = the L1876 «qua loa» minus BAL.road.hp.half read as the chance the asker sees through it (rcvSeen: asker's liking − help.fail, as an open refusal, AND oán + road.hp.sab.oan — worse than refusing openly). Shown on her card in words («bị nhìn thấu (khả năng thấp): …», chanceW), the same roll for an NPC. Kết giao slot 1 = «Nhận nửa lễ, giữ khoảng cách» (half the lễ goes back). «Nhận cho có»: the text-only cost is gone; the real cost is Sức + the risk. Nhờ ơn người quen qua loa = odds − BAL.road.hp.half (was BAL.selfMinus).
   Value table (receiver, Kết giao, lễ 30): full = +30 lượng, thiện cảm +25, quý +8, Sức −4 · qua loa = +15 lượng, quý +3, Sức −2, khả năng thấp: quý −F & oán +6 · từ chối = 0 lượng, both likings −F, Danh +1 · mách = +30 lượng, Hoàng hậu quý +5, Đức −3, asker oán +6.
2. **bribel + invite2 not forced.** bribel: the target's maid answers through the SAME pick as Mua chuộc (rcvMaidBribe, pay 0); her trusted maid is the ORDERED one (j29 DIRTY + DIRTY_SENT → stf2Ord obey / refuse / tell, like every sent servant; laydo / laydol joined the same group). invite2: RCVK.invite (Nhận lời, sang chơi / Ghé qua cho có / Từ chối / Mách lẻo): an NPC host's invitation lands as HER card (p3InvLand → rcvAsk → rcvCard → parallel-time ptOrdAdd when present); an NPC guest picks (rcvInviteGo); her own «Mời đến cung ta» (j21) → the NPC guest answers the same way, her button shows the willingness word (rcvWord). jptime NOT edited: PARALLEL-TIME #4 asked (send_message) to swap its ptReg("invite") `roll(a.a.o)` for `rcvInviteGo(S,v)` (guarded).
3. **Law 1 — she as the Hoàng hậu judges.** «Xin Hoàng hậu giáng» / «Trình Hoàng hậu» — the LIVE executors are jaudit X.f / T.f (j30 / j78 versions are overridden) → jrcv rcvJudge: queenP() === S → her card PEND.rcvJudge (saveable): Nhận lễ, tâu xin giáng (lễ + / Đức − judge.duc, the demoted one's oán + judge.oan) · Gạt đi, trả lễ (Danh + prop.danh) / Xét tội theo chứng cứ · Bác chứng cứ. An NPC queen answers with the SAME options, yes at the odds the asker's card shows (rcvOddsPick = roll at the shown odds: the shown-odds one path, no mindPick slip on a shown number). Same group, new on main: «Xin son phấn» (cx4 rougeBeg, kind hh) → RCVJ.rougeBeg; «Mượn son phấn» NPC lender → rcvOddsPick between HER card's two answers. NPC-only seats (listed, reason in the scan): trinhth (Thái hậu), takeaway (Hoàng thượng), cx4 man* (the man).
4. **Scan.** No hand list may send an unlisted act to DONE: every key of the live act tables (TW / ACT / AGRUN: 267) is classified in KINDS (REQ / PROP / ORDER / JUDGE / GIFT / COVERT / DONE / SELF / STAFF); an unclassified key = kind NEW = a gap, and the test checks all 267 (reached or not). Probes added: JUDGE (she as the Hoàng hậu, an NPC queen, NPC↔NPC) and OWN-SERVANT (srv:<act>: every dirty act's ordered servant through runAct, her servant and an NPC's). invite2 answers at its landing (LAND hook). Mutations: rcvPick = O[0] → 25 FAIL; invite guest back to a plain roll + a planted unclassified act → 2 FAIL (NEW:ag:cx3:zzPlant, invite2 not SAME). The new check caught main's 16 new cx4 acts on the merge.
5. **One core.** jagstf2 stf2BribeW = the ONE bribe weight rule (incl. stf2Tr), used by stf2Bribe and rcvMaidBribe; rcvMaidBribe applies cnvBribeOpts(maid, briber, master, pay) itself (take: the pay goes to the maid, she becomes the briber's tai mắt · tell: Chủ tin + BAL.coopBribe.tin, the master BAL.ag.ev.one chứng cứ, liking − ev.rel). j8 bribe: typed steal 30 / loyalF / loyalF_2 / evF_4 gone (AOUT text follows). BAL.rcv.kw deleted → rcvKw reads BAL.road.hp.kw (full / half / no / lk). Typed g/2, m/2 → × BAL.rcv.help.half; «bớt ghen 10» → BAL.rcv.prop.ghen; +25 → BAL.rcv.chkSee (her giftin card j8 reads it too). Mách lẻo: the asker's Danh − is printed as the asker's («… mang tiếng: Danh −2»), not under her «mất».
6. **role-parity overlap gone**: role-parity r2/r3 is live (origin/main 40d05b76 contains d6c2dc17); merged → `git diff origin/main HEAD` holds no role-parity file (only jrcv + the receiver wiring). role-parity.test on this head: see Gates.

## Found, NOT fixed (new on main via role-parity r2 cx4, owner C-AG; not reached by the probe, code reading)
- «Xin đồng minh» (j83 illBuy "ally", NPC cx4:illAlly): the ally's forbidden item is taken without her answer when SHE is the ally (v.inv.splice) — a FORCED receiver; her asking card says «có ngay».
- «Sai cung nữ thân tín mua lén ngoài cung» (j83 "maid", cx4:illMaid): her / the NPC's trusted maid is ordered with no stf2Ord answer (not in DIRTY).
- Her «Mượn son phấn» lender card (jration lxAskHer) has 2 answers (not the L1876 4) and is skipped under window.__bot; not a saveable PEND.
- Her card: every «qua loa» answer (and Nhờ ơn's «có thể bị lộ») now carries the kit chip «có rủi ro» (was «an toàn»: the chip hid the risk); kit field `risk`, no new part.

## Pending (not mine to close)
- PARALLEL-TIME #4 agreed (00:06Z) and made the guarded one-line swap in jptime ptReg("invite") → `rcvInviteGo(S,v)` (in its next push). Its §18 sends NPC sent-servant deeds through S.away and calls the original runAct at the due khắc (so the j29 / jrcv answers run then); §20 makes the NPC illBuy maid route a send. Expected conflicts when the second branch lands: assemble.py, j21, j29, jbal2 — the second to land resolves.
- After parallel-time is fixed: re-check rcvHelp / rcvAsk / rcvJudge notices in MAIN's jerr «tin» panel (PTIME.orders / ordWhen / answer). Not done: parallel-time not landed.

## Gates (head 28ebffad8 = 9da6be994 + build line; final merge of origin/main 9a1d6922)
- receiver-choice.test.js: ALL PASS (now also: slot 1 Sức + «bị nhìn thấu» on every card; NPC qua loa Sức every time, seen sometimes; judge cards for her as the Hoàng hậu + old-save round trip; NPC queen yes / no; invite card; bribel maid pick; own maid take / tell = cnvBribeOpts numbers; rougeBeg card; rougeBorrow NPC lender; one core (no BAL.rcv.kw, shared stf2BribeW); all 267 live act keys classified).
- Mutations: rcvPick = O[0] → 25 FAIL; invite guest forced + a planted unclassified act → 2 FAIL.
- Scan: rows 95–100 (probe draw) · SAME 34–35 · OK 61–65 · gaps 0 · unclassified 0 / 267. Table: dev/tools/role-parity-table.md § RECEIVER CHOICE rows (refreshed, BEFORE → AFTER).
- role-parity.test.js on the merged head: ALL PASS (0 FAIL).
- coop-e2e.js: 63/63 PASS. Core gates PASS (one-core-guard, rules-one-source, kit-conform, coop one-world probe).
- quickcheck --runs 6 (on 72a2e494, before the last main merge): QUICKCHECK PASS · open 1282 ms · old save ok · perf new/live render 157/169, tab 309/324, buổi 949/920 ms. Re-run on the final head: QUICKCHECK PASS · open 1474 ms · old save ok · perf new/live render 198/217, tab 327/387, buổi 1163/1044 ms (noisy box; run 1 949/920) · core gates PASS.
- Shots Fold 755x1000@2 + iPad 1180x820@2 (receiver-choice-shots.js: help / ally / call / judge / invite), looked at: kit VIỆC dialog, Fold long rows, iPad two columns, no cut text, «có rủi ro» chip on qua loa. Kept outside git (scratch), not uploaded.
Touched: jrcv.js, jbal2.js (BAL.rcv: kw removed; chkSee, prop.ghen, judge), jagstf2.js (stf2BribeW), j8.js (bribe, giftin chkSee), jecon.js (bribel), j29.js (DIRTY + DIRTY_SENT), j21.js (her invite), jagacts3.js (p3InvLand), jaudit.js (xinhh / trinhhh → rcvJudge), jration.js (rougeBeg / rougeBorrow), j17.js (AOUT.bribe); dev/tools/receiver-choice-scan.js, role-parity-table.md; dev/test/receiver-choice.test.js, receiver-choice-shots.js; index.html, sw.js.
Context at hand-in ≈ 39 % (START ≈ 4 %, line 29 %): past the line with only push + report left (allowed); no further work in this session — any re-fix needs a fresh fixer.

**SẴN SÀNG KIỂM 28ebffad8** (review/receiver-choice).

---
# ROUND 4 — RECEIVER-CHOICE #4 fixer (opus, session_01964izCDsA5LcnU3eN5Ucsy) — re-check #2 FAIL 6 @28ebffad8
START_CTX ≈ 5 % of 1M (get_session read 0; own estimate) → rollover ≈ 30 %, ceiling 60 %. Finished at ≈ 22 %.
PRIORITY #1 CHECK ('receiver choice'): OD L1876 / ~21:15Z read (brief chain) | main bb8e8ec9: j83 IROUTE / illBuy / illAllies, jration lxBorrowCard / lxAskHer, jagacts4 cx4:ill* / rouge*, jagstf2 stf2Ord, j29 DIRTY — all REUSED | review/*: review/stage-here 367a1ae0 (jnotice kitNotice API, guarded typeof), review/parallel-time 3efd6e46 (not touched; lands first) | claims: D row (this job).

Branch **review/receiver-choice**, head **6be968a2** (final-merged origin/main bb8e8ec9; assemble.py = main's list + jrcv.js; index.html / sw.js rebuilt).

## The 6 items
1. **Flaky test → deterministic.** The rougeBorrow check now runs the asker's card `lxBorrowCard(a, ln).run()` on a SEEDED lender (300 draws), not the AG deed that picked its own lender. receiver-choice.test **×5: ALL PASS** (5/5, plus 5/5 again on the final head).
2. **illMaid** (j83 IROUTE.maid / cx4:illMaid): illBuy "maid" asks the trusted maid through `stf2Ord(p, p.maid, null, "illMaid")` (the j42 cnvOrdOpts card — the same pick as bribel / laydo / laydol), her maid and an NPC's alike. Refuse / tell = nothing bought; her pre-paid bạc comes back.
3. **illAlly** (j83 illBuy "ally" / cx4:illAlly): new **RCVK.illAlly** (x = item key): «Đưa … cho nàng» (holder holds evIllBuy chứng cứ) · «Nhường lại, lấy chút bạc» (item price × help.half, + Sức and the seen-through risk) · «Từ chối» · «Mách lẻo» (the Hoàng hậu holds ev.one chứng cứ of the asker). `illAllies` now includes her (`v===S||v.alive`), so an NPC can ask HER → her saveable card. Her asking card shows the holder's willingness word (rcvWord) instead of «có ngay».
4. **lxAskHer** → **RCVK.rougeBorrow** (x = the part): «Chia cho nàng một nửa» · «Chia chút ít cho có» (lượt × half × half) · «Từ chối» · «Mách lẻo». Her lender card = PEND.rcvAsk through rcvCard (saveable, the notice path); an NPC lender picks from the same list (rcvPick). lxAskHer is kept only as a one-line alias. Her «Mượn son phấn» button shows rcvWord (no odds; od stays the NPC planner's worth). BAL.ration.npc.askAff removed (the asker's liking is BAL.rcv.help.af, one core).
5. **Scan: no silent pass.** A REQ / PROP / ORDER / ORDER_SRV / JUDGE key that the probe never reaches → verdict **UNREACHED** = a gap, and a self-run no longer hides such a key. New probes: ORDER_SRV (illMaid: the ordered maid → stf2Ord), SELF-PICKED holder (illAlly) and lender (rougeBorrow, N→P / P→N / N↔N), precondition probes (tw:mediate inside the agent tick, cx3:facJoin with a leader, cx4:rougeBeg in the queen seat). The stricter check surfaced 5 more: facJoin / mediate / rougeBeg → now SAME through the new probes; **tw:visit** «Thăm lúc ốm mệt» was mis-read as the Emperor's visit ORDER → GIFT (the sick one only gains); **cx2:doctor** «Mời làm thái y tâm phúc» → GIFT (a paid office service, the thái y is the court seat S.court.ty, not a consort with her own answer list; her own button is the same sure deed — same ruling as staffUp). Reviewer: if you want the thái y to answer, that needs a living thái y person (law 6b) → parking lot. Test also checks with a synthetic input: an unreached REQ / ORDER_SRV key = 2 UNREACHED gaps.
6. **Law 2, Kết giao** (BAL.rcv.ally {danh:3} + BAL.eff.j8.f_2): to kết giao is to take her side.
   | answer | gain | cost |
   |---|---|---|
   | Nhận lời | lễ 30, thiện cảm +25, asker quý +8, ghen −10 | Sức −4, kết bè Danh −3, the asker's worst foe (rcvFoe = most hostile) quý the receiver −25 |
   | Nhận nửa lễ | lễ 15, quý +3 | Sức −2, Danh −2, foe −13, seen-through risk |
   | Từ chối | Danh +3, the foe quý the receiver +13 | lễ returned, both likings −3 |
   | Mách lẻo | lễ 30, Hoàng hậu quý +5 | Đức −3, asker oán +6, asker Danh −2 |
   Same numbers for an NPC receiver (test: Danh −3 / +3 exact, foe −25 exact, +13 scaled only by the foe's own nết / mood, one rule both ways).

Also: **ONE NOTICE SYSTEM** — rcvCard: ptOrdAdd when parallel-time is on (only that notice); else when `window.kitNotice` exists, her card waits as ONE notice (id rcv:n, sticky, option row «Trả lời» opens the card), kept saveable in **S.rcvPend** and re-raised after a load; else the queued dialog (today's main has no kitNotice). Tested with a stub kitNotice: 1 notice, 0 queued dialogs, opens a 4-answer card, S.rcvPend emptied. **Judge shot staging** fixed (no NPC Hoàng hậu as asker / accused). Mutation: removing the illAlly rcvAsk + illMaid stf2Ord → 5 FAIL.

## Gates (head 6be968a2)
- receiver-choice.test ×5: ALL PASS ×5.
- role-parity.test: ALL PASS.
- coop-e2e: 63/63 PASS.
- quickcheck --runs 6 (vs live bb8e8ec9): QUICKCHECK PASS · CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world) · TIME-SPILL GUARD PASS · open 1627 ms · old save ok · perf new/live median render 198/172, tab 325/314, buổi 1072/964 ms, tasks>200 ms 18/17 (noisy box).
- evtruth-scan: unchanged 12 (no new unchecked evidence line; evok markers on the new evA lines).
- Scan: rows 104–110 (probe draw) · SAME 41 · OK 63–67 · gaps 0 · unclassified 0 / 267. Table: dev/tools/role-parity-table.md § RECEIVER CHOICE (round 3 AFTER → round 4).
- Shots Fold 755x1000@2 + iPad 1180x820@2 (receiver-choice-shots.js: help / ally / call / judge / invite / illally / lend), looked at 3×: kit VIỆC dialog, kit option rows, «có rủi ro» on qua loa, TỐN Sức, no cut text; judge shot accuses a Quý phi, not «Hoàng hậu». Kept in scratch outside git, not uploaded.
- Probe errors srv:kpoison / kframe / pond / ksab / takeaway (null .name / .heir) are the own-servant probe on acts without a usable target in this world (in the probe only, no page error).
Landing: parallel-time first; after it is on main, re-merge (assemble.py / j21 / j29 / jbal2 + jptime invite → rcvInviteGo) and re-run every gate.
Touched: jrcv.js (rcvCard kitNotice + S.rcvPend, RCVK.ally law 2 + rcvFoe, RCVK.illAlly, RCVK.rougeBorrow), jbal2.js (BAL.rcv.ally), j83.js (illAllies, illBuy maid / ally, her card words), jration.js (lxGive count, lxBorrowCard, lxAskHer alias, askAff gone), dev/tools/receiver-choice-scan.js, role-parity-table.md, dev/test/receiver-choice.test.js, receiver-choice-shots.js, assemble.py (merge), index.html, sw.js.

**SẴN SÀNG KIỂM 6be968a2** (review/receiver-choice).
