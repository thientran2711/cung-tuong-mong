# thaihau-rest TH3 (c21 c22 c23 c24 c28 c29 c30 c31 c32 x a36/a51/a65)
PRIORITY #1 CHECK: OD owner ~22:55Z (3 refs) + FIGURE_GATE A0 REFERENCES | main none (art) | review/* none | claims: old Thai hau mass archived; this = brief thaihau-rest.md TH3.
Method: `python3 dev/art/t8-prompt-B/build.py cNN --state thaihau --age aNN` (handover tip 9a7f6b0 "build.py thaihau: H item list + swatch line"), pasted UNCHANGED, no --nostyle. Refs EXACTLY 3 in order: (1) m09 eIyOFEidqL (type style), (2) her own live t1 figure of that age = face only (a65 -> her a51; no live a65 t1 on CDN, 404), (3) royal-yellow swatch TdwDfOyVNR. Pink kspkwKx16B never. gpt-2-6 1024x2304 2k count 1, folder ba4aecfe..., extraSettings transparentBackground true.
Post-process: transparentBackground gives soft alpha with dirty low-alpha smudge -> local script keeps alpha>=244 (no pixels repainted). Where the gen had a baked background or a stain I ran images_remove_background (3 cr): listed per person.
Checks per image (looked, <=600 px + face crop vs her t1): stiff Thai hau squared shoulder piece + high round collar, muted antique-gold + her muted colour, age (a36 young for age, a51 visible silver streaks, a65 much more silver + fine lines, dep lao), ONE item below the chin, face uncovered, closed-lip smile no teeth, bare forehead, frontal/three-quarter, calm pose.
Identity uploads (folder ba4aecfe; id order from parallel calls, verified by face crops): a36 / a51
c21 8aiv1VmIrU / YMlVv3xWeC | c22 rgXli1kxtc / 79f4cOZJAL | c23 1ldsijGr4r / TdweueeVNR | c24 UPvyW3twny / nVsTaBGYQD | c28 bxMr9wu5Y2 / eIP85QhdqL | c29 ov6hr5r829 / yiu6M0FPW9 | c30 tCRfLjYmZJ / jUoS2AnLD0 | c31 4RF3pd59Aa / yiu6MekPW9 | c32 0eUpuqcTfW / nVsTaFXYQD

| person | item | gens (a36/a51/a65) | look notes | result |
|---|---|---|---|---|
| c21 (ruby) | small white-jade ruyi | 1/1/1, 0 regen | face = her diamond face, all checks ok; a65 smudge cleaned by script | PASS |
| c22 (orchid purple) | sandalwood prayer beads | 1/1/1, 0 regen (+1 remove-bg on a36: stain) | pointed chin matches, beads below chin, ok | PASS |
| c23 (crimson) | gilded bronze hand censer | 1/1/1, 0 regen | square-jaw face matches, censer at waist | PASS |
| c24 (scarlet) | embroidered prayer-bead pouch | 1/1/1, 0 regen (+2 remove-bg on a51,a65: baked background) | dimple cheeks match, pouch at chest below chin | PASS |
CDN (img/_review/thaihau/, https://ctm-img.victoria-tntt.workers.dev/ + path): cNN_a36_thaihau.png | cNN_a51_thaihau.png | cNN_a65_thaihau.png | cNN_thaihau_sheet.jpg for all nine (c21 c22 c23 c24 c28 c29 c30 c31 c32); all 36 files return 200.
| c28 (celadon) | carved sandalwood box | 1/1/1, 0 regen (+1 remove-bg on a51: baked background) | round face matches, box at waist | PASS |
| c29 (ink blue) | jade-headed dragon-head staff | 1/1/1, 0 regen | dimple diamond face matches; staff held at chest, its jade head rises beside her shoulder/cheek but never overlaps the face (prompt unchanged per A0; flag for foreman) | PASS (flag) |
| c30 (moonlight blue) | gilded bronze hand censer | 1/1/1, 0 regen | pointed chin matches; a65 reads ~60 (silver streaks + lines, a little young) | PASS |
| c31 (pale jade) | small white-jade ruyi | 1/1/1, 0 regen (+2 remove-bg on a51 baked bg, a65 smudge) | square jaw matches, ruyi at chest | PASS |
| c32 (ivory) | jade-headed dragon-head staff | 1/1/1, 0 regen | wide-cheek face matches; same staff note as c29 | PASS (flag) |
All 9 people done, 27 gens, 0 regens. Extra: 7 images_remove_background (c22 a36, c24 a51+a65, c28 a51, c31 a51+a65 = 6, plus none other) -> 6 x 3 cr.
Credits: 27 gens x 135 = 3645 + 6 remove-bg x 3 = 18.
Notes: transparentBackground worked on most gens but ~1/3 had a baked parchment background or stains (listed above); fixed with images_remove_background, otherwise local alpha cleanup only. Thin hair dangles can be slightly trimmed by remove-bg (c24 a65).
