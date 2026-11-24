# MOTION-DESIGN-3 report — mẫu 1 «Bàn bài», mẫu 2 «Vòng bảo vật», mẫu 4 «bay về túi» (the 4 open deltas of MOTION-DESIGN-2)
Worker: MOTION-DESIGN-3 (session_01V1ZZH4AGe6TobJ6LfAciTy, depth 1 under MAIN 125; coordinator now MAIN 126). START_CTX ≈ 3 %; rolled at ≈ 47 % (past START+25 %; remaining = one kit-part swap, see HANDOVER). Design mocks in the REAL game; nothing wired. Branch review/motion-design-3 (from review/motion-design-2 e74ca8bb). Runtime = review/kit-evframe-r1 298ba4e4 build.

PRIORITY #1 CHECK: OD 24/11 ~04:35Z / ~08:55Z / ~09:05Z / ~09:15Z / ~14:50Z / ~15:15Z / ~15:30Z / ~15:40Z (verbatim, read in full) | main: KIT §57.1 kitStatFx + kitStatSet (jk4), §93 kitScene/kitDlgBox/kitNameTagBox, kitOptPic, kitItem, kitChip, giftVal (j8), dfData (jdfv), BAL.kitpage.demo | review/*: motion-design-2 e74ca8bb (base), kit-evframe-r1 298ba4e4 (runtime), ring-design-2 (picker «hang» code reused 1:1), ring-design-3/4 (picker owner), **kit-woodskin 09c4386c (KK21: kitPick + kitDim, KIT §98) — arrived mid-job, see HANDOVER** | claims: MOTION-DESIGN-2 → MOTION-DESIGN-3.

## Where to look
- Review page (Fold + iPad side by side, 1x + 2× slow mp4, stills, per-ruling checklist, perf table, probe link): https://ctm-img.victoria-tntt.workers.dev/img/_review/motion3/index.html (wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review motion3`).
- **Smoothness probe for the REAL Fold / iPad (hidden `?kperf=1`)**: https://ctm-img.victoria-tntt.workers.dev/img/_review/motion3/probe/kperf.html?khost=1&kperf=1
  1. Open it on the Fold (portrait) or iPad (landscape), tap «Bắt đầu đo».
  2. Leave the device still ≈ 3 minutes (the page reloads itself between scenarios; do not touch the screen).
  3. Tap «Chép kết quả» and paste the JSON to MAIN. Rows idle-home / live-* are the CONTROL (today's game); target p95 ≤ 20 ms.
  (it is the built game + `kperf.js`; the probe runs INSIDE the game frame because the host page rewrites itself. Code: dev/mock/motion3/kperf.js, scen.js, mkprobe.py.)
- Code: dev/mock/motion3/ — boot.js (device profile + HOST mode; `KSEED=<n>` = same random life every run), lib.js (helpers; `acts()` = the game's REAL act cards, `decodeAll()` pre-decode), m1.js / m2.js / m4.js, scen.js (scripted runs, also used by the probe), record.js (CDP screencast → mp4 1x + 2x slow + stills), perf.js (CPU-throttle runs), stills.js, mkindex.py, kperf.js + mkprobe.py.
  Run: `KSEED=1 GAME_ROOT=<built evframe-r1 checkout> node dev/mock/motion3/record.js <out> m1|m2|m4 all`.

## The 4 deltas
### 1) Mẫu 2 — person picker = RING-DESIGN's «thẻ gỗ treo» (not a kit-button column)
- ONE wide scene on BOTH devices: kit scene layer §93.1 (no panel; iPad = the whole 1180x820 spread, never the left half). People stand full body (Fold 3, iPad 4), kit name tags under the feet, strangers grey (kit rule), background at normal brightness.
- Tap a person → she steps out (×1.07, 10 px forward) + a warm halo grows behind her; the others recede = a PRE-FILTERED COPY of each figure cross-fades in (brightness .72 saturate .6; NO animated CSS filter; background untouched).
- Picker = RING-DESIGN-2's picker 'hang' (kit `.kfoc-b`, compact `kar-min`, drop from above + pendulum 9°→−6°→3°→0, tap = lift + its line, tap again = choose; `contain:layout style` per plaque taken from RING-DESIGN-3). Acts = the game's own `dfData` (real names, pictures, odds words). «Biếu» (the real gift act) → plaques fold away → the ITEM RING opens on the floor band (12 kit item tiles, names only on the front tile) → swipe with inertia / ‹ › / tap a side item → «Tặng» → the item arcs to her chest → she pulses → kit chip «Thiện cảm +n» (n = the game's `giftVal`, i.e. BAL).
- **PLACEMENT DECISION FOR MAIN / the owner (needs ONE answer before the kit part is final):** my plaques HANG FROM THE TOP EDGE across the free sky above all heads (Fold 3×2, iPad 1×6). Reason, measured: with 3–4 people side by side, plaques «beside the person» cover a NEIGHBOUR's face on Fold and iPad (seen in my first r1 stills). RING-DESIGN-2/3 and KK21's kitPick put them beside the person, low. Two placements = a per-place variant (law 9/10): the owner picks one. Face check (painted-bbox head band of the person she talks to): 0 hits Fold + iPad; the top row also covers no neighbour face (needs head tops ≥ 132 px Fold / 80 px iPad below the layer top; measured 207 / 145).
- iPad = ONE wide landscape scene: yes (st-m2-*-ipad.jpg, m2-ipadAir-*.mp4).

### 2) MAIN ruling applied (event scene keeps her conversation layout)
Mẫu 1 keeps: speaker LEFT full body, kit line box RIGHT, choice area over the left figure's lower body, her RIGHT half body (OD 04:35Z). The event opens straight into motion (no frame first: bg eases in, speaker walks in, she slides in, line box drops, cards are dealt). No box over a face (face-overlap check 0 hits for n = 5 / 7 / 10 + plain, Fold + iPad). The no-frame rule covers the people/stage scenes (mẫu 2).

### 3) iPad
Mẫu 2 redone on the wide scene (above). Mẫu 1/4 were already wide.

### 4) SMOOTHNESS (animation REQUIRED, made smooth)
Done: mẫu 4 holds the HUD numbers IN DATA (one wrap of the single HUD writer `kitStatSet`; MutationObserver removed; the 3 old effects silenced by ONE style tag); card pictures PRE-DECODED before the deal (`decodeAll` awaits `img.decode()`); ring ≤ 12 tiles (≤ 12 layers); only transform/opacity animate; dim = cross-fade to a pre-filtered copy; `contain:layout style` per plaque; cards: `will-change` only on moving layers.
Container numbers (NO GPU, software raster, DSF 1, 1×, no throttle — honest: this cannot prove p95 ≤ 20 ms on a Fold/iPad; compare to the controls):
| segment | Fold p50 / p95 / max · drop | iPad p50 / p95 / max · drop |
|---|---|---|
| idle-home (control) | 16.7 / 16.8 / 50 · 5/174 | 16.7 / 50 / 217 · 41/138 |
| live-dialog (today) | 16.7 / 33.4 / 317 · 31/70 | 33.3 / 183 / 383 · 70/32 |
| live-result (today) | 16.7 / 49.9 / 183 · 48/134 | 16.7 / 133 / 250 · 86/98 |
| m1-enter+deal | 16.7 / 33.4 / 83 · 18/107 | 16.7 / 66.6 / 267 · 48/80 |
| m1-lift | 16.7 / 33.4 / 50 · 28/90 | 16.7 / 50 / 267 · 37/94 |
| m1-choose | 33.3 / 49.9 / 83 · 25/29 | 16.7 / 50 / 50 · 12/40 |
| m2-enter | 16.7 / 49.9 / 133 · 23/58 | 16.7 / 83 / 267 · 36/55 |
| m2-tap | 16.7 / 33.4 / 117 · 23/105 | 16.7 / 33.4 / 67 · 25/101 |
| m2-lift | 16.7 / 33.3 / 50 · 19/118 | 16.7 / 33.3 / 50 · 17/121 |
| m2-open | 16.7 / 16.8 / 50 · 9/150 | 16.7 / 33.4 / 67 · 21/138 |
| m2-swipe | 16.7 / 33.4 / 50 · 14/109 | 16.7 / 33.4 / 50 · 12/111 |
| m2-give | 16.7 / 33.4 / 50 · 15/119 | 16.7 / 33.4 / 50 · 33/101 |
| m4-fly (ok) | 16.7 / 33.3 / 150 · 46/260 | 16.7 / 33.3 / 233 · 49/273 |
| m4-fly-bai | 16.7 / 16.8 / 33.4 · 2/116 | 16.7 / 50 / 250 · 39/92 |
Reading: medians are 16.7 ms (60 fps) everywhere; p95 sits at 1–2 dropped frames. Every mock row is ≤ today's live-result row and most are ≤ live-dialog; mẫu 4's old cost (MutationObserver fighting render) is gone (Fold 4× p95 was 917 ms in MD2's run). The worst mock segments are the layer fade-in (m1-enter, m2-enter: ≈ 3–5 painted frames while the 2 big pictures decode/composite) — next lever if the real device shows them: fade in the layer opacity only, start the deal 150 ms later. One short real-device probe session decides.

## Findings / recommendations (report, not changed)
- **Plain-talk cards** (no odds) — RECOMMENDATION: **name-only cards** (same size, opaque cream kit panel, name centred, no picture). Reason: the game has no per-reply pictures; kitOptPic gave all of them the same fallback picture. Done in the mock (st-m1-plain5-*).
- **Card numbers**: the hand is the game's REAL act cards (names, pictures, Cần/Tốn/Được rows, odds meters from BAL); mẫu 4 deltas = `BAL.kitpage.demo`; the gift chip = `giftVal`. No typed numbers remain (law 4).
- kitScene §93 itself still darkens + blurs the whole background (KIT_SCN.veil .45 + blur 6 px) — switched off in the mocks; MAIN to decide (law 16). KK21's kitDim (opaque figure-only, BAL.kdim) is the intended replacement for the focus dim.
- Live `kitFlyItem` (j93) lays a cream veil over the stage while an item flies to Tư trang (visible in m4 with an item) — same family as the above, report only.
- Mẫu 1 plate on Fold n=10 sits over the second card row (the plate replaces the other row while a card is lifted) — taps on the covered row need a tap on the lifted card first; acceptable for n ≤ 7 (one row), consider moving the plate above for n=10 in the build.
- Same seeded life (KSEED=1) per run, but Fold and iPad draw different rival casts (the stage people differ by device); both are consort-road lives.

## Per-ruling checklist (also on the review page)
- [x] OD 15:15Z (a) no event frame first. (b) cards = picture + short name, tap lifts, tap again chooses, 5–10 cards no scrolling. (c) conversation layout kept (MAIN ruling). (d) gift: tap person → she lights + hanging plaques → ring; no frame over a face. (e) mẫu 4 no flip card, one by one, held HUD numbers. (f) smoothness: optimisations done, probe delivered; absolute proof needs a real device.
- [x] OD 15:30Z: iPad = one wide scene; no panel; everything animated start→end; not cards for people; others recede / chosen steps out; bg bright.
- [x] OD 15:40Z: picker = thẻ gỗ treo (RING's code); animation kept and optimised.
- [x] OD 09:15Z kit parts only; 09:05Z bg normal brightness; 08:55Z no dotted oval; 14:50Z complete mocks (every frame looked at as sheets + full-size stills; re-shot after each fix, Fold + iPad).
- [x] Law 4 (no typed numbers), law 7 (odds words only), law 12 (both devices @2).
- [!] Open: plaque placement (top row vs beside the person, see 1); kitPick/kitDim swap (HANDOVER).

## KIT REQUESTS (updated in place in dev/kit/KIT_REQUESTS.md)
K-HAND (real act cards, name-only plain cards, pre-decode) · K-RING (shared with RING; front-tile names; cy Fold .66 / iPad .74) · K-STAGE-ACT (one wide scene, step-out + halo + pre-filtered dim copy + the hanging row) · K-STATFX-FLY (+ (g) number held in data via kitStatSet).

## HANDOVER (successor: the coordinator opens it; MAIN 126 ordered it)
State: mocks + recorder + probe + review page pushed (branch review/motion-design-3), page uploaded (55 files, 109 MB). ~100 % design of the 4 deltas as ordered / ~0 % playable (nothing wired).
**NEXT (ordered by MAIN 126 after my job started): use KK21's kit parts in mẫu 2 — no private versions.** review/kit-woodskin 09c4386c (KIT §98: `kitPick` «thẻ gỗ treo», tap = lift, tap again = choose, plaques beside the person, low; `kitDim` opaque figure-only dim, BAL.kdim). It is based on a newer main WITHOUT review/kit-evframe-r1 (its §93.4 is the old stacked layout), so: (1) worktree at origin/review/kit-woodskin, merge origin/review/kit-evframe-r1 (conflicts only in index.html/sw.js/KIT.md: take both KIT.md blocks, rebuild with `bash dev/site/build_site.sh`), use that build as GAME_ROOT; (2) in dev/mock/motion3/m2.js replace `picker()/btn()/pickBtn()` with `kitPick` and the dim-copy code with `kitDim`; keep the item ring + give flight; (3) the placement question (top row vs beside the person) — with kitPick beside the person, check the face-overlap on Fold with 3 people (my r1 stills showed a neighbour's face covered): if it fails, ask MAIN to get the owner's choice, do not invent a second placement; (4) re-shoot Fold + iPad stills + mp4 (`KSEED=1`), look at every frame, `python3 dev/mock/motion3/mkindex.py img/_review/motion3 "probe/kperf.html?khost=1&kperf=1"`, `python3 dev/site/cdn_sync.py img/_review/motion3` (kperf probe: `python3 dev/mock/motion3/mkprobe.py <build index.html> img/_review/motion3/probe` first, so the probe uses the new build); (5) real-device probe numbers from MAIN → decide the fade-in tweaks above.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
