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
