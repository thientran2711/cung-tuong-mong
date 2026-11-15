# PROGRESS review/ts-b — lô B Top 15 (Trùng Sinh đào sâu), luật chơi + sự kiện

Nhánh tạo từ origin/review/book-release (004d90f5). Mã mới: `dev/build/jtsb.js` (trước j84 trong assemble.py). Không vẽ tranh mới.

## Trạng thái từng ý
| Ý | Trạng thái | Ở đâu |
|---|---|---|
| 1 Thả thú dữ làm hại dung nhan (2 chiều) | XONG | act `thathu` (Hại nặng + BANDS[2] + mindMenu). Dùng `scar70` (j70) khi có; base chưa có j70 nên có bản dự phòng cùng dạng `p.scar` (vết cào 1/2/3 nét đã duyệt hiện trên mặt, Sắc giảm tới khi lành, lành dần mỗi tuần). Tự tắt khi j70 vào (kiểm `scarOf`). NPC nhắm vào ai: mưu được hẹn 1–2 tuần (`S.tsbTh`), có ĐIỀM BÁO (tai mắt / chó nhỏ) → thẻ "Điềm lạ quanh cung": Canh giữ cửa cung / Soát quanh cung / Giao kẻ hầu tin cẩn / Bỏ qua. NPC bị nhắm tự canh khi thấy điềm. Không mô tả cách thức. |
| 7 Thú nuôi | XONG | `p.pets`, `p.petOn`. Nguồn: Hoàng thượng ban (Sủng ≥55, thẻ Tạ ơn / Xin gửi lại), nhờ thái giám mua (Tư trang, 60 bạc, Chắc), nam nhân tình ý ≥50 gửi tặng (thẻ Nhận / Trả lại, có rủi ro lời ra tiếng vào). Tối đa 3 con, 1 con theo hầu +1 Tư chất (mèo Sắc, chó Tâm cơ + canh cửa, họa mi Tài, thỏ Đức). Chăm mỗi tuần; Tình trạng < 30 → thẻ điềm "biếng ăn"; bỏ bê tới 0 thì mất. Kẻ thù: act `thaopet` (Hại nhỏ). NPC có thú theo cùng luật. |
| 8 Ấn tượng đầu | XONG | bọc `k61Know`: lần đầu thấy mặt (giai đoạn 0 → ≥1) một phi tần vốn ghen ≥35 / oán ≥15 / ghét ≤-15 / khác phe, đang cùng chỗ → thẻ "Lần đầu gặp mặt" (lời + thái độ theo tính nết, lý do lấy từ số thật). 4 lựa chọn: Nhún nhường / Khéo lời / Đáp trả / Im lặng ghi nhớ. NPC với NPC: bọc `npcLearn` (oán +4, Danh -1 nếu bị người phẩm cao ghét). |
| 9 Bắt nạt đòi của | XONG | act `batnat` "Ép nộp của" (Hại nhỏ + BANDS[1]) + mở rộng `uyhiep` (j78): NPC nhắm vào nàng → thẻ "Bị ép nộp của / Bị uy hiếp đòi của". Đòi bạc HOẶC một món nàng thật có (kể cả đang đeo; chọn món đắt nhất hợp phẩm, hợp tính kẻ đòi), thẻ hiện tranh món đồ. Giao / Không giao đủ hàng + cơ may. Từ lần 2: Báo lên Hoàng hậu (hoặc Thái hậu), Nhờ người che chở, Dùng chứng cứ đáp trả. Giao thì món chuyển thật sang rương kẻ đòi, ghi "Sổ đồ mất" (ai lấy); báo lên thành thì đòi lại được. NPC bị đòi tự quyết theo cùng cơ may, bị đòi nhiều lần có chứng cứ thì tố lên Hoàng hậu. |
| 10 Hậu quả hẹn hò theo thân phận | ĐÃ CÓ SẴN | phi tần: j22 `affairExposed` (nam nhân bị xử, nàng ban chết hoặc lãnh cung) + review/men + review/routes (tư tình, trốn cung, rời cung); cung nữ: j42 (bị đuổi, Tân Giả khố, hẹn ước, xuất cung thành thân); tiểu thư ngoài cung: review/outside. Không làm thêm để khỏi trùng; khi gộp routes/outside chỉ cần kiểm chữ Mất trên thẻ tư tình ghi đúng theo thân phận. |
| 13 Hỏa hoạn | XONG | nguyên nhân thật: đèn nến mùa hanh khô (Đông, nắng gắt, gió heo may), kẻ hầu lơ là (Lòng < 35), kẻ thù phóng hỏa (act `phonghoa`, Hại nặng, hẹn trước + điềm báo như ý 1). Điềm báo trước 2–4 tuần: thẻ "Đèn nến trong cung" (Dặn giữ đèn / Phạt kẻ hầu / Cất đồ quý / Bỏ qua). Lửa chỉ đốt đồ cháy được (vải vóc, thư từ, hương liệu, thuốc bổ, tranh, đàn, đệm, túi thơm, tác phẩm j83); trang sức, Ngự tứ, ngọc bội không cháy. "Sổ đồ mất" trong Tư trang ghi đúng món + nguyên do. Nối lost-items (77679b52, chưa ở base): `S.tsbLog` là sổ riêng; khi gộp jlost có thể cho "tra xét" đọc `S.tsbLog` (how:"cháy"). |
| 15 Đồ tự tay làm để tặng | ĐÃ CÓ SẴN | j83 (review/balance, review/routes): tác phẩm tự tay từ Tài nghệ (thêu khăn, thư pháp, món ăn, tranh…), mang dấu người làm (`w.bn`), người nhận phản ứng theo tính nết ("chân tình" người hiền hậu, "hợp ý" đúng sở thích), NPC cũng làm/tặng. Base book-release chưa có j83 nên không làm trùng. |

## Kiểm
- `python3 dev/build/assemble.py` qua (node --check).
- Playwright Fold 755x1000@2 + iPad 1180x820@2: 0 lỗi trang, không tràn ngang, không cắt chữ trong thẻ (đo scrollWidth). Ảnh: `dev/shots/ts-b/{fold,ipad}-01-omen, 01-thecard-hainang, 07-pet-tutrang, 08-first, 09-batnat-lan2, 13-fire-omen, 13-fire-result`.
- Sổ cũ: sổ ghi trên bản base nạp vào bản mới, qua 6 buổi không lỗi (trường mới đều tùy chọn).
- Bot (dev/measure inpage5, sens, base book-release không có các module cân bằng nên số tuyệt đối không phải mục tiêu): xem mục Số đo.

## Số đo bot (dev/measure/inpage5 sens, runb, máy rất chậm — mẫu nhỏ, dừng giữa chừng vì PAUSE)
- main b165b1f71 không jtsb: n=17, HH 47%, chết sớm 29%, 0 lỗi.
- main + jtsb (trước cân bằng Có người đến): n=11, HH 73%, chết sớm 9%, 2 TIMEOUT (đời dài: turn 195–197, phẩm 6–7, hết 9000 lượt bot; một cái Q=1 — cần soát xem có thẻ jtsb nào bot không bấm được).
- Mẫu quá nhỏ để kết luận (sai số ±20 điểm); bản book-release cũ: base HH 59–70% / chết sớm 0–12%, jtsb HH 57–60%.
- Tần suất (giả lập 285 tuần một đời): thẻ ép nộp của ~1 lần/năm, điềm báo mưu 1, hung tin 2, cháy 0 (bot ít giữ đồ cháy được), thú nuôi NPC 10/12 nàng có.
VIỆC CÒN LẠI KHI TIẾP TỤC: (1) chạy lại bot ≥30 đời mỗi bên trên bản cuối (cfbffb95+); (2) soát 2 TIMEOUT (in state Q[0] khi hết lượt); (3) nếu HH lệch xa base thì giảm tần suất batnat (W.batnat) / thathu.

## Đề xuất tranh (chưa vẽ, chờ điều phối hỏi sếp)
1. 4 tranh thú nuôi dạng vật phẩm (kitItem, nền trong): mèo tuyết, chó nhỏ lông xù, chim họa mi trong lồng, thỏ ngọc. Hiện ô thú nuôi để trống tranh (khung kit + tên), không vẽ bằng code.
2. (Tùy) 1 tranh sự kiện "điềm lạ ban đêm quanh cung" (đèn lồng, bóng cửa) — hiện dùng tranh nơi đang đứng.
Đã dùng tranh có sẵn: ev-hoa-hoan (hỏa hoạn), tranh phòng nơi đang đứng, act-cat-ban-thuong, act-mat-thu.

## Ghi chú cho người gộp
- jtsb bọc: runAct (ngoài cùng, trước j84), showModal-kitFix (hàng Cần cho lựa chọn thẻ: `opt.need=[{t,ok}]`), chooseM, deserQ, k61Know, npcLearn, mindMenu, invHTML, endTurn.
- Tư trang ở base có lỗi sẵn: nút trong thẻ đồ tràn ra ngoài thẻ (không phải do jtsb; review/inventory-origin thay giao diện này). Khối "Thú nuôi" + "Sổ đồ mất" chèn ngay sau hàng nút đầu Tư trang; khi gộp inventory-origin cần đặt lại vào trang mới.

## TẠM DỪNG (điều phối: hết đĩa) — trạng thái
- Xong: ý 1, 7, 8, 9 (cả chi tiết đòi món thật có tranh), 13; 10 và 15 đã có sẵn (xem bảng). Cân bằng "Có người đến" + bảng soát: XONG trong jtsb (đã chụp Fold + iPad: *-20-conguoiden-miamai).
- Nhánh đã gộp origin/main b165b1f71 bằng merge (không force-push, nên không rebase thẳng được).
- Còn: số đo bot đủ mẫu + 2 TIMEOUT (trên); soát servant road j42 cnv* và các thẻ j67/j68/j70 khi chúng vào main.
