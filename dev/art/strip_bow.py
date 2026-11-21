#!/usr/bin/env python3
"""G60 (owner L1890): every waist/sash bow or knot is CENTRED at the front. Adds 'at the centre front' where a bow/knot has no position; rewrites side-bow wording. usage: strip_bow.py [--write] FILE..."""
import re,sys
R=[
 (r"(?:a|the) (?:soft )?(?:ribbon )?bow (?:tied )?(?:to one side|at the side|off-?centre|at her (?:left|right) (?:hip|side))", "a bow tied at the centre front"),
 (r"its bow at the waist", "its bow tied at the centre front of the waist"),
 (r"waist sash tied in a flat knot(?! at the)", "waist sash tied in a flat knot at the centre front"),
 (r"((?:chest-wrap with a gold-embroidered edge and )?a ribbon bow)\)", r"\1 at the centre front)"),
 (r"(above the bust in a ribbon bow)(?! at the)", r"\1 at the centre front"),
 (r"(in ONE small simple bow)(?! at the)", r"\1 at the centre front"),
 (r"tied in front with a soft lilac silk RIBBON BOW", "tied at the centre front with a soft lilac silk RIBBON BOW"),
 (r"sash tied in a bow at the waist between the two panels", "sash tied in a bow at the centre front of the waist, between the two panels"),
 (r"((?:ivory white|yellow|mint mist|[a-z ]{3,25}) sash) tied at the waist(?! at the centre)", r"\1 tied at the centre front of the waist"),
 (r"(embroidered silk sash tied flat) at the waist", r"\1 at the centre front"),
 (r"(a ribbon bow)(?=[;,.]| at its)", r"\1 at the centre front"),
]
SIDE=re.compile(r"\b(?:bows?|knots?|ribbons?|sash(?:es)?)\b[^.;:]{0,30}\b(?:to one side|(?:at|on) (?:the|her|one) (?:left|right|side)|at the side|off[- ]?centre|off[- ]?center|lopsided|slanted|crooked|asymmetric\w*)\b|\b(?:left|right|side)(?:-side)? (?:hip )?(?:bows?|knot)\b|\b(?:bows?|knot)\b[^.;:]{0,20}\bhip\b",re.I)
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
