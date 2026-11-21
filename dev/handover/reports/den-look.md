# den-look report (worker, 21/11)
PRIORITY #1 CHECK: OD 2029 | main jts.js den/tsEngSteer, j82 kg82FxBad/kg82FxLane | review/* none on den look | claims none
Branch review/den-look @ 93436938 (base origin/main b1033eb0).
## Done
1. Hoa đăng: kg82FxBad no longer draws the danger ring + ✕ badge (kit part, j82); only the hit burst/shake stays. Lotus = plain painted lotus in play and guided round. Rules picture (CSS .kgr-demo dodge): plain pink lotus, no ring/✕.
2. Light streak: kg82FxLane keeps its brightness (BAL.mgFx.lane) but the white edge lines are gone: core fades softly at the sides, dimmed board fades in over BAL.mgFx.laneFade (new, .25) of lane width. Rules-picture lane: gradient, no white borders.
## Whole group (law 11)
| element | users | before | after |
| avoid ring+✕ | only den (kg82FxBad) | ring+badge | removed; no other game used it |
| straight lane kg82FxLane | den, duho | white edge lines | soft fade |
| lane.path | hát ribbon j91 | white edge lines | soft glow, no stroke |
| lane.stroke | thư pháp jnwp | white ring halo | soft glow halo |
| lane.zone | nấu j91/jtd, Tu đức | white edge lines | no lines, soft glow |
Not touched (list for main): jhd.js spot ring, jlant lit ring, kg82 press ring = target highlight rings, not streak/avoid edges.
## Tests
mg-play2 19/19 (test updated: pads have no exact --bad red), mg-allkinds 7/7, quickcheck PASS, coop-e2e 68/68. Shots Fold 755x1000 + iPad 1180x820 before/after looked (kept in scratch, not in git).
