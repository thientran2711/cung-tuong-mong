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

## API P3
PRIORITY #1 CHECK ('j72|việc nhờ|favour'): OD 23/11 ~22:50Z (ORDER THIN) | main dev/build/j72.js (110 T7 templates, once per life + last 5 lives) | review/thin-p0-r1 a76ba1e4 (jnorep) · review/thin-p2 3f4e1fcd (j7c pattern, not merged: P3 has its own engine j72c.js) | claims ENGINE #2 — reuse: the whole j72 quest runtime (offer / steps / tab / nợ ân / ticks); a composed seed becomes one more T72 template at load.
ENGINE #2 (opus, session_01N1tNP5YG1W5gC9UKfSfGwY) on **review/thin-p3** (from thin-p0-r1). Engine = `dev/build/j72c.js` + data `dev/build/j72sd.js` (built by `python3 dev/build/j72sd_build.py <file>`); validator `python3 dev/test/j72seeds_validate.py <file> [--min 60]` (checks ≥60 per kind craft/social/court/fam with --min).
**WRITER FILES: `dev/handover/content/thin/j72seeds_a.md` (craft + social, writer A) and `…/j72seeds_b.md` (court + fam, writer B)** — the builder/validator read every `content/thin/j72seeds*.md`; ids unique across files (`j72c-<kind>-NNN`). Validate your own file: `python3 dev/test/j72seeds_validate.py <your file> --min 60 --kinds craft,social` (B: `--kinds court,fam`) — one JSON object per line (lines not starting with `{` are ignored). Target ≥60 seeds for EACH of craft, social, court, fam (≥240). Keep the 110 old templates untouched (no seed may copy one of their titles/asks).
```
{"id":"j72c-craft-001","type":"j72","kind":"craft|social|court|fam","tag":"K|D","src":"…","tone":"tense|sad|petty|funny|tender|warm","tier":"s|m|l",
 "req":{"kind":"<who>","nết":[any-of],"lòng":[any-of],"need":"<need>"},          // the requester A (real roster person)
 "other":{…same fields…},                                                           // optional second real person B (never the same as A)
 "title":"…","ask":"“…”",                                                           // title ≤ 8 words; ask = A's own words, in “ ”
 "object":{"name":"…","owner":"A|B|me|kho","clue":"…","trace_ok":"…","trace_no":"…","it":"<IT key, optional>"} | null,
 "steps":[ 1–3 steps ],
 "ok":{"text":"…","gain":{…}}, "no":{"text":"…","loss":{…}},
 "twist":{"text":"…","gain":{…},"loss":{…}} | null,
 "needs":{"rank_min":n,"rank_max":n,"month":[…],"not_confined":true,"kids_min":n}}   // all optional
```
- **who** (req.kind / other.kind): `rv` living consort · `hh` Hoàng hậu · `fallen` consort in lãnh cung · `sv` her own servant · `rsv` another consort's servant · `man:<rw>` (rw = sứ thần|họa sư|nhạc sư|thái y) · `ak` adult child · `off` a court house head · `fam` her own family (letter) · fixed people `emp th doc eun maid`. nết/lòng (any-of, lists AND-ed, names from BAL.net.F/M) only for `rv fallen sv rsv man`; fixed people take none. Kind `fam` seeds: req.kind `fam` (or `maid` carrying the letter is automatic).
- **need** (real state that MOTIVATES the ask; optional): `ill` (A is really ill) · `preg` (A pregnant) · `friend` (A likes her, thiện cảm ≥ BAL) · `feud` (A and B really at odds) · `thIll` (Thái hậu ill) · `empIll` · `bienLo` (border weak) · `khoLo` (granary low) · `kids` (A has a living child) · `poor` (A short of bạc) · `fest` (a festival this month). The engine checks it on the live world (grounding gate); a seed whose need is false is never offered.
- **steps** (1–3), each one of:
  - `{"t":"go","n":"…","at":"A|B|home|vuon|thu|dtd|tn|kn|tyv|ksp|lc","sk":"<skill>","odds":"de|vua|kho","fail":"retry|end|bad"}` — a do-step at a real place (A/B = where that person is). skill = `tai tamco sac danh duc mat sung an thi cam ky hoa vu y rel relb` or `""`. Odds/khắc from BAL (never typed).
  - `{"t":"wait","n":"…"}` — wait tuần (length from BAL by tier).
  - `{"t":"pick","n":"…","opts":[ 2–3 × {"n":"…","at":…,"sk":…,"odds":…|null,"gain":{…},"loss":{…}} ]}` — a choice: **every option Σgain steps == Σloss steps ≥1, and the same total for all options (laws 2/3)**; loss is paid when she does it, gain lands on success.
- **gain/loss keys** (STEP counts; each step = `BAL.j72c.fx[tier][key]`, never a typed number): `sung danh bac suc mat th hh duc an` (her stats) · `rel` (A's thiện cảm) · `relb` (B's thiện cảm). ok.gain ≥1 step (law 3: the favour is worth doing); no.loss ≥1 step; twist may be gain-only or loss-only (it is a fact, not a choice).
- **object** (law 6c, real objects): owner `A|B|me|kho` (kho = Nội vụ phủ store); `trace_ok`/`trace_no` = where it ends after success/failure (always a real place/person, never «mất»). `it` (optional) = a real IT key she RECEIVES on success (the engine puts that real item in her chest; trace_ok must say it is with her). Key list: `dev/handover/content/thin/j72_itkeys.md` (366 real keys). `null` only for a pure errand (message, word, watch).
- **text placeholders**: `{A}` `{B}` requester / second person's name · `{M}` her cung nữ · `{O}` object name · `{S}` season · `{goi}` `{Goi}` how A addresses her · `{xung}` `{Xung}` how A calls herself. No digits, no %, no odds words (VANPHONG law 7; the engine prints the ladder). Basis in `src` (K documented / D drama; law 8).
- Draw: P0 family **`j72:<kind>`** (seed = id), once per life, avoided if seen in the last 5 lives (fresh-first), like the 110.
- **ENGINE READY** on review/thin-p3 b2773618: `dev/build/j72c.js` (seed → one T72 template, the whole j72 runtime plays it), `BAL.j72c` (jbal2.js), validator `python3 dev/test/j72seeds_validate.py dev/handover/content/thin/j72seeds.md --min 60`, worked examples (one per kind, valid) `dev/test/j72c-fixture.jsonl`, in-game test `node dev/test/j72c-play.js <file>` (plays every seed to the end). Writer: copy the fixture shape; run the validator on your file until 0 errors.

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

- 00:4xZ 24/11 ENGINE #2 (opus, session_01N1tNP5YG1W5gC9UKfSfGwY) took over P3. START_CTX ~4 % (used_tokens 0 → estimate; roll at ~29 %, ceiling 60 %). Branch review/thin-p3 from thin-p0-r1 a76ba1e4 (thin-p2 NOT merged: P3 has its own engine + BAL.j72c; no j7c code reused).
- P3 ENGINE pushed review/thin-p3 b2773618: j72c.js + j72sd.js (empty until the writer file lands) + j72sd_build.py + validator + j72c-play.js (fixture 4 seeds ALL PASS: real requester by nết, B cast, placeholders filled, P0 mark j72:<kind>, go/wait/pick played to the end, numbers = steps × BAL, object trace, rests in life). j72.js touched in 4 places only (history key T.hk, option cost in thiện cảm cr/crb). Waiting for j72seeds.md (≥240).

- P3 ENGINE gates so far (review/thin-p3 a2242d97, engine only, seeds not folded): undef-scan PASS (297 names) · coop-e2e 141/141 (both seats; S.q72/S.q72c personal, ctm-nr per phone) · `node dev/test/j72c-play.js` ALL PASS on the 4-seed fixture · validator/builder read every content/thin/j72seeds*.md (two writers A craft+social, B court+fam).
- No-repeat measure (`node dev/test/j72c-measure.js 120`, same draw as q72Cands, 120 offers per kiếp; at 80 offers: all 92 % → 32 %):
| Pool | before: 110 old | after: 110 + composed |
|---|---|---|
| all | 100 % | 62 % |
| craft | 100 % | 61 % |
| social | 100 % | 62 % |
| court | 100 % | 62 % |
| fam | 100 % | 61 % |
  Reading: 240 seeds cut cross-life repeats from ~all to about a third at 80 offers/kiếp, ~60 % at 120; full freshness over 6 lives needs a pool ≈ 6 × offers. A repeat seed in a new life always has a different requester (new roster) except fixed people (th/emp/doc/fam).
- **HANDOVER (ENGINE #2 rolled at ~24 % context, START_CTX read 0 → est. 4 %; owner rule start+25 %)** — successor: (1) wait for `content/thin/j72seeds_a.md` + `_b.md` (≥120 each); (2) in a worktree of review/thin-p3: `python3 dev/test/j72seeds_validate.py --min 60` (no file = all) → 0 errors (send hits back to the writers); `python3 dev/build/j72sd_build.py` → j72sd.js; `sh dev/site/build_site.sh`; `node dev/test/j72c-play.js <(cat dev/handover/content/thin/j72seeds_*.md)` style run on all seeds (copy them to a scratch .jsonl; every seed must play to the end; seeds whose need/requester cannot be cast in a fresh life are SKIPPED by the test only if `made` is false — fix the test to force needs, see thIll/empIll lines); `node dev/test/j72c-measure.js 80/120` with the real counts; (3) gates: quickcheck (`bash dev/tools/quickcheck.sh`, the sha must hold its own build: commit index.html/sw.js), undef-scan, old saves (`node dev/test/norep-oldsave.js <live index.html>` + 3 saves load with S.q72 present), coop-e2e (j72.js is shared code); Fold 755x1000 + iPad 1180x820 shots of 3 composed offers (`q72Test('c:<id>',1)` opens one) LOOKED 3×; (4) report SẴN SÀNG KIỂM review/thin-p3 <sha> to Foreman B; then P4 j68 openings (design idea: one EV6 per family 'c_<fam>' whose pp() nrPicks an opener×complication combo, ≥12 openers × ≥10 complications per big family, 4 equal-value stances per complication in BAL steps like j7c; publish «## API P4» first so Foreman B opens writers).

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

## P1b
PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused jnorep (P0) + jmgpool.js API (mgpOne/mgpRng/mgpSkin) + the kit slot review/kit-mgskin 1b91ac14; nothing rebuilt. Worker sonnet P1b = session_01N1tNP6BvAwirSLY2Xhryvj, START_CTX ~5 % (est.). Branch **review/thin-p1b** (from thin-p1 b43fe174; merged review/thin-p0 00b3a4ec + review/kit-mgskin 1b91ac14). My files: `dev/build/jmgpool_b.js` (after jmgpool.js in assemble.py), `dev/test/mg-pool-b.js` + `mg-pool-b-play.js`, BAL block `BAL.mgpb` (jbal2.js, own line after BAL.mgp). Touched outside my files: jmgpool.js only `mgpSkin` (skin lane = mine); engines below.
**VERDICT PER KIND (my 14):**
| kind | verdict |
|---|---|
| dan | POOL 64 tunes = 5 phrases (8 contours × string shift) + the gaps; no 3 equal strings in a row (j82 kg82Rhythm) |
| co | POOL 270 = group size 1/2/3 × 90 seeds, same generator kg82GoGen run on the item's seed (j82 kg82Go) |
| dauho | POOL 60 throw sheets = 6 vase places × 6 winds (j91 k91Fling) |
| theu | POOL 64 stitch sheets = 5 rounds of a shuffled 16-cell board (j82 kg82Pattern) |
| mua | POOL 64 dance sheets = 5 rounds × 9 steps, no 3 equal in a row (j82 kg82Steps) |
| doi | POOL 240 = rows 3/4/5 × 80 seeds, engine generator on the seed (jnwp nwDoi) |
| doden | POOL 132 = round type 0/1/2 × 44 seeds (jlant k92Lamp) |
| tc | POOL 100 seeds (jnwq nwqSort build, via nwqBuild) |
| xa | POOL 200 seeds (jnwq nwqClue: culprit + decoys + row) |
| thq | POOL 130 seeds (jnwq nwqSeat build, via nwqBuild) |
| ban | **no pool: one painted target with a fixed sway, pure timing; nothing to tell apart** |
| chai | **no pool: one mark gauge (pure timing, her own Tài/khéo tay set the zone)** |
| hoadien | **no pool: the board is her own portrait; the seed only tilts the dock, no content list** |
| co7 | **no pool: Cờ năm quân against the AI is a skill board; the AI noise is not content** |
Seed items: `mgpWith(item, fn)` runs the engine's own generator with Math.random = the item's seeded stream and puts the real one back in `finally` (rules, sizes, difficulty by rank untouched; same item = same board). Draw = `mgpOne(kind,used,filter)` (fresh-first through jnorep, family `mg:<kind>`), `used` reset per game. Pool sizes are BAL.mgpb (jbal2.js), min ≥ BAL.mgp.min per group size / rows / round type.
**SKINS (kit MG-SKIN wired):** merged review/kit-mgskin 1b91ac14. `mgpSkin(kind)` now = fresh-first draw over «default» + every skin registered with kitMgSkinAdd(kind,…) + ids listed in MGP_SKIN (family `mgskin:<kind>` via P0); `kg82Open` takes it when the caller passes no `skin` and `KG82.preSkin` is empty (j82). None registered (today: no MGSKIN keys from the art lane yet) = today's art + son buttons (tested). Test edit: dev/test/kit-mgskin.js clears `KG82_SKINS.dan` before its «no skin asked» step (an open without skin now draws a registered one). FOR MAIN: when Foreman F's skins land, register them with `kitMgSkinAdd(kind,id,{name,pal})` (names VANPHONG); nothing else to wire.
**NO-REPEAT MEASURE** (`GAMES=6 node dev/test/mg-pool-b.js --measure`; 6 lives × 6 games of the kind; repeat % = shown before in this life or the 5 lives before; «before» = the number of boards a player can tell apart today, my estimate in the table, since today every board is a fresh roll):
| kind | looks today (est.) | pool | before % | after % |
|---|---|---|---|---|
| dan | 32 | 64 | 36 | 0 |
| co | 10 | 270 | 94 | 0 |
| dauho | 12 | 60 | 67 | 0 |
| theu | 16 | 64 | 61 | 0 |
| mua | 16 | 64 | 61 | 0 |
| doi | 6 | 240 | 94 | 0 |
| doden | 8 | 132 | 93 | 0 |
| tc | 10 | 100 | 86 | 0 |
| xa | 14 | 200 | 92 | 0 |
| thq | 10 | 130 | 91 | 0 |
**GATES so far:** `node dev/test/mg-pool-b.js` ALL PASS (sizes, ids unique, dan/dauho/theu/mua rules, every co item gives a position at ease 0/1/2 + deterministic + ≥95 % distinct, mgpWith restores Math.random after a throw, 4 draws per game differ); `node dev/test/mg-pool-b-play.js dev/index.html` all 10 engines open 10×, draws marked in ctm-nr, 2 skin checks, no page errors; mg-pool 9 kinds ALL PASS, norep-unit ALL PASS, mg-allkinds 0 FAIL, kit-mgskin 0 FAIL, undef-scan PASS (295). quickcheck + coop + 3 old saves: run once at the merge with P1c.
**SHOTS:** Fold 755x1000 + iPad 1180x820, 3 items × 10 kinds, contact sheets LOOKED: dan flowers fall on other strings, co other positions, theu other stitch cells, doi other strokes, doden other lamps, tc other storerooms, xa other cases, thq other pin counts. NOT visible in a still: mua (the order of lit steps) and dauho (vase place / wind per throw: the three first-throw vases sit near the same spot) — checked by unit test only. Scratch shots, not on CDN, not in git.
**HANDOVER (P1b stopped at budget; merge lane moves to P1c by Foreman B's word 24/11 00:30Z):** review/thin-p1b 538c4568 is pushed. P1c merges `origin/review/thin-p1b` into review/thin-p1c (it brings kit-mgskin 1b91ac14, thin-p0 00b3a4ec, jmgpool_b.js + its assemble.py line, BAL.mgpb in jbal2.js, mgpSkin in jmgpool.js, j82/j91/jnwp/jnwq/jlant edits, tests mg-pool-b.js + mg-pool-b-play.js). Expected conflicts: the one long list in assemble.py (keep both jmgpool_b.js and jmgpool_c.js after jmgpool.js) and the BAL lines after BAL.mgp in jbal2.js (keep BAL.mgpb and BAL.mgpc). Then rebuild (bash dev/site/build_site.sh), run once: quickcheck (bash, takes >2 min: run in background), undef-scan, mg-pool, mg-pool-b, mg-pool-c, *-play, norep-unit, mg-allkinds, kit-mgskin, 3 old saves, coop-e2e only if a shared file is touched; then ONE SẴN SÀNG KIỂM. NOT done: Foreman B's optional «palette-only skins per kind» (register kitMgSkinAdd(kind,id,{name,pal}) with the 5 kit palettes when no art keys exist) — names must be VANPHONG words, so ask for review first.

## REVIEW thin-p0 r1
- 24/11 ~00:50Z · BIG reviewer (opus) session_01N1tNP4cfeKd94zTHNC7jSu · START_CTX ~3 % (used_tokens reads 0 → own estimate), depth 3. PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse confirmed (ctm-e68h generalised, not rebuilt).
- Reviewed review/thin-p0 @00b3a4ec. Fixes on **review/thin-p0-r1 @a76ba1e4** (contains newest origin/main 16f5c1dc).
- Checks (row by row vs brief b-thin.md ENGINE P0):
  | Item | Result |
  |---|---|
  | One shared module, key `family:seed`, 6 lives, ×0.5 | OK (jnorep.js; BAL.nr.lives/w) |
  | Old ctm-e68h history kept | OK: copied once into ctm-nr, ctm-e68h left untouched (rollback safe). Every LIVE writer of ctm-e68h checked: j68 tpl:variant (90 EV6 ids, none collides with the raw-key pattern `j\d+|p|t`), j68 scheduler `p:`/`t:`, j70/j71/j72 raw keys → all land where their readers look |
  | j68 identical | OK: e68Past = lives 1–5, same pre-match; lid adopted from S.e68.lid; norep-oldsave 360 keys identical |
  | Co-op personal per seat | W_KEYS / HOST_ONLY hold neither S.nrl nor S.e68 (never synced, guest phone never written by host state). **FIXED**: co-op thin guest — the HOST runs the friend's turn in COOPW.thin.withSeat (CW.ctx = her seat, S = her S.nrl): old code would rotate the host phone's store to her life id and record her draws there (wipes the host's 6-life history in a few swaps). Now `nrAway()` (COOPW.on && ctx && ctx≠seat) → no mark, no rotation, seen = 0 (host history does not weigh her picks). Thin is dev-flag only today, so no live player was hit |
  | Law 4 ONE CORE | **FIXED**: nrCfg had typed fallbacks 6/.5/1500 (second source) → reads BAL.nr only; j68.js:80 typed `Math.pow(.5, …)` → `nrW("j68",…)` (same value, from BAL.nr.w). j72's own ×.12 is a separate pre-existing design weight, untouched |
  | localStorage bounded | OK: cap BAL.nr.cap 1500 keys/life × 6 lives ≈ 218 KB worst case (measured JSON), old ctm-e68h ≈ 60 KB; writes only on a new key; try/catch on quota |
  | No player-visible change | OK (no text, no UI; shots not needed) |
  | Pre-existing (not this branch, noted): slot switching between two lives rotates the store (same as old ctm-e68h); `ctm-nr` is also the name of jcoopworld's night-ready relay message kind (a message `k`, not a localStorage key — no clash, grep noise only) |
- Gates on a76ba1e4: see the line below (r2 run). On e4670806 (first r1 sha, same code): QUICKCHECK PASS (open 1738 ms, old save ok, perf new/live render 203/231, tab 398/392, buổi 1023/1481) + CORE GATES PASS · undef-scan PASS (296) · norep-unit ALL PASS (24 = 19 + 5 new: withSeat no write/rotate, no host weight, back-to-host, cap/lives from BAL) · norep-oldsave ALL PASS (3 LIVE saves, 360 keys identical, 0 page errors) · coop-e2e 141/141 · norep-measure table reproduced (same as «## ENGINE») · coop-thin-a 17/19 — the 2 FAILs (nmReg round trip) are identical on origin/main 16f5c1dc → pre-existing, not this branch.
- Gates r2 on **a76ba1e4** (after merging main 16f5c1dc): QUICKCHECK PASS (open 1703 ms · old save ok · perf new/live render 205/241, tab 393/404, buổi 1174/2916, tasks>200ms 21/21) · CORE GATES PASS · undef-scan PASS (297) · norep-unit ALL PASS · norep-oldsave ALL PASS · coop-e2e 141/141 (CO-OP GATE PASS, both seats).
- **VERDICT: PASS a76ba1e4** (review/thin-p0-r1 = review/thin-p0 + 2 fixes + newest main). P1/P2 lanes: rebase/merge on review/thin-p0-r1 (API unchanged; only nrAway added internally).
- 24/11 ~00:55Z P2 FOLDED on review/thin-p2 **3f4e1fcd** (merged LIVE main 1783556 at d49be698): `j7sd.js` = 81 seeds from j7seeds.md ff167acf (`python3 dev/build/j7sd_build.py …`, validator 0 errors; `--min N` arg bug fixed). Engine adds `BAL.j7c.loose` (no one fits a role's nết AND lòng → cast someone with any one of the listed nết); one-core guard fix (fixed-person kinds as a Set). Reach (`node dev/test/j7c-reach.js`, 8 fresh lives × rank 1–4): 37–75 of 81 seeds ready per state, 75/81 met; the other 6 are month-gated (winter / month 8), all 81 build clean (4 stances, every placeholder filled, 0 errors). Spot-check (j7-034, mirror j7-069): equal steps, real objects with trace, cổ trang — OK.
- P2 GATES DONE: `j7c-play` ALL PASS · undef PASS · quickcheck open/old save/perf PASS (buổi median 2204 vs live 1382 ms on that run — noisy, see .quickcheck; re-measure) · CORE GATES PASS (rerun after the guard fix, 352 s).
- P2 GATES NOT DONE (successor): (1) coop-e2e both seats (j3.js + j7.js touched) — `python3 dev/build/assemble.py && node dev/test/coop-e2e.js <out>` (P0 got 141/141); (2) norep-oldsave on thin-p2 (`node dev/test/norep-oldsave.js <live index.html>`); (3) Fold + iPad shots of 3 cards (j7-001, j7-034, j7-070): `dev/test/j7c-shots.js` builds the cards fine (log «ok», 0 errors) but its new-life setup ends inside the selection scenes / reward scene, so the card is hidden. Fix idea: load a quickcheck old save (SK(3) + loadSlot/deser, as dev/tools/quickcheck.js step 2) instead of start(), then `pushDil(mkP("j7c",{sid,c:j7cCast(sd)}),"Chuyện trong cung")`; look 3× at every shot; upload to CDN img/_review/thin-p2/. (4) re-run quickcheck once after merging newest main, then SẴN SÀNG KIỂM review/thin-p2.
- Tuning notes for the reviewer: BAL.j7c.fx proof step (8/15/25) is worth more than one stat step — equal step COUNT, but a proof is a different currency; j7c joins makeDil as ONE world-weight entry (share 1) — raise BAL.j7c.share if MAIN wants composed intrigue more often; the seeds' `maMa` line is not shown (yard narrator; not fitting j7).
- HANDOVER (rollover, owner rule: START_CTX ~5 % + 25 %): ENGINE worker session_01N1tNP4Dsh2FQd5z5vKP2qy stops here. Worktrees /home/user/wt/p0 (review/thin-p0 00b3a4ec, under BIG review → fixes on review/thin-p0-r1) and /home/user/wt/p2 (review/thin-p2 3f4e1fcd). Next for the successor: the 4 open P2 gates above → SẴN SÀNG KIỂM review/thin-p2; then P3 j72 favours, P4 j68 openings, P5 Kỳ ngộ, P6 world + j70, P7 festivals, P8 origin roads (b-thin.md «AFTER P1+P2 LAND»).

## P1c MERGED (whole remaining 30 + P1 #2's 9) — review/thin-p1c 60c49722
Merged into review/thin-p1c: review/thin-p1b 538c4568 (conflicts: assemble.py list = jmgpool_b.js + jmgpool_c.js, jbal2.js = BAL.mgpb + BAL.mgpc), review/thin-p0-r1 (PASS a76ba1e4; conflict only KIT.md = both sections kept, index.html/sw.js rebuilt). Rebuilt with `bash dev/site/build_site.sh`.
**GATES on 60c49722:** QUICKCHECK PASS (open ok, old save ok, perf render 254/268 · tab 536/492 · buổi 1491/1123 ms new/live, core gates PASS, time-spill PASS) · mg-pool / mg-pool-b / mg-pool-c ALL PASS · plays mg-pool-play, mg-pool-b-play, mg-pool-c-play no FAIL · mg-allkinds 13/13 · kit-mgskin ALL PASS · norep-unit ALL PASS · norep-oldsave (3 old saves vs LIVE) ALL PASS · undef-scan PASS (297) · coop-e2e 141/141 on two runs (one earlier run 138/141, not reproduced: network flake) · shots: P1c's 4 kinds + P1b's 10 kinds were looked at on their own branches (Fold + iPad, 3 items each); not re-shot after merge (no visual change from the merge).
**Whole 39:** 9 pooled (P1 #2) · P1b 10 pooled + 4 no pool · P1c 4 pooled (nghe td_hanh kinh may) + 12 no pool with measured reasons (table above).
