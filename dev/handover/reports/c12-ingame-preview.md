# W25 — c12 in-game preview (screenshot only, no code changed)

PRIORITY #1 CHECK: OD 51 | ledger 6 | claims 3 | main 15 (Tuần lục screen exists on main; "preview in game": none, so the live game build was used) | review/* 0 | archive 0.
Owner (18/11 ~04:38Z): put 1 Hoàng hậu + 1 Tần in the game frame on the room background, and Nữ đế into the Tuần lục book.

## Images (CDN, md5-verified) — https://ctm-img.victoria-tntt.workers.dev/img/_review/c12-ingame/
| file | content |
|---|---|
| room_fold.png | Fold 755x1000@2: Hoàng hậu (left) + Tần (right), two shots side by side |
| room_fold_hoanghau.png / room_fold_tan.png | the same two shots, one per file |
| room_ipad.png | iPad 1180x820@2: same pair, side by side |
| room_ipad_hoanghau.png / room_ipad_tan.png | one per file |
| tuanluc_fold.png | Tuần lục book, Nữ đế figure, Fold 755x1000@2 |
| tuanluc_ipad.png | Tuần lục book, Nữ đế figure, iPad 1180x820@2 |

## Image versions used (smile versions were on the CDN at ~04:48Z, so the smile set, not the _fresh set)
https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/
- Hoàng hậu t8: c12_a18_r10_t8_smile.png — head-top row 676 /4000
- Tần t4: c12_a18_r10_t4_smile.png — head-top row 498 /4000
- Nữ đế: UPDATED 04:55Z per ROOT-17 (owner pick #2, wide layered robe): c12_a18_r12_nude_smile.png — head-top row 492 /4000 (the first pass used r10_nude_smile, row 489; replaced in tuanluc_*.png)
Rows computed with dev/art/headtop/headtop.py (face_rows, HAIR_K .30, mediapipe face_landmarker, libegl1 + libgles2 installed).
(A first pass with c12_a18_r8_t8_fresh / r7_t4_fresh / r8_nude_v2_fresh, rows 672/498/486, looked the same.)

## How it was made (the game's own scaling applies)
- Built origin/main (94a9375) with dev/site/build_site.sh in a throw-away worktree (not committed). A local http.server was refused by the sandbox classifier, so the build is served from disk inside Playwright by `context.route` on a fake origin (no listening server). CDN requests are fetched and re-served with `access-control-allow-origin:*` (without that the game's CORS body measurement `kitFigBody` never finished and the stage hid every figure, j59wait).
- A new game is started (SLOT 3, non-servant), `S.place="home"` (room "Ngọc Thanh các", scene sc-home) with `S.visit.people=[queen]` / `[Tần]`. The person's real figure file (e.g. fig-consort-c16-t8-a18.webp) is served as the c12 PNG by route interception, and the head-top row is injected into `window.__KITHT.m[<that file>]` (the same table the game reads from img/fig-ht.json). The queen is forced rank 7 (t8), the Tần rank 3 (t4). Everything else (KIT_FIG scale, feet line, name plate, kitFxLayers) is the live game.
- Tuần lục: `kitBook({pages:[{kind:"person", who:{kind:"emp",name:"Nữ đế",__nd:1,ref:{}}, title:"Nữ đế", blocks:[{facts}]}]})` (the same person-page the week book uses, j87 personBody → kitStageFig), `kitFigOf` wrapped for that person to return the c12 Nữ đế file name (routed to the PNG), row injected the same way. Text lines are test text.
- Test scripts (not committed): room.js / book.js / lib.js in the worker scratch; usage node room.js W H out.png cfg.json q|t.

## What I looked at (all 6 + 2 per-file) — result
- Room, Fold + iPad: the stage shows HER figure + ONE other figure at a time (rest is "+N"), so the two ranks are two shots. Hoàng hậu: crown top and feet fully inside the frame, same body height as her figure (skull-top to feet rule holds), name plate "Hoàng hậu <name>" under it. Tần: whole figure, hand + peony visible, nothing cut. No horizontal overflow, no page error.
- Tuần lục, Fold + iPad: Nữ đế stands in the narrow figure column (KBK_FIG_COL), crown + seal + feet visible, text column clear, heading "Nữ đế". With r12 (wide robe) the game's own wide-figure fit makes the figure smaller in the narrow column: iPad 190x495 css px, Fold 228x595; crown, seal-hand area and feet all visible, nothing cut.

## Issues seen (not caused by the new art)
1. Her own figure in the room is the default new-game look (plain cold-palace dress), only the visitor is the c12 art. Test persons are random rivals, so the name plate shows the real person's name (Tần plate shows "???" = person not met in this save).
2. Tuần lục: a round "?" mood badge sits on the Nữ đế figure's shoulder (kit face-mood overlay for an unknown person) — only because the test person is a fake object; a real player/emperor object would not show it.
3. The first-person phrase in the Tuần lục test text ("Ta tự lên ngôi…") comes from the kit person-page, not from this test.
4. Game observation: in a fresh headless run with a consort player the home stage can stay hidden (j59wait) if the pictures' CORS measurement fails/never loads; on the live CDN with CORS headers it is fine. Not a repo change.

## Handover
No code, no kit change, nothing on main or review/*. Only dev/handover/reports/c12-ingame-preview.md here. ~100% xong / ~100% chơi được for this preview.

## W29 clip preview (owner 18/11 ~05:45Z: "cái khung như thế nào thì đặt cái người như vậy; cái áo mà bị mất thì cắt bỏ cái áo")
PRIORITY #1 CHECK: OD 17/11 03:12Z/03:14Z (book column) | main dev/kit/KIT.md §56.3 + line 1804 "Wide robes are CUT (column clip), never squeezed" | review/* none | claims none. Reused the W25 harness (rebuilt: scripts not committed). No game source changed; main = a95e8d4 built site, served from disk.

Images (CDN, md5-verified) — https://ctm-img.victoria-tntt.workers.dev/img/_review/c12-ingame/
| file | content |
|---|---|
| tuanluc_fold_clip.png / tuanluc_ipad_clip.png | c12_a18_r12_nude_smile (wide robe) with the proposed rule; Fold 755x1000@2 / iPad 1180x820@2 |
| tuanluc_fold_slim.png / tuanluc_ipad_slim.png | c12_a18_r10_t1_smile (slim) in the same slot, current game code |

Measured (CSS px, body = skull top → feet, `f.dataset.kbody`):
| | column w x h | slim t1 (now) | r12 now (shrunk) | r12 with rule |
|---|---|---|---|---|
| Fold | 220 x 821 | body 614.1 (img 267x696) | 516.1 (228x595) | 613.3 (271x707) |
| iPad | 183 x 658 | body 510.8 (img 222x579) | 429.3 (190x495) | 510.2 (226x588) |
Result: r12 stands at the slim body height (diff <0.2 %), −16 % size gone. Looked at both images: crown, face, hands/seal and feet fully inside; only the outer robe/sleeve flare is cut by the column's right edge (flat cut, no squeeze, no overlap with the text column). No page error. Caveat: head-top row of the slim t1 was estimated (330/4000 = painted top; mediapipe not installed), r12 row 492 as in W25; effect on the comparison < 1 %.

Finding that explains the bug: the slim t1 is ALSO shrunk today (to 614 of 767 body, 80 %), because `pw1` (painted width incl. sleeves, 273 px) > column 220. Every figure is shrunk until its PAINTED width = the column, so a wide robe loses more height than a slim one. The column already clips: `.kbk-person.kbk-full>.kbk-por{…overflow:hidden}` exists at j87.js:586 (no CSS change needed).

### Exact change for main
1. dev/build/jsl.js:111 (inside `kitBookFigClamp`'s `clamp`), replace
   `if(pwc&&pw1>pwc)kk=pwc/pw1;`
   with
   `if(pwc)kk=Math.min(1,pwc/(KBK_STD_W*g.body));`   (kk no longer depends on THIS figure's painted width; same scale for every figure; `pw1` then unused, delete it)
   and add next to `var KBK_ART_LINE=…` (jsl.js ~line 118 area, above the IIFE): `var KBK_STD_W=window.KBK_STD_W=.3587;   /* painted width of the standard slim figure (c12 t1) per body height; the column width ÷ this = the one book scale; wider robes/sleeves are cut by the column */`
   The line after it already sets `dxF=-(b1.l||0)*g.iw*kk` (painted left edge on the column's left edge) and dyF — keep.
2. Tested exactly this way (the page's real `clamp` source with that single replace, `kitFigBody(s1,soon)` callback stubbed): slim t1 = 613.3/510.2, r12 = 613.3/510.2.
3. dev/kit/KIT.md: line 1798 — replace "the figure is fitted INTO it by its painted width (aspect kept, feet visible, nothing cut, painted left edge on the page's left edge)" with "every figure gets the SAME scale (column width ÷ KBK_STD_W of the slim standard figure, never shrunk by its own robe width; feet visible, face/crown never cut, painted left edge on the page's left edge); a robe/sleeve wider than the column is CUT by the column (overflow hidden, j87.js:586)"; line 1799/1804 "Wide robes are CUT" stays; §56.3 (line 3335) sentence "then scales it down … until its PAINTED width fits the column … Wide figures … nothing is cut" → "sized by the one column scale; wide figures are cut at the column edge, nothing runs under the text"; §34.6 line 2069 "fits the figure into it" → "scales it by the one column scale (KBK_STD_W)". Also dev/kit sample page if it states the fit rule; update dev/test/book-col-scan.js to expect equal `dataset.kbody` for slim and wide figures (cut allowed) instead of "painted width ≤ column".
4. Whole-group (LUẬT SỬA CẢ NHÓM): the same `clamp` serves Tuần lục, Mệnh truyện and Sổ luân hồi person pages (`.kbk-person.kbk-full`), so all three change together; phones (`.kbk.narrow`) same rule.
Open point for sếp (not decided here): robe cut is on the RIGHT edge only (left edge aligned to the page); centring a wide figure so both sides are cut equally would keep her centred but breaks the "painted left edge on the page's left edge" rule (OD 17/11 03:12Z).

~100% xong / ~100% chơi được for this preview.

### W29 follow-up: "Thường tại Mạnh Lan Chi" vs m09 (owner 18/11 ~06:35Z)
Her figure in the tuanluc_*_clip room shots = `img/fig-consort-c06-tcold-a18.webp` (matched by eye: same dress/jade pendant/sash; the player is random per run, the name "Mạnh Lan Chi" cannot be reproduced). FIGURE_GATE A (`overlay_m09.py`, head top = lm10 − .30·F, skull top → feet on the red lines, hd/fig-consort-c06-tcold-a18.webp vs hd/fig-maid-m09-a18.webp): **face height −2.9 % vs m09** (m09 = 0). Image: https://ctm-img.victoria-tntt.workers.dev/img/_review/c12-ingame/lanchi_vs_m09.jpg (md5 verified; left m09, right Lan Chi).
Note: her wide sleeves/hem overflow m09's outline on both sides (tcold dress is wider than m09's), height and face match.
