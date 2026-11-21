# LAND CHAIN 2 handover (session_01Rc5AsLRRYSeTySKmsRyu3W, depth 6)
Successor = LAND CHAIN 3 (opened by MAIN 99 session_01Rc5AsN8TNYgPyS2B25nrJ4). NEVER TWO CHAINS: LC3 lands nothing until LC2 says STOPPED.

## Setup LC3 must recreate in ITS container
- /home/user/wt/live = detached worktree on origin/main (sparse: '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'), hooks: bash dev/site/hooks/install.sh
- /home/user/wt/ho = detached worktree on handover branch (sland.sh calls /home/user/wt/ho/dev/tools/asmunion.py)
- /home/user/wt/sland.sh = dev/tools/main-sland.sh with <YOUR SESSION ID> replaced, AND golive timeout raised 590 -> 1500 s (590 gave "no verdict" on kit-dialog-2/ban-cung; 1500 fixed it). Optional hold guard line after `cd`: `grep -qx "$1" /home/user/wt/hold.txt && { echo HELD-SKIP; exit 3; }`
- /home/user/wt/landq.sh = dev/tools/main-landq.sh ; hpush.sh = main-hpush.sh with own session id
- Queue file lines: branch|sha|topic|Vietnamese change line. landq stops at first FAIL -> rebuild queue file without the failed line and rerun.
- coop/worker changes deploy automatically: GitHub Action coop-worker.yml on push to main (verify the run, no manual wrangler).

## Landed by LC2 (21/11) — 25
duodo-focus 419079d7, kit-dialog-2 f85cba97, coop-emo-seat 8f435841, mg-intro-2 99795d67, coop-guest-names d3f44022, cold-faction 1bf7e14d, jlost-kyngo 468835a7, ban-cung e236bda5, coop-pool-face 270c6251, dialog-person-3 d541add9, kit-relrows-ms 08e1e934, coop-arrive-see a201d968, sg-card e193228f, pet-bath-test c9ae030e, bang-words 6d31d6d2, kit-opt-title-wrap 93704ee1, jemo-bal 7af6a13f, coop-room-faces 9c5b6de3 (Worker deployed run #9), dresscode 0faf7a05, kit-ef-unit r3 3ae75fdc, kit-win-pay 70375dbf, ge-phutang b7041e67, kit-mark-fix r6 dcff5884, kit-relrows-ms1word f44060d4, podium-wire r2 8c829c67.

## Not landed / owed back
- palace-life-gaps r3 8599d166: REAL CONFLICT jbaleff.js -> B r4
- ui-leftover-fold a6b5fd3c: perf FAIL twice (buoiMs 2984 vs live 1426, limit 2926) -> B
- mg-craft r3 973b5ba7: REAL CONFLICT jtd.js -> B r4
- HOLD: coop-cyhold-rv 3e65dbe7 (D bisect verdict), od03-favart-rv 50bea9c9 (after D bundle k4)
- or20-j68q 88205658 already LIVE (skip if relayed again)
## Perf note
buổi timing creeping up on many runs (new/live up to 3662/2356 ms); perf-only retries used on coop-guest-names, kit-ef-unit, coop-room-faces, ui-leftover-fold.
