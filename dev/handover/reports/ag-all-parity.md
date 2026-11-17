# AG-ALL-2 button / option PARITY TABLE (part 2b, read-only audit of review/ag-all-2 45d1433e + uncommitted 2b work, 17/11 ~15:45Z) — every player button ↔ NPC option; see ag-all.md §18.6 for what is left

# AG parity table — player buttons vs NPC options (review/ag-all-2, /home/user/wt/ag2b @ 45d1433e + uncommitted working tree, index.html 15:31)
Rule: OD 17/11 ~14:50Z + ~15:25Z ("every act/button/option the player has, NPCs of that group have — and every NPC option is a player button").
Method: player labels from a live probe of the built page (talkOpts per person kind, topicOpts, deck/pool/artActs/coldActs/illCards over 40 buổi, rvCard / staffHTML / facHTML / artTabHTML / srvCards / srvTalk / srvStaffHTML button text) + grep of the builders for gated ones; NPC keys from the live registries (AGREG, AGRUN, AGSELF, AGSOC, BANDS, SRVA) + the providers' code.
Column "same fn?": **SAME** = both call the one function (twDo / runAct→ACT.f / hhAct / giveTo / buy / bribeServ / plantServ / courtGive / taintItem / SRVA row via asRun-srvCards / cnv*Opts); **NUM** = same BAL numbers + odds formula, two code paths (player runOpt/talk vs NPC AGRUN/twDo/npcEffort); **DIFF** = different code and/or different numbers; **—** = no NPC side.
"(no key)" = an NPC path exists but is not an agReg/AGRUN option (own module choice).

## 1. CONSORT (player = phi tần; NPC = rival consorts; provider agOpts + agReg consort: cx, study, ask, shop, ally, more, harm, cx2, court3)

### 1a. Hành sự deck (j2 pool/artActs/deal + module deal wrappers)
| player button | code | NPC option key | same fn? | notes |
|---|---|---|---|---|
| Kinh hồng vũ | j2 artActs → runOpt | effort (kd vu) | NUM | BAL.deck + deckOdds; NPC j75 npcEffort |
| Đàn khúc Phượng cầu hoàng | j2 artActs | effort (kd cam) | NUM | |
| Đánh cờ với Hoàng thượng | j2 artActs | effort (kd ky) | NUM | |
| Đánh đàn ở ngự hoa viên | j2 pool | effort (kd qf, QF "đứng đợi ngự giá… dâng một khúc đàn") | DIFF | pool card own odds; NPC BAL.deck.qf |
| Vẽ chân dung tặng Thái hậu | j2 artActs | cx:portrait | NUM | BAL.ag.cx.portrait |
| Múa trong yến tiệc | j2 pool | NONE | — | |
| Cài tai mắt | j2 pool | NONE | — | |
| Nghỉ ngơi dưỡng sức | j2 pool | cx:rest | NUM | BAL.ag.cx.rest |
| Nghỉ ngơi một lát | jrest | NONE | — | |
| Cầu tự ở Phụng Tiên điện | j2 pool (BAL.tw.pray) | pray (AGSELF→twDo) | NUM | |
| Phát chẩn cho cung nhân | j2 pool | cx:alms | NUM | |
| Phát bạc cứu giúp cung nhân nghèo | jact adCharityCard / j85 charity → charityFx | NONE | — | old j85 roll(5) muted under day plan |
| Dưỡng nhan | j2 pool | cx:face | NUM | |
| Luyện cầm kỳ thi họa | j2 pool | cx:arts | NUM | |
| Đọc binh thư, sử sách | j2 pool | cx:book | NUM | |
| Tụng kinh, làm việc thiện | j2 pool | cx:sutra | NUM | |
| Thưởng cung nữ | j2 pool | cx:maidR | NUM | |
| Giả mang thai | j2 pool (BAL.tw) | fakePreg | NUM | |
| Giả bệnh | j13 illCards | fakeIll | NUM | |
| Báo tin có thai | j2 deal | announce | NUM | |
| An thai / Tự bào chế thuốc an thai | j2 deal | NONE | — | j8 auto useItem drip only |
| Tranh sủng | j2 deal / ACT.steal | (no key) jsteal stealPass | SAME | ACT.steal; excluded from harm (HA_NO) |
| Chặn ngự giá | j2 deal / ACT.road | (no key) jsteal stealPass | SAME | ACT.road |
| Thỉnh an Thái hậu (deck) | j2 directActs → talkOpts th | thTH | NUM | BAL.tw.g.thTH |
| Thỉnh an Hoàng hậu (deck) | j2 directActs → talkOpts hh | thHH | NUM | |
| Hối lộ Kính sự phòng (deck) | j2 directActs → ksp | ksp | NUM | |
| Hầu thuốc Hoàng thượng | j20 deal | cx2:nurse | NUM | cx2O |
| Dạy dỗ hoàng tử/công chúa · Dạy … học chữ | j2 / j53 | NONE | — | NPC: j53 ktNpcTutor (not an option) |
| Đưa con đến thỉnh an Hoàng thượng | j2 deal | cx2:kidGreet | NUM | |
| Chữa bệnh cho con | j2 deal | cx2:kidHeal | NUM | |
| Điểm trang | jtoil | (no key) jagtoil tl2 (moc/nha/cauky/dam) | DIFF | NPC seeded toilNpcPlay vs player mini-game; same toilFx judgement |
| Emotion cards ×6 (BAL.ea.card: Đập đồ, Mắng cung nữ, Khóc thầm, Viết thư nhà, Đàn hát…, …) | jemoact | (no key) jemoact eaNpcWeek | NUM | same card table, chance by feeling (ag2Ch) |
| Tự học {nghề}: tác phẩm (works) | j83 | NONE | — | harm:cook uses wkMake only for a poison dish |
| Khảo hạch tấn phong | jexam | (no key) jexam kg82NpcMean | NUM | |
| Mời thái y bắt mạch / Sang Thái y viện xin bắt mạch | jthaiy | NONE | — | |
| Xem sổ nguyệt sự / Xem lén sổ nguyệt sự | jcycle | NONE | — | |
| Uống thuốc thúc sinh / Tâu xin nghiệm thân | jkh | NONE | — | |
| Thú tội với Hoàng thượng / Hối lộ KSP sửa sổ / Uống thuốc phá thai | j22 | NONE | — | affair road |
| Cầu tin tức người nhà | jts | NONE | — | |
| Lãnh cung: Chép kinh giữ đức · Cầu xin · Nhờ người bên ngoài · Thêu khăn bán · Trồng rau · Xuất gia · Nhờ … đưa thư kêu oan | j14/j24/j55 coldActs | NONE | — | NPC: j14 flat roll |

### 1b. Places / people talk (talkOpts kinds)
| player button | code | NPC option key | same fn? | notes |
|---|---|---|---|---|
| Tâng bốc | j2 talkOpts emp | cx2:flat | NUM | BAL.ag.cx2 via cx2O |
| Nói thật lòng | j2 emp | cx2:true | NUM | |
| Phô tài: {art} | j2 emp | cx2:show | NUM | |
| Xin ân điển | j2 emp | cx2:favor | NUM | |
| Bàn chuyện triều chính | j2 emp | cx2:court | NUM | |
| Dâng một cành hoa / Dâng {hoa} | j2 emp | effort (kd qf) | NUM | BAL.deck.qf |
| Thỉnh an, chép kinh | j2 th + jtwoway | thTH | NUM | |
| Xin Thái hậu đỡ lời | j2 th | cx:thHelp | NUM | |
| Kể tội {X} (Thái hậu) | j2 th | NONE | — | |
| Thỉnh an (Hoàng hậu) | j2 hh + jtwoway | thHH | NUM | |
| Xin Hoàng hậu che chở | j2 hh | cx:hhShield | NUM | |
| Khiêu khích (Hoàng hậu) | j2 hh (own fx) | provoke | DIFF | |
| Xin bắt mạch / Xin chữa bệnh | j2/jthaiy ty | NONE | — | |
| Bài thuốc dễ thụ thai | j2 ty | cx2:fert | NUM | |
| Mời làm thái y tâm phúc | j2 ty | cx2:doctor | NUM | |
| Xin thuốc cho {con} | j2 ty | cx2:kidMed | NUM | |
| Học hỏi y lý | j2 ty | NONE | — | |
| Đút lót lật thẻ | j2 ksp + jtwoway | ksp | NUM | |
| Hỏi sở thích Hoàng thượng | j2 ksp | cx2:likes | NUM | |
| Xem sổ thị tẩm | j2 ksp | NONE | — | |
| Hầu chuyện, xem lén sổ nguyệt sự / Xem sổ nguyệt sự | jcycle ksp | NONE | — | |
| Xem hàng Nội vụ phủ / Mua {món} · Nhờ thái giám mua đồ | jact/j2 peddler, j8 invAct shop | cx:buy | SAME | buy() |
| Hỏi chuyện cũ (phế phi) | j2 fallen | cx2:old | NUM | |
| Đưa cơm áo (phế phi) | j2 fallen | NONE | — | |
| Trò chuyện với cung nữ (was Tâm sự) | jact.js:69 replaces j2 | cx2:maidTalk | DIFF | NPC uses BAL.ag.cx2.maidTalk.w; player now w:{maid:3}+roll 15 intel; AGC2BTN still says "Tâm sự" |
| Sai đi dò la (confidant) | j2 → jwhy wrap | cx2:maidSpy | DIFF | jwhy replaces player run |
| Nghe ngóng chung | jact/jhouse | NONE | — | |
| Giao việc phòng bị | jhouse | NONE | — | |
| Chào hỏi (k61 greet) | j61/jgreet | (no key) jgreet gm "greet" | DIFF | NPC→player approach only |

### 1c. Rival person card (topicOpts j9 + jtwoway, talkOpts rival j2, chest)
| player button | code | NPC option key | same fn? | notes |
|---|---|---|---|---|
| Hỏi han sức khỏe | j9 / jaudit | (no key) jgreet "health" | DIFF | NPC→player only; no NPC↔NPC |
| Khen tài nghệ nàng | j9 | (no key) jgreet "praise" | DIFF | NPC→player only (SOC.feign old path) |
| Bàn tán về {X} | j9 | (no key) jgreet "gossip" | DIFF | NPC→player only |
| Chia sẻ bí mật | j9 | (no key) jgreet "secret" | DIFF | NPC→player only |
| Cảnh báo nàng | j9 (BAL.talk.warn) | warn (TW) + jgreet "warn" | DIFF | two sources |
| Nhờ giúp đỡ | j9 / jaudit | cx2:help | DIFF | player j9 run, NPC jagacts2; same BAL.ag.cx2.help gate |
| Tạ lỗi | j9 → twDo apol | apol | SAME | |
| Nhún nhường | j9 | cx:humble | NUM | |
| Giúp đỡ nàng | twDo help | help | SAME | |
| Thăm lúc ốm mệt | twDo visit | visit | SAME | |
| Hòa giải | twDo mediate | mediate | SAME | |
| Hạ nhục | twDo humil | humil | SAME | |
| Thử lòng | twDo test | test | SAME | |
| Lạnh nhạt | twDo drop | drop | SAME | |
| Nương theo | twDo follow | follow | SAME | |
| Rỉ tai chuyện trong cung | twDo gossip | gossip | SAME | |
| Khoe quà ngự ban | twDo flaunt | flaunt | SAME | |
| Khuyên Hoàng thượng mưa móc đều khắp (rank 7) | twDo admon | admon (agReg hh "acts") | SAME | th:admon is the Thái hậu's (own code) |
| Giải bày hiểu lầm | j95b | NONE | — | |
| Nhắc lại ân xưa | jmem | NONE | — | |
| Tặng quà | ACT.gift → giftpick → giveTo | cx:gift | SAME | giveTo |
| Kết giao | ACT.ally | cx:ally | SAME | ACT.ally.f |
| Khiêu khích | j2 rival (BAL.talk.provoke) | provoke (TW) + jgreet "provoke" | DIFF | |
| Trút giận | j2 rival | cx2:vent | NUM | |
| Nghe lén câu chuyện | j2 overhear | (no key) agSeeNpc "hear" | DIFF | NPC only when witnessing a deed |
| Lục rương tìm chứng cứ | j2/j78/jaudit chest | cx2:chest | NUM | |
| Cài đồ vào rương nàng (tại chỗ) | j2 chest → plantpick | harm:plant | SAME | ACT.plant; player +15 here |
| Đến gặp {X} · Đến cung nàng thăm | j21 seeBtn/visitBtn | (no key) day-plan place | — | movement only |
| Sai tai mắt dò nơi ở | j21 scoutBtn | NONE | — | |
| Mời đến cung ta | j21 inviteBtn | NONE | — | |
| Hỏi người hầu: đó là ai? | j61 k61Ask | NONE | — | |
| Witness card: Nghe lén / Cùng làm / Đứng ra can / Mặc kệ | jagent agScene/agReact | (no key) agSeeNpc hear/join/mediate/ignore | SAME | choice set; ledger ag_see:* |

### 1d. Harm (rvGroups RVGRP; player data-a=k → runAct; NPC "harm:k" → mindRun → runAct → ACT[k].f) — all SAME unless noted
| player button | ACT key | NPC option key | same fn? |
|---|---|---|---|
| Dò la | spy | harm:spy | SAME |
| Tự đi dò la | spyk | harm:spyk (HA_VAR) | SAME |
| Tung tin đồn | rumor | harm:rumor | SAME |
| Ngáng chân | trip | harm:trip | SAME |
| Uy hiếp đòi bạc | uyhiep | harm:uyhiep | SAME |
| Bán cho phe khác | banphe | harm:banphe | SAME |
| Tát | tat | harm:tat | SAME |
| Phạt quỳ | phatquy | harm:phatquy | SAME |
| Bỏ phấn lạ | rash | harm:rash | SAME |
| Ép nộp của | batnat | harm:batnat | SAME |
| Hại thú nuôi của nàng | thaopet | harm:thaopet | SAME |
| Vu oan | frame | harm:frame | SAME |
| Cài đồ vào rương | plant | harm:plant | SAME |
| Rút thẻ bài | block | harm:block | SAME |
| Nhờ ơn người quen rút thẻ bài | blockf | harm:blockf | SAME |
| Mua chuộc cung nữ | bribe | harm:bribe | SAME |
| Sai cung nữ thân tín lấy lòng | bribel | harm:bribel | SAME |
| Tố giác | accuse | harm:accuse | SAME |
| Hặc ăn mặc sai phẩm | vp | harm:vp | SAME |
| Phá việc học | ksab | harm:ksab | SAME |
| Xin bế con nàng về nuôi | takeaway | harm:takeaway | SAME |
| Ly gián | lygian | harm:lygian | SAME |
| Tố tội thật | tocao | harm:tocao | SAME |
| Xin Hoàng hậu giáng | xinhh | harm:xinhh | SAME |
| Trình Thái hậu | trinhth | harm:trinhth | SAME |
| Trình Hoàng hậu | trinhhh | harm:trinhhh | SAME |
| Hủy dung | huydung | harm:huydung | SAME |
| Giá họa trộm đồ | giahoa | harm:giahoa | SAME |
| Sai người lấy trộm đồ | laydo | harm:laydo | SAME |
| Sai cung nữ thân tín lấy đồ | laydol | harm:laydol (HA_VAR) | SAME |
| Thả thú dữ làm hại dung nhan | thathu | harm:thathu | SAME |
| Phóng hỏa kho đồ | phonghoa | harm:phonghoa | SAME |
| Trộm thú nuôi của nàng | petsteal | harm:petsteal | SAME |
| Hạ độc | poison | harm:poison | SAME |
| Hạ độc con nàng | kpoison | harm:kpoison | SAME |
| Đẩy con nàng xuống hồ | pond | harm:pond | SAME |
| Đẩy xuống hồ sen | pushp | harm:pushp | SAME |
| Bỏ xạ hương | musk | harm:musk | SAME |
| Mua chuộc bà đỡ | catswap | harm:catswap | SAME |
| Vu con nàng trù ẻo | kframe | harm:kframe | SAME |
| Hạ độc dần | slowpoison | harm:slowpoison | SAME |
| Bóc chuyện tư tình | expose | harm:expose | SAME |
| Tặng quà ăn có độc | pgift | harm:pgift | SAME |
| Trả chứng cứ lấy lòng | tieuhuy | harm:tieuhuy | SAME |
| Giúp chăm thú nuôi của nàng | petcare | NONE | — (not in BANDS; NPC jpetcare npcCare own weights) |
| Tranh sủng / Chặn ngự giá (rival card) | steal / road | (no key) jsteal | SAME |
(Tặng quà / Kết giao of the "Giao thiệp" group: see 1c.) Note: jdress "Tố xa xỉ" (xx) is not in the live ACT table — no button, no option.

### 1e. Items, Người hầu, court, faction, study, pet, toilette, night, map, Empress
| player button | code | NPC option key | same fn? | notes |
|---|---|---|---|---|
| Đeo / Tháo | j8/jinv wear | NONE | — | NPC wears by rule j8:420 (not an option) |
| Dùng | jinv use | NONE | — | |
| Tặng (item) | itemAct gift → giveTo | cx:gift | SAME | |
| Bán | jinv sell | NONE | — | |
| Tẩm | itemAct taint → taintItem | harm:taint | SAME | |
| Thử (độc) | itemAct test | NONE | — | |
| Kiểm tra đồ | j8 invAct inspect | check (AGSELF, TW.check "Soát quà được tặng") | DIFF | |
| Thưởng (own staff) | j10 servAct thuong | NONE | — | |
| Phạt | j10 phat | NONE | — | |
| Che chở | j10 che | NONE | — | |
| Hỏi chuyện (staff) | j10 hoi | NONE | — | |
| Đổi người | j10 doi | NONE | — | |
| Tiến cử (staff card) | j15 data-rec | NONE | — | |
| Xem người | j15 svlook | NONE | — | |
| Dọa tố đối thực | j15 sv doa | NONE | — | |
| Thêm cung nữ / Thêm thái giám | j15 hire | NONE | — | |
| Chưởng sự tra xét cung nữ | j15 smaid | NONE | — | |
| Phòng bị | j70 j70o | NONE | — | |
| Own-staff talk (jhouse hsvActs): Tâm sự · Sai đi dò la · Giao việc phòng bị · Nghe ngóng chung · Thưởng vì … ×3 · Thưởng vô cớ · Phạt vì … ×2 · Phạt vô cớ · Tha lỗi · Che chở · Tiến cử · Đổi người · Hỏi chuyện · Xem người | jhouse | NONE | — | 17 labels |
| Mua chuộc (other palace's servant) | j10 sv mua → bribeServ | cx2:bribeSrv | SAME | |
| Cài người vào cung khác | j10 plantsv → plantServ | cx2:plantSrv | SAME | |
| Bắt quỳ, vả miệng / Vu tội (other palace's maid) | jmline mlHitBtns → mlHitDo | (no key) jagstaff asHitPick → mlHitDo | SAME | |
| Biếu (Tổng quản) | j10 courtAct thuong → courtGive | cx:tqGift | SAME | |
| Biếu (Thái y / KSP / thái giám bán rong) | j10 courtAct | NONE | — | |
| Hỏi chuyện (court) | j10 courtAct hoi | NONE | — | |
| Lập phe cùng / Xin vào phe / Ly gián (phe) / Rời phe / Bán đứng | j10 facHTML | NONE | — | NPC: j10 facMonth rolls |
| Tự học / Học với thầy (Tứ đức, cầm kỳ thi họa) | j85 vlearn / j23 / j2 lesson | cx:study | DIFF | NPC npcStudyDo (j85 monthly rule), player lesson handler |
| Mời danh sư | j2 lesson | NONE | — | |
| Nhờ thái giám tìm thú nuôi | jpet | NONE | — | |
| Xin lỗi / Cười trừ / Đáp lại (toilette slight) | jtoil toilAns | (no key) jagtoil tl2AnsPick → toilAns | SAME | |
| Cảm tạ / Tạ ơn (toilette praise) | jtoil | NONE | — | |
| Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết | jtoilr | NONE | — | 4 |
| Tháo (makeup) | jtoil toilact off | NONE | — | |
| Gối chăn nói xấu (night2) | PEND night2 | (no key) jagemp pillowNpc | NUM | |
| Tiến cử {cung nữ} hầu thay | j8 sendMaid | (no key) jagmaid amSendQ | NUM | |
| Dư đồ: đi đến {nơi} | j2/j9 goTo | (no key) day-plan place agDrawB + agMore travel() | NUM | same travel() khắc |
| Xử tội | j8 empAct → hhAct | hh:judge | SAME | |
| Tịch thu trang sức / Tịch thu vô cớ | empAct → hhAct | hh:conf | SAME | |
| Ban thưởng | empAct → hhAct | hh:reward | SAME | |
| Ân xá | empAct → hhAct | hh:pardon | SAME | |
| Khất bổng lộc | empAct → hhAct | hh:cutpay | SAME | |

## 2. MAID (player cung nữ, isSrv; NPC = household maids, agReg maid "staff" → asOpts + jagstf2; run "maid:<SRVA k>" → asRun, same SRVA row)
| player button | code | NPC option key | same fn? | notes |
|---|---|---|---|---|
| Quét sân, lau điện / Đốc thúc cung nữ quét dọn | j42 srvCards | maid:sweep | NUM | SRVA row; player act()/runOpt, NPC asRun |
| Dâng trà, hầu điểm tâm | srvCards | maid:tea | NUM | |
| Theo hầu chủ | srvCards | NONE (maid:follow registered in AGRUN, never offered by asOpts) | — | |
| Lĩnh đồ ở Nội vụ phủ | srvCards | maid:nvp | NUM | |
| Học lễ nghi với cô cô | srvCards | maid:rite | NUM | |
| Luyện thêu thùa, chữ nghĩa | srvCards | maid:study | NUM | |
| Chải chuốt, giữ nhan sắc | srvCards | maid:groom | NUM | |
| Nghỉ lấy sức | srvCards | maid:rest | NUM | |
| Thêu khăn bán ra ngoài | srvCards | maid:embro | NUM | |
| Mua thuốc bổ | srvCards | maid:med | NUM | |
| Quản sổ sách trong cung | srvCards | maid:books | NUM | |
| Việc chủ sai / Làm xong: … | srvCards / srvTalk task | NONE (maid:errand registered, never offered) | — | |
| Lén báo tin cho {X} | srvCards | maid:spy | NUM | |
| Lén giữ đồ Nội vụ phủ phát | srvCards (gated) → eitPilTake | (no key) jeitem eitPilNpc; maid:pil registered, never offered | SAME | eitPilTake / eitPilJudge |
| Hầu trà khi ngự giá / Lui sau bình phong | srvCards | (no key) jagmaid amNightTea / amDecide | NUM | |
| Giặt đồ / Nghỉ tay một lát / Cầu xin quản sự (Tân Giả khố) | srvCards lau | NONE | — | 3 |
| Uống thuốc phá thai | j42:546 | NONE | — | |
| Khảo hạch Nội vụ phủ | jexam exSrvCard | (no key) jexam exSrvNpc | NUM | |
| Đấm lưng, hầu chuyện | srvTalk mis | maid:massage | NUM | |
| Xin chủ ban thưởng | srvTalk mis | maid:askRew | NUM | |
| Bẩm tin dò được | srvTalk mis | maid:tellMis | NUM | |
| Xin chủ tiến cử lên Nội vụ phủ | srvTalk mis | maid:askRec | NUM | |
| Xin chủ cho đi hầu cung khác | srvTalk mis → spAsk | maid:leave (jagstf2) | SAME | spAsk |
| Hầu bên cạnh chủ | srvTalk rv (mistress away) | maid:beside | NUM | |
| Quỳ dâng trà | srvTalk emp | maid:empTea | SAME | amDo / amTeaO |
| Cúi đầu lui tránh | srvTalk emp | (= keep routine, no key) | — | |
| Hành lễ thỉnh an | srvTalk rv/hh | maid:greet | NUM | |
| Mật báo chuyện của {chủ} | srvTalk rv/hh | maid:betray | NUM | |
| Tố cáo {chủ} trước Hoàng hậu | srvTalk hh | maid:accuse | NUM | |
| Dọa tố chuyện tư tình | j42:496 | NONE | — | |
| Bẩm chủ chuyện của {X} | j42:497 | NONE | — | |
| Trò chuyện (đồng liêu) | srvTalk sv / srvStaffAct | maid:chat | NUM | |
| Biếu quà nhỏ / Biếu quà | srvTalk sv / srvStaffAct | maid:gift | NUM | |
| Nhờ dò tin | srvStaffAct | maid:ask | NUM | |
| Tố lỗi với chủ | srvStaffAct | maid:frame | NUM | framed side → stf2Framed |
| Bỏ độc vào bát cơm | srvStaffAct → mlPoisonDo | maid:poison (jagstf2) | SAME | |
| Xin thuốc bổ | srvTalk ty | maid:tonic | NUM | |
| Học lỏm nghề thuốc | srvTalk ty | maid:learn | NUM | |
| Chào hỏi đúng lễ | j42 man | maid:hail | NUM | |
| Liếc mắt đưa tình | j42 man | maid:flirt | NUM | |
| Trao khăn tay, thư | j42 man | maid:token | NUM | |
| Hẹn gặp riêng | j42 man | maid:tryst | NUM | |
| Hẹn ước trăm năm | j42 man | maid:vow | NUM | |
| Cắt đứt | j42 man | NONE (maid:cut registered, never offered) | — | |
| Vâng lệnh / Từ chối / Mật báo (lệnh chủ) | j42 cnvOrdOpts | (no key) jagstf2 stf2Ord | SAME | |
| Nhận bạc, làm tai mắt / Từ chối, bẩm chủ / Từ chối, im lặng | j42 cnvBribeOpts | (no key) stf2Bribe | SAME | |
| Thanh minh / Nhận tội, xin tha / Đút bạc (bị vu) | j42 cnvFrameOpts | (no key) stf2Framed | SAME | |
| Cúi đầu nhận lỗi / Khóc lóc xin tha / Cãi lại (bị mắng) | j42 cnvScold | NONE | — | |
| Tạ ơn, xuất giá / Xin ở lại hầu chủ (ban gả) | j42 cnvGrant | (no key) jagstaff asMonth grantWed/grantStay | DIFF | same 2 choices, own code |
| Xuất cung về quê / Ở lại làm ma ma / Xin chủ giữ lại / Xin ở lại (tuổi) | j42 cnvAge | (no key) asMonth age_out/mama/keep | DIFF | |
| Rót rượu gần ngự tọa / Đứng sau hầu chủ (yến) | j42 cnvFest | NONE | — | |
| Nghe lời / Đút bạc / Mặc kệ (bị tống tiền) | j42 cnvBlack | NONE | — | |
| Tắm gội chờ giá / Cáo bệnh (được gọi thị tẩm) | jagmaid:88-92 | NONE | — | NPC maid never declines |
| Theo về vương phủ / Xin ở lại hầu chủ | j42:451 | NONE | — | |
| Dư đồ moves | placeEnterHook / goTo | (no key) day-plan place (base = master's palace / option place) | — | |

Eunuch (srv) group: no player of that group; NPC eunuchs get the same asOpts list minus groom / embro / men acts (keys srv:*), plus **srv:vow = đối thực with a maid of another palace** (no player button anywhere).

## 3. EMPEROR / THÁI HẬU (no player of these groups)
| NPC option key | act | player button | notes |
|---|---|---|---|
| emp:summon | triệu người hầu đàn, đánh cờ (tsSummonGo) | NONE (no Emperor player; she receives the summons card) | |
| emp:visit | ngự giá lâm cung (visGo) | NONE (she receives the visit) | |
| emp:tea | ghé uống chén trà (empTeaCard) | NONE (she receives the card) | |
| th:gift | Thái hậu ban thưởng | NONE | nearest: HH "Ban thưởng" (hhAct, other code) |
| th:admon | khuyên Hoàng thượng mưa móc đều khắp | NONE as TH; player-HH has TW.admon (other code) | |
| th:release | tha khỏi lãnh cung | NONE as TH; player-HH "Ân xá" (other code) | |

## PLAYER buttons with NO NPC option (no AG key and no other NPC choice path)
Consort (deck): Múa trong yến tiệc · Cài tai mắt · Nghỉ ngơi một lát · Phát bạc cứu giúp cung nhân nghèo · An thai · Tự bào chế thuốc an thai · Dạy dỗ hoàng tử/công chúa · Dạy … học chữ (j53 tutor is not a choice) · Tự học {nghề} (works) · Mời thái y bắt mạch · Sang Thái y viện xin bắt mạch · Xem sổ nguyệt sự · Xem lén sổ nguyệt sự · Uống thuốc thúc sinh · Tâu xin nghiệm thân · Thú tội với Hoàng thượng · Hối lộ KSP sửa sổ · Uống thuốc phá thai · Cầu tin tức người nhà · Chép kinh, giữ đức · Cầu xin · Nhờ người bên ngoài · Thêu khăn bán · Trồng rau · Xuất gia · Nhờ … đưa thư kêu oan.
Consort (talk/places): Kể tội {X} (Thái hậu) · Xin bắt mạch / Xin chữa bệnh · Học hỏi y lý · Xem sổ thị tẩm · Hầu chuyện, xem lén sổ nguyệt sự · Đưa cơm áo · Nghe ngóng chung · Giao việc phòng bị · Giải bày hiểu lầm · Nhắc lại ân xưa · Sai tai mắt dò nơi ở · Mời đến cung ta · Hỏi người hầu: đó là ai? · NPC↔NPC Hỏi han sức khỏe / Khen tài nghệ / Bàn tán / Chia sẻ bí mật (only NPC→player via jgreet).
Consort (harm): Giúp chăm thú nuôi của nàng.
Consort (items/staff/court/faction/study/pet/toilette): Đeo/Tháo · Dùng · Bán · Thử độc · Thưởng · Phạt · Che chở · Hỏi chuyện (staff) · Đổi người · Tiến cử (staff) · Xem người · Dọa tố đối thực · Thêm cung nữ · Thêm thái giám · Chưởng sự tra xét cung nữ · Phòng bị · 17 own-staff talk labels (jhouse) · Biếu Thái y / KSP / thái giám bán rong · Hỏi chuyện (court) · Lập phe · Xin vào phe · Ly gián (phe) · Rời phe · Bán đứng · Mời danh sư · Nhờ thái giám tìm thú nuôi · Cảm tạ/Tạ ơn · Ghi hận · Mách Hoàng hậu · Tặng lại · Hỏi bí quyết · Tháo (makeup).
Maid: Theo hầu chủ · Việc chủ sai / Làm xong · Giặt đồ · Nghỉ tay một lát · Cầu xin quản sự · Uống thuốc phá thai · Dọa tố chuyện tư tình · Bẩm chủ chuyện của {X} · Cắt đứt · Cúi đầu nhận lỗi · Khóc lóc xin tha · Cãi lại · Rót rượu gần ngự tọa · Đứng sau hầu chủ · Nghe lời · Đút bạc (tống tiền) · Mặc kệ · Tắm gội chờ giá · Cáo bệnh · Theo về vương phủ · Xin ở lại hầu chủ (vương phủ).

## NPC options with NO player button
- emp:summon · emp:visit · emp:tea (Emperor group has no player).
- th:gift · th:admon · th:release (Thái hậu group has no player).
- srv:* (whole eunuch group has no player; its options mirror maid buttons) and srv:vow đối thực (no button in any life).
- check (AGSELF "cho soát quà được tặng", TW.check): no TW button for the player; nearest = "Kiểm tra đồ" (invAct inspect, other code).
- harm:cook ("tự tay nấu một món", wkMake): no matching player button in the consort deck probe (player workshop = Tác phẩm tab, other path).
- effort kd qf labels "dâng canh sâm…", "chép bài thơ dâng lên…", "thêu túi thơm dâng Hoàng thượng": those pool cards are gone from the player's deck (j83 replaces them with works); player has only "Dâng một cành hoa" / "Đánh đàn ở ngự hoa viên".
- cx2:maidTalk: label "Tâm sự" (AGC2BTN) no longer exists on the player's confidant-maid card (jact.js:69 renamed it "Trò chuyện với cung nữ" with other numbers).
- Dead AGRUN keys (registered, never offered by any provider): maid:/srv: follow, errand, cut, pil.
Mismatched pairs (button exists but different function/numbers): Cảnh báo nàng↔warn, Khiêu khích↔provoke (rival and HH), Nhờ giúp đỡ↔cx2:help, Trò chuyện với cung nữ↔cx2:maidTalk, Sai đi dò la↔cx2:maidSpy, Tự học/Học với thầy↔cx:study, Điểm trang↔jagtoil, Đánh đàn ở ngự hoa viên↔effort qf, Kiểm tra đồ↔check.

## COUNTS (rows of the tables above; a row may hold 2–17 labels of one family)
| group | player-button rows | NPC AG key | NPC path without key | NONE | keyed rows SAME / NUM / DIFF |
|---|---|---|---|---|---|
| Consort 1a deck | 40 | 22 | 5 | 13 | 0 / 21 / 1 |
| Consort 1b places/talk | 29 | 20 | 1 | 8 | 1 / 16 / 3 |
| Consort 1c rival card | 32 | 20 | 7 | 5 | 14 / 3 / 3 |
| Consort 1d harm | 46 | 44 | 1 | 1 | 44 / 0 / 0 |
| Consort 1e items/staff/court/faction/study/toilette/night/map/Empress | 41 | 12 | 5 | 24 | 10 / 0 / 2 |
| Maid | 55 | 33 | 10 | 12 | 3 / 30 / 0 |
| **Total** | **243** | **151** | **29** | **63** | **72 / 70 / 9** |
NPC option keys live: AGREG consort 9 providers (agOpts: 9 AGSELF + 11 AGSOC + effort; cx 7 + study/thHelp/hhShield/buy/gift/ally/portrait/humble 8 + tqGift; cx2 20; harm 44 ACT keys + taint/cook/tieuhuy), hh 5 + admon, th 3, emp 3, maid/srv 36 SRVA + empTea each.
NPC keys with NO player button: 6 (emp:summon, emp:visit, emp:tea, th:gift, th:admon, th:release) + the eunuch group srv:* (no player) incl. srv:vow đối thực; partial/no exact button: check, harm:cook, effort-qf labels, cx2:maidTalk ("Tâm sự" renamed); dead registered keys never offered: maid:/srv: follow, errand, cut, pil (4×2).
