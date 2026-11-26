# REVIEW renderer-mem (F10) @ 123a2a9c — PASS
Reviewer: ONE BIG reviewer (opus), child of F10 worker #3 session_01D3E3Nah1mvJDWaRpXxvx3R; 26/11. START_CTX ~3 %.
PRIORITY #1 CHECK: OD 0 | main none | review/* review/renderer-mem 123a2a9c (this review) | claims D row «F10 renderer-memory hunt».
Base: LIVE origin/main 3af7896e; 123a2a9c is a fast-forward of it (checked `merge-base --is-ancestor`).
Scope read: `git diff 3af7896e 123a2a9c -- dev/build dev/kit` (j63 kaMO/kaSort/kaRun/kaWants/kaNew, jksize kitScrollCues/kscueOwn/kitScrollCuesSoon,
jk4 KIT_OPT_EQ/KIT_OPT_ROQ, jbal2 BAL.kobs, j87+jbook kitImgMark decode window + `window.__kbk` release), KIT.md, report §7–§8.

## Laws touched
- LAW 4 ONE CORE: PASS. Cue numbers + pass cap read only `BAL.kobs` (jbal2 `{cueShort:260,cueHyst:24,kaPass:3}`); no typed fallback left.
  (The book decode window `cur-3..cur+2` / `cur-2..cur+2` in j87 paint() is a sheet-index window, not a game number — see minor 5.)
- LAW 9 KIT FIRST / LAW 11 WHOLE GROUP: PASS. All four members fixed at their kit source (one kaMO, one kitScrollCues, one kitOptEqual/RO);
  KIT.md updated in the same branch. No new look, no private part. Family scan below.
- LAW 12 two devices: Fold 755x1000@2 + iPad 1180x820@2 used for every look check.

## Evidence (all run by me, one browser test at a time, local A/B: LIVE 3af7896e worktree vs fix 123a2a9c worktree)
| check | LIVE 3af7896e | fix 123a2a9c |
|---|---|---|
| `node dev/test/kscue-loop.js` | card PASS, edge PASS, **nested FAIL: page never answers** (hang) | **PASS all 4** (card/edge/nested/kaloop) |
| own probe (cards added direct / wrapped / small added later / stray node in a normalised card / clone / re-insert / in #mb / .kcard / 300-card burst) | all normalised | all normalised, identical, 300/300 in burst; 0 page errors |
| own probe: 50 non-card adds in a page with 300+ cards | 487 ms | 398 ms |
| kscue-shots Fold+iPad (j7c, evpick, giftpick) | see note | same layout + cue |
| opt-frame-scroll-scan (MAXP=60, Fold+iPad) | 81 frames, 0 FAIL | 81 frames, 0 FAIL; 80/81 rows identical (1 row cy 455→473, random draw) |
| scroll-cue-scan (MAXP=60, Fold+iPad) | ALL OK | ALL OK; 93/95 common rows identical, the 2 others = PEND:j7c (random event draw); ge1 opened only on fix (random) |
| dialog-fixed | FAIL «kit-dialog-2 a» Fold + iPad | the same 2 FAIL → **pre-existing, confirmed on LIVE** |
| button-crawl (G4 90) | FAIL «Ô lưu · Lui» | the same FAIL → **pre-existing, confirmed on LIVE 3af7896e** |
| quickcheck 123a2a9c | — | build reproduces (only CTM_BI line differs); open 0 errors; old save loads + plays a buổi; G1/G2/G3 (kit-conform floats none) pass; G4 fails only the 2 pre-existing rows above; perf fix vs live: render 293/328 ms, tab 582/724, buổi 1857/2028, long tasks ≥200 ms 37/51. (My run hit my own 25-min wrapper timeout after the perf step; results read from .quickcheck/quickcheck.json + gates.log.) |

Look note: kscue-shots seeds Math.random but the life is NOT stable run to run (fix-vs-fix gave 10–34 % pixel diffs). I ran LIVE-vs-fix,
fix-vs-fix and LIVE-vs-LIVE and paired the shots of the SAME life: Fold giftpick 0.04 %, Fold evpick 0.02–0.4 %, iPad evpick 0.03 %,
iPad giftpick 0.04 %; j7c is a different random event on every run (card structure looked at: same picture box, Tốn/Được/Mất rows,
odds bar, «!» — identical). Looked at the pairs myself. Shots stayed in scratch (/home/user/wt/rm-rev, not git, not CDN; deleted).
E-S1 b2239 replay not re-run (worker's table shows LIVE never idles / fix settles; kscue-loop + probes give the deterministic proof).

## Logic review (observer correctness)
- New card via childList (direct, wrapped, inside #modal or page): caught by `kaNew` → `kaNorm(parent|node)`. OK.
- Node added inside an UNnormalised card (e.g. `<small>` appended later): target path → `kaRoots.add(card.parent)`. OK (probe).
- Node added inside a normalised card: `kaTouch` → `kaNorm1` data-ka branch + «???» mask = what LIVE did for every card on every add. OK.
- Cloned / re-inserted normalised cards keep `data-ka="1"` + their markup; nothing to do (LIVE re-ran only the cheap data-ka branch). OK.
- Own edits: `takeRecords()` after each pass; only really new cards re-run; ≤ `BAL.kobs.kaPass` passes → no unbounded chain. OK.
- Cue: cue-only records ignored on both sides (kaSort skips `.kscue`, the cue MO returns on `kscueOwn`); re-check is rAF-throttled;
  short/tall hysteresis stops the flip; buttons/.ka never cue columns. No ping-pong found (kscue-loop nested/edge PASS).
- `KIT_OPT_EQ`: for a dialog option card kitOptFit0 only calls kitOptEqual, so every card of one root gives the same tiering → once per
  synchronous pass is equivalent; cleared at the next microtask. `KIT_OPT_ROQ`: same fits, one rAF. OK.

## Findings (none BLOCKING)
1. minor — a card that becomes a KA_SEL card by a later CLASS change (no childList record) is normalised only on the next CARD wake
   (LIVE: on any added node). Probe: `<button><small>` inserted, `className="btn"` set later → stays raw after a non-card add, normalised
   after the next card add. grep found no code that sets btn/opt/kcard/opts/pcb/rbtn/srvb after insertion (jselxday sets data-ka itself),
   so no live impact today. Optional: add `class` to kaMO's attributeFilter for KA_SEL hosts, or note it in KIT.md.
2. minor — kaRun: roots collected by `takeRecords` in the LAST allowed pass stay in `kaRoots` until the next card wake (a 4th-generation
   card made by a rebuild would wait). Intended cap, but worth one KIT.md sentence.
3. minor (doc) — KIT.md §6 «Observer rule» says a new card → "the whole-page `kaNorm` pass" and two lines later "never the whole page";
   the code does kaNorm over the holding place + a light whole-page `kaWants` sweep. Reword to match.
4. minor (family, perf, not hangs) — other kit observers still do page-wide work per batch, none feeding itself: j56 pcTabify
   `scan(document)` per add (tabify exits early once tabbed), jksize `kitFrameTagAll` per batch (two :not() selectors), j79 «.kalog» fix per
   added node, jk2b `.pc:not([data-k2])` per batch; debounced ones (jk3, jk4 1277, jbd, jtoil, jaudit, jseal, jmark, jfigseal) are fine.
   Matches the worker's mo-burst perf list (kfs seal, result-card kick, pc kpwide, k3CatTabs) — leave as a perf item, not F10.
5. minor — j87 decode-ahead window (`cur-3..cur+2` spread, `cur-2..cur+2` single) is typed in code; it is a sheet index window, not a game
   number, so not a LAW 4 break; could live next to the book's other constants if a BAL/KIT book table exists.
Pre-existing (not F10, confirmed on LIVE 3af7896e): dialog-fixed «kit-dialog-2 a» (Fold+iPad); button-crawl «Ô lưu · Lui».

## VERDICT: PASS 123a2a9c (FF from LIVE 3af7896e) — play-stopper fix proven (LIVE hangs, fix does not), no look change, laws kept.

## §2 — merge delta 82bbe53e (LIVE 1dcb373e merged: coop-freeze-kmrew's parallel scroll-cue fix) — PASS
- 82bbe53e is a fast-forward of LIVE origin/main 1dcb373e (checked). Delta 123a2a9c→82bbe53e in dev/build: jksize.js (comment only on the
  fix side) + jinv.js (comes from LIVE, untouched by F10); + LIVE's dev/test/scroll-cue-loop.js and observer-leak.js.
- jksize vs LIVE 1dcb373e: ONE scroll-cue rule kept = F10's kitScrollCues (own cue `:not(.sib)`, which LIVE also had; kscueOwn; rAF
  `kitScrollCuesSoon`; BAL.kobs hysteresis; buttons/.ka never cue columns). LIVE's duplicate `kscSoon`/`KSC_RAF` removed; no reference left in
  dev/build or index.html (git grep). LIVE's explanatory comment kept and reworded to name kitScrollCuesSoon. Nothing of LIVE's rule lost: its two
  points (own cue only; never re-run inside the same task) are both in F10's code. Built index.html carries kitScrollCuesSoon.
- Tests on 82bbe53e: `node dev/test/scroll-cue-loop.js index.html 755x1000` PASS (settled, 0 passes when settled), `… 1180x820` PASS;
  `node dev/test/kscue-loop.js` PASS all 4.
- minor (doc): dev/test/scroll-cue-loop.js header still names «jksize kscOwn / kscSoon» — now kscueOwn / kitScrollCuesSoon; reword when next touched.
VERDICT §2: PASS 82bbe53e (FF from LIVE 1dcb373e).
