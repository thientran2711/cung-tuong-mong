# T78-PREP — builder rows s07–s61 + s63 (t7/t8 a18 prompts for T78-MASS) — 0 cr, no gens
Worker for Foreman C ROOT (session_01D3E3NWtCdQC92tFLkd25H5). Brief: dev/handover/briefs/t78-mass.md.
PRIORITY #1 CHECK: OD/briefs t78-mass + RANK8-C report (method) | main: none (art builder lives on the handover branch) | review/*: none | claims: T78-PREP is this worker.

## 1. Result
- `python3 dev/art/store-all/build_all.py <id> 7|8` now builds for s07–s61 + s63 (was REFUSED B8).
- 112 prompts → **110 PASS / 2 FAIL** (both gates, ≤10 000 chars; max 9 947). FAIL = **s61 t7, s61 t8** (no file written, do NOT gen).
- `dev/art/rank8-t78/<id>_t7.txt|_t8.txt` + `dev/art/rank8-t78/MANIFEST.tsv` (id, group, t, prompt_file, ref_cut, gate, chars).
- No pet in any t7/t8 pose (PET_RX ban + PET GATE apply to the new people; only the store's embroidery line "flowers, birds and the phoenix" matches the word bird).

## 2. Changes (DATA ROWS ONLY, no store sentence touched)
- `t8-prompt-B/build.py`: `S_NEW_ROWS.update({...})` after s62/s64/s65 — motif = the embroidered motif of her APPROVED face outfit. Source file = FACE_MAP_L703 `prompt_file` of her cut: sNN.v5.FULL.txt for most, but **s08 s12 s51 s54 = v5b, s16 = v4c, s33 s35 s36 s38 = v5r2, s43 s44 s45 = qr** (the brief said v5.FULL; the cut ref we pass was made from these files, so face words + motif come from them). A leading "gold" is dropped (s51 peony scrolls, s54 orchids).
  - **s11**: "phoenix feathers" → **"feather scrolls"** (phoenix only at t7/t8: build_low assert at t1–t6). Coordinator may pick another word.
  - **s44**: `S_ROOT_FIX` sec "sage grey" → **"sage green"** (s_root_colours.json still says sage grey = stale; her approved face s44.qr is sage green, owner Lượt 961 "Xám là bỏ hết"; B19 NO GREY failed it). Hex kept. s_root_colours.json NOT edited — fix it there if wanted.
- `store-all/build_all.py`: S_NEW_SET += s07–s61, s63 (PET ban t7/t8, grammar fix); `S_NEW2` appended LAST to PEOPLE. Look-group plan: s62/s64/s65 keep EXACTLY their RANK8-C plan — the old fit runs first without the newcomers, then s07–s63 are fitted into free angle slots; grace Latin-square rows: newcomers take the next rows (s63 sorted before s64 had shifted s64 t7 angle+grace before this fix).
- `KC_REFS.json`: 56 rows (m09_ok yes, ref_id = FACE_MAP cut, face_words = "Her face" + "Expression" VERBATIM from that prompt file). No kc_refs rebuild run.

## 3. Checks
- Byte-identical before/after: m04 t3, m52 t8, s65 t7, s62 t8, s64 t7, c06 t5.
- Whole plan (all ages a18–a65): 3 600 old cells, **0 changed**.
- `build_all.py --check` (a18): before = 3 FAIL (c06/s64/s65 t4 LEN TOO LONG, pre-existing). After = 68 FAIL, none at t7/t8 except s61:
  - t4 LEN TOO LONG for 49 new s-people (+ t6 for s35 s36 s38 s43 s45 s57 s59) — same pre-existing t4/t6 length family as c06/s64/s65; not tonight's ranks.
  - s61 all ranks: F16 NOFRUIT hits her colour word **"persimmon"** (owner-approved robe colour) in the item-contrast sentence. Needs a ruling: rename the colour word (e.g. "soft vermilion orange") or a gate exemption for colour words.
  - E12 Dịu dàng t2/t3 angle count 2: s63 joins a 10-member group with s62/s64 fixed; group_angles_add needed one forced dup (ANGLE_ADD_DUPS). t2/t3 only.
