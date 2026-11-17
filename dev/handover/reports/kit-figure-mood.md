PRIORITY #1 CHECK: OD tail "(17/11 ~17:40Z real" (2) + KIT.md 28.8c/~1445/~2728/~2989; prio1.sh "emo-an": main only pcPort kemo (jemo.js), review/* none, claims none -> reused jemo emoBadge/emoArtSet/kitEmotion + the jemo tap popover unchanged.

# kit-figure-mood (review/kit-figure-mood)
What: ONE kit part `kitFigSeal` (dev/build/jfigseal.js, KIT.md 28.8d, test dev/test/fig-seal.js). The SAME seal as pcPort (img.kemo.kemo-<k>, emo-/emo-m-/emo-mo-, emo-an when not known, none for strangers, same tap popover) sits beside the HEAD of every interactable full-body figure. No new art, no new mood logic.
Rule (KIT_FIGSEAL): size .105 x body height (22..50 px); centre at head height; right of the painted hair/headdress edge (kitFigBody wl/wr, top 15 %), gap .012 x body; left when the right leaves the stage/column; clamped inside #stage / .kszfig / .kesf; never above the head (kitMeMark place); hidden when figure not loaded/visible; off with __emoOff.
Makers register the person (data-kfsp): kitStageFig + kszFigHtml wrapped in jfigseal; stage tokens read curPeople()[tok.dataset.p]; #mefig = S.

## Scan table (every full-body figure renderer)
| renderer | where | seal |
|---|---|---|
| j59 `#tokens .tok.fig img.figimg` | room, home visits, place view, Dư đồ place (kplfs), lãnh cung, kid figs | YES |
| `#mefig` (her) | same stages | YES (her mood, same as her pcPort) |
| kitStageFig `img.kesimg` | event dialogs (kitEventStage), kitPersonDlg (jpdlg), book person pages (j87), pet-care | YES |
| kszFigHtml `.kszfs>img` | ksz3 person dialog frame | YES |
| unknown-fig silhouettes / "Người lạ" (j59unk) | stages | NO (stranger) |
| kitGameFig `.kgfig` (mini-game) | games | NO (not interactable) |
| kpIdLay `.kidfig2/.kpfig` | new-life identity card | NO |
| kitBookPic `.kbp-fig` | dead code (no caller) | n/a |
| pcPort portrait frames | everywhere | already had the seal (unchanged) |

## Tests / shots
- fig-seal.js Fold 755x1000@2 and iPad 1180x820@2 (room, event dialog, place/Dư đồ, tap person): every seal inside its stage/column, not on the face, 22..50 px, beside the head, 0 page errors. Looked at all shots.
- Shots (CDN img/_review/kit-figure-mood/): room/event/place at 755x1000 and 1180x820 (delete after verdict: python3 dev/site/cdn_sync.py --wipe-review kit-figure-mood).
- quickcheck --runs 5 on 82a3e876 vs live e9bbc4d6: PASS (core gates, time-spill, open 0 errors, old save ok; perf median new/live render 232/253, tab 436/407, buổi 1248/1276, tasks>200ms 15/16). Later commits only add the kit-page sample + rebuild (kit-page.js: 85 samples ok, 0 errors, Fold + iPad).
Known limit: wide phoenix headdresses push the seal ~50 px from the face (it sits past the headdress, by rule).

## Follow-up (ADD #1-#3 from main s35) — sha 5f891df5
- #1 tap card: jemo emoTipHTML shows mood + cause only when known (data-kemoc from kitEmotion().causeKnown, AG-MOODKNOW); unknown -> "Nguyên do chưa rõ". Checked by unit eval of 4 cases. The seal itself is never gated by intel. NOTE: the real `causeKnown` arrives with review/ag-moodknow (4df4485d); until it lands data-kemoc is always "1" (current behaviour).
- #2 motion: new kit part kitEmoSeal (dev/build/jemoseal.js, KIT.md 38.4): per-key CSS motion for EVERY img.kemo, on-screen only (IntersectionObserver), off with reduced-motion / Gọn. Removed the old animation:none!important/transform:none!important that blocked pcPort seals (jemo css, jk2b .kfc .kin>img:not(.kemo)) and the two old pulse rules. Keys khoc + hon in the seal map (names only; mood logic EMO unchanged, so they never appear until logic sets them).
- #3 plumbing: frame-loop source img/kit/emo-anim/<set><k>.webp (probe once, swap while on screen, back to still off screen) + effect sprite layer img/kit/emo-fx/<k>.webp (sibling img.kemofx, 1.7x). Proven with FAKE=1 (a gian loop + fx served from the still): swap and layer happen, 0 errors. Real art: drop files at those paths, no code change. Open: effect offset per key (e.g. smoke above, tears below) is centred for now; Foreman C's sprites may need a per-key dy in KIT_EMOSEAL.
- quickcheck --runs 5 on 5f891df5 vs live: PASS (render 211/216, tab 275/294, buổi 814/963, tasks>200ms 13/13, old save ok, core gates). Fold perf with many seals: seals animate only while on screen.
