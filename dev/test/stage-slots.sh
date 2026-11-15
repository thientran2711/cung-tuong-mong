#!/bin/bash
# build dev/index.html + a test page _t.html at the repo root, then run dev/test/stage-slots.js
# usage: dev/test/stage-slots.sh <WxH@dpr> <tag> [port]   (needs a static server at the repo root on <port>, default 8851; root index.html = main = old save)
cd "$(dirname "$0")/../.." || exit 1
P=${3:-8851}
if [ -z "$NOBUILD" ]; then python3 dev/build/assemble.py >/dev/null || exit 1
{ printf '<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'; cat dev/index.html; } > _t.html; fi
NODE_PATH=${NODE_PATH:-/opt/node-tools/node_modules} timeout 900 node dev/test/stage-slots.js http://localhost:$P/${PAGE:-_t.html} "$1" dev/shots/stage-slots "$2" ${OLD:+http://localhost:$P/index.html}
