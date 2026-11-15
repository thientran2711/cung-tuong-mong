# Kiểm duyệt: review/img-quality (badc75e45) gộp lên main — PASS có sửa của người duyệt

Ngày 2026-11-15, người duyệt r6. Nhánh gộp: `review/img-quality-r6` trên origin/main **d50f5f772** (gộp lần đầu trên 70c792d41, rồi 114887bc1, rồi d50f5f772 — có jkpor khung chân dung một luật; jimg không đụng).

## Gộp
- `assemble.py`: danh sách module của main, thêm `jimg.js` cuối (sau j84) như nhánh. index.html / sw.js / assets.json dựng lại bằng `dev/site/build_site.sh`.
- Tranh mới của nhánh đã trên CDN (không trong git): `img/kit/unknown-f|m|k.webp` 768x1012 RGBA, `unknown-fig-f|m` cao 1350 — đã tải về xem: bóng xám sạch, bán thân đủ đầu + vai.

## Sửa của người duyệt (jimg.js)
- **Bỏ bọc `h54Face` (mục 5 cũ).** Main đã có jht.js (review/hoang-tu): công tử có bộ mặt riêng `FIGURES-congtu.json` (s.cf), bóng xám khi chưa quen, không lấy
  identity "man". Bọc của nhánh (nạp sau jht) trả bóng xám mỗi khi `!s.fid` — jht không bao giờ đặt s.fid ⇒ công tử **đã quen** (Dò hỏi gia thế, hứa hôn, phò mã)
  vẫn hiện bóng xám, mất tranh công tử. Sau sửa: chưa quen = `unknown-m` trong `frame-unknown`; quen = `por-man-congtu-*` (đo ở 5 khổ).
  Giữ phần `figPick` (sổ cũ: nam nhân thiếu mặt lấy lại identity từ công tử còn giữ s.fid kiểu cũ).

## Kết quả
Bài thử `probe` (index.html thật, ảnh từ CDN, SW chặn; kiếp mới + sổ cũ dựng bằng main ca361b147), tab Chí tôn/Phi tần · Cung nhân · Nam nhân · Hoàng tự · Giao tình:
| khổ | kiếp mới: face-* cũ trên màn | bóng xám sai khung | tràn ngang | lỗi trang / HTTP≥400 | sổ cũ nạp |
|---|---|---|---|---|---|
| 755x1000@2 | 0 | 0 | 0 | 0 / 0 | được, 0 lỗi |
| 1000x755 | 0 | 0 | 0 | 0 / 0 | được, 0 lỗi |
| 1180x820@2 | 0 | 0 | 0 | 0 / 0 | được, 0 lỗi |
| 1366x1024@2 | 0 | 0 | 0 | 0 / 0 | (kiếp mới) |
| 844x390 | 0 | 0 | 0 | 0 / 0 | được, 0 lỗi |
- Main cùng bài thử (755): `porOf` trả face-* cũ, tab hiện 2–5 face-* mỗi tab; bản gộp: `porOf` trả por-* ngay (phi tần, cung nữ, Hoàng thượng), 0 face-*.
- 390x844: màn tải "Lần đầu nhập cung" (như main) — không do nhánh.
- img-quality.js (bộ đo của nhánh) trên bản gộp, 755x1000@2, `IQ_ONLY='Danh mục|Hoàng tự|Nam nhân|Cung nhân'` (DANH MỤC = khung chân dung kit + khung nhỏ của MỌI người
  trong đời ở 3 mức người lạ / thấy mặt / quen): **645 ảnh, 0 lỗi** (phóng 0, face-* cũ 0, nửa mặt 0, hỏng 0, làm mờ 0), lỗi trang 0.
  Phần sân khấu đã chạy (Fold, 7 nơi): chỉ cờ phóng của người toàn thân fig 900 px (đã biết, việc tranh). Chạy đủ 232 màn không xong vì máy tải ~65.

## Dung lượng tải / bộ nhớ đệm
- Nhánh không thêm tệp nào vào assets.json: unknown-* cùng mã băm với main (đã đẩy CDN trước khi main dựng). Phần lõi tải lần đầu: main 122,68 MB → gộp 123,15 MB;
  +0,47 MB là 4 tranh `title-tuanluc-v1..v4` người khác đẩy CDN (có ở bất cứ bản dựng mới nào), không do nhánh.
- Số lượt tải face-*.webp lúc mở game: 129 ở cả main và bản gộp (nạp sẵn ở chỗ khác, không đổi). por-* trước đây cũng được tải (Image() ẩn) — nay gán thẳng vào
  <img>, cùng URL, SW phục vụ từ kho theo mã băm (`asset()`), nên không tải thêm. Bóng sân khấu unknown-fig-m/f (~105 KB, thuộc lõi) nạp sớm: đã có trong phần lõi.

## Ảnh — dev/shots/review/img-quality/
`755x1000-nguoi-la-khung-da` (thẻ người lạ: khung đá + bóng xám), `1180x820-san-khau-bong` (sân khấu người lạ = bóng cỡ thật), `755x1000-so-cu-hoang-thuong`
(sổ cũ, Hoàng thượng chưa thấy mặt: khung đá), `844x390-so-cu-cung-nhan`, `390x844`.

## Đáng lo (không chặn)
- Fold: người toàn thân trên sân khấu (fig 900 px) phóng 1,43–1,53 — cần xuất lại fig ≥1100 px (IMG_QUALITY.md "Cần vẽ/cắt lại"), việc tranh, không do mã.
- jimg thêm 1 dòng <style id="jimg"> (ẩn hình thật của người lạ trên sân khấu khi bóng chưa tải) — quy tắc ẩn, không phải thành phần giao diện riêng.
