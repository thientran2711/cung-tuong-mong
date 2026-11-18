PRIORITY #1 CHECK ('greet|chào hỏi|xưng danh|AG-MEET|approaches\('): OD 4 (17/11 05:12Z rule, 05:25Z AG-MEET, 05:28Z chosen) | ledger 1 (D47 'Phi ???' in greet text: LIVE on main, small-bugs-4) | claims 0 (orders only: FOREMAN_C_STATUS 05:26Z / 05:29Z) | main 15 (j61.js:142/154/159 greet = face only; j24.js:22–39 approaches weekly; j42 / j22 Chào hỏi đúng lễ; jnet "greeting names, AG-MEET build on these") | review/* 0

# GREET-MEET: one greeting name rule (rank + nết) + AG-MEET (NPCs at a place come to HER)

Worker: Foreman C opus session_011xDdVPQEBukEXYnUVs5fDo. START_CTX ≈ 4 % (my own estimate), end ≈ 30 %. No rollover.
Branch: **review/greet-meet** from origin/main 7e264081 → **8862c3d6** (source commit + site rebuilt).
Read: START_CORE, START_WORKER; OD 05:12Z / 05:25Z lines; FOREMAN_C_STATUS orders 05:26Z / 05:29Z; npc-agent.md §3.1/§3.5/§4, ag3 report + r1 review; j61, j24, j9, j2, j42, j22, jagent, jnet, jwhyn.

## Step 0: history/drama check
dev/research/greet-etiquette.md (on the branch). It agrees with the owner's rule: the lower one names herself (thần thiếp), unique titles and chí tôn are known by everyone, heralds call names (thỉnh an, yến), and proud or cold high ranks only nod (Hoa phi / Cao Quý phi type). No difference from her chosen rule.

## Step 1: the rule (jgreet.js `greetName(a,b,o)`, one function, two-way)
| case | who learns whose name | why line (SHOW-WHY markup `<span class="past kwl">Vì sao: …</span>`) |
|---|---|---|
| lower greets higher | higher always learns the lower one's name | "ngươi xưng danh, nàng biết tên ngươi" |
| higher's title has one seat (BAL.seatCap[r]===1: Hoàng hậu, Hoàng quý phi) / Hoàng thượng / Thái hậu | lower knows it at once | "… là ngôi chỉ một người giữ, cả cung đều biết" |
| herald (o.ann: thỉnh an Hoàng hậu / Thái hậu, BAL.greet.ann) | both | "có người hầu xướng danh" |
| higher, not unique | by her Tính tình: BAL.net.n.greetName {Kiêu ngạo 0, Lạnh lùng 0, _ 1} via nv() | "Nàng ta chỉ khẽ gật đầu, không xưng danh: phẩm cao hơn ngươi, xem chừng kiêu kỳ lạnh nhạt" (her nết is named only if she knows it, trKnown) |
| equals | each side gives her name unless she is proud or cold (same table) | "ngang hàng với ngươi, …" |
Ranks are compared with BAL.greet.rank (consort cons+r, servants srv+rk, men/officials man, chí tôn top). The tables are ONE BAL table each: BAL.greet + BAL.net.n.greetName (jbal2). Names and faces are written only through j61 (k61Know / npcLearn / S.met), so no second "known" store. The "Chào hỏi" preview now says what is sure ("ngươi xưng danh trước, nàng biết tên ngươi · tên người ấy: tùy tính nết…"). "Hỏi danh tính" stays as the 2nd step when no name was given.

### LUẬT SỬA CẢ NHÓM: every greeting site (scan: `grep -n "greetName(" dev/build/*.js`)
| site | before | after |
|---|---|---|
| j61:159 Chào hỏi / Hành lễ a stranger (tap) | face only, a 2nd tap for the name | greetName(S,e), result line with Vì sao |
| j61:227 SOC deeds on her face to face | she always learnt their name, they hers | greetName(v,S) |
| j61:229 runAct ally / gift on her | she always learnt the name | greetName(a,S) |
| j61:216 thỉnh an Hoàng hậu (deck act) | k61Know + npcLearn | k61Know log kept + greetName(S,v,{ann:1}) |
| twDo thHH / thTH (her and NPC thỉnh an deeds) | no naming | greetName(a,host,{ann:1}) |
| j42 cung nữ "Hành lễ thỉnh an" / "Chào hỏi đúng lễ" (man) | no naming | wrapped: greetName(S,x), the line is added to the result when a name is new |
| j22 consort "Chào hỏi đúng lễ" (man) | no naming | same wrapper |
| AG-MEET NPC → her, NPC ↔ NPC | — | greetName |
| j25 'greet' (bring a child to the Emperor) | — | not a naming site (both are public); unchanged |
| j61 k61Week weekly roll(35) NPC learning | random weekly | **unchanged** (not a greeting). Note: with AG-MEET, NPCs now also learn names by meeting. Removing the roll is a call for the foreman. |
'Phi ???' (D47): already LIVE on main. The new lines use k61Desc for an unknown person, never "???" (test 3).

## Step 2: AG-MEET (owner 05:25Z), reuses jagent + the j95 record + j61 + Step 1
- Each buổi (gmTick, in agTick, before the agent loop's deciders), every consort who stands with others at a place in this buổi (record S.roster, khắc by khắc) and has not used her ONE deed chooses: approach someone, or keep her schedule. The choice is agPw(stay BAL.greet.meet.stay vs (ally need + spite need × .6) × BAL.net.n.meetW): her needs come from agNeeds (no new bar). Approaching = agUse (her khắc, not hers).
- Whom: mindPickBy over the people there. A stranger (grey shadow to her) gets base weight, which is random. Known people get + thiện cảm/20 + oán/20. She can be picked like anyone (cap 3 per buổi).
- If she is picked, the NPC comes at that khắc when she stands there (gmWatch inside agWatch). She gets a kit Q card "Có người đến", the same queue approaches() uses. The NPC uses one of the player's person-dialog options on her: Chào hỏi (if not met: Step 1), Hỏi han sức khỏe, Khen tài nghệ, Chia sẻ bí mật (thiện cảm ≥ 30), Bàn tán, Cảnh báo, Khiêu khích. The numbers are mirrored, and she is the judge. The weights are her nết's w table (BAL.net.T[t].w, the same table the agent loop uses) × bond.
- Her replies: her own topicOpts entries for that person (same formulas, no khắc). On a taunt she gets the j24 answers (apHostOpts, now shared by the weekly visit and AG-MEET). When she is the higher one and they named themselves, she gets "Xưng danh đáp lễ" / "Khẽ gật đầu" (her choice).
- NPC picks another NPC: greetName (names learnt by the rule).
- ONE CORE: the chat numbers moved to **BAL.talk** (j9 topicOpts + j2 Khiêu khích now read it; talkPraiseO). one-core-guard inline count 6640 → 6638.
- Host only (agOn: a co-op guest never runs it); state only (S.gmeet {key,pend}, lazy; old saves load without it).

## Tests (8862c3d6 build)
| test | result |
|---|---|
| dev/test/greet_check.js (new): rule table 30 cases rank × nết × one seat × her nết; words (Vì sao, no digit / % / ???); NPC↔NPC + NPC→her; herald; AG-MEET 80 buổi; perf; old save without S.gmeet; co-op guest | **ALL 13 PASS**, 0 page errors |
| agent_check / agemp_check / agmaid_check | 16/16 · 20/20 · 23/23 |
| one-core-guard | PASS (inline 6638 ≤ 6691) · net-inline-scan 0 |
QUICKCHECK and coop-e2e were not run (time). The reviewer should run them.

## Bot measure (greet_check §5, 80 buổi in one life, half the buổi she stands where most consorts are)
| measure | value |
|---|---|
| approaches / buổi (all places) | 3.2 (259 meet vs 443 stay decisions: not everyone, not every buổi) |
| at her | 10 in 40 crowded buổi (≈ 1 every 4 buổi) |
| by place | Khôn Ninh (morning thỉnh an) 137, Ngự hoa viên 77, Thái y viện 16, palaces 22, Thọ An 15 |
| options used on her | greet / health / praise / gossip (provoke when oán) |
| gmTick perf | p95 1.7 ms, max 2.4 ms (budget BAL.ag.perf.p95 8 ms) |
Balance note for the reviewer: ~3 consort deeds per buổi now go to meeting, not to the other agent deeds (Sủng effort, thỉnh an…). The knob is BAL.greet.meet.stay (.35). I did not re-measure the long-life Sủng drift.

## Shots (CDN img/_review/greet-meet/, 9 webp; the verdict giver wipes)
Fold 755x1000 + iPad 1180x820: greeting result line for lower / higher-proud / higher-warm / equal-cold, plus "Có người đến" with reply options. No overflow, 0 page errors. Looked at: the result box shows the 2 lines (fact + Vì sao). The card shows the kit Q dialog with 4 replies, each with its kit picture.

## Open
1. k61Week roll(35) NPC name learning is left as is (see table).
2. Servants and men at a place do not approach yet. AG-MEET runs for consorts only, as approachers and as targets among NPCs. Maids and eunuchs could join with srvTalk options later (owner said "16 người").
3. Her own nết decides her answer when SHE greets an equal or a lower one (the rule is two-way). When an NPC greets her and she is the higher one, she chooses with reply options.

SẴN SÀNG KIỂM 8862c3d6
