# r1_measure.py (reviewer R1): re-measure mark width / face width on the LIVE por files using the worker's logged window+inner (same analyze()).
# usage: r1_measure.py PORDIR > out.jsonl
import sys,os,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
from shrink2 import analyze
pd=sys.argv[1]; D=os.path.dirname(os.path.abspath(__file__))
for l in open(D+'/log_por.jsonl'):
    x=json.loads(l); n=x['name']
    if not n.startswith('por-') or 'win' not in x or 'inner' not in x: continue
    p=f'{pd}/{n}.webp'
    if not os.path.exists(p): continue
    try:
        rgb=np.asarray(Image.open(p).convert('RGBA'))[...,:3]
        an=analyze(rgb,x['win'],x['fw'],inner=x['inner'])
        r=None if an is None else round(an['width']/x['fw'],4)
    except Exception as e: r='err'
    print(json.dumps(dict(name=n,status=x['status'],before=x.get('ratio'),after=r)),flush=True)
