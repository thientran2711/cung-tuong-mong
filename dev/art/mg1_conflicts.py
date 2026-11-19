#!/usr/bin/env python3
"""MG1 job 2 (owner B25 + A18): per builder, the approved sentences that now sit NEXT TO a master sentence and say something different
(other fabric word, frontal/calm standing, other tone, old mouth words, other reference numbering, men wording...). NOTHING is deleted:
this table goes to the foreman -> owner. Scan = one current output per builder; a sentence is listed when it matches a topic rule and is
not itself a master sentence. Run: python3 dev/art/mg1_conflicts.py  (prints markdown)"""
import os, sys, re, subprocess
ART = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); sys.path.insert(0, os.path.join(ART, "face-common")); import master_common as MC, face_gate

TOPIC = [  # (topic, regex on a sentence, master ids it conflicts with)
    ("reference numbering", r"\b(image|reference) [123]\b|identity reference|first reference|style reference|third reference", "M01/M02 say 'the reference image' (one ref)"),
    ("other drawing-style words", r"semi-realistic|near-3D|painterly|STYLE LOCK|drawing style of", "M01"),
    ("background / light", r"background|daylight|lighting|light parchment", "M03"),
    ("other colour-tone sentence", r"COLOUR RULE|Colour tone|DEEPER|DARKER|held back|medium tone level|fresh, clear and luminous", "M05 (B18 young tone)"),
    ("other fabric words", r"\bFABRIC\b|silk crepe|brocade|satin|linen|cotton|gauze|organza|heavy silk", "M06 thin flowing silk+gauze / M07 / M08"),
    ("frontal / calm standing", r"frontal|squarely|standing calmly|calm standing|stands? straight|upright|both feet", "M09 weight on one leg"),
    ("old / other mouth words", r"mouth CLOSED with the lips softly|closed-lip|teeth|smile", "M10"),
    ("held item", r"both hands|holds? (?:nothing|no )|empty hands?", "M12 exactly one held item"),
    ("men in women's wording", r"\b(?:his|he|man|emperor|eunuch|official|prince)\b", "M04/M08/M09/M10 are written for a woman (her / girl / skirt hem) — GAP G3"),
]


def run(cmd):
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True); return r.stdout if r.returncode == 0 else None


def samples():
    yield "face makers (v5: make_lanhlung_L761 / sacsao_L737 / nf4)", "s46.v5 (new face)", face_gate.final(open(os.path.join(ART, "face-common/s46.v5.FULL.txt"), encoding="utf-8").read(), "s46")
    yield "face makers (v3 base faces)", "m04.v3b (approved base)", face_gate.final(open(os.path.join(ART, "face-common/m04.v3b.FULL.txt"), encoding="utf-8").read(), "m04")
    for p, r, a in (("m04", "2", "a26"), ("m04", "8", "a26"), ("m04", "2", "a51"), ("m04", "nude", "a26")):
        yield "build_all.py (store build.py, rank prompts)", f"{p} t{r} {a}", run(["python3", "dev/art/store-all/build_all.py", p, r, "--age", a])
    yield "build.py --state mama (ma ma)", "m05 a51", run(["python3", "dev/art/t8-prompt-B/build.py", "m05", "v0", "--state", "mama", "--age", "a51"])
    yield "build.py --trieu (triều phục)", "m04 t3", run(["python3", "dev/art/t8-prompt-B/build.py", "m04", "v0", "--trieu", "3"])
    yield "build_npc.py (Thái hậu)", "thaihau-h1 a51", run(["python3", "dev/art/t8-prompt-B/build_npc.py", "thaihau-h1", "--age", "a51"])
    ids = (run(["python3", "dev/art/t8-prompt-B/build_npc.py", "--list"]) or "").split("\n")
    man = next((l.split()[0] for l in ids if l.startswith("man-") and " - " not in l), None)
    if man: yield "build_npc.py (men)", f"{man} a26", run(["python3", "dev/art/t8-prompt-B/build_npc.py", man, "--age", "a26"])
    sys.path.insert(0, os.path.join(ART, "emperor-B")); import build as E
    k = list(E.FACE)[0]; yield "emperor-B/build.py", f"{k} a26", E.build(k)


def main():
    S = set(MC.sentences())
    L = ["| builder | sample | topic | conflicts with | approved sentence now beside the master (first 170 chars) |", "|---|---|---|---|---|"]
    for b, lab, t in samples():
        if not t: L.append(f"| {b} | {lab} | — | — | builder REFUSED/HELD this sample |"); continue
        seen = set()
        for s in [x.strip() for x in re.split(r"(?<=[.;])\s+(?=[A-Z])", t) if x.strip()]:
            if s in S or any(s in m for m in S): continue
            for topic, rx, mids in TOPIC:
                if topic == "men in women's wording" and "men" not in b and "emperor" not in b: continue
                if re.search(rx, s, re.I if topic != "frontal / calm standing" else re.I) and (topic, s[:60]) not in seen:
                    seen.add((topic, s[:60])); L.append(f"| {b} | {lab} | {topic} | {mids} | {s[:170].replace('|', '/')} |"); break
    print("\n".join(L))


if __name__ == "__main__":
    main()
