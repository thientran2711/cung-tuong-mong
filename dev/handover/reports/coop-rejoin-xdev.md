SẴN SÀNG KIỂM 53b7b4f6232ff90979ebec55e17c1720ea821b6e
# coop-rejoin-xdev — worker report (16/11) — SẴN SÀNG KIỂM

Branch review/coop-rejoin-xdev @ 53b7b4f6232ff90979ebec55e17c1720ea821b6e (from origin/main cdad7109). Session session_01UV1SzjMEc5viCb8vMx3A49.
Owner bug: co-op exit + re-enter from ANOTHER device / cleared storage restarted her week from the room base (stats lost).

## What changed
- Worker (coop/worker/src/index.js Room DO): per-seat week copy "seat-<seat>" (message {t:"seat",sv,o}; only own seat, current week;
  server version counter; write based on an older version → "seatold"; 3 M char cap). "room" reply carries `mine` + `msv`.
  Dropped on "me" (new character) and at the week tick (merged base already holds the week).
- jcoopworld: the r1 rolling snapshot (CW.snap) is also pushed (only when changed, <=3 s, at once on hide). On rejoin pickSnap:
  copy written by this device → local; else newer server version → server; else local. Reuses CW.restore (no new restore path).
- jcoop: close 4001 "replaced" (same seat opened on another device) → status "moved", no auto-reconnect (before: endless seat fight,
  stale device could write). jcooplobby: freeze reason "moved" in the SAME kit panel (words only: "Cuộc chơi đã sang máy khác");
  #next reads "Ở máy khác". No new UI parts.
- Seat identity on the other device = Sổ mây (jcloud room list + pid, jcoop pidFor) — reused, unchanged. Solo cloud save unchanged;
  co-op lives still never go to the solo vault. Without Sổ mây a cleared browser has no pid, so it cannot prove the seat (by design).

## Tests (staging Worker ctm-coop-xdev.victoria-tntt.workers.dev, deployed from this branch with wrangler --name; production untouched)
| test | result |
|---|---|
| coop/worker npm test (merge, vault 48, NEW seat.test 12) | ALL OK |
| coop/worker ws.test.mjs vs staging | ALL OK |
| coop-rejoin-stats.js (+2 cross-device cases: guest, host; new context with own storage; old device returns → newest wins; moved panel; next-week merge) | 71/71 |
| coop-e2e.js | 59/59 |
| coop-night.js | 105/105 |
| cloud-save.js | ALL 45 OK (one earlier run 43/45 while 3 browser suites ran in parallel; rerun alone clean) |
UI: moved panel checked at 755x1000@2 and 1180x820@2 (fits, no overflow, kit notice panel).

## Deploy
Merge to main auto-deploys the Worker (.github/workflows/coop-worker.yml, now also runs seat.test). Old clients ignore the new
`mine`/`msv` fields; the new message is only sent by new clients. Staging Worker ctm-coop-xdev can be deleted after merge.

## Open / follow-ups
- Copy lag: last <=3 s of acts before a device dies without a pagehide may be lost (server copy is that much older).
- r1 follow-ups still open (host commits night alone with empty guest seat; night `go` vs a late dialog).
