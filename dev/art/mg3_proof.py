#!/usr/bin/env python3
"""MG3 proof (owner Lượt 784 items 7-8, Lượt 800 F14, Lượt 806 angle audit): each new check, a GOOD prompt (no FAIL of THAT rule id)
and BROKEN copies (must FAIL with that id). Rule-local: other, older FAILs of the sample text are ignored here (they belong to other rules).
Run: python3 dev/art/mg3_proof.py   (markdown table; exit 1 if any case misbehaves)."""
import os, sys, subprocess, tempfile, json
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
CASES = []   # (rule, label, good_text, args, [(case, text, id)])


def gate(text, args):
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f: f.write(text); fn = f.name
    try: r = subprocess.run([sys.executable, os.path.join(ART, "check_store.py"), fn] + args, capture_output=True, text=True)
    finally: os.unlink(fn)
    return [l.strip() for l in r.stdout.splitlines() if l.strip().startswith("FAIL ")]


def build(*a):
    return subprocess.run([sys.executable, os.path.join(ART, "t8-prompt-B", "build.py")] + list(a), capture_output=True, text=True, cwd=ROOT).stdout


def rows():
    t2 = build("m04", "v0", "--trieu", "2"); t6 = build("m04", "v0", "--trieu", "6")
    t6good = t6.replace("#4F86A8", "#E3A25B")
    yield ("7 B24 rank hex (MG3)", "B24", "triều t2 (build.py --trieu 2)", t2, ["--scope", "trieu2"],
           [("t2 colour swapped to t3 azure", t2.replace("#7FB394", "#7E9CCB"), "B24"), ("t3 colour added beside t2", t2.replace("#7FB394", "#7FB394 with #7E9CCB", 1), "B24")])
    yield ("7 B24 rank hex (MG3)", "B24", "triều t6 with B24 #E3A25B", t6good, ["--scope", "trieu6"],
           [("builder as is: dead option-B #4F86A8", t6, "B24"), ("t7 red #D46A64 added", t6good.replace("#E3A25B", "#E3A25B and #D46A64", 1), "B24")])
    nd = open(os.path.join(ART, "nude-B", "prompts", "m29_a51.txt"), encoding="utf-8").read()
    yield ("F14 no Qing headdress (MG3, Lượt 800)", "F14", "Nữ đế m29 a51", nd, ["--scope", "nude", "--age", "a51"],
           [("'liangbatou' added", nd.replace(" No text, no labels.", " a tall black satin liangbatou headdress. No text, no labels."), "F14"),
            ("'flat-board headdress' added", nd.replace(" No text, no labels.", " a wide flat-board headdress. No text, no labels."), "F14"),
            ("'Qing dynasty' added", nd.replace(" No text, no labels.", " Qing dynasty court style. No text, no labels."), "F14")])


def main():
    out = ["| rule | check id | prompt | case | expected | got | first FAIL line of that id |", "|---|---|---|---|---|---|---|"]; bad = 0
    for rule, cid, label, good, args, broken in rows():
        f = [l for l in gate(good, args) if l.startswith("FAIL " + cid + " ")]; ok = not f; bad += not ok
        out.append(f"| {rule} | {cid} | {label} | GOOD | no {cid} FAIL | **{'PASS' if ok else 'FAIL ✗'}** | {(f[0] if f else '')[:110].replace('|', '/')} |")
        for case, txt, want in broken:
            hit = [l for l in gate(txt, args) if l.startswith("FAIL " + want + " ")]; ok = bool(hit); bad += not ok
            out.append(f"| {rule} | {cid} | | {case} | FAIL {want} | **{'FAIL' if ok else 'PASS ✗'}** | {(hit or [''])[0][:110].replace('|', '/')} |")
    print("\n".join(out)); print(f"\n{bad} case(s) misbehaved"); return 1 if bad else 0


if __name__ == "__main__": sys.exit(main())
