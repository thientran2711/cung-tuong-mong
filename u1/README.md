U1 (pairs 1-2, SWAP=0, X=Fold hosts, Y=iPad guest) — week-end STUCK repro saves, harness 5a65a561.
- pair1-S1-stuck-wk22-buoi3-yr97b6.json: room stuck at buoi 3 week 22, both #next enabled, no bend, sent=21 (STUCK=240 s). Saved 08:53Z 24/11.
- pair2-S1-stuck-wk14-buoi3-1v7zrt6.json: room stuck at buoi 3 week 14, sent=13 (STUCK=600 s). Saved 17:28Z 24/11.
State lines (host/guest JSON at first/last hit): dev/handover/robot/coop-20261124-0723-p1-2.md, bug "stuck" rows 1-2 (handover branch).
Other stuck rows of pair 1/2 kept no repro save.
- pair1-S1-saveroundtrip-feelMig-ta5rfc.json: the only save round-trip repro U1 kept (host, save.S.visit.people.0.__feelMig 1 → undefined, 8 hits, found on harness 0a593f8e era, i.e. before the __* skip of a7951358/d4b4408d). Later harnesses skip visit.people[].__*, so no new round-trip rows with repro saves appeared.
