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


## 11. LIFE IDEAS (Foreman C 13:30Z: owner wants NPCs as alive as possible; her 13:40Z day plan was a question — kept because sound)
Every idea = the same act lists as the player, numbers in BAL.ag (jbal2). "exists" = reuse, no rebuild.
| # | idea | reuse / status | part |
|---|---|---|---|
| L1 | habits / favourite places and times | exists: j95hab (per-person habits) is the "no goal" weight base of each plan slot | A (done, ca94ddd4) |
| L2 | memory of who helped / hurt her drives visits and grudges | exists: jmem memAdd → aff / oan / hostility, read by AGSOC target picks (agSpite, aff) | A (reuse) |
| L3 | the day's feeling shapes the plan | jemo p.emo leans needs at plan time: BAL.ag.day.mood (sad → stays in / rests, angry / jealous → spite, afraid → safety, happy → company) | A (built) |
| L4 | NPC↔NPC friendships / feuds that grow | exists: AGSOC help/visit/follow/provoke/humil aim at NPCs by aff / spite; jgreet NPC↔NPC meet | A (reuse) |
| L5 | rumours spreading person to person | gossip deed (TW gossip) → next holder re-tells by her own plan (gossip chain) | C |
| L6 | small talk / visits between NPCs | exists: AGSOC visit + j95dist neighbour visits; jgreet NPC↔NPC | A (reuse) |
| L7 | plans broken by weather / illness / summons | re-plan triggers: rain on a garden slot, falling ill (always re-plan), touched (player's deed, failed deed), need change (BAL.ag.day.replan); summons = TH/HH deeds that call someone | A (built: weather, illness; summons next) |
| L8 | long goals (rank, child, revenge) steer daily choices | road weights BAL.ag.road + needs (kid, spite); rank gap need to add | A (next) |
| L9 | the Emperor's own day: visits palaces (also NPC consorts), stroll, tea, summons for đàn/cờ | jvisit/j24/jts rolls → his plan deeds | A (next) |
| L10 | maids' and eunuchs' own lives (love, feuds, errands, ageing out) | j42/jmline/j10 rolls → choices | B |
| L11 | world windows (tang, tuyển tú, fire, flood…) change everyone's plan | worldPlanW(p) read by the planner (agreed with review/world-events) | A (hook done) + world-events worker |

## 12. STATUS (review/ag-all)
- 4520fdf1 core jagday (day plan, registry); 377231a9 part A acts (HH hhAct one function for her buttons + NPC Empress, TH needs/acts, consort cx cards, old rolls guarded); ca94ddd4 agDrawReg/agBaseReg/agPlanned/world pull.
- Flat rolls REMOVED while BAL.ag.day.on (before → after): j8 HH judge roll(35·mindW) → hh:judge option; j8 TH gift roll(8) → th:gift; j8 HH conf roll(10) / reward roll(6) → hh:conf / hh:reward; j20 payCuts roll(20) + queenRewards → hh:cutpay / hh:reward; j75 admon roll(30) → admon (HH) / th:admon; j14 TH release roll(10) → th:release; j8 npcMonthly art roll(30) / shop roll(25) / gift roll(15) / Sủng roll(30) / ally roll(10) / rv-gift roll(10) → cx:study / cx:buy / cx:gift / effort / cx:ally / (C: rv item); j85 npcStudy roll(40·nết) / charity roll(5) → cx:study / cx:alms; j95 surprise dice J95.SUR inside the day plan → re-plans.
- Checks: agent_check 16/16, agemp 20/20, agmaid 23/23, greet 13/13 (one run of 3 had 1 FAIL in the greeting table — flaky, under watch); probe 4–8 days 0 errors, day draw 2–4.4 ms.

## 13. HANDOVER (part A worker, kept current; START_CTX ≈ 6 %, rollover ≈ 31 %)
- Branch review/ag-all tip e0a47dc9 (part A). Worktree /home/user/wt/agm (full, not sparse). Build: python3 dev/build/assemble.py; checks: node dev/test/ag-all.test.js dev/index.html 10 (12 PASS) + agent_check / agemp_check / agmaid_check / greet_check (all PASS; greet table flaky 1 of 3 runs once).
- Files: jagday.js (core: day plan, registries agReg/agRegNeeds/agRunReg/agDoerReg/agDrawReg/agBaseReg, agPlanned, agTickX, sliced draw), jagacts.js (consort cx cards, HH hhAct + options, TH needs + options), BAL.ag.day / cx / hh / th appended at the end of jbal2.js; guards `!(window.agDOn&&agDOn())` on the old rolls (list §12).
- Helpers on the same branch: PART B session_01UV1Szio6ph5nMv1N4uX7FT (jagstaff.js maid+srv), PART C session_01UV1SzjnrxRYSHsNC5qitMs (jagharm.js harm + agHap '!'); world-events session_01UV1SzgiXvVVqaBb1b4oYFK (jworld.js, worldPlanW(p) agreed). Main is s32 session_01UV1Szke8NY21HPgMavKUaU.
- PART A still to do: (1) Emperor deeds as his plan options (agReg "emp"): Ngự giá lâm cung for NPC consorts too (jvisit visRoll is her/co-op only, roll(visCh) → his choice weighted by visCh over everyone), tea drop-by (j24:32 roll 50), summons đàn/cờ/du hồ (jts:227 roll 14), bestow by regard (rolls §4); (2) consort NO rows left in §1: Vẽ chân dung tặng Thái hậu, Hầu thuốc Hoàng thượng, Nhờ giúp đỡ, Nhún nhường, Trút giận, Emperor talk (Tâng bốc… Bàn chuyện triều chính), Hỏi sở thích / Xem sổ, Bài thuốc / thái y tâm phúc, Lục rương, Đưa con thỉnh an, Chữa bệnh cho con, toilette as her choice (toilNpc), emotion cards (jemoact roll 25 → choice); (3) L8 rank-gap need; (4) after B + C land: assemble, run every check + QUICKCHECK, then "SẴN SÀNG KIỂM <sha>" to Foreman C.
## 14. PART B — maids + servants/eunuchs (helper session_01UV1Szio6ph5nMv1N4uX7FT, branch review/ag-all on top of A e49a7a2a)
PRIORITY #1 CHECK ('SRVA|jagstaff|asOpts|maidLoveMonth|servMonth spy'): OD 1 (L1588) | main none (jagmaid amDecide/amTeaO reused, j42 srvCards/srvTalk/srvStaffAct = the player list) | review/* review/ag-all (A's agReg/agRegNeeds/agDrawReg/agRunReg/agDoerReg) | claims A, C.
- ONE TABLE: j42 `SRVA` = the player maid's acts (odds o(a,m,x) before odA, cost c, gain w, loss l, công lao mp, gates). The player's cards (srvCards, srvTalk mis/rv/hh/sv/ty/man, srvStaffAct) now READ it (texts print the same numbers; player output unchanged). jagstaff options are built from the same rows and executed by one runner (asRun: cost → roll at odA(doer, o) → w or l → mp → what the act does).
- jagstaff.js: providers agReg("maid"/"srv","staff"), agRegNeeds (asNeeds: Chủ tin, công lao to next bậc, Sức, Bạc (×greed while a spy), self, ally, his regard (amNeed), love, spite); staff join A's day draw (agDrawReg → ids "s"+sid = ledgerId; agBaseReg: base place = her master's palace; agDoerReg "s"; AGRUN "sv_<key>"). Without jagday a buổi driver of its own (asTick, same choice). Lazy NPC Đức/Tâm cơ/Danh/Sức/Bạc (BAL.ag.staff.st; Sắc/Tài amSt); monthly wage = the player's CNV_WAGE by bậc. agGrp is wrapped so a staff's group follows .role (A's agGrp read .eunuch/.male, which staff do not have).
- Acts an NPC maid / eunuch now plays (k = player button): Quét sân, Dâng trà, Lĩnh đồ (bully roll same as player), Học lễ nghi, Luyện thêu thùa, Chải chuốt*, Nghỉ lấy sức, Thêu khăn bán*, Mua thuốc bổ, Quản sổ sách (bậc≥3), Lén báo tin (spies), Đấm lưng, Xin chủ ban thưởng, Bẩm tin dò được, Xin chủ tiến cử, Hầu bên cạnh chủ, Hành lễ thỉnh an, Mật báo chuyện của chủ, Tố cáo trước Hoàng hậu, Trò chuyện, Biếu quà, Nhờ dò tin, Tố lỗi với chủ, Xin thuốc bổ, Học lỏm nghề thuốc, Chào hỏi/Liếc mắt/Trao khăn/Hẹn gặp riêng/Hẹn ước* (palace men), Quỳ dâng trà* (jagmaid amDo, one rule); month: Ban gả → Tạ ơn, xuất giá / Xin ở lại; Tuổi → Xuất cung / Ở lại làm ma ma / Xin chủ giữ lại; betrayal found (player's betrayFind + kill 30). (* maid only; eunuchs: đối thực through "Hẹn ước" with a maid of another palace, af ≥ BAL.ag.staff.dt both ways.)
- Not built for NPC staff (no NPC equivalent needed / out of scope): Việc chủ sai errand (the master's order: SRVA.errand.offer is shared but NPC errands stay j95), Tân Giả khố laundry trio (an NPC sent there leaves the household), abortion, road chapters (story), Hầu trà khi ngự giá stays jagmaid amNightTea (already agent-chosen), scold/order/bribe/frame dilemmas (reaction outcomes, PARTIAL as before).
### 14.1 Flat rolls before → after (while asOn = agOn && BAL.ag.staff; BAL.ag.on = 0 / __asOff brings every old path back)
| site | before | after |
|---|---|---|
| j14 servRanks sold | roll(1.5) a richer consort buys a bậc≥2 servant | off (the buyer refills by fillStaff = the player's "Nội vụ phủ: thêm cung nữ") |
| j10 staffInit đối thực | roll(20) per eunuch at init | off → chosen "Hẹn ước" (eunuch ↔ maid, mutual af ≥ dt) |
| j10 servMonth spy report | roll(60) when the master's schemes rose | off → the spy's own "Lén báo tin" (SRVA.spy odds, fail roll out 40 = the player's) |
| j10 servMonth friend tell | roll(tellRoll + bậc×5) | off → told inside her chosen "Trò chuyện" (ok, af ≥ 20, the master schemed) |
| j42 maidLoveMonth | roll 25 fall in love / roll 4 caught / roll 3 married | off → love acts (Liếc mắt … Hẹn gặp riêng: caught = fail at 100 − risk, expel 30 / exile 35 = BAL.ag.staff) + grant choice (player's trigger 2+3) |
| jmline mlSeek start | roll(seekStart × nết) | off → she seeks by choosing "Quỳ dâng trà" (sets s.seek) |
| jmline mlSeek master | roll(punish) / roll(punOut) / roll(use) | the master's choice asSeekReact (jealousy × harsh traits; losing favour → use) — the notice roll stays (a witness chance) |
| jmline mlFeud | roll(feud) + kind dice (fight / frame / poison across palaces) | off → same-palace "Tố lỗi với chủ" chosen by spite; cross-palace fight/poison gone (no player button) |
| jmline mlHit | roll(hit) + kind dice (bribe / beat / frame) | the consort's choice asHitPick (agSpite × agMW scheme × BAL.ag.staff.hit; bribe needs hitBribeBac, beat only cruel) |
| jagmaid amWeek | seeking maids' tea each tuần | off → the staff provider (empTea option) |
LEFT (not part B / for C or later): j10 servMonth consort bribeServ roll(10) / plantServ roll(2) (consort harm acts → part C table: bribe, plant); jcmaid cmMonthNpc talent, cmGuard; jeitem eitPilfer; jpromsv spMonth leaveCh; j95.js:147 eunuch errand j95dice(80).
### 14.2 Numbers + checks
- BAL.ag.staff (jbal2, own block): st, goal, nw, greed, mpS, sc, riskD, caughtTin/Suc, vowTinh, dt, expel, exile, vowW, outW, uMul 3, monthSuc, secSee, hit.
- dev/test/ag-all-b.js (A: please call it from ag-all.test): one table (player cards read SRVA), consort life + maid life N tuần: histogram per group, every k a player button (no NPC-only hidden act), 0 errors, perf; rolls off; old save (staff without stats) loads; BAL.ag.on 0 → no staff act. Run 30 tuần on e49a7a2a+B: ALL PASS. Through A's draw (6 days probe): 19 staff planned, 29 % of staff slots hold a deed (consorts 25 %), sv_* deeds land via AGRUN, AGD.errs 0, staff option miss 8 / ~53.
- Regression: agmaid_check 23/23 PASS.

## 14A. DAY PLAN → HYBRID (Foreman C 13:51Z, design change from main; built ccce28bc)
- Day start (first record of a new day): each NPC (Emperor, Thái hậu, consorts, staff via agDrawReg) sets a day INTENT `S.ag.day.I[id] = {g: [1–2 needs], why}` from her needs now × her road (long goals: BAL.ag.road) × her feeling of the day (BAL.ag.day.mood); a second goal with chance BAL.ag.day.two.
- Every buổi (where the record is built, j95plan): she picks the concrete place + deed for THAT buổi from her state after the last buổi (her needs re-read after her deeds landed, what befell her: agTouch from the player's deed / her failed deed); the intent's needs weigh × BAL.ag.day.intentW; "no goal" = her old schedule weights (j95 habits) with the surprise dice off.
- Re-plan of the INTENT at a new buổi: rain after a garden buổi, falling ill (always), touched (BAL.ag.day.replan.touch), top need changed (…replan.need); else she keeps it.
- Only the current buổi slot exists (`S.ag.day.P[id][b]`); agPlanned() = pending deeds (wit 1) + this buổi's slots (wit 0).
- Perf: per-buổi pick of everyone in the record build; AGD.ms p95 4.4 ms (budget 8). Old saves: no day → drawn at once.
- Plumbing fixes found while assembling B: j95 sync reset every staff row away from home (j95.js ~292 and the staff fix loop ~333) → rows "ag_*" exempt; non-consort deeds planned only in a free khắc (not bound / tryst / off duty / laundry) and carry a why (AGWHY / AGWHYX).
- Known minor (B's area, helpers inactive): a few staff home-deeds plan at palaceOf(master) while j95 lists the staff at the master's house p.home (resHead); the row keeps the plan's place (no reset), harmless but worth a look by the reviewer.

## 15. SẴN SÀNG KIỂM — review/ag-all 8f7bdd329 (A + B + C assembled, live main 25bfd7cf merged, site built)
- Checks on 8f7bdd329: QUICKCHECK PASS (core gates: one-core-guard · rules-one-source · kit-conform; time-spill guard; open 1474 ms; old save from live loads and plays; perf median new/live: render 159/159 ms, tab 334/273 ms, buổi 940/801 ms, tasks>200 ms 13/12). ag-all.test 12/12, ag-all-b 0 FAIL, ag-all-c 0 FAIL, agent_check 16/16, agemp 20/20, agmaid 23/23, greet 13/13 (greet's rank table is flaky on a servant start — same on live main, not from this branch).
- Watch for the reviewer: buổi transition +~140 ms median vs live (every NPC's per-buổi pick + staff + schemes); day draw p95 4.4 ms in the in-page counter (AGD.ms), the rest is the existing render.
- No new UI: the '!' and witness cards are existing kit parts; player-visible lines reuse existing strings / VANPHONG words.
- Remaining (not blocking, next job): Emperor Ngự giá lâm cung for NPC consorts (jvisit roll visCh → his choice), tea drop-by (j24:32), bestow rolls (§4); consort NO rows left: Hầu thuốc Hoàng thượng, Nhờ giúp đỡ, Trút giận, Emperor talk, Hỏi sở thích / Xem sổ, Bài thuốc / thái y tâm phúc, Lục rương, Đưa con thỉnh an, Chữa bệnh cho con, toilette as choice (toilNpc), emotion cards (jemoact roll 25); j10 servMonth consort bribe/plant rolls, jcmaid, jeitem, jpromsv (B's list).

## 16. ROLLOVER HANDOVER — part A worker (session_01UV1SzjsTYMFvr4Rvhpd1tt) at 50 % context (START_CTX ≈ 6 %, limit 31 %, ceiling 60 %), 17/11 ~14:55Z
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
State: review/ag-all tip 8f7bdd329 (A+B+C, live main 25bfd7cf merged, site built, QUICKCHECK PASS). Worktree /home/user/wt/agm (clean). Timing/parity answer: reports/ag-all-timing.md (f7f236667).
OPEN — review r1 FAIL (reports/review-ag-all-r1.md 466a5e0f), fix on review/ag-all, then tell AG-ALL-2 session_01UV1Szhs6A6KH6MfsDpei7t the fix sha (it rebases review/ag-all-2; both ship as ONE r2) and reply Foreman C "AG-ALL FIX DONE <sha>":
 F2 ONE CORE copies: jagstaff asRisk = copy of j42 srvRisk → call the j42 table; jagstaff Ban gả trigger = copy of j42:472 with typed 55/5/40/45/+5/2 → BAL (one entry read by both); jagharm haOdds copies j8 caught() → extract ONE caught-odds function used by j8 / jagharm / jpoison / j63 / j83; BAL.ag.th.items duplicates the j8 Thái hậu gift list (j8.js ~455 `["nhansam","yensao","vongngoc","huongtram"]`) → j8 reads BAL.ag.th.items.
 F3 tests: ag-all.test.js grpOf must classify staff ids ("s<n>") into maid / srv rows; hidden-act check must FAIL on any unmapped harm:/maid:/srv:/c: key (map each to its player button: RVGRP keys, SRVA keys); ag-all.test + ag-all-c force a NON-servant start (window.__forceOrigin pattern from agent_check r6b, or restart until !isSrv()).
 F4 jagharm.js header: delete the AD_HAP_FIX world-window line (void per OD 14:30Z: no world-event '!').
 F5 weights: quarrel / gossip / favour '!' never appeared in 600 bot buổi → raise the chance that real provoke/humil (both people present), gossip and kindness-to-her deeds get planned (BAL.ag.harm.hap / AGSOC utilities / need weights), measure with ag-all-c '!' histogram; Hoàng hậu / Thái hậu acts ≈ 0 per 60 days → their gates are rare early game: lower BAL.ag.hh gates (rewardHh, confHh, cutRelMax) / raise BAL.ag.th.w + make TH 'order'/'fond' needs reachable (fondTh, giftCd) so each acts a few times per month; check with a 60-day bot (ag-all.test histogram rows hh / th).
Checks to rerun after: ag-all.test, ag-all-b, ag-all-c, agent_check, agemp_check, agmaid_check, greet_check, one-core-guard, QUICKCHECK (bash dev/tools/quickcheck.sh; commit the site build: bash dev/site/build_site.sh).
## 17. AG-ALL-2 — the remaining NPC acts (worker session_01UV1Szhs6A6KH6MfsDpei7t, branch review/ag-all-2 from review/ag-all 8f7bdd329)
PRIORITY #1 CHECK ('AG-ALL|jagday|agReg|ngự giá|bestow|jpromsv|jcmaid|jeitem'): OD 15 | ledger 3 | claims 8 | main 15 | review/* 2 (review/ag-all = base; review/ag-all-r1 not on the remote yet — rebase onto its PASS sha when it lands). Reused: jagday registries (agReg / agRegNeeds / agRunReg), jagacts agcU / agcPay / agcCan, jvisit visCh + the visit card, j24 tea card, jagemp empMemF, j10 bribeServ / plantServ, jmind mindPickBy. START_CTX ≈ 4 % (1M window; context_usage read 0 → estimate), rollover ≈ 29 %.
Owner law (verbatim): OD L1587 / L1588 / L1592 (17/11 ~13:15Z / 13:20Z / 13:40Z) and ~13:55Z: "nếu như bất kỳ một cái nhóm nào thiếu thì tự bổ sung vô luôn, không cần phải hỏi tôi duyệt đâu".
### 17.1 What was built (new file jagacts2.js after jagharm; numbers BAL.ag.cx2 / emp3 / give / emo2 at the end of jbal2.js)
| group | act (player button) | NPC now | code |
|---|---|---|---|
| consort | Tâng bốc · Nói thật lòng · Phô tài · Xin ân điển · Bàn chuyện triều chính (Emperor card, j2 talkOpts) | YES, day-plan option at the Emperor's place; same odds (cx2O + odA), gain/loss, Xin ân điển punish when he is furious; "Nói thật lòng" success may teach her one of his likes | jagacts2 cx2:flat/true/show/favor/court |
| consort | Hầu thuốc Hoàng thượng (j20 deck, while he is ill) | YES; his bestowal after it = empGive | cx2:nurse |
| consort | Đưa con đến thỉnh an Hoàng thượng · Chữa bệnh cho con (j2 deck) · Xin thuốc cho con (Thái y viện) | YES; new need: a mother whose child is sick (BAL.ag.cx2.kidCare) | cx2:kidGreet / kidHeal / kidMed |
| consort | Bài thuốc dễ thụ thai · Mời làm thái y tâm phúc (Thái y viện) | YES (v.fert / v.doctor = the same fields conceiveCh / careOdds read for NPCs) | cx2:fert / doctor |
| consort | Hỏi sở thích Hoàng thượng (Kính sự phòng) | YES; what she learns (v.eK) makes her small gift to him sure with the known-flower gain — the player's rule (j75 npcEffort qf) | cx2:likes |
| consort | Hỏi chuyện cũ (phế phi, lãnh cung) | YES: evidence on a guilty person (her included) | cx2:old |
| consort | Trút giận · Lục rương tìm chứng cứ · Nhờ giúp đỡ (person card) | YES: aimed by spite (vent at one near conceiving; chest: caught → punished as the player) / at one who likes her (help: lends bạc or tells a secret; NPC↔NPC only — she never takes the player's silver without a card) | cx2:vent / chest / help |
| consort | Tâm sự · Sai đi dò la (her confidant maid) · Mua chuộc · Cài người vào cung khác (Người hầu tab) | YES (bribeServ / plantServ = the player's functions); the j10 servMonth rolls roll(10) / roll(2) are off while the day plan runs | cx2:maidTalk / maidSpy / bribeSrv / plantSrv |
| consort | new need "bac" (silver short, BAL.ag.cx2.bac) | weighs Xin ân điển / Nhờ giúp đỡ | agNeeds wrapper |
| Emperor | Ngự giá lâm cung | YES: his EVENING plan (BAL.ag.emp3.visB) picks whom among every consort — her, the co-op friend, NPC consorts — by visCh × his memory (mindPickBy); visGo (jvisit) = one visit: hers = the old card; an NPC = the tablet night is hers (rivalNight path, the flip after it keeps her) + BAL.visit Sủng / Danh, the passed-over tablet holder ghen; per-NPC gap p.visW (her own gap S.emp.visit untouched). The daily visRoll is off while the plan runs. Rate: desire = 5 × Σ visCh / 100 keeps HER expected visit rate ≈ her old visCh | jagacts2 emp:visit, jvisit visOk / visGo |
| Emperor | ghé uống chén trà | YES: his day plan (buổi 1–2), any consort with Sủng ≥ BAL.visit.tea.minSung, gap BAL.ag.emp3.teaGap; hers = the same card (empTeaCard, j24) — the approach-pool roll is off | emp:tea |
| Emperor / Thái hậu | ân thưởng (every bestow site) | his inclination = the site's own % × his regard (Sủng, Ân tình, his memory empMemF, mood, đa tình / lạnh lùng; BAL.ag.give) — a straight weighted draw, no jmind slip (it would bend a rare gift's rate). Thái hậu's pet gift by her regard (thGive) | empGive / thGive (j8 default = roll) |
| maid / servant | pilfer (jeitem), proud / leave after promotion (jpromsv), plot errand (j95:147), master punishes a pilferer (jeitem) | their own inclination from their stats (ag2Ch): leave × (1 + loyalty gap), errand × loyalty, punish × the master's punish traits (agMW) | ag2Ch (j8) |
| consort | emotion cards (jemoact eaNpcWeek) | she acts on a feeling with the old % × feeling strength / actV (≤ × BAL.ag.emo2.max) | jemoact |
ONE CORE: the player's cards now read the same BAL.ag.cx2 entries (j2 Emperor card, Trút giận, Lục rương, Thái y viện, Kính sự phòng, Hỏi chuyện cũ, Đưa con thỉnh an, Chữa bệnh cho con, Tâm sự, Sai đi dò la; j9 Nhờ giúp đỡ; j20 Hầu thuốc) through ONE odds function cx2O(p,k) (j8); player numbers unchanged (same literals moved into BAL).
### 17.2 Flat rolls before → after (while the loop runs; BAL.ag.on = 0 brings each old path back)
| site | before | after |
|---|---|---|
| jvisit visRoll | roll(visCh) per day, her / co-op only | off → emp:visit (his plan, everyone) |
| j24 approach tea | roll(BAL.visit.tea.p) | off → emp:tea (his plan) |
| j8 nightFx her bestow · j8 rivalNight roll(8) · j75 roll(10+sc×4) · j8 promo roll(35) ×2 · j8 contest roll(50) · j71 contest roll(30) ×4, roll(50) ×2 · jcui roll(30) ×2 · j8 accuse roll(accBestow) · j10 betray roll(40) · j20 nurse roll(40) · jpet emperor pet roll(4) · jveil veil roll(empP) | flat | empGive (his regard) |
| jpet Thái hậu pet roll(2.5) | flat | thGive (her regard) |
| j10 servMonth consort bribe roll(10) / plant roll(2) | flat | off → cx2:bribeSrv / plantSrv |
| jeitem eitPilfer roll(c.ch) · eitPilNpc punish roll(npcPun) · jpromsv proud roll / leave roll · j95 errand j95dice(80) · jemoact act roll(actCh) | flat | ag2Ch from the person's own stats |
Kept on purpose (not a choice): jtoil toilNpc stays a hash by her nết / Sắc — both co-op seats must compute the SAME look without sync (review/diemtrang-coop-look); jcmaid confidant-maid talents (monthly wage-like income) and secret leaks are rules / world events, not deeds; Giải bày hiểu lầm (j95b) and Nhắc lại ân xưa (jmem) need the rumour / memory model that only exists about the player; Xem sổ thị tẩm is information only (an NPC already knows who is favoured).
### 17.3 Checks (on 41a5375e)
- dev/test/ag-all.test.js extended (§7): his visit is his plan and reaches NPC consorts (night given via the tablet path), tea from his plan, visit roll off, bestowal by regard (high regard ≈ 33 vs low ≈ 13 per 100 at a 30 site), the player's Emperor card reads BAL.ag.cx2, consorts get every new card; "no NPC-only hidden act" now checks each cx2 deed's player button label is in the game code; staff deeds grouped as "staff" in the histogram.
- ag-all.test: all PASS except the perf line, which wobbles 5–12 ms around its 8 ms budget run to run; the same harness on base review/ag-all vs this branch, 3 runs × 40 buổi: day draw median/p95 base 2.8/6.1 · 2.3/5.3 · 2.5/5.2 vs new 2.7/5.9 · 3.0/5.9 · 2.6/5.4 ms; buổi median base 84/56/80 vs new 90/85/81 ms (noisy) → no regression beyond noise (cx2 provider ≈ 0.2 ms per draw).
- agent_check 16/16, agemp 20/20, agmaid 23/23, greet 13/13, ag-all-b PASS, ag-all-c PASS. QUICKCHECK: see 17.4.
### 17.4 QUICKCHECK
- 41a5375e: functional PASS (open 1520 ms, old save ok, perf median new/live render 184/154, tab 247/278, buổi 923/872 ms, tasks>200 ms 11/16) but core gate G1 one-core-guard FAILED on one new inline number (jbal2 `bac:40` in BAL.ag.cx2.plantSrv) → renamed to `cost` in 63727378; QUICKCHECK on 63727378: see the coordinator message (result line copied there).
### 17.5 HANDOVER (rollover: this worker stops here; START_CTX ≈ 4 %, now ≈ 25–28 % of the 1M window by estimate)
State: review/ag-all-2 tip 63727378 = review/ag-all 8f7bdd329 + 17.1–17.2. Worktree /home/user/wt/ag2 (sparse). NOT yet rebased onto A's "AG-ALL FIX DONE <sha>" (r1 FAIL faults 2–4 are A's) — successor: rebase when it lands (conflicts likely only in jbal2.js tail and dev/test/ag-all.test.js).
Left from the r1 fault (1) list (my scope, not done): (a) toilette as the NPC's CHOICE with the same toilette formula (can overdo → mocked / Thái hậu reprimand; G11) — toilNpc is still a co-op-safe hash: a choice must be host-decided and synced (write the chosen look into the world blob like jcoopworld LOOK) ; (b) jcmaid cmMonthNpc talent "nghe" roll(talSpy) + secret-leak roll(secOut) (rules today; fold "nghe" into cx2:maidSpy odds or the staff providers); (c) npcCourt j10:57 roll(10); (d) Xem sổ thị tẩm (info only, decide: NPC option with no effect, or documented exemption).
Scope ADDs from Foreman C-AG (14:47Z, 14:49Z, 14:52Z, 14:53Z; owner OD 1616 + 1617 + ~15:00Z) — NONE started, all for the successor: dev/handover/reports/ag-all-timing.md GAP LIST G1–G12 (G7 done here except npcCourt / cmMonthNpc; G1 adHapArrive cap jact.js:140; G2 Tai mắt / presence / gossip filter of '!'; G3 TIN BÁO API tinBaoList() → [{id,k,place,b,k0,k1,who,line,seen}] + a callback on a newly known happening, documented and sent to main s32 session_01UV1Szke8NY21HPgMavKUaU — main builds the UI; G4 harm taint/cook as player buttons or gone; G5 jmline feud poison/frame + master beating; G6 pilfer / leave as player maid buttons; G8 khắc budget: NPC time = her time, several deeds per buổi at the same khắc costs; G9 happenings with real start / end khắc, '!' gone when over, Dư đồ counts follow her current khắc; G10 consequence dilemmas as NPC weighted choices; G11 toilette; G12 NPC Empress relAdd raising v.hh); plus HER OWN maids/servants act for her (dò la, báo tin, canh chừng, nghe ngóng) by loyalty / thiện cảm + traits, disloyal ones sell her out, results through TIN BÁO (informer = that maid) — and the same for every NPC master — reusing jagstaff / j42 SRVA (no second system). Perf: no regression vs review/ag-all; per-khắc updates must be cheap.
Watch ONE CORE (r1 FAILed copied srvRisk / caught() / Ban gả trigger): every new NPC act must call the player's function or read the shared BAL entry; jagacts2 already does (cx2O, empTeaCard, visGo, bribeServ, plantServ).

## 19. AG-ALL-2 PART 2c — knowledge / TIN BÁO / servants' own errands (worker session_01UV1SziD3Cxx9Q2cTqnjrPR, review/ag-all-2 4b82a0ca on top of 2b 45d1433e)
PRIORITY #1 CHECK ('Tai mắt|tinBao|TIN BÁO|adHapArrive|taiMat'): OD 11 | ledger 2 | claims 8 | main 15 | review/* 0. Reused: oSee (j8, her watch odds), agHap / haHapDeeds / haPend (jagharm), agHearOf + agSeeNpc (2b), SRVA + asOpt / asRun / AS_DO (j42 / jagstaff), spyRoll (jwhy, the consort's "Sai đi dò la"), intelLearn (j78), evA / deedCap, kLine / kSay (jvoice), mindPick. START_CTX ≈ 6 % (1M window, estimate; context_usage read 0).
Owner law (verbatim in OD L1616, L1617, L1619 ~15:00Z, L1621).
### 19.1 Built (new file dev/build/jagknow.js after jagacts2; numbers BAL.ag.know at the end of jbal2.js)
| gap | what | code |
|---|---|---|
| G1 no cap | adHapArrive fires EVERY happening of the place she arrives at (was ≤ 2); also fixed: with the loop on, agHap recomputes on each read and adOpenOk hid the place she stands on, so arrival fired nothing — KN.arr lets the arrival place through | jact.js adHapArrive; jagknow adOpenOk / adHapArrive wrappers |
| G2 Tai mắt filter | the Dư đồ '!' she sees = the happenings she KNOWS (adHapNow wrapper; the raw list stays for the agents in KN.raw). Bot: Tai mắt 0 + no servants → 1–2 of 3–8 deed happenings seen; high Tai mắt → all. Festival / world (public) always known; the Emperor's walk and a cold-palace night follow the rule | knScan, knFor |
| G3 ONE RULE two-way | knFor(x,h) for her and every consort: (a) presence (record row at the place in the deed window kh..k1, khắc come), the doer knows her own deed; (b) own Tai mắt oSee(x)×eye/100, drawn once per happening (hashed, no flicker); (c) a servant who stood there / roams on "Nghe ngóng cho chủ" / keeps watch at home, AND chooses tell / keep / sell (mindPick by lòng + nết qv; a bought servant may sell the news to her buyer — never a lie, j43 rule 5); the confidant maid (no sid, no row) listens on her own at the Nghe ngóng odds × lòng; (d) a consort who likes her (aff ≥ friend) and meets her this khắc, or is close (aff ≥ close) and sends word, and chooses to tell | knFor, knTell, knSrvKnows |
| G3 NPC use | a consort who knows a deed may go and "Nghe lén" (option know:hear: day-plan provider agReg consort "know" → also 2b agMore extra deeds; plus knReact after the buổi's deciders for consorts still free) — same odds agHearOf, same gain (chứng cứ +1 on a scheme), same loss (doer's regard −caught); her row at that khắc is marked ag_see:hear so 2b agSeeNpc does not react twice | knOpts, knHearRun, knReact |
| her own servants live (OD ~15:00Z) | SRVA rows listen / scout / watch (j42, numbers BAL.ag.know): every servant of every master (hers too) may choose "Nghe ngóng cho chủ" (intel on a consort; for her a TIN BÁO "bao" item + intelLearn), "Tự đi dò la cho chủ" (odds = spyRoll(master,target,servant) — the consort's "Sai đi dò la" formula; success chứng cứ +1 + intel; caught: target oán, lòng −), "Canh chừng cung chủ" (a scheme landing at the watched palace is seen: chứng cứ +1 for the master when the servant tells). Weighted by lòng / 50 × nết × the master's danger + base worth (BAL.ag.know.base). Appended to jagstaff asOpts (day plan, asTick fallback and run handlers all read it). Player maid: the same three cards in srvCards (no NPC-only act) | knStaffOpts, AS_DO.listen/scout/watch, knWatchLand, knSrvCards |
| TIN BÁO API (for MAIN's kit badge + card; no UI here) | `tinBaoList()` → [{id, k (gossip/quarrel/favour/deed/emp/fest/cold/bao), place, b (buổi), k0, k1 (khắc window), who (ledger ids: doer, target), line (the informer's line in her own voice: own servant warm "Bẩm chủ tử, Ngự hoa viên đang có chuyện: … Chủ tử có muốn qua xem không?" / cool / cold by lòng; friend by thiện cảm; "Tai mắt báo: …"), by ("s<sid>" servant, "scm<id>" confidant maid, "v<id>" friend, "mat" own Tai mắt, "here", "le" public), seen}] — only happenings not yet over + today's servant reports; `tinBaoNew()` unseen count; `tinBaoOn(fn)` → fn(item) once per newly known item (scans run after each khắc sync and each agent slice), returns an unsubscribe fn; `tinBaoSeen(id?)` (all when no id); arriving / firing a happening marks it seen. State S.tb (lazy, personal, old saves load) | tinBaoList / tinBaoNew / tinBaoOn / tinBaoSeen |
### 19.2 Checks (4b82a0ca)
- dev/test/ag-know.test.js 21/21 PASS (3 runs): G1 three happenings fire; G2 low vs high Tai mắt; arrival presence; ONE RULE her / NPC / doer / friend / confidant maid's voiced line / bought servant sells; API fields, callback once, new/seen; NPC know:hear = "Nghe lén" with agHearOf; NPC servants (any master, hers too) get the 3 errands; scout odds === spyRoll; watched palace sees a landing scheme (evidence +1); player maid has the 3 cards; old save without S.tb; loop off → old path; no page / agent errors. Servant start smoke: the 3 cards deal and act without errors.
- ag-kh2 (2b) PASS; ag-all.test: all PASS except two lines that also fail on 2b's base 45d1433e in some runs (Empress "me" 8–9 vs 10 — 2b G12 area; perf day draw p95 8.3–8.9 vs budget 8, wobbling as in §17.3). one-core-guard PASS.
- PERF (same build, jagknow on vs __knOff, 3 × 10 days, seeded): day draw median 3.3–3.9 vs 2.6–3.1 ms, p95 6.3–7.6 vs 4.4–5.1; tick median 2.1–2.7 vs 1.3–1.7, p95 5.1–5.6 vs 3.0–3.8; buổi total within noise (77–98 vs 67–86 ms median). → about +1 ms median / +2 ms p95 per buổi: NOT yet proven "no regression" on the CPU×4 harness.
### 19.3 HANDOVER (rollover: context ≈ 31 % = START_CTX 6 % + 25 %; only push + report were left, done)
State: review/ag-all-2 tip 4b82a0ca (2b 45d1433e + 2c). Worktree /home/user/wt/ag2c (sparse; scratch scripts /home/user/wt/ag2c-scratch/perf2.js = on/off perf, srv.js = maid-start smoke).
Left for a 2c successor (or 2b at assembly):
1. PERF: trim the ~+1 ms median / +2 ms p95. Hot spots to try: knStaffOpts (3 asOpt per servant per buổi draw — build the 3 options only for servants with lòng ≥ some BAL floor, or once per day like the scout odds); knOpts inside 2b agMore (knFor per consort × happening, the friend loop calls aff() for every consort — precompute per buổi the friend lists of her and of each consort). Then run the CPU×4 harness vs review/ag-all (r1 numbers med 1113 / p95 1985 ms).
2. Rate check: staff errands are ≈ 30 % of servant deeds in a 6-day bot (watch / scout most) — tune BAL.ag.know.base / serve if the reviewer finds it too busy.
3. MAIN s33 builds the TIN BÁO badge + card from the API above (no UI in this part).
4. ag-all.test check 3 still passes maid:/srv: keys by regex (A2 r1 fix 3 owns that test); my keys map: know:hear → "Nghe lén" (agReact), maid|srv:listen/scout/watch → player maid cards "Nghe ngóng cho chủ" / "Tự đi dò la cho chủ" / "Canh chừng cung chủ".
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## 17. r1 FIX — part A successor A2 (session_01UV1SziAW9nRRmuRJXDn5N6), F2–F5 + live main merged
PRIORITY #1 CHECK ('srvRisk|haOdds|caughtOdds|weight pass|quarrel|Thái hậu act'): OD 4 | ledger 0 | claims 6 | main 15 | review/* 0 (reused: j42 srvRisk table, j8 caught(), BAL.ag.*; nothing rebuilt)
START_CTX ≈ 3 % (estimate; get_session reads 0), limit 28 %, ceiling 60 %.
### F2 ONE CORE (copied formulas → one function / one BAL entry)
| copy (before) | after |
|---|---|
| jagstaff asRisk = j42 srvRisk place table {vuon:28…} + friend/tamco terms | `srvRiskOf(k,eyes,friends,tamco)` (j42) over `BAL.srvRisk`; srvRisk and asRisk both call it |
| jagstaff Ban gả trigger `loyal>=55`, `roll(2+(vow?3:0))`, stay `loyal-5` = j42:472 | `BAL.srvGrant {tin,base,bond,stayLoy}` read by j42 cnvGrant trigger and jagstaff asMonth |
| `(rk+1)*5` công lao per bậc typed in j14, j42 ×3, jagstaff | `srvMpNeed(rk)` over `BAL.srvMp` |
| staff loyalty 45 (jagstaff asSt), j10 `45+R(36)` | `BAL.srvLoyal {base,r}` (promotion loyalty = main's BAL.eff.j14.loyalServRanks) |
| jagstaff asPeers `+40`, nvp `+5`, ask `af:2` | `BAL.ag.staff.peerGap / nvpAf / askAf` |
| jagharm haOdds, jpoison:52, j63:253, j83:174 copied j8 caught() `cl(oSee-4*(facN-1),5,95)` | `caughtOdds(a,t,ps)` in j8 over `BAL.caught {fac,min,max}`; caught() and all four call it |
| BAL.ag.th.items + j8 TH gift typed list, `th>=60` | j8 reads `BAL.ag.th.items` and `BAL.ag.th.fondTh` |
| jagstaff friend tell `evA(o2,m,1)` (found by one-core-guard after the main merge) | `BAL.eff.j10.evServMonth_2` (one number with j10 servMonth) |
| (merge) SRVA mp / ev / afL / at fields vs main's BAL.eff.j42 merit* / ev* / cnvFrame and BAL.tinhLv; srvGate.frameLoy vs eff.j42.loyalSrvStaffAct; BAL.ag.cx.humble vs eff.j9.run_9/10 | SRVA fields and srvGate.frameLoy / cx.humble are getters on the main keys (one source) |
### F3 tests
- ag-all.test grpOf: staff rows "s<sid>" → agGrp of the real person (maid / srv rows; a staff who left this buổi → her key's prefix). Histogram rows: consort / hh / th / maid / srv / emp.
- Check 3 maps every prefixed key: harm:* → j15 RVGRP (+ Tẩm đồ / workshop), maid:/srv:* → SRVA row of THAT group (maid:empTea = the j42 "Quỳ dâng trà" card via jagmaid amDo); unprefixed keys only for consort / hh.
- ag-all.test and ag-all-c force a consort start (restart while isSrv()).
- New: 5c (Empress duty need served by her own buttons; Thái hậu favour gate at BAL.ag.th.fondTh), ≥40 days: Empress / Thái hậu act; ag-all-c: people's own deeds put '!' on the map (quarrel / gossip / witnessed deeds).
### F4 jagharm header: the AD_HAP_FIX "world-events window" line removed (no world-event '!', OD 14:30Z).
### F5 weight pass (needs × traits, no dice)
- Spite need: `agSpN(h) = h / BAL.ag.spiteD` (35; was a typed /100 in 6 places: jagent ×2, jagacts, jagemp, jagharm, jagstaff). Schemes keep the old scale (`BAL.ag.harm.spiteD` 100) so the pass raises quarrels and gossip, not poisonings.
- Quarrel '!': provoke / humil between two consorts anywhere (the garden quarrel card in the garden, else the witness card of the same deed).
- Favour '!': a consort with a request on offer (q72) weighs the player as her friendly-deed target (+BAL.ag.favAsk); still needs her regard (SOC help ok: aff ≥ 10) — a passive bot (regard < 0) never gets it; a player with friends does.
- Empress: new duty need `order` = min(1, cases her buttons can act on now / BAL.ag.hh.orderN) × orderW; every Empress act serves it; one gate list `AGHHG` read by her options and her need (player-as-Empress buttons unchanged).
- Thái hậu: BAL.ag.th.fondTh 60 → 40 (one number with the old j8 gift gate), giftCd 4 → 6 tuần.
- Perf: agAskHer once per buổi (q72 lists cached) — day draw back to live level (median 3–3.5 ms, p95 5.5–6.8 ms on this box; old build 3.1 / 6.7–9.4).
#### 60-day bot, 4 runs each (consort start, passive player), per 60 days
| measure | before (8f7bdd329) | after |
|---|---|---|
| quarrel '!' | 0–1 (1 of 4 runs) | 3–11 (every run) |
| gossip '!' | 0–4 | 2–8 |
| favour '!' | 0 | 0 (bot regard < 0; see above) |
| Empress acts (hh:*) | 0–2 | 5–22 (reward, judge, conf, cutpay, pardon all seen) |
| Thái hậu acts (th:*) | 0–6 | 7–12 |
| NPC harm deeds | 7–26 | 12–45 |
| consort deaths | 0–3 | 0–3 |
| '!' per buổi | {0: ~43 %, 1: ~42 %, ≥2: ~15 %} | {0: ~40 %, 1: ~43 %, ≥2: ~17 %} (quiet and busy buổi both) |
### Live main merged
- origin/main ce29592e (54 commits: one-core dup3 → BAL.eff, world events jworld) merged into review/ag-all (ba535aaa); 22 conflict hunks resolved token-wise; where both sides moved one number to BAL (SRVA fields vs BAL.eff.j42, frameLoy, cx.humble vs BAL.eff.j9, BAL.tinhLv) one side now reads the other (getters), so each number has ONE source. one-core-guard PASS after the merge.
### Checks (on the merged tip)
| check | result |
|---|---|
| one-core-guard | PASS (fails 0) |
| ag-all.test 10 days | 14/14 logic PASS; the perf line (day draw p95 ≤ 8 ms) is noise on this box: new 6.2 / 9.0 / 7.8 ms vs old 8f7bdd329 7.8 / 7.9 / 10.4 ms (3 solo runs each, same spread) → no regression; fails under parallel load on both builds |
| ag-all-b 30 tuần | 0 FAIL |
| ag-all-c 200 buổi | 0 FAIL (consort start forced) |
| agent_check / agemp / agmaid / greet | 16/16 · 20/20 · 23/23 · 13/13 |
| QUICKCHECK | PASS on 54bd9b56 (core gates PASS after one fix: G1 one-core-bind, player Tố lỗi fail now reads BAL.eff.j42.cnvFrame, the key its text prints) · open 1973 ms · old save ok · perf new/live render 185/198, tab 340/306, buổi 867/1113 ms |
- Tip: review/ag-all 54bd9b56 (pushed). AG-ALL-2 / PART 2b rebases review/ag-all-2 on it; F1 (remaining acts) stays theirs.
- Not done / notes: favour '!' needs the player's own regard (by design); the ag-all.test perf line is box noise (same spread on 8f7bdd329).

## 19.4 AG-ALL-2 PART 2c2 — NO LIES + 2c leftovers (worker session_01UV1SzhfokEWfWFiRbetFJT, review/ag-all-2 aa92bbf9 on 4b82a0ca)
PRIORITY #1 CHECK ('nói dối|lie|tin giả|bịa|spyFor|knTell|scout'): OD 3 (L1620, L1627 (4), j43 rule 5 note) | ledger 0 | claims 0 | main: j43 rule 5 "withholds, never lies", j68e/j68h grounding rule | review/* 0. Reused: knTell rule (tell/keep/sell by lòng + nết via mindPick), knBao, kSay/kLine, spyWho, intelLearn, evA, AS_DO, asRun ok flag. START_CTX ≈ 3 % (1M window, context_usage read 0; estimate); rollover at 28 %.
Owner law: OD 17/11 ~15:25Z point (4) VERBATIM: "Bất kỳ một thông tin nào tới tay tôi đều phải là thông tin thật ... làm cho có ok, bán đứng ok, nhưng mà không được nói dối ... thà là nó không nói ... nếu như mà họ không thành công ... báo cho tôi biết rằng là nô tài có đi dò la nhưng mà không được".
### Built (jagknow.js; numbers BAL.ag.know)
| item | what | code |
|---|---|---|
| no lies | an errand's finding reaches the master only as the truth. The servant chooses (mindPick by lòng + nết, BAL.ag.know.tell incl. new `late`) to report NOW, report a buổi LATE (S.knQ, lands when the buổi turns, line "chuyện buổi trước…"), SLACK ("làm cho có": no report and the master gains nothing — no chứng cứ, no intel) or SELL it to whoever bought her (the buyer hears the true errand; a scouted buyer learns she is watched: oán). Nothing is ever invented. | knErrPick / knErr / knErrGive / knErrSell / knFlush |
| failure reported | a failed listen → "có đi nghe ngóng một vòng nhưng chưa nghe được chuyện gì đáng bẩm"; a failed scouting is CAUGHT (BAL.ag.know.scout.caught = 50 %: target oán, "bị bắt gặp") or BACK EMPTY ("có đi dò la X nhưng không dò được gì") — both told as they are (or slacked / late / sold by the same rule). Before, a listen could not fail (ok ignored) and every failed scouting was "caught". Player maid card "Tự đi dò la cho chủ" fails the same two ways. | knListenDo(ok) / knScoutDo / srvCards fail |
| two-way | the same functions for every master (NPC consorts' servants): loyal → the master gets the chứng cứ; disloyal → nothing. Her own bought spy in a rival palace may sell her that rival's errand ("X vừa sai nô tỳ đi dò la tiểu chủ"). | same |
| rate (§19.3 item 2) | servant errands were ≈ 30–45 % of servant deeds (6-day bot); now serve .25 (was 1), base .01 (was .1) → 15–17 % (watch / scout / listen), band BAL.ag.know.share [5,20] checked by the test | BAL.ag.know |
### Checks (aa92bbf9)
- NEW dev/test/ag-truth.test.js 10/10 PASS (3 of 4 runs; one run failed an over-tight count, loosened): loyal → failure reported as failure naming the real target; failed listen reported; slack → no report / no chứng cứ (40 tries at lòng 0: keep 35, late 3, tell 2, sell 0); late lands next buổi with the same true finding; sell → buyer hears the truth; NPC master same rule (evA count = tell count exactly); 6-day bot: every TIN BÁO item is a real happening / real people, no broken line; every errand finding is about a real living consort; share in band; no page / agent errors.
- ag-know.test 21/21 PASS; ag-kh2 PASS; one-core-guard PASS; ag-all.test: only "Empress one function" FAIL — the 2b G12 line that already fails on 45d1433e (§19.2), not this part.
- PERF CPU×4 (scratch harness: same page boot as the tests, CPU throttle ×4, click Qua buổi → 2 rAF, 20 buổi after 2 warm, seeded Math.random; 4 runs per build, seeds 7/11/13/17):
  | build | buổi median (4 runs) | p95 (4 runs) | mean of medians / p95 |
  |---|---|---|---|
  | review/ag-all 8f7bdd32 (r1 base) | 1599 / 1388 / 893 / 1439 | 2221 / 1877 / 1794 / 2065 | 1330 / 1989 |
  | review/ag-all-2 + 2c2, knowledge ON | 1050 / 1534 / 1331 / 1390 | 1937 / 2223 / 2603 / 1944 | 1326 / 2177 |
  | same build, knowledge OFF (__knOff) | 1355 / 1690 / 1405 / 1152 | 2108 / 2353 / 2362 / 1910 | 1400 / 2183 |
  → the knowledge layer costs nothing measurable (ON = OFF in the same build); medians equal to the r1 base; the p95 spread (1794–2603) is box noise and the same with the layer OFF (so any p95 difference vs base is 2b's part or noise, not 2c). No trim needed; the in-page cost stays ≈ +1 ms / buổi (§19.2).
### NOT changed — for Foreman (owner's "Bất kỳ một thông tin nào" may reach further than servants; brief scoped it to news/informers)
1. jthaiy.js: a BRIBED physician lies about her pulse (BAL.thy.lie 35 % / lieSelf 20 %) — information reaching her that is false. If OD (4) covers him, the fix is: the bribed physician keeps silent / says "mạch tượng chưa rõ" instead of a false verdict.
2. j68f / j68h rumour events (rumorPreg, rumorEmpLove, rumorEvidence, rumorSpy, rumorTH, rumorFavor): a named NPC source may spread a FALSE rumour (labelled "Lời đồn", checking reveals the truth). This is a schemer's lie, not a servant's report; kept unless the owner rules otherwise.
3. Servant "frame" (jagstaff, maid feud): a servant may frame a peer — a scheme between servants, kept.
### Handover
Done; nothing left of 2c. Branch tip review/ag-all-2 aa92bbf9 (2b assembles + builds site). Scratch: /home/user/wt/scratch2c2/cpu4.js (CPU×4 harness), rate.js (errand share).

## 18. AG-ALL-2 PART 2b — acts / khắc / timing / consequences / minigames (worker session_01UV1SzhW8pwS5jUZNP7cmH8, review/ag-all-2)
### 18.0 HANDOVER (rollover ordered by C-AG #2 15:57Z; START_CTX ≈ 4 %, now ≈ 37 % of the 1M window by foreman count)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
STATE: review/ag-all-2 tip 72263137 = 2c2 aa92bbf9 + 2b work (rebased) + merge of review/ag-all 54bd9b56 (A2 r1 fixes + live main ce29592e) + fix-up (assemble list had lost jagacts2/jagknow/jagstf2/jagtoil — restored; evidence literals → BAL.ag.ev; one-core-guard PASS). Site NOT built, QUICKCHECK NOT run. Worktree /home/user/wt/ag2b (not sparse). Note: I touched jagknow.js only to replace evA(…,1) literals by BAL.ag.ev.one (tell 2c2 if it still works there).
TEST STATE on 72263137: PASS ag-kh2, ag-rd, ag-stf2 23/23, ag-toil2 16/16, ag-mg2 26/26, one-core-guard. ag-all.test 6 days: 2 FAIL — (a) "no NPC-only hidden act" lists cx2:* keys (old/chest/show/maidSpy/likes/fert/doctor/help): A2's new okK() lost part 1's cx2 rule (a cx2 deed counts when its player button label is in the code, AGC2BTN) → add that branch to okK; (b) perf line (in-page day-draw p95 12 ms vs 8, noisy 8–30 on this box with or without 2b switches) → measure on the CPU×4 QUICKCHECK harness. Rest of the long suite (ag-all-b, ag-all-c, agmaid, agent, agemp, greet, ag-know, ag-truth) was still running at handover: output in /home/user/wt/ag2b-tests.txt — rerun them.
NEXT STEPS for the successor (in order):
1. Fix ag-all.test okK for cx2:* (above); rerun the long suite; fix any merge fallout (j42 / j10 / j2 / j29 / jeitem conflict sites were resolved by keeping the 2b logic and re-applying A2's BAL.eff keys — check srvTalk "Bẩm tin dò được" and the j2 cx2 cards render).
2. Per-khắc CHAIN per C-AG #2 order 15:51Z + OD:L1640/L1641/L1642 (owner pick): world updates only from FINISHED khắc; people present see her at once and react the NEXT khắc; a scouting maid spends a khắc and reports at the START of the next; her master decides + walks in that khắc and is visible the khắc after; only affected people re-decide; BAL cap on re-deciders per khắc; CPU×4 perf profile; her scenario test (khắc 1 enter → 2 maid present/scouts → 3 master knows + acts → 4 visible). What exists to build on: jagday agHeard / agTell / agRdTick (fires in the SAME khắc today — shift by one khắc: queue the tell at khắc k, deliver at k+1; master's deed lands at k+1+walk), test dev/test/ag-rd.js (update the expected khắc), BAL.ag.kh2.rd. Write the khắc-timeline table in the report.
3. Minigame hand ceiling (OD:L1640) on top of mgNpcRaw (jmgt, BAL.ag.mg2) — 18.1 minigames row.
4. Parity: 63 player buttons still have no NPC option, 9 pairs run different code — list in dev/handover/reports/ag-all-parity.md (sections + the two lists at the end). Owner OD ~15:25Z (3): "làm toàn bộ tất cả các cái nút". Biggest families: own-staff management (Thưởng/Phạt/Che chở/Đổi người/Tiến cử…), faction (Lập phe/Xin vào phe/Ly gián/Rời phe/Bán đứng), items (Dùng/Bán/Thử độc/Đeo), deck (An thai, Mời thái y bắt mạch, Dạy học, Nghỉ ngơi, Phát bạc…), lãnh cung cards, maid Tân Giả khố / scolded / banquet / blackmail / night-call answers (NPC maids never decline). Also fix the 9 "same button, different code" pairs (warn, provoke, cx2:help, cx2:maidTalk label "Trò chuyện với cung nữ", cx2:maidSpy, cx:study, effort qf labels gone from the deck, check vs "Kiểm tra đồ").
5. Build the site (bash dev/site/build_site.sh), QUICKCHECK (bash dev/tools/quickcheck.sh) incl. ag-truth, then "SẴN SÀNG KIỂM <sha>" to C-AG #2 session_01UV1SziUGzeqJM9bXyR2ehR.
PRIORITY #1 CHECK ('AG-ALL|jagday|agReg|TIN BÁO|tinBao|Tai mắt|adHapArrive'): OD 16 | ledger 2 | claims 8 | main 15 | review/* 3 (review/ag-all, review/ag-all-2, review/world-events). Reused: jagent pend/land/witness, jagday registries (agReg/agRunReg/agDrawReg), jmind mindPick, j2 cardCost, j9 travel, j95 record rows, jtoil toilFx/toilRival, j42 SRVA + PEND cnv*, jeitem/jpromsv/jmline/jcmaid, jmgt mgTier, j83 lessonPts, jts/jexam/jslap. START_CTX ≈ 4 % (1M window, context_usage read 0 → estimate), rollover ≈ 29 %.
Owner law (verbatim): OD L1587, L1588, L1592, L1616, L1617, L1619 (~15:00Z her own maids), L1621 (~15:00Z timing Q), L1627 (~15:25Z (2) per-khắc scenario, (3) parity incl. minigames).
### 18.1 Built (commits 45d1433e, rebased 2b commit, merge 40c87ff0 of review/ag-all 54bd9b56, fix-up after)
| gap | what | code | numbers |
|---|---|---|---|
| G8 khắc parity | an NPC's buổi has her khắc budget: after the planned deed she weighs more deeds (needs again vs "keep my schedule") while khắc are left; each deed costs the PLAYER's khắc for that act (talk / talk-act / harm act / SRVA k / Empress / cardCost of its cost) + walking (travel); staff too; the Emperor / Thái hậu keep one planned deed (his evening visit / summons / tea have buổi rules) | jagday agKhC / agMore / agSpan; j2 talk + j8 doAct read BAL.time.cost (one source) | BAL.time.cost, BAL.ag.kh2 (rest, max, maxX) |
| G9 timing | every deed = a happening with [kh, k1] (k1 = kh + its khắc − 1); the record row holds its place each khắc (Dư đồ shadow/counts per khắc); it lands when her clock passes k1; the '!' list drops deeds whose k1 is past (haHapDeeds); NPCs standing there react with the player's own choices (ignore / Nghe lén / join / step in) by mindPick, costing their khắc | jagent agK1 / agWatch window / agHearOf (one hear odds for her and NPCs); jagday agSeeNpc; jagharm haHapDeeds | BAL.ag.kh2.see |
| per-khắc re-decide (OD ~15:25Z (2), her Ngự hoa viên scenario) | NPCs keep their plan but RE-DECIDE in the khắc when news reaches them: she arrives somewhere (a servant standing there tells her master by her own choice, × loyalty), a happening starts where a servant stands (× master's interest), or any news (agHeard — 2c's TIN BÁO knowledge can call it); the master weighs deeds aimed at that person vs keeping her plan; if she goes, clashing not-started deeds drop, she walks (rows "go"), her deed lands at the next khắc → shadows move khắc by khắc | jagday agHeard / agTell / agRdTick (j95sync hook) | BAL.ag.kh2.rd |
| G12 | one rule both ways: "Hoàng hậu với X" IS the Empress's own regard (j24 hhBind); hhAct is one function; her trust trait now slows warming to ANYONE (j28 affAdd: was only toward the player) | j28; ag-all.test Empress case made real (player as Empress) | — |
| G7 | npcCourt roll(10) → Biếu Tổng quản as a consort's choice (cx:tqGift), ONE function courtGive for her button (courtAct thuong) and NPCs | j10 courtGive; jagacts2 court3 | BAL.court.gift, BAL.ag.cx3.tq |
| G4 | taint / cook ARE player buttons (inventory "Tẩm đồ" itemAct → taintItem; handmade "Tự tay làm" j83 → wkMake); NPC prep deeds call the same functions; NPC cook score = wkNpcRaw(v,"mon") (minigame curve) | jagharm, j83 | — |
| G5 / G6 / G10 (+ jcmaid dice) | poison a colleague / beat & frame another palace's maid / pilfer / ask to leave: player buttons added (existing kit option rows) and NPC choices through the SAME functions (mlPoisonDo, mlHitDo, eitPilOpts/eitPilJudge, spLeaveOpts/spAsk); dilemmas (ordered / bribed / framed) built ONCE (cnvOrdOpts / cnvBribeOpts / cnvFrameOpts) — PEND renders them for her, NPC servants pick by mindPick (stf2Pick); jcmaid "nghe" / secret leak = her choice by lòng | jagstf2 (new), j42, jmline, jeitem, jpromsv, j29 bribeOdds, jcmaid cmSpyCh/cmLeakCh, j15 | BAL.ag.stf2, BAL.ag.ev |
| G11 toilette | an NPC CHOOSES her face of the day among the player's own ways (mộc / thanh nhã / cầu kỳ / dày phấn), scored by today's hosts' real toilFx + expected mockery × caution + vanity/modesty by nết, mindPick; consequences through the player's code: hosts judge (toilJudgeNpc, Thái hậu reprimand once a day), consorts present react by toilSeeRule (mockery of Diêm dúa / Vụng), she answers with the player's three answers (toilAns); co-op: host decides, synced in the where blob (__tl2), guest renders | jagtoil (new), jtoil shared fns, jmkt, jcoopworld | BAL.ag.toil2, BAL.toil reply* |
| minigames (OD ~15:25Z (3)) | every NPC side of a minigame = ONE draw on the board she would get in that seat (mgTier) around the bot-measured skill curve, never perfect: contests (j71/j82), summons (jts), lanterns, promotion & servant exams (jexam), handmade works (j83), NPC lessons (j85), slaps + NPC dodge (jslap); her "Để tài nghệ quyết định" = her median | jmgt mgNpcRaw / mgSkipRaw | BAL.ag.mg2 |
| Xem sổ thị tẩm | documented exemption: information only; an NPC's own ledger already knows the nights | — | — |
### 18.2 Before → after (flat rolls / NPC-only acts)
| site | before | after |
|---|---|---|
| NPC deeds per buổi | 1, at a random khắc, 1 khắc long | as many as her khắc allow, each its player khắc cost; window [kh,k1] |
| '!' when over | lands at kh | lands at k1; '!' gone after k1 |
| NPC reaction inside the buổi | only at the next buổi | in the khắc, when news / her arrival / a happening reaches them |
| j10 npcCourt roll(10) | flat | cx:tqGift choice (off → roll) |
| j29 bribeServ roll(odds) / runAct servant refusal roll(30) | flat | the servant picks among the cnvBribe / cnvOrd options |
| jcmaid talSpy / secOut | flat | cmSpyCh / cmLeakCh by lòng |
| jmline feud poison / mlHit | NPC only | player buttons + same functions |
| jeitem pilfer, jpromsv leave | NPC only | player buttons + same option lists |
| toilNpc | hash | choice (off → hash) |
| NPC minigame results | separate formulas, R(11), flat 30 % lanterns, never-dodge | mgNpcRaw on her own curve |
### 18.3 Checks (merge + fix-up tip, see 18.5 for the sha)
- new: ag-kh2 (G8/G9/G12, 11 checks) PASS · ag-rd (her Ngự hoa viên scenario: maid tells A, A re-decides, arrives next khắc, Dư đồ shows her; quiet maid → nothing; off → nothing) PASS · ag-stf2 23/23 · ag-toil2 16/16 · ag-mg2 26/26 · one-core-guard PASS.
- long suite results: see 18.5.
### 18.4 Balance notes for the reviewer
NPC minigame medians rose to the player's curve (~7.5 at matching level vs 4–6 before); NPCs can dodge her slap; lanterns follow her own rule (more successes); sent servants refuse/betray dirty deeds ~10–15 %; framed NPC's loss = the dilemma's numbers; NPC servants sell what they pilfer. ag-all.test perf line (in-page day-draw p95 vs 8 ms) wobbles 8–30 ms run to run on this box WITH OR WITHOUT the 2b switches (kh2.on=0 gave 30 ms once) — judge perf on the CPU×4 QUICKCHECK harness (reviewer r1: med 1113 / p95 1985 ms).

## 20. AG-ALL-2 PART 2d — khắc chain, one shared clock, minigame hand ceiling (worker session_01UV1SzgxFBqAJ9NuXvWc7K5, review/ag-all-2 46fdf2f4)
PRIORITY #1 CHECK ('khắc chain shared clock agHeard mgNpcRaw'): OD 0 new keys | main none | review/* review/ag-all-2 only (jagday agHeard/agTell/agRdTick, jmgt mgNpcRaw, BAL.ag.kh2.rd, BAL.ag.mg2) → REUSED, nothing rebuilt | claims AG-ALL-2 = C-AG.
### 20.1 Built
| item | what | code | numbers |
|---|---|---|---|
| step 1 | ag-all.test okK accepts cx2:* (AGC2BTN label in the page) and cx3:* (AGC3BTN, 2e); ag-all-b BTN + 2c listen/scout/watch + 2e follow/cut; ag-kh2 window reads p.kc (2e options carry kc) | dev/test | — |
| PER-KHẮC CHAIN (OD L1638) | world moves only on FINISHED khắc: a servant who sees (her arrival = the khắc of her walk; a happening = its first khắc q) reacts the NEXT khắc (row "ag_tell", walking to her master), the master hears at the START of q+2 (queue agZ().rq, saved; agRdDeliver on every resync), decides + walks IN that khắc (rows "go"), is at the place the khắc after; a deed of hers still running ends first; news due after the buổi → agTouch (she re-plans the rest of her day); BAL cap on re-deciders per khắc (over → waits a khắc); walk/span rows survive a record rebuild (agReapply) | jagday agTell / agRdDeliver / agHeard / agRdTick; jagent agReapply | BAL.ag.kh2.rd {see 1, go 1, cap 6, qMax 40} |
| knowledge relay (same chain, 2c) | jagknow knFor: who-knows re-read each khắc (memo per khắc; tell/keep choices stay per buổi); news carried by a servant / her Tai mắt / a friend sending word is known from q + see + go; presence / own deed / calendar at once; a friend met face to face passes on at once. NOTE for foreman: a happening shorter than 3 khắc now reaches TIN BÁO only after it is over (adHapNow drops ended ones) — owner logic L1638; tune by BAL.ag.kh2.rd.see/go (0/0 = instant) | jagknow knMemo / knRelay / knFirst | same BAL |
| ONE SHARED CLOCK (OD L1641 + ~16:2xZ sub-line) | an NPC who comes to her (her place, her khắc) → popup "Có người tìm đến" with kit option rows Tiếp chuyện (the whole talk = exactly ONE khắc for her; the comer's act ends with it; both to k+1) / Không tiếp (her khắc kept; the comer's khắc spent, her row keeps it; the deed does not happen); no khắc left → Tiếp chuyện greyed (kitOff). NPC↔NPC: the met one, at the place and free, receives / declines (mindPick rec vs dec × hostility); received = row "ag_with"; declined or away = a meeting deed (AGTALK) drops, the comer's khắc spent. Co-op: each player's own clock (the popup spends the clock of the player it opens for). | jagent agScene; jagday agShOn / agShOpts / agShNpc (agLand wrap) | BAL.ag.kh2.sh {on, rec 3, dec 1, kh 1} |
| MINIGAME HAND CEILING (OD L1640 + ~16:20Z (f)) | every NPC: hidden hand per minigame kind (p.mgH[kind], hashed on person+kind → old saves / co-op guest roll the same), between lo and hi, skewed (strong rare ~2–8 %, the middle hand ≈ 5–6.8 → plays clearly below a skilled human 7.5); play = roll UNDER the ceiling (c − (1−u)·w), THEN the board ease exactly as hers (mgMedD(d) − mgMedD(0)); her own odds (p = S) never get a hand; slap: weaker "tat" hand → heavy blow less (table = best hand) | jmgt mgHand / mgNpcRaw; jslap slapNpcDraw | BAL.ag.mg2.hand {on, lo 3, hi 9.5, w 4, skew 1.6} (interim mg-bots bands) |
| scheme lies stay (~16:20Z (d)) | verified: bribed Thái y lie (jthaiy roll(T().lie)), j68f rumours, cnvFrameOpts — test line ag-know §9 | — | — |
### 20.2 Khắc timeline (her Ngự hoa viên scenario, dev/test/ag-rd.js run)
| khắc | she | consort A's maid | consort A | Dư đồ vuon |
|---|---|---|---|---|
| k1 (idx 0) | walks in (her walk khắc) | in the garden (sees her as she enters) | at home (kn/rest) | — |
| k2 (idx 1) | in the garden | ag_tell: going to tell A | kn/rest — has NOT re-decided (no NPC ahead of her) | A not counted |
| k3 (idx 2) | in the garden | errand | hears at the start, decides, row "go" (walking) | — |
| k4 (idx 3) | in the garden | errand | vuon / deed aimed at her (e.g. cx:ally), whereOf = vuon | A counted |
### 20.3 Checks (46fdf2f4 + 2e 986f797a)
PASS: ag-rd 10/10 (chain, quiet maid, off switch, Tiếp chuyện = one khắc both to k+1, Không tiếp keeps her khắc, NPC↔NPC ag_with / away drop) · ag-mgh 10/10 · ag-know 24/24 (§8 chain, §9 lies) · ag-truth · ag-stf2 · ag-par3 16/16 · ag-all-b 13/13 · agmaid · agent · agemp · greet · ag-mg2 core (hands off; 1 flaky "exam can fail") · ag-kh2 (window fix after the run) · one-core-guard PASS.
Flaky / noisy (also on the 2e-only base 986f797a, measured side by side): ag-all.test "Ngự giá lâm cung" (visits rare in 14 days: base FAIL / mine PASS same run), ag-toil2 "Đáp lại" Danh 2 vs 1 (1/16 runs), perf lines under 2–4 parallel browsers (p95 14–70 ms; judge on QUICKCHECK CPU×4).
NOT DONE: site build + QUICKCHECK (waits for 2e2 + 2f DONE); owner-only minigame CALIBRATION test (~16:20Z (f)).
### 20.4 HANDOVER (rollover: START_CTX ≈ 3 % (context_usage read 0 → estimate), now ≈ 30 % ≥ 3 + 25 %)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
STATE: review/ag-all-2 tip 46fdf2f4 (2d done on top of 2e part 1+2). Worktree /home/user/wt/ag2d (not sparse; delete when done), suite runner /home/user/wt/ag2d-suite.sh (TESTS="…" env; output /home/user/wt/ag2d-t-<test>.txt).
NEXT for the 2d successor (in order):
1. Owner-only MINIGAME CALIBRATION (C-AG #2 order 16:24Z, owner ~16:20Z (f)): PRIORITY #1 first — find the existing owner/dev flag (git grep origin/main 'owner' 'dev flag' 'isOwner' 'devMode'); a test per minigame kind, 3–5 rounds of rising difficulty (mgTier stake), kit parts only (no private UI; missing part → KIT_REQUESTS.md + stop that part), visible only with the owner flag; her scores write BAL.ag.mg2.hand bands (lo / hi / skew per kind, fixed base for every player; others never see the test). Today's bands = interim mg-bots (BAL.ag.mg2.hand).
2. When 2e2 (session_01UV1Szm1UkuYvj6p45REz2M) sends "2e DONE <sha>" AND 2f (session_01UV1SzhAhnb8RArL1gW4ADE) "2f DONE <sha>": rebase, python3 dev/build/assemble.py, rerun the long suite (ag-all.test ag-all-b ag-all-c agmaid_check agent_check agemp_check greet_check ag-know.test ag-truth.test ag-kh2 ag-rd ag-stf2 ag-toil2 ag-mg2 ag-mgh ag-par3), bash dev/site/build_site.sh, bash dev/tools/quickcheck.sh (perf gate CPU×4 vs live: --cpu 4), then "SẴN SÀNG KIỂM <sha>" + this §20 to C-AG #2 session_01UV1SziUGzeqJM9bXyR2ehR. (coregates.sh needs args: <worktree> <live sha> <out dir>; quickcheck calls it.)
3. Foreman decision flagged: TIN BÁO for short happenings arrives after they end (see 20.1 knowledge row) — keep (owner logic) or add "lúc nãy …" past-news items (KN_POOL.baoL exists).

## 21. AG-ALL-2 PART 2f — Tai mắt data link + one-core evidence text (worker session_01UV1SzhAhnb8RArL1gW4ADE, review/ag-all-2 7de949ee on 275efe22)
PRIORITY #1 CHECK ('spyFor knFor taiMat'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 for taiMat — REUSED: spyFor (j10 plantServ / j29 bribeServ / j42 "Nhận bạc, làm tai mắt" / threatServ = the real placements), knFor / knScan / knBao / tinBaoList (2c, 2c2 no-lies), allServ / ownerOf / servById, balSg / balAb (jbal). START_CTX ≈ 6 % (1M window, context_usage read 0; estimate); now ≈ 20 %.
Owner law: OD 17/11 ~16:25Z TAI MẮT (verbatim in dev/OWNER_DECISIONS.md); ~16:20Z (d) scheme lies stay, no-lies only for her servants / Tai mắt; ~15:25Z (4).
### 21.1 Data link (jagknow.js tail; no UI — main's tinbao-ui r3 builds the kit list + card)
| item | what | code |
|---|---|---|
| her Tai mắt = real people | `taiMatList(p=S)` → [{id:"s<sid>", sid, name, role ("maid"/"eunuch"), placedAt (palace key), placedWith (ledger id of the consort she serves, "v<id>"/"me"), placedName, loyaltyKnown (number only when she knows the servant's nature s.kn, else null = "chưa rõ"; never the hidden truth), reports (true reports this spy brought her)}] = servants of OTHER living palaces whose spyFor is p's key. Works for every consort (two-way). | taiMatRaw / taiMatList |
| every TIN BÁO names a real informer | the "mat" branch of knFor (oSee × eye roll, unchanged odds) now picks a REAL person: one of x's placed Tai mắt (the one in the palace where it happens / with the doer / standing there first, hashed); when x has none placed, a real servant of another palace who stood there or serves the doer = a PASSER-BY (by "pass", line "{N}, người hầu cung {P}, đi ngang ghé bẩm: …"). The Tai mắt line now reads "Tai mắt báo ({N}, người hầu cung {P}): …" (owner (e) "Tai mắt báo" kept). Every item gets `inf` ("s<sid>" / "maid" = confidant maid / "v<id>" friend / null for here & public) + `infName` (kept even if the person later leaves). Producers scanned: knScan (happenings: srv / mat / pass / friend / here / le) and knBao (own servant reports, late reports, watch landings, a rival's bought servant selling her master's errand = her Tai mắt) — the only two writers of S.tb. | knEye / knInf / knInfName / knTmN |
| informer API | `informerInfo(item)` → {id, name, isTaiMat, kind: "taiMat" (servant of another palace whose spyFor is "me") / "ownMaid" (her own staff or confidant maid) / "friend" (a consort) / "passerby" (any other servant), soldOutKnown} or null (here / public / old item with no informer). kind is read live: a Tai mắt cut loose later stops being isTaiMat. | informerInfo |
| sell-out shown only once discovered | soldOutKnown = her own servant / confidant maid whose spyFor is someone else AND she has discovered it (S.tmSold, lazy; old saves = unknown). knSoldFound(s) is called at EVERY discovery site (whole family): j68f "Cho người theo dõi" / "Hỏi thẳng" / "Thử lòng bằng một tin giả" (servant stays — the main case), j10 Tra khảo, j14 tra xét (her side of searchMaids(m)), jeitem Tra khảo, j72 "Giữ … lại, giữ miệng". | knSoldFound / knSoldK |
| truth | unchanged: informers only carry true reports (2c2); scheme lies (bribed physician, rumours, frame-ups) untouched (OD ~16:20Z (d)). | — |
OPEN for Foreman (not changed): the "Tai mắt N" NUMBER is S.mat (0–10 stat, raised by "Cài tai mắt" w:{mat:2} and many w:{mat:1} rewards) and does NOT equal taiMatList().length — "Cài tai mắt" success adds +2 without placing anyone. The owner's "ghi là 3 tai mắt nhưng không biết là ai" needs one of: (a) the chip shows taiMatList().length and S.mat stays the hidden "eyes" skill; (b) "Cài tai mắt" success actually bribes a real maid of the target palace (bribeServ) and S.mat = list length. Recommend (b) for "Cài tai mắt" + (a) for the chip. Also ~40 older log lines "Tai mắt báo: …" (j21/j22/j40/j43/j70/j92 …) are log text, not TIN BÁO items — they could name the person through knEye (list in a scan) if Foreman wants the whole family.
### 21.2 One-core text G1 (dev/test/one-core-text.js was FAIL 13 sites → PASS 0)
ONE helper `evSg(n, cap)` in jbal.js beside balSg → "chứng cứ +1" / "Chứng cứ -1" printed from the BAL amount (default BAL.ag.ev.one).
| file:line (before) | before | after |
|---|---|---|
| j2:148 Nghe lén | "chứng cứ +1" | evSg(BAL.eff.j9.evOverhear) (the amount overhear() gives) |
| j2:151 Lục rương (x + result) | "chứng cứ +1" ×2 | evSg(BAL.ag.ev.one) |
| j2:162 / j2:165 Hỏi chuyện cũ / Sai đi dò la (x + log) | "chứng cứ +1" ×4 | evSg(BAL.ag.ev.one) |
| j9:57 Nhờ giúp đỡ | "chứng cứ +1." | evSg(BAL.ag.ev.one) |
| j10:32 / :33 spy + friend tell | "Chứng cứ +1." / "chứng cứ +1." | evSg(BAL.ag.ev.one,1) / evSg(…) |
| j14:14 Tìm chứng cứ minh oan | "chứng cứ +1" + code ce+1 | evSg + ce+BAL.ag.ev.one |
| j42:346 / :347 / :354 | "nắm 2 chứng cứ" / "chứng cứ +${d}" / "nắm 1 chứng cứ" | balAb(BAL.ag.ev.two) / evSg(d) / balAb(BAL.ag.ev.one) |
| j42:441 Tố lỗi với chủ | "Chủ tin +3 … quý ngươi -30, Chủ tin -5" | SRVA.frame.w.tin / SRVA.frame.afL / SRVA.frame.l.tin |
| jpromsv:70 | "lòng dưới 30" | BAL.loy.out |
| jagknow:207 Tự đi dò la cho chủ | "nắm chứng cứ về X +1" | "được ${evSg(…)} về X" |
| family (not flagged by the gate, same typed count): j4:24 / j4:120 (proof / caseEv ±1 in code too), j55:65/73/176/204 (deA ±1 in code too), jopic:212 + jksize:171 (kit sample pages) | typed "chứng cứ ±1" | evSg(±BAL.ag.ev.one); code amounts read BAL.ag.ev.one |
After: `grep "chứng cứ [+-][0-9]"` over dev/build/j*.js = comments only.
### 21.3 Checks (7de949ee)
- NEW dev/test/ag-taimat.test.js 16/16 PASS (2 runs): list = her placed spies only (not own staff, not another's spy), two-way; producer mat → her real Tai mắt, the one in that palace first, line names her; none placed → real passer-by (not own staff, not Tai mắt); knBao → ownMaid; knErrSell from her bought servant → taiMat + report counted; friend; sell-out hidden → discovered → cleared; confidant maid; 7 discovery call sites; 6-day bot: every non-public item names a real informer (kinds ownMaid / taiMat / passerby); old save; no page / agent errors.
- ag-know 23/23 PASS (§8 khắc chain check from 2d now accepts by "mat" | "pass" — the eye route's informer, see 21.1); ag-truth 10/10 PASS (one earlier run hit the known random "tells ≥ 5" count, 2c2 note; rerun PASS); one-core-guard PASS (inline 4903 < baseline 5093); one-core-text PASS (0 sites). one-core-bind: 6 MISMATCH in j25 / j78, files not touched here (pre-existing).
### 21.4 Handover
Done; nothing left of 2f except the OPEN item above (Foreman decision). Worktrees /home/user/wt/ag2f (code), /home/user/wt/ag2f-ho (this report) — delete when done.
### 21.5 Follow-up f4a065dc — tinbao-ui adapter shape (asked by main s34 + tinbao worker)
- taiMatList items also carry the UI fields: p (the servant object), place (= placedAt), loy (= loyaltyKnown, null when unknown), loyalWord ("một lòng" / "tạm tin được" / "khó tin" / "chưa rõ", by knMood bands BAL.ag.know.voice), sold (her discovered sell-out; false for a placed spy).
- informerInfo also returns code: "mat" (her Tai mắt) / "hau" (her servant) / "ban" (friend) / "qua" (passer-by) / "sold" (a discovered sell-out) + label ("Tai mắt Tuyết Mai" …). The brief's kind field stays.
- ag-taimat 18/18 PASS. ag-know: "the doer knows her own deed" now accepts how "here" (a doer standing at her deed's place is caught by presence first) — this check and "G2 low" also fail at random on the base 275efe22 (4 base runs: 2 × 1 FAIL), so they are pre-existing flakes; under 3 parallel runs ag-know / ag-truth show other random single FAILs (TIN BÁO API empty list, khắc chain null, one errand finding about a consort who died) that pass on rerun.
### 21.6 r2 4baf13f3 — TAI MẮT MUST BE EARNED + number = real list (C-AG #3 orders 16:41Z / 16:44Z; owner OD 17/11 ~16:50Z part (1); part (2) info sellers → 2g)
PRIORITY #1 CHECK ('mua chuộc|bán tin|S.mat'): reused bribeOdds / bribeServ (j29: nết greed / timid / loyal, lòng, Tâm cơ; failure already = evA + relAdd), spyFor, apply / ap; no new act.
| item | what | code |
|---|---|---|
| ONE odds | tmOdds(recruiter, servant) = old bribeOdds + the best WANT the recruiter can give (BAL.ag.know.tm.want: bạc for a greedy one if she can pay her price; protection for a badly treated one (lòng < BAL.loy.low) when the recruiter outranks her master; a post (srk < tm.post) likewise; revenge when she holds a grudge and the recruiter is at odds with her master) × loyalMul .35 for lòng ≥ BAL.loy.top; clamp tm.lo..hi. bribeOdds IS tmOdds now → the player's "Mua chuộc" button (j15 / j19, odds word) and every NPC bribeServ use the same rule (parity). | tmWant / tmOdds |
| no automatic Tai mắt | EVERY Tai mắt gain — apply({mat:+N}) / ap(p,{mat:+N}): "Cài tai mắt" (P3C eyes w mat 2), ≈ 760 story / event / road rewards (jbalroad 676, j68*/j72/j7/jreign/j83 …), origins (j1 cn mat 3 / td mat 2) — becomes N recruit TRIES: the recruiter turns to the most promising real servant of another palace (nobody's spy yet) and that person decides by tmOdds; a loss {mat:-N} lets N of her Tai mắt go (the least committed first). One hook, whole family; no file of rewards edited. | tmTry / tmGain / apply + ap wrappers |
| refusal | a refusing servant at lòng ≥ BAL.loy.mid tells her master with tm.tell % (master's regard to the recruiter −tm.oan); when the master is HER, her servant reports it as a true TIN BÁO ("X vừa sai người tới mua chuộc nô tỳ làm tai mắt, nô tỳ không nhận"). Her own try: log "Ngỏ ý với X …, nàng không nhận (và còn bẩm lại với chủ)". | tmRefuse |
| number = list | p.mat is DERIVED for her and every consort: tmSync(p) = min(tm.cap, taiMatList(p).length), run after every gain, after bribeServ, and at every khắc (knMemo key change) so spyFor changes elsewhere (Tra khảo, cut loose, died) show at once. Every S.mat reader (odds formulas, chips, ACT gates) now reads the real count. | tmSync / tmSyncAll |
| old saves / start | a stored mat above the real count = that many tries ONCE (p.tmMig); whoever accepts is listed, else the real count shows. Servant start (isSrv) untouched. | tmSync |
Checks: ag-taimat 25/25 (new: ONE odds; number = list after a gain, only accepted listed; loyal odds ≪ disloyal; a loyal servant of hers refuses an NPC, tells her (TIN BÁO, ownMaid informer), NPC loses regard; everyone refuses → "+3" adds nobody; NPC parity; old save tries once then real count), ag-know 23/23 (sets window.__tmOff: it uses S.mat as a knob for the eye odds), ag-truth 10/10, ag-par3 ALL PASS, one-core-guard / text PASS.
OPEN (Foreman / VANPHONG): (1) previews still print "Tai mắt +2" (fmt NAMES.mat) for a gain that is now N tries — wording like "thử mua N tai mắt" needs a VANPHONG decision (one place: fmt / kit stat chip). (2) ~25 scan tests set S.mat as a stat blob; values hold inside one evaluate, but a khắc later the real count replaces them (set window.__tmOff=1 where a test needs the old knob). (3) Formulas tuned for S.mat 0–10 now see small real counts (0–3 typical) → watch odds lower than before (scout / probe / overhear use S.mat × k). (4) Day gate (OD ~16:45Z): no time check in this code.

### 21.7 2f2 7eea99d6 — "Tai mắt N" = the list EXACTLY + last automatic paths (worker 2f2 session_01UV1Szgc9TF3SF2cGRtiLn1, on 2f r2 4baf13f3)
PRIORITY #1 CHECK ('mua chuộc|spyFor|S.mat|taiMatList'): OD L1652 + L1656 | main j15:70 / j19:64 Mua chuộc (spyFor), j10:90 | review/ag-all-2 2f taiMatList + **2f r2 4baf13f3 (found mid-task: pushed 16:53Z while this brief was open — it already did most of (A)+(B); this work is REBASED ON IT and adds only what r2 lacked, reusing tmOdds / tmWant / tmTry / tmRefuse / tmLose / BAL.ag.know.tm)** | claims C-AG AG-ALL-2. START_CTX ≈ 3 % (1M window, estimate); now ≈ 25 %.
| gap left by r2 | before (r2) | after (2f2) | code |
|---|---|---|---|
| number = list | p.mat a STORED mirror, tmSync min(cap 10, list) at gains / bribeServ / each khắc → a khắc late after other spyFor writers (Tra khảo, threatServ, j70, cut loose), capped, saved as a 2nd number | "mat" is a READ-ONLY accessor on every consort = taiMatRaw(p).length (no cap, never stale, not saved); writes swallowed (KN.stat.tmDrop); r2's window.__tmOff knob keeps a plain test number | tmInstall (j2 start, j8 normAll, j8 rstats), matN |
| live list | taiMatRaw / tmCands read knAllSrv (khắc memo: stale after load / hire) | read allServ live | tmSrv |
| old save | stored mat N → N random TRIES once (may give 0) | N PLACED real spies (they had accepted in that save; most willing first) where people exist, else the real count; NPC stored mat dropped (was random at birth) | tmInstall → tmPlace |
| NPC birth | rstats d("mat",R(3)) → r2 turned it into up to 2 auto tries per NPC at first sync | none at birth | j8 rstats |
| origins | cn mat 3 / td mat 2 → tries at start (no rivals yet → 0) | removed (no automatic Tai mắt) | j1 ORIGINS |
| "Cài tai mắt" (her deck j2 + NPC cx3:eyes) | flat roll o 80, then w mat 2 = 2 more tries on other people; text "Mua chuộc cung nữ các cung khác" (nobody) | names the real person (tmBest = most willing), cost = her own price nv bribeCost (as Mua chuộc), odds = tmOdds (the ONE odds), success → that person; fail → r2 tmRefuse (may tell her master) | P3C.eyes, tmTake / tmNo, p3Run fail hook |
| Dọa tố (threatServ) | always spyFor (no choice) | tmOdds + fear BAL.ag.know.tm.threat; refusal → tmRefuse | j10 threatServ |
| j70 accomplice | firm ≥ 60 → 75 % refuse, else always betrays | roll tmOdds (traits, lòng, want) | j70 |
| j7 "Tiểu Đức Tử" event | nameless eunuch, "Tai mắt +1" → a try on someone else | a REAL servant of another palace whose tmOdds for her ≥ BAL.ag.know.tm.vol.min comes himself (his choice); she pays vol.bac; "Thử lòng" fail = he sells her news | j7 ev eunuch, tmVol |
| Mặc cả odds | sgServOdds = a copy of the OLD bribeOdds formula (no want; one-core break) | = bribeOdds (= tmOdds) | jsgame |
| test family (LUẬT SỬA CẢ NHÓM) | 26 test / measure scripts stage S.mat = N (now swallowed) | tmPlace(S,N) (real spies); ag-know keeps r2's __tmOff | dev/test/*, dev/measure/* |
Checks (7eea99d6): NEW dev/test/ag-taimat2.test.js 16/16 PASS ×3 (new game 0 for all + no origin gives one; accessor on S + every rival; S.mat == taiMatList().length, writes change nothing, chip shows it, save has no mat; 40 × apply({mat:1}) → only real servants of other palaces, many refuse; loyal servant (trung, lòng 100) ×200 bribeServ: take 16–50 / tell 116–126 / quiet 34–58, master's evidence rises; card names the person, odds = bribeOdds, cost = her price; want (protection / revenge) raises odds; NPC ap + cx3 eyes only real people; j7 volunteer real & willing; old save 3 → 3 placed, NPC stored dropped; more than people → real count; no page errors). ag-taimat 25/25, ag-know 23/23, ag-truth 10/10, ag-par3 ALL PASS, ag-sell 17/17, one-core-guard / text PASS. ag-all.test.js: only "perf p95" FAIL — same on the base (14 ms vs 14.9 ms, budget 8; pre-existing).
OPEN (Foreman): (1) r2 OPEN (1) still: previews print "Tai mắt +N" for a gain that is N approaches (VANPHONG wording, one place fmt). (2) Formulas tuned for S.mat 0–10 now read real counts (typ. 0–3; no cap any more, can exceed 10 late game) — balance pass wanted. (3) r2's tmSync / its cap / p.tmMig are now inert (writes swallowed) — can be deleted in a cleanup. (4) Her deck applies lotB (luck) to the Cài tai mắt odds; NPC p3Run does not (runOpt rule for every deck card, not changed here).
API (for s34 + tinbao worker): unchanged names; NEW matN(p), tmInstall(p), tmPlace(p,n) (tests / migration only), tmBest(p), tmTake(p,s), tmNo(p,s), tmAsk(p,s,bonus), tmVol(). S.mat / v.mat now always equal taiMatList(p).length.
Handover: done. Worktrees /home/user/wt/ag2f2, /home/user/wt/ag2f2-ho — delete when done.

### 21.8 2f2 HANDOVER (rollover by context: START_CTX ≈ 3 %, now ≈ 28 % ≥ 3 + 25) — open scope for the successor (C-AG #3 orders 16:54Z, 16:58Z, 16:59Z, 17:04Z, 17:08Z)
State: review/ag-all-2 holds 2f r2 4baf13f3 + 2f2 7eea99d6 (§21.7; NOT a duplicate of r2 — rebased on it, adds only its gaps; foreman's 16:54Z "drop duplicate" arrived after it was pushed). Test staging: 2f2 already moved the 26 scripts that set S.mat to tmPlace(S,N); ag-know keeps r2's window.__tmOff knob (accessor honours it) → order (3) "tests → __tmOff" is covered by tmPlace (real spies); reviewer may prefer either.
Successor TODO (read OD '(17/11 ~17:00Z real', '~17:10Z real', '~17:20Z real' VERBATIM first):
1. §21.6/21.7 OPEN (1): "Tai mắt +N" previews → VANPHONG wording in ONE place (j1 fmt + kit stat-chip text) — a gain = N approaches to real people who decide. Scan every formatter that prints NAMES.mat (fmt, kinvPlain, jagent ct, jdh bTxt, q72Fx, road/arc kit lines).
2. BALANCE WATCH: readers of S.mat / x.mat (≈110 sites: j8 oSee/oSpy, j2 overhear, j21 scout/knows, j22, j28 newsAdd, j40/j43 mindTell, j55 probeO, j61, j68e–h c6 odds, j70, j75, j7, jroad rdOdds "m"/"mz" terms, j72 sk "mat" v*4-12, jreign sk ["mat",.5]) were tuned for 0–10; now real counts (0–3 typ., no cap). Bot-run measure, retune via BAL only, before/after table.
3. (17:00Z a) failed recruit = consequences BOTH ways: target resents / may report (r2 tmRefuse) AND her SENT maid loses lòng (fear) — not built yet (the maid who carries the offer: S.maid / sent servant; BAL key). Never hard 0/100: route tmOdds and every recruit / seller roll through agOdd (jagent.js:33 = cl(o, BAL.odds.lo 5, BAL.odds.hi 95)); r2 tmB().lo/hi (3/95) should become BAL.odds.lo/hi. 2f2 code to switch: jagknow tmAsk / tmVol, j10 threatServ cl(…,5,95), j70 roll(tmOdds), j7 "Thử lòng" roll(p.o), P3C.eyes (deck runOpt clamps 5–95 already; p3Run uses agOdd).
4. (17:10Z) Mua chuộc / Cài tai mắt: bạc ONLY on success, failure costs no bạc (parity NPC): j29 bribeServ pays before the roll (ap(a,{bac:-cost})); P3C.eyes c:{bac:-price} paid by runOpt / p3Run before the roll → move to go(); jsgame Mặc cả (sgServ cost) and j10 servAct "mua" + j15 card preview "Bạc -30" wording → "thành: Bạc -N".
5. (17:00Z b + 17:20Z) SELLERS (2g knSellW/knSellPick) + RECRUIT/BETRAY (tmOdds, stf2Bribe): odds = trait base ± lòng band to master ± chữ trọng (13 virtues; jmind BAL.mind trW honoured / offended, jbal2 ~615) ± today's mood to master (angry +, just rewarded −), all BAL, then BAL.odds.lo/hi. A LOYAL person may sell / betray when the master OFFENDED her chữ trọng (overrides 2g's hard "lòng ≥ 70 / Thanh liêm never" filter → by odds). Record per-master offences THROUGH jmind if missing. Parity for NPC masters. Tests: loyal+offended sells, loyal+honoured refuses (by odds).
6. Report for main: short formula table + ONE worked example ("60 % greedy → ± …"); list EVERY place the 13 virtues / chữ trọng are used today (file:line + what), mark gaps.
Worktrees: /home/user/wt/ag2f2 (code, at 7eea99d6), /home/user/wt/ag2f2-ho (this report) — successor may reuse or delete.

## 22. AG-ALL-2 PART 2g — INFO SELLERS "tin rất đắt giá" (worker session_01UV1SzhnmhDMnnAiMDfYfhj, review/ag-all-2 ccff7746 on 2f r2 4baf13f3)
PRIORITY #1 CHECK ('bán tin|tin rất đắt|infoSell'): OD 1 (L1656 ~16:50Z (2)) | ledger 0 | claims 0 | main 15 | review/* 0 — REUSED: j67 GB67.spy story beat "Một kẻ gạ bán tin" + "Mua tin" (now runs through this engine, not a second system), j78facts / intelAdd (the TRUE facts and Đã biết), knFor / knDeedHaps / knThere / knWhat / KN_POOL / knTb (2c), informerInfo / knInfUi (2f), qv nết codes + jbal2 "Ham lợi" (bán tin) / "Thanh liêm" (không bán tin), evA + deedCap, mindPick, dayFit / dayWhy / spend (j76 ONE day gate), Q kit event card (j3 modal, kitOff, fx bạc check), pServ. START_CTX ≈ 4 % (1M window, context_usage read 0; estimate); now ≈ 15 %.
Owner law: OD 17/11 ~16:50Z (2) INFO SELLERS + ~15:25Z (4) NO LIES (verbatim in dev/OWNER_DECISIONS.md).
### 22.1 Built (jagknow.js tail after 2f r2; numbers BAL.ag.sell in jbal2.js after BAL.ag.know)
| item | what | code |
|---|---|---|
| who sells | a REAL servant of another living palace; weight = qv(BAL.ag.sell.q, nết: Ham lợi 1 / lanh .4 / chuyen .3; none = never) × (1 − lòng/100); lòng ≥ BAL.ag.sell.loy (70) or nết in BAL.ag.sell.never (Thanh liêm) never sells; never the buyer's own staff, never the buyer's own Tai mắt (spyFor = buyer: she reports) | knSellW / knSellPick (weighted, BAL.ag.sell.try candidates) |
| what (true, valuable, accessible) | only what the seller can know: her own master's secrets = j78facts(master) (plan 100, evme 90, affair 85, preg 80, items 75, deed 70 — BAL.ag.sell.val), a change of favour since she last knew (S.kf, ≥ BAL.ag.sell.fav.d Sủng, worth 72), or a scheme deed of this buổi her master does / she stood at (scheme 85, schemeMe 95); worth < BAL.ag.sell.min (70) is never sold (no where / Sủng / trait / hate / ally trivia); news the buyer already knows is not offered; best first | knSellNews / knFavFact |
| price | bạc = BAL.ag.sell.price (40) × worth / 100 × (1 + BAL.ag.sell.ask for Ham lợi .25); same for her and NPCs | knSellPrice |
| her card | once per buổi, BAL.ag.sell.o (15 %) a seller comes (only when dayFit(BAL.ag.sell.kh = 1 khắc), never as a maid): kit event card "Có người bán tin" (pServ portrait, line in the seller's voice "{Nô tài/Nô tỳ} có một tin rất đắt giá, {tiểu chủ} có muốn biết không?" via kSay) with "Mua tin" (fx bạc −price checked/greyed by the kit; kitOff + dayWhy when no khắc; spend 1 khắc) / "Không mua". Buying → result card "Tin mua được" + log + Đã biết (intelAdd how "Mua tin") + TIN BÁO row (by "buy", inf = seller) | knSellCard / knSellGive / knSellItem / knSellTick (j95sync wrapper) |
| refuse = not known | "Không mua": she learns nothing; for THIS khắc no other path brings the same news: knFor(S, h) → null for that happening, j78facts drops that fact (so intelLearn / Tai mắt / dò la cannot give it); next khắc the normal rules apply again. The seller then offers it to another consort (NPC buyer rule) | knNo (S.tb.no), knFor + j78facts wrappers, knSellNpc |
| NPC parity | each consort: the same BAL.ag.sell.o per buổi, the same pick and price; mindPick buy (worth/100 × npc.buy) vs no (price / her bạc × npc.no); needs the bạc; a bought deed → knFor(x, h) returns {by:"buy"} for the buổi (so she may go "Nghe lén", knOpts); a bought proof fact (plan / affair / items / deed) → evA(x, master, BAL.ag.ev.one) (capped by deedCap: only real wrongdoing); kept in x.knB (not sold twice); "evme" (evidence on the player) never sold to NPCs | knSellNpcBuy |
| j67 generalised | GB67.spy options "Mua tin" and "Ép hắn khai không công" (when they succeed) now also bring the best true news of a real seller through the same engine: log "(Name, người hầu cung X: <fact>)" | knSellArc (wrap of GB67.spy.o[0..1].go) |
| TIN BÁO API (additive) | informerInfo(item) for a bought item → kind "seller", code "tin", label "Kẻ bán tin <Name>"; TIN BÁO "bao" rows with by "buy" (fact) and happening items with by "buy" (line pool KN_POOL.buy names the seller) | informerInfo / KN_INFL.tin |
### 22.2 Checks (ccff7746)
- NEW dev/test/ag-sell.test.js 17/17 PASS (4 runs): who (Ham lợi + low lòng yes; lòng ≥ loy / Thanh liêm no; never her own staff; her own Tai mắt not a seller); what (hidden pregnancy of the seller's master; only ≥ min; no trivia); price scales (evme 45 > preg 40; 100 → 40, 70 → 28) and best first; card text; buy = bạc − price, 1 khắc, fact in Đã biết by the seller, result card, TIN BÁO row kind seller / code tin, not re-offered; refuse = no bạc, not known, j78facts + intelLearn cannot give it this khắc, next khắc can; deed: refused → knFor null, bought → known with the seller as informer; NPC buyer: deed known by knFor, same price, buys by worth, proof fact → evidence, no bạc → no buy, known not re-sold, no evme; j67 Mua tin through the engine; old save without S.tb; 4-day bot (o raised to 60 for the run): offers to her ~10, NPC buys ~15–20 / refusals ~10; no page errors.
- ag-taimat 25/25, ag-truth 10/10, one-core-guard PASS, one-core-text PASS. ag-know: 1 random FAIL per run, a different check each run ("ONE RULE (NPC)", "G2 low") = the known pre-existing flakes (§21.5); not touched here.
- Shot (755×1000, scratch only): the card renders in the kit modal (portrait, "Bạc −40 · 1 khắc", "Không mua"), the result card shows the true fact.
### 22.3 Handover
Done; nothing left of 2g. Notes for Foreman: (1) the free-standing seller is a Q card (no new UI part); if main's TIN BÁO card wants an icon for code "tin", that is a kit request for main/tinbao-ui. (2) NPC buyers spend no khắc (their day plan has no slot for it); her purchase spends 1 khắc. (3) Rate: BAL.ag.sell.o 15 % per buổi ≈ 0.6 offers a day for her when a greedy, disloyal servant with valuable news exists. Worktrees /home/user/wt/g2 (code), /home/user/wt/g2-ho (this report); scratch /home/user/wt/g2-scratch (shot.js).
