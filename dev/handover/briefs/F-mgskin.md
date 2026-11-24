PRIORITY #1 CHECK ('mgskin|mg-skin|skin.*mini|mini.*skin'): OD 2 | ledger 0 | claims 8 | main 15 | review/* 2 | archive 0  → reuse: KIT MG-SKIN LIVE 2a80712b (j82 kitMgSkinAdd / kg82SkinSrc, j79 kitBoardBg, KIT.md §MG-SKIN, reports/kit-mgskin.md). No img/mg/* on the CDN yet; no other worker on MGSKIN art.

# F-MGSKIN — mini-game visual skins, batch 1 (Foreman F, ART slice 2)
Coordinator: FOREMAN F (see dev/handover/FOREMAN_F_STATUS.md for the live F session id). Model: sonnet (art).

## READ FIRST (in full, handover branch claude/cung-tuong-mong-handover-hj0h8w)
CLAUDE.md; dev/rules/START_CORE.md (the 18 LAWS block first) + dev/rules/START_WORKER.md + dev/rules/START_ART.md; dev/art/FIGURE_GATE.md sections «LAW #0», «LAW #1», «I.1», «I.2» (scenes/backdrops) only; dev/handover/reports/kit-mgskin.md; KIT.md §MG-SKIN on origin/main.

## OWNER ORDER (verbatim, OD 23/11 ~23:05Z real, MAIN CHÍNH 113 chat)
"Rồi hiện tại trong game mình nó có 30 mấy cái medium đúng không? Nhưng mà tôi muốn nó đa dạng hơn về cái hình thức á, tức là về cái giao diện của nó, về cái không là giao diện mà là về cái hình, về cái mặt hình ảnh á. Tức là game này thì có thể là cái hình này, các cái nút chọn màu này, hình này chẳng hạn. Qua cũng tương tự, cũng là cái game đó nhưng mà sẽ là những cái hình khác, hiểu không? Nhìn cho nó đa dạng, nó đỡ chán mắt"
→ MAIN rule (OD): every one of the 39 mini-game kinds gets several LOOKS (skins) — board/background picture + piece pictures + the option-button colour set — e.g. by season / place / occasion; the SAME rules, a different look each time; ≥4 skins per kind, most-played kinds first; colour sets from the kit palette only; pictures Magnific gpt-2-6.

## YOUR JOB
Your kinds: see your launch prompt (4 kinds). For EACH kind paint 4 skins with these FIXED ids and palettes (the same 4 across all kinds so wiring is one table):
| id | look | kit palette |
| xuan | spring palace garden, blossoms, soft morning light | dao |
| ha | summer lotus pavilion by water, bright green shade | ngoc |
| thu | autumn hall, maple/ginkgo gold, warm afternoon | kim |
| dong | winter hall, snow outside lattice, brazier warmth, cool light | mac |
1. Find the kind's default art: board painting `img/kit/mg-<kind>-bg.webp` (and `-bg-hoc` where it exists) and its piece sprites `img/kit/mg-<kind>-*.webp` (CDN index https://ctm-img.victoria-tntt.workers.dev/img/_index.json). If a kind has no `mg-<kind>-bg` (e.g. td_cong, le), read its engine on origin/main (git grep the kind in dev/build/j*.js) to find what picture it draws as its board/background, and skin that; if it draws no painted board at all, write that in your report and skip it (do NOT invent a new board layout — Law 9).
2. Board painting per skin → `img/mg/<kind>-<id>.webp`: a gpt-2-6 EDIT of the default board (pass the default as the reference image) that keeps the SAME size, aspect ratio and the SAME layout/anchors (play area, empty centre, where pieces land, any painted rings/targets/slots the engine measures — BAL.mgArt ban/dauho are measured ON the picture: those shapes must stay pixel-identical in place; compare by overlay). Only setting, season, light and decoration change. `-bg-hoc` uses the same skin file (the resolver maps both to `img/mg/<kind>-<id>.webp`) — check the result reads well in both uses.
3. Piece sprites → `img/mg/<sprite>-<id>.webp` ONLY for decorative containers/tools whose look can follow the season (vase, hoop, censer, stove, pot frame, inkstone, board frame…), same pixel size, transparent, edges checked on dark + light. NEVER change a piece that carries game meaning (flower type, herb, ingredient, chess piece colour, thread colour, target rings, arrow) — those stay default.
4. Style: the game's painterly palace style (STYLE_ANCHOR = dev/art/FIGURE_GATE.md); no faces (OD:L544); no text/letters in the picture; no glossy floors; not "too AI" (OD:L86); not oversaturated (OD:L1257). WebP at display size, board ≤ ~250 KB, sprite ≤ ~40 KB (OD:L715).
5. Magnific: model gpt-2-6 ONLY, folderReference ba4aecfe-efce-47e2-b53f-30d292091886 (if this account cannot see it, folders_list and use/create a folder named "CTM MGSKIN" and say so in the report). LOOK at every image (creations_read) before you keep it; redo bad ones; log model + creation id per picture. If Magnific tools are missing in your session, STOP and report at once.
6. Upload: from a sparse worktree of origin/main put the files under img/mg/ and run `python3 dev/site/cdn_sync.py img/mg/<files>` (index rebuilds itself). Nothing goes in git. Before upload make ONE contact sheet per kind (default + 4 skins side by side, plus the board inside the real mini-game frame on Fold 755x1000 and iPad 1180x820 full screen if you can open it via KG82.preSkin after a local kitMgSkinAdd — dev/test/kit-mgskin.js is a Playwright template) → upload to img/_review/f-mgskin/<kind>-sheet.jpg and LOOK at it 3× (Law 12).
7. Uploading img/mg/ is safe: no skin shows until Foreman B's THIN P1 worker registers it with kitMgSkinAdd.

## REPORT (dev/handover/reports/F-MGSKIN-<your letter>.md on the handover branch; pull --rebase + push under the flock recipe)
Starts with your own PRIORITY #1 CHECK line. Then per kind: a block exactly like
«FOR MAIN MGSKIN <kind> keys» kind=<kind> skins: xuan(dao, name «…»), ha(ngoc, «…»), thu(kim, «…»), dong(mac, «…») | boards: img/mg/<kind>-xuan.webp … | sprites: img/mg/<sprite>-<id>.webp … | sheet URL | gens: <count> (creation ids)
Names: short cổ trang Vietnamese labels per dev/kit/VANPHONG.md (e.g. «Xuân viên», «Hạ trì», «Thu các», «Đông điện» — vary per kind if fitting). When done, append ONE line at the end of dev/handover/FOREMAN_F_STATUS.md: "WORKER F-MGSKIN-<letter> DONE <UTC>: <kinds> keys in reports/F-MGSKIN-<letter>.md".

## LAWS (binding)
Never push to main; no PR; never message the owner; never ask her about pictures. Disk: sparse worktrees under /home/user/wt, `flock /home/user/wt/fetch.lock git fetch --depth=30 origin +<ref>:<ref>`, never full-clone, never git pull. Kill only your own browser processes.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
(Worker: at your limit write the handover in your report + a status line; Foreman F opens the successor.)

## BATCH 2 NOTES (Foreman F, 24/11 after batch 1 — read before you start)
- Batch 1 DONE (hoa banh huong kim ve theu dan co ban dauho; td_cong → theu skins, le → huong skins by inheritance). Look at its sheets for the bar: img/_review/f-mgskin/<kind>-sheet.jpg (default first column, then xuan/ha/thu/dong; boards on top, skinned sprites below).
- INHERITANCE: many kinds draw ANOTHER kind's board (e.g. td_cong draws theu-bg-hoc, le draws huong-bg). The resolver names the file after the BOARD, not the kind. If your kind's board belongs to a kind already skinned (batch 1 list above, or another kind in your own list), paint NOTHING for it; report «<kind>: inherits <board kind> skins». Only paint boards nobody has skinned yet. Two of your kinds sharing one board = paint that board once.
- Sprite file names have no "mg-" prefix: default img/kit/mg-<sprite>.webp → skin img/mg/<sprite>-<id>.webp.
- Magnific folder ba4aecfe… is not visible on this account: results go to Personal; that is fine, just log creation ids.
- Your kinds are in your launch prompt; report file reports/F-MGSKIN-<letter>.md.
