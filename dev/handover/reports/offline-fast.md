# OFFLINE-FAST — owner bug 24/11 ~18:00Z (Fold): 10–15 s dead after opening, zeros in «Tải hết» panel, «Bắt đầu tải» does nothing
PRIORITY #1 CHECK: OD 1 (23/11 ~23:35Z) | ledger 0 | claims 5 (W5 offline-all) | main jload.js/sw.js (offline-all LIVE) | review/* 0 | archive 0. Reused W5 offline-all code + its test root/server (dev/test/offline-all.js).
Branch: review/offline-fast @ edbce2d1 (from origin/main 502c48c9; index.html/sw.js rebuilt). SMALL tier (jload.js + kboot.js one filter + measure script; no save/core data).

## Root cause (proven, dev/measure/offline-fast.js: real-size manifest 32 443 files, ~10 764 cached, CPU 4×, built site + SW)
1. allPlan() asked the cache about every one of 32 443 files (12 at a time) before giving any number → panel «0 món / 0 / 0» for 6–11 s (desktop Chromium 4×; a phone's disk is slower).
2. A tap on «Bắt đầu tải» during that plan was DROPPED: oaStart → allPlan() returned false at once (already planning) → allList empty → runAll never called. Measured: no download within 120 s of the tap in all 8 baseline runs.
3. The boot core/fig check (plan() → cacheHave) looked up ~1 450 files at EVERY start; cache reads of the SW (= the music) queued behind cache work.
Remaining, NOT from offline code (same before/after, also with 0 lookups): a ~5 s cache stall during boot before the title appears at 4× with a half-full cache (direct caches.open().match from the page also waits). Not the index.html shell put (tested by removing it), not jload lookups. Flag for MAIN: possible follow-up worker (boot/SW).

## Fix (whole group: every «Tải hết»/boot cache scan)
- KNOWN LIST: files known here (have) and known missing (need) are remembered in cache 'ctm-offmeta' › have.json {v,have,need} (path?hash). Plan = manifest − list: no lookups, numbers at once. Saved idle-time 20 s after changes, on hide/pagehide, at end/pause; filtered to the manifest once per build at load (cheap saves).
- Unknown files are counted in the background, 2 lookups at a time, a breath every 32, never under a loading/life cover, from the END of the list while the download runs from the FRONT; numbers fill in; panel/row say «đang đếm…» / «Đang đếm tranh đã cất trong máy…» (kit rows, no %).
- allPlan shares one in-flight call (no dropped tap); «Bắt đầu tải» starts at once; while the life set/title prefetch is busy 1 file at a time (game pictures keep the line), else 3.
- Panel opens before storage.estimate (free room shows «đang xem…» then fills).
- Boot plan() looks up only core/fig files not on the known list.
- kboot.js stale-shell wipe keeps ctm-offmeta.

## Timings (CPU 4×; ms unless s) — before = origin/main 502c48c9, after = edbce2d1
| device | scenario | first numbers in panel (before → after) | count done | 1st download after «Bắt đầu tải» | SW wait from Thiết lập on | main-thread worst from Thiết lập on |
|---|---|---|---|---|---|---|
| Fold 755x1000 | half-filled (10.8k cached) | 10 776 → 209 | 10 779 → 37 040 (bg) | never (120 s) → 129 | 444 → 231 | 209 → 278 |
| Fold | 2nd open after build | 7 242 → 212 | → 33 506 (bg) | never → 109 | 458 → 299 | 250 → 265 |
| Fold | known list complete (3rd open) | — → 142 | → 298 | → 195 | → 278 | → 314 |
| Fold | cold (core only) | 9 502 → 150 | → 57 987 (bg) | never → 117 | 62 → 317 | 201 → 211 |
| Fold | resume (on:1 after reload) | 9 507 → 227 | → 35 028 (bg) | never → 136 | 250 → 242 | 187 → 242 |
| iPad 1180x820 | half-filled | 9 755 → 192 | → 33 996 (bg) | never → 128 | 331 → 210 | 197 → 257 |
| iPad | 2nd open | 6 088 → 184 | → 32 356 (bg) | never → 117 | 272 → 252 | 186 → 213 |
| iPad | known list complete | — → 135 | → 301 | → 193 | → 223 | → 314 |
| iPad | cold | 8 816 → 160 | → 58 908 (bg) | never → 107 | 48 → 100 | 202 → 291 |
| iPad | resume | 10 997 → 262 | → 39 589 (bg) | never → 126 | 238 → 309 | 222 → 268 |
Gate in the script (SW at tap <800, SW after <1000, stall after <700, numbers <2 s, download <1.5 s): before 0/8 PASS, after 10/10 PASS. Background count is one-time per device (after it the «known» rows apply).

## Tests
- dev/test/offline-all.js ALL PASS 34/34 (built site).
- kit-progress-run PASS 36/36. oldsave-r1 16/16 (old = origin/main build).
- quickcheck (3 runs): core gates PASS, open/old save ok. Run 1–2 flagged buổi (new 3.0–5.6 s vs live 1.2–3.5 s) → cause: known-list save built a 32k set on the main thread; fixed (idle-time, no set). Run 3: buổi 1 481/1 583 ms (equal), render/tab equal; FAIL only on longTaskMaxMs 3 953 vs limit 3 915 (+38 ms; this metric swung 2 340–4 090 ms across live/new runs = noise on the shared box). MAIN/LC12: re-run quickcheck on land.
- Shots looked at (scratch only): Fold row «Đang đếm tranh đã cất trong máy…», Fold panel running, iPad panel counting — kit rows/buttons, no overflow, no %.

## Limits
- Not run on a real Fold; on a phone the old 32k plan is likely much slower than desktop 4× (her 10–15 s), the new path does no lookups before numbers.
- A file in the known list is trusted (not re-checked); it can only vanish by whole-origin eviction (list goes too).
- Boot ~5 s cache stall before the title (above) remains — separate issue.
## Handover: none pending (push + report done).
LAND READY review/offline-fast edbce2d1 (r1; superseded by R2 below)
~100% xong / ~90% chơi được

## R2 — the "~5 s cache stall before the title" (MAIN 127 order 24/11 ~20:09Z) — review/offline-fast @ 053503ec
PRIORITY #1 CHECK: same as above; sw.tpl.js fetch fallbacks + jload assets.json fallbacks (no other branch touches them; sfx-instant touches j11/jsfx only).
**Finding:** the 5 s stall was an ARTEFACT of my synthetic test manifest (paths img/t/…): the game's real boot pictures (img/title-key.webp, maps…) were then "not in assets.json", and sw.js answered such files with `caches.match(q,{ignoreSearch:true})` over EVERY cache — ignoreSearch cannot use the key index, so it walks all ~11 000 'ctm-assets' entries (~5 s at 4×) and every other cache read (the music too) waits. With the REAL manifest (OF_REAL=1) main has NO such stall (worst SW wait in boot 0.62–0.72 s, Fold + iPad).
**Still fixed (whole group of ignoreSearch walks):** (a) sw.js: a file not in assets.json → shell lookup, then network; the full walk only when the network fails; (b) offline data copies (assets.json + JSON data, sw.js anyCopy / jload shellCopy) look in the small ctm-shell-* caches first, the whole-storage walk only if no shell has it. Any future file missing from the manifest (CDN ahead of the build) can no longer freeze boot.

| 4× CPU | scenario | title s (before → after) | worst SW wait in boot ms | numbers ms | 1st download after tap ms |
|---|---|---|---|---|---|
| Fold | synthetic half (not-listed files) | 23.5 → 19.7 | ~5 000 → 671 | 10 776 → 147 | never → 104 |
| iPad | synthetic half | 23.9 → 19.1 | 5 319 → 622 | 9 287 → 205 | never → 119 |
| Fold | REAL manifest half | 19.1 → 19.8 | 723 → 688 | 8 344 → 210 | never → 117 |
| iPad | REAL manifest half | 19.0 → 18.4 | 661 → 615 | 9 323 → 142 | never → 115 |
| Fold | REAL, offline boot | 7.8 → 7.5–8.8 (3 runs) | 650 → 871–2 935 (early-boot noise, 3 runs) | 7 094 → 158–206 | — |
| iPad | REAL, offline boot | 8.1 → 7.8 | 2 878 → 2 695 | 10 219 → 188 | — |
Offline boot early-boot SW waits (2–3 s, before jload runs) are the same on main — not from this branch.
**Gates on 053503ec:** quickcheck PASS (render 241/297, tab 536/533, buổi 1 526/1 623 ms, tasks>200 26/26, core gates PASS, old save ok); offline-all ALL PASS 34; kit-progress-run 36/36; lazy-offline --offline Fold: 20 pictures fail offline — IDENTICAL list on main 502c48c9 (face-man-1..8, face-consort-41..45, face-maid-31..33, face-mama-7/8, nvp-ha-sang, tu-ninh-cung-ngu-ha-sang: 404/never fetched online = pre-existing CDN gap, flag for MAIN). sfx.js / result-sfx not re-run here: this branch does not touch j11/jsfx; the lander merged it on sfx-instant.
**Shots (looked at):** CDN img/_review/offline-fast/fold-panel-1s-after-tap.png + ipadAir-panel-1s-after-tap.png — panel 0.9 s after «Bắt đầu tải»: running (Tạm ngưng), «đang đếm…», Cất sẵn 1.223 / 1.181 of 32.443 (~300 files already in). Panel opened in 59/66 ms.
LAND READY review/offline-fast 053503ec (r2; superseded by R3 below)
~100% xong / ~90% chơi được

## R3 — the 20 pictures that failed OFFLINE (MAIN 127 order 24/11 ~21:18Z) — review/offline-fast @ 74204649
PRIORITY #1 CHECK: handover CLAIMS L1073 places-wire-nvp-tn (DONE LIVE 418bf356, probe+fallback by design), FOREMAN_C_STATUS L1786/L1806 + reports/PLACES3.md L54 (nvp / Từ Ninh bedroom art not swapped, FOR MAIN decision) — art NOT touched here; CDN img/_index.json checked.
**Root cause, by group (lazy-offline --offline, Fold, list identical on main 502c48c9):**
| group | files | why | fix |
|---|---|---|---|
| A: faces in assets.json but 'lazy' | face-consort-41..45, face-maid-31..33, face-mama-7/8 (+ 32 prince/princess faces) | drawn after first-hour.txt was recorded → fell to 'lazy' (only cached when shown); j17 probes EVERY pool face at each start, so offline (without «Tải hết» finished) they are dropped / blank | assets.py ALWAYS += img/face- (42 files, 0.38 MB more in core) |
| B: never drawn | face-man-1..8 | j22 FPOOL.man named a pool that never existed on the CDN: 8 × 404 per start | FPOOL.man=[] (men use manold/off pools, bandKeys) |
| C: art pending (designed fallback) | nvp-ha-sang, tu-ninh-cung-ngu-ha-sang | j94 scnLive probed a file that is only in img/_review (Foreman C / MAIN decision PLACES3 L54); fallback picture shows | probes ask only for files the offline set lists: new window.kitAssetHas(path) (jload, from assets.json); same guard for title plates (jtitle kdhArt: title-plate-1 404) and mood stills (jevb / jph kitPhOnCdn before the CDN index is read: emo-hon 404) |
No upload needed (nothing missing on the CDN that the game should show). When Foreman C puts nvp-ha-sang / tu-ninh-cung-ngu-ha-sang live, the next build lists them and the probe switches them on by itself.
**New check:** dev/test/ref-offline.js — static literal img paths + every FPOOL face (core too) + every SCN_HAVE/SCIMG scene + AIMG icon ⊆ assets.json, no img 404 in a session: ALL PASS. lazy-offline gained --ios-app (iPad as Home-Screen app; in Safari mode the «chọn nơi chơi» notice waits for a tap = test timeout).
**Gates on 74204649:** lazy-offline --offline Fold 1138/1138 offline OK, 0 online fails, exit 0; iPad (--ios-app) 1147/1147, 0 fails, exit 0 (main: 20 fails). ref-offline ALL PASS. offline-all 34/34. kit-progress-run 36/36. quickcheck PASS (render 302/247, tab 530/531, buổi 1 466/1 492 ms, tasks>200 20/25, core gates PASS, old save ok).
LAND READY review/offline-fast 74204649
~100% xong / ~92% chơi được
