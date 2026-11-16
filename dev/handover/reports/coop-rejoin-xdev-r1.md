PASS c4b0c58f74e9bb1cc57df9315eb8e44f520d9e21
# coop-rejoin-xdev — review r1 (reviewer, 11/16/2026)

Branch review/coop-rejoin-xdev-r1 @ c4b0c58f = review/coop-rejoin-xdev 53b7b4f6 + origin/main 399483e3 (fast-forwardable: main is an
ancestor) + reviewer fixes below. Site rebuilt with dev/site/build_site.sh (only conflicts were the built index.html / sw.js / assets.json).
Report to MAIN 14 (session_01UV1Szi3qp3nDFoLSYuRz7D; replaces s13).

## Test setup
The Worker was run LOCALLY with `wrangler dev --local` (workerd and real Durable Objects, port 8799). The staging and production Workers
were not touched. Chromium's private-network block is off for a local Worker URL (coop-rejoin-stats now does this itself; the other suites
used a `-r` preload). Two browser contexts = two devices with separate storage. Sổ mây only carries the room list + pid, as on a real device.

## Bug found and fixed on -r1 (data loss, same owner bug class)
A device that is only ASLEEP (Fold locked: socket dead, page kept in memory) while she plays on the other device reconnects by itself
when it wakes (want=true, no begin/snapLoad). Two problems:
(1) It kept going with its STALE in-memory week. Repro on the branch as shipped: tài 46 on the woken device vs 49 on the device she
had just played.
(2) Its next seat write was based on an old version, so it got "seatold" and stopped writing its copy for the rest of the week (seatVer
{ssv:4, old:true}). From then on, another device switch would restore an old copy.
Fix (dev/build/jcoopworld.js, client only): on a "room" reply while already in the game, if the room's seat copy was written by ANOTHER
device and is newer (by version, same week) than what this device last saw, CW.restore() it. Reuses the existing restore path; there is
no new UI. The seat version now remembers its week (CW.ssvWk), so a copy from a newer week is not compared against an old week's counter.
New test case W in dev/test/coop-rejoin-stats.js: sleep is simulated with routeWebSocket (frames dropped, new sockets refused, as in
coop-sleep.js). Before the fix: 3 FAIL. After the fix: PASS.

## Results (local Worker, final build c4b0c58f unless noted)
| test | result |
|---|---|
| coop/worker npm test (merge, vault 48, seat + NEW 3 M cap cases) | ALL OK |
| ws.test.mjs vs local Worker | ALL OK |
| real workerd probe: 2.99 M char copy (gzip) stored + returned whole in `mine` on rejoin; 3.0001 M → seatbig, old copy kept; second socket same pid → old one closed 4001 | OK |
| coop-rejoin-stats.js (H/G same-device rejoin, X guest/host cross-device, conflict old-device-returns, moved, no seat fight, next-week merge, NEW W wake case) | 83/83 (3 clean runs: rs3, rs4 final build, run 3) |
| coop-e2e.js | 59/59 |
| coop-night.js (same-device rejoin = coop-night-sync behaviour) | 105/105 (first run 102/105 at case 6/8 host-rejoin timing; rerun alone clean; the code path is untouched by this branch) |
| cloud-save.js | ALL 45 OK |
Flaky, not caused by this branch: "each sees the friend's real stats after the merge" (H/G same-device cases) failed in 2 of 5 runs.
This path is untouched (the same device never takes the new branch's server copy). ST now logs fP (the friend seat's srv/dead/rank/lc)
so the next failure shows its cause. Follow-up for the co-op owner.

Requested checks:
- other device, empty storage → stats/week from A: PASS (snap server → restored; khắc, tài, sắc, danh, buổi equal).
- old device A must not overwrite B after B takes over: PASS (A gets 4001 → "moved", no reconnect; with A only asleep: see fix above).
- friend unaffected: PASS. Same-device rejoin: PASS (pickSnap keeps the local copy when the server copy has the same dev).
- "me" (new character) drops only her copy; week tick drops both copies and resets versions: PASS (seat.test).
- seatold: stale write refused, newer copy kept (seat.test); the client no longer gets stuck in seatold after a wake (W case).
- 3 M cap: PASS. A sổ of a 40-week life is ~37 KB compressed (vault.js), so the cap has a wide margin.

## UI (moved freeze): PASS
Same fz() kit panel (.modal.kpscene > .dlg.kpanel.kpsc data-kind=notice, kpHeader + kitRows + .kbtn alt). The only addition is the
words "Cuộc chơi đã sang máy khác" and #next "Ở máy khác". Scan of the moved / me / peer freezes at 755x1000@2, 1180x820@2,
1366x1024@2, 412x1058@2, 390x844@3: the same class, width and position as the existing freezes at every size; no overflow, no cut
text, no page errors. Shots looked at (755x1000, 1180x820).

## Worker deploy (main auto-deploys coop/worker via .github/workflows/coop-worker.yml, which now also runs seat.test)
- Back-compat OK. Old clients ignore the new `mine`/`msv` fields of "room". New clients on the old Worker: the old Worker ignores
  {t:"seat"} silently (no seatok, nothing breaks). Old rooms without meta.sv work (`m.sv || {}`). No DO migration change.
- Mixed builds on one seat: an old client still fights for the seat on 4001; a new client stops ("moved"). No data loss.
- As with every Worker deploy, live sockets drop once when the DO restarts and the clients reconnect by themselves (existing behaviour).
- Staging Worker ctm-coop-xdev (created by the worker) can be deleted after merge.

## Open follow-ups (not blocking)
1. An auto-reconnect (a woken device, or a desktop tab after a network blip) still takes the seat from the device she is actively playing
   on, which then shows "moved". Since the -r1 fix this loses no data: the woken device takes the newer copy, and "Về màn đầu › Trở lại
   phòng" takes the seat back. A "soft" reconnect flag (do not replace a live socket) would need a Worker + client change.
2. Copy lag (from the worker's report): up to 3 s of acts can be lost if a device dies without pagehide.
3. The flaky friend-stats check above.

## LIVE SMOKE (after merge to main c4b0c58f): SMOKE PASS
- Deploy co-op Worker run #4 (c4b0c58f): the production Worker answers {t:"seat"} with seatok, and the room reply carries msv (probe at 08:5x Z).
- dev/test/coop-rejoin-stats.js vs https://ctm-coop.victoria-tntt.workers.dev: 83/83. Covers: same-device rejoin (host, guest), leave on
  device A and rejoin from a NEW device B with empty storage (guest, host: exact khắc/tài/sắc/danh/buổi), old device returns (newest wins,
  "moved", no seat fight), sleep/wake case W (woken device takes the newer copy, no seatold), next-week merges keep the gains, no page errors.
