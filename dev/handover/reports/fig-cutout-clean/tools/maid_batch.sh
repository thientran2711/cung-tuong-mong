#!/bin/bash
# usage: batch.sh sheet.jpg < lines "key<TAB>url"
cd /home/user/cung-tuong-mong; T=dev/handover/reports/fig-cutout-clean/tools; keys=()
while IFS=$'\t' read k u; do
 python3 -I -c "
import urllib.request,subprocess
subprocess.run(['curl','-s','-o','/tmp/claude-0/w/chk_$$.png','$u'])
from PIL import Image
a=Image.open('/tmp/claude-0/w/chk_$$.png').getchannel('A').getextrema() if 'A' in Image.open('/tmp/claude-0/w/chk_$$.png').mode else None
print('$k alpha',a)"
 python3 $T/maid_proc.py $k "$u" 2>&1 | grep QA | cut -c1-200 | sed 's#/tmp/claude-0/w/out/img/##'
 keys+=($k)
done
python3 $T/maid_proc.py sheet $1 "${keys[@]}"
