"""BUILDFIX3 (from BUILDFIX2 make_keep): .keep sidecars for builder --season thu files, base = the owner-approved s62 thu file of that rank; every CUT phrase listed with its reason class."""
import sys,subprocess,re,glob
BASE={1:"s62_t1_THU_fix_L2008",2:"s62_t2_THU_fix_L1847",3:"s62_t3_THU_fix_L1978",4:"s62_t4_THU_L2041",5:"s62_t5_THU_L2050",6:"s62_t6_THU_vankien2_L2088",7:"s62_t7_THU_vankien2_L2050",8:"s62_t8_THU_vankien2_L2023"}
D="dev/art/thu_comoi"
def why(c):
    l=c.lower()
    if re.search(r"collar, sleeves and hem|no trim band up the neck",l): return "NECK family words (THUROOT2 @955482ad, ROOT-B1 GO)"
    if re.search(r"throat clasp|long soft v|petal-like lobes|soft petals of a flower",l): return "t4 CAPELET CUT: L2041 open front + owner L2070 neutral lower edge"
    if re.search(r"image 2 is only a colour reference|never copy anything but its colour|exactly that colour",l): return "t6 dedup trim as in the approved L2088 .keep"
    if re.search(r"medium-weight silk satin|matte finish|damask|đoạn",l): return "t4/t5 thu: approved thin-silk FABRIC kept, B26 satin waived (ROOT-B2 answer 1)"
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
        for c in cuts: o.write(f"allow: {c}   # {why(c)}; BUILDFIX3 builder --season thu (L2060 test, rebuilt after NECK + L2070 + L2088 t6)\n")
    r=subprocess.run([sys.executable,"dev/art/keep_check.py","--sidecar",f],capture_output=True,text=True)
    print(f,len(cuts),"PASS" if r.returncode==0 else "FAIL")
