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

## REVIEW r2 — PASS (11/25/2026, B SMALL reviewer, sonnet) — review/pcport-rk-r2 1fbae7c622de6099b28ca3cb40ddf646e3434fa0

PRIORITY #1 CHECK ('pcport-rk-r2'): OD 0 | ledger 0 | claims 3 (pcport rounds) | main 0 | review/* 1 (review/pcport-rk-r2) | archive 0 -> reuse F pcPort fix eaaae7c8 + r1 review above; nothing new built.
LAWS touched: 11 (fix the whole group: one reader for every rk consumer, scan script + before/after table) and 14 (canon overwrite: F's local String(f.rk) cast REPLACED by rkStr, not kept beside it). No UI/kit change, no number, no wording: laws 4/7/9/10 not touched.

Scope: `git diff eaaae7c8 1fbae7c6` = j3 (pv, pMe, mdH), j10 (pServ), j15 (rkStr, rkCanon, pcPort), j60 (kitRoleOfFace), jerr (subject), dev/measure/rk-scan.js, dev/test/pcport-rk.js, the report, rebuilt index.html + sw.js. Nothing unrelated. Built index.html holds `function rkStr`, zero `String(f.rk)`.
Second reader: `git grep` over dev/build for `String(*.rk)`, `.rk.split|slice|match|replace|test`, `typeof f.rk` -> the only `rk.split/slice` left is pcPort on the LOCAL string `rk` returned by rkStr. All other `.rk` hits are other fields (S.srv.rk / staff s.rk rank NUMBER, card key m.rk/e.rk, q72 x.rk, shelf item s.rk, BAL.rk) or string compares (`w.rk==="th"`), none throws on a non-string. Writers: j42:121 sets `"sv"+S.srv.rk` (string). Every reader of a FIGURE's rk goes through rkStr (non-string / NaN / object / array / negative -> "" or sv/eu ground).

| gate (run on 1fbae7c6) | result |
|---|---|
| node dev/measure/rk-scan.js | PASS (0 raw readers, 0 raw writers; 5 rkStr readers) |
| node dev/test/pcport-rk.js (Fold 755x1000 + iPad 1180x820) | PASS, scanBadRk [], injFail [], pageErrors [] both sizes |
| pcport-rk MUTATE (built index.html rkStr := `String(f.rk)` = F alone) | FAIL both sizes: junk classes rk-3, rk-c1,x, rk-[object, rk-NaN (num/arr/obj/nan x pcPort/pframe/mdH) |
| bash dev/tools/quickcheck.sh (alone, old save from live 225c5c08) | open 2307 ms 0 errors; old save ok, buoi ok, 0 errors; perf median new/live render 291/341, buoi 2007/2880; one-core, rules, kit-conform, odds-cap, coop-one-world, mk-layer, manifest, npc-purpose, dialog-fixed, dead-card, look-dedupe, press-keep, time-spill all PASS; ONLY FAIL = G4 90-button-crawl «Ô lưu [Cung Tường Mộng] · Lui · close button did not close its layer» |
| same quickcheck on base eaaae7c8 | identical single FAIL «Ô lưu ... Lui ...» (open 2166 ms, old save ok) -> pre-existing, not caused by r2 (fixed by review/robot-coop-fix-7-r2) |
| face-reveal / looks-2 / facefx-scan (touch pf/mdH) | could not run here: page goto times out on BOTH r2 and base (these old scripts launch chromium without the proxy option) - not counted; their families are covered by quickcheck gates above (kit-conform, look-dedupe, dialog-fixed) |

Looked (Fold 755x1000 + iPad 1180x820, fresh life, real touch tap on a Hậu cung > Cung nhân person in the strip): the person card opens on both, frame + rank ground (rk-sv3 on mine, grey stranger ground on the unknown), name/rank line, option card, no page error, no overflow, no cut text. Shots kept in scratch only (not in git).

Verdict: PASS 1fbae7c622de6099b28ca3cb40ddf646e3434fa0 (ancestor eaaae7c8 = LC15 READY; fast-forwardable). SMALL, f.rk extras; replaces withdrawn cc27f8c7.
~100% xong / ~100% chơi được (this fix).
