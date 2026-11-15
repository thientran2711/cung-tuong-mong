# Ảnh trên Cloudflare (CDN) — sếp 15/11 01:30Z: "toàn bộ ảnh đưa lên Cloudflare, KHÔNG lưu trong kho GitHub nữa"

## Tóm tắt cho thợ vẽ (đọc cái này là đủ)
- Ảnh mới / vẽ lại: để file trong `img/` ở máy như cũ, rồi **`python3 dev/site/cdn_sync.py`** (hoặc chỉ tệp đó:
  `python3 dev/site/cdn_sync.py img/fig-x.webp img/FIGURES.json`). **Không `git add img/`** — `img/` nằm trong `.gitignore`.
- Cần ảnh cũ ở máy (cutcheck, porcrop, ghép tờ duyệt…): `python3 dev/site/cdn_sync.py --pull 'img/fig-maid-*'` (glob),
  `--pull` (chỉ các manifest *.json) hoặc `--pull all` (~720 MB).
- Sửa manifest (`img/FIGURES*.json`, `EVENTS.json`, `ACTS.json`, `INFO.json`, `MANIFEST.json`, `map-hotspots.json`…):
  **`--pull` ngay trước khi sửa, đẩy ngay sau khi sửa.** Nếu người khác đã đổi bản trên CDN từ lần bạn kéo về, lệnh đẩy sẽ GIỮ LẠI
  ("HELD") — kéo về, gộp tay, đẩy lại (hoặc `--force` nếu chắc).
- Ảnh + manifest đẩy lên là game thấy ngay (manifest đọc lại mỗi 5 phút, CDN giữ manifest 60 giây) — **không cần dựng lại game**.
- Vẽ lại một ảnh cùng tên: máy người chơi có thể giữ bản cũ tới 7 ngày (bộ đệm trình duyệt) hoặc tới bản dựng sau (sw.js).
  Muốn hiện ngay: đặt tên mới (vd `-v2`) và sửa manifest.
- Kiểm: `python3 dev/site/cdn_sync.py --check` (thoát 1 nếu ở máy có tệp chưa lên CDN hoặc khác CDN).

## Hạ tầng
| | |
|---|---|
| Kho | R2 bucket **`ctm-img`**, tài khoản `7fc1b88a522c6a91b40051536fa02cae` (khóa của phiên có quyền R2: liệt kê/tạo bucket, PUT/GET object qua API) |
| Phục vụ | Worker **`ctm-img`** → **https://ctm-img.victoria-tntt.workers.dev/** (mã: `cdn/worker/`, triển khai `npx wrangler@4 deploy` trong `cdn/worker`, hoặc GitHub Action `img-worker.yml` khi `cdn/worker/**` đổi trên main) |
| Khóa đối tượng | đúng đường dẫn trong kho: `img/fig-consort-c01-t1-a18.webp` → `https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-c01-t1-a18.webp` |
| Mục lục | `img/_index.json` trên CDN = `{base, v, n, bytes, files:[[key, md5[:16], bytes]…]}`, cdn_sync dựng lại từ danh sách bucket sau mỗi lần đẩy |
| Không dùng | r2.dev công khai (sếp dặn). Audio (`audio/`, 4,6 MB, ít đổi) **vẫn ở git**. |

Vì sao R2 + Worker (không phải Pages/static assets): khóa có quyền R2 (đã thử: liệt kê, tạo bucket, PUT); R2 không giới hạn số tệp/dung lượng
như Workers static assets (20 000 tệp, 25 MiB/tệp, phải triển khai lại cả bộ mỗi lần), đẩy từng tệp theo băm, không cần dựng lại Worker;
Worker cho ta tự đặt CORS, Cache-Control, content-type, 304, Range.

Worker trả: CORS `*` (để sw.js, PIXI, canvas đọc được), `Content-Type` theo đuôi, `ETag` (=md5) + `If-None-Match` → 304, `Range` → 206,
`Cache-Control`: ảnh `public, max-age=604800, stale-while-revalidate=2592000`; có `?h=<băm>` → `max-age=31536000, immutable`; `*.json` 60 giây.
Chỉ GET/HEAD/OPTIONS, chỉ khóa `img/…` và `audio/…`; còn lại 404.

Giới hạn API Cloudflare: ~1200 yêu cầu / 5 phút cho cả khóa (dùng chung với deploy co-op, các phiên khác). cdn_sync tự giữ 3,2 yêu cầu/giây
(`CTM_CDN_RATE`), lùi lại khi 429. Đẩy cả kho từ đầu (~11 700 tệp) mất ~60 phút; đẩy vài chục tệp thì vài giây. Tải về (`--pull`) đi qua
Worker công khai, không tốn hạn mức API.

## Trong game
- `dev/build/jcdn.js` (module ĐẦU TIÊN trong `assemble.py`): **`const IMG_BASE="https://ctm-img.victoria-tntt.workers.dev/"`** — hằng duy nhất.
- `assemble.py` đọc hằng đó và đổi mọi `"img/…"`, `'img/…'`, `` `img/…` ``, `url(img/…)` trong các module + `p1.html` thành `IMG_BASE+"img/…"`.
  Mã nguồn vẫn viết `"img/x.webp"` như cũ (thợ khác không phải đổi gì, nhánh khác gộp vào không vỡ).
  `CTM_IMG_BASE= python3 dev/build/assemble.py` (rỗng) = giữ đường dẫn tương đối để thử với ảnh kéo về máy.
- Lúc chạy (jcdn.js): `fetch()` một `*.json` trên CDN thì mọi giá trị `"img/…"` trong đó thành tuyệt đối (FIGURES*.json…);
  ảnh lỗi: đường dẫn cùng nguồn `img/…` (sổ cũ, đường sót) → chuyển sang CDN; ảnh CDN lỗi → thử lại 1 lần sau 1,5 s; vẫn lỗi → chạy
  onerror riêng của ảnh, không có thì ẩn (visibility) để không hiện biểu tượng vỡ. Đếm: `window.KCDN {rewrites, retries, hidden}`.
- `jk2b.js` kitMask: `new Image()` thêm `crossOrigin="anonymous"` (đọc alpha từ canvas cần CORS). PIXI 8 tự tải CORS.

## sw.js / PWA (dev/site/build_site.sh)
- Danh sách lưu trước (như cũ: `img/*.webp` + `img/item512/*.webp`, trừ `fig-/por-/map-fest-/_`; ~900 tệp, ~90 MB) giờ lấy từ
  `img/_index.json` trên CDN, ghi URL tuyệt đối. `build_site.sh` cần mạng tới CDN.
- fetch: yêu cầu tới `IMG` (CDN) được lưu đệm như tệp cùng nguồn, khóa = URL không query; tải lại ở chế độ CORS (không lưu phản hồi
  opaque — Chrome tính mỗi cái ~7 MB hạn mức); `*.json` của CDN: mạng trước, lưu bản sao, ngoại tuyến thì trả bản sao.
- **Gộp với review/loading (sw.tpl.js + assets.json + jload.js)** — loading sửa sw theo hướng khác; khi gộp (thứ tự book-release → loading
  → map-anim → cdn-images), giữ bản loading và đổi đúng 3 chỗ:
  1. `sw.tpl.js` fetch: `if(u.origin!==location.origin)return;` → cho qua cả CDN: `const cdn=u.href.startsWith(IMG);if(!cdn&&u.origin!==location.origin)return;`
     và `relPath(u)` với CDN = `u.pathname.slice(1)` (khóa `img/…`); `asset()` dựng `key` từ `IMG+p+'?h='+h` khi `p` bắt đầu `img/`
     (fetch `{mode:'cors',credentials:'omit'}`).
  2. `assets.py`: không còn `img/` ở máy → lấy danh sách ảnh từ `IMG_BASE img/_index.json` (`files:[[key, md5/16, bytes]]`, băm md5 thay
     sha256 — chỉ cần là khóa nội dung) cộng `audio/` + `icons/` ở máy như cũ.
  3. `jload.js` `keyOf`: `new URL(f[0]+"?h="+f[1], f[0].startsWith("img/")?IMG_BASE:location.href)`.
- Nhánh khác còn mang `img/` (men, palace-map, inventory-origin, loading…): trước khi gộp vào main chạy
  `python3 dev/site/cdn_sync.py --git origin/review/<nhánh>` (đẩy ảnh của nhánh đó, không cần checkout), gộp, rồi `git rm -r --cached img`
  nếu ảnh quay lại cây. Ảnh của các nhánh review hiện có đã được đẩy sẵn (`--missing-only`, xem PROGRESS).

## Lịch sử git (đề xuất, CHƯA làm)
img/ cũ vẫn trong lịch sử (~0,7–1 GB). Không viết lại lịch sử (sếp cấm force-push). Nếu sau này muốn kho nhẹ: tạo kho mới từ một commit
sạch (`git checkout --orphan`) hoặc `git filter-repo --path img --invert-paths` trên bản sao rồi đẩy sang kho MỚI; Pages chuyển sang kho mới.
Cần sếp đồng ý. Thợ có thể clone nhẹ ngay bây giờ: `git clone --filter=blob:none` (chỉ tải blob khi cần).

## PROGRESS
- 01:24Z bucket `ctm-img` tạo; Worker `ctm-img` triển khai (bản afaf6bb3), thử: 200 + CORS + content-type, 304, 206, 404; co-op Worker vẫn 200.
- 01:40Z cdn_sync.py: lần đầu gặp 429 (16 yêu cầu/giây) → thêm nhịp 3,2/giây + lùi; đang đẩy origin/main img/ (11 673 tệp, 715 MB).
- jcdn.js + assemble.py (đổi đường dẫn), build_site.sh (sw từ mục lục CDN), make_site.sh/publish.sh không chép img nữa.
