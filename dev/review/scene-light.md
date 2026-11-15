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

# Review r7: review/scene-light f01bae199 (Tuần lục wide figures + CDN art) merged onto main afb2676a2, then aa9689da5, then 31907911d — PASS with notes (reviewer R7)

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
- Third main merge 31907911d (j83-variety): built files only, rebuilt; old save loads ok at all 6 sizes, 0 page errors.

# Review r8: review/scene-light af6a7123 (kitBookFigCol / .kbk-figover, outpaint 8 figs) merged onto main b8a58e87 — FAIL (reviewer R8)
Branch `review/scene-light-r8` (merge e49f3261; conflicts only in built files assets.json/index.html/sw.js → rebuilt with dev/site/build_site.sh).
KIT §56.3 documents kitBookFigCol + .kbk-figover (kit-only, no private UI found).

## PASS parts
- tools/bookwide.js (4 facts) on all 12 Thái hậu h1–h3 + 8 a18 train figs at 755x1000 / 1000x755 / 1180x820 / 1366x1024:
  hRatio 0.935 everywhere, scale 1, cutL 0, torso clear 15–25 px, 0 h-overflow, 0 page errors (two tool artifacts re-checked by eye: ok).
- Outpainted 8 a18 figs (CDN vs git 3374e5310): faces/huadian identical (only the earlier rosy pass shows), train joins invisible on parchment;
  m32-t8-a18 still has 7 opaque px in column 0 (train tip touches the canvas edge, not visible as a cut).
- Old save (made on origin/main) loads at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: 0 page errors, 0 overflow,
  .stage.kown on; the real dawn Tuần lục opens. No rotate prompt exists on main or here (390x844 plays portrait) — not this branch.

## FAIL
1. Text cut on .kbk-figover pages: pagination (j87 paginate, .kbk-measure) runs without .kbk-figover, whose panel padding (.2em .4em on
   .kbk-phead and .kbk-flow) is added later by kitBookFigClamp → the narrower/taller live column overflows. Repro: Thái hậu h1-a51 person page
   with 14 facts: 755x1000 page 1 last fact cut ("phải phép." lost, 26 px); 1366x1024 page 4 fact "Mục11x" cut mid-sentence.
   Fix idea: give the panel no layout cost (e.g. box-shadow spread instead of padding) or emit .kbk-figover from personBody so the measure sees it.
2. One-time re-layout jumps the reader: when a figure's aspect arrives after the book is open, kitBookFigCol dispatches a window resize →
   layout(logical) restores by page SPEC (src), i.e. the FIRST page of that person. Repro (fig responses held, reader on a "(tiếp theo)" page):
   755x1000 "Trang 2 / 4" (Mục7–13) → after load "Trang 1 / 6" (Mục0–3). Also the dispatched global resize runs every game resize handler.
3. Text column too narrow on wide spreads: 1000x755 Thái hậu h1-a51 text column 90–100 px → words broken mid-word ("thưởn g", "Mục0 x"),
   ONE fact per page (14 facts → 14–16 pages); after the late re-layout the page-1 heading showed no name. 1180x820/1366x1024: 130–150 px
   (2–3 facts per page, readable). Needs a minimum text width (coordinator/owner trade-off vs 85–93 % height; 85 % is still in range).
- Note: phone-width scaling unchanged (narrow portrait not a supported layout per owner 05:50Z) — acceptable.

# Review r9: review/scene-light db2c0efc3 merged onto main b0052d607 — PASS (reviewer R9)
Branch `review/scene-light-r9` (merge cf0aadcfb; conflicts only in built files assets.json/index.html/sw.js → rebuilt with dev/site/build_site.sh).

## r8 failures
1. Text cut (.kbk-figover): FIXED. Panel = background + box-shadow spread (no padding/layout cost). book-figwide.js textCut 0 on every page,
   12 Thái hậu + 3 long-train (m33-t7-a18, c10-t8-a18, m32-t8-a18) + normal c01, 14 facts, at 755x1000 / 1000x755 / 1180x820 / 1366x1024.
2. Late re-layout: FIXED. kitBookFigCol calls root.__kbk.relayout() (layout(logical,logicalB)); book-relayout.js (h1-a51 and c10-t8-a18,
   TURNS 1/2) keeps the fact in view at all 4 sizes, 0 window resize dispatched. Extra probe releasing the picture DURING a page turn
   (0/150/300 ms): fact kept, wide column applied, no stuck state.
3. Text column: FIXED within the coordinator's limits. Text ≥ 220 px at 755x1000 / 1180x820 / 1366x1024; 182 px at 1000x755 (normal figure
   there: 169 px — accepted). Figure height 0.849–0.936, never scaled, torso clear 14–28 px, body never cut (cutL 0), name on page 1, 0 broken
   words, ≥ 2 facts per page. Train past the left edge ≤ 149 px (c10-t8-a18 @1366) ends in the 48 px fade (looked at shots).
   Screenshots of Thái hậu h1-a51 page 1 at all 4 sizes: face/torso clear, text whole, heading "Thái hậu" on page 1.

## Reviewer change
- dev/test/book-figwide.js: 8 s warm-up after start() (+ fonts.ready). Without it the FIRST wide figure of a cold page was sometimes measured
  while the book's paper art/fonts were still loading (__kbkRatio from defaults → transient text 199–202 px for ~5–9 s, then 220 px). Probe on
  a warm page: column correct within 1–5 s (the CORS shape fetch), text 220 px. Real books open long after load, so not a game bug.
  With the warm-up: 2 × 2 sizes + 1 full run of all 16 figures × 4 sizes: ALL OK.

## General
- Old save (mk-oldsave2.js on origin/main build) loads + 3 buổi at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: 0 page errors,
  0 h-overflow, .stage.kown on.
- sheet-turn.js and page-curl.js at 755x1000, 1000x755, 1180x820, 1366x1024: one #panel, no overflow, no stuck sheet, errs [].
- Kit: §56.3 documents kitBookFigCol + .kbk-figover; no private UI.
- Main moved during review → second merge origin/main 888463759 (event-balance, tassel-fix, game-feel; built files only, rebuilt). Re-run on
  this final build: book-figwide.js all 16 figures × 4 sizes ALL OK (64 ok), book-relayout.js ALL OK, old save (made on 888463759) loads at
  6 sizes with 0 errors / 0 overflow, sheet-turn + page-curl at 755x1000 and 1366x1024 errs [] / no overflow.
