# mg-craft-ve REPORT (worker VE, sonnet, session_01N1tNP2gpsC12ARDUqUciDw) — Vẽ «Thủy mặc: bố cục, năm sắc mực»
START_CTX ~ low (own estimate; get_session reads 0). Branch review/mg-craft-ve **f1ef0106** (= origin/main 70bea3d3 + lead scaffold 01114e27 merged). SẴN SÀNG KIỂM.
PRIORITY #1 CHECK ('mg-craft|Thủy mặc|trace ve|craft'): OD 20/11 ~08:15Z (each art its own mechanic) + ~05:10Z (no text in play) | main j91.js k91Trace (ve until now; kept for Chép kinh / May áo via jwkg) | review/mg-craft-design 54ad4544 + review/mg-craft 01114e27 (scaffold) | claims: lead mg-craft.

## What (dev/build/jcraft_ve.js, engine `inkwash` = k91Ve, design §2)
Per painting (3; motifs 3/3/4 + mgMore, max 6):
1. **Bố cục**: master's small sample pinned top-left (same shape as the scroll); drag motif stamps (chủ sơn, khách sơn, thuyền+nước, tùng, hạc) from the tray onto the blank scroll where the sample has them; higher = farther = smaller + paler (live while dragging). ✓ (sign, tooltip only) when all are down.
2. **Mực**: layers glow one by one far → near. Press-hold the brush on the inkstone: a bead slides over the tone swatches on its rim (T tones), release on the tone the layer shows in the sample (a quick dab = lightest); flick (tap, or lift straight on the layer) onto the glowing layer: the wash blooms. Flick that spills into the blank mist leaves a blot; a flick that misses wastes the brush (2 misses = layer auto-done, 0 tone). A loaded brush pales one tone per `dry` ms.
3. Score per painting 10/3 × (0.5 placement + 0.4 tone [exact 1 / one step .5 / else 0] + 0.1 clean) × mgPace → raw sum 0–10 → mgGrade(raw,"ve"); kG .9 / kAdj −1.6 / cal key / hand band untouched.
Extras (not in the design, flagged): tapping the sample re-opens it for `peek` ms (a memory board needs a fair look-again; costs time only); one finger at a time (a second finger is ignored while the brush is loading).
No words in play: signs ★ ✗ ✓ only, no letters on the canvas (mg-craft.js + own check). Kit parts only: kg82Canvas/kitGameFrame, k91Btns ✓ sign, k91Pointer, kg82Spr (existing ve-inkstone / ve-brush sprites), BAL.mgFx lit ring, kg82Pluck/Pop, kgReady + KG82_DEMO "drag", kgTut ghost hand, kitGameVs path untouched. KIT REQUEST: none (a hold demo would be nicer than "drag" for the rules picture — optional).
Stand-in art («tạm»): motif stamps drawn on the canvas through `crArt` (names `ve-motif-<sonchu|sonkhach|thuyen|tung|hac>` land in CTM_MISSING_PICS = the marker), scroll edge dashed. Inkstone + brush sprites already exist.
**ART REQUEST (Foreman C):** `ve-motif-sonchu`, `-sonkhach`, `-thuyen` (boat + water), `-tung`, `-hac` (crane pair) as grey ink stamps (one sprite tinted at runtime, or 5 tones), ~2×2 in half-size units; blank silk scroll; 3 master paintings (shan shui) as samples (the sample thumbnail is currently the same stamps at the sample tones). Delivered names go into jcraft.js CR_HAVE.

## Levers (BAL.mgTier.lev.ve, [ease 0, ease 5], in the lead's block; harder with rank, law 5)
place .016→.14 (hit radius, share of scroll width; full inside) · tones 5→3 · ramp 450→2600 ms (brush passes all tones) · dry 400→30000 ms per tone lost · peek 3000→40000 ms · bleed .07→.03 · reach 1.1→1.5 · flick 420 (bot oracle think time) · holdMin 40 · wPlace/wTone/wClean .5/.4/.1 · lim 7000→9500 ms per motif + limBase 8000→10000 · fast .5→.7 · keep .6→.8 (mgPace). Motifs +mgMore. Every number from BAL (one-core guard PASS).

## Tests (all on f1ef0106)
- `node dev/test/mg-craft.js dev/index.html 755x1000 --kinds=ve` → **PASS 15/15**: every caller (playArt, startContest, mgCalRun, exRun, kcEntryExam, works) rules + Sẵn sàng → inkwash, no text in play + guided round, ghost hand, S untouched, bot raw float, lesson, old save, ✕. I added a `KIND_CASES.ve` (levers shape, missing-pic marker) and a **press-and-hold branch in the shared bot `__bot`** (it had none; ve needs it). Table (lead bot, no slips): ve skilled e5 10.00 · e2 10.00 · e0 9.11 · random e5 1.73.
- `node dev/test/mg-ready-guide.js` (all kinds) no FAIL, ve row all yes. `node dev/test/one-core-guard.js` PASS. (dev/test/quickcheck.sh does not exist in this tree; mg-craft + ready-guide + one-core + mg-bots are the checks run.)
- Measure `dev/measure/mg-bots.js` (virtual clock, skilled n=10/cell, standard slips). BEFORE = old trace board (origin/main 70bea3d3), AFTER = this branch:

| kind | ease | before skilled mean | after skilled mean | random before→after |
|---|---|---|---|---|
| ve | 0 | 6.59 | 6.56 | 0.02 → 0 |
| ve | 1 | 8.72 | 8.46 | |
| ve | 2 | 9.42 | 9.57 | |
| ve | 3 | 9.82 | 9.57 (+1 stuck run, see below) | |
| ve | 5 | 9.88 | 9.8 (+1 stuck run) | 0.17 → 0 |
Same spread as the old board (owner's calibration road keeps its meaning). NOTE the harness's random "slip" moves (6–12 % of moves) sometimes run a second finger onto the board while the bot holds the brush: the bot then thinks it still holds and the play ends 0 (≈5–10 % of plays, never with `mg-bots-noslip.js`, a copy of the harness with slips off, added in dev/measure: ease 0…5 = 7.50 · 8.86 · 9.99 · 10 · 10 · 10). A person has one finger; the engine ignores extra fingers while loading. Lead may want that in the final big measure (use noslip or drop raw 0 as a harness artefact).
- Callers scan: `trace` k91Trace stays registered (jwkg Chép kinh / May áo); `ve` no longer uses it (j71, jexam, jentry, works `tranh`→ve all go through KG82_KIND.ve → inkwash).

## Shots (Fold 755x1000@1 + iPad 1180x820@1, direct mode, LOOKED 3×; CDN folder img/_review/mg-craft-ve/, base https://ctm-img.victoria-tntt.workers.dev/)
fold-rules / fold-guide / fold-play / fold-ink and ipad-rules / ipad-guide / ipad-play / ipad-ink `.webp`. (Result screen = the common kit result card, seen: «10/10 · Xuất sắc».) The verdict giver wipes the folder: `python3 dev/site/cdn_sync.py --wipe-review mg-craft-ve`.

## Open / for lead
- Ease-0 tone window is tight on purpose (ramp 450 ms / 5 tones = 90 ms per tone) so a skilled bot lands where the old board did; a human tester may want ramp ≥ 800 — tune in BAL only.
- KG82_DEMO "hold" would show the brush press better than "drag" in the rules picture (set `demo` in KG82_CRAFT.ve if you agree).
- Merge note: lead's `KG82_CRAFT.ve.how` now mentions ✓ (one-phrase edit in j91.js); my jbal2.js `ve` row replaces yours in place (units: peek/dry in ms as in the design).
