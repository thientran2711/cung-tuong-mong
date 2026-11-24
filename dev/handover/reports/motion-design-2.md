# MOTION-DESIGN-2 report — mẫu 1 «Bàn bài», mẫu 2 «Vòng bảo vật», mẫu 4 «bay về túi» (owner OD 24/11 ~15:15Z picks)
Worker: MOTION-DESIGN-2 (session_01V1ZZH1hciLG3T6ZvRdT89N, depth 8), coordinator MAIN CHÍNH 124. START_CTX ≈ 4 % (get_session reads 0; own estimate). Design mocks in the REAL game; nothing wired.

PRIORITY #1 CHECK: OD 24/11 ~07:48Z + ~15:15Z (verbatim, read in full) + 04:35Z / 23/11 20:27Z / 08:55Z / 09:05Z / 09:15Z / 14:50Z | main: dev/MOTION.md, j93 kitFlyItem/kitResultFx, jflip, jk2b kitRoulette, img/kit/card-back.webp, **KIT §57.1 kitStatFx (jstatfx.js) — already queues «Danh +2» labels → mẫu 4 is a CHANGE of §57.1, not a new part**, KIT §93 kitScene/kitDlgBox, kitOptPic, kitHintRow, kitItem, kitChip, .kbtn | review/*: review/motion-design db847a35/6adfb74e (predecessor mocks, reused: harness idea, card back, kitFlyItem), review/kit-evframe-r1 298ba4e4 (§93.4 layout A speaker LEFT full / her RIGHT — USED as the runtime, not yet on main), review/ring-design r2 (kring layout part — ONE shared kitRing) | claims: none.

## Where to look
- Review page (Fold + iPad side by side, 1x + 2× slow mp4, stills): https://ctm-img.victoria-tntt.workers.dev/img/_review/motion2/index.html (wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review motion2`).
- Code: branch review/motion-design-2, `dev/mock/motion2/` — boot.js (real device profile + HOST mode = the scaled game iframe the player gets; runtime = review/kit-evframe-r1 build), lib.js (helpers, face-overlap check, rAF probe), m1.js / m2.js / m4.js (the mocks; interactive: real tap handlers), scen.js (scripted runs), record.js (CDP screencast → mp4 1x + 2× slow + stills), perf.js (CPU throttle runs), stills.js, mkindex.py.
  Run: `GAME_ROOT=<built checkout> node dev/mock/motion2/record.js <out> m1|m2|m4 all` · `PERF_DSF=1 node dev/mock/motion2/perf.js <out.json> 1,4,6`.

## What each mock does (all parts = existing kit parts; only layout/motion is new = KIT REQUESTS)
### Mẫu 1 «Bàn bài» — event = conversation + hand of cards
- NO event frame first: kit scene layer §93.1 opens straight into motion: background eases in (scale 1.06→1, NORMAL brightness: veil + blur switched off in the mock), the speaker walks in from the LEFT (full body, §93.4), her figure slides in RIGHT (§93.4 half body), the speaker's line drops in the §93.3 kit dialogue box (tail to the speaker; never over a face).
- Her replies are DEALT from the right edge (card back `img/kit/card-back.webp` → face flip by scaleX, 90 ms stagger). Card face = kit panel frame + the option's kit picture (kitOptPic) + short name + the kit odds meter `.kodm` (scaled to fit narrow cards; plain talk = no meter).
- Fit without scrolling (checked): Fold n=5 one row (81×132), n=7/10 two rows (93×150); iPad n=5/7 one row (150×243), n=10 one row (104×168). ONE card size per hand.
- Tap = the card lifts (−20 % h, ×1.07, gold kit glow), the others soften; DETAILS PLATE = §93.3 box (no header) holding the REAL kit option card (title + odds meter + Tốn + Được + Bại + kitHintRow «Gợi ý»), picture dropped (already on the card). The plate is placed off every face column (iPad: between the two faces) and under the line box. Face-overlap check (painted bbox of each figure, head band) = **0 hits** for n=5/7/10 on Fold and iPad (line box + plate + every card).
- Tap again = choose → card flies to centre ×1.45, others drop, scene closes → the normal result card → mẫu 4 flights.
- RECOMMENDATION (one grammar): plain talk replies ALSO as cards (same hand, no odds meter; the plate shows the reply + Được/Mất), not the old long buttons — one grammar for every choice, no scrolling anywhere, and her conversation layout (speaker left / her right) is kept for both. The «đỏ đen» feeling comes from the odds meter + the deal, so odds cards still read different from talk cards.
### Mẫu 2 «Vòng bảo vật» — tap a person, no frame over her
- Tap a person on the stage → she lights (warm glow + brightness 1.05) and the others soften (saturate .55 / brightness .93) — FIGURES only, background untouched; filters set ONCE (no animated filter). Kit buttons (.kbtn, first .main) appear beside her at chest height on the side with room: «Tặng đồ», «Trò chuyện», «Hỏi chuyện».
- «Tặng đồ» → the item ring blooms on the floor band in front of the figures (12 real kit item tiles kitItem md; no drawn oval; names/grade chips of the back third hidden). Swipe with inertia (friction .94/frame, 180 ms snap), ‹ › kit buttons (one slot), tap a side item = it turns to the centre; «Tặng» kit main button under the front item.
- «Tặng» → the front item arcs into her (chest, never the face), the rest fold away, she pulses once, kit chip «Thiện cảm +3» rises at her waist.
- Same tap-person pattern for Dư đồ / Ngự Hoa Viên crowds: the lit/soften/buttons code is figure-agnostic; the ring maths is the SAME as RING-DESIGN's people ring (kring) → ONE kitRing with two renderers (figure / item tile). Not re-mocked on the crowd here (RING-DESIGN G mock covers the crowd).
### Mẫu 4 «bay về túi» — NO flip card
- The normal kit result frame (resultShow, seal, bars) appears as today. After 735 ms each change flies ONE BY ONE: the kit float chip `.kmfl` («Sủng +3») leaves ITS row in the result card, arcs to ITS HUD cell; the cell keeps its OLD number until the chip lands, then updates + pulses (×1.16). ≈ 0.6 s per change (525 ms flight + 77 ms gap at today's BAL.pace 1.75). A received item → kitFlyItem to the Tư trang tab at the end. Tap anywhere = finish at once.
- Timing proposal (BAL, law 4): `BAL.reveal.fly = 300*BAL.pace`, `flyGap = BAL.reveal.list/8`, `flyPre = BAL.reveal.pause*.6`.
- FINDING (law 11): today THREE effects fire at once on a stat change — §57.1 kitStatFx labels, j93 kitResultFx `.kmfls` floats, jfx/jkrev `kfhit` cell flashes — plus render() updates every HUD number instantly. That is why «mọi thứ nhảy cùng một lượt». The ask folds them into §57.1 (K-STATFX-FLY). The mock mutes the three while it runs.

## Owner-ruling checklist
- [x] OD 15:15Z (a) no event frame first — straight into the animation (mẫu 1 and 2).
- [x] (b) cards = picture + short name only; tap = lifts + details; tap again = choose; 5–10 cards, no scrolling (Fold + iPad, n=5/7/10 stills).
- [x] (c) combined with her conversation layout (speaker LEFT full, her RIGHT, OD 04:35Z) — recommendation for plain talk above.
- [x] (d) gifts: tap person → lights up + kit buttons on the stage → «Tặng đồ» → ring; NO frame covers a face.
- [x] (e) NO flip card; normal result frame; each change flies ONE BY ONE, slow enough to read; tap = finish.
- [~] (f) SMOOTHNESS GATE — measured, but this cloud container cannot prove the absolute target (see Perf). Structural rules kept: transform/opacity only for every moving part; no animated filter/box-shadow/layout; ≤ 13 moving layers (12 tiles + 1).
- [x] OD 23/11 ~20:27Z never cut figures: speaker full body inside the layer (kit §93.2); her figure = the §93.4 half body (cut by the layer bottom on purpose, kit rule); the hand / ring lie OVER bodies, never crop a figure.
- [x] OD ~08:55Z no dotted oval (the ring has no track).
- [x] OD ~09:05Z normal-brightness background; focus on figures only (mẫu 2); kit §93 veil/blur switched OFF in the mock — REPORT: kitScene (§93) itself still darkens + blurs the whole background (KIT_SCN.veil .45 + blur 6 px); MAIN to ask/decide, not changed by me (law 16).
- [x] OD ~09:15Z kit buttons/frames/avatars only (kitDlgBox, .kopt, .ksart, .kodm, kitHintRow, kitItem, kitChip, .kbtn, .kmfl, resultShow); strangers grey — no stranger appears in these mocks (the stage/scene people are known). No round avatars added (the round faces visible on the stage are LIVE j59 parts, untouched).
- [x] OD ~14:50Z complete mocks: every frame looked at; each mock re-shot after fixes (Fold + iPad).
- [x] Law 7 wording: odds only as kit words (Mong manh…Rất vững); no %, no digits for odds.
- [!] Law 4: the sample option numbers in m1.js (Sủng +3, Bạc -10…) are TEST DATA typed in the mock, not BAL — the real build reads the event's own options.

## Perf (SMOOTHNESS GATE) — honest result
Method: perf.js, real device profiles (Fold 755x1000 / iPad 1180x820, touch UA, HOST mode iframe), DSF 1 (software raster), CDP `Emulation.setCPUThrottlingRate` 1×/4×/6×, rAF deltas per segment, runs strictly one at a time. Cells = p50 / p95 frame ms / dropped frames. Rows idle-home (the home stage doing nothing) and live-* (today's dialog open and today's result + stat labels) are the CONTROL.
| segment | Fold 1× | Fold 4× | Fold 6× | iPad 1× | iPad 4× | iPad 6× |
|---|---|---|---|---|---|---|
| idle-home | 67 / 133 / 142 | 17 / 450 / 152 | 250 / 900 / 170 | 50 / 117 / 126 | 133 / 467 / 194 | 333 / 1233 / 225 |
| live-dialog | 83 / 267 / 81 | 800 / 883 / 122 | 350 / 2217 / 250 | 33 / 267 / 61 | 217 / 1200 / 200 | 250 / 1567 / 252 |
| live-result | 50 / 133 / 124 | 333 / 883 / 230 | 433 / 1033 / 181 | 267 / 600 / 169 | 1416 / 1567 / 212 | 817 / 1967 / 317 |
| m1-enter+deal | 33 / 67 / 67 | 217 / 667 / 174 | 250 / 467 / 158 | 33 / 83 / 84 | 217 / 1617 / 235 | 233 / 600 / 176 |
| m1-lift | 33 / 67 / 68 | 83 / 267 / 127 | 133 / 483 / 156 | 50 / 233 / 90 | 83 / 167 / 114 | 150 / 367 / 134 |
| m1-choose | 33 / 50 / 26 | 67 / 100 / 41 | 100 / 433 / 61 | 50 / 83 / 39 | 117 / 183 / 53 | 117 / 317 / 58 |
| m4-fly | 67 / 200 / 260 | 300 / 917 / 682 | 300 / 733 / 1024 | 83 / 200 / 343 | 233 / 1033 / 731 | 300 / 1100 / 884 |
| m2-tap | 67 / 100 / 19 | 216 / 216 / 22 | 350 / 350 / 36 | 83 / 117 / 22 | 183 / 233 / 42 | 367 / 367 / 36 |
| m2-open | 50 / 117 / 33 | 83 / 233 / 44 | 267 / 433 / 104 | 67 / 83 / 34 | 117 / 250 / 43 | 283 / 317 / 48 |
| m2-swipe | 67 / 100 / 114 | 67 / 150 / 135 | 133 / 417 / 325 | 50 / 67 / 95 | 83 / 250 / 175 | 133 / 350 / 282 |
| m2-give | 33 / 50 / 62 | 50 / 167 / 104 | 167 / 400 / 140 | 33 / 83 / 81 | 83 / 150 / 112 | 133 / 333 / 134 |
| m4-fly-bai | 50 / 183 / 116 | 117 / 267 / 150 | 233 / 1533 / 267 | 67 / 100 / 103 | 100 / 783 / 225 | 333 / 2467 / 419 |

(m4-fly row = the mẫu 4 run; All rows complete.)
Reading: this container has NO GPU — even the idle home screen runs p50 50–67 ms / p95 117–133 ms at 1× (≈ 15–20 fps), and it collapses under 4×/6× throttle (idle p95 450–1233 ms). So the owner's target (p95 ≤ 20 ms at 4×) CANNOT be proven or disproven here; no mock can be faster than the idle floor. Relative to the control under the same conditions: mẫu 1 (deal/lift/choose) and mẫu 2 (tap/open/swipe/give) are at or below the idle floor in most rows (exception: iPad 1× lift p95 233 vs idle 117; Fold/iPad 4× deal p95 667/1617 — the deal start overlaps the layer fade-in + 5 picture decodes) and below today's live dialog/result (e.g. Fold 4× swipe p95 150 vs idle 450 vs live-dialog 883); mẫu 4 flights are the heaviest of the three (Fold 4× p95 917) — cause: the mock's MutationObserver that holds the HUD numbers fights render() every frame; a real §57.1 build holds the number in data, not by observing the DOM, so this cost is mock-only (not cut, because cutting it would show the jump the owner rejected).
What I did NOT cut: nothing — no mock was simplified, because the container cannot tell a pass from a fail. RECOMMENDATION before any build: run the same scen.js on the owner's real devices (or a GPU runner) through a hidden `?kperf=1` probe that prints p50/p95 — one short session on the Fold and the iPad gives the real gate numbers.

## KIT REQUESTS (filed in dev/kit/KIT_REQUESTS.md on this branch)
K-HAND kitHand (new) · K-RING kitRing (one part with RING-DESIGN kring) · K-STAGE-ACT (stage person actions, same need as RING-DESIGN «stage option sheet») · K-STATFX-FLY (CHANGE of §57.1 kitStatFx, not a new part).

## Honest limits
- Mocks are scripted on the real game; the hand/ring/buttons are mock code (not kit code). The event content is test data; the runtime is review/kit-evframe-r1 (layout A not yet on main).
- Plain-talk cards (no odds) all got the SAME fallback picture from kitOptPic (st-m1-plain-lift-fold.jpg): a real build needs per-reply pictures or name-only plain cards — decision for MAIN/owner.
- Fold n=5 cards are small (81 px) because the plate must fit between faces and the lifted card; iPad has room.
- The perf numbers are container numbers (no GPU); see above.
- Stills/videos were looked at as contact sheets + key frames; every layout state was looked at full size during the fixes.

## HANDOVER (if a successor continues)
State: mocks + recorder + perf runner pushed; review page uploaded (36 files, 77 MB: m1/m2/m4 × Fold/iPad × 1x + 2x-slow mp4, st-* stills incl. n=5/7/10 + plain-talk variant). Next if MAIN wants: (1) real-device perf with scen.js; (2) a crowd version of mẫu 2 on RING-DESIGN's G layout; (3) KK builds K-HAND / K-RING / K-STAGE-ACT / K-STATFX-FLY.
~100 % design / ~0 % playable (nothing wired).
