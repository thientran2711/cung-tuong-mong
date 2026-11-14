# regrid.py NAME SRCNAME ROW : 2x2 grid g/NAME.jpg from the 4 EDIT tiles of row ROW (0=t7,1=t8) of ed/<SRCNAME>.jpg; meta g/NAME.json = those 4 specs
import sys,json,os
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
name,src,row=sys.argv[1],sys.argv[2],int(sys.argv[3]); T=1024
E=Image.open(f'ed/{src}.jpg').convert('RGB'); n=E.width//4; meta=json.load(open(f'g/{src}.json'))
G=Image.new('RGB',(2*T,2*T)); out=[]
for k in range(4):
    G.paste(E.crop((k*n,row*n,k*n+n,row*n+n)).resize((T,T),Image.LANCZOS),((k%2)*T,(k//2)*T))
    m=dict(meta[row*4+k]); m['cols']=2; out.append(m)
G.save(f'g/{name}.jpg',quality=95); json.dump(out,open(f'g/{name}.json','w')); print(name,[m['spec'] for m in out])
