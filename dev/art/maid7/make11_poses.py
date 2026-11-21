#!/usr/bin/env python3
"""MAIDFIX3 L1905 (owner): every maid rank a clearly DIFFERENT pose/angle; hands + held item NEVER in front of the waist (ngọc bội slot / sash+bow area).
Only the Pose-slot words (hands, angle) change (A47 + owner L1905). Angle = ANG14 entry idx=(3*rank_i+5*person_i)%14 (E1: 9 ranks of a person all distinct, same rank differs across persons).
Writes prod/<pid>_<rank>_L1905.txt (+.keep, base = the current valid file of that person/rank). Run from repo root."""
import ast, re, sys, os
sys.path.insert(0, "dev/art"); import keep_check as kc
P = "dev/art/maid7/prod/"
ANG = None
for n in ast.parse(open("dev/art/t8-prompt-B/build.py", encoding="utf-8").read()).body:
    if isinstance(n, ast.Assign) and getattr(n.targets[0], "id", "") == "ANG14": ANG = ast.literal_eval(n.value)
RANKS = ["thosu", "tam", "tam_thancan", "nhi", "nhi_thancan", "nhat", "nhat_thancan", "chuongsu", "mama_a51"]
PERS = ["m09", "m10", "m11", "m12", "m13", "m18"]
CLEAR = " Hands and item stay clear of the front waist: nothing covers the sash, the bow or the centre front."
HANDS = {
 "thosu": "the item carried in her one hand hanging low at the side of her body, arm relaxed and a little away from the hip, her other hand gently holding the side of her skirt, head tilted gently toward the viewer.",
 "tam": "the item held up in both hands at chest height just below the collar, elbows bent and apart, head tilted gently toward the viewer.",
 "tam_thancan": "the item resting on one open palm raised to shoulder height at the side of her body, her other hand lightly lifting her sleeve, head tilted gently toward the viewer.",
 "nhi": "the item held in one hand out to the side of her body at hip height and slightly forward, away from the front of the waist, her other arm relaxed, head tilted gently toward the viewer.",
 "nhi_thancan": "the item raised in one hand beside her shoulder, near her cheek, her other hand resting lightly at her side, head tilted gently toward the viewer.",
 "nhat": "the item held in the fingertips of one raised hand beside her shoulder, her other hand lifting the trailing sleeve, head tilted gently toward the viewer.",
 "nhat_thancan": "the item hanging from one hand low at her side, arm relaxed, her other hand touching her collar, head tilted gently toward the viewer.",
 "chuongsu": "the item held in one hand at her side, hanging from her fingers at hip height, her other hand folded behind her back, head held high and calm.",
 "mama_a51": "the item held raised in both hands at chest height beside her, tilted a little toward the viewer, head tilted gently toward the viewer.",
}
def src(pid, rk):
    if pid == "m18": return P + ("m18_mama_a51_L1869.txt" if rk == "mama_a51" else f"m18_{rk}_L1836.txt")
    if pid == "m09": return P + ("m09_mama_a51_L1895.txt" if rk == "mama_a51" else f"m09_{rk}_L1869.txt")
    return P + f"{pid}_{rk}_L1895.txt"
def angle_idx(pid):
    s = 5 * PERS.index(pid); used = {}; out = {}
    for i, rk in enumerate(RANKS):
        x = (3 * i + s) % 14
        if x == 7: x = next(k for k in range(14) if k != 7 and k not in [(3 * j + s) % 14 for j in range(9)] and k not in [(3 * i + 5 * q) % 14 for q in range(6)])  # idx 7 names 'the item' side; swap for an unused one
        out[rk] = x
    assert len(set(out.values())) == 9
    return out
made = []
for pid in PERS:
    idx = angle_idx(pid)
    for rk in RANKS:
        s = open(src(pid, rk), encoding="utf-8").read()
        assert s.count("the item held below the chin, ") == 1
        s = s.replace("the item held below the chin, ", "")
        old = "Her hands and body: the item held in both hands lowered before her at waist height, head tilted gently toward the viewer."
        assert s.count(old) == 1, (pid, rk)
        s = s.replace(old, "Her hands and body: " + HANDS[rk] + CLEAR)
        ang = "ANGLE: " + ANG[idx[rk]] + ";"
        if "ANGLE:" in s: s, n = re.subn(r"ANGLE: .+?;", lambda m: ang, s, count=1); assert n == 1
        else:
            assert s.count(" Pose: calm standing pose;") == 1
            s = s.replace(" Pose: calm standing pose;", " " + ang + " Pose: calm standing pose;", 1)
        INT = "Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down."
        FAB = " FABRIC (same for every palace maid): all her clothes are matte silk crepe: a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, soft and drapey, never glossy, never satin, never brocade."
        if len(s) > 9995 and s.count(INT) == 1: s = s.replace(INT, "Her hands interact naturally with the item, her head up facing the viewer, eyes open, lips closed.")   # A38 boilerplate trim
        if len(s) > 9995 and s.count(FAB) == 1: s = s.replace(FAB, "")   # A38: repeats the B29 crepe sentence already in the master block
        if len(s) > 9995: s = s.replace(CLEAR, " Hands and item stay clear of the front waist and bow.")
        assert len(s) <= 10000, (pid, rk, len(s))
        f = P + f"{pid}_{rk}_L1905.txt"; open(f, "w", encoding="utf-8").write(s)
        b = src(pid, rk); d = kc.check(b, f, [])[0]
        open(f + ".keep", "w", encoding="utf-8").write("\n".join([f"base: {b}"] + ["allow: " + x.split("#")[0].strip() + "   # pose fix owner L1905: rank-specific angle + hands/item away from the front waist" for x in d]) + "\n")
        made.append((pid, rk, idx[rk], len(s)))
open(P + "POSE_TABLE_L1905.tsv", "w").write("\n".join("\t".join(map(str, m)) for m in made) + "\n")
print(len(made))
