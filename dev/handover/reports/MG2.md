START_CTX ≈ 5 % of the 1M window (get_session context_usage.used_tokens read 0 → own estimate ~50k), session depth 1 (child of ROOT-57); rollover line ≈ 30 %, ceiling 60 %. Finished at ≈ 15 %: no handover needed.

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
