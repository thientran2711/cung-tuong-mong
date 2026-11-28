# ILLNESS-CURE — worker report (review/illness-cure)

## HANDOVER (worker rollover 28/11 ~03:30Z: context 41 % ≥ START_CTX 5 % + 25 %; depth 2) — r3 NOT started
ORDER r3 (Foreman C 4-1-1-1, MAIN 185 OD 28/11 02:20Z): on top of 261d91f1 (SUPERSEDED for RV-163M) on review/illness-cure:
- Q1: CAP Sức by illness stage (BAL key, e.g. BAL.illCure.sucCap {1:…,2:…,3:…}; hook = sucCap() in dev/build/jkh.js:26 — wrap it in jillcure.js: Math.min(cap, BAL stage cap) when illOf(p) && !p.ill.mort; NPCs same (law 1)). Update the danger line («Sức còn đầy…» sentence no longer true → say the cap). Test + MUTATE.
- Q3: child illness: dev/build/j8.js kidsMonth (sudden hp hit 30+R(40), can kill at once, no sign) → add a warning stage (e.g. first hit cannot take hp ≤ 0 unless the kid was already «ốm nặng»; kid gets a sick flag + a card) and a NON-bạc road matching «Xin thuốc cho <con>» (bạc 30, j2.js:183 / BAL.ag.cx2.kidMed) — the existing non-bạc «Chữa bệnh cho con» needs Y thuật ≥ 4 (BAL.ag.cx2.kidHeal.y), so add e.g. «Thức trông con» / «Cầu xin ngự y cho con» (Sức / Sủng, BAL). NPC mothers same (jagacts2 kidMed / kidHeal agRunReg). Also j13 epidemic kid hit (hpEpidemic) and j7 kidHurt, j8:160 kpoison (poison = other worker? check TUANTANG-WARN scope). Scan table every child illness path.
- Q4 OK as is. Q5 not ours (Foreman E robot).
STATE: worktree /home/user/wt/illness-cure (branch review/illness-cure, HEAD 261d91f1, pushed). Base build worktree /home/user/wt/ic-base (5fb13d60) for before/after. Scan tool dev/tools/illness-road-scan.js <dir> <out.md>. Test dev/test/illness-cure.test.js [outdir] (no arg = /tmp/illness-cure). Other tests take NO out-dir arg (door-onetap.js, ptime2.test.js, next-dead.js needs http URL: python3 -m http.server). quickcheck: bash dev/tools/quickcheck.sh HEAD (~25 min; ptime2 §15–19, act-merge-j1, P9, next-dead are flaky/pre-existing — see Tests).
Docs push: shallow history — reset to FETCH_HEAD, copy file, commit, push (never rebase).


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
