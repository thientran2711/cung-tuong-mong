# AG-ALL — every NPC group plays the player's FULL act list (gap table + design + split)
PRIORITY #1 CHECK ('AG-ALL|mindPick|adHapRoll|agOpts'): OD 1 | ledger 0 | claims 4 | main 15 | review/* 0 — reuse: jagent (AG1/AG1b consort loop), jagemp (AG2), jagmaid (AG3), jgreet (AG-MEET), jmind mindPick, jtwoway TW, j95 ledger, dev/research/world-events.md (12bca8a2, WORLD WINDOW).
Worker: AG-ALL (opus) session_01UV1SzjsTYMFvr4Rvhpd1tt, coordinator Foreman C (session_01UV1Szh1sUAVP6FUuqZgkYs), main s31. Base: origin/main 6ca04148. Code branch: review/ag-all.
START_CTX ≈ 6 % of 1M window (estimate; context_usage reads 0). Rollover at ≈ 31 %, ceiling 60 %.
Owner law (verbatim, binding): OD 17/11 ~13:15Z (L1587, AG-HAP), ~13:20Z (L1588, AG-ALL), ~13:40Z (L1592, DAY PLAN), ~13:55Z (build every missing act at once, no approval).

Legend for column "NPC today": **YES** via file:fn = same act, same formula, chosen by the agent loop (needs × traits × mindPick); **PARTIAL** = exists but decided by a flat roll / drip / outcome-only / missing part; **NO** = no NPC of the group can do it. Line numbers = main 6ca04148.

## 1. CONSORT (player-as-consort; NPC = rival consorts)
Two NPC paths exist today: (a) the agent loop jagent (only the 21 deeds of BAL.ag.own, jbal2.js:564) and (b) the OLD path: harm trigger `Math.random()<want*.04` weekly (j8.js:434) / per buổi (j24.js:14) → npcAct (j40.js:39) → mindMenu wpick over fixed weights → runAct; weekly npcSocial roll(60) (j28.js:81); monthly npcMonthly drips (j8.js:411-425). Rows on path (b) use the SAME act function but WHEN/WHETHER is a flat roll → PARTIAL.
### 1a. Sủng deck / Hành sự (j2.js pool/deal/artActs; jact.js:42 deals the pool)
| player act | code | cost / odds | NPC consort today | notes |
|---|---|---|---|---|
| Kinh hồng vũ / Đàn khúc Phượng cầu hoàng / Đánh cờ với Hoàng thượng | j2.js:54-56 | BAL.deck.vu/cam/ky, deckOdds (j75:161) | YES via jagent agOpts "effort" → npcEffort(v,true) j75:172 | 3 rows |
| Vẽ chân dung tặng Thái hậu | j2.js:57 | od(50+artW("hoa")×8), Sức −10 Bạc −10 | NO | |
| Múa trong yến tiệc | j2.js:37 | od(30+sac/2+vu×4) | PARTIAL: only Kinh hồng vũ at vu≥3 | |
| Cắm hoa / Dâng canh / Làm thơ / Thêu khăn (works, "Tự học {art}") | j83.js:158-161 wkDeckCard | WK costs | PARTIAL: effort "qf" small gift stands in; NPC makes no works | |
| Cài tai mắt | j2.js:39 | Bạc 25, od(80) | PARTIAL: j10.js:38 bribeServ roll(10)/month | |
| Nghỉ ngơi dưỡng sức / một lát | jrest.js:29 | BAL.restDs*/restLat* | PARTIAL: passive regen; AG rest need only weights "keep schedule" | |
| Cầu tự ở Phụng Tiên điện | j2.js:43 | BAL.tw.pray | YES via jagent AGSELF.pray | |
| Dưỡng nhan | j2.js:45 | Bạc 30, od(92) | NO | |
| Đọc binh thư, sử sách | j2.js:47 | Sức 5 → Tâm cơ +2 | NO | |
| Luyện cầm kỳ thi họa / Tự học / Học với thầy / Mời danh sư | j2.js:182-185, j83 | tchFee, Sức | PARTIAL: j85.js:131 npcStudy roll(40×nết)/month + j8.js:411 roll(30) drip | |
| Tứ đức: Tự học / Học với ma ma giáo tập | j85.js:114-115, jtd.js:244-245 | BAL.td, virCost | PARTIAL: npcStudy roll | |
| Tụng kinh, làm việc thiện / Phát bạc cứu giúp cung nhân | j2.js:48, jact adCharityCard | BAL.charity | PARTIAL: j85.js:151 roll(5) | |
| Thưởng cung nữ | j2.js:49 | Bạc 20 | NO | |
| Giả mang thai / Giả bệnh / Báo tin có thai | j2.js:50, j13.js:44, j2.js:72 | BAL.tw.fakePreg/fakeIll/g.ann | YES via jagent AGSELF (old drips j8:423-425 muted) | 3 rows |
| An thai / Tự bào chế thuốc an thai | j2.js:70-71 | Bạc 20 / Sức 5 | PARTIAL: j8.js:421 auto useItem | |
| Tranh sủng / Chặn ngự giá | j2.js:61-62, ACT.steal/road j8:126-127 | BAL.steal.cost, oSteal | YES via jsteal stealPass (need × nết × relation × odds; not the jagent loop) | 2 rows |
| Hầu thuốc Hoàng thượng | j20.js:36 | Sức 10, od(65+y×5) | NO | |
| Emotion cards (Đập đồ, Mắng cung nữ, Khóc thầm, Viết thư nhà, …) | jemoact.js:205 | BAL.ea.card | PARTIAL: jemoact:479 roll(actCh 25) + pick | |
### 1b. Social — person card (j9 topicOpts, jtwoway.js:95, j2 talkOpts)
| player act | code | cost / odds | NPC consort today | notes |
|---|---|---|---|---|
| Hỏi han sức khỏe / Khen tài nghệ nàng / Bàn tán về {X} / Chia sẻ bí mật | j9.js:55-58 | BAL.talk.* | PARTIAL: only toward her via AG-MEET (jgreet gmOpts); NPC↔NPC: names only / SOC.feign roll(60) | 4 rows |
| Nhờ giúp đỡ / Nhún nhường / Trút giận / Giải bày hiểu lầm (j95b:300) / Nhắc lại ân xưa (jmem:354) | j9.js:59,63; j2.js:148 | – / Danh −2 / Đức −3 | NO | 5 rows |
| Cảnh báo nàng / Tạ lỗi / Giúp đỡ nàng / Thăm lúc ốm mệt / Hòa giải / Hạ nhục / Thử lòng / Lạnh nhạt / Nương theo / Rỉ tai chuyện / Khoe quà ngự ban / Khiêu khích | j9.js:61-64, jtwoway adds, j2.js:147 | BAL.tw.* | YES via jagent AGSOC/AGSELF | 12 rows; Cảnh báo + Khiêu khích: player card BAL.talk vs NPC BAL.tw.g (two sources → ONE CORE fix); SOC.mediate keeps an old oan(t,S)≥20 gate; Nương theo target forced (twFollowT) |
| Nghe lén câu chuyện | j2.js:149, j9.js:82 | BAL.ag.wit | PARTIAL: agSeeHer "hear" only when SHE does an owned deed | |
| Tặng quà | j2.js:146, ACT.gift → giveTo | giftVal, BAL.gift | PARTIAL: j8.js:414 roll(15), :419 roll(10) | |
| Kết giao | ACT.ally j8.js:88 | Bạc 30, oAlly | PARTIAL: npcSocial roll(60) + j8.js:418 roll(10) | |
| Chào hỏi / Hành lễ | j61, jgreet.js:67 | greetName | YES via jgreet gmTick | |
### 1c. Thái hậu / Hoàng hậu / Hoàng thượng / offices (j2.js:120-170 talkOpts + wrappers)
| player act | code | cost / odds | NPC consort today | notes |
|---|---|---|---|---|
| Thỉnh an, chép kinh (TH) / Thỉnh an (HH) | j2.js:138,142 | BAL.tw.thTH/thHH | YES via jagent AGSELF | 2 rows |
| Xin Thái hậu đỡ lời / Xin Hoàng hậu che chở | j2.js:139,143 | od(45+th/3) / od(45+hh/3) | NO | 2 rows |
| Tâng bốc / Nói thật lòng / Phô tài / Xin ân điển / Bàn chuyện triều chính | j2.js:130-135 | od(...) | NO | 5 rows (Emperor talk) |
| Xin hầu cờ / Xin đánh đàn hầu ngài / Mời ngài dạo ngự hoa viên | jgift.js:205 kmEmpAct | kmEmpO, BAL.empDay | PARTIAL: jgift.js:234 roll(BAL.empDay.p 6) | |
| Đánh đàn chờ ngự giá (garden) | jact.js:152 | od(35+tai/3+…) | PARTIAL: effort cam / j95 "seekemp" intent | |
| Tập trước {art} / night talk | j75.js:111, PEND night1 | – | PARTIAL: rivalNight j75:138-139 roll(55), roll(35+tamco/2) | |
| Gối chăn nói xấu (night2) | BAL.tw.g.pillow | – | YES via jagemp pillowNpc | |
| Tiến cử cung nữ hầu thay | jagmaid | BAL.ag.maid.send | YES via amSendQ | |
| Đút lót lật thẻ | j2.js:157 | BAL.tw.ksp | YES via jagent AGSELF.ksp | |
| Hỏi sở thích Hoàng thượng / Xem sổ thị tẩm | j2.js:158-159 | Bạc 15 | NO | 2 rows |
| Truyền thái y / Tự bốc thuốc / Tĩnh dưỡng / Xin chữa bệnh | j13.js:41-43 | treatO | PARTIAL: passive monthly cure roll j13.js:19 | |
| Bài thuốc dễ thụ thai / Mời thái y tâm phúc / Xin thuốc cho con | j2.js:153-155 | Bạc 40/50 | NO | 3 rows |
| Hỏi chuyện cũ (phế phi) | j2.js:163 | od(50+tamco/5) | NO | |
| Trò chuyện với cung nữ / Sai cung nữ đi dò la / Nghe ngóng chung | jact.js:31, jwhy.js:72, jhouse | jwhy odds | PARTIAL: harm-menu spy only | |
| Lục rương tìm chứng cứ | j2.js:152 | od(45+mat×5) | NO | |
### 1d. ACT harm / schemes (j8 ACT table + module ACTs; player's rival card RVGRP j15.js:26) — NPC path (b): flat trigger j8.js:434 / j24.js:14 → mindMenu
| player act | code | cost / odds | NPC consort today | notes |
|---|---|---|---|---|
| Dò la · Tự đi dò la · Tung tin đồn · Vu oan · Hạ độc · Tố giác · Mua chuộc cung nữ · Rút thẻ bài · Bỏ xạ hương · Mua chuộc bà đỡ · Phá việc học · Hạ độc con nàng · Đẩy con nàng xuống hồ · Vu con nàng trù ẻo · Xin bế con nàng về nuôi · Tố vượt phẩm · Cài đồ vào rương | j8.js:87-125, jecon:148 | ACT c + oSpy/oRumor/oFrame/oPoison/oAccuse/oBribe/oBlock/oKSab/oKPoison/oKFrame/oVP/oPlant | PARTIAL: same runAct, chosen by mindMenu wpick after flat trigger (not needs × mindPick) | 17 rows |
| Tố xa xỉ · Đẩy xuống hồ sen · Ngáng chân · Hủy dung · Trình Thái hậu/Hoàng hậu · Uy hiếp đòi bạc · Bán cho phe khác · Giá họa trộm đồ · Tát / Phạt quỳ · Bỏ phấn lạ · Tặng quà ăn có độc · Ép nộp của / Hại thú nuôi / Thả thú dữ / Phóng hỏa kho đồ · Bày mưu (j70 plots) | jdress:94, j9:149-150, j70:485, j78:137-145, j92:355, jface:177-183, jrash:53, jpoison:99, jtsb:52-91, j70:290 | module odds (BAL.pg, …) | PARTIAL: module NPC routines (jdress:100, j70:495, j78:173, j92:361, jface:191, jrash:62, jpoison:104, jtsb:203, j70:154) on old triggers | 13 rows |
| Ly gián / Tố tội thật / Xin Hoàng hậu giáng / Hạ độc dần / Bóc chuyện tư tình | j30.js:25-29 | – | PARTIAL: j30.js:33 roll(45), next-seat holder only | |
| Trả chứng cứ lấy lòng | j78.js:147 | – | NO | |
| Sai cung nữ thân tín lấy lòng / Nhờ ơn người quen rút thẻ bài | jecon.js:151/155 | oBribe/oBlock −selfMinus | NO | |
| Sai người lấy trộm đồ / Sai cung nữ thân tín lấy đồ | jlost.js:248/250 | loStealO | NO (laydo in BANDS, never in mindMenu) | |
### 1e. Study, shop, toilette, map, contests, kids, misc
| player act | code | cost / odds | NPC consort today | notes |
|---|---|---|---|---|
| Khảo hạch tấn phong | jexam.js | kg82 | YES (same exam, kg82NpcMean jexam:58) | |
| Xem hàng / Mua ở Nội vụ phủ | jact.js:66 kitShopNvp | item pr | PARTIAL: j8.js:412 roll(25) random item, :413 roll(8) túi thơm | |
| Đeo / dùng đồ | inv UI | – | YES by rule (j8.js:420-422) | |
| Điểm trang buổi sáng (dress + makeup game) | jtoil.js | BAL.toil | PARTIAL: toilNpc (jtoil:165) deterministic hash by nết/Sắc, no choice, no skill odds | AG-TOIL order (OD ~04:05Z) |
| Toilette reactions (Xin lỗi / Cười trừ / Đáp lại / Cảm tạ / Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết) | jtoilr.js | BAL.toil.rx | NO | |
| Dư đồ đi đến … (goTo) | j2.js:98-106 | BAL.walk | PARTIAL: j9.js:21 placeWhere re-roll / j95 habits, no goal (§7) | DAY PLAN |
| Seat contest: Luyện tập / Vận động người đỡ đầu / Ra tay với {X} | j34.js | – | PARTIAL: j34.js:51-52 fixed weights + roll(55) | |
| Festival contests / Trò mưu (scheme mini-games) | j71; jsgame.js | same score / plain odds by design | YES | 2 rows |
| Hội phối đồ | jevfit / jitd | – | PARTIAL (not verified; makeup taste order OD ~03:32Z) | |
| Dạy dỗ / Dạy học chữ / Mời thầy dạy (con) | j2.js:66, j53:214, j54:161 | – | YES via j53 ktNpcTutor, j54 h54NpcArts | |
| Bàn chuyện hôn sự (con) | j54 | – | PARTIAL: j54.js:97 roll(20) | |
| Đưa con đến thỉnh an Hoàng thượng / Chữa bệnh cho con | j2.js:67,69 | – | NO | 2 rows |
| Phe: Xin vào phe / Rời phe / Bán đứng / Ly gián | j10.js:108-112 | inviteOdds | PARTIAL: facMonth j10:96-104 rolls | |
| Người hầu: Mua chuộc / Cài người / Tiến cử / Che chở / Phạt / Thưởng / Đổi người / Dọa tố / Biếu | j10.js:62-65 | – | PARTIAL: j10:38 roll(10), :39 roll(2); rest NO | |
| Lãnh cung: Cầu xin / Nhờ người bên ngoài / Tìm chứng cứ / Gửi thơ cũ / Chép kinh / Nhờ đưa thư | j14.js:8, j24.js:51 | BAL.tw.cold | PARTIAL: j14.js:24 roll(3)/roll(5) | |
| Thú nuôi: Xin / Tự tay chăm / Giao chăm / Giúp chăm / Trộm | jpet, jpetcare:134/137 | BAL.pet | YES (npcCare, jpetcare:150 fixed weights) | 2 rows |
| Đàn ông: Chào hỏi / Liếc mắt / Trao khăn / Hẹn gặp riêng / Cắt đứt / Uy hiếp | j22.js:23, jmen:246 | – | PARTIAL: j95/jmen data | |
Counts CONSORT (128 acts, multi-act rows counted per act): YES 34 · PARTIAL 62 · NO 32. Of the 34 YES only 22 run inside the jagent loop; jsteal, jgreet, jagemp, jagmaid, jexam, kids, pets are separate need/weight paths.


## 2. MAID (player start "cung nữ", `isSrv()`; tabs Việc / Đi / Đồng liêu / Thân phận / Sổ, j42.js:320)
Ma ma is a later phase of the maid life (j42:296 "Ở lại làm ma ma" → jexam exSrvMama, S.srv.mama), same lists. Maids have no toilette (jtoil.js:49 toilOn false while isSrv) — matches the player. All in j42.js unless named.
| player act | code | cost / odds | NPC maid today | notes |
|---|---|---|---|---|
| Quét sân, lau điện / Đốc thúc cung nữ quét dọn (rk≥2) | j42:150 srvCards | Sức −5/−2, sure, công lao +.5 | PARTIAL: merit handed out monthly j14 servRanks (1+rk/3), no act | |
| Dâng trà, hầu điểm tâm | j42:151 | od(50+sac/10+tai/10+misAdj) | NO (loyalty only decays j10 servMonth) | |
| Theo hầu chủ | j42:152 | sure | PARTIAL: j95 roster routine places her | |
| Lĩnh đồ ở Nội vụ phủ | j42:153, srvMeet :169 | sure; srvMeet roll 25 bullied | NO | |
| Học lễ nghi với cô cô | j42:154 | sure, Đức +1 | NO | study |
| Luyện thêu thùa, chữ nghĩa | j42:155 | od(60), Tài +1 | NO (NPC Sắc/Tài fixed, jagmaid amSt) | study |
| Chải chuốt, giữ nhan sắc | j42:156 | od(55), Sắc +1, Bạc −3 | NO | |
| Nghỉ lấy sức | j42:158 | 100 / od(70) strict mistress | NO (NPC servants have no Sức) | |
| Thêu khăn bán ra ngoài | j42:159 | od(70), Bạc +6 | PARTIAL: jcmaid cmMonthNpc talent "theu" flat BAL.cmaid | |
| Mua thuốc bổ | j42:143 | Bạc −8 (Sức<50) | NO | |
| Quản sổ sách trong cung (rk≥3) | j42:161 | od(75) | NO | |
| Việc chủ sai → Làm xong | j42:162-163,124, srvErrandDone :127 | offer roll(45); notice od(30+sac/3) | PARTIAL: j95.js:147 eunuch errand j95dice(80) | |
| Hầu trà khi ngự giá | j42:165 | amTeaO(S,1); BAL.ag.maid.tea | YES via jagmaid amNightTea→amDecide :62/:50 (only while mlSeek) | |
| Lui sau bình phong | j42:166 | sure, Chủ tin +2 | YES ("keep" branch of amDecide) | |
| Lén báo tin cho {v} | j42:167 | od(70+tamco/5); fail roll 40 Tân Giả khố | PARTIAL: j10 servMonth spy roll(60) | |
| Giặt đồ / Nghỉ tay / Cầu xin quản sự (Tân Giả khố) | j42:145-147 | sure / od(70) / od(20+danh/2+fr×8) | NO (NPC sent there just leaves staff) | |
| Uống thuốc phá thai | j42:465 | od(60); fail roll 20 death | NO (NPC maids never conceive) | |
| Khảo hạch Nội vụ phủ | jexam exSrvCard :256 | exSrvChance, BAL.ex.srvBar | YES via jexam exSrvNpc :266 (seeded roll, not chosen) | timing not chosen |
| Đấm lưng, hầu chuyện | j42:109 srvTalk | od(45+…+misAdj) | NO | to mistress |
| Xin chủ ban thưởng | j42:110 | od(40+tin/2) | NO | |
| Bẩm tin dò được | j42:112 | sure, evA 1 | PARTIAL: j10 servMonth friend tell roll | |
| Xin chủ tiến cử lên Nội vụ phủ | j42:113 | od(30+tin/2), công lao +3 | PARTIAL: only master acts (j14, jpromsv dbDo) | |
| Hầu bên cạnh chủ | j42:120 | od(55+misAdj) | NO | |
| Quỳ dâng trà (Hoàng thượng ở đó) | j42:114 | amTeaO(S); BAL.ag.maid.tea | YES via jagmaid amWeek→amDecide :60 (only while seeking) | |
| Cúi đầu lui tránh | j42:115 | sure | YES ("keep") | |
| Hành lễ thỉnh an (phi tần) | j42:116 + jgreet:74 | trSrvGreet | NO | |
| Mật báo chuyện của {mis} | j42:118 | sure; nv betrayFind, roll 30 death | PARTIAL: j8:383 maidMonthP roll(15) | |
| Tố cáo {mis} trước Hoàng hậu | j42:119 | od(30+sec×15+danh/5) | NO | |
| Trò chuyện / Biếu quà nhỏ (đồng liêu) | j42:121-122, srvStaffAct :357-364 | od(55+duc/5+sac/10) / Bạc −5 | NO (servant af set once, j10:12) | |
| Nhờ dò tin (đồng liêu) | j42:357-364 | af≥30 | PARTIAL ≈ j10 friend tell | |
| Xin thuốc bổ / Học lỏm nghề thuốc | j42:123 | Bạc −6 / od(40+tai/3) | NO | |
| Tố lỗi với chủ (đồng liêu) | j42:365 | od(30+tamco/3); roll 25 expel | PARTIAL: jmline mlFeud frame (flat BAL.mline) | |
| Chào hỏi đúng lễ / Liếc mắt đưa tình / Trao khăn tay, thư / Hẹn gặp riêng / Hẹn ước trăm năm / Cắt đứt (man) | j42:407-413 | od(55+sac/5) / od(60+tamco/5) / 100−srvRisk | PARTIAL: j42:434-439 maidLoveMonth flat rolls (25/4/30/35/3) | |
| Dọa tố chuyện tư tình / Bẩm chủ chuyện của {v} | j42:415-416 | od(45+tamco/3) | NO | |
| Bị mắng: Cúi đầu nhận lỗi / Khóc lóc xin tha / Cãi lại | j42:261 cnvScold | od(40+sac/3); roll 40 | PARTIAL: jmline mlSeek punish only | |
| Lệnh chủ: Vâng lệnh / Từ chối / Mật báo | j42:266, srvDoOrder :246 | ordOdds; 50/30 flat | PARTIAL: NPC servants used via j10 bestSent/confessRisk; cannot refuse | |
| Bị mua chuộc: Nhận bạc / Từ chối, bẩm chủ / Từ chối, im lặng | j42:276 | BAL.coopBribe | PARTIAL: j10 bribeServ odds outcome, no choice | |
| Bị vu: Thanh minh / Nhận tội / Đút bạc | j42:281 cnvFrame | od(30+tamco/2+duc/5+fr×8) | PARTIAL: mlFeud frameCatch flat | |
| Hoàng thượng hỏi tên | j42:286 cnvName | off when AG on | YES (folded into jagmaid) | |
| Được gọi thị tẩm: Tắm gội chờ giá / Cáo bệnh | jagmaid:88 | BAL.ag.maid.decline | PARTIAL: NPC never declines | |
| Ban gả: Tạ ơn, xuất giá / Xin ở lại | j42:290,447 | trigger rolls | PARTIAL: maidLoveMonth roll(3), no choice | |
| Theo về vương phủ / Xin ở lại hầu chủ | j42:451 | roll(6) | NO | |
| Tuổi: Xuất cung / Ở lại làm ma ma / Xin chủ giữ lại | j42:294,456 | BAL.srvAge | NO (NPC maids just age) | |
| Yến: Rót rượu gần ngự tọa / Đứng sau hầu chủ | j42:300 cnvFest | od(30+sac/3+tai/10) | NO | |
| Bị tống tiền: Nghe lời / Đút bạc / Mặc kệ | j42:442 cnvBlack | roll 40 | NO | |
| Road chapters cnv_chu/ban/mat/ma | jrd_cnv.js (568 labels) | rdOdds BAL.road | NO (story only) | out of scope: story |
| Dư đồ moves | placeEnterHook j42:61 | access rule | PARTIAL: j9 placeWhere / j95 schedule, no goal | DAY PLAN |
Counts MAID (46 rows): YES 6 · PARTIAL 20 · NO 20.

## 3. SERVANT / EUNUCH (the player can NOT be one; mirror of the maid list, which is the nearest player list)
| what the game gives them | code | decided by | should mirror (player act) |
|---|---|---|---|
| monthly merit / rank-up | j14 servRanks; jexam exSrvNpc | deterministic + seeded roll | Quét sân / Quản sổ sách / Khảo hạch |
| sold to a richer palace | j14.js:254 | FLAT roll(1.5) | buyer's act Mua người (j10 bribeServ) |
| bribed into a spy | j10 bribeServ :25 | odA outcome, no choice | Bị mua chuộc 3 choices |
| planted in another palace | j10 plantServ :27 | master's act odds | Lệnh chủ choices |
| spy report / friend tell | j10 servMonth | FLAT roll(60), tellRoll | Bẩm tin dò được / Lén báo tin |
| đối thực lover | j10:14 | FLAT roll(20) at init | man acts (Liếc mắt … Hẹn ước) |
| runs master's scheme, confesses, dies | j10 bestSent/confessRisk/servCaught | FLAT 30 % | Lệnh chủ: Vâng / Từ chối / Mật báo |
| plot errand | j95.js:147 | FLAT j95dice(80) | Việc chủ sai |
| rk≥3 eunuch helps master's night odds | j8.js:41 | passive | — |
| pilfer items | jeitem eitPilfer :50/75 | flat BAL.eit.pil | (scheme: Cài đồ / steal) |
| proud / leaves after promotion | jpromsv spMonth | flat BAL.sp.leaveCh | Tuổi: Xuất cung / Ở lại |
| event roles (squeeze, gamble, sick, quarrel, heirloom, lost item) | j95b.js:29-31,79-82 | motive-gated templates | — |
| named elders ma ma / cô cô | jstaff | no acts | maid list (ma ma phase) |
| court eunuchs tq / ksp / ped | j10:12 S.court | stage only | — |
Counts SERVANT (mirror of 46 maid acts): YES 0 · PARTIAL 9 · NO 37 (none chosen by an agent; every act above is a flat roll or a template).

## 4. EMPEROR (never the player; acts in events/UI + the player acts he should mirror)
| his act | code | decided today | mirror / note |
|---|---|---|---|
| calls someone or rests | j8.js:522 flip → jagemp empSummon :28 | roll BAL.ag.emp.summon [90,65] (owner-set rate, OD 16/11 18:10Z) | keep (owner rule) |
| whom he calls | jagemp empPick :42 (+ jagmaid amPool :116) | YES agent mindPick(nightCh × memory) | |
| court crisis cancels | j55.js:96 | muted when empOn | |
| drunk cancels the night | jemoact.js:489 | FLAT roll(eaQx×100), not muted | fold into empBusy |
| lệ mùng 1 / rằm | j75:209 → jagemp empCustom :44 | YES agent | |
| fill vacant HH seat | j34.js:53 contestOpen; jagemp empSeat DEAD (__noOldSeat) | contest; outsider queen FLAT roll(10) j34:53 | |
| where he is each buổi | j95.js:177 j95planEmp; j9.js:22 placeWhere | weights + j95dice(22) surprise | DAY PLAN |
| garden stroll '!' | jact.js:127 | FLAT roll(AD.strollP 80) | his plan slot |
| Ngự giá lâm cung (visits her palace) | jvisit.js:37 visRoll | FLAT roll(visCh), her/co-op only; NPCs never | TW visit; must reach NPC consorts too |
| drops by for tea | j24.js:32 | FLAT roll(BAL.visit.tea.p 50) | visit |
| summons for đàn/cờ/du hồ | jts.js:227 tsSummonWeek | FLAT roll(14×mood) + weighted | his plan deed |
| ân thưởng (bestow) | j8.js:309, j75:148, j8:377/379, j8:462, j71:97/360, jcui:35, j8:98, j10:85, j20:36, jpet:132, jveil:209 | FLAT rolls 4–50 | HH "Ban thưởng"; his choice by regard |
| promotion | j8.js:374 promoteP | rule | keep |
| punish / mercy | j8.js:63 | mercy FLAT roll(30) if nhân từ | |
| judges accusations | j3:76, j7:19,29,182, j95:414 | the accuser's odds | keep (odds of the act) |
| court memorials | j55.js:105 tdSoMonth | FLAT roll(TD.so 32) | court agenda (out of AG scope) |
| heir / princess marriage / edict / dress noticed | j51:66, j54:124, jht:95, jlux:129, j92:413, j8:289 | FLAT | |
| notices maids | jagmaid amDecide | YES | |
| tuyển tú | j27.js:54 calendar; j8.js:443 R(12) | calendar + FLAT | WORLD WINDOW #2 |
Counts EMPEROR (19): YES 4 · PARTIAL 6 (rule/odds-of-other/owner rate) · NO-as-agent 9 (flat rolls).

## 5. THÁI HẬU (never the player)
| her act | code | decided today | mirror |
|---|---|---|---|
| receives thỉnh an | j95.js:181 j95planTH, TW thTH | YES (NPC side jagent; j8:416 roll muted) | |
| walks in the garden | j95.js:182 | FLAT j95dice(15) | DAY PLAN |
| summons the player | j24.js:33 | pick in approaches | AG-MEET |
| gifts (ban thưởng) | j8.js:455 roll(8); jpet:133 roll(2.5); tsBirthReward | FLAT / rule | HH "Ban thưởng" |
| admonish độc sủng (no HH) | j75.js:188 | FLAT roll(30) | TW admon |
| scolds a slap | jface.js:180 | FLAT roll(40) | HH "Xử tội" light |
| displeased at ngự giá | jvisit.js:79 | FLAT | |
| hears evidence | j78.js:138 | presenter's odds | |
| releases from lãnh cung | j14.js:20 | FLAT roll(10) | HH "Ân xá" |
| giữ hay không giữ | j8.js:319 PEND.giu | player options | |
| seat pressure / exam / contest judge | promoReqP, jexam, j34 | rule | keep |
| frugality edict | jlux.js:130 | FLAT roll(25) | |
| betrothal / favour quest / thọ yến | jht:95, j72:217, j7:131 | FLAT / calendar | WORLD WINDOW #3 |
| illness / mood | j13:30, jcmood | FLAT / causes | (body rule, out of scope) |
Counts THÁI HẬU (14): YES 1 · PARTIAL 4 · NO 9.

## 6. HOÀNG HẬU (the player CAN be one: only via j34 seat contest → S.rank 7; buttons j15.js:33/39, handler j8.js:472 empAct)
| player-as-HH act | code | cost / rule | NPC Hoàng hậu today | notes |
|---|---|---|---|---|
| Xử tội | j8.js:140 judge; j78:192; j95:419 | 2 chứng cứ | PARTIAL: j8.js:431 mindPickBy target then FLAT roll(35×mindW) | |
| Tịch thu trang sức | empAct conf | BAL.tw.confNo if unfounded | PARTIAL: j8.js:456 FLAT roll(10) when hh ≤ −40 | |
| Ban thưởng | empAct reward | Bạc 30 | PARTIAL: j8.js:457 FLAT roll(6) when hh ≥ 50 | |
| Ân xá | empAct pardon | target confined / lc | NO | |
| Khất bổng lộc | empAct cutpay | none | PARTIAL: j20.js:15 payCuts FLAT roll(20) | |
| Khuyên Hoàng thượng mưa móc đều khắp | TW admon (jtwoway) | BAL.tw | PARTIAL: j75.js:188 FLAT roll(30), cd 6 | not in AGSELF |
| (as a consort) every consort act | §1 | | as §1 (jagent) | |
| receives thỉnh an / calls consorts | TW thHH; j95.js:200 surprise "called" | | PARTIAL (dice) | |
| hosts dress contest / rank feast / examiner | jts.js:286,178; jexam | calendar | YES (rule) | |
Counts HOÀNG HẬU (8 HH-only): YES 1 · PARTIAL 6 · NO 1.

## 7. Placement: placeWhere (DAY PLAN, OD 17/11 ~13:40Z)
| site | today | under the law |
|---|---|---|
| j9.js:21 placeWhere (+ j95 j95plan* weights, j95dice surprises j95.js:179/182) | every NPC's place re-rolled EACH buổi from a fixed table (buổi / season / health), no goal; the Emperor `pick()` | at the START OF EACH DAY every NPC draws a day plan (4 buổi × place + deed + goal) by weighted odds from stats/needs/traits/tâm cơ/goals (mindPick); each buổi she carries it out; small re-plan chance on events / her deeds / need change; the fixed table stays only as the weight base of a "no goal" buổi |

## 8. Every FLAT ROLL still deciding an NPC act (main 6ca04148; "muted" = off while agOn)
MUTED today (keep muted): j8.js:416 thỉnh an TH roll(25), :417 HH roll(20), :423 fakeIll roll(3), :424 fakePreg roll(2), :425 announce roll(50); j75.js:172/181 npcEffort; j28.js:81 SOC keys mapped to TW; j8.js:522-523 flip; j75.js:209 custom; j55.js:96 crisis; j42.js:135,209 maid notice; j75.js:147 sendMaid roll(3); j8 sendMaid rise roll(30); jmline mlEye.
NOT MUTED — consort: j8.js:434 weekly harm trigger want×.04; j24.js:14 per-buổi harm trigger; j40.js:39-49 mindMenu wpick + trait slips roll 35/22/20/15, clue roll(20) j40:30; j30.js:33 roll(45); jts.js:143 roll(50); jface.js:161 roll(50); j28.js:81 roll(60) npcSocial (feign, spy, ally); j8.js:411 art roll(30), :412 shop roll(25), :413 túi thơm roll(8), :414 gift roll(15)/roll(50) + npcCourt j10:57 roll(10), :415 Sủng drip roll(30), :418 ally roll(10), :419 gift roll(10), :423 inspect roll(20), :383 maid buy roll(15); j75.js:138-139 night prep roll(55)/fit; jgift.js:234 empDay roll(6); j85.js:131 npcStudy roll(40×nết); j85.js:151 charity roll(5); j10.js:38 bribeServ roll(10), :39 plant roll(2); j10.js:96-104 faction rolls; j14.js:24 cold petition roll(3)/(5); j34.js:51-52 contest weights + roll(55); jpoison.js:106 roll(30); jemoact.js:478-479 roll(20)/roll(25)+pick; j53.js:146-147 roll(30); j54.js:97 roll(20); jpetcare.js:150 fixed weights.
NOT MUTED — maid / servant: j14.js:254 sold roll(1.5); j42.js:210 player maid bought roll(1.5); jmline mlSeek :36-45 (seek/notice/punish/use), mlRose :32, mlFeud :60-75, mlHit :79-88; jcmaid cmMonthNpc :128, cmGuard :82; j42.js:434-439 maidLoveMonth roll 25/4/30/35/3; j10 servMonth spy roll(60) / tell / bribe roll(10) / plant roll(2); j10.js:14 eunuch lover roll(20); j10 servCaught 30 %; j95.js:147 j95dice(80); jeitem eitPilfer :51/:75-77; jpromsv spMonth leaveCh.
NOT MUTED — Emperor / Thái hậu / Hoàng hậu: jemoact.js:489 drunk no-flip; j34.js:53 outsider queen roll(10); j34.js:23,42 lobby/virtue; jact.js:127 stroll roll(80); jact.js:134 hapP/hap2; jvisit.js:39 visit roll(visCh); j24.js:32 tea roll(50); jts.js:227,231 summons; j95.js:179 emp surprise j95dice(22); j95.js:182 TH garden j95dice(15); bestow rolls j8.js:309, j75.js:148, j8.js:377,379, j8.js:462, j71.js:97,360, jcui.js:35, j8.js:98, j10.js:85, j20.js:36, jpet.js:132, jveil.js:209; j8.js:68-69 mercy roll(30); j55.js:105,121,125,134 memorials; j51.js:66 heir; j54.js:124 envoy; jht.js:95 betrothal; jlux.js:129-130 edict roll(25); j92.js:413, j8.js:289 dress noticed; HH: j8.js:431 judge roll(35×mindW), :456 conf roll(10), :457 reward roll(6), j20.js:15 cutpay roll(20), j75.js:188 admon roll(30), :192 family roll(25); TH: j8.js:455 gift roll(8), jpet.js:133, j14.js:20 release roll(10), jface.js:180 scold roll(40), jvisit.js:79 displeased.
NOT MUTED — schedule: j9.js:21 placeWhere every buổi; j95.js:210 j95dice(70) weekly intent; :213 j95dice(22) surprise; :61 habit count; jagent.js:101 agSlot uniform khắc; jgreet gmTick stay .35.
OUT of scope (body / world rules, not choices): illness/death j13, jmort; court mood j55 moodMonth; world events (world-events worker).

## COUNTS (gap table summary)
CONSORT 128 acts: YES 34 · PARTIAL 62 · NO 32 | MAID 46: YES 6 · PARTIAL 20 · NO 20 | SERVANT/EUNUCH (mirror of 46): YES 0 · PARTIAL 9 · NO 37 | EMPEROR 19: YES 4 · PARTIAL 6 · NO 9 | THÁI HẬU 14: YES 1 · PARTIAL 4 · NO 9 | HOÀNG HẬU 8 (HH-only): YES 1 · PARTIAL 6 · NO 1 | flat rolls still deciding NPC acts (not muted): ≈ 110 sites in §8 | AG-HAP '!' sources: 6 (4 dice-driven → agent deeds, 2 calendar kept).


## 9. AG-HAP — Dư đồ '!' sources (jact.js adHapRoll :119-146, jact2 AD_HAP_FIX) → which agent deed replaces each
Today: count per buổi = roll(BAL.ad.hapP 65) ? (roll(hap2 35) ? 2 : 1) : 0 (jact.js:134), shuffled candidates, re-rolled every buổi; agOn mutes none of it.
| '!' id | chosen today | fires | replaced by (agent deed, real people, real place/khắc) |
|---|---|---|---|
| emp (stroll) | W.emp==="vuon" && roll(AD.strollP 80), first slot (jact:127) | PEND.adStroll | the Emperor's DAY PLAN slot at vuon (deed "stroll") — '!' iff his plan puts him there this buổi; no roll |
| quarrel | candidate whenever ≥2 free consorts, always at vuon (jact:130) | mkP rvquarrel | a planned NPC deed provoke / humil (AGSOC) whose doer AND target are both at that place that buổi (real grudge = agSpite > 0, real ghen) |
| gossip | first place with ≥2 consorts (jact:131) | intelLearn / overhear | a planned gossip deed (AGSOC gossip) or a jgreet NPC↔NPC meet at that place: real people, real facts (intelLearn on the doer) |
| favour | q72CanOffer + 4 shuffled places (jact:132-133) | q72Offer | a planned NPC deed with need ally/safe aimed at her (help/follow/visit) or jgreet approach to her: the quest giver is the doer, at her planned place |
| fest | AD_HAP_FIX calendar (jact2:45) | FESTEV + mkEv AS_J7F | keep (calendar = real world event) |
| cold | AD_HAP_FIX night + evFresh (jact2:64) | mkEv coldvisit | the lãnh cung consort's own planned deed (petition BAL.tw.cold) at lc |
| (new) maid tea | — | — | an NPC maid's planned "tea" at the Emperor's place (jagmaid amDecide) |
| (new) WORLD WINDOW | — | — | world-events worker (review/world-events): its window SHOW slot via AD_HAP_FIX/AD_HAP_FIRE; NPC reactions via worldPlanW(p,grp) read by the day planner |
Rule after AG-ALL: '!' at place k this buổi ⇔ some agent's plan has a witnessable deed at k this buổi (or a fixed/world entry). No floor, no cap by dice; a quiet buổi has none; a happening stays next buổi iff the doer's plan keeps her there (persistence = the plan, never a re-roll). Two-way: the player's own deeds are seen the same way (agSeeHer).


## 10. DESIGN (one core) + SPLIT
### 10.1 One core (part A builds it FIRST, then B and C plug in)
- File jagday.js (loaded after jagent/jagemp/jagmaid/jgreet). Group of a person: `agGrp(p)` → "consort" | "hh" (consort who holds the seat; she gets consort options + HH options) | "maid" | "srv" | "emp" | "th".
- Option providers: `agReg(grp, key, fn)` where fn(p, N, ctx) returns options `{k, t, u, tag, at(kh)→place, act, run(p,t)→text}`; `run` MUST call the player's own act function (twDo / runAct ACT / srvCards handler / judge / empAct / giveTo / shop buy / study / toilette / rest) with its real cost and odds — no copy of a formula. jagent's AGSELF/AGSOC/effort become the first "consort" providers (no rewrite).
- Needs per group: `agNeedsG(p)` = jagent agNeeds for women (+ rank goal, money, Sức), maid/srv needs from their stats (Chủ tin / lòng, công lao, Sức, Bạc, his regard `sung`, ally, spite), Emperor = jagemp needs (rest, duty, desire, heirs, harmony), Thái hậu = order / heirs / clan.
- DAY PLAN (OD ~13:40Z): at the first buổi of each day `agDay()` draws for every agent a plan of 4 slots {b, pl, k, t, why} — for each buổi: pick a need (agPw over needs + routine), then an option by mindPick (jmind slip); place = option.at; "no goal" slot = the old placeWhere table as weights. Saved in S.ag.day (lazy, old saves load). Each buổi `placeWhere` reads the plan (W[id] = slot.pl) instead of re-rolling. Re-plan (BAL.ag.day.replan, small, weighted by need change) on: an event touching her, the player's deed at her, her deed failing, a WORLD WINDOW start (`worldPlanW(p,grp)` muls / forced slots — interface agreed with session_01UV1SzgiXvVVqaBb1b4oYFK).
- Execution: the existing jagent pend/land/witness path (S.ag.pend, agLand, agWatch, agSeeHer) carries every group's deed; the ledger gets the act + why; perf counters __agMs extended to the day draw (budget BAL.ag.perf; the day draw is sliced like agSlice).
- AG-HAP: adHapRoll → agHap(): '!' list = witnessable planned deeds of this buổi + AD_HAP_FIX. Off switch BAL.ag.on=0 keeps every old path.
- Every number in BAL.ag (jbal2), every player-visible line from VANPHONG / existing strings; no new UI (the '!' and the witness card are existing kit).
### 10.2 Split (same branch review/ag-all, one design, one reviewer)
| part | owner | scope | depends on |
|---|---|---|---|
| A core + consort + HH + TH + Emperor | this worker | jagday core (agGrp, agReg, agNeedsG, day plan, placeWhere from plan, re-plan, worldPlanW read); consort missing acts (study jlevel, shop/gift, toilette, rest, Tranh sủng/Chặn ngự giá, Mua chuộc, Rút thẻ, admon); HH acts (judge/conf/reward/pardon/cutpay/admon as options, remove j8:431/456/457, j20:15, j75:188 rolls); TH acts (gift, admon, release, garden); Emperor plan (stroll, visit NPC palaces too, tea, summons, bestow by regard) | — (first commit = interface stub within ~1 h) |
| B maid + servant/eunuch | helper 1 | providers "maid" and "srv": every §2 act for NPC maids (needs: Chủ tin, công lao, Sức, Bạc, regard), servants mirror; NPC Sức/Tài/Sắc for staff (lazy); remove §8 maid/servant rolls (j14:254, j10 servMonth, maidLoveMonth, mlFeud/mlHit dice → choices) | A interface |
| C schemes/harm + AG-HAP | helper 2 | ACT harm table (bribe, block, musk, catswap, ksab, kpoison, pond, kframe, takeaway, vp, plant, steal/road, gift) + jpoison/jsteal as consort options inside the motive gate (remove j8.js:398-399 4 % gate, j8:489 steal roll); agHap '!' from planned deeds; jact strollP/hapP removed; tests | A interface |
Test (all parts): dev/test/ag-all.test — per group, histogram of chosen acts over N days (bot), no NPC-only hidden act (every chosen k maps to a player button), old save loads, perf p95 ≤ BAL.ag.perf.p95.

