# coop-famops-p review — E50r (BIG co-op reviewer-lander, opus; opened by FOREMAN E #31 session_01DgYSWoUyoZaYD9578iakz7)
depth 4 (E50r session_01DgYSWkzmNQRsuChoadrL1i, lineage limit 8). Branch under review: review/coop-famops-p 1033eb2e (E44d; fixer now E44e session_01DgYSWpLv9wkgCqYzU8ZfGZ). Final-merge branch: review/coop-famops-p-r.
PRIORITY #1 CHECK ('coop-famops-p|loTake|loOffer|loEvBack|famCopy|hảo hữu lấy'): OD law 6c (+ L594 co-op gate) | main f0070e61 (c2 LIVE; jlost.js/jcoopworld.js) | review/* review/coop-famops-p 1033eb2e (E44d), c2-r b311aea2 already LIVE | claims E44d → E44e.
## STATUS
- 22/11 ~08:20Z: sha 1033eb2e verified on origin; contains LIVE f0070e61 (= newest main). Rebuild (assemble + build_site) = only the CTM_BI build line differs. Unit 33/33. 76-wk scans running (4242 / 9001 / SWAP; SKEW next).
- 22/11 ~09:00Z: 76-wk scans on 1033eb2e (LOST_DBG=1, harness from the branch):
  | run | result | dup | vanish | notes |
  |---|---|---|---|---|
  | default 4242 | 84/96 | 0 | 0 | A.nofriend 76 (host never acts on her: degenerate host side); FAILs = buổi/week handshake stalls (w15/17/49/54/62) + traffic |
  | SEED=9001 | **89/92** | 0 | 0 | full traffic both seats (A.steal 17, A.npc 41, B.steal 13, ui/plant both); (V) «hảo hữu lấy» NOT reproduced; 3 FAILs = one w10 stall |
  | COOP_SWAP | stalled for good at w33 (killed) | 0 | 0 | to w31 clean; guest loops «night 33» (sent 32), host «Chờ hảo hữu…» after «Hảo hữu vào cung» (friend reborn) |
  | COOP_SKEW=24 (E50r-s, own container) | stalled at w0 (killed) | – | – | guest loops «night 0», sent -1 |
  | CONTROL LIVE f0070e61, 9001 (E50r-s) | 83/100 | 0 | 0 | A.nofriend 76 (degenerate); 5 transient stalls |
  Rerunning: SKEW=24 + SWAP on 1033eb2e, CONTROL SKEW=24 on LIVE f0070e61 (same harness) — to judge the persistent «night N» guest stall (branch vs pre-existing).
