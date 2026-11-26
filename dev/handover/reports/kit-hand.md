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
