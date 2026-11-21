#!/usr/bin/env python3
"""M2213-03..08 + M2213-T7LOW (owner L2212 + L2213 via ROOT-B5) — THUROOT8, words only, 0 cr.
t3 = LOCKED M2203-03 + L2212 (pearl rim inside the vân kiên sentence, clasp 'of gold with one tiny pearl') + COMMON_LIST fixes.
t4..t8 = M2211-04..08 (L2207/L2208/L2210 ladder + L2212 net-only-in-vân-kiên already applied) + COMMON_LIST 3a/3b fixes.
T7LOW = M2213-07 with neck words -> only 'a low neckline' (same cuts as M2209-01, L2209).
ANGLE / Pose / GRACE never touched (A54): asserted byte-identical."""
import pathlib, re
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
TAG12 = "owner L2212 via ROOT-B5"; TAG13 = "owner L2213 COMMON_LIST fix via ROOT-B5"
# ---- common 3a duplicate cuts (t3..t8, applied where present) ----
C = [
 (" Every hairpin points upward or backward, never sticking out sideways.", ""),                       # 3a hairpin
 ("Bare clean forehead, no forehead mark, no moles.", "No moles."),                                      # 3a forehead
 ("Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe",
  "Luminous smooth porcelain skin, floor-length robe"),                                                   # 3a forehead + face
 ("The item is in a contrasting colour, not the robe colour, and the hand really grips it; the whole face fully visible with the head up toward the viewer, eyes open, lips closed, never looking down, nothing covering the face.",
  "Her head up toward the viewer, never looking down, nothing covering the face."),                     # 3a held item + face
 (", no cup, nothing covering the face.", "."),                                                         # 3a held item (Luminous)
 ("The fabric is exactly the cloth written in her outfit, real cloth with natural weight and soft natural folds, never stiff or board-like; no sheer floating scarf",
  "No sheer floating scarf"),                                                                             # 3a fabric
 (" Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like.", ""),
]
C_OPT = [(" The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like.", ""),
         (" The silk is light and supple: the wide sleeves and robe fold softly and naturally, with natural creases, never stiff, flat or board-like.", "")]
CA = ["Every hairpin points upward or backward", "never sticking out sideways", "Bare clean forehead", "no forehead mark",
      "bare clean forehead with no forehead mark and no flower mark", "The item is in a contrasting colour", "not the robe colour",
      "and the hand really grips it", "the whole face fully visible with the head up toward the viewer", "no cup",
      "The fabric is exactly the cloth written in her outfit", "real cloth with natural weight and soft natural folds", "never stiff or board-like",
      "Light, soft, thin flowing silk", "the long sleeves, skirt and sash are supple and airy", "drifting softly as in a gentle breeze",
      "with soft natural folds", "never stiff, flat or board-like", "The silk has real weight", "the wide sleeves and robe hang and fold naturally under their own weight",
      "with natural creases", "The silk is light and supple", "the wide sleeves and robe fold softly and naturally", "eyes open", "lips closed"]
SLV = ("very long, wide, flowing sleeves that hang down to her ANKLES. ONE", "very long, wide, flowing sleeves that hang down to her ANKLES, never shorter, never touching the floor. ONE")  # 3b sleeve wording t4-t6 = t7/t8
HB = (" HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body.", "")  # 3a t7/t8 (= ANGLE)
HBA = ["HEAD AND BODY", "her head turns together with her shoulders and body in the same direction with natural anatomy", "never a frontal head on a turned body"]
YEL = (" The royal yellow in the robe is like #EFBD69, warm honey-gold.", "")
E = {
 3: [("soft and unlined, it DRAPES", "soft and unlined, edged along its scalloped rim with one row of small pearls, it DRAPES"),           # L2212
     ("(frog button) of small plain gold,", "(frog button) of gold with one tiny pearl,"),                                                    # L2212
     ("an ankle-length light olive silk court robe", "a light olive silk court robe"),                                                        # 3b length
     ("each ending in a small silk tassel, from which hangs down the centre front", "each ending in a small silk tassel; from the girdle hangs down the centre front"),  # 3b apron
     ("Hair: her own hair colour, LOOSE and flowing (at most the top half gathered up, most of her hair hanging down her back), with", "Hair: her own hair colour, with")],  # 3a hair
 4: [(", about as long as the Phi's (shoulder-piece", " (shoulder-piece"),                                                                   # 3b Tần = Phi
     ("Hair: her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated with ONE fresh soft pale lilac double kerria pompon (the bloom ONLY, NO leaves) and several", "Hair: her own hair colour, decorated with several"),  # 3a hair + flower
     SLV],
 5: [("Hair: her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated with ONE fresh deep rose-pink double hollyhock (bloom only, no leaves) and several", "Hair: her own hair colour, decorated with several"),
     ("SLIM, a sheer silk shawl;", "SLIM;"), SLV],                                                                                           # 3a shawl = PHI BẠCH
 6: [("Hair: her own hair colour, ALL her hair swept UP into a high bun / chignon, decorated", "Hair: her own hair colour, decorated"),
     ("(clearly more than the Phi), the motifs never over the borders or bands, a small sprig", "(clearly more than the Phi), a small sprig"),
     ("her own colour stays clearly the main robe colour, about HALF as much yellow as the Hoàng quý phi's, light olive clearly dominant, lilac secondary;",
      "her own colour stays clearly the main robe colour, light olive clearly dominant, lilac secondary;"),
     ("yellow in a moderate amount, about HALF as much as the Hoàng quý phi's (yellow silk CLOTH, not thread: a wide yellow panel at the skirt front from the waist to the hem, clearly visible yellow borders at the sleeve ends and the hem, yellow sleeve linings clearly showing inside the cuffs, a slim yellow sash with its two long yellow ties, only a narrow yellow edge on the neckline band), in rich warm royal golden yellow (#EFBD69), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon; light olive clearly dominant, lilac secondary; gold only",
      "yellow in a moderate amount (yellow silk CLOTH, not thread), in rich warm royal golden yellow (#EFBD69), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon; gold only"),
     SLV],
 7: [("SLIM, floor-length robe of light silk", "SLIM robe of light silk"), YEL, HB,
     ("the SECONDARY colour royal golden yellow (honey-gold like #EFBD69),", "the SECONDARY colour royal golden yellow,"),
     ("; the royal yellow exactly #EFBD69, not pale cream", "; the royal yellow not pale cream")],
 8: [("SLIM, never covered by the sleeves, floor-length robe, slim tall silhouette", "SLIM robe, slim tall silhouette"), YEL, HB,               # 3a floor + 3b 'never covered'
     ("Nothing around the neck: no stand collar, no necklace.", "No necklace."),
     ("A TENDER, kind, caring look, the head inclined slightly to one side, the soft", "A TENDER, kind, caring look, the soft"),             # 3b vs GRACE chin lifted
     ("the royal golden yellow (honey-gold like #EFBD69), the MAIN colour light olive and the SECONDARY colour lilac, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings),",
      "the royal golden yellow (honey-gold like #EFBD69) as the MAIN colour, light olive second and lilac in the inner robe and linings,"),                           # 3b main colour
     ("her colour is the second colour (inner robe, wide borders and a few panels)", "her colour is the second colour (wide borders and a few panels)")],  # 3b inner robe
}
A = {3: ["of small plain gold", "an ankle-length light olive silk court robe", "from which hangs down the centre front an embroidered lilac APRON PANEL",
         "LOOSE and flowing", "at most the top half gathered up", "most of her hair hanging down her back"],
     4: ["about as long as the Phi's", "ALL her hair swept UP into a high bun / chignon", "decorated with ONE fresh soft pale lilac double kerria pompon", "the bloom ONLY", "and several gold hairpins"],
     5: ["ALL her hair swept UP into a high bun / chignon", "decorated with ONE fresh deep rose-pink double hollyhock", "bloom only", "SLIM, a sheer silk shawl", "a sheer silk shawl", "and several gold hairpins"],
     6: ["ALL her hair swept UP into a high bun / chignon", "the motifs never over the borders or bands", "about HALF as much yellow as the Hoàng quý phi's",
         "about HALF as much as the Hoàng quý phi's", "yellow silk CLOTH, not thread", "a wide yellow panel at the skirt front from the waist to the hem",
         "clearly visible yellow borders at the sleeve ends and the hem", "yellow sleeve linings clearly showing inside the cuffs",
         "a slim yellow sash with its two long yellow ties", "only a narrow yellow edge on the neckline band", "light olive clearly dominant",
         "yellow in a moderate amount", "lilac secondary"],
     7: ["SLIM, floor-length robe of light silk that flows and sways softly", "The royal yellow in the robe is like #EFBD69", "warm honey-gold",
         "honey-gold like #EFBD69", "the royal yellow exactly #EFBD69"] + HBA,
     8: ["SLIM, never covered by the sleeves", "floor-length robe", "The royal yellow in the robe is like #EFBD69", "warm honey-gold",
         "Nothing around the neck", "no stand collar, no necklace", "the head inclined slightly to one side",
         "the MAIN colour light olive and the SECONDARY colour lilac", "the secondary clearly visible in large areas", "inner robe or skirt, wide borders, sash, cuffs, linings",
         "inner robe, wide borders and a few panels"] + HBA}

# ---- L2214 (one COMMON fabric block, same words + same place t1..t8) + L2215 (sleeve ladder) ----
FAB_OLD = [
 "The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.",
 "The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like.",
 "The silk is light and supple: the wide sleeves and robe fold softly and naturally, with natural creases, never stiff, flat or board-like.",
 "The fabric is exactly the cloth written in her outfit, real cloth with natural weight and soft natural folds, never stiff or board-like; no sheer floating scarf, stole, shawl or veil unless her outfit names one.",
 "No sheer floating scarf, stole, shawl or veil unless her outfit names one.",
 "Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like."]
FAB = ("The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha). "
       "The silk is light and supple: the wide sleeves and robe fold softly and naturally, with natural creases, never stiff, flat or board-like. "
       "Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze. "
       "No sheer floating scarf, stole, shawl or veil unless her outfit names one.")
FAB_A = ["the small embroidered motifs are stitched in fine gold thread", "The silk has real weight", "the wide sleeves and robe hang and fold naturally under their own weight",
         "The fabric is exactly the cloth written in her outfit", "real cloth with natural weight and soft natural folds", "never stiff or board-like", "with soft natural folds"]
SLV2 = {4: [("very long, wide, flowing sleeves that hang down to her ANKLES, never shorter, never touching the floor.", "very long, wide, flowing sleeves that hang down to MID-CALF, halfway between the knees and the ankles."),
            ("long trailing wide sleeves,", "long wide sleeves,")],
        7: [("very long, wide, flowing sleeves that hang down to her ANKLES: the sleeve ends really reach the level of her ankles, clearly lower than her knees and shins, never shorter, and never touching the floor. Even while her hands are raised to hold her item, the long wide sleeves flow softly and lightly down to her ankles, lifting a little with her movement; the sleeve hem is NEVER at knee or shin height.",
             "very long, wide, flowing sleeves that hang down to her ANKLES, never touching the floor; even while her hands are raised to hold her item, they flow softly down to her ankles, lifting a little with her movement, the sleeve hem NEVER at knee or shin height.")]}
SLV2[5] = SLV2[4]; SLV2[6] = SLV2[4][:1]; SLV2[8] = SLV2[7]
SLV2_A = {4: ["hang down to her ANKLES", "never shorter", "never touching the floor", "long trailing wide sleeves"],
          7: ["the sleeve ends really reach the level of her ankles", "clearly lower than her knees and shins", "never shorter, and never touching the floor",
              "Even while her hands are raised to hold her item", "the long wide sleeves flow softly and lightly down to her ankles", "the sleeve hem is NEVER at knee or shin height"]}
SLV2_A[5] = SLV2_A[4]; SLV2_A[6] = SLV2_A[4][:3]; SLV2_A[8] = SLV2_A[7]
def stage2(n, s):
    for o in FAB_OLD:
        s = s.replace(" " + o, "") if (" " + o) in s else s.replace(o, "")
    assert not any(o in s for o in FAB_OLD[:4] + FAB_OLD[5:]), n
    anchor = "never a tiny head. "; assert s.count(anchor) == 1, n
    s = s.replace(anchor, anchor + FAB + " ", 1); assert s.count(FAB) == 1
    for o, w in SLV2.get(n, []):
        assert s.count(o) == 1, (n, o[:70]); s = s.replace(o, w, 1)
    return s
def blocks(s):
    out = []
    for k in ("ANGLE:", "Pose:", "GRACE"):
        i = s.index(k); out.append(s[i:s.index(". ", i) + 1])
    return out
def build(n, base, code, edits, allows, tag, common=True):
    s = (P / base).read_text(); keep = blocks(s)
    ed = list(edits)
    if common:
        ed = C + [x for x in C_OPT if x[0] in s] + ed
    for o, w in ed:
        assert s.count(o) == 1, (code, o[:80], s.count(o)); s = s.replace(o, w, 1)
    s = stage2(n, s)
    assert blocks(s) == keep, (code, "ANGLE/Pose/GRACE changed")
    s = re.sub(r'"M22\d\d-0\d"', f'"{code}"', s); assert s.rstrip().endswith(f'"{code}"'), code
    out = f"{code}_s62_t{n}_thu.txt"; (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}  # {tag}\n" for a in allows))
    print(out, len((P / base).read_text()), "->", len(s))
    return s
for n in range(3, 9):
    base = "M2203-03_s62_t3_thu.txt" if n == 3 else f"M2211-0{n}_s62_t{n}_thu.txt"
    build(n, base, f"M2213-0{n}", E[n], CA + A[n] + FAB_A + SLV2_A.get(n, []), (TAG13 if n > 3 else TAG12 + " + " + TAG13) + " + L2214 fabric / L2215 sleeves via ROOT-B6")
for n in (1, 2):  # L2214 only (fabric block); nothing else touched in t1/t2
    build(n, f"M2206-0{n}_s62_t{n}_thu.txt", f"M2213-0{n}", [], FAB_A, "owner L2214 fabric via ROOT-B6", common=False)
# T7LOW: same neck cuts as M2209-01 (L2209), now on M2213-07
T = [("ONE straight SQUARE collar only (no crossed collar, nothing layered under it): a LOW open square neckline just below the collarbones, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by ONE wide flat band in her second colour embroidered with bomb-form herbaceous peonies (the square band stops at the shoulders, nothing rises up the neck, neck bare), always fully visible;", "a low neckline;"),
     ("embroidered on the front of the robe below the collar,", "embroidered on the front of the robe,"),
     ("it is never displayed, never shown off, never inside the neckline, never framed;", "it is never displayed, never shown off;"),
     ("never rising up the neck, joined at the throat", "joined at the throat"),
     ("very wide yellow borders along the sleeves and hem (only a narrow yellow edge on the neckline band),", "very wide yellow borders along the sleeves and hem,"),
     ("stitched along all the trims, the neckline band and the cuffs,", "stitched along all the trims and the cuffs,"),
     (" The INNER robe (the under-layer) shows at the neckline ONLY as a thin flat edge, never an extra visible layer stacked at the neckline; where it shows at the front opening it is LIGHTLY embroidered: a few small sprigs of her flower, in fine flat silk thread, plain cloth between them; calm, never busy.", "")]
TA = [l.split("  #")[0][7:] for l in (R / "dev/art/thu_comoi/M2211/M2209-01_s62_t7_thu.txt.keep").read_text().splitlines() if l.startswith("allow: ")]
def build_low():
    s = (P / "M2213-07_s62_t7_thu.txt").read_text(); keep = blocks(s)
    for o, w in T:
        assert s.count(o) == 1, ("T7LOW", o[:80]); s = s.replace(o, w, 1)
    assert blocks(s) == keep
    s = s.replace('"M2213-07"', '"M2213-T7LOW"'); assert s.rstrip().endswith('"M2213-T7LOW"')
    out = "M2213-T7LOW_s62_t7_thu.txt"; (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text("base: dev/handover/prompts_L2095/M2213-07_s62_t7_thu.txt\n" + "".join(f"allow: {a}  # owner L2209 test via ROOT-B5\n" for a in TA))
    print(out, len(s))
build_low()
