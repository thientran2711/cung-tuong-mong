FAIL
1. **BLOCKING (OD:L1288) — the value of "Chờ" is still not equal to the palace years, on the build that ships (main b85cdb1 + entry-exam-r1).** Own dev/measure/kc2val.js, both arms FRESH on review/kc-roads-cn-nc-fix-r1 (two runs of 8 lives per arm, pooled n=16; raw files dev/measure/kc2val-r1rev-a.json / -b.json on the branch; V = kc2val-arm.py):

   | origin | palace V mean (sd) · tier kém/khá/tốt | home V mean (sd) · tier | gap home − palace | run a / run b |
   |---|---|---|---|---|
   | cnv | 337 (45) · 1/13/0 | 292 (20) · 0/5/11 | **−45** (home now worth LESS) | −69 / −23 |
   | nc | 259 (67) · 4/12/0 | 335 (10) · 0/0/16 | **+76** (home worth MORE) | +75 / +78 |
   | muoi (n=8, run a) | 322 (74) | 340 (32) | +18 (ok) | — |

   The worker's "after + entry-exam merged" rows (cnv −27, nc +10) were measured on the older main 92668096; on this main the palace arms moved (cnv palace 316 → 337, nc 323 → 259) and both gaps are outside the spread (nc: twice in a row, ≈4.5 standard errors).
   Where the gap comes from: **cnv** — home always enters at servant step srk 1 (also at tier tốt, 11/16), the palace arm climbs to srk 2–4 and Danh ≈ 96 in the same 22 months; home carry Danh 61. **nc** — the home road reaches the ceiling (Tần) in 16/16 lives (tốt), the palace arm averages rank ≈ 0.6 with 4/16 kém; the nc carry is already tiny (dn 8, sung 10), so the rank alone makes the gap.
   Fix (worker, ONE CORE): cnv — raise the dan carry again (BAL.kcv.dan dn/tin) or let the home tốt tier start one servant step higher, so home ≈ palace; nc — the lever is the home selection, not the carry: BAL.entry.w.nc / base (jbal2, entry-exam's table) so a sensible home player gets a khá/tốt mix (not 100 % ceiling), then re-check. Re-measure with ≥16 lives per arm, both arms fresh on the merged build (main + entry-exam), and also run dev/measure/entry-bots.js for the nc/dan home rows after the change (not run in this review: item 1 already fails on kc2val).

## Items 2–4: PASS
2. ĐƯỢC/KÈM (OD:L908): the worker's 15 fixes hold (kcxscan 88 cards, 0 flagged). **One card missed, fixed by the reviewer:** jkc.js:260 "Sai tỳ nữ nghe ngóng viện …" still had "<maid> thiện cảm -5" under Được → now "· kèm:". kcxscan did not see it (the card is the `S.maid?{…}:{…}` conditional object, not a direct `kcCard({`) — worker: make the scan read that form too. Own grep of every x: text in jkc/jkc2 with a minus/loss word: no other loss in Được.
3. Home family known: dev/test/kc-roads/kin-known.js 8/8 at 755x1000@2 and 8/8 at 1180x820@2. One own-people list (j61 k61Kin in k61Own; jemo emoKnown + j28 trKnown read it) — one place, all home roads. "thái y ???" (jthaiy docName) and "(còn NaN tháng)" (jroute) fixed; route tests show no ???/NaN.
4. Exam seam: jkc kcPhucPlay calls window.kcEntryExam (kind origin, info.phuc 1); with entry-exam merged jentry replaces kcPhucPlay at runtime (kind "kc"), same seam. Fallback playArt now passes occ "tuyen" (entry-exam's line, kept in the merge).

## Merge (branch review/kc-roads-cn-nc-fix-r1 @ 3dba018db78513ff3e2c2e460130b110507919f4 — carries origin/main b85cdb1e AND review/entry-exam-r1 d7364cb2, which also brings mg-balance's jmgt.js)
- assemble.py: main's list (+jmort, jne) + jkc2.js, jentry.js after jkc.js, jmgt.js after j91.js. **The first merge lost jmgt.js** (entry-exam's file) → entry-exam/direct 9/9 FAIL "mgWord is not defined"; fixed in cc68d169. Anyone re-merging entry-exam must keep jmgt.js.
- jbal2.js: main's BAL.psk + entry-exam's BAL.mgTier / BAL.entry both kept. jkc.js kcPhucPlay: branch seam + entry-exam's occ "tuyen". Generated files rebuilt.

## Tests on the merged build (after fixes, one at a time, 0 page errors)
| test | result |
|---|---|
| kc-roads/direct.js 9 origins, 755x1000 / 1180x820 | 9/9, 9/9 PASS |
| entry-exam/direct.js 9 origins, 755x1000 / 1180x820 (shots) | 9/9, 9/9 PASS (before the jmgt fix 0/9) |
| kc-roads/route.js --origin=cnv, nc at 755x1000@2 + 1180x820@2 | PASS (fail lists empty) |
| kc-roads/kin-known.js 755x1000@2 / 1180x820@2 | 8/8, 8/8 |
| measure/kcxscan.js | 88 cards, 0 flagged (+ the missed card above) |
| kc-roads/coop-together.js (live Worker) | 26/26 |
| coop-e2e.js (live Worker) | 59/59 |
| outside/oldsave.js main build save → this build, home save reload, 755x1000@2 | PASS |
| kc2val.js cnv/nc 16+16, muoi 8+8 | FAIL item 1 |
Screens looked at: cnv home stage 755@2, cnv "Hành trang" 1180@2 (Danh +60 = dn 50 × 1.2 tốt), nc "Nhập cung" 755@2 (Tần, rows from kit), entry exam frame tt 755, entry scene nc 755. Kit-only: no new CSS/part in the branch.

## Not blocking (notes)
- "Hành trang" picture at 1180x820 shows blue corner squares around the art (looks like a focus/selection outline) — kit/jkc owner to check; not new in this branch.
- entry-exam/direct shot for tt: the exam frame opens over a "Nhập cung" card that already names "Quý nhân" (the ceiling) behind it — entry-exam's flow, already PASSED there; worth a look by its owner.
- cung nữ palace road: Danh reaches 100 within ~2 years (main balance, also noted by r1).
