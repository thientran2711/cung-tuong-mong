# review-one-core-dup3-r2 — VERDICT: PASS (stack content) · NOT FAST-FORWARDABLE (main moved to 6ca04148 during the review)

PRIORITY #1 CHECK ('one-core-dup3 r2'): OD 0 new (ONE CORE OD:L1267 read verbatim in START_CORE) | ledger 0 | claims B one-core-dup3 r2 = this session (CLAIMS:740) | main 65dcf52f at start → 6ca04148 (batch-d8) at the end | review/* review/one-core-dup3 67430058 (worker), review/one-core-dup3-r1 607887ae, review/coop-thin-b 4609afa6 / coop-thin-b-r3 fee14ec5 (item 6).
START_CTX ≈ 4 % of 1M (get_session reads 0; estimate) → rollover ≈ 29 %, ceiling 60 %. Finished below it; no successor needed.

Reviewed: review/one-core-dup3 @ 67430058. Verdict branch **review/one-core-dup3-r2 @ 3213abc8** = 67430058 + 145ca1d8 (word counts + 2 gate holes) + 9a296bc7 (site) + 3213abc8 (bind crash fix). Base = main 65dcf52f.
Trial merge of the new main: **review/one-core-dup3-r2-main @ cd2810ff** (WIP, guard FAIL — see §7).

## 1. Evidence-count family (r1 item 1) — PASS after 3 reviewer fixes
- Own scan of every dev/build/j*.js (digits «N chứng cứ», «chứng cứ ±N», «nắm thêm N», «chứng cứ: N», bằng chứng / tang chứng / thóp): 30 lines left, all in the worker's not-a-copy list (thresholds j6/j8/j15/j30/j79/j4:60 · quest / tham-ô counters j14:11, j4:24/68/120, j55 · kit sample jgrey/jksize/jopic · comments jcycle/jwhy/j79/j87) — reasons valid (j4:68 «án cũ +1» = S.caseEv++ counter, same family as j4:24/120, not listed by the worker; fine).
- 0 typed evA / evStory amounts left (only j40 evA(v,u,0) mark); no direct ev[...]+=N writes.
- The 14 evStory moves + j29: values checked against jbaleff (j3 evGo/evGo_2=2, j4 evMonth=2 evGo=1, j67 2/1, j68f/j68g 1, j7 2,1,2,2,2,2, j29 1+1) = the old literals.
- **Not valid: «word numbers» reason** for 3 lines that ARE copies of an ev amount (same option): jtruth:77 spyFind «thêm một chứng cứ» (jtruth.evN), j78:143 uyhiep «chuộc lại một chứng cứ» (j78.evF_3), jecon:159 AOUT.spyk «nắm thêm một chứng cứ» (previews spyFind → jtruth.evN; its sibling AOUT.spy already prints the key). **Fixed here (145ca1d8):** print `balWord(balAb(key))` — new helper in jbal.js = VP.num word (same words «một»; runtime check: Fold + iPad render «thêm một chứng cứ», «nắm thêm một chứng cứ, Tâm cơ +1», «chuộc lại một chứng cứ»). AOUT.spyk → aoLz (VP loads after jecon). The other word lines are narrative / thresholds / typed counters (j4:65, j67:887, j72:361 typed -1 rule, jchap, jrd_*, jk2b) — follow-up wave with the counters.

## 2. one-core-text EV gate (r1 item 2) — PASS + one hole closed
- Plants (on a copy): j22:25 «nắm 1 chứng cứ» → CAUGHT · jecon AOUT.bribel «mưu kế: 1 chứng cứ» (AOUT pair) → CAUGHT · j92:307 result «nắm 2 chứng cứ» → CAUGHT ×2 · jpoison:82 result «Ngươi nắm 2» → CAUGHT ×2.
- Hole: a word count («nắm một chứng cứ») passed. **Fixed:** EV_AB reads một/hai/ba/bốn/năm after the same verbs; old tree 67430058 → exactly the 3 lines of §1, new tree 0; plants «nắm một» (j22) / «nắm hai» (jpoison) → CAUGHT.
- guard kind evn: plant evStory(q,2,…) j3 → NEW evn FAIL; evA(f,p,1+g) j29 → NEW evn FAIL.

## 3. one-core-bind on the new prints — PASS + 3 holes closed
- Mass plant: every `bal(Ab|Sg)(BAL.eff.*.ev*)` print (182 sites) swapped one at a time for a look-alike key of the same value from another module. Before: 179/182 caught. Misses: j22:25 → jtruth.evN passed via «handler pcfX» (the text property name `x` matched a function ending in X); j79:1010 → passed via link name «function» (`typeof caughtW==="function"`); jroute:139 → passed via j74's page branch `PG==="home"` (the option's own step("home")). **Fixed (145ca1d8):** handler match needs a name ≥ 3 letters; typeof words are not links; another module's if/case branch of the option's own entry name is not its rule. After: **182/182 caught**, real tree 823 prints / 0 mismatches; SWAP plant AOUT.ally f_2↔f_3 still CAUGHT ×2.
- 3213abc8: name tables without a prototype (main's batch-d8 code has a handler named like an Object method → `FN[...].push is not a function` crash).

## 4. Main merge 65dcf52f (greet-meet) — PASS
- Removed keys BAL.eff.j9.run/_2/_3/_4/_6/_7, j2.go_2: 0 reads (grep, also computed BAL.eff[…]); load 0 errors.
- merge-tree of f4030cbd × 65dcf52f: conflicts j2 / j9 / j24 / assemble + generated; result vs auto-merge differs only in those + j25 wrapper (now BAL.talk.gossip miss/tellOan/tell, values equal) + jbaleff dead keys + baseline. Files only main changed (j61 jbal2 jgreet greet_check research) byte-identical to main. assemble = main's list + jbaleff + jbalarc, order kept. j9 / j2 Khiêu khích / Bàn tán / Chia sẻ / Cảnh báo = main's BAL.talk; stack's other moves kept. greet_check **13/13**.

## 5. road-end Pixi page error — not reproduced
road-end on the stack 67430058: **51/51**; on origin/main 65dcf52f (run there): **51/51**; 0 «updateLocalTransform» in either log. The worker saw it on base 607887ae too → a flaky Pixi error not tied to this stack (note for main, not a FAIL).

## 6. Gates
| gate | result |
|---|---|
| proof one-core-dup2-same 67430058 → r2 | SAME (3 modules; INTENDED += jtruth spyFind, j78 ExpressionStatement, jecon TryStatement = the 3 word prints: the proof cannot fold balWord) |
| proof 607887ae + main 65dcf52f | only j2 / j25 talkOpts (merge, checked §4) + jgreet new file — as the worker reported |
| one-core-guard | PASS 4708 = baseline, no grow, no --allow-grow |
| one-core-text | PASS 0 |
| one-core-bind | PASS 823 / 0 |
| quickcheck @ 67430058 and @ 9a296bc7 | PASS (core gates, open 0 errors, old save loads + plays a buổi; perf new/live render 230/216, tab 333/303, buổi 719/834) |
| coop-e2e | 62/62 (×2, first try) |
| coop-one-world | PASS (old room + single player) |
| road-rare / road-end | ALL PASS / 51/51 |
| greet_check | 13/13 (×2) |
| Fold 755x1000@2 · iPad 1180x820@2 | 0 page errors, no h-overflow; 2 shots each (spy result + AOUT.spyk / bribel preview; uyhiep result) — scratch only, deleted. Note: the option tile with a missing picture squeezes its text on Fold 755 (the same KIT REQUEST coop-thin-b filed 4609afa6, not this branch). |

## 7. Main moved to 6ca04148 (batch-d8, 204 files) — landing blocker (for Foreman B)
Trial merge pushed: review/one-core-dup3-r2-main @ cd2810ff. 12 code conflicts (j22 j23 j28 j67 j8 j97 jcmaid jkc jlost jrd_cn jroute jthaiy) token-merged with 0 overlap except **jroute blood-test fin: main's BAL.ngh.accOan wins** (shared with the NPC accuser path) over the stack's BAL.route.oan.demand (now unread — drop it). assemble = main's list + jbaleff + jbalarc; site rebuilt; text PASS 0, bind PASS 828/0.
**one-core-guard FAILS 70**: main's batch-d8 code typed numbers the stack's guard counts (jkc2 kcAf(…,±N) amt ×65, jnroadm k ×2, joi ladder ×1, jkh rtCard rtk ×1). Needs a worker to move them into BAL (or the coordinator's decision to freeze them), then gates + quickcheck + coop-e2e on that tree. Until then 3213abc8 cannot fast-forward main.

## 8. coop-thin-b note (item 6)
Trial merge of review/coop-thin-b (4609afa6) and coop-thin-b-r3 (fee14ec5) into the verdict tree: conflicts j2 (start()) + KIT_REQUESTS (4609afa6) + generated. **ONE key: BAL.allyRel wins** (named, documented, read by the shared allyBond() that jcoopthinb also calls) — delete BAL.eff.j2.start from jbaleff (0 other reads). After that: guard PASS, bind PASS, **text FAIL 1: jcoopworld:991 «${mn} nắm 1 chứng cứ của ${nm}»** (coop-thin-b's new briber dialog copy) → must print `${balAb(BAL.eff.jcoopworld.evBriber)}` + `/* previews: briber */` like line 832.

Shots: scratch /home/user/wt/r2-shots (deleted with the verdict), none in git, no CDN review folder used.
