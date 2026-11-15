# PROGRESS review/close-bugs — owner bugs 15/11 16:40Z–17:24Z (each fixed as a WHOLE CLASS)

Base: origin/main 70c792d41. Code: `dev/build/jclose.js` (new, in assemble.py after jaudit, before j84) + small edits in j71 (festival
titles), j6/j77/jcoopworld/jcooplobby/jtime4/p1.html (button names, SAME lines as review/kit-close so the two merge cleanly),
dev/site/swreg.js (line() → kitLine). Kit: KIT.md §42 (was §40; renumbered by reviewer r6 — main has §39 kitSeal, §40 APP ICON, §41 kitMeMark) (+ 28.6 "no Tốn row when free").

## Đã có ở nhánh khác trước khi làm (LUẬT ƯU TIÊN SỐ 1)
- "Qua ngày" → "Sang ngày mới": ĐÃ SỬA trên review/kit-close (f3a17f9f9 / 74d032f7d, chờ duyệt, chưa lên main). Ở đây áp ĐÚNG các dòng đó
  (gộp sạch với kit-close). Không nhánh review/* nào có: bái kiến từ trong cung, thời tiết theo buổi, tap-highlight, kitLine, một dòng Sức,
  tên hội thi, bỏ "Tốn: không" (review/opt-render CỐ Ý giữ "Tốn: không" — xem Ghi chú gộp).

## Bảng trước / sau (script rà ở dev/test/)
| # | Lỗi (cả nhóm) | Script | Trước | Sau |
|---|---|---|---|---|
| 1 | Bái kiến: mọi nơi × 4 buổi × khắc còn 1–4, cả lúc ĐÃ Ở TRONG cung chủ vị cao hơn chưa chào; cách vào bị ẩn mà thẻ không nói lý do | cb-gate.fn.js | 104 / 363 ô thiếu | 0 / 365 |
| 1b | Mưa/tuyết làm đi xa tốn 3 khắc (trái luật sếp 06:40Z) | travel() | 3 khắc | 2 khắc mọi thời tiết |
| 2 | Thời tiết × buổi × mùa (16 loại × 4 buổi = 64 ô): chữ không hợp buổi | cb-wx.fn.js | 12 ô sai (nắng gắt tối, đom đóm sáng/trưa/chiều, trăng rằm ban ngày, sương sớm trưa/chiều/tối, ve kêu tối, nắng vàng tối) | 0 |
| 3 | Chạm hình/ảnh hiện ô chữ nhật xanh (tap highlight rgba(51,181,229,.4)) | cb-tap.fn.js | 277 / 277 phần tử có ảnh chạm được | 0 / 292 |
| 4a | Tên nút thời gian cũ người chơi thấy (Qua ngày/Qua buổi/Qua đêm/Đợi sáng) | cb-words.py | 4 | 0 |
| 4b | "Đã mở bản mới" đè tiêu đề cảnh | kitLine (KIT §42.2) | dưới thanh trên, đè dải tiêu đề | trên thanh đáy / trên khung hộp thoại; 5 cỡ trong khung, không đè thanh trên |
| 5 | Thẻ việc có 2 điều kiện Sức khác nhau (Múa: "cần Sức trên 20" + "Sức ≥5") | cb-need.fn.js | 9 thẻ (56 lượt) | 0 |
| 6 | Hội × thi: tên lời mời không đúng việc thi (Hội Phượng (thi cưỡi ngựa bắn cung) · Lời mời thi thêu …) | cb-fest.js | 28 / 117 biến thể | 0 / 117 (mỗi biến thể có tên riêng FT7) |
| 7 | Lựa chọn sự kiện hiện dòng "TỐN không" | cb-ton.fn.js | 71 lựa chọn | 0 |

Chạy: `bash dev/site/build_site.sh`, rồi `node dev/test/close-bugs-probe.js file://$PWD/index.html dev/test/<scan>.fn.js` (cb-gate, cb-wx, cb-tap,
cb-need, cb-ton); `node dev/test/cb-fest.js`; `python3 dev/test/cb-words.py [origin/main]`. Ảnh: `node dev/test/cb-shot.js <url> <fn> <out.jpg> WxH`
(cb-greet.fn.js = đúng ca sếp: chiều còn 1 khắc → Vào thẳng → sang tối trong cung → chạm Dư đồ → có "Bái kiến Phi"; cb-view.fn.js = các màn ở mọi cỡ).

## Bảng thời tiết theo buổi (WX_BUOI, jclose §2) — sáng | trưa | chiều | tối
hoa đào bay: = | = | = | hoa đào bay dưới trăng · mưa phùn: = · sương sớm: sương sớm | nắng dịu | chiều mát | sương đêm · trời quang: = | = | = | trời trong, sao sáng
nắng gắt: nắng sớm oi ả | nắng gắt | nắng gắt | đêm oi nồng · ve kêu râm ran: = | = | = | dế kêu đêm hè · giông tố: = · đom đóm: trời trong mát | gió nồm | chiều lộng gió | đom đóm
lá phong rơi: = · nắng vàng: = | = | = | trăng thu · gió heo may: = · trăng rằm: trời thu trong | trời thu trong | chiều thu êm | trăng rằm
tuyết nhẹ / tuyết dày / mai nở trong tuyết: = · sương giá: sương giá | trời giá lạnh | chiều giá lạnh | đêm sương giá
Luật (cờ ướt/nóng/giông/tuyết) vẫn theo thời tiết TUẦN (S.wx.b). Biểu tượng đêm dùng mo-wx-trangram / domdom có sẵn.
Đề xuất tranh (chưa vẽ, chờ sếp): mo-wx-oinong (đêm hè oi), mo-wx-dekeu (dế đêm hè) — hiện dùng trăng / đom đóm.

## Hội cần tranh riêng (banner sự kiện hội do kit-fig2/act-pics2 làm — chỉ liệt kê)
Không hội nào có tranh hộp thoại riêng (đang dùng phòng ngủ + Hoàng thượng dán). Có tranh bản đồ (map-fest-*): newyear, nguyentieu, thanhminh,
doanngo, phoenix (chỉ sáng), thattich, trungthu, trungcuu, dongchi, giaothua. KHÔNG có cả tranh bản đồ: thanhtho, vulan, vantho, lapbat.
Cần tranh sự kiện riêng: newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, vulan, trungthu, vantho, trungcuu, thanhtho, dongchi, lapbat, giaothua.

## Thử ở các cỡ (cb-view.fn.js; 0 lỗi trang, 0 tràn ngang, 0 chữ cắt trong hộp thoại)
755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: nút đáy "Sang buổi" (sáng–chiều) / "Sang ngày mới" (tối); chip thời tiết đổi theo buổi;
thẻ bái kiến từ trong cung; lời mời "Hội Phượng · Lời mời: Thi thêu cờ phướn cho đội thắng" không cắt chữ; kitLine trong khung, dưới thanh trên;
thẻ Múa chỉ một dòng "Sức trên 20 (có 17)". 390x844: bản main không có màn "xoay ngang" (bố cục dọc chạy được) — không thuộc nhánh này.

## Ghi chú gộp
- review/kit-close: cùng dòng đổi tên nút → gộp sạch. kit-close đổi "Thôi" → ✕ cho mọi thẻ: thẻ bái kiến mới dùng "Thôi" như mọi thẻ main nên
  kit-close sẽ đổi luôn.
- review/opt-render: viết lại kitHideOut nhưng vẫn ghi "Tốn: không"; jclose bọc kitHideOut theo TÊN nên vẫn gỡ dòng đó sau khi gộp. Bài thử
  dev/test/opt-render.js của nhánh đó FAIL "no Tốn / Cần row" với lựa chọn miễn phí → khi gộp, sửa điều kiện đó (sếp 17:08Z: chỉ hiện giá thật).
- Sổ cũ: S.wx cũ (không có .b) tự nhận là thời tiết tuần ở lần render đầu; S.acGreet/acSkip/acSeen mới, thiếu thì coi như chưa chào.
