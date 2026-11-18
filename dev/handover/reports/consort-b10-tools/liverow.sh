#!/bin/bash
W=${W:-/path/to/scratch}  # set to your scratch dir
c=$1; mkdir -p $W/$c/live $W/$c/v; cd $W/$c/live
for t in 1 2 3 4 5 6 7 8; do curl -sS -o t$t.webp https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-$c-t$t-a36.webp & done; wait
python3 -c "
from PIL import Image
ims=[Image.open(f't{k}.webp').convert('RGBA') for k in range(1,9)]
h=620;c=[i.resize((int(i.width*h/i.height),h)) for i in ims]
S=Image.new('RGB',(sum(x.width for x in c),h),(235,225,205));x=0
for i in c:S.paste(i,(x,0),i);x+=i.width
S=S.resize((1400,int(S.height*1400/S.width)));S.save('../live_row.jpg',quality=82);print(S.size)"
