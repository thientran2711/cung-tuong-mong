# Owner Lượt 268 shawl-PIECES test (ROOT-42): 2 small back drapes hanging behind the forearms + 2 loose front tails over the sleeves.
# pieces cut from sprite gen fHz5seNCDY by colour-unblend (keeps the gauze see-through); placements hand-picked per figure.
import sys
from PIL import Image
S=sys.argv[1]
P=[Image.open(f"{S}/piece{k}.png") for k in range(4)]   # 0,2 = drapes ; 1,3 = tails
def put(canvas,p,w,ang,cx,cy,flip=False,op=1.0):
    q=p.transpose(Image.FLIP_LEFT_RIGHT) if flip else p
    q=q.resize((w,int(q.height*w/q.width)),Image.LANCZOS).rotate(ang,expand=True,resample=Image.BICUBIC)
    if op<1: a=q.getchannel('A').point(lambda v:int(v*op)); q.putalpha(a)
    canvas.alpha_composite(q,(int(cx-q.width/2),int(cy-q.height/2)))
def comp(fig,back,front,out):
    f=Image.open(fig).convert("RGBA"); B=Image.new("RGBA",f.size,(0,0,0,0)); F=Image.new("RGBA",f.size,(0,0,0,0))
    for a in back: put(B,*a)
    for a in front: put(F,*a)
    o=Image.alpha_composite(Image.alpha_composite(B,f),F); o.save(out); return o
L=[]
# m19 t5 (left hand low at ~(420,1140), right hand raised at ~(720,900))
L.append(comp(f"{S}/fig1.png",
  back=[(P[0],330,-8,150,1060),(P[2],320,10,870,930)],
  front=[(P[1],760,-62,300,1300,False,0.9),(P[3],620,-70,820,1160,True,0.85)],
  out=sys.argv[2]))
# c20 Phi (hand with item at chest ~(560,640), other hand at sash ~(640,900), wide sleeves)
L.append(comp(f"{S}/fig2.png",
  back=[(P[0],330,-6,150,1180),(P[2],330,8,880,1180)],
  front=[(P[1],760,-65,260,1380,False,0.9),(P[3],760,65,770,1380,True,0.9)],
  out=sys.argv[3]))
v=Image.new("RGB",(2*1024+30,2304),(60,80,60))
for k,o in enumerate(L): v.paste(o,(10+k*1034,0),o)
v.resize((517,576)).save(f"{S}/shawl_v.jpg")
