# rerun nc_gian — SEAT A (status, updated 26/11 03:30Z)
PRIORITY #1 CHECK: OD/CLAIMS/ROBOT-PLAYER-REVIEW read; rerun results and reviews live under dev/handover/robot/rerun-nc-nc_gian/ and dev/handover/robot/review/.
Ruling (Foreman D, 26/11 03:18Z): the 5 finished lives stay VALID, no replays — «pre-bfa73a6e harness, exitPick null → valid by EXIT RULING» (every end was a forced death / Lãnh cung).

| life | end | age | buổi | valid | harness |
|---|---|---|---|---|---|
| nc-nc_gian-greedy-1 | Hồng nhan bạc mệnh (illness) | 20 | 441 | yes | 1a29f470→93812531 (pre-bfa73a6e) |
| nc-nc_gian-random-1 | Lãnh cung — Phát điên | 22 | 566 | yes | 1a29f470→93812531 (pre-bfa73a6e) |
| nc-nc_gian-lover-1 | Lãnh cung — Phát điên | 23 | 643 | yes | 1a29f470→93812531 (pre-bfa73a6e) |
| nc-nc_gian-greedy-2 | Hồng nhan bạc mệnh (chronic poison) | 39 | 2881 | yes | 1a29f470→93812531 (pre-bfa73a6e) |
| nc-nc_gian-lover-2 | Hồng nhan bạc mệnh (illness) | 25 | 760 | yes | 93812531 (pre-bfa73a6e) |
| nc-nc_gian-cautious-1 | Lãnh cung — Tuổi xuân qua đi | 40 | 3490 | yes | 1a29f470→93812531→54fa0112+F10 hooks (mixed) |
| nc-nc_gian-scholar-1 | Lãnh cung — Tuổi xuân qua đi | 40 | 2871 | yes | 93812531→54fa0112+F10 hooks (mixed, 9 resumes; hangs b1510/b1559 replayed) |
| nc-nc_gian-lazy-1 | Hồng nhan bạc mệnh (illness) | 25 | 781 | yes | 54fa0112+F10 hooks, BUILD 5ab5b80e406e |
| nc-nc_gian-lazy-1b | Ban hoa — Bị ban hoa, xuất cung | 19 | 1 | VALID-EXIT «failed selection» (Lễ ra mắt, minigame #kg82 «Quay lại»; no life data; BUILD cc68dcfd2b1b) - replaced by lazy-1d | 54fa0112+F10 hooks |
| nc-nc_gian-lazy-1c | Ban hoa — Bị ban hoa, xuất cung | 20 | 1 | VALID-EXIT «failed selection» (Lễ ra mắt «Cúi đầu chờ xét», no exam; no life data; BUILD cc68dcfd2b1b) - replaced by lazy-1e | 54fa0112+F10 hooks |
| nc-nc_gian-speed-1 | Lãnh cung — Phát điên trong lãnh cung | 31 | 1780 | yes | 54fa0112+F10 hooks (16 resumes), BUILD fa8da73cecdc; crawl b1649+ (kitOptUnify) |
| nc-nc_gian-speed-2 | Hồng nhan bạc mệnh (dysentery) | 24 | 726 | yes | 54fa0112+F10 hooks, BUILD b7dcbbd06e03 |
| nc-nc_gian-lazy-1d (quiet 7003) | Ban hoa (failed selection) | 20 | 1 | VALID-EXIT, no data | cc68dcfd2b1b |
| nc-nc_gian-lazy-1e (quiet 7004) | Công chúa ở lại cố quốc («Hòa ước» choice «Xin để vương muội đi thay») | 19 | 122 | VALID-EXIT «story ending (stay home)» per Foreman ruling 19:19Z; no life data | |
| nc-nc_gian-lazy-1f (quiet 7005) | Ban hoa (failed selection) | 20 | 1 | VALID-EXIT, no data | cc68dcfd2b1b |
| nc-nc_gian-lazy-1g (7006), lazy-1h/1i/1j (7007-7009, spares) | running / queued (replacements, bot=quiet, until 2 real lazy lives) | – | – | – | |
| nc-nc_gian-lazy-2 | running | – | b400 | – | 54fa0112+F10 hooks |
Notes: seeds for lazy-1b/lazy-1c (7001, 7002) are my own placeholders (original md-only entries had no seed). Game build per life: <life>.build (written when first seen by the logger; lives begun before 22:12Z have only a resume-time tag fa8da73cecdc). Memory: mem.csv (renderer RSS flat 2.6–3.6 GB through b2779; 6–7 GB freezes at b65–68 were startup spikes with 3 pages).
Fast-lane bug list sent to Foreman D (dead «Tin báo»/«Lui» + duplicate queue; Trường Môn viện no-clock loop; pet «Xem …» covered; «Danh hiệu» no close; f.rk.split; reward card over end screen).

## Foreman ruling 26/11 18:37Z on lazy-1b / lazy-1c
Trace check: both lives' last screens before the end are «Lễ ra mắt» (the nc entry selection) - 1b took «Dâng khúc đàn cố quốc» then the #kg82 mini-game, 1c took «Cúi đầu chờ xét» (no exam). End screen «Duyên cung lỡ hẹn · Bị ban hoa, xuất cung» (CDN img/_review/rerun-nc_gian/lazy-1b-end-banhoa.png, lazy-1c-end-banhoa.png). So: game outcome «failed selection», marked VALID-EXIT, but they give no life data, so replayed as lazy-1d (bot=cautious, seed 7003) and lazy-1e (bot=cautious, seed 7004) (my reading of «same bot, not quiet»: same lazy slot, different bot profile; tell me if you meant otherwise).
Selection failure rate for the lazy slot on new builds: lazy bot=quiet 2 of 3 (lazy-1b, lazy-1c on BUILD cc68dcfd2b1b; lazy-1 passed on 5ab5b80e406e), lazy-2 pending. Flag for Foreman: selx-fair balance if lazy fails nearly always on cc68dcfd.

Selection-fail count (nc entry «Lễ ra mắt»), per bot + build: quiet on cc68dcfd2b1b: 3 fails of 4 attempts that reached it (1b, 1c, 1d fail; 1e passed); quiet on 5ab5b80e406e: lazy-1 passed. Flag selx-fair: lazy fails the selection most of the time on cc68dcfd2b1b.

Selection fail update 19:30Z: quiet on cc68dcfd2b1b: 1b, 1c, 1d, 1f fail; 1e and lazy-2 pass = 4 of 6 attempts fail. quiet on 5ab5b80e406e: lazy-1 passed (1/1).
BUILD tag windows (BUILD = sha256[:12] of dev/index.html + site/swreg.js + site/kwait.js after assemble, so it is NOT a git sha; I only know when a tag was first seen on the live page): fa8da73cecdc live at 22:12Z 25/11 until at least 04:10Z 26/11 (last seen on speed-1 start); b7dcbbd06e03 seen 08:53Z 26/11 (speed-2); 5ab5b80e406e seen 15:40Z 26/11 (lazy-1); cc68dcfd2b1b seen from 18:27Z 26/11 (lazy-1b onwards, still live at 19:21Z). To tie a tag to a commit someone has to run build_site.sh on the candidate commit and compare the BUILD it prints.
Renderer hang files per life (CDN img/_review/renderer-mem/seatA-D-nc-nc_gian-<life>-hang*.json): scholar-1, speed-1 (25 samples to b1696, kitOptFit0/kitOptFit), speed-2 (3 samples b714, kitOptUnify).

Spares 19:50-21:10Z: lazy-1h (quiet 7007) Ban hoa b1 = failed selection; lazy-1i (7008) «Công chúa ở lại cố quốc» b122 = story ending, same «Hòa ước» choice «Xin để vương muội đi thay» as lazy-1e (the quiet bot takes it, lazy-1g/lazy-2 got past); lazy-1j (7009) Ban hoa b1 = failed selection. All VALID-EXIT, no data. Quiet bot now: selection fail 6 of 10 attempts on cc68dcfd2b1b; «Hòa ước» stay-home ending 2 of 4 that reached it. Real lazy lives still running: lazy-2 (b1101), lazy-1g (b500); spares lazy-1k..1n (seeds 7010-7013) queued for the 13th real life.
