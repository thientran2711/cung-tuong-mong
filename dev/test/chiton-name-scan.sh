#!/bin/bash
# chiton-name scan (owner 21/11): the Emperor is shown as a NAME only through empNm() = «Hoàng thượng»; empEra() = niên hiệu detail;
# empName() («Hoàng thượng niên hiệu X») is allowed ONLY inside story sentences. Prints every empName( use and fails if one sits in a name slot.
cd "$(dirname "$0")/../build" || exit 1
echo "== empName( uses (must all be story sentences)"; grep -n "empName(" j*.js | grep -v "^j1.js:20[0-9]:.*function emp" | sed -E 's/^([^:]+:[0-9]+):.*(.{50}empName\(\).{40}).*/\1  …\2…/'
BAD=$(grep -n "name:empName()\|,empName(),\|t:empName()\|en=empName()" j*.js | grep -v "^all.js" | wc -l); echo "name-slot uses of empName(): $BAD"
echo "== niên hiệu as a name/heading (must be 0):"; grep -c 'Niên hiệu "+\|"Niên hiệu "' j65.js
[ "$BAD" = 0 ]
