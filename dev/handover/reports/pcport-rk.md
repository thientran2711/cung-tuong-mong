# pcport-rk — review report

PRIORITY #1 CHECK ('pcport rk.split'): brief b-pcport-rk-review.md | fixer report on review/pcport-rk | review/* only this branch | claims: fixer session_01N1tNP63faDcCU7EogpnFDG.

## REVIEW r1 — PASS (11/25/2026, SMALL reviewer, sonnet)
Head cc27f8c784e8006f08f447be90eac4875edf1ba4, parent = LIVE origin/main 9f72524b (branch is a straight fast-forward of LIVE, so "bare head" and "head merged onto LIVE" are the same tree).

1. LAW 11 whole family: PASS. `node dev/measure/rk-scan.js` = PASS (0 raw readers, 0 raw rkOfFace writers). My own `git grep` over dev/build/j*.js (`.rk.(split|slice|indexOf|replace|match|startsWith|includes|trim|test)`, `"rk-"+`, `String(x.rk)`, `x.rk||`): no raw reader left; every figure reader (pcPort, mdH, kitRoleOfFace, jerr subject) uses rkStr. Writers: pv/pMe/pServ use rkCanon; literal writers are strings; j42.js:121 (pMe wrapper) writes "sv"+S.srv.rk, always a string. Other `.rk` reads (S.srv.rk, s.rk, item .rk, card/queue .rk recipe key, q72 x.rk) are different fields, never fed to pcPort.
2. Real non-string writer: NOT proven. Strongest candidate (inferred, not reproduced): `S.rk` is the rank-tracker OBJECT {t,mr,sr,k,a0} (jrank.js:34 rkTrack, created for every co-op player at jcoopthinb.js:177 and after each endTurn); any path that hands the player object (or a bare person with a tracker/numeric rk) to pcPort/mdH as a figure gives a non-string rk, which fits co-op-only sightings. Reader is now total (object/array/number -> safe), so the crash is gone whichever site it was; a figure built that way just shows no rank ground. No unfixed writer found in builders. Not a FAIL: nothing can still throw.
3. Old saves: figures are never saved (cards save pid/ra/w and rebuild through builders), so no non-string rk persists; quickcheck old-save step PASS on this sha.
4. Wording: no player-visible text changed (diff = j3/j10/j15/j60/jerr code + test/scan + rebuilt index.html/sw.js).
5. Co-op: rk is NOT in room state (jcoop*/jcooptimer only carry the card recipe key `e.rk`, a string); coop-e2e not required; not run.

Tests (bare head = LIVE+fix):
- `node dev/measure/rk-scan.js` -> PASS.
- `node dev/test/pcport-rk.js` -> `755x1000 / 1180x820: scanBadRk [] injFail [] pageErrors []`, PASS.
- MUTATE (built index.html pcPort reader reverted to `rk=f.rk||""` + raw split): FAIL on both sizes (pcPort/pframe x num/arr/obj/neg/bool: `rk.split is not a function`). Restored after.
- `bash dev/site/build_site.sh`: index.html identical to the committed one except the window.CTM_BI build line.
- `CTM_LIVE_REF=origin/main bash dev/tools/quickcheck.sh`: CORE GATES PASS, TIME-SPILL GUARD PASS, QUICKCHECK PASS (open 1737 ms, old save ok 0 errors, perf new/live render 198/212, tab 553/514, buoi 1207/1357).
- Shots (scratch, not in git): Hau cung -> Cung nhan portrait strip, Fold 755x1000 and iPad 1180x820, 3 shots each, looked: strip + big portrait frames with rank grounds (rk-sv3, rk-c1) render, no page error, no overflow, no cut text.

Verdict: PASS cc27f8c784e8006f08f447be90eac4875edf1ba4. FOLLOW-UP (optional, not blocking): if a console error ever names rk again, log the caller once in rkStr to identify the real writer (candidate S.rk tracker object above).
