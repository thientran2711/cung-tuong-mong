# BUILDFIX3 — builder / gate worker · child of ROOT-B2 (session_01D3E3NbYsQwytXuwoYF3EXh) · successor of BUILDFIX2
depth 2 (limit 8) · START_CTX ~3 % · now ~30 % → START+25 % reached → handover below · 0 gens (owner L2084 hold) · base dfe8ef42

## Cho sếp (tóm tắt)
- Máy dựng lời vẽ mùa thu nay ra đủ 8 bậc (Quý phi theo chữ L2088, Hoàng quý phi L2050, Hoàng hậu L2023), có lời sửa cổ (viền không chạy lên cổ) bậc 1–6, áo choàng Tần mép lượn sóng nhẹ cho mọi người, Tần/Phi giữ vải lụa mỏng như hình sếp đã duyệt.
- Sửa máy duyệt: trước đây bậc 3 (Quý nhân) bị đánh hỏng ở MỌI mùa, bậc 6–7 xuân/hạ/thu hỏng hơn nửa. Nay gốc, xuân, hạ, đông: 112/112 người qua ở mọi bậc (a18). Thu chỉ còn lỗi "dài quá 10 000 chữ" ở bậc 3/6/7/8.
- Màu "hồng tro" (ash rose) của 17 người mùa thu đổi tên thành "mauve rose", giữ nguyên màu (luật không xám).
- Máy duyệt đọc được tên file cung nữ (so riêng bộ Đường với bộ Đường).
- Chưa vẽ gì (lệnh dừng vẽ L2084).

## What changed (commits 8e48aa7f d4693d2d ab17794d 2817bf93 facd9d01 + last)
| file | change |
|---|---|
| person_gate.py | maid names `<pid>_<rank>[_ha_DUONG][_<age>]_L<n>` → key `maid:<rank>[/DUONG-ha]@<age>` (ROOT-B2: compare only within the same era+season set); P checks skipped for maids. P3 face = KC_REFS face_words (= FACE_MAP_L703 current face, ROOT-B2 Q2), else v5/v3. a22 = a18 alias (design ages a18 a26 a36 a51 a65 only, item-rank-age.md; a18 prompts say 'about 22'), other unknown ages skip P checks (WARN), never P0. |
| store-all/thu_ladder.py | SRC t6 = s62_t6_THU_vankien2_L2088 (VE12), t7 = L2050, t8 = L2023; REFS per rank (t6: her cut + TdwDfOyVNR + YMl2p0yWeC; t7/t8: her cut + TdwDfOyVNR + kseQCFw16B); KINDS_R / DROP_R / ADD_R (t7 COLOUR RULE + HQP LUXURY; t8 COLOUR RULE inside Outfit, builder's separate one dropped; t7/t8 add JEWELLERY + 'Collar SHAPE exactly as in image 3'); t4/t5 'The FABRIC is' = approved thin silk (ROOT-B2 answer 1); NECK bracket t1–t6 + t1–t3 'at the sleeves and hem' + t4 'no trim band up the neck' dropped (THUROOT2 @955482ad family); t4 CAPELET CUT neutral edge 'a soft scalloped, gently wavy curve (lượn sóng)' for everyone (owner L2070); t6 COLOUR RULE 'any cape' → 'cloud collar'. |
| store-all/build_all.py | thu ladder ranks 1–8; thu_slots78 (main/sec + main hex); THU_TRIMS_RANK (t6 'Image 2 is only a colour reference…' dedup as L2088 .keep; t7/t8 '; the royal yellow in the robe is exactly that colour'; t8 'An imperial consort, the Empress.'); THU_MARK strict ('straight SQUARE NECKLINE (a LOW open square neckline'); gate() passes `--season`; _sec_slot keeps her season secondary hex where the store clause has one (t1–t6 and t7/t8 linings). |
| check_store.py | `--season X` arg (builder passes it): xuân/hạ season_store on the store text; thu path only for thu (was: every t3 read as thu); thu path t1–t8 (--t7 / none); thu_fabric_waiver (t4/t5 thu + approved M06 → B26 waived, WARN 'B26 THU WAIVER'); F16 'peach-tinged' colour word; KC face sentences stripped one by one for the BANNED scan (X08 m13 'PHOENIX eyes', X11 m43 'covering the teeth' false FAILs). |
| face-common/palettes_season.json, palettes3/make_live_L1726.py | 'ash rose' → 'mauve rose', same hex (ROOT-B2 Q3): c02 c26 m10 m18 s09 s15 s20 s23 s29 s33 s36 s43 s50 s52 s55 s60 s65 (all thu main). |
| thu_comoi/s11_t{1..8}_THU_builder_L2060.txt (+.keep) | L2060 test rebuilt with every change above; made only by `build_all.py s11 K --season thu --caption …`; keep via reports/BUILDFIX3/make_keep.py. |
Self-tests: check_store --self = the 3 old PROOF MISMATCH (S12 S14 S19) only; person_gate --self PASS; keep_check --all 1050 PASS.

## L2060 test s11 (ON HOLD for drawing — L2084)
t1–t8 each: check_store --scope tpK a18 PASS, store gate (--season thu) PASS, keep_check PASS; --batch 8 files PASS. Own ANGLE kept t1 t2 t4 t5; dropped for length t3 t6 t7 (owner ~15:39Z rule). Caption only at t2 (length). Refs per rank = thu_ladder.REFS.

## Sweep (LUẬT SỬA CẢ NHÓM) — 112 persons × t1–t8 × a18 × 5 seasons, REAL builder gate (store check incl.; BUILDFIX2's sweep skipped it)
FAIL counts per rank t1..t8 (before = 8e48aa7f, after = this push):
| season | before | after |
|---|---|---|
| root | 2 2 112 2 2 2 1 1 | 0 0 0 0 0 0 0 0 |
| xuân | 2 3 112 2 2 74 ? ? | 0 1 0 0 0 0 0 0 |
| hạ | 2 2 112 2 2 75 74 1 | 0 0 0 0 0 0 0 0 |
| thu | 23 23 24 31 26 73 75 18 | 0 0 3 0 0 22 18 38 |
| đông | 2 2 2 2 2 2 1 1 | 0 0 0 0 0 0 0 0 |
After: every thu FAIL left = LEN > 10 000 (t3 c06 s44 s45; t6/t7/t8 the long-face s-persons + c06) — owner/foreman length decision. xuân t2 1 = one cell (not looked at). Other ages (a26–a65) not re-swept (LEN a51/a65 debt known).

## Answers given (evidence)
- Q2 face: KC_REFS face_words = prompt_file of the FACE_MAP_L703 cut (e.g. s16 v4c RESTORE-712, s33 v5r2 REDRAW-712) = current owner face → applied (ROOT-B2).
- Q3 ash: ART_RULES B19 names 'ash' (owner Lượt 591) vs L1726 palette → renamed (ROOT-B2).
- maids: m18 _ha_DUONG = Tang set → own comparison set (ROOT-B2); MAIDRUN1 40 L1919 files PASS.

## HANDOVER (for the successor; the COORDINATOR opens it)
- LEN thu t6/t7/t8 (22/18/38 cells a18) + t3 (3): needs a length decision (more trims? drop INNER LAYER EMBROIDERED G20? shorter face words?) — owner/ROOT.
- G69 chest flower t2–t8 + F21 birds: wire ONLY after THUROOT3's L2079 pictures prove the words (upper middle of the chest panel, just under the neckline band, never hidden by the held item; Phi collar ref w4asVae7EI); both cost length.
- Tần t4 L2079 / Phi t5 L1856-collar revert / HQP L2079: same (after proof).
- xuân t2 one FAIL cell; other ages sweep; items_per_person a26–a65.
- Manual gate use for season prompts: pass `--season xuan|ha|thu` with store args (thu t1–t6 also auto-detected).
- Scratch tools: dev/handover/reports/BUILDFIX3/make_keep.py (keep sidecars); sweep script = BUILDFIX2/sweep.py pattern but calling build_all.gate (set B.GATE_SEASON).
