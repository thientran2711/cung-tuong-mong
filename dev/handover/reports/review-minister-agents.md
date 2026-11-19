# REVIEW minister-agents r1 — BIG REVIEWER (C-AG #20 child, session_01Rc5AsHdFbiZELj46cV3rq8)
PRIORITY #1 CHECK ('minister'): OD 4 | ledger 0 | claims 6 | main 15 | review/* 0 | archive 0 (PL#7 moved E → C-AG; reuses the LIVE npc agent engine: agOn/agCap/agErr, mindPick, jnet, j55 acts, j61 registry — no second system: confirmed in code).
START_CTX ≈ 3 % (context_usage read 0; estimate).

## VERDICT: PASS — LAND READY a2c6ce4eb09ba2ed1e3dcc34539da4c8fbfa064d
Branch `review/minister-agents-r1` @ a2c6ce4e = worker 0d3f2b03 (already final-merged LIVE main fd6118cd) + reviewer fixes. origin/main fd6118cd is an ancestor → fast-forward only.

## Reviewer fixes (on review/minister-agents-r1)
| # | finding | fix |
|---|---|---|
| 1 | LAW 4 ONE CORE: new censor card typed "quý ngươi +20" (copied from j55, which also typed +20, "Bạc -40", "từ 40"); jagmin BAL.ag.min.tuyen.pow / imp.deep / clanRel mirrored j55 literals 65 / 3 / -25 (two places, same number) | new BAL.tdCourt {giftAf:20, backs:40} (jbal2); j55 tdGift + tdBacks + head card + censor card read it; head card "Bạc -" reads BAL.bacFee.tdGift; j55 tdSoMonth / tdImpPick read BAL.ag.min.tuyen.pow, BAL.ag.min.imp.deep, BAL.cut.clanRel (whole group of the gift deed fixed) |
| 2 | LAW 6b real people / name mask: censor "unique name" collided in 28 of 30 lives (MALEN holds only 10 given names; filter fell back to MALEN; once a full duplicate "Thẩm Tử Khiêm" = the nhạc sư) | given name joins two MALEN syllables into a name NOT in MALEN and not equal to any person's k61Vars form (full / last two / first+last). Probe after fix: 0/30 at draw, 0 mask collisions after 24 months |
| 3 | censor with nết "Vì gia tộc" got goal "lo thanh thế nhà mình trong cung" (he has no house in the palace) | minGoal skips "nha" for the censor → next nết match or nsDflt liem; test 2 updated |
| 4 | praise news line did not name the speaker (other memorials did) | "<office> <name> dâng sớ khen …" |
| 5 | Tin triều đình row face: censor lines showed the impeached consort's face / blank (tdNewsFace looked only at the 5 heads) | tdNewsFace reads minAll() when agents on |
| 6 | card wording split by the kit row splitter into "càng quý · ta càng khó…" | "ông càng quý thì ngươi càng khó bị hặc can chính" |

## Laws checked
- 6b REAL PEOPLE: every system memorial (praise/dich/imp/tuyen/cc), ccStep, tdLeak, moodMonth tham, j7 minister, j67 c1 names a living S.trieu official; censor is in j61 registry, ages, faces in use. PASS.
- 1 TWO-WAY: she courts the censor by the same tdAct gift deed; worried NPC consorts court him by the same tdGift; he impeaches her and NPCs by the same ccRisk; she can turn him on others via tdLeak (named). PASS.
- 4 ONE CORE: after fix 1, one-core-guard PASS (inline 3986 < 4212). PASS.
- 8 EXPERT: Tả đô ngự sử / Đô sát viện (Ming/Qing) — correct; juniors unnamed accepted.
- NPC same rule as her: gift, regard, ccRisk shared. PASS.
- KIT: censor card = .rival.tdh + tdActBtn + chip + sbar, no new CSS; same shape as the heads' cards (looked at Fold + iPad shots). PASS.
- VANPHONG: odds in words (Năm ăn năm thua / Liều), no %; goal words cổ trang. PASS.
- Save compat: old save gets censor lazily; quickcheck old-save step ok. PASS.

## Tests (a2c6ce4e)
- minister-agents 11/11 PASS (×4 runs), one-core-guard PASS, agemp_check 20/20 PASS.
- QUICKCHECK --cpu 4 PASS (Fold open + old save, iPad perf): render 161/159, tab 325/333, buổi 991/838 ms (within gate; buổi noisy run to run).
- Shots looked: worker CDN img/_review/minister-agents/{fold,ipad}-{court,news} (Fold 755x1000@2, iPad 1180x820@2) — card fits, no cut text, no overflow; own probe 0 page errors, no horizontal overflow on both. CDN review folder wiped with this verdict.

## Not blocking (follow-ups for C-AG)
- j67 arc cards still say "Ngự sử hặc" / "Ngự sử, môn sinh cũ của cha" (lines ~332, 580, 591, 910–927) — junior censors per expert ruling; if the owner wants the head censor there, add a {ns} token like {hobo}.
- j55 still holds older typed numbers outside this feature (Thái hậu -8, nhà mẹ đẻ -15, Danh -4, TD const) — pre-existing, one-core baseline.

## MERGE ORDER with review/npc-purpose (not live)
Land minister-agents FIRST (it is FF on live main). npc-purpose then conflicts in dev/build/j55.js (tdSoMonth head + praise + tuyen + cc hunks), assemble.py (module list: keep both jagmin + npc-purpose files), index.html/sw.js (rebuild). Resolution: keep jagmin's lines (tdDichOpen(), MINP checks, minBy/minWhy texts, BAL.ag.min.tuyen.pow) and take npc-purpose's stake weights + npwPick as the agents-off path inside f0 (jagmin wrapper calls tdSoMonth(force) and both honour force); in tuyen/cc/imp keep the MINP check BEFORE npwPick; take npc-purpose's dich DB=BAL.ag.why.g3.deb change. Re-run minister-agents + npc-purpose tests after.
