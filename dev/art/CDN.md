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

## sw.js / PWA (đã gộp với review/loading: sw.tpl.js + assets.json + jload.js) — chỗ đụng, để gộp
- `dev/site/sw.tpl.js`: thêm `const IMG='__IMG__'` (build_site điền IMG_BASE); `relPath()` nhận cả URL CDN (khóa `img/…`), `baseOf(p)`;
  fetch: cho qua nguồn CDN (`cdn`), ảnh CDN khóa ASSETS = `IMG+'img/…?h=<md5/16>'`, tải `{mode:'cors',credentials:'omit'}` (không opaque);
  manifest CDN `img/*.json`: mạng trước, bản sao trong SHELL theo URL tuyệt đối; yêu cầu `&ctmload=1` = jload tự cất (như header x-ctm-load);
  `prune()` không xóa mục `img/` cùng nguồn cũ (để jload dời). Phần index/navigate/swreg của loading giữ nguyên.
- `dev/site/build_site.sh`: SHELLF bỏ `img/*.json` (không còn ở máy), PRE thêm URL CDN của `img/*.json` (không băm vào V — manifest đổi
  không cần dựng lại), `sed __IMG__`.
- `dev/site/assets.py`: có IMG_BASE thì danh sách ảnh lấy từ `img/_index.json` trên CDN (md5/16 thay sha256/16; bỏ `_*`, `old*`),
  audio/icons vẫn quét ở máy. Nhóm core/fig y như cũ (core 83,5 MB — đúng bằng bản main).
- `dev/build/jload.js` (không qua bộ đổi đường dẫn của assemble): `keyOf` dùng IMG_BASE cho `img/…`; tải CDN bằng `&ctmload=1`
  (header riêng sẽ tốn preflight CORS mỗi tệp); `moveCdn()`: mục `ctm-assets` cũ dưới `img/` của site → chép sang khóa CDN khi cùng
  kích thước (không so được băm vì md5 ≠ sha256), rồi xóa mục cũ — máy đã thỉnh ~700 MB không phải tải lại (thử: dev/test/cdn-move.js).
- Nhánh khác còn mang `img/` (men, palace-map, inventory-origin, routes, wardrobe…): trước khi gộp vào main chạy
  `python3 dev/site/cdn_sync.py --git origin/review/<nhánh>` (đẩy ảnh của nhánh, không cần checkout), gộp, rồi `git rm -r -q --cached img`
  nếu ảnh quay lại cây, `bash dev/site/build_site.sh`. KHÔNG đẩy sẵn ảnh của nhánh chưa gộp: assets.json lấy MỌI ảnh trên CDN
  (ảnh phòng của palace-map sẽ vào nhóm core, chặn màn tải) — em đã thử đẩy sẵn rồi gỡ lại 125 tệp (routes/inventory/palace-map).
- Ảnh thợ vẽ đẩy thẳng lên CDN trước khi gộp code (m05, khuê các) cũng vào assets.json ngay — nhỏ thì không sao; bộ lớn nên đẩy lúc gộp.

## Lịch sử git (đề xuất, CHƯA làm)
img/ cũ vẫn trong lịch sử (~0,7–1 GB). Không viết lại lịch sử (sếp cấm force-push). Nếu sau này muốn kho nhẹ: tạo kho mới từ một commit
sạch (`git checkout --orphan`) hoặc `git filter-repo --path img --invert-paths` trên bản sao rồi đẩy sang kho MỚI; Pages chuyển sang kho mới.
Cần sếp đồng ý. Thợ có thể clone nhẹ ngay bây giờ: `git clone --filter=blob:none` (chỉ tải blob khi cần).

## PROGRESS
- 01:24Z bucket `ctm-img` tạo; Worker `ctm-img` triển khai (bản afaf6bb3), thử: 200 + CORS + content-type, 304, 206, 404; co-op Worker vẫn 200.
- 01:40Z cdn_sync.py: lần đầu gặp 429 (16 yêu cầu/giây) → thêm nhịp 3,2/giây + lùi; đang đẩy origin/main img/ (11 673 tệp, 715 MB).
- jcdn.js + assemble.py (đổi đường dẫn), build_site.sh (sw từ mục lục CDN), make_site.sh/publish.sh không chép img nữa.
- 02:20Z điều phối báo: thợ m05-huadian (64 tệp fig/por-maid-m05-t1..t8, 02:12Z) và khuecac (FIGURES-kc.json, *-kc-a18, *-ngheo-a18,
  _kcwork/, 02:03Z) đã đẩy bản MỚI hơn. Dừng đẩy, so toàn bộ CDN với origin/main: 64 tệp m05 khác main = bản của thợ m05 còn nguyên
  (đẩy sau lúc lượt của em đi qua khóa đó), 0 tệp m05 t1–t8 bị đè; FIGURES*.json của main do em đẩy 01:31Z, trước mọi thợ; 98 khóa
  chỉ có trên CDN (khuê các…) không đụng. Phần còn lại (546 tệp) đẩy bằng `--missing-only` (không bao giờ ghi đè).
  Bài học (đã ghi ở trên): đẩy cả kho dùng `--missing-only` khi người khác đã bắt đầu đẩy.
- 02:40Z gộp origin/main 355d6d58 (đợt 2 + loading), nối sw.tpl.js/assets.py/jload.js với CDN; sửa `/^img\//.test` (figPath j39, j28, j35)
  để nhận URL tuyệt đối (trước sửa: 164 lần 404 dạng img/https://…). `git rm --cached img` (11 673 tệp).
- KIỂM (Playwright, máy chậm): Fold 755x1000@2 và iPad 1180x820@2 — sổ cũ (dựng bằng main) nạp được, 8 thẻ + chơi một mình 14 bước:
  ảnh vỡ 0, HTTP 4xx 0, requestfailed 0 (trừ 1 tải nền bị cắt khi chủ ý ngắt mạng), lỗi trang 0, tràn ngang 0; mọi ảnh/ảnh CSS từ CDN
  (630–649 yêu cầu, 0 cùng nguồn); màn co-op mở (Mời bạn / Nhập mã). Ngoại tuyến (Fold): SW sẵn sàng, 464 mục CDN trong bộ đệm, mở lại
  không mạng → màn thỉnh tranh có tranh bìa, "Mạng đứt…", "Vào cung ngay". Dời bộ đệm cũ: moved 1, khóa CDN có.
- Thời gian tải lần đầu (Fold, không SW, máy chậm nhiều thợ — số dao động mạnh): trước loading, live Pages: load 8,3 s, ảnh trung vị
  2,4 s/p90 5,9 s (178 ảnh). Sau loading: live Pages load 116 s (jload tải 83 MB cùng lúc) · bản CDN: load 18,8 s, ảnh trung vị 1,8 s,
  p90 10,3 s (197 ảnh); iPad bản CDN load 18,3 s.

