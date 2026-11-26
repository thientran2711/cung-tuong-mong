# QC-NOISE-HYGIENE — report (worker session_01UV1Szjdc6ChaY51kuwNyt3, Foreman F #19 → #20)

PRIORITY #1 CHECK: OD 1 ('noise budget', 'text hygiene' — owner row 26/11 ~06:50Z (A)+(D)) | main none | review/* none for a noise gate; REUSED: FOREMAN D's D2 daily big-event cap BAL.evc (review/stat-pace jbalsp.js, not on LIVE yet) for big / visit cards, KK38 vp-doubled scan + j84 fix (review/kit-stage-r2 919f6c1b, copied byte-identical so the two branches merge clean), real-tap harness review/robot-realtap 08a4ff8b (contains 89f5b956) | claims F #19 08:33Z.

Branch: **review/qc-noise-hygiene 81c148b0fc7759ffe9bdb3b6905699d337a132d3** (from LIVE 6b5d3d05; LIVE is its ancestor → fast-forward). START_CTX ~5 %.

## What it is
- **BAL.noise** (dev/build/jbal2.js, ONE CORE; read only by QC tools): per game day (wk(), tuần) tinbao 10 · chip 6 · seal 2 · dlg 10 · dlgB (one buổi) 4 · resRows (one result card) 8; text: lineMax chip 90 / tinbao 110 / resrow 70 letters, dotMax 3 «·» per line, noDup (words that are a fault when said twice), leakOk. **big / visit are NOT in BAL.noise**: the gate reads FOREMAN D's BAL.evc.cap / BAL.evc.q.visit from the played build (no second set of caps); a build without BAL.evc reports «no D2 cap in this build» and measures them only. Tested against review/stat-pace's jbalsp.js: budget 3 / 1 applied, 0 days over on these lives.
- **dev/measure/noise-sampler.js** (in-page, READ-ONLY: reads S, Q, kitNoticeList, tinBaoList, kaLastResult, the DOM; never taps, never writes) + **noise-preload.js** (`node -r` preload: adds the sampler to every context the real-tap robot opens; robot-rt.js itself unchanged). Channels: Tin báo rows, world news items, toast chips (#kntchip), result cards + rows (#rtoast / kaLastResult), dialogs / cards per day and per buổi, visitors, BIG cards (jevc evcKind names), emotion-seal cards, story pages (apart), cards she opened herself by a tap on the page (apart: «own», not an interruption).
- **dev/measure/noise-day.js** `run` (device lanes, real taps, a life that ends early is followed by the next seed, wall-clock cap per lane) / `table` (per life per game day; unfinished last day left out) → markdown table; exit 1 when a channel is over budget on any day.
- **dev/test/text-hygiene.js**: ONE rule set — dup (KK38 two-word repeat + noDup words), glue («=» between words, «=>», «&&», «||», «· ·», more than dotMax «·», «·» at a line edge on one-line surfaces), bracket («((», «]]», «««», empty «()» ««»», «${»), leak (undefined / NaN / null / [object / true / false, words with f j w z, camelCase, snake_case, picture ids c03 / m12, file names), pct («%»), long (one-line surfaces). `--runtime` = every distinct line the robot SAW (with its surface); `--static` = every string literal / template of dev/build/j*.js through acorn (regex sources, CSS, {slot} fill-ins skipped). Frozen list dev/test/text-hygiene-known.json: `keys` = 413 static faults (dev strings: kit page, src notes, chat tags — may only shrink), `runtime` = 4 LIVE debt families with their owner (below).
- **Gate**: dev/tools/quickcheck.d/96-noise-hygiene.sh (G4 hook): static (new fault = FAIL) · vp-doubled · noise-day (Fold 755x1000 + iPad 1180x820 lanes, 7 min each, ≥ 3 full days) · runtime hygiene. ~8.5 min, inside the 600 s hook limit (env QC_NOISE_MIN / QC_NOISE_SLICE / QC_NOISE_DAYS). **Nightly**: dev/tools/nightly.sh suites «noise-day» (4 lanes × 60 buổi) + «text-hygiene» = the long table.

## A. PLAYER-NOISE per game day — LIVE 6b5d3d05 (real-tap lives, Fold + iPad)
Lives 12 (f1:fold, f2:fold, f3:fold, f4:fold, f5:fold, f6:fold, i1:ipad, i2:ipad, i3:ipad, nz-fold-sens-31:fold, nz-ipad-sens-41:ipad, t1:) · full game days 177 (unfinished last days left out 12)

| channel | days | mean / day | p90 | worst | budget (BAL) | days over |
|---|---|---|---|---|---|---|
| Tin báo rows / day | 177 | 3.8 | 8 | 18 | 10 | 6 |
| toast chips / day | 177 | 3.1 | 5 | 9 | 6 | 5 |
| dialogs / cards that came to her / day | 177 | 2.4 | 5 | 14 | 10 | 3 |
| dialogs / cards in one buổi (worst) | 177 | 1.6 | 3 | 8 | 4 | 6 |
| BIG event cards / day (D2 BAL.evc.cap) | 177 | 0.1 | 1 | 1 | no D2 cap in this build | — |
| people coming to find her / day (D2 BAL.evc.q.visit) | 177 | 0.1 | 0 | 1 | no D2 cap in this build | — |
| emotion-seal cards / day | 177 | 0.0 | 0 | 0 | 2 | 0 |
| rows on one result card (worst) | 177 | 2.3 | 3 | 6 | 8 | 0 |
| result cards / day (her own acts: measured, no budget) | 177 | 4.8 | 9 | 13 | — | — |
| world news items / day (feeds Tin báo: measured) | 177 | 2.1 | 5 | 19 | — | — |
| story pages she pages through (measured) | 177 | 0.3 | 0 | 6 | — | — |
| cards she opened herself by a tap on the page (measured) | 177 | 0.0 | 0 | 2 | — | — |


(Lives f1–f6 / i1–i3 / t1 ran with the first sampler, which still counted cards she opened herself inside «dialogs»; nz-*-31/41 with the final one. Tin báo / chip / seal / result rows are the same in both.)

## B. Same table on the branch (same budgets; the branch changes no noise source — wording only)
Lives 6 (nz-fold-sens-11:fold, nz-fold-sens-111:fold, nz-ipad-cautious-21:ipad, nz-ipad-sens-21:ipad, nz-fold-sens-31:fold, nz-ipad-sens-41:ipad) · full game days 26 (unfinished last days left out 6)

| channel | days | mean / day | p90 | worst | budget (BAL) | days over |
|---|---|---|---|---|---|---|
| Tin báo rows / day | 26 | 3.8 | 7 | 15 | 10 | 2 |
| toast chips / day | 26 | 3.0 | 5 | 8 | 6 | 1 |
| dialogs / cards that came to her / day | 26 | 2.0 | 4 | 6 | 10 | 0 |
| dialogs / cards in one buổi (worst) | 26 | 1.7 | 3 | 6 | 4 | 2 |
| BIG event cards / day (D2 BAL.evc.cap) | 26 | 0.2 | 1 | 1 | no D2 cap in this build | — |
| people coming to find her / day (D2 BAL.evc.q.visit) | 26 | 0.2 | 1 | 1 | no D2 cap in this build | — |
| emotion-seal cards / day | 26 | 0.0 | 0 | 0 | 2 | 0 |
| rows on one result card (worst) | 26 | 2.9 | 4 | 5 | 8 | 0 |
| result cards / day (her own acts: measured, no budget) | 26 | 6.2 | 9 | 14 | — | — |
| world news items / day (feeds Tin báo: measured) | 26 | 2.1 | 7 | 12 | — | — |
| story pages she pages through (measured) | 26 | 0.6 | 1 | 9 | — | — |
| cards she opened herself by a tap on the page (measured) | 26 | 1.2 | 4 | 4 | — | — |


### Noise families over budget (NOT fixed here — owners named, listed for MAIN)
| # | channel | worst | what floods | owner |
|---|---|---|---|---|
| N1 | Tin báo rows | 18 / day (budget 10) | tai mắt «<người> báo: <cung> có chuyện» — one row per palace, 6–13 a day | NEWS-SIEVE-2 (review/news-sieve «one-copy Tin báo», news only about her) |
| N2 | toast chips | 9 / day (budget 6) | every «again» notice slides a chip: «Ngươi biết thêm N điều», «X xưng danh với ta», «Có tin: … có chuyện» (echo of N1), visit invites «X sai người sang…», the buổi-turn place line «Sang buổi …, ta vẫn ở …» (kitLineToast) | kit keeper (jnotice chip rule) + NEWS-SIEVE-2 |
| N3 | dialogs in one buổi | 8 (budget 4) | «Danh hiệu» / «Đeo «Thư hương»» pairs — first sampler counted her own taps; the final sampler still sees 6 on the branch lane fold-31 day 5: re-measure on the nightly before calling it a game fault | QC (this worker) / MAIN |
| — | BIG cards, visitors | 1 / day | inside D2's cap 3 / 1 already (palace-phase lives were few: robots stay rank 0–1 in 30–50 days) | D2 (stat-pace) |

## D. TEXT HYGIENE — before / after
| scan | LIVE 6b5d3d05 | branch |
|---|---|---|
| vp-doubled (KK38) «thiện cảm thiện cảm» | 33 | **0** |
| runtime dup «Hoàng thượng Hoàng thượng niên hiệu …» (joi.js opening line: «Hoàng thượng ${empName()}», empName already says it) | 2 lines | **0** (family scan: the only «Hoàng thượng ${emp…}» site) |
| runtime glue «Lý do: A · B · C · D · E» (j68i promotion news, 4×«·» in a sentence) | 2 lines | **0** (commas; «Đã/Chưa/Được/Có/Không/Cách» lower-cased after a comma) |
| runtime long one-line texts (chip > 90, Tin báo > 110) | 112 lines | 18 lines — all in the 4 known families below |
| runtime NEW faults (gate) | 4 → FAIL | **0 → PASS** |
| static string builders | 413 (frozen) | 413 (no new) |
| «%» / English / ids seen on screen | 0 / 0 / 0 | 0 / 0 / 0 |

Known runtime debt families (dev/test/text-hygiene-known.json `runtime`; owner NEWS-SIEVE-2, all over-long Tin báo / chip rows; they go away with «news only about her» + short rows):
1. NPC kỳ ngộ rumour told whole: «Nghe nói A gặp kỳ ngộ với B: …; …; …» (jky.js:251 → newsAdd → kitKnowFlush line = full text; the panel already shortens it via ntRow) — 94–170 letters.
2. world news by a bearer «X, người hầu cung Y, đi ngang ghé bẩm / nói nhỏ / nhận bạc rồi bẩm: … » + end phrase «Việc ấy đã xong, giờ tới cũng chẳng còn gì» (jagknow knLine / knEnd / knBao) — 114–144.
3. late servant report «Bẩm chủ tử, giờ nô tỳ mới kịp bẩm: lúc trước nô tỳ nghe X kể: …» (two colons) — 111–115.
4. NPC↔NPC world news (che miệng cười, mách Hoàng hậu, thắng một ván, nhận nửa lễ, nghe lời đồn, Nội vụ phủ bớt xén bổng lộc) — 100–169.
Observation (not a rule of (D), not changed): makeup grade words keep a capital mid-sentence («gương mặt điểm trang Vụng về», toilMkW lower-cases only «mộc»).

## quickcheck on the branch head
bash dev/tools/quickcheck.sh → build in sync, one-core guard / text PASS, open + old save + perf PASS (render 211/252 ms, buổi 1370/1452 ms new/live), **G4 96-noise-hygiene PASS** (static PASS · vp-doubled PASS · noise-day PASS 4 game days · runtime PASS); overall FAIL only on G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» Fold + iPad and G4 90-button-crawl «Ô lưu · Lui did not close» — **the same 2 dialog-fixed FAILs on LIVE 6b5d3d05** (re-run on the LIVE build), untouched by this branch (no UI file changed).

## HANDOVER (rollover 26/11 ~11:00Z: ctx 42 % ≥ START 5 % + 25 %; worker session_01UV1Szjdc6ChaY51kuwNyt3 → successor opened by F #21)
State: review/qc-noise-hygiene 81c148b0 pushed; BIG #9 FAIL (report dev/handover/reports/qc-noise-hygiene-review.md, handover 326067dd). TODO for the successor, in order:
1. FAIL 1 (blocking): dev/measure/noise-sampler.js calls tinBaoList() (writes S.tb via knTb, knCarryTick delivers news + KN.cb, knEnd → kLine → Math.random / S.vmem, adHapNow writes S.adHap). Replace with a pure read of S.tb.K / S.tb.R (same filter as tinBaoList without the knEnd rewrite / carry tick). Then scan EVERY other game call in the sampler for side effects (kitNoticeList = NT.list.slice() pure? wk(), evcKind, typeof checks; kaLastResult / Q / DOM reads) — list each with verdict in the report.
2. Add a no-mutation self-test: dev/test/noise-sampler-pure.js — load a real save (robot ckpt or a played Fold slice), JSON snapshot of S (+ Math.random calls counted via a wrapper, localStorage save string) before / after N sampler ticks with no taps → must be identical; wire into the 96 hook before the lanes.
3. Rebase (merge) on FRESH origin/main (LIVE now 3af7896e, was 6b5d3d05): conflicts likely only jbal2.js tail (BAL.noise block, keep it with its /*NOISE-END*/ marker), j84.js (KK38 hunk may already be on main → keep main's), built files → rebuild (bash dev/site/build_site.sh), re-freeze static list only if needed (node dev/test/text-hygiene.js --static --update; must not grow without reason).
4. Re-measure tables A (LIVE) / B (branch) with harness 2df8f5fa (origin/review/robot-realtap or RT_HARNESS): `node dev/measure/noise-day.js run <url> <out> lives=fold:sens:31,fold:cautious:32,ipad:sens:41,ipad:cautious:42 slice=90 mins=60 harness=<wt of 2df8f5fa>`; serve LIVE from a dir holding only index.html/sw.js/assets.json of origin/main, the branch from its worktree. Replace tables A/B + D in this report.
5. Reviewer note Q1: quickcheck lanes rarely hit flood days → say in the report that the nightly «noise-day» suite is the real gate (quickcheck hook = smoke). Then quickcheck, push, «READY <sha>» to F #21.
Scratch: /home/user/wt/qcnh (branch worktree), /home/user/wt/nz-*/ (old data, not in git).

## Files
dev/build/jbal2.js (BAL.noise), joi.js, j68i.js, j84.js (KK38 hunk); dev/measure/noise-sampler.js, noise-preload.js, noise-day.js; dev/test/text-hygiene.js, text-hygiene-known.json, vp-doubled.js (KK38 copy); dev/tools/quickcheck.d/96-noise-hygiene.sh + README line; dev/tools/nightly.sh (2 suites).

## Notes for the reviewer / MAIN
- The gate FAILS on LIVE today (N1 Tin báo 18 > 10, N2 chips 9 > 6, text faults); on the branch the text part PASSES and the noise part fails only on N1/N2 days when a lane meets them. Landing order that keeps go-live green: NEWS-SIEVE-2 (N1, text families 1–4) and D2 stat-pace first, or MAIN lands this with QC_NOISE_* tuned / N2 decided by the kit keeper.
- Harness used: 08a4ff8b for every measuring life. Gap check vs the fixed harness ec026335 (BIG #9 PASS): only nz-ipad-cautious-21 (branch, kscn-veil DEAD loop from its start → 0 full days, so it adds nothing to table B); no life hit the #kg82 board-play gap. New lives (nightly / gate) take the harness from origin/review/robot-realtap, i.e. ec026335 or later.
- Harness: lanes re-seed after «Ban hoa» at buổi 1 (3 of 9 first lives ended there); iPad cautious seed 21 looped on a kscn-veil DEAD BUTTON page (sent to HARNESS FIXER #9 with paths). No measuring life hit #kg82 «Bỏ qua».
- Sampler / preload are read-only; robot-rt.js untouched; harness taken from origin/review/robot-realtap when the kit has no copy (`git show`), or RT_HARNESS.
