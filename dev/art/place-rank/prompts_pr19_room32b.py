# PR19 — room 32 REDO (owner "2 loại" + A30 "loại = vẽ lại luôn", via ROOT-65 ~03:16Z). ONE gen.
# Khải Tường chính điện reception, TẦN. Recipe = prompts_pr19_batch1 (room-30-NEW) + LESS-FLOOR FIX (owner "Sàn phòng đợt 1 còn rộng quá"):
#   FR 'stand at about four fifths of the picture height, so the open floor in front is a strip of about one fifth of the picture height, never more.'
#   -> 'stand at about five sixths of the picture height, so the open floor in front is a narrow strip of about one sixth of the picture height,
#       never more. CAMERA CLOSE: ...' (measured: OK rooms 31/35 base at 84–87 % H; rejected 32 at ~70 %, "too wide" 33/34 at ~75–80 %).
# Layout varied from room 34 (3w R, daybed centred, chairs on the right wall) and from old 32 (2w L, daybed right half):
#   TWO walls = back + RIGHT side wall (image 3 = M2 4RFIyNR9Aa, windows RIGHT); daybed in the LEFT half of the back wall before a lotus/crane
#   screen; vase doorway in the RIGHT half; armchair pair + tea table along the right window wall.
import os, sys, json, contextlib, io
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
with contextlib.redirect_stdout(io.StringIO()):
    import prompts_pr19_batch1 as A
B = A.B; P = B.P
OLD_FR = ("stand at about four fifths of the picture height, so the open floor in front is a strip of about one fifth of the picture height, never more.")
NEW_FR = ("stand at about five sixths of the picture height, so the open floor in front is a narrow strip of about one sixth of the picture height, "
          "never more. CAMERA CLOSE (owner 'sàn còn rộng quá'): the camera stands only a few steps in front of the furniture, so the room and its "
          "furniture fill the picture down to that line; never a wide empty floor in the middle of the picture.")
assert OLD_FR in B.FR
FR2 = B.FR.replace(OLD_FR, NEW_FR)
WL2R = B.WL2.replace('the LEFT side wall', 'the RIGHT side wall'); assert WL2R != B.WL2
TXT = ("Khải Tường cung chính điện reception room, the sitting room where " + A.TANR + " receives her guests, a real room in daily use, no bed "
    "anywhere, " + WL2R + ": pillars, lattice windows in the RIGHT side wall onto a sunny lotus garden; against the back wall in its LEFT half, square "
    "to it and seen straight on, the host seat, the large clear main subject: a luohan daybed of carved honey-brown nanmu wood with a three-sided "
    "panel back, soft pink silk cushions and a small low kang table with a tea set in its middle, before a wide folding screen painted with lotus "
    "flowers and cranes; in the RIGHT half of the back wall the vase-shaped doorway in a hexagonal lattice partition onto an inner room; along the "
    "right window wall, square to it, a pair of square-backed nanmu armchairs with soft pink cushions and a small tea table between them; a tall "
    "celadon vase of lotus flowers on a stand beside the daybed, a small incense burner on a side table, a low shelf with celadon bowls and boxes, "
    "hanging paper lanterns with tassels. " + B.CARD_KT + A.RC4R + A.LUX4 + B.NOPE + P['NOSOFA'] + B.RECT + B.GUIDE_S + FR2 + B.TAGZONE)
OUT = {'khai-tuong-cung-tan': dict(prompt=A.room(TXT), refs=[*B.G9, B.M2])}
p = OUT['khai-tuong-cung-tan']['prompt']
assert A.WHITE in p and 'five sixths' in p and 'four fifths' not in p and '{' not in p and 'bed curtains' not in p
import room_gate; room_gate.guard(OUT, 'pr19-room32b')
json.dump(OUT, open(os.path.join(D, 'prompts_pr19_room32b.json'), 'w'), ensure_ascii=False, indent=1)
open(os.path.join(D, 'prompts_pr19_room32b.txt'), 'w').write(p)
print(len(p), OUT['khai-tuong-cung-tan']['refs'], 'GATE PASS')
