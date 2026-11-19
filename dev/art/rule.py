#!/usr/bin/env python3
"""rule.py — keep dev/art/ART_RULES.md one line per rule (owner Lượt 480).

  rule.py find <words…>                         list matching rules (accents optional, VN or EN)
  rule.py set <ID> "<new text>" --luot N [--fg L] REPLACE rule ID in place; old line -> ART_RULES_HISTORY.md
  rule.py add <A-N> "<text>" --luot N [--fg L] [--force]
                                                new rule, next ID in that topic; refused if a
                                                similar rule exists (use find/set instead)
  rule.py check                                 duplicate IDs, likely duplicate rules, line count

Rule line format:  ID | rule text | source | FG lines [| over: …]
"""
import argparse, datetime, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
RULES = os.path.join(HERE, "ART_RULES.md")
HIST = os.path.join(HERE, "ART_RULES_HISTORY.md")
LINE_RE = re.compile(r"^([A-N])(\d+) \| ")
STOP = set("""a an the and or of to in on at for with by is are be as it its this that from per
never no not only all any every each her his their she he one two into than then more less
same own new old rank ranks t1 t2 t3 t4 t5 t6 t7 t8 fg luot over see rule rules""".split())
DUP_LIMIT = 0.45      # Jaccard of content words inside one topic
XDUP_LIMIT = 0.75     # overlap coefficient across topics (check)
ADD_LIMIT = 0.60      # overlap coefficient against ANY rule (add refuses)
# Vietnamese owner words -> English rule words (accent-folded keys; longest first)
VN = {"tay ao": "sleeve", "co ao": "collar", "goc dung": "angle", "goc": "angle", "tu the": "pose",
      "dang dung": "pose", "do cam": "item", "mon cam": "item", "cam tay": "item", "toc": "hair",
      "tram cai": "hairpin", "tram": "hairpin", "hoa cai": "flower", "hoa": "flower", "mau": "colour",
      "vang": "yellow", "phuong": "phoenix", "rong": "dragon", "theu": "embroidery", "vai": "fabric",
      "gam": "brocade", "mat": "face", "cuoi": "smile", "rang": "teeth", "mieng": "mouth", "tuoi": "age",
      "phong": "room", "giuong": "bed", "ghe": "seating", "trieu phuc": "trieu", "thuong phuc": "thuong",
      "phi bach": "phi bach", "khan choang": "phi bach", "mu phuong": "crown", "mu": "crown",
      "ha bi": "ha bi", "bi truy": "bi truy", "cau vai": "cau vai", "hot": "hot", "da": "skin",
      "chan": "legs", "nguoi moi": "new person", "mau duyet": "sample", "duyet": "approve",
      "anh mau": "reference", "nen trong": "transparent", "skin": "skin", "ve lai": "redraw"}


def fold(s):
    """lower-case, strip Vietnamese accents (đ -> d)."""
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    return "".join(c for c in s if unicodedata.category(c) != "Mn").lower()


def words(s):
    return {w for w in re.findall(r"[a-z0-9]+", fold(s)) if len(w) > 1 and w not in STOP}


def jaccard(a, b):
    return len(a & b) / max(1, len(a | b))


def load():
    with open(RULES, encoding="utf-8") as f:
        return f.read().split("\n")


def save(lines):
    with open(RULES, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def rules(lines):
    """yield (index, id, letter, number, fields)"""
    for i, l in enumerate(lines):
        m = LINE_RE.match(l)
        if m:
            yield i, m.group(1) + m.group(2), m.group(1), int(m.group(2)), [p.strip() for p in l.split(" | ")]


def show(f, width=230):
    txt = f[1] if len(f[1]) <= width else f[1][:width - 1] + "…"
    src = f[2] if len(f) > 2 else ""
    print(f"{f[0]:<4} {txt}\n     [{src}]" + (f" FG {f[3].replace('FG', '').strip()}" if len(f) > 3 else ""))


def overlap(a, b):
    return len(a & b) / max(1, min(len(a), len(b)))


def query_terms(ws):
    """fold the query; each Vietnamese owner word/phrase becomes (vn, en) alternatives."""
    q = " " + fold(" ".join(ws)) + " "
    terms = []
    for k in sorted(VN, key=len, reverse=True):
        if f" {k} " in q:
            terms.append({k, VN[k]}); q = q.replace(f" {k} ", " ")
    terms += [{w} for w in q.split()]
    return terms


def hit(alts, hay):
    # word-boundary prefix match: "sleeve" hits "sleeves", "tay ao" hits "tay ao"
    return any(re.search(r"(?<![a-z0-9])" + re.escape(t), hay) for t in alts)


def cmd_find(a):
    q = query_terms(a.words)
    hits = []
    for _, rid, _, _, f in rules(load()):
        hay = fold(" | ".join(f))
        n = sum(1 for alts in q if hit(alts, hay))
        if n:
            hits.append((n, rid, f))
    if not hits:
        print("no rule matches:", " ".join(a.words)); return 1
    best = max(h[0] for h in hits)
    hits = sorted([h for h in hits if h[0] == best], key=lambda h: (h[1][0], int(h[1][1:])))
    print(f"{len(hits)} rule(s) match {best}/{len(q)} word(s):")
    for _, _, f in hits:
        show(f)
    return 0


def stamp(luot):
    return f"Lượt {luot} ({datetime.date.today():%d/%m})"


def cmd_set(a):
    lines = load()
    for i, rid, _, _, f in rules(lines):
        if rid == a.id.upper():
            old = lines[i]
            over = [p for p in f[4:] if p]
            prev = f[2] if len(f) > 2 else ""
            over_txt = "over: " + "; ".join(x for x in [prev] + [o.replace("over:", "").strip() for o in over] if x)
            new = " | ".join([rid, a.text.strip(), stamp(a.luot), "FG " + (a.fg or "-"), over_txt])
            lines[i] = new
            save(lines)
            hist_add(f"- {datetime.date.today():%Y-%m-%d} · replaced by Lượt {a.luot} · {old}")
            print("OLD:", old); print("NEW:", new); return 0
    print("no rule", a.id); return 1


def hist_add(line):
    head = "# ART RULES HISTORY — old rule lines replaced by `rule.py set` (newest last)\n"
    if not os.path.exists(HIST):
        with open(HIST, "w", encoding="utf-8") as f:
            f.write(head)
    with open(HIST, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def cmd_add(a):
    letter = a.letter.upper()
    if not re.fullmatch(r"[A-N]", letter):
        print("topic letter must be A–N"); return 1
    lines = load()
    allr = list(rules(lines))
    mine = [(i, n, f) for i, _, l, n, f in allr if l == letter]
    w = words(a.text)
    close = sorted(((overlap(w, words(f[1])), f) for *_, f in allr), key=lambda x: -x[0])
    if close and close[0][0] >= ADD_LIMIT and not a.force:
        print(f"REFUSED: similar rule exists (overlap {close[0][0]:.2f}) — use `rule.py set {close[0][1][0]} ...` or --force:")
        show(close[0][1]); return 1
    n = max([n for _, n, _ in mine] or [0]) + 1
    new = " | ".join([f"{letter}{n}", a.text.strip(), stamp(a.luot), "FG " + (a.fg or "-")])
    if mine:
        at = mine[-1][0] + 1
    else:
        at = next((i + 1 for i, l in enumerate(lines) if l.startswith(f"## {letter}.")), len(lines))
    lines.insert(at, new)
    save(lines)
    print("ADDED:", new); return 0


def cmd_check(a):
    lines = load()
    rs = list(rules(lines))
    seen, bad = {}, 0
    for i, rid, *_ in rs:
        if rid in seen:
            print(f"DUPLICATE ID {rid}: lines {seen[rid] + 1} and {i + 1}"); bad += 1
        seen[rid] = i
    by = {}
    for _, rid, l, _, f in rs:
        by.setdefault(l, []).append((rid, words(f[1])))
    flagged = 0
    for l, items in sorted(by.items()):
        for x in range(len(items)):
            for y in range(x + 1, len(items)):
                j = jaccard(items[x][1], items[y][1])
                if j >= DUP_LIMIT:
                    print(f"LIKELY DUPLICATE {items[x][0]} ~ {items[y][0]} (overlap {j:.2f})"); flagged += 1
    flat = [(rid, w) for _, items in sorted(by.items()) for rid, w in items]
    for x in range(len(flat)):
        for y in range(x + 1, len(flat)):
            if flat[x][0][0] != flat[y][0][0] and overlap(flat[x][1], flat[y][1]) >= XDUP_LIMIT:
                print(f"LIKELY DUPLICATE (cross-topic) {flat[x][0]} ~ {flat[y][0]}"); flagged += 1
    print(f"{len(lines)} lines, {len(rs)} rules, {flagged} likely duplicate pair(s), {bad} duplicate id(s)")
    return 1 if bad else 0


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    s = p.add_subparsers(dest="cmd", required=True)
    f = s.add_parser("find"); f.add_argument("words", nargs="+"); f.set_defaults(fn=cmd_find)
    t = s.add_parser("set"); t.add_argument("id"); t.add_argument("text"); t.add_argument("--luot", required=True)
    t.add_argument("--fg"); t.set_defaults(fn=cmd_set)
    d = s.add_parser("add"); d.add_argument("letter"); d.add_argument("text"); d.add_argument("--luot", required=True)
    d.add_argument("--fg"); d.add_argument("--force", action="store_true"); d.set_defaults(fn=cmd_add)
    c = s.add_parser("check"); c.set_defaults(fn=cmd_check)
    a = p.parse_args()
    sys.exit(a.fn(a))


if __name__ == "__main__":
    main()
