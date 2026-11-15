# Kiểm duyệt review/rank0-ivory + review/emo-men → review/rank0-emo-r6 (trên main 041cdcd1f — gộp ca361b147 rồi gộp tiếp main mới) — PASS có sửa của người duyệt

## Gộp
- assemble.py: giữ jht/jwhy/jaudit của main + jmark, jkpor (trước j84). jemo emoBadge: một hàm = bộ dấu nam (emoArtSet, emo-men) + chạm hiện kpPop, không chữ/không title (rank0-ivory). KIT §38 thêm dòng nam; kitMeMark đánh số lại §41 (trùng §37 Hoàng tự; §39–40 của review/brand). Dựng lại site.

## Sửa của người duyệt
1. Chạm dấu tâm trạng trên dải đầu trang (.kcrow: Hoàng thượng, Hoàng hậu…) mở thẻ người thay vì lời giải: listener window-capture của jk2b chạy trước jemo → jk2b bỏ qua img.kemo.
2. jkpor: KIT_POR.dx .18 > phần dư (z−1)/2 = .07 → mép ảnh lọt vào ô. Quét 199 ảnh por (mỗi người một ảnh): 29 ảnh có vết cắt thẳng của áo hiện trong ô (thái y a30: 12 % bề ngang ô, quan, phi tần -kc, Thái hậu…). Sửa: phía nào mép ảnh có vẽ thì giới hạn dời = (z−1)/2z; mép trong suốt vẫn dời tới .18. Sau: 0 vết cắt (tmp porck2 mô phỏng + đo DOM imgL/imgR = 0).
3. KIT §1.3: frame-consort-6 / frame-cold mới ghi rõ chưa duyệt, chưa lên CDN.

## Kiểm (Playwright, server tĩnh, ảnh CDN)
| khổ | lỗi trang | tràn ngang | dấu đầu: khe / ảnh / nhún | Dấu ấn: tab + Dùng | thăng phẩm cấp dấu | chạm dấu tâm trạng | dấu nam Hoàng thượng | sổ cũ không meMarks |
|---|---|---|---|---|---|---|---|---|
| 755x1000@2 | 0 | 0 | 7.7 px/646 (1.2 %) ok, chỉ nhún, không sáng | 4 dấu, Dùng → 1 | 0→3: [0,1,2,3] | kpPop, không mở thẻ | emo-m-gian + "Giận: bị quần thần can gián" | nạp được |
| 1000x755 | 0 | 0 | 5.9 px ok | ok | ok | ok | ok | ok |
| 1180x820@2 | 0 | 0 | 6.5 px ok | ok | ok | ok | ok | ok |
| 1366x1024@2 | 0 | 0 | 6.5 px ok | ok | ok | ok | ok | ok |
| 844x390 | 0 | 0 | 2.0 px / 169 px hình (1.2 %), dấu 16 px | ok | ok | ok | ok | ok |
| 390x844 | 0 | — | màn tiêu đề (không đổi bởi nhánh này) | | | | | |
- Đáp ứng: khung gỗ nâu xám cũ + gấm ngà + ngọc trai (phương án A) — đã xem ảnh. Chân dung không phóng (z 1.14 mọi ảnh; POR_FACE.json chưa lên CDN → luật cỡ mặt chưa chạy).

## Còn lại / đáng lo (không chặn)
- Thẻ người (KIT §28.1) cắt tua rua dưới khung ở MỌI thẻ (Hậu cung/Chí tôn) — có từ main, trái OD 06:35Z; không do hai nhánh này.
- Dấu ấn trong rương thăng phẩm cần review/gift-chest (jrankset/kitReward) — chưa ở main; hiện dấu vẫn được cấp (Tư trang).
- jkpor WIP POR_FACE (cỡ mặt, z tới 1.6) chưa bật; khi bật nhớ đồng bộ dev/tools/por_family.py với giới hạn dời mới.
