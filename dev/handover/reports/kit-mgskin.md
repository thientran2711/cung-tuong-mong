# KIT MG-SKIN — KIT READY (KIT KEEPER #14 · session_01Rc5AsLWeZHGsdxAetnF6CY · for MAIN 113) — 23/11
START_CTX ~3 % (own estimate of a 1M window; get_session reads 0). Finished well under +25 %.
PRIORITY #1 CHECK: OD 23/11 ~23:05Z real (read verbatim) | main kg82Open / kg82Canvas / kg82Img (j82), KIT-MGBG kitBoardBg (j79) — reused, not rebuilt | review/* none for mg-skin (review/kit-selscene is §93, unrelated) | claims KK14 row.
BRANCH: review/kit-mgskin @1b91ac14 (from origin/main c39e5009). Files: j82.js, j79.js, jkitpage.js, KIT.md §MG-SKIN, KIT_REQUESTS.md, dev/test/kit-mgskin.js.
## What it is
ONE «skin» slot on the shared mini-game frame = {id, name, pal}. Default (id "", pal son) = today's art and today's buttons, unchanged.
- Pick: `kg82Open({skin})` or `KG82.preSkin = skin` before playArt / any caller (taken once). Register: `kitMgSkinAdd(kind, id, {name, pal})`; list `kitMgSkinList(kind)`.
- Pictures: one resolver `kg82SkinSrc` used by kg82Img (all canvas boards + sprites) and kitBoardBg (DOM boards): `<kind>-bg` / `-bg-hoc` → `img/mg/<kind>-<id>.webp`; sprite `<name>` → `img/mg/<name>-<id>.webp`. Not painted yet → default art (index check + load fallback), never a hole.
- Button palettes (kit tokens only): son (default) · ngoc (--good) · kim (--gold) · mac (--dim/--ink) · dao (--peony, dark text). Main button takes the ground; cream buttons (alt, kgbtn, quick) take the rim — same layout as today. Canvas engines: `kitMgPal()`.
## Checks
`node dev/test/kit-mgskin.js dev/index.html <out>` ALL PASS Fold 755x1000 + iPad 1180x820: default unchanged; 5 palettes (via kg82Open and via preSkin) set, ground differs from son, text contrast ≥ 4.5 on both stops (lowest ngoc 4.93), rim ≥ 3:1, buttons inside screen, no text cut, ground = kit token; resolver keys + unpainted fallback + kitBoardBg index rule; close resets; no page errors. Regression `kit-kg82-stack.js` PASS 12. Looked at both sheets.
Shots (wipe after review: `python3 dev/site/cdn_sync.py --wipe-review kit-mgskin`): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-mgskin/sheet-fold.jpg · .../sheet-ipad.jpg (+ fold-/ipad-<pal>.jpg).
## For the others
- Foreman C: paint `img/mg/<kind>-<id>.webp` (same size/aspect as `img/kit/mg-<kind>-bg.webp`) and, where the look needs it, `img/mg/<sprite>-<id>.webp` (transparent, same size as the default sprite). Ids `[a-z0-9_]` (e.g. xuan, dong, hoidem).
- THIN P1 (Foreman B): `kitMgSkinAdd(kind, id, {name:«…», pal})` per painted skin (name per VANPHONG), pick with the shared no-repeat memory, set `KG82.preSkin` before opening. Canvas option pills read `kitMgPal()`.
- Not skinned on purpose: figure-column backdrop img/mgbg-<kind>.webp, header ✕, .kdanger.

## REVIEW — SMALL kit reviewer-lander (23/11) — PASS
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main 0 (new part) | review/* 1 (review/kit-mgskin only) | archive 0.
Target review/kit-mgskin @1b91ac14f5090a62813b6ecb63cece6d487a1787. origin/main c39e5009 is already its parent → merge = "Already up to date", no conflict; review/kit-mgskin-r pushed at the SAME sha.
- Rebuild: assemble.py + build_site.sh OK (built files not committed; coordinator rebuilds on land).
- `kit-mgskin.js` ALL PASS (Fold + iPad: default unchanged; 5 palettes via open + preSkin; contrast ≥4.5 / rim ≥3:1; buttons inside, no cut; resolver keys; unpainted → default art; kitBoardBg index rule; close resets; no page errors). `kit-kg82-stack.js` PASS 12. `img-allowlist.py` OK.
- Old save: a save made by the origin/main build loads in the new build (name intact, no page errors); a skin opened then closed resets to son.
- KIT FIRST (Law 9/11): one shared slot on kg82, one resolver (kg82Img + kitBoardBg), palettes from kit tokens only, no per-screen variant; KIT.md §MG-SKIN + kit page sample §MG-SKIN + KIT_REQUESTS in the same branch. jts.js's own kg82Img override (TS_IMG) is unskinned = default art, no hole.
- Laws: no BAL number (4), no player-visible new words / no % (7 — only dev kit-page labels son/ngoc/kim/mac/dao), mini-game rules untouched (5).
- Shots looked at (sheet-fold: 5 stacked frames; sheet-ipad: 5 stacked frames; plus per-palette crops): lacquer/green/gold/ink/pink main buttons, cream buttons with palette rim, all text readable, nothing cut. CDN folder wiped (12 objects).
NITS (not blocking, for KK14 / next kit pass): (1) sheets are frame crops, not full 755x1000 / 1180x820 screens (Law 12 wants full screen) — fine for a palette sheet, but the first real skinned screen from THIN P1 must be shot full-screen on both devices. (2) `kitMgPal().b` returns the raw string `color-mix(in srgb,…)` for ngoc/kim/dao; fine for CSS and modern canvas fillStyle, but a canvas engine that needs rgb math must resolve it first.
VERDICT: PASS → LAND review/kit-mgskin-r @1b91ac14f5090a62813b6ecb63cece6d487a1787.
