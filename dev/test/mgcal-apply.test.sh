#!/bin/sh
# AG-ALL-2d2: dev/tools/mgcal_apply.py MERGES (s34 must): kinds in the code are added / overwritten, untouched kinds stay; bad codes are refused; works on a copy.
# usage: sh dev/test/mgcal-apply.test.sh   → exit 1 on any FAIL
D=$(cd "$(dirname "$0")/../.." && pwd); T=$(mktemp -d); cp "$D/dev/build/jbal2.js" "$T/b.js"; export MGCAL_BAL="$T/b.js"; F=0
ok(){ if [ "$1" = 0 ]; then echo "ok   $2"; else echo "FAIL $2"; F=1; fi; }
line(){ grep -o 'BAL.ag.mg2.cal={[^;]*};' "$T/b.js"; }
python3 "$D/dev/tools/mgcal_apply.py" "CTM-CAL dan:6.4/5@11/17/2026 co:5/5@11/17/2026" >/dev/null; L=$(line)
echo "$L" | grep -q 'dan:{b:6.4,n:5,at:"11/17/2026"}' && echo "$L" | grep -q 'co:{b:5.0' ; ok $? "1 first code: dan + co written"
python3 "$D/dev/tools/mgcal_apply.py" "CTM-CAL dan:7.2/5@11/18/2026 ve:4.1/5@11/18/2026" >/dev/null; L=$(line)
echo "$L" | grep -q 'dan:{b:7.2,n:5,at:"11/18/2026"}' && echo "$L" | grep -q 'co:{b:5.0,n:5,at:"11/17/2026"}' && echo "$L" | grep -q 've:{b:4.1' ; ok $? "2 merge: dan re-done overwritten, co untouched kept, ve added"
echo "$L" | grep -q 'd:\[-2,-1,0,1,2\],up:1,dn:4' ; ok $? "3 the other cal keys untouched"
python3 "$D/dev/tools/mgcal_apply.py" "CTM-CAL dan:12/5@11/18/2026" >/dev/null 2>&1; [ $? -ne 0 ] && [ "$(line)" = "$L" ]; ok $? "4 a base out of 0..10 is refused, nothing written"
python3 "$D/dev/tools/mgcal_apply.py" "hello" >/dev/null 2>&1; [ $? -ne 0 ]; ok $? "4 a non-CTM-CAL line is refused"
node -e "global.window={};global.BAL={ag:{mg2:{}}};eval(require('fs').readFileSync('$T/b.js','utf8').match(/BAL\.ag\.mg2\.cal=\{[^;]*\};/)[0]);if(BAL.ag.mg2.cal.k.co.b!==5)process.exit(1)"; ok $? "5 the written line is valid JS"
grep -c . "$D/dev/build/jbal2.js" >/dev/null; git -C "$D" diff --quiet -- dev/build/jbal2.js 2>/dev/null; ok $? "6 the real jbal2.js is not touched by the test"
rm -rf "$T"; exit $F
