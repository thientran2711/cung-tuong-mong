# mjobs.py: maid-ladder prompts. Job ids:
#  A-mNN-mK  (K=0,2,3,4)  maid identity in maid tier K   -> img/fig-maid-mNN-tmK-aAA.webp   (FIGURES-servants.json, tier "mK")
#  B-cNN-mK  (K=0..4)     consort identity in maid tier K -> img/fig-consort-cNN-tmK-aAA.webp (FIGURES.json, tier "mK")
#  C-mNN-tT  (T=1..8,cold) maid identity in consort tier  -> img/fig-maid-mNN-tT-aAA.webp     (FIGURES-servants.json, tier T / "cold")
# python3 mjobs.py JID...  -> prints "JID style ref" + prompt
import json,sys,os,re
H=os.path.dirname(os.path.abspath(__file__))
FW="/home/user/cung-tuong-mong/dev/figwork"
WT="/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/wt-maidB"
STY=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"]
IDF=json.load(open(FW+"/idfix.json")); FEAT=json.load(open(FW+"/consorts_feat.json"))
SERV=json.load(open(WT+"/img/FIGURES-servants.json"))
MREF={r["identity"]:r["magnificUrl"].split("/")[-1] for r in SERV if r["role"]=="maid" and r.get("tier") in (None,"m1") and r["ageBand"]=="a18"}
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering of the reference portraits; full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft eyes, closed lips or faint smile; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; face clearly visible, 3/4 or frontal view.")
LINE=(" Age lineup: the SAME person drawn four times side by side in one row, evenly spaced with clear empty space between the figures, each complete from top of head to feet, realistic adult proportions (head about one seventh of body height, long legs, never big-headed or chibi).")
BEAU="a very beautiful woman: luminous porcelain skin, soft rosy blush, large soft bright eyes, delicate small nose, small rosy lips, gentle faint smile"
IDK=(" From the identity reference lineup keep ONLY her face, facial features and hair colour; do NOT copy the reference's ages, poses, outfit, colours, hair ornaments or accessories; use the NEW ages, the NEW outfit and the NEW poses below.")
AGES=(" Left to right: about 19, a fresh youthful young woman; about 24, still young and lively, youthful face, no sign of ageing; about 32, a young mature woman in her prime, smooth skin, NO grey or silver hair, NO wrinkles; about 48, a graceful elegant lady, only a few faint silver strands at the temples at most, minimal faint lines, still clearly beautiful, not elderly.")
END=(" Eyes soft, warm and round-almond, never slanted or upturned, never teary; serene gentle face, faint smile at most, no open-mouth laugh. Everyone beautiful at every age. No text, no labels.")
CALM=(" All four stand calmly and gracefully (NO dancing, NO walking stride, NO swirling or flying fabric, robes hang naturally), each with a slight body turn and a different gentle hand position; each figure complete head to feet inside the frame, clear empty space between the four figures.")
MRANK={0:"the lowest palace maid rank (cung nu tho su), yet neat, pretty and never poor",
       1:"a palace maid (cung nu)",
       2:"a senior palace maid (dai cung nu), clearly finer than ordinary maids",
       3:"the palace mistress of servants (chuong su co co), a dignified senior lady with authority",
       4:"a female court official (nu quan), the most refined of all palace servants but still simpler than any imperial consort"}
MCOL={0:["pale sky blue and white","soft blush pink and ivory","light lilac and cream","pale apricot and ivory","soft powder blue and pale grey","light peach-pink and white"],
      1:["soft peach","dusty rose","pale sky blue","soft lavender","light coral pink","misty blue"],
      2:["rose pink","lake blue","warm apricot","soft lilac","coral pink","cornflower blue"],
      3:["deep plum purple","dark indigo blue","deep aubergine","dark slate blue","rich bronze brown","deep navy blue"],
      4:["deep crimson red","cinnabar red","garnet red","deep rose-red","crimson red","vermilion red"]}
FLW=["a small pink silk flower","a white jasmine sprig","a small plum blossom","a little orchid","a small peach blossom","a tiny camellia"]
def mout(k,i):
    c=MCOL[k][i%len(MCOL[k])]; neg=", NOT green"
    if k==0: return (f"a neat, pretty light silk ruqun (short jacket over a long skirt) in {c}{neg}, with small delicate embroidered flowers on the collar and cuffs and a simple embroidered silk sash; hair in neat double buns held by proper silver hairpins (trâm) with {FLW[i%6]}; small pearl stud earrings; clean, fresh and lovely, one step simpler than an ordinary maid but never coarse, plain or poor")
    if k==1: return (f"a pretty fine silk ruqun (jacket over a long skirt) in {c}{neg}, with embroidered flower borders at the collar, cuffs and hem and an embroidered silk sash with a small tassel; neat double buns with silver hairpins, a small pearl pin and {FLW[i%6]}, small earrings; neat and lovely, an ordinary palace maid, a little finer than the lowest maids but plainer than senior maids (no brocade jacket, no jade)")
    if k==2: return (f"a fine silk ruqun in {c}{neg}, with woven brocade trim at collar, cuffs and hem, a layered half-sleeve brocade jacket (bijia) on top, an embroidered silk sash with a jade pendant on a silk cord; neat double-loop buns with several silver and pearl hairpins and small fresh flowers, pearl earrings; clearly finer than an ordinary maid")
    if k==3: return (f"a dignified long robe of rich dark silk in {c}{neg}, with subtle tone-on-tone woven pattern and neat embroidered borders, a dark brocade waist sash with a ring of brass keys and a small ledger pouch hanging at her waist; hair in a high neat bun with one gold hairpin and a small gold comb, small jade earrings; an air of calm authority, mature and respected, still beautiful")
    if k==4: return (f"a formal court lady official's robe in {c}{neg}, with a square embroidered rank badge (buzi) of a crane and clouds on the chest, round collar, neat embroidered borders, a narrow jewelled belt; a clearly visible formal black gauze court official's headdress (small winged cap) with a gold ornament worn over a neat high bun, jade earrings; refined and dignified, the most elegant of the palace servants but with much less gold and no phoenix crown, clearly below an imperial consort")
PROPS={0:["holding a small bamboo broom upright beside her","carrying a woven basket of fresh flowers on her forearm","holding a neat stack of folded clean linen in both arms","holding a small copper water ewer","holding a bundle of incense sticks","holding a feather duster lowered at her side","carrying a small lidded food box by its handle","holding a folded silk cloth over one arm"],
       1:["holding a small teacup on a saucer in both hands","carrying a small round lantern","holding a folded handkerchief at her waist","carrying a bamboo basket of fruit","holding a small incense burner","holding a rolled bamboo mat","holding a small round tray with a bowl","holding a sprig of flowers"],
       2:["holding a lacquer tray with a teapot and two cups","holding a small paper lantern on a short pole","holding a round silk fan lowered at her side","holding a folded embroidered robe over both forearms","holding a small sealed letter in both hands","holding a vase with a branch of plum blossoms","holding a small jewellery box","holding a porcelain teapot in both hands"],
       3:["holding an open account ledger in one hand, the other resting on the keys at her waist","holding a thread-bound ledger against her chest","hands folded calmly in her sleeves, keys at her waist","holding a small writing brush and a ledger","holding a ring of keys lifted slightly in one hand","holding a folded duty list","resting both hands on a closed ledger in front of her","holding a small abacus"],
       4:["holding a rolled document scroll in both hands","holding a small lacquered document box","hands folded formally in front of her within her sleeves","holding an open thread-bound register","holding a writing brush and a folded memorial","holding a small seal box","holding a rolled scroll tied with a red cord at her side","holding a sheaf of folded papers"]}
# consort ladder (spec4 TIERX 1-3 + spec5 LAD 4-8), worded for a maid raised to consort
sys.path.insert(0,FW)
CT={1:"a fine silk robe with delicate embroidered {mot} at the collar, sleeves and hem and a soft silk sash (elegant, never poor, little gold), hair in a neat bun with pretty silver hairpins and a fresh flower",
2:"a fine silk robe with embroidered borders and a small woven {mot} pattern (elegant, a little more ornate than the lowest consort rank, little gold), neat chignon with silver and pearl hairpins and a fresh flower",
3:"a patterned silk robe with small woven {mot}, a woven brocade sash and fuller layered sleeves (clearly richer than the lower ranks), layered chignon with fresh flower hairpins and small silk flowers",
4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY gold brocade robe densely embroidered in gold with phoenixes and {mot}, an embroidered pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe heavily embroidered with golden phoenixes and clouds, with crimson and bright gold accents, a layered gold collar, strands of pearls across the chest, a long train behind her; grand chignon with a SMALL gold phoenix crown with pearl strands and kingfisher-blue accents",
8:"the Empress's imperial phoenix ceremonial robe, large golden phoenixes and clouds embroidered all over with bright gold and red, a jewelled layered gold collar, pearl strands, a very long train; a FULL gold phoenix crown with pearls and kingfisher-blue inlay and pearl strands hanging at the sides; the most splendid outfit of all"}
CRANK={1:"rank-1 consort (Dap ung)",2:"rank-2 consort (Thuong tai)",3:"rank-3 consort (Quy nhan)",4:"rank-4 consort (Tan)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quy phi)",7:"rank-7 imperial noble consort (Hoang quy phi)",8:"the Empress (Hoang hau)"}
CPAL=["soft rose pink and gold","lake blue and silver","warm apricot and gold","lilac and silver","coral red and gold","cornflower blue and gold","peach pink and pearl white","plum purple and gold"]
MOT=["peonies","plum blossoms","lotus flowers","orchids","chrysanthemums","butterflies","cranes","auspicious clouds","magnolias","begonias","camellias","osmanthus"]
CPROP=["a round silk fan","a folding fan","a sprig of plum blossoms","a small jade pendant on a red cord","a handkerchief","a small incense sachet","a thread-bound book","a single peony"]
def cout(t,i):
    if t=="cold": return ("Outfit for all four (the cold palace, plain but still neat, clean and beautiful, never poor or ragged): a simple but well-made plain robe of grey-white linen, clean and neatly tied with a plain sash, hair in a tidy low bun with one plain wooden hairpin, no gold, no jewellery; she looks graceful and dignified")
    pal=CPAL[i%8]; mot=MOT[i%12]; main=pal.split(" and ")[0]
    rich="" if t<=1 else ", clearly richer than the lower ranks"
    return (f"Outfit for all four ({CRANK[t]}{rich}): a NEW outfit, {CT[t].format(mot=mot)}; colour family {pal}, main robe colour {main}, NOT green")
def poses(lst,i,extra=""):
    p=[lst[(i+j*3)%len(lst)] for j in range(4)]
    return (" Poses (NEW, calm and standing), left to right: about 19: "+p[0]+", body slightly turned to the left; about 24: "+p[1]+", three-quarter view; about 32: "+p[2]+", slight turn to the right; about 48: "+p[3]+", gently frontal."+extra)
def job(jid):
    a,who,tt=jid.split("-"); n=int(who[1:])-1
    if a in "AB":
        k=int(tt[1:])
        desc=f" A palace maid of the imperial court, {MRANK[k]}, {BEAU}."
        if a=="B": desc+=f" Her own features: {FEAT[who]}."
        p=PRE+LINE+desc+IDK+AGES+" Outfit for all four: a NEW outfit, "+mout(k,n+(3 if a=='B' else 0))+"."+poses(PROPS[k],n)+CALM+END
        ref=MREF[who] if a=="A" else IDF[f"N-{who}-t1"]
    else:
        t="cold" if tt=="tcold" else int(tt[1:])
        desc=f" A former palace maid now raised to imperial consort, {BEAU}."
        pl=[f"holding {CPROP[n%8]}","hands lightly together at her waist","one hand lifting her sleeve slightly",f"holding {CPROP[(n+3)%8]}","hands folded in her sleeves","one hand resting on her sash"]
        if t=="cold": pl=["holding a plain wooden comb","hands folded quietly in her sleeves","holding a small clay teacup","holding a simple folded letter","hands lightly together","holding a plain fan"]
        p=PRE+LINE+desc+IDK+AGES+" "+cout(t,n)+"."+poses(pl,n)+CALM+END
        ref=MREF[who]
    return STY[n%4],ref,p
if __name__=="__main__":
    for j in sys.argv[1:]:
        s,r,p=job(j); print(j,s,r); print(p); print()
