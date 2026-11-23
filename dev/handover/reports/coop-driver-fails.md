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
5. Gates: coop-e2e ×2 (`node dev/test/coop-e2e.js <out> https://ctm-coop.victoria-tntt.workers.dev`), coop-guest-maid, coop-pets, coop-guest-men, coop-famops-unit, coop-setup-scan, one-core-guard, role-parity (`node dev/test/role-parity.test.js`), `bash dev/tools/quickcheck.sh`. No UI code changed → no Fold/iPad shots.
6. Report FOR D/B: items 9, 10, coop-cyc night port; FOR MAIN (law 4, one line, not fixed): j51.js:75 heir text types «Danh +10» while j3 prints balSg(BAL.kid.heirDanh).
7. SSK line + send_message Foreman D.
