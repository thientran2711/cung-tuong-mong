#!/usr/bin/env python3
"""NF4 (owner Lượt 686 via ROOT-54).
(1) TEETH: c06 c14 c19 c31 redraw from their current prompt with a STRONGER closed-mouth sentence (owner order) → cNN.v3t.FULL.txt.
Only the COMMON mouth sentence and the 'closed-lip smile' words of the Expression line change; everything else verbatim.
Run: python3 dev/art/face-common/make_nf4.py"""
import os
D=os.path.dirname(os.path.abspath(__file__))
OLD_MOUTH="mouth CLOSED with the lips softly together, absolutely NO teeth visible, a natural soft smile (never a stretched grin)."
NEW_MOUTH=("MOUTH FULLY CLOSED: the upper lip and the lower lip rest pressed gently together along their whole length with no gap between them, "
           "a calm closed-lip smile made only by the lip corners; absolutely NO teeth visible at all, no white line or dark gap between the lips, "
           "never a parted or open mouth, never a grin.")
SRC={"c06":"c06.v3c","c14":"c14.v3","c19":"c19.v3","c31":"c31.v3"}
out={}
for cid,f in SRC.items():
    t=open(os.path.join(D,f+'.FULL.txt')).read()
    assert t.count(OLD_MOUTH)==1,cid
    t=t.replace(OLD_MOUTH,NEW_MOUTH).replace("closed-lip smile,","closed-lip smile with the lips fully sealed, no teeth,",1)
    out[f"{cid}.v3t"]=t
for k,v in out.items():
    open(os.path.join(D,f'{k}.FULL.txt'),'w').write(v)
    print(f"== {k}\n{v}\n")

# ---------------- (3) TYPES v5 (owner Lượt 686): MUCH stronger face shape + personality per type; TYPES_v5.md copies these ----------------
# No makeup / colour words for lips, cheeks or eyes (D14). Every block ends with what she must NEVER look like, so types do not blur.
TYPES5={
"Sắc sảo":dict(
 face="an ADULT, clearly DEFINED OVAL face with HIGH sculpted cheekbones that are clearly visible, a slim crisply shaped jawline and a neat POINTED chin, no baby fat at all; CRISP long almond eyes with sharply LIFTED outer corners and a clean sharp upper lid line, fully open, with a PIERCING, keen, intelligent gaze that looks straight into the viewer as if reading the viewer's thoughts; STRAIGHT, sharp, clearly defined brows with a slight angled lift at the tail; a slim straight nose with a fine high bridge and a neat tip; well-defined lips with a crisp clear cupid's bow; a quick-witted, clever, alert young woman; never a baby face, never round or chubby, never sleepy, dreamy or sweet",
 expr="A sharp, clever, PIERCING look straight at the viewer, the gaze keen, alert and knowing, as if she has already seen through everything; a small confident closed-lip smile lifted at ONE corner, eyes fully open, never a stretched grin."),
"Tươi tắn":dict(
 face="a fresh, healthy SOFT-OVAL face with full springy cheeks lifted HIGH by the smile and a softly rounded chin; LARGE bright sparkling eyes that curve into happy crescents at the lower lids, fully open, lively light-catching irises; soft natural brows raised a little in delight; a small straight nose; a mouth whose corners turn clearly UP; a sunny, open, warm-hearted girl full of energy; never cold, never shy, never sad",
 expr="A RADIANT, sunny, wholehearted closed-lip smile that lifts the cheeks and makes the eyes smile too, a warm open friendly gaze straight at the viewer, the whole face glowing with joy, eyes fully open, never a stretched grin."),
"Dịu dàng":dict(
 face="a SOFT gentle oval face with smooth rounded cheeks and a small soft chin, no sharp angles anywhere; large TENDER almond eyes with gently LOWERED outer corners and a soft warm look, fully open, the gaze soft and kind; thin long softly curved brows that slope gently DOWN at the tails; a small delicate nose; a small soft mouth with gently rounded lips; a kind, caring, gentle-hearted girl; never sharp, never proud, never cold",
 expr="A TENDER, kind, caring look, the head inclined slightly to one side, the soft eyes warm and full of gentle affection, a small sweet closed-lip smile, eyes fully open, never a stretched grin."),
"Đoan trang":dict(
 face="a BALANCED, perfectly symmetrical classic oval face with a smooth high forehead, evenly full cheeks and a gently rounded chin; calm LEVEL almond eyes of medium size, perfectly even, with a steady serene gaze, fully open; long smooth evenly arched brows; a straight well-proportioned nose; a medium mouth with evenly shaped lips; a dignified, upright, virtuous lady of good upbringing; never playful, never flirtatious, never haughty",
 expr="A calm, serene, DIGNIFIED composure, a steady level gaze straight at the viewer, the face poised and still, a small modest refined closed-lip smile, the head held perfectly straight and level, eyes fully open, never a stretched grin."),
"Tinh nghịch":dict(
 face="a small lively face with round high apple cheeks and a little pointed chin; big ROUND bright eyes with UP-turned outer corners, sparkling with mischief, fully open; short arched brows, ONE brow raised clearly higher than the other; a small upturned nose; a small mouth pulled into a LOPSIDED smile with one corner higher; a cheeky, playful, quick little rascal; never calm, never solemn, never cold",
 expr="A MISCHIEVOUS, cheeky look as if she has just played a trick, a lopsided playful closed-lip smirk with one corner up, one brow raised, sparkling teasing eyes glancing at the viewer, head tilted to one side, eyes fully open, never a stretched grin."),
"Kiêu kỳ":dict(
 face="a long refined OVAL face with HIGH defined cheekbones, a narrow elegant jaw and a small firm chin raised only a little (the head almost level) so she looks slightly DOWN along her straight nose, the whole face clearly visible; long narrow PHOENIX eyes with sharply UP-SWEPT outer corners, fully open and bright; long slender brows rising in a HIGH proud arch toward the temples; a straight slim high-bridged nose; THIN well-defined lips held firm; a proud noblewoman who knows she stands above everyone; never warm, never shy, never playful",
 expr="A HAUGHTY, superior, faintly disdainful gaze looking slightly down at the viewer as if unimpressed, the brows lifted proudly, only the faintest cool closed-lip curve at one corner, eyes fully open, never a stretched grin."),
"Lạnh lùng":dict(
 face="a LONG narrow OVAL face with smooth FLAT cheeks, a straight slender jaw and a long tapered chin; narrow, long, perfectly LEVEL almond eyes (neither up- nor down-turned) with clear cold light-catching irises, fully open, staring straight with no warmth; STRAIGHT thin brows lying LOW and level, no arch at all; a slim straight nose; a small mouth with thin even lips in a calm straight line; an icy, untouchable beauty; never smiling warmly, never sweet, never playful",
 expr="A COLD, icy, distant stare straight at the viewer, the face completely still, the lips in a calm straight closed line with at most the faintest trace of a smile, the gaze remote and emotionless like winter frost, eyes fully open, never a grin."),
"Quyến rũ":dict(
 face="a soft HEART-OVAL face with smooth full cheeks and a delicate rounded chin; PEACH-BLOSSOM eyes (đào hoa nhãn): large liquid-bright almond eyes whose outer corners curve softly UP, long sweeping upper lashes, fully open, the gaze lingering and inviting; slender softly curved brows; a small fine nose; FULL plump lips with a soft curved bow, closed; ONE tiny beauty mark (a single small dark dot) just below the outer corner of her LEFT eye, the only mark on her face; a sensual, magnetic, enchanting woman; never childlike, never stern, never cold",
 expr="A SEDUCTIVE, alluring look: the head tilted slightly, a slow lingering sidelong gaze straight to the viewer, a knowing half-smile with the full lips closed, one corner lifted more than the other, eyes fully open, never a stretched grin."),
}
# eye-safety sentence (owner order (2) for c27; used on every new Sắc sảo face)
EYES_STRAIGHT="Both eyes look straight at the viewer together: the two irises centred in the eyes and perfectly aligned at the same height, never cross-eyed, never wall-eyed, never looking in two directions."

# ---------------- (2)+(4) c27 NEW PERSON (Sắc sảo) + 3 new Sắc sảo samples s07–s09 ----------------
SS=TYPES5["Sắc sảo"]
def ss_face(swaps):
    f=SS["face"]
    for a,b in swaps: assert a in f,a; f=f.replace(a,b)
    return f
# c27: same game data as before (rank colours, outfit, item, pose, angle) — only age, face, expression and hair are new
t=open(os.path.join(D,'c27.v3.FULL.txt')).read()
old_face=t[t.index("Her face: ")+10:t.index(". Expression: ")]
old_expr=t[t.index("Expression: ")+12:t.index(" Hair: ")]
old_hair=t[t.index("never brown), ")+14:t.index(". Outfit: ")]
c27_face=ss_face([("clearly DEFINED OVAL face","clearly DEFINED, slightly LONG OVAL face"),("neat POINTED chin","neat POINTED chin with a firm little tip")])+". "+EYES_STRAIGHT[:-1]
c27_hair="fully loose and very long, sleek and straight, parted slightly off-centre, the hair at the temples drawn back and fastened at the back of the head with one slim gold hairpin pointing backward"
t=t.replace(", glancing softly at them",", her gaze straight at the viewer").replace("about 15.","about 17.").replace(old_face,c27_face).replace(old_expr,SS["expr"]).replace(old_hair,c27_hair)
out2={"c27.v4":t}

# samples: built exactly like s01–s06 (make_nf3 line() recipe) — pieces from make_c_v3.py
src=open(os.path.join(D,'make_c_v3.py')).read(); NS={'__file__':os.path.join(D,'make_c_v3.py')}
exec(src[:src.index("pre,post=COMMON.split('{PERSON}')")],NS)
COMMON,B15,LOW_TONE,PFAB,ANG,_hex=(NS[k] for k in "COMMON B15 LOW_TONE PFAB ANG _hex".split())
pre,post=COMMON.split('{PERSON}')
def C(n,h,l,s): return (n,_hex(h/360,l,s))
def line(age,face,expr,hair,outfit,mn,mh,sn,sh,pose,ak):
    person=(f"A young unmarried noble girl from a scholar's family (thiếu nữ khuê các), about {age}. Her face: {face}. Expression: {expr} "
            f"Hair: glossy pure BLACK (never brown), {hair}. Outfit: {outfit}; her signature colour family {mn} and {sn}. "
            f"{B15.format(m=f'{mn} like {mh}',s=f'{sn} like {sh}')} Colour tone: {LOW_TONE} {PFAB} Pose: {pose}, {ANG[ak]}")
    return pre+person+post
S3=[
("s07",18,[("clearly DEFINED OVAL face","clearly DEFINED LONG OVAL face"),("STRAIGHT, sharp, clearly defined brows","long STRAIGHT, sharp, clearly defined brows")],
 "fully loose and very long, sleek, the top section drawn back and fastened at the back of the head with one slim silver hairpin pointing backward",
 "a light open beizi of soft wine-red silk satin with a soft sheen over a cross-collar silver-grey inner top and a silver-grey floor-length skirt of plain silk, small embroidered plum branches along the front edges, a silver-grey silk sash with a small black jade pendant, long sleeves",
 C("soft wine red",350,.45,.42),C("silver grey",220,.74,.08),
 "standing upright with her weight on one leg, a single black go stone held up between two fingers at chest height as if about to play a winning move, the other hand at her sash","FF"),
("s08",18,[("clearly DEFINED OVAL face","clearly DEFINED DIAMOND-OVAL face"),("CRISP long almond eyes","CRISP long phoenix-almond eyes")],
 "half-up: the top hair coiled into a neat high bun at the crown held by one gold hairpin pointing upward, the rest long and straight behind",
 "a cross-collar ruqun of soft emerald-green silk satin with a soft sheen and a pearl-white floor-length skirt of plain silk, small embroidered bamboo at the collar and hem, a pearl-white silk sash with a small green jade pendant, long sleeves",
 C("soft emerald green",160,.40,.42),C("pearl white",40,.90,.15),
 "walking with poise mid-step, a small rolled letter tied with a red cord held in one hand at her waist, the other sleeve flowing","SL"),
("s09",17,[("clearly DEFINED OVAL face","clearly DEFINED HEART-OVAL face"),("a slim straight nose with a fine high bridge","a slim straight nose with a fine high bridge and a lifted tip")],
 "loose and long, swept forward over the right shoulder, the left side pinned back with a small black lacquer comb",
 "a cross-collar ruqun of soft indigo-violet silk satin with a soft sheen and a pale-rose floor-length skirt of plain silk, small embroidered orchids at the collar and cuffs, a pale-rose silk sash with a small amethyst pendant, long sleeves",
 C("soft indigo violet",255,.47,.35),C("pale rose",350,.82,.45),
 "standing composed with her weight on one leg, a sprig of red plum blossom held upright beside her shoulder in one hand, the other hand at her waist","TR"),
]
for sid,age,sw,hair,outfit,(mn,mh),(sn,sh),pose,ak in S3:
    out2[f"{sid}.v5"]=line(age,ss_face(sw)+". "+EYES_STRAIGHT[:-1],SS["expr"],hair,outfit,mn,mh,sn,sh,pose,ak)
for k in out2: assert out2[k].count(OLD_MOUTH)==1,k; out2[k]=out2[k].replace(OLD_MOUTH,NEW_MOUTH)   # owner teeth order: new faces get the strong mouth sentence too
for k,v in out2.items():
    open(os.path.join(D,f'{k}.FULL.txt'),'w').write(v)
    print(f"== {k}\n{v}\n")

# ---------------- (5) owner Lượt 689: new people ONLY in Sắc sảo / Kiêu kỳ / Lạnh lùng / Quyến rũ; 3 samples each ----------------
# Sắc sảo = s07–s09 above (+ c27). Here: Kiêu kỳ s10–s12, Lạnh lùng s13–s15, Quyến rũ s16–s18, from the TYPES5 blocks.
def t_face(ty,swaps):
    f=TYPES5[ty]["face"]
    for a,b in swaps: assert a in f,(ty,a); f=f.replace(a,b)
    return f
S4=[
("s10","Kiêu kỳ",18,[],
 "fully loose and very long, the top section drawn back high and fastened at the crown with one upright gold phoenix hairpin",
 "a light open beizi of soft crimson silk satin with a soft sheen over a cross-collar pale-gold-beige inner top and a pale-gold-beige floor-length skirt of plain silk, small embroidered peonies along the front edges, a pale-gold-beige silk sash with a small red jade pendant, long sleeves",
 C("soft crimson",352,.50,.50),C("pale gold beige",38,.80,.30),
 "standing tall and upright with her weight on one leg, a closed round fan of crimson silk with a carved ivory handle held lightly at her waist in one hand, the other hand resting at her sash","SR"),
("s11","Kiêu kỳ",18,[("long refined OVAL face","long refined DIAMOND-OVAL face")],
 "half-up: the top hair coiled into a tall elegant bun at the crown held by two slim silver hairpins pointing upward, the rest long and straight behind",
 "a cross-collar ruqun of soft royal-purple silk satin with a soft sheen and a silver-grey floor-length skirt of plain silk, small embroidered phoenix feathers at the collar and hem, a silver-grey silk sash with a small amethyst pendant, long sleeves",
 C("soft royal purple",280,.42,.40),C("silver grey",220,.74,.08),
 "walking slowly with poise mid-step, a single long-stemmed purple orchid held upright at chest height in one hand, the other sleeve trailing","TL"),
("s12","Kiêu kỳ",17,[("THIN well-defined lips held firm","THIN well-defined lips with a crisp upper lip line, held firm")],
 "fully loose and very long, sleek, parted exactly in the centre, a thin gold-thread ribbon tied at the back of the head, one small gold hairpin pointing backward",
 "a cross-collar ruqun of soft peacock-blue silk satin with a soft sheen and an ivory floor-length skirt of plain silk, small embroidered peacock feathers at the collar and hem, an ivory silk sash with a small blue jade pendant, long sleeves",
 C("soft peacock blue",195,.42,.50),("warm ivory","#EAD7BF"),
 "standing upright with her weight on one leg, a small gold-edged hand mirror held at her waist in one hand, its back toward the viewer, the other hand at her sash","FF"),
("s13","Lạnh lùng",18,[],
 "fully loose and very long, straight and sleek, parted in the centre, a thin silver-white ribbon tied at the back of the head, one small silver hairpin pointing upward",
 "a cross-collar ruqun of soft frost-white silk satin with a soft sheen and a slate-blue floor-length skirt of plain silk, small embroidered snowflake plum blossoms at the collar and cuffs, a slate-blue silk sash with a small white jade pendant, long sleeves",
 C("soft frost white",210,.90,.15),C("slate blue",215,.45,.28),
 "standing still and upright with her weight on one leg, a slim closed white paper umbrella with a bamboo handle held upright at her side in one hand, the other hand at her waist","SL"),
("s14","Lạnh lùng",18,[("LONG narrow OVAL face","LONG narrow OVAL face with a high smooth forehead")],
 "half-up: the top hair twisted into a small flat knot at the back held by one plain white jade hairpin pointing backward, the rest long and straight to the waist",
 "a light open beizi of soft ink-blue silk satin with a soft sheen over a cross-collar pale silver-grey inner top and a pale silver-grey floor-length skirt of plain silk, small embroidered pine needles along the front edges, a pale silver-grey silk sash with a small black jade pendant, long sleeves",
 C("soft ink blue",222,.36,.32),C("pale silver grey",220,.80,.06),
 "standing calmly with her weight on one leg, a slim white jade flute held horizontally in both hands at her waist","TR"),
("s15","Lạnh lùng",17,[("a slim straight nose","a slim straight nose with a narrow bridge")],
 "fully loose and very long, straight, the front locks falling beside the face, a thin pale-celadon ribbon at the back, one small pearl hairpin pointing upward",
 "a cross-collar ruqun of soft pale-celadon silk satin with a soft sheen and a deep-teal floor-length skirt of plain silk, small embroidered water ripples and reeds at the collar and hem, a deep-teal silk sash with a small white jade pendant, long sleeves",
 C("soft pale celadon",150,.78,.28),C("deep teal",185,.32,.40),
 "walking slowly mid-step, a single white lotus bud on a long stem held upright beside her shoulder in one hand, the other sleeve hanging still","ST"),
("s16","Quyến rũ",18,[],
 "loose and long, swept forward over one shoulder in soft waves, the other side tucked behind the ear with one small pearl hairpin pointing backward",
 "a cross-collar ruqun of soft rose-red silk satin with a soft sheen and a plum-wine floor-length skirt of plain silk, small embroidered peach blossoms at the collar and hem, a plum-wine silk sash with a small rose quartz pendant, long sleeves",
 C("soft rose red",350,.58,.50),C("plum wine",330,.35,.35),
 "walking slowly mid-step, a small round fan of ivory silk with a red tassel held lightly near her chin in one hand, never covering her face, the other sleeve trailing","TL"),
("s17","Quyến rũ",18,[("soft HEART-OVAL face","soft slightly LONG OVAL face"),("just below the outer corner of her LEFT eye","just below the outer corner of her RIGHT eye")],
 "half-up: the top hair in a loose low twist at the back held by one gold hairpin with a small dangling pearl pointing backward, the rest long and wavy",
 "a light open beizi of soft coral-pink silk satin with a soft sheen over a cross-collar champagne-ivory inner top and a champagne-ivory floor-length skirt of plain silk, small embroidered camellias along the front edges, a champagne-ivory silk sash with a small coral bead, long sleeves",
 C("soft coral pink",8,.66,.55),C("champagne ivory",35,.86,.30),
 "standing with her weight on one leg and her hips softly turned, a single red camellia held lightly at her collarbone in one hand, the other hand resting at her waist","SR"),
("s18","Quyến rũ",17,[("FULL plump lips with a soft curved bow","FULL plump lips with a deep curved bow on the upper lip")],
 "fully loose and very long, glossy soft waves, a thin dark-red ribbon tied at the back of the head, one small gold hairpin pointing upward",
 "a cross-collar ruqun of soft violet-mauve silk satin with a soft sheen and a deep-rose floor-length skirt of plain silk, small embroidered wisteria at the collar and hem, a deep-rose silk sash with a small amethyst pendant, long sleeves",
 C("soft violet mauve",290,.58,.35),C("deep rose",345,.45,.45),
 "walking slowly toward the viewer, a slim red lacquer folding fan held half-open at her shoulder in one hand, the other hand lifting her sleeve a little","FF"),
]
out3={}
for sid,ty,age,sw,hair,outfit,(mn,mh),(sn,sh),pose,ak in S4:
    v=line(age,t_face(ty,sw)+". "+EYES_STRAIGHT[:-1],TYPES5[ty]["expr"],hair,outfit,mn,mh,sn,sh,pose,ak)
    assert v.count(OLD_MOUTH)==1; out3[f"{sid}.v5"]=v.replace(OLD_MOUTH,NEW_MOUTH)
# s12 A21: frontal view drew the "backward" pin sideways twice (7172, 7173) -> pin upright at the crown
out3["s12.v5b"]=out3["s12.v5"].replace("one small gold hairpin pointing backward","one small gold hairpin set upright at the crown, pointing straight upward")
assert out3["s12.v5b"]!=out3["s12.v5"]
for k,v in out3.items():
    open(os.path.join(D,f'{k}.FULL.txt'),'w').write(v)
    print(f"== {k}\n{v}\n")

# ---------------- (6) owner Lượt 696: c06 c14 c19 c31 become SẮC SẢO — new sharp face from the approved v5 block (s07/s09 recipe) ----------------
# Base = their teeth-fix prompts (cNN.v3t: strong closed-mouth sentence kept). Only age (16→17 for c06), face and expression change;
# rank colours, outfit, hair, item, pose, angle stay. No "phoenix" eye words (owner Lượt 695 on s08).
SS6={"c06":[("clearly DEFINED OVAL face","clearly DEFINED, slightly SHORT OVAL face")],
     "c14":[("clearly DEFINED OVAL face","clearly DEFINED LONG OVAL face")],
     "c19":[("clearly DEFINED OVAL face","clearly DEFINED HEART-OVAL face")],
     "c31":[("STRAIGHT, sharp, clearly defined brows","long STRAIGHT, sharp, clearly defined brows")]}
out4={}
for cid,sw in SS6.items():
    t=open(os.path.join(D,f'{cid}.v3t.FULL.txt')).read()
    of=t[t.index("Her face: ")+10:t.index(". Expression: ")]
    oe=t[t.index("Expression: ")+12:t.index(" Hair: ")]
    f=ss_face(sw)+". "+EYES_STRAIGHT[:-1]
    assert "phoenix" not in f.lower()
    t=t.replace(of,f).replace(oe,SS["expr"]).replace("about 16.","about 17.")
    out4[f"{cid}.v5"]=t
for k,v in out4.items():
    open(os.path.join(D,f'{k}.FULL.txt'),'w').write(v)
    print(f"== {k}\n{v}\n")
