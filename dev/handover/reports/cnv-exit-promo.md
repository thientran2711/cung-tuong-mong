# cnv-exit-promo — worker report (branch review/cnv-exit-promo)

PRIORITY #1 CHECK: OD 0 hits for «Xin ở lại» / «xuất cung 25» / srvMp / tinUp / srvBar as owner-ruled numbers (OD:L1936 = ma ma ladder answer, OD:L2450 = robots never choose exit roads) | main dev/build/j42.js:431-446 (PEND.cnvAge / cnvName / srvRise), jts.js:18 tsSrvRows, jexam.js:250 exSrvGate | review/* none | claims none (F question lines FOREMAN_F_STATUS.md:321,327-328).

Base: origin/main 9f72524b. LAND READY review/cnv-exit-promo 2813d5cd. Commits: 0d6c8776 (fix + tools), 11759190 (build), 2131e69b (Xét phẩm exam row + build).

## 1. Exit at age 25 («Xin ở lại» → life ended «Xuất cung»)

### What really happens (code + real taps)
- `PEND.cnvAge` fires once at BAL.srvAge.ask (25) (j42 srvMonth, `S.srv.ageAsked`). Answers: «Xuất cung về quê» (ends the life; fate «Xuất cung, mở tiệm nhỏ ở kinh thành» when Bạc ≥ 100), and either «Xin chủ giữ lại» (Chủ tin ≥ BAL.srvx.keepTin) or «Xin ở lại» (below).
- BOTH stay answers really keep her: she plays on and leaves only at BAL.srvAge.out (30) (j42 srvMonth «Xuất cung tuổi 30»). Verified: JS chooseM, a real click (direct mode), a real touchscreen tap in HOST mode on Fold (rot.js frame) — all three: no ending at 25, Chủ tin −5, life goes on to 30, dialog never re-fires. Headless 7-year idle lives (below) also stayed past 25 via «Xin ở lại».
- BUG (the robot's screen, reproduced exactly): the low-Chủ-tin line was `Chủ tin dưới 60: chủ không giữ · ở thêm đến 30 tuổi, Chủ tin -5` with fx `{}` and the −5 applied in go(). The kit hint (jk2b kitHintPhrase) read «Chủ tin dưới 60» as a Chủ tin GAIN, so the row said «ĐƯỢC chủ thêm tin dùng kẻ hầu, ở thêm đến ba mươi tuổi · MẤT chủ bớt tin dùng» — gain and loss of the same stat, plus «chủ không giữ» while she is kept. «30» was typed (law 4).
- «Rất vững» on these rows is the kit's ruled meter for a sure (no-roll) option (`data-ksure`, KIT.md §865 / review/odds-meter-back). Both answers are truly certain, so after the text fix the meter is truthful; not changed (law 16).
- The robot's ending itself: NOT reproduced. Its fate/text («25 tuổi, rời cung theo lệ với 307 lạng… mở một tiệm thêu») is exactly option 0's go, i.e. option 0 ran. The harness (review/robot-realtap dev/test/realtap.js) checks elementFromPoint right before the touch, and blacklists exit roads (OD:L2450), so it did tap row 1. Ruled out: chooseM index remaps (jemoact eaLockWhy — only Nhịn/Đáp trả words; jtsb `need`; jts `tsDis`; j75 `lk`), option re-build (deserQ only on load; the bond option j42:618 is unshifted at build time, same array at choose), age re-fire (ageAsked saved), co-op wrappers (solo). Without the save at that moment I cannot say more. ASK (F): next cnv life, dump save + `Q[0].opts.map(o=>o.n)` when «Đến tuổi xuất cung» shows, and the click log of that tap. Regression test now guards the real-tap path.

### Fix (j42.js + BAL.eff.j42)
| answer | before | after |
|---|---|---|
| cnvAge «Xin ở lại» (Chủ tin < keepTin) | fx `{}`, x «Chủ tin dưới 60: chủ không giữ · ở thêm đến 30 tuổi, Chủ tin -5», −5 hidden in go() → shown «Được: chủ thêm tin dùng…» | fx `{tin: BAL.eff.j42.tinGo_6}` (shown as Mất), x «ở lại đến ${BAL.srvAge.out} tuổi · chủ không đứng ra giữ, ngươi tự xin Nội vụ phủ» → shown «Được: ở lại đến ba mươi tuổi, chủ không đứng ra giữ… · Mất: chủ bớt tin dùng» |
| cnvAge «Xin chủ giữ lại» | fx tin:2 typed, «ở thêm đến 30 tuổi» typed; iPad hid the age behind «!» | fx BAL.eff.j42.tinKeep, «ở lại đến ${BAL.srvAge.out} tuổi · chủ xin Nội vụ phủ giữ ngươi» (outcome first, visible on iPad) |
| cnvWed «Xin ở lại hầu chủ» | fx tin:5 typed, x empty | BAL.eff.j42.tinWedStay, x «ở lại hầu chủ» |
| cnvGrant «Xin ở lại» | tin −5 typed | BAL.eff.j42.tinGrantStay, x «từ chối khéo, ở lại hầu chủ» |
| cnvPrince «Xin ở lại hầu chủ» | tin 3, «tình ý -15» and go −15 typed | BAL.eff.j42.tinPrinceStay / tinhPrinceStay (text prints the key, go reads it) |
Numbers unchanged (2 / 5 / −5 / 3 / −15); only moved to BAL.

### Whole group (law 11) — `python3 dev/measure/stay-opt-scan.py` (exit 1 on B/C hits)
| scan | before | after |
|---|---|---|
| A stay/keep answers beside a life-exit road | 7 (5 in j42, jrd_cnv:529, jworld2:204) | 7, all honest (the two non-j42 are story stays, no exit at stake) |
| B a stat threshold inside the effect line (kit reads it as a gain) | 1 (j42 cnvAge) | 0 |
| C typed release age | 2 | 0 |
NPC maids (jagstaff asMonth0 age rule) use the same BAL.srvAge, no text: unchanged. Kit robustness (kitHintPhrase treating «<stat> dưới N» as an effect) → KIT REQUEST suggested to the kit keeper, not touched here (law 9).

## 2. Promotion road (cung nữ)

### Every way up and its gate (all BAL)
1. Monthly merit rise (j42 srvMonth): not in Tân Giả khố, has a master; Công lao ≥ srvMpNeed(rk) = (rk+1)·BAL.srvMp(5); rk < srvMax() = srkMax(master) (BAL promo cap by master rank); Chủ tin ≥ BAL.srvx.tinUp (35); then the Nội vụ phủ exam (jexam exSrvGate): window BAL.ex.win (2) weeks, card «Khảo hạch Nội vụ phủ» in Hành sự, pass bar BAL.ex.srvBar[rung], wait BAL.ex.srvCd after a lapse/fail.
   Công lao: +1+⌊master rank/3⌋ per month, plus merit cards (BAL.eff.j42.merit*).
2. Story roads: jrd_cnv lmmRk (ma ma line), j67:1238 favour rise.
3. Leaving the ladder: cnvName → srvRise (consort), ma ma (age 25, ≥ Chưởng sự, exam).

### Measure — `node dev/measure/cnv-promo-sim.js <url> 4 7 work,idle` (exam auto-simulated with the card's own odds)
| policy | lives | promoted | best rung | exam sat/passed | Tân Giả khố stints | note |
|---|---|---|---|---|---|---|
| work (plays the exam card + up to 3 Công lao / Chủ tin cards a buổi) | 4 | 4/4 | Chưởng sự cô cô ×3, Nữ quan ×1 | 2–6 / all passed | 0–1 | tam → nhị đẳng by month 5–6, Chưởng sự within ~10–12 months |
| idle (never plays a card = robot «quiet») | 2 (run cut for time) | 0/2 net | tam đẳng / thô sử at 25–27 | 0 / 0 | 6 each | Chủ tin drifts to 0–30 (< tinUp 35) → angry-master events → Tân Giả khố (rank → 0, back at rk0−1); exam never sat |
Conclusion: the road is reachable — fast — for a sensible player who serves (cards) and sits the exam. The three robot lives (s5d, s1d, s4d) and M1 were idle/quiet: Chủ tin below 35 and the exam card never played. No BAL gate is unreachable; no number changed (none of these are owner-ruled, but none needs changing). If anything the working road is quick (Chưởng sự in < 1 year) — flag for balance owners, no change made.

### Fix: «Xét phẩm» lied «đủ» (robot M1: «Xét phẩm: đủ», not tappable, rank 0 for 24 years)
- The box/panel (jts tsSrvRows, one source for the hud chip, the K3 right-column box and the panel) listed only Công lao / master cap / Chủ tin — not the exam, which is the gate that actually decides. So it said «đủ» for years while the exam lapsed unseen.
- Now one more row: «Đỗ khảo hạch Nội vụ phủ (mở khi đủ các điều trên)» / «Khảo hạch Nội vụ phủ: thẻ ở Hành sự, hạn đến hết <ngày>» / «… lỡ hoặc trượt, chờ đến <ngày> mới được thi»; note «đủ công: dự khảo hạch…» when only the exam is missing. The box says «thiếu 1» until she sits and passes.
- Tappable: on this build the right-column box is tappable (Fold + iPad, real touch, opens the panel). Two causes for M1's «not tappable»: (a) the box is only 17 px tall (kit right-column row size — KIT REQUEST, law 10, not touched); (b) jts.js:248 ignores the tap silently while any card is queued (`if(Q.length)return`). Left as is (shared with Nguy hiểm chung, kit/flow rule); reported to MAIN.

## Side findings (not fixed, for MAIN)
- 3 of 4 «work» lives died by 18–23 (policy picks the first non-exit, non-Chủ-tin-loss answer) — maid mortality worth a look by the balance owner.
- Demotion without Tân Giả khố seen once (work life 1: −1 rung y4m3) — srvReassign to a master whose cap is lower clamps the rung; by design?
- Parking-lot idea: a «Tin báo» line when the exam window opens / is about to lapse (passive players miss the 2-week card).

## Tests
- `node dev/test/cnv-age-stay.js <url>`: 16/16 PASS ×3 (low + high Chủ tin; shown row; real touch; fx; no release before BAL.srvAge.out).
- one-core-guard / one-core-text / one-core-bind / one-core-text-rule: PASS; c6-cancel-scan 0; odds-unknown-scan clean; stay-opt-scan exit 0.
- quickcheck (HEAD 2813d5cd, build 2131e69b): QUICKCHECK PASS · open 2070 ms · old save ok · perf new/live render 249/262, tab 543/480, buổi 1459/1219 ms (box noise ±40 %), tasks>200ms 26/26 · core gates PASS.
- Shots looked at (scratch, not in git): age dialog before (Fold) and after (Fold 755x1000 host + iPad 1180x820, low + high Chủ tin); Xét phẩm panel (Fold, open window).
