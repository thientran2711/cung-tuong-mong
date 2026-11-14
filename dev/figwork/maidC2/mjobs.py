# mjobs.py (Part C, m27-m52): job id C-mNN-tT (T=1..8) / C-mNN-tcold -> maid identity raised to consort tier
# python3 mjobs.py JID... -> "JID style ref" + full prompt
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__))
exec(open(H+"/poses.py").read())
exec(open(H+"/calm.py").read())  # OWNER REVERSAL: calm standing pose_for overrides the motion one
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
CPROP=["her round silk fan","her folding fan","her sprig of plum blossoms","her small jade pendant on a red cord","her embroidered handkerchief","her small incense sachet","her thread-bound book","her single peony","her small round palace lantern","her sprig of osmanthus","her little hand mirror","her rolled poem scroll","her small jade flute"]
TRS=list(POSES)
HD=["a tiny lily-of-the-valley bell","a small pomegranate flower","a small water-caltrop leaf","a tiny magnolia bud","a tiny gourd","a small lingzhi cloud-mushroom","a tiny ruyi head","a tiny endless knot","a small wisteria cluster","a tiny hibiscus","a tiny koi fish","a small apricot blossom","a tiny dragonfly","a small rose","a tiny pine sprig","a small pear blossom","a tiny iris","a small azalea","a tiny jasmine flower","a small maple leaf","four tiny dots in a square","a tiny palace-lantern shape","a tiny conch shell","a small morning-glory","a tiny honeysuckle sprig","a small gardenia"]
HCOL=["soft rose pink","pale coral","rose red","soft peach-pink","cinnabar red","vermilion","coral red","pale pink"]
def hmat(t,i):
    c=HCOL[i%8]
    if t<=2: return f"painted in {c}, simple fine lines"
    if t<=4: return f"painted in {c}, finer detailed lines"
    if t<=6: return f"painted in {c} with a thin fine gold outline, more detailed"
    return "in gold leaf and cinnabar red with one tiny pearl dot, the finest detail"
exec(open(H+"/hl.py").read())
def huadian(t,i):
    if t=="cold": return " No huadian on the forehead."
    if t>=2: return f" Forehead: a huadian ornament between the brows: {hdesc(t,HD[i],HCOL[i%8])}; the same huadian on all four figures."
    return (f" Forehead: a small, delicate, refined huadian between the brows, elegant, not large, about the size of a fingertip and clearly visible (like the small red flower between the brows in a classic portrait): her signature motif {HD[i]}, {hmat(t,i)}; "
            "same small size at every rank, never covering the forehead or spreading to the brows; the same huadian on all four figures.")
SHORT=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering, soft natural light, fine detail, exactly matching the rendering of the reference portraits; plain light parchment background, soft even light. "
 "Age lineup: the SAME woman drawn four times side by side in one row, clear empty space between the figures, each complete head to feet, realistic adult proportions (head one seventh of body height, never chibi). "
 "A former palace maid now raised to imperial consort, very beautiful: fair flawless porcelain skin (no moles, no beauty marks), soft rosy blush, large soft warm round-almond eyes (never slanted, never teary), delicate nose, small rosy lips, serene gentle face, faint smile at most. "
 "From the identity reference keep ONLY her face, facial features, hair colour and colour family; NOT its ages, poses, maid's outfit or ornaments. "
 "Left to right: about 19, fresh and youthful; about 24, young and lively, no sign of ageing; about 32, in her prime, smooth skin, no grey hair, no wrinkles; about 48, a graceful elegant lady, her hair still fully DARK black-brown like the younger figures, at most two or three single fine silver hairs barely visible, NO grey streak, NO grey or silver temples, NOT grey-haired, minimal faint lines, still clearly beautiful, not elderly.")
MOTION="dynamic graceful motion in every figure, caught mid-movement, skirt hems swirling, long sleeves, sash and stole floating in a soft breeze, flowing fabric, hair tassels swaying (the older figures move more calmly but still gracefully); each figure complete head to feet inside the frame, compact, extra empty space between the four figures so the swirling fabric never overlaps"
MOTS="graceful motion, skirts, sleeves and sash floating in a soft breeze (older figures calmer); each figure complete head to feet, extra space between figures so fabric never overlaps"
def job(jid):
    a,who,tt=jid.split("-"); n=int(who[1:])-1; i=n-26
    t="cold" if tt=="tcold" else int(tt[1:])
    pal=PAL[who]; main=pal.split(" and ")[0]; neg="" if any(g in pal for g in GREEN) else ", NOT green"
    if t=="cold":
        o=("Outfit for all four (the cold palace, plain but still neat, clean and beautiful, never poor or ragged): a NEW outfit, a simple but well-made plain robe in muted "+main.replace("soft ","").replace("pale ","")+" and pale grey-white linen, clean and neatly tied with a plain sash, hair in a tidy low bun with one plain wooden hairpin, no gold, no jewellery; she looks graceful and dignified")
        ps=pose_for(TRS[i%6],i,1,"a plain wooden comb",n).replace("gold hairpin","wooden hairpin")
    else:
        rich="" if t==1 else (", a little richer than the rank below" if t<=3 else ", clearly much richer and more splendid than the lower ranks")
        o=(f"Outfit for all four ({CRANK[t]}{rich}): a NEW outfit, {CT[t].format(mot=MOT[i%13])}; her signature colour family {pal} stays the MAIN robe colour ({main}{neg})")
        ps=pose_for(TRS[i%6],i,t,CPROP[i%13],n)
    desc=f" A former palace maid now raised to imperial consort, {BEAU}."
    if os.environ.get("LONG"): p=PRE+LINE+desc+IDK+AGES+" "+o+"."+huadian(t,i)+" "+ps+END
    else: p=SHORT+" "+o+"."+huadian(t,i)+" "+ps+". No text, no labels."
    return STY[n%4],MREF[who],p
if __name__=="__main__":
    for j in sys.argv[1:]:
        s,r,p=job(j); print(j,s,r); print(p); print()
