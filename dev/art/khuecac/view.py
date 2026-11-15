# Quick looks for self-check. python3 view.py WORKDIR OUTPREFIX prefix face...  (prefix '' = kc raw, 'ng-' = ngheo raw)
# writes OUTPREFIX-full.jpg (whole raws in a row) and OUTPREFIX-face.jpg (large face crops: forehead, cheeks, chin, lips)
import sys,os
from PIL import Image
W,O,pre=sys.argv[1],sys.argv[2],sys.argv[3];faces=sys.argv[4:]
ims=[Image.open(os.path.join(W,'raw',pre+c+'.png')).convert('RGB') for c in faces]
h=900;a=[i.resize((round(i.width*h/i.height),h)) for i in ims];S=Image.new('RGB',(sum(i.width for i in a),h));x=0
for i in a:S.paste(i,(x,0));x+=i.width
S.save(O+'-full.jpg',quality=85)
r=[]
for i in ims:
    w,hh=i.size;c=i.crop((int(w*.3),int(hh*.03),int(w*.7),int(hh*.2)));r.append(c.resize((420,round(420*c.height/c.width))))
S=Image.new('RGB',(420*len(r),max(x.height for x in r)));x=0
for i in r:S.paste(i,(x,0));x+=420
S.save(O+'-face.jpg',quality=92)
