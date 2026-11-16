# PROGRESS review/press-fx-r1 (reviewer, 16/11)
- Merged review/press-fx (bf4f654e3) onto origin/main 3ef079f61, then 2d038139e; built files taken from main and the site rebuilt.
- press-fx.js (755x1000, 1180x820, 844x390): 114 states (every tab x sub-tab + 2 dialogs), empty taps press NOTHING big or non-tappable (bad 0).
  Only hits: stage figure images (j59 own figure animation, tappable). Real buttons press: main tab, dialog option, act card (5 viewports).
- Fixes on r1:
  1. jfx kfTapOf: a REAL button may cover up to 70% of the screen (KF_BIGR); at 844x390 an act card is ~45% and got no press with the 30% cap.
  2. Owner "Nút tắt bị che": room person card #popw z 12 -> 41 (above the pane bar .kpbar z 40, which covered its ✕ in every tab with a bar);
     kitPcSize .kpbar top line: superseded by main KIT 45.2 (same fix); the ✕ follows the card's own scroll (--kpcxy, phones); jht sub-tab fit finds .ksub in .kpbar.
     Check "✕ on top" in press-fx.js: 30/30 (6 tabs x 5 viewports) after, 0/6 at 1180x820 before.
  3. Test: act card scrolled into view; ✕ check; SCAN=0 runs only the button checks.
- Known test artefact: at 755x1000 the act-card check after the ✕ loop reports "not found" (phone shell state); checked by hand: the act card presses (.kfdown).
