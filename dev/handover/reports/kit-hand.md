# kit-hand — KK30 (kit keeper) — kitHand «Bàn bài» — branch review/kit-hand @ 8e50f709 (base review/kit-opts-pack-4 7603d689)
PRIORITY #1 CHECK ('kitHand'/'Bàn bài'): OD 2 (24/11 ~15:15Z, 25/11 ~15:12Z) | ledger 0 | claims 0 | main 0 | review/* 0 code (mocks only: motion-design-4 7939838d m1) | kitPick/KIT_PLAQUE: NOT on main nor on the base — only review/kit-ring5 f44c657d (KK25, «STAGED, NOT WIRED» per KIT §98).
START_CTX ~5 % (get_session reads 0; estimate). Stopped at ~30 % (START + 25 %) = rollover.

## Done (KIT §101, dev/build/jkhand.js + jksize kszHandFit3)
- Every `#modal .opts` of 2–10 kit option cards = a HAND: face = act picture + short name + odds meter; tap 1 = lift + details plate (kit «!» card copy: Tốn/Được/Mất/Gợi ý + «Chạm lần nữa để chọn»); tap 2 = card flies, then the normal chooseM path. Locked card lifts + shows why, never chosen. Keyboard / robot (`click()`, detail 0) chooses at once; data attributes unchanged.
- Not a hand: 1 option, >10, person pickers (face cards: evpick/itarget/plantsv stay pickers), .kpdlg, .pc.
- Layout: Fold = stacked full-width frame (NL>NM>NS), hand under the body; iPad = XL, hand at the foot of the right column, full height when the text would scroll; compact hand when still no room; hand sticky (never scrolls out). 7–10-card frames are now event frames (were pick-list pages).
- Motion: transform/opacity on cards only; deal waits for decoded pictures (≤700 ms); plate hides when the card flies; no ripple / seal re-place on hand cards.
- Guards: jopic kitOptTier + jksize kszBtnGridLive3 skip hands; jfx no lock-pop/ripple on hand cards; jseal ignores hand mutations. Kit page sample `kitPgHand` (§101 row).

## Gates (this branch)
| gate | result |
|---|---|
| NEW dev/test/kit-hand.js (real c2a «Tân quân lập uy Ch.2», 2/6/8/10 cards, locked, keyboard; Fold+iPad) | PASS |
| opt-frame-scroll-scan TAP2=1 (NEW mode: real tap ×2 on the last card of every real PEND frame) | Fold 37 hands chose, iPad 37 chose, FAIL 0 |
| opt-frame-scroll-scan diff vs base 7603d689 | Fold + iPad REGRESSIONS 0 (45 vs 41 rows: 4 new 7–10-option frames; 3 of them person pickers, back out of scope) |
| kit-faces-opts (updated: two taps on a hand, hand floor in the text-fit rule) | 36/36 |
| dialog-fixed (updated: §101 hands read plate rows, N frames on Fold) | all pass |
| kit-one-opt-tap 30 / touchdrag 8 / row-tap-size 18 / tag-collide 708 tags | FAIL 0 each |
| dead-card | PASS |
| quickcheck on be559f81 | QUICKCHECK PASS (open ok, old save ok, perf new/live render 221/251, tab 460/407, buổi 1204/942) BUT core G1 one-core-guard FAIL: kit-page sample typed numbers → fixed in 8e50f709 (words only). Rerun of coregates was still running at handover — successor: rerun `bash dev/tools/quickcheck.sh`. |
| hardlock-scan / button-crawl / q-softlock | not on this base (not in dev/test) — not run |
| NEW kit-hand-perf.js (rAF frame times) | lift / fly mostly 17 ms p95 after a warm-up tap; the deal still shows 1–4 main-thread long frames while a FRESH frame builds and loads pictures (CPU 1× and 4×). The motions are compositor (transform/opacity), likely smooth on screen, NOT proven. OPEN. |

## OPEN for KK31 (successor; brief briefs/KK30-kithand.md items still open)
1. VIDEOS not delivered: /home/user/wt/kk30-shots/rec.js records, but my trimmed clip missed the deal and showed the plate staying during the fly (fixed in 8e50f709). Re-record Fold+iPad (1× + 2× slow) on 8e50f709, check the deal is in the clip, LOOK at every frame sheet, upload NEW names to img/_review/kit-hand/, then KIT READY to MAIN.
2. Smoothness: confirm on video / compositor trace; if the deal stutters, hold the deal until the frame's picture re-fits finish (KIT_HAND.readyMs) — dropping the animation is NOT an option (owner).
3. Item 5 thẻ gỗ treo (kitPick, ≤3 per page) on every person conversation screen: NOT started. kitPick is only on review/kit-ring5 f44c657d. Merge it, then wire into jdfv kitFocus acts / #popw person card (j6/jdf dfActs) / jfocus choices (RD5 rec, img/_review/ring4/).
4. «No event frame first»: the hand deals INSIDE the existing kit event frame (speaker left, text, her hand). MAIN to judge whether the frame itself needs an entry move.
5. hardlock-scan / button-crawl / q-softlock: ask MAIN where they live.
Worktree /home/user/wt/kithand (sparse); scratch /home/user/wt/kk30-shots (probe.js, prof.js, rec.js, perf2.js).

## ADDENDUM 17:58Z — MAIN messages read late (queued 15:53Z–17:41Z, read 17:55Z)
KK31, do these FIRST (MAIN 144 = session_01V1ZZH3PV7kr8kWB89YiVN7; 7603d689 ships ~18:30Z):
1. MAIN 143 FLIGHT PRIORITY (not done by KK30): base 7603d689, iPad 1180x820 law-10 FAIL in kit-faces-opts faces1 lines7 opts4 — strip ok, 4 options in view, but the 7 story lines sit under the faces row behind «Kéo xuống». Fix the family in kszTextFirst3: on iPad the faces row steps down too (small chips / one row beside the strip) and/or options 1 column narrower; if impossible, text keeps first place and the option list scrolls (floor 112). Repro: FACES='[1]' LINES='[7]' NO='[4]' node dev/test/kit-faces-opts.js index.html <out> (shot BEFORE the tap). Re-run kit-faces-opts all + 41-frame scan + kit-notice-action, Fold+iPad pair (NEW CDN name), KIT READY <sha> to MAIN 144 + a FOR MAIN/B KIT line in FOREMAN_B_STATUS.md. Then port to review/kit-hand.
2. MAIN 143 FYIs to check in the scan: (a) iPad «Tâm trạng · Cung nữ thân tín tam đẳng …» dialog with no close/continue even scrolled to the end = no-button card family → kitModalSafe / every kit dialog has an exit; (b) «Bổng lộc tháng chín» reward over the END card = kitEndUp (pack-4) confirm covered; (c) kpopTrap/odds chip in card tap zone = harness-only, optional.

## KK31 (session_01V1ZZH4F57paDBkBCH9PESr) — 25/11 19:30Z — FLIGHT delta review/kit-text-first 708056a9 (base pack-4 7603d689, independent of kitHand)
PRIORITY #1 CHECK ('kitHand'): OD 2 | ledger 0 | claims 1 (KK30) | main 0 | review/* 0 ; ('kszTextFirst3'): OD 0 | claims 3 | main 0 | review/* only kit-opts-pack-4 + kit-hand. START_CTX ~6 %.
1. iPad 1180x820 faces1 lines7 opts4 (shot BEFORE tap): pack-4 = 0/7 lines visible; kit-hand 8e50f709 = 4/7 (NOT fixed). Delta: (a) jksize 56.25 grow also when the story text still scrolls (kv2 L/XL, kept only if it helps); (b) kszTextFirst3 step: faces row (.kpmain>.faces, kit pframes) small 34 px + name beside (data-tff) before the picture goes out; (c) scroll-cue family (kitScrollCues): short-list strip follows its list, stale strip removed, a list with its own strip shows no in-list hint (Fold had two «Kéo xuống»). KIT.md 56.32b + 56.31b amended in place.
2. MAIN 144 extras: (a) «Tâm trạng · …» no exit = pack-4 shows ✕ (24-row kitModal, iPad+Fold, after scroll) → FIXED-ON-LIVE for that shape, E to recheck on LIVE (their evidence was a local main build). (b) reward box over END: NEEDS-DELTA on pack-4 (box already open / queued stayed over «Kiếp này») → fixed here (j93: queued job checks kitEndUp; open box closes when #modal turns .end/.kes); probe pack-4 true/true → delta false/false. (c) kpopTrap parked (not flight).
Gates on 708056a9: kit-faces-opts 36/0 · kit-opts-touchdrag 8/0 · kit-one-opt-tap 30/0 (alone ×2; one locked-card «tap pop» flake only under parallel load, same flake class on any build) · kit-notice-action 16/0 · opt-frame-scroll-scan Fold 41/0 + iPad 41/0, diff vs 7603d689 REGRESSIONS 0 (one j7c Fold hint flake in a parallel run, 41/0 on rerun, alone pass on both builds).
Pair (NEW names): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-text-first/kk31-708056a9-pair-fold-ipad.png (+ kk31-708056a9-fold-755.png, kk31-708056a9-ipad-1180.png).
OPEN: Fold re-pick settles XL+text-first or NL (both read all 7 lines); 2 early shots (before the cue fix, heavy CPU) caught a pre-text-first layout — 23/23 later measured runs fine. Port to review/kit-hand next; then KK30 list (quickcheck rerun, videos, kitPick).
- (20:21Z KK31) QUICKCHECK PASS on 708056a9 (alone: core gates PASS, open 2719 ms, old save ok, perf new/live render 326/338, tab 905/764, buổi 2404/2197). Quickcheck needs coop/ in the sparse checkout (G4 imports coop/worker/src/merge.js) and must run alone (perf noise). Delta ported to review/kit-hand 9cffbf17: kit-hand.js PASS, kit-faces-opts 36/0, opt-frame-scroll-scan TAP2 Fold 42/0 + iPad 42/0. Still open from KK30 list: videos Fold+iPad, deal long frames, kitPick (ring5) wiring, «hand inside event frame» proposal, SELSCENE-19 hunk (not received yet).
