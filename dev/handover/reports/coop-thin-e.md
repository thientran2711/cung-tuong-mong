# coop-thin E — BUỔI + NIGHT ON THE HOST — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('coop-thin-e|withSeat|pendBuoi|bend|nightEnd|ctm-nr|ctm-tn|cyHold|forceBend'): OD L1487/L1489/L1493/L1494 (+ ~01:40Z/~02:05Z/~02:15Z verbatim read) | main jcoopthin.js A+B(jcoopthinb)+D(§6)+C(jcoopthinc, LIVE eb3675a6); jcoopworld.js holds every old buổi/night relay | review/* no E branch (night-final-r2 52d5092d / night-ledger-r1 37018e74 / coop-contest-fix-r1 a7f4ab13 exist, none on main) | claims: this worker only (CLAIMS row 974).

Worker session_01N1tNP5f2oakg2Jy1DdVpxy (opus), coordinator Foreman B ROOT session_01N1tNP3WvLNPV6guHYCkC66. START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %.
Branch review/coop-thin-e from origin/main eb3675a6. Brief dev/handover/briefs/coop-thin-e.md (note: the brief has a second stray role line "fresh opus REVIEWER … makeup-lux r1" — taken as a paste slip; this session works as the coop-thin-e WORKER).

## 0a. Preconditions from the plan (audit §3 row E: "after night-final #4 and coop-contest-fix #2 are on main")
| item | state (origin/main eb3675a6, 11/17 23:3xZ) | meaning for E |
|---|---|---|
| night-final (review/night-final-r2 52d5092d) | **NOT on main** (main has no dev/build/jnf.js; r2 = PASS, held in the balance chain). Its F1 (CLAIMS 682): `jnf` is solo-only while COOPW.on — "co-op keeps the live path until coop-thin E". | E builds on main's LIVE night path (jflip / jnight / j8 resolveTonight / jcycle). night-final does not change the co-op path (F1), so E is not blocked by it — but both touch j8 / jflip / jnight / jcycle → whoever lands second re-merges. |
| night-ledger (review/night-ledger-r1 37018e74) | **NOT on main** (no dev/build/jledger.js). Chain balance-core → night-final-r2 → night-ledger is being REDONE on main (MAIN s37 21:06Z order to Foreman D; batch s32b HANDOVER, CLAIMS 945). | Same: E does not need it; merge conflict risk only. **For Foreman B:** tell D's chain re-do that E moves the co-op night onto the host (files below) so the two do not both rewrite jcoopworld's night gate. |
| coop-contest-fix #2 | **CANCELLED** by s28 (thin guest; CLAIMS 535; OD ~02:05Z: no option-1 patching). | No blocker. Contest board (G21) stays a later part (F/G); E only keeps contest tests green. |
Conclusion: precondition #4 is formally not met, but its reason (same code, two writers) is now only a merge-order risk; E goes ahead on main unless Foreman B says wait.

## 0b. Every buổi / night path the GUEST runs today (main eb3675a6) and what E does with it
| # | path (guest) | file:line | what it does on her phone | E |
|---|---|---|---|---|
| 1 | `#next` → wrapped nextBuoi → `bend()` | jcoopworld.js:744 (wrapper), :751 (#next), :336 bend | "Sẵn sàng" in a day buổi sends `bend` | → `do ready` (intent); bend DELETED at level 5 |
| 2 | server `buoi` → onBuoi → `CW.allow; nextBuoi()` (her real step: 20 non-coop modules wrap nextBuoi + j9 rivalsBuoi frame) | jcoopworld.js:329, :346; j9.js:143 | runs her whole buổi step locally (world part already dropped by C's lens) | → host runs her step in withSeat("b") (personal part only), result to her as a part-D patch; her local step DELETED |
| 3 | `bended` / `badbuoi` / rebend / catch-up loop | jcoopworld.js:350, :353, :579, :581 | lock + catch-up after reconnect | DELETED at level 5 (host's view is the truth) |
| 4 | `pendBuoi` (step waits under an open dialog) | jcoopworld.js:331, :520 (tryEnd), :987 | holds the room step until her dialog closes | DELETED (her cards are part-D cards; the host steps; nothing waits on her Q) |
| 5 | `needWhere` / setWhere / applyWhere / `where` relay; guest placeWhere overwritten | jcoopworld.js:263, :268, :271, :266 sendWhere, :753 placeWhere wrapper | locks #next until the host's `where` arrives; replaces her NPC places | her places come in the host's step (her S.where in the patch); `where` relay + needWhere DELETED |
| 6 | night gate rd/go/q (`ctm-nr`), nightReady, nCheck, nResync, forceNight | jcoopworld.js:594-626 | tối "Sẵn sàng" = rd; host's go → each seat runs nextBuoi → endTurn → `end` | rd → `do ready` at tối; go/q DELETED; host decides the night for both |
| 7 | flip on the guest (draws nothing, pregFind only); tn relay (`ctm-tn` claim/tn + versions tnV/tnSeen/tnClaim), tnWeek | jcoopworld.js:633-683 (665 flip, 682 tnWeek) | her night = the host's tn after the merged week; in-week changes relayed | flip already host-only (B2); E: her night decided + RESOLVED on the host in context b (resolveTonight / nightFx for "me" = her), tn relay + versions DELETED (tn travels in the view) |
| 8 | resolveTonight on the guest for "me" | jcoopworld.js:678 → j8 resolveTonight | her night's Sủng / Ân tình / pregnancy computed on her phone | → host in context b, patch |
| 9 | jnight toMorning → COOPW.nightEnd → bend / nightReady | jnight.js (whole file), jcoopworld.js:342 | a won night ends her day through the sync path | on the guest: `do ready` (or the host ends her day in context b); nightEnd's bend path DELETED |
| 10 | cycle flags relay `cyb` (cySend / P2H.cyb / CW.fcy), cyWait → `cyHold` on the host's flip, cyFree | jcoopworld.js:881-898; jcycle.js:79/85/146/172 | her Kỳ nguyệt sự answer relayed so the host's draw can read it; the draw WAITS | DELETED: the host reads her S.cyb from her person directly (her card is a part-D card answered on the host) |
| 11 | jcooptimer guest clock: forceBend / forceNight on HER phone | jcooptimer.js:132-134 (tick :300) | her clock forces her own bend | host clock only (host calls the step for both when it runs out); guest clock = display of the host's |
| 12 | syncRoom re-bend / re-end-of-buổi, CW.restore bend flag | jcoopworld.js:575-582, :985-989 | resend lost bend after reconnect | bend part DELETED (re-end of the WEEK stays: G/H) |
| 13 | guest rivalsBuoi / pickTarget (G7) | jcoopthinc (C: guest pickTarget → null, host rivalsBuoi with her) | already moved by C | kept (C) |
| — | NOT E: her week end `endTurn` + monthTick after the night (`end`, merge3, toCanon) | jcoopworld.js:741 | | stays on her phone until part G (row G). E's night = the decision + her night's resolution; her endTurn then runs with the night already resolved (resolveTonight inside it skips "me" in a level-5 room). |
Also for E (ORDER s34 16:22Z, reports/coop-thin-c.md 'For part E'): world windows' end() effects on a GUEST's household (jworld wwin; vu cổ / trộm / phóng cung, her choice S.wwMe) run HOST-SIDE in context b for her seat (today the guest's worldTick does nothing and the host's end() never reaches her household).

Design note (the one hard point found): the host's stored copy of her person (TH.seatOf "b") is the last MERGED week + part-D patches; her own acts this week (until part F) live only on her phone. So `do ready` carries her current person blob (the same form as her `me` P); the host loads it into her store (plus his patches she has not acked yet, n > her thpn — they reach her anyway, pDiff is relative), runs her step in context b, and her result comes back as a part-D patch. While she is ready she cannot act (#next already locks), so nothing of hers is lost between the blob and the patch.

## 0c. Perf budget (plan risk "host phone heavier")
Probe dev/test/coop-thin-e-perf.js (from coop-thin-c-perf): host Fold 686x880, CPU ×4, level-4 room, LIVE Worker, median of 9:
| measure | ms |
|---|---|
| host's own buổi step (nextBuoi real step, incl. render) | 312 (254 on the 1st run) |
| same, without render | 9.4 |
| her step in context b (withSeat b + nextBuoi; render / modal no-op inside) | 20.6 |
| withSeat swap alone | 20.3 |
| both persons | ≈ 333 → **+ ~21 ms (+7 %) per buổi** on the host |
quickcheck buổi (solo, iPad ×4, includes dialogs): 830–985 ms on recent shas; plan gate ≤ 1.5 s → E's added cost is small; the swap (ser of her person + view swap over the NPCs) dominates, not her step. Will re-measure on the built E with the real personal step + night.

## Next (building)
CAP 4 → 5, level 5 = E; everything behind TH.on(5) (levels 0–4 unchanged; solo untouched). Order: (1) `do ready` + host step for both (day buổi) + her patch; (2) the night: host decides, resolves her night in context b, her endTurn skips the resolved night; (3) cycle flags read directly; (4) host clock only; (5) world windows' end() on her household; (6) delete the listed relays at level 5; tripwire before/after.

## #1 progress (worker session_01N1tNP5f2oakg2Jy1DdVpxy) — review/coop-thin-e @ 2fa0acf1 (pushed), NOT ready for review
Built (level 5 = E, CAP 4 → 5, everything behind TH.on(5); levels 0–4 + solo unchanged):
- **dev/build/jcoopthine.js** (new, after jcoopthinc in assemble.py): guest "Sẵn sàng" = `do erd` packs (her person NOW vs the host's copy
  in the view P.<seat>, TH.pDiff, packs < 15 000 chars, only after every pq patch is applied) + `do ready {w,b}`; host: own step
  (real nextBuoi) when both ready (or his clock: forceBend → eForce, host clock only), then her step in withSeat("b") from the top of
  the event loop: rivalsBuoi / placeWhere do not run again (her NPC places = his, mapped), and the WORLD is put back after her step
  (wSnap / wRestore: NPC fields, NPC list, W keys, rid; her viewer rows rel/oan/ghen/ev/<map>.me and her part of emp/cm/men kept) =
  the same rule as part C's lens. Her buổi returns as a part-D patch; on her phone a buổi moved by the patch resets used / popIdx /
  popMsg + curtain. Night gate: her tối ready = the same intent (host sets CW.nfr), his go rides the view (o.e.go).
- **jcoopworld.js**: ONE switch `eW()` (= TH.on(5)): needWhere false, onBuoi / bend / badbuoi / rebend / catch-up loop / setWhere / sendWhere
  off, nsay (ctm-nr) muted, nextBuoi wrapper → CW.eNext, forceBend → CW.eForce, lockNext waits on CW.eWait; keepFriendPos in her context =
  the host's own place; sendPos / sendFam never from inside her context. Exports CW.nCheck / nightReady / mapPlace / refreshHere.
- Tests: **dev/test/coop-thin-e.js** (E1–E8) **19/19** L5 (host Fold, guest iPad) on 2fa0acf1; dev/test/coop-thin-e-perf.js (step 0 c).
  Regression on 2fa0acf1: coop-e2e (level 0) 63/63; coop-thin-c L4 16/16; (thin-e L5 swap, thin-d L4: see ## #1 runs below).
  Seen in the run: her step's world writes put back each buổi (host E.stat wrR 39 NPC fields, wrW 2: `emp`, `tn`), 0 persons added/removed.

## ROLLOVER HANDOVER #1 → #2 (11/17/2026; context ≈ START_CTX 3 % + 25 %) — Foreman B opens the successor
Worktree /home/user/wt/cte (sparse, hooks installed; logs /home/user/wt/cte-out). Run: `python3 dev/build/assemble.py && node dev/test/coop-thin-e.js <W> 5 [swap]`.
Left, in order:
1. **cycle flags (row 10)**: at eW(): cySend → return; cyWait → false (no cyHold: the flip runs after both are ready, her tối `erd` carries
   her S.cyb); CW.fcyb on the host → TH.seatOf(fs()).S.cyb; remove "cyb" from jcoopthine BAD (the guest diff must carry it; D's SKIP for
   host→guest patches stays). Test: dev/test/coop-cyc.js at level 5 (+ E check: her báo sớm / giấu changes the host's tray).
2. **tn relay (row 7)**: at eW() tnRelay / tnFinal / the ctm-tn listener off (her own change = part C's act op on the world key tn; the
   host's change = the view). Her side effect (tnTake: "Thẻ bài … đã được lật" note / the ksp card) driven from the view: on thinview,
   when S.tn (her lens) differs from CW.tnLast → tnTake. CHECK first how tn.who reads on her phone (REFF has "who": mapMe turns her pid into
   "me"; tnSet compares with me() = 902) — test with coop-night.js / a forced tn in coop-thin-e.
3. **her night in context b (rows 8/9)**: her night dialogs (ksp → prep → night1 → night2 → nightFx) are pid cards: at level 5 build them
   on the host in her context (D.cardFor / takeQ) instead of tnTake's local pushDil; her pick runs nightFx in context b; S.toMorning on
   her store = the host ends her day (treat as her ready in check()). jnight on the guest: step() → nothing at eW() (no nightEnd).
   resolveTonight only resolves NPC nights (j8:519; "me" = ""), already host-only.
4. **world windows' end() on her household** (ORDER s34 16:22Z, coop-thin-c.md 'For part E'): jworld's end() of a window (vu cổ / trộm /
   phóng cung) runs on the host; for her household (her choice S.wwMe in her store) run it in withSeat("b") (D.later), result = patch.
5. jcooptimer guest: dueTick on the guest must step nothing (forceBend already → eForce false on the guest; the tối branch calls nextBuoi
   = her ready, harmless) — add a guard + say so in the header (host clock only).
6. Gates (brief): coop-thin-e L5 + swap; coop-thin-a/b/c/d at levels 0–4 (+ swap); coop-e2e (+COOP_SWAP=1); coop-p2; coop-b1;
   coop-one-world seeds 1–10; night tests (coop-night, night-*, log-sync-night); coop-cyc; coop-timer; tripwire before/after
   (`TRIP=1 THIN=4 node dev/test/coop-bot.js 4 <out>` vs THIN=5 — check coop-bot accepts THIN=5; buổi/night categories must drop);
   quickcheck; one-core-guard; perf re-measure (coop-thin-e-perf on the built E: her step for real); shots host Fold + guest iPad at a
   buổi step + a night result (scratch, CDN img/_review/coop-thin-e/ if the reviewer needs them).
7. Then report '## Done' (deleted/bypassed paths table: rows 1–12 of 0b), CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B.
Known: the night gate's go reached the guest through nOtherEnded (host's end out) in the run, E.stat.go 0 → check the view path
(o.e.go) really arrives before his end (hostView after nGoNow: call TH.flush() in nGoNow at eW()).
