# mama-mass MMX3 (Foreman C ROOT-49) — ma ma TWO-COLOUR, NO hair flower, all ages (owner Lượt 520)

Recipe = approved MMX1c two-colour sample (prompt mama-specs/c06-a36.oneref.twocol.prompt.txt; refs image 1 own face + image 2 costume 79fNlPEJAL; no style image; gpt-2-6 1024x2304 2k seed 7172) with ONE change: hair-flower wording removed (owner K15).

## Builder (dev/art/t8-prompt-B/build.py, build_mama)
- New opt-in flag `--noflower` = REMOVAL only, nothing added:
  - drops `, and one small fresh <flower> in <colour> tucked beside the bun` from the outfit sentence;
  - MAMA_HAIR `Her hair, hairpins and hair flower come ONLY ...` → `Her hair and hairpins come ONLY ...`.
- Without the flag every output is byte-identical (30 outputs cmp'd: c06 m05 p01 bd1 c22 × 3 ages, with/without --twocol; the approved c06-a36 twocol file is reproduced exactly).
- Remaining "flower" words in the prompt are fabric embroidery, "no flower mark" (forehead) and the background sentence — not hair.

## Prompt diff vs the approved sample (c06-a36.oneref.twocol.prompt.txt → c06-a36.oneref.twocol.noflower.prompt.txt)
```
+ ... the style reference image must not influence her hair. NO flowers in the hair (no fresh or silk flowers), only her hairpins. Pose: ...   (ruling A)
- ... (her own bun and hairpins kept), with small earrings, and one small fresh camellia in crimson tucked beside the bun; soft slippers; ...
+ ... (her own bun and hairpins kept), with small earrings; soft slippers; ...
- Her hair, hairpins and hair flower come ONLY from the identity reference and this text; ...
+ Her hair and hairpins come ONLY from the identity reference and this text; ...
```

## Prompts + gate
- 99 files `dev/handover/reports/mama-specs/<id>-<age>.oneref.twocol.noflower.prompt.txt` (33 persons × a36/a51/a65).
- check_store self-form (`<id> --state mama --age aXX --nostyle --twocol "<sec>" --noflower`): 99/99 PASS incl. approved_check.
- Against the OLD store args (no flags) all 99 fail on exactly ONE sentence, the removed flower clause (= the owner-ordered drop); nothing else.

## Secondary colours (two-new-8rank.md §5; a51/a65 use the same secondary, builder steps only the main)
c06 jade green · c07 pale pink · c08 pale green · c09 deep rose · c10 jade green · c11 deep teal · c12 deep rose · c13 deep sapphire blue · c22 pink · c23 deep teal · c24 jade green · c25 deep teal · c26 jade green · m05 deep teal · m06 warm coral rose · m15 deep teal · m16 crimson · m25 deep teal · m26 jade green · m35 crimson · m36 deep rose · m38 blue-violet · m39 deep rose · m40 jade green · m45 deep rose · m46 jade green · m52 crimson · p01 deep rose · p02 jade · p03 crimson · **bd1 bd2 bd3 deep rose** (not in §5; main deep teal-green → my choice, clearly different family).

## Gens
| id | age | face ref | gen | cut | note |
|---|---|---|---|---|---|
| c06 | a36 | u5WyedyQLD | aFGyHNwfSh | - | REJECTED: large pink orchid in hair (copied from face ref) |
| c06 | a51 | jUoGfuHLD0 | If3UC8OtvE | - | REJECTED: same orchid |
| c06 | a65 | jUoGfuHLD0 | Xm9svsWBfo | - | REJECTED: same orchid |
| c06 | a36 | u5WyedyQLD | N2qtWyy6D9 | vQAO17Fa47 | after ruling A: no flower; jade green skirt/sash/cuffs/hem band; PASS |
| c06 | a51 | jUoGfuHLD0 | gOmV3MWSXO | Lw8c6d5swO | PASS; gen painted dark glow bg, cut clean |
| c06 | a65 | jUoGfuHLD0 | O6EXz8Kynm | 3zKvDbtREY | PASS |
| c07 | a36 | YMlEy3QWeC | 6AbmpSwiJO | - | look PASS; cut NOT done (remove_bg errored, then HOLD) |
| c07 | a51 | 1ldZhqUr4r | 8aiSkMSIrU | - | REJECTED: forehead mark (this ref gave a forehead cross in MMX1 too) → next: her a36 face YMlEy3QWeC |
| c07 | a65 | 1ldZhqUr4r | jUoW3KVLD0 | - | REJECTED: forehead mark (same ref) → next: YMlEy3QWeC |

Look sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/twocol/look/c06-gen1-flowerfault.jpg
Otherwise good: jade green skirt, sash, sleeve cuffs/linings; vermilion vest/robe/panels; gold thin; same face; forehead clean; a51/a65 main stepped deeper.

## Faults / notes
1. **Removing the wording does not remove the flower.** The prompt keeps "hair exactly as in the identity reference image (her own bun and hairpins kept)" and the face refs are consort pictures wearing hair flowers, so the model copies the ref's flower. Meeting K15 needs ADDED words (e.g. a "no flowers in the hair" sentence) — outside my brief (LAW #0) → HOLD, asked ROOT-49 (19/11 ~19:00Z).
2. ROOT-50 (successor foreman) ruling (A): `--noflower` also ADDS `NO flowers in the hair (no fresh or silk flowers), only her hairpins.` right after the hair sentence; check_store BANNED X14 (scope mama, negation-aware; --self 0 problems; old flower ma ma prompts now fail it); ART_RULES K15 note. 99 prompts rebuilt, all PASS. c06 a36 redraw: flower gone → mass continued.

## Sheets (OLD one-colour | NEW two-colour, per person)
- c06: https://ctm-img.victoria-tntt.workers.dev/img/_review/mama-mass/twocol/mama-twocol-c06.jpg

## Credits
3 gens × 135 = 405 (no cuts).

## HOLD (ROOT-50, 19/11 after c07 gens): owner says Nữ đế used OLD-style face refs instead of her new M09-style redraws. NO new gens until ROOT-50 confirms the face refs.
Face refs used (inherited from MMX1/MMX1b/MMX2, uploaded to Magnific 19/11): consorts c/p/bd = CDN img/hd/fig-consort-<id>-t1-a36.webp (a36) and -t1-a51.webp (a51 + a65), list + ids in mama-mass-persons.md / MMX1 HANDOVER; maids m = CDN img/fig-maid-<id>-a36.webp / -a51.webp (MMX2). If they must change, every one of my gens so far (c06 ×3, c07 ×3) would need redrawing with the new refs.
Credits: 3 rejected c06 (405) + c06 ×3 with cuts (414) + c07 ×3 gens (405) = 1,224.

## ROOT-50 answers (19/11 18:28Z) — still HOLD, wait for GO
- Face refs: my refs (img/hd/fig-consort-*-t1, fig-maid-*) are the same pictures the owner just rejected for Nữ đế; ROOT-50 is asking her which reference is valid (only a thiếu nữ picture made from prompt + M09). c06 ×3 + c07 a36 may need redrawing with the new refs.
- Lượt 521 rules (no item repeated across ages; J6 Nữ đế age text; forehead wording kept, BW2 strengthens it in the builder) apply to EVERY picture from now on, redraws included. Check done: no person in my 33 repeats an item across ages.
- On GO: pull, rebuild the 99 prompts from the current builder (--twocol <sec> --noflower), re-run check_store, swap face refs as ROOT-50 says, resume at c07 a51/a65 (and the c07 a36 cut).
- OWNER Lượt 543 (via ROOT-50 18:32Z): ma ma two-colour OK. Identity ref = ONE picture, her KHUÊ CÁC 2K picture made from M09 (img/_review/kc2k/<id>_a18_kc_2k.png; m picks in kc2k-K3/K6a/K6b/K6c), list in dev/art/KC_REFS.json (REF1). Face words copied from the kc prompt (BW2 builder). People whose kc was not made from M09: do NOT draw. c06/c07 (old refs) will be redrawn. HOLD until GO + table.
- Pre-check: kc2k/<id>_a18_kc_2k.png gives 200 for c06 c07 c12 and 404 for m05…m52, p01 and bd1 (another name or path; wait for KC_REFS.json).
- ROOT-50 18:34Z: ONE reference only (owner: "Chỉ dùng một hình nhân vật thiếu nữ để làm hình mẫu") → image 2 costume 79fNlPEJAL DROPPED; costume from the approved two-colour prompt text only. Flagged to ROOT-50: the ma ma prompt names "image 2" in 4 places (cut of image 2; COLOUR RULE cut/brown of image 2; MAMA_IMG3 sentence) → BW2 builder + gate must rule; I use builder output only. HOLD until GO.

## OWNER Lượt 570 (via ROOT-50 18:49Z): queue = EVERYONE with a set-B ref
m01–m52 (52) + nc1–nc3 (refs nc1 6Abnqu9iJO, nc2 p8ymOwOehw, nc3 ov6CN4g829; KC_REFS to be updated) × a36/a51/a65 = 165 gens. c01–c32 later (new faces being drawn). ONE ref per gen = her set-B picture (`python3 dev/art/kc_ref.py <id>`; exit 2 = do not draw), NO image 2. Start only when BW3 says the ma ma builder has landed without the "image 2" text.

## HANDOVER (MMX3 rolled over at its context limit, 19/11 ~18:50Z). Nothing in flight, no gens since the HOLD.
STATE: no picture of the new recipe exists yet. c06 ×3 (N2qtWyy6D9 gOmV3MWSXO O6EXz8Kynm, cuts in img/_review/mama-mass/twocol/cuts/) and c07 a36 6AbmpSwiJO used the OLD refs and are now notes only (c has no set-B ref).
NEXT (successor):
1. Wait for BW3's message (builder without image 2). `git pull`. Read the current build_mama: flags `--twocol <sec>` (approved S01 sentence) and `--noflower` (K15: flower clause removed + "NO flowers in the hair (no fresh or silk flowers), only her hairpins."). Use whatever new flags BW2/BW3 add (face words from dev/art/face-common/mNN.v3.FULL.txt, J6 age text, forehead wording).
2. Secondary colour per person = dev/handover/reports/two-new-8rank.md §5 (m01–m52 listed; nc1–nc3 not listed → clearly different family, never gold/yellow/silver/ivory/cream/white, never the same family; tell ROOT-50 your pick).
3. Build `<id>-<age>` prompts → mama-specs/<id>-<age>.<tag>.prompt.txt; `python3 dev/art/check_store.py <file> <id> --state mama --age aXX <same flags>` must PASS (incl. approved + banned gates; X14 bans hair-flower wording in ma ma).
4. images_generate gpt-2-6 1024x2304 2k seed 7172, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, references = [{type image, <kc_ref id>}] ONLY. Paste the file text exactly.
5. LOOK every gen at full size: helper `MMX3_DIR=<scratch> python3 dev/art/t8-prompt-B/tools/mmx3.py look3 <id> <url36> <url51> <url65>` (3 views + face strip). Gate: two colours in large areas, not glaring, NO hair flower, same face, clean forehead (zoom a51/a65), items differ by age. Regen cap 2 (seed 7173/7174). Forehead mark from a ref → tell ROOT-50.
6. images_remove_background → `mmx3.py cut <id>-<age> <url>` (→ img/_review/mama-mass/twocol/cuts/), `mmx3.py sheet <id>` (OLD one-colour | NEW; old m cuts are on CDN img/_review/mama-mass/cuts/), `mmx3.py ledger <id>-<age> <ref> <gen> <cut> "<sec>" "<note>"` (the ledger cmd/prompt_file strings there assume `--twocol --noflower` + `.oneref.twocol.noflower` names: update them to the new flags/tag first). `python3 dev/site/cdn_sync.py img/_review/mama-mass/twocol`, SKINS.md line for each old one-colour person, commit + push, send_message ROOT-50 (session_01PEhRbuaMXjBxsZj3yAEJUb) the sheet URL after EVERY person. Read messages between every gen.
Notes from MMX3: the c06 first gens showed that removing words cannot remove something the ref picture carries (hair flower); set-B thiếu nữ refs may also carry flowers or forehead marks, so look for both. Some gens paint a dark glow / checkerboard background; the cut removes it. remove_bg once returned an empty error (c07 a36): retry.
Credits MMX3: 1,224 (c06 3 rejected 405 + c06 ×3 gens+cuts 414 + c07 ×3 gens 405).
- UPDATE 18:50Z: BW2 (not BW3) says the one-ref builder has landed (2a22cc8). With `--noflower` or `--oneref`, build_mama removes every costume-image pointer (0 "image 2/3" words; TWO front panels kept). Test: `build.py mNN v0 --state mama --nostyle --noflower --twocol "<sec>" --age aXX` → STORE CHECK PASS (m05 + c07, 3 ages). Not asked, still in the text: MAMA_HAIR "...the style reference image must not influence her hair." `--spec5pose` fails S17 for ma ma (already so). Successor: step 1 is DONE, start at step 2.
- **OWNER Lượt 573 (ROOT-50, ~18:52Z) SUPERSEDES the mass order: before any mass, draw ONLY a SAMPLE of 2 people, m05 + m13 × a36/a51/a65 = 6 gens, send the sheet to ROOT-51 (new foreman) or ROOT-50, then STOP and wait for GO.** (m13 secondary: see two-new-8rank.md §5; kc_ref.py m13 for the ref.)
