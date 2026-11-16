# flip-entry HOTFIX — SẴN SÀNG KIỂM 327491799ef6939b6c0baf9b16608549ec425c1e (review/flip-entry, from origin/main 1aa0edb2)
Commits: 8f755a90 (fix + tests + build), 32749179 (coop-night case 4 test step).
Worker session_01UV1SzgZumVkkN1moZ9qiiW (main s24 fast lane). Owner bug OD 16/11 ~20:58Z: new game → the Kính sự phòng card-flip opens right after the identity pick.

## Root cause (proved on live main 1aa0edb2)
- `start()` (j2.js:28) ends with `flip()` at buổi sáng; every other flip() caller is also a morning (j3 endTurn new day, jcoopworld cyFree, jcycle answer).
- jflip.js wraps flip(): after it, `cfPlan()` → `cfPlay()` queues the card-flip scene (kmPush). On a new game the scene only waits for the Luân hồi identity card (busy() → NLP); the moment she taps "Nhận thân phận" the tray opens over "Nhập cung".
- night-steal-r2 is NOT the cause (it only changes who gets the night inside flip()).
- Same for a new life (start()), and for the servant origin cnv (j42 srvInit runs after start's flip, so jflip's isSrv() guard is still false then).
- The owner's flip rule (OD 14:00Z (4), night-final): the flip happens at the START of buổi tối.

## Fix (minimal, one file + assemble line)
`dev/build/jfe.js` (assembled last) = review/night-final `jnf.js` part 1 with the same behaviour and the same save fields:
on the palace route a flip() before buổi tối only marks the tablet waiting (`S.nfP = day`); entering buổi tối (nextBuoi, or any other road into tối seen at render: co-op buổi pulled in, old save) runs the real flip once (`S.nfF = day`); a night already taken (j75 ntTaken) = no flip. Servant (j42) and home (jkc) routes unchanged. No night rule changed (commit, steals, co-op relay untouched). When jnf.js lands it sees `window.nfOn` and jfe is a no-op → night-final deletes jfe.js + its assemble entry on merge (agreed by send_message to session_01UV1Szj7YLUcLKMH5ncGTcL).
Effect also: her cycle report pop-up (jcycle "Kính sự phòng báo thế nào") now comes with the flip at tối, not in the morning (same as night-final).

## Before / after (dev/test/flip-entry.js, new)
| case | live main 1aa0edb2 | fix 8f755a90 |
|---|---|---|
| new game tt dtq muoi cn nc bd td ch thd | FAIL ×9 (scene on entry, today flipped) | ok, flip runs at buổi tối |
| new game cnv (servant) | FAIL (scene on entry) | ok |
| new life (Luân hồi, start() in game) | FAIL | ok |
| load save | ok | ok |
| tutorial start | no own start fn (runs inside new game = case 1) | same |
| total | FAIL 11 | ALL OK (755x1000@1 and 1180x820@2) |
Whole group scan (every origin, what is open after the identity card): only "Nhập cung" / "Mệnh truyện kiếp này" (/ "Chọn cung nữ thân tín" for thd) — no night/flip card, no .kmov, no #dawn.
`node dev/tools/shots.js <out> fold` (s24's repro): 755x1000-1-home.jpg was the flip screen on main; now the room at buổi sáng (looked at).

## Other tests
- flip-newlife.js ALL OK; quickcheck 8f755a90 PASS and 32749179 PASS (open 1122 ms, old save ok, perf new/live render 326/321 ms, buổi 1067/2248 ms).
- coop-e2e.js both seats 59/59.
- Adapted to "flip at tối" (tests called flip() in the morning): night-steal-unit.js (0 FAIL), cycle.js (ALL OK, logic + 5 sizes), night-day.js (S.nfF + not-cycle setup; still flaky on 'road'/'stale' ~2 in 3 — live main itself fails 2 of 3 runs the same way; night-final rewrites this test).
- coop-night.js (live Worker, two browsers): main alone 105/105 twice. Run CONCURRENTLY with the fix (same Worker load): main 100/105, fix 96/105 — the extra fails on both are "X closes its page → Y sees the wait" (presence freeze never arrives within 60 s; debug: Y still status open, bothIn true = the Worker had not dropped the closed seat). Same failure on unchanged main → Worker presence timing, not this fix (worth a separate look: owner co-op first).
- coop-night case 4 (guest AFK at tối) was slower with the fix in 3 of 5 runs: the tablet now turns at the START of tối, so an AFK guest may sit on a fresh summons (a real choice, never auto-made — same as a morning summons on main, which blocks her sáng steps the same way). Test adapted: the guest reads what tối brings, then goes AFK (passed after). night-final's host-relay keeps this rule.
- Page error in one run: CDN CORS on an image (ctm-img worker), environment, not code.

## Coordination
night-final (session_01UV1Szj7YLUcLKMH5ncGTcL) told by send_message at start: jfe.js = its jnf.js part 1; delete jfe.js + its assemble entry when jnf.js merges (jfe is a no-op when window.nfOn exists). No reply received before this report.

## Not done / notes
- No tutorial-start function exists (the tutorial runs inside a normal new game → covered by the new-game cases).
- Shots kept outside git (/home/user/wt/fe-shots, deleted after).
