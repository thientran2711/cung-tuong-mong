# review-shown-odds-one-path — BIG review (opus, D #1 reviewer session_01964izEojRf2ME8Lmxpkd5x; START_CTX ~8 %)
PRIORITY #1 CHECK ('shown odds / shown==rolled / one odds'): OD 1 (OD:L394 "every act through one odds function odA" — kept, extended) | ledger 1 (row 90 odA) | claims 1 (this job) | main jaudit §18 + sentPenNow (reused by the branch) | review/* 1 (review/shown-odds-one-path = work under review) | archive 0. Brief: dev/handover/briefs/D1-shown-odds-one-path-review.md (has its PRIORITY #1 line).

Under review: review/shown-odds-one-path @670aa44c (2 commits on live f60b4024). Verdict branch: **review/shown-odds-one-path-rv** = 670aa44c + reviewer commit 9f9c6c2b (code fix + test coverage) + final-merge of live main 997e049c a2ce736a (site rebuilt).

## VERDICT: **PASS a2ce736abc3601f48fc36f8be0806f91a529fc39** (= LAND READY; FF from live main 997e049c). One worker bug (plant on the spot got a sent-servant pen) fixed by the reviewer; brief gaps (vp/xx, Vì sao spyKnowB line) closed.

## 1. One act-odds path (brief 1) — OK
- j9 `actCtx(a,t,k,sv,x)` is the ONE ACTX (pen, lotB via dom, spyKnowB via t); runAct calls it; `actOdds` = ACT[k].o inside actCtx → oddsCl. Every act-odds display reads it: j15 rvGroups, j6 rvButtons (+ j70 huydung wrapper), j9 placeHarms, j70 oddsOf70 / PEND.j70start / accuse+spy cards, j78 evidenceActs, jsgame sgOdds, jwhy whyOfBtn, jmood. No remaining `lotB(` adder outside odA / optOdds / spyRoll / treatO / conceive (grep).
- Scan re-run myself: branch PASS (ACT-ONE 19, OPT-ONE 1, INLINE 221, NOCTX 4, OTHER 237); live FAIL 16.
- Scanner NOT blind — 4 planted shown≠rolled copies, each FAIL 1: (a) j6 back to `a.o(S,v)`, (b) j70 spy card `p:oSpy(S)`, (c) j19 card `oddsCl(o+lotB(..))` (OPT-RAW), (d) j78 accuse row with a typed `oAccuse(S,p)+lotB`.

## 2. Side fixes (brief 2)
| fix | verdict |
|---|---|
| j78 typed copies → actOdds (trinhth card read S.th, roll j78thFav) | OK — now covered by the test (j78 card word w78) |
| no-send pen: J78NOSEND joins ACT_NOSEND; jwhy sentPenNow = actCtx().pen | OK (one list) |
| spy card = spyRoll (lá số incl.) | OK; "Vì sao" Quẻ row matches |
| trinhth odds read before evidence is spent | OK |
| jbal2 accTire recorded after its roll | OK (card 95 = roll; the charge tires the NEXT one) |
| BAL.actHere.plant (jbal2) replaces typed −15 / +15 | **BUG, fixed by reviewer**: the branch built the on-the-spot ACTX through actCtx, which treats her as SENDING a servant (she is in the target's palace while the target is away → together()=false) → the roll of "Cài đồ vào rương nàng" (tại chỗ) got the sent-servant pen it never had on live (she does it herself). Fix: actCtx `x.here` = done in person, no sent pen; j2 chest card + j8 plantpick pass `{pen:-BAL.actHere.plant,here:1}`. Probe (same state): live roll 63 → branch-before-fix 63−sentPen+18 → now 81 = 63 + lotB 10 + spyKnowB 8 (one path: lot + spy knowledge now count on this roll too, as on every act). |
| j10 jointO (card = leader's odds) | OK — the button only shows when she leads, so numbers unchanged |
| j1 optOdds (card + runOpt one function) | OK |
| oddsCl applied once | OK: actOdds caps once; displays re-apply oddsCl to an already-capped number (idempotent), nothing is added after the cap |
| BAL only | OK: only new number BAL.actHere.plant (jbal2); one-core-guard inline 4211 ≤ 4212 |

Note (report only, numbers unchanged): acts whose own odds do not use odA (odT tocao/expose, trinhhh/xinhh oddsCl, spyRaw) take no sent pen / lá số in their roll; their cards used to subtract a sent pen the roll never had (live card 90, roll 95) — the branch now shows the roll. Whether those rolls SHOULD feel lá số / sending is a design question for MAIN, not a shown≠rolled bug.

## 3. Test (brief 3)
- dev/test/shown-odds.test.js: live FAIL, branch PASS — confirmed. Reviewer changes: (a) seeded BEFORE start() — the worker's version seeded after, so the roster was random and coverage varied run to run (84 / 90 / 93 cases); now fixed 99 cases every run; (b) **vp / xx now reached** (stub cause + a real fault, OWN += wdAccuse/xxAccuse) — both match (85/65/93); (c) j78 evidence-card WORD (w78) compared; (d) new row "plant-here" (j2 chest card vs j8 plantpick here:1).
- Result: branch **99/99 PASS** (twice, identical); live f60b4024 **8/99 FAIL** (exit 1), incl. vp/xx and w78 rows.
- "Vì sao" spyKnowB line: added (same family, small): jwhy `whyKnow(v,k)` = actOdds with the knowledge minus without it → row "Đã dò la, biết giờ giấc của nàng" (shown only when it moves the odds; never claims more than the roll gets). Seen on Fold + iPad.
- Still not reached (no target in the test state; analytic check only): musk/catswap (o:null, no odds shown), kframe, steal/road (tonight), pushp/trip (together), xinhh, pet acts, blockf.
- npc-chain jfeel hook: agree with the worker — wrap actOdds once, not every ACT[k].o (report only).

## 4. BIG gates (on the verdict sha)
- odds-cap.js PASS · one-core-guard PASS (0 fails) · shown-odds-scan PASS · shown-odds test 99/99.
- quickcheck --runs 6 **PASS** (old save ok, core gates PASS; perf median new/live render 225/216, tab 469/426, buổi 1067/1069 ms).
- coop-e2e **63/63 PASS**.
- Shots LOOKED (scratch only): Fold 755x1000@2 + iPad 1180x820@2 — person card Hại nhỏ (words + Quẻ tag), "Vì sao Rất chắc?" popup (Tâm cơ, Đã dò la…, Đức Hoàng hậu, Phải sai…, Quẻ tuần), Dùng chứng cứ cards (Tố giác Chắc, Tố tội thật Nắm chắc, Bóc chuyện tư tình Rất chắc, Trình Thái hậu Chắc…). 0 page errors, no horizontal overflow, kit parts only, VANPHONG ladder words, no %.
- Paired bot (bot-same, sens, 8×300 steps, one seed, live vs verdict): no runaway, 0 page errors on both; 0 lives finished in 2400 iterations on either build (short run), so no HH-rate comparison; end state differs as expected (odds now include lá số + spy knowledge on more rolls: live danh 44 / Đức 23 / Thái hậu 0 vs branch 60 / 6 / 65, same rank 1). The shift is the intended one (shown == rolled, cards now honest), not a rule change; a full balance bot is for balance-final.

## 5. Freeze — OK
git diff --stat f60b4024..verdict: dev/build j1 j2 j6 j8 j9 j10 j15 j19 j70 j78 jbal2 jmood jsgame jwhy, dev/test/shown-odds.test.js, dev/tools/shown-odds-scan.py, index.html, sw.js. **None** of jag*/j95*/jtoil*/jbal.js/jcoop*/save logic.

## 6. Final merge
origin/main moved to 997e049c (look-fx r13, jlooks + tests only) during the review → merged (conflict only in the built index.html / sw.js, rebuilt from merged sources) = a2ce736a. Re-run ON a2ce736a: shown-odds 99/99, scan PASS, one-core PASS, odds-cap PASS, quickcheck --runs 6 PASS (old save ok; render 208/228, tab 422/412, buổi 1011/1017 ms). Touched vs live: dev/build j1 j2 j6 j8 j9 j10 j15 j19 j70 j78 jbal2 jmood jsgame jwhy; dev/test/shown-odds.test.js; dev/tools/shown-odds-scan.py; index.html; sw.js.
Shots were scratch-only (not uploaded) and are deleted.

For MAIN only (not D's): jsgame card "Đang thỉnh tranh…" overlaps the KÈM label (live).
