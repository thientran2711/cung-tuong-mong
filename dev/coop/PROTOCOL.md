# Chơi cùng bạn — co-op PROTOCOL (phase 1)

Owner of this file + `coop/worker/**`: co-op lead (backend). Client: `dev/build/jcoop.js` + `jcooplobby.js` (worker B, net + lobby UI),
`dev/build/jcoopworld.js` (worker C, shared world). Change this file only through the lead.

## 0. Model in one paragraph
One room = one Cloudflare Durable Object (`Room`, keyed by the room code). The DO stores the **canonical shared state** `C` of the
room and both seats. Two seats: `a` = host (made the room), `b` = guest. Both clients run the normal single-player engine on a
**local perspective** of `C` (her own `S` + the shared world; the friend appears as one extra entry in `rivals`). Players act in
parallel during a week. At the end of the week (pressing "Qua đêm" on buổi tối) each client runs `endTurn()` **locally**,
converts its local game back to canonical form and sends it (`end`). When both seats have sent `end` for week `k`, the DO computes
`C(k+1) = merge3(C(k), C_a, C_b)` (section 4) **once**, stores it and broadcasts it. Clients rebuild their local game from it.
So: the DO is authoritative for storage, week counter and the merge; the host's run is authoritative for world events on conflict
(section 4: host wins any non-numeric conflict, numbers add their deltas). The guest's client mutes world-agency functions (C, section 5)
so world events are rolled once (on the host).

## 1. Endpoints (Worker `ctm-coop`, workers.dev; URL in PROGRESS_coop.md and `window.COOP_URL` default in jcoop.js)
| method | path | body / reply |
|---|---|---|
| POST | `/api/room` | → `{code}` (new room, 4 letters from `ABCDEFGHJKMNPQRSTUVWXYZ23456789`, never reused while it exists) |
| GET | `/api/room/<CODE>` | → `{code, exists, seats:{a:{name,online},b:{name,online}|null}, week}` (404 `{exists:false}` if unknown) |
| GET (WS upgrade) | `/api/room/<CODE>/ws?pid=<pid>&name=<url-encoded name>` | websocket (section 2) |
| GET | `/api/health` | → `{ok:true, v}` |
CORS: `*`. `pid` = random id the client makes once and keeps in `localStorage["ctm-coop-pid"]` (try/catch). The first pid that
connects to a fresh room takes seat `a`, the next new pid takes `b`; a known pid always gets its own seat back (reconnect).
A third pid gets `{t:"error",code:"full"}` and the socket closes.

## 2. WebSocket messages
Every message is one JSON object `{t:..., ...}`. Text frames. If a message is larger than 200 KB the sender MAY send it as a
**binary** frame = gzip(JSON text) (browser `CompressionStream("gzip")`); the DO accepts both and sends `room`/`week`/`state`
as binary gzip when the JSON is over 200 KB (client must handle binary: `DecompressionStream("gzip")` → JSON.parse).

### client → server
| t | fields | meaning |
|---|---|---|
| `init` | `state` (C) | seat a only, only while the room has no state: the first world (host made it with `start()`). |
| `me` | `P` (personal blob) | set **my** `C.P[seat]` now (guest's first character after joining, or her reborn character). Server stores, broadcasts `state`; also drops my pending `end` and rewrites the OTHER seat's pending `end` so its view of me = the new blob (her old view of my dead character cannot overwrite the new one). Clients must rebuild local on `state`. |
| `end` | `week`, `state` (C) | I finished week `week` (already ran my `endTurn()`); `state` = my canonical after it. Ignored if `week` ≠ room week. |
| `unend` | `week` | take back my `end` (only while the other seat has not ended). Optional. |
| `seatd` | `sv, set:{path:value}, del:[path], dev` | (review/lag-play-2) her seat copy as a DELTA on top of the stored copy of version `sv` (paths `buoi`, `used`, `c`, `d.<key>`, `d.S.<key>`). Applied only when the stored copy is exactly version `sv`, else `error seatresync` and the client sends the full `seat`. Answer `seatok`. Sent only to a server whose `room` reply lists `caps:["seatd"]`. Any client frame above 8 KB is gzip (binary). |
| `ping` | – | keep-alive; server answers `pong`. Send every 20 s. |
| `say` | `text` (≤ 200 chars) | optional short message to the friend, relayed as `said`. |

### server → client
| t | fields | meaning |
|---|---|---|
| `room` | `code, you:"a"|"b", seats, week, ended:{a:bool,b:bool}, state` (C or null), `caps` (server features, e.g. `["seatd"]`) | first reply after connect / reconnect; full snapshot. |
| `presence` | `seats, ended` | someone connected / disconnected / ended. `seats.<x>.online` drives the freeze. |
| `state` | `state, week, by` | C changed outside the week tick (`init` / `me`). Rebuild local. |
| `week` | `week, state` | the merged C for the new week. Rebuild local, unfreeze, play on. |
| `said` | `from, text` | relay of `say`. |
| `pong` | – | |
| `error` | `code, msg` | `full`, `noroom`, `badweek`, `notyours`, `toolarge` |

`seats` = `{a:{name,online,pid?no}, b:{name,online}|null}` (pids are never sent to the other client).

## 3. Canonical state `C` (opaque to the server except for the merge)
```js
C = {
  v: 1,                 // canonical format version
  week: k,              // mirrors the room week (server overwrites)
  W: {                  // the shared world = truth for both
    S: {...},           // the WORLD keys of the engine's S (time year/month/tuan/turn, emp, thO/thDead, court, wx, factions, …)
    R: [ {...}, ... ],  // NPC rivals (ser() form, objects with `id`); per-player attitude fields kept per pid:
                        //   rl[<pid>], ro[<pid>], gp[<pid>]  (local v.rel / v.oan / v.ghen of the viewing player)
    rid: n              // next rival id counter
  },
  P: { a: {...}, b: {...} }   // each player's PERSONAL blob: { S:{personal keys of S}, ok:originKey, name, rank, dead, pid:901|902, … }
}
```
- Player ids inside the world (used as rival ids for the friend entry and as keys of rl/ro/gp): seat a = **901**, seat b = **902**.
  NPC rival ids stay below 900.
- Which S keys are world vs personal, and building the friend's rival entry, is client code (C, `jcoopworld.js`), documented there.
- `C` must be plain JSON (from `ser()` walk: rival refs are `{$r:id}`, kid refs `{$k:name}`).

## 4. Merge rule (server, `merge3(base, A, B)`; A = seat a = host, B = seat b)
Recursive on plain JSON:
1. If `A` deep-equals `B` → that value. If `A` equals `base` → `B`. If `B` equals `base` → `A`.
2. Both changed, both numbers → `A + (B − base)` when base is a number (deltas add; e.g. NPC Sức regen on both + a guest's act).
   (both numbers, no numeric base → `A`).
3. Both changed, both plain objects → merge key by key (missing key = `undefined`; a key deleted on one side and unchanged on the other is deleted).
4. Both changed, both arrays whose items are all objects with an `id` → merge by id: order of `A`, items present in base+A+B merged
   recursively; new ids only in `A` kept; new ids only in `B` appended **only under `P`** (her own things), dropped under `W`;
   ids removed on one side and unchanged on the other are removed.
5. Anything else (strings, booleans, other arrays, type change) both changed → `A` (host wins).
Server then sets `C.week = k+1`.

### 4.1 Guest → host requests (client only; review/coop-guest-maid, `dev/build/jcoopask.js`)
Rule 4 drops a new id made only by seat b under `W`, and rule 5 lets the host win a non-id array (NPC `staff`, `kids`). So anything NEW
the guest causes in the world goes through the host:
- New person (her maid catches the Emperor's eye, "Tiến cử … hầu thay", her petition "tuyển nhiều", the new-girl event, the kin who
  enter with a tiểu thư): on the guest `newRival` gives a TEMP id ≥ 1000. Her `ser()` moves the person out of `R` into a request
  `{id:"<life>:<temp>", k:"np", t:<temp>, v:<the rival, guest-local ser form>, maid?}` in her own `P.b.S.coopAsk` (and puts it back
  into `R` as a stand-in on every rebuild until it is answered).
- New servant she puts into an NPC's staff (her maid bought by a bigger consort, a planted servant): `{k:"srv", to:<npc id>, s}`.
  A child she took from an NPC: `{k:"kidout", from:<npc id>, name}`.
  A servant she took out of an NPC household into hers (rank-up gift, a spy taken back): `{k:"srvout", from:<npc id>, sid, name}` (review r1).
  An NPC household's refill (`fillStaff` / `staffInit`) does not run on the guest (host only), so her copy of the world never invents NPC servants (review r1).
- New requests are also relayed once at once: `act {k:"ctm-ask", mode:"ask", id, L:[requests]}` (relay only; older clients ignore it).
- Host: after every rebuild and on the relay (only while its own `end` for the week has not gone), each request is applied once with
  the solo rule (consort: `roomFor("consort")`, a world id `++rid`, `coopAsk=<request id>`, her links `rl/ro/gp/ep[902]` from v).
  Answer in its own blob: `P.a.S.askDone[<request id>] = [result, week]` (result 0 = refused), pruned 3 weeks after she closed it.
- Guest, next rebuild: the rival with `coopAsk` = her request → her links under the temp id (S.rl / S.ro / known "r<id>" / {$r:id}
  refs / kin .pal) move to the world id, request closed. Refused → her maid comes back to her household.
- World events that must roll once are muted on the guest (tuyển tú, the triều đình "tuyển" petition, an NPC's maid serving in
  her place); the host's result reaches her through the merge.

## 5. Week sync rule
- Room week `k` starts at 0 when `init` arrives. A client may only `end` week `k`.
- After sending `end` the client shows the kit waiting panel "Đợi bạn xong tuần" (no acts) until `week` arrives.
- When both ended → server merges, stores, `week+1`, broadcasts `week` to both.
- The week counter is the co-op week, independent of in-game date (both advance the same date because both ran one `endTurn()`).

## 6. Freeze rule
- The world runs only while **both seats are online**. If the other seat is `null` (no friend yet) → "Đợi bạn vào phòng" + the code/link.
  If the other seat is offline → kit panel "Đợi bạn trở lại", no acts, no "Qua buổi". Unfreezes on `presence` with both online.
- Offline = socket closed, or no message for 45 s (server closes sockets silent for 45 s).
- Reconnect: client reconnects with the same pid (backoff 1 s, 2 s, 4 s … max 10 s), gets `room`, rebuilds from `state`.
  If it had ended the week and the merge happened meanwhile it simply receives the new state.
- Nothing is lost by closing the tab: C lives in DO storage (chunked) and survives DO eviction and reconnects. Rooms idle 30 days are deleted (alarm).

## 7. Death → reborn (no waiting)
When her `S.dead` becomes true in co-op, the client immediately builds a new personal blob (cung nữ start `cnv` in the same world;
tiểu thư later) and sends `me` with it. The world does not wait; the other player keeps playing. The dead character leaves the world
(her friend entry disappears / shows in Sổ ghi).

## 8. Limits
- Room state ≤ 8 MB (chunked in DO storage, 100 KB per key). WebSocket frame ≤ 1 MB → gzip above 200 KB.
- Max 2 players per room. Max 1 socket per seat (a new socket for the same pid closes the older one).

## 9. Phase 2: same buổi, same place (server LIVE since 14/11; client = C)
Goal (owner): both players are always in the same buổi; NPC whereabouts are identical on both clients; each sees the other at her
real place in real time; acts between the two go through the server and the receiver answers.

| t (client → server) | fields | server does |
|---|---|---|
| `bend` | `week, buoi` (0 or 1) | I finished buổi `buoi`. Error `badbuoi` if it is not the room's current buổi. When both seats sent it (or the other seat is empty): `buoi+1`, broadcast `buoi`. Otherwise broadcast `bended`. Buổi tối (2) still ends with `end` (week merge, section 5), which resets the buổi to 0. |
| `unbend` | – | take back my `bend` while the other has not sent hers. |
| `where` | `week, buoi, W` | **seat a only.** W = the host's `S.where` for that buổi (NPC id → place, `emp`, `th`, + whatever placeWhere wrappers add, e.g. `menW`). Stored (last one) and relayed to b. The guest replaces the NPC part of her `S.where` with it, so NPC places are the host's, identical by construction (no seeding). |
| `pos` | `place, khac, week, buoi, x?` | my live location (send on every move / khắc spent). Stored per seat, relayed as `pos {from,…}`. The friend's `whereOf()` = her last `pos.place`. |
| `act` | `id, k, …` (free fields) | relayed as-is to the other seat with `from`. Use for player-to-player acts: the receiver applies the effect to her own S (after a kit option card Nhận / Từ chối where the rules need consent) and answers with `actr`. |
| `actr` | `id, ok, …` | relayed to the other seat with `from`. |

| t (server → client) | fields |
|---|---|
| `buoi` | `week, buoi, bended` — advance to this buổi now (run the local nextBuoi). |
| `bended` | `week, buoi, bended:{a,b}` — who has finished the current buổi (drives "Đợi bạn xong buổi"). |
| `where`, `pos`, `act`, `actr` | relays, plus `from` |
| `room` / `presence` | now also carry `buoi`, `bended`; `room` also `where` (last) and `pos:{a,b}` (last known) for reconnects. |

Order per buổi: both play → both `bend` → server `buoi` → each client runs nextBuoi(); the host's placeWhere() result goes out as
`where`, and the guest waits for the `where` with the same (week,buoi) before showing people (keep #next locked until then).
`end` is still accepted at any buổi (phase-1 clients that do not send `bend` keep working).

### 9.1 Player-to-player acts (owner 14/11: the full NPC act set, place-dependent)
- Every act a player can do to an NPC she can do to her friend when the rules allow it (same place, rank, khắc…), with the same costs,
  odds and detection. Only INVITATION-type acts (mời, xin gặp, kết nghĩa, cùng đi…) give the target a choice card.
- `act {id, k, mode:"invite"|"do", place, week, buoi, …}`:
  - `invite`: the target's client shows the kit option card. She answers `actr {id, ok}`. Then the actor resolves as usual.
  - `do` (gift, talk, harm, scheme, sát hại …): the ACTOR's client resolves odds and detection with the normal rules (target = the friend
    entry). It then sends `res {id, k, fx:{stat:delta…}, flags:{…}, seen:bool}`: the effects on the target plus what she would learn.
    The target's client applies fx/flags to her own S (death included, which starts her rebirth). It shows only what an NPC victim
    would learn: `note {id, text}` when `seen`, otherwise just the stat change in the week news. Then it answers `actr {id, ok:true}`.
- Ids are unique per sender (seat + counter). The receiver ignores a repeated id (reconnect replays).
- The server relays `act`, `actr`, `res`, `note` unchanged with `from`. Week merge (section 4) still reconciles numbers, so the
  receiver must NOT also get the same delta through the friend entry: the actor's client applies `do` effects only through `res`
  and leaves its local friend entry for display.
- Bot check: bots try harm acts on each other when in the same place. After each buổi both clients' views must agree:
  the victim's own S vs the actor's friend entry (sung, danh, suc, rank, alive).

## 10. Chat (owner 16/11, review/coop-chat; server LIVE `coop-2`)
Room-scoped (this Durable Object only; no endpoint reads another room), plain text.
| t | direction | fields |
|---|---|---|
| `chat` | client → server | `text` (cut at 300 chars after stripping control / bidi characters, blank ignored), `nm` (sender name, ≤ 24), `g:{y,m,t,b}` (game year, month, tuần, buổi, for the game-style time). Whole frame ≤ 2.4 KB else `error toolarge`; one seat may send once per 350 ms else `error slow`. |
| `chat` | server → BOTH seats (sender too) | `m:{i,s:"a"|"b",n,x,w,g,ts}` — `i` = per-room increasing id. |
| `room` | server → client | now also `chat:[m…]` = the last 50 messages (history after reconnect / rejoin). |
Storage: DO key `chat` (array, last 50). Deleted with the room (30 days idle). Clients escape the text when drawing it; the server stores it raw. Old clients ignore `chat` / `room.chat`.
Client: `dev/build/jcoopchat.js` (KIT §80). Tests: `coop/worker/test/chat.test.mjs`, `dev/test/coop-chat.js`.


## 11. Shared contests and single winners (review/coop-contest, owner 16/11 "cả hai đều được báo dự thi?"; client `dev/build/jcoopcontest.js`)
No Worker change: everything rides on the shared world keys (merge rule 4/5, host wins) and the `act` relay (k `"ctm-cc"`).
Law (OD:L96 one world + the two-way law): one contest for the room, decided once by the host, same formula for both players and NPCs.
| W key (host writes, guest only reads) | holds |
|---|---|
| `cfp` | festival plans `{<fest>: {y, pp}}` rolled by the host's `fPlan7` (variant, NPC entrants, NPC who prepared, seed). The guest's `fPlan7` is muted. |
| `cfa` | the guest's answers as the host received them `{<board id>: {y, me | a, pr}}` |
| `cfb` | boards `{<id>: {id, ty:"f"(festival contest)|"x"(feast FX7)|"p"(gift contest), k, y, rows:[NPC rows], ent:{901,902}, sc:{901,902}, res, w}}` |
| `ctc` / `ctcRes` | Tranh ghế: the host's `S.contest` in canonical keys ("me" → host pid) / the result `{id, r, win:<pid or NPC id>, c, tbl, txt}` |
Relay `act {k:"ctm-cc", mode, ...}`:
| mode | from → to | fields | meaning |
|---|---|---|---|
| `ans` | either → other | `b, y, me | a, pr, n` | her Enter / Skip answer; the host stores the guest's in `cfa`; the other side gets a log line. |
| `sc` | guest → host | `b, row` (null = skipped) | her score after her own mini-game (or the formula). Re-sent on reconnect and at each rebuild until `res`. |
| `res` | host → guest | `b, B` | the board with its ONE result list (`B.res`, both players + NPCs, sorted). Also reaches her by the merge. |
| `tg` | guest → host | `cid, sc, pr, bk, sab, dq` | her Tranh ghế rounds / between-round choices on the mirror; sent just before her night "Sẵn sàng" and on reconnect. |
Flow (festival contest): host endTurn rolls the plan → both see the same invitation (+ "Hảo hữu của ngươi cũng nhận được lời mời") →
answers relayed → festival day: the host scores the NPCs once (the only NPC luck roll, NPC preparation silver paid once) into `cfb` →
each player who entered plays her mini-game against those rows (`startContest({hold:true})`: no prize, provisional place) → scores to the
host → the host ranks when every entered player is in, or at its next week end (missing player = the formula score, the NPC rule) →
ONE list. Prize rule (`COOPW.pay`): her own client pays her; NPC prizes are paid by the host only; nobody pays the friend entry.
The feast contests (FX7, festival() is muted on the guest) and the gift contest ("Dâng lễ", one best gift for the room) use the same board.
Feast board placement (review/coop-contest-fix): the board is the BOTTOM layer of `festival()` (`COOPW.festBoard`, jcoopworld hooks): under the
guest mute, the host's news line, B4's friend-in-harem and `b4Wrap` (which still sends what NPCs did to her items). Her entry on the board =
her live registration `fEntry().fx7[f]` (same year, not done, valid art; with teacher prep `pr` and practice `pb`) or her `cfa["x:"+f]`
answer, so ANY registration path enters her. The old B4 scoring (`CW.f7`, `f7Done`, cScore7/fxBest7/fxFin7 hooks) is retired.
Sức rule (same as solo): an entrant on the ranked list pays `J71.cost` exactly once — on "Vào thi", or when the result applies if she
was scored by formula because she never played (`j71.cpay[board]`); "Bỏ thi" pays nothing. Her feast registration closes (`fx[f].done`)
when the result applies on her own client. The feast invitation odds use one seed per feast and year in co-op (same wording basis).
The wager race (W variant) is drawn from the plan seed, so both see the same winner. Other variants (game with a consort, banquet, rite) are
personal acts on the shared plan (NPC money moved by each player's own game adds by merge rule 2).
Tranh ghế: host only (`contestOpen`, `contestWeek`, `fillSeats` muted on the guest; `npcContestAct` never acts for the friend). The guest's
local `S.contest` is a mirror of `ctc`; she plays rounds 1-2 and the between-round card on it; `tg` overrides the host's NPC-style auto score
for her rounds. `contestEnd` runs once (host): one winner; a crowned guest takes rank 7 from `ctcRes` (and from the friend-entry write-back:
`queen` set by the host = rank 7).
### 11.1 Single-winner rule (host decides)
Whenever two people (players or NPCs) want the ONE thing the world has one of — a seat, a crown, a contest prize, a unique item, the
Emperor's praise for the best gift, the Emperor's one night, the fate of an NPC both acted on — the HOST's run decides, by the same rule it
uses for NPCs; the other player gets the normal "lost / not chosen" outcome of that rule. Implemented: contests, gift praise, Tranh ghế
(this section); NPC deaths / confinement / rank (merge rule 5, host wins); world events (muted on the guest, section 4.1).
Not yet wired (known gaps, see dev/handover/reports/coop-contest.md): the Emperor's night (`S.ntk` is personal: both clients can each
take the same night) and unique shop items (no shared stock exists yet).
