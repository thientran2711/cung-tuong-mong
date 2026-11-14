# rva.py tag name:genid ... : download 2x2 edits -> ed/<name>.jpg (png deleted), review sheets ed/rva-<tag>-N.jpg (4 grids per sheet, 2x2 of 800px)
import sys,subprocess,os
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
tag=sys.argv[1]; pairs=[a.split(':') for a in sys.argv[2:]]
for nm,g in pairs:
    if os.path.exists(f'ed/{nm}.jpg'): continue
    subprocess.run(['python3','dl.py',f'ed/{nm}.png={g}'],check=True,stdout=subprocess.DEVNULL)
    Image.open(f'ed/{nm}.png').convert('RGB').save(f'ed/{nm}.jpg',quality=93); os.remove(f'ed/{nm}.png')
ns=[n for n,g in pairs]
for i in range(0,len(ns),4):
    O=Image.new('RGB',(1600,1600))
    for j,nm in enumerate(ns[i:i+4]): O.paste(Image.open(f'ed/{nm}.jpg').resize((800,800)),((j%2)*800,(j//2)*800))
    O.save(f'ed/rva-{tag}-{i//4}.jpg',quality=82); print(f'ed/rva-{tag}-{i//4}.jpg',ns[i:i+4])
