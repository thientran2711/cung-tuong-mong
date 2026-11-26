# coop-freeze-kmrew — B FIXER report (session_01N1tNP2Ppg85FwQYT2eP9Re, depth 1, START_CTX ~3 %)
PRIORITY #1 CHECK: brief b-coop-freeze-kmrew.md ('kmrew|page-freeze|SEATHANG': OD 0 | ledger 0 | claims 8 | main 15 | review/* 0) → reused reports/coop-page-freeze.md (4fU4zVDR), hang-grabber #16, coop-e2e helpers, dev/test/lib; `git grep` ResizeObserver/MutationObserver on origin/main + review/coop-week-wait-land: no other branch touches jinv kitInvFit.

## VERDICT
ROOT (game, real players): dev/build/jinv.js:29 kitInvFit — every rendered bag grid (.kinv .kinvg) got its OWN ResizeObserver that ALSO observed the
long-lived #panel. #panel kept the observer alive, the observer's callback closure kept the OLD grid (items, pictures, listeners): one whole bag
leaked per render of any bag (Tư trang, item pickers …). After ~1 h of play ~300 000 Blink nodes / ~19 000 listeners were held off-page (only
~2 000 attached) and the renderer then wedged inside ONE native call on the next heavy step (main thread 100 % in native code, RSS +2 MB/s,
Debugger agent never enables = no JS frame reachable). The tap before the wedge is only the straw (Bổng lộc «Bớt lễ nghĩa», «Chương 1 khép lại»
Lui, kmrew Nhận → Sẵn sàng …).
FIX = ONE rule (law 11): an observer made for ONE rendered element observes only that element's own subtree (and disconnects when the element is
gone); a size outside it (#panel) is watched by the ONE shared observer made once (jinv kinvPanelWatch / KINV_RO). Family scan below.
SECOND HOLDER (robot harness only, not the game): robot-rt.js page.evaluateHandle(...) ×7 with 0 dispose() → the inspector («(Global handles) /
DevTools console») kept every tapped element + its replaced subtree (u5 heap: 15 174 of 15 759 detached nodes). Told U1d (patch editor):
patch #25 disposes every handle. Real devices have no inspector → not a game bug, but it made robot rooms reach the wedge sooner.

## EVIDENCE
| what | base LIVE 5e013076 | fix ee0824f4 |
|---|---|---|
| seed 56 real 2-seat room (Fold host / iPad guest, realtap 5edf+#16) | Fold host wedged at buổi 61, 3/3 (rr1 00:27Z, rr8 03:21Z, rr11 04:45Z) | buổi 61 passed → buổi 88, 0 SEATHANG, both-seat reload at 5067 s, 152 #kmrew taps |
| retained Blink nodes after forced GC (seed 56 host) | 37k @b7 · 165k @b38 · 317k @b61 | 25k @b13 · 92k @b28 · 19.9k @b88 (GC reclaims) |
| dev/test/observer-leak.js (40 bag renders) | FAIL 366 nodes/render (MUTATE) | PASS 19 / 34 / 31 (Fold ×3), -32 (iPad); refit on #panel resize still runs |
| heap snapshot seed 56 b13 | 5 895 of 15 578 detached nodes under jinv RO closure `g` (next holder < 500) | 62 detached nodes in the test page (image caches) |
Signature reproduced in isolation: a single long native call (JSON.stringify of a shared-reference DAG) gives exactly «Debugger.pause timed out,
main thread spins in native, RSS climbs» — so «no JS frame» does not exclude a JS-triggered native wedge.
Other captures, same family: G93J, Q4XY, KJ2Z, UVVH, YRTC, seg15 (buổi 61, Fold host), 9FVJ / DUMQ / DXT7 / RZZJ (U1d, buổi 73 Fold guest after
«Chương 1 khép lại»). U1d's RZZJ ran u4 + this jinv diff and still wedged with 85k nodes: its heap (my u5 rr15 snapshot) = harness handles above.
U3b-2 76JU (reload every ~12 buổi) passed the same steps → accumulated state, not the step.

## FAMILY SCAN (every new ResizeObserver / MutationObserver in dev/build, LIVE)
| observer | observes | per element? | outside its own subtree? | before | after |
|---|---|---|---|---|---|
| jinv:29 g.__kro | grid g, wear column, #panel | yes | YES (#panel) | LEAK | own subtree only + disconnect; #panel → shared KINV_RO |
| jopic:325 g.__kotRO | g + its own option cards | yes | no | ok | unchanged |
| jk2b:1172 pcp.__kpfo | pcp itself | yes | no | ok | unchanged |
| jksize:760 MO per scroller e | e (childList) | yes | no | ok | unchanged |
| jpromo:90 MO | body, disconnects when its scene is gone | yes | body, self-disconnect | ok | unchanged |
| jbook:358 ro | host, destroy() disconnects | yes | host, has destroy | ok | unchanged |
| j19, j59, jk2b:76/119/1017, jk3:244/728, jk4:597, jseal:105, jbd KBD_RO, jht HTRO, j79 kitOdRO, jk4 KIT_OPT_RO / kitPcMoreRO | stage / panel / mb or many targets | no (made once) | – | ok | unchanged |

## GATES (fix ee0824f4)
observer-leak ×3 Fold + iPad PASS · coop-keymove-unit 12/12 · coop-e2e SWAP=0 143/143 · SWAP=1 143/143 · coop-night: only the cases already failing on
bare LIVE 5e013076 (4, 4b, 5, 6, 8; FOREMAN_B_STATUS 23:18Z) — no new case · sangbuoi-held ALL PASS alone (1st run under 3 rooms: G1 698 ms > 600, load only) ·
quickcheck alone: main PASS (260 s, open 2.2 s, old save ok, perf new/live render 238/286 tab 571/646 buổi 3481/4395) · CORE GATES G4 90-button-crawl «Ô lưu · Lui» + FIX-6 FAIL 2 = the SAME on bare 5e013076 (pre-existing, known) · real 2-seat Fold host + iPad guest 88 buổi incl. reward cards + both-seat reload, no freeze ·
shots Tư trang Fold 755x1000 + iPad 1180x820 @2 (outside git) looked 3×: bag fills as before (54 / 21 cells, identical to base), no overflow.
## STATUS: ~95 % done (root named + fixed + proven on the deterministic seed) / game playable: long sessions no longer leak a bag per render.
