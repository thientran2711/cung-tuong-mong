# run.sh NAME... : download edits (id = 3rd field in log.txt), paste back, check sheets c/NAME.jpg; pairs -> c/P_NAME1_NAME2.jpg
cd /tmp/claude-0/-home-user-cung-tuong-mong/a5fd33d3-7f41-5bff-b6da-0b51bb3f7f98/scratchpad/agC
mkdir -p c
args=""; for n in "$@"; do args="$args e/$n.png=$(awk -v n=$n '$1==n{x=$3}END{print x}' log.txt)"; done
python3 tx.py dl $args | grep -v "^ok"
for n in "$@"; do
  [ -f e/$n.png ] || { echo "MISSING $n"; continue; }
  python3 ag.py paste $n | awk '{if($3+0>3||$3+0<-3||$4+0>3||$4+0<-3)print "SHIFT",$0}'
  sets=$(python3 -c "import json;print(' '.join(dict.fromkeys(m['file'][9:-9] for m in json.load(open('g/$n.json')))))")
  python3 ag.py chk c/$n.jpg $sets >/dev/null
done
python3 - "$@" <<'E'
import sys
from PIL import Image
n=sys.argv[1:]
for i in range(0,len(n),2):
    ims=[Image.open(f"c/{x}.jpg") for x in n[i:i+2]]
    w=sum(im.width for im in ims)+10; h=max(im.height for im in ims)
    G=Image.new("RGB",(w,h),(255,255,255)); x=0
    for im in ims: G.paste(im,(x,0)); x+=im.width+10
    G=G.resize((int(w*0.72),int(h*0.72)),Image.LANCZOS); p=f"c/P_{'_'.join(n[i:i+2])}.jpg"; G.save(p,quality=88); print(p)
E
