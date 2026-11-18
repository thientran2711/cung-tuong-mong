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

## ROUND 2 REVIEW — shown-odds-r2 (spend-before-roll) BIG (D #2 reviewer session_01964izFyUaSfxgcEB3KDJP9, opus; START_CTX ~4 % of 1M, end ~27 %)
PRIORITY #1 CHECK ('fzRun / aRoll / spend then roll / shown==rolled across spend'): OD 0 | ledger 0 | claims 1 (this review) | main: round 1 j9 actCtx/actOdds + C-AG ag-all-2-land e18697fe (servDo, twDo, SRVA, eyes(), inviteO, stf2Bribe) | review/*: review/shown-odds-r2 b39e6678 (under review), review/npc-chain-land feel-shown.test.js (not on main; its case = our steal-tonight row) | archive 0.

**VERDICT: PASS cf1fc7467e1cde55672a283b6fdd772f349f925d** (branch review/shown-odds-r2-rv; FF from live main 5e6490b4). Reviewer fixes on the verdict branch (small, same one way):
1. **4 paths the worker + scan missed** (odds shown through a variable, e.g. `o=petBuyO(k)` … `word(o)`): j53 "Xin Hoàng thượng cử Đại học sĩ" (Sủng -4 applied BEFORE the roll → rolled always 2 below shown), j54 "Nhờ con nói giúp" (Mẫu tử -4 before the roll → -2), j61 "Hỏi người hầu: đó là ai?", jpet buy. All now read before the spend. Scan: is_shown also follows `x=EXPR … word(x)` (live → 4 AFTER, fixed → 0). Spend test +4 rows: live FAIL 4/79 (k61 62/89, pet 78/87, kt53 65/48, h54 70/68), branch 79/79.
2. **Final merge of live e18697fe (C-AG ag-all-2-land)**: 15 source files conflicted on the same act lines; kept C-AG's code, re-applied the freeze. C-AG moved servant "Hỏi chuyện" into servDo → aRoll there + fzRun at the button; bribeServ now weighs stf2Bribe by its odds → new j9 `aOdd(o,a)` (the odds an own roll uses; aRoll = aOdd + roll) so the frozen odds feed that weight too; new j42 "poison" (spend then roll) and j21 invite (odds stored after the spend) read before the spend; jtwoway twDo own roll = aRoll (her talk-card deeds were re-read inside fzRun).
3. Final merge of live 5e6490b4 (shop-panel; build files only).

### Checks (brief 1–6)
- 1 Family: scan PASS (57 spend paths: FROZEN 33, SIDE 24); planted spend-then-roll copy (j83 sell) → scan FAIL 1 AFTER. Hunt over all 118 spend sites (non-literal rolls after the spend, scan-unlisted): found the 4 above; after merge only jthaiy:96 (BAL constants, not shown).
- 2 Correctness: frozen = actOdds/the card value before the spend (same ACTX parts: lá số, spy, sent pen, oddsCl once); side rolls (caught/confess/punish/belief/news/odds-cap soft fail) stay roll(); NPC rolls unchanged (aOdd needs actor S or ACTX.fz of that actor); effects still after the spend; no double oddsCl; no typed numbers added (one-core guard PASS, inline 4211 ≤ 4212); actOdds/optOdds/jointO/runAct signatures unchanged.
- 3 Tests: shown-odds-spend live a2ce736 FAIL (4/75, steal-tonight 64→48) / branch PASS; break fzRun → FAIL 6/75 (not vacuous). Round-1 shown-odds 90/90 (pre-merge), 97/97 (merged).
- 4 Gates on merged code: odds-cap PASS · one-core-guard PASS · quickcheck --runs 6 PASS ×2 (e18697fe merge: render 206/237, tab 399/392, buổi 1077/1221 ms; old save ok) + final on cf1fc7467e1cde55672a283b6fdd772f349f925d: quickcheck --runs 6 PASS (render 177/202, tab 356/339, buổi 847/1013 ms; old save ok), spend test 79/79 · coop-e2e 63/63 (pre-merge and on the e18697fe merge) · paired bot (bot-same sens 8 steps, live vs branch, before and after merge): no runaway, 0 page errors, lives differ as expected (rolls changed), no HH rate (short run).
- Shots Fold 755x1000@2 + iPad 1180x820@2 (scratch, deleted): act screens render, ladder words only, 0 page errors, no horizontal overflow. No text change.
- 5 FREEZE: diff vs live touches none of jag*/j95*/jtoil*/jbal.js/jcoop*/save logic.
- 18 LAWS touched: 4 ONE CORE PASS (one freeze path, BAL only), 7 odds in words PASS (no text change), 11 whole group PASS after reviewer fixes (+4 paths, + C-AG new paths).

### Touched files (vs live 5e6490b4)
dev/build j2 j8 j9 j10 j21 j25 j29 j30 j42 j53 j54 j55 j61 j70 j72 j77 j78 j83 j92 jaudit jdress jecon jgift jlost jpet jpetcare jpoison jpromsv jrash jrcp jsgame jtsb jtwoway jveil jwhy; dev/test/shown-odds-spend.test.js, dev/test/shown-odds.test.js; dev/tools/shown-odds-scan.py; index.html, sw.js, assets.json.

### Open (report only)
- jagent agReact "join" (cùng nàng): pays agSpendKh() then twDo re-reads D.o — shown oj on the card, rolled after the spend. jagent.js is frozen → one-line fix for C-AG: `const oj0=oj;…go:()=>{…fzRun(oj0,null,()=>twDo(S,…))}` (twDo already uses aRoll).
- jagstf2 stf2Bribe (C-AG): the take weight × stf2Tr(trait) means the real chance of "Nhận bạc" ≠ the shown Mua chuộc word even without any spend — a C-AG design question (owner law 4/7), not this branch.
- Co-op invitations (jcoop, frozen) roll when the friend answers; j70 plots roll weeks later (by design).
