# usage: sheet2.py dir out.jpg cid
import sys
from PIL import Image, ImageDraw
d,out,cid=sys.argv[1:4];h=520;pad=34
ranks=['t1 Dap ung','t2 Thuong tai','t3 Quy nhan','t4 Tan','t5 Phi','t6 Quy phi','t7 Hoang quy phi','t8 Hoang hau']
cells=[]
for v in (0,1,2):
    for k in range(1,9):
        im=Image.open(f'{d}/v{v}_t{k}.png').convert('RGBA');cells.append(im.resize((int(im.width*h/im.height),h)))
cw=max(c.width for c in cells)
S=Image.new('RGB',(cw*8+60,(h+pad)*3+pad),(235,225,205));dr=ImageDraw.Draw(S)
for k in range(8): dr.text((60+k*cw+8,6),ranks[k],fill=(0,0,0))
for i,c in enumerate(cells):
    r,col=i//8,i%8
    S.paste(c,(60+col*cw+(cw-c.width)//2,pad+r*(h+pad)),c)
for r,t in enumerate(['v0 orig','v1','v2']): dr.text((6,pad+r*(h+pad)+h//2),t,fill=(0,0,0))
S.save(out,quality=84);print(S.size)
