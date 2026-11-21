# Owner L1884 (via #25): PHISIMPLE_L1861 exactly, ONLY add pearls sewn onto the collar bands (not a yoke, not a fringe).
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
t=open(D+'s62_t5_HAN_PHISIMPLE_L1861.txt').read()
a="innermost pale purple), never a third robe"; assert t.count(a)==1
t=t.replace(a,"innermost pale purple), small pearls stitched along the collar bands on the crossed collar edge itself, never a third robe")
open(D+'s62_t5_HAN_PHISIMPLE_PEARL_L1884.txt','w').write(t)
