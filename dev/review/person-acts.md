# Kiểm duyệt review/person-acts (057ee4539): CHƯA KẾT LUẬN (dừng giữa chừng theo lệnh điều phối, 2026-11-15)

Nhánh gộp dở: `review/person-acts-review-wip` = person-acts + origin/main d69030384, sau đó + 6e6c2ae6d (act-audit). Site dựng lại bằng build_site.sh.

## Người duyệt đã sửa
1. **Hai bộ xếp giành nhau một danh sách (lỗi thật, do gộp với sub-odds).** main có `kitActSort` (KIT 31.19: xếp một lần mỗi buổi, giữ yên sau khi làm).
   jpa `kitDoableFirst` lại xếp `#panel .cards` mỗi lần vẽ. Sau một việc, thẻ "đã làm" bị jpa đẩy xuống cuối, jk3 kéo về chỗ cũ, cứ thế mãi.
   Đo bằng MutationObserver trên body: ~730 thay đổi DOM trong 3 giây ngồi yên (main: 6).
   Sửa: `kitActOwned(box)` trong jpa nhường mọi danh sách toàn `button.ka` (`.cards`, `.rbtn`, `#popw .pcb`) cho kitActSort; jk3 thêm `#popw .pcb`.
   Sau sửa: 1–2 thay đổi trong 3 giây, thứ tự giữ nguyên sau khi làm (755 và 1180). Ghi vào KIT §37.1.
2. Gộp main 6e6c2ae6d: chỉ `assemble.py` xung đột (giữ danh sách của main, thêm `jpa.js` sau `jhc.js`, trước jht/jload/jplace/jwhy/jaudit).
   jaudit đã có KIT_REL/kitRel/.krel nên bỏ bản chép có rào chắn và CSS .krel trùng trong jpa. kit_dupes OK.

## Đã kiểm (person-acts.js, chờ nạp lâu hơn vì CDN chậm)
- 755x1000, 1000x755, 1180x820 trên bản gộp main 6e6c2ae6d: pv/emp/th/deck/rv đều 0 lỗi, 0 lỗi trang, sổ cũ của main nạp được.
  Tab việc có đếm số việc làm được (Giao hảo 5 / Dò xét 2 / Đối đầu 5), tab mặc định là tab có việc làm được.
  Ô ảnh khung chân dung giống main tới ±0,1 px; thấy tua rua, không bị cắt.
- Lượt trước, trên bản gộp d69030384, khổ 844x390: báo "tassel clipped by .pc.kpnar.kpcfull".
  Có lẽ chỉ vì thẻ tự cuộn (cần cuộn xuống mới thấy tua rua), nhưng CHƯA kiểm bằng mắt.
- Hộp thoại Hoàng thượng/Thái hậu là hộp thoại người của kit (dấu NGƯỜI, hình bên trái, mục kit bên phải), không còn chữ "ngươi".
  Người lạ hiện bóng xám, đúng luật.

## Lỗi còn lại (phải sửa trước khi PASS)
- **1000x755, xem người:** tab "Đối đầu 5" chạm hoặc chui dưới nút "✕ Lui" (`.pcx`, nút nằm tuyệt đối ở góc trên phải `.pc`).
  Hàng tab không chừa chỗ cho nút. Gợi ý: `#popw .pc.kpa:has(>.pcr>.pcx) .kpatabs{padding-right:≈64px;flex-wrap:wrap}`,
  rồi đo lại bằng /tmp/rv-a791-pa/align.js (có kiểm tab nằm dưới nút đóng / hàng tab phải cuộn).

## Chưa làm
- 844x390 trên bản gộp mới nhất; đo thẳng hàng (align.js) ở 4 khổ; coop-e2e trên Worker thật.

## Ghi chú (không chặn)
- Main mới đổi người thứ ba thành "nàng ta", nên chip nay đọc "Nàng ta → ta: thiện cảm" / "Ta oán nàng ta". Câu hơi nặng, do luật VANPHONG của main.
- Chiều cao hình trong khung xem người (min(58dvh,520px)·--kfr) là một cỡ riêng, có ghi trong KIT §37.2. Hình vẫn theo tỉ lệ KIT_FIG.
- Hộp thoại người: tên + tước ở tiêu đề phía trên, chip tước dưới chân. Đây là mẫu KIT 32.7 chung cho mọi hộp thoại người.
- Thư mục scratchpad dùng chung bị người khác xóa hai lần giữa lúc chạy, nên dời bộ thử sang /tmp/rv-a791-pa.
