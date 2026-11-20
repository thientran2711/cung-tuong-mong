# DESIGN11 — HH collar + no necklace + fringe ladder + A42 (owner L1411/1412/1413) — depth 8, worker of Foreman C #8
START_CTX ~5 %; finished well under the roll line (no handover needed). 0 gens, prompts only. Builder NOT edited.

## New files (dev/art/thu_comoi/, each with .keep sidecar)
- s62_t8_THU_COMOI_v4.txt (9974 ch), m02_t8_THU_COMOI_v4.txt (9963) — base *_t8_THU_COMOI_v2
- s62_t7_THU_COMOI_nn.txt (9918), m02_t7_THU_builder_nn.txt (9798) — base s62_t7_THU_COMOI / m02_t7_THU_builder

## t8 new collar sentence (verbatim)
a jewelled cloud collar of two tiers of scalloped cloud-shaped lobes with wavy edges over the shoulders (upper tier smaller), edged with pearls and gold, light and flat, not bigger than the Hoàng quý phi's, only a little richer (denser gold embroidery and a few more pearls), with the LONGEST fringe: airy pearl-and-gold tassel drops hanging straight down from both lobe tiers, never puffed, never bulky, OPEN at the front (its lobes resting on the shoulders and back, never covering the neck or the square inner neckline),
(removed: 'cloud-collar cape', 'the SAME size and light flat shape as the Hoàng quý phi's', 'never long or layered fringes')

## t7 changes
- (b) removed 'a layered pearl-and-gold necklace,' from HQP LUXURY (crown/pearls/belt untouched)
- (c) after 'a jewelled cloud-collar cape edged with pearls and gold over the shoulders,' added: 'with a fringe of pearl-and-gold drops hanging straight down from its lobe edges, clearly longer than the Quý phi's,'

## (d) A42 all 4 files, after 'showing her neck and collarbones,'
'the low square neckline shows a soft, natural hint of cleavage, tasteful and elegant,'

## Boilerplate trimmed to stay ≤ 10 000 (t8 only, in .keep allow lines)
s62 t8: duplicate 'Full-body standing figure head to feet, centered, plain light parchment background, soft even light;' (same as sentence 4); both t8: 'face clearly visible, 3/4 or frontal view.' (dup of 'The whole face clearly visible'), 'Everyone beautiful at every age.'

## Gates
- keep_check --sidecar: PASS ×4.
- check_store --scope tp8/tp7 --age a18, FAIL set vs base: t8 s62 unchanged (S19 only, as base), t8 m02 unchanged (PASS).
- t7 *_nn: ONE NEW FAIL each: 'S14 REWRITTEN: HOÀNG QUÝ PHI LUXURY t7 (78 %)' — the approved S14 text itself contains 'a layered pearl-and-gold necklace'. Unavoidable under A41; FOREMAN: S14 in check_store APPROVED must drop the necklace (with B26FAB4 builder change). Other t7 s62 FAILs (E1, G23, S19) = same as base.

## Necklace-like items left in place (list only, owner to decide)
- t8 s62+m02 (outfit sentence): 'many long strands of pearls and jade across the chest' — on the m02 sheet HH t8 these read as long necklace strands.
- t7 s62+m02 (outfit sentence): 'strands of pearls across the chest'.
- crowns (not necklace, listed for completeness): t8 'a large central gold phoenix holding a pearl string in its beak'; t7 'with pearl strands' on the crown.
