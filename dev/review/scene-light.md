# Kiểm duyệt: review/scene-light đợt đầu 6f624274e (phần màu/lọc) gộp lên main 311260527 — PASS (người duyệt R6)

Ngày 2026-11-15. Nhánh: `review/scene-light-r6`. Xung đột duy nhất: `dev/build/assemble.py` (main thêm jseal, nhánh thêm jsl) → thứ tự
`… jk4, jseal, jsl, jmen …`; dựng lại index.html/sw.js/assets.json. Phạm vi duyệt (theo điều phối): chỉ màu/lọc cảnh; da hồng và các commit sau KHÔNG xét.

## Đo trên bản gộp và trên bản live main (1180x820, tháng tư = hạ, nơi ở "Ngọc Thanh các", tranh riêng buổi tam-cung-dem-ha-*)
| Cảnh | main: lọc .scimg / lớp .light | bản gộp: lọc .scimg / lớp .light |
|---|---|---|
| sáng / trưa / chiều, trời quang | brightness(1.35) saturate(.9) sepia(.12) / phủ màu buổi | **none** / trong suốt (b4Light tắt cho tranh riêng buổi) |
| tối, trời quang | none / phủ lam .106 | none / trong suốt |
| sáng / trưa / chiều, mưa | brightness(1.35)… sepia(.12) / phủ màu + lớp mưa xám | saturate(.97) contrast(.94) brightness(1.07) / **ngà ấm** .13→.08 |
| tối, mưa | none / lam + lớp mưa | saturate(.95) contrast(.95) brightness(1.01) / ngà ấm rất nhẹ |
| Lãnh cung chiều, quang / mưa | none / ấm .03 (+ lớp mưa) | none / trong suốt (+ lớp mưa giữ nguyên) — y như cũ bằng mắt |
- Nhân vật: `--klf` = brightness(1) (KIT_LIGHT mặc định độ mạnh 0) → #mefig, .tok.fig, .kesimg giữ màu gốc; .light nằm dưới người.
- Ảnh đặt cạnh nhau cũ/mới: chiều mưa ở bản mới sáng hơn, ấm, hết ngả nâu sepia, khớp tờ dev/art/scene-light/rain-warm-ntc.jpg; tối mưa giữ tối;
  Lãnh cung (Trường Môn viện) không đổi.

## Thử chung
- 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3: sổ cũ (dựng bằng bản live) nạp "ok"; màn chính chiều mưa; hộp thoại việc khó xử
  có hình người (.kesimg filter "brightness(1) drop-shadow…" chạy đúng): 0 tràn ngang, 0 chữ cắt, 0 lỗi trang. 390x844: 0 lỗi (màn xoay ngang chưa có ở main).

## Đáng lo (không chặn)
1. Gộp nhánh mang theo cả phần ngoài phạm vi: KIT_LIGHT (tắt, độ mạnh 0 — không đổi gì), Tuần lục `kitBookFigClamp` (PROGRESS ghi "chưa đo lại"),
   j94 Dư đồ buổi trưa dùng map-<mùa>-trua (4 tranh có trên CDN, HTTP 200), công cụ da hồng/mép (dev/art), ALPHA_HOLES.md ~5,9 nghìn dòng,
   19 ảnh dev/shots/scene-light (~30 MB). Không thấy lỗi ở các phần này khi chạy, nhưng chưa duyệt kỹ.
2. KIT_LIGHT / .kown / .kwet chưa có mục trong KIT.md (luật KIT TRƯỚC): nên ghi một mục "ánh sáng cảnh/nhân vật theo buổi".
3. `.stage.kown .scimg{filter:none}` áp cho MỌI tranh riêng buổi (không chỉ Ngọc Thanh các): mọi nơi có tranh <tên>-<mùa>-<buổi> bỏ lọc cũ
   brightness 1.35/sepia — đúng ý "tranh đã chỉnh màu, sếp duyệt", nhưng cảnh khác chưa được chụp đối chiếu riêng.

# Review r7: review/scene-light f01bae199 (Tuần lục wide figures + CDN art) merged onto main afb2676a2, then aa9689da5 — PASS with notes (reviewer R7)

Branch `review/scene-light-r7`. Only conflict: `dev/kit/KIT.md` (both appended). **Reviewer fix:** the branch's kit text "§41 Scene light"
clashed with main §41 kitMeMark → renumbered to **§56** (scene-light's registry slot), sub-points 56.1–56.3, note in the section and PROGRESS.
Site rebuilt (`dev/site/build_site.sh`).

## (1) j87 Tuần lục figure column (kitBookFigClamp), images loaded from the CDN, person page, main vs merge
| size | normal fig (aspect .43/.48): height % of picture, text overlap | Thái hậu h1-a51 (730×900, aspect .81) main | Thái hậu merge |
|---|---|---|---|
| 755x1000 | 93.5 % both; main overlapped text +29 px → merge −20 px (clear) | 91.7 %, over the text by 263 px | **60.6 %** (scale .648), no overlap |
| 1180x820 | 93.5 %; main +15 → −20 | 93.5 %, over the text by 210 px | **63.0 %** (scale .674) |
| 1366x1024 | 93.5 %; main +47 → −20 | 86.8 %, over the text by 254 px | **57.2 %** (scale .612) |
| 1000x755 | 93.5 %; main +30 → −17 | 87.5 %, over the text by 182 px | **57.8 %** (scale .618) |
| 844x390 (.kbk.narrow, panel over fig edge as before) | 93.5 %, unchanged | 93.5 %, shifted inside | identical to main |
- 0 horizontal overflow, 0 page errors, no figure past the page edge at any size.
- Trade-off (owner 03:55Z "≈85–90 % of picture height, never shrink"): normal figures keep their full size. A figure is shrunk only when wider than
  66 % of the page: aspect > .525 (755x1000), .547 (1180x820), .497 (1366x1024), .502 (1000x755). CDN scan of all 6 622 fig files
  (WebP headers): 160 / 98 / 272 / 244 files (1.5–4 %; median aspect .33). Who: all 12 Thái hậu files, rank t7/t8 trains (8 a18 files with aspect
  .71–.76 → ~65 % height) and t7/t8 a51 / some kids (aspect .55–.61 → 80–90 % height). Accepted as "rare extra-wide figure" per coordinator,
  BUT note: the owner's own example (Thái hậu h1-a51) now shows at ~58–63 % of picture height with an empty upper page — likely owner feedback.
  Options for a follow-up: cap ~80 % on wide pages for figures with aspect > .55, or keep the 66 % column and let the train run behind a paper panel
  like phones.
- m32-t8-a18 re-cut is now 666×900 (aspect .74, still at canvas edge per worker) → in the shrunk group.

## (2) CDN art spot-check (old = git 3374e5310 before img/ left git, new = live CDN)
- Rosy (5 por + 4 matching figs: consort c22-tm0-a26, c09-tm1-a18, c30-tm0-a36, maid m11-t8-a18): max channel change 17–20, 1–4 % of visible px;
  cheeks/lips light pink, not heavy; faces identical (no redraw), alpha unchanged.
- Neck wedge (c12-t6-a26, c15-tm1-a51, maid m31-t5-a51, por c28-t6-a36 + c22/c30 figs): only alpha changed, 55–309 px newly transparent in a small
  box under the ear, 0 newly opaque px; on parchment the dark wedge is gone, no halo; por c28 now shows background between the hanging hair and
  the jaw (reads as a gap in the hair, acceptable).
- 4 re-cut figs (c10-t8-a36 +7, m01-t8-a26 +18, m22-t8-a36 +20, m32-t8-a18 +242 px): train/sleeve extended cleanly, same figure.

## General
- Old save (made with main afb2676a2) loads "ok" in the merge at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: 0 page errors,
  0 horizontal overflow, `.stage.kown` on, `--klf` brightness(1).
- Not blocking: §56 has no kit sample page entry (no visual chip; same as other non-visual kit sections).
- Second main merge aa9689da5 (promo-exam §55, kit-fig2): KIT.md keeps §55 then §56 (also removed a duplicated §38 kitEmotion line the first
  conflict resolution had carried); site rebuilt; Tuần lục measurements and old-save run repeated on the final build: identical, 0 page errors.
