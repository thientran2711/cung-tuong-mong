# review/weather-fx3 @ 77ac0d6d (owner 16/11: snow + fireflies look redo)
START_CTX ~10 % (estimate); no rollover needed.
- Merged review/weather-fx2 onto origin/main 23595c37 (FESTFX present; FESTFX wins: festival mapping via kfFestFx("gold"/"fly"); fx2 petal mapping dropped). KIT.md has no conflict markers.
- Real look with the existing soft "orb" sprite behind ONE swap line `KF_SPR={snow:"orb",fly:"orb"}` (jfx.js). For Foreman C's snow-real-* / fly-real-*: add to KFK_SP (jfxkit.js) + change those two names.
- Snow: mixed-size soft round flakes, depth z (far tiny + slow, near big + soft + faster + wider sway), blue-white body + white core for near ones; caps 150/190/30/84.
- Fireflies: halo (green-gold, additive at night) + tiny warm core, depth, slow deep blink (v.bl), wander; cap 90 (~28 flies on Fold).
- Summer NIGHT no longer shows sun rays / golden motes (kfSeCfg id "sunn", off).
- Blank-backdrop root cause in the old videos: #kroul (Luan hoi roulette) left in the DOM -> kitStageCovered() paused the Pixi backdrop. dev/test/weather-video.js dismisses it (recorder, pins KFX.q=1).
- Videos (handover branch dev/handover/reports/weather-videos-v3/): snow-winter-day + fireflies-summer-night, 755x1000@2 and 1180x820@2, 10 s. Old v2 videos removed from review branch.
- Tests: weather-port 755x1000@2 + 1180x820@2 PASS 0 page errors (re-run after final merge 755x1000 PASS); game-feel 0 errs, overflowX false, off switch 0 parts, old save + offline OK. Not re-run after the last merge: game-feel, dedicated FESTFX test (none found in dev/test).
SẴN SÀNG KIỂM 77ac0d6d on review/weather-fx3.
