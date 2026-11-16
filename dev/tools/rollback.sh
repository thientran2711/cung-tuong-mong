#!/bin/bash
# ONE-STEP ROLLBACK to an earlier live build (owner OD:L1370 (e)).
# usage: bash dev/tools/rollback.sh previous|<sha|tag> [--yes]
# WHAT IT DOES (safest choice, nothing is ever lost):
#   main is NOT reset and nothing is force-pushed. A NEW commit is made on top of live main whose files are EXACTLY the files of the
#   good build (same tree: index.html, sw.js, assets.json, dev/…), message "rollback: <bad> -> <good>". main is fast-forwarded to it
#   (FF-only, under /home/user/wt/fetch.lock) and tagged live/<time>-<sha>-rollback. Every commit of the bad build stays in history
#   and on its branch.
#   SITE / CDN: GitHub Pages serves main's root, so the old index.html + sw.js are live again in ~1–2 min; sw.js goes back to the good
#   build's version, players see "Có bản mới" and reopen on the good build at the next natural break (KIT §35.2, no mid-play reload).
#   Pictures on the Cloudflare CDN are not touched (content-keyed, uploads only add files), so the old build still finds its pictures.
#   Saves: a save written by the bad build is read by the good build the same way any newer save is (old builds ignore unknown
#   fields); if the bad build changed the SAVE FORMAT, check with the owner of that branch before rolling back.
#   AFTER: the branch that broke must merge main (it will then contain the rollback = its change undone) and re-apply its fix on top
#   (git revert <rollback commit> on the branch, fix, review, go live again).
# previous = the newest live/* tag whose build differs from main; without tags, the source commit of the previous entry of the
# build line history (window.CTM_BI.h[0]) — the built commit after it is used when it is on main.
# Without --yes it prints what it would do and stops.
set -e
WANT=${1:?usage: rollback.sh previous|<sha|tag> [--yes]}; YES=$2; LOCK=/home/user/wt/fetch.lock; touch $LOCK
TOP=$(git rev-parse --show-toplevel); cd "$TOP"
flock $LOCK git fetch -q --depth=60 origin main:refs/remotes/origin/main '+refs/tags/live/*:refs/tags/live/*'
M=$(git rev-parse origin/main)
if [ "$WANT" = "previous" ]; then
  G=""
  for t in $(git for-each-ref --sort=-creatordate --format='%(refname:short)' 'refs/tags/live/*'); do
    c=$(git rev-parse "$t^{commit}"); [ "$(git rev-parse "$c^{tree}")" != "$(git rev-parse "$M^{tree}")" ] && { G=$c; break; }; done
  if [ -z "$G" ]; then
    SRC=$(git show "$M:index.html" | sed -n 's/^window\.CTM_BI=\(.*\);$/\1/p' | python3 -c 'import json,sys;b=json.loads(sys.stdin.read() or "null") or {};h=b.get("h") or [];print(h[0]["s"].rstrip("+") if h else "")')
    [ -n "$SRC" ] && G=$(git rev-list --first-parent --reverse "$SRC..$M" -- index.html 2>/dev/null | head -1)
    [ -z "$G" ] && [ -n "$SRC" ] && G=$(git rev-parse -q --verify "$SRC^{commit}")
  fi
  [ -z "$G" ] && { echo "STOP: no previous live build found (no live/* tags, no build-line history). Name the sha: rollback.sh <sha>"; exit 1; }
else G=$(git rev-parse --verify "$WANT^{commit}"); fi
git cat-file -e "$G:index.html" || { echo "STOP: ${G:0:8} has no built index.html"; exit 1; }
[ "$(git rev-parse "$G^{tree}")" = "$(git rev-parse "$M^{tree}")" ] && { echo "main already has the files of ${G:0:8}"; exit 0; }
echo "live main ${M:0:8}  ->  roll back to the files of ${G:0:8} ($(git log -1 --format='%cd %s' --date=format:'%m/%d/%Y %H:%M' "$G"))"
git diff --stat "$M" "$G" | tail -3
echo "== quickcheck on the build we roll back to"; CTM_LIVE_REF=$M bash dev/tools/quickcheck.sh "$G" || echo "WARN: quickcheck failed on ${G:0:8} too - roll back further? (continuing only with --yes)"
if [ "$YES" != "--yes" ]; then echo "dry run. Run again with --yes to fast-forward main to a rollback commit."; exit 0; fi
C=$(git commit-tree "$G^{tree}" -p "$M" -m "rollback: live ${M:0:8} -> files of ${G:0:8}" -m "dev/tools/rollback.sh; every commit of ${M:0:8} stays in history. Re-land: git revert this commit on the fixed branch.")
M2=$(git ls-remote origin refs/heads/main | cut -f1); [ "$M2" = "$M" ] || { echo "STOP: main moved to ${M2:0:8} - run again"; exit 1; }
flock $LOCK git push origin "$C:refs/heads/main"
T=live/$(date -u +%Y%m%d-%H%M)-${C:0:8}-rollback; git tag -a "$T" "$C" -m "rollback to ${G:0:8}" && flock $LOCK git push -q origin "refs/tags/$T" || true
echo "ROLLED BACK: main ${M:0:8} -> ${C:0:8} (files of ${G:0:8}) · tag $T · site back in ~1-2 min"
