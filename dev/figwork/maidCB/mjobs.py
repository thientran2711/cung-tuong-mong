# mjobs.py (Part C unified m01-m52; C1+C2 merged 11/14): job id C-mNN-tT (T=1..8) / C-mNN-tcold -> maid identity raised to consort tier
# python3 mjobs.py JID... -> "JID style ref" + full prompt
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__))
exec(open(H+"/poses.py").read())
exec(open(H+"/calm.py").read())  # OWNER REVERSAL: calm standing pose_for overrides the motion one
exec(open(H+"/hands.py").read())
exec(open(H+"/lad3.py").read())  # t4-t8 = consort-art spec5 art5 ladder  # OWNER: lively hands, different object per age
STY=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"]
MREF=json.load(open(H+"/mref.json"))
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
LINE=(" Age lineup: the SAME person drawn four times side by side in one row, evenly spaced with clear empty space between the figures, each complete from top of head to feet, realistic adult proportions (head about one seventh of body height, long legs, never big-headed or chibi).")
BEAU="a very beautiful woman: luminous porcelain skin with a clear flawless complexion (no moles, no beauty marks on the face), soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile"
IDK=(" From the identity reference lineup keep ONLY her face, facial features, hair colour and signature colour family; do NOT copy the reference's ages, poses, maid's outfit, hair ornaments or accessories; use the NEW ages, the NEW consort outfit and the NEW poses below.")
AGES=(" Left to right: about 19, a fresh youthful young woman; about 24, still young and lively, youthful face, no sign of ageing; about 32, a young mature woman in her prime, smooth skin, NO grey or silver hair, NO wrinkles; about 48, a graceful elegant lady whose hair is still FULLY DARK black-brown, the same dark colour as at 32 (at most two barely visible fine silver hairs; NO grey streaks, NO grey or silver at the temples or sides, NOT salt-and-pepper, NOT white, no grey sheen), minimal faint lines, still clearly beautiful, not elderly.")
END=(". Eyes soft, warm and round-almond, never slanted or upturned, never teary; serene gentle face, faint smile at most, no open-mouth laugh; no moles and no beauty marks on any face. Everyone beautiful at every age. No text, no labels.")
CT={1:"a fine silk robe with delicate embroidered {mot} at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower",
2:"a fine silk robe with embroidered borders and a small woven {mot} pattern, a silk sash with a small jade pendant (a little more ornate than the lowest consort rank, little gold), neat chignon with silver and pearl hairpins and a fresh flower",
3:"a patterned silk robe with small woven {mot}, a woven brocade sash and fuller layered sleeves, layered chignon with a few small gold-and-pearl hairpins and small silk flowers"}
CT.update({k:LAD[k] for k in range(4,9)})
CRANK={1:"rank-1 consort (Dap ung)",2:"rank-2 consort (Thuong tai)",3:"rank-3 consort (Quy nhan)",4:"rank-4 consort (Tan)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quy phi)",7:"rank-7 imperial noble consort (Hoang quy phi)",8:"the Empress (Hoang hau)"}
PAL={"m27":"soft spring green and gold","m28":"coral pink and ivory","m29":"pale celadon and silver","m30":"soft lilac and silver","m31":"pale buttercup yellow and gold","m32":"pale mint green and ivory","m33":"lavender blue and silver","m34":"peach pink and gold","m35":"pale jade green and pearl white","m36":"ivory cream and gold","m37":"pale aqua and silver","m38":"warm apricot and gold","m39":"sky blue and silver","m40":"dusty rose and gold","m41":"soft willow green and gold","m42":"peach coral and gold","m43":"periwinkle and silver","m44":"ivory and blush pink","m45":"pale sky blue and pearl white","m46":"rust red and gold","m47":"pale lilac and mint","m48":"warm beige cream and gold","m49":"powder blue and silver","m50":"soft pink and pearl white","m51":"pale mint and silver","m52":"pink lilac and gold"}
GREEN=("green","celadon","jade","teal","mint","sage","aqua")
MOT=["peonies","plum blossoms","lotus flowers","orchids","chrysanthemums","butterflies","cranes","auspicious clouds","magnolias","begonias","camellias","osmanthus","wisteria"]
CPROP=["her round silk fan","her folding fan","her sprig of plum blossoms","her small jade pendant on a red cord","her embroidered handkerchief","her small incense sachet","her thread-bound book","her single peony","her small round palace lantern","her sprig of osmanthus","her little polished bronze hand mirror with a shiny reflective face","her rolled poem scroll","her small jade flute"]
TRS=list(POSES)
HD=["a tiny lily-of-the-valley bell","a small pomegranate flower","a small water-caltrop leaf","a tiny magnolia bud","a tiny gourd","a small lingzhi cloud-mushroom","a tiny ruyi head","a tiny endless knot","a small wisteria cluster","a tiny hibiscus","a tiny koi fish","a small apricot blossom","a tiny dragonfly","a small rose","a tiny pine sprig","a small pear blossom","a tiny iris","a small azalea","a tiny jasmine flower","a small maple leaf","four tiny dots in a square","a tiny palace-lantern shape","a tiny conch shell","a small morning-glory","a tiny honeysuckle sprig","a small gardenia"]
HCOL=["soft rose pink","pale coral","rose red","soft peach-pink","cinnabar red","vermilion","coral red","pale pink"]

# ---- unified Part C (m01-m52): C1 identities m01-m26 ----
PAL.update({"m01":"sage green and cream","m02":"moss green and silver","m03":"slate blue and silver","m04":"warm apricot and gold","m05":"coral red and gold",
"m06":"pale blue-grey and silver","m07":"pale jade green and white","m08":"peach-salmon and gold","m09":"rose pink and gold","m10":"sage green and gold",
"m11":"sky blue and silver","m12":"pale golden yellow and ivory","m13":"lilac and silver","m14":"ivory white and celadon","m15":"blush pink and pearl white",
"m16":"lavender purple and gold","m17":"olive green and gold","m18":"powder blue and pearl white","m19":"caramel apricot and gold","m20":"slate blue and gold",
"m21":"aqua celadon and silver","m22":"dusty rose and taupe","m23":"butter yellow and gold","m24":"jade green and gold","m25":"lavender violet and silver","m26":"blush pink and gold"})
PROP1=["a round silk fan","a folding fan","a sprig of plum blossoms","a thread-bound poetry book","an embroidered handkerchief","a small incense sachet",
"a thread-bound book","a single peony","a small embroidered silk ball","a small rolled poem scroll","a jade flute","a small lotus flower","a painted paper fan",
"a string of prayer beads","a small porcelain vase with a flower","a thread-bound songbook","a rolled poem scroll","a small embroidered pouch","a sprig of orchids",
"a round fan painted with a moon","a branch of peach blossoms","a small painted scroll","a jade hair comb","a small bird cage","a white magnolia","a sprig of wisteria"]
CPROP1=["her "+p.split(" ",1)[1] for p in PROP1]
HUA1=['a small four-petal cross flower', 'a tiny bat (auspicious fu bat)', 'a tiny longevity peach', 'three tiny dots in a vertical line', 'two tiny cherries on one stem', 'a tiny upright narrow jade-tablet shape (a small slim rounded vertical bar)', 'a tiny jade-rabbit silhouette', 'a tiny round coin with a square hole', 'a tiny vase silhouette', 'a tiny daisy of eight thin petals', 'a tiny arc of five dots (a gentle upward curve)', 'a tiny star of five dots', 'a tiny lily', 'a small single spiral coil', 'a tiny mountain of three small peaks', 'a tiny square window-lattice', 'a tiny fern sprig', 'a tiny inverted triangle', 'a tiny sun disc with short rays', 'two tiny dots side by side', 'a tiny crane in flight', 'a small hexagon (tortoise-shell)', 'a tiny persimmon', 'a tiny jade bi disc (a ring with a hole)', 'a tiny eight-point star anise', 'a small half-moon fan shape']
COL1=["soft rose","pale coral","cinnabar red","soft pink","rose red","vermilion","peach pink","soft coral","rose pink","coral red","soft orange-red","pale pink","rose red",
     "soft rose","pale coral","cinnabar red","soft sage green (cuidian)","vermilion","peach pink","soft coral","rose pink","coral red","soft orange-red","pale pink","rose red","cinnabar red"]
MOLE={"m13","m26","m39"}  # C-B: m39 t8 grew a cheek mole
def hmat(t,i):
    c=HCOL[i%8]
    if t<=2: return f"painted in {c}, simple fine lines"
    if t<=4: return f"painted in {c}, finer detailed lines"
    if t<=6: return f"painted in {c} with a thin fine gold outline, more detailed"
    return "in gold leaf and cinnabar red with one tiny pearl dot, the finest detail"
exec(open(H+"/hl.py").read())
def huadian(t,i,mot=None,col=None):
    mot=mot or HD[i]; col=col or HCOL[i%8]
    if t=="cold": return " No huadian on the forehead."
    if t>=2: return f" Forehead: a huadian ornament between the brows: {hdesc(t,mot,col)}; the same huadian on all four figures."
    return (f" Forehead: a small, delicate, refined huadian between the brows, elegant, not large, about the size of a fingertip and clearly visible (like the small red flower between the brows in a classic portrait): her signature motif {mot}, painted in {col}, simple fine lines; "
            "same small size at every rank, never covering the forehead or spreading to the brows; the same huadian on all four figures.")
SHORT=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering, soft natural light, fine detail, exactly matching the rendering of the reference portraits; plain light parchment background, soft even light. "
 "Age lineup: the SAME woman drawn four times side by side in one row, clear empty space between the figures, each complete head to feet, realistic adult proportions (head one seventh of body height, never chibi). "
 "A former palace maid now raised to imperial consort, very beautiful: fair flawless porcelain skin (no moles, no beauty marks), soft rosy blush, large soft warm round-almond eyes (never slanted, never teary), delicate nose, small rosy lips, serene gentle face, faint smile at most. "
 "From the identity reference keep ONLY her face, facial features, hair colour and colour family; NOT its ages, poses, maid's outfit or ornaments. "
 "Left to right: about 19, fresh and youthful; about 24, young and lively, no sign of ageing; about 32, in her prime, smooth skin, no grey hair, no wrinkles; about 48, a graceful elegant lady, her hair still fully DARK black-brown like the younger figures, at most two or three single fine silver hairs barely visible, NO grey streak, NO grey or silver temples, NOT grey-haired, minimal faint lines, still clearly beautiful, not elderly.")
MOTION="dynamic graceful motion in every figure, caught mid-movement, skirt hems swirling, long sleeves, sash and stole floating in a soft breeze, flowing fabric, hair tassels swaying (the older figures move more calmly but still gracefully); each figure complete head to feet inside the frame, compact, extra empty space between the four figures so the swirling fabric never overlaps"
MOTS="graceful motion, skirts, sleeves and sash floating in a soft breeze (older figures calmer); each figure complete head to feet, extra space between figures so fabric never overlaps"
COBJ=["a plain wooden comb","a small clay teacup","a simple folded letter","a plain round paper fan","a small bundle of dried wildflowers","a plain cotton handkerchief","a small unglazed clay oil lamp","a worn thread-bound book","a small bamboo basket","a single wild chrysanthemum"]
CG=["holding {o} up before her chest with both hands, looking down at it","one hand holding {o} at her side, the other hand smoothing a strand of hair behind her ear",
 "holding {o} in one hand before her, the other hand resting lightly on her plain sash","body turned three-quarters, {o} held in the crook of one arm, the other hand on it",
 "holding {o} lowered in one hand, the other hand lightly lifting the edge of her sleeve","holding {o} against her chest with one hand, head slightly bowed"]
def cold_pose(n):
    ps=[CG[(n+k*2+k//2)%6].format(o=COBJ[(n*3+k*3)%10]) for k in range(4)]
    return ("Poses (NEW, quiet calm standing poses; a different hand gesture and a different simple object for each figure, not hands clasped at the belly), left to right: "
            f"about 19: {ps[0]}; about 24: {ps[1]}; about 32: {ps[2]}; about 48: {ps[3]}; "+STILL)
def job(jid):
    a,who,tt=jid.split("-"); n=int(who[1:])-1
    if n>=26: i=n-26; mot=MOT[i%13]; prop=CPROP[i%13]; hm=HD[i]; hc=HCOL[i%8]
    else: i=n; mot=MOT[i%13]; prop=CPROP1[i]; hm=HUA1[i]; hc=COL1[i]
    t="cold" if tt=="tcold" else int(tt[1:])
    pal=PAL[who]; main=pal.split(" and ")[0]; neg="" if any(g in pal for g in GREEN) else ", NOT green"
    if t=="cold":
        o=("Outfit for all four (the cold palace, plain but still neat, clean and beautiful, never poor or ragged): a NEW outfit, a simple but well-made plain robe in muted "+main.replace("soft ","").replace("pale ","")+" and pale grey-white linen, clean and neatly tied with a plain sash, hair in a tidy low bun with one plain wooden hairpin, no gold, no jewellery; she looks graceful and dignified")
        ps=cold_pose(n)
    else:
        rich="" if t==1 else (", a little richer than the rank below" if t<=3 else ", clearly much richer and more splendid than the lower ranks")
        if t>=4: o=ca_outfit(t,pal,mot)
        else: o=(f"Outfit for all four ({CRANK[t]}{rich}): a NEW outfit, {CT[t].format(mot=mot)}; her signature colour family {pal} stays the MAIN robe colour ({main}{neg})")
        ps=pose_for(None,i,t,prop,n)
    p=SHORT+" "+o+"."+huadian(t,i,hm,hc)+" "+ps+". No text, no labels."
    if who in MOLE: p=p.replace("From the identity reference keep ONLY her face,","From the identity reference keep ONLY her face (but WITHOUT the small dark mole on her cheek, her skin clear and flawless),")
    if any(w in main for w in ("cream","ivory","beige")):  # C-B: cream palettes must not be told "NOT cream"
        p=p.replace("NOT cream, NOT beige, NOT ivory, ","").replace("NOT a cream, beige or all-gold robe","NOT an all-gold robe").replace("NOT a cream or all-gold robe","NOT an all-gold robe")
    return STY[n%4],MREF[who],p
if __name__=="__main__":
    for j in sys.argv[1:]:
        s,r,p=job(j); print(j,s,r); print(p); print()
