#!/bin/sh
# usage: dev/test/pc-tray-serve.sh <port>   (serves repo root; page = /dev/demo/pc-tray/index.html)
cd "$(dirname "$0")/../.." && exec python3 -m http.server "${1:-8123}"
