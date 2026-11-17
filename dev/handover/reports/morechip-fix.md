PRIORITY #1 CHECK: OD none for "+N chip on column" | main dev/build/j59.js:81 j59chips (KIT 33.9) — the one kit part that places the swipe-stage "+N" chips | review/* none | claims: none (fix ordered by s30 to the batch builder, found in batch-0430 shots).

# morechip-fix — SẴN SÀNG KIỂM eba25768 (branch review/morechip-fix, base live main 6c4f21c3)

## Fault
Fold home (since app-edge made the Fold page shorter): the "+N more people" chip sat ON the «Nguy hiểm chung» line of the right column. Seen in batch-0430 shot img/_review/batch-0430/fold-755x1000-home.jpg (live before app-edge: chip under the column).

## Root
j59chips (the only placer of the "+N" chips, every stage: her room + every place painting, both sides) measured the right column (#kshR) BEFORE k3Stage had filled it: the column was still short, so the chip went "under" it at that height; then the column grew (Ân sủng, Nguy hiểm/Xét phẩm rows) over the chip. When there was no room under the column the 44 % CSS fallback also lands on the column.

## Fix (kit part only, whole family: left + right chip, every stage/place, every size)
1. j59chips places the chips once now and once more on the next frame (requestAnimationFrame), when the side column has its full height.
2. If a chip box still overlaps a side column / rail (#kshR right; #kshL / .krailb left), it stands BESIDE that column at the column's top (above the heads), never on it.
3. KIT.md §33.9 line added. No new CSS, no new part.

## Scan (new dev/test/morechip-scan.js: host mode = real rot.js frame; her room + all 14 place paintings; Fold 755x1000, iPad 1180x820, iPad Pro 1366x1024, 412x1058, 390x844)
| build | chips seen | chip ON column/rail |
|---|---|---|
| live 6c4f21c3 (before) | 71 | 3 (ipadAir thu, ipadPro thu, iphone14 thu) — second run: 3 (ipadAir lc, ipadPro lc, iphone14 kn) |
| eba25768 (after) | 71 + 71 (two runs) | **0 / 0** |
(Which place shows "+4" varies per random life; both runs after the fix = 0.)

## Other tests
- quickcheck --runs 7 vs live 6c4f21c3: PASS (core gates PASS, old save ok; perf render 200/211, tab 285/254, buổi 1045/1446 — noisy box; first run of 5: buổi 1095/881, the change adds one rAF call per render).
- stage-side.js: same FAIL set on live 6c4f21c3 and on this branch (20/20 both; the test cannot set the people count any more, n stays 4) → old test, not this change.
- host shots: no page errors.

## LOOK (CDN img/_review/morechip-fix/; wipe: python3 dev/site/cdn_sync.py --wipe-review morechip-fix)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/morechip-fix/fold-755x1000-home-after.jpg — «+4» under the column, off «Nguy hiểm chung». Before: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/fold-755x1000-home.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/morechip-fix/ipad-1180x820-home-after.jpg — «+4» under the column (unchanged look).
- https://ctm-img.victoria-tntt.workers.dev/img/_review/morechip-fix/phone-390x844-home-after.jpg
Looked at all.
