"""G28 WINTER FABRIC (owner ~19:20Z / ~19:22Z / ~19:24Z 20/11, answer A) — ONE copy of the winter fabric swaps, shared by
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
