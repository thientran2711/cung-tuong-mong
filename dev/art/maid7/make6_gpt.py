#!/usr/bin/env python3
"""MAIDP1 (owner Lượt 1352): ChatGPT prompts. Every swap asserted (exactly once)."""
import os
D = os.path.dirname(os.path.abspath(__file__))
HDR = ("[ChatGPT: attach Image 1 = m18 face reference (the same single reference used on Magnific, "
       "s7IPw0Ll8e). 'The reference image' and 'the identity reference' below both mean Image 1. "
       "Make ONE tall portrait image (about 1024x2304), one figure.]\n\n")

def rd(f): return open(os.path.join(D, f), encoding="utf-8").read().strip()
def sw(t, a, b):
    assert t.count(a) == 1, (t.count(a), a[:80]); return t.replace(a, b)
def wr(f, t): open(os.path.join(D, "gpt", f), "w", encoding="utf-8").write(HDR + t + "\n")

# 1 THÂN CẬN = round-1 ma ma (test_mama.txt) verbatim + who/age/hair/sleeve words + colour placement
t = rd("test_mama.txt")
t = sw(t, "A palace ma ma (ma ma, a senior woman of the palace staff), dignified, gracious and still beautiful.",
       "A trusted personal palace maid (cung nu than can), the close personal attendant of her mistress, young, refined, gracious and beautiful.")
t = sw(t, "about 36 but looking young for her age (trẻ trước tuổi): still youthful and very beautiful, only a touch more mature and poised than her young self, smooth skin, no visible lines, never an older face.",
       "about 22, youthful adult.")
t = sw(t, "Outfit (the ma ma costume, never poor)", "Outfit (the cung nữ thân cận uniform, never poor)")
t = sw(t, "ALL her hair pinned UP in a neat bun (chignon) with her hairpins",
       "ALL her hair pinned UP in neat young palace-maid double-loop buns (never a matron's chignon) with her hairpins")
t = sw(t, "a palace ma ma's sleeves", "a palace maid's sleeves")
t = sw(t, "Any flower or pattern on the fabric is fine",
       "COLOUR PLACEMENT (cung nữ thân cận): the OUTER robe, the over-vest and the wide sleeves are the palace maid uniform colour powder blue like #A7BAD2; the two front panels (hai tà) and the inner robe showing at the collar are her OWN colour deep rose like #CA7281 (her own main colour is the same blue as the uniform, so her own secondary colour is used). Any flower or pattern on the fabric is fine")
wr("thancan_gpt.txt", t)

# 2 NHẤT ĐẲNG = test5_nhat.txt verbatim except the collar (closed standing collar covering the inner robe, like chưởng sự kiểu B)
t = rd("test5_nhat.txt")
t = sw(t, "a sleeveless embroidered over-vest with a stand collar closed by a small knot button, with a band of gold-edged trim down the front, worn over a crossed-collar inner robe;",
       "a sleeveless embroidered over-vest with a straight upright standing collar, the vest closed edge to edge all the way from the collar down to the waist, with NO knot button at the throat, NO gap, NO V-opening and NO slit below the collar, so it fully covers the inner robe at the neck and chest (none of the inner robe shows at the neck or chest), with a band of gold-edged trim down the front, worn over the inner robe;")
wr("nhat_gpt.txt", t)

# 3 MA MA = old round-1 prompt (live_mama.txt), unchanged
wr("mama_gpt.txt", rd("live_mama.txt"))

# 4 CHƯỞNG SỰ = test4_csD.txt + MORE embroidery than nhất đẳng
t = rd("test4_csD.txt")
t = sw(t, "restrained tone-on-tone embroidery only on the borders;",
       "RICH embroidery, clearly MORE and denser than a first-rank maid's (nhất đẳng): broad bands of dense peony and plum-blossom embroidery on the collar band, along both front-edge borders, on wide embroidered cuff bands and along the coat hem and the skirt hem, plus embroidered flower sprays scattered over the whole coat body, the sleeves and the front of the inner skirt, in lighter tones of purple and powder blue with fine gold thread (embroidery, never brocade);")
wr("chuongsu_gpt.txt", t)
print("ok")
