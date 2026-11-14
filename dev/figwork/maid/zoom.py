# zoom.py out.jpg id... : heads of a51 for tm0,tm2,tm3,tm4 per identity
import sys
from PIL import Image
W='/tmp/claude-0/-home-user-cung-tuong-mong/84f333ce-ebd1-5e4a-9b0c-43035da11b67/scratchpad/wt-maidA/img/'
ids=sys.argv[2:]; T=['tm0','tm2','tm3','tm4']; ag=__import__('os').environ.get('AG','a51')
out=Image.new('RGB',(4*200,len(ids)*170),(246,240,228))
for r,i in enumerate(ids):
  for c,t in enumerate(T):
    try: im=Image.open(W+f'fig-maid-{i}-{t}-{ag}.webp').convert('RGBA')
    except Exception: continue
    w,h=im.size; cr=im.crop((0,0,w,int(h*0.2))); cr.thumbnail((200,170)); out.paste(cr,(c*200,r*170),cr)
out.save(sys.argv[1])
