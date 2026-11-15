# ACT AUDIT — mọi nút có ra đúng như nút ghi (review/act-audit)

Bộ kiểm: `dev/test/act-audit.js` (Playwright) + `dev/test/act-audit-sum.py` (chấm). Kiểm luật một nguồn: `dev/test/rules-one-source.js`.
Bot so hai bản cùng hạt ngẫu nhiên: `dev/test/bot-same.js`.

## 1. Luật một nguồn (owner 06:15Z / 06:20Z / 06:40Z / 07:05Z) — nhánh review/rules-one-source

Mọi ngưỡng lên Hoàng hậu người chơi thấy nay đọc từ `BAL` (jbal.js) và `hhNeed(p)`; chính các phép kiểm (`promoReqP` j8,
`candOK` j34) cũng đọc từ đó. Bổng lộc đọc từ `BL` (j20), ghế theo phẩm từ `SEATCAP` (j30).

| Chỗ hiện | Chữ cũ | Luật thật đã chạy (và đã đo cân bằng) | Chọn |
|---|---|---|---|
| Ngôi Hoàng hậu, có hoàng tử: Thái hậu | "Thái hậu 50" (j8 promoReqP, j6 bảng sắc phong) | `BAL.hhTh` = 55 (jbal kiểm thêm ở candOK/promoReqP) | **55** (`BAL.hhTh`) |
| Như trên, Hoàng thượng hiếu thảo | "Thái hậu 40" | vẫn 55 (jbal) | **55** |
| Chưa có hoàng tử | "Thái hậu 80" (hiếu thảo 70) | 80 / 70 (lớn hơn 55) | **80 / 70** (`BAL.hhThNoSon`, `hhThNoSonHieu`) — không đổi |
| Danh sách điều kiện | hai dòng Thái hậu ("…/50" và "Thái hậu với ngươi 55+") | một luật | **một dòng**, số = số kiểm |
| j34 candOK | `th>=40` (chú thích cũ) | bị jbal 55 che | **`BAL.hhTh`** |
| Đức, mẹ Thái tử | "(mẹ Thái tử)" không bao giờ hiện (lỗi `nd<40`) | 40 | hiện đúng khi là mẹ Thái tử |
| Ghi chú Đức trên thẻ việc (ducWarn/ducWarnTxt) | "Đức 33 → 28: cần Đức 50 mới lên Hoàng hậu"; j65 VP viết lại thành "còn 28: cần 50" (mất chữ Đức); điều kiện `S.duc>=40` | ngưỡng 50 (mẹ Thái tử 40) | **"Đức 33 → 28"** (owner 07:05Z), chỉ hiện khi tụt dưới ngưỡng thật của nàng; bỏ lối viết lại của j65 |
| Ô Đức "!" trên thanh trên (jk3) | "Cần Đức 50 mới được lập Hoàng hậu" cứng, hiện cả khi là mẹ Thái tử | 50 / 40 | đọc `hhNeed`: hiện khi Đức < ngưỡng của nàng; chữ: "Cần Đức 50 mới được lập Hoàng hậu (mẹ Thái tử: 40)" |
| Chú giải Đức (j79 KIT_GLOSS, HX) | "50 (mẹ Thái tử 40)" cứng | 50 / 40 | đọc `BAL.hhDuc` / `BAL.hhDucHeir` |
| Bảng sắc phong (j6) | "Thái hậu 50 (không con trai: 80), Đức …/50 (mẹ Thái tử: 40)" | 55 / 80 / 50 / 40 | đọc BAL + `hhNeed` |
| Hoàng hậu không chặn (Tần…Quý phi) | "-40; hoặc Thái hậu 50" | -40 / 50 | `BAL.qBlockHh/qBlockTh` (không đổi số) |
| Phi trở lên: HH không phản đối | "Thái hậu 30, thế lực 180", HH -30 | như chữ | `BAL.hiOppTh/hiOppFac/hiOppHh` (không đổi số) |
| Chú giải Bổng lộc | "30–320 bạc" cứng | `BL` 30…320 | đọc `BL` |

Đã soát, chữ = luật: "Xin Thái hậu cho học cùng" (Thái hậu 40), "Xin Thái hậu đỡ lời" (30), "Xin Hoàng hậu che chở" (20),
bậc Sủng/Danh/khoảng cách sắc phong (đọc `RANKS`, `promoGap`), ghế (`SEATCAP`).
Quét tự động "cần … N" cạnh phép so trong dev/build: không còn chỗ lệch khác.

Kiểm: Fold 755x1000@2 và iPad 1180x820@2 — 0 lỗi trang, sổ cũ (bản main) nạp được, 200 trạng thái ngẫu nhiên: chữ = số kiểm = luật cũ thật.
