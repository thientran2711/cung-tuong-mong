# life-preload — report (worker for MAIN s40 → s41)

PRIORITY #1 CHECK: OD 4 (L714 on-demand art, L1194 #kload preload follow-up, 18/11 ~01:50Z, ~02:06Z, ~01:35Z) | main dev/build/jload.js (core group + fig background + kitStatusIcon), jcdn.js, jph.js §59, j39 PORK | review/* none | claims lag-play-2 (Pixi preload, old, unrelated). Reused: jload loader screen (§35, same panel / kitProgress / CTM_WAIT), §59 placeholder module, j39 PORK, assets.py groups. No second loader.

Branch `review/life-preload` @ 4ff10ae (from origin/main eb3675a).

## What
1. **Life gate (KIT §35.3, jload.js).** `kitLifeSet()` = her portrait + figure, Emperor, Thái hậu, maid, court physician / eunuch, servants, people in her place, consorts whose figure is already chosen, room scene, first 3 queued dialogs. Plus every unfinished `<img>` and every CSS background of the visible screen. When a life starts or changes (new S in render(): new life, Tiếp tục, Luân hồi, load, co-op join; or start()), the §35 loading screen (`#klife`, same kit panel, `kitProgress` in pictures, CTM_WAIT words, no % / MB) covers the game until all are loaded + decoded, then one more render + check; arrived portraits are set in PORK so chips open on the real portrait. Slow line: "Vào cung ngay" after 6 s, opens anyway after 25 s. z above the Luân hồi wheel.
2. **Title prefetch (owner 02:06Z).** As soon as the figure manifest is in and no life is open: life sets of ALL saved lives, newest first, 4 at a time, before the generic fig set. A life whose set is here never shows the gate (KLOAD.lifes `cached:true`).
3. **During play:** life set re-checked after renders (≤ every 2.5 s), new pictures fetched first; background fig pool waits while the gate / life set is busy.
4. **KIT §59.1 loading state (jph.js, kit-keeper delegate of MAIN s41).** Any `<img>` not arrived: soft parchment ground that breathes (opacity only; still under reduced motion) + "Đang thỉnh tranh…" (CTM_WAIT.picWait) when the slot is ≥ 72 px; full-body figures wait as the kit unknown silhouette (unknown-fig-f/m), no paper box. One MutationObserver + one load/error listener, whole game. Kit sample §59.1.
5. **Dialogs** wait invisible (opacity 0, no taps) ≤ 3 s for their picture (then §59.1).
6. **Core set (assets.py):** every small kit UI picture (img/kit/ minus mini-game / night-end / podium / card-flip scenes) is now core: +150 files, +5 MB (core 43.9 → 48.9 MB). Owner's letters "L"/"M" = img/kit/unknown-ico-n.webp was lazy; ico-cal / ico-goal / mo-chest / emo-* too.
7. **404 fix:** j17 FPOOL probe asked img/@W<n>.webp (33× 404): "@W<n>" is the inline AVATARS face → FAV set from AVATARS, no request. Still 8× 404 img/face-man-1..8.webp (same probe, files really missing on the CDN; pre-existing, harmless fallback) — not touched.

## Scan table (whole group: every picture slot on the screens of a new life; Fold 755x1000@2.625 / iPad 1180x820@2, 5 Mbps after the core set)
Test `dev/test/life-preload.js` samples every visible `<img>` (≥ 24 px, not covered) every 250 ms through: Luân hồi wheel → shuffle → identity card → room + first dialog → Hậu cung → Giao tình → Dư đồ → Tư trang → Hành sự. blank = unfinished picture with nothing in its place; wait = unfinished picture showing §59.1.

| slot family (all screens above) | before (main eb3675a, 5 Mbps) | after (4ff10ae, 5 Mbps) |
|---|---|---|
| Luân hồi wheel cards (9 origin pictures) | 9 empty paper boxes until loaded | in before the wheel shows (gate) |
| identity card: figure + origin banner | empty | in (gate); slow line §59.1 silhouette / paper + line |
| top bar: her portrait chip | brown / empty square | real portrait at once (PORK set by the gate) |
| side cards: Hoàng thượng, Thái hậu, Hoàng hậu, cung nữ | brown squares, fallback faces | real portraits |
| room scene + people figures | empty / pop in | in |
| first event dialog picture (Tiền truyện) | empty box (shot) | in; dialogs wait ≤ 3 s then §59.1 |
| rail / menu icons (ico-cal, ico-goal, mo-chest, unknown-ico → letters L/M) | lazy (fetched on first show) | core set |
| Hậu cung / Giao tình / Dư đồ / Tư trang rows | portraits pop in | 0 blank; a picture still arriving = §59.1 |
| **blank samples, Fold** | many (e.g. 15 at once incl. frames, figures) | **0** (3 wait samples) |
| **blank samples, iPad 1180** | many | **0** (6 wait samples) |

Scan of the first screen of every origin (`first-screen-groups.js`): outside the core set only people (in the life set) and the queued event picture (in the life set).

## Measured (5 Mbps, 80 ms, fresh profile, core set already in)
- New life, Fold, after the core set: gate 25 s cap hit once for 72 pictures / 8.0 MB (wheel + identity + room under it), then 5.3 s; iPad 25 s / 7.7 MB then 3.7 s. Bare download of 8 MB at 5 Mbps = 13 s; the rest is the game's own requests on the same line. With a 2 Mbps line and "Vào cung ngay" the §59.1 placeholders show (shots kit591-*).
- Fresh phone at 5 Mbps, title → tap → play: core set 48.9 MB ≈ 80 s of line (+ 5 MB from this branch: kit UI pictures) then the life gate above (~25–30 s). Estimate from the measured sizes; the core download itself was not re-timed here.
- Warm cache, Tiếp tục (warm-continue.js, Fold, SW on, unthrottled): main: first screen complete 0.7 s, 0 blank (chips show the inline fallback faces first, then swap). This branch: title prefetch brings 35 pictures / 3.6 MB of the saved life during the title; Tiếp tục = 1.5 s gate (people the game picks a NEW figure for on load: maid, physician, eunuch… not in the save) then 0 blank.
- quickcheck 4ff10ae: PASS, open 1272 ms, old save ok, perf new/live render 117/132, tab 227/247, buổi 582/604, tasks>200 ms 9/11, core gates PASS, time-spill guard PASS.

## Tests
- `node dev/test/life-preload.js <out> fold,ipadAir 5` → 0 blank on every screen (both devices). `GOEARLY=1500 … 2` → §59.1 seen, 0 blank.
- `node dev/test/warm-continue.js <out> fold` (ROOT=<main build> for the before).
- `node dev/test/first-screen-groups.js <out> fold` (9 origins).
- `node dev/test/time-spill-guard.js .` PASS (first quickcheck FAILed because the dialog wait used visibility:hidden → innerText ""; now opacity 0).
- `bash dev/tools/quickcheck.sh` PASS (above).

## Shots (CDN img/_review/life-preload/)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/before-fold-main-event-box-empty.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/gate-fold-1mbps-midload.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/gate-ipadAir-1mbps-midload.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/after-fold-luanhoi-wheel-full.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/after-ipad-luanhoi-wheel-full.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/after-fold-room-full-5mbps.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/after-ipad-room-full-5mbps.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/kit591-fold-midload-card.webp
- https://ctm-img.victoria-tntt.workers.dev/img/_review/life-preload/kit591-ipad-midload-card.webp

## Notes / not done
- CDP throttling does not reach service-worker fetches: timings are measured with the SW blocked (core fetched unthrottled first).
- Backdrop of the title screen itself (CSS) can still be loading at the bottom of the iPad Luân hồi card screen (not an img box); out of the life set.
- 8× 404 face-man-* (FPOOL probe of missing files) left as is.

## ROOT CAUSE (MAIN s41 question: "tôi tưởng tất cả … đã tải về máy")
- Not everything was on the phone: assets.json groups = core 634 files / 43.9 MB (blocks entry once), fig 120 MB (background, capped), and **lazy 28 164 files / 3.1 GB that are NEVER downloaded ahead** — cached by sw.js only the first time the game shows them. Every person's portrait / figure (except her own role set, Emperor, Thái hậu), event pictures, and 297 kit UI pictures (incl. unknown-ico-n = the "L"/"M" letters, ico-cal, ico-goal, mo-chest, emo-*) were lazy. A new life = new people = new lazy pictures from the line → brown chips, empty dialog boxes, letters, one minute later fine. Proof: first-screen-groups.js on main: 4–10 lazy pictures on every origin's first screen, incl. kit icons.
- (a) key map: checked — the SW's assets.json map is read from the shell cache; images missing from it are still served (caches.match ignoreSearch / network). Not the cause in tests (warm continue on main: 0 blank, 0.7 s).
- (b) _index.json v=: keys are per file (md5 of each file), so a CDN push changes only the keys of the files it changed; v= alone changes nothing. 787 tn/ thumbnails changed between two builds today (CDN re-push) — those re-download once.
- (c) confirmed and fixed (kit UI pictures → core).
- Also: the j39 portrait swap shows the inline fallback face until the real portrait loads (PORK) → the gate now marks portraits it brought in, so chips open on the real face.
- Not reproduced in emulation: her exact 01:26Z screen on a warm Fold. If her Cache Storage was evicted (Android under storage pressure; persist() is asked but may be refused), everything lazy comes from the line again; the gate + §59.1 now cover that case too.

## HANDOVER
Not needed (task complete). Review: branch review/life-preload @ 4ff10ae. Wipe shots after verdict: `python3 dev/site/cdn_sync.py --wipe-review life-preload`.
