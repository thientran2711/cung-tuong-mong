# kit-resfold-r3: review/kit-resfold-r2 740331b5 re-merged onto LIVE 0562e15f
Worker KIT-RESFOLD-R5 (session_01Rc5AsJdNpJ4B7To92evKJJ), for MAIN 177; reviewer RV-171.
PRIORITY #1 CHECK: rv-163f/rv-163g kit-resfold section (earlier PASS dc705271 = same resolutions) | main 0562e15f | review/kit-resfold-r2, -r2-rv163g | claims DIALOG-ORDER-R4 (inactive) → KIT-RESFOLD-R5.
KIT CHECK: reuses the ONE tap guard (j3 kitDlgArm / kTapLast, KIT §6.2j), kit option picker (§6.2h narrow step), kit result card (§7.4a/c). No new part, no player word, no BAL value added by hand.

## Branch
review/kit-resfold-r3 = LIVE 611fca61 + 740331b5 (commit 86e1565e), then LIVE 0562e15f merged in (no source conflict; index/sw rebuilt, assets.json = LIVE). Final sha: see RV READY message.
## Conflict resolutions (RV-163F rules)
- j74: LIVE kptitle-close `__kmOver` kept; branch KK42 `__kpMenuS` (set + the tgFix close block) dropped, nothing left (grep 0).
- jk2b / jopic: LIVE FIRSTCARD-3 kept — no kitOptOdds, no data-ksure re-added (grep 0). jopic: LIVE knav / KK54 `one` seq kept; the resfold's §6.2h narrow-column check `&&!(lay==="2"&&kitOptNarrow(b))` added to LIVE's fit line. jk2b: LIVE kitHintRow / kitChoiceWarn / kitOptsFit kept; #rtoast.kevres picture rule = branch §7.4c (height = content) beside LIVE's row-gap line.
- j3: LIVE closeModal / chooseM (+ nav) with the branch's kitDlgTwinsDone calls added.
- KIT.md: branch KEEP ALL ROWS line + LIVE §6.2b-END line (both sections kept).
## Tests (dev/index.html of the branch; Fold 755x1000 + iPad 1180x820 unless noted)
one-core-guard PASS (3092 ≤ 3592, fails 0) · kit-res-fold PASS · kit-title-name PASS · dlg-twin PASS · fig-load-ph PASS · kit-dialogue ALL PASS · double-tap-scan Fold 126 taps FAIL 0 (iPad run still going at report time: 119 lines, 0 FAIL so far) · opt-narrow-scan Fold 51 frames, stacked 0, FAIL 0 (iPad run crashed the browser twice under load; not re-run on iPad).
kit-std-scan (REPORT_ONLY, F+I) on LIVE 0562e15f vs branch: 107 vs 107, identical per rule (X02 52, X06 12, X08 6, X09 27, X12 6, X18 2, X21 2) → no new hit.
## Looks (real taps, scratch → CDN img/_review/kit-resfold-r3/): resfold-card / resfold-solog / resfold-evcard × fold / ipad, kdv-* (kit-dialogue). Looked: fold result card (fold line + link), ipad + fold event-result card (picture = content height).

## Update (MAIN 177 LOOK, evcard-ipad FAIL) — KK54b
Finding: #rtoast is fixed, centred on the whole canvas → on iPad it straddled the stage edge and covered the Sổ ghi panel lines + the «+4» chip. Fix in the kit for the whole family: `kitRtoastStage` (jk2b; every #rtoast = result card, event-result card, CẤM / srv toast) centres the card on #stage and caps its width to the stage; runs on card-on (MutationObserver), after resultShow, on resize. Fold unchanged. KIT.md added (next to the kevres line). New scan dev/test/rtoast-stage-scan.js (card ⊂ stage, ∩ #panel = 0, ∩ tabs = 0, 3 card kinds × Fold + iPad): LIVE 0562e15f iPad FAIL 3/3 (card x 397–783 over panel x≥590) → branch PASS 6/6, 0 page errors.
Re-run on the fixed build: one-core-guard, kit-res-fold, dlg-twin, kit-title-name PASS. New stills (CDN _review/kit-resfold-r3/, resfold-* and rtoast-*): the card now sits inside the stage (iPad x 82–516 / 149–449 of stage 8–590); it still lies over stage furniture (the «Ân sủng» box bottom) — inside its own stage, as before on Fold.
