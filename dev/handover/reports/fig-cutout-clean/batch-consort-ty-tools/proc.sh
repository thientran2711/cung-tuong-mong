#!/bin/bash
# proc.sh KEY URL  -> download master, finish, qa; appends to scratch log. KEY e.g. consort-c01-ty1-a18
S=/tmp/claude-0/-home-user-cung-tuong-mong/dad78ca2-b43f-5b5f-9eea-225524ea5f8a/scratchpad
T=/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean/tools
K=$1; mkdir -p $S/m $S/out
curl -s -o $S/m/$K.png "$2"
python3 -I - <<PY
from PIL import Image;im=Image.open("$S/m/$K.png");e=im.getchannel("A").getextrema() if im.mode=="RGBA" else None
print("MASTER",im.size,e,"ALPHA_OK" if e and e[0]==0 else "ALPHA_BAD")
PY
python3 -I $T/finish_fig.py $S/m/$K.png $K $S/out 2>&1 | grep -o "'match': [0-9.]*" 
python3 -I $T/qa_fig.py --kind fig --old img/fig-$K.webp $S/out/img/fig-$K.webp 2>&1 | tail -3 | sed "s#$S/out/img/##"
