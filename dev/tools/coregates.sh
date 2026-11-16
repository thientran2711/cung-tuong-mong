#!/bin/bash
# CORE GATES (owner 16/11 ~20:32Z s23 "CO-OP FIRST" + OD:L1267 ONE CORE): the two shared stores — ONE CORE (every rule number in BAL) and the
# KIT (every visual part) — and the co-op one world are checked on every go-live. Called by dev/tools/quickcheck.sh after the build.
# usage: bash dev/tools/coregates.sh <worktree with the build> <live sha|""> <out dir>      exit 0 = PASS, 1 = FAIL; last line = summary
#   G1 one-core-guard (static, ~1 s): no BAL key set twice, no typed core text, no NEW inline rule number vs the sha's frozen list; and the sha's
#      frozen list may not be LONGER than the live one (a branch cannot pass by growing it).
#   G2 rules-one-source (browser, ~10 s, Fold): shown number == checked rule; ONE CORE perturbation; old save loads.
#   G3 kit-conform (browser, ~75 s, Fold): every dialog built from a kit frame template; no loose floats over the tabs.
#   G4 hooks: every dev/tools/quickcheck.d/*.sh (sorted) runs with env QC_WT QC_URL QC_OLD_URL QC_OUT QC_KIT; exit != 0 = FAIL.
#      The co-op one-world probe (review/coop-one-world) plugs in here as quickcheck.d/50-coop-one-world.sh.
# Skip (coordinator only, never for a go-live): QC_SKIP_GATES=G2,G3
WT=$1; LIVE=$2; OUT=$3; KIT=$(cd "$(dirname "$0")/../.." && pwd); mkdir -p "$OUT"; FAILS=(); T0=$(date +%s)
skip(){ [[ ",${QC_SKIP_GATES}," == *",$1,"* ]]; }
# G1
GB=$WT/dev/test/one-core-baseline.json
if [ ! -f "$GB" ]; then FAILS+=("G1 no frozen list dev/test/one-core-baseline.json in the sha"); else
  if ! OC_BUILD=$WT/dev/build OC_BASE=$GB node "$KIT/dev/test/one-core-guard.js" > "$OUT/g1-guard.txt" 2>&1; then
    head -14 "$OUT/g1-guard.txt"; FAILS+=("G1 one-core-guard ($OUT/g1-guard.txt)"); fi
  if [ -n "$LIVE" ] && git -C "$WT" cat-file -e "$LIVE:dev/test/one-core-baseline.json" 2>/dev/null; then
    LT=$(git -C "$WT" show "$LIVE:dev/test/one-core-baseline.json" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).total))')
    ST=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).total)' "$GB")
    if [ "$ST" -gt "$LT" ]; then FAILS+=("G1 frozen list grew $LT -> $ST (move the numbers into BAL; only the coordinator may grow it)"); fi
  fi
fi
# a local server for the browser gates: _aa.html = new build, _old.html = live build
PORT=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')
cp "$WT/index.html" "$WT/_aa.html"; OLDOK=""
if [ -n "$LIVE" ] && git -C "$WT" show "$LIVE:index.html" > "$WT/_old.html" 2>/dev/null; then OLDOK=1; fi
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$WT" > /dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -f "$WT/_aa.html" "$WT/_old.html"' EXIT
for i in $(seq 1 50); do curl -s -o /dev/null "http://127.0.0.1:$PORT/_aa.html" && break; sleep 0.1; done
U=http://127.0.0.1:$PORT; OLDU=$U/_old.html; [ -z "$OLDOK" ] && OLDU=$U/_aa.html
# G2
if ! skip G2; then
  if ! OLD_URL=$OLDU timeout 300 node "$KIT/dev/test/rules-one-source.js" "$U" 755x1000@2 > "$OUT/g2-rules.json" 2> "$OUT/g2-rules.err"; then FAILS+=("G2 rules-one-source crashed ($OUT/g2-rules.err)"); else
    V=$(node -e 'const j=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));const R=j.R,b=[];if(R.old&&R.old.ok!==true)b.push("old save "+JSON.stringify(R.old));if(R.rules&&R.rules.bad.length)b.push("rules "+JSON.stringify(R.rules.bad.slice(0,3)));if(R.core&&R.core.bad.length)b.push("core "+JSON.stringify(R.core.bad.slice(0,3)));if(R.ui&&R.ui.ovf)b.push("overflow");if(j.errs.length)b.push("page errors "+JSON.stringify(j.errs.slice(0,3)));console.log(b.join(" · "))' "$OUT/g2-rules.json")
    [ -n "$V" ] && FAILS+=("G2 rules-one-source: $V")
  fi
fi
# G3
if ! skip G3; then
  timeout 400 node "$KIT/dev/test/kit-conform.js" "$U/_aa.html" "$OUT/g3-kit.json" 755x1000 > "$OUT/g3-kit.txt" 2>&1 || { tail -6 "$OUT/g3-kit.txt"; FAILS+=("G3 kit-conform: a dialog not built from a kit frame, or a float over the tabs ($OUT/g3-kit.txt)"); }
fi
# G4 hooks
for h in $(ls "$KIT/dev/tools/quickcheck.d/"*.sh 2>/dev/null | sort); do
  n=$(basename "$h" .sh)
  QC_WT=$WT QC_URL=$U/_aa.html QC_OLD_URL=$OLDU QC_OUT=$OUT QC_KIT=$KIT timeout 600 bash "$h" > "$OUT/g4-$n.txt" 2>&1 || { tail -6 "$OUT/g4-$n.txt"; FAILS+=("G4 $n ($OUT/g4-$n.txt)"); }
done
S=$(( $(date +%s)-T0 ))
if [ ${#FAILS[@]} -gt 0 ]; then printf '  %s\n' "${FAILS[@]}"; echo "CORE GATES FAIL · ${FAILS[0]} · ${S} s"; exit 1; fi
echo "CORE GATES PASS · one-core-guard · rules-one-source · kit-conform · hooks $(ls "$KIT/dev/tools/quickcheck.d/"*.sh 2>/dev/null | wc -l) · ${S} s"
