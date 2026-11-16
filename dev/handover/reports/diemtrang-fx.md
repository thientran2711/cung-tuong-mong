# diemtrang-fx report (review/diemtrang-fx @ f7097061)

## (1) Black face disc: ROOT CAUSE + FIX
Face-layer `<img class="kmk">` (makeup skin/brow/lip layer, jtoil) collided with the kit tick-mark class `.kmk{background:currentColor;mask}` (j79, commit 597dc79c): every layered face got a dark-ink rectangle over the portrait. Fix: layer class renamed `kmkl` (jtoil, tests, KIT.md). Group scan (all `<img class>` tokens vs bare CSS rules with background/mask): only `kmk` collided; one kit rename fixes kitFaceZoom, pcPort/stage layers, reveal, kit page.

## (2) Rim light only (KIT §68.7)
ONE guard in jfxkit: `kitFxRim` + `kfkPersons`/`KFK_PERSON`. kitFxLight, kitFxSheet(light), kitFxBurst(glowburst/orb/lotuslight) draw a rim (drop-shadow on the picture silhouette) instead of an overlay when the light meets a person.
| place | before | after |
| reveal glow-gold on figure (jtoil) | screen-blend glow over her | rim on silhouette; sparks from silhouette edges |
| rank-up glowburst+glow-gold on .kmfr (j93) | over avatar | rim (via guard) |
| kfFlash gold/warm (decree, promote...) | glowburst at screen centre over figures | rim on persons |
| kfPx rays / lotus | rays/lotus light from a point over persons | rim |
| KF_RAYS summer shafts | over stage figures | not drawn while persons on stage |
| .kpod-beam (j90 podium) | screen beam over figure | z-index -1, behind figure |
| fireworks / other kitFxLight(null) | over persons | rim when persons in box |
Not person-lights (unchanged): kmlight box light, kcf-halo (card), jne painted-scene lights, btr-light (buổi transition), jcoopchat rail glow, flat dark/night colour washes, particles.
Test: dev/test/rimlight-scan.js (755x1000: bad 0). Known gap: Pixi sprites cannot be hit-tested; person-targeted glowburst/orb rows logged no rim in the scan (person probably covered); worth a reviewer look.

## (3) Makeup reveal (KIT §60.5 rewritten)
No round frame. One `.ktrv-cam` (room plate + full figure): figure steps in, rim effect, camera zooms to her face with clothes, her portrait laid over the face by toil-fit (crisp), same background; scene-end kit button. Camera uses layout metrics (design canvas scales the overlay) and re-aims after the scene-end bar. Tests updated (mk-reveal.js, toilette.js close via .kmend, OD:L1261). toilette.js 755x1000 pass, mk-reveal 1180x820 moc/dep/diem/vung pass.
Caveat: portrait asset has a small alpha notch at one cheek edge (art, not code).

## Not done
Mini-game layout -> session_01UV1Szhm13GLNs2444D3agj (review/minigame-frame). toilColUI colour screen still uses kitFaceZoom (that worker replaces it).
Shots: local scratch only (/home/user/wt/diemtrang-shots); CDN upload not done.
~95% xong / ~85% chơi được (reveal + bug); layout pending.
