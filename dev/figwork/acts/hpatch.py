# python3 hpatch.py ACTS_IN.json PATCH_OUT.json ACTS_OUT.json
# owner 15/11 16:50Z (action pictures = hands/objects only): every act / prefix / log rule whose picture key has a hands-only redraw
# (hgens.txt, served as img/act-<key>-h.webp) is pointed at <key>-h. Writes the patch (old -> new per entry) and the patched manifest.
import json, sys, os
H = os.path.dirname(os.path.abspath(__file__))
src, pout, aout = sys.argv[1:4]
A = json.load(open(src))
redo = {l.split()[0] for l in open(os.path.join(H, 'hgens.txt')) if l.strip()}
P = {'_doc': 'act-pics2 16:50Z hands-only redraws: replace picture key K by K-h (img/act-K-h.webp, already on the CDN). Apply to the CURRENT img/ACTS.json (pull first).', 'map': {k: k + '-h' for k in sorted(redo)}, 'acts': {}, 'prefix': {}, 'log': 0}
for sec in ('acts', 'prefix'):
    for name, k in A[sec].items():
        if k in redo: A[sec][name] = k + '-h'; P[sec][name] = k + '-h'
for r in A['log']:
    if r[1] in redo: r[1] = r[1] + '-h'; P['log'] += 1
json.dump(P, open(pout, 'w'), ensure_ascii=False, indent=1)
json.dump(A, open(aout, 'w'), ensure_ascii=False, separators=(',', ':'))
print('redo keys', len(redo), 'acts', len(P['acts']), 'prefix', len(P['prefix']), 'log rules', P['log'])
left = sorted({k for k in list(A['acts'].values()) + list(A['prefix'].values()) if not k.endswith('-h')})
print('act pictures not redrawn (older hands-only batch + 2 already hands-only):', len(left))
