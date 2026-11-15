#!/bin/bash
# hgo.sh KEY=ID ... : act-picture pipeline: transcript url (trxurl.py) -> hfetch.py (img/act-KEY-h.webp) -> sheet $PREV/hsheet.jpg
# after looking at the sheet: hgo.sh --push KEY ... uploads img/act-KEY-h.webp to the CDN and deletes the local copies.
H=$(cd "$(dirname "$0")" && pwd); R=$(cd "$H/../../.." && pwd)
if [ "$1" = --push ]; then shift; cd "$R" && python3 dev/site/cdn_sync.py $(for k in "$@"; do echo img/act-$k-h.webp; done) 2>&1 | tail -1 && for k in "$@"; do rm -f img/act-$k-h.webp; done; exit; fi
python3 "$H/trxurl.py" "$@" | python3 "$H/hfetch.py" && python3 "$H/sheet.py" "$PREV/hsheet.jpg" $(for a in "$@"; do echo $R/img/act-${a%%=*}-h.webp; done)
