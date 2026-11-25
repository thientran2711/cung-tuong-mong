# kit-opts-pack-4 — KK29 (kit keeper) — branch review/kit-opts-pack-4 @ 7603d689 FINAL (base review/kit-opts-pack-3 f10d269d; earlier KIT READYs e495556c, 084d1b27, 8e591b3a are superseded)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* d-robot-bugs 95eafc6e (same pcPort `.rk` crash fixed there: I applied the IDENTICAL j15/j3 text from 62f5d101 so both merge clean; its qBind/dedupe/#5 CSS NOT taken) | SELSCENE-18 q.__kmA.
START_CTX: not measured (get_session reads 0); finished in one context, nothing to hand over beyond "Open points".
Pair (Fold + iPad together, ≤1600 px): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-opts-pack-4/nested-mood-entpick.webp and .../endcard-ink.webp (wipe: python3 dev/site/cdn_sync.py --wipe-review kit-opts-pack-4).

## Items (before = f10d269d / LIVE, after = this build; each test Fold 755x1000 + iPad 1180x820)
| # | Item | Root cause | Fix (kit) | Test | Before → after |
|---|---|---|---|---|---|
| 0 | SOFTLOCK Tin báo ≥25 + action notice (F BIG REVIEWER #5) | LIVE 9f72524b: v3 frame clips, «Để ta xem / Để sau» below screen | ALREADY FIXED by KK28 56.27 on f10d269d — no new code | new `kit-notice-action.js` (N=1,6,25,60 × with/without action: options in view, real tap on «Để sau» closes) | LIVE FAIL 4 (N=25,60 on both devices) → f10d269d and this build FAIL 0. The K-NOTICE-OPTS text lives on bc-stack, not here: whoever lands it must drop «leave by scrolling». |
| 1 | KIT BUG #5 nested panel soft-lock (M5) | tapping the mood emoji of a STAGE figure (key x3…) inside «Chọn người theo hầu»: `pcPort` threw «f.rk.split is not a function» while the Tâm trạng panel was built → half frame, no ✕, no button | (1) kitRk/kitRkCls (j15, j3 mdH) = d-robot-bugs text; (2) `kitModalSafe` (j79): a layer whose render throws leaves the queue and the layer under it shows again; Chứng cứ / Đã biết panels use it too. KIT §56.30 | new `kit-nested-exit.js` (hosts entourage 2 + 1 candidate, event, act picker, one-option × openers mood me/emp/servant, REAL tap on stage-figure emoji, Đã biết, Chứng cứ, Thỉnh tranh, render-throws; exit visible + real tap returns to host) | f10d269d FAIL 6 (render-throws DEAD) → 0 of 56+. MAIN 141's repro (1 thân tín, Hối lộ KSP) NOT reproduced exactly (needs her save); same render-throw path, now guarded. |
| 2 | KIT BUG #6 iPad art tap → lightbox | jopic capture handler on `.kaart[data-kzoom]` | handler + data-kzoom removed; picture tap chooses. KIT §6.2 line overwritten | new `kit-opt-art-tap.js` (real tap on art: entourage avatar, plain card), `opt-pics.js` updated | f10d269d 6/6 LIGHTBOX → 0 FAIL (ksp-card case n/a: no art on that card in the test state). |
| 3 | KIT BUG #4 end-card banner | death-ink scene (`.kmov.km-inkov`) above `#modal.end` | j93 CSS: card hidden while ink plays. KIT §56.31 | new `kit-endcard-ink.js` (2 causes) | card visible under ink 40/40 frames → 0; banner-on-rows 0; card shows after the scene. |
| 4 | not-danger flag | alarm/heartbeat/music each had a private pid list | `kitNoDanger(card)` (j11), ONE rule for alarm (j93), heartbeat, music. Named flag **`nodanger:1`** on the card or kit spec; q.__kmA still works. KIT §93.9 | new `kit-alarm-scan.js` (109 pids + 13 live cases) | see table |
| 5 | jdfv 4000 | typed number, no cue | `BAL.df.faceWaitMs` + `kitWaitCue()` (jph, KIT §59.3) | new `kit-waitcue.js` | typed 4000, silent → BAL + «Đang thỉnh tranh…» pill, 5/5 PASS |

Not-danger table (before: all fired wash + heartbeat; after: silent): act pickers `wkgive runner vlget vlcraft vlnvp vlout htban h54ban pgpick tsgift tsgiftpick entpick` (KIT_ACT_PIDS), selection day `selx* kc2Sel`, and judged here: `nfch nfsum` (Kính sự phòng night report/flip = like ksp), `kyngo` (kỳ ngộ), `j71i` (Lời mời from Hoàng thượng), `j67` (story chapter — JUDGEMENT CALL, MAIN please confirm; it is silent now). Unchanged DANGER: 81 pids incl. tt1-3 td1 ch1 ch2 j70* rvquarrel vnight empnight vuoan.
**Follow-up for selection lane (after both land):** jselxday `selxCalm()` (review/selection-scene 29f3b99f): replace the q.__kmA define by `q.nodanger=1` (selx* pids are silent anyway). SELSCENE-18 session is inactive; MAIN 140's message was the channel.

## Gates
- Frame scan `opt-frame-scroll-scan.js` (41 frames) Fold + iPad: new vs LIVE 9f72524b: FAIL 1→0 / 1→0, REGRESSIONS 0; new vs f10d269d: FAIL 0→0 both, REGRESSIONS 0.
- KK28 tests on this build: kit-one-opt-tap 30 taps FAIL 0 (1 flaky FAIL in the first run, 0 on rerun; lander: rerun after ff0f723f F choose-guard AND this pack, as ordered); kit-row-tap-size 16 rows FAIL 0; kit-opts-touchdrag 8 FAIL 0; kit-tag-collide 702 tags 0 overlapping pairs.
- quickcheck: open ok, old save ok, perf render 293/252 ms tab 680/723 buổi 3025/1851 (new/live; box was loaded by my parallel scans) — QUICKCHECK PASS; **core gate G4 80-dialog-fixed FAIL: `755x1000 1-hoi-nga-re-1: phone option cards in 1 column (layout 2S)`. SAME FAIL on f10d269d (pre-existing, from KK28's 56.27 Fold stacked frame; NOT caused by this pack).** Not fixed here: needs a decision — either the test's «1 column» rule or the 2S layout. MAIN: send back to me or to KK28.
- build_site.sh run, index.html/sw.js committed.

## Open points
1. G4 80-dialog-fixed pre-existing FAIL (above). 2. j67 judgement. 3. MAIN 141's exact Hối lộ KSP repro needs the robot save. 4. Land order: d-robot-bugs identical j15/j3 hunk merges clean; its kitPanel dedupe touches j79 near my kitModal edit (different lines).
Rollover: none needed.


## Addendum after the first report (MAIN 141 / 142 orders)
- **G4 dialog-fixed**: fixed in the TEST (084d1b27): phone column rule reads the kit's data-kol/kot (stacked NL/NM/NS 2 columns for 4+ short options allowed, KIT §56.27). Pass.
- **iPad «Tân quân lập uy» (M-FIX-1) soft-lock**: reproduced on LIVE with the real frame (`rgFire('c2a')`: iPad list top 814, frame bottom 697); fixed on f10d269d (KK28) so this branch carries it to LIVE. Test `dev/test/kit-faces-opts.js` (faces 0/1 × 2/7/14 lines × 2/4/6 options × Fold+iPad, real tap on the LAST option, finger drag): LIVE FAIL most cases → 36/36. KIT §56.32.
- **Law 10 text first** (MAIN 141): `kszTextFirst3` (jksize; also called after the option re-layout in jopic.js:322): story text unscrolled; picture strip → min → OUT (overrides the old «never dropped» line of 56.6; MAIN 141 explicitly asked) ; option list floor 112 px scrolls inside; `.kscue` pill floats (no 120 px row). Idempotent while it holds. KIT §56.32b. The test asserts «text unscrolled» when text + 112 fits the column; very long texts (14 lines) keep the scroll window.
- **Reward over ending (E-S5)**: `kitEndUp()` (j93) blocks `kitReward` while `#modal.end/.kes` is up; test in kit-endcard-ink.js (f10d269d: SHOWN → none). KIT §56.31b.
- `dev/test/kit-notice-action.js`: Tin báo ≥25 + action notice (LIVE FAIL 4 → 0; already fixed by f10d269d).
- Scans on the final code: 41-frame Fold + iPad 0 regressions vs LIVE and f10d269d; kit-faces-opts 36/36.

## HANDOVER for KK30 (kitHand «Bàn bài», brief briefs/KK30-kithand.md) — base = review/kit-opts-pack-4 7603d689
1. Not re-run on 7603d689 (lander / KK30 please): kit-one-opt-tap (1 flaky FAIL once, 0 on rerun), kit-opts-touchdrag, kit-row-tap-size, kit-tag-collide, full `bash dev/tools/quickcheck.sh` (last quickcheck on 1840b31b: PASS except G4, since fixed in the test).
2. Machine tip: 4 cores; never run more than 2 Playwright scans in parallel (6 in parallel made a 10-min scan take 40 min). Scan tools: `opt-frame-scroll-scan.js` + `opt-frame-scroll-diff.js` (one device per process), `dialog-fixed.js` (~3 min), `kit-faces-opts.js` (~4 min).
3. Kit helpers added: `kitModalSafe(m)`, `kitRk/kitRkCls` (same text as d-robot-bugs 62f5d101), `kitNoDanger(m)` + `nodanger:1` flag (§93.9), `kitWaitCue()` (§59.3), `kitEndUp()`, `kszTextFirst3`. Selection lane follow-up: jselxday `selxCalm()` → `q.nodanger=1` after both branches land.
4. Open: j67 judged not a danger (MAIN 141 confirmed); MAIN 141's «Hối lộ Kính sự phòng, 1 thân tín» repro could not be reproduced without the save (same render-throw path, guarded); K-NOTICE-OPTS text lives on bc-stack («leave by scrolling» must go).
5. Pairs on CDN img/_review/kit-opts-pack-4/ (nested-mood-entpick, endcard-ink, tan-quan-lap-uy, tan-quan-lap-uy-live-vs-new-ipad): wipe with `python3 dev/site/cdn_sync.py --wipe-review kit-opts-pack-4` after the verdict.
Context: I am at ~45 % of the window; I stop here as ordered.
