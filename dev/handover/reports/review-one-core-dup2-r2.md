# review-one-core-dup2-r2 — independent opus reviewer (BIG), session_01N1tNP4wGphNXaUrwZWBrVr, coordinator Foreman B S2 (session_01N1tNP5QYubNg1dqA9BZitC)

PRIORITY #1 CHECK ('one-core-dup|one-core-text|balSg|balOan|AOUT'): OD:L1267 | main 6c4f21c3 (contained) | review/* one-core-dup-r2 f97a5841 FAIL, one-core-dup2-r1 8e75df35 FAIL, one-core-dup2-r2 711e637d (this) | claims B fix session_01N1tNP2SKjMzEdsyLuEZtJa
START_CTX ≈ 6 % of window; at verdict ≈ 30 %; no rollover.
Reviewed review/one-core-dup2-r2 @ 711e637d. No reviewer commits, no verdict branch. No worker report section for r3 was found (only the commit message) — the worker should write one with the fix.

## VERDICT: FAIL — items 1–3 below. Items (3) wording, (4) cheap gates, (5) merges PASS.

## FAIL 1 — WRONG BINDINGS: texts now print a BAL key that belongs to ANOTHER rule (new in r3; worse than a typed number)
The scanAmt guard matches any same-kind BAL.eff value anywhere in the module, so a text that correctly typed its OWN typed rule (or a rule of another stat) was "fixed" by printing an unrelated key that happens to hold the same number. Change that key and the text lies; change the real rule and the text lies too. Verified by hand (text ↔ the rule that really runs):
| # | site | printed key (whose rule) | real rule |
|---|---|---|---|
| 1 | j72.js:386 "lòng với ngươi" | j72.fn_2 (Hoàng hậu relAdd :366) | s.loyal-8 typed, same fn |
| 2 | j72.js:440 x "Thái hậu với nàng" | j72.fn_6 (newcomers relAdd :457) | ap(X.A.o,{th:5}) typed; its own return text still "(+5)" |
| 3 | j72.js:451 x "Thái hậu với nàng" | j72.fn_7 (mother relAdd :477) | ap(X.A.o,{th:4}) typed |
| 4 | j71.js:204 "Thái hậu với nàng" | j71.npc (sick-kid relAdd :220) | ap(v,{th:10}) typed, same line |
| 5 | j55.js:57 tdGift "người ấy quý ngươi" | j55.tdLeak_3 (tdLeak relAdd :74) | h.af[k]-10 typed, same line |
| 6 | j55.js:174 "Nhờ cha dâng sớ" tốn | j55.fail (xin-tha wrapper :163) | tdAsk: BAL.eff.j55.tdAsk (:60) |
| 7 | j55.js:176 + :204 leak "thành: … thế lực" | j55.top_9 (Đại tướng quân lost a battle :159) | tdLeak: BAL.eff.j55.tdLeak (:71) |
| 8 | j78.js:155 + :187 trinhth fail "Thái hậu quý ngươi" | j8.go_2[1] (Trả lại quà, j8:484) | apply({th:-4}) typed, j78:139 |
| 9 | j78.js:184 accuse fail "quý ngươi" + balOan | j2.go_3 (Trút giận, j2:146) | j8 accuse fail relAdd BAL.eff.j8.f_6 (j8:99) |
| 10 | j70.js:429 + :519 lt "Thái hậu với ngươi" | j70.ok_3 (ally relAdd :431) | no:()=>apply({th:-3}) typed |
| 11 | jkc.js:254 + :255 "${maid} thiện cảm" | jkc.fail_13 (tổ mẫu kcAf :248) | mzL(5) = maid loyal -5 typed (:251) |
| 12 | jtsb.js:236 "Đến ngay" / "Cáo bệnh" Thái hậu | jtsb.tsbBulNpc (queen affAdd :100) / jtsb.go_13 (relAdd :234) | apply({th:3}) / apply({th:-3}) typed |
| 13 | jpet.js:22 + :36 "bớt oán" | jpet.petMonthOf (noise oán :156) | oanAdd(v,p,-T.soft) — the pet's own soft field (:152) |
| 14 | jmen.js:175 Núp nghe lén fail "oán ngươi +balOan(menReport_2)" | menReport_2 is an affAdd (no derived oán) | oanAdd(v,S,BAL.eff.jmen.menChoose) (:224) |
| 15 | jmen.js:174 first "hắn mang ơn, người ấy quý ngươi" | jmen.menHide (affAdd to the consort c) | no rule gives the man/"người ấy" anything — check the wording |
FIX: print the key the rule really reads (6, 7, 9, 13→T.soft, 14→menChoose); where the rule is typed (1–5, 8, 10–12), either move that rule amount into BAL.eff and print it, or put the typed text back — never bind to a key of another rule. Then audit EVERY balSg/balAb/balOan added in d5b53ff8/097658ce/711e637d with a script that checks the printed key is read by the rule of the same option/function (my scan: /home/user/wt/rv3s/bind.py lists text-line vs rule-line for each key; 58 keys, 15 above are wrong).

## FAIL 2 — miss: the root AOUT table j17.js:67–72 still types BAL.eff.j8 amounts
const AOUT in j17 (loads before jbaleff, never overridden for these keys) is the outcome preview of the j8 act deck: spy "thù -8" = j8.f; ally "+25 / -5" = j8.f_2 / f_3; rumor "thù -5" = j8.f_4; accuse "thù -20" = j8.f_6; frame "thù -30", ksab "thù -20", takeaway "-30 / -10", plant "thù -20", steal/road "quý ngươi -15, oán ngươi +9" — check each against its j8 rule (j8:87–126). Needs a lazy read (getter / fill after jbaleff, like j30 xinhh) because j17 loads before BAL.eff.

## FAIL 3 — guard gaps (planted in modules the fixes did not touch; scratch copy, OC_BUILD)
| plant | r3 guard | r2 guard (097658ce) |
|---|---|---|
| P1 sibling ternary branch jreign rgPurge "thiện cảm -15" | FAIL (caught) | caught |
| P2 sibling if-branch jstip "oán ngươi +10" | caught | caught |
| P3 AOUT preview jne "thiện cảm -3" | caught | caught |
| P4 x:/risk: jstip "oán +5 / +10" | caught | caught |
| P5 cross-module wrapper jtruth → j28 provoke "oán ngươi +6" | **MISSED** | caught |
| P5b cross-module add() jtruth → j8 accuse "quý ngươi -20" | caught only by coincidence (jtruth has its own -20) | caught |
| P6 relAdd-derived jreign "oán ngươi +9" | caught | — |
| P7 "lòng 60+" / "Lòng dưới 40" / "Đức 80–100" in jstip | caught ×3 | caught |
| P8 BAL.road amount beside its read (jend14 lx "Sủng +4" = road.end.fertM) | **MISSED** (regression: the beside-ref amt pass is now skipped, scanAmt is BAL.eff-only) | caught |
Causes: (a) LINK is a hand list ({'j78.js':['j8.js','j2.js']}) — every other wrapper / preview module (j17 AOUT!, j25, jtsb, jface, jpetcare …) is unlinked; derive links from code (AOUT[k]/add("k")/ACT[k] keys → the module that defines A("k")) instead; (b) `if(r.mode==='amt')continue` dropped the BAL.road / BAL.arc (and non-rel BAL.eff, e.g. hh ccStep) checks; (c) WORD.rel matches "với nàng / với ngươi" after "Thái hậu / Hoàng hậu / lòng", so th/hh/loyalty amounts are taken as thiện cảm — this is what pushed the worker into FAIL 1. A kind test must take the stat word before the number (Thái hậu → th, Hoàng hậu → hh, lòng → loyal) and only accept a key read by the rule of that option.

## Note (not this branch's to fix; for Foreman B)
- jlost.js:242–243 "Đức -4" / "lòng -10" type LO.act values (module table LO, not in BAL) — one-core gap.
- jroute:89/95 'Chủ tin 60+' vs watcher() rule (already open for main).

## PASS parts
- (2) kept-on-purpose list (dup2 r2 report): unchanged, each a typed separate rule (ngọc bội floor, j97 road gates, j42 Chủ tin, j85 Hạnh cap, jts bestow, jroute tình ý) — accepted; they are typed RULES (another ONE CORE item), not copies of a BAL key.
- (3) No visible wording change: my own printer (balSg/balAb/balOan → value, BAL paths put back, (-n)≡-n, quotes normalised) r3 vs dup2-r1 8e75df35: 29 modules, 0 rendered differences; vs 097658ce: 21 modules, 0. balOan(n,m)=round(|n|×BAL.relOan[m]) matches relAdd (j9:9: hurt one +|n|×hurt, doer +|n|×doer, n>0 mend off) — correct, but only for relAdd keys (FAIL 1 #14).
- (4) one-core-guard 0 fails (inline 11777 ≤ baseline 11790), baseline byte-unchanged since 8e75df35 (0 grow / 0 new), no --allow-grow in any commit; one-core-text 0 sites; one-core-dup-same 4408 identical (after 4409 = + balOan) vs 097658ce and 8e75df35. quickcheck / coop-e2e / coop-one-world / old save NOT re-run: the fix will change these modules again — run them on the fix.
- (5) origin/main 6c4f21c3 contained. Trial merges: one-core-arcs c682afe6 → assets.json, index.html, sw.js, baseline + dev/build/j96.js (the known 2-line resolve from review-one-core-dup2-r1 §4); one-core-roads-r1 75bc9f05 → generated files + baseline only.

Shots: none (text-only change). Scratch /home/user/wt/rv3s (deleted with the worktree after the fix is reviewed).
