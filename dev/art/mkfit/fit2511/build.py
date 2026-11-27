#!/usr/bin/env python3
"""MAKEUP-FIT build: fixed/<face>.json (every woman picture on the CDN gets the fresh two-pass mesh; failures keep the old set and are listed),
fixed/toil-fit2.json (mouth re-seated on the mesh lips, face width = median ratio x eye distance when off > 20 %, rows added for pictures without one),
fixed/md5.json. Prints a before/after table."""
import json, glob, math, os, re, statistics, collections
os.chdir('/home/user/wt/mkwork'); os.makedirs('fixed', exist_ok=True)
I = json.load(open('idx.json'))['files']; md5 = {k[4:]: m for k, m, s in I}
res = {}
for f in glob.glob('res/*.json'): res.update(json.load(open(f)))
old = {}
for f in glob.glob('cdnfit/*.json'):
    g = os.path.basename(f)[:-5]
    if g != 'md5': old[g] = json.load(open(f))
def face_of(n): return re.match(r"(?:por|fig)-([a-z]+-[a-z]*\d+)-", n).group(1)
st = collections.Counter(); fails = []
new = {g: dict(t) for g, t in old.items()}
for n, r in sorted(res.items()):
    g = face_of(n); new.setdefault(g, {})
    if r[1] is None:
        fails.append(n); st['keep-old' if n in old.get(g, {}) else 'none'] += 1; continue
    d = r[0]
    st['added' if d is None or d < 0 else 'moved>.10' if d > .10 else 'moved.05-.10' if d > .05 else 'refined<.05'] += 1
    new[g][n] = r[1]
for g, t in new.items(): json.dump(t, open(f'fixed/{g}.json', 'w'), separators=(',', ':'), sort_keys=True)
m5 = json.load(open('cdnfit/md5.json')); m5.update({n: md5.get(n, '') for n, r in res.items() if r[1]}); json.dump(m5, open('fixed/md5.json', 'w'), separators=(',', ':'), sort_keys=True)
# ---- toil-fit2
tf = json.load(open('toil-fit2.json')); tf = tf.get('fit', tf)
def geo(v, W, H):
    P = [(v[2*i] / 40, v[2*i+1] / 40 * H / W) for i in range(60)]  # % of width on both axes
    c = lambda a, b: (sum(p[0] for p in P[a:b]) / (b-a), sum(p[1] for p in P[a:b]) / (b-a))
    lc, ea, eb = c(0, 12), c(20, 30), c(30, 40)
    if ea[0] > eb[0]: ea, eb = eb, ea
    return lc, ea, eb, math.hypot(ea[0]-eb[0], ea[1]-eb[1])
rat = []; hr = []
for n, t in tf.items():
    r = res.get(n)
    if not r or not r[1]: continue
    lc, ea, eb, ed = geo(r[1], r[2], r[3]); A = r[3] / r[2]
    if math.hypot(lc[0]-t[0], lc[1]-t[1]*A) / t[6] < .05: rat.append(t[6] / ed); hr.append(t[7] / t[6])
RAT, HR = statistics.median(rat), statistics.median(hr)
tst = collections.Counter(); out = dict(tf)
for n, r in res.items():
    if not r[1]: continue
    W, H = r[2], r[3]; A = H / W; lc, ea, eb, ed = geo(r[1], W, H)
    fw = RAT * ed; tilt = round(math.degrees(math.atan2(eb[1]-ea[1], eb[0]-ea[0])), 1)
    mx, my = lc[0], lc[1] / A
    ch = [(e[0] + (-1 if e is ea else 1) * .06 * ed, (e[1] + (lc[1]-e[1]) * .55) / A) for e in (ea, eb)]
    t = tf.get(n)
    if t is None:
        out[n] = [round(mx, 2), round(my, 2), round(ch[0][0], 2), round(ch[0][1], 2), round(ch[1][0], 2), round(ch[1][1], 2), round(fw, 2), round(fw * HR, 2), round(A, 4), 0]; tst['row added'] += 1; continue
    dm = math.hypot(lc[0]-t[0], lc[1]-t[1]*A) / t[6]; off = abs(t[6] / fw - 1)
    if dm <= .05 and off <= .20: tst['row kept'] += 1; continue
    s = fw / t[6] if off > .20 else 1.0
    out[n] = [round(mx, 2), round(my, 2), round(ch[0][0], 2), round(ch[0][1], 2), round(ch[1][0], 2), round(ch[1][1], 2), round(t[6]*s, 2), round(t[7]*s, 2), t[8], t[9]]
    tst['mouth re-seated' + (' + width rescaled' if s != 1 else '')] += 1
json.dump(out, open('fixed/toil-fit2.json', 'w'), separators=(',', ':'))
print(json.dumps({'mesh': st, 'fail_list': fails[:40], 'n_fail': len(fails), 'toilfit': tst, 'ratio fw/eye': round(RAT, 3), 'fh/fw': round(HR, 3)}, indent=1))
