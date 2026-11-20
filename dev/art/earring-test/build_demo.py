#!/usr/bin/env python3
"""Build earring-demo.html (self-contained, base64) from anchors.json + local pictures."""
import json, base64, os
D=os.path.dirname(os.path.abspath(__file__))
A=json.load(open(os.path.join(D,'anchors.json')))
def uri(f):
    mt='image/webp' if f.endswith('.webp') else 'image/png'
    return f'data:{mt};base64,'+base64.b64encode(open(os.path.join(D,f),'rb').read()).decode()
IMG={k:uri(v['file']) for k,v in A['items'].items()}
FIG={k:uri(k+'_cut.webp') for k in A['figures']}
OCC={o['file']:uri(o['file']) for f in A['figures'].values() for o in f['occ']}
html=open(os.path.join(D,'demo.src.html'),encoding='utf-8').read()
html=html.replace('/*DATA*/','const A='+json.dumps(A,ensure_ascii=False)+';const IMG='+json.dumps(IMG)+';const FIG='+json.dumps(FIG)+';const OCC='+json.dumps(OCC)+';')
open(os.path.join(D,'earring-demo.html'),'w',encoding='utf-8').write(html)
print('size MB',round(os.path.getsize(os.path.join(D,'earring-demo.html'))/1e6,2))
