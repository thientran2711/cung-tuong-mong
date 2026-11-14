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
