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
