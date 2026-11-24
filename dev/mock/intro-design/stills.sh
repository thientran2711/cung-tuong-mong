#!/bin/bash
cd /home/user/wt/intro-design; mkdir -p stills
for c in "$@"; do for d in fold ipad; do
 P="22%,42%,62%,88%"; [ $c = A1 -o $c = A2 ] && P="23%,38%,54%,88%"
 node render.js $c $d stills "" $P >/dev/null 2>&1
 i=1; for f in $(ls stills/$c-$d-[0-9]*.png | sort -t- -k3 -n); do python3 -I -c "
from PIL import Image;im=Image.open('$f').convert('RGB');im.save('stills/$c-$d-s$i.jpg',quality=84)"; rm $f; i=$((i+1)); done
done; done
