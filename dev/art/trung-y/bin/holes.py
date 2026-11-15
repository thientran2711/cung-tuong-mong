# holes.py FILES : sheets (role-id-tyN) whose figure has an ENCLOSED transparent hole >= 150 px (at 900 px) — real gaps or a
# refine v6 hole in a flat ivory robe (m18 ty1). Candidates for a re-cut with refine v7.
import sys, re, os, numpy as np; from PIL import Image; from scipy import ndimage as ndi
S = {}
for f in sys.argv[1:]:
    a = np.asarray(Image.open(f).convert("RGBA"))[..., 3] < 20
    lab, n = ndi.label(a); edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    sz = ndi.sum(a, lab, range(1, n + 1)); big = [int(s) for i, s in enumerate(sz, 1) if i not in edge and s >= 150]
    if big: S.setdefault(re.sub(r"-a\d\d\.webp$", "", os.path.basename(f))[4:], []).append(max(big))
for k in sorted(S): print(k, S[k])
print(len(S), "sheets with enclosed holes", file=sys.stderr)
