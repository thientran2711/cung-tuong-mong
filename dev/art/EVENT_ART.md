# Tranh sự kiện (event art)

Mọi sự kiện tuần, sự kiện triều chính và sự kiện Hoàng thượng đều có một tranh minh họa thật, cùng họ với tranh thẻ việc (img/act-*) và tranh khung thông tin (img/info-*).

## Tệp
- `img/ev-<nhóm>.webp`, `img/ev-<nhóm>-2.webp`, `-3`: 768x1024 (3:4), webp ≤ 250 KB. 69 tranh, 52 nhóm.
- `img/EVENTS.json`: `{default, categories:{nhóm:{title, files:[...]}}, events:{eventId:nhóm}}` (chỉ liệt kê tệp đã có).
- `dev/build/j89.js` (chỉ dữ liệu, không CSS/HTML): `evArtOf(eventId, salt)` → đường dẫn ảnh; `evArtCat(id)`, `evArtTitle(id)`.
  Tên `evArt()` cũ (ảnh phòng theo nơi chốn) giữ nguyên, nên hàm mới tên là `evArtOf`. `salt` (số biến thể, tuần…) chọn ổn định giữa các tranh của nhóm.
- Gắn tranh vào bảng tin / sổ tuần là việc của chủ kit (kit owner), dùng khung kit đã duyệt. Module này không vẽ gì lên giao diện.
- Xem trước từng tranh: `dev/shots/event-art/ev-<nhóm>.jpg`.

## Mã sự kiện (eventId)
| tiền tố | nguồn |
|---|---|
| `e68:<id>` | 72 mẫu EV6 của j68 (review/events f5b203a: j68e/f/g, 13 họ: day, visit, emp, sea, court, kid, serv, rumor, myst) |
| `j7:<id>` | 32 sự kiện `ev()` trong j7 (main) |
| `arc:<id>` | 44 tuyến truyện ARC67 trong j67 (review/stories) |
| `plot:<k>` | cách mưu hại của chuỗi j70 (review/intrigue): poison, musk, catswap, kpoison, pond, pushp, kframe, frame, plant, bribe, block, rumor, accuse, ksab, joint, huydung |
| `qs:<k>` | Quốc sự hằng tháng j55: mua, cong, hoi, yen, lut, han, tham, giac-thang, giac-thua |
| `news:<k>` | tin triều đình j55: thang-tran, thua-tran, nam-chieu, hoa-than |
| `fest:<k>` | lễ hội trong img/map-hotspots.json (newyear … giaothua) |
| `sys:<k>` | nhịp của máy: co-thai, sinh-con, qua-doi, bang-ha, tan-phong, lap-hau, giang-chuc, lanh-cung, tuyen-tu, dai-xa, thi-tam, om, mood-vui/binh/phien/gian … |
| `j3:` `j24:` `j54:` `j55:tdPop` `j22:affair` | các nguồn cũ: 6 thế khó cố định, lượt người đến (j24), chuyện công chúa, sớ triều, tư tình |
| `hh:*` `lc:*` `cnv:*` `j42:*` | chừa sẵn cho phần sắp có: nhiệm vụ Hoàng hậu, đời sống lãnh cung, chế độ cung nữ (cả tiền tố) |

Mã không có tiền tố được dò qua mọi tiền tố; mã lạ rơi về nhóm `default` (triều chính).

## Nhóm
| nhóm | tên | số tranh | tông | sự kiện |
|---|---|---|---|---|
| `trieu-chinh` | Triều chính | 2 | sáng | `j55:tdPop`, `j7:minister`, `qs:yen`, `sys:mood-binh` |
| `tham-quan` | Án tham ô | 1 | tối | `arc:muoi_lau`, `arc:muoi_no`, `arc:thd_sach`, `arc:thd_tro`, `arc:tt_oan`, `e68:clanFather`, `j3:embezzle`, `qs:tham` |
| `duoc-mua` | Được mùa | 1 | sáng | `qs:mua` |
| `lu-lut` | Lũ lụt | 1 | sáng | `arc:muoi_doi`, `e68:famineDonate`, `j7:flood`, `qs:lut` |
| `han-han` | Hạn hán, cầu mưa | 1 | sáng | `e68:droughtPrayer`, `qs:han` |
| `bien-ai` | Chiến sự biên ải | 2 | sáng | `arc:dtq_bien`, `arc:dtq_binh`, `arc:dtq_huynh`, `e68:borderNews`, `news:nam-chieu`, `news:thua-tran`, `qs:giac-thua` |
| `thang-tran` | Thắng trận | 1 | sáng | `news:thang-tran`, `qs:giac-thang` |
| `su-than` | Sứ thần, triều cống | 2 | sáng | `arc:nc_su`, `arc:nc_vuong`, `arc:s_su`, `e68:envoyGift`, `qs:cong` |
| `hoa-than` | Hòa thân | 1 | sáng | `j7:foreignwed`, `news:hoa-than` |
| `hoang-de-vui` | Hoàng thượng vui | 2 | sáng | `e68:empAsksAbout`, `e68:empChess`, `e68:empDish`, `e68:empGiftOdd`, `e68:empPoem`, `sys:mood-vui` |
| `hoang-de-gian` | Hoàng thượng phiền muộn, giận | 1 | tối | `e68:empOldFlame`, `e68:empSulk`, `j7:jealousprince`, `sys:mood-gian`, `sys:mood-phien` |
| `hoang-de-dem` | Hoàng thượng ngự giá | 1 | tối | `arc:cnv_mat`, `e68:empSleepRead`, `j24:hoang-thuong-den`, `j7:empnight`, `sys:thi-tam` |
| `vi-hanh` | Vi hành, chơi đùa | 2 | sáng | `e68:empIncognito`, `e68:empWager` |
| `di-san` | Đi săn, Hội Phượng | 1 | sáng | `fest:phoenix` |
| `quoc-tang` | Quốc tang | 1 | tối | `sys:bang-ha` |
| `le-xuan` | Lễ hội mùa xuân | 2 | sáng | `fest:newyear`, `fest:nguyentieu`, `fest:thanhminh` |
| `le-ha` | Tết Đoan ngọ | 1 | sáng | `fest:doanngo`, `j7:doanngo` |
| `le-thu` | Lễ hội mùa thu | 3 | sáng | `e68:autumnMoon`, `fest:thattich`, `fest:trungcuu`, `fest:trungthu`, `j7:trungcuu`, `j7:vulan` |
| `le-dong` | Lễ hội mùa đông | 2 | sáng | `fest:dongchi`, `fest:giaothua`, `j7:dongchi` |
| `te-le` | Tế lễ, lễ Phật | 1 | sáng | `e68:fortuneNun`, `e68:templeRite` |
| `yen-tiec` | Yến tiệc, mừng thọ | 1 | sáng | `j7:thbirthday`, `qs:hoi` |
| `sinh-no` | Sinh nở, có thai | 1 | sáng | `sys:co-thai`, `sys:sinh-con`, `sys:sinh-npc` |
| `con-tre` | Chuyện các con | 2 | sáng | `e68:kidFight`, `e68:kidGift`, `e68:kidLie`, `e68:kidSick`, `e68:kidTutor`, `j54:h54met`, `j54:h54sad`, `j54:h54show`, `j54:h54tut`, `j7:princefever`, `plot:ksab` |
| `tang-le` | Tang lễ, qua đời | 1 | tối | `sys:chet-con`, `sys:chet-npc`, `sys:qua-doi`, `sys:thai-hau-mat` |
| `tan-phong` | Tấn phong | 1 | sáng | `e68:rumorEmpLove`, `sys:lap-hau`, `sys:lap-thai-tu`, `sys:tan-phong`, `sys:tranh-ghe` |
| `tuyen-tu` | Tuyển tú | 1 | sáng | `j3:tuyen`, `j7:newgirl`, `sys:tuyen-tu` |
| `thinh-an` | Thỉnh an Thái hậu, Hoàng hậu | 1 | sáng | `arc:nc_tuc`, `e68:hhSummons`, `e68:thMama`, `j24:thai-hau-trieu` |
| `khach-den` | Có người đến chơi | 2 | sáng | `e68:borrowDress`, `e68:eunRequest`, `e68:giftArrive`, `e68:gossipTea`, `e68:kindVisit`, `e68:newGirlAdvice`, `e68:officialWife`, `j24:co-nguoi-den` |
| `tranh-sung` | Tranh chấp hậu cung | 1 | sáng | `arc:ch_ho`, `arc:cn_chu`, `arc:td_tha`, `e68:doubtVisit`, `e68:proudVisit`, `e68:silkAllot`, `j7:rvquarrel` |
| `cung-nhan` | Chuyện kẻ hầu | 1 | sáng | `arc:cnv_ma`, `arc:s_thay`, `e68:brokenHeirloom`, `e68:maidQuarrel`, `e68:servGamble`, `e68:servLeave`, `e68:sickServant`, `e68:strayCat`, `j24:ke-hau-xin`, `j24:viec-ke-hau`, `j3:vase` |
| `thu-nha` | Thư nhà | 1 | sáng | `arc:cn_than`, `arc:muoi_tuoc`, `arc:s_than`, `arc:td_song`, `arc:tt_co`, `arc:tt_tranh`, `e68:letterHome`, `j7:letterhome` |
| `tai-nghe` | Tài nghệ | 1 | sáng | `arc:thd_hoc`, `arc:thd_tho`, `e68:embroidery`, `e68:musician`, `e68:painter` |
| `thoi-tiet` | Thời tiết, bốn mùa | 3 | sáng | `e68:heatStroke`, `e68:leakRoof`, `e68:lotusSeason`, `e68:snowDay`, `e68:stormNight` |
| `dieu-troi` | Điềm trời | 1 | tối | `e68:empDream`, `j7:comet` |
| `dieu-lanh` | Điềm lành | 1 | sáng | `e68:flowerBloom`, `j7:phoenix` |
| `benh-tat` | Ốm đau, thái y | 1 | sáng | `arc:ch_benh`, `e68:docCheck`, `e68:springAllergy`, `j3:thbenh`, `sys:om` |
| `dich-benh` | Dịch bệnh | 1 | tối | `arc:s_dich` |
| `hoa-hoan` | Hỏa hoạn | 1 | tối | `arc:s_hoa`, `e68:servHero`, `j7:fire` |
| `tin-don` | Tin đồn, bê bối | 1 | tối | `e68:rumorEvidence`, `e68:rumorFavor`, `e68:rumorPreg`, `e68:rumorTH`, `j3:loveletter`, `j7:guardrumour`, `plot:rumor` |
| `tai-mat` | Tai mắt, kẻ khả nghi | 1 | tối | `arc:ch_bi`, `arc:cnv_chu`, `arc:s_thu`, `e68:newServSus`, `e68:rumorSpy`, `e68:slyVisit`, `j7:eunuch` |
| `chuyen-la` | Chuyện lạ, ma quái | 1 | tối | `e68:hairpinThief`, `e68:lostItem`, `e68:nightSteps`, `e68:poisonedFish`, `j7:ghost`, `plot:pond`, `plot:pushp` |
| `dau-doc` | Đầu độc | 1 | tối | `e68:spoiledFood`, `j7:poisongift`, `j7:taster`, `plot:kpoison`, `plot:poison` |
| `vu-oan` | Vu oan, bùa ngải | 1 | tối | `arc:cn_ban`, `arc:cnv_ban`, `arc:dtq_vu`, `arc:td_an`, `arc:td_ke`, `j7:doll`, `j7:rvframe`, `plot:accuse`, `plot:frame`, `plot:joint`, `plot:kframe`, `plot:plant` |
| `hai-thai` | Hại thai, xạ hương | 1 | tối | `j7:rvmusk`, `plot:catswap`, `plot:musk` |
| `hoi-lo` | Hối lộ, uy hiếp | 1 | tối | `e68:bribedServ`, `e68:eunuchSqueeze`, `j7:doctorblack`, `j7:maidhostage`, `j7:rvbribe`, `plot:block`, `plot:bribe` |
| `mat-uoc` | Mật ước, liên thủ | 1 | tối | `arc:ch_co`, `arc:nc_gian`, `arc:s_ban`, `arc:tt_mat`, `e68:allyOffer`, `j7:pact` |
| `hinh-phat` | Trừng phạt | 1 | tối | `j7:caning`, `j7:condemnedmaid`, `plot:huydung`, `sys:giang-chuc` |
| `lanh-cung` | Lãnh cung | 3 | tối | `j3:coldletter`, `j7:coldvisit`, `lc:*`, `sys:lanh-cung` |
| `dai-xa` | Đại xá, ân điển | 1 | sáng | `sys:an-xa`, `sys:dai-xa` |
| `hh-viec` | Việc Hoàng hậu giao | 2 | sáng | `hh:*` |
| `cung-nu` | Đời cung nữ | 2 | sáng | `cnv:*`, `j42:*` |
| `tu-tinh` | Tư tình, ánh mắt | 1 | tối | `arc:cn_tinh`, `arc:s_tinh`, `e68:servRomance`, `j22:affair`, `j24:mot-anh-mat` |

## Cách vẽ (để vẽ thêm cùng họ)
- Magnific, model `gpt-2-6`, 3:4, 1k (40 tín dụng/tranh), thư mục ba4aecfe-efce-47e2-b53f-30d292091886, đúng 1 style ref:
  sáng = cảnh Ngự hoa viên (cplQijT0eP), tối = tẩm cung đêm (iGq8UJy3uK), giống tranh thẻ việc.
- Khung lời: `dev/figwork/events/prompt.py <khóa>`. Không mặt người: người chỉ ở xa, bóng dáng hoặc sau lưng; nhóm mưu hại/tang/lãnh cung theo khuôn tối (70% khung hình trong bóng, một nguồn sáng).
- Thêm nhóm hay biến thể: sửa `ev_data.py` (cat/m), vẽ, ghi `khóa id` vào `gens.txt`, chạy `fetch.py <khóa>` rồi `make_json.py`.

## Mệnh truyện (j67): img/st-<tuyến>-<khóa>.webp
- Khóa: `s1 s2 c1 c2 c3 t1 x1` (các hồi), `bia` (bìa tuyến), `ket-<kết>` (win, win2, mid, lose…), `ket` (khép lại, khi tuyến chỉ có 3 kết). Tên tuyến đổi `_` thành `-` (tt_co -> st-tt-co-s1.webp).
- `EVENTS.json` thêm `stories:{arcId:{title,o,fb,efb,files:{khóa:đường dẫn}}}`; `j89.js` thêm `stArtOf(arcId, beat, ending)`: hồi chung "G.x" dùng tranh ev-*; thiếu tệp thì lùi về bìa tuyến, rồi về nhóm ev-* (fb theo thân phận, efb theo kết tốt/xấu).
- Mỗi thân phận có mô-típ riêng trong lời vẽ (dev/figwork/stories/st_prompt.py, MOT): Tể tướng (thư từ chàm-vàng), Đại tướng quân (giáp, cờ, hổ phù), buôn muối (bao muối, thuyền, bạc), cung nữ thăng phi tần, công chúa Nam Chiếu (trang sức bạc, lông công), con nhà tội thần (hồ sơ án, dải tang), cháu Thái hậu (Đức Thọ cung, phượng, chuỗi hạt), con nhà thư hương nghèo (sách, thơ, mai), cung nữ hầu chủ.
- Vẽ bằng lưới 2x2 (4 tranh/lượt, 2k, 65 tín dụng), cắt tự động bằng st_fetch.py; xem dev/art/PROGRESS_event.md để biết tuyến nào đã xong.
