import json,sys
from PIL import Image
D=json.load(open(sys.argv[1]))
def lin(c):
    c=c/255;return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def L(rgb):return 0.2126*lin(rgb[0])+0.7152*lin(rgb[1])+0.0722*lin(rgb[2])
def cr(a,b):a,b=max(a,b),min(a,b);return (a+0.05)/(b+0.05)
rows=[]
for r in D['res']:
    im=Image.open(r['f']).convert('RGB')
    for t in r['tags']:
        box=(int(t['x']),int(t['y']),int(t['x']+t['w']),int(t['y']+t['h']))
        if box[2]<=box[0] or box[3]<=box[1]:continue
        px=list(im.crop(box).getdata());ls=sorted(L(p) for p in px)
        lt=L(t['rgb']);med=ls[len(ls)//2];worst=ls[int(len(ls)*0.9)] if lt<0.2 else ls[int(len(ls)*0.1)]
        rows.append((r['k'],r['bu'],t['line'],t['mine'],t['txt'],round(cr(lt,med),2),round(cr(lt,worst),2),t['ts'],r['f']))
rows.sort(key=lambda x:x[5])
for x in rows[:25]:print(x)
print(len(rows),'lines; others <3:1 median:',sum(1 for x in rows if not x[3] and x[5]<3),'others <4.5 median:',sum(1 for x in rows if not x[3] and x[5]<4.5))
