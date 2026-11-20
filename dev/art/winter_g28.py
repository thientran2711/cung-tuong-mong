"""WINTER (G25 + G26 + G28, owner-approved ladder ~16:50Z / "đưa vào cái prompt chính vào cái máy duyệt prompt" 20/11): ONE copy of the winter words,
used by the MAIN builder (build_all.py --season dong) and check_store.py (season-aware APPROVED / MASTER / STORE checks).
G28 WINTER FABRIC (owner ~19:20Z / ~19:22Z / ~19:24Z 20/11, answer A) — ONE copy of the winter fabric swaps, shared by
dev/art/winter1/make_winter.py (applies them) and dev/art/check_store.py (winter scope: reverses them before the normal gate).
t1-t6 only: every see-through wording -> soft, light, flowing OPAQUE silk with the same drape (thướt tha); NEVER thick/padded/quilted/
brocade/heavy words ("vải dày cui lên nhìn ghê lắm"). t7/t8 keep their brocade (owner: "Hqp và hh không đổi vải, vì là gấm rồi").
The winter scope applies only to a prompt that carries the G26 fur sentence ('WINTER: …fur trim…'); then the approved sentences
M06 (master FABRIC), S06 (store fabric t1-t3) and S12 (PHI BẠCH) may appear ONLY in exactly these G28 forms."""
import re

WINTER_MARK = re.compile(r"WINTER: [^.]*ivory-white fur trim")

FABRIC = [  # (approved original, G28 winter form)
 ("The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha);",
  "The FABRIC is soft, light, flowing OPAQUE silk, never see-through, with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha);"),
 ("Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like.",
  "Light, soft, flowing OPAQUE silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never see-through, never stiff, flat or board-like."),
 ("showing a sheer thin undersleeve", "showing a soft opaque silk undersleeve"),
 ("a sheer silk shawl", "a soft opaque silk shawl"),
]
PHI_ORIG = ("PHI BẠCH: the sheer shawl draped behind her back and over her arms is a very sheer, highly translucent gauze shawl in {sec} "
            "(her secondary colour, clearly different from her main robe colour {main}) — the robe, sleeves and arms are clearly visible through it, "
            "so it reads as a light airy veil of that hue, never an opaque solid band of colour; it keeps its soft graceful drape.")
PHI_WINTER = ("PHI BẠCH (winter): the shawl draped behind her back and over her arms is a soft, light, flowing OPAQUE silk shawl in {sec} "
              "(her secondary colour, clearly different from her main robe colour {main}), never see-through, never stiff or bulky; it keeps its soft graceful drape.")
def _rx(tpl):
    a, b = tpl.split("{sec}"); b, c = b.split("{main}")
    return re.compile(re.escape(a) + r"(?P<sec>[^()]+?)" + re.escape(b) + r"(?P<main>[^()]+?)" + re.escape(c))
PHI_ORIG_RX, PHI_WINTER_RX = _rx(PHI_ORIG), _rx(PHI_WINTER)
SHEER = re.compile(r"\b(sheer|translucent|gauze|chiffon|organza|see-through)\b", re.I)
SHEER_OK = ["no sheer floating scarf, stole, shawl or veil unless her outfit names one", "never see-through"]
BANNED = re.compile(r"\b(thick|padded|quilted|bulky fabric|heavier folds|warm cloth)\b", re.I)   # owner ~19:24Z
assert not any(BANNED.search(w) for _, w in FABRIC) and not BANNED.search(PHI_WINTER)

def apply(text):
    """t1-t6 winter fabric. -> (text, list of swaps done). Asserts that no see-through word is left."""
    done = []
    for o, w in FABRIC:
        if o in text: text = text.replace(o, w); done.append(o[:30])
    text, k = PHI_ORIG_RX.subn(lambda m: PHI_WINTER.format(sec=m.group("sec"), main=m.group("main")), text)
    if k: done.append("PHI BẠCH")
    rest = text
    for ok in SHEER_OK: rest = rest.replace(ok, "")
    left = SHEER.findall(rest); assert not left, ("G28: see-through words left", left)
    return text, done

def unwinter(text):
    """check_store winter scope: if the prompt carries the G26 fur sentence, turn the G28 forms back into the approved originals
    so the normal gate checks everything else unchanged. -> (text, n reversed). Without the fur sentence nothing is reversed."""
    if not WINTER_MARK.search(text): return text, 0
    n = 0
    for o, w in FABRIC:
        c = text.count(w); text = text.replace(w, o); n += c
    text, k = PHI_WINTER_RX.subn(lambda m: PHI_ORIG.format(sec=m.group("sec"), main=m.group("main")), text)
    return text, n + k


# G26 FUR LADDER (owner approved 20/11 ~16:50Z): ONE sentence before ' Pose:'; plain ivory for all, width by rank group.
FUR_END = (", visibly warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, "
           "no coloured fur, never covering her face or neck, the neckline keeps its shape.")
FUR = {
 1: "WINTER: a WIDE band of soft plain ivory-white fur trim, about a hand's width, along her collar, the front edges and hem of her outer garment, and her cuffs" + FUR_END,
 2: "WINTER: a VERY WIDE, luxurious band of thick soft plain ivory-white fur trim, wider than at the lower ranks, about two and a half hands wide, "
    "along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and cosy, yet lying smooth and close, never puffy or bulky; "
    "the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.",
 3: "WINTER: the WIDEST, THICKEST and most luxurious band of deep, dense, plush soft plain ivory-white fur trim, far wider and fuller than at any lower rank, "
    "about three and a half hands wide and visibly thick and lush, along her collar, the front edges and hem of her outer garment, and her cuffs, "
    "rich, warm and sumptuous, softly rounded and full, yet neat and elegant; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape."}
def fur_level(rank): return 1 if rank <= 3 else 2 if rank <= 6 else 3
def fur(rank): return FUR[fur_level(rank)]
def is_winter(text): return bool(WINTER_MARK.search(text))
def fabric_form(words):
    """G28 swaps only (no assertion): approved words as they must appear in a winter t1-t6 prompt."""
    for o, w in FABRIC: words = words.replace(o, w)
    return words
def master_form(sentence, winter):
    """master sentence as it must appear (winter: the G28 opaque form of M06)."""
    if not winter: return sentence
    for o, w in FABRIC: sentence = sentence.replace(o, w)
    return sentence
def outfit(text):
    i = text.index("Outfit ("); return text[i:text.index(". ", i) + 1]
ANGLE_RX = re.compile(r"ANGLE: .*?(?= GRACE)")
LIMIT = 10000

def season(text, rank, a36_text=None, season="dong"):
    """MAIN builder season switch. text = build() output (a18/a26 …) for an int rank 1-8; a36_text = the same person/rank built at a36
    (needed for t1-t3: G25 old crossed collar = the builder's own a36 Outfit sentence). -> (text, notes)."""
    assert season == "dong", "only đông (winter) is defined"
    notes = []
    if rank <= 3:
        assert a36_text, "G25 t1-t3 needs the a36 build"; text = text.replace(outfit(text), outfit(a36_text), 1); notes.append("G25 crossed collar")
    if rank <= 6:   # G28 t1-t6 only ("Hqp và hh không đổi vải, vì là gấm rồi")
        text, done = apply(text); notes += ["G28 " + d for d in done]
    assert text.count(" Pose:") == 1
    text = text.replace(" Pose:", " " + fur(rank) + " Pose:", 1); notes.append(f"G26 Lông {fur_level(rank)}")
    if len(text) > LIMIT:   # owner ~15:39Z: OK to cut one side sentence (the ANGLE sentence) when the prompt is too long
        m = ANGLE_RX.search(text)
        if m: text = text.replace(m.group(0) + " ", "", 1); notes.append("ANGLE dropped (length)")
    return text, notes
