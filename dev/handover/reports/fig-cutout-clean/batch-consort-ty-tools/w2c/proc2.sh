#!/bin/bash
# proc.sh KEY URL  -> download master, finish, qa; appends to scratch log. KEY e.g. consort-c01-ty1-a18
S=/tmp/claude-0/-home-user-cung-tuong-mong/45013e47-a4be-59c1-97d1-90df001c483f/scratchpad
T=/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/tools
export FORCE_HD=1 HD_NATIVE=1; K=$1; mkdir -p $S/m $S/out
curl -s -o /tmp/claude-0/-home-user-cung-tuong-mong/45013e47-a4be-59c1-97d1-90df001c483f/scratchpad/old/fig-$K.webp https://ctm-img.victoria-tntt.workers.dev/img/fig-$K.webp; curl -s -o $S/m/$K.png "$2"
python3 -I - <<PY
from PIL import Image;im=Image.open("$S/m/$K.png");e=im.getchannel("A").getextrema() if im.mode=="RGBA" else None
print("MASTER",im.size,e,"ALPHA_OK" if e and e[0]==0 else "ALPHA_BAD")
PY
python3 -I $T/fillholes.py $S/m/$K.png >/dev/null 2>&1
python3 -I $T/finish_fig.py $S/m/$K.png $K $S/out 2>&1 | grep -o "'match': [0-9.]*" 
python3 -I $T/qa_fig.py --kind fig --old /tmp/claude-0/-home-user-cung-tuong-mong/45013e47-a4be-59c1-97d1-90df001c483f/scratchpad/old/fig-$K.webp $S/out/img/fig-$K.webp 2>&1 | tail -3 | sed "s#$S/out/img/##"
