PRIORITY #1 CHECK ('day-khac-audit|khắc còn lại'): OD L1472, L1654 | main j76 time-spill | review/day-khac-audit-r2 e4625ca5 (DAY-KHAC LAND #1 SẴN SÀNG KIỂM; base r1 PASS 46900ee2) | claims D #9 GAP OD07 RUNNING.

# REVIEW day-khac-audit r2 (BIG, time rules) — reviewer session_01964izCyGrFDRkwmZnRPFw9 (20/11)

Read in full: START_CORE (18 laws), START_WORKER, START_REVIEWER, OD L1472 + L1654 verbatim (+ L852 via L1472), D9-gap-jobs.md header + JOB 2,
reports/review-day-khac-audit-r1.md (r1 + § ROUND 2), reports/day-khac-land.md.
Reviewed review/day-khac-audit-r2 @ e4625ca51d6d47db689526e40469717a6c9e402c (FF of 66bd36cd). origin/main moved to **fd682a8d** (mg-back-rv)
during the review → final-merged on **review/day-khac-audit-rv @ d889d505ddd8ff8710a3878b95dcdfb186f97480** (only index.html/sw.js
conflicted: theirs + build_site.sh). The mg-back code it brings (j82 kgDefer / lesson / practice / jrcp / jveil / jsgame) gates on the
day-aware can() and pays khắc through spend() (j76 spill wrapper) — no new buổi-only gate. No code change by the reviewer.

## Merge conflicts — both sides kept
- j77 lead option (accLead / j77Card add-on): MAIN's charging is intact (odds read before spend, spend(1), bạc taken only on success,
  "hỏng: không mất bạc"); OUR words "thành: được vào<j77When>" say the arrival buổi when the walk spills; gate dayFit(tc+1).
- jgift courtMeet: MAIN's no-odds-word line for sure walks kept; OUR accSpillOk branch ("Đến <nơi> gặp ngài" / "Sang Đức Thọ cung thỉnh an",
  "thành: đến … vào buổi X") is open on a spill; tap → walkGo (goTo or walkSpillGo). walkSpill checks access at the ARRIVAL buổi, so a
  sáng→trưa walk to Đức Thọ cung (Thái hậu receives only at sáng) stays grey with the closing reason — true words.

## Every «can it still be done» check = khắc left in the DAY with spill
- Guard ALLOW list read by hand, hit by hit (static scan PASS, 376 modules): j1:91 can() base (replaced by j76 day can) · j15:23 whyTime base
  (wrapped by j76 day words) · j72:176 text only after the day can() failed, asks whyTime first · j9:127 walkOk = the plain-walk test, every
  reader that greys goes through accSpillOk / walkSpill · j77:42 j77When = a label · jmen:199 menKh / jtsb:34 tsbKh spend the full cost when
  j76spills, the min only trims at buổi tối · jrest:20 fallback when j76left is missing · j76 ×7 usedbal + ×3 khongkip = the core and the
  sáng-only thỉnh an / a.b cards (OD L852 (b)). All justified.
- My own sweep beyond the guard patterns: `used (<|>=|…) (4|BAL.time.khac)`, `4-used`, `kh<4`, "không kịp / kịp xong / hết khắc buổi":
  remaining hits are buổi-spent checks (j6/j25 auto-advance, jcooptimer highlight, j19 guessWhy after !can, j27 map label later re-opened by
  accSpot), jagent:258 reason after !can, and story text (jrd_*, j67, j68f, j71, j72, jroute, jreign, jts, j95…). No new gate.
- j95c roster loop now reads J95.KH (was typed 4).

## One core (law 4)
accLeadCost() → BAL.sneak.lead (=15, one key, no duplicate in jbal/jbal2); dayFit / jkc2 header / jrest restDsK read BAL.time.khac / j76left.
Notes left as before (not FAIL): jk3:96 / j95 `[0,1,2,3]` row shapes (C-AG roster area).

## Law 7 wording
No % added (0 lines). New player words: "Đường xa hơn số khắc còn trong buổi thì đi tiếp sang buổi sau, miễn trong ngày còn đủ khắc; riêng buổi
tối không đi qua đêm", "dùng hết số khắc còn lại trong ngày", "(đến nơi vào buổi tối)", tut lines — cổ trang, true. Laws 1/2/3: no change to
NPC rules or choice values (lead charge = main's).

## Gates
- e4625ca5: build reproduces (only build line); time-spill-guard PASS static + runtime; quickcheck.sh PASS (core gates PASS, old save from live
  loads + plays a buổi; render 235/205, tab 402/448, buổi 1090/948 ms — the known ±25 % noise); coop-e2e 68/68.
- d889d505 (after the fd682a8d merge): quickcheck.sh PASS (core gates PASS, time-spill guard PASS, old save ok; render 205/212, tab 442/431,
  buổi 1017/1344 ms); coop-e2e 68/68; main's new mg-back.js 12/12.
- tier.js = BIG (as planned).

## Shots (scratch only, deleted; not in git / CDN) — Fold 755x1000@2 + iPad 1180x820@2, seeded consort life, 0 page errors, no h-overflow
- buổi chiều, 1 khắc left: Hành sự "Hối lộ Kính sự phòng · Cần ✓ 2 khắc (sang buổi tối)" open; Dư đồ (iPad list) Đức Thọ cung plain "2 khắc",
  ask/sneak "3 khắc" open, Ngự hoa viên grey "đến nơi đã sang buổi tối — đóng cửa tối".
- buổi tối, 1 khắc left: "Tranh sủng" / "Chặn ngự giá" grey "✗ hết khắc trong ngày (cần 2, còn 1)", 1-khắc cards open; Dư đồ asks/sneaks greyed.
  Looked at each shot: readable, nothing cut, kit cards/chips only.

PASS d889d505ddd8ff8710a3878b95dcdfb186f97480 (review/day-khac-audit-rv, FF of current origin/main fd682a8d)
