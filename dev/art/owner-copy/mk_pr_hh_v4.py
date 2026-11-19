# Owner Lượt 334: princess Hoàng hậu t8 (yellow) + t8o (original colour) from the HQP/HH common template (Lượt 333).
src=open('mk_ranks_v3.py').read(); exec(src[:src.index('out=[]')])
from mk_hqp_hh import build as hb
IT={'bt':'an ornate gold Persian lantern of pierced filigree set with turquoise, with a short gold chain',
    'cl':'a small square gold ceremonial seal box wrapped in deep red silk with a jade knot',
    'pt':'a closed ceremonial folding fan of gilded cypress-wood slats with long multi-coloured silk cords'}
for k in ('bt','cl','pt'):
    d=P[k]
    for kind,suf in (('hh','t8'),('hh_orig','t8o')):
        s=hb(kind,FACE='Her face exactly as in image 1, the same person.',MAIN=d['main'],HEX1=d['hex1'],SEC=d['sec'],HEX2=d['hex2'],ITEM=IT[k],AGE='about 20',TOUCH=__import__("re").sub(r"her national colours [a-z ]+ and [a-z ]+ stay the two colours of the outfit; ","",d["touch"]),PRINCESS=d['country'])
        open(f'pr_{k}_{suf}_V4.txt','w').write(s)
print('ok')
