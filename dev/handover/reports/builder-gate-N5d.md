# N5d — builder gate (successor of N5c) — Foreman C ROOT-37

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 2 | main 0 | review/* 0 | archive 0 (per brief). Reused N5c work (793227c, 83de0af, ea3bd45, ff5a74b); nothing new invented.
START_CTX ~0 % of the 1M window (get_session read 0), depth 8 (limit 8: I cannot open children; the successor is opened by ROOT-37).
Guard per item: snapshot of 8350 builder commands (c01–c32 × 5 ages × 19 modes × ±--spec5pose + emperor 6×5) before/after, `test_low_all.py`, `coverage.py`. Snapshot scripts live in the scratchpad only (not committed).

## Item 1 — K3 no-background sentence (module constant `K3_BG`)
- `from build import K3_BG` (dev/art/t8-prompt-B/build.py). Text verbatim from ROOT-36's order. Appended before END on EVERY output of build.py (all states: t1–t8, th, nude, kc, ngheo, trieu, bd/nc, …), default ON.
- trieu already had the older K3 wording (`K3_BG_OLD`, kept in the file because build_npc.py asserts it): it is REPLACED by `K3_BG` (never two K3 sentences). `--nostyle` gets a variant without "second reference image is style only" (no style image then). `--golden` (frozen A/B reproduction) is left byte-identical, no K3.
- coverage.py BG check now looks for the K3_BG text (`BGLINE`); build_npc.py cells keep the old NPC wording check (`BGLINE_NPC`). emperor-B/build.py not touched (W107b's).
- Snapshot diff before/after: 8350 commands, 1606 error cells identical (same keys, same errors), every other output = old output with exactly K3_BG inserted before END (trieu: old K3 removed) → 0 other changes.
- Pre-existing (not mine): `build.py cXX v0 --golden` no longer equals golden/pB_*.txt (differs at char 510, since the 3d2 frontal rewrite).
- coverage: BG column no longer red for any build.py group (was red everywhere); only the Emperor (emperor-B, W107b's file) still shows BG. 540 red cells remain (POSE=, REFS, ...).

## Item 2 — --log / --refs / --verify
- Usage + exact painter steps: dev/art/t8-prompt-B/README.md § "Gen ledger". Ledger file dev/art/gen_ledger.jsonl (created on first --log). `--log-fill TS GEN_ID FILE` fills a line after the gen.
- Refs order = the order the prompt text uses (1 own face, 2 style3_girls, 3 swatch if "Image 3" in the prompt). NOTE: FIGURE_GATE A0 REFERENCES lists style as (1) and face (2); the K3 order text ("second reference image is style") and ROYAL3 ("Image 3") agree with the order used here — ROOT-37 please confirm or correct the A0 wording.
- Tested: PASS on a matching line, FAIL (with the first differing char) on a mismatch, exit 1. Snapshot diff vs item 1: 0 of 8350 changed (flags off = identical output).
- W107b (session_01PEhRbv2Jj3dTLMsN1f9GGg) is inactive: the API is documented in the README instead.

- coverage after item 2: REFS column cleared for every build.py group (emitter YES); only the Emperor (emperor-B) still red on REFS/BG.

## Item 3 — spec5pose AGE offset
- spec5pose now picks per (person, tier, age): each age starts one step further along her 6-pose list (a18 at the old start), takes the first pose that passes that age's own skip lists (facing; calm for t6+ and a51/a65) and is not taken by another age; ages with the fewest allowed poses choose first. If every allowed pose is taken the age falls back to its first allowed pose (this is the POSE= left in coverage). Ages outside the five (kids) keep the old pick.
- Snapshot diff vs item 2: 2022 of 8350 changed, ALL spec5pose outputs (0 outside spec5pose; 19 of them at a18 because a scarce age may take a pose a18 used to hold); 0 new errors. test_low_all OK.
- coverage POSE=: green for t1–t5, khuê các, nhà nghèo (were red everywhere). Still red: t6, t7, t8, Thái hậu (+ Nữ đế): with the calm skip (no twirl/skipping/dance/swirl/turn) only ~3–4 of the 6 poses stay allowed, so 5 ages cannot all differ. Nữ đế is one fixed calm sentence by the owner's rule (canon 19/11 e), so POSE= is by design there. Making t6+ fully green needs more calm poses in SPEC5_POSES = new pose wording = owner decision, not invented here.

## Item 4 — `--state ty1..ty8` and `--state cold` (consorts cNN; maids mNN as soon as item 5 adds their DATA rows)
- `build.py cNN --state ty3|cold [--spec5pose] [--age aNN] [--log --refs]`. New function `build_ty_cold` (build.py). Re-make mode: ref image 1 = her live tier+age picture (face), image 2 = style3_girls (no swatch; ty colours are named, not royal).
- ty design = maid-ty-m09 v2 recipe (PROMPT_TEMPLATE.txt): DESIGN sentence (plain silk trung y inner robe, simple crossed collar, tied sash, long skirt, no embroidery, no outer layer, matte, no gloss) + HAIR sentence (one small gold hairpin with a short pearl tassel, inside the hair outline) verbatim; dropped: "like figure number COLNO of reference 2" (no sheet image in the builder), "teacup" clause (the pose comes from spec5pose).
- Colours (FIGURE_GATE C8 [OD:L392] = jty.js TY_COL): ty1 ivory, ty2 pale sage-green, ty3 pale blue, ty4 pale powder-pink, ty5 pale lavender-purple, ty6 pale rose-red, ty7 pale amber-orange, ty8 pale yellow. AGE_TXT verbatim at every age; a51/a65 add "a deeper, more muted shade of the SAME colour, same hue family … this replaces the colour examples above" (owner d0f31d3, no switch).
- cold = the OLD lãnh cung outfit sentence copied verbatim from main dev/figwork/jobs.json N-cNN-tcold (undyed pale grey-white coarse linen, cross collar, plain sash, no embroidery/colour/jewellery, low bun + ONE wooden pin, clean, never poor) + the gp.py "hangs straight and calm, opaque" clause; colour sentence: stays undyed at every age.
- Items: ty N holds the tN rank cell of item_age.py (coverage ITEMT maps tyN→tN), cold holds the "lanh" cell. Pose: spec5pose at rank N for ty (calm from t6), rank 1 for cold; poses mentioning a "stole" are skipped for ty/cold (a trung y / linen robe has no stole).
- Guard: snapshot of the 8350 existing commands 0 changed (new states only); test_low_all OK. Coverage consorts ty1–ty8 + cold: AGE, FRONT, ITEM, BG, REFS all pass; only POSE= is red at a26–a65 (and ty2–ty8 a18): same cause as item 3 (6 poses minus calm/stole skips < 5 ages).
- Maids (m01–m52): RUN (no DATA rows yet) → fixed in item 5; Foreign princesses (NOCMD): not in my items.
