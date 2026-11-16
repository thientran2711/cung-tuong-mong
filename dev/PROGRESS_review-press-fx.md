# PROGRESS review/press-fx (owner 15/11: whole tab panel bounces on any tap)
Cause: jfx.js press handler used `closest('button,.btn,.kbtn,.opt,.card,.pct,...')` — panels are `div.card` containers, so a tap on empty
space / text inside any panel (Mệnh truyện, Giao tình, …) added `.kfdown` to the whole panel + ripple + release bounce; and the CSS
`.card:is(:active,.kfdown)` press also fired through `:active`, which matches every ancestor of the finger.
Fix (jfx.js, shared game-feel KIT §54): `kfTapOf()` = real tappable only (button/a/.btn/.kbtn/.opt/role/data-tab/onclick/pointer cursor),
skips plain containers, never presses >30% of the screen; CSS press only via `.kfdown`. KIT.md §54 press note "WHO PRESSES".
Scan: dev/test/press-fx.js (see header). Results: see final report / commit message.

## Scan results (dev/test/press-fx.js, 38 states per viewport: 18 main tabs x sub-tabs + 2 dialogs, 6x8 grid of empty points)
| build | viewport | pressed from empty space (container) | frac of screen | states |
|---|---|---|---|---|
| main 7ba53114d | 755x1000 | section#panel (.kpane) — kfdown + :active + bounce | 0.78 | 25 |
| main 7ba53114d | 1180x820 | section#panel (.kpane) — kfdown + :active + bounce | 0.39-0.81 | 36 |
| press-fx | 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 | none | - | 0 |
Only other scale motion seen: img.figimg (j59 stage figure idle animation, not a press; tappable figure).
Real buttons still press after the fix: main tab button, act card (button.card.ka), dialog option (button.opt).
