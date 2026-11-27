# kit-resfold-r4: RV-174 PASS b08f4cc2 (kit-resfold-r3-rv174) re-merged onto LIVE f28d28b9
Worker KIT-RESFOLD-R5, for MAIN 178; delta check RV-163I; lander LC30.
PRIORITY #1 CHECK: rv-174 PASS b08f4cc2 | main f28d28b9 | claims KIT-RESFOLD-R5. KIT CHECK: no new part; reuses kitRtoastStage, tap guard j3, KK45 jph neutral ground.
Branch review/kit-resfold-r4 = LIVE f28d28b9 + b08f4cc2 (only index.html / sw.js / j3.js / jph.js conflicted).
## Resolutions
- j3 (showModal tail / closeModal / chooseM): LIVE's empty-modal block kept as is (kitModalLive, M.__m=m, «Đã rõ» button when the list is empty or all locked); the branch's two kitDlgTwinsDone calls added to LIVE's closeModal / chooseM (the branch side only had the OLD showModal tail, which LIVE replaced). 4 kitDlgTwinsDone refs (def + closeModal + chooseM + inner).
- jph (loading placeholders): two intents, both kept. LIVE a366a2b8 = stranger silhouettes follow the ROLE (kitSilG: unknown-fig-f / m / e, a real stranger's own src). Branch KK45 §59.1a = a KNOWN person never WAITS as a stranger (neutral parchment ground + fade-in, kphsil stand-in). The branch CSS wins for the loading state (the silhouette stays only as a stranger's own picture), extended to LIVE's new eunuch kind: «es» in the animation:none list, `[data-kwait^="e"]` neutral ground, aspect-ratio 549/1350 (LIVE's value for e). LIVE's role silhouettes elsewhere (j59 etc.) untouched. The old LIVE rule «portrait waits as unknown-f|m silhouette (entry-blank-r3 item 6)» stays superseded by KK45 as in b08f4cc2 (RV-174 PASS).
- index.html / sw.js rebuilt (build_site), assets.json = LIVE.
## Tests (dev/index.html of the branch; Fold 755x1000 + iPad 1180x820)
one-core-guard PASS · rtoast-stage-scan PASS · kit-res-fold PASS · kit-evres PASS · dlg-twin PASS · kit-title-name PASS · fig-load-ph PASS · dialog-fixed (alone) all pass, 0 page errors · hook 96 (kit-std-scan gate mode vs baseline) 28 = baseline 28 {X06 4, X08 4, X02 20}, exit 0.
