#!/bin/bash
W=${W:-/path/to/scratch}  # set to your scratch dir
c=$1; cd $W/$c
python3 /home/user/cung-tuong-mong/dev/handover/reports/consort-b10-tools/sheet2.py v sheet.jpg $c >/dev/null
python3 -c "
from PIL import Image
im=Image.open('sheet.jpg');w,h=im.size
for n,box in (('a',(0,0,w//2,h)),('b',(w//2,0,w,h))):
    c=im.crop(box);c.resize((int(c.width*1400/c.height),1400)).save(f's_{n}.jpg',quality=85)"
