# Two-way acts (owner law 16/11 s21) — audit + fix, review/two-way-acts

Law: dev/rules/topic/people-life.md [HANDOVER.md:L46] + [OD:L1386]. Base: origin/main 8f476f6f9. Worker START_CTX ≈ 4 %; stopped at ≈ 29 % (rollover), see §5.

## 1. AUDIT TABLE (from code; full per-site tables were produced by two read-only sweeps, condensed here)
Baseline for every row: the player pays KHẮC (doAct/placeHarms 2, talk 1, deck cardCost 1/2/4) and needs Sức ≥ 20 for can(2); NPCs pay 0 khắc
everywhere (they act on dice: SOC weekly 60 %, rivalsTurn want×4 %, rivalsBuoi, npcMonthly rolls). That is the agent loop's job (Foreman C AG1–AG6).

### 1a. NPC deeds vs the player (cost / odds / availability) — status after this branch
| # | site | deed | gap before | status |
|---|---|---|---|---|
| 1 | jecon.js:137 | scheme bạc price ×(1+k·rank gap+g·guards) | NPC k .06/g .04 vs player .15/.10 (NPC discount) | FIXED one multiplier (BAL.schemeRk/schemeGuard) |
| 2 | j8.js:98 | Tố giác thành → bestow | NPC 100 %, player 40 % | FIXED BAL.tw.accBestow both |
| 3 | j78.js:136 | Trình Thái hậu odds +th/5 | NPC thFav 0 | FIXED NPC uses own v.th |
| 4 | j28 SOC.help | Giúp đỡ | NPC free +6 vs bạc 20 → +10, oán −5 | FIXED TW.help, BAL.tw.help |
| 5 | j28 SOC.apologise | Tạ lỗi | NPC free oán −8 vs Danh −1 → oán −15 | FIXED TW.apol |
| 6 | j28 SOC.serveTH + j8:381 | Thỉnh an Thái hậu | NPC free th+2 / th+4 vs Sức −5, odA75, th+8 danh+2 đức+1 / th−2 | FIXED TW.thTH |
| 7 | j8:382 | Thỉnh an Hoàng hậu | NPC free hh+4 vs Sức −5, odA70, hh+4 danh+2 đức+1, HH ghen −5 | FIXED TW.thHH |
| 8 | j28 SOC.pray | Cầu tự | NPC free sure pray=1 vs bạc 10, odA50, pray=2 | FIXED TW.pray |
| 9 | j28 SOC.bribeksp | Đút lót lật thẻ | NPC bạc 30 → Sủng +2 direct vs tablet 2 tuần | FIXED TW.ksp (tablet; nightCh already reads p.tablet; NPC tablet now decays weekly j3) |
| 10 | j28 SOC.provoke | Khiêu khích | NPC Danh −1, oán+6, ghen+3 vs player Danh +1, rel −15, ghen +10 | FIXED TW.provoke (vs player: oán +9 since she has no ghen bar) |
| 11 | j28 SOC.warn | Cảnh báo | different gate/effects | FIXED TW.warn (one effect) |
| 12 | j28 SOC.feign | khen/niềm nở | NPC free sure +6 vs Khen tài nghệ odA(60+tai/5) +4 / −2 | FIXED same odds |
| 13 | j28 SOC.spy | dò hỏi | NPC free, 40 % evidence vs Dò la bạc 15 | FIXED runs ACT spyk (her free self-spy act) |
| 14 | j28 SOC.ally | kết thân | NPC free +8 vs Kết giao bạc 30, oAlly | FIXED runs ACT ally |
| 15 | j8:388 | Giả bệnh | NPC no Đức cost | FIXED TW.fakeIll (Đức −3) |
| 16 | j8:389 | Giả mang thai | NPC free, sure vs bạc 60, odA(tâm cơ), fail Danh −5 | FIXED TW.fakePreg |
| 17 | j8:390 | Báo tin có thai | NPC no jealousy side effect | FIXED TW.announce (others ghen +6) |
| 18 | j75 npcEffort | Kinh hồng vũ / Đánh cờ | NPC no ghen+10/rel−5 side effect, fail Sủng −2 (hers Danh −4); cờ gives no Danh+2/Tâm cơ+1 | FIXED same effects |
| 19 | j8:421 | HH tịch thu | NPC free, no evidence penalty | FIXED Danh −3 / TH −5 when unfounded, rel −20, regard −15 (BAL.tw.confNo) |
| 20 | j8:422 | HH ban thưởng | NPC conjured item, free | FIXED same as hers: bạc 30, rel +20, regard +10, Danh +3 (BAL.tw.reward) |
| 21 | j28 SOC.humiliate/visit/mediate/flaunt/test/drop/follow/gossip/check | NPC-only deeds | player had no option | FIXED one TW deed each, NPC side unchanged numbers; PLAYER OPTIONS added to the rival talk list (Thăm lúc ốm mệt, Hòa giải, Hạ nhục, Thử lòng, Lạnh nhạt, Nương theo, Rỉ tai chuyện trong cung, Khoe quà ngự ban); "check" = TW deed only (player already has Kiểm tra đồ j8:469) |
| 22 | j70:484 | Hủy dung | NPC-only (not in her RVGRP) | FIXED added to her "Sát hại" group |
| 23 | j8:348 | monthly bribe of a maid | NPC free, gains bạc | OPEN (should be ACT bribe bạc 40 + odds) |
| 24 | j75:142 | Nói xấu gối đầu (pillow slander) | NPC-only, free | OPEN (needs a night-scene option for her; night domain) |
| 25 | j75:174 | "mưa móc đều khắp" admonition | NPC queen/TH only, player-queen excluded | OPEN |
| 26 | j14:24 | lãnh cung release | NPC free 3 %/month vs her paid cards | OPEN |
| 27 | j14:38, j42:201 | buy another palace's servant | NPC-only, flat roll | OPEN (agent loop row 27/28 npc-agent.md) |
| 28 | jmline:59-89 | maid feuds, beat/frame a maid | NPC-only, free | OPEN |
| 29 | j22:38-41 | NPC affair / KSP book check | abstract dice, no steps / NPC-only audit | OPEN |
| 30 | jroute:224, :268 | monthly blackmail no roll; NPC escape free | vs her rolled uyhiep / paid escape prep | OPEN |
| 31 | j95:430, jroute:121 | NPC accusing her tryst: no Danh loss on failure | vs her Danh −8, oán +25, punish | OPEN |
| 32 | jlost:49 | theft as a loss cause, free | vs laydo bạc 30 + Đức 4 | OPEN (laydo not in mindMenu) |
| 33 | jpoison:106 | NPC dish conjured | she cooks (khắc + materials) | OPEN |
| 34 | j24:27 | conjured gift to her | she gives a real item | OPEN |
| 35 | j10:96-104, j55:132/116, j61:90, j42:231-429 | faction moves, ministers' impeachments, target learning, master's beatings/orders/cnvBlack | free vs her 1–2 khắc cards / NPC-only | OPEN |
| 36 | jtsb:107 | thathu/phonghoa NPC version delayed with an omen | hers immediate | OPEN (BIG-act tell rule, j40:52; same for poison) |
| 37 | jslap:103 | slap tier: NPC rolled, hers minigame | — | by design (minigame = her skill) |
Night stealing (SOC.steal / flip steal): see review/night-steal (other worker); j75:37 already makes SOC.steal the real stealNight. Dress offences: review/dress-offence (other worker).

### 1b. Player acts NPCs never use (list for the agent loop, Foreman C AG4/AG5 — not built here)
Emperor/Sủng: Nói thật lòng, Phô tài, Dâng hoa, Xin ân điển, Bàn chuyện triều chính, Hầu thuốc Hoàng thượng, plain Múa/Đánh đàn cards, Xin hầu cờ/đàn/dạo vườn follow-up choice (jgift:220).
Thái hậu/Hoàng hậu: Xin Thái hậu đỡ lời, Kể tội (talk), Xin Hoàng hậu che chở, Ân xá, Vẽ chân dung tặng Thái hậu.
Social: Chia sẻ bí mật, Nhờ giúp đỡ, Trút giận, Nghe lén câu chuyện, Lục rương, on-site plant (+15), Đưa cơm áo / Hỏi chuyện cũ (fallen), Thái y / KSP information buys, Cài tai mắt, Phát chẩn, Tụng kinh, Thưởng cung nữ.
Schemes: Trả chứng cứ lấy lòng (tieuhuy), Tự đi dò la (spyk — now used by SOC.spy), Sai cung nữ thân tín lấy lòng (bribel), Nhờ ơn người quen rút thẻ bài (blockf), laydo/laydol, Dọa tố đối thực, every j70 defence/aftermath/order choice, Lẻn vào / Xin yết kiến / Nhờ thái giám dẫn.
Children: Dạy dỗ con, Đưa con thỉnh an, Chữa bệnh cho con. Other: j22 affair steps + cover-ups, jmen blackmail, jstaff Biếu/Hỏi chuyện, servant-road cards, jroute steps, jkc cards.

### 1c. Costs (Sức)
Per deed the NPC now pays her exact BAL.tw cost (tests §3). Remaining gap = HOW OFTEN: NPCs do ~1 deed a week, she does many per day (khắc budget). That is the agent loop.

## 2. FIX (one branch)
- New module dev/build/jtwoway.js (assembled after j77): BAL.tw (costs + gains, the player's old card numbers, unchanged for her) + TW deed table, twDo(a,t,k) pays/rolls/applies for any doer.
- NPC side: SOC deeds and npcMonthly drips call TW (pay + roll; no money/Sức → no deed). Player side: topicOpts/talkOpts/deck cards read BAL.tw; new options added to the rival talk list (existing kit option rows, popCard). No new UI part (KIT FIRST: none needed).
- Small edits: jecon.js:134-137, j8.js (accuse bestow, npcMonthly, HH conf/reward + player empAct reads BAL.tw), j78.js:136, j75.js npcEffort, j70.js (Hủy dung in RVGRP), j3.js (NPC tablet decay), j2.js/j13.js (cards read BAL.tw), assemble.py.
- Doc to update by coordinator (canon overwrite): dev/ECONOMY.md:54 still describes BAL.schemeRkNpc/schemeGuardNpc (removed).

## 3. TESTS
- dev/test/two-way-acts.js (file:// build): 43 checks, ALL PASS, 0 page errors (each deed NPC→player, player→NPC, NPC→NPC pays BAL.tw; no-money/no-Sức blocks; SOC pays; npcMonthly greetings cost Sức; fakePreg; jecon multiplier; trinhth; player options present; player Hạ nhục works).
- dev/test/two-way-oldsave.js: save made on main, loaded here, 40 weeks run: ok, 0 errors, new options build.
- dev/test/coop-e2e.js (live worker, Fold host + iPad guest): 59 ok, 0 FAIL, no page errors.
- Perf (rivalsTurn + npcMonthly for all rivals, 300 runs, desktop): before mean 1.65 ms / p95 3.6; after 1.00 / 2.9 (no cost added).
- Bot (runb sens, inpage6 + dev/measure/insuc2.js, 3 lives each):
  | | lives / years | her Sức mean | NPC Sức mean | NPC tuần < 30 | NPC Sức paid via BAL.tw |
  |---|---|---|---|---|---|
  | before (main) | 3 / 33.7 | 72.6 | 97.2 | 5 of 13 881 | 0 |
  | after | 3 / 40.4 | 72.4 | 96.9 | 7 of 17 108 | 3 725 |
  NPC Sức drops only 0.3: each deed now costs the same, but NPCs act ~once a week. It will drop to her level only when the agent loop gives NPCs her khắc budget (AG1). Honest result: the "drop off ~97" target is NOT met by cost parity alone.
- NOT DONE: Fold 755x1000@2 + iPad 1180x820@2 shots of the 2 new options (Thăm lúc ốm mệt, Hạ nhục). dev/test/two-way-shots.js exists but the plain assembled dev/index.html opens the talk card in a broken frame (needs the site build dev/site/build_site.sh + real place visit); options are confirmed present at both sizes (has:[true,true], no overflow).

## 4. Risks (gain vs loss)
| risk | likelihood | severity | detect / fix |
|---|---|---|---|
| NPC regard/favour rises differently (TH +8 instead of +4, but costs Sức and rolls) → HH race shifts | có thể | vừa | bot sens 40 HH reach before/after; BAL.tw.g knobs |
| No NPC scheme discount → NPC schemes rarer at rank gaps (ECONOMY.md measured early death 47 % with .05/.03) | có thể | vừa | mort/HH bot; one knob BAL.schemeRk |
| Rival talk list longer (8 new options) | dễ xảy ra | nhỏ | kit list scrolls; reviewer screenshot check |
Được lớn hơn: the law holds for every deed touched, one cost source, all reversible by BAL knobs.

## 5. HANDOVER (rollover at ≈ 29 % context; coordinator opens the successor)
Branch review/two-way-acts (see SẴN SÀNG KIỂM sha in dev/PROGRESS_two-way-acts.md). Successor: (1) site build + shots Fold/iPad of the rival talk card showing Thăm lúc ốm mệt + Hạ nhục (dev/test/two-way-shots.js; open via Dư đồ → place → tap the consort); (2) optional: OPEN rows 23, 25, 26, 31, 32 are small deed fixes in the same style (TW deed + BAL.tw); (3) update ECONOMY.md:54.
