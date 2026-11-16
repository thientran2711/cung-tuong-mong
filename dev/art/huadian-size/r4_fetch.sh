#!/bin/bash
# usage: fetch.sh kind(por|fig|hd/fig|tn/fig|tn/por) dest names...
B=https://ctm-img.victoria-tntt.workers.dev/img
k=$1; d=$2; shift 2
for n in "$@"; do mkdir -p $d/$(dirname $k); curl -sf --retry 3 -o "$d/$k-$n.webp" "$B/$k-$n.webp" || echo "MISS $k-$n"; done
