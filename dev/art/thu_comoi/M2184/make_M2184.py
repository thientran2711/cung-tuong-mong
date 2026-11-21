#!/usr/bin/env python3
"""M2184-01..04 = t5 (M2179-02), t6 (M2182-01), t7 (M2182-02), t8 (M2182-03) + owner L2184: ONE attached image only ->
no image-2/3/swatch references (royal yellow by hex), no 'collar' word for the vân kiên. THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
YEL = "The royal yellow in the robe is like #EFBD69, warm honey-gold."
IMG3 = ("Image 3 shows ONLY the lobe shape and pearl net of the vân kiên; NEVER copy its stand collar or anything around the neck (colours per this prompt; no necklace).",
        "Nothing around the neck: no stand collar, no necklace.")
PHI = ("like the Phi's soft pearl-net collar", "like the Phi's soft pearl-net vân kiên")
GEM = ("NEVER on the robe, collar or belt", "NEVER on the robe, vân kiên or belt")
J = {
 1: ("M2179-02_s62_t5_thu.txt", "M2179-02", [
     ("the net, scallops, gold tassels and pearl fringe like image 2 (image 2 shows the collar only, the neck band in it is NOT copied), but softly draped down on the shoulders;",
      "the net lying flat and airy on the soft silk, the lower edge in soft rounded scallops edged with silver thread, the small gold tassels hanging lightly from the scallops and the short pearl fringe below them, all softly draped down on the shoulders;")]),
 2: ("M2182-01_s62_t6_thu.txt", "M2182-01", [
     ("the royal yellow is exactly the colour of the flat colour swatch image (image 2, a honey-gold close to hex #EFBD69, 18K gold tone,",
      "the royal yellow is like #EFBD69, warm honey-gold, 18K gold tone,")]),
 3: ("M2182-02_s62_t7_thu.txt", "M2182-02", [
     ("a light olive cloud collar of ONE tier (vân kiên một tầng) with rounded cloud lobes,", "a light olive vân kiên (soft shoulder piece with rounded cloud lobes) of ONE tier (vân kiên một tầng),"),
     ("sleeves and cloud collar", "sleeves and vân kiên"), PHI, GEM, IMG3,
     ("Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; the royal yellow in the robe is exactly that colour.", YEL)]),
 4: ("M2182-03_s62_t8_thu.txt", "M2182-03", [
     ("a royal golden yellow cloud collar of ONE tier (vân kiên một tầng, never olive; ONE single tier, never two or three) with rounded cloud lobes,",
      "a royal golden yellow vân kiên (soft shoulder piece with rounded cloud lobes) of ONE tier (vân kiên một tầng, never olive; ONE single tier, never two or three),"),
     PHI, GEM, IMG3,
     ("Image 2 is only a colour reference for the royal yellow, never copy anything but its colour; NOTHING", YEL + " NOTHING")]),
}
for n, (base, oc, reps) in J.items():
    s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    low = s.lower()
    assert "image 2" not in low and "image 3" not in low and "swatch" not in low and "cloud collar" not in low, n
    t = base.split("_")[2]; out = f"M2184-0{n}_s62_{t}_thu.txt"
    s = s.replace(f'"{oc}"', f'"M2184-0{n}"'); assert s.rstrip().endswith(f'"M2184-0{n}"')
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2184 via ROOT-B4\n" for o in [o for o, _ in reps] + (["a honey-gold close to hex #EFBD69"] if n == 2 else [])))
    print(out, len(s))
