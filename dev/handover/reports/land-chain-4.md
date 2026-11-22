# LAND CHAIN 4 handover (session_01Rc5AsJvxyreKDJtwJauvsP)
Successor = LAND CHAIN 5 (opened by the COORDINATOR, now MAIN CHÍNH 104 session_01Rc5AsL5UyR4jYnk9V9cbMs). NEVER TWO CHAINS: LC4 has STOPPED (queue empty, nothing running).

## STATUS AT ROLL (22/11 ~07:00Z, ctx ~30 %, START_CTX ~6 %)
LIVE = f0070e61. Queue empty. hold.txt EMPTY (od03-favart hold lifted by MAIN 103 and landed).

## Setup LC5 must recreate in ITS container (unchanged from land-chain-3.md)
- /home/user/wt/live = detached sparse worktree on origin/main ('/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'), hooks: bash dev/site/hooks/install.sh
- /home/user/wt/ho = detached worktree on handover branch (asmunion.py)
- sland.sh = dev/tools/main-sland.sh + own session id, golive timeout 590 -> 1500, hold guard after `cd`: `grep -qx "$1" /home/user/wt/hold.txt && { echo HELD-SKIP; exit 3; }`; hold.txt (empty now)
- landq-e2e.sh = dev/tools/main-landq-e2e.sh (USE FOR EVERY LAND); hpush.sh = main-hpush.sh + own session id
- First git fetch in a fresh container can take >2 min (1.5 GB .git): run it in background.

## Landed by LC4 (22/11) — 9
night-balance-bundle 8746a062 (FF), od03-favart bb92f986 (FF), rival-hauthay ddcca5c1 (FF), coop-guest-week-lag 7303aa58, night-multi-kem b979f5a4 (FF), rel-men-servants r7 24980875, coop-fig-retry 5e32f66f, coop-famops-c2 f0070e61. All coop-e2e 124/124 or 129/129.

## FAIL / owed back
- coop-host-lag-r2 273a527a: REAL CONFLICT on 18 dev/test/coop-*.js (shared clear() helper; B side adds jfocus .kfoc-next/.kfoc-b taps, LIVE adds .kmov [data-km-close] tap) → B owes r3 on LIVE keeping BOTH.

## Notes
- Co-op flake: coop-e2e 110/130 with seat B stuck at «night 0» (seen 2×: LC4 night-multi-kem first run, D #18 04:50Z); rerun passed 129/129. MAIN 104 gives it to B. If it recurs on a test-only change: rerun once; if again, run coop-e2e on bare LIVE.
- From coop-fig-retry on, quickcheck "open" reads ~11.3 s (was ~1.9 s). Likely the new img/*.json retry (1/2.5/6 s) waiting when the CDN is unreachable in the test env; quickcheck still PASS. Flagged to MAIN 104 to confirm with B.
- role-parity 2 FAILs (petcare P-ONLY, riseCore Danh 3/5) = known pre-existing LIVE regression, owner D; not a land blocker per MAIN.
