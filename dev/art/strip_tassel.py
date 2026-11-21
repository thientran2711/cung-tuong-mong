#!/usr/bin/env python3
"""G57b (owner L1924 via #27): no tassel / pendant hanging from a HELD item (jade disc + red tassel was drawn from 'gem tassels'). Words only.
usage: strip_tassel.py [--write] FILE..."""
import re,sys
TS=r"(?:(?:a|an|small|long|silk|pearl|gem|jade|red|dragon)\s+)*tassels?"
R=[
 (r"any embroidery, painting or tassel on it", "any embroidery or painting on it"),
 (r"(\(tú cầu\)) with "+TS, r"\1"),
 (r"((?:flute|fan|parasol|handle|lantern|ruyi|scepter)\b[^\",;.]{0,70}?) and (?:a )?(?:gem|pearl|jade|silk) tassels?", r"\1"),
 (r"((?:flute|fan|parasol|lantern|ruyi|scepter|incense ball|ball)\b[^\",;.]{0,50}?) (?:with|on) "+TS+r"(?=[\",;. ]|$)", r"\1"),
 (r"((?:fan|handle|flute)\b[^\",;.]{0,70}?) and (?:a )?(?:small |long )?tassels?(?=[\",;. ]|$)", r"\1"),
 (r"(an embroidered silk sash) with silk tassels", r"\1"),
 (r", the other hand (?:lightly touching|steadying) its tassel", ""),
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
