#!/usr/bin/env python3
"""J4 ORIGIN FRAMES (AP01). Origin ids/colours READ from dev/build/jpres.js (KPO) and dev/build/j60.js (KIT_ORIGINS); names from j1.js ORIGINS / jorigins.js ORIGIN_LORE."""
import sys, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, ".."))
from _lib import *
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
rd = lambda p: open(os.path.join(ROOT, p), encoding="utf-8").read()
KPO = dict(re.findall(r'(\w+):"(#[0-9a-f]{6})"', re.search(r'const KPO=\{(.*?)\}', rd("dev/build/jpres.js")).group(1)))
ORIG = re.findall(r'"(\w+)"', re.search(r'KIT_ORIGINS=\[(.*?)\]', rd("dev/build/j60.js")).group(1))
NAMES = dict(re.findall(r'\{k:"(\w+)",(?:on:"[^"]*",land:"[^"]*",)?n:"([^"]+)"', rd("dev/build/j1.js")))
ORIG = ORIG + ["srv"]   # the 9th = the maid start (KPO.srv / cnv, jpres.js:59, 82)
NAMES["srv"] = "Cung nữ (đường hầu)"
# per-origin subject: ONLY the game's own definition (j1.js ORIGINS t:, jorigins.js ORIGIN_LORE), turned into border ornaments
SUB = {
 "tt": ("Con gái Tể tướng: powerful minister's house, poetry and reading the hearts of courtiers",
        "a refined scholar-minister border: a slim scroll rolled at each corner, a writing brush crossed with a bundle of bamboo slips at the top centre, small plum-blossom sprigs and a quiet cloud scroll running along the edges, all in warm gold", False),
 "dtq": ("Con gái Đại tướng quân: father holds the border army, rides and uses a whip, strong body",
        "a martial border: a tasselled spear-head and a short whip crossed at the top centre, a small swallow-tail pennant fluttering at each upper corner, a galloping horse in a tiny relief at the bottom centre, sturdy crimson bands with iron-gold studs", False),
 "muoi": ("Con gái nhà buôn muối: salt-merchant wealth, silver in the storehouse, low birth",
        "a salt-trader border: rows of small salt crystals and a tiny salt-pan rake at the corners, a silver ingot and a hanging string of coins at the bottom centre, a counting abacus relief at the top centre, pale salt-blue and bright silver", False),
 "cn": ("Cung nữ được sủng hạnh: once served tea at Càn Thanh palace, a night of imperial favour, knows all the palace servants",
        "a tea-palace border: a small teapot and two cups in relief at the top centre, tea-leaf sprigs and a single palace-lantern at each corner, a tea-tray edge motif along the bottom, soft rose pink and cream", False),
 "nc": ("Công chúa hòa thân (Cao Ly): a foreign princess married across the border to buy peace, a living peace treaty",
        "a foreign-princess border: a pair of cranes facing each other at the top centre, pine boughs at the corners, a tied treaty scroll at the bottom centre, a continuous wave-and-cloud pattern along the edges in jade teal", False),
 "td": ("Con gái tội thần: whole family executed in a false case, enters the palace under another name to take revenge",
        "a cold border of ruin and hidden vengeance: a cracked seal-stamp at the top centre, curling thin ash and torn paper edges at the corners, a faint hidden dagger-hilt outline woven into the bottom band, muted ash-violet with deep plum-brown shadows", True),
 "ch": ("Cháu gái Thái hậu: the Queen Mother's own niece, put into the palace as her chess piece, backed by the Queen Mother",
        "a queen-mother's-favour border: a string of prayer beads looped along the top, a single carved chess piece at the top centre, amber-coloured peony scrolls and phoenix-tail curls at the corners, warm amber gold", False),
 "thd": ("Con gái thầy đồ nghèo: poor village teacher's daughter, poems and writing better than anyone, nothing else",
        "a humble scholar border: an ink-stone and a worn brush at the top centre, thin bamboo stalks and soft moss patches creeping over plain wood edges, one small open book at the bottom centre, moss green and unpainted wood brown", False),
 "srv": ("Cung nữ (đường hầu): a commoner girl who passed the Nội vụ phủ maid selection, nameless servant who must climb rung by rung",
        "a servant's-ladder border: a small stack of steps rising along the left edge, a simple palace lantern and a folded cloth at the corners, a plain broom-and-bucket relief at the bottom centre, jade green and undyed linen", False),
}
OUT = os.path.join(HERE, "J4")  # NB: _lib's star import rebinds HERE to dev/art/prompts
rows = []
for i, k in enumerate(ORIG, 1):
    title, ornament, dark = SUB[k]
    col = KPO.get(k) or KPO["srv"]
    parts = [S_STYLE, S_TAKE,
      "Subject: a decorative FRAME for a main-story event card of the game, for the origin \"%s\" (%s): %s. The frame is purely ornamental, no person at all, no face. Ornament plan: %s. The main accent colour of this frame is exactly %s (the origin's colour in the game); use it for the main bands and let the other colours be soft supporting tones." % (k, NAMES[k], title, ornament, col),
      "Composition and size: portrait 3:4 (768x1024). Only the border is painted: a band roughly one fourteenth of the width, on all four sides, with ornaments gathered mainly at the four corners and the middle of the top and bottom edges, and the long straight edges kept simple and repeating so the frame can be stretched. The whole centre area is left EMPTY as one flat plain pure white (#FFFFFF), and the outside of the border is the same plain pure white, edges clean and soft, so the owner can later remove the white and keep a transparent PNG. Perfectly symmetric left to right, flat front view, no perspective, no shadow cast on the white.",
      S_DARK if dark else S_LIGHT,
      S_COLOUR,
      "No text, no labels, no letters, no numbers, no watermark, no signature, no picture inside the centre, no people, no faces.",
      "Output: ONE image, PNG with transparent centre if you can, otherwise plain pure white as described."]
    key = "kpo-%s" % k
    write_prompt(OUT, key, parts, "AJ4-KPO%s-%02d" % (k.upper(), i))
    rows.append((k, key, "AJ4-KPO%s-%02d" % (k.upper(), i), col))
save_codes("J4")
print(len(rows), "written")
