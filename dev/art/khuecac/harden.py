# Harden the alpha of a cut that cutcheck flags (semi-transparent ribbon/hem halos): a' = clip((a-40)*255/110).
# Works on the same source fin.py uses. Usage: python3 harden.py WORKDIR TIER face...   then rerun fin.py for those faces.
import sys,os
import numpy as np
from PIL import Image
W,T=sys.argv[1],sys.argv[2]
for c in sys.argv[3:]:
    for n in (f'{T}-{c}-ret.png',f'{T}-{c}.png',f'{c}.png'):
        p=os.path.join(W,'cut',n)
        if os.path.exists(p):break
    im=np.array(Image.open(p).convert('RGBA')).astype(float)
    im[:,:,3]=np.clip((im[:,:,3]-40)*255/110,0,255)
    Image.fromarray(im.astype(np.uint8)).save(p);print('hardened',p)
