# Owner L1893 (via #25): L1880 works but shows too much collarbone ("about to slip") -> pull the collar up a little.
# From PHISIMPLE_L1880: collar words only. Edges reach ~two-thirds along the collarbones, outer ends covered, V a little higher; wide flat look kept.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
t=open(D+'s62_t5_HAN_PHISIMPLE_L1880.txt').read()
t=rep(t,"NECKLINE (most important): her crossed collar opens WIDE, its edges lying ON the shoulders out to the OUTER ENDS of both collarbones, the WHOLE collarbone fully bare on both sides, never off the shoulders.",
        "NECKLINE (most important): her crossed collar opens WIDE and lies FLAT and SECURE on the shoulders, its edges reaching about TWO-THIRDS of the way out along both collarbones: the inner part of the collarbones visible, their outer ends covered, never slipping, never off the shoulders.")
t=rep(t,"the collar edges lie ON the shoulders out to the OUTER ENDS of both collarbones and meet low at the chest in a broad V, the WHOLE collarbone fully bare on both sides,",
        "the collar edges lie flat and secure on the shoulders about two-thirds of the way out along the collarbones (inner part visible, outer ends covered) and meet a little above the bust in a broad V,")
open(D+'s62_t5_HAN_PHISIMPLE_L1893.txt','w').write(t)
