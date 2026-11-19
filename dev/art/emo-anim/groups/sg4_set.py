#!/usr/bin/env python3
"""SEAL4 sets (owner Lượt 812 via ROOT-58): ht- htg- tg- tv- get the Thái hậu-APPROVED seals
vui buon so an binh ghen lo muu tutin hanghai. Each prompt = th_prompts.prompts(k) WORD FOR WORD with ONLY the person block changed
(WHO / SAME / short name, sleeves, headgear words, old-face words, she/her -> he/his) — person data from sg4_prompts.G (the OK'd giận samples).
Extra (foreman 23:52Z): hanghai disc 'bright spring green' -> 'bright coral' (disc never near chroma green);
htg clips get one skin sentence (the giận sample's BACK turned his face purple) — not for so (its pale purple fear tint is the feeling).
A ref = that group's giận A (sample); B ref = that seal's own A.
usage: python3 sg4_set.py ht [vui buon ...]  -> JSON {key: {A,B,out,loop,back}}   |  --check  (all 40, asserts no woman words left)"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import th_prompts as T
from sg4_prompts import G
KEYS = ["vui", "buon", "so", "an", "binh", "ghen", "lo", "muu", "tutin", "hanghai"]
REF_A = {"ht": "xSBTuOKjfW", "htg": "YMlKNB4WeC", "tg": "xSBTuP1jfW", "tv": "jUoVQNALD0"}
#            headgear (with the …)              swinging item (crown pearls → …)   face word for "old face"
HG = {"ht": ("small gold imperial crown", "crown tassels", "young face"),
      "htg": ("small gold imperial crown", "crown tassels", "old bearded face"),
      "tg": ("black gauze hat", "hat tassel", "beardless face"),
      "tv": ("steel helmet", "helmet plume", "face")}
SKIN = " His skin keeps its natural colour the whole time, never purple, never tinted."
def person(g, k):
    who, same, sl, face, hg, short, lhg, endface, top = G[g]
    head, item, oface = HG[g]
    p = T.prompts(k)
    out = {}
    for part, s in p.items():
        s = s.replace(T.WHO, who).replace(T.SAME, same).replace(T.OLD, short)
        s = s.replace("wide royal yellow sleeves with plum cuffs visible", sl)
        s = s.replace("the large phoenix crown", f"the {head}")
        s = s.replace("the pearl strings of her crown", f"the {item}").replace("crown pearls", f"the {item}").replace("crown jewels", f"the {item}")
        s = s.replace("the the ", "the ").replace("The the ", "The ")
        s = s.replace("by her crown", f"by her {top}").replace("above her crown", f"above her {top}")
        s = s.replace("her wrinkled cheek", "her cheek" if g != "htg" else "her wrinkled cheek")
        s = s.replace("the old face", "his face").replace("old face", oface)
        if k == "hanghai": s = s.replace("bright spring green", "bright coral")
        s = re.sub(r"\bshe\b", "he", s); s = re.sub(r"\bShe\b", "He", s); s = re.sub(r"\bherself\b", "himself", s)
        s = re.sub(r"\bher\b", "his", s); s = re.sub(r"\bHer\b", "His", s)
        s = re.sub(r"\bhis(?=\s*[.,;:)]|\s*$)", "him", s)          # object: "around her;" -> "around him;"
        s = s.replace("with his popping out", "with him popping out")
        if g == "htg" and part in ("out", "loop", "back") and k != "so":
            s = s.replace(" Smooth, ", SKIN + " Smooth, ").replace(" Slow enough to read,", SKIN + " Slow enough to read,")
        out[part] = s
    return out
BAD = re.compile(r"\b(she|her|She|Her|empress|dowager|phoenix|pearl|plum|seventy|bun)\b")
if __name__ == "__main__":
    if sys.argv[1:] == ["--check"]:
        n = 0
        for g in G:
            for k in KEYS:
                for part, s in person(g, k).items():
                    m = BAD.findall(s); n += 1
                    if m: print("LEFT", g, k, part, m, "|", s[:200])
        print("checked", n); sys.exit()
    g, ks = sys.argv[1], sys.argv[2:] or KEYS
    print(json.dumps({k: person(g, k) for k in ks}, ensure_ascii=False, indent=1))
