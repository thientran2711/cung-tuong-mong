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

## REVIEW (small reviewer, Sonnet, on review/hdr-kiep @5d0039dea184ce0f8237c24fea673005f2ce0f8e)
PRIORITY #1 CHECK ('kiếp thứ'): OD row 23/11 ~20:50Z | main jge.js:112 geLifeNo (reused via geK.lifeNo) | review/hdr-kiep | claims MAIN 111 hdr-kiep. 18 laws, START_REVIEWER, OD 23/11 ~20:40–20:50Z read.

**VERDICT: PASS**

1. One source: chip = kpLife(geK.lifeNo()) = lifeLog().length+1. Real flow (host mode, Fold): fresh → «Kiếp thứ nhất»; after real lifeSave()+start() ×3 → «hai», «ba», «tư». Seeded logs 1/2/3/10/11 → «nhất/hai/ba/mười/11». Co-op: lifeLog is each phone's own local store, so each player sees her own count (by construction; no live 2-phone run).
2. Kit only: reuses the existing kit age chip class `k3age` and its one CSS rule (selector extended to #me-k); no private style, no new frame. Words from the same KP_NUM table as «năm thứ…».
3. Screens (looked, scratchpad, not in git): shots hdr-kiep-755x1000-life{1,3,11}.png, hdr-kiep-1180x820-life{1,3,11}.png (worker) + host-mode Fold/iPad worst case «Hoàng quý phi · 45 tuổi · Kiếp thứ mười» (worst-fold-r6-n10.png). Same row as rank + age, no wrap/clip/overflow; header height unchanged (Fold 151→157 in host mode incl. status stack, iPad 151, same as before); nearest right neighbour (status text) 20 px clear of the chip at the worst case; nothing else moved.
4. Run by me: dev/test/hdr-kiep.js 10/10 pass; dialog-fixed all pass (both devices); kit-info-fixed PASS 755x1000 + 1180x820; build_site.sh (media-check, img-allowlist, assemble) OK; no page errors. Old save: key `cung-luanhoi` missing/legacy `cung-kiep` only → «Kiếp thứ nhất», no error; the diff only READS lifeLog, no save-format change, so old saves cannot break.
5. Diff = jk3.js (header chip hook + 1 CSS selector), j79.js (kpLife) and test hdr-kiep.js only. No other layout touched (owner 23/11 «đừng có sửa cái gì nữa» respected).

Not run (honest): the whole quickcheck suite (no single suite entry in dev/test; ran the 3 relevant tests above), a live 2-phone co-op session, a real old save file from before this build.

LAND READY review/hdr-kiep 5d0039dea184ce0f8237c24fea673005f2ce0f8e
