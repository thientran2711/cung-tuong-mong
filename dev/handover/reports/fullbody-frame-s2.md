# fullbody-frame step 2 — every frame with a full-body person (worker session_01UV1SzhJ3JicrwJmcbMVHSA, depth 5)
PRIORITY #1 CHECK: OD 18/11 ~06:45Z..~07:50Z (verbatim in OWNER_DECISIONS) | main jsl.js kitBookFigClamp / BAL.bookFrame.cRef (reused, r5) | review/* review/fullbody-frame 4481bf78 (base) | claims fullbody-frame step 1 (done)

## What (review/fullbody-frame-s2 @ 3849dddf, = r5 + merge origin/main 9c581406)
Layouts unchanged. Only the figure, in the shared kit parts: new `kitFullFigX(b,iw,cw)` (jkit.js, KIT 56.4) = the ONE horizontal place (painted core centred, painted left edge never left of the column, wide robe spreads right under the text). ONE body skull-top -> feet, same for everybody of a frame, men NOT x1.07, kids by KIT_FIG.kid(age). Room reckoned for the TALLEST crown (BAL.bookFrame.cRef .072) + a worn-title plate, never for the person shown (taller crown rises into the tag space, tag z-index 2). Column clips removed (overflow visible), text z-index 1 on top.
Places (scan of every full-body figure place): (1) centre pop-ups kszf = news/notice/info/rule/result/choice/night/intel/reward, M/L/XL (jksize kszFigFit + kszFeetFit; same shrink for all people of a frame); (2) shop / pet care / several-person stages = jk4 kitDpFit (no knee crop, no zoom-and-cut at floor, one person never shrunk for width); (3) coach + tips kitPersonDlgFit (jpdlg); (4) identity card kpIdLay (j79; per-screen cap KPID_WR for the widest robe deleted); (5) Tuần lục / Mệnh truyện / Sổ luân hồi person pages = r5 (unchanged, scan ALL OK). Not frames (left): painted-scene stages (j59) and picture-band stages (kitEsOvFit): figures stand ON a picture, not in a person frame; book plates .kbp-fig.
KIT.md 56.4 added, old rules overwritten in place (§28.11a ID card, 32.2 crop/zoom, 50.2 coach, 84 (6)). Test: dev/test/fullbody-frames-scan.js.

## Scan (before = main b2a9d349 build | after), skull>feet px / cut px / text lines over figure — full table: dev/handover/reports/fullbody-frame-s2-table.txt
Spread skull>feet between 5 people (c03 t6, Hoang hau, widest robe m48, man, SELF) per kind: BEFORE Fold news 10.5 % notice 6.4 % choice 6.5 % coach 6.3 % ID card 6.3 %; AFTER 0.00 % / 0.00 / 0.00 / 0.01 / 0.11 % (iPad same: 0.00 .. 0.05 %).
Cut BEFORE (widest robe m48): news 40, notice 84, choice 130, coach 170 px (Fold); c03 t6 choice 38 / coach 101; Hoang hau 0. AFTER: cut 0 everywhere, squeeze 1.000, 0 clip/mask on any figure. Bodies after: Fold news/notice XL 414, choice L 370, coach 351, ID card 351, shop 406; iPad news/notice 414, choice 370, coach 350, ID card 688, shop 406.
Text lines over a figure (robe under text, text drawn on top): widest robe 7-8 lines, c03 t6 7, others 0-1.

## Shots (CDN, left BEFORE main | right AFTER, full screen 2x): https://ctm-img.victoria-tntt.workers.dev/img/_review/fullbody-frame-s2/<755x1000|1180x820>-<news|choice|pdlg|idcard>-<hoang-hau|widest-robe>-before-after.jpg
Caveat: file names ending -widest-robe show the real m48 art; the Hoang hau name tag is just the sample person. 755x1000-news-widest-robe-after-only.png = clean after shot. LOOKED: Fold news/choice/coach/ID card + iPad ID card (3x on the widest robe). Shop shot not taken (scan only: cut 0, body 406). Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review fullbody-frame-s2
Quickcheck: dev/test/quickcheck.sh does not exist on this branch; ran build_site.sh (media-check + img-allowlist OK), fullbody-frames-scan ALL OK, fullbody-frame-scan (book r5) ALL OK, no page errors except the known harness "Unexpected token '<'". G3 / place:vuon / contest flakes not run.
Known: frames at XL on Fold are scaled by the frame cap (shrink .86) the same for everybody; 2-person stages still scale to the column width (so they never overlap) — the only per-frame exception.
~85% xong / ~75% chơi được (owner shot check + go-live of c03 a18 pending).

## r2 (ROOT-49 request): owner-format shots + real quickcheck
QUICKCHECK PASS 3849dddf vs live 9c581406 (dev/tools/quickcheck.sh): core gates PASS, time-spill PASS, open 1403 ms, old save ok, perf new/live render 152/170, tab 464/433, buoi 1078/932, long tasks 16/16. (The earlier "quickcheck missing" note was wrong.)
AFTER-ONLY pairs, Fold 755x1000@2 left | iPad 1180x820@2 right, widest-robe art (fig-maid-m48-t8-a51), LOOKED: https://ctm-img.victoria-tntt.workers.dev/img/_review/fullbody-frame-s2/{news,choice,pdlg,idcard,shop,event}-fold-ipad-after.jpg ; event = real PEND event "ch1" (Thai hau goi ta vao Duc Tho cung, 2 real options). Note: on the event the tag "Thai hau" sits over the tall crown (tag above, crown behind).

## r3 (ROOT-50): scroll-cue scan of EVERY dialog — dev/test/scroll-cue-scan.js (94 dialogs per device: all 221 PEND events that open, long news/notice/result/night/info/rule panels, shop, tour, tip, intel, evidence, contest round) @ b0155afe
Fix (jksize.js kit only): no cue on a container holding the figure column; short scrollers (<260 px) get an own 16 px strip BELOW them; tall scrollers keep the kit fade (solid lower part, hidden text not overlapped).
```
BEFORE (main) FAIL 4: shop + evidence: #mb.body fade ON FIGURE (Fold + iPad); shop .kshg h159 fade OVERLAPS TEXT (4 lines)
BEFORE 1180x820 #mb.body h>=260 fade ON ON FIGURE                                                 2 shop,evidence
BEFORE 1180x820 #mb.body h>=260 fade ON                                                           1 rule-long
BEFORE 1180x820 #mb.body h>=260 fade off                                                          2 PEND:plantpick,PEND:tsgiftpick
BEFORE 1180x820 .k3right h>=260 fade ON                                                           21 PEND:td1,PEND:phoenix,PEND:doanngo
BEFORE 1180x820 .k3right h>=260 fade off                                                          5 PEND:night2,PEND:thBribe,PEND:adStroll
BEFORE 1180x820 .kshg h<260 fade ON OVERLAPS TEXT                                                 1 shop
BEFORE 1180x820 .opts h>=260 fade ON                                                              3 PEND:evpick,PEND:itarget,PEND:plantsv
BEFORE 755x1000 #mb.body h>=260 fade ON ON FIGURE                                                 2 shop,evidence
BEFORE 755x1000 #mb.body h>=260 fade ON                                                           1 rule-long
BEFORE 755x1000 #mb.body h>=260 fade off                                                          1 PEND:plantpick
BEFORE 755x1000 .k3right h>=260 fade ON                                                           26 PEND:td1,PEND:phoenix,PEND:doanngo
BEFORE 755x1000 .kshg h<260 fade ON OVERLAPS TEXT                                                 1 shop
BEFORE 755x1000 .opts h>=260 fade ON                                                              3 PEND:evpick,PEND:itarget,PEND:plantsv
AFTER ALL OK:
AFTER  1180x820 #mb.body h<260 strip off                                                          1 intel
AFTER  1180x820 #mb.body h>=260 fade ON                                                           1 rule-long
AFTER  1180x820 #mb.body h>=260 strip off                                                         1 evidence
AFTER  1180x820 .k3right h>=260 fade ON                                                           24 PEND:td1,PEND:phoenix,PEND:doanngo
AFTER  1180x820 .k3right h>=260 fade off                                                          2 PEND:adStroll,PEND:cmBrawl
AFTER  1180x820 .kshg h<260 strip ON                                                              1 shop
AFTER  1180x820 .opts h>=260 fade ON                                                              3 PEND:evpick,PEND:itarget,PEND:plantsv
AFTER  755x1000 #mb.body h<260 strip off                                                          1 intel
AFTER  755x1000 #mb.body h>=260 fade ON                                                           1 rule-long
AFTER  755x1000 #mb.body h>=260 strip off                                                         1 evidence
AFTER  755x1000 .k3right h>=260 fade ON                                                           27 PEND:td1,PEND:phoenix,PEND:doanngo
AFTER  755x1000 .kshg h<260 strip ON                                                              1 shop
AFTER  755x1000 .opts h>=260 fade ON                                                              3 PEND:evpick,PEND:itarget,PEND:plantsv
```
Dialogs touched visually: shop (own strip, figure column clean) — shots already in img/_review/fullbody-frame-s2/shop-fold-ipad-after.jpg; evidence: cue gone from #mb (no figure hint).
