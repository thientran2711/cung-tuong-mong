#!/usr/bin/env python3
"""Build earring-demo.html (self-contained, base64) from anchors.json + layers/layers.json + sprites/."""
import json, base64, os
D = os.path.dirname(os.path.abspath(__file__))
A = json.load(open(os.path.join(D, 'anchors.json'), encoding='utf-8'))
LAY = json.load(open(os.path.join(D, 'layers', 'layers.json')))
PINS = json.load(open(os.path.join(D, 'sprites', 'pins.json')))


def uri(f):
    mt = 'image/webp' if f.endswith('.webp') else 'image/png'
    return f'data:{mt};base64,' + base64.b64encode(open(os.path.join(D, f), 'rb').read()).decode()


IMG = {k: uri(v['file']) for k, v in A['items'].items()}
FIG = {k: uri(k + '_cut.webp') for k in A['figures']}
LAYERS = {fid: {ln: [uri('layers/' + v[0]), v[1], v[2]] for ln, v in d.items()} for fid, d in LAY.items()}
HEAD = {}
for k, v in A['head_items'].items():
    if v['kind'] == 'pin':
        s = v['sprite']
        HEAD[k] = {'head': uri(f'sprites/pin_{s}_head.png'), 'shaft': uri(f'sprites/pin_{s}_shaft.png'), **PINS[s]}
    else:
        HEAD[k] = {'img': uri('sprites/' + v['sprite'])}
RANK = uri(A['compare']['rank_head'])
data = {'A': A, 'IMG': IMG, 'FIG': FIG, 'LAYERS': LAYERS, 'HEAD': HEAD, 'RANK': RANK}
js = ''.join(f'const {k}={json.dumps(v, ensure_ascii=False)};' for k, v in data.items())
html = open(os.path.join(D, 'demo.src.html'), encoding='utf-8').read().replace('/*DATA*/', js)
open(os.path.join(D, 'earring-demo.html'), 'w', encoding='utf-8').write(html)
print('size MB', round(os.path.getsize(os.path.join(D, 'earring-demo.html')) / 1e6, 2))
