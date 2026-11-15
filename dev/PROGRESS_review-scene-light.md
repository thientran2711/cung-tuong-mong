# PROGRESS · review/scene-light (thợ màu tranh nền, 11/15)

Base: `origin/main` (đã gộp main 11/15 vào nhánh, có jcdn/CDN). Tiếp tục trên chính nhánh này.
Ảnh KHÔNG vào git: mọi ảnh đi Cloudflare R2 qua `python3 dev/site/cdn_sync.py img/<tệp>…` (thợ bị chặn chạy cdn_sync → gửi điều phối lệnh + thư mục).
Luôn bắt đầu từ bản CDN (`https://ctm-img.victoria-tntt.workers.dev/img/<tệp>`), không dùng bản cũ ở máy.

## ĐÃ XONG (đã lên CDN / đã đẩy nhánh)
- 103 tranh nền chỉnh màu (99 nơi chốn trưa/chiều/tối + 4 map-*-trua gốc) — CDN. Số đo: dev/art/scene-light/NOTE.txt; tờ all-graded.jpg. Công cụ dev/art/scene-light/grade2.py.
- jsl.js (kit): `--klf` lớp sáng nhân vật, núm `BAL.klfStrength` mặc định 0 (sếp chọn A: không phủ); tắt b4Light trên tranh riêng buổi (`KIT_SCENE_TINT=0`);
  `.stage.kown` bỏ lọc sepia/brightness cũ (p1 .sc-home.day, j25 rp1–3) trên tranh đã chỉnh; trời ướt = ánh xám mát tán xạ (`.kwet`). Tờ weather-home/dtd/lc.jpg. Điều phối: "good" (gửi R3).
- j94: Dư đồ trưa đổi BUK[1] "sang"→"trua" (jtime4z) + `B4_TRUA_IMG=1`.
- Lỗ alpha: dev/art/alpha-holes.py, ALPHA_HOLES.md; đợt 1 (32) + đợt 2 (1 256 fig/por, chỉ lỗ trong khung mặt) — CDN. Tách nền lại c01-t2-a18 (ghép lên bản CDN duyệt) + kid-p01-a14 — CDN.
- Commit cuối trước bản này: 05562ad0d (+ gộp main), xem `git log`.

## ĐANG DỞ (WIP trong commit này)
1. **Thái hậu Tuần lục (j87 fit)** — làm trong jsl.js (không sửa j87): `kitBookFigClamp` dời hình rộng vào trong khung trang `.kbk-person`, chỉ thu nhỏ khi rộng hơn cả khung (giữ luật cỡ kit).
   Đo trước (Thái hậu fig-thaihau-h1-a51 730×900): tràn trái 110–170 px ở cả 6 cỡ (412/390 ra ngoài mép trang). Bản clamp đầu đo được overL=0 ở 755/1366/412/390/1024,
   nhưng có vòng lặp transitionend → đã sửa (đo theo offsetLeft/offsetWidth, bỏ nghe transition/animation). **CHƯA đo lại bản đã sửa** →
   chạy: `python3 dev/build/assemble.py && cp dev/index.html /tmp/x.html && NODE_PATH=$(npm root -g) node dev/art/scene-light/tools/book.js OUTDIR /tmp/x.html`
   (in overL/overR từng cỡ; 0 = không tràn). Còn phải kiểm khe hình sân khấu (j59) và hộp thoại (jk4 kesov) với hình rộng. Tờ: dev/shots/scene-light/book-thaihau-fit.jpg (bản CSS thu nhỏ cũ — làm lại sau khi đo).
2. **Da hồng hào (SẾP DUYỆT)**: a* < 8.0 ≈ 807 por + fig khớp. Công cụ: dev/art/skin-smudge.py (`rosy()`), dev/art/scene-light/tools/hb.py (một lượt mỗi cặp por+fig: đo hoa điền (CHỈ đo, không thu) + hồng hào),
   bsheet.py (tờ trước/sau). Đã tải 4 075/5 318 bản CDN vào .ahcache/hb/img (cache của thợ cũ, mất khi đổi máy — tải lại theo danh sách: mọi por-consort-* + por có a*<8.6, kèm fig-*).
   Việc còn: tải đủ → chạy hb.py theo lô ~150 → bsheet.py mỗi lô → gửi điều phối danh sách tệp + lệnh cdn_sync mỗi lô. Mẫu đã duyệt: dev/shots/scene-light/skin-pale-top40.jpg.
   Lưu ý: hb.py viết thư mục tạm cùng tên gốc (analyse dựa vào tiền tố por-/fig-); fig thiếu khung mặt → `rosy_fig: MISS` (liệt kê, không đẩy lệch cặp).
3. **Da bẩn (nữ, rất nhẹ)**: hiệu chỉnh trên c01-t2 (= "Phi Đoan Mộc Tử Yên"); tên khác: đọc S.P[].face/por trong save khi chạy game bằng Playwright. Chưa làm.
4. **Hoa điền**: CHỈ đo và báo (điều phối: bản CDN c05 t5/t8 đã thu đúng). dev/art/huadian.py (đo; có hàm shrink nhưng KHÔNG dùng). Mốc tỉ lệ theo thước đo này: c05-t5/t8 CDN ≈0.13–0.14; c01-t2 ≈0.054. Báo tệp > ~0.20.
5. **Cắt mép** (dev/art/edge-cut.py, EDGE_CUT.txt, tools/edge-offenders.json = 36 tệp trái/phải ≥25 px): đường rẻ = tools/ec.py (khớp hình CDN vào tờ đã tách nền nguồn, GIỮ nguyên điểm ảnh CDN, chỉ THÊM phần bị cắt từ nguồn).
   Mới chạy được 1 tệp (fig-consort-c10-t8-a36: +7 px trái) rồi dừng. Tệp mà nguồn cũng chạm mép canvas (a18-trái, a51-phải; 752×1344 là tách riêng từng hình) → phải mở rộng tranh (gpt-2-6 ~270 tín dụng/tệp): LIỆT KÊ + giá cho điều phối trước khi tiêu.
   URL nguồn: creations_get theo id `bg` trong FIGURES*.json (token hết hạn → lấy lại).


## SESSION 15/11 ~10:00–11:30Z (worktree /home/user/wt/scene-light, sparse: no dev/shots, dev/owner-shots)
- Env note: system opencv is 5.0 (no CascadeClassifier) → tools needing Haar run with `.ahcache/venv/bin/python` (venv with opencv-python-headless<5).
- DONE (pushed): merge main ca361b147; rain on graded scenes = warm soft light (jsl.js), Ngọc Thanh các checked xuân/hạ × 4 buổi (`.kown` filter none);
  Tuần lục wide figures: kitBookFigClamp widens the figure column (≤ 66 % of page) on wide pages, phones keep shift-inside; KIT.md §56 (was §41 on the branch; renumbered by reviewer r7).
- Neck "dark wedge" (owner 17:40Z, black blob on the neck under the ear): `dev/art/dark-residue.py` (Haar face gating + small upright dark
  triangle under the ear touching transparency) → 795 / 5 750 figs flagged; fix = make the wedge transparent. Work dir .ahcache/hb/neckfix.
  Portraits scanned too (.ahcache/hb/porneckfix).
- Edge cuts: `tools/ec.py` re-run with source cut-outs (Magnific creations_get → .ahcache/ec/bg): extended from source = c10-t8-a36 (+7),
  m01-t8-a26 (+18), m22-t8-a36 (+20), m32-t8-a18 (+3, still at canvas edge). Need OUTPAINT (source sheet itself cut at canvas edge):
  c10-t8-a18, m12-t7-a18, m15-t8-a18, m17-t7-a18, m30-t8-a18, m33-t7-a18, m36-t6-a18 (+ m32-t8 rest). Others in the list = lantern/box
  touching the edge, nothing beyond in the source (not a visible cut). physician-p3-a18: no source id.
- Rosy skin: CDN measure (skin-smudge analyse, a* < 8.0) = 956 por (not 807 — older count); list .ahcache/rosy.txt. Pipeline order per file:
  ec extension → neck wedge → rosy (hb.py) → cdn_sync in batches, delete local.
- LIVE CDN (11:40Z): neck wedge fix 792 + 13 figs (men excluded: nape hair/hat ribbons are real) + 155 por; rosy skin 954 por + 939 figs
  (15 figs MISS = no face box in the fig, por done); 4 figs extended from source sheets. Lists: dev/art/neck-residue-fixed.txt,
  dev/art/skin-rosy-fixed.txt. Sheets (small): dev/art/scene-light/{neck-wedge,rosy}-before-after.jpg, edge-extend.jpg.
  Rescan of the fixed figs: 8 / 799 still flag a smaller second wedge (left as is).
- NOT DONE: smudge clean (skin-smudge fix) — detector still catches wrinkles/beards, not calibrated; rosy uploads did not include it.
  Edge OUTPAINT for 8 figs (list above) — needs Magnific credits (~270 each per earlier estimate), waiting for coordinator.
- LIVE CDN (12:30Z): the 8 edge-cut a18 figures (c10-t8, m12-t7, m15-t8, m17-t7, m30-t8, m32-t8, m33-t7, m36-t6) outpainted:
  left quarter of the original GPT 2.6 sheet + parchment pad → gpt-2-6 edit "continue the cut train" (40 cr each) → Magnific remove
  background → tools/ec.py grafts ONLY the new train onto the CDN figure (CDN pixels kept; Lab colour match; premultiplied feather
  over a 90-px band on the train that crosses the old cut; figure rescaled to 900 tall when the train lies below the old floor:
  ×0.975–0.998, m36 ×0.93). cutcheck unchanged, edge-cut 0. Sheet dev/art/scene-light/edge-outpaint.jpg.
- 13:30Z rework on top of review/scene-light-r7 (coordinator HOLD: wide figures shrank to 57–63 %): wide pages now never scale —
  kitBookFigCol (j87 personBody hook, paginates in the final column) widens the figure column only for face + torso, the rest runs behind
  the text on the paper panel (.kbk-figover). Measured 12 Thái hậu h1–h3 + 8 t7/t8 train figs + 1 normal at 755x1000/1000x755/1180x820/
  1366x1024: height 0.935 everywhere, scale 1, cutL 0, torso clear ≥ 21 px, textCut 0 (tools/bookwide.js). Phones unchanged (open).
- Smudge detector calibrated (skin-smudge.py blobs_only: men out, line-like marks/wrinkles out, eye band, inner face oval, colourless
  greys = hair/props out, ring of skin). Result on 6 338 CDN portraits: 0 real smudges left (top hits are 1–3 px jaw-edge specks) →
  NO smudge batch. Sheet dev/art/scene-light/smudge-calibrated-top12.jpg.

## LỖI ĐÃ BIẾT
- Chạy thử trên máy: màn "Luân hồi" phủ sân khấu → script phải ẩn phần tử phủ (book.js đã làm). Máy không WebGL → không thấy vệt mưa.
- skin-smudge: phát hiện "da bẩn" chủ yếu bắt râu/nếp nhăn → đã bỏ nam khỏi xếp hạng; cần hiệu chỉnh.
- face.py (Haar) đôi khi bắt nhầm vương miện → đã đặt cỡ tối thiểu; huadian.py có dự phòng theo mảng da.
- Scratchpad bị xóa giữa phiên: dùng `.ahcache/` trong worktree (git bỏ qua) cho dữ liệu tạm.

## LỆNH KIỂM
- Dựng: `python3 dev/build/assemble.py` (ra dev/index.html, ảnh từ CDN).
- Thời tiết: dev/art/scene-light/tools/wx.js before|after OUTDIR (+ wxsheet.py). Sách: tools/book.js. Game chung: Playwright route `http://ctm.test/**` → dev/index.html (không chạy server).

## CDN CÒN CHỜ
- Không có tệp đã sửa nào đang chờ đẩy (mọi đợt trước đã lên). Bản c10-t8-a36 nối mép (.ahcache/ec/out) CHƯA kiểm bằng mắt — không đẩy.
