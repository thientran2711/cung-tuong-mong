# python3 preview.py key...  -> scratchpad/sheets/one/act-<key>.jpg (512 art on a cream card with a label)
import sys,os
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.abspath(os.path.join(H,'../../..'))
O='/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/sheets/one'; os.makedirs(O,exist_ok=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
import json; D=json.load(open(os.path.join(H,'acts_list.json'))); NM={a['key']:a['names'][0] for a in D['acts']}
for k in sys.argv[1:]:
    W=Image.new('RGB',(432,600),'#f4ecdd'); W.paste(Image.open(os.path.join(ROOT,'img',os.environ.get('PFX','act-')+k+'.webp')).convert('RGB'),(24,24))
    ImageDraw.Draw(W).text((24,542),NM.get(k,k),fill='#5a1e14',font=F); p=os.path.join(O,os.environ.get('PFX','act-')+k+'.jpg'); W.save(p,quality=88); print(p)
