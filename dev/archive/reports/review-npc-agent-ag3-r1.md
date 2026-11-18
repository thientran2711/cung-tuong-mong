PRIORITY #1 CHECK ('npc-agent ag3 maid'): OD 0 new (OD 16/11 17:15Z / 17:50Z / 18:20Z read) | ledger 0 | claims 1 (AG3 worker session_011xDdVNfbt3vPg31Vfr7ihc, C ROOT-3) | main 0 (no maid-agent code on main 9391f9a9) | review/* review/npc-agent-ag3 (the work under review)

# Review r1 — review/npc-agent-ag3 (AG3: maids reach the Emperor by their own deeds)

Reviewer: opus (BIG tier), session_011xDdVQWAuJrSNwTBesGWg3. START_CTX ≈ 4 % (get_session reads 0; own estimate), end ≈ 22 %. No rollover.
Read: START_CORE, START_WORKER, START_REVIEWER; OD 16/11 17:15Z, 17:50Z, 18:20Z; worker report npc-agent-ag3.md (copied to this branch with this review, it sat only on the code branch); design npc-agent.md §1a rows 2–12, §3.3, §3.4, §5, §6; prior review-npc-agent-ag2-r1.md.
Branch: **review/npc-agent-ag3-r1 @7e264081** = AG3's 3 source commits re-picked onto origin/main 9391f9a9 (show-why live), the site rebuilt, then 2 reviewer fixes. origin/main is an ancestor (fast-forward ok). AG3's own "site rebuilt" commit db193fbd and the report commit were not picked (generated files rebuilt; report lives here).

## Verdict
**PASS review/npc-agent-ag3-r1 7e264081** (with the reviewer fixes below; follow-ups for Foreman C at the end).

## Rebase (main moved: show-why)
| file | conflict | resolution |
|---|---|---|
| assemble.py | module list | main's list + `jagmaid.js` after `jagemp.js`; `jwhyn.js` stays last |
| j42.js (Quỳ dâng trà, srvNotice, Hầu trà) | main had moved the master's jealousy amount to `nv(m,"misJealTin")` (show-why ONE CORE: BAL.net.n.misJealTin {Xảo quyệt 8, Kiêu ngạo 8, _ 4}); AG3 had its own copy BAL.ag.maid.jeal.hi/lo 8/4 + `hasT(o,"Xảo quyệt")` | ONE table: jagmaid `amJealN(o)=nv(o,"misJealTin")`; `jeal.hi/lo` and `amJealHi` removed (would have been a second value + an inline nết check for net-inline-scan). Odds `amJealP` (BAL.ag.maid.jeal b/d) kept. |
| j42 / jmen / jtsb `tr` ReferenceErrors | both branches fixed them the same way (hasT) | auto-merged, identical to main |
| jbal2.js | AG3's 2nd commit retuned ch | AG3's values, without jeal.hi/lo |
| KIT_REQUESTS.md | show-why's and AG3's entries | both kept |
netmig.py not run.

## Checks
| # | check | result |
|---|---|---|
| 1 | tests on 7e264081 | agmaid_check **23/23**, agemp_check **20/20**, agent_check **16/16**, coop-night **105/105**, coop-e2e **62/62**, one-core-guard **PASS** (inline 6640 ≤ 6691), net-inline-scan **0**, **QUICKCHECK PASS** (core gates PASS, old save from live 9391f9a9 loads + plays a buổi; perf median of 3 new/live: render 232/246, tab 383/302, buổi 1028/1062 ms, tasks>200ms 13/14) |
| 2 | old save, maid life (own test) | maid save made on main build (S.nt 52 as data, sung 0) → AG3 build: sung 52, `S.nt` is the alias getter, a buổi plays, the new save holds no `nt`, 0 page errors |
| 3 | owner law OD 17:15Z / 17:50Z (no flat roll, no invented gate, same deeds/odds for NPC maids) | player maid: monthly dice, 45 gate, "hỏi tên" dice all off with the loop on; NPC staff maid eye roll off; Tiến cử roll 3 → her own choice; maid night roll 30 + fresh face → same person (name, face, age, road "cn"). Player and NPC maid deeds use ONE rule (amTeaO odds, BAL.ag.maid.tea gain, amJealD). OK — but see follow-up A (ledger / place). |
| 4 | Q3 (seatless child) OPEN | the code assumes no answer: a favoured maid with no seat does not conceive (night() runs only once she holds a rank); no child path, no foster rule written. Flagged in the jagmaid header as open. OK |
| 5 | words (VANPHONG) | every new player-visible line is cổ trang, no %, odds by ladder word / chanceW ("Nắm chắc" for a sure step). Summons dialog, Thân phận row, story step, nightWhy "Ngài cho gọi X, cung nữ cung Y…", tai mắt lines checked. Pre-existing (not AG3): Tiến cử option "cung nữ mới lòng 45" (typed 45, same text on main). **FIXED fault 1** below. |
| 6 | kit | no new part: summons = kit Q dialog with kit act names "Tắm gội chờ giá" / "Cáo bệnh" + their act pictures, scene = KIT_DLGMAP.ksp; reason line in the existing kmres chip. Shots after fix 1: Fold 755x1000 + iPad 1180x820, no overflow, no cut text, 0 page errors (were on CDN img/_review/npc-agent-ag3/, looked at, wiped with this verdict). |
| 7 | balance (maid rises) | **FIXED fault 2** below (BAL knob + one-world illness). |

## Faults found and fixed on review/npc-agent-ag3-r1
1. **Hidden cost on "Cáo bệnh" (commit 6d5b3db1).** The summons option had `fx:{nt:-10}`; the kit has no wording for `nt`, so the option showed only "nhường đêm" under "an toàn" — the −10 of his regard was invisible, and the short hint put the option in a 177 px iPad cell where it wrapped one syllable per line (AG3's KIT_REQUESTS note). `nt` IS `sung` now (§3.4, one fact) → `fx:{sung:-D.decline}`: the kit words it ("nhưng bệ hạ lạt lẽo đi (nhiều)"), and the longer hint gives two equal cells on iPad. The kit-size observation stays in KIT_REQUESTS for other dialogs.
2. **Maid rises too high + a one-world hole (commit 7e264081).** Reviewer bot (quiet lives, every buổi + endTurn, seeded; counts sendMaid, illness at NPC nights, AMN):

| build / life (2 seeds) | NPC nights ill | Tiến cử / yr | maid → Đáp ứng / yr |
|---|---|---|---|
| main 9391f9a9 consort · maid (1 yr) | – | 2.5 · 4 (roll 3 %) | ≈ 0.6 (worker's 11–12 yr runs; mine 1 yr: 1 · 2.5, noisy) |
| AG3 send .15, consort life | 5–6 % | 1.5 | **1.5** (a seat was free every tuần → every send rises) |
| AG3 send .15, maid life, before the illness fix | 16–38 % | 2–4.5 | 1.0–2.5 |
| AG3 send .15, maid life, illness fix | 7–16 % | 7 | **3.5** |
| AG3 send **.05**, consort life | 4–5 % | 0.25 | **0.5** |
| AG3 send **.05**, maid life, illness fix | 15–18 % | 1.75 | **1.5** |

   Root cause: Tiến cử is decided only on a tired or ill night; Sức is fine now (AG3's rest fix, mean 88–96), so illness drives it, and in a maid life the month's illness tick (j13 `illMonth`: NPC consorts fall ill / get well, Emperor, Thái hậu) never ran — srvMonth did not call it, so an ill NPC consort there stayed ill for good (and the Emperor / Thái hậu never fell ill, so AG2's "ill → he rests" never happened on that road). LUẬT SỬA CẢ NHÓM with AG3's own rest fix: j42 `srvIllWorld()` runs illMonth in srvMonth (host only, worldOn; her own roll left out — the maid road has no illness of its own). Knob: **BAL.ag.maid.send .15 → .05** (reason in the jbal2 comment): consort life lands on the main rate (0.5 vs ≈ 0.6 / yr). Why .05 and not lower: the decision still comes from her need (ill / tired, × ally with a trusted maid) and mindPick's slip floor (12 % of choices) puts a minimum under any knob; .05 already matches the consort-life world.

## Follow-ups for Foreman C (not blocking this PASS)
A. **OD 16/11 18:20Z (owner's own example: "cung nữ NPC tự dâng trà … tôi tới một nơi … thật sự là lúc đó cái cung nữ A nó đang dâng trà")**: the NPC maid's Quỳ dâng trà (amWeek, weekly, in rivalsTurn) and Hầu trà are NOT written into the people ledger at a place / khắc, so she cannot walk in on it; the player maid must stand where he is, the NPC maid needs no place. Staff maids are ledger people ("s"+sid, j95), so this is an AG1b-style plan (agPlan at his place / khắc) for maids. Also spec §1a row 9 / §5 AG3 listed errand + feast deeds for NPC maids; only tea is done. Recommend AG3b before AG4.
B. **One world, maid life**: after the illness fix NPC consorts are still ill on 15–18 % of their nights in a maid life vs ~5 % in a consort life (another part of the consort-life month/turn chain — care, thái y, j76 — does not run from srvMonth / srvEndTurn). Maid rises there are 1.5 / yr vs 0.5. Audit srvMonth / srvEndTurn against monthTick / endTurn for every NPC tick (scan + before/after table); that, not the knob, closes it.
C. Seats: in every run a consort seat was free all the time, so "seats full → favoured maid" almost never happens in play (fav 0–5 in 2 yr). Fine by the seat rule; noted for the Q3 answer.
D. Pre-existing words: Tiến cử option "cung nữ mới lòng 45" prints a typed number (the new maid's loyalty 45 is typed in j8 sendMaid / jagmaid amRise too) → one BAL constant.
E. AG3's worker notes 1–6 stand (Q3 open; kit short-cell request; Tiến cử picture; household maids not serving on her own night; maids not in whyRows; jrd_cnv road option nt ≥ 45 → srvRise, now seat-checked).

Shots: CDN img/_review/npc-agent-ag3/ (2 files) wiped with this verdict (cdn_sync --wipe-review). Scratch shots / bots deleted with the worktree.
