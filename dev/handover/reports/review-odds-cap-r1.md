PRIORITY #1 CHECK ('odds cap|oddsCl|softFail|oddsSoft|Chắc chắn'): OD 7 (L1657 17:00Z, L1659 17:10Z, L1664 17:35Z + earlier) | ledger 0 | claims 8 (ODDS CAP row, D, worker session_01964izGRJM7BJPNcVuaqdcU) | main 15 (BAL.odds.lo/hi, seeMaxP, 'Chắc chắn' ladder on live) | review/* 0 besides review/odds-cap (this)

# REVIEW odds-cap r1 — Foreman D #11 brief D11-odds-cap-r1.md

Reviewed review/odds-cap @ d3589f39. Verdict branch **review/odds-cap-r1 @ bc58dd4647a6f9e86a27335de9dad8e814aca769**. It merges the newest origin/main d4a850ce, so it fast-forwards from live main.
- Merge conflicts were resolved keeping the cap wording:
  - j87 `WKE_CARD` takes main's `kRx` line without `Chắc chắn|`.
  - test/emotion-acts.js `lock` takes main's p.net line with hint `"thành: Đức +1"`.
  - index.html and sw.js were rebuilt.
- Main's 169 new commits add no new o:100, typed cap, raw random or "Chắc chắn".
- START_CTX ≈ 6 % of 1M.

## Gates (all on bc58dd46)
| gate | result |
|---|---|
| one-core-guard / rules-one-source / kit-conform / coop-one-world (coregates) | PASS |
| time-spill guard | PASS |
| quickcheck.sh | PASS, twice. Old save from live loads and plays a buổi with 0 errors |
| perf, 6 alternating pairs, same box, CPU idle | median new/live: render 181/152 ms, tab 299/283 ms, **buổi 821/807 ms (+1.7 %)**, tasks>200ms 12/12. Render varied run to run: 96/76 (under bot load), worker's 192/157 and 195/223. This is noise, not a cost of the change (it adds one Math.min per roll) |
| coop-e2e (guard only) | live 63/63, branch 63/63, no worse |
| runtime soft-fail check (my script, Math.random forced to .999 or 0) | see CHECK 2 |
| Fold 755x1000@2 + iPad 1180x820@2 shots, LOOKED at | see CHECK 6. Shots are kept in scratch only, never in git and never uploaded, and deleted with this verdict |

## CHECK 1 — one cap, one path: **FAIL**
What is correct:
- `roll(o)` = `Math.random()*100 < min(o, BAL.odds.hi)` (j1:107).
- `oddsCl` reads BAL.odds.lo/hi (j1:108).
- The worker's scan reproduces on the merged sha: typed `cl(…,5,95)` 0, ladder word 0, raw `Math.random()*100<` 1 (roll itself).
- jcoopthinb's `roll(a)` is IIFE-local, so it does not shadow the global roll.

But the worker only scanned for the exact form `cl(…,5,95)`. My own scan (every typed clamp or min/max near a chance) still finds a **second clamp with typed 5/95 or values outside [5,95] where a chance is rolled or shown**:
- **typed 95 / .95 / 5 caps**:
  - jbac.js:20 `Math.max(5,Math.min(95,…))` (bạc act odds)
  - j43.js:30 `cl(p,10,95)` (mindBelief roll)
  - jtrong.js:83 `cl(…,20,95)`
  - jvisit.js:51 `Math.min(95,…)` (Thái hậu visit p)
  - jts.js:263/267 `Math.min(95,odds)` (shown odds)
  - j70.js:343 `selfP70maid cl(…,0,95)`
  - j97.js:254 `Math.min(.95,…)` + raw `rnd67()<p`
  - jpetcare.js:34 `Math.min(95,…)` (sniff)
  - j34.js:27/31 `cl(…,5,90)` (typed floor 5, shown with word())
- **act odds pushed BELOW the floor 5 or ABOVE the cap**:
  - jpet.js:90/92: a wrapper over the act odds, `cl(…,3,95)` → acts at 3
  - jpoison.js:49 `cl(…,3,92)`
  - jpetcare.js:132 `cl(…,3,90)`
  - j70.js:167/169/332 `cl(…,3,85/80/90)`
  - j29.js:41/46 servSellO `cl(…,0,90)`. Floor 0 = a loyal servant NEVER sells. OD 17:00Z says "by odds, never a hard 0/100"
  - j53.js:130 kid exam `ktOdds cl(…,3,97)`, shown as word(97)
  - j71.js:89/132/372 + jbal2.js:40/42 contest `cOdds7 cl(…,3,97)`
- **outcomes rolled outside `roll()`, uncapped**:
  - j51.js:56 NPC kv scheme rate `Math.random()>=c`
  - j75.js:172 NPC effort rate `Math.random()>pt*FAIRN.eff`
  - kid exam (j53 ktRun) and contest (j71) results come from noise draws, not roll, so a strong edge = a certain result (100 %)
  - NPC court exam jexam.js:161 `exSim` (NPC passes can be certain; hers is her own play = OK)
- Not misses: birth sex j1:142 (P.sonP), jdh:116 stochastic rounding, minigame layouts and effects.

## CHECK 2 — soft fail: **PASS with 2 items**
Runtime results (my script; bạc 500, Sức 80; forced fail):

| path | result |
|---|---|
| runOpt capped act (c bạc −30, Sức −10, Danh −2) | returns false · bạc 0 · Sức −10 · Danh 0 · BẠI line in log |
| forced pass of the same act | full cost, gain applied |
| deck `act()` on a real capped card (Nghỉ ngơi một lát) | khắc +1 spent, nothing else, BẠI line |
| chooseM `cap:1` option (fx bạc −20, Sức −5) | go not run · bạc 0 · Sức −5 · 1 khắc · BẠI line |
| capAt button | handler NOT run · khắc 2 + Sức 10 · BẠI line · result card shown (shot) |
| plain button without data-cap | its handler runs normally |
| capAt with Math.random → 0 | handler runs |
| NPC twDo sure deed (help) | nothing happens, no cost |

- roll(100) rate 0.957 over 2000 draws; roll(oddsCl(0)) rate 0.06.
- The capture listener only matches `button[data-cap]`. No other data-cap use exists, so tabs, walking, shop and orders are unaffected.

Items:
- **2a (FAIL, one roll stacked on another):** some o:100 acts already roll INSIDE themselves. They are now ALSO gated by the cap roll, and their card shows "Nắm chắc" next to the real, lower chance:
  - j13:41-44 Truyền thái y / Tự bốc thuốc / Tĩnh dưỡng / Giả bệnh: `treat()` rolls the cure, and the x text says "khỏi bệnh: khả năng …"
  - j2:163 Xin chữa bệnh, j2:167 Đút lót lật thẻ (`chanceW(nightCh())`), j9:56/57, j76:110/111, jact:69
  
  These acts are attempts with their own odds, not "formerly sure". They must not get a second roll. Either give them their real odds as `o`, or leave them uncapped (the inner roll is already capped by roll()). The word shown must be the inner odds. The balance run below points at this: illness deaths 7 vs 1.
- **2b (wording):** a capAt button passes only `{suc}` to oddsSoft. So its result line drops ", không mất bạc", while the same card's MẤT row says "chỉ uổng công, không mất bạc, không mất gì khác". Seen on "Dò hỏi gia thế" (Bạc −5). Pass the act's bạc cost too (e.g. `data-capbac`), so the hint and the result read the same.
- Notes (not counted):
  - The capAt calls type the khắc and Sức inline (`capAt(2,{suc:-(15)})`). This is a second copy of numbers the handler already has (ONE CORE). Read them from the same BAL key the handler uses.
  - jgreet wrap: j3 applies fx = a.c and the wrap applies a.c again (pre-existing). The soft path therefore spends the reply's whole cost. Greet replies have no bạc today.
  - NPC twDo pays before the cap roll, so an NPC loses the deed's cost on a soft fail. Hers does not. This is two-way asymmetry.

## CHECK 3 — deterministic list: **FAIL 2 items**
Walking, fixed-price buying, pickers, decisions, first greeting, exam/minigame play and result texts are fine. Two items on the list are chances:
- **3a:** the jhouse "Tra khảo" order (jhouse.js:45) is listed under "Opening a panel / picker". It is not a picker: its `open:` runs `servAct("phat")` at once. The spy ALWAYS confesses who sent them (j10.js:69). An interrogation outcome is a chance (OD 17:00Z: info by odds). Thưởng / Phạt / Che chở in the same `J()` helper also misuse `open:` as their runner. That is fine for orders, but Che chở (shielding a servant from Thận Hình ti) is an attempt against the authorities, not an order.
- **3b:** "Thú tội với Hoàng thượng" (j22.js:38, `fix:1`) guarantees "giữ được mạng". The Emperor's mercy is a chance (compare jroute.js:172 `mercy` roll). Give it real odds.
- Borderline, for the owner/Foreman: "Khéo từ chối", "Cáo bệnh", "Xin <con>" (asking for a pet) are attempts rather than pure decisions.

## CHECK 4 — wording: **PASS**
- "Chắc chắn" is gone from every ladder and regex. The remaining hits are yes/no confirms only: j6, j16, j79 kitConfirm, j84 (`Chắc chắn ghi`), jcloud, jcooplobby.
- Top word is Nắm chắc. The ladders match: KIT_ODDS (j79:192), ODDW (j17:66), KA_ODDS (j63:12), VANPHONG §64, KIT.md §odds chip.
- BAL.odds.cut puts 95 on Nắm chắc. No % is shown.
- The result header still says HỎNG under the BẠI stamp. That is the separate kit order (OD 17:10Z (2)), not this branch.

## CHECK 5 — BALANCE (for MAIN / owner)
Setup:
- dev/measure/run_par.js, sensible bot (inpage6 + inty), seed 1, 2 pages per arm, 64 lives per arm.
- Default difficulty (Vừa). Every life is cut at 8 years (turn 96, fate CUT8).
- Live = origin/main d4a850ce, branch = bc58dd46. Same seeds; both arms ran at the same time on this box.

| arm | lives | Hoàng hậu reached | early end < 3 y | ended before 8 y | max rank mean / median | mean Sủng / Danh / Bạc |
|---|---|---|---|---|---|---|
| live | 64 | 15 (23 %) | **10 (16 %)** | 30 | 5.30 / 6 | 98 / 70 / 119 |
| branch | 64 | 15 (23 %) | **20 (31 %)** | 33 | 4.88 / 6 | 99 / 65 / 121 |

Fates before 8 y:
- live: poison 14, childbirth 5+2, illness 1, xuất gia 4, other 4
- branch: poison 14, **illness ("trọng bệnh không qua khỏi") 7**, childbirth 4, xuất gia 4, other 4

Reading:
- Hoàng hậu reach is unchanged.
- Early deaths doubled. z ≈ 2.1, borderline significant at 64 lives.
- The extra deaths are illness deaths. That matches item 2a: the cure cards now roll twice (cap gate, then the real cure roll), so a sick bot misses cures more often.
- The cap alone (1 in 20 soft fails, nothing lost) should not double early deaths. This needs a re-measure after 2a is fixed.

## CHECK 6 — shots LOOKED at
- Fold 755x1000@2, capAt button "Dò hỏi gia thế" soft fail: the result card reads "Dò hỏi gia thế: bại — người tính không bằng trời tính: chỉ uổng công, không mất gì khác." + "không đổi gì". Bạc 400 is unchanged and 1 khắc is spent. The act card shows Nắm chắc and MẤT "chỉ uổng công, không mất bạc, không mất gì khác".
- iPad 1180x820@2, deck "Nghỉ ngơi một lát" soft fail: the same card. The deck cards show Nắm chắc with the soft MẤT row.
- No page errors and no layout break. The BẠI stamp sits over the end of the first text line on both devices. That is the kit seal's normal place for every result card, not new here.

## CHECK 7 — C-AG ag-all-2 list: **FAIL (incomplete)**
Method: every review/ag-all-2 @ 6badc4d4 dev/build line not on main, scanned. The appendix lists only the o:100 lines of jagacts3 and jagknow. It misses:
- jagstaff.js:104 `o.p>=100||agTry(o.p)`: a sure skip, plus its OWN soft-fail path `agSoft`. That is a second soft path; it must use j63 oddsSoft.
- jagharm.js:125 `haStealTry … Math.random()<w.p` and jsteal.js:41 `Math.random()<w.p`: raw draws that bypass roll().
- About 40 ag-all-2 rewrites of shared files that bring back typed caps and the ladder word. They are not conflicts git will flag, but they will re-introduce what this branch removed:
  - typed `cl(…,5,95)`: jlost.js:109/124/125/189/240, jeitem.js:57/62/120, jstip.js:145, j70, j92, j83, j95b, j8, j30, jts, jthaiy, jrcp, jpet, jkc, jbal2
  - jtsb.js:48 `cl(…,5,90)`
  - "Chắc chắn": jtsb ×7, jtabs ×2, j85 ×2, j54 ×2, j53 ×2, j42 ×2, j25 ×2, j24 ×2, j15 ×2, jht ×1
  
  Most come from its eyes() rewrite of those lines.
- The full list is reproducible with the python snippet idea "lines of ag-all-2 not in main × patterns o:100 | Chắc chắn | typed cap | raw random | >=100||".
- Their branch was not edited.

## FAIL 5 @ bc58dd4647a6f9e86a27335de9dad8e814aca769
1. CHECK 1: second clamps with typed 95/5/0/3/97 and raw draws remain at chance sites. Route every one through oddsCl / BAL.odds (or roll() for rates):
   - jbac:20, j43:30, jtrong:83, jvisit:51, jts:263/267, j70:167/169/332/343/346, j97:254, jpetcare:34/132, j34:27/31, jpet:90/92, jpoison:49, j29:41/46, j53:130 (+ the ktRun result), j71:89/132/372 + jbal2:40/42 (+ the contest result), j51:56, j75:172, NPC exSim.
2. CHECK 2a: o:100 acts with an inner roll (j13:41-44, j2:163/167, j9:56/57, j76:110/111, jact:69) get a second cap roll and a false "Nắm chắc". Give them their real odds (or no cap gate). This likely explains the early-death doubling.
3. CHECK 3: jhouse "Tra khảo" (always confesses, mislabelled as a picker) and "Thú tội với Hoàng thượng" (sure mercy) are chances and need odds. Fix the report list too.
4. CHECK 2b: the capAt soft result line must name "không mất bạc" when the button costs bạc (same words as its MẤT row). Read capAt's khắc/Sức from the handler's BAL keys, not typed.
5. CHECK 7: complete the ag-all-2 call-site list (jagstaff agSoft + sure skip, jagharm/jsteal raw draws, the ~40 shared-file lines with typed caps / "Chắc chắn") in FOREMAN_C_STATUS + the appendix.

Then re-run the paired balance measure (≥ 64 lives per arm, 8 y). Expect early deaths back near live.

FAIL 5 @bc58dd4647a6f9e86a27335de9dad8e814aca769


---

PRIORITY #1 CHECK ('odds cap|oddsCl|softFail|oddsSoft|Chắc chắn'): OD 7 (L1657 17:00Z, L1659 17:10Z, L1664 17:35Z + earlier) | ledger 0 | claims 8 (ODDS CAP row, D, worker session_01964izGRJM7BJPNcVuaqdcU) | main 15 (BAL.odds.lo/hi, seeMaxP, 'Chắc chắn' ladder on live) | review/* 0 besides review/odds-cap (this)

# § ROUND 2 — review/odds-cap @ fcefca42f574cb73082083eac9db98cfce246c59 (merged with main → 9df9204d010f4b03747c3fa5bba11b5684cc11aa)

Reviewer opus, 17–18/11. START_CTX ≈ 3 % (get_session read 0; this is my estimate). Brief: dev/handover/briefs/D11-odds-cap-r2-review.md. The r1 brief's CHECKs 1–7 were re-run too.

## Gates
| gate | result |
|---|---|
| merge newest origin/main | eb3675a6 merged into fcefca42 → **9df9204d** (on review/odds-cap-r1; fast-forwards from live main). Conflicts were only in the built index.html/sw.js/assets.json, rebuilt with dev/site/build_site.sh. Main's 31 new commits add no o:100, no "Chắc chắn", no typed cap and no raw draw. |
| one-core-guard / core gates | PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · time-spill guard) |
| quickcheck | PASS ×2, old save loads and plays a buổi (0 errors) |
| perf, interleaved, 12 pairs (2 × `--runs 6`, idle box) | medians new/live: render 218/205 ms (+6 %), buổi 993/940 ms (+6 %), tab 375/388, tasks>200 ms 14/14. Run 1: buổi 993/868. Run 2: buổi 1009/1051 (the branch was faster). The pair-wise sign flips between runs, so this is inside quickcheck's ±25 % noise. Borderline vs the +5 % rule; I don't count it as a defect. Possible cost source if it shows up again: capRank7 / exSimC run BAL.odds.simN=200 extra draws (exChance MC) per NPC exam / contest. |
| coop-e2e (regression guard only) | live eb3675a6 **63/63**; branch 9df9204d **63/63** (rerun). The first branch run was 55/63, all week-advance / rejoin-date / reborn-friend timeouts against the live Worker; the build was the same (assembled 04:29), so this was a flake. No worse than live. |
| shots Fold 755x1000@2 + iPad 1180x820@2 | soft-fail (capAt "Dò hỏi gia thế"), Tra khảo result, Thú tội result + card — LOOKED at; findings below. Kept in scratch outside the repo, deleted after this verdict. |

## Family by family (my own scan + runtime)
1. **Typed clamps / raw draws — closed, plus one new defect (A).** No `cl(…,5,95)`, `cl(…,3,97)` or raw `Math.random()<p` is left at any chance site. The raw draws that remain are shuffles, layout, birth sex, jdh rounding and the storm-bolt rate. The rates with a floor below 5 are left per the worker's documented rule (confessRisk 3..60, wdLeak/vlLeak 2..60, conceiveCh 2..85). Note: `spProudCh` cl(…,3,70) at jpromsv.js:27 is shown with chanceW but is missing from the worker's left-as-is list (list only).
   - **A (FAIL): capRes dips BELOW the cap for raw odds 96–99.** j1.js:116 `if(o>H)return !!ok&&roll(H/o*100)`. roll() clips its argument at 95, so roll(H/o*100) = roll(min(95, 95/o*100)). That keeps a lucky win only 95 % of the time even when o=96, where 95/96 ≈ 99 % is needed. Measured P(final win), 200 000 draws: o=95 → .950, 96 → .913, 97 → .922, 99 → .940, 100 → .949; with the direct draw below every o>95 gives .950–.951. So a 96–99 contest / exam / kid-exam result ends at about 91–94 %, below the 95 the cap promises. Fix (one line): draw the keep-share directly, e.g. `if(o>H)return !!ok&&Math.random()*o<H`; the same goes for the low branch (`(L-o)/(100-o)*100` is ≤ 5, so it is safe there, but use the same form).
2. **o:100 acts with an inner roll — closed, plus one pre-existing defect in this family (B).** inner:1 is on j13:41-44, j2:163/167, j9:55-57, j76:110/111, jact:69, jthaiy:127/128/145 and jkc. They are not cap-gated twice; oddsOf reads their own `oi`. The other o:100 acts I traced are deterministic (spyNews, memInvoke, twDo paid). Illness deaths in the balance run are back to live level (below).
   - **B (FAIL): false "Nắm chắc" on never-rolled decision options.** About 16 options that never roll type the word "Nắm chắc" into their x text. kaRows (j63:52) then sees the top word with no hỏng and adds an impossible BẠI row "Tốn công, không được gì". Verified at runtime on branch AND live, so it is older than this branch. But it is this family's ONE CORE word: the ladder word must come from oddsOf / capW, never typed, and a decision shows no word (KIT.md:494). Sites: j95.js:411/421/424, j95b.js:223, jagent.js:216/217, jagmaid.js:91/101, jgift.js:20/161/164/166, jrcp.js:251/252, jtds.js:85/86. Fix: drop the typed word on decisions (or route real chances through word()/oddsOf).
3. **Tra khảo / Che chở / Thú tội — chances are real; one card defect (C).**
   - Tra khảo uses o:traO(s) = BAL.house.tra. On fail, the toast reads "hỏng, nàng ta cắn răng không khai: thiện cảm −15" (Fold shot) and the spy stays (servAct keeps her).
   - Che chở uses o:cheO() = BAL.house.che.
   - Thú tội uses o:oddsCl(CF.base+sung/CF.sungDiv+th/CF.thDiv), with BAL.confess {base:70,sungDiv:4,thDiv:5}. On fail in a new life, the first-offense mercy applies (shot: "Bị giáng xuống Thường tại", cấm túc).
   - **C (FAIL): the Thú tội card (j22.js:38) splits its hỏng text across rows.** It shows THÀNH "giữ được mạng (vào lãnh cung) · hắn bị xử trảm" / **KÈM "bị ban chết"** / BẠI "Hoàng thượng không tha". Death reads as a side effect of success. Also, death() mercy means "bị ban chết" is not always the outcome. Seen on Fold (card element shot) and iPad. Fix: make the x text parse into BẠI only, e.g. "… · hỏng: Hoàng thượng không tha, có thể bị ban chết", with nothing after a second "·" that kaRows reads as KÈM.
   - Notes for owner/main (not FAIL):
     - Thú tội can now kill (base 70, i.e. about 30 % fail before Sủng/Thân). That is a design point to confirm.
     - Che chở keeps the older duplicate Danh key (jbal.js:150 cheDanh:2 vs BAL.eff.j10.danhServAct −2).
     - j10 staffHTML is dead code (only wrapped by j70).
     - The "Uống thuốc phá thai" card mis-parse (j22:37) is the same on live.
4. **capAt — closed.** Every capAt call reads its BAL.btn key (jbal.js:290: courtHoi, kidTeach, kidCare, kidGuard, cnv, h54Thu, wkShow, h54Day, kidHeal, htAsk, loSneak); the handlers read the same keys, and bạc goes through BAL.bacFee. No typed khắc/Sức.
   - Fold + iPad soft-fail toast: "Dò hỏi gia thế: bại — người tính không bằng trời tính: chỉ uổng công, không mất bạc, không mất gì khác." Bạc stayed 500.
   - iPad deck card "Nghỉ ngơi một lát": Nắm chắc + BẠI "chỉ uổng công · không mất gì khác".
   - Buttons that are not chances (tabs, walk, shop, orders) are unaffected; the listener only binds `button[data-cap]`.
   - The BẠI stamp overlaps the end of the text line on the Fold toast. This is pre-existing kit seal placement (r1 said the same; not this branch).
5. **ag-all-2 list — almost complete (note, not FAIL).** I scanned every line ag-all-2 adds (ce29592e..6badc4d4) for the patterns: 113 lines. The appendix has 108 unique lines. It misses 5 agSoftTxt lines:
   - jagacts2.js:71
   - jagacts3.js:40
   - jagent.js:37 (comment)
   - jagent.js:41 (the agSoftTxt definition)
   - jagstaff.js:106

   The appendix's own instruction already says "agSoftTxt → j63 oddsSoft", so C-AG has the rule. Please add these 5 lines to the FOREMAN_C_STATUS dated line (L1523). Their branch was not edited.
6. **capRes = one path.** Its 3 users are j53:150 (ktRun result: ktPEx/ktPPoor), jbal2:45 capRank7 (capRes(win,100*w/N)) and jexam:61 exSimC. All go through j1 capRes, which uses BAL.odds.lo/hi; there is no second clamp table. The only defect is A above.

## CHECK 1–7 of the r1 brief, re-run
1. One cap / one path: PASS except A.
2. Soft fail via j63 oddsSoft + BAL.odds.softFail (spend ["suc"]), never bạc: PASS (shots).
3. Deterministic list: Tra khảo / Thú tội are fixed. No new chance hides in the list.
4. Wording: "Chắc chắn" has 0 odds uses. The 16 remaining hits are "are you sure?" confirms (new life, room forget, save overwrite, kitConfirm) or docs. KIT_ODDS tops at "Nắm chắc", and no % is shown. B is the one typed-word defect.
5. Balance: below.
6. Gates: above.
7. ag list: 5 missing lines (above).

## BALANCE — second seed set, ≥ 128 lives per arm (FOR MAIN / owner)
Setup: dev/measure/run_par.js, sensible bot inpage6cut8.js (cut at 8 y = turn 96), Vừa, 2 pages per arm, both arms on the same box at the same time. Live = eb3675a6, branch = 9df9204d. Seed 7: 109 / 115 lives (run_par's 4 h cap), topped up with seed 11: 20 / 21 lives. Each arm had 2 page memory crashes, replaced by run_par with a fresh seed.

| arm | lives | Hoàng hậu reached | early end < 3 y | early death < 3 y | ended before 8 y | max rank mean / median |
|---|---|---|---|---|---|---|
| live eb3675a6 | 129 | 45 (35 %) | 25 (19 %) | 22 | 55 | 5.23 / 6 |
| branch 9df9204d | 136 | 35 (26 %) | 28 (21 %) | 24 | 54 | 5.24 / 6 |

Ends before 8 y by cause:
- live: childbirth 21, poison 14, left / Emperor died 11, illness 5, other 4.
- branch: poison 19, childbirth 17, left / Emperor died 15, illness 3.

Max rank distribution (rank: lives):
- live: 0:1 1:5 2:7 3:14 4:13 5:17 6:27 7:45
- branch: 1:3 2:8 3:14 4:14 5:21 6:41 7:35

Reading:
- **The r1/worker gap (branch safer: 5 vs 19 early ends at seed 1) does NOT stay.** With 128+ lives on new seeds, early ends are equal (19 % vs 21 %), early deaths are equal (22 vs 24), and Emperor-death / left endings even run the other way (11 vs 15; the worker had 9 vs 3). The seed-1 gap was seed noise, so no bisect was needed for it. Illness deaths 5 vs 3 confirm FAIL 2 of r1 stays fixed.
- **Hoàng hậu reach is lower on the branch at these seeds (35 % vs 26 %, about 1.6σ).** At seed 1 the worker saw the opposite (28 % vs 34 %). Over all three seeds: live 63/193 = 33 %, branch 57/200 = 28.5 %, not significant. More branch lives stall at rank 6 (41 vs 27). Most likely mechanism, if it is real: capRes now gives weak NPCs up to a 5 % pass at exams / contests (exSimC, capRank7), and it takes 5 % or more of her own sure luck-draw wins (more than 5 % at 96–99 because of A). Rank 6→7 goes through the seat contest (j34) and the exam. That is the cap working as the owner asked, not an unexplained shift. **Not a FAIL item**; main/owner may want a 128-life HH re-check after A is fixed.
- No real unexplained safety shift remains.

## FAIL 3 @ 9df9204d010f4b03747c3fa5bba11b5684cc11aa
1. **A** — j1.js:116 capRes: `roll(H/o*100)` is clipped by roll() at 95, so a 96–99 result keeps only about 91–94 % (below the cap). Use a direct draw, e.g. `Math.random()*o<H`.
2. **B** — about 16 never-rolled decision options type "Nắm chắc" and get kaRows' impossible BẠI row: j95.js:411/421/424, j95b.js:223, jagent.js:216/217, jagmaid.js:91/101, jgift.js:20/161/164/166, jrcp.js:251/252, jtds.js:85/86. Drop the typed word (decisions show no word) or route real chances through word()/oddsOf. Pre-existing on live, but it is this family's ONE CORE word.
3. **C** — j22.js:38 Thú tội card: the hỏng text splits into a KÈM "bị ban chết" under THÀNH. Put the death risk inside the BẠI row only, and say "có thể" (mercy exists).

Notes (no FAIL):
- the 5 missing agSoftTxt lines in the ag-all-2 list (for C-AG);
- spProudCh missing from the left-as-is list;
- Thú tội lethality as a design point;
- the Che chở duplicate Danh key;
- borderline perf (+6 % medians over 12 pairs, sign flips between runs);
- the HH-reach note above.

Everything else from r1 (FAIL 1–5) is closed. After the fixes, a short re-check is enough: A by a unit draw, B by grep, C by a Fold shot.

FAIL 3 @9df9204d010f4b03747c3fa5bba11b5684cc11aa
