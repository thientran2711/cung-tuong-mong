# BẢNG VINH DANH — bảng xếp hạng chung (sếp 15/11 08:30Z) · nhánh review/rank

Game online cho nhiều người: một bảng chung cho mọi người chơi, người đăng nhập hay khách vô danh.
(a) **Kiếp**: mỗi kiếp của bất kỳ ai là một dòng (nhiều kiếp của một người = nhiều dòng). (b) **Người chơi**: mỗi người một dòng,
xếp theo kiếp tốt nhất, bằng nhau thì theo tổng Công danh mọi kiếp. Ba hạng đầu đứng trên bục vinh danh (kit podium j90), danh sách bên dưới.

## Kiến trúc
```
game (GitHub Pages, máy người chơi)                         Cloudflare (tài khoản 7fc1b88a…)
 dev/build/jrank.js  ── POST /hello /life /name ──►  Worker ctm-rank  ──►  Durable Object "Board" (một bản, SQLite)
  + rank/worker/src/score.js (bảng luật, chung)  ◄── GET /top/lives /top/players /me ──   bảng players · lives · rate · meta
```
- **Worker `ctm-rank`** → **https://ctm-rank.victoria-tntt.workers.dev** (mã `rank/worker/`, triển khai `npx wrangler@4 deploy` trong
  `rank/worker` — khóa do proxy gắn — hoặc GitHub Action `rank-worker.yml` khi `rank/worker/**` đổi trên main; Action chạy 2 bộ unit test trước).
  Worker riêng, KHÔNG đụng `ctm-coop` (co-op) hay `ctm-img` (ảnh).
- **Kho**: một Durable Object `Board` với SQLite (`new_sqlite_classes`). Không dùng D1: khóa API của phiên không có quyền D1
  (`/d1/database` → Authentication error), quyền Workers đủ cho DO. Một DO là một luồng, đủ cho hàng chục nghìn người chơi
  (mỗi yêu cầu vài truy vấn có chỉ mục); khi lớn hơn nữa: tách `lives` theo tháng hoặc chuyển D1 (cùng câu SQL).
- **Mã**: `rank/worker/src/index.js` (CORS, chuyển vào DO, băm IP) · `board.js` (luật lưu trữ + API, không phụ thuộc nơi chạy) ·
  `score.js` (bảng luật Công danh — MỘT NGUỒN, game và Worker cùng nạp) · `test/` (unit test, máy chủ giả cục bộ trên node:sqlite).
- **Game**: `dev/build/jrank.js` (sau jload, trước j84) + `../../rank/worker/src/score.js` (assemble.py nạp ngay trước jrank).
  `window.RANK_URL` đặt trước khi nạp thì đổi địa chỉ (để thử với máy chủ giả).

## Danh tính
- Lần đầu mở game: mã khách ngẫu nhiên 24 chữ (`localStorage ctm-rank-id` = `{gid, pid, pn}`), cũng ghi vào sổ (`S.rkGid`): mất localStorage
  mà còn sổ thì lấy lại mã từ sổ; Chép sổ mang theo mã. Mở game là `POST /hello`: máy chủ nhớ người này (kể cả chưa chơi xong kiếp nào)
  và đặt tên **"Khách vô danh #NNNN"** (4 số từ băm mã, trùng thì tăng).
- Máy chủ chỉ giữ **băm** của mã khách (`gh = sha256("g:"+gid)`); ra ngoài chỉ có `pid` (12 chữ đầu của `sha256("p:"+gid)`). Mã khách
  không bao giờ có trong bảng trả về (test kiểm).
- **Đổi tên hiệu** (nút trên bảng): 2–24 chữ (chữ, số, khoảng trắng, `. ' _ -`), không trùng (so không dấu, không hoa thường:
  "Chân Hoàn" = "chan hoan"), không lời tục (từ tục nguyên chữ có dấu — nên "Du", "Long", "buổi" vẫn được — và chuỗi chữ tục không dấu
  kiểu fuck, vcl, cailon…; danh sách ở `board.js`), không bắt đầu bằng "Khách vô danh". Mỗi ngày đổi tối đa 10 lần.
- **Đăng nhập (để sau, chỗ móc nối đã có)**: bảng `players` có cột `acct` (rỗng). Đề xuất, chọn một:
  1. **Mã khôi phục** (không cần email): Thiết lập → "Mã khôi phục" hiện mã khách dạng 6 nhóm chữ; máy khác "Nhập mã khôi phục" → dùng lại
     mã đó (cùng người, cùng dòng). Không thu gì, chỉ cần giữ mã. Thêm: `POST /link {gid, code}` gộp hai mã khách vào một người.
  2. **Email magic link qua Worker**: `POST /login {gid, email}` → Worker gửi thư (Cloudflare Email Routing / MailChannels) có liên kết
     một lần → `GET /verify?t=` gán `acct = sha256(email)` cho `pid`; máy khác đăng nhập cùng email thì nhận lại `pid` cũ. Cần sếp duyệt
     thu email + chính sách riêng tư. **Hiện KHÔNG thu email.**

## Công danh (điểm một kiếp) — bảng luật một nguồn: `rank/worker/src/score.js` (`CTM_RANK.RULES`)
Tính từ trạng thái kiếp lúc màn kết kiếp mở (không nhận số tự khai):

| Phần | Luật (RULES v1) |
|---|---|
| Phẩm cao nhất | Đáp ứng 100 · Thường tại 200 · Quý nhân 350 · Tần 550 · Phi 800 · Quý phi 1100 · Hoàng quý phi 1500 · **Hoàng hậu 2200**; cung nữ: thô sử 20 · Cung nữ 40 · Đại cung nữ 70 · Chưởng sự cô cô 110 · Nữ quan 160 · Ma ma 110 (lấy số cao nhất) |
| Kết cục (tiêu đề màn kết kiếp) | **Nữ đế 4000** (chừa sẵn) · **Hoàng thái hậu 2500** · Mẫu hậu Hoàng thái hậu 1800 · Được Vương gia che chở 600 · Thái phi 400 · Thành thân / Được ban hôn / Vào vương phủ 250 · Xuất giá 200 · Xuất cung / Ma ma / Xuất gia 150 · kết cục khác (chết, lãnh cung, bị đuổi…) 0 |
| Cơ duyên hiếm | +600 khi kiếp tìm được kết cục hiếm (`S.rareEnd` / `S.rare` / lời kết có "Cơ duyên hiếm") |
| Năm trong cung | 40 mỗi năm tròn (`S.year − 1`), tối đa 40 năm |
| Con cái | hoàng tử 120, công chúa 80 mỗi người con sinh ra, tối đa 12 con (tính con trai trước) |
| Thái tử | 500 mỗi con trai được lập Thái tử (`S.pdw.tz`), tối đa 3 |
| Danh, Đức | lúc cuối kiếp, mỗi bậc ×3, mỗi thứ tính 0–100 (tối đa 600) |
| Tranh ghế | 100 mỗi lần thắng (`S.pdN.tg`), tối đa 5 |
| Kiếp dở dang | chưa tròn 1 năm VÀ dưới Quý nhân (cung nữ: dưới Chưởng sự cô cô): cả kiếp ×0,5 |
Trần: kiếp nào tính ra trên 15000 bị từ chối (kiếp tốt nhất có thể ≈ 12440). Đổi số trong bảng = tăng `RULES.ver`: Worker tự tính lại
mọi kiếp đã lưu từ tóm tắt khi khởi động. Người chơi xem "Cách tính" ngay trên bảng (đọc từ cùng bảng luật).

## API (`https://ctm-rank.victoria-tntt.workers.dev`, JSON, CORS `*`)
| | |
|---|---|
| `POST /hello {gid}` | ghi nhớ người chơi, trả `{me}` (pid, pn tên hiệu, s kiếp tốt nhất, t tổng, k số kiếp, r hạng, of tổng người) |
| `POST /life {gid, lid, life}` | gửi tóm tắt kiếp khi kiếp kết thúc → `{score, parts, rank, of, me}`. `lid` do game tạo: gửi lại = không nhân đôi |
| `POST /name {gid, name}` | đổi tên hiệu → `{ok, me}` hoặc `{ok:false, why}` (lời tiếng Việt hiện thẳng cho người chơi) |
| `GET /top/lives?n=50&gid=` | `{rows, of, mine (kiếp tốt nhất của mình, có hạng, kể cả ngoài top), last (kiếp mới nhất của mình), me}` |
| `GET /top/players?n=50&gid=` | `{rows, of, mine, me}` |
| `GET /me?gid=` | `{me, lives (12 kiếp gần nhất, có hạng)}` · `GET /rules` bảng luật · `GET /health` |

Tóm tắt kiếp `life`: `n` tên nhân vật · `o` mã xuất thân (`on` tên) · `mr` phẩm phi tần cao nhất (−1 = chưa bao giờ là phi tần) · `sr` bậc cung nữ
cao nhất · `mama` · `endk` tiêu đề kết cục · `fate` lời kết · `alive` · `rare` · `y` năm tròn · `age`, `age0` tuổi cuối/đầu · `sons`, `daus` con sinh ra ·
`tz` · `danh`, `duc` · `tg` · `fig`, `por` ảnh toàn thân / chân dung lúc kết kiếp (để dựng bục) · `mode` solo/coop · `seed` hạt giống thân phận
(j52 `NLP.seed`) · `ver` · `t0` · `trail` nhật ký rút gọn `[năm, tháng, "r"|"s"|"k", giá trị]` (thăng phẩm, thăng bậc cung nữ, sinh con; ≤ 80).

## Chống gian lận (cơ bản) — và giới hạn
- Worker tự tính lại điểm từ tóm tắt (số điểm gửi lên bị bỏ qua); kiểm số vô lý (`check`): phẩm 0–7, năm 0–60, tuổi khớp số năm (±1),
  số con ≤ 1,5 × năm + 2, Thái tử ≤ con trai, kết cục cần điều kiện (Hoàng thái hậu cần con trai, Mẫu hậu / Nữ đế cần Hoàng hậu, Thái phi
  cần là phi tần), nhật ký đúng thứ tự thời gian, phẩm trong nhật ký ≤ phẩm cao nhất, số con trong nhật ký ≤ số con; ảnh chỉ nhận
  `img/…webp`; chữ bị cắt ngắn và bỏ ký tự lạ; thân phận lấy tên từ bảng của máy chủ.
- Tần suất: một người ≥ 15 giây giữa hai kiếp, ≤ 60 kiếp/ngày; một IP (băm) ≤ 200 kiếp/ngày, ≤ 400 lần mở/ngày; đổi tên ≤ 10/ngày;
  thân yêu cầu ≤ 16 KB; `lid` của người khác bị từ chối.
- **Giới hạn**: game chạy hoàn toàn ở máy người chơi, nên ai sửa mã/sổ vẫn có thể bịa một kiếp "hợp lý" (vd Hoàng hậu 10 năm). Không chống
  tuyệt đối được nếu không chạy lại cả kiếp ở máy chủ. Hạt giống + nhật ký rút gọn được lưu để kiểm tay / phát hiện bất thường về sau
  (vd chạy lại bot với hạt giống, so nhịp thăng phẩm); có thể thêm "ẩn kiếp" thủ công (xóa dòng trong DO qua một route quản trị có khóa).

## Ngoại tuyến · chơi cùng bạn
- Kiếp kết thúc: tóm tắt vào hàng đợi `localStorage ctm-rank-q` (tối đa 50) rồi mới gửi. Mất mạng: màn kết kiếp ghi "Mạng đứt: kiếp này đã
  ghi lại, có mạng sẽ gửi lên Bảng vinh danh"; gửi lại khi mở game, khi có mạng lại (`online`), khi quay lại game, mỗi phút khi còn hàng đợi.
  Gửi lại cùng `lid` không tạo dòng thứ hai. Bảng mở khi mất mạng: hiện bảng lần trước (`ctm-rank-cache-*`) + "N kiếp chờ gửi".
- Chơi cùng bạn: mỗi người chơi trên máy mình, mã khách riêng, mỗi người một dòng kiếp riêng (`mode:"coop"`).

## Giao diện (kit) — sửa theo sếp 15/11 (nhánh review/rank-ui)
- Tên màn: **"Bảng vàng"** (`RK_T.screen`, đầu `jrank.js`; chữ ở MỘT chỗ). Đầu màn chỉ MỘT tiêu đề (bỏ dấu triện VINH DANH + tiêu đề thứ hai),
  phụ đề số kiếp / số người chơi, nút **✕** (kit-x, KIT 32.10) ở góc phải đóng bảng. Không còn nút "Lui".
- Mở từ: màn đầu (nút "Bảng vàng" cạnh Sổ luân hồi) và thẻ kết kiếp (mục kit "Bảng vàng": Công danh kiếp này · Thứ hạng + nút "Xem Bảng vàng").
- Màn: thanh tab kit `.ksub` "Kiếp | Người chơi"; sân khấu bục j90 (KIT §26 mới: NHÂN VẬT TOÀN THÂN là thứ to nhất, bục = ô bảng tên dưới chân,
  Nhất giữa cao nhất, Nhì trái, Tam phải, huy chương ở góc trên phải ô tên, nhãn "Ta" ở góc trên trái); danh sách có hạng (Hạng · chân dung ·
  tên hiệu + nhân vật · thân phận · Phẩm cao nhất · Kết cục · Công danh; dưới 640 px gộp hai dòng). **Ô chân dung mỗi dòng dùng khung kit theo
  PHẨM CAO NHẤT của kiếp đó** (`rkRole`: Hoàng hậu → frame-consort-7 … Đáp ứng → frame-consort-0; cung nữ → frame-maid-N theo bậc; Ma ma →
  frame-mama), qua `mdH` / `pframe` (j60 `kitDecor`, `__kr`). Dòng của mình tô vàng + nhãn "Ta", và luôn ở đáy (kiếp vừa rồi / kiếp tốt nhất của ta / ta trên bảng).
- Nút dưới: Đổi tên hiệu · Cách tính (`.kbtn alt`). **Cách tính** = thẻ kit nổi trên bảng (tiêu đề + ✕, chạm ra ngoài / Esc đóng): lời dẫn,
  **một kiếp làm ví dụ** (kiếp vừa rồi của ta nếu có, không thì "Ví dụ một kiếp": Phi Tô Uyển Như…) tính bằng chính `CTM_RANK.score` (từng phần +N,
  tổng), rồi bảng điểm đọc từ `RULES` (Phẩm cao nhất: ô kit `kitTiles`; Kết cục: `kitTiles`; Cộng thêm, Bớt đi, Xếp hạng: `kitRows`).
- Điện thoại ngang (≤ 500 px cao, vd 844x390): sân khấu cao đúng phần nhìn thấy (`rkFit`), ô tên gọn, danh sách cuộn bên dưới.
- j90 thêm trường tùy chọn cho mỗi mục bục (không đổi gì cũ): `fig` ảnh toàn thân, `face` chân dung dự phòng, `nameH` tên trên biển,
  `you` nhãn của mình (KIT.md §26).

## Kiểm
- `node rank/worker/test/score.test.mjs` (26 kiểm: từng phần, trần, thứ tự, các tóm tắt vô lý bị từ chối) · `node rank/worker/test/board.test.mjs`
  (34 kiểm: khách, tên mặc định, kiếp, hạng, gửi lại, tần suất, lid người khác, top + dòng của mình ngoài top, mã khách không lộ, người chơi,
  tổng, đổi tên, trùng, tục, /me).
- E2E Playwright `dev/test/rank-e2e.js <game> <rank> <WxH@dpr> <outdir> [bản cũ]` với máy chủ giả `node rank/worker/test/local-server.mjs <port>`
  (cùng board.js trên node:sqlite) — 3 khách giả, 5 kiếp, đổi tên, ngoại tuyến rồi gửi lại, sổ bản cũ; từ 15/11 kiểm thêm: một tiêu đề
  "Bảng vàng" + ✕ không "Lui", nhân vật bục ≥ 55 % chiều cao sân khấu và > 2 lần ô tên, huy chương ở góc ô tên, khung theo phẩm từng dòng,
  thẻ Cách tính (bảng điểm + ví dụ, đóng bằng ✕), thẻ kết kiếp (nhân vật + tên lấp ≥ 95 % cột, tên ở trên, không ô viền, "Xem Bảng vàng").

## PROGRESS
- 15/11: Worker `ctm-rank` triển khai (wrangler qua proxy; bản 3f13e913, rồi d7bcca9b), `/health` 200, `/top/lives` rỗng; `ctm-coop` vẫn 200.
- Kiểm Worker thật trên workerd (`wrangler dev`, DO SQLite thật): `node rank/worker/test/http.test.mjs http://127.0.0.1:<port>` ALL OK
  (hello + CORS, chấm điểm, tần suất, từ chối, top, đổi tên, /me, preflight). Test này ghi dữ liệu: KHÔNG chạy vào bảng thật.
