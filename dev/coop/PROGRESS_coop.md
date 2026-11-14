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
  ZZZZ → "Không thấy phòng". No page errors, no horizontal overflow. coop-e2e.js passes up to "A unfrozen when B is in"; the rest needs jcoopworld.
