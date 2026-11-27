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
