# rankpace × b3a resolve — review/lc34-rules-r1

PRIORITY #1 CHECK: OD tư thông / tier rulings (OD L2641 26/11 ~19:50Z, L2649 26/11 ~20:35Z, L2651 ~20:40Z; L2217–2218 death-cause rates 23/11) | main LIVE f7ea14b7 (no dieMk, no ttExposed) | review/* lc34-b3a ce616a3d (E74 ttExposed / crimeTier / convict / dsDan), rank-pace-rv2 bbe3d757 (dieMk DIE_K), f14role-inherit-r2 0e2afaa1, LC34 trial review/lc34-rules b1dc3ed3 (local, not pushed) | claims LC34 land-chain-34.md 04:55Z line (6 real hunks), MAIN 186 order.

Role: BIG reviewer-resolver (child of MAIN CHÍNH 186). Laws read: ★ 18 LAWS, START_CORE, START_WORKER, START_REVIEWER.

## Result

`review/lc34-rules-r1` **cc86c6353** (pushed) = lc34-b3a ce616a3d + B f14role-inherit-r2 0e2afaa1 + D rank-pace-rv2 bbe3d757.
- LIVE f7ea14b7 is an ancestor: yes. Files deleted vs LIVE: 0. Files deleted vs b3a: 0.
- Line check (scratch script: every line each branch added vs its base must still be in HEAD): f14role 0 missing; rank-pace and b3a: the only missing lines are the combined hunk lines in the table below (each one is in HEAD in merged form).
- assets.json = b3a (rank-pace's = LIVE). CHANGE.txt = b3a. index.html / sw.js rebuilt (`dev/site/build_site.sh`).

## Hunk-by-hunk resolution table

| file | hunk | b3a (ours) | rank-pace (theirs) | resolution |
|---|---|---|---|---|
| assemble.py | module list | + jscent jmoment jkpcard jleave | + jpromob jpdist jtperc jsvt | union, each placed after its own neighbour; 484 modules, no dups |
| **j22** | affairExposed | E74: ONE rule `ttExposed(p,m,lead)`; affairExposed = wrapper | `dieMk(m,"crime")` after the man's `m.alive=false` | b3a's rule kept; the mark goes INSIDE ttExposed (`m.alive=false;dieMk(m,"crime")`) = one place for every caller (affairExposed, ttNpcExposed, trystNpc, j30 expose, jmen report, j95 tryst) |
| **j22** | trystNpc | trystNpc → ttExposed | `dieMk(m,"crime")` at the old site | b3a's (marked inside ttExposed) |
| **j8** | deathSentence | crime tier arg + `BAL.crime` row, nghịch → dsDan, `crimeTier`, `convict`, `dsDan` | DIE_K / dieKOf / dieMk block; `dieMk(S,"crime")` before `die(why)`; `dieMk(p,"crime")` on NPC ban chết | b3a's deathSentence with both marks put in the same two death points; DIE_K block placed above it; **dsDan**: phế làm thứ dân = the life leaves the palace, not a death → `dieMk(S,"left")` (before its over()) and `dieMk(p,"left")` (NPC). `left` is outside `BAL.promoR.sp.tp.okK`, so no truy phong (jpromob pbTpBar: «Nội vụ phủ không xét truy phong») and it is not counted as a death cause |
| j8 | giveTo / plantItem | K-GIFT-OUT `giveTo.out` / `plantItem.out` flags | `pvQuy(r,gr,"thiện cảm")` preview | both |
| **j95** | tryst plot found | `ttNpcExposed(v,m)` | `dieMk(m,"crime")` at the old site | b3a's (marked inside ttExposed) |
| **jmen** | report tryst | `ttExposed(c,m,…)` after the Danh gain | `dieMk(m,"crime")` at the old site | b3a's (marked inside ttExposed) |
| **j30** | «expose» Bóc chuyện tư tình | her + NPC → ttExposed | `dieMk(t,"crime")` at the old NPC ban-chết site | b3a's (the NPC road now goes through ttExposed → deathSentence, which marks `crime`) |
| **jbal2** | end of file | `BAL.noise` (QC budget) | `BAL.svt` (servant trust) | union: both blocks, no number lost, no key collision |
| j4 | Vâng mệnh (poison Hoàng hậu) | `crimeTier("poison",{queen:1})` arg | `dieMk(q,"murder")` | both |
| j42 | cung-nữ road | «Hầu bên cạnh chủ» line removed + comment | svtPeer lines on chat / gift | both |
| j70 | trap caught | `convict(…,M.k,t,2)` | `relAdd(S,a,…)` direction fix | both |
| j83 | work gift to NPC | d19 rcvGiftIn answer + keepGain | `pvQuy(r,ev.rel,"thiện cảm")` | both |
| jbancung | Ban cung card | `kind:"group"`, `meRankN()`, law1 NPC comment | `pdTxt(i)` + pdHint line | both |
| jdis | gift refused | `giveTo.out="refused"` | giver `a` generalised (NPC giver, lrn) | rank-pace's generalised body + the K-GIFT-OUT flag |
| jht | Bàn hôn sự / Dò hỏi | ask wording «biết rõ nàng (tên, mặt, Sắc, Tài)» | `BAL.btn.pkBan.k` | both |
| jrcp ×4 | teacher / spy / thái y | wording (rcpFeeW, «ưa ghét hay kiêng kỵ», «biết cách học từng lối») | `BAL.artLes.k`, `BAL.btn.rcpTy.k`, `BAL.btn.rcpSpy.k` | b3a wording + rank-pace BAL khắc keys (law 4) |
| jtabs | ktWorksList | split into ktWorksList | `whyTime(BAL.artLes.pk)` | both |
| jtsb ×2 | fire cards | «Thôi» = kit ✕, risk line in story | `BAL.btn.tsb.k` | both |
| coop-e2e.js | requires | `require('./lib/bigpage')` | rank-pace exam probe | both |
| index.html / sw.js | built | — | — | rebuilt |

Death-mark scan (scratch: every `.alive=false` without a dieMk / dieIf within 250 chars): merged 6 = rank-pace 6 (j54 temporary hide, jcoopask ×3 co-op mirror, jcoopworld kidDie fallback, jroute catch fallback) — the b3a rule adds no unmarked death site.

## Gates (on cc86c635; baselines = LIVE f7ea14b7 / b3a ce616a3d dev/index.html assembled in scratch)

| gate | merged | baseline | verdict |
|---|---|---|---|
| assemble.py + build_site.sh | built 19114195, media-check 0, img-allowlist OK | — | PASS |
| node --check every dev/build/*.js + coop-e2e.js | 0 errors | — | PASS |
| rank-pace.js (exam window family + old save) | ALL PASS | — | PASS |
| leave-palace.test.js (E74 P1/P2/P3 family scans: convict, no «bỏ quên → lãnh cung», j30 expose on the one rule) | 135/135 | — | PASS |
| npc-purpose g1 … g1g, npc-purpose-scan | all PASS | — | PASS |
| law1-audit.test.js · noise-sampler-pure · gift-return-scan · d19-gift · srvmerit-guard | PASS | — | PASS |
| kit-gift-out (fold + ipad, y05 fixture from handover branch, not committed) | 8 cases 0 FAIL | — | PASS |
| veil-buoi-scan Fold 755x1000 + iPad 1180x820 | PASS / PASS | — | PASS |
| charge-trinh-punish · punish-reason · punish-live-vs (40 falls, twoRank 0, earlyPardonOut 0, errs []) | PASS | — | PASS |
| punish-scan.py | clean | clean | PASS |
| punish-weight-scan.py | 1 fault jstagehere stayRoll sev | same fault on LIVE + b3a (line 129 → 137) | pre-existing |
| npc-purpose-logic.test.js | TypeError «reading 'friend'» | same on LIVE + b3a | pre-existing |
| npc-death.js | 9/12 (same 3 FAIL: Trường Môn viện stage, stand-in, Thái y name) | b3a 9/12 same 3 | pre-existing |
| undef-scan · save-death-rebirth | PASS | — | PASS |
| webkit-syntax.js | 14 parse-level hits | identical 14 on LIVE + b3a | no new hit |
| lookbehind-scan.py | 17 BAD, 40 via kRx | LIVE 17 BAD / 39 · b3a 17 BAD / 40 | no new lookbehind |
| old save opens: oldsave-r1 (LIVE dev/index.html save → new build, 755x1000 / 1180x820 / 1366x1024) | 16/16 | — | PASS |
| quickcheck.sh --runs 3: build + CORE GATES (one-core-guard, rules-one-source, kit-conform, coop-one-world, 15 hooks) | CORE GATES PASS | — | PASS |
| quickcheck.sh step 1c time-spill-guard | FAIL 7 (gate greeting offered; place dc/kn ask + sneak offered ×6) | **b3a ce616a3d FAIL the same 7**; LIVE f7ea14b7 PASS; rank-pace bbe3d757 PASS | **inherited from b3a** (not this merge) |
| quickcheck.js step 2 (run by hand after 1c stopped the script), --runs 3 vs LIVE | QUICKCHECK PASS · open 1764 ms · old save ok · perf median new/live: render 278/231, tab 440/401, buổi 1602/1170, tasks>200ms 25/19 | — | PASS |

### Blocker inherited from b3a: time-spill-guard 7 FAIL
The page text has «Xin bái kiến» / «Lẻn vào» / «Bái kiến», but the guard reads `m.opts` and does not find them (label «… offered»). So either the b3a stack (most likely its ui6 layer: kit cards, r17 kind:"group" cards) moved these choices out of `m.opts`, which would make it a harness gap, or they really are disabled when 1 khắc is left in the buổi. Either way it already fails on b3a ce616a3d alone. LIVE and rank-pace pass. It needs a b3a / ui6 owner fix, not a fix in this merge. The guard is `dev/test/time-spill-guard.js <site root>` (it needs dev/build next to index.html).

## Notes for MAIN (no change made — law 16)

- OD L2649 (26/11 ~20:35Z) MAIN rec (1): TỬ TỘI only for mưu phản / hại chết hoàng tự / mưu hại Hoàng thượng / khi quân trọng tội, commutable to «phế vị + lãnh cung chung thân». b3a/E74 (MAIN 118, 24/11) keeps tư thông = ban chết (mercy → lãnh cung) and the nghịch mercy = dsDan «phế làm thứ dân». This merge only moved the death marks; the tier contents are the punish-stack (3b) job — please check there that tư thông's tier and the dsDan mercy match L2649.
