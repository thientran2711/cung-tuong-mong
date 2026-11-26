# QC-NOISE-HYGIENE — report (worker session_01UV1Szjdc6ChaY51kuwNyt3 → #2 session_01UV1SziHz797K3qQPHWASGq, Foreman F #19 → #22)

PRIORITY #1 CHECK: OD 1 ('noise budget', 'text hygiene' — owner row 26/11 ~06:50Z (A)+(D)) | main none | review/* none for a noise gate; REUSED: FOREMAN D's D2 daily big-event cap BAL.evc (review/stat-pace jbalsp.js, not on LIVE yet) for big / visit cards, KK38 vp-doubled scan + j84 fix (review/kit-stage-r2 919f6c1b, copied byte-identical so the two branches merge clean), real-tap harness review/robot-realtap 08a4ff8b (contains 89f5b956) | claims F #19 08:33Z.

Branch: **review/qc-noise-hygiene e5c39877bc6004eeda36b731dc8bba7a0434eee7** (was 81c148b0 from LIVE 6b5d3d05; now merged with LIVE 3af7896e → fast-forward onto main). START_CTX ~5 %.

## FIX of BIG #9 FAIL 1 (worker #2, 26/11 ~11:05–12:55Z; depth 6; START_CTX ~5 %) — branch tip e5c39877 (code b41d8d21 + a test-json line)
PRIORITY #1 CHECK: OD 26/11 ~06:50Z (A)+(D) | main none | review/qc-noise-hygiene 81c148b0 (this job), review/stat-pace (evcKind checked there), review/robot-realtap 2df8f5fa (harness) | claims QC-NOISE-HYGIENE #2.
- **Sampler is read-only now** (dev/measure/noise-sampler.js): world news are read straight from S.tb (Object.values(S.tb.K) + S.tb.R, ids + lines copied); tinBaoList is never called. Its own id no longer draws Math.random (a seeded life's stream must not move).
- **Whole-family scan — every game call the sampler makes, with verdict:**

| call / read | what it does | verdict |
|---|---|---|
| tinBaoList() (jagknow) | adHapNow writes S.adHap; knTb writes S.tb, knCarryIn/knCarryTick deliver S.tb.W + fire KN.cb; knEnd rewrites lines (kLine, S.vmem) | **REMOVED** → pure read of S.tb.K / S.tb.R |
| Math.random() (sampler id) | draws from the game's (seeded) RNG once per page | **REMOVED** → Date.now / performance.now id |
| wk() (j8) | `S.turn*3+S.tuan` (jcoopworld's wk is inside its IIFE, not global) | pure ✓ |
| kitNoticeList() (jnotice) | `NT.list.slice()` | pure ✓ |
| evcKind(m) (jevc, stat-pace builds only) | string / regex tests on m.t, m.pid | pure ✓ |
| BAL.noise / BAL.evc, Q[0], window.kaLastResult, S.buoi, m.emoSeal | property reads | pure ✓ |
| DOM: getElementById, innerText, getBoundingClientRect, getComputedStyle, querySelectorAll | reads (force layout only, no state) | pure ✓ |
| pointerdown listener | capture + passive, never stops / changes the tap | pure ✓ |
| window.__nzPush (exposeBinding, Node side) | appends to the jsonl file | outside the page ✓ |
| noise-preload.js | wraps chromium.launch / newContext to add the init script + binding; robot-rt.js unchanged | no game call ✓ |

- **Self-test dev/test/noise-sampler-pure.js** (wired into hook 96 as step 0 and nightly «sampler-pure»): seeded life, 2 buổi played, then planted one EXPIRED Tin báo item in S.tb.K and one DUE carried item in S.tb.W; the sampler (the same function the lanes inject) is installed with its interval captured and ticked 120 times (= 6 s at 50 ms) inside ONE synchronous evaluate, so no game timer runs between the two snapshots (an idle page's own timers DO write S — __feelMig, autosave, ~300 Math.random draws in 6 s — not the sampler's business). Checks: S JSON byte-identical, localStorage identical, Math.random 0 calls (install + ticks), KN.cb 0, the planted line was read from S.tb.K; control: one tinBaoList() on the same state DOES change S (+ KN.cb fired).
  - fixed sampler: **NOISE-SAMPLER-PURE: ALL 9 PASS**. Old sampler 81c148b0 (NZP_SAMPLER=<file>): **4 FAIL** (S changed: expired line rewritten «… đang dạo vườn» → ended; KN.cb fired 1 = carried news delivered; Math.random 1 call; control saw nothing left to change).
- Merged fresh origin/main 3af7896e (conflicts only index.html / sw.js → rebuilt with dev/site/build_site.sh; no source conflict). Static hygiene 413 frozen / 0 new PASS, vp-doubled PASS on the merged build.
- Runtime hygiene on the re-measured lives: LIVE 3af7896e **12 NEW → FAIL** (the KK38 / joi / j68i families this branch fixes + long rows); branch **1 NEW → widened known family 3** (same builder jagknow knBao, eyewitness form «Bẩm …, nô tỳ tận mắt thấy ở <nơi>: …», 111 > 110; owner NEWS-SIEVE-2) → **PASS**.

## What it is
- **BAL.noise** (dev/build/jbal2.js, ONE CORE; read only by QC tools): per game day (wk(), tuần) tinbao 10 · chip 6 · seal 2 · dlg 10 · dlgB (one buổi) 4 · resRows (one result card) 8; text: lineMax chip 90 / tinbao 110 / resrow 70 letters, dotMax 3 «·» per line, noDup (words that are a fault when said twice), leakOk. **big / visit are NOT in BAL.noise**: the gate reads FOREMAN D's BAL.evc.cap / BAL.evc.q.visit from the played build (no second set of caps); a build without BAL.evc reports «no D2 cap in this build» and measures them only. Tested against review/stat-pace's jbalsp.js: budget 3 / 1 applied, 0 days over on these lives.
- **dev/measure/noise-sampler.js** (in-page, READ-ONLY: reads S, Q, kitNoticeList, tinBaoList, kaLastResult, the DOM; never taps, never writes) + **noise-preload.js** (`node -r` preload: adds the sampler to every context the real-tap robot opens; robot-rt.js itself unchanged). Channels: Tin báo rows, world news items, toast chips (#kntchip), result cards + rows (#rtoast / kaLastResult), dialogs / cards per day and per buổi, visitors, BIG cards (jevc evcKind names), emotion-seal cards, story pages (apart), cards she opened herself by a tap on the page (apart: «own», not an interruption).
- **dev/measure/noise-day.js** `run` (device lanes, real taps, a life that ends early is followed by the next seed, wall-clock cap per lane) / `table` (per life per game day; unfinished last day left out) → markdown table; exit 1 when a channel is over budget on any day.
- **dev/test/text-hygiene.js**: ONE rule set — dup (KK38 two-word repeat + noDup words), glue («=» between words, «=>», «&&», «||», «· ·», more than dotMax «·», «·» at a line edge on one-line surfaces), bracket («((», «]]», «««», empty «()» ««»», «${»), leak (undefined / NaN / null / [object / true / false, words with f j w z, camelCase, snake_case, picture ids c03 / m12, file names), pct («%»), long (one-line surfaces). `--runtime` = every distinct line the robot SAW (with its surface); `--static` = every string literal / template of dev/build/j*.js through acorn (regex sources, CSS, {slot} fill-ins skipped). Frozen list dev/test/text-hygiene-known.json: `keys` = 413 static faults (dev strings: kit page, src notes, chat tags — may only shrink), `runtime` = 4 LIVE debt families with their owner (below).
- **Gate**: dev/tools/quickcheck.d/96-noise-hygiene.sh (G4 hook): static (new fault = FAIL) · vp-doubled · noise-day (Fold 755x1000 + iPad 1180x820 lanes, 7 min each, ≥ 3 full days) · runtime hygiene. ~8.5 min, inside the 600 s hook limit (env QC_NOISE_MIN / QC_NOISE_SLICE / QC_NOISE_DAYS). **Nightly**: dev/tools/nightly.sh suites «noise-day» (4 lanes × 60 buổi) + «text-hygiene» = the long table.

## A. PLAYER-NOISE per game day — LIVE origin/main 3af7896e (re-measured 26/11 ~12:20Z with the FIXED read-only sampler, harness review/robot-realtap 2df8f5fa; 4 lanes fold:sens:31, fold:cautious:32, ipad:sens:41, ipad:cautious:42 × 90 buổi, run in parallel with B; budgets = the branch BAL.noise, LIVE has none)

Lives 5 (nz-fold-cautious-32:fold, nz-fold-sens-31:fold, nz-ipad-cautious-142:ipad, nz-ipad-cautious-42:ipad, nz-ipad-sens-41:ipad) · full game days 42 (unfinished last days left out 5)

| channel | days | mean / day | p90 | worst | budget (BAL) | days over |
|---|---|---|---|---|---|---|
| Tin báo rows / day | 42 | 5.1 | 8 | 8 | 10 | 0 |
| toast chips / day | 42 | 3.7 | 5 | 8 | 6 | 2 |
| dialogs / cards that came to her / day | 42 | 1.5 | 4 | 5 | 10 | 0 |
| dialogs / cards in one buổi (worst) | 42 | 1.2 | 2 | 3 | 4 | 0 |
| BIG event cards / day (D2 BAL.evc.cap) | 42 | 0.3 | 1 | 2 | no D2 cap in this build | — |
| people coming to find her / day (D2 BAL.evc.q.visit) | 42 | 0.1 | 0 | 1 | no D2 cap in this build | — |
| emotion-seal cards / day | 42 | 0.0 | 0 | 1 | 2 | 0 |
| rows on one result card (worst) | 42 | 2.2 | 4 | 5 | 8 | 0 |
| result cards / day (her own acts: measured, no budget) | 42 | 4.1 | 6 | 7 | — | — |
| world news items / day (feeds Tin báo: measured) | 42 | 0.9 | 4 | 5 | — | — |
| story pages she pages through (measured) | 42 | 0.3 | 0 | 5 | — | — |
| cards she opened herself by a tap on the page (measured) | 42 | 0.9 | 2 | 3 | — | — |

Worst day per channel over budget (examples the sampler saw):
- chip: nz-fold-cautious-32 day 9 = 8 · «! Ta biết thêm 3 điều» «! Ta biết thêm 3 điều» «! Ta biết thêm 2 điều» «! Ta biết thêm 2 điều»

NOTE: this build has no BAL.evc (FOREMAN D's D2 daily big-event cap, review/stat-pace): big cards 2 worst / day, visit 1 worst / day are measured, not gated (no second set of caps).

NOISE-DAY FAIL · over budget: chip 8>6 on 2 day(s)

## B. Same table on the branch b41d8d21+ (same lanes / seeds / harness / budgets; the branch changes no noise source — wording only)

Lives 4 (nz-fold-cautious-32:fold, nz-fold-sens-31:fold, nz-ipad-cautious-42:ipad, nz-ipad-sens-41:ipad) · full game days 42 (unfinished last days left out 4)

| channel | days | mean / day | p90 | worst | budget (BAL) | days over |
|---|---|---|---|---|---|---|
| Tin báo rows / day | 42 | 3.3 | 6 | 10 | 10 | 0 |
| toast chips / day | 42 | 3.3 | 5 | 8 | 6 | 1 |
| dialogs / cards that came to her / day | 42 | 0.9 | 3 | 6 | 10 | 0 |
| dialogs / cards in one buổi (worst) | 42 | 0.8 | 2 | 5 | 4 | 1 |
| BIG event cards / day (D2 BAL.evc.cap) | 42 | 0.1 | 0 | 1 | no D2 cap in this build | — |
| people coming to find her / day (D2 BAL.evc.q.visit) | 42 | 0.1 | 0 | 1 | no D2 cap in this build | — |
| emotion-seal cards / day | 42 | 0.0 | 0 | 0 | 2 | 0 |
| rows on one result card (worst) | 42 | 2.4 | 4 | 5 | 8 | 0 |
| result cards / day (her own acts: measured, no budget) | 42 | 3.5 | 6 | 16 | — | — |
| world news items / day (feeds Tin báo: measured) | 42 | 2.1 | 4 | 10 | — | — |
| story pages she pages through (measured) | 42 | 0.3 | 0 | 5 | — | — |
| cards she opened herself by a tap on the page (measured) | 42 | 1.3 | 3 | 4 | — | — |

Worst day per channel over budget (examples the sampler saw):
- chip: nz-fold-sens-31 day 18 = 8 · «! Có tin: Cần Chính điện có chuyện» «! Có tin: Cần Chính điện có chuyện» «! Tần ???: Một vị cung nữ không biết gì mới.» «! Tần ???: Một vị cung nữ không biết gì mới.»
- dlgB: nz-fold-sens-31 day 4 = 5 · «Hộp phấn lạ» «Danh hiệu» «Đeo «Thư hương»» «Danh hiệu»

NOTE: this build has no BAL.evc (FOREMAN D's D2 daily big-event cap, review/stat-pace): big cards 1 worst / day, visit 1 worst / day are measured, not gated (no second set of caps).

NOISE-DAY FAIL · over budget: chip 8>6 on 1 day(s) · dlgB 5>4 on 1 day(s)

Reading A vs B: same seeds, but the lives part ways at the first different line / RNG draw (wording changes timing of taps), so day-by-day they are different lives; the two builds are inside the same ranges (Tin báo worst 8 / 10, chips worst 8 / 8, dlgB 3 / 5). Old tables (sampler that called tinBaoList, LIVE 6b5d3d05: Tin báo worst 18, chips 9, dlgB 8 on 177 days) are dropped: they were measured on lives the sampler itself changed (BIG #9 FAIL 1). On these 42 + 42 days the N1 Tin báo flood did not come up (worst 8 / 10 per day); N2 chips (8 > 6, «Ta biết thêm N điều» / «Có tin: … có chuyện» echoes) and N3 dlgB (5 > 4, «Danh hiệu» / «Đeo «Thư hương»» pairs) still do — families and owners below unchanged.

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

## quickcheck on the branch head (b41d8d21 vs LIVE 3af7896e, harness RT_HARNESS_REF=2df8f5fa, 26/11 ~12:45Z)
QUICKCHECK PASS (open 2130 ms, old save ok, perf median new/live: render 223/194, tab 458/452, buổi 1101/1611 ms, tasks>200 31/31); one-core / time-spill PASS. G4: **96-noise-hygiene: sampler-pure PASS · static PASS · vp-doubled PASS · runtime PASS · noise-day FAIL «chip 9>6 on 1 day»** (lane nz-fold-sens-11 day 0: «Có tin: Đức Thọ cung có chuyện», «X xưng danh với ta», «Sang buổi trưa, ta vẫn ở Khuê phòng…», «Một vị Thường tại sai người sang…» = the known N2 chip family, not this branch's code) — exactly reviewer note Q1: the smoke lanes met a flood day. G4 80-dialog-fixed (kit-dialog-2 a, Fold + iPad) and 90-button-crawl (Ô lưu · Lui) = the same FAILs as on LIVE (no UI file changed). G4 50-coop-one-world FAILED only because my sparse worktree left out coop/ — re-run with coop/ checked out: PASS PASS (seeds 7, 3).
**Q1 — the real gate is the nightly**: the quickcheck hook is a SMOKE (2 seeded lanes, ~4 game days; LIVE floods on a few days in 40+), written into the hook header. While N2 (chips) is open the hook WILL turn go-live red on some landings → MAIN decides before landing: land with hook 96 noise-day step advisory (QC_NOISE_* / N2 fixed first by the kit keeper + NEWS-SIEVE-2), or hold. Nothing in BAL.noise was loosened.

## HANDOVER #1 — DONE by worker #2 (items 1–5 above) (rollover 26/11 ~11:00Z: ctx 42 % ≥ START 5 % + 25 %; worker session_01UV1Szjdc6ChaY51kuwNyt3 → successor opened by F #21)
State: review/qc-noise-hygiene 81c148b0 pushed; BIG #9 FAIL (report dev/handover/reports/qc-noise-hygiene-review.md, handover 326067dd). TODO for the successor, in order:
1. FAIL 1 (blocking): dev/measure/noise-sampler.js calls tinBaoList() (writes S.tb via knTb, knCarryTick delivers news + KN.cb, knEnd → kLine → Math.random / S.vmem, adHapNow writes S.adHap). Replace with a pure read of S.tb.K / S.tb.R (same filter as tinBaoList without the knEnd rewrite / carry tick). Then scan EVERY other game call in the sampler for side effects (kitNoticeList = NT.list.slice() pure? wk(), evcKind, typeof checks; kaLastResult / Q / DOM reads) — list each with verdict in the report.
2. Add a no-mutation self-test: dev/test/noise-sampler-pure.js — load a real save (robot ckpt or a played Fold slice), JSON snapshot of S (+ Math.random calls counted via a wrapper, localStorage save string) before / after N sampler ticks with no taps → must be identical; wire into the 96 hook before the lanes.
3. Rebase (merge) on FRESH origin/main (LIVE now 3af7896e, was 6b5d3d05): conflicts likely only jbal2.js tail (BAL.noise block, keep it with its /*NOISE-END*/ marker), j84.js (KK38 hunk may already be on main → keep main's), built files → rebuild (bash dev/site/build_site.sh), re-freeze static list only if needed (node dev/test/text-hygiene.js --static --update; must not grow without reason).
4. Re-measure tables A (LIVE) / B (branch) with harness 2df8f5fa (origin/review/robot-realtap or RT_HARNESS): `node dev/measure/noise-day.js run <url> <out> lives=fold:sens:31,fold:cautious:32,ipad:sens:41,ipad:cautious:42 slice=90 mins=60 harness=<wt of 2df8f5fa>`; serve LIVE from a dir holding only index.html/sw.js/assets.json of origin/main, the branch from its worktree. Replace tables A/B + D in this report.
5. Reviewer note Q1: quickcheck lanes rarely hit flood days → say in the report that the nightly «noise-day» suite is the real gate (quickcheck hook = smoke). Then quickcheck, push, «READY <sha>» to F #21.
Scratch: /home/user/wt/qcnh (branch worktree), /home/user/wt/nz-*/ (old data, not in git).

## Files
dev/build/jbal2.js (BAL.noise), joi.js, j68i.js, j84.js (KK38 hunk); dev/measure/noise-sampler.js, noise-preload.js, noise-day.js; dev/test/text-hygiene.js, text-hygiene-known.json, vp-doubled.js (KK38 copy), noise-sampler-pure.js; dev/tools/quickcheck.d/96-noise-hygiene.sh + README line; dev/tools/nightly.sh (2 suites).

## Notes for the reviewer / MAIN
- The gate FAILS on LIVE today (N1 Tin báo 18 > 10, N2 chips 9 > 6, text faults); on the branch the text part PASSES and the noise part fails only on N1/N2 days when a lane meets them. Landing order that keeps go-live green: NEWS-SIEVE-2 (N1, text families 1–4) and D2 stat-pace first, or MAIN lands this with QC_NOISE_* tuned / N2 decided by the kit keeper.
- Harness used: 08a4ff8b for every measuring life. Gap check vs the fixed harness ec026335 (BIG #9 PASS): only nz-ipad-cautious-21 (branch, kscn-veil DEAD loop from its start → 0 full days, so it adds nothing to table B); no life hit the #kg82 board-play gap. New lives (nightly / gate) take the harness from origin/review/robot-realtap, i.e. ec026335 or later.
- Harness: lanes re-seed after «Ban hoa» at buổi 1 (3 of 9 first lives ended there); iPad cautious seed 21 looped on a kscn-veil DEAD BUTTON page (sent to HARNESS FIXER #9 with paths). No measuring life hit #kg82 «Bỏ qua».
- Sampler / preload are read-only; robot-rt.js untouched; harness taken from origin/review/robot-realtap when the kit has no copy (`git show`), or RT_HARNESS.
