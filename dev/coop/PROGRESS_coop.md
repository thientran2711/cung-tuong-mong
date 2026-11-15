# PROGRESS · co-op phase 1 (branch review/coop)

Lead/backend: coop/worker/** + dev/coop/PROTOCOL.md. Worker B: dev/build/jcoop.js + jcooplobby.js. Worker C: dev/build/jcoopworld.js.

## Log
- 14/11: branch review/coop from origin/main 574f560. PROTOCOL.md written (message types, canonical state C, merge3, week sync, freeze).
- Worker coop/worker: Worker + Durable Object `Room` (SQLite-backed, hibernatable websockets, state chunked 40k chars/key,
  gzip binary frames above 200 KB, stale-socket alarm 45 s, idle rooms deleted after 30 days). merge3 in src/merge.js + test.
- GitHub Action .github/workflows/coop-worker.yml: deploys on push to main touching coop/worker/** (and manual run).

## Deploy
- DEPLOYED 14/11 22:20Z: https://ctm-coop.victoria-tntt.workers.dev (account subdomain victoria-tntt; workers.dev route enabled via API).
  Local deploy: `cd coop/worker && CLOUDFLARE_API_TOKEN=dummy npx --yes wrangler@4 deploy` (proxy injects the real token). First deploy
  needed `POST /accounts/<id>/workers/scripts/ctm-coop/subdomain {enabled:true}` once (done).
- Live protocol test `node coop/worker/test/ws.test.mjs`: ALL OK (seats, gzip big state, me, 3 weeks end→merge→week, guest leaves →
  presence offline, reconnect same seat/week, third player refused).

## Lead · integration (15/11)
- Merged origin/review/page-curl (fold-layout + book UI) into review/coop (00147f5); assemble order: … jk3, jk4, jcoop, jcooplobby, jcoopworld, j84.
- Server phase 2 (PROTOCOL §9/9.1, deployed): bend/buoi, where (host), pos (full fields incl. live stats), act/actr/res/note relays;
  merge3 NOADD set (mood, rank, dates, age, face, ids …: host wins, no delta sums).
- jcoopworld fixes after C left (lead): j61 knowledge for the friend (no knowFriend; a new life of hers = stranger again), guest always uses
  the host's `where` for the exact week.buổi (host re-sends on every re-placement), live stats in `pos`, reborn life joins the room's
  current buổi, hidden queued dialog re-shown, "Đợi bạn" note closable before the world exists, debug trace `COOPW.tr`.
- Tests: `dev/test/coop-e2e.js` (two browsers, Fold 686x880@2.2 + iPad 1180x820@2, live Worker): 59 checks, see dev/shots/coop/result.txt.
  `dev/test/coop-bot.js 52`: one year, 0 divergences (report dev/coop/BOT_COOP.md). `dev/test/coop-world.js` (C): 30/30.
  `coop/worker/test/ws.test.mjs` (server, live) ALL OK. `dev/test/coop-dbg-hostdeath.js` = repro tool for a death in buổi tối.
- Owner guide (Vietnamese): dev/coop/HUONGDAN.md.

## B · client net + lobby (worker B)
- `dev/build/jcoop.js` (window.COOP) + `dev/build/jcooplobby.js`, registered in assemble.py after j98, before j84. Default URL
  https://ctm-coop.victoria-tntt.workers.dev; `window.COOP_URL` set before load overrides it. Nothing connects in single-player.
- API for C (full doc at the top of jcoop.js): `COOP.send(t,fields)` / `COOP.send(obj)` (gzip binary above 200 KB), `COOP.on(t,fn)`
  for server messages `room presence state week said error pong` + local events `status` (any change), `peer` (friend online flag),
  `both` (both seats online), `start` ({room,you,host,week,state}: the lobby hid the title; C builds/rebuilds the game here — host with
  `state:null` must create the world and send `init`), `lost`. `COOP.state` = {status,room,you,seats,week,ended,C,peerOnline,bothIn,playing}.
  Flat live fields for the e2e harness: `COOP.code seat week online{a,b} ended{a,b} frozen waiting` (waiting = false | "room" | "week").
  `frozen` = in a room and not both online (PROTOCOL 6).
- pid in localStorage `ctm-coop-pid`; last room in `ctm-coop-room` → "Trở lại phòng XXXX" on the Chơi cùng bạn screen (reload/rejoin same seat).
  Reconnect backoff 1/2/4/8/10 s, ping 20 s, socket counted dead after 50 s silence, immediate retry on tab visible / `online`.
- Lobby (kit scene panels on the title art, `.kbtn`/`.kbtn.alt`, `kitRows`, `kitInput`): title home = "Chơi một mình" (the old
  primary: same action, Tiếp tục / Chọn sổ, its small line says which) + "Chơi cùng bạn" (Mời bạn · Nhập mã) + Kiếp mới / Sổ luân hồi /
  Thiết lập unchanged. Mời bạn → code + link + Chép đường dẫn / Gửi cho bạn (navigator.share) + "Đang đợi bạn vào phòng".
  Nhập mã → box + "Vào phòng". `?room=CODE` joins at once (param then removed from the address). Errors: full / no room / net.
- Overlay `#coopfz` (kit panel markup, z 9500) once `start` fired: "Đợi bạn trở lại" (friend offline, or my own link down) and
  "Đợi bạn xong tuần" (I ended, friend not — from `ended` in presence/room). Lifts by itself; "Về màn đầu" leaves (room kept for Trở lại).
  C: if you draw your own week-wait panel, tell me and I drop mine (`COOP_LOBBY.check` decides; `COOP_LOBBY.fz(false)` hides).
- Tested two Playwright browsers 686x880@2.2 + 1180x820@2 against the live Worker (scratchpad two.js): create, join by typing,
  both start, B closes tab → A frozen, B back via link → same seat b, A unfrozen, third browser → "Phòng này đã đủ hai người",
  ZZZZ → "Không thấy phòng". No page errors, no horizontal overflow. Re-run on the page-curl layout (00147f5): all steps pass.
  Test: `node dev/test/coop-lobby.js <base url> <outdir>` (base serves dev/index.html); shots in dev/shots/coop-lobby/
  (A = 686x880@2.2 Fold, B/C = 1180x820@2 iPad, D = 686x880@2.2).
- Local event `stop`: COOP.leave() during a running co-op game (freeze panel "Về màn đầu") emits it; jcoopworld turns itself off on it (C, 04c1137).
- Note for the lead: headless screenshots with the world running take 20–60 s per page (pixi stage on software GL, two+ pages);
  coop-e2e's 30 s screenshot timeout trips on that — use timeout 120000 + animations:'disabled' (CPU profile = native render, not a JS loop).

## C · thế giới chung (worker C, dev/build/jcoopworld.js)
- Registered in assemble.py after jcooplobby.js (before j84). Every hook checks `COOPW.on` (set by the lobby's COOP "start", cleared on "stop"): single-player untouched.
- Canonical C: `W.S` = WORLD keys of S (`W_KEYS`: year/month/tuan/turn, emp minus emp.known, thDead/thAge/thO/thF, court, wx, vacSince, trieu, storms,
  festDone, usedFaces/fidUsed/kidUsed) + `cnews` (host's world news of the week, for the guest). `W.R` = NPC rivals; viewer fields per pid:
  rel→rl[pid], oan→ro[pid], ghen→gp[pid], ev→ep[pid], evm.me→evm[pid]; key "me"→String(pid), "me" values of resHead/spyFor/lover/mid/… → pid.
  `P[seat]` = {pid, ok, name, rank, dead, srv, life, S:<all other keys of S>, S.empKnown}.
- Friend = rival entry `{id:901|902, coop:true}` built from her P (Thiện cảm/Oán toward me from her rl/ro[myPid]); while she serves (cnv, not risen)
  she is a servant `{sid:pid, coop:true}` in her mistress's staff. My acts on her entry (STAT rows, Thiện cảm, Oán, proof, death, lãnh cung, rank)
  are written back into P[friend].S so the merge adds them to hers; on her side a death → die(), lãnh cung → cold().
- Week: endTurn runs locally with the friend entry pulled out; guest mutes rivalsTurn/rivalsMonth/festival; emperorDies muted in co-op (both) for now;
  guest's rivalsBuoi only lands NPC acts aimed at her. After endTurn the client waits until her dialogs are closed, then sends `end` (event-driven:
  after render/closeModal/status; no timers touching the DOM). #next disabled while pending/waiting/frozen (only written when it changes).
  `week` → rebuild from C (dialogs kept), "Tuần mới" dialog lists stat changes from the friend/world + host's world news (sentences about "ngươi" dropped).
- Death: over() snapshots the world; the normal rebirth flow runs (Đầu thai → Luân hồi card). nlRun is hooked: the new life is put into the SAME world
  (`attach`), links to the throwaway world dropped; cung nữ (cnv) re-picks a mistress in the real world. nlAccept → `me`. Hook for later routes
  (tiểu thư): call `COOPW.attach()` after building a fresh S, then the route's accept sends `me` (or call nlAccept path).
- Save: in co-op save() does not touch the slots (the room DO is the save).
- Test: `node dev/test/coop-world.js [outdir]` (live Worker, two browsers 686x880@2.2 + 1180x820@2). Debug helper: dev/test/coop-dbg.js.
- Known MVP limits: emperor death off in co-op; friend's kids/items not shown on her entry; NPC AI never targets the friend entry (lead rule);
  guest is not hit by NPC month/turn schemes (muted), only by buổi acts.
- Phase 2 (§9/§9.1, C): #next in co-op routes through the wrapped nextBuoi (j6 had bound the bare one). Buổi sáng/chiều end with `bend`;
  the server's `buoi` runs the step (deferred until open dialogs close). Host sends `where` after each step/week/rebirth; the guest keeps the
  last `where` (even before she is in) and replaces NPC places with it (#next shows "Đợi bạn" until it arrives). `pos` on every move / khắc;
  friend's place mapped (her "home" = her palace, my palace in her eyes = my "home"); people at my place refreshed without travel side effects.
  Acts on the friend = every NPC act tab (same conditions). Kết giao / Tặng quà = `act` invite → her Nhận/Từ chối card → `actr` → I run it.
  Other acts resolve on my side, `res` carries the effect + flags (Thiện cảm, Oán, proof, cấm túc, death, lãnh cung) + seen ("named" for open
  acts or caught schemes, "effect" for hidden harm); she applies to her S, acks; her entry's write-back baseline moves (no double count).
  Friend is fully known in j61 knowledge (name/face shown, not "Người lạ").
- Screenshots: headless Chromium is kept busy by the Pixi scene ticker (single-player too) → tests use reducedMotion:'reduce'.
- coop-world.js: 30/30 (world, where, pos, invite card, 2 weeks of buổi sync, rebirth, week after rebirth, no errors/overflow).
