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
