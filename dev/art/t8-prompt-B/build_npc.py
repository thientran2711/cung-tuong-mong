#!/usr/bin/env python3
"""build_npc.py -- FIGURE_GATE rule 0 builder for the NPC / men / children figures (W107b, Foreman C ROOT-36 order).

Owner rule 0 (FIGURE_GATE): a painter NEVER types a prompt; every gen prompt is the exact stdout of a builder.
Rule 6 (copy, never invent): every identity / outfit / pose / prop word below is COPIED from an old prompt source,
cited per table (file:line on origin/main unless noted). Shared pieces are IMPORTED from build.py (PRE, END,
AGE_TXT, IDENT) and dev/art/emperor-B/build.py (men AGE_TXT, men identity sentence); the K3 background line is the
build.py sentence (build_trieu) with her->him for men and boys (ROOT-36 approved her->him).

Usage:
  python3 build_npc.py <id> --age aNN            -> prints the prompt (exit 0)
  python3 build_npc.py <id> --age aNN --refs     -> prints the A0 reference list (JSON) instead
  python3 build_npc.py <id> --age aNN --log F    -> prints the prompt and appends {cmd, prompt, refs} to ledger F
  python3 build_npc.py --verify F                -> re-runs every build_npc cmd in ledger F, FAILS on any 1-char diff
  python3 build_npc.py --list                    -> every id with its ages
Exit 3 = HELD for the owner or NO SOURCE (no old prompt exists): the cell cannot be painted (rule 0(e)).
ids: thaihau-h1..h3 · eunuch-u01..u30 · official-o1..o6 · physician-p1..p2 · man-thive-1..2 · man-thaiy-1 ·
     man-vuonggia-1..2 · man-nhacsu-1 · man-hoasu-1 · man-suthan-1..2 · man-quytu-1..9 · man-bacdich-1 ·
     man-congtu-1..10 · kid-p01..p24 · kid-f01..f24   (NO SOURCE ids: see NOSRC)
"""
import sys, os, re, json, importlib.util
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))

def _load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    argv = sys.argv; sys.argv = [path]  # build.py reads flags from sys.argv at import time
    try: spec.loader.exec_module(m)
    finally: sys.argv = argv
    return m
B = _load("ctm_build", os.path.join(HERE, "build.py"))
E = _load("ctm_emperor", os.path.join(HERE, "..", "emperor-B", "build.py"))

PRE, END = B.PRE, B.END                      # build.py PRE (frontal, 3d2) / END, byte-identical
W_AGE = B.AGE_TXT                            # women: build.py AGE_TXT a18..a65 (approved)
M_AGE = E.AGE_TXT                            # men: emperor-B AGE_TXT a18..a65 = women AGE_TXT, gender words only (J6, owner Lượt 529)
def _gswap(t):
    t = re.sub(r"\bher\b", "his", t); t = re.sub(r"\bHer\b", "His", t); t = re.sub(r"\bshe\b", "he", t); t = re.sub(r"\bShe\b", "He", t)
    return re.sub(r"\b(lady|woman)\b", "man", t)
assert M_AGE == {a: _gswap(W_AGE[a]) for a in W_AGE}, "J6: men AGE_TXT must be the women AGE_TXT with gender words swapped only"
D9 = B.D9_FOREHEAD                           # D9 (owner Lượt 529): owner words verbatim, right before END on every NPC output
IDENT_F = B.IDENT                            # build.py IDENT (her)
IDENT_M = (" From the identity reference keep ONLY his face, facial features and hairstyle colour; do NOT copy the outfit, crown or accessories "
           "of the reference, dress him in the NEW outfit below. The style reference image is only for skin, drawing style, fabric and embroidery: "
           "never copy its face, body or pose.")  # emperor-B/build.py build() sentence, verbatim
assert IDENT_M.strip() in open(os.path.join(HERE, "..", "emperor-B", "build.py"), encoding="utf-8").read()
_K3 = (" IGNORE the style reference image's background completely: the background is completely transparent with NOTHING behind or around her: "
       "no backdrop, no parchment, no painted flowers or branches, no smoke, no haze, no glow, no stain.")  # build.py build_trieu, verbatim
assert _K3 in open(os.path.join(HERE, "build.py"), encoding="utf-8").read()
K3 = {"f": "", "m": ""}   # C2 (owner Lượt 780 = B9 via ROOT-57, MG2): no transparent-background sentence; master M03 parchment is the only background sentence (then images_remove_background)
STYLE_REF = "style2_portraits_c01_c12 6AbGv6EiJO"        # FIGURE_GATE A0 REFERENCES (every gen, image 1)

class Held(Exception): pass                  # exit 3: owner decision pending / no old source

# ---------------------------------------------------------------------------------------------------------------
# NPC Thái hậu h1..h3 -- dev/figwork/spec.py:52-55 (TH ages, THC robes, "dignified, gentle Chinese empress dowager",
# "hands folded at her waist"); ages now = approved build.py AGE_TXT
THC = ["deep golden-brown brocade robe embroidered with phoenixes, ornate gold and jade headdress",
       "dark plum brocade robe with gold phoenix roundels, a stately gold headdress with pearls",
       "dark teal brocade robe with gold phoenix embroidery, a dignified gold and pearl headdress, holding prayer beads"]
# SL1 (owner Lượt 778 via ROOT-57: every Thái hậu prompt path identical on sleeves): the floor rank-law sentence (build_all.py sleeve(8)) + the
# sleeve-hold sentence S37 (build_all.py SLEEVE_FLOOR_HOLD), read VERBATIM from the store builder source, inserted right after the Outfit sentence.
def _th_sleeves():
    import ast as _a
    _t = _a.parse(open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "store-all", "build_all.py"), encoding="utf-8").read())
    hold = next(n.value.value for n in _t.body if isinstance(n, _a.Assign) and getattr(n.targets[0], "id", "") == "SLEEVE_FLOOR_HOLD")
    fn = next(n for n in _t.body if isinstance(n, _a.FunctionDef) and n.name == "sleeve")
    floor = fn.body[-1].value.value
    assert "touch the floor" in floor and hold.startswith("Even while her hands are raised")
    return " " + floor + " " + hold
TH_SLEEVES = _th_sleeves()
# B12 (owner Lượt 781, MG2): Thái hậu fabric = store prompt-B brocade sentence (verbatim = master_common.BROCADE) right before Pose; M06 never inserted
def thaihau(n, age):
    return (PRE + " A dignified, gentle Chinese empress dowager." + IDENT_F + " " + W_AGE[age]
            + (B.ELDER_M05_SENT if age in ("a51", "a65") else "")   # C5 (owner Lượt 779, MG2): her elder colours win over master M05 at a51/a65
            + f" Outfit: a {THC[n - 1]}." + TH_SLEEVES + " FABRIC: thick gold-embroidered brocade with a graceful, flowing drape." + " Pose: calm standing pose; hands folded at her waist." + K3["f"] + END)

# ---------------------------------------------------------------------------------------------------------------
# Eunuchs u01..u30 (base robe, no rank) -- dev/figwork/spec3.py:32-39 (N-eunuch-uNN: MF faces, ECOL colours, ET poses)
ET = {"trung": "respectful steady stance, a horsetail whisk in the crook of his arm", "tham": "neutral standing pose, hands relaxed at his sides",
      "nhat": "slightly reserved posture, hands clasped before him", "lanh": "alert attentive posture, head up", "chuyen": "neutral pose, hands tucked into his sleeves"}
TRS = ["trung", "tham", "nhat", "lanh", "chuyen"]
ECOL = ["dark steel blue", "dark green", "slate grey-blue", "deep teal", "brown", "navy", "olive", "deep crimson", "charcoal black", "grey-green"]
MF = ["oval face with fine features", "refined slender face", "gentle face with a defined jaw", "soft handsome face with calm gentle eyes",
      "long elegant face with fine brows", "face with high cheekbones and a straight nose", "youthful handsome face with gentle round eyes",
      "noble face with thick straight brows", "delicate face with warm almond eyes", "handsome face with a slim pointed chin"]
def eunuch(n, age):
    i = n - 1
    face = MF[i % 10] + (", smooth clear cheeks" if i >= 20 else (", slightly wavy hair at the temples" if i >= 10 else ""))
    return (PRE + f" A handsome, refined palace eunuch, beardless. His face: {face}." + IDENT_M + " " + M_AGE[age]
            + f" Outfit: a {ECOL[(i * 3) % 10]} round-collar palace robe with a belt and a black gauze hat, black boots."
            + f" Pose: calm standing pose; {ET[TRS[i % 5]]}. Every man handsome at every age, no caricature." + K3["m"] + END)

# ---------------------------------------------------------------------------------------------------------------
# Officials o1..o6 -- dev/figwork/jobs.json S-official-1/2/3 (man A = o(2k-1), man B = o(2k)): face + robe; all six:
# "black winged gauze hat, black boots, holding an ivory court tablet"
OFF = {1: ("oval face", "a crimson official robe with an embroidered rank badge"),
       2: ("face with calm narrow eyes", "a deep blue official robe with an embroidered rank badge"),
       3: ("face with a defined jaw", "a dark green official robe with an embroidered rank badge"),
       4: ("round soft face", "a purple official robe with an embroidered rank badge"),
       5: ("face with high cheekbones", "a red official robe with an embroidered rank badge"),
       6: ("square gentle face", "a dark teal official robe with an embroidered rank badge")}
PURPLE_HELD = "HELD: the old prompt dresses him in purple; owner rule 'men never pink/purple' -> ROOT-36/owner decide the colour (no invented colour)"
def official(n, age):
    face, robe = OFF[n]
    if "purple" in robe: raise Held(PURPLE_HELD)
    return (PRE + f" An imperial court official. His face: {face}." + IDENT_M + " " + M_AGE[age]
            + f" Outfit: {robe}, black winged gauze hat, black boots. Pose: calm standing pose; holding an ivory court tablet." + K3["m"] + END)

# Physicians p1..p2 -- dev/figwork/jobs.json S-physician-1 (man A = p1, man B = p2)
PHY = {1: ("oval face", "a plain dark teal scholar's robe with a soft black cap", "carrying a small wooden medicine box"),
       2: ("slender face", "a plain indigo robe with a black cap", "holding a rolled herbal scroll")}
def physician(n, age):
    face, robe, pose = PHY[n]
    return (PRE + f" An imperial physician. His face: {face}." + IDENT_M + " " + M_AGE[age]
            + f" Outfit: {robe}. Pose: calm standing pose; {pose}." + K3["m"] + END)

# ---------------------------------------------------------------------------------------------------------------
# Men pool (romance men) -- dev/figwork/jobs.json S-men-1..5 (fig-romance-r1..r9; r# -> live fig-man-<sub>-<n> in the
# order of dev/figwork/spec.py:83-90 RM) ; tail "Tall, slim, calm." from the same jobs
MEN = {("thive", 1): ("oval face", "a palace guard in lacquered dark armour over a red robe, a sword at his hip", None),
       ("thive", 2): ("face with soft features", "a palace guard captain in steel lamellar armour with a dark blue robe", "helmet under his arm"),
       ("thaiy", 1): ("slender face", "a young imperial physician in a pale blue scholar's robe and soft black cap", "holding a small medicine box"),
       ("vuonggia", 1): ("face with gentle round eyes", "a prince, the emperor's brother, in a white and silver brocade robe with a jade crown", None),
       ("vuonggia", 2): ("long face with fine brows", "a prince in a deep purple brocade robe embroidered with a four-clawed python, a gold crown", None),
       ("nhacsu", 1): ("face with thick brows", "a court musician in a soft white and pale blue robe", "holding a bamboo flute"),
       ("hoasu", 1): ("face with a straight nose", "a court painter in a light beige scholar's robe", "holding a brush and a rolled painting"),
       ("suthan", 1): ("square gentle face", "a foreign envoy from a northern steppe kingdom in a fur-trimmed deep red robe and fur hat", None),
       ("suthan", 2): ("face with high cheekbones", "a foreign envoy from a western kingdom in a turquoise and gold embroidered caftan with a headwrap", None)}
def man(sub, n, age):
    face, who, pose = MEN[(sub, n)]
    if "purple" in who: raise Held(PURPLE_HELD)
    return (PRE + f" A handsome man: {who}. His face: {face}." + IDENT_M + " " + M_AGE[age]
            + f" Pose: calm standing pose; {pose or 'standing calmly'}. Tall, slim, calm." + K3["m"] + END)

# Quý tử 1..9 + Bắc Địch prince -- origin/main dev/figwork/menpool2/spec.py:15-25 (P rows) + :13-14 (TAIL)
MP = [("scholar", "jade green with ivory", "an elegant layered silk scholar robe with embroidered borders, a jade belt with pendant, a small jade hair crown", "oval face with a straight nose", "holding a closed folding fan"),
      ("noble", "deep sapphire blue with silver-white", "a rich brocade robe of a great house's young lord with cloud embroidery, a jade belt, a small silver hair crown", "refined narrow face with high cheekbones", "hands clasped behind the back"),
      ("martial", "dark slate with bronze", "a fitted dark brocade robe with leather bracers and a broad belt, a dark metal hair crown, upright military bearing", "slightly square jaw, clean-cut features", "one hand on a sheathed sword at his side"),
      ("scholar", "ivory white with sky blue", "a light layered scholar robe with a sky-blue sash and a jade pendant, a simple white jade hairpin", "gentle long face with soft dark brows", "holding a thin book"),
      ("noble", "navy blue with gold", "a navy brocade robe with gold-trimmed collar and a jade belt, a gold hair crown", "soft round-oval face", "holding a jade pendant on a cord"),
      ("merchant-noble", "warm brown with cream", "a fine brown silk robe with cream inner collar and a leather belt with a small purse, a wooden hairpin", "oval face with soft features", "holding an abacus-shaped jade token"),
      ("martial", "emerald green with dark leather", "a hunting robe in emerald brocade with leather bracers, a bow case on the back, a dark hair crown", "strong straight brows, clean-cut jaw", "holding a hunting bow at his side"),
      ("scholar", "teal with pale grey", "a teal scholar robe with pale grey layers and a black lacquer hair crown", "slender face with a gentle smile line", "holding a rolled scroll"),
      ("noble", "midnight blue with jade", "a midnight-blue robe with jade-green embroidered hems and a jade belt, a silver hair crown", "refined oval face with calm eyes", "holding a tea cup")]
BDP = ("steppe prince", "deep crimson-brown with gold and dark fur", "the son of the northern steppe khan: a fur-trimmed deep crimson-brown riding robe with gold embroidery, a broad belt with a curved dagger in its sheath, leather boots, hair braided with gold beads under a small fur-rimmed cap (not a Qing hat)", "strong sun-kissed but fair handsome face, bold straight brows", "one hand resting on his belt")
MP_TAIL = " Robes and sleeves hanging straight, no flying sashes. Han/Ming cross-collar robes, no Qing hats or collars. Men never in pink or purple."
def mpool(row, age):
    kind, pal, att, face, pose = row
    return (PRE + f" A young Chinese nobleman, a {kind}. His face: {face}." + IDENT_M + " " + M_AGE[age]
            + f" Outfit: {att}; signature colours {pal}. Pose: calm standing pose; {pose}." + MP_TAIL + K3["m"] + END)

# Công tử 1..10 -- origin/main dev/figwork/congtu/spec.py:7-18 (a18/a26: PAL, FACE, KIND, ATT, P18, P26) +
# dev/figwork/artcomplete/ct_spec.py:5-11 (a36/a51: DR robes, P36, P51, "in deeper tones of the same colour family" at 51)
CT_PAL = ["deep sapphire blue with silver-white", "jade green with ivory", "ivory white with sky blue", "navy blue with gold", "teal with pale grey",
          "emerald green with cream", "slate grey-blue with white", "warm brown with cream", "midnight blue with jade", "pale celadon green with white"]
CT_FACE = ["oval face with a straight nose", "gentle long face with soft dark brows", "slightly square jaw, clean-cut features", "oval face with soft features",
           "refined narrow face with high cheekbones", "soft round-oval face"]
CT_KIND = ["scholar", "scholar", "scholar", "noble", "noble", "martial", "scholar", "noble", "martial", "scholar"]
CT_ATT = {"scholar": "an elegant layered silk scholar robe of a minister's son with embroidered borders, wide sleeves hanging straight, a jade belt with pendant, hair in a neat topknot with a small jade hair crown and hairpin",
          "noble": "a rich brocade robe of a great house's young lord with cloud embroidery and a gold-trimmed collar, a jade belt, hair in a topknot with a small silver hair crown",
          "martial": "a general's son in a fitted dark brocade robe with leather bracers and a broad belt, hair in a high topknot with a dark metal hair crown, upright military bearing"}
CT_DR = {"scholar": "a richer layered silk robe of a high-ranking scholar-gentleman", "noble": "a rich brocade robe of the head of a great house",
         "martial": "a fitted dark brocade robe of a senior general's family with a broad belt, upright military bearing"}
CT_P = {"a18": ["holding a closed folding fan", "holding a thin book", "holding a rolled scroll", "holding a jade pendant on a cord", "holding a bamboo flute",
                "holding a sheathed sword at his side", "holding a writing brush", "holding an open folding fan", "holding a hunting bow at his side", "holding a small go game box"],
        "a26": ["hands clasped behind the back", "holding an open book", "holding a closed folding fan", "holding a tea cup", "holding a rolled scroll",
                "one hand on the hilt of a sheathed sword", "holding a jade pendant", "holding a folding fan at the chest", "holding a riding whip", "holding a bamboo flute"],
        "a36": ["hands clasped behind the back", "holding a thin book", "holding a rolled scroll", "holding a tea cup", "holding a jade pendant", "one hand resting on a sheathed sword",
                "holding a writing brush", "holding a closed folding fan", "holding a riding whip", "holding a small go game box"],
        "a51": ["holding a closed folding fan", "holding a walking staff of dark wood", "hands clasped in front", "holding a string of prayer beads", "holding a rolled scroll",
                "holding a tea cup", "holding an open book", "holding a jade pendant", "hands clasped behind the back", "holding a bamboo flute"]}
def congtu(n, age):
    i = n - 1; k = CT_KIND[i]
    if age not in CT_P: raise Held(f"NO SOURCE: công tử pose list (CT_P) has a18-a51 only; no old a65 pose source (men age text a65 exists since J6) -> ROOT-50/owner")
    if age in ("a18", "a26"):
        outfit = CT_ATT[k] + (", slightly richer fabric" if age == "a26" else "")
    else:
        outfit = CT_DR[k] + (" in the same colour family" if age == "a36" else " in deeper tones of the same colour family")
    return (PRE + f" A young Chinese nobleman, the son of a high minister. His face: {CT_FACE[i % len(CT_FACE)]}; signature colour family: {CT_PAL[i]}." + IDENT_M + " " + M_AGE[age]
            + f" Outfit: {outfit}. Pose: calm standing pose; {CT_P[age][i]}. Calm composed upright standing pose, robes and sleeves hanging straight, no flying sashes. Dignified, serene, wealthy. NOT pink, NOT purple."
            + K3["m"] + END)

# ---------------------------------------------------------------------------------------------------------------
# Children kid-pNN / kid-fNN, ages a4/a9/a14/a20 -- origin/main dev/figwork/kids/kspec.py:9-73 (palettes PP/FP, faces HP,
# per-age props P*/Q* with the same rotation r(), per-age figure clauses of prince()/princess(), OVR fixes, tail)
# PRE for a4/a9/a14 = build.py PRE with its two ADULT clauses replaced by kspec.py:6 "beautiful, sweet, handsome looks at every age"
KPRE = PRE.replace("elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; ", "beautiful, sweet, handsome looks at every age; ")
assert KPRE != PRE
PP = ["deep sapphire blue with silver-white", "jade green with ivory", "crimson red with gold", "teal with pale grey", "ivory white with sky blue",
      "navy blue with gold", "emerald green with cream", "slate grey-blue with white", "cinnabar red with dark navy", "sky blue with white",
      "deep teal with bronze", "moss green with ivory", "warm brown with cream", "black with crimson accents", "pale celadon green with white",
      "dark blue with apricot gold", "ochre gold with brown", "steel blue with pearl grey", "forest green with gold", "scarlet with black",
      "azure blue with ivory", "pine green with silver-grey", "russet brown with gold", "midnight blue with jade"]
FP = ["soft peach pink with ivory", "lilac with silver-white", "rose red with gold", "sky blue with white", "mint green with cream", "coral with pale gold",
      "lavender with pale blue", "celadon with white", "apricot with cream", "crimson with gold", "plum with pale pink", "moonlight blue with silver",
      "lemon yellow with white", "jade green with pale pink", "blush pink with sky blue", "ivory white with rose", "turquoise with ivory", "peony pink with gold",
      "pale violet with white", "cherry red with ivory", "powder blue with peach", "seafoam green with lilac", "honey gold with coral", "pearl white with lavender"]
P4 = ["holding a small wooden toy horse", "holding a little rattle drum (bolang drum)", "holding a small red paper lantern", "hugging a little cloth tiger toy",
      "holding a small spinning top", "holding a tiny kite", "holding a small round fruit", "hands together politely in front"]
P9 = ["holding a thin book", "holding a writing brush", "holding a small wooden practice sword", "holding a bamboo flute", "holding a rolled scroll",
      "holding a small kite", "holding a little bird cage", "with hands clasped behind the back"]
P14 = ["holding a hunting bow at his side", "holding a folding fan", "holding a rolled scroll", "holding a sword in its scabbard", "holding a bamboo flute",
       "holding an open book", "holding a go game piece box", "one hand resting on his jade belt pendant"]
P20 = ["holding a closed folding fan", "one hand behind the back, the other at the waist", "holding a sheathed sword", "holding a rolled scroll",
       "holding a jade pendant", "holding a bow", "hands in sleeves, calm and upright", "holding an open folding fan"]
Q4 = ["hugging a little cloth rabbit toy", "holding a small flower", "holding a little lantern", "holding a small rattle drum", "holding a butterfly toy on a stick",
      "holding a small peach", "holding a tiny round fan", "hands together politely in front"]
Q9 = ["holding a round silk fan", "holding a flowering branch", "holding a thin book", "holding a shuttlecock", "holding a small kite", "holding a little basket of flowers",
      "holding a writing brush", "holding a small embroidered pouch"]
Q14 = ["holding a round silk fan", "holding a lotus flower", "holding an embroidery hoop", "holding a bamboo flute", "holding an open book", "holding a plum blossom branch",
       "holding a small pipa lute", "hands softly folded at the waist"]
Q20 = ["holding a folding fan", "holding a peony", "holding a round silk fan", "holding a jade pendant", "hands folded in sleeves", "holding a plum blossom branch",
       "holding a small pipa lute", "holding a silk handkerchief"]
HP = ["slightly round face", "oval face", "soft heart-shaped face", "gentle long face with a straight nose", "round face with dimples", "oval face with soft dark brows"]
KAGES = ["a4", "a9", "a14", "a20"]
def _r(i, L, o=0): return L[(i * 3 + o + (i // 8) * (2 * o + 1)) % len(L)]   # kspec.py:37 rotation, verbatim
def _kid_clause(sx, i, age):   # kspec.py:41-47 (prince) / :55-62 (princess), per-age clause without its "N) " number
    if sx == "p":
        return {"a4": f"about 4 years old, a sweet toddler boy, about four heads tall, chubby cheeks, short black hair in one small topknot with a red silk cord, a fine brocade jacket and trousers with little cloud embroidery, {_r(i, P4)}",
                "a9": f"about 9 years old, a handsome little boy, about five and a half heads tall, hair in a small topknot with a gold ring, a fine brocade robe with a sash, {_r(i, P9, 1)}",
                "a14": f"about 14 years old, a handsome young boy still clearly a child, slim, about six and a half heads tall, hair in a topknot with a small silver crown, a fine brocade robe with embroidered collar and a jade belt pendant, {_r(i, P14, 2)}",
                "a20": f"about 20 years old, a handsome young man, about seven and a half heads tall, adult imperial prince court dress: rich layered brocade robe with embroidered dragon-cloud borders, jade belt, small gold crown (guan) with hairpin, {_r(i, P20, 5)}"}[age]
    return {"a4": f"about 4 years old, a sweet toddler girl, about four heads tall, chubby cheeks, two small hair buns with tiny silk flowers and ribbons, a fine embroidered silk jacket and long skirt, {_r(i, Q4)}",
            "a9": f"about 9 years old, a pretty little girl, about five and a half heads tall, double buns with small flower hairpins and ribbons, a rich silk robe with embroidered collar and a sash, {_r(i, Q9, 1)}",
            "a14": f"about 14 years old, a pretty young girl still clearly a child, slim, about six and a half heads tall, half-up hair with a few small gold flower hairpins and one small dangling ornament, a modest rich silk robe with long sleeves and high crossed collar, {_r(i, Q14, 2)}",
            "a20": f"about 20 years old, a beautiful young woman, about seven and a half heads tall, adult imperial princess court dress: layered rich silk robe with gold embroidery, embroidered sash, elegant chignon with gold phoenix hairpins and a dangling bu yao ornament, {_r(i, Q20, 5)}"}[age]
KOVR = {"p07": ("a9", "holding a bamboo flute", "holding a rolled scroll"), "p10": ("a20", "holding a rolled scroll", "holding a sheathed sword"),
        "p20": ("a14", "holding an open book", "holding a hunting bow at his side"), "p22": ("a20", "holding a sheathed sword", "holding a rolled scroll"),
        "p24": ("a20", "holding a closed folding fan", "holding a jade pendant")}   # kspec.py:65 OVR (first occurrence = that age's clause)
def kid(sx, n, age):
    if age not in KAGES: raise Held(f"NO SOURCE: kids/kspec.py has ages 4/9/14/20 only; no old prompt for kid {age} (owner/ROOT-36)")
    i = n - 1; jid = f"{sx}{n:02d}"
    cl = _kid_clause(sx, i, age)
    if jid in KOVR and KOVR[jid][0] == age and cl.endswith(KOVR[jid][1]): cl = cl[:-len(KOVR[jid][1])] + KOVR[jid][2]
    who = "imperial Chinese prince" if sx == "p" else "imperial Chinese princess"
    pal = (PP if sx == "p" else FP)[i]
    tail = (" Calm composed upright standing pose, still, no motion, robes hanging straight; dignified, serene. Full-length modest robes. NOT pink, NOT purple." if sx == "p"
            else " Calm composed upright standing pose, still, no motion, sleeves and skirts hanging straight; graceful, serene. Full-length modest robes, high collars.")
    g = "m" if sx == "p" else "f"
    return ((PRE if age == "a20" else KPRE) + f" An {who}: the face and features ({HP[i % len(HP)]}) and the signature colour family {pal}."
            + (IDENT_M if g == "m" else IDENT_F) + f" {cl}." + tail + K3[g] + END)

# ---------------------------------------------------------------------------------------------------------------
NOSRC = {  # id prefix -> why no builder path (rule 0(e): stop, Foreman C/owner)
    "eunuch-rank": "NO SOURCE: no old prompt for eunuch ranks r0-r3 (fig-eunuch-uNN-rN) on main/handover; owner/ROOT-36",
    "physician-p3": "NO SOURCE: jobs.json S-physician-1 has 2 men (p1, p2) only",
    "man-thive-3": "NO SOURCE: old men pool has 2 guards only", "man-thive-4": "NO SOURCE: old men pool has 2 guards only",
    "man-huynh-1": "NO SOURCE: outsideart/huynh_jobs.json has no prompt text", "man-huynh-2": "NO SOURCE: outsideart/huynh_jobs.json has no prompt text",
    "lover-tm96": "NO SOURCE: no old prompt for the tm96 childhood lover",
    "steward-tgk1": "NO SOURCE: no old prompt for the steward", "tutor-ttp1": "NO SOURCE: no old prompt for the tutor",
    "fallen-ly1": "NO SOURCE: no old prompt for Phế phi Lý",
    **{f"mama-k{n:02d}": "NOT HERE: owner (FIGURE_GATE WHO): mama = an older cung nữ -> maid uniform tm3/tm4 a36+ in build.py (N5c)" for n in range(1, 9)},
}

def ids():
    out = [f"thaihau-h{n}" for n in range(1, 4)] + [f"eunuch-u{n:02d}" for n in range(1, 31)] + [f"official-o{n}" for n in range(1, 7)]
    out += [f"physician-p{n}" for n in (1, 2)] + [f"man-{s}-{n}" for s, n in MEN] + [f"man-quytu-{n}" for n in range(1, 10)] + ["man-bacdich-1"]
    out += [f"man-congtu-{n}" for n in range(1, 11)] + [f"kid-p{n:02d}" for n in range(1, 25)] + [f"kid-f{n:02d}" for n in range(1, 25)]
    return out
def ages_of(i):
    if i.startswith("kid-"): return KAGES + ["a26", "a36", "a51"]
    return ["a18", "a26", "a36", "a51", "a65"]
def gender(i): return "f" if i.startswith(("thaihau", "kid-f")) else "m"

def prompt(i, age, rank=None):
    if i in NOSRC: raise Held(NOSRC[i])
    if rank is not None:
        if i.startswith("eunuch-"): raise Held(NOSRC["eunuch-rank"])
        raise Held(f"no rank states for {i}")
    if gender(i) == "m" and not i.startswith("kid-") and age not in M_AGE:
        raise Held(f"HELD for the owner: no approved men age text for {age}")
    out = _prompt(i, age)
    assert out.endswith(END) and D9 not in out
    out = out[:-len(END)] + D9 + END   # D9 (Lượt 529)
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__)))); import master_common
    return master_common.apply(out, high=i.startswith("thaihau"), female=gender(i) == "f")   # NOEAR (owner Lượt 1037): women + girls get the bare-earlobes sentence, men / boys unchanged   # + B12 (Lượt 781): Thái hậu = brocade, never M06   # B25 ONE MASTER COMMON BLOCK (owner Lượt 745/766, MG1), last step

def _prompt(i, age):
    pre, _, n = i.rpartition("-")
    if i.startswith("thaihau-h"): return thaihau(int(i[-1]), age)
    if i.startswith("eunuch-u"): return eunuch(int(i[-2:]), age)
    if i.startswith("official-o"): return official(int(i[-1]), age)
    if i.startswith("physician-p"): return physician(int(i[-1]), age)
    if i.startswith("man-quytu-"): return mpool(MP[int(n) - 1], age)
    if i == "man-bacdich-1": return mpool(BDP, age)
    if i.startswith("man-congtu-"): return congtu(int(n), age)
    if i.startswith("man-"): return man(pre[4:], int(n), age)
    if i.startswith("kid-"): return kid(i[4], int(i[5:]), age)
    raise KeyError(i)

def refs(i, age):
    face = f"img/hd/fig-{i}-{age if i.startswith('kid-') else 'a18'}.webp"
    return [STYLE_REF + " (style: skin, drawing, fabric, embroidery)", face + " (own live figure: FACE ONLY)"]

def _argv_parse(argv):
    a = list(argv); o = {"age": "a18", "rank": None, "log": None}
    for k in ("--age", "--rank", "--log"):
        if k in a: j = a.index(k); o[k[2:]] = a[j + 1]; del a[j:j + 2]
    o["refs"] = "--refs" in a; a = [x for x in a if x != "--refs"]
    o["id"] = a[0] if a else None
    return o

def main(argv):
    if argv[:1] == ["--list"]:
        for i in ids(): print(i, " ".join(ages_of(i)))
        for i, w in NOSRC.items(): print(i, "-", w)
        return 0
    if argv[:1] == ["--verify"]:
        bad = n = 0
        for line in open(argv[1], encoding="utf-8"):
            r = json.loads(line)
            if "build_npc.py" not in r.get("cmd", ""): continue
            n += 1; o = _argv_parse(r["cmd"].split()[2:])
            try: p = prompt(o["id"], o["age"], o["rank"])
            except Held as e: p = "HELD " + str(e)
            import master_common   # a gen made before the B25 master block (MG1) passes when only the block differs
            if (p != r["prompt"] and master_common.apply(master_common.legacy(r["prompt"]), female=gender(o["id"]) == "f") != p.replace(B.ELDER_M05_SENT, "")) or refs(o["id"], o["age"]) != r.get("refs"): bad += 1; print("FAIL", r.get("gen_id"), r["cmd"])
        print(f"verify: {n} build_npc gens, {bad} FAIL"); return 1 if bad else 0
    o = _argv_parse(argv)
    try: p = prompt(o["id"], o["age"], o["rank"])
    except Held as e: print(str(e), file=sys.stderr); return 3
    if o["refs"]: print(json.dumps(refs(o["id"], o["age"]), ensure_ascii=False)); return 0
    if o["log"]:
        cmd = "python3 dev/art/t8-prompt-B/build_npc.py " + " ".join(argv[:argv.index("--log")] + argv[argv.index("--log") + 2:])
        with open(o["log"], "a", encoding="utf-8") as f:
            f.write(json.dumps({"gen_id": None, "cmd": cmd, "prompt": p, "refs": refs(o["id"], o["age"])}, ensure_ascii=False) + "\n")
    print(p, end=""); return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
