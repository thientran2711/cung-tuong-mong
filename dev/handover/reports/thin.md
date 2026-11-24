# ORDER THIN — shared lane report (EVCAT §3). Each lane owns its own «## <LANE>» section; write a one-line note before touching a file another lane owns.
PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: ctm-e68h in dev/build/j68.js (generalised, not rebuilt).

## API
P0 shared cross-life no-repeat memory = `dev/build/jnorep.js` on **review/thin-p0 @ 84dd0a59** (branch P1/P2 from it). Store: localStorage `ctm-nr` (old `ctm-e68h` copied in once, left untouched); life id `S.nrl` (personal, not a co-op world key); numbers `BAL.nr={lives:6,w:.5,cap:1500}` (jbal2.js).
Key = `family:seed`. Families: `j68`, `j7`, `mg:<kind>`, `mgskin:<kind>` (seed = skin), `j70:`/`j71:`/`j72:` raw keys as before.
- `nrPick(fam, list, idf?, wf?)` → weighted pick (wf(x) × 0.5^lives-seen), no mark · `nrDraw(...)` = pick + mark · `nrMark(fam, seed)` marks for this life
- `nrSeen(fam, seed, pre?)` → how many past lives saw it (pre = also `seed:*`) · `nrW(fam, seed)` weight · `nrNow(fam, seed)` seen this life · `nrFresh(fam, list, idf?)` unseen-in-past items (whole list if none)
Usage (3 lines):
```
const it = nrDraw("mg:hoa", POOL, x => x.id);            // pick an item, avoid the last 6 lives, mark it
const sk = nrDraw("mgskin:hoa", SKINS);                   // skin pick (string list)
const s  = nrPick("j7", SEEDS, x => x.id, x => fit(x)); nrMark("j7", s.id);   // own weight, mark only when shown
```
Raw keys (callers that build the whole key): `nrSeenK(key, pre?)`, `nrMarkK(key)`; `evHistSeen/evHistMark` (j68 helpers) now go through them.
**j7 SEED SCHEMA (for P2-SEEDS; the engine reads exactly this; validator = `python3 dev/test/j7seeds_validate.py <file> --min 60` on review/thin-p2 (pushed cd448e99; fixture example: dev/test/j7c-fixture.jsonl tx-001/tx-002)):**
one JSON object per line: `{"id":"j7-001","type":"j7","tag":"K|D","src":"…","tone":"tense|cruel|sad|petty|funny|tender","tier":"s|m|l","roles":{…},"place":"…","incident":{"text":"…","object":{"name":"…","owner":"<role|me>","clue":"…","trace":"…"}|null},"stances":{<4 ids>:{"text":"…","gain":{…},"loss":{…}}},"outcomes":{<same 4 ids>:"…"},"needs":{…}}`
- roles: `{"<role>":{"kind":"rv|sv|man|kid|maid|emp|th|doc|eun","nết":[any-of],"lòng":[any-of]}}` — kind default `rv` (a living consort, not her); nết/lòng names must be in BAL.net.F/M (tt / ld+ch); maid/emp/th/doc/eun are the real fixed people (no nết filter). Text placeholders `{<role>}` = that real person's name; `{maid}` her cung nữ.
- gain/loss keys (STEP counts; each step = BAL.j7c.fx[tier][key], never a typed number): `sung danh bac suc mat th hh duc maid` (her stats), `friend.<role>` (GAIN only: thiện cảm of that real person up), `grudge.<role>` (LOSS only: thiện cảm down), `proof.<role>` (GAIN only, role kind rv: a real chứng cứ against that consort, evStory). Optional per stance: `trace` = where the object ends after THAT choice (else incident.object.trace).
- every stance: Σgain steps == Σloss steps, ≥1 each (laws 2/3); 4 stances; `object.owner` = a role id or `me`; `trace` = where it is afterwards (law 6c). `needs` (all optional): `rank_min`, `rank_max`, `nights_min`, `month` [list], `not_confined`:true, `kids_min`.
P2-SEEDS file path: keep writing `dev/handover/content/thin/j7seeds.md` (one JSON object per line, yard.md Format B fields as in b-thin.md). The ENGINE converts it into the game file on review/thin-p2 and pushes the validator path here when ready.

## ENGINE
- 23:5xZ 23/11 START_CTX ~5 % (used_tokens reads 0 → own estimate; budget to 30 %, ceiling 60 %); depth 3. Worker session_01N1tNP4Dsh2FQd5z5vKP2qy.
- P0 pushed review/thin-p0 84dd0a59: jnorep.js + j68 switched (e68H/e68Mark/e68Past/evHistSeen/evHistMark → jnorep; identical numbers: 6 lives, ×0.5, previous 5 lives counted). Test `node dev/test/norep-unit.js` ALL PASS (19 checks incl. old-vs-new j68 counts on a migrated ctm-e68h store, old-save life adoption, rotation, cap, weight). quickcheck: open OK, old save OK, perf same as live; core gates rerun pending (first run failed only because my sparse worktree lacked dev/art/mkfit).
- P0 GATES (review/thin-p0 00b3a4ec): quickcheck open OK · old save OK · perf new/live render 243/226 ms, tab 464/495, buổi 1351/1514 · CORE GATES PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 7) · undef-scan PASS (295 names) · `node dev/test/norep-unit.js` ALL PASS (19) · `node dev/test/norep-oldsave.js <live index.html>` ALL PASS (3 old saves from LIVE c39e500 + their ctm-e68h history: ctm-nr == ctm-e68h, j68 cross-life counts identical on 360 keys, each save loads + adopts its life id + plays a buổi, 0 errors) · coop-e2e 141/141 (both seats; S.nrl / S.j7c are personal, not in W_KEYS; the store is per phone). Shots: none (P0 has no visible item).
- No-repeat measure (`node dev/test/norep-measure.js`, 6 lives × 1 kiếp, 40 runs; % of draws in lives 2–6 that repeat an item met in an earlier life):

| Pool | before: uniform | after: nrDraw (×0.5) | after: nrDraw(nrFresh(...)) |
|---|---|---|---|
| j7 intrigue today (33 seeds, ~8 met per kiếp) | 54 % | 45 % | 38 % |
| j7 after P2 (60 seeds, ~8 per kiếp) | 34 % | 23 % | 0 % |
| mini-game kind today (4 items, ~6 boards per kiếp) | 100 % | 100 % | 100 % |
| mini-game kind after P1 (40 items, ~6 boards per kiếp) | 36 % | 26 % | 0 % |
| j68 template family (73 templates, ~30 met per kiếp) | 73 % | 71 % | 71 % (unchanged by design: same code path) |
→ Advice to P1: draw with `nrDraw(fam, nrFresh(fam, POOL, idf), idf)` (fresh-first) — 0 % repeats over 6 lives once a pool is ≥40; ×0.5 alone still repeats ~1 in 4.
- P2 ENGINE pushed review/thin-p2 cd448e99 (on thin-p0): `dev/build/j7c.js` composer + `j7sd.js` (empty until the seeds land) + `j7sd_build.py` + validator `dev/test/j7seeds_validate.py` + `dev/test/j7c-play.js` ALL PASS (fixture seeds: real cast by nết, placeholders filled, 4 stances, jnorep mark, rebuild from pp, real changes, rest in life). Old 33 j7 cards now weigh ×nrW("j7",id) in makeDil and are marked on show. Waiting for the P2-SEEDS file (≥60) to fold in, then shots + gates + SẴN SÀNG KIỂM.

## P2-SEEDS
- PRIORITY #1 CHECK ('j7 intrigue seeds'): OD 23/11 ~22:50Z | main j7.js ev() ×33 | review/thin-p2 (j7c.js, validator) | claims P2-SEEDS — reuse: engine schema from «## API», validator `dev/test/j7seeds_validate.py` on review/thin-p2.
- DONE: `dev/handover/content/thin/j7seeds.md` = 81 seeds j7-001..j7-081 in the engine schema (68 witness seeds + 13 mirror seeds `…-me` where ngươi is the target, two-way law 1). Validator on the file: `j7seeds: 81 seeds, 0 errors`. Spread: tone tense 24 · petty 22 · cruel 14 · funny 11 · sad 7 · tender 3; tier s 26 · m 43 · l 12; 3 rumour seeds (object:null), 78 with a real object (owner role/me + clue + trace). Every stance gain steps == loss steps == tier steps (s1/m2/l3); 4 ids vach/ngam/dan/lanh in every seed; roles by nết only (BAL.net F names), go-between = `tool` kind eun or `{maid}`; no incident repeats one of the 33 old ev().
- Extra (ignored by the engine, kept): `slug`, `maMa` (ma ma closing line per seed, not yet shown anywhere — engine/main may show it or drop it).
- Note for ENGINE: the validator's arg parse takes `60` of `--min 60` as a file name (FileNotFoundError); run it as `python3 dev/test/j7seeds_validate.py <file>` (or fix `args` to skip the value after --min). Seeds with a `tool` of kind eun need a living eunuch (A6("eun")); if A6 returns null the seed is simply skipped, and 11 seeds have no tool at all.
- Not done (outside my lane): fold into review/thin-p2 (`python3 dev/build/j7sd_build.py dev/handover/content/thin/j7seeds.md`), shots, gates.
- ~100 % writer lane done (the file) / the engine still has to fold, test and shoot.

## P1
PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused jnorep (P0), nrFresh advice, existing engines; nothing rebuilt.
Worker sonnet (P1). START_CTX ~5 % (est.). Branch **review/thin-p1 @ b43fe174** (from thin-p0 84dd0a59).
**BATCH 1+2 DONE = 9 of 39 kinds** (hat hoa banh huong ve kim tho le td_cong). New `dev/build/jmgpool.js` (after jnorep in assemble.py): `mgpItems(kind)`, `mgpOne(kind,used,filter)` = fresh-first draw (nrFresh + not shown this life → nrDraw, family `mg:<kind>`), `mgpRng`, `mgpSkin`. `BAL.mgp={min:40}` (jbal2.js). Pools (all composed, deterministic ids): hat 120 (8 themes × lines left out × 3 melody contours, never steeper than the old song) · hoa 504 (season × look-alike order × other-flower pair) · banh 78 (dish type × main × extras; only CDN-painted ingredients; a jwkr handmade recipe still wins) · huong 216 (essence triple × target mix) · ve 240 (layout × motif set) · kim 320 (shape set × layout seed; tray keeps every cutter) · tho 108 (glyph × 6 brush manners; +5 glyphs Nhị Thổ Công Thượng Hạ in jnwp NW_GLYPH) · le 546 (3/4/5 altar pieces × table layout; every size ≥40) · td_cong 180 (per slot 60: petals × palette; bands stay by slot). Rules/sizes/difficulty-by-rank untouched. Engines edited: j91 (hat banh huong), jcraft_hoa/ve/kim/theu, jnwp, jnwq.
Not drawn in play (kept in data only): the story-line part of the banh recipe (no word in play). 
**NO-REPEAT MEASURE** (`GAMES=6 node dev/test/mg-pool.js --measure`; 6 lives × 6 games of the kind, draws per game as the engine; repeat % = shown before in this life or the 5 lives before): hat 97→0 · hoa 96→5 · banh 89→8 · huong 70→11 · ve 97→9 · kim 97→8 · tho 88→21 (n=5 tier has 3 glyphs×6) · le 78→3 · td_cong 97→14. At 12 games/life: 7/9/22/20/19/14/50/3/25 %.
**GATES:** `node dev/test/mg-pool.js` ALL PASS (size ≥40, ids unique, wording no digits/%, art keys exist, huong colours apart, hat slope ≤ old, ve/hoa/kim/le shape); `node dev/test/mg-pool-play.js index.html` 10/10 (each engine opens 10×, no throw, draws marked in ctm-nr); mg-allkinds 13/13; mg-craft passes (kim/ve/hoa lines ok); norep-unit ALL PASS; undef-scan PASS; quickcheck: open OK 2.6 s 0 errors, old save OK, time-spill PASS, core gates FAIL only G4 80-dialog-fixed #54 «new-title plate on the event picture» at iPad = the known LIVE-identical flake (listed in FOR MAIN). Not run: coop-e2e (no shared/co-op file touched: pools are personal, `ctm-nr` never synced), 3 old-save files (quickcheck's LIVE old save only).
**SHOTS:** Fold 755x1000 + iPad 1180x820, 3 items × 9 kinds, looked (contact sheets): songs show different ribbons, hoa seasons/trays differ, banh recipes differ, huong triples differ, ve motif sets differ, tho glyphs (Công/Đại/Xuyên) differ, le tables differ, td_cong hoops differ. KIM: the board is plain red until the sample is peeked, so 3 shots look equal — checked by unit test only. Shots are scratch (not on CDN, not in git); say if you want them uploaded.
**SKINS:** `mgpSkin(kind)` + `MGP_SKIN` registry ready (family `mgskin:<kind>`); kg82 «skin» slot NOT on main → KIT_REQUESTS.md «MINI-GAME SKIN SLOT» filed. No MGSKIN keys from Foreman C yet. FOR MAIN: kit keeper needs the slot; C's keys img/mg/<kind>-<skin>.webp.
**REMAINING (30 kinds):** dan co dauho ban doi doden theu mua chai hoadien co7 tc xa thq doi and the sg_/thu_/tuoi kinds, exam kinds — most are random seeds of a fixed mechanic; need an engine-by-engine pass (each: pool ≥40, draw via mgpOne). Not started.
**HANDOVER (if rolled):** next worker continues from review/thin-p1 b43fe174, re-merges review/thin-p0 on each ENGINE push, adds `mgpGen<Kind>` + `MGP_GEN[kind]` in jmgpool.js, wires the engine's random pick to `mgpOne(kind,used,filter)` (reset `used` per game), extends dev/test/mg-pool.js + mg-pool-play.js KINDS.

## P1c
PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused jnorep (P0) + jmgpool.js API (mgpOne/mgpRng); nothing rebuilt. Worker sonnet P1c = session_01N1tNP43Y5prdNW2dvC5otW, START_CTX ~5 % (est.). Branch **review/thin-p1c** from review/thin-p1 b43fe174. My files: `dev/build/jmgpool_c.js` (after jmgpool.js in assemble.py), `dev/test/mg-pool-c.js` + `mg-pool-c-play.js`, BAL block `BAL.mgpc` (jbal2.js, own line). jmgpool.js untouched (I only add `MGP_GEN.<kind>` from my own file).
**39 KIND LIST (KG82_KIND of the built page, 39 keys) with owner lane:**
| lane | kinds |
|---|---|
| P1 #2 (DONE, b43fe174) 9 | hat hoa banh huong ve kim tho le td_cong |
| P1b 14 | dan co dauho ban doi doden theu mua chai hoadien co7 tc xa thq |
| **P1c (me) 16** | td_dung td_ngon td_hanh duho den tat ne kinh may nghe truyen mac thoico thu_tam thu_choi tuoi |
Check: 9+14+16 = 39, no kind twice. (The sg_* kinds are nghe/truyen/mac/thoico; thu_* = thu_tam/thu_choi; exam kinds le/tc/xa/thq are in lanes above.)
**P1c RESULT (review/thin-p1c, code pushed; sha in the DONE line below).** New `dev/build/jmgpool_c.js` (assemble.py after jmgpool.js), `BAL.mgpc` (jbal2.js, own line), tests `dev/test/mg-pool-c.js` + `mg-pool-c-play.js`. jmgpool.js untouched. P0 merged (00b3a4ec).
| kind | verdict | pool | what a player sees differ |
|---|---|---|---|
| nghe | POOL | 120 (every triple of the 10 secret words once × shuffled decoys / line templates / small talk) | «Cần nghe: …» words, the lines |
| td_hanh | POOL | 150 (three alms rounds: people from need-tier parts, same people count / needs / pool as today = same difficulty) | who stands in the line |
| kinh | POOL | 360 sutra rows (3–4 brush moves from a 6-move library × band layout), 4 drawn per game | the strokes to copy |
| may | POOL | 350 seams (7 seam families × 50 variants), 4 drawn per game | the seam lines to sew |
| td_ngon | no pool: already 11 speakers × 4 moods = 44 boards, order random per sitting; a pool of whole sittings only adds repeats |
| truyen | no pool: the courtier web is generated fresh each round (roles × threads), effectively never the same twice; a 60-web pool measured 44 % repeats at 6 games/life (before 0 %) |
| duho / den / td_dung | no pool: lotus run / lotus pads / sway order are continuous random layouts, unique every play; a 60-item pool measured 8 / 11 / 11 % repeats where today is 0 % → pooling would make it worse |
| mac | no pool: her price threshold comes from the REAL maid (loyalty + temper by name, law 6) |
| thoico | no pool: one attention wave (two frequencies + phase), pure timing |
| tat / ne | no pool: one needle on a ruler (phase only), pure timing |
| thu_tam | no pool: strokes on HER pet's own picture |
| thu_choi | no pool: three identical buttons, one lit at random |
| tuoi | no pool: water level on HER plant |
Engines edited (each: draw once per game via `mgpc1/mgpcMany` = mgpOne with a fresh `used`, old random path kept when the pool is empty): jsgame sgNghe · jtd kgTdAlms · jwkg kwkTrace (+kwkFig: parameters → curves).
**NO-REPEAT MEASURE** `GAMES=6 node dev/test/mg-pool-c.js --measure` (6 lives × 6 games, draws per game as the engine; repeat % = shown before this life or the 5 lives before; before = uniform over today's boards: nghe 120 triples, td_hanh 1 fixed set, kinh/may 5 rows):
| kind | boards before | pool after | repeat % before | repeat % after |
|---|---|---|---|---|
| nghe | 120 | 120 | 8 | 0 |
| td_hanh | 1 | 150 | 97 | 0 |
| kinh | 5 | 360 | 97 | 0 |
| may | 5 | 350 | 97 | 0 |
At 12 games/life: nghe 28→0 · td_hanh 99→0 · kinh 98→0 · may 98→0. (Note: P1 #2's measure calls nrLife twice per life, so its «after» numbers are slightly high; mine does not.)
**GATES:** mg-pool-c ALL PASS (size ≥ BAL.mgp.min, ids unique, nghe triples all different + line mix as engine, td_hanh shape = TD_ALMS, no digits/%, kinh/may strokes inside the square and long enough, 4 draws per game all different) · mg-pool-c-play 4/4 (each engine opens 10×, no throw, draws marked in ctm-nr; kinh/may 4 figures per game) · mg-pool-play 9/9 (lane P1 #2 unchanged) · mg-allkinds 13/13 · undef-scan PASS · norep-unit ALL PASS.
**SHOTS** Fold 755x1000 + iPad 1180x820, 3 items per pooled kind (nghe td_hanh kinh may), contact sheets LOOKED: nghe different words/lines, td_hanh different people, kinh/may different strokes. Scratch only (not on CDN, not in git).
**FOR P1b:** my pooled engines touch jsgame.js / jtd.js / jwkg.js only (no overlap with your kinds' engines except none); built index.html/sw.js must be rebuilt after merging (`bash dev/site/build_site.sh`).
