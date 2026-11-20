#!/usr/bin/env python3
"""F4 (ROOT-66; owner 20/11 ~06:45Z "Rồi sẵn tiện nha, vẽ lại cái cô C09 này đi. Cái tay của cổ này giờ tôi nhìn tôi mới để ý. Cái tay trái
cổ cầm lồng đèn nhưng mà thực tế tay này là tay phải."): c09 redraw, hand only.
= the approved c09.v3.FULL.txt (gen xSBWQlajfW, cut xSBWFuTjfW, seed 7172, ref eIyOFEidqL) UNCHANGED + ONE hand sentence after the
pose (A17), then FG.final (adds the MG1 master block + D9 forehead line: c09.v3 predates them and fails today's gate without them,
same as F3's make_c06_thu_trial.py), and 'deep rose' -> 'rose' (gate B20 DEEP COLOUR; hex #C16776 unchanged). → c09.v3h.FULL.txt. Run: python3 dev/art/face-common/make_c09_hand.py"""
EAR = "Bare earlobes: she wears NO earrings, nothing at the ears. "   # owner 20/11 (ROOT-66 relay) "…không ai được đeo hoa tai." (until NOEAR1 puts it in the master block)
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D); import face_gate as FG
v = open(os.path.join(D, "c09.v3.FULL.txt"), encoding="utf-8").read()
ANCHOR = "body turned three-quarters to the left, face toward the viewer."
HAND = (" HANDS: she holds the lantern's bamboo stick in her LEFT hand (the hand on the RIGHT side of the picture): an anatomically "
        "correct LEFT hand with five fingers, the thumb on the upper side of the stick on the side toward her body, the four fingers "
        "curled around the stick from below; her other hand is an anatomically correct RIGHT hand with five fingers; never two right "
        "hands, never a thumb on the wrong side.")
assert v.count(ANCHOR) == 1
v = v.replace(ANCHOR, ANCHOR + HAND)
# gate B20 DEEP COLOUR (Lượt 769) refuses the adjective "deep" on a colour word; the colour stays the same code #C16776 (word only)
assert v.count("deep rose") == 4; v = v.replace("deep rose", "rose")
pass   # NOEAR1: the bare-earlobes sentence now comes from master_common.apply (EAR_SENT, rule F15); was: v = v.replace("No text, no labels.", EAR + "No text, no labels.") if "NO earrings" not in v else v
v = FG.final(v, "c09.v3h.FULL")
open(os.path.join(D, "c09.v3h.FULL.txt"), "w", encoding="utf-8").write(v)
print("== c09.v3h.FULL", len(v))
