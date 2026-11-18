# E8 — steal-minigame (PARKING_LOT #3b) — report

PRIORITY #1 CHECK: OD 12 hits ('tranh sủng'; owner words PARKING_LOT.md row 3 16/11 ~22:20Z; night rule OD:L1478 FINAL) | main: j8.js:126-137 ACT steal/road + oSteal/stealNight, j2.js:63-64 deck cards, jsteal.js (NPC agent), j82.js playArt (KIT tài nghệ frame), jslap.js (game-before-act pattern), jbal.js:282 oddsLv/BAL.odds.cut | review/*: review/balance-chain jnf.js (flip choice, nfOdds, jbalcore rungDown — reused its band-keeping formula as stealRungUp) | claims: none (E8 row = this session).

Branch `review/steal-minigame` (from origin/main 550dd1b) — **sha 1c4fe5ad** (on origin). Commits: e3126a88 (feature), 1304d17d (Độ khó row, jnf scan, shot script), 1c4fe5ad (shot script, site rebuilt).

## What
- **jsmg.js** (new, last in assemble.py): ONE odds hook for every try — `oSteal(a,mode)` + a per-try token → `stealRungUp(o, BAL.steal.mg.rung)` on the word ladder (BAL.odds.cut, place inside the band kept, cap Nắm chắc / BAL.odds.hi). Token is made once per try, dropped when the try ends.
  - HER: Hành sự deck cards «Tranh sủng» / «Chặn ngự giá» (act) and the person-menu acts (doAct steal/road) open the game first, then the try runs as before with that try's odds. Already Nắm chắc → no game.
  - Game = existing tài nghệ game in the KIT frame via `playArt` (no new art / frame / CSS): Tranh sủng = Hát, Chặn ngự giá = Múa ("múa một khúc dưới đèn lồng"); board = mgTier occasion `trieu` (hầu Hoàng thượng). Intro rows «Trước khi ra tay»: Thắng (word → word), Thua hay không chơi (giữ nguyên, không mất thêm gì), Độ khó. Buttons «Bắt đầu» / «Thôi, không chơi · giữ nguyên <word>». Result row «Kết quả». Words from word() only, no %.
  - NPCs (never the co-op friend — she plays her own on her seat): the contest NPC roll `kg82NpcRaw` (BAL.mgTier.npc by her bậc in that art) vs the same win line, inside stealNight → same oSteal hook.
  - review/balance-chain night (jnf, OD:L1478): guarded adapter, active only when jnf is in the build — her pick in the 10-s flip choice records the choice (timer stops), then the game plays, then jnf's ONE resolve runs (S.nfX.st "mg" holds jnf's step meanwhile); NPC attackers roll at the resolve and in the ledger pass. A save made mid-game resumes the step (no rung). No night-rule number touched.
- **BAL.steal.mg** (jbal2, after BAL.steal): `{on:1, win:5, rung:1, art:{feign:"hat", road:"mua"}, occ:"trieu", npcP:1}`. win 5 = the green pass line of every game result. No cooldown key: one try a night already (j75).
- **j82 playArt**: optional `rows / rowsHead / go / skip / skipSub / resRows` (absent → unchanged; kit rows + kit buttons only).

## Tests
- `node dev/test/steal-mg-unit.js dev/index.html` (main build): 38/38 PASS, 0 page errors — ladder (each rung +1, cap, order), NPC feign/road win/lose (roll value = rung up / plain, one record per try, token gone), co-op friend no roll, HER doAct steal/road win/lose/skip, HER deck cards win/lose (card odds restored), one try a night → one game, at Nắm chắc no game, save has no new state.
- `node dev/test/steal-mg-nf.js <url>` on a LOCAL merge with origin/review/balance-chain d9fe15ed (not pushed): 7/7 PASS — her Tranh sủng / Chặn ngự giá in the flip choice won → resolve reads one rung up; lost / skipped → plain; NPC attacker win/lose; stale "mg" → "open". On main prints SKIP.
- balance-chain's own tests on that merge: night-multi 6/7 (case 2 NPC-vs-NPC FAILS the same WITHOUT jsmg — baseline of the merge with newer main, not this branch); night-final 9 PASS / case 7 FAIL, identical without jsmg (story dialog covers the choice in that run). No regression from jsmg.
- `steal-mg-unit` re-run on the final site build: 37 PASS lines, 0 FAIL, 0 page errors. (Correction in FIX 1: quickcheck is dev/tools/quickcheck.sh — see FIX 1.)
- Old save: night-steal-oldsave.js (main build save → new build): loads, same name, 6 weeks, 0 errors; its own FAIL line also fails main→main (outdated asserts hasBal/tries), not this branch.
- NPC chance to win the game (win 5): bậc 0 .36 · 1 .47 · 2 .58 · 3 .69 · 4 .79 · 5 .86 (kg82NpcRaw distribution).

LADDER (one rung up): 5 Liều→33 Khó · 30 Liều→45 Khó · 45 Khó→55 Năm ăn năm thua · 50 Năm ăn năm thua→60 Khá chắc · 60 Khá chắc→72 Chắc · 75 Chắc→87 Rất chắc · 85 Rất chắc→95 Nắm chắc · 91/95 Nắm chắc stay.

## Shots (local only per brief: CDN 401, no images in git) — `node dev/test/steal-mg-shot.js <outdir> fold ipadAir ipadPro iphone14` (HOST mode, built root index.html)
Looked at each. 5 shots per device (intro · Múa running · natural result · win result · skip result); checks on all 4: intro rows present, no %, win row, skip row, no horizontal overflow (frame + page), 0 page errors.
- Fold 755x1000@2.6: TÀI NGHỆ seal + «Chặn ngự giá: Theo bước múa»; Cách chơi; «TRƯỚC KHI RA TAY» Thắng (green) «cơ duyên lần này lên một bậc: Khó → Năm ăn năm thua», Thua hay không chơi, Độ khó; buttons Bắt đầu (red) / Thôi, không chơi · giữ nguyên Khó. Game board = the Múa painted stage, 4 step medallions, clock chip. Result «0/10 · Vụng: cơ duyên giữ nguyên Khó»; win «8/10 · Giỏi: cơ duyên lên Khá chắc» in green. (The kit word pass shows «cơ hội» as «cơ duyên»; the kit turns the single «Đã hiểu» into the ✕ close, same as every game.)
- iPad Air 1180x820@2 / iPad Pro 1366x1024@2: same frame with HER figure in the left column (kitGameFig), rows right; skip result «không chơi: cơ duyên giữ nguyên Năm ăn năm thua».
- 390x844@3: host shows «Xoay ngang điện thoại để chơi» over the frame (designed narrow-portrait behaviour, KIT §0).

## Notes for Foreman E / merge
- When review/balance-chain lands (jnf removes the deck cards and person-menu acts), only the jnf adapter path is live: game after her 10-s choice, before the one resolve. Verified by steal-mg-nf.js on a local merge (assemble conflict there = just keep both lists + 'jsmg.js' last).
- j75 on main checks `a.b!==2` but the cards sit at B4L=3, so j75's deck wrapper never marks them (__steal); jsmg detects the cards by name + B4L instead. balance-chain already fixes j75 (B4L). Not touched here.
- Choice to review: Tranh sủng = Hát (no exact "feign" art exists; Hát = voice/hold). Changeable in BAL.steal.mg.art only.
- No kit request needed (playArt extension = existing kit rows/buttons).

## Handover
Not needed (context well under the rollover line). START_CTX ≈ 3 %.


## FIX 1 (after E8r FAIL 1c4fe5ad) — sha ea93a33d
PRIORITY #1 CHECK: review dev/handover/reports/steal-minigame-review.md + brief briefs/E8f-steal-minigame-fix1.md | jnf.js (balance-chain d9fe15ed) read, NOT changed | claims: E8 this session.

| # | Review point | Fix |
|---|---|---|
| 1 BLOCKING | host's game (S.nfX.st "mg") dropped the friend's "ch" (jnf.js:336 takes only "open"); friend timed out by host game time | jsmg adds its own COOP "act" listener: a friend "ch" that arrives while st "mg" sets x.fr itself; when the host's game ends x.myAt restarts (jnf's friend wait counts from then). jnf.js unchanged. |
| 2 BLOCKING | friend's own game rung never reached the host resolve | GUEST: her pick sends SMG {ph:"mg"} at once; jnf's "ch" (from mine()) is HELD by a COOP.send wrapper until her game ends, then SMG {ph:"up", v, up} goes out, then the held "ch" (same socket → the host has her rung before her choice). HOST: "mg" notice holds jnf's friend wait open (x.myAt kept fresh, max BAL.steal.mg.coopMs = 120000) ; "up" stores FRUP → nfCtxUp gives the friend (a.coop) the token in the one resolve (same oSteal hook, same win/rung/cap). Her «lên Khá chắc» line is now true. |
| (found) | a REAL (async) game on the jnf path: chooseM renders inside, and the stale-"mg" render reset turned st back to "open" before the game opened → resolve ran without her rung | PEND flag: the reset skips while her pick is being recorded. The old sync test hook hid it; co-op C1 (async game) caught it. |
| 3 | KIT.md | §13: playArt options documented (rows / rowsHead / go / skip / skipSub / resRows + the old ones), example. |
| 4 | quickcheck | `bash dev/tools/quickcheck.sh` at ea93a33d: **QUICKCHECK PASS · 122 s · open 1254 ms · old save ok · perf new/live render 157/137, tab 318/302, buổi 701/697 ms, tasks>200ms 11/11 · core gates PASS**. |
| 5 | «cơ hội» in source | jsmg rows / result / log now write «cơ duyên» (owner quote in the header comment kept verbatim). |
| 6 | NPC balance | reviewer's probe (branch build, 8 lives, all NPC × mode, 200 rolls): NPC odds Tranh sủng 65.5 → 71.5 effective (game won .52), Chặn ngự giá 56.9 → 62.0 (.45) ≈ +9 % relative more NPC steals. NPC game-win chance by bậc (kg82NpcRaw vs win 5): 0 .36 · 1 .47 · 2 .58 · 3 .69 · 4 .79 · 5 .86. Two-way by design (she wins ~as often at matching skill). No BAL change made; knobs if Foreman E / D want less: BAL.steal.mg.npcP (chance an NPC plays) or BAL.steal.k. |
| 7 | unit case 7 vacuous | now runs with __bot removed and playArt stubbed: at 93 → playArt not called, at 50 → called once and won. |
| family | every place the game result crosses co-op | main (no jnf): her deck card / person-menu act run on her own seat (runAct local; co-op thin = local frame then ops sent; jcoopworld ASK invites = ally/gift only) → her token applies on her seat; the host never rolls an NPC game for v.coop. jnf: points 1–2 above. jnf itself still parks co-op (nfParked) today; this is ready for coop-thin E. |

Tests (FIX 1):
- `steal-mg-unit.js` (main build ea93a33d): 37 PASS, 0 FAIL, 0 page errors.
- `steal-mg-nf.js` on a LOCAL merge with origin/review/balance-chain d9fe15ed (not pushed): **11/11 PASS** — the 7 earlier + co-op C1 friend picks during host's (async) game → kept, resolved after, host rung on; C2 friend wins her game → her resolve odds one rung up; C3 loses → plain; C4 guest order «mg» → (game) → «up:1» → «ch». Co-op cases lift only jnf's nfParked gate in the test (COOPW.on reads false inside nfParked).
- quickcheck PASS (above).

## FIX 2 (after E8r2 FAIL ea93a33d: stale base) — sha 814078e5
- Merged origin/main b2a9d349 (has mg-skip-all r2 KIT §13.6 kitQuick, coop-thin-e). j82 playArt: main's QK / kitQuick / qRow kept; added only `rows / rowsHead`, `go` label and `resRows`. jsmg passes `quick:{n:"Thôi, không chơi", sub:"giữ nguyên <word>"}` (no skip/skipSub). KIT.md §13 text: the skip button = §13.6 quick. assemble: main's list + 'jsmg.js' last. Site rebuilt.
- `node dev/test/mg-skip-audit.js`: PASS (21 games, 21 with kit quick, 0 fails).
- `steal-mg-unit.js`: 37 PASS / 0 FAIL / 0 page errors.
- `steal-mg-nf.js` on a LOCAL merge with origin/review/balance-chain f9a37b7e (not pushed; conflicts only assemble.py + generated files): 11/11 PASS, 0 page errors.
- `bash dev/tools/quickcheck.sh` at 814078e5: **QUICKCHECK PASS · 149 s · open 1311 ms · old save ok · perf new/live render 150/184, tab 364/352, buổi 927/910 ms, tasks>200ms 15/15 · core gates PASS**. (A first run failed G3 kit-conform once — MISSING place:vuon / place:etq / contest / cold-palace + "tutorial: 0 intro pages" float; rerun of kit-conform alone: branch 103/2 MISSING, origin/main 106/2 MISSING, floats none on both → flaky load timing, not this branch; full quickcheck rerun PASS.)
- Reviewer's non-blocking note kept for when jnf co-op goes live: a guest reload in the middle of her own game loses the held "ch" (memory only) → her pick counts as Thôi after coopMs + waitMs.

## READY FF — sha 6b5414a8
- E8r3 PASS 814078e5; merged origin/main 9c581406 (assemble: main list + jsmg.js last; index.html/sw.js rebuilt). origin/main is an ancestor. mg-skip-audit PASS; unit 37 PASS / 0 err; quickcheck PASS (153 s, old save ok, core gates PASS).
