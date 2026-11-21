#!/usr/bin/env python3
"""M2170-01..08 = thu s62 t1..t8 (owner L2163-L2171 via ROOT-B4; THUROOT5). Words only (A55), ANGLE/pose untouched (A54).
Bases: t1-t3 = M2150-01..03, t4-t8 = M2163-01..05 (items 1-3 already in). Adds items 4,5,6,8,9,10,11."""
import re, pathlib, json
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
OWN = "  # owner L2163-L2171 via ROOT-B4"
# ---- (8) chest scrub, applied where present (counted) ----
CHEST = [
 ("a LOW open square neckline across the upper chest", "a LOW open square neckline just below the collarbones"),
 ("the square collar and the chest stay fully visible", "the square collar stays fully visible"),
 ("sitting HIGH at the natural waist just below the bust", "sitting at the natural waist"),
 ("covering only the shoulders and the outer upper chest", "covering only the shoulders"),
 ("framed (across the upper chest AND up both sides to the shoulders) by", "framed by"),
 ("embroidered at the front of the chest as an ordinary part of the robe's embroidery",
  "embroidered on the front of the bodice below the collar, small and flat, part of the robe's embroidery"),
 ("(never high on the chest)", "(never high)"),
 ("no pearl strand at the neck or across the chest", "no pearl strand at the neck"),
 ("NO high-waisted chest-wrap skirt", "NO high-waisted wrap skirt"),
 ("Even while her hands are raised to hold her item at chest height,", "Even while her hands are raised to hold her item,"),
 ("elegant, clearly adult;", "elegant, slim, clearly adult;"),
]
KNEE = " well past the knees"
FLOOR7 = ("two narrow yellow silk streamers fall straight down from under the belt, one either side of centre;",
  "two LONG narrow yellow silk streamers fall softly from under the belt all the way down to the floor, their ends touching the floor, soft and flowing (thướt tha), one either side of centre;")
FLOOR8 = ("two narrow yellow silk streamers embroidered with small gold phoenixes fall straight down from under the belt, one either side of centre, their tips capped in gold;",
  "two LONG narrow yellow silk streamers embroidered with small gold phoenixes fall softly from under the belt all the way down to the floor, one either side of centre, their tips capped in gold and touching the floor, soft and flowing (thướt tha);")
# ---- (9) t4 Tần on s62: face/identity sentences from M2163-02 (s62), colours light olive + lilac ----
F64 = "Her face: a SOFT gentle oval face with smooth rounded cheeks and a small soft chin, no sharp angles anywhere; large TENDER round-almond eyes, soft double eyelids, gently LOWERED outer corners and a soft warm look, fully open, the gaze soft and kind; soft, slightly fuller straight brows that slope gently DOWN at the tails; a small nose with a softly rounded tip; a small soft mouth with gently rounded lips;"
F62 = "Her face: a SOFT gentle oval face, a smooth wide forehead, smooth rounded cheeks and a small soft chin, no sharp angles anywhere; large TENDER almond eyes with gently LOWERED outer corners and a soft warm look, fully open, the gaze soft and kind; softly feathered, gently curved brows that slope gently DOWN at the tails; a small delicate nose; a small soft mouth with gently rounded lips;"
T4 = [
 ("elegant, slim, clearly adult; An imperial consort.", "elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone. An imperial consort."),
 (F64, F62),
 ("hair COLOUR and signature colour family; about 22, youthful adult.",
  "hair COLOUR and signature colour family; do NOT copy poses, outfit, HAIRSTYLE, hair ornaments or accessories of the reference, dress her in the NEW outfit below. about 22, youthful adult."),
 ("one wide flat ivory band", "one wide flat lilac band"),
 ("a slim embroidered ivory silk sash", "a slim embroidered lilac silk sash"),
 ("her signature colour family muted teal and ivory stays the MAIN robe colour (muted teal); the robe itself is clearly muted teal silk",
  "her signature colour family light olive and lilac stays the MAIN robe colour (light olive); the robe itself is clearly light olive silk"),
 ("muted teal silk like #69AEBE is the main colour of the robe, sleeves and vân kiên, with ivory in the inner robe",
  "light olive silk like #9FB577 is the main colour of the robe, sleeves and vân kiên, with lilac in the inner robe"),
 ("the MAIN colour muted teal and the SECONDARY colour ivory", "the MAIN colour light olive and the SECONDARY colour lilac"),
 ("her robe colour muted teal and her secondary colour ivory", "her robe colour light olive and her secondary colour lilac"),
 ("nothing). No text, no labels.", "nothing). Everyone beautiful at every age. No text, no labels."),
]
T3_OLD = "and closely scattered small sprigs over the robe, twice as many as at the rank below, small flowers only, with a few pairs"
T3_NEW = ("and only a FEW small China-rose sprigs, widely spaced with plain silk between them, mainly near the hem and the sleeve ends "
          "(clearly FEWER than at the Tần rank, a little more than at the Thường tại rank), with a few pairs")
J = {
 1: ("M2150-01_s62_t1_thu.txt", [("two LONG plain silk ties trailing down the skirt (thướt tha)", "two LONG plain silk ties trailing down the skirt" + KNEE + " (thướt tha)")]),
 2: ("M2150-02_s62_t2_thu.txt", [("two LONG silk ties trailing down the skirt (thướt tha)", "two LONG silk ties trailing down the skirt" + KNEE + " (thướt tha)")]),
 3: ("M2150-03_s62_t3_thu.txt", [("two LONG silk ties trailing down the skirt (thướt tha)", "two LONG silk ties trailing down the skirt" + KNEE + " (thướt tha)"),
     (T3_OLD, T3_NEW)]),
 4: ("M2163-01_s64_t4_thu.txt", T4 + [("two LONG silk ties falling straight down either side of the clasp,", "two LONG silk ties falling straight down either side of the clasp to" + KNEE + ",")]),
 5: ("M2163-02_s62_t5_thu.txt", [("two long silk ties falling straight down either side of it;", "two LONG silk ties falling straight down either side of it to" + KNEE + ";")]),
 6: ("M2163-03_s62_t6_thu.txt", [
     ("two long yellow ties falling straight down either side of it;", "two LONG yellow ties falling straight down either side of it to" + KNEE + ";"),
     # (11) pearl net on the Quý phi vân kiên
     ("finely embroidered with small gold-thread camellia sprigs; ONE short pearl fringe",
      "finely embroidered with small gold-thread camellia sprigs; an airy open net of small pearls and tiny gold flower studs sewn onto the vân kiên's own silk, lying flat, finer and a little richer than the Phi's, simpler than the Hoàng quý phi's, soft and light, never bulky; ONE short pearl fringe"),
     # (6) yellow: t6 gets the amount the HQP had in M2150-07
     ("plus a clearly visible amount of royal yellow: a yellow inner robe panel,", "plus clearly larger visible parts in royal yellow: a WIDE yellow inner robe panel,"),
     ("a royal-yellow silk sash of medium width", "a WIDE royal-yellow silk sash"),
     ("never bulky and narrow yellow borders,", "never bulky and WIDE yellow borders along the neckline, sleeves and hem,"),
     ("hex #F2BC61", "hex #EFBD69"),
     ("sleeves and shoulder piece, with lilac in the inner robe and linings; gold only as thin accents.",
      "sleeves and shoulder piece, with lilac in the inner robe and linings; royal golden yellow (#EFBD69) as clearly larger visible parts (wide yellow borders along the neckline, sleeves and hem, a wide yellow sash, a wide inner panel of the robe), her own light olive still clearly the main colour; gold only as thin accents."),
   ]),
 7: ("M2163-04_s62_t7_thu.txt", [FLOOR7,
     ("over a narrow royal-yellow silk sash", "over a wide royal-yellow silk sash"),
     ("yellow as clearly larger visible parts (wide yellow borders along the neckline, sleeves and hem, a wide yellow sash, a wide inner panel of the robe) in rich warm royal golden yellow (#EFBD69),",
      "royal golden yellow covers about a QUARTER TO A THIRD of the visible outfit (about HALF as much yellow as the Empress's, clearly more than the Quý phi's, clearly less than the Empress's): very wide yellow borders along the neckline, sleeves and hem, wide yellow sleeve linings showing at the cuffs, a wide yellow sash and the yellow streamers, and a wide yellow front panel of the robe from the waist down to the hem, in rich warm royal golden yellow (#EFBD69),"),
   ]),
 8: ("M2163-05_s62_t8_thu.txt", [FLOOR8,
     ("a gold-thread phoenix among tree peonies", "a SMALL gold-thread phoenix among tree peonies"),
     ("light silk that flows and sways softly, never bell-wide;", "light silk that flows and sways softly, never bell-wide, the SAME thin, light, flowing silk as the Hoàng quý phi's robe, floating just as lightly;"),
   ]),
}
rep = {}
for n, (base, reps) in J.items():
    s = (P / base).read_text(); log = []
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:70], s.count(o)); s = s.replace(o, w, 1)
    for o, w in CHEST:
        c = s.count(o)
        if c: s = s.replace(o, w); log.append(f"{o} -> {w} (x{c})")
    if n >= 7:  # gate G70 (owner L1996): no 'bodice' word at t7/t8 -> 'robe'
        s = s.replace("embroidered on the front of the bodice below the collar", "embroidered on the front of the robe below the collar")
    oc = re.search(r'never over her: "(M\d{4}-\d\d)"', s).group(1); s = s.replace(f'"{oc}"', f'"M2170-0{n}"')
    assert s.rstrip().endswith(f'"M2170-0{n}"')
    assert "s64" not in s and "muted teal" not in s and "#69AEBE" not in s
    out = f"M2170-0{n}_s62_t{n}_thu.txt"
    (D / out).write_text(s); (P / out).write_text(s)
    allows = sorted({o for o, _ in reps} | {o for o, w in CHEST if o in (P / base).read_text()} | ({"with ivory in the inner robe and linings"} if n == 4 else set()))
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}{OWN}\n" for a in allows))
    rep[n] = log
    print(n, out, len(s), "chest:", len(log))
json.dump(rep, open(D / "chest_log.json", "w"), ensure_ascii=False, indent=1)
