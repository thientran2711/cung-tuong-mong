#!/usr/bin/env python3
"""SEAL3 full sets for bg- bé gái, bt- bé trai, mm- ma ma (owner Lượt 812 via ROOT-58: the Thái hậu-APPROVED seals, prompt kept y chang).
Prompts = th_prompts.py (SEAL1/SEAL5 Thái hậu) WORD FOR WORD; only the PERSON BLOCK is swapped (look, hair/headwear, colours, he/his for bt).
Seals: vui buon so an binh ghen lo muu tutin hanghai (gian done = the samples). NOT dau, no unreviewed seal.
Disc fix (ROOT-58: never near chroma green): hanghai 'bright spring green' → 'bright cobalt blue' (th-hanghai disc was keyed half-transparent).
Ref for A = the group's approved giận A (bg gOmeqmUSXO, bt hu24MALvqL, mm w4aBKCf7EI); B ref = that seal's own A.
usage: python3 grp_set_prompts.py bg|bt|mm [keys…]  → JSON {key: {A,B,out,loop,back}}"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import th_prompts as T
from grp_gian_prompts import G
KEYS = ["vui", "buon", "so", "an", "binh", "ghen", "lo", "muu", "tutin", "hanghai"]
REF_A = {"bg": "gOmeqmUSXO", "bt": "hu24MALvqL", "mm": "w4aBKCf7EI"}
# per group: what replaces the Thái hậu headwear words
X = {
 "bg": dict(head="her two small hair buns", swingA="hair buns bobbing", still="hair buns still", shake="hair buns shaking",
            strings="the small pink flower and the hairpin tassel", shakeV="her hair buns shake", face="little child face", cheek="round cheek"),
 "bt": dict(head="his small topknot", swingA="topknot bobbing", still="topknot still", shake="topknot shaking",
            strings="his topknot and the small gold crown ring", shakeV="his topknot shakes", face="little child face", cheek="round cheek"),
 "mm": dict(head="her neat bun", swingA="silver hairpins wobbling", still="hairpins still", shake="hairpins shaking",
            strings="her silver hairpins", shakeV="her silver hairpins shake", face="face", cheek="cheek"),
}
def swap(k, g, s):
    G0, x = G[g], X[g]
    s = s.replace(T.WHO, G0["who"]).replace(T.SAME, G0["same"]).replace(T.OLD, G0["short"])
    s = s.replace("bright spring green", "bright cobalt blue")
    s = s.replace("wide royal yellow sleeves with plum cuffs", "wide " + G0["sl"])
    s = s.replace("with the large phoenix crown", "with " + x["head"]).replace("and the large phoenix crown", "and " + x["head"])
    s = s.replace("by her crown", "by " + x["head"]).replace("above her crown", "above " + x["head"])
    s = s.replace("crown jewels swinging", x["swingA"]).replace("crown pearls hanging still", x["still"])
    s = s.replace("crown pearls shaking", x["shake"]).replace("the crown pearls shake", x["shakeV"])
    s = s.replace("the pearl strings of her crown", x["strings"])
    s = s.replace("wrinkled cheek", x["cheek"]).replace("old face", x["face"])
    if G0["P"][0] == "he":   # bé trai: she/her → he/his/him
        s = s.replace("her popping", "him popping").replace("around her.", "around him.").replace("around her;", "around him;").replace("herself", "himself")
        s = re.sub(r"\bshe\b", "he", s); s = re.sub(r"\bShe\b", "He", s)
        s = re.sub(r"\bher\b", "his", s); s = re.sub(r"\bHer\b", "His", s)
    return s
def prompts(g, k):
    return {p: swap(k, g, v) for p, v in T.prompts(k).items()}
BAD = ["dowager", "phoenix", "plum", "wrinkl", "seventy", "pearl", "spring green", " old ", "crown jewels"]
if __name__ == "__main__":
    g = sys.argv[1]; ks = sys.argv[2:] or KEYS
    out = {k: prompts(g, k) for k in ks}
    left = [(k, p, b) for k in out for p, v in out[k].items() for b in BAD if b in v]
    if g == "bt": left += [(k, p, "she/her") for k in out for p, v in out[k].items() if re.search(r"\b([Ss]he|[Hh]er)\b", v)]
    if left: print("LEFTOVER", left, file=sys.stderr)
    print(json.dumps(out, ensure_ascii=False, indent=1))
