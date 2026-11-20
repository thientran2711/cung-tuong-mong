# coop-guest-agent — a co-op guest's own servants live the agent month, exactly once

PRIORITY #1 CHECK ('agOn coopGuest guest servants agent month agSelf asSelfOn'): OD 0 | ledger 0 | claims CLAIMS:513 (this worker only) | main 794c6b77 jagent.js:28 agOn() false when agGuest(); precedent jagemp.js:35 empGuestSelf (guest's own deeds), j10.js:78 / jmline.js:107 mlGuest (guest runs her own household only) | review/* none (review/coop-thin-g changes jagent.js:27 agGuest → coopGuest(), see Merge note) | archive 0.

Worker session_01N1tNP6ULPfAUKCrZASGHHM (opus), coordinator Foreman B ROOT-3 session_01N1tNP4eeTKEG4m5mtSjnKd. START_CTX ≈ 4 % of 1M (estimate) → rollover ≈ 29 %, ceiling 60 %.
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

## Leftovers FOR B
- Row 12: her servants' DAY acts (asTick / day plans) in co-op — a lane of its own (host-computes contract).
- Rows 10–11: her maids' regard fade and p3 monthly cards on her seat.
