# review-diemtrang-fx-r1 (reviewer, SMALL tier)
Branch review/diemtrang-fx-r1 = review/diemtrang-fx f7097061 + merge origin/main f1509d7c (index.html/sw.js/assets.json/CHANGE.txt taken from main, site rebuilt; assemble.py needed no union).
## Verdict: PASS
- Black disc: face-layer class kmk -> kmkl everywhere (jtoil, tests, KIT.md); grep: no remaining face-layer use of .kmk; the kit tick-mark .kmk (j79) untouched.
- Rim light: kitFxRim + kfkPersons guard in jfxkit (kitFxLight / kitFxSheet(light) / kitFxBurst(glowburst, orb, lotuslight), rays, lotus, KF_RAYS, podium beam z-index -1). rimlight-scan 755x1000: 9 entries, bad 0, no page errors.
- Reveal: full figure -> camera zoom, no round frame, scene-end kit button; mk-reveal diem+vung at 755x1000 and 1180x820: no overflow, no errors; viewed shots (rim outline only, face clean). Note: portrait art has a small alpha notch at one cheek edge on the Fold shot (art, known by worker).
- toilette.js 755x1000 pass (face layers in header + stage), coop-e2e 59/59, quickcheck PASS (172 s).
