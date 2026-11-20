PRIORITY #1 CHECK: OD L1981/L2008/L2013/L2036 | main jtd.js:17, jpetcare.js:89, jshelf.js:403, j82.js:105 | review/scheme-games (older, no merge base; main already has newer jsgame.js with kgReady) , review/mg-noword-b a2cce480 (td_dung rewrite, not landed) | claims mg-noword-b

# mg-ui-rest — branch review/mg-ui-rest b5253eeb (from origin/main 716be762)

## MG04 td_dung: NOT rebuilt (reuse)
review/mg-noword-b (7e0d6c26, commit a2cce480) already holds the td_dung rewrite: wordless picture demo (NWB_DEMO tdwalk: floor arrow → bowl tips → hand holds the opposite half → bowl stands), 2 short rule lines, in-play words removed, guided round hand. Rebuilding it in jtd.js would conflict. ACTION FOR MAIN: land mg-noword-b (review pending); owner then re-tests td_dung. My test only asserts the td_dung guided round + rules screen exist on main.

## MG12 care games (pet feed / bath / play, plant water)
- Tap on the care button now opens the kit rules screen (kgReady: Luật chơi + picture of the move + «Hướng dẫn» + «Sẵn sàng»); NO khắc spent, nothing runs. Khắc spent only on «Sẵn sàng» (petcRules in jpetcare, water in jshelf). «Để trời định» from the rules screen spends the khắc once.
- «Hướng dẫn» = unscored guided round per game (hand via KG82.peek / KG82.hint), nothing saved; «Về luật chơi» returns the same screen.
- kgTut/kgReady now work in any `.kgame` frame, not only #kg82; new kgTutDrop() stops a guided round when a screen redraws. CSS `.kgame.kg-ready .kghow` hides the duplicate «Cách chơi» row on the rules screen.
- Bug found+fixed: pet figure lookup `#modal .kpsubj.kes` no longer exists in the figure-left layout (.kszfig) → bath silently did nothing after spending khắc; petcFig() now falls back to .kszfig (feed drop target, bath surface).
- Điểm trang (jmkt/jtoil): untouched (OD L2036).

## KP05 seal
kpHeader / kitGameFrame / kg82Frame / kg82Open take `seal` (default KP_SEAL.game «TÀI NGHỆ»); jsgame passes "MƯU". review/scheme-games is older than main's jsgame.js (no merge base) → nothing to merge. Scheme games already have kgReady + own HUD on main.

Scan (seal per caller): kitGameFrame callers kg82Frame(j82, all kg82Open callers incl. jtd/jroute/jsmg) → default TÀI NGHỆ; jpetcare, jshelf → default; jsgame → MƯU. Scan (kgReady callers): j5, j82 x2, j92, jentry, jexam, jmgcal, jroute, jsgame, jslap, jtd, jts + NEW jpetcare, jshelf. Not covered, still: jmkt, jtoil (held by owner).
Painted boards for scheme games = art → request for Foreman C: painted boards for Nghe ngóng / Truyền lời / Mặc cả / Thời cơ (kit silk fallback now).

## Tests
dev/test/mg-ui-rest.js 35/35 at 755x1000 and 1180x820 (td_dung rules, 3 pet games + plant: rules/no khắc/guide/back/ready/khắc, seals, no page errors). mg-ready-guide: see below. Shots (scratch, not in git): /home/user/wt/mgui-shots6/*-755x1000@2.png and *-1180x820@2.png, looked.
Open nit: on Fold the «Hướng dẫn» button of the pet rules screen sits at the dialog's scroll edge (scrolls into view).
