#!/bin/bash
# ONE-STEP ROLLBACK to an earlier live build (owner OD:L1370 (e)).
# usage: bash dev/tools/rollback.sh previous|<sha|tag> [--yes] [--known-live]
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
# previous = the build that was live before the one now on main:
#   1. the newest live/* tag that is an ANCESTOR of main, whose files differ from main, and that was not itself rolled away
#      (a "rollback: live <bad> -> ..." commit on main marks <bad> as rolled away, so a second `previous` goes one build further
#      back instead of toggling forward to the bad build again). golive.sh tags the old main (…-baseline) before its first push,
#      so there is always a tag after the first go-live.
#   2. no such tag: the live build recorded in main's own build line (window.CTM_BI.h[0].s = what was live when this build was made),
#      only if it is an ancestor of main.
#   3. else STOP and ask for a sha.
# SAFETY (any target, also an explicit <sha|tag>): (1) the target must be an ANCESTOR of live main (git merge-base --is-ancestor),
# else STOP; (2) it must be a KNOWN LIVE BUILD: a live/* tag, or listed in main's build line (CTM_BI.h = the last 10 live builds).
# A branch commit is an ancestor of main too once the branch went live, but it never was live itself and does not contain what
# main had before (go-live review r1: 126 files / 4339 lines lost) -> refused. --known-live overrides (2) only, for an old main
# from before the build line existed, when you KNOW it was live; (1) is never overridden. main is never reset or force-pushed;
# the commits undone are listed in the dry run.
# Without --yes it prints what it would do and stops. RB_SKIP_QC=1 skips the (advisory) quickcheck of the target (self-test only).
set -e
WANT=${1:?usage: rollback.sh previous|<sha|tag> [--yes] [--known-live]}; YES=""; KL=""; for a in "${@:2}"; do case $a in --yes) YES=--yes;; --known-live) KL=1;; *) echo "unknown option $a"; exit 1;; esac; done; LOCK=/home/user/wt/fetch.lock; mkdir -p "$(dirname $LOCK)"; touch $LOCK
TOP=$(git rev-parse --show-toplevel); cd "$TOP"
flock $LOCK git fetch -q origin main:refs/remotes/origin/main '+refs/tags/live/*:refs/tags/live/*'
M=$(git rev-parse origin/main)
isanc(){ git merge-base --is-ancestor "$1" "$M" 2>/dev/null && return 0
  [ -f "$(git rev-parse --git-common-dir)/shallow" ] || return 1
  flock $LOCK git fetch -q --deepen=500 origin main:refs/remotes/origin/main 2>/dev/null; git merge-base --is-ancestor "$1" "$M" 2>/dev/null; }
MT=$(git rev-parse "$M^{tree}")
BL=$(git show "$M:index.html" 2>/dev/null | sed -n 's/^window\.CTM_BI=\(.*\);$/\1/p' | python3 -c 'import json,sys;b=json.loads(sys.stdin.read() or "null") or {};print(" ".join(x["s"].rstrip("+") for x in (b.get("h") or [])))')
KNOWN=" $(git for-each-ref --format='%(*objectname)%(objectname)' 'refs/tags/live/*' | while read x; do git rev-parse "${x:0:40}^{commit}" 2>/dev/null; done | tr '\n' ' ') $(for x in $BL; do git rev-parse -q --verify "$x^{commit}"; done | tr '\n' ' ') "
if [ "$WANT" = "previous" ]; then
  G=""; WHY=""
  AWAY=" $(git log --format=%s "$M" --grep='^rollback: live ' -n 50 | sed -n 's/^rollback: live \([0-9a-f]\{7,40\}\) .*/\1/p' | while read s; do git rev-parse -q --verify "$s^{commit}"; done | tr '\n' ' ')"
  for t in $(git for-each-ref --sort=-refname --sort=-creatordate --format='%(refname:short)' 'refs/tags/live/*'); do
    c=$(git rev-parse "$t^{commit}")
    [ "$(git rev-parse "$c^{tree}")" = "$MT" ] && continue                      # same files as live main
    case "$AWAY" in *" $c "*) echo "  skip $t (rolled away earlier)"; continue;; esac
    isanc "$c" || { echo "  skip $t (${c:0:8} is not an ancestor of main)"; continue; }
    git cat-file -e "$c:index.html" 2>/dev/null || continue
    G=$c; WHY="tag $t"; break; done
  if [ -z "$G" ]; then
    SRC=$(git show "$M:index.html" | sed -n 's/^window\.CTM_BI=\(.*\);$/\1/p' | python3 -c 'import json,sys;b=json.loads(sys.stdin.read() or "null") or {};h=b.get("h") or [];print(h[0]["s"].rstrip("+") if h else "")')
    if [ -n "$SRC" ] && c=$(git rev-parse -q --verify "$SRC^{commit}") && [ "$(git rev-parse "$c^{tree}")" != "$MT" ] && isanc "$c" \
       && git cat-file -e "$c:index.html" 2>/dev/null; then case "$AWAY" in *" $c "*) ;; *) G=$c; WHY="build line of main (CTM_BI.h[0], no usable live/* tag)";; esac; fi
  fi
  [ -z "$G" ] && { echo "STOP: no previous live build found (no live/* tag or build-line entry that is an ancestor of main). Name the sha: rollback.sh <sha>"; exit 1; }
else G=$(git rev-parse --verify "$WANT^{commit}"); WHY="named $WANT"
  isanc "$G" || { echo "STOP: ${G:0:8} is not an ancestor of live main ${M:0:8} - it was never a live build of main; rolling back to its files could drop work main already has. Refused."; exit 1; }
  case "$KNOWN" in *" $G "*) ;; *) if [ -n "$KL" ]; then echo "WARN: ${G:0:8} is not a known live build; going on because of --known-live"; else
    echo "STOP: ${G:0:8} is not a known live build (no live/* tag, not in main's build line) - a branch commit inside main's history was never live and can drop work main had. Refused. If you KNOW it was live main, add --known-live."; exit 1; fi;; esac
fi
echo "target ${G:0:8} ($WHY)"
git cat-file -e "$G:index.html" || { echo "STOP: ${G:0:8} has no built index.html"; exit 1; }
[ "$(git rev-parse "$G^{tree}")" = "$(git rev-parse "$M^{tree}")" ] && { echo "main already has the files of ${G:0:8}"; exit 0; }
echo "live main ${M:0:8}  ->  roll back to the files of ${G:0:8} ($(git log -1 --format='%cd %s' --date=format:'%m/%d/%Y %H:%M' "$G"))"
git diff --stat "$M" "$G" | tail -3
echo "== commits whose changes this undoes (they stay in history): $(git rev-list --count "$G..$M")"; git log --oneline --first-parent "$G..$M" | head -15
if [ "$RB_SKIP_QC" = 1 ]; then echo "== quickcheck skipped (RB_SKIP_QC=1, self-test)"; else
echo "== quickcheck on the build we roll back to"; CTM_LIVE_REF=$M bash dev/tools/quickcheck.sh "$G" || echo "WARN: quickcheck failed on ${G:0:8} too - roll back further? (continuing only with --yes)"; fi
if [ "$YES" != "--yes" ]; then echo "dry run. Run again with --yes to fast-forward main to a rollback commit."; exit 0; fi
C=$(git commit-tree "$G^{tree}" -p "$M" -m "rollback: live ${M:0:8} -> files of ${G:0:8}" -m "dev/tools/rollback.sh; every commit of ${M:0:8} stays in history. Re-land: git revert this commit on the fixed branch.")
M2=$(git ls-remote origin refs/heads/main | cut -f1); [ "$M2" = "$M" ] || { echo "STOP: main moved to ${M2:0:8} - run again"; exit 1; }
git merge-base --is-ancestor "$M" "$C" || { echo "STOP: internal - rollback commit is not on top of main"; exit 1; }
flock $LOCK git push origin "$C:refs/heads/main"      # plain push = fast-forward only (no --force anywhere in this script)
T=live/$(date -u +%Y%m%d-%H%M%S)-${C:0:8}-rollback; git tag -a "$T" "$C" -m "rollback to ${G:0:8}" && flock $LOCK git push -q origin "refs/tags/$T" || true
echo "ROLLED BACK: main ${M:0:8} -> ${C:0:8} (files of ${G:0:8}) · tag $T · site back in ~1-2 min"
