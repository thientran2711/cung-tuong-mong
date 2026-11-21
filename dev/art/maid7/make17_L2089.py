"""MAIDRUN1 (owner L2086/L2089): family fix of the maid production prompts, words only, 0 gens.
Base = the newest prod/<pid>_<rank>_L*.txt per person x rank (m11 dropped, nhị đẳng excluded by L2086).
Fixes (LUẬT SỬA CẢ NHÓM, whole rank family):
  F1 thô sử (5/5 FAIL G60b): the front bow had no LONG ties -> add "with two long soft ties trailing down from the bow".
  F2 ma ma a51 (3/5 FAIL LEN > 10000): drop the doubled frame clause (same words as MASTER_COMMON line 3, kept);
     applied to all 5 ma ma so the family stays identical.
Writes prod/<pid>_<rank>_L2089.txt + .keep (base + allow lines). Run from the repo root.
"""
import glob, re, sys
PIDS = "m09 m10 m12 m13 m18".split()
RANKS = "thosu tam tam_thancan nhi_thancan nhat nhat_thancan chuongsu mama_a51".split()
F1_OLD = "in a small, pretty, graceful bow, the sash"
F1_NEW = "in a small, pretty, graceful bow with two long soft ties trailing down from the bow, the sash"
F2_OLD = "Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain"
F2_NEW = "Fair porcelain"
F2_ALLOW = "Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain"

def latest(pid, rank):
    fs = [f for f in glob.glob(f"dev/art/maid7/prod/{pid}_{rank}_L*.txt") if re.fullmatch(rf".*/{pid}_{rank}_L(\d+)\.txt", f)]
    return max(fs, key=lambda f: int(re.search(r"_L(\d+)\.txt", f).group(1)))

out = []
for pid in PIDS:
    for rank in ("thosu", "mama_a51"):
        src = latest(pid, rank)
        if src.endswith("_L2089.txt"):
            continue
        t = open(src).read()
        allows = []
        if rank == "thosu":
            assert t.count(F1_OLD) == 1, (src, "F1")
            t = t.replace(F1_OLD, F1_NEW)
            allows.append(f"allow: {F1_OLD}   # G60b long bow ties (owner L1971), MAIDRUN1 L2089 family fix")
        else:
            assert t.count(F2_OLD) == 1, (src, "F2")
            t = t.replace(F2_OLD, F2_NEW)
            allows.append(f"allow: {F2_ALLOW}   # boilerplate trim (A38): doubled frame clause, MASTER_COMMON line 3 keeps it; LEN <= 10000, MAIDRUN1 L2089")
        dst = re.sub(r"_L\d+\.txt$", "_L2089.txt", src)
        open(dst, "w").write(t)
        open(dst + ".keep", "w").write(f"base: {src}\n" + "\n".join(allows) + "\n")
        out.append((dst, len(open(src).read()), len(t)))
for d, a, b in out:
    print(f"{d}  {a} -> {b} chars")
