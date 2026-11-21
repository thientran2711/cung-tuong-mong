# REVERT1 — owner L1714: t4–t8 back to the old Set A prompts (0 gens)
depth 2 (worker of Foreman C ROOT#19) · START_CTX ~3 % of 1M (own estimate) · end ~10 %.

## Files (dev/art/thu_comoi/, each + .keep, base = dev/art/rank8-s62/s62_tN.txt)
| file | chars | check_store (tpN a22) |
|---|---|---|
| s62_t4_THU_revert_sqtest_L1714 | 9958 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t4_THU_revert_L1714 | 9620 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t5_THU_revert_L1714 | 8461 | FAIL only B26/M06 (row 1 thin silk vs gate) |
| s62_t6_THU_revert_L1714 | 9408 | PASS |
| s62_t7_THU_revert_L1714 | 8843 | PASS |
| s62_t8_THU_revert_L1714 | 8814 | PASS |

keep_check --all: 393 PASS. Builders: thu_comoi/revert_L1714/make_t4.py, make_t5_t8.py (COLOUR SLOT = MAIN/SEC/HEX constants at the top), make_keeps.py.

## Gate conflict (Foreman decides)
B26 (L1283) forces matte satin đoạn on t4/t5; owner L1714 row 1 = old 'thin, light, flowing silk and gauze'. t4 ×2 and t5 FAIL only on this. Needs rule.py set B26 / gate override before drawing. t6 'HEAVY SATURATED brocade' + 'FABRIC: thick brocade' (row 2) passes the gate.

## Notes
- sqtest CAPELET CUT uses the approved S13_COMOI wording 'the outer robe closes only at the sash, never at the throat' (old throat-clasp form would hide the square collar). OUT1 WARN only.
- t6 pose keeps today's 'a breeze lifts her long stole' (row 23) though the stole moved to Phi (rows 7+8): the sheer phi bạch shawl reads as that stole — flag if the owner wants it changed.
- t7/t8 have no body-motif-over-bands sentence (row 6 was t4–t6 only in STEP0).
- Row 20: F2 table (ART_RULES F2, FLORA1) is the newest per-tier table found; s62 → t4 lotus, t5 double hollyhock, t6–t8 incurved chrysanthemum.
- Captions added: 'Mùa Thu · Tần · thử cổ vuông' / 'cổ chéo cũ' / '<bậc> · prompt cũ L1714'.

## Diff vs the old prompt (old → new · L1714 row)
### t4 common (both files)
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 20 + 6: “embroidered borders of plum blossoms at collar, sleeves and hem,” → “embroidered borders of lotus flowers at collar, sleeves and hem (the small embroidered motifs never run over t…”
- row 18: “an embroidered silk sash with hanging jade belt pendants and tassels,” → “an embroidered silk sash with hanging jade belt pendants and tassels, the jade pendants never covered by sleev…”
- row 19: “small dangling gold bu yao tassel hairpins;” → “small dangling gold bu yao tassel hairpins, none at the ears;”
- row 21: “her signature colour family ice blue and mint mist stays the MAIN robe colour (ice blue); the robe itself is c…” → “her signature colour family light olive and lilac stays the MAIN robe colour (light olive); the robe itself is…”
- row 21: “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ice blue silk like #71B5D7 is th…” → “light olive silk like #9FB577 is the main colour of the robe, sleeves and any cape, with lilac in the inner ro…”
- row 20: “decorated with ONE fresh flower and several” → “decorated with ONE fresh lotus flower and several”
- row 20: “exactly ONE fresh flower in her hair” → “exactly ONE fresh lotus flower in her hair”
- row 23: “ANGLE: a SLIGHT turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; her head tu…” → “ANGLE: a clear THREE-QUARTER view toward the LEFT side of the picture, NOT frontal: her whole body, shoulders,…”
- row 23: “GRACE (pose variety, every rank its own): her shoulders soft and relaxed, one shoulder a touch lower than the …” → “GRACE (pose variety, every rank its own): her head inclined gently toward the hand that holds the item, her fa…”
- row 21: “the MAIN colour ice blue and the SECONDARY colour mint mist,” → “the MAIN colour light olive and the SECONDARY colour lilac,”
- row 21: “BOTH her robe colour ice blue and her secondary colour mint mist.” → “BOTH her robe colour light olive and her secondary colour lilac.”
- row 21: “gauze shawl in mint mist (her secondary colour, clearly different from her main robe colour ice blue)” → “gauze shawl in lilac (her secondary colour, clearly different from her main robe colour light olive)”
- row 23: “Pose: a three-quarter turn looking at the viewer, a silver-mounted book box held near her shoulder, the robe h…” → “Pose: walking with a small white-jade lotus lamp held upright in one hand.”
- row 22: “floor-length robe with slippers visible,” → “floor-length robe, only slipper toe tips peeking under the hem,”
### t4 sqtest only
- row 3 TEST (m19/m29 t3 square-collar words): “a crossed collar,” → “NO crossed wrap collar: a LAYERED NECKLINE, a lilac inner robe with a straight SQUARE NECKLINE framed by a wid…”
- row 3 TEST: “covering only the shoulders and upper chest,” → “covering only the shoulders and the outer upper chest,”
- row 3 TEST: “fastened at the throat with a jade clasp,” → “OPEN at the front, its two front edges parting so the square neckline stays fully visible, never hiding it,”
- row 3 TEST: “the pearl net starts right at the collar at the throat and hangs down” → “the pearl net starts right at the capelet's neck edge and hangs down”
- row 3 TEST (approved S13_COMOI open-collar form, owner L1377): “CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the col…” → “CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded …”
### t4 fallback only
- row 24 (approved S13 wording, same meaning): “CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the col…” → “CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded …”
### t5
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 6: “richly embroidered in gold with peonies and small birds,” → “richly embroidered in gold with double hollyhocks and small birds, the body motifs never over the borders or b…”
- row 7+8 (old Quý phi cape) + 10: “an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of sma…” → “an embroidered light olive pearl-edged cape/stole over the shoulders, a SHORT round-pearl strand swags ACROSS …”
- row 18: “a broad gold brocade girdle with two long jade pendants hanging on silk cords,” → “a broad gold brocade girdle with two long jade pendants hanging on silk cords, never covered by sleeve or shaw…”
- row 20: “large peony medallions” → “large double hollyhock medallions”
- row 19: “dangling gold tassels and jade pins;” → “dangling gold tassels and jade pins, none at the ears;”
- row 23: “ANGLE: a SLIGHT shoulder turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; he…” → “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn; her head never back-tu…”
- row 23: “GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively…” → “GRACE (pose variety, every rank its own): her head tilted very slightly to one side, a soft graceful line from…”
- row 23: “Pose: a small step forward, a small pipa lute inlaid with gold and mother-of-pearl held at her waist with both…” → “Pose: walking while holding a folded letter on gold-flecked paper tied with a silk cord in both hands, sleeves…”
- row 20: “ONE fresh flower” → “ONE fresh double hollyhock”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t6
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 6: “embroidered with peonies and plum blossoms in ice blue and gold thread along the borders,” → “embroidered with incurved chrysanthemums in ice blue and gold thread along the borders, the body motifs never …”
- row 7+8 (old Phi cloud collar): “an embroidered ice blue pearl-edged cape/stole over the shoulders,” → “an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of sma…”
- row 12: “gold-and-jade necklace and bracelets;” → “gold-and-jade bracelets;”
- row 7+8 (the cape went to Phi): “a pearl-edged collar and cape trim,” → “a pearl-edged collar trim,”
- row 18: “a yellow sash and narrow yellow borders,” → “a yellow sash and narrow yellow borders, the jade pendants never covered by sleeve or shawl,”
- row 24 repeat of the last sentence: “image 2 is only a colour reference, never copy anything but its colour;” → “image 2 is only a colour reference;”
- row 19: “decorated with several gold hairpins (trâm) with dangles, rich” → “decorated with several gold hairpins (trâm) with dangles, nothing at the ears, rich”
- row 23: “ANGLE: a SLIGHT shoulder turn to the LEFT (about 15 degrees), body almost frontal, face toward the viewer; her…” → “ANGLE: a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little…”
- row 23: “GRACE (pose variety, every rank its own): her fingers softly and gracefully curved around the item, wrists rel…” → “GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively…”
- row 23: “one hand holding a pearl-tasselled silk lantern with a jade top,” → “one hand holding a pearl-embroidered silk ball (tú cầu) with jade tassels, a round stuffed ball, no handle, no…”
- row 20: “ONE fresh flower” → “ONE fresh incurved chrysanthemum”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t7
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 13: “embroidered with phoenixes, peonies and auspicious clouds in gold thread on the chest and along the borders,” → “embroidered with phoenixes, incurved chrysanthemums and auspicious clouds in gold thread on the chest and alon…”
- row 18 + 22/24: “a jade-and-gold belt with long tassels, floor-length robe with slippers visible;” → “a jade-and-gold belt with long tassels, its jade pendants never covered by the sleeves, floor-length robe;”
- row 13 + 19: “with pearl strands, kingfisher-blue inlay and a few gold tassels.” → “with pearl strands, its phoenix feathers inlaid in lilac and ice blue, and a few gold tassels, none at the ear…”
- row 12: “a layered pearl-and-gold necklace, ” → “(cut)”
- row 23: “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight a…” → “ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight a…”
- row 22 (walking): “gaze to the viewer, with stately grace, the robe falling still and straight.” → “gaze to the viewer, with stately grace.”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
### t8
- row 24 repeat: “Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porc…” → “(cut)”
- row 24 repeat / 23 angle: “beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.” → “beautiful/handsome romantic-lead looks for everyone.”
- row 21 (olive is not her original colour): “her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ” → “(cut)”
- row 22: “floor-length robe with slippers visible, no train” → “floor-length robe, only slipper toe tips peeking under the hem, no train”
- row 20 + 13: “richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold a…” → “richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, incurved chrysanthemums and …”
- row 15: “over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold…” → “(cut)”
- row 18 + 22/24: “a jade-and-gold belt with long tassels and jade pendants, floor-length robe with slippers visible,” → “a jade-and-gold belt with long tassels and jade pendants, never covered by the sleeves, floor-length robe,”
- row 13 + 19: “kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides;” → “its phoenix feathers inlaid in lilac and ice blue, rubies and pearls, and a few clean pearl tassels at the sid…”
- row 15: “DOMINANT colour of the robe, mantle, sleeves and skirt” → “DOMINANT colour of the robe, sleeves and skirt”
- row 23: “Pose: weight on one leg, a gold phoenix hairpin with pearl dangles, held in the hand raised and admired, the o…” → “Pose: a gold phoenix hairpin with pearl dangles, slim and palm-length, held between her fingers, never a scept…”
- row 21: every 'ice blue' → 'light olive', 'mint mist' → 'lilac', #71B5D7 → #9FB577 (COLOUR SLOT).
- (t4 files: same row-21 colour swaps, written inline.)

## Handover
Job done (steps A+B). Open: B26 gate override for t4/t5 (Foreman). No drawing done.

## L1716 rewrite of the step-A test (owner correction via Foreman C)
s62_t4_THU_revert_sqtest_L1714.txt rebuilt (9827 ch): OLD Tần prompt with NO new layer words (no inner/outer robe, no layered neckline, no S13_COMOI "outer robe closes at the sash"). Only: "a crossed collar" → "a straight SQUARE NECKLINE framed by a wide stiff lilac embroidered lotus flowers band (NO crossed wrap collar)"; capelet "fastened at the throat" → "OPEN at the front … the square neckline shows fully inside it, never hidden"; CAPELET CUT says the capelet is never closed at the throat. Old-prompt words kept as they were ("a layered silk robe of two or three visible layers", "lilac in the inner robe and linings"). Builder SQ list = the diff (make_t4.py).
Gate: FAIL B26/M06 (row 1) + S13 REWRITTEN (the approved S13 says "the robe closes only at the throat clasp", which would close over the square collar) — both need the Foreman's override. keep --all 393 PASS.
