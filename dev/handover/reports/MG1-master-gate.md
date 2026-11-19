START_CTX ≈ 4 % of the 1M window (get_session context_usage.used_tokens read 0 → own estimate ~40k), session depth 1 (child of ROOT-57); rollover line ≈ 29 %, ceiling 60 %. Finished at ≈ 23 %: no handover needed.

# MG1 — ONE MASTER COMMON PROMPT + FACE GATE (owner Lượt 745 / B25, re-ordered Lượt 763) — DONE, no gens

PRIORITY #1 CHECK: no MASTER_COMMON file existed (brief check, 19/11 22:50Z; re-checked: git grep MASTER_COMMON on the branch = only the brief + ART_RULES B25 'OPEN builder job'). Reused, not rebuilt: COMMON_v3.txt sentences, make_c_v3 PFAB, store FAB / LOW_TONE / D9_FOREHEAD, check_store.py check_text/slot logic, NF4 NEW_MOUTH. Nothing invented.

## Tóm tắt cho chủ (owner summary)

1. Đã có MỘT khối lệnh chung: `dev/art/MASTER_COMMON.txt` — 14 câu, câu nào cũng CHÉP NGUYÊN từ prompt đã duyệt (nguồn từng câu: `MASTER_COMMON.src.md`).
2. Khối gồm: nét vẽ + màu da (M09 chỉ lấy nét/da, không lấy mặt), nền giấy sáng + ánh sáng trắng, dáng người, câu TÔNG MÀU B18 (mức Xuân/Hạ: trong, mềm, dịu), câu VẢI 'thướt tha' (lụa + sa mỏng, rủ mềm), câu 'lụa có sức nặng', chân trụ một bên (dáng có chuyển động), mặt/miệng khép, trán sạch, đúng một món cầm, trâm hướng lên, không chữ.
3. Mọi máy làm prompt đều tự chèn khối này nguyên văn: máy mặt (v3/v5/NF4/L737/L761), build.py + build_all (phi tần t1–t8, công chúa, ma ma, triều phục), Nữ đế (nude-B), Thái hậu + nam + trẻ (build_npc), Hoàng thượng (emperor-B).
4. Cổng kiểm `check_store.py` giờ chặn THẬT ở MỌI loại, kể cả mặt (`--scope face`): thiếu khối, sửa một chữ, hay bỏ câu vải thướt tha → FAIL, không được vẽ.
5. Đã thử: mỗi loại 1 prompt đúng + 3 prompt hỏng → 3 cái hỏng đều FAIL, cái đúng không lỗi khối (bảng bên dưới).
6. Câu cũ đã duyệt mà nói khác khối chung (vd vải 'silk satin/brocade', 'đứng thẳng chính diện', câu tông 'medium tone' cũ, câu miệng cũ, nét 'semi-realistic near-3D' của store, nền trong suốt) KHÔNG bị xóa — liệt kê để chủ quyết (A18).
7. Còn THIẾU câu đã duyệt cho: 'áo nhiều lớp nhẹ', câu chuyển động chung (ngoài câu trụ một chân), bản cho NAM (khối đang viết cho nữ), màu người già a51/a65 (đậm hơn) đụng câu tông B18.
8. Không vẽ lại tranh cũ (Lượt 757). Mẫu m04 cũ/mới (chưa vẽ) ở `MG1-m04-sample.md`; danh sách gen cũ thiếu khối ở `MG1-ledger-audit.md`.

## Files

- `dev/art/MASTER_COMMON.txt` — the block, one sentence per line (block = lines joined by one space). Made by `dev/art/make_master_common.py` (cuts each sentence out of its source file and asserts it is verbatim there); provenance `dev/art/MASTER_COMMON.src.md` (file:line + approval Lượt).
- `dev/art/master_common.py` — the ONLY reader of the file. `apply(prompt)`: master sentences the prompt already has (identical text) stay where they are (ONE copy, approved order kept, B5); the missing ones go in as ONE block right after M01 (or at the very start); nothing else touched. `check(prompt)`: each master sentence verbatim exactly once, else MISSING / REWRITTEN / NOT ONCE.
- `dev/art/check_store.py` — MASTER check inside `check_text` = EVERY scope (tp/pr/trieu/mama/nude/face/states, audit too); new scope `face`; prompt file `-` = a builder's stdout piped in. `--self` still 37/17/0.
- `dev/art/face-common/face_gate.py` — last step of every face maker: master apply + D9 (owner Lượt 529 'every prompt'; the store's D9_FOREHEAD words read from build.py, placed right before 'No text, no labels.' as in store/NPC/emperor) + `check_text(v,'face')`; FAIL → the maker raises and writes nothing.
- `dev/art/mg1_gate_proof.py`, `dev/art/mg1_ledger_audit.py`, `dev/art/mg1_conflicts.py` — proof, audit, conflict scan (re-runnable).

## Master sentences (details + sources: dev/art/MASTER_COMMON.src.md)

| id | sentence (first 110 chars) |
|---|---|
| M01 | Soft painted guofeng game illustration in EXACTLY the drawing style of the reference image (soft clean line wo |
| M02 | From the reference image take ONLY the drawing style and the skin colour: NEVER copy its face. |
| M03 | Full-body figure from head to feet, centered with margin around it, plain light parchment background, soft eve |
| M04 | Natural graceful adult body proportions (about seven heads tall, healthy slender figure with natural shoulders |
| M05 | COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: mediu |
| M06 | The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft gr |
| M07 | The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natur |
| M08 | The fabric is exactly the cloth written in her outfit, real cloth with natural weight and soft natural folds,  |
| M09 | Her legs and feet follow the pose naturally: weight resting on one leg, the other knee softly bent, feet natur |
| M10 | The whole face clearly visible, eyes fully open and bright (never half-closed, sleepy or hooded), MOUTH FULLY  |
| M11 | Bare clean forehead, no forehead mark, no moles. |
| M12 | EXACTLY ONE held item, the hand really gripping it; no cup, no teacup, no teapot, no bowl. |
| M13 | Every hairpin points upward or backward, never sticking out sideways. |
| M14 | No text, no labels. |

GAPS (no approved generic sentence; foreman decides, nothing invented): G1 'layered light outfit' (Lượt 748) — only per-person outfit slots; G2 a shared gentle-MOVEMENT sentence beyond M09 — the v5 movement words are per-person POSE slots; G3 MEN — every master sentence is women's wording (her/girl/skirt hem), applied to emperor-B + build_npc men as B25 says 'men' too, owner must give/approve a men's copy before any men gen; G4 ELDERS — M05 (young B18 tone, approved for a18–a36 in S02/S03) now sits beside the elder 'DEEPER, DARKER' rule (S33) in every a51/a65 prompt.
Not in the master on purpose: COMMON_v3 'This girl is a clearly DIFFERENT person … "Her face" and "Expression" below' (face-maker sentence that points at the person lines); D9 forehead (already gated in every scope by S34).

## Builders wired (job 2)

| builder | how | test |
|---|---|---|
| face makers make_c_v3 / make_nf3 / make_nf4 / make_sacsao_L737 / make_lanhlung_L761 | `FG.final(v,k)` right before each FULL.txt write (nf4: only when run as itself; sacsao/lanhlung exec it read-only) | lanhlung s46–s50 PASS · nf3 14 PASS · c_v3 / nf4 / sacsao_L737 BLOCKED by B19 grey in their own old data (c02, s07.v5, s44.v5: 'silvery/silver/sage-grey' outfit) — the gate works; those people are already drawn, so nothing to do unless they are re-generated |
| t8-prompt-B/build.py (store: t1–t8, princesses, ma ma, triều, states, Nữ đế) | `master_common.apply(_o)` right before the final print (`--golden` frozen reproduction exempt; `CTM_MASTER_LATER=1` for a post-editing caller); `--verify` accepts a pre-MG1 ledger gen when only the block differs | build_all `--check --age a26`: 416 prompts 0 FAIL |
| store-all/build_all.py | gets it through build.py (exec'd in-process); no edit needed | as above; tp2/tp8/Nữ đế proof PASS |
| nude-B/mk.py | build.py with CTM_MASTER_LATER=1, then `master_common.apply` as its LAST step (its elder COLOUR-RULE edits would otherwise hit the master's COLOUR RULE) | m01 a18/a51 PASS (prompt files restored, not committed) |
| t8-prompt-B/build_npc.py (Thái hậu, men, eunuchs, officials, physicians, công tử, kids) | `apply` at the end of prompt(); `--verify` legacy-accepts | runs; Thái hậu a51 at --scope tp8 has 0 MASTER fails (older S33 FAIL, pre-existing) |
| emperor-B/build.py | `apply` at the end of build() | `emperor-B/check.py` OK (byte-identical outside slots) |

Not wired (outside the brief list; check_store FAILs their output until they apply it): owner-copy/trieu make.py + r18–r24 build_rNN.py, owner-copy/mk_ranks_v3.py, owner-copy/pr-night-1119/mk.py, face-common/make_quyenru_r2.py, make_sacsao_test.py, t8-prompt-B/tools/mmx3.py, kc_refs_build.py. Adding one line `master_common.apply(prompt)` at their write is enough.
Existing FULL.txt / prompt files were NOT regenerated (they record what was drawn; Lượt 757). Re-running a maker rewrites its FULL files with the block — F1 rebuilds s46–s50 through make_lanhlung_L761 (all PASS).

## Gate proof (job 3) — `python3 dev/art/mg1_gate_proof.py` (0 cases misbehave)

GOOD = builder output → must show 0 MASTER fail lines (older non-master rules are shown as they are: ma ma / triều raw outputs and old spec files already FAIL S01/S04/S34/S36 — pre-existing, not MG1's to change). BROKEN (a) block removed, (b) one master word edited, (c) thướt tha FABRIC dropped → must FAIL.

| scope / prompt | case | expected | check_store | MASTER fail lines | first FAIL line |
|---|---|---|---|---|---|
| face · s46.v5 (make_lanhlung_L761 recipe) + face_gate.final | GOOD (builder output) | no MASTER fail | **PASS** | 0 | STORE CHECK PASS /tmp/tmp5q7znevb.txt (approved_check PASS, scope face) |
| face · s46.v5 (make_lanhlung_L761 recipe) + face_gate.final | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 19%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| face · s46.v5 (make_lanhlung_L761 recipe) + face_gate.final | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| face · s46.v5 (make_lanhlung_L761 recipe) + face_gate.final | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 32%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| tp2 · m04 t2 a26 (build_all; STORE args = store part + approved part) | GOOD (builder output) | no MASTER fail | **PASS** | 0 | STORE CHECK PASS /tmp/tmp_ivf3ot3.txt (approved_check PASS) |
| tp2 · m04 t2 a26 (build_all; STORE args = store part + approved part) | (a) master block removed | FAIL | **FAIL** | 0 |   [0.33] No text, no labels. |
| tp2 · m04 t2 a26 (build_all; STORE args = store part + approved part) | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| tp2 · m04 t2 a26 (build_all; STORE args = store part + approved part) | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 0 |   [0.5] the small embroidered motifs are stitched in fine gold thread. |
| tp8 · m04 Hoàng hậu t8 a26 (build_all) | GOOD (builder output) | no MASTER fail | **PASS** | 0 | STORE CHECK PASS /tmp/tmpx_vut1df.txt (approved_check PASS, scope tp8) |
| tp8 · m04 Hoàng hậu t8 a26 (build_all) | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 26%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| tp8 · m04 Hoàng hậu t8 a26 (build_all) | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| tp8 · m04 Hoàng hậu t8 a26 (build_all) | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 32%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| nude · m04 Nữ đế a26 (build_all) | GOOD (builder output) | no MASTER fail | **PASS** | 0 | STORE CHECK PASS /tmp/tmpyyq987hx.txt (approved_check PASS, scope nude) |
| nude · m04 Nữ đế a26 (build_all) | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 26%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| nude · m04 Nữ đế a26 (build_all) | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| nude · m04 Nữ đế a26 (build_all) | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 32%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| mama · m05 ma ma a51 (build.py --state mama) | GOOD (builder output) | no MASTER fail | **FAIL** | 0 | FAIL S01 MISSING: TWO-COLOUR RULE (hai màu) (best overlap 27%) |
| mama · m05 ma ma a51 (build.py --state mama) | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 28%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| mama · m05 ma ma a51 (build.py --state mama) | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| mama · m05 ma ma a51 (build.py --state mama) | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 24%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| mama · bd1 a51 oneref spec file + master_common.apply | GOOD (builder output) | no MASTER fail | **FAIL** | 0 | FAIL S34 MISSING: FOREHEAD: nothing on the forehead (D9) (best overlap 50%) |
| mama · bd1 a51 oneref spec file + master_common.apply | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 26%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| mama · bd1 a51 oneref spec file + master_common.apply | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| mama · bd1 a51 oneref spec file + master_common.apply | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 24%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| trieu3 · r21 t3_c06_RAN.txt + master_common.apply | GOOD (builder output) | no MASTER fail | **FAIL** | 0 | FAIL S34 MISSING: FOREHEAD: nothing on the forehead (D9) (best overlap 50%) |
| trieu3 · r21 t3_c06_RAN.txt + master_common.apply | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 26%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| trieu3 · r21 t3_c06_RAN.txt + master_common.apply | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| trieu3 · r21 t3_c06_RAN.txt + master_common.apply | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 35%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |
| trieu3 · m04 triều phục t3 (build.py --trieu 3) | GOOD (builder output) | no MASTER fail | **FAIL** | 0 | FAIL S04 REWRITTEN: EMBROIDERY stitched into the cloth (thêu trực tiếp) (best overlap 88%) |
| trieu3 · m04 triều phục t3 (build.py --trieu 3) | (a) master block removed | FAIL | **FAIL** | 14 | FAIL M01 MASTER MISSING: master sentence (best overlap 26%): Soft painted guofeng game illustration in EXACTLY the drawing style of… |
| trieu3 · m04 triều phục t3 (build.py --trieu 3) | (b) master M03 edited ('parchment'→'silk') | FAIL | **FAIL** | 1 | FAIL M03 MASTER REWRITTEN: master sentence (best overlap 96%): Full-body figure from head to feet, centered with margin around it, pl… |
| trieu3 · m04 triều phục t3 (build.py --trieu 3) | (c) thướt tha FABRIC M06 dropped | FAIL | **FAIL** | 1 | FAIL M06 MASTER MISSING: master sentence (best overlap 29%): The FABRIC is thin, light, flowing silk and gauze with a soft sheen an… |

0 case(s) misbehaved

## Conflicts per builder (job 2, A18: listed, NOT deleted — foreman takes them to the owner)

Main ones (read by hand):

| # | builder(s) | approved sentence already there | master sentence it now meets |
|---|---|---|---|
| C1 | build.py / build_all (all ranks, ma ma, triều, Nữ đế), build_npc, emperor-B | 'Semi-realistic painterly guofeng portrait style, near-3D realistic rendering…' | M01 'Soft painted guofeng game illustration … NOT a photo … NOT 3D' (opposite rendering words) |
| C2 | store ranks | 'IGNORE the reference image's background completely; the background is completely transparent…' | M03 'plain light parchment background' |
| C3 | all multi-reference prompts (store: identity ref / image 1 / image 2; face v3b redraws: 'From image 2 take ONLY…') | numbered references | M01/M02 speak of 'the reference image' (one ref) |
| C4 | face makers v3/v5 (c/s files) | 'Colour tone: all colours at ONE medium tone level…' (the old medium-tone face sentence, Lượt 750 says the master replaces it) | M05 B18 tone |
| C5 | all a51/a65 (store, Thái hậu, ma ma) | elder 'DEEPER, DARKER' colour rule (S33) / maid 'clear, soft and held back' | M05 young B18 tone (G4) |
| C6 | face v3 base files (m01–m52, 35 c, 12 s) | 'mouth CLOSED with the lips softly together…' (old) | M10 strong closed-mouth words (both now in the prompt) |
| C7 | store t7/t8/Nữ đế; outfit slots | 'FABRIC: thick gold-embroidered brocade…', 'silk satin', 'silk crepe' | M06 thin light flowing silk and gauze |
| C8 | store / triều / ma ma / emperor | 'body and face frontal…', 'calm standing pose', 'standing calmly' | M09 weight on one leg, knee softly bent |
| C9 | emperor-B, build_npc men | men's text | M04/M08/M09/M10 women's wording (G3) |

Full keyword scan (`python3 dev/art/mg1_conflicts.py`; one current output per builder; keyword match, so some lines are only near-topic — read each):

| builder | sample | topic | conflicts with | approved sentence now beside the master (first 170 chars) |
|---|---|---|---|---|
| face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4) | s46.v5 (new face) | old / other mouth words | M10 | Expression: A COLD, icy, distant stare straight at the viewer, the face completely still, the lips in a calm straight closed line with at most the faintest trace of a smi |
| face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4) | s46.v5 (new face) | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Outfit: a light open beizi of cool aquamarine silk satin with a soft sheen over a cross-collar soft lilac violet inner top and a soft lilac violet floor-length skirt of p |
| face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4) | s46.v5 (new face) | other colour-tone sentence | M05 (B18 young tone) | TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour cool aquamarine like #86CDB9 and the SECONDARY colour soft lilac violet  |
| face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4) | s46.v5 (new face) | other colour-tone sentence | M05 (B18 young tone) | Colour tone: all colours at ONE medium tone level, the same as the soft coral-red and brick-red robes of the game: medium saturation, medium lightness, neither too fresh  |
| face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4) | s46.v5 (new face) | frontal / calm standing | M09 weight on one leg | Pose: standing still and upright with her weight on one leg, a small round white jade bi disc on a pale silk cord held up at chest height in one hand, the other hand hang |
| face makers (v3 base faces) | m04.v3b (approved base) | reference numbering | M01/M02 say 'the reference image' (one ref) | Image 1 is this girl: copy ONLY her face and facial features from image 1 (never its pose, angle or outfit details); image 2 gives ONLY the drawing style and the skin col |
| face makers (v3 base faces) | m04.v3b (approved base) | reference numbering | M01/M02 say 'the reference image' (one ref) | From image 2 take ONLY the drawing style and the skin colour: NEVER copy its face. |
| face makers (v3 base faces) | m04.v3b (approved base) | old / other mouth words | M10 | The whole face clearly visible, eyes fully open and bright (never half-closed, sleepy or hooded), mouth CLOSED with the lips softly together, absolutely NO teeth visible, |
| face makers (v3 base faces) | m04.v3b (approved base) | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| face makers (v3 base faces) | m04.v3b (approved base) | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Outfit: a cross-collar ruqun of warm apricot silk crepe with a pale apricot-cream floor-length skirt of plain silk, small embroidered orchids at the collar and cuffs, a s |
| face makers (v3 base faces) | m04.v3b (approved base) | frontal / calm standing | M09 weight on one leg | Pose: standing calmly, raising a sprig of plum blossom beside her cheek with one hand, the other hand resting at her sash, body FULLY FRONTAL facing the viewer (not turne |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a  |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All flowers, birds and butterflies are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqu |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | frontal / calm standing | M09 weight on one leg | HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body. |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | frontal / calm standing | M09 weight on one leg | ANGLE: a clear THREE-QUARTER view toward the LEFT, NOT frontal: her whole body, hips and face turned about 45 degrees to the left, her right shoulder nearer the viewer, f |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | other colour-tone sentence | M05 (B18 young tone) | TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour warm apricot like #DBB294 and the SECONDARY colour indigo blue like #4E5 |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | PHI BẠCH: the sheer shawl draped behind her back and over her arms is a very sheer, highly translucent gauze shawl in indigo blue like #4E5D97 (her secondary colour, clea |
| build_all.py (store build.py, rank prompts) | m04 t2 a26 | background / light | M03 | IGNORE the reference image's background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flow |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Outfit (the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks): the Empress's imperial phoenix ceremonial robe of golden yellow silk mixed w |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a  |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All flowers, birds and the phoenix are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqu |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | frontal / calm standing | M09 weight on one leg | HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body. |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | other colour-tone sentence | M05 (B18 young tone) | THREE-COLOUR RULE (t7/t8): the whole outfit uses EXACTLY THREE colours that clearly interact: the royal golden yellow (honey-gold like #EFBD69), the MAIN colour warm apri |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour. |
| build_all.py (store build.py, rank prompts) | m04 t8 a26 | background / light | M03 | IGNORE the reference image's background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flow |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other drawing-style words | M01 | STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous paint |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other colour-tone sentence | M05 (B18 young tone) | Her robe keeps the same colour families as described below, but every colour is a DEEPER, DARKER, rich mature shade, the dark dignified tones an empress dowager or senior |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | COLOUR RULE: all colours in the DEEPER, DARKER mature shades described above (rich and dignified, never bright, never pastel, never dusty or washed-out); the colour names |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All flowers, birds and butterflies are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqu |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | frontal / calm standing | M09 weight on one leg | HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body. |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | frontal / calm standing | M09 weight on one leg | ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, her weight resting on her LEFT foot; her head turns together with her shoulders and body, n |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other colour-tone sentence | M05 (B18 young tone) | TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour warm apricot like #DBB294 and the SECONDARY colour indigo blue like #4E5 |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | PHI BẠCH: the sheer shawl draped behind her back and over her arms is a very sheer, highly translucent gauze shawl in indigo blue like #4E5D97 (her secondary colour, clea |
| build_all.py (store build.py, rank prompts) | m04 t2 a51 | background / light | M03 | IGNORE the reference image's background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flow |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Outfit (the Empress (Hoàng hậu), clearly much richer and more splendid than the lower ranks): the Empress's imperial dragon ceremonial robe of golden yellow silk mixed wi |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | NỮ ĐẾ: she is the Female Emperor (Nữ đế), the highest rank of all, equal to the Empress in colour but clearly more majestic, and different in design from the Empress's ro |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | SLEEVES: very long, very wide, flowing sleeves that fall well past her hands and hang PAST her ankles all the way down until they TOUCH THE FLOOR, ONE single sleeve layer |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | background / light | M03 | COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a  |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All flowers, birds and the dragon are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; she holds a gold dragon hairpin with jade dangles, held in the hand in a contrasting colour, not the robe colour, the item held below the chin,  |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | held item | M12 exactly one held item | Her hands and body: the box in both hands at waist height before her. |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour. |
| build_all.py (store build.py, rank prompts) | m04 tnude a26 | background / light | M03 | IGNORE the reference image's background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flow |
| build.py --state mama (ma ma) | m05 a51 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build.py --state mama (ma ma) | m05 a51 | old / other mouth words | M10 | Expression: A clear bright striking gaze, defined elegant features, a subtle poised closed-lip smile, eyes fully open, never a stretched grin. |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 51, a graceful beautiful older lady who ages be |
| build.py --state mama (ma ma) | m05 a51 | other drawing-style words | M01 | STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous paint |
| build.py --state mama (ma ma) | m05 a51 | other colour-tone sentence | M05 (B18 young tone) | Her robe keeps the same colour families as described below, but every colour is a DEEPER, DARKER, rich mature shade, the dark dignified tones an empress dowager or senior |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | Outfit (the ma ma costume, exactly the cut of image 3, never poor): a long robe of fine embroidered silk brocade with a subtle woven pattern; a sleeveless embroidered ove |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | COLOUR RULE: take ONLY the cut from image 3; |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | RECOLOUR the whole costume to her own colour coral red (the same colour family as her 36-year-old self) at a DEEPER, more muted, mature shade of her coral red: a deeper m |
| build.py --state mama (ma ma) | m05 a51 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Any flower or pattern on the fabric is fine silk-thread embroidery stitched directly into the fabric, flat, following the folds, never printed or pasted-on. |
| build.py --state mama (ma ma) | m05 a51 | frontal / calm standing | M09 weight on one leg | ANGLE: a clear THREE-QUARTER view toward the RIGHT, NOT frontal: her whole body, hips and face turned about 45 degrees to the right, her left shoulder nearer the viewer,  |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | Her hair, hairpins and hair flower come ONLY from the identity reference and this text; the style reference image must not influence her hair. |
| build.py --state mama (ma ma) | m05 a51 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; she holds an abacus framed in dark lacquered wood with brass fittings in a contrasting colour, not the robe colour, the item held below the chin |
| build.py --state mama (ma ma) | m05 a51 | held item | M12 exactly one held item | Her hands and body: the item held in both hands lowered before her at waist height, head tilted gently toward the viewer. |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | Image 3 is only a costume reference for the cut, layers, embroidery and accessories of the outfit; never copy its face, hair, pose or background; its front layer has ONE  |
| build.py --state mama (ma ma) | m05 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | The first reference image is style only: IGNORE its background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no par |
| build.py --trieu (triều phục) | m04 t3 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build.py --trieu (triều phục) | m04 t3 | frontal / calm standing | M09 weight on one leg | Expression: A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin. |
| build.py --trieu (triều phục) | m04 t3 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features, hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessor |
| build.py --trieu (triều phục) | m04 t3 | reference numbering | M01/M02 say 'the reference image' (one ref) | The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 22, youthful adult. |
| build.py --trieu (triều phục) | m04 t3 | other colour-tone sentence | M05 (B18 young tone) | COLOUR RULE: all colours at ONE medium tone level, the same as the soft coral-red and brick-red robes of the game: medium saturation, medium lightness, neither too fresh  |
| build.py --trieu (triều phục) | m04 t3 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All embroidery is fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches |
| build.py --trieu (triều phục) | m04 t3 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; she holds a small celadon vase with a flower sprig in a contrasting colour, not the robe colour, the item held below the chin, the hand really g |
| build.py --trieu (triều phục) | m04 t3 | frontal / calm standing | M09 weight on one leg | Her hands and body: the vase cradled in both hands at waist height, one hand under its base, body turned a little more than slightly, halfway between frontal and three-qu |
| build.py --trieu (triều phục) | m04 t3 | reference numbering | M01/M02 say 'the reference image' (one ref) | The first reference image is style only: IGNORE its background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no par |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY her face, facial features and hairstyle colour; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 51, a graceful beautiful older lady who ages be |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | other drawing-style words | M01 | STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous paint |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | other colour-tone sentence | M05 (B18 young tone) | Her robe keeps the same colour families as described below, but every colour is a DEEPER, DARKER, rich mature shade, the dark dignified tones an empress dowager or senior |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | Outfit: a deep golden-brown brocade robe embroidered with phoenixes, ornate gold and jade headdress. |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; hands folded at her waist. |
| build_npc.py (Thái hậu) | thaihau-h1 a51 | reference numbering | M01/M02 say 'the reference image' (one ref) | IGNORE the style reference image's background completely: the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painte |
| build_npc.py (men) | man-thive-1 a26 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| build_npc.py (men) | man-thive-1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | A handsome man: a palace guard in lacquered dark armour over a red robe, a sword at his hip. |
| build_npc.py (men) | man-thive-1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | His face: oval face. |
| build_npc.py (men) | man-thive-1 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY his face, facial features and hairstyle colour; do NOT copy the outfit, crown or accessories of the reference, dress him in the NEW  |
| build_npc.py (men) | man-thive-1 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 30, mature and poised. |
| build_npc.py (men) | man-thive-1 a26 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; standing calmly. |
| build_npc.py (men) | man-thive-1 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | IGNORE the style reference image's background completely: the background is completely transparent with NOTHING behind or around him: no backdrop, no parchment, no painte |
| emperor-B/build.py | live1 a26 | other drawing-style words | M01 | Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference port |
| emperor-B/build.py | live1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | An imperial emperor (Hoàng thượng). |
| emperor-B/build.py | live1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | His face: a handsome oval face, soft round-almond eyes, gently arched brows, a thin neat moustache. |
| emperor-B/build.py | live1 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | From the identity reference keep ONLY his face, facial features and hairstyle colour; do NOT copy the outfit, crown or accessories of the reference, dress him in the NEW  |
| emperor-B/build.py | live1 a26 | reference numbering | M01/M02 say 'the reference image' (one ref) | The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose. about 30, mature and poised. |
| emperor-B/build.py | live1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | Outfit (the Emperor, clearly the most splendid man in the palace): a round-collar imperial dragon robe of golden yellow silk with a large front dragon medallion on the ch |
| emperor-B/build.py | live1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | SILHOUETTE: a man's robe that falls straight to the ankles, no train, nothing trailing behind; if shoulder pieces are worn they are STIFF, structured, firm armour-like sh |
| emperor-B/build.py | live1 a26 | other colour-tone sentence | M05 (B18 young tone) | COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; the royal golden yellow is the DOMINANT colour of the whole robe, sleeves and skirt (far more t |
| emperor-B/build.py | live1 a26 | other fabric words | M06 thin flowing silk+gauze / M07 / M08 | All dragons, clouds and waves are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, no |
| emperor-B/build.py | live1 a26 | frontal / calm standing | M09 weight on one leg | Pose: calm standing pose; he holds a gold-mounted imperial scroll in a contrasting colour, not the robe colour, the item held below the chin or before the waist, the hand |
| emperor-B/build.py | live1 a26 | men in women's wording | M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3 | His hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while his head stays up facing the viewer, eyes open, lips clo |
| emperor-B/build.py | live1 a26 | frontal / calm standing | M09 weight on one leg | His hands and body: the rolled scroll in one hand lowered at his side, the other hand resting lightly at his belt, body and face frontal, standing squarely facing the vie |

## Ledger audit (job 4)

`dev/handover/reports/MG1-ledger-audit.md`: 2047 gens · 1417 lack the block · 0 have it · 630 have no prompt text in the ledger (most EMO-ANIM / PLACE). Per kind + every id there. Nothing redrawn (Lượt 757).

## m04 sample (job 5)

`dev/handover/reports/MG1-m04-sample.md`: old = approved m04.v3b.FULL.txt (KC_REFS) → gate FAIL (M02 M05 M06 M07 M10 + S34); new = face_gate.final(old) → PASS; adds M02 M05 M06 M07 M10 + D9, deletes nothing. Foreman runs the gen.

## Notes for the next worker

- Partial clone: large files carry skip-worktree ('S'); `git update-index --no-skip-worktree dev/art/t8-prompt-B/build.py` before editing it (done here).
- Changing the master = edit SRC in make_master_common.py (copy from an approved file), run it, then `python3 dev/art/mg1_gate_proof.py` + `build_all.py --check --age aNN`.
