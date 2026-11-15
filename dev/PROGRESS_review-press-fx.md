# PROGRESS review/press-fx (owner 15/11: whole tab panel bounces on any tap)
Cause: jfx.js press handler used `closest('button,.btn,.kbtn,.opt,.card,.pct,...')` — panels are `div.card` containers, so a tap on empty
space / text inside any panel (Mệnh truyện, Giao tình, …) added `.kfdown` to the whole panel + ripple + release bounce; and the CSS
`.card:is(:active,.kfdown)` press also fired through `:active`, which matches every ancestor of the finger.
Fix (jfx.js, shared game-feel KIT §54): `kfTapOf()` = real tappable only (button/a/.btn/.kbtn/.opt/role/data-tab/onclick/pointer cursor),
skips plain containers, never presses >30% of the screen; CSS press only via `.kfdown`. KIT.md §54 press note "WHO PRESSES".
Scan: dev/test/press-fx.js (see header). Results: see final report / commit message.
