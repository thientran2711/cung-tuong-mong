#!/usr/bin/env python3
"""REVERT1 (owner L1714): Tần t4 from the OLD Set A prompt rank8-s62/s62_t4.txt.
Writes s62_t4_THU_revert_sqtest_L1714.txt (square collar test) and s62_t4_THU_revert_L1714.txt (old crossed collar)."""
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(D, '..', '..', '..', '..'))
base = open(os.path.join(ROOT, 'dev/art/rank8-s62/s62_t4.txt')).read().strip()
def rep(t, old, new, row):
    assert t.count(old) == 1, (row, old[:60], t.count(old)); return t.replace(old, new)
COMMON = [  # (old, new, row)
 ("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; ", "", "24 repeat"),
 ("beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.", "beautiful/handsome romantic-lead looks for everyone.", "24 repeat / 23 angle"),
 ("embroidered borders of plum blossoms at collar, sleeves and hem,", "embroidered borders of lotus flowers at collar, sleeves and hem (the small embroidered motifs never run over these borders or bands),", "20 + 6"),
 ("an embroidered silk sash with hanging jade belt pendants and tassels,", "an embroidered silk sash with hanging jade belt pendants and tassels, the jade pendants never covered by sleeve or shawl,", "18"),
 ("small dangling gold bu yao tassel hairpins;", "small dangling gold bu yao tassel hairpins, none at the ears;", "19"),
 ("her signature colour family ice blue and mint mist stays the MAIN robe colour (ice blue); the robe itself is clearly ice blue silk", "her signature colour family light olive and lilac stays the MAIN robe colour (light olive); the robe itself is clearly light olive silk", "21"),
 ("her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ice blue silk like #71B5D7 is the main colour of the robe, sleeves and any cape, with mint mist in the inner robe", "light olive silk like #9FB577 is the main colour of the robe, sleeves and any cape, with lilac in the inner robe", "21"),
 ("decorated with ONE fresh flower and several", "decorated with ONE fresh lotus flower and several", "20"),
 ("exactly ONE fresh flower in her hair", "exactly ONE fresh lotus flower in her hair", "20"),
 ("ANGLE: a SLIGHT turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer; her head turns together with her shoulders and body, never back-turned, never in profile.",
  "ANGLE: a clear THREE-QUARTER view toward the LEFT side of the picture, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees so that her chest and face point toward the left edge of the picture, the shoulder on the picture's right side nearer the viewer, face fully visible (never side view); her head never back-turned.", "23"),
 ("GRACE (pose variety, every rank its own): her shoulders soft and relaxed, one shoulder a touch lower than the other.", "GRACE (pose variety, every rank its own): her head inclined gently toward the hand that holds the item, her face still toward the viewer.", "23"),
 ("the MAIN colour ice blue and the SECONDARY colour mint mist,", "the MAIN colour light olive and the SECONDARY colour lilac,", "21"),
 ("BOTH her robe colour ice blue and her secondary colour mint mist.", "BOTH her robe colour light olive and her secondary colour lilac.", "21"),
 ("gauze shawl in mint mist (her secondary colour, clearly different from her main robe colour ice blue)", "gauze shawl in lilac (her secondary colour, clearly different from her main robe colour light olive)", "21"),
 ("Pose: a three-quarter turn looking at the viewer, a silver-mounted book box held near her shoulder, the robe hem stirring slightly.", "Pose: walking with a small white-jade lotus lamp held upright in one hand.", "23"),
 ("floor-length robe with slippers visible,", "floor-length robe, only slipper toe tips peeking under the hem,", "22"),
]
OLD_CUT = "CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the collar lines are soft CURVES, never flat horizontal edges; the lower edge is rounded petal-like lobes along the lower edge, like the soft petals of a flower; the front is NOT closed or buttoned from top to bottom: the robe is closed only at the throat clasp and its front opens gradually from the collar downward in a long soft V, the two front panels parting more and more toward the hem, flowing and graceful (uyển chuyển), never cramped or boxy."
FALLBACK = [
 (OLD_CUT, "CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded petal-like lobes along the lower edge, like the soft petals of a flower; the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, graceful (uyển chuyển), never boxy.", "24 (approved S13 wording, same meaning)"),
]
SQ = [  # owner L1716: NO layer words (no inner/outer robe, no layered neckline); only the square collar + the capelet open around it
 ("a crossed collar,", "a straight SQUARE NECKLINE framed by a wide stiff lilac embroidered lotus flowers band (NO crossed wrap collar),", "3 TEST L1716 (m19/m29 t3 square-collar words)"),
 ("covering only the shoulders and upper chest,", "covering only the shoulders and the outer upper chest,", "3 TEST L1716"),
 ("fastened at the throat with a jade clasp,", "OPEN at the front, its two front edges parting so the square neckline shows fully inside it, never hidden,", "3 TEST L1716"),
 ("the pearl net starts right at the collar at the throat and hangs down", "the pearl net starts right at the capelet's neck edge and hangs down", "3 TEST L1716"),
 (OLD_CUT, "CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is rounded petal-like lobes along the lower edge, like the soft petals of a flower; the capelet is never closed at the throat, never buttoned down the front, the robe opening gradually below the square neckline in a long soft V toward the hem, graceful (uyển chuyển), never boxy.", "3 TEST L1716 + 24 (approved S13 structure, shorter)"),
]
CAP = '\n\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "%s"'
for name, extra, cap in (("s62_t4_THU_revert_sqtest_L1714.txt", SQ, "Mùa Thu · Tần · thử cổ vuông"), ("s62_t4_THU_revert_L1714.txt", FALLBACK, "Mùa Thu · Tần · cổ chéo cũ")):
    t = base
    for o, n, r in COMMON + extra: t = rep(t, o, n, r)
    t += CAP % cap
    p = os.path.join(D, '..', name); open(p, 'w').write(t + '\n'); print(name, len(t))
