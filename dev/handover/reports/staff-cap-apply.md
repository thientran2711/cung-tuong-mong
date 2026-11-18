# staff-cap-apply — SẴN SÀNG KIỂM fc470e4 (final table + servant-face leak fix, merged main f986ff6a; supersedes 303af62 / 033b8d6) (worker session_01UV1SzkNqcjf9atNLxPVz8y, opened by MAIN s41; successor of SzkENdm)
PRIORITY #1 CHECK: OD 18/11 ~02:15Z + ~02:50Z (L1794 overwritten: final table), ~02:05Z (L1793 Nữ đế harem style), ~02:10Z (faces 52/30/8) | main jpromo.js:22 BAL.promo.cap, j10 capOf/capLaw/capTrim, j17.js:53 roomFor, j25.js:97 FPOOL | review/staff-cap-table 4b1d9a2c (harness + HANDOVER plan, reused), review/staff-cap-fix (LIVE 62a6846f, trim/notice rule reused unchanged) | claims staff-cap-table SzkENdm → this session.

Branch `review/staff-cap-apply` from origin/main 62a6846f: 9d586f6 (code + test), 033b8d6 (site), **abf0124 (final table)** + **303af62** (site rebuilt). FF of main.

## fc470e4 (MAIN s42 order): merge origin/main f986ff6a (only generated sw.js/index.html conflicted → main's, rebuilt) + FACE LEAK FIX
Root cause: S.fidUsed only grew (one identity per person "for life", but a servant who left — trimmed, dismissed, dead, married out, sent to Tân Giả khố, ~20 splice paths — kept her face reserved forever; only capTrim freed it). Probe (30 % of servants replaced monthly): before, from year 5 on 19 of 22 servants had NO figure (all 90 identities held by gone people); after, 0 at years 5–30.
Fix = ONE rule in dev/build/j39.js `figGC` (no per-path code): when a servant (maid / mama / eunuch) needs a face and every identity of her group is taken, free the servant identities no live person holds (held = any fid / pid / fromMaid reachable from S + rivals: households, Thái hậu's women, court, Nội vụ phủ candidates, records). Consort identities never freed. Co-op guest never writes fidUsed (host world key). Throttled (once per turn + list size); measured max 1 ms.
Test (staff-cap-apply.js #5): 30-year life, ~30 % servants replaced every month: every servant keeps a figure at y10/20/30, no two live servants share a face, no consort face freed — PASS.
Gates on fc470e4: staff-cap-apply 15/15 · staff-cap 28/28 · staff-root 17/17 · one-core PASS · quickcheck PASS (open 1182 ms, old save ok, render 143/135, buổi 640/646, core gates PASS) · coop-e2e ×3 under load 63/63, 62/63 (FAIL = console CORS error loading por-consort-c10-tcold-a26.webp from the CDN, network; rerun 63/63), 63/63.
Residual (rare/small): a removed servant object that is later re-attached without passing through S (none found) could share a face with a newer one; caught by the test's uniqueness check if a path appears.

## FINAL TABLE (owner OD 18/11 ~02:50Z, relayed by MAIN s41): BAL.promo.cap = [[1,0],[2,0],[2,0],[2,1],[3,1],[3,2],[4,2],[5,2]] (ĐƯ 1+0, TT 2+0, QN 2+0, Tần 2+1, Phi 3+1, QP 3+2, HQP 4+2, HH 5+2); capTh [5,2]; capNd (Nữ đế) [5,3]. The 033b8d6 notes below that say HH 4+2 / capTh 4+2 / capNd placeholder are superseded.
Worst palace (after, final table): 12 → 43 · 16 → 51 · 20 → 59 · 24 → 67 people, every household at its row; women servants at 20 ≈ 31 of 52+8 identities, eunuchs ≈ 16 of 30.
Tests on 303af62: staff-cap-apply 14/14 (worst palace 12/16/20/24; trusted-eunuch case now matches the Tiểu→Lão name change on load) · staff-cap 28/28 · staff-root 17/17 · one-core PASS · quickcheck PASS (open 1122 ms, old save ok, render 133/134, buổi 584/614) · coop-e2e 63/63 ×3 in parallel with quickcheck.

## What changed (3 source files)
1. `dev/build/jpromo.js` BAL.promo.cap = [[1,0],[2,0],**[2,0]**,[2,1],[3,1],[3,2],[4,2],[4,2]] (only the Quý nhân row changed: 2+1 → 2+0; eunuchs start at Tần). capTh [4,2] unchanged. New `capNd:[4,2]` = Nữ đế row (= HH row; OWNER NUMBER PENDING, change this one row). Table comments updated.
2. `dev/build/j10.js` capOf: her life on succession path "c" (j99succ, Nữ đế) reads BAL.promo.capNd.
3. `dev/build/j17.js` roomFor (maid/eunuch): counts the FIGURE identity pool FIGIX, not FPOOL + the FAV face-*.webp probe. Women servants (cung nữ + ma ma, incl. her personal maid and the Thái hậu's women) ≤ maid+mama identities (52+8) minus maid/mama identities worn by live consorts (her S.fid/S.pid, NPC consorts); young cung nữ (<36, not old) ≤ 52 minus maid identities worn. Eunuchs (all households + court tq/ksp/ped) ≤ 30. Before the manifests load, FPOOL list sizes stand in (no FAV). Consort branch unchanged.

## Printed caps — whole-group scan (grep of every "cung nữ"/"thái giám" number, "theo lệ", "kẻ hầu", capOf/promo.cap readers in dev/build)
| place | reads | after |
|---|---|---|
| j10 capLaw (grouped notice, cold palace) | capOf | QN: "theo lệ giữ 2 cung nữ (kể cả cung nữ thân tín), không có thái giám." |
| j15 staffTabHTML + j10:94 header | capOf/hhHas | "Kẻ hầu: 2/2 cung nữ · 0/0 thái giám" at QN |
| j29 hire button/pick card, j72 capOk, jpromsv spGoTo, j14 cold/move, jpromo prStaff, j10/j29 fillStaff | capOf | follow the table |
| jpromo reveal "phụ cấp thêm một cung nữ / một thái giám" | one per rank-up | unchanged wording |
No typed cap number anywhere; old-FPOOL count users: only roomFor (poolOf/FAV scan: 0 other hits). one-core-guard PASS (3841 ≤ 3842).

## Before / after (forced worst palace: 8 chủ vị HH,HQP,QP,Phi×2,Tần×3 + all others Quý nhân, her QN; images blocked)
| consorts | before (old roomFor) people / households short | after |
|---|---|---|
| 12 | 35 / 7 short (QN 1/2, Tần 1/2 maids, Phi 2/3) | 42 / 0 |
| 16 | 39 / 11 short | 50 / 0 |
| 20 | 43 / 15+ short | 58 / 0 (+ Thái hậu's 2) |
Old FPOOL sizes in the build: 15 maids / 15 eunuchs (the hidden ceiling).

## Tests (on 033b8d6)
- NEW `node dev/test/staff-cap-apply.js` 13/13 ALL PASS: table; capLaw per rank + staff tab; old save QN + untrusted eunuch → grouped notice; QN + trusted eunuch → farewell; FIGIX 52/30/8 loaded with every image blocked; worst palace 12/16/20 every household at its row; Nữ đế capNd; no page errors.
- staff-cap.js 28/28 · staff-root.js 17/17 · one-core-guard PASS
- quickcheck PASS (112 s · open 1192 ms · old save ok · render 125/134, tab 268/234, buổi 590/576 new/live · core gates PASS)
- coop-e2e ×3 in parallel with quickcheck running: 63/63 ×3
- Shots: none uploaded. The only visible change is numbers inside the existing kit T3 BÁO notice / staff tab line (shot and PASSed in review-staff-cap-fix); text verified by the test above. My host-mode harness kept the new-life chest overlay on top (not caused by this change).

## Open for main (not blocking)
1. (done) Nữ đế capNd = [5,3] per owner.
2. Thái hậu household holds 2 (jstaff named women); capTh 4+2 is neither filled nor trimmed (pre-existing, review-staff-cap-fix note 3).
3. Identity lifetime: figUsed never frees a fid (one identity per person for life, dead/sent-away ones included), so after ~52 maid identities have been handed out in one long life new maids get no FIGIX figure (fall back to the old face). roomFor counts LIVE people as the brief says; a long-life probe is worth a separate task.
4. NPC personal maids ({name,loyal}) hold no identity and are not counted (as before).
