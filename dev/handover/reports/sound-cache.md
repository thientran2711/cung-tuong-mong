# sound-cache — report (branch review/sound-cache, from LIVE f573dc94)
depth: not given in my brief (no lineage.depth available to me) | START_CTX: ~15 % (not measurable here)

PRIORITY #1 CHECK: OD 2 | main 15 (sw.js content-key cache, assets.json hashes, dev/site/assets.py) | archive 6 | claims none — nothing to build: the general fix (content-hash cache key) ALREADY EXISTS on main; this branch only PROVES it and adds the test.

## Verdict: NO RENAME NEEDED. A device that cached the old «tèo» gets the new tick.
Why (read from sw.js / assets.json / dev/site/assets.py):
- assets.json lists every sound/picture as [path, sha256/md5[:16], size, group]; sw.js caches each under 'ctm-assets' key '<path>?h=<hash>' (never the bare path) and answers every plain request `audio/sfx-tap.mp3` (j11 auBuf) from the key the CURRENT manifest names. Changed bytes ⇒ changed hash ⇒ new key ⇒ fresh download; the old key is pruned 15 s after the new worker activates (PRUNE list).
- The offline pack «Tải hết» (jload.js) writes the same '?h=' keys, so it follows the same rule.
- sfx-tap: old c4cc3b4f22da7536 (md5 5503f990…, 879 B) → new 41b75d64f37f7e1e (md5 65f56594…, 1088 B). assets.json changed in 310bad2e (v 6f81b65f3287 → 43ad16967fbd); sw.js V changes with it, so the browser installs the new worker.

## Proof (dev/test/sound-cache.js, Chromium; persistent profile; old build e61317a7 = parent of 310bad2e)
Old build served first (its SW + shell + cache primed, page really fetched the old tick), then the new build (f573dc94) on the same origin:
| device | old tick bytes md5 | new build gives | secs until new worker took over | cache keys after | PASS |
|---|---|---|---|---|---|
| Fold 755x1000 @2 | 5503f990… (old) | 65f56594… = file in git | 22 | …?h=c4cc… (old, pruned later) + …?h=41b75d64f37f7e1e (new) | yes |
| iPad 1180x820 @2 | 5503f990… (old) | 65f56594… = file in git | 22 | same | yes |
Network log (new run): `audio/sfx-tap.mp3?h=41b75d64f37f7e1e` fetched from the network exactly once; later plain requests answered by the SW.
WebKit: NOT available in this container (only Chromium in /opt/pw-browsers) → iOS-like path not run; the SW logic is engine-independent but the iOS Safari HTTP cache is not proven here.

## Caveats (honest)
1. ~20 s window: the new worker installs in the background (shell + CDN json precache), then takes over and the page reloads (kit "Có bản mới"); until then the old tick still plays. Normal behaviour of every build, not specific to this file.
2. No-SW devices (first load, SW blocked): bare `audio/sfx-tap.mp3` is HTTP-cached by GitHub Pages (max-age=600) ⇒ stale for ≤10 min. Not worth a rename (a rename would not help the already-cached SW path either).

## Audit: files replaced in place (git history of main, deepened to 9725 commits)
| file | replaced when | cached by content key? | fix |
|---|---|---|---|
| audio/sfx-tap.mp3 | 25/11 310bad2e | yes (?h=) — proven above | none |
| audio/sfx-birth, coin, decree, expose, heartbeat, learn-bad, learn-good, night, open, page, poison, promote, step; vo-crowd-gasp-1, vo-f-angry-1/2, vo-f-cry-1/2, vo-old-f-hmph-1/2 | 15/11 7aff0cd0c | yes (same scheme, hash in assets.json) | none |
| audio/MANIFEST.json | 15/11 (3 commits) | JSON: network first + shell copy per build, never ?h= | none |
| icons/apple-touch-icon, icon-192, icon-512 | 13–15/11 | not sounds/pictures in assets.json; shell-cached per build via manifest; iOS reads the touch icon only when adding to the home screen | none |
| every CDN picture (img/…) | n/a (not in git) | key = IMG+'img/…?h=<md5/16>' from the CDN's _index.json (assets.py L37) | none |
Only audio/ and icons/ hold binary assets in git (129 mp3 + 6 icons); nothing else to audit.

## Branch
Adds only dev/test/sound-cache.js (+ this report). Run: `node dev/test/sound-cache.js <oldDir> <newDir>` (needs two worktrees; ~2 min). No game code, no sw.js, no assets change.
