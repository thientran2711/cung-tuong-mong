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
