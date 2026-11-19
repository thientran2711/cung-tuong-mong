#!/usr/bin/env python3
"""MG2 (ROOT-57 order, owner Lượt 779/780/781 + redraw Lượt 777): make the STORED prompts of the pictures the owner wants redrawn
ready, changing ONLY what tonight's rules change (NO gens):
  C1 Lượt 779  old store style clause -> gone (style = master M01/M02)          master_common.legacy
  C2 Lượt 780  transparent-background sentence -> gone (master M03 parchment)    master_common.legacy (K3_RX)
  C5 Lượt 779  a51/a65 elder colours win over M05 (Thái hậu only; Nữ đế = B23)   build.py ELDER_M05_SENT after the 18/11 COLOUR TEXT
  D15 Lượt 692/694 Thái hậu a51/a65 ELDER STYLE LOCK added if the stored prompt predates it (approved, = build_all thaihau())
  B12 Lượt 781 royal = brocade sentence, never M06 (M06 removed if present)     master_common.apply(high=True)
  B25          master block added                                                master_common.apply
Pose, item, angle, colours, face words = the stored prompt, untouched (so the redraw is the same picture with the new rules).
Each output must pass check_store (Nữ đế: --scope nude; Thái hậu: --scope tp8 with the build_all gate_th exemption S03/S33) and contain the
SL1 sleeve-hold sentence (Lượt 778). Run: python3 dev/art/mg2_redraw.py   (writes the files, prints a per-file diff summary)."""
import os, re, sys, subprocess, tempfile
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); import master_common as MC
_src = open(os.path.join(ART, "t8-prompt-B", "build.py"), encoding="utf-8").read()
bridge = eval(re.search(r"^ELDER_M05_BRIDGE=(\".*?\")$", _src, re.M).group(1))   # the one copy lives in build.py
D15_STYLE3 = eval(re.search(r'^D15_STYLE=(".*?")$', _src, re.M).group(1)).replace("the second reference):", "the third reference):", 1)   # = build.py D15_STYLE3 (image 2 = swatch)
ELDER_SENT = " At this age " + bridge.rstrip("; ") + "."
HOLD = "Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet"
TH_DIR = os.path.join(ROOT, "dev/handover/review-sheets/thai-hau-sample/v624")
TH1811 = open(os.path.join(ART, "elder-copy", "THAIHAU_1811_AGE_COLOUR.md"), encoding="utf-8").read()
TH_EXEMPT = {"a36": "S03", "a51": "S33", "a65": "S33"}


def colour_text(age):
    m = re.search(r"^## " + re.escape(age + " COLOUR TEXT") + r" \(verbatim\)\n(.+?)\n", TH1811, re.M); assert m; return m.group(1).strip()


def gate(text, scope, age, exempt=None):
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f: f.write(text); fn = f.name
    try:
        p = subprocess.run([sys.executable, os.path.join(ART, "check_store.py"), fn, "--scope", scope, "--age", age], capture_output=True, text=True)
    finally: os.unlink(fn)
    fails = [l.strip() for l in p.stdout.splitlines() if l.strip().startswith("FAIL ")]
    other = [l for l in fails if not (exempt and l.startswith("FAIL " + exempt + " "))]
    return not other, other


def sents(t): return [x.strip() for x in re.split(r"(?<=[.;])\s+", t) if x.strip()]


def summary(old, new):
    o, n = sents(old), sents(new)
    rem = [x for x in o if x not in n]; add = [x for x in n if x not in o]
    return rem, add


def remake(old, elder_age=None):
    t = MC.legacy(old)
    m06 = MC.sentences()[MC.ids().index(MC.M06_ID)]
    if m06 in t: t = t.replace(" " + m06, "", 1) if " " + m06 in t else t.replace(m06 + " ", "", 1)   # B12 (Lượt 781): royal = no M06
    if elder_age:
        if "STYLE LOCK (" not in t:   # D15 (owner Lượt 692/694): same place as store-all/build_all.py thaihau(): between the 18/11 AGE TEXT and COLOUR TEXT
            assert t.count(" Her robe keeps") == 1; t = t.replace(" Her robe keeps", " " + D15_STYLE3 + " Her robe keeps", 1)
        ct = colour_text(elder_age); assert t.count(ct) == 1, "18/11 colour text not found once"
        t = t.replace(ct, ct + ELDER_SENT, 1)
    return MC.apply(t, high=True)


def main():
    out = []
    jobs = [(os.path.join(ART, "nude-B", "prompts", f"{p}_{a}.txt"), None, "nude", a, None) for p in ("m05", "m29") for a in ("a18", "a26", "a36", "a51", "a65")]
    jobs += [(os.path.join(TH_DIR, f"m05_thaihau_{a}.B22.prompt.txt"), os.path.join(TH_DIR, f"m05_thaihau_{a}.L781.prompt.txt"), "tp8", a, TH_EXEMPT[a]) for a in ("a36", "a51", "a65")]
    bad = 0
    for src, dst, scope, age, ex in jobs:
        old = open(src, encoding="utf-8").read()
        new = remake(old, age if (scope == "tp8" and age in ("a51", "a65")) else None)
        ok, fails = gate(new, scope, age, ex)
        hold = HOLD in new
        dst = dst or src
        if ok and hold: open(dst, "w", encoding="utf-8").write(new.rstrip("\n") + "\n")
        else: bad += 1
        rem, add = summary(old, new)
        out.append((os.path.relpath(dst, ROOT), os.path.relpath(src, ROOT), ok, hold, fails, rem, add))
    for dst, src, ok, hold, fails, rem, add in out:
        print(f"## {dst}  (from {src})  gate {'PASS' if ok else 'FAIL'} · sleeve-hold {'yes' if hold else 'NO'}")
        for f in fails: print("   ", f)
        for x in rem: print("   - " + x[:140])
        print(f"   + {len(add)} sentences added: " + " | ".join(x[:60] for x in add))
    print(f"\n{len(out)} prompts, {bad} not written (gate FAIL or no sleeve-hold sentence)")
    return 1 if bad else 0


if __name__ == "__main__": sys.exit(main())
