# emo-seal-vanish — report (branch review/emo-seal-vanish, sha 631ad03)
PRIORITY #1 CHECK: OD 18/11 05:50Z bug line | main jevb.js:57-77, jpcf.js:95, jfigseal.js | review/* none | claims MAIN ROOT-45.

## Root cause
Stage people (curPeople/homePeople) are plain descriptors {kind,name,ini,col,info} (maid has no ref). Tapping a seal opens emoBox, whose kitName(p)/kitModal(subject:p) calls kOf61(p). kOf61 registered the DESCRIPTOR itself under a fresh key x<N> (e.kk) at know-level 0. From then on kitKnown(descriptor) = false, so kitEmotion() = null, emoBadge() = "", and jfigseal dropped the seal for good (it never came back after closing; the box also showed "???" instead of the name).
## Fix (shared code, dev/build/j61.js)
New k61StageDesc(e): a descriptor resolves to its real person (e.ref, else S.maid for kind "maid"); an unresolved descriptor is never registered and stays "known" as before. Used in kOf61, k61St, k61PortEnt. Nothing else touched (existing k61Desc left as is).
## Whole group test: dev/test/emo-seal-persist.js
For the room stage, a place stage (garden, 5 people) and the event dialog: counts seals, taps EACH seal, closes the box, asserts the count is unchanged. Exit 1 on mismatch.
| size | before fix (fails) | after fix |
|---|---|---|
| 1180x820@2 | room 1 (timing), place 6 of 8 seals vanished | 0 fails |
| 755x1000@2 | place 5 of 7 vanished | 0 fails |
| 1000x755@2, 1366x1024@2 | not run before | 0 fails |
Event dialog (box opened over the dialog): 0 fails before and after.
Note: a few NPC seals on the Fold room view are not tappable (covered by the side rail); they do not change count.
## Checks
quickcheck: PASS (core gates PASS, open 1292 ms, old save ok, perf new/live render 147/182, buổi 719/808). Shots looked at in scratch (not uploaded: no CDN permission needed, images never in git).
Unrelated pre-existing page error seen in kitPopSample('event'): "f.rk.split is not a function" (not touched).
