#!/bin/bash
# danh-p1: P1 before/after + P2 Tài-nghệ bot, reproducible runner (run_rep.js), one run at a time, 4 pages × 4 lives = 16 lives per run.
# builds: root/_before.html = review/danh-p1 merge f8ebd5e7 (no P1), root/_p1.html = P1 (a058c5f8). Cap 144 tuần, HHSTOP.
# arms: hs = Hành sự only; mix = full sensible bot; +tn = intn.js Tài nghệ player. intn.js is loaded in EVERY arm for the exam
# counters; __tnOff=1 turns its Tài nghệ options off in the control arms.
M=$(cd "$(dirname "$0")/.." && pwd);T=${T:-$M/../../../tmp};O=$T/out;mkdir -p $O;cd $M
mk(){ PRE="$2" MORE="indanh intn" bash pass/mkinp.sh $T/inp_$1.js >/dev/null; }
mk hs  "window.__hsOnly=1;window.__capWk=144;window.__tnOff=1;"
mk mix "window.__hsOnly=0;window.__capWk=144;window.__tnOff=1;"
mk hstn "window.__hsOnly=1;window.__capWk=144;window.__tnOff=0;"
mk mixtn "window.__hsOnly=0;window.__capWk=144;window.__tnOff=0;"
run(){ o=$O/$1.json; [ -s $o ] && [ "$(python3 -c "import json;print(len(json.load(open('$o'))))")" -ge 16 ] && { echo "skip $1"; return; }
 echo "$(date +%T) start $1"; node run_rep.js root/_$2.html sens 16 $o $T/inp_$3.js 4 $4 > $O/$1.log 2>&1; echo "$(date +%T) done $1"; }
for sd in 501 777 913; do
 run before_hs_$sd before hs $sd; run p1_hs_$sd p1 hs $sd
 run before_mix_$sd before mix $sd; run p1_mix_$sd p1 mix $sd
 run p1_hstn_$sd p1 hstn $sd; run p1_mixtn_$sd p1 mixtn $sd
done
echo ALLDONE
