# rv-kit-badge — FAIL (N4: ⏸ unreadable)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~06:30Z canon overwrite of the 06:05Z Hảo hữu icon: avatar icon in a corner of the FIXED top bar, grey offline / full colour online, green ✓ ready, «…» busy, no long text), reports/rv-hao-huu.md note N4 («⏸ in the badge … barely readable at 10 px → K-BADGE-HAOHUU must fix the size»), KIT.md §77b, CLAIMS; reuses the kit square rail button .krailb, no custom chip. Older rules on the element: badge words none (canon: no long text) — OK.

Branch: review/kit-badge-rv = keeper 36b6071e + LIVE fdabfb44 (index/sw rebuilt), sha 8e440a19583074b11fa1057da0c34877f7368840. kit-badge.js PASS (it asserts markup/colours only, not size legibility).

FAIL — N4 not fixed: .krailb .kbdg is font:700 10px/15px in a 15 px round badge on a 44 px button (computed fs 10px, 15x15, identical on Fold 755x1000 and iPad 1180x820 — no scaling). At 3x zoom ✓ is readable, «…» is three tiny dots, ⏸ is two ~2 px white bars (barely recognisable, system-ui font fallback); on a real phone the ⏸ reads as a blob. rv hao-huu explicitly asked for the size fix.
Fix: raise the badge to >= 20 px with >= 13 px glyphs, and draw ⏸ with two CSS bars (not a font glyph) so it is font-independent; keep the 1.5 px ring and pointer-events:none; add a check to kit-badge.js: computed badge >= 20 px and font >= 13 px on both viewports (and a pixel check that the pause glyph is >= 8 px tall).
Otherwise fine: ✓ green / «…» grey / ⏸ amber / none, .koff greys the picture (not the badge), sample §77b present.
Not run after the FAIL: quickcheck/coop-e2e (stopped; CSS-only part).
