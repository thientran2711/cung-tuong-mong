# fest-fx r1 — reviewer report (BIG review, s22)

VERDICT: **PASS b6d05b2d1bbf647dc785520d99dfb832b7420a76** (branch review/fest-fx-r1; ancestor = origin/main a0d93ac8 at push time; fast-forward possible).
Reviewed: review/fest-fx @ a114024a (worker report dev/handover/reports/fest-fx.md), merged onto latest origin/main (3 merges: main kept moving; only build files conflicted -> took main's, rebuilt with dev/site/build_site.sh).

## Owner rule check (OD 18:53Z + 19:35Z/19:45Z; read in OWNER_DECISIONS)
| rule | result |
|---|---|
| fireworks + sky lanterns ONLY Tết + Giao thừa, tối | PASS: FESTFX.festival = newyear, giaothua, [B4L]; matrix 14 fest x 4 buổi x 5 scenes; e2e Tết tối = festival, Tết chiều = none; iPad shot shows fireworks + lanterns on Tết tối |
| Nguyên tiêu / Trung thu lanterns only tối | PASS (FESTFX.lantern); iPad + Fold Trung thu tối shots: lanterns only, no fireworks |
| fireflies Thất tịch / Trung thu tối | **was broken, fixed in r1** (see fix 1) |
| gold sparks Tết / Giao thừa / Nguyên tiêu any buổi | PASS (FESTFX.gold buoi null; kfWxCfg + pxKind both 'gold') |
| ordinary evenings + Thanh minh: nothing | PASS for festival FX: ordinary tối and Thanh minh chiều/tối = no kitFx, weather layer = plain weather; shots Fold + iPad clean |
| indoor/outdoor irrelevant | PASS (place list removed from j33 and, in r1, from jfx kfWxCfg) |
| effect matches current buổi/event | PASS after fix 1 |

## Fixes made by the reviewer (commit 9a850b4d)
1. dev/build/jfx.js kfWxCfg (the PAINTED weather layer that actually shows festival petals/fireflies) still had its OWN festival list keyed by an indoor/outdoor place list and NO buổi gate: fireflies played on Thất tịch / Trung thu at sáng/trưa/chiều (probe: Thất tịch trưa -> wx "fly:orb"). The worker changed only j33 pxKind (code-drawn Pixi layer). Now kfWxCfg reads FESTFX: `if(kfFestFx("gold"))id="gold";else if(kfFestFx("fly"))id="fly"`. ONE table now drives every festival effect.
2. dev/test/fest-fx.js: new check "weather layer kfWxCfg + pxKind follow FESTFX" over the whole matrix (would have failed before fix 1).
3. Removed the worker's 10 test shots dev/shots/fest-fx/*.jpg from git (owner 18:40Z/18:50Z: images not in git; unused test shots stored nowhere). No images committed by r1.

## Tests (on b6d05b2d)
- node dev/test/fest-fx.js . <out>: ALL PASS (20 checks incl. the new one), 0 page errors.
- dev/tools/quickcheck.sh: QUICKCHECK PASS · open 854 ms · old save ok · perf new/live render 314/268, tab 294/392, buổi 1064/927 ms, tasks>200ms 12/13 (noise-level).
- Old saves (own script, several): 3-buổi saves at buổi 0/1/2 -> 0/2/3; menPlans b [2,1,0] -> [3,2,0]; srv.sent.until + srv.once re-counted; a save already b4 is NOT re-migrated; a save without menPlans/pl67 loads and renders; new saves carry b4; 0 errors. (pl67 re-count checked by the worker test before render; render drops my synthetic pledge because it does not match a real story beat — expected.)
- Co-op: not touched (jfx/j33 are local visuals, jmen/jstory/jgift logic unchanged in sync paths) -> coop-e2e not run.
- Shots looked at (not stored): Fold 755x1000@2 + iPad 1180x820@2 of Tết tối (fireworks + lanterns), ordinary tối (nothing), Trung thu tối (lanterns only), Thanh minh chiều (nothing). Fold stage backdrop is sometimes blank in the harness on a fresh page (CDN load timing) — not this branch.

## Notes for the coordinator (not blocking)
- jstory pledge deadlines dl67Khan/Vua/Lon stay in buổi (4/9/21): with 4 buổi a pledge is ~25 % shorter in days (worker flagged; balance call).
- Ordinary nights still have WEATHER fireflies (kfWxCfg: night + dust/"đom đóm") and the night decoration kfDeco (4 warm lamp orbs + 14 small sparks outdoors) on every tối. These are weather/night ambience, not festival FX (owner approved visible fireflies as weather, OD 12:08Z). If "ordinary evenings: nothing" was meant to cover them too, that is a separate weather task.
- Lanterns already in flight keep rising a few seconds after the buổi changes (one-shot); harmless.
- Worker report fest-fx.md test list still has v2 lines ("Tết tối none; Giao thừa tối none") — the test itself checks the v3 rule (festival on Tết/Giao thừa tối).
