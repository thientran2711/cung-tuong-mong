LC6 = session_01Rc5AsMFGsdDXzKjwP9Vndc; START_CTX ~5 % (est., get_session reads 0); depth 3; setup ready (23/11 ~03:45Z)
# LAND CHAIN 6 (opened by MAIN CHÍNH 109 session_01Rc5AsMAkWe3fwq2w85eAKc; predecessor LC5 STOPPED)
Roll at ctx >= ~30 % (START_CTX + 25), ceiling 60 %.

## Setup (same as land-chain-5.md)
/home/user/wt/live sparse detached on origin/main bda5b75b + hooks; /home/user/wt/ho handover; sland.sh (LC6 id, golive 1500, hold guard); landq-e2e.sh; hpush.sh (LC6 id); hold.txt empty.

## Log
- 23/11 ~03:45Z LIVE = bda5b75b. Queue empty. Waiting for relays from MAIN 109.
- 23/11 ~04:55Z LANDED coop-famops-pv 81d76c8b (FF, QUICKCHECK PASS 498 s, coop-e2e 141/141). LIVE = 81d76c8b.
- 23/11 ~05:55Z LANDED coop-real-port 52ad65b3 (FF, test-only, QUICKCHECK PASS 517 s, coop-e2e 141/141). LIVE = 52ad65b3.
- 23/11 ~06:55Z LANDED places-swap-n13 91dc91d3 (569f8916 self-merged on 52ad65b3; QUICKCHECK PASS 565 s; places-swap-look 6/6 Fold+iPad; coop-e2e 141/141; perf buổi 2565/1620 flagged).
- 23/11 ~07:05Z LANDED rooms2 4ad20bd6 (5355780d self-merged on 91dc91d3; QUICKCHECK PASS 576 s; coop-e2e 141/141). CDN img/_review/rooms2 wiped (3 obj).
- 23/11 ~07:45Z LANDED rooms1 ca801185 (6770bcad merged on 4ad20bd6 = 0a69b7a5; swap_rooms1.py --go → 16 bases live on CDN (looked at all 16); build commit ca801185: assets.json rebuilt, 782 keys changed (stale vs CDN index); QUICKCHECK PASS 562 s; rooms1-look bad 0; coop-e2e 141/141). Revert: swap_rooms1.py --revert. LIVE = ca801185.

## ROLL (23/11 ~07:50Z, ctx ~28 %, START_CTX ~5 %, depth 3/8) — LC6 STOPPED, queue empty, nothing running, hold.txt empty
LIVE = ca801185 (rooms1). Landed by LC6: coop-famops-pv 81d76c8b, coop-real-port 52ad65b3, places-swap-n13 91dc91d3, rooms2 4ad20bd6, rooms1 ca801185 — all coop-e2e 141/141.
Setup for LC7 = same as land-chain-5.md (live sparse wt + hooks, ho wt, sland.sh with own id + golive 1500 + hold guard, landq-e2e.sh, hpush.sh).
Notes: (1) For lands with lander steps or own tests, run sland.sh directly (no push), then own test + coop-e2e, then FF push `git merge-base --is-ancestor origin/main $H && git push origin $H:refs/heads/main`. (2) golive's rebuild leaves assets.json/index.html modified in /home/user/wt/live — `git checkout -- .` before the next step. (3) assets.json on main is now in sync with the CDN index v=7b95f850 (rooms1 build commit). (4) Test URLs: python3 -m http.server 8765 --bind 127.0.0.1 in /home/user/wt/live.
