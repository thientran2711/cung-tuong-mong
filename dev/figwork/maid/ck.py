# ck.py old:new ... : layout diff (mean abs diff at 128x64) between original gen and its hair edit
import sys,os,json,subprocess
from PIL import Image
import numpy as np
H=os.path.dirname(os.path.abspath(__file__))
subprocess.run(["python3",H+"/urls.py"],stdout=subprocess.DEVNULL); db=json.load(open(H+"/urls.json"))
def get(g):
    f=f"{H}/bg/gen-{g}.png"
    if not os.path.exists(f): subprocess.run(["curl","-sS","--retry","6","--retry-all-errors","-o",f,db[g]],check=True)
    return np.asarray(Image.open(f).convert("L").resize((128,64))).astype(float)
for p in sys.argv[1:]:
    a,b=p.split(":"); print(a,b,round(np.abs(get(a)-get(b)).mean(),1))
