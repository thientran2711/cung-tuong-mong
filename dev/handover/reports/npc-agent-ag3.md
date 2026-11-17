PRIORITY #1 CHECK ('AG3|npc-agent-ag3|agent.*maid|S\.nt|mlEye|sendMaid'): OD 3 | ledger 0 | claims 8 (C STATUS: AG1→AG2→AG3 train) | main 15 (AG1+AG2 live, main 05ebe3da; maid code j42 / jmline / j8 sendMaid / j88 f88Carry reused) | review/* 0 (no AG3 branch before this one)

# npc-agent AG3 — maids reach the Emperor by their own deeds

Worker: Foreman C opus session_011xDdVNfbt3vPg31Vfr7ihc. START_CTX ≈ 3 % (get_session reads 0; own estimate), end ≈ 35 %. No rollover.
Branch: review/npc-agent-ag3 from origin/main 05ebe3da.
Rules read: START_CORE, START_WORKER; reports npc-agent.md (§1a rows 3, 6–12, §3.3, §3.4, §5 AG3), npc-agent-ag2.md, review-npc-agent-ag2-r1.md; KIT §31.16; VANPHONG for words.

## What changed (design §5 row AG3: §1 rows 6–12; row 3 was already done on main by jsteal)
| § row | before | now | where |
|---|---|---|---|
| §3.4 one fact | S.nt "Hoàng thượng để ý" = a second number for his regard of the maid; srvRise converted nt → sung | S.nt is an ALIAS of S.sung while she is a maid (not saved); old saves: sung = max(sung, nt) once; alias gone when she rises. Every old reader (cards, j67 events `w:{nt:…}`, jrd_cnv, jst14, top bar) keeps working. NPC staff maids carry `.sung` | jagmaid amAlias |
| 9 player maid deeds | srvNotice → S.nt + 45 gate + "hỏi tên" dice | srvNotice → sung (gain printed on the card = amTeaG), + his memory `S.emp.met.me` (deed key meet/tea/errand/fest); the 45 gate / cnvName dice only with the loop off. Quỳ dâng trà / Hầu trà odds + jealousy numbers from BAL.ag.maid (ONE rule with NPC maids) | j42, jagmaid |
| 8 monthly "Hoàng thượng để mắt" | roll(1.2 + nt/25) | off with the loop on | j42 |
| 11 staff maid eye | mlEye monthly chance | off with the loop on (counter __amN.eyeOff); a seeking maid (mlSeek, kept) chooses each tuần "Quỳ dâng trà nơi ngài đi qua" or her duties by her need (his regard vs BAL.ag.goal.sung × road "cn"), × useMul when her master pushes her, mindPick slip; on her master's night "Hầu trà khi ngự giá". Success → her regard + his memory `S.emp.met["s"+sid]`, master's jealousy (lòng) as the player's | jagmaid amWeek / amNightTea |
| 2 his pool | consorts only | empPick (AG2) also weighs every maid he MET (memory > 0), weight amCh = regard / 2 + Sắc / 8 (nightCh terms, BAL.ag.maid.ch) × memory. Picked maid → S.amT, nightWhy line "Ngài cho gọi X, cung nữ cung Y, đến Dưỡng Hòa điện hầu." (existing kmres line) | jagmaid, jagemp empK |
| 7 maid night | sendMaid roll 30 → fresh name + fresh face, else "thả ra cung" | amNight: his regard + rivalNight's night gain; free consort seat (roomFor) → the SAME person raised Đáp ứng (her given name + a free surname, f88Carry face/age, road "cn", Sủng = BAL rise conversion, then night() conception); seats full → stays a maid, `fav` (đã được sủng hạnh); each month a free seat goes to a favoured maid first | jagmaid amNight / amRise / servMonth |
| 6 Tiến cử (NPC) | rivalNight roll(3) | her own choice: only when tired (rest need) or ill tonight, × (1 + ally need) with a trusted maid (lòng ≥ riseLoy), BAL.ag.maid.send, mindPick | j8, j75, jagmaid amSendQ |
| 12 Tiến cử (her option) | text "phong: chanceW(30)" | prints the real path (seat → phong Đáp ứng / no seat → stays with you), no invented odds | jagmaid PEND.ksp wrap |
| 10 srvRise | no seat check | no seat (loop on) → favoured maid S.srv.fav; the 25 % "chủ giết trước ngày sắc phong" line of cnvName goes (her harm acts cover it) | jagmaid, j42 |
| player maid picked | — | kit dilemma "Hoàng thượng cho gọi" (kit Q dialog, kit act names "Tắm gội chờ giá" / "Cáo bệnh" with their act pictures, scene = the ksp picture via KIT_DLGMAP): go → seat: srvRise + night(); no seat: favoured | jagmaid PEND.amNight |
| texts | Thân phận row / HX help / story step said "từ 45 … hỏi tên" | with the loop on: "ngài nhớ việc ngươi làm gần ngài trong 2 tuần; càng để ý, càng dễ được ngài cho gọi" (keep from BAL) | j42, jst14, jagmaid |
Off switch BAL.ag.on = 0 → every old path (checked in the test). Host only (amOn = empOn; a co-op guest never decides).

### Found and fixed on the way (LUẬT SỬA CẢ NHÓM)
- 3 ReferenceErrors left on main by the trait-pool migration (`tr` no longer defined): j42 srvMoodEvent (thrown ~weekly in every maid life), jmen menDecide, jtsb tsbFirst → `hasT(person, word)`. Scan `[^.\w]tr===` over dev/build: 0 left.
- One world: in a maid life the NPC consorts never regained Sức (srvEndTurn skipped j3's night rest and j76sleep) → after 40 tuần most were at Sức 2–16. srvEndTurn now gives them the same rest (j3 `nightRg()` factored out, + j76sleep).

## Bot before / after (my bal.js: plays every buổi + endTurn, quiet, no player acts; base = main 05ebe3da build; 0 page errors)
| measure | consort life base (10.9 yr) | consort life AG3 (14.3 yr) | maid life base (12 yr) | maid life AG3 (9.3 yr) |
|---|---|---|---|---|
| maids raised to Đáp ứng / yr | 0.64 (eye 6, Tiến cử 1) | 0.70 (all by his pick 12 → 10 raised, 3 favoured) | 0.58 (eye 5, Tiến cử 2) | **1.50** (Tiến cử 9, pick 3, favoured→seat 2) |
| Tiến cử / yr | 0.37 | 0 | 0.92 | 2.1 |
| NPC maid tea deeds / yr (ok) | – | 6.6 (2.6) | – | 3.8 (1.3) |
Reading: consort life ≈ unchanged. Maid life: more Tiến cử (consorts there are more often tired/ill than in the consort life even after the rest fix), so more maids rise. Knob BAL.ag.maid.send (.15) — Foreman/reviewer may halve it; not re-measured (each run ~30 min).

## Tests (branch db193fbd)
agmaid_check (new, 23 checks: alias + old-save migration; her deed gain = printed gain + memory + no hỏi tên dice; NPC maid deed; pool pick + nightWhy line; same-person rise with seat; favoured without seat + month seat; Tiến cử no roll 3 / stays favoured / same-name rise / option text; player maid summons dialog, no-seat favoured, srvRise seat check, alias gone after rise; mlEye off; off switch roll 3 back; 30 tuần maid + 30 tuần consort no throw; co-op guest amOn false) **ALL 23 PASS** · agemp_check 20/20 · agent_check 16/16 · trait-rename-oldsave 9/9 · trait-pool 16–17/20 = same 3–4 FAILs as main vs main (16/20: the 17/11 trait rename made its expected words stale — not AG3) · one-core-guard PASS (inline 6640 ≤ 6691) · onecore-pick TOTAL 0 · **coop-night 105/105** · **coop-e2e 62/62** · **QUICKCHECK PASS** (core gates PASS, old save ok, perf new/live render 288/289, tab 408/355, buổi 1039/960 ms, tasks>200ms 13/12).
Perf: one weekly pass over seeking maids (~30 objects) + the pool in one flip — not visible in the buổi numbers.
Shots (scratch /home/user/wt/ag3-shots, not in git): Fold 755x1000 + iPad 1180x820 — "Hoàng thượng cho gọi" dialog, "Kính sự phòng báo tin" with the new Tiến cử text; 0 page errors, no overflow.

## Open / notes for Foreman C
1. Owner question 3 (npc-agent §6) still open: a favoured maid with NO seat does not conceive (night() runs only once she holds a rank). Low-born child path waits for her answer.
2. KIT observation filed in KIT_REQUESTS.md: a SHORT option in a ~560 px kit dialog on iPad gets a 177 px cell and its GỢI Ý wraps per syllable (seen on the new dialog's "Cáo bệnh"; kit-size column rule, not a private layout).
3. "Tiến cử <maid>" option picture is empty on main too (person-option picture rule matches only consorts' names) — pre-existing, not changed.
4. The player's OWN household maids do not serve tea on her night (only NPC consorts' nights trigger "Hầu trà khi ngự giá"); co-op guest as a maid is not in the host's pool (her deeds go to S.empMe, AG2 r1) — left for review/night-ledger / thin co-op.
5. Maids are not in nightWhy rows (whyRows lists consorts); only the reason line names the called maid.
6. jrd_cnv road option (S.nt ≥ 45 → srvRise) kept; srvRise now checks the seat.

SẴN SÀNG KIỂM db193fbd
