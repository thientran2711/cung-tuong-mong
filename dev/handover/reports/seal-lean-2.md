PRIORITY #1 CHECK: OD 19/11 ~02:15Z + ~05:05Z real | main dev/build/jemoseal.js KIT_EMOSEAL.lean, KIT.md §38.4 | review/seal-lean (live 1cf5e8bb, small 1.12–1.18× lean) → reworked, no second lean implementation | claims seal-lean done.

# seal-lean-2 — owner ~05:05Z (mood seal: small still, MUCH bigger slow lean-in, hold ≥5 s, slow shrink)
Branch `review/seal-lean-2` @ **db1762f1** (on LIVE main fd6118cd). Files: dev/build/jemoseal.js (+ rebuilt index.html/sw.js), dev/kit/KIT.md §38.4 (canon overwritten in place), dev/test/fig-seal.js (MOTION block rewritten), dev/test/seal-lean-video.js + seal-lean-cut.py (video proof tools).

## What changed (jemoseal only; numbers in KIT_EMOSEAL, no per-place motion)
- Small = still: idle `rotate` ±0.6° (was ±1.2°), period 8–11 s — barely visible.
- Lean-in: the seal is lifted onto a fixed overlay clone `img.kemo-big` (z 9990 = above all UI, not clipped by frames, clamped inside the screen with a margin for its own motion). Size = 2.2–2.4× the small seal but never < 20 % of the short screen side (face readable) nor > 50 %. Fold 155 px, iPad 168 px (small seals were 11–50 px).
- Timeline (measured, fig-seal MOTION, Fold + iPad): grow 1.4 s → HOLD 6.2–6.4 s (2–3 full slow loops of the feeling) → shrink 1.55 s; one lean ≈ 9.3 s.
- Feeling loops slowed (one loop = keys[k].d): giận 2.0 shake+heat glow (stronger, readable) · buồn/khóc 3.6 slow droop · vui 2.8 gentle bounce-sway+glow · sợ 2.4 · lo 2.8 · ghen/hờn 3.0 · mưu 3.0 · đau 2.8 · bình/an 3.0. Hold = max(5 s, 2 loops) via n = max(2, ceil(5/d)).
- Stagger: one lean at a time on the screen, next only after the previous ended + 1.2 s gap (measured min gap 1.29 s / 1.38 s, overlaps 0). Gates kept: on-screen only (ends at once if the small seal leaves/moves/re-renders/resizes), Cảnh động, reduced-motion, Gọn (kesLive/kesMotionOK untouched). emo-anim / emo-fx plumbing kept (now on the big clone).

## Timings table (MOTION=1 SECS=40, dev/test/fig-seal.js, 0 page errors)
| device | leans | grow s | hold s | shrink s | total s | big px | inside screen | overlaps | idle rotate |
|---|---|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 3 | 1.34–1.43 | 6.25–6.40 | 1.53–1.55 | 9.28–9.29 | 154–155 | yes | 0 | ±0.6° |
| iPad 1180x820@2 | 3 | 1.37–1.47 | 2.6*–6.38 | 1.53–1.62 | 9.28–9.29 | 167–168 | yes | 0 | ±0.6° |
(* the 4th iPad lean was still running when the test ended.) Other figure-seal checks (room/event/place/pop): all seals inside, no face hit.

## Videos (CDN img/_review/seal-lean-2/, H.264 mp4, recorded at 2× resolution)
Base `https://ctm-img.victoria-tntt.workers.dev/img/_review/seal-lean-2/`
- fold-full.mp4 / ipad-full.mp4: natural full-screen take, 34 s each, ≥3 different seals leaning one after another (the player's own top-bar seal, then the two figures' head seals).
- fold-close-{gian,buon,vui}.mp4 / ipad-close-{gian,buon,vui}.mp4: close-ups 720×720 (crop on the big seal), one full cycle each (grow → hold → shrink), 10–12 s.
Frame check (me, from frames every 1–3 s): small seal is still/tiny → grows over ~1.5 s to a face clearly readable (giận red glow shaking, buồn eyes down drooping, vui smiling bounce) → holds → shrinks back; never cut at an edge (top-left seal sits inside the screen); sits above the header. Note: the forced close-up takes re-key one real seal to each feeling (same code path) because the screen only shows a few feelings at once.

## Gates
quickcheck (HEAD db1762f1): PASS · open 1385 ms · old save ok · perf new/live render 176/218, tab 413/426, buổi 987/930, tasks>200ms 18/17 · core gates PASS. fig-seal: pass (table above). Build rebuilt with build_site.sh.

## Notes for main
- Big seal covers the top header while leaning (it is above all UI by the owner's word); pointer-events none.
- emo-anim/emo-fx art still absent on CDN (Foreman C), so the loop is the still + CSS motion.
- No rollover needed (context low).
