#!/usr/bin/env python3
"""SEAL2c: consort «giận» seals by the 8 RANKS (owner A25, L825 pt/ptl redo, 20/11).
One young ('X trẻ', ~18) + one older ('X lớn tuổi', ~50) per rank; the older one wears EXACTLY the SAME hairpins as the young
one of her rank (more pins do NOT come with age); plain BROCADE robes, no silk/gauze (A25(3), undoes the v3 B12 wording).
Base = sg2_prompts.py pt/ptl v3 A text (A17: only the rank ornaments/colour, brocade and the same-pins sentence change).
Rank colour = B24; ornaments = store words (t8-prompt-B/build.py rank lines) + F5 (each rank >= the one below), F13 (ONE flower
t1-t6, size grows), S05 (no phoenix t1-t6), NO flower t7/t8; hair F11 (loose top-half-up only young t1-t3, else high bun).
Disc = the approved women «giận» disc (ref 1ldcfNpr4r, same as pt/ptl v3) until SEAL8's one-hex table exists.
usage: python3 rank_gian_prompts.py [t1y t1o ... t8o]   -> JSON {key: {A}} through seal_gate"""
import sys, json

R = {  # t: (VN, EN, robe colour words, hex, ornaments, flower)
 1: ("Đáp ứng", "lowest consort rank (Đáp ứng)", "soft cream-ivory", "#EAE3D0",
     "a few pretty silver hairpins with tiny pearl drops (little gold)", "exactly ONE small fresh white jasmine flower"),
 2: ("Thường tại", "second consort rank (Thường tại)", "soft jade green", "#7FB394",
     "several silver and pearl hairpins with short pearl drops (little gold)", "exactly ONE small-to-medium fresh white pear blossom"),
 3: ("Quý nhân", "third consort rank (Quý nhân)", "soft cornflower blue", "#7E9CCB",
     "several silver, pearl and jade hairpins with short pearl dangles", "exactly ONE medium fresh pale blue flower about the size of her palm"),
 4: ("Tần", "fourth consort rank (Tần)", "soft pink", "#E3A3B8",
     "gold and jade hairpins and small dangling gold bu yao tassel hairpins", "exactly ONE large fresh pink peony"),
 5: ("Phi", "fifth consort rank (Phi)", "soft purple", "#A88BCB",
     "a LARGER gold headdress with dangling gold tassels and jade pins", "exactly ONE big fresh purple flower"),
 6: ("Quý phi", "noble consort rank (Quý phi)", "warm orange apricot", "#E3A25B",
     "a BIG ornate gold headdress with pearls, small gold blossoms and many gold tassels", "exactly ONE very large fresh orange peony, the grandest hair flower"),
 7: ("Hoàng quý phi", "imperial noble consort rank (Hoàng quý phi), just below the empress", "coral red", "#D46A64",
     "a Hoàng quý phi phoenix crown like an empress's crown but a little smaller and simpler: a gold phoenix with wide spread wings rising from a gold crown band, with swags of pearl strings and red jewels (never larger or grander than the empress's crown)", None),  # owner ~01:13Z SWITCH: the old Hoàng hậu crown, a little smaller/simpler (A28)
 8: ("Hoàng hậu", "highest rank, the EMPRESS (Hoàng hậu), first lady of the palace", "royal yellow", "#EFBD69",
     "a LARGE ornate gold phoenix crown, the grandest crown in the palace: a wide ornate gold crown band with one gold phoenix with spread wings, set with rubies, sapphires, pearls and jade, with many gold tassels and pearl-and-gold dangles", None),  # owner ~01:13Z SWITCH: the crown of Hoàng quý phi v2 (3zKu15AREY)
}

def who(t, old):
    vn, en, col, hx, orn, fl = R[t]
    deco = orn + (f" and {fl} (only one flower)" if fl else "; NO flowers in the hair, only gold, pearls and jewels")
    nophx = " No phoenix ornament of any kind." if t <= 6 else ""
    if old:
        person = (f"a MIDDLE-AGED IMPERIAL CONSORT of the {en}: a stately woman about fifty, fuller face with a few fine lines at the eyes and mouth, "
                  "black hair with a few grey strands at the temples swept up into a full high bun (her own hair, no hat, no headdress board)")
        same = f", wearing EXACTLY THE SAME hair ornaments as a young consort of her rank, no more and no fewer (age adds no hairpins)"
    else:
        hair = ("glossy black hair with the top half gathered up into a small bun and the rest hanging loose down her back (her own hair, no hat, no headdress board)"
                if t <= 3 else "glossy black hair swept up into an elegant high bun (her own hair, no hat, no headdress board)")
        person = f"a YOUNG IMPERIAL CONSORT of the {en}: a pretty young woman about eighteen, soft round youthful face, {hair}"
        same = ""
    return (f"{person} decorated with {deco}{same}, small pearl earrings, a {col} ({hx}) robe of plain thick brocade with a gold-embroidered collar"
            f" (brocade only, no thin silk, no gauze, nothing sheer).{nophx}")

def prompt(t, old):
    return (f"Same soft hand-painted storybook style, same round gold-rimmed red medallion and same chibi proportions as the reference, but the person is now {who(t, old)} "
            "Her face is ANGRY like the reference: furrowed brows, glaring eyes, tight frowning mouth, red flush on the cheeks, a small red anger mark by her temple. "
            "Both eyes looking together straight ahead. Everything kept INSIDE the round medallion, the medallion drawn a bit smaller and centred so there is empty space around it. "
            "Whole picture on a flat pure chroma green (#00FF00) background outside the medallion, nothing else, no text.")

KEYS = [f"t{t}{a}" for t in range(1, 9) for a in "yo"]
LABEL = {f"t{t}{a}": f"{R[t][0]} {'trẻ' if a == 'y' else 'lớn tuổi'}" for t in range(1, 9) for a in "yo"}

if __name__ == "__main__":
    import os as _os; sys.path.insert(0, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "..")); import seal_gate as _SG  # A24
    ks = sys.argv[1:] or KEYS
    print(json.dumps(_SG.guard({k: {"A": prompt(int(k[1]), k[2] == "o")} for k in ks}, "rank-gian"), ensure_ascii=False, indent=1))
