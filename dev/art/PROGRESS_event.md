# Event art progress (branch review/event-art)
Data: dev/figwork/events/ev_data.py (categories + scenes + eventId->category). Prompts: prompt.py. Gens log: gens.txt.
Fetch: fetch.py (768x1024 webp q82, ≤250 KB; preview jpg -> dev/shots/event-art/). Manifest: make_json.py -> img/EVENTS.json.
Model gpt-2-6, 3:4, 1k (40 credits each), 1 style ref (bright: Ngự hoa viên cplQijT0eP, dark: tẩm cung đêm iGq8UJy3uK), folder ba4aecfe-...

## Batches
- Mẻ 0 (thử): trieu-chinh, hoang-de-vui, le-xuan nhận; dau-doc chưa đủ tối -> vẽ lại với khuôn tối mạnh hơn.
- Mẻ 1: trieu-chinh-2, tham-quan, duoc-mua, lu-lut, han-han, bien-ai, bien-ai-2, thang-tran: nhận cả 8.
- Mẻ 2: su-than, su-than-2, hoa-than, hoang-de-vui-2, hoang-de-gian, hoang-de-dem, vi-hanh, vi-hanh-2: nhận cả 8.
- Mẻ 3: di-san, quoc-tang, le-xuan-2, le-ha, le-thu(-2,-3), le-dong: nhận cả 8.
- Mẻ 4: le-dong-2, te-le, yen-tiec, sinh-no, con-tre, tang-le, tan-phong nhận; con-tre-2 (thú bông hổ trông hiện đại) -> vẽ lại.
- Mẻ 5: tuyen-tu, thinh-an, khach-den(-2), tranh-sung, cung-nhan, thu-nha, tai-nghe: nhận cả 8.
- Coordinator 11/14: review/events f5b203a = 72 mẫu, khớp danh sách; thêm nhóm chừa sẵn hh-viec (việc Hoàng hậu giao), cung-nu (đời cung nữ), tu-tinh (tư tình), lanh-cung thêm 2 biến thể (đời sống lãnh cung); ánh xạ thêm j3/j24/j54/j55/j22.
- Mẻ 6: thoi-tiet(-2,-3), dieu-troi, dieu-lanh, benh-tat, dich-benh, hoa-hoan: nhận cả 8.
- Mẻ 7 (khuôn tối): tin-don, tai-mat, chuyen-la, dau-doc (vẽ lại, tối hơn), vu-oan (búp bê không mặt), hai-thai, hoi-lo, mat-uoc: nhận cả 8.
- Mẻ 8: hinh-phat, lanh-cung(-2,-3), dai-xa, hh-viec(-2), cung-nu: nhận cả 8.
- Mẻ 9: cung-nu-2, tu-tinh, con-tre-2 (vẽ lại: hổ vải truyền thống): nhận.
## Xong: 52 nhóm, 69 tranh, 232 mã sự kiện. 71 lượt vẽ (69 nhận + 2 bỏ: dau-doc bản đầu, con-tre-2 bản đầu) x 40 = 2840 tín dụng; số dư còn ~2.152.102 (quỹ dùng chung với thợ khác).

# Mệnh truyện (j67, review/stories c78669f): tranh st-*
- Danh mục: dev/figwork/stories/stories.json (47 tuyến, 329 hồi, 167 kết; dump bằng stdump.js). Mỗi tuyến 12 tranh: 7 hồi + bìa + 3–4 kết (+ 'ket' khép lại khi chỉ có 3 kết) = 564 tranh.
- Cách vẽ: lưới 2x2 (4 tranh/lượt), gpt-2-6, 3:4, 2k (65 tín dụng), 1 style ref (Ngự hoa viên), lời cảnh lấy thẳng từ j67 (tiếng Việt) + mô-típ thân phận (MOT trong st_prompt.py) để mỗi thân phận nhận ra được; st_fetch.py tìm rãnh, cắt 4 tấm 768x1024, tờ duyệt cho từng lưới.
- Mẻ S1: tt_co (3 lưới), tt_oan (3), tt_tranh g1-g2, tt_mat (3), dtq_bien (3). tt_tranh:g3 bị bộ lọc tự động từ chối 2 lần -> để cuối.
- Mẻ S2–S4: dtq_vu g1-g2, dtq_binh (3), dtq_huynh g1+g3, muoi_tuoc (3). Đã duyệt từng tờ: không mặt, đúng phong cách, mô-típ thân phận rõ (Tể tướng: chàm-vàng, thư từ; Đại tướng quân: giáp, cờ, hổ phù; buôn muối: bao muối, thuyền, bạc).
- DỪNG GIỮA CHỪNG (07:50Z): bộ lọc tự động của phiên (auto mode) từ chối lẻ tẻ lệnh vẽ (3/30 lượt: tt_tranh:g3 hai lần, dtq_vu:g3, dtq_huynh:g2) với lý do "hành động không mong muốn". Em dừng để chủ phiên/sếp xác nhận rồi mới vẽ tiếp, không cố lách.
- Đã có: 24 lưới = 96 tranh st-* (9 tuyến: tt_co, tt_oan, tt_mat, dtq_bien, dtq_binh, muoi_tuoc đủ 12/12; tt_tranh, dtq_vu, dtq_huynh 8/12). Còn: 117 lưới (38 tuyến + 3 lưới bị từ chối) ≈ 468 tranh, ≈ 7.600 tín dụng.
- Vẽ tiếp: `python3 st_prompt.py --next 6` (bỏ qua denied.txt; RETRY=1 để gồm cả lưới bị từ chối) -> images_generate (gpt-2-6, 3:4, 2k, style ref cplQijT0eP, folder ba4aecfe-...) -> ghi "lưới id" vào gens.txt -> creations_wait -> `python3 st_fetch.py <lưới..>` (đọc URL từ mọi transcript; tờ duyệt ở scratchpad/stsheets) -> `python3 st_json.py`.
- Thiếu tranh thì stArtOf() lùi về bìa tuyến, rồi về nhóm ev-* hợp chủ đề (EVENTS.json stories[arc].fb/efb), nên mọi tuyến đã có tranh hiển thị.
