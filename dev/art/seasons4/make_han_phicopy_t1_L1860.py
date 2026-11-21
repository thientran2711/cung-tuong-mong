# Owner L1860 (via Foreman C #25, A48): copy the Hán Phi t5 prompt (s62_t5_HAN_LADDER4_L1773.txt, drew CqnIKlAEEy) down to
# Đáp ứng t1. Remove Phi-only parts; put in Đáp ứng's own robe/vạt, sparse flowers, colours, hair/item/pose (= LADDER7 t1 sentences,
# hair/pose/angle byte-identical to LADDER4). Collar = Phi's own words (colours swapped). 3 bands main/secondary/white (L1859). G57.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
t=open(D+'s62_t5_HAN_LADDER4_L1773.txt').read()
P,S,PK,IV="light clear warm plum","bright blush pink","peach-blossom pink","ivory white"
R=[
("Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks):","Outfit (rank-1 consort (Đáp ứng), the lowest consort rank, elegant, never poor):"),
(f"in {P} reaching the floor over an inner robe in {S}, NOT",f"in {PK} reaching the floor over an inner robe in {IV}, NOT"),
# vạt áo = Đáp ứng's own
("the outer panel crosses in one straight diagonal and ends in ONE neat POINTED corner tail at the hip side, its edge bordered in gold (collar unchanged;",
 "the front panel crosses the body in ONE SHORT straight diagonal and ends at the HIP, its straight edge trimmed with a narrow band (collar unchanged;"),
# collar: Phi's words, her colours
("the pink inner collar showing as a wide layered edge inside the plum outer collar","the ivory inner collar showing as a wide layered edge inside the pink outer collar"),
# sleeves / flowers / border = Đáp ứng's (sparse)
("with deep embroidered cuffs and a little more embroidery on the sleeves than the Tần;","the sleeve body plain, ending in narrow embroidered cuff bands;"),
("with many LARGE spring flowers spread over the whole garment, clearly more embroidery than any palace maid (large magnolia medallions, peach blossoms and cloud-and-swallow scrolls in gold);",
 "with many SMALL lilac sprays spread over the whole garment, clearly more embroidery than any palace maid (light, sparse sprays in ivory white and fine gold thread);"),
("a deep embroidered border along the whole hem and front opening;","a narrow embroidered border along the hem and front opening;"),
# 3 bands: Phi's words, main / secondary / white (L1859)
(f"(outer {P} embroidered in gold, inner two {S})",f"(outer {PK} embroidered in gold, middle {IV}, innermost pure white)"),
# sash = Đáp ứng's, G57
("a broad embroidered waist sash tied in a flat knot with the two silk ends tied flat;",f"a soft narrow {IV} silk sash whose two ends hang down the front; no belt plaque, no pendants;"),
# Phi-only: shoulder yoke (Đáp ứng has none), headdress, colour sentences
(" SHOULDER FRINGE: a flat pearl-and-jade bead yoke over both shoulders with a longer, fuller pearl fringe of bigger pearls, lying outside the collar, never touching or hiding the collar;",""),
("a LARGER gold headdress with dangling gold tassels and jade pins;","pretty silver hairpins and a fresh flower (a lilac spray);"),
(f"her signature colour family {P} and {S} stays the MAIN robe colour ({P}); the robe itself is clearly {P} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe.",
 f"her signature colour family {PK} and {IV} stays the MAIN robe colour ({PK}); the robe itself is clearly {PK} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe. JEWELLERY: every jewel SMALL and delicate, never chunky or showy; NO red anywhere (no red gems, beads or tassels), no faceted gems, no necklace."),
(f"{P} silk like #DF9ED9 is the main colour of the robe, sleeves and any cape, with {S} in the inner robe and linings;",
 f"{PK} silk like #EB8186 is the main colour of the robe, sleeves and any cape, with {IV} in the inner robe and linings;"),
# hair / sleeve length / flower size / pose = Đáp ứng's (LADDER4 t1 byte-identical)
("her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated with ONE fresh flower and several gold hairpins (trâm) with dangles, rich like her rank.",
 "her own hair colour, LOOSE and flowing (at most the top half gathered up, most of her hair hanging down her back), with pretty silver hairpins and a fresh flower, little gold."),
("ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back.",
 "her hair stays LOOSE and flowing like her young-lady picture: at most the top half gathered up, most of her hair hanging loose down her back."),
("very long, wide, flowing sleeves that hang down to her ANKLES.","very long, wide, flowing sleeves that fall well past her hands and hang down to her KNEES."),
("exactly ONE fresh flower in her hair (never two, never a pair, no cluster), BIG, a full bloom clearly bigger than at the Tần rank.",
 "exactly ONE fresh flower in her hair (never two, never a pair, no cluster), SMALL but clearly visible at game size."),
("FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn;","FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, her weight resting on her RIGHT foot;"),
("her head tilted very slightly to one side, a soft graceful line from her neck to her shoulder.","her elbows held softly away from her body, her arms forming soft rounded lines."),
(f"the MAIN colour {P} and the SECONDARY colour {S},",f"the MAIN colour {PK} and the SECONDARY colour {IV},"),
(f"BOTH her robe colour {P} and her secondary colour {S}.",f"BOTH her robe colour {PK} and her secondary colour {IV}."),
("walking while holding a folded letter on gold-flecked paper tied with a silk cord in both hands, sleeves trailing, poised, the robe hem stirring slightly.",
 "walking forward mid-step, long sleeves flowing behind her, a thread-bound book held at her side, the skirt hem swinging softly."),
("Thiết kế thời Hán · Phi ·","Thiết kế thời Hán · Đáp ứng ·"),
]
for a,b in R: t=rep(t,a,b)
open(D+'s62_t1_HAN_PHICOPY_L1860.txt','w').write(t)
