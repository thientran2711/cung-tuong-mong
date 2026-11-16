# Duyệt review/game-feel 80bfd8feb (người duyệt R6, 15/11) — nhánh review/game-feel-r6

Gộp lên main 70c792d41 (xung đột assemble.py: jfx đặt sau jaudit, trước j84; index.html/sw.js/assets.json dựng lại).

## Kiểm
- dev/test/view-scale.js (?khost=1): 1000x755 s .8475, 1180x820 s 1, 1366x1024 s 1.1576, 844x390 s .4756, 755x1000 s 1, 390x844 xoay 90° (xoay ngang thật bỏ xoay, cùng bố cục): bấm tab đúng mọi cỡ, 0 lỗi trang, không tràn ngang, bố cục ngang giống hệt nhau. Chữ nhỏ nhất 4.7 px trên 844x390 (sếp 06:12Z chấp nhận).
- dev/test/item-gain.js: 0 lỗi; tác phẩm tự tay đúng tên/phẩm/hình (Bát chè long nhãn · Khá, Bức tranh «Mai» · Tinh xảo …).
- dev/test/reward-box.js (MỚI): mọi lần được ban/tặng ra đúng hộp: PASS sau sửa.
- Hiệu năng: lớp Pixi FX resolution 1, ticker dừng khi hết hạt, chất lượng tự hạ (KFX.q 1 → .7 khi chậm, đo được trong máy duyệt tải 80). Pixi chỉ tải khi cần (dev/vendor, sw cache). Host rot.js: index.html tải 2 lần (host + khung ?krot=1), lần 2 là 304.

## Người duyệt đã sửa (jfx.js)
1. (sếp 17:24Z "Hoàng thượng ban thưởng tranh cổ" không có rương) — bestow bị j92 (thêm áo/trâm) và jveil (thêm mạng) bọc: j93 chỉ đưa MÓN CUỐI vào rương, món đầu (tranh cổ) im lặng (main) hoặc chỉ là kitGain trơn (nhánh). Nay: bọc bestow ngoài cùng, giữ rương của j93, ra MỘT rương/mâm/ngự tứ với ĐỦ mọi món + bạc.
2. kmDiff: thay phần đồ của j93 (chỉ ≤4 món, "Có người tặng" hộp gấm cho cả truyện/Nội vụ phủ): nhóm theo người cho — Thái hậu/Hoàng hậu mâm, phi tần hộp gấm "<tên> tặng", Nội vụ phủ rương, truyện/hiếm rương (giver Hoàng thượng → ngự tứ); đồ tự có 1–2 món kitGain, 3+ món gộp một rương (sếp 08:20Z). Không còn giới hạn 6 món (trước: >6 món im lặng).
3. Áo/trâm (WD_ITEMS.icon) và mạng (vlSrc) có hình + phẩm đúng trong rương và kitGain (trước: chữ cái "Á","T" — sếp 17:02Z).
4. Chạm hình người trên sân khấu (#me, #emp, .tok): không còn khung chữ nhật (viền vàng, gợn, nhấn, hover) + tắt tap-highlight xanh (sếp 16:40Z).

## CÒN THIẾU → FAIL cho thợ
1. KHÔNG có kitLose: sếp 08:20Z "mua = món bay vào túi, BẠC BAY RA; bán = món bay đi, bạc bay vào; mất/tịch thu = món mờ rơi + thẻ báo; một hàm chung kitGain/kitLose". Nhánh chỉ có rơi bạc khi ĐƯỢC bạc (apply bac>0) và kitGain; không có hoạt cảnh khi mất bạc, bán đồ, bị tịch thu/cướp/bắt nạt đòi đồ, tặng đi. Cần kitLose(entry|bac) + nối ở MỘT chỗ chung (kmDiff: món biến khỏi S.inv / S.bac giảm), test như reward-box.
2. Hộp gấm/rương: sếp 17:02Z đồ bay ra quá nhanh → chậm, từng món sáng lên, dừng ngắm (kitReward j93) — chưa làm.
3. kitGain dùng CSS riêng (.kfg/.kfgn/.kfgg) — đã ghi trong KIT.md § CẢM GIÁC/FX nhưng ô hình nên là kitItem (khung phẩm của kit) thay vì <img> trần; chip phẩm .kfgg nên là chip phẩm của kit (KIT_GRADE) — đưa lên điều phối nếu chưa có phần kit.
