# Kiểm duyệt: review/cdn-images (477d2094b) + review/thinhan-art (6f027b3d3) gộp lên main — PASS

Ngày 2026-11-15, người duyệt kit số 2. Nhánh gộp: `review/cdn-images-merged`, dựng trên origin/main **cfd321e94** (đã qua 1c7a3fcb2 →
75ea33f8c balance-unified + place-card → cfd321e94 naming; gộp lại mỗi lần main đổi). review/hotfix-thinhan đã nằm trong main (diff rỗng).

## Gộp
- `assemble.py`: giữ danh sách module của main (j0, j1, jtime4 … j84) + `jcdn.js` đứng đầu, hàm `cdn()` đổi `img/…` thành URL CDN.
- img/ BỎ khỏi cây (git rm --cached, `.gitignore`): mọi tệp img/ mới của main (thive-3/4, kit/card-back, islot-frame, 54 tranh wd/emo/veil
  của balance-unified) cùng `img/ACTS.json` sửa của thinhan-art đều đã có trên CDN rồi mới bỏ.
- `index.html`/`sw.js`/`assets.json` dựng lại bằng `dev/site/build_site.sh` (core 95,0 MB, fig 652,2 MB).

## (7) Ảnh đã lên CDN trước khi bỏ khỏi git — so từng tệp với mục lục R2 (md5)
So toàn bộ img/ của origin/main (11 695 tệp lúc 1c7a3fcb2, rồi 11 749 tệp lúc 75ea33f8c) với danh sách bucket (etag = md5):
- **Thiếu trên CDN: 22** (thive-3/4 fig/por, kit/card-back, kit/islot-frame-0..4) → người duyệt đẩy (`cdn_sync.py --git origin/main --missing-only`).
  Lúc 75ea33f8c: 0 thiếu.
- **Khác: ~2 136 tệp**. Đều là bản CDN MỚI HƠN, do thợ đẩy thẳng (giờ tải lên R2 sau giờ main có tệp đó): hoa điền nhỏ (m05-huadian),
  hết nốt ruồi (mole-fix, đủ 111 tệp theo MOLE_FIX log), Thái hậu 2/3/5/6 + h1/h3, cảnh trưa/chiều chỉnh màu (scene-light 05:51, sếp duyệt), act mới.
  Ngoại lệ là 2 manifest main mới hơn CDN: `img/FIGURES-others.json` (bản ghi thị vệ thive-3/4) và `img/map-hotspots.json` (zones nam nhân,
  rồi bản balance) → người duyệt đẩy bản main (CDN lúc đó vẫn đúng bản gốc, không ai sửa chen).
- `img/ACTS.json`: bản CDN (act-pics, 04:50) mới hơn cả main lẫn thinhan-art: "Thỉnh an" → act-thinh-an-hh, "Thỉnh an Thái hậu" →
  act-thinh-an-th, "Xin bái kiến" → act-bai-kien, đều là phi tần đứng nhún mình (đạt ý sếp "không giống phạt quỳ"). Giữ bản CDN;
  act-thinh-an-v2 của thinhan-art vẫn có trên CDN, không còn được trỏ tới.
- `img/MANIFEST.json` liệt kê 40 tệp `img/old-nb/*` chưa bao giờ có trong git, game không đọc → bỏ qua.

## (1) Mọi ảnh game tham chiếu trả 200
- `python3 dev/test/cdn-refs.py --head`: **12 173/12 173** mục img/ của assets.json HEAD 200 từ Worker; 56 đường dẫn cố định trong index.html,
  22 006 tham chiếu trong 13 manifest CDN (FIGURES*, EVENTS, ACTS act-<key>, INFO have…), các dòng tên dựng lúc chạy (map-<mùa>-<buổi> 15,
  cảnh 10 nơi × 16 + gốc 170, face-eunuch/official/physician, face-prince/princess 32, bg-origin/origin-wide 16, scar, islot-frame, item-<ITIMG>)
  — **0 thiếu**.
- `node dev/test/cdn-play.js` (sw-serve.js, sổ cũ từ main cfd321e94): Fold 755x1000@2 chơi 3 tuần (12 buổi, 12 lần đi 8 nơi, mọi tab mỗi buổi),
  1180x820@2 / 1000x755@2 / 844x390@3 mỗi khổ 1 tuần: **1 912–2 597 yêu cầu ảnh mỗi khổ, 100 % từ CDN, 0 cùng nguồn, HTTP ≥400: 0, requestfailed: 0**
  (trừ lúc chủ ý ngắt mạng). Khóa thấy trong trình duyệt + họ tên FPOOL/kid/item/map đưa lại vào cdn-refs `--extra`: 0 thiếu.
- **Sửa của người duyệt**: balance-unified (j85) cho Thêu/Nấu biểu tượng `img/theu.webp`, `img/nau.webp` không có ở đâu cả (cả git main) →
  404 rồi `onerror` gỡ ảnh. `AIMG.theu/nau=""` và `ic("")` không vẽ gì: người chơi thấy y như trước, hết 404 (lượt chơi trước sửa: 60 lần 404).
- `FPOOL.man` (face-man-1..8, j22) không có ảnh nhưng không bao giờ được vẽ (bandKeys('man') dùng off*/manold) — không phải lỗi.

## (2) Lần tải đầu §35 + ngoại tuyến
- Màn tải: nền tựa + một khung kit BÁO, kitProgress "17 / 95 MB", "còn chừng một phút", không "%", không "Thôi", không chữ Hán, không tràn,
  ở cả 4 khổ; vào cung sau 75–107 s (máy nhiều thợ). Chip "Thỉnh tranh nhân vật x / 652 MB" chạy nền.
- Ngoại tuyến (Fold): SW ready + điều khiển trang, 1 607 mục CDN trong `ctm-assets`; mở lại không mạng → không màn tải, sổ nạp, Qua buổi được
  (turn tăng), 55 ảnh hiện; 1 hình toàn thân chưa thỉnh (nhóm fig nền) không hiện — đúng thiết kế (fig thỉnh dần). Manifest CDN lấy từ bộ đệm shell.

## (3) Ảnh mới có thật — dev/shots/review/cdn-images/
- `art-hoadien.jpg`: hoa điền nhỏ hẳn (c01 t4, c06 t6, c10 t5, c22 t2, m05 t5 anh đào → hoa nhỏ), trái main | phải CDN.
- `art-notruoi.jpg`: nốt ruồi hết (c09 t5, c17 t3, m52 t1 a36, kid f09, c23 t8, m26 t3).
- `art-thaihau.jpg`: mặt Thái hậu 2/3/5 mới hiền, hết cau có; 6 già đi.
- `art-khuecac-thucung.jpg`: áo khuê các / nhà nghèo (FIGURES-kc, 168 bản ghi) và 22 thú cưng (pet + pet512) có trên CDN.
  GHI CHÚ: mã khuê các (review/khuecac, jkc) và thú cưng (review/pets, jpet) CHƯA ở main — ảnh sẵn trên CDN, hiện trong game khi hai nhánh đó gộp.
- Trong game: thẻ "Thỉnh an Thái hậu" ở Fold hiện tranh đứng mới (`save-755x1000_2-act.jpg`).

## (4) Kit
755x1000@2, 1000x755@2, 1180x820@2, 844x390@3: 0 lỗi trang, 0 lỗi console, 0 tràn ngang, 0 ảnh vỡ trên 7–10 lần quét (tựa, sổ cũ từng tab, sau lượt chơi).
Nhánh không thêm giao diện mới (chỉ đường dẫn ảnh + sw/jload). Có từ trước (không do nhánh): ở 844x390 dải thông tin người trên sân khấu
che một phần tên dưới chân.

## (5) Sổ cũ
Sổ dựng bằng index.html của main (1c7a3fcb2, 75ea33f8c, cfd321e94 — mỗi lần gộp làm lại) nạp được ở cả 4 khổ ("loaded <tên> turn 1"), mọi tab mở.

## (6) coop-e2e trên Worker thật
`node dev/test/coop-e2e.js` (ctm-coop.victoria-tntt.workers.dev, phòng J7GP): **59/59 ok**.

## Đáng lo (không chặn)
- core 95 MB (main 83,5): ảnh thợ đẩy sẵn lên CDN cho nhánh chưa gộp (pets, act-pics, wd, emo, veil.png bị chê) cũng vào assets.json core.
- scene-light đã đẩy 99 cảnh chỉnh màu lên CDN; phần mã tắt lớp phủ b4Light (048c3c925) chưa ở main → cảnh mới + lớp phủ cũ đến khi nhánh đó gộp.
- Các commit gộp đầu nhánh (47dcb40ff, 513f58feb) thiếu dòng Co-Authored-By (commit gộp, không viết lại).
- Lịch sử git vẫn giữ img/ (~0,7–1 GB): bản sao mới nhẹ bằng `git clone --filter=blob:none`; muốn kho nhẹ hẳn phải sang kho mới (CDN.md, cần sếp).

## Thử
`python3 dev/test/cdn-refs.py --head [--extra keys.txt]` · `node dev/test/cdn-play.js <sw-serve URL> <W>x<H>@dpr <outdir> [tuần] [offline]`
(sw-serve: `node dev/test/sw-serve.js 8811 <gốc site> new=<thư mục rỗng> old=<thư mục có index.html của main>`).
