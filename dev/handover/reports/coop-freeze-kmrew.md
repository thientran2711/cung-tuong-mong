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

## REVIEW — BIG rv (session_01N1tNP5wTmDBC3yfeLwVTAj, opus, fresh, depth 3, START_CTX ~3 %) · 26/11 ~09:20Z · **FAIL (freeze root not proven); the jinv leak fix itself is good**
PRIORITY #1 CHECK ('coop-freeze-kmrew'): OD 0 | ledger 0 | claims 7 | main 0 | review/* 1 (this branch) | archive 0 (brief prio1 line); reused fixer test observer-leak.js, play-leak/playperf libs, robot harness 5edf09f6 + shared realtap-B-5edf-patch.diff (#16 + #25), coop-title-leave.js from review/coop-f1-rejoin.
Merge onto LIVE 02f564ae: merge-tree clean except built files (index.html/sw.js/assets.json) → rebuilt → **review/coop-freeze-kmrew-rv f1b9f7060227d5bb7eef29298e5cca58f0a9a362** (pushed for reuse, NOT land-ready).

### BLOCKING
1. **The Fold freeze is NOT fixed by ee0824f4.** Seed 56 two-seat real-tap room QEC5 on the FIX build ee0824f4 itself (harness 5edf09f6 + shared patch incl. #25 handle dispose, local wrangler, no reload, host Fold / guest iPad): Fold HOST WEDGED at buổi 61 — last taps 08:21:09Z «Bổng lộc tháng bảy · Lễ nghĩa» › Chu toàn lễ nghĩa, 08:21:10Z «Thỉnh bình an mạch» › Lui; then evaluate > 15 s, Debugger.pause timed out (no JS frame), SEATHANG 2855 s, renderer RSS 3.2 → 4.75 GB. Same signature + same buổi + same step as the base wedges (rr1/rr8/rr11). But DOM nodes were only 3.7k–9.4k the whole run (7.9k one minute before the wedge) — not 300k. So the retained-bag leak is real but is NOT what wedges the page at buổi 61. The fixer's single passing fix run (buổi 88) is not reproducible.
   Lead (from the hang-grabber trace, hangcap-host-trace.txt): last JS samples before 398 native-only samples = **kitOptFinal (jopic.js:250) → kitOptSig (jopic.js:283) → cloneNode**. Suspect: the option-card final pass (dupOf clone / kdup, g.__kotRO) growing a card's subtree or a layout loop in native. Dumps: review/robot10-coop-saves d2dff0ad rvk56/ (hangcap host/guest, trace json, taplogs, ckpts, README).

### What PASSES (the jinv change is safe and worth keeping, as a leak fix)
| check | base | fix / merge on LIVE |
|---|---|---|
| observer-leak.js Fold 755x1000 N=40 | FAIL 359 nodes/render | PASS 19 (N=120: 6, flat: +768 vs +751) |
| observer-leak.js iPad 1180x820 N=40 | FAIL 302 | PASS 2 (N=120: 9, N=240: 4) |
| MUTATE on merge (panel observe back + isConnected disconnect removed) | — | FAIL 387 (panel observe back but disconnect kept: 34 = the disconnect alone also guards) |
| SOLO 60 buổi Fold, Tư trang opened 3×/buổi, retained nodes after 2× GC (evaluate only, no handles) | 5.3k → 12.3k b10 → 19.7k b20 → 29.7k b40 → 38.1k b50; listeners 1.8k → 4.4k | 5.1k → 6.0k → 6.8k → 5.2k → 5.5k → 9.2k b59; listeners 1.8k → 1.2k |
| bag fit open / rotate / back, Fold 755x1000 + iPad 1180x820 @2 (shots outside git, looked 3×) | cells/cols/rows identical | identical to base; no overflow, 0 errors |
| coop-e2e SWAP=0 / SWAP=1 (live Worker, merge) | — | 143/143 · 143/143 |
| coop-keymove-unit (merge) | — | 12/12 |
| quickcheck core gates (merge) vs bare LIVE 02f564ae | G4 dialog-fixed 2 FAIL (kit-dialog-2 empty Tốn/Được) + button-crawl «Ô lưu · Lui» | the SAME 2 + 1 → pre-existing. quickcheck open/old-save/perf part not finished (900 s timeout, box loaded) |
| coop-title-leave (tests fix-7, which is NOT on LIVE nor base) | LIVE 35 FAIL / 40 FAIL (2 runs) | merge 47 / 39 FAIL, LIVE+jinv-only 54 FAIL — all fail, guest iPad ☰ «menu buttons 0» seen on LIVE run 2 too → flaky on LIVE, not attributable; not a gate for this branch |
| proof independent of harness leaks (law 5) | my numbers above use page.evaluate only (no handles); room ran with #25 dispose | ✓ |
Not run: sangbuoi-held (verdict already FAIL on item 1).

### Family scan (law 11) — every Resize/Mutation/IntersectionObserver in dev/build/j*.js on LIVE (≈90)
Rule checked: a per-element observer must observe only its own element/subtree; a long-lived target only from an observer made once. Blink keeps an observer alive from its TARGET (target → observer strong), so a per-element observer on a long-lived node keeps the element via its closure.
| observer | made | observes | verdict |
|---|---|---|---|
| jinv:29 g.__kro | per grid | g + #panel (LIVE) | **LEAK → fixed** (g + own .kinvside; #panel via ONE KINV_RO, made once, never grows: one target, closure holds only P + h0) |
| jopic:341 g.__kotRO | per grid | g + its own cards | keep |
| jk2b:1172 pcp.__kpfo | per card | pcp (closure pc = ancestor, dies together) | keep |
| jplst:40 nm.__ro | per nm | nm | keep |
| jksize:772 MO + scroll | once per scroller e (guard) | e | keep |
| jsfx:257 MO | per reward | its .kmrew root, disconnects on take | keep |
| j38:119 MO/RO ×3 | once per map scroller (dataset.sv guard) | w / sc | keep (bounded, one per scroller) |
| jbook:278 kmo | per curl | el, fin() disconnects | keep |
| jbook:358 ro | kitBookSpread — no caller in the game | host | keep (dead code) |
| jpromo:90 MO + resize | per scene | body; self-disconnects when its scene is gone | keep |
| jseal:105, jk2b:1017, jk4:180/597/863/902/913/950/952/969, jk3 ×9, j19, j56, j58, j59, j61, j63, j74 ×3, j79 ×5, j82, j84, jaudit ×2, jbd ×2, jcooplobby, jdayq ×2, jdh, jemoseal ×2, jfighd, jfigseal, jfocus, jht, jk2b ×7, jkc, jkpc ×2, jkpor, jmark, jpane, jpcf, jph ×3, jreveal, jsl, jtoil ×3, jtut | made once (module IIFE / guarded) on stage, panel, modal, body, mb, hd, popw, k3tt | – | keep (one each, cannot grow) |
| shared multi-target ROs (KBD_RO, KIT_OPT_RO, kitOdRO, kitPcMoreRO, HTRO, KES_IO, jph io) | once | many elements, targets held weakly | keep |
Long-lived listeners: solo listener count flat on the fix (1.8k → 1.2k over 60 buổi) → no growing listener family left.

### Laws touched
4/9/10 n/a (no number, no UI part changed; bag looks identical); 11 family scan done above ✓; 12 both devices ✓; 6c n/a. Law-level issue: the brief/report claim «root = jinv» is not proven (item 1).

### To the fixer (FAIL list)
1. Keep ee0824f4's jinv change (good leak fix; may land alone as a LEAK fix if MAIN wants — gates above green apart from pre-existing G4).
2. Re-open the buổi-61 wedge: start from rvk56 dumps (review/robot10-coop-saves d2dff0ad) — kitOptFinal → kitOptSig → cloneNode last JS before native; check jopic kitOptFinal/dupOf/kdup and g.__kotRO for a per-pass subtree growth or a resize→fit→resize loop on «Bổng lộc tháng bảy · Lễ nghĩa» / «Thỉnh bình an mạch» cards on Fold 755x1000 (seed 56, buổi 61). Prove with base FAIL / fix PASS on the SAME seed-56 room ×2.
3. LIVE observation (not this branch): seed 56 on the merge-on-LIVE build diverged — guest iPad «Ban hoa» at buổi 1 (selection), room then stuck 15 min (host waits at buổi 1, guest k2 in Dưỡng Tú viện). Room HCNN. Unattributed; flag to Foreman B.
STATUS: review ~100 % done / game: leak fixed, Fold freeze still open.
