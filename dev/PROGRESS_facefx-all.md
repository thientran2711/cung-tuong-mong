# PROGRESS review/facefx-all (from review/appearance-port-r1 @86234a24c)
Owner 16/11: the face marks (ốm, trúng độc, bị tát, bị phạt, nổi mẩn) apply to EVERYONE through one state; only Hoàng thượng / Thái hậu are never slapped or punished.
## Done
- jface.js: `KIT_FACEFX.person/everyone/owner/seen/kind/live/group/api`; pcard + kitFxLayers use the lookup; one seen rule; deny table only {tat,phat} x {emp,thaihau}.
- States real for everyone: `fxIll` (Hoàng thượng long thể, Thái hậu S.thIll, servants, children hp<35), pz/slap/pen/rash guards use `KIT_FACEFX.live` (servants have no `alive`).
- Causes: `fxIllMonth` (same odds/seasons/care/worsening/death as j13 for non-consorts), epidemic -> servants, j70 taster survives poisoned, j10/j24 Phạt a servant -> kneeling (+slap if unjust),
  `fxServMonth`: servants with grudge / loyal<30 harm a fellow servant (tát / mẩn / độc); hostile consorts reach her servants and other cung's servants (+evidence 40%).
- jrash.js: rash for anyone (spring + bad luck monthly for everyone), heal weekly for everyone.
- jk2b.js: `kitFxPut` (shared), room-stage tokens without `ref` (Hoàng thượng, Thái hậu, cung nữ thân tín, thái y) now get layers; podium (j90) gets layers.
- Tests: dev/test/appearance-port.js (section 3, 86 checks) and dev/test/facefx-scan.js (surface x person table).
## KIT REQUEST
fit rows (img/veil-fit.json + img/scar-fit.json, same schema) for por-/fig- of: eunuch (120), emperor (8), kid (por-kid-*), physician, man (por-man-*), and the toilette variants por-maid/consort-*-tN-* used by some rivals. Until then those people get chips, rules, logs, but no picture layer (never a guessed position).
## Notes
- j61 acquaintance gate hides chips on cards of people she only knows by name; the face layer follows kitIsKnown + owner rule.
- review/elder-staff: plug in with KIT_FACEFX.group({id:'elder',list:()=>[...]}).
