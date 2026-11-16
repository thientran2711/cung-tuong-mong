# review/weather-port (D40) — outdoor-act weather risks, re-port of review/weather (09a8af91b) onto main
Spec: OD:L348, L351 (no extra walking khắc; cold/slip is a loss of OUTDOOR acts; umbrella/cape/sedan reduce; NPCs same).
Weather VISUALS untouched (Foreman C D20).
## What
- dev/build/jweather.js (new module, last in assemble.py): BAL.wx numbers, items Dù giấy dầu / Áo tơi lá / Giày đế cỏ (shop, art already on CDN), wxRisk/wxHit/wxOutAct, giông tố clears in 1-2 buổi, NPC garden walkers roll the same rule (into news), result card "Gió lạnh, đường trơn".
- Old reviewer fixes: odds words now via chanceW() (VANPHONG chance ladder, no %); "−" in all player text.
- Card: the act card's own line "mất: cảm lạnh: <chanceW> · trơn ngã: <chanceW> (vì sao: trời mưa..., ...)" via a.x (no custom chip/span; old kwx spans dropped).
- BALANCE: gear prices raised 8/6/5 -> 15/12/12 (Thường tier like tuithom 15 / sonphan 20); kiệu stays Bạc −6 per outing (rank>=3): gear = one purchase, halves one risk; kiệu = per-trip, ~85% off both; servant umbrella free but needs loyal servant. Open question for owner: should gear wear out?
## Tests (dev/test/weather-port.js, 755x1000, 1000x755, 1180x820, 1366x1024, 844x390): PASS, 0 page errors. Checks: fine weather = no risk, sev mapping, indoor act excluded, card text has no %, gear/helper reduce odds, pregnancy raises slip, NPC rule, old save without S.wx.clr.
## Scan (LUẬT SỬA CẢ NHÓM)
Before: wxRiskWord own ladder ("đôi khi", "dễ"), "-" minus, custom spans. After: chanceW only, "−", a.x line. Outdoor acts matched by regex WX_OUT on act name or place "vuon" (deck cards + dilemma options).
