# review-tut-quests-r1 (reviewer, opus) — review/tut-quests @ 36e7b0e6

Branch reviewed: `review/tut-quests` 36e7b0e6, merged onto origin/main f1509d7c on `review/tut-quests-r1` (assemble.py conflict:
main's list (+jcoopone, jlag2) + jtq14 after jact; generated index.html/sw.js/assets.json rebuilt with build_site.sh).
Rules read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER, OD:L1233, L1242, L1259, L1271, L1272, L1432, L1447 (CO-OP FIRST).

## Owner words vs build
| rule | check | result |
|---|---|---|
| OD:L1233 DO the task, reward only when done | every quest counts a real deed through the game's own functions (runOpt act cards, goTo, wear/wdWear, sellItem/wkSell/econSell, buy/kitShop onBuy, runAct to a consort, addArt/addVir progress > 0, srvStaffAct); opening a tab/screen counts nothing; Bạc paid only in note() when the deed lands | OK |
| OD:L1242 no skip-with-reward | chapter reward needs milestone AND every quest (msDone67/tq14Real); time-out «Lỡ dịp» pays nothing (test) | OK |
| OD:L1259 part of the story | chapter-open "Lời dặn" + per-quest "why"/"ok" lines tie each task to her first months (consort / maid wording differ) | OK |
| OD:L1271 person pop-up = full figure left, picture top right | open + done cards are T3 person event (`kesdlg kdper kdpbanner`), official's full figure left, category picture right (lazy: loads ~2–5 s after open; worker's early shots caught the empty frame) | OK |
| OD:L1272 one frame size per event | open / done cards same frame size at every size checked | OK |
| OD:L1432 narrator = named official by office | BAL.st14.q.narr: gt Giáo tập ma ma (consort), kn Quản sự ma ma (maid), real jstaff NPC with face | OK |
| ONE CORE | BAL.st14.q (bac c15/s3, need, narr); st14-onecore-scan: 0 typed game numbers | OK |
| CO-OP FIRST | quests are her own life state S (each seat its own tutorial); nothing shared/host-computed; jcoopone wrappers chain fine | coop-e2e 59/59 (merged build, and re-run after fixes, see below) |

## Stuck / impossible-state probe (all 10 origins, fresh life)
| origin | variant | chest at start | ch1 «trang» | ch2 «ban» |
|---|---|---|---|---|
| tt dtq muoi cn td ch thd | c | 1 dress (y_saxanh) | wear it | the swapped-out issued dress returns to the chest, sellable |
| nc (Công chúa Nam Chiếu) | c | EMPTY | nothing to wear; only route = buy in Nội vụ phủ (stock always has 12–45 bạc wd items, she has 180) — not said anywhere | ok after that |
| cnv | s | 1 unsellable | (maid quests: hau/le/di, chai/vuon/theu, chat/bieu/luyen — all acts exist, gift 5 bạc earnable via Thêu khăn) | — |
| bd | — | no tutorial chapter at start (same on main; not this branch) | — | — |
Reviewer fix: Việc nên làm "why" adds a hint when the chest holds nothing to wear / sell (nhờ thái giám mua…). Not hard-stuck any more.
Dead pattern (harmless): maid «hau» regex lists "Quét sân", no such act.

## Reviewer fixes on review/tut-quests-r1 (66f598de)
1. KIT consistency (OD:L1092–1095): the open card listed quests as typed "✗ text<br>" rows and the done card as plain lines, while the
   chapter detail shows the same steps with kit §46 kitChecks → both cards now use kitChecks (qChecks helper, unmet first); test spy reads html
   sections and asserts `.kchecks`.
2. Hint for empty chest (above).
Family note for the coordinator (pre-existing on main, NOT this branch): j67 card67 "Các bước" (j67:86/1779) and the Mệnh truyện rows67
"Các bước" (j67:210/1813) still print typed ✓/✗ text instead of kitChecks → whole-family kit fix task.

## Tests (merged build, after fixes)
| test | result |
|---|---|
| tut-quests.js | 40/40 PASS, 0 page errors |
| story14-view.js 755x1000 + 1180x820 | PASS |
| story14-frame.js | 27/27 PASS (re-run on 66f598de). First run on the merge (0e06e71c) had 1 FAIL "fast story bot": dtq + thd stuck 900 months at ch 10 arc tm96c (random-option arc, untouched by this branch); not reproduced on re-run nor on the main-build run (main fails only the new quest check, expected) → flaky, not counted; worth a note to the story14 owner |
| coop-e2e.js (live Worker) | 59/59 PASS (merged build) and 59/59 PASS (66f598de) |
| tutorial.js replay | crashes `Cannot read properties of null (reading 'click')` on main f1509d7c too → pre-existing, not counted |
| one-core scan jtq14 | 0 typed numbers |
| old save | tut-quests "old save without q14" PASS; story14-frame "old save (main build)" PASS (main-build save mid-chapter keeps its frame, no quests added) |
Shots (looked at, scratch only, not uploaded): open/done cards 755x1000@2 (cnv), 1180x820@2 (tt), 1366x1024@2 (nc), 1000x755, 844x390,
390x844 — no horizontal overflow, no page errors, card body scrolls in short heights, names not cut.
Worker's CDN folder img/_review/tut-quests/ wiped with the verdict.

## Verdict
PASS 66f598de (descends origin/main f1509d7c). Follow-ups (not blocking): j67 typed ✓/✗ family → kitChecks; bd origin has no tutorial chapter at start (pre-existing, check with story14 owner); flaky tm96c arc stall in the fast story bot.
