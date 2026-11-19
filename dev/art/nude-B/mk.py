#!/usr/bin/env python3
"""NDX3 Nữ đế set-B prompt maker (owner Lượt 554, ROOT-50 brief).
Prompt = build.py mNN v0 --state nude --spec5pose --nudeopt <auto map A..D> --nostyle [--age aNN] (the 18/11 ~23:33Z approved Nữ đế prompt + r11 crowns),
then ONLY: (1) empty face slot filled with her v3 face words VERBATIM (B8, from KC_REFS.json);
(2) 'Image 3' -> 'Image 2' (one-ref renumber, same as store-all/build_all.py l.98: style image gone, swatch = image 2).
Refs: image 1 = her set-B cut (kc_ref.py), image 2 = royal swatch TdwDfOyVNR.
Usage: mk.py mNN  -> writes dev/art/nude-B/prompts/mNN_aXX.txt for the 5 ages."""
import sys,json,re,subprocess,os
R=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(R,"../../.."))
p=sys.argv[1]
kc=json.load(open(os.path.join(ROOT,"dev/art/KC_REFS.json"),encoding="utf-8"))
row=kc["people"][p]
if row.get("m09_ok")!="yes": sys.exit(2)
face=row["face_words"].strip()
assert face.startswith("Her face: ") and face.endswith(".")
assert face in open(os.path.join(ROOT,row["prompt_file"]),encoding="utf-8").read(),"face words not verbatim in v3 FULL"
os.makedirs(os.path.join(R,"prompts"),exist_ok=True)
for age in ("a18","a26","a36","a51","a65"):
    argv=[sys.executable,os.path.join(ROOT,"dev/art/t8-prompt-B/build.py"),p,"v0","--state","nude","--spec5pose","--nudeopt","auto","--nostyle"]+(["--age",age] if age!="a18" else [])
    o=subprocess.run(argv,capture_output=True,text=True,check=True,env={**os.environ,"PYTHONDONTWRITEBYTECODE":"1"}).stdout
    assert o.count("Her face: .")==1,"face slot"
    o=o.replace("Her face: .",face,1)
    o=re.sub(r"\b([Ii])mage 3\b",r"\1mage 2",o)
    assert "style reference" not in o.lower() and "Image 3" not in o
    open(os.path.join(R,"prompts",f"{p}_{age}.txt"),"w",encoding="utf-8").write(o)
    print(p,age,len(o),"chars")
