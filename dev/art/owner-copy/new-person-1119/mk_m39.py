#!/usr/bin/env python3
"""Lượt 377/381 rank test on m39 v4 (approved thiếu nữ, gen tCRFXOSmZJ, cut JNCRSC2Oq4).
Prompts = dev/art/store-all/build_all.py m39 N (store verbatim + owner law block). ONLY slot rows changed, through the store's own tables
(the same way build_all injects the princesses): the store's m39 row was measured from the OLD m39 maid picture (sky blue/silver #BDB6BD/#D7CCCE,
face 'long slender, downcast eyes'); m39 v4 is a different face in lilac/ivory -> colour slot = lilac purple #CCAFC8 (main; family 'lilac purple and silver' keeps the store accent word) / ivory white #E7D7DA (ORIG1 lining tone)
(median of the v4 cut robe/skirt), face slot = the v4 face words. t8o = t8 with only the colour slots switched to her colour dominant (tpl_hh_orig wording).
Usage: mk_m39.py OUTDIR  -> writes m39_t1..t8.txt, m39_t8o.txt"""
import sys,os
HERE=os.path.dirname(os.path.abspath(__file__)); ART=os.path.dirname(os.path.dirname(HERE)); sys.path.insert(0,os.path.join(ART,"store-all"))
import build_all as BA
MAIN,H1,SEC,H2="lilac purple","#CCAFC8","ivory white","#E7D7DA"; PAL=f"{MAIN} and silver"   # signature family keeps the store's accent word silver (t6 store sentence "silver only as a small accent;" unchanged); ORIG1 2nd tone = her ivory skirt
FACE="a small round face with soft full cheeks and a small rounded chin, large clear wide-open round eyes, gently arched soft brows, a small button nose, small soft rosy lips"
_old=BA._inject
def _inj(g):
    _old(g)
    g["DATA"]["m39"]=(PAL,""); g["ORIG1"]["m39"]=(f"{MAIN} silk like {H1}",f"{SEC} like {H2}"); g["LOWNAME"]["m39"]=(MAIN,MAIN)
    mot=g["MAID_MOT"][(39-1)%13]
    for t in (4,5,6): g["OUTFIT_JOBS"][f"m39-t{t}"]=g["_g3"]["outfit"](t,PAL,mot).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")
BA._inject=_inj; BA.FACE_M["m39"]=FACE
def t8o(s):
    a=f"robe of golden yellow silk mixed with {MAIN},"; b=f"robe of {MAIN} silk mixed with royal golden yellow,"
    c="the royal golden yellow is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), her colour is the second colour (collar, inner robe, wide borders and a few panels)"
    d=f"her {MAIN} is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), and the royal golden yellow is the second colour (collar, inner robe, wide borders and a few panels)"
    assert s.count(a)==1 and s.count(c)==1,(s.count(a),s.count(c)); return s.replace(a,b).replace(c,d)
if __name__=="__main__":
    out=sys.argv[1]
    for t in range(1,9):
        s=BA.build("m39",t)[1]; open(os.path.join(out,f"m39_t{t}.txt"),"w").write(s)
        if t==8: open(os.path.join(out,"m39_t8o.txt"),"w").write(t8o(s))
    print("ok")
