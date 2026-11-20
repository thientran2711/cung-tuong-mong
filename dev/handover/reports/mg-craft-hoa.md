# mg-craft-hoa — Cắm hoa «Chọn mùa · cắt cành · nghiêng thế»
PRIORITY #1 CHECK: OD 20/11 ~08:15Z (each craft own mechanic), ~05:10Z (no words) | main k91Arrange j91:322 (old rings) | review/mg-craft-design 54ad4544 | claims: lead mg-craft.
START_CTX ~8% (session start). Branch review/mg-craft-hoa @ e8b6e7f9 (from main 70bea3d3). NOT yet merged with the lead's scaffold.
## What
- dev/build/jcraft_hoa.js: engine hoacraft (kcHoa), registered + KG82_KIND.hoa re-pointed (lead's j91 re-wire block should replace my 2 lines at the end of the file); assemble.py order after jmgt.js.
- Flow per vase: tap season flower (wrong one wilts, season share -) → swipe-cut stem to vase ratio → drag into vase mouth → drag tip to lean. 3 vases (3/4/5 stems + mgMore). ✓ judges; stars as picture. No text in play (test: only the ✓ sign).
- BAL: BAL.mgTier.lev.hoa {ghost,cutTol,angTol,alike,sway,limStem} + BAL.mgTier.hoa {n,thien,k,guest,ang,cut,zero,seat,w,wrong,balTol,judgeMs} (jbal2.js after BAL.mgFx; Object.assign into lead's lev.hoa block if it exists).
- Season flower aid in the window = lev.hoa.ghost (hidden at hardest ease: she must know đông mai, hạ sen, thu cúc, xuân đào; the rules text says so).
- Stand-in art on canvas, canvas.dataset.tam="hoa" (no visible word).
## Tests
dev/test/mg-craft-hoa.js (Fold 755x1000 and iPad 1180x820: ALL OK): contest caller rules screen, Hướng dẫn ghost hand, Sẵn sàng, oracle full play, wrong pick costs season share, ≥9 at ease 5, no text, no page errors.
Measure (skilled bot, n=6, ease → mean raw): e0 7.35 · e2 8.93 · e5 9.44 (law 5 holds). Old rings board not re-measured; before-table, random bot (0 everywhere) and full set (quickcheck, one-core, mg-ready-guide all kinds, co-op) NOT yet run — need lead's scaffold merge first.
## Open
- KIT REQUEST KG82_DEMO "cut" filed (KIT_REQUESTS.md); rules picture uses "drag" (tạm), switch one line in jcraft_hoa.js.
- Callers reaching kind hoa: startContest (art "hoa"), Thử tay mgCalRun("hoa"); playArt/lessons map hoa→ve. Full caller scan with lead.
- Shots: iPad rules shot caught the boot cover, redo; shots kept outside git (scratch), not uploaded to CDN yet.
- ART REQUEST (Foreman C): 4 season window views, 6 stems x 4 seasons uncut with bloom, 3 vases (bình men lam), cut-end sprite.
## Handover (if rolled)
Next: merge review/mg-craft (SCAFFOLD READY) into review/mg-craft-hoa, move knobs into lead's block, add cases to dev/test/mg-craft.js, run full tests, upload shots, then SẴN SÀNG KIỂM.

---
# HOA #2 (session_01N1tNP5dR4zbum2tbzNH3qG) — SẴN SÀNG KIỂM c0f9fbbc
START_CTX ~5 % (1M window). PRIORITY #1 CHECK: OD 20/11 ~08:15Z + ~05:10Z | main k91Arrange j91:322 (old, kept for other callers), jwkr.js:75 works wrapper | review/mg-craft 048533ee (scaffold) | claims: lead mg-craft.
Branch review/mg-craft-hoa = **c0f9fbbc** (merged scaffold 048533ee + origin/main 377d5ce3; index/sw rebuilt; quickcheck PASS 523 s).
## Done
- Wiring: `crReg("hoa","ikebana",kcHoa)` (engine renamed hoacraft → ikebana); my 2 re-wire lines removed; rules text (short, season flowers named) lives in `KG82_CRAFT.hoa.how` (j91). Demo still "drag" (tạm) until the kit "cut" motion lands (one line: KG82_CRAFT.hoa.demo).
- BAL: all knobs inside lead's `BAL.mgTier.lev.hoa` {ghost,cutTol,angTol,alike,sway,limStem}; `BAL.mgTier.hoa` (n, thien, k, guest, ang, cut, zero, seat, w, wrong, balTol, judgeMs) stays after mgFx. (Lead's block had overwritten mine on merge order — fixed by editing lead's block.)
- Works caller (j83 bhoa → WKGAME hoa): the old wrapper in jwkr.js only restricts the OLD engine's flowers; ikebana now reads the recipe too: cúc/mai/đào recipe (WKR_FL) = all 3 vases in that flower's season; orchid/peony/mixed keep the shuffle (KCH_RCP in jcraft_hoa.js). Smoke-tested (works recipe r03, engine ikebana, board starts).
- Tests: dev/test/mg-craft.js `KIND_CASES.hoa` (knob block shape, weights sum 1).
## Tests (all on c0f9fbbc unless noted)
- `node dev/test/mg-craft.js dev/index.html 755x1000 --kinds=hoa` PASS 12/12 (startContest, Thử tay, khảo hạch, tuyển chọn, Hướng dẫn ghost hand, no text, ✕, bot ≥9 at ease 5, random far below, old save, own case).
- `mg-craft-hoa.js` 755x1000 + 1180x820 ALL OK (11 ok each). `mg-ready-guide.js` PASS 9/9. one-core guard PASS. quickcheck PASS (core gates, old save, perf). `ag-mgcal.js` all ok. `ag-mg2.js` 1 FAIL = PRE-EXISTING on main (summons board, kinds co/dan; same fail on a main build).
- NOT RUN: mg-back test (review/mg-back not on main yet, no test file); co-op suites (need a worker URL/server) — lead please run coop-thin f6b lane if you have the server. NPC rival boards use the same board via ag-mg2/kitGameVs path (no hoa-specific code).
## Caller scan (kind hoa)
| caller | before | after |
| startContest art "hoa" (hội thi) | rings board k91Arrange | ikebana (rules → Sẵn sàng) |
| Thử tay mgCalRun("hoa") | rings | ikebana |
| khảo hạch exRun / tuyển chọn kcEntryExam | rings | ikebana |
| j83 works bhoa (WKGAME bhoa:"hoa") | rings, recipe via jwkr wrapper | ikebana, recipe via KCH_RCP |
| playArt / lessons "hoa" | map to kind ve (Họa), not hoa | unchanged (not this kind) |
| old engine `arrange` k91Arrange | used by hoa | still registered, now no kind uses it except via jwkr wrapper (safe to drop later with lead's scan) |
## Measure (mg-bots, n=6, skilled / random raw mean; before = main build, rings)
| ease | before skilled | before random | after skilled | after random |
|---|---|---|---|---|
| 0 | 9.33 | 0.53 | 7.07 | 0 |
| 1 | 9.43 | 1.08 | 8.19 | 0.30 |
| 2 | 9.75 | 0.92 | 9.32 | 0.11 |
| 3 | 9.55 | 1.14 | 9.59 | 0.20 |
| 4 | 9.88 | 1.05 | 9.26 | 0 |
| 5 | 10 | 0.76 | 9.76 | 0.17 |
Law 5 holds (7.07 → 9.76, monotone within noise). NOTE for BIG review: old rings gave 9.3 skilled at ease 0; new board gives 7.1 → the hardest ease is harder than before. cal.k.hoa (7.9) untouched per MAIN ROOT-75; owner re-tests. Tune only lev.hoa (cutTol / angTol / limStem ease-0 end) if the tier spread must match the old board.
## Shots (Fold 755x1000@2 + iPad 1180x820@2, looked 3x; rules / Hướng dẫn / play / mid-board / result) CDN img/_review/mg-craft-hoa/
base https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-craft-hoa/ + hoa-rules-755.webp · hoa-rules-1180.webp · hoa-tut-755 / -1180 · hoa-s9-755 / -1180 (3 stems) · hoa-end-755 / -1180 · hoa-result-755 / -1180 (.webp). Rules shot on Fold: the "drag" demo picture is bare (tạm) — becomes the cut motion with the kit request. Play-shot headers say "Đồ nét bút" only because the test opens kg82Open directly; real callers show «Cắm hoa: Hội thi · …».
## OPEN
- KIT REQUEST KG82_DEMO "cut" (filed, KIT_REQUESTS.md); then set KG82_CRAFT.hoa.demo.
- ART REQUEST (Foreman C): 4 season window views, 6 stems x 4 seasons uncut with bloom, 3 vases (bình men lam), cut-end sprite (stand-ins on canvas, listed via crArt/CTM_MISSING_PICS).
- ease-0 harder than old board (see Measure); orchid / peony recipes keep random seasons.
## Handover (if needed)
Nothing pending except answering review. Worktrees /home/user/wt/hoa, /home/user/wt/hoa-old (delete both after verdict).
