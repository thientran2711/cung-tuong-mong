PASS 5f58a7156533afda959e0c591d9e64e66cbea142 — review/npc-death-r1 (D4 npc-death 84b184c4 merged onto origin/main 0ee35a63; ancestor check OK)

# Review D4 npc-death → review/npc-death-r1 (reviewer opus, session_01DgYSWocL5CmLHseB9i8sEn, for Foreman D)
START_CTX ≈ 4 % of 1M (own estimate); finished ≈ 15 %; no rollover.

## Merge
- 035a0df3: merge onto main e9c6021d. Conflicts: assemble.py (main list + jnpcd.js LAST), jcoopworld W_KEYS (union: main's luxEdict + lyF/fdead/fidDead/dnames).
- 5f58a715: re-merge onto main 0ee35a63 (main added jact2.js, jmline.js; jnpcd.js kept last). jmline staff removals checked: all are expulsions (Tân Giả khố / Thận hình ti), not deaths → correctly NOT retired (person alive). Site rebuilt (index.html, sw.js, assets.json).

## Reviewer fixes (c3f1f91e^, small, on the branch)
1. WHOLE FAMILY gap — men: facesPresent only counted LIVING men, and men die outside jmort (xử trảm / đày: j22, j24, j42, j96, j99succ) with only alive=false → their face went back into the pool and a living man entering a new age band could draw it; old saves with dead men had the same hole. Fix in the ONE place (jnpcd facesPresent wrapper): dead men's faces count as present. Test 12 (60 draws, 0 hits).
2. Visible bug in the worker's own 1180x820 shot: Lý's stage name read "Thường tại ??? tại ???" / "Lý Đáp ứng ???". Cause: her j59 name (Lý + J59FAL given name) shared the given name of an unmet consort (e.g. "Mạnh Nhược Lan"), and j61 masks that stranger's given name inside Lý's name. Pre-existing on main but now visible every visit (she always stands there). Fix (whole names family): j59gen skips a given name that a living 3-word name already ends with; freshName (namesInUse) also avoids Lý's and the officers' j59 names and dead 3-word names; lyNameFix() repairs old saves / starts on load. Test 13 (repair, 300 freshName, 50 j59gen: 0 clashes); stage probe 7 runs: no "???".
3. ONE CORE: Lý's yearly ageing fallback read a typed 34 → BAL.mort.ly.age.

## Checks
| check | result |
|---|---|
| one rule in one place | jnpcd npcRetire (face/figure/name) called from jmort kill for every NPC group except Emperor/Thái hậu/children (Emperor/Thái hậu not touched; children: kidVar avoids dead siblings' variants); drawF via facesPresent, figPick via figUsed, names via j59taken / namesInUse / newMaid. Servants dying outside jmort: turn-text sweep. |
| numbers in BAL | BAL.mort.ly {age, floor, lcShow}, BAL.mort.dead.keep. Code fallbacks only when BAL is absent. |
| old saves | npc-death test 1: main-build save loads, Lý created with lifespan, 24 months, 0 errors; mortality old-save OK; dead men / Lý name clash repaired on load. Dead officers from before this branch cannot be repaired (their old face was deleted, no record) — accepted. |
| bots `npc-death-bots 10 30` (after r1 fixes: 6 30) | portrait reuse of the dead 0, figure reuse 0; Lý beside fallen rival 7/7 (10/10); Lý died 7/10 (4/6) lives; palace sizes sane; errors 0 |
| dev/test/npc-death.js (main checkout as oldRoot) | 13/13 (11 worker + 2 reviewer) |
| dev/test/mortality.js 240 3 / 120 2 | miss 0 every life, errs [], pageErrors [] |
| dev/test/mortality-ui.js (755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 rotate) | ALL PASS |
| dev/test/coop-e2e.js (live Worker) | 59/59 (twice: after each merge) |
| screenshots (looked at) | 1180x820@2 Trường Môn viện: player + fallen rival (Người lạ silhouette, j61) + Phế phi Lý Tĩnh Nghi, name now clean; 755x1000@2 Dư đồ: Trường Môn viện "2 bóng". No overflow / cut text. |
| kit | no new UI part; portrait fallback = kit silhouette img/kit/unknown-f|m (KIT §49.3), figures keep D50 kitSilFig chain. |
| VANPHONG | new lines cổ trang ("qua đời ở Trường Môn viện, thọ N tuổi", "Hoàng thượng hạ chỉ rửa oan … ở lại Trường Môn viện"); no %, no modern words. |
| Foreman D decisions | rgl_ly3 no longer frees Lý (OD:L641) — kept; full j59 names for officers — kept. |

## ART NEEDED (Foreman C, not a FAIL)
Bots: ~8–10 of ~29–31 living NPCs at year 30 have no portrait of their own (pools too small once dead faces are retired): eunuch / official / Thái y / maid / mama portraits + figures, all 4 age bands. Note: CDN now has img/fig-fallen-ly1-a26.webp (Lý art) — not wired in this branch; wiring is a separate task.
