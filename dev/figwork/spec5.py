# spec5.py: rank-ladder outfits t4-t8 (+player lc) with "keep ONLY face/hair colour/colour family" identity wording.
# Rewrites prompts of N-cXX-t4..t8 and N-lookN-t2..t8,tlc in jobs.json. Run after spec2/3/4.
import json,re
J=json.load(open("jobs.json"))
GREEN=("green","celadon","jade","teal","mint","sage")
RANK={4:"rank-4 consort (Tần)",5:"rank-5 consort (Phi)",6:"rank-6 noble consort (Quý phi)",7:"rank-7 imperial noble consort (Hoàng quý phi)",8:"the Empress (Hoàng hậu)"}
LAD={4:"a layered silk robe of two or three visible layers with WIDE gold-thread embroidered borders of {mot} at collar, sleeves and hem, an embroidered cloud collar (yunjian) over the shoulders and an embroidered silk sash; elegant high chignon with gold and jade hairpins and small dangling gold bu yao tassel hairpins",
5:"a silk brocade robe richly embroidered in gold with phoenixes and peonies, long trailing wide sleeves, a gold-embroidered waistband with hanging jade belt pendants and tassels, a sheer silk shawl; high ornate chignon with a LARGER gold headdress with dangling gold tassels and jade pins, gold earrings",
6:"a HEAVY silk brocade robe in SATURATED {main} silk, embroidered with phoenixes and {mot} in {main} and gold thread along the borders, an embroidered {main} pearl-edged cape/stole over the shoulders, gold-and-jade necklace, earrings and bracelets; tall chignon crowned by a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
7:"a near-empress ceremonial robe of SATURATED {main} silk, embroidered with phoenixes and auspicious clouds in gold thread on the chest and along the borders, a jewelled cloud-collar cape edged with pearls and gold over the shoulders, strands of pearls across the chest, a jade-and-gold belt with long tassels, a long flowing {main} train behind her; tall grand chignon crowned by a LARGE ornate gold phoenix crown (grander and taller than a noble consort's headdress, only a little smaller than the Empress's) with spreading gold phoenix wings, pearl strands, kingfisher-blue inlay and many dangling gold tassels",
8:"the Empress's imperial phoenix ceremonial robe of SATURATED {main} silk with large phoenixes and clouds embroidered in gold thread, a jewelled layered gold-and-pearl cloud-collar cape over the shoulders, many pearl strands, a jade-and-gold belt with long tassels, a VERY long {main} trailing train; the GRANDEST headdress of all: a FULL tall gold phoenix crown with nine gold phoenixes, pearls, kingfisher-blue inlay, and long pearl strands hanging at the sides; the most splendid outfit of all, clearly grander than every other rank"}
ACC={"cherry-blossom pink and pale green":"pale green","lotus pink and celadon":"celadon"}
WHITE=("ivory","white","moonlight")
def outfit(t,pal,mot):
    main=pal.split(" and ")[0]; acc=pal.split(" and ")[1] if " and " in pal else "gold"
    neg="" if any(g in pal for g in GREEN) else ", NOT green"
    col=f"her signature colour family {pal} stays the MAIN robe colour ({main}{neg}); the robe itself is clearly {main} silk, gold only as embroidery accents, NOT a cream, beige or all-gold robe"
    if pal in ACC: col=f"her signature colour family {pal}: {main} is the MAIN robe colour (the robe is clearly {main}, NOT a green robe; {ACC[pal]} only as a small accent), gold only as embroidery accents, NOT a cream or all-gold robe"
    if t>=6:  # art4: strong colour rule (t6 first tries washed pale palettes into cream/gold; this wording fixed c17 c20 c28 c30 c31 c32)
        m=main if not any(w in main for w in ("ivory","white")) else "luminous cool "+main+"-white"
        notiv="" if any(w in main for w in ("ivory","white")) else ", NOT ivory"
        if pal in ACC: neg=", NOT a green robe"
        col=(f"COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly {m} silk (her signature colour family {pal}), with large areas of plain {main} silk visible; "+
             ("" if "gold" in acc and pal not in ACC else f"{acc if pal not in ACC else ACC[pal]} only as a small accent; ")+f"gold only as thin accents on the borders; NOT cream, NOT beige{notiv}, NOT an all-gold robe{neg}")
        if any(w in main for w in ("ivory","white")): col=col.replace("NOT cream, NOT beige","NOT yellow, NOT beige")
    m2=("luminous cool "+main) if any(w in main for w in ("ivory","white")) else main
    return f"Outfit for all four ({RANK[t]}, clearly much richer and more splendid than the lower ranks): a NEW outfit, {LAD[t].format(mot=mot,main=m2).replace("SATURATED luminous","luminous")}; {col}"
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
POSES={"kieungao":["walking mid-step, raising {prop} beside her cheek with one hand, chin slightly lifted, the other long sleeve floating out",
 "walking forward mid-step, long sleeves flowing behind her, {prop} held at her side",
 "turning to look back over her shoulder, body in three-quarter view, {prop} held near her waist",
 "turning mid-step while adjusting a gold hairpin with one raised hand, her sleeve sliding back, {prop} in the other hand",
 "standing as a breeze lifts her long silk stole, one hand catching the stole, {prop} in the other hand",
 "lifting her skirt hem slightly with one hand as if stepping up a stair, {prop} in the other hand"],
"numi":["offering {prop} forward with both hands, head tilted gently",
 "gazing sideways at a small butterfly resting on her raised finger, {prop} in the other hand",
 "holding a small round palace lantern in one hand and {prop} in the other, mid-step",
 "a small songbird perched on her raised finger, feeding it, {prop} in the other hand",
 "skipping lightly forward, holding {prop} at her chest, skirt and ribbons fluttering",
 "twirling one long sleeve in a light dance step, {prop} in the other hand"],
"hienlanh":["walking lightly forward holding {prop}, looking down at it tenderly, sleeves swaying",
 "walking mid-step carrying {prop}, long sleeves swaying",
 "stepping forward to offer a small teacup in both hands, sleeves swinging",
 "raising a small plum blossom branch up to her face to smell it",
 "a light little twirl, hands clasped at her chest, skirt swirling out",
 "walking forward holding a small round palace lantern, sleeves and sash swaying"],
"dangi":["raising {prop} open beside her cheek, glancing over it",
 "turning to look back over her shoulder, {prop} in hand",
 "twirling a long silk ribbon in a graceful dance step",
 "adjusting a hairpin with one raised hand, {prop} in the other hand",
 "walking mid-step with sleeves flowing, {prop} held open at her side",
 "swaying in a light turn, {prop} held up near her shoulder, skirt swirling"],
"thamvong":["walking forward mid-step with sleeves flowing, {prop} in one hand",
 "turning to look back over her shoulder, holding {prop}",
 "walking while reading an unrolled scroll held open in both hands, sleeves trailing",
 "walking forward holding {prop} raised, glancing at it, stole flowing",
 "standing as a breeze lifts her long stole, one hand holding {prop}",
 "adjusting a gold hairpin with one raised hand, the other hand holding {prop}"],
"thanhnha":["playing a jade flute held to her lips while stepping forward, sleeves fluttering",
 "walking with a pipa held upright, plucking it, skirt swirling",
 "walking while reading an unrolled scroll held open in both hands, sleeves trailing",
 "walking slowly while reading {prop} held open in one hand",
 "turning mid-step with a raised writing brush in one hand and a sheet of paper in the other, sleeves flowing",
 "turning lightly with a small teacup in both hands, sash fluttering"]}
def propnoun(p):
    s=p[p.index('three-quarter view, ')+20:p.index('. Eyes soft')]
    for a in (", lowered at her side"," held open near her chest below the chin"," held near her chest below the chin"): s=s.replace(a,"")
    for a in ("hands folded at her waist holding ","holding ","cradling "): s=s.replace(a,"")
    if s.startswith("hands folded at her waist, "): s=s.replace("hands folded at her waist, ","")
    return "her "+s.split(" ",1)[1] if s.split(" ",1)[0] in ("a","an") else s
CONS=json.load(open("consorts_ids.json"))
IDP=" From the identity reference lineup keep ONLY her face, facial features, hairstyle colour and signature colour family; do NOT copy the reference's ages, poses, outfit, hair ornaments or accessories; use the NEW (younger) ages, the NEW outfit and the NEW poses below."
# ---- CALM pose system (OWNER REVERSAL 11/14 late, binding): calm STANDING poses like the early t1 lineups; no swirling,
# no flying sleeves, no dance, no mid-stride. Variety ONLY from arms/hands/props, slight 3/4 body turns and head tilts.
# Younger = livelier gestures, older = calmer; everyone stands still. Grander posture by tier (t5+ poised, t7+ regal, t8 some hands-in-sleeves).
G19=["raising {prop} up near her cheek with one hand, head tilted slightly, the other hand resting at her waist",
 "holding {prop} up before her chest with both hands, looking down at it with a gentle smile",
 "body turned three-quarters to the left, glancing back toward the viewer, {prop} held at her side",
 "one hand raised adjusting a hairpin, the other hand holding {prop} lowered at her side",
 "holding {prop} in one hand while the other hand lightly lifts the edge of her sleeve, head tilted",
 "body turned three-quarters to the right, both hands holding {prop} lowered before her, head tilted toward the viewer"]
G24=["holding {prop} at her chest with one hand, the other hand resting lightly on her sash",
 "body turned three-quarters to the right, {prop} lowered in one hand, the other hand lifting her sleeve slightly",
 "holding {prop} half-raised beside her shoulder, chin slightly lowered",
 "holding {prop} with both hands at waist height, a slight turn of the body",
 "body turned three-quarters to the left, {prop} held before her in one hand, the other hand at her waist"]
G32=["holding a small celadon teacup on its saucer before her with both hands",
 "holding a half-open folding fan at her chest",
 "holding a rolled scroll in both hands before her",
 "holding a string of sandalwood prayer beads in one hand, the other hand resting over it",
 "holding a small closed oil-paper parasol upright at her side",
 "holding a small gilt birdcage in one hand, the other hand lightly at her waist",
 "holding a small embroidered incense sachet with long tassels before her",
 "holding {prop} lowered gracefully before her with both hands"]
G48=["hands calmly clasped inside her long sleeves before her",
 "holding a small teacup in one hand, the other hand lightly beneath it",
 "holding a closed silk-bound book at her waist with both hands",
 "holding {prop} lightly in one hand, the other hand resting over her sash",
 "holding a string of prayer beads, hands gently together before her",
 "holding a small sprig of flowers lowered in one hand, the other hand at her waist"]
STILL=("all four standing still, upright and composed at full height like a formal portrait (NOT walking, NOT dancing, NOT mid-stride, "
 "never crouching, bending or leaning), feet together under the robe, robe and skirt hanging straight and calm, sleeves, sash and ribbons falling "
 "naturally with NO swirling and NO flying fabric; tall slender elegant adult proportions, about seven and a half heads tall, small head, long legs; "
 "each figure complete head to feet inside the frame, slim silhouette, clear empty space between the four figures")
def pose_for(tr,i,t,prop,g=0):
    a=G19[(g+t)%6]; b=G24[(g*2+t)%5]; c=G32[(g*3+t)%8]; d=G48[(g+2*t)%6]
    ps=[x.format(prop=prop) for x in (a,b,c,d)]
    if t==8 and g%3==0: ps[2]=ps[3]="standing in stately stillness, hands hidden in her long wide sleeves before her, the long train spread on the ground behind her"
    suf=", with regal stately grace" if t>=7 else (", stately poised posture" if t>=5 else "")
    ps=[p+suf if "stately stillness" not in p else p for p in ps]
    return ("Poses (NEW, NOT the reference's poses; calm standing poses; a different hand gesture for each figure, same person), left to right: "
            f"about 19, youthful, a gently lively gesture: {ps[0]}; about 24, confident and graceful: {ps[1]}; about 32, poised, in her prime: {ps[2]}; about 48, serene and calm: {ps[3]}; "
            +STILL)
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
# ---- LÃNH CUNG (cold palace) tier "cold": ONE shared plain outfit for every consort (owner 11/14) ----
COLDO=("Outfit for all four (the cold palace, ONE plain outfit identical for everyone): a plain UNDYED pale grey-white coarse linen robe with a simple "
 "cross collar and a plain linen sash, NO embroidery, NO pattern, NO colour, NO jewellery, NO gold; hair in a simple neat low bun held by ONE plain wooden hairpin, "
 "no flowers, no ornaments; clean, neat and tidy, never ragged, torn, dirty or poor-looking; she is still very beautiful, graceful and dignified")
IDC=(" From the identity reference lineup keep ONLY her face, facial features and hair colour; do NOT copy the reference's ages, poses, outfit, colours, "
 "hair ornaments or accessories; use the NEW ages, the NEW plain outfit and the NEW poses below.")
# each list ordered [broom, bowl, lamp, other]; rotation g,g+1,g+2,g+3 gives four different props per lineup
C19=["holding the long wooden handle of a bamboo broom upright at her side with one hand, the other hand resting at her waist, head tilted slightly",
 "holding a plain wooden bowl before her chest with both hands, looking down at it with a gentle face",
 "holding a small plain clay oil lamp before her with both hands, its tiny flame lit",
 "one hand lightly touching the plain wooden pin in her bun, the other hand at her side"]
C24=["body turned three-quarters to the right, holding the long wooden handle of a broom upright beside her",
 "holding a plain wooden bowl before her with both hands, a slight turn of the body",
 "holding a small plain clay oil lamp in one hand, the other hand shielding the flame",
 "holding a folded plain linen cloth over one forearm, hands together"]
C32=["holding the long wooden handle of a broom upright at her side, the other hand at her waist",
 "holding a plain wooden bowl in one hand, the other hand lightly beneath it",
 "holding a small plain clay oil lamp before her with both hands",
 "hands folded calmly before her waist"]
C48=["holding the long wooden handle of a broom upright at her side with one hand",
 "holding a plain wooden bowl before her with both hands",
 "holding a small plain clay oil lamp in one hand, the other hand beneath it",
 "hands loosely folded inside her plain sleeves before her, serene"]
def cold_pose(g):
    ps=[C19[g%4],C24[(g+1)%4],C32[(g+2)%4],C48[(g+3)%4]]
    return ("Poses (NEW, NOT the reference's poses; calm standing poses; a different simple hand gesture for each figure, same person), left to right: "
            f"about 19, youthful, a gentle quiet gesture: {ps[0]}; about 24, composed: {ps[1]}; about 32, poised: {ps[2]}; about 48, serene and calm: {ps[3]}; "+STILL)
for cid,tr,mi in CONS:
    g=int(cid[1:])-1; b=J[f"N-{cid}-t5"]; p=b["prompt"]
    p=p.replace(IDP,IDC)
    i=p.index(" Outfit for all four"); k=p.index(". Poses (NEW"); p=p[:i]+" "+COLDO+". "+p[k+2:]
    a=p.index("Poses (NEW"); e=p.index(". Eyes soft"); p=p[:a]+cold_pose(g)+p[e:]
    figs=[dict(f,file=f["file"].replace("-t5-","-tcold-"),tier="cold",palette="undyed grey-white linen") for f in b["figs"]]
    J[f"N-{cid}-tcold"]={"prompt":p,"ref":b["ref"],"style":b["style"],"figs":figs,"pal":"undyed grey-white linen","pose":cold_pose(g)}
json.dump(J,open("jobs.json","w"),indent=0)
