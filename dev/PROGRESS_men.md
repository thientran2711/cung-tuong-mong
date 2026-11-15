# PROGRESS: nam nhân trong cung (review/men, từ origin/review/page-curl)

Kế hoạch: dev/MEN_PLAN.md. Mã: dev/build/jmen.js (assemble: sau jk4, trước j84). Không vẽ tranh mới (chỉ tranh nam có sẵn).

## Đã xong
- Chỗ + lý do theo buổi (`menPlace`, wrap placeWhere, chỉ đường phi tần): thị vệ trực (4 người, mỗi người một dáng thive-1..4 theo thứ tự trong menGuards qua figPick),
  Thái y có lệnh truyền vào cung phi tần ốm/có thai, Vương gia (lễ tết ở vườn, thỉnh an Thái hậu), Nhạc sư/Họa sư có lệnh Nội vụ phủ,
  Sứ thần (Ngự thư phòng sáng, yến lễ tết), quan j55 (`S.minW`: chầu sáng ở Ngự thư phòng, yến lễ tết) lên sân khấu (kind "min").
- Vùng: `menZone` + `zones`/`outerCourt` trong img/map-hotspots.json; Ngoại triều = nhãn thường trên dư đồ + dấu khóa nhỏ (.kmlock, chờ nhãn kit của
  người tích hợp ở review/book-release thay vào) + dòng lý do; chạm (qua j77Tap) mở thẻ kit LUẬT: lý do, ai được vào, "Hỏi thái giám tin ngoại triều"
  (Bạc -5, 1 khắc: quan nào vào chầu buổi này), "Thôi". Bỏ lớp xám (chủ 11/15);
  mô tả nơi chốn thêm câu luật vùng.
- Kẻ lạc vào hậu cung (`MEN.stray` theo buổi, ×lễ tết, ×mưa; vườn/lãnh cung/cung phi tần; tư tình thật j22 `v.affair` gặp đêm).
  Ngươi đến đúng nơi, hoặc đi đường ngang qua hậu cung (`MEN.path` 25) → thẻ sự kiện PEND `menEnc` (chỉ hiện giá, hình toàn thân qua `stage`,
  tranh nơi chốn qua `headArt`): Báo thị vệ · Báo Cung Chính ti · Giấu giúp · Núp nghe lén (thành → thẻ tiếp theo, biết tên, sự thật, chứng cứ j78) ·
  Làm như không thấy. Kết quả = thẻ kết quả (log).
- Kết quả dùng chung cho ngươi và NPC: `menReport` (hắn bị phạt/đuổi/xử trảm; phi tần đi cùng bị phạt/ban chết nếu tư tình thật; chối được theo may rủi;
  Danh, Thái hậu, Sủng; oán; thù), `menHide` (chứng cứ + ơn, lộ thì bị phạt). NPC thấy theo nết (`menDecide`). Ngươi nói chuyện riêng với nam nhân ở hậu cung
  khi có phi tần khác → có thể bị báo / giữ làm chứng cứ.
- Bí mật thành đòn bẩy: "Uy hiếp hắn" trên thẻ hắn (khai tin thật về phi tần hoặc nộp bạc; hỏng → ôm hận). Hận → tin đồn (Danh -3, tối đa 2 lần).
- Tên: người lạ "???" trên sân khấu (sửa lỗi j22 cắt tên "Thị Uyên"); thẻ không có `who` để hắn không tự xưng tên (j61).

## Đo (dev/measure/men.js, bot inpage5 + "người đi dạo")
- Bot sensible gần như không đi dạo (34 lần / 7 năm) → thêm tham số walk. walk=1: 16 lần đi/năm, gặp 0,63 lần/năm (≈ 0,04 mỗi lần đi;
  người chơi đi ~1 lần mỗi buổi ≈ 108 lần/năm → khoảng 3–4 lần/năm, đúng đích "vài lần một năm").
- Kẻ lạc ~10/năm; NPC thấy ~2,4/năm, NPC báo ~0,8/năm (tin trong cung). Không crash, không lỗi trang, ghi/nạp sổ trong bot sạch.

## Thử
- dev/test/men.js: sổ cũ (bản không jmen) nạp được; thẻ bắt gặp; sân khấu có nam nhân; dư đồ có Ngoại triều.
  686x880@2.2 và 1180x820@2: không lỗi, không tràn ngang, không cắt chữ. Ảnh: dev/shots/men/{fold,ipad}-{card,stage,map}.jpg.

## Còn lại / ghi chú
- Đường cung nữ (isSrv) giữ cách cũ j42 (chưa có thẻ bắt gặp).
- Nam nhân lạ (bóng người) chưa cao hơn 7% (j59 chỉ nhận tranh fig-man/official…); nhỏ.
- Đêm Ngự hoa viên đóng cửa (j41 ACC_DAY): kẻ lạc đêm ở vườn chỉ gặp khi Lẻn vào hoặc đi ngang.

## 15/11 (lệnh điều phối)
- Gộp origin/review/book-release (381b2469: page-curl + fold-layout KIT_FIG + main) — sạch, không xung đột.
- KIT_FIG.fac (jkit.js): bóng người lạ nam (unknown-fig-m) cũng ×1.08 như đàn ông.
- Ngoại triều: nhãn + khóa + thẻ kit (xem trên). Ảnh: dev/shots/men/*-ntcard.jpg.

## 15/11 — 4 dáng thị vệ riêng
- Vẽ thêm thive-3 (giáp vảy đồng-vàng trên áo lam sẫm, mũ trụ chùm lông đỏ, cầm giáo) và thive-4 (giáp da đen + thép trên áo đỏ thẫm viền chàm,
  búi nửa đầu, hai tay đặt trên chuôi kiếm), 4 tuổi a18/a26/a36/a51, gpt-2-6 1728x576 2k, style ref = lineup thive-1 (s7ocTncl8e).
  Gen: ksDDnoL16B (thive-3), Syttpu5Ub8 (thive-4); cắt từng người + Magnific tách nền; fig 900 cao, por 384x506 bằng porcrop.py (chạy `python3 -I`, vì dev/figwork/cv2.py che OpenCV).
- img/FIGURES-others.json: +8 mục (role man, sub thive, identity thive-3/4). jmen.js: thị vệ thứ i → thive-(i+1), tính lại theo chỉ số nên sổ cũ đã lưu fid dùng chung cũng được chia lại.
- Bảng: dev/shots/men/thive-all.jpg. cutcheck: fig ≤1.41 (như thive-2), por ghost do chùm lông/tóc (như thive-2).
