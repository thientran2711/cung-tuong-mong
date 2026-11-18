#!/usr/bin/env python3
# python3 rebuild_acts.py <ACTS.json pulled from the CDN> <_index.json> <OUT.json>
# review/act-pic-match 18/11: the live img/ACTS.json had fallen back to the 15/11 morning base (209 acts, no "log", no "-h" keys), so ~75 act cards
# showed the kit placeholder (the dressing-table picture) and ~130 shared pictures. This replays every act-pics / pic-dupes / act-pics2 step on top of it,
# in the order they were made, then the act-pic-match patch. Idempotent: running it on an already complete manifest changes nothing.
import json, subprocess, sys, os, tempfile
H = os.path.dirname(os.path.abspath(__file__)); src, idx, out = sys.argv[1:4]; T = tempfile.mkdtemp()
def run(*a): subprocess.run([sys.executable] + list(a), check=True, stdout=subprocess.DEVNULL)
A = json.load(open(src, encoding='utf-8'))
if 'log' not in A or not A['log']:
    p = subprocess.run([sys.executable, os.path.join(H, 'actpics_manifest.py'), src], check=True, capture_output=True).stdout
    open(T + '/1.json', 'wb').write(p); run(os.path.join(H, '..', 'picdupes', 'patch.py'), T + '/1.json', idx, T + '/2.json'); A = json.load(open(T + '/2.json', encoding='utf-8'))
for f in ('ACTS_personcard_patch.json', 'ACTS_tuhoc_patch.json'): A['acts'].update(json.load(open(os.path.join(H, f), encoding='utf-8'))['acts'])
A['log'] = []                                   # meanings.py (mergepatch) is the superset of every earlier log rule
json.dump(A, open(T + '/3.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
run(os.path.join(H, 'hpatch.py'), T + '/3.json', T + '/p4.json', T + '/4.json')
run(os.path.join(H, 'mergepatch.py'), T + '/4.json', idx, T + '/p5.json', T + '/5.json')
run(os.path.join(H, 'syspatch.py'), T + '/5.json', idx, T + '/p6.json', T + '/6.json')
A = json.load(open(T + '/6.json', encoding='utf-8')); A['acts'].update(json.load(open(os.path.join(H, 'ACTS_actpicmatch_patch.json'), encoding='utf-8'))['acts'])
ks = {f[0] for f in json.load(open(idx))['files']}
bad = sorted({k for k in list(A['acts'].values()) + list(A['prefix'].values()) if k != '-' and 'img/act-%s.webp' % k not in ks})
assert not bad, 'keys not on the CDN: %s' % bad
json.dump(A, open(out, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('acts', len(A['acts']), 'prefix', len(A['prefix']), 'log', len(A['log']))
