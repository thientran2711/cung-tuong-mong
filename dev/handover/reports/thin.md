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
**WRITER FILE: `dev/handover/content/thin/j72seeds.md`** — one JSON object per line (lines not starting with `{` are ignored). Target ≥60 seeds for EACH of craft, social, court, fam (≥240). Keep the 110 old templates untouched (no seed may copy one of their titles/asks).
```
{"id":"j72c-craft-001","type":"j72","kind":"craft|social|court|fam","tag":"K|D","src":"…","tone":"tense|sad|petty|funny|tender|warm","tier":"s|m|l",
 "req":{"kind":"<who>","nết":[any-of],"lòng":[any-of],"need":"<need>"},          // the requester A (real roster person)
 "other":{…same fields…},                                                           // optional second real person B (never the same as A)
 "title":"…","ask":"“…”",                                                           // title ≤ 8 words; ask = A's own words, in “ ”
 "dh":"<good>/<bad>",                                                              // REQUIRED (titles2, E62 2bbba7ee): danh hiệu pair, each ≤ 4 words, cổ trang, from the seed's own content, unique; good = done, bad = dropped/late/exposed. Missing → j72seeds_validate.py FAILS; clash check: node dev/test/titles2-scan.js <page>
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

## API P4
PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j68|openings'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: the whole j68 runtime on origin/main (EV6 / e68Cands / e68Make / variant memory e.vu / 54-tuần cooldown / scheduler evGate / c6 options / A6 actors) + P0 jnorep (review/thin-p0-r1 a76ba1e4); a composed seed becomes ONE more EV6 template at load (like j72c → T7). thin-p2 / thin-p3 NOT merged (own engine `j68c.js`, own `BAL.j68c`).
ENGINE #3 (opus, session_01N1tNP4i3MEbbZxyD92bKmn) on **review/thin-p4** (from thin-p0-r1). Engine `dev/build/j68c.js` + data `dev/build/j68sd.js` (built by `python3 dev/build/j68sd_build.py`); validator `python3 dev/test/j68seeds_validate.py [files…] [--min] [--fams day,visit]`; worked examples (valid) `dev/test/j68c-fixture.jsonl`; in-game test `node dev/test/j68c-play.js [file]` (casts + plays every seed). Pushed with the engine (see «## ENGINE P4» below for the sha).
**WRITER FILES (one per writer; builder/validator read every `dev/handover/content/thin/j68seeds*.md`; ids unique across files):**
- `j68seeds_a.md` writer A = **day + visit** (≥60 comp each, ≥12 open each)
- `j68seeds_b.md` writer B = **serv + emp** (≥60 comp each, ≥12 open each)
- `j68seeds_c.md` writer C = **sea + court + kid** (≥40 comp each, ≥12 open each)
- `j68seeds_d.md` writer D = **rumor + myst** (≥40 comp each, ≥12 open each)
Validate your own file: `python3 dev/test/j68seeds_validate.py dev/handover/content/thin/j68seeds_a.md --min --fams day,visit` (--min = 60 comp for day/visit/serv/emp, 40 for the rest, 12 open per family). One JSON object per line; lines not starting with `{` are ignored (write headings/notes freely).
**Two row types.** A *seed* = one `comp` (a NEW decision: complication + 4 equal-value stances). At play the engine joins **one fitting `open` (opener line) + the comp text** → wordings = openers × comps; the variant memory (e.vu + P0 `j68:c:<id>:<opener#>`) keeps both fresh.
```
{"id":"j68c-day-o01","type":"open","fam":"day","a":"rv","text":"Trời {S} vừa hửng, {A} ghé qua cửa cung ngươi.","needs":{"month":[1,2,3]}}
{"id":"j68c-day-001","type":"comp","fam":"day","tag":"K|D","src":"…","tone":"tense|cruel|sad|petty|funny|tender|warm","tier":"s|m|l",
 "roles":{"A":{"kind":"rv","nết":[any-of],"lòng":[any-of],"need":"<need>"},"B":{…}},          // A required (except sea/myst may use {} = no person); B optional, never = A
 "text":"…the complication, ≤ 3 sentences, uses {A} {B} {O}…",
 "object":{"name":"…","owner":"A|B|me|kho","clue":"…","trace":"…"} | null,              // law 6c
 "stances":{"<id>":{"text":"option label ≤ 8 words","gain":{…},"loss":{…},"trace":"…(optional)"}, … exactly 4 …},
 "outcomes":{"<same 4 ids>":"what really happens after that choice (1–2 sentences)"},
 "needs":{"rank_min":n,"rank_max":n,"month":[…],"not_confined":true,"kids_min":n,"nights_min":n}}   // all optional
```
- **open**: `a` = the kind of person A the line shows (`rv sv maid emp th doc eun ksp kid man any`); an opener is joined only to comps of the same `fam` whose role A has that kind (`any` = no {A} in the line, joins every comp of the family). Openers set time/place/mood/arrival only (no decision, no fact that a comp could contradict: never says what A wants, never names an object). Text 1 sentence; placeholders `{A} {M} {S} {W} {P}` only. needs: `month` list only.
- **roles.kind**: `rv` living consort (not her) · `sv` her own servant · `maid` her cung nữ · `emp` · `th` Thái hậu · `doc` thái y · `eun` Tổng quản · `ksp` Kính sự phòng · `kid` her living child · `man:<rw>` (rw = sứ thần|họa sư|nhạc sư|thái y). `nết`/`lòng` (any-of each, AND-ed; names from BAL.net.F/M: tt for nết, ld+ch for lòng) only for `rv sv`. **need** (optional, one or a list, real state checked on the live world; false ⇒ seed never offered): `ill preg friend feud foe kids poor` (rv only; feud = A and B at odds, both rv; foe = at odds with her) · `thIll empIll fest rain snow` (any role). Family hints: visit/day/rumor A = rv mostly (rumor: A = the teller (sv/maid/rv), B = the consort it is about); serv A = sv/maid; emp A = emp; court A = eun/ksp/doc/emp/th; kid A = kid; sea/myst A optional.
- **gain/loss keys** (STEP counts; one step = `BAL.j68c.fx[tier][key]`, never a typed number): her stats `sung danh bac suc mat th hh duc tamco an` (`an` = ân tình, gain only) · `rel.A` / `rel.B` (that real person's thiện cảm / lòng trung / quyến luyến: up in gain, down in loss; not for kind emp/th — use `sung`/`th`). **Laws 2/3: every stance Σgain steps == Σloss steps == tier steps (s 1, m 2, l 3), gain ≥1 and loss ≥1** — so all 4 stances are equal value, none cost-only. Outcomes are certain (no odds in P4 seeds).
- **roles.kind**: `rv` living consort (not her) · `sv` her own servant · `maid` her cung nữ · `emp` · `th` Thái hậu · `doc` thái y · `eun` Tổng quản · `ksp` Kính sự phòng · `kid` her living child · `man:<rw>` (rw = sứ thần|họa sư|nhạc sư|thái y). `nết`/`lòng` (any-of each, AND-ed; names from BAL.net.F/M: tt for nết, ld+ch for lòng) only for `rv sv`. **need** (optional, real state checked on the live world; false ⇒ seed never offered): `ill preg friend feud kids poor` (rv only; feud needs B) · `thIll empIll fest rain snow` (any role). Family hints: visit/day/rumor A = rv mostly (rumor: A = the teller (sv/maid/rv), B = the consort it is about); serv A = sv/maid; emp A = emp; court A = eun/ksp/doc/emp/th; kid A = kid; sea/myst A optional.
- **gain/loss keys** (STEP counts; one step = `BAL.j68c.fx[tier][key]`, never a typed number): her stats `sung danh bac suc mat th hh duc tamco an` · `rel.A` / `rel.B` (that real person's thiện cảm / lòng trung / quyến luyến: up in gain, down in loss; not for kind emp/th — use `sung`/`th`). **Laws 2/3: every stance Σgain steps == Σloss steps == tier steps (s 1, m 2, l 3), gain ≥1 and loss ≥1** — so all 4 stances are equal value, none cost-only. Outcomes are certain (no odds in P4 seeds).
- **object** (law 6c): `owner` = role id `A`/`B`, `me` or `kho` (Nội vụ phủ); `clue` = how she knows it is real; `trace` = where it is afterwards (a real person/place, never «mất»); a stance may override `trace`. `null` = no object (a word, a look, a rumour). The engine keeps every trace in S.e68c.ob (personal).
- **text placeholders**: `{A} {B}` names · `{M}` her cung nữ · `{O}` object name · `{S}` season · `{W}` weather · `{P}` where she is. No digits, no %, no odds words, no modern words (VANPHONG law 7); cổ trang. `src` = basis (K documented / D drama; law 8). No comp may copy one of the 90 old j68 situations (validator compares with the old titles/first lines).
- **Draw** (engine): each comp = EV6 `c:<id>` in its family, weight `BAL.j68c.w` (×`BAL.j68c.seen` if any past life saw it → fresh-first; ×0.5/life from e68Cands as all j68), same 54-tuần cooldown, same scheduler, same variant memory; P0 keys `j68` / `c:<id>:<opener#>`. The 90 old decisions + 370 wordings stay untouched (e68Count still reports them; `e68cCount()` reports the composed ones).
Worked examples (valid; copy the shape):
```
{"id":"j68c-day-o01","type":"open","fam":"day","a":"rv","text":"Nắng {S} vừa lên khỏi mái ngói thì {A} đã đứng ngoài hiên."}
{"id":"j68c-day-o02","type":"open","fam":"day","a":"any","text":"Buổi ấy trong cung yên ắng, chỉ nghe tiếng chổi tre ngoài sân."}
{"id":"j68c-day-001","type":"comp","fam":"day","tag":"D","src":"drama: mượn đồ không trả (Chân Hoàn truyện motif)","tone":"petty","tier":"m","roles":{"A":{"kind":"rv","nết":["Nhiều chuyện","Kiêu ngạo"]}},"text":"{A} mượn chiếc {O} của ngươi từ tháng trước, nay đeo ra yến mà nói là đồ nhà mình.","object":{"name":"trâm bạch ngọc","owner":"me","clue":"vết khắc tên cung ngươi dưới chân trâm","trace":"vẫn trên tóc {A}"},"stances":{"doi":{"text":"Sai {M} sang đòi lại","gain":{"danh":1,"mat":1},"loss":{"rel.A":2},"trace":"về hộp trang sức của ngươi"},"tang":{"text":"Coi như tặng hẳn","gain":{"rel.A":2},"loss":{"bac":1,"danh":1}},"vach":{"text":"Nhẹ nhàng nhắc trước mặt mọi người","gain":{"danh":2},"loss":{"rel.A":1,"duc":1},"trace":"{A} trả lại tận tay ngươi"},"im":{"text":"Im lặng, ghi nhớ","gain":{"tamco":1,"mat":1},"loss":{"danh":1,"rel.A":1}}},"outcomes":{"doi":"{M} mang trâm về, {A} đỏ mặt đóng cửa cung.","tang":"{A} cười tươi, khoe khắp nơi món quà của ngươi.","vach":"Cả yến nhìn {A}; nàng trả trâm, mặt tái đi.","im":"Ngươi lặng lẽ ghi thêm một dòng vào sổ lòng."},"needs":{}}
```

## API P5
PRIORITY #1 CHECK ('kỳ ngộ|kyngo|jky'): OD 19/11 ~03:25Z/03:30Z (Kỳ ngộ design dev/design/KYNGO.md) + 23/11 ~22:50Z (ORDER THIN) | main dev/build/jky.js (25 encounters DEF + BAL.kyngo.E in jbalky.js, once per life `z.seen`, two-way NPC rolls, specials SPEC) + dev/test/kyngo-eq.js (law 2/3 value check) | review/* none | claims ENGINE #3 — reuse: the whole jky runtime (ONE gate: a real person at the place now, roll/pity/cooldown, two-way NPC finders, specials, Sổ luân hồi); a seed becomes ONE more entry of KY.DEF + BAL.kyngo.E at load, so everything plays it unchanged.
ENGINE #3 on **review/thin-p4** (same branch, after P4): engine `dev/build/jkyc.js` + generated `dev/build/jkysd.js` (texts/who/where) + `dev/build/jbalkyc.js` (numbers into BAL.kyngo.E, law 4), built by `python3 dev/build/jkysd_build.py`; validator `python3 dev/test/kyseeds_validate.py [files…] [--min N]` (runs the kyngo-eq value formula on every seed × band); `node dev/test/kyc-play.js [file]`. Sha posted in «## ENGINE P4» when ready (~1–2 h).
**WRITER FILES** (builder/validator read every `dev/handover/content/thin/kyseeds*.md`; ids unique): `kyseeds_a.md` writer A = groups **ma + de + th** (teachers / old hands, Hoàng thượng, Thái hậu & festivals) ≥30 · `kyseeds_b.md` writer B = groups **vat + sv** (real pieces, servants, children) ≥30. Target ≥60 new (25 old stay untouched; no seed may reuse an old scene).
```
{"id":"kyc-ma-001","type":"ky","grp":"ma|vat|de|th|sv","tag":"K|D","src":"…","tone":"tender|sad|funny|tense|warm",
 "who":{"kind":"ly|el|man|court|rv|emp|th|sv|kid|maid", "eid":"gt|tn", "role":"Nhạc sư|Họa sư|Sứ thần|Thái y", "c":"ty|tq|ksp|ped", "old":true, "sameBand":true, "eunuch":true|false, "nết":[any-of]},
 "pl":["vuon","lc","tn","kn","thu","dtd","tyv","nvp","ksp","home"] | ["*"],
 "when":{"buoi":[0,1,2,3],"night":true,"winter":true,"wx":true,"fest":["nguyentieu","trungthu","thattich","doanngo",…]},   // all optional
 "what":null | "plot" | "lost" | "dead" | "rare",
 "b":"0123", "w":1,
 "t":"2–3 sentences of scene for HER, {W} = the person's name, {O} = the piece (what lost/dead/rare), {own} = its owner / the plotter (what lost/plot), {S} season",
 "n":["option one ≤ 8 words","option two"], "o":[{"g":{…},"c":{…},"s":"…","a":"…","od":1,"buy":1}, {…}]      // a choice: exactly 2 options
   — OR — "plain":{"g":{…},"s":"…","a":"…"}                                                              // a read card: gain only, no n
}
```
- **who** (a REAL person who is at that place now; the jky ONE gate finds them, never conjured): `ly` the old lady of lãnh cung (pl lc) · `el` elder (eid gt = Giáo tập ma ma, tn = old Thọ Ninh ma ma) · `man` (role Nhạc sư / Họa sư / Sứ thần / Thái y) · `court` (c ty thái y / tq Tổng quản / ksp / ped Nội vụ phủ) · `rv` another consort (old: age band elder; sameBand: same rank band as the finder; nết any-of from BAL.net.F) · `emp` · `th` · `sv` another mistress's servant (eunuch true/false) · `kid` another mistress's child · `maid` her own cung nữ (pl home or *). A who whose kind is never at that place is a dead seed (validator checks the place list per kind: ly→lc; el gt→nvp,tn; el tn→tn; court ty→tyv; tq→thu,dtd; ksp→ksp; ped→nvp,ksp; th→tn; emp/man/rv/sv/kid→any).
- **what** (a REAL piece/fact that already exists, only MOVES, law 6c): `plot` = a j70 plot in prep by another consort (who = the plotter is set by the engine: who.kind must be rv) · `lost` = someone's lost item case (who is set to its owner; s ret/item) · `dead` = a dead woman's effect in the Nội vụ phủ box (who court ped, pl nvp; s item+buy / give) · `rare` = this week's rare piece at Nội vụ phủ (who court ped, pl nvp; s item+buy). `null` = no piece (most seeds).
- **o / plain numbers** = BAL.kyngo.E format exactly (the builder writes them into jbalkyc.js, a BAL file — law 4): gains `g`: `danh sung duc tamco th rel art sucR`; costs `c`: `kh suc bac danh oan seen relM`; `a` = the art for `art` (y theu cam hoa ky thi …, ARTS keys); `od:1` = the option has a roll (seen/odds words only, law 7); special `s`: `intel` (any) · `cure` (who court ty or man Thái y) · `loi` (who el) · `spy` (who sv) · `rk` (b "0" only) · `kn`/`ev` (what plot) · `ret`/`item` (what lost) · `item`+`buy:1`/`give` (what dead) · `item`+`buy:1` (what rare). **Law 2/3 = the kyngo-eq rule:** value = Σg×vw + sv[s] − Σc×vw (BAL.kyngo.vw / sv) × V[band]; the two options of a choice within eqTol (1.25) on EVERY band in `b`; every option has a gain AND a real cost (`kh` alone counts); a plain card has no cost. The validator prints the values; tune numbers until 0 errors. Copy number sizes from the 25 old rows in jbalky.js.
- Draw: as the 25 (pw × fest × wx × E.w), once per life (z.seen), and now CROSS-LIFE through P0 family `ky` (seed = id; a seed met in a past life weighs × BAL.kyc.seen, fresh-first; the 25 old ones too).
- Text: cổ trang (VANPHONG law 7), no digits/%, no odds words, addressed to "ngươi"; the who's real name only through {W}. `src` K/D (law 8).
Worked example (valid):
```
{"id":"kyc-ma-001","type":"ky","grp":"ma","tag":"D","src":"drama: ma ma già dạy lễ nghi","tone":"tender","who":{"kind":"el","eid":"tn"},"pl":["tn"],"when":{"buoi":[0,1]},"what":null,"b":"0123","w":1,"t":"Sau điện Thọ Ninh, {W} đang lau từng chiếc chén ngọc dùng trong lễ tế {S}. Bà ngoắc ngươi lại: “Lễ tế có ba mươi sáu bước, người trẻ bây giờ quên quá nửa.”","n":["Ngồi xuống học lễ","Xắn tay lau chén cùng bà"],"o":[{"g":{"th":20,"duc":2},"c":{"kh":2}},{"g":{"rel":30,"duc":3},"c":{"kh":1,"suc":6}}]}
```

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

## ENGINE P4
- 01:0xZ 24/11 ENGINE #3 (opus, session_01N1tNP4i3MEbbZxyD92bKmn). START_CTX ~4 % (used_tokens 0 → estimate; roll ~29 %, ceiling 60 %). Branch review/thin-p4 from thin-p0-r1 a76ba1e4 (thin-p2/p3 not merged: no j7c/j72c code reused).
- ENGINE READY review/thin-p4 **cc729229**: `dev/build/j68c.js` (each comp → EV6 `c:<id>` in its family; wordings = fitting openers + comp text; e68Count still 90/370, `e68cCount()` for the composed), `j68sd.js` (empty until the writer files land) + `j68sd_build.py`, `BAL.j68c` (jbal2.js), validator `dev/test/j68seeds_validate.py`, fixture `dev/test/j68c-fixture.jsonl` (9 comps + 10 openers, one per family, valid), `node dev/test/j68c-play.js [file]` ALL PASS on the fixture (cast from live roster, placeholders filled, opener join, P0 mark j68 c:<id>:<wording>, real chooseM path, numbers = steps × BAL, object trace, rest for the life, old count 90/370). Note: a bạc cost is shown and paid through the game's own option price rules (same as every option), so the real amount may differ from steps × BAL; the test checks the option is BUILT from steps × BAL and every stat moves the right way.
- P5 ENGINE READY review/thin-p4 **d193f687**: `dev/build/jkyc.js` (seed → KY.DEF + BAL.kyngo.E row; cross-life P0 family `ky` for old 25 + composed, × BAL.kyc.seen), `jkysd.js` + `jbalkyc.js` (empty until kyseeds land) by `jkysd_build.py`, validator `python3 dev/test/kyseeds_validate.py <file> [--min N]` (kyngo-eq value rule per band), fixture `dev/test/kyc-fixture.jsonl` (4 valid seeds: el, emp, sv plain, plot), `node dev/test/kyc-play.js [file]` ALL PASS (fires through jky's gate, real who never the finder, chooseM result, once per life + P0 mark); kyngo-eq PASS (now also reads jbalkyc.js), kyngo-unit PASS.
- (01:5xZ) ENGINE note (touching writer D's file, D is DONE): j68seeds_d.md j68c-rumor-028 → role B removed (text never used it; A and B were both her one cung nữ = never cast), j68c-rumor-037 → A = a servant (sv) telling about her cung nữ B. Validator now rejects A/B as the same fixed person.
- (02:3xZ) ENGINE note: j68seeds_c.md j68c-kid-029 role B need feud → ["foe","kids"] (new need `foe` = that consort is at odds with HER; `feud` = A and B at odds, both consorts; need may be a list). API P4 rule updated in the engine/validator.
- **SẴN SÀNG KIỂM review/thin-p4 db47f4af** (P4 + P5 on ONE branch: both engines + seeds; reviewer may land them together or ask me to split). Folded: j68 composed = **460 decisions + 152 openers** (day 63/16 · visit 64/16 · serv 60/16 · emp 60/16 · sea 44/21 · court 43/20 · rumor 42/15 · kid 42/18 · myst 42/14) → wordings ≈ openers × comps; **Kỳ ngộ composed 77** (ma 16 · de 10 · th 14 · vat 14 · sv 23) → 25 + 77 = 102. Writer files copied into the branch (dev/handover/content/thin/j68seeds_[a-d].md, kyseeds_[ab].md = builder default path). Fold fixes: rumor-028/037 (A/B same cung nữ), kid-029 need → ["foe","kids"] (engine: need may be a list; new need `foe` = at odds with her).
- GATES on db47f4af: quickcheck PASS (open 2055 ms, old save ok, perf new/live render 284/278, tab 544/566, buổi 1348/1246; core gates PASS) · undef-scan PASS (298) · one-core-guard PASS · norep-oldsave ALL PASS (3 live saves + ctm-e68h history) · norep-unit ALL PASS · **j68 counts on old decisions unchanged: e68Count 90 / 370** · `node dev/test/j68c-play.js <all 4 files>` ALL PASS (460; 147 «forced» = that one test world lacked the wanted nết / need, then it is given) · `node dev/test/kyc-play.js <both files>` ALL PASS (74 played, 3 skipped: no real plot/rare piece / no elder consort in that world) · kyngo-eq PASS (now reads jbalkyc.js) · kyngo-unit PASS (test 15: composed rare/dead pieces join vat_ngu's group, gated by 14) · ky-keeper-f2 PASS · coop-e2e 141/141 (S.e68c / S.ky personal; ctm-nr per phone) · shots `node dev/test/thin-p4-shots.js <out> j68:… ky:…` Fold 755x1000 + iPad 1180x820 @2, 3 j68 + 3 Kỳ ngộ each (j68c-visit-010, emp-007, court-006, kyc-th-003, sv-005, ma-005): kit frame, no overflow, 4 / 2 options, cổ trang words, odds ladder — LOOKED 3×.
- Play-test flake (writers' reports) fixed before fold: the test world is a mid-life consort (cung nữ, servants, children, favour); obKeep cap no longer reads as «no trace»; relation checked by way (cap aware); extra options other modules add (tea item) allowed after the 4 stances.
- No-repeat measure (`node dev/test/j68c-measure.js 130 3`, REAL engine, 6 lives × 130 situations per kiếp, each life a new game):

| Family | before: decision repeats | before: wording repeats | after: decision repeats | after: wording repeats | shown per kiếp after |
|---|---|---|---|---|---|
| day | 99 % | 90 % | 75 % | 35 % | 17 |
| visit | 99 % | 88 % | 69 % | 26 % | 19 |
| serv | 100 % | 87 % | 67 % | 18 % | 10 |
| emp | 97 % | 83 % | 67 % | 13 % | 26 |
| sea | 100 % | 98 % | 75 % | 38 % | 4 |
| court | 98 % | 80 % | 62 % | 20 % | 14 |
| rumor | 95 % | 93 % | 62 % | 22 % | 9 |
| kid | 99 % | 91 % | 61 % | 14 % | 17 |
| myst | 100 % | 95 % | 60 % | 10 % | 8 |
| all | 98 % | 88 % | 66 % | 20 % | 123 |
| composed only | – | – | 55 % | 6 % | 77 |
  Reading: an exact wording seen in an earlier life drops from ~9 in 10 to ~1 in 5; a decision met before from ~all to ~2 in 3 (composed ~1 in 2 by life 6: ~77 composed shown per kiếp vs 460 seeds, part not castable in a given roster). Tunable in BAL.j68c (w, seen) without code.
- **HANDOVER (ENGINE #3 rolls after this report; context near START+25 %)**: P4 + P5 DONE and in review. Next in the brief's order: P6 world + j70, P7 festivals ≥40/festival, P8 origin roads 4→8 — not started by me. Reuse pattern: seed file → builder → `j??sd.js` data → engine registers each seed into the EXISTING runtime (EV6 / T7 / KY.DEF) + P0 family; validator + play test + real-engine measure + shots script (copy dev/test/thin-p4-shots.js).
- Writers: `python3 dev/test/j68seeds_validate.py dev/handover/content/thin/j68seeds_<x>.md --min --fams <yours>` → 0 errors (warnings = advice); `node dev/test/j68c-play.js <your file>` in a worktree of review/thin-p4 after `sh dev/site/build_site.sh` (optional; the engine runs it on fold).

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

## P3-SEEDS-A
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j72|việc nhờ'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused the schema from «## API P3», the 110 old j72 templates (no title copied) and the P2 writer's j7seeds.md as style model; nothing rebuilt.
- DONE: `dev/handover/content/thin/j72seeds_a.md` = 63 craft + 64 social seeds (j72c-craft-001..063, j72c-social-001..064). Validator `python3 dev/test/j72seeds_validate.py dev/handover/content/thin/j72seeds_a.md --min 60 --kinds craft,social` (from review/thin-p3) → `127 seeds, 0 errors`.
- Spread: tone warm 35 · funny 25 · tender 22 · petty 18 · tense 15 · sad 12; tier s 63 · m 56 · l 8; tag K 61 · D 66 (src names the K basis and the D drama basis; no real historical person, no named person, requesters by nết/need only). 30 twists. Every pick option: Σgain == Σloss == tier steps (s1/m2/l3), same for all options (laws 2/3). 82 seeds carry a real object (owner + clue + trace_ok/trace_no, law 6c); 45 are pure errands (object null: a word, a message, an introduction). No number typed (law 4); no %, digits or odds words (law 7).
- Notes for ENGINE #2: (1) places used: A B home vuon thu tn kn tyv lc (Hoàng hậu's seeds use `kn`, since `hh` is not a place key); (2) `need` used only for rv/hh/fallen as the validator requires (friend, ill, preg, kids, fest, feud, poor); (3) `man:` requesters use roles sứ thần, họa sư, nhạc sư, thái y; (4) no `it` keys (no seed gives a real IT item; objects are bound by trace text only).
- ~100 % writer lane done (the file); engine fold, shots and gates are ENGINE's.

## P3-SEEDS-B
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j72|việc nhờ'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: 110 j72 việc nhờ on main (no title/ask copied), schema «## API P3», style model j7seeds.md.
- DONE: `dev/handover/content/thin/j72seeds_b.md` = 63 court (j72c-court-001..063) + 66 fam (j72c-fam-001..066) = 129 seeds. Validator (`dev/test/j72seeds_validate.py` from review/thin-p3, run with main's build files): `j72seeds: 129 seeds (court 63, craft 0, fam 66, social 0), 0 errors` with `--min 60 --kinds court,fam`.
- Spread: court req = emp 18, off 15, th 12, hh 5, sứ thần 3, họa sư 2, nhạc sư 2, thái y 2, doc 2, eun 2; fam req = fam 46, sv 9, ak 8, maid 3. Tone: tender/warm/sad/funny/petty/tense all ≥9 per kind. Tier court s26 m32 l5, fam s34 m29 l3. Every pick option = 1 gain step + 1 loss step, equal totals, gain key != loss key; 25 seeds are pure errands (object null), the rest carry a real object with owner + trace_ok/trace_no.
- Notes for ENGINE #2: (1) validator forbids nết/lòng for kind `off`, and need ill/preg/poor/kids for non-rv/hh/fallen, so court `off` seeds carry no nết filter and fam seeds (kind fam/sv/ak) carry no such need; ak seeds use `needs.kids_min`. (2) The file keeps an extra `slug` field. (3) `src` K only where the practice is documented (16 seeds), staged request always D.
- Handover: none needed (small lane, finished well under the context ceiling).

## P4-SEEDS-D
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j68|openings'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: schema + fixture from «## API P4» (review/thin-p4 cc729229); the 90 old j68 decisions on main (none copied: old rumor = rumorPreg/Spy/Evidence/EmpLove/TH/Favor, old myst = hairpinThief/poisonedFish/nightSteps); nothing rebuilt.
- DONE: `dev/handover/content/thin/j68seeds_d.md` = rumor 42 comp / 15 open (j68c-rumor-001..042, -o01..o15) + myst 42 comp / 14 open (j68c-myst-001..042, -o01..o14). Validator (review/thin-p4 cc729229): `python3 dev/test/j68seeds_validate.py dev/handover/content/thin/j68seeds_d.md --min --fams rumor,myst` → `rumor 42c/15o, myst 42c/14o — 0 errors, 0 warnings`.
- Spread: rumor tier s6 m32 l4, tone petty9 tense9 warm7 funny5 sad5 cruel4 tender3, tag D32 K10, 37 with a real object; myst tier s3 m36 l3, tone tense13 petty7 sad6 cruel5 tender4 funny4 warm3, tag D34 K8, 42 with a real object (owner me/kho/A/B, every trace a real person/place). Every stance: Σgain = Σloss = tier steps, no cost-only, no typed number, no named person, nết/lòng only for rv/sv.
- Validator lessons (for the other writers): `an` is gain-only; maid/emp/th/… take no nết/lòng filter; stance ids [a-z]+ only; BAD words include «nắm chắc», «chắc chắn», «tùy duyên», «ván».
- NOTE for ENGINE #3: `node dev/test/j68c-play.js` is flaky in my sandbox — even the engine's own fixture fails 2 ("j68c-serv-001 / j68c-rumor-001 … made from the live roster"), and on my file a different random 20–40 comps fail "made from the live roster" each run (all other checks that ran passed). Looks like the forced-roster casting for A=sv/maid in a fresh test world, not the content; please look at `force()` / the staff cast.
- ~100 % writer lane done (the file); fold, gates and shots are ENGINE's. No rollover needed.
## P5-SEEDS-A
PRIORITY #1 CHECK ('no-repeat|thin-|Kỳ ngộ|kyngo'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 — reused the 25 old BAL.kyngo.E rows' number sizes and the kyngo-eq value rule; no old scene reused.
File `dev/handover/content/thin/kyseeds_a.md`: **40 seeds** = ma 16 · de 10 · th 14 (th = Thái hậu 6 + 8 festival: thanhminh, doanngo, trungcuu, dongchi, giaothua, newyear, phoenix, thattich), ids `kyc-ma|de|th-001…`, all `tag` D (drama, law 8), `what:null`, no digits/%, actors by role/nết only (no named person).
Validator (`dev/test/kyseeds_validate.py --min 30` from review/thin-p4 d193f687): **0 errors**, 18 warnings = «text never names {W}» on emperor/Thái hậu seeds (they are addressed by title, by design). Local value check: every pair within eqTol on all bands, every option has gain AND cost, no plain card with cost.
Specials used: intel (ma-007/008/016), cure (ma-006/014); no other special. th-009 is a deliberate zero-spread pair (two equal gains, different taste).

## P4-SEEDS-B
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j68|openings'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused the schema from «## API P4», the P2/P3 writer files as style models; avoided every old j68 serv/emp topic (sickServant, maidQuarrel, servGamble, bribedServ, servRomance, servLeave, newServSus, servHero, empDish/Poem/Sulk/Chess/AsksAbout/GiftOdd/Incognito/SleepRead/Wager/Dream/OldFlame).
- DONE: `dev/handover/content/thin/j68seeds_b.md` = serv 60 comp + 16 open (6 sv, 6 maid, 4 any), emp 60 comp + 16 open (12 emp, 4 any). Ids j68c-serv-001..060, j68c-serv-o01..16, j68c-emp-001..060, j68c-emp-o01..16. Validator `python3 dev/test/j68seeds_validate.py dev/handover/content/thin/j68seeds_b.md --min --fams serv,emp` (review/thin-p4 d193f687) = 0 errors, 0 warnings.
- Spread: tiers mixed s/m/l; every stance Σgain == Σloss == tier steps; `an` only on the gain side (validator rule); all objects have owner/clue/trace; no named person; no digits/%; src K/D noted.
- Notes for ENGINE #3: (1) maid comps carry no nết/lòng (validator rule); (2) `j68c-emp-*` objects with owner `A` belong to the emperor; (3) `j68c-serv-010` and `-021`..: B role is a consort (rv) cast by nết; (4) `node dev/test/j68c-play.js` could not run here (needs the built site, sparse worktree) — engine to run it on the merged file.
- ~100 % writer lane done (the file); fold-in, play test and gates are ENGINE's.

## P5-SEEDS-B
PRIORITY #1 CHECK: OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — the 25 old Kỳ ngộ untouched, no scene reused.
- File `dev/handover/content/thin/kyseeds_b.md`: 37 seeds = grp vat 14 (lost 5, dead 3, rare 3, plot 3) + grp sv 23 (servants, children, own maids, eunuchs; fest/winter/night/wx variants). Ids kyc-vat-001..014, kyc-sv-001..023.
- Validator (review/thin-p4 d193f687): `kyseeds_validate.py kyseeds_b.md --min 30` → 0 errors, 0 warnings. `kyc-play.js` ALL PASS (27 played, 10 skipped: no real dead/rare piece in that one world).
- Law 2/3: every choice within eqTol (my own max/min ≤ 1.2 on all bands), every option gain+cost, plain cards gain-only; numbers copied in size from the old 25; law 4 no typed numbers in text; law 8 src K/D.

## P4-SEEDS-A
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j68|openings'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused the schema from «## API P4», the 90 old j68 situations (none copied; validator old-wording check passes), P3 writer file as style model; nothing rebuilt.
- DONE: `dev/handover/content/thin/j68seeds_a.md` = day 63 comp + 16 open, visit 64 comp + 16 open (ids j68c-day-001..063 / -o01..16, j68c-visit-001..064 / -o01..16). Validator (review/thin-p4 cc729229) `python3 dev/test/j68seeds_validate.py <file> --min --fams day,visit` → `day 63c/16o, visit 64c/16o — 0 errors, 0 warnings`; fixture still 0 errors.
- Spread: tier s 55 · m 63 · l 9; tone tense 31 · warm 25 · funny 21 · petty 20 · tender 18 · sad 12; tag D 114 · K 13. Every stance Σgain == Σloss == tier steps (laws 2/3); no number, % or odds word typed (law 4/7); people by nết/kind only, no name; objects carry owner + clue + trace (law 6c); roles used: rv sv maid kid th doc eun ksp man:sứ thần/họa sư/nhạc sư; needs used: rain snow ill preg friend feud kids poor.
- In-game play test (`node dev/test/j68c-play.js <file>`): across 8 runs, only failure class = `[forced] made from the live roster` on the `sv` seeds (rv/maid/kid/th/doc/eun pass), in ~half the runs. Probe: with every sv nết removed it still fails ~half of runs → the random test world sometimes has no servant at all (sv6 returns null), not a seed fault. I dropped `lòng` from sv roles to widen casting anyway. ENGINE #3: please check sv casting in play-test worlds (or seed a servant in the harness). Also occasional `numbers = steps × fx` mismatch on `rel.A` when the real relation is already at a clamp (e.g. day-visit-018/019/052/054/056/060) — harness reads the clamped delta; seeds are balanced by steps.
- ~100 % writer lane done (the file); engine fold and gates are ENGINE's.

## P4-SEEDS-C
- PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j68|openings'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reused: schema + worked example from «## API P4», validator + fixture from review/thin-p4 cc729229, old j68 situations on origin/main (themes avoided: leakRoof flowerBloom heatStroke snowDay autumnMoon springAllergy stormNight lotusSeason droughtPrayer q6coldWinter famineDonate borderNews clanFather officialWife envoyGift q6hhRite kidSick kidFight kidGift kidTutor kidLie); nothing rebuilt.
- DONE: `dev/handover/content/thin/j68seeds_c.md` = **sea 44 comp + 21 open · court 43 comp + 20 open · kid 42 comp + 18 open** (ids `j68c-<fam>-001..` and `j68c-<fam>-o01..`). Validator `python3 dev/test/j68seeds_validate.py dev/handover/content/thin/j68seeds_c.md --min --fams sea,court,kid` → 0 errors, 0 warnings.
- Spread: sea tone tender 10 · tense 10 · warm 9 · funny 7 · petty 4 · sad 4, tier s20 m21 l3, K20/D24, A = sv10 maid9 rv8 doc3 emp2 + 12 with no person; court tone tense 13 · petty 10 · tender 7 · sad 7 · warm 4 · funny 2, tier s13 m26 l4, K21/D22, A = eun19 doc7 emp7 ksp6 th4; kid tone tense 12 · tender 9 · funny 7 · petty 5 · warm 5 · sad 4, tier s21 m20 l1, K21/D21, A = kid42 (needs kids_min 1; 1 seed also B rv + need feud). Every comp has a real object (owner A/B/me/kho + clue + trace, never «mất»); all 4 stances of every comp have Σgain == Σloss == tier steps (laws 2/3), no number/% typed (law 4/7), nết only for rv/sv, no named person.
- Law-6 care: no «Thái hậu»/«Hoàng hậu» named in any comp whose role A is not `th` (they may be dead / be her): text says «bề trên»; kid texts use «con»/«đứa trẻ» (no sex), «nhà ngoại» (no ông bà), no sibling assumed.
- `node dev/test/j68c-play.js` on a worktree of review/thin-p4 (cc729229 + `python3 dev/build/j68sd_build.py` → 129 comp + 59 open, `sh dev/site/build_site.sh`): per family sea 1 FAIL / 44, court ALL PASS / 43, kid 1 FAIL / 42. The remaining ones are test-world limits, not seed errors, for ENGINE #3 to judge: (1) sea-018 forced servant `rel.A 0≠6` (loyalty already clamped); (2) kid-029 needs `feud` between two rivals (cannot be forced); (3) running ALL 129 comps in ONE world: 58 comps report «object traced: null» because `BAL.j68c.obKeep=60` caps S.e68c.ob so `ob.slice(ob0)` is empty after 60 traces (test artefact: run per family or raise obKeep in the test); (4) the engine's own fixture comp rumor-001 (A sv, B rv) also fails «made» in my world (only 1 servant in the fresh test world, so nết-filtered sv seeds cannot be cast; real play has more staff).
- Not done (outside my lane): fold into review/thin-p4 (`python3 dev/build/j68sd_build.py`), shots, gates.
- ~100 % writer lane done (the file).
## REVIEW thin-p2 r1
- 24/11 ~02:10Z · BIG reviewer-lander (opus) session_01N1tNP4CJvo5LTSpe5PNSLK · START_CTX ~4 % (own estimate), depth 3. PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse confirmed (j7c reads jnorep family `j7`; 33 old ev() kept).
- Reviewed review/thin-p2 @3f4e1fcd. Fixes on **review/thin-p2-r1** (merged review/thin-p0-r1 a76ba1e4 + origin/main e88b09b4 then bba42773; assemble.py keeps jnorep/j7sd/j7c + main's jkitsel).
- FIXES (reviewer):
  | # | Law | Found | Fix |
  |---|---|---|---|
  | 1 | 2 equal value, 4, 6a | BAL.j7c.fx.proof 8/15/25: every seed has 2 proof stances (162 of 324), each tap = evStory of 8–25 = a deed of that weight + chứng cứ far over BAL.kh.accEv 3 with NO roll; old j7 cards give evGo 1–2 on a won roll, DEEDW 1–2 | proof s/m/l = 1/1/2 (jbal2.js, comment says why) |
  | 2 | 3 (visible gain) | proof went into c6 `k` → not shown on the card: the proof stance read as 1 gain vs 2 losses | proof token in `wt` like j68f (`chứng cứ <name> +n`) → shows under ĐƯỢC (seen on the shots as «nắm thêm thóp kẻ khác» after the odds/noword layer) |
  | 3 | 4 | j7cFresh typed fallback `||12` | BAL.j7c.rest only |
  | 4 | 6 grounding / 7 | text promises bạc but no bạc loss: j7-041, j7-068, j7-077 lanh ("…bằng bạc của ngươi") | loss duc → bac (same step count) |
  | 5 | 7 | j7-048 dan "chia đôi chiếc vòng và nhờ ngươi giữ…", j7-061 dan "nhờ ngươi gửi" (she asks herself) | rewritten; j7-048 dan gets its own `trace` (vòng bạc at her place as a pledge) |
  | 6 | test | j7c-play cast check ignored BAL.j7c.loose → random FAIL (~1 in 3 runs) | check uses j7cFit strict or loose (5/5 PASS) |
  | 7 | gate | j7c-shots.js: new-life flow hid the card | quickcheck way: new life + 1 buổi → ser() into sổ 3 → reload → loadSlot/deser → card |
  Seeds file edited on the handover branch (dev/handover/content/thin/j7seeds.md, 5 rows), j7sd.js rebuilt by j7sd_build.py (validator 81 seeds, 0 errors). Scan (whole group): stance text mentioning bạc/mua/tiền/đền without a bạc loss → 4 hits (j7-026 "vòng bạc" = an object, not a cost; other 3 fixed); "nhờ ngươi" → 2 hits fixed; digits/% in player text → 0.
- LAW CHECK: 1 two-way — 13 mirror seeds (-me, she is the target, same 4 stances) OK · 2/3 — every stance Σgain = Σloss = tier steps (s1/m2/l3), 4 stances, no cost-only stance; step values all from BAL.j7c.fx (bạc 20/40/60 vs stat 2/4/6 vs rel 4/8/12 — designer scale, not re-tuned) OK after fix 1 · 4 — 0 typed numbers after fix 3; one-core guard PASS · 6 — actors = living roster consorts/servants/men/kids by nết (loose = any one listed nết/lòng), fixed people via A6; grounding gate drops a seed when a role/placeholder/owner is missing; card rebuilt from saved pp, dropped if anyone is gone; object {name,owner,trace,turn} kept in S.j7c.ob and printed on the result (per-stance trace) — NOTE: S.j7c.ob is not yet shown in any book/log screen (traceable in save + result line only) · 7 — spot-read 21 seeds (j7-001…081 step 4) + scans: cổ trang OK; odds words from the kit (Rất vững) · 8 — src on every seed: 80 D + 1 K (drama-based; expert pass = law 8 note for Foreman B) · old 33 ev() kept, weighed ×nrW("j7",id), marked on show.
- GATES on final sha (see last line): j7c-play ALL PASS ×5 · undef PASS (299) · validator 81/0 · coop-e2e both seats (first run 140/141: «week after rebirth advances» timing flake; rerun 141/141; origin/main same build lane 141/141) · norep-oldsave ALL PASS (3 LIVE saves) · norep-unit ALL PASS · quickcheck (before main bba42773 merge) PASS: open 1796 ms, old save ok, perf new/live render 262/276, tab 535/513, buổi 1269/1221, core gates PASS.
- SHOTS (Fold 755x1000@2 + iPad 1180x820@2, LOOKED 3×; scratch only, not uploaded — CDN blocked in the test so pictures read «Đang thỉnh tranh…»): j7c-j7-001 fold/ipad, j7-034 ipad (fold: roster had no cast for it → seed skipped, correct), j7-070 (mirror) fold/ipad. Card = kit «Việc» frame + act-card options, names coloured by kit, TỐN/ĐƯỢC/MẤT rows, proof now on ĐƯỢC. No overflow, no cut text. Pre-existing (not this branch): option text column narrow on Fold when the option picture is missing.
- Tuning left for MAIN (not blocking): BAL.j7c.share 1 (one world card in makeDil); seeds' `maMa` unused.
- Final gates on **d9386531** (contains origin/main bba42773 + review/thin-p0-r1 a76ba1e4): QUICKCHECK PASS (open 1911 ms · old save ok · perf new/live render 245/253, tab 504/513, buổi 1391/1211, tasks>200ms 25/23 · core gates PASS) · coop-e2e 141/141 (CO-OP GATE PASS, both seats) · norep-oldsave ALL PASS · norep-unit ALL PASS · j7c-play ALL PASS · undef PASS.
- **VERDICT: PASS d9386531** (review/thin-p2-r1). LAND AFTER thin-p0 (a76ba1e4 is inside it, so a fast-forward of main to d9386531 lands both). review/thin-p3 (ENGINE #2) should merge review/thin-p2-r1 (proof scale + seeds changed).

## API P6
PRIORITY #1 CHECK ('no-repeat|thin-|world|j70|festival|origin road'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: the whole world-window layer on origin/main (jworld.js + jworld2.js: ONE record S.wwin, 27 kinds EVD.<k>, real causes, gates nightCh/festToday/stipend/mindW/placeWhere, CENTER pop-up worldShow, NPC choices by mindPick) and the whole j70 chain runtime (M70 methods × routes, tells tellOf70, pickRoute70, evHistMark("j70:m:r")) + P0 jnorep (review/thin-p0-r1 a76ba1e4). A composed WORLD seed becomes one more REACTION SCENE of a real window of its kind; a composed ROUTE seed becomes one more route in M70[m].R at load. thin-p2/p3/p4 not merged (own engines j7c/j72c/j68c).
ENGINE #4 (opus, session_01N1tNP5RyEw6T1AADGb6c75) on **review/thin-p6** (from thin-p0-r1). Engines `dev/build/jworldc.js` (world) + `dev/build/j70c.js` (routes); data `dev/build/jwsd.js` / `dev/build/j70sd.js` (built by `python3 dev/build/jwsd_build.py` / `python3 dev/build/j70sd_build.py`, which read every writer file); numbers `BAL.wc` / `BAL.j70c` (jbal2.js, law 4). Validators `python3 dev/test/wseeds_validate.py [files…] [--min] [--kinds a,b]` and `python3 dev/test/j70seeds_validate.py [files…] [--min] [--meths a,b]`; fixtures `dev/test/wc-fixture.jsonl`, `dev/test/j70c-fixture.jsonl`; play tests `node dev/test/wc-play.js [file]`, `node dev/test/j70c-play.js [file]`. Engine sha posted in «

## API P7
PRIORITY #1 CHECK ('festival|j71|FV7|hội'): OD 23/11 ~22:50Z (ORDER THIN) | main dev/build/j71.js (FV7: 14 festivals × 13–14 variants [kind, sub, text], kinds C contest / W wager / G game / B banquet / P gifts / R rite; fvPick = unused this life, then least seen in the last 5 lives via evHistSeen("j71:f:<fest>:<i>"); SC7 contest formulas; WT7 wager themes; FT7 titles; cRun7 one formula for everyone) | review/* none | claims ENGINE #4 — reuse: the whole j71 runtime; a composed STAGE becomes one more FV7[fest] entry at load (index after the old ones, so old history keys stay), composed COMPLICATION and PRIZE are drawn per occurrence and saved in the festival's own params (pp), so a pending card survives a reload.
ENGINE #4 on **review/thin-p6** (same branch, after P6): engine `dev/build/j71c.js` + data `dev/build/j71sd.js` (built by `python3 dev/build/j71sd_build.py`), numbers `BAL.j71c` (jbal2.js); validator `python3 dev/test/fseeds_validate.py [files…] [--min] [--fests a,b]`; fixture `dev/test/j71c-fixture.jsonl`; `node dev/test/j71c-play.js [file]`. Sha in «## ENGINE P6» when ready; write now from this schema.
**WRITER FILES** (builder/validator read every `dev/handover/content/thin/fseeds*.md`; ids unique; one JSON object per line, other lines ignored):
- `fseeds_a.md` writer A = **newyear nguyentieu thanhminh doanngo phoenix thattich vulan** + ≥12 shared complications (`fest:"*"`)
- `fseeds_b.md` writer B = **trungthu vantho trungcuu thanhtho dongchi lapbat giaothua** + ≥12 shared complications (`fest:"*"`)
- ids: `fc-<fest>-sNN` stage · `fc-<fest>-cNN` comp · `fc-<fest>-pNN` prize · shared comps `fc-xa-cNN` (writer A) / `fc-xb-cNN` (writer B).
**Per festival (--min):** ≥6 new `stage` rows (≥3 of them kind C, ≥1 non-C), ≥4 own `comp` rows, ≥3 `prize` rows. With the old 13–14 variants and the shared complications this gives ≥40 composed variants per festival (stage × complication × prize; the validator prints the count).
Three row types:
```
{"id":"fc-trungthu-s01","type":"stage","fest":"trungthu","kind":"C|W|G|B|P|R","sub":"<see below>","tag":"K|D","src":"…","title":"≤ 8 words (C only)","text":"1–2 sentences: where, what, who judges"}
{"id":"fc-trungthu-c01","type":"comp","fest":"trungthu|*","kinds":["C","W","G","B","P","R"],"tag":"K|D","src":"…","tone":"tense|cruel|sad|petty|funny|tender|warm","tier":"s|m|l",
 "roles":{"B":{"kind":"rv","nết":[any-of],"lòng":[any-of]}},          // optional; B = the RIVAL, a real consort at the festival (C: one of the real entrants)
 "text":"1–2 sentences: what happens around her during/after the event, uses {B} {O} {M} {F}",
 "object":{"name":"…","owner":"B|me|kho","clue":"…","trace":"…"} | null,
 "stances":{"<id>":{"text":"label ≤ 8 words","gain":{…},"loss":{…},"trace":"…(optional)"}, … exactly 4 …},
 "outcomes":{"<same 4 ids>":"1–2 sentences"},"needs":{"rank_min":n,"rank_max":n,"not_confined":true,"kids_min":n}}
{"id":"fc-trungthu-p01","type":"prize","fest":"trungthu","tag":"K|D","src":"…","name":"the real thing the winner of a contest takes","from":"who gives it / where it comes from","trace_me":"where it is when SHE wins","trace_npc":"where it is when {W} wins","it":"<IT key, optional>"}
```
- **stage.kind / sub** (the j71 runtime plays it exactly like the old variants of that kind): `C` contest → sub = a contest key `doden tho doi dan mua hat theu kim hoa ve co banh ban dauho huong` (scored by the SC7 formula, same for everyone) and `title` = what the contest really asks («Thi …», shown as the card title) · `W` wager → sub = a theme `ngua rong dieu thuyen thuyen2 thuyen3 xa bang phao` · `G` a game with a consort → sub `""`, text MUST contain `{A}` (the real consort who invites her) · `B` banquet → sub `""` · `P` gifts → sub `emp|th` · `R` rite → sub `""`. Text: no {A} except G; never names a person.
- **comp** = the complication drawn ON TOP of a stage of a fitting kind (`kinds`) at that festival (`fest` = its key, or `*` = any festival): after she makes her festival choice, the complication card follows (one per festival occurrence, P0 family `j71c:c`, fresh-first, never twice in a life). **B = the rival**: cast from the real consorts present (for C: from the real entrants), by nết; if no one fits, no complication that time. `{F}` = the festival's name. **Laws 2/3: every stance Σgain == Σloss == tier steps (s 1, m 2, l 3), gain ≥1, loss ≥1.** gain/loss keys (STEP counts; one step = `BAL.j71c.fx[tier][key]`): her stats `sung danh bac suc mat th hh duc tamco an` (`an` gain only) · `rel.B` (the rival's thiện cảm; up in gain, down in loss). Law 1 two-way: write what the rival does to her AND let her stances include doing the same back.
- **prize** = what the WINNER of a contest at that festival takes, a real object (law 6c): drawn per contest occurrence (P0 family `j71c:p:<fest>`, fresh-first), named on the contest card («Giải: …»); when she wins it goes to her (`it` = a real IT key from `dev/handover/content/thin/j72_itkeys.md` → the item is put in her chest; omit `it` for a thing that is not an item, e.g. a hanging scroll in the hall) and `trace_me` is told; when an NPC wins, `trace_npc` is told with `{W}` = the real winner. Never «mất». The stat prize of the old rule stays.
- **text placeholders**: stage `{A}` (G only) · comp `{B} {O} {M} {F} {S}` · prize `{W}` (trace_npc only). No digits, no %, no odds words, no modern words (VANPHONG law 7). `src` K/D (law 8). No stage may copy an old FV7 text (validator compares).
Worked examples (valid; copy the shape):
```
{"id":"fc-trungthu-s01","type":"stage","fest":"trungthu","kind":"C","sub":"theu","tag":"D","src":"drama: thêu khăn thưởng trăng","title":"Thi thêu khăn chị Hằng","text":"Đêm rằm, Thái hậu muốn mỗi cung thêu một chiếc khăn hình chị Hằng ôm thỏ ngọc; khăn đẹp nhất treo ở lầu Vọng Nguyệt."}
{"id":"fc-trungthu-s02","type":"stage","fest":"trungthu","kind":"G","sub":"","tag":"D","src":"drama: đoán đèn","text":"Dưới hàng đèn kéo quân, {A} rủ ngươi đoán câu đố viết trên đèn, ai đoán sai phải góp bạc."}
{"id":"fc-trungthu-c01","type":"comp","fest":"trungthu","kinds":["C"],"tag":"D","src":"drama: tranh công thêu","tone":"petty","tier":"m","roles":{"B":{"kind":"rv","nết":["Kiêu ngạo","Nhiều chuyện"]}},"text":"Lúc bày khăn chờ chấm, {B} đứng sát bàn của ngươi, khen to rằng mẫu {O} ấy nàng đã thêu từ năm ngoái.","object":{"name":"khăn thêu chị Hằng","owner":"me","clue":"đường chỉ kim tuyến chỉ cung ngươi có","trace":"treo trên lầu Vọng Nguyệt"},"stances":{"vach":{"text":"Chỉ đường kim tuyến cho mọi người xem","gain":{"danh":2},"loss":{"rel.B":2}},"cuoi":{"text":"Cười, mời {B} thêu cùng năm sau","gain":{"rel.B":1,"duc":1},"loss":{"danh":1,"mat":1}},"tau":{"text":"Nhờ ma ma chứng giám","gain":{"danh":1,"hh":1},"loss":{"bac":1,"rel.B":1}},"bo":{"text":"Mặc kệ, để khăn tự nói","gain":{"tamco":1,"suc":1},"loss":{"danh":2}}},"outcomes":{"vach":"Ai cũng thấy đường kim tuyến; {B} đỏ mặt lui về.","cuoi":"{B} lúng túng nhận lời; mấy người khen ngươi rộng lượng.","tau":"Ma ma soi kỹ, nói khăn là của ngươi; ngươi phải thưởng bà ít bạc.","bo":"Lời {B} lan khắp yến; ngươi giữ im lặng."},"needs":{}}
{"id":"fc-xa-c01","type":"comp","fest":"*","kinds":["C","W","G","B","P","R"],"tag":"D","src":"drama: mưa bất chợt ngày hội","tone":"funny","tier":"s","roles":{},"text":"Giữa lúc hội đang vui, trời đổ mưa rào; cung nhân chạy tán loạn, {M} giơ tay áo che cho ngươi.","object":null,"stances":{"o":{"text":"Ở lại xem hội đến cùng","gain":{"danh":1},"loss":{"suc":1}},"ve":{"text":"Về cung thay áo","gain":{"suc":1},"loss":{"danh":1}},"che":{"text":"Nhường ô cho cung nhân","gain":{"duc":1},"loss":{"suc":1}},"tro":{"text":"Rủ mọi người trú mưa, kể chuyện","gain":{"hh":1},"loss":{"mat":1}}},"outcomes":{"o":"Áo ướt sũng nhưng ai cũng thấy ngươi ở lại.","ve":"Ngươi về sớm; hội tan lúc nào không hay.","che":"Cung nhân cảm động, kể lại khắp nơi.","tro":"Dưới hiên, mọi người cười nói đến tạnh mưa."},"needs":{}}
{"id":"fc-trungthu-p01","type":"prize","fest":"trungthu","tag":"D","src":"drama: thưởng gương đồng ngày rằm","name":"gương đồng chạm thỏ ngọc","from":"Thái hậu ban","trace_me":"đặt trên bàn trang điểm của ngươi","trace_npc":"{W} mang về treo ở cung mình"}
```
- **P6 FOLDED + P7 FOLDED on review/thin-p6 92cb3949** (one branch, both items; same ONE review). P6: `jwsd.js` 91 world reactions (27 kinds, 3–4 each) + `j70sd.js` 78 routes (17 methods, 4–5 each); P7: `j71sd.js` 220 rows (91 stages, 80 complications incl. 24 shared, 49 prizes). All writer files validator 0 errors.
- Fix found while folding: kind `ngoai` owns `w.x.c` (its clan name) → jworldc's draw lives in `w.x.wc` (whole engine + tests).
- GATES (92cb3949 unless said): `node dev/test/wc-play.js <all wseeds>` ALL PASS 91/91 (8 forced: nết/scope not present in the one test world) · `node dev/test/j70c-play.js <all j70seeds>` ALL PASS 78/78 (NPC→her + her→NPC, old count 51) · `node dev/test/j71c-play.js <all fseeds>` ALL PASS (91 stages appended after the old 184, 80 comps, 49 prizes incl. IT items via goodsGive, a full festival day; 13 forced; 3 G stages skip-not-fail when no consort chose to gamble) · undef-scan PASS (298) · old saves `node dev/test/norep-oldsave.js <LIVE index.html>` ALL PASS (3 saves load + play a buổi) · quickcheck on engine sha a70f804b PASS (open 1528 ms, old save ok, perf render 243/199, tab 384/366, buổi 1206/1015, core gates PASS); quickcheck on 92cb3949 running (result in next line) · coop-e2e 141/141 both seats on 71fe6b05 (S.wwin is a world key: the draw w.x.wc is host-rolled and synced; her choice/traces S.wc, S.j71c and the P0 store are personal) — the P7 fold adds no shared/world key.
- SHOTS (Fold 755x1000 + iPad 1180x820, LOOKED): `node dev/test/p6-shots.js <dir>` → world reaction cards (wc-dis-002, wc-day-001, wc-tang-002), «Tai mắt báo» j70 cards (j70c-poison-001, musk-002, rumor-003), festival complications (fixture fc-trungthu-c01, fc-newyear-c01): all in the shared kit event frame, 4 options with kit cost/gain rows, names filled, no {…} left, 2-column on iPad. Scratch only (pictures blocked in the test = grey frames). Content notes for a later pass (not blocking): some tells are scenes, not acts (j70c-musk-002 «tiếng khóc than…», «một bóng áo trắng…»); wc-dis-002 text speaks as «ta».
- NO-REPEAT MEASURE (`THIN_DIR=<content/thin> node dev/test/p6-measure.js 300`, 6 lives × 1 kiếp, 14 windows + 16 plots per kiếp): world window content 73 % → 22 % · j70 route 58 % → 2 %. Festivals: old 13–14 variants per festival → composed (stage × fitting complication × prize) 208–467 per festival (validator count); stages keep j71's own memory (unused this life, least seen in 5 lives), complications/prizes P0 fresh-first.
- **SẴN SÀNG KIỂM review/thin-p6 92cb3949 (P6 + P7)** once the quickcheck line below says PASS.
- quickcheck 92cb3949 **PASS** (open 1587 ms, old save ok, perf new/live render 232/239, tab 393/386, buổi 1357/1065, core gates PASS). → **SẴN SÀNG KIỂM review/thin-p6 92cb3949 (P6 + P7)**. Note: branch is on thin-p0-r1, LIVE now 4a8c627b — the lander re-merges main.
- **HANDOVER (ENGINE #4 rolling over at ~27 % context; START ~3 %, rule start+25 %)** — successor ENGINE (opened by Foreman B, never by me): (1) read this section + «## API P6/P7»; (2) if quickcheck 92cb3949 is not reported PASS below, run `bash dev/tools/quickcheck.sh` in a full worktree of review/thin-p6 and post it; (3) **P8 origin roads 4→8 per origin is NOT started**: design notes — roads live in dev/build/jroad.js (rdDef(road,n,def) registers chapters .5–.11 as ARC67 arcs o:"rd"; ROAD14; chapter .4 = the j67 premise ARC67[road]; numbers BAL.road.fx[id] via rdFx; cast carried road-long rdCast; openings read the previous ending rdK/RDW; finale .11) and 15 data files jrd_<origin>.js (~2.5 MB, 44 roads). Proposed P8 shape: per origin 4 NEW premises (j67 arcs, same shape as the old 4) + their chapters .5–.11 COMPOSED from shared part pools (per chapter slot: opening hồi × complication hồi × turning hồi × climax hồi × 3 endings, written per origin with {v}/{dad}-style cast keys, 4 equal-value options per hồi in steps × a new BAL.road.c fx table), so each new road = premise + 7 composed chapters; avoid-last-10 (ctm-arcs) kept by adding the new premises to the origin's pool. Publish «## API P8» first (schema + writer files content/thin/rdseeds_<origin>.md, one writer per 2–3 origins), then engine `jroadc.js` + validator + play test (walk a whole composed road .4→.11 on a fresh 14-chapter life).

## ENGINE P6» when ready (~1–2 h); write now from this schema.
ENGINE #4 (opus, session_01N1tNP5RyEw6T1AADGb6c75) on **review/thin-p6** (from thin-p0-r1). Engines `dev/build/jworldc.js` (world) + `dev/build/j70c.js` (routes); data `dev/build/jwsd.js` / `dev/build/j70sd.js` (built by `python3 dev/build/jwsd_build.py` / `python3 dev/build/j70sd_build.py`, which read every writer file); numbers `BAL.wc` / `BAL.j70c` (jbal2.js, law 4). Validators `python3 dev/test/wseeds_validate.py [files…] [--min] [--kinds a,b]` and `python3 dev/test/j70seeds_validate.py [files…] [--min] [--meths a,b]`; fixtures `dev/test/wc-fixture.jsonl`, `dev/test/j70c-fixture.jsonl`; play tests `node dev/test/wc-play.js [file]`, `node dev/test/j70c-play.js [file]`. Engine sha posted in «## ENGINE P6» when ready (~1–2 h); write now from this schema.
**WRITER FILES (one per writer; builders/validators read every `dev/handover/content/thin/wseeds*.md` resp. `j70seeds*.md`; ids unique across files; one JSON object per line, lines not starting with `{` ignored):**
- `wseeds_a.md` writer A = WORLD kinds of jworld.js: **tang away tuyen hoa dis dich su tho sao xa** (≥4 per kind, ≥40)
- `wseeds_b.md` writer B = WORLD kinds of jworld2.js: **day lap hau thb thi vuong ret trung vuco cam trom phong hon ngoai phat benh tinh** (≥3 per kind, ≥51)
- `j70seeds_a.md` writer C = ROUTES of the heavy methods: **poison poison2 musk catswap kpoison pond pushp kframe** (≥4 per method, ≥32)
- `j70seeds_b.md` writer D = ROUTES of the other methods: **frame plant bribe block rumor accuse ksab joint huydung** (≥4 per method, ≥36)
Validate your own file: `python3 dev/test/wseeds_validate.py dev/handover/content/thin/wseeds_a.md --min --kinds tang,away,tuyen,hoa,dis,dich,su,tho,sao,xa` (B: its 17 kinds; --min = ≥4 per kind for A's kinds, ≥3 for B's) · `python3 dev/test/j70seeds_validate.py dev/handover/content/thin/j70seeds_a.md --min --meths poison,poison2,musk,catswap,kpoison,pond,pushp,kframe` (--min = ≥4 per method). Until the engine sha lands, copy the worked examples below and keep to the rules; then run the validator to 0 errors.

### P6a WORLD seed (`type":"wc"`) = cause × scope × reaction
The window itself (its real cause, length, effects on everyone through the gates) is the existing kind; the seed adds ONE composed reaction scene: when a real window of kind `k` opens, the engine draws one fitting seed (P0 family `wc:<k>`, fresh-first, never twice in one life), casts its people from the live roster, lets every NPC in the seed's SCOPE choose one of the same 4 stances (mindPick by the stance's `npc` tag — law 1 two-way: they get the same step effects), and shows her the scene as a second CENTER card of that window (after the kind's own card; one per player). The end card adds who chose what.
```
{"id":"wc-hoa-001","type":"wc","k":"hoa","tag":"K|D","src":"…","tone":"tense|cruel|sad|petty|funny|tender|warm","tier":"s|m|l",
 "sub":["storm"],                                   // optional: only for these real causes of the kind (table below); omit = any cause of k
 "scope":"all|house|hi|lo|near|kids|srv",           // who in the palace is hit / reacts (table below)
 "roles":{"A":{"kind":"rv","nết":[any-of],"lòng":[any-of]},"B":{…}},     // optional; A (and B) are real people IN the scope; B never = A
 "news":"one sentence: how the real cause reaches her ears (no new fact beyond the cause), {X} = the window's person",
 "text":"2–3 sentences: the scene at the place where she stands now, uses {A} {B} {X} {O} {M} {S}",
 "object":{"name":"…","owner":"A|B|X|me|kho","clue":"…","trace":"…"} | null,
 "stances":{"<id>":{"text":"label ≤ 8 words","npc":"help|harm|social|bribe|flee|art|pray|court|scheme","gain":{…},"loss":{…},"trace":"…(optional)"}, … exactly 4 …},
 "outcomes":{"<same 4 ids>":"what really happens to her after that choice (1–2 sentences)"},
 "needs":{"rank_min":n,"rank_max":n,"month":[…],"not_confined":true,"kids_min":n}}   // all optional
```
- **k / sub** (sub = the REAL cause tag the engine reads from the window; a seed whose `sub` does not match is never used): `tang` th|queen|heir · `away` te|san|tuan|chinh · `hoa` storm (lightning) | lamp (a cung's own fire spread) · `dis` lut|han · `tho` emp|th · `day` m|f · `hau` phe|lap · `phat` big|small · `cam` vuco|ngoai|giac · every other kind: no sub (omit). `{X}` = the window's own person: hoa the cung that burned · day the mother · lap the Thái tử's mother · hon the princess's mother · hau the new Hoàng hậu · tuyen one newcomer · other kinds have NO {X} (validator rejects {X} there).
- **scope** (real, checked on the live world; the NPC round runs over exactly these people, capped by BAL.wc.npcMax): `all` every living consort · `house` the window's person {X} and her cung (only kinds with {X}; if {X} is she herself the seed is skipped) · `hi` consorts at or above BAL.wc.rankHi · `lo` below it · `near` consorts at the window's place now · `kids` mothers of a living child · `srv` the servants (her cung nữ + NPC servants; NPC round over the servants of the consorts, stats: their loyalty). A and B are cast INSIDE the scope (house: A = {X} if A is given).
- **roles.kind**: `rv` living consort (not her) · `sv` a servant · `maid` her cung nữ · `emp` · `th` · `doc` thái y · `eun` Tổng quản · `kid` a living child · `man:<rw>` (sứ thần|họa sư|nhạc sư|thái y). nết/lòng (any-of, AND-ed; BAL.net.F/M names) only for rv/sv. Never a named historical person (law 6b: only real roster people).
- **gain/loss keys** (STEP counts; one step = `BAL.wc.fx[tier][key]`, never a typed number): her stats `sung danh bac suc mat th hh duc tamco an` (`an` gain only) · `rel.A` / `rel.B` (that real person's thiện cảm: up in gain, down in loss; not for emp/th → use sung/th). **Laws 2/3: every stance Σgain == Σloss == tier steps (s 1, m 2, l 3), gain ≥1 and loss ≥1.** NPCs who choose a stance get the same steps on their own stats (sung danh bac suc duc th; rel.A = their thiện cảm with A; mat/hh/tamco/an have no NPC side and are skipped for them). Outcomes are certain (no odds).
- **npc** tag (per stance, required): the mindW tag an NPC weighs that stance by (her nết/mood decide): help · harm · social · bribe · flee · art · pray · court · scheme. Use ≥2 different tags across the 4 stances.
- **object** (law 6c): owner `A|B|X|me|kho`; clue = how she knows it is real; trace = where it is afterwards (a real person/place, never «mất»); a stance may override trace. Kept in S.wc.ob (personal).
- **text placeholders**: `{A} {B}` names · `{X}` the window's person · `{M}` her cung nữ · `{O}` object · `{S}` season. No digits, no %, no odds words, no modern words (VANPHONG law 7). `src` K documented / D drama (law 8). No seed may copy the kind's own card text or its existing scene options.
- Spread: each kind ≥2 different scopes; tones mixed; per writer file ≥30 % of seeds with a real object.

### P6b ROUTE seed (`"type":"route"`) = method × route × tell
A route = HOW a plotter of method `m` prepares (2 tells her people can see, the place they are seen, the price, the time, the risk) + her guard and her cut. At load each seed becomes one more route in `M70[m].R`; every plotter (NPC→her, NPC→NPC, her→NPC, law 1) picks routes exactly as today (price, wit, accomplice) × the P0 weight (family `j70`, key `<m>:<id>`, fresh-first across lives).
```
{"id":"j70c-poison-001","type":"route","m":"poison","tag":"K|D","src":"…",
 "n":"route name ≤ 8 words (what is done)",
 "tl":["tell of step 1","tell of step 2"],          // what her people SEE: third person, no subject, 'nạn nhân' = the target (the engine writes her name / «ngươi»)
 "tlx":["optional extra tell", …],                  // optional 0–4 alternates; each plot draws 2 of tl+tlx (P0 family j70t) → more wordings
 "pl":"tyv|vuon|ksp|nvp|thu|dtd|tn|kn|lc" | null,  // where a tell can be seen; null = nowhere public (only spies/allies)
 "vis":"lo|mid|hi","need":"s|m|l","bac":"0|s|m|l", // tiers → BAL.j70c.vis/need/bac (law 4)
 "acc":"tsv" | null,                                // tsv = buys a servant of the target (only if the target has servants)
 "win":0|1,                                         // 1 = the bạc buys a person's word and is paid only on success (as today)
 "obj":{"name":"…","from":"…","trace":"…"} | null, // the real thing used (law 6c): where it is bought/taken, where it ends (the evidence)
 "gd":"her guard ≤ 10 words","st":"her cut ≤ 10 words","opp":[subset of the method's opportunities]}   // opp optional
```
- **methods** (m, its existing act; opp list in brackets): poison [fest ill night] · poison2 [ill lonely night] · musk [preg ill night] · catswap [birth] · kpoison [ill fest night] · pond [fest rain] · pushp [rain fest night] · kframe [lonely night fest] · frame [lonely night fest] · plant [night fest] · bribe [night lonely] · block [night lonely] · rumor [fest lonely night] · accuse [lonely night] · ksab [night] · joint [lonely night] · huydung [fest night lonely]. A route must fit its act (musk = harm to a pregnancy; kpoison/pond/kframe/ksab = her CHILD; catswap = at birth; joint = a faction together).
- **Law 2 (equal-value routes):** cost points vis lo0/mid1/hi2 + need s0/m1/l2 + bac 0:0/s0/m1/l2 + acc tsv 1 must be **2 or 3** (cheap and fast ⇒ easy to see, hidden ⇒ slow or dear). Law 3: every route has a real chance to work AND a real tell (2 tells, never empty).
- **Text**: tells 6–20 words, cổ trang, concrete (a real act at a real place with a real object), never name a person (only «nạn nhân», «một cung nữ», «thái y nọ»…), never a decision. gd/st are HER options (what she does), ≤ 10 words. No digits/%/odds words (law 7). No route may copy one of the 51 old routes (validator compares names/tells).

Worked examples (valid; copy the shape):
```
{"id":"wc-hoa-001","type":"wc","k":"hoa","tag":"D","src":"drama: cháy cung, người bị cháy mất đồ đi mượn khắp nơi","tone":"tense","tier":"m","sub":["storm","lamp"],"scope":"house","roles":{"A":{"kind":"rv"}},"news":"Gió đổi chiều cả đêm, khói từ cung {X} còn bay sang tận hiên nhà ngươi.","text":"{A} đứng trước cửa cung cháy sém, ôm chiếc {O} còn ám khói. Cung nhân bên ấy đi mượn chăn đệm từng nhà.","object":{"name":"rương gấm đựng y phục","owner":"A","clue":"dấu ấn Nội vụ phủ trên nắp rương","trace":"vẫn ở chỗ ở tạm của {A}"},"stances":{"cho":{"text":"Cho mượn chăn đệm, y phục","npc":"help","gain":{"rel.A":2},"loss":{"bac":1,"suc":1}},"chua":{"text":"Mời nàng tạm ở cung mình","npc":"social","gain":{"rel.A":1,"duc":1},"loss":{"suc":1,"mat":1}},"tau":{"text":"Tâu xin Nội vụ phủ cấp đồ","npc":"court","gain":{"danh":1,"rel.A":1},"loss":{"hh":1,"bac":1}},"tranh":{"text":"Đóng cửa, giữ đồ của mình","npc":"flee","gain":{"bac":1,"suc":1},"loss":{"rel.A":1,"danh":1}}},"outcomes":{"cho":"{A} nhận đồ, mắt đỏ hoe, ghi ơn ngươi.","chua":"{A} dọn sang ở nhờ mấy tuần, hai cung qua lại thân hơn.","tau":"Nội vụ phủ cấp đồ mới, cả cung khen ngươi biết lo việc chung.","tranh":"Cung nhân bàn tán ngươi đóng cửa lúc người ta hoạn nạn."},"needs":{}}
{"id":"wc-dis-001","type":"wc","k":"dis","tag":"K","src":"documented: hậu phi bớt ăn mặc, quyên trâm vòng khi mất mùa","tone":"sad","tier":"s","sub":["lut","han"],"scope":"hi","roles":{"A":{"kind":"rv","nết":["Kiêu ngạo","Nhiều chuyện"]}},"news":"Tin dân đói từ ngoài thành vào tới hậu cung, ai cũng nói nhỏ lại.","text":"Ở buổi thỉnh an, {A} tháo chiếc {O} đặt lên khay, nói là góp cứu đói, mắt liếc xem ai làm theo.","object":{"name":"vòng ngọc phỉ thúy","owner":"A","clue":"chiếc vòng ai cũng từng thấy trên tay {A}","trace":"Nội vụ phủ đem bán lấy lúa"},"stances":{"gop":{"text":"Tháo trâm góp theo","npc":"help","gain":{"danh":1},"loss":{"bac":1}},"khen":{"text":"Khen {A} trước mọi người","npc":"social","gain":{"rel.A":1},"loss":{"mat":1}},"cuoi":{"text":"Cười nhạt, bảo là làm màu","npc":"harm","gain":{"tamco":1},"loss":{"rel.A":1}},"lui":{"text":"Cúi đầu, lặng lẽ lui","npc":"flee","gain":{"suc":1},"loss":{"danh":1}}},"outcomes":{"gop":"Chiếc trâm của ngươi nằm cạnh vòng ngọc trên khay.","khen":"{A} hài lòng ra mặt, nhìn ngươi bằng con mắt khác.","cuoi":"Mấy người che miệng cười; {A} nhớ mặt ngươi.","lui":"Ngươi về sớm; sau lưng có tiếng xì xào."},"needs":{}}
{"id":"j70c-poison-001","type":"route","m":"poison","tag":"D","src":"drama: độc giấu trong bánh ngọt tặng dịp lễ","n":"Tẩm độc vào hộp bánh dâng biếu","tl":["đặt làm một hộp bánh hoa quế ở tiệm ngoài cửa cung","hộp bánh ấy được cất riêng, không cho ai đụng tới"],"tlx":["sai người hỏi xem nạn nhân thích loại bánh nào"],"pl":null,"vis":"mid","need":"m","bac":"s","acc":null,"win":0,"obj":{"name":"hộp bánh hoa quế","from":"tiệm bánh ngoài cửa Tây","trace":"bánh thừa giữ lại làm tang vật"},"gd":"Mọi món biếu đều cho chó nếm trước","st":"Tráo hộp bánh trên đường mang sang","opp":["fest","night"]}
{"id":"j70c-rumor-001","type":"route","m":"rumor","tag":"D","src":"drama: tin đồn qua thầy bói ngoài chợ","n":"Mượn miệng thầy bói ngoài chợ","tl":["cho người ra chợ gặp một thầy bói mù","cung nữ các cung kháo nhau một quẻ xăm về nạn nhân"],"pl":null,"vis":"hi","need":"s","bac":"s","acc":null,"win":1,"obj":{"name":"tờ quẻ xăm","from":"sạp thầy bói chợ Đông","trace":"tờ quẻ chuyền tay rồi nằm ở Kính sự phòng"},"gd":"Cấm cung nhân bàn chuyện quẻ xăm","st":"Tìm thầy bói, bắt khai ai trả bạc"}
```
- ENGINE READY review/thin-p6 **517b4a4d** (+ validator fix 'ván'): `dev/build/jworldc.js` (every real window of kind k draws one fitting seed, P0 `wc:<k>` fresh-first, once per life; cast inside the scope; NPC round on the same 4 stances by mindPick, same steps; her card after the kind's card; end text says who chose what; object trace S.wc.ob), `dev/build/j70c.js` (loaded right after j70.js: each route seed → one more M70[m].R entry with BAL.j70c tiers; pickRoute70 fresh-first across lives over old 51 + composed (P0 `j70`); tell pairs from tl+tlx per plot (P0 `j70t`); real object recorded + its trace told when the plot is carried out; j70Count still 51, `j70cCount()` for composed), `BAL.wc` / `BAL.j70c` (jbal2.js), builders `python3 dev/build/jwsd_build.py` / `j70sd_build.py`, validators `python3 dev/test/wseeds_validate.py [files] --min --kinds …` / `j70seeds_validate.py [files] --min --meths …`, fixtures `dev/test/wc-fixture.jsonl` (6) / `j70c-fixture.jsonl` (4), `node dev/test/wc-play.js [file]` ALL PASS (6 seeds: real window opened per kind/sub, drawn, P0 mark, people alive/in scope/nết, NPC round ≤ npcMax, card after the kind card, numbers = steps × BAL.wc.fx on the real chooseM path, object trace, end text, rests for the life) · `node dev/test/j70c-play.js [file]` ALL PASS (4 routes: registers with BAL tiers, NPC→her and her→NPC plots on the route (j95 motive gate forced off in the test only), own tells + target named, P0 marks j70 + j70t, object recorded + trace told on execution (NPC→her goes through jptime's timed deed: j70c is inner to it), pickRoute70 ok, old count 51). undef-scan PASS (298).
- First validator run on the writer files (01:4xZ): wseeds_b 51 seeds **1 error** (wc-thi-002.mua 'bac' on both sides) · j70seeds_a+b 78 routes **3 errors** (j70c-pushp-004 tell 1 ≈ old «gặp riêng cung nữ sắc thuốc của nạn nhân»; j70c-rumor-002 win:1 needs bac s|m|l; j70c-huydung-004 n ≈ old «mua cung nữ cài đồ»). wseeds_a not yet landed.

## ENGINE P6
- 01:3xZ 24/11 ENGINE #4 (opus, session_01N1tNP5RyEw6T1AADGb6c75). START_CTX ~3 % (used_tokens reads 0 → own estimate; roll at ~28 %, ceiling 60 %). Branch review/thin-p6 from thin-p0-r1 a76ba1e4 (thin-p2/p3/p4 not merged). «## API P6» published; engines + validators next (sha here when ready).

## P6-SEEDS-D
DONE (this commit) j70seeds_b.md 38 routes: frame 5 plant 5 bribe 4 block 4 rumor 4 accuse 4 ksab 4 joint 4 huydung 4 (36 with real object) validator 0 errors (4c8b34d5)

## P6-SEEDS-C
- DONE 9a55dcf6 40 routes (poison 5, poison2 5, musk 5, catswap 5, kpoison 5, pond 5, pushp 5, kframe 5; 40/40 with object) validator pending (own cost-point/word/banned-word check passed)
- DONE 3c105486 validator 0 errors (40 routes, 5 per method)

## P6-SEEDS-B
- DONE c3e1d23 wseeds_b.md: 51 seeds = 3 per kind x 17 kinds (day lap hau thb thi vuong ret trung vuco cam trom phong hon ngoai phat benh tinh); 36 with object, tiers s17 m25 l9, tag D35 K16; self-check (stance sums, words, placeholders, scopes) 0 errors; validator pending (not on remote yet).

## P6-SEEDS-A
DONE 82e8aa4e wseeds_a.md 40 seeds: tang 4 away 4 tuyen 4 hoa 4 dis 4 dich 4 su 4 tho 4 sao 4 xa 4 (25 with real object; K 10 / D 30; tiers s/m/l mixed) validator pending (own check: sums, no digits/odds/modern words, >=2 scopes per kind)

## REVIEW thin-p1 r1 (sonnet, BIG checklist; session_01N1tNP5XaLHAQvcsGkVxdj6) — PASS 087e886c
PRIORITY #1 CHECK ('no-repeat|e68h|mgskin|thin-'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reviewed what exists; nothing rebuilt.
Scope as re-scoped by Foreman B: review/thin-p1c 60c49722 = ALL 39 kinds (includes thin-p1 b43fe174, thin-p1b, kit-mgskin). Result branch **review/thin-p1-r1 @ 087e886c** = thin-p1c + my fix + newest origin/main 2a80712b ⊇ thin-p0-r1 PASS a76ba1e4 ⊇ thin-p0 00b3a4ec. Rebuilt with build_site.sh (assemble.py list = jnorep, jmgpool, jmgpool_b, jmgpool_c, jkitsel; KIT.md both sections kept).
**FIX (1, mine):** tho (calligraphy) had 108 items in total but only 12 at n=5 strokes (24 at n=2 / n=4) — the Khó tier draws its glyphs by stroke count, so high ranks would repeat after ~3 games (law: ≥40 per test type, and le/td_cong were already checked per size/slot). Added 12 real Hán-Việt glyphs (Đinh Bốc Thất · Tỉnh Phong Thủy Hỏa · Chính Sinh Bản Ngọc Điền; strokes drawn and looked at) → tho n=2 42 · n=3 48 · n=4 48 · n=5 42 (all ≥ BAL.mgp.min); new check in dev/test/mg-pool.js (per stroke-count tier). Nothing else changed in game code.
**LAWS touched:** 4 ONE CORE ✓ (counts from BAL.mgp / mgpb / mgpc; one-core-guard 0 fails) · 5 harder as she climbs ✓ (rules/sizes/tier tables untouched; mg-craft law-5 bots kim/ve/hoa/td_cong lower at ease 0 than 5 ✓) · 7 cổ trang ✓ (pool tests scan every player-visible string: no digits/%; names Hán-Việt; dishes/songs read right in shots) · 9 KIT FIRST ✓ (no frame/chip/button added; boards stay in kg82 frame; skin slot = kit-mgskin, already PASS) · 6c objects ✓ (banh only CDN-painted ingredients, le only real altar pieces) · 2/3 n/a (no choice cards) · co-op: pools personal (ctm-nr per phone, never synced; P0-r1 guest guard inside).
**TESTS on 087e886c:** mg-pool / mg-pool-b / mg-pool-c ALL PASS · mg-pool-play 10/10 · mg-pool-b-play 13 ok · mg-pool-c-play 5 ok (no FAIL) · mg-allkinds 13/13 · kit-mgskin ALL PASS · norep-unit ALL PASS · norep-oldsave (3 old saves vs LIVE) ALL PASS · undef-scan PASS (299) · one-core-guard PASS · mg-craft 25/25 incl. law-5 (first full run showed 2 FAIL «canvas:false» kim/ve playArt under machine load; isolated rerun 0 FAIL) · QUICKCHECK PASS on 5a9bc9de (= this tree before the last main merge, docs-only delta: same shell hash affe8f2e): open 1746 ms, old save ok, perf median of 5 new/live render 240/251, tab 399/381, buổi 1258/1217 ms, tasks>200ms 21/22, core gates PASS (a first 3-run quickcheck failed buổi 3040 vs 1138 = noise while other jobs ran; 5-run on an idle box passes). coop-e2e not re-run by me (no shared/co-op file touched by P1; P1c worker ran 141/141 on 60c49722).
**SHOTS (Fold 755x1000@2 + iPad 1180x820@2, 3 items per kind, scratch, not in git, LOOKED 3×):** all 9 kinds of P1 in the real kit frame (hat hoa banh huong ve kim tho le td_cong) + the 14 pooled kinds of P1b/P1c (dan co dauho theu mua doi doden tc xa thq nghe td_hanh kinh may) as boards: every item differs from the next, no empty/cut/overflow board. Known: kim looks the same until the sample is peeked (unit-tested); dauho/ban items differ only by throw sheet (not visible at rest).
**Not done / for MAIN:** skins are wired but no skin registered (Foreman C keys not delivered; falls back to today's art); 15 kinds have no pool by measured reason (ban chai hoadien co7 + 11 in P1c table) — accepted by the lanes, not mine to re-open.
**VERDICT: PASS 087e886c** — LAND AFTER thin-p0 (thin-p0-r1 a76ba1e4 already inside) and kit-mgskin 1b91ac14 (inside via p1c).

P6-SEEDS-A validator fix: DONE (see commit below) wseeds_a.md 40 seeds, 4 per kind, validator 0 errors
**FOLLOW-UP on 087e886c (scope-change list):** (b) coop-e2e run TWICE on review/thin-p1-r1: 141/141 and 141/141, both seats, 0 FAIL (the earlier 138/141 did not reproduce). (c) «no pool» reasons spot-checked: mac threshold really comes from the maid (jsgame sgThr: loyal + temper by name), td_ngon 44 boards ≥40, timing-only kinds (thoico tat ne) have no content list, thu_* / tuoi are drawn on HER pet/plant; reasons accepted. (d) BAL.mgp / mgpb / mgpc: one-core-guard 0 fails.
- DONE 9a0ef37 wseeds_b.md 51 seeds (3 x 17 kinds) validator 0 errors, 0 warnings (fixed wc-thi-002 mua).
**CO-OP LAND GATE (thin-p1 r1, 087e886c): coop-e2e 141/141 + 141/141 (host Fold) + 141/141 with COOP_SWAP=1 (iPad hosts) = both seat orders, 0 FAIL; no-pool check ok.**


## P7-SEEDS-A
DONE b6d494b0 fseeds_a.md 117 rows: stage 49 (C 28 / W 5 / G 5 / B 2 / P 4 / R 5; 7 per fest, ≥4 C each) comp 40 (28 own = 4 per fest + 12 shared fc-xa-c01..12) prize 28 (4 per fest) validator pending (fseeds_validate.py not yet on review/thin-p6; own script check of sums, words, placeholders 0 errors)

## P7-SEEDS-B
DONE e37958f8 fseeds_b.md 103 rows: stages 42 (6 per festival: C 4 + non-C 2; trungthu vantho trungcuu thanhtho dongchi lapbat giaothua), own comps 28 (4 per festival), prizes 21 (3 per festival; 15 with IT key), shared comps fc-xb-c01..c12 (12); self-check passed (step sums, banned words, labels <= 8 words, placeholders) validator pending (not on review/thin-p6 yet)
DONE e37958f8 validator 0 errors 0 warnings (103 rows; stages 42, comps 40, prizes 21; ~208 composed variants per festival; engine 71fe6b05)
DONE b6d494b0 fseeds_a.md 117 rows: stage 49 (C 28 / W 5 / G 5 / B 2 / P 4 / R 5; 7 per fest, ≥4 C each) comp 40 (28 own = 4 per fest + 12 shared fc-xa-c01..12) prize 28 (4 per fest) validator 0 errors (71fe6b05; fixes in next commit)

## ENGINE P6
- 01:3xZ 24/11 ENGINE #4 (opus, session_01N1tNP5RyEw6T1AADGb6c75). START_CTX ~3 % (used_tokens reads 0 → own estimate; roll at ~28 %, ceiling 60 %). Branch review/thin-p6 from thin-p0-r1 a76ba1e4 (thin-p2/p3/p4 not merged). «## API P6» published; engines + validators next (sha here when ready).

## P6-SEEDS-D
DONE 8eda1fbb j70seeds_b.md 38 routes: frame 5 plant 5 bribe 4 block 4 rumor 4 accuse 4 ksab 4 joint 4 huydung 4 (36 with real object) validator pending (own script: cost 2-3, tell length, no digits/odds words all pass)

## P6-SEEDS-C
- DONE 9a55dcf6 40 routes (poison 5, poison2 5, musk 5, catswap 5, kpoison 5, pond 5, pushp 5, kframe 5; 40/40 with object) validator pending (own cost-point/word/banned-word check passed)
- DONE 3c105486 validator 0 errors (40 routes, 5 per method)

## P6-SEEDS-B
- DONE c3e1d23 wseeds_b.md: 51 seeds = 3 per kind x 17 kinds (day lap hau thb thi vuong ret trung vuco cam trom phong hon ngoai phat benh tinh); 36 with object, tiers s17 m25 l9, tag D35 K16; self-check (stance sums, words, placeholders, scopes) 0 errors; validator pending (not on remote yet).

## P6-SEEDS-A
DONE 82e8aa4e wseeds_a.md 40 seeds: tang 4 away 4 tuyen 4 hoa 4 dis 4 dich 4 su 4 tho 4 sao 4 xa 4 (25 with real object; K 10 / D 30; tiers s/m/l mixed) validator pending (own check: sums, no digits/odds/modern words, >=2 scopes per kind)

## API P8
PRIORITY #1 CHECK ('thin-p6 P8 origin'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reuse: dev/build/jroad.js (rdDef / ROAD14 / rdCast / rdK·RDW / rdFx) + j67 runtime (ARC67 arcs, hồi, odds, Lợi thế, endings, ctm-arcs avoid-last-10, chNext67, NPC roads jnroad read the same data) + P0 jnorep (on main). A new road = ONE new j67 premise arc (o:<origin>, joins the origin's pool → rolled like the old 4, ctm-arcs kept) + chapters .5–.11 registered through rdDef whose hồi are COMPOSED per life from the origin's part pools.
ENGINE #5 (opus, session_01N1tNP5qWqSsV3KaU6QDK33) on **review/thin-p8** (from LIVE main 4a8c627b). Engine `dev/build/jroadc.js`, data `dev/build/jrdcsd.js` (built by `python3 dev/build/jrdcsd_build.py`, reads every writer file), numbers `BAL.road.c` (jbalroad.js, law 4). Validator `python3 dev/test/rdseeds_validate.py [files…] [--min] [--origins tt,dtq]`; fixture `dev/test/rdc-fixture.jsonl`; play test `node dev/test/rdc-play.js [file]` (walks a whole composed road .4→.11 in a fresh 14-chapter life). Engine sha in «## ENGINE P8» when ready; write now from this schema.
**WRITER FILES** (builder/validator read every `dev/handover/content/thin/rdseeds_*.md`; one JSON object per line; lines not starting with `{` are ignored; ids unique across files). Suggested split (Foreman B decides): `rdseeds_a.md` = **tt dtq thd** · `rdseeds_b.md` = **muoi cn cnv** · `rdseeds_c.md` = **td ch** · `rdseeds_d.md` = **nc bd pf** (bd = the BA TƯ princess now, Sasanian Persia, reports/foreign-princess-3-history.md; pf = Phù Tang, Tang-like era, no Wokou word; nc = Cao Ly).
**Per origin (--min):** 4 `prem` rows (4 NEW roads) + pools: ≥14 `open` (≥7 that can follow a won chapter: after `win`|`*`, ≥7 that can follow a middle/lost one: after `lose`|`*`) · ≥16 `comp` · ≥8 `turn` · `clim` ≥5 band `a` (chapters .5–.7) + ≥5 band `b` (.8–.10) + ≥4 band `f` (.11 finale; tag each f row to ONE of your 4 premises with `rd`, so each road has its own finale). The 4 roads of an origin share the pools; one road never shows the same part twice; across lives parts are drawn fresh-first (P0 family `rdc:<origin>`).
**How a chapter is composed** (engine): per chapter n = 5…11: 2 openings (one after-win, one after-lose; only the one fitting the real previous ending is played, j67 RDW), 2 comps (1–2 shown, j67 rule), 1 turn (shown ~2 times in 3, j67 rule), 1 clim of the band of n (its `title`/`g`/`sj` are the chapter's title/goal/subject, its `E` the chapter's 3 endings). The cast ({v}, {v2}) is cast once and carried through the road (rdCast).
Two row types + the premise:
```
{"id":"rc-tt-o01","type":"open|comp|turn","o":"tt","after":"win|lose|*" (open only),"tag":"K|D","src":"…","h":"hồi title ≤ 8 words","w":"<speaker>","need":["v",…] (optional),"t":"≤ 3 sentences","opts":[4 options]}
{"id":"rc-tt-x01","type":"clim","o":"tt","band":"a|b|f","rd":["tt_<premise>"] (f: required, a/b: optional),"tag","src","title":"chapter title ≤ 8 words","g":"chapter goal 1–2 sentences","sj":"subject phrase (≤ 6 words, e.g. «môn sinh của phủ Tể tướng»)","h","w","need","t","opts":[4 climax options],"E":{"win":{…},"mid":{…},"lose":{…}}}
{"id":"tt_<word>","type":"prem","o":"tt","tag","src","title","g","sj","w","cast":{"v":{"nết":[any-of]}} (optional),"s":[2 hồi],"c":[3 hồi],"t":[1 hồi],"x":[1 climax hồi],"E":{"win","mid","lose"}}   // premise hồi = {"h","w","need","t","opts"} (no id/type)
option   = {"n":"label ≤ 8 words","gain":{…},"loss":{…},"rt":"what happens (1 sentence)","wx":"gain words ≤ 8 (optional)","lx":"cost words ≤ 8 (optional)"}
climax option = the same + "stat":"danh|sung|tamco|duc|mat|th|hh" (the stat that carries the roll) + "risk":"hi|lo" + "rf":"what happens when it fails"
ending   = {"tag":"≤ 6 words","t":"1–2 sentences","fx":{steps}}
```
- **Laws 2/3 (equal value, steps; one step = `BAL.road.c.fx[key]`, never a typed number):** every option of every hồi: Σgain steps == Σloss steps == `BAL.road.c.st` (2), gain ≥1 and loss ≥1. gain/loss keys: her stats `sung danh bac suc mat th hh duc tamco` · `sc` (Lợi thế, gain only: +1 point for this chapter's climax odds) · `rel.v` / `rel.v2` (that real consort's liking for her: up in gain, down in loss; only in a hồi whose text uses that role). Certain options (no odds) in open/comp/turn and the premise s/c/t: loss = paid at once, gain = given at once.
- **Climax (law 2 + law 5):** exactly 4 options, 2 with `risk:"hi"` (win or LOSE) and 2 with `risk:"lo"` (win or MIDDLE; lower odds); ≥3 different `stat`s among the 4 (she plays to her strength). Odds = `BAL.road.c.xo[risk][band]` (lower each band: harder as she climbs) + her `stat` (BAL.road.c.xs) + Lợi thế (j67, ×7 per point), shown in odds WORDS only. Loss steps are paid when she picks; gain steps come on success. Endings: `win` gain-only Σ = `BAL.road.c.Est.win` (3) · `lose` loss-only Σ = 3 · `mid` exactly 1 gain + 1 loss step (one step of an ending = `BAL.road.c.Efx[key]`). rel.v allowed in E when the chapter uses {v}.
- **speaker `w` / `need`:** w ∈ `v v2 hh th emp maid me dad man eun doc kid dau mis foe`; need ⊆ `v v2 hh th srv nsrv kid dau man mis` (a hồi whose need is false is skipped; a text with {v}/{v2} needs that role — the engine adds it). Keep at least half of each pool free of `need` so every life can compose.
- **text placeholders** (j67 TOK67, filled by the engine): all origins `{v} {v2} {hh} {me} {maid} {man} {manr} {eun} {k} {d} {emp} {sj} {N} {Nc} {tx} {Tx} {tg} {Tg} {tsv} {goi} {Goi} {xung} {Xung}` · tt/dtq `{dad} {dadr}` · td `{foe} {foed}` · cn/cnv `{mis}` · nc/bd/pf `{land} {pv} {mh} {quan} {pa} {pb} {canh} {laq} {nden} {kha} {dien} {huong}`. Anything else (incl. `{n1}`/`{n2}`) is rejected.
- **Content rules:** cổ trang (VANPHONG law 7), no digits, no %, no odds words, no modern words; addressed to "ngươi"; no named real or historical person (people only through tokens; law 6b); a thing that appears really exists and goes somewhere (law 6c: say where in rt); law 1 two-way: what a rival does to her, she can do back in one of the options; `src` = basis (K documented / D drama; law 8 history first); no `h` may copy an old road hồi title (validator compares). Opening texts must not contradict the previous ending: `after:"win"` lines assume she won the chapter before, `lose` that she did not, `*` neither. Premise text must stand alone (it is also played as a plain 3-chapter arc in old frames and by NPC women, jnroad).
Worked examples (valid; copy the shape):
```
{"id":"tt_hon","type":"prem","o":"tt","tag":"D","src":"drama: hôn ước chính trị nhà quyền thần","title":"Hôn sự của em gái","g":"Cha muốn gả em gái ngươi cho con một nhà võ tướng để kết vây cánh. Em gái tìm đến ngươi khóc lóc. Một lời của ngươi trong cung có thể đổi cả hôn sự.","sj":"hôn sự của em gái","w":"dad","s":[{"h":"Thư em gái","w":"dad","t":"Em gái ngươi viết thư vào cung: {dad} đã nhận sính lễ của nhà võ tướng mà không hỏi ý nàng.","opts":[{"n":"Viết thư khuyên cha nghĩ lại","gain":{"duc":2},"loss":{"th":1,"bac":1},"rt":"Thư của ngươi đến phủ, cha im lặng mấy ngày."},{"n":"Khuyên em gái thuận theo","gain":{"danh":1,"sc":1},"loss":{"duc":2},"rt":"Em gái hồi thư, nét chữ nhòe nước mắt."},{"n":"Gửi bạc riêng cho em gái","gain":{"duc":1,"tamco":1},"loss":{"bac":2},"rt":"Bạc đến tay em gái, nàng cất trong hòm của hồi môn."},{"n":"Im lặng chờ xem","gain":{"tamco":2},"loss":{"duc":1,"danh":1},"rt":"Ngươi cất thư vào hộp, không hồi âm."}]},{"h":"Sính lễ vào phủ","w":"dad","t":"Nhà võ tướng đưa sính lễ vào phủ {dadr}, cả kinh thành bàn tán.","opts":[{"n":"Gửi quà mừng hai nhà","gain":{"danh":2},"loss":{"bac":2},"rt":"Quà của ngươi được bày giữa sảnh nhà võ tướng."},{"n":"Hỏi Hoàng thượng về nhà võ tướng","gain":{"sung":1,"sc":1},"loss":{"tamco":1,"th":1},"rt":"Hoàng thượng kể nhà ấy giữ ải bắc ba đời."},{"n":"Nhờ người dò nết chàng rể","gain":{"sc":1,"mat":1},"loss":{"bac":1,"duc":1},"rt":"Người của ngươi mang tin về: chàng rể ít nói, giỏi cung."},{"n":"Đứng ngoài chuyện nhà","gain":{"suc":2},"loss":{"danh":1,"duc":1},"rt":"Ngươi giữ mình, để cha tự lo."}]}],"c":[…3 hồi…],"t":[…1 hồi…],"x":[{"h":"Ngày đưa dâu","w":"dad","t":"…","opts":[4 climax options]}],"E":{"win":{"tag":"Em gái tự chọn chồng","t":"…","fx":{"danh":2,"duc":1}},"mid":{"tag":"Hôn sự vẫn thành","t":"…","fx":{"danh":1,"duc":-1}},"lose":{"tag":"Hai nhà oán ngươi","t":"…","fx":{"danh":2,"th":1}}}}
{"id":"rc-tt-o01","type":"open","o":"tt","after":"win","tag":"D","src":"drama: môn khách cầu cạnh","h":"Môn khách gõ cửa","w":"dad","t":"Từ ngày việc trước êm xuôi, một môn khách của {dad} lén gửi lễ vào cung xin một lời nói giúp.","opts":[{"n":"Nhận lễ, hứa nói giúp","gain":{"bac":2},"loss":{"duc":1,"danh":1},"rt":"Hộp lễ cất vào kho riêng của cung ngươi."},{"n":"Trả lễ nguyên niêm","gain":{"duc":2},"loss":{"bac":1,"sung":1},"rt":"Lễ quay về phủ môn khách, niêm còn nguyên."},{"n":"Thử hắn bằng một việc nhỏ","gain":{"sc":1,"mat":1},"loss":{"suc":2},"rt":"Hắn làm việc gọn gàng, không để lại dấu."},{"n":"Báo cha biết","gain":{"th":1,"tamco":1},"loss":{"danh":2},"rt":"Cha gọi môn khách về phủ quở trách."}]}
{"id":"rc-tt-x01","type":"clim","o":"tt","band":"a","tag":"D","src":"drama: tranh ghế triều","title":"Ghế Thị lang còn trống","g":"Một ghế Thị lang bỏ trống. Ai ngồi vào đó sẽ nghe lời ai, tùy một lời của ngươi.","sj":"ghế Thị lang bộ Hộ","h":"Đêm Hoàng thượng hỏi","w":"emp","t":"Đêm ấy Hoàng thượng như vô tình nhắc ghế Thị lang bộ Hộ còn trống, rồi im lặng chờ ngươi.","opts":[{"n":"Khẽ nhắc tên người của mình","stat":"sung","risk":"hi","gain":{"danh":2},"loss":{"duc":1,"tamco":1},"rt":"Người của ngươi nhận ấn.","rf":"Hoàng thượng thấy ngươi tham quyền."},{"n":"Tâu tên người của cha","stat":"th","risk":"hi","gain":{"th":2},"loss":{"duc":2},"rt":"Môn sinh của cha nhận ấn.","rf":"Hoàng thượng chọn người khác, nhìn ngươi lâu."},{"n":"Tiến cử người tài không phe","stat":"duc","risk":"lo","gain":{"duc":2},"loss":{"bac":1,"danh":1},"rt":"Người ngươi tiến cử được khen.","rf":"Người ấy không được chọn, nhưng không ai trách ngươi."},{"n":"Thưa không dám bàn việc triều","stat":"tamco","risk":"lo","gain":{"tamco":2},"loss":{"sung":1,"danh":1},"rt":"Hoàng thượng gật gù, tự chọn người.","rf":"Ghế về tay người ngoài."}],"E":{"win":{"tag":"Người của ngươi ở bộ Hộ","t":"Từ nay có một người trong triều đi theo ngươi chứ không theo cha.","fx":{"danh":2,"tamco":1}},"mid":{"tag":"Ghế về tay người ngoài","t":"Không ai nợ ngươi, cũng không ai oán ngươi.","fx":{"duc":1,"danh":-1}},"lose":{"tag":"Hoàng thượng nghi phủ Tể tướng","t":"Hoàng thượng bắt đầu nhìn ngươi như nhìn con gái Tể tướng.","fx":{"sung":2,"danh":1}}}}
```
(In E, `fx` lists STEP COUNTS; the sign comes from the ending: win = gain, lose = loss, mid = the key with a minus is the loss. The premise example above is shortened with «…»; a real row has all 2 s + 3 c + 1 t + 1 x.)

## ENGINE P8
- 02:4xZ 24/11 ENGINE #5 (opus, session_01N1tNP5qWqSsV3KaU6QDK33). START_CTX ~4 % (used_tokens reads 0 → own estimate; roll at ~29 %, ceiling 60 %). Branch review/thin-p8 from LIVE main 4a8c627b. «## API P8» published; engine + builder + validator + fixture + play test next (sha here when ready).
- ENGINE pushed review/thin-p8 d92a4c71 → FOLD ce252c43: `dev/build/jroadc.js` (each premise = a j67 arc o:<origin> joining the origin pool; its .5–.11 registered through jroad rdDef with live getters reading the life's composition S.st.f14.rc, composed at life start fresh-first via P0 family `rdc:<origin>`, default fixed composition for NPC roads/scans) + `BAL.road.c` (jbalroad.js) + `jrdcsd.js` (627 rows from rdseeds_a–d: **44 new premises = 4 × 11 origins, 164 openings, 177 complications, 88 turns, 154 climaxes**; every origin 4 → 8 full roads) + `jrdcsd_build.py` + `dev/test/rdseeds_validate.py` (0 errors --min) + `rdc-fixture.jsonl` + `rdc-play.js` + `rdc-oldsave.js` + `rdc-shots.js`. j67.js touched once: the «halve Sức/hh» pass skips composed premises (a.rdc; one core). Fold fix: 4 climax/premise titles held {eun}/{v}/{foe} (titles are shown unfilled) → plain words; validator now rejects a placeholder in a title.
- GATES (ce252c43): fixture `node dev/test/rdc-play.js` ALL PASS (2 lives: .4→.11→14, 42 parts once per road, every option = steps × BAL.road.c (bạc through price67 like every chapter), P0 marks, reload stable) · all 44 real roads: see next line · undef-scan PASS (299) · one-core-guard PASS + one-core-text PASS · `node dev/test/rdc-oldsave.js <LIVE index.html>` ALL PASS (3 LIVE saves tt/cnv/bd on old roads load with road + plan unchanged, no composition added, play a buổi) · coop-e2e 141/141 (S.st.f14.rc is per-player story state) · shots `node dev/test/rdc-shots.js <dir>` Fold 755x1000 + iPad 1180x820 @2: tt_ruong_6 opening, cnv_kho_8 complication, pf_co_11 climax — j67 kit story card, 4 options with kit cost/gain rows, odds words, names filled, LOOKED 3× (pictures blocked in test = grey). Test note: the tutorial chapters 1–3 are fast-forwarded by the bot (the home phase holds them; not P8).
- NO-REPEAT: roads per origin 4 → 8; jst14 deals a premise no recent life played (ctm-arcs last 10) → the same road returns after 8 lives of that origin instead of 4 (EVCAT §2 row 5: «every road seen by kiếp 4–5» → 8–9). Within a road no part repeats; when a road does return, its chapters are re-composed fresh-first (pools are at the minimum, so ~⅓–½ of the parts recur then; more rows per pool = fewer).
- quickcheck ce252c43 **PASS** (open 2249 ms, old save ok, perf new/live render 189/193, tab 512/468, buổi 1048/1835; core gates PASS; time-spill PASS).
- All-roads play test running: `node dev/test/rdc-play.js <cat rdseeds_*.md> 1 <roads>` in 2 shards (≈4 min per road; renderer can run out of memory on long runs → the test opens a new page and retries). So far 7/44 + the 9 of the first run ALL PASS (16 distinct roads walked .4→.14); the 3 placeholder hits of the first run were the titles fixed above.
- **HANDOVER (ENGINE #5, context near START+25 %)**: only the all-roads play test + SẴN SÀNG KIỂM remain. Successor: in a sparse worktree of review/thin-p8 ce252c43: `bash dev/site/build_site.sh`; `cat dev/handover/content/thin/rdseeds_*.md > /tmp/all.jsonl`; run `node dev/test/rdc-play.js /tmp/all.jsonl 1 <comma list of premise ids>` in ≤2 parallel shards (more = out of memory); any FAIL → fix the row in the writer file (copy back to the handover branch too), `python3 dev/test/rdseeds_validate.py --min` 0, `python3 dev/build/jrdcsd_build.py`, rebuild, commit index.html/sw.js/assets.json, re-run that road; then post «SẴN SÀNG KIỂM review/thin-p8 <sha>» here and tell Foreman B. The branch is on LIVE 4a8c627b.

## P8-SEEDS-D
DONE 3943de4e nc: prem 4, open 15, comp 16, turn 8, clim a5/b5/f4 · bd: prem 4, open 14, comp 17, turn 8, clim a5/b5/f4 · pf: prem 4, open 14, comp 16, turn 8, clim a5/b5/f4 — validator 0 errors (rdseeds_validate.py --min --origins nc,bd,pf on review/thin-p8 d92a4c71, 170 rows). File dev/handover/content/thin/rdseeds_d.md. Premises: nc_men nc_kinh nc_nu nc_the · bd_luuly bd_lua bd_bac bd_su · pf_co pf_guong pf_tra pf_lich.

## P8-SEEDS-A
DONE c3a5108c tt: prem 4, open 15 (8 win-ok / 8 lose-ok), comp 16, turn 8, clim a5 b5 f4 · dtq: same counts · thd: same counts (171 rows) validator 0 errors (review/thin-p8 d92a4c71, --min --origins tt,dtq,thd). Premises: tt_ruong tt_gia tt_tho tt_thu · dtq_ngua dtq_hang dtq_thuong dtq_ky · thd_dich thd_dien thd_uoc thd_giay.

## P8-SEEDS-C
DONE be416354 td: prem 4 · open 14 (w8/l8) · comp 16 · turn 8 · clim a5/b5/f4 | ch: prem 4 · open 14 (w8/l8) · comp 16 · turn 8 · clim a5/b5/f4 — validator 0 errors (rdseeds_validate.py --min --origins td,ch on review/thin-p8 d92a4c71). Notes: ch climaxes carry no need (Thái hậu not required: a/b clims avoid her, f clims tied to ch premises mention her); ch premise/pool hồi that mention Thái hậu/cô mẫu carry need ["th"] (6/14 open, 2/16 comp, 2/8 turn).

## P8-SEEDS-B
PRIORITY #1 CHECK ('thin-p6 P8 origin'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reused «## API P8» schema + review/thin-p8 validator.
DONE c7b6499b muoi: prem 4 · open 16 (9 win-capable / 9 lose-capable) · comp 16 · turn 8 · clim a5/b5/f4 | cn: same counts | cnv: same counts (174 rows) validator 0 errors (`python3 dev/test/rdseeds_validate.py dev/handover/content/thin/rdseeds_b.md --min --origins muoi,cn,cnv` on review/thin-p8 d92a4c71, 0 warnings). rdc-play.js on the file not finished in my 120 s window (left to ENGINE #5).
Notes for the engine/reviewer: all premise ids new (muoi_gia/tien/thi/hoi, cn_chuoi/tiec/chuviet/theo, cnv_kho/thu/hach/tieu); each f clim carries rd=its premise; no `sung` in cnv rows; needs auto-added where the text has {v}/{v2}/{mis} (and `th`/`man` on 3 rows); no named person anywhere; every object's destination is stated in rt; climax stat `suc` is not allowed by the validator so those options carry another stat (mat/tamco/duc…).

## REVIEW thin-p3 r1
- 24/11 ~01:05Z start · BIG reviewer-lander (opus) session_01N1tNP4ot5ZwPVzESSYVbWx · START_CTX ~4 % (used_tokens reads 0 → own estimate), depth 3. PRIORITY #1 CHECK ('no-repeat|e68h|thin-|j72|việc nhờ'): OD 8 | ledger 0 | claims 8 | main 15 | review/* 10 | archive 0 — reuse: the whole j72 runtime, jnorep (P0), writer files A/B; nothing rebuilt.
- Reviewed review/thin-p3 @a2242d97. Fixes on **review/thin-p3-r1** (merged thin-p0-r1 a76ba1e4, then newest origin/main bba42773 → 4a8c627b incl. landed thin-p0 + thin-p2). Folded j72seeds_a.md 3a83f629 (63 craft + 64 social) + j72seeds_b.md fbf5d052 (63 court + 66 fam) = **256 seeds** → j72sd.js (seed files committed under dev/handover/content/thin/ on the branch).
- FINDINGS + FIXES (whole groups, scan before/after):
  | # | Finding | Law | Before | After / fix |
  |---|---|---|---|---|
  | 1 | **j72 offers starve** (pre-existing on LIVE, hits P3's whole point): q72Choose uses npwPick (top-3 by weight, stable sort) so equal weights fell back to T72 array order — the same first templates every life, composed seeds (registered last) almost never; 30 unmakeable heads ended the offers; and q72Cands' cut «fresh only when ≥3 fresh» starved later lives once the fresh ones all waited on a state | 6, OD no-repeat | measured (j72c-reach, LIVE main): **60 offers in lives 2–6 of 4000 asked** (≈2 per kiếp) | ties shuffled before npwPick (weight order unchanged; npc-purpose row text updated), fresh-first moved into q72Choose (all fresh tried, then ≤30 seen): **2521/4000** offers (80 asked/kiếp) |
  | 2 | Option/ok/twist **gains nobody could give**: «+bạc» for cutting thread / drying herbs, «+Hoàng hậu / Thái hậu / Hoàng thượng» favour when they are not in the seed nor told | 2, 3, 6 | 164 hits (scan gainscan: 79 bạc, 66 hh, 14 th, 6 sung) | moved to a key the act yields (rel / an / danh / đức / mật; never the option's loss key; same step count) → 0; court-038 ok hh→th (text says Thái hậu) |
  | 3 | rel/relb on **fam / ak** (q72Rel does nothing for them) = gain of nothing / cost of nothing | 3 | 9 seeds | engine j72cNorm: rel on fam/ak = ân tình (same steps) |
  | 4 | **Hand-typed address** «nương nương / tiểu chủ» (wrong for her rank: a servant calls a Quý phi «tiểu chủ»), «tôi / tại hạ», a consort calling her «ngươi», «bạn / cô ấy / ông ấy», «cảm ơn» | 7 (VANPHONG xưng hô, one voice core OD:L1267) | 152 lines (validator said 0) | → {goi}/{Goi}/{xung}/{Xung}, tri kỷ / người quen / nàng / lão, cảm tạ; **validator now FAILs these** (old files: 150 errors; now 0) |
  | 5 | Servant seeds voiced «nô tỳ» could cast a eunuch servant | 6b/7 | 26 sv/rsv seeds | «nô tỳ» seeds cast a maid only (svm / role filter), «nô tài» a eunuch |
  | 6 | q72Bot never walked to an option's place (pick options with `at`) → bots let those favours expire | — | 15 seeds stuck in play | option carries opl, q72Bot walks there |
  | 7 | obKeep 60 typed in j72c | 4 | 1 | BAL.j72c.obKeep |
  | 8 | ENGINE's measure script `j72c-measure.js` never committed (its table cannot be reproduced) | — | — | new `dev/test/j72c-reach.js` (reach + no-repeat, CTM_ROOT for a LIVE before-column) |
- Play test made real: `j72c-play.js` now casts every seed — from the fresh life when it can, else FORCED (wanted nết / need / place / a person the fresh life lacks: lãnh cung consort, adult child, man of a role, month, kids) — and plays it to the end. **ALL PASS 256/256** (≈130 cast from the fresh life, ≈126 forced) + fixture 4/4.
- REACH (8 fresh lives × rank 1–5 × month 1–12): **160/256** made; the other 96 wait for a real state (dtd needs sủng; men met later; adult children; ill / pregnant / feud / festival needs; nết combos not in a fresh roster) — each listed with its reason by the script. Law 6 OK (no seed is unreachable by design).
- NO-REPEAT (10 runs × 6 lives; % of offers in lives 2–6 repeating a template from an earlier life):
  | Pool | LIVE main (110 old, old draw) | r1, 110 old only | r1, 110 old + 256 composed |
  |---|---|---|---|
  | offers made, 80 asked/kiếp | 60/4000 | 1424/4000 | 2521/4000 |
  | repeats, 80/kiếp | 0 % (almost no offers) | 93 % | **57 %** |
  | repeats, 120/kiếp | — | 95 % | **79 %** |
  Reading: once offers really flow, 110 templates repeat almost always; the 256 seeds cut it to about half at 80 offers/kiếp. Full freshness would need ≈6 × offers per kiếp seeds (P3 target was ≥240; more seeds = later lanes).
- Value check (in-page, per template average): old ok = danh .45 · bạc 1.5 · thiện cảm 8.9 · đức .52; composed ok = danh .94 · bạc 1.0 · thiện cảm 3.1 · đức .84 · ân .88, 2.3 steps vs 1.6 → same order of value, more work. Bots: `dev/measure/evbot.js` stalls at turn 2–4 on this build (7 min, 0 lives) — n ≥ 30 kiếp bots NOT run; the reach/no-repeat measure above is the number evidence.
- Spot-read 32 seeds (8 per kind, random) + whole-file scans: cổ trang OK after fixes; every pick option Σgain == Σloss, equal across options (validator); every object has owner + trace_ok/trace_no, traced in S.q72c.ob (law 6c); requesters by nết from the real roster (no named person). Note for writers (not blocking): some option gains are now generic (ân tình / đức) where a sharper consequence would read better.
- GATES on **45339cab** (contains newest origin/main 14ba8768): QUICKCHECK PASS (open 1924 ms · old save ok · perf new/live render 268/285, tab 481/524, buổi 1351/1435 ms, tasks>200ms 20/23) · CORE GATES PASS (an earlier run on bf916996 had one coop-one-world seed-3 FAIL «merge differs» while my play test ran beside it; 3 lone reruns + this full run PASS) · j72c-play ALL PASS 256/256 + fixture 4/4 (one run of 9 had 5 seeds whose offer card threw for one roster consort; not reproduced in 8 reruns — the test now prints page console errors) · j7c-play ALL PASS · validator 0 errors · gainscan 0 · undef-scan PASS (299) · npc-purpose-scan PASS (419 rows) · norep-unit ALL PASS · norep-oldsave ALL PASS vs pre-P0 LIVE bba42773 (vs today's LIVE it no longer applies: LIVE already writes ctm-nr) · **j72c-oldsave ALL PASS** (3 LIVE saves with an open việc nhờ: kept + resolves, composed offered) · **coop-e2e 141/141 both seat orders** (default + COOP_SWAP) — CO-OP GATE PASS (S.q72 / S.q72c personal, not W_KEYS).
- Re-gated after main moved twice: on **122de762** (merged LIVE 24883e24 = thin-p1; assemble keeps jmgpool* + j72sd/j72c, jbal2 keeps BAL.mgp* + BAL.j7c + BAL.j72c): j72c-play 256/256 + fixture ALL PASS · undef PASS · npc-purpose PASS · j72c-oldsave ALL PASS (vs LIVE 24883e24) · coop-e2e 141/141 BOTH seat orders · QUICKCHECK PASS. On **d8555d50** (merged LIVE b7598e72 = map-label, j38.js only, no overlap): QUICKCHECK PASS (open 1924 ms · old save ok · render 276/282, tab 464/513, buổi 1446/1684 ms · core gates PASS).
- **VERDICT (final): PASS d8555d50** (supersedes 45339cab below).
- (earlier) **VERDICT: PASS 45339cab** (review/thin-p3-r1 = review/thin-p3 + 256 seeds + fixes above + thin-p0-r1 + newest main). Land AFTER thin-p0 (already LIVE via thin-p2 — nothing left to wait for).
- Shots (Fold 755x1000@2 + iPad 1180x820@2, LOOKED 3×; CDN, not git): https://ctm-img.victoria-tntt.workers.dev/img/_review/thin-p3/ {fold,ipad}-j72c-court-005-offer.png · {fold,ipad}-j72c-court-005-tab.png · {fold,ipad}-j72c-craft-053-offer.png · {fold,ipad}-j72c-fam-001-offer.png (taken on 7214cd1f before the fam-001 «Con vẽ» word fix). Seen: Hoàng thượng calls her «Ái phi», a Thường tại says «Khổng tần nương nương … tần thiếp» (voice core), ladder words, kit offer card + j72 tab unchanged. Unmet B shows «Quý phi ???» (existing name mask). Wipe with `python3 dev/site/cdn_sync.py --wipe-review thin-p3` after LIVE.
- Later lanes: review/thin-p4 / p6 do NOT contain thin-p3; whoever lands after must keep q72Choose (r1) when merging j72.js.

## REVIEW thin-p4 r1
- 24/11 ~02:00–03:10Z · BIG reviewer-lander (opus) session_01N1tNP2hN7KYuUJiMS5D8RG · START_CTX ~4 % (own estimate), depth 3. PRIORITY #1 CHECK ('thin-p4|j68c|kyc|Kỳ ngộ composed'): OD 0 | ledger 0 | claims 6 | main 0 | review/* 1 | archive 7 — reuse confirmed (j68c registers each seed as ONE more EV6 in the live j68 runtime; jkyc as ONE more KY.DEF + BAL.kyngo.E row; P0 jnorep families `j68` / `ky`; nothing rebuilt).
- Reviewed review/thin-p4 @db47f4af (P4: 460 composed j68 decisions + 152 openers, 9 families; P5: 77 composed Kỳ ngộ, 25 → 102). Result branch **review/thin-p4-r1 @4243006e** = thin-p4 + 5 review commits + LIVE origin/main b7598e72 (thin-p0 + thin-p1 + thin-p2 now LIVE; assemble.py = main's list + j68sd/j68c/jbalkyc/jkysd/jkyc; jbal2.js keeps BAL.j68c AND BAL.j7c + mgp/mgpc/mgpb; j72.js not touched, so thin-p3-r1 q72Choose merges clean).
- FIXES (reviewer, all on seed text / test; no engine code changed):
  | # | Law | Found (scan, whole group) | Fix |
  |---|---|---|---|
  | 1 | 6b real people | 5 visit seeds cast **her own** cung nữ / servant (kind maid/sv) as a servant of ANOTHER palace (visit-011 «thuộc cung bạn ngươi», 027 «đã hầu cung khác», 045 «cung nhân cung bên», 050 «mới đến cung khác», 061 «chủ nàng vừa giấu») — seen live on the Fold shot: «Cung nữ thân tín … Xạ Nguyệt hầu ở cung một người quen…» = her own maid. Scan of all 460 for maid/sv roles + other-palace words → these 5 (visit-010/047, serv-036/039, rumor-019 read right) | A = her cung nữ who reports, B = the real consort of that palace (roster-cast; visit-011 B need poor, 045/050 nết kept); stances rel.A → rel.B where they meant that side; visit-027 stances re-balanced (Σ steps still 2/2) |
  | 2 | 7 cổ trang (VANPHONG §1/§2/§3) | «bạn» ×9 (day-028/053, visit-006/011, serv-049, court-038, rumor-014), «kiểm tra» ×2 (day-059, rumor-034), «điểm» as score ×3 (visit-034, serv-055, kid-010), «lưu» as save ×4 (visit-018, court-014, myst-026), «anh/chị» ×5 (day-023, court-001/036, kid-011), «em» (emp-045), «xử lý» (day-023), «cảm ơn» ×31 across j68+Kỳ ngộ | người quen / tri kỷ, soát rương / tra xét, chỗ / nét / lời khen, nằm / cất / giữ, huynh tỷ / huynh trưởng / tỷ tỷ, ru trẻ, răn dạy, tạ ơn / Đa tạ |
  | 3 | 7 address | kid family calls Hoàng thượng «cha» (kid-004/014/018/032/036/039), kid-022 «cha mẹ đứa trẻ» (the other child's father = the Emperor); Kỳ ngộ de-006 «Thưa mình đến một mình» to the Emperor; vat-009 «nương nương» outside a quote (VP addr() fixes quotes only) | phụ hoàng / mẫu phi; «Tâu, thần thiếp quen đi một mình»; «cho người ngắm trước» |
  | 4 | 6b | kid-003 role B (a real consort) cast but the text said «dì ở cung bên» | text/trace name {B} |
  | 5 | gate | thin-p4-shots.js shot at 1.5 s: iPad card still behind the loading veil (court-036 empty twice) | wait 5 s (SHOT_WAIT) |
  Validators after fixes: j68seeds 460c/152o 0 errors 0 warnings · kyseeds 77 0 errors (18 warnings «text never names {W}» = th/emp scenes that name the person by title, fine). j68sd.js / jkysd.js / jbalkyc.js rebuilt by their builders.
- LAW CHECK (sample: 5 random comps per family read in full = 45 + my scans over all 460; all 77 Kỳ ngộ skimmed):
  | Law | Result |
  |---|---|
  | 1 two-way | OK for this kind: j68 situations come TO her and each has 4 stances that act back (demand back / give / expose / keep); Kỳ ngộ keeps jky's two-way NPC finders (unchanged runtime) |
  | 2 equal value | OK: every j68 stance Σgain = Σloss = tier steps (s1/m2/l3), checked by my own script on all 1840 stances; Kỳ ngộ kyngo-eq PASS (eqTol 1.25, every band) |
  | 3 gain-and-loss | OK: every stance gain ≥1 and loss ≥1; `an` gain-only; Kỳ ngộ plain cards gain-only (time is the cost) |
  | 4 one core | OK: steps × BAL.j68c.fx, Kỳ ngộ numbers in jbalkyc.js (a BAL file); one-core-guard PASS (0 fails). Note: a bạc step goes through c6's own option price (rank-scaled), so «Bạc -10» can show for a 2-step bạc loss — engine note, same rule as every j68 option |
  | 5 harder with rank | n/a (certain outcomes, no trial); Kỳ ngộ rolls keep jky's band/seen odds |
  | 6 real evidence/people/objects | after fix 1/4 OK: every role cast from the live roster by nết/need (grounding drops a seed if anyone is missing; j68c-play forces only nết/need in its one test world); objects carry owner/clue/trace into S.e68c.ob (cap BAL.j68c.obKeep 60 — older traces drop from the log, the object itself was never modelled as an inventory piece; same as P2's S.j7c.ob, not shown in a book yet); Kỳ ngộ lost/dead/rare pieces move through jky's ONE item road (ilTake / lostReturn / ilGone to Đức Thọ cung) |
  | 7 cổ trang | after fix 2/3 OK: digits/% 0, odds words 0, modern list 0 (false hits lưu ly / trang điểm / điểm canh kept) |
  | 8 src | every seed has tag K/D + src |
  | 9 kit | no UI added: cards are the kit «Việc» frame + act-card options (shots) |
- GATES on **4243006e** (own runs): QUICKCHECK PASS (median of 7: open 1761 ms · old save ok · render 245/223 ms, tab 424/416, buổi 1292/1295, tasks>200ms 23/23 · core gates PASS) · mg-pool ALL PASS (LIVE P1 unaffected) · undef-scan PASS (300) · one-core-guard PASS · norep-unit ALL PASS · norep-oldsave ALL PASS on the pre-P0 LIVE build 2a80712b (3 saves + ctm-e68h history; on LIVE 1ddbe155 the test cannot run: that build already writes ctm-nr, no ctm-e68h to migrate — the test's job is done) · **e68Count old 90 / 370 unchanged** (LIVE 90/370) · e68cCount 460 seeds / 5413 wordings · KY.DEF 25 → 102 · j68c-play ALL PASS (460 built, 151 forced) · kyc-play ALL PASS (74 played, 3 skipped: no real rare/dead piece or elder in that one world) · kyngo-eq PASS · kyngo-unit PASS · ky-keeper-f2 PASS · j7c-play ALL PASS (LIVE P2 unaffected) · **CO-OP GATE coop-e2e 141/141 (Fold hosts) + 141/141 (COOP_SWAP=1, iPad hosts)**.
- Quickcheck noise (for MAIN): the perf step is bimodal on this box for BOTH builds (buổi 1.0 s or ~4.2 s; longTaskMax 1.7–5.9 s on LIVE itself). Runs on this branch (same code, after each main merge): FAIL longTaskMax 3363/2044 (other tests running) · FAIL buổi 4143/1168 (3 of 5 runs hit the 4 s mode; LIVE 1 of 5) · PASS (5 runs) · FAIL longTaskMax 3151 vs limit 3133 · PASS (7) · PASS (7, final) — the 4–6 s long task shows on LIVE runs too (5917, 5886 ms). In-page cost of the new content measured directly: e68Cands 0.18 ms (LIVE 0.13), e68Fire 1.2 ms (LIVE 0.7), endTurn 42–89 ms (LIVE 41–811). Composed seeds make e68Fire succeed more often (50/50 vs 30/50 tries in a fresh life) — the j68 cadence still comes from BAL.ag.why.e68.gap, so the count of j68 cards per tuần is capped as before; more tuần have one.
- SHOTS (Fold 755x1000@2 + iPad 1180x820@2, scratch /home/user/wt/r4s/shots + sh2, not uploaded, LOOKED 3×): j68 court-036, emp-045, visit-045 (after fix 1: «Xạ Nguyệt hớt hải bẩm: cung nhân của Hoàng hậu … đến đòi…»); Kỳ ngộ de-006 (Hoàng thượng, «Tâu, thần thiếp quen đi một mình»), sv-005, ma-005. Kit «Việc» / «Kỳ ngộ» frame, 4 / 2 options, TỐN/ĐƯỢC/MẤT, odds ladder (Rất vững / Có cơ), no overflow, no cut text. visit-011 / kid-039 / vat-007 not shootable in a fresh life (need a poor consort / a child / a dead woman's box) = grounding working; j68c-play / kyc-play build them. Pre-existing (not this branch): the VP layer rewrites «ngươi» → «ta» and «nàng» → «nàng ta» on these cards; option picture silhouette when a stance has no art.
- Not blocking, for MAIN/Foreman B: 9 seeds keep a role that the text never names (day-049, visit-010/047, kid-001, myst-012, rumor-017/024/033/034) — harmless (it only narrows when the seed can fire); BAL.j68c.w.def .35 × 460 seeds vs 90 old templates → composed decisions are ~2/3 of j68 draws (engine measure «composed ~77 of ~123 shown per kiếp») — tune in BAL if MAIN wants more of the old 90.
- **VERDICT: PASS 4243006e (review/thin-p4-r1 = review/thin-p4 db47f4af + review fixes + LIVE b7598e72). Lands P4 + P5 together as one fast-forward. Shots in scratch only (no CDN folder to wipe).**

## REVIEW thin-p6 r1
- 24/11 ~03:55Z · BIG reviewer-lander (opus) session_01N1tNP5hzeJJkNV7DuxNsvJ · START_CTX ~4 % (own estimate). PRIORITY #1 CHECK ('thin-p6 P8 origin'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 — reuse: review/thin-p6 92cb3949 (ENGINE #4), «## API P6», «## API P7», «## ENGINE P6».
- Branch **review/thin-p6-r1 ff1773ba** = review/thin-p6 92cb3949 + origin/main merged three times as LIVE moved (4a8c627b → 24883e24 thin-p1 → **b7598e72** map-label-overlap; ancestor check OK). Conflicts only in assemble.py (both module lists kept: j70sd/j70c after j70, jwsd/jworldc/j71sd/j71c after jworld2, jmgpool* from main) and jbal2.js (BAL.wc/j70c/j71c + BAL.mgp*/j7c kept side by side, no shared keys); index.html/sw.js rebuilt each time.
- FIXES (committed on review/thin-p6-r1):
  1. Law 4 — j70c.js typed numbers: object-trace cap `>60` → `BAL.j70c.obKeep` (new key, jbal2.js); tier fallback `tier(map,k,0|2|0)` now names a BAL tier ("lo"/"s"/"0") instead of a typed number (same values as before).
  2. Co-op / law 6b — j71c.js cast `{B}` (the scripted rival who acts on her) could pick the co-op FRIEND (her rival entry v.coop is in `rivals` during her festival play) → a real player would be scripted (OD:L94 no AI stand-in). Pool now filters `!v.coop`. (World reactions are safe: jworldc casts during the tick, friend pulled out.)
  3. Content (handover branch): wseeds_a.md, wseeds_b.md, j70seeds_a.md, j70seeds_b.md each held a stray SECOND copy of a row (wc-tho-003, wc-thi-002, j70c-pushp-004, j70c-rumor-002, j70c-huydung-004) that was never built and failed the validator (duplicate id, «lượt», bac both sides, repeated/old tells, win without price). The built jwsd.js/j70sd.js match the FIRST copies exactly → stray copies deleted; validators now 0 errors and a rebuild is byte-identical.
  4. Test: dev/test/norep-oldsave.js assumed LIVE writes ctm-e68h; LIVE now runs jnorep itself → it compares the old ctm-nr (j68 family) when ctm-e68h is absent. dev/test/p6-shots.js takes a festival jsonl (5th arg).
  5. KIT REQUEST filed (dev/kit/KIT_REQUESTS.md K-EF-REL): the kit relation chip «<rank> <name> thiện cảm ±N» (.ef.kef1, nowrap) is clipped on Fold 755x1000 when the name is long — the NUMBER is cut. Whole group, already on LIVE (j7c, j70 threat options, any opt.r); not restyled (law 9).
- GATES (final sha ff1773ba unless noted):

| Gate | Result |
|---|---|
| validators (handover content after fix 3) | wseeds 91 seeds 0 err · j70seeds 78 routes 0 err · fseeds 220 rows 0 err (--min) |
| wc-play (all wseeds) | ALL PASS 91/91 (8 forced) |
| j70c-play (all j70seeds) | ALL PASS 78/78 |
| j71c-play (all fseeds) | ALL PASS 91 stages · 80 comps · 49 prizes (3 G stages skip-not-fail) |
| j7c-play (LIVE thin-p2 after merge) · mg-pool-play (LIVE thin-p1) | ALL PASS · no page errors (132ced30) |
| undef-scan | PASS (300 names) |
| one-core guard (law 4) | coregates PASS in quickcheck; engines read BAL.wc / BAL.j70c / BAL.j71c only (fix 1) |
| 3 LIVE old saves (norep-oldsave vs LIVE b7598e72) | ALL PASS (ctm-nr carried, 360 j68 keys identical, 3 slots load + play a buổi) |
| quickcheck | **PASS** (--runs 5: open 1418 ms, old save ok, render 211/204, tab 366/356, core gates PASS). Note: the buổi metric is bimodal on this shared box for BOTH builds (runs new 992/1019/2194/2782/4815, live 795/854/1009/1874/2199); earlier r1 shas PASS at 917/936, 1105/1130; two single-metric FAILs (buổi once, longTaskMax once) re-ran PASS. |
| coop-e2e both seats (CO-OP LAND GATE) | 141/141 at ff1773ba; 12 runs over the r1 shas: 9× 141/141, 2× «R#1.slightAt A≠B» (coop-host-lag family), 1× «week after rebirth advances» (known rebirth flake). World/route/festival keys: S.wwin (w.x.wc host-rolled, synced); S.wc, S.j70.ob, S.j71c, ctm-nr personal. |
| no-repeat across lives (p6-measure 300 × 6 lives) | world window content 73 % → 23 % · j70 route 58 % → 2 % · festivals 208–467 composed variants each |
| laws 2/3/7 scan (ALL rows, not a sample: 91 + 78 + 220) | 0 hits: 4 stances, Σgain = Σloss = tier steps, gain ≥1 & loss ≥1, no key on both sides, routes 2–3 cost points, no digit/%/odds word in player text, every object/prize has name+owner/from+clue+trace |
| law 6 (real people / objects) | casts are living roster people by nết (play tests check); objects traced (S.wc.ob / S.j70.ob / S.j71c.ob, capped by BAL obKeep); 36 sampled texts read: cổ trang, no named person |
| shots Fold 755x1000 + iPad 1180x820 (scratch, LOOKED) | world wc-tang-001, wc-su-001, wc-hoa-002 · route j70c-frame-001, accuse-004, huydung-002 · festival fc-xa-c09, fc-nguyentieu-c02, fc-dongchi-c03: kit VIỆC / CẢNH GIÁC frames, kit option rows, names filled, no {…}, 2-col or long rows by text. Fold: relation chip clipped (K-EF-REL, pre-existing kit). |

- NOT BLOCKING, for Foreman B (pre-existing on LIVE, not P6/P7 code): (a) j70.js «Tai mắt báo» card says «cần 2 để tố giác» in the header line and «cần 4 để tố giác» in the body for the same person (j70.js:234 vs thrLine70 / accNeed) — law 4, one number from two sources; (b) rv6 (j68.js:24) and so j68/j7c casts can pick the co-op friend as a scripted actor — same issue as fix 2, whole group, needs the owner-side decision/worker (not changed here, 33 call sites on LIVE); (c) content notes from ENGINE #4 (some j70 tells are scenes, not acts).
- **VERDICT: PASS ff1773ba** (LIVE b7598e72 is its ancestor; fast-forwardable). Worktrees /home/user/wt/p6r1, p6r1-ho removed after push.

## REVIEW thin-p6 r2
- 24/11 ~06:10–07:45Z · BIG reviewer-fixer (opus) session_01N1tNP436YFaYo5MMDCeWak · START_CTX ~3 % (own estimate). PRIORITY #1 CHECK ('thin-p6|wc-play|j70c|j71c'): main LIVE 68799300 | review/thin-p6-r1 ff1773ba (bounced by LC9 05:36Z) | reports/thin.md «## ENGINE P6», «## REVIEW thin-p6 r1» | claims B — reuse: r1 branch as base, nothing rebuilt.
- **WHY r1 PASSED (root cause, stale fixture):** the three fixtures (dev/test/wc-fixture.jsonl, j70c-fixture.jsonl, j71c-fixture.jsonl) were written by ENGINE #4 at 517b4a4d, BEFORE the P6/P7 seeds were folded, using the same ids the writers later gave real seeds (wc-hoa-001…wc-day-001, j70c-pond-001…, fc-xa-c01, fc-trungthu-p02, fc-newyear-c01 …: 19 rows). After 71fe6b05 folded the seeds into jwsd/j70sd/j71sd, the engine registers the BUILT row first, and wcReg / j70cReg / j71cReg skip any id already registered — so a no-arg run tests the fixture's stances/tells/fx against a DIFFERENT built seed with the same id → «0 people chose one of the 4 stances», «tamco applied 0», «tells are the seed's own» etc. Engine and seeds were fine. r1 (and ENGINE #4's last run) only ran the play tests WITH the seed files as args (those rows equal the built ones exactly), never the no-arg default, so the shadowing never showed. Same shape as thin-p4: a fixture run that nobody ran.
- FIXES on review/thin-p6-r2 (tests only; no engine, BAL or seed change; seed meaning untouched):
  1. Fixture ids moved to a test range 9xx (wc-*-901, j70c-*-901, fc-*-s91/c91/p91…; inner references renamed with them); validators on the 3 fixtures still 0 errors.
  2. Guard (law 11, whole family): wc-play / j70c-play / j71c-play now FAIL loudly «fixture rows not shadowed by a different built seed of the same id: <ids>» when a fixture row's id is already built with different content (checked: the OLD fixture → FAIL lists all 6 wc ids; the seed files themselves → no hit, they equal the built rows).
  3. Same family scan over every dev/test/*fixture*.jsonl vs every built dev/build/j*sd.js id — before/after:
     | fixture | rows | shadowed before | after |
     |---|---|---|---|
     | wc-fixture | 6 | 6 | 0 |
     | j70c-fixture | 4 | 4 | 0 |
     | j71c-fixture | 9 | 9 | 0 |
     | j7c-fixture | 3 | 0 | 0 |
     | j72c-fixture | 4 | 0 | 0 |
  4. j7c-play (LIVE P2 test, also a fixture run): failed at random ~2 of 7 runs on this box («a composed card is built (undefined)» + 5 follow-ons) because a fresh random world can hold no consort with the fixture's nết (the test's comment said it forces this; the code never did). Now forces the nết exactly as wc-play does, reported «(forced nết)»; forced path proven (tr6 emptied → ALL PASS forced); 8/8 runs PASS after. NOTE: j7c-play takes NO file arg (always its fixture) — the j7seeds content is covered by j7seeds_validate + the build, not by this test.
- MERGE: + LIVE origin/main 68799300 (conflicts: assemble.py both module lists kept — j70sd/j70c, j72sd/j72c, jwsd/jworldc/j71sd/j71c; jbal2.js BAL.wc/j70c/j71c + BAL.j72c side by side; KIT_REQUESTS.md both entries; index.html/sw.js rebuilt by build_site.sh). LIVE is an ancestor (fast-forwardable).
- GATES (play/validators/undef/one-core/old saves on b235b871; aea1baec = b235b871 + the j7c-play test fix only; quickcheck + coop on aea1baec). Seed files = handover content/thin/*.md (a+b concatenated):
  | Gate | Command | Result |
  |---|---|---|
  | wc no-arg | `node dev/test/wc-play.js` | WC PLAY: ALL PASS (6 seeds, 1 forced, 91 built) |
  | wc args | `node dev/test/wc-play.js wseeds.md` | WC PLAY: ALL PASS (91 seeds, 9 forced, 91 built) |
  | j70c no-arg | `node dev/test/j70c-play.js` | J70C PLAY: ALL PASS (4 routes, 78 built) |
  | j70c args | `node dev/test/j70c-play.js j70seeds.md` | J70C PLAY: ALL PASS (78 routes, 78 built) |
  | j71c no-arg | `node dev/test/j71c-play.js` | J71C PLAY: ALL PASS (4 stages, 3 comps, 2 prizes, 0 forced) |
  | j71c args | `node dev/test/j71c-play.js fseeds.md` | J71C PLAY: ALL PASS (91 stages, 80 comps, 49 prizes, 16 forced) |
  | j7c (LIVE P2) | `node dev/test/j7c-play.js` | J7C PLAY: ALL PASS ×8 on aea1baec |
  | j72c (LIVE P3) no-arg / a / b | `node dev/test/j72c-play.js [j72seeds_a.md / _b.md]` | ALL PASS (4 seeds) · ALL PASS (127) · ALL PASS (129), 256 built |
  | validators | wseeds / j70seeds / fseeds --min / j72seeds | 91 · 78 · 220 · 256 rows, 0 errors each |
  | validator j7seeds (LIVE content, not touched) | `python3 dev/test/j7seeds_validate.py j7seeds.md` | 5 errors «dup id» j7-041/048/061/068/077 — pre-existing stray second copies in handover j7seeds.md (same kind as r1 fix 3); built j7sd.js unaffected; for Foreman B |
  | undef | `node dev/test/undef-scan.js` | PASS (300 names) |
  | one core | `node dev/test/one-core-guard.js` | PASS |
  | 3 old saves | `node dev/test/norep-oldsave.js <LIVE 68799300 index.html>` | NOREP OLDSAVE: ALL PASS (3 lives, 0 errors) |
  | quickcheck | `bash dev/tools/quickcheck.sh` (aea1baec vs live 68799300) | QUICKCHECK PASS · open 2000 ms · old save ok · render 275/261, tab 578/588, buổi 1335/1570, tasks>200ms 24/27 · core gates PASS |
  | CO-OP GATE | `node dev/test/coop-e2e.js` / `COOP_SWAP=1 node dev/test/coop-e2e.js` | 142/142 (Fold hosts) · 142/142 (iPad hosts) |
- Laws touched: 4 (no number added; tests read BAL), 11 (whole fixture family scanned + guard); 1/2/3/6/7 unchanged from r1 (no seed/engine change). No UI change → no shots.
- FOR THE REVIEWER BRIEF (MAIN 117 ask): every reviewer of a composed-seed branch runs EVERY *-play test of the touched families TWICE: no-arg (default fixture) AND with the seed files; and pastes both result lines. The shadow guard now makes a stale fixture fail in the no-arg run by name.
- **VERDICT: PASS aea1baec** (review/thin-p6-r2; LIVE 68799300 is its ancestor).

## ROBOT-COOP
PRIORITY #1 CHECK ('robot10 coop'): OD 2204–2205 | ledger 0 | claims CLAIMS L1365 (this seat) | main dev/measure/robot10.js (solo only) + robot10-in.js + dev/test/coop-bot.js + coop-lag.js | review/robot10-lag-rv (dev/test/lib/coop-lag-hooks.js, copied unchanged) | archive 0. Reused, nothing rebuilt.
Lead: B ROBOT-10 CO-OP LEAD (opus). Branch review/robot10-coop @48d1d7e1 (from main 27240ccb). TEST-ONLY: dev/measure/robot10-coop.js (new), dev/test/lib/coop-lag-hooks.js (copy of robot10-lag-rv), dev/test/coop-bot.js (requirable: exports mk/STEP/BUOI/WORLD, its own run unchanged, WURL only from argv when run as a script), dev/measure/robot10-in.js (C.coop guard: no in-place deser in a live room, no solo soft-lock check). No game file, no index.html/sw.js.

### Usage (runner sessions)
```
# own sparse worktree from origin/review/robot10-coop (or main once landed), then:
python3 dev/build/assemble.py
node dev/measure/robot10-coop.js <pairFrom> <pairTo> <kiếp> [out]        # out default dev/handover/robot
#   env SEED=<n> (shifts the thân phận rotation: new SEED = new origin×road pairs) · SWAP=1 (iPad player Y hosts; default Fold player X hosts)
#       ORIGINS=tt,dtq,… (default every origin the game has: tt dtq muoi cn nc td ch thd cnv pf bd) · PAR=1 · CAP=10800 s per seat-life (then «cap», not a bug)
#       STUCK=240 s · RTW=4 weeks between save round-trips · REJOIN=6 (guest leaves + «Trở lại phòng» once per room) · WORKER=<url> (default LIVE)
# run detached:  setsid nohup node dev/measure/robot10-coop.js 1 2 10 > run.log 2>&1 < /dev/null &
```
Output: `coop-<yyyymmdd-hhmm>-p<from>-<to>[-s].md` = THE bug file (robot10 format: Bugs one row per bug with pairs/hits/detail/repro save/screens, Lives table per seat-kiếp with ending + cause + max rank + years, LAG set table per room × game year (turn/action p95, sync KB max, KB/min, resend/min, long tasks, per device fold/ipad), Rooms table incl. rejoin ms) + same-name .json. Runners copy the .md (+ .json, saves/) to dev/handover/robot/ on the handover branch.
Checks per pair: robot10-in.js in both real pages (one-core option audit, cổ-trang wording of cards/journal/endings, buổi lag, owner tally per life), JS errors per seat, stuck (no room week step 240 s → bug + trace + screens, fresh room for the rest), stat sanity each step, save→load→save in a network-less scratch page, world compare each week + NPC places / friend position / friend stats each buổi (coop-bot), LAG budget misses (play-perf-budget.json coop*) per game year, rejoin.
Pair plan: pairs 1–20 × 10 kiếp, run once with SWAP=0 and once with SWAP=1 (= both seat orders). Player X walks the origins, Y is 3 origins on, roads rotate per kiếp. Each runner gets pair ranges, no overlap (e.g. runner k: pairs 2k-1..2k, one SWAP value).

### Runtime (measured on this box, 4 CPU, LIVE Worker)
- One pair = one browser, two real-render pages (+ scratch): CPU-bound (≈350–430 long tasks/min per page) → PAR=1 per 4-CPU runner (2 pairs per runner = run them one after the other).
- ≈20–50 s per game week (median ≈25 s) → ≈15–25 min per game year. Solo lives run 1–11 game years (nc round), so one co-op kiếp ≈ 0.5–4 h (CAP 3 h). 10 kiếp per seat ≈ 10–25 h per pair, per seat order.
- Fixes found while building (all harness): seeded Math.random repeats co-op ids across rooms/reloads → rooms stall (now unseeded; SEEDED=1 = repro only); a scratch page loading a co-op save joined the room as a third client (now no network); guest rejoin uses the coop-rejoin-stats backOn path («Chơi cùng bạn» → «Trở lại phòng»), measured 8.7 s.
- Smoke (CAP 300 s lives, 1 pair): flow OK end to end (room, both lives, rebirth path, round-trips, rejoin, year cut, bug file). First findings for the fixer (not yet triaged): coop-pos «host sees guest at r3, guest is at r902» every buổi (coop-bot's old posDiff family), coop-stat friend Sủng/Sức one buổi late, LAG coopTurnP95 ≈22 s > 10 s, coopSyncKBMax 146 KB > 100, coopResendPerMin 16.8 > 12.
- Full smoke 1 pair × 1 kiếp (default caps): running, result appended here.

### HANDOVER (ROBOT-COOP lead, rollover by context: START_CTX ≈4 %, now ≈26 % of 1M; successor opened by the foreman)
- Done: STEP 1 runner on review/robot10-coop @48d1d7e1 (pushed), usage + runtime above, foreman told (05:33Z 24/11).
- Running at handover: full smoke `node dev/measure/robot10-coop.js 1 1 1 /home/user/wt/rcoop-out/smoke` (DBG=1, default caps) in this container, log /home/user/wt/rcoop-out/smoke.log. A container restart kills it: just re-run the same line in your own worktree (sparse worktree /home/user/wt/rcoop may survive; else `git worktree add` from origin/review/robot10-coop, `python3 dev/build/assemble.py`). Append its Lives/LAG rows + wall time here.
- Next (STEP 2, co-op FIXER): (1) when the foreman asks, hand review/robot10-coop to a SMALL reviewer; (2) read every runner bug file dev/handover/robot/coop-*.md; fix each as a WHOLE family (law 11: scan script + before/after table) on review/robot-coop-fix-<n> from newest origin/main; gates coop-e2e both seat orders (`node dev/test/coop-e2e.js <out> https://ctm-coop.victoria-tntt.workers.dev`), `bash dev/tools/quickcheck.sh`, old saves; «SẴN SÀNG KIỂM» → foreman for a BIG reviewer. First triage list from the smoke: coop-pos (BUOI fpl r3 vs her r902: check first whether it is coop-bot's hm() mapping of 'home' — a harness fault — before calling it a game bug), coop-stat (friend Sủng/Sức one buổi late), LAG coopTurnP95 ≈22 s, coopSyncKBMax 146 KB, coopResendPerMin 16.8.
- Harness notes: DBG=1 prints per-week step histograms; never seed Math.random in co-op (SEEDED=1 stalls rooms); the scratch page must stay network-less; rejoin = coop-rejoin-stats backOn path.

### FIXER #2 (session_01N1tNP3va8MrNMqi1MZLTgt, opus; START_CTX ≈3 %)
PRIORITY #1 CHECK ('coop sync KB / turn / coop-pos'): OD 2204–2205 | main coop/worker/src/index.js BIG, dev/test/coop-lag.js | review/* coop-host-lag-r3 (PASS, landed), robot10-lag (finding 5 = same KB family, report only) | claims none on coop sync KB / render perf.
- Smoke re-run (container restarted, predecessor's run lost): `DBG=1 node dev/measure/robot10-coop.js 1 1 1 /home/user/wt/rcoop-out/smoke` started 05:38Z on 48d1d7e1 (OLD harness), ~25–60 s per game week; result appended here when it ends.
- Triage (evidence: coop-lag.js runs, 5 buổi, CPU ×4, crossing one week; files in /home/user/wt/rcoop-out):
| finding | verdict | fix |
|---|---|---|
| coop-pos «host sees guest at r3, guest is at r902» every buổi | HARNESS: coop-bot BUOI mapped each page's own 'home' to r901/r902, but the host names her palace palaceOf(f)=r3 (the game maps her 'home' there, jcoopworld mapPlace) | review/robot10-coop 2bf6094f: one place name on both pages (H:<seat>); same family fixed in coop-bot.js + coop-bot-x.js |
| coop-stat friend Sủng/Sức one buổi late | HARNESS race: stats ride the pos relay (sent on every render, sendPos/liveStats); the compare ran the instant places agreed | 2bf6094f: stats must also settle (5 s window) before a buổi is compared; only a stat still wrong after 5 s counts |
| coopSyncKBMax 146 KB > 100 | GAME/Worker: the biggest frame is dn:week (127–170 KB) sent PLAIN by the Worker (gzip only above 200 000 chars); the client already gzips above 8 000 and gunzips any binary frame in order (rxQ) | review/robot-coop-fix-1 889803dc: Worker BIG 200000 → 8000. Before/after table below. Deploys on land (coop-worker.yml) |
| coopResendPerMin 16.8 > 12 | NOT reproduced in coop-lag (2.1–3.3/min); needs the smoke's frame table | open: read the smoke JSON when it ends |
| coopTurnP95 ≈22 s > 10 s | NOT a sync bug: the week turn is client CPU. --trace: 68–80 s week window = continuous long tasks on both pages; --prof 0:3: nCheck → nextBuoi (night) → endTurn → render = 8 s (Fold) / 15 s (iPad) incl. profiler; renders ≥ 50 ms sum 5.8 / 9.4 s; hot self time = kit layout fitting (getBoundingClientRect / clientWidth / band+set kit layout j-line 67449, kitDialogOpen, kitOptFit). Box saturated (4 throttled pages: smoke + test). Same family as robot10-lag finding 4 (Sang ngày mới render) | NOT fixed here: needs a separate render-perf order (render only the changed panel; batch kit fit reads before writes). For Foreman B |
Before/after (coop-lag --buoi 5, LIVE Worker vs local `wrangler dev` of the fix branch):
| frame | before max KB | after max KB |
|---|---|---|
| dn:week | 126.9 | 0 (now dn:bin) |
| dn:bin (gzip) | 0 | 28.5 |
| up:bin (client gzip) | 25.4 | 25.3 |
| every other type | ≤ 6.6 | ≤ 7.9 |
coopSyncKBMax 126.9 → 28.5 · coopKBPerMin 101.4 → 84.7 · coopResendPerMin 2.7 → 2.1.
- Gates on review/robot-coop-fix-1 (main 68799300 + Worker BIG + coop-lag flags): Worker tests merge/vault/seat/stale/thin/ws/chat all OK; coop-e2e 142/142 BOTH seat orders against the fixed Worker (local wrangler dev); quickcheck: old save loads (0 errors), time-spill PASS, core gates FAIL only G4 dialog-fixed #54 «new-title plate sits ON the event picture» — SAME FAIL on clean main 68799300 (pre-existing, flips between 755x1000 / 1180x820), not this branch.
- Tools for the next fixer: local Worker = `npm i wrangler@4` in a scratch dir, `wrangler dev --local --port 8799 --ip 127.0.0.1` in coop/worker; coop-lag needs PP_ARGS with `--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,BlockInsecurePrivateNetworkRequests,LocalNetworkAccessChecks` for a localhost Worker (coop-e2e already handles it).

#### FIXER #2 — update 08:25Z
- SMOKE DONE (1 pair × 1 kiếp per seat, default caps, OLD harness 48d1d7e1, LIVE Worker): 147.5 min, 10 lives (rebirths + extras), 50 weeks in the last room (52 min), 14 distinct bugs: stuck ×3 (room no week step 240 s at week 45 buổi 3, both seats "next" enabled, not bended → fresh room OK) · coop-world friend sung 10 vs 7 (week 11, once) · save round-trip S.visit.__chg (62, HARNESS: deser j6:74 rebuilds a home visit, UI marker; now skipped) · bạc < 0 (26 hits, −22) · option text vs effect ×2 («Sức +6» applies suc −2 in «Chuyện lạ cần tra»; «Bạc +8 mỗi tháng» applies bac 20 in «Bạc lạ» — solo one-core family, not co-op) · coop-pos / coop-stat (old harness) · LAG turn p95 109 s, sync KB, resend, action p95, stall, buổi > 3 s. Files: /home/user/wt/rcoop-out/smoke (this container only).
- HARNESS on review/robot10-coop (head 050b93a0; runners told): 0a9d1252 FLUSH=<n> incremental .json/.md (every n room weeks + every kiếp + SIGTERM/INT/HUP, partial pairs marked) + RESUME=<run .json> (tested: kill → resume finished the run in the same file); 1e85205d resend detector identity = full frame text / gzip bytes (was length+last 40 chars and '' for binary → false resends; pos 30–44 → 0–1, coopResendPerMin 21.7 → 7.7 < 12 on a short run; remaining repeats = ctm-tm «st» flips busy/free as dialogs open, real state); POSLOG=1 / NEGTRAP=1 diagnostics; 050b93a0 coop-pos names where she LIVES (house head's palace rN / own palace P:<seat> — the r3-vs-H:b hits were the guest living in consort 3's palace) + save round-trip skips visit.__chg*.
- ROOT CAUSE bạc < 0 (and any stat out of range) in co-op: Worker merge (coop/worker/src/merge.js) adds numbers a + (b − base); her bạc spent on BOTH seats in one week (each side valid) → 5 + (4 − 20) = −11 on both screens (NEGTRAP: guest S and the host's friend entry both "ARRIVED" < 0 in the merged week). A client-side clamp is wrong (the Worker's stored state = next week's base would keep −11 → phantom +11 later).
- FIX WIP review/robot-coop-fix-2 b9b88cda (from main fd85907a): merge clamps a PERSON object (name + rank/role/alive + a stat) to the game's own ranges (j8 ap / j1 apply: stats 0–100, th/hh ±100, bạc ≥ 0); effect objects like {bac:−5} untouched; merge.test.mjs new cases; all 7 Worker tests OK; + coop-lag-hooks resend identity fix (same as harness). Evidence: LIVE Worker 3/5 short pair runs had guest bạc < 0; local `wrangler dev` with the fix: 0/3. NOT SSK YET: the fixed-Worker runs showed coop-world «X sees the friend's sung/danh/suc wrong (week end)» in 2/3 runs (symmetric: each seat's view of the friend = the viewer's own numbers, week 4 / 9, CAP 300 lives → near a rebirth), the control (same local Worker, no clamp) 0/2, the LIVE smoke 1 (10 vs 7). Next: decide whether the clamp causes it (more A/B runs, or reason through the friend write-back f.__b baseline in jcoopworld) before SSK.

### HANDOVER (FIXER #2 → FIXER #3; rollover by context, START_CTX ≈3 %, now ≈28 %)
- In review: robot-coop-fix-1 889803dc (Worker gzip > 8000) — BIG reviewer session_01N1tNP2DcFcegtmGUCGYXHH (harness head moved to 050b93a0, test-only).
- Do first: settle the coop-world question on fix-2 (above), then gates (Worker tests, coop-e2e both seat orders on a local Worker, quickcheck — G4 dialog-fixed #54 fails on clean main too, old save) → «SẴN SÀNG KIỂM» to Foreman B (session_01N1tNP5midhoJEMbTX9TfXy).
- Open: coop-world friend stats at week end (above); stuck at week 45 (smoke, 3 hits, repro saves/…-001.json in the smoke dir — lost with this container; re-run or wait for runner files); render-perf for coopTurnP95 = Foreman B asked MAIN 118 who owns it (do not start); runner bug files dev/handover/robot/coop-20261124-0723-p1-2(.json, -s.json) arrived — read them first.
- Tools: local Worker = `npm i wrangler@4` in a scratch dir, then in coop/worker `wrangler dev --local --port 8799 --ip 127.0.0.1`; robot10-coop WORKER=http://127.0.0.1:8799 (localhost launch flags built in); coop-lag needs PP_ARGS with the PrivateNetworkAccess/LocalNetworkAccessChecks disable-features list (see fix-1 notes above).

### FIXER #3 (session_01N1tNP3zZjxpPAGUUKwUTEY, opus; START_CTX ≈5 %; Foreman B = session_01N1tNP4gKR4CpjKFHpHLKjn)
PRIORITY #1 CHECK ('deaf filter / rx spy / gzip BIG / coop-pos / friend stat'): OD 2204–2205 | main coop/worker/src/index.js BIG 200000, dev/build/jcoop.js rxQ+gunz, jcoopworld mapPlace/onPos/keepFriendPos, jslots mark/solo | review/* robot-coop-fix-1 889803dc (BIG FAIL A), robot-coop-fix-2 b9b88cda, robot10-coop 050b93a0 | claims B fixer #3.
#### SSK review/robot-coop-fix-1-r2 a0ac174a (09:43Z; BIG reviewer session_01N1tNP2xZQymfgL6TKgMEcP)
= main fd85907a + 889803dc cherry-picked unchanged (919b2f35, Worker BIG 8000) + a0ac174a (review A items 1+2, law 11).
Fix: ONE source dev/test/lib/coop-wire.js — guestNet (dead-socket fake: __mute + __deafThin drop the host delta/snap that ARRIVE while deaf, string OR gzip binary; frames kept in arrival order behind the async gunzip, kept ones re-dispatched in order) and typeSpy (__tx/__rxT/__old gunzip binary frames, wire order). Scan `node dev/test/coop-wire-scan.js`: before 14 string-only deaf filters / rx spies, after 0 (exit 0). Left by design (listed by the scan): tx-only spies coop-thin-b/-b-r1/-b-r3 and coop-thin-e-net's host-deaf on relayed "do"/"thin" (small intent/handshake frames, never above 8000); __wsDeaf (e2e family) drops every frame, any type.
| test (r2 test code) | fix Worker :8799 | main Worker :8798 |
|---|---|---|
| coop-thin-f2 L7 | 27/27 (P10 answer: g1 lostV 1 = loss real; review saw 26/27, lostV 0) | 27/27 |
| coop-thin-a | 19/19 | 19/19 |
| coop-thin-d | 52/53 | 51/53 (kit odds row of d2-guest-gift flaky on both; Thân sơ row main only) |
| coop-thin-d-probe | 35/35 | 35/35 |
| pm-coop-d | 33/35 | 33/35 (same 2 pastime-XP rows on both = pre-existing game) |
| coop-thin-f3 L8 | 38/38 | 38/38 |
| coop-thin-f4 L9 | 19/19 | 19/19 |
| coop-relms-both | 15/15 | 15/15 |
| coop-arrive-see L9 | 89/90 | 89/90 (same row «run1 tgk host-first») |
| coop-places L9 | 19/19 | 19/19 |
| coop-palace-life L9 | 19/19 | 19/19 |
| coop-thancan L9 | 10/10 | 9/10 (T1 random) |
| coop-ge-npc L9 | 10/10 | 10/10 |
| coop-hl-faces | EXC «reading 'buoi'» on both | the ORIGINAL main test on main Worker: same EXC = pre-existing test rot |
Gates: Worker merge/vault/seat/stale/thin + ws + chat ALL OK (:8799) · coop-e2e 142/142 seat order 0 AND COOP_SWAP=1 (:8799) · quickcheck PASS (core gates PASS, time-spill PASS, old save ok 0 errors). Logs /home/user/wt/f3out (fixer #3 box). Deploy note: the Worker auto-deploys on land (coop-worker.yml).
#### Harness review/robot10-coop d1f05b41 (pushed; runners re-fetch)
- 3fa85fbf: week-end friend Sủng/Danh/Sức compare settles up to 5 s like the buổi compare (read 300 ms after the step = race with the merged-week render + pos relay); save round-trip skips S.coopRoom (jslots solo(): a co-op life loaded OUTSIDE a room drops it by design — runner U2 hits) and visit.people[].__* (jfeel __feelMig migrate-once marker; deser rebuilds the home visit, migration idempotent — U1/U3 hits).
- d1f05b41: every coop-pos hit carries both pages' relay state (last pos frame week.buổi place life, own week/buổi/place, friend id/palace/where, thin level, herPl7) for game-vs-harness triage (review B item 2).
- Review B item 1 (place-name family) = closed by fixer #2's 050b93a0. Item 2 (coop-pos after rebirth): data from the A/B runs below.
#### fix-2 (Worker clamp) A/B — running 09:43Z
`CAP=300 PCAP=2400 POSLOG=1 NEGTRAP=1 node dev/measure/robot10-coop.js 1 1 1` on main game + harness d1f05b41, WORKER :8797 (fix-2 b9b88cda, clamp) vs :8798 (main, no clamp). Reasoning so far: the clamp changes only values the additive merge pushed out of range, and both pages adopt the same merged state, so it cannot make one page's view differ from the other's; the old week-end compare had no settle (now fixed). Result appended here.

#### SSK review/robot-coop-fix-2 b9b88cda (fixer #2's commit, unchanged; from main fd85907a)
Worker merge (coop/worker/src/merge.js) clamps a PERSON object (name + rank/role/alive + a stat) to the game's own ranges after the additive merge (stats 0–100, th/hh ±100, bạc ≥ 0); effect objects ({bac:−5}) untouched; merge.test.mjs new cases; + coop-lag-hooks resend identity = full frame text / gzip bytes (same as harness 1e85205d).
Root cause (fixer #2, NEGTRAP): both seats spend her bạc in one week (each valid) → 5 + (4 − 20) = −11 ARRIVES on both screens; a client clamp would leave −11 in the Worker's stored base (phantom +11 next week).
Open question settled (A/B above): «sees the friend's stats wrong (week end)» clamp 0/5 · no clamp 0/5 with the settled compare (the old 300 ms read was a race) → not caused by the clamp; bạc < 0 ARRIVED clamp 0/5 · no clamp 1/5 (bac −10); runners U3: sung −10 / bạc −25 week 2 = this family.
Gates (fix-2 Worker local wrangler :8797): merge/vault/seat/stale/thin + ws + chat ALL OK · coop-e2e 142/142 seat order 0 AND COOP_SWAP=1 · quickcheck: old save ok, time-spill PASS, core gates FAIL only G4 dialog-fixed #54 «new-title plate sits ON the event picture» (755x1000) = the SAME pre-existing flake fixer #2 saw on clean main 68799300; this diff touches no game file (Worker + Worker test + coop-lag-hooks only). Deploy note: Worker auto-deploys on land.

#### FIXER #3 — update (A/B, fix-3, onecore, harness)
- fix-2 A/B (main game + harness d1f05b41/a7951358, CAP 300, 5 runs per side, local wrangler): Worker :8797 = fix-2 clamp, :8798 = main. coop-world «sees the friend's sung/danh/suc wrong (week end)»: clamp 0/5 · no clamp 0/5 (with the 5 s settle; fixer #2's 2/3 = the unsettled 300 ms read, a race). bạc < 0 ARRIVED: clamp 0/5 · no clamp 1/5 (bac −10). The clamp only moves values the additive merge pushed out of range and both pages adopt the same merged state → it cannot make the two views differ. Settled: fix-2 does not cause it.
- GAME bug found by the d1f05b41 relay columns (review B item 2 family): coop-pos «host sees guest at r4, guest is at ksp» / «guest sees host at ksp, host is at tn»: the viewer's S.where (relay) is RIGHT, but j95's whereOf wrapper returns the NPC roster plan S.roster.P["v"+id] for every rival incl. the co-op friend (j95ppl adds all rivals); people-at-a-place, who-sees-whom (j95obs), catches, approaches read that NPC plan for a real player (law 6b). Fix WIP review/robot-coop-fix-3 (main fd85907a + jcoopworld rosterFriend: keepFriendPos writes her real place into her roster rows from the current khắc, "rest" at her palace / "visit" elsewhere). NOT gated yet: coop-e2e both orders, quickcheck, A/B coop-pos (fix vs main game).
- Second coop-pos family (abC5 run, after the GUEST's rebirth): «host sees guest at P:b (her own palace r902), guest is at r3 (house head 3)»: the host's friend entry has no/old resHead after her rebirth, so palaceOf(friend) on the host = r902 while she lives with consort 3; the pos relay carries name/life/stats but not her house. Likely fix: carry her house (resHead, REFF-mapped) in the pos relay (jcoopworld sendPos/onPos) → f.resHead. Not started.
- review/robot10-onecore (local only, from main fd85907a, not pushed): (1) robot10-in.js auditOpt: a RECURRING amount («mỗi tháng Bạc +8») is not compared with the option's sure fx — «Bạc lạ» take = fx bac +20 now AND j42 spyPay +8 each month (both true) = harness false positive; exposes R.auditOpt. (2) dev/tools/choice-value-scan.js --numbers: the same rule on every option the scan builds (PEND builders, MF7/FV7/FX7/world cards/TSA, N turns) → table + «ONE-CORE NUMBERS PASS/FAIL». First run on main running (log /home/user/wt/f3out/onecore-before.log). «Sức +6» vs suc −2 in «Chuyện lạ cần tra» (j68 fam myst, EV6 / j68c seeds) not located yet: use the scan output.
- stuck week 14 buổi 3 (U3): repro save review/robot10-coop-saves 6ca5b510 dev/handover/robot/saves-tmp/coop-20261124-0723-p3-4-yr97b6.json (one seat's save; both seats «next» enabled, not bended, sent 13). Not triaged.
- Pre-existing, not ours (seen while gating): coop-hl-faces EXC «reading 'buoi'» (original test on main too), pm-coop-d 2 pastime-XP rows, coop-arrive-see «run1 tgk host-first», coop-thin-d kit odds row flaky.
- Harness review/robot10-coop 0a593f8e (pushed): + bug rows keep first AND last detail, hits since this process started (RESUME) + harness sha (Foreman B ask); + a HOME visit is compared by k only in the save round-trip (deser rebuilds it: msg / __feelMig / __chg).

### HANDOVER (FIXER #3 → FIXER #4; rollover by context, START_CTX ≈5 %, now ≈30 %)
- In review: robot-coop-fix-1-r2 a0ac174a (BIG reviewer session_01N1tNP2xZQymfgL6TKgMEcP); robot-coop-fix-2 b9b88cda (SSK sent 10:4xZ).
- Do next, in order: (1) review/robot-coop-fix-3 25db868e (WIP, pushed): gates (Worker unchanged → coop-e2e both orders on any local Worker, quickcheck, old save) + A/B coop-pos with the harness ≥ 0a593f8e (fix-3 game vs main game, same Worker, CAP 300, 5 runs each; expect the «sees X at <her palace>, X is at <place>» rows gone); then add the second family (friend's house after HER rebirth: carry resHead, REFF-mapped, in the pos relay → f.resHead; check «host sees guest at P:b, guest is at r3») on the same branch; SSK. (2) review/robot10-onecore 63cf9638 (WIP, pushed; Foreman B assigned): run `node dev/tools/choice-value-scan.js --numbers --turns 60` (+ --seed variants) and the robot10 solo runs' «number» rows; the «Sức +6 → suc −2 in Chuyện lạ cần tra» (j68 fam myst: j68f EV6 + j68sd j68c-myst seeds) is not reached by the scan yet — drive j68 myst events directly (e68Fire / EV6 table) in the scan; before/after table (recurring skip: «Bạc lạ» take row before → gone after); SSK. (3) stuck week 14 buổi 3 (U3 save above). (4) coopTurnP95 render-perf: owner still open with MAIN 119 — do not start.
- Tools on this box (lost on restart): local Workers :8799 fix-1-r2, :8798 main, :8797 fix-2 (wrangler at /home/user/wt/wr/node_modules/.bin/wrangler, start with --inspector-port <unique>); worktrees /home/user/wt/{f3a fix-1-r2, f3b fix-2, f3c fix-3, f3d onecore, f3h harness, f3main main+harness scratch, f3ho handover}; logs /home/user/wt/f3out.
- Handover-branch pushes: the shallow rebase conflicts; do `git fetch --depth=5 … && git reset --hard FETCH_HEAD`, re-insert your block, push.

### FIXER #4 (session_01N1tNP2dfra9gDdChCWdbcB, opus; START_CTX ≈3 %; Foreman B = session_01N1tNP3gUZjrKuYHpshM6n4)
PRIORITY #1 CHECK ('person range / linkRange / coop clamp / roster friend / resHead relay'): OD 2204–2205 | main dev/build/jbal2.js BAL.linkRange, j8 ap, j1 apply/statSet, coop/worker/src/merge.js | review/* robot-coop-fix-2 b9b88cda (FAIL rv 53Ngf1bG), robot-coop-fix-3 25db868e, test-mrfoot d521656c (used, not rebuilt) | claims B fixer #4.
#### SSK review/robot-coop-fix-2-r2 1579b65c (= main 178cac37 + b9b88cda + r2 279ec4ab + build 26252228 + merge LIVE c6c3ca76, FF ok)
Review FAIL items → r2:
1. LAW 4: BAL.personRange (new pure-data dev/build/jbalpr.js, loaded after jbal.js; BAL.linkRange MOVED there from jbal2.js, canon overwrite) = stat / map / sub / world ranges + `core` (the ap/apply/statSet block). j8 ap, j1 apply, j1 statSet read it (prCl) — no typed list left. The Worker table is GENERATED: dev/build/gen_coop_ranges.js → coop/worker/src/ranges.gen.js (STAT, MAP, SUB, WORLD, KH = BAL.kh), run by assemble.py; coop/worker/test/range.test.mjs: generator --check (stale → FAIL), tables = jbalpr.js, ap/apply/statSet read BAL.personRange and type no range, Worker sucCap = jkh.js khB…sucCap source on 500 random people (caught khInit's «no scar yet → khTmp 0» rule). In package.json test + .github coop-worker.yml (before deploy).
2. LAW 11: Worker clamps EVERY named person (her S, consorts, maids, staff, kids, men, officials) on every table field, map values (rl/ro/af/hA/evm/cev), sub objects (kids[].hW.joy), world W.S.trieu (bien/kho), Sức ≤ sucCap. Scan `node dev/tools/coop-range-scan.js [--all]`: 863 game clamp sites, 46 table fields, every constant bound inside the table (COOP-RANGE PASS); non-person / not-merged fields hand-checked in the scan (pets aff/full/clean/care, odds p, shelf pc, her own road kap/kld/kgt, UI) with reasons.
| field (reviewer merge3 rows + family) | before (b9b88cda) | after |
|---|---|---|
| R[].rl[id] 90→100,95 | 105 | 100 |
| R[].ro[id] 10→0,4 | −6 | 0 |
| R[].staff[].loyal 10→0,2 | −8 | 0 |
| maid.loyal 10→0,3 | −7 | 0 |
| tin 95→100,98 | 103 | 100 |
| pg 95→100,99 | 104 | 100 |
| oan 5→0,1 | −4 | 0 |
| ev 3→0,1 | −2 | 0 |
| suc (age 60, 3 kids) 60→70,75 | 85 (cap 100) | 75 = sucCap |
| kids[].hp / men af[id] / kids[].hW.joy / nt / W.S.trieu bien,kho | 104 / −104 / 104 / 103 / 104,−3 | 100 / −100 / 100 / 100 / 100,0 |
3. isPerson = any object with a string name (the same rule the scan states); S.nightWhy.rows (name + id + sung snapshots) are in-range snapshots → identity, tested.
Gates: Worker npm test ALL OK (merge/vault/seat/stale/thin/range) · coop-keymove-unit 12/12 · coop-e2e 142/142 Fold-host AND iPad-host vs local Worker of this branch (on 26252228 + test-mrfoot d521656c tests; bare main + d521656c = 142/142 both too) · quickcheck: core gates PASS, time-spill PASS, old save ok; perf: 2 runs of 3 FAILed buổi (4390/5457 vs 1957/2339, both sides with ±6 s outliers) → median of 6 (quickcheck.js --runs 6, same box): buổi 1565 vs main 1861 ms → PASS (noise).
A/B (harness 5a65a561, main game c6c3ca76, CAP 300 PCAP 1500, 5 runs per side, local Workers :8797 this branch / :8798 main): «number» bạc out of range / below 0: clamp 0/5 · main 1/5 (+2 more on main-Worker fix-3 runs: 3/10). coop-world «sees the friend's sung/danh/suc wrong (week end)»: clamp 1/5 (run 1 only: box overloaded by a parallel scan, room turn p95 252 s, week 1, symmetric = each seat sees its OWN numbers on the friend) · main 0/5. History of that row: fixer #2 clamp 2/3 (no settle), fixer #3 0/5 vs 0/5 (5 s settle), now 1/5 vs 0/5 → total clamp 1/10 vs main 0/10 since the settle. No mechanism found (the clamp is identity on in-range numbers and both seats adopt one merged state); flagged for the reviewer, not hidden.
Deploy note: the Worker auto-redeploys on land; ranges.gen.js changes only when BAL.personRange / BAL.kh change (assemble.py regenerates it).

#### fix-3 r2 (not SSK yet) + other work
- review/robot-coop-fix-3 cd761689 (FF from LIVE c6c3ca76): 25db868e (roster rows follow her real place, rosterFriend) + 62f696ed (2nd family: her HOUSE resHead/resHall/pal/palLone/palWait rides the pos relay, houseWire/houseIn; onPos writes her roster rows) + cd761689 (r2: outermost j95planRival wrap installed after every module — a new buổi re-planned her as an NPC (jagday wrap) after her relay: A/B run 5 «host sees guest at r5, guest is at ksp» with S.where = ksp; keepFriendPos + wrap share ONE rule friendPl). Gates on 68e04187 (before r2): coop-e2e 142/142 both orders (with test-mrfoot tests), quickcheck only G4 80-dialog-fixed #54 (known flake on main). A/B on 21d7caa1 (5+5, CAP 300, PCAP 1500, harness 5a65a561, same main Worker): coop-pos fix 1/5 (the r2 case above) vs main 0/5 — runs are short (1–4 weeks), coop-pos rare in them; other single rows (fix side only, unrelated code): save round-trip R[].staff[].name (Thiệu Hàn Yên → Tiết Vân Tịch: deser renames a staff = name-clash fixer on load? NEW family candidate), coop-where buổi 4.0 host all@cnh vs guest kn/r2/r4, coop-stat guest sees host stale.
- review/robot10-onecore 6214e278 (rebased: main + 63cf9638 + b6a611c4 + plant): robot10-in auditOpt reads a c6 (j68) option's WIN/LOSS blocks (non-enumerable __w/__l via a c6 wrapper; pw road moves the bạc into the win); choice-value-scan --numbers builds each j68 event with its own params (E68I[id].pp). Before/after (60 turns, main c6c3ca76): ONE-CORE NUMBERS PASS both · 405 → 431 options audited · 0 lies. The «Thay hết nước, đồ ăn | Sức +6 vs fx suc −2» row is already gone on main (4cb35780 typed-stat-bal: fishSwap cost dropped, w suc 2); the harness gap that made such rows (win number compared with the cost only) is closed. --numplant now also plants a c6 lie (Sức +6 printed, w suc 2): result NOT yet read (run was in flight at rollover) — successor: `node dev/tools/choice-value-scan.js --numbers --numplant --turns 2` must say «plant CAUGHT», and with 1a1d274e's robot10-in.js the c6 plant must be MISSED (before/after proof). Then SSK.
- Harness review/robot10-coop 5a65a561: 7d0e9ffa RT skips save.S.rkGid (per-device ranking id; U3 «save round-trip 32») + test-mrfoot footer selector in coop-bot/-x (rooms stalled at week 0 on LIVE 178cac37).
- coop-e2e-prequel 183f478d = SUPERSEDED by test-mrfoot (MAIN 122); remote delete refused here — ignore/delete.
- Triage U1 stuck (FOREMAN_B_STATUS b0b79909): pre-existing week-end family (buổi 3, both «next» enabled, bend false, sent = week−1) = the U3 stuck item; runners keep 5a65a561 with STUCK=600.

### HANDOVER (FIXER #4 → FIXER #5; rollover by context: START_CTX ≈3 %, now ≈38 % of 1M)
- In review: robot-coop-fix-2-r2 1579b65c (SSK sent 15:5xZ to Foreman B 3gUZjrKu).
- Do next, in order: (1) fix-3 cd761689: gates (coop-e2e both orders vs a local main Worker, quickcheck — G4 #54 = known flake, old save) + A/B fix-3 game vs main game, same Worker, harness ≥ 5a65a561, ≥ 5 each (expect no «sees X at <her palace>, X is at <place>» rows) → SSK. (2) robot10-onecore 6214e278: read the plant result (above) → SSK. (3) week-end stuck family (U3 save review/robot10-coop-saves 6ca5b510 dev/handover/robot/saves-tmp/coop-20261124-0723-p3-4-yr97b6.json + U1 pair 2 rows: buổi 3, both «next» enabled, no bend, sent = week−1). (4) NEW candidate: save round-trip R[].staff[].name renamed by deser (fix-3 A/B run 1) — confirm on main, then family. (5) Tail N1–N3 from «REVIEW robot-coop-fix-1 r2» (test-only). Render-perf (coopTurnP95) = MAIN's, do not start.
- Tools (lost on container restart): wrangler = `npm i wrangler@4` in /home/user/wt/wr; `wrangler dev --local --port 8798 --ip 127.0.0.1 --inspector-port <unique>` in coop/worker of a main worktree (and :8797 for a fix branch). A/B: overlay the harness files (dev/measure/robot10-coop.js robot10-in.js dev/test/coop-bot.js coop-bot-x.js coop-lag.js lib/coop-lag-hooks.js from origin/review/robot10-coop) into detached game worktrees, assemble.py, `FLUSH=4 CAP=300 PCAP=1500 POSLOG=1 NEGTRAP=1 WORKER=<url> node dev/measure/robot10-coop.js 1 1 1 <outdir>`, two pairs at once (fix + main). RUN LONG JOBS AS HARNESS-TRACKED BACKGROUND (Bash run_in_background), NOT setsid nohup: an untracked job let the container be reclaimed at 13:05Z and the A/B was lost. Logs /home/user/wt/f4out (this container only).

### FIXER #5 (session_01N1tNP4vn55dxGBWKu7brhf, opus; START_CTX ≈6 %; Foreman B = session_01N1tNP3gUZjrKuYHpshM6n4)
PRIORITY #1 CHECK ('person range gp/ep / sucCap body / onecore c6 plant / roster friend / week-end stuck'): OD 2204–2205 | main dev/build/jbalpr.js? none (on fix-2 only), coop/worker/src/merge.js, jcoopworld.js toCanon / lockNext / nCheck, jkh.js khInit/khFit | review/* robot-coop-fix-2-r2-rv 0f8dd283 (start), robot-coop-fix-3 cd761689, robot10-onecore 6214e278, robot10-coop 5a65a561 | claims B fixer #4 → #5.
#### SSK review/robot10-onecore 4d063689 (= 6214e278 + LIVE d0ed42e4, FF; test-only: dev/measure/robot10-in.js + dev/tools/choice-value-scan.js)
| check | before | after |
|---|---|---|
| `choice-value-scan.js --numbers --numplant --turns 2` | robot10-in of 1a1d274e: 414 audited, only the num plant caught — **c6 plant (Sức +6 printed, WIN block suc 2) MISSED** | 6214e278 (and merged 4d063689): 432 / 443 audited, **both plants CAUGHT** (pend:__cvPlantC6 «Sức +6» vs suc=2 via __w) |
| `choice-value-scan.js --numbers --turns 60` (merged) | — | ONE-CORE NUMBERS PASS · 427 options audited · 0 lies |
Note (pre-existing, not this branch): the general CHOICE-VALUE line FAILs on main too — COST-ONLY 1 + DOMINATED fv7:newyear festival rows (11 on main's scan, 22 on this run; same family «Chuẩn bị kỹ rồi dự thi / Ghi tên, bỏ bạc mời thầy kèm trước» vs the plain entry; count/odds words vary by run). Law-2 owner of that family: festival worker, not co-op.
#### fix-2 r3 review/robot-coop-fix-2-r3 bbd98195 (from rv 0f8dd283 = r2 + LIVE d0ed42e4) — gates running
| r2 FAIL row | before (0f8dd283) | after (bbd98195) |
|---|---|---|
| 1 canonical gp/ep (merge3 W.R[] ep 3→0,1 / gp 95→100,99 / gp 5→0,1) | −2 / 104 / −4 | 0 / 100 / 0 (BAL.personRange.map.gp = stat.ghen, ep = stat.ev, references, range.test asserts equality) |
| 2 staff Sức (u3 save week 14, identity tool `--every`) | Nhâm Ngọc Hành 81→79 (59), Lão Hỉ Tử 90→83 (54) | none — Sức ≤ sucCap only on a BODY: BAL.personRange.body = ["W.R[]","P.*.S"] (jkh khInit/khFit run on S + rivals only; every sucCap caller in the game is one of them; servants/maids/kids/men 0…100 as jagstaff asSt/asAp). Why this side: the game is the rule; capping staff would invent a body model they lack (khScar never set, no monthly khFit → the Worker would still cut aged staff). Also: staff entries carry sid, no id → the Worker keeps one seat's staff array whole (never field-merged): the r2 «staff loyal» test row was a test-only shape |
| 3a scan: canonical renames | gp, ep MISSING → COOP-RANGE FAIL (46 fields) | every `x.<map>[pid]=` in jcoop*.js (rl ro gp ep evm cev; where = place string, exempt) OK → PASS (48 fields) |
| 3b identity guard | — | `node dev/tools/coop-range-identity.js [--every] [save…]`: u3 save + solo seeds 7/11/23 → 0 rewrites (Worker paths and --every) |
| 4 coop-worker.yml paths | coop/worker/** | + dev/build/jbalpr.js, jbal2.js, gen_coop_ranges.js |
Gates so far: Worker npm test ALL OK (merge/vault/seat/stale/thin/range) · keymove 12/12 · gen --check OK · coop-e2e 142/142 Fold-host + 142/142 iPad-host vs the branch Worker (:8797). Pending: quickcheck alone, A/B (fix-2 game+Worker vs main, 5 rounds).
#### fix-3 review/robot-coop-fix-3 f381dc0e (= cd761689 + LIVE d0ed42e4, index.html/sw.js rebuilt; not pushed yet) — gates running
coop-e2e 142/142 Fold-host + 142/142 iPad-host (local main Worker). Pending: quickcheck alone, A/B 5 rounds (harness 5a65a561 + stuck dump).
#### week-end stuck family — first finding
The stuck rows' `"next":true` is `#next.disabled` (SCR reads .disabled): BOTH seats have #next LOCKED at buổi 3 with bend/pend/pendBuoi off, Q 0, modal hidden, sent = week−1 — not «both enabled». Lock inputs left: nReady (night gate nrdy/ngo/nfr), waiting (ended), !base, CW.hold, gap. Harness (local, pushed with the A/B result to review/robot10-coop): every stuck room now writes stuck/<job>-r<n>-w<week>-<seat>.json = #next text + every lock input + night gate fields + COOP.state + COOPW trace tail.

#### FIXER #5 — update (~18:10Z)
- fix-2 r3 bbd98195: quickcheck alone FAIL on perf only (buổi 3591 vs live 1482; core gates PASS, old save ok) — the known buổi outlier family: rerun `node dev/tools/quickcheck.js --runs 6` (median of 6) as #4 did. A/B fix-2 (game + Worker :8797) vs main (:8798) round «b» was RUNNING (lost with this container) — rerun.
- fix-3: quickcheck alone PASS on f381dc0e (render 319/281, buổi 1715/1732, old save ok). A/B round «a» (5 rounds, CAP 300 PCAP 1500, harness 6576e086, local main Worker): coop-pos fix 1/5 (round 5: «guest sees host at r5, host is at r3» at buổi 6.0, her S.where r3 but the roster row r5) vs main 1/5 (round 3, 4 hits); save round-trip host 3/5 vs main 2/5; number bạc 2/5 vs 1/5 (fix-2 territory); stuck fix 0/5 vs main 1/5. → **r3 ebacc4d9 pushed (NOT gated)**: outermost whereOf answers for the friend with her relayed S.where (else friendPl; jagharm HA.here kept), and after every j95sync her roster rows are rewritten from S.where (approach / ag_see / rq / new plan all go through j95sync). Gates needed on ebacc4d9: coop-e2e both orders, quickcheck alone, A/B 5+5 → SSK.
- NEW review/robot-coop-fix-4 9c442f44 (from LIVE d0ed42e4, WIP, NOT gated) — week-end stuck family, first cause: stuck dump (A/B main-3, week 6, thin level 0): host nrdy 6 / ngo 6 / nfr 6 / **ngoW −1**, trace «ngo 6 · night 6 ×2 · attach · sendMe · state · seatresync · nready 6» = his life ended at tối (CAP kill) after he committed the night, the rebirth's sendMe reset cleared ngoW + nrdy but kept ngo → nGoNow / forceNight refuse forever; guest already `end`ed (ended.b, sent 6) → both «Chờ hảo hữu…». Fix: the reset clears ngo too; nCheck: host's own commit = his go. Test coop-night case 10 (ONLY=10; waits for nfr, asserts the commit, re-sends the life, host presses → one step for both). Before/after run (main vs fix-4, local main Worker) was RUNNING at rollover — rerun: `ONLY=10 node dev/test/coop-night.js <out> <worker>` on main (copy the test in) and on fix-4; then full coop-night, coop-e2e both orders, quickcheck, and runner STUCK rows on harness 6576e086 (the dumps tell whether other runner stucks — sent = week−1 on BOTH seats, thin level 5 on LIVE — are the same cause or a second one).
- Harness review/robot10-coop 6576e086 (test-only, pushed): stuck dumps. Runners may take it at their next boundary (Foreman B decides).
- Not started: (4) save round-trip renames staff: mechanism = jnamefix nmFix("load") runs on every deser; the scratch page is solo/owner, so a name clash the host has not swept yet (sweep = month end / join) is renamed on load → the round-trip diff. Check whether the live clash is real (two living people one name between sweeps = law 6b) or only a guest-seat artefact; A/B round «a» save rows have the detail. (5) tail N1–N3. (law 1) player maid «Đấm lưng / Xin thưởng / tiến cử» when the master is away.

### HANDOVER (FIXER #5 → FIXER #6; rollover by context: START_CTX ≈6 %, now ≈32 % of 1M)
- In review: robot10-onecore 4d063689 (SSK sent). SSK pending: fix-2 r3 bbd98195 (e2e 142/142 ×2, npm test ALL OK, keymove 12/12; needs quickcheck median-of-6 + A/B), fix-3 r3 ebacc4d9 (all gates again), fix-4 9c442f44 (before/after + gates).
- Box tools (lost on restart): wrangler /home/user/wt/wr; Workers :8798 main (f5main/coop/worker), :8797 fix-2 r3 (f5f2/coop/worker); A/B script /home/user/wt/f5out/ab.sh (SIDES / TAG env; worktrees f5abfix / f5abmain / f5abfix2 = game + harness overlay — run assemble.py in each first!). Long jobs = Bash run_in_background only.

### FIXER #6 (session_01N1tNP4TkcdjyymdxPqwSj5, opus; START_CTX ≈5 %; Foreman B = session_01N1tNP48H6M2nn3Y3SvKzBw)
PRIORITY #1 CHECK ('fix-2 r3 / fix-3 r3 / rkGid round-trip'): OD 2204–2205 | main coop/worker/src/merge.js, jcoopworld.js whereOf/j95sync | review/* robot-coop-fix-2-r3 bbd98195, robot-coop-fix-3 ebacc4d9, robot10-coop 6576e086 | claims B fixer #5 4vn55dxG → #6 (fix-4 = fixer #6b).
#### Merge LIVE 502c48c9 (both FF from the old heads; only index.html/sw.js conflicted → build_site.sh rebuilt)
- review/robot-coop-fix-2-r3 **71076b61** (= bbd98195 + LIVE 502c48c9); ranges.gen.js `--check` = BAL.
- review/robot-coop-fix-3 **32121242** (= ebacc4d9 + LIVE 502c48c9).
#### Gates (local Workers: :8797 = fix-2 r3 coop/worker, :8798 = main 502c48c9 coop/worker; wrangler dev)
| gate | fix-2 r3 71076b61 | fix-3 r3 32121242 |
|---|---|---|
| quickcheck ALONE `--runs 6` (median, new/live) | PASS · render 237/239 · tab 462/466 · **buổi 1311/1419** · tasks>200 23/25 · core gates PASS · time-spill PASS · old save ok (the r3 3591 was the buổi outlier: live runs here 4036 / 4501 in 2 of 6) | PASS · render 268/282 · tab 506/482 · buổi 1266/1592 · tasks>200 24/26 · core gates PASS · old save ok |
| coop-e2e COOP_SWAP=0 (Fold hosts) | 142/142 (:8797) | 142/142 (:8798) |
| coop-e2e COOP_SWAP=1 (iPad hosts) | 142/142 (:8797) | 142/142 (:8798) |
| Worker `npm test` | ALL OK (… range ok) | ALL OK (Worker = main) |
| coop-keymove-unit | 12/12 | 12/12 |
| coop-range-scan / identity / gen --check | PASS 48 fields · 0 rewrites (3 states) · = BAL | — |
| rv row 4 coop-worker.yml paths | done: coop/worker/**, dev/build/jbalpr.js, jbal2.js, gen_coop_ranges.js | — |
A/B (harness 6576e086 overlay, CAP 300 PCAP 1500 POSLOG NEGTRAP, 1 pair × 1 kiếp per round, 5 rounds per side, 3 sides in parallel; fix2 = fix-2 r3 game + fix-2 Worker :8797, fix3 = fix-3 r3 game + main Worker :8798, main = LIVE 502c48c9 game + main Worker :8798; room weeks per round fix2 3/4/5/5/4, fix3 2/4/2/3/3, main 2/3/2/4/4):
| row (rounds hit / 5) | fix2 | fix3 | main | read |
|---|---|---|---|---|
| number: bạc < 0 ARRIVED / out of range (merge) | **0/5** | 3/5 (−12, −79, −25) | 0/5 | main-Worker sides 3/10 vs clamp Worker 0/5 (history: 0/5 vs 1/5, 0/5 vs 3/10) → fix-2 holds |
| number: sung < 0 (guest, week 1) | 0/5 | 1/5 (−6) | 0/5 | same merge family, main Worker |
| coop-pos «X sees the friend at r5, she is at r2/r4» | 2/5 (n1, n17) | **0/5** | 0/5 | the fix2 side has NO fix-3 game code (= main's place rule): the family fix-3 closes still shows there; fix-3 0/5; runs are short (2–5 weeks) |
| coop-where (NPC places differ, buổi 5.0) | 1/5 (same round as its coop-pos) | 0/5 | 0/5 | rides with the coop-pos round |
| coop-stat friend Sủng/Danh/Sức one buổi late | 1/5 | 1/5 | 1/5 | equal on all sides — not these branches |
| save round-trip | 0/5 | 0/5 | 2/5 `save.P.0.pid: "kyngo" → undefined` | main only; → save round-trip family (queued) |
| stuck / pageerror | 0/5 | 0/5 | 0/5 | — |
SẴN SÀNG KIỂM review/robot-coop-fix-2-r3 71076b61 · SẴN SÀNG KIỂM review/robot-coop-fix-3 32121242 (both FF from LIVE 502c48c9).
#### rkGid row (Foreman B ask: U3 «save round-trip 16 (rkGid)» on harness 5a65a561)
The skip WORKS: 5a65a561 (and 7d0e9ffa on) skip `save.S.rkGid` in robot10-coop.js dp(). The harness keys a bug row by type + msg («save→load→save changes the state (host|guest)»), not by path, and keeps the FIRST detail; U3 p1-2 rows = first detail rkGid (old harness 0a593f8e, before RESUME), then **nNew 18 on 5a65a561 with lastDetail `save.R.0.rl.4: 7 → 5` (host) / `save.R.0.rl.2: 1 → 6` (guest)** — a different path. Not a harness bug; the count mixes families. NEW candidate: a consort's canonical relation map R[].rl[pid] changes on a solo load of a co-op save (same family as «save round-trip renames staff»: the scratch page is solo/owner → deser/nmFix/normalize rewrites co-op-keyed data). Harness note for runners: read lastDetail, not the first detail, for save rows after a harness switch.

#### FIXER #6 — update (~21:00Z): save round-trip family, harness, tail, law 1
Save round-trip family (main game, repro saves traced in a solo scratch page with setters on the loaded objects):
| row (path family) | cause (traced) | verdict |
|---|---|---|
| `P[].pid: "kyngo" → undefined` (A/B main 2/5, U14/U19/U20) | jky `PEND.kyngo=()=>null`: «a save made with a kỳ ngộ card open: the card is not rebuilt; the encounter stays used» | game BY DESIGN → harness skips it |
| `S.il.seq` +n | S.il.at is not saved → every load runs ilCensus (jil deser wrap); a piece pushed since the last census without an id (`p.inv.push({k,from:"th"})` in j8 / jagacts th:gift / jts / jrcp / jcui) gets its id now (trace: R[6].inv vongngoc from th) | lazy id, nothing lost → harness tolerates the counter move |
| `R[].resHall` / resHead / palLone (h1, U14/U17/U18) | guest save: her own S and an NPC (R[6]) BOTH in hall «dong» of host 2 → palFix→hallFix on load re-halls the NPC. On main her house never reaches the other seat (host places NPCs without her) | REAL (law 6b, two people one room); fix-3 r2 houseWire/houseIn relays her house → expected closed by fix-3; round «b» (fix-3 vs main, RTW=1) running to confirm |
| `R[].staff[].hue: 0 → undefined` (U15/U16/U18) | j10 new servant is made with `hue:0`; j17 ageInit deletes `hue` from every servant on load (dead field) | harmless; one-line game fix (drop `hue:0` in j10) — not done yet |
| `S.qPool[].name` / staff name renamed | jnamefix nmFix("load") on the solo scratch page = owner, sweeps clashes the room's host leaves until month end/join | open: needs a repro save (now kept per family) |
| `R[].rl[]` consort↔consort affinity changes (U3 18 hits) | not reproduced from the saved files (they hold the first hit's state) | open: needs a repro save (now kept per family) |
Harness **review/robot10-coop d4b4408d** (test-only, pushed): save rows keyed by the PATH FAMILY of the first difference (`save→load→save changes R[].rl[] (host)`), so each family has its own count + repro save (answers the U3 «16 (rkGid)» mix); PEND explicit drop + S.il.seq census move skipped. Checked: h1 run (main + RTW=1) → separate rows `S.il.seq` / `R[].resHall`; RT on the 4 repro saves: kyngo "" · il.seq "" · resHall still reported. Runners take it at their next boundary (Foreman B decides).
Tail N1–N3 → **review/robot-coop-tail 08dc8031** (from LIVE 502c48c9, test-only): N1 typeSpy __tx wire order (probe: main ["act","seat","pos","do"] → branch ["act","do","seat","pos"]); N2 e-net host filters → coop-wire hostNet (string + gzip: deaf drops do ×2 in order week/snap/buoi, holds thin ×2, mute drops do sends ×2), coop-wire-scan FAILs a string-only host filter (scan: 0 left); N3 coop-lag «stuck» only when the key did not move, early step = 0 ms. Gates pending: coop-thin-e-net + coop-lag vs a local main Worker.
Law 1 item (law1-audit row 10 + role-parity open «maid:beside N-ONLY») → **review/law1-maid-away 619642d7** (from LIVE 502c48c9): srvTalk «mis» uses srvMisHome() (= asMisHome): the four acts only while the master is in her palace, else «Hầu bên cạnh chủ». dev/test/maid-mis-away.js: main FAIL (away: 4 acts) → branch PASS. Gates pending: role-parity test (expect the open row to close → trim OPEN_MAX 13→12), quickcheck, coop-e2e.
Box note: background jobs end at 2 h — the local Workers (:8797/:8798) died at 20:2xZ; :8798 restarted, round «b» rounds 2–3 rerun.

### HANDOVER (FIXER #6 → FIXER #7; rollover by context: START_CTX ≈5 %, now ≈30 % of 1M)
- In review (SSK sent 20:0xZ): robot-coop-fix-2-r3 **71076b61**, robot-coop-fix-3 **32121242** (both FF from LIVE 502c48c9; gates + A/B table above). If main moves before the review: merge LIVE again, rebuild index.html/sw.js, re-run quickcheck alone, re-SSK.
- Pushed, NOT gated yet (do these next, in order):
  1. **review/law1-maid-away 619642d7** (game: j42 srvTalk «mis» + test maid-mis-away.js, PASS): run `node dev/test/role-parity.test.js` ALONE (it timed out at 1200 s while 3 robot pairs ran) — expect the open row maid:beside N-ONLY to close: then delete it from dev/tools/role-parity-open.json and lower OPEN_MAX 13→12 with a comment (law 14 canon overwrite); then quickcheck alone, coop-e2e both orders (local main Worker), old save → SSK.
  2. **review/robot-coop-tail 08dc8031** (test-only N1–N3): run `node dev/test/coop-thin-e-net.js <out> <worker>` (reviewer saw RESULT 21/21 on main) and `node dev/test/coop-lag.js …` once vs a local main Worker; coop-wire-scan 0 left → SSK.
  3. Round «b» (fix-3 vs main, harness d4b4408d, CAP 600 RTW=1, 3 rounds each; rounds 1 done in /home/user/wt/f6out/b-*-1 of THIS container, rounds 2–3 were running) — lost with this container: rerun 3+3 to confirm `R[].resHall` rows are gone on fix-3 (append to fix-3's review notes; Foreman B may pass it to the fix-3 reviewer).
  4. Save round-trip family (table above): get repro saves for `R[].rl[]` and `S.qPool[].name` from runs on harness ≥ d4b4408d (each family keeps its own repro save now), trace the writer by setters on the loaded objects (probe pattern: define a setter on d.R[i].rl / name before `deser(d)`, log the stack); `staff.hue` one-line game fix (j10 drop `hue:0`) can ride with that branch.
- Box tools (lost on restart): wrangler `npm i wrangler@4` in /home/user/wt/wr; Workers via `wrangler dev --port 8798 …` in a main worktree's coop/worker (a Bash background job dies at 2 h — restart it before long runs); A/B script /home/user/wt/f6out/ab.sh (env TAG START ROUNDS CAP RTW SIDES="<wt>:<port>:<name> …", worktrees = game + harness overlay, run assemble.py first); probes /home/user/wt/f6out/{rtprobe,trap,trap2,trap3,rttest,n1probe,n2probe,misprobe}.js (serve a built worktree with `python3 -m http.server 8811`).

### FIXER #7 (session_01N1tNP3fqMhAjzz59xaXXqg, opus; START_CTX ≈4 %; Foreman B = session_01N1tNP3HSiyh7FYx9Ezn8vr)
PRIORITY #1 CHECK ('law1-maid-away / robot-coop-tail / save round-trip'): OD 2204–2205 | main 502c48c9 j42 srvTalk, j10 newServ, j17 ageInit | review/* law1-maid-away 619642d7, robot-coop-tail 08dc8031, robot10-coop d4b4408d, robot10-coop-saves cfcfd5de | claims FIXER #6 → #7 (week-end STUCK = #6b).
#### review/law1-maid-away → **63d72694** (= 619642d7 + role-parity trim; LIVE 502c48c9 unchanged)
| gate (local main Worker :8798 = main 502c48c9 coop/worker, wrangler dev) | result |
|---|---|
| `node dev/test/role-parity.test.js` ALONE (619642d7 build) | ALL PASS · note «open-list entries now closed: maid:N-ONLY:maid:beside» → row deleted from dev/tools/role-parity-open.json (13 → 12 rows), OPEN_MAX 13 → 12 with comment (law 14) |
| `node dev/test/maid-mis-away.js` | MAID-MIS-AWAY PASS, no page errors |
| `bash dev/tools/quickcheck.sh` ALONE | QUICKCHECK PASS · old save ok · perf median of 3 new/live: render 308/264 · tab 552/541 · buổi 1623/1537 · tasks>200 25/26 · core gates PASS |
| coop-e2e COOP_SWAP=0 (Fold hosts) | 142/142 |
| coop-e2e COOP_SWAP=1 (iPad hosts) | 142/142 |
SẴN SÀNG KIỂM review/law1-maid-away 63d726941059afd8e134f692609e30eed30b2d24
#### review/robot-coop-tail 08dc8031 (test-only N1–N3; branch unchanged)
| gate | tail 08dc8031 | main 502c48c9 (same game; main's test files) |
|---|---|---|
| `node dev/test/coop-wire-scan.js` | string-only deaf filters / rx spies left: 0 | — |
| `node dev/test/coop-thin-e-net.js http://127.0.0.1:8798` (swap 0) | RESULT 21 / 21 | — |
| `node dev/test/coop-thin-e-net.js http://127.0.0.1:8798 6 1` (swap 1) | RESULT 21 / 21 | — |
| `node dev/test/coop-lag.js` (LIVE Worker; a local `wrangler dev` Worker is unreachable from coop-lag: it launches with PP.LAUNCH_ARGS only, without coop-e2e's localhost private-network flags → room never opens, Timeout at line 49) | run 1: 8/8 turns ok, early steps 0 ms, FAIL budget turnP95 56 629 (a week-end turn), actionP95 8 907, longTaskMax 12 174 · run 2: 8/8 ok, FAIL turnP95 **1 210 095** (week 0 → 1 took 20 min, then moved) | 7/8 ok · turn «0:0 → 1:0» = **−3177 ms** and «buổi stuck: 1 of 8» = exactly the N3 false stuck the branch fixes · turnP95 6 738 |
| rejoin (both sides) | ok:false ×2 | ok:false |
Read: N3 behaves as designed (early step = 0 ms, a key that moves is not «stuck»; a real long stall still FAILs through coopTurnP95). The budget FAIL and rejoin ok:false are the GAME (LIVE 502c48c9 on both sides, not this test-only branch): the 20-min week-end stall belongs to the week-end STUCK family (FIXER #6b); rejoin ok:false on main too → flagged to Foreman B. Harness note (not fixed here): coop-lag cannot use a local Worker (missing the coop-e2e localhost launch args).
SẴN SÀNG KIỂM review/robot-coop-tail 08dc80311255b60ea30cc821c466d5e0b62a1668

## MGSKIN-WIRE
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main kitMgSkinAdd/mgpSkin/kg82SkinSrc (j82, jmgpool; reused, no new mechanism) | review/* review/kit-mgboardof-r1 c46a17f2 (merged, not LIVE yet) | reports F-MGSKIN-A..H, kit-mgskin.
START_CTX ~6 % (own estimate); finished well under +25 %.
**SẴN SÀNG KIỂM review/mgskin-wire 53e3b70b9ad240dbbcf4b6a82f96d7ee9e42a776** (from origin/main 27240ccb4 + merge of review/kit-mgboardof-r1 c46a17f2 — NOT LIVE yet, merged per Foreman B; land kit-mgboardof first or together).
### What changed (4 code files + 2 tests)
- NEW dev/build/jmgskin.js (assemble.py: right after j82.js): ONE table MGSKIN_NAMES (32 kinds with Foreman F's own names, 4 seasons: xuan dao · ha ngoc · thu kim · dong mac) + MGSKIN_OF {td_cong→theu, td_hanh→ve, le→huong, tc→banh, hoadien→chai} registered through kitMgSkinAdd. kinh/may follow «ve» via KG82_BOARDOF. All 39 KG82_KIND kinds = default + 4 skins. No per-board code, no private CSS, no BAL number.
- Files are named by the BOARD a kind plays (kg82BgName), so xa→doi, thq/td_dung→mua, td_ngon→tho, td_cong→theu need no mapping code (F's WIRING NOTE satisfied by the resolver itself). Sprites with painted files (hoa-vase, banh-pot, huong-censer, doden-lantern, mua-fan, mua-mat, ve-inkstone…) follow the skin everywhere they are drawn; sprites with no file = today's art.
- dev/build/jts.js: duho/den boards (TS_IMG override) ask the kit resolver first (img/mg/tsduho-<id>.webp / tsden-<id>.webp); no skin / file not on the CDN index / load error = the event painting (img/ev-le-ha, img/ev-le-thu-2).
- dev/build/jmgpool.js mgpSkin: pick = default + registered skins, fresh-first through the shared memory (mgskin:<kind>:<skin>) AND not shown yet this life (same two-step as mgpOne). Before, one life could draw the same skin 3× in a row.
- Skin NAMES are stored by the kit but not shown to the player anywhere today (no player-visible wording added; law 7 untouched).
### Checks (all on the built index.html of 53e3b70b)
- CDN: HEAD 200 for all 152 img/mg files (38 board/sprite families × 4 ids); all on img/_index.json. Missing keys: NONE → no FOR MAIN 116 art lines. (hoadien/kinh/may have no board of their own: inherit, nothing to paint.)
- NEW dev/test/mgskin-wire.js ALL PASS 70 (Fold + iPad): 39 kinds × 5 skins, palettes, names, every skinned file reachable is on the CDN index, unpainted id = today's art, duho/den resolver + fallback, 5 draws = default + 4 skins once each + written to the memory, real frames (Thử tay → Sẵn sàng) on 10 boards incl. duho, den, kinh, may, thu_tam (DOM) load the skinned picture, default frame = today's art, no page errors.
- dev/test/kit-mgskin.js ALL PASS (test now clears the game's registry at start so the kit fixtures own their kinds). mg-allkinds PASS 13/13, mg-pool / -b / -c ALL PASS, undef-scan PASS (299 names).
- bash dev/tools/quickcheck.sh = QUICKCHECK PASS (core gates, own build, old save loads + plays a buổi, perf render 297/325 · tab 541/560 · buổi 1700/3552 ms new/live). A first run failed perf buổi 3420 vs 1360 — the LIVE build itself swings 1360↔3552 ms on this box; re-run PASS (noise).
- Shots (scratch, not in git, Fold 755x1000 + iPad 1180x820 full screen, looked 3×): dan·xuan, duho·ha, den·thu, kinh·dong, may·xuan, tat·ha, tho·thu, thu_tam·dong, ne·xuan, huong·ha — boards show the seasonal painting in the real frame (snow on kinh dong, spring blossoms on may/dan, autumn lanterns on den…), layout/play area unchanged, nothing cut.
### Notes for the reviewer
- The skin of a canvas board is chosen when the frame opens; duho·ha looks close to its default (summer lake already). tho·xuan is close to default by F's note.
- Seasonal skins are drawn at random per open (no tie to the game calendar) — as the order says; tying to the season is a separate owner decision, not done.
- Old save: quickcheck old-save step PASS (loads and plays a buổi).

## REVIEW thin-p4 r2 (bounce by LC9 05:34Z: no-arg play tests failed on the branch head)
- WHY r1 passed: r1 ran j68c-play / kyc-play only WITH the 460 / 77 seed files as arg, never with no arg. The default fixtures (dev/test/j68c-fixture.jsonl, kyc-fixture.jsonl) kept the ids the engine gave them before the fold (j68c-<fam>-001, kyc-ma/de/sv/vat-001) = the ids of real built seeds after the fold, so the no-arg run played the BUILT seed and checked the FIXTURE's numbers → 27 + 1 FAIL. Reproduced on the r1 head (J68C PLAY: 27 FAIL (9 comps, 3 forced)) before the fix.
- FIX (law 11, whole family): fixtures get their own ids (j68c-fx-*, kyc-fx-*); both play tests now FAIL loudly («id collides with a different built seed») when a file row reuses a built id with other content — checked with the old fixtures: every colliding row FAILs with that message. Every thin *-play test run with NO arg below (j68c, kyc, j7c, j72c, mg-pool, mg-pool-b, mg-pool-c) and the seed files as arg.
- Branch **review/thin-p4-r2 @ 7429bfa3** = review/thin-p4-r1 4243006e + fixture fix + LIVE 68799300 (thin-p3 landed: jbal2 keeps BAL.j68c + BAL.j72c; j72.js = LIVE incl. q72Choose, not touched by this branch).
- GATES on 7429bfa3 (exact commands → last line):
  - `node dev/test/j68c-play.js` → exit 0 · J68C PLAY: ALL PASS (9 comps, 0 forced, 460 built)
  - `node dev/test/j68c-play.js <scratch>/j68all.jsonl` → exit 0 · J68C PLAY: ALL PASS (460 comps, 154 forced, 460 built)
  - `node dev/test/kyc-play.js` → exit 0 · KYC PLAY: ALL PASS (4 played, 0 skipped: no real piece/person of that sort in this one world)
  - `node dev/test/kyc-play.js <scratch>/kyall.jsonl` → exit 0 · KYC PLAY: ALL PASS (74 played, 3 skipped: no real piece/person of that sort in this one world)
  - `node dev/test/j7c-play.js` → exit 1 · J7C PLAY: 6 FAIL
  - `node dev/test/j72c-play.js` → exit 0 · J72C PLAY: ALL PASS (4 seeds, 256 built; cast from the fresh life 4, forced cast 0)
  - `node dev/test/mg-pool-play.js` → exit 0 · ok   no page errors
  - `node dev/test/mg-pool-b-play.js` → exit 0 · ok   no page errors
  - `node dev/test/mg-pool-c-play.js` → exit 0 · ok   no page errors
  - `node dev/test/undef-scan.js` → exit 0 · PASS: no unguarded undefined identifier (300 names checked)
  - `node dev/test/one-core-guard.js` → exit 0 · PASS: one core (no second value, no typed core text, no new inline rule number)
  - `node dev/test/kyngo-eq.js` → exit 0 · PASS (eqTol 1.25)
  - `node dev/test/norep-unit.js` → exit 0 · NOREP UNIT: ALL PASS
  - `node dev/test/norep-oldsave.js <scratch>/live0.html` → exit 0 · NOREP OLDSAVE: ALL PASS
  - `node dev/test/ky-keeper-f2.js` → exit 0 · PASS
  - `python3 dev/test/j68seeds_validate.py --min` → exit 0 · j68seeds: day 63c/16o, visit 64c/16o, serv 60c/16o, emp 60c/16o, sea 44c/21o, court 43c/20o, rumor 42c/15o, kid 42c/18o, myst 42c/14o — 0 errors, 0 warnings
  - `python3 dev/test/kyseeds_validate.py` → exit 0 · kyseeds: de 10, ma 16, sv 23, th 14, vat 14 = 77 — 0 errors, 18 warnings
  - `node dev/test/kyngo-unit.js http://127.0.0.1:8765/index.html` → exit 0 · PASS
  - `node dev/test/coop-e2e.js <out>` (Fold hosts) → exit 0 · 142/142 passed
  - `COOP_SWAP=1 node dev/test/coop-e2e.js <out>` (iPad hosts) → exit 0 · 142/142 passed
  - `bash dev/tools/quickcheck.sh --runs 7` → exit 0 · QUICKCHECK PASS · 552 s · open 1941 ms · old save ok · perf (median of 7, new/live): render 238/260 ms, tab 458/452 ms, buổi 1193/1416 ms, tasks>200ms 23/24 · core gates PASS · build 3 s · total 946 s
  - j7c-play (LIVE P2 test, no j7 file touched here): the first no-arg run above printed «J7C PLAY: 6 FAIL»; detail not kept; 9 reruns ALL PASS (1 of 10). Flaky, not reproduced; flag for the P2 owner.
- LIVE moved to 35647d5e (kframe-heir) after these gates: source merge is clean (only built index.html/sw.js conflict = rebuild). I re-merge on request.
- **VERDICT r2: PASS 7429bfa3**

## REVIEW thin-p8 r1
PRIORITY #1 CHECK: reused review/thin-p8 @ce252c43 + LIVE origin/main 68799300; tools dev/test/rdc-play.js / rdseeds_validate.py / rdc-oldsave.js / rdc-shots.js from the branch; no duplicate work found in OWNER_DECISIONS / HANDOVER / PROGRESS / origin/review/*.
IN PROGRESS (full report follows). Branch review/thin-p8-r1 @4d9f748c (contains LIVE 68799300).

### Road play split (Foreman B 07:07Z: one helper runner takes the second half)
Reviewer cannot send_message the new foreman / helper (permission denied) — this section is the hand-off.
- Build: `git checkout 4d9f748c` (review/thin-p8-r1), `bash dev/site/build_site.sh`.
- Rows file: `cat dev/handover/content/thin/rdseeds_{a,b,c,d}.md > /tmp/all.md` (rows already in the build; the file only names the roads).
- Command (max 2 at once, renderer ~5–7.6 GB): `RDC_STOP12=1 node dev/test/rdc-play.js /tmp/all.md 1 <roads>`
- PASS line per road: `<road> life 1 12 … | 4:<road> 5:<road>_5 … 11:<road>_11`; any `FAIL` line = fault. A `page lost … Target crashed` retry is OOM; 3× → `FAIL … boot`.
- HELPER roads (20): `td_daixa,td_monsinh,ch_tuyentu,ch_diensan,nc_men,nc_nu,bd_luuly,bd_bac,pf_co,pf_tra` and `td_tichbien,td_honuoc,ch_lenhbai,ch_honngoai,nc_kinh,nc_the,bd_lua,bd_su,pf_guong,pf_lich`. Append results below under «#### helper».

Batch 1 (helper, 07:54Z; build 4d9f748c, `RDC_STOP12=1 node dev/test/rdc-play.js all.md 1 <roads>`, 2 renderers; `Target crashed` retries = OOM, recovered by the runner):
- PASS td_daixa life 1 12 | 4:td_daixa 5..11 (fin=Chiếu đọc, không có tên)
- PASS td_tichbien life 1 12 | 4..11 (fin=Sổ kho bị khép)
- PASS td_honuoc life 1 12 | 4..11 (fin=Nàng tự quyết)
- PASS ch_lenhbai life 1 12 | 4..11 (fin=Lệnh bài giả bị nấu chảy)
- No FAIL so far. Remaining 16 roads still running.

Batch 2 (helper, 08:52Z; same build/command; every line = life 1 12 | 4:<road> 5..11:<road>_N all present):
- PASS td_monsinh (fin=Không ai nhận thầy)
- PASS ch_tuyentu (fin=Họ ngoại có chỗ đứng)
- PASS ch_diensan (fin=Họ ngoại mất ruộng)
- PASS nc_men (fin=Lò men được tha)
- PASS nc_nu (fin=Nàng về nước bình yên)
- PASS ch_honngoai (fin=Hôn sự thành, nàng oán)
- PASS nc_kinh (fin=Hội kinh gây phiền)
- PASS nc_the (fin=Em bị trả về)
- Total helper PASS 12/20, FAIL 0. Running: bd_luuly, bd_lua; then bd_bac,pf_co,pf_tra / bd_su,pf_guong,pf_lich.

Batch 3 (helper, 09:55Z; FINAL; same build 4d9f748c / command; the first two runners hit the harness 2 h cap, which killed them (2× `FAIL browser.newContext … closed` at the end of those logs = the kill, not a road fault); the last 5 roads were re-run in fresh runners: `ALL PASS (45)` and `ALL PASS (31)`):
- PASS bd_luuly (fin=Thợ bị từ chối)
- PASS bd_lua (fin=Lò được giữ)
- PASS bd_su (fin=Thú được giữ)
- PASS bd_bac (fin=Nợ bị siết)
- PASS pf_co (fin=Y ở lại kinh thành)
- PASS pf_guong (fin=Gương về đền Thần)
- PASS pf_lich (fin=Lịch và áo ngang hàng)
- PASS pf_tra (fin=Hộ bộ nghi cung ngươi)
- HELPER TOTAL: 20/20 roads PASS (life 1, chapters 4..11 all present), 0 road FAIL. OOM `Target crashed` retries were recovered by the runner each time.
- REVIEWER roads (24): PASS so far tt_ruong, tt_tho, dtq_ngua, dtq_thuong, thd_dich, thd_uoc, muoi_gia, tt_gia, tt_thu; running muoi_thi, dtq_ky; then cn_chuoi, cn_chuviet, cnv_kho, cnv_hach, thd_dien, thd_giay, muoi_tien, muoi_hoi, cn_tiec, cn_theo, cnv_thu, cnv_tieu; dtq_hang re-run alone (renderer crash ×3 at ch9).
- Gates already PASS on bare ce252c43 AND merged 4d9f748c: `python3 dev/test/rdseeds_validate.py` (no args) and `--min` + rdseeds_a..d → `RDSEEDS: 627 rows, 0 errors, 0 warnings`; `node dev/test/undef-scan.js` → PASS (299 names); `node dev/test/one-core-guard.js` → PASS; `node dev/test/one-core-text.js` → PASS.

#### helper

## REVIEW robot-coop-fix-1 (BIG, opus; session_01N1tNP2…; START_CTX ≈6 %) — A FAIL · B FAIL
PRIORITY #1 CHECK ('coop sync KB / gzip BIG / coop-pos harness'): OD 2204–2205 | main coop/worker/src/index.js (BIG 200000), dev/build/jcoop.js (rxQ + gunz, GZ 8000), dev/test/coop-lag.js | review/* robot-coop-fix-1 889803dc, robot10-coop 2bf6094f, robot10-coop-r1 6a6413db, coop-host-lag-r3 (landed) | claims B (fixer #2 session_01N1tNP3va8MrNMqi1MZLTgt).
Heads: A bare 889803dc, A merged bb220d9e (= 889803dc + LIVE 0c0877a2, local, not pushed). B bare 2bf6094f, B merged 367b7a36 (= robot10-coop-r1 6a6413db + 2bf6094f + LIVE 0c0877a2, local, not pushed). Game build identical on both merged heads (assemble 15077030). Workers: fix = local `wrangler dev` of 889803dc on :8799, main = local `wrangler dev` of origin/main on :8798.
Laws touched: 4/7/9/10/12 not touched (no game, UI or wording change). 11 (fix the whole group): FAIL for A and B, below.

### A) review/robot-coop-fix-1 889803dc — FAIL
| check | command | result |
|---|---|---|
| Worker unit tests (mock DO) | `node test/{merge,vault,seat,stale,thin}.test.mjs` (coop/worker, merged head) | merge ok · vault ok 48 · seat ALL OK · stale ALL OK · thin ALL OK |
| Worker protocol, live socket | `node test/ws.test.mjs http://127.0.0.1:8799` + `chat.test.mjs`; same on :8798 | ALL OK / ALL OK on both Workers |
| frame order + decode (probe, ordered reader like rxQ) | scratch probe: host init 20 KB state, guest joins | fix: state=bin, room=bin, order room→presence kept; main: all text. An UNORDERED reader (no rxQ) sees presence BEFORE room on the fix Worker = the old "late room snapshot" race; the game client has rxQ (jcoop.js:58) on every path (one connect()/rx() for host, guest, rejoin), so OK; only a pre-rxQ build still open in a tab would see it (rare, reload fixes) |
| coop-e2e merged, seat order 0 / SWAP=1 | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799` (+ COOP_SWAP=1) | 142/142 · 142/142 |
| coop-e2e bare, 0 / SWAP=1 | same on 889803dc | 142/142 · 142/142 |
| coop-lag before/after (merged, 5 buổi, CPU 4, --no-rejoin, both runs in parallel = box loaded) | `PP_ARGS=… node dev/test/coop-lag.js --buoi 5 --worker http://127.0.0.1:879{8,9} --out …` | coopSyncKBMax 129.6 → 26.5 · coopKBPerMin 103.1 → 81.1 · coopResendPerMin 2.4 → 3.2 (noise) · coopTurnP95 53.7 s → 62.6 s (both far over 10 s; client CPU, pre-existing, fixer's triage stands) · exit FAIL on both (turn/action/long-task budget, pre-existing) |
| deaf-thin family (law 11) | `OUT=… node dev/test/coop-thin-f2.js http://127.0.0.1:879{9,8} 7 0` | **fix Worker 26/27 FAIL · main Worker 27/27** |
FAIL list for the fixer:
1. coop-thin-f2 L7 P10 «net loss (the host's answer lost)» FAILS on the fix Worker (PASS on main): g1 = {pend:false, place:"vuon", lostV:1} — the test's "deaf" filter drops only STRING delta/snap frames (`typeof ev.data==='string'&&/"t":"(delta|snap)"/`); with BIG 8000 the host's snap/delta above 8 KB now arrive as gzip binary, slip through the filter and deliver the answer, so the simulated loss is not a loss. The game is fine (a dead socket drops every frame); the TEST FAMILY is blinded by this branch.
2. Same family, fix all of it (law 11, scan script + before/after table): every test with the string-only `__deafThin` filter — coop-thin-f2, coop-thin-f3, coop-thin-f4, coop-relms-both, coop-arrive-see, coop-places, coop-palace-life, coop-hl-faces, coop-thancan, coop-ge-npc — and every string-only rx spy that counts types (`__rxT`: coop-thin-a «no snap/delta on the wire» now a false PASS, coop-thin-d, coop-thin-d-probe, pm-coop-d). The deaf filter must stop binary frames too (it cannot gunzip synchronously: e.g. while deaf, hold every binary frame and re-deliver the non-delta/snap ones after an async gunzip, or drop binary frames while deaf and prove the test still means what it says); the spies must gunzip binary frames before counting. Run each changed test on the fix Worker AND on main's Worker.
3. Keep the rest as is (Worker line, coop-lag --trace/--prof): green.
Not run (FAIL already): quickcheck / old save (no game file in the diff; fixer's run stands), trip1 (not present).
Deploy note for the next LAND READY: the Worker auto-deploys on land (.github/workflows/coop-worker.yml).

### B) harness review/robot10-coop 2bf6094f → robot10-coop-r2 — FAIL
| check | command | result |
|---|---|---|
| diff scope | `git diff 48d1d7e1 2bf6094f --stat` | dev/measure/robot10-coop.js, dev/test/coop-bot.js, dev/test/coop-bot-x.js only (no game / Worker file) — OK |
| merge r2 | robot10-coop-r1 6a6413db + 2bf6094f + LIVE 0c0877a2 | clean, 367b7a36 (local) |
| coop-e2e merged 0 / SWAP=1 | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8798` (+ COOP_SWAP=1) | 142/142 · 142/142 |
| coop-bot.js with args, bare / merged | `node dev/test/coop-bot.js 4 <out> http://127.0.0.1:8798` | bare 4/4 weeks, pos mismatch 0 (no visit happened) · merged 4/4, **pos mismatch 1: «3.1 A sees B at r2, B is at H:a»** |
| coop-bot-x.js with args, bare / merged | `node dev/test/coop-bot-x.js 4 <out> http://127.0.0.1:8798` | 4/4, 0 mismatches · 4/4, 0 mismatches |
| coop-bot.js NO args (52 weeks, LIVE Worker), bare / merged | `node dev/test/coop-bot.js` | bare: stuck week 7 (both «Chờ hảo hữu… (off)», A Q=2 dialogs), **pos 1: «0.0 A sees B at H:a, B is at H:b»** · merged: stuck week 20 (A pend, Q=6 chapter dialogs; B Q=0), 84 buổi compared, **pos 2: «18.3 / 19.3 B sees A at H:a, A is at H:b»** |
| coop-bot-x NO args, robot10-coop.js | — | not run (FAIL already; a 52-week LIVE run ≈ 1 h each) |
FAIL list for the fixer:
1. Law 11: the place-name family is not closed. 2bf6094f maps only `'home'` and `palaceOf(friend)`; a player who lives in a house head's palace (houseOf ≠ self: low rank → resHead) is `'home'` on her page but `r<head id>` on the friend's page (j9 palaceOf), and a player living in the FRIEND's palace is `'home'` on her page and `'home'`/H:<friend> on the other. Seen: «3.1 A sees B at r2, B is at H:a» (B visiting A's house, A not house head), «0.0 A sees B at H:a, B is at H:b» (first buổi, B resident in A's palace?). Name every place by its physical palace on both pages (house head key via houseOf/resHead, players' own palaces H:<seat>) and re-run.
2. «18.3 / 19.3 B sees A at H:a, A is at H:b» (merged LIVE run, after B's two rebirths): two buổi in a row, so not the 5 s relay race. Triage game vs harness (A visiting B's palace while B's page keeps A at home: maybe the pos relay / mapPlace after a rebirth) before the next "SẴN SÀNG KIỂM".
3. Pre-existing (NOT this diff, report only): coop-bot STEP stalls with open dialogs (bare week 7 Q=2 «Lời cảnh báo, Việc nhờ»; merged week 20 Q=6 chapter dialogs) on the LIVE Worker — same on bare (old game 27240ccb) and merged; the robot10-coop runner will hit it too (stuck → bug + fresh room).
Worktrees (this box): /home/user/wt/{fix1r1,bfix,rc2,bharn}; logs in the reviewer's scratchpad (e2e/, thin/, bot/, lag/).

## REVIEW robot-coop-fix-1 r2 (BIG, opus; session_01N1tNP2xZQymfgL6TKgMEcP; START_CTX ≈6 %) — PASS
PRIORITY #1 CHECK ('deaf filter / rx spy / gzip BIG'): OD 2204–2205 | main coop/worker/src/index.js BIG 200000, dev/build/jcoop.js rxQ+gunz (one connect()/rx() path) | review/* robot-coop-fix-1 889803dc (r1 FAIL A), robot-coop-fix-1-r2 a0ac174a | claims B fixer #3. Reused the fixer's scan + lib; nothing rebuilt.
Heads: bare a0ac174a (main fd85907a + 919b2f35 + a0ac174a). Merged #1 9a8fe5ba (+ LIVE ac4790f0, local). Merged #2 a830c1d4 (+ LIVE d521656c test-mrfoot/kit-framefit; clean auto-merge, no overlap with the 14 tests; local). Merged #3 = PASS head **15b5e1ff89621267373250687dcc057a5f0790f8** (a0ac174a + LIVE c6c3ca76 net-build; clean, no co-op/Worker file in that LIVE step; pushed as review/robot-coop-fix-1-r2-rv). Workers: fix = local `wrangler dev --local` of the branch on :8799, main = local `wrangler dev` of origin/main on :8798.
Laws: 4/7/9/10/12 not touched (no game, UI, wording, number). 11 (whole family): PASS (below).

| # | check | command | result |
|---|---|---|---|
| 1 | law-11 scan, before / after | `node dev/test/coop-wire-scan.js` on main (scan copied in) / bare / merged | main **14** string-only (10 DEAF + 4 RX) exit 1 → bare **0** exit 0 → merged #1 / #2 **0** exit 0 |
| 1a | my own wider scan (not the fixer's regexes) | grep every dev/test, dev/test/lib, dev/measure file for WebSocket / routeWebSocket / framereceived / typeof data==='string' | extra hits, all type-agnostic or tx-side: routeWebSocket proxies (coop-emo-seat, coop-one-world-play, coop-rejoin-stats, coop-sleep, coop-timer-lag) pass any frame untouched; lib/coop-lag-hooks logs binary as 'bin' + size (resend counts UP frames only, BIG changes DOWN frames only); __wsDeaf (coop-e2e, -tr, coop-errand, coop-ban-cung, coop-pool-face, coop-room-faces, coop-ton-row, or20-j68q-coop, show-why-coop) drops every frame of any type |
| 1b | «left by design» | read code + Worker | tx-only spies (coop-thin-b/-r1/-r3): own sends, debug context only, no assertion; client GZ 8000 unchanged by this branch → OK. coop-thin-e-net host deaf on relayed "do"/"thin": `thin` = {lvl,was,cap} tiny; a relayed `do` CAN reach 20000 (Worker DOMAX) and would go binary > 8000 now, but e-net's ops are taps (small): RESULT 21/21 on fix + main Worker. Note only (see N2) |
| 1c | lib logic, independent probe (fake server, routeWebSocket, string + gzip frames) | scratch wire-probe.js | guestNet: not deaf → all 4 delivered in order; deaf → gzip snap, string delta, gzip delta dropped (lostV 3), presence/week/buoi kept, wire order kept through the async gunzip, order kept after undeaf → `ok`. typeSpy: __rxT ["room","presence","week","buoi"] in wire order incl. 2 gzip frames; __tx counts the gzip send → `ok` |
| 2 | gzip decoded on every client path | read jcoop.js:52–80 + history | ONE socket path: connect() → s.binaryType=arraybuffer, s.onmessage → rxIn → rxQ → rx() → gunz for any non-string frame; host, guest, rejoin, reconnect all use it. gunz since the first co-op client 1adb5502 (14/11); rxQ since 0184f64d (20/11). A client older than 20/11 still open in a tab decodes but unordered (r1 note: rare, reload fixes). No undecodable client exists |
| 3 | Worker unit tests (bare + merged) | `node test/{merge,vault,seat,stale,thin}.test.mjs` | merge ok · vault ok 48 · seat ALL OK · stale ALL OK · thin ALL OK (both heads) |
| 3a | Worker live socket | `node test/ws.test.mjs http://127.0.0.1:879{9,8}` + chat.test.mjs | ALL OK / ALL OK on both Workers |
| 4 | coop-thin-f2 L7 (r1 FAIL A) | `node dev/test/coop-thin-f2.js http://127.0.0.1:879{9,8} 7 0` | merged #1 fix **27/27** (P10 «host's answer lost» ok, lostV 1) · main 27/27 · bare fix 27/27 · merged #2 fix 27/27 · main 27/27 |
| 4a | the 14 changed tests + e-net, merged #1, fix vs main Worker | `node dev/test/<t>.js http://127.0.0.1:879{9,8}` | f2 27/27·27/27 · f3 38/38·38/38 · f4 19/19·19/19 · relms-both 15/15·14/15¹ · arrive-see 89/90²·90/90 · places 19/19·19/19 · palace-life 19/19·19/19 · hl-faces rooms 6 bad 0 (6 EXC³)·same · thancan 10/10·9/10¹ · ge-npc 10/10·10/10 · thin-a 18/19¹·16/19¹ · thin-d 52/53³·52/53³ · d-probe 35/35·35/35 · pm-coop-d 33/35³·33/35³ · e-net 21/21·21/21 |
| 4b | bare a0ac174a, fix Worker | same | f2 27/27 · f3 38/38 · f4 19/19 · relms 14/15¹ · arrive-see 90/90 · places 17/19¹ (rerun 19/19 ×2) · palace-life 19/19 · thancan 6/10¹ (rerun 9/10, 9/10; same T1 row on main Worker 9/10, 10/10) · ge-npc 10/10 · thin-a 18/19¹ · thin-d 53/53 · d-probe 34/35 (CDN _index.json CORS console line, network) · pm-coop-d 33/35³ · e-net 21/21 · hl-faces rooms 6 bad 0 |
| 4c | merged #2 (newest LIVE d521656c), fix Worker | same | f2 27/27 (main Worker 27/27) · f3 37/38¹ (X1 gift; rerun fix 38/38 ×3, main's own test on main Worker 38/38 ×2) · f4 19/19 · relms 15/15 · arrive-see 90/90 · places 19/19 · palace-life 19/19 · thancan 10/10 · ge-npc 10/10 · thin-a 18/19¹ · thin-d 51/53³ · d-probe 35/35 · pm-coop-d 34/36³ · e-net 21/21 · hl-faces rooms 6 bad 0 (6 EXC³) |
| 4d | no args (LIVE Worker), merged #1 | `node dev/test/coop-thin-f2.js` · `node dev/test/coop-thin-a.js` · `node dev/test/coop-wire-scan.js` | 27/27 · 19/19 · 0 left |
| 5 | coop-e2e both seat orders, fix Worker | `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799` (+ COOP_SWAP=1) | merged #1 142/142 · 142/142. bare 141/142 ×2 while 3 other suites ran (R#9.evR world row / week after rebirth) → alone 3× fix 142/142, 3× main 142/142. merged #2 142/142 · 141/142 (fold «friend starts as Người lạ», hl-faces running) → alone fix 142/142 ×2, main Worker 142/142, main's own test 142/142 |
| 5a | quickcheck ALONE (incl. old save) | `bash dev/tools/quickcheck.sh` | merged #1: QUICKCHECK PASS · old save ok (0 errors) · core gates PASS · render 245/287 · tab 451/432 · buổi 1315/2709 ms. merged #2: QUICKCHECK PASS · old save ok · core gates PASS · render 256/258 · tab 442/514 · buổi 1397/1444 ms |
| 4e | smoke on merged #3 15b5e1ff (newest LIVE c6c3ca76), fix Worker | scan · `coop-thin-f2.js http://127.0.0.1:8799 7 0` · coop-e2e 0 / SWAP=1 | 0 left · 27/27 · 142/142 · 142/142 |
| 5b | coop-lag before / after (merged #1, `--buoi 5 --no-rejoin`, CPU 4, PP_ARGS local-network flags, one run at a time, main/fix alternating) | `node dev/test/coop-lag.js --buoi 5 --no-rejoin --worker http://127.0.0.1:879{8,9} --out …` | **coopSyncKBMax main 129.4 / 133.8 / 130.8 → fix 28.6 / 28.4 / 25.8** (≤ 100 ✔) · coopKBPerMin main 196.7 / 77.9 / 184.6 → fix 61 / 110.2 / 124.7 · coopResendPerMin main 6.8 / 0.7 / 4.6 → fix 0.6 / 4.1 / 5.9 (noise, < 12) · coopTurnP95 main 27.9 s / **1149 s** / 68.2 s → fix **1517 s** / 5.5 s⁴ / 11.8 s |

¹ pre-existing flake, seen on the MAIN Worker too: relms «host keeps his oán… fade only» (main Worker merged 14/15, old main tests 15/15); thancan «T1 her lòng gain once» (main Worker 9/10 on merged #1 and bare); thin-a «host sees the friend» (main Worker 2 of 4 reps) / «round trip again … .S.emp.cz… / .S.tn.who 901 vs "me"» (host-local selfTest, no wire) / «withSeat round trip» (main Worker); places «pd H1 host walks there» (bare only, 2 reruns 19/19).
² arrive-see «run1 tgk host-first: her phone sees the host»: fix Worker 3 of 8 runs, main Worker 1 of 5 (same row, same text) → pre-existing race, not this branch.
³ pre-existing rows, identical on main (main's own test files on the main Worker, origin/main build): coop-hl-faces R0–R5 «EXC page.evaluate: TypeError … reading 'buoi'» (6 EXC, rooms 6 bad 0, on every head and both Workers); pm-coop-d «r3 fix B host→guest / guest→host pastime» 2 rows (33/35, merged #2 34/36); coop-thin-d «kit: guest copy of d2-guest-gift renders like the native card (giftin)» (data-kodds n vs n±1) + sometimes «host: her act changed his Thân sơ row» (old main 51/53).
⁴ fix run 2: turns 1–4 logged NEGATIVE ms (the buổi stepped before the second press() returned — press() spends time in clear() on dialogs), so coopTurnsOk 1/5 «buổi stuck 4 of 5» although all 5 buổi advanced: harness measure, not a stall. The 19–25 min week-crossing stall (0:3 → 1:0, thousands of act frames while a dialog loop runs) happened once on EACH Worker → pre-existing (r1 B3 / coopTurnP95 family, render-perf order with Foreman B).

Notes (non-blocking, for the fixer / Foreman B):
- N1 typeSpy's comment says «each list keeps the wire order»: true for __rxT; for __tx a gzip SEND is counted after any later string send (probe: tx ["act","do","seat"], wire act,seat,do). No test reads __tx order (filter / includes / length only), so no effect today.
- N2 coop-thin-e-net keeps a string-only host filter on relayed "do"; safe for its small taps, but a `do` above 8000 chars (Worker DOMAX 20000) now arrives gzip and would slip it. If e-net ever sends big args, move it to coop-wire too.
- N3 coop-lag turn ms can go negative (⁴); count «stuck» only when the key did not move.
- Deploy: Worker auto-deploys on land (.github/workflows/coop-worker.yml). Old clients: all decode gzip (14/11+); pre-20/11 tabs decode unordered (reload fixes).

VERDICT r2: **PASS 15b5e1ff89621267373250687dcc057a5f0790f8** (review/robot-coop-fix-1-r2-rv; ancestor = origin/main c6c3ca76; tree = a0ac174a's Worker + test diff over LIVE).
Worktrees /home/user/wt/{r2bare,r2merge,r2main}; logs in /tmp/claude-0/runs (this box only).

## REVIEW robot-coop-fix-2 (BIG, opus; session_01N1tNP53Ngf1bGuVAWcQEy5; START_CTX ≈4 %) — FAIL
PRIORITY #1 CHECK ('coop merge clamp / bạc<0 / linkRange'): OD 2204–2205 | main coop/worker/src/merge.js (additive m3, no clamp), dev/build/jbal2.js:132 BAL.linkRange (law-4 range table, already used by the co-op client jcoopworld.js:301 keyMove) | review/* robot-coop-fix-2 b9b88cda, robot-coop-fix-1-r2 a0ac174a, robot-coop-fix-3 25db868e | claims B fixer #3 → #4.
Reviewed: review/robot-coop-fix-2 b9b88cda (from main fd85907a; diff = coop/worker/src/merge.js +10, merge.test.mjs +15, dev/test/lib/coop-lag-hooks.js resend identity).
Ran: Worker tests on b9b88cda — merge ok · vault ok 48 · seat ALL OK · stale ALL OK · thin ALL OK · ws ALL OK · chat ALL OK. The root cause (additive a+(b−base) on one pot spent by both seats) and the place of the fix (Worker, so the stored base matches both screens) are right. Not run (FAIL found first, no point spending hours): coop-e2e both orders, own A/B, quickcheck, merged head.
FAIL items for the fixer:
1. LAW 4 ONE CORE: `PCL` in merge.js types the ranges (0/100, −100/100, 0/Infinity) by hand. The Worker cannot read BAL at run time → put the person-stat ranges in BAL (one table, like BAL.linkRange; j8 ap(), j1 apply() and j1 statSet() should read it too instead of their own typed lists — same family), GENERATE the Worker's table from BAL at build (e.g. coop/worker/src/ranges.gen.js written by a script from dev/build/jbal*.js) and add a test that fails when the generated table ≠ BAL.
2. LAW 11 FIX THE WHOLE GROUP: the Worker clamps 12 top-level keys of a person; the game clamps many more person fields that the same additive merge pushes out of range. Proof (merge3 on b9b88cda, base / host / guest → merged):
| field (game clamp site) | base→host, guest | merged | game range |
|---|---|---|---|
| R[].rl[id] (j9 affAdd, BAL.linkRange.rl) | 90→100, 95 | 105 | −100…100 |
| R[].ro[id] (j9 oanAdd, BAL.linkRange.ro) | 10→0, 4 | −6 | 0…100 |
| R[].staff[].loyal (j10 loyal cl 0,100) | 10→0, 2 | −8 | 0…100 |
| S.maid.loyal (j1 apply / j8 ap maid) | 10→0, 3 | −7 | 0…100 |
| S.tin (cl 0,100) | 95→100, 98 | 103 | 0…100 |
| R[].pg (cl 0,100) | 95→100, 99 | 104 | 0…100 |
| R[].oan (cl 0,100 / max 0) | 5→0, 1 | −4 | 0…100 |
| R[].ev (j8 evA max 0) | 3→0, 1 | −2 | ≥ 0 |
| suc (j8 ap / j1 apply / statSet: min(suc, sucCap(p)), BAL.kh) | — | capped at 100 only | ≤ sucCap(p) (khí huyết) |
(script: scratch gap.mjs; also grep counts of game clamp sites: loyal 126, hp 26, tin 13, oan 7, pg 5, rel 4, ev 2, malice 1.) Fix = one range table (item 1) covering every clamped person field incl. nested maps (rl/ro per key, maid/staff loyal, kids hp), a scan script listing game clamp sites vs Worker table, before/after table. sucCap depends on khí huyết (BAL.kh + p.khScar/khTmp/age): either compute it in the Worker from the same BAL numbers or state why the next client apply re-clamps identically on both seats (both adopt the same merged state) — with a test.
3. Note (harmless, keep in mind for the scan): isPerson() also matches S.nightWhy.rows[] (name + rank + sung snapshot rows of tonight's pick) — clamping a 0–100 copy is harmless, but the person test should be the same rule the scan uses.
Next: fixer #4 fixes 1–2 on review/robot-coop-fix-2 (or -r1), then full gates (Worker tests, coop-e2e both orders vs local wrangler, A/B ≥3 each side with harness ≥ 0a593f8e, quickcheck, old save) → fresh BIG review.

## REVIEW robot-coop-fix-2 r2 (BIG, opus; session_01N1tNP35VdFJ3CXbPW1oNRa; START_CTX ≈6 %) — FAIL
PRIORITY #1 CHECK ('person range / coop merge clamp / gp ep canon maps / staff sucCap'): OD 2204–2205 | main coop/worker/src/merge.js (no clamp), dev/build/jcoopworld.js toCanon (r.rl/ro/gp/ep[mp]), jagstaff.js asSt/asAp | review/* robot-coop-fix-2-r2 1579b65c (this), robot-coop-fix-2 b9b88cda (r1 FAIL rv 53Ngf1bG) | claims B fixer #4 2dfra9gD.
Reviewed: BARE review/robot-coop-fix-2-r2 1579b65c AND MERGED 0f8dd283 = 1579b65c + LIVE origin/main d0ed42e4 (robot-coop-fix-1-r2 15b5e1ff + kit-sqopt; only index.html/sw.js conflicted → build_site.sh rebuilt; ranges.gen.js regenerated = unchanged). Merged head pushed to review/robot-coop-fix-2-r2-rv for the fixer to start from (NOT land-ready).
### r1 FAIL rows — status
- Item 1 LAW 4: FIXED. BAL.personRange (jbalpr.js, pure data, BAL.linkRange moved there, canon overwrite) read by j8 ap, j1 apply, j1 statSet (prCl); no typed list left in those three (range.test greps it). Worker table GENERATED (dev/build/gen_coop_ranges.js → coop/worker/src/ranges.gen.js, run by assemble.py); stale test: I edited jbalpr.js tin:[0,99] → range.test.mjs throws (gen --check «STALE»), reverted. In npm test + coop-worker.yml. Load order OK (jbal.js 57 → jbalpr.js 58; readers call at run time).
- Item 2 LAW 11: NOT fully fixed — see FAIL 1 + 2 below (the r1 table rows pass on the SOLO shape, but the co-op canonical state stores two of those numbers in maps the table lacks).
- Item 3 isPerson: fixed (any object with a string name; nightWhy rows identity, tested).
### FAIL items for fixer #4
1. LAW 11 — the CANONICAL per-seat maps gp / ep are not clamped. The Worker never sees r.ghen / r.ev of a world person: jcoopworld.js toCanon (and jcoopthinb) MOVE them into maps keyed by the player id — `r.rl[mp]=r.rel; r.ro[mp]=r.oan; r.gp[mp]=r.ghen; r.ep[mp]=r.ev; delete r.rel/oan/ghen/ev` (also evm[mp], cev[mp]). BAL.personRange.map has rl ro af hA evm cev — no gp, no ep. The r2 test row «ev 3→0,1» tests the scalar r.ev that is deleted before the merge. merge3 on the real canonical shape (probe canonmaps.mjs, same on BARE and MERGED):
| field (canon) | base→host,guest | merged | game range |
|---|---|---|---|
| R[].ep[mp] (her ev, j8 evA) | 3→0,1 | −2 | ≥ 0 |
| R[].gp[mp] (her ghen) | 95→100,99 | 104 | 0…100 |
| R[].gp[mp] low | 5→0,1 | −4 | 0…100 |
| R[].rl[mp] (control) | 90→100,95 | 100 | −100…100 ✓ |
Fix: add gp and ep to BAL.personRange.map as REFERENCES to the stat ranges (gp: stat.ghen, ep: stat.ev — like rl: BAL.linkRange.rl, not typed again); the scan must also read the canonical renames (every `x.<map>[mp]=` in jcoop*.js: rl ro gp ep evm cev) and FAIL when a renamed map is not in the table; range.test rows on the canonical shape (toCanon output), not the solo shape.
2. The Worker cuts a number the game ALLOWS and neither seat changed — staff Sức above sucCap (answer to the fixer's question «does the clamp ever write a friend stat the guest did not change?»: yes, but staff, not the friend). jagstaff.js asSt draws s.suc from BAL.ag…st.suc with no sucCap; asAp clamps 0…100 only; so old servants hold Sức over the jkh cap in the game. clampP runs on EVERY named object of a person object both seats changed (most rivals, every week) and applies sucCap to all of them. Probe idclamp.mjs = clampP on a clone of every named object of real played states (would-be rewrites when nothing changed):
| state | named objects | rewritten |
|---|---|---|
| coop save week 14 (review/robot10-coop-saves …p3-4-yr97b6) | 108 | R[0].staff[4].suc 81→79 (age 59), R[4].staff[1].suc 90→83 (age 54) |
| solo seed 7 (rv2b build) | 80 | R[0].staff[5].suc 83→78 (age 60), R[1].staff[2].suc 90→80 (age 58) |
| solo seed 11 | 84 | R[1].staff[2].suc 85→80, R[4].staff[1].suc 84→78 |
| solo seed 23 | 82 | none |
Every other field of every named object (her S, consorts, maids, kids, men): identity. Fix the group in ONE place, one rule for both: either the staff paths go through the game's own Sức rule (asSt / asAp → statSet / sucCap, jkh «the Sức ceiling every clamp reads»; balance note: old servants lose a few Sức) OR the Worker applies sucCap only to the objects the game caps — pick one and say why; then add the identity guard (clampP over every named object of ≥ 3 played states, solo + co-op, must change nothing) to range.test / the scan.
3. Scan gap (why 1–2 passed COOP-RANGE PASS): coop-range-scan.js only reads constant-bound clamp SITES by field name; it cannot see renamed canonical maps (1) nor values the game stores over the table without a clamp site (2, sucCap is not in the scan at all). Add both checks (renames + identity on played states).
### Friend-stats row (fixer flag: coop-world «sees the friend's sung/danh/suc wrong», clamp 1/5 vs main 0/5)
No clamp mechanism found. Both seats adopt the ONE merged state whole (jcoopworld onWeek → fromCanon(C)); the friend on my screen = F.P[other].S = her own S after her adopt; clampP on her S (P[seat].S is a person: has name) is identity on all 14 real states (0 hits on $.S). The staff cut (2) is not a friend stat and is the same on both seats. → I read the 1/5 as the overloaded run (turn p95 252 s), not the clamp.
### Spot checks (scan sites by hand)
- jkc2.js:427 `S.danh=Math.min(30,Math.max(S.danh,…))` → hi 30 inside [0,100] ✓ (OK verdict right).
- j71.js:214 `k.hp=Math.max(30,Math.min(k.hp,…))` → lo 30 inside [0,100] ✓.
- jagacts2.js:21 `N.bac=cl(…,0,1)` → counted as a bac site but N is a needs weight, not a person (harmless false site; inside [0,∞)).
- jmind.js:124 `who.loyal=Math.max(0,Math.min(100,…))` ✓.
### Ran (commands + outputs; BARE 1579b65c = rv2a, MERGED 0f8dd283 = rv2b; local wrangler dev :8791 bare / :8792 merged)
- `cd coop/worker && npm test` both: merge ok · vault ok 48 · seat ALL OK · ALL OK stale · thin ALL OK · range ok (exit 0). `node test/range.test.mjs --table` both: every r1 row in range (rl 100, ro 0, staff loyal 0, maid loyal 0, tin 100, pg 100, oan 0, ev 0, suc = sucCap, kids hp 100, af −100, hW.joy 100, nt 100, trieu 100/0).
- `node test/ws.test.mjs http://127.0.0.1:879{1,2}` ALL OK · `node test/chat.test.mjs …` ALL OK (both).
- `node dev/build/gen_coop_ranges.js` (no arg: rewrote, no diff) and `--check` «ranges.gen.js = BAL (personRange + kh)» both; stale probe above.
- `node dev/test/coop-keymove-unit.js` 12/12 both.
- `node dev/tools/coop-range-scan.js` and `--all`: COOP-RANGE PASS · 46 table fields · 0 wider · 863 clamp sites (both) — but see FAIL 3.
- `COOP_SWAP=0|1 node dev/test/coop-e2e.js <out> http://127.0.0.1:879x`: bare 142/142 + 142/142, merged 142/142 + 142/142.
- `bash dev/tools/quickcheck.sh` ALONE on MERGED 0f8dd283 vs live d0ed42e4: CORE GATES PASS · TIME-SPILL PASS · old save ok · perf median render 288/335, tab 623/694, buổi 1805/1642 → QUICKCHECK PASS. Bare quickcheck, coop-lag, own A/B: not run (FAIL found; the game code of bare = merged minus LIVE).
- Probes (scratch /home/user/wt/rvout/probe, not in git): canonmaps.mjs (FAIL 1), solostates.js (3 seeds solo, ser() dumps) + idclamp.mjs (FAIL 2).
### Notes (not blocking)
- coop-worker.yml runs on `paths: coop/worker/**`: a BAL.personRange / BAL.kh change landed WITHOUT the regenerated ranges.gen.js triggers no Worker test (assemble.py regenerates, the lander must commit it). Add dev/build/jbalpr.js and dev/build/jbal2.js to the workflow paths so gen --check runs on such a land.
- statSet now also clamps bac ≥ 0 and apply clamps S.ghen / S.an when present: no caller passes bac / ghen / an to statSet; scan shows ghen/an sites 0…100 → no behaviour change found.
- Game-wide typed 0/100 at the 863 sites remain (scan-guarded inside the table) — outside this branch.

## REVIEW robot-coop-fix-2 r3 (BIG, opus; session_01N1tNP5GQ2J9RoWGbzfVreX; START_CTX ≈5 %) — PASS
PRIORITY #1 CHECK ('robot-coop-fix-2 r3 / personRange gp ep / body sucCap / coop-range-identity'): OD 2204–2205 | main coop/worker/src/merge.js (no clamp), jcoopworld.js toCanon, jkh.js khFit/sucCap, jagstaff asSt/asAp | review/* robot-coop-fix-2-r3 71076b61 (this), robot-coop-fix-3 32121242, robot10-coop 6576e086 (harness), robot10-coop-saves cfcfd5de (9 co-op saves) | claims B fixer #6 4TkcdjyymdxPqwSj5 → #7 3fqMhAjzz59xaXXqg.
Reviewed: review/robot-coop-fix-2-r3 **71076b61c17ee186662d72f586b6dce4cb92aa0f**. Newest origin/main at start AND at verdict = 502c48c9, already an ancestor (71076b61 = bbd98195 + LIVE 502c48c9, FF) → bare head = merged head; no fix-3 / other co-op work landed in between. Built with assemble.py: no tracked diff (ranges.gen.js regenerated identical).
### r2 FAIL rows — status
| r2 FAIL | check | result |
|---|---|---|
| 1 law 11 canonical gp/ep | range.test --table on canon shape: R[].ep[mp] 3→0,1 = **0** · gp 95→100,99 = **100** · gp 5→0,1 = **0** (r2: −2 / 104 / −4). BAL.personRange.map.gp = stat.ghen, ep = stat.ev (references, not typed); range.test asserts MAP.gp==STAT.ghen, MAP.ep==STAT.ev | FIXED |
| 2 staff Sức / one rule both sides | Worker caps Sức ≤ sucCap only on BAL.personRange.body = W.R[] + P.*.S; game: every sucCap caller is S or a rival (j1 apply, j8 ap, j3/j42/j76 regen, jcmaid, jpet, jkh khFit monthly + on deser), staff never (jagstaff 0…100). Worker sucCap = jkh sucCap on 500 people (range.test). Staff row: 81 (age 59, cap 79) stays 81 | FIXED |
| 2 identity guard | `coop-range-identity.js --seeds 7,11,23,41,99 --turns 120 <9 co-op saves>` and `--every`: 14 states, **1 rewrite: save …1bo6v9z W.R[] «Thôi Chỉ Lan».ro.902 −2→0** = an overflow the OLD (LIVE, no-clamp) Worker stored (no game site writes ro < 0: j9 oanAdd c(), j28 max 0, jcoopworld:798 cl 0,100) → the clamp repairing it is right, not a cut of a game value. Every other state 0. `--every --seeds 7,23 --turns 1500`: PASS 0 | FIXED (see note a) |
| 3 scan renames + identity | scan reads `x.<map>[mp|pid|me()|fp()]=` in jcoop*.js: rl ro gp ep evm cev OK, where exempt (place). My grep of every `.<map>[<player id var>]=` in jcoop*.js: no other person map keyed by a player id | FIXED |
| 4 coop-worker.yml paths | coop/worker/**, dev/build/jbalpr.js, jbal2.js, gen_coop_ranges.js; range.test in the deploy job | FIXED |
### Planted regressions (scratch worktree rvplant, reverted)
| plant | tool | result |
|---|---|---|
| delete `BAL.personRange.map.gp=…` + regen | coop-range-scan | `- gp: 2 sites … → MISSING` · COOP-RANGE FAIL · range.test AssertionError → **CAUGHT** |
| new canonical map `r.xq[mp]=1` in jcoopworld.js:139 | coop-range-scan | `- xq: 1 sites → MISSING` · FAIL → **CAUGHT** |
| jbalpr tin [0,99] without regen | gen --check / range.test | «ranges.gen.js is STALE vs BAL» both → **CAUGHT** |
| body += "W.R[].staff[]" (staff get sucCap) + regen | coop-range-identity --every (2 co-op saves) | unplanted PASS 0 → planted FAIL 5: Nhâm Ngọc Hành 81→79, Lão Hỉ Tử 90→83, Lão Ninh Tử 100→77, Lão Lợi Tử 97→89, Tiểu Phong Tử 100→98 → **CAUGHT** |
### Laws touched
Law 4 ONE CORE: PASS (Worker table generated from jbalpr.js + BAL.kh; j8 ap / j1 apply / statSet read BAL.personRange, range.test greps no typed list; gen --check). Law 11: PASS (scan 48 fields, 863 sites, 0 wider; canonical renames; identity on played states). Law 6a/real numbers: bạc/Sủng no longer go below 0 after a merge (A/B). Laws 1–3, 5, 7–10, 12: no option / text / UI / art change in this branch (game diff = j1/j8 clamp reads BAL, behaviour-neutral; Worker merge) → not touched.
### Ran (commands + outputs; worktree /home/user/wt/rv3 = 71076b61; local wrangler dev :8797 = branch coop/worker, :8798 = main 502c48c9 coop/worker)
- `node dev/build/gen_coop_ranges.js` (no arg: rewrote, no diff) · `--check` «ranges.gen.js = BAL (personRange + kh)».
- `cd coop/worker && npm test` → … thin ALL OK · range ok (exit 0) · `node test/range.test.mjs --table` all rows in range (table above) · `node test/ws.test.mjs http://127.0.0.1:8797` ALL OK · `node test/chat.test.mjs http://127.0.0.1:8797` ALL OK.
- `node dev/tools/coop-range-scan.js` and `--all`: COOP-RANGE PASS · 48 table fields · 0 wider · 863 sites.
- `COOP_SWAP=0 node dev/test/coop-e2e.js <out> http://127.0.0.1:8797` **142/142** · `COOP_SWAP=1 …` **142/142**.
- Old client during deploy: LIVE main 502c48c9 game vs the NEW Worker :8797, COOP_SWAP=0 **142/142**, COOP_SWAP=1 **142/142** (no protocol change; the branch's game diff is behaviour-neutral so a mixed room is the same case).
- `bash dev/tools/quickcheck.sh` ALONE: CORE GATES PASS · TIME-SPILL PASS · old save ok («Mộ Dung Mạn Sương», buổi ok, 0 errors) · perf median new/live render 249/311, tab 554/518, buổi 2070/1726, tasks>200 25/25 → **QUICKCHECK PASS** (no perf noise → --runs 6 not needed).
### A/B (harness review/robot10-coop 6576e086 overlay on both sides; CAP 300 PCAP 1500 POSLOG NEGTRAP; 1 pair × 1 kiếp per round; fix2 = 71076b61 game + Worker :8797; main = 502c48c9 game + Worker :8798; fix2log = 71076b61 game + a copy of the branch Worker that logs every clamp write (:8796))
| row (rounds hit) | fix2 (4) | fix2log (4) | main (4) | read |
|---|---|---|---|---|
| number: bạc / sung < 0 (incl. ARRIVED) | **0/4** | **0/4** | **3/4** (sung −19 w4 · bạc −19 ARRIVED · bạc −14 w4) | the fix holds (history 0/5 vs 1/5, 0/5 vs 3/10) |
| friend Sủng/Danh (coop-stat + coop-world friend rows) | 1/4 (w7: each screen shows the friend with ITS OWN 0/30 vs 1/42) | 0/4 | 1/4 (coop-stat b0.2) | equal; not the clamp: see below |
| stuck | 0/4 | 1/4 (night gate, see note c) | 0/4 | week-end stuck family (fix-4), not the clamp |
| save round-trip | 1/4 (staff name) | 2/4 (S.suc 100→99; R.11.hue) | 1/4 (S.suc 100→99) | save round-trip family (queued), all sides |
| coop-pos | 1/4 | 0/4 | 1/4 | fix-3 family |
| coop-world consorts differ | 0/4 | 1/4 (guest-only 1001 Hách Chỉ Lan, w4) | 0/4 | list membership; the clamp never touches ids/arrays (note c) |
| pageerror | 0 | 0 | 0 | — |
**Clamp writes in live play (fix2log, 4 rounds, wrangler log `CLAMPW`): 6 writes, ALL overflow repairs**: P.b.S sung −5→0, bac −10→0, −9→0, −5→0, ro.901 −1→0, W.R[] ro.902 −2→0. No interior value, no staff, no Sức write → the friend-stat rows (interior numbers 30 vs 42) cannot come from the clamp; the r2 «clamp 1/5 vs main 0/5» friend doubt is closed (now 1/8 vs 1/4).
### Notes (not blocking)
a. coop-range-identity is a separate Playwright tool, not in npm test / CI (the scan prints its name). Its solo seeds stay in game year 1 even at --turns 1500 (endTurn loop does not reach a new year), so old-age bodies are covered only by co-op saves + the planted staff row. A later hardening: run it in quickcheck with a year-2+ save.
b. LIVE rooms made by the old Worker hold stored overflows (e.g. ro.902 −2); the new Worker repairs them at the next merge of that person — expected.
c. For fixer #7 / fix-4 (not this branch): new stuck dump fix2log r3 week 7 buổi 3: host nrdy 7 / ngo 7 / ngoW 7 / nfr 7, guest nrdy 7 / ngoW 7, both «Chờ hảo hữu…», sent 6, trace «night 7 f=true» repeating (guest + «pull f=true») — NOT the ngoW −1 cause fixer #5 found (both committed, gate still shut). Plus coop-world «consorts differ, guest-only 1001 Hách Chỉ Lan rank 0» at week 4. Files: /home/user/wt/rv3out/ab/fix2log/r3 (container-local).
Verdict: **PASS 71076b61c17ee186662d72f586b6dce4cb92aa0f** (ancestor = origin/main 502c48c9). No CDN review folder used; scratch shots/runs outside git.

## REVIEW robot10-onecore
PRIORITY #1 CHECK: OD:L1267 (one core), 18 laws (4 / 11 / 2 / 3) | main dev/test/choice-value-scan.js, dev/measure/robot10-in.js | review/robot10-onecore 4d063689 | claims B fixer #5 4vn55dxG. Reviewer = small sonnet session_01N1tNP58gRW5Kr3V1fXZBZN. Worktrees rv-bare (4d063689), rv-merged (newest LIVE), rv-revert (planted regression), rv-main.
**Verdict: PASS + 1 small fix by the reviewer** — merged head `5d4f722fdc0490056c5a71e03f6a15c4b4d9fd69` (= 4d063689 + reviewer fix 12866d32 + LIVE 502c48c9), pushed review/robot10-onecore-rv.
1. Diff scope: `git diff --stat $(merge-base origin/main review/robot10-onecore) review/robot10-onecore` = dev/measure/robot10-in.js (+11/−1) + dev/tools/choice-value-scan.js (+16/−3). Nothing else. Merged head vs origin/main 502c48c9: same 2 files, 23+/4−. OK.
2. Hand-play (own node/playwright script, seed 7, game built index.html, shown text vs applied delta vs BAL):
| option | shown | applied | BAL |
|---|---|---|---|
| «Bạc lạ» → Nhận bạc, làm tai mắt (j42 cnvBribe, servant) | «mỗi tháng Bạc +8» + kit fx Bạc +20 | +20 now (apply fx), then 12 × srvMonth with spy = 132 vs 36 without → exactly +8 each month | coopBribe.pay 20, ag.why.srv.pun.spyPay 8 — both true, NOT a lie (recurring ≠ sure fx) |
| «Thay hết nước, đồ ăn» (j68f poisonedFish) | Sức +6 · cost Bạc −5 | suc +6, bac −5 | base fishSwapSuc 2 / fishSwapBac −10, rescaled by jbac bacFairList (BAL.bacFair, law 2) → printed = applied, derived from BAL |
| «Cho thái y nghiệm độc» win / loss | thành: Tâm cơ +2 · hỏng: Bạc −5 · cost Bạc −10 | win: bac −10 tamco +2 · loss: bac −15 | consistent (cost −10, loss extra −5) |
| 1111 e68 options played (E68I all events, win path) | 400 with printed numbers | applied delta equals printed (or printed − fx) on all | 0 mismatches (one earlier run had 1: «Cáo mệt xin hôm khác» Sủng −2 on empChess, did not repeat on 2 further runs → Sủng clamp by the run's random state, note only) |
| «Nghỉ ngơi một lát» Sức +6 (j76stand) | Sức +6 | not applied via chooseM (j76 acts run through the act path, not the PEND modal) → not verified by hand; BAL.restLatSuc = 6 = printed text; covered by scan audit only | — |
Claim «game shows no lie, the robot misread»: CONFIRMED for «Bạc +8 mỗi tháng» (recurring) and «Sức +6» (a rescaled win; the old robot compared the win with the cost only). 0 page errors.
3. Plant test (law 4):
| run | result |
|---|---|
| bare 4d063689 `--numbers --numplant --turns 2` | both plants in table (#1 Plant num Sủng +5 vs sung=2; #2 Plant c6 Sức +6 vs suc=2), 439 audited, PASS |
| REVERTED c6 hook (robot10-in.js without `o.__w` / `o.__l`) with the fixer's scan | table shows ONLY the num plant, c6 plant gone — but the line still said «plant CAUGHT» (exit 0). **FAIL row, fixed by reviewer**: `pl` counted any plant → one caught plant hid the missed c6. |
| REVERTED c6 + reviewer fix 12866d32 | «ONE-CORE NUMBERS PASS · 443 audited … plant MISSED c6», exit 3 (correct) |
| clean + reviewer fix | «plant CAUGHT (num + c6)», exit 0; on final merged head 5d4f722f: 439 audited, exit 0 |
Reviewer fix (12866d32, scan only): verdict needs BOTH `Plant num` and `Plant c6` in the table.
4. Runs: `choice-value-scan.js` NO args (60 turns) on merged: ONE-CORE not run (needs --numbers), CHOICE-VALUE FAIL (see 5). WITH args `--numbers --turns 60` (merged, before fix): ONE-CORE NUMBERS PASS · 434 options audited · 0 lies. `--numbers --numplant --turns 2`: above. `node dev/measure/robot10.js` NO args = usage list, exit 0; `node --check robot10-in.js` ok. (A full robot10 life is the fixer's A/B harness, 60-turn scan covers the audit rule.) QUICKCHECK (alone, nothing else running, merged on LIVE eae255e2 + fix): **QUICKCHECK PASS** · 244 s · open 2156 ms · old save ok · perf (new/live) render 296/237, tab 510/544, buổi 1714/2773 ms, tasks>200ms 25/26 · core gates PASS. (Not repeated after the final merge of 502c48c9: that merge changed no file of this branch.)
5. OPEN NOTE FOR MAIN (law 2/3, pre-existing, NOT a branch fail): `node dev/tools/choice-value-scan.js` (no args) on BARE origin/main eae255e2: CHOICE-VALUE FAIL · COST-ONLY 1 · DOMINATED 28 (this branch: 1 / 22–32, counts vary by turn draw). Rows by source on main: fv7:newyear 16, fv7:nguyentieu 4, fv7:phoenix 2, fv7:thanhminh 2, fv7:vulan 2 (festival family «Chuẩn bị kỹ rồi dự thi» vs «Ghi tên, bỏ bạc mời thầy kèm trước»: same effect, one costs more), fx7:sac 1, fx7:tai 1 (contests), COST-ONLY 1 = fixture dev/test/dialog-fixed.js (a demo option pair, not the live game; the fixer's note called it a festival row). → festival / contest owner (law 2/3, fix the whole fv7 + fx7 family).
6. Law check: 4 one core PASS (audit rule now reads the c6 win/loss blocks; recurring amounts skipped on purpose); 11 whole family (c6 + PEND + j68 events 1111 played) PASS; 2/3 not touched by this branch (note 5); 7 wording: no player text changed; 9/10/12 no UI touched.

### FIXER #6b (opus; session_01N1tNP4p4FFUjuVntyfWTNy; START_CTX ≈4 %) — review/robot-coop-fix-4 2d4d646f — SẴN SÀNG KIỂM
PRIORITY #1 CHECK: OWNER_DECISIONS/OWNER_LEDGER/HANDOVER/PROGRESS grep «night gate / ngoW / week-end stuck» → rule «nobody runs ahead» (review/coop-night-sync) is the authority; origin/main 502c48c9 + origin/review/* git grep: cause #1 already on review/robot-coop-fix-4 9c442f44 (fixer #5), reused; harness = review/robot10-coop 6576e086 (stuck dumps); runner saves review/robot10-coop-saves cfcfd5de; CLAIMS: fix-2 r3 / fix-3 r3 belong to fixer #6 (not touched).
Branch = 9c442f44 + merge LIVE 502c48c9 (d6ceb215) + cause #2 (6a8e4f55) + trace-only probe (2d4d646f). Ancestor = origin/main 502c48c9. Files: dev/build/jcoopworld.js, dev/test/coop-night.js, index.html, sw.js.
Harness 6576e086 = SAFE (+11 lines, only in the stuck branch, read-only getters jcoopworld/jcoopthine/jcoopthinf) — told Foreman B.

**Causes × hits (week-end stuck family, law 11)**
| # | cause | where seen | test | fix |
|---|---|---|---|---|
| 1 | host's commit (ngo=w) survives his rebirth sendMe / is never turned into his own go (ngoW −1): host «Sẵn sàng»/«Chờ hảo hữu», guest waits for go | A/B main p01 (w2), p02 (w14, host nrdy −1 ngo 14 nfr 14), p04 (w5, ngo=nfr=nrdy=5 ngoW −1) = 3/5 rooms; fix 0 | coop-night case 10: main FAIL + room locked → fix PASS | 9c442f44 (fixer #5): sendMe clears nrdy/ngoW and ngo of this week; nCheck: own commit = own go |
| 2 | night gate + thin E asks keyed by week only, carried into a NEW room without reload (week restarts at 0 → old commit/ready/ask hit the same week) | code read + case 11 (real players «Chơi cùng bạn» again; harness opens a fresh browser per room so A/B cannot hit it) | coop-night case 11: main FAIL ({"ngo":0,"nfr":0}, E.mine "0:3", room stuck) → fix PASS | 6a8e4f55: begin() clears nrdy/ngo/ngoW/nfr/nforce + E.mine/hr/forced when COOP room code changes; same-room reconnect keeps them |
| 3? | committed night that does not end the week: ngo=ngoW=nfr=w on both, trace «night w» repeating, sent w−1, no dialog | fix-2 r3 rv note c (w7); A/B main p02 guest (w14); A/B fix p05 (w7, guest on a new-life entry scene «Theo ma ma» + host on night scene, both untapped 240 s) = 1/5 fix rooms; rerun p05 ×2 on fix = 0/2 | no repro | NOT fixed: cause unknown (all nCheck guards pass, nextBuoi chain returns early somewhere). 2d4d646f adds a trace-only line «night held w b<buổi>/<last> <Q/mg/wait/frz/eW/kc/srv/succ/modal>» once per week → the next stuck dump names the holding state. Runners please use harness 6576e086 on this branch. |

**A/B (SEED 7, pairs 1–5 × 2 kiếp, CAP 300 / PCAP 1500, local Worker, harness 6576e086, same seeds)**
| side | stuck rooms | lives | wall | lives/hour | turn p95 (non-stuck rooms) |
|---|---|---|---|---|---|
| main 502c48c9 | 3 (p01 w2, p02 w14, p04 w5; all cause #1) | 23 (extra lives from fresh rooms after stuck) | 75.9 min | 18.2 | 28–54 s |
| fix 6a8e4f55 | 1 (p05 w7, cause 3?) ; rerun p05 ×2 = 0 | 20 | 67.2 min | 17.9 | 28–94 s |
Lives/hour is the same (CAP 300 ends every life: wall-cap bound, not a speed measure); the change is stuck rooms 3/5 → 1/5 (0/2 on rerun).

**Gates on 6a8e4f55 (index.html identical behaviour to 2d4d646f except the trace line), newest origin/main 502c48c9**
| gate | result |
|---|---|
| coop-night no-arg (LIVE Worker) | 126 ok / 0 FAIL |
| coop-night with args (local Worker) | 126 / 0; again on 2d4d646f: 126 / 0 |
| coop-e2e Fold-host | 142 / 0 |
| coop-e2e iPad-host (COOP_SWAP=1) | 142 / 0 |
| coop-keymove-unit | 12 / 0 |
| Worker npm test | 56 / 0 |
| quickcheck alone | PASS 112 s (render 237, tab 538, buổi 1168 ms, median of 3) |
Not done: U2 «buổi 0 pend:true Q 6 dialogs» rows (review/robot10-coop-saves u2) are state lines only, no dump → not classed; looks like cause 3? (dialogs held) — needs a dump with the probe.
Logs (container-local): /home/user/wt/s6out/{ab-a-main,ab-a-fix,p5-fix-1,p5-fix-2,g}.

## REVIEW law1-maid-away r1 (BIG, opus; session_01N1tNP3WS5HsPkPew92KGwF; START_CTX ≈5 % (own estimate); Foreman B = session_01N1tNP3HSiyh7FYx9Ezn8vr) — PASS 854c1fc1 (with one reviewer fix)
PRIORITY #1 CHECK ('law1-maid-away'): OD 0 | ledger 0 | claims 3 | main 0 (j42 srvTalk on 502c48c9) | review/* law1-maid-away 63d72694 | archive 0 → law1-audit row 10 + role-parity open «maid:beside N-ONLY»; reuse: fixer #7 head 63d72694 as base, nothing rebuilt.
Head reviewed: review/law1-maid-away 63d72694 (FF on LIVE 502c48c9; LIVE unchanged at the end, re-fetched) → **review/law1-maid-away-r1 854c1fc1fdaf8dbd0699e50f1d7d3020054bbf64** (= 63d72694 + reviewer fix below; FF on LIVE 502c48c9, so «bare head» = «head on newest LIVE»).
### Law 1 two-way (family scan)
- NPC maid (jagstaff asOpts + jagacts3 par3 + jagstf2): master home (asMisHome) → massage / askRew (loyal ≥ tin) / tellMis (intel) / askRec (rank < max), tea; away → beside (at the master's place) + follow; leave = no home gate (jagstf2, loyal < BAL.sp.leaveLoyal).
- Player maid on 63d72694: srvTalk «mis» home → the four acts (locks = the same gates), away → «Hầu bên cạnh chủ»; srvCards tea locked away (srvMisHome), «Theo hầu chủ» away; «Xin chủ cho đi hầu cung khác» no home gate (same as NPC). Matches.
- **FOUND (law 1 + law 11, pre-existing on main, same family):** the stage card builders (j42 srvVisitOf rvP, j95 j95srvStage + j95 record card) tag the master «hh» when she is the **Hoàng hậu** (`v.queen?"hh":v===m?"mis":"rv"`), so srvTalk never reached «mis»: at home the player maid of a Hoàng hậu had ONLY «Hầu bên cạnh chủ» (no four acts, no «Xin chủ cho đi»), while an NPC maid of a Hoàng hậu (asOpts, asMisHome true) has the four acts. Reachable: srvReassign after «Tố cáo … trước Hoàng hậu» puts her under the Hoàng hậu; a master can also become Hoàng hậu. maid-mis-away.js missed it because it fed srvTalk a hand-made «mis» card.
- **Reviewer fix (854c1fc1, small):** srvTalk reads her own master as «mis» whatever her title (`p.sk==="hh"&&RV(p.ref.id)===m` → «mis»); the dead `else if(v===m) beside` in the rv/hh branch is removed (one rule). One point covers all three builders. maid-mis-away.js now also drives the REAL stage card (srvVisitOf) at home/away and with a Hoàng hậu master: 63d72694 → FAIL «master is the Hoàng hậu, at home (card «hh»): ["Hầu bên cạnh chủ"]»; 854c1fc1 → PASS.
- Co-op: no jcoop* / Worker code calls srvTalk or tags «mis» (grep 0); coop/worker identical to main (git diff empty) → mirrored by construction; coop-e2e below.
### Other checks
- role-parity-open.json row removed honestly: role-parity.test ALONE reports no NEW gap, OPEN 12 rows ≤ OPEN_MAX 12; the OPEN_MAX line rewritten in place with its reason (law 14); no other row touched (diff = 1 line).
- Wording (law 7 / VANPHONG): no new player text; existing «Hầu bên cạnh chủ»; odds as words (Tùy duyên / Có cơ / Rất vững), no %. Law 4: odds/gains read SRVA/BAL (SRVA.beside.o, BAL.odb.j42), no typed number added.
- Pre-existing, NOT this branch (note for B's queue, not blocking): «Đấm lưng» card shows «công lao +0.25» (BAL.eff.j42.meritMis .25 printed raw) — a decimal on a player card; same on main.
### Gates (854c1fc1 build; local Worker = wrangler dev :8798 on coop/worker == main)
| gate | result |
|---|---|
| `node dev/test/maid-mis-away.js` (no args) / `… dev/index.html` | MAID-MIS-AWAY PASS (8/8) / PASS · no page errors |
| `node dev/test/role-parity.test.js` ALONE (no args) | ALL PASS · exit 0 · 10 m 51 s |
| `node dev/test/role-parity.test.js dev/index.html` ALONE | ALL PASS · exit 0 |
| `bash dev/tools/quickcheck.sh` ALONE | QUICKCHECK PASS · core gates PASS · old save ok (load + buổi, 0 errors) · perf median new/live render 230/219 · tab 442/441 · buổi 1232/1025 · tasks>200 23/22 |
| `COOP_SWAP=0 node dev/test/coop-e2e.js <out> http://127.0.0.1:8798` | 142/142 passed |
| `COOP_SWAP=1 node dev/test/coop-e2e.js <out> http://127.0.0.1:8798` | 142/142 passed |
| `npm test` in coop/worker | merge / vault / seat / stale / thin ALL OK · exit 0 |
### Shots (scratch only, not in git; Fold 755x1000 + iPad 1180x820, looked at each)
fold-qhome / ipad-qhome (master = Hoàng hậu, at home): talk menu tabs Hầu hạ 2/2 · Ban thưởng 0/1 (locked «Cần Chủ tin 60») · Giao thiệp 1/2 — the four acts + «Xin chủ cho đi», kit act cards, odds words, nothing cut. fold-away / ipad-away (master at Ngự hoa viên): only «Hầu bên cạnh chủ» + «Xin chủ cho đi hầu cung khác», kit cards, nothing cut, no page errors.
**PASS → LAND READY law1-maid-away-r1 854c1fc1fdaf8dbd0699e50f1d7d3020054bbf64.**

## REVIEW robot-coop-tail r1 (BIG, opus; session_01N1tNP2G5LPxnqD86NfuKDm; depth 7; START_CTX ≈4 %) — PASS
PRIORITY #1 CHECK ('robot-coop-tail'): OD 0 | ledger 0 | claims 3 (fixer #6 → #7) | main 0 | review/* robot-coop-tail 08dc8031 + harness robot10-coop (already clamps turn ms at 0, line 157) | archive 0.
HEAD 08dc80311255b60ea30cc821c466d5e0b62a1668 = LIVE 502c48c9 + 1 commit; LIVE unchanged at end of review (ls-remote 502c48c9) → bare head = merged head; review/robot-coop-tail-r1 pushed = same sha (FF from main).
### (1) test-only
`git diff origin/main..08dc8031 --stat`: dev/test/coop-lag.js, coop-thin-e-net.js, coop-wire-scan.js, lib/coop-wire.js only (41+/11−). No game, no Worker, no build file. coop/worker = main.
### (2) each N item measures the real thing (plants in scratch worktree /home/user/wt/rvplant, reverted)
| item | plant | old (main test files) | branch |
|---|---|---|---|
| N1 typeSpy wire order | probe: fake socket, send gzip `act` (>8000) then string `seat`, `do` | __tx ["seat","do","act"] | __tx ["act","seat","do"] (= wire order) |
| N2 hostNet, stress | game jcoop GZ=0,BIG=0 + Worker BIG=0 (EVERY frame gzip binary), local Worker :8797 | 18/21: FAIL N1 (dropped []), N6 (lost []), N10 (thin not held, lvl 6) — the old string-only filter injects no fault at all on gzip frames | 21/21 (dropped/lost lists hold the gzip `erd`+`ready`) |
| N2 hostNet, real regression | + jcoopthine reNet() never resends (`rr=0;return`) | — | CAUGHT: 10/21, FAIL N2 ×2, N3, N4, N7, N8, N9, N11 … |
| N2 scan | main's coop-thin-e-net.js put back in the branch tree | — | coop-wire-scan: «host deaf on "do"/"thin" STRING frames only — use coop-wire hostNet», left 1, exit 1 |
| N3 real stall | jcoopworld bend(): seat b stops sending `bend` after its 3rd (`--buoi 5 --no-rejoin`) | — | CAUGHT: turn 4 = 693 208 ms (budget), turn 5 moved:false → «buổi stuck: 1 of 5», exit 1 |
| N3 old false stuck | — | fixer #7: main 7/8, «0:0 → 1:0 = −3177 ms» counted stuck | this run: two turns landed before the 2nd press() returned → 0 ms, moved:true, not stuck (8/8) |
### (3) law 11 siblings
typeSpy users (coop-thin-a/-d/-d-probe, pm-coop-d) only filter/includes `__tx` — no order assert broken. Host-side string-only filters: coop-wire-scan 0 left (tx spy string-only rows in coop-thin-b* stay notes, as before: own sends < 8000). Turn-ms shape: only coop-lag.js computes `max(ca,cb)-t2`; harness robot10-coop.js already `Math.max(0,…)`; coop-lag-hooks/robot10-lag read `ms>=0` (consistent). No other sibling.
### (4) no test weakened (every assert diffed)
coop-thin-e-net: asserts unchanged (only the init script moved to lib hostNet; same flags __mute/__deaf/__holdThin, same __drop/__lost/__thq; now also binary). coop-wire-scan: stricter (host string filter now counts as bad). coop-lag: thresholds/budget unchanged; stuck = key did not move (was ms<0). NOTE (not blocking): a turn that moved but has no timing (t2=0 or a missed __kch key → ms −1) was «stuck» before and is now neither stuck nor in coopTurnP95 (coopTurnsOk still shows n/N). Suggest for the next coop-lag touch: also FAIL «buổi untimed» for moved && ms<0.
### Ran (worktree /home/user/wt/rvtail = 08dc8031, assemble.py built; local Worker wrangler dev :8798 = main coop/worker)
| command | result |
|---|---|
| `node dev/test/coop-wire-scan.js` | string-only deaf filters / rx spies left: 0 (exit 0) |
| `node dev/test/coop-thin-e-net.js` (no args: LIVE Worker, lvl 6, swap 0) | RESULT 21 / 21 |
| `node dev/test/coop-thin-e-net.js http://127.0.0.1:8798 6 0` | RESULT 21 / 21 |
| `node dev/test/coop-thin-e-net.js http://127.0.0.1:8798 6 1` | RESULT 21 / 21 |
| `node dev/test/coop-lag.js --out …` (LIVE Worker) branch | 8/8 moved, turns 8482/3174/2702/44700/5114/2117/0/0 ms; FAIL budget coopTurnP95 44 700, actionP95 13 012; rejoin ok:false |
| same, main's coop-lag.js (parallel) | 8/8, FAIL budget coopTurnP95 83 586; rejoin ok:false |
| `node dev/test/coop-lag.js --buoi 5 --no-rejoin --out …` on the stall plant | FAIL «buổi stuck: 1 of 5» (see table) |
| `COOP_SWAP=0 node dev/test/coop-e2e.js <out> http://127.0.0.1:8798` | 142/142 passed |
| `COOP_SWAP=1 node dev/test/coop-e2e.js <out> http://127.0.0.1:8798` | 142/142 passed |
| `bash dev/tools/quickcheck.sh` ALONE | QUICKCHECK PASS · old save ok · render 204/203 · tab 448/417 · buổi 1087/1017 · tasks>200 19/21 · core gates PASS |
Known, NOT this branch (same on main, as the brief says): coop-lag budget FAIL (week-end stall family → fix-4) and rejoin ok:false (LIVE; flag for MAIN).
Laws touched: 11 (family scan above) · 13 (check line) — no game/UI/wording/number change, laws 1–10/12 n/a.
VERDICT: PASS — LAND READY robot-coop-tail-r1 08dc80311255b60ea30cc821c466d5e0b62a1668 (test-only).

## REVIEW robot-coop-fix-3 (BIG, opus; session_01N1tNP59azvSi4P3tJ9EkLK; START_CTX ≈6 %) — FAIL
PRIORITY #1 CHECK ('robot-coop-fix-3 coop-pos whereOf roster house'): OD 2204–2205 | main dev/build/j9.js:66 whereOf, j95.js:28 j95on / :297 j95sync / :520 whereOf wrap, jagharm.js:179, jcoophl.js:35 HOUSE | review/* robot-coop-fix-3 32121242 (fixers #4–#6), robot10-coop 6576e086 (harness) | claims B fixer #6 4TkcdjyymdxP → #7 3fqMhAjz.
HEAD 32121242 = ebacc4d9 + LIVE 502c48c9; origin/main at start = 502c48c9 (fix-2-r3 not landed) → bare head = merged head (FF, 0 merge). Branch diff vs main: dev/build/jcoopworld.js only (+ index.html/sw.js build); coop/worker unchanged.

### Verdict: FAIL — the house relay (2nd family) WORKS; the three roster parts (r1/r2/r3) are dead code in co-op, built on a wrong diagnosis
| # | item | evidence | fix asked |
|---|---|---|---|
| 1 | **Law 11 / correctness: rosterFriend (r1), the j95planRival wrap (r2) and the j95sync wrap (r3) never run in co-op.** `j95on()` (j95.js:28) = `… && !(window.COOPW && COOPW.on)`; j95sync / j95plan / the npcEncounters plan / the j95 whereOf wrap are all gated by it, and CW === window.COOPW, so `CW.on` (the wraps' own gate) and a live roster are mutually exclusive. | Probe (/home/user/wt/rvout/probe.js, 2 real pages on local main Worker :8798, game 32121242): at buổi 1 week 0 BOTH seats `j95on:false, j95gate:true, COOPW.on:true, S.roster:false`; `j95sync(0,1)` builds nothing (S.roster still undefined). | Delete the three roster parts (and rosterFriend's call in onPos/keepFriendPos), or prove with a test that each runs in a live co-op room. The commit messages' causes («j95 plans her again / approach / ag_see rewrite her row») cannot happen while COOPW.on. |
| 2 | The r2/r3 A/B cases («sees the friend at r5, she is at ksp/r3») are the HOUSE family, not the roster: `r5` = palaceOf(friend entry) fallback (her entry's `pal` on that seat ≠ her own). Main's rows fit it: the 6 first/last details of main r1–r3 all show the friend at a palace (`pal`/palaceOf) on one seat while she stands elsewhere or lives in another house on hers (e.g. «6.0 host sees guest at r2 · host entry pal r2 · guest pal r901»). | A/B below: main 97 rows (all «at r<N> / P:x» palace places); fix side 1 row. | Rewrite the comments: one cause (house), one fix (houseWire/houseIn). |
| 3 | The r3 whereOf wrap = j9's own rule (`S.where[id] \|\| palaceOf`) with friendPl as fallback; in co-op the j95 whereOf wrap is inert, so it adds a 2nd copy of the same rule. Even if j95 ran, the j95sync wrap is circular: j95sync sets `S.where = j95view(roster)` (j95.js:318) BEFORE the wrap reads `S.where[f.id]`, so rosterFriend would copy the NPC row onto itself. | code read j95.js:297–318, jcoopworld.js:446–451 | Keep ONE rule for her place: friendPl (relay → else palace), used by onPos/keepFriendPos; drop the extra whereOf wrap unless a test shows a case j9 gets wrong. |
| 4 | Law 11 one source: `HOUSE_W` (jcoopworld.js:398) is a second typed copy of jcoophl's `HOUSE` (jcoophl.js:35). | grep | Export the list once (e.g. `CW.HOUSE` from jcoophl, or jcoophl reads jcoopworld's) and use it in both. |
| 5 | Identity proof missing for houseIn on the HOST: jcoophl npcList() excludes the coop entry, so the host's own palFix can still write the friend entry's housing while the relay writes hers → possible flip / NPC re-house from a display-only field. A/B shows no `hs` field in any posFlip row (fix r1–r3) → no flip seen, but no test. | jcoophl.js:241–249; posFlip keys fix side: st/clk/ask/khac only | Add a unit/e2e case: host palFix after houseIn → friend housing = her relay, 0 NPC housing changes, posKey stable. |
| 6 | Residual row (fix r2, 1 of 99 weeks): «buổi 7.0 guest sees host at r5, host is at r902» — guest had fpos «7.0 r902» (her own palace = home) yet `S.where[f.id] = r5` (= palaceOf fallback). Detail in /home/user/wt/rvout/fix-r2 (harness row coop-p01s-S12). | A/B | Trace which writer put palaceOf over the relay at 7.0 (setWhere/applyWhere of the host's map vs keepFriendPos order); same family, fix with the relay rule. |

### A/B (own, harness review/robot10-coop 6576e086 overlaid; `SWAP=<r2:1 else 0> SEED=1<r> FLUSH=4 CAP=2400 PCAP=3000 POSLOG=1 NEGTRAP=1 WORKER=http://127.0.0.1:8798 node dev/measure/robot10-coop.js 1 1 1 <out>`; fix = game 32121242, main = game 502c48c9, SAME local main Worker; sides in parallel; same seed per round)
| round | fix rooms (weeks) | fix coop-pos | main rooms (weeks) | main coop-pos |
|---|---|---|---|---|
| r1 SWAP=0 | 20+10+2+20 = 52 | **0** | 33+9 = 42 | 24 |
| r2 SWAP=1 | 17+8+12 = 37 | **1** (item 6) | 33+22 = 55 | 31 |
| r3 SWAP=0 | 10 | **0** | 34+36 = 70 | 42 |
| total | 99 weeks | **1** | 167 weeks | **97** |
Other rows (not this branch): bạc/danh < 0 guest both sides (fix 2, main 2 → fix-2 Worker territory), save round-trip both sides (queued save family), stuck both sides (week-end stuck family, fix-4), coop-stat main 5 / fix 0, coop-world main 4 / fix 0, lag rows both sides.
→ The house relay is the real fix: coop-pos 97 → 1 over ≥10-week rooms.

### Gates
- Worker `npm test` (coop/worker unchanged = main): merge ok · vault ok 48 · seat ALL OK · stale ALL OK · thin ALL OK (rc 0).
- coop-keymove-unit: 12/12.
- quickcheck ALONE: `node dev/tools/quickcheck.js` (no args) on 32121242 → QUICKCHECK PASS · 90 s · open 1784 ms · core gates PASS · perf median new render 209 / tab 441 / buổi 1148 / tasks>200 20 (no live build given → no live column, old save skipped)
- coop-e2e both seat orders: NOT re-run (verdict FAIL on code; fixer #6 had 142/142 ×2 on this sha) — must run on r4.
- Old save: NOT run here (quickcheck without a live build skips it) — r4 runs quickcheck with the live build.

### Law check
11 FAIL (items 1, 3, 4: dead/duplicate rules for one fact) · 6b real people: improved (house relay) but item 6 residual · 4 one core: no numbers added · identity: item 5 open · 7/9/10/12: no player text / UI touched.

### For fixer #7 (r4): drop the roster parts (1) + the extra whereOf wrap (3) or prove them live; one HOUSE list (4); host palFix identity test (5); trace item 6; then coop-e2e both orders + quickcheck alone + A/B ≥10 weeks (expect coop-pos ≈0 vs main ≈1 per 2 weeks).
