PRIORITY #1 CHECK ('odds-cap|kitQuickSub|j77Go'): OD 2 | ledger 0 | claims 8 | main 15 | review/* 2 | archive 23

# odds-cap re-merge (opus worker for Foreman D ROOT) — § FIX ROUND 3

Brief: dev/handover/briefs/DROOT-odds-cap-remerge.md. I read START_CORE, START_WORKER, START_REVIEWER, topic/wording.md, land-d4.md and review-odds-cap-r1.md § ROUND 3. START_CTX ≈ 5 % (estimate).

Branch **review/odds-cap-r2** @ **1c46cd401c48a378861623938f43f289f29384c2** = origin/main 9c58140 + `git merge --no-ff` review/odds-cap-r1 591cedf9. It fast-forwards from origin/main 9c58140. Nothing else is in the commit.

## Conflict resolutions (all hunks; `git show --remerge-diff 1c46cd40` shows exactly these 3 source hunks)
| # | file / place | main (9c58140) | odds-cap (591cedf9) | resolved to |
|---|---|---|---|---|
| 1 | dev/build/jmort.js:44-46 `assign()` | `p.lyF===1&&M.ly` (lyF fix) · `Math.random()*100<M.sudden` | `p.lyF&&M.ly` · `roll(M.sudden)` | main's `p.lyF===1` line + odds-cap's `roll(M.sudden)` line. `roll(o)` = `Math.random()*100<Math.min(o,BAL.odds.hi)`. It has no floor, and M.sudden = 15, so the odds value is the same. |
| 2 | dev/build/j77.js:80 `j77LastWalk` "Đi" option + j77Go | `Chắc chắn · tốn:…` + new j77Go / map-tap-go comment block | `tốn:…` (no typed «Chắc chắn») + the old one-line comment | odds-cap's text without «Chắc chắn» + main's 3-line map-tap-go comment and `j77Go(k)`. The old one-line comment is dropped. |
| 3 | dev/build/j83.js:139 `#mgskip` "Học nhanh" label | `kitParse(kitQuickSub(prac?{sure:1,win}:{win,lose}))` | `kitParse(\`${prac?"":word(od(BAL.odb.j83.odPts))} · thành: …\`)` | **main's line unchanged.** On main, kitQuickSub already gives the od()-derived word, `word(od(BAL.skip.od))`, and gives NO word when `sure`. BAL.skip.od is the ONE quick-roll key. Main **deleted** BAL.odb.j83.odPts (jbal2.js:938 "replaces … BAL.odb.j83.odPts (35 → 40)"), so odds-cap's line would read `od(undefined)`. Main's widget therefore already carries both rules: the word comes from BAL through od()/word(), and nothing is typed. |
| — | index.html, sw.js | conflict | conflict | not picked from either side: rebuilt with `bash dev/site/build_site.sh` (runs assemble.py) |

The rest of the merge is the clean union of main and 591cedf9.

## Odds-cap family scan on the merged tree (main may have added typed words)
| scan | 591cedf9 (round 3) | merged 1c46cd40 |
|---|---|---|
| typed-ladder-scan.py | 14, all non-odds | **14, the same list** (KIT_ODDS j79:192, jdiff/jmgt "Khó", kit-sample demos jkitpage/jksize/jopic) |
| typed «Chắc chắn» in hints | 0 | **0**. The j77 hunk above was the only new one, and it is now removed. The hits left are the "Chắc chắn?" confirm buttons (j6, jcooplobby, j79 kitConfirm, jcloud) and the j84 "Chắc chắn ghi" rename table. |
| odds-cap-scan.py | — | sure-skip 5 · roll at cap 8 · capAt gate 17 · cap option gate 10 · oddsCl 181 (informational) |
| kem-split-scan (Thú tội etc., failure only in BẠI) | 0 / 205 | **0 / 208** (main added 3 'hỏng:' literals, none of them KÈM) |
| capRes 95 floor/cap — odds-cap.js, 200 000 draws per o | PASS | **PASS** (o = 0…100: .05 floor, .95 cap, no dip at 96–99) |

## Gates
| gate | result |
|---|---|
| odds-cap.js (200k capRes) | PASS |
| mg-skip-audit.js | PASS: 21 games / 21 with the kit quick option, odds 40, 0 fails |
| mg-skip.js 755x1000@2 + 1180x820@2 | PASS ×2, no page errors |
| map-tap-go.js fold + ipadAir | ALL OK ×2 (tap = go at once, no toast / undo, blocked = reason toast, no person column) |
| mortality.js | ok, pageErrors [] |
| quickcheck.sh (incl. core gates: one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 5 incl. 40-odds-cap; time-spill guard) | **QUICKCHECK PASS**, CORE GATES PASS, old save loads and plays a buổi |
| perf vs live | The quickcheck random-life medians are noisy: 3 runs → render 263/214, buổi 1495/1106; 6 runs → render 255/235 (+8.5 %), buổi 1373/1262 (+8.7 %). Each run plays a NEW random life, which the round-3 reviewer also flagged. So I ran 16 alternating new/live runs on iPad at 4× CPU, each taking min render of 10 after the first turn: **total new 2160 ms vs live 2254 ms (ratio 0.958)**. The seeding did not make both builds roll the same life, so this is another random-life sample, but it is larger and interleaved. The merge adds no code beyond the three text-level resolutions, and round 3 measured 591cedf9 at +3.8 % on the same saves. → within +5 %. |
| coop-e2e (regression guard) | **63/63** on 1c46cd40, the same as live (63/63, round 3) |
| shots Fold 755x1000@2 + iPad 1180x820@2, LOOKED at | (a) decision card "Bắt gặp" (Tố giác = "Liều" from word(); Giữ làm con bài / Lặng im / Giả như không thấy carry no word); (b) mini-game quick option "Học nhanh": "Khó · thành: tiến bộ một phần, không ra thành phẩm · hỏng: không tiến bộ" (kit widget, word from od(BAL.skip.od)). Also the Thú tội card (BẠI only) and the phá thai card. No overlap, no cut text, figure feet shown, page errors 0, no horizontal overflow. Shots are in scratch only (/home/user/wt/oc-r2-shots), never in git or the CDN. |

## Notes
- The round-3 notes still stand (typed chanceW(40/30/25/20) next to the family; "băng huyết — có thể băng huyết mà chết" repeats itself).
- On the Fold lesson panel the figure column is hidden, while the iPad shows it. That is main's existing layout, not changed here.

SẴN SÀNG KIỂM 1c46cd401c48a378861623938f43f289f29384c2
