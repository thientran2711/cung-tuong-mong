# review/map-frame-kit-r1 — report

Base: review/pl-courtyards-r3-r1 c4ec5d14 (= opt-greyed-r1 + pl-courtyards-r3 f42dd31c) + origin/review/map-frame-kit 036c5dd5. Conflicts: assemble.py (list = keeper's + jgrey.js before jmapc.js, which stays last), KIT.md (§84 and §85 both kept), index/sw/assets rebuilt.

## Verdict: PASS
## Change by me
- Kit fix: `.ktam` stand-in chip position moved INTO kitTam (jgrey.js: top-right, one position everywhere); removed the per-place override `.kpmv .ktam{top:6px;bottom:auto}` from jpm.js; KIT §84.4 updated.
## Checks
- map-frame-kit.js at 755x1000, 1180x820, 1366x1024, 412x1058: PASS (0 .msil, slip on every .mlab/.mmeta, 0 overlaps at default/+1/+2, tools band above the map, palace detail ok). Looked at Fold + iPad map and palace detail shots: slips legible, one text row "N bóng · K khắc", no dark chips, no cut text.
- ledger_shadows.js: bad 0 (30 moments, shown 1623 = record 1623, 0 page errors).
- roster_dom.js: reports 7-8 "roster.js <place>: tool N, màn hình M" mismatches (screen count larger than the record) — SAME on plain origin/main (7 bad with the old test), so not caused by this branch (it reads the count from .mmeta fine). Needs its own look by the people-ledger owner; not blocking this review.
- pl-courtyards-nostandin 1728 cells unmarked stand-ins 0; single-hall Fold+iPad fails []; opt-greyed 2/2 PASS; coop-e2e 59/59; QUICKCHECK PASS (a first run showed one noisy buổi median 1734 ms, rerun 726/685 ms).
- KIT consistency: .mlab/.mmeta slip same in Dư đồ and palace detail (.kpm-spot); .msil gone everywhere; one 'tạm' chip look.
Shots scratch-only, none on the CDN.
