# PROGRESS review/pcard-fill (worker B, C35)
Owner (15/11, OD L951): the person card's right side is empty -> fill it with useful info, kit parts only.

## Done
- `dev/build/jpcf.js` (new, last module in assemble.py): wraps `pcard`; person resolved from `o.f.__kp` (kit person). Blocks: Tâm trạng (kitSkillCard + mood-dialog picture), Lòng người với ta (kitRelTable), Sở trọng (kitRows: known traits, Emperor's known likes), Đã biết (kitRows + chips to the existing intel/evidence panels), Dạo này (this month's log lines naming her), Việc nhanh (act cards, only when the card has no live act). KIT.md §73 + kit sample §73.
- Placement: 2+ act groups -> extra kit tab "Lòng người"; otherwise stacked under the acts (stage pop-up, Thái hậu card).
- Merged review/actcard-small-r1 (3:4 small act picture) into the branch (not yet on main).
- Not done on purpose: stat-glow-on-re-render (stat-fx-2). "Ghét": the game holds no per-person dislike data (only trait tendencies and the Emperor's likes), so no invented "ghét" row; Tặng quà/Thỉnh an stay as the existing acts (Thỉnh an is only a talk option of the visit; no free shortcut added, to avoid bypassing the one-talk-per-visit rule).
## Tests
`node dev/test/pcard-fill.js <url> <outdir> [sizes]` (cases rv0 rv1 court0 court1 pop popdone me).
