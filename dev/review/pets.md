# Kiểm duyệt: review/ts-b (d29e3952c) + review/pets (772995ae1, dựa trên ts-b) — ts-b: KHÔNG vào main một mình · pets: FAIL

Ngày 2026-11-15, người duyệt kit số 2. Gộp thử lên main 218a591fd rồi 6e6c2ae6d (act-audit): chỉ xung đột `assemble.py` (main + `jtsb.js`,
`jpet.js` sau jload) và `.gitignore` (giữ `/img/` của CDN). Nhánh gộp thử: **origin/review/pets-gop-thu** (ce255da65, có 1 sửa của người duyệt,
chưa dựng site). kit_dupes OK. jtsb/jpet không có CSS riêng (chỉ kitModal, kitItem, pbtn, thẻ việc kit). Ảnh: dev/shots/review/pets/.

## Thử
- Bài thử của nhánh (`pets.js`, `mk-oldsave-pets.js`) hỏng trên main hiện tại: màn Luân hồi (#kroul) và màn tải §35 (#kload) chặn chạm.
  `mk-oldsave-pets.js` dựng sổ bằng hàm của ts-b (`tsbPetAdd`) nên không phải sổ cũ thật. Người duyệt chạy bản sao (gỡ #kroul, chặn service
  worker, đợi #kload) với sổ dựng bằng index.html của main: 755x1000@2 và 1000x755@2 đủ 15 bước (mua, theo hầu, Ngự ban, Thu săn, biếng ăn,
  thần thú đỡ mạng), **0 lỗi trang, 0 tràn, 0 ảnh thú vỡ, 0 HTTP≥400**; sổ main nạp, qua 6 buổi; đỡ mạng: chủ sống, Sức 30, thú mất (4→3).
- Thẻ ts-b (bài của người duyệt: Điềm lạ thả thú/phóng hỏa, Lần đầu gặp mặt, Bị ép nộp của lần 1/2, Đèn nến trong cung, Ngự ban thú) ở
  755x1000, 1000x755, 1180x820: 0 lỗi trang, 0 tràn, 0 chữ cắt, hộp thoại nằm trọn màn, cột nhãn Cần/Tốn/Được/Mất một đường (cùng x mọi thẻ),
  không "%"/Hán/"ngươi"; sổ main nạp + 8 buổi, 40 buổi chơi không lỗi, lưu/nạp lại được. (Chữ "Thiện cảm" thấy trong thẻ là của main/jaudit,
  không do hai nhánh.) 844x390 + 1180 phần pets: lượt chạy bị cắt vì quá giờ (máy tải ~60) — chưa đo.
- coop-e2e, bot cân bằng: chưa chạy (FAIL trước). Bot của thợ: n=9–10 mỗi bên — quá nhỏ.

## ts-b
Các thẻ sự kiện đạt kit (thẻ việc đủ hàng + thang khả năng, tranh nơi có người đứng, ô đồ kitItem). Nhưng phần Thú nuôi của ts-b một mình
hiện ô thú KHÔNG có tranh (khung trống) — review/pets thay cả phần này. **ts-b chỉ nên vào main cùng pets** (pets chứa ts-b).
Ghi chú nhỏ: thẻ "Lần đầu gặp mặt" câu 2–3 ("Nàng bảo…") hiện chân dung nhân vật của ta thay vì phi tần đang nói (bộ tách câu của kit đoán
người nói; jtsb nên truyền người nói).

## pets — chặn
1. **Bảng mua thú ("Ô thú nuôi") không theo kiểu cửa hàng sếp duyệt** (`755x1000-02-slot-buy.jpg`): 14 thẻ việc chữ dài trong hai cột hẹp
   (mỗi thẻ 10–14 dòng), không có tranh con thú, phải cuộn rất dài. Sếp 05:05Z / 05:45Z / 06:05Z: mua với thái giám = hộp thoại có người, lưới ô
   có hình món, tên, công dụng, giá, nút Mua ngay trên ô. Dùng chung thành phần cửa hàng của review/shop-fix khi nhánh đó vào main.
2. **Hàng ô Thú nuôi lệch dòng** (`755x1000-05-inv-pets.jpg`): con đang theo hầu có thêm chip "Đức +1" nên dòng "theo hầu · Khỏe" thấp hơn
   dòng "ở tẩm cung · Khỏe" của các con khác ~17 px CSS (luật thẳng hàng). Giữ chỗ cố định cho dòng chip ở mọi ô (hoặc đưa chip vào dòng trạng thái).

## pets — đã sửa (người duyệt, trên review/pets-gop-thu)
- Thẻ Ngự ban / Thu săn / "Khiêm nhường xin gửi Ngự thú viên" lộ chữ "thành:" trong hàng Được (`755x1000-09-card-ngu-ban.jpg`): lựa chọn chắc
  chắn thiếu chữ cơ may đứng đầu nên bộ đọc không bóc "thành:". Thêm "Chắc chắn ·" (bộ đọc ẩn chữ này) — 3 chỗ trong jpet.js.

## Đạt (thợ giữ)
Tư trang có khối THÚ NUÔI cùng khung với ĐANG MANG; ô thú = kitItem có khung + màu phẩm (Thường…Ngự tứ, dấu "Ngự"), Xa xỉ ở góc; thẻ thú
kitModal đủ Phẩm/Được/Mất/Ghi chú; thẻ Ngự ban có tranh thú; thần thú đỡ mạng có thẻ BÁO trang trọng. Tranh thú đang vẽ lại (review/pets-art) — chưa xét.
