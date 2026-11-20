# rv-kit-e-rows — reviewer verdict: FAIL dd2e0fe1 (kitColDot part is good; the «thế lực» word-mode phrase misreads other houses)
PRIORITY #1 CHECK: ROOT-81 order · KIT §60.1 / §13.15 · main none (LIVE 983a9436) · review/kit-e-rows dd2e0fe1 on kit-cost-rows-home 3332c63b (PASSed) · claims keeper
Branch merges clean on LIVE 983a9436 (FF-able). Tests: kit-e-rows.js 22/22 PASS, kit-cost-rows-home.js 15/15 PASS (both re-run by me, Fold + iPad). QUICKCHECK not re-run for a FAIL (keeper: PASS 197 s).

## OK — kitColDot / kitColDots (KIT §60.1)
Read-only dot (12 / 16 px, 1 px line ring, sheen as §60 swatches), name, optional «chính / phụ», colour from DATA only (BAL.dc.fam key or ready object), no button / link. LOOKED Fold 755x1000@2 + iPad 1180x820@2 (kit page sample): dots, names, roles, «·» separator all clean, same ring + sheen look as the §60 swatches, no clash. Note (non-blocking): `esc()` strips only & < > " so a hex value goes into style="--cd:…" — fine for BAL data, do not feed it player text.

## FAIL — «thế lực» phrase triple (KIT §13.15, jk2b kitHintPhrase) is not scoped to the player's own house
Rule added: `[/thế lực/i, ["nhà ngươi thêm vững thế","thế lực nhà ngươi thêm vững",…], ["nhà ngươi sút thế","thế lực nhà ngươi sút giảm",…]]` — it matches ANY «thế lực» line. The game has many lines about OTHER houses (j55 tdPowAdd family: `nhà ${c} thế lực ±n`, `nhà nàng thế lực ±n` j55:183, `nhà Hộ bộ / Lễ bộ / Đại tướng quân thế lực ±n` j55:82-92, `kèm: nhà ${c} thế lực` j55:168). The hint then tells her the wrong thing. Run on LIVE-build + this branch with kitHint (levels 0/1/2), my probe:
| option line | hint says | truth |
|---|---|---|
| `thành: nhà nàng thế lực -6 · nàng mất chỗ dựa` (Tung chứng cứ, j55:183) | «nhà ngươi thêm vững thế, nàng mất chỗ dựa» | HER rival's house sinks; her own house is unchanged |
| `được tha · kèm: nhà Lễ bộ thế lực +3` | «được tha, nhà ngươi thêm vững thế» | the Lễ bộ house grows, not hers |
| `thành: nhà Đại tướng quân thế lực +6` | «nhà ngươi thêm vững thế» | the general's house, not hers |
Before this branch these lines were an «unknown stat line» (silently dropped from the hint); now they print a FALSE statement — breaks law 6(a) (the hint must be true now) and the kit-hint rule «read from the option's OWN data». Tests miss it: kit-e-rows.js only feeds the exact form «thế lực nhà ±n».
Fix (kit only, jk2b): scope the regex to her own house — e.g. `/thế lực nhà (ngươi|ta|mình)|nhà (ngươi|ta|mình|mẹ đẻ|cha) thế lực/` (E28's exact string is on a branch I cannot see: keeper please use E28's own wording) — and leave other houses unmatched (as before) or give them their own triple with the sign read from the line; add 3 negative checks to kit-e-rows.js (the three lines above must NOT say «nhà ngươi»). Re-run kit-e-rows + kit-cost-rows-home + core gates, then I re-verify.
