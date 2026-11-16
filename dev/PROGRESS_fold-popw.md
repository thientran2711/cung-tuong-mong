# PROGRESS fold-popw (review/fold-popw) — 11/16

Bug 1: on the Fold one-page view (k3ph) opening any person card collapsed the grid (top bar 329 px, stage 0). Cause: `#popw.j59dock{grid-area:panel}` (j59) but the k3ph grid only has hud/stage/bar. Fix (jk3.js): `html body .game#game.k3ph.k3pop>#popw{grid-area:stage!important}`. KIT §31.7 note.
Bug 2: kit ✕ without a `.kph` header (`.kit-x.kxabs`, person / Hoàng thượng card) overlapped the card text / scrolled list. Fix (jk4.js, kit): reserved 48 px strip. KIT §32.10 note.
Scan: `node dev/test/fold-popw.js <device> <outdir> <tag>` (device = lib/device.js profile): person-card geometry, ✕ hit-test while scrolling, grid-area orphan scan over every tab. Only hidden orphans remain (#emp/#hud2 in the top bar, #stage on the map tab).
