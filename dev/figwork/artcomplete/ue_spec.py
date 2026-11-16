# ue_spec.py: eunuch rank dress (art-complete group b). Staff eunuchs hold ranks r0..r3 (SRK.eunuch: Tiểu thái giám, Thái giám,
# Thủ lĩnh thái giám, Tổng quản thái giám). Existing art (FIGURES.json, tier null) = r1. Here: r0/r2/r3 x a18/a26/a36/a51 per u01-u30,
# one 2:1 sheet of 4 ages per (identity, rank); ref = that eunuch's own r1 sheet (magnificUrl in FIGURES.json).
# python3 ue_spec.py            -> writes ue_jobs.json      python3 ue_spec.py ue-u01-r0 ...  -> prints {"jid","ref","prompt"} lines
import json,sys,os
W=os.path.dirname(os.path.abspath(__file__))
F=json.load(open(W+"/.cache/FIGURES.json"))
REF={}
for f in F:
    if f.get("role")=="eunuch" and f.get("ageBand")=="a18": REF[f["identity"]]=f["magnificUrl"].rsplit("/",1)[1]
RANK={"r0":("Tiểu thái giám, a junior palace eunuch of the lowest rank",
            "a plain undecorated round-collar cotton robe in a muted, faded version of his robe colour, a plain cloth belt, a simple soft black cloth cap, plain black cloth shoes, no whisk, no ornaments; neat and clean but humble, hands folded in his sleeves"),
      "r2":("Thủ lĩnh thái giám, a head eunuch in charge of a palace",
            "a deep crimson red silk round-collar robe (head eunuchs wear red) with a large gold-embroidered square badge (a crane among clouds) on the chest, gold-edged collar and cuffs, gold cloud borders at the hems, a black gauze hat with a gold band and a small jade ornament at the front, a belt with jade plaques, black boots, a white horsetail whisk in the crook of his arm; dignified and well-off"),
      "r3":("Tổng quản thái giám, the chief eunuch of the inner palace, the highest eunuch rank",
            "a splendid heavy brocade python robe (mang bào) in a deep rich version of his robe colour, a great coiled python embroidered in gold thread across the chest and shoulders, sea-wave and cloud borders at the hems, a tall black lacquered gauze hat with a gold and jade ornament, a wide belt of gold-set jade plaques, a long string of dark prayer beads, black boots, a white horsetail whisk with a carved jade handle; powerful, grand and very wealthy")}
T=("The SAME man as in the reference image: exactly the same face and features, the same four ages left to right as in the reference "
   "(about 22; about 31; about 43 with faint lines; about 57 with fine lines and greying hair, still handsome), the same rendering style. "
   "Semi-realistic painterly guofeng style, near-3D realistic rendering, soft natural light; plain light parchment background; fair skin; "
   "a handsome, refined palace eunuch, beardless; serene gentle neutral expression, soft warm eyes (never slanted, never narrow), closed lips; "
   "no mole, no forehead mark, no bead between brows, no marks on the face. Age lineup: the SAME man drawn four times side by side in one row, "
   "evenly spaced with wide clear empty space between the figures, each complete from top of head to feet, all feet on one baseline, same height. "
   "His rank: {rank}. NEW CLOTHES: change the clothing completely from the reference (only the face, hair and ages stay). All four wear: {dress}. {col}Masculine colour, never purple, violet, lavender or pink. "
   "Calm still standing poses, sleeves and hems hanging straight, no flying sashes. No text, no labels.")
AG=["a18","a26","a36","a51"]
J={}
for i in range(1,31):
    u=f"u{i:02d}"
    for r in RANK:
        J[f"ue-{u}-{r}"]=dict(ref=REF[u],rank=r,figs=[dict(file=f"fig-eunuch-{u}-{r}-{a}",role="eunuch",identity=u,tier=r,ageBand=a) for a in AG])
if len(sys.argv)>1:
    for jid in sys.argv[1:]:
        j=J[jid];rk,dr=RANK[j["rank"]]
        col="" if j["rank"]=="r2" else "Keep his own robe colour family from the reference. "
        if j["rank"]=="r2" and jid.split("-")[1] in ("u10","u20","u30"):   # these already wear deep crimson at r1
            dr=dr.replace("a deep crimson red silk round-collar robe (head eunuchs wear red)","a deep ochre-gold silk round-collar robe")
        print(json.dumps({"jid":jid,"ref":j["ref"],"prompt":T.format(rank=rk,dress=dr,col=col)},ensure_ascii=False))
else: json.dump(J,open(W+"/ue_jobs.json","w"),indent=0,ensure_ascii=False); print(len(J),"jobs")
