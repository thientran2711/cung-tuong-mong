# stage-slots-fix report (branch review/stage-slots-fix, commit fddbbefe)

Owner bug (OD 16/11 07:39Z): figures pressed together and overlapping in the stage slots (Fold, Ngọc Thanh các).

Priority rule #1: all earlier slot branches (stage-slots, -merged, -r6, stage-side, -r1, stage-fig-size, -r1) are already on main; reused, nothing rebuilt.

Root cause (j59, KIT 33.7): the slot fit used the torso CORE (kitFigBody cl..cr) with a 20 % neighbour overlap allowance (`OVX`), and centred the core, so wide sleeves / skirts overlapped
(baseline, same scene as the owner's shot: 83 px; vườn 90–165 px).

Fix (shared kit part j59 only): slot box = whole visible art (l..r), no overlap allowance, one common scale-down factor (floor .62 for 3 slots, .32 when 2 slots are asked so phones keep 2), then fewer slots.
KIT.md 33.7 rules 1–2 rewritten in place. Test `dev/test/stage-slots-fix.js` measures every figure's visible bounding box on real stages (her home Ngọc Thanh các + vườn; 1/2/3/5 people; a man):
no intersection, centres 1/2 · 1/3,2/3 · 1/4,2/4,3/4 of the free width (2 px), no figure in the side column (≥600 px).

Results (all pass, 0 failures): 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 844x390@2 (baseline: overlaps at 755x1000). Screenshots looked at: Fold (the owner's scene: no overlap), 390 vườn (2 people).

Flags: (1) a wide unknown-person silhouette (Hoàng hậu without art) is wider than real art, so a stage with it scales everyone down more (smaller figures; no overlap). (2) 844x390 still holds 1 person per page when 3 are present (slot < name-chip minimum, existing rule J59SWMIN). (3) Event pop-up person column `kitEsOvFit` (jk4) and jk2b row still allow 20–25 % overlap: another part (OD:L1271 worker), not changed.
Run: python3 dev/build/assemble.py; build _t.html as in dev/test/stage-slots.sh; static server; node dev/test/stage-slots-fix.js <url> <WxH@dpr> <outdir> <tag>.
