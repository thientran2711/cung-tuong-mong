#!/usr/bin/env python3
"""nude-mass helper (N4). Usage:
  fetch:  nude_mass_sheet.py fetch cNN aNN <cut-out url>   -> img/_review/nude-mass/cNN_aNN_nude.png (prints corner alpha)
  sheet:  nude_mass_sheet.py sheet cAA cBB                 -> img/_review/nude-mass/sheet_cAA-cBB.jpg (rows people x cols a18..a65, existing files only)
Then: python3 dev/site/cdn_sync.py img/_review/nude-mass"""
import sys,urllib.request,os
from PIL import Image,ImageDraw
D="img/_review/nude-mass"; AGES=["a18","a26","a36","a51","a65"]
if sys.argv[1]=="fetch":
    c,a,u=sys.argv[2:5]; os.makedirs(D,exist_ok=True); p=f"{D}/{c}_{a}_nude.png"; urllib.request.urlretrieve(u,p)
    im=Image.open(p).convert("RGBA"); w,h=im.size; print(p,im.size,[im.getpixel(x)[3] for x in((0,0),(w-1,0),(0,h-1),(w-1,h-1))])
else:
    a,b=int(sys.argv[2][1:]),int(sys.argv[3][1:]); W,H=190,428; rows=range(a,b+1)
    sh=Image.new("RGB",(W*5,(H+16)*len(rows)),(0xD6,0xD0,0xC6)); d=ImageDraw.Draw(sh)
    for r,n in enumerate(rows):
        for i,ag in enumerate(AGES):
            p=f"{D}/c{n:02d}_{ag}_nude.png"
            d.text((i*W+4,r*(H+16)+2),f"c{n:02d} {ag}",fill=(0,0,0))
            if os.path.exists(p): t=Image.open(p).convert("RGBA").resize((W,H)); sh.paste(t,(i*W,r*(H+16)+16),t)
    sh.save(f"{D}/sheet_c{a:02d}-c{b:02d}.jpg",quality=85)
