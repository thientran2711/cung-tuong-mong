#!/bin/bash
# dgo.sh KEY=ID ... : banner pipeline: transcript url -> fetchd.py -> contact sheet $PREV/sheet.jpg (TRX, PREV env as in trxurl.py/fetchd.py)
# after looking at the sheet: dgo.sh --push KEY ... uploads img/ev-KEY.webp to the CDN and deletes the local copies.
H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../../.." && pwd)
if [ "$1" = --push ]; then shift; cd "$R" && python3 dev/site/cdn_sync.py $(for k in "$@"; do echo img/ev-$k.webp; done) 2>&1 | tail -1 && for k in "$@"; do rm -f img/ev-$k.webp "$PREV/ev-$k.jpg"; done; exit; fi
python3 "$H/trxurl.py" "$@" | python3 "$H/fetchd.py" && python3 "$H/dsheet.py" "$PREV/sheet.jpg" 4 $(for a in "$@"; do echo ${a%%=*}; done)
