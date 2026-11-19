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
