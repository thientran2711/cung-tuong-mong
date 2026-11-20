# person-minigame-acts — BIG REVIEW E22r (opus) — VERDICT r1: FAIL (6 fixes) · r2: FAIL (2 fixes) · r3: PASS 5bf16c29 (see ROUND 3 at the end)

depth 6 · START_CTX ~3 % of 1M window (roll at ~28 %, ceiling 60 %) · session_01DgYSWkkEFYdpG7opFYFx8H · reviewer for FOREMAN E #15 session_01DgYSWqC1epTFkkxGoFxqYW
PRIORITY #1 CHECK ('person-minigame-acts|E22r|pm-rank'): OD 2 | ledger 0 | claims 8 | main 1 | review/* 1 (review/person-minigame-acts = under review) | archive 0 (brief line; re-checked: no other branch builds pm acts; reuse of j82 startContest/playArt, jmgt occ, jrcv RCVK/rcvPick, jagacts3 agReg/p3O, jcoopworld ASK, jmem, goSee/actMove confirmed in the diff).
18 LAWS read (START_CORE top). Laws touched: 1, 2, 3, 4, 5, 6b, 6c, 7, 9, 11, 12.

Under review: review/person-minigame-acts @ fd5dd5ae. LIVE merge: local branch review/person-minigame-acts-r1 = fd5dd5ae + merge of origin/main 94c3bddc (mg-ready-guide) @ 5ae180c (conflicts only index.html / sw.js → rebuilt by dev/site/build_site.sh). NOT pushed (FAIL).

## Results after the LIVE merge (5ae180c)
| check | result |
|---|---|
| dev/test/person-minigame-acts.test.js | PASS 23/23 (incl. (6) NPC → her ≥ 4 and NPC → NPC ≥ 4 over 200 buổi, (7)/(7b) co-op stub) |
| role-parity.test.js ×2 | ALL PASS both runs, outputs byte-identical (md5 b9bbde2a…, = E22b's), open list 17 |
| receiver-choice.test.js | ALL PASS |
| pm-equal.js (law 2) | ALL WITHIN TOLERANCE (stakes, duel answers per rank, pastime spread 6.7 ≤ 8, 19 real items max |price − V| 4) |
| pm-rank.js (law 5) | stake V 6 → 26 rises ok · her board raw falls ok · chance vs real NPCs noisy (n=1–2) = print only, foreman ruling (1) accepted |
| ag-mgcal.js | 1st run FAIL step 3 «order:false» (step 3 picks an uncalibrated kind at random, 1916abd); re-run ×2 PASS → flaky probe, not this branch (no jmgcal / jmgt change in the diff vs LIVE) |
| mg-ready-guide.js | PASS 9/9 |
| one-core-guard.js | PASS (fails 0; inline 3837 ≤ baseline 4212) — the 2 law-4 faults below are rule copies the guard cannot see |
| quickcheck.sh | PASS · open 1595 ms · old save loads + plays · perf new/live median render 163/180, tab 380/370, buổi 977/953 ms, tasks>200 17/17 · core gates PASS (one-core, rules-one-source, kit-conform, co-op one-world) |
| mg-ready-guide on the pm path | OK: both the duel (startContest) and the pastime (playArt) open through kg82 → kgReady: rules screen, «Sẵn sàng» (clock starts on tap), «Hướng dẫn», «Để tài nghệ quyết định» (shot ipad-5) |
| Shots Fold 755x1000@2 + iPad 1180x820@2, looked 3× | Hậu cung «Gặp mặt» act cards (kit act card, same as «Mời nàng ta sang cung»), the Dư đồ person popup, art pick, stake pick (3 kit option cards), duel rules screen, her challenge card (Nhận lời / Nhường bề trên / Từ chối). No page errors, no horizontal overflow. Scratch /home/user/wt/e22r-shots (not in git, CDN not used). |

Law by law: 1 two-way — her→NPC, NPC→her, NPC→NPC OK; co-op NOT OK (fix 1, 2). 2 equal value — OK (measured). 3 gain+loss — OK on every answer; hidden walk cost on her invite card (fix 5). 4 one core — two breaks (fix 3, 4); no other hand-typed rule number in jpma (7 = the queen rank idiom of j1/j15; 100 / FNV constants are arithmetic). 5 — OK (board d and stake rise with the higher rank; ruling (1)). 6b — NPC→NPC at the target's place (agAt), NPC→her = word sent + she walks (actMove), results in jmem / ledger, gapW respected: OK. 6c — bạc / Danh conserved (test), item moves with ilLog «pm»: OK. 7 — no %, ladder words only; two wording faults (fix 6). 9 — kit parts only (pcard act cards, kit option cards, pbtn); no private CSS: OK. Old saves — new fields optional (S.pmM, S.pmGo, S.pmMeW/L/N, v.pmW); quickcheck old-save load (see tail).

## FIXES (each as the whole family, law 11) — to E22b session_01DgYSWoYY7zGXksmV7kUEHx via the foreman
1. CO-OP ASK LOSES HER CHOICE (law 1, 6c; brief item 6). The chosen game + stake (x = {a,kind,ak,n,s}) rides only in the in-memory CW.acts[id] (dev/build/jcoopworld.js:453). The part-D carriers do not carry it: host offer D.kind("inv",{id,k,item,who,v,he}) (jcoopworld.js:456), guest offer doSend("inv",{id,k,item,e}) (:457) → T.onDo("inv") → PEND.thInv pp (:1113, :1085) → invHer(pp,ok) (:1091) passes extra = an item index only; the host-reload rebuild in invRun (:553-556) the same. ACT.pmplay/pmduel.f (dev/build/jpma.js:170) then falls back to pmX(a,t,act) = the receiver's FIRST art + the first stake that is ok (bạc): a guest who picked «Cược thể diện» on Cờ plays Cầm for bạc. Family: every ASK key whose extra is data, not an item index — carry x in the old-relay act message, both D.kind/doSend inv payloads and the pp, use it in invRun + invHer; test host→guest and guest→host with part D on and after a host reload (art + stake kept).
2. THE FRIEND'S CARD SAYS NOTHING (law 1 role parity, law 3, law 7). jcoopworld askWhat (:390) + onAct (:521) + PEND.thInv (:1085): «… thách ngươi so tài một ván, hai bên đặt cược ngang giá» with «Nhận: hảo hữu tiếp tục việc ấy» / «Từ chối: không nhận» — no game, no place, no stake of either side, no ladder word, no được/mất. The NPC's card to her (RCVK.pmDuel line + pmDuelOpts, jpma.js:114-128) shows all of them. Build the friend's options from the SAME previews (pmPlayOpts / pmDuelOpts x texts, as pmCoopYield already does for «Nhường bề trên», jpma.js:120) — one card text for NPC and friend.
3. NPC ART PRACTICE IS A COPIED RULE (law 4, law 1). jpma.js:69-70 pmXp re-types the j2 addArt level loop (5, +2) for NPCs and skips what the shared NPC rule addArtP (dev/build/j85.js:129) gives at a level-up (stat +2, Danh at 3/5, ARTB85 bonus, the công virtue bonus). Fix: pmXp(p,ak) → addArtP(p,ak,B().play.xp) (her side already uses addArt).
4. RECEIVER WEIGHTS READ AN UNRELATED CONSTANT (law 4). dev/build/jbal2.js:1649 BAL.rcv.k.pm = help weights with slot 3 × BAL.mgTier.occ.hoc[0] (the lesson board base, = 0) used as an off-switch: a board tweak would change receiver choice. Give it its own BAL key (e.g. BAL.pm.rcvOn=[1,1,1,0]; BAL.rcv.k.pm = BAL.rcv.k.help.map((w,i)=>w*BAL.pm.rcvOn[i])), one-core-guard green.
5. HER INVITE CARD HIDES THE WALK (law 3 shown cost; go-in-person OD 18/11 ~19:55Z). On RCVK.pmPlay / pmDuel (jpma.js:111-118) «Nhận lời» walks her to the asker (pmRun actMove, :99) but TỐN shows «không» (duel) / «Sức −6» (pastime) — shot fold-6. Show the walk khắc (travel(S.place, whereOf(p))) and the walkBlock / walkLate reason on both cards, as pmBtns does (jpma.js:151-153).
6. WORDING (law 7, kit rows). (a) The unlabelled «nàng có thể từ chối / nhận lời hoặc từ chối» segment merges into ĐƯỢC: «hai bên quý nhau thêm nàng ta có thể từ chối» (Hậu cung card, shot fold-2; jpma.js:146-147, :154-155) — every pm x string: labelled segments only (move it to ghi chú or drop it). (b) Double full stop on the notice «… mời cùng chơi với ta..» (shot ipad-2: rcvAsk text ends «. » and the log / notice adds «.») — fix for all pm result / log lines (jpma.js:103, :106, :193).

Accepted as built (foreman rulings 20/11 01:22Z, not re-opened): law 5 vs same-level peer; NPC → her ≥ 4 / 200 buổi (measured 6–18); co-op auto-hand; «Nắm chắc» on sure answers. role-parity-exempt harm:pmplay / harm:pmduel = co-op carrier of cx3:pmPlay/pmDuel (reasons written; both sides hold the act) — accepted.

r2: fix on review/person-minigame-acts (merge LIVE first), then SẴN SÀNG KIỂM; the r2 reviewer re-runs the table above + a part-D co-op probe for fix 1.

## ROUND 2 (r2) — review/person-minigame-acts 12ad4b5 — VERDICT: FAIL (2 fixes)
E22r, depth 6, same session; FOREMAN E #17 session_01DgYSWoFXvbLeCE3SVSWgDG. PRIORITY #1 CHECK ('person-minigame-acts|pmCoopCard|rcvOff'): OD 2 | ledger 0 | claims 8 | main 1 | review/* 1 (this branch) | archive 0.
LIVE merge: local review/person-minigame-acts-r2 = 12ad4b5 + merge of origin/main 70bea3d3 (mg-noword-a + mg-visual) @ d0e86ca1 (conflicts index.html / sw.js only → rebuilt by build_site.sh). Not pushed (FAIL).

### The 6 r1 fixes
| r1 fix | r2 | check |
|---|---|---|
| 1 co-op pick lost | DONE | x rides in all four carriers (old relay act, host D.kind inv, guest doSend inv, PEND.thInv pp) and invRun (host reload) + invHer read it (jcoopworld askX); pmCoopX sanitises it. pm-coop-d.js 23/23 run with two real clients on the co-op worker: host→guest, guest→host and after a host reload the game + stake are kept |
| 2 friend's card | DONE | pmCoopCard = RCVK line + pmPlayOpts / pmDuelOpts; shot ipad-8: game, place, «Cược: Danh 5 mỗi bên», ladder word, được/mất on all three answers |
| 3 pmXp | DONE | addArtP (shared rule) — but see new fix B for the co-op friend |
| 4 rcv weights | DONE | BAL.pm.rcvOff=[3], BAL.rcv.k.pm from help weights; one-core-guard PASS |
| 5 walk on her invite card | NOT VISIBLE → fix A | the option data has it, the rendered card does not |
| 6 wording | DONE | labelled segments; one full stop (pmEnd) on every pm line |

### Suites after the LIVE merge (d0e86ca1)
person-minigame-acts.test 31/31 · pm-coop-d.js 23/23 · receiver-choice ALL PASS · pm-equal ALL WITHIN TOLERANCE · pm-rank stake rises, board falls, chance vs real NPCs now falls too (63.7 → 47.5) · one-core-guard PASS · ag-mgcal PASS · mg-ready-guide PASS 9/9 · role-parity ×2 + quickcheck: see the line at the end.
role-parity probe change (scan: asHitPick also for the Hoàng hậu and with every maid-palace target forced in turn): honest — it widens the NPC side the player side is checked against, adds no exempt and no open row.

### FIXES (whole family, law 11)
A. THE WALK COST STILL DOES NOT REACH HER CARD, AND THE CARD SAYS SOMETHING FALSE (law 3, law 7, go-in-person OD 18/11 ~19:55Z; r1 fix 5). jpma.js:110-111 pmWalkTx writes the walk as «đi sang <place> N khắc» inside the mất / tốn segment. Her rcvCard renders option text through the kit word mode (dev/build/jk2b.js:241-261): only a plain «N khắc» segment survives (:242); a phrase is matched against the stat rules, so a place name with a stat word is translated. Repro (new game, default card, she at home, the asker at Đức Thọ cung, travel 2): data «mất: Sức -6, đi sang Đức Thọ cung 2 khắc» → card TỐN «Sức −6 · mang tiếng ác» (the /Đức/ rule, :260); duel data «tốn: đi sang Đức Thọ cung 2 khắc» → card TỐN «không», ĐƯỢC «được tiếng hiền, có thêm bạc» (shot fold-7). Fix: put the walk as the kit-read cost «N khắc» (the place is already in the card line «… mời người sang <place> …»); scan EVERY pm option text (RCVK pmPlay/pmDuel, pmCoopCard, PEND.pmPick/pmStake, pmRows, pmBtns) through the same word mode at the default level in the test: the visible TỐN holds the khắc, and no stat word appears that is not in the option's effects (place names Đức Thọ, Khôn Ninh, … included).
B. THE CO-OP FRIEND NEVER GETS THE PRACTICE OF «CÙNG CHƠI» (law 1; I missed this in r1). pmPlayEnd → pmXp skips p.coop (jpma.js:72), and the co-op result has no art channel (jcoopworld.js:401-403 fsnap carries DK + rel + oan only). So only the asker's own device adds practice (addArt on her S); the friend who accepted gets none, while an NPC partner gets it (addArtP) and she gets it from an NPC. Fix: carry the practice to the receiver's own S (e.g. an art op in the result she applies with addArt, the fam/res path), both directions; test in pm-coop-d (receiver's artp rises by BAL.pm.play.xp).

Shots r2 (Fold 755x1000@2 + iPad 1180x820@2, looked 3×, scratch only): Hậu cung cards, art pick, stake pick, duel rules screen (mg-ready-guide), her challenge card, her invite card with walk (fold-7 = fix A), the friend's duel card (ipad-8). No page errors, no overflow.
Role-parity ×2 ALL PASS, outputs byte-identical (md5 b9bbde2a…). QUICKCHECK PASS · open 1360 ms · old save ok · perf new/live render 225/212, tab 449/458, buổi 992/1221 ms, tasks>200 19/18 · core gates PASS. All suites green; FAIL is on fixes A + B only.

## ROUND 3 (r3) — review/person-minigame-acts 42dba2ac — VERDICT: see last line
E22r, depth 6, same session; FOREMAN E #17 session_01DgYSWoFXvbLeCE3SVSWgDG; worker E22f. PRIORITY #1 CHECK ('person-minigame-acts|pmWalkLine|pmArtIn'): OD 2 | ledger 0 | claims 8 | main 1 | review/* 1 (this branch) | archive 0.
LIVE merge: review/person-minigame-acts-r3 = 42dba2ac + merge of origin/main 66bd36cd @ 5bf16c29 (conflicts index.html / sw.js only → rebuilt by build_site.sh).

| r2 fix | r3 | check |
|---|---|---|
| A walk cost on her card | DONE | jpma pmWalkTx = plain «N khắc»; place + «tới nơi buổi sau» in the card line (pmWalkLine). My r2 repro re-run on the rendered card (new game, default word mode, she at home, asker in another palace, travel 2): duel TỐN «2 khắc», line «Nhận lời thì ngươi đi sang chỗ nàng (đi đường 2 khắc) rồi thi ngay», no invented stat words. New dev/test/pm-wordmode.test.js scans every pm option family through the kit word mode |
| B co-op friend's practice | DONE | pmXp on the friend entry queues the art (WeakMap) → famDiff adds res.fam {op:"art",ak} → famApply → pmArtIn = her own addArt(ak, BAL.pm.play.xp) (ak checked against ARTS); host-in-her-context case via D.after. pm-coop-d.js both directions |

Suites on the LIVE merge 5bf16c29:
- person-minigame-acts.test: 1st run 1 FAIL (the 200-buổi sim stopped at buổi 124 because she went to lãnh cung; me 7, NPC 13 already ≥ 4) → re-run ×2 PASS 31/31 (buổi 200: me 6/7, NPC 14/17). Flaky test, not a game fault: the sim should keep counting (or reseed) when she is sent out — test-only follow-up.
- pm-wordmode.test ALL PASS · pm-coop-d 28/28 · pm-equal ALL WITHIN TOLERANCE · pm-rank stake rises, board falls (chance vs real NPCs noisy, ruling (1)) · one-core-guard PASS · ag-mgcal PASS · mg-ready-guide 9/9 · QUICKCHECK PASS (open 1432 ms, old save ok, perf new/live render 222/214, tab 447/335, buổi 1005/1005, tasks>200 19/20, core gates PASS).
- receiver-choice: 1st run 2 FAIL (gift answers sample, Kết giao foe 12 vs 13) → re-run ×3 ALL PASS on the branch; plain LIVE 66bd36cd ×2 ALL PASS. Flaky sampling, no pm key.
- role-parity ×2: 1 FAIL, outputs byte-identical (md5 90382f47…): new rows t1 P-ONLY harm:phonghoa · maid P-ONLY maid:errand · hh N-ONLY ml:beat · hh N-ONLY ml:frame. Plain LIVE 66bd36cd run by me: 2 FAIL, 7 other rows (up cx3:tell, up harm:accuse/banphe/uyhiep, promoted maid onlyRisen ×3). No pm key in either list → the seeded probe-world drift LIVE already has (E23 owns it). The hh ml:* rows exist only because r2 widened the asHitPick probe to the Hoàng hậu (honest); they held in r2 on LIVE 70bea3d3.

VERDICT r3: PASS for person-minigame-acts — review/person-minigame-acts-r3 @ 5bf16c29 (= 42dba2ac + LIVE 66bd36cd, fast-forward on origin/main). Landing note for the foreman: role-parity is red on LIVE itself; land after / together with E23's drift fix, and re-run role-parity on the landed tip.

## HANDOVER (E22r → successor reviewer; written at the roll point, context ~28 % of 1M, START_CTX ~3 %, depth 6)
State: r1 FAIL (6) → r2 FAIL (2) → r3 PASS review/person-minigame-acts-r3 @ 5bf16c29 (= 42dba2ac + LIVE 66bd36cd). FOREMAN E #18 session_01DgYSWnmvkdgnzELwSixER7 puts it #4 in the land order and will ask for a just-in-time re-merge of the newest LIVE (merge origin/main into 5bf16c29, conflicts only index.html / sw.js → bash dev/site/build_site.sh, re-run the table below, push review/person-minigame-acts-r3 or -r4, FF on LIVE).
Next work: round C (-c) from E22g session_01DgYSWpbhufsng6okRiVwYE when it says SSK — not reviewed by me.
How I reviewed (reuse): sparse worktree under /home/user/wt, fetch --depth=80 with '+' refspecs under flock /home/user/wt/fetch.lock; suites = person-minigame-acts.test, pm-wordmode.test, pm-coop-d.js (two real clients on the co-op worker), receiver-choice, pm-equal, pm-rank, one-core-guard, ag-mgcal, mg-ready-guide, role-parity ×2 (≈10 min each), quickcheck; plain LIVE built in a second worktree to tell LIVE drift from branch faults. Shots via a Playwright script (dismiss «Vào cung ngay» + the chest intro .kmtap, pick sub-tab «Phi tần»); her receiver cards render through the kit word mode (dev/build/jk2b.js) — read the RENDERED card, not the option data.
Known flaky: own test's 200-buổi sim can stop early when she goes to lãnh cung; receiver-choice sampling; ag-mgcal step 3. Role-parity is red on LIVE 66bd36cd itself (E23 owns the drift).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context: at START_CTX % + 25 % of the window, NEVER above 60 % (hard ceiling): write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too; the COORDINATOR opens the successor.
LINEAGE (owner 17/11): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover + send "TAKE OVER NOW" to your line's standby (or a FOR MAIN line if none). Every takeover prompt copies this line.
