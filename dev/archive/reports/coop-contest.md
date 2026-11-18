# coop-contest — shared contests in co-op (worker report, 11/16/2026)
Branch `review/coop-contest` @ 73eec76f (from origin/main 7b5e5e49). Owner question: "khi chơi hai người là cả hai đều được báo dự thi hay như thế nào?" Facts: reports/coop-contest-check.md.
START_CTX ~5 % of the window; finished at ~25 %, no rollover needed.

## What changed (whole group of shared contests)
| Case (from the check) | Before | After |
|---|---|---|
| Festival contest invitation | each client rolled its own plan (variant, entrants, odds) | host rolls ONE plan (W key `cfp`); guest's `fPlan7` muted; both get the same invitation + "Hảo hữu của ngươi cũng nhận được lời mời này…"; Enter/Skip relayed both ways (log line) |
| Festival contest day | two local boards, friend simulated as NPC, NPC prize paid twice | host scores NPCs once into a board (`cfb`); each player plays her own mini-game vs the same NPC rows (`startContest({hold:true})`: no prize, "Tạm đứng thứ n"); guest sends her score; host ranks everyone with one formula → ONE result list on both; missing player at host's next week end = formula score (NPC rule) |
| Prizes | `ap()` on winner on each client; friend entry written back | `COOPW.pay(p)`: own client pays her, host pays NPCs, nobody pays the friend entry (cFin7-style result, cuAward guard in jcui) |
| Feast contests (Yến tiệc đầu xuân, Thi tài Thất tịch, FX7) | `festival()` muted on guest → guest invited but never competed | same board pipeline (`x:` boards) |
| Gift contest (Dâng lễ, P) | each client its own "best gift" (two winners) | same board (`p:`): one best gift for the room |
| Wager (W) | race winner `Math.random` per client | drawn from the plan seed (same on both; solo stable on reload) |
| Tranh ghế (`S.contest`) | per client, both could be crowned | host only (`contestOpen/contestWeek/fillSeats` muted on guest; `npcContestAct` never acts for the friend; host's rounds run with the friend entry put back in rivals); guest has a mirror (`ctc`), plays rounds 1–2 + between-round card, sends them (`tg`, before her night ready); host uses her real scores; one crown (`ctcRes`); crowned guest = rank 7 (also friend-entry write-back `queen` → rank 7) |
Single-winner rule (PROTOCOL §11.1): host decides by the NPC rule; loser gets the normal lost outcome. Matches OD:L96 (one world) and the existing merge rule 5 (host wins non-numeric) and §4.1 (world events once, on the host).

## Not done (known gaps, needs a follow-up task)
- Emperor's one night: `S.ntk` is personal, the card flip runs on each client after the host's night "go" → both can take the same night. Needs the guest's flip to wait for the host's night result (night-gate change, coop-night-sync area). Rule written in §11.1.
- Unique shop items: no shared stock exists yet; rule written, nothing to wire.
- Same NPC hit by both in one week: still merge rule 2/5 (numbers add, host wins flags); no ordered act queue through the host.
- Festival day with no host plan (host confined at plan time): each client falls back to its own non-contest variant.
- FX7 feast on the guest: the j54 daughters/princess extras of `festival()` still run only on the host.

## Files
- NEW `dev/build/jcoopcontest.js` (added last in `assemble.py`).
- `jcoopworld.js`: W_KEYS + `cfp cfb cfa ctc ctcRes`; hooks `CW.preCanon`, `CW.onBuilt` (after week rebuild), `CW.beforeReady` (guest night ready); helpers `CW.isHost/pidMe/pidF/isF/fEntry/wk/pay/withFriend`; write-back queen → rank 7.
- `j34.js`: `runRound` split, her part = `myRound(i)` (same code).
- `j71.js`: wager draw from `rng7(pp.sd+3)`. `j82.js`: `o.hold` / `o.holdNote`. `jcui.js`: `cuAward` pays only where `COOPW.pay`.
- `dev/coop/PROTOCOL.md` §11 (keys, relay modes, flow, single-winner rule). Site rebuilt (index.html, sw.js, assets.json).
- Coordination: coop-one-world worker (session_01UV1Szj18sSZbfw4DZWoqJh) told which jcoopworld lines I touched; they add `worldOn()` — my gates can switch to it in a one-line follow-up.

## Tests
- `node dev/test/coop-contest.js` (2 clients, live Worker coop-2, Fold 755x1000@2 host + iPad 1180x820@2 guest): **51/51** — same plan/invitation/friend line, answer relay, same NPC rows, one result list (identical order and scores incl. both players), one result dialog each, friend entry never paid on host (no ap/bestow/item), NPC winner paid on host only, Tranh ghế mirror + muted on guest + guest's real round scores used (10,10) + exactly one crown, both agree; no page errors, no overflow.
- `node dev/test/coop-contest-solo.js`: **6/6** — solo unchanged (mini-game pays, no hold, counted once; no boards; wager stable; save without the new keys plays 10 weeks).
- `bash dev/site/build_site.sh`: OK.
