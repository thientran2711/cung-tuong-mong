# PROGRESS review/ev-art-fit (worker, session 8)
Owner 15/11: "Mệt ghê á. Mấy cái ảnh minh họa không liên quan gì cả." (VIỆC "Lời cảnh báo" showed the gift box "Có người đến chơi")
+ "Hình minh họa đâu? Khung sự kiện đâu?" (BÁO "Hảo hữu vào cung" had no picture) + ruling: one picture per MEANING GROUP, shared.

## Done
- jk4 kitEvArt: removed the "who is on the stage" default (visitor → j24:co-nguoi-den gift box, Emperor → ngự giá, Thái hậu → thỉnh an),
  in both branches. jk2b kitNewsArtId: no "people visiting" default (→ cat:tin-cung). jtsb: 4 events no longer show the ROOM (tsbPlaceArt)
  but their group (Điềm lạ → chuyen-la, Bị ép/uy hiếp đòi của → hoi-lo, Lần đầu gặp mặt → tham-hoi, Đèn nến → hoa-hoan).
- NEW dev/build/jevfit.js (before jk4 in assemble.py): KIT_EVFIT meaning rules (title + first two sentences) → group = EVENTS.json category
  ("cat:<group>", j89 evArtCat) or a picture; kitEvFitWant: BÁO/TIN/KẾT QUẢ/VIỆC/BAN THƯỞNG/MẬT BÁO/CẢNH GIÁC/CHỨNG CỨ panels get a picture
  (jk2b showModal). KIT_EVFIT_OVER: warnings beat the shared j70thr banner (jevban). KIT §28.10c documents it; KIT_EVCAT frames for new groups.
- Bug found by the scan: KBK title match read "Phụ/Chính tuyến" as "yến" (feast) → every quest without own art showed "Yến tiệc". Fixed (prefix stripped).
- Art (gpt-2-6, folder ba4aecfe…, style ref ev-tai-mat / ev-cung-nu, looked at every one, hands checked), on the CDN:
  ev-mat-bao (maid whispers a warning behind a screen; 1024x690 so heads stay in the 2.3:1 band), ev-am-muu (consort hands a packet + silver
  to a kneeling eunuch), ev-bac-tien (silver ingots, purse, ledger, abacus), ev-canh-phong (eunuch with lantern guards the barred gate),
  ev-hao-huu (two friends hand in hand through a moon gate; co-op), ev-nguy-gia (consort pulls the Emperor from a falling beam). 94–197 KB each.
- EVENTS.json (CDN): new categories mat-bao, am-muu, bac-tien, canh-phong, hao-huu, nguy-gia, tham-hoi (ev-khach-den), qua-tang
  (ev-khach-den-2), tin-cung (ev-news-tin-trong-cung); khach-den now only the tea-visit picture (the gift box left it); e68 giftArrive →
  qua-tang, gossipTea/kindVisit/newGirlAdvice/officialWife/borrowDress → tham-hoi.
- Tests: dev/test/ev-art-fit.js (every builder + bot lives; before/after JSON), dev/test/ev-art-fit-shots.js (owner cases, 3 sizes).

## Not touched (owners)
night pictures (review/night-end-r1: ksp/night1/night2/prep keep theirs; Kính sự phòng notices use the existing ngự giá group),
option cards (review/opt-pics), act collisions (review/pic-dupes), Nhập cung (review/newgame-ui), week book lines (owner rule).

## Before / after (dev/test/ev-art-fit.js: every dialog builder + 2 bot seeds × 6 steps; dialog showings)
| | before (main f012058f3) | after |
|---|---|---|
| shows a picture | 400 | 2255 |
| no picture (BÁO/TIN/KẾT QUẢ/VIỆC with rows only) | 1464 | 24 (look-ups, pick lists, Nhập cung, early race before EVENTS.json) |
| gift box "Có người đến chơi" on a non-gift dialog | 41 | 0 (gift box = only gifts / rewards now, caption "Quà tặng, ban thưởng") |
| room picture as event picture | 3 | 0 |
| §59 placeholder | 7 | 7 → rules added for the last ones (Hung tin, sớ, làm lọt, Xét phẩm) |

| event / dialog | before | after |
|---|---|---|
| VIỆC Lời cảnh báo (maid tip-off; owner screenshot) | Có người đến chơi (gift box) / j70thr court audience | Mật báo, lời cảnh báo (new ev-mat-bao) |
| MẬT BÁO Tai mắt báo tin | portrait only / court audience | Mật báo, lời cảnh báo |
| Có người đến · mỉa mai | gift box | Tranh chấp hậu cung |
| Có người đến · xin lỗi / kể chuyện | gift box | Sang chơi, hàn huyên (tea table) |
| Có người đến · mượn bạc / kết chị em / tặng | gift box | Bạc tiền (new) / Mật ước / Quà tặng |
| Mưu hại / Sau vụ mưu hại / Thời cơ ra tay | gift box | Đầu độc / Hại thai / Vu oan / Âm mưu (new) by the kind of harm |
| Phòng bị | gift box | Canh phòng cung (new) |
| BÁO Hảo hữu vào cung / tìm đến / nhận lời / từ chối (co-op) | no picture | Hảo hữu trong cung (new) |
| Biến cố / Hảo hữu ra tay · Tuần mới (co-op) | no picture | Âm mưu · Tin trong cung |
| Bổng lộc tháng N | placeholder / Lãnh cung / Trừng phạt / Chuyện kẻ hầu (random) | Bạc tiền, bổng lộc |
| Phụ tuyến · * without own art | Yến tiệc ("tuyến" read as "yến") | by meaning (bạc, Hoàng hậu, sớ, tai mắt…) |
| Lời nhận xét / … chê dung nhan | Thỉnh an / gift box | toilette pictures by speaker × praise/blame |
| Ban cung, Lễ tấn phong, Xét phẩm | ngự giá / Đại xá | Tấn phong |
| Quốc tang | Hoàng thượng ngự giá | Quốc tang |
| Lập công · Lễ Thân tằm / Chép kinh / Cứu giá / Tiến cử … | Thỉnh an / none | Tế lễ / Tế lễ / Cứu giá (new) / Triều chính … |
| Thánh thượng / Thái hậu ban thưởng, Ngự tứ | portrait / Đại xá / Có người đến | Quà tặng, ban thưởng |
| Hội phối đồ (· đề / · báo đề) | Điềm lành / Yến tiệc | toilette crowd / Việc Hoàng hậu giao |
| Điềm lạ, Bị ép nộp của, Lần đầu gặp mặt, Đèn nến (jtsb) | the room she stands in | Chuyện lạ / Hối lộ, uy hiếp / Sang chơi / Hỏa hoạn |
| pet events (ban thú, thu săn, biếng ăn) | the room she stands in | Quà tặng / Đi săn / Chăm thú nuôi |
| Tin trong cung (no line matches) | Có người đến chơi | Tin trong cung |
| Sắp tới: Yến tiệc đầu xuân / Thi tài Thất tịch | gift box / none | Tết Nguyên đán / Thất tịch |
| Ra ngoài khi mặc trung y? (1208 showings) | placeholder | Y phục chưa chỉnh tề (toilette) |

Shots (dev/test/ev-art-fit-shots.js, 755x1000 · 1180x820 · 844x390): Lời cảnh báo, Có người đến (mỉa mai), Hảo hữu vào cung —
right picture + caption at all three, no horizontal scroll. dev/test/dialog-art.js: no Triều chính stand-in.
