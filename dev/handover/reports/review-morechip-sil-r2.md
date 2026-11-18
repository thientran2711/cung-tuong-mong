# review morechip-sil-r2 (reviewer, MAIN s33)

PRIORITY #1 CHECK: OD 17/11 ~14:05Z + ~14:15Z | main j59chips, KIT 33.9 | review/* morechip-sil d51137ff (base), morechip-sil-r2 | claims morechip-sil worker session_01UV1Szi57hvzWiNmX4GRXYk

Result: **PASS 4821b39d** (review/morechip-sil-r2 = origin/main abe056c3 + morechip-sil d51137ff + my fix; index.html/sw.js conflicts resolved by rebuild).

## Checks
1. Icon = group of 3 grey silhouettes, reads at chip size (looked at Fold + iPad shots): OK.
2. Chip text "+N": OK (scan checks /^\+\d+$/).
3. True corners (<=14 px from stage edge or flush to side column), Fold/iPad Air/iPad Pro/412/390: morechip-scan MORECHIP OK, step-ups 0.
4. Header "Name [plaque icon N]" via j59hdrCount, one light kit plaque: OK.
5. One kit function (j59ico / j59chipIco / j59hdrCount), aria-labels kept: OK. quickcheck PASS (old save ok, core gates PASS).

## (a) COUNT MATH — real bug, fixed
Cause: j59.js `before` (left chip) added +1 for the player when she is off the page, but header N = people in S.visit.people (others only). Example: header 5, view 2 + L+2 + R+2 = 6.
Fix (j59.js line 229): `before` counts others only. Scan (all places x pages, Fold + iPad Air): visible others + L + R = N on every page (fold dtd: 1+0+4, 2+1+2, 2+3+0 = 5; iPad: 3+0+2, 2+3+0 = 5). Convention: N and chips = other people; the player is not counted. A left chip that would only hold the player is now hidden.
## (b) place name on dark scene — fixed
`html body .stage #sc-t h2 .rt1` now sits in the same light plaque (#fff8ee, 2 px border, shadow) as the count plaque; no more text-shadow-only name. Every place header (one rule). Note: sandbox cannot load CDN backdrops, so the dark scene itself was not seen; plaque is independent of the background.

## Not checked / notes
- Shots stayed in session scratch (not CDN; nothing to wipe). Header icon sometimes empty in my shots = CDN image not loaded in sandbox.
- "Không gặp ai." (0 people) still text (worker's open question for main).
