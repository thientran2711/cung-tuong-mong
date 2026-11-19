PRIORITY #1 CHECK ('Theo hầu trọn buổi' / cost-only): OD 0 | ledger 0 | claims 1 (choice-value-audit, Foreman D) | main j68g.js:9-11 templeRite, j24.js:28 Kẻ hầu xin, j8.js:303 ksp | review/choice-value-audit 37a7342f (D: fixes j24 «Từ chối» + 60 cost-only rows) | archive 0 — reused D's scan dev/tools/choice-value-scan.js (not committed here; it lands with D).

# law3-cost-only — worker report (opus, session_01N1tNP6PHnsEVwUKbZMrXkQ; coordinator Foreman B ROOT-3)
START_CTX ~4 % (estimate). Branch **review/law3-cost-only** sha **ae218b59** (final merge origin/main c12a5878; quickcheck PASS again, one-core PASS; fix commit 2d343c18). SMALL.

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

## REVIEW r1 (sonnet reviewer) — READY FF ae218b59
PRIORITY #1 CHECK: OD 0 | main j68g.js:9-11, j8.js:303 | review/* choice-value-audit 0ef41d47 | claims: worker session_01N1tNP6PHnsEVwUKbZMrXkQ.
ae218b59 already descends current origin/main c12a5878 (no new r1 branch needed). Diff vs main = j8.js:303 + opt-card-scan.js:25 + regenerated index.html/sw.js only.
1. STEP 0 TRUE: j68g templeRite rows have gains in data (th+6/duc+1, th+4/duc+2, suc+2); «Được không» is display only. Kẻ hầu xin «Từ chối» is D's.
2. Scan: branch alone = 25 COST-ONLY (D's set, expected). D 0ef41d47 + main + this branch (scratch merge; only conflicts = generated index.html/sw.js and jbal.js adjacent additions, both blocks kept), seed 7, 40 turns: COST-ONLY 0 / HINT-NO-GAIN 0 / DOMINATED 0, page errors 0. (100-turn run crashed the browser twice, box limit, not the code.)
3. j8:303 «thành: được thị tẩm, gần Hoàng thượng đêm nay»: real gain (law 3), word-only so no typed number (law 4), cổ trang no % (law 7), siblings are word-gain/safe roads (law 2 ok). D's j8:305 merges clean (git auto-merged j8.js).
4. opt-card-scan.js:25 test-only, symmetric Sức ∓3 / thân ±3 pair, sound.
5. Gates: one-core-guard PASS (fails 0); quickcheck PASS (old save ok, core gates PASS, perf buổi 1246/966 ms, tasks>200ms 22/18 — within gate); coop-e2e 63/63 (run on scratch merge incl. this branch).
6. Shots Fold 755x1000 + iPad 1180x820 of ksp (taken behind the «Rương đồ khuê các» loading overlay, dimmed): card «Tắm gội chờ giá» shows Tốn «không» / Được «không» in show-rows mode; in-play event card (text dump, hint mode) shows Gợi ý «được thị tẩm, gần Hoàng thượng đêm nay!», Tiến cử/Cáo bệnh hints correct. Display fault (Được «không» while the gain exists) = C-AG odds-meter-back, not failed here.
Shots were scratch only (/tmp), none on CDN, nothing committed.

## REVIEW r1 re-merge (live main fd6118cd incl. odds-meter-back f43a2ba6) — READY FF 55bced98
review/law3-cost-only-r1 = ae218b59 + merge origin/main fd6118cd (only index.html/sw.js conflicted, rebuilt by build_site.sh); diff vs main = j8.js:303 + opt-card-scan.js:25 + index/sw.
Gates: one-core-guard PASS (fails 0) · coop-e2e 68/68 · quickcheck PASS run alone (old save ok, buổi 1453/1292 ms). A first quickcheck run in parallel with coop-e2e + shots FAILED perf (buổi 4306 ms) = CPU contention, reran alone PASS.
Shot ksp (Fold 755x1000, clean): «Tắm gội chờ giá» = Nắm chắc meter, TỐN «không», ĐƯỢC «được thị tẩm, gần Hoàng thượng đêm nay» (green frame) — the real gain now shows. Tiến cử / Cáo bệnh cards also show Tốn red + Được. iPad 1180x820: same rows, shot dimmed by the loading overlay but readable. Display fault gone with odds-meter-back. Shots scratch only, none on CDN.

## REVIEW r1 re-merge 2 (live main 7fb7c104, E ge-writers-w2) — READY FF 6abe9a6f68aa54689b83dc7dcbb4afeb732dd138
review/law3-cost-only-r1 = prior + merge origin/main 7fb7c104 (only index.html/sw.js conflicted, rebuilt). Diff vs main unchanged (j8.js:303 + opt-card-scan.js:25 + index/sw). one-core PASS · coop-e2e 68/68 · quickcheck PASS (buoi 1118/1067 ms). No shot rerun (j8/kit output unchanged by the merge).

## REVIEW r1 re-merge 3 (live main 2c5dd554) — READY FF 0da8d4164fe514930cf98cc0e466f100014a8d80
review/law3-cost-only-r1 = prior + merge origin/main 2c5dd554 (only index.html/sw.js conflicted, rebuilt). Diff vs main unchanged (j8.js:303 + opt-card-scan.js:25 + index/sw). one-core PASS · coop-e2e 68/68 · quickcheck PASS.

## REVIEW r1 re-merge 4 (live main 4217568a, odds-no-unknown touches j8.js) — READY FF 8dfb81440e09c997d06903a5bc788ab6a2ad7116
review/law3-cost-only-r1 = prior + merge origin/main 4217568a (only index.html/sw.js conflicted, rebuilt; j8.js merged clean, j8:303 «thành: được thị tẩm, gần Hoàng thượng đêm nay» still present). Diff vs main unchanged. one-core PASS · coop-e2e 68/68 · quickcheck PASS (buoi 948/1212 ms) · opt-card-scan ran (report-only, no gate exit; its «man» case prints a FIG FAIL gap line, not touched by this branch).
Shot ksp Fold 755x1000 + iPad 1180x820 (dimmed by loading overlay, readable): «Tắm gội chờ giá» = odds rung «Nắm chắc» + meter, TỐN «không», ĐƯỢC «được thị tẩm, gần Hoàng thượng đêm nay»; Tiến cử and Cáo bệnh show their rung + Tốn/Được. Scratch only, no CDN.

## REVIEW r1 re-merge 5 (live main f3114755, newer than 98f9f0f1) — READY FF 3e1f234c09b29ecf247aea77d245c224f296ced5
review/law3-cost-only-r1 = prior + merge origin/main f3114755 (only index.html/sw.js conflicted, rebuilt; j8:303 gain still present). Diff vs main unchanged. one-core PASS · coop-e2e 68/68 · quickcheck PASS (buoi 1358/1299 ms). Descends main re-fetched just before reporting.
