PRIORITY #1 CHECK: OD 13:12Z/13:32Z | main none | review/* map-portrait 6fce1585, my r1 1d583ae5 (superseded) | claims worker session_01UV1SzgdgEdCimFsVYDscwL

# review map-portrait-r2 68979111 (= worker 6fce1585 + origin/main d0a839e8 + 1 fix)
Verdict PASS. Worker's '!' (bright yellow, glow, hop, static on reduced-motion) is equivalent to my r1 fix and looks right (iPad + Fold shots).
FAIL found + fixed (main's LOOK note): place label 'Vĩnh Thọ' showed 'Thái giám ???'. Cause: j61 k61Node scrubs every text node that spells an unknown person's name; a place named like a servant got masked. Fix: K61SKIP now includes '.mspot .mlab,.mtile>b' (all map spots + place tiles = whole family of place labels). New test dev/test/map-place-mask.js (reproduced FAIL before fix with 'cung nữ ???', PASS after, 3 runs).
Tests host build file://: map-portrait PASS 6 sizes, map-full PASS 5, map-frame-kit PASS 755/1180, map-place-mask PASS, media-check 0, img-allowlist OK, 0 page errors. quickcheck not run (http blocked by proxy 405).
Open items unchanged from r1 report (courtyard .kpmv column, 390 shows ~5 labels, 390 header overlap pre-existing).
Note: r1 (1d583ae5) is superseded, use r2.
