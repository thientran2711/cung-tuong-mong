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

## review/kit-j95 (tách từ kit-2b 927a8dc)
- jk95.js (nạp sau jk2b, trước j84), KIT.md §29: Thói quen trên thẻ người, Nơi ngươi hay đến, dấu hai bóng người trên bản đồ, chip đông người gom nhóm, nhãn "N người theo hầu" trên sân khấu. Kiểm typeof, không phụ thuộc j95; thử bằng dữ liệu giả lập theo API j95 ở 755x1000@2 và 1180x820@2: không lỗi, không tràn. Ảnh dev/shots/kit2b/j95-*.
- KIT READY: kitHabitsHTML, kitHabitsMineHTML, dấu kpair, silChip gom nhóm (§29). Cần j95 đặt `told` trong j95habitsMine và (nếu muốn) `j95followers(p)`.

## review/kit-j95: sửa theo kiểm duyệt FAIL 59360ed (thợ j95, 2026-11-14)
- Gộp origin/main (e9e2248); thứ tự `… jk2b, jk95, j98, j84`. KIT.md mục j95 đánh lại số **§31** (main có §29 jkitctl, §30 jbd).
- "N người theo hầu": j59 là module đóng (IIFE), nhãn tên do j59 viết; jk95 thêm dòng thứ hai `.kfol` vào nhãn j59 (dải người, chip gọn, nhãn của ngươi)
  qua một MutationObserver trên #stage (j59 chỉ viết lại nhãn khi chữ của nó đổi, nên dòng thêm được giữ). Đo: 6/6 cỡ, `.kfol` hiện.
- "đã lâu, có thể đã đổi" → chip trung tính kit "tin cũ · N tuần trước" (`kitChip(text,"n")`); không còn "có thể".
- Kẻ rình: `kitChip(text,"r")` (chip đỏ cảnh báo, không có ✗).
- "Nơi ngươi hay đến" vào cột phải của thẻ (trong khung), trước nhóm tab; "Thói quen" của người khác cùng chỗ. Đo: trong `.pc`, trong viền, 6/6 cỡ.
- Thử (dữ liệu giả lập API j95, như người kiểm): 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2: 0 lỗi trang, 0 tràn ngang,
  dấu hai bóng người có. Ảnh: dev/shots/kit2b/j95-{theohau,thoiquen,noihayden,banDo}-{755x1000,1180x820}.jpg.
- Các mảnh j95 là thành phần kit cắm vào thẻ / sân khấu đang có (không bố cục riêng), hợp với bản dựng lại HUD/sân khấu/thẻ người của review/fold-layout.

## review/kit-j95 lần 3: sửa theo kiểm duyệt FAIL 4df2286 (thợ j95)
- Bản đồ đếm người một chỗ: `kitMapCount` (bọc mapHTML, ngoài cùng) bỏ "N bóng" khỏi nhãn nơi (`.mmeta` chỉ còn "3 khắc" / lý do đóng), chip bóng người
  đọc "N bóng người" (bỏ "đông / rất đông"). Đo 6 cỡ, Thanh minh + countAt giả lập 7/14: 0 nơi có chữ "bóng" hai lần.
- Bảng kit `.kpkb` (mọi bảng kitRows, sửa trong j79 — kit): `align-items:baseline`, nhãn bỏ padding-top → hàng có chip và không chip cùng đường chân chữ
  (đo bằng mốc 0px ở đầu nhãn và đầu giá trị: lệch 0.0 px ở mọi hàng, 6 cỡ).
- Chip tin cũ ngắn "cũ N tuần", không xuống dòng trong chip; ở 1180 nằm cùng hàng.
- "Đi đâu quen một giờ…" → "Đi đâu thành lệ thì kẻ thù dễ đón đường…".
- 6 cỡ: 0 lỗi trang, 0 tràn ngang. Ảnh mới: dev/shots/kit2b/j95-*.jpg.
