import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from r4_cropsheet import cell
from PIL import Image
age=sys.argv[2]; od,nd=sys.argv[3],sys.argv[4]; out=sys.argv[1]
names=sorted(f[:-5] for f in os.listdir(nd) if f.endswith(f'-a{age}.webp') and f.startswith('por-'))
pairs=[]
for n in names: pairs.append(cell(f'{od}/{n}.webp',n,S=2)); pairs.append(cell(f'{nd}/{n}.webp',n,S=2))
w,h=pairs[0].size; cols=6
rows=(len(pairs)+cols-1)//cols
sh=Image.new('RGB',(w*cols,h*rows))
for i,c in enumerate(pairs): sh.paste(c,((i%cols)*w,(i//cols)*h))
sh.save(out,quality=85); print(sh.size,len(names))
