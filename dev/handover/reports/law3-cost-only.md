PRIORITY #1 CHECK ('Theo hầu trọn buổi' / cost-only): OD 0 | ledger 0 | claims 1 (choice-value-audit, Foreman D) | main j68g.js:9-11 templeRite, j24.js:28 Kẻ hầu xin, j8.js:303 ksp | review/choice-value-audit 37a7342f (D: fixes j24 «Từ chối» + 60 cost-only rows) | archive 0 — reused D's scan dev/tools/choice-value-scan.js (not committed here; it lands with D).

# law3-cost-only — worker report (opus, session_01N1tNP6PHnsEVwUKbZMrXkQ; coordinator Foreman B ROOT-3)
START_CTX ~4 % (estimate). Branch **review/law3-cost-only** sha **770270f2** (base origin/main b1c3631e). SMALL.

## STEP 0 — the 4 named rows are NOT open data faults
| row (opt-card-short #10) | real data on main | verdict |
|---|---|---|
| Chuyện trong cung «Theo hầu trọn buổi» Sức −8 / Được không | j68g templeRite: c:{suc:-8}, w:{th:+6, duc:+1} | data HAS a gain. Card (show-all) Được «Thái hậu → ta: thiện cảm +6 · Đức +1». «Được không» = DISPLAY (event card) |
| «Cúng dầu đèn hậu hĩnh» Bạc −15 / Được không | c:{bac:-25 → shown −15}, w:{th:+4, duc:+2} | same, DISPLAY |
| «Cáo bận việc cung» không / không | w:{suc:+2}, kèm Thái hậu −3 | gain + loss; in play its hint reads «dưỡng sức; nhưng mất lòng bề trên». DISPLAY |
| Kẻ hầu xin «Từ chối» (only lòng −10) | j24:28 x «lòng −N» only | REAL fault, **D's** (review/choice-value-audit: «thành: giữ lại BAL.cv.servAsk lượng bạc») — left to D |

## WHOLE-GROUP SCAN (D's choice-value-scan, 100 turns, PEND 225 builders)
| build | COST-ONLY | HINT-NO-GAIN | DOMINATED |
|---|---|---|---|
| main b1c3631e, seed 7 | 28 | 44 | 45 |
| D head 37a7342f, seed 7 | 0 | 0 | 0 |
| D + main merged (scratch, never pushed), seed 7 | 3 | 0 | 0 |
| D + main + THIS branch, seeds 7 / 11 / 23 / 31 | 0 / 0 / 1 / 1 | 0 | 0 / 0 / 1 / 0 |

Rows left after D (only these two are new, from main code D does not have yet):
1. j8 PEND.ksp «Tắm gội chờ giá» (x «chuẩn bị thị tẩm» → main's kit puts it in Ghi chú, Được empty) → FIXED here: x «thành: được thị tẩm, gần Hoàng thượng đêm nay» (word gain, no number).
   MERGE NOTE: D rewrites j8.js:305 («Cáo bệnh»); this branch changes j8.js:303. Line 304 untouched between → git merges clean (tested: cherry-pick onto the D+main merge, no conflict).
2. dev/test/opt-card-scan.js:25 demo pair (new on main, D lacks the file) «Từ chối khéo rồi lui về cung» Bạc −10 → FIXED: symmetric pair Sức −3 → thân +3 / Sức +3 → thân −3 (same as D's fixtures).

Still flagged after this branch — both are D's DATA rows that main's kit (opt-card-short kitOptFinal) renders wrong; NOT data faults, for D's lander / the display owner (odds-meter-back, C-AG):
- jtsb.js:232 «Khéo từ chối» (seeds 23, 31): D's fx {suc:BAL.cv.rest} + x «thành: … · Mất: thiện cảm −5». Main's kit turns «Mất:» into a Bại row and the card reads Tốn không / Được thiện cảm −5 (red). Fix suggestion for D on merge: «kèm:» instead of «Mất:».
- jreign c1a «Chỉ lặng lẽ mài mực» (seed 23): its wx word «không dính vào chính sự» is not shown on main's kit, and Sủng +2 → +1 on scaling → dominated by «nhẫn nại» (Sủng +1 Đức +1).

## DISPLAY FAULT FOUND (for odds-meter-back / C-AG, not touched here)
Fold 755x1000 in-play, lật thẻ dialog: «Tắm gội chờ giá» card is grey and reads Tốn «không» / Được «không» EVEN WITH the new «thành:» gain (kitOptFinal fills Được from the hint only when the hint row exists at that moment); «Cáo bệnh» shows «nhường đêm» under Được (a loss word as a gain), and sure c6 options (no p) carry «có rủi ro» + «Bại: Tốn công, không được gì». The opt-card-short #10 «Được không» on templeRite is this same display path.

## GATES
one-core-guard PASS (fails 0) · one-core-bind PASS · quickcheck PASS (old save ok, core gates PASS, perf ≤ live) · coop-e2e 63/63 PASS.
Fold + iPad shots: NOT DELIVERED — my shot script kept catching the loading / reward overlays, and the one clean Fold shot of ksp shows the display fault above (Được «không»), so it is no proof of the fix; templeRite has no code change. Reviewer: the in-play card of ksp needs the C-AG display fix before a shot can show the gain.
Wording (law 7): «thành: được thị tẩm, gần Hoàng thượng đêm nay» — cổ trang, no %, no number.
