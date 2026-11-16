import sys,os,json
sys.path.insert(0,'/home/user/wt/hd3/dev/art/huadian-size')
import numpy as np
from PIL import Image
from shrink2 import analyze
S=os.path.dirname(os.path.abspath(__file__)); L=json.load(open(S+'/L.json'))
for n,x in L.items():
    if not n.startswith('por-') or 'win' not in x or 'inner' not in x: continue
    p=f'{S}/por/{n}.webp'
    if not os.path.exists(p): continue
    try:
        rgb=np.asarray(Image.open(p).convert('RGBA'))[...,:3]
        an=analyze(rgb,x['win'],x['fw'],inner=x['inner']); r=None if an is None else round(an['width']/x['fw'],4)
    except Exception as e: r=None
    print(json.dumps(dict(name=n,status=x.get('status'),before=x.get('ratio'),after=r)),flush=True)
