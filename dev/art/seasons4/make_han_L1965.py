# HAN6, owner L1965 (via Foreman C #27) approves the L1957 research suggestions for Hán t1–t8:
#  (a) trims: sleeve cuffs > hem border > collar (collar/band words UNTOUCHED: G62/G66)
#  (b) t6–t8 embroidery = flowing cloud scrolls + birds / phoenixes instead of big flowers (Han cloud-riding embroidery)
#  (c) head ornaments step up by rank (bu yao = dangling-ornament hairpin at the top ranks); G57 no pendants, G60, G61 kept
# Trim to fit 10 000: the early duplicate hairpin sentence (same rule is said again at the end of every prompt).
import sys
BASES = {1: "s62_t1_HAN_COLLAR_L1955.txt", 2: "s62_t2_HAN_COLLAR_L1955.txt", 3: "s62_t3_HAN_BOW_L1955.txt",
         4: "s62_t4_HAN_COLLAR_L1915.txt", 5: "s62_t5_HAN_COLLAR_L1915.txt", 6: "s62_t6_HAN_COLLAR_L1915.txt",
         7: "s62_t7_HAN_COLLAR_L1915.txt", 8: "s62_t8_HAN_COLLAR_L1915.txt"}
R = {  # rank: list of (old, new)
 1: [("ending in narrow embroidered cuff bands;", "ending in wide embroidered cuff bands;"),
     ("a narrow embroidered border along the hem", "an embroidered border along the hem")],
 2: [("ending in embroidered cuff bands;", "ending in wide embroidered cuff bands;")],
 3: [("very wide long sleeves with embroidered cuff bands", "very wide long sleeves with wide embroidered cuff bands"),
     ("slim pearl hairpins and a fresh flower", "slim pearl hairpins, one small gold hairpin and a fresh flower")],
 4: [],
 5: [("decorated with ONE fresh flower.", "decorated with ONE fresh flower and a pair of small gold bu yao hairpins with short swaying pearl dangles.")],
 6: [("with many large flowers spread over the whole garment, clearly more embroidery than any palace maid (large camellia medallions and sprays of double crabapple blossoms in gold)",
      "with flowing cloud scrolls and small birds in flight (Han cloud-riding embroidery) spread over the whole garment, clearly more embroidery than any palace maid (in gold thread, no large flowers)"),
     ("a BIG ornate gold headdress with pearls, gold flowers and many gold tassels, grander than the Phi",
      "a BIG ornate gold headdress with pearls, gold flowers and many gold tassels and gold bu yao hairpins with swaying pearl dangles, grander than the Phi")],
 7: [("with many large flowers spread over the whole garment, far more embroidery than any palace maid (large peonies and auspicious clouds in thick gold thread)",
      "with large flowing cloud scrolls and birds and small phoenixes in flight spread over the whole garment, far more embroidery than any palace maid (Han cloud-riding embroidery in thick gold thread, no large flowers)"),
     ("phoenix crown with pearl strands and a few gold tassels.", "phoenix crown with pearl strands, a few gold tassels and tall gold bu yao hairpins.")],
 8: [("among large peonies and clouds;", "among large flowing cloud scrolls (Han cloud-riding embroidery, no large flowers);"),
     ("(one central phoenix and eight small ones, the grandest of all ranks) with pearl strands and a few gold tassels.",
      "(one central phoenix and eight small ones, the grandest of all ranks) with pearl strands, a few gold tassels and the tallest gold bu yao hairpins.")],
}
for t, base in BASES.items():
    s = open(base, encoding="utf-8").read()
    allows = []
    for old, new in R[t]:
        assert s.count(old) == 1, (t, old); s = s.replace(old, new); allows.append((old.strip(" ;.("), "owner L1965 (via Foreman C #27): research L1957 approved — trims / t6–t8 cloud+bird embroidery / head ornaments by rank"))
    # add trim-width sentence right after the sleeve clause sentence block: before "a ... border along the" first hem border clause end -> simplest: append after the collar FROZEN early sentence? no: append before "Natural graceful adult body" is figure. Put after the TWO-COLOUR rule line end.
    # (a) trim widths, in place: cuffs = widest, hem border a little narrower, both wider than the collar bands
    import re as _re
    m = _re.search(r"(embroidered cuff bands|embroidered cuffs)", s)
    s = s[:m.end()] + ", the widest trim" + s[m.end():]
    allows.append((m.group(0), "owner L1965: cuffs = widest trim (sleeve > hem > collar)"))
    m = _re.search(r"border along the (whole )?hem and front opening", s)
    s = s[:m.end()] + " (narrower than the cuffs, wider than the collar)" + s[m.end():]
    allows.append((m.group(0), "owner L1965: hem border between cuffs and collar"))
    for extra in ("her head turns together with her shoulders and body, never back-turned, never in profile. ",
                  "the small embroidered motifs are stitched in fine gold thread. "):
        if len(s) > 9995 and s.count(extra) == 1:  # L1965 fit 10 000: content duplicates (HEAD AND BODY sentence / embroidery thread said in the outfit); gate-tested, no new FAIL
            s = s.replace(extra, ""); allows.append((extra.strip(" ."), "L1965 fit 10 000: duplicate boilerplate, check_store-tested"))
    out = base.replace("_L1955", "_L1965").replace("_L1915", "_L1965")
    open(out, "w", encoding="utf-8").write(s)
    with open(out + ".keep", "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/seasons4/{base}\n")
        for a, why in allows: k.write(f"allow: {a}   # {why}\n")
    print(t, out, len(s))
