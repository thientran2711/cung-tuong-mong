# coop-thin A — FOUNDATIONS (thin guest, part A) — SẴN SÀNG KIỂM 89a9dc78 (contract for B/D at the end)

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

## CONTRACT A → B / D (and every later part) — build on this, do not guess
Code: review/coop-thin-a 89a9dc78 — dev/build/jcoopthin.js (header lists the API), coop/worker/src/index.js (block "thin guest, part A"),
coop/worker/test/thin.test.mjs, dev/test/coop-thin-a.js, dev/test/coop-thin-trip.js.

### C1. Part levels and the flag
- Part numbers: A=1, B=2, C=3, D=4, E=5, F=6 (F1–F6 share 6; sub-flags inside the part if needed), G=7, H=8. THINMAX on the Worker = 9.
- A part's code runs only when `COOPW.thin.on(n)` is true (co-op on, not `COOPW.hold`, room level ≥ n). The OLD path runs otherwise —
  and the part DELETES that old path when it ships (OD 17/11: no long-term mix), so in practice: new path behind `on(n)` until PASS, then the old branch goes.
- A part that ships raises `TH.CAP` in jcoopthin.js to its number. **B and D run in parallel**: B sets CAP≥2 and D CAP≥4 only together with
  the parts below them that are merged; if D merges before B, D must still gate on `on(4)` and CAP=4 implies B present — so the LAST merged of the
  two sets CAP=4; until both are on main, CAP stays at the lower merged one and the other part's code is reachable only by its own test flag
  (`localStorage ctm-thin-part-<n>=1`, read by that part, test-only). Reviewer checks CAP when merging.
- Host want = dev flag only (`localStorage ctm-thin=n` / `?thin=n`), default 0. Turning it on for players is a separate owner-visible decision.

### C2. withSeat(seat, fn) — host only (`COOPW.thin.withSeat`)
- Throws on the guest ("host only"), and on nesting into another seat. `withSeat(CW.seat, fn)` = fn().
- Inside (`COOPW.ctx === seat`): `S` = her full person (her personal keys + the SHARED world keys by reference); every NPC shows HER viewer rows
  (rel/oan/ghen/ev) and HER "me" refs; the host is the friend entry (rival `{coop:true,id:901}` or a coop servant in a mistress's staff);
  `me()/fp()/fs()` inside jcoopworld follow `CW.ctx`; registered globals are hers; `render/showModal/save` are no-ops; `quiet=true`.
  `pushModal`/`Q.push` inside go into HER Q (part D turns that Q into serialized cards).
- After: host state is exactly as before except (a) world keys / NPC fields she changed, (b) her viewer rows on NPCs (rl/ro/gp/ep[902]),
  (c) `TH.bridge` = what her turn did to the HOST's entry (STAT keys + rl/ro rows), already applied to the host's S. Anything else done to the
  host's entry (items, kids, pets, flags) is NOT bridged yet: D/F add it (extend the bridge in jcoopthin.js, one place).
- Her stored state: `TH.seatOf("b")` → `{S (serialized, refs as {$r}/{$k}), ok, pers, g, fresh}`; built from `CW.base.P.b` on first use;
  `TH.seatDrop("b")` forces a rebuild (do it after a new life / `me`, and B's host-side rebirth must set it). Today a merged week does NOT drop it
  automatically — **B decides**: after B the host is the source of her person, so the store must survive weeks and be what `toCanon` writes as P.b.
- NOT done in A (owner of the next step): `normAll()`/`deserQ` on her state (B), her Q as cards (D), her khắc/buổi clock (E).
- Round-trip guard: `TH.selfTest()` must stay ok; every part's test calls it after its own flow.

### C3. Per-player module state registry
- `TH.reg(name, get, set)` — name of a global, getter, setter; the default value is captured at registration (deep copy) and is what a fresh
  seat starts with. Registered today: used deck Q popIdx popMsg ACTX EVHOLD EVLAST wkPend jointScheme0 SUCC_NPC NOLUCK FORCE EIT_PIL EVB_ART
  inFlip stoleFrom NLP NLR DEED85 DT85 TR_DEED K61PASS (`TH.REG` lists them).
- A module whose per-player state lives INSIDE an IIFE registers itself from its own file: `if(window.COOPW&&COOPW.thin)COOPW.thin.reg("x",()=>x,v=>{x=v})`.
- Rule: a part that moves code into withSeat registers every module-level per-player variable that code reads/writes, else her data leaks
  into the host's screen. Shared (never register): rid, sidN, tab and UI/picture/DOM caches.

### C4. Room RNG
- `TH.rng(stream)` float in [0,1); `TH.R(n,stream)`, `TH.pick(a,stream)`. Seed = room code + COOP week + stream name; streams restart each week.
  Log `TH.rlog` = last 200 `[week, stream, i, value]`.
- Use it ONLY on the host for rules that move there; name streams by area ("life", "buoi", "night", "act:<k>"…). Not wired into anything yet;
  `Math.random` stays for everything A did not move.

### C5. Wire protocol (Worker coop-2 + part A; old clients never send these)
| t | who → | fields | server does |
|---|---|---|---|
| thin | both → server | cap, v (build id), want (host) | m.thin = min(want, cap a, cap b), 0 if a seat unknown or v differ; bcast `{t:"thin",lvl,was,cap:{a,b}}`; if it turned on, stored snap → guest |
| snap | host → | v (≥1, host's counter), o (full state) | store "hsnap" + m.hv=v; `snapok` to host; relay to guest only. Level 0 → `nothin`; > 6 M chars → `snapbig` |
| delta | host → | v = base+1, base = m.hv, set {path:val}, del [path] | apply on stored snap; else `snapresync{v:m.hv}` to host (host sends a full snap); relay to guest only |
| snapreq | guest → | — | stored snap to that guest |
| do | guest → | op (≤40 chars), args, base (her view v), id | relay to host only as `{t:"do",from:"b",n,op,args,base,id}` (n = room sequence); errors `nothin`/`nohost`/`bado` (with id) |
- Paths: dot-separated object keys; arrays travel WHOLE (the client diff never enters an array); `__proto__/constructor/prototype` refused.
- Guest on join while level > 0 gets the stored snap right after the `room` reply.
- Snapshot SHAPE (`TH.hostView`, grows per part): `{w, buoi, P:{a: host S ser, b: her stored S}, R, rid, dn, dr}`. dn = last intent seq
  run, dr = `{id, op, r}` its result. Parts ADD keys; never rename these (the guest code of later parts reads them).
- Intents: host `TH.onDo(op, fn(args, msg))` — fn runs inside withSeat("b"); return value → dr.r; a delta goes out at once. Op names to use:
  life (B: Luân hồi choice), pick (D: dialog choice `{card, i}`), ready (E), act/go/buy/use/wear/mg… (F). Guest `TH.doSend(op,args)` → id.
- Not yet: retries / acks of a lost `do` (the host's `dn` in the view is the ack: the guest resends when dn stays below her n after a reconnect — D/H decide).

### C6. Tripwire (the meter)
- `TRIP=1 node dev/test/coop-bot.js 4 <out>` (live or any Worker) → line "TRIPWIRE … N" + `<out>/trip.json`.
- Counts writes that CHANGE a value on the guest, outside jcoopworld fromCanon (`COOPW.inFC`), by `[function, root]`; roots: `W.<world key>`,
  `S.<her key>`, `R.<NPC key>`, `Rarr` (the rivals list). Baseline today ≈ 21 k (W ~60, S ~20 k, R ~1 040, Rarr 78), ~330 sites.
- Each part reports: before/after total + the roots it owns. B owns the life-creation writers (newRival/start/attach paths, names), D owns
  dialog/res/famApply/petApply writers, and neither may raise another root. The bot is random: compare medians of 2 runs.
