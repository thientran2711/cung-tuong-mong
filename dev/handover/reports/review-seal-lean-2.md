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

# r2 review @ a64f06c7 + final-merge = 5400c87b — PASS (SMALL rv sonnet)
PRIORITY #1 CHECK: OD 19/11 ~02:15Z, ~05:05Z, ~06:25Z | main jemoseal.js KIT §38.4 | review/seal-lean-2 | claims seal-lean-2.
Merged origin/main f3114755 (only generated index.html/sw.js conflicted → rebuilt with build_site.sh), pushed to review/seal-lean-2.
Owner 06:25Z check
1. Scope: kesCan = stage seals (img.kfseal) or inside opened panel (#modal,.krbox,.kmov,.dlg), deny header.hud. fig-seal stillAvatars: avatarOrOtherLive 0, topBarLive 0. Video: top-bar avatar never moves; leans come from the head seals beside stage figures. OK.
2. Painted loop: img/kit/emo-anim/{gian,khoc}.webp + emo-fx/{gian,khoc}.webp are on the CDN (200). Frames LOOKED (fold-close3-gian/buon): gian = steam puffs + anger mark animate; khoc = tear falls, mouth/eyes change across frames; not just a shaking frame. No-frame feelings keep CSS motion (kemoL-*). OK.
3. Timing (fig-seal Fold, MOTION=1, 0 errors): grow 1.2–1.37 s, hold 6.4–6.6 s, shrink 1.5–1.66 s, overlaps 0, min gap 1.59 s, inside screen, z 9990, idle ±0.6°, min big = 20 % of short side. Gates (reduced-motion/Cảnh động/Gọn via kesMotionOK) unchanged.
4. KIT FIRST: only jemoseal kit part + KIT.md §38.4 (+tests); numbers in KIT_EMOSEAL. OK.
Videos LOOKED: fold-full3 (754x1000) and ipad-full3 (1180x820) fill the whole frame (not a quarter); stage seals lean with the painted loop; fold/ipad close3 gian/buon/vui good.
Quickcheck on merged tree (--cpu 4): PASS 186 s · open 1556 ms · old save ok · render 180/219 · tab 420/429 · buổi 991/1268 · tasks>200ms 17/18 · core gates PASS.
Nits (non-blocking): hardcoded fx/keyframe amplitudes in CSS; the first two leans in the test run lacked kemo-played (probe race, 3rd played) — loop still arrives on later leans.
Next: delete CDN img/_review/seal-lean-2/ after owner sees videos.
