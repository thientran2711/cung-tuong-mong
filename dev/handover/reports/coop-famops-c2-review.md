# coop-famops-c2 review (E48r session_01DgYSWpBzP3A6Bn8pRU8jcw, depth 3) — PASS
PRIORITY #1 CHECK ('coop-famops|ilGone|famSweep|coop-lost-scan'): OD law 6c / law 1 / L594 | main 7303aa58 (coop-famops LIVE 87ac1ff4) | review/coop-famops-c2 f766a052 (E44c SSK), review/coop-famops-p abe25693 (P-row + harness) | claims E44b → E44c → E44d.
LAND sha: review/coop-famops-c2-r b311aea252c6ae3f7507b83d9c934c2bd344ee5b, base LIVE 7303aa58 (FF). = E44c f766a052 (same tree as my c05f074c) + LIVE 8746a062 (night-balance-bundle: jcoopworld auto-merged, LIVE 20 / branch 21 hunk lines EXACT, no fam-ops overlap) + ddcca5c1 + 7303aa58 (no co-op code overlap with jcoopworld/jil). vs LIVE: dev/build/jcoopworld.js (+21/−1), dev/test/coop-famops-unit.js (+13), index.html, sw.js.
Code: jil ilGone wrapper. Friend-owned piece (box own / gh / my case names her): «dead» → «ret» home only past jil's own guards (ilAt / ilToFriend / ilDur, my ask, unit 16c); other box roads → g0 unchanged, own cleared, both cases «mất dấu» («gone» by id/alt); famSweep skips __fs. The wrapper makes a piece ONLY on «dead»→«ret» (guarded) → it cannot create a dup on any other road.
Laws: 6c (c) family closed, piece stays real in the holder's box · 1 two-way (not seat-gated) · 4 no new number · 7 no new player word · old saves (c.__fs optional).
| gate | sha | result |
|---|---|---|
| coop-famops-unit | b311aea2 | 24/24 |
| coop-e2e both seats | b311aea2 | 129/129 (1st run 127/129: «same names» maid dedupe on load, not c2; rerun clean; LIVE 7303aa58 control run 110/130 stalled w0 = flaky harness) |
| quickcheck + old save | b311aea2 | PASS (core gates PASS) |
| coop-b1 / cyhold | 249c4a67 | 43/43 / 18/18 |
| role-parity ×2 | c05f074c (LIVE 02c6d8f4) | ALL PASS ×2; on 249c4a67 2 FAIL = same 2 on LIVE 8746a062 (petcare gap + riseCore) → LIVE regression, FOR MAIN (ordered to D) |
| lost-scan 76 wk SWAP | c05f074c | dup0 van0 |
| lost-scan SKEW=24 | c05f074c | 75 wk dup0 van0 |
| lost-scan SEED 4242 | c05f074c | degenerate (B.nofriend 76), dup0, van 2 = P3 (NPC-owned kyngo) |
| lost-scan default 76 wk (E44d harness e2d2dcf1, jnf night fix) | b311aea2 | dup 549 = P4 (NPC 6 «riv» held by friend + «conf»), van 10000294 = P2 (NPC→NPC «cướp» on her seat) |
| lost-scan SWAP 73 wk (same harness) | b311aea2 | dup0, van 10000150 = P2 |
| coop-dresscode-scan DBG | c05f074c | 87/88: A4 NPC-owned piece wdSell on both seats (P1); CONTROL LIVE 02c6d8f4 also 87/88 (B3 trâm) → pre-existing |
The (c) family is clean in every run. All leftovers are NPC-owned (P1–P4, E44d row review/coop-famops-p): pre-existing, the wrapper cannot reach them. P4 judged NOT c2-caused.
