# person-leftcol — HANDOVER (worker rolled over; coordinator opens the successor)

Decision (MAIN s30, 17/11 ~04:30Z): option 1, compact. LEFT = portrait + acquaintance chip (k61StChip) + ONE compact two-way relation row (kitRelTable compact; if no
compact mode exists add one INSIDE KIT §52, no private part) + likes/dislikes line only once known; NO Tâm trạng chip; never shrink the figure. RIGHT = info panel
(Sở trường, Đã biết, Dạo này) FIXED on top, action cards below = the only scrolling area. Two-person dialogs: same left block per person. Rebase on origin/main after
batch-0415 (save-dlg-fix, kitRelTable paper mode) lands. Branch review/person-leftcol from origin/main (WIP @66228c7a is only a starting point).

Where things are (found, not yet solved):
- The live person dialog = jksize ksz3 frame (dlg class `kszf ksz3`, `.k3body > .kszfig | .k3mpor` left, `.k3right` right). kdper (jk4 kitDpFit) is the older path.
- WIP adds jk4 `kitDpInfoHtml / kitDpInfoBlock / kitDpInfoLive` (+ render() hook) and calls `kitDpInfoBlock(p)` from jksize `kszFigHtml` and `kszPor3`; kszFigFit shrinks the figure
  by the block height (REMOVE that: never shrink the figure — so the block must be ~<= the free space; measure it).
- Pitfalls hit: ladder `kszLivePick3` (S/M/L/XL, KIT_SIZE caps 400/518/732) — a taller left column makes it jump to XL (huge event picture) — do NOT touch KIT_SIZE;
  `#mb` is the scroller (overflow:auto), so dialog.scrollHeight tells nothing. Frame max-height comes from --kszcap.
- Test harness (scratch, not committed): boots the game, disables girlChestShow + kitReward, pushes Q {t:'Có người đến',stage:[v],who:pv(v),h,opts} and screenshots; copy the boot
  part of dev/test/kit-fit.js. Shots at 755x1000@2, 1180x820@2 (+1366x1024, 412x1058, 390x844) must be LOOKED at.
- Deliver: KIT §52 / new §32.7d text, dev/handover/CLAIMS.md row, dev/handover/reports/person-leftcol.md, assemble + build_site + quickcheck + old-save load, then 'SẴN SÀNG KIỂM <sha>'.
- Side finding (outside this job): in 2-up option cards at 755 (M frame) the "được/mất" text wraps one letter per line ("thiện cảm" vertical) — kit bug worth its own task.
