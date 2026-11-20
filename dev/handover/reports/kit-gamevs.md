# kit-gamevs report (K-PM-1 kitGameVs, kit keeper)
PRIORITY #1 CHECK: OD 1 (OD 20/11 ~01:00Z item 1) | main none (94c3bddc) | review/* none | claims none.
Branch review/kit-gamevs @ 2ed549e (from origin/main 94c3bddc). START_CTX ~5%, no rollover needed.

## Built
- `kitGameVs(opts)` in `dev/build/jgamevs.js` (assemble.py after jmgcal.js): two panes (opp / her): kit portrait (`kitFaceH`), name, kit chips for live score («phần») and clock («còn N giây»), turn marker «Đến phiên», centre round state, result banner. Display only.
- API: mount (call after kgReady §13.7), setScore(side,n), setClock(side,t|null), setTurn(side|null), setRound, end({win,text}), `vs.me` / `vs.opp` board slots, destroy.
- Layout: html.kv1 (Fold) opp above / her below; html.kv2 (iPad) her LEFT / opp RIGHT. Reduced-motion safe. Knobs only `BAL.gameVs {pop,warn,end}` (jbal2); no game numbers.
- KIT.md §13.8 + kit page sample §13.8 (fake opponent ticking). Test `dev/test/kit-gamevs.js`.
- Every person-minigame art can mount it (all KG82 kinds: đàn, cờ, … + Foreman E E22c callers): one call after kgReady.

## Results
kit-gamevs test: 0 FAIL at 755x1000, 1180x820, 390x844, 1510x2000 (API, words no %/điểm, stacked vs side-by-side, no page errors). media-check 0. Shots looked at Fold + iPad (owner-side shots in /tmp scratch, not in git).
quickcheck: started, long-running; result to follow if not PASS. Note: kit page sample §89 shows a PRE-EXISTING error "list.map is not a function" (not mine).
Limit: `end` banner timing knob `BAL.gameVs.end` is declared, not yet used by CSS (instant settle); first caller may wire it.
