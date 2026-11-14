# KIỂM LẠI ĐỘC LẬP sổ vị trí j95 (review/schedules2 @ 7517021)

Người kiểm lại (không viết code này), 2026-11-14. Không sửa code game. Bản dựng: `python3 dev/build/assemble.py` trên 7517021, phục vụ
`(printf '<meta charset=utf-8>'; cat dev/index.html) > t.html` + `img/`. Máy tải nặng (load 15–35 trên 4 nhân) nên quy mô nhỏ hơn bản của thợ.

**Kết luận: FAIL (nhỏ).** Cả 6 lỗi chính của kiểm độc lập trước đã sửa thật, mọi bộ kiểm sạch, 3 thay đổi bộ kiểm là chính đáng.
Nhưng tìm thêm **1 lỗi mới**: nam nhân chưa có trong sổ buổi này được ghi vào cả các khắc ĐÃ QUA (cùng loại lỗi 4 "ghi lùi").
Sửa xong mục N1 thì coi là PASS.

## 1. Bộ kiểm độc lập (dev/test/indep/) chạy lại

| | đời | đủ 2 năm | lần kiểm | lưu/nạp (giữa thẻ / giữa minigame) | lỗi A–H, P, S | J95.errs | lỗi trang |
|---|---|---|---|---|---|---|---|
| bot khôn (inpage6), 2 shard × 6 | 12 | 12 | 14 705 | 1 324 (758 / 225) | **0** | 0 | 0 |
| bot ngẫu nhiên, 2 shard × 5 | 10 | 0 (chết sớm, như mọi lần đo) | 3 780 | 450 (272 / 61) | **0** | 0 | 0 |
| **tổng** | **22** | 12 | **18 485** | **1 774** | **0** | 0 | 0 |

Đủ 9 xuất thân (tt, dtq, muoi, cn, nc, td, ch, thd, cnv). Cổng động cơ trong bot: 1 595 hành động thù địch chạy, 12 lần thiện cảm ≥40, cả 12 có
lý do ngoại lệ (H = 0). Ghi lùi lúc chuyển buổi: 953 việc, 0 trái mắt thấy.

| script | kết quả | |
|---|---|---|
| `ia_dom.js` 755x1000@2, 20 thời điểm | lệch bản đồ 0, lệch sân khấu 0, 5 lần tải lại trang, lệch sau tải lại 0, tràn ngang 0, lỗi trang 0; 0 thời điểm bị bỏ qua | PASS |
| `ia_dom.js` 1180x820@2, 20 thời điểm | lệch bản đồ 0, lệch sân khấu 0, 1 lần tải lại, lệch sau tải lại 0, tràn ngang 0, lỗi trang 0 (lần chạy đầu đứt vì `page.screenshot` quá giờ do máy tải nặng, chạy lại) | PASS |
| `ia_scen.js` (10 tình huống) | mọi `__IA.check` 0; lỗi trang 0 | PASS |
| `ia_start_stale.js` | 36 đời, 0 sai cung, 0 dòng ở mã không có ô | PASS |
| `ia_home_visit.js` | 4/4 khách còn trên sân khấu sau lưu + tải lại | PASS |
| `ia_rostertool.js` cn 6 tuần | mã Chép sổ thật 36 457 ký tự: 42/42 dòng hiện tại khớp, 32 khắc đã qua, 0 lệch | PASS |

## 2. Sáu lỗi gốc, kiểm lại có mục tiêu

| lỗi | kiểm | kết quả |
|---|---|---|
| 1 giá họa ngoài cổng / ngoài sổ | `ia_scen` mục 10 (runAct thiện cảm 80: chặn, 1 dòng sổ); gọi thẳng `wdFrame(v, ngươi)` như jwd92b mỗi tháng với thiện cảm 90: không chạy, dòng sổ "thiện cảm 90 với ngươi"; `wdFrame(v, phi khác)` động cơ yếu: chặn, có dòng; `P95B.wdframe` có mặt | **PASS** |
| 2 đổi cung mà sổ không theo | `ia_start_stale` 0/36; `ia_scen` chủ cung bị phế giữa buổi → người thiên điện có nhà mới, dòng hợp lệ; `rc_adv` mục 3 (3 xuất thân): người ở nhờ được thăng giữa tuần → dòng sang cung mới (r3→r7, r2→r7), cung nữ/kẻ hầu không ở lại cung cũ, `countAt` = sổ | **PASS** |
| 3 cung nữ bị bỏ lại | `rc_adv` mục 5: chủ đổi dòng giữa buổi sang cung ngươi → cung nữ "theo hầu" cùng nơi; bot D = 0 | **PASS** |
| 4 ghi lùi trái mắt thấy, viết lại R.m | bot: 953 việc chuyển buổi, 0 trái mắt thấy; `ia_rostertool` 32 khắc đã qua khớp bản chụp. (Nhưng xem N1: một đường ghi lùi khác còn sót) | **PASS** (đường j95bPutPast) |
| 5 khách ở cung ngươi mất sau tải lại | `ia_home_visit` 4/4; `ia_dom` lệch sau tải lại 0 | **PASS** |
| 6 lãnh cung vẽ người bịa | `ia_scen` mục 5: không phế phi nào → sân khấu trống, sổ chỉ có ngươi + cung nữ (cung nữ theo hầu không vẽ, như ở mọi nơi khác) | **PASS** |

## 3. Ba thay đổi bộ kiểm của thợ

| thay đổi | xét | kết luận |
|---|---|---|
| Nhận người trên sân khấu theo `data-p` khi thẻ không có nhãn tên / "???" | Sân khấu j59 thật không có nhãn tên; `data-p` là chỉ số vào `S.visit.people`, vẫn so với sổ. Yếu hơn một chút (tên lấy từ trạng thái, không từ chữ trên màn hình) nhưng không che lỗi sổ | Chính đáng |
| Không lưu/nạp giữa `goTo` | Đọc code: trong `goTo` (j2.js:100) giữa `spend(tc)` và `S.place=k` không có `render`/`save` (các wrapper spend j24, j76, j95 đều không lưu). Tôi chạy lại bot CÓ lưu giữa goTo (50%): 8 lỗi S, tất cả đúng dạng "ngươi home→vuon" (lưu lúc nửa đường) — trạng thái game không bao giờ lưu | Chính đáng |
| `tgk` Tân Giả khố là nơi thật | j42.js:62–98, 186, 222: nơi phạt có thật của xuất thân cung nữ, có `placeOf`/`srvVisitOf` | Chính đáng |
| (thứ tư, không ghi trong ghi chú) `ia_dom` bỏ qua thời điểm không có `.mapw` | Đếm: 0/20 thời điểm bị bỏ qua ở 755x1000 | Không che gì trong lần chạy này |

## 4. Kiểm đối kháng mới (`dev/test/indep/rc_adv.js`)

| mục | kiểm | kết quả |
|---|---|---|
| a | Phi tần đang ra ngoài cùng cung nữ thì chết giữa buổi (3 xuất thân): nàng và cung nữ rời sổ, không ai "hầu" người chết, `__IA.check` 0 | PASS |
| b | Ngươi vào lãnh cung 3 buổi rồi được tha (`restore`) giữa buổi, rồi tải lại: dòng ngươi = S.place, không cung nữ/kẻ hầu kẹt ở lãnh cung, sau tải lại sạch | PASS |
| c | Thăng phẩm giữa tuần có đổi cung (3 xuất thân) | PASS |
| d | Truyện tình j96 `rosterWhere` | **FAIL → N1** |
| e | Cung nữ theo chủ khi chủ đổi chỗ giữa buổi | PASS |
| f | Ngày lễ (Thanh minh): 4 khắc, `countAt` mọi nơi = sổ, `__IA.check` 0 | PASS |
| g | Cổng động cơ vét cạn: 3 xuất thân × 4 phi tần × 34 loại ACT, thiện cảm ≥80, không oán, không ghen: **0** hành động hại chạy mà không có ngoại lệ ghi; 0 loại ACT thù địch mà cổng không biết | PASS |
| h | Tai mắt báo thói quen ("X hay … ở … buổi …") rồi theo dõi 12 buổi cùng loại: 7/8 báo cáo đúng nơi 4–9/12 lần; 1 lần 0/12 (thói quen đổi theo thời gian, đúng thiết kế "drift"). Thăm dò thêm 68 thói quen: 0 nơi bị cấm vào; 12 cặp (nơi+việc) không thấy trong 8 lần, phần lớn vì ở cùng nơi sổ ghi việc của thói quen nặng hơn | PASS (ghi chú) |
| i | Bản đồ thật (DOM) ngay sau một lần thăng phẩm đổi cung + một cái chết: số bóng = sổ ở mọi ô | PASS |

Trong bot không thấy phi tần thiện cảm ≥80 ngầm hại ngươi; cổng đặt ngưỡng chặt hơn quyết định (≥40).

## 5. Lỗi mới

### N1 (trung bình-thấp): nam nhân vào sổ giữa buổi bị ghi vào cả các khắc đã qua
- `j95c.js:96` `rosterWhere(m)` (j96 hỏi chỗ của người tình qua `loc96`) và `j95b.js:142` `j95bPut` (câu chữ nhắc một nam nhân chưa có trong sổ):
  `R.P[id]=[0,1,2,3].map(()=>[k,…,"lặng lẽ đến"])` — ghi cả khắc < khắc hiện tại.
- Nam nhân không ở cung (vương gia, nhạc sư, họa sư, sứ thần, và người tình j96 `m96` hàn lâm học sĩ) chỉ có dòng khi có mặt (j95.js:101, 381), nên chuyện này
  xảy ra trong chơi thật mỗi khi truyện tình / câu chữ gọi tới hắn ở một buổi hắn vắng.
- Tái hiện: đời tt, buổi mới, ngươi đi Ngự hoa viên (khắc 2: sổ ở vườn không có Họa sư Tống Hàn Phong), qua 1 khắc, về cung; `rosterWhere(m5)` → sổ ghi
  hắn "lặng lẽ đến" ở vườn ở khắc 0, 1, 2 — đúng lúc ngươi đứng ở vườn mà không thấy ai. `R.m` (số đã hiện trên bản đồ) không bị viết lại, nên
  `roster.js` / "Chép sổ" sẽ trả lời "hắn ở vườn" cho một khắc ngươi tận mắt thấy hắn không ở đó.
- Sửa gợi ý: chỉ ghi khắc ≥ khắc hiện tại; các khắc trước để một mã "ngoài cung" (không đếm trên bản đồ) hoặc cho phép dòng chưa có mặt.
  Thêm kiểm: sau mỗi lần thêm dòng giữa buổi, các khắc < hiện tại của dòng mới không được ở chỗ người chơi đã đứng.

## 6. Lệnh chạy lại
```
U=http://127.0.0.1:8987/t.html
for x in "sens 1 6" "sens 6 6" "rand 3 5" "rand 8 5"; do set -- $x; CAP=5400 node dev/test/indep/ia_bot.js $1 $3 bot-$1-$2.json $2 $U & done; wait
node dev/test/indep/ia_dom.js $U dom-755 755x1000@2 20; node dev/test/indep/ia_dom.js $U dom-1180 1180x820@2 20
node dev/test/indep/ia_scen.js $U scen.json; node dev/test/indep/ia_start_stale.js $U; node dev/test/indep/ia_home_visit.js $U
node dev/test/indep/ia_rostertool.js $U $PWD rt cn 6; node dev/test/indep/rc_adv.js $U adv.json
```
