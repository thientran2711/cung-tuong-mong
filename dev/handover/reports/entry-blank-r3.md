# entry-blank-r3 — report (worker session_01Rc5AsJn6SQf4eq1uMdP1U5, for MAIN ROOT-53)

PRIORITY #1 CHECK ('life-preload|entry-blank'): OD 4 (18/11 ~01:35Z, ~01:50Z, ~02:06Z, 18:25Z owner bug) | main jload.js lifeGate / §59.1 jph / j59 / sw.tpl.js prune (live d3ea24e8) | review/* life-preload-fu-r2(v) (landed), no entry-blank branch before | claims: this job only. Reused: lifeGate, §59.1, kitFigBody, KLOAD core screen, life-preload.js / warm-continue.js. No new loader, no new look.
depth n/a (worker) · START_CTX ≈ 4 %.

Branch **review/entry-blank-r3 @ faf2b893** (= fix e5177308 + f5273975 + test commit, merged with origin/main 94d11623; only index.html / sw.js conflicted → rebuilt).

## ROOT CAUSE (why the gate let her in, why no line, why everything was blank for a minute)
The owner's phone holds a big picture cache: `ctm-assets` keeps every picture ever shown (lazy) plus the old keys of every build. Two pieces of code walked that WHOLE cache with `cache.keys()`:
1. **sw.js prune** — on every activation AND on the first picture fetch of every worker start (Android stops idle workers: so every time she opens the game) AND again on every fetch after a failure. The walk is one long serialized cache read that every picture of the first screen waits behind (core icons too). Past ~18 000 keys Chrome refuses it outright: `AbortError: Failed to execute 'keys' on 'Cache': Operation too large` (measured: 16 000–18 000 keys OK, 18 500+ refused) → prune failed → `pruned=false` → re-ran on EVERY picture request → the first screen paints nothing for a long time, and old keys are never pruned, so the cache only grows (stays over the limit for good).
2. **jload.js plan()** — `HAVE=new Set((await c.keys())…)` threw the same error → the loader died in phase `check`: the core set was never verified or re-fetched (core pictures whose key changed in today's builds — e.g. 43 por-consort + 58 hd changed between a8a10c66 and main — stayed missing), the fig background never ran.
3. **lifeGate** treated every core picture as "already on the device" (`lCore` → true, and true when the manifest was not read yet). So with the loader dead, her first screen's core pictures (frames, portrait chip ground, rank / weather / mood icons, silhouettes) were never a reason to cover: gate = `cached:true`, the game opened on empty boxes. Small slots (< 72 px: side cards, chips, icons) carry no «Đang thỉnh tranh…» line by KIT §59.1 design → empty boxes with no line, exactly her shot. The room stage additionally hid its people while the §59.1 silhouette's body box was being measured (j59 `j59wait`, 2–3.5 s on every Tiếp tục, also on main without a big cache).
Not the cause (checked): ag-all-2 / npc-chain / shop-panel code (no page errors, render complete; with a small cache main shows the screen fine), SW key map, title prefetch.

## FIX (whole group = every first-screen picture through the one loader + the one worker + the one gate)
- **sw.tpl.js**: no whole-cache walk ever. On activation the worker diffs the OLD shell's assets.json against the new one and writes the replaced keys to the new shell (`ctm-prune.json`); prune deletes exactly those keys, once, 15 s later (a stopped worker finishes it on its next start); never retried per fetch.
- **jload.js plan()/refresh()**: `cacheHave()` asks the cache for exactly the core + fig keys (1 400 small lookups, 16 at a time) instead of `keys()`; `moveCdn` (legacy whole-cache walk) runs once per device.
- **jload.js lCore()**: a core picture counts as "here" only when the core check finished (`done`/`all`) or it was seen in the cache (HAVE); before that / after "Vào cung ngay" / with no manifest the gate loads it like any other picture (a cached one answers within a frame, the cover fades in only after .45 s, so nothing shows when all is cached).
- **Stage people**: figure body boxes measured as soon as the gate/prefetch has a figure (kitFigBody), and the two kit silhouettes' body boxes known at boot (`KIT_SILBB`, checked live by the test) → the room never hides its people for the silhouette measure.
No look change, no new kit part, no wording change.

## Test that fails today and passes after: `dev/test/entry-blank.js`
`node dev/test/entry-blank.js <out> fold,ipadAir big,cont,cold <mbps>` (SW ON; picture line throttled by a context route that also reaches the worker's fetches; `PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS=1`; `OLD=<root of the previous build>` plays + saves the life on that build first, then the site switches = new build).
Paths: **big** = 20 000 keys in the cache + the core pictures of the first screen removed + a new build + saved life from the title; **cont** = save made on live main, reopened on the new build; **cold** = non-core pictures wiped (evicted cache). Samples every 250 ms after the entry: bad = uncovered sample with a blank / empty §59.1 box / hidden or empty stage; KLOAD must leave `check`.

| path · device · line | before (main d3ea24e8) bad samples | after (branch) bad samples |
|---|---|---|
| big · Fold · 1.5 Mbps | 5 (empty boxes: frames, portrait, icons) + loader dead in `check` (Operation too large), gate `cached` | 0 (loader re-fetches the missing core behind the core screen, then 0); runs: 0, 0, 1 |
| big · iPad · 1.5 | 0 visible, loader dead in `check` | 0 / 1 (one 250 ms stage sample) |
| big · Fold · 5 | 2 empty boxes, loader dead | 0 |
| big · iPad · 5 | 0, loader dead | 0 |
| cont · Fold · 1.5 | 9–13 (room people hidden ~2–3 s) | 0 / 1 (one late 1-px blank sample, screen complete) |
| cont · iPad · 1.5 | 11–13 | 0 / 1 |
| cont · Fold · 5 | 11 | 1 |
| cont · iPad · 5 | 4 | 1 |
| cold · Fold/iPad · 5 | 0 / 1 (gate cap 25 s) | 2 / 2 (gate cap 25 s, then §59.1) |
| cold · Fold/iPad · 1.5 | gate covers 25 s cap | gate covers 25 s cap, then 37–38 pictures still late → §59.1 boxes (see OPEN) |

## Other tests (on faf2b893 unless noted)
- quickcheck **PASS** (open 1388 ms, old save ok, render 166/185, tab 381/327, buổi 947/857, tasks>200 ms 15/12, core gates PASS).
- life-preload.js 1.5 Mbps: Fold 0 blank / 0 nobox (whole walk), iPad 0 blank / 0 nobox (the roll was a cung-nữ life: walk stops at "Hậu cung", tab does not exist for her — harness, not a bug). CONT=1 Fold 5 Mbps: 0 blank, gate 1.3 s. warm-continue Fold: first screen 2.9 s (machine loaded by parallel runs), 0 blank.
- No page errors in any run.

## Shots (CDN upload refused: proxy 403 to the R2 API → per common brief, on the handover branch instead)
dev/handover/shots/entry-blank/ — before-fold-bigcache-newbuild.webp (her shot: portrait, side cards, weather/mood icons blank, room without people), before-ipad-oldsave-newbuild.webp (room without people), after-fold-bigcache-newbuild.webp, after-ipad-bigcache-newbuild.webp (all drawn). Looked at all four. Delete the folder with the verdict.

## OPEN / for MAIN
1. Her exact minute-long stall is a phone-speed effect of (1); on this box the cache walk is ~0.1 s per run, so the repro proves the failure mode (Operation too large, loader dead, gate open on missing core) rather than the minute. Her existing cache keeps its old stale keys (no whole-cache cleanup is safe without the walk); they are harmless now that nothing enumerates the cache.
2. Evicted cache on a 1.5 Mbps line: a life needs ~8 MB, the gate opens at its 25 s cap, so small slots show §59.1 boxes (no line by KIT §59.1 < 72 px) until they arrive. Raising the cap or a line on small slots is a rule/kit decision → MAIN / kit keeper; not changed here.
3. swreg resumeSolo still looks for `[data-tgo="cont"]` first (gone); its `#slots [data-load]` fallback works. The in-play auto-reopen after a new build was not driven end-to-end in host mode (the test's new build path = reload + title + sổ).

HANDOVER: not needed (done in one session).

## R2 (worker, answer to review FAIL item 6) — review/entry-blank-r3 @ 6e9277d8 (= ff98fe7e + fix c9009dba + merge main e16e1d66; only index.html / sw.js conflicted → rebuilt)
Whole group = every picture slot of the first screen through the one kit part (§59.1), the one gate (jload) and the one worker (sw.js). No new kit part: the stand-in is the EXISTING kit stranger portrait `img/kit/unknown-f|m.webp` (the one the Hoàng hậu card shows), so no KIT REQUEST.
1. **§59.1 (jph.js, KIT.md §59.1 + kit sample)**: a portrait on its way (`por-*`, any size: top-bar chip, side cards, rows, dialogs) waits as the kit portrait silhouette over the paper (`data-kwait="pf|pm"`, still `pfs|pms`; `kitPhPorG`: men / boys = m). The «Đang thỉnh tranh…» line on a slot whose box already draws its own `::after` (act-card art frames: corners / pins — the line was set but never painted) now goes on one small child `.kwaitl` (same look), so the frame keeps its decoration. A slot that was not laid out when marked is looked at again (≤ 20 × 0.5 s) instead of never getting its line.
2. **Gate order (jload.js)**: the life set goes through a small queue (8 at a time under the cover); after the 25 s cap / «Vào cung ngay», while any picture ON SCREEN (img or CSS, incl. the room scene) is still out, only 1 off-screen picture at a time and the on-screen ones go to the head (`lFront`, `lAfter`, ≤ 90 s).
3. **One download per picture (sw.js)**: the gate's request and the `<img>`'s request for the same picture used to both go to the network; the second now waits for the first and is answered from the cache.
4. **CDN data files (sw.js)**: img/*.json (FIGURES*, *-fit, POR_FACE2… ~10 MB, precached in the shell) were network first on every open; now the shell copy answers at once and the network refreshes it 20 s later. (The CDN does answer 304 when the browser's HTTP cache still has a copy; this removes the dependence on that cache.) Same-origin JSON unchanged.
5. **Child age bands (j73 kidPreAll)**: the other age bands of a child (~16 portraits) wait while the life set is busy.
Test `dev/test/entry-blank.js`: emptyBox now = a waiting picture shown as bare paper with no kit silhouette and no line (silhouettes / paper + line are the allowed placeholders).

| path · 1.5 Mbps | main e16e1d66 (before) | 6e9277d8 (after) |
|---|---|---|
| cold · Fold | 62/62 samples with an empty frame (portrait chip, side cards) | 0/62 (×3 runs: 0, 0, 0) |
| cold · iPad | 63/63 | 0/64 (×3 runs: 0, 0, 0; one earlier run 1 stage sample) |
| big · Fold / iPad | (r1 table) | 0/60 · 0/57 |
| cont · Fold / iPad | (r1 table) | 0/57 · 1/57 (one 250 ms stage sample) |
life-preload.js 1.5 Mbps: Fold 0 blank / 0 nobox, iPad 0 / 0 (whole walk to Hành sự). quickcheck **PASS** on the merge (open 1437 ms, old save ok, render 200/169, tab 339/371, buổi 984/813, tasks>200 19/16, core gates PASS).
Shots (handover branch, CDN still refused): shots/entry-blank/r2-fold-cold-1.5mbps-44s-standins.webp, r2-ipad-cold-1.5mbps-26s-standins.webp — portraits = kit silhouette, people = §59.1 figure silhouette, act art = paper + «Đang thỉnh tranh…». LOOKED.
Still true (honest): on an evicted cache at 1.5 Mbps the pictures themselves still need ~40–60 s to arrive (the test line is FIFO, a pessimistic model); the room scene waits as the stage's own striped ground (a CSS background, no §59.1 slot) until its picture lands.
