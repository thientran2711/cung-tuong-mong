# one-core-dup3 — ONE CORE leftovers wave (review/one-core-dup3)

PRIORITY #1 CHECK ('one-core-dup3'): OD 0 new (ONE CORE OD:L1267) | ledger 0 | claims: this job only (B, 17/11 09:29Z) | main 0 | review/* 0 for evA/adj96/rtCard k/srvMerit/tinLv.watch moves (stack review/one-core-dup2-r2 → arcs-r2v → roads-r1 merged as the base).
START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate) → rollover at ≈ 29 %, ceiling 60 %. Finished below the rollover line; no successor needed.

Branch **review/one-core-dup3 @ b9f8d5cf** (site rebuilt). Base: origin/main 9391f9a9 + review/one-core-dup2-r2 069188d7 (fd78888b) + review/one-core-arcs-r2v 6b2ab41b (8ee6d37f) + review/one-core-roads-r1 75bc9f05 (190bcf1e). main has not moved since (checked at push).

## 0. Merge notes (base)
- dup2-r2 × main: 12 code conflicts, all "main's trait refactor (nv() / BAL.net.k …) vs dup2's BAL cuts" → token-merged (main's reads + dup2's BAL.loy / wit / tinhLv / eff keys). dup2's dead-copy deletes kept (j10 sentPen / confessRisk / bribeServ — live copies in j29; j24 danger — live in j28). Generated files (index.html, sw.js, assets.json) main's, rebuilt at the end. assemble list = main's + jbaleff + jbalarc.
- arcs-r2v, roads-r1: generated files + baseline only (as the brief said).
- Post-merge guard found 4 new copies in **main's show-why code** (not from the stack): j8 nx + j75 rival night typed `[1,0,-1,-2]` (= BAL.night.mood) → read BAL.night.mood; jwhyn night words typed 6 / 3 → BAL.nightEnd.warm / normal, prep words 2 / 1 → new BAL.cut.nightPrep [1,2] (cfebbf41). Baseline 7475 → 4730 (= post-roads count).

## 1. Items
| # | item | result |
|---|---|---|
| 1 | road amt / e67heir after roads-r1 | recount: **0 left** (the 7 approved e67heir sites jend14 ×6 + jrd_thd ×1 read G[] / BAL.road.end.keHeir already; guard amt has no road entries) |
| 2 | guard kinds e67merit / e67srvUp / srvMerit | added to amt (+ amounts typed `.5`, NUMA); ONE `--update --allow-grow` 4730 → 4740 for exactly the newly seen sites (a05d5fc9): j42 srvMerit(.25)×3, (.5)×3, (1)×2, (3)×1, jrd_cnv e67merit(8)×1 — every one exists on origin/main (main counts 3/3/2/1, e67merit(8) 2 on main, one already moved by roads-r1). Then moved (91b16477): j42 → BAL.eff.j42.merit{Mis,Rec,Sweep,Tea,Nvp,Rite,Books} + srvErrandDone_2 / srvDoOrder_2, texts «công lao +0.25 …» print them (balSg); jrd_cnv lmmRk → BAL.road.cnvMaMerit. Baseline back to 4730 |
| 3a | evA / evStory evidence | guard amt sees evA / evStory: **161 typed sites / 49 modules**, all moved in the same commit (no grow): BAL.eff.<module>.ev<Site> (dev/measure/one-core-dup3-ev-move.js); the wipe −99 (7 sites) = ONE key **BAL.evWipe**. 89 texts print them («chứng cứ +1», «nắm 2 chứng cứ», «−1» kept as unicode minus) |
| 3b | j96 adj96 heat | 77 typed `adj96({h,t,sus,ev,rise,lt})` → **BAL.arc.h96**.<arc>.<beat>[option] / .E.<ending> / .month (jbalarc.js; dev/measure/one-core-dup3-h96-move.js); ternary amounts stay ternaries on [a,b]. New guard kind **h96** |
| 3c | maid / kid typed amounts (whole family) | person-stat writes `x.loyal / tin / tal / hp / fond / me ± N`: **125 sites / 40 modules** → BAL.eff.<module>.<stat><Site> (dev/measure/one-core-dup3-stat-move.js; the sign stays typed in the code, the stored amount is positive) + tsbLoyal(±N) ×3 + relDo(G,N) ×3 (guard amt sees tsbLoyal / relDo). ~110 texts print them |
| 3d | jroute rtCard khắc | 30 card costs (rtCard / step / mk) → **BAL.route.k.<card id>** (dev/measure/one-core-dup3-rtk-move.js). New guard kind **rtk** |
| 3e | jlost:242–243 LO.act texts | print `LO.act.duc` and **BAL.loyalCost** (lazy: get x / aoLz — jecon loads after jlost) |
| 3f | jkc «${maid} thiện cảm -5» | already prints −BAL.eff.jkc.mzL (dup2-r2); wording kept (VANPHONG L53). No other typed copy in jkc |
| 4 | one-core-bind LIMIT (same-option swap) | new SWAP pass: a text tied to a branch (AOUT pair element 0 win / 1 lose; option wt:[…] / lt:[…]) must print a key whose rule read sits on that branch (inside if(roll…) = win; its else / code after `if(roll){…return}` = lose; ok:()=> win, no / fail / bad:()=> lose; `!roll` swaps). Plant: AOUT.ally f_2↔f_3 → **CAUGHT** (both texts). Real one found: jtsb AOUT.batnat lose text printed tsbBulNpc_3 (the «làm nhục giữa đường» path) for the «kể khắp nơi» outcome → tsbBulNpc_4 (same value 12 today) |
| 5 | jroute 89/95 «Chủ tin 60+» | watcher (jtin, live) reads 60 twice → **BAL.tinLv.watch** 60; jroute ×2 prints it. Text and rule AGREED at 60 today. |

## 2. Text ↔ rule DISAGREEMENTS found (fixed: the text now prints what the rule applies)
1. **jlost «Sai cung nữ thân tín lấy đồ»** (laydol x + AOUT.laydol): text said «lòng -10», the rule (jlost loSteal self / jecon bribel) takes **BAL.loyalCost = 25** → now prints 25.
2. **j22 «Hẹn gặp riêng»** lock text said «lòng 60+» only, the live watcher (jtin) also needs Chủ tin 60 → now «(lòng 60+, Chủ tin 60+)» as jroute says (wording added — please check against VANPHONG).
3. jtsb AOUT.batnat printed the wrong site key (same value) — item 4.
4. j24 / jhouse / j10 servant «Thưởng / Phạt / Tha / Tra khảo / Che chở» rows typed lòng ±N for rules in j24 judgeServ / j10 servAct: now print those keys (values equal today).
Proof lists 1 and 2 as INTENDED (jlost ExpressionStatement + TryStatement, j22 talkOpts).

## 3. Guards / tools changed
- dev/test/one-core-guard.js: amt += e67merit, e67srvUp, srvMerit, evA, evStory, tsbLoyal, relDo; amounts typed `.5`; a `roll(N)` inside the call is an odds, not the amount (evA(v,t,roll(40)?…) — the old jkc kcAf(t,roll(50)…) entry was this false hit); new kinds h96, rtk; **every declared kind is frozen even at 0 sites** (before: a 0-site kind could be frozen later by a plain --update with whatever count appeared).
- dev/test/one-core-text.js: loads jbalarc.js (BAL.arc had no values: arc refs were never checked) and jecon's BAL tables; reads `x.p-BAL…` as a negative amount; a person-stat amount is not the number after another stat's word («Sức -15»); «nắm 2 chứng cứ» beside an ev amount counts.
- dev/test/one-core-bind.js: SWAP pass (item 4).
- dev/measure/one-core-dup2-same.js: NS + eff / road / arc / route / night / net / evWipe; values from every BAL file; printed texts compared as words; number tables / amount objects put back; **RX word-bounded** (BAL.loyalCost was read as BAL.loy + "alCost").
- New movers: dev/measure/one-core-dup3-{ev,stat,h96,rtk}-move.js.

## 4. Before / after
Frozen list (one-core-baseline.json): 7475 (roads-r1) → 4730 after the merge (same as the brief's post-roads count) → +10 (the one allowed grow, item 2) → **4718**. Moved sites are mostly kinds the guard did not count before (evA, adj96, stat writes, rtCard k), so they do not show in the total; per-file frozen-list changes: j83 58→57 · jkc 199→198 · jlost 41→39 · jpet 78→77 · jpoison 25→24 · jrcp 41→40 · jroute 2→0 · jtsb 99→96.
BAL refs put back by the proof, per module (vs 190bcf1e = base after the 3 merges, 66 modules, **436 refs**): j96 88 · jroute 36 · j8 27 · j42 23 · j70 18 · j72 17 · j10 14 · j24 13 · jkc 11 · jtsb 11 · j7 10 · j95 9 · j71 8 · j78 8 · jmen 8 · j2 6 · j22 6 · j68f 6 · jcmaid 6 · jface 6 · jpet 6 · j83 5 · j9 5 · jrcp 5 · j67 4 · j68h 4 · j92 4 · jcycle 4 · jecon 4 · jtin 4 · jwhy 4 · jwhyn 4 · j25 3 · j68g 3 · jaudit 3 · jlost 3 · jtruth 3 · j14 2 · j23 2 · j28 2 · j29 2 · j30 2 · j40 2 · jpoison 2 · jstip 2 · 1 each: j13 j21 j34 j53 j75 j85 j95b jact jagent jcoopworld jeitem jexam jhouse jmem jpromsv jrash jrd_cn jrd_cnv jreign jstaff jthaiy.

## 5. Gates @ b9f8d5cf (code = 180cd85c + site build)
| gate | result |
|---|---|
| one-core-guard | PASS, 0 fails, inline 4718 = baseline |
| one-core-text | PASS, 0 sites, 0 early reads |
| one-core-bind | PASS, 734 prints, 0 mismatches (incl. SWAP) |
| proof one-core-dup2-same 190bcf1e | **SAME**: 66 modules, 436 refs, only INTENDED differ (owner-ruled words from dup2 + §2 items 1–2) |
| proof negative checks | BAL.eff.j42.meritTea 0.25→0.3 → FAIL j42 srvCards · BAL.tinLv.watch 60→61 → FAIL jroute rtTtCards + jtin watcher · BAL.arc.h96.tm96a.a1[0].h 10→11 → FAIL j96 ARC67.tm96a |
| guard plants | old j96 → NEW h96 numbers · old jroute → 30 NEW rtk · bind: AOUT.ally f_2↔f_3 → SWAP ×2 |
| quickcheck | PASS 337 s: core gates PASS (guard + rules-one-source + kit-conform + coop-one-world hook), time-spill PASS, open 1371 ms 0 errors, OLD SAVE loads + plays a buổi, perf median new/live render 306/288 · tab 371/377 · buổi 1065/1022 ms |
| coop-e2e | 62/62 PASS (live Worker) |
| road-rare | ALL PASS, no page errors |
| road-end | 51/51 PASS |
| coop-one-world | PASS (seeds; old room + single player ok) |
KIT FIRST: no UI part touched (only numbers inside existing texts / kit rows). No rule value changed (proof); the only player-visible number change is §2.1 (jlost 10 → 25, the rule's value).

## 6. Open / for Foreman B
- Typed texts beside NON-moved numbers stay in the frozen list (e.g. «Lòng cung nữ +8» = apply({maid:8}) fx, j24 «Đức -3», «nàng nắm 2 chứng cứ» from caught()). Not this wave.
- SWAP pass only judges texts with a recognizable branch (AOUT pairs, wt / lt) and reads under a roll / ok / no; anything else is «no verdict» (listed as a limit, not silent PASS).
- §2.2 adds «Chủ tin 60+» to the j22 lock text — a wording change for the reviewer to accept or reject.
<<<<<<< HEAD

## r1 FIX (review-one-core-dup3-r1 FAIL: evidence-count text family + gate gap)

PRIORITY #1 CHECK ('evidence count text'): OD 0 new (ONE CORE OD:L1267, START_CORE) | ledger 0 | claims B one-core-dup3 fix = this session | main moved 7e264081 → 65dcf52f (greet-meet) during the fix: merged | review/* review/one-core-dup3-r1 607887ae = base (no other branch touches these texts).
START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate) → rollover ≈ 29 %, ceiling 60 %. Finished below it; no successor needed.

Branch **review/one-core-dup3 @ 67430058** = 607887ae (review/one-core-dup3-r1, fast-forwarded) + d171d5f2 (code / gates) + f4030cbd (site) + b1d72314 (merge origin/main 65dcf52f) + 67430058 (site). Merge, leftovers 1–5, wording, SWAP of r1: untouched.

**Merge main 65dcf52f (greet-meet)** — conflicts j2 / j9 / j24 / assemble.py (+ generated). Main moved the person-dialog chat amounts into ONE table **BAL.talk** (read by her options AND the NPC mirror in jgreet) while the stack had moved the same sites into BAL.eff.j9.run…run_7 / BAL.eff.j2.go_2. Line-level 3-way: where only one side changed, that side; where both changed (j2 Khiêu khích; j9 Khen tài nghệ, Bàn tán, Chia sẻ bí mật, Cảnh báo): **main's BAL.talk wins** (one key per rule, no second key), the stack's now-dead keys removed from jbaleff (j9 run, run_2, run_3, run_4, run_6, run_7; j2 go_2); kept the stack's moves main did not make (Chia sẻ bí mật evA → BAL.eff.j9.evRun; Nhờ giúp đỡ run_5 / evRun_2; Tạ lỗi / Nhún nhường / Giúp đỡ run_8–12). j24 hostile visit: main's apHostOpts() + the stack's BAL.eff.j24.go_5 inside it. j25 «Bàn tán» wrapper printed the dead j9.run_3 / run_4 → now BAL.talk.gossip.miss / tellOan and chanceW(BAL.talk.gossip.tell) (was typed 50). assemble = main's (+ jgreet) + jbaleff + jbalarc. Baseline 4714 → 4708 (main's own moves). Proof vs f4030cbd + main: only j2 / j25 talkOpts (the merge lines above) + jgreet new file.

### 1. Whole-family scan
Scan = every dev/build/j*.js (not jbal*), case-insensitive: «N chứng cứ», «chứng cứ ±N», «chứng cứ <name / về X> ±N», «nắm thêm N»; then the new gate (§2) on the old tree as a second scan. Old tree 607887ae: **82 typed counts caught by the gate** + the ones it cannot link (listed). The reviewer's 76-line list was a subset: the gate found 8 more («chứng cứ về X +1»: j70 ×4, j72, jroute, j95, j95b) and the case-insensitive grep 7 more («Chứng cứ -1 / -2» cost rows in j78 evidenceActs, j68f/j68g results).

**Root cause found on the way:** dev/measure/one-core-dup3-ev-move.js took the LAST argument of evA / evStory as the amount, so every `evStory(t,N,"why")` (14 sites: j3 ×2, j4 ×2, j67 ×2, j68f, j68g, j7 ×6) and `evA(f,p,1+(…?1:0))` (j29) stayed typed — and the guard's amt pattern cannot see them (the number is not right before ")"). Fixed the mover (amount = 2nd arg of evStory, 3rd of evA; never reuse an existing key), moved those 14 to BAL.eff (no value changed, proof SAME), j29 by hand → BAL.eff.j29.evFireServ / evFireServ_2, and a new guard kind (§2).

### 2. Before / after (text → printed key = the key its rule reads)
| site (@607887ae) | before | after prints | rule |
|---|---|---|---|
| j17:66 CAUGHT (→ actLine of every ACAUGHT act; j63 / j79 match it) | «nàng nắm 2 chứng cứ» | caughtW(): balAb(BAL.eff.j8.evCaught) | j8 caught() |
| j63:253 kaCaughtTxt · j79:1010 fallback · j83:175 wkPoison · jpoison:70 · jlost:242, 243 | «nắm 2 chứng cứ» | BAL.eff.j8.evCaught | caught() (poison / loSteal call it) |
| j17:70 spy · jaudit:87 · j70:427 | «chứng cứ +1» | BAL.eff.jtruth.evN | spyFind |
| j17:70 rumor · jaudit:89 | «nắm 1» | BAL.eff.j8.evF | A("rumor") |
| jaudit:90 frame | «nắm 1» | BAL.eff.j8.evF_2 | A("frame") |
| j17:72 bribe | «(chứng cứ +2)», «nắm 1» | j8.evF_3, j8.evF_4 (aoLz pair) | A("bribe") |
| j17:72 block | «nắm 1» | j8.evF_5 | A("block") |
| j17:75 plant · j8:475 | «nắm 2» | j8.evPlantItem | plantItem |
| j2:148 · j78:114 · jsgame:247 (overhear) | «chứng cứ +1» | j78.evTop | overhear (j78's live copy) |
| j21:17 spy note | «thêm 1 chứng cứ» | ${v.ev-e0} (the real gain) | doAct spy |
| j22:25 | «nắm 1» | j22.evGo | flirt go |
| j25:11 | «nắm 1» | j9.evRun | j9 «Chia sẻ bí mật» |
| j29:47 fireServ | «chứng cứ +1» (rule gave 1 or 2) | balSg(g), g = evFireServ(+evFireServ_2) | fireServ (DISAGREEMENT fixed) |
| j3:70, 77 · j4:65, 122 · j67:367, 714 · j68f:65 (×2) · j68g:76 · j7:18, 31, 35, 90, 155, 173 | «+2 / +1 / nắm 2» | the new BAL.eff.<m>.ev* of the same go | evStory (moved now) |
| j15:65 · jhouse:49 «Hỏi chuyện» | «chứng cứ +1» | j10.evServAct_2 | j10 servAct hoi |
| j42:268 | «chủ nắm 1» | j42.evN | srvDoOrder spy |
| j70:229 · 231 · 250 · 256 | «+1 / +2 / +1 / nắm thêm 1» | j70.evExec70 · evExec70_2 · evNewPlot70 ×2 | exec70 (foil / trap) · newPlot70 |
| j72:104 | «+1» | j72.evQ72End | q72End |
| j78:113 · 115 · 127 | «chứng cứ +1» | j78.evN · j78.evN_2 · j2.evRun | j78maidSpy · fallen talk · chest run |
| j78:185, 187, 188, 189 evidenceActs costs + j78:167 actLineRaw `use` table | «Chứng cứ -1 / -1 / -2 / -1», table 1/1/2/1 | j30.evF · j78.evF · evF_2 · evF_3 (table reads -key) | tocao · trinhth · trinhhh · uyhiep |
| j78:189 · jaudit:35 (sent servant confesses) | «nắm 1» | j9.evN | runAct |
| j83:225, 226, 227, 239, 245 | «2 / 1 / 2 / 1 / 1» | j83.evIllBuy_2 / _3 / _4 / evIllBuy ×2 | illBuy |
| j92:348 | «tốn: 1 … đã tra xét» / «tốn: 1 … về» | jlost.evLostEvUse (new, -1) / j92.evSpendEv | lostEvUse / spendEv |
| j92:353 | «nắm 2» | j92.evWdFrame | giahoa |
| jlost:175, 176, 177, 186 | «thêm 1» | jlost.evLoEvAdd | loEvAdd (its c.cev counter now reads it too) |
| jcoopworld:801 | «nắm 1» | jcoopworld.evBriber | P2H.briber |
| jecon:159 bribel | «1», «nắm 1» | jecon.evF, evF_2 | A("bribel") |
| jgift:28 | «nắm 2 …, quý ngươi -25» | j8.evGiveTo, j8.giveTo | giveTo |
| jpet:28 · 184 · 212 | «1» | jpet.evPetMonthOf · evGo · evF | petMonthOf · mangift · thaopet |
| jpoison:85, 86 | «ngươi nắm 2» | jpoison.evFound | found |
| jthaiy:166 | «nắm thêm 1» | jthaiy.evNpcMonth | npc month |
| jtruth:117 | «tốn: 1» | jtruth.evGo | Trình chứng cứ |
| jtsb:57 · 78 · 125 (+ result line) · 139 · 146 | 1 | jtsb.evF · evF_2 · evGo · evGo_2 · evGo_3 | thathu · phonghoa · soát · giao · đáp trả |
| jwhy:68, 74 · jhouse:38 (maid spy) | «chứng cứ +1» | j78.evN | j78maidSpy (the live path of spyMaidRun) |
| jroute:90 · j95:415 · j95b:222 | «+2 / +1 / +1» | jroute.evRtSeen[1] · j95.evJ95hold · j95b.evJ95bTrace | rtSeen · j95hold · trace |
| j8:175 item chungcu | «chứng cứ +2» (beside evi:2) | getter prints this.evi | item table |
| jdress:60 | replace("chứng cứ +1 ·") | regex on the printed number | (spy text) |

**Not a copy (left typed, with reason):**
- thresholds «cần N chứng cứ» / «N chứng cứ về nàng (có …)» / «Gom 3»: j6:26 · j8:97 · j15:33 · j30:24, 25 · j79:720, 721 · j4:60 (requirement lines; the rule's `evG(...)>=N` is a typed threshold — guard family, not an ev amount).
- quest / tham-ô counters typed in their OWN rule (no ev amount): j14:11 (S.coldEv+1, «/2»), j4:24 (st.proof++), j4:120 (S.caseEv-1), j55:65, 73, 176, 204 (deA tham-ô ledger ±1). → follow-up wave: move these counters into BAL (one-core-guard owns typed rules).
- kit sample page demos: jgrey:37, jksize:171, jopic:212 (example rows; no rule).
- comments: jcycle:13, 14, 46 · jwhy:51 · j79:90 · j87:439.
- word numbers («một / hai / ba chứng cứ»: j4:65, j67:887, j72:361, j78:143, jchap:29, 32, jecon:159 spyk, jk2b:244, jrd_muoi:429, jrd_td:169, 970, jrd_thd:644, jrd_tt:411, jtruth:77): the digit rule does not reach them; changing «một» → a printed digit is a wording change → for Foreman B / VANPHONG.
- Seen, not this family: jwhy:68 «Lòng ${m.name} -5» + `l:{maid:-5}` (loyal, not evidence).

### 3. Gates changed
- **one-core-text** new EV pass (scanEv): a typed count in a player text (templates read whole, ${} = {}) — signed after «chứng cứ» (a name / «về X» between allowed) or unsigned before it after nắm / thêm / tốn / dùng / trả lại / ( / : — FAILS when it equals an ev amount (BAL.eff.<m>.ev*) read in its module, its linked acts (BIND.linkMods) or the functions its option's callbacks call (go / run / open / ok / fail …, not the property holding the text); a caught / confession sentence also vs BAL.eff.j8.evCaught and j9.evN. Skips thresholds and a counter rule beside it (same number, no ev read). Old tree: 82 sites; plant j22:25 «nắm 1 chứng cứ» → **CAUGHT**; plants j17 caughtW «nắm 2» and j78:189 «nắm 1» → CAUGHT; restored → 0. LIMIT (no verdict): a preview with no code link to its rule (j15:65 data-sv button → j10 servAct; jgift preview → j8 giveTo): both fixed by hand above.
- **one-core-guard** new frozen kind **evn** (evStory 2nd-arg amount, evA expression amount starting with a number; 0 = a mark, not counted): 0 sites; plant old j7 → NEW evn ×6 FAIL. Baseline 4716 → **4714** (j3 / j4 «chứng cứ Hoàng hậu +2 / +1» counted as t.stat).
- **one-core-bind**: table handlers (P2H.briber=…) indexed by name for «previews:» comments; a helper whose roll is the other side's (`/* roll-side: catch */` in j8 caught()) gives no win / lose branch (jlost AOUT lose text «bị bắt: nàng nắm N» printed caught()'s key and was a false SWAP). Cross-function previews declare their rule with the existing `/* previews: fn */` comment (bind checks fn reads the key): caught, illBuy, q72End, exec70, newPlot70, spyFind, briber, petMonthOf, giveTo, j78maidSpy, runAct.
- dev/measure/one-core-dup3-ev-move.js: amount argument fix + no key reuse. one-core-dup2-same: r1 INTENDED shape changes listed (below).

### 4. Gates @ 67430058
| gate | result |
|---|---|
| proof one-core-dup2-same HEAD(607887ae) @ d171d5f2 | **SAME** 39 modules (r1 INTENDED: j17 caughtW / AOUT / actLine, j21 doAct, j29 fireServ, j63 rvGroups, j78 actLineRaw, j79 / jdress IfStatement, j8 IT / jpet PET getters, jlost lostEvUse) |
| proof 190bcf1e + main @ 67430058 | 78 modules, **459 refs** (436 + 23 new), fails only j2 / j25 talkOpts (merge, above) + jagmaid / jgreet new files (main's) |
| one-core-guard | PASS, 4708 = baseline; evn frozen at 0; plant old j7 → NEW evn ×6 |
| one-core-text | PASS 0 sites (old tree: 82); plants j22:25, j17 caughtW, j78:189 → CAUGHT |
| one-core-bind | PASS 820 prints, 0 mismatches; SWAP plant AOUT.ally f_2↔f_3 → CAUGHT ×2 |
| quickcheck @ 67430058 | PASS 280 s: core gates PASS, open 1292 ms 0 errors, old save loads + plays a buổi, perf new/live render 255/259 · tab 341/335 · buổi 1090/887 ms |
| greet_check (main's) | ALL 13 PASS |
| coop-e2e | 62/62 |
| coop-one-world | PASS |
| road-rare | ALL PASS |
| road-end | 50/51: the 1 FAIL is «no page errors: r.updateLocalTransform is not a function» (Pixi) — **the same on the base 607887ae** (50/51, same error, run here); one earlier rerun also hit a random thd/son L1 ke14 roll (passed on the other runs) |
| Fold 755x1000@2 · iPad 1180x820@2 | load 0 page errors, no h-overflow; caughtW / AOUT.bribe / laydol / IT.chungcu / actLine("rumor") print the same words as before («nàng nắm 2 chứng cứ» …) |

KIT FIRST: no UI part touched (only the digit inside existing texts becomes the key). No rule value changed (proof); player-visible changes only where the text was WRONG: j29 «chứng cứ +1» now shows +2 when the rule gives 2; j21 note shows the real gain.

### 5. Open / for Foreman B
- Follow-up ONE CORE wave: quest / tham-ô counters typed in their own rules (j14 S.coldEv, j4 st.proof / S.caseEv, j55 deA ±1) and the evidence thresholds «cần N chứng cứ» (evG(...)>=N typed in j6 / j8 / j15 / j30 / j79).
- Word numbers «một / hai / ba chứng cứ» (14 lines, §2) — wording decision (VANPHONG) before printing a digit.
- road-end Pixi page error «r.updateLocalTransform» exists on main's stack already (not this branch).
- Gate LIMIT: a preview with no code link to its rule (data-sv button, gift preview) is no verdict in the EV pass; both such texts fixed by hand.

=======
>>>>>>> 942503ed (report voice-trait part 1 (engine + 5 situations, split proposal))
