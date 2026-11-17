# coop-thin C — WORLD READ-ONLY ON THE GUEST — WIP (rollover handover below), review/coop-thin-c @ 72d7768c

PRIORITY #1 CHECK ('coop-thin|thin guest|worldOn|guestNet|unroll|jcoopone|coopAsk|lens'): OD 4 (17/11 ~01:15Z/~01:40Z/~02:05Z/~02:15Z) | ledger 0 | main 6ca04148 (part A only) | review/* coop-thin-b-r3 fee14ec5 (base: B+D PASS), no part C branch existed | claims: this worker only.

Worker session_01N1tNP3cKHdwErdUNmEWMpa (opus), coordinator Foreman B s5 session_01N1tNP5TgfuFGPjgoMfV7Tx. START_CTX ≈ 4 % (used_tokens reads 0; estimate). Rollover at ≈ 29 %: reached → handover (section "ROLLOVER HANDOVER").
Brief: dev/handover/briefs/coop-thin-c.md. Spec: audit coop-thin-guest-audit.md §3 row C; contract coop-thin-a.md C3–C6; reports coop-thin-b.md (THIN_REG, withSeat, D.later/D.kind, TH.held), review-coop-thin-b-r3.md (CAP 2→4).

## Design (dev/build/jcoopthinc.js, header = design; all behind TH.on(3); solo + rooms below level 3 run nothing new)
ONE rule in ONE place: on the guest the WORLD (every NPC entry, the NPC list, the world keys of S) is a **lens** over the host's world.
- A write never lands in it: it goes into the open **frame** (copy-on-write per object; code inside the frame reads its own writes).
  - WORLD frame = the guest's endTurn / nextBuoi / monthTick / render and every server message (COOP.rxWrap, new hook in jcoop.js rx): **dropped**
    at its end, except her own viewer rows (rel/oan/ghen/ev/evm.me) her week computed → op `rows` (numbers by delta; before C these were kept by guestNet and merged by delta).
  - ACT frame = runAct with her as actor, chooseM, any other write outside a frame (implicit frame, closed at the microtask): **NPC ops**
    `{t:"npc",id,b,a}` / `{t:"add",id,a}` / `{t:"rm",id}` / `{t:"w",k,b,a}` → `TH.doSend("npc")` → host applies in withSeat("b") with a 3-way rule
    (number: host + (a−b); other values: hers if she changed it; arrays of objects by id/sid/ci; hh never travels — bound accessor). Implicit frames
    send only NPC/list ops (display code writing world keys — figUsed fidUsed, k61 thO — is dropped).
  - Her own parts of world keys (emp.known, cm CM_P, men MEN_P) pass through (her person).
- The world on her phone changes ONLY from the host: merged week (fromCanon; lens installed in fromCanon0 via CW.lensR before deser resolves refs /
  rebuilds cards, CW.lensW after) and the host's delta between weeks (`thinview` → C.apply: host view R + host S world keys mapped to her perspective,
  replaced IN PLACE so a card holding an NPC sees it). Level switching mid-game: C.relens (ser → deser with/without lens).
- Her week end carries the room's world unchanged (CW.cW hook in toCanon) → server merge3 = host + 0 for W (no Worker change, no deploy).
- G7 moved: guest `pickTarget` → null, `runAct` with an NPC actor → "" (NPCs act on the host only); host `rivalsBuoi` runs with her entry in the
  harem through B4's `b4Wrap` (items/children as res ops, numbers with the week's toCanon write-back, like rivalsTurn/rivalsMonth).
- Persons she causes: the frame shows a new NPC in the list → op `add`; host pushes it with the same id if free (else next id, answer `re`, her
  rl/ro/known follow), one name (newRival name if taken). jcoopask's `guest()` is false in a C room (no temp ids, no requests).
- B/D in a C room: D.rvIn → null (no row tracking / nv patches; host world keeps her rows); B life accept → host world takes her new rows.
- TH.CAP 2 → 4 (B, C, D all on this branch); TH.doFn(op) added (C wraps B's "life").
- Tripwire (dev/test/coop-thin-trip.js): lens objects are not wrapped; writes into them counted apart (`lens`); S world-key accessors counted as lens;
  the friend entry is root F (D/F), not W. New fields in __trip(): world (= W+R+Rarr), lens, lensStat.

## Retired vs kept (question sent to Foreman B 12:5xZ, no answer yet; B precedent 07:10Z = old path stays until H)
Bypassed in a C room (one switch), deleted when level ≥ 3 is the default: guestNet/unroll/netWrap (jcoopworld netWrap returns early on TH.on(3)),
HOST_ONLY copies + numeric W merge (CW.cW), jcoopask temp ids/requests (guest()), D row tracking (rvIn), B old-rows rule.
STILL RUNNING in a C room (harmless under the lens; decide with Foreman): jcoopone MUTE/ONLY_ME/PERSON, jcoopworld mute(rivalsTurn/Month/festival),
inline worldOn (j3:92, j8:390, j13:27/69, j42:182/186, jgift:233), module guards (jdemo/jdh/jdh2 npcOK, jlux, jmline, jmort, jpet, jpetlife, jpromo,
jseat, jstaff, jsteal, jvisit, jagent). Reason: several are not state guards but "who rolls a world EVENT" (jvisit: host rolls Emperor visits for both;
MUTE epidemic/moodMonth/tdNews …: their news + effects on HER come from the host via cnews/write-back). Removing them makes the guest roll world
events again (fabricated news, double illness on her). Proposal: keep them as the ONE "who rolls" rule (worldOn), retire with E/G.

## Tests so far (LIVE Worker https://ctm-coop.victoria-tntt.workers.dev, part A; level 3 needs no Worker change)
- **dev/test/coop-thin-c.js L3 (Fold 686 host, iPad 1180 guest): 14/14** (TRIP=1) on 72d7768c: C1 lens guest-only · C2 ACT script 17/17 kinds with an
  NPC effect (her world untouched, host applied once, back on her phone, host numbers == hers) · C3 person she causes = host-made id 11, one copy,
  unique names · C6 host delta in place · C4 week merged, sent W == base W, world loops dropped (drop 153→198, 980 roots), one world on every NPC
  number · C5 G7 (guest pickOff 22, host rivalsBuoi with her 2×) · **C7 tripwire guest W/R/Rarr writes = 0** (lens catches 17 696, S 10 157) · no page errors.
- ACT before/after (L3, swap 0; 49 kinds: 18 with a target this run, 31 "no target" in the scripted state):
| kind | ops | NPC fields changed by her act | her world untouched | host applied + back on her |
|---|---|---|---|---|
| spy | 1 | rel oan cz mem | yes | yes |
| ally | 1 | rel oan cz | yes | yes |
| rumor | 1 | evm rel oan cz mem | yes | yes |
| frame | 2 | evm rel oan cz mem slightAt emo emoH (+ w emp) | yes | yes |
| poison | 1 | cz | yes | yes |
| bribe | 1 | maid evm cz mem | yes | yes |
| block | 1 | evm cz mem | yes | yes |
| ksab | 1 | kids cz | yes | yes |
| gift | 0 | — | **NO (her NPC changed, no op: open item)** | — |
| lygian / slowpoison | 1 | cz | yes | yes |
| huydung / rash / thathu | 1 | evm cz mem | yes | yes |
| giahoa | 1 | evm rel oan cz mem emo emoH frT92 | yes | yes |
| spyk | 1 | rel oan cz mem | yes | yes |
| bribel | 1 | maid evm cz mem | yes | yes |
| batnat | 1 | danh suc oan tsbBul slightAt emo emoH cz | yes | yes |
| takeaway (earlier run) | 1 | kids rel oan … | yes | yes |
| phatquy (earlier run) | 1 | suc rel oan pen … | yes | yes |
No target in the script state (successor must stage them): accuse musk catswap kpoison pond kframe vp plant steal road pushp trip tocao expose xinhh
trinhth trinhhh uyhiep banphe tieuhuy tat laydo laydol blockf phonghoa thaopet petcare petsteal pgift.
- NOT RUN YET: swap; L4; coop-bot TRIP=1 THIN=3 4-week meter (before/after); thin-a/b/d suites + probes R7–R10 (b-r1/b-r3, d-probe); coop-e2e 62/62 (+swap);
  coop-p2; coop-b1; coop-one-world; one-core-guard; quickcheck; CAP=4 level run; Fold 755x1000@2 + iPad 1180x820@2 shots both seats; merge origin/main.

## ROLLOVER HANDOVER (worker session_01N1tNP3cKHdwErdUNmEWMpa, 11/17/2026) — for the successor (Foreman B opens it)
Why: context ≈ START_CTX 4 % + 25 % (owner OD:L1217 / 16/11 08:22Z s14). Branch pushed: **review/coop-thin-c @ 72d7768c** (2 commits on fee14ec5). Nothing uncommitted.
Next, in order:
1. Remove the two debug hooks in jcoopthinc (C.dbgE in the world-key getter, C.dbgI in open()) once green; keep C.log.
2. "gift" ACT: her NPC changed with no op → find the write path that bypasses the lens (likely a raw NPC ref held in S or an item object shared
   between her inv and the NPC's); fix at the root (refs in S must be lens proxies: deser resolves them via rivals = lens, check gift's code path).
3. Stage targets so EVERY ACT kind runs (kids for kpoison/pond/kframe/vp, pets for thaopet/petcare/petsteal/pgift, items for laydo/laydol/steal/plant,
   rank/conditions for xinhh/trinh*/uyhiep/banphe/tieuhuy/tat/phonghoa/blockf/tocao/expose/accuse/musk/catswap/pushp/trip/road) — gate = every kind.
4. Gates in the brief: swap 1; L4 (CAP=4 build: level 4 = B+C+D); coop-bot `TRIP=1 THIN=3 node dev/test/coop-bot.js 4 <out>` (median of 2,
   before = THIN=2) → W/R/Rarr = 0; coop-thin-a L0/L1, coop-thin-b L2/L4 (+ swap), coop-thin-b-r1 DFLAG=1, coop-thin-b-r3, coop-thin-d L4 + d-probe;
   coop-e2e 62/62 + COOP_SWAP=1 (level 0 = old room unchanged); coop-p2; coop-b1; coop-one-world; one-core-guard; quickcheck (build_site.sh +
   committed index.html/sw.js/assets.json first); shots Fold 755x1000@2 + iPad 1180x820@2 both seats (outside git; CDN img/_review/coop-thin-c/).
5. Merge origin/main when Foreman B lands B+D (generated files: rebuild).
6. Foreman B's answer on deleting the old guards (question above); then report "## Done", CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B.
Known risks to test: performance of the lens on the guest (every NPC read goes through a Proxy; measure buổi/render on the guest Fold);
implicit frames from timers sending NPC ops (C.log "sent"); a host delta arriving inside an open implicit frame (C.apply flushes first).
Setup: worktree /home/user/wt/thinc (sparse, hooks installed); test logs /home/user/wt/thinc-out; handover worktree /home/user/wt/hoC.
Commands: python3 dev/build/assemble.py; `TRIP=1 OUT=<dir> node dev/test/coop-thin-c.js <W> 3 [swap]` (NOACT=1 skips the ACT script, ~4 min vs ~12).
