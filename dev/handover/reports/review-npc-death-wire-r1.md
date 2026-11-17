PRIORITY #1 CHECK: OD 0 (npc-death|jnpcd|j95gone) | ledger 3 | claims 8 (D4 npc-death PASS 5f58a715, golive HOLD row 5, wire worker, this review) | main 0 | review/* 4 (npc-death, npc-death-r1, npc-death-r1-golive, npc-death-wire) → reviewed the existing branch, nothing rebuilt.

PASS 9253ec1b3c9f05d1f8085ad4506fe93c57706000 — review/npc-death-wire-r1 (review/npc-death-wire de166c3f + origin/main 4719d424 merged; ancestor check OK)

# Review npc-death-wire r1 (reviewer opus, session_01964izCQT8gNjjT2WA7WDjh, for Foreman D #8)
START_CTX ≈ 5 % of the window (own estimate); finished ≈ 20 %; no rollover.

## Merge (generated files only conflicted)
- 78832ecf: merge main 64c39ca2 — assemble.py: main list (jdemo, jlevel, jemoact, jroad family…) + jnpcd.js LAST; CHANGE.txt: npc line as its own top line; index/sw/assets rebuilt.
- 9253ec1b: re-merge main 4719d424 (batch-0415: j61/jfx/… touched; j61 k61SexAt lcPeople line kept clean); CHANGE own line on top; site rebuilt.
No reviewer code fixes were needed.

## Golive HOLD (d-golive row 5) — all 4 cleared
| hold item | now |
|---|---|
| Lý not in Trường Môn viện (main's j95 record bypassed lcPeople) | c:ly is a j95 record person (j95ppl, j95vis k==="lc", plan "Phế phi ở Trường Môn viện", j95stage + j95ledObj via ONE lyEntry); test 2 ok; places scan lyMissing 0/54 (main: 54/54) |
| after her death the place still lists people | j95gone drops c:ly / dead rivals / dead men / gone servants / dead kids on every stage pass; test 4 ok (stage [], map count 0); scan lyAfterDeath 0 |
| Thái y viện no new name | j95stage renames ty / peddler / ksp to the current holder; goTo ksp reads S.court.ksp; test 8 ok; scan courtName 0 |
| dead man fc "" (harness) | test 11 ok (60 draws, 0 hits) |

## Checks
| check | result |
|---|---|
| ONE people source | no second list: Lý lives only in S.lyF, read through lyAlive()/lyEntry() by j95ppl, j95stage, j95ledObj, lcPeople, k61SexAt; freed rival leaves lc in the record (j95sync "cold" → home) |
| whole family (places scan `npc-death-places.js . 3 18`, every Dư đồ place each month after deaths) | branch: 477–531 visits, deadOnStage 0, courtName 0, lyMissing 0, lyAfterDeath 0, lcCount 0, freedAtLc 0, 0 page errors. main 64c39ca2 same scan: lyMissing 54, lcCount 54 (rest 0) |
| map count / ledger | ledger_shadows 40 moments: branch hidden/extra/twice 0 (2245=2245); main same (2250=2250). stage-counts: branch mism tyv/r2/kn/vuon, main mism kn/tn/r4 — random per world; probe at tyv shows the SAME arrival-khắc mismatch on main (pre-existing, not this branch) |
| npc-death.js (main checkout = old save) | 13/13 on both merge heads |
| mortality.js 120 2 | miss 0, errs [], pageErrors [] |
| one-core-guard | PASS (fails 0) |
| quickcheck.sh | PASS ×3 (open, old save ok, core gates PASS). Perf noisy on this box (render+buổi new/live 1072/1050, 1267/992, 1234/1148); direct A/B render() median 44.9 vs 45.2 ms (6 alternating runs), monthTick ~+1–2 ms (jnpcd sweep) — no real regression |
| coop-e2e (live Worker, regression guard only) | 60/60 (worker had 59/59) — not worse; no co-op code touched beyond W_KEYS already in r1 |
| numbers from BAL | BAL.mort.ly {age,floor,lcShow}, BAL.mort.dead.keep; no new typed number |
| VANPHONG | no new player text beyond r1's; CHANGE line cổ trang, no % |
| KIT | no new UI part; stage uses existing kit figures / silhouettes / name tags |
| shots (looked at, scratch only) | iPad 1180x820@2 Trường Môn viện: player + fallen rival (Người lạ) + "Phế phi · Lý Ngọc Dao" + unmet maid, feet not cut, no overlap; same place after Lý's death: she is gone (6 người). Fold 755x1000@2 Trường Môn viện: 2 figures + "+6" overflow chip (kit stage rule; Lý is in the +6); Fold Thái y viện after the Thái y died: new holder "Thái y Hà Thừa Ân" on the stage. Note: the worker test's own 1180 shot shows the Hành sự tab, not the stage — harness only, not a game fault |

## Notes (not FAIL)
- Lý's stored S.lyF.name stays "Phế phi họ Lý"; her shown personal name comes from S.lcfPn (lyNameFix) — consistent everywhere checked.
- lyAlive() calls lyFallen(), which creates S.lyF if missing; harmless (start/deser already create it), co-op guest gets the host's lyF (world key).
- ART NEEDED from r1 still stands (eunuch / official / Thái y / maid portrait pools; Lý art img/fig-fallen-ly1-a26.webp on CDN not wired).
