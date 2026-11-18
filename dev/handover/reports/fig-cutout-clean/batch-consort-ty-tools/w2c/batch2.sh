#!/bin/bash
# batch.sh LIST.tsv SHEET.jpg  (LIST lines: key<TAB>url). Runs proc2.sh for all in parallel, prints compact result per key, builds ONE sheet.
D=/tmp/claude-0/-home-user-cung-tuong-mong/45013e47-a4be-59c1-97d1-90df001c483f/scratchpad; cd /home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean
keys=()
while IFS=$'\t' read -r k u; do [ -z "$k" ] && continue; keys+=("$k"); $D/proc2.sh "$k" "$u" > /tmp/proc-$k.txt 2>&1 & done < "$1"
wait
for k in "${keys[@]}"; do echo "$k: $(grep -o 'ALPHA_[A-Z]*' /tmp/proc-$k.txt) $(grep -o "match': [0-9.]*" /tmp/proc-$k.txt) $(grep -E '^(PASS|WARN|FAIL)' /tmp/proc-$k.txt | sed 's/ [0-9]*x[0-9]* /: /;s/(target.*//' | cut -c1-110)"; done
python3 $D/sheet2.py "$2" "${keys[@]}"
