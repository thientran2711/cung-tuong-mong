# Kiểm duyệt kit: review/page-curl @ 8aca1aae (lật nguyên tờ quanh gáy) + 1 sửa của người kiểm — PASS

Ngày 2026-11-15. Gộp lên review/main-next c30884d9 (= main: bỏ bìa tím + map-anim). Xung đột chỉ sw.js/index.html (bản dựng) → build_site.sh.
jbook.js gộp tự động: giữ bỏ bìa tím (§34.1c), KIT_MAP_MS/kitUnrollKeep (map-anim), thêm kitSheetTurn/KIT_TURN_MS/vuốt của nhánh. maxPx chỉ iPad (jkit/j59) không đụng.

## Lời sếp 02:40Z (Fold, Hậu cung → Giao tình): tờ đang lật TRONG SUỐT, chữ cũ/mới lồng nhau, chip đáy trang cũ thò ra
Đó là lật góc cũ (kitCurlFold) đang trên main. Nhánh này thay bằng tờ nguyên khối, mặt giấy đặc (`.ksht-face` nền #f3e7cc). Người kiểm còn thấy:
- `vanish` của nhánh vẫn làm mờ cả tờ (opacity 1 → 0 ở 18 % cuối, đo được .83 / .28 ở p .85 / .95) — tức là vẫn nhìn xuyên tờ lúc hạ xuống.
**Sửa:** bỏ hẳn opacity trên tờ. Lật trang sống (đổi tab) và sổ một trang: tờ bị CẮT ở gáy (`clip-path` ở mép gáy) — tờ nhấc lên, dựng đứng
ở gáy rồi khuất ở đó, không bao giờ mờ, không nằm đè lên trang tranh (iPad) hay ra ngoài màn (điện thoại). KIT §34.0 mục 4b "Tờ lật luôn đục,
không trong suốt".
- Đo lúc giữ tờ (kitCurlSwap.hold) ở p .2/.45/.7/.85/.95: không phần tử nào trên tờ có opacity < 1 / blend / filter (trừ ảnh mờ của người lạ
  và biểu tượng nhỏ trong nội dung, đã nằm trên nền giấy đặc); một #panel; ảnh: 755 (Phi tần → Giao tình), 412, 1180, 1366.

## Kiểm theo kit (bản gộp, reducedMotion, 11 tab + sổ tuần)
| khổ | lỗi trang | tràn ngang | cắt chữ | #panel | nền tím |
|---|---|---|---|---|---|
| 755x1000@2, 810x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 | 0 | 0 | 0 | 1 | 0 |
- dev/test/sheet-turn.js (của thợ, có chuyển động) 755 / 1180 / 412: lật tới 20/45/70, lật lùi 60/30, chạm nhanh, vuốt trái/phải, nút, tắt
  Cảnh động — đều 1 #panel, 0 id trùng, 0 tràn, 0 lỗi (1180 có một lần trình duyệt sập vì máy thiếu bộ nhớ, chạy lại sạch).
- Sổ cũ (thợ chưa thử): lưu bằng main 355d6d58 (hclh-save-v2-1) → bản gộp nạp đúng người ở 755 / 1180 / 412, Qua buổi chạy, 0 lỗi.
- coop-e2e trên Worker sống: 59/59.

## Đáng lo
- Fold một trang: nửa sau của cú lật (tờ qua gáy) giờ khuất hẳn — nhìn thấy tờ nhấc lên, đứng ở gáy rồi hết; mặt sau (trang mới) không
  thấy (trước đó cũng chỉ thoáng ngoài mép màn). iPad: tờ cũng khuất ở gáy thay vì mờ dần trên trang tranh.
- Ảnh trong dev/test/sheet-turn.js bị màn thỉnh tranh (#kload) che vì bộ thử không gỡ màn tải — ảnh tờ lật hợp lệ ở dev/shots/review/page-curl/.
Ảnh: dev/shots/review/page-curl/ (turn-<khổ>-p20/45/70).
