# HAN6, owner L1971 (via Foreman C #27), base = Hán L1965 files. Words only.
# 1 t6 ball tassels back (undo "NO tassels"); hand-at-side fix kept.
# 2 bows = LONG trailing ties, thướt tha (t3 bow; t2 centre sash tie).
# 3 density (L1968): t1–t3 tone-on-tone WOVEN pattern, embroidery only on the bands; t4–t5 woven all over + medium embroidered motifs + brocade trims; t6–t8 dense gold embroidery.
# 4 jewellery from t4 up (t4 a little, t6 fairly much, more above), wording modelled on HQP_LUX (store-all/build_all.py / S14).
# 5 each rank keeps its OWN flowers as the main motif; clouds/birds are additions; big flowers allowed from t4 up.
# Collar/band words untouched (G62/G66). No pendants (G57). Bow centred (G60). Front waist free (G61).
import glob
BOW = "tied in a bow at the CENTRE front of the waist with two LONG silk ties trailing gracefully down the skirt (thướt tha)"
R = {
 1: [("the robe body densely embroidered ALL OVER (not only the borders) with many SMALL lilac sprays spread over the whole garment, clearly more embroidery than any palace maid (light, sparse sprays in ivory white and fine gold thread);",
      "the robe cloth has small lilac sprays WOVEN INTO the silk all over as a faint tone-on-tone pattern (flat, same colour, not embroidered); embroidery ONLY on the cuff, hem and collar bands;")],
 2: [("the robe body densely embroidered ALL OVER (not only the borders) with many small tiger lilies spread over the whole garment, clearly more embroidery than any palace maid (a little larger than at the lowest rank, in ivory white and fine gold thread);",
      "the robe cloth has small tiger lilies WOVEN INTO the silk all over as a faint tone-on-tone pattern (flat, same colour, not embroidered); embroidery ONLY on the cuff, hem and collar bands;"),
     ("an ivory white sash tied at the centre front of the waist", "an ivory white sash " + BOW)],
 3: [("the robe body densely embroidered ALL OVER (not only the borders) with many small-to-medium semi-double China roses spread over the whole garment, clearly more embroidery than any palace maid (in ivory white and fine gold thread);",
      "the robe cloth has small semi-double China roses WOVEN INTO the silk all over as a faint tone-on-tone pattern (flat, same colour, not embroidered); embroidery ONLY on the cuff, hem and collar bands;"),
     ("very wide long sleeves with wide embroidered cuff bands, the widest trim and a few small flowers on the sleeves;", "very wide long sleeves with wide embroidered cuff bands, the widest trim;"),
     ("tied in a neat bow at the CENTRE front of the waist, the two bow loops and ends lying flat", BOW)],
 4: [("the robe body densely embroidered ALL OVER (not only the borders) with many medium-size spring flowers spread over EVERY part of the garment (robe body, sleeves, inner robe and skirt, like the Quý nhân), clearly more embroidery than any palace maid (peach blossoms, magnolias and small swallows in flight, in gold and bright blush pink);",
      "the robe cloth has a tone-on-tone pattern WOVEN INTO the silk all over, with medium-size embroidered spring flowers spread evenly over it (peach blossoms, magnolias and small swallows in flight, in gold and bright blush pink); brocade bands at the cuffs and hem;"),
     ("JEWELLERY: every jewel SMALL and delicate, never chunky or showy;", "JEWELLERY: every jewel SMALL and delicate, never chunky or showy; TẦN LUXURY: a little richer than the lower ranks: a few pearls and small jade beads in her hair and slim gold bangles;")],
 5: [("a deep embroidered border along the whole hem and front opening", "the robe cloth has a tone-on-tone pattern WOVEN INTO the silk all over, with medium-size embroidered magnolias and peach blossoms spread evenly over it; a deep brocade border along the whole hem and front opening"),
     ("decorated with ONE fresh flower and a pair of small gold bu yao hairpins with short swaying pearl dangles.", "decorated with ONE fresh flower and a pair of small gold bu yao hairpins with short swaying pearl dangles. PHI LUXURY: richer than the Tần: more pearls and jade in her hair and slim gold-and-jade bangles.")],
 6: [("a round stuffed ball, NO tassels, no handle, no stick,", "a round stuffed ball, no handle, no stick,"),
     ("with flowing cloud scrolls and small birds in flight (Han cloud-riding embroidery) spread over the whole garment, clearly more embroidery than any palace maid (in gold thread, no large flowers)",
      "with many large flowers spread over the whole garment, clearly more embroidery than any palace maid (large camellia medallions and sprays of double crabapple blossoms in gold, clouds and small birds between)"),
     ("JEWELLERY: every jewel SMALL and delicate, never chunky or showy;", "JEWELLERY: every jewel SMALL and delicate, never chunky or showy; QUÝ PHI LUXURY: many pearls and jade on the headdress, pearl trims on the cuffs and hem, gold-and-jade bangles;")],
 7: [("with large flowing cloud scrolls and birds and small phoenixes in flight spread over the whole garment, far more embroidery than any palace maid (in thick gold thread, no large flowers)",
      "with many large flowers spread over the whole garment, far more embroidery than any palace maid (large peonies in thick gold thread, clouds and small phoenixes between)"),
     ("HOÀNG QUÝ PHI LUXURY: more jade, pearls, gold and a few smooth red gems on the phoenix crown,", "HOÀNG QUÝ PHI LUXURY: more jade, pearls, gold and a few smooth red gems on the phoenix crown, pearl trims on the cuffs and hem, gold-and-jade bangles,")],
 8: [("among large flowing cloud scrolls (no large flowers);", "among large peonies and flowing cloud scrolls;"),
     ("EMPRESS LUXURY: more jade, pearls, gold and a few smooth red gems on the phoenix crown.", "EMPRESS LUXURY: more jade, pearls, gold and a few smooth red gems on the phoenix crown, pearl and jade trims on the cuffs and hem, gold-and-jade bangles.")],
}
for t in range(1, 9):
    base = glob.glob(f"s62_t{t}_HAN_*_L1965.txt")[0]
    s = open(base, encoding="utf-8").read(); allows = []
    for old, new in R[t]:
        assert s.count(old) == 1, (t, old[:60]); s = s.replace(old, new)
        allows.append((old.strip(" ;.,")[:120], "owner L1971 (via Foreman C #27): density / flowers kept / jewellery from t4 / long bow ties / t6 tassels back"))
    if t >= 6:  # fit 10 000: duplicate of "The satin has real weight ... hang and fold naturally under their own weight"; gate-tested
        d = "it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); "
        assert s.count(d) == 1; s = s.replace(d, ""); allows.append((d.strip(" ;"), "L1971 fit 10 000: duplicate fabric-weight boilerplate, check_store-tested"))
    out = base.replace("_L1965", "_L1971")
    open(out, "w", encoding="utf-8").write(s)
    with open(out + ".keep", "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/seasons4/{base}\n")
        for a, why in allows: k.write(f"allow: {a}   # {why}\n")
    print(t, out, len(s))
