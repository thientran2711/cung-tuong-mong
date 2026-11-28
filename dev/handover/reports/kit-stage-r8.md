# KIT-STAGE-R8 report (MAIN 170)
PRIORITY #1 CHECK: OD 26/11 ~23:58Z «bỏ lật, làm theo Game of Dice», MAIN 168 00:47Z (8 rows → R8) | main 17f23656 (kitHand no-flip not on main; jkhrows none) | review/kit-hand-mount 089a822b (KK52 no-flip), review/kit-stage-r4 a30c0147 | claims KIT-STAGE-R8 (this), KK53 building kitPick «Chọn» + thẻ lụa.

## Done (branch review/kit-stage-r8)
1. Base merged: kit-stage-r4 a30c0147 + KK52 no-flip kitHand 089a822b + LIVE main 17f23656 (conflicts: jk2b/jopic = LIVE odds-word rule, KIT.md union, KIT_REQUESTS both, kit-stage-r5-video.js deleted = replaced by kit-hand-god-video.js, index/sw rebuilt, assets.json = LIVE). `grep -c "const KIT_HAND=" index.html` = 1; assemble.py has the union (jkpick jkpcard jkhand jkstage jkmapban + LIVE + new jkhrows).
2. No-flip family-wide: flip code/CSS/tests already gone via KK52 (kitHandFlip*, .khflip…); R5 flip video script removed; grep of kit-stage code/tests/KIT for khflip/khfb: none left.
3. Outside-#modal rows via ONE adapter kitHandRows (KIT §101.14, dev/build/jkhrows.js): Hành sự act deck (13 cards, all shown), Tài nghệ skill cells (hand of 2–3 per skill card), empty-tab acts (hand when ≥2). Originals parked, «Chọn» = original click.
   Status of the 8 rows: SELSCENE kbare + kpsc identity pair = inside #modal (frame hand path, unchanged); jactj4 doors = DOOR.card = #modal hand, no «Thôi» card (probe: hand true, 3 cards); Hành sự / Tài nghệ / empty-tab = wired; Khuê các decks + Việc groups = no sibling-card row found on any tab at game start (family scan INFO) → NOT wired, needs a mid-game save to reach (open); jflip = Emperor's flip animation, no option row → not a choice hand (MAIN to confirm).
   FAMILY-SCAN INFO for MAIN: Hậu cung / Hoàng tự person card «pcg» groups hold 5 act cards (Xin yết kiến ở Cần…) — a card row not in the KK44 list; left as is, say if it must be a hand.
4. kitPick ✓/✕ → «Chọn»: NOT done — waiting for KK53's sha (not duplicated).
## Tests (worktree d1958b3a + jkhrows)
kit-hand PASS · kit-stage PASS · kit-hand-mount PASS · kit-hand-rows PASS (Fold+iPad) · result-sieve-card PASS · kit_dupes OK · thoi-live-scan: not re-run to the end (needs usage hand-max-scan args) — rerun by successor.
## LOOK media (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r8/)
fold-banbai.mp4, ipad-banbai.mp4 (deal → enlarge → «Chọn» 280x64 → result, no flip), fold-rows-act.png (13-card Hành sự hand), fold-rows-tainghe.png. Looks to check: Tài nghệ hands leave blank space under each skill card; the Hành sự filter chips still show above the hand.
## OPEN / HANDOVER
- kitPick → «Chọn» after KK53 sha; Khuê các decks; thoi-live-scan rerun; MAIN look → KIT OK → RV-165.
- Merge caution: keep assemble.py union; LIVE jevc daily cap → tests firing c2a need S.evc=null.

## UPDATE 03:45Z — ROLLOVER HANDOVER (to MAIN 171 session_01Rc5AsLtirkQB1N5Nb16Wct)
Pushed: review/kit-stage-r8 (kitHandRows etc. above). New orders received after the push:
1. KK53 kit: review/kk53 **a7ee4459** (supersedes 9771ffb9 / 4e333222): the big «Chọn» bar is replaced by a small in-card chip (BAL.kpkgo {w:68,h:32}; class `kbtn khok`; INSIDE the card's bottom-right, 6px in / 5px up, card grows a bottom strip padding-bottom = h+8; two-tap = choose; tap board = back). See jkpick.js conf() + CSS `.kpk>.khconf.kpk-go>button.kpk-gob`; also root fix of the «; x; x» de-dupe in jopic kitOptFinal + jk2b kitHintRow (drop the jkhand de-dupe).
2. MAIN 170/171 ruling: apply the SAME chip to the no-flip kitHand enlarged card (jkhand/.khost>.khconf, 280x64 bar → chip, no bar under it), and kitPick ✓/✕ → «Chọn» = take kk53 as is.
TODO for R9: merge origin/review/kk53 a7ee4459 into review/kit-stage-r8 (expect ~20 conflicts: kit-hand-mount base is older LIVE; keep assemble.py union incl. jkhrows.js); restyle .khost>.khconf chip in kitHand (frame + mount, one source); update kit-hand / kit-hand-mount / kit-hand-rows tests (khok size 68x32 inside card, two-tap); re-record mp4 Fold 755x1000 + iPad 1180x820 (kit-hand-god-video.js) to CDN img/_review/kit-stage-r8/ (current mp4s there show the OLD 280x64 bar); rerun thoi-live-scan (usage: hand-max-scan.js args); answer open Qs (jflip not a hand; Hậu cung/Hoàng tự «pcg» 5-card groups; Khuê các decks unreachable at start).
