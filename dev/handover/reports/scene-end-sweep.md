SẴN SÀNG KIỂM 67db47f616f41f93098ba64bbcdfee646053d517

Branch review/scene-end-sweep (base main 18fb8252).

# review/scene-end-sweep — SCENE-END BUTTON SWEEP (owner OD:L1261)
Base origin/main 18fb8252. Kit part used: KIT §81 `kitSceneEnd` / `.kbtn.kmend` only (no private button, no kit change needed).

## Table (file · scene · before → after)
| file | scene | before | after |
|---|---|---|---|
| jtoil.js `toilReveal` | makeup reveal (zoomed face) | tap anywhere after zoom closed it ("Chạm để đóng") | `kitSceneEnd(ov,"Tiếp theo",closeAll)` at the zoom; a tap only skips to the zoom |
| jfx.js `kitGain` | item reveal + fly to Tư trang | tap anywhere (after 0.9 s) closed it | only its "Nhận" button closes; other taps swallowed |
| j79.js `dawn` (fallback) | week summary fallback (live week scene is the Tuần lục book, j87, user-driven + ✕) | tap on backdrop closed | only "Vào ngày mới" closes |
| jk2b.js `kitRoulette` | Luân hồi pick | last button "Tiếp" | last button "Nhận thân phận" (VANPHONG wording); still ends only by button/"Bỏ qua" |
| j93.js kitReward chest, jpromo.js kitPersonReveal | reward chest / person reveal | already manual, only own button (data-km-close) | unchanged, verified by test (wording "Nhận" fits) |
| j93.js kmStage scenes (tablet/edict/gloom/bloom/ink), jflip.js card flip | — | done by kit-keeper-2 / cardflip-glow | untouched, verified by scan |
| jnight.js night-end | — | main's worker | SKIPPED per order |

## Exempt (not scenes: non-blocking, no backdrop, or ends in the event's own buttons) — owner may overrule
kitFlipNote chip, kitAlarm / fxOver / stamp / coinPop / stat floating numbers / kfx flashes, rtoast result toast (full text in Nhật ký), kitItemFx item flight and kitLose item fall (inside the event panel, event buttons follow), buổi transition veil (pointer-events:none, ~1.7 s, tap-to-skip by owner design; a button on every buổi change would block play — suggest keep exempt; main to confirm).
Co-op scenes (jcooptimer panels kctmh/kctmf/kctmp, jcooplobby freeze panel): panels with own buttons, no auto-close timers found; unchanged.
Minigame results / level-up / festival / death-KIẾP: no overlay with auto-close exists in the code (minigame results, level-up, festivals are #modal panels with option buttons; death = kitInk kmStage, done).

## Co-op behaviour
Scenes play locally after state applies and never send graphics (PREAMBLE). The button is local, so a scene waiting for her button does not block the friend; the kmPush queue timer (10 min) only delays her own next scene. coop-e2e: 59/59 pass.

## Tests
- `node dev/test/scene-end-scan.js` static scan: FAILS on a scene builder not in the table, any `hold` auto-close, tap-anywhere close markers, "Chạm để đóng". ALL PASS.
- `node dev/test/scene-end-sweep.js <url> 755x1000@2,1180x820@2 <out>`: toil, gain, chest, person: no early close, still open after 3.5 s, tap elsewhere keeps it, button inside screen with right words closes it. 8/8 PASS (screenshots looked at: toil, gain, chest, person; 2 kept in dev/test/shots-scene-end).
- panel-size.js 755x1000@2 + 1180x820@2: exit 0, no fit/overflow issues. coop-e2e 59/59. mk-e2e.js updated to click `.kmend`.
- Not run: 1366x1024, 844x390 (kit §81 scene-end.js covers kmStage at 5 sizes; unchanged here).

KIT REQUEST: none.
Handover: nothing pending; worker finished.
