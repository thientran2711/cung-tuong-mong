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
