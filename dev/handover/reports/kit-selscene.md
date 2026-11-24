# REVIEW review/kit-selscene (KIT reviewer-lander, 23/11)
PRIORITY #1 CHECK: KIT_REQUESTS SELSCENE 1–5 · main already has j59tagHTML, kitPersonLine, kitEdict, kitResultSeal (all reused, none duplicated) · kitKnowMany/kitNotice live in review/know-notice (not touched) · claim KIT KEEPER #13.

## REVIEW — PASS
Branch e481193dfa7bdb18d29c95e380ec22a89b540fdf merged onto origin/main c39e5009 → review/kit-selscene-r (index.html/sw.js conflicts = generated, resolved by rebuild).
- Kit parts jkitsel.js (kitScene, Sc.fig, kitDlgBox, Sc.pair, kitNameTag/kitUnkName, kitNewsRankRow/List, kitEdict fromWord, kitBareOpt(s), kitResultCard) registered in KIT.md §93 (93.1–93.8). Reuse: j59 tag classes, kitPersonLine row, kitFaceH/kitName, kmRankName, kitResultSeal, kit dialog frame (.dlg.kpanel + kpHeader), §7 result card classes. No second kitNotice/kitKnowMany/kitResultSeal.
- KIT PAGE GAP (fixed by reviewer): samples existed only for §93.5–93.7. Added §93.1-4 (two buttons open the REAL scene, pair/solo; tap a card returns to the kit page) and §93.8 (button shows the result card); KIT.md samples line updated.
- kitBareOpt exception limited to selection scene: only the `.kbare` class is skipped by kitOptOdds (jk2b) and kitOptFinal (jopic); `git grep` shows kitBareOpt has no caller outside jkitsel.js (sample + test); every other option card path unchanged (dialog-fixed + odds-one-row pass, same card counts). KIT.md says reviewers FAIL a bare card outside the selection scene.
- Figures never clipped: kit-selscene test noClip (painted bbox ≥ edge px on all four sides) pass, pair + solo, Fold + iPad; looked at shots: figures full body, boxes over figures only.
- Nothing else changes: diff of existing files = 7 one-line edits (j59 CSS selectors extended to .kscn-tag, j93 fromWord, jk2b/jopic .kbare guard, assemble list).
- Wording: Tú nữ / Chưa rõ tên / một tú nữ / THÀNH·BẠI·KẾT QUẢ / Được·Mất; odds words only on real cards; no %. (thiện cảm +3 is a stat number, as elsewhere in the game.)
Gates (Fold 755x1000 + iPad 1180x820): kit-selscene ALL PASS (20 ok, re-run after fix) · dialog-fixed all pass · odds-one-row PASS · quickcheck PASS (open 1.7 s, old save loads + plays a buổi, core gates PASS, perf buổi median within noise) .
Shots looked at: kitsel-pair-fold/ipad, bare-fold, tags-ipad (test fixtures overlay the live HUD; expected).
Note: the kit-page result sample could not be verified visually in my harness (boot overlay on top); the card itself is covered by the test (kitBareOpt + kitResultCard res=true).
