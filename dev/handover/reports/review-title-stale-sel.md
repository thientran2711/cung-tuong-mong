PRIORITY #1 CHECK ('addReplay|Xem lại lời dặn|title-stale-sel'): OD 0 | ledger 0 | claims 2 | main 14 | review/* 1 | archive 5

# Review title-stale-sel (D12 → D ROOT)

Reviewed `review/title-stale-sel` @bc853163f009a48197f5861bc4a7c7d0c974f4a8. Origin/main had moved to 550dd1b (cloth-bake); I merged it (only index.html/sw.js conflicted, rebuilt with build_site.sh) on `review/title-stale-sel-rv` = 4842ab4213c9618aff047beaaa45862441d314f6 (FF from origin/main 550dd1b).

## Checks
1. Replay button: shows once on the ☰ title home, kit `.kbtn.alt` full-width row under Bảng vàng / Thiết lập, same look as siblings. Click closes the menu and returns to the game (behaviour test, not only presence). Hidden when S.dead and when the bot flag is set. PASS.
2. Own family scan of dev/build (data-tgo, `cont`, `.slot`, `#slots`, data-load/new/ask/cstab/kcs, `.kpmenu`, `.kpt-mount`, showTitle wrappers): no dead hook left. Only stale item besides the five in the worker table is the old `.slot` fallback rows in j6.js:80 (still drawn by showTitle, then replaced by j74 drawSlots; `.slot` count on screen = 0, test asserts it). jtut:398 now `[data-tgo="slots"]`. Remaining data-tgo readers (jrank:220 past, jload:99 opt, jnotes:63, jcooplobby:101, j74 go/mr) all match what j74 renders. PASS.
3. kc/kd labels: slotWho now covers srv, kc, kd; used by Chọn sổ rows (kitRows "Kiếp"), home "Tiếp tục" line, jcloud, jslots. Removed patches searched `.slot .past`, which no longer exists, so nothing that worked is lost; labels visible and kit-styled in the shots. Test checks all four slotWho outputs. PASS.
4. Gates: one-core-guard 0 fails (3839/3842). quickcheck 3 runs on the worker sha: all PASS (render 200/164, 184/172, 179/156; buổi 952/852, 775/753, 841/998; longTaskMaxMs 1741/1615, 1667/1718, 1451/1511 vs live, so the worker's first-run failure was noise). Quickcheck on the merged sha: PASS (render 204/225, buổi 916/1073). title-stale-sel test ALL PASS at 755x1000@2, 1180x820@2, 412x1058@2 (and again on the merged build at the first two). Shots LOOKED at for all three sizes, title + slots: no overlap, nothing cut. The 412 cover shows the expected rotate-phone prompt. No page errors.

Shots in scratch only, nothing on the CDN, nothing in git. coop-e2e not run (no co-op code touched).

Minor note (not a FAIL): if a live kiếp has no saved sổ, the replay click falls back to closing the menu (no resume); tour still starts when the screen is free.

PASS 4842ab4213c9618aff047beaaa45862441d314f6
