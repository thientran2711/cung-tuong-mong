# PROGRESS kit-2b (chủ kit #3)

Nhánh `review/kit-2b`, worktree /home/user/wt-kit2b. Mã: `dev/build/jk2b.js` (nạp trước j84). KIT.md mục 28 (28.0–28.15).

## Đã làm (đẩy lên nhánh)
- Mục 1: một ô ảnh chung cho thẻ người (giữ trọn mào khung), MỘT hàm khung pcPort cho mọi cỡ (mdH dùng chung), chân dung cắt chặt, trang trí đỉnh khung cho từng bậc/vai (img/kit/crest-*, gpt-2-6, đã xóa vụn), thẻ người 2 cột dính (≥600px), dải thu gọn.
- Mục 2 + góp ý E: khối Trong cung (kitCourtHTML) trong tờ Chỉ số; chip Thái hậu/Hoàng hậu trên thanh đầu; Tư chất rời sân khấu. Hook dữ liệu window.kitCourtMood/kitCourtKnown.
- Mục 3: chế độ 'cost' (hideOut) cho lựa chọn sự kiện, tự bật ở pushDil/pushFront/mkP/kit choice.
- Mục 4: mạng che + dấu cào (KIT_VEIL/KIT_SCAR từ wardrobe), fit por tính lại theo porcrop.
- Mục 5: tranh evArtOf/stArtOf trong khung ảnh của lựa chọn sự kiện, bảng tin, thẻ chương, thẻ kết quả.
- Mục 6/6b: thẻ thân phận có khung tranh xuất thân; nền chuyển kiếp chung img/bg-reborn-p|l.webp; kitRoulette.
- Mục 7: chip số lấy trọn cụm; "Bảng định thứ".
- Mục 8 (một phần): kitItem; K1 ô trang phục trên mọi thẻ người; K2 Rương đồ.
- Gộp: origin/main (cdf36d3), review/event-art, review/wardrobe. Sân khấu: j59 (main) làm chủ bố cục, trần chiều cao 90%.
- Sửa theo kiểm duyệt FAIL 5b81408: thẻ Fold (tên/thanh/nút việc thấy ngay), nhãn tên không bị cắt (j59), thứ tự jk2b trước j84, bỏ __pycache__, vụn crest, KIT.md số 28, thanh ở iPad trên chân dung.

## Chưa làm
- Mục 8: kit minigame (mặt bàn chơi, ô chữ dùng chung, nút "đang giữ", thanh trượt dọc).
- Mục 9: review/week-book (tranh evArtOf trên trang sổ, xuất lại nền trang sổ bản lớn).
- review/schedules (j95): Thói quen, dấu hai bóng người, Nơi ngươi hay đến, gom bóng người, kẻ hầu theo chủ.
- Quét lại đủ 6 cỡ + save cũ sau lần gộp main cuối (máy chủ thử đã dừng khi hết giờ).

## Cần quyết
- Kiểm duyệt muốn bỏ j92 (logic trang phục) khỏi nhánh; điều phối lại giao gộp review/wardrobe để dựng K1/K2. Hiện nhánh có cả j92 và các module logic của wardrobe (j67…j85). Mã kit có kiểm typeof, gỡ j92 thì K1/K2 tự ẩn.
- Thiếu ảnh img/wd-hh-tram-*.webp (j92 trỏ tới, nhánh wardrobe chưa có).

KIT READY: kitItem (28.13), kitWearSlots/Rương đồ K1-K2 (28.14), kitRoulette (28.12), chế độ lựa chọn 'cost' (28.6), kitCourtHTML (28.4), một hàm khung pcPort + KIT_CREST (28.0).
