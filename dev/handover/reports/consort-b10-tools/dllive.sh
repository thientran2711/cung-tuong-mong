cid=$1
D=/home/user/wt/w34-work/$cid/live
mkdir -p $D
for k in 1 2 3 4 5 6 7 8; do curl -sS -o $D/t$k.webp https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-$cid-t$k-a18.webp & done
wait
python3 - <<PY
from PIL import Image
ims=[Image.open('$D/t%d.webp'%k).convert('RGBA') for k in range(1,9)]
print([i.size for i in ims])
h=700;rs=[i.resize((int(i.width*h/i.height),h)) for i in ims];W=sum(r.width for r in rs)
s=Image.new('RGB',(W,h),(235,225,205));x=0
for r in rs: s.paste(r,(x,0),r);x+=r.width
s.save('/home/user/wt/w34-work/$cid/live_row.jpg',quality=88)
PY
