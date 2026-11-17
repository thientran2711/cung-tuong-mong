PRIORITY #1 CHECK ('npc-death|jnpcd'): OD 0 | ledger 3 | claims 8 | main 0 | review/* 4 → reused review/npc-death-r1 PASS 5f58a715 + review/npc-death-r1-golive 33e1bc22 (review/* 4 = those 3 + this branch).

# D8 npc-death re-wire → review/npc-death-wire @de166c3f (worker opus session_01964izBuQu8dWabKyYB69JE for Foreman D #8)
START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate). Finished ≈ 25 %; no rollover.

## What was wrong (golive HOLD, d-golive row 5)
Main's j95 people record (S.roster, j95ppl) is the ONE source of who stands where; Lý was not in it, so j95stage dropped her entry (kind "fallen" with no consort ref) at every Trường Môn viện visit. The Thái y viện FAIL and the "dead man fc" FAIL were harness: on main a pending card (Q) blocks goTo, and hand-set state needs the record sync the game does each khắc.

## Changes (branch = 33e1bc22 + origin/main 7abaf07a merged)
| file | change |
|---|---|
| merge | assemble: main's list + jnpcd.js LAST; jcoopworld W_KEYS = main's (incl. thIll/cm/men/menG2) + lyF/fdead/fidDead/dnames; j14 coldVisit uses lcPeople + main's seat-aware restore; CHANGE union; site rebuilt |
| dev/build/jly.js | `lyAlive()` + `lyEntry(info)`: ONE Lý stage entry (record id lid "c:ly"); lcPeople uses it |
| dev/build/j95.js | j95ppl: Lý = record person c:ly, home "lc" while alive (none after death / old-save freed); her plan = lc every khắc; old j95vis rule c:ly→lc; j95stage keeps a fallen entry by its lid (was: dropped for no ref) and adds Lý when the record has her here; j95ledObj("c:ly"); NEW `j95gone(id)`: ledger stage drops anyone drawn whose person is no longer in the palace (dead consort / maid / servant / child / man / Lý / Thái hậu), whatever path drew them; court post names on the stage follow the holder for ty + ped (ksp was already) incl. maid-road srv entries; a rival freed from lãnh cung leaves lc in the record from the current khắc |
| dev/build/j2.js | Kính sự phòng visit shows the current post holder's name (was fixed "Tổng quản"; same as Thái y) |
| dev/build/j61.js | k61SexAt lc: Lý + fallen rivals, no forced 1 (dead code today: silChip returns "") |
| dev/test/npc-death.js | harness: j95sync + Q cleared before goTo; Lý check = fallen entries on the stage (main design also draws the fallen rival's servants); after her death stage AND countAt("lc") = 0 |
| dev/test/roster_audit.js | its independent palace list counts Lý (c:ly) while alive |
| dev/measure/npc-death-places.js | NEW family scan (below) |
No new UI / kit part; no new number (lcShow etc. already BAL.mort.ly); no wording change except names.

## Family scan — every Dư đồ place after deaths (`node dev/measure/npc-death-places.js <root> 3 18`; each month a rival / servant / court holder / man reaches the end of life via jmort, rivals sent to and freed from lãnh cung, Lý dies month 9 (branch only))
| check | before (main 7abaf07a) | after (this branch) |
|---|---|---|
| place visits checked | 342 | 477 |
| deaths forced (rival / servant / court / man / Lý) | 13 / 46 / 24 / 11 / – | 15 / 54 / 27 / 12 / 3 |
| dead person on a stage | 0 | 0 |
| court post shown under a dead/old name | 0 | 0 |
| Lý missing at Trường Môn viện while alive | **44 / 44** | **0 / 54** |
| Lý shown after her death | n/a (main: no death) | 0 |
| fallen people at Trường Môn viện ≠ (fallen rivals + Lý) | 44 | 0 |
| page errors | 0 | 0 |

## Tests
| suite | result |
|---|---|
| dev/test/npc-death.js (main checkout = old save) | **13/13** (was 10/13 on this branch before the wire; golive had 8/4) |
| ledger_shadows 30 moments (shown = record) | new bad 0 · main bad 0 |
| stage-counts (old suite) | new mism 2 places thd + 1 cnv · main 4+ places thd (pre-existing, not worse) |
| roster_audit sens 2 lives | new a2 g3 · main a1 g5 (same pre-existing kinds: "buổi thiếu s<sid>", empnight gate), 0 page errors, j95errs [] |
| mortality.js 120 2 | miss 0, errs [], pageErrors [] |
| quickcheck.sh (de166c3f vs live 7abaf07a) | **PASS** · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world) · old save ok · render 200/208 ms, buổi 734/1022 ms |
| coop-e2e (live Worker, regression guard only) | 60/60 |
| shots (looked at; scratch, not in git) | 1180x820@2 Trường Môn viện: player + fallen rival (Người lạ, j61) + Phế phi Lý Uyển Dung + servant, names clean, feet not cut. 755x1000@2: kit pages 2 per page (+6), Lý on the next page; no overlap |

## Notes for Foreman D
- Main design: a fallen rival's servants follow her to Trường Môn viện in the record (5 people with her). The player's own fall keeps only 1 loyal servant (j14 cold). Not changed here (not this task); flag if the owner wants rivals to lose their servants the same way.
- ART NEEDED from D4 still stands (portrait pools for eunuch / official / maid; img/fig-fallen-ly1-a26.webp on CDN not wired).

SẴN SÀNG KIỂM de166c3fbf28d232a119ddb72db7f985806809d7

---
(previous D4 report below)

SẴN SÀNG KIỂM 84b184c47d2168c05f969c191a9a8dc827e3fcc6 — D4 npc-death (orphan audit #18): NPC deaths → NEW persons with new faces/names, Phế phi họ Lý lives beside fallen rivals and dies; branch review/npc-death (on main b85cdb1e, built on jmort).

# D4 — NPC death + new faces + Phế phi họ Lý (review/npc-death)

Worker session session_01DgYSWoy8UWVPrve6HEjZfR (opus) for Foreman D. START_CTX ≈ 3 % of 1M (own estimate; get_session read 0). Finished at ≈ 25 %; no rollover needed.

## Owner rules applied (verbatim source: dev/OWNER_DECISIONS.md L640–643, 15/11 ~20:40Z)
- Lãnh cung: when a real rival is sent to the cold palace, Phế phi họ Lý STAYS too; she only leaves when she dies.
- ALL NPCs can die; maids and eunuchs are replaced right away by a NEW person (new face/picture — never the dead person's picture); some posts have no replacement (Lý: empty until a real person arrives).
- Phế phi họ Lý gets her own story line → already on main (jreign rgl_ly1–3, reign-road PASS); reused, not rebuilt.
Also: ONE CORE (OD:L1267: new numbers in BAL.mort.ly / BAL.mort.dead), gain-and-loss unchanged (no new act), kit only (no new UI part), co-op world rolls host-only, old saves load.

## PRIORITY RULE #1 check
git grep origin/main + review/*: jmort (mortality-r1, live) already kills every NPC group and refills seats; jly.js has the persistent S.lyF; jreign has her 3-step Tâm nguyện; j59 gives officers personal names; j17 drawF/facesPresent pick faces; j39 figPick/figUsed pick figures. No other npc-death / phế-phi branch exists. Everything below hooks these.

## What changed
| file | change |
|---|---|
| dev/build/jnpcd.js (new, last in bundle) | `npcRetire(p)` keeps the dead's portrait (S.fdead), figure (S.fidDead, stays in figUsed) and name (S.dnames, newest BAL.mort.dead.keep). facesPresent counts retired portraits → drawF never gives them to anyone (both passes). figPick keeps retired figures used. kidVar avoids dead same-sex children's variants while one is free. newMaid never takes a dead maid's name. `npcRoleGone(k)`: the dead post-holder's Việc nhờ (active, follow-ups, debts) and Tâm nguyện end. WHOLE FAMILY sweep around endTurn / monthTick: a servant who vanishes from every palace AND whose name the turn's text links to a death (j10 "bị đánh chết", j70, any path outside jmort) is retired too; one who only moved / fled / married off is not. fsrc: when a person has no portrait left and the generic fallback picture is a retired face → kit silhouette img/kit/unknown-f|m. `lyDie()`: news line "Phế phi Lý … qua đời ở Trường Môn viện, thọ N tuổi." + whether her rửa oan was done; cold-palace causes only (no Nam Uyển / yến tiệc accidents). Lý exists from day 1 (start + old-save load) and ages each year (host). |
| dev/build/jmort.js | Lý is a world person (worldPeople), rolls the adult curve with floor BAL.mort.ly.floor; kill(): retires every dead NPC; Lý → lyDie; maid → fresh name + npcRoleGone("maid"); court seat → gen+1, drops the dead's figure (delete fid), new j59 personal name (never a dead one), npcRoleGone(eun/doc/ksp); ledger group "ly". |
| dev/build/jly.js | `lcPeople(info)`: fallen rivals (≤ BAL.mort.ly.lcShow) + Lý while alive; Lý age from BAL.mort.ly.age. |
| dev/build/j2.js, j14.js | Trường Môn viện visit and her own cold-palace stay use lcPeople → Lý stays beside a fallen rival; after her death nobody stands in ("Không gặp ai."). |
| dev/build/j2.js, j42.js | Thái y viện shows the CURRENT Thái y's name (was a fixed "Thái y Trương"). |
| dev/build/j59.js | exports j59gen + J59N for jmort; j59taken also excludes dead names. |
| dev/build/jreign.js | rgl_ly3 end: name cleared, she STAYS in Trường Môn viện (was "về chùa tu hành" = leaving alive, against OD:L641). Goal text "Rửa oan án năm xưa trước khi nhắm mắt." Old saves with lyF.freed keep it. |
| dev/build/jcoopworld.js | W_KEYS += lyF, fdead, fidDead, dnames (one Lý and one retired-face list for both players; host rolls). |
| dev/build/jbal2.js | BAL.mort.ly {age 34, floor 3, lcShow 3}, BAL.mort.dead {keep 400}. |
| dev/build/assemble.py | + jnpcd.js |
| dev/measure/npc-death-bots.js, dev/test/npc-death.js | bots + checks (below) |

## Bots — before (main b85cdb1e) / after (this branch). `node dev/measure/npc-death-bots.js 10 30` ("world" style: she is kept alive, every other group runs up to 30 years; a life ends early when the Emperor dies)
| per 10 years played | before (175 y) | after (177 y) |
|---|---|---|
| consort deaths | 4.46 | 4.46 |
| court officer deaths (Tổng quản / Kính sự phòng / Nội vụ phủ / Thái y) | 2.29 | 3.11 |
| servant deaths (all palaces) | 0.57 | 1.24 (more are now SEEN: detection reads the same death text; rate is jmort's, unchanged) |
| her cung nữ thân cận deaths | 0.06 | 0.11 |
| Phế phi họ Lý deaths | — (never died) | 0.34 (died in 6/10 lives; lifespan floor 3 y) |
| new consorts in (tuyển tú etc.) | 5.03 | 4.12 |
| replacement maids / officers / servants | 0.06 / 2.29 / 0.57 | 0.11 / 3.11 / 1.24 |
| **living person shown with a DEAD person's portrait** | **41** | **0** |
| **living person shown with a DEAD person's figure** | **57** | **0** |
| Lý present beside a fallen rival (checks) | 0 / (stand-in only when nobody fell) | 84 / 84 |
| palace at the end (consorts / servants, range) | 4–15 / 7–20 | 5–13 / 7–23 (sane, unchanged) |
| living NPCs with no portrait of their own at the end (avg of ~31) | 0.5 | 7.6 → shown with their figure portrait or the generic band picture; 0 kit silhouettes in the run |
Differences in death counts are run variance + detection (same jmort numbers; no rate was changed).

## Tests (one at a time)
- dev/test/npc-death.js /path/to/main-checkout: **11/11** — old save from the main build loads (Lý created + lifespan, 24 months); Lý beside a fallen rival; Lý dies → news line; Trường Môn viện then empty; maid dies → new name + new portrait, dead retired, her Tâm nguyện / Việc nhờ ended; Thái y dies → new personal name ("Trương Tử Hiên qua đời; Thái y Mã Tử Hiên lên thay"), portrait + figure retired, Thái y viện shows the new name, 40 new draws never return the dead face; servant beaten to death outside jmort retired; co-op world keys; 0 page errors.
- dev/test/mortality.js 240 3: miss 0 on every life, errs [], forced Emperor fates OK, care OK, old save OK, 0 page errors.
- dev/test/mortality-ui.js (755x1000, 1180x820): ALL PASS.
- dev/test/coop-e2e.js (live Worker): **59/59** (shared world, rejoin, rebirth, solo old save).
- Screenshots (looked at): reports/npc-death/lc-ly-1180x820.jpg — Trường Môn viện stage with the fallen rival (Người lạ silhouette, j61 rule) AND Phế phi Lý Uyển Dung; reports/npc-death/lc-ly-755x1000.jpg — Fold Dư đồ, Trường Môn viện shows 2 people. (On Fold one-page mode the harness could not bring the room page forward over the open tab; the stage content is the same page as iPad.)

## KIT
No new UI: news lines go through the existing month log/news; persons use existing kit faces; the only picture added is the existing kit silhouette img/kit/unknown-f|m (KIT §4.3). No KIT REQUEST.

## ART NEEDED (Foreman C — do not paint here)
"Never reuse the dead's picture" now holds, so the small portrait pools run out in long games (bots: ~7–8 of ~31 living NPCs at year 30 have no portrait of their own). Pools today (FPOOL): eunuch eun0 10 / eun1 2 / eun2 1 / eun3 2; official off0 1 / off1 3 / off2 3; maid 15 (+ tiered); mama 6; womid 5. Wanted: eunuch portraits + figures ≥ 12 per age band (a26/a36/a51 most needed), official/Thái y ≥ 8 per band, maid/mama ≥ 10 more each, all 4 age bands per person (ART COMPLETENESS rule).

## QUESTIONS for Foreman D
1. rgl_ly3 used to free Lý ("về chùa tu hành"). I changed it to: name cleared, she stays until death (OD:L641 literal). If the owner wants the release kept as the quest reward, revert that one line in jreign.js.
2. Court officers used to be renamed "Thái y Vương" (surname only); they now get a full j59 personal name like the first holders.

## Handover (if a successor continues)
Branch review/npc-death @84b184c4. Build: python3 dev/build/assemble.py. Old-save test needs a checkout of main with dev/index.html built (`git worktree add --detach <dir> origin/main && python3 <dir>/dev/build/assemble.py`).
