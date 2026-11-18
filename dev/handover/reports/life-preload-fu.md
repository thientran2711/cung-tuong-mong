# life-preload-fu — report (worker session_01N1tNP49F8cp5bBg81G3WX5, for Foreman B)

depth: n/a (worker). START_CTX ≈ 5 %, finished in one session, no rollover needed.
PRIORITY #1 CHECK: OD 0 for the follow-up | ledger 0 | claims 0 for the follow-up (life-preload LIVE 9393889d) | main lifeGate 5 hits | review/* review/life-preload(-r6) = landed work | archive 0. Reused: KIT §59.1 (jph.js), j59 silhouette loader (j59unkSrc), COOPW.life, jload lifeGate.

Branch `review/life-preload-fu` @ **a28baaea** (from origin/main a95e8d41). Sources: dev/build/j59.js, jph.js, jload.js; tests dev/test/life-preload.js, warm-continue.js, coop-e2e.js; dev/kit/KIT_REQUESTS.md. Generated files rebuilt. No images in git.

## A — stage figures show the §59.1 silhouette (whole group, Fold + iPad)
Root cause: j59lay hid the WHOLE stage (`.stage.j59wait`, up to 15 s) while any figure picture or its body measure was missing, and a still-loading `<img>` has no size, so the people were 0×0/absent. Fold looked fine only by timing.
Fix (j59.js): a figure whose picture is still on its way is laid out in its slot as the kit silhouette (unknown-fig-f|m, kit core file) with the silhouette's own body box (same placement rule as a known person); the `data-kwait` silhouette of §59.1 paints in that box; the real picture swaps in on load (j59sched). Applies to her own figure (#mefig) and every token. A failed picture keeps the silhouette too (mark re-set), a loaded-but-unmeasured figure is hidden alone — it no longer hides the others. ONE gender rule `kitPhFigG` (jph.js) is shared by the picture slot and the stage. Only a missing silhouette file still falls back to the old hide (15 s cap). Kit part only (§59.1), no private look.
Table (life-preload.js, new life, CDP 1.5 Mbps, SW blocked, whole walk Luân hồi → … → Hành sự; blank = visible unfinished picture with nothing in its place; nobox = unfinished stage figure with no box / hidden while its stage is on screen):

| device | before (main a95e8d41) blank / nobox samples | after (a28baaea) blank / nobox samples |
|---|---|---|
| iPad 1180x820@2 | 25–29 / 219–346 | **0 / 0** |
| Fold 755x1000@2.625 | 0 / 235 (first metric, stage maybe covered) → 0 / 0 (covered stage excluded) | **0 / 0** |

(Noise: the iPad run varies by which people get rolled; one intermediate run showed blank 73 caused by FAILED pictures with no mark; fixed by the failed-picture rule, rerun 0/0.) Other stage kinds (event/book figures) already show §59.1 in a real box; not changed.

## B — co-op: gate only on a real life change
jload.js lArm: in co-op (`COOPW.on`) a new S (week merge) runs `lifeGate("life")` only when `COOPW.life` (this seat's life counter) or `S.name` changed since the last gate; otherwise the life set is fetched quietly (no cover, no full DOM scan); §59.1 covers a late picture. Both seats run the rule on their own S. No co-op sync change (no opus job needed). Counter `KLIFE.calls` (gate runs per reason) printed by coop-e2e.
lifeGate("life") runs over the whole coop-e2e run (3 weeks, rebirth, rejoin; Fold host / iPad guest): before **Fold 5, iPad 4** → after **Fold 1, iPad 3** (the rest = real life changes: join, rebirth). Swap run (iPad host): 1 / 3.

## D, E
D: life-preload.js CONT path uses `#slots [data-load]`; warm-continue.js fallback selector the same; both now pass (CONT=1 Fold 5 Mbps: gate 1.4 s, 0 blank). E: KIT_REQUESTS 18/11 row: (a) BUILT = §59.1; (b) small spinner OPEN for the kit keeper (MAIN), filed only.

## Tests (all on a28baaea)
- life-preload.js Fold + iPad 1.5 Mbps: 0 blank / 0 nobox (table). CONT=1 Fold: 0 blank.
- warm-continue.js Fold: first screen 0.58 s, 0 blank, no gate (cached).
- coop-e2e 63/63 (live Worker), COOP_SWAP=1 63/63, coop-p2 45/45, coop-thin-c L3 16/16 (coop-thin-e does not exist; thin-c spot run).
- one-core-guard PASS; quickcheck PASS (open 1400 ms, old save ok, render 159/160, tab 351/325, buổi 820/802, tasks>200ms 12/11, core gates PASS, time-spill PASS).
- Not run: iPad Safari real device; reduced-motion look of the silhouette on the stage (opacity animation stays off under `s`).

## Notes for review
- Co-op touched ⇒ BIG review follows (as ordered). Check: a co-op guest whose partner's new person arrives in the same week still gets pictures through the quiet fetch + §59.1 (no cover).
- Shots: none kept (nothing on the CDN to wipe).
