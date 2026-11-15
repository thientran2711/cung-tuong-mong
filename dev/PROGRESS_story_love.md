# PROGRESS — review/story-love (tuyến tình «Thanh mai trúc mã», j96)

Nhánh: `review/story-love` từ `origin/review/balance` (619e35b). Không gộp main. Chờ kiểm duyệt.

## Đã làm
- `dev/build/j96.js` (mới, nạp sau jbal2, trước j84). Không sửa j67/j22: chỉ đăng ký `ARC67.tm96a/b/c` và bọc hàm.
- Mạch tình cả đời = **3 chương trong chính tuyến** (theo chỉnh của sếp): 
  - `tm96a` Ngày từ biệt (đầu đời, 6 hồi): tiến cung và từ biệt (hồi ức), gặp lại, tín vật trở lại, thư không ký tên, người hầu đã biết, đêm rằm định lòng.
  - `tm96b` Lửa thử vàng (giữa đời, 6 hồi): hồi mở theo kết chương trước (bị nắm thóp / chàng thăng chức / ánh mắt từ xa), chàng liều mình (chỉ khi tình của chàng ≥ 50, nếu không thì «chàng chọn tiền đồ»), kẻ thù để ý (phi tần có động cơ thật) hoặc thái giám đánh hơi, tang vật/giá họa, Hoàng thượng thử lòng, phiên tra hỏi.
  - `tm96c` Lựa chọn cuối (cuối đời, 6 hồi): hồi mở theo kết chương giữa (mắt ở khắp nơi / người bị giáng / người được trọng dụng), hôn sự của chàng, “Theo ta đi” (tình ≥ 80) hoặc xin một lời dứt khoát, đòn cuối của kẻ thù hoặc sóng ngầm trong triều, chuẩn bị, lựa chọn cuối.
  - Tổng 18 hồi. Kế hoạch chương: `nhap, sung, tm96a, o, o, tm96b, o, o, fin, tm96c, s, st_the, st_con, st_dong, hau, ke` (bỏ 2 chương chung để đời còn ~15 chương).
- Kết chương: A `a_hen` Lời hẹn còn nguyên / `a_dut` Dứt tình, giữ mình / `a_lo` Có kẻ nắm được thóp. B `b_tin` Qua được lửa thử / `b_ton` Chàng gánh tội thay / `b_nghi` Hoàng thượng sinh nghi. C (kết cục đã giao): `c_ally` đồng minh trên triều (chàng thăng chức thật), `c_wed` tác thành (chàng cưới người khác), `c_dead` chàng chết vì nàng, `c_lo` tư thông bại lộ (j22 `affairExposed`: chàng bị xử trảm, nàng 50% bị ban chết / 50% lãnh cung), `c_bimat` một đêm rồi thôi (fade-to-black, qua `tryst` j22: có thể có thai lệch sổ Kính sự phòng), `c_lang` lỡ làng (bỏ mặc quá hạn), hiếm `c_tron` giả chết rời cung (kết thúc kiếp bằng `over`).
- Kết hiếm cần cùng lúc: lòng nàng ≥ 80, tình chàng ≥ 80, có người hầu canh cửa (Lòng ≥ 70 và Chủ tin ≥ 60, theo jtin), không có thai, Hoàng thượng nghi < 40, không ở lãnh cung, đã có thuốc giả chết (hồi «Chuẩn bị»: Bạc -150, thái y tội thần -60; cơ may theo Y thuật), rồi vẫn phải qua một lần đổ cơ may khó.
- Người ấy = nam nhân THẬT `S.men` id `m96`, `tm96:<xuất thân>`: tên riêng, tuổi gần nàng, nét tính cách j22, `m.tinh` (chàng với nàng) và `S.tm96.h` (nàng với chàng), thư/tín vật vào `m.letters`/`S.aff` (tang vật j22), lui tới nơi hợp vai (S.menW j22; nếu có j95 `rosterWhere` thì đọc từ đó). Hồi nào nhắc nơi gặp thì lấy đúng nơi trong bản ghi; nếu buổi ấy chàng chưa có chỗ, chàng đến nơi lui tới đầu tiên và bản ghi được ghi lại.
- Mặt: hình nam có sẵn, ưu tiên theo vai (Hàn lâm o3, Thống lĩnh thive-2, Thị lang o6, Trạng nguyên o2, Vương gia vuonggia-1, Thái y thaiy-1, Phó sứ suthan-2), không trùng người khác (figUsed); khung kit theo vai thật (official/guard/royal/physician/man). Đã soát bảng tiếp xúc: không ai mặc hồng hay tím.
- Hai chiều: lựa chọn của nàng đổi tình chàng; tình chàng quyết định hồi nào mở (chàng chỉ liều khi đủ thương, chỉ rủ trốn khi ≥ 80); mỗi tháng: nàng lạnh thì tình chàng nguội dần, chàng «tham vọng» nguội nhanh hơn, chàng si mê (≥72) tự gửi thư (tin thật, thêm tang vật).
- Cổng động cơ: dùng `motiveGate`/`motiveOk` của j95 nếu có; chưa có thì phi tần chỉ tố/tống tiền khi có lý do thật (thiện cảm < 0, ghen ≥ 55 hoặc oán ≥ 15); không ai đủ lý do thì hồi đổi sang thái giám tống tiền vì bạc.
- Lựa chọn chỉ hiện chi phí (Tốn), không hiện được/mất, không chữ cơ may. Thẻ kết quả ghi đủ số. Hạn chót và phần thưởng dùng cơ chế j67 (thưởng A: bể «love», B: «emp», C: «family»).
- Cờ: `window.TM96_ON` (mặc định bật); trọng số `TM96_W` tt .55, dtq .55, muoi .55, thd .65, ch .5, td .6, nc .55 (giảm còn 60% nếu kiếp trước vừa có); `localStorage["ctm-tm96"]="1"` luôn có, `"0"` tắt. cn và cnv không có (cn đã có `cn_tinh`, cnv là cung nữ).
- Móc thử: `__tm96.jump("tm96a|b|c")` nhảy kế hoạch chương (không có giao diện).

## Đã thử
- Ép trạng thái (dev script trong scratchpad, `t2.js` + `drive.js`): đi hết 18 hồi cho mọi kết cục: ally (tt), dead (dtq), wed (muoi), bimat (thd), lo (ch), tron (td, nc), ton (td), lang (nc, quá hạn). Mọi kết chương A/B đều đã ra. 0 lỗi trang.
- Playwright 755x1000@2, 1180x820@2, 390x844@3: thẻ chương, hồi (chỉ Tốn), lựa chọn cuối, thẻ kết quả, tab Mệnh: không lỗi, không tràn ngang.
- Save cũ (bản balance) nạp được ở bản mới (uismoke).
- Tần suất và chạy tự nhiên: xem phần Kết quả đo bên dưới.

## Kết quả đo
- Tần suất (60 kiếp mỗi xuất thân, cờ mặc định, `dev`): tt 24, dtq 34, muoi 33, thd 43, ch 23, td 35, nc 35 / 60 (≈ 40–70 %); cn 0, cnv 0.
- Ép trạng thái 9 kịch bản (`dev/test/love96/t2.js`): ra đủ 7 kết cuối + 6 kết chương; 0 lỗi trang.
- Có j97 (gộp thử j97 của review/story-rare đứng trước j96): kết hiếm ghi vào sổ `ctm-rare97` (`tm96c`), lựa chọn mang ✦ và «(Cơ duyên hiếm)», viền kit `.ksel` của j97; sổ đếm 48 kết hiếm. Không có j97 thì vẫn chạy (kiểm `window.RARE97`).
- Chạy tự nhiên (bot chọn ngẫu nhiên, qua buổi bằng nextBuoi, thd): lời dặn hạn chót/thẻ «Mệnh truyện» đúng, bỏ dở thì quá hạn khép ở «Có kẻ nắm được thóp (bỏ dở)»; chàng ở đúng nơi trong bản ghi (S.menW = thu); 0 lỗi.
- Save cũ (bản balance, xuất thân tt, đã qua vài buổi) nạp ở bản mới: giữ nguyên kế hoạch chương cũ, không có S.tm96, chơi tiếp 6 buổi không lỗi.

## Khi gộp
- Thứ tự assemble: `..., jbal2, j96, j84`. Nếu gộp cùng review/story-rare: đặt j96 SAU j97 (j96 tự kiểm RARE97, thứ tự nào cũng chạy, nhưng sau j97 thì sổ đếm có tuyến này ngay từ đầu).
- Nếu j95 (bản ghi vị trí) về sau có `rosterWhere(m)` và `motiveGate(v,S,act)`, j96 tự dùng.
