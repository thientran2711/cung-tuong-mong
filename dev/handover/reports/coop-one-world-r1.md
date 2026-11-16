# coop-one-world review r1 — VERDICT: PASS cb84d1ba

Reviewer session_01UV1SzjwwR8MVK2MWpikBAb (opus), coordinator MAIN s24. Date 11/16/2026. START_CTX ≈ 7 % of 1M (rollover ≈ 32 %, ceiling 60 %).
Reviewed: review/coop-one-world @ 008ed0b9 (worker report reports/coop-one-world-fix.md, audit reports/coop-one-world.md).
Result branch: **review/coop-one-world-r1 @ cb84d1ba** = latest origin/main c1e1bbd1 + the worker branch + 3 reviewer fixes, site rebuilt, fast-forwardable (origin/main is an ancestor).
Rules read: START_CORE, START_WORKER, START_REVIEWER; OD "(16/11 ~19:57Z … OWNER (co-op, verbatim)" and "(16/11 ~20:32Z … CO-OP FIRST" (one world, both read the same number).

## Merge with main (conflicts resolved)
- jcoopworld.js: main's coop-b1b5 B2 night (`tn` W key, `hrSync`, `delete P.S.heir`, `cyHold` in sendEnd) kept TOGETHER with the one-world changes (W_KEYS = main's list + thIll/cm/men/menG2; HOST_ONLY; splitP/joinP; guestNet in sendEnd). `tn` is not HOST_ONLY: the guest's flip never draws (B2), and any endTurn change of it is taken back by the net.
- assemble.py: main's list (incl. jsteal.js) + jcoopone.js last. index.html / sw.js / assets.json: rebuilt.

## Reviewer fixes (small, on review/coop-one-world-r1)
| # | fault | fix | commit |
|---|---|---|---|
| F1 | **Epidemic no longer reached the guest** (brief point 2, FAIL condition): jcoopone MUTEs `epidemic` on the guest, and the host's roll ran with her entry pulled out of the harem (endTurn) and its text never went to `cnews` → in co-op she never saw nor caught the palace epidemic. | jcoopworld: on the host, `epidemic` runs WITH the friend's entry (same pattern as B4 rivalsTurn/festival; her kids hidden during it — they are display copies, their illness rolls on her own seat); its news line goes into `CW.news` → `cnews` (her "ngươi" lines are filtered by worldNews as before). `__b.ill` snapshot + toCanon write-back: her entry's `ill` (known:true) and `confined` land on HER blob. Probe (one page, forced roll): guest `epidemic()` = "" ; host: friend entry ill daumua + confined 1, news has the outbreak, P.b.S.ill = {daumua, st1, known} + confined 1. | c5b94232, aaeeda11 |
| F2 | **Missed raw world roll (brief point 1)**: jgift.js:233 — NPCs' day with the Emperor (`kmEmpAct`: Sủng ±, Sức −5, Ân +1, onlookers' ghen +3) rolled at buổi 1 on BOTH seats; it runs in nextBuoi, outside endTurn, so the guest net did not take it back → guest's roll added on the merge (double count). Also it could act for the friend's entry on the host. | `worldOn()` + skip `v.coop`. Buổi probe (guest seat, 10 days × 3 buổi, no acts): world paths moved on the guest before = R.kmEmpDay/sung/suc/an/danh/kmWalk; after = only S.wx.n (jclose wxSync: deterministic per buổi, same on both). | f65f0152 |
| F3 | No two-seat test of "both read the same number". | NEW dev/test/coop-one-world-play.js (LIVE Worker): 3 merged weeks, guest leaves/rejoins in week 2, host in week 3; at every merged week both seats' world (every NPC's public numbers, ill, preg, lot, kids; Emperor mood/ill/age; thIll/thDead; cm; men; trieu; weather; date) must be identical. | aaeeda11 |

## Checks
| # | check | result |
|---|---|---|
| 1 | every audit world loop guarded (jcoopone MUTE / ONLY_ME / PERSON + inline j3/j8/j13) | yes, matches the audit list. Independent grep of buổi-time loops (nextBuoi wrappers): jgift kmEmp = MISSED → F2; jpromo prNpcScan has prHostOK; jroute rtNpcMeet = her own sighting; j21 invite = her own; rivalsBuoi/pickTarget guarded on main. Salary (stipend PERSON), pregnancy (rivalsMonth host-only), illness (illMonthP PERSON, Emperor/TH inline), Thái hậu (thIll W key + inline), NPC lives (jmort host), contests (festival host-only + coop-contest), nights (main B2 host flip), epidemics (F1), weather (rollWx in endTurn → net; buổi wx deterministic), prices (shop personal, by design). |
| 2a | S.facs personal ok? | **Not ok as a design, not a regression**: phe (S.facs) is a world fact (NPC + her alliances) kept per seat; before this branch each seat rolled its own facMonth (diverged), now the guest's is ONLY_ME (her copy stays stale). Same class as #24 men. FOLLOW-UP (co-op first): make facs a W key, host-computed, her join/leave/found via jcoopask. Not blocking this PASS (it does not make it worse). |
| 2b | epidemic reaches the guest as a shared fact | FAIL on 008ed0b9 → fixed by F1. |
| 2c | residual raw rolls covered by the net (coop-one-world.js SEED 5, 12 weeks, guest raw endTurn): R.age, R.an, R.bac, R.danh, R.emo, R.inv, R.kids, R.rash, R.staff, R.suc, R.sung, R.tamco, R.tcAge, R.tho/thoX, R.tyNvp/tyWhy, R.wd/wdSeen/wdk, S.court.ksp/ped/ty, S.emp.emo, S.thO, S.wx | all taken back: guest SENT week changes 0 world paths; merged == host on every world path (seeds 3, 5, 7, 9, 11). |
| 3a | solo unchanged seed-for-seed | identical: in-page seeded RNG + crypto + Date pinned, 40 weeks, ser() hash every 10 weeks, main 1aa0edb2 vs branch, seeds 7 / 23 / 41 → 12/12 hashes equal. |
| 3b | old saves | quickcheck old live save loads + plays (PASS). Old co-op room: coop-one-world.js part 5 (base without men/cm/thIll: guest never writes them, her men ties stay personal, round trip OK). |
| 4 | co-op tests | coop-e2e.js (LIVE) 59/59 (twice; last on a6956875) · coop-one-world.js PASS (seeds 3,5,7,9,11) · coop-one-world-play.js 20/20 (1st run 19/20: "week 3 host: guest sees the wait" timing flake, rerun clean) · coop-rejoin-stats.js 83/83 on rerun (1st run 81/83: guest's random thân phận was a cung nữ → no friend entry to read stats from; main 1aa0edb2 also fails 1 row of this test on its run = random-identity flake). |
| 4b | mid-week | info only: between merges the host's buổi-time NPC rolls (e.g. kmEmp) reach the guest at the week merge (latency, never a double count); at every merged week both seats are identical. If the owner wants NPC day events live on both screens, relay them like main's `ctm-tn` (follow-up, design). |
| 5 | live Worker | no change under coop/ or dev/coop/ (diff vs main empty); merge3 unchanged. Worker's decision (client net, not server host-wins) accepted: server host-wins would drop her real acts every week. |
| 6 | quickcheck cb84d1ba | PASS · 166 s · open 1020 ms · old save ok · perf new/live render 337/293, tab 337/351, buổi 1193/1136 ms, tasks>200ms 14/13 (a6956875 before the last main merge: render 305/341, buổi 1024/1004). coop-e2e on cb84d1ba 59/59; coop-one-world SEED 7 PASS. |
| UI | kit / VANPHONG | no UI change in this branch (no new player-visible text except the existing epidemic line now relayed). |

## Follow-ups (not blocking)
1. S.facs → W key, host-computed (2a). 2. Live relay of host NPC day events (4b), if wanted. 3. Guest's own line for the epidemic says her name in third person ("<name> nhiễm bệnh."); a "Ngươi mắc đậu mùa" line for her would be nicer (small). 4. thDrop of the guest no longer colours Thái hậu mood (worker's note).

Shots: none (no UI change). Scratch: /home/user/wt/cow-notes (probes: probe-buoi.js, solo-seed.js, epi.js) — not in git.
~95 % xong / ~90 % chơi được (co-op one world).
