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

## HANDOVER (batch builder session_01UV1SzjhxXkcba8uS4TZeVm, 17/11 ~06:10Z)
START_CTX ≈ 6 %, now ≈ 42 % ≥ START + 25 % → this builder rolls over (owner OD:L1217 + worker rule s14); the coordinator opens the successor.
Next job for the successor builder (s30 order): batch on live main 6c4f21c3: presentation-wiring-r1 bc8461cc → kit-ico-rank-r1 a1c7a37c (NO ctm-rank Worker deploy; main does it after live) → fig-headtop-r1 f95f5a92 (+ review/morechip-fix eba25768 once its reviewer PASS lands, before gates start). Shots Fold 755x1000@2 + iPad 1180x820@2 incl. the Ngự hoa viên stage with the Hoàng hậu (phoenix crown) beside a lower rank.
Recipe = dev/handover/reports/batch-0415.md + batch-0430.md: worktree from origin/main, merge --no-ff each PASS, conflicts only in index.html/sw.js/assets.json → take ours, one dev/site/build_site.sh at the end, CHANGE line first in dev/site/CHANGE.txt; gates: quickcheck --runs 7, it-key-guard, oldsave-r1 (.tmp/old.html = git show origin/main:index.html), coop-e2e (LIVE Worker), fig-rank-audit, save-dlg-scan, fig-feet-fam, book-col-scan, newlife-leak/-oldsave, map-full.js, morechip-scan.js, + each branch's own tests; host-mode shots: /home/user/wt/b0415-tools/shots2.js pattern (dev/test/lib/device.js openHost), upload img/_review/<batch>/ with cdn_sync.py, never manifests.
Known pre-existing (not batch): Pixi page error "r.updateLocalTransform is not a function" in ~2/3 newlife-leak runs on live too; it-key-scan 3 guarded reads in jdemo.js (false positive); stage-side.js outdated (fails on live identically); Fold Dư đồ labels under the right card column at rest (map-full follow-up).
Queue after the batch (s30 orders received 05:39–06:05Z, NOT started by this builder; read s30's OD tail for the owner's verbatim words):
1. learn-scene-fix (review/learn-scene-fix from main; URGENT, before map-me-mark): Học thành tài scene black wait — PAINT = img/scene-thanhtai-<k>.webp per subject (jlevel ARTS + VIR keys), preloaded; not in manifest → kitSkillArt at once, never request a missing file; whole kmPush family preloads its picture; ORDER: made item → level-up scene → buổi transition → next VIỆC, next VIỆC never opened underneath. Report reports/learn-scene-fix.md.
2. map-me-mark (review/map-me-mark from main): REPORT FIRST on the place '!' (kitHapMark, KIT §78, jact.js:166) → reports/map-me-mark.md + message s30; then her 'you are here' marker: +5 % size (one kit value), brighter glow, squash-and-bounce loop, reduced-motion respected, perf ≤ live.
Not for this line (s31 → kit worker): right column narrower + aligned same-size cards; stat-bar '!' removal.
