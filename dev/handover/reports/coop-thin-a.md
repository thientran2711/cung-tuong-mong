# coop-thin A — FOUNDATIONS (thin guest, part A) — SẴN SÀNG KIỂM 89a9dc78

Worker session_01UV1SzhV65dmdFBM2xfFYvT (opus), coordinator MAIN s27. Branch **review/coop-thin-a** from live main f5220eaa.
Audit: reports/coop-thin-guest-audit.md §2-3 (part A). Owner GO 17/11 01:40Z. START_CTX ≈ 3 % (1M window).
**No player-visible change; flag off by default. Worker NOT deployed** (main deploys after reviewer PASS).

## What
1. **Worker** (coop/worker/src/index.js; old clients never send these, so they are unaffected):
   - `thin {cap,v,want}`: each seat tells its build's capability + build id; the host also its wanted level. Room level
     `m.thin = min(want, cap a, cap b)`, **0 while a seat has not told it or the builds differ** (build-match, as swreg's hold). Broadcast `{t:"thin",lvl}`.
     Room reply carries `caps:["seatd","thin"]` and `thin`.
   - `snap {v,o}` host only → stored (putBig "hsnap", version m.hv) = the room's latest save, acked `snapok`, relayed to the GUEST only.
   - `delta {v,base,set,del}` host only, accepted only when base === m.hv and v = base+1 (else `snapresync` to the host), applied on the stored
     snapshot (dot paths, arrays travel whole, __proto__/constructor/prototype refused), relayed to the guest only.
   - `snapreq` (guest): the stored snapshot again (version gap). Guest rejoin while level > 0: the stored snapshot is sent after the room reply.
   - `do {op,args,base,id}` guest only, relayed to the HOST only with the room sequence n; level 0 → `nothin`; no host online → `nohost`; > 20 KB → `bado`.
2. **Client** dev/build/jcoopthin.js (new, last module; assemble.py appends it):
   - level + capability: says `thin` on every room reply / friend back online; `TH.on(n)` = co-op on, not CW.hold (build-match), level ≥ n.
     Host want comes only from the dev flag `localStorage ctm-thin=n` / `?thin=n` (default 0 → nothing turns on). TH.CAP = 1.
   - **`withSeat(seat,fn)`** (host only): swaps S (her personal keys; WORLD keys shared by reference; her personal part of emp.known / cm / men
     swapped in), the viewer rows of every NPC (rel/oan/ghen/ev ↔ rl/ro/gp/ep[pid]) and every "me" ref (one-pass viewer map, keys + REFF values,
     NPC trees and world keys), pulls her friend entry and puts the HOST in as the friend entry (id 901, built by jcoopworld buildFriend), and the
     registered per-player module state. render / showModal / save are no-ops inside; quiet on. Exit reverses all; what her turn did to the host's
     entry comes back through `TH.bridge` (STAT + rl/ro rows; baseline taken after rstats). Her state is stored serialized (TH.seatOf/seatDrop),
     built from the room's P.b on first use.
   - registry `TH.reg(name,get,set)`: core used, deck, Q, popIdx, popMsg + 18 per-player engine globals from the top-level scan
     (ACTX EVHOLD EVLAST wkPend jointScheme0 SUCC_NPC NOLUCK FORCE EIT_PIL EVB_ART inFlip stoleFrom NLP NLR DEED85 DT85 TR_DEED K61PASS).
     Room-wide ids (rid, sidN) stay shared; UI/picture caches stay per phone. Module state inside IIFEs cannot be reached from outside: those
     modules must register themselves when their part moves (the tripwire names them).
   - **room RNG** `TH.rng(stream)` sfc32 seeded by room code + week + stream (same draws on both seats), `TH.R / TH.pick`, log of last 200 draws.
     Not wired into any rule yet (part A).
   - snap/delta client: host `snapSend / deltaSend` (diff of plain objects vs last sent), auto when level ≥ 1 (level on, each merged week, debounced
     after render); `snapresync` → full. Guest `TH.view {v,o}`, gap → `snapreq`. Intents: guest `doSend(op,args)`, host `onDo(op,fn)` runs fn in
     withSeat("b") and answers by delta (dn/dr in the view). Test op "probe". Snapshot shape (part A pipe): date, buổi, P.a + P.b, R, rid.
3. **jcoopworld.js** (small): me/fp/fs follow `CW.ctx||CW.seat`; fromCanon wrapped (`CW.inFC` counter + `CW.afterFC` test hook);
   `CW.X` exports the world split + friend-entry builders (one source for jcoopthin).
4. **Guest tripwire** dev/test/coop-thin-trip.js (test-only init script; `TRIP=1 node dev/test/coop-bot.js 4`): deep Proxies on the guest's
   S / rivals after every fromCanon; every write that CHANGES a value outside fromCanon is counted with the function name and where it landed
   (W.<world key>, S.<her key>, R.<NPC key>, Rarr). Limits: writes through a local ref to a fresh object before it is reached via S/rivals are missed.

## Tripwire count today (progress meter; thin guest = 0)
Scripted 4-week co-op run (coop-bot, live Worker, random bot acts), two runs:
| run | changing writes | every write (incl. same value) | W (world keys) | S (her person) | R (NPCs/friend) | Rarr | fn×root sites |
|---|---|---|---|---|---|---|---|
| 1 | **22 377** | 75 853 | 56 | 21 197 | 1 046 | 78 | 337 |
| 2 | **20 897** | 63 602 | 64 | 19 725 | 1 030 | 78 | 324 |
Top writers (run 1): wdOf S.__wdmig 12 352 · log S.logs 5 816 · logChoice S.logs 860 · wdOf R.__wdmig 518 · mbAdd S.mood 318 · leAttire S.toilette 238 ·
emoWeek S.emoSnap 141 · placeWhere S.menW/S.where 146 · refreshHere S.visit 93 · palFix R.resHead 60 · applyWhere S.where 56 · servCauses R.staff 56 ·
pullFriend/pushFriend Rarr 77 · endTurn R.inv 40. Full list: coop-bot OUT/trip.json. Report the number per part as "≈21 k changing writes, ~330 sites".

## Tests (all on 89a9dc78 or its parent with identical build)
- quickcheck: **PASS** (open 1029 ms · old save ok · perf new/live render 247/250, tab 326/298, buổi 855/863 ms · core gates PASS).
- coop-e2e both seats: **60/60**; roles swapped (COOP_SWAP=1, iPad hosts): **60/60** (both include old save + solo).
- coop-thin-a.js flag off on live Worker: **18/18** (level 0, no snap/delta/do on the wire, withSeat round trip seat a + b = state before == after,
  host as friend entry 901, write in context b lands only in her S + rl[902], refused on guest, room RNG same on both seats, hold → off,
  week merges, round trip after the merged week); swapped roles **18/18**.
- coop-thin-a.js level 1 on a LOCAL Worker with part A (wrangler dev): **23/23** (+ level on both, snapshot to guest, delta, gap→snapreq→full,
  intent "probe" run by the host in her context, host state intact); swapped **23/23**.
- Worker `npm test` incl. new test/thin.test.mjs: **ALL OK** (+ chat, ws tests OK).
- coop-bot 4 weeks ×2: 0 divergence, 0 page errors.
Test fixes (whole group): coop-bot.js + coop-play.js lobby regexes were stale ("Cùng hảo hữu"/"Mời hảo hữu").

## Notes for B
- B pilots withSeat: run start/nlRun for her in context b; register any per-player module state it touches (tripwire shows it).
- TH.bridge applies only STAT + rl/ro of the host's entry; D/F extend it (or replace with ops).
- coop-stable #2 and coop-contest-fix #2 sessions were inactive (message not delivered); night-final #5 told of the touched lines.
