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
- Kit minigame và week-book: thợ khác làm (điều phối).
- j95 schedules: làm ở nhánh review/kit-j95.

## Bản sạch (quyết định điều phối)
- Nhánh chỉ mang phần kit: jk2b.js, ảnh kit (crest-*, bg-reborn-*, veil/scar + fit, frame consort-0..5/unknown đã xóa họa tiết đỉnh), KIT.md, ảnh chụp. Module logic kéo theo từ wardrobe (j67–j85, j92, j92cat, jbal2), ảnh wd-* và các tệp đo đã gỡ; assemble.py = main + 'jk2b.js' ngay trước 'j84.js'. KIT_VEIL/KIT_SCAR (dữ liệu ảnh) nằm trong jk2b. K1/K2 có kiểm typeof wdSlots/wdInvHTML: tự hiện khi review/balance (j92) vào main. Ảnh 8-* chụp lúc còn j92.
- Khác main ngoài jk2b: j59 (trần chiều cao người 66% → 90%, góp ý A), j89 + EVENTS.json + st-* (review/event-art dd2f253, stArtOf).
- kitName không lặp chức (KIT 28.16).
- Quét lại bản sạch 2ddd22a+: 6 cỡ × 8 tab (Hành sự, Hậu cung, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện, Sổ ghi): 0 lỗi trang, 0 tràn ngang, 0 chữ cắt. Save cũ ghi từ main (cdf36d3, 12 buổi) nạp được ở 755x1000@2 và 1180x820@2 (đúng tên, không lỗi). Ảnh Z-quet-*, Z-saveCu-*.

GỬI NGƯỜI KIỂM DUYỆT: review/kit-2b sẵn sàng kiểm lại (sửa đủ 5 lỗi chặn + 3 lỗi phụ của 5b81408; j92 và logic đã gỡ theo quyết định điều phối).

KIT READY: kitItem (28.13), kitWearSlots/Rương đồ K1-K2 (28.14), kitRoulette (28.12), chế độ lựa chọn 'cost' (28.6), kitCourtHTML (28.4), một hàm khung pcPort + KIT_CREST (28.0).

KIT READY (bản sạch): một hàm khung pcPort + KIT_CREST (28.0), thẻ người dính (28.7), kitCourtHTML + chip (28.4), chế độ 'cost' (28.6), mạng che/dấu cào (28.8), chip số (28.9), tranh sự kiện (28.10), thẻ thân phận + nền chuyển kiếp (28.11), kitRoulette (28.12), kitItem (28.13), kitWearSlots/Rương đồ (28.14, hiện khi có j92), kitName (28.16).
