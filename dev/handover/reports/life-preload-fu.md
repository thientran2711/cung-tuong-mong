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

## REVIEW r1 (reviewer session_01N1tNP3R47upii2cW96Myw3, opus BIG, for Foreman B)
depth 1 · START_CTX ≈ 4 % · PRIORITY #1 CHECK: OD 0 new | main lifeGate/j59 (live 9393889d) | review/* review/life-preload-fu a28baaea | claims: this review only. Reused kitFigBody, kitPhFigG, §59.1 CSS.
Branch **review/life-preload-fu-r1 @ d0044419** = a28baaea + merge origin/main 09b1bbaf (85a8ba81, only index.html/sw.js conflicted → rebuilt) + reviewer fix (A whole group).

**VERDICT: FAIL (B)** — A is complete on r1 (reviewer fix), D and E pass; B shows a co-op stuck-dialog failure that main does not show.

### (1) A — stage figures as §59.1 silhouette
- Room stage (j59): PASS. Reviewer probe (every fig-* request held = still loading, Fold 755x1000 + iPad 1180x820): every stage person stands as the §59.1 silhouette in her slot with her name chip, real picture swaps in on release, no stuck silhouette, one load listener per img (j59l), no page errors. Only the very first layout pass after a fresh render hides the stage < 400 ms while the silhouette's own body box is measured (old KIT 33.12 wait, same as before).
- NOT whole group in a28baaea: the event / dialog person column (KIT 50 kitDpFit), the event-picture overlay (kitEsOvFit), kitEsFit, person dialog (kitPersonDlgFit), book plate (kitBookPicFit), rank preview (kprevFit), frame figure (kszFigFit) all read kitFigBody(src), which is null while the picture loads → the figure was hidden / 0x0. Measured: VIỆC dialog (Cài người, 1 person) with the picture held: person column EMPTY for 11 s+ (img 0x0, .kesimg visibility hidden).
- **Fixed by reviewer on r1 (d0044419)**: `kitFigWaitBody(im,cb)` (jkit.js, beside kitFigBody): a still-loading (or failed) full-body figure is laid out with the silhouette's body box (unknown-fig-f|m via kitPhFigG); used by the 7 layouts above. §59.1 CSS (jph.js): the f/m wait img carries the silhouette aspect ratio (730/1350, 616/1350) so a height-only layout gets a width. After: same dialog shows the §59.1 silhouette 244x451 (iPad) / 235x435 (Fold) with the name chip, the real picture replaces it on load (data-kwait cleared, aspect-ratio back to auto). Kit part only, no private CSS.
- life-preload.js 1.5 Mbps on d0044419: Fold blank 0 / nobox 0, iPad blank 0 / nobox 0 (gate 25 s, late 36/43); CONT=1 Fold 0/0 (gate 1.6 s); warm-continue Fold first screen 554 ms, 0 blank, cached gate. Shots looked at (scratch, deleted): stage while loading Fold + iPad, VIỆC dialog while loading + after, end screens.
- Note (pre-existing, not this branch): e404 img/face-man-1..8.webp on the title walk.

### (2) B — co-op gate only on a real life change — FAIL
- Rule check: key = COOPW.life | S.name; COOPW.life is the host-computed canon P[seat].life set in fromCanon (both seats); attach() bumps it by 1 on rebirth → a real change always gates. gate counts (coop-e2e, 3 weeks + rejoin + rebirth): host 'life' 1, guest 'life' 3 (join, rejoin reload, rebirth) — no week-merge gate, no skipped rebirth gate; swap the same mirrored. No payload/sync change; old save loads (quickcheck).
- **Problem**: co-op runs on the branch fail with a queued dialog left unseen (modal hidden while Q holds it → the week never ends):
  - coop-e2e (merge 85a8ba81) run 1: 56/63 — host Fold stuck week 1, Q [":Điềm báo"], modal false, pend true.
  - coop-thin-c L3 (d0044419) run 1: 14/16 — guest stuck, Q ["Điềm báo","Hội phối đồ: báo đề","Lời cảnh báo"] (q0 has __el/__seen = was shown, then hidden), modal false, sent -1.
  - Other branch runs green: coop-e2e 4/5 total, thin-c L3 4/5 total (3 reruns green). origin/main 09b1bbaf baseline: thin-c L3 3/3 + coop-e2e 1/1 green.
- Likely cause: the per-merge lifeGate('life') ended with render() (fin path), which re-arms the co-op safety net reshowQ (jcoopworld ~L777, "a rebuild from the room can drop the open panel"). The quiet path in lArm has no render after the merge, so a dialog the rebuild dropped can stay hidden.
- FIX ASK (worker): in the co-op same-life path keep one post-merge redraw / reshow (e.g. after the quiet fetch, when idle, run the same reshow the gate's render triggered — render() or an exported reshowQ), without the cover. Prove with ≥ 5 runs each of coop-e2e and coop-thin-c L3 (and 1 COOP_SWAP) all green, plus the main baseline. Base on **review/life-preload-fu-r1 d0044419** (keeps the A fix).

### (3) D — harness: PASS (no weakened test)
life-preload.js: ROOT env, CONT clicks the title slot `#slots [data-load]` (the old `[data-tgo="cont"]` no longer exists on the title), adds the nobox metric — report-only script, nothing removed. warm-continue.js: same selector + old text fallback kept. coop-e2e.js: prints KLIFE.calls only.

### (4) E — KIT_REQUESTS: PASS (status text of the 18/11 row only).

### Tests on r1
quickcheck PASS twice (85a8ba81 and d0044419; open 1.3–1.6 s, old save ok, core gates incl. one-core-guard PASS) · coop-e2e 63/63 ×2 + COOP_SWAP 63/63 on d0044419 · coop-p2 45/45 (merge) / 46/46 (d0044419) · coop-thin-e 32/32 ×2 · coop-thin-c L3 see (2). Shots: scratch only, none on the CDN (nothing to wipe).
