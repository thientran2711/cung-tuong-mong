# RANK8-B — s64 (Dịu dàng, peony pink + smoke lilac) — 8 ranks t1–t8
STATUS/HANDOVER: depth 3 · START_CTX ~3 % (1M window; get_session read 0) · worker for ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD) · brief dev/handover/briefs/rank8-L1078.md
ROOT-68 HOLD (07:2xZ): NO GENS, prep only (0 cr). **0 gens, 0 credits used.**

## 1. Rank pictures already in the game? — NO (verified)
- gen_ledger.jsonl: only 3 s64 lines: NEWFACE-F4 face s7IX54Gl8e→cut JNChlRROq4 (L2848), a ROOM-COMPOSITE (L2850), OWNER-OK (L2851). No rank gen.
- FACE_MAP_L703.json s64 = face only (v5, cut JNChlRROq4). dev/figwork/urls.json: no s64 key. → s64 has no t1–t8 picture. OK to draw once the builder can.

## 2. BLOCKER — the rank builder has no s64 (B6 / B7: no builder path = cannot paint)
`python3 dev/art/t8-prompt-B/build.py s64 --low 1 v0 --age a18` → `KeyError: 's64'` (build_low: `DATA[c]`).
build.py is per-person tabled for c01–c32 (+ m/p/nc/bd) only. s64 is missing from every per-person table, e.g.:
DATA (palette + face words) · ORIG1 (t1 colour words+hex) · V2 / T7V2 · HEAD (`s64-t7`, `s64-t8` headdress) · OUTFIT_JOBS (`s64-t4/t5/t6`) · flower table (L~584, t1–t6 flower F13) · LOW_SIG / ITEMS_LOW (held item, F16 no fruit) · LOWV1 / LOWV2 · SPEC5_IDS (pose list is range c01–c32 by trait) · NUDE_PICK · KC_ID regex `(?:c|m|p)\d\d` (s-ids not accepted by refs/KC logic) · item-age tables.
I did NOT add rows: B6 says "a painter never types a prompt by hand … a missing wording → Foreman C adds". So the 8 prompts are NOT built and NOT gated (check_store needs the prompt).

## 3. What a builder fix needs (for Foreman C to decide)
- Colours: s_root_colours.json s64 = peony pink #F8B3D3 + smoke lilac #ECE2FE (root xuan, A32 toned, owner L1042). P6 palettes_season_deep.json has NO s62–s65 rows (its note: "P6 left s62–s65 out") → the other 3 season pairs do not exist; ranks would use the root pair only, unless a season pair is wanted (A31/A32 work, ~0 cr).
- Face words: from dev/art/face-common/s64.v5.FULL.txt (TYPES5 Dịu dàng v5 block); identity ref = cut JNChlRROq4.
- Per-rank slots (t4–t6 outfit, t7/t8 headdress, flower, held item, pose list): simplest legal route = give s64 the slot set of an existing Dịu dàng consort (group-mate in OWNER_GROUPS_L686) with ONLY colour + face words swapped (B2 "only SLOT words change"); E12 (same rank, different people in one look group) must then be checked against that mate.
- Same blocker applies to RANK8-A s62 and RANK8-C s65.

## 4. Cost (when GO)
8 figures × ~138 cr ≈ 1 104 cr (+ remove_bg if needed per B9). Sheet + labels (A27) = 0 cr (local PIL). Stop line 60 000 cr.

## 5. Open question for ROOT-68
Who adds s62/s64/s65 to build.py (Foreman C or a builder worker), and from which Dịu dàng template person? After that I can build + gate the 8 prompts (0 cr) and wait for GO.
