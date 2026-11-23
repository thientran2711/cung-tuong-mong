# REVIEW-N13 — review/places-swap-n13 @569f891 — PASS

PRIORITY #1 CHECK: OD owner 23/11 03:25Z + L2391 (structure-true windows, Khôn Ninh keeps old); PLACES5.md + SWAP_N13.md read; claims PLACES5 N13.

1. Diff: 2 files only (dev/art/place-rank/SWAP_N13.md, dev/test/places-swap-look.js), both new; zero game code. Branch base 81d76c8b, main now 52ad65b3 (+6 commits), none touch these 2 files, so a merge is conflict-free. SAFE to land. (Laws touched: none of the 18 beyond art-swap; no UI, no kit use.)
2. Look script run against LIVE (thientran2711.github.io/cung-tuong-mong) at 755x1000@2 + 1180x820@2: all 12 cards load `<place>-ha-sang.webp` from CDN. I also downloaded the 6 live CDN pictures and viewed them full-size:
 - a-ca-so: window wall left = shut lattice, no drapes; wall behind bed solid; bed curtains/bow/sword/scroll/screen intact. OK
 - ngu-thu-phong: window shut lattice, red dragon pillars, dragon screen, desk/dais OK
 - tu-ninh-cung: shrine + Buddha + amber hangings on solid wall (allowed), right window shut lattice no drapes. OK
 - dong-cung: map hangs on the right on a solid carved red-lacquer wall panel (lattice transom only above), not on a window. Judged OK; left window no drapes.
 - thuong-thu-phong, phi-tan-cung: window walls/moon gate as original, no drapes, hung scrolls/panels on solid white wall. (Right-side sash of phi-tan-cung/thuong looks ajar — original already had it, per PLACES5 "KEEP".)
 - No captions/text in any of the 6.
 - khon-ninh-cung-ha-sang.webp (138 KB) is still the old picture (red pillars, white drapes, phoenix screen) = untouched, as required.
3. Page errors: 0 at both sizes.
Notes (not blocking): rig card shows "undefined"/"r0" (rig's bare card, not the game). Only hạ-sáng base swapped; the other 15 season×buổi variants per place are still old (known later job).
Shots in scratch only (not in git). VERDICT: PASS. Landable sha: 569f8916 (merge/rebase onto current main; files disjoint).
