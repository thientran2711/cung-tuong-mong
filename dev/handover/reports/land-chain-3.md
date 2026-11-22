# LAND CHAIN 3 handover (session_01Rc5AsJFfM2R2uK98FmTHnu)
Successor = LAND CHAIN 4 (opened by MAIN CHÍNH 103). NEVER TWO CHAINS: LC3 has STOPPED (queue empty, nothing running).

## STATUS AT ROLL (22/11 ~01:35Z, ctx ~33 %)
LIVE = 02c6d8f4. Queue empty. HOLD: review/od03-favart-rv 50bea9c9 (after D bundle) — never land until main clears it.

## Setup LC4 must recreate in ITS container (same as land-chain-2.md + one new script)
- /home/user/wt/live = detached sparse worktree on origin/main ('/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'), hooks: bash dev/site/hooks/install.sh
- /home/user/wt/ho = detached worktree on handover branch (sland.sh uses /home/user/wt/ho/dev/tools/asmunion.py)
- /home/user/wt/sland.sh = dev/tools/main-sland.sh with <YOUR SESSION ID> replaced, golive timeout 590 -> 1500, hold guard line after `cd`: `grep -qx "$1" /home/user/wt/hold.txt && { echo HELD-SKIP; exit 3; }`; hold.txt = review/od03-favart-rv
- /home/user/wt/landq.sh = dev/tools/main-landq.sh ; hpush.sh = main-hpush.sh with own session id
- NEW: /home/user/wt/landq-e2e.sh = dev/tools/main-landq-e2e.sh (copy as is). Same as landq but after QUICKCHECK PASS it runs `node dev/test/coop-e2e.js` in /home/user/wt/live and requires "N/N passed" before pushing. USE IT FOR EVERY LAND: the land quickcheck has NO coop-e2e gate (only the 50-coop-one-world scan). One coop-e2e run ≈ 10 min.
- Queue file lines: branch|sha|topic|Vietnamese change line. Stops at first FAIL → report, drop line, rerun.
- coop/worker/** changes deploy via GitHub Action coop-worker.yml (paths: coop/worker/**) — none of LC3's lands touched it.

## Landed by LC3 (21–22/11) — 12
ksz-lost-tap ee36e62f, palace-life-gaps d0f75fa4, home-chapters e804edfc, coop-cyhold 2fd4e0b4, kit-pframe-overlay 04afaeb7, mg-craft r4 (Thêu) ea112384, coop-home-tabs 34245fe2 (FF), ui-leftover-fold r3 0cb05ac2, coop-famops r2 87ac1ff4, bongloc-options r2 02c6d8f4 (+ coop-e2e 124/124 on each of the last 4).

## FAIL / owed back
- ui-leftover-fold r2 da27c7e2: REAL CONFLICT jk4.js → r3 landed (0cb05ac2). Done.
- rel-men-servants r6rv 1840a861: REAL CONFLICT dev/build/jstip.js vs LIVE 02c6d8f4 (bongloc-options stipEvent self-ask branch + BAL.blopt odds) → B owes r7 on LIVE 02c6d8f4 (keep both sides).

## Notes
- Plain LIVE ea112384 coop-e2e = 124/124 (22:40Z): D bundle's 117/142 was bundle-side, not LIVE.
- Perf-only quickcheck retry used once (coop-cyhold).
