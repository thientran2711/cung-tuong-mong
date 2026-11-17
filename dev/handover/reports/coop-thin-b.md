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

## ROLLOVER HANDOVER (worker session_01N1tNP6svxoSpRYt6QpgSiS, 11/17/2026 ~07:25Z) — for the successor that does "FIX D r1"
Why: context ≈ 30 % of the 1M window ≥ START_CTX 3 % + 25 % (owner OD:L1217 / 16/11 08:22Z s14); new work arrived, so the worker stops here and
the COORDINATOR (Foreman B s2 session_01N1tNP5QYubNg1dqA9BZitC) opens the successor.
State: review/coop-thin-b @ 9af781c2 = B (4bf838e2) + merge of review/coop-thin-d 099ce05b, all gates green (numbers above). B reviewer
session_01N1tNP5Gz14jVMwShSBh45K reviews 9af781c2. Old guest path stays behind the level check until part H (Foreman B answer 07:10Z).
Next task (order 07:24Z, Foreman B s2, verbatim items): new commits on review/coop-thin-b after 9af781c2, first merge review/coop-thin-d-r1 c6792773
(probe dev/test/coop-thin-d-probe.js); fix D r1 FAIL items from dev/handover/reports/review-coop-thin-d-r1.md (handover a4746d36):
 (1) host reload loses the answer to HIS invite (CW.acts memory only) → carry k/v/item in thInv pp like thBribe;
 (2) guest copy of a host-built card renders unlike the native card on Fold 755 + iPad 1180 (hint squeezed, ĐƯỢC/GHI CHÚ instead of GỢI Ý,
     extra figure) → fix ONCE in gSync, kit-only (same kit card both seats);
 (3) ev proof reaches her phone only at the merged week → family: her NPC viewer rows changed by host-run cards; avoid merge double count
     (see "Rows decision" above: B keeps the host's old numbers and sends her the fresh rows — same pattern);
 (4) correct D's tripwire claim to ≈ −23 % (2872/2794 → 2194/2166);
 (5) tests: kpWarn flake at the bribe step, probe cases (ev, host reload, both seats at once), real dialog shots (overlays covered them; shots
     outside git), res note on her phone in host perspective.
Then append '## FIX D r1' here and send SẴN SÀNG KIỂM to Foreman B s2.
Setup used: worktree /home/user/wt/thinb (sparse, at 4bf838e2 — fast-forward it to origin/review/coop-thin-b 9af781c2 first); test output dir
/home/user/wt/thinb-out (outside git); live Worker https://ctm-coop.victoria-tntt.workers.dev has part A (level 2 works, no Worker change).
Commands: python3 dev/build/assemble.py; node dev/test/coop-thin-b.js <worker> 2 [swap]; node dev/test/coop-thin-d.js <worker> 2 [swap];
node dev/test/coop-e2e.js <out>; bash dev/tools/quickcheck.sh (needs dev/site/build_site.sh + committed index.html/sw.js/assets.json).

## FIX D r1 — SẴN SÀNG KIỂM review/coop-thin-b a0342238 (worker session_01N1tNP3op5jQGEdK2Sf7aVD, successor of the B worker; START_CTX ≈ 3 % est., ends ≈ 22 % est.)
PRIORITY #1 CHECK ('thInv|invRun|gSync|evIn|briberRes|resTo|thq|kpWarn'): OD 0 new | ledger 0 | main 6c4f21c3 old relays only (jcoopworld act/actr, ctm-p2) | review/* review/coop-thin-d-r1 c6792773 (probe, merged here), review/coop-thin-b 9af781c2 | claims: B reviewer session_01N1tNP5Gz14jVMwShSBh45K on 9af781c2.
Commits after 9af781c2: 8215d13c merge review/coop-thin-d-r1 (probe) · 0d4ee0a6 code · 4eaea260 tests · a0342238 site rebuilt. Level 0/1 rooms: nothing new runs (every change is behind dOn() / thin ≥ 1 on the host; myBlob's `delete thq` is a no-op below D).
| # | r1 item | fix (one place) |
|---|---|---|
| 1 | host reload loses the answer to HIS invite | jcoopworld runAct hook: thInv pp now carries `v` (target id) + `he` (the item itself). `invRun(id,ok,pp)` rebuilds from pp when CW.acts is empty and finds the item BY VALUE in his chest (gone → a note, nothing given). Found while testing at level 2: after a host reload her card was replaced by a STALE one ("Nhập cung") — the room's person blob carried a `thq` copy (B's life blob → her S → her week → room). Root fix: `myBlob` drops `thq` (one place, every blob); `seatOf` takes her cards ONLY from the host store (localStorage per room), never from the room blob. |
| 2 | guest copy of a host-built card ≠ native card | jcoopthin `D.vOf(m)` = every data field of the queued entry (pid, pp, hideOut, kit, art …; minus handlers and this device's `__` markers) and `D.standIn(c)` = that + {thin,must:1}; gSync uses it. Cause was the missing `pid`: the kit (jk2b kitIsEventChoice = "pid" in m) then treated it as a plain card (ĐƯỢC instead of GỢI Ý, no "an toàn" tag, other picture/layout). `must:1`: the host already let the card through; her phone's j68 evGate (event pacing) was holding/dropping optional pid cards (cnvBribe) once they carried a pid. |
| 3 | ev proof reaches her only at the merge — whole family | jcoopthin withSeat: entering her context (part D, not B's life intents) snapshots HER viewer rows on every NPC (rel / oan / ghen / ev + every `<map>.me` number, e.g. evm.me = that NPC's proof against her); at exit the change goes into her patch as `["nv",[npcId,…path],delta]` (guest: `nvApply`, clamped like the game) and the HOST's world gets the room's old numbers back (same rule as B's life rows) → merge3 counts her week's change once. This week's pending deltas (`D.RV`, saved with the store, cleared at the merged week / on a new face) are put back on top inside her context so a later card sees the true value. Covers every host-run path in her context: evIn (tai mắt), briberRes told/ok when she is the buyer, resApply effects, card choices (cnvBribe "bẩm chủ": evA/relAdd on NPCs). `TH.curDo` is now call-scoped (reset after each `do`). |
| 4 | tripwire overstated | D's report table corrected in place (handover dev/handover/reports/coop-thin-d.md): 4/4-week runs only, D STATE 2 872 / 2 794 → 2 194 / 2 166 = **≈ −23 %** (≈ −16 % with D·patch). |
| 5a | kpWarn flake at the bribe step | tests seed `S.kpWarn=1` on both seats (the "Kiếp này chưa trọn" warning is asked once per life; it is correct behaviour). |
| 5b | probe cases in the gate | coop-thin-d-probe.js is now a gate (34 checks): P1 ev host world → her at once + once after the week; P1b ev her tai mắt → the host's proof at once; P2 host reload with his invite open; P2b host reload with his GIFT open (his chest re-ordered first: found by value, one copy left); P3 guest buys the host (+ his card shot); P4 double click; P5 rows family (she buys the host, he reports: that NPC's evm.me +1 / Thiện cảm −5 on her phone at once, host world unchanged until the merge, proof counted once after it on both seats); P6 both seats at once (her pick of his invite while he answers hers: each runs once, selfTest exact). |
| 5c | real dialog shots | coop-thin-d-kit.js `cardShot`: overlays above the modal are hidden for the shot only (never tapped), Fold 755x1000 + iPad 1180x820; `sameDom`: every moved card on the guest == the native card (pid rebuilt in her context; notes = same data without the mark), checked in coop-thin-d.js for invite, res note, gift, accepted, bribe (host buyer), bribe (NPC buyer), heir. Shots (looked at): CDN img/_review/coop-thin-d-r1/ (32 webp: d1…d6 guest + d3 host, both sizes, normal + swapped). |
| 5d | res note in the host's perspective | jcoopworld `herView` (part D path only): the host's "Ngươi" → the host's name, her name / "nàng ta" → "ngươi". Test: her note never names her or says "nàng ta". |

Tests on a0342238 (LIVE Worker; level 2 needs no Worker change):
- coop-thin-d L2 **52/52**, swapped **52/52** · coop-thin-d-probe L2 **34/34**, swapped **34/34** (L1: 16/16 on the old probe set before extending).
- coop-thin-b L2 **148/148**, swapped **148/148** · coop-thin-a L0 **19/19**, L1 **24/24** · coop-e2e **60/60**, COOP_SWAP=1 **60/60** · coop-p2 **45/45**.
- one-core-guard **PASS** (0 fails, 6671 ≤ 6691, no --allow-grow) · quickcheck **PASS** (core gates incl. coop-one-world PASS; old save ok; render 298/287, tab 401/380, buổi 1099/1141 ms vs live).
- Flakes: none in the final runs (earlier P3 miss = the kpWarn warning on the host, now seeded).

Found, not patched (reported):
- KIT (pre-existing, every dialog): a `showModal()` right after a viewport resize renders the option block TWICE (the second one squeezed: one letter per line) until the next showModal. Repro: solo, open any choice card, resize 686x880 → 755x1000, call showModal → `#modal .opts` = 2. Real devices: Fold unfold / iPad rotate while a new dialog opens. This is very likely what the r1 shots showed as "squeezed hint". For the kit keeper.
- Affordability on a moved card (option greyed "thiếu … bạc") is checked by the host on her STORED person (what the host accepts at pick time); her live person may hold more/less Bạc until part G. Shown as the host decides.
- Probe P5: Thiện cảm rows of one NPC differ between the seats before and after a merge (guest 0 / host 14 at the start of one run) — pre-existing two-copy drift (one-world for NPC rows is part C/H); the proof row (plain count) agrees on both seats.
- Notes N1/N2 of the r1 review (patch counter on host storage loss; ctm-thin-d keys never deleted): not in the FAIL list, unchanged.
Rollover: not needed (≈ 22 % est. < START_CTX 3 % + 25 %).

## ROLLOVER HANDOVER #2 (worker session_01N1tNP3op5jQGEdK2Sf7aVD, 11/17/2026 ~08:40Z) — for the successor that does "B r1 FIX"
Why: context ≈ 24 % est. (START ≈ 3 %; rollover at START + 25 %); the B r1 order (6 items + main merge) will not fit, so the worker stops here and the
COORDINATOR (Foreman B s3 session_01N1tNP3Jf9UG8ZtZdVruBg7) opens the successor.
State: review/coop-thin-b @ a0342238 = B + D + FIX D r1 (section above, all gates green). Nothing uncommitted.
Next task (Foreman B s3 order 08:16Z, verbatim summary): read dev/handover/reports/review-coop-thin-b-r1.md in full; take the probe dev/test/coop-thin-b-r1.js
from review/coop-thin-b-r1 674b5fa9 (DFLAG=1 = D on) into review/coop-thin-b; fix: (1) wait card draws her DEAD old person (nlcard reads S) + its ✕ runs the
old local accept → render from the new life data, ✕ through the host path; (2) SEAM B‖D: life roll/accept inside withSeat also runs D takeQ + whole-life
patch when D is on → duplicate 'Nhập cung' cards, stale S.thq, rkName page errors 1/3, host-leave mid-roll stuck → ONE life-change path when D is on
(before CAP=4); (3) TB.hold never released if she leaves before accept → release on leave/timeout, her store must not keep the unaccepted life; (4) stale
re-roll uses re=0 → the real counter; (5) one-core: relAdd 35 (j2) and ghen R(15) (j1) re-typed → back to the BAL keys; (6) old-path Hoàng hậu drift: fix
at the root buildFriend (whole family) + test. Merge latest origin/main (9fdc1199 or newer). Gates: as in the D r1 list above + coop-thin-b-r1 probe green
with DFLAG=0 and 1 + coop-thin-d 52/52. Report '## r1 FIX' here, then ONE SẴN SÀNG KIỂM <sha> for B+D to Foreman B s3.
Hints for item 2 from FIX D r1 (already on the branch): her cards come ONLY from the host store (seatOf, LS per room) and myBlob drops thq (so no stale thq via
blobs); withSeat skips the D row tracking when TH.curDo==="life" (now call-scoped). Still open: D.takeQ + the person patch (pDiff p0→ss) DO run inside life
intents → likely set D.noPatch / skip takeQ for curDo "life" (B answers with its own q/P) — check against the r1 probe.
Setup: worktree /home/user/wt/thinb (sparse, at a0342238, hooks installed); test output /home/user/wt/thinb-out (outside git); handover worktree
/home/user/wt/hoD (sparse dev/handover/reports; on the handover branch force-updates use `fetch +ref`, then reset + cherry-pick, never rebase in the shallow clone).
Commands (LIVE Worker https://ctm-coop.victoria-tntt.workers.dev): python3 dev/build/assemble.py; node dev/test/coop-thin-d.js <W> 2 [1]; node dev/test/coop-thin-d-probe.js <W> 2 [1];
node dev/test/coop-thin-b.js <W> 2 [1]; node dev/test/coop-thin-a.js <W> 0|1; node dev/test/coop-e2e.js <out> (COOP_SWAP=1); node dev/test/coop-p2.js <out>;
node dev/test/one-core-guard.js; bash dev/site/build_site.sh + commit index.html/sw.js/assets.json, then bash dev/tools/quickcheck.sh. Shots: SHOTS=<dir outside git>.

## r1 FIX (worker #3 session_01N1tNP3op5jQGEdK2Sf7aVD successor, 11/17/2026) — review/coop-thin-b @ be599e1e
PRIORITY #1 CHECK ('coop-thin-b r1|waitCard|takeQ|TB.hold|allyBond|ghenNew|hhBind buildFriend'): OD co-op thin-guest (ORDER s28, C3) | main 05ebe3da (merged in) | review/* coop-thin-b a0342238 (base), coop-thin-b-r1 674b5fa9 (probe taken) | claims: this worker. No BAL key for the ally / new-face ghen existed on main or review/* → added (item 5).
START_CTX ≈ 10 %; ends ≈ 35 % (push + report only at the end; no successor needed for this task).
Commits: 1f44a195 merge origin/main 05ebe3da (built files taken from main, rebuilt) · bf76752c fixes · be599e1e probe shots + site rebuilt.

| # | Item | Fix (root) |
|---|---|---|
| 1 | Wait card drew her dead old person; ✕ ran the old local accept | jcoopthinb waitCard = a plain kit note (title "Sổ luân hồi", VANPHONG text kept; no `nl`, no `nlcard`, so no kpIdentity / faces / Độ khó tabs / origin backdrop); closing it only hides the note. nlAccept / nlReroll wrappers: `if(guestThin()&&TB.ask&&on())return` BEFORE the TB.key test (nothing local while an intent is out). The real card's ✕ = nlCard onClose → nlAccept(true) → host accept (unchanged). oldPath also clears the note. |
| 2 | SEAM B‖D: life intents also ran D takeQ + whole-person patch | jcoopthin withSeat: `dW = dOn && TH.curDo!=="life"` gates D.hold, p0 snapshot, row tracking, takeQ and patchOut → ONE life-change path (B's answer P/q/rows). D.save/afterRun unchanged. |
| 3 | TB.hold never released | jcoopthinb release(): host drops hold + TB.last + her seat store when the peer goes offline (leave / reload / socket drop; her later accept gets `stale` → same seed + re re-roll) or a week merges after the roll's week (TB.last.wk). TB.stat.release / TB.why. |
| 4 | stale re-roll used re=0 | lifeRes: `rollAsk(s.seed, s.re|0)`. |
| 5 | ONE CORE relAdd 35 / ghen R(15) | BAL.allyRel 35 + BAL.ghenNew 15 (jbal.js); j2 `allyBond(L)` (start uses it), j1 `ghenNew0()` (newRival uses it); rebase calls both. Seeded rolls unchanged (same R calls). one-core-guard PASS (inline 6642 < baseline 6691). |
| 6 | Hoàng hậu drift on the old path | Root X.buildFriend: `delete v.hh; hhBind(v)` before anything sees the entry (no migration on either seat / either path); __b baseline reads it via hhSafe (fromCanon before S exists on the guest's first life: queenP reads S); the old week write-back skips "hh" (the world merge carries the row) — same rule as B's bridge. standIn's own bind removed (one place). Test: probe R6 (host + guest: copied hh 77 → Empress rows unchanged, hh bound == aff). |
Not changed: TH.CAP stays 2 (CAP=4 at the B/D merge to main = Foreman decision; item 2 now done). Known pre-existing note (not B): sendRes still sends fx.hh deltas on the old path (unchanged behaviour; hh already bound there by consorts()).

Gates (LIVE Worker, part A deployed):
- coop-thin-b-r1.js (probe + R0 wait note, R4 nlRe, R6 hh): DFLAG=0 37/37 · DFLAG=1 37/37, 37/37, 39/39 (with shots) · final thq 0 every run, 0 page errors (no rkName/kpBuild).
- coop-thin-b L2 148/148 · swap 148/148 · DFLAG=1 148/148.
- coop-thin-d L2 52/52 · swap 52/52 · probe 34/34.
- coop-thin-a L0 19/19 · L1 24/24. coop-e2e 62/62 · swap 62/62. coop-p2 45/45.
- one-core-guard PASS. quickcheck PASS (164 s, open 1506 ms, old save ok, core gates PASS incl. coop-one-world). (1st quickcheck run FAILED perf longTask 32 s only because 2 co-op suites ran in parallel on the box; rerun alone PASS.)
- Shots (looked at): CDN img/_review/coop-thin-b-r1fix/wait-755x1000.png + wait-1180x820.png (@2): kit BÁO note "Sổ luân hồi đang định thân phận kiếp này, xin đợi giây lát.", no person, no tabs, no overflow. The screen behind the dim is the probe's live old person (the probe calls start() without dying); in play it is her death screen. The Luân hồi intro gallery shows first (unchanged), the note under it.
