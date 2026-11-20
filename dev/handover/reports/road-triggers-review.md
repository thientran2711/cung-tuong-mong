# road-triggers — BIG review E26r (opus) of review/road-triggers 72a9b918 (OR16 + OR18; OR20 out of scope)
PRIORITY #1 CHECK ('reason trigger|npcWhy|biên ải|cải cách|kế vị|jreign|hoi67'): OD 13 | ledger 2 | claims E26 session_01DgYSWozJuxu58UajA1xzLD (done) | main j67.js:143,1772, jagwhy1.js:166-174, jreign.js, jnroad.js:99 | review/road-triggers 72a9b918 | report dev/handover/reports/road-triggers.md @49179271.
Reviewer branch: review/road-triggers-r1 = 72a9b918 + final merge of LIVE origin/main fd682a8d (only sw.js / index.html conflicted: generated, rebuilt with dev/site/build_site.sh).

## VERDICT: FAIL 72a9b918 (review head fc3feb6f = 72a9b918 + LIVE fd682a8d, branch review/road-triggers-r1) — 3 fixes, then re-review
The engine shape is good and reused (npcWhy kind "hoi67", j67 timer kept, numbers moved into BAL.arc.trig, jreign untouched and first,
U3 men-road engine reused). FOREMAN ruling "jreign = template 1, runs first, then one of 2–4" is built that way (law 16 OK).
What fails is truth of the reasons (law 6 / law 1) and the Emperor's help hồi missing its story asks (law 11, Q1 family rule).

### Fix list (numbered, for the worker)
1. **Law 6 (real evidence / true information) — the «event» reason lies on friendly acts.** jrtrig.js rtEvent() takes ANY ok entry of
   S.roster.acts where she is the target, but j95actLog also records the FRIENDLY set F95 = ally / gift / tieuhuy / visit (j95.js:75,
   :526, :536), and j95b event rows (j95b.js:189, :209, :232) add k = present / chosen / misbelief / cleared («hết hiểu lầm»). A consort who sent her a gift, paid a visit, merely stood in an event or just CLEARED a misunderstanding gives «Cớ sự: X vừa ra tay với ngươi» (= "X just struck at you"). Fix: read
   x.k — hostile kinds only (H95, j95.js:73, plus j95b rumor / expose / giahoa) → «vừa ra tay với ngươi»; friendly kinds (F95) → a separate friendly line (e.g. «X vừa tìm đến
   kết giao với ngươi») or not a reason at all. Add a state test: a gift entry must not give the hostile line.
2. **Law 1 two-way + "no reason that never fires" — the reverse event branch is dead code.** rtEvent's `x.id==="me"` branch («ngươi vừa ra
   tay với X») can never fire: every j95actLog caller skips a===S (j95.js:526/532/533, j95c.js:26/36, jroute rtGateT is NPC→NPC) and the j95b rows use a rival id as actor
   (j95b.js:181–266), so in the reviewer's scan no writer puts the player in as actor. The worker's state test only proves the forward branch. Fix: take HER acts on that person from a
   real record of her acts (grep: jtwoway / j77 her schemes, j70 plots by her, her gift log) or add one ledger write where her act resolves
   (one place, kit-free logic), and prove it in the state test. Otherwise the two-way side of «event» does not exist.
3. **Law 11 / Q1 family rule (OD:L644, L1252, L1601) — the Emperor's help hồi has no story asks.** Every other men template has 2 NRASK asks
   per help chapter .5–.10 (jnrask_m.js: 17 roads, 204 asks; nrask-m-scan "≥2 asks of different kinds per chapter"); the princes are the only
   documented exception (they never ask). em_bien / em_cai / em_ke have 0 → his help hồi always falls to the stock card (nrAskPick → nrKind),
   so «Hoàng thượng» asks her in generic stock words, not about the border war / reform / succession. Fix: add NRASK["em_bien_5".."em_ke_10"]
   (3 × 6 chapters × 2 asks = 36), voice trẫm through the {me}/{call} slots, never kind emp (NRSELF.emp), never naming an heir, each option on
   its stock cost (Sức / bạc, law 2 equal value is the stock pair), «do» only with a real {B} (em_cai has the old house; em_bien / em_ke have
   none → no «do» asks there). Extend dev/test/nrask-m-scan.js to read jnroade.js too so the scan covers the Emperor (today it evals only
   jnroadm.js, so this gap is invisible to it).

### Notes (not blocking; worker may take them with the fixes)
- N1 «faction» is a standing state, not a move: in a reign life any cast person whose clan maps to the other side always has a score
  = min (20), so «phe … lấn tới» ("pushing forward") is printed with no move behind it. Prefer the jreign move of that side (a rgL / rg.p
  change this month) as the trigger, or word it as the state («X thuộc phe … đối nghịch với ngươi»). Same for the ally line.
- N2 Reason reach is small by construction: fr = 2 + rI67(2) re-sets A.due after every card (j67:1772), so a reason can open a hồi at
  most 1 month early (lt+1 strong reason only, lt+2 only when the timer drew 3). That matches "timer kept as fallback"; see the ratio below.
- N3 rtDebt: when v.queen, q72A("hh") non-null hides a debt stored under "rv:<id>" (the `||` never runs). Read both keys.
- N4 Old saves mid-hồi (A.lt / A.st0 undefined): no min wait and bar 0, so a reason may open the pending hồi the first month after load.
  Harmless (A.due only moves earlier, never a double open: rtTry exits once S.turn ≥ A.due or A.cur is set). Accepted.
- N5 Pre-existing on main, not this branch: dev/test/nrask-scan.js 3 FAIL (nc_gian_9 unknown slot {kha}, jnrask_b) — for FOREMAN E's list.

## Law check (laws the work touches)
| Law | Result |
|---|---|
| 1 two-way | FAIL (fix 2: her→them event branch dead); grudge both ways OK (hostility(v,S) / oan(S,v)), debt both signs OK, faction side/ally OK |
| 2 equal value | OR16 adds no choice. OR18: her only choice is the help hồi = stock Sức/bạc pair (equal by BAL.nroad.op/.bac/.suc); must stay so in fix 3 |
| 3 gain-and-loss | OR18 outcomes on real fields both ways (table below); help options stock (gain + loss lines). OK |
| 4 one core | OK — one-core-guard PASS (inline 3836 ≤ 4212), bind / text / text-rule PASS; all new numbers in BAL.arc.trig, BAL.ag.why.cd.hoi67, BAL.nroad.men.emp |
| 5 harder as she climbs | not touched (his odds = throne grip rg.p, off-screen) |
| 6 real people / evidence | cast = rvOk67 live people only (test PASS); FAIL on the false «ra tay» line (fix 1) |
| 7 / VANPHONG | new lines cổ trang, no %, no digits; OK except the false meaning in fix 1 and N1 wording |
| 8 expert first | history note present in the worker report before the templates. OK |
| 9 kit only | text inside the existing j67 card / kit dialog / log line; no new frame or CSS. OK |
| 16 | jreign unchanged, runs first (FOREMAN ruling). OK |

## OR18 outcome scan (BAL.nroad.men.emp; every chapter result, gain and loss)
| Template | win | mid | lose | her side |
|---|---|---|---|---|
| em_bien | Biên cương +6, Đại tướng quân thế lực +2 | 0 | Biên cương −6, Đại tướng quân −2 | her house = Đại tướng quân → news line both ways |
| em_cai | Kho lúa +6, strongest other house −2 | 0 | Kho lúa −6, that house +1 | her house = that house → news line both ways |
| em_ke | top-2 princes (age ≥ 6) fond +3 / −1 | 0 | fond −2 / −2 | her son → news line; never names an heir (test PASS) |

## Tests run (reviewer, on review/road-triggers-r1)
- one-core-guard / one-core-bind / one-core-text / one-core-text-rule: PASS.
- nrask-m-scan PASS (but blind to jnroade.js, fix 3); nrask-engine ALL PASS; nrask-scan 3 FAIL pre-existing (N5).
- road-triggers.js: PASS 17/17, 0 page errors (alone; hồi 14, by reason 8, kinds [grudge] only; gap reason 1.57 / timer 2.25 / switch off 2.6 months).
- Ratio bot (one life per origin family, 30 months, reasons ON, seeded): 
  | origin | hồi | by reason | by timer | kinds |
  |---|---|---|---|---|
  | tt | 3 | 2 | 1 | grudge 2 |
  | dtq | 1 | 0 | 1 | – |
  | muoi | 4 | 3 | 1 | grudge 3 |
  | cn | 1 | 0 | 1 | – |
  | nc | 0 | 0 | 0 | – |
  | td | 5 | 5 | 0 | grudge 5 |
  | ch | 5 | 5 | 0 | grudge 5 |
  | thd | 4 | 4 | 0 | grudge 4 |
  | cnv | page crashed («Target page … closed») in month < 30 — worker to check whether jrtrig/jnroade is involved |
  Total 23 hồi: 19 reason-opens / 4 timer-opens (≈ 5 : 1). Every natural reason was a GRUDGE; debt / faction / goal / event never fired in a
  natural life (only in the hand-set state test). dtq / cn / nc reached < 3 hồi in 30 months (their early chapters are milestones), so the
  "≥ 3 hồi per family" bar was met only by tt, muoi, td, ch, thd; re-run those families longer in the re-review.
- quickcheck: QUICKCHECK PASS · open 1535 ms · old save ok · perf new/live render 216/197, tab 444/443, buổi 1029/1063 ms, tasks>200ms 20/18 · core gates PASS.
- Shots: none needed (one text line inside existing kit card/dialog); none taken.

## ROUND 2 — E26r re-review of 255795ca (E26b): PASS 6692d20f08e560281891ad830b37a3fff3f02cae
Head = 255795ca + final merge of LIVE origin/main 794c6b77 (only index.html / sw.js conflicted: generated, rebuilt with build_site.sh).
| Item | Check | Result |
|---|---|---|
| Fix 1 law 6 | rtKind reads x.k: H95 → «ra tay»; gift / visit / F95 / cleared → own true lines; present / chosen / warn / misbelief / ag:* → no reason | OK |
| Fix 2 law 1 | runAct wrap logs HER deed (a===S, consort target, known kind, deed went through) via j95actLog → «ngươi vừa …» lines fire; state tests prove both sides | OK |
| Fix 3 law 11 / Q1 | 36 Emperor asks em_*_5..10 (2 kinds per chapter, trẫm voice, no kind emp, no heir named, «do» only on em_cai, stock Sức/bạc order); nrask-m-scan now reads jnroade.js (20 roads, 240 asks) | OK |
| N1 / N3 / N5 | faction worded as standing state; queen debt reads both books; nrask-scan SLOT gets {kha} (engine fills it, jnroad.js:224) | OK |
Tests (reviewer, alone): road-triggers.js 31/31 PASS, 0 page errors (an earlier run had one Pixi-internal error «r.updateLocalTransform» inside
pixi-8.5.2.min.js, not reproduced alone; jrtrig / jnroade do not touch Pixi; plain 3-life probe 0 errors on both LIVE and branch) ·
one-core-guard / -bind / -text / -text-rule PASS · nrask-m-scan + nrask-scan ALL PASS · role-parity.test.js ALL PASS on LIVE 983a9436 AND on the
branch (the worker's "2 FAIL pre-existing" did not reproduce; either way no regression) · QUICKCHECK PASS on 6692d20f (open 1781 ms, old save ok,
perf new/live render 289/309, tab 496/591, buổi 1406/1410, tasks>200ms 22/23, core gates PASS).
Ratio (road-triggers bot, 3 × 36 months): 15 hồi, 8 by reason / 7 by timer; natural reasons still all grudges (N2 reach accepted). Shots: none (CDN 401, account E).
Laws 1, 2, 3, 4, 6, 7, 8, 9, 11, 16: PASS.
