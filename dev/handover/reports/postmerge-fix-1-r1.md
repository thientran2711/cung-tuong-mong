# postmerge-fix-1-r1 — PASS 27ae24cf (descends from origin/main 0c23da40)
Branch review/postmerge-fix-1-r1 = review/postmerge-fix-1 merged onto the latest origin/main (conflicts only in panel-size.js, resolved by hand: kpshort + compact-table checks both kept; index.html/sw.js/assets.json rebuilt with dev/site/build_site.sh). Diff vs main: j12.js, jsl.js, KIT.md, panel-size.js + rebuilt site.

## Checks
- Tint scan (active build files in assemble.py + dev/index.html + built index.html): KIT_SCENE_TINT 0 hits; j12 lightTick draws no buổi wash (only weather washes: wet / snow / frost, 1/4 strength on a painted buổi scene); jsl no b4Light override.
- Runtime scan, 20 places (home, vuon, thu, dtd, tn, kn, tyv, ksp, lc, nvp, cnh, tgk, ttp, acs, dc, rival palaces r1-r5) x 4 seasons x 4 buổi = 320 renders: every one resolved to the exact painted <scene>-<season>-<buổi> file; 0 non-exact; no .light wash on dry weather; scene filter only none / rank grade (saturate 1.04 / 1.07 on rival palaces, by owner rank, not buổi). 0 page errors.
- CDN index check: all 16 variants exist for the 12 scenes in SCN_VAR + cung-nhan, thuong-thu-phong, a-ca-so, dong-cung; RES_VAR 25 residence families all 16/16; map-<season>-<buổi> 16/16.
- Screenshots viewed (755x1000, 1000x755, 1180x820, 1366x1024, 844x390): home night (lanterns), dtd chiều, tyv chiều, lc winter night, vuon trưa: painted light visible, no brown/blue wash, nothing blank.
- panel-size.js (incl. kpshort) at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: exit 0, 59 cases, kpshort dy=0 mx=0 centre in all 12 short panels, errs 0, nofit none. (btnOut PEND:plantpick at 1000x755/1180x820 is a pre-existing non-failing note of the test, not this change.)

## Not tinted but still buổi-dependent (not scene washes; owner may want to know)
1. KIT_LIGHT --klf (jsl.js): per-buổi filter on CHARACTER figures; BAL.klfStrength=0 default = brightness(1), i.e. off.
2. jsl.js .stage.kown.kwet(.night) .light: warm wet-weather wash (weather, only on rain/thunder/heavy snow); the .night variant only changes its strength.
3. body[data-buoi=1/2/3] .panel colour-mix (UI panel background, not a scene).

## Scenes WITHOUT a full painted buổi set (art queue D54)
Place/room scenes: none (all 16 present). Gaps are non-scene-set art:
- Festival maps (map-fest-*): only the festival's own buổi exist; other buổi fall back to the normal map-<season>-<buổi>: doanngo trưa only, dongchi sáng, giaothua tối, lapbat sáng, nguyentieu tối, phoenix sáng, thanhminh sáng, thanhtho sáng, thattich tối, trungcuu trưa, vantho sáng, vulan tối; newyear + trungthu have sáng/chiều/tối (no trưa).
- Event illustrations ev-* (279 files, single painting each, no season/buổi) and act-* cards: by design single pictures.
- Dư đồ kc maps map-kc-kinh / map-kc-nha: single.
- Legacy unsuffixed map-sang/chieu/toi.webp still on CDN (unused fallback).
