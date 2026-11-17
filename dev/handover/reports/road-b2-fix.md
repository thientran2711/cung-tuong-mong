# road-b2-fix — fixes for review road-b2-r1 (nc/bd, td, ch roads .5–.11 + rare)
Worker: road-b2-fix (opus, story roads), coordinator Foreman B s8. Two in-session helpers (td, ch), one per origin family; nc/bd, engine, scan, tests and this report by the worker.
Branch: `review/road-b2-fix` from `review/road-b2-r1` 57c6c6d0, merged with origin/main 08725411 (assemble list = main + jroad/jrd_*). Head: bda971a2 (fixes 0a173074 nc/bd+ch, 58a1f572 td, 75539e2d tests/site; merge origin/main 08725411 c1c9ef7f + site rebuild bda971a2).
Read: PREAMBLE, START_CORE, START_WORKER, topic story-roads, review-road-b2-r1 (items 1–8), review-road-b1-r1, road-history (rules 1–11 + B2 verdicts).

## Engine / shared
- `jroad.js`: `RD_FL(k,v)` road-long flag (S.st.f14.fb, already cleared with the road; same store as B1's CN_FL / MUOI_FL on review/road-b3-fix-r1 → when B1/B3 land, those two can become aliases of RD_FL). Used to wire dead flags across chapters (nc_vuong loser/bought/crush, td_ke.deal, td_tha.bribe/ruong, td_song.proof, ch_co.hat).
- `dev/measure/road-option-scan.js`: taken from review/road-b3-fix-r1 401ae165 (check D included, not forked) + new checks:
  (E) SAME e PAIR in an x beat: the cheaper/equal-cost option must not have base odds ≥ the costlier one (review item 2);
  (F) FREE FIXED WIN/MID WITH A GAIN: any sure fixed e that is not a loss, no cost, w>0 (review item 1; a fixed LOSS is its own cost);
  (C) banned words + «vấn đề, trang trí, tỷ lệ, chứng minh, thông dịch».
- `dev/test/road-saves.js`: env `ROADS=nc,bd,td,ch` picks the full-road origins (default unchanged tt,dtq,muoi,cn).
- `jbal2.js`: `BAL.road.ch_bi.conf` (months of cấm túc on {v}, ch_bi .6 c2, printed with kitNumVi).

## Scan before → after (node dev/measure/road-option-scan.js dev/build/jrd_<f>.js)
| list | nc (+bd) before | after | td before | after | ch before | after |
|---|---|---|---|---|---|---|
| FREE SURE MID with gain (D) | 30 | 0 | 0 | 0 | 1 | 0 |
| SAME e PAIR (E, new) | 2 | 0 | 2 | 0 | 4 | 0 |
| FREE FIXED WIN/MID with gain (F, new) | 30 | 0 | 0 | 0 | 1 | 0 |
| VANPHONG incl. new modern words | 5 | 0 | 0 | 0 | 0 | 0 |
| every other list (free gain, text-only, digits, double Lợi thế, inverted, dominance, bold≤safe, unread, fn digits, RARE LOW) | 0 | 0 | 0 | 0 | 0 | 0 |
Other files on this branch (B1 copies, not mine): muoi_tuoc_9.c1 «Chứng minh lễ là lễ mừng thọ» hits the new word list → for B1 (check its current version on review/road-b3-fix-r1).

## Items — before → after
1. Free fixed-mid climax options with a gain: nc 15 (×2 with bd aliases) each got a real cost by meaning (danh −2/−3, tamco −2, sung −2/−3): nc_su .5/.7/.9/.10/.11, nc_tuc .5 x1/x2, .6 x1/x2, .9 x1/x2, nc_vuong .5/.8/.9/.10; ch_bi .9 x1 → danh −2.
2. Same-e-pair dominance (all 8 scan hits): ch_benh .10 x2 «Đề nghị đặt ấn…» free 45+duc/5 → «Xin Hoàng thượng cho đặt ấn ở Phụng Tiên điện» danh −3, 30+duc/5; ch_co .5 x1, ch_benh .8 x1, .11 x2 rebased; nc_gian .11 x1 «Thưa: thiếp là người của Đại Hy» free 45 → danh −3, 35; td_song .9 x1 40→25, .11 x1 35→25.
3. History pass 3: (a) nc_gian .7 x1 rt/rf + E.win «Cấm quân» → «Người/Thái giám Nội vụ phủ»; (b) ch_benh lương y họ Tôn comes only by the Emperor's chỉ (.5 g/s1/s2/c4 «Xin Hoàng thượng xuống chỉ…/chuẩn cho…», «cầm chỉ vào bằng cửa Tây Hoa»); (c) td_an .8: burning stays a rule; success lines now say what the code does (s1 «ai xin rút sổ trước lò, trẫm sẽ xét», s2 ledger placed on the cart by the aisle), t1 {v}'s refusal/false promise really costs x1 −10 (A.f.vb).
4. Officials' wives (rule 11), whole td family: td_tha .5 c4, .6 c1, .8 s2, .9 c3, .10 c3, .11 c3, td_ke .8 s1/s2 → wife «vào cung thỉnh an Hoàng hậu/Thái hậu» (TDVAO, guarded; fallback «theo lệ mệnh phụ vào cung ngày sóc vọng») and stops at her palace on the way. Same family in nc: nc_vuong .6/.9 «Nhờ phu nhân Thượng thư Lễ bộ…» → greets Thái hậu/Hoàng hậu (NC_MP), option hidden when both seats are empty.
5. Continuity: ch_benh lương y after .5 lose → .7 opens with the Emperor's chỉ recalling him (CHR_TON), .5 x2 mid rt fixed; ch_bi .11 burnt/returned letter → A.f.lgone hides «Giữ lá thư…», E.mid variant; ch_co beads only when kept at .9 s1 (RD_FL ch_co.hat), RD97L option renamed; ch_co .10 E.mid reads f:"cn"; ch_bi .7 t1 CHR_LAM variant; td_song .11 E.win/t1 by .9/.10 endings, .9 t1/.10 s1/t1/x1/E.win by .8 (TDSW: no sword after .8 mid/lose); td_ke .10 c1 mute {foed} writes after .6 lose; td_an .11 E.lose after .10 win («Tam ty đã tâu án oan, Hoàng thượng gác»); td_ke .11 x1 rf/E.lose after .10 win; td_ke_11 RD97L no officials «nghe theo phi tần»; td_tha ruộng returned once (RD_FL td_tha.ruong) across .6/.8/.11; td_tha dead {foe} variants (.5 s2 guard + new s5, .7 c2, .9); nc_su .5 + nc_tuc .5 new r97 beats (s6 «Sứ đoàn đến chợ Vĩnh Hòa», s5 «Áo lông công và lễ mồng Một») with the old s1 guarded; nc_gian .7 s2, nc_tuc .6 s2, nc_vuong .8 s2 text by the previous ending; nc_vuong .11 g by .10 «dẹp hẳn» (RD_FL nc_vuong.crush: «dư đảng»). Extra: .5 r97 checked in every B2 road (td_ke/td_song/td_an, ch_benh/ch_bi variants added; ch_co/ch_ho fit).
6. Promised effects: ch_bi .6 c2 really confines {v} (BAL.road.ch_bi.conf); nc_tuc .7 s2 rf no refund promised; hidden l:{th:-3}: nc 5 → danh/sung matching the hint, nc_tuc .5 c1 hint names the Thái hậu, td 3 + ch 4 hints now name her; dead flags wired: nc_vuong loser (.5 x1 +5, .10/.11 −10), bought (.10/.11 −10), warn (.6 x1 +10), ally (.8 x1 +10); td_ke deal (.6 t1/.10 c1 → .11 c1 «Nuốt lời…» variant), td_tha .8 bribe (→ .10 s/x1 −10), td_tha .8 E.win no «rương bạc» after returning it; td dead flags with promising wx wired (+5/+10). Pardon promises → «xin Hoàng thượng khoan cho…» (td_ke .6/.10/.11, td_tha .10 c3).
7. History rules 1/2/3: td_an .10 hồi tị now only for the related judge, {foed} stands as the accused; td_an .10 c1–c3/s2/x1 petitions go through a Ngự sử or the Emperor; Tam ty gloss in td_an .10/.11, td_ke .11 s1, td_tha .9 x1/x2; td_tha .11 s1 Đại Lý tự asks through the Emperor; nc_su .5 s1/s4/s6/c1 (Emperor hands the nghi chú, Emperor's tra lệ, «Hoàng thượng ghi nhớ»), .6 c1 «Xin Hoàng thượng giao Lễ bộ xét», .11 x1 she no longer edits the quốc thư (the Emperor asks her a line; options «Xin ngài thêm…/viết lời ấm hơn/xin để Lễ bộ định»), .11 s1 «thư nhà gửi kèm» (+ RD97L path); nc_vuong .6 «Kể với Hoàng thượng sản vật…», «Thưa với Hoàng thượng: Binh bộ cầu công riêng / đổi đất lấy chợ biên», .9 «Xin Hoàng thượng cho đưa hắn đến Binh bộ khai»; biểu (nc_tuc .8, nc_vuong .9) → «dâng riêng lên Hoàng thượng», read in Ngự thư phòng, Emperor asks the Ngự sử himself; nc_tuc .8 sớ read to her, not handed; ch_benh .5 g «Ai mang tội là Hoàng thượng phê…»; ch_ho .9 x1/rf/E.lose «Hoàng thượng phê…» (typed «một năm» dropped); ch outer-office acts via family (ch_co .9 c1, ch_bi .5 t1, .10 s2/c1, ch_benh .10 s3, ch_bi .11 c1 + path).
8. Wording: jrd_nc «vấn đề/trang trí/tỷ lệ/chứng minh/thông dịch» → «điều bất ổn / cho đẹp gian phòng / giá định sẵn / tỏ bày / thông sự»; td_ke .11 heading → «Nhà {v} lung lay»; «chữ Hán» → «chữ Đại Hy»; ch «trách nhiệm, lợi thế, căng thẳng, chi tiết, an toàn» replaced. Bắc Địch facts: new land tokens {canh} {laq} {nden} (canh chua/lá rừng/thả đèn hoa trên nước vs canh sữa dê/cỏ thảo nguyên/thắp đèn bơ quanh chùa), «ải phía nam» → «ải giáp {land}», «bùa ngải người man» → «người ngoại tộc», lantern options neutral (+ RD97L path).

## Tests (build of this branch, own utf-8 http server)
| test | result |
|---|---|
| road-option-scan (new checks E/F + words) on jrd_nc / jrd_td / jrd_ch | 0 on every list (table above); all 16 B2 RD97L finales ok |
| road-rare.js, 16 B2 roads | ALL PASS (83 checks, 0 page errors) — run on 58a1f572 and again after the main merge (bda971a2) |
| road-full.js, 1 life each: nc_su, bd_tuc, td_tha, ch_benh (on 58a1f572) | 10/10 PASS each (chapters 4..11 = the road in order, 12–14 endgame, finale tag from .11: «Cầu nối hai triều», «Mãi là người ngoài», «Kết nghĩa tỷ muội», «Nối người của cô mẫu»); 0 page errors. First nc_su run crashed («Target crashed», 3 bots on a 15 GB box), rerun alone PASS |
| road-saves.js @1180x820, ROADS=nc,bd,td,ch, main = live site | 7/7 PASS (main save loads + plays, phase-1 save, mid-road saves keep nc_vuong/bd_hoang/td_song/ch_ho + cast + plan, 0 page errors) |
| coop-e2e.js (Fold host + iPad guest, live Worker) | 59/59 (incl. solo + old save, 0 page errors) |
| one-core-guard.js (NEW gate, from review/one-core-land-r1; not on main yet, needs that branch's jbal ONE CORE block — measured with it overlaid, not committed) | **FAIL for the road files**: jrd_nc 1349, jrd_td 1416, jrd_ch 1510 typed inline numbers (fx = option c/w/l stats, cmp), jrd_tt 1274 (B1). Not fixed here — see Handover |

## QUESTIONS (history expert, OD:L1327 — not decided by me)
1. Envoy/kinsman meetings in her own palace behind a curtain with a Nội vụ phủ eunuch, by the Emperor's leave (nc_gian .8 c1/c2, .9 t1, .11 t1; nc_su .5 s2/s4/s5, .10 t1/c1 ({pa} in the ngự uyển); nc_tuc .10 c1, .11 s1; nc_vuong .10 s1, .11 s1 — RD97L path). Rule 8 says envoys only at an inner-palace gia lễ yến; these are framed as kin visits by leave (B2 doubt 1). Unchanged until the expert rules.
2. td TDVAO fallback when there is no Hoàng hậu and no Thái hậu: «theo lệ mệnh phụ vào cung ngày sóc vọng» — acceptable?
3. td_song after a .4 r97 (surname already restored by edict): .9 «Đổi tên» still plays as a soldier seeking his name; only .5 s1 bridges it (design call: a variant .9 or accept).

## Known limits / notes for the reviewer
- ch_benh: after a .5 lose the Emperor's recall of the physician is told at the .7 opening (no extra choice beat); his absence lasts .6 only.
- Flags still unread are mood flags whose wx promises nothing later (listed by the helpers: td_an .9 hard, td_ke .6 turn, td_song know/burn/wait/meet, td_tha watch/hate/mercy/vow/probe; nc court/hold/home/law/bridge/keep).
- Landing: this branch still carries the older B1 files from 57c6c6d0 (as the r1 review noted); take B1's files from its own PASS.

## Handover
Context at handover is past my rollover line (START + 25 %). Done: all 8 review items + the scan + tests above, pushed bda971a2.
OPEN (new gate from Foreman B s8, 23:24Z): one-core-guard.js must report 0 fails for jrd_nc/td/ch with no --allow-grow: every rule number
(option c/w/l stats, fx, cmp in odds/ifs) moves into BAL.road.* with the values unchanged, texts print the constant. ~4300 numbers in the
three files → a mechanical but large job. Reuse the BAL key pattern of worker road-onecore (review/road-onecore, report
dev/handover/reports/road-onecore.md — neither existed at 23:40Z). Steps for the successor: (1) wait for / read road-onecore's pattern;
(2) merge origin/main once it carries one-core-guard.js + baseline + jbal ONE CORE block; (3) convert jrd_nc/td/ch with a script, values
unchanged (verify by evaluating every option's c/w/l/o before vs after on a neutral life = identical); (4) re-run road-option-scan, road-rare,
road-saves (ROADS=nc,bd,td,ch), coop-e2e, one road-full per origin; (5) then SẴN SÀNG KIỂM. Worktree /home/user/wt/rb2fix kept for the
successor (sparse); utf-8 server script /home/user/wt/rb2fix-tmp/srv.py (python3 srv.py <port> <root>).

# SUCCESSOR (session_01N1tNP2boznW7SbhZfGfvpp, 11/17/2026) — ONE CORE gate + history doubts
START_CTX ≈ 3 % of the 1M window (estimate; context_usage read 0).
Head: **db5c49f4** on review/road-b2-fix. Commits: dbb7d526 (nc envoy meetings, rule 8) · d385cb48 (merge review/road-onecore ceb54d40) · 893e8166 (ONE CORE move) · 99df316e (merge origin/main 744b80e7 + chTh) · 03a12ce9 (site) · 6b308042 (merge review/road-onecore 6a1112d1: ch_co terms use "kd") · db5c49f4 (site rebuilt).

## ONE CORE (OD:L1267) — the road-onecore pattern, no second scheme
- Merged origin/review/road-onecore ceb54d40: `jbalroad.js` (assemble: right before jroad.js) holds ALL of BAL.road; the B2 keys that sat in jbal2.js
  (td_an, ncConf, ch_co, ch_benh, ch_bi incl. ch_bi.conf) moved there unchanged. `RD_FL` is now an alias of road-onecore's `rdFb` (same book S.st.f14.fb).
- `dev/measure/road-onecore-move.js` run on jrd_nc/td/ch (3 small tool fixes, same output for B1: skip `rdDef(b,…)` alias loops and `...SPREAD` members;
  odds patterns for `RD_FL("k")` (= "b" term), `RDQ.x(A)?y:n` ("q"), `RDQ.x(A)*k` ("k"); "-" allowed on "q").
  → BAL.road.fx: 84 chapters (nc 28 + its bd copies by the alias loop, td 28, ch 28), 961 odds as term lists, + `ch_hoD` (the four after-death ch_ho beats,
  CHHO_D fills them with rdFx("ch_hoD")).
- Hand pre-edits (exact same values): 6 plain-number odds in td → `()=>N`; nc_vuong .10/.11 and td_song .11 / td_tha .10 RD_FL terms → RDQ.ncvBL / RDQ.tdsProof;
  ch_co .7/.9/.11 Thái-hậu terms → RDQ.chcoTh / RDQ.chco9 with "kd" terms (divisors 8 / 6 in BAL.road.fx); ch_benh .10 `+(…?-10:0)` → `-(…?10:0)`.
- RD97L: the 12 B2 rare finales → `RD97L.push(rdRare({…}))`, numbers in BAL.road.rare (p, np, sc, c, fx, bar; ch_bi_11 also th); the condition texts print
  `RR(a).bar` (no typed «Danh từ 50» left).
- jrd_ch go amounts (Thái hậu / Hoàng hậu favour, ap67/fmt pairs, 31 keys) → BAL.road.chTh, read by `CHTH(key)`.
- Proof: `dev/measure/road-b2-same.js` (copy of road-onecore-same for nc/td/ch; OLD side loads jbalroad at the ref; random lives also vary S.thDead,
  origin nc/bd and the road flags): c/w/l/fx deep-equal, odds === on every trial.

| origin | chapters | c | w | l | odds fn | odds trials | E fx | differences |
|---|---|---|---|---|---|---|---|---|
| nc | 28 | 568 | 462 | 242 | 322 | 128800 | 84 | 0 |
| bd | 28 | 568 | 462 | 242 | 322 | 128800 | 84 | 0 |
| td | 28 | 620 | 461 | 258 | 325 | 127600 | 86 | 0 |
| ch | 28 | 718 | 583 | 240 | 334 | 133600 | 86 | 0 |
RD97L compared: 16, 0 differences. chTh: replaced by a script that asserts each ap67/fmt pair carries one value.

| gate (on top of origin/main 744b80e7) | before | after |
|---|---|---|
| one-core-guard.js, no --allow-grow: jrd_nc / jrd_td / jrd_ch typed rule numbers | 1349 / 1416 / 1510 | 0 / 0 / 0 → PASS, 0 fails (inlineNow 6674 ≤ baseline 6691) |
Not counted by the gate and left as road-onecore left them for B1: relation amounts inside go: (rdOan / rdRel / e67bien …), sc / k tiers.

## History doubts (road-history rules)
1. FIXED by rule 8 («a woman meets foreign envoys only at an inner-palace gia lễ audience»): every envoy / envoy-kinsman meeting in nc now happens
   «trong buổi gia lễ ở nội điện, cách một bức rèm, có thái giám đứng hầu» — nc_gian .8 c1 (option + note of the rule), .9 t1; nc_su .5 s2/s4/s5, .10 t1
   (gia lễ tiễn sứ); nc_tuc .10 c1, .11 s1 (+ option «Tiếp sứ thần già cách rèm…»); nc_vuong .10 s1, .11 s1 (option «Tiếp cả hai đoàn cùng lúc, cách rèm»,
   RD97L path prefix kept). bd copies follow (alias loop).
## QUESTIONS (not decided by the rules)
2. td TDVAO fallback when there is no Hoàng hậu and no Thái hậu: «theo lệ mệnh phụ vào cung ngày sóc vọng». Rule 11 assumes one of them; history
   expert / owner: acceptable, or should the wives then greet the consort who runs the harem?
3. td_song after a .4 r97 (surname already restored by edict): .9 «Đổi tên» still plays as a soldier seeking his name (only .5 s1 bridges it) —
   design call: a .9 variant, or accept.
Note: road-option-scan prints «td_tha_11 path names found nowhere on the road: Dâng tờ xin chỉ xét người có tội» (already so at bda971a2; the scan
still counts the road reachable: ok).

## Tests (build db5c49f4 unless noted; own utf-8 server, port by PID)
| test | result |
|---|---|
| one-core-guard.js (no --allow-grow), on origin/main 744b80e7 + road-onecore 6a1112d1 | PASS, 0 fails |
| road-b2-same.js vs 893e8166~ (pre-move) | SAME, 0 differences (table above) |
| road-option-scan jrd_nc / jrd_td / jrd_ch | 0 on every list; 16 RD97L finales ok |
| road-rare.js, 16 B2 roads | ALL PASS, 99 checks, 0 page errors (on 03a12ce9 and again on db5c49f4) |
| road-full.js 1 life: nc_su, bd_tuc, td_tha, ch_benh (03a12ce9) | 17/17 PASS; finales «Cầu nối hai triều», «Mãi là người ngoài», «Kết nghĩa tỷ muội», «Cô mẫu khỏe lại, trọng thưởng ngươi». First run crashed at td_tha («Target crashed», 2 browsers on the box) → td_tha + ch_benh rerun alone PASS |
| road-saves.js @1180x820, ROADS=nc,bd,td,ch, main = live site (03a12ce9) | 7/7 PASS (incl. main/old save loads + plays, mid-road nc_tuc/bd_tuc/td_tha/ch_benh) |
| coop-e2e.js (Fold host + iPad guest, live Worker; incl. solo + old save) | 59/59 PASS, 0 page errors |
Worktree /home/user/wt/rb2fix kept until the review verdict.
