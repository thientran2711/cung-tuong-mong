# fa_apply.py fig.webp... : mm_fa in place (solid sheer), re-encode <=250KB  (art9)
import sys,io,subprocess,os
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))
for f in sys.argv[1:]:
    t=f+".fa.png"; subprocess.run(["python3","-I",D+"/mm_fa.py",f,t],check=True)
    im=Image.open(t).convert("RGBA")
    for q in (86,80,74,68,60,52):
        b=io.BytesIO(); im.save(b,"WEBP",quality=q,method=4)
        if b.tell()<=250*1024: break
    open(f,"wb").write(b.getvalue()); os.remove(t); print("fa",f,q)
