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

## JOB 3 — owner L2099/L2100 HQP one-tier + B27/B28 light gấm (ROOT-B3 brief, words only, 0 gens)
PRIORITY #1 CHECK: rules B12/B27/B28/B29 (ART_RULES), master_common B29 block (B29_C_GAM already a gate-accepted alternative to BROCADE since DESIGN16, never wired in the builder), ROOT-B2 samples s62_t6 L2097 / s62_t7+t8 L2099, owner L1847 (t6 phi bạch), L2088 (t6 QP two-tier).
### What changed (ONE copy in master_common, used by build_all + check_store)
| item | before | after | where |
|---|---|---|---|
| t6–t8 fabric slot, all seasons + root | 'FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.' | B27_FABRIC = B27_SHORT 'FABRIC: the LIGHTEST thin, supple brocade (gấm) with a soft matte finish, never thick, stiff or heavy, with a graceful, flowing drape.' (B28 meaning, short; B29_C_GAM verbatim ≈ +350 ch → hundreds of LEN cells; **choice A/B/C asked to ROOT-B3**, switch = one line master_common.B27_FABRIC) | b27_post (build + season_post); gate accepts it via b29_alts(high) |
| t6 QP outfit | 'a HEAVY silk brocade robe in SATURATED …' | 'a light silk brocade robe in SATURATED …' (colour word kept) | B27_SWAPS |
| t6 phi bạch | '…, matching the weight of her brocade' | dropped; owner L1847 'slightly THICKER … a little LESS see-through' KEPT | B27_SWAPS |
| t7 HQP thu | 'TWO-TIER cloud collar (vân kiên hai tầng)' | 'SINGLE-TIER cloud collar of ONE layer only (vân kiên một tầng, never two tiers)' (L2099 words). Other seasons' t7 have no tier words. t8 HH keeps two tiers; t6 QP keeps L2088 two-tier | B27_SWAPS |
| gate | — | check_store B27 HEAVY BROCADE FAIL: non-negated thick/heavy/stiff … brocade or 'weight of her brocade' (accessory 'stiff brocade girdle' of G15 t3 excluded); store gate reads the store's heavy words as the light ones when the prompt has them (b27_store_swap) | check_store |
### Sweep (real gate, a18, 112 p) — FAIL t1..t8
| season | before (after JOB 1) | after |
|---|---|---|
| root / xuân / hạ / đông | 0 everywhere | 0 everywhere |
| thu | 0 0 0 0 0 3 16 16 (LEN) | 0 0 0 0 0 4 26 22 (LEN only) |
First sweep without the girdle exclusion: t3 97–112 FAIL per season ('a wide stiff {sec} brocade girdle', G15) → excluded → t3 0.
LEN thu (short form adds ~50): t6 c06 s44 s57 s58 · t7 26 cells (c06 10421 … s47 10001) · t8 22 cells (s58 10401 … s54 10013) — full list dev/handover/reports/BUILDFIX4/b27.json; owner/ROOT decision (no owner/master words cut by me).
### Files with heavy words (LUẬT SỬA CẢ NHÓM scan): 778 old .txt prompt files (records: nude-B 40, owner-copy/trieu 36, golden_low 32, pr-night 21, store-all/test 13, seasons4 15 …) carry them; NOT rewritten (old drawn records / goldens; new prompts come from the builder). Other pipelines with 'plain thick brocade': emo-anim/groups/sg2_prompts.py + rank_gian_prompts.py, nude-B/mk.py S07, thu_comoi/make_thu_comoi.py — not touched, listed for ROOT.
### Open questions for ROOT-B3 / owner
1. Fabric sentence A (B29_C_GAM verbatim) / B (short, now wired) / C (L2099 Phi gauze words).
2. t6 phi bạch 'slightly THICKER' (owner L1847) — keep? (kept).
3. t6 QP two-tier (owner L2088) — keep? (kept).
4. G15 t3 'stiff brocade girdle' — keep? (kept, gate excludes accessories).
5. M07 'The silk has real weight' master — B27 says never heavy; kept (master).
Self-tests: check_store --self = the old 3 PROOF MISMATCH only; person_gate --self PASS; keep_check --all FAIL only on ROOT-B2's dev/art/thu_comoi/s62_t6_THU_caovai_L2095.txt (CUT 'vân kiên hai tầng' etc. vs its base — not from this change).

## HANDOVER (BUILDFIX4 → successor; the COORDINATOR opens it)
depth 2 · START_CTX ~5 % · now ~28 % → roll. State @ this push: JOB 1 (thu LEN cuts), JOB 2 (ash rose) and JOB 3 (B27/B28 + HQP one tier) done and swept.
Next: (a) ROOT-B3 answer to Q1 (switch master_common.B27_FABRIC; re-run gsweep.py all seasons; LEN check); (b) Q2–Q5 as answered; (c) thu LEN cells list = owner decision; (d) G69/Phi ref/HQP chest/F21 wiring after THUROOT3 pictures (owner lift). Tools: dev/handover/reports/BUILDFIX4/gsweep.py (env SEASONS, RANKS; persons as args), b27sim.py (length estimate), dump.py.
### HANDOVER addendum (ROOT-B3 16:17–16:27Z, after the 08361600 push) — for BUILDFIX5
- Q1 ANSWERED by ROOT-B3: B (short light-gấm form) = what is wired (master_common.B27_FABRIC = B27_SHORT, one named constant; C_GAM stays in the gate's accepted list). Other JOB 3 items confirmed as done.
- NEW LAW A53 (owner L2110): NO Magnific generation by anyone; owner draws in ChatGPT with our prompts. Word jobs continue.
- LEN: 10k gate becomes a WARNING only (ROOT-B3 + ROOT-B2, A53): stop cutting for length; earlier boilerplate cuts may stay. TODO: make check_store PROMPT_MAX / builder LEN a WARN (check_store MG3 'PROMPT_MAX', build_all fit steps keep running only while > 10 000 — decide with ROOT whether to switch the cut-while steps off).
- JOB 4 (owner L2105 verbatim: "Bây giờ á, Vân Kiên á, là của Hoàng Hậu và Hoàng Quý Phi á, đừng có đề cập là tới cứng nữa, chỉ đơn giản là nhắc nó là chia ra khỏi vai là được, đừng có đề cập tới chuyện không ôm vai hay không gì hết trơn, chỉ đơn giản là nhắc nó chia ra khỏi vai là được."): builder + all season files t7/t8 + masters: drop STIFF/STIFFER/rigid and 'never hugging them' words on the vân kiên; t7 → 'a little LONGER, extending slightly OUT past the shoulders' (single tier), t8 → 'LONGER, extending clearly OUT past the shoulders' (two tiers) — ROOT-B2 words in thu_comoi/s62_t7_THU_vaiphi_L2099.txt / s62_t8_…L2099.txt. Easiest: add 2 pairs to master_common.B27_SWAPS-style list (ranks 7/8) + check the store/thu_ladder text ('a little LONGER and STIFF, standing slightly OUT past the shoulders, never hugging them' t7; 'LONGER and STIFFER, standing clearly OUT past the shoulders, never hugging them' t8); rule note L1924 via rule.py quoting L2105; gate if it requires stiff words.
- JOB 5 (owner L2111): drop 'cape' as a garment noun in the t7/t8 JEWELLERY line ('NEVER on the robe, cape, collar or belt' → 'NEVER on the robe, collar or belt'); find its source (store / thu_ladder ADD_R JEWELLERY) and the gate copy.
- Then full gsweep.py, keep --all, check_store --self, before/after table, push, report to ROOT-B3.
