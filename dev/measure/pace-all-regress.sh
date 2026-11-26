#!/bin/bash
# review/pace-all regression runner: every dev/test/*.js listed in <list> against ONE built page, P at a time.
# usage: bash dev/measure/pace-all-regress.sh <page.html> <list> <outfile> [P=3]
# each line of <outfile>: test <TAB> exit code <TAB> last two output lines. Run it on the LIVE build and on the branch build; only differences matter.
H=$(readlink -f "$1");L=$(readlink -f "$2");OUT=$(readlink -f "$3");P=${4:-3};: > "$OUT"
cd "$(dirname "$0")/../.."
one(){ f=$1;H=$2;OUT=$3;t=$(basename $f);tmp=$(mktemp)
  if grep -q -E "path\.resolve\(|'file://'\+|\"file://\"\+|readFileSync\(process\.argv\[2\]" $f; then A=$H; else A="file://$H"; fi
  timeout 300 node $f "$A" > $tmp 2>&1; e=$?; r=$(tail -2 $tmp | tr '\n\t' '  ' | cut -c1-220); rm -f $tmp; printf '%s\t%s\t%s\n' "$t" "$e" "$r" >> "$OUT"; }
export -f one
xargs -P "$P" -I{} bash -c 'one "$@"' _ {} "$H" "$OUT" < "$L"
sort -o "$OUT" "$OUT"
