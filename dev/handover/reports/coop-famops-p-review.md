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
- 22/11 ~10:20Z round 2 + controls (same harness = branch's coop-lost-scan.js; LIVE control worktree f0070e61 with only that file copied in):
  | run | result | dup | vanish | shape |
  |---|---|---|---|---|
  | -p COOP_SWAP (rerun, 4242) | 88/92 | 1 (1372, w60–61 only, at a w61 stall) | 0 | host-NPC-owned case 67 (own 3, kept by NPC 1, «tra» w55); piece at host NPC 1 AND her chest, no ledger line for it on either seat (came into her chest already carrying a host id) |
  | -p COOP_SWAP SEED=7 (to w31, stopped for gates) | – | 0 | 1 (10000085) | **(V) «hảo hữu lấy»**: host laydo w23 → her case 15; host case 44 closed «nha» w25 → «sang hảo hữu» (came home); w29 her ledger «hảo hữu lấy» again, host has no line = vanish |
  | -p COOP_SKEW=24 (×2, one in E50r-s) | stalled at w0 | – | – | guest loops «night 0», sent -1 |
  | CONTROL LIVE f0070e61 COOP_SKEW=24 | stalled at w0, SAME dump | – | – | = pre-existing (LIVE since fixed by coop-night0 234d0298/b9defe39 «STUCK night 0», now in 418bf356) |
  | CONTROL LIVE f0070e61 COOP_SWAP (to w53, stopped) | – | **2** (10000049 A:5+B:me; 20 A:box:mkt:sell+B:me) | **1** (10000081) | 10000081 = SAME (V) shape: her piece taken by the host («hảo hữu lấy (thất lạc)»), came home «sang hảo hữu», last line on her seat «hảo hữu lấy» w48, host no line. 10000049 = same dup shape as 1372 (host-side holder + her chest) |
  | lost-one-home-scan solo 10 tuần, seeds 2–8 on -p | dup0 van0 ×7 (2 FAILs each = 10-tuần length / road coverage, by design) | 0 | 0 | |
  | CONTROL LIVE f0070e61 solo seed 6 | dup0 van0 (E44d's LIVE DUP on bb92f986 does not reproduce on f0070e61's trajectory; the P3 proof = unit 18–18c FAIL on the old jlost) | 0 | 0 | |
  | solo 108 tuần seed 2 on -p | dup0 van0, no page errors (1 FAIL = road coverage) | 0 | 0 | |
  JUDGEMENT: (V) «hảo hữu lấy» vanish = PRE-EXISTING (CONTROL LIVE shows the same shape, 10000081); -p's roads (famCopy guest copies, loKeepBy into a copy, loTake / loOffer / loEvBack) are not on it (host take from her ENTRY = friend entry p.coop → famCopy false; her «rm» side unchanged). The [host holder + her chest] transient dup (1372) has its LIVE twin (10000049) = pre-existing. P4: not seen in my runs (0 in 7 co-op runs). → TICKET for the coop-world row, not this row.
- Code review (law 6c / law 1): loTake removes the holder's copy from loEntry's x.h (the real holder, after loEntry moves c.at); loOffer = same rule as the visible button (pbtn `disabled` when a why is set; j76 data-kneed insert keeps the first tag intact); loEvBack with a holder → that copy, no 2nd piece; loask «Trả lại» only when x.h===S. famCopy reads COOPW.seat (not ctx) so a host running her act in her context is unaffected. Overlap hunks vs LIVE: f0070e61 touched jlost.js (wording «thiện cảm», L273–281) + jcoopworld.js (MEN_P «oan», L45) — different lines from the branch, both present; 418bf356 touches no file of this branch except index.html/sw.js (rebuilt). No new number (law 4), no new player word (law 7). Law 11 table present (E44d report). NIT (not blocking): loask «Trả lại» when she no longer holds it still logs «Ngươi trả…» + relAdd with nothing moved (edge: the piece moved between the dialog and the tap) — pre-existing text, ticket.
- Final merge: review/coop-famops-p-r **8100a103** = 1033eb2e + merge LIVE 418bf356 (only index.html/sw.js conflicted; assemble + build_site rebuilt). Unit 33/33 · quickcheck PASS (old save ok, core gates PASS; one earlier run on 1033eb2e failed G4 coop-one-world R.evm + perf buổi right after killing 3 scans → probe alone 6/6 PASS on -p and 6/6 on LIVE = load flake).
