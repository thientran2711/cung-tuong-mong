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

---
# WORKER #3 report (17/11, sonnet) — READY FOR REVIEW (pending quickcheck line below)
PRIORITY #1 CHECK: OD 17/11 ~04:26Z + ~04:40Z (refs/owner-person-leftcol-1117.jpg) | main d0a839e8 (none for this job) | claims person-leftcol #3 | worker #2's d1c121b1 was NEVER pushed (origin held only the dropped 66228c7a); main s32 ordered a rebuild from the report spec.
Branch review/person-leftcol (from origin/main d0a839e8), commits a696881b → see final sha in the message to main. Pushed every step.
WHAT (family = every pcard: Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân, stage pop-up pcard):
- LEFT under the portrait, always in view: `.kpkey` = acquaintance chip (k61StChip moved) + ONE compact two-way relation block (NEW KIT §52.2 `kitRelTable(rows,{compact:true})` / `kitRelCompact` in jkrel.js: one line per direction, pairs never split) + Thích / Ghét lines once known (moved from the right panel by `kitPcKey`, jk2b §20a; unknown dropped). Built in jpcf `pcfKey`. The rowA relation chips of kitPcGrid are skipped when the key exists (one fact, one place).
- FIT in the kit (`kitPcKeyFit`, jk2b, called from kitPcSize): figure `--kpcw` shrinks only by the height the key needs (min 112 px); left column min 172 px (`--kpcl`); portrait width rule `html body .pc.kpwide[data-k2]>.pcl>.pcp.kit.kit` beats jk3's width:100%. iPad 1180x820 (card 429 px): figure 150-180 px, key fully visible; Fold/1366: figure 240 px, key visible.
- RIGHT: Tâm trạng card + "Lòng người" block/tab REMOVED. Info panel `.pcf` (Sở trọng / Đã biết ≤2 rows 1 line / Dạo này 1 row, heading beside rows) moved by kitPcFix into the sticky `.kpstick` above the act tabs; acts scroll underneath. Extra blocks (jmem) + Việc nhanh → tab "Chuyện cũ" (2+ groups) or under the acts.
- Numbers jump/glow on change: pcfStatWatch SEL now includes `.kr2-cp .kr2-v` (key = direction + word) — verified glow ksf-g in dev/test/stat-fx-2.js card.glow.
- Narrow container (<440 px, phone portrait = rotate screen): key = full-width row (jk4 narrow template + "key" area).
- KIT.md §73 rewritten, §52.2 added; kit sample §73 now shows key + panel; tests: dev/test/pcard-fill.js updated (key/info/sticky/noMood/noTab/keyVisible/figW).
NOT DONE / DECISION for ksz3 + kdper event dialogs ("Có người đến", two-person): NOT changed. There the figure is the event-stage column (§32.7b/§33.6, ladder kszLivePick3, KIT_SIZE caps) and the relation is already shown as the option "được/mất" rows; a taller left column makes the ladder jump to XL (worker #1 hit this). Recommend a separate kit task "event dialog key strip" (chip + compact relation as a strip UNDER the figure caption, ladder measures it) — needs main's go; I did not touch KIT_SIZE.
SCAN TABLE (before → after, iPad 1180x820 rv0/rv1/court0/court1, Fold rv0/rv1/court0/court1): key block visible without scroll: before = n/a (relation lived only below the fold in the right Lòng người tab / lower left chips) → after 8/8 keyVisible true; Tâm trạng card: 8/8 gone; "Lòng người" tab: 8/8 gone; figW 240 (Fold, 1366) / 157-179 (iPad).
SHOTS URL: CDN img/_review/person-leftcol/ (fold-rv1, ipad-rv1-likes, ipad-court0, ipad13-rv0, n412-rv1 .png). QUICKCHECK PASS (129 s, old save ok, perf new/live render 164/149 ms). Final sha 0872eae3.
Tests: pcard-fill.js 755x1000@1 + 1180x820@1: rv0 rv1 court0 court1 all true, errs []; pop / popdone / me report card:false ALSO on origin/main d0a839e8 in this container (stage pop-up not reachable by that harness) → covered by a direct pcard() unit probe: 1 group / 0 groups / with .close all give key + info panel (+ "more" block when no group). stat-fx-2.js FAILS on origin/main too (mood unknown/noCause, see its output) — not caused by this change; card glow on the key block works. Quickcheck: see line below.
SHOTS (host mode, looked at): Fold 755x1000 rv1; iPad 1180x820 rv0/rv1 (likes+dislikes known), court0/court1; 412x1058 rv1 (narrow). Portrait/frame images are CDN-only: in this container they show the card back, layout/size is real.
OPEN for main: (1) ksz3/kdper decision above. (2) side finding kept: 2-up option cards at 755 "được/mất" one letter per line — kit task. (3) the harness lives in the scratchpad only (h.js); dev/test/pcard-fill.js is the committed test.
