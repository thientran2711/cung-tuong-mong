# pcport-rk — report (B FIXER, sonnet, SMALL)

PRIORITY #1 CHECK ('rk.split'): OD 0 | ledger 0 | claims 8 (sightings only, no fixer) | main 1 (dev/build/j15.js pcPort) | review/* 0 | archive 0.

## Bug
`TypeError: f.rk.split is not a function` in `pcPort(f,col,status)` (dev/build/j15.js): `f.rk` truthy but not a string. Seen x3 (U3b room 278B host Fold, Hau cung -> Cung nhan) and x17 (U2 room E44M guest Fold). Same code on LIVE.

## Root cause (reader side, certain)
`pcPort` did `/^c\d/.test(f.rk||"")` then `f.rk.slice(1)` and `f.rk.split(" ")` with NO type check. Any figure whose `rk` is number / array / object / true / NaN threw. `mdH` (j3) was safe only by `String()`; `kitRoleOfFace` (j60) by `String()`; `jerr.js:79` had its own one-off `typeof` guard (3 different variants = LAW 11 family).

## Writer side (honest finding)
Static + dynamic scan of all figure builders (pMe, pv, pEmp, pTH, pMaid, pDoc, pServ, staffFace, pEunCourt, kidFace, pMan, h54Face, kcFace, kitFace, pFaceOf chain) on a fresh life: **no builder produces a non-string rk** — all go through `rkOfFace` (strings) or literals. The numeric `rk` that exists in the game is `S.srv.rk` / staff `s.rk` (rank NUMBER of a servant, a different field on PERSON objects, legitimately numeric). The only way it reaches pcPort is a bare person object (role maid/eunuch, numeric rk) handed in as a figure (many `who:s` / `{who:S}` call sites), or a figure blob built by a path I could not reproduce offline (co-op guest, first ~230 s). Not reproducible without the live blob, so the fix makes the reader total and the writers canonical rather than chasing one site.

## Fix
- `rkStr(f)` (j15.js, ONE shared reader): string -> trimmed string; array -> its string members joined; bare person (role maid/eunuch + integer rk) -> `sv<N>` / `eu<N>`; anything else -> `""`. Never throws.
- `rkCanon(v)` (j15.js, writer side): used by `pv`, `pMe` (j3), `pServ` (j10) — the 3 builders that take `rk` from `rkOfFace`.
- Readers switched to `rkStr`: `pcPort` (both uses, incl. the `.pcb2` rank image), `mdH` (j3), `kitRoleOfFace` (j60), `jerr.js:79` subject.
- Old saves: figures are never saved (cards save `pid`/`ra`/`w` and rebuild figures through the builders: `WHO()`, `mkP`, `rcpMk`), so a bad rk cannot persist; the repair is the reader tolerance. A save with a numeric `rk` on a card kind (`m.rk`, a different field) just lapses via `rcpMk` as before.
- No visual change: good data yields identical class names (`rk-kid rk-c4`, `rk-sv2`, ...), checked in the test.

## Scan (dev/measure/rk-scan.js) before / after
| | before (main) | after |
|---|---|---|
| raw readers (`f.rk.split/slice`, `String(f.rk)`, `typeof f.rk`) | 6 | 0 |
| rkOfFace writers without `rkCanon` | 3 (pv, pMe, pServ) | 0 |
| shared helper readers (`rkStr`) | 0 | 5 sites |
Exit 1 before, PASS after.

## Tests
- `dev/test/pcport-rk.js` (default: built root, Fold 755x1000 + iPad 1180x820): scans every real figure for non-string rk, then injects num/array/object/NaN/neg/bool rk into pcPort, pframe, mdH and into the Hau cung -> Cung nhan tab through a poisoned `rkOfFace`; also asserts good data classes unchanged.
  - BARE (before the fix, rebuilt from main): **FAIL** on both sizes, `f.rk.split is not a function` (pcPort/pframe x num/arr/obj/neg/bool + bare person).
  - FIX: **PASS** both sizes, 0 page errors.
- coop-e2e SWAP0: not run — co-op relay code not touched (no `.rk` figure relay in jcoop*; only the unrelated `x.rk` request-queue key).
- quickcheck alone: PASS (129 s, 0 errors; old-save step skipped: no live build given).
- Build: `bash dev/site/build_site.sh` re-run, index.html/sw.js regenerated in the branch.

~100% fix / ~100% playable (reader total; writer for the live blob not individually identified — if a console error ever shows again it is now silent and the figure simply has no rank ground, never a crash).
