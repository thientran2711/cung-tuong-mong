PASS 0d48819bbfdf16a5294b19c21354af4e5c056e90

# Review: D9 header-own (OD L607 item 10) — branch review/header-own @ d6e1699c, merged onto origin/main cdad7109 as review/header-own-r1

## Claim verified on current main (cdad7109): TRUE
The header holds only her own info; no game code needed changing. Branch adds only dev/test/header-own.js + dev/PROGRESS_header-own.md (no code, no kit parts, no private CSS).
- Header text at all 6 viewports: menu, her name/rank/age/date, Sắc Tài Tâm cơ Đức Danh Sủng | Bạc Sức, buổi/make-up/weather/quẻ, "Về phòng" button, seal. No Hoàng thượng / Thái hậu / Hoàng hậu / Cung nữ / thiện cảm / Ân tình text inside the header.
- Others' info is on the stage plaques (.k3c), each reachable in ONE tap: Hoàng thượng -> card, Thái hậu -> card, Hoàng hậu -> court tab, Cung nữ thân tín -> court tab. Nothing lost.

## Results (probe re-run by me on the built root index.html of cdad7109)
755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2: PASS all. No page errors, no h-overflow, no cut header cells, #emp hidden, plaques outside the header, 4/4 taps open something.
Old save (.out/oldsave.json): loads at all 6 sizes, header still clean ("ok Chu Nhược Lan").
Screenshots viewed (755 and 390 headers): her info only, no cut text, kit cells only.

## Decision: land the probe (not CLOSE)
Small (38 lines), passes on current main, guards an owner rule (OD item 10) across the 6 required viewports and old saves; header-danh.js does not cover the "no other person in header" rule. No conflicts with main.

## Notes (not blocking)
- Plaque text for Thái hậu starts lowercase "thiện cảm -5" and Hoàng hậu plaque reads "Hoàng hậu Hoàng hậu" (name + title identical). Out of this task's scope (plaque kit part); coordinator may route to the kit keeper.
- Dead hidden #emp / #hud2 DOM remains (worker's residual option); low value, not done — agree.
- At 390x844 the game header still renders in the probe (context isMobile); rotate-prompt screen itself not part of this probe.
