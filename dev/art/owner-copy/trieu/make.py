#!/usr/bin/env python3
"""Triều phục c06 t1..t8 = APPROVED ORIGINAL prompt copied verbatim + ONLY a triều phục block (ROOT-40 order 19/11 ~04:01Z, owner method Lượt 238/239).
Originals (orig/): t1-t6 = golden_low/tN_v0_c06.txt from branch review/t8-prompt-B (18/11 W72 approved texts); t7/t8 = t8-prompt-B/goldenC2/t{7,8}_v0_c06.txt (approved HQP / HH pictures).
Edits to the original text: NONE, except (a) the reference number "image 1 (her first reference)" -> "image 2 (her second reference)" because today's
REFERENCES order puts the style image first (FIGURE_GATE A0 REFERENCES); apply it only with --refnum2. The block is inserted right before " Pose: calm standing pose;".
Block words come from build.py (TRIEU_MAIN, TRIEU_PANELS, TRIEU table, TRIEU_EDGE, SH_OLD5, NUDE_OPT A) - no new colour words.
Usage: python3 make.py [--refnum2]   -> writes tN_c06.txt + tN_c06.diff.txt next to this file."""
import os, sys, re, difflib, importlib.util
H=os.path.dirname(os.path.abspath(__file__))
sys.argv_saved=sys.argv; B=os.path.join(H,'../../t8-prompt-B/build.py')
spec=importlib.util.spec_from_file_location('build',B); sys.argv=['build.py','c06','v0']
src=open(B).read(); src=src[:src.index("\nif __name__")] if "\nif __name__" in src else src
g={'__file__':B,'__name__':'build_lib'}; exec(compile(src,B,'exec'),g); sys.argv=sys.argv_saved
mc,mh,dc,dh=g['TRIEU_MAIN']; T=g['TRIEU']; EDGE=g['TRIEU_EDGE']; PAN=g['TRIEU_PANELS']; SH_OLD5=g['SH_OLD5']
RED=f"the robe and both sleeves are the court red, {mc} like {mh}, with {dc} like {dh} in the linings"
def block(t):
    rk,sc,sh,sp,emb,head,lux=T[t]
    if t<=6:
        return (f" TRIỀU PHỤC (formal court uniform) details on this same outfit: it is worn as the formal court robe (triều phục); {RED}; "
                f"the collar band, the cuff bands and the sash in the rank colour {sc} like {sh}; "
                + PAN.replace("the rank colour", "that rank colour")
                + f"a jewelled shoulder piece (cầu vai) over each shoulder, {sp}, its edge: {EDGE[t]}; {head}.")
    if t==7:
        return (f" TRIỀU PHỤC (formal court uniform) details on this same outfit: it is worn as the formal court robe (triều phục); {RED}; "
                + PAN.replace("the rank colour", "the rank colour, warm amber-gold like #DE9448,")
                + f"over the cloud-collar cape a jewelled shoulder piece (cầu vai) over each shoulder, {SH_OLD5}, its edge: {EDGE[7]}.")
    return (" TRIỀU PHỤC (formal court uniform) details on this same outfit: BOTH SLEEVES (the arms of the robe, from the shoulder down to the cuff) and the collar band with its collar trims are the court red, "
            f"{mc} like {mh}, clearly red, with {dc} like {dh} in the linings; "
            + PAN.replace("each in the rank colour","each in that court red")
            + "the cloud collar sits on a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, curving up and slightly pointed outward; "
            "from its edge hangs a LONG pearl fringe, several pearl strings deep, down to the elbow or longer, at least as long as the Hoàng quý phi's.")
def wdiff(a,b):
    ta=re.findall(r'\S+\s*',a); tb=re.findall(r'\S+\s*',b); out=[]
    for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,ta,tb,autojunk=False).get_opcodes():
        if op!='equal': out.append(f"- {''.join(ta[i1:i2]).strip()}\n+ {''.join(tb[j1:j2]).strip()}\n")
    return "\n".join(out)
for t in range(1,9):
    o=open(os.path.join(H,'orig',f't{t}_v0_c06.txt')).read().rstrip('\n')
    a=o.index(" Pose: calm standing pose;"); n=o[:a]+block(t)+o[a:]
    if '--refnum2' in sys.argv:
        assert n.count("image 1 (her first reference)")==1; n=n.replace("image 1 (her first reference)","image 2 (her second reference)")
    open(os.path.join(H,f't{t}_c06.txt'),'w').write(n+"\n")
    open(os.path.join(H,f't{t}_c06.diff.txt'),'w').write(f"# t{t} c06: orig/t{t}_v0_c06.txt -> t{t}_c06.txt (word diff)\n"+wdiff(o,n))
    print(t,len(o),'->',len(n))
