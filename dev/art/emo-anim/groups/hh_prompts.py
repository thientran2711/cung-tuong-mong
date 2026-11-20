#!/usr/bin/env python3
"""Hoàng hậu mood-seal set (prefix hh-), owner Lượt 800 (hh-gian approved → whole set).
Method = th_prompts.py (Thái hậu set) with ONLY who-she-is swapped to the approved hh-gian look (sg2_prompts.py hh):
woman ~30, LARGE gold phoenix crown, royal yellow #EFBD69 robe + deep crimson red #A8323A collar/cuffs. No 'Qing' word.
«đau» = NEW heart-ache wording (owner): no wailing, one tear, hand on heart.
Ref for every A = hh-gian A (gOmeqH6SXO); B ref = that seal's own A.  usage: python3 hh_prompts.py [keys…] → JSON"""
import json, sys, re
import th_prompts as T
import sg2_prompts as G
HH = G.G["hh"]
SWAP = [(T.WHO, HH["who"]), (T.SAME, HH["same"]),
        (T.OLD, "empress in the large gold phoenix crown"),
        ("royal yellow sleeves with plum cuffs", "royal yellow sleeves with crimson red cuffs"),
        ("plum cuffs", "crimson red cuffs"),
        ("INVITING AN HONOURED GUEST TO HER TEA", "INVITING THE EMPEROR"),   # Hoàng hậu may invite the emperor (w-act original)
        ("the old face", "her face"), ("old face", "face"), ("wrinkled cheek", "cheek"), ("old empress dowager", "empress"),
        ("elderly empress dowager", "empress"),
        ("bright spring green", "bright coral")]   # disc never near chroma green (foreman 23:52Z, as SEAL5 th-hanghai / SEAL4)
DAU = ("deep blue",
  "Her face is HEARTACHED: brows tilted up in quiet sorrow, eyes glistening and looking down, lips pressed together trembling, exactly ONE single tear on one cheek, one hand pressed flat over her heart",
  "HEARTACHED in quiet pain",
  "one hand pressed flat over her heart, the other resting limp on the gold rim, wide royal yellow sleeves with crimson red cuffs visible; brows tilted up in quiet sorrow, glistening eyes looking down, lips pressed together, exactly one single tear on one cheek, no crying out, mouth closed; one small cracked pale-blue heart floating beside her",
  "feels a sharp ache in her heart: she slowly leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out, one hand presses flat over her heart, the other rests on the rim, her eyes glisten and one single tear rolls down, a small cracked pale-blue heart appears beside her; mouth stays closed, no wailing",
  "aches quietly in a slow loop: she presses her hand to her heart, closes her eyes for a moment and breathes in sadly, her lips tremble, the one tear glistens on her cheek, the small cracked heart pulses softly; mouth closed, no wailing",
  "gives one last quiet sigh, the cracked heart fades away, she lowers her hand from her heart", "a quietly hurt face with one tear and the large phoenix crown")
def prompts(k):
    if k == "dau":
        T.S["dau"] = DAU
        d = T._prompts_s("dau")
    else:
        d = T.prompts(k)
    out = {}
    for part, s in d.items():
        for a, b in SWAP: s = s.replace(a, b)
        s = re.sub(r"\bwith the large phoenix crown with the large phoenix crown\b", "with the large phoenix crown", s)
        out[part] = s
    bad = [w for w in ["Qing", "plum", "dowager", "elderly", "silver-grey", "wrinkl", "old face", " old "] if w in " ".join(out.values()).replace("plum-wine", "").replace("plum-blossom", "")]
    assert not bad, (k, bad)
    return out
ORDER = ["vui", "buon", "so"] + T.ORDER     # 3 + 34 = 37 (gian done)
VI = {"an": "Ẩn", "binh": "Bình", "buon": "Buồn", "chan": "Chán", "choang": "Choáng", "chuyentam": "Chuyên tâm", "dau": "Đau",
      "ghen": "Ghen", "gian": "Giận", "hanghai": "Hăng hái", "hon": "Hờn", "hothen": "Hổ thẹn", "hungkhoi": "Hưng khởi",
      "khochiu": "Khó chịu", "lo": "Lo", "muu": "Mưu", "so": "Sợ", "tinhnghich": "Tinh nghịch", "tinhtu": "Tình tứ", "tutin": "Tự tin", "vui": "Vui"}
def caption(k): return ("Hành động · " + VI[k[4:]]) if k.startswith("act-") else VI[k]
if __name__ == "__main__":
    import os as _os; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG; import seal_ear as _SE  # F15 NOEAR (owner Lượt 1037): women seals = no earrings + bare-earlobes sentence  # A24 seal gate: FAIL = exit 1, no prompts printed = no gen
    ks = sys.argv[1:] or ORDER
    print(json.dumps(_SG.guard(_SE.ear({k: prompts(k) for k in ks}), "hh"), ensure_ascii=False, indent=1))
