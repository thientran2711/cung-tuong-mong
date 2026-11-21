# BUILDFIX2 — builder 4 seasons + thu ladder + own items · owner L2060 / L2053 · child of Foreman C ROOT (now ROOT-B2)

## Cho sếp (tóm tắt)
- Máy dựng lời vẽ nay ra được cả 4 mùa (xuân, hạ, thu, đông) cho mọi người; màu lấy đúng tên trong bảng màu mùa, khăn phi bạch có ở hạ và thu.
- Mùa thu bậc 1–5 dùng đúng chữ áo sếp đã duyệt của s62 (cổ vuông, đai eo, cổ Tần L2041, lưới ngọc Phi L2050), chỉ thay màu, hoa, mặt, đồ cầm, góc đứng của từng người.
- Thử: s11 (nhóm Kiêu kỳ, chưa vẽ) thu bậc 1–5 dựng thẳng từ máy, qua hết máy duyệt. Theo lệnh L2084 chưa giao thợ vẽ.
- Đồ cầm tay riêng từng người (bảng L2053) đã nối vào máy.

depth 1 (limit 8) · START_CTX ~4 % · 0 gens · base 06bf9ccd

## What changed (one copy each, no frozen file touched)
| file | change |
|---|---|
| store-all/build_all.py | `--season xuan|ha|thu|dong` (SEASONS). Every season uses her palettes_season.json main+sec names/hexes EXACT, ALSO when it is her root season (AUDIT1 row 1: DATA rows stale for 50/74). `_season_pal`, `b20_winter` generalised, `winter_pairs(person,season)`. Phi bạch on for hạ/thu (G36, colour phibach_3rd L1834). `season_post`: non-root season drops 'her ORIGINAL robe colour is kept exactly as in image 1' (approved thu files read the same); drops the store's fixed ', NOT green' after a green main. THU t1–t5 → `thu_sentences` (below). Thu length: first the A38 trims the approved thu files already go without ('An imperial consort.', 'Everyone beautiful at every age.'), then B26 cuts with HER ANGLE kept (G72) if that fits, else ANGLE first. xuân/hạ/thu fit once, after the season words. `--caption "…"` (approved thu CAPTION form, only if it fits). `season_store()` for the gate. |
| store-all/thu_ladder.py (new) | templates from the APPROVED s62 thu files t1 L2008, t2 L1847, t3 L1978, t4 L2041, t5 L2050: sentences 'Outfit (', 'Hair:', 'HAIR FLOWER SIZE', 'NO BIG FLOWERS' with only s62's slot words turned into {main} {sec} {sp} {spl} {hsp} {hc} {notgreen} (asserts every slot word found, none left). Filled per person: palette thu names, F2 species of the rank, F20 thu hair colour (f20_name). t4 CAPELET CUT = L2041 form (throat-clasp/long-V clause dropped, her own shape kept). |
| winter_g28.py | `season()` accepts xuan/ha/thu (pass-through; fur/G25/G28 stay winter-only). |
| check_store.py | STORE part: thu prompt (marker 'straight SQUARE collar/NECKLINE', no WINTER) → same palette + thu ladder words + optional thu trims on the store text (as the builder). S13 accepts the owner L2041 thu form when 'ONE straight SQUARE collar only'. S18 accepts the B26 M10 'closed-lip smile;' cut (same as S24/S16/S19 exceptions). |
| master_common.py | doan_cuts_made: a later LEN clause that is in the prompt in NEITHER form (e.g. ITEM tail not in her Pose) no longer voids the cuts made (it failed s16/s11 t5). |
| t8-prompt-B/build.py | `_e6_picks`: a18 + person in dev/art/items_per_person_L2053_DRAFT.json → her own t1–t8 items (idx into the same E11 lists, text asserted equal); other ages unchanged (ITEMS1 open 1). |
Self-test --self: unchanged (3 old PROOF MISMATCH S12 S14 S19; s62 approved t1–t8 PASS).

## L2060 test (ON HOLD for drawing — owner L2084 no gens)
Person **s11** (Kiêu kỳ, root đông, thu palette dark maple red / blush white, F2 residue 0 = species none of s62–s65 use). Files dev/art/thu_comoi/s11_t{1..5}_THU_builder_L2060.txt (+ .keep, base = the approved s62 file of the rank), made ONLY by `build_all.py s11 K --season thu --caption …`.
| rank | chars | ANGLE | caption | check_store --scope tpK (incl. P1/P2/P3) | builder STORE gate | keep_check |
|---|---|---|---|---|---|---|
| t1 | 9825 | own | dropped (length) | PASS | PASS | PASS |
| t2 | 9468 | own | yes | PASS | PASS | PASS |
| t3 | 9965 | own | dropped | PASS | PASS | PASS |
| t4 | 9936 | DROPPED (length, owner ~15:39Z rule) | dropped | PASS | PASS | PASS |
| t5 | 9998 | own | dropped | PASS | PASS | PASS |
`check_store.py --batch` (5 files): PASS. Every keep allow line = a slot (face/GRACE, colour, flower, own pose/item/angle), the B26 satin master, A38/B26 length trims or s62's caption (dev/handover/reports/BUILDFIX2/make_keep.py classifies them).
s16 was tried first and dropped: its KC_REFS face_words ≠ face-common/s16.v5.FULL 'Her face:' → P3 FAIL (see open 2).

## Sweep (LUẬT SỬA CẢ NHÓM) — 112 persons × t1–t8 × 5 ages × {root, xuân, hạ, thu, đông}
Before (BUILDFIX1 end, 8960 cells root+đông): root+đông 2798/8960 FAIL; xuân/hạ/thu = 100 % EXC (`--season` asserted, winter_g28.py:90).
After (root/đông from the first sweep, xuân/hạ/thu from the second, after the F16 + maid-slot fixes; tools dev/handover/reports/BUILDFIX2/sweep.py):
| check | root | xuân | hạ | thu | đông |
|---|---|---|---|---|---|
| LEN TOO LONG | 1231 | 665 | 1072 | 1431 | 1445 |
| B19 GREY | 0 | 0 | 0 | 595 | 0 |
| X08 BANNED (m13 face) | 60 | 60 | 60 | 60 | 60 |
| X11 BANNED (m43 face) | 40 | 40 | 40 | 40 | 40 |
| EXC build (s65 t3 G15 slot) | 0 | 5 | 5 | 5 | 5 |
| F16 NOFRUIT | 0 | 2 | 0 | 0 | 0 |
| **prompts FAIL / total** | **1289/4480** | **741/4480** | **1140/4480** | **1864/4480** | **1504/4480** |
thu a18 t1–t5 (the mass-draw set): 95/560 FAIL. Fixed on the way (whole family): F16 false positive on the HELD ITEM COLOUR sentence (palette names tangerine/peach/mango/persimmon: 480 → 2); thu KeyError for the 34 maids without a season palette (950 → 0, they use their own colours); s65 EXC: single word 'jade' no longer swapped inside 'jade belt pendants' (đông now builds; xuân/thu s65 t3 = gate FAIL instead, below).
Remaining families: LEN = old a51/a65 debt + the longer thu ladder words (most at a36–a65); **B19 GREY = thu palette names containing 'ash' ('deep ash rose', 'medium-deep ash rose': s65, m10 …) — palette names are EXACT by rule, the NO-GREY gate flags them → owner/foreman: rename in palettes_season.json or exempt 'ash rose'**; s65 t3 xuân/thu: her store row already holds thu words (deep ash rose, NO BIG FLOWERS) → STORE mismatch; X08/X11 face words (known).

## Open questions (for ROOT / owner)
1. **B26 vs approved thu fabric**: approved thu t4/t5 (L2041/L2050) carry master M06 thin silk+gauze; rule B26/B29 (owner L1283/L1558) + gate want satin đoạn. Builder keeps B26 (gate PASS); thu Outfit words still say 'layered silk robe' / 'silk brocade court robe' as approved. Which one for thu Tần/Phi?
2. **Face source**: 13 drawn persons (m23 m39 s08 s16 s33 s35 s36 s38 s43 s44 s45 s51 s54) have KC_REFS face_words (B8, builder) ≠ face-common v5 FULL face (person_gate P3, L2039). Gate FAILS them. Which is the owner's face for these?
3. G25 (autumn t1–t3 = old crossed collar) is superseded for thu by G53 + the approved square-collar thu files; builder thu uses the square collar. Rule text G25 should say so (foreman's rule.py).
4. Tần t4: L2041 used (approved); L2051 petal lobes pending — switch = change SRC[4] in thu_ladder.py to s62_t4_THU_L2051 + its slot words.
5. Caption does not fit at t1/t3/t4/t5 (≤10 000); VE12 can label the sheet instead.

## HANDOVER (not done — for the successor)
- t6 thu = G63 frozen QP (THU_QP_t6_L1933_FROZEN) + owner L2066: ALWAYS attach collar crop ref YMl2p0yWeC + 'the two-tier cloud collar exactly like image N (shape)' + rich vân kiên words + chest-centre flower cluster; VE12 sends final t6 words → add t6 to thu_ladder SRC (frozen file as base) + ref wiring.
- t7 thu = s62_t7_THU_vankien2_L2050, t8 = s62_t8_THU_vankien2_L2023: add to thu_ladder (slots incl. royal yellow lines).
- xuân / hạ: palette + phi bạch only; no season ladder words yet (G25 says spring/summer open square neck = builder default).
- G69 chest-centre embroidery t2–t8 (owner L2054), F21 birds t4–t6 (season_birds_L2040.json prompt_words[season][first species][tK]) — both cost ~150–300 chars at t4/t5 (cells now ~9950): needs a length decision (owner) first.
- person_gate a22 gap; LEN a51/a65; X08 m13 / X11 m43 face words (BUILDFIX1 list).
- Other ages for items_per_person (a26–a65).
Commits: fceb69d1, 04e23f3f, REPORT_COMMIT.
