# kit-item-big — KIT KEEPER Group 2 (IT01), ROOT-77 queue — RESULT: ALREADY BUILT; delta = scan + guard test + art-gap list
PRIORITY #1 CHECK: GAP_LIST IT01 + reports/item-big.md KIT REQUEST | main: KIT §28.13b «BIG ITEM · frameless + hi-res» (kit-keeper-2, jk2b kitItem / kitItemBigSrc) — KIT READY and live | review/*: item-big adda3201 (the old request) | claims: this worker.

## Finding
The three asks of reports/item-big.md are already on main (KIT §28.13b):
1. frameless lg / xl: no border, ground, shadow, clip, tier image; soft drop shadow; floating chips stay; grade chip on the bottom edge; `frame:true` opt-in;
2. `kitItemBigSrc`: a small `img/item-X.webp` is requested as `img/item512/item-X.webp` (relative and CDN-prefixed), fallback to the small file on error (one swap);
3. so the call sites that pass the small src (jgift, jinv, jkrev, jmark, jshelf …) are hi-res WITHOUT being touched; pets already ask `img/pet512/` themselves (`petSrc(k,1)`).
Switching call sites would only duplicate the kit mapping (law 9/14), so I changed NO game code.

## What this branch adds (branch `review/kit-item-big` @ bbe1b20f, no code change: tests + KIT.md)
- `dev/test/item-big-scan.py`: every lg / xl `kitItem` call site classified (24: 9 gave512 · 5 auto512 · 3 pet512 · 4 veil · 2 wd icon · 1 ghost; «other» = exit 1); `--index <CDN img/_index.json>` prints the items with no 512.
- `dev/test/kit-item-big.js` PASS: scan clean; item → item512 (relative + CDN-prefixed); item512 / pet512 / wd / veil / empty unchanged; lg / xl ask the 512 file and are frameless, md / slot keep the small file and the frame; data-fb fallback present.
- KIT.md §28.13b «IT01 CHECK» paragraph (the table + the gap list).
- Existing `dev/test/item-big.js`: its two REAL-page checks (loseNotice, bagPopupKeepsFrame) print «popup: null» in my sandbox (new life has an empty bag, kinvItems()[0] undefined) — a test-setup limit, not a kit regression; the synthetic checks of the same test pass.

## ART GAPS for Foreman C (not drawn here)
- 22 items with no item512: a-giao, bo-dieu, bot-ngua, dan-co, gam-to-chau, hac-dinh-hong, hinh-nhan, huong-tram, lua-hang-chau, nghien-muc, ngoc-boi-ban, nhan-sam, phan-son, thu-nha, thuoc-an-thai, thuoc-giai, tram-phuong, tranh-co, tui-thom, vong-ngoc, xa-huong, yen-sao.
- 213 wardrobe icons `img/wd-*.webp` have no big twin (`img/wd512/` = 138 garment paintings of another set) — shown big in the wardrobe pop-up (jwdinv.js:98/134).
- 4 veil paintings `img/veil-<tier>.png` (single size) at lg (jveil.js:147/175/217, jinv.js:343).
- 44 `img/pet-stage/` pictures (pet512 covers the 98 `img/pet-*.webp`).

## Tests / not run
kit-item-big PASS. QUICKCHECK not run: the diff vs origin/main is tests + KIT.md only (built game identical). golive.sh not run.
