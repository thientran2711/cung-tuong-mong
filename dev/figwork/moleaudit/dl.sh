#!/bin/bash
# usage: dl.sh list ; downloads into ./ keeping key path (skips existing)
cd "$(dirname "$0")"
cat "$1" | xargs -P16 -I{} sh -c 'f="{}"; [ -s "$f" ] || { mkdir -p "$(dirname $f)"; curl -sS --retry 3 -o "$f.tmp" "https://ctm-img.victoria-tntt.workers.dev/$f" && mv "$f.tmp" "$f"; }'
