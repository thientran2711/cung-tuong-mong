# night-end-r3 review (session_01UV1SzkTTgASxgc7UuFiJDs)
Branch review/night-end-r3 @ 5424f508 (r2 ea39adaf + origin/main cdad7109 merged, site rebuilt via build_site.sh).
Merge: conflicts in assemble.py (main list + jne after jevb), jk4.js (took main), KIT.md (kept §62 + §67), generated files rebuilt.
Tests (dev/test/night-end.js, night-end-r3.js; viewports 755x1000, 1180x820, 1366x1024, 412x1058, 390x844, 844x390): 0 page errors, no horizontal overflow, no cut text, button on screen at all sizes, painted only (0 gradient/code art), 3 tiers + lonely/dawn beats OK, night dialogs on light kit panel (dark_panels.py: 1 rule = generic backdrop; main has 5).
Test fix: night-end.js now calls kmReset() after cleanup (a removed scene left kmBusy true and held the card back; test artifact, not a game bug).
Kit consistency: card uses kitRows/kitItem/kitGradeChip/kbtn; no private parts.
Pending: end-button. Night card already ends with Nhận / Tiếp tục. Lonely + dawn beats still close by tap ("Chạm để bỏ qua"); scene-end kit part not on main yet. Main wires it in the sweep.
Result: PASS (end-button pending).
