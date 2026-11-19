# coop-thin F6 — the rest of her own acts as intents (deck cards, quest steps, remaining game ends, tripwire → 0) — STEP 0 (report first)

PRIORITY #1 CHECK ('act(i)|runOpt|q72Do|q72Drop|q72Ask|q72Call|exDone|kcPhucPlay|kc2Play|herGame|vlCraftRun|tsMk|toilDress|empAct|reg11'): OD 17/11 thin guest VERBATIM + L1487/L1489/L1493/L1494 (via brief), 0 new | ledger 0 | main d9b32074 (= F4-r1 landed: F2→F3→F4 LIVE code, no F5/F6) | review/*: review/coop-thin-f5 e6ad9a29 (base, in review), review/coop-thin-hostnull 20a1f54f (not merged yet: waits for Foreman B), no review/coop-thin-f6 / f5-r1 | claims: CLAIMS row 'coop-thin F6' (this worker).

Worker session_01N1tNP5ex6HrG5uFmnZYTqA (opus), coordinator FOREMAN B ROOT-5 session_01N1tNP5mhtJhZ3qE6WZHmFk. depth 6 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f6 STACKED on origin/review/coop-thin-f5 e6ad9a29. Worktree /home/user/wt/f6 (sparse). Level **11** (`TH.CAP` 10 → 11; Worker THINMAX 11, local `wrangler dev` until the FOR MAIN deploy).

## 0a. Every remaining guest write (tripwire) — base e6ad9a29, level 10, coop-bot 4 weeks TRIP=1, local Worker
TRIPWIRE STATE (no "__" markers) **10002**: by part D·patch 2143 (designed: the host's answers) · "F1" regex 3037 · G 1950 · D 1458 · "?" 1195 · C/H 68 · F2 100 · E 51. Raw (incl. "__"): 30083 (wdOf S.__wdmig alone 19 584 = a re-entry marker, not state).
By engine entry: gSync 2143 (D·patch) · **act 1984** · chooseM 1458 · nextBuoi 1411 (G) · "?" 1195 · **cardH 704** · endTurn 422 (G) · **directActs 349** · nextBuoi·go 117 (G) · goTo 100 · sendMe 67 · nextBuoi 51 (E) · tryEnd 1. (The meter's "F1" regex holds act / cardH / directActs = the DECK, not runAct: runAct 0 since F1.)

| family | writers (fn → key) | file:line | count (state) | owner |
|---|---|---|---|---|
| 1 deck card run (her Hành sự hand) | act → runOpt → apply / log / spend, the card's go/fail closures; wrappers j19 wrapR, j42, j61, j76, j80, jact, jaudit (aaMG), jsmg (steal cards) | j2.js:93 runOpt, :102 act | act 1984 | **F6** (a) |
| 2 her hand dealt on her phone | E `hand()` → deal() (pool shuffle = Math.random) every buổi; the host deals her REAL hand in her context (seat-local, never sent) → two hands | jcoopthine.js:85; j2.js:61 | (deck is not S: not counted) | **F6** (a): one hand, dealt on the host |
| 3 card render writers | cardH / directActs (talkOpts built at render: mkSync S.mk/S.mood/S.emo, leAttire S.toilette) | j2.js:79 directActs; j6.js:37 cardH | cardH 704 + directActs 349 | **F6** (a): read-only on her phone (below) |
| 4 quest steps | q72Do / q72Drop / q72Ask / q72Call (spend, q72Ap, q72Rel, log, resultShow) | j72.js:186, :194, :203, :206 | (in act/?: tapped from the quest panel) | **F6** (a) |
| 5 other acts of hers | empAct (Hoàng hậu powers) · jstaff act(a,id) (elders) · jsgame overhear / bribeServ runs (SG) · j10 servant card mua / doa | j8.js:489; jstaff.js:142; jsgame.js:248, :252; j10.js:93 | small | **F6** (a) |
| 6 render-time derived caches | wdOf S.wd (+ S.__wdmig marker) · mkSync S.mk/S.mood/S.emo/S.__mkL · leAttire S.toilette · emoSee S.emoSeen · feelMig S.visit · refreshHere S.visit · kitHereMsg S.visit · stClose S.buoi · evdSync S.evd · colCheck S.col · lxFix S.inv | j92:121 · jmoodknow:57 · jaudit:223 · jemo:170 · jfeel:148 · jcoopworld:283 · j59:381 · jstagehere:15 · j78:76 · jcol:23 · jration:73 | "?" 1195 (mkSync 334+334+165, log 147, visit 54+22+16, stClose 32, emoSee 21) | **F6** (a): on her phone at L11 these do not write her person (the host's patch carries the same derived value); a pure read where a caller needs the value |
| 7 mini-game ends not in F5 | exam exDone / exSrvDone (jexam kg82) · Phúc tuyển / tuyển tú / entry round (jkc kcPhucPlay fin, jkc2 kc2Play fin, jentry kcEntryExam = the same seam) · steal game (jsmg herGame fin + the steal deck cards) · veil craft (jveil vlCraftRun fin) · make-up / dress / phối đồ (jmkt tsMkSit, jtoil :316, j92 :472, jts :392-404) · deck cards with a game first (jaudit aaMG wkDeckCard) | jexam:203-230, :259 · jkc:509-512 · jkc2:343 · jentry:54-72 · jsmg:55-80 · jveil:146 · jmkt:159-166 · jtoil:316 · j92:472 · jts:392-404 · jaudit:307-308 | (not reached by the bot: games need a real tap) | **F6** (b) |
| 8 Thử tay calibration | jmgcal recSet → localStorage (owner flag only, Thiết lập) | jmgcal.js:34 | 0 (no game state) | **stays local: owner device tool, no S write** |
| 9 slap / dodge, nghiệm thân | jslap kg82, jroute kg82 | jslap:80, jroute:412 | — | **D** (dialog reactions; listed, not moved) |
| 10 her week end + month | log 1115, emoWeek S.emoSnap, leAttire, ilUid/ilLog S.il, evGate S.e68, nFix S.hPool … | endTurn / nextBuoi→endTurn | G 1950 | **G** |
| 11 her local cards (Q on her phone) | chooseM → log / logChoice / emoSet / apply (cards made on her phone by G/E code, answered there) | jcoopthinf chooseM wrapper / j-many | D 1458 | **D/G** (they vanish when G moves her week end: no local card left) |
| 12 sync layer | sendMe / tryEnd (wdOf, evdSync, colCheck, lxFix, alInit, kmmOwned) | jcoopworld | C/H 68 | **H** (the C/H writers in family 6 go with F6 (a)) |
| 13 buổi step on her phone | nextBuoi (E) mkSync, stClose | | E 51 | **E** residue (mkSync/stClose = family 6) |
| 14 walks that stop at a decision card | goTo → log / place (the card itself, read-only by F2's design) | | F2 100 | F2 (gate rows, designed: the card shows, its choice is an intent) |

## SIZE: more than one worker → proposed split (OD:L1237) — told Foreman B before coding past step 0
- **F6a (this worker, level 11)** = families 1–6: her hand dealt ONCE on the host (E already deals it in her context; the host view carries it as plain cards, her phone shows it and never deals), `act(i)` = ONE intent (host runs act(i) in her context: runOpt, every act wrapper, the card closures), quest steps ×4, empAct / jstaff act / jsgame SG runs / j10 servant card, render-time derived caches read-only on her phone. Cards whose game opens first (jsmg steal cards, jaudit aaMG) stay on the old road at L11 (mine() false) and move with F6b. Target: tripwire state of act / cardH / directActs / "?" → 0.
- **F6b (next worker, level 12, THINMAX 12)** = family 7: the remaining game ends as ONE score intent each (F5 pattern: named end engine, host validates / caps from BAL.mgSc, rolls the quick buttons, deferred cost paid once): exam (her + servant exam), kc / kc2 / jentry rounds, steal game + steal deck cards, veil craft, the make-up / dress / phối đồ games, aaMG deck cards.
- Why: family 1–6 alone touches the deck model (two hands today) + ~10 render writers + 9 engines; family 7 = ~12 game ends, each needs its closure moved into a named engine (solo-identical refactor) + max / zero / over-max rows. Together > one worker session at the 28 % rollover (F5 did 6 ends in one session).
- If B says no split: I go on with F6a first, then F6b in the same branch (rollover handover between them).

## 0b. How each registers (level 11, F6a)
- `reg11` = reg10's helper at level 11 (ctx CX10 + "hand": the card's name + index, so the host finds HER card; back = used / tab / popIdx / popMsg).
- `act` → reg11("act",["v"]): mine = the card is in her host hand (by index + name) and is not a game-first card; enc {i, n}; dec: her host deck[i] with the same n, else the first not-done card with that n, else refused. snap "soft" (j19 wrapR act card on her phone with the answer).
- Hand: host `TH.hostView` adds o.hd = her deck as plain cards (every non-function key; `why` evaluated in her context → a string); her phone sets `deck` from o.hd at L11 (E's `hand()` does not deal there). The host deals as today (E's real step in her context).
- q72Do(u,oi) / q72Drop(u) / q72Ask() / q72Call(k): plain args; their own rsnap → resultShow = snap "soft" + noRes (her card with the answer). q72Ask opens an offer card = her Q → part-D card.
- empAct(i,k): i is an index into HER rivals view → travels as the person id. jstaff act(a,id), SG runs, j10 servant card: by id.
- Render caches (family 6): wrapped once: on her phone at L11 (gOn) the writer runs on a throw-away copy / returns the computed value without storing; the host's patch brings the stored value.

## 0c. Tap-to-screen time before
L10: every family-1/4/5 tap is local on her phone (one render). Measured as the L10 column of dev/test/coop-thin-f6.js in Done.
