#!/bin/bash
# mkage.sh FIRST LAST : make 2x2 ageing grids g/aNN.jpg (4 different a51 faces) from agequeue.txt groups FIRST..LAST (1-based)
cd "$(dirname "$0")"
mapfile -t Q < agequeue.txt
for ((n=$1; n<=$2; n++)); do
  name=$(printf "a%02d" $n); [ -f g/$name.json ] && continue
  s=(); for ((k=0;k<4;k++)); do i=$(( (n-1)*4+k )); [ $i -lt ${#Q[@]} ] && s+=("${Q[$i]}") || s+=("${Q[$(( (n-1)*4 ))]}"); done
  keys=(); for sp in "${s[@]}"; do keys+=("${sp%-*}"); done
  python3 need.py "${keys[@]}" > /dev/null
  python3 -I hdg.py make $name "${s[@]}" > g/$name.log 2>&1 && echo "made $name ${s[*]}" || echo "FAIL $name"
  python3 -c "
import json,os,sys;G=json.load(open('gen.json'))
for k in sys.argv[1:]:
  p='raw/'+G[k]+'.png'
  if os.path.exists(p): os.remove(p)" "${keys[@]}"
done
