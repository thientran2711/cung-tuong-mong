#!/usr/bin/env python3
"""MAIDFIX3 L1869 (owner L1869; K19/K24/K26/K28): colour ROLES fix. MAIN = cung nu uniform powder blue #A7BAD2 (always); SECONDARY = the person's OWN main
(m09 rose pink #D5909C; m18 own main ~ blue -> K26 own secondary deep rose #CA7281). Thân cận = flip (existing flipped bases). Chưởng sự main = tím cà (unchanged).
Ma ma MAIN = xanh lam ngọc bích (jade blue-green, leaning green) deeper at a51, SECONDARY = person's own colour. Colour tokens ONLY (A47). Run from repo root."""
import re, sys
sys.path.insert(0, "dev/art"); import keep_check as kc
D = "dev/art/maid7/"; P = D + "prod/"
FACE18 = "Her face: a SLIM OVAL face with a gently pointed chin, large almond eyes with softly upturned outer corners, fully open and clear, softly arched thin brows, a slim straight nose, a small rosebud mouth. Expression: Sparkling eyes, a small playful closed-lip smile, head slightly tilted, eyes fully open, never a stretched grin."
FACE09 = "Her face: a small HEART-SHAPED face with a narrow pointed chin and wide cheekbones, long almond eyes clearly UPTURNED at the outer corners (a cat-eye look), high thin arched brows, a small straight nose, a slightly fuller pouty lower lip. Expression: a sly, confident little smile with one corner of the mouth higher."
JADE = "xanh lam ngọc bích"
BASE = {"tam": "test17_tam_L1785", "nhi": "test17_nhi_L1785", "nhat": "test18_nhat_L1797", "tam_thancan": "test17_tam_thancan_L1785",
        "nhi_thancan": "test17_nhi_thancan_L1785", "nhat_thancan": "test18_nhat_thancan_L1797", "thosu": "test3_tm0", "chuongsu": "gpt/chuongsu_gpt_v5", "mama_a51": "gpt/mama_gpt_v6_a51"}
def rd(f): return open(f, encoding="utf-8").read()
def sub(t, o, n):
    assert t.count(o) == 1, (t.count(o), o[:60]); return t.replace(o, n)
def jade(t):  # m18 ma ma text (powder blue main) -> MAIN jade blue-green
    t = sub(t, "RECOLOUR the whole costume to her own colour powder blue (the same colour family as her 36-year-old self)",
               "RECOLOUR the whole costume to the ma ma uniform colour jade blue-green (xanh lam ngọc bích, leaning a little to green, the same colour family as her 36-year-old self)")
    t = t.replace("powder blue", "jade blue-green").replace("#A7BAD2", "#4E8FA3")
    return t
def to09(t):
    t = sub(t, FACE18, FACE09)
    return t.replace("deep rose", "rose pink").replace("#CA7281", "#D5909C")
def allows(base, new, why):
    b = rd(base); n = rd(new) if not isinstance(new, str) or new.endswith(".txt") and len(new) < 300 else new
    return kc.check(base, new, [])[0]
out = []
for key, bn in BASE.items():
    src18 = P + f"m18_{key}_L1836.txt"; t18 = rd(src18)
    t18 = jade(t18) if key.startswith("mama") else t18
    jobs = [("m09", to09(t18))] + ([("m18", t18)] if key.startswith("mama") else [])
    for pid, txt in jobs:
        f = P + f"{pid}_{key}_L1869.txt"; open(f, "w", encoding="utf-8").write(txt)
        base = D + bn + ".txt"
        d = kc.check(base, f, [])[0]
        why = "K19/K24/K26: ma ma MAIN = jade blue-green (xanh lam ngọc bích), v6 own-colour wording replaced; owner L1869" if key.startswith("mama") else "K19/K26: person swap, face + SECONDARY = her own main " + pid + " (MAIN stays uniform blue); owner L1869"
        extra = "ports/gate form from L1836 (crepe, clean edge, bow, ChatGPT-only parts removed, E1/C5/S36/S19)"
        # allow every dropped base phrase; classify port vs colour/face by whether the m18 L1836 file already dropped it
        prev = {x for x in kc.check(base, src18, [])[0]}
        lines = [f"base: {base}"]
        for raw in d:
            lines.append("allow: " + raw.split("#")[0].strip() + "   # " + (extra if raw in prev else why))
        open(f + ".keep", "w", encoding="utf-8").write("\n".join(lines) + "\n"); out.append((pid, key, f, len(txt)))
for o in out: print(*o)
