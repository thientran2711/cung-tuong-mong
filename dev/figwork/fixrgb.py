# fixrgb.py jid gen bg : replace RGB of bg-removed png with original gen RGB (keeps alpha)
import sys,json,subprocess,os
from PIL import Image
W=os.path.dirname(os.path.abspath(__file__)); db=json.load(open(W+"/urls.json"))
jid,gen,bg=sys.argv[1:4]
g=f"{W}/bg/gen-{gen}.png"
if not os.path.exists(g): subprocess.run(["curl","-sS","-o",g,db[gen]],check=True)
b=Image.open(f"{W}/bg/{jid}-{bg}.png").convert("RGBA"); o=Image.open(g).convert("RGB").resize(b.size)
o.putalpha(b.split()[3]); o.save(f"{W}/bg/{jid}-{bg}.png"); print("fixed",jid)
