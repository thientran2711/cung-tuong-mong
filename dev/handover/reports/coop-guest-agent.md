# coop-guest-agent — a co-op guest's own servants live the agent month, exactly once

PRIORITY #1 CHECK ('agOn coopGuest guest servants agent month agSelf asSelfOn'): OD 0 | ledger 0 | claims CLAIMS:513 (this worker only) | main 794c6b77 jagent.js:28 agOn() false when agGuest(); precedent jagemp.js:35 empGuestSelf (guest's own deeds), j10.js:78 / jmline.js:107 mlGuest (guest runs her own household only) | review/* none (review/coop-thin-g changes jagent.js:27 agGuest → coopGuest(), see Merge note) | archive 0.

Worker session_01N1tNP6ULPfAUKCrZASGHHM (opus), coordinator Foreman B ROOT-3 session_01N1tNP4eeTKEG4m5mtSjnKd. START_CTX ≈ 4 % of 1M (estimate) → rollover ≈ 29 %, ceiling 60 %.
Branch **review/coop-guest-agent** from LIVE 794c6b77: r1 code e379c2bb + site b7648b65; **r2 (Foreman B: leftovers = same family, law 11) code cec0b93d + site 60ff8f11 (head, pushed)**.
Branch **review/coop-guest-agent** from LIVE 794c6b77: code e379c2bb + site rebuilt **b7648b65** (head, pushed).

## Cause
`agOn()` (jagent.js:28) = agent layer on AND `!agGuest()`. It was written so the guest's phone never runs the WORLD's agents twice (the host owns NPCs). But jagstaff `asMonth` (wrapped onto j10 `servMonth`) loops every household and starts with `if(!asOn())return""`, so on the guest it also skipped HER OWN household. Her household lives only in her own blob (P.b.S.staff, written by her toCanon; the host's stand-in of her is built with `staff:[]`, jcoopworld buildFriend), so nobody ran it: her servants got **no wage / Sức, no secrets, no betrayal found, no Ban gả (agent), never left by age** in co-op, at every thin level (≤ 12: her phone runs her week end; 13 / G: the host runs it in her context with coopGuest() true — same switch).
Second fault found on the way (host side, same family): a friend who plays a MAID sits on the host as an `s.coop` stand-in in an NPC's staff; the host's `asMonth` / `asStaff` treated her as an NPC maid — paid her, and **aged her out / married her off** (asOut spliced her out of the household until the next week's placeFriend). Her life is her own phone's (cnvGrant / cnvAge player cards).

## Fix (ONE switch, the empGuestSelf / mlGuest pattern)
- jagent.js: `agLive()` = agOn without the guest test; `agOn()` = agLive() && !agGuest() (unchanged value); **`agSelf(p)` = agOn() || (p===S && agGuest() && agLive())** — the agent layer decides for p's OWN household on this seat.
- jagstaff.js: `asSelfOn(p)`; `asMonth` runs only households with asSelfOn(p) (host / solo: all, as before; guest: hers only) and skips `s.coop`; `asStaff` (day plans) skips `s.coop`.
- j42.js maidLoveMonth: the old Ban gả dice (roll 3) never also grant one of HER maids while her agent month runs (never twice). Its love start / exposure stay (in agent mode those are day acts, which do not run on the guest → old dice keep them at once, not zero).
- jcmaid.js cmCh, jpromsv.js spMonth: her own chief maid / proud staff use the solo agent odds on the guest seat (were the old fallback odds = different numbers from solo for the same person).
Solo and host: every changed line returns the old value there (agSelf = agOn; asSelfOn = asOn; maidLoveMonth returns early when asOn) → **solo numbers unchanged by construction, no bot run needed**.

## Exactly once across the room
| who | runs her servants' month | where |
|---|---|---|
| her phone, level ≤ 12 (LIVE CAP 9) | YES (asSelfOn(S)) | her week end (endTurn → monthTick → servMonth → asMonth), her blob P.b.S.staff → server |
| host, her stand-in | NO — stand-in has `staff:[]` | buildFriend |
| host, friend-as-maid stand-in (s.coop) | NO — skipped (was: paid / aged out) | asMonth / asStaff |
| host in her context, level 13 (review/coop-thin-g) | YES once (coopGuest() true → agSelf(her S)); her phone runs 0 endTurn there | G CW.gNight |

## Family scan — every agGuest / mlGuest / agOn-guarded month or household path (LUẬT SỬA CẢ NHÓM)
| # | site | what it guards | before (guest) | after (guest) | verdict |
|---|---|---|---|---|---|
| 1 | jagstaff asMonth (servMonth wrap) | wage, Sức, secrets, betrayal found, Ban gả, age choice | all households OFF (hers dropped) | HER household ON, NPC households off | **fixed (dropped her people)** |
| 2 | jagstaff asMonth / asStaff on HOST | friend-as-maid stand-in s.coop | paid, aged out, married off by the host | skipped | **fixed (host acted for her)** |
| 3 | j42 maidLoveMonth Ban gả roll(3) | old grant dice | ran for her maids (asOn false) | skipped for her maids while #1 runs | **fixed (would be twice)** |
| 4 | jcmaid cmCh (cmMonthMe, her chief maid) | spy / talent inclination | old fallback roll (≠ solo) | solo agent odds | **fixed (parity)** |
| 5 | jpromsv spMonth (proud servant leaves) | leave chance weight | old weight (≠ solo) | solo agent weight for hers | **fixed (parity)** |
| 6 | j10 servMonth mlGuest G | NPC loyalty decay, NPC-vs-NPC spies, fillStaff of NPCs | NPC off, hers on | same | correct exclusion (world = host) |
| 7 | jmline mlMonth mlGuest | seek / feud / hit | hers on (old dice) | same | correct: agent path = day acts (not on guest) → old dice = once |
| 8 | j10 spy "Lén báo tin" / friend tell, j14 sale, j10 lover init (`!asOn()`) | old dice replaced by DAY acts | old dice on guest | same | correct (day acts not on guest → once) |
| 9 | jcmaid cmMonthNpc mlGuest | NPC chief maids | off | same | correct (world) |
| 10 | jagmaid servMonth wrap amOn (empOn → agOn) | his regard of maids fades, favoured maid rises to consort | off | same | world (Emperor / seat = host; her maid's rise = jcoopask request path). FOR B (low): her maid's regard never fades on her seat |
| 11 | jagacts3 p3MaidMonth (p3On → agOn) | maids' festival / affair cards | off | same (wrapper of asMonth, still gated) | FOR B: her maids' monthly cards are world-facing (near the Emperor) — leftover |
| 12 | jagstaff asTick / jagday day plans (agOn / agDOn) | her staff's DAY acts | off | same | FOR B (law 6b, bigger): her servants do not plan / act by buổi in co-op; old dice cover the month-level parts (rows 7–8). A day-act lane for her household needs the host-computes contract (acts target world people) |
| 13 | jagent agTick / agWatch / agSeeHer, jagharm, jagknow, jagmin, jagemp, jagtoil, jgreet, jmgt mg2On, jagacts2 empGive/thGive, jeitem, jemoact, j75 pillowNpc, j95 | NPC consorts / Emperor / Thái hậu / world loops | off | same | correct exclusion (world = host); jagemp empGuestSelf already keeps her own deeds |
| 14 | j17 ageYear (allServ) | her staff age | ran (no guard) | same | correct (once, her week end) |

## Tests (build e379c2bb / b7648b65)
| test | result |
|---|---|
| **dev/test/coop-guest-agent.js** (new, 12 months, seeded; solo / guest / host seats) | **18/18 OK** (on LIVE 794c6b77: **6 FAIL** — guest wages 0 every month, age choice and Ban gả never reached, host paid + aged out the friend-maid stand-in) |
| — guest: her staff paid exactly once every month, never twice; age choice asked at BAL.srvAge.ask; Ban gả offered; aged 1 year in 12 months; NPC households never run on her seat; agOn stays false | OK |
| — host: her stand-in carries no staff; friend-maid stand-in never paid / aged out; host + solo still run every NPC household | OK |
| quickcheck (`bash dev/tools/quickcheck.sh`) | **PASS** 388 s (core gates, one-core-guard, rules-one-source, kit-conform, coop-one-world, time-spill, old save loads, perf new/live render 238/226, tab 485/486, buổi 1353/1147 ms) |
| one-core-guard / text / text-rule / bind | PASS ×4 |
| coop-e2e ×3 (LIVE Worker, host Fold / guest iPad) | 68/68, 68/68, 68/68 |
| role-parity | ALL PASS (open baseline 18, no new gap, promotion checks, no page error) |
| coop-cyc (LIVE level, mixed old guest .tmp/old.html = LIVE build) | 59 ok / 10 FAIL; **LIVE 794c6b77 same run: 58 ok / 11 FAIL** — the same 10 (dung / lui / som / giau: 'host's week draw waits for her answer', 'guest has the same night', som / giau 'host drew her (forced deck)') + LIVE's 'mixed: host waited for the old guest' → pre-existing (cycle night draw, not servants; G #7 found the giau one on LIVE too), none new |
| coop-thin g4 / g4s / cycs (level 13) | not on main (review/coop-thin-g) — to be run by G #8 after merging this branch (Merge note) |
| bots n ≥ 30 | not needed: solo / host values unchanged by construction (above) |

## Merge note (for Foreman B → coop-thin G #8, same lines)
review/coop-thin-g rewrites jagent.js:27 `agGuest()` to `coopGuest()`. This branch rewrites line 28 (`agOn`) and adds `agLive` / `agSelf` right after it → a textual conflict on lines 27–28. Resolve = keep G's `agGuest` body + this branch's `agLive` / `agOn` / `agSelf`. At level 13 the host's run of her week end (coopGuest() true, S = her store) then runs her household once; her phone runs no endTurn there. G's 28-site seat-guard family does not touch the five lines changed here (j42 maidLoveMonth, jagstaff asMonth / asStaff, jcmaid cmCh, jpromsv spMonth).

## r2 — the rest of her people's life (Foreman B order 20/11 ~21:22Z: the three leftovers are the same family)
Mechanism (jagent): `agMine()` = this seat may run ONLY her household (her phone, or the host inside her context TH.withSeat "b"); `agSelfRun(f)` = run f with agOn() true (solo rules: stf2 / p3 / amOn options), every loop inside keeps to her household (asStaff, asMonth0, amMaids, the jagmaid consorts loop filter `p===S` when agMine()).
| leftover | before (r1) | after (r2) | where it runs, once |
|---|---|---|---|
| (1) her servants' DAY acts | none in co-op (asTick off on the guest; the host's day plan never sees her staff: stand-in staff:[]) | `asTickMine`: one tick per buổi key, guard **S.asK in HER person** (travels with her blob / the host's patches), plan S.agS, solo option list (stf2 included) | level ≥ 5 (LIVE 9): the HOST after her buổi step in her context (jagstaff wraps nextBuoi: `COOPW.ctx` set → asTick → asTickMine; placeWhere does not run there, jcoopthine E); level < 5 and her week end: her phone (placeWhere → asTick). World part of a deed follows that seat's contract (E put-back / part C lens); her household's part stays. |
| old dice that the day acts replace (her household) | ran on her seat (asOn false) | off while her acts run: `asSelfOn(owner)` in j10 lover init / spy report / friend tell, j14 sale, jmline seek start / master react / feud, j42 maidLoveMonth (her maids left out of the list; r1's grant-only skip folded in) | host / solo: asSelfOn = asOn → unchanged |
| (2) his regard of her maids fades | never on her seat | jagmaid month body runs in agSelfRun for her maids (decay; a favoured maid's rise = amRise → newRival → the guest→host request jcoopask, the same path as mlEye) | her week end (her phone ≤ 12; host in her context at 13) |
| (3) p3 monthly cards (Rót rượu gần ngự tọa / tryst knowledge) | never on her seat | jagacts3 asMonth wrapper: agMine() → agSelfRun(p3MaidMonth), amMaids = her maids only | same as (2) |
Not changed (correct exclusions): every world / NPC loop (rows 6, 9, 13 above), mlFeud for p===S on the guest (her maid harming an NPC maid = world, host), mlHit (p===S never rolls).

### r2 tests (build cec0b93d / 60ff8f11)
| test | result |
|---|---|
| dev/test/coop-guest-agent.js (extended: 25 checks) | **25/25 OK** (r1 build: the 4 new r2 checks FAIL — day acts 0 on guest and host-context, fade 0, p3 0) |
| — guest: her staff act every buổi, once per key (a 2nd asTick in the same buổi = no-op), no NPC staff act on her seat | OK (8 ticks / 8 buổi) |
| — host in her context (COOPW.ctx "b"): same, once per buổi, no NPC staff | OK |
| — regard fade once a month for her maids (sung 20 → 20 − amD().decay), never twice; p3 cards for her maids only | OK |
| — solo: staff day acts stay on the jagday plan (asTick adds no tick), fade + p3 still run | OK |
| quickcheck | PASS 389 s (render 214/222, tab 488/481, buổi 1099/1479 ms new/live) |
| one-core ×4 | PASS |
| coop-e2e ×4 | 68/68, 68/68, 66/68, 68/68 — run 3's 2 reds = 'both seats show the same Thái hậu picture' (guest fid null: her picture not loaded), not servants; runs 1, 2, 4 green |
| role-parity | ALL PASS |
| coop-cyc | 59 ok / 10 FAIL — the same 10 as r1 and as LIVE 794c6b77 (cycle night draw, pre-existing) |

## Leftovers FOR B
- None from this family. Rows 10–12 of the r1 table are done in r2.
## Leftovers FOR B
- Row 12: her servants' DAY acts (asTick / day plans) in co-op — a lane of its own (host-computes contract).
- Rows 10–11: her maids' regard fade and p3 monthly cards on her seat.

## REVIEW r1 (BIG, opus; reviewer session_01N1tNP34YLAbVuMi631JPUN) — PASS a00be4e5 (review/coop-guest-agent-r1)
PRIORITY #1 CHECK: OD 0 | main 463d3d70 jagent.js:28 agOn() (no other fix) | review/* review/coop-thin-g (jagent.js:27 agGuest → coopGuest, same lines) | claims CLAIMS:539 (this review) + 529/541/542 (worker).
Reviewed 60ff8f11 (code cec0b93d). r1 = merge LIVE 548dcd0d (8500c108) + reviewer test fix (9d36517a) + merge LIVE 463d3d70 (a00be4e5, index.html/sw.js rebuilt; no source overlap with the branch; main's jcoopworld change = jpma ask kinds, unrelated).

### Design check (every person's month / day act exactly once across the room)
| path | solo / host | guest phone | host in her context (level ≥ 5, her buổi step) | verdict |
|---|---|---|---|---|
| asMonth (wage, Sức, secrets, betrayal, Ban gả, age choice) | asOn → all households (unchanged); her stand-in staff:[]; s.coop friend-maid skipped | her household only (asSelfOn(S), agSelfRun, mine filter) at her week end (j3 endTurn → monthTick) | never (herStep loop stops at the host's buổi; never reaches endTurn below level 13) | once |
| asTickMine day acts | asPlanned → jagday (unchanged) | week start key w-0 (j3 endTurn → placeWhere → asTick); all buổi at level < 5 | jagstaff nextBuoi wrapper after each of her steps (jcoopthine's placeWhere wrapper is outermost and returns early in herStep → no second path) | once per key (guard S.asK in her person; travels in the part-D patch / her erd diff) |
| jagmaid fade / favoured rise; p3 cards | amOn / p3On → unchanged | agSelfRun, amMaids = hers | (level 13 only, G) | once |
| old dice off via asSelfOn(owner) (j10 lover init / spy report / friend tell, j14 sale, jmline seek, j42 love+grant) | asSelfOn = asOn → unchanged | off for HER household only; NPC households unchanged | — | replaced, not lost: Hẹn ước / Lén báo tin / Trò chuyện / Quỳ dâng trà / love acts are in asOpts and now run on her seat (r2); the sale has no agent twin in SOLO either (solo agent mode = buyer's fillStaff) → parity with solo |
Solo / host: every changed line returns the old value there (agSelf = agOn, asSelfOn = asOn, mine = false, maidLoveMonth returns at asOn) → no number moves; bots not needed (law 4: no new number, everything from BAL; one-core guard PASS).
Laws: 1 two-way ✔ (her people live as the host's / solo), 4 ✔, 6b ✔ (no zero, no twice), 7/9 n/a (no new player word, no UI).

### Tests (reviewer runs)
| test | result |
|---|---|
| dev/test/coop-guest-agent.js | on merged build first **24/25**: SOLO fade check had no maid left (the seed sends both her maids away in month 1) — fragile probe, not code; also found p3 / host-DAY reds across reruns (probe life died, fest month luck). **Fixed (9d36517a)**: a fresh young maid after the 12 months, one non-fest servMonth (fade exactly once on solo / guest / host) + one fest servMonth (her p3 cards); post-month wages not counted; a probe life that died is rerun. Now **ALL OK 26 ×4** (incl. on a00be4e5) |
| REAL ROOM level 9 (LIVE Worker; coop-thin-e.js 9 + counters, scratch, not committed) | E-suite 33/33; her staff day acts: host in ctx b keys 0-1, 0-2, 0-3; her phone 1-0 (week start) → disjoint by seat. Repeats of 0-1 / 0-2 on the host came only after E14's own state surgery (the test rewinds her stored buổi on the host but keeps her staff) — no real path rewinds buổi without rewinding the person (host reload restores the whole store or rebuilds it from the week base, S.asK included) |
| REAL ROOM coop-e2e (+ counters) | the LIVE Worker room in coop-e2e runs at level 0 (old relay): her ticks on her phone 0-1 … 3-0, 12 keys, none twice, host 0 |
| quickcheck | PASS on 548dcd0d merge and on a00be4e5 (149 s; core gates PASS, old save ok; render 170/161, tab 273/320, buổi 1040/833 ms new/live) |
| coop-e2e | 68/68 ×3 on the 548dcd0d merge, 68/68 with counters, 68/68 on a00be4e5 |
| e2e 66/68 (worker run 3, 'same Thái hậu picture', guest fid null) | not reproduced in 5 runs; picture load race on the guest (figure fid read before the CDN face loads) — servants code never touches the Thái hậu figure → flake, not this branch |
| role-parity | ALL PASS (548dcd0d and a00be4e5) |
| coop-cyc PAIRED (new vs LIVE 548dcd0d, same old guest .tmp/old.html, 2 runs each) | NEW 58/11, 60/9 · LIVE 60/9, 58/11 — the same 10 cycle night-draw reds on both sides (dung/lui/som/giau 'week draw waits', 'same night', som/giau 'forced deck'); 'mixed: host waited for old guest' red in 1 NEW run (worker saw it on LIVE), 'lui: halves her NEXT flip' red in 1 LIVE run → flaky on both, pre-existing, not servants |
| coop-thin g4 / g4s / cyc / cycs | not on main (review/coop-thin-g) → G #8 runs them after merging this branch |

### Notes FOR B (not blocking)
- Merge with review/coop-thin-g: textual conflict jagent.js 27–28; keep G's agGuest body (coopGuest()) + this branch's agLive / agOn / agMine / agSelfRun / agSelf. Under G, coopGuest() is true in her context on the host → agOn() false there outside agSelfRun; asMonth / jagmaid / jagacts3 / asTickMine all enter agSelfRun via agMine() → still once.
- Edge (low, rare): her own CHIEF maid (S.maid.fav) rising on the guest seat (amRise close path) is not kept in CW.askMaid like a staff maid (mlRose) → if the host refuses the rise request she does not come back. fav is set only by the Emperor's world (host), where her maids are not present → practically unreachable today.
- asTickMine guard is "last key ≠ this key" (as ASN.key solo); a monotonic key would block test-made rewinds too but could zero her acts if keys ever went backwards — kept as is.
