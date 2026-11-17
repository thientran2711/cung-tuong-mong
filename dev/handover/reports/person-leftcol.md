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

---
# WORKER #2 report (17/11, sonnet) — HANDOVER, NOT ready for review
PRIORITY #1 CHECK: OD 1543 + 04:40Z | main none | review/person-leftcol | claims 2.
Branch review/person-leftcol @d1c121b1 (rebuilt from origin/main 65dcf52f; old WIP 66228c7a DROPPED: it targeted kdper/ksz3, but the owner's screen is the pcard page (Hậu cung tab, `.pc > .pcl | .pcr`) built by jpcf.js).
DONE (Fold 755x1000 looked OK):
- jpcf.js: Tâm trạng card + "Lòng người" block removed from the right. Right = ONE compact kitRows panel `.pcfix` (tính nết/Hay · Đã biết (2) · Dạo này (1) + chips) moved by kitPcFix (jk2b.js) INTO the sticky `.kpstick` above the act tabs (acts = scrolling area). Extra tab renamed "Chuyện cũ" (PCF_X + Việc nhanh only).
- Left: `kitPcKey` (wraps kitPcFix) inserts `.kpkey` right after the portrait: acquaintance chip (k61StChip), kitRelTable compact (NEW option `compact:true` in jkrel.js kitRel2, one line per direction), likes/dislikes lines once known (rows tagged `.like` in pcfTaste). Duplicates removed (Quen biết chip, kphelp, kpgr0 chips). CSS order: portrait, kpkey, kwear, kpgrid, kpfacts. Known people only (strangers unchanged).
TODO:
1. iPad 1180x820: `.pcl` is full of portrait, the key block is below the fold of the left column (internal scroll) — must fit WITHOUT shrinking the figure: measure `.pcl` clientHeight vs children; options: kwear after key (done) + shrink name/rank block, or let the figure width var --kpcw give back height; check 1366x1024, 412x1058, 390x844.
2. Fold: key block sits low (kwear cut under it); verify nothing clipped, `.pcl` scrollHeight; sticky panel + acts scroll test; known person with likes; Chí tôn (Emperor/Thái hậu), Nam nhân, Cung nhân pages; stage pop-up (pcard with 1 group).
3. ksz3 / kdper person dialogs ("Có người đến", two-person): NOT touched; figure fills the column (never-shrink law) so no room — decide with main (overlay chips? skip?).
4. Update dev/test/pcard-fill.js (expects old blocks + tab "Lòng người"), KIT.md §32.7d + §52 compact + kit sample §52/§73 (§73 sample updated in jpcf), CLAIMS row, quickcheck, old-save load, shots to CDN img/_review/person-leftcol/.
Harness: /home/user/wt/leftcol-shots/h.js (scratch, may be gone): `node h.js WxH rv out.png` (boots game, k61Meet rival → Hậu cung page; disables girlChestShow BEFORE start()).
Side finding kept: 2-up option cards at 755: "được/mất" text wraps one letter per line (separate kit task).
