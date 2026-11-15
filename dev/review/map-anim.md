# Kiểm duyệt kit: review/map-anim @ af8f56f7e (+ 1 sửa nhỏ của người kiểm) — PASS

Ngày 2026-11-15. Gộp lên review/main-next ed4d8ebe (= main 355d6d58 + bỏ bìa tím). Xung đột chỉ sw.js/index.html (bản dựng) → dựng lại bằng build_site.sh.
jbook.js gộp tự động: giữ bỏ bìa tím (việc 1), thêm KIT_MAP_MS + kitUnrollKeep của nhánh.

## Sửa nhỏ (người kiểm)
- j9 `mapHTMLgrid` (Dư đồ › Danh sách) còn luật cũ: chip "hết khắc" khi `!can(tc+1)` và dòng "Đến nơi phải còn ít nhất 1 khắc để gặp người".
  Nay theo walkOk: chip "hết khắc" chỉ khi còn 0, còn lại "đi N khắc"; dòng đầu "Đi được khi đường đi không quá số khắc còn; đến nơi hết khắc thì chỉ kịp xem ai ở đó."

## Luật đi (755x1000@2, từ Tẩm cung; gần 1 khắc, xa 2)
| còn | nhãn nơi xa (2) | nhãn nơi gần (1) | chạm xa | chạm gần |
|---|---|---|---|---|
| 2 | "N bóng · 2 khắc", không khóa | "· 1 khắc" | thẻ "Đường đi 2 khắc · đến nơi là hết buổi, chỉ kịp xem ai ở đó" (Đi / Thôi) | đi thẳng (còn 1) |
| 1 | khóa + "đi 2 khắc"; thẻ "đi 2 khắc, còn 1" + Đợi buổi sau | "· 1 khắc" | thẻ lý do | thẻ "đến nơi là hết buổi" |
| 0 | khóa + "hết khắc" | khóa + "hết khắc" | — | — |
- Trải bản đồ: 1150 ms ease-in-out (đo trên máy chậm 1.4–1.9 s, gồm trễ vòng đo); chạm là dừng; render lại giữa chừng thì trải tiếp.

## Kiểm theo kit (bản gộp, reducedMotion, 11 tab + sổ tuần; đường cung nữ ở 755)
| khổ | lỗi trang | tràn ngang | cắt chữ | #panel | nền tím |
|---|---|---|---|---|---|
| 755x1000@2, 810x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 | 0 | 0 | 0 | 1 | 0 |
- Sổ cũ (main 355d6d58, hclh-save-v2-1) nạp ở 755 / 1180 / 412, Qua buổi chạy, 0 lỗi.
- coop-e2e trên Worker sống: 59/59.

## Đáng lo
- Thẻ "đến nơi là hết buổi": kit xếp "Thôi" lên trên "Đi" (thứ tự hiển thị chung của hộp thoại) — chấp nhận.
Ảnh: dev/shots/review/map-anim/.
