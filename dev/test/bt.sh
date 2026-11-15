#!/bin/bash
# build + serve wrapper + run dev/test/inv-origin.js: dev/test/bt.sh <WxH@dpr> <tag> [oldsave.json]  (needs a static server on :8817 at the repo root)
cd "$(dirname "$0")/../.." || exit 1
python3 dev/build/assemble.py >/dev/null || exit 1
{ printf '<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'; cat dev/index.html; } > _t.html
NODE_PATH=$(npm root -g) timeout 300 node dev/test/inv-origin.js http://localhost:8817/_t.html "$1" dev/shots/inv-origin "$2" $3 2>&1 | tail -c 2500
