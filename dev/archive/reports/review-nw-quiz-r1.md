# Review nw-quiz-r1 (family C: no word games, exam skill games)

Branch reviewed: review/nw-quiz @ fc778ccb. Review branch: review/nw-quiz-r1 = worker branch + origin/main cab4a766 (two merges; index.html/sw.js/assemble.py conflicts resolved by taking main + `jnwq.js` after `jbal2.js`, site rebuilt).

## Checks
- **No text quiz at any entry point of family C.** Scan of the merged source: `EXQ` gone; `EXK` kinds are `lay/sort/clue/seat`; no kind of family C uses the quiz engine. Lesson «Y thuật & điều hương» (`MG.y`) is now `KG82_MGL.y` → pha-hương game. Remaining `e:"quiz"` kinds are tho/doi/doden (+ j5 `MG.thi`/`kg82Quiz` code) = families A/B, out of scope. `banh`/`huong` are skill games via j91. `YQ` bank in j5.js is dead data (harmless; remove with A/B).
- **Kit-only UI.** jnwq.js has no `createElement`, no style/class/CSS; uses j82 frame (kg82Canvas), k91 demo card/buttons/tiles, existing mg-* paintings. Chips (PHẦN/HỒI/CÒN) are the kit's. No private frame found.
- **Numbers in BAL.** `BAL.nwq` (jbal2): n, rounds, lim, hint/auto/miss/xaMiss, peek, idle, clues, free, shift. Exam weights/bars unchanged (BAL.ex). No typed numbers in player strings (scanned jnwq/jexam). Rules text has no %.
- **Wording.** No %, no «Chắc chắn». Cổ trang wording OK.
- **Old saves.** promo-exam.js with main build as «old save»: loads, no page errors. Its single FAIL («old save loads: exam state created, window open, card dealt») is **confirmed pre-existing**: main vs main gives the same FAIL (17/18). Not from this branch.
- **Touch play (oracle bot, tier 0, perfect play, one browser at a time).** le/tc/xa/thq = 10/10 at 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2; 0 page errors, 0 horizontal overflow. 390x844 shows the rotate prompt (as required); the bot (portrait forced) also 10/10. NOTE: running 6 browsers in parallel starves the bot (timers) and gives false 0s — run sequentially.
- promo-exam.js 17/18 at 755x1000@2 and 844x390@3 (round + result + Sắc phong frames: no overflow/clipping).

## Found and fixed here (small fix)
- **Bày lễ (le) not playable at 844x390**: kg82Canvas floor 260 px, the sticky Gợi ý bar covered the tray (hy = .89 H); the bot got 0 and scrolling did not help. Fix in jnwq.js (`nwqLay` build): on short viewports the layout height is scaled `k = clamp((innerHeight−185)/H, .7, 1)` so altar + tray sit above the bar; k = 1 on every other size. After: le 10/10 at 844x390@2, unchanged elsewhere. (kg82Canvas floor itself is still the kit keeper's — see request below.)

## Known / not blocking (worker's requests stand)
1. KIT REQUEST: kg82Canvas floor 260 px / short-landscape frame; other tall drag games (cắm hoa…) have the same limit.
2. ART (paused): Xử án suspect busts are code-drawn robes with blank faces; torn-cloth sprite; Thái hậu seat picture. At 755x1000 the left backdrop of Xử án is a plain parchment panel. Acceptable tonight, to paint when art resumes.
3. Calibration (Tuyệt phẩm 20–30 %) is a formula simulation, not an engine bot with injected mistakes; mg-balance's `mgTier` hook exists (`BAL.nwq.miss/hint` to retune).

## Verdict
No FAIL item. Fix pushed on review/nw-quiz-r1.

PASS 33730518c33d3038f2e06a4e93f1497694ce6b4a
