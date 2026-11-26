# D-SELX-FAIR review (BIG, opus) — worker sha 8c56b83e → review sha c7594222 (review/selx-fair)

PRIORITY #1 CHECK ('ban hoa|selx'): OD 24/11 ~05:40Z (ban hoa = life ends), ~06:15Z (12 tú nữ, TOP 4 kept), ~06:20Z (only the 3 tests count), 23/11 ~23:47Z (c) (mini ½ · đối đáp ¼ · hành xử ¼) | main jselx.js selxContest/selxResult, jselxday.js selxContestRun, jbal2.js BAL.selx | review/firstcard-2-rv de123ff3 (base, own BIG PASS) | claims none. Brief: briefs/D-selx-fair-srv-rank-2611.md «D-SELX-FAIR»; worker report reports/selx-fair.md.

**VERDICT: PASS c7594222** — = worker 8c56b83e + LIVE b881686f. LIVE moved from aa37de21 to b881686f (act-merge-ALL) during the review; no source file overlaps this branch (only index.html / sw.js / assets.json conflict). The reviewer made the same merge locally (1e43a5e3, not pushed) and ran every gate on it; the worker pushed its own merge c7594222 at the same time. `git diff 1e43a5e3 c7594222` = ONE line, the build-info line window.CTM_BI «c» text in index.html — the code is byte-identical, so the gates below hold for c7594222. FF on LIVE b881686f checked with `git merge-base --is-ancestor`.

## Reviewed commits
9e6accf1 (result display, family), 04c1b44e + cdeb0d91 (BAL.selx.w), db660d0e (npc-purpose row), c1b2350a / 8c56b83e (rebuild, LIVE merge). de123ff3 FIRSTCARD-2-rv is in the diff with its own BIG PASS; read again for breakage only.

## Laws
- **Law 1 (two-way, same rule for all) — PASS.** `BAL.selx.w` is read by `selxScore` for her AND every girl (selxW()); only the weights change: duc .15→.05, tai .1→.15, mini 1.5→2, dd .75→1, hx .75→1 (sac .15, imp .45, base 20, noise 3 unchanged). Root cause checked: her fresh Đức is 30 every start while the girls draw on the consort scale (~48), so a high Đức weight alone pushed an average player under the base rate 4/12.
- **Law 4 (one core) — PASS.** All numbers in BAL (`BAL.selx.w`, `BAL.selx.yard`, new `BAL.kc2.soNeed=3` replaces the typed `sc>=3` in kcSoOk). The ending/podium/kept lines read `selxCut()` = one record built from the same contest list.
- **Ratio OD 23/11 (c) — PASS.** mini 2 : dd 1 : hx 1 = ½ · ¼ · ¼.
- **Law 16 — PASS.** `BAL.selx.yard` stays {n:12, kept:4} (owner «4 cô điểm cao nhất»); the brief's «giữ 6» example was correctly NOT applied.
- **Fairness (brief item 2) — PASS.** Reviewer rerun `node dev/measure/selx-tune.js 150` (kept-rate; old = same build with the old w as override):

| profile | old | new | new by Tài <50 · 50-69 · 70-84 · 85+ |
|---|---|---|---|
| skip («Cúi đầu chờ xét») | .25 | .50 | .29 · .48 · .76 · 1.00 |
| fair (board «Giỏi») | .53 | .75 | .55 · .77 · .97 · 1.00 |
| good («Giỏi» + valued answers) | .87 | .97 | .92 · .98 · 1.00 · 1.00 |
| best | .97 | 1.00 | 1.00 all |

Worker table (.18/.42/.78/.97 → .45/.83/.99/1.00) is inside the noise of mine. `selx-fair.js 15` (full card-by-card days): kept .67/.73/.87/.93, told .56/.87/.72/.97, cut score p10/p50/p90 62/67/69, 0 page errors — same shape as the worker's 30-life table. Judgement: a careless low-Tài life can still be cut (~70 % cut at Tài<50 skip); playing the board well is kept as a norm; Tài helps monotonically. Acceptable. Note for the foreman: an average girl who only bows now has ~½ (base rate ⅓) because her art level is above the NPC mean mark — intended by the owner's "good play is not cut as a norm", not a law break.
- **Law 7 (cổ trang, true odds) — PASS.** Hall card «Điện tuyển»: «Tổng quản dặn: mười hai tú nữ cùng thi ba phần, chỉ bốn người phần cao nhất được giữ, người còn lại bị ban hoa, kiếp này dừng. Cơ ta được giữ, nếu dâng tài nghệ đúng sức mình: [oddsChip]» — `oddsChip(word(selxOddsP(entSkipRaw())))`, selxOddsP = the same selxContest Monte-Carlo as the result (missing dd/hx marks → BAL.selx.mark.mid, i.e. "her own level"). Seen live: Mong manh / Vững / Rất vững on different lives. Test cards stay bare (§93.7). Kept card «Ban hương nang»: words only («Ta đứng thứ nhất trong mười hai người, được bảy mươi mốt phần; mốc được giữ là sáu mươi chín phần (người thứ tư).»). selx-days «no digits in the scene text» PASS. Digits only on the podium (existing «N phần» chips) and on the ending kit rows («Điện tuyển: Hạng 9/12 · giữ 4 · 60 phần · mốc giữ 66 phần»), same as other result rows. Điện tuyển «Trả thẻ bài»: «Cơ giữ thẻ lúc ấy: [oddsChip(word(T.p))]» with T.p = kcDienSel = the very p rolled — true chance.
- **Law 9 (kit) — PASS.** Only existing parts: oddsChip meter, kitPodiumShow `sub`, card `<p>`, deathChain kit rows. No new CSS/frame.
- **Law 11 (whole family) — PASS.** Life-ending trials with a result: (1) 3-day contest (selxContestRun), (2) direct contest (selxSelDo, `if(!ht)` so a hòa-thân princess gets no cut record and is never ban hoa), (3) Sơ tuyển (kcSoGo → kcTrialW names the five points, the met ones and soNeed), (4) Điện tuyển (kcDien → score, keep line KC.cut[0], keep chance). Odds BEFORE: (1) new hall chip, (2)/(3)/(4) FIRSTCARD meters. Mid-game tuyển tú (j27) is not her trial; princess Lễ ra mắt never ends the life. firstcard-scan --fail: TOTAL 39 hidden-roll · declared 38 · own odds 1 · NOT TOLD 0.
- **Law 12 (two devices) — PASS.** See real-tap below.
- Laws 2/3/5/6 — n/a (no new choice; ban hoa = life ends unchanged by owner rule).

## Gates
| gate | 8c56b83e (worker) | 1e43a5e3 ≡ c7594222 code (final) |
|---|---|---|
| selx-rules | ALL PASS | ALL PASS |
| selx-wire | ALL PASS | ALL PASS |
| selx-days | ALL PASS | ALL PASS |
| firstcard-scan --fail | NOT TOLD 0 | NOT TOLD 0 (39 · 38 declared · 1 own odds) |
| npc-purpose-scan | PASS 419 rows | PASS 419 rows |
| coop-e2e (CO-OP FIRST) | 143/143 | **143/143** |
| quickcheck part 2 (open · old save · perf) | PASS (alone: open 1906 ms, old save ok, render 246/201, tab 487/468, buổi 1238/1345) | PASS (open 1906 ms, old save ok «Đậu Thục Hoa» buổi ok 0 errors, render 196/180, tab 560/491, buổi 1116/1146) |
| quickcheck core gates | FAIL only G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» Fold + iPad | FAIL only the same G4 80-dialog-fixed 2 cells (pre-existing) |

Pre-existing, verified by the reviewer on LIVE aa37de21 itself (`quickcheck.sh aa37de21`, own worktree): the SAME 2 G4 80-dialog-fixed FAILs; also the non-gating button-crawl «Ô lưu · Lui close button did not close its layer» (fold) and look-dedupe FAIL 5 (branch: 3). Not from this branch. NOTE: my first branch quickcheck read perf tab 568 vs limit 560 only because my real-tap runs were running at the same time; rerun alone = PASS.

## Real taps + videos
- Worker CDN videos branch-fold/ipad + live-fold/ipad.mp4 looked at (frame sheets): hall card with the keep chip, podium, ending rows on the branch; LIVE has none. The 6 stills named in the order (*-the-dien-tuyen / *-podium / *-ket-cuc-rows.png) are NOT on the CDN (404) — reviewer made own shots instead.
- Reviewer real-tap (Playwright mouse taps on visible kit buttons, fresh tú nữ life tt / dtq, «Vào cung ngay», «Cúi đầu chờ xét» at the board), Fold 755x1000 + iPad 1180x820, 8 lives: hall card (chip Mong manh / Vững / Rất vững), podium title «Điện tuyển · Giữ bốn người phần cao nhất · mốc giữ 67 phần», kept card (place 1, 71 vs cut 69 in words), ban hoa ending rows «Điện tuyển: Hạng 9/12 · giữ 4 · 60 phần · mốc giữ 66 phần» + «Phòng được: …». All fit, no horizontal overflow, 0 page errors. Natural results: 2 kept, 4 ban hoa at place 5–11 with score within 2–7 of the cut (plus 4 forced losses).
- Old save: quickcheck loads a LIVE save and plays a buổi (ok, 0 errors). S.selx2.cut absent on old saves → deathChain skips the row (guarded).
- Shots kept in reviewer scratch only (never committed); CDN folder not wiped (foreman wipes after landing).

## Side notes for Foreman D (not this branch, pre-existing on LIVE too)
0. quickcheck «selection rerolls» on the final run = 20 (earlier runs 10 / LIVE 11): the robot hit more ban hoa lives on that run; non-gating, random seeds. G4 80-dialog-fixed was re-verified on LIVE aa37de21 (b881686f adds act-merge only, no dialog code from this branch).
1. Ban hoa ending card shows «Quý nhân» above her name and «Phẩm cao nhất: Quý nhân» for a girl who was sent home (same on live-fold.mp4). Law 6/7 wording — worth a ticket.
2. Build-info line on c7594222 ends «…trọng số phần thi (BAL.sel…» — a code token in the CHANGE text; if CTM_BI «c» is shown to the owner, keep it plain Vietnamese next time (nit, no FAIL).
3. Kit podium screenshot mid-animation shows only one place card at a time — that is the kit reveal, fine.

LAND READY review/selx-fair c7594222 (FF from LIVE b881686f)
