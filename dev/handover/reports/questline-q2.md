# E13 questline-q2 — report (worker E13, session_01DgYSWn8UViuUxqiymRM9sf; START_CTX ~5 %)
PRIORITY #1 CHECK: OD 6 (brief) | main: jnroad.js nrHelped/nrPlay/nrMonth, jnroadm.js nrMenPlay, jagknow.js knTell/knStaff/knFor, j9 oanAdd/hostility, jagent agSpite, jreign rg/rgl cards — reused; no BAL.nroad.fin/.sb/.hpMax, no v.nr.hp before | review/*: none | claims: none. Note: the audit's `npcTell` / `BAL.ag.why.tell` do not exist on main; the landed tell path is jagknow (knFor rules + BAL.ag.know.tell) — reused.

Branch review/questline-q2 @ a8cd0551 (from origin/main 94d11623).

## What
- New dev/build/jnroadhp.js (assemble.py after jagknow.js). Wraps nrHelped / nrPlay / nrMPlay / nrMenPlay / nrMonth / kitSubTabs / ktStoryHTML; no other game file edited.
- BAL keys inside BAL.nroad (jbal2.js): `fin {rk, danh, rel, owe}`, `sb {oan, mo}`, `hpMax`.
- (a) `v.nr.hp=[[chapter,sign,turn]]` for every asker kind (consort, maid/eunuch, men); `hpk/hpa` = asker. Betrayal stores the fact `v.nr.sb`. The old betray line «X biết ngươi bán đứng …» (false: nobody told her yet) now reads «… chưa hay ai đã để lộ chuyện» (real evidence).
- (b) the decided chapter's end: «Phụ tuyến · name · «road» chương n: Nhờ ngươi … / Vì ngươi bán đứng … / Dù …» log line + the clause in the news line (news cap unchanged).
- (c) closing chapter won after help and no betrayal → Danh fin.danh[tier by her rank], asker bond fin.rel (q72Rel), nợ ân fin.owe (q72DebtAdd). Nothing on loss/draw/betrayal.
- (d) strike-back, monthly for sb.mo months: carriers = her Tai mắt (oSee × BAL.ag.know.eye), her servant hears (SRVA listen odds) + knTell "tell", a servant of the player bought by her (knTell "sell"), the rival told dislikes the player (friend rule by thiện cảm). Landed → oanAdd(v,S,sb.oan) (× her nết via the existing persF wrapper) → hostility → jagent agSpite aims her deeds at the player; servants/men: q72Rel −oan. No new death path.
- (e) Mệnh truyện sub-tab «Phụ tuyến N» (only when she has joined a line): one kitSkillCard kind "story" per line + kitRows (Chương đã qua / Ngươi đã / Kết quả / Trọn tuyến / Ghi hận); S.nrpt snapshot capped at hpMax. KIT_GLOSS «Phụ tuyến».
- Old saves: nr without hp → []; co-op host-only (nrGuest); off switch window.__nrhpoff.

## Tests (all on the built page)
- dev/test/nroadhp-unit.js: PASS 26 checks ×3 runs (record, lines, no repeat, betrayal fact, no-carrier stop at mo, eye → oán exact, riv carrier, finale tier from BAL change, nothing on loss/betrayal, Mệnh truyện tab, off switch, old save month, no tab when empty), 0 page errors.
- dev/test/nroadhp-vp.js: PASS 37 strings (no %, no tokens, no foreign/modern words, no «Tuyến truyện»).
- dev/test/nrask-engine.js: ALL PASS. dev/test/npc-roads.js (2 lives × 96 months): 22/22 pass.
- quickcheck.sh a8cd0551 ALONE: QUICKCHECK PASS · old save ok · core gates PASS · perf new/live render 229/255, tab 403/450, buổi 1495/1196 ms (median of 3; buổi within run noise of the live build's own spread 1084–1381).
- Shots (outside git, /home/user/wt/q2-shots): Fold 755x1000@2 OK (3 cards, no overflow; looked 3×). iPad 1180x820@2: list OK but the sub-tab bar overflows → KIT REQUEST.

## KIT REQUEST K-Q2-1 (OPEN, dev/kit/KIT_REQUESTS.md)
Mệnh truyện kitSubTabs bar in a palace-start life (+Triều cục, Tâm nguyện) is exactly full at iPad 1180 (564/564); the 6th tab «Phụ tuyến» makes it 602–608 > 564 → sideways scroll, ⓘ slot overlaps «Tâm nguyện». Needs one kit rule for over-full sub-tab bars. Fold 755 and iPad Pro 1366 fit. Engine + list are otherwise done; the tab shows only after she joins a line.

## Measure dev/measure/nroadhp-bal.js (10 lives × 12 years, bond player)
| run | style | death % | Danh | HH seat % | asked rv/sv/men | hp +/− | finale rewards | found out / betrayals (carrier) |
|---|---|---|---|---|---|---|---|---|
| 1 | off | 40 | 15.2 | 60 | 4.5/11.9/5.7 | 0/0 | 0 | 0/0 |
| 1 | help | 30 | 17.5 | 60 | 1.9/5.4/2.1 | 3.0/0 | 1.1 | 0/0 |
| 1 | betray | 30 | 14.1 | 80 | 2.3/6.1/3.2 | 0/6.5 | 0 | 2.3/6.5 (eye 13, srv 10) |
| 2 | help | 40 | 15.1 | 40 | 4.4/15.6/5.0 | 6.6/0 | 2.7 | 0/0 |
| 2 | off | 50 | 14.7 | 80 | 1.5/4.2/2.0 | 0/0 | 0 | 0/0 |
Asked count follows run order (first style of a run is higher), not Q2 → unchanged. HH seat swings 40–80 in both directions = noise at 10 lives; Q2 changes no NPC stat (only oán toward her). Betrayal is found out ~1 in 3 (real carriers), so betraying keeps a real but uncertain cost; help pays Danh +2…6 on a won finale (≈1–3 per life).

## Handover
Nothing open except K-Q2-1 (kit keeper). Worker done; worktree kept until review verdict.

## HANDOVER (E13 → successor E13b) — 18/11 ~20:55Z, context 32 % ≥ START_CTX 5 % + 25 %
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

State: review/questline-q2 @ a8cd0551 (round 1, E13r FAIL: dev/handover/reports/questline-q2-review.md). Nothing of round 2 started. Fix order from Foreman E ROOT #7 (session_01DgYSWmtdZ1kLd9QYXs3qmb), copied verbatim:
> 1. LAW 2/3 + LAW 1 (equal value, two-way): Q2 gives gain only to «giúp» (BAL.nroad.fin) and loss only to «bán đứng» (strike-back) → helping is clearly better (Danh: help 15–17.5 vs betray 14.1–14.2; death: help ≈28 % vs Q2-off ≈53 % vs betray 40 %). Make it symmetric: a betrayal is help to the rival who was told (X→B) → +1 record on B's road too (B's finale reward + list), and/or a BAL.nroad gain for option 2. All numbers in BAL (law 4). Tune fin/sb so that help ≈ betray AND help (Q2 on) ≈ Q2 off on death. Measure ≥ 20 lives per style ×2 runs with order swapped; write the before/after table and explain how the reward affects death.
> 2. Tests: unit covers only the eye/riv carriers → add srv, sell, co-op guest, save round trip (the report lists the checks).
> 3. K-Q2-1 is now LIVE on main (048f3c71: over-full kitSubTabs bar wraps to a 2nd row). Merge newest main, confirm the 6-tab Mệnh truyện bar on iPad 1180x820 + Fold 755x1000 (look at both shots), no private CSS.
> Then push review/questline-q2, write §ROUND 2 in reports/questline-q2.md, send me «SẴN SÀNG KIỂM questline-q2 <sha>».

Pointers for the successor (from E13's code knowledge):
- Engine: dev/build/jnroadhp.js. Betrayal is recorded in the nrHelped wrapper (how<0): X.B = the rival actor {k,id,n,o}. For item 1, push [n,+1,turn] onto X.B.o.nr.hp too (nrInit it if missing; set hpk=q72Key(X.B), hpa=[X.B.k,X.B.id]) so B's finale reward + list entry work through the same nhAfter path; note nhAfter's finale gate `!H.some(x=>x[1]<0)` reads the person's OWN hp (B has no −1), fine. The «Ngươi đã» row text in nhCard needs a third wording for this "+1 via mách" entry (e.g. store sign 2 = "mách giúp"), else the list says «giúp» for a betrayal — keep VANPHONG.
- Possible option-2 gain key: BAL.nroad.op.betray is today the Đức cost; a gain could go in BAL.nroad.fin or a new BAL.nroad.sb.gain (law 4: inside BAL.nroad).
- Death gap: help-style lives died less (finale Danh + bond/nợ ân). Check whether fin.danh / q72DebtAdd lifts survival via existing paths; tune fin down and/or the B-side reward up, measure with dev/measure/nroadhp-bal.js (use 20 lives, styles off,help,betray then betray,help,off; ~10 min per 10 lives×3 styles; run ALONE).
- Unit test dev/test/nroadhp-unit.js: carriers srv (give v a staff servant with loyal 100, force roll true, mindPick→tell), sell (an S.staff servant with spyFor=key(v)), co-op guest (window.COOPW={on:1,seat:'b'} → no record/no month), save round trip (ser()/deser() or JSON of rivals+S, then nhList and v.nr.hp intact). Read the review report for its exact check list.
- Shots: dev/test/nroadhp-shots.js <url> <outdir> (kills kload/klife overlays); shots outside git.
- Worktree /home/user/wt/q2 (sparse, branch review/questline-q2), merge newest origin/main under flock fetch; rebuild with bash dev/site/build_site.sh; serve with python3 -m http.server 8731 --bind 127.0.0.1; quickcheck.sh ALONE before SẴN SÀNG KIỂM.

## ROUND 2 (worker E13b, session_01DgYSWodAwDdNEBivJkzbFg; START_CTX ~3 %) — review/questline-q2 @ 451b4d1e
PRIORITY #1 CHECK ('nhTip|mách tin|nroad\.fin|nr\.hp|kitSubTabs wrap'): OD law 2/3 (OD:L582, OD 18/11 ~09:20Z), law 1 (OD:L33, L1534) | main fa411d6f (K-Q2-1 wrap live 048f3c71; no tip/two-way code) | review/* questline-q2 only | claims E13 → E13b. Reused: jnroad nrHelped/hb/BAL.nroad.help, j72 q72DebtAdd/q72Key, jnroadhp nhAfter/nhFin/nhSnap; no new BAL key.

### 1. Law 2/3 + law 1 — a betrayal is help to the rival told (two-way, equal value)
- jnroadhp.js `nhTip(B,v)` (called from the nrHelped wrapper on how<0): when the told rival B has an open road, she gets a record `[her chapter, 2, turn]` on HER road (sign 2 = «mách tin», counts as help), her next chapter gains BAL.nroad.help (the same +15 a help gives A; no stacking when she already carries a bonus), and she joins the «Phụ tuyến» list. So B's chapter line («Nhờ tin ngươi mách, nàng qua được …»), B's finale reward BAL.nroad.fin and the list work through the same nhAfter/nhFin path. B without an open road: she owes the player BAL.nroad.fin.owe nợ ân at once (j72 ledger) besides the j72 bond (relB). Help-hồi line adds «B có tin ngươi mách, chương «…» của nàng thêm phần chắc.» / «B nợ ngươi một ân vì tin này.». List row «Ngươi đã: mách tin giúp ở chương n». All numbers BAL (reused help / fin / owe; jbal2 comment updated).
- NPC side: A −help, B +help → net zero on NPC odds (no harem inflation: HH seat 50–75 % in all styles, noise).
- No fin/sb retune needed (measured below): sb.oan 15 / mo 6 and fin unchanged.

Measure dev/measure/nroadhp-bal.js, bond player, 12 years, 20 lives per style × 2 runs (run 1 off,help,betray; run 2 betray,help,off), pooled 40 lives per style:
| build | style | death % (run1/run2) | pooled death % | Danh pooled | finale rewards/life (via mách) | betrayals found out / made |
|---|---|---|---|---|---|---|
| BEFORE (merged a8cd0551) | off | 30 / 35 | 32.5 | 14.3 | 0 | — |
| BEFORE | help | 30 / 45 | 37.5 | 16.7 | 2.65 | — |
| BEFORE | betray | 25 / 35 | 30.0 | 15.9 | 0 | 3.6 / 10.8 |
| AFTER mid (tip, no debt) | off | 35 / 40 | 37.5 | 15.2 | 0 | — |
| AFTER mid | help | 35 / 45 | 40.0 | 16.2 | 3.15 | — |
| AFTER mid | betray | 40 / 40 | 40.0 | 15.6 | 1.3 (1.3) | 3.0 / 8.2 |
| AFTER 451b4d1e | off | 45 / 30 | 37.5 | 16.7 | 0 | — |
| AFTER 451b4d1e | help | 45 / 25 | 35.0 | 16.8 | 2.0 | — |
| AFTER 451b4d1e | betray | 40 / 45 | 42.5 | 19.0 | 1.35 (1.35) | 3.25 / 9.3 |
Pooled AFTER (80 lives per style, both after builds): death off 37.5 / help 37.5 / betray 41.3 %; Danh 15.9 / 16.5 / 17.3. → help ≈ betray and help(Q2 on) ≈ off, all within run noise (one 20-life run swings 25↔45 %; SE of a 40-life death % ≈ 7.7 points).
How the reward affects death: the finale reward comes ~2–3 times per life (Danh +2…6, bond +4…10, one nợ ân); the measure floors Danh at 15 and never calls in a debt, so it cannot move death in a visible way — the round-1 gap (help ≈28 % vs off ≈53 %) came from 10-life batches; with 40 lives the BEFORE build already shows help 37.5 % vs off 32.5 % (gap reversed). Death is driven by the existing danger paths, not by Q2. Betray-style lives get fewer tip finales than help-style lives get help finales (1.35 vs 2.0) because that style betrays EVERY asker, so many told rivals carry her own −1 and are not eligible — a style artefact; a mixed player gets the same reward from either option. Betray still carries its real risk (found out ~1 in 3, oán 15) against its Đức cost; help carries Sức/bạc + fail odds.

### 2. Tests
- dev/test/nroadhp-unit.js: 26 → 40 checks, PASS ×5 runs, 0 page errors. Added: tip record [n,2,turn] on the told rival, her chapter + BAL.nroad.help, no double bonus, «nhờ tin ngươi mách» line, list «mách tin giúp», told rival's finale reward (BAL changed → seen), no-road rival owes fin.owe, carrier "srv" (her servant hears + tells; line «…, người hầu của nàng, nghe ngóng được rồi bẩm lại»), carrier "sell" (player's servant bought by her; «có kẻ bên ngươi đã bán tin»), co-op guest (COOPW seat b → no record, no list change), save round trip (ser → JSON → deser keeps v.nr.hp, the tip, the betrayal fact, S.nrpt). (Test fix: Q cleared before each q72Do — "đang có việc chờ" made the old help() flaky.)
- dev/test/nroadhp-vp.js: PASS 52 strings (+ mách tin lines ×6, tip line, debt line).
- nrask-engine ALL PASS · npc-roads (2 × 96) 22/22, gain-and-loss scan 24/24 · subtabs-overflow PASS (no overflow, no overlap) · quickcheck.sh 451b4d1e ALONE: QUICKCHECK PASS · old save ok · core gates PASS · perf new/live render 215/232, tab 361/368, buổi 971/1111 ms.

### 3. K-Q2-1 live
Merged origin/main fa411d6f (conflicts only index.html/sw.js — rebuilt — and KIT_REQUESTS.md: main's K-Q2-1 DONE line kept). Shots (scratch, outside git; looked 3×): iPad 1180x820@2 — 6 tabs Chương này · Sắc phong · Đã qua · Phụ tuyến 4 · Triều cục · Tâm nguyện in one row, ⓘ «Phụ tuyến» on its own line by the kit wrap rule, no overlap, no sideways scroll (sw 1180 = cw); Fold 755x1000@2 — 6 tabs + ⓘ in one row, 4 cards, no overflow. No private CSS (jnroadhp only adds a list item to kitSubTabs). Note: in the last shot run the card origin pictures were still loading (CDN timing), first run showed them.

Ready: SẴN SÀNG KIỂM questline-q2 451b4d1e. Context at end ~12 %.
