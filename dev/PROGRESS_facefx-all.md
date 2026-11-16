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

## r1 (review/facefx-all-r1)
- Merged origin/main 4f5e5f3b3 (appearance-port) into facefx-all; only index.html/sw.js conflicted (generated): rebuilt.
- Fit rows added to CDN img/veil-fit.json + scar-fit.json (1574 -> 7666): eunuch por/fig 961, emperor 16, kid 432, physician 28, man 248, official 56, toilette variants maid/consort -tN- 2,848 (+0 for fig-maid-m15-t8-a18: no face found). Method + scripts: dev/art/facefit/README.md. 12 fig-kid-*-a4 rows by relaxed Haar (toddlers), checked by eye.
- Owner add-on 16/11: api.scar(p,sev,by,how) (jface.js 4b): same person lookup + seen rule, deny scheme scar on emp/thaihau (accident/illness allowed), scar layer by the seen rule on every face place, weekly heal70 for everyone. Slap tiers: api.slap(p,by,why,sev) / p.slap.sev 1..3, opacity .5/.7/.88 on fx-slap.png (data-sev), old slaps default to sev 1; sev 3 swelling layer = later.

## r2 review (review/facefx-all-r2)
- Merged origin/main eba64ead4; generated index.html/sw.js/assets.json rebuilt.
- Tests fixed (not game code): jbook.js on main redefines kitPortrait() as an orientation check, so dev/test/facefx-scan.js and appearance-port.js got `false` for every portrait; both now build portraits from kitFace/pframe/mdH (window.KP). facefx-scan sets REAL knowledge (S.known via kOf61) instead of overriding window.kitKnown, which only changed the person check, not the portrait picker (this was the "known but silhouette" caveat).
- appearance-port 'layer.fitrows.kid' flaked when the picked toddler died during the test's 6 simulated weeks (fxLive false): expected, not a code bug.
