START_CTX ≈ 5 % of the 1M window (get_session context_usage.used_tokens read 0 → own estimate ~50k), session depth 1 (child of ROOT-57); rollover line ≈ 30 %, ceiling 60 %. L779 part finished at ≈ 15 %. Later orders (L780/L781/L784) took it to ≈ 28 % (own estimate; get_session reads 0) → HANDOVER for L784 items 6–8 at the end of this file.

# MG2 — owner Lượt 779 (C1 drawing style, C5 elder colours, C7 WAIT) — DONE, prompt/builder/gate only, NO gens

Successor of MG1 (handover at the end of `dev/handover/reports/MG1-master-gate.md`, commit 3f9b5f1). Rebased on SL1 (Lượt 778 sleeve sentence, 5986c3e / 295a6ee): one conflict in `build_npc.py` thaihau(), merged by hand (SL1's TH_SLEEVES kept + my elder sentence).

## Tóm tắt cho chủ (owner summary)

1. **C1 kiểu vẽ**: câu cũ "Semi-realistic painterly guofeng portrait style, near-3D realistic rendering … reference portraits" đã BỎ khỏi mọi máy làm prompt (phi tần t1–t8 / công chúa / ma ma / triều phục / Nữ đế qua build.py + build_all, Thái hậu + nam + trẻ qua build_npc, Hoàng thượng emperor-B). Kiểu vẽ giờ CHỈ còn câu thiếu nữ đã duyệt (M01/M02 trong khối chung).
2. Cổng kiểm thêm luật cấm **X18** (`semi-realistic | near-3D | realistic rendering`) cho MỌI loại, kể cả mặt (face) và các trạng thái: prompt nào còn chữ đó → FAIL, không được vẽ.
3. **C5 màu người già a51/a65**: giữ câu màu người già (màu gốc của cô, đậm/trầm như bà lớn tuổi). Câu chung M05 (tông trẻ) nằm ở đầu prompt; câu người già nằm SAU nó và có thêm một vế nối (chữ chép từ S33): "this elder colour rule wins over the first COLOUR RULE (medium-light tone): her own colours in the DEEPER, DARKER mature shades described above, never bright, never pastel". Thái hậu cũng có câu này ở 51/65. Nữ đế giữ B23 (không làm tối) — không có câu này.
4. **C7 vải**: CHỜ (chủ đang so tranh) — không đụng.
5. Không vẽ tấm nào (Lượt 777).

## Before / after (full files in `dev/handover/reports/MG2-samples/`)

**HH t8 a26** — `build_all.py m04 8 --age a26` (only change):
- BEFORE: `… Every hairpin points upward or backward, never sticking out sideways. Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; …`
- AFTER: `… Every hairpin points upward or backward, never sticking out sideways. Full-body standing figure head to feet, centered, plain light parchment background, soft even light; …`

**a65** — `build_all.py m04 2 --age a65` (two changes):
- same style change as above, and
- BEFORE: `COLOUR RULE: all colours in the DEEPER, DARKER mature shades described above (rich and dignified, never bright, never pastel, never dusty or washed-out); the colour names and hex values below are her young colours, darken them as described above; elegant, luxurious elder colours that read as a calm, dignified older lady, never vivid or fresh bright colours, yet never black or brown; her ORIGINAL robe colour …`
- AFTER: `… yet never black or brown; this elder colour rule wins over the first COLOUR RULE (medium-light tone): her own colours in the DEEPER, DARKER mature shades described above, never bright, never pastel; her ORIGINAL robe colour …`
- Order in the a65 prompt: M05 (master, young tone) = sentence 6 near the top → AGE_TXT "Her robe keeps … DEEPER, DARKER, more subdued shade suited to an elderly lady" → S33 elder COLOUR RULE + bridge. Elder after M05 ✓.

## What changed (files)

| file | change |
|---|---|
| `dev/art/t8-prompt-B/build.py` | PRE starts "Full-body standing figure…" (old style clause removed, comment cites Lượt 779); TYC re-make sentence "painterly near-3D drawing style" → "drawing style"; TYC_PRE_RENDER rename step now asserts the clause is gone; new `ELDER_M05_BRIDGE` / `ELDER_M05_SENT`, appended right after the S33 elder COLOUR RULE at a51/a65; `_legacy_master` also accepts pre-L779 ledger prompts |
| `dev/art/emperor-B/build.py` | own PRE copy: same removal |
| `dev/art/t8-prompt-B/build_npc.py` | Thái hậu a51/a65: `B.ELDER_M05_SENT` right after the age text (after M05); `--verify` accepts pre-L779 ledger prompts |
| `dev/art/master_common.py` | `STYLE_OLD` + `legacy(text)` (maps a pre-L779 prompt to today's wording, ONLY for ledger/verify compares, never to make a prompt) |
| `dev/art/check_store.py` | BANNED **X18** (regex `semi-realistic|near-3D|realistic rendering`, scope `any` = every scope incl. face and states, negation no, luot 779); X scope `any` now honoured in check_text (as S entries already were). No S-entry held the old sentence (no CANON OVERWRITE needed). |
| `dev/art/APPROVED_SENTENCES.md` | regenerated (`--registry-md`) |
| `dev/art/nude-B/prompts/` m01 m04 m10 m16 m22 m28 m29 (35 files) | regenerated with `nude-B/mk.py`; 30 differ ONLY by the style clause; m29 (5) also gets the master block it lacked (= `master_common.apply(legacy(old))` exactly). All 35 `check_store --scope nude` PASS |
| `dev/handover/reports/MG1-master-gate.md` | conflict rows C1, C5 marked RESOLVED |

nude-B/mk.py itself had no style words of its own (checked); its gate `no DEEPER|DARKER in Nữ đế` still holds (the bridge never lands there).

## Gates (after rebase on SL1 295a6ee)

- `check_store.py --self`: 38 sentences, 18 banned, 0 problems.
- `build_all.py --check --age a18 / a26 / a36 / a51 / a65`: 416 prompts each, **0 FAIL** (a26/a51/a65 re-run after the rebase).
- `mg1_gate_proof.py`: **0 case(s) misbehaved** (before the rebase the Nữ đế m04 a26 case failed on S37 — SL1's sleeve sentence, not mine; fixed by SL1 295a6ee).
- X18 proof: the BEFORE a26 prompt → `FAIL X18 BANNED`; a face prompt + "Semi-realistic painterly style." → `FACE GATE FAIL s46: X18`.
- build_npc thaihau h1–h3 × a36/a51/a65 → no X18 / MASTER fail; emperor-B live1 → no X18 / MASTER fail.
- `mg1_conflicts.py`: 0 'semi-realistic/near-3D' rows left; remaining 'drawing-style' rows = the D15 STYLE LOCK (approved, same thiếu nữ drawing, "NEVER photo-realistic") — not old style words.

## Left for ROOT-57 / owner (not done, by design)

- **m05 Nữ đế stored prompts** (`nude-B/prompts/m05_a*.txt`, 5 files) still hold the old clause: they are stale vs mk.py (no master block, old "THREE-QUARTER view" angle), so I did NOT regenerate them (that would change more than the style). X18 now blocks them; rebuild with `python3 dev/art/nude-B/mk.py m05` when someone needs them.
- **Stored / record prompt files** (~1 200 under dev/: mama-specs 461, golden_low 192, owner-copy 215, store-all/test 36, approved/proof 12, emperor golden 12 …) still contain the old clause. They are records of past gens, not builders; X18 FAILs any of them if it is fed to a gen → rebuild through the builder.
- `dev/art/ART_RULES.md` D11 still reads "STYLE: semi-realistic painterly guofeng, near-3D … (choice B)". Rules file = foreman's: please update D11 to cite Lượt 779 (style = M01/M02 thiếu nữ).
- `dev/art/item_spec.py` (items / still life, not figures) keeps "semi-realistic painterly guofeng still life, near-3D realistic rendering"; `t8-prompt-B/ngheo_old.py` (old, unused) too. Out of C1 scope (figures) unless the owner says items too.
- Men a51/a65 (emperor-B, build_npc men): no elder colour rule exists there, so no bridge added.
- C7 fabric: WAIT.


# Part 2 — owner Lượt 780 (C2 background), 781 (B12 fabric by rank), redraw prompts, 784 (gate checklist) — ROOT-57 / ROOT-58 orders, NO gens

## Tóm tắt cho chủ

1. **Nền (B9, Lượt 780)**: bỏ câu "nền trong suốt" khỏi mọi máy làm prompt; câu nền DUY NHẤT là M03 (nền giấy sáng). Vẽ không bật transparentBackground, rồi images_remove_background. Cổng cấm **X19** (chữ "transparent background") ở MỌI loại kể cả mặt.
2. **Vải theo cấp (B12, Lượt 781)**: t1–t5, mặt thiếu nữ, ma ma, cung nữ, công chúa t1–t6 = câu M06 lụa mỏng thướt tha. Quý phi t6 trở lên (t6, t7, t8, công chúa t7–t8, triều phục t6–t8, Thái hậu, Hoàng thượng, Nữ đế) = câu "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.", KHÔNG có M06. Không prompt nào có cả hai. Cổng FAIL cả hai chiều.
3. **13 prompt để vẽ lại** (Nữ đế m05 ×5, m29 ×5, Thái hậu m05 a36/a51/a65): giữ nguyên dáng / món cầm / góc / màu của prompt cũ, chỉ đổi theo luật tối nay. Tất cả qua cổng. CHƯA vẽ.
4. **Lượt 784**: luật 1–5 giờ là kiểm tra THẬT trong check_store (FAIL = không vẽ), mỗi luật có prompt đúng + prompt hỏng (bảng dưới). Luật 6–8 chuyển cho người kế (HANDOVER cuối file).

## C2 / B9 (Lượt 780)
- `t8-prompt-B/build.py`: K3_BG no longer appended (old K3 text in a trieu path still removed); `build_npc.py` K3 = "" (every NPC); `master_common.K3_RX` + `legacy()` strip it for ledger compares; `store-all/build_all.py` Thái hậu BASE had none.
- check_store **X19** regex `background is (?:completely |fully )?transparent|transparent background|(?:completely|fully) transparent with NOTHING`, scope any.
- transparentBackground=true in tools: no code passes it to Magnific. Fixed `store-all/ndx1/PAINTER_BRIEF.md` + `store-all/ndx1/nd.py` (settings string). Still say `true` (foreman briefs / old takeovers, NOT edited, for ROOT-58): dev/handover/briefs/consort-tiers-B7.md, kc-new-c13-c16.md, ngheo-poor-fix.md, nude-mass.md, nude-r10.md, nude-r11.md, root33-resume.md, thaihau-rest.md, trieu-phuc-r9.md; TAKEOVER_FOREMAN_C_ROOT34–41.md; dev/art/np1/m09_fabric_test.txt; dev/archive/reports/*.

## B12 (Lượt 781)
- `master_common.py`: `BROCADE`, `HIGH_SCOPES`, `apply(text, high)` (M06 not inserted, asserts M06 absent), `check(text, high)` (high: BROCADE exactly once + no M06; low: no BROCADE). check_store passes `high_scope(scope)`.
- Builders: build_all `laws()` t6 consort gets FABRIC_B (princess t6 not); build.py master apply rank-aware + BROCADE before Pose for triều t6-8 / thaihau state; build_npc Thái hậu BROCADE + apply(high); emperor-B BROCADE + apply(high); mk.py apply(high); build_all Thái hậu apply(high).
- S07 scope → `tp6-8 pr7-8 nude trieu6-8 thaihau state:thaihau emperor`.
- **Owner to confirm**: triều phục t6–t8 counted as "t6 and above" (brocade). Princess t6 kept M06 ("princesses stay as their builders are").
- `mg1_gate_proof.py` broken cases now rank-aware (low: M06 dropped / brocade added; high: brocade dropped / M06 added): 0 misbehaved.

## Extra C1/C5 path found: build_all Thái hậu
`store-all/build_all.py thaihau()` starts from `elder-copy/THAIHAU_1811_c04_a36_BASE.txt`, which still had the old style clause (X18 caught it). Now removed in thaihau() + C5 sentence after the 18/11 COLOUR TEXT at a51/a65. Thái hậu gate PASS a36/a51/a65.

## C5 everywhere (Lượt 784 item 5)
build.py now adds `ELDER_M05_SENT` after her age text at a51/a65 on every non-Nữ-đế path that lacks the S33 clause (ma ma, triều, cung nữ/nữ quan states). Note: Thái hậu **a36** also carries master M05 (young tone) next to her 18/11 'MUTED and deep' colour rule — C5 covers only a51/a65; owner to say if a36 Thái hậu needs it.

## Redraw prompts (13) — `python3 dev/art/mg2_redraw.py` (re-runnable, idempotent; NO gens)
Same pose / item / angle / colours / face words as the stored prompt; only tonight's rules changed. All PASS check_store (Nữ đế scope nude; Thái hậu scope tp8 with the build_all S03/S33 exemption) and carry the SL1 sleeve-hold sentence. Diff vs HEAD before this commit (M01…M12 = master sentences):

| new file (from) | removed | added |
|---|---|---|
| `m05_a18.txt` (m05_a18.txt) | old style clause; full-body standing figure head to feet, centered, …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m05_a26.txt` (m05_a26.txt) | old style clause; full-body standing figure head to feet, centered, …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m05_a36.txt` (m05_a36.txt) | old style clause; full-body standing figure head to feet, centered, …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m05_a51.txt` (m05_a51.txt) | old style clause; full-body standing figure head to feet, centered, …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m05_a65.txt` (m05_a65.txt) | old style clause; full-body standing figure head to feet, centered, …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m29_a18.txt` (m29_a18.txt) | M06; the small embroidered motifs are stitched in fine …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | — |
| `m29_a26.txt` (m29_a26.txt) | M06; the small embroidered motifs are stitched in fine …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | — |
| `m29_a36.txt` (m29_a36.txt) | M06; the small embroidered motifs are stitched in fine …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | — |
| `m29_a51.txt` (m29_a51.txt) | M06; the small embroidered motifs are stitched in fine …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | — |
| `m29_a65.txt` (m29_a65.txt) | M06; the small embroidered motifs are stitched in fine …; IGNORE the reference image's background completely…; the background is completely transparent with NOTH… | — |
| `m05_thaihau_a36.L781.prompt.txt` (m05_thaihau_a36.B22.prompt.txt) | old style clause; full-body standing figure head to feet, centered, … | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M05, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, … |
| `m05_thaihau_a51.L781.prompt.txt` (m05_thaihau_a51.B22.prompt.txt) | old style clause; full-body standing figure head to feet, centered, … | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M05, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, …, D15 STYLE LOCK, (D15 cont.), C5 elder bridge |
| `m05_thaihau_a65.L781.prompt.txt` (m05_thaihau_a65.B22.prompt.txt) | old style clause; full-body standing figure head to feet, centered, … | M01, NOT a photo, NOT a realistic real person, NOT 3D.…, M02, M03, M04, M05, M08, no sheer floating scarf, stole, shawl or veil unle…, M09, the lower body matches the movement of the upper b…, M10, absolutely NO teeth visible at all, no white line …, M11, M12, no cup, no teacup, no teapot, no bowl.…, M13, Full-body standing figure head to feet, centered, …, D15 STYLE LOCK, (D15 cont.), C5 elder bridge |

## L784 gate table (`python3 dev/art/mg2_l784_proof.py`)

/home/user/cung-tuong-mong/dev/art/mg2_l784_proof.py:48: DeprecationWarning: 'count' is passed as positional argument
  [("elder clause removed", re.sub(r"this elder colour rule wins over[^;]*; ", "", t2, 1), "C5"),
/home/user/cung-tuong-mong/dev/art/mg2_l784_proof.py:49: DeprecationWarning: 'count' is passed as positional argument
  ("elder clause moved before M05", re.sub(r"this elder colour rule wins over[^;]*; ", "", t2, 1).replace(M["M05"], "At this age this " + MC.ELDER_KEY + ": her own colours. " + M["M05"], 1), "C5")])
| rule | check id | scopes | prompt | case | expected | got | first FAIL line |
|---|---|---|---|---|---|---|---|
| 1 B9 Lượt 780 background | X19 + MASTER M03 | any (all scopes, face, states) | m04 HH t8 a26 | GOOD (builder) | PASS | **PASS** |  |
| 1 B9 Lượt 780 background | X19 + MASTER M03 | | | transparent-bg sentence added | FAIL X19 | **FAIL** | FAIL X19 BANNED: transparent-background words (B9 GEN METHOD: draw on parchment, then images_remove_background |
| 1 B9 Lượt 780 background | X19 + MASTER M03 | | | M03 parchment removed | FAIL M03 | **FAIL** | FAIL M03 MASTER MISSING: master sentence (best overlap 46%): Full-body figure from head to feet, centered with |
| 2 C1 Lượt 779 style | X18 + MASTER M01/M02 | any incl. face | face s46.v5 + face_gate | GOOD (builder) | PASS | **PASS** |  |
| 2 C1 Lượt 779 style | X18 + MASTER M01/M02 | | | old store style clause added | FAIL X18 | **FAIL** | FAIL X18 BANNED: old store drawing style 'semi-realistic / near-3D / realistic rendering': …Semi-realistic pai |
| 2 C1 Lượt 779 style | X18 + MASTER M01/M02 | | | M01 removed | FAIL M01 | **FAIL** | FAIL M01 MASTER MISSING: master sentence (best overlap 23%): Soft painted guofeng game illustration in EXACTLY |
| 3 B12 Lượt 781 fabric (low) | MASTER M06 + B12 | t1-t5, faces, maids, pr1-6 | m04 t2 a65 | GOOD (builder) | PASS | **PASS** |  |
| 3 B12 Lượt 781 fabric (low) | MASTER M06 + B12 | | | brocade added | FAIL B12 | **FAIL** | FAIL B12 MASTER LOW RANK: B12: brocade fabric sentence in a t1-t5 / face / maid prompt (must be M06 thướt tha  |
| 3 B12 Lượt 781 fabric (low) | MASTER M06 + B12 | | | M06 removed | FAIL M06 | **FAIL** | FAIL M06 MASTER MISSING: master sentence (best overlap 35%): The FABRIC is thin, light, flowing silk and gauze |
| 3 B12 Lượt 781 fabric (high) | MASTER M06 + B12 | tp6-8 pr7-8 triều6-8 nude Thái hậu Hoàng thượng | m04 HH t8 a26 | GOOD (builder) | PASS | **PASS** |  |
| 3 B12 Lượt 781 fabric (high) | MASTER M06 + B12 | | | M06 added | FAIL M06 | **FAIL** | FAIL M06 MASTER HIGH RANK: B12: master M06 (thin silk+gauze, thướt tha) in a t6+ / Thái hậu / Hoàng thượng / N |
| 3 B12 Lượt 781 fabric (high) | MASTER M06 + B12 | | | brocade removed | FAIL B12 | **FAIL** | FAIL B12 MASTER BROCADE MISSING: B12: t6+ fabric sentence 'FABRIC: thick gold-embroidered brocade with a grace |
| 4 G5 Lượt 778 sleeve hold | S37 (FLOOR SLEEVE) | any prompt with a floor-length sleeve | Thái hậu m05 a36 (build_all) | GOOD (builder) | PASS | **PASS** |  |
| 4 G5 Lượt 778 sleeve hold | S37 (FLOOR SLEEVE) | | | sleeve-hold removed | FAIL S37 | **FAIL** | FAIL S37 FLOOR SLEEVE: a floor-length sleeve sentence is present but the sleeve-hold sentence S37 appears 0 ti |
| 5 C5 Lượt 779 elder colours | C5 | a51/a65, every lady scope; Nữ đế must NOT | m04 t2 a65 | GOOD (builder) | PASS | **PASS** |  |
| 5 C5 Lượt 779 elder colours | C5 | | | elder clause removed | FAIL C5 | **FAIL** | FAIL C5 MISSING: a51/a65: elder colours must win over M05: 'elder colour rule wins over the first COLOUR RULE  |
| 5 C5 Lượt 779 elder colours | C5 | | | elder clause moved before M05 | FAIL C5 | **FAIL** | FAIL C5 ORDER: the elder-colour clause must come AFTER master M05 |
| 5 C5 Lượt 779 (Nữ đế B23) | C5 | nude a51/a65 | Nữ đế m29 a51 (stored, redraw-ready) | GOOD (builder) | PASS | **PASS** |  |
| 5 C5 Lượt 779 (Nữ đế B23) | C5 | | | elder clause added | FAIL C5 | **FAIL** | FAIL C5 NỮ ĐẾ B23: Nữ đế keeps her bright a36 colours: no elder-colour clause |

0 case(s) misbehaved

Gates after all of this: `check_store --self` 38 sentences / 19 banned / 0 problems; `build_all --check` a18 a26 a36 a51 a65 = 0 FAIL each; `mg1_gate_proof` 0 misbehaved; `mg2_l784_proof` 0 misbehaved; `mg2_redraw` 13/13 PASS.

## HANDOVER (MG2 → successor) — L784 items 6–8 NOT started (MG2 at ≈ 28 %, roll line ≈ 30 %)
Rollover lines (copy verbatim into the takeover prompt):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

Coordinator now = Foreman C ROOT-58 session_01PEhRbuLwt3mGKRm2EJUf5s (ROOT-57 handed over 23:48Z). Branch claude/cung-tuong-mong-handover-hj0h8w only; fetch `--depth=30` that branch only; commit + push (retry 4×). Prompt / builder / gate / tool only, NO gens unless the coordinator sends an explicit gen order with the owner's Lượt.

TODO (owner Lượt 784 via ROOT-57: "every owner decision of tonight must be a REAL check in check_store (FAIL = no gen)", table rule → check id → scopes → proof = 1 good + 1 broken prompt; add rows to `dev/art/mg2_l784_proof.py`, report the table, regenerate APPROVED_SENTENCES.md, then "MG2 L784 DONE <hash>" to ROOT-58):
6. **B20 / Lượt 763/769/770**: face prompts of s46–s61 (and any face / new-person prompt) must use exactly her root hex pair from `dev/art/face-common/s_root_colours.json` / `palettes_season.json` (FAIL on a self-picked or old hex); no 'deep/dark' colour adjectives on consort colour words. Face prompts are gated in `face-common/face_gate.py` → `check_text(v,'face')`; the person id is passed to face_gate.final(text, pid) — put the hex check where the pid is known (face_gate or a new check_store helper taking pid). P1/P2 palette86 workers changed s46–s61 roots tonight (commits 234e4d5, 2fc018f, ca2f56c) — read the current json, do not trust older reports.
7. **B24**: rank colour hex per rank (if not already gated) — read ART_RULES B24 + FOREMAN_C_STATUS 'Lượt 726/728 B24 frame colours' first; it may be a UI/frame colour rule, not a figure prompt rule — check before coding.
8. **Lượt 777 ledger guard**: a gen line for a person/age/rank that already has a cut in `dev/art/gen_ledger.jsonl` needs `"owner_ok":"Lượt N"` in the ledger entry, else the gen tool wrapper / check prints FAIL; document how painters pass it (NEW_CHARACTER_TEMPLATE.md / ART_RULES pointer for the foreman).
Also listed for MG2 in TAKEOVER_FOREMAN_C_ROOT58.md but never sent to MG2: L800 F14 (no Qing headdress words + list of drawn pictures with them), L806 ANGLE AUDIT, and "redraw the 13 pictures one try each" (a GEN job: only with an explicit order + owner Lượt).
Notes: partial clone — `git update-index --no-skip-worktree <file>` before editing a big file (build.py already cleared). Run gates: `check_store.py --self`, `build_all.py --check --age aNN` (5 ages, ~1 min each), `mg1_gate_proof.py`, `mg2_l784_proof.py`, `mg2_redraw.py`.

### HANDOVER addendum (orders that arrived 23:35–23:51Z, after the handover above; MG2 at ≈ 30 % → stopped)
Coordinator = ROOT-58 session_01PEhRbuLwt3mGKRm2EJUf5s. Priority order for the successor:

**A. GEN ORDER (ROOT-58 23:50Z, owner Lượt 781 explicit: "ai đã vẽ bán tả thực và gần 3D thì phải vẽ lại cái tuổi đó"; this satisfies Lượt 777):** redraw the 13 near-3D pictures from the 13 prompt files (`python3 dev/art/mg2_redraw.py` rebuilds them), ONE try each, NO retries (faults → list, don't regen). Before drawing:
- Thái hậu **a36**: give it the C5 elder clause too (ROOT-58: her 18/11 'MUTED and deep' colour rule wins over M05). In mg2_redraw.py remake(): call the elder step for Thái hậu a36 as well (its colour text is in the a36 BASE COLOUR RULE, not in THAIHAU_1811_AGE_COLOUR.md — insert ELDER_SENT right after the sentence holding 'MUTED'), and the same in store-all/build_all.py thaihau() for a36; check_elder() in master_common covers only a51/a65 — extend to scope thaihau a36 if you make it a rule.
- Keep each picture's OWN slots/refs/settings (A17): same angle, item, age line, references, settings as its approved picture (look up each cut in dev/art/gen_ledger.jsonl: refs + settings). Cuts (ROOT-57 23:35Z): Nữ đế m05 a18/a26/a36/a51/a65 = Lw8VXB8swO cpSkl1a0eP xSB0XPJjfW s7IMfxEl8e Xm9S2dYBfo; m29 = O6EIoLwynm VX7jxxHMMU 0eUr1rQTfW 9ZHvvwbNYZ 1ldccH0r4r; Thái hậu m05 a36/a51/a65 = TH1 v624.
- a51/a65 use the NEW a36 picture as image 3 (D15) → per person draw a36 first.
- B9 method: gpt-2-6, 2K pixel sizes (1024x2304), NO transparentBackground, then images_remove_background. ≈1.8k credits total. Order: Nữ đế m05, then m29, then Thái hậu.
- OLD|NEW sheets: nu-de-B/nudeB_m05_L781_style.jpg, nudeB_m29_L781_style.jpg, thai-hau-sample/th_m05_L781_style.jpg; look full size; send ROOT-58 "MG2 REDRAW <person> READY <sheet>" per person + credits. If the permission check refuses gens, send ROOT-58 the exact calls.
- Also update ART_RULES D11 to Lượt 779 (style = master M01/M02 thiếu nữ; via rule.py set).

**B. L800 F14 (ROOT-57 23:40Z, owner Lượt 800 "phi tần không có cái cục đó ở trên đầu … bất kỳ người nào có cái cục đó phải làm lại hết"):** BANNED in all scopes + seal prompt files (dev/art/emo-anim/**): 'Qing' / 'Qing-style' / 'two-winged headdress' / 'liangbatou' / 'flag-style headdress' / 'black board headdress' / 'winged black headpiece' (new X entry, scope any; also make the seal prompts go through a check). Scan ALL builders + saved approved prompt sets; LIST every drawn picture in gen_ledger whose prompt contains them → send ROOT-58. No gens for that list.

**C. L806 ANGLE AUDIT (ROOT-57 23:46Z):** rule E1 = 14 angles (7 + 7 mirrored), seeded random per (person, rank), 8 distinct within a person, ranks even across people. (1) per builder path (build.py/build_all ranks, face makers v3/v5/NF4/L737/L761 incl. make_kieuky/quyenru/lanhlung, mk.py Nữ đế, thaihau/build_npc, emperor-B, triều, princesses): 14-table or old 7? (2) count drawn prompts in gen_ledger by LEFT/RIGHT/frontal per kind + new faces s07–s61; (3) 10 LEFT-prompt cut ids for the owner to check the model really turned left. FIX: wire every builder to the 14-table; check_store check (a) angle sentence from the 14-table, (b) balance (per person ≥1 left + ≥1 right across ranks; new-face groups ~half/half). "MG2 L806 DONE <hash>". No gens.

**D. L784 items 6–8** (above).
