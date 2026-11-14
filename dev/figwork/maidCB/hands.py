# hands.py — OWNER 11/14: still standing, but LIVELY HANDS: every age a different hand gesture AND a different held object.
OBJ=["a round silk fan","a sprig of blossoms","a small celadon teacup on its saucer","a small brocade box","a rolled painting scroll","an embroidered incense sachet with tassels",
     "a small round palace lantern","a jade flute","an embroidered handkerchief","a small flower basket","a string of sandalwood prayer beads","a folding fan","a thread-bound book",
     "a small polished bronze hand mirror with a shiny reflective face","a single peony","a small porcelain vase with a flower branch","a sealed letter","a small gilt birdcage"]
H19=["raising {o} up near her cheek with one hand, head tilted slightly, the other hand resting at her waist",
     "one hand touching a hairpin in her hair, the other hand holding {o} lowered at her side",
     "holding {o} up before her chest with both hands, looking down at it with a gentle smile",
     "body turned three-quarters, glancing back toward the viewer, {o} held at her side",
     "holding {o} out a little in one hand as if offering it, the other hand lightly lifting her sleeve"]
H24=["holding {o} half-raised beside her shoulder, chin slightly lowered",
     "body turned three-quarters to the right, {o} lowered in one hand, the other hand lifting her sleeve slightly",
     "holding {o} raised at chest height in one hand, the other hand lightly supporting her elbow",
     "one hand holding {o} before her, the other hand resting lightly on her sash",
     "holding {o} with both hands at waist height, a slight turn of the body"]
H32=["holding {o} before her with both hands",
     "holding {o} at her chest in one hand, the other hand resting over her sash",
     "holding {o} lowered gracefully in one hand, the other hand lightly touching her necklace",
     "one hand holding {o}, the other hand raised to adjust her earring",
     "holding {o} in one hand and lifting the edge of her sleeve with the other"]
H48=["holding {o} lightly in one hand, the other hand beneath it",
     "holding {o} before her, both hands gently around it",
     "holding {o} lowered in one hand, the other hand resting at her waist",
     "one hand holding {o}, the other hand calmly resting over her sash",
     "holding {o} against her chest with one hand, head slightly bowed"]
def pose_for(tr,i,t,prop,g=0):
    sig=prop
    k=(g*5+t*7)
    KEY=("fan","sachet","pouch","lantern","flute","scroll","book","songbook","mirror","peony","teacup","basket","beads","box","handkerchief","letter","cage","birdcage","vase","blossom","orchid","magnolia","wisteria","lotus","plum","osmanthus","peach","comb","ball","pendant")
    FL=("peony","blossom","orchid","magnolia","wisteria","lotus","plum","osmanthus","peach","flower")
    def keys(o): return {w for w in KEY if w in o}|({"FLOWER"} if any(f in o for f in FL) or "basket" in o or "vase" in o else set())|({"PAPER"} if any(p in o for p in ("letter","scroll","book")) else set())|({"ROUND"} if ("round silk fan" in o or "mirror" in o or "round fan" in o) else set())  # C-B: basket/vase count as floral, letter/scroll/book as paper
    objs=[sig]+[o for o in OBJ if not (keys(o)&keys(sig)) and not ("blossom" in o and any(f in sig for f in ("peony","orchid","magnolia","wisteria","lotus","plum","osmanthus","peach")))]
    pick=[]; j=k
    while len(pick)<3:
        o=objs[1+j%(len(objs)-1)]; j+=5 if len(pick)==0 else 6
        if all(not (keys(o)&keys(p)) for p in pick): pick.append(o)
        else: j+=1
    o2,o3,o4=pick
    ps=[H19[(g+t)%5].format(o=sig),H24[(g*2+t)%5].format(o=o2),H32[(g*3+t)%5].format(o=o3),H48[(g+2*t)%5].format(o=o4)]
    if t==8 and g%3==0: ps[3]="standing in stately stillness, hands hidden in her long wide sleeves before her, the long train spread on the ground behind her"
    suf=", with regal stately grace" if t>=7 else (", stately poised posture" if t>=5 else "")
    ps=[p+suf if "stately stillness" not in p else p for p in ps]
    return ("Poses (NEW, NOT the reference's poses; calm standing poses; LIVELY HANDS: a different hand gesture and a different held object for each figure, never the same gesture twice, not hands clasped at the belly), left to right: "
            f"about 19, youthful, a gently lively gesture: {ps[0]}; about 24, confident and graceful: {ps[1]}; about 32, poised, in her prime: {ps[2]}; about 48, serene and calm: {ps[3]}; "+STILL)
