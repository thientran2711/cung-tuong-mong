PRIORITY #1 CHECK: OD 19/11 ~02:15Z + ~05:05Z (seal lean-in) | main jemoseal.js KIT §38.4 | review/seal-lean-2 db1762f1 | claims seal-lean-2.

# Review seal-lean-2 @ db1762f1 — PASS (SMALL rv session_01Rc5AsMN2AumPZrBeDRpV5o; committed by MAIN ROOT-64 because the rv session could not push)
Merged onto origin/main 7fb7c104: conflicts only in generated index.html/sw.js; rebuilt with build_site.sh -> local merge f673a966 (NOT pushed: reviewer session read-only). Worker HrbnHixr redoes merge on newest LIVE + nit fixes.

Checks
- Code: only dev/build/jemoseal.js (kit part) + KIT.md §38.4 canon overwritten in place + tests/tools; no per-place variant; timings/scales/z/margins in KIT_EMOSEAL (grow 1.6, hold >=5 s or >=2 loops, shrink 1.6, scale 2.2-2.4, min 20 % / max 50 % of short side, z 9990).
- Whole group: every img.kemo goes through kitEmoSeal (pcPort, cards, lists, mood box, figure-head seals); one stagger (kesCur + gap); gates kept (on-screen, Cảnh động, reduced-motion, Gọn).
- Clamp: clone clamped inside the viewport with margin; pointer-events none; above UI by owner's word (covers the header while leaning).
- Perf (quickcheck on merged tree, --cpu 4): PASS, open 1709 ms, old save ok, render 188/173, tab 403/403, buổi 960/1145, tasks>200ms 18/17.
- Video LOOKED (fold-full, ipad-full, fold-close-gian): small seal still -> grows ~1.5 s to a large readable face -> holds ~6 s -> shrinks back; never cut at an edge; matches OD.
- Own resize test (755x1000, resize 40 px and back): leans keep coming (4 in 45 s), 0 page errors.
Nits (not blocking): (1) resize handler ends a lean without rescheduling that one seal; (2) small hardcodes in kesLean (min scale 1.2, margin .09/+4) and keyframe amplitudes in CSS not KIT_EMOSEAL; (3) full-screen takes mostly show the top-left player seal.
MAIN note: main LOOKED fold-full.mp4 — game rendered only in the top-left quarter of the frame (grey rest) → videos re-recorded before sending to the owner.
