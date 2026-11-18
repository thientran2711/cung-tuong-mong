PASS 072687e2cd549536374db37fe393f1b077464c39
# review act-split-w2 r1 (opus reviewer, Foreman D s3) — branch review/act-split-w2-r1
Reviewed origin/review/act-split-w2 @ 30c0931d42fa75ce27f0005e3415c85ecbabf07a merged onto origin/main 399483e3 (main is an ancestor of the PASS sha → fast-forward OK).
START_CTX ~5 % (get_session reads 0; estimate). No rollover needed.

## Merge
Conflicts in dev/build/assemble.py (file list), index.html, sw.js → main's list + 'jact2.js' after 'jact.js'; rebuilt with assemble.py + dev/site/build_site.sh. No other changes by the reviewer (a tried wording tweak on the night sneak line broke the kit row split on " · " and was reverted).

## Tests (merged build, one at a time)
| test | result |
|---|---|
| act-split-w2.js 755x1000@2 / 1180x820@2 | 0 FAIL / 0 FAIL (stroll "!" before 8 → after 27–30 per 300 buổi, always slot 1, ≤2 per buổi; old save loads and deals; 0 page errors) |
| act-split-scan.js | duplicate acts 31 → 0; day-start festival dialogs 2 → 1 (+1 at the place) for 12 festivals; errs 0 |
| act-split-vp.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 1024x768@2; 390x844 + 412x1058 rotate prompt | FAIL 0, no horizontal scroll, 0 page errors. Shots looked at: map "!", festival dialog (pictures load after ~2 s, CDN files present), Lẻn vào night card, Tiếng khóc ở Trường Môn viện |
| panel-size.js 5 viewports | exit 0 |
| coop-e2e.js | 59/59 |

## Checks
- KIT: only kitHapMark, kit dialogs, kit option rows, tsOpt. No private parts. KIT REQUEST: none.
- Whole family: every festival light act has exactly one home (thu / vuon / tn / cnh); j7 festival events + coldvisit out of the random pool; Thất tịch, Vạn thọ have only j71. grep of festToday over all j*.js found no other festival dialog home.
- Gain/loss + ONE CORE: night sneak odds +BAL.ad.nightSneak, caught Danh +BAL.ad.nightCaught, printed from BAL; stroll/hap numbers in BAL.ad. Cầu con keeps the card cost Bạc -10. Pre-existing gap (not this branch): accSneakPen (j77) Danh -8/-15 and accSneakO (j41) base odds typed in code → coordinator may queue a ONE CORE fix.
- VANPHONG: no %, ladder words. OK.
- OD L1261 (animation scene ends with a button): no animation scene touched.
- Nothing lost: all FESTEV + j7 options still reachable at the place (minus the same act as this year's j71, by design); "Thả đèn cầu con" lives on as the lantern card wish "Cầu con".

## Notes for the coordinator (not FAIL)
1. Co-op "!" slots: festival and cold-palace "!" come from shared world state, so host and guest see the same ones. The random slots, the stroll included, are still rolled per player (the wave-1 design already on main). So a guest can see a stroll "!" that the host does not. If the owner wants identical random slots, seed the roll from the world (bkey + world seed). That needs a coordinator decision.
2. Festival light dialogs still have no ✕ / decline on some festivals (e.g. Nguyên tiêu: 2 acts only). This was already true in j31. Walking there is voluntary now, so it is minor.
3. OD L1265 (no word games): the festival light acts still include "Giải câu đố đèn" and "Dâng câu đối"/"Viết câu đối". Not in scope here; the word-game replacement task should cover them.
4. Not built (worker, ART NEEDED): outer outing places (Ngự uyển ngoài, chùa Hộ Quốc).
