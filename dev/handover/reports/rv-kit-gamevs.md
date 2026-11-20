# rv-kit-gamevs — review of K-PM-1 kitGameVs
PRIORITY #1 CHECK: OD 1 (OD 20/11 ~01:00Z item 1) | main none (kitGameVs absent on acc26bf) | review/* only review/kit-gamevs | claims none.
**PASS** kit-gamevs 29f5e418c1f038d7e46afdfc112c1d0ddf74751d (worker 2ed549e + 6ee50b3 + 1 reviewer fix + merge of origin/main acc26bf + rebuilt site).

## Laws
- 9 kit first PASS: kgbox/kgame tokens, kitFaceH portrait, .kchip chips, kit vars; no own button/frame.
- 10 PASS: no buttons; only html.kv1 (stacked, opp above her) / html.kv2 (her left, opp right) switch.
- 11 PASS: game-agnostic API (setScore/setClock/setTurn/setRound/end + me/opp board slots, oppBoard) covers every KG82_KIND (dan, hat, co, dauho, ban, tho, doi, doden, ve, hoa, theu, kim, mua, banh …).
- 12 PASS: looked at Fold 755x1000 and iPad 1180x820; 390x844 + 1510x2000 asserted by test; no overflow/cut text.
- 4 partial FAIL → FIXED by reviewer: BAL.gameVs.pop duplicated as literal 320ms in CSS, .end unwired. Now jgamevs.js sets --kgvs-pop/--kgvs-end from BAL.gameVs, CSS reads them (end banner settles over BAL.gameVs.end). Leftover literals are layout spacing/font only.
- 7 PASS: «phần», «còn N giây», «Đến phiên», «Nàng thắng/Nàng thua/Hòa nhau»; no %, no điểm.
- KIT.md §13.8 + sample page §13.8 present. Reduced-motion: bump + banner off.
- Kit page §89 "list.map is not a function": PRE-EXISTING (reproduced on clean origin/main 94c3bddc build).

## Tests
kit-gamevs.js 0 FAIL (4 viewports); quickcheck PASS on the final sha (old save ok, core gates PASS, perf ≈ live).
Note for first caller (Foreman E): kgReady first, then kitGameVs.
