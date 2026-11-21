#!/usr/bin/env python3
"""MAIDFIX4 owner L1952 (via #27): the front bow ALWAYS exactly at the body's centre front, in EVERY maid rank's prod file (all persons).
In place on the current L1919 + L1924 files (the L1952 nhị files already carry the long form after the bow phrase). Pure addition.
Anchor: before "CLEAN COLOUR EDGES:" or, where absent (ma ma), after the "Hands and item stay clear…" sentence. Short form if the long one passes 10 000."""
import glob, os
LONG = "BOW POSITION: the front bow sits EXACTLY at the centre front of her body, on the vertical centre line below the collar opening, never shifted to the left or right, never at the side or hip. "
SHORT = "BOW: exactly at the centre front of her body, never shifted to either side. "
DONE = ("BOW POSITION:", "tied EXACTLY at the centre front of her waist", "BOW: exactly at the centre front", "the bow sits EXACTLY at the centre front")
for f in sorted(glob.glob("dev/art/maid7/prod/m*_L1919.txt") + glob.glob("dev/art/maid7/prod/m*_L1924.txt")):
    if "ha_DUONG" in f: continue
    s = open(f, encoding="utf-8").read()
    if any(d in s for d in DONE): print("skip", f); continue
    for sent in (LONG, SHORT):
        if "CLEAN COLOUR EDGES:" in s: t = s.replace("CLEAN COLOUR EDGES:", sent + "CLEAN COLOUR EDGES:", 1)
        else:
            a = [x for x in ("nothing covers the sash, the bow or the centre front.", "Hands and item stay clear of the front waist and bow.") if x in s][0]
            t = s.replace(a, a + " " + sent.strip(), 1)
        if len(t) <= 10000: break
    NB = "a wide matte silk crepe sash tied in a bow at the waist, a pretty, graceful bow tied at the FRONT of the sash"
    if len(t) > 10000 and NB in s:   # nhất: fold the centre words into her own bow phrase instead of a new sentence (+ allow line)
        t = s.replace(NB, "a wide matte silk crepe sash, a pretty, graceful bow tied EXACTLY at the centre front of her waist, never at a side", 1)
        import sys; sys.path.insert(0, "dev/art"); import keep_check as kc
        assert len(t) <= 10000, (f, len(t))
        open(f, "w", encoding="utf-8").write(t); kb, ka = kc.read_sidecar(f); d = kc.check(kb, f, ka)[0]
        with open(f + ".keep", "a", encoding="utf-8") as k:
            for x in d: k.write(f"allow: {x.split('#')[0].strip()}   # owner L1952: bow exactly at centre front (folded into her bow phrase to stay under 10 000)\n")
        print("FOLD", len(t), os.path.basename(f)); continue
    if len(t) > 10000:   # A38 boilerplate trim (same as make11_poses.py), + allow line in the .keep
        C = "Hands and item stay clear of the front waist: nothing covers the sash, the bow or the centre front."
        t = t.replace(C, "Hands and item stay clear of the front waist and bow.", 1)
        import sys; sys.path.insert(0, "dev/art"); import keep_check as kc
        open(f, "w", encoding="utf-8").write(t); kb, ka = kc.read_sidecar(f); d = kc.check(kb, f, ka)[0]
        with open(f + ".keep", "a", encoding="utf-8") as k:
            for x in d: k.write(f"allow: {x.split('#')[0].strip()}   # A38 boilerplate trim to fit the owner L1952 bow-centre sentence under 10 000\n")
    assert len(t) <= 10000, (f, len(t))
    open(f, "w", encoding="utf-8").write(t); print("long" if sent == LONG else "SHORT", len(t), os.path.basename(f))
