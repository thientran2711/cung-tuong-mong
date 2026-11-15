# PROGRESS · Trung y (review/trung-y) — sếp 15/11 09:15Z

Khi ô Y phục của NÀNG trống (bị thu hồi, bị cướp, tự cởi, chưa có) → hình nàng ở mọi nơi (sân khấu #mefig, hộp thoại, thẻ, chân dung tròn —
mọi chỗ gọi figFor) mặc TRUNG Y đúng bậc. NPC: cùng luật nhưng chỉ dữ liệu + tin đồn (không vẽ).

## Duyệt (điều phối chuyển lời sếp)
- 8 bậc = màu RCOL (KIT §1.3) bản lụa nhạt: Đáp ứng ngà · Thường tại lục nhạt · Quý nhân lam nhạt · Tần hồng phấn · Phi tím nhạt ·
  Quý phi hồng đào · Hoàng quý phi cam nhạt · Hoàng hậu vàng nhạt (viền mây phượng vàng đậm rõ). Kín đáo, viền cùng màu, bậc cao viền tinh hơn.
- 84 mặt (32 consort + 52 maid) × 8 = 672 lần sửa; bỏ 4 look cũ (sổ cũ không S.pid giữ áo thường); cung nữ: bỏ; lãnh cung giữ tranh cold.
- Nguồn: tranh CDN t1 hiện tại (đã thu hoa điền + bỏ nốt ruồi), KHÔNG phải sheet Magnific gốc.
- Luật: ô trống thật sau thu hồi / cướp / cởi; Nội vụ phủ cấp lại áo trơn đúng phẩm sau BAL.ty.reissueWk tuần (rương kitReward);
  cởi áo chỉ trong tẩm cung, không phạt; ra ngoài / gặp người mới phạt.

## Cách làm tranh (dev/art/trung-y/)
1. `ty.py refs` — tấm tham chiếu 2048x1024 từ 4 tranh CDN t1 (fig-<role>-<id>-t1-a18..a51) trên nền giấy; tải lên Magnific (refs.txt: role id creation).
2. Space Magnific "Trung y 8 bậc (review/trung-y)" (a33ac200-…): 8 nút text (prompt bậc 1..8, prompts.py) + 6 làn (creation → 8 image-generator gpt-2-6 4k 2:1).
   Mỗi mẻ: sửa 6 nút creation sang 6 mặt, chạy 6 lượt `downstream` (một lượt/làn — một lượt quá ~27 nút thì lỗi "credits service could not charge";
   nút tách nền trong Space luôn lỗi khi chạy chung nên tách nền làm ở máy).
3. `runs.py RUN:role-id …` đọc trạng thái lượt chạy từ transcript → dòng bg.txt (`role id bậc gen -`); nút lỗi → chạy lại `singular`.
4. `projects_download_zip` 48 gen/mẻ → zips.txt; `fetcher.sh` tải khi còn chỗ đĩa; `worker.sh i/2` ×2 chạy `ty.py proc`:
   rembg isnet-general-use (ở 1920x960) → tách 4 tuổi → fig 900px + por 384x506 (porcrop.py) → recs-*.json.
5. `alpha-holes.py --fix` (từ origin/review/scene-light) + cutcheck; `ty.py sheet` tờ duyệt; `ty.py manifest` → img/FIGURES-ty.json.
Tên tệp: img/fig-<role>-<id>-ty<1..8>-<a18|a26|a36|a51>.webp, img/por-…; bản ghi FIGURES-ty.json {role, identity, ty, tier:"tyN", ageBand, file, por, magnificUrl, bg, sheet}.

## Code (dev/build/jty.js, sau jmen trong assemble.py; số trong BAL.ty ở jbal.js; jearn.js để ô trống)
- figFor(S) → tranh ty đúng mặt (figPick), bậc = rank+1, tuổi gần nhất; thiếu tranh → tranh thường.
- Thu hồi (jearn base→rỗng), cướp → S.tyNvp; tyWeek (endTurn): điềm báo (kẻ thù rel ≤ plotRel, tính cách mưu) → thẻ "Điềm báo";
  Nội vụ phủ cấp áo (kitReward); NPC: mặc áo trong rương, Nội vụ phủ cấp, ra ngoài khi trung y → Danh, tin đồn (newsAdd), bị cướp (hiếm).
- goTo ra ngoài khi trung y → thẻ "Ra ngoài khi mặc trung y?" (Mất: Danh …), đi → Danh -out, đông người -crowd, gặp Hoàng thượng/Thái hậu: tai tiếng
  -royal, Đức -royalDuc; khách (không cùng cung) tới tẩm cung → -meet; mỗi nơi mỗi buổi một lần. Thẻ nơi chốn (jplace) có dòng Mất đỏ.
- Cướp: đi tới nơi khác khi CÓ áo, đêm / nơi vắng / có kẻ thù sai người (sau điềm báo) → thẻ "Bị giật y phục giữa đường", về tẩm cung.
- Tư trang: ô Y phục có "Cởi y phục" (chỉ trong tẩm cung); Mặc lại → hết trung y.
- Test: `node dev/test/trung-y.js <url> 755x1000@2 <out> fold <oldsave.json> <dir ảnh ty ở máy>` (trang phải có <meta charset>).

## Tiến độ (15/11 ~08:55Z)
- ĐÃ XONG + ĐÃ KIỂM: c01–c12 (96 sheet → 384 fig + 384 por) trong img/ của worktree + img/FIGURES-ty.json (384 bản ghi); tờ dev/art/trung-y/batch1-c01-c12.jpg.
  Điều phối: GIỮ, chưa đẩy CDN; đẩy cả bộ một lần sau khi nhánh qua kiểm.
- ĐÃ VẼ (gen trên Magnific, id trong dev/art/trung-y/bg.txt, 408 dòng): c01–c32, m01–m19 (51 mặt). CHƯA VẼ: m20–m52 (33 mặt, ~6 mẻ).
  Ref đã tải lên cho mọi mặt (refs.txt; c17 = eIOPc5QdqL bản tải lại). Lưu ý refs.txt đúng; đọc tay danh sách dễ lệch một dòng (đã lệch một lần, đã sửa nhãn).
- Tách nền: scratchpad chung bị phiên khác xóa sạch lúc ~08:48Z (mất out/ của c13–c22 đang làm). Đã chuyển sang <repo>/.tywork và chạy lại
  `bash dev/art/trung-y/run_bg.sh` (fetcher + 2 worker). Zip: .tywork/zips.txt (b2–b7, hạn 16/11 ~08:00Z); b8 zip uuid a33ae047-41cd-443c-b41d-7c80d7d8382f
  (projects_download status → thêm "b8 <url>" vào .tywork/zips.txt). Quá hạn thì zip lại từ id trong bg.txt.
- Sau mỗi mẻ tách nền: `python3 .tywork/alpha-holes.py --fix .tywork/out <files>`; cutcheck; `ty.py sheet`; chép fig/por vào img/; dựng lại img/FIGURES-ty.json (chỉ tệp có trong img/).
- Lệnh đẩy (điều phối chạy, sau kiểm): `python3 dev/site/cdn_sync.py img/fig-*-ty*.webp img/por-*-ty*.webp img/FIGURES-ty.json`.
- Test Playwright (dev/test/trung-y.js) 755x1000@2 + 1180x820@2: ô trống → ty1/ty4/ty8 đúng bậc ở sân khấu, hộp thoại (ty2), chân dung;
  thẻ ra ngoài "Mất: Danh -5"; tai tiếng trước Hoàng thượng; cướp áo chạy; điềm báo; Nội vụ phủ cấp lại; NPC Danh + tin đồn; sổ cũ (main) nạp; 0 lỗi trang, 0 tràn ngang.


## BÀN GIAO 15/11 ~09:35Z (phiên tiếp tục từ git)
- VẼ: XONG cả 84 mặt (bg.txt 672 dòng = 84×8; m20–m52 vẽ 15/11 08:57–09:17Z, Space a33ac200-206b-4037-b4a6-8ef22bff296b,
  6 nút ref A..F = 3b202139 d189d91f ab326c81 61b823bd b4cb2f82 f4110233; nút lỗi "credits service" chạy lại `singular`). KHÔNG còn mặt nào chưa vẽ.
- TRONG img/ + FIGURES-ty.json (384 bản ghi): CHỈ c01–c12.
- Mẻ 2 c13 c15 c16 c18 c19: đã tách nền + alpha-holes --fix (trong .tywork/out), tờ dev/art/trung-y/batch2-c13-c19.jpg, CHƯA publish vì đáng ngờ:
  alpha-holes báo 238/320 tệp có lỗ trên da (đã sửa), cutcheck sau sửa vẫn cao ở por-* (ghost 6–9k, điểm 24–39, vd por-consort-c19-ty1-a51, por-consort-c16-ty2-a51).
  Việc đầu tiên: soi tờ + vài por phóng to; so với c01–c12 (cùng quy trình?) — nếu là áo trắng/nhạt bị rembg để bán trong suốt thì sửa ở ty.py (vd ngưỡng alpha) rồi cắt lại trước khi chạy phần còn lại.
- ĐÃ TÁCH NỀN Ở MÁY nhưng chưa sửa lỗ / chưa vào img/: c20 c21 (trong .tywork/out, mất nếu .tywork bị xóa — khi đó cắt lại từ zip).
- CHƯA TÁCH NỀN (đã vẽ): c14 c17 c22–c32, m01–m52. Zip (chỉ zip đã tải: b2 b3 b4 đã giải nén một phần vào .tywork/zip; png trong zip/ bị xóa sau khi cắt):
  HẠN: b2–b8 ~08:00–08:53Z 16/11, b9–b14 ~09:02–09:19Z 16/11. Quá hạn → `projects_download_zip` lại từ id trong bg.txt (48 id/mẻ, format png).
  Mẻ zip → mặt: b2–b8 = c13–c32 + m01–m19 (theo thứ tự bg.txt), b9 m20–25, b10 m26–31, b11 m32–37, b12 m38–43, b13 m44–49, b14 m50–52.
```
b2 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ad1b1-034a-4154-8bb6-b9dfb6ff5a97/ty-b2.zip?token=exp=1794816734~hmac=753e6b4ce71be60cb7d8241dbfe076e1db903f9e02425ecd675b92c8c36fe7d9
b3 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ad5c9-e015-4cec-8d9b-490866d4c7e8/ty-b3.zip?token=exp=1794817401~hmac=96e1056c48b8c543430e8a240202a95b057e818d45a21ecf2c1a8b700b64b576
b4 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ad851-7a54-4477-9d57-f894962ae6fd/ty-b4.zip?token=exp=1794817850~hmac=f12282166a648ea6f69e27f95637b8691786ec246f7d037207db84eb61cd3eaf
b5 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33adabc-1200-432c-b56e-e22188255714/ty-b5.zip?token=exp=1794818262~hmac=10b18570afffb0d64517a746af182560a74c0270fcffb47e31ec95b2bbce1391
b6 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33adc6a-7d09-4a81-af44-ba4fbf26d9f4/ty-b6.zip?token=exp=1794818540~hmac=d9aa8af20e8b2a6508852e6e466f21c0c16d171667fb2a101ee7284217bf147f
b7 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ade1d-d1b8-4973-a2ca-4d3967f03252/ty-b7.zip?token=exp=1794818815~hmac=08b49cf6f66e0ee1e916b6aa4b945bf7019a0b16690000a82d8143f536f16a86
b8 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae047-41cd-443c-b41d-7c80d7d8382f/ty-b8.zip?token=exp=1794819188~hmac=1ba407d64ae8e8fdd938c5c47753f60f5a61af0272dac07e06d85cf24dfc3849
b9 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae389-44b8-4299-b800-0ce9268ce03e/ty-b9.zip?token=exp=1794819730~hmac=cee534064c97e8ea4fd2eef9f543a791069ac910c157aeeebbacf229d122633b
b10 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae4a2-d7a7-43be-9ff2-6f338606740f/ty-b10.zip?token=exp=1794819931~hmac=8787f9ac3b3e01d68753c3584a10f1a833f2716870a645e69ce1fcfb9320c6f5
b11 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae62e-0b5c-43fb-9613-8f965277f2c8/ty-b11.zip?token=exp=1794820180~hmac=39e70f089e3058cfeda0c4f729a600620588d4b5293b4cfaf46ac964a415d386
b12 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae746-93ff-4c5d-b5bb-ed2ce2edec25/ty-b12.zip?token=exp=1794820360~hmac=aa7afd3e7be989660f2285780089b384ee5faf0de86c3b97f8d79ebbb5430ba5
b13 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae8d1-83a4-4c36-9045-5e00d4ce8882/ty-b13.zip?token=exp=1794820625~hmac=031f9793f03d45d987b8053bb61eb6897f2b5f70df661dda4fb482dd7c32e6bc
b14 https://pikaso.cdnpk.net/tmp/bulk-downloads/a33ae9db-7f34-428b-84b0-fbf5efa0bbdf/ty-b14.zip?token=exp=1794820731~hmac=c7048a303924a636e8981849995a3d0e6b81fb1b04e06afbfac29d0c356dd6a7
```
- Cách tiếp tục:
  1. `cd <worktree>; mkdir -p .tywork; ` chép khối zip ở trên vào `.tywork/zips.txt`; nếu .tywork mất: `git show origin/review/scene-light:dev/art/alpha-holes.py > .tywork/alpha-holes.py`;
     `pip install "rembg[cpu]==2.0.67"` nếu thiếu. Nếu .tywork/fetched.txt còn thì b2–b4 đã giải nén (xóa dòng khỏi fetched.txt nếu zip/ trống mà mặt chưa cắt).
  2. `ps aux | grep run_bg` (đừng chạy hai bản), rồi `bash dev/art/trung-y/run_bg.sh` (1 fetcher + 2 worker; ~2.4 tờ/phút khi máy bận; ~4 h cho phần còn lại).
  3. Mỗi khi vài mặt xong: `python3 dev/art/trung-y/ty.py complete <role-id...>` → mặt đủ 8×4;
     `python3 .tywork/alpha-holes.py --fix .tywork/out <fig+por của các mặt đó>`; `python3 dev/figwork/cutcheck.py <các tệp>` (≥3 thì soi bằng mắt, cắt lại nếu tệ);
     `TYW=.tywork python3 dev/art/trung-y/ty.py sheet dev/art/trung-y/batchN-....jpg <role-id...>` rồi XEM tờ (hoa điền nhỏ, không nốt ruồi, không chữ Hán, tay);
     `python3 dev/art/trung-y/ty.py publish <role-id...>` (chép vào img/ + dựng lại img/FIGURES-ty.json, giữ bản ghi cũ); commit tờ + code, push review/trung-y.
  4. Đủ 84 mặt (672×4 fig + por) → báo SẴN SÀNG KIỂM; lệnh đẩy (điều phối chạy): `python3 dev/site/cdn_sync.py img/fig-*-ty*.webp img/por-*-ty*.webp img/FIGURES-ty.json`.

## TIẾP TỤC 15/11 ~10:45Z (máy mới, worktree /home/user/wt/trung-y)
- NGUỒN AN TOÀN: zip b2–b14 tải về, giữ dạng `.tywork/src/<gen>.webp` (full-res 3840x1920, webp q96; `dev/art/trung-y/bin/dl2.sh` + `z2src.py`), zip xóa sau khi đổi (đĩa chung chật).
  Danh sách: dev/art/trung-y/sources.txt (HAVE/MISS theo bg.txt). c13–c32 + m01–m19 đủ hết. Mất .tywork → zip lại từ id trong bg.txt (hạn zip cũ 16/11 ~08:00–09:19Z).
- BÁN TRONG SUỐT (c13/15/16/18/19): isnet để áo nhạt / tay áo rủ / tóc alpha 30–200 (tay áo c16 ty5, tóc c16 ty2 a51, tay áo c15 ty1).
  Sửa ở bước cắt: `dev/art/trung-y/refine.py` (khóa màu theo nền giấy đo ở mép tờ: ΔE Lab 7→16 = alpha 0→255, chỉ trong vùng hình isnet;
  xóa cặn nền phẳng (ΔE<4, không vân); lòng hình cách mép >3px → đặc). Áo ngà (ΔE 3–7 so với nền) chỉ được làm đặc lòng hình.
  Kiểm: `bin/solid.py` (tỉ lệ điểm bán trong suốt trong lòng hình fig; >0,5% = cờ) + cutcheck + alpha-holes --fix (bin/fin.sh).
  Mọi mặt c13+ cắt lại từ đầu bằng bản này (bản cắt cũ trên máy cũ bỏ).
- Chạy: `setsid bash -c 'exec -a ty-workers-loop bash .tywork/bin/workers.sh'` (3 worker; máy chung tải ~60 → ~1 tờ/phút).
  Xong vài mặt: `bash .tywork/bin/fin.sh <tag> <role-id...>` → tờ dev/art/trung-y/sheet-<tag>.jpg + por-<tag>.jpg (XEM) →
  `python3 dev/art/trung-y/ty.py publish <ids>` → `python3 dev/site/cdn_sync.py <fig/por của các mặt đó> img/FIGURES-ty.json` → xóa bản trong img/ + out/.
- img/ ở máy chỉ có FIGURES-ty.json (kéo từ CDN); publish giữ bản ghi cũ dù tệp không ở máy.

## 15/11 ~13:30Z
- LÊN CDN (refine v6): c13–c32 (đủ 32 phi tần) + m01–m06. FIGURES-ty.json trên CDN: (384 + 26×32) bản ghi. Tờ duyệt: dev/art/trung-y/sheet-g1..g4 + por-g*.
- refine v7 (lỗ áo ngà phẳng m18 ty1): holes.py → 122 tờ có lỗ kín (redo-v7.txt) đang cắt lại; xong thì cdn_sync các tệp đổi của mặt đã đẩy (md5 tự bỏ qua tệp không đổi), rồi publish m07–m19.
- Chân dung: cỡ mặt theo trung vị tờ (ty.py portraits()), porcheck.py: 0 lỗi ở c01–c22 đã đẩy.
- Bước 4 (m20–m52): ĐÃ VẼ từ trước (PROGRESS 09:35Z), nguồn đủ ở máy → chỉ còn cắt + kiểm + đẩy (worker đang chạy tiếp theo thứ tự bg.txt).

## 15/11 ~14:00Z — BƯỚC 3 XONG
- CDN: c01–c32 + m01–m19 = 51 mặt × 8 bậc × 4 tuổi = 1632 fig + 1632 por; img/FIGURES-ty.json trên CDN 1632 bản ghi (md5 1966a752…).
- refine v7 cắt lại 122 tờ có lỗ kín: 15 tệp đổi (c15 ty7, c19 ty1/ty6, c20 ty4…) đã đẩy lại; còn lại trùng byte.
- Kiểm mỗi nhóm: solid.py 0 bán trong suốt / 1632 fig; porcheck 0; tờ sheet-g1..g5 + por-g1..g4 đã xem.
- Đang chạy: 3 worker cắt m20–m52 (nguồn đủ). Tiếp: fin.sh → xem → pub.sh theo nhóm ~8 mặt.
