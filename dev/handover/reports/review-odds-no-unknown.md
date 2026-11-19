# review-odds-no-unknown — BIG REVIEWER verdict: **PASS LAND READY 6b041ea**
PRIORITY #1 CHECK ('Khó lường', 'oddsLead', odds `p`): OD 0 | ledger 0 | claims 1 (worker's own row) | main 14 before → 0 in dev/build after | review/* 0 | archive 0 (KIT.md:899 said it was retired; this branch takes it out of the build).
Reviewer: BIG REVIEWER (opus), child of FOREMAN C-AG #20. Brief: briefs/root63-cag20-jobs.md JOB 1. Worker report: reports/odds-no-unknown.md. START_CTX ~6 %.

## What was reviewed
review/odds-no-unknown @ 7a56b2e (worker final-merge LIVE fd6118c). LIVE moved to **7fb7c10** (ge-writers-w2) during the review, so the reviewer
final-merged it: only index.html/sw.js conflicted, rebuilt with build_site.sh → **6b041ea** (FF over origin/main 7fb7c10, pushed).
Reviewer fix in that commit: a j68.js:61 comment still named «Khó lường» (it reached index.html as a comment, never on screen) → reworded. Build now has 0 hits.

## Laws checked
| law | result |
|---|---|
| 4 ONE CORE | PASS. Every new `p` is the exact expression its roll uses: jtruth p=clamp(…) = go()'s roll(clamp(o)); j92 p=o1/o2/o; jtoil p=BAL.toil.replyWin/harshWin = toilAns roll; jne p and roll both BAL.toil.replyWin (hard-coded `:50`/`:2` fallbacks gone); j8 plantpick p=oddsCl(fz) = the fzRun(fz) the dialog already prints; jdh2 p=loOdds(kind,S) = loDo's roll (soat has no roll, gets no p); j42 cnvPend p=op.o = cnvRun roll; jpoison roll(ps) with ps on the card. Committed index.html = source build (rebuild differs only in the build-info line). |
| 7 ladder only | PASS. «Khó lường» removed from j17/j63/jk2b/jkitpage/jpoison + KIT_HINT_LADDER/KA_ODDS regexes; KIT.md + VANPHONG 0 hits; side chances use `chanceW` (khả năng …), no %. |
| hidden info (poisoned dish) | PASS. «Nhận ngay» p = oddsCl(100 − pgOdds(giver→her, dish).o), computed with no read of whether the dish is poisoned → same word for clean and poisoned (runtime: Rất chắc/Rất chắc iPad, Nắm chắc/Nắm chắc Fold). Outcome odds unchanged: hit chance was p.o (gift-time pgOdds), now 100 − ps = the same pgOdds, both inside BAL.odds lo/hi. |
| 9 kit first | PASS. No new CSS/frames; all cards use the kit meter (kitOdds/oddsChip via kitOptModel). The meter in shots = kit meter. |
| 11 whole group | PASS. Static scan over every dialog option in dev/build: rolled options with no odds on the card 17 → 0; 19 exemptions, each read by the reviewer and valid (travel/next-scene rolls, NPC's own choice, mini-game, hidden-trait bonus jkc2, newsAdd hearing roll jeitem). |
| 14 canon overwrite | PASS. KIT §25 and §28.6 lines replaced in place (old «Khó lường» / unlit-meter text deleted, not annotated). |
| 2/3/6 | untouched except jpoison (6a kept, see above). |

## Gates re-run by the reviewer
| gate | 7a56b2e | 6b041ea (merged 7fb7c10) |
|---|---|---|
| `odds-unknown-scan.js dev/build` | 0 left · 19 exempt · 0 «Khó lường» | same |
| `odds-no-unknown.js` Fold 755x1000 | 57 dialogs · 174 opts · with p 20 · 0/0/0/0 · 0 page errors · PASS | 60 · 182 · 20 · PASS |
| `odds-no-unknown.js` iPad 1180x820 | 57 · 173 · 20 · PASS | 59 · 179 · 20 · PASS |
| `odds-meter-back.js` Fold / iPad | 128/128 · 141/141 meter, krisk 0, step≠odds 0 · PASS | 134/134 · 152/152 · PASS |
| quickcheck `--cpu 4` | PASS · render 223/249, tab 463/439, buổi 1010/1096 ms, old save ok | PASS · render 215/264, tab 445/425, buổi 1182/1061 ms, old save ok |
| ge-guard (main's new data) | – | 6/6 PASS |
Fixed-family cards (runtime, iPad): vu oan Liều/Khó/Khó/Năm ăn năm thua; giá họa / ngự tứ Năm ăn năm thua; Dung nhan Năm ăn năm thua/Khó/Năm ăn năm thua; cài đồ Liều ×6 (= dialog line); ấn tín Năm ăn năm thua ×2. Was Nắm chắc / unlit on LIVE.
PEND harness setup errors cn2/rtAn/giftto = test noise, same on LIVE (not page errors).

## Shots looked at (CDN img/_review/odds-no-unknown/, wiped with this verdict)
fold-vuoan, fold-toil, ipad-pgin: kit meter at the real word, vu oan hint no longer repeats the word, no overflow, no cut text, ✕/frame from kit.

## Follow-ups for MAIN (not blocking; pre-existing, outside JOB 1)
1. Law 4: punishDemoP() 100/25/50 and literal roll(30)/roll(40)/roll(15) (j4/j24/j76/jkc), newsAdd roll(30) are typed numbers, not BAL → one small BAL job.
2. Side rolls with no wording on `o` cards (j2 «Tâng bốc», «Xin ân điển», j42 «Lén báo tin», jroute «Trao tín vật»/«Dặn cung nữ», jeitem «Phạt nặng» spy confession says «có thể» without chanceW) → same family one level wider.
3. Kit shows the lv0 `hint` text under ĐƯỢC even when it names a loss (jpoison «Nhận ngay», vu oan «hỏng thì ta mang tội») — kit-wide, pre-existing.
