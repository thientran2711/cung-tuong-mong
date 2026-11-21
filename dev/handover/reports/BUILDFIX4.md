# BUILDFIX4 — builder / gate worker · child of ROOT-B2 → reports to ROOT-B3 (session_01D3E3NXR5kG5EWHxHyn9TN6) · successor of BUILDFIX3
depth 2 (limit 8) · START_CTX ~5 % (53k/1M) · roll at ~30 % · 0 gens (owner L2084 hold) · base 27c027b0

## Cho sếp (tóm tắt)
- Mùa thu: cắt thêm các câu chỉ NHẮC LẠI câu khác trong cùng lời vẽ (luật cắt đã có N1/N2/ITEM, nay áp cả bậc 3/6/7/8). Không đụng cổ, ngực, màu, đồ cầm, tóc, tay áo.
- Thu bậc 3: hết lỗi dài (3 → 0). Bậc 6: 22 → 3. Bậc 7: 18 → 16. Bậc 8: 38 → 16. Phần còn lại cần sếp/ROOT chọn câu cắt (danh sách dưới).
- Xuân t2 (s39): máy duyệt đọc nhầm "viền màu đào" là "cầm quả đào" → sửa cả nhóm; nay 0 lỗi.
- Chưa vẽ gì.

## Changes
| file | change |
|---|---|
| master_common.py LEN_CUTS2 | N1, N2: ranks (5,7) → (3,5,6,7,8); ITEM: (5,) → (3,5,6,7,8). E2 kept (5,) (widening it made t8 store FAIL: its kept part '.' is in every prompt, so doan_cuts_made reads E2 as made → prefix rule fails; seen in sweep 1: 74 thu + 6 other t8 FAILs, gone after revert). Builder (b26_fit) and gate (S16/S19 exception) read the same list. |
| check_store.py FRUIT_RX | + cloth/trim nouns after a fruit-colour word (piping, edging, band, binding, panel, collar, sleeve, cuff, layer, dress, gauze, stole, veil, capelet, cape, vest, jacket, embroidery, accent, lace, petal) — xuân s39 t2 'pastel peach piping' false F16. |
| ART_RULES_CONFLICTS.md item 17 | (f) logged. |
Self-tests: check_store --self = the 3 old PROOF MISMATCH only; person_gate --self PASS; keep_check --all 1051 PASS.

## Sweep (real builder gate incl. store check, a18, 112 persons) — FAIL per rank t1..t8
| season | before (BUILDFIX3) | after |
|---|---|---|
| root | 0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0 |
| xuân | 0 1 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0 |
| hạ | 0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0 |
| thu | 0 0 3 0 0 22 18 38 | 0 0 0 0 0 3 16 16 |
| đông | 0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0 |
Every FAIL left = LEN > 10 000 (no other fault). Cuts apply only while > 10 000, so no cell that fitted changed.

## Still too long (thu a18) — needs a decision (NOT decided by me)
- t6 (3): c06 10097, s57 10052, s58 10056
- t7 (16): c06 10319, s60 10231, s44 10260, s57 10165, s36 10164, s45 10147, s58 10141, s56 10130, s41 10127, s61 10113, s54 10051, s38 10040, s40 10026, s33 10013, s59 10008, s09 10005
- t8 (16): s58 10337, c06 10283, s61 10282, s38 10187, s57 10153, s42 10149, s45 10142, s56 10142, s33 10106, s44 10104, s60 10071, s36 10068, s59 10066, s08 10062, s41 10051, s43 10006
Need up to ~100 (t6) / ~320 (t7) / ~340 (t8). Candidate cuts (chars):
1. 'GRACE (pose variety, every rank its own):' → 'GRACE:' (~40) — label only; THUROOT3 used it in the L2079 files.
2. N2 result ', floor-length robe' (~20) — the Outfit already says 'floor-length robe'.
3. t7/t8 'Image 2 is only a colour reference for the royal yellow, never copy anything but its colour.' (93) — COLOUR RULE names #EFBD69; but the approved L2023 form keeps it.
4. M07 'The silk has real weight: … board-like.' (155) — repeats the master fabric sentence ('real cloth with natural weight … never stiff or board-like'), BUT M07 is a MASTER (B1 LAW #1) → owner/ROOT only.
5. 'HEAD AND BODY: …' (150) — no other sentence says it; owner rule → not mine.
6. 'INNER LAYER EMBROIDERED (t7/t8)' (207) — G20 owner content.
7. shorter face words for the long-face persons (c06, s3x–s6x) — owner face → not mine.
1+2 alone fit s57/s58 t6 and t7/t8 cells ≤ ~60 over (s09 s33 s59 s40 s43 …); 3 adds ~93. The rest (c06, s58 t8, s61 t8, s44/s60 t7) need 4/6/7.
NOT cut (checked): D9 'NOTHING on the forehead (no hoa điền …)' (owner: every prompt says it), M07 (master).

## (3) G69 / Phi ref / HQP / F21 wiring — WAITING
THUROOT3 has words only (Tần s63–65, Phi s62–65 + ref w4asVae7EI, HQP s62 'UPPER middle of the chest panel, just under the neckline band'); 0 pictures (owner L2084 stop). Per brief: wire only after its pictures prove the words. Note the length cost: every t7/t8 cell above is already over.

## Tools
dev/handover/reports/BUILDFIX4/gsweep.py (real gate sweep; env SEASONS, RANKS), lensweep.py, sim.py, dump.py; before.json / after2.json.

## JOB 2 — owner L2096 "Hồng tro ok, chỉ là cấm màu xám thôi" (ROOT-B3 brief, 0 gens)
- Revert of BUILDFIX3 @facd9d01 rename: palettes_season.json + palettes3/make_live_L1726.py reverse-applied → palettes_season.json byte-identical to facd9d01^ ('ash rose', same hex, 17 thu mains: c02 c26 m10 m18 s09 s15 s20 s23 s29 s33 s36 s43 s50 s52 s55 s60 s65). No built prompt file carried the rename (grep).
- check_store GREY_RX (B19): 'ash' / 'ashen' / 'ash-…' removed; only grey / gray colour words banned (hair + negated clauses still skipped). No other gate had an ash ban (grep all .py).
- Rule B19 updated via rule.py set (quotes L2096; ART_RULES + _HISTORY).
- LUẬT SỬA CẢ NHÓM grep 'mauve rose' left: only names that pre-date facd9d01 (c18 palettes3 / c_rank_colours / golden_low c18 / nonconsort / L761 / INDEX + old reports) — not part of the rename, left as they are.
| check | before (mauve) | after (ash) |
|---|---|---|
| 17 persons × t1–t8 × 5 seasons a18, real gate | thu LEN only: t7 s33 s36 s60, t8 s33 s36 s60 | thu LEN only: t7 2, t8 3 (shorter word); 0 grey FAIL, 0 other FAIL |
| check_store --self | old 3 PROOF MISMATCH | same |
| keep_check --all | 1051 PASS | 1051 PASS |
| person_gate --self | PASS | PASS |
