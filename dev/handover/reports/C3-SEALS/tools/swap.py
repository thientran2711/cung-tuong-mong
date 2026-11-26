#!/usr/bin/env python3
"""swap.py <group> <emo> -> JSON {A,B,out,loop} : the FINAL Thái hậu act prompts of <emo> (M2349 if redone, else M2342 A + THACT1 B/out/loop),
with ONLY the person block swapped (group text G below). Run from a checkout holding the handover branch (dev/handover/...).
Leftover check: prints LEFTOVER on stderr if a Thái hậu word survives. Group text = who / robe / head words / pronouns."""
import json, os, re, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..")   # dev/handover
P = os.path.join(R, "prompts_L2095"); TP = os.path.join(R, "reports", "THACT1_tools", "prompts")
M2349 = {"vui": "01", "lo": "02", "gian": "03", "an": "04", "muu": "05", "ghen": "06", "buon": "07", "so": "08", "chan": "09", "khochiu": "10", "tutin": "11", "tinhnghich": "12", "tinhtu": "13"}
M2342 = {"an": "01", "binh": "02", "dau": "03", "muu": "04", "ghen": "05", "gian": "06", "buon": "07", "vui": "08", "so": "09", "lo": "10", "hothen": "11", "chan": "12", "choang": "13", "hon": "14", "khochiu": "15", "tutin": "16", "tinhtu": "17", "tinhnghich": "18", "hanghai": "19", "chuyentam": "20", "hungkhoi": "21"}
EMOS = list(M2342)
def rd(p): return open(p, encoding="utf-8").read()
def raw(emo):
    if emo in M2349:
        n = M2349[emo]; b = f"{P}/M2349-{n}_th_act-{emo}_"
        c = rd(b + "clips_ACTION.txt"); out = re.search(r"OUT:\s*(.*?)\n\s*\nLOOP:", c, re.S).group(1).strip(); loop = re.search(r"LOOP:\s*(.*?)\n\s*\n(?:BACK:|$)", c + "\n\nBACK:", re.S).group(1).strip()
        return rd(b + "A_still_ACTION.txt"), rd(b + "B_burst_ACTION.txt"), out, loop
    n = M2342[emo]
    return rd(f"{P}/M2342-{n}_th_act-{emo}_A_still_TONEDOWN.txt"), rd(f"{TP}/B_{emo}.txt"), rd(f"{TP}/out_{emo}.txt"), rd(f"{TP}/loop_{emo}.txt")
# per group: who (A), same (B), short (clips), head (swing words), robe (sleeve words), P pronouns, ears (women: earlobe sentence kept)
G = {
 "emp": dict(
  who="the young EMPEROR of the imperial inner palace, a handsome man about thirty with a calm noble face, black hair gathered into a neat topknot held by a small gold crown piece with a gold hairpin, a royal yellow (#EFBD69) silk dragon robe with gold dragon embroidery at the chest and shoulders",
  same="Same young emperor, same soft hand-painted storybook style, same neat black topknot with the small gold crown piece and gold hairpin, same royal yellow (#EFBD69) silk dragon robe with gold dragon embroidery",
  short="young emperor in the gold crown piece", sl="royal yellow sleeves", head="his topknot", male=True, ears=False),
 "hh": dict(
  who="the EMPRESS (Hoàng hậu) of the imperial inner palace, a dignified woman about thirty with a poised noble face, black hair in a high elegant style under a LARGE gold phoenix crown with red jewel beads, a deep crimson red (#A8323A) silk robe with gold phoenix embroidery at the chest and shoulders",
  same="Same empress, same soft hand-painted storybook style, same large gold phoenix crown with red jewel beads, same deep crimson red (#A8323A) silk robe with gold phoenix embroidery",
  short="empress in the large gold phoenix crown", sl="deep crimson sleeves", head="her crown", male=False, ears=True),
 "pt": dict(
  who="a young CONSORT (imperial concubine) of the inner palace, a graceful woman about twenty-two with a soft pretty face, black hair in a neat elegant bun with two gold hairpins, a small pearl hair ornament and one small pink flower (no crown, no phoenix), a jade green (#6FAE92) silk robe with an ivory (#F1E6D2) collar and light gold embroidery at the shoulders",
  same="Same young consort, same soft hand-painted storybook style, same elegant black bun with two gold hairpins, small pearl ornament and small pink flower, same jade green (#6FAE92) silk robe with ivory (#F1E6D2) collar",
  short="young consort with the gold hairpins", sl="jade green sleeves", head="her hairpins", male=False, ears=True),
 "cl": dict(
  who="a senior palace MA MA (an older lady-in-waiting) of the inner palace, a woman about fifty-five, firm round face with a few soft lines at the eyes and mouth, dark hair with silver streaks pinned UP in a neat bun with two plain silver hairpins (no crown, no phoenix, no flowers, no loose hair), a coral red (#D4897D) brocade over-vest with a teal (#499597) stand collar and teal inner robe, thin gold trim",
  same="Same senior ma ma, same soft hand-painted storybook style, same silver-streaked bun with two plain silver hairpins, same coral red (#D4897D) brocade over-vest with teal (#499597) collar",
  short="senior ma ma with the silver hairpins", sl="coral red and teal sleeves", head="her hairpins", male=False, ears=True),
 "cy": dict(
  who="a YOUNG PALACE MAID (cung nữ) of the inner palace, a girl about eighteen, sweet round face with big round eyes, black hair pinned UP in a simple neat bun with ONE plain silver hairpin with a tiny tassel (no flowers, no crown, no phoenix, nothing grand, no loose hair), a plain maid's pale blue-green (#A9CFC4) silk jacket with a narrow ivory (#EAD7BF) collar, simple and modest, clearly a servant, not a consort",
  same="Same young palace maid, same soft hand-painted storybook style, same simple black bun with one silver hairpin with a tiny tassel, same pale blue-green (#A9CFC4) maid's silk jacket with ivory (#EAD7BF) collar",
  short="young maid with the silver hairpin", sl="pale blue-green sleeves", head="her hairpin", male=False, ears=True),
}
def swap(g, s):
    x = G[g]
    s = re.sub(r"\n+CAPTION:.*", "", s, flags=re.S).strip()
    s = re.sub(r"an ELDERLY EMPRESS DOWAGER .*?gold embroidery at the shoulders\.?", lambda m: x["who"] + ".", s, flags=re.S | re.I) if re.search(r"ELDERLY EMPRESS DOWAGER", s) else s
    s = re.sub(r"Same elderly empress dowager, .*?(?:deep plum \(#6E3A5E\) collar),", x["same"] + ",", s, flags=re.S)
    s = re.sub(r"The old empress dowager in the large gold phoenix crown", "The " + x["short"], s)
    s = s.replace("deep plum cuffs", "cuffs").replace("with plum cuffs", "").replace("royal yellow sleeves with plum cuffs", x["sl"]).replace("Wide royal yellow sleeves with plum cuffs visible", "Wide " + x["sl"] + " visible")
    s = re.sub(r"(by|above|on|from|over|at) her crown", r"\1 " + x["head"], s); s = s.replace("her crown", x["head"]).replace("the large gold phoenix crown", x["head"])
    s = s.replace("crown jewels swinging", "topknot bobbing").replace("the crown pearls shake", "his topknot shakes").replace("crown pearls", "topknot")
    if g != "emp": s = s.replace("royal yellow sleeves", x["sl"]).replace("yellow sleeves", x["sl"])
    if not x["ears"]: s = s.replace(" Bare earlobes, no earrings.", "")
    if x["male"]:
        s = re.sub(r"\bshe\b", "he", s); s = re.sub(r"\bShe\b", "He", s); s = re.sub(r"\bher\b", "his", s); s = re.sub(r"\bHer\b", "His", s); s = s.replace("herself", "himself").replace("around his.", "around him.")
    s = s.replace("with his popping", "with him popping").replace("  ", " ").replace(" .", ".")
    return s
BAD = ["dowager", "phoenix", "plum", "wrinkl", "seventy", "pearl", "elderly", " old ", "crown jewels", "empress"]
def prompts(g, emo):
    A, B, o, l = [swap(g, t) for t in raw(emo)]
    d = dict(A=A, B=B, out=o, loop=l)
    left = [(p, w) for p, v in d.items() for w in BAD if w in v]
    if left: print("LEFTOVER", emo, left, file=sys.stderr)
    return d
if __name__ == "__main__":
    g = sys.argv[1]; ks = sys.argv[2:] or EMOS
    print(json.dumps({k: prompts(g, k) for k in ks}, ensure_ascii=False, indent=1))
