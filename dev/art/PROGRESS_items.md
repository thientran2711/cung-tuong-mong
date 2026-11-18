# PROGRESS — tranh vật phẩm (nhánh review/item-art)

## Trạng thái (11/14)
- XONG: 30 vật phẩm IT (j8 26 món + j67 vangbac, bienvang, bienngu, ngocdungcao; kiểm kê ITEMS.md ghi "33" nhưng mã chỉ có 30 khóa) + hinhnhan (vật chứng giá họa) = 31 tranh, và 44 tranh tác phẩm (11 kiểu × 4 bậc). Tổng 75 tranh, mỗi tranh 256 + 512, nền trong suốt.
- Dữ liệu: dev/build/j98.js `itemArt(key, tier)` + phẩm cấp từng món; thêm vào assemble.py (cuối danh sách). Trỏ ITIMG sang ảnh mới.
- Ảnh xem trước: dev/shots/items/sample.jpg (thêu 4 bậc + 8 món thường dùng), dev/shots/items/items-all.jpg, dev/shots/items/works-all.jpg.
- Khung, nền màu theo phẩm: phần của chủ kit (kitItem), chưa làm ở nhánh này.

## Quy trình (để vẽ thêm)
1. Mô tả món trong scratchpad itemart/tools/spec.py (bản chép: dev/art/item_spec.py), một lưới 4 cột (mỗi hàng tác phẩm = 4 bậc cùng kiểu, trái → phải vụng → tuyệt phẩm), nền xám nhạt phẳng.
2. Magnific gpt-2-6, 4k, 1 style ref = biểu tượng trâm cài đã duyệt `img/wd-tram-maudon.webp` (đã tải lên Magnific), thư mục ba4aecfe-efce-47e2-b53f-30d292091886.
3. Magnific remove-background trên cả lưới → cắt theo thành phần liền (gán ô theo trọng tâm) → vuông, vật chiếm 88% → 512 + 256 webp.
4. Xem từng tấm trên nền kem và đỏ; tấm xấu vẽ lại ở lưới sửa.

## Vẽ lại đã làm
- Đàn cổ Tiêu Vĩ: lần 1 trông như khúc gỗ gãy → vẽ lại cây đàn nguyên vẹn.
- Khúc đàn tự phổ 4 bậc: lần 1 ra nốt nhạc phương Tây trên khuông nhạc → vẽ lại bằng giản tự phổ (chữ cổ cầm), không khuông.
- Hạc đỉnh hồng: lần 1 giống bình hoa → lấy bản lọ nhỏ thon.
- Bỏ: biển vàng bản 2 (chữ «琴韵天成» sai nghĩa), kinh bậc 1 bản 2 (ra chữ phổ đàn).

## Tín dụng
- Tranh: Magnific gpt-2-6 (GPT Image), tách nền Magnific; style ref: biểu tượng trâm cài wd-tram-maudon (nhánh review/wardrobe, gpt-2-6).
- Lưới gốc trên Magnific (thư mục dự án): S (thêu + món thường), A (trang sức, vải, thuốc, độc), B (lễ vật, kỷ vật), W1 (tranh, bình hoa, thư pháp, kinh), W2 (khúc đàn, cờ, múa, áo múa), W3 (món, túi hương), F (sửa: khúc đàn, đàn cổ, lọ độc).
