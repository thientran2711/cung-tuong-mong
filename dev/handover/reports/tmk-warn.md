# TMK-WARN — bribe / spy-for-hire: the Mua chuộc charge made visible and answerable (F seat s21e)

PRIORITY #1 CHECK: claims tai-mat-know → TMK-WARN | review/tai-mat-know (in 3b), review/tmk-oanpace-fix b96bb0d5 (base) | main jcharge.js:123-136 (chMcFire/chSrvEnd), j42 cnvSpyX :377 | git grep origin/review/* «mcw / tmk-warn»: none.
KIT CHECK: reuses the kit option cards (PEND / pushDil → kit hand), kit odds words word() / KIT_ODDS, servant panel row(); no new UI part.
START_CTX 4 % (1M window); rolled at ~28 % (START + 25 %), see Handover.

Branch `review/tmk-warn` (base review/tmk-oanpace-fix b96bb0d5 — LC33 asked for the 3b sha, no answer before roll).

## What changed (jcharge rule untouched, law 16)
- NEW `dev/build/jmcwarn.js` (assemble.py right after jcharge.js), BAL `BAL.mcw` (jbal2.js beside coopBribe).
- (a) take cards: `cnvSpyX(m,noPay,v)` (overridden in jmcwarn) prints BOTH dangers in the option's «mất:» part: the master's watch (srvWatch,
  as before) and the jcharge road `mcwTakeX`: «nếu {v} bị tố tội mua chuộc người hầu (cần {chNeed} chứng; mỗi lần {master} dò, tìm ra một chứng:
  {word(chFind)}) thì ngươi bị đuổi khỏi cung; có người nắm chứng thì ngươi nghe phong thanh trước». Callers now pass the buyer:
  j42 cnvBribeOpts take, j42 cnvBlackOpts obey («mất: » instead of «kèm: »), jcoopworld P2H.bribe + PEND.thBribe (friend name).
  Buy cards (her as buyer): `mcwBuyX` on j7 volunteer (both options), jtsb defect, j24 svDefect, j15 «Mua chuộc» button.
- (b) warning beat: evA hook (a new piece of the mc charge on her buyer, CHLASTC) + j42 monthly servant tick (`mcwMonth`, old saves / co-op)
  → log line + card «Gió lọt» once per new piece: «Cứ làm tai mắt» · «Lặng lẽ thôi làm tai mắt · nhẹ» (loses monthly bạc, buyer resents,
  BAL.coopBribe.grudge) · «Trả lại bạc, xin thôi · vừa» (Bạc −BAL.coopBribe.pay, back to the buyer, no grudge) · «Bẩm chủ, khai kẻ mua chuộc ·
  nặng» (odds BAL.mcw.conf base + (Chủ tin − tinMid)/tinD, shown = rolled; holds: Chủ tin +, master gets ev mc pieces + spyLearn; fails: Tân Giả
  khố lauWk). Cutting ties = S.srv.spyFor null → chSrvMe false → the proven charge spares her. Servant panel row «Tai mắt cho» adds
  «có người nắm n/need chứng tội mua chuộc của người này» (discoverable at any time).
- (c) law 1: NPC servants with spyFor = the buyer cut ties at BAL.mcw.npcCut on the same news; if the buyer is HER she is told; her Tai mắt
  (≥ BAL.charge.warnMat, or her spy in the holder's palace) report the pieces held on her.

## Scan (law 11) — `node dev/test/tmk-warn-scan.js [buildDir]`
| | before (b96bb0d5) | after |
|---|---|---|
| TAKE sites (S.srv.spyFor): j42:381, j42:418, jcoopworld:1255, :1519 | 4 GAP (no jcharge road) | 4 ok |
| BUY cards: j15:83, j24:34, j7:50, j7:51, jtsb:243 | 5 GAP | 5 ok |
| NPC roads (j10 ×4, j24:84, j29:27, j42 ×2, j70:146, jagknow ×3, jky:221) | 13 GAP (no warning) | 13 ok (mcwNpc) |
| BEAT: evA hook · monthly tick · tier card · two-way | 4 GAP | 4 ok |
| **total** | **26 gaps** | **0** |

## Tests
- `node dev/test/tmk-warn.test.js dev/index.html` 16/16 PASS; MUTATE=nowarn 7/11 FAIL · notext 14/16 FAIL · nocut 15/16 FAIL (exit 1 each).
- one-core-guard PASS · tai-mat-know-scan 0 · npc-purpose-scan PASS · tai-mat-know.test 21/21 · ag-taimat2 16/16 · ag-sell 19/19 · ag-betray 20/20 · charge-followups ALL PASS.
- NOT run yet: quickcheck / kit-std-scan / coop-e2e / 90-button crawl.

## Stills (looked at myself; scratchpad, not in git) — Fold 755x1000 + iPad 1180x820, no overflow, 0 page errors
- «Gió lọt» card: body + 4 kit cards (vừa greyed when Bạc < pay), nặng detail shows odds word + Được/Hỏng — OK.
- OPEN DEFECT: the TAKE card «Nhận bạc, làm tai mắt» on the kit hand panel shows only «ĐƯỢC Bạc ++ · mỗi tháng Bạc +» and «GHI CHÚ có người nắm
  chứng …». The model is right (kaModelStr → kaRows gives 5 «mat» rows: watch odds, kill odds, Tân Giả khố, the jcharge road) but the hand panel
  drops them — the same was true BEFORE for the srvWatch «kèm» (so the owner never saw any danger on that card: the real root of s21e).
  Suspect: the hand panel (jopic ~300-323 kitOptFinal rows / keep set, or the odds-word strip of segments holding «khả năng …» / a law-7 word)
  folds or strips Mất rows on a no-roll card. This is a KIT part → law 9: KIT REQUEST to the kit keeper, not a per-card fix.

## Handover 27/11 ~23:05Z (worker rolled at START_CTX 4 % + 25 %; MAIN 181 opens the successor)
- Done + pushed: everything above on review/tmk-warn.
- OPEN 1 (blocking RV READY): the kit hand panel hides the take card's Mất rows (see Stills). Find why (dump: `kaModelStr(O[0].x)` / `kaRows`
  is fine → look at jopic kitOptFinal row keep/fold and the odds-strip); raise KIT REQUEST (dev/kit/KIT_REQUESTS.md) or, if the kit keeper rules
  it, fix in the kit part for every card; then re-shoot Fold + iPad take card and confirm the Mất row is readable.
- OPEN 2: quickcheck + kit-std-scan (`REPORT_ONLY=1 node dev/test/kit-std-scan.js dev/index.html <out>`) + coop-e2e, then rebase on the 3b
  restack sha from LC33 (session_01Rc5AsNBC5amrkZhbDeusae) if it differs, then RV READY (BIG) → RV-163L session_01Rc5AsL7cUEBT1XLPxhuwSm + MAIN 181.
- Stills script: rebuild with `bash dev/site/build_site.sh`, then a playwright page on index.html: start() until isSrv(), pushModal({opts:cnvPend(S,
  cnvBribeOpts(S,v,m,BAL.coopBribe.pay))}) (PEND.cnvBribe returns null under the AG loop), click the option, screenshot.
- LC33 reply (arrived after the roll): there is no 3b restack yet. The current 3b is review/lc31-b3b 07f7cd16; it sits on OLD LIVE, with
  tmk-oanpace-fix-rv 4206db2c and punish-stack on top. Queue: lc32-ui3 → e-gain3 → 3a → 3b restack. This work touches b3b code (jagknow /
  tai-mat-know lineage), so per LC33 the base should be review/lc31-b3b 07f7cd16, with one re-merge expected when 3b lands. MAIN 181 decides.

## TMK-WARN-2 (session_01Rc5AsKKRbFjb8jq7W9R9UA, MAIN 182) — 27/11 ~23:00Z on, START_CTX ~6 % (own estimate; used_tokens read 0) → roll at ~31 %
- ROOT of OPEN 1 (kit, law 9 → KK63 session_01Rc5AsJdLpzqwAuGx1Gycwg, told 23:15Z; KK62 archived): the hand plate `.khplate` (and the «!»
  overlay #kpinfo) shows a CLONE `button.opt.ka.kopinfo` with `disabled`; j63.js:239 `button.ka:disabled .kr-mat/.kr-kem/.kr-bai{display:none}`
  hides Mất / Kèm / Bại → only ĐƯỢC + GHI CHÚ. Same root as KIT_REQUESTS «E75 option «!» overlay hides Kèm / Bại / Mất» (24/11, still OPEN).
  Proven: injecting `display:revert` for those rows brings MẤT back (Fold + iPad) but breaks the row grid (iPad: one word per line) → the kit
  keeper fixes it for the whole family (normal .kr display, or an inert clone without `disabled`).
- My side (cfe1df9d): the jcharge clause was going to **Kèm** (folded) even on the small card: kitParse → kaRows puts a loss with no number and
  no «khả năng …» clause in Kèm. mcwTakeX now reads «bị đuổi khỏi cung khi {v} bị nắm đủ {need} chứng tội mua chuộc người hầu (mỗi lần {m} dò,
  ra một chứng: {chanceW(find odds)})», joined to the watch clause with «, » → stays in the Mất row (the «có người nắm chứng …» line = Ghi chú).
  «Gió lọt» «Cứ làm tai mắt» uses the same text under «mất:» (was «kèm:»). Test adds «the charge stands in the kit Mất row, not Kèm»:
  tmk-warn.test 17/17 PASS; MUTATE nowarn / notext / nocut exit 1; tmk-warn-scan 0 gaps / 26 sites.
- Stills (scratchpad): small take card Mất row = watch odds + kill odds + Tân Giả khố + the charge; hand plate still ĐƯỢC + GHI CHÚ until KK63.
- 23:40Z KK63 fixed it in the kit: review/kk63 eb303595 (K-HAND-MAT, KIT §6.2o; kitOptCopy one copy builder; hide rules skip .kopinfo
  unless locked). Verified locally (cherry-pick in a throw-away worktree, not pushed): kit-hand-mat-scan fold lost «!» 0 / lost plate 0,
  s21e card plate 2 rows; kit-hand-rows stills Fold + iPad: plate = ĐƯỢC · MẤT (4 dangers incl. the charge + odds word) · GHI CHÚ. My branch
  gets the fix through the land stack (kk63 must land before/with tmk-warn).
- MAIN 182 asked to move every chanceW «khả năng …» to the law-7 ladder → PUSHBACK ACCEPTED (VANPHONG.md l.66–67: ladder = the option's own
  roll only; side chances in Được/Mất/Kèm = «khả năng rất thấp … rất cao»). Branch follows it (jmcwarn comment fixed, 9598228e).
- GATES on a4e79f76 (base for comparison = b96bb0d5, same box):
  | gate | branch | base |
  |---|---|---|
  | coop-e2e | 138/143 — week 3 stalls both seats, then 3 follow-on fails | hangs at week 3 (72 ok, killed at 1700 s) — same coop week-stall family, pre-existing |
  | kit-std-scan (original, route.fulfill) | page CLOSES at tab «act» every run | runs, FAIL 28 |
  | kit-std-scan (local copy, file://, SUBS=0) | FAIL 28 (X02 20 · X06 4 · X08 4), 0 page errors | FAIL 28, identical list (diff empty) |
  | kit-hand-mat-scan (with kk63 eb303595) | fold + ipadAir: lost plate 0, lost «!» 0 | — |
- HARNESS FINDING (not game): kit-std-scan serves the page with ctx.route → route.fulfill(body = whole html); past ~20.65 MB the page target
  closes (no crash event, no navigation, no window.close) on the first tab click. Proof: replacing jmcwarn.js by a same-size COMMENT file
  closes it too; removing the file passes. LIVE 20.59 MB / base 20.64 MB under, this branch 20.65 MB over → every branch hits it as the page
  grows. Fix: the scan opens file://SRC (local copy /tmp only; owner of kit-std-scan to change it).
- QUICKCHECK a4e79f76 vs LIVE 5fb13d60 (1689 s): robot part PASS — open 2128 ms, old save ok, perf median new/live render 277/330, tab
  438/620, buổi 1431/1771 ms, tasks>200 27/36. CORE GATES FAIL, all three not from this branch:
  · G2 rules-one-source «old save NO SAVE»: the LIVE 5fb13d60 save does not load in the older 3b-line code — base b96bb0d5 gives the SAME
    «NO SAVE» (run by hand, same script); clears on the re-merge onto the 3b restack (on LIVE).
  · G4 96-kit-std-scan: the route.fulfill big-page close (above); KK63 HARNESS-BIGPAGE 29cbe6a4 fixes the harness; file:// run = base.
  · G4 96-noise-hygiene: TEXT-HYGIENE static «new 7» leaks all in jkitpage.js / jmapz.js / jnotice.js (not touched here); NOISE-DAY advisory.
- RE-RUN after the 3b re-merge: quickcheck (with kk63 harness), coop-e2e, tmk-warn.test, tmk-warn-scan, kit-hand-mat-scan fold+ipadAir.

## HANDOVER TMK-WARN-2 → successor (28/11 ~06:50Z; rolled by context 40 % real ≥ START ~6 % + 25 %; MAIN 186 opens the successor)
- STATE: review/tmk-warn **b6d6fa4c** = my commits REPLAYED onto the restacked 3b **review/lc34-3b-r1 fcbc1992** (on LIVE 5ad52416; sha from
  LR-RULES session_01Rc5AsLZqoDGFA7Am7fEtqW). Old history kept at review/tmk-warn-pre3b a1ed2ebd. Replay conflicts resolved by taking the 3b
  side and re-applying the tmk-warn insertions (assemble.py jmcwarn after jcharge; j15 «Mua chuộc» mcwBuyX; j24 svDefect x; j42 take
  cnvSpyX(m,0,v) / obey «mất: …,v» / mcwMonth in the servant tick / «Tai mắt cho» held-pieces row; jtsb leak line + mcwBuyX). 3b's svTouch
  (servant-trust) lines kept.
- DONE on b6d6fa4c: tmk-warn.test 17/17, MUTATE nowarn/notext/nocut exit 1, tmk-warn-scan 0 gaps / 26 sites, tai-mat-know.test 22/22.
  The base now carries kk63 (kitOptCopy hand-plate fix) and dev/test/lib/bigpage.js (kit-std-scan big-page fix).
- TODO (successor), in order:
  1. `bash dev/tools/quickcheck.sh` on b6d6fa4c (G2 old-save should now PASS — branch is on LIVE; kit-std-scan gate should run with bigpage).
     Compare any core-gate FAIL with the same gate on fcbc1992 (base) before calling it ours.
  2. `node dev/test/coop-e2e.js <out>` — earlier 138/143 = pre-existing week-3 stall (base hung at the same week).
  3. `node dev/test/kit-hand-mat-scan.js . fold` and `… ipadAir` (lost plate 0 expected) + re-shoot the take card plate with
     `node dev/test/kit-hand-rows.js index.html <out>` and LOOK at both stills (Fold 755x1000, iPad 1180x820): plate = ĐƯỢC · MẤT (watch odds,
     kill odds, Tân Giả khố, «bị đuổi khỏi cung khi … (mỗi lần … dò, ra một chứng: khả năng …)») · GHI CHÚ.
  4. RV READY (BIG) → RV-163L session_01Rc5AsL7cUEBT1XLPxhuwSm + MAIN 186 session_01Rc5AsNNdRG9GqK1FC4jasv, citing this report.
- Rulings on record: chanceW «khả năng …» for side chances is canon (VANPHONG l.66–67; MAIN 182 accepted the pushback). Kit keeper = KK64
  session_01Rc5AsHuEnQAr94sJGRFNST (noise-hygiene 7 leaks + kit-std-scan harness → KK64).
- Takeover prompt for the successor MUST copy the three ROLLOVER lines verbatim (owner OD:L1217).

## TMK-WARN-3 (28/11; START_CTX ~3 % of 1M, own estimate, used_tokens reads 0 → roll at ~28 %, ceiling 60 %)
PRIORITY #1 CHECK: MAIN_STATUS (handover c6757678) → main = MAIN 188 session_01Rc5AsJc8Qb9ZD8pVR8Zpif; BIG reviewer for TMK-WARN-3 = RV-183
session_01Rc5AsM1Hk8LRsZMSan7dSs (RV-181 retired 07:18Z); 3b dependents routed to review/lc34-3b-r2-rv184 1a6a1aed (MAIN 188 07:46Z); LIVE = 22afefb4.
git grep kitOptCopy / kr-mat2 on origin/main + review/kk64…kk69-*: the hand-plate double-Mất (below) is fixed nowhere.
KIT CHECK: reuses the kit option cards (PEND → kit hand), kit odds words, servant panel row(); no new UI part.

### Restack → **review/tmk-warn-r2 7ba5cb7d** (= 69737509 + 3b r2 1a6a1aed; review/tmk-warn 69737509 kept as is)
- Conflicts: assemble.py (module list) + built files only. assemble.py = TRUE union: 3b r2 list + jmcwarn (after jcharge) + **jkring-item.js and
  ../../rank/worker/src/score.js**, which 1a6a1aed DROPPED (both parents ce77c7cc / a96564ad and LIVE list them; the 1a6a1aed index.html has no
  kriCalm / kriE / phamName). Reported to MAIN 188 + RV-184. index.html + sw.js rebuilt, assets.json = LIVE.
- On 7ba5cb7d: tmk-warn.test 17/17 · MUTATE nowarn / notext / nocut exit 1 · tmk-warn-scan 0 gaps / 26 sites · tai-mat-know.test 22/22.

### Gates
| gate | 69737509 (on 3b fcbc1992) | base fcbc1992 | verdict |
|---|---|---|---|
| quickcheck build = own build | BUILT-SAME | – | ok |
| G1 one-core-bind | FAIL jsvt.js:91 BAL.eff.jstaff.meAct | same FAIL | base (3b); RV-184 ce77c7cc elderTalkAmt targets it |
| G1 guard / text / textrule / khắc | PASS | PASS | ok |
| G2 rules-one-source + OLD SAVE (live 5ad52416) | PASS, old save ok | PASS | ok (the TMK-WARN-2 G2 FAIL is gone) |
| G3 kit-conform | as base | as base | ok |
| G4 hooks (webkit, odds-cap, coop-one-world, dialog-fixed, dead-card, button-crawl, kit-std-scan 6 vs baseline 28, noise 9/9 …) | all PASS except Q-SOFTLOCK | – | ok |
| G4 Q-SOFTLOCK | FAIL 4/5 in 3/3 runs (iPad/Fold «person» tap covered by div.kring-band) | PASS 2/3, FAIL(4) 1/3, same kring-band cover | pre-existing flake (kring band over the person button), not ours: tmk-warn touches no kring / view code |
| time-spill guard | PASS | – | ok |
| quickcheck browser (open · old save · perf vs live) | PASS · open 1715 ms · old save ok · render 228/237, tab 439/424, buổi 1011/1442, tasks>200 22/20 | – | ok |
| coop-e2e | 51 ok, stall week 2 «Chờ hảo hữu…» (buổi 1:3), timeout | 48 ok, stall week 1 same shape + world drift | pre-existing co-op stall; branch no worse |
| kit-hand-mat-scan fold / ipadAir | lost plate 0, lost «!» 0 (149 / 146 cards) | – | ok |
| **r2 7ba5cb7d full quickcheck vs LIVE 22afefb4** | **QUICKCHECK PASS** · core gates PASS (G1 bind PASS, Q-SOFTLOCK PASS, kit-std 6/28, anchor 0 bad) · open 2124 ms · old save ok · perf new/live render 281/219, tab 511/430, buổi 1953/1748, tasks>200 34/24 (inside the gate; the rise comes with the 3b r2 + lr-rules base, tmk-warn adds one module) · 2117 s | – | READY |

### Stills (LOOKED, Fold 755x1000 + iPad 1180x820, kit-hand-rows): ONE DEFECT → KIT REQUEST K-HAND-DUPMAT
The bribe take card plate «Nhận bạc, làm tai mắt» reads Tốn không · Được Bạc ++ · mỗi tháng Bạc + · Mất (watch odds, kill odds, Tân Giả khố
10 tuần, «bị đuổi khỏi cung khi … bị nắm đủ 3 chứng tội mua chuộc người hầu (mỗi lần … dò, ra một chứng: khả năng cao)») · Ghi chú «có người
nắm chứng thì ta nghe phong thanh trước» — all right, BUT the whole **Mất block shows TWICE** (both devices).
Root (kit, law 9 → not patched here): jopic kitOptCopy(b, face=1) keeps every `.kdup` row for the hand plate, and the face's folded
`kr-mat2 kdup` row is a whole copy of the source `kr-mat` row, which the plate also shows (kofold removed). Family scan (doubled visible row
text in any hand plate, every PEND dialog, consort + servant passes): base fcbc1992 **0**, branch **1** (cnvBribeOpts take) — no base hand card
has a Mất row; tmk-warn's take card is the first (the watch line moved from «kèm:» to «mất:», TMK-WARN-2). Any future sure card with a Mất
(or sure-Bại) row in a hand will double the same way. Filed in dev/kit/KIT_REQUESTS.md (K-HAND-DUPMAT) for the kit keeper.

### r3 → **review/tmk-warn-r3** (MAIN 189 order 09:05Z: 1a6a1aed VOID; restack onto rules tip review/rules-prefail-r3-rv184 c76b6499 on LIVE a96564ad + MODGATE)
- dad2189a = merge c76b6499 into tmk-warn-r2 83485abe (2 parents). Conflicts: assemble.py (= rules tip list + jmcwarn after jcharge), j42
  cnvBlackOpts (rules tip version without «Đút bạc bịt miệng», split-merge A4, + the tmk-warn obey line «mất: cnvSpyX(m,1,v)»), built files rebuilt.
  **MODGATE 514 ⊇ LIVE 508, 0 missing** · 0 LIVE deletions · every merge 2 parents · assets.json = LIVE.
- bc245222 = the tai-mat-know cap flake (MAIN 188 order 07:48Z, left open by TMK-WARN-2), see below.
- On bc245222: tmk-warn.test 17/17 · MUTATE nowarn / notext / nocut exit 1 · tmk-warn-scan 0 gaps / 26 sites · tai-mat-know 24/24 in 12/12 runs.
- quickcheck vs LIVE a96564ad: **all core gates PASS except G1 one-core-text-rule**: DIFF jph.js:173 (title)=72 and jkpick.js:141 (title)=8. The
  SAME 2 DIFFs on base c76b6499 (`OC_BUILD=<c76 dev/build> node dev/test/one-core-text-rule.js`); LIVE a96564ad PASS → it comes from the rules
  tip, not from tmk-warn (we touch neither file). Browser part: open 1734 ms · old save ok · time-spill PASS. kit-std-scan 7 (baseline 28), none on
  a tmk-warn card. Q-SOFTLOCK PASS.

### tai-mat-know cap flake — decided canon side: the RULES are right, the TEST harness was wrong (test-only fix, bc245222)
- Canon chain for one spy learning (jagknow spyLearn, its own cause in opOwn): nết multiplies first (j28 oanAdd wrapper, persF «slight» 0.49–2.1)
  → oanPace caps the day per holder (joanpace opStep, BAL.oanPace.day 16) → stat-pace bands the rise, slows it as the oán climbs and stops it at
  the rank top (jstatpace spG / spTop — ONE cap per stat, MAIN 163); a fall of liking below 0 is paced too (SP_SIGN). Probe over 80 rivals ×
  8 games: no rival ever lands above BAL.oanPace.day (the old «nết ×2.1 → 16.8 > 16» cannot happen on this base: 16.8 is banded to 10).
- The test measured L[1], a RANDOM rival with old oán / old dislike / any nết, against fixed numbers → it failed ~1 run in 6 in three shapes:
  oán +6 not +8 (old oán slows the rise), aff −1 not −tm.oan (old dislike paces the fall), or the 2nd learning 0 (a ×2.1 holder hits the rank top
  with the first). Fix: TK.fresh(w) before the measured step (oán 0, liking 0, no opz / opa / spc); the own-cause check accepts «the first learning
  reached spTop» (read from the game, nothing typed). The check still bites: a folded own cause lands 0 far below the top (run sample end 16, top 80).

## TMK-WARN-4 (28/11; depth 3; worker for MAIN 189; START_CTX ~2 % of 1M, own estimate → roll at ~27 %, ceiling 60 %)
Order: RV-186 PASS withdrawn (X01 kit-std-scan via the jcover wit door). Base review/tmk-warn-r3 009a472e → **review/tmk-warn-r4**.
LIVE moved during the session: origin/main = **8a30664e** (RV-163M dayq-noturn r3, ON aecbc267) → r4 is merged onto 8a30664e (aecbc267 inside).

### Commits
- 60cd8f8e merge LIVE 8a30664e into r3 009a472e (conflicts: index.html + sw.js only → rebuilt; assets.json = LIVE).
- 6e7f09e9 + 1f29f025 the fix (dev/build/jcover.js covWitOpts only).
- ada6bac0 merge review/kk71-handdupmat-r2 **7e0cc8ed** (K-HAND-DUPMAT, landing condition; built files only conflicted → rebuilt).

### X01 cause + fix (law 11, whole wit group, no number changed)
The plain x «<result> · Đức −−» became `thành: <result>, Đức −−` in j25 optLine → a red loss in the green Thành row. ALL THREE tiers had it
(probe on r3+LIVE: nhẹ «Đức −−», vừa «Bạc −−» + «Đức −−», nặng «Đức −−−» in Thành). The scan only reached nặng (her maid as witness).
Now every tier writes a LABELLED x (j25 passes a labelled x whole):
- nhẹ / nặng: the deed's Đức is taken on success AND failure (jcover deed hook on deedAdd, which runs before the roll's branch) → ONE `kèm:` at the
  end of x (the ACT-MOVE-6 either-way idiom of o.kem; kept inside x because the folded door row carries only x — o.kem vanished there; written once
  because the kit drops a repeated chip and a doubled kèm left an EMPTY Kèm row — seen in my first Fold still, fixed).
- vừa: bạc (o.w, applied on success) + Đức (deedAdd only on success) → Kèm under Thành; Bại «X từ chối, ta không mất bạc».
- side gain: nặng's Bại now names its real loss «Danh −−−, X biết kẻ chủ mưu» (before: «có hậu quả · xem kết quả» or an empty «Tốn công» row).
Card now (Fold + iPad stills, LOOKED): Tốn 2 khắc · Thành «Mộc Cận không còn trên đời» (green) · Bại «Danh −−− · Mộc Cận biết kẻ chủ mưu» · Kèm «Đức −−−» · Ghi chú.
Door card hint (covHint prose) unchanged.

### Gates on r4 1f29f025 (index.html = my rebuild)
| gate | result |
|---|---|
| 96-kit-std-scan gate mode iPad SZ='[[1180,820]]' SUBS=0 | 3 (X06 ×2 «Mong manh», X08 chapter line) = **LIVE 8a30664e identical 3**; **X01 0** (r3+LIVE: 1) |
| same, Fold [[755,1000]] | 3 = LIVE 3; X01 0; page errors 0 |
| tmk-warn.test | 17/17 |
| tmk-warn-scan dev/build | 0 gaps / 26 sites |
| tai-mat-know.test | 24/24 ×4 |
| webkit-syntax | 493 modules, 0 hits |
| kit-hand-dupmat (KK71) | ALL OK (18) |
| MODGATE | 0 missing vs aecbc267 and vs LIVE 8a30664e; adds jmcwarn.js only |
| LIVE deletions | 0 · merges 2 parents |
Not run: full quickcheck (the lander's step).

### Stills LOOKED (scratch only, not committed)
- wit card «Xử nhân chứng» (nặng row) Fold 755x1000@2 + iPad 1180x820@2: as above, Thành green only.
- take card «Nhận bạc, làm tai mắt» enlarged (kitHandLift on the hand card; kit-hand-rows clicks a hidden kopt and never opens it) Fold + iPad:
  Tốn không · Được Bạc ++ · mỗi tháng Bạc + · Mất (4 lines, ONCE) · Ghi chú. The double Mất is gone with KK71.

### SEPARATE ITEM FOR MAIN (not folded — other families' files, all on LIVE 8a30664e already)
Probe of every talk option in 9 places over 4 days (witness stub on): a red loss in a rolled card's Thành row also in
«Cài người vào cung khác» (Bạc −−, jagacts2 plantSrv / j10), «Phạt vô cớ» (thiện cảm −−−, Đức −−, kẻ hầu khác thiện cảm −−; jhouse.js:46),
«Đề bạt lên …» (lót tay thì Bạc −−; jaudit.js:59), «Mua chuộc» NPC servant (Bạc −−; jagacts2 bribeSrv / j29). Same X01 class; the gate scan
does not reach them today. Owner of those files / KK to move them (Kèm/Tốn by when the loss lands).

### HANDOVER TMK-WARN-4 → TMK-WARN-5 (28/11 ~12:00Z; rolled by CONTEXT 26.4 % ≥ START ~2 % + 25 %; MAIN 189 opens the successor)
- STATE: review/tmk-warn-r4 **1042c551** (pushed; everything above). RV-189 session_01Rc5AsKweT3LtMsrkLNmDbV = **FAIL, 1 item**
  (reports/rv-189.md aecafb98 on the handover branch). Gates all PASS there (X01 0 Fold + iPad, tests green).
- FAIL ITEM: the OPENED «Xử nhân chứng» door card (3 tier plaques; PEND.door, jcover.js just after the DOOR.add line) reads each row from
  **covHint(x,id)** → o.hint (jk2b kitHint «được; nhưng …; hỏng thì …»), NOT from x. Today every tier's Đức sits in BẠI there: nhẹ/nặng Đức lands
  either way (deed hook on deedAdd, before the roll branch), vừa Đức + bạc land only on success. Same on LIVE, but it is the wit door's own card.
- TODO (in order):
  1. Rewrite covHint (no numbers changed; use the same covB() / covWitBac / covTier values as covWitOpts): either-way Đức → the Kèm part;
     vừa: Đức + Bạc (covWitBac) with the success; Bại = only what failure adds (nhẹ: X càng ghét ta; vừa: X từ chối, không mất bạc;
     nặng: Danh (covB().danh[covTier("wkill")]), X biết kẻ chủ mưu). Check how kitHint/jdoor plaques split «được; nhưng …; hỏng thì …» into rows
     (jk2b kitHint ~l.304, jdoor DOOR.rowsJ2) — the plaque rows must show Thành green only, Kèm the either-way Đức, Bại the failure.
  2. Add a test (e.g. dev/test/tmk-warn-witcard.js, or a block in tmk-warn.test.js) that opens PEND.door({k:"wit",…}) for a witness (stub
     covSaw=()=>[1] as my probes did) and reads the plaque rows of all 3 tiers: no red in Thành, Đức in Kèm (nhẹ/nặng), Bạc+Đức with success (vừa).
  3. Merge LIVE **7d7c6886** (RV-189: built files only), rebuild with `bash dev/site/build_site.sh`.
  4. Rerun: kit-std-scan gate mode Fold + iPad (`SZ='[[1180,820]]' SUBS=0 REPORT_ONLY=1`; baseline = LIVE's count), tmk-warn.test, tmk-warn-scan,
     tai-mat-know, webkit-syntax, kit-hand-dupmat, MODGATE, 0 LIVE deletions.
  5. Stills Fold 755x1000 + iPad 1180x820 of the OPENED wit door card (3 plaques), LOOK at them. RV READY <sha> → RV-189; one line → MAIN 189.
- Helper probes (scratch, gone with my container; easy to rebuild): boot like dev/test/kit-std-scan.js runner, `covSaw=()=>[1]`, click the maid
  token, buttons matching /(Đe dọa bịt miệng|Mua chuộc nhân chứng|Thủ tiêu nhân chứng)/; take card via kitHandLift on the hand button
  (kit-hand-rows.js clicks a hidden kopt and never opens it).
- Takeover prompt MUST copy the ROLLOVER lines verbatim (owner OD:L1217) and the LINEAGE line («first STATUS line states depth …»).

## TMK-WARN-5 (28/11; depth 3; worker for MAIN 189 → MAIN 190; START_CTX ~1 % of 1M → roll at ~26 %, ceiling 60 %)
PRIORITY #1 CHECK: OD RV-189 FAIL item (rv-189.md aecafb98) | main 7d7c6886 jopic kitOptFinal hint split (KK56-R10) | review/* tmk-warn-r4 1042c551 / e1f6b6f1 | claims TMK-WARN-5 (this)
Order: RV-189 FAIL — the OPENED «Xử nhân chứng» door card put the deed's Đức in Bại on all 3 tiers.

### Root (two layers)
- The door card is a hidden-outcome card (jk2b kitIsEventChoice: a PEND item → hideOut → kitHideOut keeps only Tốn + the hint), so its plaques come from
  jcover **covHint** read by jopic **kitOptFinal**: part 1 = Thành, EVERYTHING else (both «nhưng …» and «hỏng thì …») = Bại. The kit had no Kèm slot
  in that path, so covHint alone could never place an either-way loss correctly (a reroute through covHint only = Đức in Bại or red in Thành).
- covHint also typed fixed words «(chút ít)/(nhiều)», not the BAL value.

### Fix (no number changed)
- jcover covHint: same values as covWitOpts through the kit marks (markTxt of `Đức ${balSg(…)}`): nhẹ «…; hỏng thì X không sợ, càng ghét ta; nhưng Đức −−»,
  vừa «X nhận N lượng bạc, câm lặng; nhưng Bạc −−, Đức −−; hỏng thì X từ chối, ta không mất bạc», nặng «…; hỏng thì Danh −−−, X biết kẻ chủ mưu; nhưng Đức −−−».
- jopic kitOptFinal (hint branch, ROLLED card only): «nhưng …» → its own red Kèm row (`.kr-kem .kdup`, kept on the face), under Thành when written before
  «hỏng thì», under Bại when after; Bại = «hỏng thì …» only. SURE cards unchanged. **This touches a kit part (law 9)** → logged KIT_REQUESTS «K-HINT-KEM»
  (built by the worker, kit keeper to confirm) + KIT.md §6.2b ROWS updated in place. Whole group (law 11) = every rolled hint card carrying «nhưng …».
- Test dev/test/tmk-warn-witcard.js: opens the real door card (covSaw stub only) and reads the PLAQUE ROWS in the DOM for all 3 tiers.

### Card now (LOOKED, Fold 755x1000@2 + iPad 1180x820@2 — review-sheets/tmk-warn-5/wit_fold.jpg, wit_ipad.jpg)
nhẹ: Tốn 2 khắc · Sức 10 | Thành «X sợ hãi, câm lặng» | Bại «X không sợ, càng ghét ta» | Kèm «Đức −−»
vừa: Tốn 2 khắc | Thành «X nhận 15 lượng bạc, câm lặng» | Kèm «Bạc −−, Đức −−» | Bại «X từ chối, ta không mất bạc»
nặng: Tốn 2 khắc | Thành «X không còn trên đời» | Bại «Danh −−−, X biết kẻ chủ mưu» | Kèm «Đức −−−»
Seen, pre-existing (LIVE, not this branch): the hint-made Thành value is dark ink (label green); the witness's rank name inside Bại is painted in the
rank colour (teal) by the kit name painter.

### Gates on review/tmk-warn-r4 (merge LIVE 7d7c6886 = da985146; index.html/sw.js rebuilt)
| gate | result |
|---|---|
| tmk-warn-witcard (new) Fold / iPad | 19/19 · 19/19; MUTATE=oldhint 13/19 exit 1 · MUTATE=nokem 10/19 exit 1 |
| kit-std-scan gate SUBS=0 REPORT_ONLY=1 Fold / iPad | 3 / 3 (X06 ×2, X08 ×1) = LIVE 3; **X01 0**; page errors 0 |
| tmk-warn.test | 17/17 ×2 |
| tmk-warn-scan dev/build | 0 gaps / 26 sites |
| tai-mat-know.test | 24/24 ×2 |
| webkit-syntax | 493 modules, 0 hits |
| kit-hand-dupmat · kit-hand-split · press-keep | ALL OK (18) · 0 violations / 33 · PASS |
| opt-loss-ton 755x1000 | FAIL 2 sure cards «Tốn: không» (PEND vase) — **same FAIL on LIVE 7d7c6886** (guardrumour / ghost); sure cards untouched here |
| MODGATE | 0 missing vs LIVE 7d7c6886 and vs e1f6b6f1; adds jmcwarn.js only |
| LIVE deletions · merges | 0 · 2 parents |
Not run: full quickcheck (lander step).

### Handover (if a TMK-WARN-6 is needed)
- STATE: review/tmk-warn-r4 at the tip pushed with this report; RV READY sent to RV-189. If RV / kit keeper reject the kit split: the fallback is a
  KIT REQUEST only (covHint cannot reach a Kèm plaque without it).

### TMK-WARN-5 r2 — RV-189 FAIL-HOLD on kit (law 9 / OD:L1103; rv-189.md 4c67eccf) obeyed
- Dropped from review/tmk-warn-r4: the jopic kitOptFinal hunk and the KIT.md §6.2b line (reverse of my own hunks only — kk71's jopic change kept;
  jopic.js = e1f6b6f1). KIT_REQUESTS «K-HINT-KEM» now OPEN for the kit keeper (my draft = commit 4838f246, jopic hunk). covHint kept (RV: content right).
- dev/test/tmk-warn-witcard.js kept as the ACCEPTANCE TEST of K-HINT-KEM: FAILS today (Đức back in Bại, no Kèm row), must pass once the kit lands.
- Stills removed from git (the build refuses shots in git: «shots go to scratch, never git»); they were in review-sheets/tmk-warn-5 at 39dc6cae.
- Re-run on the r2 build: tmk-warn.test 17/17 · kit-hand-dupmat ALL OK · webkit 0 · witcard FAIL (expected, waits for the kit).
- NEXT (TMK-WARN-6 or me): when the kit keeper's K-HINT-KEM branch exists → merge it, rebuild, witcard Fold + iPad 19/19, stills, RV READY → RV-189.

### HANDOVER TMK-WARN-5 → TMK-WARN-6 (28/11 ~13:30Z; rolled by CONTEXT 26.4 % ≥ START ~1 % + 25 %; MAIN 190 opens the successor)
- STATE: review/tmk-warn-r4 **dbbd0301** (covHint fixed; my kit hunk reverted per RV-189 FAIL-HOLD; witcard = acceptance test, fails until the kit lands).
- UNBLOCKED: KK73 (kit keeper, session_01Rc5AsJyYGUg6x9bzKGW7He) built K-HINT-KEM = **review/kk73-hintkem 874cac12** (on LIVE 8a1a71de), RV READY sent
  to RV-190 (UI/kit). It is my 4838f246 jopic hunk + census hook + KIT.md §6.2b + census test dev/test/kit-hint-kem.js.
- TODO (in order):
  1. `git merge --no-ff origin/review/kk73-hintkem` into review/tmk-warn-r4. KK73: one conflict in jopic.js (the matRow/keep line + the fold line):
     take KK73's first line (kemRow) and OUR second line (K-HAND-DUPMAT kcpsrc); index.html/sw.js → `bash dev/site/build_site.sh`. Check also KIT.md /
     KIT_REQUESTS (K-HINT-KEM: keep KK73's text, drop my «OPEN» entry wording if both sides). LIVE moved to 8a1a71de: that comes in with kk73 (verify FF).
  2. Gates: tmk-warn-witcard Fold 755x1000 + iPad 1180x820 = 19/19 (KK73 saw this on a scratch merge), MUTATE=nokem / oldhint exit 1; kit-hint-kem.js;
     kit-std-scan gate mode Fold + iPad (SZ, SUBS=0, REPORT_ONLY=1; X01 0, total = LIVE's); tmk-warn.test; tmk-warn-scan; tai-mat-know; webkit-syntax;
     kit-hand-dupmat; kit-hand-split; press-keep (needs a file:// URL); MODGATE (assemble.py quoted *.js ⊇ LIVE); 0 LIVE deletions; 2-parent merges;
     committed index.html/sw.js == rebuild. opt-loss-ton fails pre-existing on LIVE (sure cards) — compare, don't fix.
  3. Stills of the OPENED wit door card Fold + iPad @2 to SCRATCH ONLY (shots never in git — build refuses). Probe recipe: boot, click
     «Nhận thân phận/Vào cung ngay…» until the modal closes, `covSaw=()=>["x"]`, find curPeople() index with PEND.door({i,k:"wit"}) 3 rows, doorOpen(p,"wit");
     in image mode hide the «Luân hồi» overlay (#kroul or class kroul) before the screenshot. LOOK at both.
  4. RV READY <sha> → RV-189 (session_01Rc5AsKweT3LtMsrkLNmDbV); land after or with K-HINT-KEM → lander LR-RULES-2 (session_01Rc5AsLfpDrXbkzzDZMaJdF).
- Takeover prompt MUST copy the ROLLOVER lines verbatim (owner OD:L1217) and the LINEAGE line.
- UPDATE 13:32Z (KK73): K-HINT-KEM is now **review/kk73-hintkem 44cfa57d** (on LIVE 5fc4bc79, which already holds K-HAND-DUPMAT → the jopic conflict
  is resolved inside it). Merge **44cfa57d**, NOT 874cac12. RV-190 is reviewing it. RV for this branch = RV-191 (RV-189's seat).
