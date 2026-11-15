#!/bin/bash
# Rebuild dev/index.html and the root site. Kept for old instructions: same as build_site.sh (sw.js from sw.tpl.js, content hash).
set -e
exec bash "$(cd "$(dirname "$0")" && pwd)/build_site.sh" "$@"
