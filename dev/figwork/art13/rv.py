# rv.py tag c:genid ... : download edits to ed/q<c>.png, write review sheets ed/rv-<tag>-N.jpg (2 consorts each)
import sys,subprocess,os
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
tag=sys.argv[1]; pairs=[a.split(':') for a in sys.argv[2:]]
subprocess.run(['python3','dl.py']+[f'ed/q{c}.png={g}' for c,g in pairs],check=True,stdout=subprocess.DEVNULL)
cs=[c for c,g in pairs]
for i in range(0,len(cs),2):
    O=Image.new('RGB',(1600,1600))
    for j,c in enumerate(cs[i:i+2]): O.paste(Image.open(f'ed/q{c}.png').convert('RGB').resize((1600,800)),(0,j*800))
    O.save(f'ed/rv-{tag}-{i//2}.jpg',quality=82); print(f'ed/rv-{tag}-{i//2}.jpg',cs[i:i+2])
