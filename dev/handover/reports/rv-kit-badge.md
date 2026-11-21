# rv-kit-badge — FAIL (N4: ⏸ unreadable)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~06:30Z canon overwrite of the 06:05Z Hảo hữu icon: avatar icon in a corner of the FIXED top bar, grey offline / full colour online, green ✓ ready, «…» busy, no long text), reports/rv-hao-huu.md note N4 («⏸ in the badge … barely readable at 10 px → K-BADGE-HAOHUU must fix the size»), KIT.md §77b, CLAIMS; reuses the kit square rail button .krailb, no custom chip. Older rules on the element: badge words none (canon: no long text) — OK.

Branch: review/kit-badge-rv = keeper 36b6071e + LIVE fdabfb44 (index/sw rebuilt), sha 8e440a19583074b11fa1057da0c34877f7368840. kit-badge.js PASS (it asserts markup/colours only, not size legibility).

FAIL — N4 not fixed: .krailb .kbdg is font:700 10px/15px in a 15 px round badge on a 44 px button (computed fs 10px, 15x15, identical on Fold 755x1000 and iPad 1180x820 — no scaling). At 3x zoom ✓ is readable, «…» is three tiny dots, ⏸ is two ~2 px white bars (barely recognisable, system-ui font fallback); on a real phone the ⏸ reads as a blob. rv hao-huu explicitly asked for the size fix.
Fix: raise the badge to >= 20 px with >= 13 px glyphs, and draw ⏸ with two CSS bars (not a font glyph) so it is font-independent; keep the 1.5 px ring and pointer-events:none; add a check to kit-badge.js: computed badge >= 20 px and font >= 13 px on both viewports (and a pixel check that the pause glyph is >= 8 px tall).
Otherwise fine: ✓ green / «…» grey / ⏸ amber / none, .koff greys the picture (not the badge), sample §77b present.
Not run after the FAIL: quickcheck/coop-e2e (stopped; CSS-only part).

## Round 2 — PASS

Keeper r2 8bf7b164 (badge 20 px, glyph 14 px, ⏸ = two 3x10 px CSS bars, 2 px ring, pointer-events none kept; kit-badge.js now asserts badge >= 20, glyph >= 13, pause bars >= 8 px tall) + LIVE 92633f1d (index/sw rebuilt) = review/kit-badge-rv2 sha 9a05a7074a9a51b462bb531dfa7b4f96c50a855c.
- N4 fixed: computed badge 20x20, fs 14 px (✓ …), ⏸ drawn as two white 3x10 bars (font-size 0) — identical on Fold 755x1000 and iPad 1180x820; at 3x zoom ✓ clear, «…» three readable dots, ⏸ two clear bars. kit-badge.js PASS both viewports.
- Canon OD 21/11 ~06:30Z kept: green ✓ ready, «…» busy, ⏸ paused (no words), .koff greys the picture only, no long text; badge sits at the button corner (right/bottom −7 px) — hao-huu must keep that corner un-clipped in the top bar.
- coop-e2e 92/92. QUICKCHECK PASS 268 s (render 307/298, tab 638/552, buổi 2692/1560 within the gate, core gates PASS, old save ok). No stray images in the tree.
