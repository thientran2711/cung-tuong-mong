#!/bin/bash
# Build the standalone PWA site for Cung Tường Mộng at the repo root (index.html, sw.js, assets.json). usage: bash dev/site/make_site.sh
# The old scratchpad version (fixed paths, sw.js 'ctm-<timestamp>' cache-first) is gone: it left phones and the home-screen app on old
# builds. Every build path now goes through ONE script, build_site.sh, which writes sw.js from sw.tpl.js with the build's content hash and
# inlines swreg.js (new-build check on open / return to the foreground). Manifest, icons and .nojekyll are committed files.
set -e
exec bash "$(cd "$(dirname "$0")" && pwd)/build_site.sh" "$@"
