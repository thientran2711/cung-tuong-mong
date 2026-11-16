# PROGRESS review/stage-slots-fix (owner OWNER BUG 16/11 07:39Z, OD:L1049)

Priority rule #1 done: slot code already on main (review/stage-slots, -merged, -r6, stage-side, -r1, stage-fig-size, -r1 all merged); reused, no new feature built.

## Root cause
j59 packed figures by their torso CORE (kitFigBody cl..cr) and let neighbours overlap by 20 % (`OVX`), measured the fit with `core*(1-OVX) <= slot`,
and centred the CORE on the slot. Wide sleeves / flared skirts (outside the core) therefore overlapped; centres of the visible art were off the slot centres.
Baseline (755x1000@2, same Ngọc Thanh các scene as the owner's shot): `me[35.6,277] x p0[194.1,535.4]` overlap 82.9 px; vườn 2-3 people overlap 90–165 px.

## Fix (kit part j59 only, KIT 33.7)
- `kCL/kCR` = whole visible art (kitFigBody l..r), `OVX=0`: slot box = visible art incl. sleeves; centred on slot centre; no overlap allowance.
- Common scale-down factor for everyone when the art is wider than the slot spacing: floor .62 (3 slots), .32 when only 2 slots are asked (phone keeps 2).
- KIT.md 33.7 rules 1–2 rewritten in place (canon overwrite).
- Test `dev/test/stage-slots-fix.js` (bounding boxes of every figure, 1/2/3/5 people, her home + vườn; no intersection; centres 1/2 · 1/3,2/3 · 1/4,2/4,3/4 of free width within 2 px; no figure into the side column) at 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 844x390@2.

## Not changed (flag)
Event pop-up person column `kitEsOvFit` (jk4) and jk2b old row still pack by core with ≤25 % / 20 % overlap: a different part (event pop-up, OD:L1271 worker).
