# SEAT W8 (successor of W7, 25/11, START_CTX ~10 % of window) — review/net-ghen-2
PRIORITY #1 CHECK: OD 0 | main j63 kaResultRows / resultShow (kit result card, REUSED + widened; no new card) + jaudit §5 pvOan/pvQuy/pvRel | review/net-ghen-2 b80010e5 (W7) | claims W8 line in CLAIMS.md (successor of W7).

## (1) NB2 — result card shown == applied (LAW 11 whole family), DONE (one residual list below)
Root: the ONE kit result card (j63 kaResultRows ← rsnap) only diffed her stats (RKEYS), her maid's loyal and the consorts (relSnap).
Every other person a tap changes was invisible: the named elders (jstaff Biếu / Hỏi chuyện = the RV2 case), every servant (own staff
loyal, others' af.me), the court (S.court af.me: Tổng quản, Kính sự phòng …), the familiarity step reached (S.known), and knowledge handed over.
Fix (kit level, every caller of resultShow at once):
- j63: rsnap also keeps plain numbers `srv` (sid → thiện cảm; own staff = loyal + af.me), `court`, `kn` (S.known copy), `learn` counter.
  kaMorePeople() adds one row per person «<tên>: thiện cảm ±N, quen biết» (name-mask: «một cung nhân» / «một vị …» for strangers).
  `kaLearn(text)` = what an act hands her as news; listed under Được once. kaLastResult also carries `kem` (the Kèm line as data, for scans).
  A stranger consort's «chứng cứ về nàng ±N» was dropped (only thiện cảm went into the stranger row) → now its own row.
- jstaff Hỏi chuyện calls kaLearn(«nghe chuyện <palace>») = the button's «thành: nghe chuyện …».
Scan: `dev/handover/reports/nt-w8/rc-scan.js` (reuses dev/test/act-audit.js LIB + loop: every act button + dialog option, win + lose,
scenarios dau, hau; plus direct elder Biếu/Hỏi chuyện + court Biếu) → `rc-sum.py` (per family: changes under a card / NOT named).
| family | before (456 runs, partial) not named | after (839 runs, full dau+hau) not named |
|---|---|---|
| servant thiện cảm (af.me, elders, court staff) | 36 / 36 | 10 / 24 (all = servant removed, see residual) |
| servant loyal (own staff) | 20 / 34 | 10 / 46 (same removed-servant runs) |
| court thiện cảm | 8 / 8 | 0 / 8 |
| familiarity step | 31 / 31 | 18 / 217 (residual) |
| consort ghen (Kèm) | 20 / 22 (scan read no Kèm) | 0 / 30 |
| consort chứng cứ (stranger) | — | 9 / 9 → fixed after this scan (j63 stranger ev row; RE-RUN rc-scan to confirm) |
| her stats | 6 / 160 | 2 / 280 (residual) |
| consort thiện cảm / oán / ta quý, her maid | 0 | 0 |
Elder card before → after: Biếu «Bạc −20» → «Diệp ma ma: thiện cảm +10 · Bạc −20»; Hỏi chuyện «ta không được gì, cũng không mất gì» →
«nghe chuyện Càn Ninh cung · Diệp ma ma: thiện cảm +1, quen biết»; court Biếu «Bạc −20» → «Hoa Đắc Lộc: thiện cảm +10 · Bạc −20».
Residual (NOT fixed, for the foreman to rule / next seat):
a) Hặc ăn mặc sai phẩm / Tố xa xỉ (on Hoàng hậu) WIN: her own servant leaves her staff (srv.1 → gone) and the card says nothing — a lost servant has no row kind yet (needs a kit row word, e.g. «<tên>: rời cung ngươi»).
b) Thỉnh an Hoàng hậu WIN: the other consorts become «Biết tên» before rsnap is taken (arrival, not the act) → not on the card.
c) Múa trong yến tiệc LOSE: Sủng −3 not on the card (the card's before snapshot is after the drop); not traced.

## (2) Gates (b80010e5 → c7afeb8d+)
| gate | result |
|---|---|
| build (dev/site/build_site.sh) | OK |
| one-core-guard / -text / -text-rule / c6-cancel | PASS |
| one-core-bind | FAILED on W7's j70 Bày mưu line (BAL.eff.j70.evTop printed, read only in the step70 wrapper) → seeEv70() one reader for rule + text → PASS |
| relshow-scan --fail-raw | RAW 0 (oán 103, aff 412) |
| relshow-rt | PASS |
| net-build | 203/203 PASS |
| coop-e2e | branch 141/144: FAIL «fold #next enabled», «buổi 3:1 advanced for both», «week after rebirth advances»; origin/main 142/142 PASS; branch RE-RUN = same FAILs («fold #next enabled», «buổi 2:1 advanced for both», «week 3: fold advanced») → REAL, BLOCKING |
| quickcheck ALONE, two-way-oldsave | NOT RUN |
| real taps Fold 755x1000 + iPad 1180x820 touch | STARTED only: Fold Hậu cung → Hoàng hậu → Hại nhỏ → Tung tin đồn card seen (Thành Danh nàng −8 · tin cậy thái giám +3; Bại 1 chứng cứ, thiện cảm −5, oán +1 đến +6; Kèm phát giác 2 chứng cứ, thiện cảm −10, oán +3 đến +13) and its Tự ra tay / Giao cho người làm dialog; stopped at the «Kiếp này chưa trọn» warning. Nothing on iPad yet. |
Tools: rt/drv.js (W5 driver, ROOT → this worktree), rt/realtap.js (copied from review/robot-realtap), rt/c.sh (RTD = dir).
Setup used `read` JS (new life, rank 3, knows everyone, overlays removed) — the card taps themselves are real taps.

## HANDOVER (W8 rolls at START_CTX + 25 %) — next seat, review/net-ghen-2 (see git log for the sha)
1. Fresh sparse worktree of review/net-ghen-2; `bash dev/site/build_site.sh`, `python3 dev/build/assemble.py`.
2. BLOCKER: coop-e2e on the branch fails 3 co-op advance checks twice (fold «Sẵn sàng» stays enabled / buổi + week do not advance for both); main passes 142/142. Bisect W5→W8 commits (git log b80010e5.. and earlier net-ghen commits) — likely a co-op «Sẵn sàng»/buổi path touched by the relAdd / card changes; fix before anything else.
3. Re-run `node dev/handover/reports/nt-w8/rc-scan.js file://<abs index.html> out.jsonl dau,hau` (~45 min) + `python3 rc-sum.py out.jsonl`: consort ev must be 0; then decide residual a) (kit row for a servant who leaves) with the foreman (KIT FIRST: new row word = kit request).
4. quickcheck ALONE (dev/tools/quickcheck.sh), two-way-oldsave (old = origin/main index.html), real taps Fold + iPad (IPT=1) on: Tát, Phạt quỳ, Ngáng chân, Bỏ phấn lạ, Tung tin đồn (Bày mưu + Ra tay ngay), Ban thưởng, Hại nhỏ, a gift, Hỏi han sức khỏe, elder Hỏi chuyện + Biếu (new rows), court Biếu; shown range must bracket the applied change; look at every shot. Re-check W5's «Danh ngươi −5» on a rumor fail.
5. Then report + «SẴN SÀNG KIỂM review/net-ghen-2 <sha>» to Foreman D.
