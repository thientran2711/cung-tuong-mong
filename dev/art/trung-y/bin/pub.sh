#!/bin/bash
# pub.sh ROLE-ID... : ty.py publish -> cdn_sync (fig+por+FIGURES-ty.json) -> delete local copies (img/ + out/) once the CDN matches
R=/home/user/wt/trung-y; T=$R/.tywork; cd $R
python3 dev/site/cdn_sync.py --pull img/FIGURES-ty.json | tail -1
python3 dev/art/trung-y/ty.py publish "$@" || exit 1
files=""; for x in "$@"; do files="$files $(ls img/fig-$x-ty*.webp img/por-$x-ty*.webp)"; done
for i in 1 2 3; do python3 dev/site/cdn_sync.py $files img/FIGURES-ty.json 2>&1 | tail -2 && break; sleep 10; done
python3 dev/site/cdn_sync.py --check $files img/FIGURES-ty.json > $T/check.log 2>&1 && { rm -f $files; for x in "$@"; do rm -f $T/out/*-$x-ty*.webp; done; echo "uploaded+cleaned: $*"; echo "$*" >> $T/published.txt; } || { echo "CHECK FAILED"; tail -5 $T/check.log; }
