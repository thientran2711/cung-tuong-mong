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
L30=["a graceful half-turn mid-step, {prop} held elegantly before her, skirt swirling",
 "walking forward with a light step, {prop} in one hand, the other sleeve floating out",
 "glancing back over her shoulder while stepping forward, {prop} raised at her side",
 "a light dance-like turn, one long sleeve swept out in an arc, {prop} in the other hand",
 "stepping sideways with {prop} raised near her shoulder, sash ribbons fluttering"]
L42=["walking forward with poised confident steps, {prop} held at her waist, sleeves flowing behind",
 "a slow elegant turn, one hand lifting her flowing sleeve, {prop} in the other",
 "stepping forward gracefully, {prop} raised in one hand, stole floating in the breeze",
 "pausing mid-step in a three-quarter turn, {prop} held before her, skirt hem still swirling"]
L55=["strolling slowly and gracefully, {prop} held loosely before her, sleeves gently swaying",
 "a calm graceful turn, holding a small teacup, her long sash drifting in the breeze",
 "walking slowly with serene dignity, hands lightly together, robe and sleeves flowing softly",
 "a gentle step forward, holding a small sprig of flowers, stole floating softly behind her"]
def pose_for(tr,i,t,prop,g=0):
    a=POSES[tr][(i+t-1)%6]; b=L30[(g+2*t)%5]; c=L42[(g+t)%4]; d=L55[(g*3+t+g//4)%4]
    ps=[x.format(prop=prop) for x in (a,b,c,d)]
    if t==8 and i%3==0: ps[2]=ps[3]="advancing in a stately procession step, hands hidden in her long wide sleeves before her, the long train sweeping behind her"
    suf=", with stately grace" if t>=7 else (", poised" if t>=5 else "")
    ps=[p+suf if "procession step" not in p else p for p in ps]
    return ("Poses (NEW, NOT the reference's poses; a different age-appropriate pose for each figure, same person and same signature prop), left to right: "
            f"about 19, lively and youthful: {ps[0]}; about 24, lively and confident: {ps[1]}; about 32, poised, in her prime: {ps[2]}; about 48, graceful and calm: {ps[3]}; "
            "dynamic graceful motion in every figure, caught mid-movement, skirt hems swirling, long sleeves, sash and stole floating in a soft breeze, flowing fabric, hair tassels swaying (the older figures move more calmly but still gracefully); each figure complete head to feet inside the frame, compact, extra empty space between the four figures so the swirling fabric never overlaps")
