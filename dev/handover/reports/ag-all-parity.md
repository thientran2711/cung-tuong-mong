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

## 2e — PARITY BUILD (worker AG-ALL-2e session_01UV1SzhDp4m5VLV1k7vMcg3, review/ag-all-2 @ 986f797a; START_CTX ≈ 6 % of 1M)
PRIORITY #1 CHECK ('jagacts3 par3 cx3 coldActsOf servDo P3C'): OD 0 | ledger 0 | claims AG-ALL-2 = C-AG | main 0 | review/* 0 (new names); reused jagday agReg/agRunReg, jagacts agcU/agcCan, jmind mindPick, j8 useItem/sellItem, j13 treat, j10 courtGive, j85 charityFx, jrest restLat, j83 wkMake/wkNpcRaw, jagstaff asOpts/asOpt/asRun, jagknow errands (2c).
Code: dev/build/jagacts3.js (new, assembled after jagtoil), BAL.ag.par3 (jbal2 end); shared-file hunks: j2 (5 cards → P3C), j78 (Kể tội pick → P3C.tell), j10 (servAct body → servDo(m,a,s)), j14 (coldActs → coldActsOf(p); coldMonth NPC roll → p3Cold), j85 (charityFx(p)), jrest (restLatEmo(p)). Test dev/test/ag-par3.js ALL PASS (13 checks); ag-stf2 23/23; one-core-guard PASS (inline 4920 < baseline 5093).
ONE FUNCTION rule: each card is built once by P3C.<k>(p) (her card = P3C.<k>(S), NPC = P3C.<k>(v) through p3Run: cost → odA odds → gain/loss → the card's go); acts that already took a person are called as they are. NPC options = agReg("consort","par3") keys cx3:<k>, utility agcU (needs × odds × nết), picked by mindPick in the day plan; khắc = cardCost of the same card (o.kc).
NOTE for 2d / ag-all.test okK: accept cx3:<k> when AGC3BTN[k] (player label) is in the page — same rule as AGC2BTN.

### before → after (rows of the NONE lists above)
| player button | before | after | NPC key | function |
|---|---|---|---|---|
| Múa trong yến tiệc | — | SAME | cx3:dance | P3C.dance (ghen of the others) |
| Cài tai mắt | — | SAME | cx3:eyes | P3C.eyes |
| An thai / Tự bào chế thuốc an thai | — | SAME | cx3:anthai | P3C.anthai (p.anthai halves miscarriage risk, j8/jkh already read it for NPCs) |
| Nghỉ ngơi một lát | — | SAME | cx3:restLat | BAL.restLatSuc + restLatEmo(p) |
| Phát bạc cứu giúp cung nhân nghèo (+ Đưa cơm áo, merged into it by jact) | — | SAME | cx3:charity | charityFx(p), once a month (p.charM) |
| Tự học {nghề}: tác phẩm | — | SAME | cx3:work | wkMake(v, WDEF[best art], 0, wkNpcRaw) |
| Kể tội {X} (Thái hậu) | — | SAME | cx3:tell | P3C.tell (her evidence evG, Thái hậu regard) |
| Xin chữa bệnh (Thái y viện) | — | SAME | cx3:treat | P3C.treat → treat(p,"ty") |
| Dùng (item) | — (j8 drip only) | SAME | cx3:use | useItem(v, ix) |
| Bán (item) | — | SAME | cx3:sell | sellItem(v, ix) |
| Biếu (Thái y) | — | SAME | cx3:tyGift | courtGive(v,"ty") (feeds thyBribedBy) |
| Thưởng / Phạt / Hỏi chuyện / Đổi người / Che chở (own staff, j10) | — | SAME | cx3:staffThuong/Phat/Hoi/Doi/Che | servDo(m,a,s) (servAct calls it for her) |
| Lãnh cung: Cầu xin · Nhờ người bên ngoài · Tìm chứng cứ minh oan · Gửi bài thơ cũ · Nhờ con cầu xin · Chép kinh, giữ đức · Trồng rau · Thêu khăn bán · Xuất gia | NPC flat roll 3 % / 5 % | SAME | (monthly choice, p3Cold) | coldActsOf(p) — one list; NPC freed by p3Free, nun by p3Nun |
| Theo hầu chủ (maid) | registered, never offered | SAME | maid:follow / srv:follow | SRVA.follow via asOpt/asRun (master away) |
| Cắt đứt (maid) | registered, never offered | SAME | maid:cut | SRVA.cut; worth = asRisk × caughtTin |
| Việc chủ sai / Làm xong (maid) | — | SAME (2c) | maid:listen / scout / watch | jagknow knStaffOpts (the 2c errands) |
### documented exemptions (information only — the NPC already holds that knowledge, or no NPC state exists)
Xem sổ nguyệt sự · Xem lén sổ nguyệt sự · Hầu chuyện, xem lén sổ nguyệt sự · Xem sổ thị tẩm · Xem người · Hỏi người hầu: đó là ai? · Sai tai mắt dò nơi ở (an NPC reads places from the record, agAt) · Tháo (makeup off: look only) · Biếu KSP / thái giám bán rong (court af only drives HER sổ / shop; an NPC's KSP deed = key ksp "Đút lót lật thẻ") · Nhờ {người} đưa thư kêu oan (needs her palace-men bond S.men; NPCs have none).
### 2e part 3 (worker AG-ALL-2e2 session_01UV1Szm1UkuYvj6p45REz2M; START_CTX ≈ 4 % of 1M; stopped at ≈ 28 % = START + 25 %, rollover)
PRIORITY #1 CHECK ('P3T talk memInvoke itemTest hireTake staffTam searchMaids facFound P3C.drug'): OD 0 | claims AG-ALL-2 = C-AG | main 0 | review/* only review/ag-all-2 (this branch) — reused j9 topicOpts, jmem memInvoke, j8 itm/oSee, j10 servDo/threatServ/found/askJoin/leaveFac/sellOut/divide, j14 recommend/searchMaids, j29 npool/hireCard, jkh khRecOff.
Commits on review/ag-all-2 (rebased on 2d 46fdf2f4): b057a54f (3a talk) · 9214de5a (3b household + phe) · a25fa285 (3c thúc sinh + test) · 275efe22 (test stable). Test dev/test/ag-par3.js ALL PASS (22 checks, 2 runs); ag-stf2 23/23; one-core-guard PASS (inline 4895 < 5093). ag-all.test: the 2 FAILs are the known okK (2d step 1: accept cx3:<k> when AGC3BTN[k] is in the page) and perf p95 — base 986f797a measured 7.7 / 10.8 ms, after 8.3 / 10.4 ms on this container (noise, no clear regression; 2d's CPU×4 gate decides).
| player button | before | after | NPC key | function (ONE for her and the NPC) |
|---|---|---|---|---|
| Hỏi han sức khỏe / Khen tài nghệ nàng / Bàn tán về {X} / Chia sẻ bí mật (NPC↔NPC) | NPC→player only (jgreet) | SAME | cx3:talkHealth / talkPraise / talkGossip / talkSecret | P3T.<k>(speaker, listener) — j9 topicOpts now builds her 4 topics with P3T(S,v); chat-repeat factor per pair (S.chat when she is one of the two, else speaker's monthly p.chat) |
| Nhắc lại ân xưa | — | SAME | cx3:invoke | memInvoke(v,p) (p = who invokes; q72 debt only when p is her, else the liking step BAL.mem.invokeAff) |
| Nghiệm độc / Thử (itemAct test) | — | SAME | cx3:test | itemTest(p,ix) (j8; numbers BAL.ag.par3.test) |
| Thêm cung nữ / Thêm thái giám | — | SAME | cx3:hire | hireTake(m,role,s,paid) — her hireCard choice and the NPC pick (mindPick) from the same npool |
| Tâm sự (jhouse own staff) | — | SAME | cx3:staffTam | staffTam(m,s) |
| Tiến cử (staff) | — | SAME | cx3:staffUp | recommend(id,m) (BAL.house.upBac/upDanh, merit BAL.ag.par3.house.merit) |
| Chưởng sự tra xét cung nữ | — | SAME | cx3:search (once a month) | searchMaids(m) |
| Dọa tố đối thực | — | SAME | cx3:threat | threatServ(a,s); NPC knows the pair from servDo "hoi" / searchMaids, which now fill m.knowDT for any master |
| Lập phe cùng / Xin vào phe / Rời phe / Bán đứng / Ly gián | facMonth flat rolls (joinFac with its own odds) | SAME | cx3:facFound / facJoin / facLeave / facSell / facDiv (once a month) | found / askJoin / leaveFac / sellOut / divide; facMonth's NPC rolls are off while BAL.ag.par3 is on (p3FacOn) |
| Uống thuốc thúc sinh | flat roll BAL.preT.npcDrug | SAME | cx3:drug | P3C.drug(p) (her deck card in jkh = P3C.drug(S)) |
| Đeo / Tháo | "NONE" | SAME (re-checked) | (monthly rule j8) | wear(v,i) is her wear(p,ix) |
| Học hỏi y lý | — | SAME (re-checked) | cx:study | jact removed it from Thái y viện; it lives in Tài nghệ Y = cx:study |
### more documented exemptions (part 3)
Giải bày hiểu lầm (j95b: the rumour record z.rum is only about HER; no NPC↔NPC misunderstanding state) · Cầu tin tức người nhà (jts lantern: information = who wants to harm her / Thư nhà; an NPC reads danger directly; NPC lanterns already run tsDenNpc) · Mời thái y bắt mạch / Sang Thái y viện xin bắt mạch (jthaiy req: information on HER body / taint / plots; the NPC act is cx3:treat, cx2:doctor) · Thưởng vì / Phạt vì / Tha lỗi (judgeServ: causes are drawn for her staff only, servCauses; NPC Thưởng / Phạt = cx3:staffThuong / staffPhat) · Xem người (info) · Nghe ngóng chung (info; NPC = 2c maid:listen) · Thú tội / Hối lộ KSP sửa sổ / Uống thuốc phá thai (j22: an NPC affair never carries a child — pregMismatch is hers only) · Tâu xin nghiệm thân (NPC accuser side exists: jkh khNgNpc).
### STILL OPEN (successor, in this order)
1. Mời đến cung ta (j21 invite: S.invite → she comes next buổi; NPC side = schedule the guest's next-buổi visit to the inviter's palace, the shared-clock rules of 2d L1641) · Giao việc phòng bị / Phòng bị (j70 def70: check whether NPC houses have defence orders; else exemption).
2. Mời danh sư (hireMaster: S.master; make hireMaster(p) + j85 npcStudy read v.master) · Nhờ thái giám tìm thú nuôi (jpet) · Giúp chăm thú nuôi (jpetcare npcCare own weights → BANDS) · Dạy dỗ con / Dạy học chữ (j53 ktNpcTutor → option).
3. Toilette answers: Cảm tạ / Tạ ơn · Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết (jtoilr) — extend jagtoil tl2AnsPick.
4. Maid dilemmas (NPC maids never answer them today): Tân Giả khố ×3 · Uống thuốc phá thai (j42:546) · Dọa tố chuyện tư tình + Bẩm chủ chuyện của X · bị mắng (cnvScold ×3) · yến (cnvFest ×2) · bị tống tiền (cnvBlack ×3) · gọi thị tẩm (Tắm gội chờ giá / Cáo bệnh: jagmaid:88–92 never declines) · vương phủ (j42:451 ×2). Pattern: the cnv*Opts builder once + stf2Pick, like jagstf2.
5. The 9 DIFF pairs: warn / provoke (TW vs jgreet), cx2:help (j9 vs jagacts2), cx2:maidTalk (AGC2BTN "Tâm sự" → "Trò chuyện với cung nữ"; player w:{maid:3}+intel roll vs BAL.ag.cx2.maidTalk), cx2:maidSpy (jwhy), cx:study vs lesson handler, Điểm trang vs jagtoil, effort qf labels, check (TW "Soát quà") vs "Kiểm tra đồ" (now that itemTest exists, route TW.check through itemTest), jgreet health/praise/secret/gossip → P3T(v,S) (the builder is ready: run P3T.<k>(v,S).run() inside gmOpts and keep gmSay as the head line).
COUNT after part 3: ~23 open → 23 − 15 done (talk ×4, invoke, test, hire, Tâm sự, Tiến cử, tra xét, dọa tố, phe ×5 counted as 1 row, thúc sinh, Đeo/Học hỏi y lý re-checked) − 8 exempt ≈ 9 rows open (list 1–4) + 9 DIFF.
### 2e part 4 (worker AG-ALL-2e3 session_01UV1Szi6gin3qzMy9t4cABa; START_CTX ≈ 5 % of 1M; stopped at ≈ 30 % = START + 25 %, rollover)
PRIORITY #1 CHECK ('P3T talk memInvoke itemTest hireTake staffTam searchMaids facFound P3C.drug' + 'inviteO ords70Of petBuyOne ktTeach toilRx amNight'): OD 0 | claims AG-ALL-2 = C-AG | main 0 | review/* only review/ag-all-2 — reused j21 invite, j70 ORD70/canhB70/oSee/seeP70/ordMonth70, jpet petBuyO/petAdd, jpetcare ACT.petcare, j53 ktTeach, jtoilr answer bodies, jagtoil tl2AnsPick/tl2See, jagmaid amNight/amAdd.
Commits on review/ag-all-2 (rebased on 2d2 3c716a2a): part 4a + 4b → tip 9f427aca. Tests: ag-par3 ALL PASS (27 checks; talk check fixed to measure the listener the NPC picked — it was flaky), ag-stf2 23/23, ag-toil2 16/16, agmaid 23/23, ag-taimat 25/25, one-core-guard PASS (inline 4881 < 5093).
| player button | before | after | NPC key | function (ONE for her and the NPC) |
|---|---|---|---|---|
| Mời đến cung ta | NPC→her 4 % flat roll; no NPC↔NPC | SAME | cx3:invite2 | inviteO(host,guest) (j21; BAL.invite) — her button and the NPC host; the guest answers when the next buổi's places are drawn (p3InvLand in j21 placeWhere): yes = at the host's palace, no = host's liking -BAL.eff.j21.top; host→her = word sent, she decides; flat roll off under par3 |
| Giao việc phòng bị / Phòng bị (canh · thử độc · theo dõi · giữ sổ) | NPC houses had no orders | SAME | cx3:def_canh / def_thudoc / def_theodoi / def_giuchung (once a month) | ORD70 orders on p.ord70; j70 ords70Of/sv70(sid,p)/canhB70(o,p): oSee + seeP70 bonuses for an NPC target, ordMonth70npc (price, lòng, watcher caught / evidence, BAL.def70), busy servant (bestSent), food taster (runAct wrapper, BAL.def70.taste/die — her j70 rule now reads the same BAL) |
| Nhờ thái giám tìm thú nuôi | 3 % flat buy at 70 % | SAME | cx3:petBuy | petBuyOne(t,p) + petBuyO(k,p) (jpet; odds from the buyer's Tai mắt) |
| Giúp chăm thú nuôi của nàng | mindMenu only (legacy path, off under AG) | SAME | cx3:petcare | runAct(v,t,"petcare") = ACT.petcare |
| Dạy dỗ / Dạy học chữ · Dạy lễ nghi | quarterly flat roll by trait weights | SAME | cx3:teachV / teachD | ktTeach(k,p,f), cost BAL.kidTeach (her ktAct + deck card read the same) |
| Toilette: Ghi hận · Mách Hoàng hậu (slight) | NPC: only Xin lỗi / Cười trừ / Đáp lại | SAME | tl2AnsPick(w,x) + p3ToilAns | toilRxGrudge / toilRxTell(p,h,nm,odds) / toilTellO(p,h) (jtoilr; her go() calls them with S) |
| Toilette: Cảm tạ · Tặng lại (praise) · Hỏi bí quyết | none | SAME | tl2See wrapper (BAL.ag.par3.toil) | toilRxGive(p,h,…) + toilGiveCost(p) · toilRxAsk(p,h) + toilAskO(p,h); NPC tip read by toilNpcSk |
| Maid: gọi thị tẩm — Tắm gội chờ giá / Cáo bệnh | NPC maid never declined | SAME | (amNight wrapper, BAL.ag.par3.sum) | go = amNight; Cáo bệnh = amAdd(m,-BAL.ag.maid.decline) + AMN.decline (her fx) |
### more documented exemptions (part 4)
Mời danh sư (consort): the player's button is gone — hireMaster (j2) has no button anywhere (no id="master" in the page; only the dead j6 handler + jlogsync label); the kid-life card jkc "Mời danh sư" belongs to the kid player only (no NPC kid player). · Mời thầy riêng cho con (j53 ktNpcTutor): already an NPC choice by nết + purse at age 6 (left as is; small R jitter, not a flat outcome roll).
### STILL OPEN (successor, in this order)
1. Maid dilemmas (pattern: build the option list ONCE as a function f(p,…) used by her PEND card and an NPC maid; NPC picks with stf2Pick(a,O,kind) like jagstf2): bị mắng (j42 PEND.cnvScold ×3 — NPC side = the master's mood event for an NPC maid; check jagstaff for an NPC "master scolds" hook first) · yến (PEND.cnvFest ×2) · bị tống tiền (PEND.cnvBlack ×3; NPC leak at j42:509 is hers only) · Dọa tố chuyện tư tình + Bẩm chủ chuyện của X (j42:504–505; NPC maid knowing an affair = s.knowAff?) · vương phủ (j42:542 ×2) · Tân Giả khố ×3 · Uống thuốc phá thai (j42:554 — NPC maids never carry a child: probably exemption like j22).
2. The 9 DIFF pairs (unchanged from part 3's list): warn / provoke (TW vs jgreet), cx2:help (j9 vs jagacts2), cx2:maidTalk ("Tâm sự" → "Trò chuyện với cung nữ"), cx2:maidSpy (jwhy), cx:study vs lesson handler, Điểm trang vs jagtoil, effort qf labels, check (TW "Soát quà") → itemTest, jgreet health/praise/secret/gossip → P3T(v,S) (run P3T.<k>(v,S).run() inside gmOpts, keep gmSay as the head line).
COUNT after part 4: rows open ≈ 9 → 9 − 7 done (invite, phòng bị, pets ×2, dạy con, toilette answers, thị tẩm) − 1 exempt (danh sư) ≈ 1 row family open (maid dilemmas, ~8 cards) + 9 DIFF.
HANDOVER (2e3 → successor): branch review/ag-all-2 tip 9f427aca; worktree recipe = sparse detached as in START; file dev/build/jagacts3.js (append new sections at the end), numbers BAL.ag.par3 (jbal2), test dev/test/ag-par3.js (append before "no page errors"). Rebase on 2d2's tip before every push (2d2 pushes often). Then "DONE <sha>" to 2d2 session_01UV1SziejYRbprBXw2sp1i5 + foreman C-AG #3 session_01UV1Szh8FwC7dVrdZpdtNPP.
### 2e part 5 (worker AG-ALL-2e4 session_01UV1SziADJEDSw3hoZUBEp3; START_CTX ≈ 3 % of 1M; finished ≈ 25 %) — FINAL: every row SAME or exempt
PRIORITY #1 CHECK ('cnvScold cnvFest cnvBlack Dọa tố Bẩm chủ Tân Giả khố' + 'helpAsk maidTalk maidSpy gmOpts TW.check npcStudyDo adStroll'): OD 0 | claims AG-ALL-2 = C-AG | main 0 | review/* only review/ag-all-2 — reused j42 cnvPend / stfAp / cnvOrdOpts pattern, jagstf2 stf2Pick / stf2Do, jagstaff asMonth / asAp, j10 servDo / threatServ, P3T (part 3), jtwoway twDo, j8 inspect, jwhy spyRoll, jmind mindPick.
Commits on review/ag-all-2 (rebased on 2d2 f9ba58f9): part 5a (maid dilemmas) + 5b (9 DIFF pairs) → tip 86135854. Tests: ag-par3 ALL PASS (36 checks), ag-stf2 23/23, agmaid_check 23/23 (2 runs; the "seats full" check now forces the accepted night — Cáo bệnh exists since 4b, it was flaky), one-core-guard PASS (inline 4848 < 5093). Odds: odA (j9) and spyRoll (jwhy) clamp by BAL.odds.lo/hi (5..95); new rolls go through cnvOd (BAL.odds clamp); nothing new rolls at 100.
| player button | before | after | NPC side | function (ONE for her and the NPC) |
|---|---|---|---|---|
| Maid bị mắng: Cúi đầu nhận lỗi · Khóc lóc xin tha · Cãi lại | NPC maid never answered | SAME | the punished maid (j10 servDo "phat": her Phạt button and cx3:staffPhat) answers by stf2Pick | j42 cnvScoldOpts(a,m) (her PEND.cnvScold = cnvPend(S, cnvScoldOpts(S,m))), BAL.ag.par3.cnv.scold |
| Maid yến (tháng giêng / bảy): Rót rượu gần ngự tọa · Đứng sau hầu chủ | none | SAME | every adult NPC maid at her master's side, months 1 and 7 (asMonth → p3MaidMonth) | cnvFestOpts(a,m): her srvNotice("fest"), an NPC maid his regard amTeaG + empMet "fest"; BAL.ag.par3.cnv.fest |
| Maid bị nắm thóp: Nghe lời, làm tai mắt · Đút bạc bịt miệng · Mặc kệ | threatServ always made the servant a Tai mắt | SAME | the threatened servant answers (j10 threatServ: her Dọa tố đối thực and cx3:threat) | cnvBlackOpts(a,v,m): the bạc goes to the threatener; Mặc kệ fails → master learns (knowDT), lòng −, odds Tân Giả khố; BAL.ag.par3.cnv.black |
| Maid biết tư tình: Dọa tố chuyện tư tình · Bẩm chủ chuyện của {X} | NPC maids never knew an affair | SAME | each month an NPC maid may learn a consort's affair (BAL.ag.par3.cnv.aff.see) and picks Dọa tố / Bẩm chủ / Giữ kín (= her not pressing a button) | cnvAffOpts(a,v,mis) (her two person-card buttons are built from it) |
| Cảnh báo nàng / Khiêu khích (jgreet: an NPC comes to her) | DIFF (jgreet own numbers) | SAME | gmOpts warn / provoke | twDo(v,S,k) — her TW buttons |
| Hỏi han / Khen tài nghệ / Chia sẻ bí mật / Bàn tán (jgreet) | DIFF | SAME | gmOpts health / praise / secret / gossip | P3T.<k>(v,S).run() (gmSay stays the head line) |
| Nhờ giúp đỡ | DIFF (j9 vs jagacts2; her friend with nothing to give said "khéo từ chối" −fail, the NPC got "tiếp ân cần") | SAME | cx2:help | helpAsk(p,t) — one rule: a friend with nothing to give receives kindly, no loss |
| Trò chuyện với cung nữ | DIFF (her lòng +3 + 15 % flat; NPC label "Tâm sự" +6) | SAME | cx2:maidTalk (AGC2BTN label = "Trò chuyện với cung nữ") | maidTalkDo(p): lòng +BAL.ag.cx2.maidTalk.w.maid; the place tip (hear) is information only for her (an NPC reads places from agAt) |
| Sai đi dò la | DIFF (NPC flat cx2O odds, random evGuilty target) | SAME | cx2:maidSpy names a target (maidSpyT, mindPick by spite / danger) | spyRoll(p,t,maid); gain chứng cứ BAL.eff.j78.evN; failure lòng −loyalSpyMaidRun, target oán BAL.eff.j78.j78maidFail (her intelLearn facts = information, exempt) |
| Tự học / Học với thầy | NUM/DIFF (subject by weighted dice, teacher by flat roll 50) | SAME | cx:study → j85 npcStudyDo | subject and teacher-or-self by mindPick (BAL.ag.par3.study); points through her lesson rule (2b mg2) |
| Kiểm tra đồ ↔ Soát quà (TW.check) | DIFF (NPC always found the taint) | SAME | SOC check / AGSELF check | j8 inspect(p) — her detection odds oSee per item, trail evidence |
| Đánh đàn ở ngự hoa viên (now her garden pop-up "Đánh đàn chờ ngự giá", jact adStroll) | DIFF (effort qf flat o:50) | SAME | cx3:qin at Ngự hoa viên (vuon) | qinCard(p): odds / Sủng / Sức from BAL.ag.par3.qin; effort qf keeps only the labels whose player cards are gone (listed under "NPC options with NO player button") |
| Điểm trang ↔ jagtoil | DIFF (seeded toilNpcPlay vs her mini-game) | EXEMPT (mini-game rule) | jagtoil tl2 | a mini-game is played by the NPC through its draw (OD L1640 minigame fairness: mgNpcRaw + 2d's hand ceiling); the judgement is the same toilFx / toilBack / toilSeeRule |
### more documented exemptions (part 5)
Tân Giả khố ×3 (Giặt đồ / Nghỉ tay một lát / Cầu xin quản sự): an NPC servant sent to Tân Giả khố leaves the household record (jagstaff asOut "tgk"); no NPC laundry state exists. · Uống thuốc phá thai (maid, j42 srvCards): NPC maids never carry a child (no s.preg; their love road asMenFor/asCaught has no pregnancy) — like j22 for consorts. · Theo về vương phủ / Xin ở lại hầu chủ (cnvPrince): NPC maids never love a vương gia (jagstaff asMenFor excludes rw "vương gia"), so no prince ever asks for one.
COUNT after part 5: open rows 0 — maid dilemmas: 4 families SAME (scold, fest, black, affair), 3 exempt (Tân Giả khố, phá thai, vương phủ), thị tẩm SAME (4b); DIFF 9 → 8 SAME + 1 exempt (Điểm trang, mini-game rule).
NOTE for 2d2 (assembler): ag-all.test okK should accept cx3:qin via AGC3BTN.qin ("Đánh đàn chờ ngự giá", in the page from the garden pop-up) like the other cx3 keys; flaky check seen once in agmaid_check after the rebase (1 FAIL, then 2 runs ALL PASS).
