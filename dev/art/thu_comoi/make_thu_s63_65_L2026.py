#!/usr/bin/env python3
"""VE12 (owner L2009 + L2026 via Foreman C ROOT): thu t1-t5 for s63 s64 s65 from the APPROVED s62 thu files.
Only the person slot changes (face words, robe colours, flower species F2, flower colours F20 table);
every other word = the approved s62 file. Items kept = s62's approved ladder (book / pellet drum / flute / lotus lamp / letter).
Also: t1 = G69 chest-centre cluster (base = VE6 s62_t1_THU_fix_L2008); t4 = G68 density (L1994) + long sash ties at the
centre front + lamp upright in one hand at her side + hair flower bloom only (L2011/L2015 F19). Embroidery keeps leaves (L2015).
Writes sNN_tK_THU_L2026.txt + .keep (base = the s62 file; allow lines = the swapped person-slot phrases)."""
import json, os, re, subprocess, sys
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
D = os.path.join(R, "dev/art/thu_comoi")
BASE = {1: "s62_t1_THU_fix_L2008.txt", 2: "s62_t2_THU_fix_L1847.txt", 3: "s62_t3_THU_fix_L1978.txt",
        4: "s62_t4_THU_sqtest_L1994.txt", 5: "s62_t5_THU_fix_L1856.txt"}
RANK = {1: "Đáp ứng", 2: "Thường tại", 3: "Quý nhân", 4: "Tần", 5: "Phi"}
FC = json.load(open(os.path.join(R, "dev/art/face-common/flower_colours_L2013.json")))
# English colour names for the L1726 thu palette + F20 table hexes (names chosen by VE12 to match the hex)
P = {
 "s63": dict(main="soft amber", notw="NOT orange", sec="ivory",
             emb="soft pale apricot",
             hair={1: "pale cream-white", 2: "pale cream-white", 3: "cream-white", 4: "warm cream-white", 5: "warm cream-white"},
             fl={1: ("pear blossom", "pear blossoms"), 2: ("narcissus flower", "narcissus flowers"), 3: ("double azalea", "double azaleas"),
                 4: ("double peach blossom", "double peach blossoms"), 5: ("tea-scented China rose", "tea-scented China roses")}),
 "s64": dict(main="muted teal", notw="NOT grey", sec="ivory",
             emb="soft pale sky blue",
             hair={1: "very pale lilac", 2: "pale lilac", 3: "pale lilac", 4: "soft pale lilac", 5: "soft lilac"},
             fl={1: ("single peach blossom", "single peach blossoms"), 2: ("lily magnolia", "lily magnolias"),
                 3: ("semi-double rose of Sharon", "semi-double rose-of-Sharon flowers"), 4: ("double kerria pompon", "double kerria pompons"),
                 5: ("double cotton-rose hibiscus", "double cotton-rose hibiscus flowers")}),
 "s65": dict(main="smoky mauve", notw="NOT grey", sec="ivory",
             emb="orchid mauve",
             hair={1: "light pink-lilac", 2: "soft pink-lilac", 3: "soft pink-lilac", 4: "pink-lilac", 5: "pink-lilac"},
             fl={1: ("plum blossom", "plum blossoms"), 2: ("pomegranate flower", "pomegranate flowers"), 3: ("wintersweet blossom", "wintersweet blossoms"),
                 4: ("double daylily", "double daylilies"), 5: ("double gardenia", "double gardenias")}),
                 4: ("double daylily", "double daylilies"), 5: ("peony-flowered Chinese aster", "peony-flowered Chinese asters")}),
}

def face(pid):
    t = open(os.path.join(R, f"dev/art/face-common/{pid}.v5.FULL.txt")).read()
    i = t.index("Her face:"); j = t.index(" Hair:", t.index("Expression:", i))
    return t[i:j].strip()

def sub1(t, a, b, n=None):
    c = t.count(a)
    if c == 0 or (n is not None and c != n): sys.exit(f"pattern count {c} (want {n}): {a!r}")
    return t.replace(a, b)

def build(pid, k):
    p = P[pid]; fcx = FC[pid]["thu"]; sg, pl = p["fl"][k]
    hx = fcx["hair_by_tier"][f"t{k}"]; hair = p["hair"][k].replace("lilac", "\x01")   # protect hair colour words from the lilac->sec swap
    t = open(os.path.join(D, BASE[k])).read()
    # face
    i = t.index("Her face:"); j = t.index(" From the identity reference")
    t = t[:i] + face(pid) + t[j:]
    # flower species (embroidery) + hair flower (colour from F20 table, bloom only)
    if k == 1:
        t = sub1(t, "embroidered lilac flowers", f"embroidered {pl}")
        t = sub1(t, "a pure white lilac, bloom only, no leaves", f"a {hair} {sg}, bloom only, no leaves")
        t = sub1(t, "ONE fresh pure white lilac", f"ONE fresh {hair} {sg}")
    elif k == 2:
        t = sub1(t, "embroidered tiger lilies", f"embroidered {pl}")
        t = sub1(t, "soft peach-coral tiger lily", f"{hair} {sg}", 2)
    elif k == 3:
        t = sub1(t, "embroidered small China roses", f"embroidered small {pl}")
        t = sub1(t, "a small China-rose cluster", f"a small {sg} cluster")
        t = sub1(t, "China-rose sprigs", f"{sg} sprigs")
        t = sub1(t, "soft rose-pink semi-double China rose", f"{hair} {sg}")
    elif k == 4:
        t = sub1(t, "lotus flowers", pl)
        t = sub1(t, "lotus sprays", f"{sg} sprays")
        t = sub1(t, "decorated with ONE fresh lotus flower and", f"decorated with ONE fresh {hair} {sg} (the bloom ONLY, NO leaves) and")
        t = sub1(t, "exactly ONE fresh lotus flower in her hair (never two", f"exactly ONE fresh {hair} {sg} in her hair (the bloom ONLY, NO leaves; never two")
        t = sub1(t, "an embroidered silk sash with silk tassels",
                 "an embroidered silk sash tied at the centre front, its two LONG silk ties trailing gracefully (thướt tha), with silk tassels")
        t = sub1(t, "lotus lamp held upright in one hand.", "lotus lamp held upright in one hand at her side.")
    elif k == 5:
        t = sub1(t, "double hollyhock medallions", f"{sg} medallions")
        t = sub1(t, "double hollyhocks", pl)
        t = sub1(t, "deep rose-pink double hollyhock", f"{hair} {sg}", 2)
    # robe colours
    t = re.sub(r"\(light olive, NOT green\)", f"({p['main']}, {p['notw']})", t)
    t = t.replace("#9FB577", fcx["main_hex"]).replace("light olive", p["main"])
    t = re.sub(r"\blilac\b", p["sec"], t).replace("\x01", "lilac")
    # F20 flower colours, one sentence after the TWO-COLOUR RULE block start
    f20 = f"Embroidered {pl}: {p['emb']} (like {fcx['embroidery_hex']}). "
    t = sub1(t, "TWO-COLOUR RULE:", f20 + "TWO-COLOUR RULE:", 1)
    # caption: season + rank + collar + person code
    t = re.sub(r'write exactly this Vietnamese text WITH accents: "[^"]*"',
               f'write exactly this Vietnamese text WITH accents: "Mùa Thu · {RANK[k]} · cổ vuông{" + vân kiên" if k == 5 else ""} · {pid}"', t)
    # fit the gen tool limit (10 000): trim ONLY duplicate boilerplate (A38), listed in .keep
    for bp in ("Everyone beautiful at every age. ", "beautiful/handsome romantic-lead looks for everyone. ",
               "do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessories of the reference, dress her in the NEW outfit below. "):
        if len(t) > 10000 and bp in t: t = t.replace(bp, "", 1)
    for bad in ("pendant", "sachet", "chrysanthemum"):
        if bad in t.lower(): print("WARN", pid, k, bad)
    return t

if __name__ == "__main__":
    for pid in P:
        for k in range(1, 6):
            out = os.path.join(D, f"{pid}_t{k}_THU_L2026.txt")
            open(out, "w").write(build(pid, k))
            base = f"dev/art/thu_comoi/{BASE[k]}"
            r = subprocess.run([sys.executable, os.path.join(R, "dev/art/keep_check.py"), os.path.join(R, base), out],
                               capture_output=True, text=True)
            miss = [l.strip()[4:].strip() for l in r.stdout.splitlines() if l.strip().startswith("CUT:")]
            with open(out + ".keep", "w") as f:
                f.write(f"base: {base}\n")
                for m in miss:
                    f.write(f"allow: {m}   # person slot s62->{pid} (face/colour/flower F2+F20), t4 sash/lamp/no-leaf fixes; owner L2009/L2026\n")
            print(pid, k, len(open(out).read()), "allow", len(miss))
