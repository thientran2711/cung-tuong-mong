# stage-rightcol — branch review/stage-rightcol 5f00b0c (depth 2)
PRIORITY #1 CHECK: OD Chí tôn 4 + Cung nhân 9 + place banner 18/11 ~02:50Z/~03:02Z + ~20:55Z | main jk3 k3court/k3maid, jplst #kpname, j59chips | review/* maid6-sample eb73871 (mock), stage-here (not touched) | claims maid6-sample -> this worker.

## Done
- KIT PART `kitGroupFold(key,label,n,items)` (jk3.js; KIT.md §31.2b + kit sample §31.2b; replaces kitCrewPlaque): closed row «Label · N ›» no faces; tap = person cards drop down in place, one open at a time (`window.__kgfOpen`, kept per session).
- Column order (stage host): «Cung nhân · N» (personal maid + S.staff maids/eunuchs, face+name+Lòng, tap = Cung nhân tab) → «Chí tôn · 3» → Ân sủng → Nguy hiểm chung. Dư đồ map grid (jmapc) left on the old chips (not in scope; follow-up if wanted).
- Place name: plain text on the picture, no frame/not fixed-width, 2 lines (hall / palace; 1 line when a place has one name), shadow token `--kts` (also used by figure name tags); column shifted down by --kpnh.
- "+N people" chip corner: j59chips sets `--kgrb`; column max-height subtracts it → overlap 0 px.
- Fixed while testing: personal-maid chip showed a garbled value (hud text) → now S.maid.loyal.
## Test
`node dev/test/stage-rightcol.js <out>` (needs built index.html): Fold 755x1000@2 + iPad 1180x820@2 × 1 / 6 servants (rank 6) × closed / Cung nhân open / Chí tôn open × places home + Ngự hoa viên = 24/24 PASS: chip overlap 0, name over column 0, name/column over figure body 0, closed column never scrolls, name ≤2 lines, no frame on name, no cut text, 0 page errors. Open Cung nhân with 6 on iPad scrolls inside the column (by design, capped above the chip). Not run: old-save load, quickcheck, phone sizes (not a separate path; only column + name layer touched).
Shots: dev/handover/shots/stage-rightcol/ (8 jpg), each looked.
## Caveat
Open list shows "Thiện cảm" label (existing module rewrites "Lòng"). Entry-line chip at top (jplst) is untouched.
~85% xong / ~85% chơi được
