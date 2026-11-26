# kit-hand — KK30 (kit keeper) — kitHand «Bàn bài» — branch review/kit-hand @ 8e50f709 (base review/kit-opts-pack-4 7603d689)
PRIORITY #1 CHECK ('kitHand'/'Bàn bài'): OD 2 (24/11 ~15:15Z, 25/11 ~15:12Z) | ledger 0 | claims 0 | main 0 | review/* 0 code (mocks only: motion-design-4 7939838d m1) | kitPick/KIT_PLAQUE: NOT on main nor on the base — only review/kit-ring5 f44c657d (KK25, «STAGED, NOT WIRED» per KIT §98).
START_CTX ~5 % (get_session reads 0; estimate). Stopped at ~30 % (START + 25 %) = rollover.

## Done (KIT §101, dev/build/jkhand.js + jksize kszHandFit3)
- Every `#modal .opts` of 2–10 kit option cards = a HAND: face = act picture + short name + odds meter; tap 1 = lift + details plate (kit «!» card copy: Tốn/Được/Mất/Gợi ý + «Chạm lần nữa để chọn»); tap 2 = card flies, then the normal chooseM path. Locked card lifts + shows why, never chosen. Keyboard / robot (`click()`, detail 0) chooses at once; data attributes unchanged.
- Not a hand: 1 option, >10, person pickers (face cards: evpick/itarget/plantsv stay pickers), .kpdlg, .pc.
- Layout: Fold = stacked full-width frame (NL>NM>NS), hand under the body; iPad = XL, hand at the foot of the right column, full height when the text would scroll; compact hand when still no room; hand sticky (never scrolls out). 7–10-card frames are now event frames (were pick-list pages).
- Motion: transform/opacity on cards only; deal waits for decoded pictures (≤700 ms); plate hides when the card flies; no ripple / seal re-place on hand cards.
- Guards: jopic kitOptTier + jksize kszBtnGridLive3 skip hands; jfx no lock-pop/ripple on hand cards; jseal ignores hand mutations. Kit page sample `kitPgHand` (§101 row).

## Gates (this branch)
| gate | result |
|---|---|
| NEW dev/test/kit-hand.js (real c2a «Tân quân lập uy Ch.2», 2/6/8/10 cards, locked, keyboard; Fold+iPad) | PASS |
| opt-frame-scroll-scan TAP2=1 (NEW mode: real tap ×2 on the last card of every real PEND frame) | Fold 37 hands chose, iPad 37 chose, FAIL 0 |
| opt-frame-scroll-scan diff vs base 7603d689 | Fold + iPad REGRESSIONS 0 (45 vs 41 rows: 4 new 7–10-option frames; 3 of them person pickers, back out of scope) |
| kit-faces-opts (updated: two taps on a hand, hand floor in the text-fit rule) | 36/36 |
| dialog-fixed (updated: §101 hands read plate rows, N frames on Fold) | all pass |
| kit-one-opt-tap 30 / touchdrag 8 / row-tap-size 18 / tag-collide 708 tags | FAIL 0 each |
| dead-card | PASS |
| quickcheck on be559f81 | QUICKCHECK PASS (open ok, old save ok, perf new/live render 221/251, tab 460/407, buổi 1204/942) BUT core G1 one-core-guard FAIL: kit-page sample typed numbers → fixed in 8e50f709 (words only). Rerun of coregates was still running at handover — successor: rerun `bash dev/tools/quickcheck.sh`. |
| hardlock-scan / button-crawl / q-softlock | not on this base (not in dev/test) — not run |
| NEW kit-hand-perf.js (rAF frame times) | lift / fly mostly 17 ms p95 after a warm-up tap; the deal still shows 1–4 main-thread long frames while a FRESH frame builds and loads pictures (CPU 1× and 4×). The motions are compositor (transform/opacity), likely smooth on screen, NOT proven. OPEN. |

## OPEN for KK31 (successor; brief briefs/KK30-kithand.md items still open)
1. VIDEOS not delivered: /home/user/wt/kk30-shots/rec.js records, but my trimmed clip missed the deal and showed the plate staying during the fly (fixed in 8e50f709). Re-record Fold+iPad (1× + 2× slow) on 8e50f709, check the deal is in the clip, LOOK at every frame sheet, upload NEW names to img/_review/kit-hand/, then KIT READY to MAIN.
2. Smoothness: confirm on video / compositor trace; if the deal stutters, hold the deal until the frame's picture re-fits finish (KIT_HAND.readyMs) — dropping the animation is NOT an option (owner).
3. Item 5 thẻ gỗ treo (kitPick, ≤3 per page) on every person conversation screen: NOT started. kitPick is only on review/kit-ring5 f44c657d. Merge it, then wire into jdfv kitFocus acts / #popw person card (j6/jdf dfActs) / jfocus choices (RD5 rec, img/_review/ring4/).
4. «No event frame first»: the hand deals INSIDE the existing kit event frame (speaker left, text, her hand). MAIN to judge whether the frame itself needs an entry move.
5. hardlock-scan / button-crawl / q-softlock: ask MAIN where they live.
Worktree /home/user/wt/kithand (sparse); scratch /home/user/wt/kk30-shots (probe.js, prof.js, rec.js, perf2.js).

## ADDENDUM 17:58Z — MAIN messages read late (queued 15:53Z–17:41Z, read 17:55Z)
KK31, do these FIRST (MAIN 144 = session_01V1ZZH3PV7kr8kWB89YiVN7; 7603d689 ships ~18:30Z):
1. MAIN 143 FLIGHT PRIORITY (not done by KK30): base 7603d689, iPad 1180x820 law-10 FAIL in kit-faces-opts faces1 lines7 opts4 — strip ok, 4 options in view, but the 7 story lines sit under the faces row behind «Kéo xuống». Fix the family in kszTextFirst3: on iPad the faces row steps down too (small chips / one row beside the strip) and/or options 1 column narrower; if impossible, text keeps first place and the option list scrolls (floor 112). Repro: FACES='[1]' LINES='[7]' NO='[4]' node dev/test/kit-faces-opts.js index.html <out> (shot BEFORE the tap). Re-run kit-faces-opts all + 41-frame scan + kit-notice-action, Fold+iPad pair (NEW CDN name), KIT READY <sha> to MAIN 144 + a FOR MAIN/B KIT line in FOREMAN_B_STATUS.md. Then port to review/kit-hand.
2. MAIN 143 FYIs to check in the scan: (a) iPad «Tâm trạng · Cung nữ thân tín tam đẳng …» dialog with no close/continue even scrolled to the end = no-button card family → kitModalSafe / every kit dialog has an exit; (b) «Bổng lộc tháng chín» reward over the END card = kitEndUp (pack-4) confirm covered; (c) kpopTrap/odds chip in card tap zone = harness-only, optional.

## KK31 (session_01V1ZZH4F57paDBkBCH9PESr) — 25/11 19:30Z — FLIGHT delta review/kit-text-first 708056a9 (base pack-4 7603d689, independent of kitHand)
PRIORITY #1 CHECK ('kitHand'): OD 2 | ledger 0 | claims 1 (KK30) | main 0 | review/* 0 ; ('kszTextFirst3'): OD 0 | claims 3 | main 0 | review/* only kit-opts-pack-4 + kit-hand. START_CTX ~6 %.
1. iPad 1180x820 faces1 lines7 opts4 (shot BEFORE tap): pack-4 = 0/7 lines visible; kit-hand 8e50f709 = 4/7 (NOT fixed). Delta: (a) jksize 56.25 grow also when the story text still scrolls (kv2 L/XL, kept only if it helps); (b) kszTextFirst3 step: faces row (.kpmain>.faces, kit pframes) small 34 px + name beside (data-tff) before the picture goes out; (c) scroll-cue family (kitScrollCues): short-list strip follows its list, stale strip removed, a list with its own strip shows no in-list hint (Fold had two «Kéo xuống»). KIT.md 56.32b + 56.31b amended in place.
2. MAIN 144 extras: (a) «Tâm trạng · …» no exit = pack-4 shows ✕ (24-row kitModal, iPad+Fold, after scroll) → FIXED-ON-LIVE for that shape, E to recheck on LIVE (their evidence was a local main build). (b) reward box over END: NEEDS-DELTA on pack-4 (box already open / queued stayed over «Kiếp này») → fixed here (j93: queued job checks kitEndUp; open box closes when #modal turns .end/.kes); probe pack-4 true/true → delta false/false. (c) kpopTrap parked (not flight).
Gates on 708056a9: kit-faces-opts 36/0 · kit-opts-touchdrag 8/0 · kit-one-opt-tap 30/0 (alone ×2; one locked-card «tap pop» flake only under parallel load, same flake class on any build) · kit-notice-action 16/0 · opt-frame-scroll-scan Fold 41/0 + iPad 41/0, diff vs 7603d689 REGRESSIONS 0 (one j7c Fold hint flake in a parallel run, 41/0 on rerun, alone pass on both builds).
Pair (NEW names): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-text-first/kk31-708056a9-pair-fold-ipad.png (+ kk31-708056a9-fold-755.png, kk31-708056a9-ipad-1180.png).
OPEN: Fold re-pick settles XL+text-first or NL (both read all 7 lines); 2 early shots (before the cue fix, heavy CPU) caught a pre-text-first layout — 23/23 later measured runs fine. Port to review/kit-hand next; then KK30 list (quickcheck rerun, videos, kitPick).
- (20:21Z KK31) QUICKCHECK PASS on 708056a9 (alone: core gates PASS, open 2719 ms, old save ok, perf new/live render 326/338, tab 905/764, buổi 2404/2197). Quickcheck needs coop/ in the sparse checkout (G4 imports coop/worker/src/merge.js) and must run alone (perf noise). Delta ported to review/kit-hand 9cffbf17: kit-hand.js PASS, kit-faces-opts 36/0, opt-frame-scroll-scan TAP2 Fold 42/0 + iPad 42/0. Still open from KK30 list: videos Fold+iPad, deal long frames, kitPick (ring5) wiring, «hand inside event frame» proposal, SELSCENE-19 hunk (not received yet).
- (21:5xZ KK31) NEW BASE: LIVE 351122ba has no kszTextFirst3 (flight shipped 5e3732c9). review/kit-text-first-2 166b3000 = LIVE + 7603d689 kszTextFirst3 + 708056a9 delta + determinism: cause of the Fold old-layout flips = XL text-first fitted by 2-8 px, late web font/picture flipped it and nothing re-laid on font arrival → fonts loadingdone re-pick + Fold XL whose text still scrolls steps to stacked NL/NM/NS; j7c hint = ResizeObserver per option list re-checks the hint. B BAR MET: 3 consecutive rounds kit-faces-opts 36/0 run in parallel with scans (load), opt-frame-scroll-scan Fold 41/0 ×3 + iPad 41/0 ×3, diff REGRESSIONS 0; touchdrag 8/0, one-opt-tap 30/0, notice-action 16/0. Quickcheck: open/old save/perf PASS (render 390/326, tab 752/884, buổi 1936/2272) but G4 button-crawl FAIL «Ô lưu · Lui close did not close» = PRE-EXISTING on LIVE 351122ba (same crawl on live.html, same single fault). ONLY=j7c «w1 LOST» also pre-existing on LIVE (3/4). Pair img/_review/kit-text-first/kk31-166b3000-pair-fold-ipad.png. SELSCENE-19 r19 jksize hunk: OK (sent). Option-card tap family: LIVE already has «tap anywhere on an option card chooses» (j79/jwhy, MAIN 136) and act zoom excludes .kopt; M3 evidence is 24/11 → to verify with an «art» spot added to kit-one-opt-tap.

## KK31 HANDOVER (22:0xZ) — rollover on context (START ~6 % + 25 %); coordinator MAIN CHÍNH 146 session_01V1ZZH1NSJHgk3C1emdgoXE
STATE
- review/kit-text-first-2 166b3000 on LIVE 351122ba = KIT READY (B bar met, see 21:5xZ line). Lands AFTER the flight via LC17. Waiting B kit rv verdict.
- review/kit-text-first 708056a9 = superseded (on 7603d689). review/kit-hand 9cffbf17 = kitHand + the 708056a9 delta, NOT yet the determinism fixes of 166b3000 and NOT rebased on LIVE 351122ba → successor: rebuild kit-hand on top of kit-text-first-2 (port jkhand.js + jksize kszHandFit3/hand hooks + jopic/jseal/jfx guards + tests kit-hand.js, kit-hand-perf.js, TAP2 scan mode), rerun kit-hand + kit-faces-opts ×3 under load + scans.
- SELSCENE-19 r19 jksize hunk: OK given; post-step order when merging: hint base pick → #2c → #2b → kszTextStep (KK31) → §56.25.
OPEN QUEUE (no build before MAIN 146 OK; plan sent 22:0xZ)
1. Option-card tap family (M2b/M3): LIVE already chooses on a tap anywhere on the card (j79 + jwhy capture handlers, MAIN 136) and kitActZoom skips .kopt. PLAN: test first — add «art» + «chip/odds» + «!»-adjacent spots to dev/test/kit-one-opt-tap.js and a real-tap pass over every PEND option frame (opt-frame-scroll-scan harness) Fold + iPad; kit fix only for a failing spot (one capture rule in j79 for every option-card selector incl. .khand cards).
2. KIT_REQUESTS K-KDTX-BAND (Fold chapter panel tabs dead under the head-art band): NOT the tap family — a layout overlap (kdtx text cap squeezes .kpmain while the sticky band keeps 1.5×--kah). PLAN: one kit rule for stacked head-art band + capped text (band row shrinks to the room left / .kpmain row = rest and scrolls inside, band never overlaps), scan = elementFromPoint hit-test of every interactive element in every kitPanel with headArt (Fold + iPad), before/after table; recheck with button-crawl --dev fold --start home.
3. kit-faces-opts «lines14 opts6» last option not fired after drag (SELSCENE-19: pre-existing on LIVE 1/1/0 of 3): check the test drag vs late re-pick (same class as «fest» pick and j7c «w1 LOST» — a re-pick during the wheel/drag). Candidate kit fix: kszLiveRepick3 also waits while a wheel/touch scroll of the list is in progress (extend §56.20 pointer guard to scroll).
4. Pre-existing LIVE fault: quickcheck G4 button-crawl «Ô lưu · Lui close did not close» (title sub-screen) — MAIN to assign.
5. KK30 leftovers: kitHand videos Fold+iPad (1× + 2×), deal long frames, kitPick (review/kit-ring5 f44c657d) wiring on person screens, «hand inside existing event frame» proposal.
TOOLS: scratch /home/user/wt/kk31-shots (probe.js: FACES/LINES/NO/WAIT/DPR/SKIPSHOT/INJ env, prints PRE/CUES; bar.sh = B bar runner; endrew.js reward-over-end probe; mood.js). Worktrees: /home/user/wt/kk31l (kit-text-first-2), /home/user/wt/kk31 (kit-hand), /home/user/wt/kk31tf (old). Lessons: quickcheck needs coop/ in the sparse checkout and must run ALONE (perf noise); max ~3 browsers at once (OOM).
- (21:45Z MAIN 146 → KK31, for KK32) APPROVED: (1) 166b3000 LOOKED OK → LC17 after-flight queue. (2) Tap family: GO test-only first (art/chip spots in kit-one-opt-tap.js, scan every option card Fold + iPad) and include K-KDTX-BAND (Fold «Mục tiêu/Thiên mệnh» tabs under head-art) in the same scan; kit fix only if a spot fails, plan to MAIN first. (3) G4 «Ô lưu · Lui close did not close» = kit item after (1)/(2), whole family (law 11).

## KK32 HANDOVER (25/11 ~22:5xZ) — session_01V1ZZH1vUNow8TB7hgyRmDQ; coordinator MAIN CHÍNH 146 session_01V1ZZH1NSJHgk3C1emdgoXE; rollover (START ~5 % + 25 %)
STATE
- review/kit-stage 889f03f7 (LIVE 5e013076 + review/kit-text-first-2 166b3000 + review/kit-hand 9cffbf17, conflicts: built files rebuilt; jksize/jopic = kit-text-first-2 rules + khand guard in kitOptTier; assemble adds jkhand.js, jkstage.js).
  - NEW dev/build/jkstage.js = KIT §102 kitStage (owner 25/11 ~21:50Z «không còn khung … chỉ là hình nhân vật xuất hiện cùng với những cái thông tin»): any #modal .dlg whose .opts became a hand → .dlg.kstage + #modal.kstg: transparent layer at kscnGeo, bg = band picture (.k3ev/.kdlgart img), speaker .kstg-sp (Q[0].who → kitFigOf, else .kszfig img; .kszfig hidden), her .kstg-me (kitFigOf(S)), .kph plaque, .kpmain speech box (between figures if ≥420 px, else under faces), hand absolute at foot; entrance after decode (kstgIn). Selectors need #modal×5 (jkhand sticky rule has #modal×4). Function names kstg* (kitStageFig is an OLD kit function — never reuse that name).
  - jkhand ✓/✕ (owner ~21:55Z): .khconf (.khok ✓ green, .khx ✕) on the lifted card top-right, KIT_HAND.confPx 44; body tap on lifted card = nothing; plate bottom moved above the buttons. The kit turns the ✓ glyph into kitMark span.kmk inside the button (fine).
  - CDN: img/_review/kit-stage/kk32-stage-confirm-c2a-pair-fold-ipad.png + -fold.mp4 + -ipad.mp4 (and older kk32-stage-c2a-*).
OPEN (successor KK33, order from MAIN 146; owner lands ~03:00Z, FULL videos by ~02:30Z)
1. Dialogue event on the same stage with THẺ GỖ TREO choices (kitPick, review/kit-ring5 f44c657d, KIT §98; ≤3 per page; fix ring4 FAILs in reports/ring-design-4.md: 3-line labels, ghost word under 2-line name) + the same ✓/✕ on the lifted plaque (jkpick tap(): today 2nd tap = choose). Tell NHV-BUILD session_01V1ZZH11unC8raKPPDux51Y branch+sha+API (it calls kitPick.open({..., onPick}) unchanged).
2. KIT.md §102 kitStage + §101 ✓/✕ text (canon overwrite of «tap again = choose»); kit page sample; update dev/test/kit-hand.js (tap2 → tap ✓; body tap again chooses nothing; ✕ puts back) + opt-frame-scroll-scan TAP2 mode (2nd tap → ✓); new kit-stage test (no panel box, figures in layer, faces clear of box/plate, hand in layer, entrance). Scan list of every hand frame: opt-frame-scroll-scan run started on 889f03f7-1 (outputs /home/user/wt/kk32-shots/scan-{fold,ipad}.{txt,json} if the container lives).
3. Then B (K-KDTX-BAND, repro: /home/user/wt/kk32-shots/band.js on LIVE: Fold goal/dh/tm tabs hit = band img, iPad 0), A, D, C as ordered.
TOOLS: /home/user/wt/kk32-shots/st.js (c2a stage probe: SZ, DPR, WAIT, TAP=1 lift shot, VID=1 warm-up → open → lift → body tap → ✓, logs CONF/AFTER; trim webm with ffmpeg last ~21 s). Worktrees /home/user/wt/kk32s (kit-stage), /home/user/wt/kk32b (LIVE, band probe).

## KK33 HANDOVER (25/11 ~23:40Z) — session_01V1ZZH31ewdNsRsk4VYngAQ; coordinator MAIN CHÍNH 146 session_01V1ZZH1NSJHgk3C1emdgoXE; rollover on context
STATE: review/kit-stage de4e9fa8 = KIT READY sent to MAIN (lá bài fixed + §102.2 dialogue + kitPick ✓/✕ + §102.1 bg slot). Commits: ad2e16ce (face = picture + short name, kitOptLead portraits, Fold foot/top band) · 86ccd0c0 (merge review/kit-ring5 f44c657d: jkpick.js; conflicts assemble/jfocus/jrail/KIT.md resolved by hand, built files rebuilt; kitPick ✓/✕; dialogue) · 73444d0b (KIT §101 overwrite, §102, §102.2, §98 status; foot band compact; kitEvBg; tests) · de4e9fa8 (talk state on Q item; ✓/✕ beside plaque; scan taps dialogues).
- Code: jkhand.js (kitHandShort, .khconf generic CSS, odds off face) · jkstage.js (KIT_STAGE.fold/bodyK/sayW/sayPer, kitEvBg/KIT_EVBG, kstgTalk*) · jopic.js (kitOptLead, .koplead) · jkpick.js (pick/conf/drop, ✓/✕).
- Tests: dev/test/kit-hand.js PASS, NEW dev/test/kit-stage.js PASS (Fold+iPad), opt-frame-scroll-scan TAP2(✓)+PICS Fold 42/0 iPad 42/0 (run ONE device per process, alone: under parallel load tt1/thbirthday/trungcuu/tt3 flake).
- Media: img/_review/kit-stage/kk33-de4e9fa8-* (4 pairs + 4 videos) and kk33-ad2e16ce-* (foot/top A/B sheet).
- Told: NHV-BUILD (kitPick API + ✓/✕), Foreman C (FROM KK33 line, publish img/selx-{tanphong,laphau,hoathan,thangtran}.webp).
OPEN for KK34:
1. MAIN's answers: which events are talks (mark Q item talk:1; candidates adStroll, rcvHelp, thbirthday, cmTt, cmTd, vnight), Fold foot vs top (default foot), art list (27 stand-in cards / 14 shared-picture frames, in the MAIN report 23:37Z).
2. Not done: kit page samples for §102/§102.2 (kitPgHand exists for §101); quickcheck.sh on de4e9fa8 (needs coop/ in sparse checkout, run ALONE); kit-pick.js (ring5 test) not rerun after ✓/✕ — its «tap again = choose» step must change to tap ✓ (same as kit-hand).
3. Then queue per KK31/KK32: B K-KDTX-BAND, A tap family, D G4 «Ô lưu · Lui», C repick flake.
TOOLS (this container): /home/user/wt/kk33-shots/st.js (EV / PEND / TALK / TAP / DPR / SETUP / JS env) · rec.js (MODE=cards|talk videos, prints START for ffmpeg trim) · worktree /home/user/wt/kk33 (kit-stage), /home/user/wt/kk33h (handover, sparse dev/handover).

## KK34 REPORT (26/11 ~00:25Z) — kit keeper, coordinator MAIN CHÍNH 148 session_01V1ZZH2sHQhqUaYCB6kPJxt
PRIORITY #1 CHECK: OD 25/11 ~21:50Z / ~21:55Z / ~22:00Z + 23/11 ~21:40Z (ladder words) + 19/11 ~01:48Z (meter) | main none | review/kit-stage de4e9fa8 (reused) | claims KK34 only.
LAND READY: review/kit-stage 979d5ed7 (base de4e9fa8).
- Talks (§102.2): KIT_STAGE.talkIds = adStroll, rcvHelp, thbirthday, cmTt, cmTd, vnight (Q pid); the «no odds on any card ⇒ dialogue» auto rule removed (with certain cards losing their word it would turn most frames into talks). All six fire as dialogue → thẻ gỗ → ✓ on Fold + iPad (video).
- Odds family (MAIN 147/148): certain cards show NO odds word — ONE source jk2b kitOptOdds, KIT_ODDS_SURE=false (true = old top-rung meter; overwrites the 19/11 MAIN reading «sure = top rung», flag to sếp if she objects). Plaque line keeps the word only on a real roll. Before/after (39 PEND frames, Fold): 72 sure-meter «Rất vững» cards → none; rolled cards unchanged (5 diffs = random stats). Table below.
  CONTENT FAMILY NOT FIXABLE IN THE KIT: options that roll inside their closure without declaring odds (e.g. jkc «Quỳ xin cha cho đi tuyển tú»: roll() inside kcO, card had «Rất vững», now no word, can still fail). Needs a content lane: declare the odds (`p` / §25) on every hidden-roll option (kcO family first).
- iPad: story box ends above the lifted plate, shows its last lines. Duplicate «Hoàng thượng»: speaker's own face no longer repeated in the faces row (.kstg-dup). Fold A plate: covers only her skirt (below waist), no face / upper body — left as is.
- Kit page §102 samples (kitPgHand(4) / kitPgHand(4,1)). kit-pick.js step «tap again» → body tap = nothing, ✕ puts back, ✓ chooses.
- Tests on 979d5ed7: kit-stage.js PASS, kit-hand.js PASS, kit-pick.js ALL PASS (Fold + iPad).
- Quickcheck on de4e9fa8 (alone, 789 s): FAIL — G3 kit-conform (frame-size S/M/L/XL checks predate §102 stage), press-keep 8 + q-softlock 2 (expect one tap = choose; now lift + ✓ → tap family item A: update those gates to tap ✓), G4 Ô lưu · Lui (item D), time-spill guard «greeting walk 1+1» (not stage; check live). Not rerun on 979d5ed7.
- Media (CDN img/_review/kit-stage/): kk34-979d5ed7-full-fold-755x1000.mp4, kk34-979d5ed7-full-ipad-1180x820.mp4 (c2a cards: lift → ✕ → lift → body tap → ✓; then the six talks), kk34-979d5ed7-c2a-lift-{fold,ipad}.png, kk34-979d5ed7-rcvHelp-talk-ipad.png.
- Seen in the videos: after vnight's choice «Đêm thị tẩm» opens in the OLD panel (not a hand → no stage; its option cards carry person pictures) — family question for MAIN; vnight bg = brown for ~0.5 s before its picture loads.
- Extra talk candidates (NOT wired, MAIN decides): rcvAsk, rcvJudge (same receiver family as rcvHelp), ch1, ch2, giu, shop.
- ART LIST (from MAIN, kept): 27 cards on the shared stand-in, 14 frames repeat one picture, thbirthday banquet bg busy on iPad.
OPEN for successor: tap family (press-keep / q-softlock / button-crawl gates → tap ✓), K-KDTX-BAND, G4 «Ô lưu · Lui», repick flake; quickcheck on 979d5ed7.
TOOLS: /home/user/wt/kk34-shots/st.js (EV=pids TAP=1 TALK=n), rec.js (SZ, TALKS → one-take webm + MARKS), oddscan.js (SRC OUT, all PEND odds words). Worktrees /home/user/wt/kk34 (kit-stage), /home/user/wt/kk34h (handover reports).

### KK34 odds before/after (changed cards)
| event pid | card | before (de4e9fa8) | after (KK34) |
|---|---|---|---|
| tt1 | Tâu xin cho người của cha | Rất vững (sure meter) | — (no odds word) |
| tt1 | Viện cớ thoái thác | Rất vững (sure meter) | — (no odds word) |
| tt2 | Bỏ bạc lo lót triều thần | Rất vững (sure meter) | — (no odds word) |
| tt2 | Đứng ngoài, giữ mình | Rất vững (sure meter) | — (no odds word) |
| tt3 | Mật tâu Hoàng thượng | Rất vững (sure meter) | — (no odds word) |
| nc1 | Trung với cố quốc | Rất vững (sure meter) | — (no odds word) |
| nc1 | Dâng thư lên Hoàng thượng | Rất vững (sure meter) | — (no odds word) |
| td1 | Giấu ông ở Tân Giả Khố | Rất vững (sure meter) | — (no odds word) |
| td1 | Mặc kệ | Rất vững (sure meter) | — (no odds word) |
| ch1 | Vâng mệnh cô mẫu | Rất vững (sure meter) | — (no odds word) |
| ch1 | Thoái thác | Rất vững (sure meter) | — (no odds word) |
| ch2 | Từ chối, tự gây thế lực | Rất vững (sure meter) | — (no odds word) |
| phoenix | Khiêm nhường chối từ | Rất vững (sure meter) | — (no odds word) |
| phoenix | Để lời đồn lan xa | Rất vững (sure meter) | — (no odds word) |
| phoenix | Bịt miệng thầy tướng | Rất vững (sure meter) | — (no odds word) |
| doanngo | Gói bánh ú dâng Thái hậu | Rất vững (sure meter) | — (no odds word) |
| doanngo | Đeo túi ngải cho các con | Rất vững (sure meter) | — (no odds word) |
| trungcuu | Theo ngài lên núi | Rất vững (sure meter) | — (no odds word) |
| trungcuu | Dâng rượu cúc chúc thọ Thái hậu | Rất vững (sure meter) | — (no odds word) |
| vulan | Thả đèn cầu siêu | Rất vững (sure meter) | — (no odds word) |
| vulan | Cúng các phi tần chết oan | Rất vững (sure meter) | — (no odds word) |
| vulan | Mượn lễ dò hỏi cung nhân | Rất vững (sure meter) | — (no odds word) |
| dongchi | Xin theo hầu lễ tế | Rất vững (sure meter) | — (no odds word) |
| dongchi | Nấu chè mừng cả cung | Rất vững (sure meter) | — (no odds word) |
| dongchi | Ở cung giữ ấm | Rất vững (sure meter) | — (no odds word) |
| thbirthday | Dâng ngọc Như Ý | Rất vững (sure meter) | — (no odds word) |
| thbirthday | Lễ mọn cho phải phép | Rất vững (sure meter) | — (no odds word) |
| j7c | Chỉ thẳng Tần Dư Nguyệt Thiền trước mặt  | Rất vững (sure meter) | — (no odds word) |
| j7c | Nhờ Thúy Lũ lặng lẽ hỏi thợ kim hoàn xem | Rất vững (sure meter) | — (no odds word) |
| j7c | Mời Tần Dư Nguyệt Thiền một chén trà, nó | Rất vững (sure meter) | — (no odds word) |
| j7c | Bảo một vị Đáp ứng xin đổi trâm khác, để | Rất vững (sure meter) | — (no odds word) |
| ksp | Tắm gội chờ giá | Rất vững (sure meter) | — (no odds word) |
| ksp | Tiến cử Thúy Lũ hầu thay | Rất vững (sure meter) | — (no odds word) |
| ksp | Cáo bệnh | Rất vững (sure meter) | — (no odds word) |
| prep | Tắm cánh hoa, xông hương | Rất vững (sure meter) | — (no odds word) |
| prep | Điểm trang lộng lẫy | Rất vững (sure meter) | — (no odds word) |
| prep | Đeo trang sức đẹp nhất | Rất vững (sure meter) | — (no odds word) |
| prep | Tập trước Vũ | Vững | Rất vững |
| prep | Để mộc, nghỉ ngơi | Rất vững (sure meter) | — (no odds word) |
| night1 | Bàn thơ văn, cầm kỳ | Tùy duyên | Có cơ |
| night2 | Xin tha cho cung nữ bị phạt | Rất vững (sure meter) | — (no odds word) |
| night2 | Im lặng, tựa vai ngài | Rất vững (sure meter) | — (no odds word) |
| giu | Cúi đầu tuân lệnh | Rất vững (sure meter) | — (no odds word) |
| ge1 | Ở lại, giữ trọn phận mình | Rất vững (sure meter) | — (no odds word) |
| ge1 | Ở lại, nắm lấy quyền bính | Rất vững (sure meter) | — (no odds word) |
| ge1 | Rời khỏi cung cấm | Rất vững (sure meter) | — (no odds word) |
| ge1 | Theo người ấy đi | Rất vững (sure meter) | — (no odds word) |
| cyrep | Báo đúng ngày | Rất vững (sure meter) | — (no odds word) |
| cyrep | Báo lùi vài hôm | Có cơ | Tùy duyên |
| cyrep | Báo sớm, nói đã sạch kỳ | Rất vững (sure meter) | — (no odds word) |
| cyrep | Giấu, không báo | Rất vững (sure meter) | — (no odds word) |
| adStroll | Đánh đàn chờ ngự giá | Tùy duyên | Có cơ |
| adStroll | Ra vấn an | Rất vững (sure meter) | — (no odds word) |
| adStroll | Lánh đi lối khác | Rất vững (sure meter) | — (no odds word) |
| cmTt | Làm theo lời cha | Rất vững (sure meter) | — (no odds word) |
| cmTt | Dặn Thúy Lũ chỉ viết chuyện vặt | Rất vững (sure meter) | — (no odds word) |
| cmLand | Để Cung Chính ti tra hỏi | Rất vững (sure meter) | — (no odds word) |
| cmLand | Đứng ra bảo lãnh cho nàng ta | Rất vững (sure meter) | — (no odds word) |
| cmTd | Xin bà về hầu | Rất vững (sure meter) | — (no odds word) |
| cmTd | Làm như không quen | Rất vững (sure meter) | — (no odds word) |
| cmSec | Trả nợ thay (30 lượng) | Rất vững (sure meter) | — (no odds word) |
| cmSec | Mặc kệ | Rất vững (sure meter) | — (no odds word) |
| vnight | Bàn thơ văn, cầm kỳ | Tùy duyên | Có cơ |
| nfsum | Tắm gội chờ giá | Rất vững (sure meter) | — (no odds word) |
| rcvHelp | Giúp hết lòng | Rất vững (sure meter) | — (no odds word) |
| rcvHelp | Giúp qua loa | Rất vững (sure meter) | — (no odds word) |
| rcvHelp | Từ chối | Rất vững (sure meter) | — (no odds word) |
| rcvHelp | Mách lẻo | Rất vững (sure meter) | — (no odds word) |
| pmLad | Đàn | Rất vững (sure meter) | — (no odds word) |
| pmLad | Cờ | Rất vững (sure meter) | — (no odds word) |
| pmLad | Vẽ | Rất vững (sure meter) | — (no odds word) |
| pmLad | Múa | Rất vững (sure meter) | — (no odds word) |
| pmLad | Thơ | Rất vững (sure meter) | — (no odds word) |
| pmLad | Điều hương | Rất vững (sure meter) | — (no odds word) |
| pmLad | Nấu ăn | Rất vững (sure meter) | — (no odds word) |
| pmLad | Thêu | Rất vững (sure meter) | — (no odds word) |
| pmLad | Đầu hồ | Rất vững (sure meter) | — (no odds word) |

77 cards changed in 39 frames shown

## KK35 REPORT + HANDOVER (26/11 ~01:55Z) — kit keeper, coordinator MAIN CHÍNH 149 session_01V1ZZH2zAQCCznbuVpXJEf9
START_CTX ~3 % (estimate; context_usage reads 0). Rolled at ~28 % (START + 25 %).
PRIORITY #1 CHECK: OD 25/11 ~21:50Z/~21:55Z/~22:00Z/~23:40Z | main none | review/kit-stage (mine), review/art-event b498c77e (merged), review/place-rules (K-MAP-BANNER ask), review/button-crawl-fix-10 (K-KDTX-BAND), review/nhv-areas (area test 6) | claims KK35.
LAND READY sent: review/kit-stage 893613ee (quickcheck: all gates PASS; look-dedupe red only under my concurrent probes, PASS alone on 893613ee + LIVE). Videos img/_review/kit-stage/kk35-893613ee-full-{fold,ipad}.mp4 (LOOKED; 14 real taps, 0 dead, 0 errors).
Follow-up on top (pushed): 3c51e43d (K-MAP-BANNER §103 kitMapBanner + test; K-KDTX-BAND ×2 jkslide; stage .k3mpic as scene) + bb85ae17 (merge review/art-event b498c77e, reviewed + pictures looked). Quickcheck on bb85ae17 was running at handover (log /home/user/wt/kk35-shots/qc-bb85.log).
Queue status:
1 LAND GATES — DONE (realtap rt.choose ONE helper; press-keep / q-softlock use it; kit-conform + dialog-fixed know §102; reused-dialog cleanup; «Ô lưu · Lui» = pre-existing on LIVE, harness NLP cause, crawler fixed).
2 kitPick fitNames — DONE in kit (4th line + one taller plaque height; re-fit when a later name pass rewrites a name; kit-pick.js «longnames»). NHV-BUILD told (merge 3aacdd30+ / jkpick.js). Hand card faces: 3-line spill → .khn1 → .khn2 (4 lines).
3 option-card rule — DONE §6.2e kitOptNameFit (list cards: short phrase never breaks; small thumb → name under; one size per list). Fold «Tin báo» is a stage hand now anyway. OPEN: the NAMES scan before/after table (opt-frame-scroll-scan NAMES=1 [NOHAND=1] SZ=[[755,1000]] on LIVE vs branch) was stopped for CPU — run it, one device per process, never beside a quickcheck.
4 vnight → «Đêm thị tẩm» — DONE: person picker = EVERY card a person; mixed frames stay a hand (person card shows her portrait). OPEN: whole-family scan of follow-up screens (scan PEND frames with ≥1 face card: before non-hand, after hand).
5 K-KDTX-BAND ×2 — DONE (jkslide scope; «Danh hiệu»/«Thiên mệnh» tabs tappable Fold+iPad). Remove the button-crawl-known.txt line on button-crawl-fix-10 when it lands.
6 K-MAP-BANNER — KIT READY §103 (PLACE-RULES to wire: replace kitNotice «plban» + .fest chip by kitMapBanner.set({id:'plban',line,home:plHomeK()})).
7 ART-EVENT — merged (bb85ae17).
8 extra talk candidates — NOT started (MAIN decides pids).
QUESTION sent to MAIN: «Mục tiêu chương» first tab (3 «Đi làm» cards) is a stage + hand, its other tabs are a panel — keep or exclude info panels with shortcut cards.
Lessons: never run scans / probes beside a quickcheck (load flakes: dialog-fixed hand-off-screen, look-dedupe). Recorder: open «Tin báo» before a night (the day turn-over holds the notice).
TOOLS (session scratch, may be gone): /home/user/wt/kk35-shots/rec.js (video: Tin báo → c2a → vnight → night2), ev.js (EV=pid PP=json one frame), goal2.js (goal panel tabs hit test), map2.js, tinbao*.js. Worktrees /home/user/wt/kk35 (review/kit-stage), /home/user/wt/kk35b (side build), /home/user/wt/kk35h (this report).
### KK35 HANDOVER ADD-ON (26/11 ~02:05Z, after reading 16 queued notes) — coordinator is now MAIN 151 session_01V1ZZH32xLDu8LN72LfSaVu
CORRECTION: look-dedupe is NOT only my CPU load — NHV-BUILD bisected it: kit-stage alone 1/4 FAIL, LIVE 0/10 («real tap on the mood seal» finds it gone, a modal with Q title «undefined» opens). Land gate = look-dedupe ×10 runs, 0 FAIL.
MAIN 151 LOOK of 893613ee: NOT PASS. Successor queue (in order; each = whole family, law 11):
 a) stage with no scene picture shows a flat dark-brown colour («Tin báo» Fold) → ALWAYS a painted bg = the place she is in (room / place art); scan every stage caller. (bb85ae17 already makes a person-less frame's .k3mpic the scene — check what is still flat.)
 b) grey silhouettes: unknown-person hand card («Thì thầm nói xấu … ???») and the Fold opening frame's faded grey figure while loading → painted veiled/back-view portrait for an unknown person; a stage / dialogue / person-card figure appears only when its painting is decoded (throttled-network test). (MAIN 150 figure-wait family.)
 c) look-dedupe flake (above).
 d) «Mục tiêu chương» etc.: info panels with shortcut cards are NOT a stage (MAIN 151 accepted): exclude them in kitHandWants/kstgWants (one panel = one look).
 e) merge review/art-event fb4a63ac (ART-EVENT2, LOOK PASS: KIT_EVBG_PID adStroll/cmTt/rcvHelp/cmLand/cmTd calm bgs) — bb85ae17 has only b498c77e.
 f) NHV Fold PLAQUE-OFFSTAGE ×2 (6-plaque band beside a person at x≈.2; names now 4 lines): kitPick must fit every plaque count (2 rows / smaller tier); also ✓/✕ of a left-column plaque over the right-column name. Repro KSEED=23 SAVE=<mklife> node dev/test/nhv/area-test.js on review/nhv-areas. Send sha to NHV-BUILD session_01V1ZZH11unC8raKPPDux51Y + MAIN.
 g) vlnvp dialogue frame shows NO cards/plaques after 3 s (MAIN 149).
 h) perf tab 679 vs 512 ms on NHV merge (my QC 893613ee: 619 vs 545, passed) — check --runs 5 alone.
 i) then TAINGHE-INFO r5 (dev/handover/reports/tainghe-info.md HANDOVER section).
Then fix sha + NEW full videos (new file names) to MAIN 151. bb85ae17 quickcheck result: /home/user/wt/kk35-shots/qc-bb85.log (if the container survives).
## KK36 REPORT + HANDOVER (26/11 ~03:00Z) — kit keeper, coordinator MAIN CHÍNH 151 session_01V1ZZH32xLDu8LN72LfSaVu
START_CTX ~4 % (estimate; context_usage reads 0). Rolling at ~27 % (START + 25 % near).
PRIORITY #1 CHECK: OD 24/11 ~07:27Z (VEIL-1: §59.1 grey stand-in until decoded for a SETTLED view — kept; the stage entrance is not a settled view) + 25/11 MAIN 151 look | main none | review/kit-stage (mine), review/art-event fb4a63ac (merged), review/nhv-areas 100dc3dc (area test) | claims KK36.
Branch review/kit-stage (commits 51f75ae2 → b9385962 → 82cbe092 → docs/tests top; see the report line to MAIN for the final sha).
DONE (queue a–g):
(a) stage bg never flat: no event picture → the painting of the place she is in (kstgPlacePic = home #scimg picture); the place painting also lies UNDER the event picture while it loads («Tin báo» Fold flat brown = info-tin.webp still loading); kitScene.open with no bg uses it too. Scan STG=1 (opt-frame-scroll-scan, 39 PEND stage frames Fold): bg NONE 0.
(b) stage figures: shown only once decoded (no 700 ms cap; failed = hidden); grey stand-in never on the stage / a hand card. Throttled test (tb.js SLOW=1, vlnvp Fold): bb85ae17 = flat brown + both figures visible half-painted at 1.2 s; new = place painting + figures hidden until decoded. Unknown-person card: KIT_VEILPOR slot (img/kit/veil-por-f|m|k.webp) — ART REQUEST K-VEIL-POR (KIT_REQUESTS.md) for Foreman C; until then act picture / stand-in.
(c) look-dedupe flake: cause = portrait preload onload → kitRenderSoon(250) → render() landing ~1 s after the harness setup, rebuilding the home row (seal handle «gone»). Harness waits for a quiet page + re-finds the seal (≤3, only while nothing opened). Gate: ×10 under 2× parallel load = 10/10 PASS (before: 2/8 FAIL).
(d) info panels (kitPanel kind info/rule/help: «Mục tiêu chương» «Đi làm», Danh hiệu, Thiên mệnh, chapter) are never a hand / stage (KIT_HAND.notKinds).
(e) review/art-event fb4a63ac merged.
(f) kitPick: no tier fits → pages «Việc · 1/2» (also > KIT_PLAQUE.max acts); 2-column ✓/✕ on its own column's outer side. kit-pick.js «sixlong»: base FAIL (Fold ✓ over next column ×3, iPad 1 plaque off) → PASS. NHV area test on a local merge (nhv-areas 100dc3dc + kit-stage b9385962): FAIL 58/60 (PLAQUE-OFFSTAGE ngudao + vuonhoa) → PASS 55/55.
(g) vlnvp: cards DO show (normal + throttled); the real fault = the speaker slot showed HER twice (Q.who = face object pEunCourt). kitWhoPerson (jksize) resolves a face object to the real person (court / consort / servant by name) → eunuch figure + own tag, in kszFigHtml (all frames) and the stage. Scan: frames where speaker == her: 13 before (see table below for after).
ART GAP (not kit): veil grade pictures missing for t1-g2, t3-g2, t4…t8 (vlnvp Thường = Trân phẩm same picture) — listed in KIT_REQUESTS.md.
(g+) same family: 12 story frames with no other speaker (tt1–3, td1, nc1, ge1, prep, phoenix, thInv, vlcraft, vlget, vlout) had HER on both sides → only her figure (STG scan speaker==her: 13 → 0 expected after 006579ae; 12 after 82cbe092).
STG table (Fold, 39 stage frames): bg NONE 0 → 0 · grey cards 0 → 0 · grey figures 0 → 0 · half-decoded visible 0 → 0 at normal speed (throttled: bb85ae17 visible half-painted, now hidden) · speaker == her 13 → 0.
Tests on 006579ae: kit-stage PASS, kit-hand PASS, kit-pick PASS (sixlong new), look-dedupe ×10 PASS, opt-frame-scroll-scan STG 42 frames FAIL 0, NHV area test (local merge) PASS 55/55.
QUICKCHECK (alone, --runs 5) 006579ae: PASS · core gates PASS · perf median new/live render 268/276, tab 647/639 (h: fine), buổi 3940/3053, tasks>200ms 29/31.
### KK36 HANDOVER — successor queue (in order)
1. FULL videos Fold 755x1000 + iPad 1180x820 of 006579ae, NEW names (e.g. kk37-006579ae-full-{fold,ipad}.mp4) → img/_review/kit-stage/ (python3 dev/site/cdn_sync.py img/_review/kit-stage/<file>); LOOK at frames (Tin báo, c2a, vlnvp eunuch speaker, a story frame tt1, a talk, NHV plaques); send to MAIN 151. KK35 recorder rec.js is gone — rebuild from dev/test/nhv/record.js or kk36 tools below.
2. (i) TAINGHE-INFO r5 (dev/handover/reports/tainghe-info.md HANDOVER) + MAIN 151 adds: r4 kitHitGrow DEAD sub-tab tap on Fold after an info popup (popup body in #mb covers «Cầm kỳ thi họa» / «Vũ · Y · Nữ công» / «Tác phẩm»; LC19 review/lc19-a14-tainghe4 bf321724 a14 FAIL 3/4; repro node dev/test/tainghe-info.js index.html <out> Fold; gate tainghe-info ×5 Fold+iPad 0 FAIL); «Năm bậc» card: «Ghi chú» section not rendered + current bậc name printed after the next bậc number (whole family of level cards).
3. MAIN 151 add (M5b on LIVE 5e013076): picker cards («Sai … đi dò la», «Đáp ứng · Phó Nhã Ninh») CLIPPED at the dialog bottom, centre tap hits the portrait → no action; whole picker family: every card fully visible (scroll or fit), whole card tappable, Fold+iPad. Evidence dev/handover/robot/flight-M5/findings-m5b.md.
4. K-VEIL-POR: when Foreman C's img/kit/veil-por-f|m|k.webp land, check a «… ???» hand card shows it (nothing to wire).
5. OPEN from KK35: NAMES scan before/after (opt-frame-scroll-scan NAMES=1, one device per process, never beside a quickcheck); vnight follow-up PEND frame family scan.
TOOLS (scratch, may vanish): /home/user/wt/kk36/t/tb.js (EV=<pid> or Tin báo; SLOW=1 throttled; prints stage bg / figures / cards at 0.3/1.2/4.5 s + shots), ld.sh (look-dedupe loop), ldprobe2.js (render/kitRenderSoon tracer), kf.js. Worktrees /home/user/wt/ks (review/kit-stage), kk36n (nhv-areas local merge, NOT pushed), kk36h (this report).
Lesson: the quickcheck builds IN the worktree when testing HEAD — never edit sources while it runs.
## KK37 REPORT (26/11 ~04:30Z) — kit keeper, coordinator MAIN CHÍNH 152 session_01V1ZZH3STSxwbKbhhjWkVhD; session_01V1ZZH16x8rVajpgG2KwrB5, depth 1
START_CTX ~3 % (estimate; context_usage reads 0). Roll line ~28 %.
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims KK37 (MAIN line) | main 0 | review/kit-stage 006579ae (mine) | archive 0.
1. FULL VIDEOS of 006579ae (LOOKED, tiled sheets fps 1/3 + full frames): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage/kk37-006579ae-full-fold.mp4 (96 s) + …/kk37-006579ae-full-ipad.mp4 (99 s). Real taps; 0 page errors both. Marks (Fold s / iPad s): opening chest played through 28/30 · Tin báo 36/38 (place painting + figure, 5 notices, 2 cards) · home figure → NHV plaques 42/44, real ✕ closes · c2a cards + lift 49/51 · c2a talk lines → thẻ gỗ → lift → ✓ 57–77/60–79 · vlnvp 83/86 (speaker = Thái giám Tiểu Trung Tử eunuch figure + her; place painting) · tt1 92/95 (her figure only).
Seen: vlnvp card faces Thường/Tinh phẩm/Trân phẩm are near-blank veil pictures = the known ART GAP (KIT_REQUESTS veil grades), not kit. Recorder: /home/user/wt/kk37-t/rec.js (scratch).
2. NHV LESSON — .ksil / §59.1 grey stand-in WHOLE-FAMILY SCAN (kit-stage 006579ae; tool /home/user/wt/kk37-t/grey-scan.js: every bottom tab × buổi + person popups + buổi queue frames; each visible grey picture classed KNOWN (card names a person kitIsKnown) / STRANGER / LOADING):
| device | buổi | grey pictures | KNOWN (bug) | STRANGER | LOADING | where |
|---|---|---|---|---|---|---|
| Fold 755x1000 | 4 | 68 | 0 | 68 | 0 | Hậu cung list (kpor, incl. Hoàng hậu by name before her face is seen), Cung nhân «Người lạ», Sổ sự «Một vị …» |
| iPad 1180x820 | 8 | 101 | 0 | 101 | 0 | same |
Stage (home + 39 PEND stage frames, KK36 STG scan): 0 grey. Code callers of the stand-in: j59 (room stage), j60 (scene strangers + «Người lạ»), j61 (kitStrangerOf / portrait), j90 kitFigOf (unknown → unknown-fig), jht SIL, jhaohuu who(), j87 week book, j79.
LAW-16 CONFLICT (not changed in the kit): the grey figure for a STRANGER is the OWNER's rule — OD 17/11 ~20:35Z «hiện tại cái bóng xám là game mình đã lên rồi, chưa từng gặp mặt thì game mình đang hiện là người lạ» → «REUSE the existing "Người lạ" silhouette + label»; OD 18/11 ~06:20Z face-reveal animation grey → real; OD 24/11 ~07:27Z VEIL-1 grey stand-in while loading in a settled view. NHV r8 (c685b0d8, stranger = own painting softened) and K-VEIL-POR (veiled painted portrait) both replace that owner look → needs HER word (law 16) before the kit changes it everywhere. A grey figure for a person she KNOWS = 0 found (that would be the bug family).
