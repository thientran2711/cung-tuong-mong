#!/usr/bin/env python3
"""LEDGER GUARD (owner Lượt 777 via L784 item 8, MG3): ~500–600k credits were burned on redraws nobody asked for.
A gen for a person + age + state that ALREADY has a cut in dev/art/gen_ledger.jsonl is a REDRAW and needs the owner's yes:
the ledger line must carry "owner_ok": "Lượt N" (the owner's turn that ordered it). Run the guard BEFORE the gen:

  python3 dev/art/ledger_guard.py --person m05 --age a36 --state nude [--owner-ok "Lượt 781"]
      exit 0 = first drawing, or redraw with owner_ok  ·  exit 1 = FAIL: redraw without owner_ok -> do NOT generate
  python3 dev/art/ledger_guard.py --audit [--since 2026-11-19T18:00:00Z]
      lists ledger lines that redrew an already-cut person/age/state without owner_ok (exit 1 if any)

state = what was drawn for that person: nude (Nữ đế set B), thaihau, tN (rank N figure), face, trieuN, … — free text, but use the same word
every time (painters: the ledger "state" field; old lines without it are read from kind/store_args, see key()).
Painters: put "owner_ok": "Lượt N" in the ledger line of every redraw (nude-B/log.py: env NDX_OWNER_OK="Lượt N")."""
import json, os, re, sys, argparse
ART = os.path.dirname(os.path.abspath(__file__)); LEDGER = os.path.join(ART, "gen_ledger.jsonl")


def key(d):
    """-> (person, age, state) or None when the line names no person+age."""
    p = d.get("person"); a = d.get("age") or "a18"
    if not p:
        m = re.search(r"\b([mcs]\d\d)\b.*?\b(thaihau|nude|trieu ?\d|t\d)\b", " ".join(str(d.get(k, "")) for k in ("cmd", "store_args")))
        if not m: return None
        p = m.group(1); st = m.group(2).replace(" ", "")
        am = re.search(r"--age (a\d\d)", str(d.get("cmd", "")) + " " + str(d.get("store_args", ""))); a = am.group(1) if am else a
        return (p, a, st)
    st = d.get("state")
    if not st:
        k = str(d.get("kind", "")); sa = str(d.get("store_args", ""))
        st = ("nude" if "NUDE" in k or "--state nude" in sa else "thaihau" if "THAIHAU" in k or "thaihau" in sa else
              (re.search(r"--trieu (\d)", sa) and "trieu" + re.search(r"--trieu (\d)", sa).group(1)) or
              (re.search(r"\b(t\d)\b", sa) and re.search(r"\b(t\d)\b", sa).group(1)) or k.lower() or "?")
    return (p, a, st)


def lines():
    for l in open(LEDGER, encoding="utf-8"):
        l = l.strip()
        if not l: continue
        try: yield json.loads(l)
        except ValueError: continue


def has_cut(d): return bool(d.get("cut_id")) and d.get("cut_id") not in ("-", None)


def check(person, age, state, owner_ok=None):
    prior = [d for d in lines() if key(d) == (person, age, state) and has_cut(d)]
    if not prior: return 0, f"LEDGER GUARD PASS {person} {age} {state}: first drawing"
    if owner_ok and re.fullmatch(r"Lượt \d+", owner_ok.strip()):
        return 0, f"LEDGER GUARD PASS {person} {age} {state}: redraw ({len(prior)} earlier cut(s)) with owner_ok {owner_ok}"
    return 1, (f"LEDGER GUARD FAIL {person} {age} {state}: already drawn ({len(prior)} cut(s), last {prior[-1].get('cut_id')} at {prior[-1].get('ts')}) "
               f"-> a redraw needs the owner's yes: --owner-ok \"Lượt N\" + \"owner_ok\" in the ledger line (Lượt 777). Do NOT generate.")


def audit(since=""):
    seen, bad = {}, []
    for d in lines():
        k = key(d)
        if not k: continue
        if k in seen and has_cut(seen[k]) and d.get("gen_id") and str(d.get("ts", "")) >= since and not d.get("owner_ok"):
            bad.append((d.get("ts"), d.get("kind"), k, d.get("gen_id")))
        if has_cut(d): seen[k] = d
    return bad


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--person"); ap.add_argument("--age", default="a18"); ap.add_argument("--state"); ap.add_argument("--owner-ok")
    ap.add_argument("--audit", action="store_true"); ap.add_argument("--since", default="")
    a = ap.parse_args()
    if a.audit:
        b = audit(a.since)
        for x in b: print("REDRAW WITHOUT owner_ok:", *x)
        print(f"{len(b)} redraw line(s) without owner_ok" + (f" since {a.since}" if a.since else "")); return 1 if b else 0
    if not (a.person and a.state): ap.error("--person and --state are required")
    rc, msg = check(a.person, a.age, a.state, a.owner_ok); print(msg); return rc


if __name__ == "__main__": sys.exit(main())
