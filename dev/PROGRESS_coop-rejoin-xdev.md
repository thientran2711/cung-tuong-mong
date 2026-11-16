# PROGRESS review/coop-rejoin-xdev (worker, session_01UV1SzjMEc5viCb8vMx3A49)

Owner bug: in co-op, exit + re-enter resets her personal stats. Fixed for the SAME device by coop-night-sync-r1 (localStorage
"ctm-coop-wk"). This branch fixes it for ANOTHER device / cleared storage.

## Priority rule #1 check
git grep origin/main + review/* (coop*, cloud-save*, save-slots*): no per-seat state on the Worker existed. Reused:
- jcoopworld CW.snap()/CW.restore() (r1 rolling week copy) — the same object now also goes to the server.
- jcoop pidFor + Sổ mây (jcloud mergeRooms) — the other device gets the same pid → same seat. No new identity scheme.

## Design
- Worker (coop/worker/src/index.js, Room DO): new message {t:"seat", sv, o}. Stored as "seat-<seat>" (chunked putBig), only for the
  writer's own seat and the current week; version counter meta.sv[seat] (+1 per write, server-stamped o.sv/o.sat); a write based on an
  older version than stored → error "seatold" (a stale device cannot overwrite a newer copy). Reply {t:"seatok", sv}.
  "room" reply carries `mine` (this seat's copy, same week only) + `msv`. Copies dropped on "me" (new character) and at the week tick
  (merged base holds the week; meta.sv reset). Cap 3 M chars.
- Client jcoop.js: COOP.state.mine/msv from "room". Close code 4001 "replaced" (same seat opened elsewhere) → status "moved", no
  auto-reconnect (before: two devices with the same pid would steal the seat from each other forever, and the stale one would write).
- jcooplobby.js: freeze panel reason "moved" (same kit panel kpHeader notice + kitRows; words only): "Cuộc chơi đã sang máy khác".
- jcoopworld.js: snapSave also pushes the copy (changed only, <= every 3 s, at once on pagehide/hidden). Device id "ctm-coop-dev".
  On rejoin (begin → snapLoad) pickSnap(local, server): server copy written by this device → local; else server if its version >
  the last version this device saw; else local. CW.seatVer() for tests.
- Solo cloud save: unchanged; Sổ mây keeps carrying the co-op room list + pid (that is what lets the new device take the seat).
  Co-op lives still never go into the solo vault.

## Tests
- coop/worker: npm test = merge + vault + NEW seat.test.mjs (12 checks: versions, stale refused, other seat refused, wrong week,
  me drops only her copy, week tick drops copies + resets versions).
- Staging Worker: ctm-coop-xdev.victoria-tntt.workers.dev (wrangler deploy --name ctm-coop-xdev from this branch). ws.test ALL OK.
  Production deploys at merge (.github/workflows/coop-worker.yml, now also runs seat.test).
- dev/test/coop-rejoin-stats.js: + 2 cross-device cases (guest, host): old device closed, NEW browser context (own storage, only the
  Sổ mây room list + pid) rejoins → exact week; then the OLD device returns → newest (server) copy wins, new device shows "moved",
  no seat fight; next-week merge keeps both seats' gains. Shots: .tmp/xdev/xdev-moved-*.png (755x1000@2, 1180x820@2).
