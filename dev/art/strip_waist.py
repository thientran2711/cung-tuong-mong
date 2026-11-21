#!/usr/bin/env python3
"""G61 (owner L1905): no hand / held item in front of the waist (the in-game ngọc bội slot) in consort prompts. Only hand/item position words change.
usage: strip_waist.py [--write] FILE..."""
import re,sys
S="out to her side at chest height"
R=[
 (r"the item held in both hands lowered before her at waist height", "the item held in one hand "+S),
 (r"in the other hand at her waist", "in the other hand held out to her side"),
 (r"held (?:level|gently|close) at her waist (?:with|in) both hands", "held in one hand "+S),
 (r"held at her waist with both hands", "held at her side in one hand"),
 (r"hand held upright in front of her", "hand held upright to the side of her"),
 (r"(\bholding [^.;]{3,140}?) in both hands(?=, )", r"\1 in both hands raised at chest height"),
 # POSES_30.md (store pose table)
 (r"the item in the other hand at her waist", "the item in the other hand held out to her side"),
 (r"the item held at her waist with both hands", "the item held in one hand raised at her side"),
 (r"the item held across her body with both hands", "the item held up to the side of her chest in one hand"),
 (r"the item held level at her waist with both hands", "the item held upright in one hand at her side"),
 (r"the other hand resting on her sash", "the other hand resting lightly on her sleeve"),
 (r"the item held upright in front of her", "the item held upright to one side of her chest"),
 (r"the item held low in the other hand", "the item held low at her side in the other hand"),
 (r"the other holding the item in front", "the other holding the item out to the side"),
 (r"both hands holding the item in front", "one hand holding the item out to the side"),
 (r"the item cradled in the crook of one arm", "the item cradled in the crook of one arm at her side"),
]

def strip(t):
    for a,b in R: t=re.sub(a,b,t)
    return t
if __name__=="__main__":
    w=sys.argv[1]=="--write"; n=0
    for f in sys.argv[1+w:]:
        t=open(f,encoding="utf8").read(); u=strip(t)
        if u!=t:
            n+=1
            if w: open(f,"w",encoding="utf8").write(u)
    print("changed",n)
