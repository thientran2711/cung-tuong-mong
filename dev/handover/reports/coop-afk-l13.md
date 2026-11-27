# coop-afk-l13 — an AFK guest at level 13 holds the room's week end (Foreman B brief b-coop-afk-l13.md)
B FIXER session_01N1tNP6jh7b7Ud9kToYmCa1 (opus, BIG co-op, depth 4, START_CTX ~1 % of 1M). Coordinator Foreman B ROOT 2 child 3 session_01N1tNP5aForRyuVGCKqGrnC.
PRIORITY #1 CHECK ('nightAfk|nafWait|gHold|herFree|AFK'): OD 0 new (OD L680 = the bound's ruling) | ledger 0 | claims 2 (this brief + coop-night-wk6) | main 4 (jcooptimer nightAfk family) | review/* 0 other | reused: jcooptimer nightAfk / nafWait (the ONE bound, BAL.coopTm.nightMs) and its mapping (summons / night / own clock / carry), jcoopthing herFree (the ONE «her cards» test of gNight + gHold), jcoopthin part D (S.thq, her pick path).
BASE: brief = review/coop-night-wk6 4ba6d372; that branch passed its BIG review as review/coop-night-wk6-r6 62ac32c2 (LAND READY, FOREMAN_B_STATUS 15:35Z), so this branch is REBASED on 62ac32c2 (no shared file: r6 touched jcoopthine / jfe / jinv / jksize). Branch review/coop-afk-l13-r2 (a NEW branch: a force-push of review/coop-afk-l13 was refused here) = 62ac32c2 + 678967ff (fix) + 1f46e94e (law-11 extension) + 6842b223 («live» card lapse) + 8e2345ed / 9a541138 (site rebuilds) + a1ce5d62 (test harness). review/coop-afk-l13 902b3920 (first push, on 4ba6d372, without the «live» lapse) is SUPERSEDED — do not land it.

## Root (reproduced alone, local wrangler dev Worker :8797, Fold 755x1000 host + iPad 1180x820 guest)
Level 13 (part G): her week end runs on the HOST in her context; her cards (dawn / month cards, the item reveal …) become part-D cards S.thq on her phone. The room's night (CW.gNight, at the go) and his `end` (CW.gHold, after her week end) wait until herFree() = no open card of hers. Her phone is already past her tối (jcoopworld nCheck g-go: CW.sent = this week), so her nafWait (b ≥ tối, sent ≠ week, !pend) never arms, and a phone put down may not tick at all → nothing bounded the wait: host «Chờ hảo hữu…» for ever. Base trace (new test, THIN 13): her Q at the stall = «j7c, e68c:j68c-day-020, Kẻ hầu xin, Việc của kẻ hầu, Hội phối đồ: báo đề, afkT, Tin báo», host pend, gHold true, [w0,w0].
LAW 11 found a second hole of the same family, at EVERY level (THIN 0, also host AFK): her week end ran on her own phone (CW.pend) but tryEnd sends `end` only with an empty Q; the bound's nafWait had `!CW.pend` → a seat AFK on her own week-end cards («Kỳ nguyệt sự», q72o, «Hội phối đồ: báo đề») held the room for ever (THIN 0 AFK=g on the first fix: [0,0], guest pend, sent −1, Q 3). The coop-night-wk6 note «level 0 has no such gap» was wrong.

## The fix (law 11: the ONE bound extended, no second bound; law 16: what it does once fired unchanged)
| where | before | after |
|---|---|---|
| jcooptimer nafWait | armed only while her buổi ≥ tối and her week end not run (!pend) | + nafEnd(): her week end ran (pend) at the committed night and the partner's end is out (L13: the host, the guest sends none) → the same timer, the same action on Q[0] (carry / summons no-answer / scene read / own clock) |
| jcooptimer gAfk (new caller of the same bound, host) | — | from the first tick the room's committed night waits on HER open cards (CW.gWait: ngoW = week, his end not out, her thq has a card that is not of an own-clock pid) → after BAL.coopTm.nightMs CW.gAfk handles her cards with the SAME mapping: summons / night (NAF_SUM / NAF_NT) → nafNo in her context (the shared rule, factored out of nightAfk), the card leaves her list; flip choice (NAF_OWN) untouched; any other card CARRIED: it stays on her seat (S.thq, on her screen, unanswered; she answers it on her return, rebuilt from its pid in her context), c.cw = the week so the room no longer waits on it this week; a card raised after the bound fired in the same week is handled at once |
| jcoopthing CW.gAfk, a «live» card | — | a card with handlers and no generator (pid «live», kept by reference in the host's memory, valid only while her store lives = this week) LAPSES at the bound (rcpLapse: no effect, one log line in her Sổ) — the same rule nightAfk applies to such a card (serM lap); carrying it past the week left a hollow road (found on the r6 head: «Hội phối đồ: báo đề» refused after the week) |
| jcoopthing herFree | any card in her thq held the room | a card carried this week (c.cw = week) holds it no more (next week it counts again: a new wait, the same bound) |
Why on the host and not on her phone (the lead said «nafWait at gG()»): the host is the seat that waits, her phone may be asleep (no tick), and a carry on her phone alone would not free the host (her cards live in the host's store; the 5 s gSync belt puts them back on her screen). No number (BAL.coopTm.nightMs), no word, no UI added (laws 4 / 7 / 9 / 10).

## LAW 11 scan — every co-op wait that can hold the room on the other seat
| wait | where | bounded before | after |
|---|---|---|---|
| her tối / night choices before her week end (summons, night talk, any real choice) | jcooptimer nightAfk (nafWait b ≥ tối) | yes (nightMs) | unchanged |
| L13: her cards at the go (gNight → herFree) | jcoopthing | NO (her phone at g-go) | yes: gAfk |
| L13: her cards after her week end (gHold → herFree) | jcoopthing / sendEnd | NO | yes: gAfk |
| her own dialogs after her week end ran (pend, tryEnd !Q.length), any level, either seat | jcoopworld tryEnd | NO (!pend in nafWait) | yes: nafEnd |
| L13: her mini game (herFree frPz) | jcoopthing | own game clock + pause cap; an AFK seat that pressed Sẵn sàng is in no game | no change |
| the friend's Kỳ nguyệt answer (cyHold) | jcoopworld cyArm | yes (BAL.coop.cyWaitMs) | unchanged |
| L≥5 guest waits for the host's end (cyHer) | jcoopworld | = the host's waits above (now all bounded) | — |
| her res / patch acks (resWait) | jcoopworld | yes (10 s) | unchanged |
| flip choice (jnf nfch) | jnf | yes (BAL.steal.choice.waitMs) | unchanged (NAF_OWN) |
| day buổi / tối not pressed | jcooptimer clock (forceBend / forceNight) | yes (buoiMs) | unchanged |
| committed night held by his own real choice (week-wait stepQ) | jcoopworld nCheck | yes (nightAfk) | unchanged |
| dayq hold (gate c) | jdayq | own buổi only + BAL.dayq.stale | unchanged |
| selection days (selxHold) | origin/main only (not on the co-op chain) | disables her own #next only → the clock's forceBend | — |

## Gates (final head a1ce5d62 code = 6842b223; local wrangler dev Worker restarted before the series)
NOTE: by my mistake two copies of the gate series ran AT THE SAME TIME on one Worker (an old copy was not stopped); every row below PASSED in at least one of them, the two red rows of the doubled run (coop-night THIN 13 row «10: host still in tối behind his dialog» Q 2, dayq-hold-coop «host R no-clock board») were re-run ALONE.
| gate | fix (final head) | base |
|---|---|---|
| NEW coop-afk-l13 THIN 13 AFK=g SWAP 0 | 21/21 (room stepped 10.8 s after her cards, test bound 8 s; host stat: 7 handled, 1 «live» lapsed) | r6 62ac32c2: 20/21 FAIL «room steps» [0,0] · 4ba6d372: same |
| NEW coop-afk-l13 THIN 13 AFK=g SWAP 1 | 21/21 (10.7 s; 2 lapsed) | — |
| NEW coop-afk-l13 THIN 13 AFK=h (law 1, host AFK) | 21/21 (16.0 s) | — |
| NEW coop-afk-l13 THIN 0 AFK=g | 21/21 (36.1 s) | 4ba6d372 code + first fix without nafEnd: 19/21 [0,0] |
| NEW coop-afk-l13 THIN 0 AFK=h (law 1) | 21/21 (on 5fd68301) | — |
| MUTATE herOpen = any card (L13 carry off) | FAIL «room steps» [0,0] ✓ (final head; also on 49dc347e) | — |
| MUTATE nafEnd = false | THIN 0 FAIL «room steps» [0,0] ✓ (on 5fd68301) | — |
| coop-night THIN 13 | 126/126 (series) + 126/126 alone · (doubled run: 125/126 row 10 Q 2 = an extra card on the host in the contended run) | (wk6-r6: 126/126) |
| coop-night THIN 0 | 127/127 ×2 | — |
| coop-e2e SWAP 0 / SWAP 1 | 143/143 · 143/143 (×2 each) | — |
| coop-week-wait SWAP 0 / SWAP 1 | 34/34 · 34/34 (×2 each) | — |
| dayq-hold-coop (LIVE Worker, as wk6) | 23/23, 23/23 alone; 22/23 once alone («host R no-clock board», the row wk6 also saw flake 22/23 once) | r6 62ac32c2 alone: 23/23 |
| coop-keymove-unit | 12/12 | — |
| sangbuoi-held (built index.html) | ALL PASS | — |
| quickcheck ALONE vs LIVE 5e013076 (on 902b3920 = same fix code minus the lapse, on 4ba6d372) | quickcheck.js PASS: open 2271 ms · old save ok · perf new/live render 276/275 tab 690/626 buổi 1948/2184 tasks>200 27/26. Core gates: G4 90 crawl «fold · Ô lưu · Lui» = PRE-EXISTING (same row on wk6). vs origin/main 3af7896e: the live build itself timed out (not measurable) | — |
| coop/worker | unchanged (no Worker code touched) | — |

## Real 2-seat room R2 — FINAL HEAD (a1ce5d62 code; robot-rt-coop real taps; Fold 755x1000 host + iPad 1180x820 guest; local Worker; level 13; seed 33, 16-buổi slice each; production bound 30 s)
| time (UTC) | host (Fold) | guest (iPad) |
|---|---|---|
| 17:55:50 | week 1 tối | Sẵn sàng → AFK ON (taps swallowed 3 min) |
| 17:56:01–03 | his night, her week end on the host, pend «Chờ hảo hữu…» | her week-end cards arrive (Q 3) |
| 17:56:33 | ROOM STEPPED to week 2 (29.8 s after her cards = the 30 s bound) | Q 3 → 2 (a «live» card lapsed), the merged week arrives («Tuần mới … Tháng ba, hạ tuần», same date as the host) |
| 17:58:50 → 18:17 | weeks 2 → 3 with both playing | back, reads her cards, plays on |
Host: 16 buổi, 0 dead buttons, 0 stuck, 0 bugs. Guest: 0 dead buttons, 0 stuck; 2 robot lines both from the AFK window (taps swallowed on purpose: «#kpop stays open after 3 real taps», one .kfoc no-clock loop). 0 page errors.
Frames looked 3× (both devices side by side): her cards on her screen while the host is on his new tuần (hạ tuần); right after the step (her «Tuần mới» card says hạ tuần = the host's date); after her return (host playing week 2 buổi sáng, guest reading her cards).
CDN: …/img/_review/coop-afk-l13/ r2-both-1-her-cards.jpg · r2-both-2-stepped.jpg · r2-both-3-back.jpg · r2-fold-host-755x1000-clip.mp4 + r2-ipad-guest-1180x820-clip.mp4 (10:00–17:00 of the run: AFK at ~1:42, step at ~2:25 in the clip) · r2-*-full.mp4 (34 min, 10 fps).

## Real 2-seat room R1 — first fix on 4ba6d372, without the «live» lapse (robot-rt-coop real taps; Fold 755x1000 host + iPad 1180x820 guest; local Worker; room level 13; seed 32, 40-buổi slice each; uncommitted runner copy = robot-rt-coop.js + recordVideo + THIN + AFK trigger)
AFK trigger: once the guest pressed Sẵn sàng / her week end went to the host (COOPW.sent = week) in week ≥ 2, every tap on her page is swallowed for 5 min (a phone put down), then she plays on.
| time (UTC) | host (Fold) | guest (iPad) |
|---|---|---|
| 14:16:55 | week 2 tối, Sẵn sàng | ready «Chờ hảo hữu…» → AFK ON |
| 14:17:07–09 | his night + her week end on the host, pend, «Chờ hảo hữu…» | her week-end cards arrive (Q 6), the «Rương đồ … Nhận» reveal on top, untouched |
| 14:17:37 | ROOM STEPPED to week 3 (28 s after her cards, bound 30 s from the first waiting tick) | still on «Rương đồ … Nhận», AFK (Q 7 after the merged week) |
| 14:21:55 | playing week 3 | back: answers her carried cards, plays on |
| 14:32 → 15:29 | weeks 4 → 9 with both playing, same date each step | |
Base (wk6 R1/R2/R3): the host waited 8+ min on «Chờ hảo hữu…», robot softlock. Here: 0 dead buttons both seats, 0 stuck, 0 page errors; robot BUG lines = harness no-clock loops («Lịch tháng» dialog ×3/×1, a place page ×1 — pre-existing harness notes as on wk6) + guest #kmrew ×8 = the reveal she did not tap while AFK (expected).
Frames looked 3× (both devices side by side): before (both «Tháng ba · hạ tuần» buổi tối, guest «Chờ hảo hữu…»), after the step (host Tuần lục «Tháng tư, năm thứ nhất, thượng tuần», guest still on «Rương đồ … Nhận»), host playing the new week (clock 4:54) while the guest is AFK.
CDN (outside git): https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-afk-l13/ afk-both-1-before.jpg · afk-both-2-host-new-week.jpg · afk-both-3-host-plays.jpg · afk-fold-host-755x1000-clip.mp4 + afk-ipad-guest-1180x820-clip.mp4 (24:00–33:00 of the run: AFK at ~1:46, step at ~2:28 in the clip) · afk-fold-host-755x1000-full.mp4 + afk-ipad-guest-1180x820-full.mp4 (98 min, 10 fps; AFK at 25:46).

## OPEN
2 (from wk6, NOT this branch, waits for an owner ruling): host reload at the week end replays the week — noted only, untouched.

## Laws touched
1 two-way: host AFK and guest AFK, both seatings (SWAP 0/1) ✓ · 4 one core: the bound stays BAL.coopTm.nightMs ✓ · 6 real world: no object / person path; a carried card stays on her seat and is answered by her ✓ · 7/9/10: no word, no UI ✓ · 11: scan table above, both holes of the family fixed ✓ · 12: Fold host + iPad guest real run ✓ · 14: nafNo factored (one copy of the summons rule) ✓ · 16: the bound's actions unchanged (carry / no-answer / scene / own clock); only WHERE it arms widened ✓.
Note for reviewers (behaviour): a seat that READS her week-end cards for longer than nightMs (30 s) after the partner's end is out now has them carried (off her screen, back after the merged week) — the same rule she already had at her overdue tối.
Leftovers outside git: uncommitted runner copy dev/test/robot-rt-coop-afk.js (video + THIN + AFK trigger) deleted with the worktree.

DONE → SSK review/coop-afk-l13-r2 a1ce5d62f909cde3cd0f9651ab360f23386fb09b (BIG co-op; on review/coop-night-wk6-r6 62ac32c2e8e5ae29d2117fd4b7aa49c2996ea922 = the LAND READY head of coop-night-wk6 4ba6d372). Land AFTER coop-night-wk6-r6 (fast-forward on 62ac32c2). Worker deploy: no.

## HANDOVER (26/11 18:30Z, worker rollover: context past START_CTX + 25 %) — for the successor fixer (Foreman B child 4 opens it)
State: review/coop-afk-l13-r2 a1ce5d62 = DONE for the original brief (above; SSK sent to child 3 at 18:24Z). NOT done (read late, queued 12:42Z / 16:04Z / 16:42Z / 18:25Z):
1. SCOPE ADD (brief end, MAIN 159 ruling, NO replay = the old «OPEN 2», not an owner question): CW.restore (jcoopworld ~L996 «if(CW.sent!==wk()) … snapLoad(C) … CW.restore(o)») keeps the host's OWN pending week end across a reload (still refuses FOREIGN pending copies). Evidence of the replay: wk6 R1 08:28 / R2 09:23 (host 6.0 1/5/1 → 6.0 1/5/0). New test: host reload while his week end waits (L13: gHold on her open cards, e.g. coop-afk-l13.js setup with NAFMS large, then reload the host + «Trở lại phòng») → same week end after the reload, no replay (same date, his week end ran once); base FAIL / fix PASS + MUTATE; SWAP 0 / SWAP 1.
2. Child 4 16:42Z: merge LIVE b881686f (ACT-MERGE: action names renamed, assemble.py module list changed) into the branch (assemble.py = union), rebuild (assemble + build_site), re-run the co-op gates.
How to resume: sparse worktree from origin/review/coop-afk-l13-r2 (fetch --depth=30 under flock); local Worker = coop/worker `wrangler@4 dev --port 8797 --ip 127.0.0.1` (npm i wrangler@4 in a side dir, symlink node_modules); ONE co-op test at a time (I once ran two series at once by mistake: `pgrep -fa dev/test/` before starting). Gate commands = the table above (coop-afk-l13.js THIN=13|0 AFK=g|h COOP_SWAP=1; coop-night THIN 13/0; coop-e2e ±COOP_SWAP; coop-week-wait ±COOP_SWAP; dayq-hold-coop on the LIVE Worker; keymove; sangbuoi-held file://…/index.html; CTM_LIVE_REF=<live> bash dev/tools/quickcheck.sh). Real run: robot-rt-coop.js copy with recordVideo + THIN + an AFK/reload trigger (mine was not committed; trigger described in «Real 2-seat room R1»), Fold host + iPad guest, videos to img/_review/coop-afk-l13/ via dev/site/cdn_sync.py. A force-push is refused here: push a NEW branch name (e.g. review/coop-afk-l13-r3).

## OPEN 2 FIX (27/11, B FIXER session_01N1tNP5BSs2j6LN9LonrKMG, opus, depth 5, START_CTX ~3 % of 1M) — host reload while his week end waits: NO replay (MAIN 159)
PRIORITY #1 CHECK ('host reload replay week pending CW.restore'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (brief) → ruling MAIN 159 (FOREMAN_B_STATUS 11:55Z); reused: CW.restore (the ONE restore path, no second one), snapLoad / snapOk / pickSnap, CW.gBlob (his toCanon's form of her store), TH.seatDrop / seatOf, the existing re-ready after a host reload (jcoopthine E.boot), syncRoom's re-end rule.
BRANCH: review/coop-afk-l13-r3 = review/coop-afk-l13-r2 a1ce5d62 + 443b866d / 3d6ba3ce / 87a68bdc / 5435a49c (code + test) + 8b7baec5 (site rebuilt) = HEAD. LIVE b881686f NOT merged (no gate needed it).
Root (base a1ce5d62, new test THIN 13 AFK=g RELOAD=h): host pend 1/3/1/0 «Chờ hảo hữu…» → reload → 1/3/0/0 buổi sáng «Sẵn sàng» = his week replays (CW.restore refused every pend copy; at level 13 her week end, run on his page, lived only in its memory).

### The fix
| where | before | after |
|---|---|---|
| jcoopworld CW.restore | every copy with pend or sent = this week refused; date / buổi checks on every copy | OWN pending copy (this device + this room, same seat / week, room not ended) KEPT: its date is ahead by design, so the date / buổi checks apply to mid-week copies only; a restored pend keeps its night commit (ngoW, host ngo: the ONE AFK bound reads it) and looks at its end at once (soonEnd). FOREIGN pending copy (another device's server copy, the «room» wake path) still refused |
| jcoopworld CW.restore, level 13 host | — | the pend copy needs HER week end back (CW.gBack): without it refused (old path), never a pend host whose part G cannot finish. Level = room level or the copy's own thl (the level message may not be back yet after a reload — first run failed exactly so) |
| jcoopthing CW.snap wrapper + CW.gBack | her store after her week end ran on the host = page memory only | written beside his copy at the same snapSave moment, this device only, never in the seat copy (localStorage ctm-coop-gwk = {room, week, b: CW.gBlob()}); CW.gBack(week) puts it back (base.P[her seat] = blob, seatDrop, G.done[week]) — for ANY own copy of that week, so a reload after her week end and before his night no longer runs her week end a second time |
| jcoopworld CW.restore, guest level 13 (law 11 twin) | her copy past the go (sent) or ahead of the room's date (her week end's patches from the host) refused → the room's week start on her screen until the host's next view | kept (her phone runs no week end at 13: such a copy IS her week end as the host ran it) |
| jcoopworld CW.restore, lost end (law 11) | my end sent but not on the server (room says not ended) → refused → replay | kept as pend, sent again (as syncRoom's re-end); only when the room's ended list is known |
| jcoopworld syncRoom buổi catch-up | could step a restored pend seat (buổi 0 of the new week < the room's tối) | skipped for a pend seat / a seat whose date is past the room's |
No number, no word, no UI (laws 4 / 7 / 9 / 10). Tried and reverted (law 16): night commit + her ready inside every copy → coop-night 11 / 12 red (the existing E.boot re-ready already covers a mid-week host reload).

### LAW 11 — every pending co-op step a reload can replay
| step | before | after |
|---|---|---|
| host's own pend end, level 0 / 5 (his dialogs) | NO: week replays | kept (pk) — RELOAD=h THIN 0 |
| host pend at level 13 (her cards) | NO: week replays | kept + her week end (gBack) — RELOAD=h THIN 13, SWAP 0/1 |
| host at 13 after her week end, his night not yet (G.done, not pend) | her week end ran AGAIN on the week-start store (cards / patches twice, law 6c) | gBack on every own copy → not re-run |
| guest's own pend end, level 0 / 5 | NO: week replays | kept (pk, same rule both seats) — RELOAD=g THIN 0 |
| guest at 13 past the go | NO: week-start screen (race with the host's next view) | kept (gk) — RELOAD=g THIN 13, SWAP 0/1 |
| own end sent but lost (socket down, then reload) | NO: replay | sent again (code; no dedicated test: needs a drop between send and the server) |
| end out (room ended[seat]) | begin: sent = week, waits for the merge | unchanged |
| night ready (nrdy) | in the copy | unchanged |
| host commit / her ready mid-week (ngo / nfr) | re-ready by jcoopthine E.boot | unchanged |
| dayq hold | solo only; co-op Q rides the copy | unchanged |
| selection days (selxHold) | origin/main only, not on the co-op chain | — |
LAW 6c: the kept end is the ONE run's state (same snapSave moment for his copy and her store); after every reload his / her own week end ran 0 times (new row); her carried test card answered once (S.afkT = 1); part-D patch numbers continue from the saved D.N.

### Gates (final code 5435a49c = 8b7baec5; local wrangler dev Worker :8797; ONE test at a time)
| gate | fix | base a1ce5d62 | MUTATE |
|---|---|---|---|
| NEW coop-afk-l13 RELOAD=h THIN 13 AFK=g SWAP 0 (host reloads while his end waits on her cards) | 25/25 ×4 (incl. the real run) | FAIL «same week end»: 1/3/1/0 pend → 1/3/0/0 sáng | pk=false: FAIL ×2 (1/3/0/0) |
| NEW same, SWAP 1 | 25/25 ×2; once 24/25 on 87a68bdc («room steps»: ngoW lost → bound never armed) → fixed 5435a49c | — | — |
| NEW RELOAD=g THIN 13 (guest twin) SWAP 0 / SWAP 1 | 25/25 ×3 / 25/25 ×2 | FAIL 1 of 2 (1/3/0/0; the other run healed by the host's view inside 2.5 s = the race) | gk=false: FAIL (1/3/0/0) |
| NEW RELOAD=h THIN 0 AFK=h (host own pend, law 1) | 25/25 ×2 | — | — |
| NEW RELOAD=g THIN 0 AFK=g (guest own pend) | 25/25 ×2 | — | — |
| (harness notes) | F-h0 19/23 = the test's own tap answered its test card (fixed: one tap per look, never the test card); F-g0 21/23 = wait 120 s too short for that life (→ 240 s) | | |
| coop-afk-l13 THIN 13 AFK=g / SWAP 1 / AFK=h / THIN 0 | 21/21 ×2 / 21/21 / 21/21 / 21/21 ×2 | | |
| coop-night THIN 13 / THIN 0 | 126/126 ×2 / 127/127 ×2 (first THIN 13 on 3d6ba3ce: 124/126 rows 11/12 → the reverted copy fields) | | |
| coop-e2e SWAP 0 / SWAP 1 | 143/143 ×2 / 143/143 ×2 | | |
| coop-week-wait SWAP 0 / SWAP 1 | 34/34, 33/34, 32/34 / 34/34 ×2, 32/34 — red rows only «host night ran, his week end is out (he read his night cards)» / A2 her queue (no reload in this test) | SWAP 0 33/34 (same row family), SWAP 1 34/34 = PRE-EXISTING flake | |
| dayq-hold-coop (LIVE Worker) | 23/23 | | |
| coop-cal-rebirth (local Worker) | 79/79 | | |
| coop-keymove-unit | 12/12 | | |
| sangbuoi-held (built index.html) | ALL PASS (32 rows) | | |
| quickcheck ALONE vs LIVE b881686f | 8b7baec5: build PASS (built = fresh build), open 2033 ms, perf new render 215 / tab 601 / buổi 3952 / tasks>200 27 (5435a49c run: buổi 1632 — noise; no solo path touched); old save FAIL (timeout 30 s), live build not measurable (timeout), G4 crawl «fold · Ô lưu · Lui» | SAME on a1ce5d62 alone: old save FAIL (timeout), live not measurable, G4 crawl «fold · Ô lưu · Lui» = PRE-EXISTING / environment (open 1858, buổi 1620) | |
| coop/worker | unchanged | | |

### Real 2-seat room (Fold 755x1000 host + iPad 1180x820 guest; local Worker; level 13; coop-afk-l13 harness taps, VIDEO=; production bound 30 s after the reload): 25/25
Guest presses Sẵn sàng and goes AFK on her week-end card («Việc khó xử»); the host's week end runs (his night card «Đêm không được triệu»), pend «Chờ hảo hữu…»; the HOST RELOADS («Cùng hảo hữu» › «Trở lại phòng») → back on the SAME week end (Tháng ba · trung tuần, «Chờ hảo hữu…», trace «restore: own pend 0»); the bound carries her card → the room steps ONCE (both trung tuần, host «Sẵn sàng»); she answers it on her return, once. 0 page errors.
Frames looked 3× (both devices side by side). CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-afk-l13/ open2-both-1-before.jpg · open2-both-2-after.jpg · open2-both-3-stepped.jpg · open2-fold-host-755x1000-1-before-reload.mp4 (52 s) · open2-fold-host-755x1000-2-after-reload.mp4 (69 s: reload → step) · open2-ipad-guest-1180x820.mp4 (113 s) — the recorder kept partial clips only (webm cut at the harness close).
Seen, not touched: shot 3 host header shows the kit co-op friend chip «Hảo hữu của ta» (jcooptimer kitCoopFriend).

### Laws touched
1 two-way: host and guest reload, levels 0 and 13, SWAP 0/1 ✓ · 4: no number ✓ · 6c: one run, nothing given twice or lost (rows above) ✓ · 7/9/10: no word, no UI ✓ · 11: table above ✓ · 12: Fold host + iPad guest real run, looked 3× ✓ · 13: PRIORITY line ✓ · 14: CW.restore stays the ONE restore path ✓ · 16: mid-week restore rules unchanged; the tried copy fields reverted ✓.
Leftovers outside git: worktrees /home/user/wt/afk3 / afkbase / afkmut and the local Worker (deleted at the end).

## REVIEW (BIG co-op r2 + r3, FRESH reviewer session_01N1tNP6JLsaHXyt8cRBXEFN, opus, depth 6, START_CTX ~2 % of 1M) — PASS review/coop-afk-l13-r4 ddccdf3047c1f881f5197fe1330714256835cb96
PRIORITY #1 CHECK ('coop-afk-l13|CW.restore|gBack|gAfk|nafEnd'): OD 0 new (L680 = the bound) | ledger 0 | claims 8 (this chain) | main 0 | review/* r2 / r3 (this) | reused the fixer's recipe (local wrangler@4 dev :8797, restarted before every run, ONE co-op test at a time; dayq-hold-coop on the LIVE Worker).
HEAD r4 = r3 8b7baec5 + ddccdf30 (reviewer small fix, TEST ONLY: RELOAD=g at level 13 now asserts her own copy is restored). Built files = r3 (unchanged, no rebuild needed; no conflict marker). FF on review/coop-night-wk6-r6 62ac32c2; lands AFTER it in the B co-op chain. LIVE not merged (no gate needed it).
CHECK (1) ONE restore path: CW.restore stays the only restore (begin → snapLoad → CW.restore; the «room» wake path → CW.restore); no second path. OWN = o.dev===DEV && o.room===room, plus the old seat / week / life / name (snapOk) checks. PROBE (host + guest, levels 13 and 0, on the live head page while the end waits; tampered copies fed to CW.restore): foreign dev, stale room, next / prev week, swapped seat, foreign dev with a sent end, own copy but room says ended → ALL refused, page state unchanged (host 13 / host 0). Guest-13 «own but ended» was accepted — the pre-existing mid-week path (pend false, sent −1; old code accepts it too; a guest at 13 never sends an end) = not a new door. gBack: room + week + her life checked; written only by the host, outside her context (devOff), this device only.
(2) LAW 11 twin table — each row checked in code: own pend both seats (pk) ✓ · guest 13 past the go / date ahead (gk) ✓ · lost sent end (lost: only when the room's ended list is known, re-sent as syncRoom's re-end; host 13 needs gBack) ✓ · syncRoom buổi catch-up skipped for a pend seat / date past the room's ✓ (roomDate = merged week's date; equal mid-week) · dayq / night / selection days unchanged ✓.
(3) both seatings: same rule (no seat in pk / gk / lost except host() for the level-13 part G owner); SWAP 0/1 green below.
(4) law 6c: his copy and her store are written in the SAME snapSave call (and pagehide), so they cannot drift; gBack sets G.done[week] → her week end never runs twice (test row «own week end never ran again», her test card answered once = 1). Only a hard crash between two saves could lose < 1 s of state — the same as every copy, not new.
(5) AFK bound: nightAfk's mapping unchanged (nafNo = the old summons / night lines, byte for byte, closeModal + nCheck kept at the caller); stepQ untouched; nafWait widened only by nafEnd (r2's intent); gAfk / gWait inert below level 13 (on() false). Behaviour note (as the fixer wrote): a seat whose partner's end is out and who reads her own week-end cards > nightMs gets them carried (back after the merged week) — the OD L680 rule.
(6) pre-existing reds, A/B on base 62ac32c2 myself: week-wait SWAP 0 head 32/34, base 30/34 (same rows A1/A2 «host night ran, his week end is out») · SWAP 1 head 31/34, base 34/34 (same family) = PRE-EXISTING flake. dayq-hold-coop SWAP 1 (LIVE Worker) row «host/guest R (no-clock board)»: head 7 red / 12 runs, base 62ac32c2 1 red / 8, r2 a1ce5d62 1 red / 3 — identical signature on base and head (the case starts at tối, the clock commits the night: trace «ngo 0 · night 0 · night held 0 b3/3 Q2», the card stays behind the board > 40 s; the row passes when the case starts earlier in the week) = PRE-EXISTING (see OPEN below). quickcheck head: G4 crawl «fold · Ô lưu · Lui» (same row on base), live build not measurable, old save FAIL ×2 = the LIVE build's own timeout; same quickcheck.js with base 62ac32c2 as the «old» build: PASS (open 1912 ms, old save ok, perf new/old render 235/268 tab 566/544 buổi 1749/2325 tasks 27/31).
(7) devices: test runs are Fold 755x1000 host + iPad 1180x820 guest (SWAP 1: iPad hosts). Fixer's CDN frames looked (open2-both-1/2/3, r2-both-2). My own shots (scratch, not uploaded): reload run — before (host trung tuần «Chờ hảo hữu…» 1:54, guest thượng tuần on her card) → after the reload (host SAME trung tuần, «Chờ hảo hữu…», no replay) → stepped (both trung tuần, clocks 10:00, host «Sẵn sàng», her card still on her screen); AFK run — both trung tuần after the step, she answered. Looked 3×. The host header «Hảo hữu của ta» seen in the fixer's shot 3 = the kit co-op friend chip (kctmf, OD:L1061), present in runs WITH and WITHOUT a reload → not this branch.
TESTS (local Worker :8797 unless noted; logs /home/user/wt/out, deleted after):
| gate | head | base | MUTATE |
|---|---|---|---|
| coop-afk-l13 RELOAD=h THIN 13 AFK=g SWAP 0 / SWAP 1 | 25/25 ×3 / 25/25 | a1ce5d62: 20/25 FAIL «same week end» | pk=false 20/25 FAIL · gb=false 20/25 FAIL |
| coop-afk-l13 RELOAD=g THIN 13 SWAP 0 / SWAP 1 (r3 test) | 25/25 ×3 / 25/25 | a1ce5d62: 25/25 ×3 (healed by the host's view) | gk=false: 25/25 ×3 = NOT CAUGHT → r4 test fix |
| same, r4 test (asserts «restored») SWAP 0 / SWAP 1 | 26/26 / 26/26 | a1ce5d62: FAIL «restore: date ahead» | gk=false: FAIL «restore: date ahead» ✓ |
| coop-afk-l13 RELOAD=h THIN 0 AFK=h / RELOAD=g THIN 0 AFK=g | 25/25 / 25/25 | — | — |
| coop-afk-l13 THIN 13 AFK=g SWAP 0 / SWAP 1 / AFK=h · THIN 0 AFK=g / AFK=h | 21/21 ×2 / 21/21 / 21/21 · 21/21 / 21/21 | 62ac32c2: 20/21 FAIL «room steps» | herOpen=any 20/21 FAIL · nafEnd=false (THIN 0) 20/21 FAIL |
| coop-night THIN 13 / THIN 0 | 126/126 / 127/127 | — | — |
| coop-e2e SWAP 0 / SWAP 1 | 143/143 / 143/143 | — | — |
| coop-week-wait SWAP 0 / SWAP 1 | 32/34 / 31/34 | 30/34 / 34/34 (same rows) | — |
| coop-cal-rebirth | 79/79 | — | — |
| dayq-hold-coop SWAP 0 / SWAP 1 (LIVE Worker) | 23/23 / 5 PASS · 7 × 22/23 | SWAP 1: 7 PASS · 1 × 22/23 (same row, same trace) | — |
| coop-keymove-unit | 12/12 | — | — |
| sangbuoi-held (built index.html) | ALL PASS | — | — |
| coop/worker npm test | ALL OK | — | — |
| quickcheck ALONE vs LIVE 540358c4 | G4 crawl + old save timeout + live not measurable | G4 crawl (+ coop-one-world flake once), old save ok, live not measurable | — |
Laws: 1 ✓ (SWAP 0/1, both seats reload / AFK) · 4 ✓ (no number) · 6c ✓ (one save moment, no second week end) · 7/9/10 ✓ (no word, no UI) · 11 ✓ (twin table checked) · 12 ✓ (Fold + iPad, looked 3×) · 13 ✓ · 14 ✓ (one restore path, nafNo one copy) · 16 ✓ (bound's actions unchanged).
OPEN (pre-existing, NOT this branch, FOR Foreman B): dayq gate (c) at the night — a no-clock activity (Phối đồ board) open when the room clock commits the night (tối): «night held b3/3 Q2», jdayq dqRoomOwes is true (od) but nothing repaints the held card until nightAfk's 30 s bound; the room still turns (week() after). Seen on base 62ac32c2 too (trace identical). Red more often on this head (7/12 vs 1/8): this branch's code is inert there (level 0, no reload: gWait off, nafEnd needs pend, restore not called) — the row's start buổi depends on timing; worth a follow-up fixer. Test row needs either a repaint at the commit or a window > nightMs.
Leftovers: worktrees /home/user/wt/rv13 base0 base2 mut ho + local Worker removed at the end; CDN img/_review/coop-afk-l13/ wiped with this verdict.
