# kk44h — KK44-H (helper of KK44), 26/11 ~19:20Z

PRIORITY #1 CHECK: OD 2 (26/11 ~18:35Z icons, ~18:45Z veils) | main jact.js kitPlaceIcon | review/map-zones-r7 9c8985ab | none for veils | claims KK44-H.

## Task A — review/kit-map-icons 354ae990 (on top of review/map-zones-r7 9c8985ab)
- KIT §78: place icon px = Ta marker px = `kitPlaceIcPx()` (KIT_MEMARK.mapBase 36 x rank scale x big); icon above the name; zone tags (jmapz) use it too.
- Scan `dev/test/map-icon-scan.js`: before Ta 28.9–38.1 vs icons 11.9–15.7 (Fold) / 11.9–14 (iPad); after icon = Ta in every view, above name, 0 label overlaps.
- Gap: no painted glyph for home-map spots, Ngự hoa viên areas, her courtyard, empty palaces → art KIT REQUEST (Foreman C). KIT_PLACE_IC.home still place-cung (place-home.webp exists on CDN): question open.
- LC24 session id from the brief was not found by send_message; MAIN 161 + KK44 informed.

## Task B — review/kit-veil-buoi 8655f6da (from LIVE main f573dc94)
- KIT §24b: `KIT_BVEIL` + `--kveil` on body[data-buoi]; tối sets nothing (old dark kept); 8 veils read `var(--kveil, old colour)`; #kdaytc excluded (text directly on it).
- Scan `dev/test/veil-buoi-scan.js` PASS both devices (tối = old on 8/8, other 3 buổi differ on 8/8).
- Limit: first-boot loading screen has no S.buoi yet → dark.

CDN stills: img/_review/kit-map-icons/ and img/_review/kit-veil-buoi/. Not touched: kitHand / kitPick / ring.
