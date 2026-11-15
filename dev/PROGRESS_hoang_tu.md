# PROGRESS: tab Hoàng tự theo kit chung (review/hoang-tu, từ origin/review/hau-cung-ui d562fe84e + origin/main)

Sếp 09:10Z: tab Hoàng tự "như bảng tường trình" → tab con, dải người + thẻ người như Hậu cung. Sếp 09:20Z: Hôn sự cho cả HOÀNG TỬ.
Mã: `dev/build/jht.js` (assemble: sau jhc, trước jload). KIT §37.

## Đã xong
- 5 tab con (KG.ht): Con của ngươi (kid) · Kế vị (kvo) · Hoàng tự trong cung (kin) · Hôn sự (hon) · Quý tộc kén rể · kén dâu (qt).
  Nhãn dài/ngắn đo sau khi dựng (ResizeObserver): 755 dài, 1180 (iPad hai cột) và 412 ngắn.
- Mỗi tab con = dải người (pager, nhóm theo mẹ / Công chúa–Hoàng tử / Công tử–Quý nữ) + một thẻ người (pcard). Tab trống = một thẻ kit
  (tranh + tiêu đề + 2–3 dòng).
- Hôn sự hoàng tử (gương của j54, cùng luật cho mọi người mẹ): S.qPool quý nữ (8 chưa hứa), bàn từ 16 tuổi, cưới 18; "Xin chỉ ban hôn"
  (Tốn bạc lễ vật; Được: hứa hôn, nhà vợ chống lưng mẹ + con, phe cùng nhà thân +8; Mất: Sủng -3; Kèm: phi tần cao phẩm hơn có con trai
  đến tuổi cũng nhắm mối → khó hơn, ghen -6); NPC mẹ tự xin (20%/tháng, cách 3 tháng); 19+ (18+ mẹ mất) Hoàng thượng hoặc Thái hậu ban hôn;
  Thái tử đã cưới có thể được ban trắc phi. Nhà vợ: p.hon (thế lực phe, tranh ghế như con gái) + k.pW.b → kvW ×1.5 (lập hiền).
- Người lạ: công tử / quý nữ chưa biết = bóng xám, "Người lạ", nhà / phe / tuổi; "Dò hỏi gia thế" (1 khắc, Bạc -5). Thấy trong buổi bàn hôn,
  con gái gặp, hứa / cưới → biết.
- Tên không trùng (tên gọi, họ + chữ cuối) với ai trong kiếp (trước: "Hoa Thị vệ ???" vì trùng tên nam nhân); tên trùng cũ đổi một lần.
- Bàn hôn sự (cả công chúa h54ban) = thẻ việc đầy đủ (showOut), cả khi nạp sổ.
- Tranh: 10 công tử (ct01–ct10, a18 + a26), gpt-2-6, folder ba4aecfe…, style ref = tranh nam (vuonggia-1/2, hoasu-1, nhacsu-1);
  `dev/figwork/congtu/` (spec.py, jobs.json, bg.txt, proc.py → img/fig|por-man-congtu-*.webp + img/FIGURES-congtu.json). cutcheck sạch
  (chỉ "ghost" ở quạt giấy mờ). Quý nữ = áo khuê các img/FIGURES-kc.json (CDN) mặt chưa ai dùng.
  ẢNH KHÔNG COMMIT (luật CDN): điều phối đẩy bằng cdn_sync (lệnh trong báo cáo).

## Thử
- `CTM_IMG_BASE= python3 dev/test/ht-mk.py` (dựng _ht.html + _ht0.html "trước" ở gốc, không commit), `node dev/test/hoang-tu.js <trang> <WxH@dpr> <thư mục> <tag> <kids|nokid|old> [sổ]`.
- Ảnh: dev/shots/hoang-tu/truoc-* (bản cũ, kid + kid-cuoi), sau-<w>-<kids|nokid|old>-<tab>[-2].jpg, sau-*-banhon.jpg, sau-*-qt-after-ask.jpg.
- Cân bằng: `node dev/measure/htbal.js <trang> sens <n> <out.json>` rồi `python3 dev/measure/an7.py out.json`.

## Cân bằng (bot inpage5 "sens", dev/measure/htbal.js, cùng bản trước/sau chỉ khác jht.js) — CHƯA ĐỦ MẪU
- Trước: n=59 · HH 59% · chết sớm 20% · khó sinh 4,6%/lần sinh. Sau: n=80 · HH 52% · chết sớm 24% · khó sinh 6,0%/lần sinh.
- Sai số chuẩn của hiệu HH ≈ ±8,5 điểm với n này: chưa chứng minh được ±3 (bot ~0,7 kiếp/phút/tiến trình). Cần thợ cân bằng chạy ~1000 kiếp mỗi bên.
  Nếu HH tụt thật: giảm `HT.back` (nhà vợ chống lưng [14,9,5]) hoặc chỉ cho NPC xin chỉ khi `roll(20)` → `roll(10)` (jht.js đầu tệp).
