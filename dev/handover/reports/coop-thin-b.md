# coop-thin B — LIFE CREATION + REBIRTH ON THE HOST — SẴN SÀNG KIỂM review/coop-thin-b 9af781c2 (= 4bf838e2 + merge of review/coop-thin-d 099ce05b)

PRIORITY #1 CHECK ('coop-thin|thin guest|withSeat|nlRun'): OD 4 | ledger 5 | claims 8 | main 15 | review/* 3 (part A live on main 64c39ca2; no part B branch existed; parallel D = review/coop-thin-d c03c4f95)

Worker session_01N1tNP6svxoSpRYt6QpgSiS (opus), coordinator Foreman B s9 (session_01N1tNP35FF3tYRLkr6a7v7Y). START_CTX ≈ 3 % (1M window); ends ≈ 27 % (rollover not needed: only push + report remained).
Branch **review/coop-thin-b @ 4bf838e2**, on top of origin/main 6c4f21c3 (merged, generated files rebuilt). Brief: dev/handover/briefs/coop-thin-b.md.
Spec: coop-thin-guest-audit.md §3 row B; contract coop-thin-a.md C1-C6; review-coop-thin-a-r1.md §3. Owner GO 17/11 ~01:40Z, waves ~02:15Z, no option-1 patching ~02:05Z.

## What (all behind `COOPW.thin.on(2)`; solo and rooms below level 2 run nothing new)
1. **dev/build/jcoopthinb.js** (new module, assembled right after jcoopthin; header = design).
   - GUEST: Luân hồi card = choice only. `start()` / "Chuyển kiếp" / "Đổi thân phận" send `do life {st:"roll",seed,re}`; "Nhận thân phận" (or ✕ on the card)
     sends `do life {st:"accept",key,kc}`. She builds no world, no person, rolls nothing: the host's answer is shown through the display path
     (`fromCanon` of the room world + the host's blob + the NPC rows toward her), then `nlCard()` shows it; on accept she hands the host's blob to
     the server unchanged (`COOPW.sendMe(P)` → `me`). Wait note while the host answers: the kit card "Thân phận kiếp này" ("Sổ luân hồi đang định
     thân phận kiếp này, xin đợi giây lát."). Resend after 8 s / when the host comes back online (`nohost`); level fell to 0 (`nothin`) → old path.
     A first life asked before the room level arrives waits ≤ 3 s for the `thin` message.
   - HOST (`TH.onDo("life")` in withSeat("b"), the ONE room world): roll = the same seeded core build as nlRun (`_start52` with Math.random = nlRng(seed),
     faces from the second stream), then BEFORE any start() wrapper loaded after j52 runs: the scratch harem is dropped, room world keys / NPC list /
     rid / sidN put back, attach's list of links reset, any leftover ref into the scratch harem nulled (counted), her personal part of emp/cm/men
     blank, NPC rows toward the new face fresh; re-made on real people: cung nữ mistress (srvInit with the host's entry pulled out; checked real,
     alive, id<900, retried), ally (relAdd on a real consort, log line rewritten), foe. Then the start() wrappers (k61, cmaid, mort, seat, reign …) run
     on the real world in her context. Names: her name (full + last-two-syllables) and her maid's name are checked against every name in the world
     (consorts, staff, servants, kids, men, the HOST's own person/maid/servants via `TH.outerS`, and the room's last merged world); the maids
     Nội vụ phủ offers her to pick (cmPick) are checked the same way. accept = nlAccept's steps (Phúc duyên baseline, reroll log line,
     tiểu thư road "nha" → kcInit) on the stored rolled life; idempotent (cached by key).
   - Rows decision: the host keeps the room's OLD numbers for her rows in its own world until the week merges (merge3 adds numeric deltas: both
     seats moving one row would count it twice); the guest shows the fresh `rows` (applied inside fromCanon). Part C (world host-only) retires this.
   - Seat store decision (contract C2 "B decides"): her store is dropped on every merged `week` / new `state` (her week is still played on her
     phone until E–G, so the room's P.b is the truth), except while a rolled life waits for her accept (`TH.life.hold`).
2. **jcoopthin.js**: `TH.CAP=2`; blank seat store for her FIRST life (only for the `life` intent, `TH.blank`); UI no-op list = ONE list `TH.NOOP`
   (render showModal save kmPush kmReset kitLine sfx kitSfx kitResultSfx kitStatFx kitStatGlow kitEdict kitGloom kitReward kitResultFx; `TH.NOOPED`
   checked by the test); registered KMS KMSNAP J95B.bind/ev/notes/next J95C.lastV/sig SP13.L/held (review r1 §3 list for B); `TH.outerS` (host S,
   read-only, during the context); `TH.curDo`. **Root fix found by the test (A's stand-in):** the host stand-in copied `hh` as a plain number,
   so j24 `hhBind` "migrated" it at her first `consorts()` and moved the Empress's row toward the HOST (host's own Thiện cảm changed +4/+5 per
   rebirth). The stand-in's hh is now bound (no migration) and `hh` is never bridged (derived from a world row). Old path NOT patched (OD ~02:05Z);
   same drift exists there on the guest (retires with C).
3. **jcoopworld.js**: `sendMe(P0)` sends a given blob without re-serializing; the old nlRun/nlAccept/start hooks pass through in context b.
   OLD PATH (attach on the guest) stays for rooms below level 2 — see "Question" below.
4. **jtut.js / jlogsync.js**: their start() wrappers leave the host phone alone in context b (tutorial "new life" flags; log sync baseline).
5. Tests: **dev/test/coop-thin-b.js** (new); coop-bot.js `THIN=n` (host asks level n) + skips the Luân hồi roulette (it blocked the bot after
   a rebirth at any level).

## Tests (on 4bf838e2 unless noted; LIVE Worker, part A deployed — level 2 needs no Worker change: THINMAX 9)
- one-core-guard **PASS** (0 fails, no --allow-grow). quickcheck **PASS** (open 1298 ms · old save ok · render 210/247, tab 296/318, buổi 881/918 ms · core gates PASS).
- coop-e2e **60/60**, swapped (COOP_SWAP=1) **60/60** (level 0 = old path; includes old save + solo + rebirth). coop-one-world **PASS**.
- coop-thin-a level 0 **19/19**, level 1 **24/24** (one rerun 19/24: the HOST's random first life was the tiểu thư road at home → no stand-in
  entry, A's test expects id 901; A's test does not control the host's road — pre-existing test gap, not B; B's test accepts it).
- **coop-thin-b level 2: 148/148**, swapped roles (iPad hosts, Fold 686x880 joins) **148/148**; earlier runs 148/148 ×4. Per origin
  (tt dtq muoi cn nc bd td ch thd cnv + tt/nha): card == host blob (origin, name, stats) · the guest built nothing (0 newRival, 0 attach) ·
  room took her person (life +1) · life she got == card · same consorts both seats · 0 temp ids · her name + maid unique in the host's world ·
  cung nữ mistress real on both seats · tiểu thư at home built on the host · host forgets the old face (j61) · host state intact (withSeat round
  trip, no context left, store released) · host's own person + screen state + own rows on every NPC identical right before/after each of the
  24 life intents · host rebirth (old path) unchanged · a week merges after · no page errors. First life of the guest: host roll+accept, guest 0 core build.
- **Trial merge with review/coop-thin-d c03c4f95** (local only, never pushed): 1 conflict file, jcoopthin.js, 2 hunks — withSeat entry (D's
  `dOn/D.hold/__inv0/p0` + B's `TH.outerS`) and exit (D's bridgeItems/afterRun + B's `hh` skip + `TH.outerS=null`), and BOTH parts added a UI
  no-op list → resolved as ONE `TH.NOOP` (union: + D's kitStatDelta). jcoopworld auto-merged. On the trial: coop-thin-b level 2 **148/148**,
  coop-thin-d level 1 **44/44**, level 2 **44/44**. C1: CAP stays 2 on B; the LAST merged of B/D sets CAP=4 (reviewer). Resolution text = the two
  hunks above (exact code in this session's trial worktree; reproduce with the description).

## B‖D merged into this branch (Foreman B s2 order 06:41Z): 9af781c2
Merge of review/coop-thin-d 099ce05b: conflicts jcoopthin.js (the 2 hunks above, resolved the same way: withSeat entry/exit joined, ONE TH.NOOP
union list) + generated files (rebuilt); coop-bot.js auto-merged with D's THIN/THINPART env, B's duplicate THIN line removed (D's kept).
On 9af781c2: one-core-guard PASS · quickcheck PASS (old save ok; render 218/228, tab 305/285, buổi 903/864 ms) · coop-thin-b L2 148/148, swapped
148/148 · coop-thin-d L2 45/45 · coop-e2e 60/60. CAP stays 2; with D on this branch the reviewer may set CAP=4 at the merge (C1: last merged sets it).

## Guest tripwire (meter) — before/after
Scripted: 11 guest rebirths (every origin + tiểu thư), same origins forced on both seats, counted only during the rebirths (coop-thin-b.js TRIP=1):
| level | changing writes | STATE (no `__`) | B | C/H | D | ? |
|---|---|---|---|---|---|---|
| 1 (old guest path) | 8 878 | 1 247 | **461** | 166 | 27 | 593 |
| 2 (part B) | 4 822 | 1 032 | **0** (raw 68 = `wdOf __wdmig` guard only) | 489 | 27 | 516 |
B writers gone: K/k61SeedChiTon S.known, cmInit S.maid, rgMe S.reign, emoSee, start S.cmaid, attach W.emp/S.visit, porOf, nlFaces S.fseen/W.fidUsed/W.usedFaces …
**C/H rose 166 → 489 (+323), "?" fell 593 → 516:** re-attribution, not new guest computation: the render after her accept now runs under
`sendMe` (C/H entry) — evdSync S.evd 121, colCheck S.col 49 (both were "?" at level 1), emoSee 55, kmmOwned 31. Real remaining guest writers that
B moved but did not remove (render-time lazy face picks the host never ran because render is a no-op in context b): figPick W.fidUsed 50 /
S.staff 43 ("?"). Owner: C/F6 (lazy display writers on the guest), or B r1 if the reviewer wants the host to run those picks in context b.
Net STATE −215 (−17 %) on the rebirth flow; B category −100 %.
coop-bot 4 weeks (random; median of 2) STATE: level 1 11 788 / 3 292 (B 38 / 39) · level 2 6 571 / 1 644 (B 0 / 0). The bot hit "week N stuck"
at BOTH levels (level 1: 1 of 2 runs, week 1; level 2: run 1 week 3 = the roulette, bot fixed; runs 2–3 week 1 / week 0 with the guest "Đợi hảo hữu
xong tuần" and the host not ending) — pre-existing co-op instability class (coop-stable OPEN), not seen in coop-e2e/thin-b; flagged for the reviewer.

## Question for Foreman B (needs a decision, not blocking review)
OD 17/11 says each part DELETES the guest's old computation for good. But the level stays 0 for players until the owner turns it on (C1: host
want = dev flag only), so deleting the old guest rebirth path (jcoopworld nlRun/nlAccept/start hooks + attach) now would leave production guests
with no rebirth. I kept the old path for rooms below level 2 and marked the new path. Proposal: delete attach + the 3 hooks in the same change
that makes level ≥ 2 the default (owner-visible decision), or B r1 deletes them if the room level default is raised with the merge.

## Notes / found (not patched, per OD ~02:05Z)
- Solo family: her maid's name (MAIDS list) can equal a servant's name in solo too (mkServ allows list name + number, newMaid does not check). B fixes it only for the host-built co-op life.
- Old path: the guest's friend stand-in has the same hh migration drift (queen's row to the friend moves on the guest, then merges).
- Shots: none (no new UI; the wait note and the card are the kit card). Shots/test output kept outside git (/home/user/wt/thinb-out).

## Rollover
Not needed (≈ 27 % < START_CTX 3 % + 25 %, only push + report remained).
