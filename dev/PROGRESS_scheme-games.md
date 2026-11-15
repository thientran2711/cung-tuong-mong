# PROGRESS · review/scheme-games (trò mưu)

Base: origin/review/book-release 4b6bf5d5. Plan: dev/SCHEME_MINIGAMES_PLAN.md. Kit notes: dev/kit/KIT.md §13.2.

Done
- dev/build/jsgame.js (assemble.py: after jk4, before j84): Nghe ngóng (spy), Truyền lời (rumor), Mặc cả (bribe), Thời cơ (stealth acts of Hại nặng / Sát hại, owner 11/15 via coordinator).
- Kit edits: j79 KP_SEAL.muu "MƯU" + kitGameFrame seal option + CSS; j82 kg82Frame seal/hud, kg82Img "@path" (existing art), KG82_BGX.
- Tests: dev/test/schemegames.js (real act-card tap → choice → game → result → act → result card; NPC odds unchanged; overflow/…/%/HUD), dev/test/schemesave.js (old-build save loads; pending sgpick survives save/load).
- Shots: dev/shots/scheme-games/ (686x880@2.2, 1180x820@2, -rm = reduced motion).

Open / later
- j78 overhear, j9 placeHarms, bribeServ (j29) could get a SG.K entry the same way.

## Status at handover (stopped by coordinator, 11/15)
- All 4 games incl. "Thời cơ" (owner 11/15) are implemented and wired (spy/rumor/bribe/12 stealth Hại nặng + Sát hại acts).
- Test results: reduced-motion run 686x880@2.2 = 0 page errors, 0 fails; all 4 acts ran after the game through the normal result card, SG.mod cleared, NPC odds unchanged
  (durations: spy 30 s, rumor ~5–36 s, bribe 1–27 s, Thời cơ ~8–24 s). Old-build save loads in the new build; pending sgpick choice survives save/load (dev/test/schemesave.js).
- NOT finished: a clean full run at 686x880@2.2 (no reduce) and 1180x820@2 — the last run was started with 3 Chromiums in parallel and the Fold run flaked
  (target rival's act card not visible after the injected fallback → test harness issue, not a game error); iPad run did not finish. Rerun ONE at a time:
  `python3 -m http.server 8765` at repo root, then `node dev/test/schemegames.js http://localhost:8765/index.html 686x880@2.2 dev/shots/scheme-games` and `... 1180x820@2 ...`.
- Last code edits after the last build (rebuild with `bash dev/site/build_site.sh` before testing): rumor trust badges at 42 % along the edge (avoid stacked badges where edges cross);
  bribe question drops an unknown maid name "???".
- To check visually: Truyền lời board layout at phone width 390 (slips get narrow), pops in reduced motion still float (kit kg82DrawPops).
- Shots so far in dev/shots/scheme-games/ (Fold + Fold reduced; iPad only the spy choice).
- Not yet reported "SẴN SÀNG KIỂM".
