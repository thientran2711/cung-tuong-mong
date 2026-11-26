# coop-freeze-kmrew — B FIXER report (session_01N1tNP2Ppg85FwQYT2eP9Re, depth 1, START_CTX ~3 %)
PRIORITY #1 CHECK: brief b-coop-freeze-kmrew.md ('kmrew|page-freeze|SEATHANG': OD 0 | ledger 0 | claims 8 | main 15 | review/* 0) → reused reports/coop-page-freeze.md (4fU4zVDR), hang-grabber #16, coop-e2e helpers, dev/test/lib; `git grep` kitScrollCues / kscue / ResizeObserver on origin/main + review/coop-week-wait-land: jksize + jinv identical on both, no other branch touches them.

## VERDICT (26/11 ~10:15Z) — SSK review/coop-freeze-kmrew c20aaa6e6f5bf410c21d81daf8611b218d2b5c48 (base 5e013076; jksize/jinv unchanged on LIVE 02f564ae and on u4 7959f1b5)
ROOT (the freeze): dev/build/jksize.js:757-761 kitScrollCues + its per-scroller MutationObserver. A scroller's own «Kéo xuống» cue was found
with ":scope > .kscue", which ALSO matches the SIBLING strip (.kscue.sib) a SHORT child scroller puts right after itself. An outer short
scroller (its observer left from an earlier tall pass) removed the child's strip as «its own cue» → the child re-created it → the outer
observer re-ran the pass → … an endless MICROTASK loop: the page never yields again (page.evaluate hangs, the Debugger cannot attach), every
lap builds a new strip and re-scans the whole dialog (CPU 100 %, renderer RSS runs away, reload does not free it). Needs nested scrollers both
< 260 px = the Fold viewport on a few dialogs (Bổng lộc · Lễ nghĩa, chapter / ceremony / bình an mạch cards …) → only Fold seats, either role.
NAMED BY: V8 CPU-profiler trace read out during the wedge (Tracing ring buffer, samples taken off-thread), 2 of 2 rooms: rr18 bare LIVE
5e013076 seed 56 Fold host buổi 61 (108k samples) and rr17 u4 + jinv fix seed 66 Fold host buổi 61 (61k samples): ~95 % of samples in
MutationObserver(childList) → kitScrollCues → its candidate filter / scrollHeight.
FIX = ONE rule (law 11): a scroller only ever touches ITS OWN cue (":scope > .kscue:not(.sib)" in all 4 places) and an observer callback
never re-runs the pass inside the same task (kscSoon: ONE coalesced pass per frame).
SECOND (real) leak, also fixed (ee0824f4, same branch): dev/build/jinv.js:29 kitInvFit — every rendered bag grid's own ResizeObserver also
observed the long-lived #panel → one leaked bag per render (366 nodes; ~300k after 1 h on LIVE). Made the page heavier, not the wedge root.
HARNESS-ONLY holder: robot-rt.js evaluateHandle ×7 never disposed → the inspector kept every tapped element + subtree (u5 heap: 15 174 of 15 759
detached nodes) — told U1d → patch #25 (dispose). Not a game bug.

## EVIDENCE (c20aaa6e)
| check | base | fix |
|---|---|---|
| dev/test/scroll-cue-loop.js (real kitScrollCues, nested short scrollers in #modal) | FAIL: page hangs, renderer OOM-killed | PASS ×3 Fold 755x1000, PASS iPad 1180x820 |
| seed 56 real 2-seat room, Fold host / iPad guest | wedged at buổi 61, 4/4 (rr1, rr8, rr11, rr18) + rv QEC5 on ee0824f4 | rr20 (LIVE + fix) passed 61 → 73+, 0 SEATHANG; rr22 = SHARED harness 5edf + #27 (rv recipe incl. #25) passed 61 → 134, 0 SEATHANG, DOM 3–4k |
| seed 66 Fold host on u4 (+ jinv) | rr17 wedged at 61 | rr19 u4 + fix passed 61 → 65+, 0 SEATHANG |
| U3b-2 FJDK seed 18 Fold host on u4 + fix, unmitigated | seg15 wedged at 61 | passed 61, 73 → year 2 buổi 132, 0 SEATHANG, DOM 4–9k (saves 3de37fe3 u3br/seg18-FJDK-u5b-verify) |
| dev/test/observer-leak.js (jinv) | FAIL 366 nodes/render | PASS 19–34 |
| retained Blink nodes after GC, seed 56 host | 317k @ buổi 61 | 4–9k flat |
Gates on c20aaa6e: coop-keymove-unit 12/12 · coop-e2e SWAP=0 143/143 · SWAP=1 143/143 · sangbuoi-held ALL PASS (alone; under 2–3 rooms it timed out) ·
coop-night only the case-8 family already failing on bare LIVE · quickcheck (run on ee0824f4, jksize only adds the cue rule): main PASS,
core G4 «Ô lưu · Lui» + FIX-6 identical on base (pre-existing) · shots Tư trang Fold + iPad @2 looked 3× (identical to base) · scroll cue still
shows on long dialogs (scroll-cue-loop setup asserts the strip / cue exist).
## FIXER ANSWER TO THE REVIEW BELOW
BLOCKING 1 (ee0824f4 does not fix the freeze): AGREED — fixed by c20aaa6e (root above). The rv trace lead (kitOptFinal → kitOptSig): its
hangcap-host-trace.txt has 398 of 400 samples with an EMPTY frame and a node table of only 21 nodes (the last-4000-chunks cut dropped the
profile nodes) — the 2 kitOpt samples are noise. jopic checked for its own observer→mutate loop: kitOptFinal is signature-guarded, its only
observer (g.__kotRO) defers by setTimeout → none. Proven on the rv's own recipe: rr22 (shared harness #27, seed 56) on c20aaa6e passed 61.
## STATUS: ~98 % done (root named by trace, fixed as one rule, base FAIL / fix PASS in a seconds-long test and in 5 real rooms) / game playable: Fold long sessions no longer freeze.

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
