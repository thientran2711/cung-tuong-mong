# PROGRESS: review/toil-react (D27 extra toilette reaction buttons)

Base: origin/main 67af14139f. New module `dev/build/jtoilr.js` (after jtoil.js in assemble.py); jtoil.js is NOT edited.

## What it adds (owner D27)
The jtoil reaction dialogs (toilFlush: Xin lỗi / Cười trừ / Đáp lại for a slight, Cảm tạ / Tạ ơn for praise) get extra options from the SAME option fields
(`n, fx, hideOut, hint, risk, go`): the standard kit option card in cost mode (KIT 28.6). No new UI piece, no CSS.

| Button | Offered when | Effect | Numbers (BAL.toil.rx) |
|---|---|---|---|
| Ghi hận | a slight (n<0) from a consort / Hoàng hậu (not Thái hậu, not the Emperor) | her Oán towards her: `oanAdd(S,v,+6)` (the existing Oán book S.ro, faded monthly by oanMonth); Đức -1; `S.toilGrudge[hostKey]={wk,name}` (30 days) | grudgeOan 6, grudgeDuc 1, grudgeDays 30 |
| Mách Hoàng hậu | a slight from a consort (not Hoàng hậu herself), queen exists, she is below Hoàng hậu | odds = 50 + Hoàng hậu quý/6 (+10 if a grudge is kept), clamp 15..85. Win: Danh +1, Hoàng hậu quý +3, culprit Oán +5. Fail (looks petty): Danh -2, Đức -1, Hoàng hậu quý -2, culprit Oán +8. Hint words: dễ thành / thành bại khó đoán / khó thành; risk chip "có rủi ro" | tell* keys |
| Tặng lại | praise (n>0) from Thái hậu / Hoàng hậu / a consort | giver's regard +2 (+3 for a strong praise). Two roads: bạc (1/7 of a month's pay by rank, min 6, shown in Tốn) OR a non-worn, non-tainted item of the same worth (price 0.8..1.6 x the bạc cost; button "Tặng lại: <item>", appears only if she has one) | giveMo .15, giveMin 6, giveItemLo/Hi, giveAff 2/3 |
| Hỏi bí quyết | a consort reacts and her NPC face score (toilNpc) is >= hers + 10 and she has made up | price: her regard for Ta -2 (always paid). Odds 45 + regard/2 - ghen/5 (-15 for Kiêu ngạo / Xảo quyệt), clamp 10..90. Win: `S.toilTip` (7 days): +0.15 skill at the mirror (toilSkill wrapper, so the real game and toilAuto both see it) | ask* keys, tipDays 7, tipBonus .15 |

Balance note: the bạc cost follows the existing BAL.thy road (about 1/7 of BAL.pay[rank]). NEVER call stipend(S) for a value: it pays out (jtoilr uses BAL.pay).
Co-op: S is per player; nothing is sent, nothing touches the other player. Old saves: S.toilGrudge / S.toilTip are created on first use (test loads an old save).
Hooks: wraps toilSkill and toilFlush (adds options to the dialogs toilFlush just pushed, same order: strongest first, popMax of them).

## Overlaps with review/mk-colour-r1 (KIT 60.5, also touches jtoil.js)
jtoil.js untouched here, so no text conflict. Only possible textual conflict: the one-line `jtoil.js` entry in the module list of dev/build/assemble.py
(add `'jtoilr.js'` right after `'jtoil.js'` if both add modules). Runtime overlap: if mk-colour-r1 changes toilSkill's return shape or toilFlush's Q item shape
(`m.toilEv`, `m.opts`), re-check the two wrappers at the bottom of jtoilr.js.

## KIT REQUESTS
None blocking. Note for the kit keeper (optional): the item-cost road shows the item in the button name + Gợi ý; a kit "Tốn: <item tile>" row would be nicer (kitItem exists, but the cost-mode Tốn row only formats Sức / khắc / Bạc).

## Tests
`node dev/test/toil-react.js <url> <WxH@dpr> <shotdir> [oldsave.json]`: builds each of the four buttons through the real dialog (bad rival with a better face, praise with an item in the bag, Thái hậu, Emperor = none),
checks effects (Oán, Đức, Danh, Hoàng hậu quý, regard, bạc, item, tip), the odds-grudge link, modal on top, no truncated option, no horizontal overflow, no page errors.
Run `python3 dev/build/assemble.py && bash dev/site/build_site.sh` first; serve the repo root.

## Review r1 (reviewer fixes)
- Hint wording: chance words now come from the ladder via word(odds) folded exactly like kitHint (Nắm chắc/Rất chắc/Chắc -> dễ thành; Khó/Liều -> khó thành; else thành bại khó đoán) instead of own thresholds; level 0 (vague) names no chance (KIT 28.6).
- Tặng lại item road: worth = econPrice (what she would get selling it, the bạc-equivalent), window 0.8..1.6 x bạc cost; excludes worn / tainted / workshop / ngự tứ / keepsake / gifts from Hoàng thượng, Thái hậu, Hoàng hậu (econNo, econGiver). Hint has no number.
- mk-colour-r1 is already on main (merged): the combined build is this build.
