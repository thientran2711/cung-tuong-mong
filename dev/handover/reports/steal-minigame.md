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
- `steal-mg-unit` re-run on the final site build: 37 PASS lines, 0 FAIL, 0 page errors. No dev/test/quickcheck.sh exists on main (not run).
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
