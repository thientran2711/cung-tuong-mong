# TITLES2 — step 2 BUILD report (E55, session_01DgYSWmSsW6T7nM2qDQXJhD; FOREMAN E ROOT-1)

PRIORITY #1 CHECK: ('danh hiệu|DH_CAT|jdh|titles2|Họa thủy|Độc phụ|Khuynh quốc') OD 17 hits (23/11 ~22:45Z Q + ~22:55Z BUILD NOW = this job) | ledger 0 | main: jdh.js DH_CAT 35 + jdh2 hiệu/confiscation + jkcg KCT + jgecat/jge Thiên mệnh + j8 TITLES; 0 reputation/chapter titles in code | review/* 0 for titles2 | claims TITLES2 row (E, step 1 E54 DONE e01bf0cb). Reused: jdh DH_CAT / p.dh / dhObj / dhInc / dhSync / the Danh hiệu panel + bonus hooks, KIT §82 plate + §82.1 two tones (shT / shA), kit panel / rows / modal; NO second title system.

Branch: review/titles2 from LIVE 16f5c1dc. Files: dev/build/jdh3.js (new, after jge in assemble), jdh.js (groups, wearOK, dhObj tone/fx, the two rep hooks in dhB / addGains / affAdd), jdh2.js (NPC auto-wear skips rep), jbal2.js (BAL.dh.rp + BAL.dh.cp), j71.js (cpm7 mark for conbenh / hoagiai, the two families with no bonusDo7), dev/test/titles2-unit.js, titles2-scan.js, titles2-ui.js, dev/kit/KIT_REQUESTS.md (K-DH-CAPFIT).

## What was built
### (1) «Danh tiếng» — reputation titles (Part A): 13 good + 15 bad
- ONE rule function per title, `rpSync(p)` for her AND every NPC consort (law 1). Earn = state + deeds; each title has its OWN loss rule (hysteresis: earn line above, lose line below; time-outs for deed titles). Held → `p.dh["rp_<id>"]`, lost → removed (history `p.rep.h`).
- Deeds come from the existing two-way hooks only (no new mechanic): `caught` (scheme seen → lo; heavy → loN; bùa ngải → vu), `punish` (phat), `fall` / `deathSentence` (toi; and the framed victim of that framer is cleared), `framed` (oan; only when the charge sticks, jtruth), `econPayWin` rumor / accuse (don / to), `kidDie` (con), plus state changes rpSync sees (lãnh cung in/out, release from cấm túc, new child, new scheme, nights window).
- Never worn (gán by opinion): while HELD each gives ONE gain + ONE loss (laws 2/3) through the jdh hook points: share of Sủng / Danh / Bạc / Thái hậu+Hoàng hậu / maid / consorts' liking (dhRepG inside jdh addGains + affAdd), heavier Danh loss, additive phúc / thi / sức / nghề / tin đồn (dhRepB inside jdh dhB), and the ONE caught chance `caughtOdds` (muu = eyes on the target, kin = the doer's cover). All numbers BAL.dh.rp (law 4); player words have no numbers (fractions in words).
- Shown: Nhiệm vụ › Danh hiệu, new group «Danh tiếng» (listed once held, like tm / kc), §82.1 tone plates (good = shT gold-white, bad = shA gold-crimson; tier 4, no stars, so never confused with the tier-8 Thiên mệnh plates); tap → kit info card with «Người đời gọi từ / Vì sao / Được / Mất / Mất khi» (not «Khi đeo»); her new title → kit panel «Tiếng thơm / Tiếng xấu»; loss → log line. NPC: consort card (j15 rvCard → relLines) gets the plain kit line «Người đời gọi: «…» · «…»» (no plate in cards, KIT §82).
- Co-op: her seat earns hers (S); NPC rules only on the host seat (npcOK, same as jdh); a friend entry (`p.coop`) gets no effect and shows her titles through the LOOK `dh` copy.

| id | title | tone | earned when | lost when | BAL row (thresholds, gain g, loss l) |
|---|---|---|---|---|---|
| hien | Hiền lương thục đức | good | Đức hạnh và Danh tiếng đều rất cao, chưa từng bị lộ mưu | bị lộ mưu, bị kết tội, hoặc Đức hay Danh sa sút | `{duc:80,danh:70,offDuc:70,offDanh:60,clean:12,g:["tren",10],l:["danhLoss",2]}` |
| quocsac | Quốc sắc thiên hương | good | nhan sắc cao nhất hậu cung | có người đẹp hơn, hoặc nhan sắc phai | `{sac:85,off:80,g:["sung",10],l:["muu",-4]}` |
| vinhnhu | Vịnh nhứ chi tài | good | tài học rất cao, từng đứng đầu hội thơ hay hội câu đối | tài học sa sút | `{tai:80,off:70,g:["thi",2],l:["suc",-1]}` |
| trithu | Tri thư đạt lễ | good | tài học khá, Đức hạnh tốt, lâu nay không phạm lỗi bị phạt | bị phạt, hoặc Đức sa sút | `{tai:70,duc:65,offDuc:55,clean:12,g:["nghe",15],l:["sung",-10]}` |
| khoan | Khoan hậu | good | cung nữ hết lòng trung thành, Đức hạnh tốt | cung nữ sinh lòng khác, hoặc Đức sa sút | `{loy:85,duc:60,offLoy:70,offDuc:50,g:["trung",8],l:["muu",-4]}` |
| cankiem | Cần kiệm | good | bạc để dành nhiều mà sống có chừng mực | bạc tiêu gần hết, hoặc Đức sa sút | `{bac:250,duc:55,offBac:150,g:["bac",10],l:["hau",-10]}` |
| phuctinh | Phúc tinh | good | con cái đông đủ, lâu nay chưa mất đứa nào | con mất, hoặc con không còn đông đủ | `{kids:2,clean:24,g:["phuc",2],l:["don",-4]}` |
| maubang | Mẫu bằng tử quý | good | con trai được lập làm Thái tử | con không còn ở ngôi Thái tử | `{g:["tren",10],l:["muu",-8]}` |
| nhannhuc | Nhẫn nhục phụ trọng | good | ra khỏi cấm túc hay lãnh cung mà không làm càn | bị phạt lần nữa, hoặc lâu ngày người ta quên | `{win:6,keep:12,g:["phuc",2],l:["sung",-10]}` |
| niebann | Phượng hoàng niết bàn | good | từng vào lãnh cung, nay lại lên hàng phẩm cao | lại sa sút phẩm vị, hoặc lại vào lãnh cung | `{rank:5,offRank:4,g:["danh",10],l:["muu",-8]}` |
| trungcan | Trung can nghĩa đảm | good | nhiều lần tố giác kẻ có tội bằng chứng cứ thật | chính mình bị lộ mưu, hoặc lâu không tố giác ai | `{n:2,win:24,duc:50,g:["tren",10],l:["muu",-4]}` |
| phonghoa | Phong hoa tuyệt đại | good | cả nhan sắc lẫn tài học đều gần tột bậc | nhan sắc hay tài học sa sút | `{sac:85,tai:85,off:75,g:["sung",10],l:["hau",-8]}` |
| khiem | Khiêm cung | good | phẩm cao, được sủng, Đức tốt mà không bày mưu hại ai | bày mưu, Đức sa sút, hoặc tụt phẩm | `{rank:5,sung:70,duc:70,offDuc:60,clean:12,g:["tren",10],l:["muu",-4]}` |
| hoathuy | Hồng nhan họa thủy | bad | được sủng nhất hậu cung trong khi Thái hậu không ưa | Sủng giảm, hoặc Thái hậu nguôi lòng | `{sung:90,th:0,offSung:80,offTh:10,g:["sung",6],l:["tren",-4]}` |
| khuynh | Khuynh quốc khuynh thành | bad | nhan sắc tột bậc, đẹp nhất hậu cung | nhan sắc phai, hoặc có người đẹp hơn | `{sac:95,off:88,g:["sung",8],l:["muu",-8]}` |
| docphu | Độc phụ | bad | mưu hạ độc, hại thai bị lộ, hoặc bị kết tội | lâu ngày không thêm tội và Đức hồi lại | `{win:24,offDuc:40,g:["muu",8],l:["sung",-5]}` |
| vuco | Vu cổ | bad | mưu vu oan bằng bùa ngải bị lộ | lâu ngày không ai nhắc lại | `{win:24,g:["muu",4],l:["tren",-5]}` |
| kieu | Kiêu phi | bad | phẩm cao, được sủng mà Đức kém | Đức hồi lại, tụt phẩm, hoặc mất sủng | `{rank:5,sung:70,duc:35,offDuc:45,offSung:60,g:["muu",4],l:["hau",-6]}` |
| chuyensung | Chuyên sủng | bad | được thị tẩm liền nhiều đêm trong mấy tháng gần đây | ít được thị tẩm | `{nights:5,off:2,g:["sung",10],l:["muu",-8]}` |
| homi | Hồ mị hoặc chủ | bad | phẩm thấp mà được sủng rất cao | mất sủng, hoặc lên phẩm cao | `{sung:75,rank:2,offSung:65,offRank:4,g:["sung",10],l:["tren",-6]}` |
| thatduc | Thất đức | bad | Đức sa sút tột cùng, lại vừa bị phạt hay bị kết tội | Đức hồi lại | `{duc:15,win:12,offDuc:30,g:["kin",4],l:["danh",-5]}` |
| tham | Tham tài | bad | bạc chất đầy mà Đức kém | bạc vơi đi, hoặc Đức hồi lại | `{bac:300,duc:40,offBac:200,offDuc:50,g:["bac",8],l:["danhLoss",2]}` |
| truongthiet | Trường thiệt phụ | bad | nhiều lần tung tin đồn thành công trong năm | im lặng một thời gian | `{n:3,win:12,quiet:6,g:["muu",4],l:["danh",-6]}` |
| dophu | Đố phụ | bad | lòng ghen rất nặng, lại vừa bày mưu hại người | lòng ghen nguôi | `{ghen:70,win:6,off:50,g:["sung",10],l:["hau",-6]}` |
| tuhoa | Tú hoa chẩm đầu | bad | nhan sắc cao mà tài học, Đức hạnh, tâm cơ đều kém | học thêm, sửa Đức, có thêm tâm cơ, hoặc nhan sắc phai | `{sac:80,tai:30,duc:40,tamco:30,offSac:70,offTai:40,offDuc:50,offTam:40,g:["muu",8],l:["danh",-6]}` |
| thambat | Thâm bất khả trắc | bad | tâm cơ cực cao, bày nhiều mưu mà chưa từng bị lộ | bị lộ mưu, hoặc tâm cơ sa sút | `{tamco:85,n:3,win:24,off:75,g:["muu",8],l:["sung",-8]}` |
| hamoan | Hàm oan | bad | bị vu oan mà vẫn phải chịu tội | kẻ vu oan bị kết tội, hoặc lâu ngày người ta quên | `{win:12,keep:18,g:["tren",8],l:["danh",-6]}` |
| bacmenh | Hồng nhan bạc mệnh | bad | nhan sắc đẹp mà vừa mất con | sinh được con, hoặc lâu ngày nguôi ngoai | `` |

Parked (expert list, not built in this first set; each needs a deed the game does not record today, or law 6a visibility): good G02 (if built, rename «Mẫu nghi chi đức»: «Mẫu nghi thiên hạ» is also the jend14 ke14 arc name), G03, G04, G05, G07, G08, G09, G12, G14, G15, G17, G20, G21, G23, G26, G27, G28, G29, G30, G32, G33; bad B03, B05 (visible only to those who know: law 6a), B06, B10, B11, B15, B16, B19, B20, B21, B22, B25 (law 6a), B27, B28, B29, B30, B31, B32, B33. [R*] check: no built title quotes history in player text (why / lost words are plain); B08 «Kiêu phi» is used as a plain idiom only.

### (2) Chapter / side-line titles (Part B)
- Main roads (48 roads incl. bd_hoa / bd_ngua / bd_tuc / bd_hoang): ONE good + ONE bad title per road, named in the road's own words (3–4 words); every closed chapter (.4 premise to .11) gives a step of the good OR the bad title (jdh steps: same name, higher tier; BAL.dh.cp.road.n). Choice made: one title per chapter would be 308 chapters × 2 names, and the owner's title rule (13:15Z / 13:25Z) is «own short name, steps = same name, higher tier»; the step per chapter keeps that rule. The how text names the road. FLAG for the reviewer / foreman: if the owner wants a separately named title per chapter, the names are the only missing part (the hook is per chapter).
- HOW she closed it: `end67` wrap — her option lean during the chapter (jge lean tags, Δlt) + her Đức change since the chapter's first choice (BAL.dh.cp.lean); 0 → the ending's sign. NPC off-screen roads (`nrEnd`): ending sign, 0 → Đức ≥ BAL npcDuc.
- Side arcs: every non-road ARC67 arc (s_* 8, st_* 3, tm96a/b/c, noi14 / hau14 / ke14): one good + one bad, once.
- j72 việc nhờ: per KIND72 (9 kinds) good (ok) / bad (late, dropped or bại lộ); counted steps.
- j70 mưu hại (every M70 method closes through the same points): «Thoát lưới độc» (target: foiled / trap / frame broken at once, jtruth frameExpose), «Vạch rõ gian tay» (exposer: abandon70 exposed or an accuse win, NPCs too), «Minh oan sau án» (framed, framer convicted later), «Báo tin cứu người» (her warning), bad «Bàn tay lộ dấu» (schemer caught / trapped / exposed), «Người nấp sau rèm» (schemer landed unseen).
- j71 lập công: all 14 MF7 families (bonusDo7 why → family; conbenh / hoagiai marked at their own «ok» with cpm7, the smallest flag) + NPC merits (MF7[k].npc wrap); bad «Bạc lấp miệng gian» = thamo «Nhận bạc bịt miệng» (j71 brb).
- All worn like every jdh title (one bonus picked from BAL.dh.cp ch lists); tone plates t / a.

### (3) Names
197 new keys; ≤ 4 words; unique in DH_CAT; clash scan vs jdh / jkcg / jge / j8 TITLES (exact or contained) + arc / chapter names (exact) = 0 (`dev/test/titles2-scan.js`); Part C renames kept (Lộng quyền / Bội bạn cầu lợi not built; «Thuyền lậu nuôi riêng», «Bội nghĩa tri kỷ», «Người nấp sau rèm», «Rửa oan gia môn» used); «Hóa thù làm bạn» replaces a near-copy of the s_ban arc name.

### (4) UI
KIT §82 / §82.1 parts only. The bad/ambiguous look = §82.1 shA tone (already in the kit), so no KIT REQUEST for the tone. ONE kit issue found and filed: **K-DH-CAPFIT** (dev/kit/KIT_REQUESTS.md): the plate that `kitDhCap` puts on the event picture clips 4-word names on Fold and iPad (the notice dialog); not restyled by me.

### (5) Saves / co-op
Old saves: `p.rep` is created on first sync; no title lost; unit case C (save with no rep / dh loads, syncs, panel opens) + quickcheck old-save gate. Co-op: see (1).

## Gates (ALONE on the final head 537091a1 = review/titles2, LIVE bba42773 merged)
| gate | result |
|---|---|
| node dev/test/titles2-unit.js | PASS 49/49 (earn, lose / clear, NPC same rule + card line, effects, never worn, road chapter good + bad + steps + NPC nrEnd, side arc, việc nhờ ok / fail, mưu hại roles, lập công + hush money, old save, co-op personal, UI groups + info card); every case FAILS on LIVE (no jdh3) |
| bash dev/tools/quickcheck.sh | PASS · old save ok · core gates PASS (one-core guard: effect size words moved to BAL.dh.rp.deg) · perf new/live render 200/189 ms, tab 319/339, buổi 1854/955 (noisy run; the run before on 90912b88: 896/927), tasks>200ms 23/21 |
| node dev/test/role-parity.test.js ×2 | ALL PASS, ALL PASS |
| coop-e2e (Fold host) / COOP_SWAP=1 | 141/141, 141/141 |
| node dev/test/titles2-scan.js (law 11 + clash) | 106 line kinds, missing 0, clashes 0 |
| node dev/test/titles2-ui.js (Fold 755x1000 + iPad 1180x820 @2, shots looked at) | PASS; WARN K-DH-CAPFIT (kit request, see (4)) |
Shots (outside git): /home/user/wt/e55-shots/t2-*.png (panel top / Danh tiếng group / info card / notice, both devices).

## Law 11 scan table (dev/test/titles2-scan.js output)

| kind | key | line | title(s) good / bad |
|---|---|---|---|
| road | tt_co | .4 + 7 chapters (.5–.11) | Con cờ giữ nước / Con cờ đổi phe |
| road | tt_oan | .4 + 7 chapters (.5–.11) | Rửa tiếng gia môn / Đổ oan cho người |
| road | tt_tranh | .4 + 7 chapters (.5–.11) | Nối lại một nhà / Chia phủ tranh quyền |
| road | tt_mat | .4 + 7 chapters (.5–.11) | Giữ trọn mật ước / Bội ước Trung cung |
| road | dtq_bien | .4 + 7 chapters (.5–.11) | Hậu phương giữ vững / Bán tin biên ải |
| road | dtq_vu | .4 + 7 chapters (.5–.11) | Giải oan thư phản / Mượn thư hại người |
| road | dtq_binh | .4 + 7 chapters (.5–.11) | Trao trả binh phù / Mưu đoạt binh phù |
| road | dtq_huynh | .4 + 7 chapters (.5–.11) | Đón huynh về nước / Bỏ huynh đất giặc |
| road | muoi_tuoc | .4 + 7 chapters (.5–.11) | Tước sạch không mua / Bạc đổi tước quan |
| road | muoi_lau | .4 + 7 chapters (.5–.11) | Bến sạch thuyền ngay / Thuyền lậu nuôi riêng |
| road | muoi_doi | .4 + 7 chapters (.5–.11) | Thóc chẩn tới dân / Đục khoét thóc chẩn |
| road | muoi_no | .4 + 7 chapters (.5–.11) | Trả sạch nợ cung / Quỵt nợ trong cung |
| road | cn_chu | .4 + 7 chapters (.5–.11) | Nghĩa cũ chủ tớ / Quay lưng chủ cũ |
| road | cn_tinh | .4 + 7 chapters (.5–.11) | Chén trà dứt tình / Tình riêng vụng trộm |
| road | cn_ban | .4 + 7 chapters (.5–.11) | Giữ lời tri kỷ / Bội nghĩa tri kỷ |
| road | cn_than | .4 + 7 chapters (.5–.11) | Nhận lại cội nguồn / Chối bỏ cội nguồn |
| road | nc_gian | .4 + 7 chapters (.5–.11) | Trung với Đại Hy / Mật thám cố quốc |
| road | nc_su | .4 + 7 chapters (.5–.11) | Cầu nối hai nước / Đưa tin cố quốc |
| road | nc_tuc | .4 + 7 chapters (.5–.11) | Hòa hai dòng máu / Chối bỏ cố hương |
| road | nc_vuong | .4 + 7 chapters (.5–.11) | Giữ yên hai cõi / Mưu ngai cố quốc |
| road | bd_hoa | .4 + 7 chapters (.5–.11) | Giữ vẹn hòa ước / Xé bỏ hòa ước |
| road | bd_ngua | .4 + 7 chapters (.5–.11) | Ngựa tốt về triều / Buôn ngựa cho giặc |
| road | bd_tuc | .4 + 7 chapters (.5–.11) | Giữ nếp thảo nguyên / Bỏ nếp quê nhà |
| road | bd_hoang | .4 + 7 chapters (.5–.11) | Khả hãn chính vị / Đoạt ngai Khả hãn |
| road | bd_san | .4 + 7 chapters (.5–.11) | Vi trường thượng võ / Mưu hiểm vi trường |
| road | bd_soi | .4 + 7 chapters (.5–.11) | Giữ ngai chính thống / Dựng ngai bù nhìn |
| road | bd_tuyet | .4 + 7 chapters (.5–.11) | Che chở người nạn / Đuổi người lánh nạn |
| road | bd_hen | .4 + 7 chapters (.5–.11) | Giữ lời thề lửa / Phụ lời thề lửa |
| road | pt_hai | .4 + 7 chapters (.5–.11) | Đón thuyền đồng hương / Bỏ thuyền ngoài khơi |
| road | pt_su | .4 + 7 chapters (.5–.11) | Quốc thư vẹn lễ / Quốc thư hai lòng |
| road | pt_tang | .4 + 7 chapters (.5–.11) | Tiễn thầy qua bể / Giữ thầy làm tin |
| road | pt_dang | .4 + 7 chapters (.5–.11) | Hồi môn trọn vẹn / Cướp thuyền hồi môn |
| road | td_an | .4 + 7 chapters (.5–.11) | Rửa oan gia môn / Lật án trả thù |
| road | td_ke | .4 + 7 chapters (.5–.11) | Vén màn tìm kẻ / Diệt khẩu sau màn |
| road | td_song | .4 + 7 chapters (.5–.11) | Đoàn tụ cốt nhục / Bỏ mặc máu mủ |
| road | td_tha | .4 + 7 chapters (.5–.11) | Cởi oán buông thù / Trả thù đến cùng |
| road | ch_co | .4 + 7 chapters (.5–.11) | Cô cháu đồng lòng / Lợi dụng cô mẫu |
| road | ch_benh | .4 + 7 chapters (.5–.11) | Thuốc thang tận hiếu / Bên giường mưu lợi |
| road | ch_ho | .4 + 7 chapters (.5–.11) | Hai cháu hòa thuận / Hãm hại em họ |
| road | ch_bi | .4 + 7 chapters (.5–.11) | Chôn kín chuyện xưa / Bán bí mật xưa |
| road | thd_tho | .4 + 7 chapters (.5–.11) | Tài nữ thật tài / Mượn bút thành danh |
| road | thd_sach | .4 + 7 chapters (.5–.11) | Giữ bản thảo cha / Bản thảo đổi vinh |
| road | thd_tro | .4 + 7 chapters (.5–.11) | Trường thi công bằng / Bán đề khoa cử |
| road | thd_hoc | .4 + 7 chapters (.5–.11) | Tôn sư trọng đạo / Phụ nghĩa thầy trò |
| road | cnv_chu | .4 + 7 chapters (.5–.11) | Giữ kín miệng bình / Nắm thóp chủ nhân |
| road | cnv_ban | .4 + 7 chapters (.5–.11) | Tình nghĩa đồng hương / Đạp bạn đồng hương |
| road | cnv_mat | .4 + 7 chapters (.5–.11) | Dứt ánh mắt xưa / Ánh mắt lén lút |
| road | cnv_ma | .4 + 7 chapters (.5–.11) | Trò ngoan ma ma / Qua mặt ma ma |
| arc | s_than | o:* «Người thân thất lạc» | Nhận đúng người thân / Nhận bừa thân thích |
| arc | s_thu | o:* «Bức mật thư» | Trả thư đúng chủ / Mật thư làm bẫy |
| arc | s_hoa | o:* «Đêm cháy Tây cung» | Cứu người trong lửa / Đổ lửa cho người |
| arc | s_su | o:* «Sứ thần phương Tây» | Tiếp sứ vẹn lễ / Mưu lợi với sứ |
| arc | s_dich | o:* «Mùa dịch đậu mùa» | Ở lại mùa dịch / Bỏ cung tránh dịch |
| arc | s_tinh | o:* «Cám dỗ» | Giữ lòng trong sạch / Tình riêng ngoài cung |
| arc | s_thay | o:* «Lão thái giám» | Trọng lời lão nhân / Phụ lòng lão nhân |
| arc | s_ban | o:* «Kẻ thù hóa tri kỷ» | Hóa thù làm bạn / Thù càng thêm sâu |
| arc | st_the | o:st «Gây dựng thế lực» | Thế lực chính danh / Kết bè lũng đoạn |
| arc | st_con | o:st «Con đường của con» | Mẹ hiền dạy con / Ép con theo ý |
| arc | st_dong | o:st «Ngôi Đông cung» | Đông cung chính vị / Mưu ngôi Thái tử |
| arc | noi14 | o:eg «Người nối dõi» | Hương hỏa nối dòng / Mượn con nối dõi |
| arc | hau14 | o:eg «Tranh ngôi Trung cung» | Phượng tọa chính danh / Đạp người lên ngôi |
| arc | ke14 | o:eg «Mẫu nghi thiên hạ» | Dạy con nên vua / Buông rèm sau ngai |
| arc | tm96a | o:tm «Thanh mai trúc mã: Ngày từ biệt» | Từ biệt người xưa / Lưu luyến người xưa |
| arc | tm96b | o:tm «Thanh mai trúc mã: Lửa thử vàng» | Vàng không sợ lửa / Lửa thiêu tình cũ |
| arc | tm96c | o:tm «Thanh mai trúc mã: Lựa chọn cuối» | Dứt tình chọn cung / Bỏ cung theo tình |
| việc nhờ | craft | Tìm vật, làm đồ | Tìm vật trả người / Tráo vật lừa người |
| việc nhờ | social | Giao thiệp | Giao thiệp chu toàn / Đưa chuyện hai lòng |
| việc nhờ | inv | Tra xét | Soi rõ trắng đen / Kết án qua loa |
| việc nhờ | pro | Che chở | Che chở kẻ yếu / Bỏ mặc người cầu |
| việc nhờ | love | Giúp duyên | Se duyên lành / Ép duyên lấy lợi |
| việc nhờ | trade | Đổi ơn | Có vay có trả / Ơn đổi lấy lợi |
| việc nhờ | risk | Việc liều | Liều mình vì nghĩa / Liều lĩnh lộ chuyện |
| việc nhờ | court | Việc triều | Góp sức việc triều / Lộ tay việc triều |
| việc nhờ | fam | Việc nhà | Chu toàn việc nhà / Bỏ bê việc nhà |
| mưu hại | poison | Hạ độc vào điểm tâm | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | poison2 | Hạ độc dần qua đồ dùng | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | musk | Hại thai | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | catswap | Tráo hài nhi lúc sinh | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | kpoison | Hạ độc con nàng | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | pond | Đẩy con nàng xuống hồ | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | pushp | Đẩy nàng xuống hồ sen | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | kframe | Vu con nàng trù ẻo | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | frame | Vu oan bùa ngải | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | plant | Cài đồ cấm vào rương | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | bribe | Mua người trong cung nàng | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | block | Rút thẻ bài | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | rumor | Tung tin đồn bẩn | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | accuse | Gom chứng cứ rồi tố | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | ksab | Phá việc học của con nàng | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | joint | Phe cánh liên thủ vu cáo | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| mưu hại | huydung | Hủy dung | exec70 / abandon70 / accuse / conviction / frameExpose → Thoát lưới độc, Vạch rõ gian tay, Minh oan sau án, Báo tin cứu người, Bàn tay lộ dấu, Người nấp sau rèm |
| lập công | cuute | Lập công · Cứu tế | Công cứu tế |
| lập công | cuuhoang | Lập công · Cứu giá | Công cứu giá |
| lập công | thbenh | Lập công · Hầu bệnh Thái hậu | Công hầu bệnh |
| lập công | conbenh | Lập công · Trông con bệnh | Công trông trẻ bệnh |
| lập công | tomuu | Lập công · Vạch mưu | Công vạch mưu |
| lập công | suthan | Lập công · Tiếp sứ thần | Công tiếp sứ |
| lập công | thamo | Lập công · Bắt kẻ tham ô | Công trừ tham ô |
| lập công | tiencu | Lập công · Tiến cử hiền tài | Công tiến hiền |
| lập công | chepkinh | Lập công · Chép kinh | Công chép kinh |
| lập công | soke | Lập công · Soát sổ sách | Công soát sổ |
| lập công | hoagiai | Lập công · Hòa giải | Công hòa giải |
| lập công | tamtang | Lập công · Lễ Thân tằm | Công lễ Thân tằm |
| lập công | hoahoan | Lập công · Hỏa hoạn, thiên tai trong cung | Công cứu nạn cung |
| lập công | dichbenh | Lập công · Dịch trong cung | Công chặn dịch |
| lập công | brb | Nhận bạc bịt miệng (thamo) | Bạc lấp miệng gian |

Missing: none

## Clash scan
| new title | vs | name |
|---|---|---|
| (none) | | |
## HANDOVER (if a successor picks this up)
Branch review/titles2 head 537091a1, all gates green. Open: KIT REQUEST K-DH-CAPFIT (kit keeper). Parked reputation titles listed above (need new deed records). Owner-facing choice to flag: road titles step per chapter (one good + one bad name per road) instead of 308 separately named chapter titles.
