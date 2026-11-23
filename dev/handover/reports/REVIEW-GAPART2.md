# REVIEW-GAPART2 — verdict: PASS 8a957cca (review/gapart2-r6, fast-forward of origin/main 4ad20bd6)

Reviewer: REVIEW-GAPART2, child of ROOT-C6. 23/11 ~06:10Z–07:35Z. START_CTX ~5 % (estimate); finished ~35 %.

PRIORITY #1 CHECK: OD owner 23/11 03:15Z/03:25Z (non-character art resume, finished pictures go straight in) | main 52ad65b3 → 4ad20bd6 during review | review/gapart2 @67e6005c (off 52ad65b3) | claims GAPART2 (worker report dev/handover/reports/GAPART2.md).

## Landable sha
**8a957cca** on `review/gapart2-r6` = GAPART2 67e6005c + reviewer fix 7f4013e0 + merge of origin/main 4ad20bd6 (index.html/sw.js/assets.json rebuilt by dev/site/build_site.sh). `git merge-base --is-ancestor origin/main 8a957cca` = true.

## Reviewer fix (found in the LOOK, BLOCKING for M84, fixed here)
M84 pictures never showed in real play. `jne.js` fullSrc turned a picture path into the INFO key with `.replace(/^img\//,"")`, but the site build rewrites `DIR="img/kit/"` into the CDN address (`https://ctm-img…/img/kit/`). dawnOf() and the lonely night both build their src from DIR, so the key never matched and the game kept the OLD 4:3 picture. The old lonely-night picture is a large figure of a woman (character art). The worker's test passed only because its cases hand in a literal `img/kit/…` src.
- Fix: fullSrc also strips `https?://<host>/img/` (one regex, jne.js:166). The function is still the one KIT 81c kitFullSrc, with no new part.
- Test: fullscreen-scenes.js case `newday-live` uses the SHIPPED form (CDN-address src, night + dawn, both checked). On the old build it gave 4 FAIL (port/land, dawn + night, both devices). After the fix: 202/202 PASS.
- LOOK after the fix: the lonely night shows ne-night-lonely-xuan-port/-land (the new room painting, no person) and dawn shows ne-dawn-ha/dong-port/-land, full screen on both devices. 0 page errors.
- Family scan (LUẬT SỬA CẢ NHÓM): the other kitFullSrc callers (jlevel.js learn-*) pass a key, not a path, so they are not affected. M52 shows learn-*-port/-land in real play (checked thi/vu/dung on both devices). jne is the only caller that goes through a path.

## Checks
1. **Scope**: the diff matches the report: jerr.js + jptime.js status icon tin → `icon:"img/kit/ico-tin.webp"` (same form as the only other painted status icon, ico-download, so the kit is consistent), the fullscreen-scenes test fallback fix, and the site build. All art is on the CDN, with no image in git. The 194 KP23 act pictures are not part of this landing. Nothing unrelated changed.
2. **No character art**: I looked at every picture of every set (contact sheets from the CDN). M51 ×8 and M84 ×16 have no people. M52 ×20 has small back or side views with no face visible (zoomed vu/dung/thi/hoa/cong/y). M45 ×35 has no people, only shadow silhouettes behind a lit lattice in mgbg-nghe. Outings ×4 have tiny monks/riders. No text is baked into any picture. There are no European drapes: the fest drapes have Chinese knots and cloud patterns, and the death drapes are plain white mourning silk. The style matches across the sets. Seasons are right (dong snow / ha lotus / thu maple / xuan blossom, also in the night windows). Bed curtains appear only on beds.
3. **In-game LOOK, 755x1000@2 + 1180x820@2**: all 11 ending screens with the REAL art (the stand-in route removed in a scratch copy of the test): backgrounds cover the screen, the flower sits centred on the top edge, the drapes sit on the edges, and no text is covered. The grey ribbon over the death/exile card is the existing incense entrance FX (jend.js:73, on main, also with stand-ins): a passing animation, not this art. Learn ×3 and dawn/night (above) are full screen. ico-tin uses the kit status-icon path.
4. **Tests**: ending-screens 272/272 (stand-in) + 272/272 (real art) + 272/272 on the merged sha. fullscreen-scenes 202/202 on the merged sha. quickcheck PASS twice: 67e6005c+fix at --runs 5 (render 170/191 ms) and 8a957cca at --runs 3 (render 213/172 ms = perf noise; tab/buổi/tasks are on par).
5. **ptime.test.js**: the worker said "4 FAIL also on clean main". Verified, but the test is FLAKY rather than steadily failing: clean main gave 1, 0 and 4 FAILs over 3 runs, and the branch gave 4, 1 and 4. The FAILs are always the same cases (4, 5, 6, 9 — timing of the khắc a servant lands). Pre-existing on main, not from this branch. The fix belongs to whoever owns ptime: a TEST-FLAKY item for ROOT-C6.

## 18 laws touched
4 ONE CORE: no numbers touched. 9 KIT FIRST: only kit parts (kitStatusIcon icon, KIT 81c kitFullSrc, KIT_END ov/bg, KG82_MGBG), no private part. 11 FIX THE WHOLE GROUP: path→key scan above. 12 TWO DEVICES: both devices checked for every set. The other laws are not touched.

## Open (for ROOT-C6, not blocking)
- mgbg is missing for kinds den, kinh and may (404; the game falls back to the cream gradient). duho is excluded in code. The CDN _index.json lists mgbg-td, which is a 404, a stale index entry.
- GAPART2 open items 1–3 still stand (KP23 act swap or delete of 194 unused, an ico-alert slot, outing readers).
- ptime.test flakiness (above).

Shots were kept in the scratchpad only and are deleted. No CDN review folder was used.
