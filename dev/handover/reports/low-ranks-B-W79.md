# Low ranks t1-t6, prompt B (W79, 18/11)
Builder: `python3 dev/art/t8-prompt-B/build.py cNN --low N [v0|v1|v2] [--age a18|a26|a36|a51]` (N = 1..6; prints the exact prompt; no hand edits).
Check: `python3 dev/art/t8-prompt-B/test_low_all.py` (32 x t1-t6 x v0/v1/v2 x 4 ages = 2304 builds, v0 vs golden_low, LOWV1/LOWV2 cover 32x6, no royal/yellow in t1-t5 v1/v2, t6 only the single small-touch clause) and `python3 build.py c06 v0 --golden | cmp - golden/pB_c06.txt`. v0 output is byte-identical to before (sha over 32x6xages checked).

## Magnific settings
images_generate, mode gpt-2-6, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, 1024x2304, resolution 2k, transparentBackground true, then images_remove_background. No seed, count 1, regen max 6.
Refs = exactly two: {type:image = that person's own t1 of THE SAME age, uploaded under a neutral name, e.g. face-cNN-t1.png} and {type:style = kspkwKx16B}. gpt-2-6 takes max 1 style ref; any extra ref must be type image.

## Checks per image
Look at every image; cutcheck / hole scan after background removal; face = her t1 face, closed lips, nothing covering the face; colour = the prompt's robe colour (v1/v2 = LOWV hex), no royal yellow except the t6 small touch.

## Colours of v1/v2 (new)
`LOWV1[cNN][t]` / `LOWV2[cNN][t]` in build.py = (robe word, hex, lining word, hex), measured from the LIVE v1/v2 pictures (CDN img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t<N>_v1|v2.png, all 576 present): central torso/skirt band, alpha>200, gold and near-black hair pixels gated out, k-means 6, dominant non-neutral cluster = robe, next distinct cluster = lining. Method reproduces ORIG1 (v0 t1) within 60 RGB-L1 for 26/32 people (the other 6 are pale-vs-deep picks where ORIG1 was chosen by eye).
Foreman ruling: v1/v2 of t1-t6 never royal yellow. Live pictures that read yellow/olive-gold (hue 36-70) were DERIVED from the same person+version at the nearest rank (66 cells, list reproducible: any cell whose measurement hue is 36-70; e.g. c16 t1 v2 live = butter yellow). Where live main and lining were identical the text says "a slightly deeper tone of the same colour".
Example rows: c06 t1 v1 = pale mauve #CCA9B9 / lining soft blush pink #E0C3BC; c16 t1 v2 = soft pale peach #EDD0A7 (borderline, peach not yellow) / apricot peach #D2B592; c25 t4 v1 = soft pale peach #F3C6AE / soft apricot peach #E9B799.

## Owner rulings
t1-t3 soft thin flowing silk, no cloud collar. Style B chosen by owner 18/11 ~21:50Z. t6 slightly more luxury + a small royal yellow touch (all variants). Mass waits for the owner's OK on t6.
Samples: https://ctm-img.victoria-tntt.workers.dev/img/_review/new-faces/style-test/ (abc.jpg, b-t4-t6-c06.jpg, b-t4-t6-c25.jpg, b-t6-new.jpg).

## Suggested split (after t6 OK)
a18 first: 4 painters x 8 people (c01-08, c09-16, c17-24, c25-32), each t1..t6 in order v0, v1, v2; then a26, a36, a51 the same way (each age refs its own-age t1).

## Caveats
LOW_SIG item ladder is assumed (not owner-reviewed). v1/v2 colours are measured from pastel live pictures, so many are soft peach/cream/blush; eyeball and tweak LOWV rows if too similar to v0 or between v1 and v2 (no automated collision check yet). a51/a65 age phrases still mention "royal yellow becomes deep antique gold" generically (test strips that phrase).

## NOT DONE
- t6 swatch re-sample only for c06/c25 as a sample (swatch Magnific id TdwDfOyVNR, CDN img/_review/swatch/royal_yellow_C2.png).
- New t6 sentence in /tmp/claude-0/qq/NEW_T6.txt NOT yet in build.py.
- Mass not started; no new generations (Magnific out of credit).
