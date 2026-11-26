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

---
# RING-BUILD-2 (successor, MAIN CHÍNH 162) — wiring vòng người, 26/11 ~20:10–21:00Z
PRIORITY #1 CHECK: review/ring-build 469ca52e (base) | kk44.md «NEW-KIT FAMILY SCAN» (handover b50e9faa) §3 24 + §4 9 | review/motion-bao-vat c6a1a392 (kitRingItem, KRI_MATH, also «§104») | OD 26/11 ~18:55Z/~19:00Z.
Commit 880eb568 on review/ring-build (index/sw/assets rebuilt). NOT for main (one-set land gate).

## Built
- §104.1 ONE ring maths `window.KRING_MATH` = MOTION's KRI_MATH semantics (slot/front/short, seats 12, decay, snap); jkring place/turnTo/front/fling/snap use it. Proposed to MOTION-BUILD-2 + KK44 (messages sent 20:1xZ, no reply yet): §104 = one ring kit, §104.1 core · §104.2 vòng người · §104.3 vòng nhóm · §104.4 vòng bảo vật; jkring-item.js does `const KRI_MATH=window.KRING_MATH||{…}`; jkring.js before jkring-item.js in assemble.py.
- §104.2 picker mode: `kitRing.open({people, acts:(x)→acts|groups, onPick(i,id,p), onClose, title, sub, tabs, at})`.
- (A) every #modal person-picker frame (every card a person; ≤1 plain aside card = the ring ✕) → MutationObserver on #modal (showModal is re-wrapped at run time by later layers, so it is watched, not wrapped) → frame held (`#modal.kring-held` visibility hidden), ring = its face, «Chọn» clicks the frame's own card, frame tabs (gift GIFT_TAB) ride on the ring. Person = `b.__kwho` stamped by a kitOptAvatar wrapper (fallback kitOptPic).
- (B) face strips: `pager()` wrapper — when every item carries `p:` the strip is replaced by one kit button «‹ tên · i/n ›» + her card; tap → ring of the list at her; focus → her card's own act groups (.pcg[data-g]) as thẻ gỗ groups, «Xem» leads; pick → PG[key]=i, render, click the live card button by index. `p:` added at 13 call sites (rv j15/j22, kid j15/jht, court/men jhc, kvo/kin/hon/qt jht, kc jkc/jkc2/jkc3).
- (C) stage figure tap: `dfOpen` wrapper → kitRing.stageRing(i) (ring at her, auto-focus); jdfv focus view no longer opens from a token while wired.

## Tests (dev/test/kit-ring-wire.js, file:// build — a local http server is blocked by this session's permissions)
Fold 755x1000 + iPad 1180x820, real touch taps: stage tap → ring focused + plaques ✔ ✔ · strip rv ✔ ✔ (paged to the chosen person), court ✔ (iPad; Fold court/kid/men tabs not on the bottom bar = n/a) · spy picker frame → ring (9 people), «Chọn» plaque, ✕✕ closes ✔ ✔ · page errors 0 / 0. Stills looked at (Fold sheet A-ring, A-focus, B-rv, C-stage): figure LEFT, plaques RIGHT, one figure.

## Before / after (KK44 §3 person 24 + §4 group 9) — `sh dev/test/kit-ring-scan.sh`
| row | before | after |
|---|---|---|
| j6 stage tokens | tok → pop card / kitFocus | RING (dfOpen) |
| rv / kid / court / men / kv / kin / hon / qt / kc strips (9 rows) | pstrip | RING (pager p:) |
| plantsv, tdAct, evpick, itarget, giftDialog(+GIFT_TAB), pgpick, spyPick (7) | face opt list | RING (generic A; only spy tested live) |
| hireCard, cmPick, eaScoldPick, runner (4) | opt list | RING if the cards wear faces (generic A) — CHECK each |
| staff strips j15:81 / j42:513, q72 j72/jtabs, relPop jhc:129 + ks jhc:326 | pstrip | OLD — items need `p:` (staff L / q72 items / relPop stripItem) |
| kgfDrop rail list, kshR/kshL court cards, facHTML invite | own lists | OLD — not checked (route their tap into stageRing / picker mode) |
| sgTruyen canvas | game | owner ruling |
| §4 stage groups | — | RING «Từng nhóm» (prototype) |
| §4 GIFT_TAB | tab row | tabs ride on the picker ring |
| §4 facHTML, j55 court houses, rgJoinOpts, palCeremony, relPop group tabs | rows / opt lists | OLD — need a GROUP picker mode (group slot = members; palace / side = its people) |
| §4 Dư đồ map spots, jmapz | map | owner ruling |
Person: ~18 of 24 on the ring (4 «check»), group: 2 of 9.

## ROLLOVER HANDOVER (RING-BUILD-2 → RING-BUILD-3), 26/11 ~21:00Z
Next, in order: (1) MOTION-BUILD-2 / KK44 answer on the core split — apply (KIT.md §104 numbering canon overwrite, assemble order). (2) `p:` for staff (j15:81/j42:513 L items), q72 (j72:285 / jtabs:125), relPop/ks (jhc:129/326 have their own click handler jhc:137 — route it to stripRing or picker mode). (3) kgfDrop (jk3.js:89/116), court cards (#kshR/#kshL), facHTML invite (j10.js:193) → stageRing / picker mode. (4) live-check the 4 «check» pickers + giftDialog tabs + evpick/itarget in the test (add cases to kit-ring-wire.js). (5) group picker mode for §4 rows (facHTML factions, j55 houses, rgJoinOpts, palCeremony, relPop group tabs). (6) Fold strip rv showed only «Xem» (iPad 5 groups) — check rvCard acts on Fold. (7) videos ≤30 s of A/B/C (kit-ring-record.js pattern; needs a URL — file:// works for the boot) → CDN img/_review/ring-build/ → MAIN 162. (8) perf probe (kit-ring-perf.js). Area paging >8 + group plaque faces still open from RING-BUILD.
- MOTION-BUILD-2 (20:12Z) agreed the split: renumbers to §104.4, reads window.KRING_MATH, jkring.js before jkring-item.js on merge. ASKS: move shared constants (fling decay, snap ms, seats, stepMs) into BAL.kring so both rings read one table; front slot boost ≈1.5× (KIT_RINGI.tw Fold 124 / iPad 150) for consistency — RING-BUILD-3 to do.
