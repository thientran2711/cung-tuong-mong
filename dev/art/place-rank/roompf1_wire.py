# usage: wire.py CREATIONS_GET_DUMP JSON code=id [code=id ...]  -> checks prompt==json, downloads, webp q88 to img/_review/place-rank/pr13/<key>-ha-sang.webp, measures
import re, sys, json, subprocess, os
from PIL import Image
dump, js = sys.argv[1], sys.argv[2]
pairs = dict(a.split('=') for a in sys.argv[3:])
O = json.load(open(js)); code2key = {v['code']: k for k, v in O.items()}
info = {}; cur = None
for l in open(dump).read().split('\n'):
    m = re.match(r'  - identifier: (\S+)', l)
    if m: cur = m.group(1); info[cur] = {}
    m = re.match(r'    url: "(.*)"', l)
    if m and cur: info[cur]['url'] = m.group(1)
    m = re.match(r'      prompt: "(.*)"$', l)
    if m and cur: info[cur]['prompt'] = m.group(1)
    m = re.match(r'    status: (\S+)', l)
    if m and cur: info[cur]['status'] = m.group(1)
S = os.environ.get('WIRE_TMP', '/tmp/roompf1_dl/'); os.makedirs(S, exist_ok=True)
outs = []
for c, i in pairs.items():
    k = code2key[c]; p = info[i]['prompt'].replace('\\"', '"')
    same = p.strip() == O[k]['prompt'].strip()
    out = f'img/_review/place-rank/pr13/{k}-ha-sang.webp'
    if os.path.exists(out): print('EXISTS, skip', out); continue
    if not same: print('PROMPT MISMATCH', c, i, k); continue
    f = S + f'{c}.png'; subprocess.run(['curl', '-s', '-o', f, info[i]['url']], check=True)
    im = Image.open(f).convert('RGB'); assert im.size == (2688, 1386), im.size
    im.save(out, 'WEBP', quality=88); outs.append(out); print(c, i, k, 'OK')
if outs: subprocess.run(['python3', 'dev/art/place-rank/measure_floor.py', *outs])
