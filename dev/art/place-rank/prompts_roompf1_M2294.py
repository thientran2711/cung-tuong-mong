# ROOMPF1 (Foreman C ROOT-B8 child) — NEXT ROOM BATCH OF 5 as ChatGPT prompt files (A53: no Magnific drawing; owner draws in ChatGPT).
# Owner L2291 "tranh phòng ... làm tiếp đi"; L2293 "vẫn cứ giữ phong cách cũ ... đừng có đổi gì hết" -> the OLD in-game room recipe, verbatim.
# Recipe = the live chain prompts_pr19_batch1 (room/bed3R/rec2L) -> prompts_pr20_rooms (bed/rec + floor fix) -> prompts_pr20_rooms_tone (TONE v2)
#   -> PR21 COLOUR LEVEL 'rất nhẹ' (rule L28; the first CL_NEW of prompts_pr21_rooms_vivid.py — see the NOTE there: its second CL_NEW line
#   overrides it, so that builder prints the rejected-era 'fresh and vivid' wording; NOT fixed here, reported to the foreman).
# This file only ADDS rooms; it changes no existing builder (A55).
# Queue (PR20/PR13 order): Tần Thừa Minh ×2, then Phi (t5) of the palaces in table order: Khải Tường bed + rec, Chung Tú bed.
# A17 diffs (see the report dev/handover/reports/ROOMPF1.md):
#   * Tần TM rooms = pr19 helpers bed3R / rec2L verbatim + NEW CARD_TM (Thừa Minh had no card: the only new words, card template verbatim,
#     needs the owner's OK) + the PR20 floor fix + TONE v2 + CL 'rất nhẹ'.
#   * Phi rooms = pr20 helpers bed / rec verbatim with the rank swaps only: occupant Tần -> Phi, RC4 -> RC5 (B24 t5 lavender-violet #A88BCB,
#     words of the approved RC9[5]), LUX4 -> LUX5 (approved RANK['phi']['lux'] words), 'soft pink' -> 'soft lavender-violet', TONE 'pink' ->
#     'lavender-violet', image 4 = Phi strip (#A88BCB:4 #F3EBDD:1 #A8CDB8:1, room_tone_swatch.py, 0 cr).
import os, sys, json, contextlib, io, subprocess
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
ROOT = os.path.abspath(os.path.join(D, '..', '..', '..'))
OUTD = os.path.join(ROOT, 'dev', 'handover', 'prompts_L2095')
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr20_rooms_tone as T
R = T.R; A = R.A; B = A.B
CL_OLD = ("COLOUR LEVEL: soft, clear colours at the same level as the girl in image 2 and the room in image 1: gentle, light and pretty, "
          "every colour clearly readable, never saturated, never glaring, never neon, never pastel or washed out, never grey or dull.")   # = prompts_pr21_rooms_vivid.CL_OLD (not imported: that module rewrites its files on import)
CL_RN = ("COLOUR LEVEL (owner L1669: the 'rất nhẹ' look, the same colours only a little fresher): clear, clean colours like the girl in "
         "image 2, the same colours as the room in image 1, only a little fresher and richer: every colour clearly readable, no grey veil, "
         "no dull haze and no muted wash over the picture; never faded, never washed out, never grey or dull, never over-saturated, never "
         "neon or glaring.")   # verbatim = first CL_NEW of prompts_pr21_rooms_vivid.py (PR21 report: LIVE target, rule L28)

# NEW palace card (the only new words of this batch; same template as CARD_HA / CARD_DH / CARD_VH; flower, motif, wood, chair and doorway
# chosen so that none repeats another palace: CP crabapple/bats/rosewood/moon gate, KT lotus/nanmu/vase door, CT plum/magpies/sandalwood,
# HA orchid/butterflies/elm/begonia door, DH chrysanthemum/swallows/huanghuali/octagon, VH camellia/orioles/jichimu/gourd, TX magnolia).
CARD_TM = ("Thừa Minh cung signature style, the same in every room of this palace: osmanthus (hoa quế) is its flower, painted on the screens, "
    "embroidered on the silks and in the pots; motifs of pairs of mandarin ducks among water reeds carved in the beams and furniture; warm "
    "amber-brown camphor wood with small mother-of-pearl inlays; spindle-backed armchairs with a straight top rail; a fan-shaped doorway in a "
    "lattice partition of step-patterned frets. ")
TM_W = 'warm amber-brown camphor wood'
KT_W, CT_W = 'honey-brown nanmu wood', 'dark red sandalwood'   # = prompts_pr19_batch1 KT / CT woods

PHI = "a Phi (an imperial consort of the fifth rank, below a Quý phi) who heads this palace and lives here alone, in ancient China, a real room in daily use"
PHIR = "a Phi (an imperial consort of the fifth rank, below a Quý phi) who heads this palace and lives here alone in ancient China"
RC5 = (" RANK COLOUR (Phi, owner B24): lavender-violet like #A88BCB, a soft medium lavender-violet, is the one rank colour of the room, woven "
       "through the bed curtains, the bedding, the seat cushions, the window curtains and the lantern tassels, with ivory and soft jade-green as "
       "its quiet partners; no pink, no orange, no red silks.")   # Tần line says 'no purple' (= t5 colour); Phi excludes the t4 pink instead
ANCH5 = "no pink, no orange, no red silks."
RC5R = RC5.replace('the bed curtains, the bedding, the seat cushions', 'the seat cushions'); assert RC5R != RC5
LUX5 = " " + B.P['RANK']['phi']['lux']   # approved words, nothing added
TONE5 = T.TONE.replace('the pink of image 4', 'the lavender-violet of image 4'); assert TONE5 != T.TONE

def finish(p, phi=False):
    p = R.fix(p)
    if phi: assert p.count(ANCH5) == 1; p = p.replace(ANCH5, ANCH5 + TONE5)
    else: p = T.add_tone(p)
    assert p.count(CL_OLD) == 1; p = p.replace(CL_OLD, CL_RN)
    return p

def to_phi(p):
    for a, b in ((A.TAN, PHI), (A.TANR, PHIR), (A.RC4, RC5), (A.RC4R, RC5R), (A.LUX4, LUX5)):
        p = p.replace(a, b)
    p = p.replace('soft pink', 'soft lavender-violet')
    return p

G9 = list(B.G9); SW4 = '1lduM4wr4r'; SW5 = 'nVlcVgLYQD'   # Phi strip = CDN img/_review/place-rank/roompf1/tone-swatch-phi-t5.png, uploaded 0 cr
ROOMS = [
 # 41 Tần TM bedroom — 3 walls, windows RIGHT (image 3 = M3), bed centred (pr19 bed3R layout; Tần rooms 31/35 used it)
 ('thua-minh-cung-tan-ngu', 'M2294-11', 4, B.M3,
  A.room(A.bed3R('Thừa Minh', CARD_TM, TM_W, 'osmanthus sprays',
    "a dressing table with a bronze mirror and a small mother-of-pearl jewellery box, round stools with soft pink cushions, a small screen "
    "painted with osmanthus and mandarin ducks, a clothes rack with a soft pink robe, pots of osmanthus on slim stands, a small tea table, "
    "a bookshelf with boxes")), 'prompts_pr20_tone_vinh-hoa-cung-tan-ngu.txt'),
 # 42 Tần TM reception — 2 walls, windows LEFT (M2X), daybed right half, fan doorway left half (pr19 rec2L layout)
 ('thua-minh-cung-tan', 'M2294-12', 4, B.M2X,
  A.room(A.rec2L('Thừa Minh', CARD_TM, TM_W, 'osmanthus and mandarin ducks among reeds',
    'the fan-shaped doorway in a lattice partition of step-patterned frets', 'spindle-backed camphor-wood armchairs',
    "a low shelf with porcelain and small mother-of-pearl boxes, pots of osmanthus on stands, a small incense burner on a side table, "
    "an embroidery frame on a stand")), 'prompts_pr20_tone_vinh-hoa-cung-tan.txt'),
 # 43 Phi KT bedroom — 3 walls, windows LEFT (M3X), bed in the RIGHT half (KT Tần bedroom = 3w windows RIGHT, bed centred)
 ('khai-tuong-cung-phi-ngu', 'M2294-13', 5, B.M3X,
  A.room(R.bed('Khải Tường', B.WL3, 'LEFT', KT_W, 'lotus flowers', 'against the back wall in its RIGHT half',
    "in the LEFT half of the back wall the vase-shaped doorway in a hexagonal lattice partition onto an inner room; along the left window wall, "
    "square to it, a dressing table with a large bronze mirror and a lacquered jewellery cabinet and a round stool with a soft pink cushion; "
    "a clothes stand with a soft pink silk robe beside the bed, celadon bowls of lotus flowers on slim stands, a shelf with jade and porcelain "
    "treasures", B.CARD_KT)), 'prompts_pr20_tone_vinh-hoa-cung-tan-ngu.txt'),
 # 44 Phi KT reception — 2 walls, windows RIGHT (M2), daybed in the LEFT half (KT Tần reception = 2w windows LEFT, daybed right half)
 ('khai-tuong-cung-phi', 'M2294-14', 5, B.M2,
  A.room(R.rec('Khải Tường', R.WL2R, 'RIGHT', KT_W, 'lotus flowers and cranes', 'against the back wall in its LEFT half',
    "in the RIGHT half of the back wall the vase-shaped doorway in a hexagonal lattice partition onto an inner room; along the right window "
    "wall, square to it, a pair of square-backed nanmu armchairs with soft pink cushions and a small tea table between them; curio shelves "
    "with jade carvings, celadon vases and lacquer boxes, a bowl of lotus flowers on a stand, a bronze incense burner on a side table, a guqin "
    "on a low table", B.CARD_KT)), 'prompts_pr20_tone_vinh-hoa-cung-tan.txt'),
 # 45 Phi CT bedroom — 3 walls, windows RIGHT (M3), bed centred (CT Tần bedroom = 2w windows LEFT, bed right half)
 ('chung-tu-cung-phi-ngu', 'M2294-15', 5, B.M3,
  A.room(R.bed('Chung Tú', B.WL3, 'RIGHT', CT_W, 'plum blossoms', 'against the middle of the back wall',
    "in the LEFT side wall the rectangular doorway with rounded corners in a cracked-ice lattice partition onto an inner room; along the right "
    "window wall, square to it, a dressing table with a large bronze mirror and a cloisonné jewellery box and a low-backed rose chair with a "
    "soft pink cushion; a clothes stand with a soft pink silk robe beside the bed, vases of plum branches on slim stands, a curio shelf with "
    "porcelain and small cloisonné boxes", B.CARD_CT)), 'prompts_pr20_tone_vinh-hoa-cung-tan-ngu.txt'),
]
CAPTION = '\n\nCAPTION: write ONLY this code, small, bold, in the top-left corner, the only text in the picture: "{}"\n'
OUT = {}
for key, code, rank, img3, raw, base in ROOMS:
    p = finish(to_phi(raw) if rank == 5 else raw, phi=(rank == 5))
    if rank == 5:
        assert p.replace('no pink,', '').count('pink') == 0 and 'purple' not in p and TONE5 in p and 'Tần (' not in p and p.count('#A88BCB') == 1 and '#E3A3B8' not in p, key
    else:
        assert p.count('#E3A3B8') == 1 and '#A88BCB' not in p, key
    assert CL_RN in p and 'never paler' in p and 'five sixths' in p and A.WHITE in p and 'stone' not in p and '{' not in p, key
    if not key.endswith('-ngu'): assert 'canopy bed' not in p, key
    OUT[key] = dict(prompt=p, code=code, rank=rank, refs=[*G9, img3, SW4 if rank == 4 else SW5], base=base)
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'roompf1-M2294')
json.dump(OUT, open(os.path.join(D, 'prompts_roompf1_M2294.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items():
    f = os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt")
    open(f, 'w').write(v['prompt'] + CAPTION.format(v['code']))
print({k: (v['code'], len(v['prompt'])) for k, v in OUT.items()}, 'ROOM GATE PASS')
