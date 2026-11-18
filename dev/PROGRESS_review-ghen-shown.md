# PROGRESS review/ghen-shown (Foreman D worker, ONE CORE OD:L1267, follow-up of review-emperor-visit-r1)

Base: review/emperor-visit-r1 b2e34df7 (not yet on main when this started).

## Done
- ONE function: `ghenN(n)` (j1) = the jealousy "every consort ghen +n" really adds = round(n × BAL.ghen.datinh) when the Emperor is đa tình, else n.
  `ghenAll(n)` applies ghenN(n); every text that shows such a gain prints `ghenN(<same constant>)`.
- The đa tình factor 1.5 moved from j1 into `BAL.ghen.datinh` (jbal2). Every typed ghenAll number (28 calls) moved into `BAL.ghen.<key>`
  (keys documented in jbal2), so text and rule read the same constant. jexam's `BAL.psk?…:10` fallback dropped (BAL.psk always exists).
- Scan: `python3 dev/measure/ghen_shown_scan.py [rev]` — before (b2e34df7): BAD 13 same-line texts + 14 texts on other lines
  (j20 card+log, j71 ×7, j83 ×2, jecon, jcycle, jvisit card) + 28 typed calls; after: OK 27 texts, 34 calls all BAL, 0 BAD / typed / orphan keys.
- Test `node dev/test/ghen-shown.js`: static scan + unit (every key, đa tình on/off) + live (8 real cards/acts, shown parsed, option run,
  every rival's real delta == shown). ALL OK.
- Suites: emperor-visit.js PASS, cycle.js (root index.html, 6 viewports) ALL OK, night-day.js see report.

## Not changed (listed by the scan as DIRECT / NOTE)
One-consort or small-group jealousy written directly (`v.ghen=cl(v.ghen+n)`: steal +25, Hoàng hậu +15, garden +3, toilet crowd, the
visit's lost-night rival, jts, jpet). They never had the đa tình factor, so shown == applied already. Their numbers are still typed in
several texts (e.g. steal "+25" in j2/j17/j75/j79/j87/jaudit) — a separate ONE CORE follow-up, not part of ghenAll.
