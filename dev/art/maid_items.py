#!/usr/bin/env python3
"""MAID HELD ITEMS (owner L1919, rule E13): one maid person = 9 ranks, every rank holds a DIFFERENT item (different KIND too);
a thân cận never copies her grade's item; the same rank across persons = a different item where possible (FAIL on the exact same item).
Shared by dev/art/maid7/make12_items.py (picker) and check_store.py --maid-items <dir> <tag> (gate)."""
import ast, glob, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "t8-prompt-B"))
import item_age as IA
RANKS = ["thosu", "tam", "tam_thancan", "nhi", "nhi_thancan", "nhat", "nhat_thancan", "chuongsu", "mama_a51"]
# rank -> (builder tier, age) = MAIDFIX3 L1919 plan (build.py age5 pools; thân cận = the tier list of the next age, so never her grade's list)
SLOT = {"thosu": ("tm0", "a18"), "tam": ("tm1", "a18"), "nhi": ("tm2", "a18"), "nhat": ("tm3", "a18"), "chuongsu": ("tm3", "a26"),
        "mama_a51": ("mama", "a51"), "nhat_thancan": ("tm4", "a18"), "tam_thancan": ("tm1", "a26"), "nhi_thancan": ("tm2", "a26")}
SKIP = {"m_broom", "m_herbbag", "m_cane"}   # broom: chưởng sự "never holds a broom"; herb bag = a sachet (G59 no túi thơm); cane = elders only
BIG = {"m_lant", "m_umb", "m_bolt", "m_brocade", "m_food", "m_robe", "m_mend", "m_chrys"}   # too big for a palm / fingertip pose
BIG_OK = {"thosu", "tam", "mama_a51"}   # L1905 hands: only these carry low at the side / in both hands; the other ranks hold it on a palm, in fingertips or raised in one hand
_E6 = None
for n in ast.parse(open(os.path.join(HERE, "t8-prompt-B", "build.py"), encoding="utf-8").read()).body:
    if isinstance(n, ast.Assign) and getattr(n.targets[0], "id", "") == "_E6_KINDS": _E6 = ast.literal_eval(n.value)
EXTRA = [("medicine", r"medicine"), ("sewing", r"sewing|mending|embroidery|thread|needle|scissors"), ("keys", r"\bkeys?\b"),
         ("cloth", r"fabric|brocade|\brobe\b|towels"), ("tray", r"\btray\b"), ("light", r"lantern|candle"),
         ("record", r"account book|ledger|inventory|\blist\b|slip|almanac|sutra"), ("plant", r"potted|flower"), ("abacus", r"abacus")]
def tags(item):
    """Every kind tag the item matches (E6 kinds + maid extras); two items clash when their tag sets overlap."""
    t = {k for k, rx in _E6 + EXTRA if re.search(rx, item)}
    return t or {item}
HOLD = re.compile(r"she holds (?:an? )?(.+?) in a contrasting colour")
def item_of(text):
    m = HOLD.findall(text)
    return m[0] if len(m) == 1 else None
def article(x):
    return x if x.startswith(("her ", "a ", "an ")) else ("an " if x[0] in "aeiou" else "a ") + x
def pick_all(pids):
    """Greedy per person (rank order), person order as given; returns {pid: {rank: (kind, item)}}."""
    out, at_rank = {}, {r: set() for r in RANKS}
    for pid in pids:
        n = int(pid[1:]); j = (n - 1) % 5; used = set(); res = {}
        for rk in RANKS:
            tier, age = SLOT[rk]
            ages = [age] + [a for a in IA.AGE5[tier] if a != age]
            cand = []
            for a in ages:
                L = IA.AGE5[tier][a]; cand += [L[(j + k) % 5] for k in range(5)]
            F = lambda k: IA.fill(k, tier).replace("plain plain ", "plain ")
            ok = [k for k in cand if k not in SKIP and not (rk not in BIG_OK and k in BIG) and not (tags(F(k)) & used)]
            best = next((k for k in ok if F(k) not in at_rank[rk]), ok[0])
            it = IA.fill(best, tier).replace("plain plain ", "plain "); res[rk] = (best, it); used |= tags(it); at_rank[rk].add(it)
        out[pid] = res
    return out
def gate(d, tag):
    """check_store --maid-items: FAIL lines for repeats inside a person or the exact same item at the same rank across persons."""
    bad, per = [], {}
    for f in sorted(glob.glob(os.path.join(d, f"m*_*_{tag}.txt"))):
        b = os.path.basename(f)[:-len(f"_{tag}.txt")]; pid, rk = b.split("_", 1)
        if rk not in RANKS: continue
        it = item_of(open(f, encoding="utf-8").read())
        if it is None: bad.append(f"{b}: no single 'she holds … in a contrasting colour' item phrase"); continue
        per.setdefault(pid, {})[rk] = it
    for pid, R in per.items():
        ks = list(R)
        for i in range(len(ks)):
            for k in ks[i + 1:]:
                if R[ks[i]] == R[k] or tags(R[ks[i]]) & tags(R[k]):
                    bad.append(f"{pid}: {ks[i]} and {k} hold the same item/kind ({R[ks[i]]} | {R[k]}; kinds {sorted(tags(R[ks[i]]) & tags(R[k])) or 'same text'})")
    for rk in RANKS:
        seen = {}
        for pid, R in per.items():
            if rk in R:
                if R[rk] in seen: bad.append(f"rank {rk}: {seen[R[rk]]} and {pid} hold the exact same item ({R[rk]})")
                seen.setdefault(R[rk], pid)
    return bad, per
