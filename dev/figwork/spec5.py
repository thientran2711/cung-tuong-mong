# spec5.py: rank-ladder outfits t4-t8 (+player lc) with "keep ONLY face/hair colour/colour family" identity wording.
# Rewrites prompts of N-cXX-t4..t8 and N-lookN-t2..t8,tlc in jobs.json. Run after spec2/3/4.
import json,re
J=json.load(open("jobs.json"))
GREEN=("green","celadon","jade","teal","mint","sage")
RANK={4:"rank-4 consort (Tần)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quý phi)",7:"rank-7 imperial noble consort (Hoàng quý phi)",8:"the Empress (Hoàng hậu)"}
LAD={4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY gold brocade robe densely embroidered in gold with phoenixes and {mot}, an embroidered pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe heavily embroidered with golden phoenixes and clouds, with crimson and bright gold accents, a layered gold collar, strands of pearls across the chest, a long flowing train behind her; grand chignon with a SMALL gold phoenix crown with pearl strands and kingfisher-blue accents",
8:"the Empress's imperial phoenix ceremonial robe, large golden phoenixes and clouds embroidered all over with bright gold and red, a jewelled layered gold collar, pearl strands, a VERY long trailing train; a FULL gold phoenix crown with pearls and kingfisher-blue inlay and pearl strands hanging at the sides; the most splendid outfit of all"}
def outfit(t,pal,mot):
    main=pal.split(" and ")[0]
    neg="" if any(g in pal for g in GREEN) else ", NOT green"
    col=f"her signature colour family {pal} stays the MAIN robe colour ({main}{neg})"
    return f"Outfit for all four ({RANK[t]}, clearly much richer and more splendid than the lower ranks): a NEW outfit, {LAD[t].format(mot=mot)}; {col}"
IDK=" From the identity reference lineup keep ONLY her face, facial features, hairstyle colour, signature colour family and the same four ages; do NOT copy the outfit, hair ornaments or accessories of the reference, dress her in the NEW richer outfit below."
def rew(p,t,pal,mot):
    p=re.sub(r" Keep her exact face[^.]*lineup\.",IDK,p)
    i=p.index(" Outfit for all four"); k=p.index(". Pose for all four")
    return p[:i]+" "+outfit(t,pal,mot)+p[k:]
LCOL={"look1":"soft lavender","look2":"rose pink","look3":"pale celadon green","look4":"warm peach"}
LMOT={"look1":"orchids","look2":"peonies","look3":"lotus flowers","look4":"plum blossoms"}
for key,j in J.items():
    m=re.match(r"N-(c\d\d)-t([4-8])$",key)
    if m:
        t=int(m.group(2)); p4=J[f"N-{m.group(1)}-t4"].get("prompt0",J[f"N-{m.group(1)}-t4"]["prompt"])
        mot=re.search(r"embroidered (.+?) on collar",p4).group(1); pal=j["figs"][0]["palette"]
        j.setdefault("prompt0",j["prompt"]); j["prompt"]=rew(j["prompt0"],t,pal,mot); j["pal"]=pal
    m=re.match(r"N-(look\d)-t([2-8]|lc)$",key)
    if m:
        lk,t=m.group(1),m.group(2); j.setdefault("prompt0",j["prompt"]); p=j["prompt0"]
        if t=="lc":
            o=("Outfit for all four (the cold palace, plain but still neat, clean and beautiful, never poor or ragged): a simple but well-made plain robe in muted "+LCOL[lk].replace("soft ","")+" and pale grey, clean and neatly tied with a plain sash, hair in a tidy low bun with one plain wooden hairpin, no gold, no jewellery; she looks graceful and dignified")
            p=re.sub(r" Keep her exact face[^.]*lineup\.",IDK,p); i=p.index(" Outfit for all four"); k=p.index(". Pose for all four"); p=p[:i]+" "+o+p[k:]
        elif int(t)>=4: p=rew(p,int(t),LCOL[lk],LMOT[lk])
        else:
            lad={2:"a fine silk robe with embroidered borders of {mot} and a small woven pattern, a silk sash with a small jade pendant; neat chignon with silver and pearl hairpins and a fresh flower",
                 3:"a patterned silk robe with woven {mot}, a woven brocade sash and fuller layered sleeves; layered chignon with a few small gold-and-pearl hairpins and small silk flowers"}[int(t)].format(mot=LMOT[lk])
            p=re.sub(r" Keep her exact face[^.]*lineup\.",IDK,p); i=p.index(" Outfit for all four"); k=p.index(". Pose for all four")
            neg="" if lk=="look3" else ", NOT green"
            p=p[:i]+f" Outfit for all four (a little richer than the rank below): a NEW outfit, {lad}; her signature colour {LCOL[lk]} is the MAIN robe colour{neg}"+p[k:]
        if t=="lc": p=p.replace("NEW richer outfit","NEW plain outfit")
        j["prompt"]=p
# ---- pose system (owner: varied lively poses, own signature per consort, grander at high tiers) ----
POSES={"kieungao":["raising {prop} beside her cheek with one hand, chin slightly lifted, the other hand lightly holding her sleeve",
 "walking forward mid-step, long sleeves flowing behind her, {prop} held at her side",
 "turning to look back over her shoulder, body in three-quarter view, {prop} held near her waist",
 "adjusting a gold hairpin in her chignon with one raised hand, {prop} in the other hand",
 "standing as a breeze lifts her long silk stole, one hand catching the stole, {prop} in the other hand",
 "lifting her skirt hem slightly with one hand as if stepping up a stair, {prop} in the other hand"],
"numi":["offering {prop} forward with both hands, head tilted gently",
 "gazing sideways at a small butterfly resting on her raised finger, {prop} in the other hand",
 "holding a small round palace lantern in one hand and {prop} in the other, mid-step",
 "a small songbird perched on her raised finger, feeding it, {prop} in the other hand",
 "hands clasped softly at her chest holding {prop}, head slightly bowed",
 "twirling one long sleeve in a light dance step, {prop} in the other hand"],
"hienlanh":["holding {prop} in both hands in front of her, looking down at it tenderly",
 "walking mid-step carrying {prop}, long sleeves swaying",
 "holding a small teacup on a saucer in both hands as if offering tea",
 "raising a small plum blossom branch up to her face to smell it",
 "hands clasped at her chest in quiet prayer, eyes softly lowered",
 "holding a small round palace lantern in front of her with both hands"],
"dangi":["raising {prop} open beside her cheek, glancing over it",
 "turning to look back over her shoulder, {prop} in hand",
 "twirling a long silk ribbon in a graceful dance step",
 "adjusting a hairpin with one raised hand, {prop} in the other hand",
 "walking mid-step with sleeves flowing, {prop} held open at her side",
 "leaning lightly to one side, one hand at her hip, {prop} held up near her shoulder"],
"thamvong":["walking forward mid-step with sleeves flowing, {prop} in one hand",
 "turning to look back over her shoulder, holding {prop}",
 "reading an unrolled scroll held open in both hands",
 "holding {prop} raised in front of her, studying it calmly",
 "standing as a breeze lifts her long stole, one hand holding {prop}",
 "adjusting a gold hairpin with one raised hand, the other hand holding {prop}"],
"thanhnha":["playing a jade flute held to her lips",
 "holding a pipa upright and plucking its strings",
 "reading an unrolled scroll held open in both hands",
 "walking slowly while reading {prop} held open in one hand",
 "holding a raised writing brush, a sheet of paper in the other hand",
 "holding a small teacup in both hands, about to sip"]}
def propnoun(p):
    s=p[p.index('three-quarter view, ')+20:p.index('. Eyes soft')]
    for a in (", lowered at her side"," held open near her chest below the chin"," held near her chest below the chin"): s=s.replace(a,"")
    for a in ("hands folded at her waist holding ","holding ","cradling "): s=s.replace(a,"")
    if s.startswith("hands folded at her waist, "): s=s.replace("hands folded at her waist, ","")
    return "her "+s.split(" ",1)[1] if s.split(" ",1)[0] in ("a","an") else s
CONS=json.load(open("consorts_ids.json"))
IDP=" From the identity reference lineup keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the reference's ages, poses, outfit, hair ornaments or accessories; use the NEW (younger) ages, the NEW outfit and the NEW poses below."
L30=["a graceful half-turn toward the viewer, {prop} held elegantly before her",
 "holding a small teacup in one hand and {prop} in the other, confident and poised",
 "holding a half-unrolled scroll in both hands, glancing up from it",
 "one hand lightly raised to her collar, {prop} in the other hand",
 "stepping gently sideways in a graceful turn, {prop} held at her waist"]
L42=["a measured upright stance with a slight turn, hands resting together at her sleeves, {prop} held low",
 "standing composed, one hand at the edge of her other sleeve, {prop} held at her side",
 "a slight three-quarter turn, holding {prop} in both hands at her waist, composed",
 "standing calmly, one hand resting lightly on the sash at her waist, the other holding {prop}"]
L55=["a relaxed graceful stance, shoulders relaxed, holding a small sprig of flowers in both hands",
 "a serene stately stance, holding a small teacup in both hands",
 "standing gently, {prop} held loosely in both hands before her, shoulders relaxed",
 "a slow graceful stance, one hand resting over the other at her waist"]
def pose_for(tr,i,t,prop,g=0):
    a=POSES[tr][(i+t-1)%6]; b=L30[(g+2*t)%5]; c=L42[(g+t)%4]; d=L55[(g*3+t+g//4)%4]
    ps=[x.format(prop=prop) for x in (a,b,c,d)]
    if t==8 and i%3==0: ps[2]=ps[3]="a regal frontal stance, hands hidden in her long wide sleeves before her, the train spread behind her"
    suf=", with stately grace" if t>=7 else (", poised" if t>=5 else "")
    ps=[p+suf if "regal frontal" not in p else p for p in ps]
    return ("Poses (NEW, NOT the reference's poses; a different age-appropriate pose for each figure, same person and same signature prop), left to right: "
            f"about 19, lively and youthful: {ps[0]}; about 24, lively and confident: {ps[1]}; about 32, poised, in her prime: {ps[2]}; about 48, graceful and calm: {ps[3]}; "
            "each figure complete head to feet inside the frame, compact poses, the four figures well apart and never overlapping")
for cid,tr,mi in CONS:
    i=mi-1; g=int(cid[1:])-1
    for t in range(1,9):
        j=J[f"N-{cid}-t{t}"]; j.setdefault("prompt0",j["prompt"]); p=j["prompt"] if t>=4 else j["prompt0"]
        prop="her small sprig of white jasmine" if cid=="c10" else propnoun(j["prompt0"])
        p=p.replace(IDK,IDP)
        if t>1: p=re.sub(r" Keep her exact face[^.]*lineup\.",IDP,p)
        else:
            if IDP not in p: p=p.replace(" Left to right:",IDP+" Left to right:",1)
        a=p.index("Pose for all four") if "Pose for all four" in p else p.index("Poses (NEW"); b=p.index(". Eyes soft")
        p=p[:a]+pose_for(tr,i,t,prop,g)+p[b:].replace("never teary.","never teary; serene gentle face, faint smile at most, no open-mouth laugh.")
        j["prompt"]=p; j["ref"]="SHEET:N-"+cid+"-t1"; j["pose"]=pose_for(tr,i,t,prop,g)

OLDAG=" Left to right: about 22, youthful adult; about 30, mature and poised; about 42, dignified and still beautiful, only subtle fine lines at the eyes; about 55, graceful beautiful older lady, only soft faint lines, silver-streaked hair, still lovely."
NEWAG=" Left to right: about 19, a fresh youthful young woman; about 24, still young and lively, youthful face, no sign of ageing; about 32, a young mature woman in her prime, smooth skin, NO grey or silver hair, NO wrinkles; about 48, a graceful elegant lady, only a few faint silver strands at the temples at most, minimal faint lines, still clearly beautiful, not elderly."
for key,j in J.items():
    if key.startswith("N-") and OLDAG in j["prompt"] and (re.match(r"N-c\d\d-t",key) or key.startswith("N-look")):
        j["prompt"]=j["prompt"].replace(OLDAG,NEWAG)
json.dump(J,open("jobs.json","w"),indent=0)
