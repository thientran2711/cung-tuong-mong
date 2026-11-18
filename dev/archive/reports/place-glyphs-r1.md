# place-glyphs-r1 — PASS 4298863ccfee23c9930cfc3da32392e747265976 (descends from origin/main feba37e)
Branch review/place-glyphs-r1 = review/place-glyphs 4ddddde + origin/main feba37e (index.html/sw.js conflicts resolved by rebuilding with build_site.sh) + 1 small fix.
## Checks
- Kit: all place glyphs go through KIT_PLACE_IC + kitPlaceIcon (kit icon part ic()), one size on map and list (measured: 19 map icons, all 14.0x14.0 at every viewport; list 23). r<N> and home share place-cung.
- CDN: 9 place-*.webp on CDN (8-15 KB each, listed in _index.json), none in git. No new CDN weight beyond ~100 KB total, loaded on demand; no new animation/particles. Budget OK.
- Tests: dev/test/act-dedupe-vp.js at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: FAIL 0, no page errors, no h-scroll. Own zoom script: min and max zoom, 13 px labels everywhere, no overlaps, no broken icons.
- Looked at @2 shots (1180x820, 755x1000) and 844x390: glyphs readable at 14 px; Nội vụ phủ scene stays unwired.
## Defect found and fixed (1)
Trường Môn viện (lc) chip is only ~56 px wide; the new 14+3 px glyph pushed its text out of the chip border at every viewport (OD:L1033 clipping rule). Fix in jact.js CSS: `.mspot .mlab:has(>.kplic){max-width:max(100%,calc(4.4em + 17px))}`. After: no clipped labels, no overlaps. Side effect: touch-avoid min zoom rose slightly (1180x820 fit 1.25 -> 1.5).
## Observations (not FAIL)
- Places nvp, tyv, thu, dtd, tn, kn still use older stat-style icons (bac, y-thuat, sung, duc, danh), not place-* glyphs; same size, slightly different style. Owner scope was the 9 new glyphs; consider a later pass.
- Map zoom buttons (top right) cover labels scrolled under them (pre-existing).
- 390x844: test reports rotate prompt not detected (pre-existing, not in this scope).
