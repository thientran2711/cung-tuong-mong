# Maid ladder PART B (consort identities c01–c32 × maid tiers m0–m4) — branch review/maid-art-b

- Files: img/fig-consort-cNN-tmK-aAA.webp + por-*, img/FIGURES.json role "consort" tier "m0".."m4" (sheet B-cNN-mK).
- Tools: dev/figwork/maidB/ (copy of dev/figwork/maid with WT=scratchpad/wt-maidB; pubm.sh pushes review/maid-art-b).
  mjobs.py adds the m1 (cung nữ) wording for consort faces (pretty embroidered silk ruqun, embroidered sash with tassel, silver hairpins +
  pearl pin + flower, no brocade jacket / no jade) and m1 props; m0/m2/m3/m4 identical to part A. Identity ref = idfix N-cNN-t1.
- Ledgers: dev/figwork/maidB/gens.txt (jid gen), bg.txt (jid gen bg). Sheets: dev/figwork/sheets/B_bN.jpg (cols t1 ref, tm0..tm4).
- Cost: 270 credits per lineup (gpt-2-6, 2:1, 4k, high) + 3 for bg removal.

## Status
- B_b1: c01 m0–m4, c02 m0–m2 done (8 lineups).
- B_b2: c02 m3–m4, c03 m0–m4, c04 m0 done (16 lineups total).
- B_b3: c04 m1–m4, c05 m0–m3 done (24 lineups total).
- B_b4: c05 m4, c06 m0–m4, c07 m0–m1; B_b5: c07 m2–m4, c08 m0–m4 → c01–c08 COMPLETE (40 lineups, 160 figures).
  All checked on sheets: proportions ~1:7, faces match the t1 identity, calm standing, varied props, m0 embroidered + silver trâm (never poor),
  m2 brocade bijia + jade, m3 dark non-red + keys/ledger + gold pin, m4 red + crane square + black winged cap. No green drift.

- From c09 on, mjobs.py AGES wording for the ~48 figure is stricter (hair still DARK, only two or three thin silver strands at one
  temple, no grey streaks) because the earlier wording gave salt-and-pepper sides. Quick look before bg removal: `python3 pv.py OUT.jpg JID...`
  (lineups + a strip of the 48yo heads); rejected gens are re-run and the new line appended to gens.txt (last entry wins).
- B_b6: c09 m0–m4, c10 m0–m2 (48 lineups total).
- B_b7: c10 m3–m4, c11 m0–m4, c12 m0 (56 lineups total).
- B_b8: c12 m1–m4, c13 m0–m3 (64 lineups total).
- B_b9: c13 m4, c14 m0–m4, c15 m0–m1 (72 lineups total). From c17 the 48yo hair line also says "almost as dark as at 32".
- B_b10: c15 m2–m4, c16 m0–m4 → c01–c16 COMPLETE (80 lineups, 320 figures). Known soft spot: some ~48 figures
  (c12-m4, c14-m2/m3/m4, c15-m2/m3, c16-m3) still show more silver at the temples than "two or three strands"; one retry
  (c12-m4) did not fix it, so they were kept.
- From c17 the AGES 48yo line says FULLY DARK, same colour as at 32, at most two barely visible silver hairs (hc.py strip after each batch).
- B_b11: c17 m0–m4, c18 m0–m2 (88 lineups total).
- B_b12: c18 m3–m4, c19 m0–m4, c20 m0 (96 lineups total).
- B_b13: c20 m1–m4, c21 m0–m3 (104 lineups total). c20-m3/m4 48yo hair has a faint grey sheen: recheck in the hair-edit pass.
- B_b14: c21 m4, c22 m0–m4, c23 m0–m1 (112 lineups total). c22-m3/m4 had grey temples: fixed with the hair-only edit (gens.txt last entry = edit gen).
- AGES now also says "no grey sheen".

- B_b15: c23 m2–m4, c24 m0–m4 → c17–c24 COMPLETE (120 lineups total, 480 figures).

## Part B worker #2 (from 2026-11-14 afternoon)
- New worktree: scratchpad(ed00be27…)/wt-maidB (branch maidB2), work copy scratchpad/maidB; paths in mjobs/mproc/msheet/pubm repointed;
  pubm.sh now does fetch + rebase before push. urls.py finds URLs in this session's transcripts (creations_wait output).
- OWNER RULES (binding): NO moles / beauty marks on the face; NO huadian (forehead ornament) for maids at ANY tier m0–m4.
  mjobs.py feat() drops "beauty mark"/"mole"/"huadian" clauses from consorts_feat.json and every prompt ends with
  "No moles, no beauty marks ... No forehead ornament, no huadian ...". Applies from B_b16 (c25) on.
- Per-lineup readable previews: `python3 lv.py ../wt-maidB/dev/figwork/maidB/preview JIDs` → dev/figwork/maidB/preview/B-cNN-mK.jpg (one lineup per file).
- OLD images that may carry a mole (feature list said so; edit away when touched): c01, c04, c07, c09, c12, c15, c17, c20, c23 (m0–m4).
  OLD images that may carry a huadian (c03, c11, c19 m0–m4): remove in the same edit as any hair/mole fix. Status of each is logged below.
- B_b16: c25 m0–m4, c26 m0–m2 (128 lineups total). Clean: dark 48yo hair, no moles, no huadian.
- B_b17: c26 m3–m4, c27 m0–m4, c28 m0 (136 lineups total). Clean.
- B_b18: c28 m1–m4, c29 m0–m3 (144 lineups total). Clean.
- B_b19: c29 m4, c30 m0–m4, c31 m0–m1 (152 lineups total). Clean.
- B_b20: c31 m2–m4, c32 m0–m4 → c25–c32 COMPLETE (160 lineups total = all 32 faces × m0–m4). c32-m4 had a red forehead dot (from the t1 ref's huadian); two edits only faded it, so the last two dots were removed by local pixel inpainting (cv2) on the cutout bg/B-c32-m4-3zbarwMREY.png before mproc.

## Part B worker #3 (2026-11-14 evening) — cleanup pass (hair 48, moles, huadian, cutouts, portraits)
- Worktree scratchpad(ed00be27…)/wt-maidB (branch maidB3), work copy scratchpad/maidB. URLs of all gens/bg ids were re-fetched with
  creations_get (transcripts were lost in the reboot) into scratchpad/urls_all.json (copied to maidB/urls.json for mproc).
- Checked every lineup c01–c24 with heads.py (4 head crops per lineup, raw gen). Found: grey 48yo hair c01–c08 (all), c09, c10-m0/m3,
  c11-m0/m2, c12, c13-m0..m3, c14, c15, c16-m0/m3/m4, c20-m3/m4; moles c01, c04, c07, c09, c12-m4, c15, c17, c20-m2, c23;
  huadian c03-m1, c11 (all), c19 (all), c06-m2/c04-m2 forehead dots. c18, c21, c22, c24 clean; c25–c32 were clean already.
- EDITED 94 lineups (376 figures) with one gpt-2-6 edit each (ref = last gen, 2:1, 4k, high): hair solid dark like the 19yo,
  paint out moles, remove any forehead ornament, "keep everything else exactly the same". c14-m1 and c13-m2 needed a 2nd hair-only
  edit, c01-m2 a 2nd mole edit. New gen ids = last entries of gens.txt / bg.txt.
  Edited: c01–c09 (all), c10-m0/m3, c11 (all), c12 (all), c13-m0..m3, c14 (all), c15 (all), c16-m0/m3/m4, c17 (all), c19 (all),
  c20 (all), c23 (all).
- gpt-2-6 does NOT reliably remove moles/huadian. So: (1) mole.py (scratchpad/tools, copy in maidB/) detects small dark dots on the face
  skin of the raw gen (haar face box, nostril/mouth excluded, PK=60 TD=30, blob area <= 40 px at 3840 — bigger blobs are eyes/brows,
  an earlier run with area<=220 smeared eyes and chins and was redone) and inpaints them on the full painting, copying the result into
  the cut-out before mproc; (2) what was left was fixed by hand with spot2.py (numbered candidate dots on a 4x face crop -> inpaint the
  chosen ones in the 900px fig, R=3..7, then porcrop): c01-m3 (3), c01-m4 (2), c03-m1 (4, huadian), c04-m0/m1/m2/m4 (5), c06-m2,
  c07-m2, c07-m4, c15-m2, c15-m4, c17-m4, c19-m1 (4, huadian), c23-m3, c23-m4. Final face strips: no moles, no forehead marks seen.
- Pipeline used: maidB/proc.sh B LIST(jid gen bg) = download (verified) -> mole fix -> append ledgers -> mproc -> afix -> porcrop.
- CUTOUT: cutcheck (all 640 maid-tier figures) flagged 32 >= 8 (108 >= 3) before. Cause = pale/sheer skirts left half-transparent.
  A Magnific re-matte of a single-figure crop made it worse, so afix.py (alpha>40 and >=3px inside the silhouette -> opaque, rim kept)
  was applied to the 144 untouched figures scoring >=1 and to every re-processed figure. After: 0 >= 8, 3 between 3 and 3.8.
- PORTRAITS: all 640 por-consort-cNN-tmK-aXX re-cut with dev/figwork/porcrop.py -> 384x506 face-centred (was 256x256).
- Credits: ~97 edits x 270 + ~96 bg x 3.

## NEXT (exact)
- Part B maid ladder is COMPLETE and cleaned (see worker #3 above). Nothing left except an optional owner review.
- (B_b16 done) c26 m3 ... c32 m4, in order (8 per batch → sheets B_b16.jpg .. B_b20.jpg). Same per-batch steps as below.
  After each batch check every 48yo head (`python3 hc.py OUT.jpg JIDs`, zoom suspicious ones); grey temples → hair-only edit (below).
- Then the hair-edit pass on the too-grey ~48 figures: c01–c08 (all ranks, check each with hc.py first), c12-m4, c14-m2/m3/m4,
  c15-m2/m3, c16-m3, plus c20-m3/m4 (faint grey sheen). No cutcheck.py exists on main or any branch (checked), so cutouts are checked by eye on the sheets.
  HAIR-ONLY EDIT (proven on c22-m3/m4): images_generate gpt-2-6, 2:1, 4k, quality high, ONE image ref = that lineup's current gen
  (last gens.txt entry), NO style ref, prompt:
  "Edit this image. Keep everything exactly the same (all four figures, faces, outfits, poses, props, ornaments, background,
  composition). Only recolour the hair of every figure, especially the RIGHTMOST oldest lady: the whole hairdo, including the temples,
  the sides and the bun, must be solid DARK black-brown, exactly the same dark colour as the hair of the leftmost young woman. No grey,
  no silver, no white streaks anywhere in the hair. No other changes. No text."
  → append "jid newgen" to gens.txt → pv.py/hc.py check → remove bg → addbg.sh → creations_wait on bg → mproc.py bg.txt JIDs (rewrites
  files + FIGURES.json) → sheet B_fix48a.jpg (msheet) → pubm.sh.
- Per new batch: `python3 bv.py JID...` (compact variable parts; full prompt = `python3 mjobs.py JID`) → images_generate (gpt-2-6, 2:1, 4k,
  quality high, refs [style STY, image idfix N-cNN-t1] as printed, folder ba4aecfe-...) → append "jid gen" to gens.txt → creations_wait
  (last gen is enough before bg) → images_remove_background ×8 → `bash addbg.sh "jids" "bgs"` → creations_wait on the 8 bg ids (urls.py needs
  the wait output in the transcript) → `python3 mproc.py bg.txt JIDs` (~3 min; curl now retries) →
  `TH=150 python3 msheet.py ../sheets/B_bN.jpg consort t1,tm0,tm1,tm2,tm3,tm4 cXX cYY` → `bash pubm.sh "msg" ../sheets/B_bN.jpg`.
- Work copy: scratchpad/maidB (copy of dev/figwork/maidB); worktree scratchpad/wt-maidB (branch maidB → pushes review/maid-art-b).

## Sửa sau kiểm duyệt FAIL (2026-11-14, thợ C-B) — SẴN SÀNG KIỂM LẠI
- Lỗi 1 (640 ảnh cung nữ phần A): 640 tệp img/*maid-m*-tm* trả về ĐÚNG Y như origin/review/maid-art (d97e28e) — `git diff origin/review/maid-art -- <640 tệp>` rỗng;
  dev/figwork/maid/ và dev/figwork/PROGRESS.md cũng y như review/maid-art; img/FIGURES-servants.json trả về như origin/main (nhánh B không đụng bản ghi cung nữ).
  Nhánh này giờ chỉ thay đổi ảnh consort-cNN-tmK + FIGURES.json + công cụ/sheet phần B.
- Lỗi 2 (nốt ruồi): quét tự động cả 640 fig consort-*-tm* (dev/figwork/maidB/mole_scan.py: đốm tối nhỏ tròn trên má hai bên + trán, lọc mũi/miệng/mép mặt),
  duyệt bằng mắt từng ứng viên (tiles.py) rồi vá tại chỗ (spotfix.py, đĩa màu da trung vị) 20 fig: c07-tm4-a18 (trán), c07-tm4-a26/a36, c20-tm2-a26,
  c22-tm0-a18/a26, c22-tm1-a26, c23-tm4-a36, c24-tm0-a36, c24-tm4-a26, c27-tm1-a36, c28-tm0-a26, c28-tm1-a26, c28-tm2-a26/a36/a51, c28-tm3-a26/a51,
  c28-tm4-a18/a26; soi lại bằng lưới phóng to: sạch. Cắt lại 20 por 384x506 (porcrop). cutcheck < 1.2.
- Đã gộp origin/main mới.
- Ghi chú a51 (không chặn theo bản kiểm): soát 160 por a51 — c01–c16 phần lớn ra ~45–50; nhóm trông trẻ (~32–38): c17, c19, c23, c25, c27, c31, c32 (gần như mọi bậc),
  c18-tm0/tm1/tm3, c20-tm0/tm1/tm4, c04-tm2, c11-tm4, c26-tm0/tm1. Nếu cần, làm một lượt sửa gpt-2-6 (ref = gen cuối, chỉ thêm nếp nhẹ cho người ngoài cùng phải).

## Sửa sau kiểm duyệt FAIL 9e831be (thợ sửa #2, 2026-11-14) — SẴN SÀNG KIỂM
- Làm già lại 140 tượng a51 phần B (mọi c01–c32 × m0–m4 trừ các tượng đã đủ già: c01, c02, c03-m1..m3, c07-m0..m3, c08-m0, c13-m2, c20-m3).
  Sửa bằng gpt-2-6 (folder ba4aecfe…), tách nền, cắt chân dung bằng porcrop.py. Sổ: dev/figwork/maidB/agefix/ages.txt (jid crop edit bg).
- Xoá nốt ruồi còn sót (c04-m1/m2, c06-m4, c07-m4, c09-m0..m3, c11-m3, c12-m3/m4, c15-m0..m4, c17, c20-m4, c23, c28-m0/m2/m4).
- cutcheck a51 phần B: max 1.85 (c19-tm0). Ghi chú: vài a26 cũ (không thuộc phạm vi) có điểm 2.8–3.8.
- Nhánh này KHÔNG còn mang tệp phần A: img/*maid-m*, dev/figwork/maid/, PROGRESS.md, FIGURES-servants.json đã khôi phục y như review/maid-art.
