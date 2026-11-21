#!/usr/bin/env python3
"""MAIDFIX4 L1919 (owner): held items. Base = the L1905 files (per-rank poses + G61 hands clear of the front waist, G57/G59/G60 kept).
Changes ONLY the "she holds … in a contrasting colour" item phrase (picker dev/art/maid_items.py = builder AGE5 lists, rule E13),
and for m11 ONLY the face line (owner L1919: adult face, never baby/chibi; ma ma = a real 51-year-old). Writes prod/<pid>_<rank>_L1919.txt + .keep.
Run from repo root."""
import sys
sys.path.insert(0, "dev/art"); import keep_check as kc, maid_items as M
P = "dev/art/maid7/prod/"
PERS = ["m09", "m10", "m11", "m12", "m13", "m18"]
M11_OLD = "Her face: a small ROUND baby face with full soft cheeks and a tiny rounded chin, very LARGE round eyes with big irises, short soft straight brows, a small button nose, a tiny rosebud mouth."
M11_NEW = ("Her face: a soft rounded oval face with gently full cheeks and a softly rounded chin, large bright almond eyes in adult proportion, "
           "softly arched brows, a small straight nose, a small rosebud mouth; {AGE}.")
M11_AGE = {"mama_a51": "a real 51-year-old woman with a mature adult face, never a baby face, never chibi, never a big head on a small body",
           "chuongsu": "an adult woman of about 28, adult face and body proportions, never a baby face, never chibi, never a big head on a small body"}
M11_AGE_DEF = "an adult young woman of about 20, adult face and body proportions, never a baby face, never chibi, never a big head on a small body"
picks = M.pick_all(PERS); rows = []
for pid in PERS:
    for rk in M.RANKS:
        b = P + f"{pid}_{rk}_L1905.txt"; s = open(b, encoding="utf-8").read()
        old = M.item_of(s); assert old, (pid, rk)
        kind, it = picks[pid][rk]
        a, n = M.HOLD.subn(lambda m: "she holds " + M.article(it) + " in a contrasting colour", s); assert n == 1
        s = a; why = "held item owner L1919 (E13: every rank a different item; builder AGE5 pick)"
        allow = []
        if pid == "m11":
            assert s.count(M11_OLD) == 1, rk
            s = s.replace(M11_OLD, M11_NEW.format(AGE=M11_AGE.get(rk, M11_AGE_DEF)))
        INT = "Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down."
        FAB = " FABRIC (same for every palace maid): all her clothes are matte silk crepe: a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, soft and drapey, never glossy, never satin, never brocade."
        trim = False   # A38 boilerplate trim only (same two trims as make11_poses.py), listed as allow lines
        if len(s) > 9995 and s.count(INT) == 1: s = s.replace(INT, "Her hands interact naturally with the item, her head up facing the viewer, eyes open, lips closed."); trim = True
        if len(s) > 9995 and s.count(FAB) == 1: s = s.replace(FAB, ""); trim = True
        assert len(s) <= 10000, (pid, rk, len(s))
        f = P + f"{pid}_{rk}_L1919.txt"; open(f, "w", encoding="utf-8").write(s)
        d = kc.check(b, f, [])[0]
        for x in d:
            x = x.split("#")[0].strip()
            w = why if (old in x or x in old) else ("m11 face owner L1919: adult face, no baby/chibi words" if pid == "m11" else why)
            if trim and (x in INT or x in FAB): w = "A38 boilerplate trim to stay under 10 000 (hands-interact boilerplate shortened / duplicate FABRIC line; crepe sentence stays in the master block)"
            allow.append(f"allow: {x}   # {w}")
        open(f + ".keep", "w", encoding="utf-8").write("\n".join([f"base: {b}"] + allow) + "\n")
        rows.append((pid, rk, kind, it, len(s)))
open(P + "ITEM_TABLE_L1919.tsv", "w", encoding="utf-8").write("pid\trank\tkind\titem\tlen\n" + "\n".join("\t".join(map(str, r)) for r in rows) + "\n")
print(len(rows))
