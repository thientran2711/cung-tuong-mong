# python3 prompt.py KEY  (KEY = act key or cat-<category>) -> full prompt
import json,sys,os
D=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'acts_list.json')))
T=("Square game card illustration: {s}. One clear focal subject, centred and large in the frame, simple softly blurred palace background, "
   "readable even at tiny thumbnail size. Refined Chinese court illustration in gufeng (cổ phong) watercolour style like the reference, soft ink lines, "
   "delicate washes, warm luminous palette of vermilion, gold, jade green and soft pink, gentle light, rich elegant detail, luxurious and clean, never shabby. "
   "If people appear show only hands, sleeves or figures from behind, no faces. No text, no letters, no writing, no seal marks, no border, no frame, no signature.")
def P(k):
    if k.startswith('cat-'): return T.format(s=D['categories'][k[4:]]['scene'])
    a=[x for x in D['acts'] if x['key']==k][0]; return T.format(s=a['scene'])
for k in sys.argv[1:]: print(P(k))
