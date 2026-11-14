# cjobs.py: PART C prompts = maid identities m01..m26 in the CONSORT dress ladder t1..t8 + cold.
# Job id C-mNN-tK (K=1..8) / C-mNN-tcold -> img/fig-maid-mNN-tK-aAA.webp (FIGURES-servants.json role maid, tier "tK"/"cold", sheet C-mNN-tK)
# python3 cjobs.py JID... -> "JID style idref" + full prompt
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__))
SERV=json.load(open("/home/user/cung-tuong-mong/img/FIGURES-servants.json"))
MREF={r["identity"]:r["magnificUrl"].split("/")[-1] for r in SERV if r["role"]=="maid" and r.get("tier") in (None,"m1") and r["ageBand"]=="a18"}
STY=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"]   # consort-01/05/12/18
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
LINE=(" Age lineup: the SAME person drawn four times side by side in one row, evenly spaced with clear empty space between the figures, each complete from top of head to feet, realistic adult proportions (head about one seventh of body height, long legs, never big-headed or chibi).")
BEAU="a very beautiful woman: luminous porcelain skin, soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile"
IDK=(" From the identity reference lineup keep ONLY her face, facial features and hair colour; do NOT copy the reference's ages, poses, maid outfit, hair ornaments or accessories; use the NEW ages, the NEW consort outfit and the NEW poses below.")
AGES=(" Left to right: about 19, a fresh youthful young woman; about 24, still young and lively, youthful face, no sign of ageing; about 32, a young mature woman in her prime, smooth skin, NO grey or silver hair, NO wrinkles; about 48, a graceful elegant lady whose hair is still FULLY DARK black-brown, the same dark colour as at 32 (at most two barely visible fine silver hairs; NO grey streaks, NO grey or silver at the temples or sides, NOT salt-and-pepper, NOT white, no grey sheen), minimal faint lines, still clearly beautiful, not elderly.")
END=(" Eyes soft, warm and round-almond, never slanted or upturned, never teary; serene gentle face, faint smile at most, no open-mouth laugh; no moles, no beauty marks, no dark spots anywhere on the face or cheeks. Everyone beautiful at every age. No text, no labels.")
# her own colour family (from her approved maid lineup), kept as MAIN robe colour on every rank
PAL={"m01":"sage green and cream","m02":"moss green and silver","m03":"slate blue and silver","m04":"warm apricot and gold","m05":"coral red and gold",
"m06":"pale blue-grey and silver","m07":"pale jade green and white","m08":"peach-salmon and gold","m09":"rose pink and gold","m10":"sage green and gold",
"m11":"sky blue and silver","m12":"pale golden yellow and ivory","m13":"lilac and silver","m14":"ivory white and celadon","m15":"blush pink and pearl white",
"m16":"lavender purple and gold","m17":"olive green and gold","m18":"powder blue and pearl white","m19":"caramel apricot and gold","m20":"slate blue and gold",
"m21":"aqua celadon and silver","m22":"dusty rose and taupe","m23":"butter yellow and gold","m24":"jade green and gold","m25":"lavender violet and silver","m26":"blush pink and gold"}
GREEN=("green","celadon","jade","aqua")
MOT=["peonies","plum blossoms","lotus flowers","orchids","chrysanthemums","butterflies","cranes","auspicious clouds","magnolias","begonias","camellias","osmanthus","wisteria"]
PROP=["a round silk fan","a folding fan","a sprig of plum blossoms","a thread-bound poetry book","an embroidered handkerchief","a small incense sachet",
"a thread-bound book","a single peony","a small embroidered silk ball","a small rolled poem scroll","a jade flute","a small lotus flower","a painted paper fan",
"a string of prayer beads","a small porcelain vase with a flower","a thread-bound songbook","a rolled poem scroll","a small embroidered pouch","a sprig of orchids",
"a round fan painted with a moon","a branch of peach blossoms","a small painted scroll","a jade hair comb","a small bird cage","a white magnolia","a sprig of wisteria"]
HUA=["a small four-petal cross flower","a small ruyi-head scroll","a tiny goldfish","three tiny dots in a vertical line","a tiny pomegranate flower","a tiny upright narrow jade-tablet shape (a small slim rounded vertical bar)",
"a tiny dragonfly","a tiny magnolia bud","a tiny calabash gourd","a tiny hibiscus flower","four tiny dots in a rhombus","a tiny star of five dots","a tiny lily",
"a small single spiral coil","a tiny lily-of-the-valley bell","a tiny endless knot","a tiny fern sprig","a tiny wisteria cluster of three hanging dots","a tiny sun disc with short rays",
"two tiny dots side by side","a tiny crane in flight","a small hexagon (tortoise-shell)","a tiny maple leaf","a tiny pine-needle cluster","a tiny morning-glory bloom","a small half-moon fan shape"]
COL=["soft rose","pale coral","cinnabar red","soft pink","rose red","vermilion","peach pink","soft coral","rose pink","coral red","soft orange-red","pale pink","rose red",
     "soft rose","pale coral","cinnabar red","soft sage green (cuidian)","vermilion","peach pink","soft coral","rose pink","coral red","soft orange-red","pale pink","rose red","cinnabar red"]
MOLE={"m13","m26"}   # their maid lineup shows a cheek mole: tell the model to drop it (owner: no moles)
FAM=["hienlanh","dangi","numi","thanhnha","kieungao","thamvong"]
RANK={1:"rank-1 consort (Dap ung)",2:"rank-2 consort (Thuong tai)",3:"rank-3 consort (Quy nhan)",4:"rank-4 consort (Tan)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quy phi)",7:"rank-7 imperial noble consort (Hoang quy phi)",8:"the Empress (Hoang hau)"}
LAD={1:"a fine silk robe with delicate embroidered {mot} at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower",
2:"a fine silk robe with embroidered borders and a small woven {mot} pattern, a silk sash with a small jade pendant (a little more ornate than the lowest consort rank, little gold); neat chignon with silver and pearl hairpins and a fresh flower",
3:"a patterned silk robe with small woven {mot}, a woven brocade sash and fuller layered sleeves; layered chignon with a few small gold-and-pearl hairpins and small silk flowers",
4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY gold brocade robe densely embroidered in gold with phoenixes and {mot}, an embroidered pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe heavily embroidered with golden phoenixes and clouds, with crimson and bright gold accents, a layered gold collar, strands of pearls across the chest, a long flowing train behind her; grand chignon with a SMALL gold phoenix crown with pearl strands and kingfisher-blue accents",
8:"the Empress's imperial phoenix ceremonial robe, large golden phoenixes and clouds embroidered all over with bright gold and red, a jewelled layered gold collar, pearl strands, a VERY long trailing train; a FULL gold phoenix crown with pearls and kingfisher-blue inlay and pearl strands hanging at the sides; the most splendid outfit of all"}
exec(open(H+"/poses.py").read())
def outfit(t,who,i):
    pal=PAL[who]; main=pal.split(" and ")[0]; neg="" if any(g in pal for g in GREEN) else ", NOT green"
    rich=" a little richer than the rank below" if t<=3 else " clearly much richer and more splendid than the lower ranks"
    return (f" Outfit for all four ({RANK[t]},{rich}): a NEW outfit, {LAD[t].format(mot=MOT[i%13])}; her signature colour family {pal} stays the MAIN robe colour ({main}{neg}).")
def hua(t,i):
    c=COL[i]
    m={1:f"painted in {c}, simple fine lines",2:f"painted in {c}, simple fine lines",3:f"painted in {c}, finer detailed lines",4:f"painted in {c}, finer detailed lines",
       5:f"painted in {c} with a fine thin gold outline",6:f"painted in {c} with a fine thin gold outline",7:"in gold leaf and cinnabar red with one tiny pearl, the finest detail",8:"in gold leaf and cinnabar red with one tiny pearl, the finest detail"}[t]
    return (f" Forehead: a small, delicate, refined huadian forehead ornament between the brows just above the bridge of the nose, elegant, not large (about the size of a fingertip): her signature motif {HUA[i]}, {m}; the SAME small size on all four figures and at every rank; it never covers the forehead and never spreads to the brows or cheeks.")
def job(jid):
    _,who,tt=jid.split("-"); i=int(who[1:])-1; prop=PROP[i%len(PROP)]
    desc=f" A former palace maid now raised to imperial consort, {BEAU}."
    if tt=="tcold":
        o=(f" Outfit for all four (the cold palace, plain but still neat, clean and beautiful, never poor or ragged): a simple but well-made plain robe in muted {PAL[who].split(' and ')[0]} and pale grey, clean and neatly tied with a plain sash, hair in a tidy low bun with one plain wooden hairpin, no gold, no jewellery; she looks graceful and dignified.")
        pl=["holding a plain wooden comb","hands folded quietly in her sleeves","holding a small clay teacup","holding a simple folded letter","hands lightly together","holding a plain round fan"]
        p=[pl[(i+j*2)%6] for j in range(4)]
        po=(" Poses (NEW, quiet, standing), left to right: about 19: "+p[0]+", body slightly turned to the left; about 24: "+p[1]+", three-quarter view; about 32: "+p[2]+", slight turn to the right; about 48: "+p[3]+", gently frontal. All four stand calmly and gracefully, a slight breeze in the sleeves; each figure complete head to feet inside the frame, clear empty space between the four figures.")
        f=" Forehead: bare, NO huadian."
    else:
        t=int(tt[1:]); o=outfit(t,who,i); f=hua(t,i); po=" "+pose_for(FAM[i%6],i,t,prop,i)+"."
    idk=IDK
    if who in MOLE: idk=idk.replace("keep ONLY her face, facial features and hair colour;","keep ONLY her face, facial features and hair colour, but WITHOUT the small dark mole on her cheek (her skin is clear and flawless);")
    return STY[i%4],MREF[who],PRE+LINE+desc+idk+AGES+o+f+po+END
if __name__=="__main__":
    for j in sys.argv[1:]:
        s,r,p=job(j); print(j,s,r); print(p); print()
