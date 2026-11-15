# PROGRESS — review/opt-render (vòng 2, sửa FAIL của dev/review/opt-render.md)

Nhánh: `review/opt-render`, dựng trên bản gộp của người duyệt `review/opt-render-r6` (6f256f7f4) + gộp main mới (ca361b147).
Không làm rà cân bằng bằng bot (mục 6 của bản duyệt) — review/event-balance làm, dựng trên nhánh này và dùng `kitHint` (hàm thuần).

## Đã làm (theo danh sách FAIL)

1. **Mọi sự kiện vào chế độ giá** (KIT 28.6, sếp 14:30Z). `kitIsEventChoice` (jk2b) đọc cờ dữ liệu, không đoán theo tên:
   - PEND (mkP / pushDil / pushFront) = sự kiện, TRỪ bộ chọn của việc chủ động `KIT_ACT_PIDS` (giftpick, plantpick, taintpick, evpick,
     itarget, shop, plantsv, wkgive, runner, vlget, vlcraft, vlnvp, vlout, htban, h54ban) → đủ số.
   - Cờ `ev` ở chỗ dựng thẳng vào Q: approachOne (Có người đến, Thái hậu triệu, Kẻ hầu xin, Một ánh mắt, Lời mời vào phe j25), 7 lễ
     FESTEV (`ev:"fest"`), Việc của kẻ hầu, Ban cung, Tranh ghế (giữa vòng, vòng 1, vòng 2), ngày hội thi j71.
   - Cờ `act` (bộ chọn / hỏi lại của việc chủ động): Nội vụ phủ đưa người, Xuất gia?, Kiếp này chưa trọn, thẻ Dư đồ (j77), học / tự
     luyện (j83), dò la nhà ngoại (j55), Hảo hữu tìm đến. Cờ `shop`: Hàng chợ đen.
   - menEnc (Nam nhân nơi cấm địa) bỏ `showOut` (luật 00:26Z cũ) → sự kiện theo luật 14:30Z.
   - "Lời cảnh báo", "Thánh thượng ban thưởng", "Hoàng thượng đến", quà tặng: KHÔNG có lựa chọn — là thông báo kết quả đã xảy ra (số thật,
     như thẻ kết quả §7), không thuộc chế độ giá.
2. **Gợi ý trung thực, theo bối cảnh, phân biệt lựa chọn** — `kitHint(o, m, lv)` viết lại: đọc thẳng DỮ LIỆU của lựa chọn (fx + dòng x / j67
   qua `dilLineRaw`), không đọc DOM; cái được chính trước, độ chắc phỏng chừng, cái giá ngoài Tốn ("nhưng …"), hỏng thì sao ("hỏng thì …").
   Câu chuyện của dữ liệu giữ nguyên lời ("cha hài lòng", "cả họ bị tru di", "lộ là chết", "lần này không thể có thai"); không còn "chuyện
   khác". Mức rõ theo Tâm cơ / Tai mắt: mơ hồ (người chung chung) → rõ (vai, cỡ "(nhiều)/(chút ít)", dễ thành / khó đoán / khó thành, hỏng
   thì) → sắc (tên người, lời đọc bối cảnh "ngài trọng tài, rất hợp"). Dữ liệu thiếu cái được khi thành đã bổ sung: giu (giữ long thai),
   tt3, ch2, cn2 diệt khẩu, thd1 ×2, poisongift, kêu giữ con, diệt kẻ tống tiền, vase ("nàng bị đánh hai mươi trượng"), Một ánh mắt.
3. **Chữ**: bỏ hẳn dòng "Tốn: không" (sự kiện không tốn thì không có dòng Tốn); bỏ "có lợi về …", "có cái giá", "thế đối thủ", "chuyện khác".
4. **Bộ chọn của việc chủ động** (vlget, vlcraft, vlnvp, vlout, runner, tặng quà, cài người, tẩm đồ, tiệm…) đủ số, không gợi ý.
5. **LUẬT KIT**: `.krisk`, `.khint`, `.kakem`, `.neu .seal` thành phần kit chung, có hàm + KIT.md + trang mẫu kit:
   `kitRisk(word)` (kitChip tông g / w / r; thêm tông `.kchip.w` vào CSS kit j79), `kitHintRow(text)` (`.ef.i` trong CSS kit j63),
   `kitKemRow(K)` (`.kb .kkem`, j63), `kitSeal(ok)` (dấu xám "KẾT QUẢ" = `.sure` sẵn có của kit, bỏ màu riêng). Trang mẫu kit:
   `index.html?kit` hoặc `kitSample()` (jk2b) — vẽ mọi phần bằng chính hàm kit.
6. **Bạc −5 của đêm thị tẩm**: nguồn = giá của bước CHUẨN BỊ ("Điểm trang lộng lẫy" Bạc −5; "Tắm cánh hoa" −15; "Tập trước" Sức −5) —
   ảnh chụp số liệu của đêm lấy ở `nightScene`, TRƯỚC bước chuẩn bị. Sửa ở j75: khi đêm thật sự bắt đầu (dựng night1, sau khi đã trả giá
   chuẩn bị) thì chụp lại Bạc / Sức. Test bỏ chỗ tự trừ Bạc, chạy đêm thật: chuẩn bị → night1 → night2 → thẻ đêm không còn dòng Bạc.

## Bảng trước / sau (quét tĩnh `python3 dev/test/opt-scan.py`)

| | trước (a8ec98511) | sau |
|---|---|---|
| chỗ có lựa chọn KHÔNG phân loại (lọt chế độ giá) | 31 | 0 |
| bộ chọn việc chủ động bị coi là sự kiện (gắn gợi ý rác) | 16 (vl*, runner, quà, cài người, tẩm, tiệm…) | 0 |
| sự kiện bị để đủ số (showOut) | 1 (menEnc) | 0 |
| tổng: sự kiện PEND / cờ ev / act / shop / kit | 63 pid · 0 ev · 1 act | 47 pid · 22 ev · 25 act · 1 shop · 1 kit |

Chạy thật (`opt-render.js`, phần F: 240 lượt endTurn với mọi hook của game): 170 loại hộp có lựa chọn do game tự đẩy — 169 là sự
kiện (chế độ giá + gợi ý + nhãn rủi ro), 1 là cửa hàng (Hàng chợ đen); 0 hộp lọt.

## Test
- `node dev/test/opt-render.js http://127.0.0.1:<port>/index.html <outdir> <WxH@dpr> [--bot]` (dựng trước bằng `bash dev/site/build_site.sh`;
  phục vụ thư mục worktree bằng `python3 -m http.server <port> --directory <worktree>` — cổng riêng, đừng dùng chung cổng thợ khác).
  A mọi PEND sự kiện · B mọi bộ chọn việc chủ động · C approachOne / FESTEV / kẻ hầu / Ban cung / Xuất gia / Nội vụ phủ / chợ đen ·
  D đêm thật (Bạc −5) · E rõ dần theo Tâm cơ + phân biệt lựa chọn · F lượt chơi thật.
- `python3 dev/test/opt-scan.py --fail` (tĩnh).

## Còn lại / bàn giao
- review/event-balance: rà cân bằng bằng bot (sếp 14:30Z / 15:10Z) — dùng `kitHint(o, m, lv)` để bot "đọc gợi ý".
- Cảnh báo (không phải lỗi): vài hộp có hai lựa chọn cùng gợi ý ở mức mơ hồ (vd. Ban cung "tâu xin cung khác còn trống" ×3; Thanh minh hai
  lựa chọn đều "được tiếng hiền đức" — khác nhau ở Tốn Sức / Bạc).
