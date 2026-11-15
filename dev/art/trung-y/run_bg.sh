#!/bin/bash
# Background pipeline for the trung y art (work dir = <repo>/.tywork, NOT the shared scratchpad: another session wiped it once).
#   bash dev/art/trung-y/run_bg.sh       # starts: 1 zip fetcher + 2 cut workers (rembg), all looping until killed
# .tywork/zips.txt: "<tag> <zip url>" lines (projects_download_zip of each batch's 48 gens, valid 24 h);
# dev/art/trung-y/bg.txt: "role id tier genId -" lines (runs.py). Needs: pip install "rembg[cpu]==2.0.67";
# alpha-holes.py: git show origin/review/scene-light:dev/art/alpha-holes.py > .tywork/alpha-holes.py
R=$(cd "$(dirname "$0")/../../.." && pwd); T=$R/.tywork; mkdir -p $T/zip $T/out; touch $T/fetched.txt $T/zips.txt
fetch(){ while true; do
  while read -r tag url; do grep -qx "$tag" $T/fetched.txt && continue
    while true; do n=$(ls $T/zip | wc -l); free=$(df --output=avail -k $T | tail -1); [ "$n" -lt 25 ] && [ "$free" -gt 1500000 ] && break; sleep 30; done
    curl -sS --retry 5 -o $T/zip/z.zip "$url" && (cd $T/zip && unzip -o -q z.zip; rm -f z.zip) && echo "$tag" >> $T/fetched.txt
  done < $T/zips.txt; sleep 60; done; }
work(){ while true; do TY_PART=$1 python3 $R/dev/art/trung-y/ty.py proc >> $T/proc$2.log 2>&1; sleep 45; done; }
fetch > $T/fetcher.log 2>&1 &
work 0/2 0 & work 1/2 1 &
echo "started (logs in $T)"
