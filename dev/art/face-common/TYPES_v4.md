# 4 kiểu mặt MỚI (v4) — ĐỀ XUẤT, chờ chủ chọn (Lượt 629 + ROOT-53 19/11)

Chủ CHƯA quyết bỏ nhóm nào → LOOK_GROUPS.md chưa đổi (không đánh "BỎ"). File này chỉ thêm 4 kiểu mặt mới để xem mẫu.
Câu mặt/biểu cảm nằm trong builder `make_nf3.py` (TYPES = nguồn duy nhất, B6); bảng dưới chép lại để đọc.
Mẫu: s01–s04 (`sNN.v4.FULL.txt`), làm y như c07–c32 (COMMON_v3 nguyên văn + dòng riêng, màu PTONE tên+hex, B15, LOW_TONE, PFAB); chỉ câu mặt + biểu cảm là mới.

| kiểu | mẫu | câu mặt chung (Her face) | biểu cảm (Expression) |
|---|---|---|---|
| KIÊU KỲ | s01 | long refined OVAL, high defined cheekbones, narrow jaw, small firm chin LIFTED slightly (looks a little down along her nose); long narrow PHOENIX eyes (đan phượng nhãn), sharply up-swept outer corners, crisp dark upper lash line, fully open; long slender brows in a high arch toward the temples; straight slim high-bridged nose; THIN well-defined lips firmly closed | proud, haughty, self-assured gaze looking slightly down; faintest cool closed-lip smile |
| LẠNH LÙNG | s02 | LONG narrow OVAL, smooth flat cheeks, straight slender jaw, long tapered chin; narrow CLEAR almond eyes, long and perfectly level, clear light-catching irises, fully open; STRAIGHT thin low level brows, no arch; slim straight nose; small mouth, thin even pale-rose lips | cool, icy, distant composure; calm level gaze; face almost still; very faint barely-there smile |
| QUYẾN RŨ | s03 | soft HEART-OVAL, smooth full cheeks, delicate rounded chin; PEACH-BLOSSOM eyes (đào hoa nhãn): large glossy almond, outer corners curving softly UP, pink flush on lower lids/outer corners, long curled lashes, fully open; slender soft-curved brows; small fine nose; FULL plump rose lips closed; ONE tiny beauty mark below the outer corner of the LEFT eye | alluring warm half-smile, lips closed, one corner a little higher; soft lingering inviting gaze |
| ANH KHÍ | s04 | clean OVAL, clearly DEFINED straight jawline, firm small chin, taut cheeks; THICK dark SHARP straight brows angled up like sword blades (kiếm mi); large bright almond eyes, strong DIRECT gaze, fully open; HIGH straight nose bridge; medium lips, firm even closed line; still beautiful, feminine, never mannish | direct, steady, fearless gaze; confident faint closed-lip smile; head upright |

## Chỗ thay theo từng người (giữ nét kiểu, đổi chi tiết để mỗi người khác nhau)
- KIÊU KỲ: dáng mặt oval dài / trái xoan gò má cao / mặt dài cằm thon; mắt phượng dài / mắt phượng hẹp hơn, đuôi xếch mạnh hơn; môi mỏng / môi mỏng viền rõ, môi dưới hơi dày hơn; mày cong cao / mày dài vút thẳng ra thái dương.
- LẠNH LÙNG: oval dài hẹp / mặt dài thanh, xương hàm thẳng / mặt thon cằm nhọn dài; mắt hạnh hẹp ngang / mắt dài một mí rõ (đôi mí mảnh); mày thẳng thấp / mày thẳng dài nhạt; môi mỏng nhạt / miệng nhỏ môi đều.
- QUYẾN RŨ: tim-oval / trái xoan má đầy / mặt bầu cằm nhỏ; mắt đào hoa lớn / mắt đào hoa dài hơn đuôi cong lên; nốt ruồi duyên dưới mắt TRÁI / dưới mắt PHẢI (chỉ một nốt); môi đầy / môi đầy môi trên cong hình cung.
- ANH KHÍ: oval hàm rõ / mặt hơi vuông thanh / trái xoan cằm chắc; mày kiếm dày / mày kiếm dài xếch nhẹ; mắt hạnh lớn nhìn thẳng / mắt hạnh dài sáng; sống mũi cao thẳng / mũi cao đầu mũi thon.

## Đụng luật (ghi ra, KHÔNG tự sửa luật — Foreman/chủ quyết)
1. QUYẾN RŨ "nốt ruồi duyên dưới mắt" ĐỤNG COMMON_v3 "Bare clean forehead, no forehead mark, no moles." — COMMON giữ nguyên văn; dòng riêng ghi "ONE tiny beauty mark … the only mark on her face". Prompt có hai câu trái nhau → máy có thể bỏ nốt ruồi. Muốn chắc thì phải bỏ "no moles" khỏi COMMON cho kiểu này (cần chủ OK).
2. LẠNH LÙNG "hiếm khi cười / nụ cười rất nhạt" vs COMMON "a natural soft smile" — viết "very faint barely-there smile", vẫn trong luật nhưng nụ cười có thể bị máy làm rõ hơn ý.
3. KIÊU KỲ "cằm hơi ngẩng, nhìn xuống" vs COMMON "whole face clearly visible, eyes fully open (never hooded)" — mắt phượng nhìn xuống dễ thành mí sụp; dòng riêng ghi rõ "fully open". Xem mẫu.
4. ANH KHÍ: không đụng luật nào. Kiếm (vỏ đen) là 1 vật cầm, không phải cốc/chén.
