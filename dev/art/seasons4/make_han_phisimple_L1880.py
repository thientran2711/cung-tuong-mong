# Owner L1880 (via #25): on PHISIMPLE_L1861 change ONLY collar/neckline words: wide crossed collar on the shoulders out to the
# OUTER ENDS of both collarbones, whole collarbone bare, 3 bands flat along it, never off-shoulder; early + repeated once. No yoke.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def rep(t,a,b):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,b)
t=open(D+'s62_t5_HAN_PHISIMPLE_L1861.txt').read()
EARLY=("NECKLINE (most important): her crossed collar opens WIDE, its edges lying ON the shoulders out to the OUTER ENDS of both "
       "collarbones, the WHOLE collarbone fully bare on both sides, never off the shoulders.")
t=rep(t,"no yellow, golden or sepia colour cast.","no yellow, golden or sepia colour cast. "+EARLY)
t=rep(t,"open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing)",
        "open WIDE: the collar edges lie ON the shoulders out to the OUTER ENDS of both collarbones and meet low at the chest in a broad V, the WHOLE collarbone fully bare on both sides, the three bands lying flat along this wide opening over the shoulders (never narrow near the neck, never a tight high crossing, never off the shoulders)")
open(D+'s62_t5_HAN_PHISIMPLE_L1880.txt','w').write(t)
