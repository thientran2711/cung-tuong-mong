# coop-driver-fails report (worker session_01964izFSjtour8BhRvzbeT4, Foreman D ROOT)

PRIORITY #1 CHECK: brief briefs/DROOT-coop-driver-fails.md (OD 3 | ledger 5 | claims 8 | main 15 | review/* 10). Sources read: reports/coop-real-port.md L23/L37, reports/coop-thin-g.md L695–L730, reports/coop-flakes.md (#4/#6/#7), FOREMAN_D_STATUS 22/11 23:12Z. Overlap guard: `git diff --name-only $(merge-base) origin/review/coop-thin-g-f1` (B, ~95 files incl. coop-cyc.js, coop-thin-f1.js, jcoopthin*.js, jcoopworld.js, index.html) and origin/review/coop-famops-t1 (E: jcoopworld.js, jil.js, coop-famops-unit.js): NONE of those files edited here.

Branch review/coop-driver-fails @82c21e84ac617d05ed78b879aec54c9d7c195df6, base LIVE 52ad65b3. TEST-ONLY so far (dev/test only; no game file, no index.html/sw.js change). LIVE has since moved (91dc91d3 → ca801185 → 31956a09): NOT merged yet.

## Roots found (all on LIVE, 1+ runs before, proofs in the driver comments)
1. NIGHT family (b2b5 B2.1/B2.2/B2.3, r2 step 3, rev2 deferred flip, cyc) = TEST FAULT. Since MAIN ROOT-82 (20/11, jnf UNPARKED) a room with both seats in the palace plays the night through jnf (flip at end of tối, 10 s choice, host resolves once, record S.nightWhy/S.nfX per day = wk()); the old B2 week key S.tn / tnRelay / CW.tnWeek is OFF there on purpose (jcoopworld.js:923 tnRelay and :968 tnWeek return on nfOn()). Proof (b2b5 trace): nfOn/nfParked/roomOff = [true,false,false], S.nfX {d:0,t:902,fr:"keep"} = jnf flipped the guest and she held — the night works, the drivers asserted the retired key. Fix: lib/coop-real.js ADDED nfBoth / NREC / nightRec (the same seat-neutral record coop-steal checks); the drivers read it when jnf owns the night, keep the old checks for a parked room. Not a game bug: jnf still honours her Kỳ nguyệt wait (jnf.js:211–213 cyHold).
2. PARALLEL-TIME family (r2 step 2 petsteal/musk/kpoison, «no npc») = TEST FAULT. Since jptime (OD 18/11 ~20:15Z) an NPC harm deed is SENT (jptime.js:456 ptNpcSent → ptNpcDeed returns "", lands at the due khắc); only ACT_NOSEND (j9.js:85: takeaway…) run at once. Driver now moves the deed's due to now and runs PTIME.tick() (the real landing path, rolls still forced).
3. NPC-PURPOSE (p2 B2 heir) = TEST FAULT. j51.js:72 heirMonth → npcWhy("heirName"); the forced roll alone never names an heir. Driver forces npcWhy heirName for the call (as npc-purpose tests do).
4. SEAT (b2b5 B5, r2 step 4) = TEST FAULT (precondition): jcoopworld seatWeek gives the last seat to the higher Sủng (tie = seeded draw); the week's jnf night may raise hers. Driver sets her one Sủng below the host's entry (restored).
5. b2b5 B2.3 NPC = TEST FAULT (fixture): the forced NPC could be in her own Kỳ nguyệt tuần (jflip cycleOf bars the card); now an NPC on the tray; under jnf the force can land a night late → a second forced week if needed.
6. thin-d kit copy ×7 = TEST FAULT: diffs were only data-kfsp (jfigseal KFS_ID), data-kav (KIT_AV.P), data-kfp (kfpGet) = per-render registry handles; coop-thin-d-kit.js signature now leaves them out.
7. thin-d invite «an offer» "" = TEST FAULT: at level ≥ 6 (thin F1) her act is an intent; runAct returns "" by design; the host's thInv card (next check) proves the offer.
8. rev2 crash = SET-UP: needs .tmp/old.html (its usage line): `mkdir -p .tmp && cp dev/index.html .tmp/old.html` after assemble.
9. withSeat selfTest (thin-d last red, thin-d-probe P6) = GAME, in B's LOCKED file → FOR D/B: after TH.withSeat(her seat) the host's S.nmReg gains her maid's name (`.S.nmReg.<maid name>: undefined → "maid"`, also `.g.KMS.nmReg`). nmReg is HOST_ONLY (jcoopworld.js:44); something in her context registers a name into the host's own S. Root fix sits in jcoopthin.js withSeat (on review/coop-thin-g-f1) → not touched.
10. thin-f1 (F1 real tap doAct result card + rkOfFace raw {$r}) = file and root both on review/coop-thin-g-f1 (B's #10 root analysis, reports/coop-thin-g.md L695+) → not touched, FOR D/B. coop-cyc.js (night family, item 1) is also on B's branch → same port needed there (B).

## Per-driver table (LIVE 52ad65b3 runs; deployed Worker; thin at level 9)
| driver | LIVE before | root | TEST/GAME | fix | after (runs) |
|---|---|---|---|---|---|
| coop-b1 | 0 fails (L1) | — (old step-8 flake not seen) | — | none | 44/44 ×1 (needs 2 more) |
| coop-b2b5 | 5 (L1), 5 (L2) | 1, 4, 5 | TEST | nightRec port, Sủng precondition, tray NPC | 28/29, 28/29, 30/31, 28/29, 27/29: B2.1/B2.3 still flaky (NPC wins by Tranh sủng → assert relaxed to «one holder»; last run B2.3 «cause none» = no card turned that night) — NOT 3× clean yet |
| coop-p2 | 3 (L1) | 3 (+B3 card order: passed since, dump added) | TEST | npcWhy heirName | 46/46 ×1 (needs 2 more) |
| coop-r2 | 9 (L1) | 1, 2, 4 | TEST | jptime landing, jnf step 3, Sủng precondition | 46/46 (L6); L4 had step-1 «lost relay» + step-4 reds once (dump added, not seen again) — needs 2 more |
| coop-rev2 | 2 (L1) + crash | 1, 8 | TEST | nightRec + cycle-week timing; old.html | 39/39 (L6), 32/32 (L5 before old.html) |
| coop-cyc | 12 (L1) | 1 | TEST | FILE ON B's BRANCH → FOR B | — |
| coop-pets | 0, 0, 0 | #4 not reproduced (3 runs) | — | none (SETUP-RESET + rank trail already there) | 58/58 ×3 |
| coop-guest-maid | 0, 0, 0 | #6/#7 not reproduced (3 runs) | TEST | #7: step-3 precondition re-check (SETUP-RESET printed) | 40/40 ×3 |
| coop-guest-men | 2 (L1 step 6), 2 (L5b step 6) | OPEN: her th ease stays on her screen (st 2) but NO "th" request is built (coopAsk []; askSnap.th st 3; no page error) | open | probe added (every ser after the ease: st, open th requests, askSnap) | 53/53 ×6 since (L4, L5, L6c cnv, L7 ×3) — 2 reds in 8 LIVE runs |
| coop-thin-d | 8–9 | 6, 7, 9 | TEST + GAME(locked) | kit signature, F1 invite | 52/53 (only selfTest = item 9) |
| coop-thin-d-probe | 1–2 | 9 (+ P1/P5 «proof counted once» once each) | GAME(locked) / flake | selfTest dump | 33/35 |
| coop-thin-f1 | 2 | 10 | B's file | none | — |

Gates done: coop-setup-scan risk 0 (33 drivers: real 30, n/a 1, forced 2); one-core-guard PASS. NOT done: coop-e2e ×2, coop-famops-unit, role-parity, quickcheck, ≥3× clean per fixed driver.

## HANDOVER (rollover at Foreman D's order, context 36 %)
Worktrees: /home/user/wt/cdf (branch, built dev/index.html, .tmp/old.html), logs /home/user/wt/cdf-logs (L*/T* .log/.sum; lane.sh = co-op drivers `bash lane.sh <tag> <driver…>`, lanet.sh = thin drivers `bash lanet.sh <tag> 9 <driver…>`; run detached: `cd /home/user/wt/cdf-logs && setsid nohup bash lane.sh X r2 >/dev/null 2>&1 &`). ONE browser lane at a time.
Next, in order:
1. Merge LIVE 31956a09 (or newer) into review/coop-driver-fails (`flock /home/user/wt/fetch.lock git -C /home/user/cung-tuong-mong fetch --depth=30 origin main:refs/remotes/origin/main`; merge; assets.json conflict → take LIVE), `python3 dev/build/assemble.py`, `cp dev/index.html .tmp/old.html`.
2. b2b5: decide B2.1/B2.3 under jnf — remaining reds are night outcomes, not relay faults (an NPC Tranh sủng; a night with no card). Option: force the NPC choices off (Thôi) the way coop-steal does (`window.__eaOff`, stealWant) so the forced card is the night; then 3× clean.
3. guest-men step 6 (2/8 LIVE): read the new probe (`serT`, `post`) on the next red; candidate law-1/6 game bug in jcoopask.js collect "th" (lines 84–90): her ease built no request although askSnap.th ≠ her thIll. jcoopask.js is NOT on B's/E's branches. Loop: `bash lane.sh G guest-men guest-men guest-men guest-men`.
4. 3× clean each: b1, p2, r2, rev2, b2b5, pets, guest-maid, thin-d (expect only selfTest red = item 9).
5. Gates: coop-e2e ×2 (`node dev/test/coop-e2e.js <out> https://ctm-coop.victoria-tntt.workers.dev`), coop-guest-maid, coop-pets, coop-guest-men, coop-famops-unit, coop-setup-scan, one-core-guard, role-parity (`node dev/test/role-parity.test.js`), `bash dev/tools/quickcheck.sh`. Final merge (9f9d318c): coop-e2e 141/141, quickcheck PASS (old save ok; perf new/live render 325/274, tab 713/640, buổi 1530/1650 ms), coop-setup-scan risk 0, one-core-guard PASS. Also coop-errand 16/16 (a repress smoke). No UI code changed → no Fold/iPad shots.
6. Report FOR D/B: items 9, 10, coop-cyc night port; FOR MAIN (law 4, one line, not fixed): j51.js:75 heir text types «Danh +10» while j3 prints balSg(BAL.kid.heirDanh).
7. SSK line + send_message Foreman D.

## Worker #2 (session_01964izEZxwCL3dekrzAxh79, successor) — 23/11
PRIORITY #1 CHECK: brief + #1's report re-read; overlap guard re-run on LIVE 340ede94: none of B's (review/coop-thin-g-f1) or E's (coop-famops-t1) files edited — only dev/test/coop-b1.js, coop-b2b5.js, coop-guest-men.js, coop-r2.js (none on B's/E's diff). Still TEST-ONLY (no game file, no index.html/sw.js change; assemble reproduces LIVE index.html byte for byte).
Merged LIVE 340ede94 (contains 31956a09), later LIVE 9f9d318c, into review/coop-driver-fails (both clean, no conflict; LIVE 9f9d318c changes kit/UI game files only, none of this branch's files).

### New roots (each with proof on LIVE 340ede94)
11. b2b5 B2.1/B2.3 (the open flake) = TEST FAULT. Under jnf the Emperor's card is the jagemp pick (empSummon → empPick over nightCh), NOT flip(); b2b5's forceFlip wraps flip() (the parked path) and reached the jnf night only by luck — proof B runs 1–3: a single __fdl entry [wk 1, friend pulled out], the night record = his own pick ("host"/NPC 2/NPC 9, cause tablet/stolen). Fix: forceNight = coop-steal's force (nightCh 100 for the target, empPick = the target, no mùng 1/rằm custom, no jvisit visit) for B2.1–B2.3 under jnf + hold() of the three live-game draws that take a forced card away (jemoact eaQ no-flip, empSummon rest, NPC Tranh sủng stealWant), restored before B5; forceFlip kept for a parked room; a second forced week if the force lands late. After: 29/29 ×3, the card turned at the first week each time.
12. guest-men step 2 «he is dead there too (relay)» (Group C) = TEST FAULT. The step called mortKill(m) with no render(); the request rides the rolling save that render starts (jcoopworld.js:1142 render → snapSoon → snapSave → CW.snap → ser → jcoopask collect). Proof H1: guest coopAsk [] at the 20 s timeout, and ONE ser() right after built man:m0:alive=false@2 at once → collect is right, no save ran. Fix: render() after her act, as every real act does.
13. guest-men 6d (2 shapes) = TEST FAULT. (a) G4: the host's own month roll (j13.js:30, host-only, roll(30) → illness ends) ended the set-up illness before her week end (guest thw w8 b3 st3 → null with askSnap.th null = a host rebuild) → set-up re-armed ≤ 3×. (b) H3: thLog read window.__askN.log, which keeps only the last 10 applies (jcoopask.js:153) → servant requests pushed the th lines out (L = []); thLog now also reads the host's durable S.askDone.
14. b1 step 8 (the old «step-8 flake») = TEST FAULT (real rule). laydo answered «Người cùng cung, ngươi không thể ra tay hay lấy lòng» (j9.js:108 sameHouse): host rank 5 (palace head, PAL_HEAD 3), guest rank 1 → the month's assignHouses (j9.js:53, roll 70) can house her under the host mid-test. Fix: b1's act helper un-houses the pair first (counted window.__shFix, logged).
15. r2 step 1 «a lost relay is asked again and restored» — 1 red in 5 on this base (C3), 0 in the next 4. Host asked once (famAsk h = B's sentH) and nothing came back in 15 s. jcoopworld famAsk asks once per pos hash (4 s throttle) and only when a new pos arrives; a lost ask or reply is not retried until her pos changes again. Possible robustness gap (law 6c: her bag on her entry), but jcoopworld.js is on B's locked branch and the red is not proven → probe added (ctm-fam in/out + pos on both seats, dump on FAIL) → FOR D (see below).
16. famops-unit default URL is http://127.0.0.1:8744 (no server in a worker container) → run with `node dev/test/coop-famops-unit.js http://ctm.local/` (coop-serve BASE). Not edited (E's file).
17. role-parity timed out once at 900 s with browser lanes in parallel; alone: ALL PASS. Not a fault.

18. guest-men room stall (G2-2, G3-1: from 6a every merged week timed out) = TEST FAULT, whole family. Proof G3-1 dump: host sent week 5 (ended a), guest at buổi 5:3 with #next «Sẵn sàng» enabled, Q empty, no bend/pend; her one press at tối had opened the world news «VIỆC — Thái hậu bệnh nặng» (jworld2 thb, raised by the test's illness set-up), clear() closed it, and buoiBoth never pressed again. A player presses again → ONE shared step lib/coop-real.js repress(o) (a seat still on the old buổi, #next enabled, no dialog, no buổi/week end out → one more tap, window.__rePress) called from buoiBoth in all 19 free copies (coop-ask-srvprobe, ban-cung, cold-faction, dresscode-scan, dresscode, e2e-tr, errand, guest-maid, guest-men, hauthay, looks-act, looks, lost-scan, pets, pool-face, room-faces, toil-look, ton-row, or20-j68q-coop). coop-e2e.js has the same copy but is on B's branch → FOR D.

### Per-driver table (LIVE 340ede94 + this branch; deployed Worker; thin at level 9)
| driver | before (this base) | root | TEST/GAME | fix | after |
|---|---|---|---|---|---|
| coop-b2b5 | 28/29, 28/29, 30/31 (B2.1) | 11 | TEST | forceNight + hold | 29/29 ×3 |
| coop-guest-men | 53, 54, 54 ok + 52/54 (6d), 52/53 (step 2), 53/54 (6d), 2 room stalls (G2-2, G3-1) | 12, 13, 18 | TEST | render after act; 6d re-arm; thLog askDone; repress | 54/54, 55/55, 53/53 (G4 ×3 after all fixes) |
| coop-b1 | 44/44, 42/44 (step 8) | 14 | TEST | un-house in act helper | 44/44 ×3 |
| coop-r2 | 36/45 (step 1 + its follow-ons), 46/46 ×4 | 15 (open, probe) | ? | probe | 46/46 ×4 since |
| coop-p2 | 46/46 ×2 | — | — | — | 46/46 ×3 |
| coop-rev2 | 39/39 ×2 | — | — | — | 39/39 ×3 |
| coop-pets | 58/58 | — | — | — | 58/58 (+3 on #1's base) |
| coop-guest-maid | 40/40 | — | — | — | 40/40 (+3 on #1's base) |
| coop-thin-d | 52/53 ×3 | 9 (only selfTest nmReg) | GAME (B's file) | none | 52/53 ×3 |

### Gates (this branch; full set on LIVE 340ede94 + branch, sanity re-run on the final merge with LIVE 9f9d318c)
coop-e2e 141/141 ×2 · coop-guest-maid 40/40 · coop-pets 58/58 · coop-guest-men see table · coop-famops-unit PASS 37/37 · coop-setup-scan 33 drivers risk 0 · one-core-guard PASS · role-parity ALL PASS · quickcheck PASS (old save ok; perf new/live render 268/386, tab 683/642, buổi 1746/4691 ms). Final merge (9f9d318c): coop-e2e 141/141, quickcheck PASS (old save ok; perf new/live render 325/274, tab 713/640, buổi 1530/1650 ms), coop-setup-scan risk 0, one-core-guard PASS. Also coop-errand 16/16 (a repress smoke). No UI code changed → no Fold/iPad shots.

### FOR D (B's locked files; not touched)
- item 9: TH.withSeat(her seat) leaves her maid's name in the host's S.nmReg / g.KMS.nmReg (thin-d selfTest, 3/3 runs: Lạc Mai / Hạnh Nhi / Xảo Nhi → "maid"). Root in jcoopthin.js withSeat (review/coop-thin-g-f1).
- item 10: thin-f1 (doAct result card + rkOfFace raw {$r}) — file + root on review/coop-thin-g-f1.
- coop-e2e.js buoiBoth: same one-press gap as root 18 (coop-e2e passed 141/141 ×2 here) → add `if(t%8===7)for(const [o,k] of [[A,a],[B,b]])if(k===k0)await require('./lib/coop-real.js').repress(o);` in its buoiBoth loop.
- coop-cyc.js night family (item 1) — file on B's branch: needs the same nightRec/forceNight port (b2b5 forceNight is the pattern).
- item 15: jcoopworld famAsk retries a lost ask/reply only on her next pos change; if the r2 probe ever shows the ask or reply lost, the fix is in jcoopworld (B/E's file): re-ask on a timer while famGotH ≠ fpos.fh.
### FOR MAIN (law 4, one line, not fixed): j51.js:75 heir text types «Danh +10» while j3 prints balSg(BAL.kid.heirDanh).

Files changed by this branch (all dev/test, none on B's/E's diffs): coop-b1, coop-b2b5, coop-guest-men, coop-r2, lib/coop-real.js (+repress) and the buoiBoth repress line in 16 more bots (list in root 18). Logs: /home/user/wt/cdf-logs (container-local).

SẴN SÀNG KIỂM review/coop-driver-fails 65324cb820aeed95b9dc551bbab759f9b35937e6

### Worker #2 addendum (23/11 ~14:50Z) — merged LIVE 2ba6c64e (contains e9c0a43d / e6894660 / 78324353; brings jcoopworld.js + jil.js of E's famops-t1)
Re-run on the new merge: coop-e2e 141/141, guest-men 53/53, pets 58/58, famops-unit PASS 46/46, setup-scan risk 0, one-core-guard PASS.
19. r2 step 1 «lost relay» (item 15) PROVEN = TEST FAULT (timing). M3 probe: the host's last famAsk for this bag hash was 1.4 s before the test cleared its copy; the one pos the step sends fell inside famAsk's 4 s per-hash throttle (jcoopworld.js:410) → no ask out (host fq has no 'out'), guest received nothing (fq []), and the test sends no later pos. In play her next update after 4 s asks again (not a game bug; the FOR D note on item 15 is withdrawn). Fix: the step waits 4.5 s before its trigger. After: r2 46/46 ×3.
SẴN SÀNG KIỂM review/coop-driver-fails c1634814339e4b85d048c71ac14287c9177205c8
5. Gates: coop-e2e ×2 (`node dev/test/coop-e2e.js <out> https://ctm-coop.victoria-tntt.workers.dev`), coop-guest-maid, coop-pets, coop-guest-men, coop-famops-unit, coop-setup-scan, one-core-guard, role-parity (`node dev/test/role-parity.test.js`), `bash dev/tools/quickcheck.sh`. No UI code changed → no Fold/iPad shots.
6. Report FOR D/B: items 9, 10, coop-cyc night port; FOR MAIN (law 4, one line, not fixed): j51.js:75 heir text types «Danh +10» while j3 prints balSg(BAL.kid.heirDanh).
7. SSK line + send_message Foreman D.

## REVIEW (sonnet reviewer, Foreman D) — 23/11
PRIORITY #1 CHECK: brief briefs/DROOT-coop-driver-fails-review.md; worker report above; LIVE moved 2ba6c64e → f7016b8d during review (final-merged, clean).
Target c1634814 (supersedes 65324cb8). (1) diff vs LIVE f7016b8d = ONLY dev/test (28 files; no game file, assemble reproduces LIVE index.html). (2) Spot-checks OK: b2b5 B2 forceNight/jagemp empPick (old checks kept for a parked room, jnf checks read the same night record), guest-men step 2 render()/6d re-arm/thLog askDone, b1 step 8 sameHouse un-house (j9.js:51-53,108 verified), repress in lib/coop-real.js (law 11: one shared step, 17 one-line calls). Loosenings all carry a written reason; thin-d kit signature ignores per-render handles only.
Reviewer small fixes on -rv (test-only): (a) p2 B3 finds the succession card by pid (jnf notice «Kính sự phòng» can queue first; 2 reds in 5 runs); (b) r2 step 2 «takeaway not on her entry» waits for her pos (same red on plain LIVE); (c) p2 B1 closes a game BÁO card sitting before the offer (1 red in ~10).
Gates on the merge (LIVE f7016b8d): b2b5 29/29 (x3 before), guest-men 54/54 + 53/53, b1 44/44 x2, r2 46/46 x many (2 reds in ~11: one «takeaway» = fixed (b), one 11-fail run whose log was overwritten, not reproduced in 6 later runs), p2 46/46 x3 after fixes, rev2 39/39 x2, pets 46/46 x2, guest-maid 40/40 x2, thin-d 52/53 x2 (only selfTest nmReg = B's file), coop-e2e 141/141 (two earlier reds = Worker 502 / CDN CORS, environment), famops-unit PASS 46/46, role-parity ALL PASS, setup-scan risk 0 (33 drivers), one-core-guard PASS, quickcheck old save OK, perf in range; quickcheck core gate G4 80-dialog-fixed «new-title plate sits ON the event picture» is RED ON PLAIN LIVE too (pre-existing, game/UI, not this branch → FOR MAIN).
VERDICT PASS.
LAND READY review/coop-driver-fails-rv da829e9ba90269d313fe7d909a3a3621bab9b4fb (LIVE f7016b8d is an ancestor)
