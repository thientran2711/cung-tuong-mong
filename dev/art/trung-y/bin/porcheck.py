# porcheck.py DIR : sheets (role-id-tyN) whose 4 figures give a portrait face width >22% off the sheet median (zoomed-out portrait class)
import sys, glob, os, re, importlib.util, numpy as np; from PIL import Image
sp_=importlib.util.spec_from_file_location("porcrop", os.path.join(os.path.dirname(__file__), "../../../figwork/porcrop.py")); pc=importlib.util.module_from_spec(sp_); sp_.loader.exec_module(pc)
S={}
for f in sorted(glob.glob(sys.argv[1] + "/fig-*-ty*-a*.webp")):
    k = re.sub(r"-a\d\d\.webp$", "", os.path.basename(f))[4:]
    S.setdefault(k, []).append((f, pc.find_face(Image.open(f).convert("RGBA"))[2]))
bad = []
for k, L in S.items():
    med = np.median([w for _, w in L])
    if any(abs(w / med - 1) > 0.22 for _, w in L): bad.append(k)
print(len(S), "sheets,", len(bad), "flagged:", " ".join(bad))
