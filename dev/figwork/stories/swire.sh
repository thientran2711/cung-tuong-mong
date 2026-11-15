#!/bin/bash
# swire.sh arc:key ... : upload img/st-<arc>-<key>.webp, then add stories[arc].files[key] to the LIVE EVENTS.json (pull-check, edit, push,
# re-curl verify, check every wired file is in the live _index), delete local copies. Data-only wiring: j89.js stArtOf reads stories[arc].files.
set -e; H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../../.." && pwd); W=$R/tmp/wire; B=https://ctm-img.victoria-tntt.workers.dev/img; mkdir -p $W; cd $R
F=$(for ak in "$@"; do a=${ak%%:*}; k=${ak#*:}; [ "$k" = "$ak" ] && k=bia; echo img/st-${a//_/-}-$k.webp; done)
python3 dev/site/cdn_sync.py $F | tail -1
curl -sf -A ctm "$B/EVENTS.json?t=$(date +%s)" -o $W/events.json
python3 dev/site/cdn_sync.py --pull img/EVENTS.json | tail -1; cmp -s img/EVENTS.json $W/events.json || { echo STOP local-not-live; exit 1; }
python3 - "$W/events.json" "$W/events_out.json" "$@" <<'PY'
import json,sys; J=json.load(open(sys.argv[1])); S=J['stories']
for ak in sys.argv[3:]:
    a,k=(ak.split(':')+['bia'])[:2]
    if a not in S: print('STOP no arc',a); sys.exit(1)
    S[a].setdefault('files',{})[k]='img/st-%s-%s.webp'%(a.replace('_','-'),k)
json.dump(J,open(sys.argv[2],'w'),ensure_ascii=False,indent=1); print('wired',len(sys.argv)-3)
PY
cp $W/events_out.json img/EVENTS.json; python3 dev/site/cdn_sync.py img/EVENTS.json | tail -1
curl -sf -A ctm "$B/EVENTS.json?t=$(date +%s)" | cmp -s - $W/events_out.json && echo LIVE-OK
curl -sf -A ctm "$B/_index.json?t=$(date +%s)" -o $W/index.json
python3 - $W/index.json $F <<'PY'
import json,sys; I={f[0] for f in json.load(open(sys.argv[1]))['files']}
miss=[f for f in sys.argv[2:] if f not in I]; print('missing in live _index:',len(miss),miss)
PY
rm -f $F; for f in $F; do rm -f "$PREV/$(basename ${f%.webp}).jpg"; done
