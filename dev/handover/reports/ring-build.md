# ring-build — RING-BUILD (MAIN 161, opus) — kitRing «vòng người · vòng nhóm» prototype + videos
depth 1 · START_CTX ≈ 2 % (fresh session)
PRIORITY #1 CHECK ('kitHand|kitPick|ring4|vòng bảo vật|kitRing'): OD 6 + OD tail 26/11 ~18:55Z/~19:00Z (spec, read verbatim) | main: no kitRing (kitPick/kitHand only on review/kit-stage-r2) | review/*: kit-stage-r2 ec2f7c43 (base), motion-design-4 7939838d (mẫu 2 ring maths reused 1:1 in spirit), ring-design-4 692ea370 / kit-ring5 (kitPick tabs, already in kit-stage-r2) | claims: KK44 owns the kit part.

## Branch
`review/ring-build` = review/kit-stage-r2 ec2f7c43 + merge LIVE f573dc94 (conflicts: assemble.py list union — kit-stage modules jkpick/jkhand/jkstage/jkmapban kept + LIVE jactj4/jdoor/jdoor5/jpun/jcharge; jksize.js scroll cue = LIVE loop fix (kscSoon, `:not(.sib)`) + KK31 ResizeObserver watch + orphan-strip cleanup; index/sw/assets rebuilt) + the ring commit. NOT for main before sếp's video ok + KK44 family scan.

## What was built (KIT §104, dev/build/jkring.js, last module)
- Person ring = vòng bảo vật maths: angle/slot, depth scale, z by depth, no oval; drag + inertia, ‹ ›, tap side = turn. Front BRIGHT + warm halo, others DIM (BAL.kring dimB .48 / dimS .6 on a pre-filtered copy, opacity only). Name tag under the front only.
- Tap front → big full body slides LEFT, kitPick thẻ gỗ drop RIGHT with her REAL acts (dfData). Acts run through jdfv's own focus flow (DF.F = ring adapter → dfTap/dfRun/dfAfter); her event frames (Q, «Trò chuyện» topics) play in the focus: speech bubble lines + answer plaques; result = kit result card (#rtoast raised above the ring). ONE figure; ✕ = back to ring / place stage.
- Group ring (tab «Từng người · Từng nhóm»): one slot per REAL group from S.roster `with` links; activity line = the plan's own words; focus = cluster big LEFT + «Đứng nghe» (kit result card rows) + «Nói với <tên>» → member steps out, her acts drop.
- Wiring: entering a place with ≥5 ringable people (rank people only, no servants/chests) opens the ring after arrival frames; off for robots.
- Rule (2) whole stage family: jkstage kstgFigs — HER figure only on a two-person dialogue frame (kstgTalkWants); card frame = speaker alone. kit-stage.js check updated (canon overwrite).
- KIT.md §104 added, §102 SCENE line overwritten in place; kit page §104 «Vòng người» / «Vòng nhóm» buttons.

## Videos (owner look gate) — https://ctm-img.victoria-tntt.workers.dev/img/_review/ring-build/
ring-a-755x1000.mp4 (21 s), ring-a-1180x820.mp4 (22 s) person ring · ring-b-* (27 s) group ring · ring-c-* (15 s) Bàn bài (real c2a frame). h264 yuv420p 30 fps, real touch taps/drag on the real build. ≥3 frames of each looked at (tiled sheets). Fixture (boot `dev/test/kit-ring-boot.js`): seeded life, daytime, 6 consorts put in Ngự hoa viên by day-plan rows (3 groups), everyone there marked known.

## Tests
kit-hand.js PASS (Fold+iPad) · kit-stage.js PASS after the rule-(2) check overwrite · kit-ring-perf.js (CPU 4x): turning p50 33 ms in THIS container — same at 1x (no GPU, software compositor caps ~30 fps), so main-thread work is not the limit; motion is transform/opacity only. Real-device fps still to confirm (Fold/iPad).

## Open / handover (for KK44 + MAIN)
1. Land job (after sếp ok): replace the old place stage tokens + #popw pop-up + kitFocus figure view by the ring everywhere (law 9/11 family scan «old left = 0»); MOTION-BUILD vòng bảo vật gift ring should hang off the ring focus («Biếu»).
2. On-figure mini-games inside the ring focus (F.play returns null → plain result now).
3. >8 people in one area: pages / areas per OD 24/11 ~15:30Z (max 3–4 groups per view) — not done.
4. Group plaques have no face picture yet (kitFace src empty on some); group acts toward the whole group (beyond listen / talk to one) need a design ruling.
5. dev/test/kit-ring-boot.js still logs debug fields (harmless).

## ROLLOVER HANDOVER (≈ START_CTX + 25 %, 26/11 ~20:00Z) — successor takes the wiring job
Order from MAIN 161/162 (19:59Z): while sếp's verdict is pending, wire the 33 places on review/ring-build (no landing): vòng người 24 + vòng nhóm 9 = dev/handover/reports/kk44.md «## NEW-KIT FAMILY SCAN» on the handover branch (b50e9faa); share ONE ring core with MOTION-BUILD (session_01Rc5AsJVzZz12K6GSxnNZM8, review/motion-bao-vat fe7a105d, jkring-item.js / KRI_MATH); open items: area paging > 8 people, group plaque faces. Report to MAIN CHÍNH 162 session_01Rc5AsM4J5C58YM4bW3tekV; KK44 = session_01Rc5AsLVfGh4xhhKhZGXEWJ.
Base note: review/ring-build ALREADY contains LIVE f573dc94 (merge commit ffe15d29) — no rebase needed.
Suggested core split (told MOTION-BUILD): jkring.js core = geo/place/loop/tween/fling/snap/front/turnBy/turnTo, the band (drag + tap), arrows, ✕, tabs, kitScene layer, dim copy + halo, focus() slide-left transform, back(), close(). Person/group-only = buildSlot member figures, groupsOf (S.roster), personPick / adapter (jdfv DF.F), groupPick / listen / stepOut, wiring wants()/goTo hook. Next step for the successor: make the core take a MODE renderer `kitRing.mode(name,{slots(list)→[{el,cx,feet,top,dimEls}], focus(R,slot), pick(R,slot)})` and give `open({mode, items|people, onPick})` so the 33 places (and item mode) feed lists; then wire each place from the scan (replace its old picker; scan script «old left = 0» + before/after table, law 11).
Tools: dev/test/kit-ring-boot.js (seeded life; RING_SEED), kit-ring-probe.js, kit-ring-record.js a|b|c [WxH] (+ /home/user/wt/ring-shots/mk.sh pattern: trim marks → h264), kit-ring-perf.js (RATE=1|4).
