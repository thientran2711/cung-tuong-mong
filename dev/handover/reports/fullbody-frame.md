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
