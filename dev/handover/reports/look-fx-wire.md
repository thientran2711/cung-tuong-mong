# look-fx-wire (worker, sonnet) — 18/11
PRIORITY #1 CHECK: OD 18/11 owner picks (mực 85 %, muội 85 %, cào 85 % + flip + game size) + C ROOT-14 24 finals; reused: jlooks lkArt/lkFaceImg/lkSquare, KIT_RASH.style, KIT_SCAR.style, dev/art/facefit method, looks-2-art.md md5 table.

## Done
1. TONE LADDER (3 sheets + 3x strips) -> owner picked 85 % each (CDN img/_review/look-fx/ladder-*.png). R2: muội lv3 redone (powdery warm grey-brown ash, Magnific gpt-2-6 sheet cut locally; candidate img/_review/look-fx/fx-muoi-3-new.png md5 293079cbcf6802546c33e4702e358dc2, NOT yet live: live fx-muoi-3.png is still C's approved old file until owner OKs ladder-r2-muoi.png), cào flipped + game size (ladder-r2-cao.png).
2. 24 finals uploaded to live CDN img/fx-*.png, md5 verified on the CDN against the looks-2-art.md table (24/24). final-candidates untouched.
3. Fig rows re-scanned (dev/tools/look-fx-figfit.py): 787 fig rows (consort 512, maid 208, mama 32, player 20, thaihau 15), Haar on the figure top 22 % at 2.5x, veil box from the face rect with the POR calibration (cx -0.031, band .465, w .892, bottom 1.113), rotation kept, scar row from the veil box. 787/787 detected (CascadeClassifier is not thread safe: one per thread), spot-checked by overlay (12 random + 42 size outliers + thaihau): all on the face. Live img/veil-fit.json + scar-fit.json pushed (md5 94b9c96d5131b624724186ca998ac776); backups of the old files = same manifest before 18/11 02:45Z (old rows below).
   | group | rows | dx/W median (p10..p90) | dy/H | w ratio | h ratio |
   |---|---|---|---|---|---|
   | fig-consort | 512 | -0.23 (-0.60..-0.01) | +0.01 | 1.06 | 0.97 |
   | fig-maid | 208 | -0.00 | -0.01 | 0.98 | 1.00 |
   | fig-mama | 32 | -0.01 | +0.01 | 0.98 | 0.99 |
   | fig-player | 20 | -0.27 (-0.49..-0.01) | +0.01 | 0.86 | 1.01 |
   | fig-thaihau | 15 | -0.22 | -0.27 | 2.02 | 0.95 |
   222 rows moved by more than 0.30 W (turned heads). Examples: c01 t2 a26 [54.0,7.6,22.6,8.0] -> [43.3,7.7,25.7,7.4]; c30 t2 a26 [55.1,10.0,23.2,7.6] -> [43.2,10.2,24.9,7.5]; thaihau-h1-a18 [53.9,11.1,11.7,7.2] -> [40.1,11.3,25.0,7.8]. por rows untouched (OK).
4. Code (review/look-fx-wire): BAL.looks.tone {muc,muoi,cao:.85} (one core); window.LOOKS_ART = the 24 keys (+ fx-muc-N-m); lkFaceImg tone + mirrored ink pick (lkMirror: scar-fit cheek right of the veil centre => -m; today every por/fig row is the viewer-left cheek, so non-m everywhere); kitToneCss (opacity x strength + saturate/brightness: CSS stand-in for the per-pixel pull the ladder used, close at 85 %); KIT_SCAR.style now rotate() scaleX(-1) in j92 + jk2b (flip, one rule: all 787 por rows are the left cheek), KIT_LASTING scar layer flip + tone alpha, baked avatars draw flip; sẹo rỗ (fx-pox-scar-N) is a face-square final: kitFxLayers draws it through lkSquare (was the cheek box), KIT_LASTING through lkSquareRect.
5. Not changed: hair/cloth slots (not approved), lem phấn + lạnh dropped.

## Shots (LOOK at 3x done; CDN img/_review/look-fx/, host mode)
{ipadAir 1180x820, fold 755x1000}-{thuydau,daumua,poxscar,muc,bui,muoi,moho,cao}.png: rows c01/c30, cols lv1-3, mirror (por rows) + stage figure face zoom 3.4x (fig rows). Looked: marks sit on the same cheek on mirror and figure, scratch strokes follow the cheek, ink lands beside the eye, size same in both. Dư đồ figure + avatar frames: avatar is the ID card (no marks by owner rule), baked lasting scar path checked by code only (no shot).
## Tests
node --check ok; build_site ok; quickcheck: see tail. Old save: quickcheck old-save step. Perf: quickcheck perf smoke.
## Known / open
- Safari canvas has no ctx.filter, so the baked avatar scar uses alpha only (no colour pull).
- Haar fallback never needed (0 fallbacks); men/kids rows were not in the live file (1574 rows only).
- muoi lv3: owner to OK fx-muoi-3-new.png; then main uploads it to img/fx-muoi-3.png (md5 above).

## R2/R3 update (18/11 ~03:10Z) — branch review/look-fx-wire cc0633a9
- Owner: muội 85 % + new lv3 APPROVED -> img/fx-muoi-3.png = fx-muoi-3-new (md5 293079cb..., live). Cào FAIL (too big, touched the eye) -> scratch rows REGENERATED for all 1574 por/fig rows into the cheek zone below the eye (BAL.looks.keep.cheek), side = min(.18 rowW, .215 rowH), flipped, 85 %. Standing rule keep-out (eyes/lips never covered): BAL.looks.keep (ellipses in veil-row units, measured on 158 por pictures: Haar eyes + lip colour), CSS mask lkKeepCss on every face-square mark (muc/muoi/bui/moho + pox + sẹo rỗ). Test dev/test/look-fx-keepout.py (reads BAL, all 1574 rows + 24 finals): scratch overlap OLD 1574 -> NEW 0; face-square pixels inside keep-out 7295 -> 0. Rash (jrash squares) not masked (not in the owner list).
- Live CDN now: img/scar-fit.json = NEW rows (backup of the old file md5 of the 02:45Z pull = /tmp only; old rows are the 787-por rows listed in the table above), img/veil-fit.json fig rows re-measured, 24 finals + fx-muoi-3.
- Sheets (CDN img/_review/look-fx/): R3-{ipadAir,fold}-... named {ipadAir,fold}-{thuydau,daumua,poxscar,muc,bui,muoi,moho,cao}.png (overwrote the R1 ones) + ladder-r3-cao.png. LOOKED at the cheek/eyes/lips: scratches sit on the cheek below the eye, no mark on eyes/lips/nose. Note: at this size lv1/2/3 scratches (1/2/3 strokes) are hard to tell apart (side ~ 18 % of face width) — owner may want a bit larger within the zone; the zone itself is the limit.
- quickcheck on 4abee5dd: PASS 129 s, open 1364 ms, old save ok, perf render 149/146, tab 352/328, buổi 781/808, tasks>200ms 12/11, core gates PASS (re-run on the final sha before SẴN SÀNG KIỂM).
## HANDOVER (worker look-fx-wire s43, context ~36 % at 03:10Z, start ~6 %, over START_CTX+25 %): successor needed for the NEW scope
Remaining: (1) merge origin/review/avatar-makeup f6ffb09a (makeup baked into avatar frames via KIT_LASTING 'makeup', design/risks dev/handover/reports/avatar-makeup.md) into review/look-fx-wire; make EVERY avatar frame (top bar, side cards, tabs, tall pcPort/mdH) draw the full kitFxLayers stack (marks + scratch + veil + makeup incl. Khuynh thành sparkle), mirror strength, keep-out masks (lkKeepCss; the canvas KIT_BAKE path has NO mask: apply the keep-out as a canvas clip/destination-out using BAL.looks.keep in square coords, and Safari has no ctx.filter so tone = alpha only there). (2) Fold + iPad full-screen shots of each frame kind, same character, on/off, LOOK 3x. (3) quickcheck on the final sha, report update, CLAIMS row, send MAIN "SẴN SÀNG KIỂM look-fx-wire <sha>".
Tools in repo: dev/tools/look-fx-figfit.py (fig rows), look-fx-ladder.py, look-fx-r2.py, dev/test/look-fx-wire.js (<fold|ipadAir> <outdir> [c01,c30]: host mode, stage zoom + mirror per mark), look-fx-keepout.py <cache dir: veil-fit.json scar-fit.OLD.json figs/ fx-*.png> [--write]. Worktrees: /home/user/wt/lfw-code (review/look-fx-wire, push done), /home/user/wt/lfw (handover, branch hv). Caches /tmp/lw (container only).
Do-not-redo: fig-row rescan (done, live), 24 finals (live), muoi-3 (live), ladder sheets (owner picked).
