# PROGRESS — review/danh-p1 (Foreman D worker, numbers/balance)

Task: owner ruling 16/11 12:55Z (dev/handover/FOREMAN_D.md, line "(12:55Z s16) … ANSWERS"): DANH balance P1 APPROVED (charity bạc 20→35,
Danh 1→5 + shared Hành sự door); P2 build the Tài-nghệ bot first, no BAL.ex.bar change; P3 NO.
Base: origin/review/danh-balance-r1 @9a1133f0 (value-neutral ONE-CORE fixes) merged with origin/main b85cdb1e (merge f8ebd5e7;
only conflicts: generated index.html/sw.js/assets.json (rebuilt) and jbal2.js (two independent blocks, both kept)).

## Done
1. P1 (a058c5f8): `BAL.charity` = {khac 1, bac 35, duc 3, danh 5} (jbal2.js only). The act "Phát bạc cứu giúp cung nhân nghèo" now has two
   doors: the Tài nghệ · Tứ đức button (j85/jtabs, unchanged text, prints BAL) and a Hành sự card (jact.js `adCharityCard`, dealt like the
   act-dedupe maid cards, `adRun` path). One effect body `charityFx` (j85), one monthly lock `S.charM` (`charityLocked`). Card = kit act card
   (Cần/Tốn/Được from c/w), reason when greyed: "Tháng này đã làm" / "Thiếu bạc (cần 35)". Not dealt in servant mode or lãnh cung (S.out).
   Picture: CDN img/ACTS.json already maps this exact name → act-phat-bac-cuu-giup (no kit request).
2. Reproducible runner (6ee2bf21): dev/measure/run_rep.js (same CLI as run_par.js) + dev/measure/vclock.js (virtual clock for every timer,
   Date, performance.now; seeded crypto; re-seed at start()); per-page life quota; non-local requests from a disk cache.
   inpage6.js pumps the clock 5 ms per bot step (no effect without vclock).
3. Tài-nghệ bot: dev/measure/intn.js (+ hooks `__xOpts` / `__xModal` in inpage6.js), counters x.ix.exl; summary dev/measure/antn.py.
4. Test: dev/test/danh-p1.js (17 checks) PASS at 755x1000 and 1180x820.

## Runs (DONE 18/18; results dev/review/danh-p1.md)
dev/measure/pass/p1arms.sh (6 arms × seeds 501/777/913 × 16 lives, cap 144 tuần); outputs copied to dev/measure/pass/data/danh-p1/.
Analysis: `python3 dev/measure/andanh.py …` (Danh) and `python3 dev/measure/antn.py …` (exam, Tài nghệ, charity uses).

## Resume
If the runs stopped: re-run `bash dev/measure/pass/p1arms.sh` (skips finished runs; needs root/_before.html (build of f8ebd5e7) and
root/_p1.html (build of a058c5f8) at the worktree root — rebuild with dev/site/build_site.sh and copy index.html).
Report: dev/handover/reports/danh-p1.md on the handover branch.
