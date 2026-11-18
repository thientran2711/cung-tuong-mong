# stage-pets r7 review r1 — WIP HANDOVER (reviewer, 11/16/2026 ~21:15Z) — NO VERDICT YET

Branch review/stage-pets-r7-r1 @ b349f50e4 (pushed). Stopped on s24 request: stage-figsize (session_01UV1SziFt6yExRxFGSGFA24) takes over the whole stage-slot fix from this branch.

## Done
- Worktree from origin/main 1aa0edb2; merged r7 6aaca31af (conflicts: assemble.py list = main + jplfs.js after jpm.js; jk3 popw rules both kept; build files rebuilt), then r1 cea021e3 (assemble list: main already superset). 19 worker shots removed from git (stage-pets-r3/r4 reports, dev/shots/pl-courtyards-*.jpg) so img-allowlist passes. build_site OK (built 6178357). quickcheck NOT run.
- dev/test/stage-slots-fixed.js PASS at 755x1000, 1180x820, 412x1058 (2 slots Fold/cover, 4 on iPad place spread, floor 719/571/777, old save loads). place-fs, stage-swipe, single-hall, pl-courtyards(+autopick): 0 page errors.
- Looked at Fold vuon + place shots: 2 people per view, pets at fixed spot, OK visually.

## Found (not fixed)
1. STRANGER GETS A PET: j59.js j59pr(who) calls kitKnown(who) on the raw person; j59known() resolves figWho(p) first. For a stranger (Hoàng hậu / "Người lạ") kitKnown(raw)=true but kitKnown(figWho)=false => pet drawn next to a grey "Người lạ" silhouette (seen in Fold Ngự hoa viên shot, nine-tail fox beside the silhouette). Fix: j59pr must use the same known test as j59known (figWho first). Same for r6/r1 code.
2. Fold 755x1000 pf scan prints overlap 29 + chipOnFig 1 for one place (pf 7th stage) — r7 says pre-layout artifact; unverified.

## NOT done
- 844x390 re-check (shrink + figures under #krail), Fold cover shots reviewed by eye, iPad 1180 shots by eye, coop-e2e, kit-conform, stage-rail (was still running), quickcheck.sh, old-save from origin/main on r7 beyond the test's own check, verdict, CDN shots (none uploaded; scratch /home/user/wt/spr7r1-shots).
- Owner "slot shift right" item from s24: not looked at.
