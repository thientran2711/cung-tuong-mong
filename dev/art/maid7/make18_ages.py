"""MAIDRUN1 age maker (owner L2086: draw ages 18 -> 36 first; ROOT-B2 order), words only, 0 gens.
For each maid person x rank (nhị đẳng excluded, m11 dropped) the newest prod file is the approved base.
ONLY the age sentence changes, using the builder's own age words (t8-prompt-B/build.py --state tmK --age aNN):
  a18 "about 22, youthful adult."   a26 "about 30, mature and poised."   a36 builder a36 sentence (trẻ trước tuổi).
Held item, hair (K22 always up), pose, angle, outfit, colours, face: unchanged (E13 item stays per person x rank).
Existing cells are not rebuilt: 6 ranks are a18 today; chưởng sự "about 28 but looking young" = her a26 cell.
Ma ma a36 is NOT built: the only ma ma prompt is a51 (other outfit + elder colour rule); a36 look vs gate S32 is the owner's open question.
Writes dev/art/maid7/prod_ages/<pid>_<rank>_<age>_L2089.txt + .keep. Run from the repo root.
"""
import glob, os, re
PIDS = "m09 m10 m12 m13 m18".split()
RANKS = "thosu tam tam_thancan nhi_thancan nhat nhat_thancan chuongsu".split()
A18 = "about 22, youthful adult."
A26 = "about 30, mature and poised."
A36 = ("about 36 but looking young for her age (trẻ trước tuổi): still youthful and very beautiful, only a touch more mature "
       "and poised than her young self, smooth skin, no visible lines, never an older face.")
CS26 = "about 28 but looking young, a youthful, poised adult, smooth skin."
WORDS = {"a18": A18, "a26": A26, "a36": A36}
OUT = "dev/art/maid7/prod_ages"
# Boilerplate trim (A38, only doubled words; LEN <= 10000 at a26/a36 for nhất + nhất thân cận, applied to the whole age family):
TRIM = [("Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; "
         "gentle expression with soft eyes and a bright closed-lip smile, lips closed, no teeth, mouth never open; ", "Fair porcelain skin; ")]
TRIM_WHY = "boilerplate trim (A38): frame = MASTER_COMMON line 3, closed-lip smile = the MOUTH/teeth sentences + her Expression; LEN <= 10000"

def latest(pid, rank):
    fs = [f for f in glob.glob(f"dev/art/maid7/prod/{pid}_{rank}_L*.txt") if re.fullmatch(rf".*/{pid}_{rank}_L(\d+)\.txt", f)]
    return max(fs, key=lambda f: int(re.search(r"_L(\d+)\.txt", f).group(1)))

os.makedirs(OUT, exist_ok=True)
n = 0
for pid in PIDS:
    for rank in RANKS:
        src = latest(pid, rank)
        t = open(src, encoding="utf-8").read()
        have, old = ("a26", CS26) if rank == "chuongsu" else ("a18", A18)
        assert t.count(old) == 1, (src, old)
        allow_trim = ""
        for a, b in TRIM:
            assert t.count(a) == 1, (src, "TRIM")
            t = t.replace(a, b); allow_trim += f"allow: {a.strip()}   # {TRIM_WHY}\n"
        for age, new in WORDS.items():
            if age == have:
                continue
            dst = f"{OUT}/{pid}_{rank}_{age}_L2089.txt"
            open(dst, "w", encoding="utf-8").write(t.replace(old, new))
            open(dst + ".keep", "w", encoding="utf-8").write(
                f"base: {src}\nallow: {old}   # age sentence -> {age} builder words (owner L2086 ages 18-36), MAIDRUN1\n" + allow_trim)
            n += 1
print(n, "files in", OUT)
