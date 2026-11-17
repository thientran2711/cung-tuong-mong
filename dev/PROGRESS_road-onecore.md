# PROGRESS review/road-onecore (ONE CORE for the full origin roads, OD:L1267)

Base: review/road-b1-fixa-r1 @ c012bf32 (reviewer PASS, dropped from the go-live batch by dev/test/one-core-guard.js: 303 fails in jrd_tt/cn/muoi/dtq).

Done
- New `dev/build/jbalroad.js` (assemble: right before jroad.js): holds ALL of BAL.road (moved unchanged from jbal2.js) + `BAL.road.fx`
  (every option c/w/l/odds and every ending fx of the 112 chapters .5–.11) + `BAL.road.rare` (the 16 RD97L rare finale choices).
- `jroad.js`: `rdDef` → `rdFx(id,def)` puts the numbers back on the options/endings at registration; `rdOdds(q,A)` evaluates an odds term list
  left to right (bit-identical to the old arrow); `RDQ` named predicates; `rdFb` = one road flag book (CN_FL / MUOI_FL now alias it);
  `rdRare(d)` / `RR(a)` for RD97L (the condition text prints `RR(a).bar`).
- Data files hold only words, flags and story logic. Tools: `dev/measure/road-onecore-move.js` (mover), `road-onecore-emit.js` (BAL lines),
  `road-onecore-same.js` (before/after proof vs c012bf32: 0 differences). road-option-scan / road-fixb-scan load jbalroad.js (output identical).

Open (not counted by the gate, next step with the same pattern): relation / family amounts inside `go:` functions
(rdOan / rdRel / e67dad / e67bien / e67kho … ~614 calls with a typed amount), `sc:` / `k:` tiers.
