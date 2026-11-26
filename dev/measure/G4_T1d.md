# G4 robot arms — seat T1d (report file)

PRIORITY #1 CHECK: OD 0 | main 5e013076 | review/* review/temper-g4, review/temper-perception-rv 97d6ba10 | claims T1d.

## State (25/11 22:12Z)
- Build: review/temper-g4 7b003156 = merge of LIVE main 5e013076 (SANGBUOI r4 + coop-rebirth-stuck); game/harness byte-identical to LIVE.
- Run: 12 slices (3 lives x even/hot/timid/off) to buổi 400 (slice=400, Foreman D 18:42Z), par=3, resume=1. Dir /home/user/wt/g4live, launcher /home/user/wt/g4live.sh (rotates arm order per 2 h relaunch). Started fresh 22:11Z. Sum: `node dev/measure/temper-hh-rt.js sum /home/user/wt/g4live`.
- Earlier runs, NOT counted: full lives on 6b85187e (/home/user/wt/g4run: even-1 death y4 b477 max rank 2), slices on 6b85187e (/home/user/wt/g4slice, Tâm trạng flood), slices on LIVE 351122ba (/home/user/wt/g4live-351122ba: 2 renderer crashes b77/b90, L1/L2 softlocks).

## Findings sent to Foreman D
- F1/F1b «Tâm trạng · X» dialog flood (up to 1992 copies) on 6b85187e; LIVE 351122ba + coop-r7 clean with the save. Pusher emoBox -> kitModal (no de-dupe); LIVE guards LOOK_T + j79 dedupe.
- F2 pcPort `f.rk.split is not a function` (rk non-string), still on main 351122ba.
- L1 «Có tin đang chờ · xong việc đang làm đã» disabled, no dialog, Q 3-6; L2 «Sang ngày mới» no turn, Q=1 (LIVE 351122ba). Save replay inconclusive (dawn/Tuần lục/Bổng lộc overlays). Watching on 5e013076.
- Renderer memory on LIVE 351122ba: 1.8-2.0 GB by buổi 70-90 -> tab crash (6b85187e: 1.43 GB at b620).

## Balance candidate (untouched, feature freeze)
lãnh cung «Bị bỏ quên» at month 3 for a newcomer: j3 monthTick `!S.out && S.sung<=0 && S.danh<=BAL.danhG.forget && S.rank<=1` -> cold(); no grace period.

## Handover
Successor: copy nothing; resume = run /home/user/wt/g4live.sh in a tracked bg job (resume=1 continues lives from <dir>/<life>.ckpt.json). If the container is gone, restart fresh from this branch's index.html.

## Done slices on LIVE 5e013076 (26/11 06:36Z) — COMPLETE: 11 settled + hot-2 HANG-BLOCKED
| life | end | year | rank (max) | Danh | Sủng | lãnh cung | outbursts |
|---|---|---|---|---|---|---|---|
| hot-1 | SLICE b400 | 3 | 0 (0) | 1 | 0 | yes | 3 (khac 1, mang 2) |
| even-1 | SLICE b400 | 3 | 0 (1) | 73 | 18 | no | 0 |
| even-2 | SLICE b400 | 3 | 0 (0) | 37 | 13 | no | 0 |
| off-1 | SLICE b400 | 3 | 0 (0) | 0 | 0 | yes | 0 |
| timid-2 | SLICE b400 | 3 | 0 (0) | 8 | 10 | no | 1 (tho) |
| even-3 | SLICE b400 | 3 | 0 (0) | 40 | 0 | no | 0 |
| off-2 | SLICE b400 | 3 | 0 (1) | 98 | 4 | no | 0 |
| hot-2 | HANG-BLOCKED on LIVE b273 (kitScrollCues); parked (not a game ending). Rerun from the b250 ckpt on review/renderer-mem when D gives the LAND READY sha | 2 | 0 (0) | 5 | 16 | no | 3 (danh, mang, huong) |
| hot-3 | death b297 «Hồng nhan bạc mệnh» age 20 | 3 | 0 (2) | 0 | 0 | yes | 3 (dapdo, khac, mang) |
| off-3 | SLICE b400 | 3 | 0 (0) | 0 | 0 | yes | 0 |
| timid-3 | SLICE b400 | 3 | 0 (1) | 0 | 0 | yes | 2 (huong, tron) |
| timid-1 | death b162 «Hồng nhan bạc mệnh» (Emperor died at 22 → tuẫn táng) | 2 | 0 (1) | 1 | 0 | yes | 2 (khoc, boan) |
- Wording note for MAIN: that ending text shows «(khả năng: vừa)» — not one of the 7 odds words.
- 2nd early-death path for low-rank lives (Emperor death → tuẫn táng, year 2) — listed with the lãnh cung balance candidate, untouched.

## G4 summary (sum, LIVE 5e013076)
| arm | max rank mean | lãnh cung | outbursts/life | mean Danh at end | early death |
|---|---|---|---|---|---|
| even | 0.33 | 0/3 | 0 | 50 | 0/3 |
| hot | 0.67 | 2/3 | 3 | 2 | 1/3 |
| off | 0.33 | 2/3 | 0 | 33 | 0/3 |
| timid | 0.67 | 2/3 | 1.67 | 3 | 1/3 |

Verdict vs off: even, hot and timid PASS (Δ < SE).
- Rank is flat: no life holds rank > 0 at b400.
- Lãnh cung in 7/12 lives: the parked newcomer «Bị bỏ quên» rule dominates (untouched).
- Outbursts follow temper.

## Renderer HANGS caught by the F10 watchdog (26/11 03:04–04:01Z)
The page stopped answering, then grew about 180 MB per 40 s, and was killed above 3.5 GB. The lives were hot-2 (about b270), off-3 (b63) and hot-3 (b64).
The stacks are dominated by kitScrollCues ← MutationObserver childList (game.html:80757–80760), plus kaNorm. My suspicion is a self-feeding observer loop.
Hang count per lane on LIVE (05:01Z): hot-2 2 (b270, b273 after resume from the b250 ckpt, so it repeats), off-3 1 (b63), hot-3 1 (b64), timid-3 1 (b65), others 0. F10 #2 and #3 confirm the root cause; the fix is review/renderer-mem 60db5f48.
FIX ARM (review/renderer-mem 307b3b77 = fix 60db5f48 + LIVE f009e1a6, /home/user/wt/g4fix):
- hot-2: resumed at the b273 ckpt and ran to b300 with 0 hangs, peak 1577 MB. LIVE on the same state hung 2 of 2.
- Fresh off-3, hot-3, timid-3: BLOCKED by the f009e1a6 selection-scene opening.
  - off-3 ended at b1 «Ban hoa».
  - hot-3 hit 138 dead buttons under div.kscn-veil, then the robot's stuck/softlock detector fired.
  - Likely a robot gap on the «Chạm để tiếp» scene card; unproven.
  - Shot: CDN img/_review/temper-g4/f009-selscene-veil-hot3.png. Reported to D and F10 #3.
Hang files: CDN img/_review/renderer-mem/5e013076-tp-{hot-2,off-3,hot-3}-hang.json (sent to F10 #2 and Foreman D).

## F10 renderer memory (for the F10 workers)
- «Page crashed» = memcg OOM kill (dmesg, 7 kills, chrome renderer anon-rss 5.1–9.2 GB). Harness rssTree under-reports (logged 1.7 GB vs ps 8.5 GB).
- Leak signature: page stuck/idle on one screen, renderer +~280 MB/min until killed (timid-2 b77 01:08–01:35Z after «Chương 2: Sơ thừa ân sủng» card; off-1 b286). Normal play 1.3–2.5 GB. Sampler: /home/user/wt/rsslog.sh -> rsslog.txt. Evidence CDN img/_review/renderer-mem/.
