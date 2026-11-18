PASS 67db47f616f41f93098ba64bbcdfee646053d517

# Review review/scene-end-sweep (OD:L1261 scene-end button) — branch review/scene-end-sweep-r1
r1 = review/scene-end-sweep @ 67db47f6 unchanged (origin/main 18fb8252 is already its ancestor, merge is a no-op). Rebuilt with build_site.sh: no diff in index.html/sw.js/assets.json.

## Tests (one at a time, Chromium, local server)
- scene-end-scan.js: ALL PASS.
- scene-end-sweep.js at 755x1000@2, 1180x820@2, 1366x1024@2, 844x390@3: 16/16 PASS (toil "Tiếp theo", gain/chest/person "Nhận": no early close, still open after 3.5 s, tap elsewhere keeps it, button inside screen closes it).
- panel-size.js at the same 4 sizes: exit 0, no missing / nofit / xOut / btnOut, 0 page errors.
- coop-e2e.js: 59/59 (live Worker).
- Looked at: toil 755x1000 (face in mirror + chip + "Tiếp theo" bar, good), toil 844x390 (button OK; the face circle was blank in that one shot = portrait image not yet loaded in the test, not related to this change; the other sizes show it), gain 844x390 (frame, grade chip, "Nhận", fits).
- Kit-only: kitSceneEnd / .kbtn.kmend (toil), existing .krevok (gain), #dawn-go kit .kbtn (dawn), kit roulette button; no private button or CSS added. Wording: "Tiếp theo" (makeup reveal), "Nhận" (item/chest/person), "Vào ngày mới" (week), "Nhận thân phận" (luân hồi) — all cổ trang, fit the event, no %.
- Co-op: buttons local, scenes play after state applies, no network send; a waiting scene only holds her own queue.

## Independent completeness scan (all dev/build/j*.js)
Scanned every setTimeout/animationend/onfinish that removes/hides, every body.appendChild overlay, every fixed inset:0 layer (.curtain .dawn .fxo .kfx-fl .btr .kroul .kidfl .kpzoom #kpodov #kievcatch #ktut ...), every kmStage/kmPush/kitReward/kitGain/kitRoulette/kitPodiumShow/toilReveal caller, co-op panels.
No scene that closes by itself remains. Findings (none blocking):
1. kitPodiumShow (j90.js, contest/festival result podium): NOT in the scan table (scan only looks for kmStage/kmov/kmPush). Verified by hand: no timer close, only its own button `.kpod-next` ("Tiếp" default, callers may pass o.next). OK as a scene. Suggest the worker adds it to SCENES in scene-end-scan.js and, optionally, "Nhận thưởng"/"Tiếp theo" wording. Non-blocking.
2. j18.js dawn() still has `w.onclick=close` (tap closes) but it is overwritten by j79 + j87 (Tuần lục book), so it is dead code. Non-blocking.
3. Art level-up "học thành tài" scene (OD:L712) does not exist in code yet, so nothing to convert; when built it must use kitSceneEnd.
EXEMPT list judged against the owner's words:
- kitFlipNote chip, rtoast, kitAlarm, fxOver/legacy stamp (pointer-events:none flashes over a panel that has its own buttons), kfx shake/flashes, stat numbers/coinPop: not scenes (no backdrop, never take a tap). OK.
- kitItemFx item flight (jitev): runs AFTER she pressed the event's own accept/reject button, 0.9–1.4 s, no backdrop; a tap skips it. Borderline "item fly" in the owner's list, but the closing action is her own button; OK. kitLose "lose" is a kit notice card in #modal (has buttons); sell/give/fade are flights without backdrop. OK.
- Minigame results, festival: #modal panels with buttons or kitPodium (button). Death/pregnancy/birth/promotion/demotion: kmStage with kitSceneEnd. Co-op panels: own buttons, no auto-close timers. OK.
- Night end, card flip: skipped (main's workers).

## Buổi-transition question (jbuoi.js .btr, ~1.7 s / dawn 2.0 s, pointer-events none, tap to skip)
Answer: NOT a scene — it is a screen-to-screen transition (time-of-day light/sky veil over the already-live game UI, nothing to read or decide, never takes a tap). The owner approved exactly this design (OD:L885/L892: "tap to skip", Gọn = quick fade) and it fires 4×/day; a button each time would block play. Keep exempt. The week-change content after dawn is the Tuần lục book (user-driven, ✕) and the j79 fallback (button-only), so the one place with readable content already ends by a button. Main may still confirm with the owner; no code needed.

KIT REQUEST: none. FAIL items: none.
