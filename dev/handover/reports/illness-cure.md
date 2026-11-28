# ILLNESS-CURE — worker report (review/illness-cure)

## HANDOVER (worker rollover 28/11 ~05:30Z: ILLNESS-CURE-2 context 29 % ≥ START_CTX 5 % + 25 %; depth 4) — r4 NOT started
r3 = RV READY c1c5cb0e (section r3 at the end) — SUPERSEDED for RV-163M once r4 is posted.
ORDER r4 (Foreman C 4-1-1-1, MAIN 186 04:36Z + Foreman E data), verbatim essentials:
(1) MAIN 186: Foreman F found on LIVE (s21g) a MILD illness («Tâm bệnh · nhẹ») shows on the HUD only — no dialog, no danger word, no cure road. Every illness tier, mild included, must offer the cure road per the 02:20Z rulings (law 2 tiers, bạc road + matching non-bạc road). Whole family (law 11): scan every illness × stage for «shown but no road / no words», table before/after; test row for the mild case + MUTATE.
   Lead: the r1 scan (dev/tools/illness-road-scan.js) passed 39/39 chip→card on the branch, so check what LIVE does differently: (a) the chip on the TOP bar / k3 (data-k3="ill") vs hud2; (b) non-deadly illnesses (Tâm bệnh die 0): illDanger text path; (c) illOpen returns false / Q busy; (d) cung nữ (isSrv) life → no deck road → bare notice; (e) the nhẹ tier ONE pick may hide «Cầu xin ngự y» / bạc road — law 2 needs bạc + non-bạc in EVERY tier incl. nhẹ (today nhẹ = Tĩnh dưỡng / Tự bốc thuốc only, no bạc road; vừa = xin thuốc only). Decide with the ruling: each tier with a bạc road must show its matching non-bạc road.
(2) Foreman E: 2 heroines died of illness in YEAR 1 on clean LIVE, no cure taken — Kiết lỵ nguy kịch b88 (age 19, evidence handover 2023b21fa7) and Lao phổi nguy kịch b120 (age 18, evidence 2feae8b09b). Check on the branch: card + danger words + a PAYABLE road early enough for a rank-1 heroine with little bạc? If an early life can still die with no fair chance, fix it in the same rule (BAL, law 4; law 5 = easier at the start, e.g. a rank-scaled die3 or a floor month at low rank). Answer + numbers in the report.
(3) Re-merge onto NEW LIVE main 5ad52416 (f7ea14b7 save-pid + webkit-lb). Merge LIVE into review/illness-cure, rebuild, webkit-syntax gate (no regex lookbehind literals — Safari<16.4; my r3 code has none), tests + MUTATE, quickcheck vs LIVE 5ad52416, Fold + iPad shots, old save.
Report §r4 here, then «RV READY (BIG) review/illness-cure <sha> (on LIVE 5ad52416)» + LAST LINE to the foreman.
STATE / HOW (r3 lessons): worktrees were removed — recreate review/illness-cure from origin (c1c5cb0e) sparse. Build: bash dev/site/build_site.sh (root index.html; tests read root index.html, door-onetap / kit-std-scan read dev/index.html). Tests: node dev/test/illness-cure.test.js <outdir> (r3 sections included); scans dev/tools/illness-road-scan.js <dir> <out> and dev/tools/kid-illness-scan.js <dir> <out> (base = a dir with a built index.html). MUTATE fast = string-replace in the built index.html copy, run test, restore. Known flakes (both base and branch): q-softlock (iPad person tap under div.kring-band), door-onetap random «door word worse» / P9, ag-all 6 FAIL (day plan / perf / Emperor plan), kit-std-scan X02 20 / X06 12 / X08 6. In page.evaluate: talk lists are stranger-gated (set K61RAW=true), roll(100) is capped by BAL.odds.hi (retry), keep `cd` + `&` apart (a backgrounded group loses the cd).
Docs push: shallow — worktree at FETCH_HEAD of the handover branch, edit, commit, push (never rebase).

## r2 (Foreman C 4-1-1, Q2 = law 2): RV READY (BIG) 261d91f1 on 5fb13d60
- nặng tier shows BOTH «Truyền thái y» (bạc) and «Cầu xin ngự y» (Sủng) side by side, each with its own Tốn / odds, greyed with the reason when she cannot pay (jone tierRows `both`; hs-thaiy both=[nặng] while ill). Card = 4 plaques (nhẹ · vừa · nặng · nặng).
- illness-cure.test: ALL OK Fold + iPad (asserts both shown + greying); MUTATE both off → 10 FAIL.
- door-onetap PASS · quickcheck 261d91f1: QUICKCHECK PASS + CORE GATES PASS (hooks 14), open 1904 ms, old save ok, perf new/live render 216/270, tab 451/480, buổi 1368/1582.
- Q2 closed; Q1/Q3/Q4/Q5 passed to MAIN 183 (unchanged).


PRIORITY #1 CHECK ('cure road|chữa bệnh|lao phổi|illness|thầy thuốc|Truyền thái y|Cầu xin ngự y'): OD 18 (OD:L2666, OD:L2670 «Giữ bệnh, độc, ám sát» = illness still kills; OD:L2657) | main j13.js illCards (Truyền thái y / Tự bốc thuốc / Tĩnh dưỡng), jthaiy.js (bắt mạch roads), jone.js hs-thaiy tiers, jact2.js HSD thaiy door, jbal2.js/jmort.js extra death rolls | review/* none (git grep of 300 newest review/* for illCure / Cầu xin ngự y / HX.ill: 0 hits) | claims ILLNESS-CURE → session_01PEhRbvzcp527pLLt31A9W4.
KIT CHECK: reuses DOOR.card + kitHand (bàn bài, flip back), jdoor lineOf kit line + optOdds chip, ONE.tierRows / ONE.pick / ONE.runM, the deck cards' own act(i). No new UI part.
Session: depth 2, START_CTX ~5 %.

## Reproduced (base 5fb13d60, Fold 755x1000)
Seed state of R2-greedy-5 b1096 (Lao phổi · nặng, Sức 93): tapping the status chip «Lao phổi · nặng» opens a card titled «Lao phổi · nặng» whose body is the same words, only «Lui».

## Roots
1. Chip: renderHud2 / k3Explain have no text for key `ill` → bare card, no road.
2. Door «Bắt mạch, chữa bệnh» (Hành sự, jone TIER): vừa = «Sang Thái y viện xin bắt mạch», nặng = ONE pick between «Mời thái y bắt mạch» and «Truyền thái y»; the pulse road has no odds → read as sure → always picked. While ill, the only cure on the card was «Tĩnh dưỡng» (nhẹ). The cure was hidden, not missing.
3. A mid-buổi illness had no cure card until the next deal.
4. Turning nặng / nguy kịch = one log line; no card.
5. jbal2 (illDie) and jmort (age) rolled death in the SAME month j13 raised the illness to nguy kịch → no month to act. Combined nguy kịch death ≈ 60 %/month for Lao phổi.
6. Sức never reads illness (only −5×stage a month, refilled by sleep), so a full Sức looked safe.
7. (family, jone) deck-door tier rows lost jdoor's kit line: the card back showed only «Gợi ý» — no Tốn, no odds word (every Hành sự tier door).

## Fix (commit 498f8840 on 5fb13d60)
- BAL.illCure (jbal2): road odds way{rest 20, self 30, vien 40, ty 55, cau 55}, tyBac 40, vien {Sức −8, 2 khắc}, cau {Sủng −4, 2 khắc}, slow 15, npc 60 %. j13 treatO/treat/illMonthP read it (the typed 55/30/20/40/15 are gone).
- New roads (j13 illCards): VỪA «Sang Thái y viện xin thuốc» (Sức, locked in lãnh cung / cấm túc) · NẶNG «Cầu xin ngự y» (Sủng; the non-bạc road matching «Truyền thái y» bạc; locked in lãnh cung or Sủng too low).
- jone hs-thaiy tiers while ill = cure only: nhẹ Tĩnh dưỡng/Tự bốc thuốc · vừa xin thuốc · nặng Truyền thái y/Cầu xin ngự y. Well → the old pulse tiers.
- jillcure.js (new, last module): the chip opens the door's tier card (kit DOOR.card/kitHand) with the danger line in words (monthly: tự khỏi · trở nặng · không qua khỏi, from the real j13 + jbal2 + jmort rolls) + «Sức còn đầy cũng không giữ được mạng; phải chạy chữa.»; cure cards join the deck at once; the card opens by itself once when the illness turns nặng or nguy kịch; NPCs (nặng+) take the best road they can pay at the same prices (law 1).
- jbal2 + jmort: no death roll in the month the illness turns nguy kịch (j13 already worked so). Nguy kịch still kills: 204/400 trial months (OD:L2670).
- jone deckM + deckTap: tier rows carry jdoor lineOf + optOdds again (Tốn 2 khắc · Sủng 4 · odds word on the back). DOOR.lineOf exported from jdoor.

## Scan (dev/tools/illness-road-scan.js) — 13 illnesses × 3 stages
| | before 5fb13d60 | after 498f8840 |
|---|---|---|
| chip tap | 39/39 «text only («Lui»)» | 39/39 card, 3 roads |
| door nhẹ | Tĩnh dưỡng | Tĩnh dưỡng (Tự bốc thuốc with Y thuật) |
| door vừa | Sang Thái y viện xin **bắt mạch** (no cure) | Sang Thái y viện xin thuốc |
| door nặng | Mời thái y **bắt mạch** (no cure) | Truyền thái y (bạc) / Cầu xin ngự y (Sủng) |
| cure ways bạc / non-bạc | 1 / 1 | 1 / 3 |
| danger line | none | 39/39 in words (no %) |
| NPC road | none | nặng+: thái y (bạc) / cầu xin (no bạc) / xin thuốc / tĩnh dưỡng |
Full tables: before/after md in the run dir (generated by the scan, not in git).

## Tests
- NEW dev/test/illness-cure.test.js (Fold 755x1000 + iPad 1180x820): ALL OK (chip → tier card; 3 cure tiers; danger line; no %; nặng back = Tốn + odds word on a real tap (flip, not run); bạc/Sủng matching; well = pulse tiers; BAL numbers; no same-month death + still kills; alarm opens once; NPC roads).
- one-core-guard / one-core-text / one-core-bind / one-core-text-rule: PASS.
- door-onetap: PASS (one run FAIL «P9 tier tap no card» = talk harm door, untouched; rerun PASS; base PASS).
- ptime2: §15 summons flaky on BOTH base and branch (treat 1 pass / 2 fail each; bm fails on base too); §16–19 FAIL on base too.
- act-merge-j1-deck: crashes (cardCost) on base and branch alike.
- quickcheck 498f8840 vs live 8330e8b8: open 2004 ms, old save ok, perf new/live render 282/247, tab 569/469, buổi 1751/1508; CORE GATES FAIL only G4 95-next-dead (Fold «real S.mg» mini-game case) — rerun alone over http 2× on branch + 2× on base: all PASS (flaky in the long run).
- Shots (outside git): Fold + iPad: 1 ill card, 2 nặng back.

## Questions for the foreman (law 16 — not decided by me)
Q1. Sức honesty: should an illness CAP Sức by stage (e.g. nặng / nguy kịch lowers Sức tối đa) or should the death roll read Sức? Today I only show the danger in words on the card. Either is a rule change.
Q2. Inside the nặng tier the ONE pick shows ONE road (bạc or Sủng, whichever she can pay; both payable → seeded). Should she see both (4 rows) instead? Law 2 allows ≤ 3 tiers; ONE rule shows one per tier.
Q3. Kid illness (kidsMonth): a sudden hit can kill at once (no warning); the non-bạc kid road needs Y thuật ≥ 4 («Chữa bệnh cho con»); for others only «Xin thuốc cho con» (bạc 30). Add a non-bạc kid road + a warning? Out of this order's ILL family; not built.
Q4. The pulse roads (Mời thái y / Sang Thái y viện xin bắt mạch) leave the door while she is ill (the cure card is the one matter). They stay on the physician's card (Hậu cung › Cung nhân). OK?
Q5. NPC cure chance BAL.illCure.npc = 60 %/month for a nặng+ NPC: fewer NPC illness deaths than before. Robot table needed?

## r3 (Foreman C 4-1-1-1, MAIN 185 OD 28/11 02:20Z: Q1 + Q3; Q4 OK as is; Q5 = Foreman E) — RV READY (BIG) c1c5cb0e on 261d91f1
Session ILLNESS-CURE-2 session_01PEhRbxGXnzfsq379bwXJWA, depth 4, START_CTX ~5 %.
PRIORITY #1 CHECK ('sucCap|Sức tối đa|kidsMonth|kidMed|Xin thuốc cho|Cầu xin ngự y cho|kidHurt|hpEpidemic'): OD 28/11 02:20Z MAIN 185 rulings | main: jkh.js sucCap (the one Sức clamp), j8 kidsMonth, j2 «Xin thuốc cho <con>» (Thái y viện) + «Chữa bệnh cho con» (Y ≥ 4), jact «Tự bốc thuốc cho con», jagacts2 cx2 kidMed / kidHeal, j13 epidemic, j7 princefever / kidHurt, jface fxIllMonth (child ILL book) — no Sức-by-illness cap, no non-bạc kid road for a mother without Y thuật | review/*: review/illness-cure 261d91f1 (built on) | claims ILLNESS-CURE (this item).
KIT CHECK: reuses the kit Q notice (her child's card, same as the r1 «no deck road» card), talkOpts rows (Thái y viện), deck cards (home deck), HXNOW rows (Sức help), DOOR.card (illness card). No new UI part.

### Q1 — Sức tối đa capped by illness stage
- BAL.illCure.sucCap {nhẹ 85 · nặng 60 · nguy kịch 35} (jbal2). jillcure wraps sucCap (jkh) → every Sức clamp in the game reads it (j1 apply / statSet, j8 ap, j3 / j76 / j42 regen, pets, maids …); fitted at once on catchIll, after each illMonthP (stage up / cured), and on render (old saves).
- Everyone ill (she, NPC consorts, co-op) — law 1. Not for the jmort «mort» decline (own words).
- Words: the danger line now says «Còn bệnh thì Sức tối đa chỉ N. Nghỉ ngơi không giữ được mạng; phải chạy chữa.» (the old «Sức còn đầy…» sentence is gone); the Sức help row «Sức tối đa N · vì lao phổi · nặng». HUD reads 60/60 on a nặng Lao phổi (shot).
- Note for MAIN: at nặng (60) she loses the jmort care source «Sức ≥ careSuc 70» while ill — real, small; numbers are ours to tune.

### Q3 — child illness: a sign before it can kill + non-bạc roads (laws 1, 2, 4, 7, 11)
- ONE rule j8 kidIllHit (BAL.kidIll {hit lo 30 r 40, ch young 3 / old 1.5 / storm .5, floor 10, worse 30, well 60, feverFail 25}): the first illness hit on a well child never kills — she is left ốm (k.kIll), Sức khỏe ≥ floor, and her mother gets the sign; only an already-ốm child can die, from the next hit (worse % a month, never the month she fell ill). Sức khỏe ≥ well = khỏi.
- Paths routed through it: j8 kidsMonth (sudden illness), j13 epidemic (đậu mùa), j7 kidHurt (fever event «Tự bốc thuốc» fails; its «hỏng: Sức khỏe -25» now prints BAL.kidIll.feverFail). jface ILL-book child: death only from nguy kịch already (unchanged), now + her card on each stage up. j8 kpoison = a scheme (poison family), not an illness — out of scope.
- The sign (her own child): the card «<con> lâm bệnh» opens by itself once (alarm, like hers): Sức khỏe con, «Không chữa, mỗi tháng bệnh trở nặng: <word>; Sức khỏe con như lúc này thì mỗi tháng không qua khỏi: <word>», «Sức khỏe con lên 60 là khỏi», and the roads with Tốn. Words only, no %.
- Roads (law 2): Thái y viện «Xin thuốc cho <con>» (bạc 30) now has its matching non-bạc road «Cầu xin ngự y cho <con>» (Sủng 4, the same +25; greyed «Chưa đủ Sủng để cầu xin»); home deck «Thức trông <con>» (nhẹ, Sức 10, +10) for any mother of a sick child; «Chữa bệnh cho con» / «Tự bốc thuốc cho con» (Y thuật) unchanged. Every child medicine road also gives an ILL-book child the cure roll (kidCure → j13 treat, BAL.illCure.way).
- NPC mothers (law 1): jagacts2 cx2 kidAsk (Thái y viện, Sủng) / kidWatch (self, Sức) at the same BAL.ag.cx2 prices; kidMed / kidHeal run kidCure too; their children follow the same kidIllHit rule.
- Law 4 family: the typed nguy kịch death 25 (j13, jbal2 illDie, jface, jillcure) → BAL.illCure.die3; jface slow 15 → BAL.illCure.slow; kidsMonth 30+R(40) / 3 / 1.5 / .5 → BAL.kidIll.

### Scan (dev/tools/kid-illness-scan.js, before 261d91f1 / after)
**BEFORE (261d91f1)**
#### Child-illness paths
| Path | first hit kills (trials) | sign before death |
|---|---|---|
| j8 kidsMonth — sudden illness (đậu mùa / sốt / kiết lỵ / phong hàn) | 63/100 | log line only |
| j13 epidemic — đậu mùa in her cung | 60/60 | — |
| j7 princefever — «Tự bốc thuốc» fails | 100/100 | — |
| jface fxIllMonth — child with an ILL illness | 0/100 (nhẹ) | stages nhẹ → nặng → nguy kịch + log |
| j8 kpoison — «Hạ độc con nàng» (a scheme, poison family — not an illness) | (out of scope) | — |

#### Roads for her sick child
- Thái y viện: Xin thuốc cho <con> (bạc)
- home deck: —
- NPC mother (jagacts2 AGC2): kidHeal (Sức) · kidMed (bạc)

#### Q1 Sức tối đa by illness stage (Lao phổi; her Sức set to 99 first)
base cap (well): 100
| stage | her Sức tối đa | her Sức after render | NPC Sức tối đa |
|---|---|---|---|
| nhẹ | 100 | 99 | 100 |
| nặng | 100 | 99 | 100 |
| nguy kịch | 100 | 99 | 100 |

page errors: 0

**AFTER**
#### Child-illness paths
| Path | first hit kills (trials) | sign before death |
|---|---|---|
| j8 kidsMonth — sudden illness (đậu mùa / sốt / kiết lỵ / phong hàn) | 0/100 | card (opens by itself) |
| j13 epidemic — đậu mùa in her cung | 0/60 | card (opens by itself) |
| j7 princefever — «Tự bốc thuốc» fails | 0/100 | card (opens by itself) |
| jface fxIllMonth — child with an ILL illness | 0/100 (nhẹ) | stages nhẹ → nặng → nguy kịch + log + card on each stage up |
| j8 kpoison — «Hạ độc con nàng» (a scheme, poison family — not an illness) | (out of scope) | — |

#### Roads for her sick child
- Thái y viện: Xin thuốc cho <con> (bạc) · Cầu xin ngự y cho <con> (Sủng)
- home deck: Thức trông <con> (Sức)
- NPC mother (jagacts2 AGC2): kidHeal (Sức) · kidMed (bạc) · kidAsk (Sủng) · kidWatch (Sức)

#### Q1 Sức tối đa by illness stage (Lao phổi; her Sức set to 99 first)
base cap (well): 100
| stage | her Sức tối đa | her Sức after render | NPC Sức tối đa |
|---|---|---|---|
| nhẹ | 85 | 85 | 85 |
| nặng | 60 | 60 | 60 |
| nguy kịch | 35 | 35 | 35 |

page errors: 0


### Tests
- dev/test/illness-cure.test.js (Fold 755x1000 + iPad 1180x820): ALL OK, incl. r3: Q1 cap by stage (her + NPC, lifts when cured, follows the BAL key, HUD + Sức row), Q3 first hit never kills (300 trials, any size), already-ốm child can die, epidemic / fever / kidsMonth / ILL-book child all give the sign, NPC child same, Thái y viện bạc + Sủng roads same gain + greyed reason, home «Thức trông», NPC kidAsk pays Sủng, the child card opens once with roads + odds words, no %.
- MUTATE (built page): cap off → 9 FAIL · no sign → 9 · no kid Sủng road → 4 · no kid card → 3 · epidemic old path → 3 · NPC kidAsk off → 9 · no Thức trông → 3; clean → 0.
- one-core-guard / one-core-text / one-core-bind / one-core-text-rule: PASS.
- ag-all.test: 6 FAIL — the SAME 6 on base 261d91f1 (day plan / perf p95 / Emperor plan) → pre-existing.
- door-onetap: run 1 FAIL 2 («door word worse than best: hau», «tier row ran nothing: P9» — random-state flakes), rerun PASS; base PASS.
- kit-std-scan (REPORT_ONLY, Fold + iPad): X02 20 · X06 12 · X08 6 — identical on base (pre-existing); 0 page errors.
- quickcheck c1c5cb0e: QUICKCHECK PASS (open 2165 ms, old save loads + plays a buổi, perf new/live render 283/301, tab 469/472, buổi 1582/3211, tasks>200 29/31) · TIME-SPILL PASS · CORE GATES FAIL only G4 94-q-softlock: iPad person tap covered by div.kring-band (realtap DEAD BUTTON) → the view never opens; flaky on BOTH: branch reruns 4 / 0 fails, base 261d91f1 reruns 7 / 0 fails.
- Shots (outside git, /home/user/wt/ic-shots): fold/ipad 1 ill card (HUD Sức 60/60, «Còn bệnh thì Sức tối đa chỉ 60»), 2 nặng back, 3 child card «<con> lâm bệnh».


## r4 (Foreman C 4-1-1-1, MAIN 186 04:36Z + Foreman E) — RV READY (BIG) 3185acbb on LIVE 5ad52416
Session ILLNESS-CURE-3 session_01PEhRbtbBbshrnnUWtz5oyX, depth 4, START_CTX ~3 %.
PRIORITY #1 CHECK ('catchIll|illAlarm|srvCards|srvHud2|srvIllWorld|Tâm bệnh'): OD 28/11 02:20Z MAIN 185 rulings + MAIN 186 order | main 5ad52416: j13 catchIll (10+ callers: j13 month, jemoact mood, jmort grief/age, jkh, jweather, jworld, jworld2), j42 srvCards / srvHud2 / srvIllWorld (her own illness left out of the month roll in a maid life), no fall-ill card | review/illness-cure c1c5cb0e (built on) | claims ILLNESS-CURE (this item).
KIT CHECK: reuses DOOR.card + kitHand (the same illness tier card), the hud2 «ill» chip builder (c() in srvHud2 = the consort chip; k3 top bar reads it), deck cards (illCards), optLine kit line (main E-GAIN3-LIVE). No new UI part.

### (3) Merge LIVE 5ad52416 (commit ea3bed19)
- Conflicts: index.html / sw.js (rebuilt) and jone deckM / deckTap: main (E-GAIN3-LIVE) now gives the member line via optLine and rows {c, hint}; taken as main. Main also defines a second DOOR.lineOf (string → string) AFTER my r1 export, so my DOOR.lineOf(a) callers got "[object Object]": my export removed; jillcure now builds its rows exactly like main's deckTap (optLine, c, hint); illness-cure.test reads optLine too.

### (1) MILD illness is never HUD-only (commit 3185acbb)
Repro on the branch: the chip path was fine (39/39), but (a) NO card opened when she FELL ill — the alarm fired only at nặng / nguy kịch, so a mild illness (Tâm bệnh never reaches a death roll) lived on the HUD only; (b) a CUNG NỮ had no illness chip at all (j42 srvHud2 rebuilds hud2 without «ill»), no cure road (srvCards holds none → bare notice) and false words (month odds, while j42 srvIllWorld keeps her out of the month roll: her illness never heals nor worsens by itself). Lead (e) checked: law 2 binds a bạc road to a matching road; nhẹ / vừa have no bạc road, nặng shows both (r2) — no change.
Fix (jillcure + one line j42):
- catchIll wrap: the moment SHE falls ill (any illness, every path), illAlarm → the illness card opens by itself once when the screen is free (danger words + tier roads).
- cung nữ: chip «<bệnh> · <stage>» in srvHud2 (same chip, top bar reads it); srvCards + illDeck give her the servant's real roads: Tĩnh dưỡng (nhẹ) · Tự bốc thuốc (nhẹ, Y thuật) · Sang Thái y viện xin thuốc (vừa, Sức) — no thái y summons, no Sủng plea, no bạc road (law 2 n/a); her danger line says the truth: «Thân cung nữ không ai lo thuốc thang: bệnh không tự khỏi, cũng không tự nặng thêm. … Phải tự chạy chữa.»

Family scan (law 11) — NEW dev/tools/illness-sign-scan.js: 13 illnesses × 3 stages × 3 lives (Hành sự / lãnh cung / cung nữ) = 117 cases; L = LIVE 5ad52416, B = branch before r4 (ea3bed19), A = after (3185acbb):
| Life | Stage | shown L/B→A | card opens by itself L/B→A | chip tap → roads L/B→A | danger words L/B→A |
|---|---|---|---|---|---|
| hs | nhẹ | 13/13 → 13 (of 13) | 0/0 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| hs | nặng | 13/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| hs | nguy kịch | 13/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| cold | nhẹ | 13/13 → 13 (of 13) | 0/0 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| cold | nặng | 13/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| cold | nguy kịch | 13/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) | 0/13 → 13 (of 13) |
| srv | nhẹ | 0/0 → 13 (of 13) | 0/0 → 13 (of 13) | 0/0 → 13 (of 13) | 0/0 → 13 (of 13) |
| srv | nặng | 0/0 → 13 (of 13) | n/a/n/a → n/a (of 13) | 0/0 → 13 (of 13) | 0/0 → 13 (of 13) |
| srv | nguy kịch | 0/0 → 13 (of 13) | n/a/n/a → n/a (of 13) | 0/0 → 13 (of 13) | 0/0 → 13 (of 13) |

Summary: LIVE gaps 117/117 · before 65/117 · after 0/117 (no % anywhere; law 2 bạc ⇒ non-bạc in the same tier: 0 breaks). Cung nữ nặng / nguy kịch sign = n/a: her illness never moves up (srvIllWorld).

### (2) Year-1 deaths (Foreman E b88 Kiết lỵ / b120 Lao phổi, age 18–19, no cure taken)
Numbers on the branch (page sim, real j13 illMonthP + jbal2 + jmort rolls, treat(), 3000 trials, rank-1 start: bạc 160, Sủng 8, Sức 80, age 19):
- Payable roads for that start: Truyền thái y (bạc 40, khỏi 55) · Cầu xin ngự y (Sủng 4, 55) · Sang Thái y viện xin thuốc (Sức 8, 40) · Tĩnh dưỡng (free, 20). With bạc 0 and Sủng < 4 she still has Tĩnh dưỡng + xin thuốc.
- Untreated monthly (BAL): Lao phổi khỏi 15 · trở nặng 30 · nguy kịch death 53 (j13 die3 25 × jbal2 illDie 2 × jmort); Kiết lỵ 30 · 25 · 28.
- Caught at nhẹ, death within 12 months: Lao phổi no cure 34.8 % · ONE free Tĩnh dưỡng a month 2.2 % · two 0.3 %; Kiết lỵ 9.4 % · 0.7 % · 0.1 %.
- Warnings before a death can roll: card when she falls ill (NEW r4) → card at nặng → card at nguy kịch + one full month with no death roll (r1) = at least 3 cards and ~3 months (≈ 36 buổi) to act.
Answer: on LIVE those heroines got no card at all; on this branch a rank-1 heroine with little bạc gets the card + words + a free road from the first day, so an early death now needs her to ignore three cards. I did NOT change the death numbers (law 16; OD:L2670 illness still kills). If MAIN wants law 5 softer at the start anyway, the one knob is BAL.illCure.die3 (or a rank factor on it) — for MAIN to rule.

### Tests
- illness-cure.test (Fold 755x1000 + iPad 1180x820): ALL OK ×3 incl. r4: mild Tâm bệnh fall-ill card (danger words + 4 tier roads, no %), opens once, the visible chip opens it, every illness at nhẹ gives the card; cung nữ: card by itself + true line + Sức cap, chip shown + opens, deck after a fresh deal = Tĩnh dưỡng + xin thuốc (no thái y / cầu xin). Test-only: the NPC «cầu xin» row now retries like the bạc row (roll(100) is capped — it flaked once).
- MUTATE (built page): fall-ill alarm off → 6 FAIL · cung nữ cards off → 2 · cung nữ chip off → 2 · cung nữ true line off → 2 · clean → 0.
- webkit-syntax: 477 modules, 0 parse-level hits. one-core-guard / -text / -bind / -text-rule: PASS. door-onetap: PASS.
- quickcheck 3185acbb vs LIVE 5ad52416: QUICKCHECK PASS (open 2316 ms, old save loads + plays a buổi, 0 errors; perf median new/live render 270/295, tab 563/544, buổi 2424/2988, tasks>200 33/35) · TIME-SPILL PASS · CORE GATES FAIL only G4 94-q-softlock = the known flake: alone on the branch 1 FAIL (iPad «view parked by a tab change»), LIVE 5ad52416 run at the same time 4 FAIL.
- Shots (outside git, /home/user/wt/ic4-shots, looked at): Fold + iPad — hs fall-ill card «Tâm bệnh · nhẹ» (4 roads, HUD Sức 80/85), cung nữ HUD chip «Lao phổi · nhẹ», cung nữ fall-ill card (2 roads + true line).
