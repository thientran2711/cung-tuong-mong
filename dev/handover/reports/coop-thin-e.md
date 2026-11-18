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
  Regression on 2fa0acf1: coop-e2e (level 0) 63/63; coop-thin-c L4 16/16; coop-thin-e L5 swap (iPad hosts) 19/19; coop-thin-d L4 48/52 = the 4 kit
  sameDom data-kfsp FAILs that review-coop-thin-c.md records as SAME on main (kit-fx-register), not E.
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

## #2 progress (worker session_01N1tNP6mL68mhj11smPZoTL) — review/coop-thin-e @ 4ba4fc15 (pushed), NOT ready for review
PRIORITY #1 CHECK ('cyb|tnRelay|ctm-tn|wwMe|EVD.*end|forceBend|roomKey'): OD L1487/L1489/L1493/L1494 | main jcoopworld/jcycle/jworld2/jcooptimer (old relays) | review/* no other E | claims row 976 (this worker).
START_CTX ≈ 6 % of 1M → rollover at ≈ 31 % (now ≈ 29 %). Handover items 1–5 of '#1 → #2' built:
1. cycle flags (row 10): at eW() her answer = intent `do cyb` (jcoopworld cySend → TH.doSend; handler in jcoopthine writes her stored S.cyb + CW.fcy, then CW.cyFree); no ctm-p2 "cyb" relay; COOPW.fcyb reads her person (host: seatOf(b).S.cyb; in her context: outerS.cyb; guest: view P.a.cyb); "cyb" left jcoopthine BAD (travels in her erd diff). The draw's wait/free (cyWait/cyHold) unchanged.
2. tn (row 7): at eW() no ctm-tn relay / versions / listener. Host's change = world key S.tn in the view (tnAt = view version); her change = `do tn` → CW.tnDo (host context): taken unless the host changed it after the view she saw (then o.e.tnb bumps); guest takes the view's night only when it changes (CW.tnView from thinview).
3. her night (rows 8/9): when the host's night is hers (week draw / his own change, never her own claim) CW.herNight builds the Kính sự phòng summons as a part-D card IN HER CONTEXT (D.later, once per week); her picks run there (prep → night1 → night2 → nightFx → S.toMorning on her store → patch); her phone pushes no local ksp at eW; jnight → nightEnd → her ready (nightEnd returns the key when CW.eAsked()).
4. world windows' end() on her household: jworld2 vuco / trom / phong split into end (world + host's S) + home(w,o) (household); at eW the host's end() schedules EVD.<k>.home in her context (D.later) with the end's outcome (vu cổ culprit id via punish); vu cổ with HER as culprit reads her own choice (EVD.vuco.meOf). Solo roll order unchanged.
5. clock: guest dueTick steps / readies nothing at eW (host clock only); roomKey at eW = host's own buổi / the view's (no server buoi any more: before this the host clock only fired in buổi 0); myRd counts CW.eAsked (friend-ready chip). Her clock out while she plays a mini game (timer FS.pz → CW.frPz): host steps only himself, owes hers (E.owe); her ready on leaving the mini game catches her up.
Also: buoi travels in part-D patches as its VALUE (jcoopthin pDiff ABS) — a delta drifted a seat to buổi 4 (renderHud2 crash seen in coop-cyc L5); "buoi" never in her erd diff; guest adopts her host-copy buổi when no patch is pending (reload); nGoNow flushes the view at eW.
Tests (dev/test/coop-thin-e.js now E1–E12 incl. E9 cyb, E10 tn, E11 her summons = part-D card, E12 phóng cung end on her household): L5 27/27 (host Fold) and swap 27/27 (on f2dfc264+; rerun 27/27 on 4ba4fc15; one run took the setup-week path → E3 'step===1' + E6 failed: test counts steps from the start, make E3 relative).
Gates run on 017c48f3..2c8660bb (before the clock fix unless noted): coop-thin-a L1 PASS · b L4 PASS (1st run: 1 WebSocket flake) · c L4 PASS · d L4 4 FAIL = the known kit data-kfsp sameDom (same on main) · coop-e2e PASS · e2e COOP_SWAP=1 PASS · coop-p2 PASS · coop-night L0 PASS · coop-timer L0 PASS · coop-timer L4 43/43 · coop-timer L5 43/43 (after fix; test 3 made level-aware: no pendBuoi at L5) · coop-one-world seeds 1–10 PASS · one-core-guard / text / text-rule / bind PASS · coop-b1 6 FAIL (consort entry / laydo bag cases: NOT checked vs main yet) · coop-cyc: fails already at THIN=4 (19/33: the test edits her person locally and she is a cung nữ (isSrv) under thin life; test needs a thin rewrite, not E) — E's cyb path covered by E9.

## ROLLOVER HANDOVER #2 → #3 (11/18/2026; context ≈ 29 % ≥ START 6 % + ~25 %) — Foreman B opens the successor
Worktree /home/user/wt/cte (sparse, hooks), logs /home/user/wt/cte-out (another container: recreate from review/coop-thin-e 4ba4fc15). W = https://ctm-coop.victoria-tntt.workers.dev (live Worker takes level 5).
Left, in order:
1. coop-night THIN=5: 84/99 on 2c8660bb (L4 105/105). Cases 1–7 PASS; 8–14 FAIL = a seat RELOAD / return mid-week. Guest reload: fixed in 4ba4fc15 (adopt host-copy buổi) — rerun. HOST reload: he comes back at the week's buổi 0 (no server buoi at eW to catch up to): keep {room, week, buổi} in localStorage on every host step (jcoopthine check()) and on return catch up (E.forced per buổi, check() → his step + herStep; her phone gets buoi by value now). Then rerun night5 (+ timer5, e5, e5 swap).
2. coop-b1 6 FAIL: run on origin/main (level 0 same test) to see if it is E (b1 runs level 0, eW off: likely a flake/main state — check).
3. coop-thin-c L5 (not run), coop-p2/coop-e2e rerun on the final sha.
4. Tripwire before/after: `TRIP=1 THIN=4 node dev/test/coop-bot.js 4 <out>` vs THIN=5 (E categories must drop, none rise).
5. quickcheck (dev/tools/quickcheck.sh), perf re-measure (coop-thin-e-perf on the built E), shots host Fold + guest iPad at a buổi step + a night result (scratch; CDN img/_review/coop-thin-e/ only if the reviewer needs them).
6. '## Done' with the deleted/bypassed table (rows 1–12 of 0b: all bypassed through eW() now incl. cyb relay, tn relay + versions, guest clock), CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B.
Known limits to state in Done: phóng cung START counts only the host's aged maids (w.x.mine) — her card's number; punish() of HER entry as vu cổ culprit lands on her stand-in (B4 / world) — not E.

## #3 progress (worker session_01N1tNP5w7CCPSfpWCxnK199) — review/coop-thin-e @ 9f596384 (pushed), NOT ready for review
PRIORITY #1 CHECK ('rbuoi|CW.restore|snapLoad|toilkeep|nextBuoi=function|E.rd'): OD L1487/L1489/L1493/L1494 | main 3da5720a (merged in) | review/* no other E | claims row 977 (this worker).
START_CTX ≈ 3 % of 1M → rollover at ≈ 28 % (now ≈ 26 %). Done this session:
1. merged origin/main 3da5720a (makeup-lux-r2v).
2. HOST reload at L5: CW.restore refused his snapshot (server buổi stays at the week start at eW) → snapshot carries the room level (c.thl); restore skips the server-buổi check at eW / thl ≥ 5. Her store (host's copy of her) kept per room in localStorage (D.save wrapper, tagged with the week the store was built in) and taken back on rebuild (same week / seat / life / name). Her ready re-sent when the host's boot id (view o.e.boot) changes.
3. Her stored buổi is never ahead of the host's (the week's base carries the tối she ended in: clamp at store build); the guest adopts the host-copy buổi only up to the view's buổi. (A first try that set CW.rbuoi from the view broke week change: reverted.)
4. #next re-enabled by lockNext when nothing locks it and nothing is open (a dialog closed by the host's patch without a render left her 'Sẵn sàng' off at tối: bot stuck).
5. OUTERMOST nextBuoi at L5 (jcoopthine, last module): a press outside a real step (CW.allow / CW.allowN) = CW.eNext only — the 12 after-step wrappers loaded after jcoopworld (jexam exTick, jpromo prCheck, jclose, jstory, jlooks, jgift, jfe, jkc/jkc2, jspread, jweather, jaudit) no longer run on a press that steps nothing (they ran once per press on BOTH seats).
6. Host week event keeps her ready of the NEW week (race: it can arrive before his week event; bot stuck at week 3).
7. Tests: coop-b1 on main 43/43 and on this branch 43/43 (the 6 FAIL of #2 = flake). coop-bot: takes the toilette screen (Nhận / Giữ đồ hôm qua, makeup-lux from main). Tripwire meter: tối's nextBuoi→endTurn counted as G (week end), entry per part recorded (trip.json 'entries'). coop-thin-e E3 relative, E6 n/a when the setup week leaves no day buổi.
Gates on 16981ebf..29682ebb: coop-night THIN=5 105/105 then 106/106 (cases 8–14 fixed) · coop-timer L5 43/43 · coop-thin-e L5 27/27 (29682ebb) + swap 27/27 (16981ebf) · one-core guard/text/text-rule/bind PASS · quickcheck PASS (16981ebf: buổi 1125 / live 908 ms median, within noise of the run; tasks>200ms 15/15).
Tripwire STATE by part, 4 weeks each (random bot, numbers vary ±30 %): L4 trip4f E 96 · C/H 643 (onBuoi 605) | L5 trip5g (29682ebb) E 203 · C/H 43 (onBuoi 0) · D·patch 1057 (by design: her step arrives as the patch). Residual E|nextBuoi on the guest = writes of the tối go path (allowN: nextBuoi → S.buoi=0 → endTurn; the after-step wrappers then run outside endTurn) = her WEEK end (part G); check with trip.json parts['E'] before claiming.

## ROLLOVER HANDOVER #3 → #4 (11/18/2026; context ≈ 26 % ≥ START 3 % + ~23 %) — Foreman B opens the successor
Worktree /home/user/wt/cte (another container: recreate from review/coop-thin-e 9f596384, sparse, hooks), logs /home/user/wt/cte-out. Main worktree for comparisons /home/user/wt/cte-main.
Left, in order:
1. DONE after the handover: coop-bot L5 on 9f596384 = 4/4 weeks, no divergence, exit 0; STATE 4752, E 96 · C/H 39 · D·patch 768 (vs L4 trip4f E 96 · C/H 643). Still to check: the E residual (was:) coop-bot L5 tripwire on 9f596384: `TRIP=1 THIN=5 node dev/test/coop-bot.js 4 <out>` must play 4/4 (last run stuck at week 3 = the ready race fixed in 9f596384; rerun). If the E residual is really the tối go path, either count it as G in coop-thin-trip.js (post-wrappers under nextBuoi with CW.allowN) or say so in Done.
2. Rerun on the final sha (5 changed paths since the last full gate): coop-thin-e L5 + swap, coop-night THIN=5, coop-timer THIN=5, coop-thin-c L5 (never run), coop-thin-a/b/c/d L0–4 spot (a L1, b L4, c L4, d L4), coop-e2e (+COOP_SWAP=1), coop-p2, coop-one-world seeds 1–10 (sh: see #2 list), quickcheck.
3. Perf re-measure: `CPU=4 node dev/test/coop-thin-e-perf.js <W> 5` (her step for real now).
4. Shots host Fold + guest iPad at a buổi step + a night result (scratch only; CDN img/_review/coop-thin-e/ only if the reviewer asks).
5. '## Done': deleted/bypassed table (rows 1–12 of 0b, all bypassed through eW() + the outer nextBuoi guard), tripwire before/after, tests, sha; CLAIMS 'SẴN SÀNG KIỂM <sha>'; send_message Foreman B.
Known limits (state in Done): phóng cung START counts only the host's aged maids (w.x.mine); punish() of HER entry as vu cổ culprit lands on her stand-in (B4 / world) — not E. Her ready lives in host memory (re-sent on host boot change); her owed step (E.owe) is lost on a host reload (her next ready catches up through the normal step).
