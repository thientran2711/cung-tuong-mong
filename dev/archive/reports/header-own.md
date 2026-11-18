# Report: header-own (D9, OD L607, OWNER_LEDGER #179)
Branch: review/header-own, sha d6e1699c65c152ff8228633a6d26d9f0254e0512 (from origin/main c4e89f8). Docs: dev/PROGRESS_header-own.md on the branch.

## Result
On current main the header ALREADY holds only her info. No game-code change. Added regression probe dev/test/header-own.js + PROGRESS with the before/after table.
- Header (all sizes): ☰ menu, her portrait/name/rank/age/date, Sắc Tài Tâm cơ Đức Danh Sủng | Bạc Sức, buổi/khắc + make-up state + weather + quẻ, "‹ Nơi" button (away from home), seal.
- Others' info is already off the header: Emperor box #emp is display:none (dead DOM); court chips are stage plaques .k3c (Hoàng thượng, Thái hậu, Hoàng hậu, Cung nữ thân tín); #hud2 chips not rendered in header.
- Each plaque is 1 tap: Hoàng thượng/Thái hậu → card (Ân tình, Sủng, Tâm trạng, thiện cảm); Hoàng hậu → court tab; maid → staff tab. Nothing lost.

## Tests (header-own.js, build of main c4e89f8)
755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2: PASS all (no other-person text in header, no page errors, no overflow/cut cells, taps open cards). Old save (live-exported) loads: PASS at 755 and 1366. Header screenshot at 755 viewed.
header-danh.js not re-run (no code under test changed).

## Notes
- Co-op header items (jcooptimer placeF friend chip/countdown): not touched, owned by main.
- Residual option for main: remove dead hidden #emp / #hud2 from header DOM (touches all40/j19/j57/j79 render paths; low value, some risk) — not done.
- KIT REQUEST: none. Owner questions: none.

SẴN SÀNG KIỂM
