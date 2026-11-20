#!/usr/bin/env python3
"""EAR3: out/fit.json + out/*.webp/png -> necklace-square-demo.html (self-contained, base64)."""
import json, base64, os
D = os.path.dirname(os.path.abspath(__file__)); J = json.load(open(os.path.join(D, 'out', 'fit.json')))
def b64(f, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(os.path.join(D, 'out', f), 'rb').read()).decode()
for f in J.values():
    f['base'] = b64(f['base'], 'image/webp'); f['neck'] = b64(f['neck'], 'image/png')
html = open(os.path.join(D, 'page.src.html'), encoding='utf-8').read().replace('/*DATA*/null', json.dumps(J, ensure_ascii=False))
open(os.path.join(D, 'necklace-square-demo.html'), 'w', encoding='utf-8').write(html)
print('ok', os.path.getsize(os.path.join(D, 'necklace-square-demo.html')) // 1024, 'KB')
