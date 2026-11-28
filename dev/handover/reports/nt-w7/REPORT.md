# SEAT W7 (successor of W6, 25/11 ~12:48Z–, START_CTX ~12 % of window) — review/net-ghen-2
PRIORITY #1 CHECK: OD 0 | main jaudit §5 pvOan/pvQuy/pvRel + AOUT getter pattern (REUSED; new pvOanSet/tatRelTxt beside them) | review/net-ghen-2 1ac2e2a7 (W6) | claims W7 line in CLAIMS.md.

## (1) NB-b ROOT — relAdd argument order (LAW 1/6/11), DONE
j9 `relAdd(x,y,n)` = x is the DOER, y the one it lands on (BAL.relOan comment jbal2:567): n<0 → y gains |n|×hurt(.6) oán toward x, x |n|×doer(.2); n>0 → y's oán toward x melts |n|×mend(.3). Thiện cảm moves both ways (no order effect).
Scan: `node sites.js` lists all 250 relAdd call sites (file:line, x, y, n, sign from the live BAL, 160 chars before) → sites-after.txt. Every site read by hand (sign − 106, + 53, ? 88 read from context). 13 sites had the victim/receiver first → order.py (idempotent):
| site | act | before (who gets ×.6 oán / whose oán melts) | after |
|---|---|---|---|
| jface Tát | a slaps t | a (doer) oán t 9/15/24 + t only B.oan | t oán a 9/23/42 (tier 1/2/3), a 2/4/6 |
| jface Phạt quỳ | a punishes t | a oán t 9 | t oán a 9 |
| jslap miss (NPC→her) | a's slap at her missed | a oán her | she oán a |
| jslap dodge | a's slap at t dodged | a oán t | t oán a |
| jpoison pgGive | t notices a's odd gift | a oán t | t oán a |
| jpoison found | she finds f's poison | f oán her | she oán f |
| jpetcare (+) | a helps t's pet | a's oán to t melted | t's oán to a melts |
| jagacts2 cx2:chest | v searches t's chest | v oán t | t oán v |
| j70 exec70 | her trap catches a's men | she oán a | a oán her |
| jecon rcvBlockGo | p spends v's favour | p oán v | v oán p |
| jecon econDoDuty (+) | p pays bạc to v | p's oán melted | v's oán to p melts |
| jworld2 giftRound cold | v snubs the mother | v oán mother | mother oán v |
| jworld2 Cáo bệnh không tới | she skips m's feast | she oán m | m oán her |
Read and kept (order right): j92 clear (cu framed her), j8/jrcv tainted-gift back/check (receiver acts), jtruth, j8 maidMonthP, jlost, jptime iwLeave, jbancung, jst14 f14Hate (v is the story foe), jreign, j95 bribe/silent (mutual), jvisit, jgreet provoke, jworld ambush, all `relAdd(a,t,…)` act bodies and `relAdd(S,v,…)` choices of hers.
Runtime proof (nbb.js, real ACT.tat.f / ACT.phatquy.f on two consorts): Tát sev1/2/3 → oán t→a 9/23/42, a→t 2/4/6, thiện cảm −15/−25/−40; Phạt quỳ → t→a 9, a→t 2.

## Cards shown == applied (NB-b part 2)
| card | before | after |
|---|---|---|
| Tát (x + AOUT.tat) | «nàng oán ngươi» (no number) | «thiện cảm -15 đến -40, nàng oán ngươi +4 đến +88» (tiers × nết; pvOanSet sums the two oanAdd chunks) |
| Phạt quỳ | «nàng oán ngươi» | «thiện cảm -15, nàng oán ngươi +4 đến +19» |
| Ngáng chân (j9 place menu) | «nàng bẽ mặt» | + Danh nàng −3, thiện cảm −6, oán · bị thấy: thiện cảm −12, oán, 1 chứng cứ |
| Bỏ phấn lạ (x + AOUT.rash) | no oán line; AOUT typed «5–16 trong 1–4 tuần» (law 4) | from RASH.d / RASH.wk; «bị lộ: nàng nắm 2 chứng cứ, thiện cảm -10, oán ta +3 đến +13» (j8 caught) |
| Giúp chăm thú | thiện cảm only | + «bớt oán ta 2» (mend) |
Checks: build OK, page 0 errors, relshow-scan RAW 0 (oán 103 / aff 412), relshow-rt PASS.
Tools here: sites.js (site list), order.py, cards.py (idempotent hand rewrites), nbb.js (card text + applied check).

## OPEN (next): (2) NB-a j70 Bày mưu lines, (3) NB2 result cards, (4) all gates.

## (2) NB-a — j70 «Bày mưu» lines, DONE (nba.py, idempotent; check nba.js <index> rumor)
| option | before | after |
|---|---|---|
| Ra tay ngay: <act> | «thành: Danh nàng -8 · hỏng: dễ bị lộ, nàng nắm chứng cứ» | the act card's own line (sgLine → actLineRaw, target v): «tốn · thành: Danh nàng -8 · hỏng: không ai tin: nàng nắm 1 chứng cứ, thiện cảm -5, oán ta +1 đến +6 · bị người của nàng phát giác: … 2 chứng cứ, thiện cảm -10, oán ta +3 đến +13 · kèm: người được sai bị bắt thì khai ra ngươi …» |
| Bày mưu: <route> | chuẩn bị / lúc ra tay / dấu vết / «có thể phát hiện» | + «thành: <AOUT win>», kèm «ra tay mà hỏng: <AOUT lose>» (exec70 → runAct = the same act), «có thể phát hiện: mưu khó thành hơn, có khi nàng nắm 1 chứng cứ» (step70 p.g+10, evA evTop) |
The jsgame sub-dialog («Tự ra tay» / «Giao cho người làm») already uses sgLine → actLineRaw = the full line (checked at runtime). W5's «Danh ngươi −5» on a Fold rumor fail: rumor f applies no Danh to the doer — not reproduced here; re-check in the real-tap gate.
relshow-scan RAW 0, relshow-rt PASS after this.

## HANDOVER (W7 rolls at START_CTX + 25 %) — next seat, review/net-ghen-2 f0b6b3fe
1. Worktree /home/user/wt/ng (sparse, hooks installed) is on f0b6b3fe; dev/test/relshow-bal.json is built (not in git). W7 tools in dev/handover/reports/nt-w7 (sites.js lists every relAdd site with its BAL sign; order.py / cards.py / nba.py = W7's hand rewrites, idempotent; nbb.js / nba.js = runtime text + applied checks: `node nbb.js <abs index.html>`, `node nba.js <abs index.html> rumor`). W6 tools: handover branch dev/handover/reports/nt-w6.
2. OPEN (3) NB2 (RV2): jstaff elderTalkGain result card — thiện cảm +1 + the news line are not listed under ĐƯỢC; then scan EVERY result card (kit result card: what was really gained/lost must be under ĐƯỢC / MẤT) — not started.
3. OPEN (4) all gates — none run yet by W7 except build, page 0 errors, relshow-scan RAW 0, relshow-rt PASS: net-build, one-core guard/bind/text/text-rule, coop-e2e, quickcheck ALONE, two-way-oldsave, real taps Fold 755x1000 + iPad 1180x820 (iPad as TOUCH; W5 reports/nt-w5 drv.js + c.sh) on: Tát, Phạt quỳ, Ngáng chân, Bỏ phấn lạ, Tung tin đồn (Bày mưu + Ra tay ngay), Ban thưởng, Hại nhỏ, a gift, Hỏi han sức khỏe — the shown range must bracket the applied change; look at every shot. Also re-check W5's «Danh ngươi −5» on a rumor fail.
4. Law-4 leftovers seen (not fixed, text == apply): j9 trip ap(a,{duc:-4}) + A("trip") c:{duc:-4} and pushPond danh −8 / suc −25 typed; W6's list (jts lì xì, j55 h54Court, j6 «nàng thù -20»).
5. Then report + «SẴN SÀNG KIỂM review/net-ghen-2 <sha>» to Foreman D.
