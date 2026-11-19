#!/usr/bin/env python3
"""APPROVED CHECK (owner Lượt 500): every prompt must carry the owner-APPROVED sentences of its scope VERBATIM
(only {slot} words may differ) and none of the BANNED phrases. FAIL = do NOT generate.

Registry = dev/art/APPROVED_SENTENCES.md (entries S.., banned X..). Never rewrite a registry sentence: it is copied
from the prompt of a picture the owner approved; a new owner approval is ADDED there the same turn (foreman).

Usage
  python3 dev/art/check_approved.py PROMPT_FILE --scope tp3 [--age a51]   # thường phục rank 3 (consorts c.., maids m..); age picks age-only entries
        scopes: tp1..tp8 | pr1..pr8 (princess p01-p03) | trieu1..trieu8 | mama | nude (Nữ đế)
  python3 dev/art/check_approved.py PROMPT_FILE --store-args c20 v0 --low 1     # scope from check_store / build.py args
  python3 dev/art/check_approved.py --self      # registry self-test: every entry still matches its proof prompt
  python3 dev/art/check_approved.py --audit     # run over every current builder/prompt -> dev/art/APPROVED_AUDIT.md
Exit 0 = APPROVED CHECK PASS, 1 = FAIL. "confirm" scopes (owner still to confirm the rule there) only WARN.
Ledger lines of every gen carry "approved_check": "PASS"."""
import sys, os, re, json, glob, collections
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
REG = os.path.join(ART, "APPROVED_SENTENCES.md")
NEG = re.compile(r"\b(no|not|never|without|nothing|none|nor)\b", re.I)


def norm(s): return re.sub(r"\s+", " ", s).strip()


# ---------------- registry ----------------
def load_registry(path=REG):
    ents, cur = [], None
    for line in open(path, encoding="utf-8"):
        m = re.match(r"^### ([SX]\d+[a-z]?) · (.*)$", line.rstrip("\n"))
        if m:
            cur = {"id": m.group(1), "title": m.group(2)}; ents.append(cur); continue
        m = re.match(r"^- (\w+): ?(.*)$", line.rstrip("\n"))
        if m and cur is not None and m.group(1) not in cur:
            v = m.group(2)
            if m.group(1) in ("text", "regex") and v.startswith("`") and v.endswith("`"): v = v[1:-1]
            cur[m.group(1)] = v
    S = [e for e in ents if e["id"].startswith("S")]; X = [e for e in ents if e["id"].startswith("X")]
    for e in S: assert e.get("text") and e.get("scope") is not None, ("registry entry incomplete", e["id"])
    for e in X: assert (e.get("regex") or e.get("slot")) and e.get("scope"), ("banned entry incomplete", e["id"])
    return S, X


def slot_rx(txt):
    out = ""
    for p in re.split(r"(\{[a-z_]+\})", norm(txt)):
        out += "(?P<%s>.{1,220}?)" % p[1:-1] if re.fullmatch(r"\{[a-z_]+\}", p) else re.escape(p)
    return re.compile(out)


def parse_scope(spec):
    """'tp1-6 pr1-6 mama' -> set of scope tokens {'tp1',...,'mama'}; 'all' -> every token."""
    toks = set()
    for t in (spec or "").replace(",", " ").split():
        if t in ("-", "—"): continue
        if t == "all":
            for k in ("tp", "pr", "trieu"): toks |= {f"{k}{i}" for i in range(1, 9)}
            toks |= {"mama", "nude"}; continue
        m = re.fullmatch(r"([a-z]+)(\d)(?:-(\d))?", t)
        if m:
            a = int(m.group(2)); b = int(m.group(3) or a); toks |= {f"{m.group(1)}{i}" for i in range(a, b + 1)}
        else: toks.add(t)
    return toks


def scope_from_store_args(args):
    """check_store / t8-prompt-B build.py args -> scope token."""
    person = next((a for a in args if re.fullmatch(r"[a-z]+\d\d|bt|cl|pt", a)), "")
    pre = "pr" if person in ("p01", "p02", "p03", "bt", "cl", "pt") else "tp"
    if "--state" in args:
        st = args[args.index("--state") + 1]
        return {"mama": "mama", "nude": "nude"}.get(st, "state:" + st)
    if "--nude3" in args or "nude" in args: return "nude"
    if "--low" in args: return f"{pre}{int(args[args.index('--low') + 1])}"
    if "--t7" in args: return f"{pre}7"
    return f"{pre}8"


def negated(text, a, b):
    """True when the clause around text[a:b] (bounded by . ; : ( ) ) carries a negation word."""
    lo = max(text.rfind(c, 0, a) for c in ".;:()"); hi = [text.find(c, b) for c in ".;:()"]; hi = min([h for h in hi if h >= 0] or [len(text)])
    return bool(NEG.search(text[lo + 1:hi]))


def best_overlap(sentence, text):
    w = set(re.findall(r"[a-zA-Z']+", re.sub(r"\{[a-z_]+\}", " ", sentence).lower()))
    best = 0
    for s in re.split(r"(?<=[.;])\s+", text):
        best = max(best, len(w & set(re.findall(r"[a-zA-Z']+", s.lower()))) / max(1, len(w)))
    return best


def check_text(text, scope, S=None, X=None, age=None):
    """-> (fails, warns, slots) ; fails/warns = list of (id, kind, detail)."""
    if S is None: S, X = load_registry()
    text = norm(text); fails, warns, found = [], [], {}
    for e in S:
        req = scope in parse_scope(e["scope"]); conf = scope in parse_scope(e.get("confirm", ""))
        if not (req or conf): continue
        ages = (e.get("ages") or "all").split()
        if age and "all" not in ages and age not in ages: continue
        m = slot_rx(e["text"]).search(text)
        if m: found[e["id"]] = m.groupdict(); continue
        ov = best_overlap(e["text"], text)
        item = (e["id"], "REWRITTEN" if ov >= 0.6 else "MISSING", f"{e['title']} (best overlap {ov:.0%})")
        (fails if req else warns).append(item)
    for x in X:
        if scope not in parse_scope(x["scope"]): continue
        if x.get("unless") and x["unless"] in found: continue
        if x.get("slot"):
            sid, sname = x["slot"].split(".")
            v = (found.get(sid) or {}).get(sname)
            if v and re.search(x["regex"], v, re.I): fails.append((x["id"], "BANNED", f"{x['title']}: {sid}.{sname} = '{v}'"))
            continue
        for m in re.finditer(x["regex"], text, re.I if x.get("case", "i") == "i" else 0):
            if x.get("negation", "yes") == "yes" and negated(text, m.start(), m.end()): continue
            ctx = text[max(0, m.start() - 50):m.end() + 30]
            fails.append((x["id"], "BANNED", f"{x['title']}: …{ctx}…")); break
    return fails, warns, found


def report(fn, scope, fails, warns, out=sys.stdout):
    for i, k, d in fails: print(f"  FAIL {i} {k}: {d}", file=out)
    for i, k, d in warns: print(f"  WARN {i} {k} (owner to confirm scope): {d}", file=out)
    print(("APPROVED CHECK FAIL" if fails else "APPROVED CHECK PASS"), fn, "scope", scope, file=out)


# ---------------- self test ----------------
def selftest():
    S, X = load_registry(); bad = 0
    for e in S:
        p = os.path.join(ROOT, e.get("proof", ""))
        if not os.path.isfile(p): print("NO PROOF FILE", e["id"], e.get("proof")); bad += 1; continue
        if not slot_rx(e["text"]).search(norm(open(p, encoding="utf-8").read())): print("PROOF MISMATCH", e["id"], e["proof"]); bad += 1
    for x in X:
        if x.get("regex"): re.compile(x["regex"])
    print(f"registry self-test: {len(S)} sentences, {len(X)} banned, {bad} problem(s)"); return 1 if bad else 0


# ---------------- audit ----------------
def _build_all():
    import importlib.util, io, contextlib
    old = sys.argv; sys.argv = ["build_all.py"]
    spec = importlib.util.spec_from_file_location("build_all_audit", os.path.join(ART, "store-all", "build_all.py"))
    m = importlib.util.module_from_spec(spec)
    try: spec.loader.exec_module(m)
    finally: sys.argv = old
    return m


def audit_sources():
    """yield (group, label, scope, text) for every current builder output / prompt file."""
    ba = _build_all(); ages = ["a18", "a26", "a36", "a51", "a65"]
    for p in ba.PEOPLE:
        pre = "pr" if p in ba.PR else "tp"; grp = "princess" if pre == "pr" else ("consort" if p[0] == "c" else "maid-person")
        for t in range(1, 9):
            for a in ages:
                try: txt = ba.build(p, t, a)[1]
                except Exception as ex:  # noqa
                    yield (f"thường phục {grp}", f"{p} t{t} {a}", f"{pre}{t}", None); continue
                yield (f"thường phục {grp}", f"{p} t{t} {a}", f"{pre}{t}", txt)
    for i in range(1, 33):
        for a in ages:
            yield ("Nữ đế (build_all nude)", f"c{i:02d} nude {a}", "nude", ba.build(f"c{i:02d}", "nude", a)[1])
    tr = os.path.join(ART, "owner-copy", "trieu")
    for t in range(1, 9):
        f = os.path.join(tr, "r21" if t <= 6 else "r18", f"t{t}_c06_RAN.txt")
        yield ("triều phục (r21 t1-t6 + r18 t7/t8)", os.path.relpath(f, ROOT), f"trieu{t}", open(f, encoding="utf-8").read())
    for f in sorted(glob.glob(os.path.join(ROOT, "dev/handover/reports/mama-specs/*.prompt.txt"))):
        g = "ma ma one-ref (current, MMX1b)" if ".oneref." in f else "ma ma 3-ref (older spec files)"
        yield (g, os.path.relpath(f, ROOT), "mama", open(f, encoding="utf-8").read())


def audit(outpath):
    S, X = load_registry(); titles = {e["id"]: e["title"] for e in S + X}
    groups = collections.OrderedDict(); per = collections.defaultdict(collections.Counter); where = collections.defaultdict(lambda: collections.defaultdict(list))
    warnc = collections.defaultdict(collections.Counter); errs = []
    for grp, label, scope, txt in audit_sources():
        m_age = re.search(r"\b(a18|a26|a36|a51|a65)\b", label); age = m_age.group(1) if m_age else None
        g = groups.setdefault(grp, collections.Counter()); g["prompts"] += 1
        if txt is None: g["builder error"] += 1; errs.append(label); continue
        f, w, _ = check_text(txt, scope, S, X, age)
        g["PASS" if not f else "FAIL"] += 1
        for i, k, d in f:
            per[grp][(i, k)] += 1
            if len(where[grp][(i, k)]) < 6: where[grp][(i, k)].append(label)
        for i, k, d in w: warnc[grp][(i, k)] += 1
    L = ["# APPROVED AUDIT — which approved sentence is missing / which banned phrase is present (AP1, owner Lượt 500)", "",
         "Generated by `python3 dev/art/check_approved.py --audit` against dev/art/APPROVED_SENTENCES.md. REPORT ONLY: no builder prompt text was changed "
         "(the fix is a later owner-approved step). FAIL = that prompt may NOT be generated. WARN = sentence of a scope the owner still has to confirm (no block).", "",
         "Sources: build_all.py (thường phục: 32 consorts c01–c32, 52 maid-persons m01–m52, 3 princesses p01–p03; t1–t8 × a18/a26/a36/a51/a65; Nữ đế c01–c32 × 5 ages), "
         "triều phục dev/art/owner-copy/trieu (r21 t1–t6 + r18 t7/t8, c06 — the only person drawn), ma ma dev/handover/reports/mama-specs/*.prompt.txt.", "",
         "## Totals", "", "| group | prompts | PASS | FAIL |", "|---|---|---|---|"]
    tot = collections.Counter()
    for grp, c in groups.items():
        L.append(f"| {grp} | {c['prompts']} | {c['PASS']} | {c['FAIL']} |"); tot.update(c)
    L.append(f"| **all** | **{tot['prompts']}** | **{tot['PASS']}** | **{tot['FAIL']}** |")
    if errs: L += ["", f"Builder errors ({len(errs)}): " + ", ".join(errs[:20])]
    L += ["", "## What fails, where (count = prompts in that group)", "", "| group | ID | problem | sentence / banned phrase | prompts | examples |", "|---|---|---|---|---|---|"]
    for grp in groups:
        for (i, k), n in sorted(per[grp].items(), key=lambda kv: (-kv[1], kv[0])):
            L.append(f"| {grp} | {i} | {k} | {titles.get(i, i)} | {n} | {', '.join(where[grp][(i, k)])} |")
    L += ["", "## WARN only (scope the owner still has to confirm; not blocking)", "", "| group | ID | problem | sentence | prompts |", "|---|---|---|---|---|"]
    for grp in groups:
        for (i, k), n in sorted(warnc[grp].items(), key=lambda kv: (-kv[1], kv[0])):
            L.append(f"| {grp} | {i} | {k} | {titles.get(i, i)} | {n} |")
    L += ["", "MISSING = the approved sentence is not in the prompt at all (best word overlap < 60 %). REWRITTEN = a similar sentence is there but not the approved words "
          "(overlap ≥ 60 %): somebody wrote new text instead of copying. BANNED = a banned phrase is present (negated uses such as 'never looking down' are ignored).", ""]
    notes = os.path.join(ART, "approved", "AUDIT_NOTES.md")
    if os.path.exists(notes): L += ["", open(notes, encoding="utf-8").read()]
    open(outpath, "w", encoding="utf-8").write("\n".join(L))
    print("\n".join(L[8:8 + len(groups) + 3])); print("wrote", os.path.relpath(outpath, ROOT))
    return tot


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help"): print(__doc__); sys.exit(0)
    if a[0] == "--self": sys.exit(selftest())
    if a[0] == "--audit":
        out = a[a.index("--out") + 1] if "--out" in a else os.path.join(ART, "APPROVED_AUDIT.md"); audit(out); sys.exit(0)
    fn = a[0]
    if "--scope" in a: scope = a[a.index("--scope") + 1]
    elif "--store-args" in a: scope = scope_from_store_args(a[a.index("--store-args") + 1:])
    else: print("need --scope or --store-args"); sys.exit(2)
    age = a[a.index("--age") + 1] if "--age" in a else ("a18" if "--store-args" in a else None)
    f, w, _ = check_text(open(fn, encoding="utf-8").read(), scope, age=age)
    report(fn, scope, f, w); sys.exit(1 if f else 0)
