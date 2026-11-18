PRIORITY #1 CHECK: OD 0 | ledger 2 | claims 7 | main 1 | review/* 3 | archive 23

# Review of review/toil-react-top @3aa504ad21c17d1fba304f154a128189254604cf (verdict branch review/toil-react-top-rv)

1. Diff scope: origin/main...branch touches ONLY dev/test/toil-react.js (+1 token `#klife`) and new dev/test/toil-react-layers.js. No dev/build, no kit CSS, index.html identical -> SMALL tier.
2. Worker verdict "test wrong" CONFIRMED. KIT §35.3 + dev/build/jload.js: #klife is a start-up cover (full-screen .modal, opaque title backdrop, z 2147483500). lifeGate runs ONLY from start() (jload.js:291) and when a NEW S object reaches render() (new life / Tiếp tục / Luân hồi / load / co-op join, :286); mid-play re-checks only fetch pictures, they never cover. It is a modal layer that eats all taps, closes itself when pictures are in (cap 25 s, "Vào cung ngay" after 6 s). A toilette reaction needs the player to act in a running life, so she can never be under it; a dialog queued at load stays hidden behind the cover and shows on top once it fades. Not a game bug. The test is not weakened: it still asserts the modal is on top at its centre; the observer only strips a designed cover the real flow also removes.
3. toil-react-layers.js: really calls toilReact -> toilFlush -> showModal for 8 kinds (rival-jealous -2/-1, rival-praise, crowd-jealous, th-praise, th-dislike, emp-dislike, emp-like); each opens the one #modal, elementFromPoint at 3 points (modal centre, dialog centre, dialog 85 %) is inside #modal, no layer above z30. Ran 3x Fold 755x1000@2 + 1x iPad 1180x820@2 on the final merge: all PASS (fails [], errs []).
4. Gates on final merge (origin/main 3ff8196 merged in): toil-react.js PASS 3x Fold + 1x iPad 1180x820@2; one-core-guard 0 fails; quickcheck PASS (old save ok; render 198/182 ms, tab 447/420, buổi 1059/1020, tasks>200ms 15/18). (An earlier run on main 550dd1b was also PASS; one buổi median 1163/985 was noise, test-only diff.) Fold + iPad shots LOOKED at: modal on top, no overlap, no cut text; empty picture slots only because the sandbox has no CDN. Ran via file://. Shots in scratchpad only, none in git, no CDN review folder used.
Note: worker said CLAIMS entry not added; harmless.

(origin/main moved to 4cb3a9e after the full run: merged, re-ran toil-react Fold, layers Fold, one-core-guard = PASS; diff still test-only)

PASS 84de2423db0265f4caeaf5a0971ed2853f0308a4
