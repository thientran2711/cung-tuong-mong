# E72r — BIG REVIEW review/leave-palace 5ae10d0a — verdict: FAIL (3 items)
PRIORITY #1 CHECK ('leave palace' / 'thất sủng' / 'BAL.crime'): OD rows 24/11 ~06:05Z, ~06:45Z, ~07:25Z, ~07:55Z read verbatim | FOREMAN_E_STATUS FROM MAIN 117 05:07Z, ORDER CORRECTION 116 07:26Z + 07:57Z, FROM MAIN 118 06:16Z (P1/P2/P3) read verbatim | main: no BAL.crime / BAL.thatS / jleave before this branch | review/*: only review/leave-palace | claims: E64, E64b, E72r (this).
Reviewer E72r = session_01DgYSWohKTYyJDyq6W1cKwu. Merge sha (review/leave-palace 5ae10d0a + origin/main 056c2402): **37a862be** on review/leave-palace-r (conflicts j3/j8/j30/assemble.py resolved = main's text + the branch's leave-palace changes, re-applied by hand; site rebuilt).

## GATES (on 37a862be)
| gate | result |
|---|---|
| dev/test/leave-palace.test.js | 125/125 ok |
| dev/test/leave-palace-fit.js | Fold 24 + iPad 24 Trả thẻ bài endings, 0 overflow |
| bash dev/tools/quickcheck.sh | PASS (core gates PASS, old save ok, perf new/live: render 180/194, buổi 978/2278 ms) |
| role-parity ×2 | ALL PASS ×2 |
| coop-e2e host Fold / guest iPad | 142/142 passed |
| coop-e2e COOP_SWAP=1 (iPad host) | 142/142 passed |
| old save mid Trả thẻ bài (LIVE main build: tiểu thư life with the «Trả thẻ bài» card pending → loaded on 37a862be) | loads, no page error; all 3 options (gả / ở vậy dạy chữ / xuất gia) end the life; S.kc.lv absent → old card kept (no «Về sau»), as ordered |
| shots Fold 755x1000@2 + iPad 1180x820@2 (looked at all, scratch only, wiped) | (1) ban hôn → đa tình vương gia «Về sau · Làm thiếp trong phủ» (2) gián điệp nghich → nhân từ → «Phế làm thứ dân» + «Về sau · Làm thứ dân»; whole text, no clip, kit rows only. (3) thất sủng: «Lật thẻ: Không có» in the Ân sủng panel; her line goes to the month report (j3 ev) |

## LAW CHECK
| law | result |
|---|---|
| 1 two-way | FAIL — P3 NPC side has no way back (item 1); P2 player vs NPC tư thông still two different rules (item 3) |
| 2 / 3 | ok — own-choice leave options are endings, each has its own gain (an epilogue); no cost-only option added |
| 4 one core | ok — BAL.crime, BAL.thatS, BAL.leave, BAL.ge.exitFork; no typed rule number in the new code (flavour numbers in epilogue prose only) |
| 6a real evidence | ok — every P1/P2 site punishes only after the existing caught / proven roll (no new punishment without proof) |
| 6b real people | ok — partner = the real man (S.men / suitor object), his real nết decides the class |
| 7 wording | ok — cổ trang, no %, no odds printed |
| 9 kit only | ok — j32 uses the existing end card, kpsec + kitRows; no new part |
| 11 fix the group | FAIL — P1 tier set only on deathSentence callers; the same treason crime on the punish() road is missed (item 2) |
| no confirm (OD ~07:25Z) | ok — family scan re-run: no xgConfirm, no «sẽ hỏi lại», no confirm card before any own-choice leave; kpGate no longer fires on «giả chết» |
| Trả thẻ bài (MAIN 117 05:07Z) | ok — new lives: ending + «Về sau»; old saves keep today's card |

## FAIL — numbered list for the worker (on review/leave-palace-r @37a862be)
1. **P3 thất sủng is a one-way trap for NPCs (law 1, MAIN 118 «she can win him back … same for NPCs»).** While p.thatS: nightCh(p)=0 and Sủng −BAL.thatS.decay a month; an NPC has no other road to Sủng ≥ BAL.thatS.back. Robot (monthTick, 6 lives, 3 low NPCs forced to Sủng 0/Danh 0): **17 NPCs entered thất sủng, 0 ever left** in up to 120 months (one at Danh 100 still Sủng 0 after 119 months). The player has non-night Sủng roads (≈70 apply({sung}) sites), the NPC does not. Fix: give the NPC the same win-back roads as her (e.g. her npcMonthly/agent acts that raise Sủng while thất sủng — gifts, tài nghệ, Thái hậu's word — or the decay stops at 0 and a BAL-driven monthly «Hoàng thượng chợt nhớ» chance from Danh/Đức/children for EVERY consort, her too). Test: robot shows NPCs leaving thất sủng.
2. **P1 treason tier misses the punish() road (law 11).** j8.js:168 «Đẩy con nàng xuống hồ» caught → `punish(a,"mưu hại hoàng tự",BAL.eff.j8.pondSev)` (sev 2), while j8.js:165 kpoison caught (đầu độc hoàng tự) → deathSentence "nghich". Same crime (hại hoàng tự), two severities. Scan every site whose crime is gián điệp / hại Hoàng hậu / hại hoàng tự / vu cổ on deathSentence + punish + fall (scan script + table), route the doer's proven crimes to the "nghich" tier, and write the justification for any kept (e.g. framed victims: j7.js:21 doll, framed() bùa ngải → sev 2 stays, they are victims of a frame, not doers — say so in the table).
3. **P2 «the ONE tư thông rule» is still three rules (law 1 + 11).** Player: j22 affairExposed = man xử trảm, empMercy → lãnh cung, else deathSentence; player in j30 «Bóc chuyện tư tình» = 50 % over «ban chết» / 50 % cold(), no deathSentence, no mercies; NPC: new ttNpcExposed = deathSentence only (no empMercy road). Make one core function for any woman p (S or NPC) — man xử trảm, empMercy → lãnh cung, else deathSentence — and route affairExposed, j30 expose (both branches), j3 loveletter, j95 tryst, trystNpc, jmen.js:208, jroute.js:127 to it; test parity S vs NPC.

## NOTES (not blocking)
- Merge note: main changed j3/j8/j30 lines the branch also touched (balSg wording, BAL.rl.j8.hit, actNone guards, deposeHeir); 37a862be keeps main's versions + the branch changes. Worker: build on 37a862be, not on 5ae10d0a.
- «Phế làm thứ dân» (alive ending) plays the mourning entrance (white silk + ink). It is the existing kesLife type for that fate, the same as her own-choice hl_phe; leave it as is unless MAIN wants a different tone (law 16).
- E64b OPEN items stand (kc card «Tiểu thư ngoài cung» line; j70 «lúc nàng thất sủng» reads Sủng < 25, not S.thatS — after item 1 this word should read the flag).
- Co-op: tsMonthAll also runs tsMonth on the co-op partner's rival entry (v.coop); npcMonthly skips it. Decide in item 1 whether the partner (a player) is ruled by her own device's tsMonth(S) only — then skip v.coop in tsMonthAll.
