# tut-place (worker, branch review/tut-place @c1b09285)
START_CTX ~8 %. Base review/test-drift-roulette-r1 @70cae6bd + origin/main 73c06812 merged; site rebuilt (dev/site/build_site.sh).

## Bug 1 (game): tour card covered the lit tap target (step 5 "thu", 755x1000)
Cause: jtut.js place() chose a side only when the full 560x700 card fit; at 755x1000 the hole (737x250 at top) leaves 586 px below, so the tap-step fallback put the card at the side, still over the 737-px-wide hole.
Fix (dev/build/jtut.js place(), kit card only, no private style): candidates below / above / right / left of the hole. Full size fits -> preferred side (below, or above if step.side). Otherwise the card SHRINKS on the roomiest side through the kit variables --kpw/--kph of kitPersonDlg (kit text scrolls inside .kpdt, figure re-fitted with kitPersonDlgFit), width kept when possible so only the height gives. Hole fills the screen (step "tutrang", not a tap step): old behaviour (card at the target's lower edge); a tap step in that case would go to the corner farthest from the hole.
Result 755x1000: step "thu" card 560x586 at y=406 below the hole (hole bottom 394), overlap 0. Same group, all 14 steps/6 sizes: overlap 0 for every step except "tutrang" (whole page is the target, non-tap).

## Item 3 (1180x820 first-open Tài nghệ tip): TEST drift, not game
The tour test dismissed a queued earlier tip (Hành sự) with `#ktip [data-ktip]`, a selector that does not exist (the kit button is `[data-ktut=tip]`), so the first tip never closed and tab-art never showed. Fixed in dev/test/tutorial.js (3 places). Game unchanged for this.

## Tests (serial, cdn-overlay-serve, Playwright; 0 page errors)
tutorial.js all modes (tour,skip,replay,old,bot): 755x1000@2, 1180x820@2, 1000x755@2, 412x1058@2, 390x844@3 fails 0; 1366x1024@2 tour,skip + replay,old,bot fails 0 (one earlier full run under 4-way parallel load failed once "tour did not start", a queued "Kính sự phòng báo tin" popup; rerun alone green: load flake of the new-life helper).
kit-conform 755x1000 and 1180x820: floats none (CONFORMS 84/85, MISSING 15 = unchanged).
boot-flash 755x1000: ok (warm ready, 0 skeleton states). game-feel (3 viewports, sw-serve): ok:true.
Screenshot: dev/handover/reports/tut-place-755x1000-step5.jpg (step 5/12, card below the lit card).

## DECISION FOR MAIN / OWNER (conflict)
OD:L963 + kit-conform required every tutorial step card to have the SAME frame size. A card that never covers its hole cannot do that on a 1000-px-high screen (700 px card + 250 px hole + tabs). I changed the kit-conform check (dev/test/kit-conform.js l.107) to: a step card may be smaller than the intro frame (height first), never larger. If the owner wants strictly one size, the alternative is a smaller intro/step card height for the whole tour at this viewport (~560 px); say so and I will change the one constant.
