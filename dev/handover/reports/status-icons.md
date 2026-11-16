# status-icons (owner 16/11 16:25Z, "Thỉnh tranh" download chip) — report (r2: + Có bản mới)

Branch: `review/status-icons` (r2: merged origin/main 2e9615fb; sha in the coordinator message). Pushed. READY FOR REVIEW ("SẴN SÀNG KIỂM").
START_CTX ≈ 10 % of the window; finished well under the roll-over line (no handover needed).

## What changed (kit first)
- NEW kit part **kitStatusIcon** (KIT.md §77.1, `dev/build/jstatus.js`, after jrail in assemble.py) on top of the §77 square rail button. API
  `kitStatusIcon.set(id,{title,glyph,busy,done,badge,show,panel,order})` / `.refresh()` / `.remove()`. Registered in KIT.md (§77.1, §36.6 rewritten by canon overwrite,
  rail row in the template table, §35 background-indicator line, tip line) + kit sample page entry "§77.1".
- `jrail.js` (§77) extended: `glyph` (text instead of painted icon), `busy` (tiny bobbing: transform + opacity only, `calc(1.8s*var(--pace))`, no layout, no JS timer,
  off under reduced motion / Hiệu ứng Gọn through `reducedMotion()`), `done` (still, green), `onTitle` (bottom-left fixed dock `.krail.kstdock` while no game is on screen).
- `jload.js`: the "Thỉnh tranh nhân vật" chip + the 30 px strip under the tab bar are GONE (`.kloadchip`, `body.kload-dock`, `placeChip` removed). The download is now status
  icon `dl`: ↓ bobbing while running, ✓ still for 5 s then gone, red dot when paused / cut / out of room. Tap → kit info panel (kind info, look 1): progress bar
  (kitProgress), "Đang thỉnh / Đã về / Còn lại", option "Tạm ngưng / Thỉnh tiếp" (pause is remembered as before). Close = ✕ top-right, tap outside, Esc. No "Đã hiểu".
- `jtut.js` (tip placement) no longer lists `.kloadchip`; tests `hau-cung-ui.js`, `load-e2e.js` re-pointed to `#krail [data-rail="st-dl"]`.
- Game frame keeps its full height: measured `.game` padding-bottom 6 px (was +30 px strip while downloading), tabs at the same y with and without the icon.

## ART REQUEST: download icon
Glyph is a plain TEXT placeholder (↓ running, ✓ done). Foreman C: paint the download icon (+ optional done mark) as a square kit icon like `mo-calendar.webp`;
then change `glyph:` to `icon:"img/kit/….webp"` in jload `paintChip` only. Also the info panel shows the kit's standard placeholder picture slot (no art for "download"):
optional ART REQUEST: download panel picture (same kind as the other info panels' banners).

## Whole group: other status chips / strips in the game (git grep dev/build + dev/site)
| element | where | kind | decision |
|---|---|---|---|
| `.kloadchip` background download | jload | persistent chip + reserved strip | CONVERTED → status icon `dl` |
| `#kupdchip` "Có bản mới" (update available) | dev/site/swreg.js, top bar beside her rank, hand-placed by `place()`; tap → card with "Mở bản mới / Để sau" | persistent status chip, same kind | NOT converted: unsure — touches the update + co-op "Cùng mở" flow and tests `dev/test/sw-update.js`, `brand-seal.js` (they select `#kupdchip`, `KSW.chip`). Recommended next: `kitStatusIcon.set("upd",{glyph:"⟳",badge:()=>true,show:()=>K.pending&&…,panel/onTap→card()})`; drops the top-bar placement hack. Needs its own branch + sw-update run. |
| `#kctm` co-op buổi clock chip + `#kctmf` friend "đã sẵn sàng" chip, plus `header.hud.kctm-pad` (28 px band added under the top bar) | jcooptimer | persistent chips + reserved band, co-op only | NOT converted: unsure — the countdown is time-critical, an icon would hide the number. Options for the coordinator/owner: (a) icon with ring that fills + tap → panel with time/friend; (b) keep the chip. The 28 px band is the same problem the owner raised for the download strip. |
| Sổ mây sync state (jcloud) | Thiết lập panel only | already inside a panel | nothing to do |
| `kitLine` / `.kmnote` one-line notices (`.kupdline`, `.kmnote`) | jclose, j93 | transient toasts, auto-fade | not chips: leave |
| `.kstw` / `.khap` 13 px "!" marks | square-icons report | indicators with tooltip | leave |
No other persistent on-screen status chip/strip found (grep: kchip, banner, strip, position:fixed, đang/offline/đồng bộ).

## Tests (served from the built site, direct mode, @2)
- NEW `dev/test/status-icon.js` 755x1000 + 1180x820: PASS both (idle = no icon; busy icon 44x44 inside the stage, over no face, anim `krailDl`; paused = dot, still; done = ✓ still
  then gone after 5 s; panel with ✕, kitProgress, no "Đã hiểu", Esc closes; no old chip / dock band; game padding 6 px; no page errors).
- kit-conform.js 755x1000 + 1180x820: exit 0, CONFORMS 90, MISSING 15 (cases absent in a fresh save, as before), floats: none.
- game-feel.js (sw-serve with old main overlay): exit 0; fold/ipad/phone effects run, `errs` [] everywhere; OLD SAVE made by main's build loads in this build (oldLoad ok, inv 2); offline ok.
- media-check (no @media in the design canvas): OK, built by build_site.sh. perf.js: see note below.
- Shots (branch `review/status-icons`, dev/handover/reports/status-icons/): `si-755x1000-{idle,busy,done,panel}.jpg`, `si-1180x820-{idle,busy,done,panel}.jpg` (@2).

## r2 (coordinator order: also convert #kupdchip)
- `#kupdchip` "Có bản mới" → status icon `st-upd` (swreg.js `chip()`/`place()` now call `kitStatusIcon`; glyph ⟳ placeholder + seal-red dot; `onTap` opens the existing card #kupd; the top-bar placement code and `.kupdchip` css are gone). KIT.md §35.2 + §77.1 updated. ART REQUEST: update icon (same request as the download icon).
- co-op clock `#kctm` / `#kctmf` left as is (coordinator).
- BUG FOUND + FIXED (affects the download icon too): on portrait tabs other than Hành sự the stage collapses to height 0, so the stage rail is invisible there. Status icons now fall back to the fixed corner dock (bottom-left, just above the tab bar) whenever the stage is not visible (`jrail.paint`, re-checked 450 ms after a tab change). Calendar/goal/chat stay stage-only as before. Test: status-icon.js walks 4 tabs (icon visible, 44 px, above the tab bar).
- sw-update.js (play) updated to the icon: 23/24. The one FAIL ("sổ written before the reload == sổ after it", `reading 'slice'`) also FAILS on plain origin/main 2e9615fb (baseline run 17/24: there the chip is hidden by the finished card-flip overlay `.kmov`, plus same-tab and 0-lost fails) → not caused by this branch. The test now dismisses a finished `.kmov` before checking the icon (the icon waits behind motion moments by design, as the chip did). brand-seal.js: chip lookups are null-safe, not re-run.
- perf.js --devices fold: aborted ("browserContext.close", exit 124) in this sandbox; not a result either way. Animation is CSS transform/opacity only.
