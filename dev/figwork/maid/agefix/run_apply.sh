# run_apply.sh : apply all ages.txt lines with 4 cols not yet in applied.txt
cd "$(dirname "$0")"; touch applied.txt
awk 'NF==4{print $1,$3,$4}' ages.txt | while read j g b; do grep -q "^$j$" applied.txt || echo "$j $g $b"; done > pend.txt
[ -s pend.txt ] || { echo none; exit 0; }
python3 apply.py pend.txt && cut -d' ' -f1 pend.txt >> applied.txt
