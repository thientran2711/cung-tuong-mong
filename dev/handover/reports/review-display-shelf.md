PRIORITY #1 CHECK ('display-room|displayShelf|display-shelf'): OD 0 | ledger 0 | claims 6 | main 0 | review/* 1 (= review/display-shelf, this job). Shelf rulings read verbatim: OD L1670 (A), L1673, L1676 (plant care option 1), L1678 (d).

# REVIEW display-shelf (BIG tier, opus reviewer) — FINAL: PASS 60b0e3bf (r2 below; 8b7be006 superseded by owner OD L1682 (d) 19:50Z)

Branch reviewed: review/display-shelf e0a86875 (builder #2). Reviewer branch: **review/display-shelf-r1 @ 8b7be00607867fb85045df76441c3bd0fe4335d9** = branch + origin/main 579e8976 (FF from current main) + reviewer fixes below. Foreman C-AG #5. START_CTX ≈ 4 % (1M window).

## Owner rulings vs build
| ruling | built | note |
|---|---|---|
| (A) shelf per person, every NPC too, ONE piece per group | yes | p.shelf.g, 12 groups; NPC seed by rank + weekly arrange within allowance |
| (1) displayed piece locked | yes | moved out of p.inv; jil ledger counts it |
| (A) dwelling xa xỉ, separate from worn xa xỉ | yes | shelfLux vs luxAllow × allowF; one luxury number per piece (jlux luxPiece / kit formula LUX_V[gr]+pr/10) |
| (2)/(3) visitors see it; others' view + her mood | yes | shelfReact (superior frown / peer envy / admire / withered scorn), one jemo bar |
| (2) NPCs visit her room ('Ghé chơi'), NPC parity | yes + **fixed** | TW deed `call` in the agent plan, lands at the target's palace; her own "Ghé chơi" was MISSING from her talk list (two-way law OD:L1386) → added (fix 4) |
| (2) Dò la + maid report = evidence | yes | spyFind / spyMaidRun wrappers |
| (d) tố xa xỉ / tố vượt phẩm on sighting / tip / guess; inquiry settles; false-charge penalty | yes | same acts ACT.xx / ACT.vp, room = second cause; NPC guess only monthly (guessO) |
| (d) over-rank: not bought / placed normally; ngự ban may exceed rank | placing yes; buying **fixed** | the Nội vụ phủ tray added décor ABOVE her rank (rank 0 got haiduong rk2, thietma rk3 …) → tray now only adds pieces her rank may place (fix 1). Old SHOP_ALL items unchanged (old balance) |
| (d) nobody sees the scores | yes | only level words (Đơn sơ / Hợp phẩm / Xa hoa / Quá xa xỉ) in every player text and in shelfView |
| plant/pet care: servants 0 khắc, Tự tay chăm 1 khắc, ONE 'Chăm sóc' | rules yes; entry pending kit | shelfCareOpen lists pets + plants, but no entry opens it yet (all UI gated ui=0); KIT REQUEST (5) added: when ui=1 the pet "Chăm thú nuôi" entry and plant cards open the ONE list |
| ONE BAL table, 70 pieces | yes | BAL.shelf.it 67 keys + 3 tp; **fixed** typed .8/.35 word cut → BAL.shelf.plant.word (fix 5); kit grade of new décor showed "Thường" (no art → grade 0) while the rules use BAL gr → kit item info now reads BAL gr (fix 3) |
| imperial pieces never obtainable | **fixed** | they carried a price → once art gives them a grade they could become the Nội vụ phủ weekly rare item (jact adRare: pr>0 && grade>=3); price 0 now (fix 2) |
| UI gated BAL.shelf.ui=0, no private UI | yes | only kitModal/kitRows/kitFacts/kitStatRow/kitGameFrame/pbtn; classes rbtn/kgbtn/kinvacts only; no CSS |
| time via the one day gate | yes | can()/spend()/whyTime(); time-spill guard PASS |
| co-op host-only | **fixed** | jshelf wraps petWeek AFTER jcoopone's ONLY_ME wrapper, so shelfWeek ran the whole world on the guest (NPC arrange, rumours, NPC charges against her → Q cards on both seats). Now the guest runs only her own room; placeWhere NPC sightings host-only (fix 6) |
| old save | yes | lazy; shelf-check old save + QUICKCHECK old save ok |

## Reviewer fixes (commit 0854f56c, all in dev/build/jshelf.js unless noted)
1. Shop tray: décor added by restock filtered to `rk <= rkOf(S)`.
2. Imperial pieces: IT pr 0 (no shop, no weekly rare item).
3. kitItemInfo wrapper: grade / name / colour of a table piece = BAL.shelf.it gr (KIT_GRADE).
4. Her own "Ghé chơi" in topicOpts (TW.call, same gain BAL.tw.g.call, both see the rooms).
5. BAL.shelf.plant.word [.35,.8] replaces typed cuts in the care message.
6. Co-op: shelfGuest() (= !worldOn()); guest shelfWeek = only her; no rumours / NPC charges / reputation on the guest; placeWhere sightings host-only.
7. dev/kit/KIT_REQUESTS.md (5) one Chăm sóc entry. 8. dev/test/shelf-check.js check 11 (shop rank gate, imperial unpriced, kit grade = BAL gr, talk list has Ghé chơi, guest skips NPC world parts / host runs them).

## Tests (head 8b7be006 unless noted)
| test | result |
|---|---|
| node dev/test/shelf-check.js | PASS (incl. r1: shopRk 2, impPriced 0, gradeMismatch 0, talkCall true, guest rum/acc 0, host 1/1); weekMs 0.47, placeWhere 21.1 vs 23.1 ms without shelf |
| QUICKCHECK --cpu 4 | PASS ×3: 0854f56c median 3 (buổi 706/610) and median 7 (render 121/120, tab 233/212, buổi 670/669); 8b7be006 median 5 (render 122/117, tab 236/213, buổi 738/595). Shelf cost measured directly ≈ 0 (above) → buổi spread is run noise (same code gave 670/669) |
| core gates (one-core-guard, rules-one-source, kit-conform, coop-one-world), time-spill guard | PASS (inside QUICKCHECK) |
| one-core-bind / one-core-text-rule / it-key-guard | PASS (1217 prints 0 mismatches / DIFF 0 TYPED 0 / PASS) |
| coop-e2e (live worker) | 63/63 (0854f56c) |
| long suite: agent_check 16/16, agemp_check 20/20, agmaid_check 23/23, pet-life-bot ok | PASS (0854f56c) |
| life-place 755x1000 | FAIL on `maid-room` — SAME FAIL on origin/main d4a850ce build → pre-existing, not this branch (for the foreman's queue) |

## Notes for the foreman (not blockers)
- Plant care screen shows "Tươi tốt N/100" (care bar, kit stat cell like pets) — not a xa xỉ score; kept.
- When Foreman C's décor art lands: itemArt grade must equal BAL.shelf.it gr (shelf-check 11 guards the kit info; jact adRare will then see décor with grade ≥ 3 — dauthai/caithao/bpngubut/daminh are src "n" ngự ban: add a src/rank filter to adRare at that time, or the weekly rare item sells ngự-ban-only décor).
- Expert ideas NOT built (Hoan Nghi hương taint, round-fan gossip) — parked as the worker said.
- Worktrees: /home/user/wt/rv-ds (review/display-shelf-r1), shots none.

## FINAL VERDICT r2 (after owner OD L1682 (d) overwrite ~19:50Z) — PASS 60b0e3bfa94401fa0a1240d50c9f0f881d763cee
Branch **review/display-shelf-r2rv** (FF from origin/main c0a52168) = builder r3 0300361c (review/display-shelf) + origin/main c0a52168 + reviewer fixes. Builder r3 had been built on e0a86875, so ALL r1 fixes were missing; builder's parallel review/display-shelf-r2 63582624 (on 8b7be006) carried them but still had bug A below. Coordinator: land r2rv, not 63582624 / 0300361c.
r3 delta vs owner (d) 19:50Z: no display block (imperial included) ✓; per-person taste (nết + trọng + once-per-life lean, BAL.shelf.taste) judges each viewer's eye ✓; even ngự ban can be "quá xa xỉ" to a frugal eye / Thái hậu ✓; inquiry judges by the rule (ngự ban back to chest; other over-rank piece confiscated + punish) ✓; same for NPC shelves ✓; no score in player text ✓.
Reviewer fixes on r2rv:
A. **BUG**: Thái hậu rebuke did `t.th=cl(th+thAff,0,100)` — Thái hậu favour runs −100…100, so a rebuke RAISED a negative favour to 0 (shelf-check caught it: th −20 → 0). Now `ap(t,{th,danh})` (the one stat path).
B. shelf-check accuse step: the peer's random once-per-life taste made "Tố xa xỉ not open to a visitor who saw it" flaky → neutral eye stub in that step.
C. typed .2 in shelfLvFor → BAL.shelf.taste.fMin.
D. r1 fixes re-applied: imperial price 0; kit grade = BAL gr; her own "Ghé chơi"; co-op guest runs only her room (now also no Thái hậu rebuke on the guest); plant word cut in BAL; KIT REQUEST (5); shelf-check 11 (+ guest th count).
E. Nội vụ phủ buying gate KEPT (builder #2's stated call: 19:50Z lifts only the display block).
assemble: jshelf before jlooks (jlooks must stay last, main c975f067).
Tests on r2rv: shelf-check PASS ×4 (85df9b08 ×3, 60b0e3bf); QUICKCHECK --cpu 4 PASS on 78d1972a / 85df9b08 / 9c6292d3 / 60b0e3bf (buổi new/live 758/736, 837/669, 686/699, 845/704 — spread is run noise, shelf cost ≈0); one-core-bind / text-rule / it-key PASS; agent_check 16/16, agemp 20/20, agmaid 23/23, coop-e2e 63/63 (on 7c7397b9; later commits only the th line + test + main merges).
