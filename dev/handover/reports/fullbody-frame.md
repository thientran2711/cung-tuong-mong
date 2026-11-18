# fullbody-frame step 1 — Tuần lục sample (worker session_01UV1SzjVbe2rs236yVuGUDn)
PRIORITY #1 CHECK: OD 18/11 ~06:45Z + ~06:55Z (verbatim) | main dev/build/jsl.js:111 kitBookFigClamp, j87.js:586 .kbk-por | review/* review/book-figsize-r5 ce8a6d48 (seal slot reused; crop rule dropped) | claims fullbody-frame (this session)

## What (review/fullbody-frame @ 10124f62, from origin/main 1c3abe3)
- BAL.bookFrame {ar .4824, maxCol .56} (jbal2.js): frame = tight box of the widest person (c03 t6, 1292x2678 of 1520x2688).
- jsl.js kitBookFigClamp rewritten: frame width = min(column height x ar, .56 x inner page width) via --porf on the person box (text column takes the rest); the figure is fitted INTO the frame by its painted box (kitFigBody l..r x t..b), aspect kept, centred, feet on the frame floor, equal-gap raise only when there is slack. No crop; .kbk-por overflow visible.
- Same kit part => Mệnh truyện and Sổ luân hồi pages (kbk-person.kbk-full) follow automatically. Other frames (notices/info/tin trong cung) NOT touched (step 2).
- r5c seal slot reused (jfigseal.js kfsHost + book slot, j87 .kbk-phead padding-right 52): "?" chip in the name row, never on the figure. KIT.md 56.3 rewritten in place. Scan: dev/test/fullbody-frame-scan.js.

## Numbers (CSS px; cut = painted box outside frame; all squeeze 1.000, text overlap 0)
Fold 755x1000: frame 330x793 (before 220x793), text col 243 (before 353).
 c03 t1 fig 309x793 | t6 330x681 (widest, fills width) | t8 330x791 | old maid(wide pink) 330x664 | old emperor 304x793 | old consort 276x793. cut 0 on all (t6 L 0.1 px rounding).

iPad 1180x820: frame 273x631 (before 183x631), text col 199 (before 289). t1 246x631 | t6 273x564 | t8 263x631 | old maid 273x550 | emperor 242x631 | consort 220x631. cut 0.
Before (main): figure only 220 wide (maid 220x443 Fold / 183x369 iPad) in a column 56 % of the height.
Because the frame is capped at 56 % of the inner width, t6 (the widest) is width-limited, so it is 681/793 tall on Fold, not full height; raising maxCol to .64 would fill it but leaves text ~190 px on Fold. Owner to judge.

## Shots (CDN, left BEFORE main, right AFTER; LOOKED at each)
https://ctm-img.victoria-tntt.workers.dev/img/_review/fullbody-frame/<dev>-<case>.jpg with dev = 755x1000 | 1180x820, case = c03-t1 | c03-t6 | c03-t8 | old-maid-wide. Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review fullbody-frame.
Page error "Unexpected token '<'" appears in before and after: harness route serves html for JSON (not a game bug).
~60% xong / ~35% chơi được (step 1 only).

## r2 (ROOT-47 feedback: ONE scale) — review/fullbody-frame @ 5e1b8e66
- Frame = ar .4824 x column width (Fold 330 -> 684 tall, iPad 273 -> 566), cap .56 kept (text col 243 / 199). c03 canvas drawn through the crop box (x -117, y 0, 1292x2678): same body height on every tier. Old figures: same body height (head-top to feet) as c03, centred, feet on the frame floor; scaled down only if the painted box would exceed the frame (never cut).
- Fold body px: c03 t1 682.5 | t6 679.8 | t8 681.1 (spread 0.4 %). Old: maid 618 (width-limited, painted width = frame), emperor 643, consort 651 (their painted crown above head-top makes the painted box taller than the frame). iPad: t1 564.6 | t6 562.4 | t8 563.5; maid 511, emperor 532, consort 539. cut 0 (t1 bottom 1 px = alpha edge), squeeze 1.000, text overlap 0, ALL OK.
- Shots replaced on CDN (same URLs, before|after). Fold strip t1|t6|t8|old maid LOOKED: feet on one line, same height.
~65% xong / ~40% chơi được.

## r3 (OWNER ~07:00Z: measure SKULL TOP -> feet for everybody, never crown/bun/hat) — review/fullbody-frame @ 3bb0a516
- Rule built in: skull-top (kitFigBody ht from img/fig-ht.json = FIGURE_GATE method: lm10 - .30 F) -> feet = ONE px for every person (kids by KIT_FIG.fac). c03 canvases are not in fig-ht.json yet: their skull tops were measured with headtop.py's face_rows (MediaPipe; t1..t8 = .035 .055 .035 .054 .074 .081 .097 .096 of the canvas) -> dev/test/fullbody-frame-c03ht.json (merge at go-live; the scan injects it).
- Frame sized for the TALLEST crown and WIDEST robe at that one body size: catalog scan of 1759 adult figures (dev/test/fullbody-frame-catalog-scan.py): max crown above skull top / body cMax .132 (maid m50 t8 a18), max painted width / body wMax .647 (maid m48 t8 a51; p99 .541). BAL.bookFrame {maxCol .56, wMax .65, cMax .132} -> frame aspect .5742, body = frame width / .65.
- Fold 755x1000: frame 330x575, skull>feet 507.7 px for ALL 9 people, spread 0.00 %; iPad 1180x820: frame 273x475, 420.0 px, spread 0.00 %. Cut 0 (crown, robe, feet), squeeze 1.000, text overlap 0, text col 243 / 199. Cases: c03 t1, t6, t8, Hoang hau (fig-thaihau-1), tallest crown (maid m50 t8 a18), widest robe (maid m48 t8 a51), old wide maid, a man (man-bacdich-1-a36), old emperor.
- COST (for owner): everybody is ~25 % smaller than r2 (body 508 vs 680 on Fold) because ONE size must fit the widest robe in the catalog (.647) inside a column capped at 56 % of the page; the frame is 575 high in a 793 column, so there is empty paper above the heads. Options: (a) keep; (b) wMax .54 (p99): body 611, but ~1 % of catalog (a51 t7/t8 big trains) would be cut or need the guard; (c) raise maxCol .56 -> .62: body +11 %, text col Fold 243 -> 205.
- Shots (CDN, same folder): 755x1000-/1180x820- {c03-t1,c03-t6,c03-t8,old-maid-wide} = before|after, {hoang-hau,crown-tallest,widest-robe,man} = after only. LOOKED (two Fold strips): all heads' skull tops on one line, feet on one line.
~75% xong / ~45% chơi được.

## r4 (OWNER ~07:05Z angry at r3 "too small": SIZE FIXED = r2) — review/fullbody-frame @ fa67e42a
- BAL.bookFrame = {ar .4824, maxCol .56, body .9167, margin .06}; wMax/cMax shrink logic REMOVED. Body (skull top -> feet) = .9167 x frame height = c03 t6 of r2: Fold 627.1 px, iPad 518.8 px, the SAME for all 9 people (spread 0.00 %): c03 t1/t6/t8, Hoang hau fig-thaihau-1, tallest crown (maid m50 t8 a18), widest robe (maid m48 t8 a51), old wide maid, a man, old emperor. Frame Fold 330x684, iPad 273x566; text col 243 / 199 (unchanged).
- Crowns use the free paper above the frame (column 793 / 631 tall; tallest crown measured 710 / 587 px painted, crown cut 0). Wide robes spread LEFT into the page margin (page minus .06 of its width), never under the text. Old wide maid m50 t6 (335 px) fits in margin: cut 0. Only a picture still too wide is clipped (clip-path) at the column edge, data-kcut: in the 9: widest-robe (maid m48 t8 a51) loses 59 px (Fold) / 49 px (iPad) of hem/sleeve on its right.
- STOPGAP LIST for Foreman C (redraw narrower): full catalog scan, 8890 figures with a head-top row: 179 exceed the window (painted width / body > .553): 130 maid + 49 consort; t8 90, t7 77, t6 12 (all big-train / wide-sleeve a51 or a18 high tiers). Names + ratio: dev/handover/reports/fullbody-frame-redraw-list.txt. Top: maid m15 t8 a18 .838, m12 t7 a18 .827, m17 t7 a18 .801 (these three may be head-top measure artefacts: check), then m36 t8 a51 .661 ... Kids not counted (child size).
- Shots (CDN, same folder, before|after for t1/t6/t8/old-maid-wide, after only for the other 4), LOOKED 3x: c03 as big as r2, all heads/feet on one line.
~85% xong / ~55% chơi được.

## r5 (OWNER FINAL ~07:10Z + ~07:20Z; r4 superseded) — review/fullbody-frame @ 57984e01
- LAYOUT = live (--porf .36 column, text column as live); BAL.bookFrame maxCol/ar/wMax/cMax/body removed. BAL.bookFigW .343 reused (r5b): ONE skull-top -> feet for everybody = column width / .343 = Fold 641.4 px, iPad 533.5 px (her p.5 shot), 11 people (c03 t1/t6/t8, Hoang hau fig-thaihau-1, tallest crown m50 t8 a18, widest robe m48 t8 a51, old wide maid, man, old emperor, SELF), spread 0.00 %.
- Nothing cut, nobody shrunk: robes spread over the text area (up to 195 px Fold / 162 px iPad for the widest robe); text (.kbk-phead/.kbk-flow z-index 1) drawn ON TOP of the transparent figure; no clip. Painted left edge on the column's left edge as live. Page-edge cut 0, squeeze 1.000.
- Crown rule: ONE feet line = column floor, moved down toward the page bottom line only as far as the tallest Hoang hau crown (BAL.bookFrame.cRef .072 = thaihau-h3-a36) needs to clear the running-head rule by gap 8 px; not needed here: crown-top gap under the rule = Hoang hau fig-thaihau-1 118 px Fold / 70 px iPad; tallest crown in the catalog (maid m50 t8 a18) 73 / 33 px; c03 t8 89 / 46 px; moved down 0. Feet line = column floor (feet gap 0 px; Fold column 793 px, iPad 631 px).
- Redraw list (dev/handover/reports/fullbody-frame-redraw-list.txt) is now nice-to-have only (nothing clipped).
- Text readability over the robe LOOKED 3x on Fold (SELF, c03 t6, widest robe, Hoang hau): text is on top, readable; robe lines under the text are visible but quiet. The 5-7 text lines that sit over a robe are counted per case in the scan.
~92% xong / ~70% chơi được.

## S3 (ROOT-52, OD L1878) — review/fullbody-frame-s3 @ c9d355bd (from live main a2ce736a); worker session_01UV1SzhJ3JicrwJmcbMVHSA depth 5
PRIORITY #1 CHECK: OD L1878 | main kitFullFigX (s2) | review/* none | claims s3 (this)
(1) Scroll fade: kitScrollCues (s2) already skips every container that holds the figure column and uses an own strip on short scrollers; new scan checks the cue boxes (fade 36 px / strip) against the figure's own column rect on every frame: 0 hits, Fold + iPad (news/choice/coach/shop/ID card, 6 people). The text column may run over a robe that spreads under it (owner: row đè lên hình), the figure column never gets a fade/line/pill. Her feet-fade shot was the pre-b0155afe build.
(2) KIT 56.5 HEAD AT COLUMN CENTRE: kitFigBody measures hx (head x); kitFullFigX(b,iw,cw,lim) centres hx on the column; only the frame's left edge limits it (lim); callers kszFigFit, kitPersonDlgFit, kitDpFit, kpIdLay, kitBookFigClamp(book: lim = page margin, NOT in the scan). KIT.md 56.5 written; kit page sample unchanged (kszFrame sample uses the same code).
Scan dev/test/figure-head-fade-scan.js, head-centre offset px before(main) -> after:
```
dev kind case | head-centre offset px before -> after | cues over figure column before -> after
1180x820 choice  SELF          | -0.0 -> 0.1 | 0 -> 0
1180x820 choice  crown-tallest | 27.2 -> 14.1 | 0 -> 0
1180x820 choice  hoang-hau     | -0.1 -> 0.0 | 0 -> 0
1180x820 choice  man           | 0.0 -> -0.0 | 0 -> 0
1180x820 choice  old-maid-wide | 19.4 -> 6.8 | 0 -> 0
1180x820 choice  widest-robe   | 20.6 -> 2.1 | 0 -> 0
1180x820 idcard  crown-tallest | -0.1 -> 0.1 | 0 -> 0
1180x820 idcard  hoang-hau     | -0.3 -> -0.3 | 0 -> 0
1180x820 idcard  man           | 0.1 -> 0.0 | 0 -> 0
1180x820 idcard  old-maid-wide | 0.5 -> -0.2 | 0 -> 0
1180x820 idcard  widest-robe   | -0.6 -> -0.2 | 0 -> 0
1180x820 news    SELF          | -0.0 -> 0.0 | 0 -> 0
1180x820 news    crown-tallest | 11.2 -> -0.0 | 0 -> 0
1180x820 news    hoang-hau     | -0.0 -> 0.0 | 0 -> 0
1180x820 news    man           | -0.0 -> -0.0 | 0 -> 0
1180x820 news    old-maid-wide | 2.4 -> -0.0 | 0 -> 0
1180x820 news    widest-robe   | 3.7 -> 0.0 | 0 -> 0
1180x820 pdlg    SELF          | -0.2 -> -0.2 | 0 -> 0
1180x820 pdlg    crown-tallest | 5.6 -> -0.2 | 0 -> 0
1180x820 pdlg    hoang-hau     | -0.3 -> -0.3 | 0 -> 0
1180x820 pdlg    man           | -0.2 -> -0.3 | 0 -> 0
1180x820 pdlg    old-maid-wide | -0.2 -> -0.2 | 0 -> 0
1180x820 pdlg    widest-robe   | -0.2 -> -0.2 | 0 -> 0
1180x820 shop    eunuch        | -0.0 -> 0.0 | 0 -> 0
755x1000 choice  SELF          | -0.0 -> -0.0 | 0 -> 0
755x1000 choice  crown-tallest | 27.2 -> 14.1 | 0 -> 0
755x1000 choice  hoang-hau     | -0.1 -> 0.0 | 0 -> 0
755x1000 choice  man           | 0.0 -> -0.0 | 0 -> 0
755x1000 choice  old-maid-wide | 19.4 -> 6.8 | 0 -> 0
755x1000 choice  widest-robe   | 20.6 -> 2.1 | 0 -> 0
755x1000 idcard  crown-tallest | 0.2 -> 0.2 | 0 -> 0
755x1000 idcard  hoang-hau     | -0.4 -> 0.1 | 0 -> 0
755x1000 idcard  man           | -0.4 -> -0.5 | 0 -> 0
755x1000 idcard  old-maid-wide | -0.5 -> 0.1 | 0 -> 0
755x1000 idcard  widest-robe   | -0.2 -> -0.1 | 0 -> 0
755x1000 news    SELF          | -0.0 -> 0.0 | 0 -> 0
755x1000 news    crown-tallest | 11.2 -> -0.0 | 0 -> 0
755x1000 news    hoang-hau     | -0.0 -> 0.0 | 0 -> 0
755x1000 news    man           | -0.0 -> -0.0 | 0 -> 0
755x1000 news    old-maid-wide | 2.4 -> -0.0 | 0 -> 0
755x1000 news    widest-robe   | 3.7 -> 0.0 | 0 -> 0
755x1000 pdlg    SELF          | 5.4 -> -0.0 | 0 -> 0
755x1000 pdlg    crown-tallest | 36.8 -> 25.7 | 0 -> 0
755x1000 pdlg    hoang-hau     | 0.1 -> 0.1 | 0 -> 0
755x1000 pdlg    man           | 0.0 -> -0.0 | 0 -> 0
755x1000 pdlg    old-maid-wide | 29.1 -> 18.5 | 0 -> 0
755x1000 pdlg    widest-robe   | 30.3 -> 13.9 | 0 -> 0
755x1000 shop    eunuch        | -0.0 -> 0.0 | 0 -> 0```
Still off-centre (frame left-edge limit, nothing cut): iPad/Fold choice tallest-crown 27->14, old wide maid 19->7; Fold coach tallest-crown 37->26, old maid 29->19, widest 30->14. Owner may allow a larger left spill to reach 0.
Shots AFTER-only Fold|iPad @2 (tallest crown + widest robe), LOOKED: https://ctm-img.victoria-tntt.workers.dev/img/_review/fullbody-frame-s3/{news,choice,pdlg,idcard}-{crown-tallest,widest-robe}-fold-ipad-after.jpg and shop-fold-ipad-after.jpg. Note: tall crown still overlaps the name tag (tag on top). Wipe: python3 dev/site/cdn_sync.py --wipe-review fullbody-frame-s3
~90% xong / ~80% chơi được.

### S3 HANDOVER (worker session_01UV1SzhJ3JicrwJmcbMVHSA, depth 5, ctx ~60%; stopped by ROOT-52 on the account move)
Branch review/fullbody-frame-s3 @ c9d355bd (pushed, from main a2ce736a; NOT merged, quickcheck NOT run for s3). CDN review shots: img/_review/fullbody-frame-s3/ (wipe after verdict).
OWNER ORDERS (verbatim in OWNER_DECISIONS L1878, L1879 + tail ~16:10Z):
1. 09:25Z no fade/line on the figure + HEAD at the column centre (KIT 56.5). DONE in code + scan (dev/test/figure-head-fade-scan.js), table above. Remaining off-centre only by the frame-left-edge limit (choice tallest-crown 14 px, coach tallest-crown 26 px); owner to decide whether a bigger left spill (cut) is wanted. Book (kitBookFigClamp) uses the same rule but is NOT in the scan.
2. 09:30Z picture size, CORRECTED 16:10Z: a BIG scene picture is fine when everything under it (a few lines, or 1-2 short buttons) fits the frame with NO scrolling; only when the content would scroll does the picture shrink; sizes are KIT_SIZE classes (KIT_SIZE.pic / .ban, jksize.js) chosen by one rule from the content, never per frame by hand. NOT DONE (not started). Next: measure table (every dialog with a scene picture, Fold + iPad: content height, chosen picture class, scroll yes/no) via a scan like dev/test/scroll-cue-scan.js (94 dialogs); rule candidate: in kszLivePick3/kitFrameApplyLive3 try the biggest picture class first, step down only while the info column scrolls. Foreman B's shop panel must use that rule.
3. Phone Luân hồi / «Thân phận kiếp này»: REVERT to the old approved layout (figure left, one long vertical info box right). NOT DONE, NOT CHECKED against live; check first whether s2 (kpIdLay / identity card, j79) changed it on the phone (390x844 / 412x1058) and put the old layout back; identity card figure code is in j79.js kpIdLay (s2 removed the KPID_WR cap, added kitFullFigX).
Also open: tall crowns overlap the name tag (tag z-index 2); quickcheck (bash dev/tools/quickcheck.sh) before READY.
### S4 (worker fullbody-frame-s4, MAIN ROOT-53; branch review/fullbody-frame-s4 @ 8b62c6bd, = s3 c9d355bd + merge origin/main d3ea24e8 + this work; PUSHED)
PRIORITY #1 CHECK was in the brief (OD 7 | main 2 | review/* 3); reused s3's scan/kit code; no duplicate feature.
ENVIRONMENT LIMIT (blocking for shots): this session runs on the Default environment, whose network blocks the picture CDN (ctm-img.victoria-tntt.workers.dev -> proxy 403). So: NO figure/scene pictures load, NO shots can be uploaded to CDN img/_review/, and dev/site/assets.py / build_site.sh cannot reach the CDN index. I built index.html + sw.js with a stub (the 26 img/*.json manifest URLs taken from the live sw.js; assets.json untouched = images unchanged); the lander must re-run `bash dev/site/build_site.sh` where the CDN is reachable. The environment `cung-tuong-mong` (CDN host allowed) exists but this session cannot be moved onto it (child session) -> MAIN: open the shots session there, or run the shots (Fold 755x1000@2 + iPad 1180x820@2) from a session that reaches the CDN.
(a) SCENE PICTURE SIZE (owner 16/11 ~16:10Z). KIT 56.6, ONE rule `kszPicStep3(dlg)` (jksize.js), called by both appliers (kitFrameApply3, kitFrameApplyLive3): the picture stays BIG (fills what the text leaves) while the frame needs no scroll; when `.k3right` / body / `#mb` scrolls it steps down `KIT_SIZE.v3.picLadder` = LL > NL > NM > NS (KIT_SIZE.pic classes, heights per kitSzMode), biggest class first, stops at the first class with no scroll; kept only if it reduces the scroll; re-decided from scratch after the layout settles (180 ms), so it is never smaller than the scroll needs. kitFrameFits(Live)3 restore the picture style they measure with. Test (committed): `node dev/test/scene-pic-step.js index.html` (fake natural size 1280x720 + full subject box = worst case offline; every PEND frame twice per device, step OFF = before, ON = after; FAIL if after is worse or a smaller class would still remove the scroll). Scan (committed): `node dev/test/scene-pic-scan.js index.html` (frame | picture class | scrolls, all dialogs).
SCAN TABLE (device | frame | size | picture px before>after (class) | scroll px before>after; frames not listed did not scroll and kept their picture):
device | frame | ksz | picture px before→after (class) | scroll px before→after
755x1000 | tt3 | XL | 188→188 | 9→9
755x1000 | td1 | XL | 85→56 (NS) | 203→174
755x1000 | phoenix | XL | 85→56 (NS) | 89→60
755x1000 | doanngo | XL | 85→85 | 9→9
755x1000 | vulan | XL | 107→107 | 9→9
755x1000 | dongchi | XL | 85→56 (NS) | 50→21
755x1000 | thbirthday | XL | 85→56 (NS) | 33→0
755x1000 | prep | XL | 85→56 (NS) | 261→232
755x1000 | night1 | XL | 85→56 (NS) | 193→164
755x1000 | night2 | XL | 85→56 (NS) | 207→178
755x1000 | giu | XL | 85→56 (NS) | 72→43
755x1000 | cnvGrant | XL | 273→273 | 9→9
755x1000 | thBribe | XL | 85→56 (NS) | 186→157
755x1000 | cmBrawl | XL | 85→56 (NS) | 118→89
755x1000 | vnight | XL | 85→56 (NS) | 251→222
1180x820 | tt3 | XL | 269→269 | 9→9
1180x820 | td1 | XL | 168→84 (NM) | 55→9
1180x820 | phoenix | XL | 168→84 (NM) | 91→0
1180x820 | doanngo | XL | 187→187 | 9→9
1180x820 | vulan | XL | 170→170 | 9→9
1180x820 | dongchi | XL | 168→56 (NS) | 102→0
1180x820 | thbirthday | XL | 168→140 (NL) | 27→0
1180x820 | prep | XL | 168→56 (NS) | 208→96
1180x820 | night1 | XL | 168→84 (NM) | 44→0
1180x820 | night2 | XL | 168→84 (NM) | 34→0
1180x820 | cnvGrant | XL | 291→291 | 9→9
1180x820 | thBribe | XL | 168→56 (NS) | 125→13
1180x820 | cmBrawl | XL | 168→140 (NL) | 18→0
1180x820 | cmTd | XL | 168→140 (NL) | 29→0
1180x820 | vnight | XL | 168→84 (NM) | 86→0
frames with a picture strip: 60  scrolling before: 31  scrolling after: 21  stepped down: 22
ALL OK
Reading: 60 frames with a scene strip; 31 scrolled before, 21 after, 22 stepped down; every frame that CAN be fixed by a smaller class is fixed (test FAIL count 0). What stays scrolling: (i) XL frames whose text + buttons alone are taller than the XL frame (picture already NS, e.g. prep, td1, night): XL scrolls inside by design (KIT 56.6 does not change that); (ii) a constant 9 px on tt3 / doanngo / vulan / cnvGrant (XL / L): it is the figure column + button row, NOT the picture (same 9 px before), NOT fixed here (flag for the kit keeper: kszFeetFit room constant 26). Frames that scroll in the old pop-up path (kdscroll: itarget, evpick, plantsv; the shop kdper) still use the old `--kdpic` vh stepping in jk4 kitDlgFit; they show a person column, not a scene picture; not converted (ask MAIN if wanted).
(b) PHONE LUAN HOI / «Than phan kiep nay» (owner 09:30Z): KIT 56.7. Finding: s2 / s3 did NOT change the layout (kpIdLay one-page = figure ABOVE the panel dates from 11-14/11-16 kv1; the old figure-left layout was the pre-design-scale wide-portrait rule, KIT 28.11 text 'wide portrait: figure left, panel right'). Restored: one page (html.kv1) takes figure LEFT + ONE long vertical panel RIGHT (`.modal.kpfig.kpside`, panel width min(560, screen-16-12-140), height screen-16) whenever the screen leaves the panel KIT_SIZE.v3.narrow.minRight (274) next to the smallest figure column (fig3.M.cw 140): Fold 755x1000 yes; 412x1058 / 390x844 portrait phones stay figure-above (the panel cannot fit beside a figure). In this layout the ONE body of the screen is capped by the widest painted figure (KPID_WR .5, the old cap, same body for every face) so her whole figure stands in the column. Geometry measured (no pictures offline): Fold 755x1000 panel x187 y16 560x968, figure column 0..179, figure x11..169; 520x900 panel 336x868; 412x1058 / 390x844 unchanged (stack). CAVEAT: I could not LOOK at it with the real figure (CDN). Open point for the owner (not decided): robe overflow at the left edge to reach 0 offset: in the side layout the cap keeps the whole figure in the column (no spill); in the centre pop-ups a wide robe still reaches the screen left edge (s3 numbers: choice tallest crown 14 px, coach 26 px).
(c) QUICKCHECK: the full `quickcheck.sh` cannot run here (its build step needs the CDN). Run piecewise on the committed index.html: `node dev/tools/quickcheck.js` = PASS (open 1567 ms 0 errors, old save from live main loads and plays a buoi, perf median new/live render 251/247, tab 452/436, buoi 1202/1138, tasks>200ms 19/17); time-spill-guard PASS; coregates G1/G2/G4 pass, G3 kit-conform FAILS IDENTICALLY ON LIVE MAIN in this CDN-less environment (live 20 MIXED 'event pictures: 0'; mine 21: the extra is place:tn, a different random event 'Ta bat gap' without a picture, + cold-palace not opened: state noise, not a layout fault) -> re-run G3 where the CDN loads.
FILES: dev/build/jksize.js (picLadder, kszOver3, kszPicH3, kszPicStep3, kszPicFit3 floor release), dev/build/j79.js (kpIdLay side layout + CSS), dev/kit/KIT.md 56.6/56.7, dev/test/scene-pic-scan.js, dev/test/scene-pic-step.js, index.html / sw.js (stub build, see above).
NOT DONE: Fold + iPad shots on CDN (blocked, see top); the real build_site.sh run; LOOKING at the identity card with a real figure.
### S4 HANDOVER (worker fullbody-frame-s4, ctx ~60% = ceiling; stopped by rollover rule)
Branch review/fullbody-frame-s4 @ 8b62c6bd (pushed). (a)(b)(c) DONE in code (see S4 above). NOT STARTED, orders arrived after the S4 report: (d) iPad Luân hồi figure = same size as the Luân hồi book; (e) VIỆC/choice frames: Hoàng hậu (tallest crown) = figure scale + placement standard, name tag never covers the figure; (f) REDO KIT_SIZE.fig classes (S/M/L/XL + M3/L3/XL3/NL3/NM3, jksize.js) measured on the Hoàng hậu (BAL.bookFrame.cRef is the crown ref; kszFeetFit already reserves cRef) — change the class values in the kit, scan table class|frame|crown/name px before/after on Fold + iPad.
SUCCESSOR MUST HAVE CDN: open it on env `cung-tuong-mong` (host ctm-img.victoria-tntt.workers.dev allowed); the S4 session ran on Default (CDN 403), so nothing was LOOKED at with real figures and no shots exist. First actions there: merge origin/main, run `bash dev/site/build_site.sh` (real), re-run `node dev/test/scene-pic-step.js index.html`, take Fold 755x1000@2 + iPad 1180x820@2 shots of identity card (side layout kpside) and VIỆC frames, then (d)(e)(f). Scratch helpers (not in git): shot-id.js / probe-id.js pattern = scene-pic-scan.js header + kitRoulette stub + start().
