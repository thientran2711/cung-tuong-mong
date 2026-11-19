#!/usr/bin/env python3
"""MG1 gate proof (owner B25 / A19 Lượt 766): for each scope, 1 GOOD prompt (straight from its builder) + 3 BROKEN copies
(a) master block removed, (b) one master sentence edited (one word), (c) the 'thướt tha' FABRIC sentence (M06) dropped
-> run dev/art/check_store.py on each; GOOD must PASS, every BROKEN must FAIL. Prints a markdown table; exit 1 if any case misbehaves.
Run: python3 dev/art/mg1_gate_proof.py [face|store|all]"""
import os, sys, subprocess, tempfile
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); import master_common as MC
B = os.path.join(ART, "t8-prompt-B")


def run(cmd, cwd=ROOT):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True); return r.returncode, r.stdout, r.stderr


def face_good():
    sys.path.insert(0, os.path.join(ART, "face-common")); import face_gate
    return face_gate.final(open(os.path.join(ART, "face-common", "s46.v5.FULL.txt"), encoding="utf-8").read(), "s46"), ["--scope", "face"], "face · s46.v5 (make_lanhlung_L761 recipe) + face_gate.final"


def store(args, scope_args, label):
    rc, out, err = run(["python3", "build.py"] + args, cwd=B)
    assert rc == 0 and out, (args, err[-300:])
    return out, scope_args, label


CASES = {
    "face": lambda: [face_good()],
    "store": lambda: [
        store(["m04", "v0", "--low", "2", "--spec5pose"], ["m04", "v0", "--low", "2", "--spec5pose"], "tp2 · m04 t2 (store build.py, store args)"),
        store(["m04", "v0", "--t7", "--spec5pose"], ["m04", "v0", "--t7", "--spec5pose"], "tp7 · m04 t7 (store args)"),
        store(["m05", "v0", "--state", "mama", "--age", "a51"], ["--scope", "mama", "--age", "a51"], "mama · m05 ma ma a51"),
        store(["c06", "v0", "--trieu", "3"], ["--scope", "trieu3"], "trieu3 · c06 triều phục t3"),
        store(["c06", "v0", "--state", "nude"], ["--scope", "nude"], "nude · c06 Nữ đế"),
    ],
}


def broken(good):
    S = MC.sentences(); out = {}
    t = good
    for s in S: t = t.replace(s, "", 1)
    out["(a) master block removed"] = t
    s = S[2]; out["(b) master M03 edited ('parchment'→'silk')"] = good.replace(s, s.replace("parchment", "silk"), 1)
    out["(c) thướt tha FABRIC M06 dropped"] = good.replace(S[5], "", 1)
    return out


def main():
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    rows, bad = ["| scope / prompt | case | expected | check_store result | first FAIL line |", "|---|---|---|---|---|"], 0
    for k in (["face", "store"] if which == "all" else [which]):
        for good, args, label in CASES[k]():
            for case, txt, exp in [("GOOD (builder output)", good, "PASS")] + [(c, t, "FAIL") for c, t in broken(good).items()]:
                with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f: f.write(txt)
                rc, o, e = run(["python3", "dev/art/check_store.py", f.name] + args); os.unlink(f.name)
                got = "PASS" if rc == 0 else "FAIL"
                first = next((l.strip() for l in (o + e).splitlines() if "FAIL" in l and "CHECK FAIL" not in l), (o + e).strip().splitlines()[-1] if (o + e).strip() else "")
                if got != exp: bad += 1
                rows.append(f"| {label} | {case} | {exp} | **{got}**{'' if got == exp else ' ✗'} | {first[:150].replace('|', '/')} |")
    print("\n".join(rows)); print(f"\n{bad} case(s) misbehaved"); return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
