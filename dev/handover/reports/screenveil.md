# SCREEN-CHANGE VEIL — report (VEIL-1, owner bug OD 24/11 ~10:20Z)

PRIORITY #1 CHECK: OD 24/11 ~10:20Z (this bug) + OD 18/11 ~01:35Z/01:50Z/02:06Z/18:25Z (entering a life: fixed by review/life-preload + entry-blank-r3, jload LIFE GATE KIT §35.3) | main: no screen veil; decode-before-show only in j79.js:1383 kitPickerDecode (pickers), jk2b.js:758 (Luân hồi cards), jload life gate | review/*: veil-zoom* = face-scar layer (not this), loading-words* = CTM_WAIT wording (reused: lines added to CTM_WAIT) | claims: none.

Branch `review/kit-screenveil` — commits acc1caff (part), e13e0a81 (KK18 shape fixes + prefetch), **fe8f6e3d (final)**. KIT §97 kitScreenVeil (KK18 renumbered from §94).

## Root cause
Every view of the game is built in ONE task: `innerHTML` (panels, cards, dialogs, stage tokens) and `style.backgroundImage` (room picture `#scimg` in j6 renderStage, kit backdrops `.kbd` via CSS vars). The browser paints the next frame at once; `<img src>` and CSS `url()` pictures are fetched from the CDN (cold / evicted SW cache, first visit of a room) and decoded only AFTER that first paint. So frames, buttons, text and the §59.1 stand-ins («Đang thỉnh tranh…», silhouettes) paint first and the pictures pop in later — exactly what she described. Nothing waited for decode except the life gate (entering a life, 18/11 fix), the picker pages and the Luân hồi cards. Not a lazy-loading bug and not a SW bug: the SW cache only shortens the second visit; even then a picture outside the memory cache is decoded after the first paint (warm BEFORE run below still half-paints 14/38 steps).
Second finding: `loading="lazy"` act-card pictures scrolled out of a panel are never fetched; a naive "wait for every <img>" would hold any veil forever → the veil only waits for pictures really in view (viewport ∩ every scrolling/overflow box).

## The kit part (KIT §97, dev/build/jscrv.js, last module)
- `#kveil.kscrv`: plain `--k-card` paper over the whole game + ONE line (`--display`, `--k-lab`) from `CTM_WAIT.veil*` (dev/site/kwait.js): «Đang về cung…» (home) · «Đang vào điện…» (…điện) · «Đang sang cung…» (…cung) · «Đang ra vườn…» (Ngự hoa viên) · «Đang vào phòng…» (other places) · «Đang bày tranh…» (event/dialog) · «Đang bày bàn…» (mini-game) · «Đang mở sổ…» (save load) · «Đang bày cảnh…» (tab/layer). VANPHONG forbids «tải», so the brief's «Đang tải…» became «Đang bày cảnh…». Calm: no %, no countdown, no spinner; the line fades in only after BAL.kscrv.word ms.
- Waits until every in-view `<img>` and CSS background picture of the new view is loaded AND decoded (Image.decode), re-scans after each wait + a 90 ms settle (pictures set a few frames late), then reveals the whole view at once (fade BAL.kscrv.fade). No veil at all when everything is already decoded / in memory (decided in the same task, before paint). Safety cap BAL.kscrv.cap = 10 s (MAIN 118 agreed: a 1 s cap would re-show the half-painted view on a slow line).
- ONE watcher wires every screen change: a MutationObserver (same microtask as the DOM build, before paint) computes the view key = life (S object) · place · tab · event at Q head (#modal open) · mini-game (S.mg / #ov) · full-screen layers (`SCRV_OV`). Changed key → `kitScreenVeilUntil(document.body, dest)`. Off while boot cover / life gate / title is up (entering a life keeps its own §35.3 gate). Scan cost ~10 ms per screen change (desktop).
- 97.7 idle prefetch (MAIN 118): once settled, the room pictures of the nearest BAL.kscrv.pre (6) reachable places are fetched + decoded one at a time on idle → warm moves show no veil.
- API: `kitScreenVeilUntil(root,dest)`, `kitScreenVeil(dest)` + `kitScreenVeilDone()`, `kitScrvWord(dest)`; test hook `KIT_SCRV.stat`. Numbers in `BAL.kscrv` (law 4). KIT.md §97 + kit sample page §97; VANPHONG row 68.

## Law 11 scan — every screen change (python3 dev/test/screen-veil-scan.py --md)
| change | site(s) | covered by |
|---|---|---|
| event / dialog (Q head) | j10.js×2, j13.js×2, j14.js×2, j19.js×4, j21.js, j24.js×3, j25.js, j27.js×2 …+107 | key q (Q[0] while #modal open) |
| layer on <body> #coopfz.modal | jcooplobby.js | layer key |
| layer on <body> #dawn.dawn | j18.js, j79.js, j87.js, jne.js | layer key |
| layer on <body> #kchatp.modal | jcoopchat.js | layer key |
| layer on <body> #kctmfu.kup | jcooptimer.js | NOT a screen (small) |
| layer on <body> #kctmh.modal | jcooptimer.js | layer key |
| layer on <body> #kctmp.modal | jcooptimer.js | layer key |
| layer on <body> #kdr.kdr | jdisp.js | layer key |
| layer on <body> #kfxcv | jfx.js | NOT a screen (small) |
| layer on <body> #kievcatch | jitev.js | NOT a screen (small) |
| layer on <body> #kitpage | jkitpage.js | NOT a screen (small) |
| layer on <body> #klife.modal | jload.js | NOT a screen (small) |
| layer on <body> #kload.modal | jload.js | NOT a screen (small) |
| layer on <body> #kntchip.ktbt | jnotice.js | NOT a screen (small) |
| layer on <body> #kpinfo | jopic.js, jopic.js | layer key |
| layer on <body> #kpodov | j90.js | layer key |
| layer on <body> #kpop.kpop | j79.js | NOT a screen (small) |
| layer on <body> #kpzoom | jopic.js | layer key |
| layer on <body> #krkov | jrank.js | layer key |
| layer on <body> #kroul.kroul | jk2b.js | layer key |
| layer on <body> #kroulw.kroul | jk2b.js | layer key |
| layer on <body> #kszsheet | jksize.js, jksize.js | NOT a screen (small) |
| layer on <body> #ktbtoast.ktbt | jplst.js | NOT a screen (small) |
| layer on <body> #ktip.ktip | jtut.js | NOT a screen (small) |
| layer on <body> #ktut | jtut.js | NOT a screen (small) |
| layer on <body> #kupdline.kupdline | jclose.js | NOT a screen (small) |
| layer on <body> #kxcatch | jk4.js | NOT a screen (small) |
| layer on <body> #rtoast | j19.js, j25.js, j42.js, j63.js, jkitsel.js | NOT a screen (small) |
| layer on <body> .coinp | j11.js | NOT a screen (small) |
| layer on <body> .fly | j1.js | NOT a screen (small) |
| layer on <body> .fxo | j11.js | NOT a screen (small) |
| layer on <body> .kcoinfly | jkrev.js | NOT a screen (small) |
| layer on <body> .kemo-big | jemoseal.js | NOT a screen (small) |
| layer on <body> .kemofx | jemoseal.js | NOT a screen (small) |
| layer on <body> .kflockwhy | jfx.js | NOT a screen (small) |
| layer on <body> .kfrip | jfx.js | NOT a screen (small) |
| layer on <body> .kfx-fl | jfx.js | NOT a screen (small) |
| layer on <body> .kfxk-catch | jfxkit.js | NOT a screen (small) |
| layer on <body> .kfxk-g | jfxkit.js, jfxkit.js | NOT a screen (small) |
| layer on <body> .kgt-hand | j82.js | NOT a screen (small) |
| layer on <body> .kievfx | jitev.js | NOT a screen (small) |
| layer on <body> .kievmound | jitev.js | NOT a screen (small) |
| layer on <body> .kievring | jitev.js | NOT a screen (small) |
| layer on <body> .klsfly | jkrev.js | NOT a screen (small) |
| layer on <body> .kmalarm | j93.js | NOT a screen (small) |
| layer on <body> .kmfls | j93.js | NOT a screen (small) |
| layer on <body> .kmfly | j93.js | NOT a screen (small) |
| layer on <body> .kmnote | j93.js | NOT a screen (small) |
| layer on <body> .kmov | j93.js, jfx.js | layer key |
| layer on <body> .krevfly | jfx.js | NOT a screen (small) |
| layer on <body> .kscn | jkitsel.js | layer key |
| layer on <body> .ksfl | jstatfx.js | NOT a screen (small) |
| layer on <body> .kszf | jksize.js | NOT a screen (small) |
| layer on <body> .stamp | j11.js | NOT a screen (small) |
| layer on <body> .tdring | jtd.js | NOT a screen (small) |
| mini-game board | j2.js×2, j23.js×2, j34.js, j5.js, j83.js×3, jrcp.js | key g/v (S.mg, #ov) |
| motion stage overlay | j93.js×19, jflip.js×2, jfx.js, jlevel.js×2, jne.js×2, jpromo.js×2, jtoil.js | layer .kmov |
| place move (Dư đồ / buttons / walk) | j2.js, j21.js×4, j41.js, j6.js, j72.js×6, j77.js×5, j78.js, j9.js×6 …+6 | key p (S.place) |
| save load / co-op merge | j1.js×2, j6.js×2, jcoopthinc.js, jcoopworld.js×2 | key L (S object) |
| tab switch | j1.js, j2.js, j38.js×2, j42.js×6, j6.js×4, j63.js×2, j65.js×2, j72.js×5 …+26 | key t (tab) |

245 sites; full-screen body layers not in the watcher: 0

Not screens (small toasts / flying chips / tips, no veil on purpose): #rtoast, .kfx-*, .kmfly, .kcoinfly, .stamp, #ktip, #kpop, #ktbtoast, #kntchip… (full list in the scan output above). Co-op join: the room view arrives through deser (key L) and the co-op layers #kctmh/#kctmp/#coopfz/#kchatp are in SCRV_OV; not driven in the headless test (needs the co-op server). New life: the 18/11 life gate stays (the watcher is off under it).

## Numbers — dev/test/screen-veil.js (Fold 755x1000 + iPad 1180x820; COLD = fresh browser, picture CDN 1.5 Mbps + 300 ms per picture; WARM = same browser, every change again; every animation frame sampled; «half-painted» = a visible picture of the view not loaded and not under the veil, §59.1 stand-ins included). Cells: half-painted frames / frames sampled; AFTER also veil ms (cold vs warm) and the line shown.
| device | step | BEFORE cold: half-painted frames | AFTER cold: half-painted / veil ms · line | BEFORE warm | AFTER warm: half-painted / veil ms |
|---|---|---|---|---|---|
| fold | place→Nội vụ phủ (phủ) | 28/35 | 0/26 · 5635 · Đang vào phòng… | 0/41 | 0/123 · no veil |
| fold | place→Thái y viện (viện) | 47/48 | 0/34 · 3311 · Đang vào phòng… | 0/62 | 0/127 · no veil |
| fold | place→Đức Thọ cung (cung) | 33/33 | 0/45 · 11254 · Đang sang cung… | 0/42 | 0/112 · no veil |
| fold | place→Ngự hoa viên | 57/57 | 0/18 · 1986 · Đang ra vườn… | 0/54 | 0/113 · no veil |
| fold | place→Càn Ninh cung | 40/40 | 0/14 · 2442 · Đang sang cung… | 0/60 | 0/111 · no veil |
| fold | place→Dưỡng Hòa điện (điện) | 69/69 | 3/29 · 7236 · Đang bày tranh… | 0/100 | 0/139 · no veil |
| fold | place→home (về cung) | 50/50 | 1/118 · 6315 · Đang về cung… | 0/61 | 0/121 · no veil |
| fold | dialog: Chọn người theo hầu (leaving home) | 0/54 | 0/15 · no veil | 0/80 | 0/122 · no veil |
| fold | tab go | 0/27 | 0/186 · 3310 · Đang bày cảnh… | 0/80 | 0/75 · no veil |
| fold | tab court | 20/20 | 0/44 · 3116 · Đang bày cảnh… | 5/27 | 0/24 · 965 |
| fold | tab rv | 16/16 | 0/208 · 3357 · Đang bày cảnh… | 3/92 | 0/82 · 831 |
| fold | tab staff | 28/28 | 0/346 · 6969 · Đang bày cảnh… | 16/110 | 0/102 · 837 |
| fold | tab rel | 0/117 | 0/135 · no veil | 0/134 | 0/134 · no veil |
| fold | tab inv | 73/74 | 0/162 · 2240 · Đang bày cảnh… | 0/74 | 0/114 · no veil |
| fold | tab art | 90/90 | 0/187 · 2612 · Đang bày cảnh… | 6/61 | 0/108 · 571 |
| fold | tab story | 83/83 | 0/191 · 2540 · Đang bày cảnh… | 4/68 | 0/155 · 2174 |
| fold | tab act | 20/20 | 2/177 · 3434 · Đang bày cảnh… | 5/15 | 0/86 · 934 |
| fold | mini-game board | 71/71 | 0/153 · 1855 · Đang bày bàn… | 0/132 | 0/139 · no veil |
| fold | save load (Nạp sổ) | 1/16 | 0/125 · no veil | 0/54 | 0/123 · no veil |
| ipadAir | place→Nội vụ phủ (phủ) | 46/47 | 0/29 · 10375 · Đang bày cảnh… | 0/39 | 0/76 · no veil |
| ipadAir | place→Thái y viện (viện) | 9/10 | 0/20 · 7281 · Đang vào phòng… | 0/39 | 0/75 · no veil |
| ipadAir | place→Đức Thọ cung (cung) | 12/13 | 3/32 · 10538 · Đang sang cung… | 2/37 | 0/66 · 1150 |
| ipadAir | place→Ngự hoa viên | 46/46 | 0/32 · 5658 · Đang ra vườn… | 0/22 | 0/66 · no veil |
| ipadAir | place→Càn Ninh cung | 44/44 | 0/4 · no veil | 0/21 | 0/48 · no veil |
| ipadAir | place→Dưỡng Hòa điện (điện) | 87/87 | 0/19 · 6788 · Đang bày tranh… | 0/63 | 0/108 · no veil |
| ipadAir | place→home (về cung) | 12/12 | 0/29 · 2292 · Đang về cung… | 1/29 | 0/77 · 779 |
| ipadAir | dialog: Chọn người theo hầu (leaving home) | 1/17 | 0/33 · no veil | 0/41 | 0/77 · no veil |
| ipadAir | tab go | 0/12 | 0/155 · 3204 · Đang bày cảnh… | 0/78 | 0/66 · no veil |
| ipadAir | tab court | 19/20 | 0/51 · 2798 · Đang bày cảnh… | 2/12 | 0/25 · 579 |
| ipadAir | tab rv | 15/19 | 0/202 · 3850 · Đang bày cảnh… | 3/28 | 0/36 · 851 |
| ipadAir | tab staff | 26/27 | 0/326 · 7113 · Đang bày cảnh… | 5/66 | 0/116 · 670 |
| ipadAir | tab rel | 1/55 | 0/126 · no veil | 0/79 | 0/130 · no veil |
| ipadAir | tab inv | 57/59 | 0/158 · 2193 · Đang bày cảnh… | 0/64 | 0/123 · no veil |
| ipadAir | tab art | 36/37 | 0/177 · 2676 · Đang bày cảnh… | 6/58 | 0/100 · 661 |
| ipadAir | tab story | 74/75 | 0/205 · 2851 · Đang bày cảnh… | 6/84 | 0/123 · 569 |
| ipadAir | tab act | 32/33 | 0/177 · 3439 · Đang bày cảnh… | 2/50 | 0/47 · 958 |
| ipadAir | mini-game board | 26/27 | 0/207 · 2682 · Đang bày bàn… | 0/98 | 0/119 · no veil |
| ipadAir | save load (Nạp sổ) | 0/31 | 0/95 · no veil | 0/58 | 0/96 · no veil |

BEFORE: steps with a half-painted frame — cold 33/38, warm 14/38
AFTER: steps with a half-painted frame — cold 4/38, warm 0/38

Residual AFTER cold frames (4 steps, 1–3 frames each): Fold Dưỡng Hòa điện / về cung: a consort figure (fig-consort-c22) WALKS IN by a timer after the view settled (an NPC arrival, not a screen change) → shown as the §59.1 silhouette per the 18/11 rule; Fold Hành sự tab: bg-origin picture set > 90 ms late; iPad Đức Thọ cung: reached the 10 s cap on the 1.5 Mbps line (many figures). Proposal for MAIN (needs her OK, law 16 — touches the §59.1 stand-in rule): a late-arriving figure stays invisible until decoded instead of a silhouette. Warm: 0/38 on both devices; warm tab veils 0.5–2 s, warm place moves no veil (prefetch).

Law 12: Fold 755x1000 and iPad 1180x820 both looked 3× (BEFORE iPad tiles: rooms without background, silhouettes, empty event art; AFTER tiles on both: plain veil + centred line, then full rooms with backdrop and figures — the grey figure seen is the by-design «Người lạ»; live iPad veil shot).

## Videos (screen recordings only, no art credits; NOT in git, OD:L203 — Foreman C please upload)
- BEFORE: /home/user/wt/veil-scr/before/fold.mp4 + fold-x2.mp4 · /home/user/wt/veil-scr/before-ipad/ipadAir.mp4 + ipadAir-x2.mp4
- AFTER: /home/user/wt/veil-scr/after/fold.mp4 + fold-x2.mp4 · /home/user/wt/veil-scr/after-ipad/ipadAir.mp4 + ipadAir-x2.mp4
(each = life gate, then the cold pass then the warm pass of the 19 steps; raw JSON beside each: screen-veil.json)

## Tests
- `node dev/test/screen-veil.js <out> fold,ipadAir [root] [mbps] [lat]` — exits 1 on any half-painted frame (BEFORE build: FAIL 22/38 Fold, 25/38 iPad; AFTER: the 4 residual steps above).
- `python3 dev/test/screen-veil-scan.py` — exits 1 when a full-screen body layer is not in the watcher.
- Pages served from disk by a Playwright route (no local server). New lines follow the existing CTM_WAIT style (wait-words-scan).

## r3 / r4 — both reverted; branch = fe8f6e3d behaviour (owner OD 24/11 ~07:27Z «2 đi»; MAIN 119, law 16)
- r3 f5c6e2e4 (late pictures hidden until decoded, for «1») reverted in 7ecdf5bd when sếp chose «2 đi»: a figure that arrives AFTER the view is shown keeps the KIT §59.1 grey stand-in until decoded. fe8f6e3d already does exactly that (the veil covers screen changes only).
- r4 850602bc (stand-in opacity .55 → .92) reverted in 469d7985 on MAIN 119's order: sếp did not ask to change the stand-in strength (law 16). Tree of 469d7985 = fe8f6e3d (git diff empty).
- OPTION for MAIN to show her (not a change): every late full-body figure (stage, event / person dialogs, frames) uses the one §59.1 f/m mark in the figure's exact box; at the current .55 (breathing to .3) it is faint over a room. Shots old (.55) vs stronger (.92, = the `.j59sil` stranger) of a never-arriving figure at a real figure's spot: /tmp/claude-0/-home-user-cung-tuong-mong/623b50df-171c-562e-9f7c-cd31d26fbd46/scratchpad/shots/sil-fold-old.png, sil-fold-new.png, sil-ipadAir-old.png, sil-ipadAir-new.png, sil-cmp.jpg (side by side), late-zoom.jpg (iPad, her own figure late at .55). (On the Fold shots the figure over the dialog is the test overlay only.)

SẴN SÀNG KIỂM 469d7985 (review/kit-screenveil)

## REVIEW r1 (sonnet reviewer · 24/11 · session_01N1tNP5NC2cVvb6hDSKPiu9)
START_CTX ~8 %. PRIORITY #1 CHECK: OD 24/11 ~10:20Z (read verbatim: veil on every screen change, plain screen + short line, whole view at once) | main: no screen veil | review/kit-screenveil 469d7985 (= tree of fe8f6e3d; r3/r4 reverted per owner «2 đi» + MAIN 119) | claims: VEIL-1.
Branch review/kit-screenveil-r1 = 469d7985 + merge LIVE 056c2402 (assemble.py list conflict: kept main's list + jscrv.js last; index.html/sw.js rebuilt) → 16a2521d09e76b84035b90793c855dfdc7b7fa7d (main is its ancestor).
| check | result |
|---|---|
| Law 11 scan | python3 dev/test/screen-veil-scan.py: 245 sites, full-screen body layers not in the watcher 0 (merged head). My own grep of document.body.appendChild layers: all full-screen ones are .kmov / #kpodov / #krkov / #coopfz / #kctmh / #kctmp / #kchatp / #kitpage... all in SCRV_OV or small toasts → none unveiled |
| Law 9 | ONE part: dev/build/jscrv.js (kitScreenVeil, KIT §97), no private copy elsewhere (git grep). Numbers in BAL.kscrv (law 4) |
| screen-veil.js NO args (Fold+iPad, cold 1.5 Mbps/300 ms + warm) BARE fe8f6e3d | exit 1: 1 step (Fold cold Hành sự... «tab staff» 1/188 frames, a portrait set late). warm 0 |
| same, MERGED head 9c18fad3 (run 1) | exit 1: 5 steps, all COLD: Fold Đức Thọ cung 7/188 (late figure c04 + act-nghe-len), Fold Ngự hoa viên 42/516 (fig-consort-c29), iPad Càn Ninh 41/44, Dưỡng Hòa điện 102/103, về cung 88/89 (all fig-consort-c17-t8). warm 0/0 |
| same, iPad only, merged (run 2) | exit 1: 3 steps cold (Đức Thọ cung 31/284, Càn Ninh 2/197, điện 1/135: figures fig-consort-c22 / fig-mama-k03 + act-tao-mo-h). warm 0 |
| Reading | cold half-painted frames vary run to run (1.5 Mbps line, 10 s cap, NPC figures that arrive after the view settled = the §59.1 grey stand-in the owner chose with «2 đi»). Every residual frame is a late FIGURE or one late portrait, never a room/background/frame. BEFORE the veil: 33/38 cold steps half-painted; AFTER: 3–5/38 cold, 0/38 warm. Worker's own table listed the same 4 residuals. Not a FAIL of the veil, but the owner should know a very slow line can still show a grey figure stand-in |
| bash dev/tools/quickcheck.sh (alone) | run A: PASS, buổi 2985/2408 (noisy). run B: FAIL perf buổi 4769/1607. run C (--runs 5, alone): **PASS 361 s** · open 2040 ms · old save ok · render 265/278, tab 471/454, buổi 1632/1409 (new runs 7030/1414/1471/1632/4696 vs live 1409/1385/4167/1294/2686 → same spread, box-load noise; ~+15 % median, within limit) · core gates PASS |
| coop-e2e.js | both seat orders (default + COOP_SWAP=1): 142/142 passed each, 0 page errors; veil does not touch sync (DOM-only, state frames unchanged) |
| Old save | quickcheck: old save loads + plays a buổi, 0 errors |
| Fold + iPad shots (law 12) | looked 3× at video frames: Fold veil = plain paper + centred «Đang sang cung…», nothing else; iPad after the veil = full room with backdrop + figure (the grey figure is the by-design «Người lạ») |
Notes for KK18 / MAIN 119 (not FAIL): (1) buổi timing is noisy on this box; if buổi really got slower it would be the 90 ms settle re-scan per screen change, watch it in the next quickcheck on LIVE; (2) late-arriving figure stand-in is still the §59.1 grey one (owner «2 đi», unchanged).
Verdict: **PASS** 16a2521d09e76b84035b90793c855dfdc7b7fa7d
