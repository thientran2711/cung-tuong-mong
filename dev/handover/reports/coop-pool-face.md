# coop-pool-face — guest's Thái hậu picture blank / host re-rolls the face (co-op root cause)

Worker «COOP THAIHAU FACE» for Foreman D #15 (session_01964izCZTNiRZKnSHxPrUuX). Branch `review/coop-pool-face` (from LIVE 94cbe0cd, LIVE d2b97854 merged in). **SẴN SÀNG KIỂM 5c63b1e7**.

PRIORITY #1 CHECK: OD none for pool-face race (rules: art-wiring-1119 "one face for life, never reused", jfigx header) | main: dev/build/jfigx.js:39 figThPick, dev/build/j66.js pidRoll/pidEnforce, dev/build/jcoopworld.js toCanon/fromCanon | review/* none (grep "pidRoomFix|roomTaken|pool-face": no hits) | claims: this worker only.

## Root cause (proved, not a timing race)
1. The guest's own player face `S.pid` is rolled by j66 `pidRoll(d)` from the 32 consort faces (c01–c32), seeded by her own roll. It **never looked at the room's world**.
2. The host had already drawn the Thái hậu from the same pool (jfigx `figThPick`, consort faces preferred). About 1 in 32 times the guest's roll is exactly the Thái hậu's face.
3. On the guest, j66's "nobody else wears HER face" rule (`pidEnforce` / the figPick wrapper) then **clears the Thái hậu's fid** → guest shows no Thái hậu picture (guest fid null at "start").
4. Her week end (`toCanon`, room level 0 = the old path is what LIVE runs) carries that blank face. In the Worker's 3-way merge (`coop/worker/src/merge.js`) only she "changed" `thO.fid` (base = A = c23, B = none), so the merged week **drops the host's face**.
5. The host's `figThPick` sees `thO.fid` empty and draws a new face (c23 → c04). The guest still clears/doesn't have it → "after week 1" also fails; weeks 2/3 pass once the host's new face is not her pid. Exactly the pattern in review-ban-cung.md.

The same chain hits **every pool-faced world person** whose face equals the guest's pid (a consort, a servant, a court official, …): the guest clears/re-picks it, the merge takes her change, and the face changes on the host. That is the whole family this fix closes.

Evidence: probe `dev/test/coop-pool-face.js` with a fid trap (logs every set/swap of `S.thO.fid`, every `figThPick` draw with stack, every `init`/`end` sent and `week`/`room` received with the Thái hậu fid). Failing LIVE run e-23: host `init` fid c30 → guest `end` fid **null** → `week 1 in` fid null → host `pick [null → c01]` from `porOf → figFor → figPick`. Room level (`COOPW.thin.lvl`) = 0 in every run.

## Fix (one rule, one place each)
- **j66** `pidRoll`: in a co-op room it skips the faces the room already uses (`COOPW.taken()`), so the roll card shows the face she will really have.
- **j66** `pidRoomFix(T)` (new): if her identity is taken, **she** moves to the next free identity (never the world person); the stored roll (`ctm-nextlife`) follows. Solo: never runs.
- **j66** `figUsed`: the friend's identity counts as used, so no NPC the host draws later takes her face.
- **jcoopworld** `roomTaken(C)`: every `fid` held in the room's world W + the friend's pid (`fidUsed`/`fidDead` are lists, not holders). `pidRoomFix` runs at the end of every `fromCanon` (first life, rebirth, rejoin, week merge), the one door every life enters the room by.
- **jcoopworld** backstop `keepFaces`: the guest's week end carries the room's face for every world person the room already has a face for (NPCs by id, other world keys by path). The host draws every pool face once; the guest can never overwrite it, whatever her phone does for display.
- The host-side `figThPick` re-roll on an empty fid is left as is: with the above, its fid can't become empty.

Old saves: solo saves are not touched (no `COOPW.on`). In an **old co-op room where the clash already happened**, the guest's own face moves once to a free face when she reloads. The world person keeps the host's face, so it stops changing every week. The other choice would change a world face on both seats.

## Probe `dev/test/coop-pool-face.js`
Room → join → Thái hậu same picture both seats (start) → 1 merged week (PF_WEEKS=n) → same again → host never re-rolled → no world person wears a player's face, players differ → no page errors. `PF_FORCE=1` pins the guest's roll onto the host's Thái hậu face (the 1-in-32 case, made certain). `PF_SLOWX=ms` delays the host's FIGURES-x.json (ruled out as a trigger). ~40 s per run.

| build | runs | Thái hậu FAIL |
|---|---|---|
| LIVE 94cbe0cd, natural | ~95 valid (b 40, c 14, e 40, +1) | **3** (b-18 c11→c01, c-3 c17→c03, e-23 c30→c01) ≈ 1/32 |
| LIVE 94cbe0cd, PF_FORCE=1 | 2 | **2/2 FAIL** (c06→c07, c20→c26) |
| fix 6422c1ad, natural | 24 | 0 (24/24 PASS 13/13) |
| fix 6422c1ad, PF_FORCE=1 | 8 | 0 (8/8 PASS; guest moved c12→c13, c18→c19) |

(Infra-only failures not counted: c-10/13/14 hit when parallel runs were killed for memory; e-39/40 failed only on a temporary "no two world people share a face" assert, since removed: `man:thive-1/2` guards share faces by design in jmen. Also seen once: `mama:k01` held twice on the host. Not in scope; noted for the foreman.)

## Gates on the merged build 5c63b1e7 (fix + LIVE d2b97854, site rebuilt)
- coop-e2e ×3: 94/94, 94/94, 94/94 · coop-night 105/105 · coop-pool-face 3/3 forced + 6/6 natural PASS
- quickcheck: PASS (core gates PASS, old save ok, perf new/live render 269/297 ms, buổi 1290/1519 ms)

## Gates before the LIVE merge (on 2d69d3da = fix + rebuilt site)
- coop-e2e ×3: 94/94, 94/94, 94/94
- coop-night: 105/105
- quickcheck: PASS (core gates PASS, old save ok, perf new/live render 254/285 ms, buổi 1041/1547 ms)
- coop-pool-face: 24/24 natural + 8/8 forced PASS

## Not covered / for the foreman
- The face picker (j86/j88 `fpSet`) can swap her face with a holder. In co-op that runs on the throwaway world before attach, and `pidRoomFix` then catches any clash. A mid-game pick in co-op was not tested.
- Level ≥3 rooms (thin C) were not exercised (LIVE rooms run level 0). There `CW.cW` already sends the room's W unchanged, and `pidRoomFix` runs in `fromCanon` the same way.
