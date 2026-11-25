#!/bin/bash
# usage: c.sh '{"op":"click","t":"..."}'   -> prints only lines new vs previous screen (FULL=1 for whole)
D=$(dirname "$0")
curl -s --noproxy localhost -X POST --data-binary "$1" http://localhost:9333/ > "$D/cur.txt"
echo "$1" >> "$D/actions.log"
cat "$D/cur.txt" >> "$D/transcript.txt"; echo "=====" >> "$D/transcript.txt"
if [ -n "$FULL" ] || [ ! -f "$D/prev.txt" ]; then cat "$D/cur.txt"; else
python3 -I -c "
import difflib,sys
a=open(sys.argv[1]).read().splitlines(); b=open(sys.argv[2]).read().splitlines()
for l in difflib.ndiff(a,b):
    if l.startswith('+ '): print(l[2:])
" "$D/prev.txt" "$D/cur.txt"; fi
cp "$D/cur.txt" "$D/prev.txt"
