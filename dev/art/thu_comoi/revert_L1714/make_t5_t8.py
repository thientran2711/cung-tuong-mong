#!/usr/bin/env python3
"""REVERT1 (owner L1714): Phi t5 / Quý phi t6 / HQP t7 / HH t8 from the OLD Set A prompts rank8-s62/s62_tN.txt.
Each edit carries the L1714 row that justifies it. COLOUR SLOT = the three constants below (row 21: swap them when PAL4 palettes_season_L1709 is approved)."""
import os
MAIN, SEC, HEX = "light olive", "lilac", "#9FB577"          # COLOUR SLOT (row 21)
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(D, '..', '..', '..', '..'))
SP = {5: "double hollyhock", 6: "incurved chrysanthemum", 7: "incurved chrysanthemum", 8: "incurved chrysanthemum"}   # row 20: F2_FL s62 (n=62) t5/t6; t7/t8 = her t6 species
COMMON = [
 ("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; ", "", "24 repeat"),
 ("beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.", "beautiful/handsome romantic-lead looks for everyone.", "24 repeat / 23 angle"),
 ("her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ", "", "21 (olive is not her original colour)"),
 ("floor-length robe with slippers visible, no train", "floor-length robe, only slipper toe tips peeking under the hem, no train", "22"),
]
T = {5: [
 ("richly embroidered in gold with peonies and small birds,", "richly embroidered in gold with double hollyhocks and small birds, the body motifs never over the borders or bands,", "20 + 6"),
 ("an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels,", "an embroidered light olive pearl-edged cape/stole over the shoulders, a SHORT round-pearl strand swags ACROSS her chest,", "7+8 (old Quý phi cape) + 10"),
 ("a broad gold brocade girdle with two long jade pendants hanging on silk cords,", "a broad gold brocade girdle with two long jade pendants hanging on silk cords, never covered by sleeve or shawl,", "18"),
 ("large peony medallions", "large double hollyhock medallions", "20"),
 ("dangling gold tassels and jade pins;", "dangling gold tassels and jade pins, none at the ears;", "19"),
 ("ANGLE: a SLIGHT shoulder turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; her head turns together with her shoulders and body, never back-turned, never in profile.", "ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn; her head never back-turned.", "23"),
 ("GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively graceful counter-line.", "GRACE (pose variety, every rank its own): her head tilted very slightly to one side, a soft graceful line from her neck to her shoulder.", "23"),
 ("Pose: a small step forward, a small pipa lute inlaid with gold and mother-of-pearl held at her waist with both hands, head tilted gracefully, poised, the robe hem stirring slightly.", "Pose: walking while holding a folded letter on gold-flecked paper tied with a silk cord in both hands, sleeves trailing, poised.", "23"),
], 6: [
 ("embroidered with peonies and plum blossoms in ice blue and gold thread along the borders,", "embroidered with incurved chrysanthemums in ice blue and gold thread along the borders, the body motifs never over the borders or bands,", "20 + 6"),
 ("an embroidered ice blue pearl-edged cape/stole over the shoulders,", "an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels,", "7+8 (old Phi cloud collar)"),
 ("gold-and-jade necklace and bracelets;", "gold-and-jade bracelets;", "12"),
 ("a pearl-edged collar and cape trim,", "a pearl-edged collar trim,", "7+8 (the cape went to Phi)"),
 ("a yellow sash and narrow yellow borders,", "a yellow sash and narrow yellow borders, the jade pendants never covered by sleeve or shawl,", "18"),
 ("image 2 is only a colour reference, never copy anything but its colour;", "image 2 is only a colour reference;", "24 repeat of the last sentence"),
 ("decorated with several gold hairpins (trâm) with dangles, rich", "decorated with several gold hairpins (trâm) with dangles, nothing at the ears, rich", "19"),
 ("ANGLE: a SLIGHT shoulder turn to the LEFT (about 15 degrees), body almost frontal, face toward the viewer; her head turns together with her shoulders and body, never back-turned, never in profile.", "ANGLE: a SLIGHT turn toward the LEFT side of the picture (about 15 degrees): her chest and face point a little toward the left edge of the picture, the shoulder on the picture's right side slightly nearer the viewer, body almost frontal, the whole face toward the viewer; her head never back-turned.", "23"),
 ("GRACE (pose variety, every rank its own): her fingers softly and gracefully curved around the item, wrists relaxed.", "GRACE (pose variety, every rank its own): her head tilted very slightly against the turn of her body, a lively graceful counter-line.", "23"),
 ("one hand holding a pearl-tasselled silk lantern with a jade top,", "one hand holding a pearl-embroidered silk ball (tú cầu) with jade tassels, a round stuffed ball, no handle, no stick,", "23"),
], 7: [
 ("embroidered with phoenixes, peonies and auspicious clouds in gold thread on the chest and along the borders,", "embroidered with phoenixes, incurved chrysanthemums and auspicious clouds in gold thread on the chest and along the borders, the phoenixes' plumage in lilac and ice blue with gold-thread outlines,", "20 + 13"),
 ("a jade-and-gold belt with long tassels, floor-length robe with slippers visible;", "a jade-and-gold belt with long tassels, its jade pendants never covered by the sleeves, floor-length robe;", "18 + 22/24"),
 ("with pearl strands, kingfisher-blue inlay and a few gold tassels.", "with pearl strands, its phoenix feathers inlaid in lilac and ice blue, and a few gold tassels, none at the ears.", "13 + 19"),
 ("a layered pearl-and-gold necklace, ", "", "12"),
 ("ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight and the item on her LEFT side; her head turns together with her shoulders and body, never back-turned, never in profile.", "ANGLE: FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn, mirrored: her weight and the item on the LEFT side of the picture; her head turns together with her shoulders and body, never back-turned, never in profile.", "23"),
 ("gaze to the viewer, with stately grace, the robe falling still and straight.", "gaze to the viewer, with stately grace.", "22 (walking)"),
], 8: [
 ("richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, peonies and clouds in gold and kingfisher-blue silk thread", "richly embroidered on the chest, shoulders and wide sleeves with large phoenixes, incurved chrysanthemums and clouds in gold, lilac and ice blue silk thread", "20 + 13"),
 ("over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls, ", "", "15"),
 ("a jade-and-gold belt with long tassels and jade pendants, floor-length robe with slippers visible,", "a jade-and-gold belt with long tassels and jade pendants, never covered by the sleeves, floor-length robe,", "18 + 22/24"),
 ("kingfisher-blue inlay, rubies and pearls, and a few clean pearl tassels at the sides;", "its phoenix feathers inlaid in lilac and ice blue, rubies and pearls, and a few clean pearl tassels at the sides, none at the ears;", "13 + 19"),
 ("DOMINANT colour of the robe, mantle, sleeves and skirt", "DOMINANT colour of the robe, sleeves and skirt", "15"),
 ("Pose: weight on one leg, a gold phoenix hairpin with pearl dangles, held in the hand raised and admired, the other hand beneath it, with stately grace, the robe falling still and straight.", "Pose: a gold phoenix hairpin with pearl dangles, slim and palm-length, held between her fingers, never a sceptre, raised and admired, the other hand beneath it, with stately grace.", "23"),
]}
NAME = {5: "Phi", 6: "Quý phi", 7: "Hoàng quý phi", 8: "Hoàng hậu"}
CAP = '\n\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "Mùa Thu · %s · prompt cũ L1714"'
def rep(t, o, n, r):
    assert t.count(o) == 1, (r, o[:70], t.count(o)); return t.replace(o, n)
for n in (5, 6, 7, 8):
    t = open(os.path.join(ROOT, f'dev/art/rank8-s62/s62_t{n}.txt')).read().strip()
    for o, w, r in COMMON:
        if o in t: t = rep(t, o, w, r)
    for o, w, r in T[n]: t = rep(t, o, w, r)
    if n <= 6:   # row 20 hair flower species
        t = t.replace("ONE fresh flower", "ONE fresh " + SP[n])
    t = t.replace("ice blue", MAIN).replace("mint mist", SEC).replace("#71B5D7", HEX)   # row 21 COLOUR SLOT
    t += CAP % NAME[n]
    p = os.path.join(D, '..', f's62_t{n}_THU_revert_L1714.txt'); open(p, 'w').write(t + '\n'); print(n, len(t))
