# review/odds-no-thanh — no odds word/meaning reads as a promise (MAIN110-W2) — sha a234c91d67ccb20f5855bb94d2d33d2e120d770b (base review/kit-odds-row-r 1a94dca1)

PRIORITY #1 CHECK: OD 23/11 ~21:40Z (no ladder word / meaning may promise success: no «thành», numbers) | git grep of the whole tree for the meanings (KIT_ODDS_TXT, jevb, jk2b, jtoilr, jge, jne, jtoil, KIT_GLOSS, popover, tooltip) | no other review branch touches them.

## Before / after (family = every text that explains or abbreviates a ladder word)
| where | before | after |
|---|---|---|
| popover meaning 1–7 (KIT_ODDS_TXT, j79) | thường hỏng · hỏng nhiều hơn thành · hỏng nhỉnh hơn thành · nửa thành nửa hỏng · thành nhiều hơn hỏng · thường thành · gần như chắc thành | rất dễ hỏng · dễ hỏng hơn là ổn · hơi nghiêng về hỏng · hên xui, tùy duyên · hơi nghiêng về ổn · thường ổn, ít khi hỏng · rất vững vàng, ít khi hỏng |
| popover heading (kitOddsLadder) | Thang cơ hội · 7 bậc | Thang cơ hội |
| meter tooltip (kitOdds title) | «word — bậc n/7» | «word» |
| glossary «Cơ hội» (KIT_GLOSS) | Thang 7 bậc: <words joined with <> | Thang cơ hội, từ thấp lên cao: <words> |
| chance phrase evbChance (jevb) | khó thành / thành bại khó đoán / dễ thành / gần như chắc thành | dễ hỏng / hên xui / thường ổn / rất vững, ít khi hỏng |
| option hint class (jk2b:299), toilOddsW (jtoilr) | dễ thành / khó thành / thành bại khó đoán | thường ổn / dễ hỏng / hên xui |
| typed hints (jge, jne x1, jtoil x2) | thành bại khó đoán | hên xui |
| KIT.md jk2b description | dễ thành / thành bại khó đoán / khó thành | thường ổn / hên xui / dễ hỏng |
No «chắc chắn» / number remained in the odds family; the no-roll «Rất vững» chip untouched (asked of sếp).

## NOT touched (outside the ladder family — MAIN to decide): texts that say «dễ/khó thành hơn» about a SHIFT of odds, not a ladder word: quẻ (j79 «Quẻ», jtut:255/323), nghệ bậc effects (j85, j23, jbalcore:97/105), Đức/Ân tình glossary (j79:279/291), jdh «Phúc khí… dễ thành hơn», plot texts (j70 «mưu khó thành», jrd_*). About 30 lines; say if they should follow.

## Tests
balance-core 0 FAIL; odds-unknown-scan unchanged; old-save 16/16; odds-one-row (iPad) PASS + 7-band/alias gate; LOOKED at the iPad popover (all 7 rows one line, no «thành»).

## REVIEW (reviewer-lander) — PASS — review/odds-no-thanh-r @ bf75a0a3b16b35e63c1f6bf252b1a2c9e5fcb27b
PRIORITY #1 CHECK: OD 23/11 ~21:36Z/~21:40Z | main c39e5009 (KIT_ODDS j0, kit-odds-row landed) | review/kit-odds-row-r 1a94dca1 (in main) | claim W2.
- Merge: a234c91d + origin/main c39e5009; only index.html/sw.js conflicted (build outputs) → rebuilt via assemble.py + build_site.sh, source merged clean. No rule/number change.
- Own family scan (j*.js, KIT.md): no ladder meaning contains «thành», «chắc chắn», «bậc n/7», numbers or %. Remaining «thành» hits are result labels («thành: <được>»), SHIFT lines («dễ/khó thành hơn»: quẻ, nghệ, glossary, mưu, jdh) — allowed.
- Notes (not blockers, outside the ladder): jrd_td.js:526 option hint wx «dễ thành» (plot choice, not a ladder word); jtut.js:258 «việc chắc thì không ghi» (describes a no-roll act); j67.js:1397 «chắc chắn hơn» (comparative). MAIN may decide.
- Gates: balance-core 0 FAIL, page errors 0; odds-one-row 755x1000 / 1180x820 / 390x844 PASS; odds-words, odds-scales-scan OK; odds-unknown-scan unchanged. Old-save (oldsave-r1 etc.) not rerun beyond W2's 16/16 — merge touched only ky-keeper-f2 + builds.
- LOOKED at popover shots Fold 755x1000 and iPad 1180x820: 7 rows, one line each, meanings: rất vững vàng, ít khi hỏng / thường ổn, ít khi hỏng / hơi nghiêng về ổn / hên xui, tùy duyên / hơi nghiêng về hỏng / dễ hỏng hơn là ổn / rất dễ hỏng. No promise.
