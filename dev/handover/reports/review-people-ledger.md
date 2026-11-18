SẴN SÀNG KIỂM 4bdb8672f5a1323e63416c73bcaeb08bab8bb175

# review/people-ledger — PEOPLE LEDGER stage 3 (Foreman C worker, successor of session_011xDdVNZkQ6SnAs8Rttsbwj)
Owner law: dev/OWNER_DECISIONS.md 16/11 13:40Z, 13:42Z, 13:50Z s17 (2); OD:L34. Branch review/people-ledger, descends from origin/main e987508d
(main merged three times: 50299942, 12f52db7 incl. schedules3-r5, e987508d). Full notes: dev/PROGRESS_people-ledger.md on the branch.
START_CTX ~4 % of the window (session_011xDdVQ9uFz3dWEEUrZZp9W).

## Done (task list from the stage-2 handover)
1. **Maid road (cnv) under the one-record rule.** `j95led()` on for both roads. Her room = the servants' room of her mistress's palace
   (`j95lk`/`j95at`: record "home" ≡ palaceOf(mistress), one map place). Every record person at her place is on the stage with the maid road's
   own talk entries (kind srv: hh/mis/rv/sv/emp/ty/man, j42 shapes); caps gone (4 consorts / only the mistress at home / 4 servants); consort
   maids, elders, children, posts, officials use existing kit kinds and get no orders. No new visual part, no CSS (KIT FIRST).
2. **Rule conflict → one switch** `BAL.led.cnt` (jbal2), read by `j95cntNow()`; built to the owner's 13:50Z wording ("now"). See QUESTION.
3. **Set hours + mandatory times.** jmen's fixed schedule `menSched()` (duty rosters, work orders, festivals, visits, officials' court roster
   `menMinW`) runs on BOTH roads (`menSchedRoad`, j95 `j95ms`): the maid road no longer rolls j22's dice (roll 55 + random haunt). jmen still
   assumed 3 buổi → night = `B4L` (physician off duty, prince/envoy not at a festival at night), trysts at night, letters `[B4L,2,1,0]`,
   physician summons in the afternoon (jtime4 rule: old 1 = 2). Morning court: `BAL.led.court` (2) first khắc of buổi sáng Hoàng thượng is at
   Cần Chính điện, no dice / no surprise (before: 75 % weight). The maid start re-reads the schedule (consort start's roster no longer lingers).
4. **Whole family found on the way (LUẬT SỬA CẢ NHÓM):** stage title count ("Ở đây còn 1 người" with 11 there: j59 `kitHereMsg` now rewrites
   the leading count of a longer line); motive gate dice (jemo "sad, wants to be alone" `roll(50)` → calendar answer `emoHalf`, one answer per
   question; base motiveOK and the j95b wrapper had no dice).
5. **One ledger style with Foreman D:** review/mem-upgrade (cause ledger) and review/item-ledger keep NO people/place list (good). Both key
   people differently from the record: jmem `mk()` and jil `ilKey()` give consorts a bare id ("3" vs record "v3"); `ilKey` returns "" for consort
   id 0. Added `ledgerId(p)` (j95, global) = the record id of any person → Foreman D should call it (not changed on their branches).

## QUESTION FOR MAIN (do not decide alone — stage-counts vs the owner's 13:50Z law)
- Reading A, "now" (owner 13:50Z wording, built): every place's Dư đồ count is taken at ONE moment (current khắc); counts add up to the record,
  nobody twice / missing. A place she walks to may differ by the people who move during the walk's khắc.
- Reading B, "arrive" (main's dev/test/stage-counts.js): a place's count = the people she meets on arrival (after the walk). Counts of different
  places are taken at different khắc → the sum is not the record (one person can be counted at two places or none).
- Switch: `BAL.led.cnt="now"|"arrive"` (one place). `LEDCNT=arrive node dev/test/stage-counts.js URL` → 0 mismatches both roads;
  `node dev/test/ledger_shadows.js URL 30 WxH [cnv]` → 0 faults with "now".
- Recommendation: keep "now" (her newest words: "each place shows its own count … must add up"); change stage-counts.js to check
  "stage = record at arrival" + "map = record now" (ledger_shadows already does both).

## Tests (b9bebd0f = all game changes; then merge of main e987508d = 4bdb8672)
| test | result |
|---|---|
| **after the last main merge 4bdb8672** | roster_audit sens 18: 17 753 checks, (a)–(r) all 0, page err 0 · ledger_shadows consort 25 (1455 = 1455) / maid 25 (1360 = 1360) all 0 · ledger_hours consort 40 / maid 40: 0 faults, court ok 16/16 |
| ledger_shadows consort 1180x820 30 / maid 755x1000 30 | map 1680 = record 1680 / 1577 = 1577; hidden, extra, twice, offmap, stage, title 0; page err 0 |
| ledger_shadows maid road BEFORE (stage 2 build) | 711 shown vs 1397 in the record, every moment bad |
| ledger_hours (new) consort 3×60+50 / maid 50 | morning court ok every buổi sáng; men/officials faults 0. Maid BEFORE: 129 men inside with no reason, physician inside at night 11, roster officials missing 80 |
| stage-counts (main) LEDCNT=arrive | thd 156 / cnv 72 walks, 0 mismatches |
| roster_audit sens 18 (final build) | 18 303 checks, (a)–(r) 0 except (h) 1 (see OPEN), page err 0, J95/J95B errors 0 |
| roster_audit sens 18 (before the two last fixes) | 17 761 checks all 0; another run 17 271: (g) 1 = the jemo gate dice (fixed) |
| roster_audit sens 18 on the stage-2 build, same audit | (c) 2563 = maid-road stage not drawing the record (fixed here) |
| roster_audit rand 18 shard 4 | final build, time cap at 13 lives: **44 201 checks, (a)–(r) all 0**, page err 0, gate 814 / pass 402 |
| roster_oldsave main→this, stage-2 branch→this, maid-road save | 755x1000 + 1180x820: loaded, record on load, 0 bad, 0 errors |
| ledger_stage (new, HOST mode via lib/device.js) fold, ipadAir, ipadPro, foldLand, iphone14 × both roads | crowded stage (8–18 people): record = stage = title number, no overflow, no page error; shots looked at (Fold maid road Càn Ninh cung 13 people: kit j59 page + "+12") |
| coop-e2e (live Worker) | 59/59 (one earlier run 59/60: 20 s wait for the friend while 3 audits loaded the CPUs) |
Test changes: roster_audit expects the fixed men's schedule on both roads and matches stage entries through `j95ledId` (consort maids,
other consorts' children, posts — the old matcher could not see them: 2 210 false (c) on the first run); stage-counts LEDCNT.

## OPEN (next pass)
- (h) rare: a monthly j75 "Tai mắt kể: X dâng canh sâm … / đứng đợi ngự giá …" line shown with no bind in J95B (record keeps her home);
  2 hits in ~70 000 checks over 4 sens runs (0 in the one run on the stage-2 build). Suspect j95c's "later" path (every khắc of her coming buổi
  is a tryst/meet → no bind, line not stripped). Owner of j95c = schedules3 line.
- KIT REQUEST K14 (two-shadows map mark, "N người theo hầu") still at the kit keeper. Crowded Fold portrait stages page 2 figures + "+N"
  (kit j59): kit keeper may want a denser page for 15+ people.
- Officials exist only with court politics on (`tdOn()`); on the maid road it is off, so no officials at court there (consistent, noted).

## HANDOVER (worker rollover rule; only report + message remained)
Branch pushed; worktrees /home/user/wt/pl, /home/user/wt/plr. Next worker: read dev/PROGRESS_people-ledger.md + this file.
