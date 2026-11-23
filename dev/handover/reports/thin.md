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
