PRIORITY #1 CHECK ('toil-react|modal is on top|toil-react-top'): OD 0 | ledger 2 | claims 3 | main 1 | review/* 2 | archive 23

# toil-react-top — verdict: TEST was wrong, GAME is right

Branch review/toil-react-top (from live origin/main 9bbd78b), commit 3aa504ad21c17d1fba304f154a128189254604cf. Only tests changed; index.html/build identical to main.

## Cause
At the "bad" check the element at the centre of #modal was `#klife.modal.kpscene.kload.klife` (z 2147483500): the life-gate loading cover (KIT §35.3, jload.js, closes itself after pictures arrive, max 25 s; designed to sit above every layer). The test's MutationObserver removed `.kroul,#kload,.kmov.kcf` but not `#klife` (added after the test was written). Not a modal-order bug. Fix: dev/test/toil-react.js observer also removes `#klife`. No KIT/CSS change needed.

## Scan (new dev/test/toil-react-layers.js): every reaction kind goes through toilFlush -> showModal -> the one #modal (z 30)
| modal (k) | opener | layer before | layer after | top at centre/dialog |
|---|---|---|---|---|
| rival-jealous -2 / -1, rival-praise, crowd-jealous, th-praise, th-dislike, emp-dislike, emp-like | toilReact -> toilFlush | #modal z30 (no change) | same | inside #modal, nothing above, Fold + iPad |
Other layers above z30 exist only transiently (mini-game .kmov, #klife cover, effects); none present after the mirror flow.

## Gates
toil-react.js PASS 3x Fold 755x1000@2 + iPad 1180x820@2; toil-react-layers.js PASS both; one-core-guard 0 fails; quickcheck PASS (old save ok; render 157/145 ms = noise, code identical to main); Fold + iPad shots of the reaction modal LOOKED at: on top, no overlap, no cut text (picture slots empty only because the sandbox has no CDN).
Overlaps: face-zoom-stretch 717c0c0 / mg-skip-all touch jtoil.js; I did not touch it, no conflict.
Note: ran by file:// (local http server was blocked by the sandbox classifier). Claim in CLAIMS not added (not found on this branch).

SẴN SÀNG KIỂM 3aa504ad21c17d1fba304f154a128189254604cf
