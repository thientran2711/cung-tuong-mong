# REVIEW life-preload — PASS 9393889d (reviewer session_01UV1SzjKPEGVua6n1rUEV2S, for MAIN s42)
PRIORITY #1 CHECK: OD 18/11 ~01:35Z (L1787, URGENT) + ~01:48Z (L1790 warm-cache root cause) + ~01:50Z (L1776) + ~02:06Z (L1777) | main jload.js §35 loader, jph.js §59, j39 PORK, sw ASSETS | review/life-preload 4ff10aee (worker s40/s41, report reports/life-preload.md) | claims MAIN life-preload SzgmQZw; no other branch on it. Worker report carries its PRIORITY #1 line.

Branch `review/life-preload-r6` @ **c743265c** = review/life-preload 4ff10aee merged onto origin/main f986ff6a, then e24d5838 (c743265c), then onto **0527f921** (= 9393889d, quickcheck PASS again), generated files (index.html, sw.js, assets.json) rebuilt each time + 1 reviewer fix commit.

## Reviewer fixes (commit 93beb3b7, dev/build/jload.js only)
1. **Title prefetch never ran** (owner 02:06Z requirement): `lWant()` returned `undefined` for a new picture, `pPump()` did `.then` on it → TypeError after the FIRST picture (coop-e2e "solo: no page errors" FAIL ×3: `title prefetch TypeError … reading 'then'`). Fix: `return e.p`. After: warm Tiếp tục = no gate at all (`cached:true`), first screen complete 0.57 s, 0 blank (prefetch 39 pictures / 4.7 MB of the saved life during the title).
2. **25 s cap was really ~50 s**: the render-time `lArm` of the new S set `LIFE.again` during the start gate; after the cap (or "Vào cung ngay") a second gate covered the game again for the same pictures (measured, hung pictures: ON 0.9 s → off 25.6 s → ON 26.1 s → off 50.2 s, one flash). Fix: no re-run when the gate ended late / by the button (the loop already re-reads kitLifeSet() of the current S each round). After: ON 0.9 → off 25.0 s, one segment.
3. **Stalled picture held LIFE.busy forever** → background fig pool + title prefetch wait forever (busy 34–45 never drained with a request that never answers). Fix: `fin(false)` after 45 s per picture. After: busy 0.

## Checks (brief items)
| # | check | result |
|---|---|---|
| 1 | new life, cold, 5 Mbps (life-preload.js, SW blocked) | Fold 0 blank / 5 wait; iPad 1180 0 blank / 2 wait. Gate hits the 25 s cap (7.1 / 8.2 MB), "Vào cung ngay" at 6.4 s |
| 1 | new life, cold, 1.5 Mbps | Fold 0 blank / 345 wait (§59.1 shown); **iPad: 30 blank samples, all one stage figure `fig-maid-*` after closing the first dialog** (see follow-up A) |
| 1 | saved life, warm cache, SW on (warm-continue.js) | after fix 1: no gate, 0 blank, 0.57 s |
| 1 | saved life cold (CONT=1) | test harness broken: `[data-tgo="cont"]` no longer exists (title button is `data-load`), not a game bug; covered by warm-continue + swup probe |
| 1 | gate never hangs (all life pictures never answer) | 25.0 s then opens; button at 6.4 s; tapping it opens at once |
| 2 | §59.1 = ONE kit part | one CSS rule + one MutationObserver + one load/error listener (jph.js), KIT.md §59.1 + kit sample; scan of picture slots ≥72 px with positioned parent that already draw their own `::after` (would be replaced by the line): 0 on Fold all main tabs |
| 3 | +5 MB core, SW upgrade old main → this build (swup probe, Fold, SW on) | new shell cache, save kept (same name/year), returning player sees core screen ~10 s once (core+screen → done), 272/272 kit core pictures cached |
| 3 | offline start | title opens offline, "Tiếp tục kiếp này" → gate 0.5 s → in game, 0 errors |
| 4 | dialogs ≤3 s then fallback | dialog under the gate (identity card) opens with §59.1 at gate end; standalone ≤3 s wait not separately exercised |
| 5 | quickcheck | c743265c PASS (render 138/141, tab 298/359, buổi 676/777, tasks>200 12/11, longTaskMax 1232/1451); one earlier run on the same code hit longTaskMax 2247 (noise, rerun clean); one G3 kit-conform flake (MIXED 2) on f986ff6a merge, 3 reruns clean |
| 5 | one-core / old save | core gates PASS (G1–G5); old save from live loads + plays a buổi |
| 5 | coop-e2e (live Worker) | before fix 62/63 ×3 (only the prefetch error); after fix 62/63, 62/63, 63/64, **63/63** — the failures were 3 different known live-Worker flakes ("week after rebirth advances", rank-worker CORS, "fold #next enabled") |
| — | wording | CTM_WAIT lifeHead/lifeLabel/lifeNote/lifeSlow/lifeGo/picWait: cổ trang, no % / MB, "ngươi" as the rest of the game |

## Follow-ups (not blocking; for MAIN to queue)
A. iPad 1.5 Mbps: a stage figure (fig-maid) still loading after the 25 s cap counted blank (no §59.1 silhouette) for ~30 s; on Fold at the same line it waits with the silhouette. Probe: under §J59 `.stage.j59wait` people stay hidden (0×0) even at 8 s — whole-group look at stage figures that load after the gate.
B. Co-op: every week merge (`fromCanon` → `deser` → new S) runs `lifeGate("life")` (full DOM `lBgs` getComputedStyle scan; covers the screen if a life picture is missing at a week change). coop-e2e passes; consider gating only on a real life change (seat life counter) in co-op.
C. A brand-new life on 5 Mbps waits the full 25 s (7–8 MB); fresh phone = 48.9 MB core first. Owner may feel the wait; worth telling her the numbers.
D. Fix test harness `dev/test/life-preload.js` CONT + `warm-continue.js` fallback selector (`data-load`).
E. KIT_REQUESTS 18/11 row: (a) is now built as §59.1 — mark built; (b) small spinner still open.

CDN review shots wiped (`cdn_sync.py --wipe-review life-preload`, 9 objects). Reviewer shots stayed in scratch only.
