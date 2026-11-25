# ROBOT-10 rates — E line, VALID solo lives only (audit 25/11 final; co-op lives are not in agg format)

> BIAS WARNING: capped / timed-out / exit lives were removed → sample skewed to SHORT lives that ended in death until the reruns land. Source: reports/robot-audit-E.md.

# ROBOT-10 round report · 20261125-0527 (UTC)

314 lives from 1 result files · thân phận thd cnv pf bd · catalogue catalog.json of the run: 63 death texts, 388 endings, 14 run-time-built sites.
Ending groups = the game's own S.kesT (jend): death; đại kết cục = grand; rare; kỳ ngộ = fate; thường = exile / fail / leave / throne. «no ending» = soft-lock / wall cap / bot stuck / crash (each is also a bug in its run's bug file). «real min» = the PACE MODEL (section 11), not the robot's own time.

## 0 · Overall

| group | lives | ending reached | death | thường | kỳ ngộ | đại kết cục | rare | Hoàng hậu | Nữ đế | Hoàng thái hậu | no ending | avg years | avg real min | bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ALL | 314 | 100% | 78% | 20% | 0% | 1% | 0% | 3% | 0% | 1% | 0% | 6.5 | 1191.6 | 3013 |

## 1 · DEATH — 246 of 314 lives died (78%)

| cause (from the code) | where | deaths | of deaths | of lives | who caused it | mean age | mean rank at death | mean real min | framed before |
|---|---|---|---|---|---|---|---|---|---|
| Tuổi trời đã tận, «ILL[ageOf(p)>=M.oldAge?"laobenh":"trongbenh"].n.toLowerCase()» không qu | jmort.js:106 | 46 | 19% | 15% | fate (lifespan) ×46 | 26 | Quý nhân | 1691.7 | — |
| «pre»Tân Thái hậu «v.name» xét lại chuyện cũ (khả năng: «chanceLo(o)»), ban lụa trắng, ép  | j3.js:164 | 40 | 16% | 13% | execution ×40 | 24.9 | Quý nhân | 1628.9 | — |
| Bị ban chết vì đầu độc «k.name» | j8.js:146 | 32 | 13% | 10% | poison ×32 | 21.8 | Đáp ứng | 812.6 | 1/32 |
| «d.n» nguy kịch, không qua khỏi | j13.js:21 | 20 | 8% | 6% | illness ×20 | 21.7 | Thường tại | 1077.6 | 1/20 |
| Bị «m.name» sai đánh trượng đến chết | j42.js:323 | 19 | 8% | 6% | execution ×19 | 20.2 | Đáp ứng | 66.3 | — |
| Hồng nhan bạc mệnh | j3.js:167 | 17 | 7% | 5% | childbirth ×17 | 23.6 | Quý nhân | 1185.2 | 1/17 |
| Thái phi | j3.js:157 | 17 | 7% | 5% | other ×17 | 27.4 | Quý phi | 2609.2 | — |
| Tráo con bị bắt quả tang, tội khi quân | j8.js:381 | 11 | 4% | 4% | execution ×11 | 23 | Tần | 1116.3 | — |
| Lãnh cung | j14.js:40 | 10 | 4% | 3% | other ×10 | 22.5 | Đáp ứng | 494.4 | — |
| Bị ban chết vì tư thông với «m.name» | j22.js:22 | 8 | 3% | 3% | execution ×8 | 27.4 | Tần | 2528.7 | — |
| Bị ban chết vì vu «k.name» trù ẻo thánh thượng | j8.js:152 | 6 | 2% | 2% | execution ×6 | 23.3 | Đáp ứng | 2488.8 | — |
| Khó sinh, băng huyết mà chết | j8.js:389 | 5 | 2% | 2% | childbirth ×5 | 26 | Quý nhân | 1978.9 | — |
| Mẫu hậu Hoàng thái hậu | j3.js:160 | 3 | 1% | 1% | other ×3 | 35 | Hoàng hậu | 4015.1 | — |
| Tư thông bị phát giác | j30.js:25 | 2 | 1% | 1% | execution ×2 | 28.5 | Phi | 3050.3 | — |
| Bị «mm2.name» phát hiện làm tai mắt cho «v.name», sai đánh chết | j42.js:295 | 2 | 1% | 1% | execution ×2 | 21 | Đáp ứng | 88.2 | — |
| «t» Ngươi gắng sinh hạ hài nhi rồi nhắm mắt | jmort.js:170 | 2 | 1% | 1% | childbirth ×2 | 21 | Phi | 965.6 | — |
| Trúng độc, không qua khỏi | jpoison.js:63 | 2 | 1% | 1% | poison ×2 | 20 | Thường tại | 390.2 | — |
| Bị ban rượu độc vì mưu hại «NM(t)» | j8.js:125 | 2 | 1% | 1% | poison ×2 | 19.5 | Đáp ứng | 302.1 | — |
| «mm2.name» biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên | j42.js:296 | 1 | 0% | 0% | NPC / scheme | 22 | Đáp ứng | 61.9 | — |
| Bị đánh đòn vì tội trộm cắp, không qua khỏi | j42.js:388 | 1 | 0% | 0% | execution | 18 | Đáp ứng | 4.5 | — |

By who caused it: execution 89 (36%) · fate (lifespan) 46 (19%) · poison 36 (15%) · other 30 (12%) · childbirth 24 (10%) · illness 20 (8%) · NPC / scheme 1 (0%)

Per thân phận: bd 100% (68/68) · cnv 52% (72/138) · pf 100% (55/55) · thd 96% (51/53)

Per age band at death: 20-24: 120 · 25-29: 68 · <20: 29 · 30-39: 29

Per rank at death: Đáp ứng: 122 · Thường tại: 23 · Tần: 23 · Phi: 23 · Quý phi: 19 · Quý nhân: 17 · Hoàng quý phi: 11 · Hoàng hậu: 8

Stage (life frame part): part 1: 125 · part 0: 61 · part 2: 60

**Death causes «chưa ai gặp» (0 hits): 59 of 63** (maybe unreachable, or only rare: judge after a whole round)

- ${d.n} nguy kịch, không qua khỏi (j13.js:21)
- Chết rét, chết đói trong lãnh cung (j14.js:43)
- Uống thuốc phá thai, băng huyết mà chết (j22.js:51)
- Bị ban chết vì tư thông với ${m.name} (j22.js:22)
- tư thông với ${m.name} (j22.js:44)
- Thú tội tư thông, Hoàng thượng không tha (j22.js:52)
- Bệnh nặng, không qua khỏi (j3.js:123)
- ${pre}Tân Thái hậu ${v.name} xét lại chuyện cũ (khả năng: ${chanceLo(o)}), ban lụa trắng, ép ngươi tuẫn táng theo tiên đ (j3.js:164)
- Mưu phản cùng cha, cả họ bị tru di (j4.js:108)
- Cao Ly thua trận, thư mật của ngươi bị tìm thấy (j4.js:53)
- Mật thư bị chặn, tra ra ngươi làm gián điệp cho Cao Ly (j4.js:59)
- Hạ độc Hoàng hậu bị bắt, Thái hậu phủi tay không nhận (j4.js:125)
- Kiệt sức chết giữa đống đồ giặt ở Tân Giả khố (j42.js:268)
- Lao lực kiệt sức mà chết (j42.js:268)
- Bị ${mm2.name} phát hiện làm tai mắt cho ${v.name}, sai đánh chết (j42.js:295)
- ${mm2.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên (j42.js:296)
- Bị ${m.name} sai đánh trượng đến chết (j42.js:323)
- Bị bắt quả tang khi ${k==="poison"?"bỏ độc":k==="plant"?"cài bùa ngải":"dò la"} ${t.name}, bị đánh chết ở Thận Hình ti (j42.js:334)
- Chết dưới đòn tra khảo ở Thận Hình ti (j42.js:336)
- Quỳ phạt đến kiệt sức mà chết (j42.js:368)
- Trước ngày sắc phong, ${m.name} sai người đẩy ngươi xuống giếng (j42.js:431)
- ${pre} Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti (j42.js:560)
- ${pre} Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu (j42.js:561)
- ${pre} Ngươi chết dưới đòn roi (j42.js:563)
- Bị ban rượu độc vì mưu hại ${NM(t)} (j8.js:125)
- Bị ban chết vì đầu độc ${k.name} (j8.js:146)
- Bị ban chết vì vu ${k.name} trù ẻo thánh thượng (j8.js:152)
- tư thông${m?" với "+m.name:""} (j95.js:442)
- Bị ${m.who} hại (jcoopworld.js:807)
- Bị kẻ gian hãm hại (jcoopworld.js:807)
- Bị hại trong cung (jcoopworld.js:846)
- Lao lực mà chết trước kỳ tuyển tú (jkc.js:350)
- Trúng độc chén canh sâm của (jkc.js:367)
- Tự vẫn trước ngày bị ép gả (jkc.js:441)
- Chết vì dịch sốt trước kỳ tuyển tú (jkc.js:453)
- Lao lực mà chết trước ngày tuyển (jkc2.js:269)
- Kiệt sức mà chết trước ngày hòa thân (jkc2.js:269)
- Chết dưới dao thích khách đêm trước ngày hòa thân (jkc2.js:330)
- Bị ban chết vì tư thông với ${nm} (jmen.js:208)
- tư thông với ${nm} (jmen.js:208)
- Bị Thái y tra ra bỏ độc người hầu cung khác, giải sang Thận hình ti (jmline.js:83)
- ${ILL[i.k].n} nguy kịch, tuổi cao sức yếu không qua khỏi (jmort.js:129)
- ${t} Ngươi gắng sinh hạ hài nhi rồi nhắm mắt (jmort.js:170)
- Ngươi trượt chân trên bậc đá đóng băng trước điện, không tỉnh lại (jmort.js ACC.me)
- Ngươi ngã xuống hồ Thái Dịch giữa đêm mưa (jmort.js ACC.me)
- Ngươi nghẹn hạt sen giữa yến tiệc (jmort.js ACC.odd)
- Ngươi mải đuổi con vẹt sổng lồng, trượt chân ngã từ lầu vọng nguyệt (jmort.js ACC.odd)
- Ngươi cười quá đà khi xem gánh chèo, ngất đi không tỉnh (jmort.js ACC.odd)
- Tuổi trời đã tận, ${ILL[ageOf(p)>=M.oldAge?"laobenh":"trongbenh"].n.toLowerCase()} không qua khỏi, thọ ${S.age} tuổi (jmort.js:106)
- bị ban chết vì mưu hại ${PQ_N[who]} (jpq.js:73)
- Thái hậu dùng xong chén canh thì trở bệnh nặng (jpq.js:90)
- Uống thuốc giả chết quá liều, không tỉnh lại nữa (jroute.js:174)
- Bị ban chết vì tư thông (jroute.js:127)
- Bị ban chết vì trốn khỏi cung (jroute.js:176)
- trốn khỏi cung (jroute.js:248)
- gian lận khi trích huyết nghiệm thân (jroute.js:358)
- Bị ban chết vì ${why} (jroute.js:362)
- Bị ban chết vì con không phải cốt nhục hoàng gia (jroute.js:362)
- con không phải cốt nhục hoàng gia (jroute.js:368)

## 2 · ENDINGS — 314 of 314 lives reached an ending

| ending | where | type | lives | rate | mean real min | mean in-game years |
|---|---|---|---|---|---|---|
| Hồng nhan bạc mệnh | j3.js:167 | death | 214 | 68% | 1274.9 | 5 |
| Xuất cung | j42.js:303 | leave | 64 | 20% | 501.8 | 10.7 |
| Thái phi | j3.js:157 | death | 17 | 5% | 2609.2 | 9 |
| Lãnh cung | j14.js:40 | death | 10 | 3% | 494.4 | 4.4 |
| Mẫu hậu Hoàng thái hậu | j3.js:160 | death | 3 | 1% | 4015.1 | 12.3 |
| Tư thông bị phát giác | j30.js:25 | death | 2 | 1% | 3050.3 | 9.6 |
| Đại kết cục · Giữ kín ra cung | GE_CAT cnv_chu#3 | grand | 2 | 1% | 102.9 | 3 |
| Đại kết cục · Thơ theo gió đi | GE_CAT thd_tho#3 | grand | 1 | 0% | 773.4 | 13.1 |
| Đại kết cục · Theo trò đi xa | GE_CAT thd_tro#3 | grand | 1 | 0% | 772.4 | 8.9 |

Every ending title as the game printed it: Hồng nhan bạc mệnh [death] ×214 · Xuất cung [leave] ×64 · Thái phi [death] ×17 · Lãnh cung [death] ×10 · Mẫu hậu Hoàng thái hậu [death] ×3 · Tư thông bị phát giác [death] ×2 · Đại kết cục · Giữ kín ra cung [grand] ×2 · Đại kết cục · Thơ theo gió đi [grand] ×1 · Đại kết cục · Theo trò đi xa [grand] ×1

**Endings «chưa ai gặp»: 379 of 388** — the 30 code / rare / succession endings are listed here; 349 of 352 Đại kết cục titles (GE_CAT, two shadings each) are in the -avg.csv.

- Xuất gia (j14.js:21)
- Được Vương gia che chở (j24.js:56)
- Hoàng thái hậu (j3.js:158)
- Ma ma (j42.js:302)
- Xuất giá (j42.js:435)
- Bị đuổi khỏi cung (j42.js:560)
- Được ban hôn (j42.js:611)
- Vào vương phủ (j42.js:615)
- Thành thân (j42.js:618)
- Cao chạy xa bay (j96.js:98)
- Đại kết cục · ${res.ti} (jge.js:148)
- Ban chết (jpq.js:72)
- Tân đế đăng cơ (jpq.js:107)
- Trốn khỏi cung (jroute.js:172)
- Dâng biểu xuất gia (jroute.js:182)
- Xuất cung về quê (jroute.js:194)
- Phế làm thứ dân (jroute.js:197)
- Một đời an nhiên (jroute.js:253)
- Nữ vương Cao Ly (RARE97 nc_vuong)
- Thái hậu bị giam lỏng (SUCC_END a_bad)
- Thái hoàng thái hậu (SUCC_END a_rare)
- Nhiếp chính Thái hậu (SUCC_END b_ok)
- Thái hậu chấp chính (SUCC_END b_keep)
- Bị ép trả rèm (SUCC_END b_bad)
- Nhị thánh lâm triều (SUCC_END b_rare)
- Nữ đế (SUCC_END c_ok)
- Nữ đế thoái vị (SUCC_END c_abd)
- Nữ đế bị phế (SUCC_END c_bad)
- Thiên cổ nhất đế (SUCC_END c_rare)
- Mưu nghịch bất thành (SUCC_END c_fail)

## 3 · RANK

| rank | reached (≥) | highest = this | mean real min to reach | mean in-game year of reach | mean age at reach |
|---|---|---|---|---|---|
| Đáp ứng | 100% | 123 | 116.4 | 1.3 | 19.2 |
| Thường tại | 61% | 52 | 107.3 | 1.5 | 19.5 |
| Quý nhân | 44% | 33 | 309.8 | 1.9 | 19.9 |
| Tần | 34% | 20 | 745.2 | 3.2 | 21.3 |
| Phi | 27% | 25 | 1231.8 | 5 | 23.1 |
| Quý phi | 19% | 26 | 1667.7 | 6.4 | 24.5 |
| Hoàng quý phi | 11% | 25 | 2004.1 | 7.2 | 25.3 |
| Hoàng hậu | 3% | 10 | 3057.2 | 10 | 28.1 |

Demotions per life: mean 2.6 (lives with ≥1: 56%) · lãnh cung entries: mean 1.4 (lives with ≥1: 52%) · Hoàng hậu 3% · Nữ đế 0% · Hoàng thái hậu 1%

Per thân phận (share reaching ≥ rank):

| thân phận | Đáp ứng | Thường tại | Quý nhân | Tần | Phi | Quý phi | Hoàng quý phi | Hoàng hậu |
|---|---|---|---|---|---|---|---|---|
| bd | 100% | 100% | 81% | 60% | 44% | 32% | 22% | 10% |
| cnv | 100% | 16% | 11% | 8% | 6% | 4% | 1% | 1% |
| pf | 100% | 98% | 69% | 56% | 49% | 29% | 24% | 4% |
| thd | 100% | 89% | 58% | 43% | 40% | 32% | 9% | 0% |

## 4 · FAMILY

| per life | mean | lives with ≥1 | max |
|---|---|---|---|
| pregnancies | 0.5 | 24% | 6 |
| sons born | 0.1 | 7% | 2 |
| daughters born | 0.2 | 13% | 3 |
| child deaths | 0.1 | 5% | 2 |
| Thái tử made (her son) | 0 | 0% | 0 |
| heir lost | 0 | 0% | 0 |

## 5 · FAVOR + SCHEMES

| per life | mean | lives with ≥1 | max |
|---|---|---|---|
| thị tẩm (nights) | 13.1 | 49% | 134 |
| peak Sủng | 61.4 | 94% | 100 |
| times framed (accusation stuck) | 0.2 | 14% | 5 |
| her schemes caught | 7.2 | 39% | 112 |
| death sentences on her | 0.1 | 6% | 2 |

Schemes she ran (doAct kind): rumor 35502 (caught 0%, 94 lives) · vp 29114 (caught 0%, 95 lives) · gift 19274 (caught 0%, 95 lives) · ksab 6108 (caught 23%, 90 lives) · accuse 4267 (caught 1%, 264 lives) · spy 2666 (caught 0%, 116 lives) · frame 1303 (caught 57%, 87 lives) · plant 910 (caught 0%, 73 lives) · huydung 303 (caught 0%, 32 lives) · pond 250 (caught 14%, 58 lives) · kpoison 165 (caught 0%, 55 lives) · ally 119 (caught 0%, 52 lives) · block 48 (caught 0%, 20 lives) · bribe 42 (caught 0%, 16 lives) · takeaway 20 (caught 5%, 8 lives) · poison 20 (caught 0%, 9 lives) · kframe 16 (caught 0%, 9 lives)

Framed «won» (an accusation she beat) is not hooked yet: only accusations that stuck (framed(her)) are counted.

## 6 · ECONOMY

| bạc | mean | median | min | max |
|---|---|---|---|---|
| peak | 136.4 | 103 | 8 | 1157 |
| at the end | 13.3 | 4 | 0 | 542 |

«Hết bạc» (bạc ≤ 0 at a buổi change): 88% of lives · per bot: cautious 56% · greedy 100% · lazy 47% · lover 97% · random 84% · rebel 98% · schemer 94% · scholar 100% · skilled 100% · speed 100%

## 7 · MINI-GAMES — win rate per game per rank (law 5: must fall as she climbs)

| game | plays | left to luck | Đáp ứng | Thường tại | Quý nhân | Tần | Phi | Quý phi | Hoàng quý phi | Hoàng hậu | law 5 (ranks ≤ 2 vs ≥ 4) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| hoc:cam | 14922 | 0% | 0% (6371) | 0% (2740) | 0% (2544) | 0% (1188) | 0% (945) | 0% (590) | 0% (411) | 0% (133) | ok |
| hoc:dan | 1 | 100% | 100% (1) | — | — | — | — | — | — | — | too few |
| hoc:hoa | 11231 | 0% | 0% (4662) | 0% (1769) | 0% (1778) | 0% (1134) | 0% (946) | 0% (516) | 0% (322) | 0% (104) | ok |
| hoc:huong | 1 | 100% | — | 100% (1) | — | — | — | — | — | — | too few |
| hoc:ky | 12630 | 0% | 0% (5520) | 0% (2233) | 0% (2239) | 0% (786) | 0% (696) | 0% (710) | 0% (330) | 0% (116) | ok |
| hoc:nau | 6283 | 0% | 0% (2281) | 0% (1134) | 0% (1212) | 0% (623) | 0% (435) | 0% (321) | 0% (236) | 0% (41) | ok |
| hoc:theu | 6585 | 0% | 0% (2601) | 0% (1240) | 0% (1214) | 0% (479) | 0% (500) | 0% (345) | 0% (185) | 0% (21) | ok |
| hoc:thi | 8902 | 0% | 0% (4576) | 0% (1625) | 0% (1350) | 0% (410) | 0% (291) | 0% (384) | 0% (219) | 0% (47) | ok |
| hoc:vu | 10674 | 0% | 0% (4213) | 0% (1512) | 0% (1745) | 0% (1151) | 0% (877) | 0% (676) | 0% (401) | 0% (99) | ok |
| hoc:y | 7379 | 0% | 0% (3105) | 0% (1330) | 0% (1106) | 0% (622) | 0% (645) | 0% (266) | 0% (227) | 0% (78) | ok |
| thi:co | 1 | 100% | 0% (1) | — | — | — | — | — | — | — | too few |
| thi:dan | 2 | 100% | 0% (2) | — | — | — | — | — | — | — | too few |
| thi:mua | 1 | 100% | 0% (1) | — | — | — | — | — | — | — | too few |

Win = contest place 1 (j82 startContest) · lesson score ≥ 5 of 10 (j82 playArt) · j5 board result ≥ «Khá». The bots play the boards with their own fixed skill (or leave them to luck), so the trend by rank is what law 5 needs.

## 8 · KỲ NGỘ

Per life: mean 10.1 · lives with ≥1: 100%

- Kỳ ngộ ×312
- Đèn rơi cứu người ×294
- Ngọc rơi trên lối ×277
- Sổ tay giáo tập ×263
- Con vật lạc chủ ×260
- Sớm mai Phật đường ×211
- Hoàng tử lạc đường ×177
- Của mình tìm lại ×125
- Lời dặn Đoan ngọ ×103
- Ván cờ tiên đế ×100
- Phương thuốc gia truyền ×99
- Nét ngự bút ×96
- Chung áo dưới mưa ×95
- Lá thư trong chậu lan ×90
- Cô cô để mắt ×48
- Câu hỏi của sứ thần ×36
- Khúc đàn đêm vườn ngự ×32
- kyc-ma-007 ×24
- Họa sư bên hàng liễu ×23
- kyc-de-002 ×19
- kyc-vat-004 ×18
- kyc-vat-014 ×18
- kyc-vat-005 ×18
- kyc-vat-012 ×17
- kyc-sv-001 ×16
- kyc-th-004 ×16
- kyc-sv-005 ×16
- kyc-th-006 ×15
- kyc-ma-002 ×15
- kyc-th-001 ×14
- kyc-th-003 ×14
- kyc-sv-019 ×14
- kyc-de-008 ×14
- kyc-sv-003 ×14
- kyc-sv-010 ×14
- kyc-vat-003 ×14
- kyc-sv-016 ×14
- kyc-th-013 ×14
- kyc-th-002 ×13
- kyc-sv-018 ×13
- kyc-sv-008 ×13
- kyc-sv-020 ×12
- kyc-sv-006 ×12
- kyc-ma-012 ×11
- Đêm tuyết người gác cổng ×10
- kyc-sv-004 ×8
- kyc-sv-007 ×8
- kyc-de-007 ×8
- kyc-ma-005 ×8
- kyc-ma-008 ×8
- Điều ước hoa đăng ×6
- kyc-th-005 ×6
- kyc-ma-015 ×6
- kyc-ma-006 ×6
- kyc-th-012 ×6
- kyc-de-005 ×6
- kyc-sv-009 ×6
- kyc-vat-013 ×6
- kyc-sv-011 ×5
- kyc-sv-017 ×5
- kyc-de-004 ×5
- kyc-th-007 ×5
- kyc-th-008 ×4
- kyc-th-010 ×3
- kyc-sv-012 ×3
- kyc-th-009 ×2
- kyc-de-010 ×2
- Hương cũ Trường Môn ×1
- Di vật người đã khuất ×1
- kyc-vat-001 ×1
- kyc-ma-014 ×1

Kỳ ngộ «chưa ai gặp»: 4 of 25 — Hiên Phật đường · Món quý để dành · Bánh trung thu có thư · Đêm Thất tịch

## 9 · BALANCE FLAGS

Options offered ≥ 10 times to ≥ 3 different bots and taken ≥ 90 % or ≤ 2 % of the time (law 2: all options of one choice are worth the same) — 700 flags (bot policies bias this: read with the bot mix in mind):

| card | option | offered | taken | bots | flag |
|---|---|---|---|---|---|
| giftpick/Tặng quà | Nến mỡ dê | 299876 | 1% | 3 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Trà Long Tĩnh | 89263 | 1% | 3 | ≤ 2 %: never worth taking? |
| plantpick/Cài đồ vào rương | Nến mỡ dê | 15445 | 2% | 3 | ≤ 2 %: never worth taking? |
| cyrep/Kỳ nguyệt sự | Báo lùi vài hôm | 10616 | 0% | 10 | ≤ 2 %: never worth taking? |
| cyrep/Kỳ nguyệt sự | Báo sớm, nói đã sạch kỳ | 10616 | 0% | 10 | ≤ 2 %: never worth taking? |
| Thế cờ «Song long»: dùng vật liệu gì? | Thế cờ «Song long» · bàn cờ gỗ | 7016 | 0% | 6 | ≤ 2 %: never worth taking? |
| Khúc «Xuân hiểu»: dùng vật liệu gì? | Khúc «Xuân hiểu» · giấy hoa tiên | 6700 | 0% | 6 | ≤ 2 %: never worth taking? |
| j70start/Bày mưu | Ra tay ngay: tung tin đồn | 6096 | 99% | 3 | ≥ 90 %: the others never worth it? |
| Điệu «Đạp ca»: dùng vật liệu gì? | Điệu «Đạp ca» · thuê nhạc công | 6024 | 0% | 6 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Lụa Hàng Châu | 5893 | 1% | 3 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Vòng ngọc Hòa Điền | 5523 | 1% | 3 | ≤ 2 %: never worth taking? |
| Thư pháp «Xuân nhật»: dùng vật liệu gì? | Thư pháp «Xuân nhật» · giấy hoa tiên | 5022 | 0% | 6 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Trâm ngọc bích | 4952 | 1% | 3 | ≤ 2 %: never worth taking? |
| plantpick/Cài đồ vào rương | Nước bào hoa | 4855 | 1% | 3 | ≤ 2 %: never worth taking? |
| Tranh mai: dùng vật liệu gì? | Tranh mai · giấy Tuyên, màu khoáng | 4432 | 0% | 6 | ≤ 2 %: never worth taking? |
| plantpick/Cài đồ vào rương | Trà Long Tĩnh | 4337 | 1% | 3 | ≤ 2 %: never worth taking? |
| Túi hương hoa lài: dùng vật liệu gì? | Túi hương hoa lài · trầm, quế | 4010 | 0% | 6 | ≤ 2 %: never worth taking? |
| Khăn thêu hoa cúc: dùng vật liệu gì? | Khăn thêu hoa cúc · lụa, chỉ màu | 3642 | 0% | 6 | ≤ 2 %: never worth taking? |
| plantpick/Cài đồ vào rương | Vải bông | 3260 | 1% | 3 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Áo lụa thêu hoa nhỏ | 2650 | 1% | 3 | ≤ 2 %: never worth taking? |
| Cháo trắng hành phi: dùng vật liệu gì? | Cháo trắng hành phi · sâm, táo đỏ | 2356 | 0% | 6 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Áo tang vải trắng | 2100 | 2% | 3 | ≤ 2 %: never worth taking? |
| giftpick/Tặng quà | Trâm hoa lụa | 2069 | 1% | 3 | ≤ 2 %: never worth taking? |
| e68q6srvQuan/Kẻ hầu | Tố quản sự lên chủ nhân | 2031 | 91% | 10 | ≥ 90 %: the others never worth it? |
| e68q6srvMood/Kẻ hầu | Dỗ khéo vài câu rồi lui | 2008 | 91% | 10 | ≥ 90 %: the others never worth it? |
| Hội phối đồ: báo đề | Sai tai mắt dò bên chủ hội | 1990 | 1% | 10 | ≤ 2 %: never worth taking? |
| j70start/Bày mưu | Bày mưu: dán thơ nặc danh | 1953 | 0% | 3 | ≤ 2 %: never worth taking? |
| Bị giật y phục giữa đường | Viết thư xin nhà gửi áo | 1816 | 1% | 10 | ≤ 2 %: never worth taking? |
| Thế cờ «Song long»: dùng vật liệu gì? | Thế cờ «Song long» · bàn cờ ngọc | 1605 | 0% | 6 | ≤ 2 %: never worth taking? |
| Thư pháp «Xuân nhật»: dùng vật liệu gì? | Thư pháp «Xuân nhật» · giấy dát vàng, mự | 1552 | 0% | 6 | ≤ 2 %: never worth taking? |
| adStroll/Hoàng thượng dạo vườn | Ra vấn an | 1384 | 0% | 8 | ≤ 2 %: never worth taking? |
| adStroll/Hoàng thượng dạo vườn | Lánh đi lối khác | 1384 | 90% | 8 | ≥ 90 %: the others never worth it? |
| e68q6srvQuan/Kẻ hầu | Đút bạc cho quản sự | 1288 | 1% | 10 | ≤ 2 %: never worth taking? |
| e68q6srvMood/Kẻ hầu | Bỏ bạc nhờ bếp làm cho người | 1272 | 1% | 10 | ≤ 2 %: never worth taking? |
| Điệu «Đạp ca»: dùng vật liệu gì? | Điệu «Đạp ca» · nhạc công, lụa múa mới | 1249 | 0% | 6 | ≤ 2 %: never worth taking? |
| j70start/Bày mưu | Ra tay ngay: phá việc học | 1156 | 2% | 3 | ≤ 2 %: never worth taking? |
| j70thr/Lời cảnh báo | Ra lệnh phòng bị | 1125 | 99% | 10 | ≥ 90 %: the others never worth it? |
| j70thr/Lời cảnh báo | Để sau | 1125 | 1% | 10 | ≤ 2 %: never worth taking? |
| Túi hương hoa lài: dùng vật liệu gì? | Túi hương hoa lài · trầm kỳ nam, long di | 1040 | 0% | 6 | ≤ 2 %: never worth taking? |
| j70thr/Lời cảnh báo | Ra tay trước | 1030 | 0% | 9 | ≤ 2 %: never worth taking? |
| Khúc «Xuân hiểu»: dùng vật liệu gì? | Khúc «Xuân hiểu» · dây đàn tơ mới, phổ l | 940 | 0% | 6 | ≤ 2 %: never worth taking? |
| ilback/Đồ cũ trở về | Chuộc về | 909 | 0% | 9 | ≤ 2 %: never worth taking? |
| ilback/Đồ cũ trở về | Thôi, không chuộc | 909 | 100% | 9 | ≥ 90 %: the others never worth it? |
| j70def/Phòng bị | Thôi | 827 | 0% | 9 | ≤ 2 %: never worth taking? |
| maidhostage/Việc khó xử | Bày kế phản gián | 817 | 93% | 10 | ≥ 90 %: the others never worth it? |
| j70start/Bày mưu | Bày mưu: trả bạc cho các ma ma già | 810 | 0% | 3 | ≤ 2 %: never worth taking? |
| j70start/Bày mưu | Bày mưu: tung tin qua thái giám | 810 | 0% | 3 | ≤ 2 %: never worth taking? |
| j70def/Phòng bị | Giao việc: canh chừng cung | 793 | 98% | 8 | ≥ 90 %: the others never worth it? |
| j70def/Phòng bị | Giao việc: thử độc đồ ăn | 793 | 0% | 8 | ≤ 2 %: never worth taking? |
| j70def/Phòng bị | Giao việc: theo dõi một người | 793 | 0% | 8 | ≤ 2 %: never worth taking? |
| j70def/Phòng bị | Giao việc: giữ sổ sách, làm chứng | 793 | 0% | 8 | ≤ 2 %: never worth taking? |
| Khăn thêu hoa cúc: dùng vật liệu gì? | Khăn thêu hoa cúc · lụa Hàng Châu, chỉ k | 718 | 0% | 6 | ≤ 2 %: never worth taking? |
| Phi tần ghen | Đáp lại khéo | 715 | 0% | 10 | ≤ 2 %: never worth taking? |
| Phi tần ghen | Đáp trả gay gắt | 715 | 0% | 10 | ≤ 2 %: never worth taking? |
| Có người bán tin | Mua tin | 704 | 0% | 10 | ≤ 2 %: never worth taking? |
| Có người bán tin | Không mua | 704 | 100% | 10 | ≥ 90 %: the others never worth it? |
| prep/Chuẩn bị thị tẩm | Tập trước Cầm | 656 | 0% | 6 | ≤ 2 %: never worth taking? |
| Sai Thúy Mặc đi dò la | Thôi, để sau | 613 | 0% | 4 | ≤ 2 %: never worth taking? |
| nfch/Kính sự phòng | Chặn ngự giá | 610 | 0% | 10 | ≤ 2 %: never worth taking? |
| poisongift/Việc khó xử | Nhờ Thái hậu đứng ra | 563 | 0% | 10 | ≤ 2 %: never worth taking? |

Roads (nhánh) of this round's thân phận never played: thd_sach, pt_dang, bd_soi · locked roads that never opened: none

## 10 · HEALTH (distinct bugs per life by kind; the bug lists are in each run's <origin>-<stamp>.md)

| kind | lives hit | mean per life | max |
|---|---|---|---|
| softlock | 54% | 0.5 | 1 |
| stuck | 0% | 0 | 0 |
| crash | 0% | 0 | 0 |
| mem | 61% | 0.6 | 1 |
| js | 4% | 0.1 | 2 |
| save | 100% | 1 | 1 |
| number | 52% | 0.7 | 6 |
| word | 0% | 0 | 0 |
| lag | 96% | 2 | 3 |

UI kinds (real pages, Fold + iPad): lives with any ui-* bug 65% · no ending (soft-lock / cap / stuck / crash): 0%

## 11 · TIME (real play minutes per kiếp, pace model)

Cách tính: phút thật = (số chữ nàng đọc ÷ 17 chữ/giây + số lần bấm × 1 giây + số lựa chọn × 2 giây + mỗi trò chơi nhỏ tự chơi 45 giây, để trời định 4 giây) ÷ 60. Chưa hiệu chỉnh bằng lượt chơi tốc độ người thật (gap). A life with no ending counts up to where it stopped.

| group | lives | mean min | median | fastest | slowest |
|---|---|---|---|---|---|
| ALL | 314 | 1191.6 | 576 | 4.5 | 10940.3 |
| bd | 68 | 1588.2 | 1104 | 34.6 | 4387.5 |
| cnv | 138 | 681.9 | 250.5 | 4.5 | 4628.3 |
| pf | 55 | 1497.8 | 1120.5 | 73.3 | 6315.8 |
| thd | 53 | 1691.9 | 1402.4 | 50.5 | 10940.3 |
| ending: death | 246 | 1383.3 | 881.8 | 4.5 | 10940.3 |
| ending: thường | 64 | 501.8 | 253.3 | 165.3 | 2370.5 |
| ending: đại kết cục | 4 | 437.9 | 772.4 | 93.2 | 773.4 |
| «Hồng nhan bạc mệnh» | 214 | 1274.9 | 763.4 | 4.5 | 10940.3 |
| «Lãnh cung» | 10 | 494.4 | 404.3 | 73.3 | 1870.8 |
| «Mẫu hậu Hoàng thái hậu» | 3 | 4015.1 | 4072.3 | 3274.3 | 4698.9 |
| «Thái phi» | 17 | 2609.2 | 2587.5 | 1049.7 | 3691.9 |
| «Tư thông bị phát giác» | 2 | 3050.3 | 3951.3 | 2149.3 | 3951.3 |
| «Xuất cung» | 64 | 501.8 | 253.3 | 165.3 | 2370.5 |
| «Đại kết cục · Giữ kín ra cung» | 2 | 102.9 | 112.5 | 93.2 | 112.5 |

Whole round: 6235.8 giờ chơi thật cho 314 kiếp ≈ 1191.6 phút/kiếp ≈ 19.9 ngày/kiếp nếu chơi 1 giờ/ngày.

Cumulative over the kiếp series (same thân phận · nhánh · bot, kiếp 1..N = a new seed each):

| series | kiếp | minutes each | cumulative |
|---|---|---|---|
| bd · bd_hen · cautious | 1 | 3571.9 | 3571.9 min = 59.5 h |
| bd · bd_hen · greedy | 2 | 2407.3 · 2343.9 | 4751.2 min = 79.2 h |
| bd · bd_hen · lazy | 1 | 41.9 | 41.9 min = 0.7 h |
| bd · bd_hen · lover | 1 | 1829.8 | 1829.8 min = 30.5 h |
| bd · bd_hen · random | 1 | 189.9 | 189.9 min = 3.2 h |
| bd · bd_hen · rebel | 2 | 1255.8 · 475.2 | 1731.1 min = 28.9 h |
| bd · bd_hen · schemer | 5 | 116.7 · 1104 · 151.3 · 162.1 · 507.5 | 2041.6 min = 34 h |
| bd · bd_hen · scholar | 2 | 320 · 3114 | 3434 min = 57.2 h |
| bd · bd_san · cautious | 4 | 3878.2 · 4387.5 · 1049.7 · 3452.4 | 12767.8 min = 212.8 h |
| bd · bd_san · greedy | 3 | 1943.6 · 2165.2 · 3302.5 | 7411.3 min = 123.5 h |
| bd · bd_san · lazy | 2 | 342.8 · 51.9 | 394.7 min = 6.6 h |
| bd · bd_san · lover | 1 | 2293.6 | 2293.6 min = 38.2 h |
| bd · bd_san · random | 1 | 34.6 | 34.6 min = 0.6 h |
| bd · bd_san · rebel | 5 | 814.5 · 820.7 · 427.7 · 492.2 · 574.3 | 3129.4 min = 52.2 h |
| bd · bd_san · schemer | 4 | 597 · 172.1 · 754.1 · 2176.8 | 3700.1 min = 61.7 h |
| bd · bd_san · scholar | 3 | 3047.3 · 3343.9 · 1661.9 | 8053.1 min = 134.2 h |
| bd · bd_san · skilled | 1 | 2258.3 | 2258.3 min = 37.6 h |
| bd · bd_san · speed | 2 | 63.8 · 540.3 | 604.2 min = 10.1 h |
| bd · bd_tuyet · cautious | 4 | 3325.1 · 3623.7 · 3409.9 · 3898.2 | 14256.8 min = 237.6 h |
| bd · bd_tuyet · greedy | 1 | 4158.7 | 4158.7 min = 69.3 h |
| bd · bd_tuyet · lazy | 4 | 225.9 · 183.3 · 1324.7 · 413.5 | 2147.4 min = 35.8 h |
| bd · bd_tuyet · lover | 2 | 2493.5 · 3509.6 | 6003.1 min = 100.1 h |
| bd · bd_tuyet · rebel | 5 | 2091.8 · 665.2 · 479.6 · 1488.9 · 873.5 | 5599.1 min = 93.3 h |
| bd · bd_tuyet · schemer | 5 | 602.1 · 1012.4 · 496.4 · 763.4 · 980.3 | 3854.6 min = 64.2 h |
| bd · bd_tuyet · scholar | 3 | 3274.3 · 1193.2 · 534.5 | 5002 min = 83.4 h |
| bd · bd_tuyet · skilled | 3 | 1681 · 3622.8 · 3436 | 8739.9 min = 145.7 h |
| cnv · cnv_ban · cautious | 2 | 2348 · 1977.9 | 4325.9 min = 72.1 h |
| cnv · cnv_ban · greedy | 5 | 235.6 · 250.5 · 200 · 185.1 · 241 | 1112.3 min = 18.5 h |
| cnv · cnv_ban · lazy | 4 | 358.3 · 236.4 · 226.6 · 330.1 | 1151.3 min = 19.2 h |
| cnv · cnv_ban · lover | 4 | 2516 · 412.4 · 1534 · 503.5 | 4965.9 min = 82.8 h |
| cnv · cnv_ban · random | 2 | 156.5 · 97.1 | 253.6 min = 4.2 h |
| cnv · cnv_ban · rebel | 3 | 6.7 · 1510.6 · 270.2 | 1787.6 min = 29.8 h |
| cnv · cnv_ban · schemer | 5 | 247.5 · 282.9 · 4148.6 · 277.1 · 4628.3 | 9584.4 min = 159.7 h |
| cnv · cnv_ban · scholar | 4 | 216.7 · 253.3 · 2301 · 195.3 | 2966.3 min = 49.4 h |
| cnv · cnv_ban · skilled | 3 | 423.3 · 2399.3 · 2998.7 | 5821.3 min = 97 h |
| cnv · cnv_ban · speed | 2 | 91.9 · 24.8 | 116.7 min = 1.9 h |
| cnv · cnv_chu · cautious | 3 | 2025.8 · 2350.3 · 2254.7 | 6630.8 min = 110.5 h |
| cnv · cnv_chu · greedy | 5 | 236.7 · 184.2 · 237.1 · 95.9 · 182 | 935.9 min = 15.6 h |
| cnv · cnv_chu · lazy | 5 | 112.5 · 359.3 · 256.3 · 286 · 93.2 | 1107.4 min = 18.5 h |
| cnv · cnv_chu · lover | 4 | 768.7 · 181.7 · 2039.2 · 1331.3 | 4320.9 min = 72 h |
| cnv · cnv_chu · random | 4 | 84.3 · 189.6 · 437.8 · 57.2 | 768.9 min = 12.8 h |
| cnv · cnv_chu · rebel | 3 | 255.2 · 165.3 · 166.9 | 587.3 min = 9.8 h |
| cnv · cnv_chu · schemer | 5 | 94.5 · 306.3 · 164.5 · 234.1 · 2028.6 | 2828 min = 47.1 h |
| cnv · cnv_chu · scholar | 3 | 4072.3 · 1253.1 · 1127.1 | 6452.6 min = 107.5 h |
| cnv · cnv_chu · skilled | 2 | 1491.5 · 105.8 | 1597.3 min = 26.6 h |
| cnv · cnv_chu · speed | 2 | 50.8 · 21.1 | 71.9 min = 1.2 h |
| cnv · cnv_ma · cautious | 3 | 2370.5 · 2344.9 · 2316.5 | 7031.9 min = 117.2 h |
| cnv · cnv_ma · greedy | 5 | 229.4 · 259.9 · 272.2 · 202.7 · 263.7 | 1227.9 min = 20.5 h |
| cnv · cnv_ma · lazy | 5 | 262.6 · 335.2 · 248.5 · 328.3 · 259.9 | 1434.4 min = 23.9 h |
| cnv · cnv_ma · lover | 4 | 192 · 234.4 · 73.5 · 175.5 | 675.3 min = 11.3 h |
| cnv · cnv_ma · random | 5 | 107.3 · 33.6 · 11.6 · 584.3 · 6.9 | 743.7 min = 12.4 h |
| cnv · cnv_ma · rebel | 1 | 213 | 213 min = 3.6 h |
| cnv · cnv_ma · schemer | 4 | 216.7 · 392.3 · 11.2 · 301.2 | 921.4 min = 15.4 h |
| cnv · cnv_ma · scholar | 4 | 2697 · 238.9 · 2267.6 · 791.4 | 5995 min = 99.9 h |
| cnv · cnv_ma · skilled | 1 | 780.9 | 780.9 min = 13 h |
| cnv · cnv_ma · speed | 2 | 11.9 · 26.2 | 38.1 min = 0.6 h |
| cnv · cnv_mat · cautious | 2 | 2361.7 · 2270.1 | 4631.8 min = 77.2 h |
| cnv · cnv_mat · greedy | 5 | 210.9 · 208.9 · 57 · 214.2 · 198.5 | 889.5 min = 14.8 h |
| cnv · cnv_mat · lazy | 5 | 465.7 · 317.8 · 305.1 · 234.6 · 227.1 | 1550.2 min = 25.8 h |
| cnv · cnv_mat · lover | 5 | 1511.5 · 668.7 · 686.8 · 878.4 · 531.8 | 4277.1 min = 71.3 h |
| cnv · cnv_mat · random | 5 | 160.1 · 10 · 73.9 · 86 · 143.9 | 473.8 min = 7.9 h |
| cnv · cnv_mat · rebel | 2 | 2245.7 · 206.1 | 2451.8 min = 40.9 h |
| cnv · cnv_mat · schemer | 5 | 713.1 · 86.4 · 61.9 · 472 · 450.8 | 1784.2 min = 29.7 h |
| cnv · cnv_mat · scholar | 1 | 1294.7 | 1294.7 min = 21.6 h |
| cnv · cnv_mat · skilled | 1 | 189.9 | 189.9 min = 3.2 h |
| cnv · cnv_mat · speed | 3 | 4.5 · 14.8 · 92.2 | 111.6 min = 1.9 h |
| pf · pt_hai · cautious | 1 | 1978.1 | 1978.1 min = 33 h |
| pf · pt_hai · greedy | 2 | 2135.4 · 2040.2 | 4175.7 min = 69.6 h |
| pf · pt_hai · lazy | 2 | 114.1 · 182.2 | 296.2 min = 4.9 h |
| pf · pt_hai · lover | 3 | 3550.8 · 3733.4 · 4482.5 | 11766.7 min = 196.1 h |
| pf · pt_hai · rebel | 3 | 1268.9 · 1713.9 · 2212.2 | 5194.9 min = 86.6 h |
| pf · pt_hai · schemer | 5 | 169 · 387.6 · 352.9 · 668 · 4489.5 | 6066.9 min = 101.1 h |
| pf · pt_hai · scholar | 3 | 3276.1 · 1114.3 · 2269.5 | 6659.9 min = 111 h |
| pf · pt_hai · skilled | 1 | 1062.6 | 1062.6 min = 17.7 h |
| pf · pt_su · cautious | 1 | 3146.1 | 3146.1 min = 52.4 h |
| pf · pt_su · greedy | 2 | 1640.5 · 493.1 | 2133.6 min = 35.6 h |
| pf · pt_su · lazy | 1 | 102.4 | 102.4 min = 1.7 h |
| pf · pt_su · lover | 2 | 669.2 · 1409.7 | 2078.9 min = 34.6 h |
| pf · pt_su · rebel | 4 | 1210.6 · 300.8 · 1120.5 · 272.3 | 2904.2 min = 48.4 h |
| pf · pt_su · schemer | 5 | 224.5 · 81.7 · 73.3 · 283.6 · 576 | 1239 min = 20.7 h |
| pf · pt_su · skilled | 1 | 1736.1 | 1736.1 min = 28.9 h |
| pf · pt_tang · cautious | 1 | 1438 | 1438 min = 24 h |
| pf · pt_tang · lazy | 1 | 105.5 | 105.5 min = 1.8 h |
| pf · pt_tang · lover | 1 | 1269.2 | 1269.2 min = 21.2 h |
| pf · pt_tang · random | 1 | 209.8 | 209.8 min = 3.5 h |
| pf · pt_tang · rebel | 4 | 466.7 · 1037.3 · 1478.3 · 865.8 | 3848.1 min = 64.1 h |
| pf · pt_tang · schemer | 5 | 6315.8 · 283.1 · 404.3 · 136.8 · 1648.4 | 8788.4 min = 146.5 h |
| pf · pt_tang · scholar | 2 | 2587.5 · 4698.9 | 7286.3 min = 121.4 h |
| pf · pt_tang · skilled | 3 | 2160 · 2953.5 · 3494.1 | 8607.6 min = 143.5 h |
| pf · pt_tang · speed | 1 | 282.9 | 282.9 min = 4.7 h |
| thd · thd_hoc · lazy | 2 | 50.5 · 249.8 | 300.4 min = 5 h |
| thd · thd_hoc · lover | 2 | 617.6 · 1920 | 2537.5 min = 42.3 h |
| thd · thd_hoc · rebel | 2 | 132.1 · 1197.2 | 1329.3 min = 22.2 h |
| thd · thd_hoc · schemer | 5 | 1238.8 · 2151.3 · 881.8 · 2088.6 · 3381.1 | 9741.6 min = 162.4 h |
| thd · thd_hoc · skilled | 2 | 1420.6 · 1632.2 | 3052.8 min = 50.9 h |
| thd · thd_tho · cautious | 2 | 385.2 · 3442.2 | 3827.4 min = 63.8 h |
| thd · thd_tho · greedy | 3 | 2390.3 · 2588.2 · 2691 | 7669.5 min = 127.8 h |
| thd · thd_tho · lazy | 3 | 773.4 · 557.6 · 463.3 | 1794.3 min = 29.9 h |
| thd · thd_tho · lover | 2 | 3951.3 · 2917.2 | 6868.4 min = 114.5 h |
| thd · thd_tho · rebel | 5 | 481.5 · 615.4 · 400.4 · 1136.8 · 2376.6 | 5010.6 min = 83.5 h |
| thd · thd_tho · schemer | 5 | 1801.6 · 381.7 · 214 · 10940.3 · 1402.4 | 14739.9 min = 245.7 h |
| thd · thd_tho · scholar | 1 | 2574 | 2574 min = 42.9 h |
| thd · thd_tro · cautious | 1 | 3446.1 | 3446.1 min = 57.4 h |
| thd · thd_tro · lazy | 1 | 772.4 | 772.4 min = 12.9 h |
| thd · thd_tro · lover | 4 | 1563.1 · 2846.3 · 2861.6 · 2149.3 | 9420.3 min = 157 h |
| thd · thd_tro · rebel | 4 | 997 · 1953 · 377.7 · 643.5 | 3971.2 min = 66.2 h |
| thd · thd_tro · schemer | 5 | 653.2 · 3233.3 · 179.3 · 495.2 · 669.8 | 5230.8 min = 87.2 h |
| thd · thd_tro · scholar | 1 | 1750.8 | 1750.8 min = 29.2 h |
| thd · thd_tro · skilled | 2 | 1870.8 · 3691.9 | 5562.7 min = 92.7 h |
| thd · thd_tro · speed | 1 | 68.9 | 68.9 min = 1.1 h |

## 12 · EVENT VARIETY (cards she answered; key = pid or the title without numbers)

Per kiếp: distinct cards mean 147.2 · cards seen more than once in the same kiếp mean 68.6 · distinct cards in the whole round 7409

| family (pid prefix) | distinct cards | shows |
|---|---|---|
| card | 3146 | 226143 |
| ev | 116 | 51246 |
| j | 248 | 26816 |
| giftpick | 1 | 19287 |
| e | 97 | 17047 |
| cyrep | 1 | 10616 |
| entpick | 1 | 10462 |
| q | 3307 | 7832 |
| ilback | 1 | 4788 |
| nfch | 1 | 3308 |
| ksp | 1 | 2190 |
| rg | 2 | 2180 |
| kyngo | 1 | 2138 |
| night | 1 | 2115 |
| roadpick | 5 | 1742 |
| adStroll | 1 | 1384 |
| cnvBribe | 1 | 1117 |
| prep | 1 | 1004 |
| plantpick | 1 | 911 |
| rvframe | 1 | 836 |
| maidhostage | 1 | 817 |
| rvmusk | 1 | 815 |
| rvbribe | 1 | 804 |
| ghost | 1 | 702 |
| cnvScold | 385 | 667 |
| cnvFest | 2 | 660 |
| rvquarrel | 2 | 614 |
| guardrumour | 1 | 579 |
| poisongift | 1 | 563 |
| doll | 1 | 556 |
| menEnc | 2 | 431 |
| empnight | 1 | 420 |
| tsbFirst | 1 | 406 |
| trungcuu | 2 | 406 |
| cmLand | 1 | 392 |
| taster | 1 | 365 |
| tsbPetGift | 3 | 360 |
| vase | 1 | 327 |
| kc | 2 | 314 |
| tsbPetHunt | 1 | 264 |

| series | kiếp | distinct / kiếp | repeated in the kiếp | seen in an earlier kiếp of the series |
|---|---|---|---|---|
| bd · bd_hen · cautious | 1 | 392 | 198 | — |
| bd · bd_hen · greedy | 2 | 366.5 | 179 | 54% |
| bd · bd_hen · lazy | 1 | 47 | 11 | — |
| bd · bd_hen · lover | 1 | 339 | 155 | — |
| bd · bd_hen · random | 1 | 82 | 27 | — |
| bd · bd_hen · rebel | 2 | 197 | 92 | 73% |
| bd · bd_hen · schemer | 5 | 91.8 | 36.4 | 60% |
| bd · bd_hen · scholar | 2 | 230.5 | 101 | 20% |
| bd · bd_san · cautious | 4 | 343.3 | 169.5 | 73% |
| bd · bd_san · greedy | 3 | 324 | 147.3 | 58% |
| bd · bd_san · lazy | 2 | 122.5 | 47 | 82% |
| bd · bd_san · lover | 1 | 289 | 141 | — |
| bd · bd_san · random | 1 | 26 | 10 | — |
| bd · bd_san · rebel | 5 | 166.2 | 76.8 | 69% |
| bd · bd_san · schemer | 4 | 138.8 | 61.8 | 58% |
| bd · bd_san · scholar | 3 | 330.3 | 147 | 63% |
| bd · bd_san · skilled | 1 | 277 | 123 | — |
| bd · bd_san · speed | 2 | 92 | 34 | 19% |
| bd · bd_tuyet · cautious | 4 | 332.8 | 163.8 | 71% |
| bd · bd_tuyet · greedy | 1 | 378 | 191 | — |
| bd · bd_tuyet · lazy | 4 | 205.3 | 86.5 | 56% |
| bd · bd_tuyet · lover | 2 | 314.5 | 147 | 59% |
| bd · bd_tuyet · rebel | 5 | 219.8 | 96 | 78% |
| bd · bd_tuyet · schemer | 5 | 140 | 54.2 | 66% |
| bd · bd_tuyet · scholar | 3 | 241.7 | 105.3 | 74% |
| bd · bd_tuyet · skilled | 3 | 351 | 162.3 | 55% |
| cnv · cnv_ban · cautious | 2 | 35 | 31.5 | 97% |
| cnv · cnv_ban · greedy | 5 | 22.6 | 14.2 | 79% |
| cnv · cnv_ban · lazy | 4 | 24.5 | 17 | 74% |
| cnv · cnv_ban · lover | 4 | 98.5 | 56.8 | 85% |
| cnv · cnv_ban · random | 2 | 34.5 | 17.5 | 28% |
| cnv · cnv_ban · rebel | 3 | 97.3 | 47.7 | 8% |
| cnv · cnv_ban · schemer | 5 | 120.6 | 63.4 | 44% |
| cnv · cnv_ban · scholar | 4 | 26 | 20.3 | 64% |
| cnv · cnv_ban · skilled | 3 | 247 | 119 | 33% |
| cnv · cnv_ban · speed | 2 | 20.5 | 9.5 | 45% |
| cnv · cnv_chu · cautious | 3 | 36.3 | 31.7 | 92% |
| cnv · cnv_chu · greedy | 5 | 19.2 | 12.8 | 81% |
| cnv · cnv_chu · lazy | 5 | 25.2 | 17.2 | 71% |
| cnv · cnv_chu · lover | 4 | 109.5 | 60.5 | 22% |
| cnv · cnv_chu · random | 4 | 23.3 | 14.5 | 66% |
| cnv · cnv_chu · rebel | 3 | 41 | 18.7 | 81% |
| cnv · cnv_chu · schemer | 5 | 68.6 | 32.8 | 34% |
| cnv · cnv_chu · scholar | 3 | 273 | 129.3 | 74% |
| cnv · cnv_chu · skilled | 2 | 143 | 63 | 88% |
| cnv · cnv_chu · speed | 2 | 15 | 7.5 | 69% |
| cnv · cnv_ma · cautious | 3 | 38.3 | 33.7 | 93% |
| cnv · cnv_ma · greedy | 5 | 22.8 | 15.4 | 80% |
| cnv · cnv_ma · lazy | 5 | 26 | 19 | 66% |
| cnv · cnv_ma · lover | 4 | 17.8 | 11.8 | 77% |
| cnv · cnv_ma · random | 5 | 17 | 9 | 71% |
| cnv · cnv_ma · rebel | 1 | 16 | 15 | — |
| cnv · cnv_ma · schemer | 4 | 44.5 | 20.8 | 57% |
| cnv · cnv_ma · scholar | 4 | 150.8 | 74.8 | 59% |
| cnv · cnv_ma · skilled | 1 | 35 | 31 | — |
| cnv · cnv_ma · speed | 2 | 14 | 3.5 | 59% |
| cnv · cnv_mat · cautious | 2 | 36.5 | 32.5 | 92% |
| cnv · cnv_mat · greedy | 5 | 19.8 | 12 | 89% |
| cnv · cnv_mat · lazy | 5 | 25.2 | 19 | 67% |
| cnv · cnv_mat · lover | 5 | 132.6 | 59.4 | 72% |
| cnv · cnv_mat · random | 5 | 19.6 | 10.8 | 76% |
| cnv · cnv_mat · rebel | 2 | 171.5 | 91 | 90% |
| cnv · cnv_mat · schemer | 5 | 73.6 | 32 | 64% |
| cnv · cnv_mat · scholar | 1 | 173 | 62 | — |
| cnv · cnv_mat · skilled | 1 | 18 | 15 | — |
| cnv · cnv_mat · speed | 3 | 12.3 | 5 | 39% |
| pf · pt_hai · cautious | 1 | 291 | 132 | — |
| pf · pt_hai · greedy | 2 | 273 | 122 | 65% |
| pf · pt_hai · lazy | 2 | 113 | 37.5 | 43% |
| pf · pt_hai · lover | 3 | 397.3 | 216.3 | 62% |
| pf · pt_hai · rebel | 3 | 259 | 128.7 | 68% |
| pf · pt_hai · schemer | 5 | 116.4 | 49.6 | 59% |
| pf · pt_hai · scholar | 3 | 296.7 | 132 | 65% |
| pf · pt_hai · skilled | 1 | 211 | 93 | — |
| pf · pt_su · cautious | 1 | 249 | 138 | — |
| pf · pt_su · greedy | 2 | 186 | 71 | 67% |
| pf · pt_su · lazy | 1 | 101 | 21 | — |
| pf · pt_su · lover | 2 | 201.5 | 74 | 42% |
| pf · pt_su · rebel | 4 | 163.5 | 70 | 72% |
| pf · pt_su · schemer | 5 | 71.2 | 26.4 | 62% |
| pf · pt_su · skilled | 1 | 288 | 141 | — |
| pf · pt_tang · cautious | 1 | 215 | 90 | — |
| pf · pt_tang · lazy | 1 | 100 | 27 | — |
| pf · pt_tang · lover | 1 | 224 | 95 | — |
| pf · pt_tang · random | 1 | 67 | 19 | — |
| pf · pt_tang · rebel | 4 | 203.5 | 86.5 | 58% |
| pf · pt_tang · schemer | 5 | 130.6 | 57.4 | 75% |
| pf · pt_tang · scholar | 2 | 390.5 | 194.5 | 48% |
| pf · pt_tang · skilled | 3 | 344.7 | 162.3 | 56% |
| pf · pt_tang · speed | 1 | 60 | 20 | — |
| thd · thd_hoc · lazy | 2 | 106.5 | 31.5 | 25% |
| thd · thd_hoc · lover | 2 | 215.5 | 90 | 35% |
| thd · thd_hoc · rebel | 2 | 142.5 | 56.5 | 17% |
| thd · thd_hoc · schemer | 5 | 170.2 | 66.2 | 69% |
| thd · thd_hoc · skilled | 2 | 248.5 | 112 | 51% |
| thd · thd_tho · cautious | 2 | 187 | 95.5 | 24% |
| thd · thd_tho · greedy | 3 | 348 | 165.3 | 65% |
| thd · thd_tho · lazy | 3 | 233.7 | 104.7 | 68% |
| thd · thd_tho · lover | 2 | 319.5 | 176 | 63% |
| thd · thd_tho · rebel | 5 | 202.4 | 82.8 | 63% |
| thd · thd_tho · schemer | 5 | 165.2 | 70.6 | 66% |
| thd · thd_tho · scholar | 1 | 295 | 150 | — |
| thd · thd_tro · cautious | 1 | 329 | 164 | — |
| thd · thd_tro · lazy | 1 | 289 | 134 | — |
| thd · thd_tro · lover | 4 | 322.5 | 151.8 | 58% |
| thd · thd_tro · rebel | 4 | 205.8 | 87.8 | 66% |
| thd · thd_tro · schemer | 5 | 129.8 | 54.2 | 72% |
| thd · thd_tro · scholar | 1 | 230 | 101 | — |
| thd · thd_tro · skilled | 2 | 293 | 141 | 47% |
| thd · thd_tro · speed | 1 | 34 | 10 | — |

Families / templates never seen in the round need an event catalogue (j68 EV6 / j70 / j71 / j72 / j7 / j24 / ARC67 beats): not built yet (gap, order #5).

## LAG (ORDER #7: tap→screen, turn time, long tasks, memory, crashes; solo + co-op)

### Solo · tap → screen (real pages, CPU ×4, one probe per UI checkpoint; ms from the tap to the 2nd painted frame)

| device | action | taps | p50 ms | p95 ms | max ms |
|---|---|---|---|---|---|
| fold | tab switch | 2898 | 845 | 2424 | 62706 |
| fold | act card | 301 | 1750 | 2586 | 3203 |
| fold | Sang ngày mới | 321 | 1571 | 3029 | 8596 |
| fold | ALL | 3520 | 986 | 2615 | 62706 |
| ipad | tab switch | 2898 | 777 | 2971 | 56289 |
| ipad | act card | 322 | 1715 | 2351 | 3111 |
| ipad | Sang ngày mới | 321 | 2224 | 3683 | 20489 |
| ipad | ALL | 3541 | 955 | 3238 | 56289 |

Slowest tabs (max over all probes):

| device | tab | taps | p50 | p95 | max |
|---|---|---|---|---|---|
| fold | tab:go | 322 | 1197 | 19290 | 62706 |
| ipad | tab:go | 322 | 1270 | 39630 | 56289 |
| fold | tab:court | 322 | 828 | 1603 | 5422 |
| ipad | tab:inv | 322 | 799 | 2053 | 3589 |
| fold | tab:act | 322 | 1547 | 2290 | 3284 |
| fold | tab:inv | 322 | 853 | 2010 | 3224 |
| fold | tab:act(again) | 322 | 1447 | 2233 | 3087 |
| fold | tab:rel | 322 | 538 | 1243 | 2849 |

Tap → screen by game-year (does it slow as the save grows?):

| device | game-year | taps | p50 ms | p95 ms | max ms |
|---|---|---|---|---|---|
| fold | year 0-2 | 2477 | 859 | 2451 | 25417 |
| fold | year 3-5 | 684 | 1113 | 2893 | 53364 |
| fold | year 6-9 | 337 | 1294 | 2886 | 62706 |
| fold | year 10+ | 22 | 1603 | 3083 | 3284 |
| ipad | year 0-2 | 2496 | 828 | 3587 | 56289 |
| ipad | year 3-5 | 682 | 1083 | 3161 | 52359 |
| ipad | year 6-9 | 341 | 1236 | 2757 | 50900 |
| ipad | year 10+ | 22 | 1626 | 3211 | 3390 |

### Solo · long tasks > 50 ms

| where | long tasks | per min | longest ms | total ms |
|---|---|---|---|---|
| fold (real page, probe only, CPU ×4) | 17440 | 105.4 | 50018 | 8921459 |
| ipad (real page, probe only, CPU ×4) | 17884 | 80.5 | 37820 | 12186457 |
| bot page (render off = game logic only) | 4846 | 6.7 | 258547 | 10703402 |

Worst frames, script attribution (long-animation-frame API; src:position is the built index.html, find it with the build's char offset):

| device | script ms | frame ms | function | invoker | src:char |
|---|---|---|---|---|---|
| ipad | 10663 | 10847 | (anon) | FrameRequestCallback | :-1 |
| ipad | 10629 | 10789 | (anon) | FrameRequestCallback | :-1 |
| ipad | 10536 | 10702 | (anon) | FrameRequestCallback | :-1 |
| ipad | 9935 | 10116 | (anon) | FrameRequestCallback | :-1 |
| ipad | 9783 | 9957 | (anon) | FrameRequestCallback | :-1 |
| ipad | 9596 | 9776 | (anon) | FrameRequestCallback | :-1 |
| ipad | 9553 | 9807 | (anon) | FrameRequestCallback | :-1 |
| ipad | 9207 | 9373 | (anon) | FrameRequestCallback | :-1 |

### Solo · buổi / month turn time (bot page, render off = the game's own logic time)

| game-year | buổi changes | buổi p50 ms | buổi p95 | buổi max | months | month p50 ms | month p95 | month max |
|---|---|---|---|---|---|---|---|---|
| ALL | 41213 | 53 | 227 | 11794 | 2651 | 1052 | 2624 | 13524 |
| year 0-2 | 24287 | 49 | 175 | 11794 | 1568 | 857 | 1458 | 13524 |
| year 3-5 | 11707 | 57 | 402 | 2165 | 747 | 1333 | 2205 | 3987 |
| year 6-9 | 4799 | 76 | 932 | 3185 | 309 | 2247 | 4090 | 5487 |
| year 10+ | 420 | 88 | 1658 | 2407 | 27 | 3099 | 4999 | 5015 |

### Solo · memory growth (bot page JS heap / DOM nodes / listeners; real pages) per game-year and per real hour

| life | sampled | game years | heap MB | MB / game-year | MB / real hour | nodes / hour | listeners / hour |
|---|---|---|---|---|---|---|---|
| bd-bd_san-scholar-1 | 27.7 min | 0 | 72 → 821 | — | 1625.3 | 737316 | 29798 |
| bd-bd_san-schemer-1 | 7.8 min | 0 | 76 → 631 | — | 4296.8 | 4228521 | 90449 |
| bd-bd_hen-scholar-5 | 26 min | 0 | 72 → 518 | — | 1029.9 | 323852 | 19579 |
| thd-thd_hoc-schemer-2 | 12.3 min | 0 | 76 → 504 | — | 2090.6 | 932019 | 39610 |
| bd-bd_san-scholar-2 | 27.3 min | 0 | 75 → 467 | — | 861.5 | 1097 | 1842 |
| pf-pt_su-greedy-2 | 18.2 min | 0 | 72 → 443 | — | 1224.2 | 915990 | 42606 |
| bd-bd_hen-greedy-3 | 24.2 min | 0 | 72 → 432 | — | 894.4 | 552489 | 35058 |
| pf-pt_su-schemer-4 | 10.7 min | 0 | 79 → 432 | — | 1973.3 | 996440 | 40494 |
| bd-bd_hen-greedy-1 | 24.7 min | 0 | 77 → 409 | — | 806.5 | 278927 | 17322 |
| pf-pt_su-skilled-1 | 23.4 min | 0 | 69 → 398 | — | 844.8 | 392179 | 25408 |

Over 37 lives: heap growth median 747.4 MB/h, p95 2090.6 MB/h; per game-year median — MB, p95 — MB (budget heapGrowthMB 15 per play window; domGrowth 1500).

Tab crashes: **0 of 314 lives** (none). Harness runs PAR 2 + page recycle: a crash here is box RAM, see reports/robot10-harness.md Part 2.

Budget (dev/test/play-perf-budget.json — _target is the goal, default is the regression ceiling; CPU-throttled ×4):

| device | metric | measured ms | target | ceiling | verdict |
|---|---|---|---|---|---|
| fold | tapP95 | 2615 | 200 | 3500 | within regression ceiling |
| fold | tapMax | 62706 | 400 | 8000 | OVER ceiling |
| fold | actLongTaskMax | 50018 | 300 | 4500 | OVER ceiling |
| ipad | tapP95 | 3238 | 200 | 3500 | within regression ceiling |
| ipad | tapMax | 56289 | 400 | 8000 | OVER ceiling |
| ipad | actLongTaskMax | 37820 | 300 | 4500 | OVER ceiling |

### Co-op pairs (dev/test/coop-lag.js metrics; same names, budget = the coop* keys of play-perf-budget.json)

No co-op lag runs passed in. Foreman B's co-op runners record the same metrics through `dev/test/lib/coop-lag-hooks.js` (init(ctx) + metrics(...)) and `node dev/test/coop-lag.js --out <file>`; pass the file(s) with `--coop` / put `coop-lag*.json` in the folder.

### Known game findings folded into LAG (report only; found by the part-2 harness, 23/11)

- Real-page save load leaks ~5–6k DOM nodes + 600–800 JS listeners per load (RECYCLE=1 re-opens the pages to keep the box alive).
- Bot page JS heap 56 MB → ~1 GB with ~350k-node DOM bursts while render is off.

### LAG RECOMMENDATIONS (finding → cause / file:line → proposed fix → expected effect)

| finding | cause / file:line | proposed fix | expected effect |
|---|---|---|---|
| buổi change p95 227 ms (render off, desktop CPU) | robot10-in.js nextBuoi wrapper = the game's nextBuoi(); per-year table above shows if it grows | profile nextBuoi (jnf / j-turn code): keep per-buổi work O(1) in save size; defer journal / NPC upkeep | a turn the player never waits on |
| buổi p95 grows 175 → 1658 ms from the first to the last year band | nextBuoi: something scales with the save (journal / log arrays, NPC list, history) | cap or compact the growing array (ring buffer; prune the journal) in the offending function | turn time flat over a whole life |
| bot-page heap grows p95 2091 MB per real hour (render off) | bot page: ~350k-node DOM bursts while render is off (game finding 23/11); DOM nodes/listeners columns above | find the function that builds the DOM bursts when render is off; skip DOM work while the page is hidden / render is off | heap flat; no tab crash on a long life |
| [fold] tap → screen p95 2615 ms (target 200); slowest: tab:go p95 19290 ms | (anon) (FrameRequestCallback) :-1, 3951 ms in one frame | render only the changed panel; build tab content lazily on first open | tap p95 under the target on a phone-class CPU |
| [ipad] tap → screen p95 3238 ms (target 200); slowest: tab:go p95 39630 ms | (anon) (FrameRequestCallback) :-1, 10663 ms in one frame | render only the changed panel; build tab content lazily on first open | tap p95 under the target on a phone-class CPU |
| Dư đồ («go» tab) on a PLAYED save takes ~12 s at CPU ×1, ~39 s at ×4 (a fresh life: 0.25–0.4 s); the second open costs the same, pictures blocked or not (profile of the tap, 500 µs sampling) | kmSolve (map label / path solver) dev/build/j38.js:19 with its callers hardAt / segR / ovP / costAt / search / geo; called from j38.js:83 up to 5× per open (kmSolve(its,K,W,undefined,vp) then 4 retries); the result cache window.__mapSolC[ck] is not hit on the 2nd open (same cost again) | solve the labels once per save change, not per open: make the cache key stable (ck without volatile fields), cap the first pass by the same performance.now() budget as the retries, pre-solve off the tap (idle / on load), keep the last good layout while a new one is solved | Dư đồ opens in < 400 ms on a played save |
| real-page save load leaks ~5-6k DOM nodes + 600-800 listeners per load (part 2 finding) | loadSlot / start() re-render path (see reports/robot10-harness.md Part 2 for the measurements) | remove the previous screen's nodes + listeners before building the loaded one (one teardown function in the kit) | a long session of loads / Tiếp tục stays flat |

## ANIM BUDGET (ORDER #8: how many animated figures a screen can hold, per format; synthetic loops of today's real figure pictures, no new art)

No anim-stress runs found (`node dev/measure/robot10-anim.js …`, files anim-*.json).

## Per thân phận · nhánh · bot

| group | lives | ending reached | death | thường | kỳ ngộ | đại kết cục | rare | Hoàng hậu | Nữ đế | Hoàng thái hậu | no ending | avg years | avg real min | bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bd | 68 | 100% | 100% | 0% | 0% | 0% | 0% | 10% | 0% | 1% | 0% | 6 | 1588.2 | 758 |
| cnv | 138 | 100% | 52% | 46% | 0% | 1% | 0% | 1% | 0% | 1% | 0% | 7.7 | 681.9 | 1013 |
| pf | 55 | 100% | 100% | 0% | 0% | 0% | 0% | 4% | 0% | 2% | 0% | 5.2 | 1497.8 | 601 |
| thd | 53 | 100% | 96% | 0% | 0% | 4% | 0% | 0% | 0% | 0% | 0% | 5.5 | 1691.9 | 641 |
| bd · bd_hen | 15 | 100% | 100% | 0% | 0% | 0% | 0% | 7% | 0% | 0% | 0% | 4.7 | 1172.8 | 94 |
| bd · bd_san | 26 | 100% | 100% | 0% | 0% | 0% | 0% | 12% | 0% | 0% | 0% | 5.4 | 1563.3 | 228 |
| bd · bd_tuyet | 27 | 100% | 100% | 0% | 0% | 0% | 0% | 11% | 0% | 4% | 0% | 7.3 | 1843 | 436 |
| cnv · cnv_ban | 34 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.8 | 943.7 | 258 |
| cnv · cnv_chu | 36 | 100% | 56% | 39% | 0% | 6% | 0% | 3% | 0% | 3% | 0% | 7 | 702.8 | 257 |
| cnv · cnv_ma | 34 | 100% | 41% | 59% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.1 | 560.6 | 226 |
| cnv · cnv_mat | 34 | 100% | 62% | 38% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.8 | 519.3 | 272 |
| pf · pt_hai | 20 | 100% | 100% | 0% | 0% | 0% | 0% | 5% | 0% | 0% | 0% | 6.8 | 1860.1 | 260 |
| pf · pt_su | 16 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.3 | 833.8 | 79 |
| pf · pt_tang | 19 | 100% | 100% | 0% | 0% | 0% | 0% | 5% | 0% | 5% | 0% | 5.1 | 1675.6 | 262 |
| thd · thd_hoc | 13 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.6 | 1304.7 | 66 |
| thd · thd_tho | 21 | 100% | 95% | 0% | 0% | 5% | 0% | 0% | 0% | 0% | 0% | 6.5 | 2023.1 | 319 |
| thd · thd_tro | 19 | 100% | 95% | 0% | 0% | 5% | 0% | 0% | 0% | 0% | 0% | 5.7 | 1590.7 | 256 |
| bot cautious | 25 | 100% | 76% | 24% | 0% | 0% | 0% | 12% | 0% | 0% | 0% | 9 | 2682.1 | 293 |
| bot greedy | 33 | 100% | 48% | 52% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.4 | 1044.4 | 295 |
| bot lazy | 36 | 100% | 44% | 44% | 0% | 11% | 0% | 0% | 0% | 0% | 0% | 7.5 | 311.1 | 336 |
| bot lover | 35 | 100% | 74% | 26% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.2 | 1665.9 | 392 |
| bot random | 19 | 100% | 89% | 11% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.7 | 140.7 | 107 |
| bot rebel | 43 | 100% | 91% | 9% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.5 | 878.1 | 382 |
| bot schemer | 63 | 100% | 92% | 8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.7 | 1119.4 | 593 |
| bot scholar | 27 | 100% | 89% | 11% | 0% | 0% | 0% | 19% | 0% | 11% | 0% | 8.5 | 1906.2 | 295 |
| bot skilled | 20 | 100% | 90% | 10% | 0% | 0% | 0% | 10% | 0% | 0% | 0% | 8.3 | 1970.5 | 284 |
| bot speed | 13 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.9 | 99.6 | 36 |

| group | lives | ending reached | death | thường | kỳ ngộ | đại kết cục | rare | Hoàng hậu | Nữ đế | Hoàng thái hậu | no ending | avg years | avg real min | bugs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bd · bd_hen · cautious | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.4 | 3571.9 | 15 |
| bd · bd_hen · greedy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.8 | 2375.6 | 14 |
| bd · bd_hen · lazy | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.4 | 41.9 | 3 |
| bd · bd_hen · lover | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.3 | 1829.8 | 8 |
| bd · bd_hen · random | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1.1 | 189.9 | 4 |
| bd · bd_hen · rebel | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.2 | 865.5 | 11 |
| bd · bd_hen · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3 | 408.3 | 28 |
| bd · bd_hen · scholar | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 50% | 0% | 0% | 0% | 5.5 | 1717 | 11 |
| bd · bd_san · cautious | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 50% | 0% | 0% | 0% | 10 | 3191.9 | 73 |
| bd · bd_san · greedy | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.6 | 2470.4 | 51 |
| bd · bd_san · lazy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.3 | 197.4 | 8 |
| bd · bd_san · lover | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.1 | 2293.6 | 6 |
| bd · bd_san · random | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.2 | 34.6 | 4 |
| bd · bd_san · rebel | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.2 | 625.9 | 20 |
| bd · bd_san · schemer | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.5 | 925 | 23 |
| bd · bd_san · scholar | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 33% | 0% | 0% | 0% | 9 | 2684.4 | 17 |
| bd · bd_san · skilled | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.4 | 2258.3 | 20 |
| bd · bd_san · speed | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1 | 302.1 | 6 |
| bd · bd_tuyet · cautious | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.7 | 3564.2 | 94 |
| bd · bd_tuyet · greedy | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 15.1 | 4158.7 | 20 |
| bd · bd_tuyet · lazy | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.6 | 536.9 | 52 |
| bd · bd_tuyet · lover | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.8 | 3001.5 | 36 |
| bd · bd_tuyet · rebel | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.6 | 1119.8 | 70 |
| bd · bd_tuyet · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.4 | 770.9 | 51 |
| bd · bd_tuyet · scholar | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 33% | 0% | 33% | 0% | 5.1 | 1667.3 | 38 |
| bd · bd_tuyet · skilled | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 67% | 0% | 0% | 0% | 9.3 | 2913.3 | 75 |
| cnv · cnv_ban · cautious | 2 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.1 | 2162.9 | 5 |
| cnv · cnv_ban · greedy | 5 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.4 | 222.5 | 29 |
| cnv · cnv_ban · lazy | 4 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.8 | 287.8 | 34 |
| cnv · cnv_ban · lover | 4 | 100% | 25% | 75% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.3 | 1241.5 | 35 |
| cnv · cnv_ban · random | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.4 | 126.8 | 12 |
| cnv · cnv_ban · rebel | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.5 | 595.9 | 23 |
| cnv · cnv_ban · schemer | 5 | 100% | 60% | 40% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.8 | 1916.9 | 59 |
| cnv · cnv_ban · scholar | 4 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.9 | 741.6 | 13 |
| cnv · cnv_ban · skilled | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.9 | 1940.4 | 44 |
| cnv · cnv_ban · speed | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1.4 | 58.4 | 4 |
| cnv · cnv_chu · cautious | 3 | 100% | 67% | 33% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7 | 2210.3 | 11 |
| cnv · cnv_chu · greedy | 5 | 100% | 40% | 60% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.3 | 187.2 | 24 |
| cnv · cnv_chu · lazy | 5 | 100% | 0% | 60% | 0% | 40% | 0% | 0% | 0% | 0% | 0% | 7.7 | 221.5 | 40 |
| cnv · cnv_chu · lover | 4 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.8 | 1080.2 | 26 |
| cnv · cnv_chu · random | 4 | 100% | 75% | 25% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.5 | 192.2 | 31 |
| cnv · cnv_chu · rebel | 3 | 100% | 33% | 67% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.9 | 195.8 | 13 |
| cnv · cnv_chu · schemer | 5 | 100% | 60% | 40% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.9 | 565.6 | 41 |
| cnv · cnv_chu · scholar | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 33% | 0% | 33% | 0% | 9.1 | 2150.9 | 45 |
| cnv · cnv_chu · skilled | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.5 | 798.7 | 18 |
| cnv · cnv_chu · speed | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1 | 36 | 8 |
| cnv · cnv_ma · cautious | 3 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.2 | 2344 | 14 |
| cnv · cnv_ma · greedy | 5 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.8 | 245.6 | 44 |
| cnv · cnv_ma · lazy | 5 | 100% | 20% | 80% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.4 | 286.9 | 48 |
| cnv · cnv_ma · lover | 4 | 100% | 25% | 75% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.7 | 168.8 | 16 |
| cnv · cnv_ma · random | 5 | 100% | 80% | 20% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.1 | 148.7 | 19 |
| cnv · cnv_ma · rebel | 1 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.8 | 213 | 3 |
| cnv · cnv_ma · schemer | 4 | 100% | 75% | 25% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.2 | 230.3 | 32 |
| cnv · cnv_ma · scholar | 4 | 100% | 75% | 25% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10 | 1498.7 | 40 |
| cnv · cnv_ma · skilled | 1 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.8 | 780.9 | 5 |
| cnv · cnv_ma · speed | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.5 | 19.1 | 5 |
| cnv · cnv_mat · cautious | 2 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.5 | 2315.9 | 10 |
| cnv · cnv_mat · greedy | 5 | 100% | 20% | 80% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.2 | 177.9 | 34 |
| cnv · cnv_mat · lazy | 5 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 10.8 | 310 | 57 |
| cnv · cnv_mat · lover | 5 | 100% | 80% | 20% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.3 | 855.4 | 68 |
| cnv · cnv_mat · random | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.1 | 94.8 | 25 |
| cnv · cnv_mat · rebel | 2 | 100% | 50% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11 | 1225.9 | 14 |
| cnv · cnv_mat · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 5.5 | 356.8 | 42 |
| cnv · cnv_mat · scholar | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 5.1 | 1294.7 | 11 |
| cnv · cnv_mat · skilled | 1 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.8 | 189.9 | 4 |
| cnv · cnv_mat · speed | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.9 | 37.2 | 7 |
| pf · pt_hai · cautious | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 0% | 0% | 6.7 | 1978.1 | 14 |
| pf · pt_hai · greedy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.1 | 2087.8 | 25 |
| pf · pt_hai · lazy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.5 | 148.1 | 19 |
| pf · pt_hai · lover | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 13.5 | 3922.2 | 52 |
| pf · pt_hai · rebel | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.1 | 1731.6 | 39 |
| pf · pt_hai · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.6 | 1213.4 | 51 |
| pf · pt_hai · scholar | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.3 | 2220 | 46 |
| pf · pt_hai · skilled | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.4 | 1062.6 | 14 |
| pf · pt_su · cautious | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 8.1 | 3146.1 | 6 |
| pf · pt_su · greedy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.4 | 1066.8 | 12 |
| pf · pt_su · lazy | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1.3 | 102.4 | 3 |
| pf · pt_su · lover | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.2 | 1039.5 | 9 |
| pf · pt_su · rebel | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.8 | 726 | 17 |
| pf · pt_su · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.4 | 247.8 | 24 |
| pf · pt_su · skilled | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.7 | 1736.1 | 8 |
| pf · pt_tang · cautious | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.6 | 1438 | 11 |
| pf · pt_tang · lazy | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1.5 | 105.5 | 8 |
| pf · pt_tang · lover | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.4 | 1269.2 | 18 |
| pf · pt_tang · random | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 1.2 | 209.8 | 12 |
| pf · pt_tang · rebel | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.8 | 962 | 60 |
| pf · pt_tang · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.2 | 1757.7 | 61 |
| pf · pt_tang · scholar | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 50% | 0% | 50% | 0% | 10.8 | 3643.2 | 42 |
| pf · pt_tang · skilled | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.3 | 2869.2 | 47 |
| pf · pt_tang · speed | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.7 | 282.9 | 3 |
| thd · thd_hoc · lazy | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2 | 150.2 | 9 |
| thd · thd_hoc · lover | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.8 | 1268.8 | 10 |
| thd · thd_hoc · rebel | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 2.7 | 664.6 | 9 |
| thd · thd_hoc · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.2 | 1948.3 | 24 |
| thd · thd_hoc · skilled | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.8 | 1526.4 | 14 |
| thd · thd_tho · cautious | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 5.2 | 1913.7 | 22 |
| thd · thd_tho · greedy | 3 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.3 | 2556.5 | 42 |
| thd · thd_tho · lazy | 3 | 100% | 67% | 0% | 0% | 33% | 0% | 0% | 0% | 0% | 0% | 8.9 | 598.1 | 43 |
| thd · thd_tho · lover | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 11.3 | 3434.2 | 36 |
| thd · thd_tho · rebel | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.1 | 1002.1 | 57 |
| thd · thd_tho · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 4.1 | 2948 | 103 |
| thd · thd_tho · scholar | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.5 | 2574 | 16 |
| thd · thd_tro · cautious | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 12.2 | 3446.1 | 18 |
| thd · thd_tro · lazy | 1 | 100% | 0% | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 8.9 | 772.4 | 12 |
| thd · thd_tro · lover | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 7.9 | 2355.1 | 72 |
| thd · thd_tro · rebel | 4 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.7 | 992.8 | 46 |
| thd · thd_tro · schemer | 5 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 3.3 | 1046.2 | 54 |
| thd · thd_tro · scholar | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 6.4 | 1750.8 | 16 |
| thd · thd_tro · skilled | 2 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 9.1 | 2781.4 | 35 |
| thd · thd_tro · speed | 1 | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0.3 | 68.9 | 3 |

## Locked roads (arcOk67 false at start; never open in 5 kiếp = bug)

- thd_hoc: 13 lives · opened in 13 · played in 13

## RECOMMENDATIONS (OWNER ORDER #6 — report only; values change after sếp's OK via MAIN, then one re-run confirms)

BAL read from the game page http://127.0.0.1:42347/index.html at 2026-11-25T05:27:50.746Z (law 4). Targets: OD:L43 (each origin HH ~20–40 %, smart bot) · OD:L19/L43 (overall ~32 %) · OD:L43 (cnv ~20–25 %) · OD:L19 (early death ~40–45 %) · OD:L19 (childbirth death 8–12 % per birth) · kiếp cap: PROVISIONAL — OD 23/11 ~23:25Z «a kiếp must not drag» has no number; MAIN to set. Proposed values = first-order estimates (current × target ÷ observed, ×0.5–×2); rows under 20 lives are «low n».

| area | finding (off vs target) | BAL key(s) file:line | current | proposed | expected effect |
|---|---|---|---|---|---|
| (1) origin weight | nc: HH reach 7.3 % (9/123) BELOW 20–40 % · n 123 | BAL.orig.ow.nc jbal.js:140 | 6 (6 % of rolls) | 12 + tune the origin's own numbers (start stats BAL.orig.nc / its roads) | weight alone cannot lift reach: a hard origin rolled a bit more only if MAIN wants; the reach fix is in its own numbers |
| (1) origin weight | thd: HH reach 0 % (0/53) BELOW 20–40 % · n 53 | BAL.orig.ow.thd jbal.js:140 | 9 (9 % of rolls) | 18 + tune the origin's own numbers (start stats BAL.orig.thd / its roads) | weight alone cannot lift reach: a hard origin rolled a bit more only if MAIN wants; the reach fix is in its own numbers |
| (1) origin weight | cnv: HH reach 0.7 % (1/138) BELOW 20–25 % · n 138 | BAL.orig.ow.cnv jbal.js:140 | 8 (8 % of rolls) | 16 + tune the origin's own numbers (start stats BAL.orig.cnv / its roads) | weight alone cannot lift reach: a hard origin rolled a bit more only if MAIN wants; the reach fix is in its own numbers |
| (1) overall HH | expected overall HH with today's weights 2.2 % vs target ~32 % (origins measured: nc thd cnv) | BAL.orig.ow jbal.js:140 | sum 100 | the per-origin values above, renormalised to the same sum | expected overall HH 2.2 % |
| (1) origin weight | no lives this round: 6 origin(s) — HH reach unknown | BAL.orig.ow jbal.js:140 | cn 13 · dtq 17 · muoi 17 · ch 13 · td 9 · tt 8 | keep | measured when their runners' JSON joins the round |
| (2) early death | death before old age (55, BAL.mort.oldAge) 78.3 % of lives (246/314) vs 40–45 % → TOO HIGH · n 314 | BAL.mort.oldAge jbal2.js:176 | 55 | per cause below | early death → ~42.5 % |
| (2) death cause | execution: 89 early deaths = 28.3 % of lives (36.2 % of early deaths) · mean age 23.7 | BAL.mort.fate.tuanP jbal2.js:181 | 25 | 14 | execution deaths × ~0.54 (odds scaled) |
| (2) death cause | fate (lifespan): 46 early deaths = 14.6 % of lives (18.7 % of early deaths) · mean age 26 | BAL.mort.life.dice.adult.mean jbal2.js:174 | 45 | 83 | fate (lifespan) deaths × ~0.54 (later death age) |
| (2) death cause | fate (lifespan): 46 early deaths = 14.6 % of lives (18.7 % of early deaths) · mean age 26 | BAL.mort.dieAge jbal2.js:178 | [45,15,25] | [83,15,25] | fate (lifespan) deaths × ~0.54 (later death age) |
| (2) death cause | poison: 36 early deaths = 11.5 % of lives (14.6 % of early deaths) · mean age 21.6 | BAL.mort.acc.npc jbal2.js:176 | 0.08 | 0.04 | poison deaths × ~0.54 (odds scaled) |
| (2) death cause | other: 30 early deaths (12.2 % of them) — sites: j3.js:157, j14.js:40, j3.js:160 | no BAL key mapped for this cause (law 4 gap?) | — | — | — |
| (2) death cause | childbirth: 24 early deaths = 7.6 % of lives (9.8 % of early deaths) · mean age 23.9 | BAL.mort.birth.hardDie jbal2.js:179 | 45 | 24 | childbirth deaths × ~0.54 (odds scaled) |
| (2) death cause | childbirth: 24 early deaths = 7.6 % of lives (9.8 % of early deaths) · mean age 23.9 | BAL.mort.birth.hardX jbal2.js:179 | 2 | 1.08 | childbirth deaths × ~0.54 (odds scaled) |
| (2) death cause | illness: 20 early deaths = 6.4 % of lives (8.1 % of early deaths) · mean age 21.7 | BAL.mort.illAge jbal2.js:178 | [35,25,1.5] | [65,25,1.5] | illness deaths × ~0.54 (later death age) |
| (2) death cause | illness: 20 early deaths = 6.4 % of lives (8.1 % of early deaths) · mean age 21.7 | BAL.mort.sudden jbal2.js:176 | 15 | 8 | illness deaths × ~0.54 (odds scaled) |
| (2) death cause | NPC / scheme: 1 early deaths (0.4 % of them) — sites: j42.js:296 | no BAL key mapped for this cause (law 4 gap?) | — | — | — |
| (2) lifespan floor | 36 death(s) «Tuổi trời đã tận» before age 30 (= mean − sd of her lifespan dice; youngest 19) | BAL.mort.life.dice.adult.lo jbal2.js:174 | 15 | 30 | no lifespan death before mean − sd; illness / schemes still kill young |
| (2) childbirth | death in childbirth 14.4 % per birth (24 of 167) vs 8–12 % → TOO HIGH · n 167 | BAL.mort.birth.hardDie jbal2.js:179 | 45 | 31 | → ~10 % per birth |
| (3) reach speed | Phi: reached by 86/314 · after 4 game years · 1231.8 real min (pace model) · passes the step from Tần: 81.1 % · n 106 | RANKS[4].s/.d j1.js:6 (not in BAL: law 4 flag) · promoGap j8.js:405 | Sủng 52 · Danh 42 · gap 5 tháng | see bottleneck row | — |
| (3) reach speed | Quý phi: reached by 61/314 · after 5.4 game years · 1667.7 real min (pace model) · passes the step from Phi: 70.9 % · n 86 | RANKS[5].s/.d j1.js:6 (not in BAL: law 4 flag) · promoGap j8.js:405 | Sủng 66 · Danh 55 · gap 7 tháng | see bottleneck row | — |
| (3) reach speed | Hoàng quý phi: reached by 35/314 · after 6.2 game years · 2004.1 real min (pace model) · passes the step from Quý phi: 57.4 % · n 61 | RANKS[6].s/.d j1.js:6 (not in BAL: law 4 flag) · promoGap j8.js:405 | Sủng 78 · Danh 68 · gap 9 tháng | see bottleneck row | — |
| (3) reach speed | Hoàng hậu: reached by 10/314 · after 9 game years · 3057.2 real min (pace model) · passes the step from Hoàng quý phi: 28.6 % · n 35 | RANKS[7].s/.d j1.js:6 (not in BAL: law 4 flag) · promoGap j8.js:405 | Sủng 85 · Danh 78 · gap 11 tháng | see bottleneck row | — |
| (3) bottleneck | HH 3.2 % < 20 %: the hardest step is Hoàng quý phi → Hoàng hậu (only 28.6 % of those at Hoàng quý phi pass) · n 35 | RANKS[7] j1.js:6 (move to BAL first, law 4) | Sủng 85 · Danh 78 | Sủng 82 · Danh 73 (the step from Hoàng quý phi cut to ×0.5) | more lives pass the bottleneck step → HH reach up; re-run confirms |
| (3) pace model | reading = 67.5 % of the modelled real minutes; PACE is NOT calibrated against human-paced play (part-2 gap) | robot10-agg.js PACE (READ_CPS 17, CLICK_S 1, CHOICE_S 2) | — | calibrate READ_CPS with one human-paced kiếp before any minutes-based tuning; until then use the game-year column | real-minute rows become trustworthy |
| (3) kiếp length | mean kiếp 1191.6 real min (ended lives 1191.6) vs cap 120 min (PROVISIONAL — OD 23/11 ~23:25Z «a kiếp must not drag» has no number; MAIN to set) | pace: robot10-agg.js PACE + the rank steps above | — | lower the slowest step (bottleneck row) or BAL.entry.cap start rank | — |
| (4) ending too common | «Hồng nhan bạc mệnh» = 68.2 % of 314 endings (order #6 (4): one ending > half of all endings = too common) · n 314 | see (2) death rows (this ending is a death) | — | the (2) values | other endings get room |
| (4) rare ending too rare | road bd_san: 0 rare endings in 26 lives (p 0.15 → expected 3.9) | BAL.arc.rare.bd_san.p jbalbd.js:27 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road bd_tuyet: 0 rare endings in 27 lives (p 0.15 → expected 4.1) | BAL.arc.rare.bd_tuyet.p jbalbd.js:163 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road cnv_ban: 0 rare endings in 34 lives (p 0.15 → expected 5.1) | BAL.arc.rare.cnv_ban.p jbalarc.js:98 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road cnv_chu: 0 rare endings in 36 lives (p 0.15 → expected 5.4) | BAL.arc.rare.cnv_chu.p jbalarc.js:97 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road cnv_ma: 0 rare endings in 34 lives (p 0.15 → expected 5.1) | BAL.arc.rare.cnv_ma.p jbalarc.js:100 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road cnv_mat: 0 rare endings in 34 lives (p 0.15 → expected 5.1) | BAL.arc.rare.cnv_mat.p jbalarc.js:99 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road pt_hai: 0 rare endings in 20 lives (p 0.15 → expected 3) | BAL.arc.rare.pt_hai.p jbalpt.js:34 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road thd_tho: 0 rare endings in 21 lives (p 0.15 → expected 3.2) | BAL.arc.rare.thd_tho.p jbalarc.js:93 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) rare ending too rare | road thd_tro: 0 rare endings in 20 lives (p 0.15 → expected 3) | BAL.arc.rare.thd_tro.p jbalarc.js:95 | 0.15 | 0.22 | rare ending seen about once per 4 lives |
| (4) kỳ ngộ too common | mean 10.1 kỳ ngộ per life vs ≤ 6 (PROVISIONAL — no OD number for kỳ ngộ per kiếp; MAIN to set) | BAL.kyngo.p0 jbalky.js:10 | 85 | 68 | kỳ ngộ feels special again |
| (4) events repeat | cards seen again in the same kiếp: 68.6 of 147.2 distinct (46.6 %) vs ≤ 25 % | BAL.eff.j68q.cd jbaleff.js:42 | 10 | 19 | longer cooldown before a j68 card returns |

No change needed / not yet judgeable: branch pf (par nc) is in BAL.orig.br.nc (weight 1 of 3): rolled · branch bd (par nc) is in BAL.orig.br.nc (weight 1 of 3): rolled · road bd_hen: no rare ending yet in 15 lives (p 0.15: need ≥ 20 lives to judge) · road pt_su: no rare ending yet in 16 lives (p 0.15: need ≥ 20 lives to judge) · road pt_tang: no rare ending yet in 19 lives (p 0.15: need ≥ 20 lives to judge) · road thd_hoc: no rare ending yet in 12 lives (p 0.15: need ≥ 20 lives to judge)
