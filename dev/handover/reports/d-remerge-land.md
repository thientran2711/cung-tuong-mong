# D re-merge + LAND READY train (worker session_01D3E3Na1itJyTLYhXYvK1Zr, opus BIG; brief briefs/D-remerge-land.md)
PRIORITY #1 CHECK ('re-merge'): OD 2 | ledger 0 | claims 8 | main 1 | review/* 0 | archive 0 — reuse: the 6 REVIEW PASS shas of the brief (+ item 7 d-followups-1-rv 563d336b from Foreman D 18:28Z); none on LIVE at start (LIVE 284e0d08).

| # | branch | PASS sha | base LIVE | merge sha (pushed) | conflicts | gates |
|---|---|---|---|---|---|---|
| 1 | review/servant-trust-rv | 59ea20a8 | 284e0d08 → 502c48c9 | 65abb0de | index.html/sw.js only (rebuilt); code clean | servant-trust 71/71 ×3, net-build 189/189, svt-scan 67/0, one-core ×4 PASS, oldsave ok, npcmind ERRS [], coop-e2e 142/142 ×2 (1 earlier 141/142 flake, LIVE 142/142), quickcheck PASS ×2 |

| 2 | review/promo-build-2-rv | 70571e8a | 502c48c9 | 4defb821 | index.html/sw.js only (rebuilt); code clean | promo-build 48/48 ×3, kit-promo-hook Fold+iPad, promo-rules/skip/next-rank = LIVE fail sets, mrfoot 59/0, net-build 189/189, one-core ×4, oldsave ok, npcmind ERRS [], coop-e2e 142/142, quickcheck PASS |
Tooling notes: promo-rules needs the normal (CDN) build, a CTM_IMG_BASE= build fails «person reveal» (no figure image); two-way-oldsave needs file:// URLs, npcmind-check plain paths; LIVE build for old-save gates = worktree of origin/main built with CTM_IMG_BASE=.
