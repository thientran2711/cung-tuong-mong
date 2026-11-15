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
 "naturally with NO swirling and NO flying fabric; all fabrics thick opaque silk and brocade (nothing translucent, no layer showing through another; skirt and train heavy opaque brocade, no see-through overskirt), NO sheer see-through gauze, NO floating stole; tall slender elegant adult proportions, about seven and a half heads tall, small head, long legs; "
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
