# KIT-STAGE-R5 report (MAIN 163): Bàn bài card FLIP + paging + long names

Successor of KIT-STAGE-R4. Branch `review/kit-stage-r4`, head c823342a (on r4 a72290a9). Built files committed. MAIN 163 LOOK PASS on the flip (914674fa); MAIN is now 164 (session_01Rc5AsMRACKNY1roydzvpF7); kit keeper KK46 (session_01Rc5AsJWaXnsnQJdFazBWmx, inactive at 21:58Z).

PRIORITY #1 CHECK: OD 26/11 ~20:45Z row (Bàn bài flip + result card too long) + rulings (a)/(b) | main none (kit-stage not live) | review/kit-g4-r3 f375e154 holds KK45's kitResFold §7.4a (4 names + «+N người khác»), the result-card part | review/ring-build 8ea545fb (RING-BUILD-3 ring, hooks kitKind "ring") | claims: KK45 = kit keeper (result card), me = kitHand. No new private part: the flip is built INSIDE the existing kit part §101 kitHand (jkhand.js), so every hand gets it at once.

## Owner words (verbatim, 26/11 ~20:45Z)
"Chỗ này làm gần đúng, như hình 1 khi chọn 1 thẻ, là ngày trên thẻ hiện thông tin, chứ không phải 1 chip thông tin ở trên, làm animation kiểu lật thẻ mặt sau, để đọc thông tin á / hình 2 khung kết quả quá nhiều thông tin"

## What changed
1. **KIT §101.10 «lật thẻ»** (`dev/build/jkhand.js`, `jkstage.js kstgPlate`): canon overwrite of the details plate (the chip above the hand). Tap a card → a reading-size copy of THAT card (216–300 px wide) grows out of it and turns over in 3D (rotateY 0→180°, 420 ms, transform only on the copy; kfStill = no motion). FRONT = card face; BACK = the same kit card copy the «!» overlay uses: full name as title, odds word (7-band ladder), Tốn / Được / Mất, Gợi ý; a locked card shows its kit «why». Numbers all come from the kit card (BAL). It stands ON its hand card (bottom on the card's bottom, inside the frame, never above the head / stage faces band; a long back scrolls inside). ✓ / ✕ sit on its lower edge and show only after the turn ends. ✕ / a tap elsewhere = it turns back and shrinks into its card; ✓ = the flipped card flies up, then the frame's own choose path runs. A tap on the flipped card does nothing (it never falls through to the cards under it). The stage Bàn bài uses the same placement function (`kitHandFlipPlace`): one part.
2. **KIT §101.11 paging** (ruling (a)): more than 10 cards (up to 40) → even pages of ≤7 (12 = 6+6, 15 = 5+5+5), ‹ › beside the hand + «n / N» pill; wraps; page turn slides the new cards in. Hidden cards stay the same buttons (robots / keyboard unchanged).
3. **KIT §101.12 long names** (ruling (b), canon overwrite of KK41 «stays the list»): a name that spills the 4-line face → every card a person → kind "ring" (RING-BUILD's ring; keeps the list until the ring lands) · otherwise → kind "pick" = thẻ gỗ treo on the stage, every plaque shows the WHOLE name.
4. KIT.md §101 / §102 lines rewritten in place (canon overwrite). Tests: `kit-hand.js` (+ paging 12/15, long names → thẻ gỗ; tap helper hits a neighbour where it shows next to a flipped card), new `kit-stage-r5-video.js`.

## Result card (part 2 of the ruling) — NOT done by me
The result card is KK45's kit part (j63 `kitResFold`, review/kit-g4-r3). I proposed the split to KK45 (session_01Rc5AsKCWdL7VbM8UKMWRhd) at ~20:50Z: KK45 changes §7.4a to max 3 named people (named-in-choice first) + ONE summary line per stat for the rest («Hậu cung: thiện cảm −4 (10 người) · oán +1 (9 người)») + «Xem đủ trong Sổ ghi», her own rows incl. «không» kept, no «một vị …», fits Fold + iPad without scroll. No reply yet. When KK45 gives a sha, merge it into review/kit-stage-r4 (kit-g4-r3 touches 6 of the same build files: j3, jbal2, jk2b, jkitpage, jksize, jopic — check conflicts) and record the result-card video.

## Tests (this build, Fold 755x1000 + iPad 1180x820)
- kit-hand.js: 130 ok, 2 FAIL = «c2a every card its own picture» (the «Cúi đầu vâng dạ» card shows the placeholder picture ph-s-light = missing act art; the picture rule is not touched by this change, not re-checked on the r4 build).
- kit-stage.js: PASS. kit-kind-scan.js: 54 frames, WRONG 0.
- kit-stage-r5-video.js: boot closed, flip in view, ✓/✕ in view, back has no scroll, ✕ puts back, ✓ chooses, 0 page errors on both devices.

## Videos / stills (looked at every frame: first frame = loaded game, no boot notice; flip turn visible frame by frame; ✓/✕ appear after the turn)
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r5/fold-banbai.mp4 · ipad-banbai.mp4 — rg c1b: deal, tap card 1 → flip, ✕ → turns back, tap card 2 → flip, ✓ → chosen (15 s).
Stills: fold-flip-still.png, ipad-flip-still.png, fold-paging-still.png (12 cards → 6 + 6, ‹ ›), fold-longnames-thego.png (long names → thẻ gỗ, whole).

## Old left (card hand, KK44 §1)
Ruling (a) >10 → paged hand: DONE. Ruling (b) long names → thẻ gỗ / ring kind: DONE. Ruling (c) info panels: closed (r4). 8 outside-#modal rows: still waiting on the kit part «kitHand.mount» (KIT REQUEST to the kit keeper, r4). **Card hand old left = 8** (all waiting on the kit part).

## HANDOVER (if I roll)
Next: (1) KK45 result-card sha → merge + result video (Fold + iPad, real taps, after load) to _review/kit-stage-r5/; (2) the 8 outside-#modal rows when KK45 says KIT READY «kitHand.mount»; (3) re-run kit-hand / kit-stage / kit-kind-scan / kit-stage-r5-video. Worktree: /home/user/cung-tuong-mong on review/kit-stage-r4; report worktree /home/user/wt/ho (sparse, handover branch).

## UPDATE 21:58Z (after owner 21:25Z «maximum 7 lá», no paging)
- §101.11 paging REMOVED (d64663a9): KIT_HAND.max = 7; >7 = not a hand, a source fault. KIT.md §101.11 rewritten in place.
- RESULT CARD: KK46 kitResFold 9a2c05f6 merged (4b3beedb). Videos fold-result.mp4 / ipad-result.mp4 (+ stills) in _review/kit-stage-r5/: Bàn bài flip → ✓ → result card (her row, 3 named, one «Hậu cung: …» line, «Xem đủ trong Sổ ghi», fits F + I). (fold-paging-still.png on the CDN is stale — paging is gone.)
- KK46 review FAIL items: F1 fixed (every «Cúi đầu …» option → bowing picture, jopic; the old card fell to the shared stand-in), F2 already done, minor done (locked flipped card shows ✕ alone). kit-hand.js PASS 100/0 F + I. KK46 re-review pending (session inactive when told; next kit keeper: re-review c823342a).
- ≤7 CENSUS tools: dev/test/hand-max-scan.js (PEND × ranks), dev/test/hand-max-hook.js + evbot EVJS/EVCEN (robot census), dev/test/hand-max-static.py (literal arrays).
- TABLE sent to MAIN 164: shop tray 11 → 7 (BAL.shopTray 6 + Thôi, cap in the last restock wrapper jshelf) · «Sai … đi dò la» 12–13 → kind ring · evpick/itarget/plantsv already ring · selxD 8 = robot view only (player 6) · gift/plant item grids 19 = not cards · pmLad 9 = OPEN (MAIN call: rec info panel) · rest ≤6. Not reached: jerr/jptime order lists, j71c stances, jky (need a mid/late save).
- OPEN QUESTION to MAIN 164: does «no paging» cover the thẻ gỗ talk stage (KIT_STAGE.sayPer = 3 per page)?
HANDOVER next: MAIN's answers (pmLad, thẻ gỗ paging) → implement; count jerr/jptime/j71c/jky from a mid-game save; KK46 re-review; then land path per MAIN.

## UPDATE 22:25Z (MAIN 164 rulings 22:04Z) — head 489cd579
- thẻ gỗ no paging: talk/pick stage = one group (sayPer gone), KIT_PLAQUE.max 7, speech band = plaque obstacle (7 fit on Fold above it). KIT.md §102.2 in place.
- pmLad = one kit info panel (no option cards).
- Honest-limit lists counted from source: event/road/kỳ ngộ data ≤7; j71c 4 stances; orders expire after 2 khắc (no cap needed).
- Card back marks: inherits WORDING-MARKS (markTxt in kaBody, review/wording-marks 51a0575a) — verify after it lands.
- KK47 (session_01Rc5AsHmtzuWMnb27oL1LC5) asked to re-review 489cd579; then RV-163.

## UPDATE 22:50Z (owner 26/11 ~22:07Z bugs) — head b1b16a4a, LOOK READY sent to MAIN 164
- §101.10: tap 1 = the card enlarges (front, card's own shape), tap 2 = turns over, back same size; ✓/✕ on the lower edge; ✕ shrinks back. KIT.md rewritten in place.
- §102.7: event stages (hand / thẻ gỗ) show NO figure — background + cards + info box; figures only in a dialogue. kit-stage.js check = 0 figures.
- Result card empty band (owner 22:07Z (1)) = kit keeper (KK47 session_01Rc5AsHmtzuWMnb27oL1LC5 was inactive when told; next kit keeper please take it + review b1b16a4a).
- Videos/stills: img/_review/kit-stage-r5/{fold,ipad}-{banbai,result}.mp4 + *-still.png.
HANDOVER (context high, roll at next task): open = MAIN look + sếp ok on b1b16a4a; kit review (KK47 or successor); WORDING-MARKS land → check the card back shows marks (Được/Mất) and exact Tốn; RV-163 after kit PASS. Test commands: node dev/test/kit-hand.js index.html <out>; node dev/test/kit-stage.js index.html <out>; ONLY=banbai,result node dev/test/kit-stage-r5-video.js index.html <out>; node dev/test/hand-max-scan.js index.html.

## ROLLOVER HANDOVER 23:05Z — head ac95f7e9 (successor: KIT-STAGE-R6, opened by MAIN 165)
State: MAIN LOOK PASS b1b16a4a (enlarge→flip, no event figures); e8126d18 back filled (kit type scale); ac95f7e9 owner 22:43Z «không bắt buộc max 7 lá … lá bài thôi thì dẹp»: KIT_HAND.max 10 (all cards at once, no paging), KIT_PLAQUE.max 10, BAL.shopTray cut UNDONE (tray back to its real items), KIT.md §101.11 rewritten in place. kit-hand PASS 116/0.
OPEN for R6 (in order):
1. REMOVE every close-only option card («Thôi», «Thôi, để sau», «Bỏ qua», «Để sau», «Đóng»): `python3 dev/test/thoi-scan.py` → 67 CLOSE-ONLY rows (j8 PEND pickers ×7, j77 ×4, j83 ×3, jdoor ×3, jgift ×3, jts ×4, jtds ×2, jnf ×2, jrcp ×2, jpma ×2, jdh/jdh2, jstatus/jgoal/jge/jhaohuu/jload «Đóng» …) and 78 REAL «Thôi, …» story choices (they carry w/l/wx/lx/rt/e/fx or a go → KEEP). Before removing each, check the frame has its ✕ (kit-x) and that «Thôi» had no refund side effect (jwhy spyPick «Thôi, để sau» refunds S.payOnPick — move that refund to the frame's onClose). Verify the scan's CLOSE-ONLY rows by reading each (the regex is a first pass; e.g. j25:41 «Thôi, ở lại», jkcco:175, jsmg:65, jts:361 may carry text-only consequences). Whole-family before/after table to MAIN 165.
2. Frames that truly need >10 cards: hand refuses (list) — ask KK48 (session_01Rc5AsKCV8Zc8zV3nMq8Y8v) for a no-paging layout (3 rows / smaller tier) if any shows up (hand-max-scan.js: shop tray 11 incl. Thôi → 10 after Thôi removal = a hand again).
3. KK48 kit review of the branch (sha after 1.), result-card empty band = KK48. Then RV-163.
4. WORDING-MARKS land → check card back marks (Được/Mất marks, Tốn exact).
Tools: kit-hand.js, kit-stage.js, kit-stage-r5-video.js (ONLY=banbai,result), hand-max-scan.js, hand-max-static.py, hand-max-hook.js (evbot EVJS/EVCEN), thoi-scan.py. Videos: img/_review/kit-stage-r5/.
