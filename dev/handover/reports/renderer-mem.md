# F10 renderer-memory hunt — report + HANDOVER (worker session_01D3E3NXAMDj7kxKaa8Df6Qa, Foreman D ROOT 2)

PRIORITY #1 CHECK: OD 0 | ledger 0 | main 0 (no memory/texture budget code) | review/* none (*leak*/*memory* 0) | claims: HARNESS FIXER #5 «memory A/B» (harness side, F), robot-fix-cnv «newlife-leak» (JS per-life stores, landed) — not the renderer; reused: dev/test/lib/playperf STEP/NEWLIFE, dev/test/lib/device serveRoot/openHost, robot-rt.js (hooked, not forked), kitTn/tn_make.py found (face thumbnails, 420 files) for a later thumbnail tier.
depth 1 · START_CTX ~4 % · stopped at ~28 % (rollover rule START+25 %) — **WIP, NOT «SẴN SÀNG KIỂM»**.

Branch: `review/renderer-mem` @ **f9aff796** (off LIVE 5e013076). Tools on it:
- `dev/measure/renderer-mem.js` — fast in-page bot probe, per buổi: Chromium RSS by process type (/proc), DOM/JS heap, `<img>`/CSS bg/canvas/video counts + decoded MPx, JS-held pictures (WeakRef registry), layers, 1 s peak sampler; `--dumpEvery n` = Chromium memory-infra allocator dump (cc/image_memory, skia, tiles, partition_alloc/buffer…); end: picture catalogue (natural vs shown size) + forced `.decode()` sites.
- `dev/measure/renderer-mem-lib.js` — shared parts + **robot hook**: `RT_MEM=<rows.jsonl> [RT_DSF=2] node dev/test/robot-rt.js <url> <out> …` writes one memory row per buổi of the real-tap robot (allocator dump + catalogue every 10 buổi).
- `dev/measure/renderer-mem-book.js` — loads a robot ckpt save (slot button), opens «Tuần lục» (dawn()) n times, turns to the end, logs RSS peak + picture cache.
- Bisect site of any commit: copy root (assets.json audio cdn coop docs icons manifest rank) + `git show <sha>:index.html|sw.js|assets.json` into a dir, serve with D.serveRoot (pictures come from the CDN). Outside dev/ only index.html + sw.js differ across 6b85187e..5e013076.

## 1. Measured (Fold 755x1000, plain headless like the robot, this container quiet: ≤3 lives)

Real-tap robot, renderer RSS MB (peak = 1 s sampler):
| life | build | seed | peak | b10 | b30 | b50 | b75 | b100 | result |
|---|---|---|---|---|---|---|---|---|---|
| rt-old | 6b85187e | 5 | 1654 | 1177 | 1431 | 1474 | 1587 | 1430 | 110 buổi, ok |
| rt-live | 5e013076 | 5 | 1721 | 1282 | 1372 | 1564 | 1614 | 1673 | 110 buổi, ok |
| rt-old2 | 6b85187e | 6 | 1839 | 1440 | 1567 | 1205 | 1421 | 1392 | stopped b84 (by me) |
| rt-live2 | 5e013076 | 6 | 1896 | 1504 | 1788 | 1474 | — | — | **PAGE FROZE b65, renderer 2664 MB (tree 3451)** |
| rt-live3 | 5e013076 | 6 | 1833 | 1544 | 1823 | 1647 | — | — | stopped b65 (by me) |
| resume rt-live2 ckpt b61 | LIVE / fix | 6 | 1391 / 1427 | | | | | | b62–74, no freeze either (fresh page ~600 MB) |
Fast bot (dev/measure/renderer-mem.js, 30–40 buổi): same build swings 945–1918 MB peak between runs → the path decides, not the build.

**Bisect result: no single commit raised the plateau.** Old 6b85187e and LIVE sit in the same band (≈1.4–1.9 GB by b30–b60) under the same seeds; differences between seeds/runs (±400 MB) are larger than between builds. The 19 first-parent lands in the range are listed by `git log --first-parent 6b85187e..5e013076`; not bisected further because there is no build signal to bisect.

What the renderer is made of (memory-infra, LIVE robot, b10→b40): discardable **≈512 MB = Chromium's cap** (cc/image_memory 350–426 decoded pictures + skia/sk_resource_cache 66–206), cc/tile_memory 20–93, partition_alloc 120–320 (buffer partition: **path-dependent**, rises with some screens, old releases it later, LIVE seed 6 held ~320 from b30–b60), malloc 90–170, v8 ~75–90, blink_gc 50–90, parkable_strings 31 (= the 16 MB game source; the game frame's DOM also holds the 15.7 MB source text). JS heap flat (98–133), DOM 800–3200 nodes.

Controlled experiment (headless, 768x1024 pictures): a picture painted once keeps ~6.5 MB in the cc decode cache for the session even after the element is removed and GC'd; `.decode()` on a detached Image keeps ~3 MB; load-only (`new Image().src`) keeps ~0.4 MB. With GPU raster flags the same (headless stays software). Picture catalogue: ~330 distinct pictures / 106 MPx natural by b40 → the 512 MB cap is reached by ~b20 in every run; thumbnails would save ≤ ~25 % (most pictures are shown near natural size); forced decodes of never-shown pictures ≈ 7 MPx / 20 buổi (small).

**Weekly «Tuần lục» book (kit kitBook, j87) — a real spike source:** at open, `kitImgSync(book)` marks and `.decode()`s **every** `<img>` of **every** page (243–465 pictures in year-1 weeks: page backgrounds ×36, portrait chips, figures). Robot rows show +100…+314 MB at book-open buổi on both builds (rt-live3 b5 +314, rt-live2 b5 +260, b45 +228, rt-old2 b69 +222). The b65 freeze row was a 364-picture book followed by the night lightbox; the freeze itself (+1 GB after the last sample) was NOT reproduced (resume from ckpt starts a fresh page).

## 2. Fix on the branch (candidate, family = forced decode of pictures not on screen in the shared book kit)
- `jbook.js` new kit helper `kitImgMark(root)`: the same marks as kitImgSync (decoding="sync" + eager) **without** forcing a decode (a hidden page paints decoded when it shows, no empty frame).
- `j87.js` kitBook: at build, `kitImgMark(book)`; in `paint()` each sheet in view **+ one more each way** (what the next/previous turn reveals) gets `kitImgSync` once (`el.__kis`); late FIGURES.json reload loads bytes only. Turns keep their own `ready()` pre-decode. No visual change intended (no-flash rule owner 15:45Z kept through decoding="sync").
- Measured so far: book replay on rt-live2 save (105-picture week) LIVE vs fix identical (681→700 vs 696→705; whole book is decoded anyway once the reader turns to the end); robot resume b67 350-picture book +158 MB on fix. **Not proven to remove the crash.**

## 3. Crash cause — still OPEN
Asked T1d (session_01D3E3NXumQR7Z39e1j3Djxm) twice for the crash bug rows (robot-rt writes freeMB/totalMB of the box at «Page crashed») + parallel lives at that time; **no answer yet**. Hypothesis: on the 16 GB robot box at par 3 the kernel OOM killer kills the largest renderer when a ~+0.3–1 GB spike (week book open, night lightbox) lands while every page sits at ~1.7 GB; old 6b85187e has the same weight. If freeMB at crash ≈ 0 → environment (box) + game weight, not a regression.

## 4. HANDOVER — next worker (opus), in this order
1. Get T1d's crash rows (freeMB) → settle §3. If OOM: report «not a regression; box OOM + game weight» to Foreman D with this table.
2. Reproduce the 2.6 GB freeze deterministically: run the seed-6 LIVE life from the START (not resume) with `RT_MEM` + `--dumpEvery`-style dumps around b60–70 (hook dumps every 10 buổi; lower to every buổi between b60–70) and screenshot each step; what took +1 GB after b65 (book turn copies `kclPrep` clone every page? night lightbox `#kpzoom`? backdrop-filter?). `/home/user/wt/*` of this container is gone — rebuild sites per §0 tools.
3. Decide the whole-family fix from that evidence (candidates: week book decode window = this branch; page-curl copies `kclPrep`/`kitCurlFold` cloning heavy pages; thumbnail tier for portrait chips/frames via existing kitTn + dev/art/tn_make.py; numbers as BAL keys).
4. Gates alone: probe before/after table (peak + b100, crash count over ≥3 lives × 150 buổi LIVE vs fix), quickcheck (perf + old save), coop-e2e both seats, book/turn tests (dev/test/*book*, kit page-curl), before/after shots Fold 755x1000@2 + iPad 1180x820@2 of Tuần lục (look at them). Then «SẴN SÀNG KIỂM <sha>» here + SSK to Foreman D.

~X% for the owner line: F10 hunt ~45 % done (probe + composition + no-regression proof; crash cause + proven fix open).

## 5. UPDATE after rollover — T1d crash data (01:11Z; settles §3, changes §4)
- Crash = **memory-cgroup OOM kill**, not box OOM and not Chromium (dmesg «Memory cgroup out of memory: Killed process … (chrome-headless) oom_memcg=/process_api/…» ×6; box freeMB 10–12 GB at the crashes). Victims' **anon-rss 5.1–9.2 GB** (+0.5 GB shmem); once two lives died in the same second (the cgroup kills the biggest Chrome).
- **The harness rssTree under-reports the renderer ~5×** (off-1: harness 1728 MB vs ps 8.50 GB) → my «1.6–1.9 GB plateau» numbers measure normal lives only.
- It is **one life's state, not buổi count**: LIVE 5e013076, same box/harness: hot-1 b355 1857 MB, even-1 b170–213 1.9–2.05 GB, even-2/timid-2 ≤1.7 GB, but **off-1 grew to 8.4–8.5 GB while sitting in LÃNH CUNG (Trường Môn viện) b190→289, with the robot looping on one screen for 20+ min (b286 stuck)** → killed at b289. Normal lives plateau 1.8–2.0 GB.
- Month-end sequence (dawn → Tổng lược book → Bổng lộc/#kmrew → Lễ tấn phong/Kính sự phòng) is just before all the early (b63–90) kills; with 3 lives × ~2 GB + one outlier in the cgroup, a spike tips it over.
- Evidence in T1d container (session_01D3E3NXumQR7Z39e1j3Djxm): /home/user/wt/rsslog.txt (5-min ps curve), /home/user/wt/g4live/tp-off-1.ckpt.json (save in lãnh cung), /home/user/wt/g4live/shots-tp-off-1/ (loop-*.png, *-dump.json).
**NEW §4 order for the successor:** (1) get off-1's lãnh cung save + loop shots from T1d; replay with dev/measure/renderer-mem.js-style sampling but **read RSS from ps/proc of the renderer pid** (my lib procs() does /proc VmRSS — check it against ps) while the screen it looped on stays open / repeats; find what grows (anon = Blink/partition/malloc/tiles; memory-infra dump every minute). Suspects: lãnh cung scene loop (ambient animation / backdrop re-render), the looping dialog re-rendering pictures/copies each tap. (2) fix that family at its kit source; (3) the week-book decode window on this branch is secondary (spike only); keep or drop by evidence. (4) gates as in §4.4; harness: tell F that robot-rt rssTree misreads the renderer (use /proc VmRSS per --type=renderer).

## 6. Worker #2 (session_01D3E3NYBNmVTCZbnP6oz5pA, depth 1, START_CTX ~3 %) — status 26/11 02:55Z
PRIORITY #1 CHECK: OD 0 | main none | review/* review/renderer-mem (mine, bac25389) | claims D F10 row.
Measured by /proc VmRSS of the renderer (= ps), Fold 755x1000 @2:
- Normal play does NOT grow: clean real-tap robot in lãnh cung b1→b73 flat 1.15–1.56 GB (GC sawtooth); in-page bot b10→b90 flat ~1.05 GB; heap snapshots b20 vs b80 +1 MB; render() ×600 on an idle LIVE screen 1150→1254 MB, 777 MB after GC.
- The §1 «growth» was partly the probe: memory-infra dumps every 10 buổi add +200–400 MB (same seed A/B 1.05 vs 1.46 GB). Use RT_LIGHT.
- The kills are a MAIN-THREAD HANG: A4 speed-1/2 and R1 speed-4 logs say «page froze: no harness step for 10 min (page.evaluate hung)»; T1d timid-2 grew +280 MB/min with the robot silent. Last steps: A4 = fast «Trang sau/Trang trước» in the Tuần lục book then «Lui»; R1 = «Sang buổi» after «Nguy hiểm chung»; timid-2 = quest card. All lead into the next buổi.

### HANG WATCHDOG — hook steps (any seat, robot-rt.js on review/renderer-mem ≥ bac25389)
1. Copy (or check out) `dev/measure/renderer-mem-lib.js` and `dev/test/robot-rt.js` from origin/review/renderer-mem into the seat's worktree (robot-rt already calls the hook when RT_MEM is set).
2. Run the life with env: `RT_MEM=<out>/<life>.jsonl RT_LIGHT=1 RT_HANGKILL=3500 node dev/test/robot-rt.js <url> <out> … resume=1` (RT_LIGHT = nothing runs inside the page; RT_HANGKILL = MB above which the browser is closed after the stacks are taken, so the box is not OOM-killed).
3. Other runners (temper-hh-rt.js …): `const M=require('./renderer-mem-lib'); process.env.RT_MEM='<out>/<life>.jsonl'; process.env.RT_LIGHT='1'; await M.init(ctx); M.watch(page)` once the page exists.
4. Every 20 s the page must answer a no-op within 15 s; if not, V8 is paused 5× via CDP and the JS call stacks (function @line:col) + RSS go to `<out>/<life>.hang.json`. Upload it to CDN img/_review/renderer-mem/<seat>-<life>-hang.json and message the F10 worker with seat/life/buổi.
Repro tools: dev/measure/renderer-mem-bookhang.js (fast book taps + «Lui» each week, prints stacks if the page hangs), renderer-mem-render.js (idle re-paint), renderer-mem-heap.js + heap-retainers.js (growth by constructor, retainer chains).

## 7. ROOT CAUSE FOUND + FIXED (worker #2, 26/11 04:30Z) — HANDOVER (rolled at ~45 % ctx, START ~3 %, depth 1)
Branch `review/renderer-mem` @ **60db5f48** (off LIVE 5e013076; site rebuilt; NOT «SẴN SÀNG KIỂM» yet — gates below open).
**Cause (the «Page crashed» / PAGE FROZE / memcg OOM family):** an endless MutationObserver chain on the main thread, two members, both in shared kit parts:
1. **Scroll cue** (jksize `kitScrollCues`, «Kéo xuống»): a tall column (#mb.body) found ITS cue with `:scope > .kscue`; an inner short option list (< 260 px) puts its strip `.kscue.sib` right after itself = also a direct child of #mb → two keep-last cues moved past each other for ever. Caught live: watchdog stacks R1 replay b367 «Phụ tuyến · Tân quân lập uy» + RT_MOB record «#mb.body removed/added div.kscue.sib ×1000 in one task»; T1d tp-hot-2/off-3/hot-3 hang.json (CDN img/_review/renderer-mem/5e013076-tp-*-hang.json) same stack.
2. **Card normaliser** (j63 `kaMO` → kaNorm → kaNorm1 → kpOptArt/kitOptUnify): kaNorm's own edits woke kaMO again; a card whose rebuild never settles spins for ever (A2 nc_su greedy-1 b703 stack, page spinning ~1.5 GB).
**Fix (kit level, no look change):** own cue = `.kscue:not(.sib)`; cue observers ignore cue-only records and re-check via `kitScrollCuesSoon` (rAF, ≤ 1/frame); buttons/cards never cue columns; kaNorm1 / kaMO ignore cue nodes; `kaRun` takes back its own records (`kaMO.takeRecords()`) and re-runs only for really new cards (≤ `BAL.kobs.kaPass`); short/tall hysteresis `BAL.kobs.cueShort` 260 / `cueHyst` 24. KIT.md scroll-cue entry updated (observer rule). NB: `BAL.kobs` (NOT BAL.mem — BAL.mem is the memories table; 6e59c107..705c1e16 wrongly replaced it, fixed in 60db5f48; G1 caught it).
**Proofs done:** `node dev/test/kscue-loop.js --url <site>` cases card/edge/nested/kaloop: LIVE 5e013076 hangs on «nested» and «kaloop» (page never answers), fix PASS all 4 (60db5f48). Normal play does not grow (§6). Cue consistency scan `dev/test/scroll-cue-scan.js` LIVE vs fix (6e59c107): 96/96 dialog×device rows same (1 LIVE timing flake re-run = same). Look: `dev/test/kscue-shots.js` LIVE vs fix Fold 755x1000@2 + iPad 1180x820@2 (j7c, giftpick, evpick; same life) — same layout/cue (outfit/origin draw differs on both builds, not seeded); pairs + 4 videos on CDN img/_review/renderer-mem/f10-pair-*.webp, f10-video-{old,new}-{fold,ipad}.webm (from 6e59c107). quickcheck (6e59c107 + uncommitted j63): open/old-save/perf PASS (render 152/196, buổi 1019/1228 vs live), CORE GATES FAIL = G1 «BAL.mem set 2 times» (fixed in 60db5f48) + G4 button crawl «fold · Ô lưu … Lui · close button did not close its layer» (UNKNOWN: check on LIVE whether pre-existing).
**Successor (opus) — in order, one browser test at a time:**
1. Re-run `bash dev/tools/quickcheck.sh` ALONE on 60db5f48 (expect G1 PASS); if G4 «Ô lưu Lui» still fails, run the same crawl on LIVE 5e013076 (dev/tools/coregates.sh G4) → pre-existing = note it, else fix.
2. `node dev/test/kscue-loop.js` (LIVE fail / fix pass), `scroll-cue-scan.js` + `opt-frame-scroll-scan.js` + `option-modal`/kit-conform on 60db5f48 (kaRun touched card normalising: check option cards look the same — re-run kscue-shots.js LIVE vs 60db5f48 and LOOK at the pairs).
3. coop-e2e (both seats, PASS criterion) + book tests (dev/test/book-*.js, page-curl*.js; the predecessor's kitImgMark book-decode window and `window.__kbk` release on close are in this branch too).
4. `node dev/measure/mo-burst.js --url <fix> --buoi 30` vs LIVE (dev/measure, family scan: no observer > 5000/task; LIVE top chains 70–100 rounds/task = perf item, not fixed: @90801 kfs seal, @48488 result-card kick, @48736 pc kpwide, HTMLDocument.hook, @45929 k3CatTabs).
5. RSS/crash table: ≥ 3 robot lives each LIVE vs fix to b150 (`RT_MEM=<f>.jsonl RT_LIGHT=1 RT_HANGKILL=3500 node dev/test/robot-rt.js …`), ps renderer peak + b150 + hangs. Seats already run the watchdog: T1d G4 (review/temper-g4), A2, Seat A, A4, R1 — ask them to serve 60db5f48 for a fix arm.
6. Report «SẴN SÀNG KIỂM <sha>» here + SSK to Foreman D (session_01D3E3NX3vWTRXcmN8Wi8Yxw); D asked the worker to open ONE opus BIG reviewer as its child, then LAND READY to D.
Tools on the branch: dev/measure/renderer-mem-lib.js (watchdog `watch`, RT_LIGHT, RT_MOB ping-pong recorder, RT_COLD), renderer-mem-{heap,render,bookhang}.js, heap-retainers.js, mo-burst.js; dev/test/kscue-loop.js, kscue-shots.js. Local A/B site: serve a dir with LIVE index.html/sw.js/assets.json (+ links to audio cdn coop docs icons manifest rank dev) on one port and the worktree root on another.
~X%: F10 ~80 % done (cause + fix + deterministic proof; gates 1–6 open).

## 8. Worker #3 (session_01D3E3Nah1mvJDWaRpXxvx3R, depth 2, START_CTX ~3 %) — «SẴN SÀNG KIỂM 123a2a9c» (26/11 10:25Z)
PRIORITY #1 CHECK: OD 0 | main none | review/* review/renderer-mem (mine) | claims D row «F10 renderer-memory hunt».
Branch `review/renderer-mem` @ **123a2a9c** = fix + LIVE 3af7896e merged (FF from LIVE; merges of f009e1a6 / 6b5d3d05 / 3af7896e conflicted only in index.html/sw.js/assets.json/CHANGE.txt → rebuilt).
**The F10 family = the kit's DOM observers doing whole-page work on every mutation. Four members, all fixed at their kit source, behaviour only (no look change):**
1. jksize `kitScrollCues` cue ↔ cue observer ping-pong (`.kscue.sib`) — 60db5f48 (worker #2).
2. j63 `kaMO` waking itself on kaNorm's own edits — 60db5f48 (`kaRun` + `takeRecords`, ≤ `BAL.kobs.kaPass`).
3. j63 `kaMO` woke on EVERY added node (loading marks, memory marks, words) and re-ran `kaNorm(document)` → with a long save (Foreman E E-S1 iPad y13 b2239 «Biếu quà làm lành», 1351 option cards) 7 s a pass, page never idles (stack kitNoUnkDom < kaNorm). Fix `kaSort`: a NEW card → `kaNorm` over the place that holds it; a node added inside a normalised card → that card alone; anything else → nothing; `kaWants` sweep for cards made outside a record.
4. jk4 option fit: `kitOptEqual` re-tiered the whole dialog for EVERY card (n²) and the ResizeObserver queued one rAF per card (1351 callbacks) → once per synchronous pass (`KIT_OPT_EQ`) + one frame callback (`KIT_OPT_ROQ`). Same chain as R1 cnv_ban speed-3/4 (y16–17) and Seat A nc_gian scholar-1 b1510 (kitOptUnify < kpOptArt < kaNorm1).
Also: ONE CORE — the typed fallbacks `{cueShort:260,cueHyst:24}` / `||3` removed (BAL.kobs only). KIT.md: §6 frame «Observer rule» + option-fit line; scroll-cue entry (worker #2). Test-only probe `RT_PROF=1` in renderer-mem-lib (per-function calls/ms every 3 s + kaMO wake records → <RT_MEM>.prof.txt).

**Gates on the final sha (alone, this box):**
| gate | LIVE | fix 123a2a9c |
|---|---|---|
| quickcheck | — | open/old-save/perf PASS (render 220/202, tab 514/736, buổi 1290/1413 vs live); G1/G2/G3/time-spill PASS; G4 FAILs = dialog-fixed «kit-dialog-2 a empty Tốn/Được» + crawl «Ô lưu · Lui» — **identical FAIL on LIVE f009e1a6 and 6b5d3d05 (pre-existing, not F10)** |
| kscue-loop.js (card/edge/nested/kaloop) | f009e1a6 + 3af7896e: hangs on «nested» | PASS all 4 |
| scroll-cue-scan | ALL OK | ALL OK (rows same except random j7c/ge1 draws) |
| opt-frame-scroll-scan | 0 FAIL | 0 FAIL |
| kscue-shots Fold 755x1000@2 + iPad 1180x820@2 | | same layout + cue (looked at every pair; j7c content is a random draw on both) |
| coop-e2e both seats | | 143/143 (123a2a9c) |
| page-curl2 Fold/iPad, weekbook-entries | | PASS |
| book-relayout iPad «jumped» | FAIL (same) | FAIL — pre-existing on LIVE |
| q-softlock | PASS 2/2 | PASS 2/2 (one flaky iPad «person» dead-tap in a quickcheck run) |
| E-S1 b2239 replay (iPad, 1351 cards) | never idles, watchdog stacks every sample | 60db5f48 also hung → members 3+4; 123a2a9c settles ~40 s after open (one-time normalise of 1351 new cards), kitOpt* 1.5–4 s → ~50 ms a pass, plays b2241→b2262 |
Robot seats, LIVE vs fix (watchdog RT_LIGHT=1 RT_HANGKILL=3500):
| seat / lane | LIVE hangs | fix hangs | fix range | fix peak MB |
|---|---|---|---|---|
| T1d hot-2 | 2 (b270, b273) | 0 | b273→300 (008662ef) | 1678 |
| T1d off-3 | 1 (b63) | 0 | b51→150 (008662ef) | 2140 |
| T1d hot-3 | 1 (b64) | 0 | b46→150 (008662ef) | 2090 |
| T1d timid-3 | 1 (b65) | 0 | b46→150 (008662ef) | 1952 |
| A4 nc_vuong rebel-1 | 1 (b77) | 0 | b78→242 (307b3b77) | 2339 |
| Foreman E E-S1 | 2 (b2239, b2240) | 0 | 123a2a9c | 2641 |
| R2 cnv_chu speed-k2 b650 | 1 (first pass) | — | LIVE did not re-hang on resume → no gate |
| R1 cnv_ban speed-4 late game (y16, ckpt b2277, this box, 20 min each) | hang (hang.json), 5 buổi in 20 min | 0 | b2278→2342 (123a2a9c) | 2428 |
More LIVE hangs of the same stacks today: R3 cnv_ma b1254, Seat A scholar-1 b1510, R1 cnv_ban speed-3/4, T1d hot-1 b305 on 6b5d3d05.
Evidence on CDN img/_review/renderer-mem/: f10c-pair-{fold,ipad}-{j7c,evpick,giftpick}-*.webp, f10c-video-{old,new}-{fold,ipad}.webm (LIVE vs fix), f10c-E-S1-b2240-LIVE-hang.json, f10c-E-S1-b2240-60db5f48-hang.json, f10c-E-S1-{60db5f48,fix3}-prof.txt; seat files *-hang.json.
Pre-existing faults seen (not F10, for the owners of those gates): G4 dialog-fixed kit-dialog-2 a; crawl «Ô lưu · Lui»; book-relayout iPad jump; quickcheck old-save step fails LIVE-vs-LIVE with f009e1a6 as the old build (harness); robot new lives stuck under the selection veil (div.kscn-veil) on LIVE ≥ f009e1a6 (Foreman F); lib buổi probe reads 0 on LIVE builds (T1d note).
Perf item left (not a hang): kpOptArt/kitOptUnify ~5 ms per card → a 1351-card list costs ~7 s once when it opens.
Gate chain on 123a2a9c finished 11:35Z (all rows above are from 123a2a9c unless a sha is named). More LIVE hangs of the same stacks reported after SSK: A3 nc_tuc speed-2 b65, Seat A scholar-1 b1559 + speed-1 b1116 (kitOptEqual < kitOptFitAll = member 4), T1d 6b5d3d05 even-1/timid-1 b305 + off-2 b65.
«SẴN SÀNG KIỂM 123a2a9c» — ONE opus BIG reviewer opened as my child: session_01D3E3NZbhXYHfto1CRNMJSa (see §9 when it reports).
~X%: F10 ~92 % done (four members fixed + proofs; review + land open).

## 9. Worker #3 HANDOVER (26/11 12:40Z) — rolled at ~41 % ctx (START ~3 %, depth 2)
Review: BIG reviewer session_01D3E3NZbhXYHfto1CRNMJSa **PASS on 123a2a9c** + **delta PASS on 82bbe53e** (dev/handover/reviews/renderer-mem-review.md §1 + §2).
Branch `review/renderer-mem` @ **2b5bbbb3** = 82bbe53e (game build) + a test-header doc nit. 82bbe53e = 123a2a9c + merge LIVE **1dcb373e**: coop-freeze-kmrew had landed a parallel fix of member 1 (kscSoon/KSC_RAF); merged as ONE rule (F10 kitScrollCues kept, their kscSoon removed, their comment + dev/test/scroll-cue-loop.js kept). On 82bbe53e: scroll-cue-loop.js Fold+iPad PASS, kscue-loop PASS all 4; **LIVE 1dcb373e still HANGS on kscue-loop «kaloop»** (member 2) → F10 still needed.
Running in MY container when I rolled (results go to D by message if I am still alive; otherwise re-run): quickcheck → scroll-cue/opt-frame scans LIVE vs fix → kscue-shots → coop-e2e on 82bbe53e (`/home/user/wt/scripts/gates2.sh`).
**Successor (opus) — in order, browser tests ONE at a time:**
1. Check origin/main is still 1dcb373e (else merge LIVE, rebuild, keep ONE scroll-cue rule, ask reviewer session_01D3E3NZbhXYHfto1CRNMJSa for a delta verdict).
2. On the final sha: `bash dev/tools/quickcheck.sh` (expected FAILs = only the 2 pre-existing G4 rows: dialog-fixed «kit-dialog-2 a», crawl «Ô lưu · Lui» — both FAIL identically on LIVE), `node dev/test/coop-e2e.js <out>` (143/143), `node dev/test/kscue-shots.js <LIVE index.html> <fix index.html> <out>` → LOOK at the pairs, upload the 4 videos to CDN img/_review/renderer-mem/ (`python3 dev/site/cdn_sync.py img/_review/renderer-mem`, then delete the local folder).
3. D's extra proof (msg 12:34Z): a LONG solo run ≥ 600 buổi on Fold, renderer MB per 100 buổi, LIVE 1dcb373e vs fix — growth must be flat-ish on the fix. New lives cannot pass the selection veil on builds ≥ f009e1a6 (harness, Foreman F), so RESUME from R2's ckpt: handover branch dev/handover/robot/rerun-cnv-cnv_chu/HANG-speed-k2-b653.ckpt.json → `RT_MEM=<o>/<life>.jsonl RT_LIGHT=1 RT_HANGKILL=3500 node dev/test/robot-rt.js http://127.0.0.1:<port>/ <o> dev=fold origin=cnv road=cnv_chu bot=bold seed=2242959839 life=R2-cnv_chu-speed-k2-2242959839 resume=1` (serve each worktree root with `python3 -m http.server <port> --bind 127.0.0.1`). Field data for comparison: R2 LIVE grew b654 723 MB → b1000 2695 → b1800 3120 (mem-speed-k2.jsonl). Put the table in this report.
4. Then «LAND READY review/renderer-mem <sha> (FF from LIVE 1dcb373e)» + video URLs here and to Foreman D **session_01D3E3NaM9SCxxy6LNzERgRj** (PLAY-STOPPER).
Probe tools: RT_PROF=1 (renderer-mem-lib: per-function calls/ms + kaMO wake records → <RT_MEM>.prof.txt), RT_MOB, watchdog. Local sites: worktree root served on a port; LIVE in a sparse detached worktree.
~X%: F10 ~95 % done (4 members fixed, BIG PASS + delta PASS; final-sha gates + long-run proof + land open).
