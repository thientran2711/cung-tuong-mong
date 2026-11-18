# dev/art/manifests — git source of the CDN act table (act-pic-match, 18/11)
Also here: EVENTS.json (rebuild_events.py) and FIGURES-kids.json (rebuild_kids.py) candidates.
`ACTS.json` here = the img/ACTS.json that must be live (332 acts, 10 prefixes, 836 log rules, every picture key checked against img/_index.json).
Why: on 17/11 02:41Z a stale-checkout `cdn_sync` push overwrote the live ACTS.json (and EVENTS.json, FIGURES*.json) with the 15/11 base; ~75 act cards fell back to the
kit placeholder and ~130 shared pictures. Nobody noticed for a day because the manifest lived only on the CDN.
Rules: (1) change act pictures by editing THIS file (or dev/figwork/acts patches + `python3 dev/figwork/acts/rebuild_acts.py <live ACTS.json> <_index.json> dev/art/manifests/ACTS.json`),
commit, then `cp dev/art/manifests/ACTS.json img/ACTS.json && python3 dev/site/cdn_sync.py img/ACTS.json`. (2) cdn_sync refuses a push that shrinks any section vs the live copy or the floor
(dev/site/manifest_guard.py, dev/site/manifest-floor.json). (3) quickcheck hook 70-manifest-guard.sh fails the go-live when the LIVE manifests are below the floor.
(4) NEVER commit img/*.json to a branch (stale copies get pushed by `cdn_sync` with no arguments).
