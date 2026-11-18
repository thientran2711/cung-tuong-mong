PRIORITY #1 CHECK ('odds-cap|kitQuickSub|j77Go'): OD 2 | ledger 0 | claims 8 | main 15 | review/* 2 | archive 23

# § REVIEW odds-cap-r2: re-merge review/odds-cap-r2 @ 1c46cd401c48a378861623938f43f289f29384c2

Reviewer opus, 18/11. START_CTX ≈ 4 % (estimate). Brief: dev/handover/briefs/DROOT-odds-cap-r2-review.md. I read START_CORE, START_WORKER and START_REVIEWER in full, odds-cap-remerge.md, and review-odds-cap-r1.md § ROUND 3. Verdict branch: **review/odds-cap-r2-rv**.

## 1. Conflict resolutions — PASS
`git show --remerge-diff 1c46cd40` touches only j77.js, j83.js, jmort.js, and the rebuilt index.html / sw.js. No other source hunk differs from the clean union of main 9c58140 and 591cedf9.

| # | place | check | verdict |
|---|---|---|---|
| 1 | jmort.js `assign()` | Keeps main's `p.lyF===1&&M.ly` (the lyF fix) and odds-cap's `roll(M.sudden)`. j1:107 `roll(o)` is `Math.random()*100<Math.min(o,BAL.odds.hi)` with no floor. BAL.mort.sudden is 15, so the value does not change. | both sides kept |
| 2 | j77.js `j77LastWalk` | Keeps main's map-tap-go comment block and `function j77Go(k)`. The "Đi" hint is odds-cap's `tốn: … · thành: …`, with no typed «Chắc chắn». The other j77 «Chắc chắn» removals from 591cedf (accGuestLine, Bái kiến, Vào thẳng, Đi buổi sau) merged cleanly. | both sides kept |
| 3 | j83.js `#mgskip` label | Main's `kitQuickSub(...)` line is unchanged. I confirmed that main removed `BAL.odb.j83.odPts`: there are 0 hits in dev/build except the jbal2.js:938 "replaces … BAL.odb.j83.odPts" comment. j79:522 `kitQuickSub` takes its word from `word(od(BAL.skip.od))`, where BAL.skip.od = 40 (jbal2:943), and gives no word when `sure`. So odds-cap's goal for this line, "no «Chắc chắn» on prac, and a word from BAL on the roll", is already met by main's widget. | both sides kept |

## 2. Family scan on the merged tree (+ newest main) — PASS
| scan | result |
|---|---|
| typed-ladder-scan.py | 14, all non-odds: the same list as round 3 (KIT_ODDS j79:192, jdiff / jmgt «Khó», kit-sample demos jkitpage / jksize / jopic) |
| odds-cap-scan.py | ladder word «Chắc chắn» 0 · typed cl(…,5,95) 0 · raw Math.random()*100< 1 (roll() itself in j1 / all.js) · roll at cap 8 · capAt 17 · cap option gate 10 |
| odds-cap.js capRes, 200k draws per o | PASS: .05 floor, .950 cap at o = 95…100, no dip |
| kem-split-scan (Thú tội etc.) | 'hỏng:' literals 208 · failure items shown as KÈM **0** |

## 3. Newest main merged + gates
- I merged origin/main a2ad2401 (land-d4 2, 3) → 8ea381cc. Only index.html and sw.js conflicted, and I rebuilt both with build_site.sh. I ran every gate below on 8ea381cc.
- Main then moved to **36e574fa** (land-d4 4, staff-cap-row3). Its diff from a2ad240 touches tests only: 6 files under dev/test.
- I merged it → **e3f833ce**. dev/build, index.html and sw.js are byte-identical to 8ea381cc, so the gate results carry over.
- e3f833ce fast-forwards from origin/main 36e574fa.

| gate | result |
|---|---|
| odds-cap.js | PASS |
| mg-skip-audit.js | PASS (21 games / 21 with the kit quick option, odds 40, 0 fails) |
| mg-skip.js 755x1000@2 + 1180x820@2 | PASS ×2, page errors 0 |
| map-tap-go.js fold + ipadAir | ALL OK ×2 |
| mortality.js | pageErrors [] |
| quickcheck.sh --runs 6 (6 interleaved new/live pairs) | **QUICKCHECK PASS**: CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 5), TIME-SPILL GUARD PASS, old save loads and plays a buổi. Medians new/live: render 191/193 ms · tab 399/457 · buổi 1020/1056 · tasks>200 ms 17/17, within +5 %. |
| coop-e2e (regression guard) | new 8ea381cc **63/63** · live a2ad2401 **63/63**, the same |
| shots Fold 755x1000@2 + iPad 1180x820@2, LOOKED at | (a) "Bắt gặp" decision card: Tố giác shows «Liều» from word(). Giữ làm con bài / Lặng im / Giả như không thấy show no word, only ĐƯỢC / TỐN / GHI CHÚ. BẠI is in one row. (b) Mini-game quick option "Học nhanh" on Đàn: Học Cầm: «Khó · thành: tiến bộ một phần, không ra thành phẩm · hỏng: không tiến bộ». This is the kit widget, and the word comes from od(BAL.skip.od) = 40. No overlap, no cut text, feet shown (iPad lesson figure and the Fold decision figure), page errors 0, no horizontal overflow. Shots are in scratch only, never in git or the CDN, and are deleted. |

## Notes (not FAIL)
- The Fold lesson dialog hides its figure column, while the iPad shows it. This is main's existing layout.
- The round-3 notes still stand: typed chanceW(40/30/25/20) next to the family, and "băng huyết — có thể băng huyết mà chết".

PASS e3f833ce5bbd5556ca5516e5f5dc3ac787cc2109

## Final merge for landing (Foreman D #1 asked, 09:08Z)
Main moved to 33e98993 (fullbody-frame-s2, scroll-cue-scan; on top of 36e574fa). I merged it into review/odds-cap-r2-rv → **5cbfd620**.
- Only index.html and sw.js conflicted; I rebuilt both with assemble.py and build_site.sh. No odds source file overlaps.
- typed-ladder-scan 14 (the same list) · «Chắc chắn» 0 · typed cl(…,5,95) 0 · odds-cap.js PASS.
- quickcheck --runs 6: **PASS** (core gates PASS, old save ok). Medians new/live: render 198/200, tab 443/447, buổi 1014/1203.
- coop-e2e 63/63, the same as live.
- origin/main was re-checked right before sending: still 33e98993. 5cbfd620 fast-forwards from it.

LAND READY 5cbfd620ff7a16f6f974cad3ab5e8c20e38bed1c
