# PROGRESS review/tassel-fix (owner 15/11 06:35Z: portrait frames show the WHOLE jade pendant + tassel)

## Cause
KIT §28.1 / §28.0 cut every portrait cell at the end of the band (canvas y 795 of 1037: `aspect-ratio:550/795`, `.kin` 130.44 %), for the
person card (`.pc>.pcl>.pcp.kit`) and every small frame (`span.md.kfc`, mdH). So the ngọc bội + tua rua were cut in every place.

## Change (kit level, one place)
- `dev/build/jk2b.js` §1 + §9: cell = whole canvas `aspect-ratio:550/1037`, `.kin` height 100 %. Same cell WIDTH everywhere, so the photo window
  keeps its px size (no zoom / no shrink, jkpor fit untouched); the cell only grows downwards; text flows after it (layout box, no overflow).
- `span.md.kfc.kfc.kfc{box-shadow:none}`: the old round-avatar rank ring (`.md.kit.xs` 1px box-shadow, j60) drew a box around the small frame
  (now visible as a tall box around frame + tassel in Sổ ghi rows) — the frame art is the border.
- `kitPcWide` (jk2b): `--kpcw` from the container width INCLUDING its scrollbar share, so a card that becomes tall enough to scroll keeps
  the same portrait size (755x1000 Hoàng thượng card shrank 224→216 px without this).
- `dev/build/jk3.js` KIT 33 stage plaques: when the right column is still crowded after Ân sủng folds (phone landscape 844x390, plaques are
  taller now), the court plaques stand in two aligned columns (`.kshR.k3c2`) — Ân sủng chip and the figure name tags stay visible.
- `dev/build/jk4.js` header: width formula unchanged (`--kmeh` × 550/795 = same frame width as before); the pendant hangs below inside the header.
- KIT.md §28.0, §28.1, §4.1b note, §32.12 header line updated; kit page sample `§28.1` (jkitpage.js): card cell + mdH xs/sm/60/big + rows.

## Tests
- `node dev/test/tassel-scan.js <url> <WxH,...> <outdir> [oldsave|-] [1=shots]`: every `.kin` on 23 views (header, Hậu cung card + strip,
  Bảng phẩm vị, Cung nhân, Chí tôn ×2, Hoàng tự, Giao tình, Nam nhân, Phe phái, Sổ ghi, Hành sự, Tư trang, Mệnh truyện, Dư đồ, Hoàng thượng
  card, identity + face picker, gift recipients, Tuần lục pages, kit page): shown share of canvas, photo-window px, text over the pendant zone.
- `python3 dev/test/tassel-sites.py --fail`: static list of every pcPort/mdH/pframe call site; fails if a 550/795 cell or 130.44 % .kin is left.
- Before = origin/main b8a58e87 index.html (served from tmp/main), after = this branch. Results in the final report / commit message.

## Left / notes
- Rows with a small frame are taller (xs 26 px wide: 38 → 49 px), Hậu cung card portrait cell 30 % taller (same width): the Fold shows the
  first info rows a bit lower. Expected by the owner rule (whole tassel, no shrink).

## Review r6 (review/tassel-fix-r6, merged onto origin/main b0052d607, then 80be56be0 game-feel and eb7886c10 event-balance; tests rerun on the final merges)
- Merge: only built files conflicted (index.html, sw.js, assets.json -> rebuilt with dev/site/build_site.sh). jk2b/jk3 untouched on main;
  jk4 (kit-table §51 act-card table) + KIT.md auto-merged cleanly. tassel-sites.py --fail: 0 cut cells.
- tassel-scan 23 views x 5 sizes (new game) + 1180x820/844x390 (old save fixtures/world30-met.json): every frame shown 1.0 (main 0.767),
  photo-window px identical to main, no overflow, no page errors. The few "hit" entries are frames scrolled past the panel's bottom edge
  meeting the bottom nav in elementsFromPoint (false positive; screenshots checked).
- header-danh 5 sizes + old save: groups/alignment spread 0, no overlaps; header 71 -> 88 px at 1000x755 (accepted). The old-save
  'me/k3tc 3x40' box at 1000x755 is identical on main (pre-existing).
- kit-table 1180x820: 2 fails = legacy Bổng lộc dialog table (spread 9.8), identical on main (pre-existing, econ-stipend).
- ansung-inplace 5 sizes: opens in place, no popover, nothing cut (forced-crowd test now shows plaques in 2 columns). Normal 755x1000
  stage = owner reference an-sung-ok.jpg (one column, Ân sủng open). pane-bar 40/40 ok.
- Pre-existing (main too): palace labels above the Phi tần face strip are clipped at the top.
