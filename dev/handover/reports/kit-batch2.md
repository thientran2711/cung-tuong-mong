# kit-batch2 — report

## REVIEW r1 (sonnet reviewer-lander session_01N1tNP2F8nQScURNNfgLvQr · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: OD 0 | ledger 0 | claims KK16 | main kitPodiumShow j90.js + KIT.md (3 conflict markers + 2× «## MG-SKIN» on main) | review/kit-batch2 1ba60626 | KIT_REQUESTS MAIN 117 #2 «Người lạ» + §77c promo chip.
Branch review/kit-batch2-r1 = 1ba60626 + merge LIVE 35647d5e (conflicts only generated index.html/sw.js → rebuilt) + fix commit → 63c399c249b12d5e03629b9e9832eb19d769fba8.
| check | result |
|---|---|
| Merge newest origin/main, rebuild | merged, build OK, built files committed |
| KIT.md hygiene | bare main KIT.md: 3 conflict-marker lines + two «## MG-SKIN» blocks; merged head: 0 marker lines, ONE «## MG-SKIN» (KIT.md:4648) |
| Consistency scan (laws 9/10/11) | kitPromoChip: ONE chip builder in jrail.js using the standard .kchip look, one mount (renderStage wrapper), one hook window.kitPromoHook (null → no chip), sample §77c in KIT_SAMPLES; kitPodiumShow: ONE option {unknown} / window.kitPodiumUnknown read in j90 (kitPodiumShow + kitPodiumTag + j82 contest wrapper), no per-place variant |
| FAULT FOUND + FIXED (law 4 one core) | quickcheck core gate G1 one-core-guard FAILED on the branch: «NEW inline rule number: jrail.js [t.unit] 3 tháng» (KIT sample note typed «Kỳ thăng: 3 tháng · Tần»). Note changed to «Kỳ thăng: n tháng · hạng»; coregates.sh then PASS |
| Tests the branch adds | none. Probes I wrote (scratch /tmp, run on bare head 1ba60626 AND merged head): chip: hook null → 0 chips; hook {months:3,rank:'Tần'} → ONE chip «Kỳ thăng: 3 tháng · Tần», inside stage, top 7 px, Fold l297 w154/747, iPad l214 w154/582; months 0 → «kỳ này»; hook returning null after → 0 chips; 0 page errors both heads both devices. Podium {unknown}: cuMeet is NOT called for the unknown entrant (5 of 6 met), others met as before; existing kit-podium-tt.js PASS, podium.js runs OK on merged head |
| quickcheck | run 1 FAIL (G1 above + longTaskMaxMs 6199 > 5000 ceiling while box loaded); after fix run alone: **PASS** 245 s · core gates PASS · open 1947 ms · old save loads + plays a buổi · perf new/live render 277/281, tab 542/499, buổi 1369/2662 (live noisy) |
| Old save | quickcheck old-save case: loads, plays a buổi, 0 errors |
| Shots Fold 755x1000 + iPad 1180x820 full screen, each looked 3× (law 12) | stage with chip «Kỳ thăng: 3 tháng · Tần» centred at the stage top edge, clear of the head seal / mood avatars / title column / chip column on both devices; podium with an unknown entrant: Fold grey silhouette + her name card, others normal; iPad podium normal |
| Wording (law 7) | «Kỳ thăng: n tháng · hạng», «kỳ này»: cổ trang, no % |
Notes for KK17/foreman: (1) {unknown} only skips cuMeet + gives the grey name tag; the grey SILHOUETTE itself still comes from kitIsKnown(p), so a person already known elsewhere stays in colour even if the option says unknown (matches «NOT met» wording; keep the predicate truthful). (2) kitPromoChip(r) called directly with months<0 prints «kỳ này» (the hook path validates, direct call does not) — nit. (3) My mgboardof-r1 branch adds a «## MG-SKIN.1» block to KIT.md: both branches touch KIT.md MG-SKIN area; land order independent but expect a trivial merge in KIT.md.
Verdict: **PASS** 63c399c249b12d5e03629b9e9832eb19d769fba8. Shots scratch only.
