#!/usr/bin/env python3
"""NF3 (owner Lượt 629 via ROOT-53): 4 NEW face types (Kiêu kỳ, Lạnh lùng, Quyến rũ, Anh khí) — one sample person each (s01–s04),
made exactly like c07–c32 (COMMON_v3 verbatim + own {PERSON} line, PTONE colour name+hex, B15, LOW_TONE, PFAB); only the face/expression text is new.
Also c05/c06 redraw lines (c05.v3b / c06.v3b): same face text, outfit/colour recipe of c07–c32 (colours = c_rank_colours.json PTONE values).
Pieces are taken from make_c_v3.py by exec of its definitions part (up to the write loop) — nothing re-typed.
Run: python3 dev/art/face-common/make_nf3.py  → writes s0N.v4.FULL.txt, c05.v3b.FULL.txt, c06.v3b.FULL.txt, prints them."""
import os,json
D=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(D,'make_c_v3.py')).read()
NS={'__file__':os.path.join(D,'make_c_v3.py')}
exec(src[:src.index("pre,post=COMMON.split('{PERSON}')")],NS)
COMMON,B15,LOW_TONE,PFAB,ANG,EXPR,R,_hex=(NS[k] for k in "COMMON B15 LOW_TONE PFAB ANG EXPR R _hex".split())
pre,post=COMMON.split('{PERSON}')

# ---- the 4 type sentences (TYPES_v4.md copies these) ----
TYPES={
"Kiêu kỳ":dict(
 face="a long refined OVAL face with high defined cheekbones, a narrow elegant jaw and a small firm chin, the chin LIFTED slightly so she looks a little down along her nose (the whole face still clearly visible), long narrow PHOENIX eyes (đan phượng nhãn) with sharply up-swept outer corners and a crisp dark upper lash line, fully open and bright, long slender brows rising in a high clean arch toward the temples, a straight slim high-bridged nose, THIN well-defined lips firmly closed",
 expr="A proud, haughty, self-assured gaze looking slightly down at the viewer, chin lifted, only the faintest cool closed-lip smile at the corners, eyes fully open, never a stretched grin."),
"Lạnh lùng":dict(
 face="a LONG narrow OVAL face with smooth flat cheeks, a straight slender jaw and a long tapered chin, narrow CLEAR almond eyes that are long and perfectly level (neither up- nor down-turned) with clear light-catching irises, fully open and bright, STRAIGHT thin brows lying low, long and level with no arch, a slim straight nose, a small mouth with thin even pale-rose lips",
 expr="A cool, icy, distant composure, a calm level gaze straight at the viewer, the face almost still, only a very faint barely-there closed-lip smile, eyes fully open, never a stretched grin."),
"Quyến rũ":dict(
 face="a soft HEART-OVAL face with smooth full cheeks and a delicate rounded chin, PEACH-BLOSSOM eyes (đào hoa nhãn): large glossy almond eyes whose outer corners curve softly UP, a soft pink flush along the lower lids and outer corners, long curled lashes, fully open and bright, slender softly curved brows, a small fine nose, FULL plump lips with a rich rose tint, closed, ONE tiny beauty mark (a single small dark dot) just below the outer corner of her LEFT eye, the only mark on her face",
 expr="An alluring warm half-smile with the full lips closed, one corner lifted a little more than the other, a soft lingering inviting gaze toward the viewer, eyes fully open, never a stretched grin."),
"Anh khí":dict(
 face="a clean OVAL face with a clearly DEFINED straight jawline and a firm small chin, smooth taut cheeks, THICK dark SHARP straight brows angled upward toward the temples like sword blades (kiếm mi), large bright almond eyes with a strong clear DIRECT gaze, fully open, a HIGH straight nose bridge, medium lips with a firm even closed line; still clearly a beautiful young woman, feminine and graceful, never mannish",
 expr="A direct, steady, fearless gaze straight at the viewer, a confident faint closed-lip smile, head held upright, eyes fully open, never a stretched grin."),
}
IVORY=("warm ivory","#EAD7BF")
def C(n,h,l,s): return (n,_hex(h/360,l,s))
# (id, type, age, hair, outfit(with colour words), main, sec, pose, angle)
S=[
("s01","Kiêu kỳ",18,"fully loose and very long, the top section drawn back high and fastened at the crown with one upright gold phoenix hairpin",
 "a light open beizi of soft peony-red silk satin with a soft sheen over a cross-collar warm-ivory inner top and a warm-ivory floor-length skirt of plain silk, small embroidered peonies along the front edges, a warm-ivory silk sash with a small red jade pendant, long sleeves",
 C("soft peony red",345,.66,.48),IVORY,
 "standing tall and upright with her weight on one leg, a single white peony with a short stem held lightly at chest height in one hand, the other hand resting at her sash","TR"),
("s02","Lạnh lùng",18,"fully loose and very long, straight and sleek, parted in the centre, a thin indigo-blue ribbon tied at the back of the head, one small silver hairpin pointing upward at the back",
 "a cross-collar ruqun of soft ice-blue silk satin with a soft sheen and an indigo-blue floor-length skirt of plain silk, small embroidered plum blossoms at the collar and cuffs, an indigo-blue silk sash with a small white jade pendant, long sleeves",
 C("soft ice blue",205,.72,.42),C("indigo blue",228,.47,.30),
 "standing still and upright with her weight on one leg, a slim white jade flute held horizontally in both hands at her waist","SL"),
("s03","Quyến rũ",18,"loose and long, swept forward over one shoulder in soft waves, the other side tucked behind the ear with one small pearl hairpin pointing backward",
 "a cross-collar ruqun of soft peach-blossom pink silk satin with a soft sheen and a plum-rose floor-length skirt of plain silk, small embroidered peach blossoms at the collar and hem, a plum-rose silk sash with a small rose quartz pendant, long sleeves",
 C("soft peach-blossom pink",352,.74,.50),C("plum rose",330,.52,.38),
 "walking slowly mid-step, a small round fan of ivory silk with a bamboo handle and a red tassel held lightly near her chin in one hand, the other sleeve trailing","TL"),
("s04","Anh khí",18,"half-up: the top hair gathered into a high neat topknot at the crown wrapped with a jade-green silk band, the rest long and loose behind",
 "a cross-collar ruqun of soft jade-green silk satin with a soft sheen and narrow fitted cuffs, and a deep-rose floor-length skirt of plain silk, small embroidered pine needles at the collar and hem, a deep-rose silk sash with a small white jade pendant, long sleeves",
 C("soft jade green",150,.62,.40),C("deep rose",350,.58,.42),
 "standing firm and upright with her weight on one leg, a slim sheathed straight sword with a black lacquer scabbard and a white silk tassel held upright at her side in one hand, the other hand at her waist","SR"),
]
def line(age,face,expr,hair,outfit,mn,mh,sn,sh,pose,ak):
    person=(f"A young unmarried noble girl from a scholar's family (thiếu nữ khuê các), about {age}. Her face: {face}. Expression: {expr} "
            f"Hair: glossy pure BLACK (never brown), {hair}. Outfit: {outfit}; her signature colour family {mn} and {sn}. "
            f"{B15.format(m=f'{mn} like {mh}',s=f'{sn} like {sh}')} Colour tone: {LOW_TONE} {PFAB} Pose: {pose}, {ANG[ak]}")
    return pre+person+post
out={}
for sid,ty,age,hair,outfit,(mn,mh),(sn,sh),pose,ak in S:
    out[f"{sid}.v4"]=line(age,TYPES[ty]['face'],TYPES[ty]['expr'],hair,outfit,mn,mh,sn,sh,pose,ak)

# ---- c05 / c06 redraw: same face text, c07–c32 colour/outfit recipe; colours = c_rank_colours.json (PTONE, B18 rank data) ----
RC=json.load(open(os.path.join(D,'c_rank_colours.json')))
for i,(cid,age,face,shape,eyes,lips,hair,outfit,m,s,game,pose,item,itemshort) in enumerate(R):
    if cid not in ("c05","c06"): continue
    n=i+1; look=NS['LOOKS'][(n-1)%6]; ak=["FF","SL","SR","TL","TR","ST"][(n-1+(n-1)//6)%6]
    mn,mh,sn,sh=RC[cid]['main'],RC[cid]['main_hex'],RC[cid]['secondary'],RC[cid]['secondary_hex']
    o2=outfit
    for old,new in ((m,mn),(s,sn)):   # same colour-word swap as make_c_v3.py
        if old==new: continue
        w=old.split(' '); cands=[old.replace(' ','-'),' '.join(w[:-1])+'-'+w[-1] if len(w)>1 else old,old]
        hit=next((c for c in cands if c in o2),None)
        if not hit: raise SystemExit(f"colour word not found {cid} {old}")
        nw=new.split(' ')
        o2=o2.replace(hit,(' '.join(nw[:-1])+'-'+nw[-1] if len(nw)>1 else new) if '-' in hit else new)
    o2=o2.replace(' an jade',' a jade')   # article after the swap (ivory→jade green)
    out[f"{cid}.v3b"]=line(age,face,EXPR[look],hair,o2,mn,mh,sn,sh,pose,ak)

# ---- Lượt 640 (owner verdict on nf3_4kieu, via ROOT-53): v4b redraws; only her points change (A17) ----
import copy
TYPES_B=copy.deepcopy(TYPES)
# s01: head lifted too high → chin lifted only moderately, still proud
TYPES_B["Kiêu kỳ"]["face"]=TYPES["Kiêu kỳ"]["face"].replace("the chin LIFTED slightly so she looks a little down along her nose (the whole face still clearly visible)","the chin raised only a little (moderately, the head almost level) so she looks just slightly down along her nose (the whole face clearly visible)")
TYPES_B["Kiêu kỳ"]["expr"]=TYPES["Kiêu kỳ"]["expr"].replace("chin lifted,","chin raised only a little,")
# s03: not alluring enough → stronger allure in eyes, gaze, lips, slight head tilt (lips closed, no teeth)
TYPES_B["Quyến rũ"]["face"]=TYPES["Quyến rũ"]["face"].replace("large glossy almond eyes whose outer corners curve softly UP","large glossy, liquid-bright almond eyes with long sweeping upper lashes whose outer corners curve softly UP").replace("FULL plump lips with a rich rose tint, closed","FULL plump glossy lips with a rich rose tint and a soft curved bow, closed")
TYPES_B["Quyến rũ"]["expr"]="A seductive, alluring look: the head tilted slightly to one side, a slow lingering sidelong gaze from the fully open eyes straight to the viewer, a knowing half-smile with the full lips closed, one corner lifted more than the other, eyes fully open, never a stretched grin."
# s04: too masculine + harder line style → same heroic spirit, clearly feminine, soft; no weapon-like item
TYPES_B["Anh khí"]=dict(
 face="a graceful OVAL face with a gently defined jawline and a soft small chin, smooth soft cheeks, dark well-shaped brows a little fuller than usual that lift gently toward the temples, large bright clear almond eyes with a steady direct gaze, fully open, a straight elegant nose with a slightly high bridge, softly full lips in a calm closed line; a soft, beautiful, clearly feminine young lady with a heroic spirit",
 expr="A bright, steady, confident gaze straight at the viewer, a gentle assured closed-lip smile, head held upright with graceful poise, eyes fully open, never a stretched grin.")
SB={"s01":"s01","s03":"s03","s04":"s04"}
for sid,ty,age,hair,outfit,(mn,mh),(sn,sh),pose,ak in S:
    if sid not in SB: continue
    if sid=="s04": pose=pose.replace("a slim sheathed straight sword with a black lacquer scabbard and a white silk tassel held upright at her side in one hand","a sprig of white plum blossom held upright at chest height in one hand")
    out[f"{sid}.v4b"]=line(age,TYPES_B[ty]['face'],TYPES_B[ty]['expr'],hair,outfit,mn,mh,sn,sh,pose,ak)

# ---- Lượt 644 (owner via ROOT-53): c06 redo — keep her ivory skirt (secondary = ivory, not jade green) + crown hairpin upright ----
for i,(cid,age,face,shape,eyes,lips,hair,outfit,m,s,game,pose,item,itemshort) in enumerate(R):
    if cid!="c06": continue
    n=i+1; look=NS['LOOKS'][(n-1)%6]; ak=["FF","SL","SR","TL","TR","ST"][(n-1+(n-1)//6)%6]
    mn,mh=RC[cid]['main'],RC[cid]['main_hex']; sn,sh=IVORY
    o2=outfit.replace("of vermilion","of soft vermilion").replace("an ivory","a ivory").replace("ivory",sn)
    h2=hair+", one small gold hairpin at the crown pointing straight upward"
    out["c06.v3c"]=line(age,face,EXPR[look],h2,o2,mn,mh,sn,sh,pose,ak)

for k,v in out.items():
    open(os.path.join(D,f'{k}.FULL.txt'),'w').write(v)
    print(f"== {k}\n{v}\n")
