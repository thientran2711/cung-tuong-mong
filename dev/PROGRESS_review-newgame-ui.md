# PROGRESS review/newgame-ui (worker, owner 15/11 "quá lag, quá bực" — identity screen + Nhập cung)
Base: origin/main 3ef079f61 + merge of origin/review/stage-fig-size (85c33890f). KIT 28.11a documents everything.

## Causes found (profiled: Chrome trace + per-function timing, 755x1000, CPU 1x and 4x)
1. Pick: `fpPick` rebuilt the whole 32/52-cell picker TWICE (direct + portrait-onload refresh) and ran the full game `render()` behind the
   full-screen card; `facePool` walked all 84 identities computing por AND fig each call (6 calls on the first pick: 1.8 s). Also the
   generic "portrait loaded → render() 250 ms later" rebuilt the hidden HUD (235 nodes, 58 picture loads) after every pick.
2. Paging: the stage Pixi layer kept rendering at 60 fps behind the opaque card: each page turn waited ~470 ms on a WebGL read-back
   (GPU busy 1.0–2.2 s per interaction); cells used the 384x506 portraits (30–55 KB each, 52 decodes); layout re-measured each turn.
3. Figure late: the crisp 900 px figure was fetched only after the tap; nothing shown meanwhile.
4. Heights: figure was object-fit:contain in a fixed 40vw x 86dvh box → wide-robed faces shorter, margins differ.
5. Covering: panel width came from max-width rules that depend on classes (kpfig could drop) → on Cung nữ tab it grew over her.
6. Family: kitFigBody / jk3 topOf read pixels of CDN pictures without crossOrigin → tainted canvas → every body measure = whole picture.
   jaudit kitRelPaint walked the WHOLE body text after every DOM change.

## Fixes (files)
- j79: kitPickerGo/Show/Decode (decode-before-swap, idle decode of neighbours, no re-measure), kitTn + img/TN.json, kpIdFig/kpIdLay
  (standard body tier, fixed column + panel width, low-res→crisp, mask fade), kitStagePause (PX + KFX), kpIsScene (staged Nhập cung = event).
- j86: memoised items (per pool/tier/age/dress/roll), thumbnails, in-place selection, no render while card open, figure prefetch per page,
  crisp fetch on pointerdown, other tab warmed in idle.
- jkit/jk3: crossOrigin="anonymous". jaudit: krel painter walks only changed nodes.
- j2 / j42: Nhập cung cards → stage:[S] + headArt (2 new paintings) + kitRows.
- Art (CDN): img/tn/ (840 files, 5.9 MB total; ~7 KB each), img/TN.json, img/ev-nhap-cung.webp (181 KB), img/ev-nhap-cung-cn.webp (206 KB).
  Bytes per identity screen: consort page set 32 x 7 KB = 0.22 MB (was 32 x ~42 KB = 1.3 MB); maid 52 x 7 KB = 0.36 MB (was 2.2 MB).

## Numbers (dev/test/newgame-ui.js, 755x1000, warm disk cache, returning player) — before (main+stage-fig-size) → after
| action | before handler / tap→frame | after handler / tap→frame |
|---|---|---|
| ‹ › page | 0–415 / 645–1391 ms | 0–15 / 21–268 ms (one 844) |
| pick face | 412–1986 / 1096–4884 ms | 3–72 / 11–481 ms; low-res figure in the same frame |
| Cung nữ tab | 510–1230 / 1498–2817 ms | 262 / 381 ms (warmed in idle) |
| 4x CPU, page: main busy / longest task / GPU | 934 / 824 / 1313 ms | 585 / 106 / 102 ms |
| 4x CPU, pick | 5276 / 1897 / 2162 ms | 1173 / 369 / 75 ms (handler 12–57 ms) |
tap→frame on this VM is bounded by the software compositor (VizCompositorThread, backdrop blur over a full-screen picture); on landscape
sizes it is 8–60 ms. Main-thread work per tap is the device-relevant number.
Tier (body px / floor px, every face equal): 755x1000 800/988 · 1180x820 689/810 · 1366x1024 860/1012 · 844x390 328/385 · 820x1180 944/1166;
column right < panel left at every size (286<294, 582<591, 764<772, 359<367, 311<319).
stage-fig-size.js 755x1000 + 1180x820 after the CORS fix: every kind col ≤ 36 %, face true, distorted 0, over 0.

## Open / notes
- The first-run bulk download (jload, 354 MB) competes with everything on a first visit — not touched (boot is review/boot-flash).
- The identity card's two pinned choices still cover the last picker row on 1180x820 (card scrolls) — pre-existing, untouched.

## r2 (review/newgame-ui-r2, from r1 0aa89dcb8) — reviewer FAIL fixes
1. KIT 8.1 one panel size: panel-size.js 7 viewports, one width + one height each (0 nofit / 0 errs). No width/height set on .dlg.kpanel by newgame-ui code.
2. ONE common figure tier (KIT 28.11a updated): body = min(80/84 % H, column*.98/KPID_WR), KPID_WR=.5 (max over 420 faces .496). 755x1000: body 321 / floor 988 for every face (col 164); 1180x820 689; 844x390 328; 1366x1024 860. No mask, no cut, no spill.
3. Pinned choices moved out of the scroll area (j86 .kpscroll / .kpmbw): note + last picker row no longer covered.
Tests: newgame-ui.js 755x1000, 1180x820, 1366x1024, 844x390, 1000x755 ok; panel-size.js ok; stage-fig-size.js 77 dp rows face/sq ok, distorted 0 (one browser crash at 686x880 for info/ident/stage under memory pressure, rerun alone ok).

## r3 (review/newgame-ui-r3, reviewer) — merged onto origin/main eba64ead4
Conflicts: j2 Nhập cung (kept event frame, added main's psOpenText as a kit row "Hậu cung"), jk4 (main's visibility:""), generated files rebuilt.
Fix: j86 stale `.kpmbw` on reused #mb after the identity card closed (overflow hidden leaked to the next pop-up).
Lag (4x CPU, 755x1000, long tasks): main 159 tasks / 45.5 s total / max 1451 ms; r3 48 / 8.3 s / max 613 ms. Pick tap→paint main 2.7–3.8 s, r3 0.1–0.65 s.
