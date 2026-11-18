# review-npc-roads-r1 — reviewer (opus, BIG tier), Foreman D
Reviewer session: session_01DgYSWnawxUrsTQBmbc3jg7. START_CTX ≈ 4 % (get_session reads 0; own estimate). Rollover at 29 %.
Reviewed: review/npc-roads @ f699bbf4b9355398c7ad1387baab4f1b0bb59fc0 (U0 core + U1 consorts). Fixes pushed: **review/npc-roads-r1 @ 83d84225349a2bedd504cfa4fc7499d6c4f8953f** (one commit on f699bbf4).
Scope note: Foreman D later asked for one verdict on 02405da5 (U0–U4). Context did not allow a full BIG review of the delta (new jnroadm.js, maids, men, balance) before rollover, so per Foreman D's fallback this report covers f699bbf4 only; **r2 = the 02405da5 delta, and it must carry the r1 commit** (all six findings below are still present in 02405da5: monthTick hook, raw ARC67 tags, «lần trước» line, consorts saying «ta»; jnroad.js will conflict — keep r1's logic, re-apply on the successor's structure).

## Dependency (not on main)
- review/npc-roads is based on review/road-map-next 33b8789a (behind its head d69d6d24), which carries review/story14-p1-r2. Neither is on origin/main.
- Ship order: story14-p1-r2 PASS → road-map-next PASS → npc-roads (r1 + r2). Trial merge of r1 with origin/main caa73a87: conflicts only in assets.json, assemble.py (list union), jbal2.js (keep both sides), index.html/sw.js (rebuild). Mechanical; not done here (it would pre-empt the dependency reviews).
- On this branch alone only the tt roads have .5–.11, and NPCs never get tt when the player is tt (uniq); so most NPC roads close after .4, and the help hồi (chapters BAL.nroad.helpN 5–10) can only fall on a tt road. The real feature needs B's road-b1/b2/b3.

## Findings (f699bbf4) — 6 BLOCKING, all FIXED in r1
| # | finding | rule | fix (r1) | before → after |
|---|---|---|---|---|
| 1 | NPC roads freeze whenever the player is not a palace consort: hooked on monthTick, but a kẻ-hầu life (j42 srvMonth) and a home life (jkc) never call monthTick | OD:L1386 (NPCs live like players) | hook on rivalsMonth (called by all three month routes; S.out=1 inside srvW/kcW so she is neither asked nor cast) | cnv life, 24 months: 0 NPC roads / 0 chapters → 14 roads / 18 chapters |
| 2 | NPC endings reuse the player's ARC67 tags verbatim: 17 of 327 address the player («Bia Nhạn Môn khắc tên ngươi», «Gia ấn về tay ngươi»), shown after j84 as «… ta» in another woman's news/card = false info about the player; 47 rare ✦ endings (Cơ duyên hiếm, hidden conditions) dealt by sign alone | HANDOVER L46 true info only; OD:L39 rare | nrTag: «ngươi/Ngươi» → «nàng/Nàng»; ✦ tags never dealt to NPCs | suite log lines with «ngươi»/player claims: seen in shots → 0 |
| 3 | First help ask shows j72's follow-up line «Lại là {A}: chuyện lần trước còn tiếp.» (nr_* ride j72's q.ch queue) — she never asked before | true info only | PEND.q72o wrapped in jnroad (no j72 edit): nr_* offers shown as a new request; no empty «» when a chapter has no title | offer card shot 755/1180 |
| 4 | Voice: NPC consort says «ta» to the player and «muội muội/tỷ tỷ» starts lowercase after a full stop | VANPHONG §2 (peers: muội/tỷ; Hoàng hậu: bổn cung) | me()/Me()/call(): «muội»/«tỷ»/«bổn cung», «Muội muội»/«Tỷ tỷ»; all 8 templates | 8/8 lines |
| 5 | Help-option odds and loss sizes typed in jnroad.js (p:55/75/70/60/50, l:-2/-3, betrayal Đức −3, dò-la bond −4, refuse −4) although BAL says "every number of jnroad.js" | OD:L1267 ONE CORE | BAL.nroad.op {pS,pB,pDo,pChe,pY,l2,l3,betray,rbDo} + BAL.nroad.no | 18 typed numbers → 0 |
| 6 | Help can land on the wrong chapter: j72 shows queued follow-ups only under its offer caps/busy weeks, the chapter plays after 3 months regardless, then the late help credits the NEXT chapter (text names it) | OD:L1243 her help = that hồi | nrHold: the chapter waits while her nr_* quest is active; an offer j72 never showed is withdrawn when the chapter falls due | logic |

## Not blocking (for r2 / U-later)
- N1 (the known U4 item): bot builds no bonds → 0 help offers. Not blocking: the motive gate (bond ≥ askRel, same faction/side) is the owner's "real reason" rule (OD:L1226) and works in the forced test; but r2 must show offers > 0 with the bond-building bot of U4 before the owner sees it.
- N2: co-op guest player is never asked for help and never an NPC's rival (host-only world, jreign pattern). Two-way rule → later unit.
- N3: news repeats itself at a road's end («chương 11: «X» — X» + «khép lại tuyến «…»: X»); merge the close line into the chapter line.
- N4: ROAD_MAP §8.5 writes `v.nr.c.v==="me"`; code is `v.nr.c==="me"`. ROAD_MAP §0 row still "0 done".
- N5: «không được qua tay Kính sự phòng» (thu letter) — Kính sự phòng keeps the bed records, not mail; canon word (cửa cung / Nội vụ phủ) for B.
- On screen the card row reads «Mệnh truyện: «…» · …» (the game's wording pass renames «Tuyến truyện»); fine.

## Kit / wording / shots
- Kit: no CSS, no new part. Person-card row = one text span in .pcinfo of the kit person card, same as j85 Đức line / j24 danger line (consistency: same kind of row, same style). Help = unchanged j72 card + offer dialog. News = Sổ ghi log lines. PASS.
- Shots (looked at each; local, not committed): 755x1000@2 + 1180x820@2 — person-card row (Hậu cung, both sizes: wraps, not cut), help offer dialog (title «Phụ tuyến · {A}: «road» · Chương n … · Lời nhờ (1 bước)», OD:L499), Việc nhờ card (kit tabs Bước này/Các bước/Bỏ việc/Lòng người), Sổ ghi news. No horizontal overflow, 0 page errors. These shots exposed findings 2 and 3.
- Headless note: the rebirth roulette (#kroul) and the loader (#kload) cover the page after start(); shots need `kitRoulette=o=>o.done()` before start() and removing #kroul/#kload/#dawn.

## Tests (one at a time)
| test | build | result |
|---|---|---|
| npc-roads.js 4 lives × 180 months (tt, dtq, thd, muoi) | f699bbf4 | 38/38 PASS (106 NPC roads, 0 played after death/close, ≤1 help per NPC; help part 8 kinds × ok/betray; gain-and-loss scan 24 options 0 bad) |
| npc-roads.js same | r1 83d84225 (served index.html = committed) | 38/38 PASS; 0 «ngươi» in NPC lines |
| npc-roads-saves.js (+ LIVE main site save) | r1 before fixes 3–4 (ser/deser unaffected) | 5/5 PASS (main save loads, lazy fill 10/10, ser/deser keeps v.nr, card row) |
| maid-life check (24 months, cnv) | f699 → r1 | 0 → 18 NPC chapters |
| coop suites | — | not run (they need the live co-op Worker); code check: host-only (nrGuest), rivalsMonth muted on the guest by jcoopworld, the friend entry is pulled out (withoutFriend in endTurn) before any month runs |
| perf smoke | — | not run (no assets/art added; ~4 KB state per save, < 1 %) |

## Verdict
PASS 83d84225349a2bedd504cfa4fc7499d6c4f8953f — content of U0+U1 with the 6 blocking faults of f699bbf4 fixed in r1. NOT fast-forwardable to main: it needs review/story14-p1-r2 and review/road-map-next on main first, then a main merge (mechanical conflicts above). r2 (delta 02405da5 U2–U4) must merge this r1 commit.
