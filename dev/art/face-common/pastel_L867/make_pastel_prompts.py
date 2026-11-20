"""PR18 Lượt 867: owner test — redraw s46–s61 with the L840 PASTEL hexes (robe_pastel.py flat-hex form: w=1, g from the hex).
A17/B2: ONLY the two robe hexes in the TWO-COLOUR RULE sentence change; every other word is the original sNN prompt."""
import re, sys, os, math, json
HERE = os.path.dirname(os.path.abspath(__file__)); FC = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(os.path.dirname(FC), 'place-rank', 'stage_exact'))
import numpy as np
from robe_colour import lab
from robe_lower import lab2rgb, KMIN
SRC = {'s46':'s46.v5','s47':'s47.v5','s48':'s48.v5','s49':'s49.v5','s50':'s50.v5','s51':'s51.v5b','s52':'s52.v5','s53':'s53.v5',
       's54':'s54.v5b','s55':'s55.v5','s56':'s56.v5','s57':'s57.v5','s58':'s58.v5','s59':'s59.v5','s60':'s60.v5','s61':'s61.v5'}
sys.path.insert(0, os.path.dirname(FC)); sys.path.insert(0, FC)
import master_common, face_gate as FG
ROOTS = json.load(open(os.path.join(FC, 's_root_colours.json'), encoding='utf-8'))
MASTER_FIX = {'s46', 's47', 's48', 's49', 's50'}
def h2rgb(h): return np.array([[[int(h[i:i+2],16) for i in (1,3,5)]]], float)
def pastel_hex(h, k):
    X = lab(h2rgb(h))[0,0]; L,a,b = X; C = math.hypot(a,b); kc = math.sqrt(k); t = 1.2*(1-k)
    g = min(1,max(0,(C-4)/12))*min(1,max(0,(L-35)/15))
    Y = np.array([[[L + max(0,88-L)*t*g, a*kc, b*kc]]]); r = np.clip(lab2rgb(Y)[0,0].round(),0,255).astype(int)
    return '#%02X%02X%02X' % tuple(r), (round(L,1), round(C,1)), 
def chroma(h): X = lab(h2rgb(h))[0,0]; return math.hypot(X[1],X[2])
out = {}
for s, f in SRC.items():
    txt = open(os.path.join(FC, f + '.FULL.txt')).read()
    rd = ROOTS.get(s, {}).get('root_drawn')
    if rd:   # s46/s49/s50: L770 changed the codes in the file AFTER the gen ('codes only, picture not redrawn') -> restore the DRAWN pair
        cur = ROOTS[s]
        for k in ('main', 'sec'):
            if cur[k] != rd[k]: txt = txt.replace(cur[k], rd[k])
            txt = txt.replace(cur[k + '_hex'], rd[k + '_hex'])
    if s in MASTER_FIX:   # s46–s50 files predate the B25 master sentences -> same fixer as face_gate.final (master + D9), no other change
        txt = master_common.apply(txt)
        if FG.D9.strip() not in txt:
            i = txt.index(FG.END); txt = txt[:i].rstrip() + FG.D9 + ' ' + txt[i:]
    m = re.search(r"the MAIN colour (.+?) like (#[0-9A-Fa-f]{6}) and the SECONDARY colour (.+?) like (#[0-9A-Fa-f]{6})", txt)
    mh, sh = m.group(2).upper(), m.group(4).upper()
    k = max(KMIN, min(1, 14/max(chroma(mh),1e-6), 20/max(chroma(sh),1e-6)))
    pm, sm = pastel_hex(mh,k)[0], pastel_hex(sh,k)[0]
    new = txt.replace(mh, pm).replace(m.group(2), pm).replace(sh, sm).replace(m.group(4), sm)
    for nm in (m.group(1), m.group(3)):   # colour WORDS: a 'deep/dark' name would fight the lighter hex -> drop only that word
        nn = re.sub(r'^(deep|dark|dusky) ', '', nm)
        if nn != nm: new = new.replace(nm, nn)
    assert new.count(pm) >= 1 and new != txt or (pm==mh and sm==sh)
    open(os.path.join(HERE, s + '.pastel.FULL.txt'), 'w').write(new)
    out[s] = dict(src=f, k=round(k,2), main=[m.group(1), mh, pm], sec=[m.group(3), sh, sm])
    print(s, f, 'k=%.2f' % k, m.group(1), mh, '->', pm, '|', m.group(3), sh, '->', sm)
json.dump(out, open(os.path.join(HERE, 'pastel_hexes.json'), 'w'), ensure_ascii=False, indent=1)
