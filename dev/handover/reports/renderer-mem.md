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
