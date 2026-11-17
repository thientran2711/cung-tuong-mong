# por2.py ORIG_DIR CLEAN_DIR OUT PORLOG NAME... : POR 2nd pass. Re-runs the guided (anchor-connected outlier) mask at por scale on the
# 1st-pass result to remove faint leftovers; lossless; diff vs ORIGINAL must stay inside the union rect.
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
from guided import guided
from det3 import remove
orig, cdir, out, plog = sys.argv[1:5]; os.makedirs(out, exist_ok=True)
L = {json.loads(l)['name']: json.loads(l) for l in open(plog)}
for n in sys.argv[5:]:
    info = dict(name=n, kind='por2')
    try:
        pl = L[n]; A = Image.open(f'{orig}/{n}.webp').convert('RGBA')
        src = f'{cdir}/{n}.webp' if pl['status'] == 'clean' else f'{orig}/{n}.webp'
        im = Image.open(src).convert('RGBA')
        if pl['status'] != 'clean': info['status'] = 'skip_nomark'; print(json.dumps(info)); continue
        d = guided(im, pl, 1.0, (0, 0), 0, 0)
        if d is None: info['status'] = 'no_leftover'; print(json.dumps(info)); continue
        res, rect = remove(im, d); res.save(f'{out}/{n}.webp', 'WEBP', lossless=True, quality=100, method=6, exact=True)
        a = np.asarray(A).astype(int); b = np.asarray(Image.open(f'{out}/{n}.webp').convert('RGBA')).astype(int)
        diff = np.abs(a - b).max(-1) > 0; r0 = pl['rect']; x0, y0 = min(r0[0], rect[0]), min(r0[1], rect[1]); x1, y1 = max(r0[2], rect[2]), max(r0[3], rect[3])
        o = diff.copy(); o[y0:y1, x0:x1] = False
        info.update(status='clean2', rect=[x0, y0, x1, y1], changed=int(d['mask'].sum()), out_diff=int(o.sum()), size_ok=a.shape == b.shape)
    except Exception:
        import traceback; info.update(status='error', err=traceback.format_exc()[-300:])
    print(json.dumps(info), flush=True)
