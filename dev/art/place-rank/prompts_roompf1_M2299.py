# ROOMPF1 batch 2 — owner L2299 "Duyệt, tiếp đi" (M2294-11..15 approved, incl. the Thừa Minh card) via Foreman C ROOT-B9.
# Next 5 PHI (t5) chính điện rooms in queue order: Chung Tú reception, Hàm An bed + reception, Thừa Minh bed + reception.
# Recipe = prompts_roompf1_M2294.py EXACTLY (same helpers, same Phi swaps, same TONE5 / CL 'rất nhẹ', same refs method); A17 diff = only the
# room texts (palace, wood, flower, layout per L19) + existing palace cards (CARD_CT, CARD_HA, CARD_TM approved L2299). No new style words.
# Own layouts vs the same palace's Tần room (L19), 3-wall / 2-wall alternating after M2294-15 (3w):
#   M2299-11 chung-tu-cung-phi     2w windows LEFT  (M2X) daybed left half by the windows, doorway right half   (CT Tần rec = 3w R, daybed centred)
#   M2299-12 ham-an-cung-phi-ngu   3w windows LEFT  (M3X) bed left half, begonia doorway right half             (HA Tần bed = 3w R, bed centred)
#   M2299-13 ham-an-cung-phi       2w windows RIGHT (M2)  daybed right half by the windows, doorway left half   (HA Tần rec = 3w L, daybed centred)
#   M2299-14 thua-minh-cung-phi-ngu 3w windows LEFT (M3X) bed centred, fan doorway in the RIGHT side wall       (TM Tần bed = 3w R, bed centred, no doorway)
#   M2299-15 thua-minh-cung-phi    2w windows RIGHT (M2)  daybed left half, fan doorway right half, chairs facing (TM Tần rec = 2w L, daybed right half)
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_roompf1_M2294 as M   # rebuilds its own M2294 outputs identically (deterministic)
R, A, B = M.R, M.A, M.B
ROOT = M.ROOT; OUTD = M.OUTD
HA_W = R.HA_W
ROOMS = [
 ('chung-tu-cung-phi', 'M2299-11', B.M2X,
  A.room(R.rec('Chung Tú', B.WL2, 'LEFT', M.CT_W, 'plum blossoms and magpies', 'against the back wall in its LEFT half, near the window wall',
    "in the RIGHT half of the back wall the rectangular doorway with rounded corners in a cracked-ice lattice partition onto an inner room; in "
    "front of the right half, a pair of low-backed rose chairs with soft pink cushions facing each other across a small square tea table; "
    "curio shelves with porcelain vases and small cloisonné boxes beside the doorway, vases of plum branches on stands, a bronze incense burner "
    "on a side table, an embroidery frame on a stand", B.CARD_CT)), 'prompts_pr20_tone_vinh-hoa-cung-tan.txt'),
 ('ham-an-cung-phi-ngu', 'M2299-12', B.M3X,
  A.room(R.bed('Hàm An', B.WL3, 'LEFT', HA_W, 'orchids', 'against the back wall in its LEFT half',
    "in the RIGHT half of the back wall the four-lobed begonia-shaped doorway in a key-fret lattice partition onto an inner room; along the "
    "right side wall, square to it, a dressing table with a large bronze mirror and a lacquered jewellery cabinet and a round stool with a soft "
    "pink cushion; a clothes stand with a soft pink silk robe beside the bed, blue-and-white pots of orchids on slim stands, a shelf with jade "
    "and porcelain treasures", B.CARD_HA)), 'prompts_pr20_tone_vinh-hoa-cung-tan-ngu.txt'),
 ('ham-an-cung-phi', 'M2299-13', B.M2,
  A.room(R.rec('Hàm An', R.WL2R, 'RIGHT', HA_W, 'orchids and butterflies', 'against the back wall in its RIGHT half, near the window wall',
    "in the LEFT half of the back wall the four-lobed begonia-shaped doorway in a key-fret lattice partition onto an inner room; in front of the "
    "left half, a pair of armchairs with gently curved yoke-shaped top rails and soft pink cushions facing each other across a small tea table; "
    "a low shelf with books, scrolls and small blue-and-white porcelain, blue-and-white pots of orchids on stands, a bronze incense burner on a "
    "side table, a guqin on a low table", B.CARD_HA)), 'prompts_pr20_tone_vinh-hoa-cung-tan.txt'),
 ('thua-minh-cung-phi-ngu', 'M2299-14', B.M3X,
  A.room(R.bed('Thừa Minh', B.WL3, 'LEFT', M.TM_W, 'osmanthus sprays', 'against the middle of the back wall',
    "in the RIGHT side wall the fan-shaped doorway in a lattice partition of step-patterned frets onto an inner room; along the left window "
    "wall, square to it, a dressing table with a large bronze mirror and a mother-of-pearl jewellery cabinet and a round stool with a soft pink "
    "cushion; a clothes stand with a soft pink silk robe beside the bed, pots of osmanthus on slim stands, a small screen painted with mandarin "
    "ducks among reeds, a shelf with jade and porcelain treasures", M.CARD_TM)), 'prompts_pr20_tone_vinh-hoa-cung-tan-ngu.txt'),
 ('thua-minh-cung-phi', 'M2299-15', B.M2,
  A.room(R.rec('Thừa Minh', R.WL2R, 'RIGHT', M.TM_W, 'osmanthus and mandarin ducks among reeds', 'against the back wall in its LEFT half',
    "in the RIGHT half of the back wall the fan-shaped doorway in a lattice partition of step-patterned frets onto an inner room; in front of "
    "the right half, near the windows, a pair of spindle-backed camphor-wood armchairs with soft pink cushions facing each other across a small "
    "square tea table; curio shelves with jade carvings and small mother-of-pearl boxes, pots of osmanthus on stands, a bronze incense burner "
    "on a side table, an embroidery frame on a stand", M.CARD_TM)), 'prompts_pr20_tone_vinh-hoa-cung-tan.txt'),
]
OUT = {}
for key, code, img3, raw, base in ROOMS:
    p = M.finish(M.to_phi(raw), phi=True)
    assert p.replace('no pink,', '').count('pink') == 0 and 'purple' not in p and M.TONE5 in p and 'Tần (' not in p, key
    assert p.count('#A88BCB') == 1 and '#E3A3B8' not in p, key
    assert M.CL_RN in p and 'never paler' in p and 'five sixths' in p and A.WHITE in p and 'stone' not in p and '{' not in p, key
    if not key.endswith('-ngu'): assert 'canopy bed' not in p, key
    OUT[key] = dict(prompt=p, code=code, rank=5, refs=[*M.G9, img3, M.SW5], base=base)
import room_gate; room_gate.guard({k: v['prompt'] for k, v in OUT.items()}, 'roompf1-M2299')
json.dump(OUT, open(os.path.join(D, 'prompts_roompf1_M2299.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in OUT.items():
    open(os.path.join(OUTD, f"{v['code']}_{k}_ha_sang.txt"), 'w').write(v['prompt'] + M.CAPTION.format(v['code']))
print({k: (v['code'], len(v['prompt'])) for k, v in OUT.items()}, 'ROOM GATE PASS')
