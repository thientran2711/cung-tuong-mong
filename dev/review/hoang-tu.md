# Kiểm duyệt: review/hoang-tu (8ec638087) gộp lên main — PASS có sửa của người duyệt

Ngày 2026-11-15, người duyệt kit số 2. Nhánh gộp: `review/hoang-tu-merged` trên origin/main **d69030384** (gộp lần đầu trên 14967f899,
main đổi sang d69030384 (sub-odds) thì gộp lại, không xung đột).

## Gộp
- `assemble.py`: danh sách module của main (jcdn đầu, hàm `cdn()`), thêm `jht.js` ngay sau `jhc.js` (trước jload, j84) như nhánh.
- `KIT.md`: main đang có §36 = dấu tâm trạng (lần gộp update-flow làm mất §36 Hậu cung). Giữ cả hai: §36 Hậu cung (bản nhánh phục hồi, mã jhc/j87
  ghi "KIT §36.1/36.2/36.4" trỏ đúng mục này), §37 Hoàng tự, dấu tâm trạng đánh lại **§38** (không mã nào ghi số §36 cho jemo).
- Site dựng lại bằng `dev/site/build_site.sh` (core 100,8 MB, fig 652,6 MB). `node dev/test/kit_dupes.js`: OK.

## Sửa của người duyệt (jht.js, 2 dòng)
Đo khung chân dung của thẻ người khi đổi người trong cùng tab con (luật §36.4 "đổi người không xê dịch khung", ±1 px):
- **Quý tộc**: dòng phẩm "Công tử · nhà quyền quý phe Đại tướng quân" xuống 2 dòng ở Fold 755 + iPad 1180 → khung nhảy **17 px** giữa hai người.
  Phe đã có ở dòng "Phe: …" ngay dưới (một sự việc hai chỗ) → dòng phẩm còn "Công tử · nhà quyền quý". Sau sửa: 0 px ở cả 4 khổ.
- **Hôn sự**: "Công chúa · 17 tuổi · con ta" xuống 2 dòng ở 1000x755 → nhảy **19 px**. Dòng "Mẹ: Ta" đã nói điều này → bỏ "· con ta" khỏi
  dòng phẩm. Sau sửa: 0 px.

## Kết quả (node <scratch>/ht-rv.js: index.html thật, ảnh từ CDN, SW chặn; 3 cảnh × 4 khổ)
Cảnh: `kids` (4 con của ta 4/9/16/17 + 5 con phi tần khác), `nokid` (kiếp mới), `old` (sổ dựng bằng index.html của main d69030384 có con, nạp vào bản gộp).
Khổ 755x1000@2, 1000x755@2, 1180x820@2, 844x390@3 — mỗi tab con + người thứ hai của tab:
- **0 lỗi trang/console, 0 ảnh 4xx, 0 tràn ngang, 0 chữ bị cắt**, tab con dài/ngắn tự chọn đúng ("Con của ta" ở 755; "Con ta / Trong cung / Quý tộc" ở
  1000/1180/844), không tab con nào cắt chữ.
- Chữ: 0 "%", 0 "Thôi/Lui/Đóng", 0 chữ Hán, 0 "ngươi" ngoài ngoặc lời thoại (luật VP j84 đổi "Con của ngươi" → "Con của ta"…), 0 "???/undefined/NaN".
- Dải người: mọi ô cùng đỉnh, cùng cao, cùng rộng (chênh 0 px). Khung chân dung: chênh 0 px khi đổi người trong mọi tab con (sau sửa).
- Tên + phẩm phía trên chân dung ở 755/1000/1180 (như Phi tần). 844x390: tên bên phải chân dung — y hệt thẻ Phi tần của main ở khổ này (bố cục chung, không do nhánh).
- Người lạ: công tử/quý nữ chưa quen = bóng xám `kit/unknown-m|f`, tên "Người lạ", Sắc/Tài "chưa rõ"; "Dò hỏi gia thế" (1 khắc, Bạc -5) → hiện tên + tranh công tử (CDN `por-man-congtu-*`).
- Bàn hôn sự (con trai 16): hộp thoại kit có tranh cảnh, mỗi mối là thẻ việc đủ Tốn/Được/Mất/Kèm + thang khả năng (Liều/Khó/Năm ăn năm thua), "Chưa bàn vội";
  chọn → thẻ kết quả Thành/Bại kit; hứa hôn thật (`pkState` "đã hứa hôn …", `S.hon` +5..+9). Lưu/nạp lại sau đó: được.
- Sổ cũ của main nạp ở cả 4 khổ, mọi tab con có người, không lỗi.
- `cdn-play.js` (sổ cũ main → bản gộp, 1 tuần chơi, mọi tab mỗi buổi) ở 755/1000: sổ nạp, 0 lỗi, 0 HTTP≥400, màn tải §35 đúng; 1180/844 lần đó bước dựng
  sổ bằng bản main hỏng (lỗi của bài thử ở bản cũ: `S` chưa có), phần chơi 0 lỗi — sổ cũ ở 1180/844 đã thử bằng ht-rv `old` ở trên.
- **coop-e2e trên Worker thật: 59/59** (phòng 7TBA). Máy tải ~50 (nhiều người duyệt chạy song song) nên `goto` mặc định 30 s quá hạn hai lần; chạy bản sao
  chỉ nâng hạn điều hướng lên 180 s (không đổi bước kiểm nào).

## Ảnh — dev/shots/review/hoang-tu/
Sau: `755x1000_2-kids-kid|qt|banhon`, `1000x755_2-old-hon`, `1180x820_2-kids-kvo`, `1180x820_2-nokid-kid` (thẻ trống kit), `844x390_3-kids-qt`.
Trước: ảnh `truoc-*` của nhánh (dev/shots/hoang-tu/, tab chữ cũ).

## Bot cân bằng — KHÔNG kết luận được
Số của thợ: trước n=59 HH 59 %, sau n=80 HH 52 % (chết sớm 20→24 %, khó sinh 4,6→6,0 %/lần). Sai số chuẩn của hiệu HH ≈ ±8,5 điểm: không phân biệt
được với 0. Người duyệt không chạy thêm (bot ~0,7 kiếp/phút, máy tải ~50, luật 1 trình duyệt): cần thợ cân bằng chạy ~1000 kiếp mỗi bên.
Nếu HH tụt thật: `HT.back` [14,9,5] hoặc NPC xin chỉ `roll(20)→roll(10)` (đầu jht.js).

## Đáng lo (không chặn, không do nhánh)
- Thẻ người chung (pcard): tên trên, phẩm dưới tên; luật 07:20Z muốn phẩm nhỏ trên rồi tên (kitNameRank) — việc của kit chung, mọi tab như nhau.
- Tab việc trong thẻ con: nhóm "Hôn sự 0/1" đứng trước "Học hành 7/7" (nút làm được lên trước — kitDoableFirst của review/person-acts).
- Nút "Qua ngày" (luật mới "Sang ngày mới") — main.
- `.khtempty` (thẻ trống) là thành phần mới, ghi ở KIT §37.2, dựng bằng kitArtFrame + mã màu kit.
