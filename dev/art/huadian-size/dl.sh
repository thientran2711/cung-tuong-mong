#!/bin/bash
# usage: dl.sh DIR prefix(path under img/) names...   (names without .webp)
d=$1; shift; pre=$1; shift; mkdir -p $d
printf "%s\n" "$@" | nice xargs -P2 -I{} sh -c "[ -s $d/{}.webp ] || curl -sS -f -o $d/{}.webp https://ctm-img.victoria-tntt.workers.dev/img/$pre{}.webp || echo FAIL {}"
