#!/bin/bash
# mk78.sh cXX... : download t7+t8 lineups, make 4x2 grid g/q<c>.jpg (t7 row, t8 row), delete the lineups
cd "$(dirname "$0")"
for c in "$@"; do
  [ -f g/q$c.json ] && continue
  python3 need.py $c-t7 $c-t8 >/dev/null
  COLS=4 python3 -I hdg.py make q$c $c-t7-a18 $c-t7-a26 $c-t7-a36 $c-t7-a51 $c-t8-a18 $c-t8-a26 $c-t8-a36 $c-t8-a51 > g/q$c.log 2>&1 || echo "FAIL $c"
  python3 -c "import json;G=json.load(open('gen.json'));import os;[os.remove('raw/'+G['$c-'+t]+'.png') for t in ('t7','t8') if os.path.exists('raw/'+G['$c-'+t]+'.png')]"
  echo "made $c"
done
