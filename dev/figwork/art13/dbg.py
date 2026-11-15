# dbg.py NAME EDIT K out.jpg : show fig crop (o) | edit tile (e) for tile K
import sys,json,os,numpy as np,cv2
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.argv=[sys.argv[0],'x','x']+sys.argv[1:]
src=open('hdg.py').read().split("cmd,name=sys.argv")[0]; exec(src)
name,edit,K,out=sys.argv[3],sys.argv[4],int(sys.argv[5]),sys.argv[6]
meta=json.load(open(f'g/{name}.json')); C=meta[0].get('cols',2); E=Image.open(edit).convert('RGB'); n=E.width//C; m=meta[K]
sp=m['spec']; rgb=flat(Image.open(bak(sp)).convert('RGBA'))
exL,eyL,dL=m['eyeL']; exF,eyF,dF=m['eyeF']; bL=m['boxL']; r=dF/dL
bF=[exF+(bL[0]-exL)*r,eyF+(bL[1]-eyL)*r,exF+(bL[2]-exL)*r,eyF+(bL[3]-eyL)*r]
o=rgb.crop(tuple(int(v) for v in bF)).resize((512,512)); e=E.crop(((K%C)*n,(K//C)*n,(K%C)*n+n,(K//C)*n+n)).resize((512,512))
O=Image.new('RGB',(1024,512)); O.paste(o,(0,0)); O.paste(e,(512,0)); O.save(out,quality=85); print(sp,m['eyeF'],m['eyeL'])
