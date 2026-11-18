# review/face-reveal-anim: frame strip from the recording. usage: python3 dev/test/face-reveal-strip.py <outdir> <A|B> <crop x0,y0,x1,y1 in CSS px> [t0 offset s] [n frames] [step s]
import sys,json,subprocess,glob,os
from PIL import Image
o,k,crop=sys.argv[1],sys.argv[2],sys.argv[3];off=float(sys.argv[4]) if len(sys.argv)>4 else -0.1;n=int(sys.argv[5]) if len(sys.argv)>5 else 8;step=float(sys.argv[6]) if len(sys.argv)>6 else .15
v=glob.glob(o+'/*.webm')[0];tmp=o+'/_all';os.makedirs(tmp,exist_ok=True);subprocess.run(['ffmpeg','-y','-loglevel','error','-i',v,'-vf','fps=10,crop=12:12:0:0,scale=12:12','-start_number','0',tmp+'/%04d.png'],check=True)
fl=[];last=-9
for f in sorted(glob.glob(tmp+'/*.png')):
  i=int(os.path.basename(f)[:-4]);r,g,b=Image.open(f).convert('RGB').getpixel((3,3))
  if r>200 and g<80 and b>200 and i-last>8:fl.append(i/10)
  if r>200 and g<80 and b>200:last=i
import shutil;shutil.rmtree(tmp)
t0=fl[0 if k=='A' else 1]+0.5+off;fr=[]
if crop=='auto':
  m=json.load(open(o+'/marks.json'));crop=m['Acrop' if k=='A' else 'Bcrop']
else:crop=[int(x) for x in crop.split(',')]
for i in range(n):
  f=f'{o}/_f{k}{i}.png';subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',f'{t0+i*step:.3f}','-i',v,'-frames:v','1',f],check=True);fr.append(f)
ims=[Image.open(f).crop(crop) for f in fr];w,h=ims[0].size;s=min(1,360/w);ims=[i.resize((int(w*s),int(h*s))) for i in ims];cols=4;rows=(n+cols-1)//cols
S=Image.new('RGB',(ims[0].width*cols,ims[0].height*rows),'white')
for i,im in enumerate(ims):S.paste(im,((i%cols)*im.width,(i//cols)*im.height))
S.save(f'{o}/strip-{k}.png');[os.remove(f) for f in fr];print(f'{o}/strip-{k}.png')
