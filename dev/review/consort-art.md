# Kiểm duyệt bộ giao diện: review/consort-art @ d6415a37 (lần 2) — PASS

Ngày 2026-11-14. Người kiểm độc lập (không sửa). Phạm vi: hình đứng/chân dung phi tần bậc t5–t8, hoa điền t7/t8 thu nhỏ (theo chủ duyệt), t6 giữ nguyên, già hoá a51.
Lần 1 (d1e6e06) FAIL — ba lỗi chặn của lần đó đã được sửa (xem cuối).

## 1. Đủ tệp, FIGURES.json
- FIGURES.json: 1152 bản ghi consort = 32 nàng × (t1–t8 + cold) × 4 tuổi (a18/a26/a36/a51), mỗi ô đúng 1 bản ghi, không trùng, không hở.
- Mọi `file`/`por` đều có trên đĩa, tên tệp khớp identity/tier/age của bản ghi; 1152 chân dung đều 384x506; mọi fig mở được (PIL verify).
- So với điểm gốc gộp main (9c8df2b8): nhánh chỉ đổi bản ghi `role: consort` (1152), không đụng bản ghi người khác; không đổi tệp img nào ngoài fig/por-consort.
- Mã: j66 `figTierOf` → bậc = min(7,rank)+1, Hoàng hậu (queen) = 8. Phi→t5, Quý phi→t6, Hoàng quý phi→t7, Hoàng hậu→t8; hết lùi về t4 vì nay có đủ hình.

## 2. Thử gộp
- Vào **origin/review/page-curl** (8f46df05): chỉ xung đột `dev/review/LOG.md` (hai bên cùng thêm dòng — lấy cả hai).
- Vào **origin/main** (574f5602): xung đột `dev/review/LOG.md` và `img/FIGURES.json` (640 khúc). Không xung đột tệp ảnh nào.
  FIGURES.json là xung đột "cùng nối thêm một chỗ": main thêm 640 bản ghi consort bậc cung nữ m0–m4 (tm0–tm4, từ maid-art-b), nhánh đổi 1152 bản ghi consort t1–t8/cold. Khóa theo `file` thì **0 bản ghi bị cả hai cùng sửa**.
  Cách giải (đã thử): lấy bản main rồi thay/nối 1152 bản ghi của nhánh → 1936 bản ghi, mọi tệp tồn tại. Không chặn, nhưng người gộp phải gộp JSON theo khóa `file`, KHÔNG chọn nguyên "ours"/"theirs".

## 3. Trong game (dựng từ thử gộp page-curl + nhánh, bố cục đã duyệt)
Xuất thân Con gái Tể tướng, người chơi đặt Quý phi; 4 phi tần đặt Phi / Quý phi / Hoàng quý phi / Hoàng hậu, đã quen mặt.

| Cỡ | Phi | Quý phi | Hoàng quý phi | Hoàng hậu | Người chơi Quý phi |
|---|---|---|---|---|---|
| 686x880@2.2 | c14-t5 | c13-t6 | c15-t7 | c07-t8 | c23-t6 |
| 1180x820@2 | c09-t5 | c07-t6 | c12-t7 | c25-t8 | c31-t6 |

- Hình đứng và chân dung cùng tệp (cùng nàng/bậc/tuổi) ở cả 10 trường hợp. Thẻ Hoàng hậu hiện chân dung t8 (rèm ngọc, phượng vàng nhỏ), Hoàng quý phi t7; sân khấu iPad hiện người chơi Quý phi áo t6 xanh lục.
- Không lỗi trang, không tràn ngang, không ảnh fig/por 404.
- Save cũ (tạo bằng index.html của main, Fold) nạp được, 0 lỗi trang; rivals[0] của save (Hoàng hậu đầu ván: queen, rank 6) ra fig-consort-c06-t8-a26 — đúng bậc t8.
- Ảnh: the-hoang-hau-t8-fold.jpg, the-hoang-quy-phi-t7-fold.jpg, san-quy-phi-t6-ipad.jpg.

## 4. Soát ảnh bằng mắt (≥ 24)
32 chân dung ngẫu nhiên trong 413 tệp đổi ở d6415a37 (soat-ngau-nhien-1/3.jpg; 2 và 4 xem trong lúc kiểm), thêm dãy t5–t8 của c20, c08 (a36):
- **Nốt ruồi:** không thấy trên 32 mặt.
- **Hoa điền:** t7 = chấm men son/vàng nhỏ cỡ hạt đậu; t8 = phượng vàng lá nhỏ, không lam, hẹp hơn khoảng giữa hai mày. Không chỗ nào giống sẹo, không lộ vết dán quanh trán.
- **a51:** có nếp cười/rãnh mũi má, đọc ra ~45–48; tóc tối/nâu ấm, không xám, khớp màu tóc a26. Vài mặt vẫn hơi trẻ (c02-t8-a51, c09-t8-a51 ~40) — thợ đã tự ghi, không chặn.
- **Đẹp, mặt hiền:** đạt. c03-t3-a51, c12-t8-a18 nhắm mắt (mặt yên, không trái luật).
- **Lỗi hình:** rìa rèm ngọc/tua của mũ t8 (c02, c05, c09, c32) và mũ t7 (c06) bị răng cưa khi phóng to chân dung — viền cắt có từ trước, art13 không đụng alpha; ở cỡ thật trong game không thấy (đã chấp nhận ở lần 1).

## Việc thêm: chấm như nốt ruồi trên má c15-t3 (người làm độ khó báo)
- **Trên main** (origin/main) por-consort-c15-t3-a18/a26/a36/a51 đều có một chấm đen tròn trên má trái — đúng là nốt ruồi (ảnh c15-t3-nhanh-tren-main-duoi.jpg, hàng dưới). Main còn bản a51 tóc bạc kiểu cũ.
- **Trên nhánh này** fig và por c15-t3 cả 4 tuổi **không còn chấm** (hàng trên; fig đã soát riêng vùng mặt).
- => **Không chặn nhánh này.** Gộp review/consort-art vào main là xoá luôn nốt ruồi đó. Nếu main phải ra bản trước khi gộp: lấy 8 tệp fig/por-consort-c15-t3-* của nhánh chép đè lên main.

## Ghi chú không chặn
- Hoa điền t7/t8 nay nhỏ hơn t5/t6 (theo lệnh chủ "nhỏ như phần C"); bậc 7/8 phân biệt bằng chất liệu (men son, phượng vàng), không bằng cỡ.
- Ở bản thử gộp page-curl (gốc cũ, chưa có tm0–tm4 của maid-art-b), người chơi xuất thân cung nữ hiện hình phi tần t1 có hoa điền. Không do nhánh này; trên main có bản tm* nên hết. Người kiểm main nên xem lại sau khi gộp.

## Lỗi chặn lần 1 — đã sửa
1. Por thái giám/cung nữ/thái hậu cắt lại từ hình cũ → nhánh nay không đổi tệp img nào ngoài consort. ĐẠT.
2. Chậm main 305 commit, 726 xung đột → gộp main ở 65a75ed7; nay chỉ còn LOG + FIGURES.json (gộp được theo khóa). ĐẠT.
3. a51 trông như a18 → ĐẠT như mục 4.
