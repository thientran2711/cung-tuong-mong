# LAND CHAIN 5 handover (session_01Rc5AsLX47s5ojNyh7J47MB)
Successor = LAND CHAIN 6 (opened by the COORDINATOR, now MAIN CHÍNH 108 session_01Rc5AsL9VpiVSGvAECNciWk). NEVER TWO CHAINS: LC5 has STOPPED (queue empty, nothing running).

## STATUS AT ROLL (23/11 ~03:25Z, ctx ~29 %, START_CTX ~5 %, depth 7/8)
LIVE = bda5b75b (kit-body-fit-merge). Queue empty. hold.txt EMPTY. img/body-fit.json is UP on the CDN (N19, after the jbody fix).

## Setup LC6 must recreate in ITS container (unchanged from land-chain-4.md / land-chain-3.md)
- /home/user/wt/live = detached sparse worktree on origin/main ('/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'), hooks: bash dev/site/hooks/install.sh
- /home/user/wt/ho = detached worktree on handover branch (asmunion.py)
- sland.sh = dev/tools/main-sland.sh + own session id, golive timeout 590 -> 1500, hold guard after `cd`: `grep -qx "$1" /home/user/wt/hold.txt && { echo HELD-SKIP; exit 3; }`; hold.txt (empty)
- landq-e2e.sh = dev/tools/main-landq-e2e.sh (USE FOR EVERY LAND); hpush.sh = main-hpush.sh + own session id
- First git fetch in a fresh container can take >2 min: run it in background. Never run git in /home/user/wt/live while a landq is running.

## Landed by LC5 (22–23/11) — 14, all coop-e2e n/n
coop-night0 234d0298 (FF, owner bug; 1st try G4 one-world flake, rerun PASS), coop-fig-retry-r3 609c86b0, places-wire-nvp-tn 418bf356, coop-host-lag-r3 b55a0e1c (141/141), role-parity-bundle-fix 9c057f42 (FF), coop-one-world-flake 35f5b5ab, coop-famops-p b238857f (FF), coop-guest-staff 40cc2b92 (FF), coop-guest-men 0a3ceede (FF), coop-flakes d1a36374 (FF), night-ledger-coop-r4 9bade240 (FF), quickcheck-figsig b4a5879d, body-fit-data-r2 d2cc5679, kit-body-fit-merge bda5b75b (FF).

## FAIL / owed back (all since resolved)
- coop-fig-retry r2 c784873c: r2 removed the FIGSIG wait in quickcheck.js → the OLD (LIVE) leg could not be measured (S.origin undefined) → r3 kept the wait; later quickcheck-figsig removed it once r3 was LIVE.
- body-fit-data 6e845d8e: 2 jpg shots in git (img-allowlist gate) → re-sent without them.
- N19 post-land: partial body-fit.json rows hid the auto-measured zones (jbody rows()/want()) → CDN json deleted (revert, MAIN 107 order), kit keeper fix kit-body-fit-merge landed, json re-pushed: kit-body-fit A 48/48, in-game LOOK 8/8 zones on Fold + iPad.

## Notes / recipes
- Post-land CDN steps: cp file → img/ in /home/user/wt/live, `python3 dev/site/cdn_sync.py img/<file>`; single-key delete (no CLI option): `python3 -c "import sys;sys.path.insert(0,'dev/site');import cdn_sync as c;k='img/<f>';assert not c.guarded_key(k);c.req('DELETE',c.API+'/objects/'+c.keyurl(k))"` then `cdn_sync.py --index`. Only on a main's order.
- GitHub Pages is NOT reachable from the container: run URL-taking tests against `python3 -m http.server 8765 --bind 127.0.0.1` in /home/user/wt/live (img/ fetches are rewritten to the CDN by jcdn.js).
- In-game LOOK helper used for body zones: scratch script (new life → click Bỏ qua/Vào cung until the stage figure shows, draw KIT_BODY.rows boxes over fig-* imgs, screenshot 755x1000@2 + 1180x820@2).
- Known: iPad kit page «h-overflow 40» pre-existing; coop-one-world seed-3 R.evm flake fixed by coop-one-world-flake.
