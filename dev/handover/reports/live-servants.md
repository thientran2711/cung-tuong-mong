# REPORT live-servants (worker LIVE-SERVANTS, opus; foreman C-AG #14) — 18/11

PRIORITY #1 CHECK: OD L1901 points (2)+(3) (owner 18/11 ~19:30Z, read verbatim) + L1316 (S.roster ledger) + L1592 (day plans) | main 94d11623: dev/build/j95.js j95planOther :215 (mm follows NPC mistress always, st serve/clean + 1 errand dice, "phận sự trong cung"), j95fixHouse :317, j95sync :284 (mm:me follows her always), jagday.js agDrawReg/AGBASE (maid/srv base row = [master palace,"go",null,""]), jagstaff.js (staff deeds, base row), dev/tools/roster.js + ROSTER.md (S.roster/S.rlog, self-checks) | review/* review/npc-purpose (G1 #9: touches j95.js week/intent/ty/peddler lines + jagday comments; no overlap with the lines changed here — merge expected clean, re-check when it lands) | claims none.
START_CTX ≈ 5 % of the window (get_session read 0 at start; estimate). Rollover at 30 %, ceiling 60 %.

Branch **review/live-servants** from main 94d11623. Commits: 22de1d1d (code, tests, tool, docs) + 560014be (build).

## STATUS: SẴN SÀNG KIỂM 797f87e (LIVE-SERVANTS #4, review FAIL 1–8 fixed; see the end) — was: SẴN SÀNG KIỂM 7a50021 — live main 884ce97c merged; all gates PASS except PERF (4x per-khắc +27 % mean vs live after an outcome-identical cut from +49 %; the rest is the feature's own cost → MAIN PERF RULING needed). See "LIVE-SERVANTS #3" at the end.

## What changed (REUSE: S.roster/S.rlog + j95 plans + jagday/jagstaff deed slots + roster.js; nothing parallel)
- **NEW dev/build/j95s.js** (after jagstaff.js in assemble.py), numbers in `BAL.slv` (one core; one-core-guard PASS):
  - (2) **Every maid / eunuch lives her own day** — hers, every consort's, Hoàng hậu's, Thái hậu's household (non-post staff): per-khắc rows at her palace (serve / clean / meal / break / sleep / one night watch per household) and at most ONE walk out per buổi (errand to Nội vụ phủ / Thái y viện — ×3 when her mistress is ill or with child — / Kính sự phòng / Tân Giả khố, or a visit to a friend in another palace, thiện cảm ≥ `friendAf`), the walk takes the whole buổi. Deterministic per buổi (j95rng seeded by life + buổi key + person: same day however often recomputed).
  - **Retinue**: when a mistress (any consort, Hoàng hậu, Thái hậu, AND the player — two-way law) is away from her palace, size = min(free, ceil(`ret[rank]` × `occ[place]`)), `ret`=[1,1,1,2,2,3,4,5] (Hoàng hậu up to 5), `retTh`=5; occ dtd/thu/tn 1, kn/other palaces .8, vuon .6, tyv .4. The close maid goes if free; else the free ones by trust (loyal); busy = a deed, a meeting, a forced list, her own errand/visit. Members stay for the whole outing (only a deed/meeting takes one away). The rest keep their day; a serving row while she is out becomes "ở lại trông cung".
  - Reasons: "Hoàng hậu sang Ngự hoa viên, cung nữ thân cận theo hầu" · "cung nữ thân cận Song Hỷ đang bận (…), nên Hoàng hậu chọn Ngọc Bích theo hầu" · "… chọn theo hầu (tùy tùng 3 người)" · "Hoàng hậu không khỏe, sai đi lấy thuốc ở Thái y viện" · "hết phiên, sang Cảnh Phúc cung thăm bạn thân X" · "đến phiên canh đêm cho ngươi" …
  - (3a) **Reason guard** for EVERY NPC row: an empty / filler reason ("", "phận sự trong cung", "phận sự") is replaced by the cause read from the row (walking to a deed → "đang đến X để …", men by role, etc.).
  - `j95party` now = herself + every one of her people walking with her (was: close maid only) — her retinue is not counted as bóng and not drawn as others.
  - Read API for the map levels: `j95here(place[,khắc])`, `j95whereId(id[,khắc])` (sent to MAP-ZONES session_01Rc5AsJdJ7NfUTTcbii1sqc: read positions only from S.roster).
  - Perf: the pass skips when nothing changed (same buổi, same mistress places, households, deed slots, same rows); place names cached per buổi; guard checks each row once (WeakSet).
- **dev/build/j95.js** (3 guarded lines): when `BAL.slv.on`, the old forcing of servant rows (mm:me always with her; staff back home every sync; fixHouse mm/st block) is off — j95s writes those rows. `BAL.slv.on=0` gives the old behaviour back. ACT95 + brk / stay / nightw.
- **dev/build/jagday.js agTell** (1 guard): a servant does not "carry news" to a master who stands at the same place and khắc (she sees it herself). Before, staff never stood beside their master away from home, so this never arose.
- **dev/tools/roster.js `--who <name|id|role>` [--all] [--json]**: "now: <place>, khắc k of buổi b (week w), doing <act>, with <target>, because <reason>" + her timeline over S.rlog + the current buổi (plan khắc marked); roles "cung nữ của ta", "thái giám của ta", "người hầu của ta", "cung nữ thân tín của ta" or any role as written; ACT names now also read from every `Object.assign(ACT95,…)` in j95*.js. Old usage unchanged. **ROSTER.md** updated (§1 --who, §3b live servants, §4 tests).
- Tests/tools: **dev/test/live-servants.test.js** (T1–T5), **dev/test/live-servants-probe.js** (one maid's day + reason stats; ROAD=maid).

## (3b) moves after the plan → written into the record with their reason (audit)
| writer | rows | reason |
|---|---|---|
| jagday agPlanX / agTickX (staff + Emperor/Thái hậu deeds) | `ag_<deed>` at the deed khắc | agWhyN (never empty) — kept by j95s |
| jagday agHeard / jagent agReapply (re-decide in khắc, walking) | `go` + `ag_*` | info.why / p.why; an empty `go` → guard "đang đến X để …" |
| jagday agTell / agRdDeliver (servant carries news) | `ag_tell` | why of the news — kept |
| j95b j95bPut, j95c (people moved by event text, summons) | place/act | event cause + "nguồn: …" (existing) |
| j95fixHouse (housing changes), j95sync (cấm túc, lãnh cung, freed, elders, Nội vụ phủ) | moves | own reasons (existing) |
| j95secApply (trysts, plot errands) | tryst / meet | "tư tình…", "chủ sai việc kín" — kept |
| j95s (servant day, retinue) | all servant rows | real cause (above) |
| co-op guest/host | record off in co-op (j95on false) | n/a (unchanged) |
Safety net = guard; it fired 0 times in all probe runs after j95s (the writers above already give reasons).

## Before / after — one maid's day (seed 1, same life start; probe dev/test/live-servants-probe.js)
Hoàng hậu Khương Nhược Lan's close maid **Song Hỷ** (mm:1) and the player's close maid **Hải Đường** (mm:me):
| buổi / khắc | OLD (main 94d11623) | NEW (560014be) |
|---|---|---|
| Sáng k1–4, Song Hỷ | Đức Thọ cung · theo hầu chủ · "theo hầu chủ ra ngoài" (always, alone) | Đức Thọ cung · theo hầu chủ · "Hoàng hậu sang Đức Thọ cung, cung nữ thân cận theo hầu" (+ others of the train, size by rank × place) |
| Trưa k1–4, Song Hỷ | Thái y viện · "theo hầu chủ ra ngoài" | Thái y viện · "Hoàng hậu sang Thái y viện, cung nữ thân cận theo hầu" |
| Sáng k1–4, Hải Đường (player at home) | home · hầu hạ chủ · "phận sự trong cung" ×4 | home · hầu hạ chủ · "hầu ngươi chải đầu, dâng trà sáng" |
| Trưa k1–2 | home · "phận sự trong cung" | home · dùng bữa · "đến giờ cơm của cung nhân" |
| Trưa k3 | home · "phận sự trong cung" | home · hầu hạ chủ · "dọn bữa trưa, hầu ngươi" |
| Tối k3–4 | home · "phận sự trong cung" | home · canh đêm · "đến phiên canh đêm cho ngươi" |
| a buổi out (another life, test 3) | — (never left her) | Kính sự phòng · đi việc vặt · "ngươi sai đi Kính sự phòng hỏi chuyện" (whole buổi) |
| the player goes out | always followed, alone | retinue by HER rank (close maid first if free, else "cung nữ thân cận … đang bận …, nên ngươi chọn … theo hầu"), the others "ngươi sang …, ở lại trông cung" |

## Family scan (law 11): filler reasons by kind, probe on 6 buổi × every khắc
| kind | OLD filler/rows | NEW filler/rows (3 lives consort road + 1 maid road) |
|---|---|---|
| servants (s) | 336 / 440 (all `go` with empty reason) | 0 |
| close maids (mm) | 71 / 220 ("phận sự trong cung") | 0 |
| consorts, Emperor, Thái hậu, court, kids, men, officials | 0 | 0 |
Retinue size by mistress rank (followers per outing-khắc), OLD always 1 → NEW: rank 0–2: 1 · Tần 1.29 (max 2) · Phi 2 · Quý phi 2 · Hoàng hậu 2.89 (max 4 at the garden; 5 at Dưỡng Hòa điện / Cần Chính điện / Đức Thọ cung). Servants away from their palace in a khắc: 23 % → 46 %.

## GATES
| gate | result |
|---|---|
| roster.js self-check, 3 fresh lives × several khắc (17 saves) | PASS (exit 0 on all) — in live-servants.test.js T5 |
| new unit test live-servants.test.js (retinue by rank ×22 trials/life, close-busy fallback, player's maids + party, no filler, --who) | PASS (3 lives) |
| quickcheck (dev/tools/quickcheck.js: open, old live save loads + plays, perf smoke vs live) | PASS (render 263/228 ms, tab 461/450, buổi 1407/1226, tasks>200ms 18/18) |
| core gates G1 one-core-guard / text / bind | PASS |
| G2 rules-one-source (old save, 16 perturbations) | PASS |
| G4 odds-cap · coop-one-world · mk-layer-scan · anchor-table | PASS |
| time-spill-guard | PASS (46 runtime checks) |
| ag2perf-a (re-decide causes) | PASS |
| deeds (ag2perf-deeds, 160 buổi, 5 seeds) | total live 2901 / new 2931 (+1 %); per seed live 615/569/594/609/514, new 645/502/591/644/549 (per-seed spread = trajectory divergence: servants' places shift the random stream; seed 2 also shows it with BAL.slv.on=0 vs on). Staff landings 88 / 66 (seed 2 outlier 20→2; others 68 / 64) |
| perf 4x per khắc (ag2perf-probe, 24 buổi × 4 khắc, 5 seeds) | median 2.90 → 2.72 ms, mean 5.42 → 4.80 ms (≤ +10 %: PASS) |
| **BLOCKED here (network policy, host 403 via proxy)** | build_site assets step + G4 manifest-guard (ctm-img…workers.dev), G3 kit-conform pictures (same CDN; live main fails G3 identically here: MIXED 21), coop-e2e (ctm-coop…workers.dev: no room code). Code path: the record is off in co-op (j95on false), so co-op is untouched. Please run these three on a box with the CDN / Worker. |
Build note: index.html built by build_site.sh up to the assets step + buildinfo; sw.js regenerated with the build_site algorithm (V verified: the same algorithm reproduces main's 905429a8603c), PRE list kept from main's sw.js (the CDN index could not be read). A rebuild with network should give the same files unless the CDN list changed.

## For MAIN / owner decisions (not changed; noted)
- The player's own close maid now really leaves (errands / visits, retinue only when free): when she is away the home stage no longer draws her (people ledger), so her talk options are not on the stage until she is back — the owner's point (5) "khi cần mà không thấy thì phải đi tìm". If MAIN wants a "call her back" button, that is a new UI (kit) item → parking lot / kit request.
- Expect a merge with review/npc-purpose (its j95.js / jagday.js hunks are in other lines).


## HANDOVER (worker rolled over at ~30 % context, 18/11 ~20:20Z) — for the successor, opened by foreman C-AG #15
Read first: brief dev/handover/briefs/live-servants.md (sections (2) rewritten 19:55Z = ENTOURAGE PICKER, (5) added 20:07Z = rest/sleep rhythm) + OD 18/11 ~19:45Z point (4) verbatim + OD L1901.
Branch review/live-servants @ 560014be (from main 94d11623). LIVE main is now 13bb8c88 → merge newest main first (git fetch --depth=30 under flock; if the merge needs history: --deepen). Rebuild: python3 dev/build/assemble.py; root index.html/sw.js as in the Build note above (CDN host blocked in these containers).
What is reusable as is: j95s.js servant day (BAL.slv.day: serve/clean/eat/brk/err/vis/sleep, sleep from khắc BAL.slv.sleepFrom in tối, one night watch per household), reason guard, j95party for followers, skip logic (perf), roster.js --who, tests/probe, agTell same-place skip, j95.js guards.
TO DO:
1. (2) REPLACE the rank retinue (j95sPick / BAL.slv.ret/retTh/retNd/occ) by the ENTOURAGE PICKER: player's first Dư đồ departure of the day → one picker (how many + who, among her maids present AND free; busy/absent greyed per the grey rule; once a day, no adding once out). Store the day's pick on S (e.g. S.ent={d:wk(),ids:[…]}) and make j95sPass use it for her outings that day (the followers = picked ∩ still free). UI only from kit parts (dev/kit/KIT.md: option rows / checklist?) — a missing part → STOP, dev/kit/KIT_REQUESTS.md + tell the foreman. NPC mistresses pick the same way (two-way): one pick per day by her needs/traits (replace the rank-size draw with her own choice; free up to all). Hook point for "first departure": goTo wrapper (j41/j95 final wrappers list goTo).
2. WITNESSES: only that day's companions see what she sees/does (where the game rolls maid witnesses, restrict to S.ent ids at her place), later gossip via the existing per-maid knowledge chain (jagknow kn* / agTell) — grep kn chain first (GATE ZERO).
3. (5) REST/SLEEP RHYTHM: MAIN's note came from main (no j95s there). On the branch servants already sleep in tối from BAL.slv.sleepFrom with reason "hết phiên, về phòng cung nhân ngủ" + break/meal rows; check MAIN's exact ask (rest hours from BAL by slot, maybe shift sleep / rest turns per servant) and extend BAL.slv (e.g. per-servant rest turn) + show in roster.js --who; T-test it.
4. Update live-servants.test.js: T1 (rank sizes) → picker tests (count/choice, only present+free, once a day, no adding), witnesses + gossip, NPC picks; keep T3–T5. Re-run all gates (table above) incl. perf 4x (scripts: dev/test/ag2perf-probe.js; my 5-seed loop = run live vs new × seeds 1–5, 24 buổi × 4 khắc).
5. Report here + SẴN SÀNG KIỂM <sha> to C-AG #15.
Scratch (may be wiped): /home/user/wt/ls-scratch (live.html = main 94d11623 dev build). Worktree /home/user/wt/ls (sparse) holds the branch.

## LIVE-SERVANTS #2 (successor, opus; foreman C-AG #15) — 18/11
PRIORITY #1 CHECK ('tùy tùng|entourage|picker'): OD 25 | ledger 3 | claims 8 | main 15 | review/* 2 | archive 58 → no entourage picker on main (kitPicker = portrait picker, single choice; review/rel-picker = relation picker); ('nhân chứng|witness'): OD 7 | main 15 (case witnesses j4/j67; AG1b agWatch/agSeeHer; jagknow knFor/knSrvKnows/knTell/knBao = the kn chain, REUSED) | review/* 0; ('rest/sleep|ngủ nghỉ'): main 1 | review/* 0 | claims = this job.
START_CTX ≈ 3 % (get_session reads 0; estimate). Rollover at 28 %, ceiling 60 %.
Branch review/live-servants: merged live main 13bb8c88 (9994c8d8), work 7528a6f9 (+ docs/gates commit below).

### What changed (point by point)
(2/4) ENTOURAGE PICKER — the rank retinue (BAL.slv.ret/retTh/retNd/occ, j95sRetMax/j95sOcc) is DELETED (canon overwrite). dev/build/j95s.js:
- Player: the first departure of the day from her palace (goTo wrapper; Dư đồ tap or any act that walks her) opens ONE card "Chọn người theo hầu":
  every one of her people (close maid + maids + eunuchs) as a kit option row; present+free ones pickable (tap toggles, kit selection outline .ksel +
  aria-pressed — the identity card's pattern), absent / asleep / rest turn / night watch / busy ones greyed with the reason (kit GREYED OPTION kitOff);
  "Lên đường" (greyed until someone is picked; its line = gain/loss: they see for her / they know what she does), "Đi một mình", "Thôi" (stays; the card
  comes again next departure). Store S.ent={d,ids,at}; no card again that day (no adding once out); each outing: followers = pick ∩ free then. Nobody
  free → no card, she goes alone, asked again next time. Gates kept: access card (accessOf) and walk run on the real goTo; off in co-op (j95on), servant
  start (isSrv), home life (isKc), cấm túc / lãnh cung. Speaker = her close maid (pMaid). KIT: dialog card + option rows + .ksel + kitOff only — no new part
  (no KIT_REQUEST filed). Shots (Fold 755x1000, iPad 1180x820) looked at; not in git.
- NPC mistresses (two-way, law 1): j95sNpcPick once a day at her first outing (S.entN): how many = free × BAL.slv.ent.base × trait (Kiêu ngạo 1.8,
  Ham vui 1.4, Tham vọng 1.3, Khiêm nhường .5, Kín đáo .3, Xảo quyệt .4, Lạnh lùng .6) × formal (dtd/thu/tn 1.5) × moodLow .6, at least one when anyone
  is free; who = close maid first when free, then by lòng^loyalP; Kín đáo / Xảo quyệt take only the most trusted. If the player moved without the card
  (summons/event) the same rule picks for her, said in the reason ("ngươi đi gấp, không kịp chọn: …").
(4) WITNESSES + GOSSIP — on the kn chain (dev/build/jagknow.js, end), no new chain: S.knw {I things, K[id]={item:[from,hand]}}. A landing deed
  (agLand: every NPC deed; twDo: the player's shared deeds) is seen by the servants whose record row stands there at that khắc (not asleep) → only
  companions see a mistress's day; servants meeting in a talking act (BAL.slv.gos.acts) pass it on, p × (1+qv(gos.q)) (chatty more, timid less), ≤ gos.hop
  hands, keep 24, forget after 3 days; each tells HER mistress by knTell (tell/keep/sell by lòng+nết); to the player = TIN BÁO "bao" line (knBao: "tận
  mắt thấy ở … / nghe X kể: …"); an NPC mistress then knows it (K["v<id>"]). knSrvKnows: the close maid no longer "listens all day beside her mistress"
  — she knows only where her row stands (with her mistress when picked), may overhear only when out on an errand/visit; her walk to tell = real walk.
(5) REST RHYTHM — j95sRhythm per servant and day: rest turn "nghỉ theo lượt" (BAL.slv.rest.buoi = [10,55,35,0], len 1–2), bedtime khắc sleepFrom+0..sleepJit
  in tối, night watch rotating through the household by day (BAL.slv.night), last night's watcher sleeps in afterWatch=2 khắc of sáng ("ngủ bù …").
  Reasons in S.roster / S.rlog; roster.js --who prints "rest / sleep today".
(3) dev/tools/roster.js --who adds "rest / sleep today", "entourage today" (S.ent / S.entN with why), "knows" (saw at / heard from whom, hand n);
  --json carries rhythm / entourage / knows. ROSTER.md §1 + §3b + §4 rewritten (canon overwrite of the retinue text).

### Tests / tools
dev/test/live-servants.test.js rewritten: T1 NPC day picks · T2 close-maid-busy · T3 player's picker (present+free only, greyed reason, Lên đường greyed until a pick, stored pick, once a day, followers = pick ∩ free, alone) · T4 no filler · T5 roster.js self-check on real saves + --who (entourage / knows) · T6 witnesses (companion sees, home doesn't; NPC side too) + gossip hand+1 · T7 rest rhythm (watchers per household, sleep-in, rest turn, bedtime from BAL; "ngủ"/"nghỉ theo lượt" rows in the log).
Probe (dev/test/live-servants-probe.js, seed 1, 12 buổi): filler 0 in every kind; servants away 26.6 %; followers e.g. Hoàng hậu (Kín đáo) 1 trusted, Nhan Ngọc Dao (rank 4) up to 3.

### GATES (sha e3dce64 = 07d5751 + merge live main fa411d6f)
| gate | result |
|---|---|
| live-servants.test.js (3 lives, run 3×) | PASS (one flake found and fixed in the test harness: `quiet` left true skipped the last save) |
| roster.js self-check, 3 lives × 6 saves | PASS (in T5) |
| quickcheck.sh (own build, core gates one-core-guard / rules-one-source / kit-conform / coop-one-world, time-spill guard, open, old live save loads+plays, perf smoke) | PASS · render 237/218 ms · tab 342/359 · buổi 1081/988 · tasks>200ms 17/17 |
| build_site incl. CDN assets + manifest | OK here (CDN reachable in this container) |
| deeds ag2perf-deeds 160 buổi × seeds 1–5, live fa411d6f vs new | live 615/569/594/609/514 = 2901 · new 608/505/596/613/564 = 2886 (−0.5 %; seed 2 new = the player died at month 12, trajectory) |
| **perf ag2perf-probe 4x, 24 buổi × 4 khắc, seeds 1–5** | **FAIL**: khắc median live 1.9/2.3/1.6/1.8/2.1 → new 3.4/3.2/3.1/3.2/3.6 ms; mean 4.0/3.6/3.2/2.9/3.4 → 5.2/4.2/4.3/4.3/5.4 (≈ +38 % mean). Live got faster with ag-deed-perf (lazy agTell); the new cost = j95s pass + knwGossip/knwSee per sync. |
| coop-e2e | **BLOCKED**: proxy 403 on ctm-coop.victoria-tntt.workers.dev (no room code); the record + picker + knw are off in co-op (j95on false) |

### STATUS: NOT READY — perf gate open. HANDOVER (#2 → #3, rolled over at ~28 % context)
Branch review/live-servants @ e3dce64 (pushed; tree clean). Scratch /home/user/wt/ls-shots (live.html = fa411d6f dev build, new.html, deeds.sh = deeds + perf loop, picker shots). Live worktree /home/user/wt/live (sparse, detached fa411d6f).
TO DO for #3:
1. PERF (only open gate): profile `spend(1)` on new vs live (dev/test/ag2perf-prof.js arrived with fa411d6f). Suspects: (a) knwGossip runs on every j95sync — it iterates all R.P twice per khắc; memo is per R.key:kh but j95sync may run before the khắc changes → make it run once per khắc AFTER the clock moves, and skip whole when S.knw has no items (`Object.keys(Z.K).length===0` early-out); (b) knwSee on every agLand iterates R.P (fine) but knwUp→knTell→mindPick per servant; (c) j95sPass signature build each sync (S.ent JSON / households) — the skip path; (d) j95sRhythm called per servant per pass (hash + rng) — cache per day in J95S. Target: khắc mean ≤ live +10 %.
2. Re-run: live-servants.test (3 lives), quickcheck.sh, deeds+perf loop (bash /home/user/wt/ls-shots/deeds.sh after re-copying new.html), coop-e2e (BLOCKED here unless the Worker host is allowed).
3. Write SẴN SÀNG KIỂM <sha> here + send_message to C-AG #15 with one line per point (2)(3)(4 picker)(5) and the gate table.

## LIVE-SERVANTS #3 (opus, session_01Rc5AsKjmZakFtxrVGvMvW9, START_CTX ~3 %) — PERF, outcome-identical
PRIORITY #1 CHECK: OD perf ruling 13:52Z (FOREMAN_C_STATUS L697) | main fa411d6f (not moved) | review/live-servants e3dce64 (this work) | claims: this session (brief live-servants #3).
### SẴN SÀNG KIỂM 7a50021 (= c137b7c perf + merge live e16e1d6f 083c665 [assemble.py = main's list + j95s.js] + ag-know test fix 43943be + merge live 884ce97c 7a50021 [doc-90-women, comments only]; index.html/sw.js rebuilt each time)
ag-know fix (test only, law 14 canon overwrite): §3 "her loyal confidant maid tells her" assumed the old "close maid listens all day beside her mistress";
under live servants (OD 18/11 ~19:45Z (4)) she knows only where her row stands — after the e16e1d6f merge the world draws shifted and her row was never at the
garden → FAIL on e3dce64+main too (not the perf work). The case now plants her row at the garden (restored after); PASS on branch and live.
What changed (no behaviour, no number; law 4 untouched — every number still from BAL):
- jagknow.js knwGossip: knHit(g|gk|a>b|iid) = the same FNV (knH) run from a cached hash of the fixed head (seed|g<gk>|a>) + per-listener state; group know-counts C
  (exact: +1 per add, −1 on the oldest dropped past gos.keep) skip a thing the whole group already knows (the b loop would skip all); T.u = things not all
  know → whole teller loop skipped at 0; each teller's keys read once (for-in order) and reused unless she was told something since; knwObj memo per pass
  (+ sid table); qv of a teller whose nết is already drawn read from a table by her nết (pure: traitsOf = s.net then); undrawn nết → qv itself (the lazy draw
  happens exactly as before). knwAddC = knwAdd + the count.
- j95s.js: j95sHouses builds one sid → servant table per call (j95sv's own order, first match) instead of j95sv per person; j95sRhythm memo per
  (day, life seed, BAL.slv rest/sleep/night numbers, person, index, household size) — pure; j95party wrapper: cheap rejects before p0 (p0 pure, same answer).
Proof outcome-identical: ag2perf-diff K=4 (spend ×4 per buổi) e3dce64 vs c137b7c: seeds 1–5 × 40 buổi diff 0, final state same, same Math.random count;
seeds 1–3 × 160 buổi diff 0 (seed 1 player died at buổi 120 in both). S.knw hash changes every buổi in those runs (gossip exercised). Deeds identical to #2.
### PERF (ag2perf-probe, 24 buổi × 4 khắc, CPU 4x, ×9 interleaved live/new, seeds 1–5 cycling)
| build | khắc mean (live → new) | khắc median | buổi median |
|---|---|---|---|
| e3dce64 (before) | 3.03 → 4.60 ms (+51.6 %) | 1.77 → 3.37 (+90 %) | +20.7 % |
| c137b7c (after) | 2.86 → 3.79 ms (+32.7 %) | 1.60 → 2.84 (+78 %) | +9.4 % |
Why it stops here (CDP profile 4x, 3 seeds, same build BAL.slv.on 1 vs 0: khắc step 368 → 516 ms per 96 khắc): the remaining ≈ +1 ms/khắc is the feature
working, not waste: (1) the gossip pass ≈ 0.4–0.5 ms/khắc — every khắc it must look at every talking group (≈5 groups, ≈15 things each) and, for each new
learner, run the chain's own tell/keep/sell choice (knwUp → knTell → mindPick, ≈0.13 ms, outcome-bound); (2) j95sPass + houses + guard (her people's own day
re-checked each sync) ≈ 0.25 ms; (3) witnesses per landing deed (knwSee) ≈ 0.05 ms; (4) downstream work caused by the new knowledge/TIN BÁO (mkSync, agTell,
k61Scrub, stage counts) ≈ 0.2–0.3 ms. Getting to ≤ +10 % needs fewer gossip rounds (e.g. once per buổi, or only when a group changes) or fewer groups =
a behaviour change (who learns what, when) → not done (law 4 / brief). MAIN decides (like PERF RULING 13:52Z): (a) accept as the feature's cost
(buổi step is +9.4 %, quickcheck perf smoke PASS); (b) order a behaviour-changing gossip cadence (then the owner's wording on "truyền tay nhau" applies).
### GATES (c137b7c)
| gate | result |
|---|---|
| live-servants.test.js (3 lives) ×3 | PASS ×3 (T5 roster.js self-check 3 lives × 6/6/5 saves inside) |
| quickcheck.sh (own build, core gates G1 one-core-guard · G2 rules-one-source · G3 kit-conform · G4 hooks 5 incl coop-one-world, time-spill, open, old live save, perf smoke) | PASS · render 225/198 ms · tab 365/309 · buổi 1027/1057 · tasks>200ms 16/14 · 335 s |
| ag-*.test.js (14) | 14/14 PASS (ag-all failed its p95 draw budget only when run 4-parallel; alone PASS p95 5.7 ms, live 6.4) |
| deeds ag2perf-deeds 160 buổi × seeds 1–5 (K=3) | live 615/569/594/609/514 = 2901 · new 608/505/596/613/564 = 2886 (identical to #2's numbers: perf work changed no deed) |
| seeded diff e3dce64 vs c137b7c | 0 (5 × 40, 3 × 160) |
| coop-e2e | BLOCKED: co-op Worker host refused by this env's proxy (CONNECT 403); j95s/knw are off in co-op (j95on) and untouched paths |
Points (unchanged code from #2, all PASS): (2) live servants' own day + reasons; (3) roster.js --who rest/entourage/knows; (4) entourage picker (player, once a day,
kit parts only) + NPC day picks + witnesses/gossip S.knw; (5) rest rhythm (rest turn, bedtime, rotating night watch).
Scratch (container only): /home/user/wt/ls-shots (live.html, new0…new7.html, tools/bench.sh ×9 interleaved, tools/fnprof.js per-function timer,
tools/prof.js CDP profile with PRE, tools/lineprof.js line ticks, b-*.txt bench logs, d*/L* diff dumps).
### RE-RUN after merging live (e16e1d6f → 083c665; then 884ce97c comments-only → 7a50021)
| gate | result |
|---|---|
| seeded diff (e3dce64 + e16e1d6f merged the same way, local) vs 083c665 | 0 (seeds 1–3 × 40 buổi, K=4); 083c665 vs 7a50021: 0 (seeds 1–2 × 40) |
| perf ×9 interleaved vs live e16e1d6f | before (e3dce64+main): mean 3.10 → 4.61 (+48.7 %), median 1.88 → 3.48, buổi med +13.9 % · after (083c665): mean 3.06 → 3.88 (+26.9 %), median 1.73 → 2.83 (+63.5 %), buổi med +9.5 % |
| live-servants.test (3 lives) on 083c665 | PASS |
| quickcheck.sh on 7a50021 (own build; G1–G4 core gates PASS, hooks 5) | PASS · render 220/191 ms · tab 299/316 · buổi 1021/947 · tasks>200ms 17/17 |
| ag-*.test.js (14, serial) on 43943be | 14/14 PASS; ag-carry is FLAKY on the live-servants branch (unseeded 8-day bot: §5 "carry 0" = no last-khắc news in that sample): branch 2/10 FAIL, e3dce64+main (no perf work) 1/5, live 0/7 — the feature's thinner news (servants know less), not perf; reviewer may want that sample made robust |
| deeds 160 × seeds 1–5 | live 615/569/594/609/514 · new 608/505/596/613/564 = pre-perf merged build byte-for-byte |
| coop-e2e | BLOCKED (co-op Worker host: proxy CONNECT 403) |

## PERF RULING (MAIN ROOT-57, 18/11 ~22:30Z, relayed by C-AG #16)
(a) ACCEPT as feature cost (same as 13:52Z ruling): per-buổi +9.5 % is inside the ≤+10 % budget; per-khắc +26.9 % accepted because the remaining cost is the owner-ordered gossip/witness behaviour (OD 19:30Z, 19:45Z). No cadence change. Reviewer judges: per buổi ≤ +10 %, no long-task regression > +10 %, all gates PASS.


## REVIEW VERDICT 7a50021 (reviewer opus session_01Rc5AsKp5X8AnT5HJ7WoyXK, 18/11 ~23:20Z): FAIL — 8 items, full list in reports/review-live-servants.md
1 raw deed keys on screen ("đang maid:sweep") — whole family incl. j95sWhy/j95here/roster ACT · 2 "Đi một mình" renders THÀNH "Không được gì thêm" (laws 2/3) · 3 person rows use "kèm:" (same status green ĐƯỢC vs red KÈM) · 4 big "Tư tình, ánh mắt" picture while the list scrolls (law 10) · 5 ag-carry red 3/6 on branch (live 0/5) · 6 typed numbers in j95sNpcPick (law 4) · 7 day-0 "ngủ bù" + "khắc 1–1" · 8 perf re-measure: buổi median +14 % (ruling ≤ +10 %).
PASS: live-servants.test, quickcheck (old save ok), 13/14 ag-*, perf work outcome-identical (diff 0 ×3), deeds = worker numbers; coop-e2e BLOCKED sandbox 403 only (no co-op file touched).

## LIVE-SERVANTS #4 (opus, session_01Rc5AsLdRc1YbZ1vrMvV1Ro, START_CTX ≈ 4 % (get_session reads 0; estimate), foreman C-AG #17) — review FAIL 1–8
PRIORITY #1 CHECK ('live-servants'): OD 0 new | ledger 0 | claims C-AG LIVE-SERVANTS #1–#3 done + REVIEW FAIL | main 1130a49 → 40d05b7 → 9a1d692 merged | review/live-servants 7a50021 → 797f87e.
### SẴN SÀNG KIỂM 797f87e (= fixes 4149d18 + KIT REQUEST + perf 3af2ad0 + merges of live main 1130a49 / 40d05b7 / 9a1d692 + j43 empty-bel fix 797f87e; index.html / sw.js rebuilt each time; assemble.py = main's list + j95s.js)
| # | FAIL item | fix (whole family, law 11) | proof |
|---|---|---|---|
| 1 | raw deed keys on screen | ONE act word `j95sActW(a)` (j95s): ACT95 → `J95S_DW` servant deed words (every SRVA row × maid / srv + empTea; secret deeds — spy, betray, frame, poison, pil, love matters — read "lo việc riêng", law 6a: the viewer does not learn a secret for free) → AGACTW (ag_call "ghé chơi") → fallback "lo việc riêng", never the key. Used by j95sNotFree (picker grey reason + NPC pick reason), j95sWhy (guard), j95here / j95whereId (map read API), j95table (dev), S.rlog words (j95 log). roster.js reads the same words (J95S_DW, AGACTW, every literal ACT95 word + the consorts' deed tables AGSELF / AGCX / AGHH / AGC2 / AGC3ACT) and its acts list | scan `node dev/test/live-servants-words.js <index> [lives=3] [buổi=12]` (table below) |
| 2 | "Đi một mình" loss-only | THÀNH "việc ngươi làm bên ngoài được giữ kín, mọi người ở lại trông cung" · BẠI "không ai thấy giùm ngươi" (Lên đường: THÀNH eyes · BẠI mouths) — equal value, both gain + loss | rendered cards both devices: THÀNH + BẠI rows on both options |
| 3 | person rows "kèm:" | person status = one whole "(…)" value → kit Ghi chú (neutral, same for every person row); a not-free person's reason only in Cần (kitOff), not repeated; "Lên đường" empty hint also "(…)" (no kèm). Picker family: 0 "kèm:" left in j95s | rendered: every person row GHI CHÚ |
| 4 | big picture "Tư tình, ánh mắt" while the list scrolls | kit options only: the picker has no `who` (a person pop-up always gets the event banner, KIT 50 / OD:L448) and is an act picker (`pid:"entpick"` registered in `KIT_ACT_PIDS`, as jpoison / jts do) → no event picture; the kit's evId guess that pulled the picture back on the re-render after a tap is dropped before each render of this card; **KIT REQUEST filed** (dev/kit/KIT_REQUESTS.md "kitEvArt evId tag on act pickers", whole group: every KIT_ACT_PIDS picker) | shots with the CDN on, before / after a tap: no banner, Fold 755x1000 + iPad 1180x820 |
| 5 | ag-carry red | seeded lives: Math.random re-seeded right before start() (the boot timers drew a varying count), 3 lives (seeds 1,2,3) × 16 days, §5 = carried items in the sum (> 0) and in EVERY life every carried item ended, no caught error; §1–4 planted case in every life; reason in the test head. Assertion not weakened | branch 10/10 PASS (carry sums 6–13, lives e.g. [5,4,1] [1,3,1]); live 9a1d692 PASS |
| 6 | typed numbers j95sNpcPick | `BAL.slv.ent.mood {v:40, lv:2}`, `BAL.slv.ent.lv {min:5, close:100, def:50, unit:50}` | one-core-guard PASS (quickcheck core gates) |
| 7 | day-0 "ngủ bù" / "khắc 1–1" | slept needs d > 0 (no night before the first day); rest reason "khắc k" when 1 khắc long, "khắc a–b" when 2 | live-servants.test sample "đến lượt nghỉ của nàng (khắc 1, mỗi ngày một lượt)" |
| 8 | perf | outcome-identical cuts (rhythm BAL key cached instead of 2 joins per call; guard skips a row with a real reason before the WeakSet): ag2perf-diff K=4 905de4f vs 3af2ad0 seeds 1–3 × 40 buổi diff 0, same final state, same Math.random count | table below |
#### Family scan item 1 (live-servants-words, 3 seeded lives × 12 buổi × 4 khắc; same harness both builds)
| view | before 7a50021 raw | after 797f87e raw |
|---|---|---|
| (A) act keys the game can write (ACT95 + AGRUN + SRVA×2 + AGACTW = 317) → act word | 105 | 0 |
| j95sNotFree (picker / pick reason) | 1029 | 0 |
| j95sWhy (guard reason) | 1418 | 0 |
| j95whereId.act / j95here.act (map API) | 1049 / 1049 | 0 / 0 |
| j95table.act (dev) | 1049 | 0 |
| row reasons containing a key | 43 | 0 |
| S.rlog saved words | 230 | 0 |
| roster.js answers (table + --who ×2, ~200 runs) | raw lines (e.g. "ag_cx:tqGift", "ag_pray", "ag:see:join") | 0 |
#### PERF (ag2perf-probe, 24 buổi × 4 khắc, CPU 4x, 20 interleaved pairs live 1130a49 / new 3af2ad0, seeds 1–5 × 4 rounds)
| metric | live | new | Δ |
|---|---|---|---|
| buổi step median (avg of 20 run medians) | 68.1 ms | 73.6 ms | **+8.1 %** |
| buổi step median (median of run medians) | 68.0 | 74.9 | +10.1 % |
| buổi step mean | 136.4 | 140.0 | +2.7 % |
| whole buổi (4 khắc + step, means) | 147.0 | 153.7 | +4.5 % |
| khắc mean / median / p95 | 2.7 / 1.5 / 10.8 | 3.4 / 2.4 / 10.8 | +28.5 % / +63 % / −0.6 % |
Noise is large: per-pair buổi-median ratios −28 % … +52 % (median of pair ratios +14 %); an earlier 10-pair run (before the perf cut) read +23 % on the same metric, the lives diverge (a death = `over` save ≈ 400 ms in some runs). By ruling (a) (per buổi ≤ +10 %) the main metric is +8.1 % / median-of-medians +10.1 % — on the line; MAIN re-rules if the reviewer reads it over. Long tasks: quickcheck tasks>200 ms 17/18, max 1612 / 1376 ms (one earlier quickcheck run: 3145 ms outlier, next runs normal).
#### j43 fix (found by the final main merge)
After merging 9a1d692 quickcheck G4 coop-one-world failed seed 3 (3/3 on the branch, live passed): `merged vs host: R[#9].bel b0 undefined · h1 {} · sent undefined · merged undefined` — j43's monthly belief decay deleted the last entry and left an EMPTY `bel {}` on the host, the co-op merge3 keeps no empty object. Fix: the decay drops the empty `bel` (belOf makes it again). No live-servants code touches `bel`; the UI-only main diff only shifted the seed's random path. After: seeds 3 + 7 PASS, quickcheck core gates PASS.
#### GATES (797f87e unless said)
| gate | result |
|---|---|
| live-servants.test.js (3 lives, roster self-check inside) | PASS |
| live-servants-words.js (new family scan) | PASS (raw 0) |
| quickcheck.sh (own build; core gates G1 one-core-guard · G2 · G3 kit-conform · G4 hooks incl coop-one-world; time-spill; open; old live save; perf smoke) | PASS · render 165/148 · tab 288/291 · buổi 903/902 · tasks>200ms 17/18 · 288 s |
| ag-*.test.js (13, serial, on 73abc8b; ag-carry again on 797f87e) | 13/13 PASS · ag-carry 10/10 on the branch, PASS on live |
| seeded diff of the perf cut | 0 (3 × 40 buổi, K=4) |
| coop-e2e | BLOCKED = sandbox only (co-op Worker host, proxy 403); no jcoop* file touched; j95s / picker / S.knw off in co-op (j95on false) |
Shots (scratch only, looked at; not in git): Fold 755x1000 + iPad 1180x820, picker with 6 people (CDN on, before / after taps): no picture, rows GHI CHÚ / CẦN / THÀNH / BẠI, "Thôi" = the kit ✕. Repro: /home/user/wt/ls4x/pickn.js (container only).
