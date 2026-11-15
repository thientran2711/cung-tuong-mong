#!/bin/bash
# rwire.sh OLDKEY... : audit-15/11 redraw wiring. Uploads img/act-FKEY-h.webp (hgo.sh --push; FKEY per rprompt.py), then points every
# live ACTS.json entry of OLDKEY at its new key (rswap.py: K -> K-h, B-h -> B-r-h) with the corpus check (only OLD->NEW changes, 0 to none),
# pull-check, upload, re-curl LIVE-OK. Logs "OLD NEW" to rdone.txt.
set -e; H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../../.." && pwd); W=$R/tmp/wire; B=https://ctm-img.victoria-tntt.workers.dev/img; cd $R
F=$(for k in "$@"; do case $k in *-h) echo ${k%-h}-r;; *) echo $k;; esac; done)
bash $H/hgo.sh --push $F
curl -sf -A ctm "$B/ACTS.json?t=$(date +%s)" -o $W/live.json; curl -sf -A ctm "$B/_index.json?t=$(date +%s)" -o $W/index.json
python3 $H/rswap.py $W/live.json $W/index.json $W/corpus.txt $W/out.json "$@"
python3 $H/verify_acts.py $W/live.json $W/out.json $W/index.json | grep -q "missing on CDN: 0 " || { echo STOP missing; exit 1; }
python3 dev/site/cdn_sync.py --pull img/ACTS.json | tail -1; cmp -s img/ACTS.json $W/live.json || { echo STOP local-not-live; exit 1; }
cp $W/out.json img/ACTS.json; python3 dev/site/cdn_sync.py img/ACTS.json | tail -1
curl -sf -A ctm "$B/ACTS.json?t=$(date +%s)" | cmp -s - $W/out.json && echo LIVE-OK
for k in "$@"; do case $k in *-h) echo "$k ${k%-h}-r-h";; *) echo "$k $k-h";; esac; done >> $H/rdone.txt
