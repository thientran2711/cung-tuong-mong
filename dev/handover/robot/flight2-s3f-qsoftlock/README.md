Slot-3 runner, life flight2-s3f (iPad, bot=cautious). Harness 496b6b66 at the time of the stalls (switched to 8dc395ba at 00:53Z; same life).
- bugs-qsoftlock.json: R.bugs entries (a) «Sang ngày mới» x3 no turn, Q=1 «Tin trong cung buổi này» (n=19, first at=4089s); (b) «Có tin đang chờ · xo…» disabled no dialog, Q=8 + 150-tap no-clock loop at «Vĩnh Hòa cung · Tư Tĩnh trai» (at=5708s). Each entry carries the harness' own state fields.
- trace-ring.json: last 400 trace rows at copy time (ring buffer, not necessarily around the stalls).
- noturn-1-dump.json.gz / noturn-8-dump.json.gz: harness no-turn dumps {at,url,ls,S,top,coop,Q} (first and last of 8). Not exposed by the harness: DQ/used/dqActEl/dqDawn/dqFreeScreen, #modal hidden, #next disabled text.
- Page version at the stall time is NOT recorded by the harness (page = LIVE github.io at launch/reload; last reload = resume at 00:11Z, before my 00:53 switch).
