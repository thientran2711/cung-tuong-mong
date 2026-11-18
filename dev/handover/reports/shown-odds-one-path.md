# shown-odds-one-path — report (D #1 worker session_01964izErPfcSMFt3TCCHZbd, opus; START_CTX ~3 %)
PRIORITY #1 CHECK ('shown.?odds|shown.*rolled|odds.*one path|one odds'): OD 1 (OD:L394 "every act through one odds function odA" — kept, extended) | ledger 1 (row 90 odA LIVE) | claims 1 (this job) | main: jsmg.js:9 one rung path, jaudit §18 card+sentPenNow (reused/replaced) | review/* 0 (odds-cap*, sub-odds, origin-odds = other jobs) | archive 0.

Branch **review/shown-odds-one-path** from live main f60b4024. Brief: dev/handover/briefs/D1-shown-odds-one-path.md. Source finding: reports/npc-chain-land.md § LANDER #5.

## The fault (whole group)
The roll of every person-menu act runs inside runAct's ACTX (sent-servant pen, her lá số on the act's domain = lotB, fresh spy
knowledge of the target = spyKnowB). The screens read ACT[k].o OUTSIDE that context and patched parts back by hand
(j15/j6/j78/jsgame added lotB after the cap; jwhy subtracted a sent pen with its own no-send list). Result: card word ≠ roll.
Dynamic proof on live main: **5/90** act/case rows shown == rolled (dev/test/shown-odds.test.js on f60b4024).

## Fix (ONE odds function per decision, BAL only, through the live ODDS CAP oddsCl)
- j9 `actCtx(a,t,k,sv,x)` builds the ACTX runAct rolls in (runAct now calls it); `actOdds(a,t,k,x)` = ACT[k].o inside actCtx,
  then oddsCl. Every act-odds display reads actOdds: j15 person menu, j6 rival buttons, j70 huydung row / plans (oddsOf70,
  PEND.j70start, accuse/spy cards), j9 Hành sự list, j78 evidence acts, jsgame card, jwhy "Vì sao", jmood.
- j78 evidence acts: the 6 typed formula copies on the card are gone (trinhth's card read S.th, the roll j78thFav — real
  mismatch); J78NOSEND joins ACT_NOSEND (card showed a servant pen the roll never had, −5…−20).
- spy: card shows spyRoll (lá số included) = what f rolls.
- trinhth: odds read before the evidence is spent (was "(evG+1)" after evA: off when evidence is capped).
- jbal2 accTire: the charge is recorded AFTER its roll (the roll counted itself: card 95, roll 85).
- plant on the spot: one BAL.actHere.plant (jbal2; was typed −15 pen in j8 plantpick + typed +15 on the j2 chest card) via actCtx x.pen;
  the dialog's word now shows the on-the-spot odds when done on the spot.
- j10 joint scheme: one jointO(f) (card used hers, roll the leader's).
- j1 optOdds(a): card word (j19 cardH) and runOpt read one function (was the same formula typed twice).
- jwhy sentPenNow = actCtx(...).pen (one no-send list).

## Scan (dev/tools/shown-odds-scan.py) — before / after
Every odds-printing place in dev/build/j*.js: 482. Classes (see script header): ACT-RAW = act odds read outside the roll's
ACTX; OPT-RAW = card formula typed twice; INLINE = shown and rolled by the same expression in one function; NOCTX = act odds
rolled outside runAct too (no ACTX either side); OTHER = no roll nearby (events, side chances, NPC previews).

BEFORE (live f60b4024): ACT-RAW 15, OPT-RAW 1, INLINE 221, NOCTX 4, OTHER 241 → **FAIL 16**
AFTER (branch): ACT-ONE 19, OPT-ONE 1, INLINE 221, NOCTX 4, OTHER 237 → **PASS**

BEFORE (live f60b4024, rows ACT-RAW/OPT-RAW/NOCTX):

| place | shown fn | rolled fn | extra parts only on one side |
|---|---|---|---|
| j10.js:147 facHTML | `odA(S,oFrame(S)+5*(M.length-1))` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j15.js:36 rvGroups | `oddsCl(o+lotB(S,ACTDOM[k]))` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j19.js:40 cardH | `oddsCl(o+lotB(S,a.dom))` | runOpt (o+lotB, own copy) | lotB copy on both (one formula twice) |
| j2.js:63 deal | `oSteal(S)` | runOpt (deck card, outside runAct) | none |
| j2.js:64 deal | `oSteal(S,"road")` | runOpt (deck card, outside runAct) | none |
| j2.js:161 talkOpts | `oddsCl(oPlant(S,v)+15)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j6.js:26 rvButtons | `oddsCl(o+lotB(S,ACTDOM[k]))` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j70.js:230 go | `oAccuse(S,a)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j70.js:242 go | `oAccuse(S,a)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j70.js:427 thrOpts70 | `oSpy(S),/* previews: spyFind (runAct spy) */wt:[G70(`chứng cứ về ${v.name} ${balSg(BAL.eff.jtruth.evN)}`)]` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j70.js:428 go | `oAccuse(S,v)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j78.js:184 busy | `"accuse",oAccuse(S,p)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j78.js:185 busy | `"tocao",odT(S,50+n*10)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j78.js:186 busy | `"expose",odT(S,45+n*8)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j8.js:475 plantpick | `oPlant(S,v)` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| j83.js:175 wkgive | `oPoison(S)` | ACT.poison.f called directly by wkPoison (no runAct) | none |
| j9.js:68 act | `a.o?a.o(S,v):100` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| jsgame.js:242 sgJob | `v,k` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |
| jtwoway.js:102 add | `D.o?D.o(S,v):100,x` | twDo (TW two-way act, no runAct) | none |
| jwhy.js:102 whyOfBtn | `A.o(S,v)}}` | ACT[k].f inside runAct (ACTX) | pen · lotB · spyKnowB only on ROLLED |

shown-odds places: 482 — ACT-RAW 15, INLINE 221, NOCTX 4, OPT-RAW 1, OTHER 241; act odds helpers 21
FAIL: 16 place(s) show odds the roll does not use


AFTER (branch):

| place | shown fn | rolled fn | extra parts only on one side |
|---|---|---|---|
| j15.js:36 rvGroups | `oddsCl(o)` | ACT[k].f inside runAct (actCtx) | none |
| j19.js:40 cardH | `optOdds(a)` | runOpt (optOdds) | none |
| j2.js:63 deal | `oSteal(S)` | runOpt (deck card, outside runAct) | none |
| j2.js:64 deal | `oSteal(S,"road")` | runOpt (deck card, outside runAct) | none |
| j2.js:161 talkOpts | `oddsCl(actOdds(S,v,"plant",{pen:-BAL.actHere.plant}))` | ACT[k].f inside runAct (actCtx) | none |
| j6.js:26 rvButtons | `oddsCl(o)` | ACT[k].f inside runAct (actCtx) | none |
| j70.js:230 go | `actOdds(S,a,"accuse")` | ACT[k].f inside runAct (actCtx) | none |
| j70.js:242 go | `actOdds(S,a,"accuse")` | ACT[k].f inside runAct (actCtx) | none |
| j70.js:427 thrOpts70 | `actOdds(S,v,"spy"),/* previews: spyFind (runAct spy) */wt:[G70(`chứng cứ về ${v.name} ${balSg(BAL.eff.jtruth.e` | ACT[k].f inside runAct (actCtx) | none |
| j70.js:428 go | `actOdds(S,v,"accuse")` | ACT[k].f inside runAct (actCtx) | none |
| j70.js:507 rvButtons | `oddsCl(o)` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:179 evidenceActs | `oddsCl(o)` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:184 busy | `"accuse"` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:185 busy | `"tocao"` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:186 busy | `"expose"` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:187 busy | `"trinhth"` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:188 busy | `"trinhhh"` | ACT[k].f inside runAct (actCtx) | none |
| j78.js:189 busy | `"uyhiep"` | ACT[k].f inside runAct (actCtx) | none |
| j8.js:475 plantpick | `oddsCl(actOdds(S,v,"plant",p.here?{pen:-BAL.actHere.plant}:null))` | ACT[k].f inside runAct (actCtx) | none |
| j83.js:175 wkgive | `oPoison(S)` | ACT.poison.f called directly by wkPoison (no runAct) | none |
| j9.js:79 act | `a.o?actOdds(S,v,key2):100` | ACT[k].f inside runAct (actCtx) | none |
| jsgame.js:242 sgJob | `v,k` | ACT[k].f inside runAct (actCtx) | none |
| jtwoway.js:102 add | `D.o?D.o(S,v):100,x` | twDo (TW two-way act, no runAct) | none |
| jwhy.js:102 whyOfBtn | `actOdds(S,v,k)}}` | ACT[k].f inside runAct (actCtx) | none |

shown-odds places: 482 — ACT-ONE 19, INLINE 221, NOCTX 4, OPT-ONE 1, OTHER 237; act odds helpers 21
PASS: every act / option odds shown through the one function of its roll


## Test (dev/test/shown-odds.test.js)
For EVERY ACT with o+f, 3 cases (lá số Thượng thượng on the act's domain + spy knowledge; lá số Hạ hạ + spy; near-cap stats):
shown = number of j15/j6/jsgame display paths + the WORD read from the real j15 rvGroups / j6 rvButtons HTML; rolled = the
act's own success roll inside runAct (side rolls forced "no"; state restored; seeded). Live main **5/90 FAIL** (exit 1);
branch **93/93 PASS**. Sure acts (o ≥ 100: nuoc tea ink tat phatquy) and gift (no odds) are listed, not compared;
vp / xx: no roll reached in the test state (need a dress cause) — open.

## Gates
- dev/test/shown-odds.test.js: branch 93/93 PASS; live main 5/90 FAIL (exit 1) — proven fails once.
- dev/tools/shown-odds-scan.py: branch PASS; live FAIL 16.
- odds-cap.js PASS · one-core-guard PASS (inline 4211 ≤ baseline 4212, 0 fails).
- quickcheck --runs 6 PASS (core gates PASS; old save ok; perf median new/live render 254/225, tab 456/527, buổi 1300/1000 ms, noisy, not the perf gate).
- coop-e2e 63/63 PASS.
- Shots LOOKED (scratch only, not in git): Fold 755x1000@2 + iPad 1180x820@2. Phi tần person card with act odds (Chắc / Liều),
  the "Tung tin đồn" card + "Vì sao Chắc?" popup (lists the sent-servant and Quẻ tuần factors). Person card word = card word.
  Already on live (my change does not touch it): in the jsgame card the "Đang thỉnh tranh…" line overlaps the KÈM label (Fold + iPad).

**SẴN SÀNG KIỂM 670aa44c3ae4b9d1bfab8576afe1bc94d2ff7b94** — branch review/shown-odds-one-path (2 commits on f60b4024: code+tests, site build).
Touched: dev/build/j1.js j2.js j6.js j8.js j9.js j10.js j15.js j19.js j70.js j78.js jbal2.js jmood.js jsgame.js jwhy.js; dev/test/shown-odds.test.js (new); dev/tools/shown-odds-scan.py (new); index.html, sw.js (build).

## Freeze
Touched: dev/build j1 j2 j6 j8 j9 j10 j15 j19 j70 j78 jbal2 jmood jsgame jwhy (+ site build). **No** jag*/j95*/jtoil*/jbal.js/jcoop*/save
logic → no C-AG LIVE wait needed. Note for npc-chain-land (jfeel FEEL.cur): wrap actOdds (one hook) instead of every ACT[k].o.

## Open (not fixed here)
- "Vì sao" factor list does not name spyKnowB (habits learned) — the word is right, the factor line is missing (wording job).
- vp / xx not reached by the test (dress-cause setup).
- 237 OTHER places: no ACTX on either side by construction; not proven shown == rolled one by one.


## ROUND 2 — spend-before-roll (D #2 worker session_01964izERxj8PUG495V4QTjS, opus; START_CTX ~4 % of 1M (get_session reads 0; own estimate))
PRIORITY #1 CHECK ('spend before roll / fzRun / frozen odds / shown==rolled across spend'): OD 0 | ledger 0 | claims 1 (this job, D #2 brief D2-shown-odds-r2.md) | main: round 1 a2ce736a j9 actCtx/actOdds (reused), dev/tools/shown-odds-scan.py + dev/test/shown-odds.test.js (extended) | review/* 1: review/npc-chain-land dev/test/feel-shown.test.js (C-AG; its case 2 = the shown 64 / rolled 74 report; ported as row steal-tonight) | archive 0.

Branch **review/shown-odds-r2** from live main a2ce736a. Order: FOREMAN_D_STATUS 18/11 15:30Z (ROOT-52).

### The fault (whole group)
A do-path pays the khắc first (spend) and only THEN rolls, re-reading the odds after the spend. What runs inside spend can move them:
j95 roster resync (who is where -> sent-servant pen), jwxk weather (kmEmpO storm, look acts), jmen / j76 carry, and on C-AG's branch
the agent / feeling events (khắc 32→34, Đức 60→56). Probe on live: in a quiet state 740 sampled act/khắc pairs did not move, so the
test makes the spend move the world (as an event does) — then live fails on almost every act.

### Fix — ONE way (j9, BAL only, no typed number)
- `fzRun(o,k,fn)`: the do-path reads the odds she saw BEFORE the spend and runs the act inside it (effects still after the spend, as today).
- `aRoll(o,a)`: an act's OWN success roll. Inside fzRun (or runAct(S,…) that took them into ACTX.fz) it rolls the frozen odds;
  everywhere else it is roll(o) — NPC rolls and every path without fzRun unchanged. Side rolls (caught, refuse, confess, belief,
  punish, news…) stay roll(). All own rolls of one act use the same frozen odds (batnat rolls twice on one o).
- runAct(S,t,k): takes fzRun's odds into ACTX.fz when the key matches. Names/signatures actOdds / optOdds / jointO / runAct unchanged (C-AG npc-chain-land).
- Own rolls -> aRoll (every ACT with odds, incl. later redefinitions): j8 spy*·ally·rumor·frame·poison·accuse·bribe·block·ksab·kpoison·pond·kframe·takeaway·
  plantItem·stealNight (steal/road), j9 pushPond·trip·overhear, j30 lygian·slowpoison·tocao·expose·xinhh, j70 huydung, j78 trinhth·trinhhh·uyhiep,
  j92 wdAccuse (vp)·wdFrame (giahoa), jdress xxAccuse, jecon spyk·bribel·blockf, jlost loSteal (laydo/laydol), jpet thaopet, jpetcare petsteal,
  jpoison pgGive, jrash rash, jtsb thathu·phonghoa·tsbBulNpc (batnat/uyhiep), jwhy spy (the live ACT.spy.f)·spyMaidRun, j29 bribeServ,
  j10 facInvite·jointScheme, j55 tdAsk·tdGift·tdProbe·tdLeak, j83 wkSell, jaudit dbDo, jveil vlAsk.

### Do-paths — before / after (dev/tools/shown-odds-scan.py SPEND-THEN-ROLL + the dynamic test)
| do-path (spend then roll) | odds she saw | live a2ce736a | branch |
|---|---|---|---|
| j8 doAct (person menu j15/j6, jsgame "act", j70 Ra tay ngay) | actOdds | re-read after spend (runAct) | fzRun(actOdds before spend) |
| j8 PEND.plantpick (sai người / tại chỗ; j25 pays on pick) | dialog word | re-read after spend | the dialog's own value (fz) |
| j2 talk place acts (placeHarms: runAct, pushPond, trip, overhear) | a.o on the card | re-read after spend | fzRun(a.o) |
| jsgame sgpick "Giao cho người làm" / "Tự ra tay" (pay = spend) | J.p0 | re-read after pay | p0 read before pay; game result + roll use it (+ step) |
| jwhy spyPick (sai cung nữ dò la) | spyRoll | re-read after pay | fzRun(spyRoll) |
| jpoison pgpick (quà có độc) | X.o | re-read | fzRun(X.o) |
| j10 hỏi (servant) · hỏi (court) · mời vào phe · hợp mưu · mua | nv askTalk · rbCourtAct · inviteOdds · jointO · sgServOdds | after spend (court: after its own +me too) | read before spend |
| j55 nhờ cha dâng sớ · biếu quà · dò la / tung chứng cứ nhà ngoại | askO · giftO · probeO / leakO | after | fzRun |
| j83 bán đồ · jaudit / jpromsv đề bạt · jveil xin ban mạng | wkSellO · dbOdds · G.o | after | fzRun |
| j21 scout · j25 thỉnh an · j42 trò chuyện / vu · j72 · j77 nhờ dẫn vào · jgift kmEmpAct · jlost đòi lại · jrcp dò khẩu vị | inline formula | after | read before spend |
| j8 empAct | judge rolls BEFORE its spend; cutpay/conf/reward/pardon no roll | ok | unchanged |

Scan: live **FAIL 16** (AFTER 16, FROZEN 4, SIDE 36 of 56 paths) -> branch **PASS** (FROZEN 28, SIDE 28). SIDE = only side chances after the
spend whose odds are never printed as a ladder word (punish risk, roll(60), the odds-cap soft fail roll(BAL.odds.hi), giveTo's oSee …; two by
name in SIDE_EXPR with the reason). Closure paths (talk a.run, jsgame J.run) are not statically resolvable — covered by the dynamic test.

### Test — dev/test/shown-odds-spend.test.js (new; seeded roster incl. crypto; `node … [index] [seed]`)
The spend itself moves the world (outermost spend wrapper: her Tâm cơ / Sủng / Danh / Đức / Sắc ±30, she moves in/out of the target's place,
weather flips), then the REAL do-path runs; the act's own roll (side rolls forced no) must equal the odds shown before the click.
Rows: every ACT with odds via doAct (2 cases: lá số +10 & spy knowledge / lá số −10 near cap), plant sent + tại chỗ (dialog word too),
steal-tonight (= the C-AG case: her Tranh sủng on a night she is not called), jsgame "Giao cho người làm" × 5 place acts, spyPick, scout, kmEmpAct.
- branch: **75/75 PASS** seed 1 (seeds 1–12: 69–77 rows each, all PASS, 0 page errors)
- live a2ce736a: **FAIL (exit 1)** seed 1: **4/75** (71 FAIL) — e.g. steal-tonight shown 64 / rolled 48 (the C-AG family), spy 46/60, frame 40/54, plant (sent) 40/50, spyPick 63/57, kmEmp 50/20 (weather), scout 56/53.
- dev/test/shown-odds.test.js (round 1, runAct direct): branch **96/96** on the final build (99/99 on the first commit; its roster is not crypto-seeded, so the case count drifts — no FAIL either way).
- Not reached (no target in the test state, analytic + scan only): musk/catswap/petcare (no odds), kframe, steal/road by menu (steal-tonight covers), pushp/trip (together), xinhh, tat (sure), blockf, thaopet, petsteal, pgift, phonghoa (some seeds).

### Gates (final sha b39e66781b63c03d3165f383a5bcc8eee838d5ad)
- shown-odds-spend 75/75 (seeds 1, 3; 1–12 on the first commit) · live FAIL exit 1 (4/75)
- shown-odds (round 1) 96/96 · shown-odds-scan PASS (both sections; live FAIL 16 spend paths) · odds-cap PASS · one-core-guard PASS (inline 4211 ≤ 4212, 0 fails)
- quickcheck --runs 6 **PASS** (core gates PASS, old save ok; render 185/160, tab 314/335, buổi 823/903 ms new/live)
- coop-e2e **63/63 PASS** (on e4ffb745; the last commit only changes where doAct takes its frozen odds from inside the card game)
- No Fold / iPad shots: no text or layout change (same words; the values are now the shown ones).

**SẴN SÀNG KIỂM b39e66781b63c03d3165f383a5bcc8eee838d5ad** — branch review/shown-odds-r2 (2 commits on live a2ce736a).

### Freeze
Touched: dev/build j2 j8 j9 j10 j21 j25 j29 j30 j42 j55 j70 j72 j77 j78 j83 j92 jaudit jdress jecon jgift jlost jpet jpetcare jpoison jpromsv jrash jrcp jsgame jtsb jveil jwhy; dev/test/shown-odds-spend.test.js (new), dev/test/shown-odds.test.js, dev/tools/shown-odds-scan.py; index.html, sw.js.
**None** of jag*/j95*/jtoil*/jbal.js/jcoop*/save logic -> no C-AG LIVE wait. (j95 roster resync is one of the things that moves odds in the spend; it is not touched — the roll no longer reads after it.)
Note C-AG npc-chain-land: its jfeel hook wraps actOdds once (round-1 advice) — the frozen odds come from actOdds, so feeling points are in shown and rolled alike; its feel-shown case 2 (doAct steal) should now hold across the spend. Merge conflicts expected only where it edits the same j2/j10/j19 lines (j10 jointScheme/facInvite own roll lines, j2 talk run line).

### Open (not fixed here)
- Co-op invitations (jcoopworld invMe / invHer: the friend answers later, then runAct) — jcoop* frozen; no spend between card and roll in that code, but the world moves while waiting: for C-AG / co-op owner.
- j70 "Bày mưu" plots: pay now, roll weeks later by design (the card says "lúc ra tay: …"); not a spend-then-roll.
- No text/layout change (same words, values now the shown ones) -> no Fold / iPad shots taken.
