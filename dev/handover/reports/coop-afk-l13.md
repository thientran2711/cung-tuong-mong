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
