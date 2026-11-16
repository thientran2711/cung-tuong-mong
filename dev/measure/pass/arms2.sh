#!/bin/bash
# after arms.sh (pid in tmp/arms.pid): random bot Hành-sự-only + mixed, before/after (seed 501); then sensible Hành-sự-only + mixed with seed 777
cd /home/user/wt/danhbal/dev/measure;P=$(cat ../../tmp/arms.pid);while kill -0 $P 2>/dev/null;do sleep 30;done
PRE="window.__hsOnly=0;window.__capWk=144;" MORE=indanh bash pass/mkinp.sh $PWD/../../tmp/inp_rmix.js >/dev/null
run(){ o=../../tmp/out/$1.json; echo "$(date +%T) start $1"; node run_par.js root/_$2.html $3 48 $o ../../tmp/$4 4 $5 > ../../tmp/out/$1.log 2>&1; echo "$(date +%T) done $1"; }
run after_rhs_501 after rand inp_rhs.js 501; run before_rhs_501 before rand inp_rhs.js 501
run after_rmix_501 after rand inp_rmix.js 501; run before_rmix_501 before rand inp_rmix.js 501
run after_hs_777 after sens inp_hs.js 777; run before_hs_777 before sens inp_hs.js 777
run after_mix_777 after sens inp_mix.js 777; run before_mix_777 before sens inp_mix.js 777
run after_mix_501 after sens inp_mix.js 501
run after_hsch_501 new sens inp_hsch.js 501
run after_hsch3_501 new sens inp_hsch3.js 501
