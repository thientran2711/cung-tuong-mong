# role-parity-drift — worker report (opus, session_01N1tNP5o5V6dzpfsYEuSczb), 19/11 ~04:10Z
depth 4 · START_CTX ≈ 4 % (get_session reads 0; estimate) · coordinator Foreman B ROOT-3 session_01N1tNP3obSHDf3JJ3GqMHp8 · order MAIN ROOT-62 02:40Z
PRIORITY #1 CHECK ('role-parity drift cx2:chest'): OD 0 | ledger 0 | claims 5 role-parity rows (all DONE/LIVE) | main dev/tools/role-parity-scan.js + j2:167–169 + j95s.js:236–263 (departure card) | review/* 0 | reused reports/role-parity-3.md (REVIEW SEED, 89aa1bd9 trim) + reports/review-live-servants.md (picker = first departure of the day).
Branch: review/role-parity-drift · final sha 127fe1ea (descends origin/main f43a2ba6; merged c12a5878 maid-ladder-6 + f43a2ba6 odds-meter-back, j42 kept both).
REVIEW TIER: **BIG** (one small game-code change in j42 srvColleagues; the rest is probe tooling). Foreman B ruling 03:41Z: OPEN_MAX 20 accepted, reviewer confirms.

## 1. Cause — PROBE PATH (not a player gap) for the reported rows
live-servants (j95s.js:263) wraps goTo: her FIRST departure of the day from her palace pushes the card «Chọn người theo hầu» and returns; she leaves only after a tap
(«Lên đường» / «Đi một mình»), which writes S.ent {d: today, ids, at} and calls goTo again. role-parity-scan.js visited every place with a bare goTo(k) and
cleared Q — every visit stopped at the card, S.visit.people stayed the home list, so every act reached only through a person at a place vanished from the P side.
- The red was **100 fresh rows, not 25**: role-parity.test prints only `fresh.slice(0,25)`. Full list (main 1cf5e8bb, before → after the probe fix):

| act key | label | side | fresh roles on main 1cf5e8bb | after fix |
|---|---|---|---|---|
| cx2:chest | Lục rương tìm chứng cứ | N-ONLY | t1–t7 | — |
| cx2:doctor | Mời làm thái y tâm phúc | N-ONLY | t1–t7 hh up | — |
| cx2:fert | Bài thuốc dễ thụ thai | N-ONLY | t1–t7 hh up | — |
| cx2:kidMed | Xin thuốc cho … | N-ONLY | t1–t7 hh up | — |
| cx2:likes | Hỏi sở thích Hoàng thượng | N-ONLY | t1–t7 hh up | — |
| cx2:old | Hỏi chuyện cũ | N-ONLY | t1–t7 hh up | — |
| cx3:tell | Kể tội | N-ONLY | t1–t7 hh | — |
| cx4:manFlirt | Liếc mắt đưa tình | N-ONLY | t1–t7 hh up | — |
| cx4:manHail | Chào hỏi đúng lễ | N-ONLY | t1–t7 hh up | — |
| cx4:rougeBeg | Xin son phấn | N-ONLY | hh up | — |
| cx4:rougeBorrow | Mượn son phấn | N-ONLY | hh | — |
| cx4:rougeSteal | Lấy trộm son phấn | N-ONLY | t1–t7 | — |
| cx:hhShield | Xin Hoàng hậu che chở | N-ONLY | up | — |
| cx:thHelp | Xin Thái hậu đỡ lời | N-ONLY | t1–t7 hh up | — |
| harm:taint | Tẩm | P-ONLY | up | — |
| maid:ask | Nhờ dò tin | N-ONLY | maid | — (game fix, §3a) |
| (open list) up cx3:tell | Kể tội | P-ONLY | hidden (false close) | open again (§3b) |
fresh rows: **100 → 0**.

- Player check (law 1, as the player, real browser, real tap on the card's «Đi một mình» button, Fold 755x1000 + iPad 1180x820, ranks Tần / Quý phi / Hoàng quý phi):
  Thái y viện → person «Thái y» offers «Bài thuốc dễ thụ thai», «Mời làm thái y tâm phúc», «Xin bắt mạch» (r3 + r6 both devices); a rival's palace with her away →
  «Rương của …» offers «Cài đồ vào rương», «Lục rương tìm chứng cứ», «Lấy trộm son phấn» (r3 + r6). The acts show and work; nothing to restore in j2.
  Note (pre-existing, not this job): at the first meeting the physician is «Người lạ» and both Thái y acts show greyed «Chưa biết người này là ai» until «Chào hỏi» (face-reveal rule).

## 2. Fix — probe (dev/tools/role-parity-scan.js)
Before each place the probe does exactly what her tap does: `S.ent={d:j95sDay(),ids:[],at:k}` (= the card's own go([]) «Đi một mình»), then goTo(k) walks the real
path (gates, khắc, people); S.ent is put back after each place. No exempt, no open-list entry used to hide anything.

## 3. Family scan (law 11) — every act the live-servants change could hide
Method: full scan JSON before (main 1cf5e8bb) vs after (probe fix), every row × role diffed (241 cell changes, all of them the visit acts above turning SAME/NUM,
plus label rows «Đến gặp …», «Xin bắt mạch», «Xem sổ thị tẩm», «Hầu chuyện, xem lén sổ nguyệt sự» now seen and EXEMPT/— by the existing tables). Two rows remained:
- **(a) maid:ask «Nhờ dò tin» N-ONLY = REAL small player gap → game fix.** Đồng liêu (j42 srvColleagues) shows 10 people: her palace's staff, then S.srv.met in meeting
  order. Visiting places adds every servant she meets to S.srv.met (j42:133, j95:605); with live servants she meets many, so a friend met later falls past row 10 and
  «Nhờ dò tin» / «Trò chuyện» / «Biếu quà» with her are gone for the player, while an NPC maid asks any friend. Probe trace: met 9 + staff → 10 rows, the friend not
  among them. FIX j42 srvColleagues: the same 10 rows, her palace first, then acquaintances ordered by her liking (friends before strangers; ties keep meeting order).
  No number added, no UI change (same kit rows). Shots (scratch only, looked at): Fold + iPad Đồng liêu with 13 people met and a new friend (Thiện cảm 40) listed 2nd,
  «Nhờ dò tin» enabled.
- **(b) up cx3:tell «Kể tội» P-ONLY = the reviewed open row, re-listed.** It was in the 20-row baseline («probe world (B4)»); reviewer 6ibtJzXh trimmed it in 89aa1bd9
  ("closed on main b1c3631e, 3/3 runs", OPEN_MAX 20 → 19). That close was FALSE: it closed only because the drift hid the player side's visits too. With visits back
  it is seen again 3/3. Cause stays probe-world: the maid-phase world is a fresh life where no consort has a wrong yet, so the risen NPC can never hold proof (evA caps
  at deedCap, law 6a) while the player's deck counts the card while locked «cần chứng cứ». Two probe-world fixes tried and REJECTED: planting a real wrong (deedAdd) for
  every target → +11 new rows («Chứng cứ 1 ›» label P-ONLY t1–hh/up, harm:accuse, PROMO trinhhh); only maid phase / one target / NPC doers → +6 rows (harm:banphe /
  tieuhuy / trinhth / uyhiep up N-ONLY, PROMO accuse/trinhhh) — evidence opens other gates, so it would move the gap, not close it. Re-listed with its note, OPEN_MAX
  back to 20 (Foreman B ruling 03:41Z; reviewer confirms).
- Other test/measure scripts calling goTo without a card guard: 90 files (mostly old shot scripts). In the gate set only ag-rd.js walks (goTo vuon) and it already throws
  loudly if she does not arrive — no silent loss. Not changed here; listed for MAIN as a known trap: any future probe that visits places must tap the card (S.ent) or
  set window.__j95sEntOff.

## 4. Gates (final sha 127fe1ea unless noted)
| gate | result |
|---|---|
| role-parity.test ×3 | 127fe1ea: ALL PASS ×3 byte-identical (§4b); on c31180ba (merged c12a5878): ALL PASS ×3, byte-identical (md5 6819ae13…), open 20 ≤ OPEN_MAX 20, no new gap |
| one-core-guard | PASS (127fe1ea) |
| ag-stf2 | 23/23 PASS (c31180ba); re-run §4b |
| quickcheck (own build, old save loads + plays, core gates, perf smoke) | PASS (c31180ba): open 1557 ms · old save ok · render 244/205 · tab 406/405 · buổi 1069/4806 ms · tasks>200ms 20/23; re-run §4b |
| coop-e2e | 63/63 passed (c31180ba; the co-op Worker host was reachable this time) |
| Fold 755x1000 + iPad 1180x820 shots | Đồng liêu (j42 fix) + Thái y viện + rival chest, looked at; scratch only, not in git, not uploaded |

### 4b. re-run on 127fe1ea (final sha)
- role-parity.test ×3: ALL PASS, byte-identical (md5 6819ae13…, same as on c31180ba); open 20 ≤ OPEN_MAX 20; no new gap; promotion checks green.
- ag-stf2 23/23 PASS · one-core-guard PASS.
- quickcheck: run 1 FAIL perf only (buổi 2823 vs live 1108, limit 2608; tasks>200ms 22/18) — run 2 PASS (open 1511 ms · old save ok · render 249/213 · tab 406/403 ·
  buổi 1034/1038 ms · tasks>200ms 18/18 · core gates PASS). Noise: the earlier c31180ba run swung the other way (buổi new 1069 vs live 4806); the only game change is a
  sort of ≤ ~20 people when the Đồng liêu tab renders (maid life only), not on the buổi path. Reviewer may re-measure.
- coop-e2e 63/63 on c31180ba (127fe1ea adds only main's odds-meter-back kit change + rebuild).

## 5. Files
dev/build/j42.js (srvColleagues) · dev/tools/role-parity-scan.js (departure-card tap) · dev/tools/role-parity-open.json (up cx3:tell back) · dev/test/role-parity.test.js
(OPEN_MAX 20 + reason) · index.html / sw.js (build).

## REVIEW r1 (opus BIG, session_01N1tNP522pSWxVAQMo8r88Z, 19/11 ~06:10Z) — PASS → READY FF 1ed688ef2a80a54bf2c1173a47126040f611d094
PRIORITY #1 CHECK ('cx2:chest'): OD 0 | ledger 0 | claims role-parity rows DONE/LIVE + this review row | main j2:167–169, j95s.js:236–263, dev/tools/role-parity-scan.js | review/* review/role-parity-drift @127fe1ea | reused reports/role-parity-3.md (REVIEW SEED) + reports/review-live-servants.md.
depth n/a (reviewer) · START_CTX ≈ 5 % · coordinator Foreman B ROOT-4 session_01N1tNP5E7rYx1LwH4fEBuk8 (ROOT-3 rolled over 05:07Z).
Branch review/role-parity-drift-r1 = 127fe1ea + final-merge origin/main fd6118cd + **7fb7c104** (E ge-writers-w2; only index.html/sw.js conflicted, rebuilt) + 2 reviewer fixes. Descends LIVE 7fb7c104 (checked). Diff vs main: j42.js, jbal.js, role-parity-scan.js / -open.json / .test.js, index.html, sw.js.

### Checks
1. **Cause = probe path — CONFIRMED.** j95s goTo wrapper (j95s.js:263) returns at «Chọn người theo hầu»; the card's «Đi một mình» = `go([])` = `S.ent={d:j95sDay(),ids:[],at:k}` then goTo(k). The probe writes exactly that object, then restores S.ent in `finally` — mirrors her tap, hides nothing (no exempt, no open row used). Played as the player in Chromium with a REAL tap on «Đi một mình», Fold 755x1000 + iPad 1180x820, ranks Quý nhân (2) and rank 5: she arrives at Thái y viện, «Thái y» offers «Bài thuốc dễ thụ thai», «Mời làm thái y tâm phúc», «Xin bắt mạch» (4/4 runs); at a rival's palace with the owner away «Rương của …» offers «Cài đồ vào rương nàng», «Lục rương tìm chứng cứ», «Lấy trộm son phấn» (4/4). 0 page errors. Shots looked at, scratch only, deleted.
2. **j42 srvColleagues (maid:ask) — PASS after 2 reviewer fixes.**
   - FIX R1 (law 6a, law 11 same family): the worker's plain liking sort put every ill-wisher (Thiện cảm < 0) LAST; past 10 rows they fell off, so srvFramedEvent («Bị vu oan», picks from srvColleagues af<0) could never fire for a late-met enemy — others could no longer frame her. Now groups: her palace → friends (≥ BAL.srvx.friendAf) → ill-wishers → the rest; stronger tie first inside a group; stable sort keeps meeting order. Check (13 met, friend met 12th af 40, enemy met 13th af −30): both in the 10 rows on Fold + iPad; «Nhờ dò tin» enabled for the friend; frame pool = the enemy.
   - FIX R2 (law 4): the row count was a typed `10` on the line the branch rewrote → BAL.srvx.colN = 10 (jbal, commented). one-core PASS.
   - Law 1: NPC maid counts all friends (jagstaff asFriends, no cap); player now always keeps friends in her list → parity improved. Law 9: same kit act rows (srvStaffHTML untouched), Fold + iPad Đồng liêu looked at 3×.
3. **up cx3:tell re-listed, OPEN_MAX 20 — CONFIRMED truly open.** On the final sha the test prints no "open-list entries now closed" note ×3 → all 20 rows incl. up|cx3:tell|P-ONLY are seen; the baseline key is role|key|SIDE, so an N-ONLY flip or any other row cannot hide behind it. Agree with Foreman B: the 89aa1bd9 trim was a drift-caused false close.
4. **Family (law 11).** Worker's full before/after diff (241 cells, 100 → 0) accepted. Extra reviewer scan of every game goTo() caller (j9 nextBuoi refresh, j21 goSee, j41 sneak, j72, j77, jty, jstagehere, jgift, jagent, j78): j9 refresh keeps her at the place (tested), stage-here / accSilent paths bypass the card by design, others are her own taps. No other act hidden. Note (not this branch, pre-existing live-servants UX, for Foreman B to check with a human tap): in Playwright the first 1–3 taps on «Đi một mình» did not register (no click event reaches document; the card body is re-rendered under the pointer); the following tap works.
5. **Gates on 1ed688ef:** role-parity.test ×3 ALL PASS, byte-identical (md5 448ba63b…), open 20 ≤ OPEN_MAX 20, fresh []; one-core-guard PASS; ag-stf2 23/23; quickcheck PASS (own build, old save ok, core gates PASS, perf new/live render 225/212, tab 365/400, buổi 1091/1010 ms, tasks>200ms 17/17 — no perf noise this run); coop-e2e 68/68 + SWAP 68/68.
6. **FOR MAIN trap:** 89 test/measure/tool scripts call goTo() with no S.ent / __j95sEntOff / __accSilent guard — any visit they make on a fresh day stops at the departure card: act-audit act-dedupe-bot act-dedupe-vp act-dedupe-w1 act-pics act-place-audit act-split-inv act-split-vp act-split-w2 act-text-scan ag-rd agent_probe an-sung b-answers-art cdn-play coop-bot coop-chat coop-play coop-r2 coop-rev2 cycle dialog-person dudo-lock elder-staff emo-seal-persist face-reveal-rec face-reveal-stage face-sharp-scan fig-seal fig-wiring-shots flip-newlife-ui fold-popw header-danh header-fix house-scan house-stage img-quality lazy-offline ledger_hours ledger_shadows ledger_stage men-forbidden men news-face-real npc-art-audit npc-death place-fs place-stage-scan place-stay places-d42 presentation-people rank-bright rank-colour rank-title roster_audit roster_dom small-bugs-2 stage-caption stage-counts stage-here-scan stage-here stage-pets stage-rightcol stage-side stage-slots-fix stage-slots-fixed stage-slots stage-stay stage-swipe suc-khoe sw-norosy text-idem-scan time-spill-guard title-sys title-tag trung-y-scan trung-y tut-quests two-way-shots world_check2 firsthour inpage4 inpage5 inpage6 inpage6cut8 instory men npc-death-places stage-slots-scan (.js). Gate-set ones (ag-rd, time-spill-guard) assert arrival loudly — no silent loss today; the rest are shot/audit scripts that would silently audit the home screen.

### 18 laws touched
1 two-way PASS (player acts = NPC acts; Đồng liêu friends) · 3 n/a · 4 PASS after R2 · 6a PASS after R1 · 9 PASS (no UI change, kit rows) · 11 PASS (family scan + R1) · 12 PASS (Fold + iPad) · 13 PASS (PRIORITY line) · 14 PASS (open row restored in place, no duplicate) · others not touched.

**VERDICT: PASS — READY FF 1ed688ef2a80a54bf2c1173a47126040f611d094** (review/role-parity-drift-r1, descends LIVE 7fb7c104). Tier BIG.

### REVIEW r1 — re-merge update (19/11 ~07:00Z): READY FF 950508fc005ce01ad74a4b050560fd492d61d048 (replaces 1ed688ef)
Main moved 4× while I reran the gates (2c5dd554, 4217568a, 98f9f0f1, 5400c87b, 5dc5d9e0). Final sha 950508fc descends LIVE 5dc5d9e0 (checked after a re-fetch right before sending). Only index.html/sw.js conflicted each time; j42 auto-merged with 4217568a, and both reviewer fixes (ill-wisher group, BAL.srvx.colN) are still in. Diff vs main: the same 7 files.
Full gates on f9fe6a2f (merged 98f9f0f1): one-core PASS, ag-stf2 23/23, quickcheck PASS (old save ok, perf new/live render 263/234, tab 477/428, buổi 1211/1185, tasks 18/18), coop-e2e 68/68 + SWAP 68/68. On 950508fc (ROOT-4 rule: ×1 + one-core): one-core PASS; role-parity ×1 = the same 12 rows as below.
**⚠ LIVE DRIFT on main, NOT from this branch** — role-parity.test shows 12 new rows + one open row that is now closed. The same 12 rows (byte-identical list) show on plain main 98f9f0f1 with ONLY the probe fix added (no j42 change), so they come from main landings between 7fb7c104 and 98f9f0f1 (2c5dd554 errand-scene r6 + hall-names / 4217568a odds-no-unknown / 98f9f0f1 monthly-allotment). Nothing more by 5dc5d9e0.
The 12 rows: up P-ONLY cx2:maidTalk · hh + up N-ONLY cx3:facFound · t1–t7 + hh P-ONLY label «Chứng cứ 2 ›» · maid P-ONLY maid:pil. Now closed: up P-ONLY cx3:tell (an evidence change on main likely closed it; do not trim it until the drift is fixed).
Without this branch, plain main shows these 12 hidden under the 100 false probe rows; this branch adds no red row. I did not put them in the open list, because that would hide a fresh regression.
**VERDICT stays PASS for the branch content — READY FF 950508fc.** FOR MAIN: the owners of those landings check law 1 on the 12 rows (a whole job like this one).
