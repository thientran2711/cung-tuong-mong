# REVIEW kit-option-rows r1 of 3dabd1f7 (merged with origin/main e9bbc4d6 -> f7e2e1ef on review/kit-option-rows-r1)
PRIORITY #1 CHECK: brief s34-review-kit-option-rows.md | main none new | review/kit-option-rows 3dabd1f7 | claims MAIN s34.

VERDICT: FAIL f7e2e1ef (1 item). Merge conflicts (jksize.js x2, KIT.md, generated index.html/sw.js) resolved: main's 270 px `kart` floor kept, then kszNeedTxt; KIT §33.40 + §87 both kept; site rebuilt. Not pushed to main.

## (1) option modal widths: FAIL on Fold
- option-modal-scan (60 turns): fold 19 modals 0 flagged, ipadAir 22 / 0, ipadPro 20 / 0. Cards on iPad: 1 column (360-858 px) or 2 columns of 298 px with text >=190 / value >=153. iPad shots LOOKED: 2 and 3 option modals full width, no clipped line.
- BUT the scan is random (endTurn x N); a second Fold run (8 turns) reached "Hội phối đồ · Phú quý" (Hoàng hậu figure on the LEFT, options on the RIGHT, option column only 304 px): n=2 cols=1 cardW 304 (text 190 / value 137) -> NARROW. Shot: the CẦN/TỐN/ĐƯỢC/MẤT/KÈM values wrap 2-3 words per line ("đứng đầu: Sủ- / Danh +3 / một món ban / vào ba ngư-"), the same ~140 px value column the owner complained about. Same layout class = every Fold event with a figure on the left + picture-card options.
- FIX asked (kit only, jksize/j63): in the figure-left layout when the option column < ~340 px, either put option cards under the figure/body full width, or stack label above value (kit row) so values get the card width; then raise scan MINW threshold to guard it. Make the scan deterministic: seed Math.random or call every builder (tsOpt, fest, dil, work cards) directly so a run covers the same set every time; add a fold figure-left case.
- 412x1058 / 390x844: host mode shows the "Xoay ngang điện thoại" rotate prompt over a rotated game (as designed), no portrait layout to judge; not scored. Pixel 412x915 not in device list; scanned as 412x1058 custom: no portrait result beyond the rotate prompt.

## (2) KA_NOTHING: PASS (sampled 10 of 20)
j71:114,121 (Không dự đứng xem), j71:332, 378 (Không dự: go sets plan 0 only), j71:388, j31:21-22 (fest skip), jact:154, jact2:48 AS_WATCH ("Đứng xem rồi về"), jstip:134. All decline/skip with no hidden loss. jstip:134 "không được không mất · kèm: tháng sau dễ bị bớt xén nữa": regex is anchored per segment, so the real KÈM loss stays visible. Regex only hides whole-segment "says nothing" lines. econ-items "Đợi Nội vụ phủ" shows its loss (worker report). Not exhaustively re-run in DOM for "hỏng: không mất gì" prefix: old filter allowed an optional "hỏng:" prefix, new KA_NOTHING does not; label is stripped by kaModelStr before kaRows so scan EMPTY/NOTHING = 0 on all 3 devices.

## (3) doubled "thành:": PASS
No LIT flag in any of 61 modals (3 devices); dilLine keeps an existing label.

## (4) KIT.md: PASS (§87 present, single kit rule: kszNeedTxt + KA_NOTHING + dilLine, no per-modal CSS).

## (5) quickcheck: PASS 160 s on f7e2e1ef vs live e9bbc4d6 (open 1718 ms, old save ok 0 errors, core gates PASS, perf render 195/183, tab 338/372, buổi 1203/938, tasks>200ms 14/14).

## Shots: harness note
Scratch only (/tmp, never CDN, none uploaded -> nothing to wipe). A night-scene popup overlays the test modal; with the modal raised above it, a screenshot taken mid-animation shows the card list doubled (artefact: DOM has one .opts / 2 buttons, verified). Real shots only after waiting >1 s.

## Next
Worker (kit-thanh-bai successor or new) fixes (1) then I re-run r2 (scan fold x2 seeds, ipad x2). Everything else in 3dabd1f7 is fine to keep.

## r2 re-run (worker fix f422a570, merged with origin/main d5ea786d -> 6a818dea on review/kit-option-rows-r3)
VERDICT r2: PASS 6a818dea (kit-option-rows part only; kit-thanh-bai reviewed separately).
- Fold figure-left case fixed: label-over-value (.kszstk) -> values 190 px (was 137). Shots LOOKED (Hội phối đồ · Phú quý, Có người đến): labels CẦN/TỐN/ĐƯỢC/MẤT/KÈM above values, no word-by-word wrap.
- Scan fold seeds 7/11/23 x25 turns: 13/14/9 modals, 0 flagged; ipadAir seed 7: 8 modals 0 flagged. Quickcheck PASS 168 s (open 1713 ms, old save ok, core gates PASS).
- Note (minor, not blocking): in Hội phối đồ on Fold the 2nd option card's bottom edge is cut by the frame's inner scroll (text of the shown rows is whole). Same as r1, worker disclosed it. Suggest kit-thanh-bai/next kit round lets that column grow or shows a scroll hint.
- Scratch shots in /tmp only, nothing on CDN from me (worker's img/_review/kit-option-rows-r2/ must be wiped by main/worker after verdict: python3 dev/site/cdn_sync.py --wipe-review kit-option-rows-r2).

## REVIEW kit-thanh-bai r1 of e3c1583f (includes option-rows r2 f422a570); merged with origin/main 03a776e4 -> 922c7253 on review/kit-thanh-bai-r1 (only index.html/sw.js conflicted, site rebuilt)
PRIORITY #1 CHECK: briefs s34-kit-thanh-bai + MAIN s35 order | OD tail (17/11 ~17:10Z real) (2) | review/kit-thanh-bai | claims MAIN s35.
VERDICT: FAIL 922c7253 (2 items). Option-rows r2 itself stays PASS.
PASS parts: quickcheck 200 s PASS (old save ok, core gates PASS); thanh-bai-scan A 28 deck cards (20 sure = 1 block, 8 roll = 2 blocks, 0 literal labels, Tốn on 28/28), B 622 strings 0 kit errors; option-modal-scan fold 13 / ipadAir 11 modals 0 flagged; seal THÀNH/BẠI/KẾT QUẢ in code (kitResultSeal, j19/j25, quest tag, tutorial) and VANPHONG §185-186 updated; "HỎNG" only left in code comments; "hỏng:" / "bại:" input alias kept. Fold shot LOOKED: Tốn once above, THÀNH block (ĐƯỢC), BẠI block (MẤT, KÈM inside), dashed separators, label-over-value readable.
FAIL 1 (MAIN's criterion): no scroll cue. Hội phối đồ · Phú quý on Fold: .k3right scrollHeight 674 > clientHeight 510, scrollbar width 0, no mask/fade, no chip: the 2nd card ("Cáo bệnh, không dự") is cut at the frame edge and nothing tells her it scrolls; the two-block cards are taller than r2 so more is hidden. iPad (direct builder): body scrollHeight 1402 vs 531, the first option card starts at the very bottom, cut, no cue. Fix (kit, ONE place): every kit frame scroll column (.k3right / .body) gets a bottom fade + a small "Kéo xuống" cue chip while scrollTop+clientHeight < scrollHeight-4, or the XL column is allowed to grow; document in KIT.md; scan: flag any modal whose option cards are cut (scrollHeight>clientHeight) and have no cue element.
FAIL 2: an option with no gain prints the BẠI wording under THÀNH: "Cáo bệnh, không dự" shows THÀNH -> dim "Tốn công, không được gì", BẠI -> MẤT Danh -1. "Tốn công, không được gì" fits an empty BẠI (VANPHONG §186) but reads wrong under THÀNH (succeeding yet gaining nothing = toil). Report claimed "0 empty THÀNH" for deck cards, but scan B counts 73 source strings with empty THÀNH and option modals hit it. Fix: empty THÀNH prints its own dim line ("Không được gì thêm", add to VANPHONG) or the THÀNH block is hidden; also decide whether a SURE option whose only effect is a certain loss ("Cáo bệnh": no roll, Danh -1) is ONE block (rule: sure act = one block) instead of THÀNH+BẠI.
Notes: 412x1058 / 390x844 rotate prompt only (not scored). Worker shots on CDN img/_review/kit-thanh-bai/ and kit-option-rows-r2/ to be wiped after the final verdict; mine are /tmp only.
