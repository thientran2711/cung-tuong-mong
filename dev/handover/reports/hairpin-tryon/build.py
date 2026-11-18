import json, numpy as np
from PIL import Image, ImageFilter
D='/tmp/claude-0/s/'; O=D+'out/'
fig=Image.open(D+'figB_cut.png').convert('RGBA')
# ---- full-body figure, headroom, 0.5 scale
X0,X1,Y0,Y1=380,1620,-520,3072
can=Image.new('RGBA',(X1-X0,Y1-Y0),(0,0,0,0)); can.alpha_composite(fig.crop((X0,0,X1,3072)),(0,-Y0))
can.resize((can.width//2,can.height//2),Image.LANCZOS).save(O+'figure_full.webp',quality=88,method=6)
# ---- head crop at full-res
HX0,HX1,HY0,HY1=560,1500,-520,820
head=Image.new('RGBA',(HX1-HX0,HY1-HY0),(0,0,0,0)); head.alpha_composite(fig.crop((HX0,0,HX1,HY1)),(0,-HY0))
head.save(O+'figure_head.webp',quality=90,method=6)
# ---- hair-front mask (fig coords): dark pixels of hair, excluding face features
a=np.array(fig).astype(float); rgb=a[...,:3]; al=a[...,3]/255
lum=rgb@[.299,.587,.114]
H=np.zeros(lum.shape)
soft=np.clip((150-lum)/35,0,1)*al
yy,xx=np.mgrid[0:lum.shape[0],0:lum.shape[1]]
box=(xx>=840)&(xx<=1320)&(yy<=640)
face=(xx>=945)&(xx<=1165)&(yy>=290)
# fringe strands near the forehead sides are kept: only exclude eyes/lips zone
H=soft*box*(~face)
# blue-ish eye/brow darks excluded by 'face' rect; skin below hairline is light so excluded by lum
hf=np.zeros(lum.shape+(4,),np.uint8); hf[...,:3]=rgb.astype(np.uint8); hf[...,3]=(H*255).astype(np.uint8)
hfi=Image.fromarray(hf,'RGBA')
hfi_c=Image.new('RGBA',head.size,(0,0,0,0)); hfi_c.alpha_composite(hfi.crop((HX0,0,HX1,HY1)),(0,-HY0))
hfi_c.save(O+'hair_front.webp',quality=92,method=6)
# debug preview
bg=Image.new('RGBA',head.size,(200,230,200,255)); bg.alpha_composite(hfi_c); bg.convert('RGB').save(D+'hf_dbg.jpg',quality=85)
print('head crop',head.size,'full',can.size)
