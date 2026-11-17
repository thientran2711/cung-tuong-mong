# review one-core-jkc r1 — PASS review/one-core-jkc-r1 9f3c96854

PRIORITY #1 CHECK ('jkc' / 'kap text-rule'): OD ONE CORE OD:L1267 + OD:L585 | ledger #48/#57/#165 | main 7e0250ec (jkc.js kap cuts typed) | review/* review/one-core-jkc 84129fa23 (under review), review/one-core-jkc-2 (successor, RUNNING, CLAIMS:838) | claims CLAIMS:837 = this session. Reused: dev/measure/one-core-text-rule.js (worker's scan, widened), dev/measure/one-core-dup2-same.js, dev/tools/quickcheck.sh, dev/test/outside/route.js.
START_CTX ≈ 3 % of 1M (estimate) → rollover 28 %, ceiling 60 %. Not reached.

Reviewed: review/one-core-jkc 84129fa23 (base ce29592e1). Result branch **review/one-core-jkc-r1 9f3c96854** = 84129fa23 + merge origin/main **7e0250ec** (6e4a60ef3) + reviewer fix (9f3c96854). Ancestor of origin/main 7e0250ec: yes (fast-forward-able).

## Verdict: PASS 9f3c96854

## 1. Tiểu thư kap cuts → BAL.kc2.st.kc
- Every S.kap rule in jkc.js reads a key: moi 40 (suitor roll jkc:320, top-bar row jkc:572), hot 60 (×5 red cut), mien 50 (jkc:421 + tổ mẫu chiêu jkc:733), nhan 70 (jkc:412), dinh 90 (jkc:321). `grep 'S\.kap *[<>=]=\? *[0-9]' dev/build/*.js` → 0 hits game-wide.
- Both texts print the same keys: HX.kap (jkc:47) and KIT_GLOSS «Áp lực hôn sự» (jkc:596) = «Từ ${moi} bà mối bắt đầu tới nhà; tới ${dinh} cha định hôn». Seen in page: Fold 755x1000@2 help card «Từ 40 bà mối bắt đầu tới nhà; tới 90 cha định hôn» (Ta đang có 45); iPad 1180x820@2 gloss pop same words. Cổ trang, no %, VANPHONG ok.
- No rule changed value: every old literal equals its key value (diff read line by line; dup2-same proof PASS, §3).
- jkc vs jkc2: jkc2 keeps kapHot 70 / kapRow 50 (Nợ nhà / Phe chủ chiến = another rule, other values); no rule has two keys. Note: miễn tuyển girl → cha định hôn at Sơ tuyển with Áp lực ≥ mienSo 85 — an event, not the monthly cut; the text «tới 90» stays true for the monthly rule.

## 2. Text family (whole game)
- Worker's j79 Sức fix is the TEXT moving to the rule: old gloss «Dưới 20» vs live rule can()/whyTime BAL.time.sucMin = 5 (jbal comment confirms the j76/j80 hotfix); rule untouched. Other moves (Lòng 45, Chủ tin 10, accNeed 2/4, ngọc bội 15, coldEv 2, sinh thần 50, j30, j42, j10, j85, jts, jveil, weather, poison, Sức locks) read line by line: rule and text now read one key, same values.
- **Gap found (fixed by reviewer)**: the scan was a measure script only. Planted typed numbers PASSED every gate (one-core-guard + one-core-text): A «Dưới 5» (typed = rule), B «Dưới 7» (wrong), C gloss typed 40/90, **D HX.kap «tới 85» = the owner's exact old fault**, F «Danh từ 45». And the scan itself missed phrase forms E «Áp lực 60 thì …, 85 thì …», G «chạm mức 77», H «Sủng chừng 33 trở lên», I «Đức 80 trở lên».
- Fix 9f3c96854: (a) scan widened: «mức / chừng / ngưỡng N», «N trở lên / trở xuống / thì» (worked examples «Đức 10 thì +8» skipped) → 0 new hits on the game; (b) new gate **dev/test/one-core-text-rule.js**, wired in dev/tools/coregates.sh G1 (runs in every quickcheck): FAIL on any DIFF, or TYPED beyond the frozen «thiếu bạc (cần N)» family (14, per module, may only shrink — that family is the successor's item §6.1, review/one-core-jkc-2).
- Plant retest with the gate: A B C D E G H I → all **FAIL** (caught). Clean tree → PASS {DIFF 0, TYPED 14 = frozen}.
- Still not covered (say so): a number with no stat word nearby, or a stat word the WORDS table lacks; amounts (+N/−N) are the guard's fx kind (successor §6.3).

## 3. jkc hst / oan / odb → BAL
- Guard jkc hst/oan/odb = 0/0/0; baseline 4957, inlineNow 4956 after the main merge (only shrinks).
- `node dev/measure/one-core-dup2-same.js origin/main` on r1 → **PASS, 23 modules, 203 refs, 0 fails**; intended list = only word functions (jkc HX/GLOSS 60/85→40/90, j79 Sức 20→5, j8/j19/j20/jinv getters, jpoison/jweather tables). Getters checked: A() keeps the object (get x evaluated at read), IT.ngocboi d getter/setter keeps jinv's override.
- Plant on the guard: od(45+…), roll(40+…), S.kap+=4, S.kap>=90, x.oan+=7 in jkc.js → guard **FAIL** each («NEW inline rule number … jkc.js [oan] .oan+=7 (0 → 1)»).

## 4. Merge main 7e0250ec
31 main commits; code auto-merged (j10, j14, j42, jbal, jbal2, jts read: no overlap in meaning); only CHANGE.txt (both lines kept), index.html, sw.js conflicted → site rebuilt.

## 5. Tests on r1 (9f3c96854 / 6e4a60ef3)
| gate | result |
|---|---|
| one-core-guard / one-core-text / one-core-bind / one-core-text-rule (new) | PASS 4956≤4957 / PASS / PASS 886 prints / PASS |
| quickcheck (build own, G1–G5 incl. rules-one-source, kit-conform, coop-one-world, time-spill, old save, perf) | **PASS** 327 s; render 174/167, tab 291/328, buổi 901/928 ms |
| outside/route.js --origin=tt Fold 755x1000@2 + iPad 1180x820@2 | all steps ok, 0 page errors, no overflow / cut; only fail «Danh carry-over 32/31» |
| same route on main 7e0250ec (Fold) | **same only fail «Danh carry-over 31»** → pre-existing, not this branch |
| road-end | 51/51 |
| coop-e2e | 63/63 first try |
| look (Fold + iPad) | help HX.kap, gloss «Áp lực hôn sự», gloss «Sức» («Dưới 5»), «Lòng»: right words, kit help card / kit pop, no cut |
Shots: scratch /home/user/wt/rjkc-out (deleted after verdict); none in git, no CDN folder used.

## 6. For Foreman B
- Land review/one-core-jkc-r1 9f3c96854.
- review/one-core-jkc-2 (locks): when it lands, the frozen counts in dev/test/one-core-text-rule.js FROZEN go down to what is left (the gate fails only on growth, so a smaller list still passes; trimming FROZEN keeps it honest).
- «Danh carry-over ≤ 30» route fail is on main too: needs its owner (cap or test stale).
