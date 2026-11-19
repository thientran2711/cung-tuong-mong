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
- Refs order = the OWNER's order (FIGURE_GATE REFERENCES): 1 style3_girls, 2 her own face/live picture, 3 swatch if "Image 3" is in the prompt. (First version emitted face first; corrected upstream in 96d84e9 by ROOT-38, ordinal words only.)
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

## Item 5 — maid ladder (tm0–tm4) + m01–m52 rows
### Id → name table (FIGURE_GATE CUNG NỮ LADDER, Lượt 174, owner "174 đúng rồi")
| builder id | name | design source (copied, nothing invented) | sleeve | status |
|---|---|---|---|---|
| `--state tm0` | cung nữ thô sử | THÔ SỬ design 842754fa / Lượt 172: plain coarse cotton/hemp, one faded colour (grey-blue / light indigo / earth brown by index), single-layer short crossed-collar jacket + ankle skirt, same-colour sash, no embroidery/jade/tassel/apron, simple bun + wooden pin | ≈1 span | built |
| `--state tm1` | tam đẳng cung nữ (= current "Cung nữ") | the m01 tam-đẳng re-make prompt (maids-M1.md): fine silk uniform, floral borders, sash with jade/tassel pendant, double buns, silver pearl pins + flower | ≈1 span | built |
| `--state tm2` | nhị đẳng cung nữ (= current "Đại cung nữ"; never say đại cung nữ) | main dev/figwork/maid/mjobs.py mout() k=2: brocade trim, bijia half-sleeve jacket, jade pendant, several silver/pearl pins | ≈2 spans | built |
| (none) | nhất đẳng cung nữ | NEW outfit, reference from the owner's Phượng Lệnh art: sheet not chosen yet | ≈3 spans | **PENDING slot** `NHAT_DANG_PENDING=None` + `--state nhat` prints "PENDING" (no wording written) |
| `--state tm3` | chưởng sự cô cô | mout() k=3, colour = LIGHTER plum purple (owner "đỡ đậm hơn") | ≈3 spans | built |
| `--state tm4` | nữ quan | mout() k=4, red = court-dress red #99443F at EVERY age | as live | built |
| `--state mama` | ma ma | = the Ma ma NPC outfit (fig-mama-k01) | — | **PENDING** `MAMA_PENDING=None`: the NPC outfit wording is not in the repo (only the live picture + face landmarks) → ROOT-37 asked how to proceed |
- Common: PRE + "her face exactly as in the identity reference image" (no face words exist for maids) + MAID_IDENT (keep HER OWN hairstyle at every rank; ranks differ by hairpins, owner ~01:55Z) + AGE_TXT verbatim + outfit + COLOUR RULE (a51/a65 = deeper shade of the SAME colour; tm0 and tm4 do not change with age) + spec5pose + item_age tmK cell + K3_BG. Poses of tm0/tm4 skip "adjusting a hairpin".
### Rows m01–m52 (data)
- `DATA[mNN]=(PAL,"")`, `ORIG1[mNN]` = (PAL main name + hex, PAL second name + hex) with the two dominant robe tones MEASURED from live `fig-maid-mNN-t1-a18.webp` (k-means rows 32–93 %, no hue filter: first attempt with the consorts' skin/gold filter deleted the pale robes), `LOWNAME` auto-filled, `MOTIF_LOW` = (MOT[(n−1)%13] from mjobs.py, FLW[n%6]); PAL/MOT from main dev/figwork/maidC/mjobs.py:22,:31.
- Maid personality → SPEC5 list: the game gives each maid a random trait, so by INDEX: maid n takes list [kieungao, numi, hienlanh, dangi, thamvong, thanhnha][(n−1)%6], slot (n−1)//6+1 (`SPEC5_IDS`).
### Guard + coverage after item 5
- Snapshot of the 8350 existing commands: 0 changed (maid rows and tm states only add cells); test_low_all OK.
- Coverage, maids m01–m52: t1/t2/t3, kc, ngheo, tm1, tm2, tm3 = green at all ages; tm0 a26 green; Nữ đế/Thái hậu/t7/t8 only POSE= (same limit as item 3).
- STILL RED, not done (needs source wording, not invented): (a) maids at consort ranks t4, t5, t6 = RUN: `OUTFIT_JOBS`/`OUTFIT_LOW` have per-person rows only for c01–c32; the maids' version is the old main dev/figwork/maidC/lad3.py ladder (`outfit(t,pal,mot)` + CT[1..3]) — to be ported as rows; (b) ma ma = PENDING (no NPC outfit wording); nhất đẳng = PENDING (owner sheet); (c) tm0/tm4 POSE= (their pose lists skip "adjusting a hairpin"); (d) ty/cold for maids: AGE/ITEM/FRONT/BG/REFS pass, POSE= as for consorts.

## Item 6 — coverage before/after (red cells of dev/art/coverage.py)
| step | commit | red cells | main effect |
|---|---|---|---|
| start (N5c end) | ff5a74b | (not counted; BG + REFS red in every cell) | — |
| item 1 K3_BG | e0f4fef | 540 | BG green for build.py groups |
| item 2 --log/--refs | 6392d58 | ~540 | REFS green for build.py groups |
| item 3 spec5 age offset | 5ce724f | 511 | POSE= green t1–t5, kc, ngheo |
| item 4 ty/cold | 5396477 | 508 | ty1–8 + cold run (consorts) |
| item 5 maids | 706808f | 457 | maid tm1–tm3, t1–t3, kc, ngheo green |
a65 green for every women group: NOT reached. Red now = POSE= (t6+/Thái hậu/Nữ đế/ty/cold/tm0/tm4: fewer than 5 allowed calm poses), maids t4–t6 RUN, foreign princesses NOCMD, Emperor/NPC groups (W107b).

## HANDOVER N5d → successor (ROOT-37 opens it; I am depth 8 and cannot). START_CTX ~0 %, stopped at ~20 % because only blocked items remain.
DONE + pushed: e0f4fef (1), 6392d58 (2), 5ce724f (3), 5396477 (4), 706808f (5) on claude/cung-tuong-mong-handover-hj0h8w.
NOT DONE, waiting for a decision/source:
1. nhất đẳng (owner has not chosen the reference sheet) and ma ma (NPC outfit wording not in the repo): `NHAT_DANG_PENDING`, `MAMA_PENDING` in build.py; `--state nhat|mama` print PENDING.
2. Maids at consort ranks t4/t5/t6 (+ Nữ đế via NUDE rows already added): port `maidC/lad3.py outfit(t,pal,mot)` / mjobs CT[1..3] into OUTFIT_JOBS rows `mNN-tT` (copy wording, never invent).
3. POSE= at t6+/elder/ty/cold: needs MORE calm poses in SPEC5_POSES (new wording = owner decision) or relax the stole/hairpin skips.
4. `build.py --golden` != golden/pB_*.txt since the 3d2 frontal rewrite (pre-existing; regenerate goldens or drop the golden check).
5. W107b (session_01PEhRbv2Jj3dTLMsN1f9GGg) was inactive: it must import `K3_BG` and use `--log/--verify` (README § Gen ledger); emperor-B still lacks K3/refs.
6. Ref order settled: 1 style, 2 face, 3 swatch (96d84e9).
Snapshot method: scratchpad snap.py (8350 cmds) is NOT committed; recreate: c01–c32 × a18–a65 × modes (v0/v1/v2/--golden/--head/--low 1–6/--t7/--state thaihau|nude|kc|ngheo|--trieu 1–8) × ±--spec5pose + emperor-B 6×5, json of stdout, diff before/after.

## Update after ROOT-38 (19/11 ~02:25Z)
- Maid t4/t5/t6 rows DONE: `OUTFIT_JOBS[mNN-t4|t5|t6]` generated from the verbatim old main maidC/lad3.py ladder (embedded `_LAD3_SRC`), the same way the consorts' rows were made (checked: c01 t4/t5/t6 rows reproduce byte-equal, rank-name diacritics aside).
- `--golden` is FROZEN pre-3d2 (differs from golden/pB_*.txt since the frontal rewrite); goldens are NOT regenerated, by order.
- Style image will change to two square face portraits (pink + green); waiting for ROOT-38's ids, then REF_STYLE (build.py + build_npc.py STYLE_REF) + the "three approved girls" wording switch.
- Guard for the maid t4-t6 rows: snapshot 8350 vs previous = only 320 --golden cells changed (ROOT-38 ordinal renumber 96d84e9, not this change); coverage 446 red cells (457 before); maids t4/t5/t6 now run.
