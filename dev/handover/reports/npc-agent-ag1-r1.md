# npc-agent AG1 + AG1b — review r1 (BIG tier, Foreman C reviewer)
Reviewer session_011xDdVSu5Mec6qvjHhWrgco. START_CTX ≈ 3 % (get_session reads 0; own estimate). Reviewed review/npc-agent @ 33170548
(incl. review/npc-mind 7fd289cd, no earlier PASS → reviewed here as part of the branch, OD:L1248–1249).

## VERDICT: FAIL
Merge of current origin/main f1509d7c done and pushed for the fixer: **review/npc-agent-r1 @ 2298416f** (built, assets.json kept).
Conflicts resolved: assemble.py = union (jmind + jagent added to main's list with jsteal / jcoopone / jlag2); j8 night steal = main's
jsteal (agent choice, replaces the npc-mind `roll(6)` edit); index.html / sw.js / assets.json = rebuilt. The worker should fix ON this branch.

## Tests run (on 2298416f unless noted)
| test | result |
|---|---|
| agent_check.js | 12/12 in 5 of 6 runs; **1/6 FAIL "scene"** (see fault 6) |
| npcmind-check.js (old = main f1509d7c) | 38 people, all five fields, cards ok at all sizes, 0 page errors — but the Thái hậu gift text shows a DOUBLE dislike penalty (fault 4) |
| two-way-oldsave.js (main f1509d7c save → this build, 30 weeks) | ok, 0 page errors |
| coop-one-world.js (on main now) | PASS (guest sent week changes no world path; merged = host) |
| coop-e2e.js (live Worker) | 60/61: agent lines ok (host ticks 13, guest never ticks); the 1 FAIL = a CORS console error on a CDN figure from origin ctm.local (file is 200 on the CDN; env flake, not this branch) |
| perf, agent_probe 160 steps, Fold 755x1000, CPU x4 | **p50 3.0 · p95 9.5 · max 28.7 ms > budget 8** (fault 1); 0 jagent errors, 0 page errors |
| AG1b card shots Fold 755x1000 + iPad 1180x820 (thTH, hostile provoke, "Có người tìm đến") | kit T3 event card, figure + scene band, Tốn/Được/Mất rows, odds words; no overflow, 0 page errors; option picture tiles inconsistent (fault 5) |
| bot 40 lives sens (branch vs main f1509d7c, inag6) | RUNNING at verdict time; numbers follow in an addendum below |

## FAULTS (whole family each — LUẬT SỬA CẢ NHÓM)
1. **PERF (blocking).** agTick p95 9.5 ms / max 28.7 ms at CPU x4 (Fold proxy) > 8 ms budget (BAL.ag.perf.p95). Slow tick split:
   needs 28 + options 65 + sync 18 + land 15 ms (AG.slow). Fix per npc-agent.md §4: spread scoring across frames / khắc (e.g. a share of
   the consorts per frame via an idle queue, or alternate khắc of the buổi), cache SOC target lists per tuần, and avoid the full j95sync
   inside the tick. Prove p95 ≤ 8 ms at CPU x4 over ≥ 150 steps (agent_probe … 755x1000 on 4) AND under the bot.
2. **Khắc cost not one rule (OD:L1386 + ONE CORE OD:L1267).** (a) Her reactions "Nghe lén" / "Tham gia" do `if(can(1))spend(1)` — with no khắc
   left she still gets the act for free; the option must be shown disabled (kit option "not enough khắc" state) like every other act.
   (b) `1` is typed in spend(1), can(1) and in the text "tốn: 1 khắc"; BAL.ag.kh exists but is NEVER read. Use BAL.ag.kh (or the
   player's own act khắc constant) in code and text. (c) Two-way: an NPC witness reacting to HER deed (agSeeHer hear / join) pays no khắc
   and does it on top of her one deed of the buổi; same rules = the reaction uses up her deed slot of that buổi (or the same khắc cost).
   Scan every `spend(`/`can(` in jagent.js and jmind.js.
3. **Typed numbers in NPC choice weights (ONE CORE OD:L1267).** npc-mind's mindPickBy score functions carry new site numbers:
   j28 `4+|aff|/4+oan/4`, `rk+aff/10`; j4 `30-rel`; j96 `40+ghen/2`; j8 `10-rel`, `evG*2-rel/5`; j40 `rk²+host/5`; j55 `host/20`;
   j34 / jlost `2+`; jagent agSeeHer `ho/50`; jmind menDecide weights (2, .6, .5, 2.5, 1.2, h/25, h/80, +4), abv bạc/3, ability-neutral 40,
   kid tal ≥ 55. Move them into one BAL table (BAL.mind.pick.<site> / BAL.ag.wit) and move BAL.mind itself from jmind.js into jbal2.js
   (the rulebook file). Scan: `grep -o "mindPickBy([^;]*" dev/build/j*.js` + jmind/jagent literals; report a before/after table.
4. **Two systems for the same likes / dislikes after the merge with main (one source).** main's jdis (owner Q25, 011beb29) already gives
   Thái hậu dislikes and consorts' "thích"; jmind adds its own. Result: a disliked gift to Thái hậu is charged TWICE —
   npcmind-check text: "Thái hậu +1. Nhưng người không ưa hương liệu: Thái hậu -4. Nhưng Thái hậu không ưa hương liệu: thiện cảm -3."
   (two lines, two numbers BAL.dis.aff and BAL.mind.like, and "thiện cảm" for Thái hậu whose regard is "Thái hậu"). Known likes are kept
   in two stores (jdis S.likK vs jmind S.mindK). Fix as a family: jmind must defer to jdis for EVERY person jdis covers (Emperor, consorts,
   Thái hậu) for dislikes, likes, learning and the gift penalty/bonus; one known-store per person; one number per effect. Check every
   receiver kind (Emperor, consort, Thái hậu, Hoàng hậu, own maid, servant, official, man, child) with a liked and a disliked gift: one line,
   one change each.
5. **Kit consistency of the AG1b reaction rows (KIT FIRST OD:L1092–1095).** In the same card some option rows carry the act picture tile and
   others none: thTH card — Nghe lén + Mặc kệ with tile, Tham gia + Bỏ đi without; provoke card — Bỏ đi WITH tile. The same option ("Bỏ đi")
   differs between cards. Every reaction row must take its picture from the same kit act-picture rule (all four with a picture, or the kit's
   one "no picture" form for all); missing pictures = KIT/ART REQUEST to Foreman C, not a blank. Re-shoot Fold 755x1000 + iPad 1180x820 after
   images load.
6. **Servant start never witnesses + flaky test.** agWatch returns when isSrv() (player starts as cung nữ: ≈ 1 life in 8–25) → no
   "Ngươi bắt gặp" ever for her, though she stands in the same places (OD:L1386 same world for all). Either let a servant-player witness
   (with the reactions that fit her) or record why not in npc-agent.md and make agent_check pick a non-servant life; today agent_check
   "scene" fails at random (1/6 runs; probe 1/25–3/25 lives "none", all isSrv).
7. **Same deed, two copies of its numbers (OD:L1386 "same odds" + ONE CORE).** The Sủng deck act the agent uses (j75 npcEffortKind: múa /
   đàn / cờ / small gift) types its own costs, odds and gains, and they differ from the player's cards in j2 (player odds use
   artW("cam",lvl), the NPC uses the raw level; player loss l:{sung:-2} vs NPC lose=2 per kind). Put the four acts in one BAL table read by
   both j2 (her cards) and j75 (NPC), same odds formula.

## Checked OK
- OD:L1386 shape: options are the existing TW / SOC / j75 deeds, paid by twPay/ap and rolled by the deed's own odds (odA); need weights are
  preferences (no outcome numbers); every act carries a why (S.roster.acts ag:1 + S.ag.log, e.g. "mong có con · con gái Đại tướng quân").
  Old weekly/monthly dice of owned deeds are muted for NPC doers (mute 247 / 160 steps); off switch restores them (agent_check 4).
- j22 flat roll(55) no longer rolls while jmen runs.
- Co-op: agOn false for seat b; host ticks; one-world probe PASS. Note (not this branch): j95on() is off in co-op, so the ledger and the
  AG1b scenes do not exist in co-op for either player (acts land at once on the host) — inherited from j95; AG later steps should plan it.
- Old save loads; 0 page errors at Fold 755x1000 and iPad 1180x820; no horizontal overflow; wording cổ trang, odds ladder words, no %.
- No new kit part; the scene card is the T3 event card (same Q/opts path as j95 catch).

## Bot (40 lives, run_par sens + inag6, branch 2298416f vs main f1509d7c)
Pending at verdict time — addendum below when done. HH reach 0 % on main is the known separate BALANCE BLOCKER (Foreman B).
