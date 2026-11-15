# Event banners (KIT 40 kitEventDp) — which event pictures crop to the landscape banner

Owner 11/15: every event with a person shows the event picture as a landscape BANNER at the top of the right column (person column on the
left). All 69 event pictures are vertical 768x1024 (img/EVENTS.json). The banner is about 2.3:1 (iPad right column ~450 x 190 px), so it
keeps ~32 % of the picture height; the crop window is placed by a per-picture focus point (`KIT_FOCUS[file]` in jk4 = CSS
object-position; default `50% 50%`).

Preview sheets: `dev/review/event-banners/s1.jpg` … `s9.jpg` — each picture: the whole picture, then the banner crop at focus 15 % | 50 % | 85 %.
Verdict below = the focus chosen from those sheets (also set in `KIT_FOCUS`). "crop OK" = the subject reads in the banner.

Needs new landscape art: 2 pictures (hoang-de-dem, cung-nhan), plus ONE event subject the owner named that has no picture of its own:
a consort mocking Ta at her door ("buông lời mỉa mai", visit events `Có người đến`) — today those visits show `ev-khach-den` (a tea table).
Đoan ngọ (dragon boats, `le-ha`) crops well at 50 %.

| # | category | event ids | picture | focus | verdict |
|---|---|---|---|---|---|
| 0 | `trieu-chinh` Triều chính | 4: `j55:tdPop`, `j7:minister`, `qs:yen`, `sys:mood-binh` | `img/ev-trieu-chinh.webp` 768x1024 | 50% 50% | crop OK |
| 1 | `trieu-chinh` Triều chính | 4: `j55:tdPop`, `j7:minister`, `qs:yen`, `sys:mood-binh` | `img/ev-trieu-chinh-2.webp` 768x1024 | 50% 15% | crop OK |
| 2 | `tham-quan` Án tham ô | 8: `arc:muoi_lau`, `arc:muoi_no`, `arc:thd_sach`, `arc:thd_tro`, `arc:tt_oan`, `e68:clanFather` … | `img/ev-tham-quan.webp` 768x1024 | 50% 50% | crop OK |
| 3 | `duoc-mua` Được mùa | 1: `qs:mua` | `img/ev-duoc-mua.webp` 768x1024 | 50% 50% | crop OK |
| 4 | `lu-lut` Lũ lụt | 4: `arc:muoi_doi`, `e68:famineDonate`, `j7:flood`, `qs:lut` | `img/ev-lu-lut.webp` 768x1024 | 50% 50% | crop OK |
| 5 | `han-han` Hạn hán, cầu mưa | 2: `e68:droughtPrayer`, `qs:han` | `img/ev-han-han.webp` 768x1024 | 50% 50% | crop OK |
| 6 | `bien-ai` Chiến sự biên ải | 7: `arc:dtq_bien`, `arc:dtq_binh`, `arc:dtq_huynh`, `e68:borderNews`, `news:nam-chieu`, `news:thua-tran` … | `img/ev-bien-ai.webp` 768x1024 | 50% 50% | crop OK |
| 7 | `bien-ai` Chiến sự biên ải | 7: `arc:dtq_bien`, `arc:dtq_binh`, `arc:dtq_huynh`, `e68:borderNews`, `news:nam-chieu`, `news:thua-tran` … | `img/ev-bien-ai-2.webp` 768x1024 | 50% 50% | crop OK |
| 8 | `thang-tran` Thắng trận | 2: `news:thang-tran`, `qs:giac-thang` | `img/ev-thang-tran.webp` 768x1024 | 50% 55% | crop OK |
| 9 | `su-than` Sứ thần, triều cống | 5: `arc:nc_su`, `arc:nc_vuong`, `arc:s_su`, `e68:envoyGift`, `qs:cong` | `img/ev-su-than.webp` 768x1024 | 50% 50% | crop OK |
| 10 | `su-than` Sứ thần, triều cống | 5: `arc:nc_su`, `arc:nc_vuong`, `arc:s_su`, `e68:envoyGift`, `qs:cong` | `img/ev-su-than-2.webp` 768x1024 | 50% 50% | crop OK |
| 11 | `hoa-than` Hòa thân | 2: `j7:foreignwed`, `news:hoa-than` | `img/ev-hoa-than.webp` 768x1024 | 50% 50% | crop OK |
| 12 | `hoang-de-vui` Hoàng thượng vui | 6: `e68:empAsksAbout`, `e68:empChess`, `e68:empDish`, `e68:empGiftOdd`, `e68:empPoem`, `sys:mood-vui` | `img/ev-hoang-de-vui.webp` 768x1024 | 50% 50% | crop OK |
| 13 | `hoang-de-vui` Hoàng thượng vui | 6: `e68:empAsksAbout`, `e68:empChess`, `e68:empDish`, `e68:empGiftOdd`, `e68:empPoem`, `sys:mood-vui` | `img/ev-hoang-de-vui-2.webp` 768x1024 | 50% 50% | crop OK |
| 14 | `hoang-de-gian` Hoàng thượng phiền muộn, giận | 5: `e68:empOldFlame`, `e68:empSulk`, `j7:jealousprince`, `sys:mood-gian`, `sys:mood-phien` | `img/ev-hoang-de-gian.webp` 768x1024 | 50% 15% | crop OK |
| 15 | `hoang-de-dem` Hoàng thượng ngự giá | 5: `arc:cnv_mat`, `e68:empSleepRead`, `j24:hoang-thuong-den`, `j7:empnight`, `sys:thi-tam` | `img/ev-hoang-de-dem.webp` 768x1024 | 50% 50% | NEEDS LANDSCAPE ART — the Emperor stands full height in the picture: every crop cuts him at the waist or the head |
| 16 | `vi-hanh` Vi hành, chơi đùa | 2: `e68:empIncognito`, `e68:empWager` | `img/ev-vi-hanh.webp` 768x1024 | 50% 50% | crop OK |
| 17 | `vi-hanh` Vi hành, chơi đùa | 2: `e68:empIncognito`, `e68:empWager` | `img/ev-vi-hanh-2.webp` 768x1024 | 50% 50% | crop OK |
| 18 | `di-san` Đi săn, Hội Phượng | 1: `fest:phoenix` | `img/ev-di-san.webp` 768x1024 | 50% 15% | crop OK |
| 19 | `quoc-tang` Quốc tang | 1: `sys:bang-ha` | `img/ev-quoc-tang.webp` 768x1024 | 50% 50% | crop OK |
| 20 | `le-xuan` Lễ hội mùa xuân | 3: `fest:newyear`, `fest:nguyentieu`, `fest:thanhminh` | `img/ev-le-xuan.webp` 768x1024 | 50% 50% | crop OK |
| 21 | `le-xuan` Lễ hội mùa xuân | 3: `fest:newyear`, `fest:nguyentieu`, `fest:thanhminh` | `img/ev-le-xuan-2.webp` 768x1024 | 50% 50% | crop OK |
| 22 | `le-ha` Tết Đoan ngọ | 2: `fest:doanngo`, `j7:doanngo` | `img/ev-le-ha.webp` 768x1024 | 50% 50% | crop OK |
| 23 | `le-thu` Lễ hội mùa thu | 6: `e68:autumnMoon`, `fest:thattich`, `fest:trungcuu`, `fest:trungthu`, `j7:trungcuu`, `j7:vulan` | `img/ev-le-thu.webp` 768x1024 | 50% 15% | crop OK |
| 24 | `le-thu` Lễ hội mùa thu | 6: `e68:autumnMoon`, `fest:thattich`, `fest:trungcuu`, `fest:trungthu`, `j7:trungcuu`, `j7:vulan` | `img/ev-le-thu-2.webp` 768x1024 | 50% 15% | crop OK |
| 25 | `le-thu` Lễ hội mùa thu | 6: `e68:autumnMoon`, `fest:thattich`, `fest:trungcuu`, `fest:trungthu`, `j7:trungcuu`, `j7:vulan` | `img/ev-le-thu-3.webp` 768x1024 | 50% 15% | crop OK |
| 26 | `le-dong` Lễ hội mùa đông | 3: `fest:dongchi`, `fest:giaothua`, `j7:dongchi` | `img/ev-le-dong.webp` 768x1024 | 50% 50% | crop OK |
| 27 | `le-dong` Lễ hội mùa đông | 3: `fest:dongchi`, `fest:giaothua`, `j7:dongchi` | `img/ev-le-dong-2.webp` 768x1024 | 50% 15% | crop OK |
| 28 | `te-le` Tế lễ, lễ Phật | 2: `e68:fortuneNun`, `e68:templeRite` | `img/ev-te-le.webp` 768x1024 | 50% 50% | crop OK |
| 29 | `yen-tiec` Yến tiệc, mừng thọ | 2: `j7:thbirthday`, `qs:hoi` | `img/ev-yen-tiec.webp` 768x1024 | 50% 50% | crop OK |
| 30 | `sinh-no` Sinh nở, có thai | 3: `sys:co-thai`, `sys:sinh-con`, `sys:sinh-npc` | `img/ev-sinh-no.webp` 768x1024 | 50% 50% | crop OK |
| 31 | `con-tre` Chuyện các con | 11: `e68:kidFight`, `e68:kidGift`, `e68:kidLie`, `e68:kidSick`, `e68:kidTutor`, `j54:h54met` … | `img/ev-con-tre.webp` 768x1024 | 50% 50% | crop OK |
| 32 | `con-tre` Chuyện các con | 11: `e68:kidFight`, `e68:kidGift`, `e68:kidLie`, `e68:kidSick`, `e68:kidTutor`, `j54:h54met` … | `img/ev-con-tre-2.webp` 768x1024 | 50% 50% | crop OK |
| 33 | `tang-le` Tang lễ, qua đời | 4: `sys:chet-con`, `sys:chet-npc`, `sys:qua-doi`, `sys:thai-hau-mat` | `img/ev-tang-le.webp` 768x1024 | 50% 50% | crop OK |
| 34 | `tan-phong` Tấn phong | 5: `e68:rumorEmpLove`, `sys:lap-hau`, `sys:lap-thai-tu`, `sys:tan-phong`, `sys:tranh-ghe` | `img/ev-tan-phong.webp` 768x1024 | 50% 50% | crop OK |
| 35 | `tuyen-tu` Tuyển tú | 3: `j3:tuyen`, `j7:newgirl`, `sys:tuyen-tu` | `img/ev-tuyen-tu.webp` 768x1024 | 50% 50% | crop OK |
| 36 | `thinh-an` Thỉnh an Thái hậu, Hoàng hậu | 4: `arc:nc_tuc`, `e68:hhSummons`, `e68:thMama`, `j24:thai-hau-trieu` | `img/ev-thinh-an.webp` 768x1024 | 50% 50% | crop OK |
| 37 | `khach-den` Có người đến chơi | 8: `e68:borrowDress`, `e68:eunRequest`, `e68:giftArrive`, `e68:gossipTea`, `e68:kindVisit`, `e68:newGirlAdvice` … | `img/ev-khach-den.webp` 768x1024 | 50% 50% | crop OK |
| 38 | `khach-den` Có người đến chơi | 8: `e68:borrowDress`, `e68:eunRequest`, `e68:giftArrive`, `e68:gossipTea`, `e68:kindVisit`, `e68:newGirlAdvice` … | `img/ev-khach-den-2.webp` 768x1024 | 50% 50% | crop OK |
| 39 | `tranh-sung` Tranh chấp hậu cung | 7: `arc:ch_ho`, `arc:cn_chu`, `arc:td_tha`, `e68:doubtVisit`, `e68:proudVisit`, `e68:silkAllot` … | `img/ev-tranh-sung.webp` 768x1024 | 50% 50% | crop OK |
| 40 | `cung-nhan` Chuyện kẻ hầu | 11: `arc:cnv_ma`, `arc:s_thay`, `e68:brokenHeirloom`, `e68:maidQuarrel`, `e68:servGamble`, `e68:servLeave` … | `img/ev-cung-nhan.webp` 768x1024 | 50% 50% | NEEDS LANDSCAPE ART — a walking maid fills the height: crops keep only her torso or a tiny head |
| 41 | `thu-nha` Thư nhà | 8: `arc:cn_than`, `arc:muoi_tuoc`, `arc:s_than`, `arc:td_song`, `arc:tt_co`, `arc:tt_tranh` … | `img/ev-thu-nha.webp` 768x1024 | 50% 50% | crop OK |
| 42 | `tai-nghe` Tài nghệ | 5: `arc:thd_hoc`, `arc:thd_tho`, `e68:embroidery`, `e68:musician`, `e68:painter` | `img/ev-tai-nghe.webp` 768x1024 | 50% 50% | crop OK |
| 43 | `thoi-tiet` Thời tiết, bốn mùa | 5: `e68:heatStroke`, `e68:leakRoof`, `e68:lotusSeason`, `e68:snowDay`, `e68:stormNight` | `img/ev-thoi-tiet.webp` 768x1024 | 50% 50% | crop OK |
| 44 | `thoi-tiet` Thời tiết, bốn mùa | 5: `e68:heatStroke`, `e68:leakRoof`, `e68:lotusSeason`, `e68:snowDay`, `e68:stormNight` | `img/ev-thoi-tiet-2.webp` 768x1024 | 50% 50% | crop OK |
| 45 | `thoi-tiet` Thời tiết, bốn mùa | 5: `e68:heatStroke`, `e68:leakRoof`, `e68:lotusSeason`, `e68:snowDay`, `e68:stormNight` | `img/ev-thoi-tiet-3.webp` 768x1024 | 50% 15% | crop OK |
| 46 | `dieu-troi` Điềm trời | 2: `e68:empDream`, `j7:comet` | `img/ev-dieu-troi.webp` 768x1024 | 50% 15% | crop OK |
| 47 | `dieu-lanh` Điềm lành | 2: `e68:flowerBloom`, `j7:phoenix` | `img/ev-dieu-lanh.webp` 768x1024 | 50% 15% | crop OK |
| 48 | `benh-tat` Ốm đau, thái y | 5: `arc:ch_benh`, `e68:docCheck`, `e68:springAllergy`, `j3:thbenh`, `sys:om` | `img/ev-benh-tat.webp` 768x1024 | 50% 50% | crop OK |
| 49 | `dich-benh` Dịch bệnh | 1: `arc:s_dich` | `img/ev-dich-benh.webp` 768x1024 | 50% 50% | crop OK |
| 50 | `hoa-hoan` Hỏa hoạn | 3: `arc:s_hoa`, `e68:servHero`, `j7:fire` | `img/ev-hoa-hoan.webp` 768x1024 | 50% 50% | crop OK |
| 51 | `tin-don` Tin đồn, bê bối | 7: `e68:rumorEvidence`, `e68:rumorFavor`, `e68:rumorPreg`, `e68:rumorTH`, `j3:loveletter`, `j7:guardrumour` … | `img/ev-tin-don.webp` 768x1024 | 50% 50% | crop OK |
| 52 | `tai-mat` Tai mắt, kẻ khả nghi | 7: `arc:ch_bi`, `arc:cnv_chu`, `arc:s_thu`, `e68:newServSus`, `e68:rumorSpy`, `e68:slyVisit` … | `img/ev-tai-mat.webp` 768x1024 | 50% 50% | crop OK |
| 53 | `chuyen-la` Chuyện lạ, ma quái | 7: `e68:hairpinThief`, `e68:lostItem`, `e68:nightSteps`, `e68:poisonedFish`, `j7:ghost`, `plot:pond` … | `img/ev-chuyen-la.webp` 768x1024 | 50% 50% | crop OK |
| 54 | `dau-doc` Đầu độc | 5: `e68:spoiledFood`, `j7:poisongift`, `j7:taster`, `plot:kpoison`, `plot:poison` | `img/ev-dau-doc.webp` 768x1024 | 50% 50% | crop OK |
| 55 | `vu-oan` Vu oan, bùa ngải | 12: `arc:cn_ban`, `arc:cnv_ban`, `arc:dtq_vu`, `arc:td_an`, `arc:td_ke`, `j7:doll` … | `img/ev-vu-oan.webp` 768x1024 | 50% 50% | crop OK |
| 56 | `hai-thai` Hại thai, xạ hương | 3: `j7:rvmusk`, `plot:catswap`, `plot:musk` | `img/ev-hai-thai.webp` 768x1024 | 50% 50% | crop OK |
| 57 | `hoi-lo` Hối lộ, uy hiếp | 7: `e68:bribedServ`, `e68:eunuchSqueeze`, `j7:doctorblack`, `j7:maidhostage`, `j7:rvbribe`, `plot:block` … | `img/ev-hoi-lo.webp` 768x1024 | 50% 50% | crop OK |
| 58 | `mat-uoc` Mật ước, liên thủ | 6: `arc:ch_co`, `arc:nc_gian`, `arc:s_ban`, `arc:tt_mat`, `e68:allyOffer`, `j7:pact` | `img/ev-mat-uoc.webp` 768x1024 | 50% 15% | crop OK |
| 59 | `hinh-phat` Trừng phạt | 4: `j7:caning`, `j7:condemnedmaid`, `plot:huydung`, `sys:giang-chuc` | `img/ev-hinh-phat.webp` 768x1024 | 50% 50% | crop OK |
| 60 | `lanh-cung` Lãnh cung | 4: `j3:coldletter`, `j7:coldvisit`, `lc:*`, `sys:lanh-cung` | `img/ev-lanh-cung.webp` 768x1024 | 50% 50% | crop OK |
| 61 | `lanh-cung` Lãnh cung | 4: `j3:coldletter`, `j7:coldvisit`, `lc:*`, `sys:lanh-cung` | `img/ev-lanh-cung-2.webp` 768x1024 | 50% 50% | crop OK |
| 62 | `lanh-cung` Lãnh cung | 4: `j3:coldletter`, `j7:coldvisit`, `lc:*`, `sys:lanh-cung` | `img/ev-lanh-cung-3.webp` 768x1024 | 50% 50% | crop OK |
| 63 | `dai-xa` Đại xá, ân điển | 2: `sys:an-xa`, `sys:dai-xa` | `img/ev-dai-xa.webp` 768x1024 | 50% 50% | crop OK |
| 64 | `hh-viec` Việc Hoàng hậu giao | 1: `hh:*` | `img/ev-hh-viec.webp` 768x1024 | 50% 50% | crop OK |
| 65 | `hh-viec` Việc Hoàng hậu giao | 1: `hh:*` | `img/ev-hh-viec-2.webp` 768x1024 | 50% 50% | crop OK |
| 66 | `cung-nu` Đời cung nữ | 2: `cnv:*`, `j42:*` | `img/ev-cung-nu.webp` 768x1024 | 50% 50% | crop OK |
| 67 | `cung-nu` Đời cung nữ | 2: `cnv:*`, `j42:*` | `img/ev-cung-nu-2.webp` 768x1024 | 50% 50% | crop OK |
| 68 | `tu-tinh` Tư tình, ánh mắt | 5: `arc:cn_tinh`, `arc:s_tinh`, `e68:servRomance`, `j22:affair`, `j24:mot-anh-mat` | `img/ev-tu-tinh.webp` 768x1024 | 50% 50% | crop OK |
