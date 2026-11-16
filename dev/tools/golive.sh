#!/bin/bash
# GO LIVE one READY sha (owner OD:L1370 (a)+(c)): tier -> quickcheck -> fast-forward main -> tag -> print the build line.
# usage: bash dev/tools/golive.sh <READY sha> [--yes]        (run from your own worktree; the owner of the branch (foreman / main) runs it)
#   - FF-only: main must be an ancestor of the sha (merge origin/main into the branch, rebuild, re-review if needed, else it stops).
#   - quickcheck must PASS on that exact sha (dev/tools/quickcheck.sh). No skip switch: a FAIL means the sha does not go live.
#   - everything that touches origin runs under the shared lock /home/user/wt/fetch.lock (same discipline as the old recipe).
#   - after the push: tag live/<UTC yyyymmdd-hhmm>-<short sha> (annotated, message = the build's "what changed" line) so
#     dev/tools/rollback.sh can find the previous live build in one step. Tags never move main.
#   - BEFORE the push: when live main itself has no live/* tag yet (the very first go-live, or main was moved without this script),
#     the OLD main is tagged live/<UTC>-<short sha>-baseline first, so `rollback.sh previous` always has the build that was live before.
#   - Pages serves main's root (index.html, sw.js…): the site is live ~1–2 min after the push; players get it through the "Có bản mới" chip.
# Without --yes it stops after the checks and prints the push command it would run.
set -e
S=${1:?usage: golive.sh <READY sha> [--yes]}; YES=$2; LOCK=/home/user/wt/fetch.lock; touch $LOCK
TOP=$(git rev-parse --show-toplevel); cd "$TOP"
flock $LOCK git fetch -q --depth=30 origin "$S" main:refs/remotes/origin/main 2>/dev/null || flock $LOCK git fetch -q --depth=30 origin main:refs/remotes/origin/main
SHA=$(git rev-parse --verify "$S^{commit}"); M=$(git ls-remote origin refs/heads/main | cut -f1)
[ "$SHA" = "$M" ] && { echo "already live: main == ${SHA:0:8}"; exit 0; }
git merge-base --is-ancestor "$M" "$SHA" || { git fetch -q --deepen=200 origin main 2>/dev/null; git merge-base --is-ancestor "$M" "$SHA"; } \
  || { echo "STOP: ${SHA:0:8} does not contain live main ${M:0:8} -> merge origin/main into the branch, rebuild, check again"; exit 1; }
echo "== tier"; node dev/tools/tier.js "$SHA" --base "$M" | head -40 || true
echo "== quickcheck"; CTM_LIVE_REF=$M bash dev/tools/quickcheck.sh "$SHA" || { echo "STOP: quickcheck FAILED on ${SHA:0:8} - not going live"; exit 1; }
LINE=$(git show "$SHA:index.html" | sed -n 's/^window\.CTM_BI=\(.*\);$/\1/p' | python3 -c 'import json,sys;b=json.loads(sys.stdin.read() or "null") or {};print(b.get("c",""))' 2>/dev/null || true)
TAG=live/$(date -u +%Y%m%d-%H%M%S)-${SHA:0:8}
if [ "$YES" != "--yes" ]; then echo "checks OK. To go live run again with --yes  (pushes ${SHA:0:8} -> main, tag $TAG)"; exit 0; fi
M2=$(git ls-remote origin refs/heads/main | cut -f1); [ "$M2" = "$M" ] || { echo "STOP: main moved to ${M2:0:8} while checking - merge it and run again"; exit 1; }
flock $LOCK git fetch -q origin '+refs/tags/live/*:refs/tags/live/*' 2>/dev/null || true
if [ -z "$(git tag --points-at "$M" -l 'live/*')" ]; then   # tag the build that is live NOW before replacing it (rollback target)
  BT=live/$(date -u +%Y%m%d-%H%M%S)-${M:0:8}-baseline
  git tag -a "$BT" "$M" -m "baseline: live before ${SHA:0:8}" && flock $LOCK git push -q origin "refs/tags/$BT" \
    || { echo "STOP: could not push baseline tag $BT for live main ${M:0:8} (rollback would have no target) - nothing pushed"; exit 1; }
  echo "baseline tag $BT -> ${M:0:8} (the build live before this one)"
fi
flock $LOCK git push origin "$SHA:refs/heads/main"      # plain push = fast-forward only
git tag -a "$TAG" "$SHA" -m "${LINE:-live ${SHA:0:8}}" && flock $LOCK git push -q origin "refs/tags/$TAG" || echo "WARN: tag push failed (rollback falls back to main's history)"
echo "LIVE ${SHA:0:8} · tag $TAG · what changed: ${LINE:-?} · site updates in ~1-2 min (GitHub Pages)"
