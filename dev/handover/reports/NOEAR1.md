# NOEAR1 — no painted earrings on any woman (Foreman C ROOT-66 → ROOT-67 session_01PEhRbxwtuTAkw2Fc6e7Enp, owner Lượt 1037, 20/11)
depth 1 · START_CTX ≈ 3 % (get_session used_tokens read 0; own estimate) · 0 gens · 0 credits

Owner (verbatim, 20/11 ~06:50Z): "Rồi, hoa tai ổn, ok nha. Vậy tiến hành làm hoa tai, bỏ hết, kiểm tra tất cả các cái prompt của tất cả mọi người, tất cả các bậc, không có bỏ sót bất kỳ một người nữ nào, bất kỳ một cái bậc nào, không ai được đeo hoa tai."

## What changed (one source, every builder inherits it)
- `dev/art/master_common.py` (the ONE master block every figure builder calls last):
  - `EAR_SENT` = "Bare earlobes: she wears NO earrings, nothing at the ears (earrings are added later as a separate layer)."
  - `apply(text, high, female=True)`: puts EAR_SENT once right after master M11 ("Bare clean forehead, no forehead mark, no moles.") and asserts no earring word is left. Men/boys pass `female=False` → unchanged.
  - `check(text, high, female=True)` → `ear_fails`: FAIL if EAR_SENT ≠ 1 time, FAIL on any earring word outside it (`EAR_RX`: earring(s), ear-ring, ear drop/pendant/stud/hoop/cuff, jhumka, jewel/pearl/jade/gold/silver/dangle/tassel at/on/from the ears, hoa tai, bông tai, khuyên tai). Even negated words FAIL — the sentence is the only allowed mention.
  - `strip_ear(text)` = the exact source edit (below); `legacy()` uses it so old ledger gens still verify against today's builder.
- Builders (earring words removed at the source, nothing else):
  - `t8-prompt-B/build.py` 75 → 0 earring words (t7/t8 head table ×32 "…jade pins, gold earrings;" → "…jade pins;", ×35 "necklace, earrings and bracelets" → "necklace and bracelets", ma ma/nữ quan tm3/tm4 pearl/jade earrings, foreign princesses tassel earrings, thiếu nữ hair "with small earrings", nhà nghèo "small pearl earrings"). `_legacy_master` returns "not the same" on an unknown old earring wording instead of crashing.
  - `store-all/build_all.py` 4 → 0 (Ba Tư veil sentences t1–t8 "teardrop pearl earrings").
  - face-common/make_new_s62_65.py + make_c09_hand.py (F4, merged in while I worked) had an interim 'Bare earlobes … nothing at the ears.' line: now off (master_common.apply adds EAR_SENT); s62–s65 v5 + c09.v3h FULL re-made → STORE CHECK PASS; strip_ear also removes the interim line.
- `t8-prompt-B/build_npc.py`: `female = gender(i) == "f"` (NPC Thái hậu h1–h3, girls kid-f01–f24 get it; eunuchs, officials, men, boys kid-p unchanged); its ledger verify passes the same flag.
  - `emperor-B/build.py`: `female=False` (Hoàng thượng unchanged).
  - nude-B/mk.py (Nữ đế), face-common face_gate (thiếu nữ faces), pastel maker: call `apply()` → inherit it, no code change.
- Stored female prompts (master-era files used as the store): 285 files got EAR_SENT after M11 (face-common *.FULL/.txt 241 incl. pastel_L867 + season-tryon, nude-B/prompts 40, template-B 3, approved/proof m05_t8_a18_SL1 1). Word diff = only that sentence (none of them had earring words).
- Seals (separate gate, A24): `emo-anim/seal_ear.py` (new, builds) — every woman's seal prompt (not S10-male, has a female word): strip_ear; keyframes A/B get EAR_SENT right before "Whole picture on a flat pure chroma green". All 15 seal builders call `_SG.guard(_SE.ear(...))`. Earring words removed at source: sg2 ×3, th, rank_gian, grp_gian ("small (pearl) earrings").
  `emo-anim/seal_gate.py` rule **S13 NOEAR** (imports EAR_SENT/EAR_RX from master_common, no copy): woman's seal with an earring word = FAIL (all kinds); A/B without EAR_SENT once = FAIL. `--self`: 2 new bad samples + good samples carry the sentence (also fixed a latent `n` used-before-assignment in selftest).
- Gate: `check_store.py` — every scope except `--scope emperor|men` (master_common.MALE_SCOPES) runs `ear_fails` (doc line added at the MASTER BLOCK note).
- Rule **F15** added (`rule.py add F`, Lượt 1037 (20/11)), owner verbatim quoted.

## Scan table (sources of women's prompts)
| file / group | person / rank | earring words before | after |
|---|---|---|---|
| t8-prompt-B/build.py HEAD/crown table (t7 HQP, t8 HH, triều t6–t8, Nữ đế crown copy) | c01–c32, m01–m52 | yes (67: gold earrings / earrings and bracelets) | removed + EAR_SENT via apply |
| build.py ma ma / nữ quan tm3 tm4 | m01–m52 | yes (pearl / small jade / jade earrings) | removed |
| build.py foreign princesses nc/bd (home + rank) | nc1–3, bd1–3 | yes (silver tassel earrings ×2) | removed |
| build.py thiếu nữ hair line (kc) / nhà nghèo jewellery | all | yes (with small earrings / small pearl earrings) | removed |
| build.py t1–t6, trung y ty1–8, lãnh cung, cung nữ tm0–2, Thái hậu state, triều t1–t5 | all | no | EAR_SENT via apply |
| store-all/build_all.py Ba Tư veil t1–t8 | p01 bt | yes (4) | removed |
| build_npc.py | Thái hậu h1–h3, kid-f girls | no | EAR_SENT via apply; men/boys unchanged |
| nude-B/mk.py + nude-B/prompts (Nữ đế) | 40 files | no | EAR_SENT |
| face-common makers + *.FULL (thiếu nữ v3/v5/pastel/season) | 241 files | no (TEARDROP-OVAL = face shape, not jewellery) | EAR_SENT |
| template-B COMMON_v3 / m07 / m13 | 3 | no | EAR_SENT |
| emo-anim seals (15 builders, 990 leaves, 610 women's) | Thái hậu, HH, ranks, groups, maids, ma ma | yes (sg2 ×3, th, rank_gian, grp_gian) | removed; 244 women A/B keyframes carry EAR_SENT |
| emperor-B, build_npc men, sg4_set (men seals), ghen_male | men / boys | — | unchanged |
| RECORDS, not edited (gate FAILs them if reused): gen_ledger.jsonl (37), owner-copy/** (copies shown to the owner + one-off makers mk_*.py, pr-night mk.py, trieu r18–r26 RAN files, m19 V3), t8-prompt-B/golden_low (64, frozen reproduction, --golden exempt from apply), store-all/test, ngheo_old.py (not imported), emo-anim/groups/th-gian.md (sample doc), _retired/** | — | yes | unchanged (history) |

## Before / after counts
SNAPSHOT_RESULTS

## Gate proof
- `face-common/s54.v5.FULL.txt` (scope face, pid s54): after fix → STORE CHECK PASS. The pre-fix file → `FAIL NOEAR MASTER MISSING: bare-earlobes sentence 0 times`.
- same file + "Small teardrop pearl earrings." → `FAIL NOEAR MASTER EARRING: earring word in a woman's prompt …`.
- build.py m13 t1 + "She wears pearl earrings." → `FAIL NOEAR MASTER EARRING`.
- emperor-B live1 a26 with `--scope emperor` → no sentence, STORE CHECK PASS (men unchanged).
- 285 stored female prompts: old gate on old files vs new gate on new files → identical PASS/FAIL (30 PASS / 255 FAIL for older reasons), 0 NOEAR fails after.
- seal_gate `--all`: same FAIL counts as before (pre-existing S12 DISC in w/m/mo sets), 0 S13; `--self` 5 good / 13 bad, 0 problems; proof "consort … pearl earrings" A → S13 FAIL ×2.
- `check_store.py --self`: 38 sentences, 20 banned, 0 problems (unchanged).

## Already drawn WITH earrings — NOT redrawn (owner decides)
Checked the 107 local face crops (dev/art/face-common/face_page/faces, 300×340, the FACE_CUTS_L703 / 86-face picker faces) on 5 contact sheets: dev/handover/review-sheets/noear1/faces_ears_0..4.jpg. Rank figures (t1–t8, triều phục, states, Nữ đế, maids at rank) have no local copies → not looked at (would need a download; ask if wanted).
| id | picture | earring visible? |
|---|---|---|
| c07 c13 c18 c21 c30 | thiếu nữ face (v3 consort) | YES, clear drop earrings |
| m04 m14 | maid-person face | YES, clear pearl drops |
| s10 s11 s19 s21 s25 s26 s29 s32 s35 s36 s39 s42 s44 s46 s48 s51 s53 s54 s60 | thiếu nữ face (s-set) | YES, clear drops (s44 red drops = F3 note) |
| c04 c05 m03 m16 m25 m29 s33 s43 s56 | face | YES, small (stud / small drop; s43 = F3 note) |
| c15 c16 c19 c20 | face | tiny / dot at the lobe (EAR1 3x zoom; hardly visible at 300 px) |
| c10 c26 m19 m22 s27 s40 s41 | face | unsure at 300 px (maybe a tiny dot / hair strand) |
| all other faces (c01–03 c06 c08 c09 c11 c12 c14 c22 c24 c25 c27 c28 c31 c32, m01 m02 m05–m12 m18 m20 m24 m28 m30, s07–s09 s12–s18 s20 s22–s24 s28 s30 s31 s34 s37 s38 s45 s47 s49 s50 s52 s55 s57–s59 s61) | face | no |
Totals: 26 clear + 9 small + 4 tiny + 7 unsure = 46 of 107 faces.

## Open questions (for the owner, via foreman)
1. The 46 faces above: keep (earring layer may double up) or redraw? A20/A21: no redraw without her yes.
2. Rank figures already drawn (t7/t8 prompts said "gold earrings" for every consort, ma ma tm3/tm4 too) almost surely show earrings — a ear-crop audit needs the pictures downloaded (no gens, a few image reads).

COMMIT_LINE
