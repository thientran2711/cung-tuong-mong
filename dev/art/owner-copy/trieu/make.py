#!/usr/bin/env python3
"""Triều phục c06 t1..t8 = APPROVED ORIGINAL prompt copied verbatim + ONLY a triều phục block (ROOT-40 order 19/11 ~04:01Z, owner method Lượt 238/239).
Originals (orig/): t1-t6 = golden_low/tN_v0_c06.txt from branch review/t8-prompt-B (18/11 W72 approved texts); t7/t8 = t8-prompt-B/goldenC2/t{7,8}_v0_c06.txt (approved HQP / HH pictures).
Edits to the original text: NONE, except (a) the reference number "image 1 (her first reference)" -> "image 2 (her second reference)" because today's
REFERENCES order puts the style image first (FIGURE_GATE A0 REFERENCES); apply it only with --refnum2. The block is inserted right before " Pose: calm standing pose;".
Block words come from build.py (TRIEU_MAIN, TRIEU_PANELS, TRIEU table, TRIEU_EDGE, SH_OLD5, NUDE_OPT A) - no new colour words.
Usage: python3 make.py   (NO --refnum2: refs are each original's own refs + image 3 Nữ quan)   -> writes tN_c06.txt + tN_c06.diff.txt next to this file."""
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
                + PAN.replace("the rank colour", "the rank colour, honey-amber like #E3A25B,")
                + f"over the cloud-collar cape a jewelled shoulder piece (cầu vai) over each shoulder, {SH_OLD5}, its edge: {EDGE[7]}.")
    return (" TRIỀU PHỤC (formal court uniform) details on this same outfit: BOTH SLEEVES (the arms of the robe, from the shoulder down to the cuff) and the collar band with its collar trims are the court red, "
            f"{mc} like {mh}, clearly red, with {dc} like {dh} in the linings; "
            + PAN.replace("each in the rank colour","each in that court red")
            + "the cloud collar sits on a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls over each shoulder, curving up and slightly pointed outward; "
            "from its edge hangs a LONG pearl fringe, several pearl strings deep, down to the elbow or longer, at least as long as the Hoàng quý phi's.")
# ROUND 15b (ROOT-40 19/11 ~04:10Z, owner Lượt 241 "lấy cái hình nữ quan để mà làm ảnh màu đi, và chất vải đi"): refs = each original's own refs
# (image 1 = own t1 face TdU0vvvVNR, image 2 = style m09 eIyOFEidqL) + image 3 = live Nữ quan m37 tm4 (s7IO0AUl8e, md5 = CDN img/hd/fig-maid-m37-tm4-a18.webp).
NQ=(" Image 3 is the Nữ quan reference image: the court red colour and the fabric (sheen, weave, drape) of this court robe exactly like the robe of the Nữ quan reference image (image 3);"
    " copy ONLY its colour and cloth, never its person, face, outfit cut, embroidery, hair, item or pose.")
# Lượt 414/416 RULE (ROOT-47): the style image (m09 / 6AbGv6EiJO) is used ONLY for the t1 thiếu nữ itself; every triều phục picture uses her OWN t1 picture as image 1 and NO style image (default; --style restores the old refs).
# Without the style image: image 1 = own t1 face, [image 2 = royal swatch on t6 --store], then the Nữ quan picture = image 2 (image 3 on t6 --store).
NS='--style' not in sys.argv
STYLE_SENT=" The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose."
def _nq(t):
    k=('3' if (t==6 and '--store' in sys.argv) else '2') if NS else ('4' if (t==6 and '--store' in sys.argv) else '3')
    return NQ.replace('Image 3','Image '+k).replace('(image 3)','(image '+k+')')
_block=block
def block(t): return _block(t)+_nq(t)
# ROUND 15c LAWS (ROOT-46 GO 19/11 ~08:09Z, owner Lượt 364; FIGURE_GATE Lượt 337 hair, 355 sleeves, 364 prompt-B fabric t7/t8).
# Sentences copied from the current builders: SLEEVES t1-t3 / t4-t6 = mk_ranks_v3.py; SLEEVES + HAIR UP t7/t8 + FL2 = mk_hqp_hh.py templates.
SLV={1:"SLEEVES: very long, wide, flowing sleeves of thin light silk that fall well past her hands and hang down to her KNEES, swaying gracefully and trailing elegantly (thướt tha); never short, narrow, cuffed or tight working sleeves like a maid's or palace servant's. ",
     4:"SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve layer, flowing softly, never stiff. ",
     7:"SLEEVES: very long, very wide, flowing sleeves that fall well past her hands and hang PAST her ankles all the way down until they TOUCH THE FLOOR, ONE single sleeve layer (no shorter outer sleeve on top); the brocade flows and drapes softly like heavy silk, never stiff. Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height. "}
HAIR_UP="HAIR UP: ALL of her hair is swept UP and gathered into the tall high chignon on top of her head under the crown, smooth at the nape; NO hair hanging loose down her back or over her shoulders. "
HAIR_LOOSE="Hair (HAIR LAW, ranks 1-3): her hair in a HALF-UP style: the top half gathered into a small bun at the crown under the court crown, the rest of her long hair hanging loose down her back. "
FL2='FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. '
LOOSE_SWAP={1:("hair in a neat bun","hair half-up"),2:("neat chignon","hair half-up"),3:("layered chignon","hair half-up")}
def laws(t,n):
    a=n.index(" Pose: calm standing pose;")
    if t<=3:
        if '--store' not in sys.argv: o,r=LOOSE_SWAP[t]; assert n.count(o)==1; n=n.replace(o,r)
        assert n.count("the hair gathered up beneath it")==1; n=n.replace("the hair gathered up beneath it","sitting on her half-up hair")
        add=SLV[1]+HAIR_LOOSE
    elif t<=6: add=SLV[4]
    else:
        add=SLV[7]+HAIR_UP
        assert n.count("COLOUR RULE")==1; n=n.replace("COLOUR RULE",FL2+"COLOUR RULE",1)
    a=n.index(" Pose: calm standing pose;")
    return n[:a]+" "+add.rstrip()+n[a:]
def wdiff(a,b):
    ta=re.findall(r'\S+\s*',a); tb=re.findall(r'\S+\s*',b); out=[]
    for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,ta,tb,autojunk=False).get_opcodes():
        if op!='equal': out.append(f"- {''.join(ta[i1:i2]).strip()}\n+ {''.join(tb[j1:j2]).strip()}\n")
    return "\n".join(out)
import subprocess
def store(t):
    a=['c06','v0']+(['--nostyle'] if NS else [])+(['--low',str(t)] if t<=6 else ['--t7'] if t==7 else [])
    return subprocess.run(['python3','build.py']+a,cwd=os.path.join(H,'../../t8-prompt-B'),capture_output=True,text=True,check=True).stdout.rstrip('\n')
# ROUND 17 (owner Lượt 397 item 2, FIGURE_GATE LAW #1; ROOT-47 GO): triều phục t1-t5 = the store TẦN (t4) outfit with the shoulder piece REMOVED,
# each rank keeps its own rank words, item/pose and its triều phục colours; fabric = the store t1-t3 fabric sentence; cầu vai stiff for all, no thường phục feature.
CAPE_A=", and as her ONE signature piece"; CAPE_B="no cloud collar, no vest, no stiff shoulder pieces;"
FAB_T4="The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
def r17_base(t):
    b=store(4); own=store(t)
    a=b.index(CAPE_A); e=b.index(CAPE_B)+len(CAPE_B); b=b[:a]+";"+b[e:]          # remove capelet + pearl net + "no stiff shoulder pieces"
    rk4=re.search(r"Outfit \([^:]*\):",b).group(0); rkt=re.search(r"Outfit \([^:]*\):",own).group(0); b=b.replace(rk4,rkt,1)   # own rank words
    lt=re.search(r"Light, soft, thin flowing silk:[^.]*\.",store(1)).group(0); assert b.count(FAB_T4)==1; b=b.replace(FAB_T4,lt)  # t1-t3 fabric
    pa=b.index(" Pose: calm standing pose;"); pe=b.index(" Every hairpin is inserted"); qa=own.index(" Pose: calm standing pose;"); qe=own.index(" Every hairpin is inserted")
    return b[:pa]+own[qa:qe]+b[pe:]                                              # own item/pose
R17_CV="a STIFF, structured jewelled shoulder piece (cầu vai) over each shoulder"
R17_ADD=(" The shoulders carry ONLY the stiff cầu vai: no capelet, no round cape, no pearl net or beaded yoke, no shawl and no sheer stole over the shoulders or arms."
         " Image 2 gives ONLY the court red colour; the cloth itself follows the fabric sentence above (light, soft, thin flowing silk), never velvet.")
for t in range(1,9):
    if '--r17' in sys.argv and t>5: continue
    if '--r17' in sys.argv:
        o=r17_base(t)
        a=o.index(" Pose: calm standing pose;"); bl=block(t).replace("a jewelled shoulder piece (cầu vai) over each shoulder",R17_CV)
        bl=bl.replace(_nq(t),"")+(R17_ADD if NS else R17_ADD.replace("Image 2 gives","Image 3 gives")); n=o[:a]+bl+o[a:]
        n=laws(t,n); open(os.path.join(H,f't{t}_c06.txt'),'w').write(n+"\n"); print(t,len(n)); continue
    o=store(t) if (t<=6 and '--store' in sys.argv) else open(os.path.join(H,'orig',f't{t}_v0_c06.txt')).read().rstrip('\n')
    if NS and STYLE_SENT in o: o=o.replace(STYLE_SENT,"",1)   # golden originals (t7/t8, or t1-t6 without --store): drop the style-reference sentence
    a=o.index(" Pose: calm standing pose;"); n=o[:a]+block(t)+o[a:]
    n=laws(t,n)
    if '--refnum2' in sys.argv:
        assert n.count("image 1 (her first reference)")==1; n=n.replace("image 1 (her first reference)","image 2 (her second reference)")
    open(os.path.join(H,f't{t}_c06.txt'),'w').write(n+"\n")
    open(os.path.join(H,f't{t}_c06.diff.txt'),'w').write(f"# t{t} c06: orig/t{t}_v0_c06.txt -> t{t}_c06.txt (word diff)\n"+wdiff(o,n))
    print(t,len(o),'->',len(n))
