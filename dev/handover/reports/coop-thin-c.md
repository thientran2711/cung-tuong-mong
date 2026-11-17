# coop-thin C — WORLD READ-ONLY ON THE GUEST — SẴN SÀNG KIỂM review/coop-thin-c @ 475beba7 (#1 WIP 72d7768c + ## #2 below)

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

## #2 (worker #2 session_01N1tNP6EZvNuroq8VSupxw7, 11/17/2026) — DONE, review/coop-thin-c @ 475beba7

PRIORITY #1 CHECK ('coop-thin-c|lens|DOMAX|bado|stateOn|oldRun'): OD co-op thin-guest 17/11 ~01:15Z/~01:40Z/~02:05Z/~02:15Z | ledger 0 | main abe056c3 (part A only; B fee14ec5 not on main yet) | review/* coop-thin-c 72d7768c (this branch), coop-thin-b-r3 fee14ec5 (base) | claims: this worker (row 785).
START_CTX ≈ 4 % (used_tokens reads 0; estimate). Rollover not reached.

### What changed in #2 (on top of 72d7768c)
1. **Merged origin/main** 25bfd7cf (makeup-theme) + origin/main 7e0250ec (world-events, one-core-dup3, trait-rename, staff-root-fix; j2 conflict: allyBond kept, reads ONE key BAL.eff.j2.start, BAL.allyRel dropped per r3 note) (assemble keeps thin B/C then regSweep; site rebuilt).
2. **Her act was being dropped by the Worker (found by the gift / vp runs):** an NPC op carried the whole NPC before + after (~10 000 chars each with memories); the Worker refuses an intent over DOMAX = 20 000 chars (`bado`, coop/worker/src/index.js:15/228) — silent on the guest, the act never reached the world. Fix in jcoopthinc (no Worker change): ops carry only what changed (`prune`: plain objects cut to the differing keys, recursively; m3 reads a missing key as "untouched", b-only as "removed", a-only as "added"), packs under 17 000 chars, an op too big is cut by keys (`split`; each part is a valid op); `bado` / unsplittable are counted (C.stat.bado / big) and asserted 0 (C9). m3: an object she adds that the host also holds merges key by key. Unit check: 300 random NPC ops, prune+split+m3 == m3 on the whole op.
3. **Gift**: not a lens bypass — the test called runAct without the item index (giveTo(ix undefined) = no act). With the index (and the act frame fix 5) gift = 1 op, applied once, back on her phone.
4. **ONE SWITCH for the old guest state guards** (Foreman B 17/11: bypass now, delete at H): jcoopworld `thinW()` = the switch (a C room), `stateOn(name)` = may the world write run here (solo / host / C room), `oldRan(name)` counts every run of an old guard (COOPW.oldRun). Wired: toCanon HOST_ONLY copies, guestNet/unroll, netWrap, jcoopask temp ids (guest()), part D row tracking (D.rvIn), part B old-rows rule; jcoopthinc's `on()` = thinW(). Test C8: COOPW.oldRun = {} on both seats in a C room.
5. **Act frame closed early**: a render / buổi step inside her act (kpoison, kframe call render) flushed the act frame; the rest of the act went implicit. Now a world entry closes only an IMPLICIT act frame; an explicit act (runAct / chooseM) stays open, the nested world frame runs on top (reads see the act, its writes drop).
6. **World key she lacks** (monthTick created S.storms on her S = 1 W write in the bot): every W key gets the lens accessor, present or not.
7. Ops wait in order while the room holds (COOPW.hold: two builds) instead of failing; the lens frames stay on while the lens is installed (lOn).
8. Host as a cung nữ in an NPC's palace (her view's coop staff entry, built by placeFriend) survived nothing: the host's delta (into) wiped it. Kept across C.apply (found by d-probe P3 at level 4).
9. ONE CORE text (quickcheck G1): part D's "Từ chối, bẩm chủ" option typed "nắm 1 chứng cứ" → prints BAL.eff.jcoopworld.evBriber (one-core-dup3 family; main has the same fix on its copy).
10. Tests: coop-thin-c.js stages a target for every ACT kind (world part on the host in withSeat b, her part on her phone), passes the item index (gift/plant), deep diff, C8 (old guards 0), C9 (bado 0), SHOTS=<dir> (Fold 755x1000@2 / iPad 1180x820@2). coop-thin-d-probe.js level-aware at >= 3: P3 harness adds the host's servant entry in the sync layer (like placeFriend), P5 asserts the one world (her rows in the host world at once, counted once after the merge).
11. Debug hooks C.dbgE / C.dbgI removed.

### Gates (LIVE Worker ctm-coop.victoria-tntt.workers.dev, part A; level 3/4 need no Worker change)
| gate | result |
|---|---|
| coop-thin-c L3 (host Fold, guest iPad) | 16/16 post-merge (17/17 pre-merge r11); ACT 47/47 |
| coop-thin-c L3 swap (iPad hosts) | 16/16 post-merge; ACT 48/48 |
| coop-thin-c L4 (B+C+D, CAP 4) | 16/16 post-merge; ACT 49/49 pre-merge r12 |
| C7 tripwire guest W / R / Rarr writes | 0 in every run (lens catches ~18 000 / run) |
| C8 old guest state guards run in a C room (COOPW.oldRun, both seats) | {} / {} |
| C9 intents refused by the Worker (bado) / unsplittable ops | 0 / 0 (54–62 packs per run; largest NPC field 2 943 chars) |
| coop-bot TRIP=1 4 weeks, world writes W+R+Rarr | before THIN=2: 1 006 (W 95, Rarr 75, R 836; + F 208) · after THIN=3: 0 / 0 / 0 (3 runs after the storms fix; run 1 before it: 1, W.storms monthTick) |
| coop-e2e (level 0 = old room) / COOP_SWAP=1 | 63/63 / 63/63 |
| coop-p2 | 45/46 — FAIL "B1 guest: an NPC bribe reaches her as the j42 card" (check added on the B/D branch; main 45/45 has no B1); level 0, part C code does not run there → for Foreman B |
| coop-b1 | 34/41 — the laydo / takeaway family FAILs; origin/main 7e0250ec itself: 24/41 (same family + more) → main regression, not part C |
| coop-thin-a L0 / L1 | 19/19 / 24/24 (one L0 run 16/19: withSeat host-as-servant origin, rerun 19/19) |
| coop-thin-b L2 / L4 / L4 swap | 148/148 / 148/148 / 148/148 |
| coop-thin-b-r1 L2 | 39/39 |
| coop-thin-b-r3 DFLAG=1 L2 | 25/25 (one run 23/25 R10, rerun 25/25; the first main merge alone gave 22/25 R9 → flaky on new main) |
| coop-thin-d L4 | 52/52 |
| coop-thin-d-probe L1 / L4 | 35/35 / 35/35 |
| coop-one-world | PASS |
| one-core-guard | PASS |
| quickcheck (475beba7) | PASS · core gates PASS · old save ok · perf render 149/157 ms, buổi 664/897 ms (new/live) |
| prune/split/m3 unit (300 random NPC ops) | PASS |
| shots Fold 755x1000@2 + iPad 1180x820@2, both seats (L3 and L3 swap) | CDN img/_review/coop-thin-c/ (L3-host-fold755, L3-guest-ipad1180, L3-host-ipad1180, L3-guest-fold755) |

### ACT kinds from the guest (whole family, staged targets; before = solo engine diff in her frame, after = host world + her phone)
| kind | target staged | ops | NPC fields her act changed (solo engine, her frame) | her world untouched | host applied once + back on her (L3 / L3 swap / L4) |
|---|---|---|---|---|---|
| spy | no | 1 | rel oan cz mem | yes | yes / yes / yes |
| ally | no | 1 | rel oan cz | yes | yes / yes / yes |
| rumor | no | 1 | danh cz | yes | yes / yes / yes |
| frame | no | 2 | evm rel oan cz mem slightAt emo emoH | yes | yes / yes / yes |
| poison | no | 1 | cz | yes | yes / yes / yes |
| accuse | yes | 1 | rel oan ev accT slightAt emo emoH cz mem | yes | yes / yes / yes |
| bribe | no | 1 | maid evm cz mem | yes | yes / yes / yes |
| block | no | 1 | block oan cz emo emoH bel | yes | yes / yes / yes |
| musk | yes | 1 | suc preg hidden ro emo emoH cz bel blamed | yes | yes / yes / yes |
| catswap | yes | 1 | oan emo emoH cz bel catplot | yes | yes / yes / yes |
| ksab | no | 1 | kids cz | yes | yes / no target / yes |
| kpoison | no | 1 | cz | yes | yes / yes / yes |
| pond | no | 1 | evm rel oan cz slightAt emo emoH mem | yes | yes / yes / yes |
| kframe | yes | 1 | cz | yes | yes / yes / yes |
| takeaway | no | 1 | rel oan slightAt emo emoH cz mem | yes | yes / yes / yes |
| vp | yes | 1 | danh inv rel oan emo emoH cz mem wd vpT92 | yes | yes / yes / yes |
| plant | no | 1 | evm rel oan cz mem emo | yes | yes / yes / yes |
| steal | no | 0 | — | — | no target / yes / yes |
| road | no | 0 | — | — | no target / yes / yes |
| gift | no | 1 | inv rl rel oan cz mem wd | yes | yes / yes / yes |
| pushp | yes | 1 | suc rel oan emo emoH cz mem bel | yes | yes / yes / yes |
| trip | no | 1 | evm rel oan cz emo mem bel | yes | yes / yes / yes |
| lygian | no | 1 | evm rel oan cz mem emo emoH | yes | yes / yes / yes |
| slowpoison | no | 1 | evm rel oan cz mem | yes | yes / yes / yes |
| tocao | yes | 1 | ev cz dhWhy badWk | yes | yes / yes / yes |
| expose | yes | 1 | sung ev dhWhy coldBy | yes | yes / yes / yes |
| xinhh | yes | 1 | cz | yes | yes / yes / yes |
| trinhth | yes | 1 | ev cz | yes | yes / yes / yes |
| trinhhh | no | 2 | confined rel ev cz dhWhy badWk emo emoH mem | yes | yes / yes / yes |
| uyhiep | yes | 1 | oan cz emo emoH slightAt | yes | yes / yes / yes |
| banphe | no | 1 | oan ev cz emo emoH | yes | yes / yes / yes |
| tieuhuy | yes | 1 | rel oan ev cz emoH | yes | yes / yes / yes |
| huydung | no | 1 | sung danh evm cz mem scar | yes | yes / yes / yes |
| giahoa | no | 1 | evm rel oan cz mem emoH frT92 | yes | yes / yes / yes |
| tat | no | 1 | rel oan cz mem slap | yes | yes / yes / yes |
| phatquy | no | 1 | suc rel oan cz mem pen | yes | yes / yes / yes |
| rash | no | 1 | evm cz mem | yes | yes / yes / yes |
| laydo | yes | 1 | rel oan cz | yes | yes / yes / yes |
| laydol | no | 1 | rel oan cz | yes | yes / yes / yes |
| spyk | no | 1 | rel oan cz mem | yes | yes / yes / yes |
| bribel | yes | 1 | maid evm cz mem | yes | yes / yes / yes |
| blockf | yes | 1 | cz block | yes | yes / yes / yes |
| thathu | no | 1 | cz | yes | yes / yes / yes |
| phonghoa | no | 1 | cz | yes | yes / yes / yes |
| batnat | no | 1 | evm oan tsbBul slightAt emo emoH cz mem | yes | yes / yes / yes |
| thaopet | yes | 1 | cz pets | yes | yes / yes / yes |
| petcare | no | 1 | rel cz pets | yes | yes / yes / yes |
| petsteal | no | 1 | evm rel oan cz emo emoH mem | yes | yes / yes / yes |
| pgift | no | 1 | evm rel oan cz mem | yes | yes / yes / yes |
(no target in one run = its staged condition was undone by an earlier act of the same run; every kind is green in at least two of the three runs, none NO)

### Tripwire / meter (coop-bot TRIP=1, 4 weeks)
see the gates table (coop-bot row). Not C: the post-merge THIN=2 "before" run stuck at week 1 (pre-merge THIN=2 ran 4/4); the first THIN=3 run stuck at week 3 after the guest died twice (seatresync) — the three later THIN=3 runs played 4/4 without a death. Rebirth at level 3/4 is covered by coop-thin-b L4 148/148.

### Old guards: bypassed by the one switch now, cut at part H (level ≥ 3 default)
Bypassed now through ONE switch (jcoopworld thinW / stateOn / oldRan; asserted 0 runs in a C room), DELETE at part H:
- dev/build/jcoopworld.js:42 HOST_ONLY + :126 the toCanon copy (stateOn "hostOnly"); :206 unroll, :214 unrollR, :216 guestNet (stateOn "guestNet"), :225 CW.netWrap (stateOn "netWrap") + dev/build/jcoopone.js:53 its endTurn wrap; the merge's numeric W add is moot (CW.cW sends the room's W)
- dev/build/jcoopask.js:24 guest() temp ids / requests (stateOn "ask") and every path behind it in jcoopask.js
- dev/build/jcoopthin.js:304 D.rvIn, :306 D.rvOut, :266 pDiff row part, :388 D.patchOut rows (jcoopthinc.js:263 returns null, oldRan "rvIn")
- dev/build/jcoopthinb.js part B old-rows rule (jcoopthinc.js:265 wrapper, oldRan "bRows")
KEPT until parts E / G (they decide WHO ROLLS a world event, the host rolls it once for both seats; removing them makes the guest roll fabricated news / effects on her):
- dev/build/jcoopone.js:18 MUTE, :22 ONLY_ME, :44 PERSON, :46–51 drawLot / cmMonth / fxIllMonth / wdNpcDress
- inline worldOn: j3.js:92, j8.js:390, j13.js:27, j13.js:69, j42.js:182, j42.js:186, jgift.js:233
- module guards: jagent.js:27, jdemo.js:13, jdh.js:46, jdh2.js:36, jemoact.js:87, jil.js:30, jkh.js:40, jlux.js:119, jmline.js:20, jnroad.js:15, jpet.js:128, jpromo.js:100, jreign.js:30, jseat.js:21, jstaff.js:20, jsteal.js:35, jweather.js:39, jmort.js:35, jpetlife.js:38, jvisit.js:18

### Notes for the reviewer
- Implicit frames (display code writing NPC fields lazily: wdOf migration, item iu, tsbPets normalisation) still send small ops; with prune they are a few hundred chars. Kept on purpose: dropping them would also drop her taps that write an NPC outside runAct / chooseM. Counted in C.stat.implicit.
- Worker DOMAX 20 000 stays; a single changed array over 17 000 chars (never seen: largest NPC field in the runs 2 943 chars, 1.cz) would still be refused — counted (C.stat.big), asserted 0.
