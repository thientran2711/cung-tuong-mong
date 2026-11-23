# hdr-kiep report (W3, MAIN 111)

PRIORITY #1 CHECK ('kiếp thứ'/'kiep'): OD 0 before the 23/11 ~20:50Z row | main dev/build/jge.js:112 geLifeNo() (exposed as geK.lifeNo, jge.js:252; reused, not duplicated) | review/* 0 | words table KP_NUM (j79.js, same as «năm thứ nhất») reused.

Branch: review/hdr-kiep, sha 5d0039de (one commit on origin/main 225c5c08). No PR, main untouched.

## Change
- dev/build/jk3.js: the existing kit age chip hook (renderHUD wrapper, `.k3age`) now also makes `#me-k` (same chip class, same CSS rule) after the age chip → «Kiếp thứ nhất / hai / ba / tư … mười», «Kiếp thứ 11» beyond ten. Hidden if the count is unavailable. Same row as rank + age; no other layout touched.
- dev/build/j79.js: `kpLife(n)` next to `kpYear` (same word table).
- Source: geK.lifeNo() = lifeLog().length+1. Co-op: each phone reads its own lifeLog, so each player sees her own count. Old saves: no log → «Kiếp thứ nhất».

## Tests
dev/test/hdr-kiep.js (`node dev/test/hdr-kiep.js <url> <outdir>`): life 1/2/3/10/11 → correct words, chip inside header, no header/doc horizontal overflow, same row as age chip, no page errors, at 755x1000 and 1180x820: 10/10 pass. build_site.sh (media-check, img-allowlist, assemble) OK.

## Shots (looked at, not in git; session scratchpad)
.../scratchpad/shots/hdr-kiep-755x1000-life{1,3,11}.png, hdr-kiep-1180x820-life{1,3,11}.png — chip on the rank/age row, nothing clipped or wrapped.

Not done: full quickcheck suite and old-save load via a real old save file were not run; only the empty-log fallback path was exercised.
