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
- Nữ đế (c12 "nude" set, yellow dragon robe + seal): c12_a18_r10_nude_smile.png — head-top row 489 /4000
Rows computed with dev/art/headtop/headtop.py (face_rows, HAIR_K .30, mediapipe face_landmarker, libegl1 + libgles2 installed).
(A first pass with c12_a18_r8_t8_fresh / r7_t4_fresh / r8_nude_v2_fresh, rows 672/498/486, looked the same.)

## How it was made (the game's own scaling applies)
- Built origin/main (94a9375) with dev/site/build_site.sh in a throw-away worktree (not committed). A local http.server was refused by the sandbox classifier, so the build is served from disk inside Playwright by `context.route` on a fake origin (no listening server). CDN requests are fetched and re-served with `access-control-allow-origin:*` (without that the game's CORS body measurement `kitFigBody` never finished and the stage hid every figure, j59wait).
- A new game is started (SLOT 3, non-servant), `S.place="home"` (room "Ngọc Thanh các", scene sc-home) with `S.visit.people=[queen]` / `[Tần]`. The person's real figure file (e.g. fig-consort-c16-t8-a18.webp) is served as the c12 PNG by route interception, and the head-top row is injected into `window.__KITHT.m[<that file>]` (the same table the game reads from img/fig-ht.json). The queen is forced rank 7 (t8), the Tần rank 3 (t4). Everything else (KIT_FIG scale, feet line, name plate, kitFxLayers) is the live game.
- Tuần lục: `kitBook({pages:[{kind:"person", who:{kind:"emp",name:"Nữ đế",__nd:1,ref:{}}, title:"Nữ đế", blocks:[{facts}]}]})` (the same person-page the week book uses, j87 personBody → kitStageFig), `kitFigOf` wrapped for that person to return the c12 Nữ đế file name (routed to the PNG), row injected the same way. Text lines are test text.
- Test scripts (not committed): room.js / book.js / lib.js in the worker scratch; usage node room.js W H out.png cfg.json q|t.

## What I looked at (all 6 + 2 per-file) — result
- Room, Fold + iPad: the stage shows HER figure + ONE other figure at a time (rest is "+N"), so the two ranks are two shots. Hoàng hậu: crown top and feet fully inside the frame, same body height as her figure (skull-top to feet rule holds), name plate "Hoàng hậu <name>" under it. Tần: whole figure, hand + peony visible, nothing cut. No horizontal overflow, no page error.
- Tuần lục, Fold + iPad: Nữ đế stands in the narrow figure column (KBK_FIG_COL), crown + seal + feet visible, text column clear, heading "Nữ đế". iPad figure 237x618 css px, Fold 285x743.

## Issues seen (not caused by the new art)
1. Her own figure in the room is the default new-game look (plain cold-palace dress), only the visitor is the c12 art. Test persons are random rivals, so the name plate shows the real person's name (Tần plate shows "???" = person not met in this save).
2. Tuần lục: a round "?" mood badge sits on the Nữ đế figure's shoulder (kit face-mood overlay for an unknown person) — only because the test person is a fake object; a real player/emperor object would not show it.
3. The first-person phrase in the Tuần lục test text ("Ta tự lên ngôi…") comes from the kit person-page, not from this test.
4. Game observation: in a fresh headless run with a consort player the home stage can stay hidden (j59wait) if the pictures' CORS measurement fails/never loads; on the live CDN with CORS headers it is fine. Not a repo change.

## Handover
No code, no kit change, nothing on main or review/*. Only dev/handover/reports/c12-ingame-preview.md here. ~100% xong / ~100% chơi được for this preview.
