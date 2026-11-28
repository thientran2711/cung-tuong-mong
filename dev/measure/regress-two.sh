#!/bin/bash
# review/oan-pace-2 (RV-163C R4): run every test of <list> in TWO checkouts with NO argument (each test's own default page = that tree's
# dev/index.html / index.html, so tests that take a URL, a shots dir or numbers run the way they were written), P at a time per tree.
# usage: bash dev/measure/regress-two.sh <treeA> <treeB> <list> <out.tsv> [P=2] [timeout s=420]
A=$(readlink -f "$1");B=$(readlink -f "$2");L=$(readlink -f "$3");OUT=$(readlink -f "$4");P=${5:-2};T=${6:-420}
one(){ tree=$1;f=$2;T=$3;tmp=$(mktemp);(cd "$tree" && timeout $T node "$f" > $tmp 2>&1);e=$?;r=$(grep -E 'FAIL|PASS|ALL|ok ' $tmp | tail -2 | tr '\n\t' '  ' | cut -c1-200);rm -f $tmp;printf '%s\t%s\t%s\n' "$(basename $f)" "$e" "$r"; }
export -f one
run(){ xargs -P "$P" -I{} bash -c 'one "$@"' _ "$1" {} "$T" < "$L" | sort > "$2"; }
run "$A" "$OUT.A" & run "$B" "$OUT.B" & wait
join -t $'\t' -j1 "$OUT.A" "$OUT.B" | awk -F'\t' 'BEGIN{print "test\texitA\texitB\tsame\tlastA\tlastB"}{print $1"\t"$2"\t"$4"\t"($2==$4?"=":"DIFF")"\t"$3"\t"$5}' > "$OUT"
echo "tests $(($(wc -l < "$OUT")-1)) · DIFF $(grep -c 'DIFF' "$OUT")"
