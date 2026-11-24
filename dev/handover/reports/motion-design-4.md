# MOTION-DESIGN-4 report — mẫu 1/2/4 re-shot on kitPick/kitDim
Worker MOTION-DESIGN-4 (successor of MOTION-DESIGN-3; coordinator MAIN 126). START_CTX ≈ 3 %, finished ≈ 40 %.
Branch review/motion-design-4 1bebf717 = review/motion-design-3 66041f3b + review/kit-woodskin 09c4386c + review/kit-evframe-r1 (conflicts only KIT_REQUESTS.md [kept both] and generated index.html/sw.js [rebuilt]).

PRIORITY #1 CHECK: OD 24/11 ~14:50Z / ~15:15Z / ~15:30Z / ~15:40Z (read verbatim) | main: none new | review/*: motion-design-3 (base), kit-woodskin (kitPick/kitDim, KIT §98), kit-evframe-r1 (§93.4) | claims: MOTION-DESIGN-3 → MOTION-DESIGN-4.

## Page (Fold 755x1000 + iPad 1180x820, 1x + 2× slow mp4, stills, checklist, kperf probe)
https://ctm-img.victoria-tntt.workers.dev/img/_review/motion4/index.html
Probe (real device, hidden ?kperf=1): https://ctm-img.victoria-tntt.workers.dev/img/_review/motion4/probe/kperf.html?khost=1&kperf=1 (steps as in motion-design-3.md). Wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review motion4`.

## Done
1. Merged + rebuilt (build_site.sh OK, kitPick/kitDim present).
2. dev/mock/motion3/m2.js: private picker()/btn()/pickBtn()/closePk + private dim copies (.md3-dimc) DELETED → `kitPick.open({host,anchor,avoid,acts})` and `kitDim.on(figs,{keep})`. Law 9 clean; nothing missing from the kit for the mock.
3. Placement (MAIN ruling): plaques hang BESIDE the chosen person, low, near her feet (kitPick default). Chosen steps out (×1.07, forward + halo); the others kitDim (opaque) AND draw apart (dim copy travels with its figure, slide clamped so name tags stay on stage) → plaques sit on clear floor.
4. Fixture: stage cast marked as met (S.met + known=2) so kit name tags show real names — no «???» (kit stranger rule untouched).
5. Checks (every figure's painted face band vs every plaque/post/rail/tag; each person chosen in turn): Fold 3 choices 0 hits, iPad 3 choices 0 hits; no «???»; no plaque outside the stage (acts limited to 4 Fold / 5 iPad in the mock). Looked at: Fold + iPad full-size stills (picker, lift) + contact sheets of all 6 videos (1x) and the m2 2× slow Fold video. iPad = one wide scene.
6. Re-shot all mocks, KSEED=1, zero page errors.

## Findings for KK21 (KIT REQUEST candidates; not changed by me)
- kitPick on an EDGE person on Fold (leftmost chosen): the only free side is ≈ 250 px → plaques narrow to ~110 px and names truncate «Trò chu…» (seen in my test p0). Needs: when the free side is too narrow, stack 2 shorter rows/compact tier or allow the band to lap the (dimmed) neighbour instead of truncating a name (names never cut, OD:L177). The recorded flow picks the middle person, where it is clean.
- kitPick band overlaps the dimmed neighbour's body when there is no gap (acceptable: face band 0 hits), hence the slide-apart in the mock — consider making it a kitDim/kitPick option (`apart`) so the build does the same.
- Carried from MD3: kitScene §93 veil+blur, live kitFlyItem cream veil, mẫu 1 plate over the 2nd row for n=10, plain-talk name-only cards recommendation. Real-device probe numbers still needed to decide fade-in tweaks.

## Status
~100 % design of the 3 picks / ~0 % playable (mocks, nothing wired). Smoothness: container numbers as in motion-design-3.md; absolute proof = the kperf probe on the Fold/iPad.
Handover: none needed (job finished at ≈ 40 % ctx). Worktrees /home/user/wt/md4 (branch pushed) can be removed.

## UPDATE 24/11 ~19:50Z — state after MAIN 126/127 checks (branch review/motion-design-4 e99d0477 = + kit-woodskin 66bf8bb5, KIT_PLAQUE)
Fixed + verified since the first report: m1 one opaque detail box at a time; m4 people solid (met cast + prep/settle before result; 0/60 see-through samples at 0.1 s); «???» gone (MD3.meetAll fixture; FLIGHT-UI kitNoUnk will replace it in the build); KK21 slim-plaque fallback merged. Edge-plaque/name-tag lap sent to KK22.
**OPEN (MAIN 127 FAIL list) — MD4 rolled over here (context ceiling); coordinator opens MOTION-DESIGN-5:**
1. BOX OVER HEAD, m1 iPad from ~3.5 s: speech box covers the head of the back-view woman in the middle. NOTE: that woman is PAINTED INTO THE BACKGROUND (img/ev-cung-nhan.webp, laundry yard), not a kit figure, so faceBoxes() never sees her. Options: use another event background without painted people, or place the speech box (Sc.pair / L.boxes[0] `sb`) beside the speaker and keep the detail box in free floor; extend MD3.faceBoxes with the painted head of the background (or pick a bg without people) so the check covers it. Dưỡng nhan detail box also over her body.
2. SEE-THROUGH ENTRANCE (m1 enter() and m2 enter()): figures fade opacity 0→1 (T(f[0],[{opacity:0..}]), T(f[1]..), m2 figs) on top of the layer fade (L opacity 0→1) → half-transparent bodies. Fix: figures enter by transform only (slide/step) at opacity 1; hide the stage behind ONE opaque kit screen veil (or fade the layer in only after figures sit in place off-screen), never an opacity animation on a figure. Check m2/m4 enter the same way.
3. m1 iPad first frame→second: old screen (Trường Xuân cung + action list) double-exposes while the new scene's layer fades in (300 ms L opacity). Use the kit screen veil: opaque cover → swap → reveal, no cross-fade of two screens (applies to m1, m2).
Then: re-shoot all 6 (record.js, KSEED=1, GAME_ROOT=the md4 worktree build), SHEET-CHECK EVERY FRAME at fps=12 (ffmpeg -vf fps=12,scale=...,tile) for see-through bodies + box-over-head + «???», rebuild probe (mkprobe.py) + mkindex.py + cdn_sync.py img/_review/motion4, push, report sha + page to MAIN 127 (session_01V1ZZH4Dz8sCyYc7mCxjmAH).
Tools already written (outside git): audit scripts in /home/user/wt/md4-shots (s2 face/«???»/overflow per chosen person, s6 see-through at 0.1 s for m4, s8 «???» scan) — recreate from the descriptions if the container is gone; worktree /home/user/wt/md4 (pushed).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
