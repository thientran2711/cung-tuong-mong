#!/usr/bin/env python3
"""MAIDFIX3 L1895: 4 more maid persons (m10 m11 m12 m13) x 9 ranks + m09 ma ma fix. K19/K24/K26/K28 colour roles: MAIN = cung nu uniform powder blue #A7BAD2,
SECONDARY = her own main (K26: m11 own main sky blue ~ uniform -> own secondary coral rose). Thân cận = flip (flipped bases), chưởng sự main tím cà, ma ma MAIN jade #4E8FA3.
Source = the m18 *_L1836 files (sachet already removed G59; no pendant G57; bows at the front). Face line swap + secondary colour tokens only (A47). Run from repo root."""
import json, re, sys
sys.path.insert(0, "dev/art"); import keep_check as kc
D = "dev/art/maid7/"; P = D + "prod/"
PEOPLE = json.load(open("dev/art/KC_REFS.json", encoding="utf-8"))["people"]
COL = json.load(open("dev/art/face-common/m_colours_proposed.json", encoding="utf-8"))["rows"]
FACE18 = "Her face: a SLIM OVAL face with a gently pointed chin, large almond eyes with softly upturned outer corners, fully open and clear, softly arched thin brows, a slim straight nose, a small rosebud mouth. Expression: Sparkling eyes, a small playful closed-lip smile, head slightly tilted, eyes fully open, never a stretched grin."
BASE = {"tam": "test17_tam_L1785", "nhi": "test17_nhi_L1785", "nhat": "test18_nhat_L1797", "tam_thancan": "test17_tam_thancan_L1785",
        "nhi_thancan": "test17_nhi_thancan_L1785", "nhat_thancan": "test18_nhat_thancan_L1797", "thosu": "test3_tm0", "chuongsu": "gpt/chuongsu_gpt_v5", "mama_a51": "gpt/mama_gpt_v6_a51"}
# (name, hex) of the SECONDARY slot for each person
SEC = {"m09": ("rose pink", "#D5909C"), "m10": ("sage green", "#ABCDA2"), "m11": ("coral rose", "#CF8377"),   # m11: own main sky blue ~ uniform -> K26 own secondary
       "m12": ("warm sand apricot", "#DEBF9C"), "m13": ("lilac", "#C3A1CE")}
def rd(f): return open(f, encoding="utf-8").read()
def sub(t, o, n):
    assert t.count(o) == 1, (t.count(o), o[:60]); return t.replace(o, n)
def jade(t):
    t = sub(t, "RECOLOUR the whole costume to her own colour powder blue (the same colour family as her 36-year-old self)",
               "RECOLOUR the whole costume to the ma ma uniform colour jade blue-green (xanh lam ngọc bích, leaning a little to green, the same colour family as her 36-year-old self)")
    return t.replace("powder blue", "jade blue-green").replace("#A7BAD2", "#4E8FA3")
def person(t, pid):
    n, h = SEC[pid]; face = PEOPLE[pid]["face_words"].strip()
    assert face.startswith("Her face:"), face[:30]
    t = sub(t, FACE18, face)
    t = t.replace("deep rose-plum", "\0KEEP\0").replace("deep rose", n).replace("#CA7281", h).replace("\0KEEP\0", "deep rose-plum")
    return t
tag = "L1895"; made = []
for pid in ["m09", "m10", "m11", "m12", "m13"]:
    for key, bn in BASE.items():
        if pid == "m09" and key != "mama_a51": continue   # m09 other ranks stay L1869; only ma ma had the 'deep rose-plum' token bug
        t18 = rd(P + f"m18_{key}_L1836.txt") if key != "mama_a51" else rd(P + "m18_mama_a51_L1869.txt")
        if key == "mama_a51": t18 = t18  # already jade
        txt = person(t18, pid)
        assert "teal" not in txt or pid == "m09" and False
        f = P + f"{pid}_{key}_{tag}.txt"; open(f, "w", encoding="utf-8").write(txt)
        base = D + bn + ".txt"; d = kc.check(base, f, [])[0]
        prev = set(kc.check(base, P + f"m18_{key}_L1836.txt", [])[0]) if key != "mama_a51" else set(kc.check(base, P + "m18_mama_a51_L1869.txt", [])[0])
        lines = [f"base: {base}"] + ["allow: " + x.split("#")[0].strip() + "   # " + ("ports/gate form/G59 (as m18 file)" if x in prev else f"person swap {pid}: face + SECONDARY = her own colour (K19/K26); owner L1895") for x in d]
        open(f + ".keep", "w", encoding="utf-8").write("\n".join(lines) + "\n"); made.append((pid, key, f, len(txt)))
for m in made: print(*m)
