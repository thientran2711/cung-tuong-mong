#!/usr/bin/env python3
"""G76 LOW NECKLINE a18–a36 ALL WOMEN (owner L2228, NECK1 for Foreman C / ROOT-B6).

Owner L2228 verbatim: 'Rồi bây giờ giữ cái cổ áo thấp thấp nhất có thể mà ở cái lượt gần nhất bạn gửi tôi á. 2219 cho tất cả
mọi người từ độ tuổi 18 tới 36, tất cả các bậc, tất cả các phẩm, tất cả nhóm người, nói chung là nữ á, từ 51 tới 65 thì mình
không còn đề cập tới cái vấn đề cổ áo thấp hay cao nữa, tức là mình để cái cổ áo về original như ban đầu mà mình vẫn làm.'

Approved wording = dev/handover/prompts_L2095/M2219-01_s62_t6_thu_COTHAP2.txt (M2187-06 -> M2216-01 -> M2219-01): every
collar / neckline phrase goes, ONE phrase (PHRASE) stands where the collar was in the outfit sentence. No cleavage / chest
words are added (owner: no drawn cleavage on purpose; G35). The vân kiên / capelet clasp at the throat STAYS (not the collar).
a51 / a65: never touched (callers only call post() for AGES).

post(text)            -> (text, notes)     builder side (build_all build / season / Thái hậu, maid / princess builders)
store_swap(store, p)  -> store             check_store side: the store text read with the same swaps when prompt p has PHRASE
Kept on purpose (OPEN QUESTIONS in dev/handover/reports/NECK1.md, not guessed): winter fur 'along her collar' / 'the neckline
keeps its shape' (G26 fur order), 'Collar SHAPE exactly as in image 3' (t7/t8 thu ref image), sprig guard 'never inside the
neckline', G69 'CENTRE of the chest' embroidery, 'pearl strands across the chest', vân kiên / capelet 'collar lines'. Hán: EXCLUDED (owner L2234, G62 locked).
"""
import os, re

PHRASE = "a very low, wide, open neckline whose edge lies about a hand's width below the collarbones"
AGES = ("a18", "a26", "a36")
OFF = [False]   # set True around a raw a36 build that feeds an a51/a65 cell (build_all _build_season2, G25 winter words)
SKIP_MARK = ("Hán", "Han-dynasty", "Han dynasty", "HAN_COLLAR", "two-thirds of the way out along the collarbones")
# ^ G62/G66 Hán collar LOCKED (owner L2234 verbatim: 'Cái bộ hán phục, cái cổ áo tôi chốt rồi là không sửa gì hết.'): every Hán prompt is EXCLUDED from G76

_P = PHRASE
_SQ_HEAD = (r"(?:ONE straight SQUARE collar only \(no crossed collar, nothing layered under it\)"
            r"|a straight SQUARE collar \(no crossed collar\))")
_SQ_LOW = r"a LOW open square neckline (?:across the upper chest|just below the collarbones), neck and collarbones bare, NEVER a high stand collar or mandarin collar"
_BAND_TAIL = r" \(the square band stops at the shoulders, nothing rises up the neck, neck bare\)"

# (regex, replacement, note) — applied in order, each everywhere it matches
RULES = [
    # --- the collar clause itself -> PHRASE ---------------------------------------------------------------------------
    (_SQ_HEAD + r"(?::? " + _SQ_LOW + r")?,? framed by [^(),;]*? band(?: in her second colour)?(?: embroidered with [^(),;]+?)?(?:" + _BAND_TAIL + r")?(?:, always fully visible)?(?=[,;])",
     _P, "thu square collar clause + band"),
    (r"a straight SQUARE NECKLINE \(" + _SQ_LOW + r"\) framed by [^(),;]*? band(?:" + _BAND_TAIL + r")?", _P, "thu t3 square neckline + band"),
    (r"a straight SQUARE NECKLINE framed by a wide stiff [^(),;]*? band", _P, "t3 square neckline + stiff band"),
    (r"a modest snug crossed-collar neckline framed by a wide stiff [^(),;]*? band", _P, "t3 a36 crossed collar + band"),
    (r"an OPEN SQUARE NECKLINE \(style 1[^)]*\):[^;]*", _P, "t1/t2 style-1 square opening"),
    (r"a SQUARE neckline at a modest height \(no crossed collar\), framed \(across the upper chest AND up both sides to the shoulders\) by a wide flat pearl-edged gold-embroidered band(?:, always fully visible)?",
     _P, "t7/t8 framed square neckline"),
    (r"a snug crossed-collar upper garment with ", "a snug upper garment with " + _P + ", ", "t1 crossed-collar upper garment"),
    (r", a crossed collar,", ", " + _P + ",", "t4 crossed collar"),
    (r", and her own collar: a high upright round standing collar of deep brocade fastened at the throat with a small jade button \(not a crossed collar, not a cloud collar\)",
     ", and " + _P, "Thái hậu a36 standing collar (K5 sheet3)"),
    # --- garments with no collar words at all (root/xuân/hạ/đông t2, t5, t6): PHRASE goes into the outfit noun --------
    (r"a fine silk robe with delicate embroidered ([^,;]+?) at the collar, sleeves and hem",
     r"a fine silk robe with " + _P + r", delicate embroidered \1 at the sleeves and hem", "t2 robe (no collar words)"),
    (r"(court robe of two or three visible layers, richly embroidered in gold with [^,;]+? and small birds),(?! the body motifs)(?! a very low)",
     r"\1, " + _P + ",", "t5 Phi robe (no collar words)"),
    (r"(SATURATED [^,;]+? silk, embroidered with [^,;]+? and gold thread along the borders), (TWO layered embroidered)",
     r"\1, " + _P + r", \2", "t6 Quý phi robe (no collar words)"),
    # --- collar mentions that remain (guards / trims / positions) --------------------------------------------------------
    (r" at collar, sleeves and hem", " at sleeves and hem", "borders 'at collar'"),
    (r" at the collar, sleeves and hem", " at the sleeves and hem", "embroidery 'at the collar'"),
    (r"never a round collar, never a V, NO crossed wrap collar; ", "", "t1/t2 collar-shape guard sentence"),
    (r"NO crossed wrap collar, ", "", "t3 crossed-collar negation"),
    (r"(?<=; )NO crossed wrap collar; ", "", "B26-cut 'NO crossed wrap collar' sentence"),
    (r", its two front edges parting so the square (?:collar|neckline) stays fully visible(?:, never hiding it)?", "", "vân kiên/capelet 'square collar visible' guard"),
    (r", never hiding the square collar", "", "'never hiding the square collar'"),
    (r"its front open so the square collar stays fully visible", "its front open", "t8 vân kiên 'square collar visible'"),
    (r"its front cut away so the square neckline stays fully visible", "its front cut away", "t8 cloud collar 'square neckline visible'"),
    (r", the embroidered square collar fully visible below it", "", "t7/t8 thu 'square collar visible below it'"),
    (r"its front CUT AWAY square,", "its front CUT AWAY,", "t7 thu 'cut away square'"),
    (r", never covering the neck or the square neckline\)", ", never covering the neck)", "t7 cloud collar guard"),
    (r", never covering the neckline", "", "cloud collar / net 'never covering the neckline'"),
    (r", never rising up the neck", "", "'never rising up the neck'"),
    (r"(?<=; )never rising up the neck, ", "", "'never rising up the neck' (clause start)"),
    (r", never up the neck", "", "'never up the neck'"),
    (r" just below the square neckline, framed by the square band,", ",", "t5 thu chest cluster position"),
    (r" below the square neckline", "", "t7 thu phoenix position"),
    (r" below the collar(?=,)", "", "'below the collar'"),
    (r" \(never at the neckline\)", "", "'(never at the neckline)'"),
    (r" \(only a narrow yellow edge on the neckline band\)", "", "'narrow yellow edge on the neckline band'"),
    (r" \(the edge of the neckline band, ", " (", "'edge of the neckline band'"),
    (r"narrow yellow borders at the neckline band edge, ", "narrow yellow borders at ", "'neckline band edge'"),
    (r" along the neckline band and the borders", " along the borders", "pearls 'along the neckline band'"),
    (r", the neckline band and the cuffs", " and the cuffs", "pearls 'the neckline band'"),
    (r"wide yellow borders along the neckline, sleeves and hem", "wide yellow borders along the sleeves and hem", "t7 yellow 'along the neckline'"),
    (r", a broad yellow collar and a wide inner panel", " and a wide inner panel", "t7 'broad yellow collar'"),
    (r"\(collar, inner robe", "(inner robe", "t8 / Thái hậu '(collar, inner robe'"),
    (r"a pearl-edged collar and cloud-collar trim", "a pearl-edged cloud-collar trim", "t6 'pearl-edged collar'"),
    (r", a pearl-edged collar trim,", ",", "t6 'pearl-edged collar trim'"),
    (r"NEVER on the robe, collar or belt", "NEVER on the robe or belt", "gems 'collar'"),
    (r" The INNER robe \(the under-layer\) shows at the neckline ONLY as a thin flat edge, never an extra visible layer stacked at the neckline; "
     r"where it shows at the front opening it is LIGHTLY embroidered: a few small sprigs of her flower, in fine flat silk thread, plain cloth between them; calm, never busy\.",
     "", "INNER robe neckline sentence"),
]
_RX = [(re.compile(a), b, n) for a, b, n in RULES]


def post(text):
    """builder side: L2228 low neckline (call ONLY for AGES). -> (text, notes)"""
    if OFF[0] or os.environ.get("G76_OFF") or any(m in text for m in SKIP_MARK): return text, []   # G76_OFF=1: before/after diffs only
    notes = []
    for rx, rep, n in _RX:
        text, k = rx.subn(rep, text)
        if k: notes.append(f"L2228 {n} x{k}")
    return text, notes


_INNER = RULES[[n for _, _, n in RULES].index("INNER robe neckline sentence")][0].replace("\\", "")


def touches(sentence):
    """True when post() would change this sentence (or it is a piece of the INNER-robe neckline sentence)."""
    x = sentence.strip()
    return bool(x) and (post(" " + x + " ")[0] != " " + x + " " or x.rstrip(".;") in _INNER)


def store_swap(store, prompt):
    """check_store side: when the prompt carries PHRASE, read the store text with the same swaps."""
    if PHRASE not in prompt: return store
    import master_common   # the L2119 old->new store words whose new form only shows in the prompt after G76 (e.g. the gem line)
    for old, new, _ in master_common.L2119_SWAPS:
        if old in store and old not in prompt and post(new)[0] != new and post(new)[0] in prompt: store = store.replace(old, new)
    return post(store)[0]


def residue(text):
    """collar / neckline words still left after post() (for audits)."""
    return [m.group(0) for m in re.finditer(r"[^,;:.()]*\b(?:collar|neckline|collarbones?)\b[^,;:.()]*", text)]


if __name__ == "__main__":
    import sys
    s = open(sys.argv[1], encoding="utf-8").read() if len(sys.argv) > 1 and sys.argv[1] != "-" else sys.stdin.read()
    o, n = post(s); print(o, end=""); print("\n".join(n), file=sys.stderr)
