# review/place-colour-r1 (reviewer state)

Merge of review/place-colour d99b28a1d onto origin/main d51a393e4; conflicts only in generated files (index.html, sw.js, assets.json) → took main's, rebuilt with `bash dev/site/build_site.sh`.

Fix made on r1:
- dev/build/j3.js new day: `if(S.out)coldVisit();else S.visit={k:"home",...}` — the root cause of the lãnh cung → Ngọc Thanh các bug (new day overwrote coldVisit's visit). kitLifePlace() (jsl.js) stays as the safety net for old saves.

Checked:
- life-place.js 755x1000: 13/13 OK, 0 page errors (before and after the j3 fix).
- ts-oldsave.js (main build → r1, proxy + domcontentloaded copy in .ahcache): ok, 12 weeks played, 0 errors.
- month-cal.js all 6 sizes: bad 0, errs 0 (desk calendar on room stage, rotate prompt at 390x844).
- kit-page.js: 5/5 sizes report "§28.1 pcPort … reading 'out'" — SAME on origin/main (pre-existing, sample needs S), not this branch.
- Code: one --kscf filter on .scimg + .pxc; lãnh cung/Tân Giả khố (sc-lc) → none; figures untouched (tokens above .light/.pxc); TGK/lãnh cung cannot goTo elsewhere so pinning is safe.
- FPS: machine load 30–50 on 4 CPUs, swiftshader; numbers meaningless (main 0.2 fps too). Dry states use filter none (no cost); wet/rp2/rp3 add one GPU filter pass on the stage layer.

Left: screenshots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390 (day/night/rain/snow/lãnh cung) via .ahcache/drv.js; night-end not on main (skip).

## Update: review/place-art 83864aa5d merged (clean)
- Fix on r1: new scene keys "tgk"/"maid" added to j11 pxKind outdoor list + j33 festival particle list (they had them before as lc/home;
  Tân Giả khố painting is an open courtyard); jplace kitPlaceArt + j9 map tile: maid's "home" shows phong-cung-nu, not tam-cung-dem.
- life-place.js 755x1000: 13/13 OK with tan-gia-kho / phong-cung-nu, 0 errors.
- Screenshots (stage) 755x1000@2, 1366x1024@2, 1000x755, 1180x820@2, 844x390: day/night/rain/snow/frost/lãnh cung, no overflow, 0 errors.
  Night reads as night; afternoon rain warm, not grey; frost no blue wash; lãnh cung grey. (Harness note: the "Luân hồi" picker overlay
  sometimes reappears in the 2nd state of .ahcache/drv.js — test artefact.)
- Running: place-colour.js full scan (nopx, 1180x820) to confirm "night looks like day" 6→0.
