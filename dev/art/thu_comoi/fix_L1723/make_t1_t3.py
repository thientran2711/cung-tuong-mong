#!/usr/bin/env python3
"""REVERT1 job L1723 C: s62 thu t1-t3 = OLD Set A rank8-s62/s62_tN.txt + the L1714 rows (19 ears, 20 species, 21 colours, 22 toe tips,
23 today's angle/pose/item from dapung4 current files, 24 repeats) + G39 (t3 hairpins) + L1723 hair flower (bloom only, colour table)."""
import os, re
MAIN, SEC, HEX = "light olive", "lilac", "#9FB577"          # COLOUR SLOT (row 21)
D = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(D, '..', '..', '..', '..'))
CUR = {1: 'dev/art/dapung4/s62_t1_COMOI_v11.txt', 2: 'dev/art/dapung4/s62_t2_COMOI_v11.txt', 3: 'dev/art/dapung4/s62_t3_COMOI_v12.txt'}
SP = {1: ("lilac", "lilac flowers", "pure white"), 2: ("tiger lily", "tiger lilies", "soft peach-coral"), 3: ("semi-double China rose", "semi-double China roses", "soft rose-pink")}  # row 20 F2_FL s62 + L1723 colour
HFL = "the bloom ONLY, NO leaves, never a yellow chrysanthemum"
def rep(t, o, n, r):
    assert t.count(o) == 1, (r, o[:70], t.count(o)); return t.replace(o, n)
def grab(t, rx): m = re.search(rx, t); assert m, rx; return m.group(0)
COMMON = [
 ("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; ", "", "24"),
 ("beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.", "beautiful/handsome romantic-lead looks for everyone.", "24/23"),
 ("her ORIGINAL robe colour is kept exactly as in image 1 (her first reference): ", "", "21"),
 ("floor-length robe with slippers visible, no train", "floor-length robe, only slipper toe tips peeking under the hem, no train", "22"),
]
T = {1: [
 ("a wide embroidered plum blossoms hem band, small sprays of embroidered plum blossoms on the upper garment;", "a wide embroidered lilac flowers hem band, small sprays of embroidered lilac flowers on the upper garment, never over the cuff or hem bands;", "20 + 6"),
 ("pretty silver hairpins and a fresh flower (a plum blossom);", "pretty silver hairpins, none at the ears, and a fresh flower (a pure white lilac, bloom only, no leaves);", "19 + 20 + L1723"),
], 2: [
 ("delicate embroidered plum blossoms at the collar, sleeves and hem and a soft silk sash;", "delicate embroidered tiger lilies at the collar, sleeves and hem, never over the bands, and a soft silk sash;", "20 + 6"),
 ("silver and pearl hairpins and a fresh flower (a plum blossom);", "silver and pearl hairpins, none at the ears, and a fresh flower (a soft peach-coral tiger lily, bloom only, no leaves);", "19 + 20 + L1723"),
], 3: [
 ("embroidered plum blossoms band;", "embroidered semi-double China roses band;", "20"),
 ("plum blossoms embroidery, gold-braid edge", "semi-double China roses embroidery, gold-braid edge", "20"),
 ("ending in silk tassels;", "ending in silk tassels, never covered by sleeve or shawl;", "18"),
 ("wide embroidered plum blossoms bands at the sleeve ends and the hem;", "wide embroidered semi-double China roses bands at the sleeve ends and the hem, the small motifs never over these bands;", "20 + 6"),
 ("pearl-tipped hairpins, a fresh flower (a plum blossom);", "two or three slim pearl hairpins set INTO her gathered hair at natural angles, mostly hidden in the hair, each with a small dangling pearl ornament, none at the ears, never a radiating crown of straight pins or spikes, a fresh flower (a soft rose-pink semi-double China rose, bloom only, no leaves);", "G39 + 19 + 20 + L1723"),
]}
for n in (1, 2, 3):
    t = open(os.path.join(ROOT, f'dev/art/rank8-s62/s62_t{n}.txt')).read().strip(); cur = open(os.path.join(ROOT, CUR[n])).read()
    for o, w, r in COMMON + T[n]: t = rep(t, o, w, r)
    t = rep(t, grab(t, r"ANGLE: [^.]*\."), grab(cur, r"ANGLE: .*?(?=GRACE|\. )") .rstrip("; ").rstrip(".") + ".", "23")
    t = t.replace("face fully visible (never side view).", "face fully visible (never side view); her head never back-turned.")   # E1 table form (as t4)
    t = rep(t, grab(t, r"GRACE \(pose variety[^.]*\."), grab(cur, r"GRACE \(pose variety[^.]*\."), "23")
    t = rep(t, grab(t, r"Pose: [^.]*\."), grab(cur, r"Pose: [^.]*\."), "23")
    t = rep(t, "exactly ONE fresh flower in her hair (never two,", f"exactly ONE fresh {SP[n][2]} {SP[n][0]} in her hair ({HFL}; never two,", "20 + L1723")
    t = t.replace("ice blue", MAIN).replace("mint mist", SEC).replace("#71B5D7", HEX)
    t += f'\n\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "Mùa Thu · {["","Đáp ứng","Thường tại","Quý nhân"][n]} · prompt cũ L1723"'
    p = os.path.join(D, '..', f's62_t{n}_THU_L1723.txt'); open(p, 'w').write(t + '\n'); print(n, len(t))
