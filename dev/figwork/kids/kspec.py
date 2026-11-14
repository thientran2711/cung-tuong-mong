# kspec.py: builds kjobs.json (child identity lineups: prince pNN / princess fNN, 4 ages each)
import json,sys
STYLE=["8aNsy0CIrU","3zbtQNvREY","YMLuxraWeC","4RuXEXL9Aa"]  # consort-01/05/12/18 (one per job, rotated)
PRE=("Semi-realistic painterly guofeng portrait style, near-3D realistic rendering with soft natural light and fine detail, exactly matching the rendering "
 "of the reference portrait; plain light parchment background, soft even light; fair porcelain skin; serene gentle neutral expression, soft warm "
 "round-almond eyes (never slanted, never narrow, never upturned), closed lips or faint gentle smile; beautiful, sweet, handsome looks at every age; "
 "faces clearly visible, 3/4 or frontal view; rich clear colours and smooth soft near-3D shading, not a pencil sketch.")
# prince palettes (never pink or purple)
PP=["deep sapphire blue with silver-white","jade green with ivory","crimson red with gold","teal with pale grey","ivory white with sky blue",
 "navy blue with gold","emerald green with cream","slate grey-blue with white","cinnabar red with dark navy","sky blue with white",
 "deep teal with bronze","moss green with ivory","warm brown with cream","black with crimson accents","pale celadon green with white",
 "dark blue with apricot gold","ochre gold with brown","steel blue with pearl grey","forest green with gold","scarlet with black",
 "azure blue with ivory","pine green with silver-grey","russet brown with gold","midnight blue with jade"]
FP=["soft peach pink with ivory","lilac with silver-white","rose red with gold","sky blue with white","mint green with cream","coral with pale gold",
 "lavender with pale blue","celadon with white","apricot with cream","crimson with gold","plum with pale pink","moonlight blue with silver",
 "lemon yellow with white","jade green with pale pink","blush pink with sky blue","ivory white with rose","turquoise with ivory","peony pink with gold",
 "pale violet with white","cherry red with ivory","powder blue with peach","seafoam green with lilac","honey gold with coral","pearl white with lavender"]
# per-age props (index rotated per identity)
P4=["holding a small wooden toy horse","holding a little rattle drum (bolang drum)","holding a small red paper lantern","hugging a little cloth tiger toy",
    "holding a small spinning top","holding a tiny kite","holding a small round fruit","hands together politely in front"]
P9=["holding a thin book","holding a writing brush","holding a small wooden practice sword","holding a bamboo flute","holding a rolled scroll",
    "holding a small kite","holding a little bird cage","with hands clasped behind the back"]
P14=["holding a hunting bow at his side","holding a folding fan","holding a rolled scroll","holding a sword in its scabbard","holding a bamboo flute",
     "holding an open book","holding a go game piece box","one hand resting on his jade belt pendant"]
P20=["holding a closed folding fan","one hand behind the back, the other at the waist","holding a sheathed sword","holding a rolled scroll",
     "holding a jade pendant","holding a bow","hands in sleeves, calm and upright","holding an open folding fan"]
Q4=["hugging a little cloth rabbit toy","holding a small flower","holding a little lantern","holding a small rattle drum","holding a butterfly toy on a stick",
    "holding a small peach","holding a tiny round fan","hands together politely in front"]
Q9=["holding a round silk fan","holding a flowering branch","holding a thin book","holding a shuttlecock","holding a small kite","holding a little basket of flowers",
    "holding a writing brush","holding a small embroidered pouch"]
Q14=["holding a round silk fan","holding a lotus flower","holding an embroidery hoop","holding a bamboo flute","holding an open book","holding a plum blossom branch",
     "holding a small pipa lute","hands softly folded at the waist"]
Q20=["holding a folding fan","holding a peony","holding a round silk fan","holding a jade pendant","hands folded in sleeves","holding a plum blossom branch",
     "holding a small pipa lute","holding a silk handkerchief"]
HP=["slightly round face","oval face","soft heart-shaped face","gentle long face with a straight nose","round face with dimples","oval face with soft dark brows"]
def prince(i):
    pal=PP[i]; r=lambda L,o=0:L[(i*3+o+(i//8)*(2*o+1))%len(L)]
    return (f"A character lineup of FOUR full-body standing figures, head to feet, side by side with wide clear empty space between them, all the SAME "
     f"imperial Chinese prince growing up: the same face, same features ({HP[i%len(HP)]}) and the same signature colour family at every age: {pal}. "
     "Each figure is drawn at its true relative height with all feet on one baseline (the toddler much shorter). Left to right: "
     f"1) about 4 years old, a sweet toddler boy, about four heads tall, chubby cheeks, short black hair in one small topknot with a red silk cord, "
     f"a fine brocade jacket and trousers with little cloud embroidery, {r(P4)}; "
     f"2) about 9 years old, a handsome little boy, about five and a half heads tall, hair in a small topknot with a gold ring, a fine brocade robe with a sash, {r(P9,1)}; "
     f"3) about 14 years old, a handsome young boy still clearly a child, slim, about six and a half heads tall, hair in a topknot with a small silver crown, "
     f"a fine brocade robe with embroidered collar and a jade belt pendant, {r(P14,2)}; "
     f"4) about 20 years old, a handsome young man, about seven and a half heads tall, adult imperial prince court dress: rich layered brocade robe with "
     f"embroidered dragon-cloud borders, jade belt, small gold crown (guan) with hairpin, {r(P20,5)}. "
     "Calm composed upright standing poses, still, no motion, robes hanging straight; dignified, serene. Full-length modest robes. "
     "NOT pink, NOT purple. No text, no frames.")
def princess(i):
    pal=FP[i]; r=lambda L,o=0:L[(i*3+o+(i//8)*(2*o+1))%len(L)]
    return (f"A character lineup of FOUR full-body standing figures, head to feet, side by side with wide clear empty space between them, all the SAME "
     f"imperial Chinese princess growing up: the same face, same features ({HP[i%len(HP)]}) and the same signature colour family at every age: {pal}. "
     "Each figure is drawn at its true relative height with all feet on one baseline (the toddler much shorter). Left to right: "
     f"1) about 4 years old, a sweet toddler girl, about four heads tall, chubby cheeks, two small hair buns with tiny silk flowers and ribbons, "
     f"a fine embroidered silk jacket and long skirt, {r(Q4)}; "
     f"2) about 9 years old, a pretty little girl, about five and a half heads tall, double buns with small flower hairpins and ribbons, "
     f"a rich silk robe with embroidered collar and a sash, {r(Q9,1)}; "
     f"3) about 14 years old, a pretty young girl still clearly a child, slim, about six and a half heads tall, half-up hair with a few small gold flower "
     f"hairpins and one small dangling ornament, a modest rich silk robe with long sleeves and high crossed collar, {r(Q14,2)}; "
     f"4) about 20 years old, a beautiful young woman, about seven and a half heads tall, adult imperial princess court dress: layered rich silk robe with "
     f"gold embroidery, embroidered sash, elegant chignon with gold phoenix hairpins and a dangling bu yao ornament, {r(Q20,5)}. "
     "Calm composed upright standing poses, still, no motion, sleeves and skirts hanging straight; graceful, serene. Full-length modest robes, high collars. "
     "No text, no frames.")
OVR={"p07":("holding a bamboo flute; 3)","holding a rolled scroll; 3)"),"p10":("holding a rolled scroll. Calm","holding a sheathed sword. Calm"),"p20":("holding an open book; 4)","holding a hunting bow at his side; 4)"),"p22":("holding a sheathed sword. Calm","holding a rolled scroll. Calm"),"p24":("holding a closed folding fan. Calm","holding a jade pendant. Calm")}
J={}
for i in range(24):
    for sx,fn in (("p",prince),("f",princess)):
        jid=f"{sx}{i+1:02d}"
        figs=[{"file":f"fig-kid-{jid}-a{a}","role":"prince" if sx=="p" else "princess","identity":jid,"ageBand":str(a)} for a in (4,9,14,20)]
        pr=PRE+" "+fn(i)
        if jid in OVR: pr=pr.replace(*OVR[jid],1)
        J[jid]={"prompt":pr,"style":STYLE[i%4],"figs":figs}
json.dump(J,open("kjobs.json","w"),indent=1,ensure_ascii=False)
if len(sys.argv)>1: print(J[sys.argv[1]]["style"]); print(J[sys.argv[1]]["prompt"])
