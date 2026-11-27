#!/bin/bash
# usage: build.sh <worktree> <LIVE sha> : build_site.sh minus assets.py (assets.json = LIVE), then buildinfo vs LIVE
set -e
W=$1; L=$2; cd $W
sed -e '16d' -e "s|^R=.*|R=$W; D=\$R/dev|" -e '/buildinfo.py/d' dev/site/build_site.sh > /tmp/bs_$$.sh
git show $L:assets.json > assets.json
bash /tmp/bs_$$.sh; rm /tmp/bs_$$.sh
B=$(cat dev/index.html dev/site/swreg.js dev/site/kwait.js | sha256sum | cut -c1-12)
CTM_LIVE_REF=$L python3 dev/site/buildinfo.py "$W" "$B"
git status --short | head
