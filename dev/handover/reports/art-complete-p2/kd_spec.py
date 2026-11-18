# kd_spec.py: grown children (art-complete group c). Kids p01-p24 / f01-f24 have child bands 4/9/14/20 (img/FIGURES-kids.json).
# Here: adult bands 26/36/51 per identity, one 21:9 sheet of 3 ages (about 30 / 43 / 57), ref = that child's own 4-age sheet.
# python3 kd_spec.py -> kd_jobs.json     python3 kd_spec.py kd-p01 ... -> prints {"jid","ref","prompt"} lines
import json,sys,os
W=os.path.dirname(os.path.abspath(__file__))
F=json.load(open(W+"/../../../img/FIGURES-kids.json"))
REF={f["identity"]:f["magnificUrl"].rsplit("/",1)[1] for f in F if f["ageBand"]=="20"}
sys.path.insert(0,W+"/../kids"); 
PP=["deep sapphire blue with silver-white","jade green with ivory","crimson red with gold","teal with pale grey","ivory white with sky blue",
 "navy blue with gold","emerald green with cream","slate grey-blue with white","cinnabar red with dark navy","sky blue with white",
 "deep teal with bronze","moss green with ivory","warm brown with cream","black with crimson accents","pale celadon green with white",
 "dark blue with apricot gold","ochre gold with brown","steel blue with pearl grey","forest green with gold","scarlet with black",
 "azure blue with ivory","pine green with silver-grey","russet brown with gold","midnight blue with jade"]
FP=["soft peach pink with ivory","lilac with silver-white","rose red with gold","sky blue with white","mint green with cream","coral with pale gold",
 "lavender with pale blue","celadon with white","apricot with cream","crimson with gold","plum with pale pink","moonlight blue with silver",
 "lemon yellow with white","jade green with pale pink","blush pink with sky blue","ivory white with rose","turquoise with ivory","peony pink with gold",
 "pale violet with white","cherry red with ivory","powder blue with peach","seafoam green with lilac","honey gold with coral","pearl white with lavender"]
PPROP=["a closed folding fan","a rolled scroll","a jade pendant","a sheathed sword","a string of prayer beads","an open book"]
FPROP=["a round silk fan","a folding fan","a silk handkerchief","a string of prayer beads","a plum blossom branch","a small jade ruyi"]
STY=("Semi-realistic painterly guofeng style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the "
 "reference; plain light parchment background; fair skin; serene gentle neutral expression, soft warm round-almond eyes (never slanted, never narrow), "
 "closed lips; no mole, no forehead mark, no huadian, no bead between brows, clean bare forehead, no marks on the face. ")
LINE=("A character lineup of THREE full-body standing figures, head to feet, side by side with wide clear empty space between them, all feet on one "
 "baseline, same height, each complete from top of head to feet. Calm still upright standing poses, sleeves and hems hanging straight, no flying sashes. "
 "No text, no labels, no frames.")
def prince(i):
    p=PPROP[i%6]
    return ("The SAME man as the young man of about 20 on the far right of the reference image: exactly the same face and features, now grown older. "
     +STY+LINE+f" He is an imperial prince (a royal prince, vương gia) in his own palace. Signature colour family: {PP[i]}. "
     f"Left: about 30, a handsome man in his prime, rich layered brocade prince court robe with embroidered four-claw dragon roundel and cloud borders, "
     f"jade belt, small gold crown (guan) with hairpin, holding {p}. "
     f"Middle: about 43, the same man mature and dignified, faint lines, a short neat moustache, a grander prince robe with gold dragon roundels, "
     f"gold and jade crown, jade belt, holding {p}. "
     f"Right: about 57, the same man elderly and stately, fine lines, greying hair, a neat greying moustache and short beard, a heavy dark-toned "
     f"version of his colour family prince robe with gold dragon embroidery, gold crown, holding {p}. Masculine colours, NOT pink, NOT purple.")
def princess(i):
    p=FPROP[i%6]
    return ("The SAME woman as the young woman of about 20 on the far right of the reference image: exactly the same face and features, now grown older. "
     +STY+LINE+f" She is an imperial princess (công chúa), now a married noble lady. Signature colour family: {FP[i]}. "
     f"Left: about 30, a beautiful woman in her prime, layered rich silk princess court robe with gold phoenix embroidery and embroidered sash, "
     f"high crossed collar, elegant married-lady chignon with gold phoenix hairpins and a dangling bu yao ornament, holding {p}. "
     f"Middle: about 43, the same woman mature and graceful, faint lines, a grander robe in a deeper tone of her colour family with gold embroidery, "
     f"fuller chignon with gold and jade hairpins, holding {p}. "
     f"Right: about 57, the same woman elderly and dignified, fine lines, greying hair in a neat chignon with a few jade and gold pins, "
     f"a heavy dark-toned brocade robe of her colour family, holding {p}. Full-length modest robes, high collars.")
AG=["26","36","51"]
J={}
for i in range(24):
    for sx,fn,role in (("p",prince,"prince"),("f",princess,"princess")):
        k=f"{sx}{i+1:02d}"
        J[f"kd-{k}"]=dict(ref=REF[k],prompt=fn(i),figs=[dict(file=f"fig-kid-{k}-a{a}",role=role,identity=k,ageBand=a) for a in AG])
if len(sys.argv)>1:
    for jid in sys.argv[1:]: print(json.dumps({"jid":jid,"ref":J[jid]["ref"],"prompt":J[jid]["prompt"]},ensure_ascii=False))
else: json.dump(J,open(W+"/kd_jobs.json","w"),indent=0,ensure_ascii=False); print(len(J),"jobs")
