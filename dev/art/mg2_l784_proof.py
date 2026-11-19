#!/usr/bin/env python3
"""MG2 L784 proof (owner Lượt 784: "update trong bộ máy dò prompt luôn, để nó dò cho đúng"): every rule of tonight is a REAL check_store check
(FAIL = no gen). Per rule: one GOOD prompt (builder output, must PASS) + BROKEN copies (must FAIL with that rule's id).
Run: python3 dev/art/mg2_l784_proof.py   (prints the markdown table; exit 1 if any case misbehaves)."""
import os, re, sys, subprocess, tempfile
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); import master_common as MC
sys.path.insert(0, os.path.join(ART, "face-common")); import face_gate
M = dict(zip(MC.ids(), MC.sentences()))
K3 = " IGNORE the reference image's background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers/branches, no smoke, no haze, no glow, no stain."
OLD = "Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; "
HOLD = "Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height."
SENT = " At this age this " + MC.ELDER_KEY


def ball(*a):
    r = subprocess.run([sys.executable, os.path.join(ART, "store-all", "build_all.py")] + list(a), capture_output=True, text=True, cwd=ROOT)
    assert r.returncode == 0 and r.stdout, (a, r.stderr[-300:]); return r.stdout


def gate(text, args):
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f: f.write(text); fn = f.name
    try: r = subprocess.run([sys.executable, os.path.join(ART, "check_store.py"), fn] + args, capture_output=True, text=True)
    finally: os.unlink(fn)
    return [l.strip() for l in r.stdout.splitlines() if l.strip().startswith("FAIL ")]


def cut(t, s):
    assert s in t, s[:60]; return t.replace(s, "", 1)


def rows():
    hh = ball("m04", "8", "--age", "a26"); t2 = ball("m04", "2", "--age", "a65"); th = ball("m05", "thaihau", "--age", "a36")
    face = face_gate.final(open(os.path.join(ART, "face-common", "s46.v5.FULL.txt"), encoding="utf-8").read(), "s46")
    nd = open(os.path.join(ART, "nude-B", "prompts", "m29_a51.txt"), encoding="utf-8").read()
    tp8 = ["--scope", "tp8", "--age", "a26"]; tp2 = ["--scope", "tp2", "--age", "a65"]
    yield ("1 B9 Lượt 780 background", "X19 + MASTER M03", "any (all scopes, face, states)", "m04 HH t8 a26", hh, tp8,
           [("transparent-bg sentence added", hh.replace(" No text, no labels.", K3 + " No text, no labels."), "X19"), ("M03 parchment removed", cut(hh, M["M03"]), "M03")])
    yield ("2 C1 Lượt 779 style", "X18 + MASTER M01/M02", "any incl. face", "face s46.v5 + face_gate", face, ["--scope", "face"],
           [("old store style clause added", OLD + face, "X18"), ("M01 removed", cut(face, M["M01"]), "M01")])
    yield ("3 B12 Lượt 781 fabric (low)", "MASTER M06 + B12", "t1-t5, faces, maids, pr1-6", "m04 t2 a65", t2, tp2,
           [("brocade added", t2.replace(M["M06"], M["M06"] + " " + MC.BROCADE, 1), "B12"), ("M06 removed", cut(t2, M["M06"]), "M06")])
    yield ("3 B12 Lượt 781 fabric (high)", "MASTER M06 + B12", "tp6-8 pr7-8 triều6-8 nude Thái hậu Hoàng thượng", "m04 HH t8 a26", hh, tp8,
           [("M06 added", hh.replace(M["M05"] if M["M05"] in hh else M["M04"], (M["M05"] if M["M05"] in hh else M["M04"]) + " " + M["M06"], 1), "M06"), ("brocade removed", cut(hh, MC.BROCADE), "B12")])
    yield ("4 G5 Lượt 778 sleeve hold", "S37 (FLOOR SLEEVE)", "any prompt with a floor-length sleeve", "Thái hậu m05 a36 (build_all)", th, ["--scope", "tp8", "--age", "a36"],
           [("sleeve-hold removed", cut(th, " " + HOLD), "S37")])
    yield ("5 C5 Lượt 779 elder colours", "C5", "a51/a65, every lady scope; Nữ đế must NOT", "m04 t2 a65", t2, tp2,
           [("elder clause removed", re.sub(r"this elder colour rule wins over[^;]*; ", "", t2, 1), "C5"),
            ("elder clause moved before M05", re.sub(r"this elder colour rule wins over[^;]*; ", "", t2, 1).replace(M["M05"], "At this age this " + MC.ELDER_KEY + ": her own colours. " + M["M05"], 1), "C5")])
    yield ("5 C5 Lượt 779 (Nữ đế B23)", "C5", "nude a51/a65", "Nữ đế m29 a51 (stored, redraw-ready)", nd, ["--scope", "nude", "--age", "a51"],
           [("elder clause added", nd.replace(" No text, no labels.", SENT + ": her own colours. No text, no labels."), "C5")])


def main():
    out = ["| rule | check id | scopes | prompt | case | expected | got | first FAIL line |", "|---|---|---|---|---|---|---|---|"]; bad = 0
    for rule, cid, scopes, label, good, args, broken in rows():
        f = gate(good, args); ok = not f; bad += not ok
        out.append(f"| {rule} | {cid} | {scopes} | {label} | GOOD (builder) | PASS | **{'PASS' if ok else 'FAIL ✗'}** | {(f[0] if f else '')[:110].replace('|', '/')} |")
        for case, txt, want in broken:
            f = gate(txt, args); hit = [l for l in f if l.startswith("FAIL " + want + " ")]; ok = bool(hit); bad += not ok
            out.append(f"| {rule} | {cid} | | | {case} | FAIL {want} | **{'FAIL' if ok else 'PASS ✗'}** | {(hit or f or [''])[0][:110].replace('|', '/')} |")
    print("\n".join(out)); print(f"\n{bad} case(s) misbehaved"); return 1 if bad else 0


if __name__ == "__main__": sys.exit(main())
