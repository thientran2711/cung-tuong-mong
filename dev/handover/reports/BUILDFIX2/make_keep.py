"""BUILDFIX2: .keep sidecars for builder --season thu files, base = the owner-approved s62 thu file of that rank; every CUT phrase listed with its reason class."""
import sys,subprocess,re,glob
BASE={1:"s62_t1_THU_fix_L2008",2:"s62_t2_THU_fix_L1847",3:"s62_t3_THU_fix_L1978",4:"s62_t4_THU_L2041",5:"s62_t5_THU_L2050"}
D="dev/art/thu_comoi"
def why(c):
    l=c.lower()
    if re.search(r"fabric|gauze|drapery|sheen",l) and "shawl" not in l: return "B26/B29 Tần–Phi satin đoạn master sentence (builder rule; approved thu file had thin silk — open question)"
    if re.search(r"caption|large bold|plain background|over her body|vietnamese text|mùa thu",l): return "s62 test caption (sheet label), not a prompt word"
    if re.search(r"angle|three-quarter|frontal|degrees|shoulder on the picture|side view|back-turned|whole body|toward the viewer|inclined",l) and "face:" not in l: return "HER OWN ANGLE/pose (G72, owner L2039; build_all.plan ANG14)"
    if re.search(r"pose|walking|holding|held|twirl|lamp|drum|book|letter|flute|hairpin set|kite|mirror|whistle|box",l): return "HER OWN pose + held item (G72/P1; items_per_person_L2053)"
    if re.search(r"imperial consort|beautiful at every age|mouth never open|every hairpin is inserted|no hairpin horizontal|face clearly visible|parchment|porcelain",l): return "length: A38 boilerplate / B26 master-repeat cut (repeats a master sentence)"
    if re.search(r"olive|lilac|#9fb577|moon-white|colour family|main colour|secondary colour",l): return "colour slot = HER palettes_season.json thu main/sec EXACT (B20) + phi bạch 3rd colour (L1834)"
    if re.search(r"lotus|lil(y|ies)|china.rose|hollyhock|flower|petal|lobes|bloom",l): return "flower slot = HER F2 species of the rank + F20 thu colour + her capelet shape"
    return "person slot = HER face words (B8/P3) or HER own GRACE/pose sentence (G72, build_all.group_grace)"
for f in sys.argv[1:]:
    k=int(re.search(r"_t(\d)_",f).group(1)); base=f"{D}/{BASE[k]}.txt"
    r=subprocess.run([sys.executable,"dev/art/keep_check.py",base,f],capture_output=True,text=True).stdout
    cuts=[l.strip()[4:].strip() for l in r.splitlines() if l.strip().startswith("CUT:")]
    with open(f+".keep","w") as o:
        o.write(f"base: {base}\n")
        for c in cuts: o.write(f"allow: {c}   # {why(c)}; BUILDFIX2 builder --season thu, owner L2060\n")
    r=subprocess.run([sys.executable,"dev/art/keep_check.py","--sidecar",f],capture_output=True,text=True)
    print(f,len(cuts),"PASS" if r.returncode==0 else "FAIL")
