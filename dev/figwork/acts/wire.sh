#!/bin/bash
# wire.sh N : wire every act picture now on the CDN into the live ACTS.json (mergepatch), with the approval checks; N = patch record number.
# Stops (no upload) unless 0 keys are missing in the live _index and 0 corpus lines lose a picture. Needs tmp/wire/corpus.txt (see PROGRESS).
set -e; H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../../.." && pwd); W=$R/tmp/wire; cd $W; B=https://ctm-img.victoria-tntt.workers.dev/img
curl -sf -A ctm "$B/ACTS.json?t=$(date +%s)" -o live.json; curl -sf -A ctm "$B/_index.json?t=$(date +%s)" -o index.json
python3 $H/mergepatch.py live.json index.json patch.json out.json corpus.txt | tail -1
V=$(python3 $H/verify_acts.py live.json out.json index.json); echo "$V"; echo "$V" | grep -q "missing on CDN: 0 " || { echo STOP missing; exit 1; }
C=$(python3 $H/corpus_diff.py live.json out.json corpus.txt | head -1); echo "$C"; echo "$C" | grep -q "lost picture 0$" || { echo STOP lost; exit 1; }
cd $R; python3 dev/site/cdn_sync.py --pull img/ACTS.json | tail -1; cmp -s img/ACTS.json $W/live.json || { echo STOP local-not-live; exit 1; }
cp $W/out.json img/ACTS.json; python3 dev/site/cdn_sync.py img/ACTS.json | tail -1
curl -sf -A ctm "$B/ACTS.json?t=$(date +%s)" | cmp -s - $W/out.json && echo LIVE-OK
cp $W/patch.json $H/ACTS_merge_patch$1.json
python3 - "$H" <<'P'
import json,sys; H=sys.argv[1]; P=json.load(open(H+'/../../../tmp/wire/patch.json'))
ks=[]
for k,rx,s in P['held']:
    if k not in ks and not k.startswith('scene:'): ks.append(k)
open(H+'/merge_held_keys.txt','w').write(str(len(ks))+'\n'+' '.join(ks)+'\n'); print('queue left',len(ks))
P
